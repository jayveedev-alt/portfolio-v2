import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { Icon } from './Icons'

// Projects that already have a full case-study section don't repeat in this grid.
const featuredTitles = new Set(caseStudies.map((c) => c.title))

function ProjectThumb({ thumb }) {
  // Security scan
  if (thumb === 'shield') return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/[0.08] border border-accent/25">
        <Icon name="shield" className="w-7 h-7" color="#3376FF" />
      </div>
      <div className="w-full space-y-2">
        {[['SSL ✓', '100%'], ['HTTPS ✓', '100%'], ['Score 87', '70%']].map(([label, w]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="h-1.5 rounded-full bg-accent/30" style={{ width: w }} />
            <span className="font-mono text-[0.6rem] text-faint">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // Laundry SaaS
  if (thumb === 'laundry') return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="flex gap-2">
        {[['Orders', '24'], ['Active', '8'], ['Done', '142']].map(([label, val]) => (
          <div key={label} className="flex-1 mock-tile !px-2.5 !py-2">
            <div className="mock-label">{label}</div>
            <div className="font-display text-base text-ink mt-0.5">{val}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-line bg-raised p-2.5 space-y-2">
        {[['#001', 'Pickup'], ['#002', 'Washing'], ['#003', 'Ready']].map(([id, status]) => (
          <div key={id} className="flex items-center justify-between">
            <span className="font-mono text-[0.6rem] text-faint">{id}</span>
            <span className="px-2 py-0.5 rounded-full border border-mint/25 bg-mint/10 text-mint font-mono text-[0.58rem]">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  // Browser / marketing site
  if (thumb === 'portfolio') return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="w-full rounded-xl overflow-hidden border border-line bg-card">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-raised">
          <span className="w-2 h-2 rounded-full bg-line2" />
          <span className="w-2 h-2 rounded-full bg-line2" />
          <span className="w-2 h-2 rounded-full bg-line2" />
          <div className="flex-1 mx-2 h-2.5 rounded-full bg-raised" />
        </div>
        <div className="p-3.5 space-y-2">
          <div className="h-3.5 rounded w-1/2 bg-accent/40" />
          <div className="h-2 rounded w-full bg-raised" />
          <div className="h-2 rounded w-5/6 bg-raised" />
          <div className="flex gap-2 pt-1.5">
            <div className="h-6 w-20 rounded-full bg-accent/70" />
            <div className="h-6 w-20 rounded-full border border-line2" />
          </div>
        </div>
      </div>
    </div>
  )

  // Kanban / todo
  if (thumb === 'todo') return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="grid grid-cols-3 gap-2.5 w-full">
        {[
          { label: 'Now',   items: 2, cls: 'bg-accent/45' },
          { label: 'Next',  items: 3, cls: 'bg-iris/40' },
          { label: 'Later', items: 1, cls: 'bg-raised' },
        ].map(({ label, items, cls }) => (
          <div key={label} className="space-y-1.5">
            <div className="mock-label mb-2">{label}</div>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className={`h-7 rounded-lg ${cls}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  // Fallback
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-3 p-8 content-center">
      <div className="h-14 rounded-xl bg-accent/25" />
      <div className="h-14 rounded-xl col-span-2 bg-accent/40" />
      <div className="h-14 rounded-xl bg-iris/30" />
      <div className="h-9 rounded-xl col-span-3 bg-raised" />
      <div className="h-9 rounded-xl bg-raised" />
    </div>
  )
}

function ProjectCard({ project }) {
  const hasLive = project.liveUrl && project.liveUrl !== '#'

  return (
    <div className="reveal-item card card-hover overflow-hidden">
      <div className="p-3 pb-0">
        <div className="proj-thumb">
          <ProjectThumb thumb={project.thumb} />
          {project.featured && (
            <span className="absolute top-3 right-3 tag-accent z-10">Featured</span>
          )}
          {hasLive && (
            <div className="proj-overlay">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent !py-2.5 !px-5"
              >
                View live
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="font-heading font-semibold text-lg text-ink">{project.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — live site`}
                className="text-faint hover:text-accentT transition-colors cursor-pointer p-1 md:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — source on GitHub`}
                className="text-faint hover:text-accentT transition-colors cursor-pointer p-1"
              >
                <Icon name="github" className="w-4 h-4" color="currentColor" />
              </a>
            )}
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const rest = projects.filter((p) => !featuredTitles.has(p.title))
  if (rest.length === 0) return null

  return (
    <section id="projects" className="py-28 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16 max-w-2xl">
          <div className="eyebrow">Also Shipped</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            Other things I have <span className="accent-em">built.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        <div className="reveal text-center mt-12">
          <a
            href="https://github.com/jayveedev-alt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Icon name="github" className="w-4 h-4" color="currentColor" />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
