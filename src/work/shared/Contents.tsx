import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, List, X } from "lucide-react";
import { useCurrentSection } from "../../signal-path/hooks";
import { OutLink } from "../../signal-path/ui";

export type Chapter = { id: string; label: string; n?: string };

type Props = {
  chapters: readonly Chapter[];
  /** The way back to the project's section of the portfolio. */
  back: string;
  source: { href: string; label: string };
};

/**
 * The site bar's Contents menu: every chapter, with the one on screen marked, plus the way back and
 * the source. Closes on Escape, on an outside press and on a choice. The same chapters are always
 * listed in the page's overview, so nothing depends on this menu.
 */
export default function Contents({ chapters, back, source }: Props) {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => chapters.map((c) => c.id), [chapters]);
  const current = useCurrentSection(ids);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const label = chapters.find((c) => c.id === current)?.label;
  const position = ids.indexOf(current ?? "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPress = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [open]);

  return (
    <div className="cs-contents" data-open={open}>
      <button
        type="button"
        className="cs-contents-button"
        ref={button}
        aria-expanded={open}
        aria-controls="cs-contents-panel"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X aria-hidden="true" strokeWidth={1.75} /> : <List aria-hidden="true" strokeWidth={1.75} />}
        Contents
        {label && <span className="cs-contents-current" aria-hidden="true">{label}</span>}
        {position >= 0 && <span className="cs-contents-step" aria-hidden="true">{position + 1}/{chapters.length}</span>}
      </button>
      <div className="cs-contents-panel" id="cs-contents-panel" ref={panel} hidden={!open}>
        <p className="sp-kicker">On this page</p>
        <ol className="cs-contents-list">
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={current === c.id ? "true" : undefined} onClick={() => setOpen(false)}>
                <span className="cs-contents-n" aria-hidden="true">{c.n}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="cs-contents-links">
          <a href={back}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} /> Back to the portfolio
          </a>
          <OutLink href={source.href}>{source.label}</OutLink>
        </p>
      </div>
    </div>
  );
}
