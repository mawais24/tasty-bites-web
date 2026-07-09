import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Globe } from "lucide-react";
import { SQUARE_ONLINE_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-espresso-deep text-cream/70">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <Image
                src="/tasty-bites-logo.png"
                alt="Tasty Bites"
                width={200}
                height={200}
                className="h-14 w-14 rounded-full object-cover group-hover:opacity-90 transition-opacity"
              />
              <div>
                <p className="font-serif text-xl font-bold text-cream tracking-widest leading-none">
                  TASTY BITES
                </p>
                <p className="text-[10px] text-gold tracking-[0.2em] uppercase mt-1">
                  Restaurant & Bistro
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mt-4 text-cream/50 max-w-xs">
              Modern Pakistani cuisine rooted in the rich traditions of the
              Lal Qila family. Bold flavours. Royal hospitality. Morley, Perth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Dine-in Menu" },
                { href: "/book", label: "Book a Table" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SQUARE_ONLINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-gold transition-colors"
                >
                  Order Takeaway ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Find Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>
                  Shop 30, 130 Bridgeman Dr
                  <br />
                  Benett Springs WA 6063
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <a
                  href="tel:+61892487000"
                  className="hover:text-gold transition-colors"
                >
                  +61 8 9248 7000
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Globe size={14} className="text-gold mt-0.5 shrink-0" />
                <a
                  href="https://tastybites.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  tastybites.au
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Opening Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-cream/40 text-xs block">Monday</span>
                <span className="text-cream/60">Closed</span>
              </li>
              <li>
                <span className="text-cream/40 text-xs block">Tuesday – Sunday</span>
                <span className="text-cream/80">4:00 pm – Midnight</span>
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-xs text-cream/30 leading-relaxed">
                Part of the Lal Qila family
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} Tasty Bites Restaurant & Bistro. All rights reserved.
          </p>
          <p className="text-xs text-cream/20">Shop 30, 130 Bridgeman Dr, Benett Springs WA 6063</p>
        </div>
      </div>
    </footer>
  );
}
