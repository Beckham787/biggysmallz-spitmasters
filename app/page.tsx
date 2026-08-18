import Link from "next/link";
import Image from "next/image";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { featuredCaseStudy } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import HeroSlideshow from "@/components/HeroSlideshow";
import CaseStudyMedia from "@/components/CaseStudyMedia";

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

      {/* ── Recent event spotlight ───────────────────────────────────────────
          The single featured case study — a three-shot slideshow and a short
          teaser, linking through to the full write-up. Every other event lives
          on /work. Swap the featured event in lib/case-studies.ts. ────────── */}
      <section className="relative grain overflow-hidden bg-charcoal py-20 sm:py-28">
        <div className="section relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7" as="div">
              <Link
                href={`/work/${featuredCaseStudy.slug}`}
                className="block"
                aria-label={`Read the full story: ${featuredCaseStudy.title}`}
              >
                <CaseStudyMedia
                  study={featuredCaseStudy}
                  aspectClassName="aspect-[4/5] sm:aspect-[4/3]"
                />
              </Link>
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-3">Recently</p>
                <h2 className="text-3xl text-cream sm:text-4xl">
                  {featuredCaseStudy.title}
                </h2>
                <p className="mt-2 font-display uppercase tracking-stamp text-xs text-smoke">
                  {featuredCaseStudy.venue
                    ? `${featuredCaseStudy.venue} · ${featuredCaseStudy.date}`
                    : featuredCaseStudy.date}
                </p>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-dim">
                  {featuredCaseStudy.teaser}
                </p>
              </Reveal>

              {featuredCaseStudy.quote && (
                <Reveal delay={150}>
                  <blockquote className="mt-6 max-w-md border-l-2 border-ember pl-5 text-lg italic leading-relaxed text-cream/90">
                    &ldquo;{featuredCaseStudy.quote}&rdquo;
                  </blockquote>
                </Reveal>
              )}

              <Reveal delay={250}>
                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link
                    href={`/work/${featuredCaseStudy.slug}`}
                    className="btn-ember text-base"
                  >
                    See the full event
                  </Link>
                  <Link
                    href="/work"
                    className="font-display uppercase tracking-stamp text-sm text-ember-bright underline-offset-4 hover:underline"
                  >
                    Browse all our work
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── As seen on / Catch me on ─────────────────────────────────────── */}
      <section className="border-y border-cream/10 bg-ink py-12">
        <div className="section grid gap-10 sm:grid-cols-2 sm:gap-6">
          <Reveal>
            <CreditGroup label="As seen on" items={siteConfig.asSeenOn} />
          </Reveal>
          <Reveal delay={100}>
            <CreditGroup label="Catch me on" items={siteConfig.catchMeOn} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CreditGroup({
  label,
  items,
}: {
  label: string;
  items: { name: string; logo?: string; logoClass?: string }[];
}) {
  return (
    <div>
      <p className="mb-6 text-center font-display uppercase tracking-stamp text-xs text-smoke sm:text-left">
        {label}
      </p>
      <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 text-center sm:justify-start">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex w-32 flex-col items-center gap-3 sm:w-36"
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
    </div>
  );
}
