import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PhotoSlideshow from "@/components/PhotoSlideshow";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Biggy Smallz Spitmasters — a personal chef and catering company built on fire. From spit-braais in 2017 to fine-dining tables for hundreds today, based in the Mpumalanga Lowveld and catering across South Africa.",
  openGraph: {
    title: "About Us · Biggy Smallz Spitmasters",
    description:
      "A personal chef and catering company built on fire — from spit-braais to plated, course-by-course dining.",
    images: ["/images/wedding-rob-leah/wedding-rob-leah-plating.png"],
  },
};

/**
 * Every shot in public/images/team/, crossfading — TK's call (2026-08-23):
 * "you must add all of those pictures regardless of the uniform, that's the
 * only place where that uniform is allowed." So the retired bold-red-sleeve
 * uniform (team-whole-lamb-spit-about-us.JPG, BKXN2117.JPG) and the All
 * Gold-branded sponsor-event shots (QDTG5587.JPG, TFHJ0477.JPG) are IN here
 * deliberately, on THIS page only — still off-limits everywhere else on the
 * site. They're interleaved rather than grouped together, per TK: "Don't
 * put the old uniform after each other, mix it in."
 */
const team = [
  {
    image: "team/team-moyres-candid.png",
    alt: "The team messing about between service in the hall at Moyres Venue.",
  },
  {
    image: "team/team-crew-backroom.JPG",
    alt: "Five of the crew posing together in the back kitchen, in blacks.",
  },
  {
    image: "team/team-whole-lamb-spit-about-us.JPG",
    alt: "The full crew around a whole lamb on the spit, some in the earlier red-sleeve uniform.",
  },
  {
    image: "team/team-wedding-staff.JPG",
    alt: "Kitchen and front-of-house staff together outside a wedding venue.",
  },
  {
    image: "team/team-backyard-braai.JPG",
    alt: "Three of the crew working the grill at a backyard braai.",
  },
  {
    image: "team/BKXN2117.JPG",
    alt: "Two of the crew laughing while pounding pap together, in the earlier uniform.",
  },
  {
    image: "team/team-luna-event.png",
    alt: "The team with a young guest and her family at a private catered event.",
  },
  {
    image: "team/FCMP5695.JPG",
    alt: "Biggy in his black apron, branded with the Biggy Smallz Spitmasters patch.",
    objectPosition: "object-top",
  },
  {
    image: "team/QDTG5587.JPG",
    alt: "The crew prepping orders at an outdoor stall, in All Gold-branded aprons for a sponsor event.",
    objectPosition: "object-top",
  },
  {
    image: "team/JLXW1612.JPG",
    alt: "The crew in matching black shirts, laughing together between service.",
  },
  {
    image: "team/JUAY6960.JPG",
    alt: "The team goofing around in black shirts and patches after a shift.",
    objectPosition: "object-[center_15%]",
  },
  {
    image: "team/TFHJ0477.JPG",
    alt: "The crew grilling rolls together at the same outdoor sponsor event.",
  },
  {
    image: "team/MZCR6136.JPG",
    alt: "A crew member threading skewers onto the grill in a Biggy Smallz shirt.",
  },
  {
    image: "team/NELI7719.JPG",
    alt: "The crew celebrating together on the dance floor of a wedding venue.",
    objectPosition: "object-[center_10%]",
  },
];

/**
 * A small set of shots from the community cooking the team has done — kept
 * deliberately unattributed: no event, date, organisation or place named.
 * First shot is the lead photo for the full-bleed moment; the rest sit in
 * the filmstrip beneath it.
 */
const outreachLead = {
  image: "COVID-19/AEWU4728.JPG",
  alt: "The team serving hot food from the spit trailer as people queue alongside.",
};

const outreachStrip = [
  {
    image: "COVID-19/NZXJ9419.JPG",
    alt: "Children queuing outside as servers hand out cups of hot food and bread.",
  },
  {
    image: "COVID-19/CDAJ3898.JPG",
    alt: "Biggy stirring a large pot of stew over the heat, masked and gloved.",
  },
  {
    image: "COVID-19/FVWD7234.JPG",
    alt: "Biggy holding a packed hot meal, ready to hand out.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Entrance — quiet, dimmed, one still photo of the team. Same
          register as the homepage's walk-in hero: a single warm pool of
          light, eyes still adjusting, no shouting. ────────────────────── */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-ink text-center">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/team/team-moyres-posed-about-us.png"
            alt="The Biggy Smallz Spitmasters team lined up in the hall at Moyres Venue, tables laid behind them."
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] brightness-[0.32] saturate-[0.85]"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(38% 46% at 50% 42%, rgba(242,133,75,0.14) 0%, rgba(11,10,9,0) 68%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 50% 50%, rgba(11,10,9,0) 0%, rgba(11,10,9,0.55) 55%, rgba(11,10,9,0.97) 100%)",
            }}
          />
        </div>

        <div className="section relative z-10 max-w-xl">
          <Reveal>
            <h1 className="font-display text-4xl uppercase tracking-[0.04em] text-cream sm:text-5xl">
              About Us
            </h1>
            <div className="mx-auto mt-7 h-px w-11 bg-gold" />
            <p className="mx-auto mt-7 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              A personal chef and catering company built on fire — and the
              hands that make it happen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The company story — one quiet paragraph, same voice as the
          homepage's sub-copy. ──────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center font-body text-xl italic leading-relaxed text-cream-dim sm:text-2xl">
              At the heart of Biggy Smallz Spitmasters is a commitment to
              quality, flavour, and community. Whether he&rsquo;s catering
              for intimate gatherings, corporate events, or massive feasts,
              Chef Biggy ensures that every plate is packed with
              mouthwatering goodness. His spitbraai mastery has earned him
              a loyal following and a reputation as one of Mzansi&rsquo;s
              top fire-food specialists.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The hands — every shot of the team, crossfading. ────────────── */}
      <section className="bg-charcoal pb-20 sm:pb-28">
        <div className="section">
          <Reveal>
            <div className="text-center">
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                Behind the fire
              </p>
              <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-cream sm:text-3xl">
                The Hands
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <PhotoSlideshow
                images={team}
                aspectClassName="aspect-[4/5] sm:aspect-[3/2]"
                sizes="(min-width: 640px) 90vw, 100vw"
                intervalMs={2400}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The founder ──────────────────────────────────────────────────── */}
      <section className="border-y border-cream/10 bg-ink py-20 sm:py-28">
        <div className="section">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5" as="div">
              <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-sm bg-coal sm:mx-0 sm:w-full sm:max-w-xs">
                <Image
                  src="/images/Founder.JPG"
                  alt="Martin &ldquo;Biggy&rdquo; Mhlongo, founder of Biggy Smallz Spitmasters."
                  fill
                  sizes="(min-width: 640px) 20rem, 12rem"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" as="div" delay={120}>
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                Head Honcho
              </p>
              <h2 className="mt-3 text-3xl text-cream sm:text-4xl">
                Martin &ldquo;Biggy&rdquo; Mhlongo
              </h2>
              <div className="mt-5 max-w-md space-y-5 font-body text-lg italic leading-relaxed text-cream-dim">
                <p>
                  Martin &ldquo;Biggy&rdquo; Mhlongo is a celebrated South
                  African chef, TV personality, and the mastermind behind
                  Biggy Smallz Spitmasters, a premier spitbraai and
                  catering company renowned for its bold flavours and
                  top-tier hospitality. With a passion for fire-cooked
                  meats and authentic South African cuisine, Chef Biggy
                  has built a brand that brings people together over
                  exceptional food and unforgettable experiences.
                </p>
                <p>
                  Biggy&rsquo;s journey in the culinary world has been
                  nothing short of extraordinary. His talent and charisma
                  have landed him appearances on popular shows like Rate
                  My Plate, Come Dine With Me SA, Ultimate Braai Master,
                  and the confirmed South African pitmaster at the
                  Mozambique Barbecue Festival, where he showcased his
                  skills in open-flame cooking and traditional South
                  African braais.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── More Than the Plate — REDESIGN OPTION, pending TK's decision on
          whether to keep this section at all. Was a plain centered
          eyebrow+heading+paragraph over a uniform 2x2 photo grid; now a
          full-bleed dimmed lead photo (same vignette recipe as the page
          hero) with the copy overlaid directly on it, followed by a
          quieter three-photo filmstrip instead of a grid — more of a
          held moment than a gallery. Content and photos unchanged,
          still deliberately unattributed (no event/date/org/place
          named). ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-ink text-center">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={`/images/${outreachLead.image}`}
            alt={outreachLead.alt}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.34] saturate-[0.85]"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(38% 46% at 50% 42%, rgba(242,133,75,0.14) 0%, rgba(11,10,9,0) 68%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 50% 50%, rgba(11,10,9,0) 0%, rgba(11,10,9,0.55) 55%, rgba(11,10,9,0.97) 100%)",
            }}
          />
        </div>

        <div className="section relative z-10 max-w-xl py-20">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              More than the plate
            </p>
            <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-cream sm:text-3xl">
              The Fire Didn&rsquo;t Stop
            </h2>
            <div className="mx-auto mt-7 h-px w-11 bg-gold" />
            <p className="mx-auto mt-7 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              During COVID, when so many tables sat empty, the fire
              didn&rsquo;t stop — it just pointed somewhere else. Biggy
              Smallz cooked and served hot meals to people who needed
              them, just food doing what food does best. It&rsquo;s the
              same heart behind every plate today, just aimed a little
              wider.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-10 sm:py-14">
        <div className="section">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {outreachStrip.map((shot, i) => (
              <Reveal key={shot.image} delay={i * 100}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-coal">
                  <Image
                    src={`/images/${shot.image}`}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
