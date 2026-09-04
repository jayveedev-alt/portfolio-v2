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

export default function Process() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal-item relative group">
              {/* Connector rail between cards */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%+0.4rem)] w-5 h-px bg-line" />
              )}

              <div className="card card-hover p-7 h-full flex flex-col">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono font-medium text-3xl text-accentT/30 group-hover:text-accentT/60 transition-colors duration-300">
                    {s.n}
                  </span>
                  <span className="mock-label">Phase</span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-ink mb-3">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{s.desc}</p>

                <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                  <span className="mock-label">{i < steps.length - 1 ? 'Next' : 'Ship'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="w-3.5 h-3.5 text-faint group-hover:text-accentT group-hover:translate-x-1 transition-all duration-300">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
