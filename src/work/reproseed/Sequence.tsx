import type { Example, SequenceRow } from "../../content/reproseed";
import { EvidenceTag } from "./ui";
import "./sequence.css";

function Diagram({ rows, title, result, variant }: { rows: SequenceRow[]; title: string; result: string; variant: "buggy" | "fixed" }) {
  return (
    <figure className="rs-seq" data-variant={variant}>
      <figcaption className="rs-seq-title">{title}</figcaption>
      <div className="rs-seq-lanes" aria-hidden="true">
        <span>Page</span>
        <span>Server</span>
      </div>
      <ol className="rs-seq-rows">
        {rows.map((row, i) => (
          <li key={i} className="rs-seq-row" data-key={row.key || undefined}>
            <span className="rs-seq-time">{row.time}</span>
            <span className="rs-seq-page">
              {row.page && <><span className="sp-sr">Page: </span>{row.page}</>}
            </span>
            <span className="rs-seq-msg" data-to={row.message?.to}>
              {row.message && (
                <>
                  <span className="sp-sr">{row.message.to === "server" ? "Sent to the server: " : "Arrives at the page: "}</span>
                  {row.message.label}
                </>
              )}
            </span>
            <span className="rs-seq-server">
              {row.server && <><span className="sp-sr">Server: </span>{row.server}</>}
            </span>
          </li>
        ))}
      </ol>
      <p className="rs-seq-result">Result: <b>{result}</b></p>
    </figure>
  );
}

/** Why the bug happens, and why the fix stops it: two conceptual sequence diagrams side by side. */
export default function Sequence({ example }: { example: Example }) {
  return (
    <div className="rs-seqs">
      <div className="rs-seqs-head">
        <p><b>Why it fails.</b> {example.cause}</p>
        <EvidenceTag kind="illustration" />
      </div>
      <Diagram rows={example.timing.buggy} title="Buggy page" result={example.timing.result.buggy} variant="buggy" />
      <Diagram rows={example.timing.fixed} title={`Fixed page (${example.fix.name})`} result={example.timing.result.fixed} variant="fixed" />
      <p className="cs-note">
        Times are the scenario's configured waits and limits in the page's source; a row without a time follows shortly after
        the one above. Browser latency is ignored. This is not a recorded trace.
      </p>
    </div>
  );
}
