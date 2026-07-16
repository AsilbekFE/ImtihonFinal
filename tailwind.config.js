/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#06B6D4",
        dark: "#0D0D1A",
        darker: "#07070F",
        card: "#13132A",
        border: "#1E1E3A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

    },
  },
  plugins: [],
}
