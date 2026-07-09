import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: false })
    .order("booking_time", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ bookings: data });
}
