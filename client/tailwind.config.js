/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563EB',
          700: '#1D4ED8',
          100: '#DBEAFE',
        },
        secondary: '#3B82F6',
        accent: '#EAB308',
        background: '#F8FAFC',
        text: '#1E293B',
        border: '#E2E8F0',
        foreground: 'rgb(var(--foreground))', // Added to match `--foreground` variable
      },
      fontFamily: {
        sans: ['Inter', 'system-ui'],
        body: ['Roboto', 'system-ui'],
        mono: ['Source Code Pro', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
};
