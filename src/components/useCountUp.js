import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 up to `target` the first time the element scrolls into view.
 *
 * Returns [ref, value]. Attach the ref to the element that should trigger it.
 * Under prefers-reduced-motion the final value is set immediately — a number
 * ticking up is exactly the kind of motion that setting asks us to skip.
 */
export function useCountUp(target, { duration = 1600, threshold = 0.4 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame
    let startTime

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()   // count once, not on every scroll past

        const tick = (now) => {
          if (startTime === undefined) startTime = now
          const progress = Math.min((now - startTime) / duration, 1)
          // easeOutCubic — fast start, gentle settle
          const eased = 1 - (1 - progress) ** 3
          setValue(Math.round(target * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      },
      { threshold }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, threshold])

  return [ref, value]
}
