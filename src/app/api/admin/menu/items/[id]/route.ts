import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { id } = await params;
  const body = await request.json();

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of [
    "category_id", "name", "description", "price", "price_display",
    "badge", "dietary", "image_url", "is_featured", "display_order", "is_available",
  ]) {
    if (key in body) update[key] = body[key];
  }

  const { data, error } = await admin.supabase
    .from("menu_items")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ item: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { id } = await params;
  const { error } = await admin.supabase.from("menu_items").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
