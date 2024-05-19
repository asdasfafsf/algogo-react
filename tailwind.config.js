/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require('tailwindcss/plugin');

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
      },
      
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
    },
    extend: {},
  },
<<<<<<< HEAD
  plugins: [function ({ addComponents }) {
=======
  plugins: [plugin(function({ addComponents, theme }) {
    const screens = theme('screens', {});

>>>>>>> 3b3813249cf20da3763b52d9c1d8974fe91b128b
    addComponents({
      '.custom-container': {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
<<<<<<< HEAD
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
=======
        paddingLeft: theme('spacing.4'),
        paddingRight: theme('spacing.4'),
        '@screen sm': {
          maxWidth: screens.sm,
        },
        '@screen md': {
          maxWidth: screens.md,
        },
        '@screen lg': {
          maxWidth: screens.lg,
        },
        '@screen xl': {
          maxWidth: screens.xl,
        },
        // 2xl 설정 추가하지 않음
      },
    });
  }),],
>>>>>>> 3b3813249cf20da3763b52d9c1d8974fe91b128b
});

