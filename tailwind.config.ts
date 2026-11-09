import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border, 217 33% 20%))",
        input: "hsl(var(--input, 217 33% 18%))",
        ring: "hsl(var(--ring, 186 100% 42%))",
        background: "hsl(var(--background, 222 47% 8%))",
        foreground: "hsl(var(--foreground, 210 40% 98%))",
        industrial: {
          dark: "#0b0f19",
          panel: "#121826",
          card: "#1a2234",
          border: "#232f48",
          muted: "#64748b",
          siemens: "#009999",
          rockwell: "#dc2626",
          schneider: "#3dcd58",
          amber: "#f59e0b",
          ledGreen: "#10b981",
          ledRed: "#ef4444",
          ledBlue: "#3b82f6",
          terminal: "#0f172a",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 187 100% 42%))",
          foreground: "hsl(var(--primary-foreground, 222 47% 11%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 217 33% 17%))",
          foreground: "hsl(var(--secondary-foreground, 210 40% 98%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 210 40% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 217 33% 18%))",
          foreground: "hsl(var(--muted-foreground, 215 20% 65%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 217 33% 22%))",
          foreground: "hsl(var(--accent-foreground, 210 40% 98%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 222 47% 11%))",
          foreground: "hsl(var(--popover-foreground, 210 40% 98%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 222 47% 11%))",
          foreground: "hsl(var(--card-foreground, 210 40% 98%))",
        },
      },
      borderRadius: {
        lg: "0.6rem",
        md: "calc(0.6rem - 2px)",
        sm: "calc(0.6rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Cairo", "IBM Plex Sans Arabic", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
