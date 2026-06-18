import Link from "next/link";
import { whatsappUrl } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

/**
 * CtaBand — the warm closing band that ends every page. A fire-lit ember pool,
 * one primary "Book a Date" action, and a quiet WhatsApp fallback so booking is
 * always one obvious step. Keeps the conversion message consistent site-wide.
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
    <section className="relative grain glow-ember overflow-hidden border-t border-cream/10 bg-ink py-20 sm:py-28">
      <div className="section relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl text-cream sm:text-4xl">
            {heading}
          </h2>
          {sub && (
            <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-cream-dim">
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
