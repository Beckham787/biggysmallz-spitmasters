import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
  description:
    "Answers to the questions we get most about booking Biggy Smallz Spitmasters.",
};

// `text` is the same answer in plain words, for the FAQ structured data,
// wherever `a` carries a link. Keep the two in step.
const faqs: { q: string; a: React.ReactNode; text?: string }[] = [
  {
    q: "Which areas do you cater to?",
    text: "We\u2019re based in Mbombela (Nelspruit) and the Mpumalanga Lowveld, and we travel \u2014 across South Africa, and for the right event, into Mozambique too.",
    a: (
      <>
        We&rsquo;re based in Mbombela (Nelspruit) and the Mpumalanga Lowveld,
        and we travel — across South Africa, and for the right event, into
        Mozambique too.
      </>
    ),
  },
  {
    q: "Do you publish your prices?",
    text: "No \u2014 every event is quoted individually, based on guest count, menu and travel. Tell us about your event through Book a Service and we\u2019ll come back to you with a quote.",
    a: (
      <>
        No — every event is quoted individually, based on guest count, menu
        and travel. Tell us about your event through{" "}
        <Link href="/book" className="text-paper underline underline-offset-4 decoration-gold/40 transition-colors hover:text-paper">
          Book a Service
        </Link>{" "}
        and we&rsquo;ll come back to you with a quote.
      </>
    ),
  },
  {
    q: "What kind of events do you cater?",
    a: "Weddings, private dinners, birthdays and celebrations, corporate and function catering, lobola and family gatherings, and more.",
  },
  {
    q: "Is a deposit required to secure a date?",
    a: "Yes. A deposit secures your date on our calendar — the amount and payment details are confirmed when you book.",
  },
  {
    q: "How far in advance should I book?",
    a: "As soon as you have a date in mind, especially over weekends and wedding season, when our calendar fills fastest.",
  },
  {
    q: "Can I see a sample menu?",
    text: "There\u2019s no fixed menu \u2014 every plate is built around your event and guest count. Have a look through Our Work for examples of what we\u2019ve cooked before, then tell us what you have in mind.",
    a: (
      <>
        There&rsquo;s no fixed menu — every plate is built around your event
        and guest count. Have a look through{" "}
        <Link href="/work" className="text-paper underline underline-offset-4 decoration-gold/40 transition-colors hover:text-paper">
          Our Work
        </Link>{" "}
        for examples of what we&rsquo;ve cooked before, then tell us what
        you have in mind.
      </>
    ),
  },
  {
    q: "How do I get in touch?",
    a: "The fastest way is Book a Service, or message us directly on WhatsApp, email or Instagram — all linked in the footer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.text ?? (typeof item.a === "string" ? item.a : ""),
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-ink pb-16 pt-36 sm:pt-44">
        <div className="section max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-paper">
            FAQ
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
            Questions We Get Asked
          </h1>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="section max-w-2xl space-y-10">
          {faqs.map((item) => (
            <div key={item.q} className="border-t border-gold/15 pt-8">
              <h2 className="font-display text-lg text-cream">{item.q}</h2>
              <p className="mt-3 font-body leading-relaxed text-cream-dim">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
