import { useState } from 'react'
import { Icon } from './Icons'

const EMAIL = 'jayveedev.alt@gmail.com'

const navLinks = [
  { label: 'Work',       href: '/#work' },
  { label: 'Services',   href: '/#services' },
  { label: 'Process',    href: '/#process' },
  { label: 'Stack',      href: '/#skills' },
  { label: 'FAQ',        href: '/#faq' },
]

const socialLinks = [
  { label: 'GitHub',   href: 'https://github.com/jayveedev-alt' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/johnbsantos' },
  { label: 'Twitter',  href: 'https://twitter.com/johnbsantos' },
]

const contactLinks = [
  { label: EMAIL,        href: `mailto:${EMAIL}` },
  { label: 'Book a call', href: '/#contact' },
]

function Column({ title, links, className = '' }) {
  return (
    <div className={className}>
      <h3 className="font-heading font-semibold text-ink text-sm mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm text-muted hover:text-accentT transition-colors cursor-pointer break-words"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Reuses /api/contact rather than being a decorative input — the address
// becomes both the sender identity and the reply-to on the email he receives.
function InquiryForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error' | 'invalid'

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setStatus('invalid')

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: value,
          email: value,
          subject: 'Project inquiry from the footer',
          message: 'Left an email address in the footer to discuss a project.',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2.5 max-w-md" noValidate>
        <label htmlFor="footer-email" className="sr-only">Your email address</label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status) setStatus(null) }}
          placeholder="Enter your email here"
          autoComplete="email"
          className="form-input flex-1"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="shrink-0 px-6 rounded-xl bg-raised border border-line text-ink text-sm font-semibold
                     transition-all duration-200 cursor-pointer hover:bg-accent hover:text-onAccent
                     hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </form>

      <p aria-live="polite" className="text-xs mt-3 h-4">
        {status === 'invalid' && <span className="text-rose-400">Enter a valid email address.</span>}
        {status === 'sent' && <span className="text-mint">Thanks — I&rsquo;ll be in touch within 24 hours.</span>}
        {status === 'error' && <span className="text-rose-400">Something went wrong. Email me directly instead.</span>}
      </p>
    </>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line  overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: pitch + inquiry form */}
          <div className="lg:col-span-5">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-[1.15] mb-8">
              Let&rsquo;s Discuss Your<br />Next Project
            </h2>

            <InquiryForm />

            <p className="text-muted text-xs mt-10">
              All rights reserved {new Date().getFullYear()} © John Benedict Santos
            </p>
          </div>

          {/* Right: link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <Column title="Navigation" links={navLinks} />
            <Column title="Social" links={socialLinks} />
            <Column title="Contact" links={contactLinks} className="col-span-2 sm:col-span-1" />
          </div>
        </div>


        {/* Nothing may sit below the wordmark, so this goes here */}
        <div className="flex justify-end mt-10">
          <a
            href="/#hero"
            className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] text-muted hover:text-accentT transition-colors cursor-pointer"
          >
            Back to top
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Oversized wordmark — full-bleed, and the last element in the page */}
      <div className="px-6 mt-16" aria-hidden="true">
        <div
          id="footer-wordmark"
          className="font-heading font-bold text-ink uppercase whitespace-nowrap
                     leading-none tracking-[-0.035em] -mb-[0.141em]"
          style={{
            fontSize: 'calc((100vw - 3rem) * 0.118)',
          }}
        >
          Benedict Santos
        </div>
      </div>
      <span className="sr-only">John Benedict Santos</span>
    </footer>
  )
}
