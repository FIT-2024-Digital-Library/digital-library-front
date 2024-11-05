/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss/colors')} */

import colors from 'tailwindcss/colors';

export const darkMode = 'class'; // use dark: prefix to add classes for dark mode
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  colors: {
    ...colors,
    '1-1': '#111',
    '1-2': '#222',
    '1-3': '#444',
    '1-4': '#555',
    '1-5': '#666',
    '1-6': '#888',
    '1-7': '#999',
    '1-8': '#AAA',
    '1-9': '#BBB',
    '1-10': '#CCC',
    '1-11': '#DDD',
    '1-12': '#EEE',
  },
  extend: {
    keyframes: {
      appear: {
        '0%': { transform: 'scale(0.62)', opacity: 0 },
        '100%': { transform: 'scale(1)', opacity: 1 },
      },
      disappear: {
        '0%': { transform: 'scale(1)', opacity: 1 },
        '100%': { transform: 'scale(0.62)', opacity: 0 },
      },
      shake: {
        '0%': { transform: 'rotate(0deg)' },
        '25%': { transform: 'rotate(1deg)' },
        '50%': { transform: 'rotate(0deg)' },
        '75%': { transform: 'rotate(-1deg)' },
        '100%': { transform: 'rotate(0deg)' },
      },
    },
    animation: {
      // теперь в className можно писать animate-appear animate-disappear
      appear: 'appear 100ms ease-in',
      disappear: 'disappear 100ms ease-in',
      shake: 'shake 0.3s infinite',
    },
  },
};
export const plugins = [];
