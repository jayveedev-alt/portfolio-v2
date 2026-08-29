import { services } from '../data/services'
import { Icon } from './Icons'

export default function WhatIDo() {
  return (
    <section id="services" className="py-28 px-6 border-t border-line bg-dark-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16 max-w-2xl">
          <div className="eyebrow">What I Can Do</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            One developer, the <span className="serif-em">whole stack.</span>
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            No handoffs between a designer, a frontend dev, and a backend dev who never
            speak to each other. The interface, the API, and the deploy pipeline come from
            the same head.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.id} className="reveal-item card card-hover p-7 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6
                              bg-accent/[0.07] border border-accent/20
                              group-hover:bg-accent/[0.14] transition-colors duration-300">
                <Icon name={s.icon} className="w-5 h-5" color="#d4ff3d" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-ink mb-2.5">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
