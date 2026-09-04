/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        party: {
          // Primary — warm coral/terracotta
          purple: {
            50:  '#FFF5F2',
            100: '#FFE8E1',
            200: '#FFCFC2',
            300: '#FFAA93',
            400: '#FF7A5A',
            500: '#E8533A',
            600: '#D03D24',
            700: '#AD2F19',
            800: '#8D2617',
            900: '#752418',
            950: '#3E100A',
          },
          // Secondary — warm amber/honey
          pink: {
            50:  '#FFFBF0',
            100: '#FFF3D0',
            200: '#FFE49A',
            300: '#FFD166',
            400: '#FFBC3A',
            500: '#F5A623',
            600: '#D98B12',
            700: '#B56F0D',
            800: '#925610',
            900: '#784712',
          },
          // Accent — warm sand/cream
          gold: {
            50:  '#FAF7F2',
            100: '#F2EBD9',
            200: '#E4D5B3',
            300: '#D3BB88',
            400: '#C2A060',
            500: '#A8833D',
            600: '#8A6A2E',
            700: '#6E5325',
          },
          // Dark mode backgrounds — warm charcoal
          dark: {
            800: '#231A12',
            900: '#1A1108',
            950: '#110B04',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft':           '0 10px 30px -10px rgba(208, 61, 36, 0.12)',
        'glow':           '0 0 25px rgba(245, 166, 35, 0.28)',
        'glow-purple':    '0 0 25px rgba(232, 83, 58, 0.30)',
        'glow-lg':        '0 0 40px rgba(245, 166, 35, 0.32)',
        'card':           '0 8px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'card-dark':      '0 10px 30px -5px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'card-hover':     '0 20px 35px -10px rgba(208, 61, 36, 0.20)',
        'card-hover-dark':'0 20px 40px -10px rgba(232, 83, 58, 0.30), 0 0 0 1px rgba(245, 166, 35, 0.25)',
      },
      animation: {
        'bounce-slow':    'bounce 3s infinite',
        'pulse-subtle':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':          'float 4s ease-in-out infinite',
        'float-delayed':  'float 4s ease-in-out 2s infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
