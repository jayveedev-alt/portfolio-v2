import { useEffect } from 'react'
import { useAppReady } from './appReady'

/**
 * Fades `.reveal` sections and `.reveal-item` children in as they enter view.
 *
 * A MutationObserver watches for nodes added later. Without it, anything
 * rendered after mount — the work grid re-rendering when a category filter is
 * clicked, for instance — arrives as a brand-new element the IntersectionObservers
 * were never told about, so it stays at opacity-0 and looks like an empty tab.
 *
 * Nothing is observed until the loading curtain has lifted, so the sections
 * already in the viewport fade in for the viewer rather than behind the
 * overlay.
 */
export function useReveal() {
  const ready = useAppReady()

  useEffect(() => {
    if (!ready) return

    const makeObserver = (threshold, rootMargin) =>
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          })
        },
        { threshold, rootMargin }
      )

    const sectionObs = makeObserver(0.08, '0px 0px -40px 0px')
    const itemObs = makeObserver(0.05, '0px 0px -30px 0px')

    const watch = (el, obs) => {
      if (!el.classList.contains('visible')) obs.observe(el)
    }

    const scan = (root) => {
      if (root.nodeType !== 1) return
      if (root.matches('.reveal')) watch(root, sectionObs)
      if (root.matches('.reveal-item')) watch(root, itemObs)
      root.querySelectorAll('.reveal').forEach((el) => watch(el, sectionObs))
      root.querySelectorAll('.reveal-item').forEach((el) => watch(el, itemObs))
    }

    scan(document.body)

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scan))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      sectionObs.disconnect()
      itemObs.disconnect()
      mutations.disconnect()
    }
  }, [ready])
}
