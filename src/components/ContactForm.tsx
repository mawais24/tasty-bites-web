"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const loadTime = useRef<number>(0);
  useEffect(() => { loadTime.current = Date.now(); }, []);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: honeypot,   // honeypot value (should be empty)
          _t: loadTime.current, // form load time for timing check
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
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
          Message Received
        </h3>
        <p className="text-warm-brown text-sm leading-relaxed max-w-xs">
          Thanks for reaching out. We&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-espresso/15 text-espresso text-sm px-4 py-3 placeholder:text-warm-brown-light focus:outline-none focus:border-gold transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — visually hidden, must stay empty */}
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
          Phone{" "}
          <span className="text-warm-brown-light font-normal normal-case">(optional)</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(08) 9000 0000"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-espresso text-xs font-semibold tracking-wide uppercase mb-2">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help you?"
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
        disabled={sending}
        className="w-full bg-gold text-espresso text-sm font-semibold tracking-wide py-3.5 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
