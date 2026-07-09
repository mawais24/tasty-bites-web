"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { MenuCategoryRow, MenuItemRow, MenuBadge, Dietary } from "@/types/database";

type ItemWithCategory = MenuItemRow & { menu_categories?: { name: string; slug: string } };

type FormState = {
  category_id: string;
  name: string;
  description: string;
  price: string;
  price_display: string;
  badge: MenuBadge | "";
  dietary: Dietary[];
  image_url: string;
  is_featured: boolean;
  is_available: boolean;
  display_order: number;
};

const EMPTY_FORM: FormState = {
  category_id: "",
  name: "",
  description: "",
  price: "",
  price_display: "",
  badge: "",
  dietary: [],
  image_url: "",
  is_featured: false,
  is_available: true,
  display_order: 0,
};

const BADGES: MenuBadge[] = ["popular", "chef-special", "new", "signature"];
const DIETARY: Dietary[] = ["vegetarian", "vegan", "gluten-free"];

export default function AdminMenuItemsPage() {
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const load = () => {
    Promise.all([
      fetch("/api/admin/menu/items").then((res) => res.json()),
      fetch("/api/admin/menu/categories").then((res) => res.json()),
    ])
      .then(([itemsData, catData]) => {
        setItems(itemsData.items ?? []);
        setCategories(catData.categories ?? []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item: MenuItemRow) => {
    setEditingId(item.id);
    setForm({
      category_id: item.category_id,
      name: item.name,
      description: item.description ?? "",
      price: String(item.price),
      price_display: item.price_display ?? "",
      badge: item.badge ?? "",
      dietary: item.dietary ?? [],
      image_url: item.image_url ?? "",
      is_featured: item.is_featured,
      is_available: item.is_available,
      display_order: item.display_order,
    });
  };

  const startNew = () => {
    setEditingId("new");
    setForm({ ...EMPTY_FORM, category_id: categories[0]?.id ?? "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  };

  const toggleDietary = (d: Dietary) => {
    setForm((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(d) ? prev.dietary.filter((x) => x !== d) : [...prev.dietary, d],
    }));
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/menu/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      setForm((prev) => ({ ...prev, image_url: data.url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        category_id: form.category_id,
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: parseFloat(form.price) || 0,
        price_display: form.price_display.trim() || null,
        badge: form.badge || null,
        dietary: form.dietary,
        image_url: form.image_url || null,
        is_featured: form.is_featured,
        is_available: form.is_available,
        display_order: Number(form.display_order),
      };

      const url = editingId === "new" ? "/api/admin/menu/items" : `/api/admin/menu/items/${editingId}`;
      const method = editingId === "new" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save.");
        return;
      }
      cancelEdit();
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    await fetch(`/api/admin/menu/items/${id}`, { method: "DELETE" });
    load();
  };

  const inputClass =
    "w-full bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2 focus:outline-none focus:border-gold";

  const visibleItems = categoryFilter === "all" ? items : items.filter((i) => i.category_id === categoryFilter);

  const renderForm = () => (
    <div className="bg-cream/60 border border-gold/30 p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Category <span className="text-gold">*</span>
          </label>
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Name <span className="text-gold">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
          Description
        </label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Price <span className="text-gold">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Price Display
          </label>
          <input
            placeholder="e.g. From $18"
            value={form.price_display}
            onChange={(e) => setForm({ ...form, price_display: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Display Order
          </label>
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Badge
          </label>
          <select
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value as MenuBadge | "" })}
            className={inputClass}
          >
            <option value="">None</option>
            {BADGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Dietary
          </label>
          <div className="flex gap-4 pt-2">
            {DIETARY.map((d) => (
              <label key={d} className="flex items-center gap-1.5 text-sm text-espresso">
                <input
                  type="checkbox"
                  checked={form.dietary.includes(d)}
                  onChange={() => toggleDietary(d)}
                />
                {d}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
          Image
        </label>
        <div className="flex items-center gap-4">
          {form.image_url && (
            <div className="relative w-16 h-16 shrink-0 overflow-hidden border border-espresso/10">
              <Image src={form.image_url} alt="" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            disabled={uploading}
            className="text-sm text-warm-brown"
          />
          {uploading && <span className="text-xs text-warm-brown-light">Uploading…</span>}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
          />
          Available (visible on site)
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !form.category_id || !form.name.trim() || !form.price}
          className="bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={cancelEdit} className="text-sm font-semibold text-warm-brown hover:text-espresso px-4 py-2.5">
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-2xl font-bold text-espresso">Menu Items</h1>
        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-espresso/15 text-espresso text-sm px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {editingId === null && (
            <button
              onClick={startNew}
              className="bg-gold text-espresso text-sm font-semibold tracking-wide px-5 py-2.5 hover:bg-gold-light transition-colors"
            >
              + Add Item
            </button>
          )}
        </div>
      </div>

      {editingId === "new" && <div className="mb-6">{renderForm()}</div>}

      {loading ? (
        <p className="text-warm-brown text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {visibleItems.map((item) =>
            editingId === item.id ? (
              <div key={item.id}>{renderForm()}</div>
            ) : (
              <div
                key={item.id}
                className="bg-white border border-espresso/10 px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {item.image_url && (
                    <div className="relative w-12 h-12 shrink-0 overflow-hidden border border-espresso/10">
                      <Image src={item.image_url} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-espresso text-sm truncate">
                      {item.name}{" "}
                      <span className="text-warm-brown-light font-normal">
                        ({item.menu_categories?.name})
                      </span>
                      {item.is_featured && (
                        <span className="ml-2 text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full">featured</span>
                      )}
                      {!item.is_available && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">hidden</span>
                      )}
                    </p>
                    <p className="text-xs text-warm-brown-light mt-1">
                      {item.price_display ?? `$${item.price}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button onClick={() => startEdit(item)} className="text-xs font-semibold text-gold hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
