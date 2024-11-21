import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        textDark: "var(--textDark)",
        textLight: "var(--textLight)",
        coffeePink: "var(--coffeePink)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        archivo: ["var(--font-archivo)"],
      },
      animation: {
        "fade-in": "fadeIn 1500ms ease-in-out",
        gradient: "gradient 1s linear",
        "spin-infinity": "spinInfinity 10s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradient: {
          "0%": { background: "#ffeb3b", backgroundPosition: "0% 50%" },
          "80%": { background: "#4caf50", backgroundPosition: "100% 50%" },
          "100%": { background: "transparent" },
        },
        spinInfinity: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        }
       
      },
      backgroundSize: {
        "gradient-size": "400% 400%",
      },
    },
  },
  plugins: [],
} satisfies Config;
