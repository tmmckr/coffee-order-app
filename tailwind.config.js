/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          900: '#3e2723', // Dunkles Braun
          800: '#4e342e',
          600: '#6d4c41',
          400: '#8d6e63',
          100: '#d7ccc8', // Creme
          gold: '#d4a373' // Akzentfarbe
        }
      }
    },
  },
  plugins: [],
}