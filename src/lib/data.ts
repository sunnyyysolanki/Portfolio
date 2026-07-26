export const NAV_LINKS = [
  { index: "01", label: "Profile", href: "#about" },
  { index: "02", label: "Work", href: "#work" },
  { index: "03", label: "Experience", href: "#experience" },
  { index: "04", label: "Capabilities", href: "#capabilities" },
  { index: "05", label: "Contact", href: "#contact" },
];

export const CONTACT = {
  email: "sunnysolanki74860@gmail.com",
  emailHref: "mailto:sunnysolanki74860@gmail.com",
  phone: "+91 63515 03193",
  phoneHref: "tel:+916351503193",
  linkedin: "https://www.linkedin.com/in/sunnyyysolanki",
  linkedinLabel: "/in/sunnyyysolanki",
  github: "https://github.com/sunnyyysolanki",
  githubLabel: "/sunnyyysolanki",
  location: "Ahmedabad — India",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  images: string[];
  link: string;
  liveLink?: string; // deployed app, opened in a new tab
  logo?: string;
  badge?: string;
};

export const WORK_EXPERIENCE: Project = {
  id: "netai",
  index: "01",
  title: "NetAI",
  subtitle: "AI-powered network observability",
  year: "Apr 2025 — Present",
  role: "Software Engineer",
  badge: "Current Role",
  logo: "/images/netai-wordmark.png",
  description:
    "Engineering the world's first GNN-powered AIOps platform. Owning an AWS cloud-monitoring product end to end — from account onboarding and agent installation to real-time d3-force topology maps and high-volume Kubernetes dashboards.",
  tags: ["React", "TypeScript", "AWS", "ECharts", "d3-force", "WebSockets"],
  images: ["/images/netai-logo.png"],
  link: "https://netai.ai",
};

export const PROJECTS: Project[] = [
  {
    id: "editor",
    index: "02",
    title: "NexCode",
    subtitle: "Real-time collaborative code editor with AI",
    year: "2025",
    role: "Full-Stack Development",
    logo: "/images/nexcode-logo.png",
    description:
      "Built a browser-based collaborative IDE on a Spring Boot backend (Spring Data MongoDB, JWT, Redis) exposing 27 REST endpoints and 11 real-time Socket.IO events (netty-socketio) — driving sub-100ms multi-user code, cursor and file-tree sync in a React + Monaco frontend. A Gemini assistant scaffolds full projects conversationally, executed entirely in-browser via the WebContainer API — no local setup.",
    tags: ["Java", "Spring Boot", "MongoDB", "Redis", "React", "Socket.IO"],
    // editor-3: live collaboration chat + @ai command + WebContainer install logs
    // editor-4: the AI-generated app running live in the in-browser preview
    // editor-1: project dashboard (workspace context)
    // editor-2: @ai assistant — build-projects-instantly onboarding
    images: [
      "/images/editor-3.jpg",
      "/images/editor-4.jpg",
      "/images/editor-1.jpg",
      "/images/editor-2.jpg",
    ],
    link: "https://github.com/sunnyyysolanki/Collab-AI",
    liveLink: "https://collaborative-coding-seven.vercel.app",
  },
  {
    id: "linkforge",
    index: "03",
    title: "LinkForge",
    subtitle: "Distributed URL shortener",
    year: "2026",
    role: "Backend & Full-Stack Development",
    logo: "/images/linkforge-logo.png",
    description:
      "Built a URL shortener designed around its traffic shape — reads outnumber writes ~100:1, and the read is a redirect someone is waiting on. A cache hit never touches the database: requests go through a two-tier Caffeine + Redis cache with cross-node invalidation over pub/sub and a circuit breaker that degrades to Postgres instead of failing. Short codes are minted from leased ID blocks and a Feistel permutation, so creating a link costs zero extra round trips and needs no collision check. Clicks are buffered off the hot path into a Redis stream and batch-written into month-partitioned tables, with live counts pushed to a React dashboard over STOMP.",
    tags: ["Java 21", "Spring Boot", "Redis", "PostgreSQL", "React", "Docker"],
    images: [
      "/images/linkforge-1.jpg",
      "/images/linkforge-4.jpg",
      "/images/linkforge-2.jpg",
      "/images/linkforge-3.jpg",
    ],
    link: "https://github.com/sunnyyysolanki/LinkForge",
    liveLink: "https://link-forge-puce.vercel.app",
  },
];

// Career-at-a-glance — deliberately NOT the NetAI role metrics (those live in
// the Experience section) to avoid duplication.
export const STATS = [
  {
    value: "1+",
    unit: "years",
    note: "production engineering at NetAI, shipping to real users",
  },
  {
    value: "2",
    unit: "projects",
    note: "full-stack apps built and deployed end to end",
  },
  {
    value: "2",
    unit: "backends",
    note: "the same real-time IDE, built in both Java Spring Boot and Node.js",
  },
  {
    value: "9.6",
    unit: "CGPA",
    note: "B.Tech Computer Science — Indus University",
  },
];

// Mirrors the NetAI experience bullets on the résumé PDF, in the same order.
export const ACHIEVEMENTS: { tag: string; text: string }[] = [
  {
    tag: "Ownership",
    text: "Owned an AWS cloud-monitoring product end to end — account onboarding, agent installation, instance metrics, and alarms.",
  },
  {
    tag: "Architecture",
    text: "Built a tab-isolated multi-site context system preventing cross-tab data leakage — now imported by 326 modules.",
  },
  {
    tag: "Performance",
    text: "Optimized rendering hot paths — migrated 17 charts to canvas-based ECharts and virtualized live-log views with debounced WebSocket batching — eliminating UI freezes under high-volume data.",
  },
  {
    tag: "Kubernetes",
    text: "Led development of Kubernetes observability — cluster, node, and pod dashboards with live health metrics.",
  },
  {
    tag: "AI × GTM",
    text: "Integrated an AI support chatbot with Google Chat over Pub/Sub for live human handoff, and Apollo.io lead capture into analytics.",
  },
  {
    tag: "Security",
    text: "Hardened client-side security with fail-closed role-based access control (RBAC) and session revocation on server-driven logout.",
  },
];

export const LANGUAGES = ["Java", "TypeScript", "JavaScript", "SQL"];

export const SKILL_GROUPS = [
  {
    id: "c.02",
    title: "Backend — Java",
    span: "lg:col-span-7",
    items: [
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Spring Security",
      "JWT",
      "JDBC",
      "Flyway",
      "REST APIs",
    ],
  },
  {
    id: "c.03",
    title: "Backend — Node",
    span: "lg:col-span-5",
    items: ["Node.js", "Express", "Socket.IO"],
  },
  {
    id: "c.04",
    title: "Frontend",
    span: "lg:col-span-5",
    items: [
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "ECharts",
      "WebSockets",
    ],
  },
  {
    id: "c.05",
    title: "Data & Caching",
    span: "lg:col-span-7",
    items: [
      "PostgreSQL",
      "Redis",
      "MySQL",
      "MongoDB",
      "Caffeine",
    ],
  },
  {
    id: "c.06",
    title: "Tools & DevOps",
    span: "lg:col-span-5",
    items: [
      "Docker",
      "Maven",
    ],
  },
];

export const MARQUEE = [
  "Java",
  "Spring Boot",
  "Spring Security",
  "Hibernate",
  "PostgreSQL",
  "Redis",
  "Docker",
  "nginx",
  "React",
  "TypeScript",
  "REST APIs",
  "WebSockets",
  "Prometheus",
];
