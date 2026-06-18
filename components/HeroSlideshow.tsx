"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * HeroSlideshow — full-bleed background photos that crossfade one at a time.
 *
 * Restores the original full-bleed hero look, but instead of a single static
 * photo it cycles through a small set of shots. Only one is visible at a time;
 * the rest sit at opacity-0 underneath and fade in on a timer. The first image
 * is `priority` so the LCP shot loads immediately.
 *
 * Respects prefers-reduced-motion: if the user has it on, we hold the first
 * image and skip the rotation.
 */

const slides = [
  {
    src: "/images/anniversary-salmon.png",
    alt: "A refined plated salmon dish held in the chef's hand, emerging from darkness.",
  },
  {
    src: "/images/whole-lamb-coals.png",
    alt: "A whole lamb roasting low over a bed of glowing coals.",
  },
  {
    src: "/images/garden-party-spread.png",
    alt: "A generous garden-party spread laid out warm from the fire.",
  },
];

const INTERVAL_MS = 5000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
