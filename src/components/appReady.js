import { useEffect, useState } from 'react'

/**
 * One shared "the intro is over" signal.
 *
 * The scroll-driven animations all arm themselves from an IntersectionObserver
 * on mount, which would otherwise fire *behind* the loading overlay: by the
 * time it lifted, the hero had already faded in and the counters had already
 * finished counting, so the intro ate the animations instead of introducing
 * them. Every driver now waits on this flag.
 *
 * It lives at module scope rather than in a context because the consumers are
 * plain hooks called from several unrelated trees, and because it must be
 * readable synchronously — a hook mounting after the flag flips has to see
 * `true` on its very first render, not one frame later.
 */

let ready = false
const waiters = new Set()

export function markAppReady() {
  if (ready) return
  ready = true
  waiters.forEach((notify) => notify())
  waiters.clear()
}

export function useAppReady() {
  const [value, setValue] = useState(ready)

  useEffect(() => {
    if (ready) {
      setValue(true)
      return
    }
    const notify = () => setValue(true)
    waiters.add(notify)
    return () => waiters.delete(notify)
  }, [])

  return value
}
