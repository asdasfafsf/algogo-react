/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 

export default withMT({
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    screens: {
      'ssm': '0px', // 'ssm' 브레이크포인트를 원하는 값으로 정의합니다.
      'ssmd': '540px', // 
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      },
    colors: {
      ruby: '#ff0062',
      diamond: '#01b5fc',
      platinum: '#26e2a5',
      gold: '#ec9a00',
      silver: '#425e7a',
      bronze: '#ad5701',
      // bronze: {
      //   default: '#ad5701',
      //   100: '#ffe6cc',
      //   200: '#ffd9b3',
      //   300: '#fecc9a',
      //   400: '#febf80',
      //   500: '#feb367',
      //   600: '#fea64d',
      //   700: '#fe8c1b',
      //   800: '#e47301',
      //   900: '#ad5701',
      // },
    },
    extend: {},
  },
  plugins: [],
});

