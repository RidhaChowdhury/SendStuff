/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#31363F',
        accent: '#76ABAE',
        light: '#EEEEEE',
      },
    },
  },
  plugins: [],
};
