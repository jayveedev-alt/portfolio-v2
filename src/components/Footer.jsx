import { Icon } from './Icons'

const socials = [
  { label: 'GitHub',   icon: 'github',   href: 'https://github.com/johnbsantos' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
  { label: 'Twitter',  icon: 'twitter',  href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid #e8d5d3' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="font-heading font-bold text-xl text-ink">
          JB<span className="text-rose">.</span>
        </a>
        <p className="text-muted text-sm">Designed & built by John Benedict Santos · 2025</p>
        <div className="flex items-center gap-5">
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
    </footer>
  )
}
