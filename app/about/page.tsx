import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The fire we cook by",
  description:
    "Biggy Smallz Spitmasters — founded 2017, from spit-braais to plated four-course tables. The story of the operation, the team, and the founder behind it.",
  openGraph: {
    title: "The fire we cook by · Biggy Smallz Spitmasters",
    description:
      "Founded 2017, from spit-braais to plated four-course tables. The story of the operation.",
    images: ["/images/wedding-rob-leah-plating.png"],
  },
};

const team = [
  {
    image: "team-moyres-posed",
    alt: "The Biggy Smallz Spitmasters team at Moyres Venue, in kitchen and front-of-house uniform.",
  },
  {
    image: "team-laone-30th",
    alt: "The team celebrating with a client at her milestone 30th birthday celebration.",
  },
  {
    image: "team-luna-event",
    alt: "The team with a young guest and her family at a private catered event.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — headline lit from below by the coal-bed glow, paired with a
          staggered triptych that shows the breadth of the work: fire, fine
          dining, and a wedding. */}
      <section className="relative grain coal-bed overflow-hidden bg-ink">
        <div className="section relative z-10 pb-16 pt-36 sm:pb-24 sm:pt-44">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-4">About</p>
              <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream sm:text-6xl md:text-7xl">
                The <span className="seared">fire</span> we cook by
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-dim sm:text-xl">
                Founded 2017. From spit-braais with no culinary school behind
                them, to plated dinners for hundreds — built one fire, one
                event, one standard at a time.
              </p>
            </Reveal>

            <Reveal delay={150} className="lg:justify-self-end">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    src: "mozambique-lamb-spit",
                    alt: "A whole lamb on a cross-spit over open coals at a barbecue festival.",
                    shift: "translate-y-6 sm:translate-y-8",
                  },
                  {
                    src: "anniv7-ribeye",
                    alt: "A plated reverse-seared rib eye course from a private fine-dining dinner.",
                    shift: "-translate-y-3 sm:-translate-y-4",
                  },
                  {
                    src: "wedding-rob-leah-plating",
                    alt: "Biggy and Chef Sikolethu plating together at a wedding.",
                    shift: "translate-y-6 sm:translate-y-8",
                  },
                ].map((shot) => (
                  <div
                    key={shot.src}
                    className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-coal ${shot.shift}`}
                  >
                    <Image
                      src={`/images/${shot.src}.png`}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 15vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Long-form story — the company's, not just the founder's */}
      <section className="glow-top bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <div className="mx-auto max-w-prose space-y-6 text-lg leading-relaxed text-cream/90">
              <p className="text-2xl font-light leading-snug text-cream">
                Biggy Smallz Spitmasters started in 2017 with a spit, a fire,
                and no culinary school between them — just food, people, and
                the belief that the two belong together.
              </p>
              <p>
                Before a single flame was lit commercially, Martin
                &ldquo;Biggy&rdquo; Mhlongo had already spent years in
                agriculture, in animal feed — learning how meat is graded,
                what good looks like, where the best of it comes from. The
                operation has known meat properly since before the fire was
                ever lit.
              </p>
              <p>
                What began as spit-braais for family and friends grew into
                something else entirely: four-course plated dinners,
                weddings, and events for hundreds, without ever losing the
                fire at the centre of it.
              </p>
              <p>
                The operation has consulted in restaurants across
                Johannesburg, holds part-ownership of Megálo on 5th, has
                cooked live on national television, fed five thousand people
                in Soweto over a Mandela Day week, and stood at the coals as
                the confirmed South African pitmaster at the Mozambique
                Barbecue Festival. The food borrows from South Africa, Spain
                and Asia, and answers to none of them.
              </p>
              <p>
                Professional chefs lead the fine-dining dinners and weddings.
                The wider team — trained in Biggy&rsquo;s own methods, not
                all professional chefs, family among them — handles every
                other event. One standard, cooked by many hands.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team at work */}
      <section className="bg-charcoal pb-20 sm:pb-28">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-3">The team</p>
            <h2 className="mb-10 max-w-2xl text-3xl text-cream sm:text-4xl">
              Many hands, one standard.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {team.map((shot, i) => (
              <Reveal key={shot.image} delay={i * 120}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal">
                  <Image
                    src={`/images/${shot.image}.png`}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The founder */}
      <section className="relative grain glow-center overflow-hidden border-y border-cream/10 bg-ink py-20 sm:py-28">
        <div className="section relative z-10">
          <Reveal>
            <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center">
              <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-sm sm:mx-0 sm:w-full">
                <Image
                  src="/images/biggy-founder-rooftop.png"
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
                    He cooks, in his own words, as an act of love — a way of
                    sharing with others the little secrets simmering on the
                    burners. He wants the people he cooks for to have peace
                    of mind: to know their guests&rsquo; expectations
                    won&rsquo;t just be met, they&rsquo;ll be exceeded. He
                    lives by the idea that nothing is too big a challenge if
                    your heart is vested in the right place.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
