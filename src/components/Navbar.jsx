import { useState, useEffect } from 'react'
import { Icon } from './Icons'
import { scrollToSection } from './scrollToSection'
import StaggeredMenu from './StaggeredMenu'

// Served straight out of /public, so the path is stable in dev and on Vercel —
// and same-origin, which is what makes the `download` attribute take effect.
const RESUME_FILE = 'John_Benedict_Santos_Resume.pdf'
const RESUME_URL = `/${RESUME_FILE}`

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M10 2.5a.75.75 0 01.75.75v7.44l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V3.25A.75.75 0 0110 2.5zM3.75 14a.75.75 0 01.75.75v1.5h11v-1.5a.75.75 0 011.5 0v2.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V14.75A.75.75 0 013.75 14z" clipRule="evenodd" />
    </svg>
  )
}

const links = [
  { label: 'Work',     href: '/#work',       id: 'work'       },
  { label: 'Services', href: '/#services',   id: 'services'   },
  { label: 'Process',  href: '/#process',    id: 'process'    },
  { label: 'Stack',    href: '/#skills',     id: 'skills'     },
  { label: 'FAQ',      href: '/#faq',        id: 'faq'        },
]

// The mobile panel gets Contact too — on desktop that lives in the hero and
// the footer, but a phone user opening the menu is usually looking for it.
const mobileLinks = [...links, { label: 'Contact', href: '/#contact', id: 'contact' }]

const socialLinks = [
  { label: 'GitHub',   link: 'https://github.com/jayveedev-alt' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/johnbsantos' },
  { label: 'Twitter',  link: 'https://twitter.com/johnbsantos' },
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

  // Drive the in-page jump ourselves. The browser would aim at the sticky
  // section instead of its runway, and re-clicking the link for the section you
  // are already on does not change the URL, so nothing would re-run.
  const jump = (href) => (event) => {
    const hash = href.slice(href.indexOf('#'))
    if (scrollToSection(hash)) event.preventDefault()
    close()
  }

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/#hero" className="flex items-center shrink-0" aria-label="Mr. Santos — home">
          <span className="font-mono font-bold text-[0.82rem] tracking-[0.1em] uppercase
                           text-ink leading-tight">
            Mr. Santos
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={jump(l.href)}
              aria-current={active === l.id ? 'true' : undefined}
              className={`nav-link ${active === l.id ? 'text-ink after:w-full' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop resume download */}
        <a
          href={RESUME_URL}
          download={RESUME_FILE}
          className="btn-accent hidden lg:inline-flex !py-2.5 !px-5 shrink-0"
          aria-label="Download resume (PDF)"
        >
          <DownloadIcon />
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-muted hover:text-accentT transition-colors cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Icon name={open ? 'x' : 'menu'} className="w-5 h-5" color="currentColor" />
        </button>
      </div>

    </nav>

      {/* Mobile menu — the staggered panel, driven by the toggle above.
          It sits OUTSIDE the nav on purpose. Once scrolled, the nav carries
          `backdrop-blur-xl`, and backdrop-filter makes an element a containing
          block for fixed descendants — nested in there, the full-screen panel
          was being clipped to the 68px height of the bar. */}
      <StaggeredMenu
        open={open}
        onClose={close}
        items={mobileLinks.map((l) => ({
          label: l.label,
          link: l.href,
          ariaLabel: `Go to ${l.label}`,
        }))}
        socialItems={socialLinks}
        onItemClick={(item, event) => jump(item.link)(event)}
        footer={
          <a
            href={RESUME_URL}
            download={RESUME_FILE}
            className="btn-accent w-full justify-center"
            aria-label="Download resume (PDF)"
            onClick={close}
          >
            <DownloadIcon />
            Resume
          </a>
        }
      />
    </>
  )
}
