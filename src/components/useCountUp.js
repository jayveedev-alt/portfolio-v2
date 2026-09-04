import { useEffect, useRef, useState } from 'react'
import { useAppReady } from './appReady'

/**
 * Counts from 0 up to `target` when the element scrolls into view, and back
 * down to 0 when it leaves — so the count replays every time you return.
 *
 * Returns [ref, value]. Attach the ref to the element that should trigger it.
 * Under prefers-reduced-motion the final value is set immediately; a number
 * ticking up and down is exactly the motion that setting asks us to skip.
 */
export function useCountUp(target, { duration = 1600, threshold = 0.4 } = {}) {
  const ref = useRef(null)
  const frame = useRef(null)
  const current = useRef(0)
  const [value, setValue] = useState(0)
  const ready = useAppReady()

  useEffect(() => {
    const el = ref.current
    if (!el || !ready) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = target
      setValue(target)
      return
    }

    const animateTo = (to) => {
      cancelAnimationFrame(frame.current)

      // Start from wherever the number actually is, so reversing mid-count
      // continues from that point instead of snapping.
      const from = current.current
      if (from === to) return

      const startedAt = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - (1 - progress) ** 3   // easeOutCubic
        const next = Math.round(from + (to - from) * eased)
        current.current = next
        setValue(next)
        if (progress < 1) frame.current = requestAnimationFrame(tick)
      }

      frame.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => animateTo(entry.isIntersecting ? target : 0),
      { threshold }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [target, duration, threshold, ready])

  return [ref, value]
}
