import { siteConfig } from "@/lib/site-config";

// JSON-LD structured data — LocalBusiness (FoodEstablishment subtype), so
// Google can understand this as a real catering business rather than just
// parsing page text. Everything here is pulled straight from site-config.ts
// (the single source of truth) -- no address is invented, since Biggy Smallz
// has no public storefront; it's declared as a service-area business via
// `areaServed` instead of a street address. Added 2026-08-24 as part of the
// push to rank for "catering companies" / "personal chef" searches -- this
// pairs with (and should stay in sync with) whatever gets entered into the
// Google Business Profile once that's set up, since matching NAP (name,
// address, phone) details across the site, GBP and any directories is what
// local search actually rewards.
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    additionalType: "https://schema.org/LocalBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/home-hero-og.png`,
    logo: `${siteConfig.url}/logo.png`,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    priceRange: "$$$",
    founder: {
      "@type": "Person",
      name: siteConfig.owner.name,
    },
    areaServed: [
      { "@type": "City", name: "Mbombela" },
      { "@type": "City", name: "Nelspruit" },
      { "@type": "AdministrativeArea", name: "Mpumalanga" },
      { "@type": "AdministrativeArea", name: "Gauteng" },
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Mozambique" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mbombela",
      addressRegion: "Mpumalanga",
      addressCountry: "ZA",
    },
    servesCuisine: ["South African", "Spanish-influenced", "Asian-influenced"],
    sameAs: [
      siteConfig.contact.instagramUrl,
      siteConfig.contact.privateInstagramUrl,
      siteConfig.onAir.href,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
