import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer — pared down 2026-08-23 per TK: "The footer has too many things,"
 * then given a subtle watermark background + a Nguni Strength re-pair
 * 2026-08-23:
 *
 * - The Biggy Smallz badge now sits as a large, faint watermark behind the
 *   whole footer (retinted with the same grayscale/sepia/hue-rotate recipe
 *   used to bring the Mozambique festival logo into the gold palette, then
 *   dropped to very low opacity so it reads as texture, not a second logo).
 * - "Flavoured by Nguni Strength" (TK: "that's his other business... we'll
 *   build a website for it if we get this one right") is now paired
 *   directly with the bull mark rather than floating in a caption line —
 *   the wording was "Powered by," changed to "Flavoured by" per TK.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-charcoal">
      {/* Watermark — the main badge, huge and faint, tinted to sit inside
          the palette rather than reading as a crisp second logo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      >
        <Image
          src="/logo.png"
          alt=""
          width={640}
          height={640}
          className="h-[150px] w-[150px] object-contain sm:h-[190px] sm:w-[190px]"
          style={{
            filter:
              "grayscale(1) sepia(0.55) saturate(2.2) hue-rotate(-8deg) brightness(0.9) contrast(0.95)",
          }}
        />
      </div>

      <div className="section relative z-10 pb-28 pt-12 md:pb-12">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
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

          {/* Contact — one compact line */}
          <p className="font-body italic text-cream-dim">
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <span className="mx-2 text-cream-dim/30">·</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.email}
            </a>
            <span className="mx-2 text-cream-dim/30">·</span>
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              {siteConfig.contact.instagramHandle}
            </a>
          </p>

          <Link href="/book" className="btn-ember shrink-0">
            Book a Service
          </Link>
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
