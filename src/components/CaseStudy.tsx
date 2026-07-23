import { ArrowLeft, ArrowUpRight, Asterisk } from "lucide-react";
import { CONTACT, PROJECTS, WORK_EXPERIENCE, type Project } from "../lib/data";
import { MaskLine, Reveal } from "./Reveal";

type StudyContent = {
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
};

const CONTENT: Record<string, StudyContent> = {
  netai: {
    challenge:
      "Network teams needed to understand live infrastructure without losing context across sites, tabs, clusters and streams of high-volume telemetry.",
    approach:
      "I treated performance and information architecture as one problem: a tab-isolated site context, canvas-first charts, virtualized logs and a force-directed topology engine with legible failure states.",
    outcome:
      "The result is an observability surface that remains responsive under production-scale data while making alarms, topology changes and Kubernetes health immediately understandable.",
    metrics: [
      { value: "326", label: "modules using site context" },
      { value: "17", label: "charts moved to canvas" },
      { value: "30k", label: "live log rows" },
    ],
  },
  editor: {
    challenge:
      "Collaborative coding tools often fragment editing, conversation, execution and AI assistance into separate contexts.",
    approach:
      "I brought Monaco, Socket.IO and WebContainer into one synchronized workspace, then designed the AI flow to generate complete MERN scaffolds and individual files conversationally.",
    outcome:
      "Teams can write, discuss, generate and run Node.js projects together without leaving the browser or losing project context.",
    metrics: [
      { value: "Live", label: "multi-user synchronization" },
      { value: "0", label: "local setup required" },
      { value: "MERN", label: "generated application stack" },
    ],
  },
  commerce: {
    challenge:
      "Commerce flows demand clear domain boundaries while keeping catalog, cart, checkout and order states consistent across the client and server.",
    approach:
      "The backend follows a controller-service-repository architecture with DTO mapping and PostgreSQL persistence, exposed through a focused REST contract consumed by React Query and Axios.",
    outcome:
      "A maintainable foundation for product discovery and order management, built to grow without coupling interface decisions to persistence details.",
    metrics: [
      { value: "3", label: "backend architecture layers" },
      { value: "REST", label: "client-server contract" },
      { value: "SQL", label: "durable order data" },
    ],
  },
  blog: {
    challenge:
      "A publishing feed must feel immediate even when content, images, permissions and filters are all resolved dynamically.",
    approach:
      "I combined Clerk authentication and RBAC with indexed filters, infinite pagination and low-quality image placeholders that progressively reveal full media.",
    outcome:
      "The platform delivers a fast, permission-aware reading and publishing experience with a significantly lighter initial page load.",
    metrics: [
      { value: "~30%", label: "faster initial load" },
      { value: "LQIP", label: "progressive image delivery" },
      { value: "RBAC", label: "role-aware publishing" },
    ],
  },
  bank: {
    challenge:
      "Financial state is unforgiving: account balances and transaction histories must remain predictable through every operation.",
    approach:
      "I modelled accounts, transactions and persistence as explicit Java objects, emphasizing encapsulation, validation and deterministic file I/O.",
    outcome:
      "A focused banking system that established the object-oriented and state-management foundations behind my later full-stack work.",
    metrics: [
      { value: "Java", label: "core application language" },
      { value: "OOP", label: "domain modelling" },
      { value: "I/O", label: "file-based persistence" },
    ],
  },
};

// Unified reading order so "Next case study" chains work from any entry.
const SEQUENCE = [WORK_EXPERIENCE, ...PROJECTS];

export default function CaseStudy({ project }: { project: Project }) {
  const content = CONTENT[project.id] ?? CONTENT.netai;
  const currentIndex = SEQUENCE.findIndex((item) => item.id === project.id);
  const next = SEQUENCE[(currentIndex + 1) % SEQUENCE.length];

  return (
    <main className="min-h-screen bg-paper pb-10">
      <header className="container-x flex h-24 items-center justify-between md:h-28">
        <a href="#work" className="group flex items-center gap-3 text-sm font-semibold">
          <span className="grid size-10 place-items-center rounded-full border border-ink/10 transition-colors group-hover:bg-ink group-hover:text-paper">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </span>
          All projects
        </a>
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          Sunny Solanki <Asterisk className="size-3.5 text-accent" />
        </span>
      </header>

      <article>
        <section className="container-x pt-10 md:pt-20">
          <div className="flex items-center justify-between border-t border-ink/10 pt-5">
            <div className="flex items-center gap-4">
              {project.logo && <img src={project.logo} alt="" className="size-6 rounded-md" />}
              <span className="mono-label text-accent">Case study {project.index}</span>
            </div>
            <span className="mono-label text-ink/35">
              {project.year} · {project.role}
            </span>
          </div>

          <h1 className="h-display mt-12 max-w-[12ch] md:mt-16">
            <MaskLine>{project.title}</MaskLine>
            <MaskLine delay={0.1}>
              <span className="serif-i text-ink/45">{project.subtitle}</span>
            </MaskLine>
          </h1>

          <Reveal className="mt-12 md:mt-16" y={50}>
            <div className="relative overflow-hidden rounded-[32px] bg-card p-6 shadow-inner md:p-14 lg:p-20">
              <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.05),transparent)]" />

              <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white p-1 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.25)] md:p-1.5">
                {/* Browser toolbar */}
                <div className="mb-1.5 flex h-8 items-center gap-2 border-b border-black/5 bg-white px-4 md:h-10">
                  <div className="size-2 rounded-full bg-black/10 md:size-2.5" />
                  <div className="size-2 rounded-full bg-black/10 md:size-2.5" />
                  <div className="size-2 rounded-full bg-black/10 md:size-2.5" />
                  <div className="ml-4 h-4 w-32 rounded-md bg-black/[0.03] md:h-5 md:w-48" />
                </div>

                <div className="aspect-[16/10] w-full">
                  <img
                    src={project.image}
                    alt={`${project.title} case study cover`}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-x py-20 md:py-28">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <Reveal className="col-span-12 lg:col-span-4">
              <p className="mono-label text-ink/35">Overview</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="col-span-12 lg:col-span-8" delay={0.08}>
              <p className="max-w-[38ch] text-[clamp(1.65rem,3vw,2.75rem)] font-medium leading-[1.2] tracking-tight">
                {project.description}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ink text-paper">
          <div className="container-x py-20 md:py-28">
            <div className="grid grid-cols-1 gap-12 border-y border-paper/10 py-14 md:grid-cols-3 md:gap-8">
              {content.metrics.map((metric, index) => (
                <Reveal key={metric.label} delay={index * 0.08}>
                  <p className="display-num">{metric.value}</p>
                  <p className="mono-label mt-4 text-paper/40">{metric.label}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 grid grid-cols-12 gap-x-8 gap-y-16 md:mt-28">
              {([
                ["01", "The challenge", content.challenge],
                ["02", "The approach", content.approach],
                ["03", "The outcome", content.outcome],
              ] as const).map(([index, title, copy]) => (
                <Reveal key={title} className="col-span-12 md:col-span-4">
                  <span className="mono-label text-accent">({index})</span>
                  <h2 className="h-card mt-6">{title}</h2>
                  <p className="mt-5 max-w-[38ch] text-[16px] leading-relaxed text-paper/55">
                    {copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-x py-20 md:py-28">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <Reveal className="col-span-12 lg:col-span-5">
              <p className="mono-label text-ink/35">Engineering note</p>
              <h2 className="h-section mt-7">
                Built for the <span className="serif-i">real world.</span>
              </h2>
            </Reveal>
            <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1}>
              <p className="text-lead text-ink/60">
                The work balances product clarity with production constraints: maintainable
                architecture, measurable performance and interfaces that stay understandable under
                pressure.
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary group mt-8"
              >
                View source or profile
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="container-x">
          <a
            href={`#case-study/${next.id}`}
            className="group block rounded-[36px] bg-card p-8 md:p-14"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="mono-label text-ink/35">Next case study · {next.index}</span>
              <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <p className="h-section mt-16 md:mt-24">
              {next.title} <span className="serif-i text-ink/40">{next.subtitle}</span>
            </p>
          </a>
        </section>
      </article>

      <footer className="container-x mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-8">
        <span className="mono-label text-ink/35">© 2026 Sunny Solanki</span>
        <a href={CONTACT.emailHref} className="link-line mono-label text-ink/60">
          {CONTACT.email}
        </a>
      </footer>
    </main>
  );
}
