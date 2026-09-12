# 10 · Identity — Biggy Smallz Spitmasters

The mark. Built by TK Studio, September 2026, from the approved routes in
`../09-mark-routes/` — **Route B as the wordmark, Route A as the icon.**
Route C (the seal) is parked and was not built.

**Start here:** open `brand-guide.html` in a browser. It works offline and on
a phone; the fonts are inside the file.

---

## What to grab in a hurry

| You need | Use |
|---|---|
| Instagram / WhatsApp profile picture | `social/profile-ember-1080.png` |
| Bio copy for both | `bios.md` |
| A logo for a poster, apron, banner | `svg/lockup-stacked-bone.svg` (or `-charcoal` on light) |
| A logo for Canva or WhatsApp | `png/…-2048.png` |
| Website tab icon | everything in `favicon/` |
| Anything going to a printer or embroiderer | the `svg/` files, single-ink variant |

---

## The folders

**`svg/`** — every mark as vector. Three colourways each:

- `-bone` — Bone White (#F3E8D5) type, ember rule. For dark backgrounds.
- `-charcoal` — Charcoal (#171412) type, ember rule. For light backgrounds.
- `-single` — one colour, `currentColor`. Opens black in a viewer; inherits
  the CSS `color` when inlined in a web page; a printer or embroiderer sets
  the ink themselves. **This is the file for embroidery, woven labels,
  screen print, foil and engraving.**

Five shapes:

| File | What it is |
|---|---|
| `spit-icon-*` | The Spit, standard cut. 40px and up. |
| `spit-icon-small-*` | Reduction cut — thicker rod, bigger forms. 20–40px. |
| `spit-icon-condensed-*` | Shorter rod so it holds inside a square. **Favicon and app icon only — never the logo.** |
| `wordmark-stacked-*` | Primary wordmark, three lines locked to one width. |
| `wordmark-horizontal-*` | For wide, shallow spaces. |
| `lockup-stacked-*` | Spit above the stacked wordmark. |

All wordmark text is **converted to outlined paths** — the logo never depends
on Fraunces being installed. Editable live-text copies are in
`svg/_working/`; those need the font and are not for production.

**`png/`** — the five shapes in bone and charcoal at 512, 1024 and 2048 px
wide, transparent background. No PNG of the single-ink variant on purpose: a
one-colour file exists so somebody else can choose the colour, which a
flattened raster takes away.

**`social/`** — 1080×1080, ready to paste.
`profile-ember-1080.png` is the one to use. `profile-charcoal-1080.png` is
the alternate. `_circle-crop-check.png` is the proof that both survive the
circle crop down to 28 px, each shown on the UI colour it will sit against.

**`favicon/`** — 16, 32, 48, `favicon.ico`, `favicon.svg`, and
`apple-touch-icon-180.png`. Bone on charcoal. The small sizes use the
condensed cut; the 180 px app icon uses the small cut.

**`brand-guide.html`** — the single-file guide. Mark, lockups, clear space,
minimum sizes, palette with the application ratio, type, and the four things
never to do. Self-contained: no network, no external fonts, opens on a phone.

**`bios.md`** — Instagram and WhatsApp copy with verified character counts.

---

## Rebuilding

Everything here is generated. Don't hand-edit the SVGs or the guide — edit
the source and re-run.

```
cd _build
python build_marks.py      # svg/ — marks and outlined wordmarks
node   render_assets.mjs   # png/, social/, favicon/
python build_ico.py        # favicon/favicon.ico from the rendered PNGs
python build_guide.py      # ../brand-guide.html from guide.src.html
```

Requires `fonttools`, `uharfbuzz`,
`brotli`, `pillow`, and Playwright — resolved from the `imago-dei` repo's
`node_modules` via the `PW_HOST` constant in the `.mjs` scripts.

`_build/fonts/` holds static Fraunces 900 and Archivo instances pulled from
the Google Fonts API. They are build inputs, not deliverables.

---

## Decisions taken during the build

Three proportions the brief fixed at one number each were rendered as options
and chosen by TK on 2026-09-12:

- **Profile picture: the spit at 68% of canvas width**, not the briefed 42%.
  At 42% the rod reads as a hairline at 40 px, which is where a WhatsApp
  contact list actually shows it.
- **Combined lockup: the spit at 68% of the wordmark width**, not 60%.
- **A condensed favicon cut was added.** The standard mark is 3.7:1 and
  nearly vanishes at 16–32 px. The condensed cut is 2.4:1 and sits ~40%
  larger in the same square. It is a favicon cut only and does not change the
  logo.

## Two things to know before the next pass

- **Type.** The guide documents **Fraunces 900 + Archivo** as the type
  system. The live site still runs the previous pairing (Oswald / Montserrat)
  from `../04-colour-type-system/`, and that document has not been updated.
  Rolling the new type across the site is scheduled separately.
- **Palette.** Unchanged, and the site was not touched. One addition: the
  guide documents **#8C857E** as the on-screen tint for secondary text,
  because Ash Grey (#77716A) measures 3.8:1 on Charcoal — under the 4.5:1
  floor. `04-colour-type-system` flags the problem but gives no replacement.
