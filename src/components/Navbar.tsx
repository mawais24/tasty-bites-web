"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SQUARE_ONLINE_URL } from "@/lib/constants";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 60,
    () => false
  );

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-espresso shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/tasty-bites-logo.png"
            alt="Tasty Bites Restaurant & Bistro"
            width={200}
            height={200}
            className="h-12 w-12 rounded-full object-cover group-hover:opacity-90 transition-opacity"
            priority
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-serif text-base font-bold text-cream tracking-widest leading-none group-hover:text-gold-light transition-colors">
              TASTY BITES
            </span>
            <span className="text-[9px] text-gold tracking-[0.2em] uppercase leading-none mt-1">
              Modern Pakistani Cuisine
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === href
                  ? "text-gold"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className="inline-block border border-gold text-gold text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold hover:text-espresso transition-colors"
          >
            Book a Table
          </Link>
          <a
            href={SQUARE_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-gold-light transition-colors"
          >
            Order Online
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-cream p-1.5 -mr-1.5"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-espresso border-t border-white/10">
          <nav className="flex flex-col px-6 py-5 gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-base font-medium border-b border-white/5 transition-colors ${
                  pathname === href
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block text-center border border-gold text-gold text-sm font-semibold tracking-wide px-6 py-3 hover:bg-gold hover:text-espresso transition-colors"
            >
              Book a Table
            </Link>
            <a
              href={SQUARE_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block text-center bg-gold text-espresso text-sm font-semibold tracking-wide px-6 py-3 hover:bg-gold-light transition-colors"
            >
              Order Online
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
