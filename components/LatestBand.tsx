import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { newestLatest, type LatestEntry } from "@/lib/latest";

/**
 * LatestBand — the homepage's "Latest": the three newest entries from
 * lib/latest.ts, so a visitor coming over from Instagram sees the site keeps
 * up with it. Placed after the range and before the featured event story:
 * the range says what Biggy cooks, this shows that he is cooking it now, and
 * the story below goes deep on one event.
 *
 * Real dates only. Nothing here says "new" or "this week": if no entry is
 * added for a while, the band must still be true (npm run check:latest is
 * what catches that). Static cards and an outbound link; no Instagram embed.
 *
 * One entry lays out as a wide feature; two or three as a row of cards.
 */
export default function LatestBand() {
  const entries = newestLatest(3);
  if (entries.length === 0) return null;
  const single = entries.length === 1;

  return (
    <section
      aria-labelledby="latest-heading"
      className="border-y border-cream/10 bg-ink py-16 sm:py-24"
    >
      <div className="section">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
            Latest
          </p>
          <h2
            id="latest-heading"
            className="mt-3 max-w-xl text-balance font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl"
          >
            Where the fire&rsquo;s been
          </h2>
        </Reveal>

        <ul
          className={
            single
              ? "mt-10"
              : "mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {entries.map((entry, i) => (
            <li key={entry.slug}>
              <Reveal delay={i * 120}>
                <LatestCard entry={entry} wide={single} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link
            href="/latest"
            className="mt-10 inline-flex min-h-[44px] items-center font-display text-sm uppercase tracking-[0.14em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
          >
            See everything
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** One entry: photo, date and occasion, title, one line, Instagram link. */
function LatestCard({ entry, wide }: { entry: LatestEntry; wide: boolean }) {
  const cover = entry.images[0];
  // The card opens the case study when there is one, otherwise the entry's
  // place on /latest (all its photos and the dishes).
  const href = entry.href ?? `/latest#${entry.slug}`;

  // The whole card is clickable through the title link's ::after (one tab
  // stop, and the photo keeps its own alt text); the Instagram link sits
  // above that layer.
  return (
    <article
      className={`group relative ${wide ? "grid items-center gap-6 lg:grid-cols-12 lg:gap-12" : ""}`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-coal ${wide ? "lg:col-span-7" : ""}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={
            wide
              ? "(min-width: 1024px) 58vw, 100vw"
              : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
          }
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className={wide ? "lg:col-span-5" : "mt-5"}>
        <p className="font-display text-xs uppercase tracking-[0.14em] text-cream/70">
          <time dateTime={entry.date}>{entry.dateLabel}</time>
          <span aria-hidden="true"> &middot; </span>
          <span className="sr-only">, </span>
          {entry.occasion}
        </p>
        <h3 className="mt-2 text-2xl text-cream sm:text-3xl">
          <Link
            href={href}
            className="underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-paper group-hover:underline"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md font-body text-lg italic leading-relaxed text-cream/85">
          {entry.line}
        </p>
        {entry.instagramUrl && (
          <a
            href={entry.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-2 inline-flex min-h-[44px] items-center font-display text-xs uppercase tracking-[0.16em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
          >
            On Instagram
            <span className="sr-only">: {entry.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
