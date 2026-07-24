import { ArrowLeft, Download, ExternalLink } from "lucide-react";

// The actual Full-Stack Java résumé PDF, served from /public.
const RESUME_PDF = "/Sunny_Solanki_FullStack_Resume.pdf";
const RESUME_FILENAME = "Sunny_Solanki_FullStack_Resume.pdf";

export default function Resume() {
  const back = () => {
    // Drop the hash so the SPA returns to the portfolio.
    window.location.hash = "";
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#E7E4DE] text-ink">
      {/* Toolbar */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button onClick={back} className="flex items-center gap-2.5" aria-label="Back to portfolio">
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
              <span className="font-serif text-[15px] italic leading-none">S</span>
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em]">
              Sunny Solanki
            </span>
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={back} className="btn group">
              <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-0.5" />
              Back to site
            </button>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noreferrer"
              className="btn group hidden sm:inline-flex"
            >
              Open
              <ExternalLink className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={RESUME_PDF} download={RESUME_FILENAME} className="btn btn--primary group">
              <Download className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
              Download PDF
            </a>
          </div>
        </div>
      </header>

      {/* The actual PDF, shown exactly, in a framed sheet */}
      <main className="flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto max-w-[900px]">
          <div className="relative overflow-hidden rounded-[20px] bg-white shadow-[0_40px_80px_-40px_rgba(17,17,17,0.35)]">
            {/* Fallback sits behind the iframe; the PDF paints over it on
                browsers that render inline (most desktops). On mobile / no
                inline PDF support, this stays visible. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-12 text-center">
              <p className="text-sm text-ink/50">Preview the résumé below, or</p>
              <a href={RESUME_PDF} download={RESUME_FILENAME} className="btn btn--primary">
                <Download className="size-3.5" />
                Download résumé (PDF)
              </a>
            </div>
            <iframe
              src={`${RESUME_PDF}#view=FitH`}
              title="Sunny Solanki — Full-Stack Java résumé"
              className="relative h-[calc(100vh-9rem)] min-h-[600px] w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
