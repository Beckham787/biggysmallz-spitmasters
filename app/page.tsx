import Link from "next/link";
import Image from "next/image";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { galleryTeaser } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

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
          Fire as the light source. A bed of live coals glows up from the
          bottom edge, lighting the headline and the food photo from below.
          The hero's one job: make the visitor hungry, then move them to a
          quote. Mobile reorders the photo between the subline and the CTA so
          appetite comes before the ask. ─────────────────────────────────── */}
      <section className="relative isolate grain flex min-h-[100svh] items-stretch overflow-hidden bg-ink lg:items-center">
        <div className="coal-bed pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="section relative z-10 grid grid-cols-1 gap-y-9 pb-20 pt-32 sm:gap-y-10 sm:pb-24 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-6 lg:pb-28 lg:pt-36">
          {/* Eyebrow — the stamp: what, and the reach. */}
          <Reveal className="lg:col-span-7 lg:col-start-1">
            <p className="eyebrow">Spitbraai catering · Across South Africa</p>
          </Reveal>

          {/* Headline — the thesis. Fraunces, mixed-case; "fire" comes off the coals. */}
          <Reveal className="lg:col-span-7 lg:col-start-1" delay={80}>
            <h1 className="font-serif text-balance text-[clamp(2.75rem,6vw+1rem,5.5rem)] font-semibold normal-case leading-[0.95] tracking-[-0.02em] text-cream text-shadow-soft">
              Real <span className="seared italic">fire.</span>
              <br />
              Whole feasts.
            </h1>
          </Reveal>

          {/* What we do — one clear line. */}
          <Reveal className="lg:col-span-7 lg:col-start-1" delay={160}>
            <p className="max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
              Spitbraai catering for weddings, corporate events and funerals —
              based in the Mpumalanga Lowveld, catering across South Africa.
            </p>
          </Reveal>

          {/* Hero food photo — lit from below by the coal bed. object-cover so a
              non-portrait source fills the frame cleanly; swap in higher-res
              shots later by changing the src. */}
          <Reveal
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-6 lg:self-center"
            delay={120}
          >
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-md border border-cream/15 bg-coal shadow-ember-lg lg:mx-0">
              <Image
                src="/images/anniversary-salmon.png"
                alt="A refined plated salmon dish held in the chef's hand, emerging from darkness."
                fill
                priority
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
              {/* Firelight wash up from the coals onto the dish. */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ember/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </figure>
          </Reveal>

          {/* Primary action + quiet WhatsApp fallback. */}
          <Reveal className="lg:col-span-7 lg:col-start-1" delay={240}>
            <div className="flex flex-col items-start gap-4">
              <Link href="/book" className="btn-ember text-base">
                Get a Quote
              </Link>
              <p className="text-sm text-cream/70">
                or message Biggy on{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-ember/60 underline-offset-4 transition-colors hover:text-cream"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </Reveal>

          {/* Trust signal — reliability at scale. Cumulative reach across many
              events (not a single-event figure); largest single event ~300. */}
          <Reveal className="lg:col-span-7 lg:col-start-1" delay={320}>
            <div className="flex max-w-xl items-start gap-3 border-t border-cream/10 pt-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-gold"
                aria-hidden="true"
              >
                <path d="M12 3c1.8 2.4 1.2 4.2 0 6-1.2-1.2-2.4-.6-2.4 1.2 0 1.2.9 2.1 2.4 3.6 2.4-1.8 3.6-3.9 3.6-6.6C18 11.4 19 13.2 19 15.4A7 7 0 1 1 5 15.4c0-3 1.6-5.7 4-8 .6 1.8 1.8 2.7 3 2.7" />
              </svg>
              <p className="text-sm leading-relaxed text-cream-dim">
                <span className="text-cream">
                  Over 2,000 plates served across his events.
                </span>{" "}
                From intimate dinners up to 300-guest functions — fed in full,
                and on time.
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

      {/* ── Gallery teaser ───────────────────────────────────────────────── */}
      <section className="relative grain overflow-hidden bg-charcoal py-20 sm:py-28">
        <div className="section relative z-10">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-3">From the fire</p>
                <h2 className="text-4xl text-cream sm:text-5xl">The work</h2>
              </div>
              <Link
                href="/gallery"
                className="shrink-0 font-display uppercase tracking-stamp text-sm text-ember-bright underline-offset-4 hover:underline"
              >
                See the gallery
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {galleryTeaser.map((img, i) => (
              <Reveal key={img.slug} delay={(i % 3) * 100}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-square overflow-hidden rounded-sm bg-coal"
                >
                  <Image
                    src={`/images/${img.slug}.png`}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
                </Link>
              </Reveal>
            ))}
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
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
              {siteConfig.asSeenOn.map((item) => (
                <li
                  key={item}
                  className="font-display uppercase tracking-stamp text-sm text-cream-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Closing invitation ───────────────────────────────────────────── */}
      <CtaBand
        heading="Tell Biggy about your day."
        sub="A date, the kind of event, and how to reach you — that's all it takes to start. No deposit, no commitment yet."
      />
    </>
  );
}
