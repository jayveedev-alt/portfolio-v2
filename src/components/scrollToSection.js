// Height of the fixed navbar, so an anchored section is not hidden behind it.
export const NAV_OFFSET = 76

/**
 * Where an in-page link should actually scroll to.
 *
 * A section that pins inside a ScrollStack cannot be measured directly: it is
 * `position: sticky`, so both `getBoundingClientRect()` and `offsetTop` report
 * where it is *currently pinned* rather than where its scroll range begins.
 * Aiming at it lands the reader part-way through the animation — clicking
 * "Process" from further down the page arrived with all four phase cards
 * already filled. The runway wrapper around it is in normal flow and holds
 * still, so that is the anchor.
 *
 * Only the pinned base is redirected. The cover slot holds an ordinary section
 * (Tech Stack) which must still be scrolled to directly.
 */
export function resolveScrollAnchor(target) {
  const pinned = target.closest('[data-stack-pinned]')
  return pinned?.parentElement ?? target
}

/**
 * Scrolls to `hash`, smoothly unless motion is turned down.
 *
 * Nav links call this instead of letting the browser follow the fragment.
 * Leaving it to the browser broke in two ways: the native scroll aims at the
 * sticky section rather than its runway, and clicking a link for the section
 * you are already anchored to leaves the URL unchanged — so React Router never
 * re-renders, no effect runs, and only the native scroll happens.
 *
 * Returns false when the target does not exist, so the caller can fall back to
 * normal link behaviour.
 */
export function scrollToSection(hash) {
  const target = document.querySelector(hash)
  if (!target) return false

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const anchor = resolveScrollAnchor(target)
  const top = anchor.getBoundingClientRect().top + window.scrollY - NAV_OFFSET

  window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' })

  // Keep the address bar honest without handing the scroll back to the browser.
  // pushState does not emit popstate, so React Router stays put and nothing
  // re-runs the jump underneath the animation.
  if (window.location.hash !== hash) {
    window.history.pushState(null, '', hash)
  }
  return true
}
