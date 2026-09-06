import { workItems } from '../src/data/work'
import { SITE_URL } from '../src/lib/site'

/**
 * Generated rather than hand-written, so adding a project to projects.json
 * puts it in the sitemap without anyone remembering to.
 */
export default function sitemap() {
  const now = new Date()

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...workItems.map((item) => ({
      url: `${SITE_URL}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    })),
  ]
}
