/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#4682A9',
      },
      fontFamily:{
        'primary': ['Poppins']
      }
    },
  },
  plugins: [],
}

