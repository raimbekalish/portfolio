import type { Chapter } from "../shared/Contents";

/** The case study's chapters, in page order: the overview's table of contents and the bar's menu. */
export const chapters: readonly Chapter[] = [
  { id: "experiment", n: "01", label: "A controlled experiment" },
  { id: "deadline", n: "02", label: "Where the deadline cuts" },
  { id: "recovery", n: "03", label: "Recovery, cleanup and traces" },
  { id: "records", n: "04", label: "History, dashboard and evidence" },
  { id: "status", n: "05", label: "What ships, what does not" },
  { id: "limits", n: "06", label: "What the record shows" },
];
