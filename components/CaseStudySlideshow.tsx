"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * CaseStudySlideshow — a small set of photos (normally 3) that crossfade on a
 * timer. Used for the homepage spotlight, case-study listing cards, and the
 * case-study detail hero, so a real event only ever needs three curated shots
 * rather than a dumped photo grid.
 *
 * Respects prefers-reduced-motion: holds the first image and skips rotation.
 */
export default function CaseStudySlideshow({
  images,
  intervalMs = 4000,
  aspectClassName = "aspect-[4/5] sm:aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1024px) 58vw, 100vw",
}: {
  images: { image: string; alt: string }[];
  intervalMs?: number;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div
      className={`group relative overflow-hidden rounded-sm bg-coal ${aspectClassName}`}
    >
      {images.map((img, i) => (
        <Image
          key={img.image}
          src={`/images/${img.image}.png`}
          alt={img.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((img, i) => (
            <span
              key={img.image}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                i === active ? "bg-cream" : "bg-cream/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
