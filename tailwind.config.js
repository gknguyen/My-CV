const defaultTheme = require('tailwindcss/defaultTheme');
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      scrollBehavior: ['responsive', 'scroll-smooth'],
    },
    screens: {
      sm: '360px',
      md: '780px',
    },
  },
  variants: {
    scrollBehavior: ['responsive'],
  },
});
