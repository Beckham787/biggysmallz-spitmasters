"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type SlideshowImage = { image: string; alt: string };

/**
 * PhotoSlideshow — a small set of photos that crossfade on a timer.
 *
 * Two shapes:
 *   • "box"  — sits in its own aspect-ratio box (case-study cards, in-page
 *     galleries), with dots marking position.
 *   • "fill" — absolutely fills the nearest positioned ancestor, for the
 *     full-bleed page heroes.
 *
 * Respects prefers-reduced-motion: holds the first image and skips rotation.
 */
export default function PhotoSlideshow({
  images,
  intervalMs = 4000,
  variant = "box",
  aspectClassName = "aspect-[4/5] sm:aspect-[4/3]",
  imageClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  showDots = true,
}: {
  images: SlideshowImage[];
  intervalMs?: number;
  variant?: "box" | "fill";
  aspectClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  showDots?: boolean;
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

  const isFill = variant === "fill";

  return (
    <div
      className={
        isFill
          ? "absolute inset-0"
          : `group relative overflow-hidden rounded-sm bg-coal ${aspectClassName}`
      }
    >
      {images.map((img, i) => (
        <Image
          key={img.image}
          src={`/images/${img.image}`}
          alt={img.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      ))}

      {showDots && images.length > 1 && (
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
