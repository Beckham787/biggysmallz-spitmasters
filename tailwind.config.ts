import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stage 7 rollout (2026-09-24): the locked identity palette only
        // (brand-identity/README.md). The old token NAMES are kept so the
        // markup didn't all have to be rewritten; their VALUES are now the
        // five identity colours. Dark-led, like his chef jacket.
        //   Jacket Black #161517 · Charcoal #3F3F41 · Spitmasters Red #952926
        //   Bone #F4EFE6 · White #FFFFFF
        // Rule: red is a fill (buttons, rules, ribbon), never text on a dark
        // ground (2.27:1). Accent TEXT on dark is White ("paper").
        ink: "#161517",
        charcoal: "#161517",
        coal: "#3F3F41",
        "ember-deep": "#952926",
        ember: "#952926",
        "ember-bright": "#952926",
        flame: "#952926",
        gold: "#952926",
        cream: "#F4EFE6",
        "cream-dim": "#F4EFE6",
        paper: "#FFFFFF",
        smoke: "#F4EFE6",
        wood: "#3F3F41",
      },
      fontFamily: {
        // Oswald — the loud voice: headlines, eyebrows, nav, buttons.
        // Source Serif 4 — the quiet voice: everything you read.
        // Self-hosted from brand-identity/_build/fonts (SIL OFL).
        display: ["var(--font-display)", "Oswald", "Arial Narrow", "sans-serif"],
        serif: ["var(--font-display)", "Oswald", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "'Source Serif 4'", "Georgia", "serif"], // quoted: an unquoted name with a digit makes the whole declaration invalid CSS
      },
      letterSpacing: {
        stamp: "0.08em",
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        // Warm ember shadows for primary actions and lifted cards.
        // Never a neutral-grey drop shadow on this brand.
        ember: "0 12px 30px -12px rgba(149, 41, 38, 0.5)",
        "ember-lg": "0 22px 55px -18px rgba(149, 41, 38, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out both",
        fade: "fade 1.1s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
