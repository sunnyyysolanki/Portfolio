import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { Reveal } from "./Reveal";

/** Full-width editorial pull-quote between Experience and Capabilities. */
export default function Quote() {
  return (
    <section className="container-x section-pad">
      <Reveal className="mx-auto max-w-4xl text-center">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          className="inline-flex"
        >
          <Asterisk className="size-7 text-accent" strokeWidth={1.75} />
        </motion.span>

        <blockquote className="mt-10 font-serif text-[clamp(1.7rem,3.5vw,3.25rem)] italic leading-[1.18] tracking-[-0.01em] text-ink">
          &ldquo;Comfortable owning features end to end — from REST APIs and database design through
          responsive front-end delivery.&rdquo;
        </blockquote>

        <p className="mono-label mt-10 text-ink/40">( Summary — Résumé, 2026 )</p>
      </Reveal>
    </section>
  );
}
