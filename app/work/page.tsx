import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real events, told properly — weddings, milestone birthdays, corporate site braais, private fine dining, and a barbecue festival across the border. The work of Biggy Smallz Spitmasters.",
  openGraph: {
    title: "Our Work · Biggy Smallz Spitmasters",
    description:
      "Real events, told properly — from weddings to a barbecue festival across the border.",
    images: ["/images/mozambique-lamb-spit.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-charcoal pb-12 pt-32 sm:pt-40">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-4">Our Work</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream sm:text-6xl">
              Real events, told properly
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-cream-dim">
              Not a wall of photos — the events themselves, each with the story
              of what was cooked and who it was for. Tap any one to see more.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal pb-24">
        <div className="section">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 120}>
                <article className="group">
                  <Link
                    href={`/work/${study.slug}`}
                    className="block"
                    aria-label={`Read the full story: ${study.title}`}
                  >
                    <CaseStudyMedia
                      study={study}
                      aspectClassName="aspect-[4/3]"
                      sizes="(min-width: 640px) 46vw, 100vw"
                      intervalMs={4200 + i * 400}
                    />
                    <div className="mt-5">
                      <p className="font-display uppercase tracking-stamp text-xs text-ember-bright">
                        {study.category}
                      </p>
                      <h2 className="mt-2 text-2xl text-cream transition-colors duration-300 group-hover:text-ember-bright sm:text-3xl">
                        {study.title}
                      </h2>
                      <p className="mt-1 font-display uppercase tracking-stamp text-xs text-smoke">
                        {study.venue
                          ? `${study.venue} · ${study.date}`
                          : study.date}
                      </p>
                      <p className="mt-3 max-w-md leading-relaxed text-cream-dim">
                        {study.teaser}
                      </p>
                      <span className="mt-4 inline-block font-display uppercase tracking-stamp text-sm text-cream/80 underline-offset-4 group-hover:text-ember-bright group-hover:underline">
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

      <CtaBand
        heading="Picture it at your table."
        sub="Tell Biggy the date and the kind of event — he'll take it from there."
      />
    </>
  );
}
