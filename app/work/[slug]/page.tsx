import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";
import CtaBand from "@/components/CtaBand";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Our Work" };
  const where = study.venue ? `${study.venue}, ${study.date}` : study.date;
  const ogImage =
    study.cover?.image ??
    study.slideshowImages?.[0].image ??
    study.gallery[0]?.image;
  return {
    title: study.title,
    description: `${study.teaser} — ${where}. A Biggy Smallz Spitmasters case study.`,
    openGraph: {
      title: `${study.title} · Biggy Smallz Spitmasters`,
      description: study.teaser,
      images: ogImage ? [`/images/${ogImage}.png`] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal pb-10 pt-32 sm:pt-40">
        <div className="section">
          <Reveal>
            <Link
              href="/work"
              className="mb-6 inline-block font-display uppercase tracking-stamp text-xs text-smoke underline-offset-4 hover:text-ember-bright hover:underline"
            >
              ← All our work
            </Link>
            <p className="eyebrow mb-3">{study.category}</p>
            <h1 className="text-balance text-4xl font-bold leading-[0.98] text-cream sm:text-5xl md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-3 font-display uppercase tracking-stamp text-sm text-smoke">
              {study.venue ? `${study.venue} · ${study.date}` : study.date}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lead visual — cover or slideshow */}
      <section className="bg-charcoal pb-4">
        <div className="section">
          <Reveal>
            <CaseStudyMedia
              study={study}
              aspectClassName="aspect-[4/5] sm:aspect-[16/9]"
              sizes="(min-width: 1024px) 72rem, 100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <section className="glow-top bg-charcoal pt-16 sm:pt-24">
        <div className="section">
          <div className="max-w-prose">
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-cream/90">
                {study.intro.map((para, i) =>
                  i === 0 ? (
                    <p
                      key={i}
                      className="text-2xl font-light leading-snug text-cream"
                    >
                      {para}
                    </p>
                  ) : (
                    <p key={i}>{para}</p>
                  ),
                )}
              </div>
            </Reveal>

            {study.quote && (
              <Reveal delay={150}>
                <blockquote className="mt-8 border-l-2 border-ember pl-6 text-xl italic leading-relaxed text-cream">
                  &ldquo;{study.quote}&rdquo;
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Full captioned gallery — every photo from the event, captions = the menu */}
      <section className="bg-charcoal py-14 sm:py-20">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-8">
              {study.gallery.length > 1 ? "On the table" : "From the day"}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3">
            {study.gallery.map((item, i) => (
              <Reveal key={item.image} delay={(i % 3) * 100}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal">
                    <Image
                      src={`/images/${item.image}.png`}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-snug text-cream-dim">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Planning something like this?"
        sub="Tell Biggy the date and the kind of event — he'll shape the food around it."
      />
    </>
  );
}
