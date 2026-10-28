import type { ReactNode } from "react";
import { evidence, type EvidenceKind } from "../../content/reproseed";
import { EvidenceTag as Tag } from "../shared/EvidenceTag";

/** How a figure or excerpt is known: "Recorded output", "Conceptual illustration" and so on. */
export function EvidenceTag({ kind }: { kind: EvidenceKind }) {
  return <Tag kind={evidence[kind]} />;
}

/** A numbered chapter: the number and name in the margin, the content beside them. */
export function Chapter({ id, n, name, title, children }: { id: string; n: string; name: string; title: string; children: ReactNode }) {
  return (
    <section className="rs-chapter" id={id} aria-labelledby={`${id}-title`}>
      <header className="rs-chapter-head">
        <p className="rs-chapter-n" aria-hidden="true">{n}</p>
        <p className="sp-kicker">{name}</p>
        <h2 className="rs-chapter-title" id={`${id}-title`}>
          <span className="sp-sr">{name}: </span>
          {title}
        </h2>
      </header>
      <div className="rs-chapter-body">{children}</div>
    </section>
  );
}

/** Recorded terminal output, line for line. */
export function Terminal({ command, lines, label, status }: { command: string; lines: string[]; label: string; status?: "fail" | "pass" }) {
  return (
    <figure className="rs-term" data-status={status}>
      <figcaption className="rs-term-head">
        <span>{label}</span>
        <EvidenceTag kind="recorded" />
      </figcaption>
      <pre>
        <code>
          <span className="rs-term-cmd">$ {command}</span>
          {"\n"}
          {lines.join("\n")}
        </code>
      </pre>
    </figure>
  );
}
