import { SITE_URL } from '../src/lib/site'

export default function robots() {
  return {
    rules: [
      // The API routes hold nothing worth indexing, and /api/contact is a POST
      // endpoint that would only ever return a 405 to a crawler.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
