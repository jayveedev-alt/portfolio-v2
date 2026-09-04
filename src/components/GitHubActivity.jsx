import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'
import { useCountUp } from './useCountUp'
import { useAppReady } from './appReady'

const PROFILE_URL = 'https://github.com/jayveedev-alt'

// Level 0 is the empty-day tint; 1–4 ramp toward the full accent.
const LEVEL_BG = [
  'rgba(255,255,255,0.07)',
  'rgba(51,118,255,0.32)',
  'rgba(51,118,255,0.55)',
  'rgba(51,118,255,0.78)',
  '#3376FF',
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function chunkIntoWeeks(days) {
  const weeks = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00Z`)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

function StatTile({ icon, value, suffix = '', label }) {
  const [ref, shown] = useCountUp(value)

  return (
    <div ref={ref} className="mock-tile !px-5 !py-4">
      <Icon name={icon} className="w-4 h-4" color="currentColor" />
      <div
        className="font-mono font-medium text-xl sm:text-2xl text-ink mt-3 tabular-nums"
        // Reserve the settled width so counting 0 → 1393 does not shift the tile
        style={{ minWidth: `${String(value).length + suffix.length}ch` }}
      >
        {shown.toLocaleString()}{suffix}
      </div>
      <div className="mock-label mt-1.5">{label}</div>
    </div>
  )
}

function Heatmap({ days }) {
  const weeks = chunkIntoWeeks(days)
  const gridRef = useRef(null)
  // 'idle' before the first view, then 'in' / 'out' as the grid enters and
  // leaves — so the sweep replays instead of firing once and staying put.
  const [phase, setPhase] = useState('idle')
  const ready = useAppReady()

  useEffect(() => {
    const el = gridRef.current
    if (!el || !ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('in')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPhase((prev) => (entry.isIntersecting ? 'in' : prev === 'idle' ? 'idle' : 'out')),
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ready])

  // Longest delay in the diagonal sweep, used to run the exit in reverse
  const maxDelay = (weeks.length - 1 + 6) * 11

  // Label a column when its week opens a month the previous week did not
  const monthLabels = weeks.map((week, i) => {
    const month = new Date(`${week[0].date}T00:00:00Z`).getUTCMonth()
    if (i === 0) return null
    const prev = new Date(`${weeks[i - 1][0].date}T00:00:00Z`).getUTCMonth()
    return month === prev ? null : MONTHS[month]
  })

  return (
    <div ref={gridRef} className="overflow-x-auto pb-1">
      <div className="min-w-max">
        {/* Month row */}
        <div className="flex gap-[3px] mb-2 h-4">
          {weeks.map((week, i) => (
            <div key={week[0].date} className="w-[11px] shrink-0 relative">
              {monthLabels[i] && (
                <span className="absolute left-0 top-0 mock-label whitespace-nowrap">
                  {monthLabels[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Day grid — one column per week, Sunday at the top */}
        <div className="flex gap-[3px]">
          {weeks.map((week, w) => (
            <div key={week[0].date} className="flex flex-col gap-[3px]">
              {week.map((day, d) => (
                <div
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`}
                  className={`w-[11px] h-[11px] rounded-[2px]
                              ${phase === 'in' ? 'heat-cell' : ''}
                              ${phase === 'out' ? 'heat-cell-out' : ''}`}
                  style={{
                    backgroundColor: LEVEL_BG[day.level],
                    // Column + row, so the sweep runs on a diagonal rather than
                    // finishing one whole week before starting the next. Going
                    // out, the delay is mirrored so the last cell in is the
                    // first cell out.
                    animationDelay:
                      phase === 'in' ? `${(w + d) * 11}ms`
                      : phase === 'out' ? `${maxDelay - (w + d) * 11}ms`
                      : undefined,
                    opacity: phase === 'idle' ? 0 : undefined,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GitHubActivity() {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch('/api/github')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json) => {
        if (cancelled) return
        if (json.success) setData(json)
        else setFailed(true)
      })
      .catch(() => !cancelled && setFailed(true))

    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="on-dark py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14 max-w-2xl">
          <div className="eyebrow">Open Source</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            GitHub <span className="accent-em">activity.</span>
          </h2>
        </div>

        <div className="reveal card p-7 sm:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                </span>
                <span className="mock-label">Live from GitHub</span>
              </div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-ink">
                @{data?.username ?? 'jayveedev-alt'}
              </div>
              <p className="text-muted text-sm leading-relaxed mt-3 max-w-sm">
                Most client work sits in private repositories — this is the commit history
                behind it.
              </p>
            </div>

            <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
              <Icon name="github" className="w-4 h-4" color="currentColor" />
              View profile
            </a>
          </div>

          {failed && (
            <p className="text-muted text-sm">
              Could not reach GitHub right now.{' '}
              <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-accentT hover:underline">
                View the profile directly
              </a>
              .
            </p>
          )}

          {!failed && !data && (
            <div className="space-y-6" aria-busy="true" aria-label="Loading GitHub activity">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="mock-tile !px-5 !py-4 h-[104px] animate-pulse" />
                ))}
              </div>
              <div className="h-[100px] rounded-xl bg-raised animate-pulse" />
            </div>
          )}

          {!failed && data && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                <StatTile icon="activity" value={data.stats.total} label="Contributions, past year" />
                <StatTile icon="calendar" value={data.stats.activeDays} label="Days with commits" />
                <StatTile
                  icon="bolt"
                  value={data.stats.longestStreak}
                  suffix={data.stats.longestStreak === 1 ? ' day' : ' days'}
                  label="Longest streak"
                />
                <StatTile icon="bar-chart" value={data.stats.busiestDay} label="Busiest single day" />
              </div>

              <Heatmap days={data.days} />

              <div className="flex items-center justify-end gap-2 mt-4">
                <span className="mock-label">Less</span>
                {LEVEL_BG.map((bg, i) => (
                  <span key={i} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: bg }} />
                ))}
                <span className="mock-label">More</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
