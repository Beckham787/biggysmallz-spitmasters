import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies, displayTitle } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";
import ServiceTiles from "@/components/ServiceTiles";
import YearRail from "@/components/YearRail";
import CtaBand from "@/components/CtaBand";
import type { CaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Our Work",
  alternates: { canonical: "/work" },
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
  const lead = caseStudies.find((c) => c.featured) ?? caseStudies[0];
  const rest = caseStudies.filter((c) => c.slug !== lead.slug);

  return (
    <>
      {/* ── Quiet header — no photo, same eyebrow + headline voice as every
          other page. ─────────────────────────────────────────────────────── */}
      <section className="bg-ink pb-12 pt-36 sm:pt-44">
        <div className="section">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
              Our Work
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
              What We Do, And The Proof Of It
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Mozambique Barbecue Festival — the career milestone, not a case
          study card. Split panel: his own stall on one side, the five-year
          rail and the story on the other. ──────────────────────────────── */}
      <section className="bg-ink pb-16 sm:pb-20">
        <div className="section">
          <Reveal>
            <Link
              href="/mozambique"
              aria-label="Read the Mozambique Barbecue Festival story"
              className="group grid overflow-hidden rounded-sm border border-cream/15 sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[26rem]">
                <Image
                  src="/images/mozambique/mozambique-stall.png"
                  alt="Biggy's own branded stall at the Mozambique Barbecue Festival, his name across the banner."
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-[center_26%] transition duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center bg-charcoal p-8 sm:p-10">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
                  International fire cooking
                </p>
                <h2 className="mt-3 text-balance font-display text-3xl uppercase leading-[1.05] tracking-[0.02em] text-cream sm:text-4xl">
                  Five Years on Mozambique&rsquo;s Coals
                </h2>
                <YearRail className="mt-5" />
                <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-cream/85">
                  The Mozambique Barbecue Festival, Maputo: Biggy&rsquo;s own
                  corner of it, every October since 2022, and back as
                  Churrasqueiro in 2026. This one gets its own story.
                </p>
                <span className="mt-6 inline-block font-display text-sm uppercase tracking-[0.14em] text-paper underline-offset-4 group-hover:underline">
                  Read the story &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── The range — the six services, each with its own photograph ──── */}
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="section">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
              The range
            </p>
          </Reveal>
          <div className="mt-8">
            <ServiceTiles />
          </div>
        </div>
      </section>

      {/* ── Recent events: the featured one large, the rest in a row ───── */}
      <section className="bg-ink py-16 sm:py-24">
        <div className="section">
          <Reveal>
            <h2 className="font-display text-xs uppercase tracking-[0.3em] text-paper">
              Recent events
            </h2>
          </Reveal>

          <Reveal className="mt-10">
            <StudyCard study={lead} lead />
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 3) * 120}>
                <StudyCard study={study} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Book a Service"
        heading="Tell Biggy what you're planning"
        sub="The date, the kind of event, and how to reach you. He'll shape the food from there."
      />
    </>
  );
}

/** One event: event type, photograph, name, where/when, one line, one link. */
function StudyCard({
  study,
  lead = false,
  index = 0,
}: {
  study: CaseStudy;
  lead?: boolean;
  index?: number;
}) {
  const where = study.venue ? `${study.venue} · ${study.date}` : study.date;
  return (
    <article className="group">
      <Link
        href={`/work/${study.slug}`}
        className={lead ? "grid items-center gap-6 lg:grid-cols-12 lg:gap-10" : "block"}
        aria-label={`Read the full story: ${displayTitle(study)}`}
      >
        <div className={lead ? "lg:col-span-7" : ""}>
          <CaseStudyMedia
            study={study}
            aspectClassName="aspect-[4/3]"
            sizes={
              lead
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
            }
            intervalMs={4200 + index * 400}
          />
        </div>
        <div className={lead ? "lg:col-span-5" : "mt-5"}>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
            {study.category}
          </p>
          {lead ? (
            <h3 className="mt-2 text-3xl text-cream sm:text-4xl">
              {displayTitle(study)}
            </h3>
          ) : (
            <h3 className="mt-2 text-2xl text-cream transition-colors duration-300 group-hover:text-paper sm:text-3xl">
              {displayTitle(study)}
            </h3>
          )}
          <p className="mt-1 font-display text-xs uppercase tracking-[0.14em] text-cream/70">
            {where}
          </p>
          <p className="mt-3 max-w-md font-body text-lg italic leading-relaxed text-cream/85">
            {study.teaser}
          </p>
          <span className="mt-4 inline-block font-display text-sm uppercase tracking-[0.14em] text-paper underline-offset-4 group-hover:underline">
            See the event &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
