// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          display: ['Manrope', 'system-ui', 'sans-serif'],
          body: ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          primary: {
            DEFAULT: '#565e74',
            container: '#707a94',
          },
          on: {
            primary: '#f7f7ff',
            secondary: '#f9f8ff',
            surface: '#2a3439',
          },
          secondary: {
            DEFAULT: '#005bc4',
            dim: '#004fad',
          },
          tertiary: {
            DEFAULT: '#9e4400',
          },
          surface: {
            DEFAULT: '#f7f9fb',
            container: {
              lowest: '#ffffff',
              low: '#f0f4f7',
              high: '#e1e9ee',
              highest: '#d9e4ea',
            },
          },
          outline: {
            variant: '#a9b4b9',
          },
        },
        borderRadius: {
          'card': '2rem',
          'pill': '9999px',
        },
        spacing: {
          'ds-4': '1.4rem',
          'ds-8': '2.75rem',
          'ds-10': '3.5rem',
          'ds-12': '4.5rem',
          'ds-16': '6rem',
        },
        boxShadow: {
          'ambient': '0 32px 64px rgba(42, 52, 57, 0.06)',
          'ambient-lg': '0 48px 96px rgba(42, 52, 57, 0.06)',
          'ambient-sm': '0 16px 32px rgba(42, 52, 57, 0.06)',
        },
        letterSpacing: {
          'display': '-0.02em',
        },
        fontSize: {
          'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          'display-md': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
          'headline-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
          'headline-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
          'body-lg': ['1rem', { lineHeight: '1.7' }],
        },
      },
    },
    plugins: [],
    safelist: [
      "bg-gradient-brand", "text-gradient", "gradient-border",
      "focus-ring", "shadow-glow", "orange-glow", "skeleton"
    ],
  };
