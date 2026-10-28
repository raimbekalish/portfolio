// How a fact on a case-study page is known. Each project defines its own set of these (verified in
// source, recorded output, conceptual illustration and so on), and every figure or excerpt carries one.

export type Evidence = {
  label: string;
  /** Shown as the label's tooltip and in the page's evidence key. */
  detail: string;
  /** How the label is drawn: plain ink, the project's accent, dashed for illustrations. */
  tone: "plain" | "accent" | "accent-dashed" | "muted" | "muted-dashed";
};
