/**
 * One place for the facts that the metadata, sitemap, robots and JSON-LD all
 * need to agree on. Everything SEO-related reads from here, so the canonical
 * host is stated once rather than pasted into five files that drift apart.
 *
 * NEXT_PUBLIC_SITE_URL must be the real production origin: canonical tags,
 * sitemap entries and og:url are all built from it, and pointing them at the
 * wrong host is worse than having none. Vercel exposes VERCEL_PROJECT_
 * PRODUCTION_URL on every deployment, so production is right by default and
 * preview builds still resolve to something absolute.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null)

export const SITE_URL = (fromEnv || 'https://johnbsantos.dev').replace(/\/$/, '')

export const site = {
  url: SITE_URL,
  name: 'Santos Builds',
  author: 'John Benedict Santos',
  jobTitle: 'Full Stack Developer',
  title: 'Santos Builds — Crafting Full Stack Web & Mobile Solutions',
  description:
    'Full-stack developer with 7+ years of experience building clean, scalable web and mobile applications. Available for freelance work and full-time opportunities.',
  locale: 'en_PH',
  email: 'jayveedev.alt@gmail.com',
  ogImage: '/og-image.png',
  social: {
    github: 'https://github.com/jayveedev-alt',
    linkedin: 'https://linkedin.com/in/johnbsantos',
    twitter: 'https://twitter.com/johnbsantos',
  },
  twitterHandle: '@johnbsantos',
}

export const absolute = (path = '/') => new URL(path, SITE_URL).toString()
