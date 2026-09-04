import { useEffect, useState } from 'react'
import { markAppReady } from './appReady'

const NAME = 'Mr. Santos'

// Held only long enough to settle the fonts, then the name types itself, rests
// for a couple of caret blinks, and the field closes.
const MIN_HOLD = 220
const CHAR_MS = 85
const REST_MS = 420
const SHRINK_MS = 820

/**
 * Opening curtain: a full-bleed accent field that types the name and then
 * closes as a circle until it vanishes, uncovering the page from the edges
 * inward. It shares its shape language with the phase cards and the contact
 * fill, which grow the same circle in the other direction.
 *
 * The name is set in the mono face, uppercase and tracked out, matching the
 * navbar wordmark — a typed caret belongs to a terminal, and pairing it with a
 * connected script would set the two metaphors against each other.
 *
 * The hold waits on `document.fonts.ready`, so the name is never typed in the
 * fallback face — the same reflow the hero cursors had to work around.
 */
export default function Loader() {
  const [phase, setPhase] = useState('hold')
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    // A field wiping across the screen is exactly the motion this setting asks
    // us to skip, so there is no curtain at all — just an immediate start.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markAppReady()
      setPhase('done')
      return
    }

    let cancelled = false
    const timers = []
    let typing = null

    // The overlay is an intro to the top of the page, so a browser-restored
    // scroll position would uncover the middle of the site instead. A real
    // anchor in the URL is a deliberate destination and is left alone.
    //
    // Restoration is only suppressed for this one load and then handed back:
    // leaving it on 'manual' would also stop back/forward from returning the
    // viewer to where they were, which has nothing to do with the intro.
    const supported = 'scrollRestoration' in window.history
    const previousRestoration = supported ? window.history.scrollRestoration : null
    const restore = () => {
      if (supported) window.history.scrollRestoration = previousRestoration ?? 'auto'
    }

    if (!window.location.hash) {
      if (supported) window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }

    const close = () => {
      if (cancelled) return
      setPhase('shrink')
      timers.push(
        setTimeout(() => {
          if (cancelled) return
          restore()
          markAppReady()
          setPhase('done')
        }, SHRINK_MS)
      )
    }

    const held = new Promise((resolve) => timers.push(setTimeout(resolve, MIN_HOLD)))
    const fonts = document.fonts?.ready ?? Promise.resolve()

    Promise.all([held, fonts]).then(() => {
      if (cancelled) return
      setPhase('type')

      typing = setInterval(() => {
        setTyped((count) => {
          const next = count + 1
          if (next >= NAME.length) {
            clearInterval(typing)
            timers.push(setTimeout(close, REST_MS))
          }
          return next
        })
      }, CHAR_MS)
    })

    return () => {
      cancelled = true
      clearInterval(typing)
      timers.forEach(clearTimeout)
      restore()
    }
  }, [])

  // Nothing behind the curtain should scroll while it is up.
  useEffect(() => {
    if (phase === 'done') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [phase])

  if (phase === 'done') return null

  const size = 'text-[clamp(1.75rem,6.5vw,4.25rem)]'

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-accent"
      style={{
        // 100% comfortably clears the corners at any aspect ratio: a circle
        // needs ~71% of the percentage reference to reach them.
        clipPath: phase === 'shrink' ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)',
        transition: `clip-path ${SHRINK_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="px-6 select-none"
        style={{
          // Fades as the field closes. Left at full opacity, the closing circle
          // slices the name mid-letter on its way past.
          opacity: phase === 'shrink' ? 0 : 1,
          transition: `opacity ${Math.round(SHRINK_MS * 0.7)}ms ease-in`,
        }}
      >
        {/* The full name is rendered invisibly to hold the box open, with the
            typed copy laid over it. Without that, a centred line would grow
            outward from the middle and every character typed would shove the
            ones before it sideways. */}
        <div className="relative">
          <span
            aria-hidden="true"
            className={`invisible block font-mono font-bold uppercase tracking-[0.14em]
                        whitespace-pre leading-none ${size}`}
          >
            {NAME}
          </span>

          <span
            className={`absolute inset-0 flex items-center font-mono font-bold uppercase
                        tracking-[0.14em] whitespace-pre leading-none text-onAccent ${size}`}
          >
            {NAME.slice(0, typed)}
            <span
              aria-hidden="true"
              className={`inline-block w-[0.08em] self-stretch bg-onAccent
                          ${phase === 'type' && typed < NAME.length ? '' : 'animate-caret'}`}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
