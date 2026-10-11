# Website refinement audit — Biggy Smallz Spitmasters

Audit date: 11 October 2026. Live site audited: https://biggysmallzspitmasters.co.za/
(production, branch `master`). Work branch: `feat/website-refinement-2026-10`.
This is a refinement, not a redesign: the hero, palette, type, logo, routes and
every event story are kept.

## 1. What the site is

| | |
|---|---|
| Stack | Next.js 14 (App Router), TypeScript, Tailwind, self-hosted fonts. No new dependency was added. |
| Routes | `/`, `/about`, `/work`, `/work/[slug]` (4 stories), `/mozambique`, `/book`, `/faq`, `/privacy`, `/terms`, `/api/book`, sitemap, robots. Two legacy `/work/...` URLs 301 to the current stories (kept). |
| Identity | Locked Stage 6 identity: Jacket Black `#161517`, Spitmasters Red `#952926` (a fill, never text on dark), Bone `#F4EFE6`, White. Oswald (loud) + Source Serif 4 (quiet). Red is reserved for calls to action. |
| Data | `lib/site-config.ts` (business facts, services, logos), `lib/case-studies.ts` (stories). Added: `lib/recognition.ts`, `lib/appearances.ts`. |
| Booking | `components/BookForm.tsx` posts straight from the browser to Web3Forms (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`), with a honeypot and a 3-second time trap. `app/api/book` is kept but unused by the form. |
| Branch base | The work branch starts from `feat/keep-2026-10`, which is 4 commits ahead of live `master` (WhatsApp button name fix, honeypot, time trap, reveal fix). Those ride along in the preview. |

## 2. Baseline (live site, before)

Captured at 320, 375, 390, 430, 768, 1024 and 1440 px on 7 routes (49 full-page
screenshots): no horizontal overflow, no broken images, no console errors,
no failed requests. The site is technically sound; the problems are
communication and freshness, not breakage.

Screenshots: `Clients/Biggy Smallz/jobs/2026-10-website-refinement/screenshots/before/`.

## 3. Preserve

- The hero photograph, "Get in my belly", the badge, the dimmed-room treatment.
- The palette and type; the "red is for CTAs" rule.
- All four event stories, their photographs, captions and the "no private client names" rule.
- The `/mozambique` page narrative, the verbatim Portuguese announcement caption, the six-photo archive.
- The booking form's backend, honeypot and time trap.
- The warm, direct voice ("Yours in flavour").

## 4. What needed to improve (findings)

| # | Finding | Evidence |
|---|---|---|
| 1 | **Accolades buried.** The TV logos sat in the last section, 64 px tall with 12 px labels, and nothing said what each appearance was. The Mozambique milestone was a single poster card. | `before/home-1440.jpg` |
| 2 | **Stale event content.** "Catch us live" advertised 3 October 2026 as upcoming; `/mozambique` had "Get your ticket", "back on the bill for the 2026 edition" and "Follow along for this year's lineup"; `/work` said "Confirmed on the 2026 lineup". Both 2026 festivals (3 and 10 October) are past. | text scan of all pages |
| 3 | **Enquiry hard to find.** The hero had no button; the desktop header had only a menu icon; case-study pages and `/mozambique` ended with no booking prompt (the `CtaBand` component existed but was used nowhere). | source + screenshots |
| 4 | **Editorial lines styled as testimonials.** The event "quote" is Biggy's own caption, shown in a quotation-marked blockquote with a red rule, and repeated word for word in the story text beneath it. The red rule also breaks the "red is for CTAs" rule. | `lib/case-studies.ts`, story pages |
| 5 | **Text too small.** Eyebrows were 9.6–9.9 px. | computed styles |
| 6 | **Booking form gaps.** One generic error line; no inline errors or focus move; no email format check; past dates selectable; provider wording ("Booking form isn't configured yet") shown to visitors. | `BookForm.tsx` |
| 7 | **Schema implies a price.** `priceRange: "$$$"` in the LocalBusiness data. Biggy quotes per event and publishes no prices. | `LocalBusinessSchema.tsx` |
| 8 | Smaller: `<html lang="en">` for a South African site; floating WhatsApp button overlapped the hero on phones; footer and menu tap targets 24–36 px; FloatingCta outside any landmark (axe "region"). | axe, tap-target walk |

Noted, not changed (owner decisions): see `docs/content-verification-needed.md`.
Also: `DESIGN-SYSTEM.md` still describes retired fonts and colours (Spectral, Cinzel,
ember `#c1432d`); there is no ESLint config, so `npm run lint` opens an interactive
setup prompt instead of linting (type-check and build were used instead); the
sitemap sets `lastModified` to build time for every page.

## 5. What changed (summary — full file list in `refinement-changelog.md`)

1. **"On the record"** directly under the hero: the Mozambique five-year milestone
   (stall photo with his name on the banner, a five-tick year rail 2022–2026,
   "Explore the story" to `/mozambique`), and a labelled TV/Radio list (Ultimate
   Braai Master, Come Dine With Me (SA), Rate My Plate, Rise FM — Fun Food Friday).
   Old "Catch us live", "On air" and "As seen on / Catch me on" blocks are folded in,
   nothing dropped.
2. **Appearances can no longer go stale.** `lib/appearances.ts` computes
   upcoming vs previous from the date; the homepage rebuilds hourly.
3. Hero: same photo and words; added Book a Service + Chat to Biggy, larger headline,
   firmer ghost-button outline. The floating WhatsApp button now waits until the hero
   has scrolled away.
4. Homepage order: hero → on the record → the range (six services, own photographs)
   → recent event → Biggy → booking invitation.
5. `/work`: Mozambique milestone feature, photographic service tiles, featured event
   large with three beside it, booking band.
6. `/mozambique`: past-tense 2026 content, year rail, figure captions, booking band.
7. Event stories: course-labelled menu captions, duplicate quote removed, booking band.
8. Booking form: inline errors with focus, email/phone sanity checks, no past dates,
   friendly failure message with WhatsApp and phone fallbacks, focus to the confirmation.
9. Technical: `lang="en-ZA"`, `priceRange` removed, 12 px minimum text, 44 px tap
   targets, header Book button from tablet up, landmark for the floating button.

## 6. Verification (local production build, 11 October 2026)

| Check | Result |
|---|---|
| `tsc --noEmit`, `next build` | pass |
| 7 widths × 10 routes: horizontal overflow, text past viewport, text < 11.5 px, email/phone on one line | none |
| axe-core WCAG 2.0–2.2 A/AA + best-practice, 12 routes × 2 widths | no violations |
| Worst-case text contrast over photographs (95th-percentile ground behind each word) | lowest 7.16:1 (needs 4.5) |
| Links: 12 internal, 9 external, 2 legacy redirects, 404 page | all good |
| Form (network mocked; nothing sent to Biggy): time trap, empty, no-contact, bad email, short phone, date minimum, "not sure yet", success payload identical to before, error fallback, honeypot | pass |
| Keyboard: 14 tab stops show an outline; Escape closes the menu and returns focus | pass |

Not measured: Lighthouse performance (not run this session). The hero image and its
priority loading are unchanged; every new image below the fold is lazy-loaded.
Not verified: delivery of a real enquiry to Biggy's inbox (the preview has no form key;
see the verification doc).

Scripts and outputs: `Clients/Biggy Smallz/jobs/2026-10-website-refinement/`.
