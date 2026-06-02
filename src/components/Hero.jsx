export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left ── */}
        <div>
          <div className="section-label">Full Stack Developer</div>

          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl leading-tight text-ink mb-6">
            Building things<br />
            for the<br />
            <em className="not-italic text-rose">web.</em>
          </h1>

          <p className="text-muted text-lg leading-relaxed max-w-md mb-8">
            Hey, I'm{' '}
            <strong className="text-ink font-semibold">John Benedict Santos</strong> — a
            full-stack developer who loves turning complex problems into clean, scalable
            applications. 7+ years shipping products people actually use.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#contact" className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd"/>
              </svg>
              Book a Call
            </a>
            <a href="#projects" className="btn-outline">View Projects</a>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            <div>
              <div className="font-heading font-black text-3xl text-ink">7+</div>
              <div className="text-muted text-sm mt-0.5">Years Experience</div>
            </div>
            <div className="border-l border-border pl-10">
              <div className="font-heading font-black text-3xl text-ink">18+</div>
              <div className="text-muted text-sm mt-0.5">Projects Shipped</div>
            </div>
            <div className="border-l border-border pl-10">
              <div className="font-heading font-black text-3xl text-ink">9+</div>
              <div className="text-muted text-sm mt-0.5">Happy Clients</div>
            </div>
          </div>
        </div>

        {/* ── Right: visual card ── */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="card card-hover p-8">
              {/* Avatar row */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-white text-lg"
                  style={{ background: 'linear-gradient(135deg,#b28784,#8a6462)' }}
                >
                  JB
                </div>
                <div>
                  <div className="font-semibold text-ink">John Benedict Santos</div>
                  <div className="text-muted text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block" />
                    Available for work
                  </div>
                </div>
              </div>

              {/* Mini code block */}
              <div
                className="rounded-xl p-5 font-mono text-xs leading-7"
                style={{ background: '#f9f8f6', border: '1px solid #e8d5d3' }}
              >
                <div><span className="text-muted">const</span> <span className="text-rose">developer</span> <span className="text-muted">= {'{'}</span></div>
                <div className="ml-4"><span className="text-roseDark">name</span><span className="text-muted">:</span> <span className="text-rose">'John Benedict Santos'</span><span className="text-muted">,</span></div>
                <div className="ml-4"><span className="text-roseDark">stack</span><span className="text-muted">:</span> <span className="text-rose">['React', 'Node', 'TS']</span><span className="text-muted">,</span></div>
                <div className="ml-4"><span className="text-roseDark">coffee</span><span className="text-muted">:</span> <span className="text-rose">true</span><span className="text-muted">,</span></div>
                <div className="ml-4"><span className="text-roseDark">available</span><span className="text-muted">:</span> <span className="text-rose">true</span></div>
                <div className="text-muted">{'}'}</div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 card px-4 py-3 flex items-center gap-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#b28784" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium text-ink">Open to opportunities</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
