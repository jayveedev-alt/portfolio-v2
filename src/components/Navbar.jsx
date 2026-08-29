import { useState, useEffect } from 'react'
import { Icon } from './Icons'

const links = [
  { label: 'Work',     href: '#work',       id: 'work'       },
  { label: 'Services', href: '#services',   id: 'services'   },
  { label: 'Process',  href: '#process',    id: 'process'    },
  { label: 'Stack',    href: '#skills',     id: 'skills'     },
  { label: 'FAQ',      href: '#faq',        id: 'faq'        },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = links.map((l) => {
      const el = document.getElementById(l.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(l.id) },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 shrink-0" aria-label="John Benedict Santos — home">
          <span className="w-8 h-8 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center
                           font-mono text-[0.7rem] text-accent">
            JB
          </span>
          <span className="hidden sm:block font-mono text-[0.66rem] tracking-[0.14em] uppercase text-muted leading-tight">
            John B. Santos
            <span className="block text-faint">Full Stack Developer</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
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
        <a href="#contact" className="btn-accent hidden lg:inline-flex !py-2.5 !px-5">
          Let&apos;s talk
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-muted hover:text-accent transition-colors cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Icon name={open ? 'x' : 'menu'} className="w-5 h-5" color="currentColor" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-line bg-dark-950/95 backdrop-blur-xl">
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
          <a href="#contact" className="btn-accent w-full justify-center mt-1" onClick={close}>
            Let&apos;s talk
          </a>
        </div>
      )}
    </nav>
  )
}
