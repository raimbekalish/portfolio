// ReproSeed, from its public repository (github.com/raimbekalish/reproseed) at commit dd1c61c
// (2026-10-22). Sources: the README, docs/future-phase-corrections.md, the source under src/ and
// examples/, and the tests. Every fact was checked against the code, not only the README. Figures
// from a run live in reproseed-run.ts.
//
// Not claimed anywhere: users, benchmarks, speedups or test counts; a deployment; support for real
// websites; anything the project's phase notes exclude; any design decision as Raimbek's own.

import type { Evidence } from "./evidence";

/** How each part of the case study is known. Each figure, panel and excerpt carries one of these labels. */
export const evidence = {
  verified: {
    label: "Verified in source",
    detail: "Read in the public repository at commit dd1c61c: its source, tests and README.",
    tone: "plain",
  },
  recorded: {
    label: "Recorded output",
    detail:
      "From one local run on 2026-10-24 of the repository's own command and generated tests against its loopback demo apps. Replay counts and times vary between runs.",
    tone: "accent",
  },
  illustration: {
    label: "Conceptual illustration",
    detail: "Drawn to explain a mechanism in the source. Not a trace, and not the tool's interface.",
    tone: "muted-dashed",
  },
  guided: {
    label: "Guided demonstration",
    detail: "Steps through the recorded data of a verified example. Nothing runs in your browser.",
    tone: "accent-dashed",
  },
  notBuilt: {
    label: "Not built",
    detail: "Excluded by the project's own phase notes. Not part of the tool.",
    tone: "muted",
  },
} as const satisfies Record<string, Evidence>;

export type EvidenceKind = keyof typeof evidence;

export const reproseed = {
  slug: "reproseed",
  name: "ReproSeed",
  thesis: "Turn complex failures into minimal, reproducible evidence.",
  /** The words of the thesis set in the serif accent. */
  accent: "minimal, reproducible evidence.",
  summary:
    "A command-line tool that replays a failing browser scenario, removes every step the failure does not need, and writes a Playwright regression test for what is left.",
  kind: "Personal project",
  year: "2026",
  /**
   * Six of the seven commits carry "Co-authored-by: Cursor". The wording claims no decision as
   * Raimbek's own; the page describes what the project implements.
   */
  authorship:
    "Developed with AI-assisted coding tools, including Cursor. Implementation details and verification evidence are available in the public repository.",
  authorshipShort: "AI-assisted",
  stack: ["TypeScript", "Node.js", "Playwright"],
  status: "Version 0.1.0. Runs locally from its repository; the package is private and not published to npm.",
  source: "https://github.com/raimbekalish/reproseed",
  commit: {
    sha: "dd1c61c",
    date: "2026-10-22",
    url: "https://github.com/raimbekalish/reproseed/commit/dd1c61cbe8845ede7bb03d2569d092d00014ea2b",
  },
  boundary: "It runs only against authorized loopback test applications, not arbitrary production websites.",
  /** The tool's own result line, verbatim (VERIFIED_ONE_MINIMAL_CLAIM in src/core/minimize.ts). */
  claim:
    "1-minimal under single deletion of this ordered scenario, given the recorded probes. This is not a proof of the globally shortest reproduction.",
};

/** The five things the command does, in order. */
export const pipeline = [
  { id: "reproduce", name: "Reproduce", detail: "Replay the whole scenario from a clean state; three baseline runs must fail the same way." },
  { id: "minimize", name: "Minimize", detail: "Delta debugging removes groups of steps, then single steps, keeping only subsets that still fail the same way." },
  { id: "prove", name: "Prove", detail: "Try deleting each remaining step once more; none may still reproduce the failure." },
  { id: "verify", name: "Verify", detail: "Five fresh replays of the result, with no cached answers, must all fail the same way." },
  { id: "export", name: "Export", detail: "Write a Playwright test that asserts the intended behaviour, so it fails until the bug is fixed." },
] as const;

/** How the tool keeps to authorized local test apps (src/runner/safety.ts, reset.ts, faults.ts; src/cli). */
export const safeguards = [
  "The target must be a plain http origin on localhost, 127.0.0.1 or ::1, with no path or credentials.",
  "Before any reset, the app must answer GET /__reproseed/identity with the app id the run expects.",
  "The reset credential comes only from an environment variable. It is never a flag, never printed, and is removed from reports.",
  "Every replay starts with an authorized reset and a fresh browser context. Requests to any other origin, and redirects that leave it, are blocked.",
  "A DOM check reads one element's textContent. Scenario files cannot supply scripts, and their values are never expanded.",
  "The generated test refuses a non-loopback origin before it sends the credential, and runs with retries off.",
] as const;

/** What the tool does not claim (MINIMIZE_LIMITATIONS in src/core/minimize.ts, in plain words). */
export const limitations = [
  "Each kept step is necessary only in the sense that deleting it alone stopped the failure in the recorded replays. A shorter reproduction may exist.",
  "It removes steps from an ordered scenario. It never reorders steps or tries shorter delays.",
  "Reproducibility is sampled: three baseline runs, two confirmations per reduction and five final runs. A rarer flake can still exist.",
  "Timeouts, runner errors and different failures never count as the bug. A step kept because removing it is invalid has not been shown to cause the bug.",
  "The examples and tests cover two loopback demo apps that ship with the repository.",
] as const;

/** Explicitly out of scope in the project's phase notes (README, docs/future-phase-corrections.md). */
export const notBuilt = [
  "A graphical interface or dashboard. ReproSeed is a command-line tool; the drawings on this page are explanations, not its interface.",
  "Calls to an AI model.",
  "A cloud backend, accounts or a database.",
  "Publication to npm.",
  "Support for arbitrary production websites.",
] as const;

// --- The two verified examples -------------------------------------------------------------------

export type StepKind = "goto" | "click" | "fill" | "wait" | "delay";

export type ScenarioStep = {
  id: string;
  kind: StepKind;
  /** The step as the scenario file defines it, in short code form. */
  code: string;
  /** What the step does, in words. */
  action: string;
  dependsOn: string[];
};

export type Outcome = "target" | "pass" | "other" | "invalid" | "error";
export type Source = "executed" | "cache" | "invalid";

/** One candidate the minimizer decided on: a subset of the steps and what happened to it. */
export type Evaluation = {
  phase: "search" | "single-deletion";
  source: Source;
  outcome: Outcome;
  /** Step ids in scenario order. */
  steps: string[];
  /** What the oracle saw (for target and other outcomes), or the runner's error. */
  observed?: string;
};

export type RecordedRun = {
  status: "verified-one-minimal";
  kept: string[];
  removed: string[];
  replays: { baseline: number; search: number; verify: number };
  candidateEvaluations: number;
  cacheHits: number;
  elapsedMs: number;
  /** What each baseline and each final verification replay observed. */
  baseline: string[];
  verify: string[];
  evaluations: Evaluation[];
  singleDeletion: { removed: string; outcome: Outcome; source: Source; observed?: string }[];
  terminal: { command: string; output: string[] };
  /** The generated test: a few lines verbatim, with their line numbers, and the step ids it embeds. */
  spec: { file: string; excerpt: { n: number; text: string }[]; embedded: string[] };
  test: { command: string; buggy: string[]; fixed: string[] };
};

/**
 * One row of a conceptual sequence diagram. Times are the scenario's configured waits and the page's
 * own guard; rows without a time happen shortly after the row above. Browser latency is ignored.
 */
export type SequenceRow = {
  time?: string;
  page?: string;
  server?: string;
  /** A request or response crossing between the page and the server on this row. */
  message?: { to: "server" | "page"; label: string };
  /** The moment the bug happens, or the moment the fix prevents it. */
  key?: boolean;
};

/** A verified example: what the scenario file and the demo page say. Its recorded run is joined in by `withRun`. */
export type ExampleContent = Omit<Example, "run">;

export type Example = {
  id: "duplicate-submit" | "stale-search";
  name: string;
  app: string;
  bug: string;
  /** Why the bug happens, from the demo page's source. */
  cause: string;
  oracle: { label: string; code: string; intended: string };
  failure: { code: string; observed: string; summary: string };
  steps: ScenarioStep[];
  /** Why each kept step is needed. The outcome is recorded; the reason is read from the page's source. */
  keptBecause: Record<string, string>;
  removedBecause: string;
  timing: { buggy: SequenceRow[]; fixed: SequenceRow[]; result: { buggy: string; fixed: string } };
  /** The repository's test-only fixed page, as its server derives it from the buggy page. */
  fix: { name: string; summary: string; diff: { op: " " | "+" | "-"; text: string }[] };
  run: RecordedRun;
  /** The checked-in scenario and budget, for links and labels. */
  file: string;
  /** Lines of the scenario file, verbatim, with "…" where lines are left out. */
  excerpt?: string;
  /** A measured run the README itself records, when it records one. */
  documented?: { replays: number; cacheHits: number; time: string };
  budget: { replays: number; minutes: number };
};

export const duplicateSubmit: ExampleContent = {
  id: "duplicate-submit",
  name: "Duplicate submit",
  app: "A loopback form that saves a record",
  bug: "A second click on Submit, while the first save is still waiting for its response, saves a second record.",
  cause: "The page locks the form only after the first response arrives, and its 400 ms double-click guard has already expired.",
  oracle: { label: "Records saved for a@example.com", code: "record-count · GET /api/records · email = a@example.com", intended: "1 record" },
  failure: { code: "DUPLICATE", observed: "2 records", summary: "2 records, expected 1" },
  steps: [
    { id: "open", kind: "goto", code: "goto /", action: "Open the app", dependsOn: [] },
    { id: "preview", kind: "click", code: "click #preview", action: "Click Preview", dependsOn: ["open"] },
    { id: "email", kind: "fill", code: 'fill #email "a@example.com"', action: "Type the email", dependsOn: ["open"] },
    { id: "note", kind: "fill", code: 'fill #note "hello"', action: "Type a note", dependsOn: ["open"] },
    { id: "decoy-wait", kind: "wait", code: "wait 100 ms", action: "Wait 100 ms", dependsOn: [] },
    { id: "slow", kind: "delay", code: "delay POST /api/records 2000 ms", action: "Hold each save response for 2 seconds", dependsOn: [] },
    { id: "submit-1", kind: "click", code: "click #submit", action: "Click Submit", dependsOn: ["open", "email"] },
    { id: "gap", kind: "wait", code: "wait 800 ms", action: "Wait 800 ms", dependsOn: [] },
    { id: "submit-2", kind: "click", code: "click #submit", action: "Click Submit again", dependsOn: ["open", "email"] },
  ],
  keptBecause: {
    open: "Every other kept step needs the page. Deleting it makes the subset invalid, so it was not replayed.",
    email: "Both clicks on Submit depend on it. Deleting it makes the subset invalid, so it was not replayed.",
    slow: "Without the held response, the first save returns before the second click and locks the form: one record.",
    "submit-1": "With only one click there is only one save: one record.",
    gap: "Without the 800 ms wait, the second click lands inside the page's 400 ms double-click guard and is ignored: one record.",
    "submit-2": "Without the second click there is only one save: one record.",
  },
  removedBecause: "The failure reproduced the same way without it.",
  timing: {
    buggy: [
      { time: "0 ms", page: "Click Submit", message: { to: "server", label: "POST" }, server: "Saves record 1. The scenario holds the response." },
      { page: "The 400 ms double-click guard runs out.", server: "Response still held." },
      { time: "800 ms", page: "Click Submit again. The guard has expired and the form is not locked yet.", message: { to: "server", label: "POST" }, server: "Saves record 2.", key: true },
      { time: "2,000 ms", message: { to: "page", label: "Response 1" }, page: "The form locks, too late." },
    ],
    fixed: [
      { time: "0 ms", page: "Click Submit. The save is marked pending.", message: { to: "server", label: "POST" }, server: "Saves record 1. The scenario holds the response." },
      { page: "The 400 ms double-click guard runs out.", server: "Response still held." },
      { time: "800 ms", page: "Click Submit again: ignored, because a save is pending.", key: true },
      { time: "2,000 ms", message: { to: "page", label: "Response 1" }, page: "The form locks." },
    ],
    result: { buggy: "2 records", fixed: "1 record" },
  },
  fix: {
    name: "fixed-pending",
    summary: "Ignore a submit while the previous save is still in flight.",
    diff: [
      { op: " ", text: "let locked = false;" },
      { op: "+", text: "let pending = false;" },
      { op: " ", text: "…" },
      { op: "-", text: "if (locked) {" },
      { op: "+", text: "if (locked || pending) {" },
      { op: " ", text: "…" },
      { op: " ", text: "lastSubmitAt = now;" },
      { op: "+", text: "pending = true;" },
      { op: " ", text: "…" },
      { op: "-", text: "});" },
      { op: "+", text: "}).finally(() => {" },
      { op: "+", text: "  pending = false;" },
      { op: "+", text: "});" },
    ],
  },
  file: "examples/duplicate-submit/scenario.json",
  excerpt: [
    '  "steps": [',
    '    { "id": "open", "kind": "goto", "path": "/", "dependsOn": [] },',
    "    …",
    "    {",
    '      "id": "slow",',
    '      "kind": "delay",',
    '      "urlIncludes": "/api/records",',
    '      "method": "POST",',
    '      "ms": 2000,',
    '      "dependsOn": []',
    "    },",
    '    { "id": "submit-1", "kind": "click", "selector": "#submit", "dependsOn": ["open", "email"] },',
    '    { "id": "gap", "kind": "wait", "ms": 800, "dependsOn": [] },',
    '    { "id": "submit-2", "kind": "click", "selector": "#submit", "dependsOn": ["open", "email"] }',
    "  ],",
    '  "oracle": {',
    '    "id": "record-count",',
    '    "request": { "method": "GET", "path": "/api/records" },',
    '    "match": { "field": "email", "value": "a@example.com" },',
    '    "expect": 1',
    "  },",
  ].join("\n"),
  budget: { replays: 60, minutes: 5 },
};

export const staleSearch: ExampleContent = {
  id: "stale-search",
  name: "Stale search",
  app: "A loopback search page",
  bug: "A slow response to an earlier search arrives last and overwrites the results of the current search.",
  cause: "The page writes every response into the results, even one from an older click.",
  oracle: { label: "Text of #results", code: 'dom-text · #results · expect "Results for beta"', intended: "Results for beta" },
  failure: { code: "DOM_MISMATCH", observed: "Results for alpha (outdated)", summary: "“Results for alpha (outdated)”, expected “Results for beta”" },
  steps: [
    { id: "open", kind: "goto", code: "goto /", action: "Open the app", dependsOn: [] },
    { id: "preview", kind: "click", code: "click #preview", action: "Click Preview", dependsOn: ["open"] },
    { id: "query-alpha", kind: "fill", code: 'fill #query "alpha"', action: "Type alpha", dependsOn: ["open"] },
    { id: "note", kind: "fill", code: 'fill #note "unrelated"', action: "Type a note", dependsOn: ["open"] },
    { id: "decoy-wait", kind: "wait", code: "wait 40 ms", action: "Wait 40 ms", dependsOn: [] },
    { id: "slow-alpha", kind: "delay", code: "delay GET /api/search?q=alpha 800 ms", action: "Hold the alpha response for 800 ms", dependsOn: [] },
    { id: "search-alpha", kind: "click", code: "click #search", action: "Search", dependsOn: ["open", "query-alpha"] },
    { id: "gap", kind: "wait", code: "wait 300 ms", action: "Wait 300 ms", dependsOn: [] },
    { id: "query-beta", kind: "fill", code: 'fill #query "beta"', action: "Type beta", dependsOn: ["open"] },
    { id: "search-beta", kind: "click", code: "click #search", action: "Search again", dependsOn: ["open", "query-beta"] },
  ],
  keptBecause: {
    open: "Every other kept step needs the page. Deleting it makes the subset invalid, so it was not replayed.",
    "query-alpha": "The first search depends on it. Deleting it makes the subset invalid, so it was not replayed.",
    "slow-alpha": "Without the held response, alpha answers before beta, and beta's results stay.",
    "search-alpha": "Without the first search, nothing older can overwrite beta's results.",
    "query-beta": "The second search depends on it. Deleting it makes the subset invalid, so it was not replayed.",
    "search-beta": "Without the second search, the page shows “Results for alpha”: a different failure, so not the bug.",
  },
  removedBecause: "The failure reproduced the same way without it.",
  timing: {
    buggy: [
      { time: "0 ms", page: "Search for alpha.", message: { to: "server", label: "GET alpha" }, server: "Answers. The scenario holds the response." },
      { page: "Type beta and search again.", message: { to: "server", label: "GET beta" }, server: "Answers." },
      { message: { to: "page", label: "Beta" }, page: "Shows “Results for beta”." },
      { time: "800 ms", message: { to: "page", label: "Alpha, late" }, page: "Overwrites it: “Results for alpha (outdated)”.", key: true },
    ],
    fixed: [
      { time: "0 ms", page: "Search for alpha: request 1.", message: { to: "server", label: "GET alpha" }, server: "Answers. The scenario holds the response." },
      { page: "Type beta and search again: request 2.", message: { to: "server", label: "GET beta" }, server: "Answers." },
      { message: { to: "page", label: "Beta" }, page: "Shows “Results for beta”." },
      { time: "800 ms", message: { to: "page", label: "Alpha, late" }, page: "Ignored: request 1 is no longer the latest.", key: true },
    ],
    result: { buggy: "Results for alpha (outdated)", fixed: "Results for beta" },
  },
  fix: {
    name: "fixed-generation",
    summary: "Remember the latest search and ignore a response to an older one.",
    diff: [
      { op: "+", text: "let generation = 0;" },
      { op: " ", text: 'searchButton.addEventListener("click", () => {' },
      { op: " ", text: "  const query = queryInput.value;" },
      { op: "+", text: "  const requestGeneration = ++generation;" },
      { op: " ", text: "  …" },
      { op: " ", text: "    const body = await response.json();" },
      { op: "+", text: "    if (requestGeneration !== generation) {" },
      { op: "+", text: "      return;" },
      { op: "+", text: "    }" },
    ],
  },
  file: "examples/stale-search/scenario.json",
  documented: { replays: 52, cacheHits: 14, time: "about 30 seconds" },
  budget: { replays: 80, minutes: 3 },
};

/** An example with its recorded run (from reproseed-run.ts), kept apart so each page loads only what it shows. */
export const withRun = (example: ExampleContent, run: RecordedRun): Example => ({ ...example, run });

// --- The case study page -------------------------------------------------------------------------

export const caseStudy = {
  path: "/work/reproseed/",
  title: "ReproSeed: minimal, reproducible bug evidence — Raimbek Alish",
  description:
    "Case study: how ReproSeed turns a failing browser scenario into a verified 1-minimal reproduction and a Playwright regression test that fails on the bug and passes on the fix.",
  image: { path: "/og/reproseed.png", alt: "ReproSeed case study: a nine-step scenario with three steps struck out, leaving six.", width: 1200, height: 630 },
};
