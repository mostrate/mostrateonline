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
        "hero-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.5deg)" },
        },
        "hero-float-delayed": {
          "0%, 100%": { transform: "translateY(0) rotate(3deg)" },
          "50%": { transform: "translateY(-16px) rotate(1deg)" },
        },
        "hero-drift": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "hero-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(0.92)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "hero-float": "hero-float 6s ease-in-out infinite",
        "hero-float-delayed": "hero-float-delayed 7s 0.8s ease-in-out infinite",
        "hero-drift": "hero-drift 5s 0.5s ease-in-out infinite",
        "hero-glow": "hero-glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
