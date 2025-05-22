/** @type {import('tailwindcss').Config} */

const appColors = require('./theme/colors.js');
const darkColors = require('./theme/colors.js');

module.exports = {
  content: [
    './App.{js,ts,tsx}', 
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
  ],
  safelist: [
    "bg-completed",
    "bg-reading",
    "bg-onhold",
    "bg-dropped",
    "bg-plantoread",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...appColors,
        dark: darkColors
      },
    },
  },
  plugins: [],
};
