/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#F59E0B",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],

};

