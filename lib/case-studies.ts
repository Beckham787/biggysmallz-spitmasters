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
  /** Single static cover — used instead of a slideshow when set. */
  cover?: CoverImage;
  /** Three crossfading shots for the card/hero — used when there's no cover. */
  slideshowImages?: [CoverImage, CoverImage, CoverImage];
  /** Every photo from the event, captioned to match the menu. */
  gallery: GalleryItem[];
  featured?: boolean;
};

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
      "A wedding as beautiful as the setting deserved a table to match. For Rob & Leah's special day at Moyres Venue, the team pulled out all the stops — a harvest-style spread designed to bring people together, spark conversation, and celebrate love through food.",
      "The undeniable star of the table was the jamón: hand-carved, beautifully aged and packed with flavour, enjoyed from the first plate to the last and proudly carved by Chef Sikolethu.",
    ],
    quote: "A wedding as beautiful as the setting deserved a table to match.",
    slideshowImages: [
      {
        image: "wedding-rl-plating-wide",
        alt: "Biggy plating at the harvest table while the couple sit alongside.",
      },
      {
        image: "wedding-rl-buffet",
        alt: "Biggy at the harvest buffet as guests gather around the spread.",
      },
      {
        image: "wedding-rob-leah-jamon",
        alt: "Hand-carved jamón, aged and thinly sliced, on a wooden stand.",
      },
    ],
    gallery: [
      { image: "wedding-rl-plating-wide", caption: "Plating at the harvest table", alt: "Biggy plating at the harvest table while the couple sit alongside." },
      { image: "wedding-rob-leah-plating", caption: "Biggy & Chef Sikolethu, plating together", alt: "Biggy and Chef Sikolethu plating together at the table." },
      { image: "wedding-rl-buffet", caption: "Guests at the harvest spread", alt: "Guests gathering at the harvest buffet." },
      { image: "wedding-rl-spread-wide", caption: "The full harvest spread", alt: "The full harvest-style spread laid out on white linen." },
      { image: "wedding-rob-leah-jamon", caption: "Hand-carved jamón", alt: "Hand-carved jamón on a wooden stand." },
      { image: "wedding-rl-chimi-lamb", caption: "Red smoked vino chimichurri lamb & citrus roasted chicken", alt: "Chimichurri lamb and citrus roasted chicken." },
      { image: "wedding-rl-ribs", caption: "Smoked bourbon BBQ pork ribs", alt: "Smoked bourbon BBQ pork ribs on a board." },
      { image: "wedding-rob-leah-arancini", caption: "Grana Padano stuffed arancini", alt: "Grana Padano stuffed arancini plated in a row." },
      { image: "wedding-rob-leah-butternut", caption: "Grilled butternut, citrus & feta", alt: "Grilled butternut with citrus, feta and spiced seeds." },
      { image: "wedding-rl-chakalaka", caption: "Upper North chakalaka", alt: "Upper North chakalaka in a bowl." },
      { image: "wedding-rl-duck-potatoes", caption: "Duck fat roasted potatoes", alt: "Duck fat roasted potatoes with herbs." },
      { image: "wedding-rl-green-goddess", caption: "Green goddess salad", alt: "A green goddess salad platter." },
      { image: "wedding-rl-beetroot-hummus", caption: "Roasted beetroot hummus", alt: "Roasted beetroot hummus with pomegranate." },
      { image: "wedding-rl-moroccan-hummus", caption: "Moroccan-spiced hummus", alt: "Moroccan-spiced hummus with herbs and pomegranate." },
    ],
    featured: true,
  },
  {
    slug: "mozambique-barbecue-festival",
    category: "Festival",
    title: "Mozambique Barbecue Festival",
    venue: "Maputo, Mozambique",
    date: "November 2022",
    teaser:
      "Whole animals on the cross-spit and open coals — South African fire, served all the way to Mozambique.",
    intro: [
      "Some fires you travel for. Biggy Smallz was invited to cook at the Mozambique Barbecue Festival — whole lamb splayed on the cross-spit over open coals, cuts hung on chains above the pit, chickens and pineapples smoking side by side.",
      "The experience was delivered, and mostly, the food was served. South African live-fire cooking, carried across the border and set down over a bed of coals.",
    ],
    quote: "Experience was delivered. Mostly, food was served.",
    slideshowImages: [
      { image: "mozambique-lamb-spit", alt: "A whole lamb splayed on a cross-spit over open coals." },
      { image: "mozambique-hanging-chickens", alt: "Whole chickens and pineapples hanging from an iron dome rig over coals." },
      { image: "mozambique-hanging-meats", alt: "Cuts of meat hanging on chains over an open fire pit." },
    ],
    gallery: [
      { image: "mozambique-lamb-spit", caption: "Whole lamb on the cross-spit", alt: "A whole lamb splayed on a cross-spit over open coals." },
      { image: "mozambique-hanging-chickens", caption: "Chickens & pineapples on the dome rig", alt: "Whole chickens and pineapples hanging from an iron dome rig over coals." },
      { image: "mozambique-hanging-meats", caption: "Cuts hung over the fire pit", alt: "Cuts of meat hanging on chains over an open fire pit." },
      { image: "mozambique-pineapples", caption: "Whole pineapples roasting over coals", alt: "Whole pineapples roasting on a rack over coals." },
      { image: "mozambique-stall", caption: "The Biggy Smallz stall at the festival", alt: "The branded Biggy Smallz Spitmasters stall at the festival." },
    ],
  },
  {
    slug: "malinga-40th",
    category: "Milestone Birthday",
    title: "Mr Malinga's 40th",
    date: "April 2026",
    teaser:
      "A milestone marked in true style — every bite handpicked, a reflection of the man being celebrated.",
    intro: [
      "We had the honour of serving Mr Malinga and his guests for his 40th birthday — a milestone marked in true style. Every bite on the menu was handpicked, a reflection of his favourites, curated to be shared with the people closest to his heart.",
      "From rich, hearty dishes to beautifully layered flavours, the table told a story of abundance, love, and legacy. It wasn't just a meal — it was an experience of opulence, laughter, and moments that will be cherished for years to come.",
    ],
    quote: "The table told a story of abundance, love, and legacy.",
    slideshowImages: [
      { image: "malinga-40th-canape-spread", alt: "A layered welcome-canapé spread on white linen." },
      { image: "malinga-40th-buffet-view", alt: "The buffet laid out on a covered patio with a Lowveld view." },
      { image: "malinga-40th-green-beans", alt: "Sautéed green bean and basil pesto salad, plated long." },
    ],
    gallery: [
      { image: "malinga-40th-canape-spread", caption: "Welcome canapés", alt: "A layered welcome-canapé spread on white linen." },
      { image: "malinga-40th-buffet-view", caption: "The buffet, with a Lowveld view", alt: "The buffet on a covered patio with a mountain and forest view." },
      { image: "malinga-canape-tower", caption: "Slider canapé tower", alt: "A tower of slider canapés on a white platter." },
      { image: "malinga-40th-green-beans", caption: "Sautéed green bean & basil pesto salad", alt: "Sautéed green bean and basil pesto salad with feta." },
      { image: "malinga-green-goddess", caption: "Chopped green goddess salad", alt: "A chopped green goddess salad." },
      { image: "malinga-spit-veg", caption: "Spit-roasted vegetables, dukkah finish", alt: "Spit-roasted corn and potatoes with a dukkah finish." },
      { image: "malinga-cream-spinach", caption: "Cape Malay coconut curry cream spinach", alt: "Cape Malay coconut curry cream spinach." },
      { image: "malinga-yellowtail", caption: "Whole grilled yellowtail, white wine sauce", alt: "Whole grilled yellowtail with a creamy white wine sauce." },
      { image: "malinga-citrus-chicken", caption: "Citrus-spiced roast chicken", alt: "Citrus-spiced roast chicken pieces." },
      { image: "malinga-korean-boar", caption: "Korean BBQ wild boar", alt: "Korean BBQ wild boar, glazed." },
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
      { image: "anniv7-ribeye", alt: "Reverse-seared rib eye with fondant potato, broccolini and bok choy." },
      { image: "anniv7-salmon", alt: "Sesame-crusted lightly smoked salmon on a charred corn crudo." },
      { image: "anniv7-dessert", alt: "A Lindt chocolate chilli brownie with strawberries and pistachio ice cream." },
    ],
    gallery: [
      { image: "anniv7-salmon", caption: "Starter — sesame-crusted lightly smoked salmon, herb aioli, dukkah, charred corn crudo", alt: "Sesame-crusted lightly smoked salmon on a charred corn crudo." },
      { image: "anniv7-beet", caption: "Amuse — marinated beet carpaccio, whipped crème fraîche, citrus vinaigrette", alt: "Marinated beet carpaccio with whipped crème fraîche." },
      { image: "anniv7-ribeye", caption: "Main — reverse-seared rib eye, fondant potato, broccolini, bok choy, red wine jus", alt: "Reverse-seared rib eye with fondant potato and broccolini." },
      { image: "anniv7-dessert", caption: "Dessert — Lindt chocolate chilli brownie, strawberry, pistachio ice cream", alt: "A Lindt chocolate chilli brownie with strawberries and pistachio ice cream." },
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
      { image: "wbho-lamb-spit", alt: "A whole lamb roasting on the spit with open flame." },
      { image: "wbho-meats-spit", alt: "Trays of shredded lamb, boerewors and chicken warm from the spit." },
      { image: "wbho-team-queue", alt: "Site workers in WBHO hi-vis vests queuing for food." },
    ],
    gallery: [
      { image: "wbho-lamb-spit", caption: "Whole lamb on the spit", alt: "A whole lamb roasting on the spit with open flame." },
      { image: "wbho-meats-spit", caption: "Meats served warm from the spit", alt: "Trays of shredded lamb, boerewors and chicken warm from the spit." },
      { image: "wbho-team-queue", caption: "The site team, queuing up", alt: "Site workers in WBHO hi-vis vests queuing for food." },
      { image: "wbho-chakalaka", caption: "Upper North chakalaka", alt: "Upper North chakalaka in a wooden bowl." },
      { image: "wbho-curry-spinach", caption: "Cape Malay coconut curry spinach", alt: "Cape Malay coconut curry spinach." },
      { image: "wbho-rice-pilaf", caption: "Wild rice pilaf salad", alt: "Wild rice pilaf salad with lemon." },
      { image: "wbho-spit-potatoes", caption: "Spit-roasted potatoes", alt: "Spit-roasted potatoes in a tray." },
      { image: "wbho-glazed-chicken", caption: "Glazed chicken", alt: "Glazed sesame-topped chicken in a tray." },
      { image: "wbho-lamb-wors", caption: "Spicy Klein Karoo lamb wors, Bisto relish", alt: "Spicy lamb wors in a Bisto relish." },
      { image: "wbho-asian-chicken", caption: "Asian BBQ roast chicken", alt: "Glossy Asian BBQ roast chicken." },
    ],
  },
  {
    slug: "mdhluli-family",
    category: "Family Celebration",
    title: "The Mdhluli Family",
    date: "September 2024",
    teaser:
      "A “Get In My Belly” spread for the whole family — and they left no crumbs.",
    intro: [
      "We had the opportunity to serve the Mdhluli family, and what a wave of a time we had. A generous “Get In My Belly” spread ran from Cape Malay coconut curry snapper to lamb spitbraai in a red smoked vino chimichurri, with sides layered for the table.",
      "Lots of love went into this cook — and we loved how the family left no crumbs.",
    ],
    quote: "Lots of love went into this cook — the family left no crumbs.",
    slideshowImages: [
      { image: "mdhluli-snapper", alt: "Whole Cape Malay coconut curry red snapper with microgreens." },
      { image: "mdhluli-lamb-chimichurri", alt: "Lamb spitbraai shredded in a red smoked vino chimichurri." },
      { image: "mdhluli-duck-potatoes", alt: "Duck fat roasted potatoes dressed with flowers." },
    ],
    gallery: [
      { image: "mdhluli-snapper", caption: "Cape Malay coconut curry whole red snapper", alt: "Whole Cape Malay coconut curry red snapper with microgreens." },
      { image: "mdhluli-lamb-chimichurri", caption: "Lamb spitbraai, red smoked vino chimichurri", alt: "Lamb spitbraai in a red smoked vino chimichurri sauce." },
      { image: "mdhluli-duck-potatoes", caption: "Duck fat roasted potatoes", alt: "Duck fat roasted potatoes with microgreens." },
      { image: "mdhluli-sweet-potatoes", caption: "Cinnamon roasted sweet potatoes, salted caramel & pistachios", alt: "Cinnamon roasted sweet potatoes with salted caramel and pistachios." },
      { image: "mdhluli-garlic-bread", caption: "Artisanal garlic bread", alt: "Artisanal garlic bread loaves." },
      { image: "mdhluli-pesto-beans", caption: "Pesto green beans, gremolata Greek yoghurt", alt: "Pesto green beans on a bed of gremolata Greek yoghurt." },
      { image: "mdhluli-elote-corn", caption: "Elote corn, green aioli & crispy onions", alt: "Elote corn with green aioli and crispy onions." },
      { image: "mdhluli-citrus-chicken", caption: "Roasted chicken in a citrus-spiced sauce", alt: "Roasted chicken pieces in a citrus-spiced sauce." },
    ],
  },
  {
    slug: "touring-bachelor-braai",
    category: "Bachelor Party",
    title: "A Touring Bachelor Braai",
    date: "September 2024",
    teaser:
      "A full braai menu for a group of gents who toured to South Africa to send off one of their mates.",
    intro: [
      "We were privileged to serve a braai menu for a group of gentlemen who toured all the way to South Africa to host one of their mates' bachelor send-off. A proper spread of spit, sides and everything in between.",
      "Thank you lads for the lekka time.",
    ],
    quote: "Thank you lads for the lekka time!",
    slideshowImages: [
      { image: "bachelor-chimi-lamb", alt: "Red smoked vino chimichurri lamb spit, shredded on a tray." },
      { image: "bachelor-braai-pap", alt: "Creamy braai pap in a chafing dish." },
      { image: "bachelor-elote-corn", alt: "Spit-roasted elote corn with green sauce." },
    ],
    gallery: [
      { image: "bachelor-chimi-lamb", caption: "Red smoked vino chimichurri lamb spit", alt: "Red smoked vino chimichurri lamb spit, shredded." },
      { image: "bachelor-braai-pap", caption: "S'good s'nice braai pap", alt: "Creamy braai pap in a chafing dish." },
      { image: "bachelor-parmesan-potatoes", caption: "Wagyu tallow roasted parmesan potatoes", alt: "Wagyu tallow roasted parmesan potatoes." },
      { image: "bachelor-elote-corn", caption: "Spit-roasted elote corn", alt: "Spit-roasted elote corn with a green sauce." },
      { image: "bachelor-beet-pumpkin-salad", caption: "Roasted beet & pumpkin salad", alt: "Roasted beet and pumpkin salad platters." },
      { image: "bachelor-boerewors", caption: "100% beef boerewors, Bisto relish", alt: "Beef boerewors in a tomato Bisto relish." },
      { image: "bachelor-garlic-bread", caption: "Artisanal garlic breads", alt: "Artisanal garlic breads sliced on foil." },
      { image: "bachelor-citrus-chicken", caption: "Citrus-spiced chicken roast", alt: "Citrus-spiced chicken roast in a pot." },
    ],
  },
  {
    slug: "itec-tiyende-awards",
    category: "Corporate",
    title: "Itec Tiyende Year-End Awards",
    date: "March 2023",
    teaser:
      "A “Get In My Belly” experience catered for a company's end-of-year awards celebration.",
    intro: [
      "Thank you Itec Tiyende for ordering our “Get In My Belly” experience for your end-year awards event. From chimichurri lamb to warm spiced sides, the spread was built to feed a celebration.",
      "What an absolute pleasure it was serving the team.",
    ],
    quote: "What an absolute pleasure it was serving the team!",
    cover: {
      image: "itec-logo",
      alt: "The Itec Tiyende logo.",
    },
    gallery: [
      { image: "itec-chimi-lamb", caption: "Red smoked apricot chimichurri lamb", alt: "Red smoked apricot chimichurri lamb, shredded." },
      { image: "itec-citrus-chicken", caption: "Citrus-spiced roast chicken", alt: "Citrus-spiced roast chicken in a tray." },
      { image: "itec-duck-potatoes", caption: "Roasted duck fat potatoes", alt: "Roasted duck fat potatoes." },
      { image: "itec-garlic-bread", caption: "Artisanal garlic bread", alt: "Artisanal garlic bread with roasted potatoes." },
      { image: "itec-couscous", caption: "Warm spiced couscous salad", alt: "Warm spiced couscous salad in a wooden bowl." },
    ],
  },
  {
    slug: "earth-logistics",
    category: "Corporate",
    title: "Earth Logistics",
    date: "March 2023",
    teaser:
      "A whole 20kg Klein Karoo lamb on the spit, catered on site for the Earth Logistics team.",
    intro: [
      "Thank you Earth Logistics for ordering our “Get In My Belly” experience — 20 kilos of Klein Karoo lamb on the spit, roast potatoes and elote corn, served right to the team.",
      "What an absolute pleasure it was serving the team.",
    ],
    quote: "What an absolute pleasure it was serving the team!",
    cover: {
      image: "earth-logistics-logo",
      alt: "The Earth Logistics logo.",
    },
    gallery: [
      { image: "earth-lamb-spit", caption: "20kg Klein Karoo lamb on the spit, roast potatoes & elote corn", alt: "A 20kg Klein Karoo lamb on the spit." },
      { image: "earth-elote-corn", caption: "Elote corn, roasted garlic whipped feta, crispy onions", alt: "Elote corn with roasted garlic whipped feta and crispy onions." },
      { image: "earth-chef-serving", caption: "Meat Master Mbongeni serving the team", alt: "Chef Mbongeni serving a guest from the chafing trays." },
    ],
  },
  {
    slug: "sunday-lunch-launch",
    category: "Menu Launch",
    title: "The Sunday Lunch Menu",
    date: "June 2023",
    teaser:
      "Drawing on the most-loved dishes over the years — a relaxed, help-yourself Sunday spread, launched with Dev.",
    intro: [
      "Drawing on our most popular dishes over the years, we were thrilled to launch our very own Sunday Lunch Menu with Dev — a relaxed, help-yourself spread of the food people kept coming back for, set out on the deck with a view.",
    ],
    cover: {
      image: "sunday-lunch-buffet",
      alt: "A guest serving themselves from the Sunday Lunch buffet on a covered deck.",
    },
    gallery: [
      { image: "sunday-lunch-buffet", caption: "The Sunday Lunch spread, self-served", alt: "A guest serving themselves from the Sunday Lunch buffet — pap, garlic rolls and salads." },
    ],
  },
];

export const featuredCaseStudy =
  caseStudies.find((c) => c.featured) ?? caseStudies[0];

export const otherCaseStudies = caseStudies.filter((c) => !c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
