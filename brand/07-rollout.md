# Biggy Smallz Spitmasters — Stage 7: Rollout

*Build · 2026-09-24 · parts 1 (site) and 2 (templates) approved by TK*

TK's instruction: when working in the site, show a preview and **don't commit anything in the site**. Every site change below is uncommitted in the working tree.

## Part 1: the site, in the new identity
Preview (screenshots of every page, desktop and phone, from a local production build): the "Biggy Site Preview" artifact.

**What changed:**
- **Palette:** `tailwind.config.ts` token *values* are now the five identity colours. The token names are kept, so the markup barely moved. The site is dark-led, like the jacket.
- **Red text on dark:** every `text-gold` / `text-ember*` (red on the dark ground, 2.27:1) now uses `text-paper` (white).
- **Buttons and focus:** buttons are red fills with white text (8.01:1). The focus ring is white.
- **Old effects removed:** the gradient "seared" text is now solid white, and the ember glows are recoloured to Spitmasters Red.
- **Type:** Oswald for headings and labels, Source Serif 4 for body text, self-hosted with `next/font/local` from the identity folder. Headings are set in capitals.
- **Logo:** header and footer use `public/brand/lockup-white.svg`: 60px tall on mobile, 64px on larger screens, 81–86px wide, which clears the badge's 80px minimum. The schema logo is `lockup-charcoal-1024.png`.
- **Favicons:** `app/icon.png`, `app/apple-icon.png` and `app/favicon.ico` come from `brand-identity/favicon/`.
- **Footer:**
  - The blurred, greyscaled logo watermark is gone. The guide's "never" section rules out recolouring or adding effects to the badge.
  - The studio credit said MeetingPoint and linked to meetingpointstudio.co.za. It now shows TK Studio's woven mark and links to tkstudio.co.za.
- **Bug found and fixed on the way:** an unquoted `Source Serif 4` in the Tailwind font stack made the whole `font-family` declaration invalid CSS, so the body text fell back to a system sans. It's now quoted.

**Checks run:**
- `next build`: passes.
- Crawled 11 internal pages: 0 broken links. The only console 404 is Vercel Analytics, which is expected off-Vercel.
- Mobile at 390px: no layout breaks.

**Not yet done (part 2):**
- the link-share (OG) image, which still has old Cinzel type burned in
- social templates
- business card

Every template in part 2 goes through `Machine/rollout-checklist.md`.

---

## Part 2: templates · 2026-09-24 · approved by TK

TK approved part 1 (the site look). No clickable preview branch was wanted.

**Templates** are in `brand/rollout/templates/` and built by `build.py`. The photos come from `public/images`, the fonts from `brand-identity/_build/fonts`, and the copy is Martin's own captions from `lib/case-studies.ts` and the site.

| # | Template | Type | Canvas |
|---|---|---|---|
| 01 | Wedding · Moyres Venue | showcase (event) | IG portrait 1080×1350 |
| 02 | Reverse-seared rib eye | showcase (plated course), Bone | IG portrait 1080×1350 |
| 03 | The crew, back of house | behind-the-scenes | IG portrait 1080×1350 |
| 04 | "Site braais. Travel cooks. Noma yini, we got you!" | promo (book a date) | IG portrait 1080×1350 |
| 05 | The identity | full reveal board | IG portrait 1080×1350 |
| 06 | Link share | Facebook link 1200×630, now the site's OG image | 1200×630 |

**Also counted here:** the Heritage Day posters made 2026-09-24 are in `brand/rollout/heritage-day-2026/`. Each one passed the checklist when it was made.

**Site change (uncommitted, per TK):** the link-share image is now `public/images/og-2026.png`, set in `app/layout.tsx` and the schema. It replaces the 1040×1040 image that had the retired Cinzel type burned in. `tsc` is clean.

### Gate — `Machine/rollout-checklist.md`, every template
| Template | 1 focal | 2 ≤3 sizes | 3 contrast | 4 grouping | 5 palette | 6 signature | 7 ≤5 info | 8 order | 9 type legible | 10 real | 11 canvas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 showcase wedding | ✓ | ✓ | ✓ 18.2 / 15.89 | ✓ | ✓ | ✓ | ✓ 4 | ✓ | ✓ | ✓ | ✓ |
| 02 showcase menu | ✓ | ✓ | ✓ 15.89 / 9.17 | ✓ | ✓ | ✓ | ✓ 4 | ✓ | ✓ | ✓ | ✓ |
| 03 behind the scenes | ✓ | ✓ | ✓ 15.22 measured over photo | ✓ | ✓ | ✓ | ✓ 3 | ✓ no CTA | ✓ | ✓ | ✓ |
| 04 promo | ✓ | ✓ | ✓ 8.01 on red / 15.89 | ✓ | ✓ | ✓ | ✓ 4 | ✓ | ✓ | ✓ | ✓ |
| 05 full reveal | ✓ | ✓ | ✓ 9.17 | ✓ | ✓ | ✓ | ✓ 5 | ✓ | ✓ | ✓ | ✓ |
| 06 link share | ✓ | ✓ | ✓ 18.2 | ✓ | ✓ | ✓ | ✓ 3 | ✓ | ✓ | ✓ | ✓ |

How the checks were done:
- **Sizes:** exactly three type sizes (26 / 34 / 68px) plus the badge.
- **Palette:** the build script contains only the five identity colours, plus one transparent Jacket Black for the photo fade.
- **Signature element:** the red rule marks a call to action and is used for nothing else.

**Not made, deliberately:**
- **Testimonial template.** No real client testimonial is on record, and rule 10 forbids placeholder copy. `[TK TO SUPPLY: a client quote Martin is happy to publish]`
- **Business card.** The site's phone number is still marked `[CONFIRM]` in `lib/site-config.ts`, and the 2026-09 audit found that the published email address can't receive mail. The card waits until both are confirmed.
