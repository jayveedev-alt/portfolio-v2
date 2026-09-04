import { services } from '../data/services'
import { Icon } from './Icons'

// Alternating fills, matching the reference mosaic: solid accent, then a
// bordered panel, repeating.
const isFilled = (i) => i % 2 === 0

/* Decorative geometry — concentric arcs on filled cards, a ghosted outline of
   the card's own icon on the plain ones. Purely visual. */
function CardDecor({ filled, icon }) {
  if (filled) {
    return (
      <svg
        className="absolute -top-10 -right-10 w-56 h-56 pointer-events-none"
        viewBox="0 0 200 200" fill="none" aria-hidden="true"
      >
        {[52, 74, 96, 118].map((r, i) => (
          <circle
            key={r} cx="150" cy="50" r={r}
            stroke="#ffffff" strokeWidth="14" strokeOpacity={0.09 - i * 0.015}
          />
        ))}
      </svg>
    )
  }
  return (
    <div className="absolute -bottom-6 -right-6 opacity-[0.06] pointer-events-none">
      <Icon name={icon} className="w-44 h-44" color="currentColor" />
    </div>
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
      <CardDecor filled={filled} icon={service.icon} />

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
      className="reveal-item group flex items-center justify-center gap-5 py-6
                 lg:min-h-[19rem] cursor-pointer"
    >
      <span className="font-heading font-medium text-lg text-ink">{label}</span>
      <span
        className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0
                   transition-transform duration-300 group-hover:scale-110"
      >
        <svg viewBox="0 0 20 20" fill="#ffffff" className="w-5 h-5" aria-hidden="true">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
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
