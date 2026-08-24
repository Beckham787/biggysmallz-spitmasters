import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * app/mozambique/page.tsx — the Mozambique Barbecue Festival feature page.
 * TK: "This is a very important page, very very important" — treat any
 * future change here with real care and go slowly. She's also said it
 * should make a visitor want to stay on this page longer than any other on
 * the site — the body is written and paced with that in mind, not just
 * restyled.
 *
 * Full history of earlier rounds (hero swap, six-chapter redesign, crop
 * fix, reorder, real-caption pass) is in git/project memory. This comment
 * covers the round that matters most for understanding the CURRENT layout:
 *
 * Seventh pass, same day: TK gave four corrections to the previous round:
 *  1. The unnumbered epigraph ("Churrasqueiro Internacional" — that's the
 *     title...) is REMOVED entirely — the page now goes straight from the
 *     hero into Chapter I.
 *  2. Chapter I's announcement copy must stay in the ORIGINAL PORTUGUESE
 *     of the real festival caption, not translated/paraphrased into
 *     English like the previous round did.
 *  3. Every chapter using a real supplied caption (I, II, III) now uses
 *     THAT EXACT TEXT ONLY — no extra framing sentences added on top. The
 *     previous round had appended extra authored sentences after each
 *     real caption (e.g. Chapter III closing on a separately-sourced "Get
 *     in my belly" quote that wasn't part of the caption TK gave for that
 *     chapter) — TK: "Don't add to the captions!! Use the exact caption I
 *     gave you!" That's now fixed: I, II and III are each the supplied
 *     caption verbatim (only a duplicated-word typo in II's caption was
 *     silently corrected: "best best friendship" → "best friendships";
 *     everything else, including South African-English phrasing like
 *     "good gees", is kept exactly as given).
 *  4. Chapter IV (the stall/banner photo) still has no usable real
 *     caption. TK: "The 'IV . His own name on the banner' section must
 *     change. Do something with that space." Rather than writing another
 *     authored paragraph in the same two-column template as II/III (which
 *     is what got rejected), this chapter is now a distinct full-bleed
 *     "banner" moment — dimmed full-width photo with the banner's own
 *     text ("MARTIN 'BIGGY' MHLONGO") pulled out as large display type,
 *     no story paragraph. It deliberately looks different from the
 *     repeated I–III template since there's no caption to hang a matching
 *     paragraph on, and reusing that template a fourth time with just
 *     re-worded filler is what TK flagged as not working.
 *
 * IMPORTANT: none of this touches the homepage. The homepage's own
 * Upcoming card still points at the same poster image
 * (mozambique-2026-poster.jpg) independently — only this page's copy and
 * structure changed.
 *
 * Eighth pass, same day: TK flagged that "MARTIN 'BIGGY' MHLONGO" wasn't
 * showing on the new IV banner section when the window was maximized.
 * Cause: the same crop bug from earlier rounds, on a new section. The
 * source photo is portrait (1170x1453) with the yellow name-banner sitting
 * at roughly 22%-38% down the frame; the full-bleed section's default
 * `object-cover` centered the crop at 50%, and at wide/short viewports
 * (e.g. 1800x900) the visible window landed well below the banner,
 * showing only the Coca-Cola tent canopy and the dark stall interior.
 * Fixed with `object-[center_20%]` on the Image, biasing the crop toward
 * the top of the frame so the banner stays in the visible window across
 * viewport widths (checked the math at both ~912px and ~1800px — 20% sits
 * inside the safe range for both). Any other full-bleed `fill` +
 * `object-cover` photo added to this page in future should get the same
 * treatment: work out where the subject actually sits in the source
 * photo's frame (as a % from top) and set object-position deliberately —
 * don't leave it at the 50% default when the subject isn't centered.
 *
 * Deliberately NOT built on the /work/[slug] case-study template. This is a
 * standalone destination, not one more event card.
 *
 * PDVN2882.JPG (mountains, "Ultimate Braai Master" TV apron, blue show
 * tents) and CRXJ9352.JPG (the stale 2024 lineup poster) are deliberately
 * excluded. Every other photo in /public/images/mozambique is used once.
 */

const heroImage = {
  src: "/images/mozambique/mozambique-hanging-chickens.png",
  alt: "Whole chickens and pineapples hanging over glowing coals under a domed rig, festival marquee tents behind, at the Mozambique Barbecue Festival.",
};

const years = ["2022", "2023", "2024", "2025", "2026"];

export const metadata: Metadata = {
  title: "Mozambique Barbecue Festival",
  alternates: { canonical: "/mozambique" },
  description:
    "Every October since 2022, Biggy's crossed the border for the Mozambique Barbecue Festival — whole animals on the coals at Campus da UEM, Maputo. Five years running.",
  openGraph: {
    title: "Mozambique Barbecue Festival · Biggy Smallz Spitmasters",
    description:
      "Five years on the coals at Mozambique's biggest fire-cooking festival.",
    images: [heroImage.src],
  },
};

export default function MozambiquePage() {
  return (
    <>
      {/* ── Hero — full-bleed dimmed photo, same vignette recipe as every
          other page's entrance. ── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink sm:min-h-screen">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.36] saturate-[0.85]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(11,10,9,0.95) 0%, rgba(11,10,9,0.4) 55%, rgba(11,10,9,0.1) 100%)",
          }}
        />

        <div className="absolute right-5 top-28 z-10 sm:right-10 sm:top-32">
          <Reveal delay={200}>
            <div className="h-16 w-16 overflow-hidden rounded-full border border-gold/50 bg-ink/40 p-1 sm:h-20 sm:w-20">
              <Image
                src="/logos/mozambique-barbecue-festival.png"
                alt="Mozambique Barbecue Festival official badge."
                width={160}
                height={160}
                className="h-full w-full rounded-full object-cover"
                style={{
                  filter:
                    "grayscale(1) sepia(0.55) saturate(2.2) hue-rotate(-8deg) brightness(0.88) contrast(0.95)",
                }}
              />
            </div>
          </Reveal>
        </div>

        <div className="section relative z-10 w-full pb-14 pt-32 sm:pb-20">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
              International Stage · Fifth Year Running
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-5xl">
              Five Years on Mozambique&rsquo;s Coals
            </h1>
            <p className="mt-5 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              Every October since 2022, Biggy&rsquo;s crossed into Maputo
              for the region&rsquo;s biggest fire-cooking festival — whole
              animals over live coals, thousands of appetites, and a stage
              shared with grill masters from three countries.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {years.map((y) => (
                <span
                  key={y}
                  className={`font-display text-xs uppercase tracking-[0.1em] ${
                    y === "2026"
                      ? "text-gold"
                      : "text-cream-dim/60"
                  }`}
                >
                  {y}
                  {y !== years[years.length - 1] && (
                    <span className="ml-2 text-cream-dim/30">·</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-4 font-display text-xs uppercase tracking-[0.14em] text-smoke">
              Campus da UEM, Maputo · 2026 edition: 3 October
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── I · Confirmed for the Fire — a bespoke announcement section,
          not the shared Chapter component, because it carries an event
          details row + ticket CTA on top of the usual image + copy. The
          caption paragraph is the real festival caption VERBATIM, in the
          original Portuguese — not translated, not paraphrased, per TK's
          explicit instruction. ─────────────────────────────────────────── */}
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="section grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-14">
          <Reveal className="sm:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/20 bg-coal shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/mozambique/mozambique-2026-poster.jpg"
                alt="The 2026 Mozambique Barbecue Festival poster, confirming Biggy Smallz as Churrasqueiro."
                fill
                sizes="(min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="sm:order-2">
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
              I · Confirmed for the Fire
            </p>
            <p className="mt-4 max-w-prose font-body text-lg italic leading-relaxed text-cream">
              Da &Aacute;frica do Sul para o maior festival de churrasco de
              Mo&ccedil;ambique! O talento internacional continua a chegar
              ao Mozambique Barbecue Festival 2026! Temos o prazer de
              confirmar Biggy Smallz, um mestre do fogo que promete trazer
              toda a sua t&eacute;cnica, paix&atilde;o e sabor para uma
              experi&ecirc;ncia &uacute;nica.
            </p>
            <dl className="mt-7 space-y-2.5">
              <div className="flex items-baseline gap-3">
                <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.14em] text-gold">
                  Date
                </dt>
                <dd className="font-body text-cream-dim">3 October 2026</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.14em] text-gold">
                  Venue
                </dt>
                <dd className="font-body text-cream-dim">Campus da UEM, Maputo</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.14em] text-gold">
                  Time
                </dt>
                <dd className="font-body text-cream-dim">12h00</dd>
              </div>
            </dl>
            <a
              href="https://www.arena.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-7 inline-block text-sm"
            >
              Get your ticket →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Chapters II–III — the shared two-column template (contained
          portrait image + numbered eyebrow + story text), alternating
          sides. Each caption below is the exact text TK supplied — no
          added sentences on top. ─────────────────────────────────────── */}
      <Chapter
        number="II"
        label="Old Friends, New Fire"
        image="mozambique/IZGH3821.JPG"
        alt="Biggy and a fellow chef at the festival, both in Coca-Cola caps, the Churrasqueiro Internacional lanyard around Biggy's neck."
        align="right"
      >
        Some of the best friendships are forged around the fire. Good
        gees, great stories, and unforgettable memories.
      </Chapter>

      <Chapter
        number="III"
        label="The Craft"
        image="mozambique/UTVJ4075.JPG"
        alt="Cuts of meat hanging from a domed rig over glowing coals, red earth and a clear blue sky."
        align="left"
      >
        Experiencing the Mozambique Barbecue Festival was and always is a
        journey for the senses. The sizzling flavours, rich tradition, and
        warm gatherings made every bite unforgettable. We embraced the
        soul of slow cooking with Low and Slow open flame roasted Prime
        Rib, paired with Elote Corn. But the true start of the day was our
        Hang Roasted whole Oxtail, braised in Laurentina Preta dark beer
        and served alongside freshly baked herb butter P&atilde;o.
      </Chapter>

      {/* ── IV · That's My Name Up There — deliberately NOT the shared
          Chapter template. No usable real caption exists for this photo,
          and a fourth round of authored filler in the same repeated
          two-column layout is what TK flagged as not working ("do
          something with that space"). Instead: a full-bleed banner
          moment that pulls the sign's own text out as large display
          type — the photo's subject becomes the copy. Title renamed
          2026-08-23 per TK, from the plain descriptive "His Own Name on
          the Banner" to something that reads like Biggy's own voice
          (playful, proud, first-person — matching his real Instagram
          captions) rather than a caption written about him. ──────────── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink sm:min-h-[70vh]">
        <Image
          src="/images/mozambique/mozambique-stall.png"
          alt="Biggy's own branded stall, his name Martin 'Biggy' Mhlongo across the top banner, the Mozambique Barbecue Festival badge below."
          fill
          sizes="100vw"
          className="object-cover object-[center_20%] brightness-[0.4] saturate-[0.85]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(11,10,9,0.92) 0%, rgba(11,10,9,0.3) 60%, rgba(11,10,9,0.05) 100%)",
          }}
        />
        <div className="section relative z-10 w-full pb-14 pt-24 sm:pb-20">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
              IV · That&rsquo;s My Name Up There
            </p>
            <p className="mt-4 max-w-2xl font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-5xl">
              Martin &lsquo;Biggy&rsquo; Mhlongo
            </p>
            <p className="mt-5 font-display text-xs uppercase tracking-[0.14em] text-smoke">
              His own corner of the festival, five years running.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── V · The Fire Never Stops — mosaic gallery, deliberately
          different from the chapters above: many small tiles, not one
          narrative beat. Also carries the two photos that used to be
          their own "Round the Coals" section, folded in here instead of
          cut. ─────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="section">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
              V · Archives
            </p>
            <p className="mt-4 max-w-prose font-body text-lg italic leading-relaxed text-cream">
              Five years of coals, whole animals, and everything that ends
              up beside them — a small selection of what five Octobers in
              Maputo actually look like.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 auto-rows-[130px] gap-3 sm:grid-cols-4 sm:auto-rows-[160px] sm:gap-4">
            <MosaicTile image="mozambique/PCII7929.JPG" alt="Lamb halves roasting on stands beside a fire, cloudy sky overhead." span="row-span-2" delay={0} />
            <MosaicTile image="mozambique/UNHZ6749.JPG" alt="Biggy slicing grilled meat on a wooden board, red festival lighting." span="row-span-1" delay={120} />
            <MosaicTile image="mozambique/mozambique-pineapples.png" alt="A row of whole pineapples laid over glowing coals." span="row-span-2" delay={240} />
            <MosaicTile image="mozambique/SDCU1014.JPG" alt="A grilled meat wrap folded with pickled red onion, held out under red festival lighting." span="row-span-1" delay={360} />
            <MosaicTile image="mozambique/mozambique-hanging-meats.png" alt="Whole cuts of meat hanging from chains over coals, black mesh fencing behind." span="row-span-2" delay={480} />
            <MosaicTile image="mozambique/XENB4299.JPG" alt="Cuts of meat and red onions hanging from steel hooks against a clear blue sky." span="row-span-1" delay={600} />
            <MosaicTile image="mozambique/BNRI0775.JPG" alt="Biggy and a chef from Mr Faife Rodizio posing with a skewer of grilled meat fresh off the fire." span="row-span-1" delay={720} />
            <MosaicTile image="mozambique/JQDR9528.JPG" alt="Biggy and four other chefs and friends gathered around an open fire, drinks in hand." span="row-span-1" delay={840} />
            <MosaicTile image="mozambique/RMEJ1233.JPG" alt="Close-up of hands carving a rack of glazed, seasoned ribs on a wooden board." span="row-span-1 col-span-2 sm:col-span-1" delay={960} />
          </div>
        </div>
      </section>

      {/* ── Closing stat band — "5 Years." per TK, everything else here
          she called "perfect," untouched. ──────────────────────────────── */}
      <section className="border-y border-cream/10 bg-coal py-20 text-center sm:py-28">
        <div className="section">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              Since 2022
            </p>
            <p className="mt-5 font-display text-4xl uppercase tracking-[0.02em] text-cream sm:text-5xl">
              5 Years.
            </p>
            <p className="mx-auto mt-5 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              Biggy&rsquo;s back on the bill for the 2026 edition — 3
              October, Campus da UEM, Maputo. Follow along for this
              year&rsquo;s lineup.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://www.instagram.com/biggysmallzspitmasters"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                @biggysmallzspitmasters →
              </a>
              <Link href="/work" className="btn-ghost text-base">
                ← All our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** The page's core narrative unit, used for chapters II–III: a contained
 * image at its own natural aspect ratio (never forced wide) beside a
 * numbered eyebrow and a short story paragraph, alternating which side
 * the image sits on so the sequence reads as a gentle zig-zag rather than
 * identical blocks stacked straight down. `frameShadow` adds the soft
 * drop-shadow used for a flat printed flyer (not used here anymore — the
 * poster now lives in its own bespoke announcement section above — but
 * kept on the component in case a future chapter needs it). */
function Chapter({
  number,
  label,
  image,
  alt,
  align,
  frameShadow,
  children,
}: {
  number: string;
  label: string;
  image: string;
  alt: string;
  align: "left" | "right";
  frameShadow?: boolean;
  children: React.ReactNode;
}) {
  const imageOrder = align === "right" ? "sm:order-2" : "sm:order-1";
  const textOrder = align === "right" ? "sm:order-1" : "sm:order-2";

  return (
    <section className="bg-charcoal py-16 sm:py-24">
      <div className="section grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-14">
        <Reveal className={imageOrder}>
          <div
            className={`relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/20 bg-coal ${
              frameShadow ? "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" : ""
            }`}
          >
            <Image
              src={image.startsWith("mozambique/")
                ? `/images/${image}`
                : image}
              alt={alt}
              fill
              sizes="(min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className={textOrder}>
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            {number} · {label}
          </p>
          <p className="mt-4 max-w-prose font-body text-lg italic leading-relaxed text-cream">
            {children}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MosaicTile({
  image,
  alt,
  span,
  delay,
}: {
  image: string;
  alt: string;
  span: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={span}>
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-coal transition duration-500 hover:opacity-90">
        <Image
          src={`/images/${image}`}
          alt={alt}
          fill
          sizes="(min-width: 640px) 24vw, 48vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}
