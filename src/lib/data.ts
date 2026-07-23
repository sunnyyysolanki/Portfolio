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
  image: string;
  link: string;
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
  logo: "https://www.google.com/s2/favicons?domain=netai.ai&sz=128",
  description:
    "Engineering the world's first GNN-powered AIOps platform. Owning an AWS cloud-monitoring product end to end — from account onboarding and agent installation to real-time d3-force topology maps and high-volume Kubernetes dashboards.",
  tags: ["React", "TypeScript", "AWS", "ECharts", "d3-force", "WebSockets"],
  image: "/images/netai.jpg",
  link: "https://netai.ai",
};

export const PROJECTS: Project[] = [
  {
    id: "editor",
    index: "02",
    title: "Collab Editor",
    subtitle: "Real-time code editing, with AI generation",
    year: "2025",
    role: "Case Study",
    description:
      "A multi-user Monaco editor with live sync, chat and file collaboration over Socket.IO — Node.js projects executed fully in-browser via WebContainer, with an AI assistant that scaffolds entire MERN apps conversationally.",
    tags: ["MERN", "Socket.IO", "Monaco", "WebContainer", "AI"],
    image: "/images/editor.jpg",
    link: "https://github.com/sunnyyysolanki",
  },
  {
    id: "commerce",
    index: "03",
    title: "ShopStack",
    subtitle: "Full-stack e-commerce, Spring Boot × React",
    year: "2025",
    role: "Development",
    description:
      "A layered Spring Boot REST backend — controller, service, repository — with DTO mapping on Spring Data JPA and PostgreSQL, feeding a React storefront for catalog, cart, checkout and order tracking.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React", "Axios"],
    image: "/images/commerce.jpg",
    link: "https://github.com/sunnyyysolanki",
  },
  {
    id: "blog",
    index: "04",
    title: "Inkwell",
    subtitle: "A publishing platform on the MERN stack",
    year: "2024",
    role: "Case Study",
    description:
      "Full-stack blogging on an Express REST API with Clerk authentication, RBAC, infinite-scroll feeds and category filters — LQIP lazy-loaded images cut initial page load by ~30%.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Clerk"],
    image: "/images/blog.jpg",
    link: "https://github.com/sunnyyysolanki",
  },
  {
    id: "bank",
    index: "05",
    title: "Ledger",
    subtitle: "Core-Java banking management system",
    year: "2024",
    role: "Foundations",
    description:
      "A core-Java banking application with account creation, transactions and file-based persistence — where the fundamentals of modelling money and state were earned the hard way.",
    tags: ["Java", "OOP", "File I/O"],
    image: "/images/bank.jpg",
    link: "https://github.com/sunnyyysolanki",
  },
];

export const STATS = [
  {
    value: "326",
    unit: "modules",
    note: "import the tab-isolated multi-site context system",
  },
  {
    value: "17",
    unit: "charts",
    note: "migrated to canvas ECharts, with ~30k-row virtualized logs",
  },
  {
    value: "~30%",
    unit: "engine share",
    note: "of the flagship link-drawing engine, sole-authored",
  },
  {
    value: "9.6",
    unit: "CGPA",
    note: "B.Tech Computer Science — Indus University",
  },
];

export const ACHIEVEMENTS: { tag: string; text: string }[] = [
  {
    tag: "Ownership",
    text: "Own the AWS cloud-monitoring product end to end — account onboarding, agent installation, instance metrics and alarms.",
  },
  {
    tag: "Architecture",
    text: "Built a tab-isolated multi-site context system — a different network site per browser tab, preventing cross-tab data leakage — now imported by 326 modules.",
  },
  {
    tag: "Canvas",
    text: "Engineered canvas rendering for the flagship force-graph (d3-force) device-topology map — ~30% of the link-drawing engine, failure-path animations with pause/resume, and sole-authored node/link tooltips.",
  },
  {
    tag: "Performance",
    text: "Migrated 17 charts to canvas-based ECharts and virtualized live-log views to ~30k mounted rows with debounced WebSocket batching — eliminating UI freezes under high-volume data.",
  },
  {
    tag: "Kubernetes",
    text: "Led development of Kubernetes observability — cluster, node and pod dashboards with live health metrics.",
  },
  {
    tag: "AI × GTM",
    text: "Integrated the AI support chatbot with Google Chat over Pub/Sub for live human handoff, and Apollo.io lead capture into sales and product analytics.",
  },
  {
    tag: "Security",
    text: "Hardened client-side security with fail-closed role-based access control (RBAC) and session revocation that clears credentials on server-driven logout.",
  },
];

export const LANGUAGES = ["Java", "TypeScript", "JavaScript", "SQL"];

export const SKILL_GROUPS = [
  {
    id: "c.02",
    title: "Backend — Java",
    span: "lg:col-span-7",
    items: ["Spring Boot", "Spring Data JPA", "Hibernate", "JDBC", "REST APIs", "Maven"],
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
      "ReactFlow",
      "WebSockets",
    ],
  },
  {
    id: "c.05",
    title: "Data & Cloud",
    span: "lg:col-span-7",
    items: ["PostgreSQL", "MySQL", "MongoDB", "AWS — EC2", "AWS — CloudWatch", "GCP Pub/Sub"],
  },
  {
    id: "c.06",
    title: "Tools & Testing",
    span: "lg:col-span-5",
    items: ["Git", "Jest", "React Testing Library"],
  },
];

export const MARQUEE = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "PostgreSQL",
  "AWS",
  "Socket.IO",
  "ECharts",
  "MongoDB",
  "Tailwind CSS",
];
