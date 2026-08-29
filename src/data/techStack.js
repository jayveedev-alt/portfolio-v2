import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siExpo, siFlutter,
  siNodedotjs, siExpress, siPython, siCodeigniter, siYii, siSequelize, siGraphql,
  siPostgresql, siMysql, siMariadb, siMongodb, siRedis,
  siDocker, siNginx, siGit, siGithubactions, siVercel, siNetlify,
  siPostman, siSwagger, siN8n, siGoogleappsscript,
} from 'simple-icons'

// Brand hexes are tuned for light backgrounds. The near-black ones (Next.js #000,
// Vercel #000, Express, Socket.io, GitHub #181717, MariaDB #003545, Expo #1C2024)
// vanish on this page's tiles, so only those fall back to the page's ink colour —
// everything else keeps its real brand colour.
const MIN_LUMA = 0.06

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

const icon = (si, label) => ({
  label: label ?? si.title,
  path: si.path,
  color: luminance(si.hex) < MIN_LUMA ? '#fafafa' : `#${si.hex}`,
})

export const techStack = [
  {
    number: '01',
    title: 'Frontend & Mobile',
    description: 'Interfaces built for adoption — fast, accessible, and consistent across web and native.',
    items: [
      icon(siReact),
      icon(siNextdotjs, 'Next.js'),
      icon(siTypescript),
      icon(siTailwindcss, 'Tailwind CSS'),
      icon(siExpo, 'React Native Expo'),
      icon(siFlutter),
    ],
  },
  {
    number: '02',
    title: 'Backend & APIs',
    description: 'REST and WebSocket layers, auth, and services that stay predictable once traffic is real.',
    items: [
      icon(siNodedotjs, 'Node.js'),
      icon(siExpress, 'Express'),
      icon(siPython),
      icon(siCodeigniter),
      icon(siYii, 'Yii Framework'),
      icon(siSequelize, 'Sequelize ORM'),
      icon(siGraphql),
    ],
  },
  {
    number: '03',
    title: 'Databases',
    description: 'Schema design, indexing, and query tuning — relational and document alike.',
    items: [
      icon(siPostgresql),
      icon(siMysql),
      icon(siMariadb),
      icon(siMongodb),
      icon(siRedis),
    ],
  },
  {
    number: '04',
    title: 'DevOps & Infra',
    description: 'Pipelines and hosting set up so shipping is boring and rollbacks are cheap.',
    items: [
      icon(siDocker),
      icon(siNginx, 'Nginx'),
      icon(siGit, 'Git / GitHub'),
      icon(siGithubactions, 'CI/CD'),
      icon(siVercel),
      icon(siNetlify),
    ],
  },
  {
    number: '05',
    title: 'Tools & Automation',
    description: 'The glue around the build — API testing, living docs, and workflow automation.',
    items: [
      icon(siPostman),
      icon(siSwagger),
      icon(siN8n, 'n8n'),
      icon(siGoogleappsscript, 'Apps Script'),
    ],
  },
]
