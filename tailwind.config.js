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
