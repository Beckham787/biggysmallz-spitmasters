# Biggy Smallz Spitmasters — consistency audit

Every surface the brand appears on, checked against the brand docs
(`01-brand-strategy`, `03-approved-direction`, `04-colour-type-system`,
`10-identity`). TK Studio, 2026-09-13.

**Nothing has been changed.** This is the finding list.

Legend: **✗** contradicts the docs · **~** drifted · **✓** consistent ·
**?** not reachable from here

---

## Summary — the five that matter

1. **✗ The live site's palette and type share nothing with the brand docs.**
   Three type systems now exist across docs, site and new identity, and none
   agree.
2. **✗ The three named experiences and the primary CTA from the approved
   direction do not exist on the site.** Zero occurrences of FIRE FEASTS,
   PRIVATE DINING, SEVEN-COURSE EXPERIENCES or BOOK YOUR EXPERIENCE.
3. **✗ Two different addresses are in public circulation** — Fourways,
   Gauteng on the public listings; Mbombela / Mpumalanga Lowveld on the site.
4. **✗ Three spelling and grammar errors in the Instagram bio**, on a profile
   about to receive the handover link.
5. **✗ The Facebook page is not linked from the site or its structured data**,
   so Google has no way to connect them.

---

## 1 · The website — biggysmallzspitmasters.co.za

All eight pages return 200. Name spelled correctly throughout.

### ✗ Palette — no overlap with the brand docs

| Doc 04 says | The site actually uses |
|---|---|
| Charcoal `#171412` | `charcoal #15110f`, `ink #0b0a09`, `coal #1d1815` |
| Bone White `#F3E8D5` | `cream #f3eadd`, `cream-dim #cabfb0` |
| Ember Orange `#E6531A` | `ember #c1432d`, `ember-bright #e0673f`, `ember-deep #8f2f1c` |
| Flame Red `#B52A18` | `flame #f2854b` — *note this is lighter than doc-Flame, not darker* |
| Ash Grey `#77716A` | `smoke #8a807a`, plus `gold #e8b36a` and `wood #4a3527`, which have no doc equivalent at all |

Not one hex matches. The site palette is a legitimate, well-built system
("fire as a light source, deep coal-shadow to hot flame-tip") — it simply is
not the documented one.

### ✗ Type — three systems, none agreeing

| Source | Display | Body |
|---|---|---|
| `04-colour-type-system` | **Oswald** | **Montserrat** |
| The live site (`app/layout.tsx`) | **Cinzel** | **EB Garamond** |
| `10-identity` brand guide | **Fraunces 900** | **Archivo** |

The site direction is dated in its own config: *"The 'fine-dining entrance'
direction, picked 2026-08-22."* Doc 04 was never updated to match.

> **Correction owed:** `10-identity/brand-guide.html` states *"The live site
> still runs the previous pairing (Oswald / Montserrat)."* **That is wrong** —
> the site runs Cinzel / EB Garamond. The guide needs fixing before Monday.

### ✗ The three experiences and the CTA are absent

`03-approved-direction` specifies the homepage show three core experiences and
use **BOOK YOUR EXPERIENCE** as the primary action, *"rather than treating
Biggy Smallz like an ordinary food-ordering business."*

Live counts across all eight pages:

| Phrase | Occurrences |
|---|---|
| FIRE FEASTS / PRIVATE DINING / SEVEN-COURSE EXPERIENCES | **0** |
| BOOK YOUR EXPERIENCE | **0** |
| "Book a Service" (the actual CTA) | **13** |

The site instead offers **six** service categories: Fine Dining · The
Traveling Chef · 3–7 Course Plated Service · VIP Events · **Large-Scale
Catering** · The Ultimate Braaimaster.

> This also makes `10-identity/bios.md` inconsistent — the bio copy I wrote
> leads with *"Fire feasts, private dining, seven-course tables,"* naming
> three experiences a visitor will not find when they click through.

### ✗ "Catering company" — direct conflict with the strategy

`01-brand-strategy`, line 189: *"Don't position Biggy Smallz as a catering
company that happens to cook over fire."* Line 124: *"Never sound like a
conventional 'full-service catering solution'."*

- Page `<title>`: "…Personal chef, spitbraai & **fine-dining catering**"
- Meta description uses "catering" **twice**
- A service category is literally named **"Large-Scale Catering"**
- 15 uses of "catering" sitewide, 5 of them "catering company"

This was deliberate — commit `6df7d28` added catering keywords for search. So
it is **a real trade-off between findability and positioning, not a typo**, and
it needs TK's decision rather than a silent fix.

### ~ Tagline mismatch

`siteConfig.tagline` is **"Cooking over open flame since 2017"**. The brand's
signature line is **"Get in my belly."** The signature line is used correctly
in the hero, `og:title` and nav; the config tagline appears to be a second,
undocumented line.

### ✓ Correct

Name, "Get in my belly" on every page, Est. 2017 (consistent everywhere),
phone `064 850 4066`, `"Powered by Nguni Strength"` in the footer on all eight
pages, `www` → apex 308 redirect live, structured data valid
(`FoodEstablishment`).

---

## 2 · Instagram — @biggysmallzspitmasters · 1,744 followers

### ✗ Three errors in two lines

Bio, verbatim:

> From spitbraai's to elegant 7 course meals! Its an unforgetable
> #GetInMyBelly👨🏿‍🍳 experience prepared by chef @biggy013

| Error | Correct |
|---|---|
| `spitbraai's` (possessive apostrophe on a plural) | `spitbraais` |
| `Its` | `It's` |
| `unforgetable` | `unforgettable` |

### ✗ No link in bio

Nothing detected. The domain is live and about to be handed over — this is the
single highest-value fix on the list.

### ✓ `#GetInMyBelly` is present and correct

The signature line survives. Keep it.

**Replacement bio** — 132 characters, verified, in
`10-identity/bios.md`:

```
Fire feasts, private dining, seven-course tables.
Mpumalanga, and wherever the fire travels.
Get in my belly.
↓ Book your experience
```

*Only use this once the site names those three things — otherwise use the
alternate in `bios.md` that claims nothing the site can't back up.*

---

## 3 · Facebook — facebook.com/BiggySmallzSpitmasters

### ✗ Not linked from the site or its structured data

`sameAs` lists only two Instagram profiles and an iono.fm episode. **No
Facebook.** Google therefore has no signal that the page and the site are the
same business — a direct local-SEO loss.

### ✗ Listed under a different city and a different email

| | Facebook / public listings | The site |
|---|---|---|
| Location | **141 Cedar Ave West, Fourways, Gauteng** | Mbombela / Mpumalanga Lowveld |
| Email | **biggysmallzspitmasters@gmail.com** | biggy@biggysmallzspitmasters.co.za |
| Phone | +27 64 850 4066 | +27 64 850 4066 ✓ |

Two provinces and two email addresses in public circulation. This is the same
failure pattern found on Shonga Events, and it affects local search directly.

> Full page content could not be parsed (Facebook truncates to
> unauthenticated fetches). Bio text, category and follower count need
> checking by hand.

---

## 4 · The brand docs themselves

### ✗ A duplicate Brand System exists at the workspace root

`TK Studio/Biggy Smallz Spitmasters-Brand System/` holds a second copy of
folders `01`–`08`. It is missing `09-mark-routes`, `10-identity` and
`biggysmallz-poster-styles.html`.

This violates the root `CLAUDE.md` rule that client material lives inside the
client's own folder, and it means **the root copy is now the stale one** — the
mark routes and the entire identity build are not in it. Anyone who opens it
first will conclude Biggy has no mark.

`References/biggysmallz-poster-styles.html` is also a byte-identical duplicate
of the copy inside the Brand System.

### ~ Doc 04 was never updated after the 2026-08-22 redesign

It still documents Oswald / Montserrat and a palette the site abandoned.

---

## 5 · Cross-references in other repos and the vault

| Location | Says | Status |
|---|---|---|
| `TK Studio Site/lib/content.ts` | *"A Lowveld **catering company**, established 2017"* | ✗ contradicts the strategy's explicit instruction |
| Root `CLAUDE.md` | "Round 2 in progress; 8 uncommitted local changes as of 2026-09-07" | ~ stale — now 19 untracked, and no mention of the identity handover |
| Vault `02 Studio/Client Pipeline.md` | Same Round 2 wording, same stale count | ~ no mention of `09-mark-routes`, `10-identity`, Monday's handover, or Nguni Strength |
| Vault Client Pipeline | Care plan "R250/month" | ✗ `04 Finance/Pricing.md` says R500/month |
| `10-identity/brand-guide.html` | "the live site still runs Oswald / Montserrat" | ✗ wrong — Cinzel / EB Garamond |

---

## 6 · Not reachable from here

Needs TK on a phone or a logged-in browser:

- **Facebook page** — bio, category, address, hours, cover image
- **Google Business Profile** — the highest-impact listing for local search;
  existence not confirmed either way
- **WhatsApp Business** — profile, About, business description, catalogue
- **Instagram** — profile picture, highlight covers, pinned posts, link in bio
- **@Biggy013** — the personal account, listed in `sameAs` as an official
  profile of the business
- **Printed collateral** — menus, cards, the Canva profile PDF, aprons,
  signage, vehicle branding
- **Third-party listings** — the search surfaced several; whichever carry the
  Fourways address should be corrected or removed

---

## What to fix before Monday

Ordered by cost-to-benefit, highest first.

1. **Instagram bio** — fix three spelling errors, add the link. Ten minutes,
   and it is the surface the handover points at.
2. **Correct the brand guide's type claim** — it currently tells the client
   something false about their own site.
3. **Settle the address.** One province, one email, everywhere.
4. **Add Facebook to `sameAs`** in `LocalBusinessSchema.tsx`.
5. **Delete the duplicate root Brand System folder** once confirmed it holds
   nothing unique.

## What needs a decision, not a fix

- **Catering vs food-experience.** Search traffic against positioning. The
  strategy is unambiguous; the site's SEO choice was deliberate. Pick one.
- **Whether doc 04 or the live site is canonical** for palette and type — and
  then change the other. Three systems cannot all be right.
- **Three experiences or six services.** The approved direction says three;
  the site sells six. The bios were written against three.
