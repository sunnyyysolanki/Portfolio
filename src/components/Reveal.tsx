import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 30, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type MaskLineProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
};

export function MaskLine({ children, className, innerClassName, delay = 0 }: MaskLineProps) {
  return (
    <span
      className={cn(
        "block overflow-hidden pt-[0.25em] pb-[0.12em] -mt-[0.25em] -mb-[0.12em]",
        className,
      )}
    >
      <motion.span
        className={cn("block will-change-transform", innerClassName)}
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
