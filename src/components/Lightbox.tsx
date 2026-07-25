import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "../lib/lenis";
import { EASE } from "./Reveal";
import { cn } from "../utils/cn";

type LightboxProps = {
  open: boolean;
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  title?: string;
};

/**
 * Full-screen image zoom overlay. Click a project screenshot to open it here at
 * full size; navigate with the arrows / arrow keys, close with the ✕, a click on
 * the backdrop, or Escape. Background scroll (Lenis) is frozen while it's open.
 */
export default function Lightbox({
  open,
  images,
  index,
  onIndexChange,
  onClose,
  title,
}: LightboxProps) {
  const lenis = useLenis();
  const total = images.length;

  const go = (dir: number) => onIndexChange((index + dir + total) % total);

  // Freeze background scroll + wire keyboard controls only while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && total > 1) go(1);
      else if (e.key === "ArrowLeft" && total > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, total]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} — image viewer` : "Image viewer"}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 md:right-6 md:top-6"
          >
            <X className="size-5" />
          </button>

          {/* Counter + title */}
          <div className="absolute left-4 top-5 z-10 flex items-center gap-3 text-white/70 md:left-8 md:top-8">
            {title && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                {title}
              </span>
            )}
            {total > 1 && (
              <span className="mono-label text-white/50">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 md:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 md:right-6"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Image — object-contain so the whole screenshot is visible */}
          <motion.img
            key={index}
            src={images[index]}
            alt={title ? `${title} screenshot ${index + 1}` : `Screenshot ${index + 1}`}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
          />

          {/* Dots */}
          {total > 1 && (
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-8">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndexChange(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/60",
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
