/**
 * latest.ts — the Latest feed, hand-maintained. One entry for every event or
 * post on Biggy's Instagram, added the same day, so a visitor arriving from
 * Instagram finds the website just as current.
 *
 * One list, one rule: the order is decided by `date`, never by hand. Entries
 * can sit in any order below; `latestEntries` is always newest first. The
 * homepage band shows the three newest; /latest shows all of them by month.
 *
 * To add an entry (full checklist: docs/latest-howto.md):
 *   1. Put 1–4 photos in /public/images/latest/<date>-<occasion>/ — JPEG,
 *      longest side 1200 px, 300 KB or less each, no guests' faces without
 *      Biggy's OK.
 *   2. Append an entry below: ISO date (YYYY-MM-DD) plus the same date
 *      written out ("11 October 2026"), real alt text for every photo.
 *   3. Paste the post's link into `instagramUrl` (copy it from the post).
 *      Never guess a link; leave it out until you have the real one.
 *   4. Run `npm run check:latest` (and `npx tsc --noEmit`).
 *
 * Only state what is evidenced. `title`, `line` and `occasion` say what
 * Biggy's own post or a confirmed fact says, nothing more: no guest numbers,
 * no venue or town unless he named it, no "attended", "won" or "sold out"
 * unless he has confirmed it. `occasion` is the type of occasion only
 * ("Wedding", "Tombstone unveiling"), never a private client's name — the
 * family or person can be named on his own Instagram, not here. `dishes` are
 * his names, copied verbatim. No prices, no "per person". Memorial occasions
 * get a respectful line.
 *
 * Freshness: `npm run check:latest` fails when the newest entry is more than
 * STALE_AFTER_DAYS old, so the monthly Keep sweep catches a site that has
 * stopped keeping up. Nothing on the site says "new" or "this week"; the
 * dates carry the recency.
 *
 * No Instagram embeds and no Instagram API: there is no account access, and
 * Meta's embed script costs load time and visitors' privacy. Static cards and
 * outbound links only. If an automated feed is wanted later, this is where it
 * plugs in: a build-time fetch (Instagram Graph API on Biggy's Business
 * account, token held in Vercel env) that maps each post to a LatestEntry and
 * merges it into `entries`, with photos copied to /public first. Every page
 * reads `latestEntries`, so nothing else would change.
 *
 * This file has no imports on purpose: scripts/check-latest.mjs loads it
 * directly with Node.
 */

export type LatestImage = {
  /** Path under /public, e.g. "/images/latest/2026-10-11-…/plate.jpg". */
  src: string;
  /** What is in the frame, for someone who can't see it. */
  alt: string;
};

export type LatestKind = "event" | "post";

export type LatestEntry = {
  slug: string;
  /** ISO date of the event or post (YYYY-MM-DD). */
  date: string;
  /** The same date written out, e.g. "11 October 2026". */
  dateLabel: string;
  kind: LatestKind;
  title: string;
  /** Occasion type only, never a private client's name. */
  occasion: string;
  /** One sentence in Biggy's voice. */
  line: string;
  /** 1–4 local photos; the first is the card photo. */
  images:
    | [LatestImage]
    | [LatestImage, LatestImage]
    | [LatestImage, LatestImage, LatestImage]
    | [LatestImage, LatestImage, LatestImage, LatestImage];
  /** The Instagram post this entry matches. Real link only. */
  instagramUrl?: string;
  /** Route on this site with the full story, when a case study exists. */
  href?: string;
  /** Biggy's dish names, verbatim. */
  dishes?: string[];
  /** How the food was served, in his words, e.g. "a Seven Colours plate". */
  servedAs?: string;
};

const entries: LatestEntry[] = [
  {
    slug: "2026-10-11-tombstone-unveiling",
    date: "2026-10-11",
    dateLabel: "11 October 2026",
    kind: "event",
    title: "Every cut counted",
    occasion: "Tombstone unveiling",
    line: "An entire animal, transformed into a variety of dishes for a family gathered in remembrance.",
    // WhatsApp copies of the photos Biggy posted; camera originals pending
    // (see docs/latest-howto.md). Guests' faces left out on purpose.
    images: [
      {
        src: "/images/latest/2026-10-11-tombstone-unveiling/seven-colours-plate.jpg",
        alt: "A full plate held up in the sun: rice, steamed bread, slow-cooked beef, chicken in a creamy sauce, green beans, roasted vegetables and beetroot.",
      },
      {
        src: "/images/latest/2026-10-11-tombstone-unveiling/sliced-roast-beef.jpg",
        alt: "Roast beef carved into thick slices, pink in the middle with a browned crust.",
      },
      {
        src: "/images/latest/2026-10-11-tombstone-unveiling/slow-cooked-beef-trays.jpg",
        alt: "Two serving trays of Beef Rendang Curry with potatoes, topped with fresh leaves.",
      },
      {
        src: "/images/latest/2026-10-11-tombstone-unveiling/three-sides.jpg",
        alt: "Three sides from above: green beans with crispy onions, roasted beetroot and pumpkin with crumbled feta, and roasted vegetables and corn under a seeded spice crust.",
      },
    ],
    // TODO(TK): paste the link to Biggy's 11 October post (on the post: … →
    // Copy link). Never guess it. Until it is set, no Instagram link shows.
    instagramUrl: undefined,
    dishes: [
      "Beef Roasts",
      "Beef Rendang Curry",
      "Cape Malay Coconut Curry Mogodu",
      "Citrus Spiced Roast Chicken with Salsa Jorgito",
      "Mozambique Inspired Garlic Fried Rice",
      "Roasted Beets and Citrus Pumpkin Salad",
      "Sautéed Green Bean Salad",
      "Spit Roasted Vegetables with Dukkah Spice Finish",
    ],
    servedAs: "a Seven Colours plate",
  },
];

/** Newest first, by date. Entries on the same date keep their order above. */
export const latestEntries: LatestEntry[] = [...entries].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** The `count` newest entries — the homepage band shows three. */
export function newestLatest(count = 3): LatestEntry[] {
  return latestEntries.slice(0, count);
}

/** The newest entry may be at most this many days old (npm run check:latest). */
export const STALE_AFTER_DAYS = 30;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-10-11" → "11 October 2026". The check compares it with dateLabel. */
export function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "2026-10-11" → "October 2026", the month heading on /latest. */
export function monthLabel(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Whole days from `iso` to today in South Africa (UTC+2 all year). */
export function daysSince(iso: string, now = new Date()): number {
  const sa = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const today = Date.UTC(sa.getUTCFullYear(), sa.getUTCMonth(), sa.getUTCDate());
  const [y, m, d] = iso.split("-").map(Number);
  return Math.floor((today - Date.UTC(y, m - 1, d)) / 86_400_000);
}
