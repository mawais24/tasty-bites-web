import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { SQUARE_ONLINE_URL } from "@/lib/constants";
import { getFeaturedItems } from "@/lib/menu";

const badgeLabels: Record<string, string> = {
  popular: "Popular",
  "chef-special": "Chef's Special",
  new: "New",
  signature: "Signature",
};

export default async function HomePage() {
  const featuredItems = await getFeaturedItems();
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-espresso-deep">
        <Image
          src="/hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(38,27,13,0.25) 0%, rgba(26,18,8,0.45) 55%, rgba(15,9,5,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 90%, rgba(201,148,58,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-espresso-deep/85 via-espresso-deep/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20 pb-24 text-center">
          <Image
            src="/tasty-bites-logo-circle.png"
            alt="Tasty Bites Restaurant & Bistro"
            width={300}
            height={300}
            priority
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover mx-auto mb-6 ring-1 ring-gold/50 shadow-[0_0_40px_rgba(201,148,58,0.25)]"
          />
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-5">
            Modern Pakistani Cuisine
          </p>
          <div className="w-12 h-px bg-gold mx-auto mb-8 opacity-60" />
          <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 max-w-3xl mx-auto">
            Bold Flavours, Royal Tradition
          </h1>
          <p className="text-cream/60 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Authentic Pakistani cuisine crafted with premium spices and timeless
            recipes — right in the heart of Morley, Perth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-gold text-espresso text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-gold-light transition-colors"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/book"
              className="inline-block border border-gold text-gold text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-gold hover:text-espresso transition-colors"
            >
              Book a Table
            </Link>
            <a
              href={SQUARE_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-cream/30 text-cream text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-cream/10 transition-colors"
            >
              Order Takeaway
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-cream text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-cream" />
        </div>
      </section>

      {/* ─── About ─────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                Tasty Bites by Lal Qila
              </p>
              <h2 className="font-serif text-espresso text-4xl lg:text-5xl font-bold leading-tight mb-6">
                The Taste of Tradition
              </h2>
              <div className="w-10 h-px bg-gold mb-8" />
              <p className="text-warm-brown text-base leading-relaxed mb-5">
                Tasty Bites, proudly part of the Lal Qila family, brings you
                the finest authentic Pakistani cuisine inspired by timeless
                traditions and a rich culinary heritage. Our chefs craft each
                dish with premium ingredients, signature spices, and a passion
                for perfection — ensuring bold flavours and exceptional quality
                in every bite.
              </p>
              <p className="text-warm-brown text-base leading-relaxed mb-8">
                From sizzling kebabs to aromatic mandis and creamy curries,
                every plate is made to delight and satisfy. More than just a
                meal, Tasty Bites offers a memorable dining experience rooted
                in warmth, hospitality, and tradition.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-espresso text-sm font-semibold tracking-wide border-b border-espresso pb-0.5 hover:text-gold hover:border-gold transition-colors"
              >
                See Our Menu <ChevronRight size={14} />
              </Link>
            </div>

            {/* Photo composition */}
            <div className="relative h-80 sm:h-96 lg:h-120">
              {/* Offset gold frame behind the main photo */}
              <div className="absolute top-4 right-0 w-[85%] h-[80%] border border-gold/50" />
              {/* Main hall — large image */}
              <div className="absolute top-0 right-4 w-[85%] h-[80%] shadow-xl overflow-hidden">
                <Image
                  src="/Tasty-bites-main-hall.jpeg"
                  alt="Inside the Tasty Bites dining hall in Morley"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              {/* Entrance — smaller overlapping image, framed like a photo card */}
              <div className="absolute bottom-0 left-0 w-[58%] h-[55%] border-[6px] border-cream shadow-2xl overflow-hidden">
                <Image
                  src="/Tasty-bites-main-entrance.jpeg"
                  alt="Tasty Bites Restaurant & Bistro entrance"
                  fill
                  sizes="(min-width: 1024px) 25vw, 55vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pillars ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                number: "01",
                title: "Royal Heritage",
                body: "Rooted in the culinary traditions of the Mughal era, every dish carries centuries of flavour wisdom — brought to life in our Morley kitchen.",
              },
              {
                number: "02",
                title: "Premium Spices",
                body: "Our chefs use signature spice blends and premium ingredients, crafting bold, unforgettable flavours with every single dish.",
              },
              {
                number: "03",
                title: "Warm Hospitality",
                body: "More than just a meal — a memorable dining experience rooted in warmth, tradition, and heartfelt service.",
              },
            ].map(({ number, title, body }) => (
              <div
                key={number}
                className="bg-espresso px-8 py-12 group hover:bg-espresso-deep transition-colors"
              >
                <p className="font-serif text-gold/25 text-5xl font-bold leading-none mb-6 group-hover:text-gold/40 transition-colors">
                  {number}
                </p>
                <h3 className="font-serif text-cream text-xl font-semibold mb-3">
                  {title}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Menu Preview ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              From the Kitchen
            </p>
            <h2 className="font-serif text-espresso text-4xl lg:text-5xl font-bold leading-tight">
              Signature Dishes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
            {featuredItems.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-4/3 overflow-hidden mb-5">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {item.badge && (
                    <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wide uppercase bg-gold text-espresso px-2.5 py-1">
                      {badgeLabels[item.badge]}
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-espresso text-lg font-semibold group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-serif text-espresso text-lg font-medium shrink-0">
                    {item.priceDisplay ?? `$${item.price}`}
                  </p>
                </div>
                <p className="text-warm-brown text-sm leading-relaxed mt-1.5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block border border-espresso text-espresso text-sm font-semibold tracking-wide px-8 py-3.5 hover:bg-espresso hover:text-cream transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Dine In / Takeaway ────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <div className="bg-espresso-deep px-10 py-20 flex flex-col justify-between min-h-90">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              Dine In
            </p>
            <h2 className="font-serif text-cream text-3xl lg:text-4xl font-bold leading-tight mb-4 max-w-xs">
              Come In & Stay a While
            </h2>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Experience the full Tasty Bites atmosphere — great food,
              comfortable seating, and service that feels like home.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="self-start inline-flex items-center gap-2 bg-cream text-espresso text-sm font-semibold tracking-wide px-6 py-3 hover:bg-gold hover:text-espresso transition-colors"
            >
              View Our Menu <ChevronRight size={14} />
            </Link>
            <Link
              href="/book"
              className="self-start inline-flex items-center gap-2 border border-cream/30 text-cream text-sm font-semibold tracking-wide px-6 py-3 hover:bg-cream/10 transition-colors"
            >
              Book a Table <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-gold px-10 py-20 flex flex-col justify-between min-h-90">
          <div>
            <p className="text-espresso/60 text-xs tracking-[0.3em] uppercase font-sans mb-4">
              Takeaway
            </p>
            <h2 className="font-serif text-espresso text-3xl lg:text-4xl font-bold leading-tight mb-4 max-w-xs">
              Order Online with Ease
            </h2>
            <p className="text-espresso/70 text-sm leading-relaxed max-w-xs">
              Can&rsquo;t make it in? Browse our full menu on Square Online
              and have your favourites ready to collect.
            </p>
          </div>
          <a
            href={SQUARE_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 self-start inline-flex items-center gap-2 bg-espresso text-cream text-sm font-semibold tracking-wide px-6 py-3 hover:bg-espresso-deep transition-colors"
          >
            Order Now <ChevronRight size={14} />
          </a>
        </div>
      </section>

      {/* ─── Opening Hours (highlighted) ──────────────────────────────────── */}
      <section className="relative bg-espresso-deep overflow-hidden py-24 lg:py-32">
        {/* Ghost background word for depth */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="font-serif font-bold text-white/[0.025] text-[clamp(100px,20vw,240px)] whitespace-nowrap leading-none">
            OPEN
          </span>
        </div>

        {/* Subtle warm glow bottom-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 10% 100%, rgba(201,148,58,0.15) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-8">
            Opening Hours
          </p>

          {/* Days */}
          <h2 className="font-serif text-cream font-bold leading-none tracking-tight text-5xl sm:text-6xl lg:text-[5.5rem]">
            Tuesday – Sunday
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-7">
            <div className="h-px w-16 bg-gold/40" />
            <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
            <div className="h-px w-16 bg-gold/40" />
          </div>

          {/* Hours */}
          <p className="font-serif text-gold font-bold leading-none text-4xl sm:text-5xl lg:text-6xl">
            4:00 PM – Midnight
          </p>

          {/* Closed note */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-white/10" />
            <p className="text-cream/30 text-xs tracking-[0.3em] uppercase">
              Monday · Closed
            </p>
            <div className="h-px w-10 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ─── Location ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 max-w-3xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <MapPin size={16} className="text-gold" />
                <h3 className="text-cream text-xs font-semibold tracking-[0.2em] uppercase">
                  Find Us
                </h3>
              </div>
              <p className="text-cream/60 text-base leading-relaxed mb-3">
                Shop 30, 130 Bridgeman Dr
                <br />
                Benett Springs WA 6063 · Perth, WA
              </p>
              <a
                href="tel:+61892487000"
                className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
              >
                +61 8 9248 7000
              </a>
            </div>

            <div className="h-px md:h-20 md:w-px bg-white/10 shrink-0" />

            <div className="flex flex-col gap-1">
              <p className="text-cream/30 text-xs tracking-[0.2em] uppercase mb-3">
                This Week
              </p>
              {[
                { days: "Monday", time: "Closed", muted: true },
                { days: "Tue – Sun", time: "4:00 pm – Midnight", muted: false },
              ].map(({ days, time, muted }) => (
                <div key={days} className="flex items-center gap-6">
                  <span className="text-cream/40 text-sm w-20">{days}</span>
                  <span
                    className={`text-sm font-medium ${muted ? "text-cream/25" : "text-cream/80"}`}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px md:h-20 md:w-px bg-white/10 shrink-0" />

            <Link
              href="/contact"
              className="self-start md:self-center inline-flex items-center gap-2 border border-cream/20 text-cream/70 text-sm font-medium tracking-wide px-5 py-2.5 hover:border-gold hover:text-gold transition-colors"
            >
              Get in Touch <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
