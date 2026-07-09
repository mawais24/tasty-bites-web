import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("menu_items")
    .select("*, menu_categories(name, slug)")
    .order("display_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const body = await request.json();
  const { category_id, name, price } = body;

  if (!category_id || !name?.trim() || typeof price !== "number") {
    return NextResponse.json(
      { error: "category_id, name and price are required." },
      { status: 400 }
    );
  }

  const { data, error } = await admin.supabase
    .from("menu_items")
    .insert({
      category_id,
      name: name.trim(),
      description: body.description?.trim() || null,
      price,
      price_display: body.price_display?.trim() || null,
      badge: body.badge || null,
      dietary: body.dietary ?? [],
      image_url: body.image_url || null,
      is_featured: !!body.is_featured,
      display_order: body.display_order ?? 0,
      is_available: body.is_available ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ item: data });
}
