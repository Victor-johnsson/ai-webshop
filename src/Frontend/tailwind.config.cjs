module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#CBA6F7', // Catppuccin Mauve
          500: '#CBA6F7',
          600: '#A77EE6',
          700: '#8A5BD4',
        },
        cp: {
          mauve: '#CBA6F7',
          base: '#1E1B28',
          surface: '#1F1D2E',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
