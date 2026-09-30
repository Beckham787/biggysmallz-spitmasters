"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Reveal — fades its children up gently when scrolled into view.
 *
 * Progressive-enhancement first: the server renders content fully visible, so a
 * no-JS visitor (or one whose JS is still loading) always sees the page. Only
 * once JS is present do we hide-then-fade. A pre-paint layout effect sets the
 * hidden state before the browser paints, so there is no flash of content.
 *
 * Content already in view at load is never hidden or animated (keeps LCP
 * honest); only below-the-fold content is revealed on scroll.
 *
 * Honours prefers-reduced-motion (stays visible, no transition).
 */

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type State = "static" | "hidden" | "shown";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // "static" = fully visible, no animation (SSR default + reduced motion).
  const [state, setState] = useState<State>("static");

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    // Already on screen at load (the hero, the first section): leave it
    // "static", fully visible from the server-rendered paint. Hiding it and
    // fading it back in made the browser report the largest contentful paint
    // only when the fade ended (2026-10 keep sweep: LCP render delay ~2 s on
    // the homepage). Only content below the fold gets the reveal.
    if (inView) return;

    // Below the fold: hide before the browser paints, so there is no flash.
    setState("hidden");

    // Below the fold: reveal when scrolled into view.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = Tag as any;
  const style =
    state === "static"
      ? undefined
      : {
          opacity: state === "shown" ? 1 : 0,
          transform: state === "shown" ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
          transitionDelay: `${delay}ms`,
        };

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}
