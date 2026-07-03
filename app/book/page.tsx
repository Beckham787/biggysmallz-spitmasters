import type { Metadata } from "next";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import BookForm from "@/components/BookForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Tell Biggy the date and the kind of event, and how to reach you. He'll take it from there — personally, by phone or email. No deposit, no commitment.",
  openGraph: {
    title: "Book a Service · Biggy Smallz Spitmasters",
    description:
      "Tell Biggy the date and the kind of event. The start of a conversation.",
    images: ["/images/wbho-meats-spit.png"],
  },
};

export default function BookPage() {
  return (
    <section className="glow-top bg-charcoal pb-24 pt-32 sm:pt-40">
      <div className="section">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">Book a Service</p>
            <h1 className="text-balance text-4xl font-bold leading-[1] text-cream sm:text-5xl">
              The start of a conversation
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-cream-dim">
              Tell Biggy the date and the kind of event, and how to reach you.
              He&rsquo;ll take it from there — personally, by phone or email. No
              deposit, no commitment yet. Just the start of a conversation.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <BookForm />
            </div>
          </Reveal>

          {/* Direct contact for those who'd rather reach out themselves */}
          <Reveal delay={160}>
            <div className="mt-16 border-t border-cream/10 pt-10">
              <h2 className="eyebrow mb-5">Rather reach out yourself?</h2>
              <ul className="space-y-3 text-lg text-cream-dim">
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="transition-colors hover:text-cream"
                  >
                    Call or text {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-cream"
                  >
                    Message on WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-cream"
                  >
                    Email {siteConfig.contact.email}
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
