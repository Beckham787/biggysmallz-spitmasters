# Content that needs the owner's confirmation

Nothing below is published as fact unless it is marked "live". Items are ordered by
how much they change what visitors read.

## 1. South Africa BBQ Festival — "Founder" (OFF on the preview)

- **Evidence for:** Tourism News Africa and Nova News / Eikestad Nuus both print
  "Festival founder Biggy Smallz will be joined by pitmasters and food personalities",
  for the festival on Saturday 10 October 2026 at Sandringham Farm, Stellenbosch.
  (Both read as the same press release; they are not two independent confirmations.)
- **Evidence against / missing:** the festival's own site (sabbqfestival.co.za) names
  no founder; an earlier note in the code said Biggy was *not attending* this year; the
  brand file says a credential that is not confirmed does not go out; the voice guide
  says Biggy's title is "Head Honcho", never "Founder".
- **Decision needed from Biggy:** is he the founder, and does he want it stated?
- **To publish:** set `founderConfirmed: true` in `lib/recognition.ts`. A third row,
  "Founder of the South Africa BBQ Festival · 10 October 2026 · Sandringham Farm,
  Stellenbosch", appears in the "On screen & on air" panel. Nothing else changes.
- The festival's logo stays in the small "Festivals" row either way (it was on the live
  site as "Catch me on").

## 2. Mozambique Barbecue Festival 2026 — did Biggy cook on 3 October?

The 2026 poster confirms his name on the line-up (announced as Churrasqueiro). Nothing
on file confirms he cooked there. The preview therefore says "announced as
Churrasqueiro" for 2026 and nothing about the day.
- "Five Years on Mozambique's Coals" and the 2022–2026 rail count 2026 as the fifth
  year. If he did not attend, change to four years (`YearRail.tsx`, headline in
  `RecognitionFeature.tsx`, `/work`, `/mozambique`, and the metadata).
- "Every October since 2022, Biggy has crossed into Maputo…" is existing site copy,
  kept; it covers 2026 by implication.
- If he did cook: send 2026 photographs and a one-line caption for a "2026" chapter.
- The Portuguese announcement text (Chapter I) is the festival's own caption, kept
  verbatim as TK instructed. The poster image still shows "Bilhetes: arena.co.mz"
  (tickets); the ticket button on the page was removed because the event has passed.

## 3. Television and radio credits — what exactly was the role?

| Credit | What the site now says | Evidence on file | Needed |
|---|---|---|---|
| The Ultimate Braai Master | "Season 7, as Team Biggy Smallz" | YouTube title "Team Biggy Smallz — Ultimate Braai Master Season 7" (brand research, verified) | Role in the show; episode/year |
| Come Dine With Me (SA) | "Appeared on the show" | Confirmed by TK, 2026-09-23; no detail | Season/year; role (contestant? guest?) |
| Rate My Plate | "Appeared on the show · Mzansi Magic" | Confirmed by TK; "Mzansi Magic (DStv 161)" is from an old code comment | Role; channel; year |
| Rise FM — Fun Food Friday | "The Affair With Tlotlang Moletsane · 3 July 2026", link to the episode | Config note and episode link | Whether he was guest or feature |

No one is described as a winner, finalist, judge or host. Add roles only with evidence.
A web search for these credits found nothing independent; the credits rest on TK's
confirmation and the YouTube title.

## 4. Jungle Oats profile (not used)

https://www.jungleoats.co.za/Health-Hub/Healthy-Hearts/Martin-Mhlongo-does-life-with-heart
says he distributed food parcels in Alexandra during lockdown. It is Jungle Oats'
brand content, so quoting or reusing its text or photos needs their permission, and its
tone ("passionate") is outside Biggy's voice. The site keeps its existing, deliberately
unattributed COVID line (no place, date or organisation). If Biggy wants the story
named, confirm the facts with him and ask Jungle Oats before linking or quoting.

## 5. Existing copy that conflicts with the brand voice (unchanged)

The About page bio says "celebrated South African chef, TV personality", "premier
spitbraai and catering company", "top-tier hospitality" and "passion". The voice guide
bans premium/world-class-style words and "passionate". The owner loves the site, so
this was left alone. Suggest a short rewrite in Biggy's own words.

## 6. Booking

- **Preview form:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` exists only for the Production
  environment, so a Preview deployment shows the friendly "That didn't send" message
  with WhatsApp and phone fallbacks instead of sending. This is deliberate-safe (a demo
  cannot email Biggy by accident) and was left as is. The form logic was tested locally
  with the network mocked.
- **Delivery not proven:** a real enquiry reaching Biggy's inbox has not been tested in
  this session. After release, send one test enquiry and confirm it arrives.
- **Deposit wording disagrees:** the FAQ says "A deposit secures your date"; the Book
  page's search description says "No deposit, no commitment". Which is true? (The form's
  success message says "no deposit, no commitment yet", about the enquiry.)
- **Phone and area:** `lib/site-config.ts` still marks the number 064 850 4066 and the
  service area `[CONFIRM]`.

## 7. Stories and assets

- Two case studies (WBHO, 7-year anniversary) still use stand-ins flagged `TODO` in `lib/case-studies.ts` (WBHO
  chicken and pilaf photos; the anniversary amuse-bouche has no photo).
- The "Ultimate Braaimaster" service tile uses a Mozambique lamb-spit photo flagged
  `TODO: replace with real photo`.
- Event dates on the stories are month and year only; add exact dates if Biggy wants
  them shown.
- Case-study titles contain private clients' names in the data (`title`); the site
  shows venue + occasion instead, as before. Do not surface `title`.

## 8. Upcoming appearances

None is announced, so the homepage says "Next appearance: none announced right now"
and points to Instagram. To add one, append an entry to `lib/appearances.ts` (ISO date);
it moves to "Previous" by itself after its date.
