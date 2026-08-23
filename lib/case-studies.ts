/**
 * case-studies.ts — every real, documented event, told as a small case study.
 *
 * One is marked `featured`; that's the only one shown on the homepage. The
 * rest live on the /work listing page.
 *
 * Card + hero presentation is one of two kinds:
 *   • slideshowImages — three curated shots that crossfade (the default).
 *   • cover — a single static image (used where an event only has a logo or a
 *     single strong photo, e.g. corporate clients).
 *
 * The detail page then shows the full `gallery` — every photo from the event,
 * each with a caption that matches the menu, per the source Instagram posts.
 * All copy is drawn from Biggy Smallz's own captions, lightly tidied.
 */

export type GalleryItem = { image: string; caption: string; alt: string };
export type CoverImage = { image: string; alt: string };

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  venue?: string;
  date: string;
  teaser: string;
  intro: string[];
  quote?: string;
  /** Link to the source Instagram post for this event, when known. */
  instagramUrl?: string;
  /** Single static cover — used instead of a slideshow when set. */
  cover?: CoverImage;
  /** Three crossfading shots for the card/hero — used when there's no cover. */
  slideshowImages?: [CoverImage, CoverImage, CoverImage];
  /** Every photo from the event, captioned to match the menu. */
  gallery: GalleryItem[];
  featured?: boolean;
};

/**
 * Slugs whose event was for a private client — per Biggy's instruction, we
 * never show the client's name publicly. `displayTitle()` swaps the title
 * for "<category> · <venue>" (or just the category) wherever a title is
 * rendered — card, detail-page heading, and page `<title>`/OG metadata.
 * `lib` intro/quote copy for these two events has also been rewritten to
 * drop the client's name from the prose itself.
 *
 * wbho-site-braai is deliberately left alone — WBHO is a company, not a
 * private individual, so its name reads as ordinary B2B social proof.
 */
export const ANONYMISE_SLUGS = new Set(["rob-leah-wedding", "malinga-40th"]);

export function displayTitle(study: CaseStudy): string {
  if (!ANONYMISE_SLUGS.has(study.slug)) return study.title;
  return study.venue ? `${study.category} · ${study.venue}` : study.category;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "rob-leah-wedding",
    category: "Wedding",
    title: "Rob & Leah's Wedding",
    venue: "Moyres Venue",
    date: "June 2026",
    teaser:
      "A harvest-style spread built to bring people together, spark conversation, and celebrate love through food.",
    intro: [
      "A wedding as beautiful as the setting deserved a table to match. For a couple's special day at Moyres Venue, the team pulled out all the stops — a harvest-style spread designed to bring people together, spark conversation, and celebrate love through food.",
      "The undeniable star of the table was the jamón: hand-carved, beautifully aged and packed with flavour, enjoyed from the first plate to the last and proudly carved by Chef Sikolethu.",
    ],
    quote: "A wedding as beautiful as the setting deserved a table to match.",
    slideshowImages: [
      {
        // TODO: replace with real photo (original wedding-rl-plating-wide is gone)
        image: "wedding-rob-leah/wedding-rob-leah-plating-2.png",
        alt: "Biggy plating at the harvest table while guests sit alongside.",
      },
      {
        image: "wedding-rob-leah/wedding-rl-buffet.png",
        alt: "Biggy at the harvest buffet as guests gather around the spread.",
      },
      {
        // TODO: replace with real photo (original wedding-rob-leah-jamon is gone)
        image: "wedding-rob-leah/wedding-rob-leah-spread.png",
        alt: "The harvest table laid out end to end, guests gathered behind it.",
      },
    ],
    instagramUrl: undefined,
    gallery: [
      { image: "wedding-rob-leah/wedding-rob-leah-plating.png", caption: "Biggy & Chef Sikolethu, plating together", alt: "Biggy and Chef Sikolethu plating together at the table." },
      { image: "wedding-rob-leah/wedding-rl-buffet.png", caption: "Guests at the harvest spread", alt: "Guests gathering at the harvest buffet." },
      // TODO: confirm captions — the ribs and chakalaka photos were removed from
      // /images/wedding-rob-leah, so these two are stand-ins described from the
      // photos themselves rather than from the event's own menu captions.
      { image: "wedding-rob-leah/JNEB5264.JPG", caption: "Roasted bone marrow, plated at the pass", alt: "Roasted marrow bones with herbs and oil, plated across the pass." },
      { image: "wedding-rob-leah/PJMI3890.JPG", caption: "Dips, breads and pastries down the table", alt: "Dips, warm breads and pastries laid down the length of the table." },
    ],
    featured: true,
  },
  {
    slug: "malinga-40th",
    category: "Milestone Birthday",
    title: "Mr Malinga's 40th",
    date: "April 2026",
    teaser:
      "A milestone marked in true style — every bite handpicked, a reflection of the man being celebrated.",
    intro: [
      "We had the honour of hosting a milestone 40th birthday celebration, marked in true style. Every bite on the menu was handpicked, a reflection of the guest of honour's favourites, curated to be shared with the people closest to his heart.",
      "From rich, hearty dishes to beautifully layered flavours, the table told a story of abundance, love, and legacy. It wasn't just a meal — it was an experience of opulence, laughter, and moments that will be cherished for years to come.",
    ],
    quote: "The table told a story of abundance, love, and legacy.",
    slideshowImages: [
      { image: "malinga/malinga-40th-canape-spread.png", alt: "A layered welcome-canapé spread on white linen." },
      { image: "malinga/malinga-40th-buffet-view.png", alt: "The buffet laid out on a covered patio with a Lowveld view." },
      { image: "malinga/malinga-40th-green-beans.png", alt: "Sautéed green bean and basil pesto salad, plated long." },
    ],
    instagramUrl: undefined,
    gallery: [
      { image: "malinga/malinga-40th-canape-spread.png", caption: "Welcome canapés", alt: "A layered welcome-canapé spread on white linen." },
      { image: "malinga/malinga-canape-tower.png", caption: "Slider canapé tower", alt: "A tower of slider canapés on a white platter." },
      { image: "malinga/malinga-40th-green-beans.png", caption: "Sautéed green bean & basil pesto salad", alt: "Sautéed green bean and basil pesto salad with feta." },
      { image: "malinga/malinga-green-goddess.png", caption: "Chopped green goddess salad", alt: "A chopped green goddess salad." },
    ],
  },
  {
    slug: "seven-year-anniversary-dinner",
    category: "Private Fine Dining",
    title: "A 7-Year Anniversary Dinner",
    date: "April 2026",
    teaser:
      "An elevated four-course dining experience for a couple celebrating seven years — memories made through food.",
    intro: [
      "We had the honour of curating an elevated four-course dining experience for a special client celebrating her and her husband's seven-year wedding anniversary. Being entrusted with such a meaningful moment is always a privilege.",
      "Creating memories through food is what we love most — and this one, we truly enjoyed.",
    ],
    quote: "Creating memories through food is what we love most.",
    slideshowImages: [
      { image: "anniv7/anniv7-ribeye.png", alt: "Reverse-seared rib eye with fondant potato, broccolini and bok choy." },
      { image: "anniv7/anniv7-salmon.png", alt: "Sesame-crusted lightly smoked salmon on a charred corn crudo." },
      { image: "anniv7/anniv7-dessert.png", alt: "A Lindt chocolate chilli brownie with strawberries and pistachio ice cream." },
    ],
    instagramUrl: undefined,
    gallery: [
      { image: "anniv7/anniv7-salmon.png", caption: "Starter — sesame-crusted lightly smoked salmon, herb aioli, dukkah, charred corn crudo", alt: "Sesame-crusted lightly smoked salmon on a charred corn crudo." },
      // TODO: replace with real photo — the amuse course (marinated beet
      // carpaccio, whipped crème fraîche, citrus vinaigrette) has no usable
      // photo, so the entry is dropped rather than shown with a wrong image.
      { image: "anniv7/anniv7-ribeye.png", caption: "Main — reverse-seared rib eye, fondant potato, broccolini, bok choy, red wine jus", alt: "Reverse-seared rib eye with fondant potato and broccolini." },
      { image: "anniv7/anniv7-dessert.png", caption: "Dessert — Lindt chocolate chilli brownie, strawberry, pistachio ice cream", alt: "A Lindt chocolate chilli brownie with strawberries and pistachio ice cream." },
    ],
  },
  {
    slug: "wbho-site-braai",
    category: "Corporate",
    title: "WBHO Site Send-Off Braai",
    venue: "Pretoria",
    date: "March 2023",
    teaser:
      "A whole lamb on the spit and meats served warm from the fire, brought to the site to send off a colleague.",
    intro: [
      "The WBHO Pretoria site ordered their “Get In My Belly” experience as they bid farewell to a colleague — and we brought the fire to them. A whole lamb turning on the spit, trays of meats served warm straight from the coals, and a queue of hard hats and hi-vis that told us all we needed to know.",
      "Site braais, travel cooks — noma yini, we got you.",
    ],
    quote: "Site braais. Travel cooks. Noma yini, WE GOT YOU!",
    slideshowImages: [
      { image: "wbho/wbho-lamb-spit.png", alt: "A whole lamb roasting on the spit with open flame." },
      // TODO: replace with real photo (original wbho-meats-spit is gone)
      { image: "wbho/wbho-glazed-chicken.png", alt: "Glazed sesame-topped chicken in a tray, served warm from the fire." },
      // TODO: replace with real photo (original wbho-team-queue is gone)
      { image: "wbho/wbho-rice-pilaf.png", alt: "Wild rice pilaf salad with lemon, served alongside the braai." },
    ],
    instagramUrl: undefined,
    gallery: [
      { image: "wbho/wbho-lamb-spit.png", caption: "Whole lamb on the spit", alt: "A whole lamb roasting on the spit with open flame." },
      // TODO: replace with real photo (original wbho-meats-spit is gone)
      { image: "wbho/wbho-curry-spinach.png", caption: "Creamed curry spinach", alt: "Creamed curry spinach in a serving dish." },
      { image: "wbho/wbho-rice-pilaf.png", caption: "Wild rice pilaf salad", alt: "Wild rice pilaf salad with lemon." },
      { image: "wbho/wbho-glazed-chicken.png", caption: "Glazed chicken", alt: "Glazed sesame-topped chicken in a tray." },
    ],
  },
];

export const featuredCaseStudy =
  caseStudies.find((c) => c.featured) ?? caseStudies[0];

export const otherCaseStudies = caseStudies.filter((c) => !c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
