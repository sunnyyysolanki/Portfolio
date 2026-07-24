import { useEffect, useRef } from "react";

const enabled = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(pointer: coarse)").matches;

/**
 * Minimal dot + ring cursor.
 * - A small accent dot tracks the pointer almost 1:1 (the true hotspot).
 * - A larger outlined ring trails with easing and, over interactive elements,
 *   expands and fills — a clean, premium interaction cue.
 * - On press the ring pulses inward.
 * Touch / reduced-motion visitors keep the native cursor (nothing mounts).
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled()) return;
    const root = document.documentElement;
    root.classList.add("cursor-on");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: pointer.x, y: pointer.y };
    const ring = { x: pointer.x, y: pointer.y };
    let ringScale = 1;
    let targetScale = 1;
    let pressed = 0; // eases 0 -> 1 on press
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const interactive = Boolean(
        (e.target as HTMLElement | null)?.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
        ),
      );
      targetScale = interactive ? 1.9 : 1;
      if (ringRef.current)
        ringRef.current.dataset.hover = String(interactive);
      if (!visible) {
        visible = true;
        dot.x = ring.x = pointer.x;
        dot.y = ring.y = pointer.y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };
    const onDown = () => {
      pressed = 1;
    };
    const onUp = () => {
      pressed = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Dot tracks almost instantly; ring trails for a soft lag.
      dot.x += (pointer.x - dot.x) * 0.9;
      dot.y += (pointer.y - dot.y) * 0.9;
      ring.x += (pointer.x - ring.x) * 0.18;
      ring.y += (pointer.y - ring.y) * 0.18;

      // Press compresses the ring a touch under the hover/base scale.
      const press = pressed ? 0.82 : 1;
      ringScale += (targetScale * press - ringScale) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.classList.remove("cursor-on");
    };
  }, []);

  if (!enabled()) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
