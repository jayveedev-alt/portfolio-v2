import { caseStudies } from '../data/caseStudies'
import SecurePeekMock from './mockups/SecurePeekMock'
import AuraWashMock from './mockups/AuraWashMock'

const mocks = {
  securepeek: SecurePeekMock,
  aurawash: AuraWashMock,
}

// Explicit class strings so Tailwind's content scanner keeps them.
const themes = {
  accent: {
    text: 'text-accent',
    chip: 'bg-accent/10 text-accent border-accent/25',
    glow: 'radial-gradient(circle, #d4ff3d, transparent 65%)',
    rule: 'bg-accent/40',
  },
  mint: {
    text: 'text-mint',
    chip: 'bg-mint/10 text-mint border-mint/25',
    glow: 'radial-gradient(circle, #34d399, transparent 65%)',
    rule: 'bg-mint/40',
  },
}

function CaseStudy({ study }) {
  const Mock = mocks[study.mock]
  const t = themes[study.accent] ?? themes.accent

  return (
    <article className="relative py-24 sm:py-28 px-6 border-b border-line last:border-b-0">
      {/* Ambient glow keyed to the study's accent */}
      <div
        className="absolute top-1/4 right-0 w-[26rem] h-[26rem] rounded-full blur-[130px] opacity-[0.07] pointer-events-none"
        style={{ background: t.glow }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="reveal max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className={`font-display text-5xl sm:text-6xl leading-none ${t.text} opacity-30`}>
              {study.number}
            </span>
            <span className={`h-px w-10 ${t.rule}`} />
            <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-muted">
              {study.kicker.replace(/^Case Study \d+ · /, '')}
            </span>
          </div>

          <h2 className="h-display text-4xl sm:text-5xl lg:text-[3.5rem] text-ink mb-5">
            {study.title} <span className="text-dark-500">—</span>{' '}
            <span className="serif-em">{study.subtitle}</span>
          </h2>

          <p className="text-muted leading-relaxed">{study.summary}</p>
        </div>

        {/* ── Narrative + stack ── */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Architecture & process */}
          <div className="lg:col-span-3 card p-7 sm:p-8">
            <h3 className="font-heading font-semibold text-lg text-ink mb-6">
              Architecture &amp; Process
            </h3>
            <dl className="space-y-5">
              <div>
                <dt className="mock-label mb-1.5">Context</dt>
                <dd className="text-muted text-sm leading-relaxed">{study.context}</dd>
              </div>
              <div>
                <dt className="mock-label mb-1.5">Role</dt>
                <dd className="text-muted text-sm leading-relaxed">{study.role}</dd>
              </div>
              <div className="pt-5 border-t border-line">
                <dt className={`mock-label mb-1.5 ${t.text}`}>{study.decisionLabel}</dt>
                <dd className="text-muted text-sm leading-relaxed">{study.decision}</dd>
              </div>
            </dl>
          </div>

          {/* Stack */}
          <div className="lg:col-span-2 card p-7 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-6">
              <h3 className="font-heading font-semibold text-lg text-ink">{study.stackTitle}</h3>
              <span className={`shrink-0 px-2.5 py-0.5 rounded-full border font-mono text-[0.6rem] ${t.chip}`}>
                {study.stackBadge}
              </span>
            </div>

            <div className="space-y-5 flex-1">
              {study.stack.map((layer) => (
                <div key={layer.label}>
                  <div className="mock-label mb-1.5">{layer.label}</div>
                  <div className="text-sm text-ink/90 leading-relaxed">{layer.value}</div>
                </div>
              ))}
            </div>

            {study.liveUrl && study.liveUrl !== '#' && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-7 w-full justify-center"
              >
                Visit live site
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ── Product mockup ── */}
        <div className="reveal">
          <Mock />
        </div>

        {/* ── Tags ── */}
        <div className="reveal flex flex-wrap gap-2 mt-8">
          {study.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" aria-label="Case studies">
      {/* Section intro */}
      <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-28">
        <div className="reveal max-w-2xl">
          <div className="eyebrow">Selected Work</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            Two builds, taken apart.
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            Not screenshots and a stack list — the actual problem, the call I made, and what
            the interface looks like when it is doing its job.
          </p>
        </div>
      </div>

      {caseStudies.map((study) => (
        <CaseStudy key={study.id} study={study} />
      ))}
    </section>
  )
}
