import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { featuredCaseStudy } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import HeroPhoto from "@/components/HeroPhoto";

// Upcoming big events — hand-maintained for now. Move to its own data file
// once a full events page exists. SA Barbecue Festival left out on purpose:
// Biggy isn't attending this year.
const upcomingEvents = [
  {
    name: "Mozambique Barbecue Festival",
    date: "3 October",
    venue: "Maputo, Mozambique",
    poster: "/images/mozambique/mozambique-2026-poster.jpg",
    posterAlt: "Mozambique Barbecue Festival 2026 poster confirming Biggy Smallz as a featured chef.",
  },
  {
    name: "Bush Escape — Springboks vs All Blacks",
    date: "29 August",
    venue: "Malelane",
    poster: "/images/events/bush-escape-2026-poster.jpg",
    posterAlt: "Bush Escape poster — Springboks vs All Blacks live screening, Malelane, 29 August.",
  },
];

// Recently featured — venue and event type only, no client names, per
// Biggy's request.
const featuredLabel = [featuredCaseStudy.category, featuredCaseStudy.venue]
  .filter(Boolean)
  .join(" · ");

export default function HomePage() {
  return (
    <>
      {/* ── Entrance — the walk-in. Dimmed photo, one warm pool of light,
          eyes still adjusting. Quiet centered copy, no CTA link or scroll
          cue — just the moment. ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-center">
        <HeroPhoto />

        <div className="section relative z-10 max-w-xl">
          <Reveal>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.38em] text-gold">
              Est. {siteConfig.established} · Mpumalanga Lowveld
            </p>
            <h1 className="mt-6 font-display text-4xl uppercase tracking-[0.04em] text-cream sm:text-5xl lg:text-6xl">
              Get in my belly
            </h1>
            <div className="mx-auto mt-7 h-px w-11 bg-gold" />
            <p className="mx-auto mt-7 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              Personal chef catering, brought to wherever your table is —
              from whole-fire spitbraai to a quiet seven-course evening.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Upcoming — the big events on the calendar. Poster where one
          exists, a plain typographic card where it doesn't. ────────────── */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="section max-w-4xl">
          <Reveal>
            <div className="text-center">
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                On the calendar
              </p>
              <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-cream sm:text-3xl">
                Upcoming
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.name} delay={i * 120}>
                <div className="border border-gold/20">
                  {event.poster ? (
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={event.poster}
                        alt={event.posterAlt}
                        fill
                        sizes="(min-width: 640px) 22rem, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center bg-coal px-6 text-center">
                      <p className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                        {event.date}
                      </p>
                      <p className="mt-4 font-display text-xl uppercase leading-snug tracking-[0.02em] text-cream">
                        {event.name}
                      </p>
                      <p className="mt-4 font-body italic text-cream-dim">
                        {event.venue}
                      </p>
                    </div>
                  )}
                  <div className="border-t border-gold/20 px-5 py-4">
                    <p className="font-display text-base uppercase tracking-[0.03em] text-cream">
                      {event.name}
                    </p>
                    <p className="mt-1 font-body italic text-cream-dim">
                      {event.date} · {event.venue}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent event spotlight — venue and event type only, no client
          names, per Biggy's request. ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-charcoal py-20 sm:py-28">
        <div className="section relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                  Recently
                </p>
                <h2 className="mt-3 text-3xl text-cream sm:text-4xl">
                  {featuredLabel}
                </h2>
                <p className="mt-2 font-display uppercase tracking-[0.14em] text-xs text-smoke">
                  {featuredCaseStudy.date}
                </p>
                <p className="mt-5 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
                  {featuredCaseStudy.teaser}
                </p>
              </Reveal>

              {featuredCaseStudy.quote && (
                <Reveal delay={150}>
                  <blockquote className="mt-6 max-w-md border-l-2 border-ember pl-5 font-body text-lg italic leading-relaxed text-cream/90">
                    &ldquo;{featuredCaseStudy.quote}&rdquo;
                  </blockquote>
                </Reveal>
              )}

              <Reveal delay={250}>
                <div className="mt-8">
                  <Link
                    href={`/work/${featuredCaseStudy.slug}`}
                    className="btn-ember text-base"
                  >
                    See the full event
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-7" as="div">
              <Link
                href={`/work/${featuredCaseStudy.slug}`}
                className="block"
                aria-label={`Read the full story: ${featuredLabel}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal sm:aspect-[4/3]">
                  <Image
                    src="/images/wedding-rob-leah/wedding-rob-leah-plating.png"
                    alt="Biggy and Chef Sikolethu plating together at the table."
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── As seen on / Catch me on ─────────────────────────────────────── */}
      <section className="border-y border-cream/10 bg-ink py-12">
        <div className="section grid gap-10 sm:grid-cols-2 sm:gap-6">
          <Reveal>
            <CreditGroup label="As seen on" items={siteConfig.asSeenOn} />
          </Reveal>
          <Reveal delay={100}>
            <CreditGroup label="Catch me on" items={siteConfig.catchMeOn} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CreditGroup({
  label,
  items,
}: {
  label: string;
  items: { name: string; logo?: string; logoClass?: string; href?: string }[];
}) {
  return (
    <div>
      <p className="mb-6 text-center font-display uppercase tracking-[0.14em] text-xs text-smoke">
        {label}
      </p>
      <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 text-center">
        {items.map((item) => {
          const content = (
            <>
              {item.logo && (
                <span
                  className={`relative block w-full opacity-80 transition-opacity duration-300 hover:opacity-100 ${
                    item.logoClass ?? "h-12"
                  }`}
                >
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    fill
                    sizes="(min-width: 640px) 10rem, 8rem"
                    className="object-contain"
                  />
                </span>
              )}
              <span className="font-display uppercase tracking-[0.14em] text-xs text-cream-dim transition-colors group-hover:text-gold">
                {item.name}
              </span>
            </>
          );

          return (
            <li
              key={item.name}
              className="flex w-32 flex-col items-center gap-3 sm:w-36"
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3"
                >
                  {content}
                </a>
              ) : (
                <div className="flex flex-col items-center gap-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
