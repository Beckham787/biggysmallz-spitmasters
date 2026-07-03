import Link from "next/link";
import Image from "next/image";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { recentEvent } from "@/lib/recent-event";
import Reveal from "@/components/Reveal";
import HeroSlideshow from "@/components/HeroSlideshow";

const worlds = [
  {
    title: "The Spit",
    blurb:
      "Whole lamb, pork, beef and chicken, slow-turned over coals. The centrepiece people gather around.",
    image: "whole-lamb-rotisserie",
    alt: "A whole lamb turning on a rotisserie spit above the fire.",
  },
  {
    title: "The Table",
    blurb:
      "Plated three- to seven-course dining, brought to your home or venue. Quiet, considered, restaurant-level.",
    image: "private-dining-lamb-rack",
    alt: "A rack of lamb carved and plated for a private dinner.",
  },
  {
    title: "The Spread",
    blurb:
      "Generous buffets and feasts for the big gatherings, served warm from the fire.",
    image: "meats-warm-from-spit",
    alt: "Roasted meats resting warm, fresh off the spit.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────
          Full-bleed photography with the copy resting at the bottom. The
          background is a slideshow: three shots crossfade one at a time so the
          hero stays alive without competing with the headline. ───────────── */}
      <section className="relative grain flex min-h-[100svh] items-end overflow-hidden">
        <HeroSlideshow />
        <div className="photo-veil absolute inset-0" />

        <div className="section relative z-10 pb-20 pt-32 sm:pb-28">
          <Reveal>
            <p className="eyebrow mb-5">Est. {siteConfig.established}</p>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.95] text-cream text-shadow-soft sm:text-6xl md:text-7xl">
              Fire, and everything it can become.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/90 text-shadow-soft sm:text-xl">
              Spitbraai catering for weddings, corporate events and funerals —
              based in the Mpumalanga Lowveld, catering across South Africa.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4">
              <Link href="/book" className="btn-ember text-base">
                Book a Service
              </Link>
              <p className="text-sm text-cream/75">
                Or message Biggy on{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-ember/60 underline-offset-4 transition-colors hover:text-cream"
                >
                  WhatsApp
                </a>{" "}
                /{" "}
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-ember/60 underline-offset-4 transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Invitation ───────────────────────────────────────────────────── */}
      <section className="relative grain glow-center overflow-hidden bg-charcoal py-24 sm:py-32">
        <div className="section relative z-10">
          <Reveal>
            <p className="mx-auto max-w-prose text-balance text-center text-2xl font-light leading-relaxed text-cream sm:text-3xl">
              Every event is its own thing. A wedding, a lobola lunch, a
              fortieth, a quiet dinner for two. Biggy doesn&rsquo;t do set
              packages off a page — he&rsquo;d rather hear what you&rsquo;re
              planning, then build the food around it. That conversation is
              where it starts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Three worlds ─────────────────────────────────────────────────── */}
      <section className="glow-top bg-ink py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-3">The range</p>
            <h2 className="mb-12 max-w-2xl text-4xl text-cream sm:text-5xl">
              Three worlds, one fire.
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {worlds.map((world, i) => (
              <Reveal key={world.title} delay={i * 120}>
                <article className="group lift relative h-[26rem] overflow-hidden rounded-sm bg-coal">
                  <Image
                    src={`/images/${world.image}.png`}
                    alt={world.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl text-cream">{world.title}</h3>
                    <p className="mt-2 text-cream-dim">{world.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent event spotlight ───────────────────────────────────────────
          One real, recent job told with a little depth, rather than a grid of
          unrelated shots. Swap the event in lib/recent-event.ts after the next
          one. ────────────────────────────────────────────────────────────── */}
      <section className="relative grain overflow-hidden bg-charcoal py-20 sm:py-28">
        <div className="section relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7" as="div">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal sm:aspect-[4/3]">
                <Image
                  src={`/images/${recentEvent.image}.png`}
                  alt={recentEvent.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
              <Reveal>
                <p className="eyebrow mb-3">{recentEvent.eyebrow}</p>
                <h2 className="text-3xl text-cream sm:text-4xl">
                  {recentEvent.caption}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-dim">
                  {recentEvent.detail}
                </p>
              </Reveal>

              {recentEvent.supportingImage && (
                <Reveal delay={150} className="mt-8">
                  <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-sm bg-coal">
                    <Image
                      src={`/images/${recentEvent.supportingImage}.png`}
                      alt={recentEvent.supportingImageAlt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              )}

              <Reveal delay={250}>
                <Link
                  href="/gallery"
                  className="mt-8 inline-block font-display uppercase tracking-stamp text-sm text-ember-bright underline-offset-4 hover:underline"
                >
                  See more of the work
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── As seen on ───────────────────────────────────────────────────── */}
      <section className="border-y border-cream/10 bg-ink py-12">
        <div className="section">
          <Reveal>
            <p className="mb-6 text-center font-display uppercase tracking-stamp text-xs text-smoke">
              As seen on
            </p>
            <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 text-center sm:gap-x-14">
              {siteConfig.asSeenOn.map((item) => (
                <li
                  key={item.name}
                  className="flex w-32 flex-col items-center gap-3 sm:w-40"
                >
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
                  <span className="font-display uppercase tracking-stamp text-xs text-cream-dim">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
