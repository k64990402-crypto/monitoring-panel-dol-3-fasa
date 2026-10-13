/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ed', 100: '#c1ebd4', 200: '#88d9ad', 300: '#4fc786',
          400: '#22b366', 500: '#0f9d4f', 600: '#0a7d3e', 700: '#0a6232',
          800: '#0a4e29', 900: '#083d22', 950: '#042214',
        },
        accent: {
          50: '#e0f2fe', 100: '#bae6fd', 200: '#7dd3fc', 300: '#38bdf8',
          400: '#0ea5e9', 500: '#0284c7', 600: '#0369a1', 700: '#075985',
          800: '#0c4a6e', 900: '#0a3b57', 950: '#082f49',
        },
        success: {
          50: '#e6f7ed', 100: '#c1ebd4', 200: '#88d9ad', 300: '#4fc786',
          400: '#22b366', 500: '#0f9d4f', 600: '#0a7d3e', 700: '#0a6232',
          800: '#0a4e29', 900: '#083d22', 950: '#042214',
        },
        warning: {
          50: '#fef3c7', 100: '#fde68a', 200: '#fcd34d', 300: '#fbbf24',
          400: '#f59e0b', 500: '#d97706', 600: '#b45309', 700: '#92400e',
          800: '#78350f', 900: '#5a2c0b', 950: '#451a03',
        },
        error: {
          50: '#fee2e2', 100: '#fecaca', 200: '#fca5a5', 300: '#f87171',
          400: '#ef4444', 500: '#dc2626', 600: '#b91c1c', 700: '#991b1b',
          800: '#7f1d1d', 900: '#5c1414', 950: '#450a0a',
        },
        panel: {
          950: '#070a0f',
          900: '#0b1018',
          850: '#0f1620',
          800: '#131c28',
          750: '#182331',
          700: '#1d2a3a',
          600: '#2a3a4d',
          500: '#3a4b5e',
          400: '#4a5d72',
          300: '#6b7d92',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
