// What the explorer shows at each stage, derived from an example's recorded run. Pure functions, no
// React: the explorer only reads these. Nothing here runs or simulates the minimizer; every outcome
// comes from the run's report.

import type { Evaluation, Example, Outcome, Source } from "../../../content/reproseed";

export const stages = [
  { id: "reproduce", name: "Reproduce", title: "The full scenario fails" },
  { id: "minimize", name: "Minimize", title: "The search, one candidate at a time" },
  { id: "prove", name: "Prove", title: "Every kept step is needed" },
  { id: "verify", name: "Verify", title: "Five fresh replays agree" },
  { id: "test", name: "Test", title: "The exported regression test" },
  { id: "fix", name: "Fix", title: "Same test: buggy page, fixed page" },
] as const;

export type StageId = (typeof stages)[number]["id"];

export const outcomeText: Record<Outcome, { label: string; short: string }> = {
  target: { label: "Reproduced the failure", short: "Reproduced" },
  pass: { label: "No failure", short: "No failure" },
  other: { label: "A different failure, so not the bug", short: "Different failure" },
  invalid: { label: "Not replayed: a step it needs is missing", short: "Invalid subset" },
  error: { label: "Runner error, never counted as the bug", short: "Runner error" },
};

export const sourceText: Record<Source, string> = {
  executed: "Replayed twice, each time from a clean state in a fresh browser.",
  cache: "Answered from the cache, which stores only results whose replays agreed.",
  invalid: "Rejected by the dependency check; no browser was started.",
};

/** The search candidates, in the order the minimizer decided on them. */
export const searchLog = (example: Example) => example.run.evaluations.filter((e) => e.phase === "search");

/** The smallest failing subset known after each search candidate. */
export function smallestAfter(example: Example, log: Evaluation[]): string[][] {
  let smallest = example.steps.map((s) => s.id);
  return log.map((e) => {
    if (e.outcome === "target") smallest = e.steps;
    return smallest;
  });
}

/** The candidates that shrank the smallest failing subset, with what each one removed. */
export function reductions(example: Example, log: Evaluation[]) {
  const found: { index: number; from: number; to: number; removed: string[] }[] = [];
  let smallest = example.steps.map((s) => s.id);
  log.forEach((e, index) => {
    if (e.outcome !== "target" || e.steps.length >= smallest.length) return;
    found.push({ index, from: smallest.length, to: e.steps.length, removed: smallest.filter((id) => !e.steps.includes(id)) });
    smallest = e.steps;
  });
  return found;
}

export function counts(log: Evaluation[]) {
  const by = (o: Outcome) => log.filter((e) => e.outcome === o).length;
  return {
    total: log.length,
    replayed: log.filter((e) => e.source === "executed").length,
    cached: log.filter((e) => e.source === "cache").length,
    invalid: by("invalid"),
    target: by("target"),
  };
}

/** "open, email and slow" */
export function listIds(ids: string[]) {
  if (ids.length <= 1) return ids.join("");
  return `${ids.slice(0, -1).join(", ")} and ${ids[ids.length - 1]}`;
}

export const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;
