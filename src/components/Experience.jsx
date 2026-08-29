import { workExperience } from '../data/experience'

function TimelineItem({ item }) {
  return (
    <div className="relative mb-8 last:mb-0">
      <div
        className="timeline-dot"
        style={item.isEducation ? { background: '#818cf8', boxShadow: '0 0 0 1px rgba(129,140,248,0.5), 0 0 14px rgba(129,140,248,0.3)' } : {}}
      />
      <div className="card card-hover p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
          <div>
            <div className="font-heading font-semibold text-ink">{item.role}</div>
            <div className={`text-sm font-medium mt-0.5 ${item.isEducation ? 'text-iris' : 'text-accent'}`}>
              {item.company}
            </div>
          </div>
          <span className="tag">{item.period}</span>
        </div>
        <p className="text-muted text-sm leading-relaxed mt-3">{item.description}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 border-t border-line bg-dark-900/40">
      <div className="max-w-3xl mx-auto">
        <div className="reveal mb-16">
          <div className="eyebrow">Background</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            Where I have <span className="serif-em">worked.</span>
          </h2>
        </div>

        <div className="reveal relative pl-10">
          <div className="timeline-line" />
          {workExperience.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
