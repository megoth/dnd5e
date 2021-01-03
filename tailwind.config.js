const pluginForms = require("@tailwindcss/forms");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class", // or "media" or false
  theme: {
    fontFamily: {
      sans: ["'Raleway'", "sans-serif"],
      serif: ["'Zilla Slab'", "serif"],
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      transitionProperty: {
        left: "left",
        right: "right",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [pluginForms],
};
