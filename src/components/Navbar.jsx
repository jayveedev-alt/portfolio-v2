import { useState, useEffect } from 'react'
import { Icon } from './Icons'

const links = [
  { label: 'What I Do',   href: '#what-i-do',  id: 'what-i-do'  },
  { label: 'Projects',    href: '#projects',    id: 'projects'    },
  { label: 'Experience',  href: '#experience',  id: 'experience'  },
  { label: 'Contact',     href: '#contact',     id: 'contact'     },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((l) => l.id)
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      } bg-cream/80 backdrop-blur-md border-b border-border`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-heading font-bold text-xl text-ink tracking-tight" aria-label="John Benedict Santos">
          JB<span className="text-rose">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.id ? 'true' : undefined}
              className={`nav-link ${active === l.id ? 'text-ink after:w-full' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#contact" className="btn-primary hidden md:inline-flex">Book a Call</a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-muted hover:text-ink transition-colors cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Icon name={open ? 'x' : 'menu'} className="w-5 h-5" color="#6b7280" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 border-t border-border bg-cream">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.id ? 'true' : undefined}
              className={`nav-link block py-1 ${active === l.id ? 'text-ink' : ''}`}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary w-full justify-center mt-1" onClick={close}>Book a Call</a>
        </div>
      )}
    </nav>
  )
}
