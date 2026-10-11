import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, displayTitle } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";
import CtaBand from "@/components/CtaBand";

type Params = { params: { slug: string } };

/** "Starter — sesame-crusted salmon…" -> course label + the rest, so a menu
 * caption can be scanned by course. Captions with no dash stay whole. */
function splitCaption(caption: string): { label?: string; text: string } {
  const at = caption.indexOf(" — ");
  if (at < 1 || at > 24) return { text: caption };
  return { label: caption.slice(0, at), text: caption.slice(at + 3) };
}

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
    title: displayTitle(study),
    alternates: { canonical: `/work/${params.slug}` },
    description: `${study.teaser} — ${where}. A Biggy Smallz Spitmasters case study.`,
    openGraph: {
      title: `${displayTitle(study)} · Biggy Smallz Spitmasters`,
      description: study.teaser,
      images: ogImage ? [`/images/${ogImage}`] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  // Biggy's pull line is editorial copy, not a client testimonial. Where the
  // write-up already says the same sentence, repeating it adds nothing.
  const showPullLine =
    !!study.quote && !study.intro.some((para) => para.includes(study.quote!));

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal pb-10 pt-32 sm:pt-40">
        <div className="section">
          <Reveal>
            <Link
              href="/work"
              className="mb-3 inline-flex min-h-[44px] items-center font-display uppercase tracking-stamp text-xs text-cream/80 underline-offset-4 hover:text-paper hover:underline"
            >
              ← All our work
            </Link>
            <p className="eyebrow mb-3">{study.category}</p>
            <h1 className="text-balance text-4xl font-bold leading-[0.98] text-cream sm:text-5xl md:text-6xl">
              {displayTitle(study)}
            </h1>
            <p className="mt-3 font-display uppercase tracking-stamp text-sm text-smoke">
              {study.venue ? `${study.venue} · ${study.date}` : study.date}
            </p>
            {study.instagramUrl && (
              <a
                href={study.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-[44px] items-center font-display uppercase tracking-stamp text-sm text-paper underline-offset-4 hover:underline"
              >
                View on Instagram →
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Lead visual — cover or slideshow */}
      <section className="bg-charcoal pb-4">
        <div className="section">
          <Reveal>
            <CaseStudyMedia
              study={study}
              aspectClassName="aspect-[4/5] sm:aspect-[3/2]"
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

            {showPullLine && (
              <Reveal delay={150}>
                <p className="mt-8 border-l border-cream/30 pl-6 text-xl italic leading-relaxed text-cream">
                  {study.quote}
                </p>
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
                      src={`/images/${item.image}`}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 leading-snug">
                    {(() => {
                      const { label, text } = splitCaption(item.caption);
                      return (
                        <>
                          {label && (
                            <span className="block font-display text-xs uppercase tracking-[0.2em] text-paper">
                              {label}
                            </span>
                          )}
                          <span className="mt-1 block font-body text-base text-cream/85">
                            {text}
                          </span>
                        </>
                      );
                    })()}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Planning something like this?"
        heading="Tell Biggy what you're planning"
        sub="The date, the kind of event, and how to reach you. He'll shape the food from there."
      />
    </>
  );
}
