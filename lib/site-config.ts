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
    "Personal chef and fire catering from Martin “Biggy” Mhlongo — whole-animal spitbraai to plated, course-by-course dining, brought to wherever the table is. Based in the Mpumalanga Lowveld, catering across South Africa.",

  // Production URL — update once the domain is live (used for OG / canonical).
  url: "https://biggysmallzspitmasters.co.za",

  contact: {
    // [CONFIRM] 064 850 4066 — the "Chef Biggy" number from his private-chef
    // flyer. Verify it is current before launch.
    phoneDisplay: "064 850 4066",
    // E.164 form for tel: and WhatsApp links (South Africa +27, drop leading 0).
    phoneE164: "+27648504066",
    email: "biggy@biggysmallzspitmasters.co.za",
    instagramHandle: "@biggysmallzspitmasters",
    instagramUrl: "https://www.instagram.com/biggysmallzspitmasters",
  },

  // [CONFIRM] exact areas Martin wants named.
  serviceArea:
    "Based in Mbombela (Nelspruit) and the Lowveld, Mpumalanga — travelling nationally and internationally for events.",
  serviceAreaShort: "Mpumalanga · Mozambique · Gauteng · nationwide",

  // Small, understated credibility strip, split into two groups. `logo` is an
  // optional path to an official logo in /public/logos — when present it
  // renders above the name; when omitted (or the file is missing) the name
  // shows on its own. Drop the real PNG/SVG assets at the paths below to
  // light up the logos.
  asSeenOn: [
    {
      name: "Come Dine With Me (SA)",
      logo: "/logos/come-dine-with-me-sa.png",
      // White background knocked out (transparent); enlarged to match.
      logoClass: "h-16",
    },
    {
      name: "Ultimate Braai Master",
      logo: "/logos/ultimate-braai-master.png",
      // Background knocked out (transparent) + sized a touch larger than the
      // rest so the flame/ribbon reads at the same visual weight.
      logoClass: "h-16",
    },
    {
      // Mzansi Magic (DStv 161). Black field knocked out (transparent) and the
      // empty margins trimmed, so it takes the section's background and sits at
      // the same weight as the rest. Source JPEG kept at rate-my-plate.jpeg.
      name: "Rate My Plate",
      logo: "/logos/rate-my-plate.png",
      logoClass: "h-16",
    },
    {
      // Biggy's "Fun Food Friday" appearance on RISE fm's "The Affair With
      // Tlotlang Moletsane" (3 July 2026) -- links straight to the episode
      // instead of a logo (the only source was a low-res Instagram
      // screenshot crop, which didn't hold up next to the others here).
      name: "Rise FM",
      href: "https://iono.fm/e/1692201",
    },
  ] as { name: string; logo?: string; logoClass?: string; href?: string }[],

  catchMeOn: [
    {
      name: "Mozambique Barbecue Festival",
      logo: "/logos/mozambique-barbecue-festival.png",
      // Yellow field + letterbox knocked out (transparent); enlarged to match.
      logoClass: "h-16",
    },
    {
      name: "South Africa Barbecue Festival",
      logo: "/logos/south-africa-barbecue-festival.png",
      logoClass: "h-16",
    },
  ] as { name: string; logo?: string; logoClass?: string }[],

  // The six service categories (Services page). Range, not detail — no prices.
  // The cards render the title only. `image` (a path under /public/images,
  // folder/file.ext) and `alt` are kept as a curated pairing in case pictures
  // come back, but nothing renders them today. `blurb` is likewise unused.
  services: [
    {
      title: "Fine Dining",
      blurb: "Elevated, plated courses, composed with care.",
      image: "anniv7/anniv7-ribeye.png",
      alt: "A reverse-seared rib eye course, plated with broccolini and a red wine jus.",
    },
    {
      title: "The Traveling Chef",
      blurb:
        "Your personal chef for the night — we come to your home or venue and cook on site.",
      image: "wbho/wbho-lamb-spit.png",
      alt: "A whole lamb roasting on the spit with open flame, cooked on site.",
    },
    {
      title: "3–7 Course Plated Service",
      blurb: "A full sit-down dining experience, paced and served.",
      image: "anniv7/anniv7-salmon.png",
      alt: "A sesame-crusted salmon course, plated with herb aioli and dukkah.",
    },
    {
      title: "VIP Events",
      blurb:
        "Discreet, high-touch catering for the occasions that matter most.",
      image: "malinga/malinga-40th-canape-spread.png",
      alt: "A layered welcome-canapé spread on white linen for a milestone celebration.",
    },
    {
      title: "Large-Scale Catering",
      blurb: "Feasts and spreads for the big gatherings, without losing the quality.",
      image: "mozambique/mozambique-hanging-chickens.png",
      alt: "Dozens of whole chickens hanging over open coals at a barbecue festival.",
    },
    {
      title: "The Ultimate Braaimaster",
      blurb:
        "Whole-animal spit-roasting and live-flame cooking — the original craft.",
      // TODO: replace with real photo (original whole-lamb-coals is gone)
      image: "mozambique/mozambique-lamb-spit.png",
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
