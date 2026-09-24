import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import "./globals.css";

// Stage 7 rollout (2026-09-24): the identity's two voices, self-hosted from
// brand-identity/_build/fonts (SIL OFL), so the site never waits on Google.
// Oswald — loud: headlines, eyebrows, nav, buttons. Source Serif 4 — quiet:
// everything you read.
const display = localFont({
  src: [
    { path: "./fonts/oswald-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/oswald-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/source-serif-4-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/source-serif-4-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/source-serif-4-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
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
    // Stage 7 (2026-09-24): rebuilt in the identity at Facebook's link size
    // (1200x630): Biggy slicing at the Mozambique Barbecue Festival, the
    // redrawn badge, "Get in my belly." in Oswald. The old 1040x1040 image had
    // the retired Cinzel type burned in. Source: brand/rollout/templates.
    images: [
      {
        url: "/images/og-2026.png",
        width: 1200,
        height: 630,
        alt: "Get in my belly. Biggy Smallz Spitmasters: Biggy slicing meat at the Mozambique Barbecue Festival, beside the Spitmasters badge.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Get in my belly.`,
    description:
      "Personal chef catering, brought to wherever your table is — from whole-fire spitbraai to a quiet seven-course evening.",
    images: ["/images/og-2026.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
