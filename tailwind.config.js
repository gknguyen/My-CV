import withMT from '@material-tailwind/react/utils/withMT';
import defaultTheme from 'tailwindcss/defaultTheme';

export default withMT({
  darkMode: 'class',
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
      md: '768px',
    },
  },
  variants: {
    scrollBehavior: ['responsive'],
  },
});
