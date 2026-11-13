/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#EEF5FF", 100: "#D9E8FF", 600: "#1565D8", 700: "#0F52B3", 900: "#0C2C57" },
      },
      fontFamily: { sans: ["var(--font-arabic)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
