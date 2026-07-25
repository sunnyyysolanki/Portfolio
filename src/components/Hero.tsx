import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../lib/data";
import { useLenis } from "../lib/lenis";
import { MaskLine, Reveal } from "./Reveal";
import ParallaxImage from "./ParallaxImage";

export default function Hero() {
  const lenis = useLenis();
  const goToWork = () => lenis?.scrollTo("#work", { duration: 1.6 });

  return (
    <section className="container-x relative pt-16 md:pt-24">
      <div className="pointer-events-none absolute -top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <h1 className="h-display text-balance">
        <MaskLine delay={0.1}>
          <span>
            Full-Stack
            <span className="pill-img mx-2 md:mx-4">
              <img src="/images/about.jpg" alt="" aria-hidden className="scale-110" />
            </span>
          </span>
        </MaskLine>
        <MaskLine delay={0.22}>
          <span className="serif-i font-normal">Software</span>
        </MaskLine>
        <MaskLine delay={0.34}>
          <span>Engineer</span>
        </MaskLine>
      </h1>

      <div className="mt-10 grid grid-cols-12 items-start gap-x-8 gap-y-8 md:mt-14">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Reveal delay={0.5} y={10}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-2 animate-pulse rounded-full bg-accent" />
                <span className="mono-label text-ink/60 uppercase tracking-widest">Available now</span>
              </div>
              <div className="space-y-1">
                <p className="mono-label text-ink/30">Location</p>
                <p className="text-sm font-medium">Ahmedabad, India</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-6">
          <Reveal delay={0.6}>
            <p className="text-balance text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.5] tracking-tight text-ink/80">
              Full-stack Java engineer building high-performance products with{" "}
              <span className="font-semibold text-ink">Java, Spring Boot</span> and React.
              Currently engineering AWS cloud-monitoring tools at{" "}
              <span className="serif-i text-accent/90">NetAI</span>.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={goToWork} className="btn btn--primary group">
                View Work
                <ArrowDown className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
              </button>
              <a href={CONTACT.emailHref} className="btn group">
                Get in touch
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal y={60} delay={0.8} className="mt-10 md:mt-14">
        <div className="group relative">
          <ParallaxImage
            src="/images/hero.jpg"
            alt="Sunny Solanki — Full-Stack Java Engineer"
            priority
            speed={10}
            sizes="(min-width: 1560px) 1320px, 92vw"
            className="aspect-[16/10] max-h-[560px] shadow-2xl shadow-ink/5 sm:aspect-[16/8] lg:aspect-[16/8]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-inset ring-ink/5" />

          <div className="mt-8 flex flex-col justify-between gap-6 px-1 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <span className="mono-label text-ink/40">Portfolio Volume 01 — 2026</span>
              <span className="hidden h-px w-12 bg-ink/10 sm:block" />
              <span className="mono-label text-ink/40">Focused on Scale & Performance</span>
            </div>
            <span className="mono-label hidden items-center gap-3 text-ink/30 italic sm:flex">
              Scroll to begin
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowDown className="size-3.5" />
              </motion.span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
