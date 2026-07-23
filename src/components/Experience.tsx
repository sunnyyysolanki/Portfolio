import { ArrowUpRight } from "lucide-react";
import { ACHIEVEMENTS, WORK_EXPERIENCE } from "../lib/data";
import { Reveal } from "./Reveal";
import SectionHeader from "./SectionHeader";
import { cn } from "../utils/cn";

const META = [
  { key: "Company", value: "NetAI Pvt. Ltd." },
  { key: "Product", value: "AWS cloud monitoring" },
  { key: "Stack", value: "React · TypeScript · AWS" },
  { key: "Tenure", value: "Apr 2025 — Present" },
  { key: "Base", value: "Ahmedabad · India" },
];

export default function Experience() {
  const exp = WORK_EXPERIENCE;

  return (
    <section id="experience" className="container-x section-pad">
      <SectionHeader index="03" label="Professional Experience" note="( Full-Stack Engineer )" />

      {/* Hero Experience Card */}
      <Reveal className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 group">
          {/* Left Side: Info */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-[#F8F8F6] rounded-[32px] p-8 lg:p-10 flex flex-col justify-between border border-ink/[0.03]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {exp.logo ? (
                    <img src={exp.logo} alt="" className="size-8 rounded-lg" />
                  ) : (
                    <div className="size-8 rounded-lg bg-ink/5" aria-hidden />
                  )}
                  <span className="mono-label text-ink tracking-widest">{exp.title}</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-accent/5 px-3 py-1 text-[9px] font-bold tracking-tighter text-accent uppercase border border-accent/10">
                  {exp.badge}
                </span>
              </div>
              
              <h3 className="text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.15] mb-2">
                Software Engineer
              </h3>
              <p className="text-ink/40 font-medium text-[14px] mb-8">
                {exp.year} <span className="mx-1.5 opacity-30">·</span> Ahmedabad, IN
              </p>
              
              <p className="text-[16px] leading-[1.6] text-ink/60 mb-8 max-w-[32ch]">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-ink/10 text-ink/40 bg-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a 
              href={`#case-study/${exp.id}`}
              className="inline-flex items-center gap-2 text-ink/40 font-semibold text-[14px] uppercase tracking-wider hover:text-ink transition-colors group/link"
            >
              Read role deep-dive 
              <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>

          {/* Right Side: Visual */}
          <div className={cn("col-span-12 md:col-span-7 lg:col-span-8 rounded-[32px] overflow-hidden relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center p-6 lg:p-14 transition-all duration-700 bg-[#F1F6FD]")}>
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)]" />
            
            <div className="relative w-full aspect-[16/10] max-h-[420px] rounded-xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-[1.02] border border-white/40 bg-white/80 p-1">
                <div className="h-6 flex items-center gap-1.5 px-3 border-b border-black/5 mb-1 bg-white/50 backdrop-blur-sm">
                  <div className="size-1.5 rounded-full bg-black/10" />
                  <div className="size-1.5 rounded-full bg-black/10" />
                  <div className="size-1.5 rounded-full bg-black/10" />
                </div>
                <div className="relative w-full h-[calc(100%-1.75rem)] rounded-lg overflow-hidden">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Detailed Accomplishments */}
      <div className="mt-16 md:mt-24 grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
             <h4 className="mono-label text-ink/30 mb-8">Key Accomplishments</h4>
             <dl className="border-t border-ink/10">
                {META.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4"
                  >
                    <dt className="mono-label text-ink/40">{row.key}</dt>
                    <dd className="text-right text-[14px] font-medium tracking-tight">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ol className="border-t border-ink/10">
            {ACHIEVEMENTS.map((item, i) => (
              <li
                key={item.tag}
                className="group -mx-3 rounded-2xl border-b border-ink/10 px-3 transition-colors duration-500 hover:bg-card"
              >
                <Reveal y={24} delay={i * 0.04}>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 py-7 md:grid-cols-[3rem_1fr_auto] md:gap-x-8 md:py-8">
                    <span className="mono-label text-ink/35 transition-colors duration-500 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[60ch] text-[clamp(1rem,1.35vw,1.15rem)] leading-relaxed text-ink/75">
                      {item.text}
                    </p>
                    <span className="mono-label col-span-2 pt-1 text-ink/30 md:col-span-1 md:pt-0 md:text-right">
                      {item.tag}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
