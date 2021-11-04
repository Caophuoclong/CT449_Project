module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "128": "32rem",
      },
      backgroundColor: theme =>({
        "nord0": "#2E3440",
        "nord1": "#3B4252",
        "nord2": "#434C5E",
        "nord3": "#4C566A",
      })
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
