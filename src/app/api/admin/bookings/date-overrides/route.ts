import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("booking_date_overrides")
    .select("*")
    .order("date");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ overrides: data });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { date, mode, note } = await request.json();

  if (!date || !["manual", "fully_booked", "closed"].includes(mode)) {
    return NextResponse.json({ error: "date and a valid mode are required." }, { status: 400 });
  }

  const { data, error } = await admin.supabase
    .from("booking_date_overrides")
    .upsert({ date, mode, note: note?.trim() || null, updated_at: new Date().toISOString() }, { onConflict: "date" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ override: data });
}
