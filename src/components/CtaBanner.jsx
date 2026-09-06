'use client'

import { useState } from 'react'
import { Icon } from './Icons'

const EMAIL = 'jayveedev.alt@gmail.com'

export default function CtaBanner() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure origin or denied permission) — the mailto link still works.
    }
  }

  return (
    <section className="px-6 py-28 border-t border-line relative overflow-hidden">
      {/* Accent bloom behind the panel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full blur-[140px] opacity-[0.09] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3376FF, transparent 65%)' }}
      />

      <div className="reveal relative max-w-4xl mx-auto text-center">
        <div className="eyebrow-center">Ready When You Are</div>

        <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-6">
          Have a project in mind?<br />
          <span className="accent-em">Let&apos;s talk.</span>
        </h2>

        <p className="text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          A high-end landing page, a rebuild with real motion, or a working SaaS product —
          tell me what you are trying to make and I will tell you exactly what it takes.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a href={`mailto:${EMAIL}`} className="btn-accent">
            <Icon name="mail" className="w-4 h-4" color="currentColor" />
            Send an email
          </a>
          <a href="#contact" className="btn-ghost">
            <Icon name="calendar" className="w-4 h-4" color="currentColor" />
            Book a call
          </a>
        </div>

        {/* Email + copy */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-line bg-raised">
          <span className="font-mono text-xs text-muted">{EMAIL}</span>
          <span className="w-px h-4 bg-line2" />
          <button
            type="button"
            onClick={copyEmail}
            className="font-mono text-xs text-accentT hover:text-ink transition-colors cursor-pointer"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  )
}
