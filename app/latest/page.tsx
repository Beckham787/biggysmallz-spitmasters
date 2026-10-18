import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { siteConfig } from "@/lib/site-config";
import { latestEntries, monthLabel, type LatestEntry, type LatestImage } from "@/lib/latest";
import { previousAppearances, type Appearance } from "@/lib/appearances";

/**
 * /latest — everything from lib/latest.ts, newest first, grouped by month,
 * plus past festival appearances read from lib/appearances.ts (rendered from
 * that file, never copied into this one). Static cards and outbound links
 * only; no Instagram embeds.
 *
 * Past appearances depend on today's date, so the page is rebuilt at most
 * hourly instead of freezing "today" at build time. No Event schema: these
 * are private occasions that have already happened.
 */
export const revalidate = 3600;

const title = "Latest events and posts";
const description =
  "Dated events and posts from Biggy’s Instagram, with the dishes by name. From spitbraai to 7 courses, brought to wherever your table is.";
const shareDescription = "Dated events and posts from Biggy’s Instagram, with the dishes by name.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/latest" },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description: shareDescription,
    url: "/latest",
    images: [
      {
        url: "/images/latest/og-latest.jpg",
        width: 1200,
        height: 630,
        alt: "Sliced roast beef, a full plate and three sides, from Biggy Smallz Spitmasters events.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${siteConfig.name}`,
    description: shareDescription,
    images: ["/images/latest/og-latest.jpg"],
  },
};

type Item =
  | { type: "entry"; date: string; entry: LatestEntry }
  | { type: "appearance"; date: string; appearance: Appearance };

/** Newest first; on the same date an entry comes before an appearance. */
function feed(): { month: string; items: Item[] }[] {
  const items: Item[] = [
    ...latestEntries.map((entry) => ({ type: "entry" as const, date: entry.date, entry })),
    ...previousAppearances().map((appearance) => ({
      type: "appearance" as const,
      date: appearance.date,
      appearance,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const months: { month: string; items: Item[] }[] = [];
  for (const item of items) {
    const month = monthLabel(item.date);
    const last = months[months.length - 1];
    if (last && last.month === month) last.items.push(item);
    else months.push({ month, items: [item] });
  }
  return months;
}

export default function LatestPage() {
  const months = feed();
  const firstSlug = latestEntries[0]?.slug;

  return (
    <>
      <section className="bg-ink pb-12 pt-36 sm:pt-44">
        <div className="section">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
              Latest
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
              Where the fire&rsquo;s been
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg italic leading-relaxed text-cream/85">
              Each entry here matches a post on{" "}
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
              >
                Biggy&rsquo;s Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              , dated to the day. Where he named the dishes, the names are his.
            </p>
          </Reveal>
        </div>
      </section>

      {months.length === 0 ? (
        <section className="border-t border-cream/10 bg-ink py-12">
          <div className="section font-body text-lg text-cream/85">
            Nothing posted here yet. The newest food is on Instagram.
          </div>
        </section>
      ) : (
        months.map(({ month, items }) => {
          const id = `month-${month.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section
              key={month}
              aria-labelledby={id}
              className="border-t border-cream/10 bg-ink py-12 sm:py-16"
            >
              <div className="section">
                <h2
                  id={id}
                  className="font-display text-xs uppercase tracking-[0.3em] text-paper"
                >
                  {month}
                </h2>
                <div className="mt-8 space-y-14 sm:space-y-20">
                  {items.map((item) =>
                    item.type === "entry" ? (
                      <EntryArticle
                        key={item.entry.slug}
                        entry={item.entry}
                        priority={item.entry.slug === firstSlug}
                      />
                    ) : (
                      <AppearanceArticle key={item.appearance.slug} appearance={item.appearance} />
                    ),
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}

      <CtaBand
        eyebrow="Book a Service"
        heading="Tell Biggy what you're planning"
        sub="The date, the kind of event, and how to reach you. He'll shape the food from there."
      />
    </>
  );
}

function EntryArticle({ entry, priority }: { entry: LatestEntry; priority: boolean }) {
  return (
    <article
      id={entry.slug}
      className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <Reveal className="lg:col-span-7">
        <Photos images={entry.images} priority={priority} />
      </Reveal>

      <Reveal className="lg:col-span-5" delay={120}>
        <p className="font-display text-xs uppercase tracking-[0.14em] text-cream/70">
          <time dateTime={entry.date}>{entry.dateLabel}</time>
          <span aria-hidden="true"> &middot; </span>
          <span className="sr-only">, </span>
          {entry.occasion}
        </p>
        <h3 className="mt-2 text-3xl text-cream sm:text-4xl">{entry.title}</h3>
        <p className="mt-4 max-w-md font-body text-lg italic leading-relaxed text-cream/85">
          {entry.line}
        </p>

        {entry.dishes && entry.dishes.length > 0 && (
          <div className="mt-8">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-paper">
              On the table
            </p>
            <ul className="mt-3 divide-y divide-cream/10 border-y border-cream/10 font-body text-base leading-snug text-cream/90">
              {entry.dishes.map((dish) => (
                <li key={dish} className="py-2.5">
                  {dish}
                </li>
              ))}
            </ul>
            {entry.servedAs && (
              <p className="mt-3 font-body text-base italic text-cream/75">
                Served as {entry.servedAs}.
              </p>
            )}
          </div>
        )}

        {(entry.instagramUrl || entry.href) && (
          <div className="mt-6 flex flex-wrap gap-x-6">
            {entry.href && (
              <Link
                href={entry.href}
                className="inline-flex min-h-[44px] items-center font-display text-xs uppercase tracking-[0.16em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
              >
                The full story
              </Link>
            )}
            {entry.instagramUrl && (
              <a
                href={entry.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-display text-xs uppercase tracking-[0.16em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
              >
                On Instagram
                <span className="sr-only">: {entry.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </Reveal>
    </article>
  );
}

/** 1 photo: one wide frame. 2 or 4: a grid of squares. 3: one wide, two below. */
function Photos({ images, priority }: { images: LatestImage[]; priority: boolean }) {
  const wideFirst = images.length === 1 || images.length === 3;
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-3">
      {images.map((img, i) => {
        const wide = wideFirst && i === 0;
        return (
          <li
            key={img.src}
            className={`relative overflow-hidden rounded-sm bg-coal ${
              wide ? "col-span-2 aspect-[4/3]" : "aspect-square"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={priority && i === 0}
              sizes={
                wide
                  ? "(min-width: 1024px) 58vw, 100vw"
                  : "(min-width: 1024px) 29vw, 50vw"
              }
              className="object-cover"
            />
          </li>
        );
      })}
    </ul>
  );
}

function AppearanceArticle({ appearance: a }: { appearance: Appearance }) {
  return (
    <article
      id={a.slug}
      className="grid scroll-mt-28 gap-6 rounded-sm border border-cream/15 p-6 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-8 sm:p-8"
    >
      {a.poster && (
        <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-sm bg-coal sm:w-32">
          <Image
            src={a.poster}
            alt={a.posterAlt ?? ""}
            fill
            sizes="8rem"
            className="object-cover"
          />
        </div>
      )}
      <div className={a.poster ? "" : "sm:col-span-2"}>
        <p className="font-display text-xs uppercase tracking-[0.14em] text-cream/70">
          <time dateTime={a.date}>{a.dateLabel}</time>
          <span aria-hidden="true"> &middot; </span>
          <span className="sr-only">, </span>
          Festival line-up
        </p>
        <h3 className="mt-2 text-2xl text-cream sm:text-3xl">{a.name}</h3>
        <p className="mt-1 font-display text-xs uppercase tracking-[0.14em] text-cream/70">
          {a.venue}
        </p>
        <p className="mt-3 max-w-md font-body text-lg italic leading-relaxed text-cream/85">
          {a.note}
        </p>
        {a.href && (
          <Link
            href={a.href}
            className="mt-2 inline-flex min-h-[44px] items-center font-display text-xs uppercase tracking-[0.16em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
          >
            Read the story
          </Link>
        )}
      </div>
    </article>
  );
}
