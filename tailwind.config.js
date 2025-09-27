// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: {
            DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          },
          surface: {
            DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          },
          foreground: {
            DEFAULT: 'rgb(var(--color-foreground) / <alpha-value>)',
          },
        },
      },
    },
    plugins: [],
    // Optional but helpful if you use custom class names:
    safelist: [
      "bg-gradient-brand", "text-gradient", "gradient-border",
      "focus-ring", "shadow-glow", "orange-glow", "skeleton"
    ],
  };
  
