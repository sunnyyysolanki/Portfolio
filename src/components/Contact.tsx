import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { CONTACT, RESUME_PATH } from "../lib/data";
import { useLenis } from "../lib/lenis";
import { useIST } from "../lib/hooks";
import { MaskLine, Reveal } from "./Reveal";

const ROWS = [
  { key: "LinkedIn", value: CONTACT.linkedinLabel, href: CONTACT.linkedin },
  { key: "GitHub", value: CONTACT.githubLabel, href: CONTACT.github },
  { key: "LeetCode", value: CONTACT.leetcodeLabel, href: CONTACT.leetcode },
  // Carries the résumé for anyone who has scrolled past the hero — the nav no longer
  // holds a copy, and this is the last section before the footer.
  { key: "Résumé", value: "Download PDF", href: RESUME_PATH },
  { key: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { key: "Location", value: CONTACT.location, href: null },
];

export default function Contact() {
  const lenis = useLenis();
  const ist = useIST();

  return (
    <section id="contact" className="container-x section-pad">
      <Reveal y={80}>
        <div className="relative overflow-hidden rounded-[40px] bg-ink text-paper">
          {/* faint watermark */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="pointer-events-none absolute -right-16 -top-16 hidden md:block"
            aria-hidden
          >
            <AsteriskMark />
          </motion.span>

          <div className="relative p-8 md:p-14 lg:p-20">
            {/* meta row */}
            <div className="flex items-center justify-between gap-6">
              <span className="mono-label text-paper/40">
                <span className="text-accent">(</span>05 — Contact<span className="text-accent">)</span>
              </span>
              <span className="mono-label hidden items-center gap-2.5 text-paper/50 sm:flex">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                Open to opportunities — 2026
              </span>
            </div>

            {/* headline */}
            <h2 className="h-display mt-16 md:mt-24">
              <MaskLine delay={0.05}>Let&rsquo;s build</MaskLine>
              <MaskLine delay={0.13}>
                <span className="serif-i font-normal">something</span>
              </MaskLine>
              <MaskLine delay={0.21}>
                <span>
                  worth shipping<span className="text-accent">.</span>
                </span>
              </MaskLine>
            </h2>

            {/* email + rows */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-14 md:mt-24">
              <div className="col-span-12 lg:col-span-7">
                <a
                  href={CONTACT.emailHref}
                  className="group inline-flex items-center gap-4 break-all text-[clamp(1.25rem,2.4vw,2.1rem)] font-medium tracking-tight"
                >
                  <span className="link-line">{CONTACT.email}</span>
                  <ArrowUpRight className="size-6 shrink-0 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-paper/50">
                  Previously shipped at NetAI, always up for a good problem. Whether it&rsquo;s a
                  role, a project, or just a hard bug worth talking about — the inbox is open.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <ul className="border-y border-paper/10">
                  {ROWS.map((row) => (
                    <li key={row.key} className="border-b border-paper/10 last:border-b-0">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-6 py-5"
                        >
                          <span className="mono-label text-paper/40">{row.key}</span>
                          <span className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
                            <span className="link-line">{row.value}</span>
                            <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-between gap-6 py-5">
                          <span className="mono-label text-paper/40">{row.key}</span>
                          <span className="text-[15px] font-medium tracking-tight">{row.value}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* footer of the card */}
            <div className="mt-20 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-paper/10 pt-8 md:mt-28">
              <span className="mono-label text-paper/40">
                © 2026 Sunny Solanki — All rights reserved
              </span>
              <span className="mono-label hidden text-paper/40 lg:block">
                23.02°N / 72.57°E — IST {ist}
              </span>
              <button
                onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
                className="group mono-label flex items-center gap-4 text-paper/50 transition-colors duration-300 hover:text-paper"
              >
                Back to top
                <span className="grid size-11 place-items-center rounded-full border border-paper/20 transition-all duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function AsteriskMark() {
  return (
    <svg width="420" height="420" viewBox="0 0 24 24" fill="none" className="text-paper/[0.04]">
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
