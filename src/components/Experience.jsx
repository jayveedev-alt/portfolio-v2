import { workExperience, skillGroups } from '../data/experience'
import { Icon } from './Icons'

function TimelineItem({ item }) {
  return (
    <div className="relative mb-10 last:mb-0">
      <div className="timeline-dot" style={item.isEducation ? { background: '#e0cccb' } : {}} />
      <div className="card card-hover p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
          <div>
            <div className="font-semibold text-ink">{item.role}</div>
            <div className="text-rose font-medium text-sm">{item.company}</div>
          </div>
          <span className="tag text-xs">{item.period}</span>
        </div>
        <p className="text-muted text-sm leading-relaxed mt-2">{item.description}</p>
      </div>
    </div>
  )
}

function SkillGroup({ group }) {
  return (
    <div>
      <div className="text-xs font-mono text-muted uppercase tracking-widest mb-3">
        {group.label}
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((s) => (
          <span key={s.name} className="skill-chip">
            <Icon name={s.icon} className="w-4 h-4" />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <div className="section-label">Background</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ink">Experience & Skills</h2>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Timeline */}
          <div>
            <h3 className="font-heading font-semibold text-xl text-ink mb-8">Work Experience</h3>
            <div className="relative pl-10">
              <div className="timeline-line" />
              {workExperience.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Skill chips */}
          <div>
            <h3 className="font-heading font-semibold text-xl text-ink mb-8">Tech Stack</h3>
            <div className="space-y-7">
              {skillGroups.map((g) => (
                <SkillGroup key={g.label} group={g} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
