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

    // Hide before the browser paints — no flash of visible content.
    setState("hidden");

    if (inView) {
      // Already on screen: reveal on the next frame for a gentle entrance.
      const id = requestAnimationFrame(() => setState("shown"));
      return () => cancelAnimationFrame(id);
    }

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
