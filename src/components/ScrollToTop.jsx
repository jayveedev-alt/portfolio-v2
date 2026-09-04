import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Height of the fixed navbar, so an anchored section is not hidden behind it.
const NAV_OFFSET = 76

/**
 * Two jobs, both things a client-routed SPA has to do by hand:
 *
 * 1. A route change keeps the previous scroll position, which lands you
 *    halfway down a project page. Reset to the top.
 * 2. Landing on `/#work` does not scroll on its own — on a fresh load the
 *    browser looks for the target before React has mounted it and gives up, and
 *    a client-side navigation never looks at all. Retry across a few frames
 *    until the section exists, then scroll to it.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    let frame
    let tries = 0

    const scrollToHash = () => {
      const target = document.querySelector(hash)
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, behavior: 'instant' })
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
