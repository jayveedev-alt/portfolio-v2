/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        rose:      '#b28784',
        roseLight: '#e0cccb',
        roseDark:  '#8a6462',
        cream:     '#f9f8f6',
        card:      '#ffffff',
        ink:       '#2d1f1e',
        muted:     '#9a7a78',
        border:    '#e8d5d3',
        surface:   '#f0ebe9',
      },
    },
  },
  plugins: [],
}
