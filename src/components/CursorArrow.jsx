/** The arrow glyph both hero cursors share. */
export default function CursorArrow({ fill = '#3376FF', className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ filter: 'drop-shadow(0 2px 5px rgb(0 0 0 / 0.28))' }}>
      <path
        d="M5.5 3.2l13.1 7.4c.9.5.7 1.9-.3 2.1l-5.2 1.1-2.3 5c-.4.9-1.8.8-2.1-.2L4.3 4.4c-.3-1 .7-1.7 1.2-1.2z"
        fill={fill}
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
