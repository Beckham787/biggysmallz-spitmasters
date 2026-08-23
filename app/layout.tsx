import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import "./globals.css";

// Display face — Cinzel, a carved small-caps serif with real restaurant-
// signage/menu-header presence. Carries headings, eyebrows, nav, buttons and
// stamped labels. The "walking into a fine-dining room" direction, picked
// 2026-08-22 — replaces the earlier Archivo/Fraunces/Anton system.
const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

// Body face — EB Garamond, a classic book serif. Carries paragraph copy,
// often set in italic for a quiet, menu-card warmth.
const body = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Personal chef, spitbraai & fine-dining catering`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "spitbraai",
    "spit braai catering",
    "personal chef",
    "personal chef Mbombela",
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
    title: `${siteConfig.name} — Personal chef, spitbraai & fine-dining catering`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/mozambique/mozambique-lamb-spit.png",
        width: 1200,
        height: 1200,
        alt: "A whole lamb on the cross-spit over open coals — Biggy Smallz Spitmasters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Personal chef, spitbraai & fine-dining catering`,
    description: siteConfig.description,
    images: ["/images/mozambique/mozambique-lamb-spit.png"],
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
