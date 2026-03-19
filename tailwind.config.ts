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
          lavender: "var(--vw-lavender)",
          blush: "var(--vw-blush)",
          rose: "var(--vw-rose)",
          peach: "var(--vw-peach)",
          cream: "var(--vw-cream)",
          ink: "var(--vw-ink)",
          white: "var(--vw-white)",
          "neon-pink": "var(--vw-neon-pink)",
          "neon-blue": "var(--vw-neon-blue)",
          "neon-violet": "var(--vw-neon-violet)",
          night: "var(--vw-night)",
          "night-2": "var(--vw-night-2)",

          bg: "var(--vw-bg)",
          card: "var(--vw-card)",
          border: "var(--vw-border)",
          text: "var(--vw-text)",
          muted: "var(--vw-muted)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
