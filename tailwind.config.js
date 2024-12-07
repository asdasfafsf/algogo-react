// tailwind.config.js
const plugin = require('tailwindcss/plugin');

export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: { 
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
      transitionProperty: {
        'left': 'left',
        'height': 'height',
      },
      fontFamily: {
        'WavvePADO-Regular': ['WavvePADO-Regular'],
        'D2Coding': ['D2Coding'],
        'x': ['Noto Sans KR', 'sans-serif'],
        'default': ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        ruby: '#ff0062',
        diamond: '#01b5fc',
        platinum: '#26e2a5',
        gold: '#ec9a00',
        silver: '#425e7a',
        bronze: '#ad5701',
      },
    },
  },
};