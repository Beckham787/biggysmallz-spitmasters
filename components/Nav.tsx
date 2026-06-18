"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "What We Do" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book a Service" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu on route change.
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

  // Let keyboard users dismiss the open mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/85 backdrop-blur-md border-b border-cream/10"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="section flex items-center justify-between py-4">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} badge`}
            width={52}
            height={52}
            priority
            className="h-12 w-12 rounded-full"
          />
          <span className="hidden font-display uppercase tracking-stamp text-sm text-cream sm:block">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            const isCta = link.href === "/book";
            return (
              <li key={link.href}>
                {isCta ? (
                  <Link href={link.href} className="btn-ember !px-5 !py-2.5">
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-display uppercase tracking-stamp text-sm transition-colors duration-300 hover:text-ember-bright ${
                      active ? "text-ember-bright" : "text-cream/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/20 text-cream md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-cream/10 md:hidden">
          <ul className="section flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-sm px-2 py-3 font-display uppercase tracking-stamp text-base transition-colors ${
                      active
                        ? "text-ember-bright"
                        : "text-cream/90 hover:text-ember-bright"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
