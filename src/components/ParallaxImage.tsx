import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { cn } from "../utils/cn";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How far the image drifts while scrolling, in percent. */
  speed?: number;
  priority?: boolean;
  sizes?: string;
  zoom?: boolean;
};

/**
 * Image with a scrub-driven parallax drift (GSAP ScrollTrigger) and an
 * optional group-hover zoom of 1.03. The wrapper bleeds 8% on every side
 * so the drift never exposes an edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  speed = 6,
  priority = false,
  sizes,
  zoom = true,
}: ParallaxImageProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !drift.current || speed === 0) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        drift.current,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden rounded-[36px]", className)}>
      <div ref={drift} className="absolute inset-[-8%] will-change-transform">
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={cn(
            "h-full w-full object-cover",
            zoom &&
              "transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
          )}
        />
      </div>
    </div>
  );
}
