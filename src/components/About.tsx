import { CONTACT, STATS } from "../lib/data";
import { MaskLine, Reveal } from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import SectionHeader from "./SectionHeader";
import CountUp from "./CountUp";

const DETAILS = [
  { key: "Role", value: "Software Engineer — NetAI" },
  { key: "Base", value: "Ahmedabad · India" },
  { key: "Education", value: "B.Tech Computer Science" },
  { key: "Focus", value: "Java, Spring Boot & scalable APIs" },
];

export default function About() {
  return (
    <section id="about" className="container-x section-pad">
      <SectionHeader index="01" label="Profile" note="( The short version )" />

      <h2 className="h-section mt-12 max-w-[18ch] md:mt-16">
        <MaskLine>Systems thinker,</MaskLine>
        <MaskLine delay={0.08}>
          <span>
            <span className="serif-i font-normal">product</span> obsessed
            <span className="text-accent">.</span>
          </span>
        </MaskLine>
      </h2>

      <div className="mt-14 grid grid-cols-12 gap-x-8 gap-y-14 md:mt-24">
        {/* text column */}
        <div className="col-span-12 flex flex-col gap-10 lg:col-span-7">
          <Reveal className="flex max-w-[38rem] flex-col gap-7">
            <p className="text-lead text-ink/70">
              Full-stack Java engineer with production experience building{" "}
              <span className="font-medium text-ink">Spring Boot</span> backends and{" "}
              <span className="font-medium text-ink">React</span> frontends — currently shipping an
              AWS cloud-monitoring product end to end at NetAI.
            </p>
            <p className="text-lead text-ink/55">
              My happy place is the seam between backend rigour and frontend polish — designing the
              REST contract, modelling the domain and tuning the queries, then sweating the details
              on the interface until it just feels{" "}
              <span className="serif-i text-[1.12em] text-ink/80">fast.</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-t border-ink/10">
              {DETAILS.map((row) => (
                <div
                  key={row.key}
                  className="group flex items-center justify-between gap-6 border-b border-ink/10 py-5"
                >
                  <dt className="mono-label text-ink/40">{row.key}</dt>
                  <dd className="text-right text-[15px] font-medium tracking-tight transition-transform duration-500 group-hover:-translate-x-1">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* image column */}
        <Reveal delay={0.12} className="col-span-12 lg:col-span-5">
          <div className="group">
            <ParallaxImage
              src="/images/about.jpg"
              alt="Sunny Solanki's desk — keyboard, notebook and interface sketches"
              speed={6}
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="aspect-[4/4.6] lg:aspect-[4/5]"
            />
            <div className="mt-5 flex items-center justify-between px-1">
              <span className="mono-label text-ink/45">Studio — Desk, 2026</span>
              <span className="mono-label text-ink/35">( Fig. 01 )</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* stats */}
      <div className="mt-14 grid grid-cols-2 gap-6 md:mt-20 lg:grid-cols-4 lg:gap-8">
        {STATS.map((stat, i) => (
          <Reveal key={stat.unit} delay={i * 0.06}>
            <div className="card-surface card-hover flex h-full flex-col justify-between gap-10 p-7 md:gap-16 md:p-10">
              <p className="flex items-baseline gap-2">
                <span className="display-num">
                  <CountUp value={stat.value} />
                </span>
                <span className="mono-label !text-[9px] text-accent">{stat.unit}</span>
              </p>
              <p className="max-w-[26ch] text-sm leading-relaxed text-ink/55">{stat.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* resume line */}
      <Reveal className="mt-14 md:mt-20">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-7">
          <p className="mono-label text-ink/40">Full résumé available on request</p>
          <a href={CONTACT.emailHref} className="link-line mono-label text-ink/70">
            Request a copy — {CONTACT.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
