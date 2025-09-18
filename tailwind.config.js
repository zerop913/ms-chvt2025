/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Championship color palette based on the logo
        chvt: {
          orange: {
            50: "#fff7ed",
            100: "#ffedd5",
            200: "#fed7aa",
            300: "#fdba74",
            400: "#fb923c",
            500: "#f97316", // Main orange from logo
            600: "#ea580c",
            700: "#c2410c",
            800: "#9a3412",
            900: "#7c2d12",
          },
          black: {
            50: "#f8f8f8",
            100: "#e5e5e5",
            200: "#d4d4d4",
            300: "#a3a3a3",
            400: "#737373",
            500: "#525252",
            600: "#404040",
            700: "#262626",
            800: "#171717",
            900: "#0a0a0a", // Deep black from logo
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "chvt-gradient":
          "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
        "chvt-dark": "linear-gradient(135deg, #171717 0%, #0a0a0a 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "chevron-slide": "chevronSlide 8s ease-in-out infinite",
        "glow-orange": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
