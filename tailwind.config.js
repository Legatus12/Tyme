/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fafafa',
      silver: '#e3e4e5',
      black: '#121212',
      coal: '#424242',
      ash: '#dfdfdf',
      sunset: '#fad6a5',
      black: '#232323',
      gray: '#646464',
      lightgray: '#808080',
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}