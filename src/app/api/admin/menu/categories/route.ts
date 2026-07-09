import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { data, error } = await admin.supabase
    .from("menu_categories")
    .select("*")
    .order("display_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ categories: data });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const body = await request.json();
  const { slug, name } = body;

  if (!slug?.trim() || !name?.trim()) {
    return NextResponse.json({ error: "Slug and name are required." }, { status: 400 });
  }

  const { data, error } = await admin.supabase
    .from("menu_categories")
    .insert({
      slug: slug.trim(),
      name: name.trim(),
      tab_label: body.tab_label?.trim() || null,
      description: body.description?.trim() || null,
      note: body.note?.trim() || null,
      highlight: !!body.highlight,
      flavours: body.flavours ?? null,
      display_order: body.display_order ?? 0,
      is_active: body.is_active ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ category: data });
}
