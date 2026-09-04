import { useEffect, useState } from 'react'

/**
 * Shared roaming logic for the decorative hero cursors.
 *
 * Finds every `[data-<attr>]` element inside the host, measures it relative to
 * the host, and cycles through them: travel for `hopMs`, then hold for
 * `holdMs`. Returns the current stop's cursor point *and* its box, so a caller
 * can draw either a pointer or a selection outline.
 *
 * Disabled without hover support or under prefers-reduced-motion.
 */
export function useRoamingStops(hostRef, attr, { hopMs = 1100, holdMs = 950 } = {}) {
  const [enabled, setEnabled] = useState(false)
  const [stops, setStops] = useState([])
  const [index, setIndex] = useState(0)
  const [arrived, setArrived] = useState(false)

  useEffect(() => {
    setEnabled(
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!enabled || !host) return

    const selector = `[data-${attr}]`

    const measure = () => {
      const hostBox = host.getBoundingClientRect()
      setStops(
        [...host.querySelectorAll(selector)]
          .sort((a, b) => Number(a.dataset[attr]) - Number(b.dataset[attr]))
          .map((el) => {
            // An inline span that wraps across two lines reports a union box
            // covering both; the first client rect is the one you can see.
            const r = el.getClientRects()[0] ?? el.getBoundingClientRect()
            const left = r.left - hostBox.left
            const top = r.top - hostBox.top
            return {
              left,
              top,
              width: r.width,
              height: r.height,
              // Just off the lower-right corner, where a real cursor sits
              x: left + r.width - 12,
              y: top + r.height - 6,
              label: el.dataset[`${attr}Label`] ?? '',
            }
          })
      )
    }

    measure()
    // The webfont lands after mount and reflows the text. The hero is
    // min-h-screen so its own box never changes and a host-only observer never
    // fires, which leaves every stop measured against the fallback font.
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(host)
    host.querySelectorAll(selector).forEach((el) => observer.observe(el))

    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [enabled, hostRef, attr])

  useEffect(() => {
    if (!enabled || stops.length < 2) return

    const arrive = setTimeout(() => setArrived(true), hopMs)
    const depart = setTimeout(() => setArrived(false), hopMs + holdMs - 150)
    const advance = setTimeout(
      () => setIndex((i) => (i + 1) % stops.length),
      hopMs + holdMs
    )

    return () => {
      clearTimeout(arrive)
      clearTimeout(depart)
      clearTimeout(advance)
    }
  }, [enabled, stops.length, index, hopMs, holdMs])

  return { enabled, stop: stops[index] ?? null, arrived, count: stops.length }
}
