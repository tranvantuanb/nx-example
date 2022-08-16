const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  presets: [require('../../tailwind-workspace.js')],
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#ff5722',
        secondary: '#38bdf8',
        indigo: {
          ...colors.indigo,
        },
        blue: {
          ...colors.blue,
        },
      },
    },
  },
  plugins: [],
};
