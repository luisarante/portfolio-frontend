/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        content: "#2B2B2B",
        background: "#F3F3F3",
        surface: "#1B1B1B",
        primary: "#111111",
        linkedin: "#0077B5",
        github: "#080808",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}