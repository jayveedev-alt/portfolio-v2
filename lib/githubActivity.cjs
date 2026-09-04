/**
 * GitHub contribution data, shared by the Vercel function (api/github.js) and
 * the local Express dev server (server/index.js).
 *
 * CommonJS on purpose: the root package.json is `"type": "module"`, so a plain
 * .js file here could not be require()'d by the CJS dev server. ESM can import
 * CJS, so this one file serves both.
 *
 * GitHub exposes no public REST endpoint for the contribution calendar, so:
 *   1. GITHUB_TOKEN set  → official GraphQL API. Counts PRIVATE contributions
 *      too, which matters when most client work lives in private repos.
 *   2. No token          → github-contributions-api.jogruber.de, a free proxy.
 *      Zero setup, but public contributions only.
 */

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`

async function fromGraphQL(username, token) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-github-activity',
    },
    body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: username } }),
  })

  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`)

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error(`No calendar returned for "${username}"`)

  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
  )

  return { days, source: 'graphql' }
}

async function fromPublicProxy(username) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    { headers: { 'User-Agent': 'portfolio-github-activity' } }
  )

  if (!res.ok) throw new Error(`Contributions proxy responded ${res.status}`)

  const json = await res.json()
  if (!Array.isArray(json.contributions)) throw new Error('Unexpected proxy payload')

  const days = json.contributions.map((d) => ({ date: d.date, count: d.count }))
  return { days, source: 'public-proxy' }
}

/** Trim to the trailing 53 weeks, aligned so each week starts on Sunday. */
function trimToLastYear(days) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const today = sorted[sorted.length - 1]?.date
  if (!today) return sorted

  // 53 weeks back, then forward to the following Sunday
  const cutoff = new Date(`${today}T00:00:00Z`)
  cutoff.setUTCDate(cutoff.getUTCDate() - 53 * 7)

  const windowed = sorted.filter((d) => new Date(`${d.date}T00:00:00Z`) >= cutoff)
  const firstSunday = windowed.findIndex((d) => new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0)
  return firstSunday === -1 ? windowed : windowed.slice(firstSunday)
}

function summarize(days) {
  let total = 0
  let activeDays = 0
  let busiestDay = 0
  let busiestDate = null
  let longestStreak = 0
  let currentStreak = 0

  for (const day of days) {
    total += day.count

    if (day.count > 0) {
      activeDays += 1
      currentStreak += 1
      if (currentStreak > longestStreak) longestStreak = currentStreak
    } else {
      currentStreak = 0
    }

    if (day.count > busiestDay) {
      busiestDay = day.count
      busiestDate = day.date
    }
  }

  return { total, activeDays, longestStreak, busiestDay, busiestDate }
}

/** Four buckets above zero, matching GitHub's own scale shape. */
function levelFor(count, busiest) {
  if (count <= 0) return 0
  if (busiest <= 1) return 4
  const ratio = count / busiest
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

async function getActivity(username, token) {
  let result
  let fallbackReason = null

  if (token) {
    try {
      result = await fromGraphQL(username, token)
    } catch (err) {
      // A bad or expired token should degrade, not take the section down
      fallbackReason = err.message
      result = await fromPublicProxy(username)
    }
  } else {
    result = await fromPublicProxy(username)
  }

  const days = trimToLastYear(result.days)
  const stats = summarize(days)

  return {
    username,
    source: result.source,
    fallbackReason,
    stats,
    days: days.map((d) => ({ ...d, level: levelFor(d.count, stats.busiestDay) })),
  }
}

module.exports = { getActivity, summarize, levelFor, trimToLastYear }
