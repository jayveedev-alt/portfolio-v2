import { services } from '../data/services'
import { Icon } from './Icons'

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <div className="section-label">What I Can Do</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ink">Services I offer</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.id} className="reveal-item card card-hover p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(178,135,132,0.1)' }}>
                <Icon name={s.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
