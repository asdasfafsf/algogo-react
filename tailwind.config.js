// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require('tailwindcss/plugin');

export default withMT({
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: { 
      screens: {
        'ssm': { max: '540px', min: '540px'},
        'ssmd': '540px',
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
    },
  },
  plugins: [plugin(function({ addComponents, theme }) {
    const screens = theme('screens', {});

    addComponents({
      '.custom-container': {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
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
      },
    });
  })],
});