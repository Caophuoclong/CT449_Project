module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "128": "32rem",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["focus", "hover", "active"],
      display: ["responsive", "hover", "focus", "group-hover"],
    },
  },
  plugins: [],
}
