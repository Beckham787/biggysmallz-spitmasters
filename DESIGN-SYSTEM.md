# Biggy Smallz Spitmasters — Design System

A warm, premium-rustic, fire-lit visual language for a chef-led spitbraai &
private-dining business. The goal of every page: make the food irresistible and
make booking a single, obvious step.

Generated with the `ui-ux-pro-max` design framework (rule categories 1–10),
applied to the existing Next.js + Tailwind stack.

---

## 1. Brand feeling

**Fire-lit, generous, hand-made, premium-rustic.** Dark like a room lit by
coals — but never cold. Warmth comes from ember glows, wood tones, cream type,
and food photography that is always the brightest thing on the screen.

Anti-patterns to avoid: flat pure-black panels, cold grey-on-grey, stocky
corporate gloss, emoji icons, prices-on-a-page (the brand sells a conversation).

---

## 2. Colour

Tokens live in `tailwind.config.ts`. Semantic intent:

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0b0a09` | Page base — near-black, the darkest surface |
| `charcoal` | `#15110f` | Raised section surface |
| `coal` | `#1d1815` | Cards, inputs, the warmest dark surface |
| `ember` | `#c1432d` | Primary action / accent — the fire |
| `ember-bright` | `#e0673f` | Hover / eyebrow / focus — flame highlight |
| `cream` | `#f3eadd` | Primary text and headings (≈14:1 on ink) |
| `cream-dim` | `#cabfb0` | Secondary text (≈9:1 on ink) |
| `smoke` | `#8a807a` | Tertiary / fine print (≈5.6:1 on ink — AA) |
| `wood` | `#4a3527` | Warm tonal accents, glows |

**Warmth layer (new):** dark text-only sections carry a low-opacity radial
*ember glow* (`.glow-top`, `.glow-center`) so they feel lit by fire, not painted
black. CTA bands use a stronger `.glow-ember` pool.

**Rule:** food photography is always the highest-contrast, most saturated thing
in view. UI chrome stays warm-dark and recedes.

---

## 3. Typography

- **Display** — Oswald (condensed, uppercase, `tracking-stamp` 0.18em). Echoes
  the stamped logo lettering. Headings, eyebrows, buttons, nav.
- **Body** — Spectral (warm serif). Restrained-luxury reading text.

Type scale (px): 12 · 14 · 16 · 18 · 20 · 24 · 32 · 48 · 60 · 72.
Body 16–20px, line-height 1.5–1.75, measure capped at `max-w-prose` (65ch).
Weights: headings 600–700, body 300–400, labels/eyebrows 500–600.
Use `tabular-nums` for index numbers and any figures.

---

## 4. Spacing & layout

- 4 / 8 px rhythm. Section vertical padding tiers: `py-20` / `py-24` / `py-28` /
  `py-32`.
- `.section` = `max-w-6xl` centered, `px-6 sm:px-8`.
- Breakpoints: 375 / 640 / 768 / 1024 / 1280. Mobile-first; cards stack to 1-col.
- Fixed nav reserves hero top padding; floating mobile CTA respects safe-area.

---

## 5. Effects & motion

- Radius: `rounded-sm` everywhere (rustic, not pill-soft).
- Texture: CSS film `grain` over dark sections; `photo-veil` keeps text legible
  on imagery.
- Shadows: warm ember shadows (`shadow-ember`, `shadow-ember-lg`) for primary
  actions and lifted cards — never neutral-grey drop shadows.
- Motion: 150–300ms, transform/opacity only. Buttons & cards lift `-translate-y`
  on hover; images scale to 1.05. `Reveal` fades content up on scroll. All
  motion honours `prefers-reduced-motion`.

---

## 6. Components

- **Primary CTA** `.btn-ember` — ember fill, stamped label, warm shadow, hover
  lift + brighten. One primary CTA per screen.
- **Secondary** `.btn-ghost` — cream hairline outline, fills faintly on hover.
- **Cards** — `coal` surface or image tile with `from-ink` gradient + bottom-set
  text; ember hairline that warms on hover; lift on hover.
- **Forms** — visible stamped labels, `coal` fields, ember focus border,
  inline validation, calm success state. Never placeholder-only labels.
- **Floating mobile CTA** — persistent WhatsApp/Book affordance on small screens.

---

## 7. Conversion principle

Every page ends in a warm CTA band, and booking is never more than one tap away
(nav button on desktop, floating button on mobile). The message is consistent:
*tell Biggy about your day, and he'll cook it* — low-commitment, conversational.
