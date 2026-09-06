import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
  description:
    "Terms of use for the Biggy Smallz Spitmasters website.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "About these terms",
    body: (
      <>
        These terms cover using this website. They&rsquo;re separate from
        the commercial terms of any booking — the menu, guest count, price,
        deposit and cancellation arrangements for your event are agreed
        directly with Biggy Smallz Spitmasters when a booking is confirmed,
        not set out here.
      </>
    ),
  },
  {
    heading: "Using this site",
    body: (
      <>
        The photos, copy and other content on this site belong to Biggy
        Smallz Spitmasters unless credited otherwise, and shouldn&rsquo;t be
        reproduced without permission.
      </>
    ),
  },
  {
    heading: "No guarantee of availability",
    body: (
      <>
        Dates, services and details described on the site are subject to
        change and confirmation. Nothing here is a binding quote until
        it&rsquo;s confirmed directly with us for your event.
      </>
    ),
  },
  {
    heading: "External links",
    body: (
      <>
        Links to Instagram, RISE fm and similar third parties are provided
        for convenience. We aren&rsquo;t responsible for their content.
      </>
    ),
  },
  {
    heading: "Liability",
    body: (
      <>
        This site is provided as-is. To the extent the law allows, Biggy
        Smallz Spitmasters isn&rsquo;t liable for indirect loss arising from
        your use of it.
      </>
    ),
  },
  {
    heading: "Governing law",
    body: <>These terms are governed by the laws of South Africa.</>,
  },
  {
    heading: "Changes",
    body: (
      <>
        We may update these terms from time to time. Continuing to use the
        site means you accept the current version — see our{" "}
        <Link href="/privacy" className="text-gold underline underline-offset-4 decoration-gold/40 transition-colors hover:text-ember-bright">
          Privacy Policy
        </Link>{" "}
        for how we handle your details.
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about these terms — reach us at{" "}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-gold underline underline-offset-4 decoration-gold/40 transition-colors hover:text-ember-bright"
        >
          {siteConfig.contact.email}
        </a>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-36 sm:pt-44">
        <div className="section max-w-2xl">
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-ember-bright">
            Legal
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-cream sm:text-4xl">
            Terms of Use
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
