import Link from "next/link";
import { whatsappUrl } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

/**
 * CtaBand — the quiet closing band that ends a page. Fine-dining-entrance
 * register: Cinzel eyebrow, a heading in the sitewide serif voice, italic
 * EB Garamond sub-copy, one primary "Book a Service" action and a quiet
 * WhatsApp fallback. Keeps the conversion message consistent site-wide.
 */
export default function CtaBand({
  eyebrow = "Start the conversation",
  heading,
  sub,
}: {
  eyebrow?: string;
  heading: string;
  sub?: string;
}) {
  return (
    <section className="border-t border-cream/10 bg-ink py-20 sm:py-28">
      <div className="section text-center">
        <Reveal>
          {eyebrow && (
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              {eyebrow}
            </p>
          )}
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl uppercase tracking-[0.02em] text-cream sm:text-3xl">
            {heading}
          </h2>
          {sub && (
            <p className="mx-auto mt-5 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              {sub}
            </p>
          )}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/book" className="btn-ember text-base">
              Book a Service
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base"
            >
              Message on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
