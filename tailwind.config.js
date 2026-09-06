/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // display and heading are the same family — kept as two names so the
        // existing class names still read correctly at their call sites.
        // next/font hands each family a CSS variable, set on <html> in the
        // root layout. The fallbacks keep text readable before they load.
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
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
