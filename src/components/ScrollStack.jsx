'use client'

import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react'

const MAX_BLUR = 14      // px, at full coverage
const MIN_BRIGHT = 0.72  // the base dims as it recedes

/**
 * Pins the first child while the second scrolls up over it. With `blur` on, the
 * base also blurs and dims as it gets covered. After the pair, scrolling is
 * normal — whatever follows does not stack.
 *
 * Takes exactly two children: [base, cover]. The base is handed a
 * `stackProgress` prop (0-1, or null when the effect is off) so it can animate
 * its own contents while pinned; stack these by nesting one as another's cover.
 *
 * `hold` (in viewport heights) inserts a transparent runway between the two, so
 * the base stays pinned for that much extra scroll before the cover starts to
 * rise. Without it the base's own animation and the covering share the same
 * scroll distance and run at once — the reason the phase cards were still
 * unlit when the next section had already climbed most of the way up.
 */
export default function ScrollStack({ children, blur = true, hold = 0 }) {
  const [base, cover] = children

  const baseRef = useRef(null)
  const coverRef = useRef(null)
  const runwayRef = useRef(null)
  const [stickyTop, setStickyTop] = useState(0)
  const [holdPx, setHoldPx] = useState(0)
  const [enabled, setEnabled] = useState(false)
  const [coverProgress, setCoverProgress] = useState(0)
  const [holdProgress, setHoldProgress] = useState(0)

  // Decide whether the effect fits, and where the base should pin
  useEffect(() => {
    const el = baseRef.current
    if (!el) return

    const measure = () => {
      const baseHeight = el.getBoundingClientRect().height
      const viewport = window.innerHeight
      if (baseHeight === 0) return   // detached or not laid out yet

      // A base much taller than the viewport would scroll most of itself away
      // before pinning, which reads as broken rather than deliberate. On a
      // phone this section is ~3.5x the viewport, so the effect is skipped.
      if (baseHeight > viewport * 1.6) {
        setEnabled(false)
        return
      }

      setEnabled(true)
      // Negative offset so the base pins when its *bottom* meets the viewport
      // bottom — otherwise a section taller than the screen never shows its end
      setStickyTop(Math.min(0, viewport - baseHeight))
      setHoldPx(hold > 0 ? Math.round(viewport * hold) : 0)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [hold])

  // Track how far the cover has come up over the base
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const coverEl = coverRef.current
    if (!coverEl) return

    const clamp = (v) => Math.min(Math.max(v, 0), 1)

    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        const viewport = window.innerHeight

        setCoverProgress(clamp(1 - coverEl.getBoundingClientRect().top / viewport))

        // Runway consumed: 0 when its bottom is a full runway below the fold,
        // 1 the moment its bottom reaches the fold — which is exactly when the
        // cover starts to rise.
        const runway = runwayRef.current
        if (runway) {
          const box = runway.getBoundingClientRect()
          setHoldProgress(box.height ? clamp(1 - (box.bottom - viewport) / box.height) : 1)
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled])

  const blurPx = (MAX_BLUR * coverProgress).toFixed(2)
  const bright = (1 - (1 - MIN_BRIGHT) * coverProgress).toFixed(3)

  // With a runway, the base animates over that stretch and finishes before the
  // cover moves; without one, the covering itself drives it.
  const baseProgress = hold > 0 ? holdProgress : coverProgress
  const baseNode = isValidElement(base)
    ? cloneElement(base, { stackProgress: enabled ? baseProgress : null })
    : base

  // The DOM shape never changes — only styles — so both refs stay attached and
  // the ResizeObserver never ends up watching an unmounted node.
  return (
    // The wrapper is the runway: in normal flow, so its document position does
    // not move. An in-page link aimed at the pinned section scrolls here
    // instead, landing at the start of the animation. Only the base carries the
    // marker — the cover holds an ordinary section that should be scrolled to
    // directly.
    <div className="relative" data-stack-root>
      <div
        ref={baseRef}
        data-stack-pinned={enabled ? '' : undefined}
        // overflow-hidden is load-bearing: a blurred child paints outside its
        // own box, and that bleed showed up as a dark band across the covering
        // section. Clipping to the sticky box removes it and keeps the blur
        // inside the section's own edges.
        className={enabled ? 'sticky overflow-hidden' : undefined}
        style={enabled ? { top: stickyTop } : undefined}
      >
        <div
          style={
            enabled && blur
              ? { filter: `blur(${blurPx}px) brightness(${bright})` }
              : undefined
          }
        >
          {baseNode}
        </div>
      </div>

      {/* Transparent runway: the pinned base shows through it while it scrolls */}
      {enabled && holdPx > 0 && (
        <div ref={runwayRef} style={{ height: holdPx }} aria-hidden="true" />
      )}

      {/* Opaque and above the base — without a background the navy shows through */}
      <div ref={coverRef} className={enabled ? 'relative z-10 bg-surface' : undefined}>
        {cover}
      </div>
    </div>
  )
}
