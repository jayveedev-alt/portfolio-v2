import { projects } from '../data/projects'
import { Icon } from './Icons'

function ProjectThumb({ thumb }) {
  if (thumb === 'kanban') return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-4 gap-3 p-8 w-full opacity-60">
        <div className="h-16 rounded-xl" style={{ background: 'rgba(178,135,132,0.3)' }} />
        <div className="h-16 rounded-xl col-span-2" style={{ background: 'rgba(178,135,132,0.5)' }} />
        <div className="h-16 rounded-xl" style={{ background: 'rgba(224,204,203,0.6)' }} />
        <div className="h-10 rounded-xl col-span-3" style={{ background: 'rgba(224,204,203,0.4)' }} />
        <div className="h-10 rounded-xl" style={{ background: 'rgba(178,135,132,0.2)' }} />
      </div>
    </div>
  )
  if (thumb === 'chart') return (
    <div className="absolute inset-0 flex items-end p-5">
      <svg viewBox="0 0 200 80" className="w-full opacity-60">
        <polyline points="0,70 20,55 40,60 60,38 80,42 100,18 120,28 140,12 160,22 180,8 200,18"
          fill="none" stroke="#b28784" strokeWidth="2.5" strokeLinecap="round"/>
        <polyline points="0,70 20,55 40,60 60,38 80,42 100,18 120,28 140,12 160,22 180,8 200,18 200,80 0,80"
          fill="rgba(178,135,132,0.15)" stroke="none"/>
      </svg>
    </div>
  )
  if (thumb === 'lock') return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ border: '4px solid rgba(178,135,132,0.3)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ border: '4px solid rgba(178,135,132,0.5)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#b28784" className="w-4 h-4">
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  )
  // code thumb
  return (
    <div className="absolute inset-0 p-5 font-mono text-xs leading-6 overflow-hidden"
      style={{ color: 'rgba(178,135,132,0.6)' }}>
      <div>$ npm install devdocs-ai</div>
      <div style={{ color: 'rgba(154,122,120,0.5)' }}>✓ installed successfully</div>
      <div className="mt-2" style={{ color: 'rgba(138,100,98,0.7)' }}>import devdocs from 'devdocs-ai'</div>
      <div style={{ color: 'rgba(178,135,132,0.5)' }}>{'const ai = new DevDocs({'}</div>
      <div className="ml-4" style={{ color: 'rgba(154,122,120,0.4)' }}>model: 'gpt-4o',</div>
      <div className="ml-4" style={{ color: 'rgba(154,122,120,0.4)' }}>docs: './src'</div>
      <div style={{ color: 'rgba(178,135,132,0.5)' }}>{'}'}</div>
      <div className="mt-2" style={{ color: 'rgba(138,100,98,0.7)' }}>await ai.query('How to auth?')</div>
    </div>
  )
}

function ProjectCard({ project, wide }) {
  return (
    <div className={`card card-hover overflow-hidden ${wide ? 'md:col-span-2' : ''}`}>
      {/* Thumb */}
      <div className="proj-thumb" style={{
        background: 'linear-gradient(135deg,#e8d5d3,#f0ebe9)'
      }}>
        <ProjectThumb thumb={project.thumb} />
        {project.featured && (
          <span className="absolute top-4 left-4 tag">Featured</span>
        )}
        <div className="proj-overlay">
          <a href={project.liveUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] font-semibold text-sm cursor-pointer"
            style={{ background: '#fff', color: '#b28784' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd"/>
            </svg>
            View Live
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-xl text-ink">{project.title}</h3>
          <a href={project.githubUrl} aria-label="GitHub source"
            className="text-muted hover:text-rose transition-colors cursor-pointer p-1">
            <Icon name="github" className="w-4 h-4" color="#9a7a78" />
          </a>
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

        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} wide={p.featured} />
          ))}
        </div>
        {projects.length > 4 && (
          <div className="reveal text-center mt-10">
            <a href="https://github.com/johnbsantos" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Icon name="github" className="w-4 h-4" color="#b28784" />
              View All on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
