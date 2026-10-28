import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { workCount, workNumber, type workOrder } from "./structure";

/** A link to another site, opened in a new tab and marked with the page's arrow. */
export function OutLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children} <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
    </a>
  );
}

/**
 * A link to a project's case study. The case study opens in this tab, so the project's section is
 * marked in the address first; the browser's Back button then returns to it, not to the top.
 */
export function CaseStudyLink({ href, section, className, children }: { href: string; section: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} onClick={() => history.replaceState(history.state, "", `#${section}`)}>
      {children}
    </a>
  );
}

/** The project's place in the work sequence: shows "01 / 04", reads "Project 1 of 4". */
export function WorkIndex({ id }: { id: (typeof workOrder)[number] }) {
  const n = workNumber(id);
  return (
    <>
      <span aria-hidden="true">{n} / {workCount}</span>
      <span className="sp-sr">Project {Number(n)} of {Number(workCount)}</span>
    </>
  );
}
