/**
 * Answers for the on-page helper.
 *
 * Everything here is a prepared answer matched by keyword — there is no model
 * behind it yet. `askBot()` is the single seam: when a Gemini key exists, call
 * the API there and keep `matchLocal` as the offline fallback.
 *
 * Facts are taken from the site itself (hero stats, services, process, FAQ,
 * projects, tech stack). Anything not stated anywhere on the site is marked
 * NEEDS REVIEW — correct those before relying on them.
 */

export const greeting =
  "Hi — I'm a quick-answer helper for John Benedict's portfolio. Pick a question below, or type your own."

export const knowledge = [
  {
    id: 'hello',
    question: 'Hello',
    keywords: ['hi', 'hey', 'hello', 'kumusta', 'kamusta', 'good morning', 'good evening'],
    answer:
      "Hello. Ask about the stack, timelines, pricing, or the builds in Selected Work — or tap one of the questions below.",
  },
  {
    id: 'what-you-build',
    question: 'What do you build?',
    keywords: ['what do you build', 'what do you do', 'services', 'offer', 'specialise', 'specialize'],
    answer:
      'Full web and mobile products, end to end — interface, API, database and deploy. In practice that means custom SaaS platforms, multi-role web apps, marketing sites, and cross-platform mobile apps. No handoffs between a designer, a frontend dev and a backend dev who never speak to each other.',
  },
  {
    id: 'stack',
    question: 'What is your tech stack?',
    keywords: [
      'stack', 'tech', 'technolog', 'framework', 'language', 'tools', 'use',
      'react', 'next', 'node', 'python', 'typescript', 'tailwind',
      'postgres', 'mysql', 'mongo', 'redis', 'supabase', 'firebase', 'database',
      'gcp', 'google cloud', 'docker', 'nginx', 'vercel', 'graphql',
    ],
    answer:
      'Frontend: React, Next.js, TypeScript, Tailwind, plus React Native (Expo) and Flutter for mobile. Backend: Node/Express, Python, CodeIgniter, Yii, Sequelize, REST and GraphQL. Data: PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Supabase and Firebase. Infra: Docker, Nginx, Google Cloud, CI/CD, Vercel and Netlify.',
  },
  {
    id: 'experience',
    question: 'How much experience do you have?',
    keywords: ['experience', 'how long have you', 'years', 'senior', 'background'],
    answer:
      'Seven-plus years, 18+ projects shipped and 9+ clients. The Selected Work section has the real builds with case studies — architecture decisions and the interface, not just screenshots.',
  },
  {
    id: 'timeline',
    question: 'How long does a project take?',
    keywords: ['how long', 'timeline', 'duration', 'deadline', 'fast', 'when can you', 'delivery'],
    answer:
      'Depends on scope. A polished marketing site with animation runs 1–3 weeks from design to production deploy. A full SaaS build with auth, dashboards and a real data model is typically 6–12 weeks, split into shippable milestones so you see working software every few days.',
  },
  {
    id: 'pricing',
    question: 'How does pricing work?',
    keywords: ['price', 'pricing', 'cost', 'rate', 'budget', 'how much', 'payment', 'pay'],
    answer:
      'Fixed-scope pricing agreed up front — no hourly surprises. Standard split is 50% to start and 50% on delivery; longer builds are billed per milestone. Scope changes get quoted separately before any extra work happens, so the number you approve is the number you pay. For an actual figure, the discovery call is the fastest route.',
  },
  {
    id: 'start',
    question: 'What do you need to get started?',
    keywords: ['get started', 'start', 'begin', 'need from me', 'requirements', 'first step'],
    answer:
      'Your goal, who the product is for, and any references you like. That is genuinely enough for the discovery call. Content, assets and integration credentials can land later — the build gets scaffolded with realistic placeholders so nothing is blocked waiting on copy.',
  },
  {
    id: 'process',
    question: 'How do you work?',
    keywords: ['process', 'how do you work', 'workflow', 'phases', 'methodology', 'steps'],
    answer:
      'Four phases. Discovery: align on goal, audience and must-haves, and you leave with a fixed scope and a date. Design & Architecture: wireframes, visual direction, data model and stack decisions, approved before any production code. Build: working increments every few days on a real staging URL. Launch & Handoff: production deploy, performance pass, and documentation clear enough for another developer to pick up.',
  },
  {
    id: 'mobile',
    question: 'Do you build mobile apps?',
    keywords: ['mobile', 'ios', 'android', 'app store', 'react native', 'flutter', 'expo'],
    answer:
      'Yes — cross-platform with React Native (Expo) or Flutter, from idea to app store. Recent mobile work includes an offline-first finance tracker that syncs when the connection returns, and a B2B training app with an AI coach embedded and an admin portal behind it.',
  },
  {
    id: 'ai',
    question: 'Can you add AI features?',
    keywords: ['ai', 'agent', 'chatbot', 'gpt', 'gemini', 'llm', 'machine learning', 'automation'],
    answer:
      'Yes. Two shipped examples: a pool service platform with an AI agent that handles customer enquiries in conversation, and a B2B training app with an AI coach embedded to guide trainees. Also workflow automation with n8n where a full agent is overkill.',
  },
  {
    id: 'after-launch',
    question: 'What happens after launch?',
    keywords: ['after launch', 'support', 'maintenance', 'warranty', 'bugs', 'retainer', 'handoff'],
    answer:
      'You get the repository, clean documentation and a walkthrough of the deploy pipeline — no lock-in. Bug fixes on delivered work are covered for 30 days, and ongoing feature work or a retainer is available if you want the shipping to continue.',
  },
  {
    id: 'brand',
    question: 'Do you work with an existing brand?',
    keywords: ['brand', 'design system', 'figma', 'existing design', 'style guide', 'identity'],
    answer:
      'Both ways. If you already have a brand book, Figma file or design system, the build matches it exactly. If you do not, the visual direction gets handled here — type scale, palette, component system — and you approve it before a single production component is written.',
  },
  {
    id: 'availability',
    question: 'Are you available right now?',
    keywords: ['available', 'availability', 'free', 'capacity', 'taking on', 'hire', 'open to'],
    answer:
      'Yes — open to freelance work and full-time opportunities. The fastest way to check the current slot is the 30-minute discovery call in the contact section; it is free and there is no pressure.',
  },
  {
    id: 'projects',
    question: 'Can I see your work?',
    keywords: ['projects', 'work', 'portfolio', 'case study', 'examples', 'built', 'show me'],
    answer:
      'The Selected Work section has every build with a full case study — the problem, the call that was made, and the real interface. Highlights: a security audit platform, a multi-branch laundry SaaS, an offline-first finance tracker, an AI-assisted pool service portal, a B2B training app and an affiliate e-commerce store.',
  },
  {
    id: 'contact',
    question: 'How do I get in touch?',
    keywords: ['contact', 'reach', 'email', 'call', 'talk', 'book', 'message', 'hire you'],
    answer:
      'Email jayveedev.alt@gmail.com, or book a 30-minute discovery call from the contact section at the bottom of this page. Replies come within 24 hours.',
  },
]

/** Shown as tappable chips so a visitor does not have to guess what to ask. */
export const suggestions = [
  'What do you build?',
  'What is your tech stack?',
  'How long does a project take?',
  'How does pricing work?',
  'Can you add AI features?',
  'How do I get in touch?',
]

export const fallback =
  "I only have prepared answers, and that one is not among them. The contact section at the bottom will reach John Benedict directly — he replies within 24 hours."

/**
 * Short keywords have to land on a whole word. Plain substring matching made
 * `ai` fire inside "available" and "email", and it also meant a genuinely
 * specific three-letter term like `ios` scored too low to win.
 */
function hits(text, keyword) {
  if (keyword.length <= 4 && !keyword.includes(' ')) {
    return new RegExp(`\\b${keyword}\\b`).test(text)
  }
  return text.includes(keyword)
}

/** Longer keywords weigh more, with a floor so short specific terms still count. */
function score(text, keywords) {
  return keywords.reduce(
    (total, keyword) => (hits(text, keyword) ? total + Math.max(keyword.length, 5) : total),
    0
  )
}

export function matchLocal(input) {
  const text = input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  let best = null
  let bestScore = 0

  for (const entry of knowledge) {
    const value = score(text, entry.keywords)
    if (value > bestScore) {
      bestScore = value
      best = entry
    }
  }

  // Below this, nothing matched a whole keyword
  return bestScore >= 5 ? best.answer : fallback
}

/**
 * The single seam for a real model. Swap the body for a Gemini call and keep
 * `matchLocal` as the fallback when the request fails or no key is configured.
 */
export async function askBot(input) {
  return matchLocal(input)
}
