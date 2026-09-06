'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { workItems, categories } from '../data/work'
import WorkThumb from './WorkThumb'

function ArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  )
}

function WorkCard({ item }) {
  return (
    <article className="reveal-item card card-hover overflow-hidden flex flex-col group">
      <Link href={`/work/${item.slug}`} className="block" aria-label={`${item.title} — view project`}>
        <WorkThumb thumb={item.thumb} image={item.image} />
      </Link>

      <div className="p-7 flex flex-col flex-1">
        <div className="mock-label text-accentT">{item.kicker}</div>

        <h3 className="font-heading font-bold text-xl text-ink mt-3">
          <Link href={`/work/${item.slug}`} className="hover:text-accentT transition-colors">
            {item.title}
          </Link>
        </h3>

        <p className="text-muted text-sm leading-relaxed mt-3 flex-1">
          {item.study?.summary ?? item.description}
        </p>

        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink
                     underline underline-offset-4 decoration-line2
                     hover:text-accentT hover:decoration-accent transition-colors w-fit"
        >
          View project
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

const INITIAL_COUNT = 6

export default function SelectedWork() {
  const [active, setActive] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef(null)

  const matching = active === 'all' ? workItems : workItems.filter((w) => w.category === active)
  const shown = expanded ? matching : matching.slice(0, INITIAL_COUNT)
  const hidden = matching.length - shown.length

  const pickCategory = (id) => {
    setActive(id)
    setExpanded(false)   // a fresh filter starts collapsed
  }

  const collapse = () => {
    setExpanded(false)
    // Collapsing removes rows below the fold, which would otherwise leave the
    // reader standing in the next section.
    gridRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-line
                           font-mono text-[0.66rem] tracking-[0.18em] uppercase text-accentT mb-7">
            Selected Work
          </span>

          <h2 className="h-display text-4xl sm:text-5xl lg:text-[3.4rem] text-ink">
            Real builds,
            <br />
            every one shipped.
          </h2>

          <p className="text-muted mt-6 leading-relaxed">
            Security tooling, SaaS platforms, an AI-assisted service portal, mobile apps and
            commerce work. Every one has a{' '}
            <span className="text-accentT">full case study</span> with the real interface,
            and a link to the live build where there is one.
          </p>
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap gap-3 mt-12" role="tablist" aria-label="Filter projects">
          {categories.map((c) => {
            const isActive = c.id === active
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => pickCategory(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                            ${isActive
                              ? 'bg-accent text-onAccent'
                              : 'border border-line text-muted hover:text-ink hover:border-line2'}`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 scroll-mt-28">
          {shown.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>

        {matching.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={expanded ? collapse : () => setExpanded(true)}
              className="btn-ghost"
              aria-expanded={expanded}
            >
              {expanded ? 'See less' : `See more (${hidden})`}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
