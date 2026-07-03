import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "From fine dining and the traveling chef to whole-animal spit-roasting — the shape of what's possible. No fixed menu, no prices. The detail comes when you talk.",
  openGraph: {
    title: "What we do · Biggy Smallz Spitmasters",
    description:
      "The shape of what's possible — fine dining to whole-animal spit-roasting.",
    images: ["/images/whole-lamb-rotisserie.png"],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative grain flex min-h-[55svh] items-end overflow-hidden">
        <Image
          src="/images/wedding-rob-leah-plating.png"
          alt="Biggy and Chef Sikolethu plating together at a wedding, at the pass."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div className="photo-veil absolute inset-0" />
        <div className="section relative z-10 pb-14 pt-32">
          <Reveal>
            <p className="eyebrow mb-4">Services</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream text-shadow-soft sm:text-6xl md:text-7xl">
              What we do
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="glow-top bg-charcoal pt-20 sm:pt-28">
        <div className="section">
          <Reveal>
            <p className="mx-auto max-w-prose text-balance text-center text-xl font-light leading-relaxed text-cream sm:text-2xl">
              No fixed menu, and no prices on a page — because the food depends
              entirely on you. What follows is the shape of what&rsquo;s
              possible. The detail comes when you talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-charcoal py-16 sm:py-20">
        <div className="section">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 100}>
                <article className="group lift relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-sm border border-cream/10 bg-coal transition-colors duration-500 hover:border-ember/50">
                  <Image
                    src={`/images/${service.image}.png`}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  {/* Warm gradient keeps the text legible and the food glowing. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                  <div className="relative z-10 p-7">
                    <span className="font-display text-sm tabular-nums text-ember-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 text-2xl text-cream text-shadow-soft">
                      {service.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-cream/85 text-shadow-soft">
                      {service.blurb}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <CtaBand
        heading="The rest is a conversation."
        sub="No fixed menu, no prices on a page. Tell Biggy what you're planning and he'll shape the food around it."
      />
    </>
  );
}
