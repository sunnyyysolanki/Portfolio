import { ArrowUpRight, FileText } from "lucide-react";
import { CONTACT, HERO_TECH, RESUME_PATH, SOCIAL_LINKS } from "../lib/data";
import { useLenis } from "../lib/lenis";
import { BRANDS, BrandIcon } from "./BrandIcons";
import { MaskLine, Reveal } from "./Reveal";

export default function Hero() {
  const lenis = useLenis();
  const goToWork = () => lenis?.scrollTo("#work", { duration: 1.6 });

  return (
    <section className="container-x relative pt-16 md:pt-24">
      <div className="pointer-events-none absolute -top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-12 -z-10 hidden h-[540px] w-[540px] rounded-full bg-accent/[0.06] blur-[130px] lg:block" />

      {/* Three blocks rather than two columns. From `lg` the portrait column spans both
          rows on the right while the headline and the copy stack on the left; below it
          they unstack in source order, which puts the face directly under the headline
          instead of stranding it beneath the whole left column. */}
      <div className="grid grid-cols-12 items-start gap-x-8 gap-y-10 md:gap-y-12">
        {/* ---------------------------------------------------------------- headline */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal delay={0.05} y={10}>
            <p className="flex items-center gap-3">
              <span className="size-2 animate-pulse rounded-full bg-accent" />
              <span className="text-[15px] tracking-tight text-ink/60">
                Hi, I&rsquo;m <span className="font-medium text-accent">Sunny</span>
              </span>
            </p>
          </Reveal>

          <h1 className="h-display h-display--hero mt-5 text-balance md:mt-7">
            <MaskLine delay={0.1}>
              <span>Full-Stack</span>
            </MaskLine>
            <MaskLine delay={0.22}>
              <span className="serif-i font-normal text-accent">Software</span>
            </MaskLine>
            <MaskLine delay={0.34}>
              <span>Engineer</span>
            </MaskLine>
          </h1>
        </div>

        {/* ------------------------------------------------------- connect + portrait */}
        <div className="col-span-12 flex flex-col lg:col-span-5 lg:row-span-2">
          <Reveal delay={0.3} y={10}>
            {/* Centred from `lg`, where the portrait fills the column — that puts the row
                directly over the head. Left-aligned below it, since the figure is only
                62% wide and right-aligned there, so centring would float them off it. */}
            <p className="mono-label text-ink/30 lg:text-center">Connect</p>
            <ul className="mt-5 flex flex-wrap items-start gap-5 sm:gap-6 lg:justify-center">
              {SOCIAL_LINKS.map(({ brand, href }) => (
                <li key={brand}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex w-14 flex-col items-center gap-2"
                  >
                    <span className="icon-token">
                      <BrandIcon name={brand} className="size-5" />
                    </span>
                    <span className="text-[11px] tracking-tight text-ink/45 transition-colors duration-500 group-hover:text-ink/75">
                      {BRANDS[brand].label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex w-14 flex-col items-center gap-2"
                >
                  <span className="icon-token">
                    <FileText className="size-5 text-accent" strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] tracking-tight text-ink/45 transition-colors duration-500 group-hover:text-ink/75">
                    Resume
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          {/* `mt-auto` drops the figure to the bottom of the two rows it spans, so it
              settles against the copy on the left instead of floating mid-column. */}
          <Reveal
            delay={0.55}
            y={26}
            className="pointer-events-none mt-10 ml-auto w-[62%] max-w-[250px] sm:max-w-[300px] lg:mt-auto lg:w-full lg:max-w-none lg:pt-10"
          >
            <img
              src="/images/portrait.webp"
              alt="Sunny Solanki"
              width={1126}
              height={1139}
              decoding="async"
              fetchPriority="high"
              className="hero-portrait h-auto w-full"
            />
          </Reveal>
        </div>

        {/* ------------------------------------------------- copy, actions, tech strip */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal delay={0.45}>
            <p className="text-lead max-w-[52ch] text-ink/70">
              Software Engineer with 1+ year of professional experience and hands-on expertise
              building scalable Java backend systems with{" "}
              <span className="font-medium text-ink">Spring Boot</span>,{" "}
              <span className="font-medium text-ink">PostgreSQL</span> &amp;{" "}
              <span className="font-medium text-ink">Redis</span>. Previously shipped monitoring
              products at <span className="serif-i text-accent">NetAI</span>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button onClick={goToWork} className="btn btn--solid group">
                View Projects
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <a
                href={CONTACT.emailHref}
                className="link-line group inline-flex items-center gap-2 text-[15px] font-medium tracking-tight"
              >
                Get in touch
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.6} className="mt-12 md:mt-16">
            <p className="mono-label text-ink/30">Technologies</p>
            {/* `divide-x` only from `sm`: the row fits on one line there, while on a phone
                it wraps and a leading rule on each new row reads as a stray mark. */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-0 sm:divide-x sm:divide-ink/10">
              {HERO_TECH.map((brand) => (
                <li
                  key={brand}
                  className="flex items-center gap-2.5 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                >
                  <BrandIcon name={brand} className="size-5 shrink-0" />
                  <span className="text-[13px] font-medium tracking-tight text-ink/65">
                    {BRANDS[brand].label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
