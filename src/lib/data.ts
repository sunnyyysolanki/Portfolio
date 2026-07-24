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
  logo: "https://www.google.com/s2/favicons?domain=netai.ai&sz=128",
  description:
    "Engineering the world's first GNN-powered AIOps platform. Owning an AWS cloud-monitoring product end to end — from account onboarding and agent installation to real-time d3-force topology maps and high-volume Kubernetes dashboards.",
  tags: ["React", "TypeScript", "AWS", "ECharts", "d3-force", "WebSockets"],
  images: ["/images/netai.jpg"],
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
    description:
      "Built a browser-based collaborative IDE where teams write, chat, and run code together in real time. Monaco editing, cursor and file-tree sync flow over 27 REST endpoints and 11 Socket.IO events; a Gemini assistant scaffolds full MERN projects conversationally, and the WebContainer API installs and runs both the backend and frontend entirely in-browser — no local setup.",
    tags: ["React", "Node.js", "Socket.IO", "Monaco", "WebContainer", "Gemini AI"],
    images: ["/images/editor-1.jpg", "/images/editor-2.jpg"],
    link: "https://github.com/sunnyyysolanki/Collab-AI",
    liveLink: "https://collaborative-coding-seven.vercel.app",
  },
  {
    id: "fixonaut",
    index: "03",
    title: "Fixonaut",
    subtitle: "Full-stack service management platform",
    year: "2024",
    role: "Full-Stack Development",
    description:
      "Developed a robust backend with Java 21 and Spring Boot, establishing secure REST APIs using Spring Security and JWT. Built a responsive frontend using React and TypeScript, optimizing load times by 30% with Vite. Designed a normalized PostgreSQL database on Neon ensuring sub-100ms query latency, and deployed via Docker on Render.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "JWT"],
    images: ["/images/commerce.jpg"],
    link: "https://github.com/sunnyyysolanki",
  },
  {
    id: "drishti",
    index: "04",
    title: "Drishti",
    subtitle: "AI-Powered Accessibility App",
    year: "2024",
    role: "Full-Stack AI Development",
    description:
      "Developed a mobile application using React Native and Expo to assist visually impaired users. Built a Python Flask backend integrating Google Cloud Vision API for robust optical character recognition and Text-to-Speech (TTS) for natural voice playback. Implemented multi-language detection (English, Hindi, Gujarati) with dynamic voice switching, generating concatenated audio files via pydub.",
    tags: ["React Native", "Python", "Flask", "Google Cloud Vision", "Google TTS", "AI"],
    images: ["/images/blog.jpg"],
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
