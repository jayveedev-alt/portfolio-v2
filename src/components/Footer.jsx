import { Icon } from './Icons'

const socials = [
  { label: 'GitHub',   icon: 'github',   href: 'https://github.com/johnbsantos' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/johnbsantos' },
  { label: 'Twitter',  icon: 'twitter',  href: 'https://twitter.com/johnbsantos' },
]

const siteLinks = [
  { label: 'What I Do',  href: '#what-i-do' },
  { label: 'Process',    href: '#process' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

const contactLinks = [
  { label: 'jayveedev.alt@gmail.com', href: 'mailto:jayveedev.alt@gmail.com' },
  { label: 'Book a call', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ borderTop: '1px solid #e5e7eb' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a href="#hero" className="font-heading font-bold text-xl text-ink">
              JB<span className="text-rose">.</span>
            </a>
            <p className="text-muted text-sm mt-3 leading-relaxed max-w-[220px]">
              Full-stack developer building clean, scalable web products.
            </p>
          </div>

          {/* Site links */}
          <div>
            <div className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Site</div>
            <div className="flex flex-col gap-3">
              {siteLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-ink hover:text-rose transition-colors cursor-pointer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Contact</div>
            <div className="flex flex-col gap-3">
              {contactLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-ink hover:text-rose transition-colors cursor-pointer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Social</div>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted hover:text-rose transition-colors cursor-pointer">
                  <Icon name={s.icon} className="w-4 h-4" color="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #e5e7eb' }}>
          <p className="text-muted text-xs">© {new Date().getFullYear()} John Benedict Santos. All rights reserved.</p>
          <p className="text-muted text-xs">Designed & built by John Benedict Santos</p>
        </div>
      </div>
    </footer>
  )
}
