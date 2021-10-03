module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '40-rem': '40rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
