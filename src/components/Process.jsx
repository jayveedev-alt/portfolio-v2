'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    n: '01',
    title: 'Discovery',
    desc: 'We align on the goal, the audience, and the must-have features before a line of code exists. You leave the call with a fixed scope and a date.',
  },
  {
    n: '02',
    title: 'Design & Architecture',
    desc: 'Wireframes, visual direction, data model, and stack decisions — settled and approved, so the build phase has zero guesswork left in it.',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Working increments every few days on a real staging URL. Clean code, 60fps interactions, SEO and accessibility handled as I go, not bolted on.',
  },
  {
    n: '04',
    title: 'Launch & Handoff',
    desc: 'Production deploy, final performance pass, and documentation clear enough that another developer could pick it up tomorrow. No lock-in.',
  },
]

// Each card starts filling where the previous one finished, so they go one at a
// time. All four are full at 0.81, leaving the rest of the runway as a pause
// before the covering section rises.
const FILL_FROM = [0.05, 0.25, 0.45, 0.65]
const FILL_SPAN = 0.16

const clamp01 = (v) => Math.min(Math.max(v, 0), 1)

/**
 * The card's contents, rendered twice: once in the resting palette and once in
 * the on-accent palette. The on-accent copy is clipped to the growing circle,
 * so text is dark outside it and white inside — no single colour flip can do
 * that, because at mid-fill the text spans both regions.
 */
function PhaseBody({ step, index, onAccent }) {
  return (
    <>
      <div className="flex items-baseline justify-between mb-6">
        <span className={`font-mono font-medium text-3xl ${onAccent ? 'text-onAccent' : 'text-accentT/30'}`}>
          {step.n}
        </span>
        <span className={`mock-label ${onAccent ? '!text-onAccent/70' : ''}`}>Phase</span>
      </div>

      <h3 className={`font-heading font-semibold text-lg mb-3 ${onAccent ? 'text-onAccent' : 'text-ink'}`}>
        {step.title}
      </h3>
      <p className={`text-sm leading-relaxed flex-1 ${onAccent ? 'text-onAccent/80' : 'text-muted'}`}>
        {step.desc}
      </p>

      <div className={`mt-6 pt-5 border-t flex items-center justify-between ${onAccent ? 'border-onAccent/25' : 'border-line'}`}>
        <span className={`mock-label ${onAccent ? '!text-onAccent/70' : ''}`}>
          {index < steps.length - 1 ? 'Next' : 'Ship'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
          className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1
                      ${onAccent ? 'text-onAccent' : 'text-faint group-hover:text-accentT'}`}>
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </div>
    </>
  )
}

export default function Process({ stackProgress = null }) {
  const gridRef = useRef(null)
  const [radius, setRadius] = useState(0)

  // The circle grows from the card's centre, so it has to reach the corners:
  // half the diagonal. Cards are taller than wide, so a percentage-based square
  // cannot cover them and a percentage-based ellipse would visibly stretch —
  // hence a measured pixel radius, shared by all four (same size in the grid).
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const measure = () => {
      const card = grid.querySelector('[data-phase-card]')
      if (!card) return
      const { width, height } = card.getBoundingClientRect()
      if (!width) return
      setRadius(Math.ceil(Math.hypot(width, height) / 2))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  // Outside a stack (or with the effect off) the cards just show filled rather
  // than looking half-finished.
  const fillOf = (i) =>
    stackProgress === null ? 1 : clamp01((stackProgress - FILL_FROM[i]) / FILL_SPAN)

  return (
    <section id="process" className="py-28 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16 max-w-2xl">
          <div className="eyebrow">How I Work</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            From idea to production in <span className="accent-em">four phases.</span>
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            A structured flow so the project moves without friction — defined timelines,
            constant feedback, and no black-box weeks where you have no idea what is happening.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const fill = fillOf(i)
            return (
              <div key={step.n} className="reveal-item relative group">
                {/* Connector rail between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(100%+0.4rem)] w-5 h-px bg-line" />
                )}

                <div
                  data-phase-card
                  className={`card card-hover p-7 h-full flex flex-col relative overflow-hidden
                              transition-colors duration-200 ${fill > 0.9 ? '!border-accent' : ''}`}
                >
                  <PhaseBody step={step} index={i} onAccent={false} />

                  {/* Blue fill and white text together, revealed by the circle */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 p-7 flex flex-col bg-accent"
                    style={{
                      clipPath: `circle(${(fill * radius).toFixed(1)}px at 50% 50%)`,
                      transition: 'clip-path 140ms linear',
                    }}
                  >
                    <PhaseBody step={step} index={i} onAccent />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
