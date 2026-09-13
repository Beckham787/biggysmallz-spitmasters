# Consistency audit — Biggy Smallz Spitmasters

Every place the brand appears, checked against folders 01–10 of this Brand
System. Run 2026-09-13 by TK Studio.

This merges two audit passes run in parallel. Where they disagreed, the claim
was re-checked against the source and the corrected number is what appears
below — two of the second pass's headline figures did not survive that check,
and are noted where they occur.

**Verification legend**

| | |
|---|---|
| **✓ verified** | re-checked directly against the file or the live URL |
| **⚠ second-hand** | reported by the parallel pass, **not independently confirmed** — Instagram cannot be read from here and Facebook truncates to unauthenticated fetches. Confirm with Martin before acting. |

Sources: the live site codebase, `lib/site-config.ts`, the structured data,
this Brand System, `10-identity`, the root `CLAUDE.md`, `TK Studio
Site/lib/content.ts`, and the Obsidian vault.

---

## What is already consistent — ✓ verified

| | |
|---|---|
| **Name** | "Biggy Smallz Spitmasters" everywhere, full name, never truncated |
| **Domain** | `biggysmallzspitmasters.co.za` — config, metadata, schema and vault agree; www now 308-redirects to the apex |
| **Instagram handle** | `@biggysmallzspitmasters`, with `@Biggy013` correctly marked private |
| **Owner** | Martin "Biggy" Mhlongo — config, schema and footer agree |
| **Phone** | +27 64 850 4066, consistent on site and in public listings |
| **Established** | 2017; the vault records a deliberate sitewide fix from 2018 |
| **Signature line** | "Get in my belly" is live in page metadata, the homepage hero and the WhatsApp pre-text — and `#GetInMyBelly` is in the Instagram bio |

---

## 1 · The accent colour does not match — ✓ verified

This is the one that matters on Monday. The neutrals are fine; the accent is not.

| Brand System (04) | Live site (`tailwind.config.ts`) | RGB distance |
|---|---|---|
| Charcoal `#171412` | charcoal `#15110f` | 4.7 — same-ish |
| Bone `#F3E8D5` | cream `#f3eadd` | 8.2 — same-ish |
| **Ember `#E6531A`** | **ember `#c1432d`** | **44.6 — different** |
| Flame `#B52A18` | ember-deep `#8f2f1c` | 38.5 — different |
| Ash `#77716A` | smoke `#8a807a` | 29.0 — close |

> **Corrected from the second pass**, which reported "no overlap with the brand
> docs" and mapped doc-Flame to the site's `flame #f2854b`. Neither holds up:
> charcoal and bone are within 5–8 RGB points and read as the same colours,
> and the site's nearest match to doc-Flame is `ember-deep #8f2f1c`, not the
> much lighter `flame #f2854b` — that mapping was made by token name rather
> than by colour.

The site also ships colours with no doc equivalent at all: `ember-bright
#e0673f`, `flame #f2854b`, `gold #e8b36a`, `cream-dim #cabfb0`, `ink #0b0a09`,
`coal #1d1815`, `wood #4a3527`.

**Why it matters now.** The profile picture in `10-identity/social/` is built on
the approved `#E6531A`. Martin pastes it into two bios; the bio links to a site
whose orange is `#c1432d` — deeper and redder. Side by side that reads as two
brands, and the profile picture is the first thing anyone sees.

---

## 2 · Three type systems, and the docs describe one that runs nowhere — ✓ verified

| Source | Display | Body |
|---|---|---|
| `04-colour-type-system` | Oswald | Montserrat |
| The live site (`app/layout.tsx`) | **Cinzel** | **EB Garamond** |
| `10-identity` brand guide | Fraunces 900 | Archivo |

The site's pairing is the "fine-dining entrance" system picked 2026-08-22. The
Oswald/Montserrat pairing in doc 04 is not "the current site" — **it is not
running anywhere**, and has been stale for three weeks while looking like the
most authoritative file in the folder.

**Already corrected:** `10-identity/brand-guide.html` and its README told the
client the site ran Oswald/Montserrat. That was a false statement about the
client's own site, inside the document being handed to them. Both now say
Cinzel + EB Garamond and carry the accent warning above.

---

## 3 · The strategy's structure is not the site's structure — ✓ verified

Doc 03 names three experiences and one CTA. The site sells six differently-named
service categories.

| Doc 03 says | On the site |
|---|---|
| FIRE FEASTS | appears **1×** |
| PRIVATE DINING | appears **1×** |
| SEVEN-COURSE | appears **2×** |
| **BOOK YOUR EXPERIENCE** | **0×** — the CTA is **"Book a Service"** |

What the site actually sells, from `lib/site-config.ts`:
**Fine Dining · The Traveling Chef · 3–7 Course Plated Service · VIP Events ·
Large-Scale Catering · The Ultimate Braaimaster.**

> **Corrected from the second pass**, which reported the three experiences at
> "**0** occurrences each." They do appear — in page metadata and once on the
> homepage. The accurate finding is not that they are absent but that **they
> are not the site's organising structure**; six other names are.

Doc 03 is explicit about the CTA: *"The website should retain BOOK YOUR
EXPERIENCE as the primary action rather than feeling like a conventional
catering enquiry site."* "Book a Service" is almost word for word what it warns
against.

**This makes `10-identity/bios.md` inconsistent too.** The recommended bio leads
with "fire feasts, private dining, seven-course tables" — three things a
visitor arriving from that bio will not find named anywhere. The file already
carries a safer alternate; a pointer to it has been added.

---

## 4 · "Catering company" — a direct conflict with the strategy — ✓ verified

| Phrase | Occurrences in `app/`, `lib/`, `components/` |
|---|---|
| "catering" | **22** (7 of them "catering company/companies") |
| "personal chef" | 14 |
| "spitbraai" | 7 |
| **"food experience"** | **0** |

The handover brief and doc 03 are unambiguous: a food-experience brand, *not* a
catering company that happens to cook over fire.

**In fairness, this was deliberate.** Commit `6df7d28` added the "catering
company" variants for search — those are the words people in Mpumalanga type,
and the site ranks on them. That is a real argument, not carelessness.

But both cannot be true. *Cheapest resolution if the SEO matters:* keep
"catering" in metadata, descriptions and schema where search reads it; change
the visible CTA and headings to the experience language where customers read it.

---

## 5 · Instagram — ⚠ second-hand, confirm with Martin

Reported by the parallel pass. **I cannot log into Instagram, so none of this is
independently verified.** Treat as a prompt to look, not as fact.

Profile: `@biggysmallzspitmasters`, reported at 1,744 followers.
Bio, as reported verbatim:

> From spitbraai's to elegant 7 course meals! Its an unforgetable
> #GetInMyBelly👨🏿‍🍳 experience prepared by chef @biggy013

| Reported error | Correction |
|---|---|
| `spitbraai's` | `spitbraais` |
| `Its` | `It's` |
| `unforgetable` | `unforgettable` |

**Reported: no link in bio.** If true, that is the highest-value ten minutes on
this whole list — the domain is live and the handover points at this profile.

Replacement copy is in `10-identity/bios.md`, with counts computed. Use the
*alternate* bio there until the site names the three experiences (see §3).

---

## 6 · Facebook and public listings — ⚠ second-hand, confirm with Martin

| | Reported on Facebook / listings | The site |
|---|---|---|
| Location | **141 Cedar Ave West, Fourways, Gauteng** | Mbombela / Mpumalanga Lowveld |
| Email | **biggysmallzspitmasters@gmail.com** | `biggy@biggysmallzspitmasters.co.za` |
| Phone | +27 64 850 4066 | +27 64 850 4066 ✓ |

Fourways is in Johannesburg — roughly 350 km from Mbombela. If that address is
really on the page it will be feeding Google the wrong service area. **Worth
Martin opening the page and reading it out**, rather than acting on a
truncated fetch.

**✓ verified:** the Facebook page is **absent from `sameAs`** in
`components/LocalBusinessSchema.tsx` — only the two Instagram URLs and the
iono.fm episode are listed, so Google has nothing connecting page to site.

This is the same failure pattern as Shonga Events: the business's own
description of itself differs on every surface it appears.

---

## 7 · A stale duplicate Brand System at the workspace root — ✓ verified

```
TK Studio/Biggy Smallz Spitmasters-Brand System/    ← folders 01–08 only
TK Studio/Websites/BiggySmallz/Brand System/        ← 01–11, the real one
```

Verified byte-identical for 01–08. The root copy is **missing
`09-mark-routes` and `10-identity`** — so anyone who opens it gets the strategy
with no mark and no identity, and no sign that either exists.

It also breaks the root `CLAUDE.md`'s own rule: *"Client-specific brand material
lives inside that client's own `Websites/<site>/` folder — not at the project
root."*

Same issue, smaller: `References/biggysmallz-poster-styles.html` is
byte-identical to the copy inside this folder.

**Recommend deleting both.** Not done — deleting is destructive and they are
yours to remove.

---

## 8 · A phantom tagline — ✓ verified

`lib/site-config.ts` carries `tagline: "Cooking over open flame since 2017"`.
It appears in **no brand document** and is **rendered nowhere** — a dead field
in the file described as "single source of truth for business details", where
the next person needing a tagline will reasonably reach for it.

Delete it, or set it to the real signature line.

---

## 9 · Cross-references elsewhere — ✓ verified

| Location | Says | Status |
|---|---|---|
| `TK Studio Site/lib/content.ts` | *"A Lowveld **catering company**, established 2017"* | ✗ contradicts doc 03 — and it is the studio's own portfolio copy |
| Root `CLAUDE.md` | "Round 2 in progress; 8 uncommitted local changes as of 2026-09-07" | ~ stale — now 19 untracked, no mention of the identity handover |
| Vault `02 Studio/Client Pipeline.md` | same Round 2 wording, same stale count | ~ no mention of `09-mark-routes`, `10-identity`, Monday's handover, or Nguni Strength |
| Vault `04 Finance/Ledger.md` + Client Pipeline | Care plan "R250/month" | ✗ `Pricing.md` says **R500/month** |

---

## 10 · Not reachable from here

Enumerated so nobody assumes they were covered: the Facebook page body,
Google Business Profile, WhatsApp Business profile, printed collateral
(aprons, boards, menus, vehicle), and Instagram's profile picture, highlights
and link-in-bio.

---

## What was changed by this audit

Only the thing that was factually wrong in work the studio produced:

- `10-identity/brand-guide.html` — type note corrected to Cinzel + EB Garamond,
  plus the accent-colour warning.
- `10-identity/README.md` — same correction, marked as a correction.
- `10-identity/bios.md` — a pointer to the safer alternate bio, since the
  recommended one names three experiences the site does not.

Nothing on the live site was touched. Everything else above is reported only.

---

## Fix before Monday — cheapest first

1. **The Instagram bio** — three spelling errors and, reportedly, no link. Ten
   minutes, on the surface the handover points at. **Confirm the errors first.**
2. **Settle the address and the email.** One province, one inbox, everywhere.
3. **Add Facebook to `sameAs`** in `LocalBusinessSchema.tsx`. One line.
4. **Delete the duplicate root Brand System folder.**

## Decisions, not fixes

1. **Ember `#E6531A` or `#c1432d`** — which is the brand's orange?
2. **Food-experience brand or catering company** — and if the honest answer is
   "both, for different audiences", write that down as the rule.
3. **Three experiences or six services** — doc 03 says three, the site sells
   six, and the bios were written against three.
4. **Doc 04** — update to current, or mark superseded by `10-identity`?
5. **The phantom tagline** — delete, or set to "Get in my belly"?
