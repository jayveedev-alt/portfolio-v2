/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // display and heading are the same family — kept as two names so the
        // existing class names still read correctly at their call sites.
        display: ['"Space Grotesk"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Every token is a CSS variable, so `.on-dark` can invert a whole
        // subtree (the #000F22 sections, and the product mockups) without any
        // component needing a second set of classes.
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card:    'rgb(var(--card) / <alpha-value>)',
        raised:  'rgb(var(--raised) / <alpha-value>)',
        line:    'rgb(var(--line) / <alpha-value>)',
        line2:   'rgb(var(--line2) / <alpha-value>)',
        ink:     'rgb(var(--ink) / <alpha-value>)',
        muted:   'rgb(var(--muted) / <alpha-value>)',
        faint:   'rgb(var(--faint) / <alpha-value>)',
        accent:  'rgb(var(--accent) / <alpha-value>)',
        accentT: 'rgb(var(--accent-t) / <alpha-value>)',
        onAccent:'rgb(var(--on-accent) / <alpha-value>)',

        // Fixed brand/status colours, identical in both themes
        navy: '#000F22',
        mint: '#34d399',
        iris: '#818cf8',
        aqua: '#22d3ee',
      },
    },
  },
  plugins: [],
}
