import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { site, absolute } from '../src/lib/site'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import AskBot from '../src/components/AskBot'
import Loader from '../src/components/Loader'
import ScrollManager from '../src/components/ScrollManager'

/**
 * next/font self-hosts these at build time, so the render no longer waits on a
 * round trip to fonts.googleapis.com before it can show text. `display: swap`
 * keeps the first paint readable, and the CSS variables are what
 * tailwind.config.js points `font-body`/`font-heading`/`font-mono` at.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/**
 * `metadataBase` is what lets every other file hand Next a relative image path
 * and still emit an absolute og:image — crawlers reject relative ones.
 */
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    // Sub-pages set only their own name; this appends the brand for them.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.author,
  keywords: [
    'Santos Builds',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Tailwind CSS',
    'PostgreSQL',
    'SaaS',
    'Philippines',
    site.author,
    'Portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    creator: site.twitterHandle,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // No favicon shipped yet. Dropping an `app/icon.png` (or favicon.ico) is
  // enough — Next emits the tags for it automatically, and declaring one that
  // does not exist just points every page at a 404.
}

export const viewport = {
  themeColor: '#F9F9F9',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Person + WebSite, the two entities a portfolio actually is. Search engines
 * use these to connect the site to a named human and to the social profiles
 * that corroborate them, which a <meta name="author"> alone cannot express.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': absolute('/#person'),
      name: site.author,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.jobTitle,
      description: site.description,
      sameAs: [site.social.github, site.social.linkedin, site.social.twitter],
    },
    {
      '@type': 'WebSite',
      '@id': absolute('/#website'),
      name: site.name,
      url: site.url,
      description: site.description,
      inLanguage: 'en',
      publisher: { '@id': absolute('/#person') },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <ScrollManager />
        <Navbar />
        {children}
        <Footer />
        <AskBot />
      </body>
    </html>
  )
}
