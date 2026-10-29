// Faultline, from its public repository (github.com/raimbekalish/faultline) at main a7d48f0
// (2026-10-27) and its v0.1.0 release (tag commit 38b92ab, published 2026-10-26 UTC). Sources: the
// README, AGENTS.md, docs/architecture.md, docs/reports.md, docs/tracing.md, docs/history.md,
// docs/dashboard.md, docs/evidence.md, docs/release.md, docs/roadmap.md, docs/validation.md and the
// release's asset list. Recorded runs are quoted from the repository's own records; none was re-run
// for the portfolio.
//
// Not claimed anywhere: support for arbitrary or production services, users or adoption, a
// deployment, reliability or performance figures beyond the one labelled run, statistical
// significance, or any unreleased feature as part of the published binaries.

import type { Evidence } from "./evidence";

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
   * Raimbek's wording (Phase 5F brief, ledger decision 13). The repository's AGENTS.md and codex/
   * branches show work with a coding agent; no share of the work is quantified anywhere.
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
/** One measured phase of a run: its mean request time and how many of its requests failed. */
export type RecordedPhase = { id: Exclude<FaultlineStageId, "evidence">; name: string; meanMs: number; failed: number; status?: number };

/** One run from the validation record, with what it was configured to do and what it recorded. */
export type RecordedRun = {
  injectedMs: number;
  tracing: boolean;
  /** Sequential requests in each phase. */
  requests: number;
  phases: RecordedPhase[];
  bundle: { file: string; bytes: number; sha256: string };
};

/** The sample frontend's timeout for its dependency call (docs/architecture.md). */
export const deadlineMs = 250;

/**
 * The two final runs in docs/validation.md ("Actual portable files", Milestone 5A), generated from
 * clean commit 27b3775 on the local Docker sample topology. Each completed, confirmed cleanup, was
 * exported twice with identical bytes and was inspected by the offline verifier. They are separate
 * runs with different sample counts and tracing settings, not a benchmark. The repository's
 * dashboard screenshot shows the same phase means.
 */
export const run80: RecordedRun = {
  injectedMs: 80,
  tracing: false,
  requests: 10,
  phases: [
    { id: "baseline", name: "Baseline", meanMs: 2.17, failed: 0 },
    { id: "fault", name: "Injected fault", meanMs: 83.16, failed: 0 },
    { id: "recovery", name: "Recovery", meanMs: 0.25, failed: 0 },
  ],
  bundle: { file: "clean-80.flb", bytes: 4170, sha256: "bb6c3d4ca25d3db32b83f5cdd189027085fb61cab86d796e5dc0dde435ea8572" },
};

export const run400: RecordedRun = {
  injectedMs: 400,
  tracing: true,
  requests: 5,
  phases: [
    { id: "baseline", name: "Baseline", meanMs: 0.58, failed: 0 },
    { id: "fault", name: "Injected fault", meanMs: 253.2, failed: 5, status: 504 },
    { id: "recovery", name: "Recovery", meanMs: 0.36, failed: 0 },
  ],
  bundle: { file: "clean-400.flb", bytes: 5162, sha256: "e265b73a29f2deaa079045996aafc9cf064b05949193389c10319ceff07caea5" },
};

/** Where both runs are recorded, and the commit they were generated from. */
export const validation = { revision: "27b3775", source: pinned("docs/validation.md#actual-portable-files") };

/** The 400 ms run as the homepage shows it, with its conditions spelled out. */
export const recordedRun = {
  ...run400,
  conditions: ["One recorded run", "400 ms latency", "Tracing on", "5 sequential requests per phase", "Local Docker"],
  deadlineMs,
  source: validation.source,
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

// ---------- The case study (/work/faultline/) ----------

/** The case study's page: path, title, description and social card. */
export const caseStudy = {
  path: "/work/faultline/",
  title: "Faultline: when a dependency fails — Raimbek Alish",
  description:
    "Case study of Faultline, a personal, AI-assisted reliability lab: how it injects owned latency into its own sample services, why a 400 ms delay fails at the 250 ms deadline, and how each run becomes evidence that can be checked offline.",
  image: {
    path: "/og/faultline.png",
    alt: "Faultline case study: two recorded runs on one millisecond ruler. The 80 ms delay passes under the 250 ms deadline; the 400 ms delay is cut there with HTTP 504.",
    width: 1200,
    height: 630,
  },
};

/** How each figure on the case study is known. Every figure carries one of these labels. */
export const evidence = {
  recorded: {
    label: "Recorded run",
    detail: "Measured by Faultline and quoted from its repository's records (docs/validation.md, docs/tracing.md). Each figure names its run. Nothing was re-run for this page.",
    tone: "accent",
  },
  verified: {
    label: "Verified in source",
    detail: "Read in the public repository at commit a7d48f0: its documentation, source and tests.",
    tone: "plain",
  },
  illustration: {
    label: "Conceptual illustration",
    detail: "Drawn to explain a mechanism the source describes. Not a capture of the tool.",
    tone: "muted-dashed",
  },
  replay: {
    label: "Guided replay",
    detail: "Animates recorded values at a quarter of their real speed. Nothing runs in your browser.",
    tone: "accent-dashed",
  },
  screenshot: {
    label: "Project screenshot",
    detail: "The project's own dashboard from its repository, showing actual persisted runs. Recompressed for this page; the original is linked.",
    tone: "muted",
  },
} as const satisfies Record<string, Evidence>;

export type FaultlineEvidence = keyof typeof evidence;

/** The hero and the overview. */
export const intro = {
  question: "What happens to a request when the service behind it slows down? And can someone else check the answer afterwards?",
  summary:
    "Faultline is a local reliability lab. It measures a small containerized service, slows the link to its dependency on purpose, measures the failure and the recovery, and exports the whole run as a file that can be verified offline.",
  boundary: "It runs only on its own isolated sample services. It is early developer tooling, not production chaos infrastructure.",
  release: "Release v0.1.0 publishes only the offline evidence tool, for macOS and Linux. Experiments, the full CLI and the dashboard run from source with Docker.",
  authorship: "Personal project · AI-assisted",
  /** The two halves of the authorship line, for places that set them apart. */
  kind: "Personal project",
  assisted: "AI-assisted",
  year: "2026",
};

/** The four services of the sample topology, and the runner's separate control lane. */
export const topology = {
  services: [
    { name: "Runner", role: "Go CLI and engine", note: "Sends one request at a time. Has no Docker access." },
    { name: "Frontend", role: "Sample service", note: "Calls its dependency through the proxy, with a 250 ms timeout." },
    { name: "Toxiproxy", role: "Proxy on the data port", note: "Created and owned by the run. Holds the latency only during the fault." },
    { name: "Dependency", role: "Sample service", note: "Returns a constant JSON value. No handler sleeps to fake a delay." },
  ],
  control: "Toxiproxy's control API: create the proxy, add and remove the latency, delete the proxy. It is never published outside the project.",
  isolation: [
    "One isolated Docker Compose project per experiment",
    "No Docker socket in containers, no host networking, no privileged containers",
    "Each runtime container is held to 64 MiB, half a CPU and 64 processes",
    "Images pinned by manifest digest",
  ],
  source: pinned("docs/architecture.md#first-vertical-slice"),
};

/** The implemented lifecycle of one experiment, in order (docs/architecture.md). */
export const lifecycle = [
  { name: "Validate", phase: "setup", detail: "Sample count and durations are checked before any control request." },
  { name: "Own", phase: "setup", detail: "A random 128-bit ownership ID is generated, and the proxy's deletion is registered before the proxy is created." },
  { name: "Warm up", phase: "setup", detail: "Requests run until the path is ready, for five seconds at most. They are not recorded." },
  { name: "Baseline", phase: "baseline", detail: "The workload is measured. Any failure stops the run before a fault is added." },
  { name: "Fault", phase: "fault", detail: "A downstream latency toxic, with zero jitter, delays every reply from the dependency." },
  { name: "Recovery", phase: "recovery", detail: "The toxic is removed and the same workload runs again. A failure here fails the run." },
  { name: "Clean up", phase: "cleanup", detail: "The owned proxy is always deleted, under a fresh five-second timeout. Cleanup errors are reported with any original error." },
  { name: "Report", phase: "cleanup", detail: "Only then is the JSON report finalized." },
] as const;

export const lifecycleSource = pinned("docs/architecture.md#implemented-lifecycle");

/** The bounds every run is held to (README, "Run an experiment"). */
export const runLimits = [
  { label: "Samples", value: "1–100 per phase" },
  { label: "Injected latency", value: "1 ms – 5 s" },
  { label: "Request timeout", value: "10 ms – 5 s" },
  { label: "Whole run", value: "2-minute deadline" },
  { label: "Cleanup", value: "Separate 5-second budget" },
];

/** What the deadline does to each run, in words: the figure's text alternative. */
export const deadlineReading = {
  below: "With 80 ms injected, the delayed reply arrives before the deadline. The frontend answers normally: the recorded fault mean is 83.16 ms, and none of the 10 requests failed.",
  above: "With 400 ms injected, the frontend stops waiting at 250 ms and answers HTTP 504. The runner records 253.20 ms, not 400: the last 150 ms of the injected delay is never observed by the caller.",
  recovery: "After each fault the latency was removed and the same requests ran again: 0.25 ms and 0.36 ms on average, with no failures.",
  caveat: "Two separate recorded runs from clean commit 27b3775, with different sample counts and tracing settings. They show the mechanism, not a benchmark, and the page draws no conclusion from their other differences.",
  mechanism: pinned("docs/reports.md#reproducibility-and-limits"),
};

/**
 * One traced request through the topology (docs/tracing.md, "Reading a trace"). Toxiproxy is
 * transparent to the trace and emits no spans.
 */
export const traceChain = [
  { service: "faultline-runner", span: "CLIENT GET /work", depth: 0 },
  { service: "faultline-frontend", span: "SERVER GET /work", depth: 1 },
  { service: "faultline-frontend", span: "CLIENT GET /value", depth: 2 },
  { service: "faultline-dependency", span: "SERVER GET /value", depth: 3 },
];

/**
 * The initial successful milestone-2 integration run, one observation per scenario
 * (docs/tracing.md). A different run from the two above.
 */
export const traceRun = {
  rows: [
    { scenario: "Healthy baseline", observation: "0.42 ms", client: "0.18 ms", server: "<0.01 ms", outcome: "HTTP 200" },
    { scenario: "80 ms latency", observation: "81.28 ms", client: "80.95 ms", server: "<0.01 ms", outcome: "HTTP 200" },
    { scenario: "400 ms latency", observation: "251.19 ms", client: "250.46 ms", server: "<0.01 ms", outcome: "HTTP 504, client timeout" },
    { scenario: "Recovery", observation: "1.08 ms", client: "0.69 ms", server: "<0.01 ms", outcome: "HTTP 200" },
  ],
  reading:
    "In the 400 ms case the dependency's own span took under 0.01 ms: it answered at once, and the delay lived in the proxy. The frontend's call to it ended at 250.46 ms with a timeout error, so the frontend and the runner both recorded HTTP 504.",
  limits:
    "Tracing is optional. A span ID is a correlation handle, not proof that Jaeger stored the trace; Jaeger keeps traces in memory only, and they are not part of the evidence bundle.",
  source: pinned("docs/tracing.md#reading-a-trace"),
};

/** Recovery and cleanup, as the source guarantees them, and where the guarantee ends. */
export const cleanup = {
  points: [
    "Recovery is measured, not assumed: the same requests run after the latency is removed, and a failure there fails the run.",
    "The proxy's deletion is registered before the proxy is created, so even an ambiguous create is cleaned up.",
    "Cleanup runs under its own fresh five-second timeout, after cancellation or failure too, and its errors are reported.",
  ],
  limit: "A SIGKILL, a host crash or a Docker daemon failure can stop in-process cleanup. Tearing down the Compose project is the recovery path then.",
  source: pinned("docs/architecture.md#implemented-lifecycle"),
};

/** History, the dashboard and the portable evidence format. */
export const records = {
  history: "Each run's specification is hashed, and a durable intent is committed before the engine starts; the final report, once stored, is immutable. Runs can be listed, shown and compared from the command line.",
  dashboard:
    "A read-only dashboard browses that history. It starts no experiments, collectors or Docker services, and binds to the loopback address only.",
  screenshot: {
    src: "/images/faultline-dashboard.webp",
    width: 1440,
    height: 1082,
    alt: "Faultline's dashboard overview: two completed runs. The latest, 400 ms of injected latency with 5 samples per phase, shows mean request times of 0.58 ms at baseline, 253.2 ms under the fault and 0.36 ms in recovery. The history table lists it and an 80 ms run with 10 samples per phase: 2.17 ms baseline and 83.16 ms under the fault, none failed.",
    caption:
      "Faultline's read-only dashboard, showing actual persisted runs with the same phase means as the two runs above. From the repository's README.",
    original: pinned("docs/images/dashboard.png"),
  },
  bundle: [
    { entry: "manifest.json", holds: "Format, sizes and SHA-256 of the other three files", max: "4 KiB" },
    { entry: "history.json", holds: "History and run IDs, specification hash, timestamps, status", max: "4 KiB" },
    { entry: "spec.json", holds: "The canonical experiment specification", max: "4 KiB" },
    { entry: "report.json", holds: "The original report, with every raw observation", max: "1 MiB" },
  ],
  format:
    "An uncompressed ZIP with exactly these four entries in this order. Fixed timestamps make repeat exports of a run identical: both runs above were exported twice, byte for byte the same.",
  verifier:
    "Verifying or inspecting a bundle needs only the file and the standalone faultline-bundle binary: no SQLite, Docker, Jaeger or network. The final verifier, built without cgo, inspected the 400 ms bundle inside a read-only container with networking disabled.",
  checksum:
    "SHA-256 detects changed content. It does not prove authenticity, attest that the run happened, or stop samples, summaries and hashes being altered together.",
  sources: { history: pinned("docs/history.md"), dashboard: pinned("docs/dashboard.md"), evidence: pinned("docs/evidence.md") },
};

export type CapabilityStatus = "released" | "source" | "unreleased" | "experimental" | "planned" | "unsupported";

export const capabilityStatus: Record<CapabilityStatus, { label: string; detail: string }> = {
  released: { label: "Released in v0.1.0", detail: "A published release asset" },
  source: { label: "In source, tested", detail: "On main, with tests; runs from source" },
  unreleased: { label: "Unreleased", detail: "On main after v0.1.0; not in the release binaries" },
  experimental: { label: "Experimental", detail: "On main after v0.1.0; incomplete by design" },
  planned: { label: "Planned", detail: "Designed or listed in the roadmap; not built" },
  unsupported: { label: "Unsupported", detail: "Outside the project's scope" },
};

/** What exists, what ships and what does not (ledger 4.6c). */
export const capabilities: { name: string; status: CapabilityStatus; note: string; source: string }[] = [
  { name: "Offline evidence tool: verify, inspect, compare", status: "released", note: "faultline-bundle for macOS and Linux, amd64 and arm64, with SHA256SUMS. Not Developer ID–signed or notarized.", source: faultline.release.url },
  { name: "Experiment engine and CLI", status: "source", note: "Baseline, latency fault and recovery on the sample topology, run through the Docker Compose wrapper.", source: pinned("docs/architecture.md") },
  { name: "Owned latency fault and cleanup", status: "source", note: "Race-tested against a real Toxiproxy.", source: pinned("docs/architecture.md#implemented-lifecycle") },
  { name: "OpenTelemetry tracing with a temporary Jaeger", status: "source", note: "Optional; off by default.", source: pinned("docs/tracing.md") },
  { name: "SQLite history and the read-only dashboard", status: "source", note: "Built from source with Go, a C compiler and Node.", source: pinned("docs/dashboard.md") },
  { name: "Offline reliability gates (faultline-bundle evaluate)", status: "unreleased", note: "Pass, fail or indeterminate verdicts on a bundle. Not in the v0.1.0 binaries.", source: pinned("README.md#offline-reliability-gates--unreleased") },
  { name: "Custom-service lab planner (faultline lab plan)", status: "experimental", note: "Plans only. It cannot run or clean up a custom lab.", source: pinned("docs/custom-service-planner.md") },
  { name: "Custom-service supervisor foundation", status: "experimental", note: "An internal graph and journal, not an executable supervisor.", source: pinned("docs/design/custom-service-supervisor.md") },
  { name: "Labs on services their owner selects", status: "planned", note: "A design and a threat model only.", source: pinned("docs/design/custom-service-lab.md") },
  { name: "More fault types, concurrent load, repeated trials", status: "planned", note: "Listed under “Later” in the roadmap, with a benchmark methodology.", source: pinned("docs/roadmap.md") },
  { name: "Arbitrary or production targets, browser fault control, a hosted service, AI analysis, statistical significance", status: "unsupported", note: "Excluded by the README.", source: pinned("README.md") },
  { name: "Windows and hosted CI", status: "unsupported", note: "Windows is an unsupported cross-build; validation is a local record.", source: pinned("docs/release.md") },
];

/** What the record shows, the limits that bound it, and where it all comes from. */
export const closing = {
  shows: [
    "A timeout turns latency into failure. With 400 ms injected and a 250 ms deadline, every request failed, at a mean of 253.20 ms, and the caller never saw how slow the dependency really was.",
    "Fault injection is safer when ownership, bounds and cleanup are part of the experiment: every proxy has an owner, a time limit and a cleanup that runs even after a failure.",
    "Evidence is more useful when it can be checked without the lab that made it: one small binary, no database, Docker or network.",
  ],
  limits: [
    "Five or ten sequential requests per phase. Means and nearest-rank percentiles are descriptive, with no confidence intervals or significance.",
    "Docker's VM, CPU contention, connection reuse and host scheduling affect timings. Rerunning a specification repeats its structure, not its numbers.",
    "No concurrent load or repeated trials yet; the project says those need their own methodology.",
    "macOS binaries are not notarized, Windows is unsupported, and there is no hosted CI.",
  ],
  limitsSource: pinned("docs/reports.md#reproducibility-and-limits"),
  sources: [
    { label: "Repository", href: repository },
    { label: `Commit a7d48f0 (2026-10-27)`, href: `${repository}/commit/${commit}` },
    { label: "Release v0.1.0", href: `${repository}/releases/tag/v0.1.0` },
    { label: "Validation record", href: pinned("docs/validation.md") },
    { label: "Architecture", href: pinned("docs/architecture.md") },
    { label: "Reports and their limits", href: pinned("docs/reports.md") },
    { label: "Tracing", href: pinned("docs/tracing.md") },
    { label: "Portable evidence", href: pinned("docs/evidence.md") },
    { label: "80-second demo (README)", href: `${repository}#watch-the-demo` },
  ],
};
