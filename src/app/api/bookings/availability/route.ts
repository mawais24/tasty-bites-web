import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isClosedWeekday, isPastDate } from "@/lib/booking-hours";
import { getClosedWeekdays } from "@/lib/booking-settings";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  if (isPastDate(date)) {
    return NextResponse.json({ mode: "fully_booked", reason: "past" });
  }

  const closedWeekdays = await getClosedWeekdays();
  if (isClosedWeekday(date, closedWeekdays)) {
    return NextResponse.json({ mode: "closed", reason: "weekly" });
  }

  const { data, error } = await supabase
    .from("booking_date_overrides")
    .select("mode, note")
    .eq("date", date)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    mode: data?.mode ?? "auto",
    note: data?.note ?? null,
  });
}
