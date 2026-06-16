import type { Metadata } from "next";
import { Oswald, Spectral } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import "./globals.css";

// Display face — condensed, bold, stamped feel echoing the logo lettering.
const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body face — warm, highly readable serif for restrained luxury.
const body = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Chef-led fire catering`,
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
    title: `${siteConfig.name} — Chef-led fire catering`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/anniversary-salmon.png",
        width: 1200,
        height: 1200,
        alt: "A refined plated dish from Biggy Smallz Spitmasters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Chef-led fire catering`,
    description: siteConfig.description,
    images: ["/images/anniversary-salmon.png"],
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
