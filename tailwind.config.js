/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // ── Surfaces (darkest → lightest) ──
        dark: {
          950: '#070707',
          900: '#0a0a0a',
          850: '#101010',
          800: '#121212',
          700: '#1a1a1a',
          600: '#262626',
          500: '#404040',
        },
        // ── Accents ──
        accent:    '#d4ff3d',   // lime — primary
        accentDim: '#a8cc2f',
        mint:      '#34d399',
        iris:      '#818cf8',
        aqua:      '#22d3ee',
        // ── Text ──
        ink:   '#fafafa',
        muted: '#9ca3af',
        faint: '#6b7280',
        line:  'rgba(255,255,255,0.08)',
        line2: 'rgba(255,255,255,0.14)',
      },
      backgroundSize: {
        grid: '4.5rem 4.5rem',
      },
    },
  },
  plugins: [],
}
