import projectsData from './projects.json'
import { caseStudies } from './caseStudies'

/**
 * One list for the work grid and the /work/:slug pages. `projects.json` is the
 * editable source of truth — plain JSON so entries can be added without
 * touching any code. A project that also has a deep dive in `caseStudies.js`
 * gets it attached as `study`.
 *
 * JSON has no comments, so an unfinished entry is hidden with `"draft": true`
 * rather than being commented out.
 */
const studyBySlug = Object.fromEntries(caseStudies.map((c) => [c.id, c]))

export const workItems = projectsData
  .filter((p) => !p.draft)
  .map((p) => ({ ...p, study: studyBySlug[p.slug] ?? null }))

const ALL_CATEGORIES = [
  { id: 'all',        label: 'All projects' },
  { id: 'systems',    label: 'Systems & platforms' },
  { id: 'mobile',     label: 'Mobile apps' },
  { id: 'ecommerce',  label: 'E-commerce' },
  { id: 'webapps',    label: 'Web apps' },
  { id: 'marketing',  label: 'Marketing sites' },
]

// A pill with nothing behind it is a dead end, so only keep the ones in use.
export const categories = ALL_CATEGORIES.filter(
  (c) => c.id === 'all' || workItems.some((w) => w.category === c.id)
)

export function getWorkItem(slug) {
  return workItems.find((w) => w.slug === slug) ?? null
}

export function getAdjacent(slug) {
  const i = workItems.findIndex((w) => w.slug === slug)
  if (i === -1) return { next: null }
  return { next: workItems[(i + 1) % workItems.length] }
}
