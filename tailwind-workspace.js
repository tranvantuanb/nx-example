const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    screens: {
      xs: '376px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    extend: {
      spacing: {
        fit: 'fit-content',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        hover: 'var(--item-hover-bg)',
        black: {
          ...colors.black,
          base: 'var(--text-color)',
          50: '#F2F3F5',
          300: '#A1A7BC',
        },
        blue: {
          ...colors.blue,
          50: '#EFF2FE',
          400: '#4082FF',
          500: '#5E81F4',
          600: '#2439B0',
          800: '#1E40AF',
        },
        indigo: {
          ...colors.indigo,
        },
        slate: {
          ...colors.slate,
          50: '#F8FAFC',
          300: '#C0C0D2',
          500: '#8181A5',
        },
        gray: {
          ...colors.gray,
          100: '#F5F5FA',
          200: '#E5E7EB',
          300: '#ECECF2',
        },
        amber: {
          ...colors.amber,
          400: '#FBBF24',
          500: '#FFB800',
        },
        orange: {
          ...colors.orange,
          50: '#FFECB3',
          100: '#FDF2DF',
        },
        rose: {
          ...colors.rose,
          100: '#FFE4E6',
          400: '#FF808B',
        },
        emerald: {
          ...colors.emerald,
          50: '#D6F4E9',
          400: '#31C891',
        },
        red: {
          ...colors.red,
          500: '#FF4D4F',
        },
        lime: {
          ...colors.lime,
          500: '#84CC16',
        },
      },
      borderRadius: {
        base: '8px',
        4: '4px',
      },
      fontWeight: {
        bolder: 900,
        bold: 700,
        semibold: 600,
      },
      fontSize: {
        button: ['12px', { lineHeight: '14px' }],
        xs: ['12px', { lineHeight: '21px' }],
        sm: ['14px', { lineHeight: '14px' }],
        base: '16px',
        lg: ['18px', { lineHeight: '27px' }],
        xl: '20px',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
