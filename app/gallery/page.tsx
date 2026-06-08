import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Plated fine dining, whole-animal spit-roasting, and the gatherings in between — the work of Biggy Smallz Spitmasters.",
  openGraph: {
    title: "Gallery · Biggy Smallz Spitmasters",
    description:
      "Plated fine dining, fire and feasts — the work of Biggy Smallz Spitmasters.",
    images: ["/images/festival-hanging-meat.png"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-charcoal px-0 pb-16 pt-32 sm:pt-40">
        <div className="section">
          <Reveal>
            <p className="eyebrow mb-4">Gallery</p>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] text-cream sm:text-6xl">
              From the fire to the plate
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-cream-dim">
              The table, the fire, the gathering, and the craft. Tap any image to
              view it larger.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal pb-24">
        <div className="section">
          <GalleryGrid />
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink py-20 text-center">
        <div className="section">
          <Reveal>
            <h2 className="text-3xl text-cream sm:text-4xl">
              Picture it at your table.
            </h2>
            <div className="mt-8">
              <Link href="/book" className="btn-ember text-base">
                Book a Date
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
