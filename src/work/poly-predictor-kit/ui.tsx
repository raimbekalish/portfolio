import { Fragment, type ReactNode } from "react";
import { evidence, type Channel, type PolyEvidence } from "../../content/poly";
import { EvidenceTag as Tag } from "../shared/EvidenceTag";

/** How a figure or excerpt is known: "Verified in code", "Computed in your browser" and so on. */
export function EvidenceTag({ kind }: { kind: PolyEvidence }) {
  return <Tag kind={evidence[kind]} />;
}

/** The two channels' names, as the page writes them. */
export const channelName: Record<Channel, string> = { numbers: "The numbers", conversation: "The conversation" };

/**
 * A chapter of the Poly page: a kicker naming its channel, a title across the width, then its
 * content. "night" chapters sit on the dark stage; "paper" chapters are editorial.
 */
export function Chapter({
  id,
  kicker,
  title,
  channel,
  surface = "paper",
  children,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  channel?: Channel;
  surface?: "paper" | "night";
  children: ReactNode;
}) {
  return (
    <section className="pp-chapter" id={id} data-surface={surface} data-channel={channel} aria-labelledby={`${id}-title`}>
      <header className="pp-chapter-head">
        <p className="pp-kicker">{kicker}</p>
        <h2 className="pp-chapter-title" id={`${id}-title`}>{title}</h2>
      </header>
      <div className="pp-chapter-body">{children}</div>
    </section>
  );
}

/** A short excerpt of the public code, verbatim, numbered as in the file. */
export function Excerpt({ excerpt, label }: { excerpt: { file: string; href: string; lines: { n: number; text: string }[] }; label: string }) {
  return (
    <figure className="cs-code">
      <figcaption>
        <a href={excerpt.href} target="_blank" rel="noreferrer">
          {/* A long path wraps after a slash on a phone, not mid-name. */}
          {excerpt.file.split("/").map((part, i) => <Fragment key={i}>{i > 0 && <>/<wbr /></>}{part}</Fragment>)}
        </a>
        <EvidenceTag kind="verified" />
      </figcaption>
      <div className="cs-scroll" role="region" tabIndex={0} aria-label={label}>
        <pre><code>{excerpt.lines.map((line, i) => (
          <span key={line.n} className="cs-code-line" data-gap={(i > 0 && line.n > excerpt.lines[i - 1].n + 1) || undefined}>
            <span className="cs-code-n" aria-hidden="true">{line.n}</span>
            {line.text}{"\n"}
          </span>
        ))}</code></pre>
      </div>
    </figure>
  );
}
