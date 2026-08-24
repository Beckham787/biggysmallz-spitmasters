import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer — pared down 2026-08-23 per TK: "The footer has too many things,"
 * given a subtle watermark background + a Nguni Strength re-pair the same
 * day. That watermark was briefly removed 2026-08-24 after TK flagged
 * "words covering the logo," then brought back the same day per TK's
 * follow-up: "I want the logo to be the background of the footer, I just
 * don't want it covered."
 *
 * The badge's own artwork (an arced "BIGGY SMALLZ" wordmark + a solid red
 * "SPITMASTERS" ribbon through the middle) is dense top-to-bottom, and the
 * real footer content is vertically centered too -- so a plain centered
 * watermark always lands its busiest parts (the ribbon especially) right
 * behind the identity row and contact line, on any layout narrow enough
 * to stack. Checked this across desktop/tablet/mobile widths with actual
 * screenshots, not just reasoning about the CSS -- confirmed the overlap
 * live at each breakpoint before landing on this version.
 *
 * Fix: still spans the full footer (inset-0, object-contain, scales with
 * however tall the mobile stack gets) and is still fully present -- not
 * cropped, not hidden -- but desaturated, blurred (blur(2px)) and dropped
 * to a much lower opacity (0.10) than the original 0.07. Blurring the
 * edges is what actually matters here: it stops the wordmark reading as
 * crisp letterforms competing with the real text, so it sits behind
 * everything as a soft tonal wash instead of a second, sharper logo. The
 * badge + Nguni Strength marks in the identity row are untouched and stay
 * fully legible at every width.
 *
 * - "Powered by Nguni Strength" (TK: "that's his other business... we'll
 *   build a website for it if we get this one right") is paired directly
 *   with the bull mark rather than floating in a caption line. Briefly
 *   "Flavoured by," changed back to "Powered by" per TK/Biggy feedback.
 *
 * 2026-08-24, Biggy's feedback pass:
 * - Identity badge was squeezing the wide rectangular logo into a plain
 *   1:1 box (explicit width/height with no object-fit), which stretched
 *   it — "the logo at the footer looks weird and squeezed." Fixed with a
 *   dedicated /images/footer-badge.png: the same crossed-utensils +
 *   "SPITMASTERS" ribbon crop used elsewhere, padded to a true square so
 *   the circle mask doesn't distort it.
 * - That first square-padded version still read as "cropped badly" —
 *   the crop had the ribbon's chevron tips touching the square's left/
 *   right edges with zero margin, so the rounded-full circle mask cut
 *   into them. Padding it enough to clear a circle just made the next
 *   problem: the artwork is a wide, flat ribbon (roughly 2:1), so fitting
 *   it inside a circle with real margin left most of the circle empty —
 *   at the actual 56px render size the badge read as a tiny illegible
 *   smudge. Tried a plain wide box next (a custom /images/footer-badge.png
 *   crop, no clip-shape) -- fixed the clipping but was still a bespoke
 *   asset with its own sizing quirks.
 * - Per TK: "see how the logo shows in the header, use that same logo in
 *   the footer" -- simplest fix is the one that stops relitigating crops
 *   altogether. Footer badge is now the same /logo.png file as Nav.tsx,
 *   at the same aspect ratio, object-contain, no clip-shape -- whatever
 *   reads correctly in the header reads the same way here.
 * - Layout was side-by-side (identity left, contact right) from lg up,
 *   with text-left to match. Per "all text to be centered," both rows now
 *   stay in a centered stack at every width instead of switching to a
 *   left-aligned row on desktop.
 * - Added Biggy's personal Instagram after the business one, per TK:
 *   "cell first then email address, then the instagram link then his
 *   private instagram link @Biggy013."
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-charcoal">
      {/* Watermark — the main badge, spanning the entire footer as a soft,
          blurred backdrop (not a discrete medallion, not crisp text), so
          it reads as ambient background rather than a second logo the
          foreground content lands on. See comment above for why blur +
          low opacity, not just low opacity alone. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
          style={{
            filter: "grayscale(1) brightness(1.5) contrast(0.6) blur(2px)",
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

        <div className="flex flex-col items-center gap-6 pt-10 text-center lg:gap-8 lg:pt-0">
          {/* Identity — the badge alone, then the bull mark paired with its
              own line, since Nguni Strength is a distinct second venture. */}
          <div className="flex shrink-0 items-center gap-4">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} badge, Est. ${siteConfig.established}`}
              width={200}
              height={148}
              className="h-14 w-auto shrink-0 object-contain sm:h-16"
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
                Powered by
                <br />
                Nguni Strength
              </span>
            </div>
          </div>

          {/* Contact — cell, email, business Instagram, then Biggy's
              personal Instagram, in that order per TK. Wraps onto its own
              lines on narrow phones instead of running off-screen; each
              item is its own flex child so a break can happen between any
              two of them, not just inside one. */}
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
            <span className="text-cream-dim/30">·</span>
            <a
              href={siteConfig.contact.privateInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.privateInstagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-gold/15 pt-6 text-center font-body text-xs text-smoke">
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
