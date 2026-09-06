'use client'

// Faux "scan report" UI for the SecurePeek case study.
// Purely presentational — no data, no state, just the shape of the real product.
const checks = [
  { name: 'HTTPS Redirect',            detail: '301 → https://',   state: 'pass' },
  { name: 'Strict-Transport-Security', detail: 'max-age=31536000', state: 'pass' },
  { name: 'Content-Security-Policy',   detail: 'Header not set',   state: 'fail' },
  { name: 'X-Frame-Options',           detail: 'SAMEORIGIN',       state: 'pass' },
  { name: 'Server Version Exposed',    detail: 'nginx/1.24.0',     state: 'warn' },
]

const badge = {
  pass: { label: 'Pass',    cls: 'bg-mint/10 text-mint border-mint/25' },
  warn: { label: 'Warning', cls: 'bg-accent/10 text-accentT border-accent/25' },
  fail: { label: 'Missing', cls: 'bg-rose-500/10 text-rose-400 border-rose-500/25' },
}

const tiles = [
  { label: 'SSL / TLS', value: 'Valid',  tone: 'text-mint' },
  { label: 'Headers',   value: '6 / 9',  tone: 'text-accentT' },
  { label: 'Findings',  value: '2 High', tone: 'text-rose-400' },
]

export default function SecurePeekMock() {
  return (
    <div className="mock-window">
      {/* ── Browser chrome ── */}
      <div className="mock-bar">
        <span className="mock-dot bg-line2" />
        <span className="mock-dot bg-line2" />
        <span className="mock-dot bg-line2" />
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-raised border border-line
                        font-mono text-[0.62rem] text-faint truncate">
          securepeek.app / report · acme-store.com
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.6rem] text-mint shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          Scan complete
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-4 sm:p-6 space-y-4">

        {/* Score + KPI tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="mock-tile col-span-2 sm:col-span-1 flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none" stroke="#3376FF" strokeWidth="3"
                  strokeLinecap="round" strokeDasharray="87 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono font-medium text-lg text-ink">87</span>
              </div>
            </div>
            <div>
              <div className="mock-label">Security Score</div>
              <div className="text-xs text-mint font-medium mt-1">Good</div>
            </div>
          </div>

          {tiles.map((t) => (
            <div key={t.label} className="mock-tile">
              <div className="mock-label">{t.label}</div>
              <div className={`font-mono font-medium text-lg mt-1.5 ${t.tone}`}>{t.value}</div>
            </div>
          ))}
        </div>

        {/* Checks list */}
        <div>
          <div className="flex items-center justify-between mb-2.5 gap-3">
            <span className="mock-label">Header &amp; Transport Checks</span>
            <span className="mock-label text-accentT">Sorted by impact</span>
          </div>
          <div className="space-y-2">
            {checks.map((c) => (
              <div key={c.name} className="mock-row">
                <div className="min-w-0">
                  <div className="text-[0.78rem] text-ink truncate">{c.name}</div>
                  <div className="font-mono text-[0.62rem] text-faint truncate mt-0.5">{c.detail}</div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full border font-mono text-[0.6rem] ${badge[c.state].cls}`}>
                  {badge[c.state].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate strip */}
        <div className="mock-row">
          <div className="min-w-0">
            <div className="mock-label">Certificate</div>
            <div className="text-[0.78rem] text-ink mt-1 truncate">Let&apos;s Encrypt R3 · RSA 2048</div>
          </div>
          <div className="text-right shrink-0">
            <div className="mock-label">Expires in</div>
            <div className="font-mono text-[0.78rem] text-mint mt-1">64 days</div>
          </div>
        </div>
      </div>
    </div>
  )
}
