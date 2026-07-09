import { supabase } from "./supabase";
import type { MenuCategoryRow, MenuItemRow } from "@/types/database";

export type Dietary = "vegetarian" | "vegan" | "gluten-free";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay?: string;
  badge?: "popular" | "chef-special" | "new" | "signature";
  dietary?: Dietary[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  tabLabel?: string;
  description?: string;
  note?: string;
  highlight?: boolean;
  flavours?: string[];
  items: MenuItem[];
};

function toMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price: Number(row.price),
    priceDisplay: row.price_display ?? undefined,
    badge: row.badge ?? undefined,
    dietary: row.dietary?.length ? row.dietary : undefined,
    image: row.image_url ?? undefined,
  };
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const [{ data: categories, error: catErr }, { data: items, error: itemErr }] =
    await Promise.all([
      supabase
        .from("menu_categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
      supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("display_order"),
    ]);

  if (catErr || !categories) {
    console.error("Failed to load menu categories:", catErr);
    return [];
  }
  if (itemErr) {
    console.error("Failed to load menu items:", itemErr);
  }

  const itemsByCategory = new Map<string, MenuItemRow[]>();
  for (const item of (items as MenuItemRow[] | null) ?? []) {
    const list = itemsByCategory.get(item.category_id) ?? [];
    list.push(item);
    itemsByCategory.set(item.category_id, list);
  }

  return (categories as MenuCategoryRow[]).map((cat) => ({
    id: cat.slug,
    name: cat.name,
    tabLabel: cat.tab_label ?? undefined,
    description: cat.description ?? undefined,
    note: cat.note ?? undefined,
    highlight: cat.highlight,
    flavours: cat.flavours ?? undefined,
    items: (itemsByCategory.get(cat.id) ?? []).map(toMenuItem),
  }));
}

export async function getFeaturedItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("display_order");

  if (error || !data) {
    console.error("Failed to load featured items:", error);
    return [];
  }

  return (data as MenuItemRow[]).map(toMenuItem);
}
