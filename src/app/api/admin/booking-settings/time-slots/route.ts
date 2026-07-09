import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("booking_time_slots")
    .select("*")
    .order("time");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ slots: data });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { time } = await request.json();

  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ error: "A valid time (HH:MM) is required." }, { status: 400 });
  }

  const { data, error } = await admin.supabase
    .from("booking_time_slots")
    .insert({ time, is_active: true })
    .select()
    .single();

  if (error) {
    const message = error.code === "23505" ? "That time slot already exists." : error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ slot: data });
}
