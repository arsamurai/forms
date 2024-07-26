/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1200",
      },
    },
    colors: {
      white: "rgba(255, 255, 255, 1)",
      black: "rgba(0, 0, 0, 1)",
    },
    extend: {},
  },
  plugins: [],
}
