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
    images: ["/images/biggy-plating-lamb.png"],
  },
};

const team = [
  {
    image: "tannie-juice-spit",
    alt: "A team member in Biggy Smallz kit working the spit for a guest at an outdoor event.",
  },
  {
    image: "wedding-rob-leah-plating-2",
    alt: "Biggy plating food at a wedding table, guests seated in the background.",
  },
  {
    image: "wedding-rob-leah-plating-3",
    alt: "Biggy plating a dish at a wedding, guests mingling behind him.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — strong fire image until portraits arrive */}
      <section className="relative grain flex min-h-[70svh] items-end overflow-hidden">
        <Image
          src="/images/biggy-plating-lamb.png"
          alt="Chef Biggy plating a lamb dish at the pass, in low light."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="photo-veil absolute inset-0" />
        <div className="section relative z-10 pb-16 pt-32">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream text-shadow-soft sm:text-6xl md:text-7xl">
              The fire we cook by
            </h1>
          </Reveal>
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
                  src="/images/biggy-founder-portrait.png"
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
