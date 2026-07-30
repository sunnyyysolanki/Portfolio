import type { BrandName } from "../components/BrandIcons";

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
  leetcode: "https://leetcode.com/u/sunnyyysolanki",
  leetcodeLabel: "/u/sunnyyysolanki",
  location: "Ahmedabad — India",
};

/** The résumé PDF sits in public/; the nav and the hero both point at this one path. */
export const RESUME_PATH = "/Sunny_Solanki_Resume.pdf";

/** The hero's TECHNOLOGIES strip, in reading order. Labels come from BRANDS. */
export const HERO_TECH: BrandName[] = ["java", "spring", "react", "postgresql", "redis"];

/** The hero's CONNECT block, in reading order. The Résumé link is appended in the Hero,
 *  since it points at a file rather than a profile. */
export const SOCIAL_LINKS: { brand: BrandName; href: string }[] = [
  { brand: "linkedin", href: CONTACT.linkedin },
  { brand: "github", href: CONTACT.github },
  { brand: "leetcode", href: CONTACT.leetcode },
];

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
  subtitle: "AI-powered network monitoring platform",
  year: "Apr 2025 — Jul 2026",
  role: "Software Engineer",
  logo: "/images/netai-wordmark.png",
  description:
    "Owned the frontend for the platform's AWS cloud-monitoring module — account onboarding, agent installation, and the metrics/alarms pipeline UI — then led Kubernetes observability: cluster, node and pod dashboards with 2D cluster topology visualization, backed by live health-metric ingestion and WebSocket-driven real-time alerts.",
  tags: ["React", "TypeScript", "AWS", "ECharts", "react-force-graph", "WebSockets"],
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
      "Built a browser-based collaborative IDE on a Spring Boot backend (Spring Data MongoDB, JWT, Redis) exposing 27 REST endpoints and a real-time layer of 11 STOMP WebSocket channels — driving sub-100ms multi-user code, cursor and file-tree sync in a React + Monaco frontend. A Gemini assistant scaffolds full projects conversationally, executed entirely in-browser via the WebContainer API — no local setup.",
    tags: ["Java", "Spring Boot", "MongoDB", "Redis", "React", "WebSockets"],
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
    value: "9.6",
    unit: "CGPA",
    note: "B.Tech Computer Science — Indus University",
  },
];

// Mirrors the NetAI experience bullets on the résumé PDF, in the same order. Keep these
// in step with Sunny_Solanki_Resume.pdf — the wording is deliberately verbatim.
export const ACHIEVEMENTS: { tag: string; text: string }[] = [
  {
    tag: "Ownership",
    text: "Owned the frontend for the platform's AWS cloud-monitoring module — built account onboarding, agent installation, and the metrics/alarms pipeline UI.",
  },
  {
    tag: "Architecture",
    text: "Designed a tab-isolated multi-site context system now adopted across 326 modules, eliminating a class of cross-tab data-leakage bugs.",
  },
  {
    tag: "Performance",
    text: "Identified rendering bottlenecks and introduced canvas-based charting (ECharts) and list virtualization to the product for the first time — migrating 17 dashboard charts and virtualizing live-log views with debounced WebSocket batching, eliminating multi-second UI freezes under high-volume streams.",
  },
  {
    tag: "Kubernetes",
    text: "Led Kubernetes observability development — cluster, node, and pod dashboards with 2D cluster topology visualization (react-force-graph, D3), backed by live health-metric ingestion and WebSocket-driven real-time alert delivery.",
  },
  {
    tag: "AI × Security",
    text: "Integrated an AI support chatbot with Google Chat over Pub/Sub for live human handoff, and hardened access with fail-closed RBAC and server-driven session revocation.",
  },
];

export const LANGUAGES = ["Java", "JavaScript", "TypeScript", "SQL"];

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
      "Flyway",
      "REST APIs",
    ],
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
      "D3.js",
      "react-force-graph",
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
      "Git",
      "GitHub Actions",
      "Postman",
      "Swagger",
    ],
  },
  {
    id: "c.07",
    title: "Testing",
    span: "lg:col-span-5",
    items: ["JUnit"],
  },
  {
    id: "c.08",
    title: "AI-Assisted Development",
    span: "lg:col-span-7",
    items: ["GitHub Copilot", "Claude", "Cursor"],
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
  "MongoDB",
];
