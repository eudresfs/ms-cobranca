/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f6ff',
          100: '#dce8ff',
          200: '#b9d1ff',
          300: '#8cb3ff',
          400: '#5a8cff',
          500: '#3268ff',
          600: '#1748e6',
          700: '#1137b3',
          800: '#102f8c',
          900: '#142b6d',
        },
        accent: '#22c55e',
        surface: '#0b1120',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
