import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const NUMERIC = /^([^\d.-]*)([\d.]+)(.*)$/;

function parse(value: string) {
  const m = value.match(NUMERIC);
  if (!m) return null;
  const decimals = (m[2].split(".")[1] || "").length;
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3], decimals };
}

function zeroForm(value: string) {
  const p = parse(value);
  return p ? `${p.prefix}${(0).toFixed(p.decimals)}${p.suffix}` : value;
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Tweaks a numeric string from 0 → target on first view, preserving any
 * leading prefix (`~`) and trailing suffix (`%`). Non-numeric strings pass
 * through untouched. Honours prefers-reduced-motion.
 */
export default function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [display, setDisplay] = useState(() => zeroForm(value));

  useEffect(() => {
    const p = parse(value);
    if (!p) {
      setDisplay(value);
      return;
    }
    if (prefersReduced()) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(zeroForm(value));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${p.prefix}${(p.target * eased).toFixed(p.decimals)}${p.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(`${p.prefix}${p.target.toFixed(p.decimals)}${p.suffix}`);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}
