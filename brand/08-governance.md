# Biggy Smallz Spitmasters — Stage 8: Governance

*Keep · 2026-09-24 · approved by TK*

Stages 1–7 are done. This stage sets how the brand stays right after handover: who does what, when it gets checked, and what sends the work back into an earlier stage.

---

## 1. Care plan: who owns what

| Thing | Owner | Where it lives |
|---|---|---|
| Day-to-day posting (Instagram, Facebook, WhatsApp status) | Martin | His phones |
| Photos from events | Martin and crew. Send the best 5–10 per event to TK | WhatsApp to TK |
| Identity files (logo, palette, fonts, guide) | TK Studio. **Nobody edits these files.** New cuts are made in `_build/` and rebuilt | `brand-identity/` |
| Social templates | TK Studio builds them. Martin gets them as PNGs | `brand/rollout/templates/` |
| Website (content, photos, case studies, contact details) | TK Studio | `master` → Vercel |
| Contact details (phone, email) | Martin confirms them. TK Studio publishes them | `lib/site-config.ts` |

**The one rule for Martin:** use the logo files as they are. Don't recolour, stretch or add a shadow. If something he needs isn't in the folder, ask TK. Don't make it in Canva. The brand guide's "never" section shows the four mistakes.

## 2. Re-check cadence

| When | What | Time |
|---|---|---|
| **Monthly** (first week) | Run `Machine/rollout-checklist.md` on last month's posts, both Martin's and ours. Log the result below. Rebuild a template if it fails twice. | ~15 min |
| **After every event** | Collect photos. If the event is worth showing, add a showcase post and, where it fits, a site case study. | as needed |
| **Quarterly** (Dec, Mar, Jun, Sep) | Site health: `next build`, crawl for broken links, check the contact details work, check the booking form reaches Martin, and check photos are current. Refresh the TK Studio portfolio case study if the site changed. | ~1 hr |
| **Yearly** (September, around Heritage Day and the engagement anniversary) | Brand review. Is the position still true? Are the four segments still roughly even? Any new proof points (events, press, numbers) to add to the platform? | ~half day |

## 3. Reopen triggers: what sends the work back

| If this happens | Go back to | Why |
|---|---|---|
| A culinary school or institution partnership becomes real | **Stage 3–4** for that audience | A new buyer with a different reason to buy. The Discovery wish becomes a segment. |
| One segment clearly dominates (e.g. weddings are most of the work) | **Stage 3** | The position was written for an even four-way split |
| A new service line, a partner or co-owner, or a name change | **Stage 3** | The position and platform may no longer describe the business |
| Anyone wants a new colour, a new font or a change to the logo | **Stage 6** | Identity changes only go through the stage that made it |
| New jackets are embroidered or merchandise is printed | **Stage 6 production check** | Known limit: the fork's tines and EST. 2017 are under the embroidery guideline (accepted 2026-09-24). Check the digitiser's proof before a run. |
| The printer says the finest line is above 0.2mm | **Stage 6 production check** | Minimum sizes in the guide assume 0.2mm |
| A template fails the checklist twice in a row | **Stage 7** | The template is wrong, not the post |
| Copy starts sounding unlike Martin (e.g. "it's not about the money" creeping back) | **Stage 5** | Voice rules in `05-verbal-identity.md` |

**Not reopen triggers:** finishing the two Stage 7 items below. They were waiting on information, not blocked by a flaw.

## 4. Open items carried from Stage 7

| Item | Waiting on | Then |
|---|---|---|
| Business card | `biggy@biggysmallzspitmasters.co.za` registered (TK and Martin). The phone number `064 850 4066` is still marked `[CONFIRM]` in `lib/site-config.ts` | Build the card, run the checklist, show TK |
| **Site email** | Same registration. **The live site publishes this address now**, and the September audit found it can't receive mail. Enquiries sent to it are being lost until it's registered. | Highest priority of the four |
| Testimonial template | A real client quote Martin is happy to publish | Build, checklist, show TK |
| Print floor | The printer confirms 0.2mm | Update the guide if it's different |

## 5. Gate: `rollout-checklist.md` re-run on recent output

**Recent output** means the 11 Heritage Day posters made 2026-09-24 (`brand/rollout/heritage-day-2026/`). They were made in a rush on the day. Stage 7 said *"each one passed the checklist when it was made"*. Re-run properly, **that claim was wrong on two checks.**

How it was measured: canvases read from the files, text heights measured from pixels (date ~24px, tagline ~34px, headline 84–114px, so three sizes), and contrast computed. Bone/Jacket Black 15.89, White/Red 8.01, Bone/Red 6.99, Jacket Black/Bone 15.89.

| Poster | 1 focal | 2 ≤3 sizes | 3 contrast | 4 grouping | 5 palette | 6 signature | 7 ≤5 info | 8 order | 9 type | 10 real | 11 canvas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A · IG 1080×1350 | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ rule under headline | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| A · square | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| A · story | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| B · Bone | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| C · split | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| D · logo only | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✓ none used | ✓ 3 | ✓ | ✗ | ✓ | ✓ |
| Biggy + meat · square | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| Biggy + meat · story | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| Redesign 1 · split | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| Redesign 2 · framed | ✓ | ✓ | ✓ 15.89 | ✓ | ✓ | ✓ none used | ✓ 4 | ✓ | ✗ | ✓ | ✓ |
| Redesign 3 · red box | ✓ | ✓ | ✓ 8.01 on red | ✓ | ✓ | ✗ | ✓ 4 | ✓ | ✗ | ✓ | ✓ |

**What failed and why:**

1. **Check 6, the signature element (9 of 11).** In the Stage 7 templates the red rule marks a call to action and nothing else. On the Heritage posters it sits under the headline as decoration, so the same element does two jobs.
   - **Call:** the rule stays reserved for the CTA, because the reusable templates are what Martin will post from week to week.
   - The posters are already out and the day has passed, so they aren't remade.
   - Next time, occasion posters get no rule, or one only under a CTA.
2. **Check 9, template type (11 of 11).** A holiday greeting isn't one of the five types (promo, testimonial, showcase, behind-the-scenes, full reveal), so it can't pass as written. **This is a gap in the checklist, not in the posters.**
   - **Proposed for TK:** add a sixth type to `Machine/rollout-checklist.md`, **"moment"**: a holiday or occasion greeting. Its rules: date, greeting, sign-off line and logo; no CTA needed.
   - **Added 2026-09-24** (TK: "do the rest"). Under the new type, the posters pass check 9.

**Gate result:** the re-run is done and its failures are recorded with a fix. Nothing that fails is being reused, so the gate passes.

### Re-check log
| Date | Scope | Result | Action |
|---|---|---|---|
| 2026-09-24 | 11 Heritage Day posters | 9 × ✗6, 11 × ✗9 | Rule reserved for CTA; "moment" type added to the checklist |
