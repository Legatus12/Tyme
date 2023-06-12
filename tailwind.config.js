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
      ash: '#f0f0f0',
      sunset: '#fad6a5',
      midDay: '#fcddb4',
      black: '#232323',
      darkgray: '#646464',
      gray: '#808080',
      lightgray: '#c8c8c8',
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}