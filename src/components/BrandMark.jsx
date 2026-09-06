/**
 * The Santos Builds mark.
 *
 * Inline rather than an <img> to app/icon.svg: that file is a Next metadata
 * route served with a content hash, so it is not a stable path to reference,
 * and inlining avoids a request for a 400-byte graphic. The two must be kept
 * in step by hand — if this changes, change app/icon.svg to match.
 *
 * The lettering carries a real fallback stack because this also has to hold up
 * where the webfont is not available (a favicon, a pinned tab, someone's
 * bookmark bar). Arial Bold at 16px is close enough that nobody notices.
 */
export default function BrandMark({ size = 36, className = '', title = 'Santos Builds' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <rect width="64" height="64" rx="15" fill="#3376FF" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), 'Helvetica Neue', Arial, sans-serif"
        fontSize="29"
        fontWeight="700"
        letterSpacing="-1.5"
        fill="#ffffff"
      >
        SB
      </text>
    </svg>
  )
}
