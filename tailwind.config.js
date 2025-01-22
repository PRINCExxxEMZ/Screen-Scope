/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'], // Nunito setup
        ubuntu: ['Ubuntu', 'sans-serif'], // Ubuntu setup
      },
      colors: {
        'custom-border': '#C4B4A5',

        'gradient-start': '#ff7e5f', // Starting color
        'gradient-middle': '#feb47b', // Middle color
        'gradient-end': '#ff6f61'    // Ending color
      },
    },
  },
  plugins: [],
};

