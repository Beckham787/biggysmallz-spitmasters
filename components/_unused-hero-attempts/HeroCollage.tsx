import Image from "next/image";

/**
 * HeroCollage — the hero's photography, shown as a still collage rather than
 * a rotation: a joyful team shot, the drama of the coals, and a plated
 * fine-dining course, all visible at once. It sits beside the hero copy
 * instead of behind it, so neither the photos nor the headline has to fight
 * the other for legibility — no gradient veil needed.
 */

const IMAGES = {
  wide: {
    src: "/images/team/team-whole-lamb-spit-about-us.JPG",
    alt: "The Biggy Smallz team celebrating around a whole roasted lamb on the spit.",
  },
  fire: {
    src: "/images/wbho/wbho-lamb-spit.png",
    alt: "A whole lamb roasting on the spit, lit by the glow of the coals beneath it.",
  },
  plate: {
    src: "/images/anniv7/anniv7-salmon.png",
    alt: "Sesame-crusted salmon plated over a bright corn crudo, finished with herb aioli and dukkah.",
  },
} as const;

export default function HeroCollage() {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3 lg:h-full lg:grid-rows-[1.4fr_1fr] lg:gap-3 lg:p-3">
      <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm sm:aspect-[16/9] lg:aspect-auto">
        <Image
          src={IMAGES.wide.src}
          alt={IMAGES.wide.alt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-auto">
        <Image
          src={IMAGES.fire.src}
          alt={IMAGES.fire.alt}
          fill
          sizes="(min-width: 1024px) 29vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-auto">
        <Image
          src={IMAGES.plate.src}
          alt={IMAGES.plate.alt}
          fill
          sizes="(min-width: 1024px) 29vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
