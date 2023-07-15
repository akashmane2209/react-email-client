/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Outfit", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        background: "#f4f5f9",
        border: "#cfd2dc",
        accent: {
          DEFAULT: "#e54065",
          100: "#fde6e9",
        },
        border: "#cfd2dc",
        foreground: "#636363",
        filterBtn: "#e1e4ea",
        readbackground: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
