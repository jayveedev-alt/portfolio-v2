const stats = [
  { value: '7+',  label: 'Years Experience' },
  { value: '18+', label: 'Projects Shipped' },
  { value: '9+',  label: 'Happy Clients' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-24 px-6 overflow-hidden"
    >
      {/* ── Background: grid + accent bloom ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-grid"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent 75%)',
          }}
        />
        <div
          className="absolute -top-40 right-[-10%] w-[38rem] h-[38rem] rounded-full blur-[120px] opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #d4ff3d, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 65%)' }}
        />
        {/* Ground the hero back into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-dark-950" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">

        {/* ── Identity line ── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8 font-mono text-[0.7rem] tracking-[0.16em] uppercase">
          <span className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="text-ink">John Benedict Santos</span>
          </span>
          {/* The separator only reads correctly when both halves share a line */}
          <span className="hidden sm:inline text-dark-500">·</span>
          <span className="text-muted">Full Stack Developer &amp; UI Engineer</span>
        </div>

        {/* ── Headline ── */}
        <h1 className="h-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-ink max-w-5xl mb-8">
          Web applications engineered to a{' '}
          <span className="serif-em">production standard.</span>
        </h1>

        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
          I build the whole thing — interface, API, database, deploy. Seven years turning
          messy requirements into clean, scalable products that hold up once real users
          arrive.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a href="#work" className="btn-accent">
            View case studies
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            Book a call
          </a>
        </div>

        {/* ── Stats ── */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 pt-10 border-t border-line max-w-2xl">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-4xl text-ink">{s.value}</div>
              <div className="mock-label mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="mock-label">Scroll to explore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="#d4ff3d" strokeWidth="1.5" className="w-4 h-4 animate-scroll-cue"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}
