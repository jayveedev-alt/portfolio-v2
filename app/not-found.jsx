import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
  // A 404 that gets indexed is a 404 that shows up in search results.
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="pt-40 pb-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mock-label text-accentT">404</div>
        <h1 className="h-display text-4xl sm:text-5xl text-ink mt-4">
          This page does not exist.
        </h1>
        <p className="text-muted leading-relaxed mt-5">
          The link may be out of date, or the project may have moved. The work is all
          on the home page.
        </p>
        <Link href="/" className="btn-accent mt-9 inline-flex">
          Back to the portfolio
        </Link>
      </div>
    </main>
  )
}
