import { services } from '../data/services'
import { Icon } from './Icons'

// Alternating fills, matching the reference mosaic: solid accent, then a
// bordered panel, repeating.
const isFilled = (i) => i % 2 === 0

/* ---------------------------------------------------------------------------
   Card background geometry.

   Every card gets its own shape, so no two read as the same motif. Each shape
   is built from stacked layers, and the layers run dark -> light from the
   innermost outward: the inner ones sit on the card as shadow, the outer ones
   as highlight. Using both ends of the ramp is what gives the depth — a
   white-only ramp just dissolves into the fill and reads flat.

   These are hand-built primitives rather than the card's own icon scaled up:
   an icon enlarged to 11rem shows every hinted curve and stroke join it was
   never drawn for, which is what made the old ghosted version look wrong.
--------------------------------------------------------------------------- */

const mix = (from, to, k) => (from + (to - from) * k).toFixed(3)

/**
 * Paint for layer `i` of `n`, innermost first.
 * On a solid accent card the ramp crosses from black to white through the
 * middle. On a near-black panel black is invisible, so it stays a white ramp
 * and simply runs faint -> less faint.
 */
function layerPaint(i, n, filled) {
  const t = n <= 1 ? 0 : i / (n - 1)
  if (!filled) return `rgba(255, 255, 255, ${mix(0.02, 0.09, t)})`
  if (t < 0.5) return `rgba(0, 0, 0, ${mix(0.17, 0.03, t / 0.5)})`
  return `rgba(255, 255, 255, ${mix(0.04, 0.17, (t - 0.5) / 0.5)})`
}

const DECORS = {
  // Concentric arcs breaking out of the top-right corner.
  arcs: {
    box: '-top-12 -right-12 w-64 h-64',
    draw: (paint) => {
      const rs = [40, 62, 84, 106, 128]
      return rs.map((r, i) => (
        <circle key={r} cx="148" cy="54" r={r} fill="none"
          stroke={paint(i, rs.length)} strokeWidth="15" />
      ))
    },
  },

  // Concentric rounded squares — same rhythm as the arcs, different geometry.
  squares: {
    box: '-top-14 -right-14 w-64 h-64',
    draw: (paint) => {
      const ss = [42, 76, 110, 144, 178]
      return ss.map((size, i) => (
        <rect key={size} x={148 - size / 2} y={56 - size / 2} width={size} height={size}
          rx={size * 0.26} fill="none" stroke={paint(i, ss.length)} strokeWidth="13" />
      ))
    },
  },

  // Diagonal bands sweeping across the corner.
  stripes: {
    box: '-top-10 -right-16 w-72 h-72',
    draw: (paint) => {
      const is = [0, 1, 2, 3, 4]
      return (
        <g transform="rotate(-38 100 100)">
          {is.map((i) => (
            <rect key={i} x={26 + i * 36} y="-70" width="23" height="340" rx="11.5"
              fill={paint(i, is.length)} />
          ))}
        </g>
      )
    },
  },

  // Stacked diamonds (the square set, turned 45deg).
  diamonds: {
    box: '-top-12 -right-12 w-60 h-60',
    draw: (paint) => {
      const ss = [38, 70, 102, 134, 166]
      return (
        <g transform="rotate(45 146 58)">
          {ss.map((size, i) => (
            <rect key={size} x={146 - size / 2} y={58 - size / 2} width={size} height={size}
              rx="12" fill="none" stroke={paint(i, ss.length)} strokeWidth="12" />
          ))}
        </g>
      )
    },
  },

  // Rounded columns rising from the bottom edge.
  bars: {
    box: '-bottom-10 -right-10 w-56 h-56',
    draw: (paint) => {
      const hs = [64, 100, 136, 172, 208]
      return hs.map((h, i) => (
        <rect key={h} x={24 + i * 36} y={210 - h} width="24" height={h} rx="12"
          fill={paint(i, hs.length)} />
      ))
    },
  },

  // Filled concentric discs anchored off the bottom-right corner. Solid layers
  // overlap here, so their alphas compound toward the middle — the array runs
  // outermost-first and takes the ramp in that order, letting the build-up
  // reinforce the core instead of fighting it.
  discs: {
    box: '-bottom-16 -right-16 w-64 h-64',
    draw: (paint) => {
      const rs = [150, 118, 86, 54, 26]
      return rs.map((r, i) => (
        <circle key={r} cx="150" cy="150" r={r} fill={paint(i, rs.length)} />
      ))
    },
  },
}

function CardDecor({ variant, filled }) {
  const decor = DECORS[variant] ?? DECORS.arcs
  return (
    <svg
      className={`absolute pointer-events-none ${decor.box}`}
      viewBox="0 0 200 200" fill="none" aria-hidden="true"
    >
      {decor.draw((i, n) => layerPaint(i, n, filled))}
    </svg>
  )
}

function ServiceCard({ service, index }) {
  const filled = isFilled(index)

  return (
    <div
      className={`reveal-item relative overflow-hidden rounded-3xl p-7 min-h-[19rem]
                  flex flex-col transition-transform duration-300 hover:-translate-y-1
                  ${filled
                    ? 'bg-accent text-onAccent'
                    : 'bg-card border border-line text-ink'}`}
    >
      <CardDecor variant={service.decor} filled={filled} />

      {/* Icon in a circle, top-left */}
      <div
        className={`relative w-11 h-11 rounded-full flex items-center justify-center shrink-0
                    ${filled ? 'bg-white/20' : 'bg-raised border border-line'}`}
      >
        <Icon
          name={service.icon}
          className="w-[18px] h-[18px]"
          color={filled ? '#ffffff' : 'currentColor'}
        />
      </div>

      <div className="relative mt-auto pt-10">
        <h3 className="font-heading font-bold text-2xl leading-[1.2] tracking-[-0.02em]">
          {service.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${filled ? 'text-white/80' : 'text-muted'}`}>
          {service.tagline}
        </p>
      </div>
    </div>
  )
}

function CtaCell({ label, href }) {
  return (
    <a
      href={href}
      className="reveal-item flex items-center justify-center py-6
                 lg:min-h-[19rem] cursor-pointer"
    >
      <span className="relative flex items-center h-14 pl-8 gap-6">
        {/* The hover target is the disc alone. It is layered on top of the fill
            and never changes size, so the pointer stays inside it for the whole
            expansion — hovering the label does nothing, and there is no
            collapse-flicker once the fill has grown past the cursor. */}
        <span
          className="peer absolute right-0 top-0 z-20 w-14 h-14 rounded-full
                     flex items-center justify-center"
        >
          <svg viewBox="0 0 20 20" fill="#ffffff" className="w-5 h-5 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </span>

        {/* The fill. Pinned to the right edge and stretched top-to-bottom, so at
            rest its 3.5rem width makes it exactly the disc behind the arrow. On
            hover only its left edge travels, out to the start of the label —
            the disc grows into the button rather than a pill fading in. */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-0 z-0 rounded-full bg-accent
                     left-[calc(100%-3.5rem)] peer-hover:left-0
                     transition-[left] duration-500 ease-out"
        />

        <span
          className="relative z-10 font-heading font-medium text-lg text-ink whitespace-nowrap
                     transition-colors duration-300 ease-out peer-hover:text-onAccent"
        >
          {label}
        </span>

        {/* Holds the disc's width open in the flex row, since the disc itself is
            positioned out of flow. */}
        <span aria-hidden="true" className="w-14 shrink-0" />
      </span>
    </a>
  )
}

export default function WhatIDo() {
  const topRow = services.slice(0, 4)
  const bottomRow = services.slice(4, 6)

  return (
    <section id="services" className="on-dark py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14 max-w-2xl">
          <div className="eyebrow">What I Can Do</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            One developer, the <span className="accent-em">whole stack.</span>
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            No handoffs between a designer, a frontend dev, and a backend dev who never
            speak to each other. The interface, the API, and the deploy pipeline come from
            the same head.
          </p>
        </div>

        {/* Row 1 — four cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topRow.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Row 2 — CTA, two cards, CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          <CtaCell label="Free Strategy Call" href="#contact" />
          {bottomRow.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i + 4} />
          ))}
          <CtaCell label="Build Better Together" href="#contact" />
        </div>
      </div>
    </section>
  )
}
