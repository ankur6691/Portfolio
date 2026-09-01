// src/data/fallbackProjects.js

export const FALLBACK_PROJECTS = [
  // 01. MADHYA BHARAT ASSOCIATES
  {
    id: "madhya-bharat",
    step: "01",
    category: "CLIENT PRODUCTION",
    badge: "LIVE PRODUCTION",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.35)",
    title: "Madhya Bharat Associates",
    tagline: "Corporate Legal Enforcement & SARFAESI Recovery Portal",
    description:
      "Enterprise legal enforcement web portal built for financial institutions and NBFCs. Implements compliance modules for SARFAESI Act 2002, RRC revenue recovery, interactive advocate directories, and direct client consultation pipelines.",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Performance", value: "98/100 Score" },
      { label: "Compliance", value: "SARFAESI 2002" },
    ],
    liveUrl: "https://madhya-bharat-associates.vercel.app",
    githubUrl: null,
    videoUrl: null,
    slides: [
      { title: "Hero Portal", img: "https://res.cloudinary.com/dsofipudf/image/upload/f_auto,q_auto/v1788167863/Disclaimer_ktchkm.png" },
      { title: "About & Stats", img: "https://res.cloudinary.com/dsofipudf/image/upload/f_auto,q_auto/v1788167864/Front_Page_hemykz.png" },
      { title: "Expertise Matrix", img: "https://res.cloudinary.com/dsofipudf/image/upload/f_auto,q_auto/v1788167863/Expertise_frpwhy.png" },
      { title: "Legal Council", img: "https://res.cloudinary.com/dsofipudf/image/upload/f_auto,q_auto/v1788167864/Legal_Team_eoh9wq.png" },
      { title: "Consultation Form", img: "https://res.cloudinary.com/dsofipudf/image/upload/f_auto,q_auto/v1788167863/contact_page_kz3stt.png" },
    ],
  },

  // 02. CLARITAS GLOBAL
  {
    id: "claritas",
    step: "02",
    category: "ENTERPRISE EDTECH",
    badge: "POSTGRESQL & RBAC",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.35)",
    title: "Claritas Global School Ecosystem",
    tagline: "Centralized Multi-Tenant School Management Platform",
    description:
      "Large-scale educational management platform engineered with granular Role-Based Access Control (RBAC). Features dedicated isolated dashboards for Global Super-Admins, Principals, Teachers, and differentiated workspaces for 10th, 11th, and 12th standard students.",
    metrics: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Dashboards", value: "4 Isolated RBAC" },
      { label: "Scope", value: "Global Schools" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/ankur6691/Next_Claritus",
    videoUrl: null,
    slides: [
      { title: "Super-Admin Hub", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" },
      { title: "Principal Console", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80" },
      { title: "Teacher Workspace", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" },
      { title: "Student 10-12 Portal", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80" },
      { title: "Relational Schemas", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" },
    ],
  },

  // 03. AKMENU
  {
    id: "akmenu",
    step: "03",
    category: "STARTUP MVP",
    badge: "15-20 RESTAURANTS AUDITED",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.35)",
    title: "AKMenu Dining & POS Engine",
    tagline: "Cloud Kitchen & Restaurant Billing Operating System",
    description:
      "High-speed point-of-sale and kitchen billing engine engineered as an agile Petpooja alternative. Personally field-tested across 15 to 20 commercial dining restaurants to streamline Kitchen Order Tickets (KOT), fast invoicing, and real-time menu management.",
    metrics: [
      { label: "Field Tested", value: "15-20 Outlets Audited" },
      { label: "Execution", value: "<150ms Invoicing" },
      { label: "Operations", value: "KOT & Inventory" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/ankur6691",
    videoUrl: null,
    slides: [
      { title: "POS Touch Terminal", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" },
      { title: "Live KOT Dispatch", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
      { title: "Table Matrix", img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80" },
      { title: "Fast Billing", img: "https://images.unsplash.com/photo-1556742049-0a67e557224f?w=800&q=80" },
      { title: "Inventory Engine", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80" },
    ],
  },

  // 04. CHATIFY
  {
    id: "chatify",
    step: "04",
    category: "CLIENT WORK",
    badge: "LINKEDIN VIDEO WALKTHROUGH",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    glowColor: "rgba(236, 72, 153, 0.35)",
    title: "Chatify Instant Messenger",
    tagline: "Low-Latency WebSocket Bi-Directional Pipeline",
    description:
      "Client messaging application engineered with event-driven WebSockets for instantaneous text exchange, active typing telemetry, and persistent session state. Complete system breakdown and screen walkthrough documented via LinkedIn video.",
    metrics: [
      { label: "Protocol", value: "WebSockets" },
      { label: "Walkthrough", value: "LinkedIn Video" },
      { label: "Latency", value: "Realtime Sync" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/Tech-Collaboration-Team/chatify",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    slides: [
      { title: "Live Chat Feed", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
      { title: "WebSocket Mesh", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80" },
      { title: "Typing Telemetry", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
      { title: "Auth Pipeline", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" },
      { title: "Persistent Storage", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" },
    ],
  },

  // 05. SAFEHER
  {
    id: "safeher",
    step: "05",
    category: "OPEN SOURCE",
    badge: "GEOLOCATION SOS",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    glowColor: "rgba(6, 182, 212, 0.35)",
    title: "SafeHer SOS Emergency Network",
    tagline: "Rapid Geolocation Alert & Safety Pipeline",
    description:
      "Open-source personal safety application engineered for single-touch distress signaling, live GPS coordinate broadcasts to emergency contacts, and automated emergency routing via secure API webhooks.",
    metrics: [
      { label: "Response", value: "Instant GPS SOS" },
      { label: "License", value: "Open Source" },
      { label: "Platform", value: "Mobile Geofence" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/Tech-Collaboration-Team/women-safety-ai-system",
    videoUrl: null,
    slides: [
      { title: "1-Tap SOS Trigger", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
      { title: "Live GPS Mesh", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" },
      { title: "Webhook Dispatch", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" },
      { title: "Emergency Hub", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
      { title: "Geofence Siren", img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80" },
    ],
  },
];