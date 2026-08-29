import { techStack } from '../data/techStack'

function Tile({ item }) {
  return (
    <div
      role="img"
      aria-label={item.label}
      title={item.label}
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.05] border border-line
                 flex items-center justify-center transition-all duration-300
                 hover:bg-white/[0.09] hover:border-accent/40 hover:-translate-y-1"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill={item.color} aria-hidden="true">
        <path d={item.path} />
      </svg>
    </div>
  )
}

function StackGroup({ group }) {
  return (
    <div
      className="reveal-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start
                 py-12 border-t border-line first:border-t-0 first:pt-0"
    >
      {/* Left: number + title + description */}
      <div className="lg:col-span-6 flex gap-5">
        <span className="font-mono text-xs text-accent pt-2.5 shrink-0">{group.number}</span>
        <div>
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.6rem]
                         leading-[1.06] tracking-[-0.03em] text-ink">
            {group.title}
          </h3>
          <p className="text-muted mt-4 max-w-md leading-relaxed">{group.description}</p>
        </div>
      </div>

      {/* Right: the logos themselves */}
      <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
        {group.items.map((item) => (
          <Tile key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16 max-w-2xl">
          <div className="eyebrow">Tech Stack</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            The tools I actually <span className="serif-em">reach for.</span>
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            Not a logo wall of everything I have ever opened — five areas, and the specific
            things I work in every week.
          </p>
        </div>

        <div>
          {techStack.map((group) => (
            <StackGroup key={group.number} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
