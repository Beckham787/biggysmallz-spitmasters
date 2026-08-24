import type { Metadata } from "next";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import BookForm from "@/components/BookForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Service",
  alternates: { canonical: "/book" },
  description:
    "Tell Biggy the date and the kind of event, and how to reach you. He'll take it from there — personally, by phone, WhatsApp or email. No deposit, no commitment.",
  openGraph: {
    title: "Book a Service · Biggy Smallz Spitmasters",
    description:
      "Tell Biggy the date and the kind of event. The start of a conversation.",
    images: ["/images/wbho/wbho-lamb-spit.png"],
  },
};

/**
 * app/book/page.tsx — redesigned 2026-08-23 into the fine-dining-entrance
 * register (was still on the old .eyebrow/glow-top system). The "no fixed
 * menu, no prices" line moved here from /work per TK's instruction.
 *
 * TK asked whether the form sends an email or a WhatsApp — it's email (POST
 * /api/book, routed through Web3Forms/Resend to Biggy's inbox, see that
 * route's comments). Her answer was "use that form and whatsapp" — so both
 * paths stay live: the form as the primary route, WhatsApp promoted to a
 * real button of its own (not just a link in the list below) for anyone who
 * would rather message directly.
 */
export default function BookPage() {
  return (
    <section className="bg-charcoal pb-24 pt-32 sm:pt-40">
      <div className="section">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
              Book a Service
            </p>
            <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
              The Start of a Conversation
            </h1>
            <p className="mt-6 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
              There&rsquo;s a menu to work from — just nothing rigid about
              it. Tell Biggy the date and the kind of event, and how to
              reach you, and he&rsquo;ll shape the food from there.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#book-form" className="btn-ember text-base">
                Fill in the Form
              </a>
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

          <Reveal delay={160}>
            <div id="book-form" className="mt-16 scroll-mt-28">
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                Or, tell him here
              </p>
              <div className="mt-6">
                <BookForm />
              </div>
            </div>
          </Reveal>

          {/* Direct contact for those who'd rather reach out themselves */}
          <Reveal delay={200}>
            <div className="mt-16 border-t border-gold/20 pt-10">
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
                Rather reach out yourself?
              </p>
              <ul className="mt-5 space-y-3 font-body text-lg italic text-cream-dim">
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="transition-colors hover:text-gold"
                  >
                    Call or text {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Message on WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-gold"
                  >
                    Email {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Instagram {siteConfig.contact.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
