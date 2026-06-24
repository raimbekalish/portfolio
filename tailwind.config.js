/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        dark: {
          50: "#eeeef2",
          100: "#d2d2dc",
          200: "#9393a8",
          300: "#6e6e86",
          400: "#4e4e66",
          500: "#2e2e44",
          600: "#1c1c30",
          700: "#141425",
          800: "#10101e",
          900: "#0b0b14",
          950: "#070710",
        },
      },
      animation: {
        "float-1": "float-1 7s ease-in-out infinite",
        "float-2": "float-2 9s ease-in-out 1s infinite",
        "float-3": "float-3 8s ease-in-out 2s infinite",
        "float-4": "float-4 10s ease-in-out 3s infinite",
        "float-5": "float-5 8s ease-in-out 0.5s infinite",
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
      keyframes: {
        "float-1": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(1deg)" },
        },
        "float-3": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-4": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-1deg)" },
        },
        "float-5": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
