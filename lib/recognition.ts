/**
 * recognition.ts — what the homepage "On the record" section says, and the
 * evidence behind each line. Logos and names come from lib/site-config.ts so
 * there is one list of programmes; this file only adds the label that says
 * what kind of credit each one is.
 *
 * Wording rule: say "appeared on" unless the role is evidenced. Nobody here
 * is described as a winner, finalist, judge or host.
 *
 * Evidence on file (see docs/content-verification-needed.md):
 *   • Ultimate Braai Master — "Team Biggy Smallz — Ultimate Braai Master
 *     Season 7", YouTube (brand/02-research.md §6, verified independently).
 *   • Come Dine With Me (SA), Rate My Plate — confirmed by TK, 2026-09-23.
 *     The role/episode is not recorded, so no more than "appeared on".
 *   • Rise FM — Fun Food Friday, 3 July 2026 — episode link in site-config.
 */

import { siteConfig } from "@/lib/site-config";

export type MediaCredit = {
  name: string;
  /** "TV" or "Radio" — the kind of programme. */
  medium: "TV" | "Radio";
  /** The one thing that can honestly be said about the appearance. */
  credit: string;
  logo?: string;
  href?: string;
  linkLabel?: string;
};

const logoFor = (name: string) =>
  siteConfig.asSeenOn.find((i) => i.name === name)?.logo;

export const mediaCredits: MediaCredit[] = [
  {
    name: "The Ultimate Braai Master",
    medium: "TV",
    credit: "Season 7, as Team Biggy Smallz",
    logo: logoFor("Ultimate Braai Master"),
  },
  {
    name: "Come Dine With Me (SA)",
    medium: "TV",
    credit: "Appeared on the show",
    logo: logoFor("Come Dine With Me (SA)"),
  },
  {
    name: "Rate My Plate",
    medium: "TV",
    credit: "Appeared on the show · Mzansi Magic",
    logo: logoFor("Rate My Plate"),
  },
  {
    name: "Rise FM — Fun Food Friday",
    medium: "Radio",
    credit: `${siteConfig.onAir.detail} · 3 July 2026`,
    // Small source (98x129, from the Instagram post); crisp at this size, would
    // soften if shown larger. Swap in an official file when one turns up.
    logo: "/logos/rise-fm.png",
    href: siteConfig.onAir.href,
    linkLabel: "Listen to the episode",
  },
];

/**
 * South Africa BBQ Festival — founder credit.
 *
 * Two independent outlets (Tourism News Africa, Nova News / Eikestad Nuus)
 * print "Festival founder Biggy Smallz" for the 10 October 2026 festival at
 * Sandringham Farm, Stellenbosch, and the festival's own site names no
 * founder. The brand file says an unverified credential does not go out, and
 * an earlier note in the code says Biggy was not attending this year, so the
 * founder line stays OFF until Biggy confirms it. Flip to true to publish.
 */
export const saBbqFestival = {
  founderConfirmed: false,
  name: "South Africa BBQ Festival",
  logo: "/logos/south-africa-barbecue-festival.png",
  dateLabel: "10 October 2026",
  venue: "Sandringham Farm, Stellenbosch",
  headline: "Founder of the South Africa BBQ Festival",
  sources: [
    {
      label: "Tourism News Africa",
      href: "https://tourismnewsafrica.com/visit-stellenbosch-sa-bbq-festival-2026/",
    },
    {
      label: "Nova News — Eikestad Nuus",
      href: "https://novanews.co.za/eikestadnuus/braai-takes-centre-stage-with-2026-bbq-festival-at-sandringham-farm/",
    },
  ],
};
