/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          600: "#ec4899",
          700: "#be185d",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
