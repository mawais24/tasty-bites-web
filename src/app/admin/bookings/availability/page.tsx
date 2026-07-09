"use client";

import { useEffect, useState } from "react";
import { weekdayName } from "@/lib/booking-hours";
import type { BookingDateOverride, DateOverrideMode } from "@/types/database";

const MODE_LABELS: Record<DateOverrideMode, string> = {
  manual: "Manual Review",
  fully_booked: "Fully Booked",
  closed: "Closed",
};

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export default function AvailabilityPage() {
  const [overrides, setOverrides] = useState<BookingDateOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [mode, setMode] = useState<DateOverrideMode>("manual");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [closedWeekdays, setClosedWeekdays] = useState<number[]>([]);
  const [savingWeekdays, setSavingWeekdays] = useState(false);

  const load = () => {
    fetch("/api/admin/bookings/date-overrides")
      .then((res) => res.json())
      .then((data) => setOverrides(data.overrides ?? []))
      .finally(() => setLoading(false));
  };

  const loadSettings = () => {
    fetch("/api/admin/booking-settings")
      .then((res) => res.json())
      .then((data) => setClosedWeekdays(data.settings?.closed_weekdays ?? []));
  };

  useEffect(() => {
    load();
    loadSettings();
  }, []);

  const toggleWeekday = async (day: number) => {
    const next = closedWeekdays.includes(day)
      ? closedWeekdays.filter((d) => d !== day)
      : [...closedWeekdays, day];
    setClosedWeekdays(next);
    setSavingWeekdays(true);
    try {
      await fetch("/api/admin/booking-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ closed_weekdays: next }),
      });
    } finally {
      setSavingWeekdays(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings/date-overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, mode, note }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save.");
        return;
      }
      setDate("");
      setNote("");
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    await fetch(`/api/admin/bookings/date-overrides/${id}`, { method: "DELETE" });
    setOverrides((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="font-serif text-2xl font-bold text-espresso mb-2">Date Availability</h1>
      <p className="text-warm-brown text-sm mb-6">
        By default every open date auto-confirms bookings. Set your recurring weekly closed
        days below, or override a specific date to require manual confirmation, mark it fully
        booked, or close it for a holiday.
      </p>

      <div className="bg-white border border-espresso/10 p-5 mb-8">
        <h2 className="text-xs font-semibold text-espresso uppercase tracking-wide mb-3">
          Weekly Closed Days {savingWeekdays && <span className="text-warm-brown-light font-normal normal-case">saving…</span>}
        </h2>
        <div className="flex flex-wrap gap-4">
          {WEEKDAYS.map((day) => (
            <label key={day} className="flex items-center gap-2 text-sm text-espresso">
              <input
                type="checkbox"
                checked={closedWeekdays.includes(day)}
                onChange={() => toggleWeekday(day)}
              />
              {weekdayName(day)}
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-espresso/10 p-5 mb-8 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2.5 focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as DateOverrideMode)}
              className="w-full bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2.5 focus:outline-none focus:border-gold"
            >
              <option value="manual">Manual Review</option>
              <option value="fully_booked">Fully Booked</option>
              <option value="closed">Closed (Holiday)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">
              {mode === "closed" ? "Reason" : "Note"}{" "}
              <span className="text-warm-brown-light font-normal normal-case">(optional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={mode === "closed" ? "e.g. Eid Holiday" : "e.g. Private event"}
              className="w-full bg-cream border border-espresso/15 text-espresso text-sm px-3 py-2.5 focus:outline-none focus:border-gold"
            />
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Override"}
        </button>
      </form>

      {loading ? (
        <p className="text-warm-brown text-sm">Loading…</p>
      ) : overrides.length === 0 ? (
        <p className="text-warm-brown text-sm">No date overrides set.</p>
      ) : (
        <div className="bg-white border border-espresso/10">
          {overrides.map((o) => (
            <div
              key={o.id}
              className="flex items-center justify-between gap-4 px-5 py-4 border-b border-espresso/5 last:border-0"
            >
              <div>
                <p className="font-semibold text-espresso text-sm">{o.date}</p>
                <p className="text-xs text-warm-brown-light">
                  {MODE_LABELS[o.mode]}
                  {o.note ? ` — ${o.note}` : ""}
                </p>
              </div>
              <button
                onClick={() => handleRemove(o.id)}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
