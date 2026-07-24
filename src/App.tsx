import { useEffect, useState } from "react";
import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { LenisContext } from "./lib/lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Life from "./components/Life";
import Works from "./components/Works";
import Experience from "./components/Experience";
import Quote from "./components/Quote";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudy from "./components/CaseStudy";
import Resume from "./components/Resume";
import GlassCursor from "./components/GlassCursor";
import { PROJECTS, WORK_EXPERIENCE } from "./lib/data";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Don't run Lenis on the résumé page — it's a plain, natively-scrollable
    // document (and must print cleanly). Running Lenis there and calling
    // .stop() froze the page (Lenis intercepts the wheel), so we skip it.
    if (window.location.hash === "#resume") {
      setLenis(null);
      return;
    }
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 1400);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      gsap.ticker.remove(tick);
      instance.destroy();
    };
  }, [hash]);

  // Pointer FX — a warm sheen + glowing edge that chase the cursor across every
  // card and framed image, plus a magnetic pull on circular tokens and primary
  // CTAs. One throttled listener writes CSS custom properties; the native cursor
  // stays untouched, and reduced-motion visitors get none of it.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.documentElement;
    root.classList.add("pointer-fx");
    const CARD = ".rounded-\\[32px\\], .rounded-\\[36px\\], .rounded-\\[40px\\], .card-surface";
    const MAG = ".btn-icon, .btn--primary";
    let raf = 0;
    let lastMag: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        if (!target) return;
        const card = target.closest(CARD) as HTMLElement | null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        const mag = target.closest(MAG) as HTMLElement | null;
        if (mag !== lastMag) {
          if (lastMag) lastMag.style.setProperty("translate", "");
          lastMag = mag;
        }
        if (mag) {
          const r = mag.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.28;
          const dy = (e.clientY - r.top - r.height / 2) * 0.28;
          mag.style.setProperty("translate", `${dx.toFixed(1)}px ${dy.toFixed(1)}px`);
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (lastMag) lastMag.style.setProperty("translate", "");
      root.classList.remove("pointer-fx");
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const isResume = hash === "#resume";
  const caseStudyId = hash.startsWith("#case-study/") ? hash.split("/")[1] : null;
  const caseStudy = [WORK_EXPERIENCE, ...PROJECTS].find((p) => p.id === caseStudyId);

  useEffect(() => {
    if (isResume) {
      // Lenis isn't created on this route, so native scroll + print just work.
      window.scrollTo(0, 0);
      document.title = "Résumé — Sunny Solanki";
    } else if (caseStudy) {
      lenis?.start();
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      document.title = `${caseStudy.title} — Case Study | Sunny Solanki`;
    } else {
      lenis?.start();
      document.title = "Sunny Solanki — Full-Stack Software Engineer";
      if (hash && document.querySelector(hash)) {
        window.setTimeout(() => {
          if (lenis) lenis.scrollTo(hash, { duration: 1.2 });
          else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(t);
  }, [isResume, caseStudy, hash, lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <LenisContext.Provider value={lenis}>
        <motion.div style={{ scaleX }} className="progress-bar" aria-hidden />
        <div className="grain" aria-hidden />
        {!isResume && <GlassCursor />}
        {isResume ? (
          <Resume />
        ) : caseStudy ? (
          <CaseStudy project={caseStudy} />
        ) : (
          <>
            <Nav />
            <main>
              <Hero />
              <Marquee />
              <About />
              <Life />
              <Works />
              <Experience />
              <Quote />
              <Capabilities />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </LenisContext.Provider>
    </MotionConfig>
  );
}
