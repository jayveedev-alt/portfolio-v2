// Infinite skills ribbon — the strip that separates the hero from the case studies.
const items = [
  'Frontend Engineering',
  'React & Next.js',
  'Node.js & Express',
  'TypeScript',
  'PostgreSQL & MySQL',
  'REST & GraphQL APIs',
  'React Native & Flutter',
  'Tailwind CSS',
  'WebSockets & Realtime',
  'Docker & CI/CD',
  'UI/UX & Design Systems',
  'Decoupled Architecture',
]

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-7 font-display text-lg sm:text-2xl text-muted transition-colors duration-300 hover:text-ink">
            {item}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative py-10 border-y border-line bg-card overflow-hidden">
      <div className="marquee-mask marquee-track">
        <div className="flex w-max animate-marquee">
          {/* Two identical rows — the animation shifts exactly -50%, so the seam is invisible */}
          <Row />
          <Row />
        </div>
      </div>
      {/* Screen readers get the list once, without the duplicated visual track */}
      <span className="sr-only">
        Skills: {items.join(', ')}
      </span>
    </section>
  )
}
