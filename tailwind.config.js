/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        xl: "1600px",
      },
    },
    screens: {
      xs: "380px",
      mobile: "574px",
      md: "768px",
      desktop: "992px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
