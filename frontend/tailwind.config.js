/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d4d',
        secondary: '#ff1a1a',
        dark: '#0a0e27',
        darkCard: '#1a1a3e',
      },
      animation: {
        float: 'float 20s infinite ease-in-out',
        bounce: 'bounce 2s infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        slideUp: 'slideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        slideInLeft: 'slideInLeft 0.8s ease-out',
        slideInRight: 'slideInRight 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -30px) scale(1.1)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
