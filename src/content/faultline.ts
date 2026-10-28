// Faultline, from its public repository (github.com/raimbekalish/faultline) at main a7d48f0
// (2026-10-27) and its v0.1.0 release (tag commit 38b92ab, published 2026-10-26 UTC). Sources: the
// README, docs/architecture.md, docs/reports.md, docs/evidence.md, docs/validation.md and the
// release's asset list. The recorded run is quoted from the repository's validation record; it was
// not re-run for this page.
//
// Not claimed anywhere: support for arbitrary or production services, users or adoption, a
// deployment, reliability or performance figures beyond the one labelled run, statistical
// significance, or any unreleased feature as part of the published binaries.

const repository = "https://github.com/raimbekalish/faultline";
const commit = "a7d48f06fdea53e889d47c27ab028abc5bf3fa9e";
/** A file in the repository, pinned to the commit this page was checked against. */
const pinned = (path: string) => `${repository}/blob/${commit}/${path}`;

export const faultline = {
  slug: "faultline",
  thesis: "Understand how a system behaves when a dependency fails.",
  /** The words of the thesis set in the serif accent. */
  accent: "a dependency fails.",
  summary:
    "Poly Predictor Kit is a system of services; ReproSeed turns a failure into evidence. Faultline joins the two: it slows one dependency of its own sample system on purpose and records what every request saw.",
  kind: "Personal project",
  /**
   * The repository's AGENTS.md and its codex/ branches show work with a coding agent; the commits
   * carry no co-author credit. The label stays pending Raimbek's own wording (ledger 4.6c).
   */
  authorshipShort: "AI-assisted",
  stack: ["Go", "Docker Compose", "Toxiproxy", "OpenTelemetry", "SQLite", "React"],
  /** The README's boundary and the release's asset list, in short. */
  status:
    "Early open-source developer tooling, not production chaos infrastructure. Experiments run from source with Docker, on Faultline’s own sample services; release v0.1.0 publishes only the offline evidence tool.",
  source: repository,
  demo: `${repository}#watch-the-demo`,
  release: { tag: "v0.1.0", url: `${repository}/releases/tag/v0.1.0` },
  commit: { sha: "a7d48f0", date: "2026-10-27", url: `${repository}/commit/${commit}` },
};

export type FaultlineStageId = "baseline" | "fault" | "recovery" | "evidence";
/** One measured phase of the run: its mean request time and how many of its requests failed. */
export type RecordedPhase = { id: Exclude<FaultlineStageId, "evidence">; name: string; meanMs: number; failed: number; status?: number };

const phases: RecordedPhase[] = [
  { id: "baseline", name: "Baseline", meanMs: 0.58, failed: 0 },
  { id: "fault", name: "Injected fault", meanMs: 253.2, failed: 5, status: 504 },
  { id: "recovery", name: "Recovery", meanMs: 0.36, failed: 0 },
];

/**
 * One recorded run, from docs/validation.md ("Actual portable files", Milestone 5A): generated from
 * clean commit 27b3775 on the project's local Docker sample topology. The repository's dashboard
 * screenshot shows the same phase means. One run, not a benchmark.
 */
export const recordedRun = {
  conditions: ["One recorded run", "400 ms latency", "Tracing on", "5 sequential requests per phase", "Local Docker"],
  injectedMs: 400,
  /** The sample frontend's timeout for its dependency call (docs/architecture.md). */
  deadlineMs: 250,
  requests: 5,
  phases,
  bundle: {
    file: "clean-400.flb",
    bytes: 5162,
    sha256: "e265b73a29f2deaa079045996aafc9cf064b05949193389c10319ceff07caea5",
  },
  source: pinned("docs/validation.md#actual-portable-files"),
};

/** A station on a stage's path, with what that stage records there. */
export type PathHop = { name: string; note: string; tone?: "fault" | "pass" };
/** The link from one hop to the next: open, or slowed by the fault and abandoned at the deadline. */
export type PathLink = "open" | "cut";

export type FaultlineStage = {
  id: FaultlineStageId;
  name: string;
  /** The part of the name kept on phones, where the tabs are narrow. */
  short: string;
  title: string;
  /** What the path shows: the request path, or the evidence path for the last stage. */
  pathLabel: string;
  hops: PathHop[];
  links: PathLink[];
  body: string;
  /** A limit on what the stage shows. */
  note?: string;
  sourceLabel: string;
  source: string;
};

/** The four stages of the recorded run, as the homepage steps through them. */
export const stages: FaultlineStage[] = [
  {
    id: "baseline",
    name: "Baseline",
    short: "Baseline",
    title: "The healthy path, measured first",
    pathLabel: "Request path",
    hops: [
      { name: "Runner", note: "← 2xx", tone: "pass" },
      { name: "Frontend", note: "250 ms deadline" },
      { name: "Toxiproxy", note: "Proxy owned by this run" },
      { name: "Dependency", note: "Constant reply" },
    ],
    links: ["open", "open", "open"],
    body: "One request at a time goes through the sample frontend, which calls its dependency through a Toxiproxy proxy this run owns. Any failure here stops the run before the fault.",
    sourceLabel: "docs/architecture.md",
    source: pinned("docs/architecture.md#implemented-lifecycle"),
  },
  {
    id: "fault",
    name: "Injected fault",
    short: "Fault",
    title: "The deadline fires first",
    pathLabel: "Request path",
    hops: [
      { name: "Runner", note: "← HTTP 504", tone: "fault" },
      { name: "Frontend", note: "Gives up at 250 ms", tone: "fault" },
      { name: "Toxiproxy", note: "+400 ms, zero jitter", tone: "fault" },
      { name: "Dependency", note: "Unchanged" },
    ],
    links: ["open", "cut", "open"],
    body: "Toxiproxy delays the dependency’s replies by 400 ms. The frontend stops waiting at 250 ms and answers HTTP 504, so the 253.20 ms mean measures the deadline, not the dependency.",
    sourceLabel: "docs/reports.md",
    source: pinned("docs/reports.md#reproducibility-and-limits"),
  },
  {
    id: "recovery",
    name: "Recovery",
    short: "Recovery",
    title: "Recovery, then cleanup",
    pathLabel: "Request path",
    hops: [
      { name: "Runner", note: "← 2xx", tone: "pass" },
      { name: "Frontend", note: "250 ms deadline" },
      { name: "Toxiproxy", note: "Latency removed", tone: "pass" },
      { name: "Dependency", note: "Constant reply" },
    ],
    links: ["open", "open", "open"],
    body: "With the latency removed, the same requests run again; any failure now fails the whole run. Then the run deletes the proxy it owns, under a fresh timeout.",
    sourceLabel: "docs/architecture.md",
    source: pinned("docs/architecture.md#implemented-lifecycle"),
  },
  {
    id: "evidence",
    name: "Recorded evidence",
    short: "Evidence",
    title: "A portable record of the run",
    pathLabel: "Evidence path",
    hops: [
      { name: "Report", note: "Every request" },
      { name: "SQLite", note: "Local history" },
      { name: ".flb", note: "5,162 bytes" },
      { name: "Verifier", note: "Network off", tone: "pass" },
    ],
    links: ["open", "open", "open"],
    body: "Kept in local SQLite history, the run is exported as a .flb bundle: manifest, history, specification and a report with each request’s duration, status and trace ID, not the traces. Exported twice, byte-identical; checked offline with networking disabled.",
    note: "SHA-256 detects changed content; it does not prove who ran the experiment.",
    sourceLabel: "docs/validation.md",
    source: pinned("docs/validation.md#actual-portable-files"),
  },
];
