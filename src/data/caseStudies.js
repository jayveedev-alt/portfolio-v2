// Deep-dive case studies — the two flagship builds, shown with live-UI mockups.
// Everything else lives in data/projects.js as the supporting grid.
export const caseStudies = [
  {
    id: 'securepeek',
    number: '01',
    kicker: 'Case Study 01 · Security Tooling in Production',
    title: 'SecurePeek',
    subtitle: 'Automated Website Security Auditing',
    summary:
      'A full-stack audit platform that scans any public domain for SSL health, security headers, HTTPS configuration, server exposure, and common web vulnerabilities — then turns the raw findings into a single score with fixes a site owner can actually act on.',
    context:
      'Most site owners have no idea their headers are misconfigured until something breaks. Existing scanners either cost enterprise money or dump unreadable JSON. SecurePeek closes that gap with a one-input scan and a plain-English report.',
    role:
      'End-to-end: scanning engine, scoring model, REST API in Express, and the entire React dashboard including the report UI.',
    decisionLabel: 'Key Engineering Decision',
    decision:
      'Weighted composite scoring — each check carries a severity weight instead of a flat pass/fail count, so one missing CSP header outranks five cosmetic warnings. The report sorts by remediation impact, not by scan order.',
    stackTitle: 'Engineering Stack',
    stackBadge: 'Full Stack',
    stack: [
      { label: 'Frontend', value: 'React.js · Tailwind CSS · Vite' },
      { label: 'Backend & Scanning', value: 'Node.js · Express.js · TLS/SSL inspection · Header analysis' },
      { label: 'Security Domain', value: 'OWASP checks · Certificate chain validation · Server fingerprinting' },
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'Cybersecurity'],
    liveUrl: 'https://securepeek.vercel.app/',
    accent: 'accent',
    mock: 'securepeek',
  },
  {
    id: 'aurawash',
    number: '02',
    kicker: 'Case Study 02 · Multi-Branch SaaS',
    title: 'AuraWash',
    subtitle: 'Laundry Operations Platform',
    summary:
      'A SaaS platform running real laundry businesses: multi-branch management, live order tracking, driver dispatching, customer loyalty, a digital wallet, revenue analytics, and role-based access across owner, branch staff, and driver.',
    context:
      'Laundry chains ran on notebooks and group chats — orders lost between pickup and delivery, no per-branch revenue visibility, and no way to tell which driver held which bag. AuraWash puts every branch on one live board.',
    role:
      'Full delivery: data model, Node/MySQL backend, WebSocket layer for live order state, Messenger bot for customer updates, and the complete admin dashboard.',
    decisionLabel: 'Key UX Decision',
    decision:
      'Orders are driven by a state machine — Pickup → Washing → Ready → Delivered — pushed over WebSockets, so the board updates without a refresh and a driver on mobile and the owner on desktop never disagree about where a bag is.',
    stackTitle: 'Platform Stack',
    stackBadge: 'Multi-Tenant',
    stack: [
      { label: 'Frontend', value: 'React.js · Tailwind CSS · WebSocket client' },
      { label: 'Backend & Data', value: 'Node.js · MySQL · Role-based access control' },
      { label: 'Integrations & Infra', value: 'Facebook Messenger Bot · Digital wallet · Hostinger' },
    ],
    tags: ['React.js', 'Node.js', 'MySQL', 'WebSockets', 'Messenger Bot', 'Hostinger'],
    liveUrl: 'https://www.aurawash.io/',
    accent: 'mint',
    mock: 'aurawash',
  },
]

// FAQ — the questions clients actually ask before signing.
export const faqs = [
  {
    q: 'How long does a project like this take?',
    a: 'It depends on scope, but a polished marketing site with animation runs 1–3 weeks from design to production deploy. A full SaaS build with auth, dashboards, and a real data model is typically 6–12 weeks, split into shippable milestones so you see working software every few days.',
  },
  {
    q: 'Do you work with an existing brand or design system?',
    a: 'Both. If you already have a brand book, Figma file, or design system, I build to it exactly. If you do not, I handle the visual direction myself — type scale, palette, and component system — and you approve it before a single production component gets written.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your goal, who the product is for, and any references you like. That is genuinely enough for the discovery call. Content, assets, and integration credentials can land later — I scaffold with realistic placeholders so the build is never blocked waiting on copy.',
  },
  {
    q: 'How does pricing and payment work?',
    a: 'Fixed-scope pricing agreed up front — no hourly surprises. Standard split is 50% to start and 50% on delivery; longer builds are billed per milestone. Scope changes get quoted separately before any extra work happens, so the number you approve is the number you pay.',
  },
  {
    q: 'What happens after launch?',
    a: 'You get the repository, clean documentation, and a walkthrough of the deploy pipeline — no lock-in. Bug fixes on delivered work are covered for 30 days, and I am available for ongoing feature work or a retainer if you want me to keep shipping.',
  },
]
