import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import YearRail from "@/components/YearRail";
import { siteConfig } from "@/lib/site-config";
import { mediaCredits, saBbqFestival } from "@/lib/recognition";
import { previousAppearances, upcomingAppearances } from "@/lib/appearances";

/**
 * RecognitionFeature — "On the record". Sits directly under the hero and says,
 * in about five seconds, what the paragraphs on the About page used to bury:
 * five years at an international fire-cooking festival, and a run of TV and
 * radio appearances. Each line is labelled by what it is and links to its
 * evidence. Replaces the old "Catch us live", "On air" and "As seen on /
 * Catch me on" blocks (their content is all still here).
 *
 * Left: the Mozambique milestone (links to /mozambique). Right: the media
 * credits, labelled TV or Radio. Underneath: festival logos and the
 * upcoming/previous line, which is computed from lib/appearances.ts so a past
 * date can never advertise itself as upcoming.
 */
export default function RecognitionFeature() {
  const upcoming = upcomingAppearances();
  const previous = previousAppearances();

  return (
    <section
      aria-labelledby="record-heading"
      className="border-b border-cream/10 bg-ink py-16 sm:py-24"
    >
      <div className="section">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
            On the record
          </p>
          <h2
            id="record-heading"
            className="mt-3 max-w-xl text-balance font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl"
          >
            Maputo&rsquo;s coals. National television.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── A · Mozambique — the five-year milestone ──────────────── */}
          <Reveal className="lg:col-span-7">
            <Link
              href="/mozambique"
              aria-label="Explore the story: Five Years on Mozambique's Coals"
              className="group relative flex flex-col overflow-hidden rounded-sm border border-cream/15 bg-charcoal lg:h-full lg:min-h-[44rem] lg:justify-end"
            >
              {/* Phones and tablets: the photo sits on its own, so the name on
                  the banner stays readable. From lg up, the text lays over it. */}
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
                <Image
                  src="/images/mozambique/mozambique-stall.png"
                  alt="Biggy's own stall at the Mozambique Barbecue Festival, his name across the banner."
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-[center_26%] transition duration-700 group-hover:scale-[1.03] lg:object-[center_38%]"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden lg:block"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(22,21,23,0.97) 0%, rgba(22,21,23,0.9) 42%, rgba(22,21,23,0.3) 72%, rgba(22,21,23,0.05) 100%)",
                }}
              />
              <div className="relative z-10 w-full p-6 sm:p-9">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
                  International fire cooking
                </p>
                <h3 className="mt-3 max-w-lg text-balance font-display text-3xl uppercase leading-[1.05] tracking-[0.02em] text-cream sm:text-4xl lg:text-5xl">
                  Five Years on Mozambique&rsquo;s Coals
                </h3>
                <YearRail className="mt-5" />
                <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-cream/85">
                  Every October since 2022, Biggy has crossed into Maputo for
                  the Mozambique Barbecue Festival &mdash; whole animals over
                  live coals, his own name on the banner.
                </p>
                <span className="mt-5 inline-block font-display text-sm uppercase tracking-[0.14em] text-paper underline-offset-4 group-hover:underline">
                  Explore the story &rarr;
                </span>
              </div>
            </Link>
          </Reveal>

          {/* ── B · TV & radio, and C · SA BBQ Festival (when confirmed) ── */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-sm border border-cream/15">
              <p className="border-b border-cream/10 px-5 py-4 font-display text-xs uppercase tracking-[0.3em] text-paper sm:px-6">
                On screen &amp; on air
              </p>
              <ul className="flex flex-1 flex-col divide-y divide-cream/10">
                {mediaCredits.map((item) => (
                  <li
                    key={item.name}
                    className="grid flex-1 grid-cols-[5.5rem_1fr] items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    {item.logo ? (
                      <span className="relative block h-16 w-[5.5rem]">
                        <Image
                          src={item.logo}
                          alt={`${item.name} logo`}
                          fill
                          sizes="88px"
                          className="object-contain"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-14 w-[5.5rem] items-center justify-center rounded-sm border border-cream/25 text-center font-display text-xs uppercase leading-tight tracking-[0.12em] text-cream/80"
                      >
                        Rise
                        <br />
                        FM
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-xs uppercase tracking-[0.24em] text-cream/70">
                        {item.medium}
                      </p>
                      <p className="mt-1 font-display text-base uppercase leading-snug tracking-[0.03em] text-cream">
                        {item.name}
                      </p>
                      <p className="mt-1 font-body text-base italic leading-snug text-cream/75">
                        {item.credit}
                      </p>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex min-h-[44px] items-center font-display text-xs uppercase tracking-[0.16em] text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
                        >
                          {item.linkLabel}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {saBbqFestival.founderConfirmed && (
                <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4 border-t border-cream/10 px-5 py-4 sm:px-6">
                  <span className="relative block h-16 w-[5.5rem]">
                    <Image
                      src={saBbqFestival.logo}
                      alt={`${saBbqFestival.name} logo`}
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xs uppercase tracking-[0.24em] text-cream/70">
                      Festival
                    </p>
                    <p className="mt-1 font-display text-base uppercase leading-snug tracking-[0.03em] text-cream">
                      {saBbqFestival.headline}
                    </p>
                    <p className="mt-1 font-body text-base italic leading-snug text-cream/75">
                      {saBbqFestival.dateLabel} &middot; {saBbqFestival.venue}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* ── Festivals + upcoming/previous ─────────────────────────────── */}
        <Reveal>
          <div className="mt-10 flex flex-col gap-8 border-t border-cream/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-cream/70">
                Festivals
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-5">
                {siteConfig.catchMeOn.map((fest) => (
                  <li key={fest.name} className="flex w-32 flex-col items-center gap-2 text-center">
                    {fest.logo && (
                      <span className="relative block h-14 w-full">
                        <Image
                          src={fest.logo}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-contain"
                        />
                      </span>
                    )}
                    <span className="font-display text-xs uppercase leading-snug tracking-[0.12em] text-cream/80">
                      {fest.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-sm">
              {upcoming.length > 0 ? (
                <>
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-cream/70">
                    Catch Biggy live
                  </p>
                  <ul className="mt-4 space-y-3">
                    {upcoming.map((a) => (
                      <li key={a.slug} className="font-body text-base leading-snug text-cream/85">
                        <span className="font-display uppercase tracking-[0.03em] text-cream">
                          {a.name}
                        </span>
                        <br />
                        {a.dateLabel} &middot; {a.venue}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-cream/70">
                    Next appearance
                  </p>
                  <p className="mt-4 font-body text-base leading-snug text-cream/85">
                    None announced right now. New dates go up on{" "}
                    <a
                      href={siteConfig.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
                    >
                      {siteConfig.contact.instagramHandle}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    .
                  </p>
                </>
              )}
              {previous.length > 0 && (
                <p className="mt-4 font-body text-base leading-snug text-cream/75">
                  Previous:{" "}
                  {previous.map((a, i) => (
                    <span key={a.slug}>
                      {i > 0 && ", "}
                      {a.href ? (
                        <Link
                          href={a.href}
                          className="text-paper underline decoration-cream/40 underline-offset-4 hover:decoration-paper"
                        >
                          {a.name}, {a.dateLabel}
                        </Link>
                      ) : (
                        <>
                          {a.name}, {a.dateLabel}
                        </>
                      )}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
