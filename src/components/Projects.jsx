import { projects } from '../data/projects'
import { Icon } from './Icons'

function ProjectThumb({ thumb }) {
  // SecurePeek — security / shield
  if (thumb === 'shield') return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl"
        style={{ background: 'rgba(55,88,249,0.12)', border: '2px solid rgba(55,88,249,0.25)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3758f9" className="w-8 h-8 opacity-80">
          <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08z" clipRule="evenodd"/>
        </svg>
      </div>
      <div className="w-full space-y-2 opacity-60">
        <div className="flex items-center gap-2">
          <div className="h-2 rounded-full flex-1" style={{ background: 'rgba(55,88,249,0.4)' }} />
          <div className="text-[10px] font-mono" style={{ color: '#3758f9' }}>SSL ✓</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 rounded-full flex-1" style={{ background: 'rgba(55,88,249,0.25)' }} />
          <div className="text-[10px] font-mono" style={{ color: '#3758f9' }}>HTTPS ✓</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 rounded-full" style={{ background: 'rgba(55,88,249,0.5)', width: '70%' }} />
          <div className="text-[10px] font-mono" style={{ color: '#3758f9' }}>Score: 87</div>
        </div>
      </div>
    </div>
  )

  // AuraWash — laundry SaaS dashboard
  if (thumb === 'laundry') return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="flex gap-2 opacity-70">
        {['rgba(55,88,249,0.6)', 'rgba(199,210,254,0.7)', 'rgba(44,62,209,0.5)'].map((bg, i) => (
          <div key={i} className="flex-1 rounded-lg p-2" style={{ background: bg }}>
            <div className="h-1.5 rounded-full bg-white/40 mb-1.5 w-3/4" />
            <div className="text-white/70 font-mono text-[10px]">{['Orders', 'Active', 'Done'][i]}</div>
            <div className="text-white font-bold text-sm">{['24', '8', '142'][i]}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg opacity-60" style={{ background: 'rgba(55,88,249,0.1)', border: '1px solid rgba(55,88,249,0.2)' }}>
        <div className="p-2 space-y-1.5">
          {[['#001', 'Pickup', 'rgba(55,88,249,0.5)'], ['#002', 'Washing', 'rgba(199,210,254,0.6)'], ['#003', 'Ready', 'rgba(44,62,209,0.4)']].map(([id, status, bg]) => (
            <div key={id} className="flex items-center justify-between">
              <span className="font-mono text-[10px]" style={{ color: '#6b7280' }}>{id}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: bg, color: '#fff' }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Portfolio — browser/window mockup
  if (thumb === 'portfolio') return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="w-full rounded-xl overflow-hidden opacity-70"
        style={{ border: '1.5px solid rgba(55,88,249,0.3)', background: '#f9fafb' }}>
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'rgba(55,88,249,0.1)' }}>
          {['rgba(55,88,249,0.5)', 'rgba(199,210,254,0.6)', 'rgba(44,62,209,0.4)'].map((bg, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: bg }} />
          ))}
          <div className="flex-1 mx-2 h-3 rounded-full" style={{ background: 'rgba(55,88,249,0.15)' }} />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-4 rounded w-1/2" style={{ background: 'rgba(55,88,249,0.3)' }} />
          <div className="h-2 rounded w-full" style={{ background: 'rgba(55,88,249,0.15)' }} />
          <div className="h-2 rounded w-5/6" style={{ background: 'rgba(55,88,249,0.15)' }} />
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-20 rounded-lg" style={{ background: 'rgba(55,88,249,0.35)' }} />
            <div className="h-6 w-20 rounded-lg" style={{ background: 'rgba(55,88,249,0.15)', border: '1px solid rgba(55,88,249,0.3)' }} />
          </div>
        </div>
      </div>
    </div>
  )

  // QuickList — todo / kanban board
  if (thumb === 'todo') return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="grid grid-cols-3 gap-2 w-full opacity-70">
        {[
          { label: 'Now', items: 2, col: 'rgba(55,88,249,0.5)' },
          { label: 'Next', items: 3, col: 'rgba(199,210,254,0.6)' },
          { label: 'Later', items: 1, col: 'rgba(44,62,209,0.35)' },
        ].map(({ label, items, col }) => (
          <div key={label} className="space-y-1.5">
            <div className="text-[10px] font-mono font-medium mb-2" style={{ color: '#6b7280' }}>{label}</div>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="h-7 rounded-lg" style={{ background: col }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  // fallback — generic kanban
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-4 gap-3 p-8 w-full opacity-60">
        <div className="h-16 rounded-xl" style={{ background: 'rgba(55,88,249,0.3)' }} />
        <div className="h-16 rounded-xl col-span-2" style={{ background: 'rgba(55,88,249,0.5)' }} />
        <div className="h-16 rounded-xl" style={{ background: 'rgba(199,210,254,0.6)' }} />
        <div className="h-10 rounded-xl col-span-3" style={{ background: 'rgba(199,210,254,0.4)' }} />
        <div className="h-10 rounded-xl" style={{ background: 'rgba(55,88,249,0.2)' }} />
      </div>
    </div>
  )
}

function ProjectCard({ project, wide }) {
  return (
    <div className={`reveal-item card card-hover overflow-hidden ${wide ? 'md:col-span-2' : ''}`}>
      {/* Thumb */}
      <div className="proj-thumb" style={{
        background: 'linear-gradient(135deg,#e5e7eb,#f3f4f6)'
      }}>
        <ProjectThumb thumb={project.thumb} />
        {project.featured && (
          <span className="absolute top-4 left-4 tag">Featured</span>
        )}
        {project.liveUrl && project.liveUrl !== '#' && (
          <div className="proj-overlay">
            <a href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] font-semibold text-sm cursor-pointer"
              style={{ background: '#fff', color: '#3758f9' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd"/>
              </svg>
              View Live
            </a>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-xl text-ink">{project.title}</h3>
          <div className="flex items-center gap-1">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                className="text-muted hover:text-rose transition-colors cursor-pointer p-1 md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd"/>
                </svg>
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub source"
                className="text-muted hover:text-rose transition-colors cursor-pointer p-1">
                <Icon name="github" className="w-4 h-4" color="#6b7280" />
              </a>
            )}
          </div>
        </div>
        <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <div className="section-label">Featured Work</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ink">Projects I've built</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} wide={p.featured} stagger />
          ))}
        </div>
        {projects.length > 4 && (
          <div className="reveal text-center mt-10">
            <a href="https://github.com/johnbsantos" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Icon name="github" className="w-4 h-4" color="#3758f9" />
              View All on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
