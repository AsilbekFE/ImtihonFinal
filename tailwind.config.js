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
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0D0D1A 0%, #1a0533 50%, #0D0D1A 100%)",
        "card-gradient": "linear-gradient(135deg, #13132A 0%, #1a1a35 100%)",
        "btn-gradient": "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
      },
    },
  },
  plugins: [],
}
