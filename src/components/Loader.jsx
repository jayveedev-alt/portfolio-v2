import { useEffect, useState } from 'react'
import { markAppReady } from './appReady'

// Held long enough to read as deliberate rather than a flash of blue, but not
// long enough to feel like a gate. The shrink then runs on its own clock.
const MIN_HOLD = 550
const SHRINK_MS = 900

/**
 * Opening curtain: a full-bleed accent field that closes as a circle until it
 * vanishes, uncovering the page from the edges inward. It shares its shape
 * language with the phase cards and the contact fill, which grow the same
 * circle in the other direction.
 *
 * The hold waits on `document.fonts.ready`, so the wordmark underneath is never
 * measured or painted in the fallback face — the same reflow the hero cursors
 * had to work around.
 */
export default function Loader() {
  const [phase, setPhase] = useState('hold')

  useEffect(() => {
    // A curtain wiping across the screen is exactly the motion this setting
    // asks us to skip, so there is no curtain at all — just an immediate start.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markAppReady()
      setPhase('done')
      return
    }

    let cancelled = false
    const timers = []

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

    const held = new Promise((resolve) => timers.push(setTimeout(resolve, MIN_HOLD)))
    const fonts = document.fonts?.ready ?? Promise.resolve()

    Promise.all([held, fonts]).then(() => {
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
    })

    return () => {
      cancelled = true
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
      <span
        className="font-mono font-bold text-sm sm:text-base tracking-[0.22em] uppercase text-onAccent"
        style={{
          opacity: phase === 'shrink' ? 0 : 1,
          transition: 'opacity 320ms ease-out',
        }}
      >
        Mr. Santos
      </span>
    </div>
  )
}
