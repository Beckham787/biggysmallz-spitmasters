# Refinement changelog

Branch `feat/website-refinement-2026-10` (from `feat/keep-2026-10`). 11 October 2026.
Preview only; nothing merged to `master`, nothing in production.

## New files

| File | What it is |
|---|---|
| `components/RecognitionFeature.tsx` | The "On the record" section under the hero. |
| `components/YearRail.tsx` | Five ticks, 2022–2026. Used in the feature, `/work`, `/mozambique`. |
| `components/ServiceTiles.tsx` | The six services as photographs with labels. Used on `/` and `/work`. |
| `lib/recognition.ts` | TV/radio credits with their labels and evidence; the South Africa BBQ Festival founder flag (off). |
| `lib/appearances.ts` | Appearances list; upcoming/previous computed from the date. |
| `docs/*.md` | This changelog, the audit, the verification list. |

## Changed files

| File | Change |
|---|---|
| `app/page.tsx` | New order: hero → On the record → the range → recent event → Biggy → booking band. Hero gains Book a Service + Chat to Biggy; headline larger; `revalidate = 3600`. "Catch us live", "On air", "As seen on / Catch me on" removed as separate blocks (content moved into the feature). Event line is a plain pull line, no quote marks. New short Biggy intro (Founder.JPG; the About page's own COVID line, still unattributed). |
| `app/work/page.tsx` | Mozambique milestone feature with year rail; service tiles; featured event large + three cards (type, photo, name, place/date, one line, link); booking band; header aligned. |
| `app/work/[slug]/page.tsx` | Menu captions split into course label + dish; the pull line is hidden where the story already says it; booking band; 44 px back/Instagram links. |
| `app/mozambique/page.tsx` | 2026 content in past tense; ticket button replaced with a note + Instagram link; year rail replaces year chips; figure captions on chapters II–III; "five years running"/"five Octobers" lines that implied 2026 attendance reworded; closing text updated; booking band. Photos, Portuguese caption, archive untouched. |
| `components/BookForm.tsx` | Inline field errors (`aria-invalid`, `aria-describedby`, focus on first error); email and phone sanity checks; date minimum = today; friendly failure message with WhatsApp + phone; focus moves to the thank-you. Backend call, fields, honeypot and time trap unchanged. |
| `components/Nav.tsx` | "Book a Service" button from `md` up (hidden on `/book`); Escape returns focus to Menu; 44 px Menu target. |
| `components/FloatingCta.tsx` | On `/`, waits until the hero scrolls away; wrapped in a labelled landmark. |
| `components/Footer.tsx`, `components/StudioMark.tsx` | 44 px targets; 12 px minimum text. |
| `components/CtaBand.tsx` | Eyebrow size only (it was unused; now on `/`, `/work`, `/mozambique`, event stories). |
| `components/LocalBusinessSchema.tsx` | Removed `priceRange: "$$$"`. |
| `app/layout.tsx` | `lang="en-ZA"`. |
| `app/globals.css` | Ghost-button outline `cream/25` → `cream/45`. |
| `app/about`, `app/book`, `app/faq`, `app/privacy`, `app/terms` | Eyebrow text 9.9 px → 12 px; `/book` contact links get 44 px targets. No copy changes. |

## Not changed (on purpose)

Hero photo and headline, palette, fonts, logo, routes and redirects, case-study copy and
photographs, the Mozambique chapters, the About page copy, `lib/site-config.ts`, the
sitemap and robots files, the `/api/book` route.

## Verification

See section 6 of `website-refinement-audit.md`. Open items: `content-verification-needed.md`.
