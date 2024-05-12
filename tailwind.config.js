/** @type {import('tailwindcss').Config} */
import { screens as _screens } from 'tailwindcss/defaultTheme';

export const darkMode = 'selector';
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'];
export const theme = {
  screens: {
    '2xs-h': { raw: '(min-height: 200px)' },
    'xs-h': { raw: '(min-height: 350px)' },
    'sm-h': { raw: '(min-height: 640px)' },
    'md-h': { raw: '(min-height: 768px)' },
    'lg-h': { raw: '(min-height: 1024px)' },
    'xl-h': { raw: '(min-height: 1280px)' },
    '2xl-h': { raw: '(min-height: 1536px)' },
    '2xs': '200px',
    xs: '350px',
    ..._screens,
  },
  extend: {},
};
export const plugins = [];
