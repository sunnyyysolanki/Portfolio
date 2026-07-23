import { useEffect, useRef } from "react";

const SHARD_CLIPS = [
  "polygon(50% 0%, 100% 100%, 0% 100%)",
  "polygon(0% 0%, 100% 30%, 70% 100%, 10% 80%)",
  "polygon(20% 0%, 100% 20%, 80% 100%, 0% 70%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "polygon(0% 0%, 100% 0%, 60% 100%)",
];

const enabled = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(pointer: coarse)").matches;

/**
 * A glass-prism cursor: a clip-path arrow with a frosted, refractive fill that
 * eases behind the pointer, and — on every press — a glass shockwave plus a
 * burst of crystal shards that scatter from the click via the Web Animations
 * API. Touch / reduced-motion visitors get a normal arrow (the layer never
 * mounts), and nothing here intercepts pointer events.
 */
export default function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled()) return;
    const root = document.documentElement;
    root.classList.add("glass-on");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: -100, y: -100 };
    let scale = 1;
    let hoverScale = 1;
    let visible = false;
    let raf = 0;

    const spawn = (x: number, y: number) => {
      const layer = layerRef.current;
      if (!layer) return;

      const ring = document.createElement("div");
      ring.className = "glass-ring";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = "62px";
      ring.style.height = "62px";
      layer.appendChild(ring);
      const ringAnim = ring.animate(
        [
          { transform: "translate(-50%,-50%) scale(0.25)", opacity: 0.9 },
          { transform: "translate(-50%,-50%) scale(1.9)", opacity: 0 },
        ],
        { duration: 620, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" },
      );
      ringAnim.onfinish = () => ring.remove();

      const n = 14;
      for (let i = 0; i < n; i++) {
        const el = document.createElement("div");
        el.className = "glass-shard";
        const size = 7 + Math.random() * 10;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.clipPath = SHARD_CLIPS[(Math.random() * SHARD_CLIPS.length) | 0];
        // Keep the refraction in the portfolio's warm orange spectrum.
        el.style.setProperty("--h", String(12 + ((Math.random() * 22) | 0)));
        layer.appendChild(el);

        const ang = Math.random() * Math.PI * 2;
        const dist = 34 + Math.random() * 92;
        const tx = Math.cos(ang) * dist;
        const ty = Math.sin(ang) * dist - 18;
        const rot = (Math.random() - 0.5) * 540;
        const shardAnim = el.animate(
          [
            { transform: "translate(-50%,-50%) rotate(0deg) scale(1)", opacity: 0.95 },
            {
              transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(0.12)`,
              opacity: 0,
            },
          ],
          {
            duration: 620 + Math.random() * 380,
            easing: "cubic-bezier(0.18,0.7,0.2,1)",
            fill: "forwards",
          },
        );
        shardAnim.onfinish = () => el.remove();
      }
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const interactive = Boolean(
        (e.target as HTMLElement | null)?.closest("a, button, [role='button']"),
      );
      // A restrained lift keeps the arrow readable without changing its hotspot.
      hoverScale = interactive ? 1.1 : 1;
      if (cursorRef.current) cursorRef.current.dataset.hover = String(interactive);
      if (!visible && cursorRef.current) {
        visible = true;
        cur.x = pointer.x;
        cur.y = pointer.y;
        cursorRef.current.style.opacity = "1";
      }
    };
    const onDown = (e: PointerEvent) => {
      // Compress toward the top-left hotspot, then ease back to the hover scale.
      // Because transform-origin is 0 0, the visible tip stays on the click.
      scale = hoverScale * 0.86;
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      cur.x += (pointer.x - cur.x) * 0.68;
      cur.y += (pointer.y - cur.y) * 0.68;
      scale += (hoverScale - scale) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) scale(${scale.toFixed(
          3,
        )})`;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      root.classList.remove("glass-on");
      if (layerRef.current) layerRef.current.innerHTML = "";
    };
  }, []);

  if (!enabled()) return null;

  return (
    <>
      <div ref={layerRef} className="glass-layer" aria-hidden />
      <div ref={cursorRef} className="cursor-glass" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
