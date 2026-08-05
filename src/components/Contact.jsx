import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'

const CALENDLY_URL =
  'https://calendly.com/jayveedev-alt/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3758f9'

const quickLinks = [
  { label: 'Email',    value: 'jayveedev.alt@gmail.com', icon: 'mail',     href: 'mailto:jayveedev.alt@gmail.com' },
  { label: 'LinkedIn', value: 'John Benedict Santos',    icon: 'linkedin', href: 'https://linkedin.com/in/johnbsantos' },
  { label: 'GitHub',   value: '@johnbsantos',            icon: 'github',   href: 'https://github.com/johnbsantos' },
]

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
  const cooldownRef = useRef(null)

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
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="reveal mb-14 text-center">
          <div className="section-label-center">Let's Work Together</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ink mt-2">
            Book a call or<br />
            <em className="not-italic text-rose">send a message</em>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Pick a time that works for you, or drop me a message below. I typically respond within 24 hours.
          </p>
        </div>

        {/* Quick link cards */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {quickLinks.map((l) => (
            <a key={l.label} href={l.href}
              target={l.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="card card-hover p-5 flex items-center gap-4 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(55,88,249,0.1)' }}>
                <Icon name={l.icon} className="w-5 h-5" color="#3758f9" />
              </div>
              <div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">{l.label}</div>
                <div className="font-medium text-ink text-sm">{l.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly + Form */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Calendly embed */}
          <div className="card overflow-hidden">
            <div className="px-6 pt-6 pb-2">
              <div className="section-label">Schedule a Meeting</div>
              <h3 className="font-heading font-semibold text-xl text-ink">Pick a time</h3>
              <p className="text-muted text-sm mt-1">30-min discovery call — free, no pressure.</p>
            </div>
            <div
              ref={calendlyRef}
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '100%', height: 580 }}
            />
          </div>

          {/* Contact form */}
          <div className="card p-7">
            <div className="section-label">Or Send a Message</div>
            <h3 className="font-heading font-semibold text-xl text-ink mb-6">Drop me a note</h3>
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
                  <label htmlFor="name" className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Name</label>
                  <input
                    id="name" name="name" type="text" placeholder="John Doe"
                    className={`form-input ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                    value={fields.name} onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Email</label>
                  <input
                    id="email" name="email" type="email" placeholder="john@example.com"
                    className={`form-input ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                    value={fields.email} onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Subject</label>
                <input
                  id="subject" name="subject" type="text" placeholder="Project inquiry, job offer..."
                  className="form-input"
                  value={fields.subject} onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message" name="message" rows={6} placeholder="Tell me about your project..."
                  className={`form-input resize-none ${errors.message ? 'border-red-400 focus:border-red-400' : ''}`}
                  value={fields.message} onChange={handleChange}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button type="submit" disabled={isDisabled}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending…
                  </>
                ) : cooldown > 0 ? (
                  `Wait ${cooldown}s before sending again`
                ) : (
                  <>
                    <Icon name="paper-plane" className="w-4 h-4" color="white" />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm font-medium text-rose">
                  Message sent! I'll get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm font-medium text-red-500">
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
