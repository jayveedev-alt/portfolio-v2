import Home from '../src/views/Home'
import { absolute, site } from '../src/lib/site'

export const metadata = {
  // The layout's default title already names the brand, so no override here —
  // a template applied to the home page would read "Santos Builds — Santos Builds".
  alternates: { canonical: '/' },
}

/**
 * ProfilePage tells search engines this URL is *about* the person in the
 * layout's Person node, rather than merely mentioning them.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': absolute('/#profilepage'),
  url: site.url,
  name: site.title,
  description: site.description,
  mainEntity: { '@id': absolute('/#person') },
  isPartOf: { '@id': absolute('/#website') },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  )
}
