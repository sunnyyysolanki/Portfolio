import { useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import type { Project } from "../lib/data";
import { Reveal } from "./Reveal";
import Lightbox from "./Lightbox";
import { cn } from "../utils/cn";

export default function ProjectCard({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  // Use a soft theme color based on the project index
  const bgColors = ["bg-[#FDF1F8]", "bg-[#F1F6FD]", "bg-[#FDF7F1]", "bg-[#F1FDF6]", "bg-[#F7F1FD]"];
  const bgColor = bgColors[parseInt(project.index) - 1] || "bg-card";

  return (
    <Reveal className="col-span-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 group">
        {/* Left Side: Information Card */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-[#F8F8F6] rounded-[32px] p-8 lg:p-10 flex flex-col justify-between border border-ink/[0.03]">
          <div>
            <div className="flex items-center justify-between mb-4">
              {project.logo ? (
                <img src={project.logo} alt="" className="size-8 rounded-lg" />
              ) : (
                <div className="size-8 rounded-lg bg-ink/5" />
              )}
              {project.badge && (
                <span className="inline-flex items-center rounded-full bg-accent/5 px-3 py-1 text-[9px] font-bold tracking-tighter text-accent uppercase border border-accent/10">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.15] mb-2 text-balance">
              {project.title}
            </h3>
            <p className="text-ink/40 font-medium text-[14px] lg:text-[15px] mb-8">
              {project.role}
            </p>
            
            <p className="text-[15px] lg:text-[16px] leading-[1.6] text-ink/60 mb-8 max-w-[32ch]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full text-[11px] font-medium border border-ink/10 text-ink/50 bg-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`#case-study/${project.id}`}
              className="inline-flex items-center gap-2 text-ink/40 font-semibold text-[14px] uppercase tracking-wider hover:text-ink transition-colors group/link"
            >
              Read case study
              <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-accent font-semibold text-[14px] uppercase tracking-wider hover:opacity-70 transition-opacity group/live"
              >
                Live demo
                <ArrowUpRight className="size-3.5 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Visual Showcase Card */}
        <div className={cn("col-span-12 md:col-span-7 lg:col-span-8 rounded-[32px] overflow-hidden relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center p-6 lg:p-14 transition-all duration-700", bgColor)}>
           {/* Subtle gradient glow */}
           <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)]" />
           
           {/* Browser-like Frame */}
           <div className="relative w-full aspect-[16/10] max-h-[420px] rounded-xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-[1.02] border border-white/40 bg-white/80 p-1">
              {/* Browser toolbar */}
              <div className="h-6 flex items-center gap-1.5 px-3 border-b border-black/5 mb-1 bg-white/50 backdrop-blur-sm">
                <div className="size-1.5 rounded-full bg-black/10" />
                <div className="size-1.5 rounded-full bg-black/10" />
                <div className="size-1.5 rounded-full bg-black/10" />
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label={`Zoom ${project.title} screenshot`}
                className="group/zoom relative block w-full h-[calc(100%-1.75rem)] rounded-lg overflow-hidden cursor-zoom-in"
              >
                <img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500"
                />
                {/* Zoom affordance on hover */}
                <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-ink/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/zoom:opacity-100">
                  <Expand className="size-4" />
                </span>
              </button>
           </div>

           {/* Carousel Controls */}
           {project.images.length > 1 && (
             <>
               <div 
                 onClick={prevImage}
                 className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 hidden md:flex size-10 lg:size-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl border border-white/50 text-ink/80 cursor-pointer hover:bg-white hover:text-ink hover:scale-110 transition-all shadow-sm z-10"
               >
                  <span className="text-xl rotate-180">→</span>
               </div>
               <div 
                 onClick={nextImage}
                 className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden md:flex size-10 lg:size-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl border border-white/50 text-ink/80 cursor-pointer hover:bg-white hover:text-ink hover:scale-110 transition-all shadow-sm z-10"
               >
                  <span className="text-xl">→</span>
               </div>
             </>
           )}

           {/* Pagination dots */}
           {project.images.length > 1 && (
             <div className="absolute bottom-6 flex gap-2 z-10">
                {project.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "size-1.5 rounded-full transition-all cursor-pointer",
                      currentImageIndex === idx ? "bg-ink/60 scale-125" : "bg-ink/20 hover:bg-ink/40"
                    )} 
                  />
                ))}
             </div>
           )}
        </div>
      </div>

      <Lightbox
        open={zoomOpen}
        images={project.images}
        index={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        onClose={() => setZoomOpen(false)}
        title={project.title}
      />
    </Reveal>
  );
}
