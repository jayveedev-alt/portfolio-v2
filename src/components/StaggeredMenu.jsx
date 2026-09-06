'use client'

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

/**
 * Staggered slide-in menu panel, adapted from reactbits.dev.
 *
 * Two changes from the published component:
 *
 * 1. It is *controlled and headless*. The original ships its own header with a
 *    logo and a Menu/Close toggle; here the Navbar already owns both, so this
 *    renders only the panel and its colour underlays and takes `open` as a
 *    prop. One toggle, one source of truth.
 * 2. Items call `onItemClick` instead of navigating on their own, so the
 *    in-page smooth scroll (`scrollToSection`) still runs.
 *
 * Colours come from the site tokens in StaggeredMenu.css rather than props, so
 * the panel follows `.on-dark` like everything else.
 */
export default function StaggeredMenu({
  open = false,
  onClose,
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  position = 'right',
  colors = ['#3376FF', '#000F22'],
  onItemClick,
  footer,
  className,
}) {
  const wrapperRef = useRef(null)
  const panelRef = useRef(null)
  const preLayersRef = useRef(null)
  const preLayerElsRef = useRef([])

  const openTlRef = useRef(null)
  const closeTweenRef = useRef(null)
  const firstRunRef = useRef(true)

  const offscreen = position === 'left' ? -100 : 100

  // A menu that animates 400px of panel and staggers every row is exactly the
  // kind of motion this setting exists to opt out of.
  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Park the panel and its underlays offscreen before the first paint. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const pre = preLayersRef.current
      if (!panel) return

      const layers = pre ? Array.from(pre.querySelectorAll('.sm-prelayer')) : []
      preLayerElsRef.current = layers

      gsap.set([panel, ...layers], { xPercent: offscreen, opacity: 1 })
      if (pre) gsap.set(pre, { xPercent: 0, opacity: 1 })
    }, wrapperRef)
    return () => ctx.revert()
  }, [offscreen])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    closeTweenRef.current?.kill()
    closeTweenRef.current = null

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'))
    const socialTitle = panel.querySelector('.sm-socials-title')
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'))

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 })
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
    })

    const lastLayer = layers.length ? (layers.length - 1) * 0.07 : 0
    const panelAt = lastLayer + (layers.length ? 0.08 : 0)
    const panelDur = 0.65

    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDur, ease: 'power4.out' }, panelAt)

    if (itemEls.length) {
      const itemsAt = panelAt + panelDur * 0.15
      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsAt
      )
      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } },
          itemsAt + 0.1
        )
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsAt = panelAt + panelDur * 0.4
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsAt)
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
          },
          socialsAt + 0.04
        )
      }
    }

    openTlRef.current = tl
    return tl
  }, [offscreen])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null

    const panel = panelRef.current
    if (!panel) return

    closeTweenRef.current?.kill()
    closeTweenRef.current = gsap.to([...preLayerElsRef.current, panel], {
      xPercent: offscreen,
      duration: reduced() ? 0 : 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
    })
  }, [offscreen])

  /* Drive the animation from the `open` prop. */
  useEffect(() => {
    // Nothing to play on mount — the layout effect already parked it closed.
    if (firstRunRef.current) {
      firstRunRef.current = false
      if (!open) return
    }

    if (open) {
      const tl = buildOpenTimeline()
      if (!tl) return
      if (reduced()) tl.progress(1)
      else tl.play(0)
    } else {
      playClose()
    }
  }, [open, buildOpenTimeline, playClose])

  /* Escape closes it — expected of anything that covers the page. */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  /* Hold the page still while the panel is over it. */
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  /* Offscreen is not hidden: without this, Tab walks into the closed panel. */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (open) panel.removeAttribute('inert')
    else panel.setAttribute('inert', '')
  }, [open])

  const handleItemClick = (item) => (event) => {
    onItemClick?.(item, event)
  }

  // The wrapper covers the viewport while open, so anything landing on it
  // rather than on the panel is a click on the page behind — treat as dismiss.
  const handleBackdropClick = (event) => {
    if (open && !panelRef.current?.contains(event.target)) onClose?.()
  }

  return (
    <div
      ref={wrapperRef}
      className={`staggered-menu-wrapper${className ? ` ${className}` : ''}`}
      data-position={position}
      data-open={open || undefined}
      onClick={handleBackdropClick}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.slice(0, 3).map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-label="Site menu"
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a
                  className="sm-panel-item"
                  href={it.link}
                  aria-label={it.ariaLabel}
                  data-index={idx + 1}
                  onClick={handleItemClick(it)}
                >
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {footer && <div className="sm-panel-footer">{footer}</div>}

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
