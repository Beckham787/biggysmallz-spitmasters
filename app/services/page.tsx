import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "What Biggy does",
  description:
    "From fine dining and the traveling chef to whole-animal spit-roasting — the shape of what's possible. No fixed menu, no prices. The detail comes when you talk.",
  openGraph: {
    title: "What Biggy does · Biggy Smallz Spitmasters",
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
          src="/images/biggy-plating-lamb.png"
          alt="Chef Biggy plating a lamb dish at the pass, in low light."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_8%]"
        />
        <div className="photo-veil absolute inset-0" />
        <div className="section relative z-10 pb-14 pt-32">
          <Reveal>
            <p className="eyebrow mb-4">Services</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream text-shadow-soft sm:text-6xl md:text-7xl">
              What Biggy does
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-charcoal pt-20 sm:pt-28">
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
                <article className="group h-full rounded-sm border border-cream/10 bg-ink p-7 transition-colors duration-500 hover:border-ember/50">
                  <span className="font-display text-sm text-ember-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-2xl text-cream">{service.title}</h2>
                  <p className="mt-3 leading-relaxed text-cream-dim">
                    {service.blurb}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-cream/10 bg-ink py-20 sm:py-24">
        <div className="section text-center">
          <Reveal>
            <h2 className="text-3xl text-cream sm:text-4xl">
              The rest is a conversation.
            </h2>
            <div className="mt-8">
              <Link href="/book" className="btn-ember text-base">
                Book a Date
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
