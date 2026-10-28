import type { Chapter } from "../shared/Contents";

/** The case study's chapters, in page order: the overview's table of contents and the bar's menu. */
export const chapters: readonly Chapter[] = [
  { id: "contribution", label: "Raimbek's contribution" },
  { id: "readings", label: "Three buttons, three readings" },
  { id: "system-map", label: "System map" },
  { id: "numbers", label: "The numbers" },
  { id: "conversation", label: "The conversation" },
  { id: "risk", label: "The risk shape" },
  { id: "checks", label: "What the code shows" },
  { id: "evidence", label: "Evidence" },
];
