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
        // Deep charcoal / near-black base
        ink: "#0b0a09",
        charcoal: "#15110f",
        coal: "#1d1815",
        // Ember orange-red accent (from the SPITMASTERS banner)
        ember: "#c1432d",
        "ember-bright": "#e0673f",
        // Warm cream / off-white for text and space
        cream: "#f3eadd",
        "cream-dim": "#cabfb0",
        // Optional smoke-grey + wood-brown
        smoke: "#8a807a",
        wood: "#4a3527",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "Spectral", "serif"],
      },
      letterSpacing: {
        stamp: "0.18em",
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        // Warm ember shadows for primary actions and lifted cards.
        // Never a neutral-grey drop shadow on this brand.
        ember: "0 12px 30px -12px rgba(193, 67, 45, 0.5)",
        "ember-lg": "0 22px 55px -18px rgba(193, 67, 45, 0.55)",
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
