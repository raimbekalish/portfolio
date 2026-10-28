import type { Evidence } from "../../content/evidence";

/** How a figure or excerpt is known ("Verified in source", "Conceptual illustration" and so on). */
export function EvidenceTag({ kind }: { kind: Evidence }) {
  return (
    <span className="cs-tag" data-tone={kind.tone} title={kind.detail}>
      {kind.label}
    </span>
  );
}
