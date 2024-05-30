/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/index.html"],
  darkMode:"class",
  theme: {
    extend: {
      radius: {
        threeRadius: '24rem',
      },
    },
  },
  plugins: [],
}