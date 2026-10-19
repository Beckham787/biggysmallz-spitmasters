# Latest: after each Instagram post (five minutes)

Martin agreed Instagram is the gateway to the website, so every event or post
on @biggysmallzspitmasters gets a matching entry on the site, the same day or
the next. This is the checklist for TK or any agent. The site is **guarded**:
a feature branch and a Vercel preview only. TK releases to production.

## 0 · Have these before you start

- [ ] The post's link: on the post, **… → Copy link**. Never guess one; if you
      don't have it, leave `instagramUrl` out and say so in the hand-off.
- [ ] The date of the event or post.
- [ ] Martin's caption (dish names, the occasion). Dish names are copied
      **verbatim**.
- [ ] 1–4 photos. Camera originals sent on WhatsApp as **Document** if
      possible. No guests' faces unless Martin has said it's fine.

## 1 · Branch (1 min)

```bash
cd "C:/Users/takal/TK Studio/Clients/Biggy Smallz Spitmasters/site"
git fetch origin
git switch -c feat/latest-YYYY-MM-DD <commit production serves>
```

Branch from the commit production actually serves (Vercel → the project →
Production deployment → its commit), not from a stale local branch. Never
commit to `master`.

## 2 · Photos (1 min)

```bash
node scripts/latest-photos.mjs 2026-11-02-wedding "C:/path/IMG_1201.jpg=plated-lamb" "C:/path/IMG_1207.jpg=carving-board"
```

Folder: `YYYY-MM-DD-occasion`. Name each file for what is in the frame. The
script makes each file 1200 px or smaller, 300 KB or less, with no location
data, and prints the paths to paste.

## 3 · The entry (2 min)

Open `lib/latest.ts` and add an entry anywhere in `entries`. The list sorts
itself by date.

```ts
{
  slug: "2026-11-02-wedding",
  date: "2026-11-02",
  dateLabel: "2 November 2026",
  kind: "event",                  // or "post"
  title: "Short, about the food",
  occasion: "Wedding",            // occasion type only, never a client's name
  line: "One sentence in Biggy's voice.",
  images: [
    { src: "/images/latest/2026-11-02-wedding/plated-lamb.jpg", alt: "What is in the frame, in a sentence." },
  ],
  instagramUrl: "https://www.instagram.com/p/XXXXXXXXXXX/",   // the copied link
  // href: "/work/<slug>",        // only if a case study exists
  // dishes: ["Martin's names", "verbatim"],
  // servedAs: "a Seven Colours plate",
},
```

Rules: only state what is evidenced (Martin's caption or a confirmed fact).
No private client names, no prices or "per person", no guest numbers or
venue unless he named it. Never: passionate, premium, bespoke, world-class,
hands-on. Nothing like "new" or "this week"; the date does that job. For a
memorial, keep the line respectful. The first photo is the card photo.

## 4 · Checks (1 min)

```bash
npm run check:latest
npx tsc --noEmit
npm run build
```

`check:latest` needs Node 22.18 or newer (`node --version`). It fails on a
stale newest entry (over 30 days), a date label
that doesn't match the date, a missing or oversized photo, short alt text,
a banned word, or a malformed Instagram link. It warns when `instagramUrl` is
missing. Stop any `next dev` server before `npm run build`.

## 5 · Preview and hand-off

```bash
git add lib/latest.ts public/images/latest
git commit -m "Latest: <occasion>, <date>"
git push -u origin HEAD
```

Vercel builds a **preview** for the branch. Open its `/` and `/latest` on a
phone, check the card and the photos, then hand TK the preview link with one
line: what was added and anything still `[CONFIRM]`. Add a line to the
client's `engagement-log.md` and to
`Office/handoffs/Biggy-Smallz-Spitmasters-Digital-Management.md`.
**Do not merge, promote or push to `master`.** Production is TK's release.

## Monthly Keep sweep

Run `npm run check:latest` against the branch production serves. A failure
means the site has fallen behind Instagram: ask TK which posts are missing.

## Later: an automated feed

Not built, on purpose: there is no account access, and Meta's embed script
costs load time and visitors' privacy. If Martin's account becomes a
Business account with API access, a build-time fetch can map posts into the
same `LatestEntry` shape (see the header of `lib/latest.ts`). Until then this
checklist is the feed.
