'use client'

import CursorArrow from './CursorArrow'
import { useRoamingStops } from './useRoamingStops'

const HOP_MS = 1300
const HOLD_MS = 1500

/**
 * Cursor two: selects. Travels between `[data-select]` elements and drags a
 * Figma-style selection box with it — blue outline, corner handles and the
 * element's name in a label chip.
 *
 * Its timings differ from the pointer cue on purpose, so the two cursors drift
 * out of phase instead of moving in lockstep.
 */
export default function SelectCue({ hostRef }) {
  const { enabled, stop } = useRoamingStops(hostRef, 'select', {
    hopMs: HOP_MS,
    holdMs: HOLD_MS,
  })

  if (!enabled || !stop) return null

  const PAD = 5
  const ease = `cubic-bezier(0.45, 0, 0.25, 1)`
  const boxTransition = `left ${HOP_MS}ms ${ease}, top ${HOP_MS}ms ${ease}, width ${HOP_MS}ms ${ease}, height ${HOP_MS}ms ${ease}`

  return (
    <>
      {/* Selection outline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-10 border-2 border-accent"
        style={{
          left: stop.left - PAD,
          top: stop.top - PAD,
          width: stop.width + PAD * 2,
          height: stop.height + PAD * 2,
          transition: boxTransition,
        }}
      >
        {/* Corner handles */}
        {[
          '-left-[3px] -top-[3px]',
          '-right-[3px] -top-[3px]',
          '-left-[3px] -bottom-[3px]',
          '-right-[3px] -bottom-[3px]',
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute w-[5px] h-[5px] bg-surface border border-accent ${pos}`}
          />
        ))}

        {/* Layer-name chip, like Figma's */}
        {stop.label && (
          <span
            className="absolute -top-[22px] left-[-2px] px-1.5 py-[2px] rounded-[3px] bg-accent
                       text-onAccent font-mono text-[0.6rem] leading-none whitespace-nowrap"
          >
            {stop.label}
          </span>
        )}
      </span>

      {/* The cursor itself */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20"
        style={{
          transform: `translate3d(${stop.x}px, ${stop.y}px, 0)`,
          transition: `transform ${HOP_MS}ms ${ease}`,
        }}
      >
        <span className="relative block animate-cursor-float">
          <CursorArrow fill="#000F22" />
        </span>
      </span>
    </>
  )
}
