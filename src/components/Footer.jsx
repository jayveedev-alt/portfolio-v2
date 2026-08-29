import { Icon } from './Icons'

const socials = [
  { label: 'GitHub',   icon: 'github',   href: 'https://github.com/jayveedev-alt' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/johnbsantos' },
  { label: 'Twitter',  icon: 'twitter',  href: 'https://twitter.com/johnbsantos' },
]

const siteLinks = [
  { label: 'Work',       href: '#work' },
  { label: 'Services',   href: '#services' },
  { label: 'Process',    href: '#process' },
  { label: 'Stack',      href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'FAQ',        href: '#faq' },
]

const contactLinks = [
  { label: 'jayveedev.alt@gmail.com', href: 'mailto:jayveedev.alt@gmail.com' },
  { label: 'Book a call',             href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-line bg-dark-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a href="#hero" className="inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center
                               font-mono text-xs text-accent">
                JB
              </span>
            </a>
            <p className="text-muted text-sm mt-4 leading-relaxed max-w-[230px]">
              Full-stack developer building clean, scalable web products — interface to deploy.
            </p>
            <div className="flex items-center gap-2 mt-5 font-mono text-[0.66rem] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              Available for work
            </div>
          </div>

          {/* Site */}
          <div>
            <div className="mock-label mb-4">Site</div>
            <div className="flex flex-col gap-3">
              {siteLinks.map((l) => (
                <a key={l.label} href={l.href}
                  className="text-sm text-muted hover:text-accent transition-colors cursor-pointer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="mock-label mb-4">Contact</div>
            <div className="flex flex-col gap-3">
              {contactLinks.map((l) => (
                <a key={l.label} href={l.href}
                  className="text-sm text-muted hover:text-accent transition-colors cursor-pointer break-all">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="mock-label mb-4">Social</div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-line flex items-center justify-center
                             text-muted hover:text-accent hover:border-accent/40 transition-colors cursor-pointer">
                  <Icon name={s.icon} className="w-4 h-4" color="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-7 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.66rem] text-faint text-center sm:text-left">
            © {new Date().getFullYear()} John Benedict Santos — All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="font-mono text-[0.66rem] text-faint hidden md:block">
              Built with React, Vite &amp; Tailwind CSS
            </p>
            <a href="#hero"
              className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] text-muted hover:text-accent transition-colors cursor-pointer">
              Back to top
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
