import { useEffect, useRef, useState } from 'react'
import SecurePeekMock from './mockups/SecurePeekMock'
import AuraWashMock from './mockups/AuraWashMock'

const MOCKS = { shield: SecurePeekMock, laundry: AuraWashMock }

/* Abstract previews for the projects that have no built mockup yet. */
function AbstractThumb({ thumb }) {
  if (thumb === 'portfolio') return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full rounded-xl overflow-hidden border border-line bg-card">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-raised">
          <span className="w-2 h-2 rounded-full bg-line2" />
          <span className="w-2 h-2 rounded-full bg-line2" />
          <span className="w-2 h-2 rounded-full bg-line2" />
          <div className="flex-1 mx-2 h-2.5 rounded-full bg-raised" />
        </div>
        <div className="p-4 space-y-2.5">
          <div className="h-4 rounded w-1/2 bg-accent/50" />
          <div className="h-2.5 rounded w-full bg-line" />
          <div className="h-2.5 rounded w-5/6 bg-line" />
          <div className="flex gap-2 pt-2">
            <div className="h-7 w-24 rounded-full bg-accent" />
            <div className="h-7 w-24 rounded-full border border-line2" />
          </div>
        </div>
      </div>
    </div>
  )

  if (thumb === 'todo') return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { label: 'Now',   items: 2, cls: 'bg-accent/70' },
          { label: 'Next',  items: 3, cls: 'bg-iris/50' },
          { label: 'Later', items: 1, cls: 'bg-line' },
        ].map(({ label, items, cls }) => (
          <div key={label} className="space-y-2">
            <div className="mock-label mb-2">{label}</div>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className={`h-8 rounded-lg ${cls}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-3 p-8 content-center">
      <div className="h-14 rounded-xl bg-accent/30" />
      <div className="h-14 rounded-xl col-span-2 bg-accent/60" />
      <div className="h-14 rounded-xl bg-iris/40" />
      <div className="h-9 rounded-xl col-span-3 bg-line" />
      <div className="h-9 rounded-xl bg-line2" />
    </div>
  )
}

/**
 * Renders a project preview that reads like a screenshot.
 *
 * The mockup is laid out at a fixed `targetWidth` and then scaled by
 * container / targetWidth, so it always renders as if the viewport were
 * ~1200px wide and shrinks to fit. That keeps the desktop layout at every
 * breakpoint — a purely proportional scale let the inner layout collapse to
 * ~400px on a phone, which switched the mockup to its stacked mobile layout and
 * made it 719px tall instead of 586px.
 *
 * CSS cannot express this: `calc(100cqw / 1200px)` is invalid because dividing
 * two lengths is not allowed, so the ratio is measured with a ResizeObserver.
 *
 * `fit="auto"` sizes the box to the scaled content (detail pages, no dead
 * space); `fit="crop"` keeps the height from `className` so a card grid stays
 * on one baseline.
 */
export default function WorkThumb({ thumb, className = 'h-[220px]', fit = 'crop', targetWidth = 1200 }) {
  const Mock = MOCKS[thumb]
  const boxRef = useRef(null)
  const innerRef = useRef(null)
  const [{ scale, height }, setBox] = useState({ scale: 0.35, height: null })

  useEffect(() => {
    if (!Mock) return
    const box = boxRef.current
    const inner = innerRef.current
    if (!box || !inner) return

    let lastWidth = 0
    const measure = () => {
      const width = box.clientWidth
      // Setting `height` below would retrigger the observer; only react to width
      if (width === lastWidth) return
      lastWidth = width
      const next = width / targetWidth
      setBox({ scale: next, height: Math.round(inner.offsetHeight * next) })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [Mock, thumb, targetWidth])

  return (
    <div
      ref={boxRef}
      className={`on-dark relative overflow-hidden bg-surface ${fit === 'auto' ? '' : className}`}
      style={fit === 'auto' && height ? { height } : undefined}
    >
      {Mock ? (
        <div
          ref={innerRef}
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: targetWidth, transform: `scale(${scale})` }}
        >
          <div className="p-5">
            <Mock />
          </div>
        </div>
      ) : (
        <AbstractThumb thumb={thumb} />
      )}
    </div>
  )
}
