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
  established: 2018,
  tagline: "Cooking over open flame since 2018",

  owner: {
    name: 'Martin "Biggy" Mhlongo',
    firstName: "Biggy",
  },

  // One-line description used for SEO + Open Graph.
  description:
    "Fire catering from Martin “Biggy” Mhlongo — whole-animal spitbraai to refined plated courses. Professional chefs lead the fine-dining dinners and weddings; a team trained in Biggy’s own methods handles every other event. Based in the Mpumalanga Lowveld, catering across South Africa.",

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
  serviceAreaShort: "Mpumalanga · Mozambique · Gauteng · nationwide",

  // Small, understated credibility strip. `logo` is an optional path to an
  // official logo in /public/logos — when present it renders above the name;
  // when omitted (or the file is missing) the name shows on its own. Drop the
  // real PNG/SVG assets at the paths below to light up the logos.
  asSeenOn: [
    {
      name: "Come Dine With Me (SA)",
      logo: "/logos/come-dine-with-me-sa.png",
      // White background knocked out (transparent); enlarged to match.
      logoClass: "h-16",
    },
    {
      // No logo file yet — shows name-only until one is added at
      // /logos/sua-magazine.jpg (then set the logo path here).
      name: "SUA Magazine",
    },
    {
      name: "Mozambique Barbecue Festival",
      logo: "/logos/mozambique-barbecue-festival.png",
      // Yellow field + letterbox knocked out (transparent); enlarged to match.
      logoClass: "h-16",
    },
    {
      name: "Ultimate Braai Master",
      logo: "/logos/ultimate-braai-master.png",
      // Background knocked out (transparent) + sized a touch larger than the
      // rest so the flame/ribbon reads at the same visual weight.
      logoClass: "h-16",
    },
  ] as { name: string; logo?: string; logoClass?: string }[],

  // The six service categories (Services page). Range, not detail — no prices.
  // `image` is a slug in /public/images, paired so each card carries appetite
  // appeal; `alt` describes it for screen readers.
  services: [
    {
      title: "Fine Dining",
      blurb: "Elevated, plated courses, composed with care.",
      image: "anniversary-salmon",
      alt: "A sesame-crusted salmon course, plated with herb and dukkah.",
    },
    {
      title: "The Traveling Chef",
      blurb: "Biggy comes to your home or venue and cooks on site.",
      image: "biggy-plating-lamb",
      alt: "Chef Biggy plating a lamb dish on site, at the pass.",
    },
    {
      title: "3–7 Course Plated Service",
      blurb: "A full sit-down dining experience, paced and served.",
      image: "private-dining-lamb-rack",
      alt: "A rack of lamb, carved and plated for a private dinner.",
    },
    {
      title: "VIP Events",
      blurb:
        "Discreet, high-touch catering for the occasions that matter most.",
      image: "buffet-white-function",
      alt: "A buffet set for an elegant white-linen function.",
    },
    {
      title: "Large-Scale Catering",
      blurb: "Feasts and spreads for the big gatherings, without losing the quality.",
      image: "garden-party-spread",
      alt: "A generous spread laid out for a large garden party.",
    },
    {
      title: "The Ultimate Braaimaster",
      blurb:
        "Whole-animal spit-roasting and live-flame cooking — the original craft.",
      image: "whole-lamb-coals",
      alt: "A whole lamb roasting slowly over glowing coals.",
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
