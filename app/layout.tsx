import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
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
    "personal chef Nelspruit",
    "private dining Nelspruit",
    "fire catering",
    "whole lamb spit",
    "Lowveld catering",
    "catering company Mpumalanga",
    "catering companies Nelspruit",
    "wedding caterer Mbombela",
    "event catering South Africa",
    siteConfig.name,
  ],
  // The link-share preview (WhatsApp/iMessage/socials) deliberately mirrors
  // the homepage hero rather than the neutral SEO title/description above —
  // per TK: "I want the home page hero to show when I send the link." Uses a
  // dedicated image (home-hero-og.png) rather than the raw hero photo or the
  // live page's own CSS treatment: cropped tighter on Biggy + the lamb, then
  // graded with the site's actual ink/flame/gold values (see tailwind.config)
  // so it reads as the same dark, fire-lit world instead of a flat festival
  // snapshot — a straight CSS-brightness(0.32) dim reads as illegible black
  // in a small chat thumbnail with no HTML text overlay to lean on, so this
  // is tuned lighter. Headline + eyebrow + gold rule are burned into the
  // image itself in the real Cinzel typeface (pulled from Google Fonts,
  // since this can't reach the page's own font loader). Every other page
  // sets its own openGraph/twitter block and is unaffected.
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Get in my belly.`,
    description:
      "Personal chef catering, brought to wherever your table is — from whole-fire spitbraai to a quiet seven-course evening.",
    images: [
      {
        url: "/images/home-hero-og.png",
        width: 1040,
        height: 1040,
        alt: "Get in my belly — Biggy Smallz Spitmasters. Biggy carving a whole roasted lamb straight off the spit.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Get in my belly.`,
    description:
      "Personal chef catering, brought to wherever your table is — from whole-fire spitbraai to a quiet seven-course evening.",
    images: ["/images/home-hero-og.png"],
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
        <LocalBusinessSchema />
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
