"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * HeroSlideshow — full-bleed hero that alternates between a photo and the
 * brand mark: one strong shot, then the logo on a dark field, back and
 * forth. Only one slide is visible at a time; the rest sit at opacity-0
 * underneath and fade in on a timer. The first image is `priority` so the
 * LCP shot loads immediately.
 *
 * Respects prefers-reduced-motion: if the user has it on, we hold the first
 * slide and skip the rotation.
 */

const slides = [
  {
    kind: "photo" as const,
    src: "/images/home-hero.png",
    alt: "Biggy carving a whole roasted lamb straight off the spit at a festival.",
  },
  {
    kind: "logo" as const,
    src: "/logo.png",
    alt: "Biggy Smallz Spitmasters badge.",
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
      {slides.map((slide, i) =>
        slide.kind === "logo" ? (
          <div
            key={slide.src}
            className={`absolute inset-0 flex items-center justify-center bg-ink transition-opacity duration-1000 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-[45vh] w-[45vh] max-h-80 max-w-80">
              <Image src={slide.src} alt={slide.alt} fill sizes="45vh" className="object-contain" />
            </div>
          </div>
        ) : (
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
        ),
      )}
    </div>
  );
}
