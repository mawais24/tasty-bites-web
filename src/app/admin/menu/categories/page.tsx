"use client";

import { useEffect, useState } from "react";
import type { MenuCategoryRow } from "@/types/database";

type FormState = {
  slug: string;
  name: string;
  tab_label: string;
  description: string;
  note: string;
  display_order: number;
  highlight: boolean;
  is_active: boolean;
};

const EMPTY_FORM: FormState = {
  slug: "",
  name: "",
  tab_label: "",
  description: "",
  note: "",
  display_order: 0,
  highlight: false,
  is_active: true,
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/menu/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (cat: MenuCategoryRow) => {
    setEditingId(cat.id);
    setForm({
      slug: cat.slug,
      name: cat.name,
      tab_label: cat.tab_label ?? "",
      description: cat.description ?? "",
      note: cat.note ?? "",
      display_order: cat.display_order,
      highlight: cat.highlight,
      is_active: cat.is_active,
    });
  };

  const startNew = () => {
    setEditingId("new");
    setForm({ ...EMPTY_FORM, display_order: categories.length + 1 });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        slug: form.slug.trim(),
        name: form.name.trim(),
        tab_label: form.tab_label.trim() || null,
        description: form.description.trim() || null,
        note: form.note.trim() || null,
        display_order: Number(form.display_order),
        highlight: form.highlight,
        is_active: form.is_active,
      };

      const url =
        editingId === "new" ? "/api/admin/menu/categories" : `/api/admin/menu/categories/${editingId}`;
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
    if (!confirm("Delete this category and all its items?")) return;
    await fetch(`/api/admin/menu/categories/${id}`, { method: "DELETE" });
    load();
  };

  const inputClass =
    "w-full bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2 focus:outline-none focus:border-gold";

  const renderForm = () => (
    <div className="bg-cream/60 border border-gold/30 p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Slug (id) <span className="text-gold">*</span>
          </label>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="e.g. mandi"
            className={inputClass}
          />
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
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
            Tab Label
          </label>
          <input
            value={form.tab_label}
            onChange={(e) => setForm({ ...form, tab_label: e.target.value })}
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
      <div>
        <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-1.5">
          Note
        </label>
        <input
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input
            type="checkbox"
            checked={form.highlight}
            onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
          />
          Highlighted section
        </label>
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Active (visible on site)
        </label>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !form.slug.trim() || !form.name.trim()}
          className="bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={cancelEdit}
          className="text-sm font-semibold text-warm-brown hover:text-espresso px-4 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-espresso">Menu Categories</h1>
        {editingId === null && (
          <button
            onClick={startNew}
            className="bg-gold text-espresso text-sm font-semibold tracking-wide px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            + Add Category
          </button>
        )}
      </div>

      {editingId === "new" && <div className="mb-6">{renderForm()}</div>}

      {loading ? (
        <p className="text-warm-brown text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) =>
            editingId === cat.id ? (
              <div key={cat.id}>{renderForm()}</div>
            ) : (
              <div
                key={cat.id}
                className="bg-white border border-espresso/10 px-5 py-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-espresso text-sm">
                    {cat.name}{" "}
                    <span className="text-warm-brown-light font-normal">({cat.slug})</span>
                    {!cat.is_active && (
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        inactive
                      </span>
                    )}
                    {cat.highlight && (
                      <span className="ml-2 text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full">
                        highlighted
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-warm-brown-light mt-1">Order {cat.display_order}</p>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-xs font-semibold text-gold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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
