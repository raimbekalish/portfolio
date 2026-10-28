import type { ReactNode } from "react";
import { evidence, type FaultlineEvidence } from "../../content/faultline";
import { EvidenceTag as Tag } from "../shared/EvidenceTag";

/** How a figure is known: "Recorded run", "Verified in source" and so on. */
export function EvidenceTag({ kind }: { kind: FaultlineEvidence }) {
  return <Tag kind={evidence[kind]} />;
}

/**
 * A chapter of the Faultline page. Its header is a measuring rule: the chapter's number, a run of
 * millimetre ticks and the kicker, then the title and lede across the width.
 */
export function Chapter({
  id,
  n,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  n: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="fl-chapter" id={id} aria-labelledby={`${id}-title`}>
      <header className="fl-chapter-head">
        <p className="fl-rule">
          <span className="fl-rule-n">{n}</span>
          <span className="fl-rule-ticks" aria-hidden="true" />
          <span className="fl-rule-label">{kicker}</span>
        </p>
        <h2 className="fl-chapter-title" id={`${id}-title`}>{title}</h2>
        {lede && <p className="fl-chapter-lede">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

/** A labelled source link at the foot of a figure or column. */
export function Cite({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="fl-cite" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
