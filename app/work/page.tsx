import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { caseStudies, displayTitle } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "What Biggy Smallz Spitmasters does, and the real events that show it — personal chef dinners, weddings, milestone birthdays, corporate site braais and private fine dining.",
  openGraph: {
    title: "Our Work · Biggy Smallz Spitmasters",
    description:
      "What we do, and the real events that show it.",
    images: ["/images/mozambique/mozambique-lamb-spit.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      {/* ── Quiet header — no photo, same Cinzel eyebrow + headline voice as
          every other page. The "no fixed menu / no prices" line moved to the
          Book a Service page per TK — this header is just the title now. ── */}
      <section className="bg-ink pb-16 pt-36 sm:pt-44">
        <div className="section max-w-2xl">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              Our Work
            </p>
            <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
              What We Do, And The Proof Of It
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Mozambique Barbecue Festival — a standout teaser, not a
          case-study card. Redesigned 2026-08-23 into a split panel (photo
          one side, the festival's own badge + copy the other) rather than
          the dimmed full-bleed-photo pattern used for page heroes — this
          keeps it visually distinct from both the entrance heroes and the
          plain case-study cards below. The festival logo is a loud solid
          yellow badge in its raw form, so it's shown through a gold/cream
          tint (same treatment as the /mozambique hero) rather than raw. ── */}
      <section className="bg-ink pb-16 sm:pb-20">
        <div className="section">
          <Reveal>
            <Link
              href="/mozambique"
              aria-label="Read the Mozambique Barbecue Festival story"
              className="group grid overflow-hidden rounded-sm border border-gold/20 sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto">
                <Image
                  src="/images/mozambique/mozambique-stall.png"
                  alt="Biggy's own branded stall at the Mozambique Barbecue Festival, Coca-Cola tents overhead."
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center bg-charcoal p-8 sm:p-10">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-gold/50 bg-ink/40 p-1">
                  <Image
                    src="/logos/mozambique-barbecue-festival.png"
                    alt="Mozambique Barbecue Festival official badge."
                    width={112}
                    height={112}
                    className="h-full w-full rounded-full object-cover"
                    style={{
                      filter:
                        "grayscale(1) sepia(0.55) saturate(2.2) hue-rotate(-8deg) brightness(0.88) contrast(0.95)",
                    }}
                  />
                </div>
                <p className="mt-6 font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
                  International Stage · Fifth Year Running
                </p>
                <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-cream sm:text-3xl">
                  Mozambique Barbecue Festival
                </h2>
                <p className="mt-4 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
                  Confirmed on the 2026 lineup as Churrasqueiro — one of the
                  festival&rsquo;s headline pitmasters, cooking fire-to-plate
                  for a crowd from across the region. This one gets its own
                  story.
                </p>
                <span className="mt-5 inline-block font-display text-sm uppercase tracking-[0.14em] text-gold underline-offset-4 group-hover:underline">
                  Read the story →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Services — a plain stacked list, nothing extra, per TK ──────── */}
      <section className="bg-ink pb-20 sm:pb-28">
        <div className="section">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              The range
            </p>
            <div className="mt-6 max-w-md divide-y divide-gold/15">
              {siteConfig.services.map((service) => (
                <p
                  key={service.title}
                  className="py-4 font-display text-base uppercase tracking-[0.05em] text-cream first:pt-0"
                >
                  {service.title}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Case studies ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <p className="text-center font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              Recent events
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 120}>
                <article className="group">
                  <Link
                    href={`/work/${study.slug}`}
                    className="block"
                    aria-label={`Read the full story: ${displayTitle(study)}`}
                  >
                    <CaseStudyMedia
                      study={study}
                      aspectClassName="aspect-[4/3]"
                      sizes="(min-width: 640px) 46vw, 100vw"
                      intervalMs={4200 + i * 400}
                    />
                    <div className="mt-5">
                      <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                        {study.category}
                      </p>
                      <h2 className="mt-2 text-2xl text-cream transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                        {displayTitle(study)}
                      </h2>
                      <p className="mt-1 font-display text-xs uppercase tracking-[0.14em] text-smoke">
                        {study.venue
                          ? `${study.venue} · ${study.date}`
                          : study.date}
                      </p>
                      <p className="mt-3 max-w-md font-body italic leading-relaxed text-cream-dim">
                        {study.teaser}
                      </p>
                      <span className="mt-4 inline-block font-display text-sm uppercase tracking-[0.14em] text-cream/80 underline-offset-4 group-hover:text-gold group-hover:underline">
                        See the event →
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
