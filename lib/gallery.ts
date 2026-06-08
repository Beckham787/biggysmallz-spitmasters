/**
 * gallery.ts — the image library.
 *
 * Images live in /public/images and are referenced by filename, so swapping a
 * placeholder for a high-res original is just dropping in a file with the same
 * name. Every image carries descriptive alt text (no client names in the UI —
 * several photos involve recognisable real people whose permission is pending).
 */

export type GalleryImage = {
  /** filename in /public/images (without extension) */
  slug: string;
  alt: string;
};

export type GallerySection = {
  id: string;
  title: string;
  caption: string;
  images: GalleryImage[];
};

export const gallerySections: GallerySection[] = [
  {
    id: "the-table",
    title: "The Table",
    caption: "Fine dining, plated and considered.",
    images: [
      { slug: "anniversary-salmon", alt: "Sesame-crusted lightly smoked salmon with herb aioli, crunchy dukkah, on charred corn crudo." },
      { slug: "anniversary-beet", alt: "Marinated beet carpaccio, whipped crème fraîche, gremolata dressing with a bright citrus vinaigrette finish." },
      { slug: "private-dining-prawn", alt: "A plated prawn course from a private dining service." },
      { slug: "private-dining-lamb-rack", alt: "A rack of lamb, carved and plated for a private dinner." },
      { slug: "malinga-green-goddess", alt: "A vivid green goddess dish, fresh and herb-forward on the plate." },
      { slug: "malinga-citrus-chicken", alt: "Citrus-glazed chicken, plated with bright accents." },
      { slug: "malinga-green-beans", alt: "A plated side of dressed green beans." },
      { slug: "malinga-korean-boar", alt: "Korean-style boar, glazed and plated." },
      { slug: "mdhluli-lamb", alt: "A plated lamb course, composed with care." },
      { slug: "mdhluli-curry-snapper", alt: "Curried snapper, plated as a refined main course." },
    ],
  },
  {
    id: "the-fire",
    title: "The Fire",
    caption: "Spit and flame — the original craft.",
    images: [
      { slug: "whole-lamb-coals", alt: "A whole lamb roasting slowly over glowing coals." },
      { slug: "whole-lamb-rotisserie", alt: "A whole lamb turning on a rotisserie spit above the fire." },
      { slug: "festival-hanging-meat", alt: "Cuts of meat hanging and cooking over open flame at a barbecue festival." },
      { slug: "rotisserie-row", alt: "A row of meats turning together on rotisserie spits." },
      { slug: "meats-warm-from-spit", alt: "Roasted meats resting warm, fresh off the spit." },
      { slug: "asian-bbq-chicken", alt: "Asian-style barbecue chicken cooked over the grill." },
    ],
  },
  {
    id: "the-gathering",
    title: "The Gathering",
    caption: "Weddings, family and celebration.",
    images: [
      { slug: "tannie-juice-spit", alt: "A spit-roast set up at an outdoor family gathering." },
      { slug: "garden-party-spread", alt: "A generous spread laid out for a garden party." },
      { slug: "buffet-white-function", alt: "A buffet table set for a white-linen function." },
      { slug: "braai-board-family", alt: "1.4kg atchar-spiced prime steak · Ezasekhaya chicken flatty · Klein Karoo wors · garlic & herb jeqe · creamy baby spinach · summer salsa." },
      { slug: "seafood-spread-pool", alt: "Creamy Cape Malay curry & olive mussel pot, garlic butter queen prawns & dhania mango salsa." },
      { slug: "braai-pap", alt: "S'Good S'Nice braai pap." },
    ],
  },
  {
    id: "at-work",
    title: "At Work",
    caption: "Biggy and the craft.",
    images: [
      { slug: "biggy-plating-lamb", alt: "Cooking is an act of love, a gift, a way of sharing with others the little secrets that are simmering on the burners..." },
    ],
  },
];

/** Flat list of every image, in section order — handy for lightbox navigation. */
export const allGalleryImages: (GalleryImage & { sectionId: string })[] =
  gallerySections.flatMap((s) =>
    s.images.map((img) => ({ ...img, sectionId: s.id })),
  );

/** Six images for the home-page gallery teaser. */
export const galleryTeaser: GalleryImage[] = [
  { slug: "anniversary-salmon", alt: "Cured salmon plated over a saffron sauce, held in the chef's hand." },
  { slug: "whole-lamb-coals", alt: "A whole lamb roasting slowly over glowing coals." },
  { slug: "private-dining-lamb-rack", alt: "A rack of lamb carved and plated for a private dinner." },
  { slug: "festival-hanging-meat", alt: "Meat cooking over open flame at a barbecue festival." },
  { slug: "garden-party-spread", alt: "A generous spread laid out for a garden party." },
  { slug: "biggy-plating-lamb", alt: "Chef Biggy plating a lamb dish at the pass." },
];
