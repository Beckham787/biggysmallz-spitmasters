"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { gallerySections } from "@/lib/gallery";

type FlatImage = { slug: string; alt: string; sectionId: string };

export default function GalleryGrid() {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const tabs = useMemo(
    () => [
      { id: "all", title: "All" },
      ...gallerySections.map((s) => ({ id: s.id, title: s.title })),
    ],
    [],
  );

  // Flat, ordered list filtered by the active tab — drives the lightbox.
  const images: FlatImage[] = useMemo(() => {
    const flat = gallerySections.flatMap((s) =>
      s.images.map((img) => ({ ...img, sectionId: s.id })),
    );
    return active === "all" ? flat : flat.filter((i) => i.sectionId === active);
  }, [active]);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, next, prev]);

  const current = lightbox === null ? null : images[lightbox];

  return (
    <>
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter gallery"
        className="mb-10 flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={`rounded-sm px-4 py-2 font-display uppercase tracking-stamp text-sm transition-colors duration-300 ${
                selected
                  ? "bg-ember text-cream"
                  : "border border-cream/20 text-cream-dim hover:border-cream/50 hover:text-cream"
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={`${img.slug}-${active}`}
            onClick={() => setLightbox(i)}
            aria-label={`Open image: ${img.alt}`}
            className="group relative aspect-square overflow-hidden rounded-sm bg-coal"
          >
            <Image
              src={`/images/${img.slug}.png`}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 animate-fade"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-sm border border-cream/20 text-cream transition-colors hover:bg-cream/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-cream/20 text-cream transition-colors hover:bg-cream/10 sm:left-6"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-cream/20 text-cream transition-colors hover:bg-cream/10 sm:right-6"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <figure
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-[4/3] w-full">
              <Image
                src={`/images/${current.slug}.png`}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-cream-dim">
              {current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
