"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { formatSlotLabel } from "@/lib/booking-hours";

type FormState = {
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  party_size: string;
  special_requests: string;
};

function todayISO(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export default function BookingForm() {
  const loadTime = useRef<number>(0);
  useEffect(() => {
    loadTime.current = Date.now();
  }, []);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    booking_date: "",
    booking_time: "",
    party_size: "2",
    special_requests: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [availability, setAvailability] = useState<{
    date: string;
    mode: "auto" | "manual" | "fully_booked" | "closed";
    note?: string | null;
  } | null>(null);

  const minDate = useMemo(() => todayISO(), []);

  useEffect(() => {
    fetch("/api/bookings/settings")
      .then((res) => res.json())
      .then((data) => setTimeSlots(data.timeSlots ?? []));
  }, []);

  useEffect(() => {
    if (!form.booking_date) return;
    let cancelled = false;
    fetch(`/api/bookings/availability?date=${form.booking_date}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAvailability({ ...data, date: form.booking_date });
      })
      .catch(() => {
        if (!cancelled) setAvailability(null);
      });
    return () => {
      cancelled = true;
    };
  }, [form.booking_date]);

  const isCheckingAvailability = availability?.date !== form.booking_date;
  const isUnavailable =
    !isCheckingAvailability &&
    (availability?.mode === "fully_booked" || availability?.mode === "closed");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          party_size: parseInt(form.party_size, 10),
          _hp: honeypot,
          _t: loadTime.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(data.message ?? "Your booking has been received.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
          <CheckCircle size={24} className="text-gold" />
        </div>
        <h3 className="font-serif text-espresso text-2xl font-bold mb-2">
          Booking Received
        </h3>
        <p className="text-warm-brown text-sm leading-relaxed max-w-sm">{sent}</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-espresso/15 text-espresso text-sm px-4 py-3 placeholder:text-warm-brown-light focus:outline-none focus:border-gold transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div aria-hidden style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", tabIndex: -1 } as React.CSSProperties}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
          Phone <span className="text-gold">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
          placeholder="(08) 9000 0000"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
            Date <span className="text-gold">*</span>
          </label>
          <input
            type="date"
            name="booking_date"
            required
            min={minDate}
            value={form.booking_date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
            Time <span className="text-gold">*</span>
          </label>
          <select
            name="booking_time"
            required
            value={form.booking_time}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>
              Select
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {formatSlotLabel(slot)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
            Guests <span className="text-gold">*</span>
          </label>
          <input
            type="number"
            name="party_size"
            required
            min={1}
            step={1}
            value={form.party_size}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {form.booking_date && (
        <div
          className={`flex items-start gap-3 text-sm px-4 py-3 border ${
            isUnavailable
              ? "bg-red-50 border-red-200 text-red-700"
              : !isCheckingAvailability && availability?.mode === "manual"
                ? "bg-gold/10 border-gold/30 text-espresso"
                : "bg-espresso/5 border-espresso/10 text-warm-brown"
          }`}
        >
          <Clock size={16} className="shrink-0 mt-0.5" />
          <span>
            {isCheckingAvailability
              ? "Checking availability…"
              : availability?.mode === "fully_booked"
                ? "Sorry, we're fully booked on this date. Please choose another date or call us."
                : availability?.mode === "closed"
                  ? `We're closed on this date${availability?.note ? ` (${availability.note})` : ""}. Please choose another date.`
                  : availability?.mode === "manual"
                    ? "This date requires manual confirmation — we'll be in touch shortly after you book."
                    : "This date is available for instant booking."}
          </span>
        </div>
      )}

      <div>
        <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
          Special Requests{" "}
          <span className="text-warm-brown-light font-normal normal-case">(optional)</span>
        </label>
        <textarea
          name="special_requests"
          rows={4}
          value={form.special_requests}
          onChange={handleChange}
          placeholder="Dietary requirements, seating preference, occasion…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={sending || isUnavailable}
        className="w-full bg-gold text-espresso text-sm font-semibold tracking-wide py-3.5 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Booking…" : "Book a Table"}
      </button>
    </form>
  );
}
