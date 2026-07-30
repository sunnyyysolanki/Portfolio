import { ArrowUpRight } from "lucide-react";
import { CONTACT, PROJECTS } from "../lib/data";
import { MaskLine, Reveal } from "./Reveal";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function Works() {
  return (
    <section id="work" className="container-x section-pad">
      <SectionHeader index="02" label="Case Studies" note="( Personal Projects )" />

      <div className="mt-10 flex items-end justify-between gap-8 md:mt-14">
        <h2 className="h-section max-w-[14ch]">
          <MaskLine>
            <span>
              Selected <span className="serif-i font-normal">Projects</span>
              <span className="text-accent">.</span>
            </span>
          </MaskLine>
        </h2>
        <Reveal delay={0.1}>
          {/* Derived, not typed: this read "04" while two cards rendered below it. */}
          <span className="mono-label hidden pb-2 text-ink/40 md:block">
            ({" "}
            {String(PROJECTS.length).padStart(2, "0")} items )
          </span>
        </Reveal>
      </div>

      <div className="mt-8 flex flex-col gap-12 md:mt-12 lg:gap-16">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* archive link */}
      <Reveal className="mt-16 md:mt-20">
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-6 border-t border-ink/10 pt-8"
        >
          <span className="h-card flex flex-wrap items-baseline gap-x-3">
            Full archive
            <span className="serif-i font-normal text-ink/50">on GitHub</span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/12 transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
