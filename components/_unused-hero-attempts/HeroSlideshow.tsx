"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * HeroSlideshow — full-bleed hero photography that slowly crossfades between
 * three shots chosen to say who Biggy is in one breath: whole-fire spectacle,
 * plated fine dining, and the personal-chef moment of service itself. That's
 * the brand's whole pitch — fire and fine dining, not one or the other — so
 * the hero rotates instead of picking a single note to hold.
 *
 * Progressive-enhancement first: the first frame renders (and stays priority)
 * on the server, so a no-JS visitor always sees a complete hero. Rotation is
 * client-only, and skipped entirely for prefers-reduced-motion.
 */

const HERO_IMAGES = [
  {
    src: "/images/mozambique/mozambique-lamb-spit.png",
    alt: "Biggy standing between whole lambs roasting on open spits at the Mozambique Barbecue Festival.",
  },
  {
    src: "/images/anniv7/anniv7-ribeye.png",
    alt: "A reverse-seared rib eye course, plated with fondant potato, broccolini and a red wine jus.",
  },
  {
    src: "/images/earth/earth-chef-serving.png",
    alt: "A Biggy Smallz chef in uniform personally serving a plate to a guest at a corporate event.",
  },
] as const;

const INTERVAL_MS = 6000;
const FADE_MS = 1400;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || HERO_IMAGES.length < 2) return;

    setRotating(true);
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_IMAGES.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover"
          style={{
            opacity: rotating ? (i === index ? 1 : 0) : i === 0 ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
