/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        rose:      '#3758f9',
        roseLight: '#c7d2fe',
        roseDark:  '#2c3ed1',
        cream:     '#f9fafb',
        card:      '#ffffff',
        ink:       '#111827',
        muted:     '#6b7280',
        border:    '#e5e7eb',
        surface:   '#f3f4f6',
      },
    },
  },
  plugins: [],
}
