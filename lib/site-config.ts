/**
 * site-config.ts — single source of truth for business details.
 *
 * Everything a non-developer might want to change lives here: name, contact,
 * service area, the service categories, and the "as seen on" list. Edit this
 * file and the whole site updates.
 *
 * Items marked [CONFIRM] are best-guess placeholders awaiting the owner's
 * confirmation — verify before launch.
 */

export const siteConfig = {
  name: "Biggy Smallz Spitmasters",
  shortName: "Biggy Smallz",
  established: 2017,
  tagline: "Cooking over open flame since 2017",

  owner: {
    name: 'Martin "Biggy" Mhlongo',
    firstName: "Biggy",
  },

  // One-line description used for SEO + Open Graph.
  description:
    "Chef-led fire catering and private dining by Martin “Biggy” Mhlongo — whole-animal spit-roasting to refined plated courses. Mbombela, the Lowveld, and beyond.",

  // Production URL — update once the domain is live (used for OG / canonical).
  url: "https://biggysmallz.co.za",

  contact: {
    // [CONFIRM] 064 850 4066 — the "Chef Biggy" number from his private-chef
    // flyer. Verify it is current before launch.
    phoneDisplay: "064 850 4066",
    // E.164 form for tel: and WhatsApp links (South Africa +27, drop leading 0).
    phoneE164: "+27648504066",
    // [CONFIRM] business email address.
    email: "hello@biggysmallz.co.za",
    instagramHandle: "@biggysmallzspitmasters",
    instagramUrl: "https://www.instagram.com/biggysmallzspitmasters",
  },

  // [CONFIRM] exact areas Martin wants named.
  serviceArea:
    "Based in Mbombela (Nelspruit) and the Lowveld, Mpumalanga — travelling nationally and internationally for events.",
  serviceAreaShort: "Mbombela · the Lowveld · nationwide & abroad",

  // Small, understated credibility strip.
  asSeenOn: [
    "Come Dine With Me (SA)",
    "SUA Magazine",
    "Mozambique Barbecue Festival",
    "Ultimate Braai Master",
  ],

  // The six service categories (Services page). Range, not detail — no prices.
  services: [
    {
      title: "Fine Dining",
      blurb: "Elevated, plated courses, composed with care.",
    },
    {
      title: "The Traveling Chef",
      blurb: "Biggy comes to your home or venue and cooks on site.",
    },
    {
      title: "3–7 Course Plated Service",
      blurb: "A full sit-down dining experience, paced and served.",
    },
    {
      title: "VIP Events",
      blurb:
        "Discreet, high-touch catering for the occasions that matter most.",
    },
    {
      title: "Large-Scale Catering",
      blurb: "Feasts and spreads for the big gatherings, without losing the quality.",
    },
    {
      title: "The Ultimate Braaimaster",
      blurb:
        "Whole-animal spit-roasting and live-flame cooking — the original craft.",
    },
  ],

  // Event types offered in the Book a Date dropdown.
  eventTypes: [
    "Wedding",
    "Private dinner",
    "Birthday / celebration",
    "Corporate / function",
    "Lobola / family gathering",
    "Other",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** WhatsApp click-to-chat link, prefilled with a gentle opener. */
export const whatsappUrl = `https://wa.me/${siteConfig.contact.phoneE164.replace(
  "+",
  "",
)}?text=${encodeURIComponent(
  "Hi Biggy, I'd love to talk about an event.",
)}`;
