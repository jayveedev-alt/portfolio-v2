import activity from '../lib/githubActivity.cjs'

const DEFAULT_USERNAME = 'jayveedev-alt'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME

  try {
    const data = await activity.getActivity(username, process.env.GITHUB_TOKEN)

    // Contributions change at most once a day; let the edge serve a cached copy
    // and refresh in the background rather than hitting GitHub on every view.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.json({ success: true, ...data })
  } catch (err) {
    console.error('GitHub activity error:', err.message)
    res.status(502).json({ success: false, error: 'Could not load GitHub activity.' })
  }
}
