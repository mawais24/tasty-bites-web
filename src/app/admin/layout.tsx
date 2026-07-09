"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  { section: "Bookings" },
  { label: "Reservations", href: "/admin/bookings" },
  { label: "Date Availability", href: "/admin/bookings/availability" },
  { label: "Time Slots", href: "/admin/bookings/time-slots" },
  { section: "Menu" },
  { label: "Categories", href: "/admin/menu/categories" },
  { label: "Items", href: "/admin/menu/items" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-espresso-deep border-b border-gold/20 h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gold md:hidden w-8 h-8 flex items-center justify-center text-xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <span className="font-serif text-gold font-bold text-lg">Tasty Bites</span>
        <span className="text-cream/40 text-xs uppercase tracking-widest hidden sm:block">Admin</span>
        <div className="ml-auto flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-cream/50 hover:text-gold text-xs font-medium transition-colors hidden sm:block"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-cream/50 hover:text-red-400 text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 z-30 w-56 bg-espresso-deep border-r border-gold/10 overflow-y-auto transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="py-4">
          {NAV.map((item, i) => {
            if ("section" in item) {
              return (
                <p
                  key={i}
                  className="px-4 pt-5 pb-1 text-xs font-bold text-gold/60 uppercase tracking-widest"
                >
                  {item.section}
                </p>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gold/15 text-gold border-r-2 border-gold"
                    : "text-cream/60 hover:bg-gold/5 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pt-14 md:pl-56 min-h-screen">{children}</main>
    </div>
  );
}
