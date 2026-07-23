import { ArrowLeft, Download } from "lucide-react";
import {
  ACHIEVEMENTS,
  CONTACT,
  LANGUAGES,
  PROJECTS,
  SKILL_GROUPS,
  WORK_EXPERIENCE,
} from "../lib/data";
import type { ReactNode } from "react";

const EDUCATION = {
  degree: "B.Tech in Computer Science",
  school: "Indus University, Ahmedabad",
  period: "Oct 2021 — Jun 2025",
  cgpa: "CGPA 9.6 / 10",
};

function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-9 break-inside-avoid">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          ({index})
        </span>
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink">{title}</h2>
        <span className="h-px flex-1 bg-ink/10" />
      </div>
      {children}
    </section>
  );
}

export default function Resume() {
  const back = () => {
    // Drop the hash so the SPA returns to the portfolio — works whether this
    // document was opened in the same tab or a fresh one.
    window.location.hash = "";
  };

  return (
    <div className="min-h-screen bg-[#E7E4DE] text-ink print:bg-white">
      {/* Toolbar — visible on screen, hidden when printing to PDF */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md print:hidden">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button onClick={back} className="flex items-center gap-2.5" aria-label="Back to portfolio">
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
              <span className="font-serif text-[15px] italic leading-none">S</span>
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em]">
              Sunny Solanki
            </span>
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={back} className="btn group">
              <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-0.5" />
              Back to site
            </button>
            <button onClick={() => window.print()} className="btn btn--primary group">
              <Download className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      {/* The sheet */}
      <main className="px-4 py-8 print:px-0 print:py-0 sm:px-6 md:py-12">
        <article className="mx-auto max-w-[820px] rounded-[20px] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.35)] print:max-w-none print:rounded-none print:p-0 print:shadow-none sm:p-12 md:p-16">
          {/* Masthead */}
          <header className="break-inside-avoid">
            <h1 className="text-[40px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[52px]">
              Sunny Solanki
            </h1>
            <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/55">
              Full-Stack Software Engineer
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink/60">
              <span>Ahmedabad, India</span>
              <Dot />
              <a href={CONTACT.phoneHref} className="link-line hover:text-ink">
                {CONTACT.phone}
              </a>
              <Dot />
              <a href={CONTACT.emailHref} className="link-line hover:text-ink">
                {CONTACT.email}
              </a>
              <Dot />
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-line hover:text-ink"
              >
                linkedin.com{CONTACT.linkedinLabel}
              </a>
              <Dot />
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="link-line hover:text-ink"
              >
                github.com{CONTACT.githubLabel}
              </a>
            </div>
          </header>

          <Section index="01" title="Summary">
            <p className="max-w-[68ch] text-[14px] leading-[1.7] text-ink/75">
              Full-stack software engineer with production experience across both{" "}
              <span className="font-semibold text-ink">Java (Spring Boot)</span> and the{" "}
              <span className="font-semibold text-ink">MERN stack</span>. Shipped an AWS
              cloud-monitoring product end to end and built high-performance, real-time React
              interfaces at scale. Comfortable owning features from REST API and database design
              through to responsive front-end delivery.
            </p>
          </Section>

          <Section index="02" title="Experience">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="text-[15px] font-semibold tracking-tight">
                Software Engineer <span className="font-normal text-ink/45">— {WORK_EXPERIENCE.title}</span>
              </p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/40">
                {WORK_EXPERIENCE.year}
              </span>
            </div>
            <p className="mt-0.5 text-[12.5px] italic text-ink/50">
              {WORK_EXPERIENCE.subtitle} · Ahmedabad, IN
            </p>
            <ul className="mt-4 space-y-2.5">
              {ACHIEVEMENTS.map((item, i) => (
                <li key={i} className="flex gap-2.5 break-inside-avoid text-[13px] leading-[1.65] text-ink/75">
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section index="03" title="Selected Projects">
            <div className="space-y-4">
              {PROJECTS.map((p) => (
                <div key={p.id} className="break-inside-avoid">
                  <p className="text-[14px] font-semibold tracking-tight">
                    {p.title} <span className="font-normal text-ink/45">— {p.subtitle}</span>
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">
                    {p.tags.join("  ·  ")}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-ink/70">{p.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section index="04" title="Skills">
            <div className="space-y-2 text-[13px] leading-[1.6] text-ink/75">
              <p>
                <span className="font-semibold text-ink">Languages — </span>
                {LANGUAGES.join(", ")}
              </p>
              {SKILL_GROUPS.map((g) => (
                <p key={g.id} className="break-inside-avoid">
                  <span className="font-semibold text-ink">{g.title} — </span>
                  {g.items.join(", ")}
                </p>
              ))}
            </div>
          </Section>

          <Section index="05" title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="text-[14px] font-semibold tracking-tight">
                {EDUCATION.degree} <span className="font-normal text-ink/45">— {EDUCATION.school}</span>
              </p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/40">
                {EDUCATION.period}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-ink/60">{EDUCATION.cgpa}</p>
          </Section>
        </article>
      </main>
    </div>
  );
}

function Dot() {
  return <span className="hidden h-1 w-1 rounded-full bg-ink/25 sm:inline-block" aria-hidden />;
}
