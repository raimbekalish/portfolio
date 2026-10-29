import type { Chapter } from "../shared/Contents";

/** The case study's chapters, in page order: the overview's table of contents and the bar's menu. */
export const chapters: readonly Chapter[] = [
  { id: "problem", n: "01", label: "Problem" },
  { id: "explorer", label: "Bug Minimization Explorer" },
  { id: "reproduction", n: "02", label: "Reproduction" },
  { id: "minimization", n: "03", label: "Minimization" },
  { id: "regression-test", n: "04", label: "Regression test" },
  { id: "verified-fix", n: "05", label: "Verified fix" },
  { id: "conclusion", label: "Conclusion" },
  { id: "limits", label: "Limits" },
  { id: "evidence", label: "Evidence and authorship" },
];
