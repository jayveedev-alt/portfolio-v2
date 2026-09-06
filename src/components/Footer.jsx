import { Icon } from './Icons'
import BrandMark from './BrandMark'

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

export default function Footer() {
  return (
    <footer className="on-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: brand. The pitch and email form that used to sit here just
              repeated the contact section directly above it. */}
          <div className="lg:col-span-5">
            <a href="/#hero" className="inline-flex items-center gap-2.5" aria-label="Santos Builds — home">
              <BrandMark size={36} className="rounded-lg" />
            </a>
            <p className="text-muted text-sm mt-4 leading-relaxed max-w-[260px]">
              Full-stack developer building clean, scalable web and mobile products —
              interface to deploy.
            </p>
            <div className="flex items-center gap-2 mt-5 font-mono text-[0.66rem] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              Available for work
            </div>
            <p className="text-faint text-xs mt-8">
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
      <div className="px-6 mt-8 pb-3" aria-hidden="true">
        <div
          id="footer-wordmark"
          className="font-heading font-bold text-ink uppercase whitespace-nowrap text-center
                     leading-none tracking-[-0.035em]"
          style={{
            // Tuned so the wordmark just fills the line: the ratio is
            // per-string, so it needs redoing if the name ever changes.
            fontSize: 'calc((100vw - 3rem) * 0.1428)',
          }}
        >
          Santos Builds
        </div>
      </div>
      <span className="sr-only">Santos Builds</span>
    </footer>
  )
}
