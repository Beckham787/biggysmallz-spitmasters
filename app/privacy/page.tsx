import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description:
    "What Biggy Smallz Spitmasters collects when you get in touch about a booking, and what we do with it.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What we collect",
    body: (
      <>
        When you send a booking enquiry through Book a Service, or message us
        directly by email, WhatsApp or Instagram, we receive whatever you
        share with us — typically your name, phone number, email address,
        event date, event type, and any message you add. We don&rsquo;t ask
        for, and this website never collects, any card or banking details —
        deposits and payments for a booking are always arranged directly with
        you, not through the site.
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <>
        Enquiry details are used to reply to you, plan your event, and
        deliver it. With your permission, we may also follow up about future
        events. We don&rsquo;t sell, rent or share your details with anyone
        outside of running your booking.
      </>
    ),
  },
  {
    heading: "Where it goes",
    body: (
      <>
        Enquiry messages are delivered straight to Biggy&rsquo;s inbox
        through our form provider. The website itself is hosted on Vercel.
        We don&rsquo;t keep a public database of enquiries, and this site
        doesn&rsquo;t currently run any tracking cookies or analytics.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        Under South Africa&rsquo;s Protection of Personal Information Act
        (POPIA), you can ask what we hold about you, and ask us to correct or
        delete it, any time — just email us at {siteConfig.contact.email}.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this page from time to time as the site or the way we
        take bookings changes. The version here is always the current one.
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about this policy or your details — reach us at{" "}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-gold underline underline-offset-4 decoration-gold/40 transition-colors hover:text-ember-bright"
        >
          {siteConfig.contact.email}
        </a>{" "}
        or {siteConfig.contact.phoneDisplay}.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-36 sm:pt-44">
        <div className="section max-w-2xl">
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
            Legal
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-5 font-body italic text-cream-dim">
            Last updated 6 September 2026.
          </p>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="section max-w-2xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold">
                {s.heading}
              </h2>
              <p className="mt-3 font-body leading-relaxed text-cream-dim">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
