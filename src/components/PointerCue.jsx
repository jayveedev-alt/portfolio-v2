import CursorArrow from './CursorArrow'
import { useRoamingStops } from './useRoamingStops'

/**
 * Cursor one: points. Travels between `[data-cue]` elements and plays a tap
 * ripple on arrival.
 */
export default function PointerCue({ hostRef }) {
  const { enabled, stop, arrived } = useRoamingStops(hostRef, 'cue', {
    hopMs: 1100,
    holdMs: 950,
  })

  if (!enabled || !stop) return null

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{
        transform: `translate3d(${stop.x}px, ${stop.y}px, 0)`,
        transition: 'transform 1100ms cubic-bezier(0.45, 0, 0.25, 1)',
      }}
    >
      {arrived && (
        <span className="absolute left-1 top-1 h-6 w-6 rounded-full border-2 border-accent animate-cursor-tap" />
      )}
      <span className="relative block animate-cursor-float">
        <CursorArrow fill="#3376FF" />
      </span>
    </span>
  )
}
