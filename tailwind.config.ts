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
        bg: "#0F1117",
        surface: "#1A1D27",
        content: "#F0EEE9",
        muted: "rgba(240,238,233,0.5)",
        accent: "#4F7FFF",
        "accent-dim": "rgba(79,127,255,0.13)",
        line: "rgba(240,238,233,0.1)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmsans: ["var(--font-dmsans)", "sans-serif"],
        // Serif itálica de acento para palabras destacadas de la landing.
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      maxWidth: {
        shell: "clamp(280px, 92vw, 1760px)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
