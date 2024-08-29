/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1332px",
      },
    },
    fontFamily: {
      // Inter
      "inter-light": ["Inter Light", "sans-serif"],
      "inter-regular": ["Inter Regular", "sans-serif"],
      "inter-medium": ["Inter Medium", "sans-serif"],
      "inter-semibold": ["Inter Semibold", "sans-serif"],
      "inter-bold": ["Inter Bold", "sans-serif"],
      // Montserrat
      "montserrat-light": ["Montserrat Light", "sans-serif"],
      "montserrat-regular": ["Montserrat Regular", "sans-serif"],
      "montserrat-medium": ["Montserrat Medium", "sans-serif"],
      "montserrat-semibold": ["Montserrat Semibold", "sans-serif"],
      "montserrat-bold": ["Montserrat Bold", "sans-serif"],
      // OpenSans
      "open-sans-light": ["OpenSans Light", "sans-serif"],
      "open-sans-regular": ["OpenSans Regular", "sans-serif"],
      "open-sans-medium": ["OpenSans Medium", "sans-serif"],
      "open-sans-semibold": ["OpenSans Semibold", "sans-serif"],
      "open-sans-bold": ["OpenSans Bold", "sans-serif"],
    },
    extend: {
      colors: {
        white: "rgba(255, 255, 255, 1)",
        black: "rgba(0, 0, 0, 1)",
        primary: "rgba(23, 25, 62, 1)",
        "primary-focused": "rgba(23, 15, 102, 1)",
        stroke: "rgba(210, 210, 219, 1)",
        "stroke-20": "rgba(210, 210, 219, 0.2)",
        error: "rgba(255, 78, 71, 1)",
        "t-black": "rgba(23, 25, 62, 1)",
        "t-gray": "rgba(131, 132, 153, 1)",
        "accent-red": "rgba(237, 48, 28, 1)",
        "green-light": "rgba(207, 255, 223, 1)",
        "blue-light": "rgba(79, 255, 255, 1)",
        yellow: "rgba(241, 255, 85, 1)",
        pink: "rgba(252, 216, 255, 1)",
      },
      fontSize: {
        xs: ["0.75rem", "14px"],
        sm: ["0.875rem", "18px"],
        base: ["1rem", "19px"],
        lg: ["1.125rem", "24px"],
        xl: ["1.25rem", "24px"],
        "2xl": ["1.5rem", "28px"],
        "4xl": ["2.5rem", "48px"],
      },
      boxShadow: {
        "shadow-primary": "0px 0px 4px rgba(37, 99, 235, 1)",
        "shadow-error": "0px 0px 4px red",
        "shadow-gray": "0px 0px 14px 0px rgba(23, 25, 62, 0.05)",
      },
    },
  },
  plugins: [],
}
