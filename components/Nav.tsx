"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/work", label: "Our Work" },
  { href: "/book", label: "Book a Service" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Subtle background once the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss on Escape or a click outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/85 backdrop-blur-md border-b border-cream/10"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="section flex items-center justify-between gap-4 py-5">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="max-w-[9.5rem] font-display text-xs uppercase leading-tight tracking-[0.1em] text-cream sm:max-w-none sm:text-sm sm:leading-normal sm:tracking-[0.14em]"
        >
          {siteConfig.name}
        </Link>

        {/* Menu trigger — a slender small-caps label with a hairline that
            draws in on hover/open, and three thin rules instead of a boxed
            button. Quieter, in keeping with the fine-dining register. */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            className="group flex shrink-0 items-center gap-3 py-2 text-cream transition-colors duration-300 hover:text-gold"
          >
            <span className="font-display text-xs uppercase tracking-[0.24em]">
              Menu
            </span>
            <span className="flex w-5 flex-col items-end gap-[5px]">
              <span
                className={`h-px bg-current transition-all duration-300 ${
                  open ? "w-5 -translate-y-[3px] rotate-45" : "w-5"
                }`}
              />
              <span
                className={`h-px bg-current transition-all duration-300 ${
                  open ? "w-5 translate-y-[3px] -rotate-45" : "w-3.5"
                }`}
              />
            </span>
            <span
              className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform duration-300 ${
                open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </button>

          {open && (
            <div
              id="nav-menu"
              className="absolute right-0 top-full mt-4 w-52 border-t border-gold bg-charcoal py-3 shadow-2xl shadow-black/60"
            >
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-5 py-3 font-display text-sm uppercase tracking-[0.12em] transition-colors ${
                      active ? "text-gold" : "text-cream/90 hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
