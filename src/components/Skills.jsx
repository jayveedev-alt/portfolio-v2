import { techStack } from '../data/techStack'
import EdgeMarquee from './EdgeMarquee'

function Logo({ item, className = 'w-6 h-6 sm:w-7 sm:h-7', color }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color ?? item.color} aria-hidden="true">
      <path d={item.path} />
    </svg>
  )
}

function Tile({ item }) {
  return (
    <div
      role="img"
      aria-label={item.label}
      title={item.label}
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-raised border border-line
                 flex items-center justify-center transition-all duration-300
                 hover:bg-raised hover:border-accent/40 hover:-translate-y-1"
    >
      <Logo item={item} />
    </div>
  )
}

// One repetition of the hover marquee: the group name, then its logos in a pill
function MarqueePart({ group }) {
  return (
    <>
      <span
        className="font-heading font-bold uppercase whitespace-nowrap px-8
                   text-2xl sm:text-3xl lg:text-[2.1rem] tracking-[-0.03em] text-onAccent"
      >
        {group.title}
      </span>
      <span className="flex items-center gap-5 lg:gap-6 pr-8">
        {group.items.map((item) => (
          <Logo
            key={item.label}
            item={item}
            color="#ffffff"
            className="w-10 h-10 lg:w-12 lg:h-12"
          />
        ))}
      </span>
    </>
  )
}

function StackGroup({ group }) {
  return (
    <EdgeMarquee
      className="border-t border-line first:border-t-0"
      background="#3376FF"
      speed={18}
      part={<MarqueePart group={group} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-12">
        {/* Left: number + title + description */}
        <div className="lg:col-span-6 flex gap-5">
          <span className="font-mono text-xs text-accentT pt-2.5 shrink-0">{group.number}</span>
          <div>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.6rem]
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
    </EdgeMarquee>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-10 max-w-2xl">
          <div className="eyebrow">Tech Stack</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            The tools I actually <span className="accent-em">reach for.</span>
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            Not a logo wall of everything I have ever opened — five areas, and the specific
            things I work in every week. Hover a row to bring it forward.
          </p>
        </div>

        {/* The rows animate on hover, so they opt out of the scroll-reveal fade */}
        <div className="reveal">
          {techStack.map((group) => (
            <StackGroup key={group.number} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
