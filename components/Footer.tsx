import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer — pared down 2026-08-23 per TK: "The footer has too many things,"
 * given a subtle watermark background + a Nguni Strength re-pair the same
 * day. That watermark was briefly removed 2026-08-24 after TK flagged
 * "words covering the logo," then brought back 2026-08-24 (same day) per
 * TK's follow-up: "I want the logo to be the background of the footer, I
 * just don't want it covered." The earlier version was a small, roughly
 * badge-sized medallion pinned dead-center, so it visually collided with
 * the real foreground badge and identity text sitting right on top of it
 * at that same size and position. Now it spans the FULL footer (inset-0,
 * object-contain, scales with however tall the mobile content stack gets)
 * at a much lower opacity than before, so it reads as one continuous
 * background field behind everything rather than a second, same-sized
 * logo the text happens to land on.
 *
 * - "Flavoured by Nguni Strength" (TK: "that's his other business... we'll
 *   build a website for it if we get this one right") is paired directly
 *   with the bull mark rather than floating in a caption line — the
 *   wording was "Powered by," changed to "Flavoured by" per TK.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-charcoal">
      {/* Watermark — the main badge, spanning the entire footer as a faint
          backdrop (not a discrete medallion), tinted to sit inside the
          palette. Opacity kept low enough that the foreground text and
          logos below always stay clean and legible on top of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]"
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
          style={{
            filter:
              "grayscale(1) sepia(0.55) saturate(2.2) hue-rotate(-8deg) brightness(0.9) contrast(0.95)",
          }}
        />
      </div>

      <div className="section relative z-10 pb-28 pt-12 md:pb-12">
        {/* "Book a Service" — pulled out of the identity/contact row and into
            its own small corner link (2026-08-23, per TK: it was crowding
            the logo). Smaller than the old full-size btn-ember, and
            positioned so it can never sit on top of the badge or Nguni
            Strength mark below it. */}
        <Link
          href="/book"
          className="btn-ember absolute right-6 top-6 z-20 !px-4 !py-2 text-xs sm:right-8 sm:top-8"
        >
          Book a Service
        </Link>

        <div className="flex flex-col items-center gap-6 pt-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-0 lg:text-left">
          {/* Identity — the badge alone, then the bull mark paired with its
              own line, since Nguni Strength is a distinct second venture. */}
          <div className="flex shrink-0 items-center gap-4">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} badge, Est. ${siteConfig.established}`}
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 rounded-full"
            />
            <div className="flex items-center gap-2.5 border-l border-gold/15 pl-4">
              <Image
                src="/logos/nguni-strength.png"
                alt="Nguni Strength"
                width={44}
                height={44}
                className="h-9 w-auto shrink-0"
              />
              <span className="font-display text-[0.58rem] uppercase leading-tight tracking-[0.18em] text-smoke">
                Flavoured by
                <br />
                Nguni Strength
              </span>
            </div>
          </div>

          {/* Contact — wraps onto its own lines on narrow phones instead
              of running off-screen; each item is its own flex child so a
              break can happen between any two of them, not just inside one. */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 font-body italic text-cream-dim">
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <span className="text-cream-dim/30">·</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="break-all transition-colors hover:text-gold sm:break-normal"
            >
              {siteConfig.contact.email}
            </a>
            <span className="text-cream-dim/30">·</span>
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-gold/15 pt-6 text-center font-body text-xs text-smoke sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {siteConfig.established}–{new Date().getFullYear()}{" "}
            {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display text-[0.6rem] uppercase tracking-[0.2em]">
            {siteConfig.serviceAreaShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
