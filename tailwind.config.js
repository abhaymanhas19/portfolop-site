// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: { extend: {} },
    plugins: [],
    // Optional but helpful if you use custom class names:
    safelist: [
      "bg-gradient-brand", "text-gradient", "gradient-border",
      "focus-ring", "shadow-glow", "orange-glow", "skeleton"
    ],
  };
  