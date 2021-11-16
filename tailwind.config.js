module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridColumn: {
        'span-16': 'span 16 / span 16',
       },
       gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
       }
    },
  },
  variants: {
    extend: {
      gridColumn: ['responsive', 'hover'],
      tableLayout: ['hover', 'focus'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ]
}
