import Image from "next/image";

/**
 * HeroPhoto — the "walking into a fine-dining room" entrance. The photo is
 * dimmed heavily (eyes still adjusting) with one warm pool of light held at
 * the center, and a strong vignette to near-black at the edges/bottom so the
 * hero copy sits in the dark, not on top of a bright picture.
 */

const IMAGE = {
  src: "/images/home-hero.png",
  alt: "Biggy carving a whole roasted lamb straight off the spit at a festival, dimmed to a single warm point of light.",
};

export default function HeroPhoto() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={IMAGE.src}
        alt={IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.32] saturate-[0.85]"
      />
      {/* Warm pool of light at center */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(38% 46% at 50% 46%, rgba(242,133,75,0.16) 0%, rgba(11,10,9,0) 68%)",
        }}
      />
      {/* Vignette to near-black at edges and bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 50% 50%, rgba(11,10,9,0) 0%, rgba(11,10,9,0.55) 55%, rgba(11,10,9,0.97) 100%)",
        }}
      />
    </div>
  );
}
