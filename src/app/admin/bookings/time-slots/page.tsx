"use client";

import { useEffect, useState } from "react";
import { formatSlotLabel } from "@/lib/booking-hours";
import type { BookingTimeSlot } from "@/types/database";

export default function TimeSlotsPage() {
  const [slots, setSlots] = useState<BookingTimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTime, setNewTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/booking-settings/time-slots")
      .then((res) => res.json())
      .then((data) => setSlots(data.slots ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/booking-settings/time-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time: newTime }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to add slot.");
        return;
      }
      setNewTime("");
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (slot: BookingTimeSlot) => {
    await fetch(`/api/admin/booking-settings/time-slots/${slot.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !slot.is_active }),
    });
    setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, is_active: !s.is_active } : s))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this time slot?")) return;
    await fetch(`/api/admin/booking-settings/time-slots/${id}`, { method: "DELETE" });
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-espresso mb-2">Booking Time Slots</h1>
      <p className="text-warm-brown text-sm mb-6">
        These are the only times guests can choose when booking a table online. Add, remove, or
        temporarily disable a slot below.
      </p>

      <form onSubmit={handleAdd} className="bg-white border border-espresso/10 p-5 mb-8 flex items-end gap-4">
        <div>
          <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">
            New Time
          </label>
          <input
            type="time"
            required
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2.5 focus:outline-none focus:border-gold"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add Slot"}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-warm-brown text-sm">Loading…</p>
      ) : slots.length === 0 ? (
        <p className="text-warm-brown text-sm">No time slots yet — add one above.</p>
      ) : (
        <div className="bg-white border border-espresso/10">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-espresso/5 last:border-0"
            >
              <p className={`font-semibold text-sm ${slot.is_active ? "text-espresso" : "text-warm-brown-light line-through"}`}>
                {formatSlotLabel(slot.time)}
              </p>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => toggleActive(slot)}
                  className="text-xs font-semibold text-gold hover:underline"
                >
                  {slot.is_active ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
