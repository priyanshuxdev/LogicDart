/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      },
    },
  },
  plugins: [],
};
