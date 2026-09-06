'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_OFFSET, resolveScrollAnchor } from './scrollToSection'

/**
 * Two jobs, both things a client-routed app has to do by hand:
 *
 * 1. A route change keeps the previous scroll position, which lands you
 *    halfway down a project page. Reset to the top.
 * 2. Landing on `/#work` does not scroll on its own — on a fresh load the
 *    browser looks for the target before React has mounted it and gives up, and
 *    a client-side navigation never looks at all. Retry across a few frames
 *    until the section exists, then scroll to it.
 *
 * Only a hash change *within the page you are already on* animates. Arriving on
 * a deep link or changing route still jumps, since there is nothing on screen
 * yet to travel away from and no reason to make someone watch it.
 *
 * The App Router gives no hash from `usePathname` — a fragment never reaches
 * the server, so it is deliberately excluded. `hashchange` covers in-page jumps
 * and `window.location.hash` covers the initial load; between them this behaves
 * as the Router's `useLocation` did.
 */
export default function ScrollManager() {
  const pathname = usePathname()
  const previous = useRef(null)

  useEffect(() => {
    const run = (hash) => {
      const prior = previous.current
      previous.current = { pathname, hash }

      // Same page, genuinely different anchor — the only case worth animating.
      const inPageJump = Boolean(prior) && prior.pathname === pathname && prior.hash !== hash
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const behavior = inPageJump && !reduced ? 'smooth' : 'instant'

      if (!hash) {
        window.scrollTo({ top: 0, behavior })
        return () => {}
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
    }

    let cleanup = run(window.location.hash)
    const onHashChange = () => {
      cleanup?.()
      cleanup = run(window.location.hash)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      cleanup?.()
    }
  }, [pathname])

  return null
}
