/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    animation: {
      'text-gradient': 'text-gradient 3s linear infinite',
    },
    keyframes: {
      'text-gradient': {
        to: { backgroundPosition: '200% center' },
      }
    }
  }
},
  plugins: [],
}