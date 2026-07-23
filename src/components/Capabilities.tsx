import { Fragment } from "react";
import { LANGUAGES, SKILL_GROUPS } from "../lib/data";
import { MaskLine, Reveal } from "./Reveal";
import SectionHeader from "./SectionHeader";
import { cn } from "../utils/cn";

export default function Capabilities() {
  return (
    <section id="capabilities" className="container-x section-pad">
      <SectionHeader index="04" label="Capabilities" note="( Tools of the trade )" />

      <h2 className="h-section mt-12 max-w-[16ch] md:mt-16">
        <MaskLine>
          <span>
            One stack, <span className="serif-i font-normal">end to end.</span>
          </span>
        </MaskLine>
      </h2>

      <div className="mt-14 grid grid-cols-12 gap-6 md:mt-24 lg:gap-8">
        {/* languages — wide banner card */}
        <Reveal className="col-span-12">
          <div className="card-surface card-hover p-8 md:p-12">
            <div className="flex items-center justify-between">
              <span className="mono-label text-ink/45">
                <span className="text-accent">(</span>c.01<span className="text-accent">)</span>
              </span>
              <span className="mono-label text-ink/45">Languages</span>
            </div>
            <p className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 md:gap-x-9">
              {LANGUAGES.map((lang, i) => (
                <Fragment key={lang}>
                  <span
                    className={cn(
                      "text-[clamp(2rem,3.8vw,3.5rem)] tracking-tight text-ink",
                      i % 2 === 1 ? "serif-i" : "font-semibold",
                    )}
                  >
                    {lang}
                  </span>
                  {i < LANGUAGES.length - 1 && (
                    <span className="text-[clamp(1.4rem,2.4vw,2.2rem)] text-ink/20" aria-hidden>
                      ·
                    </span>
                  )}
                </Fragment>
              ))}
            </p>
          </div>
        </Reveal>

        {/* skill groups */}
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.id} delay={(i % 2) * 0.07} className={cn("col-span-12 md:col-span-6", group.span)}>
            <div className="card-surface card-hover flex h-full flex-col p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink/45">
                  <span className="text-accent">(</span>
                  {group.id}
                  <span className="text-accent">)</span>
                </span>
                <span className="size-1.5 rounded-full bg-ink/20" />
              </div>
              <h3 className="h-card mt-12 md:mt-16">{group.title}</h3>
              <div className="mt-8 flex flex-wrap gap-2 md:mt-auto md:pt-10">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* education */}
        <Reveal className="col-span-12 md:col-span-6 lg:col-span-7">
          <div className="card-surface card-hover flex h-full flex-wrap items-end justify-between gap-x-12 gap-y-10 p-8 md:p-12">
            <div>
              <span className="mono-label text-ink/45">
                <span className="text-accent">(</span> Education <span className="text-accent">)</span>
              </span>
              <h3 className="h-card mt-8">B.Tech — Computer Science</h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink/55">
                Indus University, Ahmedabad
                <br />
                <span className="mono-label !text-[9px] text-ink/40">Oct 2021 — Jun 2025</span>
              </p>
            </div>
            <div className="text-right">
              <p className="display-num">9.6</p>
              <p className="mono-label mt-3 text-ink/40">CGPA / 10</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
