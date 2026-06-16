import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import BullMark from "@/components/BullMark";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "The man at the fire",
  description:
    "Martin “Biggy” Mhlongo taught himself to cook. The story behind Biggy Smallz Spitmasters — from spit-braais to plated four-course tables.",
  openGraph: {
    title: "The man at the fire · Biggy Smallz Spitmasters",
    description:
      "Martin “Biggy” Mhlongo taught himself to cook. The story behind the fire.",
    images: ["/images/biggy-plating-lamb.png"],
  },
};

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
              The man at the fire
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Long-form story */}
      <section className="glow-top bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal>
            <div className="mx-auto max-w-prose space-y-6 text-lg leading-relaxed text-cream/90">
              <p className="text-2xl font-light leading-snug text-cream">
                Martin Mhlongo — Biggy to everyone who knows him — taught himself
                to cook.
              </p>
              <p>
                There was no culinary school. There was a love of food, a love
                of people, and a feeling that the two belonged together. In 2017
                he started Biggy Smallz Spitmasters with that and not much else,
                and has been chasing flavour over open flame ever since.
              </p>
              <p>
                He came to it honestly. Martin works in the agricultural sector,
                in animal feed, in business with some of the country&rsquo;s
                leading feedlots, abattoirs and butchers. He knows meat — how
                it&rsquo;s graded, what good looks like, where the best of it
                comes from. So when he puts a lamb on the spit or a rack on the
                coals, it starts long before the fire is lit.
              </p>
              <p>
                What began as spit-braais grew. Today Biggy is as comfortable
                plating a delicate four-course dinner as he is turning a whole
                animal over coals for three hundred people. He has consulted in
                restaurants in Johannesburg, become part-owner of Megálo on 5th,
                cooked live on national television, fed five thousand people in
                Soweto over a Mandela Day week, and stood at the grill as the
                confirmed South African pitmaster at the Mozambique Barbecue
                Festival. His food borrows from South Africa, Spain and Asia, and
                answers to none of them.
              </p>
              <p>
                He cooks, in his own words, as an act of love — a way of sharing
                with others the little secrets simmering on the burners. He wants
                the people he cooks for to have peace of mind: to know their
                guests&rsquo; expectations won&rsquo;t just be met, they&rsquo;ll
                be exceeded. He lives by the idea that nothing is too big a
                challenge if your heart is vested in the right place.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The bull */}
      <section className="relative grain glow-center overflow-hidden border-y border-cream/10 bg-ink py-20 sm:py-28">
        <div className="section relative z-10">
          <Reveal>
            <div className="mx-auto max-w-prose text-center">
              <BullMark className="mx-auto mb-4 h-16 w-24 text-ember" />
              <p className="eyebrow mb-8 text-smoke">Nguni strength</p>
              <h2 className="mb-6 text-3xl text-cream sm:text-4xl">The bull</h2>
              <div className="space-y-5 text-lg leading-relaxed text-cream/90">
                <p>
                  There&rsquo;s a bull&rsquo;s skull in Biggy&rsquo;s home. He
                  loves it — its weight, its stillness, what it stands for.
                  It&rsquo;s why the longhorn rides on his chef&rsquo;s jacket,
                  over his heart. The animal gives everything. The fire does the
                  rest. It felt right to keep it here too.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Close.
          [CONFIRM] Dedication line to his mother, uGogo Lillian, if Martin
          wants it included. He has dedicated work to her publicly before. To
          add it, place an italic line — e.g. "For uGogo Lillian." — above this
          band, or pass it through as a new prop on CtaBand. */}
      <CtaBand
        heading="If that sounds like your kind of table, tell him about it."
        sub="A date and a few details is all Biggy needs to start the conversation."
      />
    </>
  );
}
