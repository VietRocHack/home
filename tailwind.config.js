/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      cursor: {
        pointer: 'pointer',
        'zoom-in': 'zoom-in',
        'grab': 'grab',
        'grabbing': 'grabbing'
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'shine': 'shine 1.5s ease-in-out',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 60, 56, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 60, 56, 0)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shine: {
          '0%': { transform: 'rotate(35deg) translateY(-120%)' },
          '100%': { transform: 'rotate(35deg) translateY(120%)' }
        }
      }
    },
  },
  plugins: [],
}; 