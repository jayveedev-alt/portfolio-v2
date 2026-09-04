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
          <span className="px-7 font-display text-lg sm:text-2xl text-onAccent">
            {item}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-onAccent/60 shrink-0" />
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  // The rotation pushes the band's bounding box past the viewport (2px at every
  // width), which was the page's only horizontal overflow — masked only by
  // `body { overflow-x: hidden }`. An unrotated wrapper clips it properly. The
  // band is also wider than the wrapper so its rotated corners are cut off
  // outside the viewport instead of showing as notches, and the wrapper's
  // vertical padding leaves room for the ~25px of tilt.
  return (
    <div className="overflow-hidden py-8">
      <section className="relative rotate-[-2deg] w-[106%] -ml-[3%] py-10 bg-accent overflow-hidden">
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
    </div>
  )
}
