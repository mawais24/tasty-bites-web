"use client";

import { useEffect, useState, useMemo } from "react";
import { formatSlotLabel } from "@/lib/booking-hours";
import type { Booking, BookingStatus } from "@/types/database";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-gold/15 text-gold",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  );

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const { booking } = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === id ? booking : b)));
      }
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-2xl font-bold text-espresso">Reservations</h1>
        <div className="flex gap-2">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                filter === s ? "bg-espresso text-cream" : "bg-white text-warm-brown border border-espresso/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-warm-brown text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-warm-brown text-sm">No bookings found.</p>
      ) : (
        <div className="bg-white border border-espresso/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-espresso/10 text-left text-warm-brown-light text-xs uppercase tracking-wide">
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Date / Time</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-espresso/5 last:border-0 align-top">
                  <td className="px-4 py-3 font-medium text-espresso">
                    {b.name}
                    {b.special_requests && (
                      <p className="text-warm-brown-light text-xs mt-1 max-w-xs">{b.special_requests}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-warm-brown whitespace-nowrap">
                    {b.booking_date} · {formatSlotLabel(b.booking_time)}
                  </td>
                  <td className="px-4 py-3 text-warm-brown">{b.party_size}</td>
                  <td className="px-4 py-3 text-warm-brown">
                    <a href={`mailto:${b.email}`} className="block hover:text-gold">{b.email}</a>
                    <a href={`tel:${b.phone}`} className="block hover:text-gold">{b.phone}</a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap space-x-2">
                    {b.status !== "confirmed" && (
                      <button
                        disabled={busyId === b.id}
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="text-xs font-semibold text-green-700 hover:underline disabled:opacity-50"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button
                        disabled={busyId === b.id}
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
