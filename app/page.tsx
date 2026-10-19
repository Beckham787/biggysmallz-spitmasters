import Link from "next/link";
import Image from "next/image";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import HeroPhoto from "@/components/HeroPhoto";
import RecognitionFeature from "@/components/RecognitionFeature";
import ServiceTiles from "@/components/ServiceTiles";
import LatestBand from "@/components/LatestBand";
import CtaBand from "@/components/CtaBand";

// The homepage reads today's date (RecognitionFeature decides what is
// upcoming and what is previous), so rebuild it at most hourly instead of
// freezing "today" at build time.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      {/* ── Entrance — the walk-in. Dimmed photo, one warm pool of light,
          eyes still adjusting. Same photo, same headline, same line. The
          refinement pass added the two enquiry buttons (Book a Service,
          Chat to Biggy) so a visitor never has to look for how to ask. ──── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-center">
        <HeroPhoto />

        <div className="section relative z-10 max-w-xl pb-8 pt-24">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.38em] text-paper">
              Est. {siteConfig.established}
            </p>
            <h1 className="mt-6 text-balance font-display text-5xl uppercase leading-[1.05] tracking-[0.04em] text-cream sm:text-6xl lg:text-7xl">
              Get in my belly
            </h1>
            <div className="mx-auto mt-7 h-px w-11 bg-gold" />
            <p className="mx-auto mt-7 max-w-md font-body text-lg italic leading-relaxed text-cream/90">
              Personal chef service, brought to wherever your table is —
              from fire feasts to a 7-course tasting menu.
            </p>
            <div className="mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <Link href="/book" className="btn-ember text-base sm:min-w-[11.5rem]">
                Book a Service
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base sm:min-w-[11.5rem]"
              >
                Chat to Biggy
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── On the record — the credentials, up where they can be seen. ──── */}
      <RecognitionFeature />

      {/* ── The range ────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="section">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
              The range
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
              From the coals to the plate
            </h2>
          </Reveal>
          <div className="mt-10">
            <ServiceTiles />
          </div>
          <Link
            href="/work"
            className="mt-8 inline-flex min-h-[44px] items-center font-display text-sm uppercase tracking-[0.14em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
          >
            See the work
          </Link>
        </div>
      </section>

      {/* ── Latest — the newest entries from lib/latest.ts, matching what's
          on Instagram: the homepage's one "recent" section. The featured
          event story that used to follow it ("Recently") now lives on
          /latest under its own month, so the homepage doesn't show two
          versions of "what he did lately". ────────────────────────────── */}
      <LatestBand />

      {/* ── The chef behind the fire — short and portrait-led. The COVID
          line is the About page's own, and stays unattributed (no place,
          date or organisation) as it does there. ──────────────────────── */}
      <section className="border-b border-cream/10 bg-charcoal py-16 sm:py-24">
        <div className="section">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <Reveal className="md:col-span-4" as="div">
              <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-sm bg-coal sm:w-56 md:w-full">
                <Image
                  src="/images/Founder.JPG"
                  alt="Martin “Biggy” Mhlongo in his black chef's jacket, smiling, one hand on the steel pass."
                  fill
                  sizes="(min-width: 768px) 30vw, 14rem"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </Reveal>
            <Reveal className="md:col-span-8" as="div" delay={120}>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
                Head Honcho
              </p>
              <h2 className="mt-3 text-3xl text-cream sm:text-4xl">
                Martin &ldquo;Biggy&rdquo; Mhlongo
              </h2>
              <div className="mt-5 max-w-lg space-y-4 font-body text-lg leading-relaxed text-cream/85">
                <p>
                  Cooking over open flame since 2017: whole lamb on the spit
                  in Mbombela, a 7-course table brought to your door, and
                  festival coals in Maputo.
                </p>
                <p>
                  When COVID emptied tables, he pointed the fire somewhere
                  else and cooked hot meals for people who needed one.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-4 inline-flex min-h-[44px] items-center font-display text-sm uppercase tracking-[0.14em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
              >
                More about Biggy and the team
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Booking invitation ───────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Book a Service"
        heading="Tell Biggy what you're planning"
        sub="The date, the kind of event, and how to reach you. He'll shape the food from there."
      />
    </>
  );
}
