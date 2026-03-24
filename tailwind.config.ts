import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vw: {
          plum: "var(--vw-plum)",
          "plum-2": "var(--vw-plum-2)",
          lavender: "var(--vw-lavender)",
          lilac: "var(--vw-lilac)",
          blush: "var(--vw-blush)",
          rose: "var(--vw-rose)",
          peach: "var(--vw-peach)",
          "hot-pink": "var(--vw-hot-pink)",
          "electric-pink": "var(--vw-electric-pink)",
          magenta: "var(--vw-magenta)",
          wine: "var(--vw-wine)",
          cream: "var(--vw-cream)",
          "soft-white": "var(--vw-soft-white)",
          ink: "var(--vw-ink)",
          white: "var(--vw-white)",
          obsidian: "var(--vw-obsidian)",
          charcoal: "var(--vw-charcoal)",
          "neon-pink": "var(--vw-neon-pink)",
          "neon-blue": "var(--vw-neon-blue)",
          "neon-violet": "var(--vw-neon-violet)",
          bg: "var(--vw-bg)",
          card: "var(--vw-card)",
          border: "var(--vw-border)",
          text: "var(--vw-text)",
          muted: "var(--vw-muted)",
        },
      },
      backgroundImage: {
        "vw-hero": "var(--vw-grad-hero)",
        "vw-plum": "var(--vw-grad-plum)",
        "vw-magenta": "var(--vw-grad-magenta)",
        "vw-rose": "var(--vw-grad-rose)",
        "vw-ink": "var(--vw-grad-ink)",
        "vw-glow": "var(--vw-grad-glow)",
      },
      boxShadow: {
        "vw-glow": "0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 50px rgba(255, 74, 209, 0.28)",
        "vw-soft": "0 20px 80px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        "vw-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "vw-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "vw-float": "vw-float 8s ease-in-out infinite",
        "vw-pulse": "vw-pulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
