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

/** The two shots flagged for the hero, by filename, in /images/team. */
const heroShots = [
  {
    image: "team/team-moyres-posed-about-us.png",
    alt: "The Biggy Smallz Spitmasters team lined up in the hall at Moyres Venue, tables laid behind them.",
  },
  {
    image: "team/team-whole-lamb-spit-about-us.JPG",
    alt: "The crew gathered around a whole lamb on the spit, tongs in hand.",
  },
];

/** Every shot of the team, crossfading. */
const team = [
  ...heroShots,
  {
    image: "team/team-moyres-candid.png",
    alt: "The team messing about between service in the hall at Moyres Venue.",
  },
  {
    image: "team/team-crew-backroom.JPG",
    alt: "Five of the crew posing together in the back kitchen, in blacks.",
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
    image: "team/team-luna-event.png",
    alt: "The team with a young guest and her family at a private catered event.",
  },
];

/**
 * A small set of shots from the community cooking the team has done — kept
 * deliberately unattributed: no event, date, organisation or place named.
 */
const outreach = [
  {
    image: "COVID-19/AEWU4728.JPG",
    alt: "The team serving hot food from the spit trailer as people queue alongside.",
  },
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
      {/* Hero — one representative photo, full-bleed */}
      <section className="relative grain flex min-h-[55svh] items-end overflow-hidden">
        <PhotoSlideshow
          images={heroShots}
          variant="fill"
          priority
          sizes="100vw"
          imageClassName="object-[center_35%]"
          showDots={false}
          intervalMs={5000}
        />
        <div className="photo-veil absolute inset-0" />
        <div className="section relative z-10 pb-14 pt-32">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream text-shadow-soft sm:text-6xl md:text-7xl">
              About Us
            </h1>
          </Reveal>
        </div>
      </section>

      {/* The company story */}
      <section className="glow-top bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <div className="mx-auto max-w-prose text-lg leading-relaxed text-cream/90">
              <p className="text-2xl font-light leading-snug text-cream">
                Biggy Smallz Spitmasters is a personal chef and catering
                company built on fire — from spit-braais for family and
                friends in 2017 to fine-dining tables for hundreds today.
                Based in the Mpumalanga Lowveld and catering across South
                Africa, the team blends whole-animal spit-roasting with
                plated, course-by-course dining, brought straight to wherever
                the table is.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The hands — every shot of the team, crossfading */}
      <section className="bg-charcoal pb-20 sm:pb-28">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-8">The hands</p>
          </Reveal>
          <Reveal>
            <PhotoSlideshow
              images={team}
              aspectClassName="aspect-[4/5] sm:aspect-[16/9]"
              sizes="(min-width: 640px) 90vw, 100vw"
              intervalMs={4200}
            />
          </Reveal>
        </div>
      </section>

      {/* The founder */}
      <section className="relative grain glow-center overflow-hidden border-y border-cream/10 bg-ink py-20 sm:py-28">
        <div className="section relative z-10">
          <Reveal>
            <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center">
              <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-sm sm:mx-0 sm:w-full">
                <Image
                  src="/images/Founder.JPG"
                  alt="Martin &ldquo;Biggy&rdquo; Mhlongo, founder of Biggy Smallz Spitmasters."
                  fill
                  sizes="(min-width: 640px) 14rem, 12rem"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="eyebrow mb-4 text-smoke">The founder</p>
                <h2 className="mb-6 text-3xl text-cream sm:text-4xl">
                  Martin &ldquo;Biggy&rdquo; Mhlongo
                </h2>
                <div className="space-y-5 text-lg leading-relaxed text-cream/90">
                  <p>
                    Martin &ldquo;Biggy&rdquo; Mhlongo is the personal chef
                    and head honcho behind it all — seen on Rate My Plate,
                    Come Dine With Me SA, Ultimate Braai Master and Afternoon
                    Express, and the confirmed South African pitmaster at the
                    Mozambique Barbecue Festival. He cooks the way he lives:
                    heart first, flavour non-negotiable, every plate personal.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More Than the Plate — community cooking, deliberately unattributed */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-3">More than the plate</p>
            <h2 className="mb-6 max-w-2xl text-3xl text-cream sm:text-4xl">
              The fire didn&rsquo;t stop.
            </h2>
            <div className="max-w-prose text-lg leading-relaxed text-cream/90">
              <p>
                During COVID, when so many tables sat empty, the fire
                didn&rsquo;t stop — it just pointed somewhere else. Biggy
                Smallz cooked and served hot meals to people who needed them,
                just food doing what food does best. It&rsquo;s the same heart
                behind every plate today, just aimed a little wider.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {outreach.map((shot, i) => (
              <Reveal key={shot.image} delay={(i % 4) * 100}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal">
                  <Image
                    src={`/images/${shot.image}`}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
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
