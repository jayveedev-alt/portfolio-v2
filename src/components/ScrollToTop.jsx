import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_OFFSET, resolveScrollAnchor } from './scrollToSection'

/**
 * Two jobs, both things a client-routed SPA has to do by hand:
 *
 * 1. A route change keeps the previous scroll position, which lands you
 *    halfway down a project page. Reset to the top.
 * 2. Landing on `/#work` does not scroll on its own — on a fresh load the
 *    browser looks for the target before React has mounted it and gives up, and
 *    a client-side navigation never looks at all. Retry across a few frames
 *    until the section exists, then scroll to it.
 *
 * Only a hash change *within the page you are already on* animates. React
 * Router picks up the nav links' fragment navigation and re-runs this effect,
 * and an unconditional `instant` here was overriding the browser's own smooth
 * anchor scroll — the section simply appeared. Arriving on a deep link or
 * changing route still jumps, since there is nothing on screen yet to travel
 * away from and no reason to make someone watch it.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previous = useRef(null)

  useEffect(() => {
    const prior = previous.current
    previous.current = { pathname, hash }

    // Same page, genuinely different anchor — the only case worth animating.
    // Comparing the hash (rather than just the pathname) also keeps StrictMode's
    // double-mount from animating the initial load: on its second pass the
    // location is unchanged, so this stays false.
    const inPageJump = Boolean(prior) && prior.pathname === pathname && prior.hash !== hash
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = inPageJump && !reduced ? 'smooth' : 'instant'

    if (!hash) {
      window.scrollTo({ top: 0, behavior })
      return
    }

    let frame
    let tries = 0

    const scrollToHash = () => {
      const target = document.querySelector(hash)
      if (target) {
        const anchor = resolveScrollAnchor(target)
        const top = anchor.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, behavior })
        return
      }
      // ~30 frames is half a second — enough for the first paint, then give up
      if (tries++ < 30) frame = requestAnimationFrame(scrollToHash)
    }

    scrollToHash()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
