"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/bookings");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-espresso-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-gold mb-1">Tasty Bites</h1>
          <p className="text-cream/40 text-xs tracking-[0.3em] uppercase">Admin Panel</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-cream p-8 border border-white/10 shadow-2xl space-y-5"
        >
          <h2 className="font-serif text-xl font-bold text-espresso">Sign In</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-espresso/15 text-espresso text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-espresso/15 text-espresso text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-espresso text-sm font-semibold tracking-wide py-3.5 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
