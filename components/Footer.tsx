import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="relative grain overflow-hidden border-t border-cream/10 bg-charcoal">
      <div className="section relative z-10 py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Identity — both marks stacked, one above the other */}
          <div className="flex w-fit flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} badge`}
                width={72}
                height={72}
                className="h-16 w-16 shrink-0 rounded-full"
              />
              <p className="font-display uppercase tracking-stamp text-[10px] text-cream-dim">
                Est. {siteConfig.established}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Image
                src="/logos/nguni-strength.png"
                alt="Nguni Strength"
                width={72}
                height={72}
                className="h-16 w-auto"
              />
              <p className="font-display uppercase tracking-stamp text-[10px] text-gold/80">
                Powered by Nguni Strength
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h2 className="eyebrow">Get in touch</h2>
            <ul className="space-y-2 text-cream-dim">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="transition-colors hover:text-cream"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  Instagram {siteConfig.contact.instagramHandle}
                </a>
              </li>
            </ul>
            <p className="max-w-xs text-sm text-smoke">
              {siteConfig.serviceArea}
            </p>
          </div>

          {/* Action */}
          <div className="space-y-4 md:text-right">
            <h2 className="eyebrow md:text-right">Start the conversation</h2>
            <p className="text-cream-dim">
              Tell {siteConfig.owner.firstName} what you&rsquo;re planning, and
              he&rsquo;ll cook it.
            </p>
            <Link href="/book" className="btn-ember">
              Book a Service
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.established}–{new Date().getFullYear()}{" "}
            {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display uppercase tracking-stamp">
            {siteConfig.serviceAreaShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
