/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require('tailwindcss/plugin');

export default withMT({
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extends: {
      screens: {
        'ssm': { max: '540px', min: '540px'}, // 'ssm' 브레이크포인트를 원하는 값으로 정의합니다.
        'ssmd': '540px', //
      },
      transitionProperty: {
        'left': 'left',
        'height': 'height'
      },
      
    },
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
        // 2xl 설정 추가하지 않음
      },
    });
  }),],
});

