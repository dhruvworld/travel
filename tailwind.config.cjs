/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077ff',
        secondary: '#f59e0b',
        light: '#f9fafb',
        dark: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  safelist: [
    'bg-gradient-to-r',
    'from-blue-600',
    'via-gray-600',
    'to-yellow-500',
    'text-transparent',
    'bg-clip-text',
  ],
  plugins: [],
};
