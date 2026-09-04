import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'

const CALENDLY_URL =
  'https://calendly.com/jayveedev-alt/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3376FF'

const quickLinks = [
  { label: 'Email',    value: 'jayveedev.alt@gmail.com', icon: 'mail',     href: 'mailto:jayveedev.alt@gmail.com' },
  { label: 'LinkedIn', value: 'John Benedict Santos',    icon: 'linkedin', href: 'https://linkedin.com/in/johnbsantos' },
  { label: 'GitHub',   value: '@jayveedev-alt',          icon: 'github',   href: 'https://github.com/jayveedev-alt' },
]

const EMAIL = 'jayveedev.alt@gmail.com'
const COOLDOWN_SECONDS = 60

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!fields.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.'
  if (!fields.message.trim()) errors.message = 'Message is required.'
  else if (fields.message.trim().length < 5) errors.message = 'Message must be at least 5 characters.'
  return errors
}

export default function Contact() {
  const calendlyRef = useRef(null)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [copied, setCopied] = useState(false)
  const cooldownRef = useRef(null)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure origin or denied) — the address is still readable
    }
  }

  useEffect(() => {
    if (document.querySelector('script[data-calendly]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.dataset.calendly = 'true'
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    cooldownRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(cooldownRef.current)
  }, [cooldown])

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (cooldown > 0) return

    // Honeypot — bots fill this hidden field, humans don't
    if (e.target._hp_website.value) return

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFields({ name: '', email: '', subject: '', message: '' })
        setErrors({})
        setCooldown(COOLDOWN_SECONDS)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const isDisabled = loading || cooldown > 0

  return (
    <section id="contact" className="py-28 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">

        {/* Heading — the page's single closing CTA now */}
        <div className="reveal mb-14 text-center">
          <div className="eyebrow-center">Ready When You Are</div>
          <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-ink">
            Have a project in mind?<br />
            <span className="accent-em">Let&apos;s talk.</span>
          </h2>
          <p className="text-muted mt-6 max-w-xl mx-auto leading-relaxed">
            A high-end landing page, a rebuild with real motion, or a working SaaS product.
            Pick a time below, or drop me a note — I reply within 24 hours.
          </p>

          {/* Email + copy, carried over from the removed banner */}
          <div className="hidden inline-flex items-center gap-3 px-5 py-2.5 mt-8 rounded-full border border-line bg-card">
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

        {/* Quick links */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {quickLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="card card-hover p-5 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                              bg-accent/[0.07] border border-accent/20
                              group-hover:bg-accent/[0.14] transition-colors duration-300">
                <Icon name={l.icon} className="w-4 h-4" color="#3376FF" />
              </div>
              <div className="min-w-0">
                <div className="mock-label">{l.label}</div>
                <div className="text-sm text-ink truncate mt-0.5">{l.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly + form */}
        <div className="hidden reveal grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Calendly */}
          <div className="card overflow-hidden flex flex-col">
            <div className="px-7 pt-7 pb-4">
              <div className="eyebrow !mb-3">Schedule a Meeting</div>
              <h3 className="font-heading font-semibold text-lg text-ink">Pick a time</h3>
              <p className="text-muted text-sm mt-1.5">30-minute discovery call — free, no pressure.</p>
            </div>
            {/* Calendly renders its own light UI; the rounded shell keeps it a deliberate inset panel */}
            <div className="mx-3 mb-3 rounded-xl overflow-hidden bg-white border border-line">
              <div
                ref={calendlyRef}
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: '100%', height: 580 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="card p-7 sm:p-8">
            <div className="eyebrow !mb-3">Or Send a Message</div>
            <h3 className="font-heading font-semibold text-lg text-ink mb-7">Drop me a note</h3>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot — hidden from real users, traps bots */}
              <input
                type="text"
                name="_hp_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mock-label mb-2">Name</label>
                  <input
                    id="name" name="name" type="text" placeholder="Juan Dela Cruz"
                    className={`form-input ${errors.name ? '!border-rose-500/60' : ''}`}
                    value={fields.name} onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block mock-label mb-2">Email</label>
                  <input
                    id="email" name="email" type="email" placeholder="you@example.com"
                    className={`form-input ${errors.email ? '!border-rose-500/60' : ''}`}
                    value={fields.email} onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mock-label mb-2">Subject</label>
                <input
                  id="subject" name="subject" type="text" placeholder="Project inquiry, job offer…"
                  className="form-input"
                  value={fields.subject} onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block mock-label mb-2">Message</label>
                <textarea
                  id="message" name="message" rows={7} placeholder="Tell me about your project…"
                  className={`form-input resize-none ${errors.message ? '!border-rose-500/60' : ''}`}
                  value={fields.message} onChange={handleChange}
                />
                {errors.message && <p className="text-xs text-rose-400 mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className="btn-accent w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : cooldown > 0 ? (
                  `Wait ${cooldown}s before sending again`
                ) : (
                  <>
                    <Icon name="paper-plane" className="w-4 h-4" color="currentColor" />
                    Send message
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm font-medium text-mint">
                  Message sent — I&apos;ll get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm font-medium text-rose-400">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
