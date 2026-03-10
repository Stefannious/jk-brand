/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F2ED',
        'gray-light': '#E8E4DF',
        'gray-mid': '#C4BDB5',
        graphite: '#4A4440',
        ink: '#1A1614',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      transitionDuration: {
        400: '400ms',
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
    },
  },
  plugins: [],
}
