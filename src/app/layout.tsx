import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasty Bites | Modern Pakistani Cuisine | Morley, Perth",
  description:
    "Tasty Bites Restaurant & Bistro — modern Pakistani cuisine by Lal Qila in Morley, Perth. Dine in or order takeaway. Open Tuesday–Sunday from 4pm.",
  keywords: [
    "Pakistani restaurant",
    "Morley",
    "Perth",
    "Pakistani cuisine",
    "mandi",
    "dine in",
    "takeaway",
    "Lal Qila",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="flex flex-col min-h-screen antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
