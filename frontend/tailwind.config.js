/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBg: "#0F0B1F",
        brandCard: "#17132C",
        brandPrimary: "#8B5CF6",
        brandHover: "#A78BFA",
        brandSecondary: "#C4B5FD",
        brandMuted: "#3B2F57",
        brandBorder: "rgba(139, 92, 246, 0.15)",
        brandBorderActive: "rgba(139, 92, 246, 0.4)",
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(139, 92, 246, 0.15)',
        glowLarge: '0 0 40px rgba(139, 92, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
