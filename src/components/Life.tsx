import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const STACK = [
  { y: 0, r: -8 },
  { y: 8, r: 0 },
  { y: 16, r: 8 },
];

export default function Life() {
  return (
    <section className="container-x section-pad overflow-hidden">
      <div className="grid grid-cols-12 items-start gap-8 lg:gap-12">
        {/* Left Side: "Off the clock" personal card */}
        <Reveal className="col-span-12 lg:col-span-5" y={30}>
          <div className="card-surface group relative overflow-hidden rounded-[40px] p-8 md:p-10">
            <h2 className="mb-8 text-[clamp(3rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-tighter">
              Off the
              <br />
              clock
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">
                →
              </span>
            </h2>

            {/* Stacked photos — spring lift on hover */}
            <div className="relative mb-8 ml-2 h-56">
              {[1, 2, 3].map((i) => {
                const base = STACK[i - 1];
                return (
                  <motion.div
                    key={i}
                    initial={{ y: base.y, rotate: base.r }}
                    animate={{ y: base.y, rotate: base.r }}
                    whileHover={{ y: base.y - 18, rotate: 0, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute left-0 top-0 h-48 w-40 cursor-pointer overflow-hidden rounded-2xl border-4 border-white shadow-lg"
                    style={{ zIndex: i, left: (i - 1) * 30 }}
                  >
                    <img
                      src={`/images/life-${i}.jpg`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="mb-4 flex items-center justify-between border-t border-ink/5 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-ink/40">
                <Clock className="size-4" />
                <span>~finish in 2 min</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-ink/40">
                <Star className="size-4 fill-ink/10" />
                <span>Medium Level</span>
              </div>
            </div>

            <p className="text-xl font-medium leading-relaxed text-ink/60">
              A builder at heart — happiest shipping code, modding a mechanical keyboard, or climbing the ranked ladder.
            </p>
          </div>
        </Reveal>

        {/* Right Side: Editorial Text & Mini Gallery */}
        <div className="col-span-12 pt-2 lg:col-span-7 lg:pt-6">
          <Reveal delay={0.2}>
            <div className="max-w-2xl space-y-5">
              <p className="text-[19px] font-medium leading-[1.5] text-ink/50">
                Engineering, for me, is more than shipping features &mdash; it&rsquo;s about building
                systems that are reliable, maintainable, and genuinely solve the problem. I sweat the
                details: clean architecture, fast interfaces, and code the next person can actually read.
              </p>
              <p className="text-[19px] font-medium leading-[1.5] text-ink/50">
                Away from the editor I&rsquo;m usually tinkering &mdash; modding a keyboard, chasing a
                rank, or training at the gym. Same loop that pulls me through code: understand it deeply,
                iterate, and build something people rely on.
              </p>
            </div>
          </Reveal>

          {/* Mini Gallery Row */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Reveal key={i} delay={0.1 * i} y={20}>
                <div className="group aspect-[4/5] overflow-hidden rounded-[24px]">
                  <img
                    src={`/images/life-${i}.jpg`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} y={20}>
            <h3 className="mt-12 text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-none tracking-tighter">
              Life in nutshell
            </h3>
          </Reveal>
        </div>
      </div>

      {/* Massive Landscape Image Below */}
      <Reveal className="mt-12 md:mt-16" y={40}>
        <div className="group relative aspect-[21/7] max-h-[400px] w-full overflow-hidden rounded-[32px]">
          <img
            src="/images/life-3.jpg"
            alt="Life Landscape"
            className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
      </Reveal>
    </section>
  );
}
