import ProjectDetail from '../../../src/views/ProjectDetail'
import { workItems, getWorkItem } from '../../../src/data/work'
import { site, absolute } from '../../../src/lib/site'

/**
 * Every project is known at build time, so each one becomes a real static HTML
 * file with its own title, description and Open Graph tags. Under the old SPA
 * a crawler got the same empty shell for all of them and the title was only
 * written after hydration — which is the single biggest SEO change here.
 */
export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }))
}

// Anything not in that list is a 404, not a silently-rendered empty page.
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = getWorkItem(slug)
  if (!item) return {}

  const description = item.study?.summary ?? item.description
  const url = `/work/${item.slug}`
  // Fall back to the site card when a project has no banner of its own.
  const image = item.image || site.ogImage

  return {
    title: item.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${item.title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1600, height: 1000, alt: `${item.title} — project screenshot` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} — ${site.name}`,
      description,
      images: [image],
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const item = getWorkItem(slug)

  const description = item?.study?.summary ?? item?.description

  /**
   * CreativeWork plus a breadcrumb. The breadcrumb is what turns the grey URL
   * line in a search result into "Santos Builds › Work › AuraWash".
   */
  const jsonLd = item && {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': absolute(`/work/${item.slug}#project`),
        name: item.title,
        headline: item.study?.subtitle ?? item.title,
        description,
        url: absolute(`/work/${item.slug}`),
        image: item.image ? absolute(item.image) : absolute(site.ogImage),
        keywords: item.tags.join(', '),
        author: { '@id': absolute('/#person') },
        creator: { '@id': absolute('/#person') },
        isPartOf: { '@id': absolute('/#website') },
        ...(item.liveUrl ? { sameAs: item.liveUrl } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Work', item: absolute('/#work') },
          { '@type': 'ListItem', position: 3, name: item.title },
        ],
      },
    ],
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProjectDetail slug={slug} />
    </>
  )
}
