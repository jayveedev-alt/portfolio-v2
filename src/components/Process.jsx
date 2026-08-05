const steps = [
  { n: '01', title: 'Discover & scope', desc: 'We align on goals, must-have features, and a fixed timeline before any code is written.' },
  { n: '02', title: 'Design & architect', desc: 'Wireframes, data models, and tech stack decisions — so the build phase has zero guesswork.' },
  { n: '03', title: 'Build & iterate', desc: 'Ship working increments every few days. You see progress early, not just at the end.' },
  { n: '04', title: 'Launch & support', desc: 'Deploy, hand off clean docs, and stick around for fixes as real users start using it.' },
]

export default function Process() {
  return (
    <section id="process" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <div className="section-label">How I Work</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ink">From idea to shipped product</h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal-item relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%-0.75rem)] w-full h-px bg-border" />
              )}
              <div className="card card-hover p-6 h-full relative z-10">
                <div className="font-heading font-black text-2xl text-roseLight mb-3">{s.n}</div>
                <h3 className="font-heading font-semibold text-lg text-ink mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
