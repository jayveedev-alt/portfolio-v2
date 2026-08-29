// Tiles for the FlowingMenu marquee.
// Inlined as SVG data URIs so the section costs zero extra network requests
// and the artwork stays on-palette instead of pulling stock photography.
const tile = (accent, art) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80">` +
      `<rect width="240" height="80" fill="#070707"/>` +
      `<g fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${art}</g>` +
      `</svg>`
  )

const ACCENT = '#d4ff3d'
const MINT   = '#34d399'
const IRIS   = '#818cf8'
const AQUA   = '#22d3ee'

export const skillsMenu = [
  {
    text: 'Frontend & Mobile',
    link: '#work',
    // Browser window beside a phone
    image: tile(
      ACCENT,
      '<rect x="58" y="20" width="92" height="42" rx="5"/><path d="M58 31h92"/>' +
        '<circle cx="67" cy="25.5" r="1.6"/><circle cx="74" cy="25.5" r="1.6"/>' +
        '<rect x="162" y="18" width="28" height="46" rx="6"/><path d="M172 57h8"/>'
    ),
  },
  {
    text: 'Backend & APIs',
    link: '#work',
    // Stacked service racks
    image: tile(
      MINT,
      '<rect x="70" y="16" width="100" height="14" rx="4"/>' +
        '<rect x="70" y="33" width="100" height="14" rx="4"/>' +
        '<rect x="70" y="50" width="100" height="14" rx="4"/>' +
        '<circle cx="80" cy="23" r="1.8"/><circle cx="80" cy="40" r="1.8"/><circle cx="80" cy="57" r="1.8"/>'
    ),
  },
  {
    text: 'Databases',
    link: '#work',
    // Classic stacked cylinder
    image: tile(
      IRIS,
      '<ellipse cx="120" cy="20" rx="34" ry="9"/>' +
        '<path d="M86 20v18c0 5 15 9 34 9s34-4 34-9V20"/>' +
        '<path d="M86 38v18c0 5 15 9 34 9s34-4 34-9V38"/>'
    ),
  },
  {
    text: 'DevOps & Infra',
    link: '#work',
    // Build → ship → run pipeline
    image: tile(
      AQUA,
      '<rect x="52" y="28" width="30" height="24" rx="4"/>' +
        '<rect x="105" y="28" width="30" height="24" rx="4"/>' +
        '<rect x="158" y="28" width="30" height="24" rx="4"/>' +
        '<path d="M86 40h15m-4-4 4 4-4 4"/><path d="M139 40h15m-4-4 4 4-4 4"/>'
    ),
  },
  {
    text: 'Tools & Automation',
    link: '#work',
    // Connected nodes
    image: tile(
      ACCENT,
      '<circle cx="70" cy="40" r="8"/><circle cx="120" cy="22" r="8"/>' +
        '<circle cx="120" cy="58" r="8"/><circle cx="170" cy="40" r="8"/>' +
        '<path d="M78 37l34-11M78 43l34 11M128 25l34 11M128 55l34-11"/>'
    ),
  },
]
