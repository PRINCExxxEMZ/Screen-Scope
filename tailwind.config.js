/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        custom: ['NunitoFont', 'sans-serif'], // Fix syntax and add fallback
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

