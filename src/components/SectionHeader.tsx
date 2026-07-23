import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

type SectionHeaderProps = {
  index: string;
  label: string;
  note?: string;
  dark?: boolean;
};

/** Numbered hairline header that opens every section — "(01) — Label ......... note". */
export default function SectionHeader({ index, label, note, dark = false }: SectionHeaderProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex items-center justify-between gap-6 border-t pt-5",
          dark ? "border-paper/15" : "border-ink/10",
        )}
      >
        <p className={cn("mono-label flex items-center gap-3", dark ? "text-paper/45" : "text-ink/45")}>
          <span className="text-accent">({index})</span>
          <span>{label}</span>
        </p>
        {note && (
          <p className={cn("mono-label hidden sm:block", dark ? "text-paper/35" : "text-ink/35")}>
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}
