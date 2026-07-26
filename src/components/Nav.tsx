import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Download, Plus } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../lib/data";
import { useLenis } from "../lib/lenis";
import { EASE } from "./Reveal";
import { cn } from "../utils/cn";

/** GitHub Octocat mark — inlined so we don't depend on lucide brand icons. */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export default function Nav() {
  const lenis = useLenis();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const lastY = useRef(0);
  const sectionEls = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionEls.current = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as HTMLElement[];
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setHidden(y > 160 && y > lastY.current);
    lastY.current = y;

    const probe = y + 140;
    let current = "";
    for (const el of sectionEls.current) {
      if (el.getBoundingClientRect().top + window.scrollY <= probe) current = `#${el.id}`;
    }
    setActiveHref(current);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (target: string | number) => {
    setOpen(false);
    lenis?.start();
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(target as never, { duration: 1.5 });
      else if (typeof target === "string")
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: target, behavior: "smooth" });
    });
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <div className="container-x flex items-center justify-between gap-4 pt-5">
          {/* Left — bare brand lockup; gains a capsule only after scroll. */}
          <button
            onClick={() => go(0)}
            aria-label="Back to top"
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-full transition-all duration-500",
              scrolled
                ? "border border-ink/10 bg-paper/70 px-3 py-2 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.45)] backdrop-blur-md"
                : "border border-transparent",
            )}
          >
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
              <span className="font-serif text-[15px] italic leading-none">S</span>
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em]">
              Sunny Solanki
            </span>
          </button>

          {/* Center — segmented control pill with a raised active chip. */}
          <nav className="nav-seg hidden xl:flex" data-scrolled={scrolled}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                data-active={activeHref === link.href}
                aria-current={activeHref === link.href ? "true" : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right — GitHub token + Resume pill + Contact pill on desktop;
              the plus (menu) appears on mobile only. */}
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub"
              className="btn-icon hidden xl:grid"
            >
              <span className="inline-flex">
                <GitHubIcon className="size-[18px]" />
              </span>
            </a>
            <a
              href="/Sunny_Solanki_Java_Full_Stack_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn hidden xl:inline-flex"
            >
              <Download className="size-3.5" />
              Resume
            </a>
            <a href={CONTACT.emailHref} className="btn hidden xl:inline-flex">
              Get in touch
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="btn-icon xl:hidden"
            >
              <Plus className={cn("transition-transform duration-500", open && "rotate-45")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="fixed inset-0 z-[55] flex min-h-dvh flex-col bg-paper"
          >
            <div className="container-x flex flex-1 flex-col justify-between pt-32 pb-10">
              <ul className="border-t border-ink/10">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: EASE }}
                    className="border-b border-ink/10"
                  >
                    <button
                      onClick={() => go(link.href)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="h-role">{link.label}</span>
                      <ArrowUpRight className="size-6 text-ink/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile-only actions so GitHub + Resume stay reachable. */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <a
                  href="/Sunny_Solanki_Java_Full_Stack_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  <Download className="size-3.5" />
                  Resume
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                  className="btn-icon"
                >
                  <span className="inline-flex">
                    <GitHubIcon className="size-[18px]" />
                  </span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 flex items-center justify-between"
              >
                <a href={CONTACT.emailHref} className="mono-label link-line text-ink/60">
                  {CONTACT.email}
                </a>
                <span className="mono-label text-ink/40">© 2026</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
