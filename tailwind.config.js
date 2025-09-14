/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1A1A1A",
        fg: "#FFFFFF",
        muted: "#030753",
        accent: {
          500: "#FF6B35",
          600: "#E65F2F"
        },
        card: "#1F1F1F",
        border: "#2A2A2A"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.35)",
        glow: "0 0 80px rgba(255,107,53,0.25)"
      }
    }
  },
  plugins: [],
}
