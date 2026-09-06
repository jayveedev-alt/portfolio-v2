'use client'

// Faux live operations board for the AuraWash case study.
// Purely presentational — mirrors the real dashboard's information hierarchy.
const branches = ['All Branches', 'Makati', 'Pasig', 'Quezon City']

const kpis = [
  { label: 'Active Orders', value: '38',      sub: 'across 3 branches', tone: 'text-ink' },
  { label: 'Revenue Today', value: '₱24,850', sub: '+12% vs. yesterday', tone: 'text-mint' },
  { label: 'Drivers',       value: '5 / 6',   sub: '1 on break',        tone: 'text-ink' },
  { label: 'Avg. Turnaround', value: '6.2h',  sub: 'target 8h',         tone: 'text-mint' },
]

const orders = [
  { id: '#AW-2041', customer: 'M. Reyes',   branch: 'Makati', status: 'Delivered', ago: '4m',  tone: 'bg-mint/10 text-mint border-mint/25' },
  { id: '#AW-2042', customer: 'J. Cruz',    branch: 'Pasig',  status: 'Ready',     ago: '9m',  tone: 'bg-accent/10 text-accentT border-accent/25' },
  { id: '#AW-2043', customer: 'A. Domingo', branch: 'Makati', status: 'Washing',   ago: '21m', tone: 'bg-iris/10 text-iris border-iris/25' },
  { id: '#AW-2044', customer: 'R. Santos',  branch: 'QC',     status: 'Pickup',    ago: '32m', tone: 'bg-aqua/10 text-aqua border-aqua/25' },
]

export default function AuraWashMock() {
  return (
    <div className="mock-window">
      {/* ── App chrome ── */}
      <div className="mock-bar">
        <span className="mock-dot bg-line2" />
        <span className="mock-dot bg-line2" />
        <span className="mock-dot bg-line2" />
        <div className="flex-1 mx-3 font-mono text-[0.62rem] text-faint truncate">
          AURAWASH ADMIN · Bloom Laundry Co.
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.6rem] text-mint shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-dot absolute inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
          Live · synced
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-4 sm:p-6 space-y-4">

        {/* Branch filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="mock-label shrink-0 mr-1">Branch</span>
          {branches.map((b, i) => (
            <span
              key={b}
              className={`shrink-0 px-3 py-1 rounded-full border font-mono text-[0.62rem] ${
                i === 0
                  ? 'bg-accent/10 text-accentT border-accent/30'
                  : 'bg-raised text-faint border-line'
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="mock-tile">
              <div className="mock-label">{k.label}</div>
              <div className={`font-mono font-medium text-lg mt-1.5 ${k.tone}`}>{k.value}</div>
              <div className="font-mono text-[0.6rem] text-faint mt-1">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Order pipeline */}
        <div>
          <div className="flex items-center justify-between mb-2.5 gap-3">
            <span className="mock-label">Order Pipeline</span>
            <span className="mock-label text-mint">Realtime · WebSocket</span>
          </div>
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="mock-row">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[0.62rem] text-faint shrink-0">{o.id}</span>
                  <div className="min-w-0">
                    <div className="text-[0.78rem] text-ink truncate">{o.customer}</div>
                    <div className="font-mono text-[0.6rem] text-faint mt-0.5">{o.branch} · {o.ago} ago</div>
                  </div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full border font-mono text-[0.6rem] ${o.tone}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch strip */}
        <div className="mock-row">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
              <span className="font-mono text-[0.6rem] text-accentT">D3</span>
            </div>
            <div className="min-w-0">
              <div className="text-[0.78rem] text-ink truncate">Driver dispatch · Route 3</div>
              <div className="font-mono text-[0.6rem] text-faint mt-0.5">4 pickups queued · Makati → Pasig</div>
            </div>
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded-full border font-mono text-[0.6rem] bg-mint/10 text-mint border-mint/25">
            En route
          </span>
        </div>
      </div>
    </div>
  )
}
