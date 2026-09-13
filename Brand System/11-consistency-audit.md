# Consistency audit — Biggy Smallz Spitmasters

Every place the brand appears, checked against folders 01–10 of this Brand
System. Run 2026-09-13 by TK Studio.

Sources checked: the live site codebase, `lib/site-config.ts`, the structured
data, this Brand System, the new `10-identity` set, the root `CLAUDE.md`, and
the Obsidian vault (`TK Studio/02 Studio/Client Pipeline.md`,
`04 Finance/`).

---

## What is already consistent

Worth stating, because most of it is:

| | |
|---|---|
| **Name** | "Biggy Smallz Spitmasters" everywhere, full name, never truncated |
| **Domain** | `biggysmallzspitmasters.co.za` — config, metadata, schema, vault all agree; www now 308-redirects to the apex |
| **Instagram** | `@biggysmallzspitmasters`, plus `@Biggy013` correctly marked private |
| **Owner** | Martin "Biggy" Mhlongo, consistent in config, schema and footer |
| **Established** | 2017 — the vault records a deliberate sitewide fix from 2018 to 2017 |
| **Signature line** | "Get in my belly" is live in page metadata, the homepage hero and the WhatsApp pre-text. Correct per 03 and 11 |

---

## 1 · The accent colour does not match. This one matters on Monday.

The neutrals are fine. The accent is not.

| Brand System (04) | Live site (`tailwind.config.ts`) | RGB distance |
|---|---|---|
| Charcoal `#171412` | charcoal `#15110f` | 4.7 — same-ish |
| Bone `#F3E8D5` | cream `#f3eadd` | 8.2 — same-ish |
| **Ember `#E6531A`** | **ember `#c1432d`** | **44.6 — different** |
| Flame `#B52A18` | ember-deep `#8f2f1c` | 38.5 — different |
| Ash `#77716A` | smoke `#8a807a` | 29.0 — close |

The site also ships seven colours with no equivalent in the docs at all:
`ember-bright #e0673f`, `flame #f2854b`, `gold #e8b36a`, `cream-dim #cabfb0`,
`ink #0b0a09`, `coal #1d1815`, `wood #4a3527`.

**Why it matters now.** The profile picture in `10-identity/social/` is built
on the approved `#E6531A`. Martin pastes it into two bios, and the bio links to
a site whose orange is `#c1432d` — deeper and redder. Side by side that reads
as two brands, and the profile picture is the first thing anyone sees.

**Decision needed:** either the site moves to the documented Ember, or the
documented Ember moves to the site's. Not urgent to *fix* before Monday —
urgent to *know*, so nobody is surprised.

---

## 2 · Three type systems, and the docs describe one that exists nowhere

| Source | Says |
|---|---|
| `04-colour-type-system` | Oswald + Montserrat |
| `10-identity` (new) | Fraunces 900 + Archivo |
| **The live site** | **Cinzel + EB Garamond** |

The site's pairing is the "fine-dining entrance" system picked 2026-08-22.
So the Oswald/Montserrat pairing documented in 04 is not "what the site runs
today" — **it is not running anywhere.** Doc 04 has been stale for three weeks.

**Already corrected:** `10-identity/brand-guide.html` and its README said the
site ran Oswald/Montserrat. That was wrong and is now fixed, with the accent
mismatch above noted alongside it.

**Still needed:** doc 04 should either be updated to describe Cinzel/EB
Garamond as the current state, or marked superseded by 10-identity. Right now
it is the most authoritative-looking document in the folder and it is wrong.

---

## 3 · The strategy's own language is absent from the site

This is the largest gap, and it is a positioning question rather than a bug.

The approved direction (03) is explicit: a **food-experience brand**, *not* a
catering company that happens to cook over fire. It names the primary online
action directly — *"The website should retain BOOK YOUR EXPERIENCE as the
primary action rather than feeling like a conventional catering enquiry site."*

Counted across `app/`, `lib/` and `components/`:

| Phrase | Occurrences |
|---|---|
| "catering" | **22** (7 of them "catering company/companies") |
| "personal chef" | 14 |
| "spitbraai" | 7 |
| **"food experience"** | **0** |
| **"Book your experience"** | **0** — the CTA is **"Book a Service"** (12×) |

"Book a Service" is, almost word for word, the thing 03 says not to sound like.

**In fairness, this was deliberate.** Commit `6df7d28` added "catering company"
/ "catering companies" variants for search — those are the words people
actually type in Mpumalanga, and the site ranks on them. That is a real
argument, not carelessness.

**But both cannot be true.** Either the brand is a food-experience brand and
the site should say so, or it sells catering and doc 03 is aspirational. Pick
one and write the reason down. A middle position where the strategy says one
thing and every page says another is the worst of both.

*Cheapest resolution if the SEO matters:* keep "catering" in metadata,
descriptions and schema where search reads it, and change the visible CTA and
headings to the experience language where customers read it. That gets the
rankings and the positioning.

---

## 4 · A stale duplicate of this Brand System at the workspace root

```
TK Studio/Biggy Smallz Spitmasters-Brand System/    ← folders 01–08 only
TK Studio/Websites/BiggySmallz/Brand System/        ← 01–10, the real one
```

Verified byte-identical for 01–08. The root copy is **missing `09-mark-routes`
and `10-identity`** — so anyone who opens it gets the strategy with no mark and
no identity, and no indication that either exists.

It also breaks the root `CLAUDE.md`'s own rule: *"Client-specific brand
material lives inside that client's own `Websites/<site>/` folder — not at the
project root."*

Same issue, smaller: `References/biggysmallz-poster-styles.html` is
byte-identical to the copy inside the Brand System.

**Recommend deleting both duplicates.** Not done — deleting is destructive and
they are yours to remove.

---

## 5 · A phantom tagline

`lib/site-config.ts` carries:

```ts
tagline: "Cooking over open flame since 2017",
```

It appears in **no brand document**, and it is **referenced nowhere in the
codebase** — nothing renders it. It is a dead field sitting in the file
described as "single source of truth for business details", where the next
person to need a tagline will reasonably reach for it.

Either delete it, or set it to the real signature line.

---

## 6 · Care-plan price is stale in two vault files

Not Biggy-specific, but found on the way through and it affects quoting:

- `04 Finance/Pricing.md` — Care plan **R500/month** (current)
- `04 Finance/Ledger.md` — Shonga Care plan **R250/mo** (stale)
- `02 Studio/Client Pipeline.md` — Shonga pitch **"R250/month care plan"** (stale)

---

## 7 · The Nguni Strength question is closer to answered than I reported

`components/Footer.tsx` records TK's own words in a code comment:

> *"Powered by Nguni Strength" (TK: "that's his other business… we'll build a
> website for it if we get this one right")*

and elsewhere: *"Nguni Strength is a distinct second venture."*

That is **sibling, not parent** — which matches the recommendation in
`Brands/Nguni Strength/spec.md`, but it is no longer a studio opinion; it is
the client's own framing, already on record.

One correction to that recommendation: the same comment records that
**"Flavoured by" was tried and changed back to "Powered by" per TK/Biggy
feedback.** So the footer wording was specifically tested with the client and
reverted. Recommending it be changed needs to account for that — it is not an
unconsidered line.

---

## What was changed by this audit

Only the thing that was factually wrong in work I produced:

- `10-identity/brand-guide.html` — the type note now says the site ships Cinzel
  + EB Garamond (it said Oswald/Montserrat), and carries the accent-colour
  warning.
- `10-identity/README.md` — same correction, marked as a correction.

Everything else above is reported, not acted on. Nothing on the live site was
touched.

---

## Decisions this leaves with TK

1. **Ember `#E6531A` or `#c1432d`** — which one is the brand's orange?
2. **Food-experience brand or catering company** — and if the answer is "both,
   for different audiences", write that down as the rule.
3. **Doc 04** — update to current, or mark superseded by 10-identity?
4. **Delete the two duplicate folders?**
5. **The phantom tagline** — delete, or replace with "Get in my belly"?
