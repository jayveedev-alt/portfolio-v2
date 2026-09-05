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
  // ── Drafted from the live sites, the tags in projects.json and each
  //    project's own description. Context and Stack are grounded in what the
  //    deployed product shows; Role and Key Decision are Ben's call to correct.
  {
    id: 'kwentatayo',
    number: '03',
    kicker: 'Case Study 03 · Offline-First Finance SaaS',
    title: 'KwentaTayo',
    subtitle: 'Budget Tracking That Survives a Dropped Signal',
    summary:
      'Cloud-based finance and budget tracking SaaS with an offline-first mobile app. Entries are recorded locally and sync once a connection returns, so nothing is lost when the signal drops.',
    context:
      'Filipino household budgeting runs on spreadsheets and memory, and the moment worth recording an expense is usually the moment the signal is worst. KwentaTayo puts wallets, budgets, goals and reports on one dashboard, in English or Tagalog, and keeps working when the connection does not.',
    role:
      'Full delivery across all four surfaces: the Next.js marketing site, the React application behind the login, the Express API, and the Flutter mobile app with the sync layer between them.',
    decisionLabel: 'Key Engineering Decision',
    decision:
      'Writes are local-first. An entry commits to device storage immediately and joins a sync queue that reconciles when the network returns, so the app never blocks on a request — the alternative, a spinner on every expense, is what makes people stop logging.',
    stackTitle: 'Platform Stack',
    stackBadge: 'Offline-First',
    stack: [
      { label: 'Marketing Site', value: 'Next.js — the public landing page' },
      { label: 'Application', value: 'React.js — the signed-in dashboard' },
      { label: 'Backend', value: 'Express.js' },
      { label: 'Mobile', value: 'Flutter — offline-first, syncs on reconnect' },
    ],
    tags: ['SaaS', 'Next.js', 'React.js', 'Express.js', 'Flutter', 'Offline-first'],
    liveUrl: 'https://kwentatayo.vercel.app/',
    accent: 'mint',
  },
  {
    id: 'aqualitpools',
    number: '04',
    kicker: 'Case Study 04 · Service Platform + AI',
    title: 'AquaLit Pools',
    subtitle: 'Pool Service Operations and an AI Front Desk',
    summary:
      'Website and web application for a pool repair and maintenance business, with separate portals for admin, customer and technician — plus an AI agent that handles customer enquiries in conversation.',
    context:
      'A pool company doing maintenance, repairs, automation and renovations has four different jobs sharing one phone line. Scheduling lived in someone head, service history was unsearchable, and every enquiry interrupted a technician. The platform gives each role its own view and puts a conversational agent in front of the enquiries.',
    role:
      'Site and web application end to end: the three role-scoped portals, the worklog and readings model, and the AI enquiry agent.',
    decisionLabel: 'Key Product Decision',
    decision:
      'Three scoped portals instead of one dashboard with permissions bolted on. A technician opens the worklog for the pool in front of them, a customer sees only their own readings and history, and the admin sees the whole route — nobody navigates around screens that are not theirs.',
    stackTitle: 'Platform Stack',
    stackBadge: 'Multi-Role',
    stack: [
      { label: 'Frontend', value: 'React · Tailwind CSS' },
      { label: 'Backend & Data', value: 'Node.js · Worklogs, readings and service history' },
      { label: 'AI Layer', value: 'Conversational enquiry agent · Scoped to service context' },
    ],
    tags: ['Web App', 'AI Agent', 'Multi-role', 'React', 'Node.js'],
    liveUrl: 'https://aqualitpools.com/',
    accent: 'accent',
  },
  {
    id: 'robodyx',
    number: '05',
    kicker: 'Case Study 05 · B2B Mobile + AI Coach',
    title: 'Robodyx',
    subtitle: 'Training Stats, AI Food Logging, and a Coach You Talk To',
    summary:
      'B2B mobile app for tracking training stats, with AI food logging, a conversational coach the trainee can talk to, and an admin portal for the operators behind it.',
    context:
      'Trainees log numbers diligently and then have no idea what to change, and food logging is the part everyone abandons first because typing out a meal is tedious. Robodyx puts an AI on both ends: one that reads a meal into a log entry, and one the trainee can actually talk to about it. Operators get a board across the whole roster.',
    role:
      'End to end: the React app shipped to devices through Capacitor, the Express API on GCP, the Firebase data layer, both AI integrations, and the admin portal the operators run it from.',
    decisionLabel: 'Key Engineering Decision',
    decision:
      'Two different models for two different jobs. Food logging goes through Vertex AI as a one-shot extraction — a meal in, a structured log entry out — while the coach runs on Gemini Live so the trainee can hold a real conversation. Forcing both through one model would have made the logging chatty and the coach stilted.',
    stackTitle: 'Product Stack',
    stackBadge: 'B2B Mobile',
    stack: [
      { label: 'Mobile', value: 'React.js · Capacitor — one codebase, shipped as a native app' },
      { label: 'Backend & Data', value: 'Express.js on Google Cloud Platform · Firebase' },
      { label: 'AI Layer', value: 'Vertex AI for food logging · Gemini Live for the coach' },
      { label: 'Operations', value: 'Admin portal · Roster and progress visibility' },
    ],
    tags: ['React.js', 'Capacitor', 'Express.js', 'Firebase', 'Vertex AI', 'Gemini Live', 'B2B'],
    liveUrl: '',
    accent: 'mint',
  },
  {
    id: 'supremacy-international',
    number: '06',
    kicker: 'Case Study 06 · Affiliate Commerce',
    title: 'Supremacy International',
    subtitle: 'A Yii Store, Reopened as a REST API',
    summary:
      'Networking e-commerce store where members place orders and earn through an affiliate structure built into the platform.',
    context:
      'Networking businesses sell real products — wellness essentials, fragrances, skincare, business packages — but the storefront was welded to a Yii application that rendered every page server-side, so the buying experience could not move without the backend moving with it.',
    role:
      'Converted the existing Yii endpoints into a REST API and rebuilt the entire storefront in React against it — catalogue, cart, checkout and the member accounts behind the affiliate structure.',
    decisionLabel: 'Key Engineering Decision',
    decision:
      'Rather than rewrite the backend, the Yii endpoints were converted into a REST API and React was put in front of them. The business logic and the data that already worked stayed where they were; only the delivery layer changed — which is what made a full frontend rebuild affordable at all.',
    stackTitle: 'Commerce Stack',
    stackBadge: 'E-Commerce',
    stack: [
      { label: 'Frontend', value: 'React.js — storefront, category and product pages' },
      { label: 'Backend', value: 'Yii (PHP) — existing endpoints converted to a REST API' },
      { label: 'Commerce', value: 'Catalogue · Cart · Checkout · Member accounts' },
    ],
    tags: ['React.js', 'Yii', 'PHP', 'REST API', 'E-commerce', 'Affiliate'],
    liveUrl: 'https://www.supremacyinternational.store/',
    accent: 'accent',
  },
  {
    id: 'quicklist',
    number: '07',
    kicker: 'Case Study 07 · Productivity',
    title: 'QuickList',
    subtitle: 'Now, Next, Later — Priority as Position',
    summary:
      'Advanced productivity and todo web application with drag-and-drop task management, multi-column prioritization (Now / Next / Later), fast keyboard navigation, and real-time task organization designed for high-speed workflow.',
    context:
      'Todo apps split into two useless halves: a flat list that tells you nothing about what matters, or a project tool with sprints and story points for a person who just needs to know what to do next. QuickList keeps three columns and a calendar sync, and nothing else.',
    role:
      'Full build: the Next.js and TypeScript frontend, Firebase data and auth, calendar sync, and the email alerting.',
    decisionLabel: 'Key Product Decision',
    decision:
      'Priority is position, not a field. Moving a task from Later to Now is a drag rather than a form — re-prioritising happens constantly, and anything that costs a dialogue stops happening within a week.',
    stackTitle: 'Engineering Stack',
    stackBadge: 'Full Stack',
    stack: [
      { label: 'Frontend', value: 'Next.js · React · TypeScript · Tailwind CSS' },
      { label: 'Data & Auth', value: 'Firebase · Real-time task state' },
      { label: 'Integrations & Infra', value: 'Calendar sync · Email alerts · Vercel' },
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vercel'],
    liveUrl: 'https://quicklist-alpha-kohl.vercel.app/',
    accent: 'mint',
  },
  {
    id: 'portfolio-website',
    number: '08',
    kicker: 'Case Study 08 · Marketing Site',
    title: 'Portfolio Website',
    subtitle: 'This Site',
    summary:
      'Modern developer portfolio showcasing my full-stack development projects, technical skills, work experience, and SaaS products. Built with responsive design, smooth animations, optimized performance, and SEO best practices.',
    context:
      'A CV lists technologies; it does not show whether someone can ship. This site treats each project as a case study — the problem, the call made, and the interface doing its job — so the work argues for itself before the first call.',
    role:
      'Design and build: the component system, the content model, the reveal and scroll behaviour, and the contact pipeline.',
    decisionLabel: 'Key Engineering Decision',
    decision:
      'Projects live in a plain JSON file, so adding one needs no code change, and a case study attaches by slug only when a project has earned a deep dive. The grid and the detail pages read from one list, which keeps them from drifting apart.',
    stackTitle: 'Engineering Stack',
    stackBadge: 'Full Stack',
    stack: [
      { label: 'Frontend', value: 'React.js · Tailwind CSS · Vite' },
      { label: 'Backend', value: 'Node.js · NodeMailer contact pipeline' },
      { label: 'Content & Delivery', value: 'JSON-driven project list · Responsive · SEO' },
    ],
    tags: ['React.js', 'Node.js', 'Tailwind CSS', 'Vite', 'NodeMailer'],
    liveUrl: '',
    accent: 'accent',
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
