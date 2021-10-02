module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '30-rem': '30rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
