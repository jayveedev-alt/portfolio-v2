'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

import './EdgeMarquee.css'

/**
 * Edge-aware hover reveal, adapted from React Bits' "FlowingMenu"
 * (https://reactbits.dev). Same behaviour — the overlay slides in from
 * whichever edge the cursor crossed, and its contents scroll seamlessly —
 * but it wraps arbitrary row content instead of a list of links.
 *
 * `children` is the resting state; `part` is one repetition of the marquee,
 * tiled as many times as the row is wide.
 */
export default function EdgeMarquee({
  children,
  part,
  speed = 16,
  background = '#3376FF',
  className = '',
}) {
  const rootRef = useRef(null)
  const overlayRef = useRef(null)
  const innerRef = useRef(null)
  const loopRef = useRef(null)
  const [repetitions, setRepetitions] = useState(3)

  // The reveal is hover-driven, so it never fires on touch. Skipping it there
  // (and under reduced-motion) avoids an off-screen animation nobody can see.
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches
    const wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(canHover && wantsMotion)
  }, [])

  // Tile enough copies to cover the row, plus a spare so the loop never gaps
  useEffect(() => {
    if (!enabled) return

    const measure = () => {
      const first = innerRef.current?.querySelector('.edge-marquee__part')
      const rowWidth = rootRef.current?.offsetWidth
      if (!first || !rowWidth) return

      const partWidth = first.offsetWidth
      if (!partWidth) return

      setRepetitions(Math.max(3, Math.ceil(rowWidth / partWidth) + 2))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
    // `part` is intentionally not a dependency — it is a new element object every
    // render, and row content is static. Remount with a new `key` if it changes.
  }, [enabled])

  // Shift by exactly one copy's width, so the seam is invisible
  useEffect(() => {
    if (!enabled) return

    const start = () => {
      const first = innerRef.current?.querySelector('.edge-marquee__part')
      if (!first) return

      const partWidth = first.offsetWidth
      if (!partWidth) return

      loopRef.current?.kill()
      loopRef.current = gsap.to(innerRef.current, {
        x: -partWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }

    // Wait a frame for the new repetition count to land in the DOM
    const timer = setTimeout(start, 50)
    return () => {
      clearTimeout(timer)
      loopRef.current?.kill()
    }
  }, [enabled, repetitions, speed])

  const closestEdge = (ev) => {
    const rect = rootRef.current.getBoundingClientRect()
    const y = ev.clientY - rect.top
    // Whichever horizontal edge the pointer is nearer to
    return y < rect.height / 2 ? 'top' : 'bottom'
  }

  const handleEnter = (ev) => {
    if (!enabled || !rootRef.current) return
    const edge = closestEdge(ev)

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(overlayRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(innerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([overlayRef.current, innerRef.current], { y: '0%' }, 0)
  }

  const handleLeave = (ev) => {
    if (!enabled || !rootRef.current) return
    const edge = closestEdge(ev)

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(overlayRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(innerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div
      ref={rootRef}
      className={`edge-marquee ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}

      {enabled && (
        <div className="edge-marquee__overlay" ref={overlayRef} style={{ backgroundColor: background }}>
          <div className="edge-marquee__inner" ref={innerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="edge-marquee__part" key={idx}>
                {part}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
