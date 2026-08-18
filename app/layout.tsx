import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import "./globals.css";

// Utility / body face — Archivo, a crisp warm grotesque. Carries the stamped
// uppercase labels, navigation, buttons and body copy. Distinct, not default.
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Display face — Fraunces, an optical "old-style" serif with craft and
// appetite. Used large and mixed-case for headlines; italic carries flavour.
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Spitbraai & fine-dining catering`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "spitbraai",
    "spit braai catering",
    "private chef Mbombela",
    "private dining Nelspruit",
    "fire catering",
    "whole lamb spit",
    "Lowveld catering",
    siteConfig.name,
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Spitbraai & fine-dining catering`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/mozambique-lamb-spit.png",
        width: 1200,
        height: 1200,
        alt: "A whole lamb on the cross-spit over open coals — Biggy Smallz Spitmasters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Spitbraai & fine-dining catering`,
    description: siteConfig.description,
    images: ["/images/mozambique-lamb-spit.png"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-ink text-cream antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ember focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <FloatingCta />
        <Footer />
      </body>
    </html>
  );
}
