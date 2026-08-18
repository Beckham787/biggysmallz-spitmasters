import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import CaseStudyMedia from "@/components/CaseStudyMedia";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "What Biggy Smallz Spitmasters does, and the real events that show it — weddings, milestone birthdays, corporate site braais and private fine dining.",
  openGraph: {
    title: "Our Work · Biggy Smallz Spitmasters",
    description:
      "What we do, and the real events that show it.",
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
              What we do, and the proof of it
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-cream-dim">
              No fixed menu, no prices on a page — the food depends entirely on
              you. Below is the shape of what&rsquo;s possible, then the real
              events that show it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services — name and picture, no fixed menu or pricing */}
      <section className="bg-charcoal pb-20 sm:pb-28">
        <div className="section">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 100}>
                <article className="group lift relative flex h-64 items-end overflow-hidden rounded-sm border border-cream/10 bg-coal transition-colors duration-500 hover:border-ember/50">
                  <Image
                    src={`/images/${service.image}.png`}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <h2 className="relative z-10 p-5 text-xl text-cream text-shadow-soft">
                    {service.title}
                  </h2>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-charcoal pb-24">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-4">Recent events</p>
          </Reveal>
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
