import { NextResponse } from 'next/server'
import activity from '../../../lib/githubActivity.cjs'

const DEFAULT_USERNAME = 'jayveedev-alt'

// Contributions change at most once a day, so the response is cached at the
// edge and refreshed in the background rather than hitting GitHub per view.
export const revalidate = 3600

export async function GET() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME

  try {
    const data = await activity.getActivity(username, process.env.GITHUB_TOKEN)
    return NextResponse.json(
      { success: true, ...data },
      { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch (err) {
    console.error('GitHub activity error:', err.message)
    return NextResponse.json(
      { success: false, error: 'Could not load GitHub activity.' },
      { status: 502 }
    )
  }
}
