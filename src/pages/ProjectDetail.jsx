import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getWorkItem, getAdjacent } from '../data/work'
import WorkThumb from '../components/WorkThumb'
import { Icon } from '../components/Icons'
import { useReveal } from '../components/useReveal'

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
    </svg>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const item = getWorkItem(slug)

  useReveal()

  // The document title is the only "page" signal a client-routed SPA can give.
  useEffect(() => {
    if (!item) return
    const previous = document.title
    document.title = `${item.title} — John Benedict Santos`
    return () => { document.title = previous }
  }, [item])

  // An unknown slug should land on the work grid, not a blank page
  if (!item) return <Navigate to="/" replace />

  const { study } = item
  const { next } = getAdjacent(slug)
  const hasLive = item.liveUrl && item.liveUrl !== '#'
  const hasRepo = item.githubUrl && item.githubUrl !== '#'

  return (
    <main className="pt-32 pb-28 px-6">
      <div className="max-w-5xl mx-auto">

        <Link
          to="/#work"
          className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em]
                     uppercase text-muted hover:text-accentT transition-colors mb-10"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          All work
        </Link>

        {/* ── Header ── */}
        <header className="reveal">
          <div className="mock-label text-accentT">{item.kicker}</div>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-ink mt-4">
            {item.title}
          </h1>
          {study?.subtitle && (
            <p className="font-heading font-medium text-xl text-muted mt-3">{study.subtitle}</p>
          )}

          <p className="text-muted leading-relaxed mt-6 max-w-2xl">
            {study?.summary ?? item.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {hasLive && (
              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-accent">
                Visit live site <ExternalIcon />
              </a>
            )}
            {hasRepo && (
              <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Icon name="github" className="w-4 h-4" color="currentColor" />
                Source
              </a>
            )}
            {!hasLive && !hasRepo && (
              <span className="text-faint text-sm">This build is not publicly linkable.</span>
            )}
          </div>
        </header>

        {/* ── The interface ── */}
        <div className="reveal mt-14 rounded-2xl overflow-hidden border border-line">
          <WorkThumb thumb={item.thumb} fit="auto" className="h-[300px] sm:h-[420px]" />
        </div>

        {/* ── Deep dive, when the project has one ── */}
        {study && (
          <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-6 mt-14">
            <div className="lg:col-span-3 card p-7 sm:p-8">
              <h2 className="font-heading font-semibold text-lg text-ink mb-6">
                Architecture &amp; Process
              </h2>
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
                  <dt className="mock-label mb-1.5 text-accentT">{study.decisionLabel}</dt>
                  <dd className="text-muted text-sm leading-relaxed">{study.decision}</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-2 card p-7 sm:p-8">
              <div className="flex items-start justify-between gap-3 mb-6">
                <h2 className="font-heading font-semibold text-lg text-ink">{study.stackTitle}</h2>
                <span className="tag-accent shrink-0">{study.stackBadge}</span>
              </div>
              <div className="space-y-5">
                {study.stack.map((layer) => (
                  <div key={layer.label}>
                    <div className="mock-label mb-1.5">{layer.label}</div>
                    <div className="text-sm text-ink/90 leading-relaxed">{layer.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Stack tags ── */}
        <div className="reveal mt-12">
          <div className="mock-label mb-4">Built with</div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>

        {/* ── Next project ── */}
        {next && next.slug !== item.slug && (
          <Link
            to={`/work/${next.slug}`}
            className="reveal group flex items-center justify-between gap-6 mt-16 pt-10 border-t border-line"
          >
            <div>
              <div className="mock-label">Next project</div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-ink mt-2
                              group-hover:text-accentT transition-colors">
                {next.title}
              </div>
            </div>
            <span className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0
                             transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 20 20" fill="#ffffff" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        )}
      </div>
    </main>
  )
}
