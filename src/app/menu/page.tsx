import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { menuCategories, SQUARE_ONLINE_URL, type Dietary } from "@/data/menu";
import MenuTabs from "@/components/MenuTabs";

export const metadata: Metadata = {
  title: "Dine-in Menu | Tasty Bites — Modern Pakistani Cuisine, Morley",
  description:
    "Explore the full dine-in menu at Tasty Bites, Morley. Mandi, steaks, seafood, burgers, paratha rolls, rotiza, desserts and more — authentic Pakistani cuisine.",
};

const dietaryLabels: Record<Dietary, string> = {
  vegetarian: "V",
  vegan: "Ve",
  "gluten-free": "GF",
};

const badgeLabels: Record<string, string> = {
  popular: "Popular",
  "chef-special": "Chef's Special",
  new: "New",
  signature: "Signature",
};

const iceCreamScoops = [
  { label: "1 Scoop", price: "$5" },
  { label: "2 Scoops", price: "$8" },
  { label: "3 Scoops", price: "$10" },
];

export default function MenuPage() {
  return (
    <>
      {/* ─── Page Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-espresso-deep pt-18">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">
            Tasty Bites Restaurant & Bistro
          </p>
          <h1 className="font-serif text-cream text-5xl lg:text-6xl font-bold leading-tight">
            Dine-in Menu
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-6 mb-6 opacity-60" />
          <p className="text-cream/50 text-sm max-w-sm mx-auto leading-relaxed">
            Modern Pakistani cuisine. Open Tuesday–Sunday from 4:00 pm.
            
          </p>
        </div>
      </section>

      {/* ─── Takeaway Banner ───────────────────────────────────────────────── */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-espresso text-sm font-medium">
            Prefer to eat at home?{" "}
            <span className="font-semibold">Order takeaway via Square Online.</span>
          </p>
          <a
            href={SQUARE_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-espresso text-cream text-xs font-semibold tracking-wide px-5 py-2.5 hover:bg-espresso-deep transition-colors shrink-0"
          >
            Order Takeaway <ChevronRight size={13} />
          </a>
        </div>
      </div>

      {/* ─── Sticky Tab Navigation ─────────────────────────────────────────── */}
      <MenuTabs />

      {/* ─── Menu Content ──────────────────────────────────────────────────── */}
      <div className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          {/* Dietary key */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16 pb-6 border-b border-espresso/10">
            <p className="text-warm-brown-light text-xs font-semibold uppercase tracking-wider w-full mb-1">
              Dietary Guide
            </p>
            {(Object.entries(dietaryLabels) as [Dietary, string][]).map(
              ([key, label]) => (
                <span
                  key={key}
                  className="text-xs text-warm-brown flex items-center gap-1.5"
                >
                  <span className="inline-block border border-espresso/20 text-espresso text-[10px] font-bold px-1.5 py-0.5 leading-none">
                    {label}
                  </span>
                  {key
                    .replace(/-/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
              )
            )}
          </div>

          {/* Categories */}
          <div className="space-y-20">
            {menuCategories.map((category) =>
              category.highlight ? (
                // ── Highlighted Ice Cream Section ───────────────────────────
                <div
                  key={category.id}
                  id={`section-${category.id}`}
                  className="scroll-mt-36"
                >
                  <div className="bg-espresso-deep overflow-hidden">
                    <div className="px-8 py-14 lg:px-12">
                      {/* Header */}
                      <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                        Our House Specialty
                      </p>
                      <h2 className="font-serif text-cream text-4xl lg:text-5xl font-bold leading-tight">
                        {category.name}
                      </h2>
                      <div className="w-10 h-px bg-gold mt-4 mb-6" />
                      {category.description && (
                        <p className="text-cream/55 text-sm leading-relaxed max-w-md mb-10">
                          {category.description}
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="flex flex-wrap gap-4 mb-12">
                        {iceCreamScoops.map(({ label, price }) => (
                          <div
                            key={label}
                            className="border border-gold/30 bg-gold/8 px-6 py-5 text-center min-w-25"
                          >
                            <p className="font-serif text-gold text-3xl font-bold leading-none">
                              {price}
                            </p>
                            <p className="text-cream/50 text-xs mt-2 tracking-wide">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Flavours grid */}
                      {category.flavours && (
                        <div>
                          <p className="text-cream/30 text-[10px] font-semibold tracking-[0.3em] uppercase mb-5">
                            Choose your flavour
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6">
                            {category.flavours.map((flavour) => (
                              <p
                                key={flavour}
                                className="text-cream/70 text-sm py-3 border-b border-white/5 hover:text-gold-light transition-colors"
                              >
                                {flavour}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // ── Regular Category ─────────────────────────────────────────
                <div
                  key={category.id}
                  id={`section-${category.id}`}
                  className="scroll-mt-36"
                >
                  {/* Category header */}
                  <div className="mb-10">
                    <h2 className="font-serif text-espresso text-3xl lg:text-4xl font-bold">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-warm-brown-light text-sm mt-2 italic max-w-2xl">
                        {category.description}
                      </p>
                    )}
                    {category.note && (
                      <p className="text-gold text-xs font-medium mt-2 tracking-wide">
                        {category.note}
                      </p>
                    )}
                    <div className="w-8 h-px bg-gold mt-4" />
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-espresso/8">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-6 flex items-start justify-between gap-6 group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-serif text-espresso text-lg font-semibold group-hover:text-gold transition-colors">
                              {item.name}
                            </h3>
                            {item.badge && (
                              <span className="text-[10px] font-semibold tracking-wide uppercase bg-gold/15 text-gold px-2 py-0.5">
                                {badgeLabels[item.badge]}
                              </span>
                            )}
                          </div>
                          <p className="text-warm-brown text-sm leading-relaxed mb-2">
                            {item.description}
                          </p>
                          {item.dietary && item.dietary.length > 0 && (
                            <div className="flex gap-1.5">
                              {item.dietary.map((d) => (
                                <span
                                  key={d}
                                  className="text-[10px] font-bold border border-espresso/15 text-espresso/50 px-1.5 py-0.5 leading-none"
                                >
                                  {dietaryLabels[d]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="font-serif text-espresso text-base font-semibold shrink-0 mt-0.5 text-right whitespace-nowrap">
                          {item.priceDisplay ?? `$${item.price}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Bottom note */}
          <div className="mt-20 pt-10 border-t border-espresso/10 text-center">
            <p className="text-warm-brown-light text-sm">
              Please inform our staff of any allergies or dietary requirements.
            </p>
            <p className="text-warm-brown-light text-sm mt-1">
              Menu and prices subject to change without notice.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SQUARE_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-espresso text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-gold-light transition-colors"
              >
                Order Takeaway Online
              </a>
              <Link
                href="/contact"
                className="inline-block border border-espresso text-espresso text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-espresso hover:text-cream transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
