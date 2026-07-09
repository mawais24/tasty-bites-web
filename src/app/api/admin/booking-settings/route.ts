import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("restaurant_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ settings: data ?? { id: 1, closed_weekdays: [1] } });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { closed_weekdays } = await request.json();

  if (
    !Array.isArray(closed_weekdays) ||
    !closed_weekdays.every((d) => Number.isInteger(d) && d >= 0 && d <= 6)
  ) {
    return NextResponse.json({ error: "closed_weekdays must be an array of integers 0-6." }, { status: 400 });
  }

  const { data, error } = await admin.supabase
    .from("restaurant_settings")
    .upsert({ id: 1, closed_weekdays, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ settings: data });
}
