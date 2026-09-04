import { useEffect, useState } from 'react'

const HOP_MS = 1100   // travel time between stops
const HOLD_MS = 950   // pause on arrival, while the tap ripple plays

/**
 * A decorative cursor that roams the hero, stopping on each element marked
 * `data-cue` and playing a tap ripple on arrival before moving on.
 *
 * Stops are measured from the real elements rather than hardcoded percentages,
 * so the path follows the layout at every breakpoint. It loops continuously and
 * never hides. Not rendered without hover support or under
 * prefers-reduced-motion.
 */
export default function PointerCue({ hostRef }) {
  const [enabled, setEnabled] = useState(false)
  const [stops, setStops] = useState([])
  const [index, setIndex] = useState(0)
  const [tapping, setTapping] = useState(false)

  useEffect(() => {
    setEnabled(
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // Measure every data-cue element relative to the host
  useEffect(() => {
    const host = hostRef.current
    if (!enabled || !host) return

    const measure = () => {
      const hostBox = host.getBoundingClientRect()
      const next = [...host.querySelectorAll('[data-cue]')]
        .sort((a, b) => Number(a.dataset.cue) - Number(b.dataset.cue))
        .map((el) => {
          const r = el.getBoundingClientRect()
          return {
            // Land just off the lower-right corner. A proportional inset put
            // the cursor in the middle of the headline, where a blue arrow on
            // blue text disappears; the corner keeps it clear of the glyphs and
            // matches where a real cursor sits when clicking a button.
            x: r.right - hostBox.left - 12,
            y: r.bottom - hostBox.top - 6,
          }
        })
      setStops(next)
    }

    measure()

    // The webfont lands after mount and reflows the headline. The hero is
    // min-h-screen so its own box never changes and a host-only ResizeObserver
    // never fires — which left the cursor parking ~140px from the real target.
    // Re-measure once fonts are ready, and watch the targets themselves.
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(host)
    host.querySelectorAll('[data-cue]').forEach((el) => observer.observe(el))

    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [enabled, hostRef])

  // Travel → tap → hold → next
  useEffect(() => {
    if (!enabled || stops.length < 2) return

    const onArrive = setTimeout(() => setTapping(true), HOP_MS)
    const endTap = setTimeout(() => setTapping(false), HOP_MS + 620)
    const advance = setTimeout(
      () => setIndex((i) => (i + 1) % stops.length),
      HOP_MS + HOLD_MS
    )

    return () => {
      clearTimeout(onArrive)
      clearTimeout(endTap)
      clearTimeout(advance)
    }
  }, [enabled, stops.length, index])

  if (!enabled || stops.length === 0) return null

  const { x, y } = stops[index] ?? stops[0]

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 ease-in-out"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: `transform ${HOP_MS}ms cubic-bezier(0.45, 0, 0.25, 1)`,
      }}
    >
      {/* Ripple fires only on arrival */}
      {tapping && (
        <span className="absolute left-1 top-1 h-6 w-6 rounded-full border-2 border-accent animate-cursor-tap" />
      )}

      {/* Inner element floats so the cursor still breathes while parked */}
      <svg
        viewBox="0 0 24 24"
        className="relative w-7 h-7 animate-cursor-float"
        style={{ filter: 'drop-shadow(0 2px 5px rgb(0 0 0 / 0.28))' }}
      >
        <path
          d="M5.5 3.2l13.1 7.4c.9.5.7 1.9-.3 2.1l-5.2 1.1-2.3 5c-.4.9-1.8.8-2.1-.2L4.3 4.4c-.3-1 .7-1.7 1.2-1.2z"
          fill="#3376FF"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
