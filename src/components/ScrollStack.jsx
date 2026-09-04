import { useEffect, useRef, useState } from 'react'

const MAX_BLUR = 14      // px, at full coverage
const MIN_BRIGHT = 0.72  // the base dims as it recedes

/**
 * Pins the first child while the second scrolls up over it, blurring and
 * dimming the first as it gets covered. After the pair, scrolling is normal —
 * whatever follows does not stack.
 *
 * Takes exactly two children: [base, cover].
 */
export default function ScrollStack({ children }) {
  const [base, cover] = children

  const baseRef = useRef(null)
  const coverRef = useRef(null)
  const [stickyTop, setStickyTop] = useState(0)
  const [enabled, setEnabled] = useState(false)
  const [progress, setProgress] = useState(0)

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
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Track how far the cover has come up over the base
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const coverEl = coverRef.current
    if (!coverEl) return

    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        const top = coverEl.getBoundingClientRect().top
        const viewport = window.innerHeight
        setProgress(Math.min(Math.max(1 - top / viewport, 0), 1))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled])

  const blur = (MAX_BLUR * progress).toFixed(2)
  const bright = (1 - (1 - MIN_BRIGHT) * progress).toFixed(3)

  // The DOM shape never changes — only styles — so both refs stay attached and
  // the ResizeObserver never ends up watching an unmounted node.
  return (
    <div className="relative">
      <div
        ref={baseRef}
        className={enabled ? 'sticky' : undefined}
        style={enabled ? { top: stickyTop } : undefined}
      >
        <div
          style={
            enabled
              ? { filter: `blur(${blur}px) brightness(${bright})`, willChange: 'filter' }
              : undefined
          }
        >
          {base}
        </div>
      </div>

      {/* Opaque and above the base — without a background the navy shows through */}
      <div ref={coverRef} className={enabled ? 'relative z-10 bg-surface' : undefined}>
        {cover}
      </div>
    </div>
  )
}
