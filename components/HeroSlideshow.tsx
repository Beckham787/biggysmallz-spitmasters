import Image from "next/image";

/**
 * HeroSlideshow — full-bleed hero photo. Named for the slideshow it used to
 * be; kept as its own component so a rotation can come back easily if more
 * shots get added later.
 */

const HERO_IMAGE = {
  src: "/images/home-hero.png",
  alt: "Biggy carving a whole roasted lamb straight off the spit at a festival.",
};

export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
