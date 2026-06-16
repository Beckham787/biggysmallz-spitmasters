import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

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

      <CtaBand
        heading="Picture it at your table."
        sub="Tell Biggy the date and the kind of event — he'll take it from there."
      />
    </>
  );
}
