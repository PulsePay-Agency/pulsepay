import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        // Brand tokens
        ink: {
          50:  "#F0F0FF",
          100: "#E0E1FF",
          200: "#C5C6FE",
          300: "#A4A5FD",
          400: "#8184F8",
          500: "#6366F1",  // primary indigo
          600: "#4F52D9",
          700: "#3E40B8",
          800: "#2E3090",
          900: "#1E2068",
          950: "#0D0E40",
        },
        gold: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",  // accent amber
          600: "#D97706",
        },
        jade: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        surface: {
          0:   "var(--surface-0)",
          1:   "var(--surface-1)",
          2:   "var(--surface-2)",
          3:   "var(--surface-3)",
        },
        border: "var(--border-color)",
        foreground: "var(--fg)",
        muted: "var(--fg-muted)",
        faint: "var(--fg-faint)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ticker-in": {
          "0%":   { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0"  },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        "slide-in-right": {
          "0%":   { transform: "translateX(24px)", opacity: "0" },
          "100%": { transform: "translateX(0)",    opacity: "1" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in":        "fade-in 0.5s ease both",
        "fade-up-delay":  "fade-up 0.6s 0.15s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up-delay2": "fade-up 0.6s 0.3s cubic-bezier(0.22,1,0.36,1) both",
        shimmer:          "shimmer 2.2s linear infinite",
        float:            "float 4s ease-in-out infinite",
        "spin-slow":      "spin-slow 12s linear infinite",
        pulse2:           "pulse2 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.22,1,0.36,1) both",
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":   "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
        "gradient-gold":    "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        "gradient-surface": "linear-gradient(180deg, var(--surface-1) 0%, var(--surface-0) 100%)",
        "noise":            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "glow-ink":  "0 0 0 1px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.2)",
        "glow-gold": "0 0 0 1px rgba(245,158,11,0.3), 0 0 30px rgba(245,158,11,0.15)",
        "glow-jade": "0 0 0 1px rgba(16,185,129,0.3), 0 0 30px rgba(16,185,129,0.15)",
        "card":      "0 1px 3px rgba(0,0,0,0.12), 0 4px 24px rgba(0,0,0,0.08)",
        "card-lg":   "0 4px 6px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.12)",
        "card-dark": "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 32px rgba(0,0,0,0.4)",
        "lift":      "0 8px 32px rgba(0,0,0,0.24), 0 1px 0 rgba(255,255,255,0.06) inset",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
