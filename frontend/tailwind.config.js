module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '40-rem': '40rem',
        "90p" : "90%",
        "95p" : "95%",
      },
      height:{
        "80p": "80%",
        "90p": "90%",
        "95p" :"95%",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      display: ["group-hover"],
      ringWidth: ["hover", "focus", "active", "group-focus"],
    },
  },
  plugins: [],
}
