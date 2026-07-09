import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Table | Tasty Bites — Modern Pakistani Cuisine, Morley",
  description:
    "Reserve a table at Tasty Bites, Morley. Open Tuesday–Sunday from 4pm. Book online or call +61 8 9248 7000.",
};

const hours = [
  { days: "Monday", time: "Closed", closed: true },
  { days: "Tuesday – Sunday", time: "4:00 pm – Midnight", closed: false },
];

export default function BookPage() {
  return (
    <>
      {/* ─── Page Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-espresso-deep pt-18">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">
            Tasty Bites
          </p>
          <h1 className="font-serif text-cream text-5xl lg:text-6xl font-bold leading-tight">
            Book a Table
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-6 mb-6 opacity-60" />
          <p className="text-cream/50 text-sm max-w-sm mx-auto leading-relaxed">
            Reserve your table in a few clicks. We&rsquo;ll take care of the rest.
          </p>
        </div>
      </section>

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-3">
                  Reservation Details
                </p>
                <h2 className="font-serif text-espresso text-3xl font-bold">
                  Reserve Your Table
                </h2>
                <div className="w-8 h-px bg-gold mt-4" />
              </div>
              <BookingForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-espresso flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <h3 className="text-espresso text-xs font-semibold tracking-[0.2em] uppercase">
                    Find Us
                  </h3>
                </div>
                <p className="text-warm-brown text-sm leading-relaxed pl-11">
                  Shop 30, 130 Bridgeman Dr
                  <br />
                  Benett Springs WA 6063
                  <br />
                  Perth, Western Australia
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-espresso flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-gold" />
                  </div>
                  <h3 className="text-espresso text-xs font-semibold tracking-[0.2em] uppercase">
                    Phone
                  </h3>
                </div>
                <a
                  href="tel:+61892487000"
                  className="text-warm-brown text-sm pl-11 block hover:text-gold transition-colors"
                >
                  +61 8 9248 7000
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-espresso flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-gold" />
                  </div>
                  <h3 className="text-espresso text-xs font-semibold tracking-[0.2em] uppercase">
                    Opening Hours
                  </h3>
                </div>
                <div className="pl-11 space-y-3">
                  {hours.map(({ days, time, closed }) => (
                    <div key={days}>
                      <p className="text-warm-brown-light text-xs">{days}</p>
                      <p
                        className={`text-sm font-medium ${closed ? "text-warm-brown-light" : "text-espresso"}`}
                      >
                        {time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
