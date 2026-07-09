import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { sendEmail, getBookingEmailTemplate } from "@/lib/email";
import { isClosedWeekday, isPastDate, isValidTimeSlot } from "@/lib/booking-hours";
import { getActiveTimeSlots, getClosedWeekdays } from "@/lib/booking-settings";
import type { Booking } from "@/types/database";

const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL || "mr.mawais24@gmail.com";
const MIN_FILL_MS = 4000;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    name, email, phone, booking_date, booking_time, party_size, special_requests, _hp, _t,
  } = body as {
    name: string;
    email: string;
    phone: string;
    booking_date: string;
    booking_time: string;
    party_size: number;
    special_requests?: string;
    _hp?: string;
    _t?: number;
  };

  if (_hp) {
    return NextResponse.json({ ok: true });
  }
  if (typeof _t === "number" && Date.now() - _t < MIN_FILL_MS) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  if (
    typeof name !== "string" || name.trim().length < 2 ||
    typeof email !== "string" || !email.includes("@") ||
    typeof phone !== "string" || phone.trim().length < 6 ||
    typeof booking_date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(booking_date) ||
    typeof booking_time !== "string" ||
    typeof party_size !== "number" || !Number.isInteger(party_size) ||
    party_size < 1
  ) {
    return NextResponse.json({ error: "Please fill in all required fields correctly." }, { status: 400 });
  }

  if (isPastDate(booking_date)) {
    return NextResponse.json({ error: "Please choose a future date." }, { status: 400 });
  }

  const closedWeekdays = await getClosedWeekdays();
  if (isClosedWeekday(booking_date, closedWeekdays)) {
    return NextResponse.json({ error: "We're closed on this day. Please choose another date." }, { status: 400 });
  }

  const activeSlots = await getActiveTimeSlots();
  if (!isValidTimeSlot(booking_time, activeSlots)) {
    return NextResponse.json({ error: "Please choose a valid time slot." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data: override, error: overrideErr } = await supabase
    .from("booking_date_overrides")
    .select("mode, note")
    .eq("date", booking_date)
    .maybeSingle();

  if (overrideErr) {
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  if (override?.mode === "fully_booked") {
    return NextResponse.json(
      { error: "Sorry, we're fully booked on this date. Please choose another date or call us." },
      { status: 409 }
    );
  }

  if (override?.mode === "closed") {
    return NextResponse.json(
      {
        error: `We're closed on this date${override.note ? ` (${override.note})` : ""}. Please choose another date.`,
      },
      { status: 409 }
    );
  }

  const status = override?.mode === "manual" ? "pending" : "confirmed";

  const { data: booking, error: insertErr } = await supabase
    .from("bookings")
    .insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      booking_date,
      booking_time,
      party_size,
      special_requests: special_requests?.trim() || null,
      status,
    })
    .select()
    .single();

  if (insertErr || !booking) {
    console.error("Booking insert failed:", insertErr);
    return NextResponse.json({ error: "Failed to submit booking. Please try again." }, { status: 500 });
  }

  try {
    const templates = getBookingEmailTemplate(booking as Booking);
    await Promise.all([
      sendEmail({ to: booking.email, subject: templates.customer.subject, html: templates.customer.html }),
      sendEmail({ to: RESTAURANT_EMAIL, subject: templates.restaurant.subject, html: templates.restaurant.html }),
    ]);
  } catch (err) {
    console.error("Booking email failed (non-fatal):", err);
  }

  return NextResponse.json({
    ok: true,
    status,
    message:
      status === "pending"
        ? "Your booking request has been received and is pending confirmation. We'll be in touch shortly."
        : "Your table is booked! We look forward to seeing you.",
  });
}
