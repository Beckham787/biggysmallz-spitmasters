/**
 * appearances.ts — public appearances (festivals, shows), hand-maintained.
 *
 * One list, one rule: an appearance is "upcoming" until the end of its date
 * and "previous" afterwards. Nothing here is decided by hand-flipping a
 * flag, so a date that passes can never keep advertising itself as upcoming.
 * `appearanceStatus()` is the only thing the pages call.
 *
 * Three kinds of content on the site, kept apart on purpose:
 *   • Upcoming appearances — future dates in this file (homepage shows them).
 *   • Previous appearances — past dates in this file (homepage + /mozambique).
 *   • Archive stories      — the case studies in lib/case-studies.ts.
 *
 * To add an appearance: append an entry, ISO date (YYYY-MM-DD). To retire
 * one: do nothing — it moves to "previous" by itself.
 *
 * Only state what is evidenced. `note` is the exact thing that can be said
 * about the day; do not write "attended", "cooked" or "won" here unless
 * Biggy has confirmed it.
 */

export type Appearance = {
  slug: string;
  name: string;
  /** ISO date of the event (last day, for multi-day events). */
  date: string;
  /** Human date, e.g. "3 October 2026". */
  dateLabel: string;
  venue: string;
  /** Route on this site with the full story, when there is one. */
  href?: string;
  poster?: string;
  posterAlt?: string;
  /** What can honestly be said about Biggy's part, in the tense of "now". */
  note: string;
};

export const appearances: Appearance[] = [
  {
    slug: "mozambique-barbecue-festival-2026",
    name: "Mozambique Barbecue Festival",
    date: "2026-10-03",
    dateLabel: "3 October 2026",
    venue: "Campus da UEM, Maputo",
    href: "/mozambique",
    poster: "/images/mozambique/mozambique-2026-poster.jpg",
    posterAlt:
      "The 2026 Mozambique Barbecue Festival poster, announcing Biggy Smallz as Churrasqueiro.",
    note: "Announced as Churrasqueiro for the 2026 edition.",
  },
];

export type AppearanceStatus = "upcoming" | "previous";

/** South Africa is UTC+2 all year, so "end of the event day" is 22:00 UTC. */
export function appearanceStatus(a: Appearance, now = new Date()): AppearanceStatus {
  const endOfDay = new Date(`${a.date}T22:00:00Z`);
  return now.getTime() <= endOfDay.getTime() ? "upcoming" : "previous";
}

export function upcomingAppearances(now = new Date()): Appearance[] {
  return appearances
    .filter((a) => appearanceStatus(a, now) === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function previousAppearances(now = new Date()): Appearance[] {
  return appearances
    .filter((a) => appearanceStatus(a, now) === "previous")
    .sort((a, b) => b.date.localeCompare(a.date));
}
