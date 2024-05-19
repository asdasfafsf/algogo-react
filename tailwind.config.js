/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 

export default withMT({
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extends: {
      screens: {
        'ssm': { max: '540px', min: '540px'},
        'ssmd': '540px', //
      },
      transitionProperty: {
        'left': 'left',
        'height': 'height'
      }
    },
    customContainer: (theme) => ({
      DEFAULT: {
        maxWidth: '100%',
        '@screen sm': {
          maxWidth: '640px',
        },
        '@screen md': {
          maxWidth: '768px',
        },
        '@screen lg': {
          maxWidth: '1024px',
        },
        '@screen xl': {
          maxWidth: '1280px',
        },
      },
    }),
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
  plugins: [function ({ addComponents }) {
    addComponents({
      '.custom-container': {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@screen sm': {
          maxWidth: '640px',
        },
        '@screen md': {
          maxWidth: '768px',
        },
        '@screen lg': {
          maxWidth: '1024px',
        },
        '@screen xl': {
          maxWidth: '1280px',
        },
      },
    });
  },],
});

