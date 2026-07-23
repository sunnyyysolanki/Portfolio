import { Asterisk } from "lucide-react";
import { MARQUEE } from "../lib/data";
import { cn } from "../utils/cn";

/** Slow editorial ticker of core stack items — alternating sans / serif-italic. */
export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section
      aria-hidden
      className="marquee mt-20 select-none overflow-hidden border-y border-ink/10 py-6 md:mt-28 md:py-8"
    >
      <div className="marquee-track flex w-max items-center gap-8 pr-8 md:gap-14 md:pr-14">
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-14">
            <span
              className={cn(
                "whitespace-nowrap text-2xl tracking-tight text-ink/85 md:text-4xl",
                i % 2 === 1 ? "serif-i" : "font-medium",
              )}
            >
              {word}
            </span>
            <Asterisk className="size-4 shrink-0 text-accent/80 md:size-5" strokeWidth={1.75} />
          </span>
        ))}
      </div>
    </section>
  );
}
