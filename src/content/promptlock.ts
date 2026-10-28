// PromptLock, from its public README (github.com/abdirahmanbm01/nexhacks) and Devpost entry. The
// README's marketing claims about savings and semantic loss are unmeasured and are not repeated.
// The contribution wording is the current site's; the résumé's broader wording is still pending.

/** Chunk types, as the README's classifier names them. */
export type ChunkKind = "error" | "log" | "config" | "diff" | "api" | "requirements" | "docs" | "misc";

export const chunkKinds: Record<ChunkKind, { label: string; short: string }> = {
  error: { label: "Error", short: "ERR" },
  log: { label: "Log", short: "LOG" },
  config: { label: "Config", short: "CFG" },
  diff: { label: "Diff", short: "DIFF" },
  api: { label: "API", short: "API" },
  requirements: { label: "Requirements", short: "REQ" },
  docs: { label: "Docs", short: "DOC" },
  misc: { label: "Misc", short: "MISC" },
};

export type PackMode = {
  id: "debug" | "review" | "build" | "docs";
  name: string;
  /** The README's prioritization table: highest and lowest priority types for the mode. */
  highest: ChunkKind[];
  lowest: ChunkKind[];
};

export const modes: PackMode[] = [
  { id: "debug", name: "Debug", highest: ["error", "log"], lowest: ["docs", "misc"] },
  { id: "review", name: "Code review", highest: ["diff", "requirements"], lowest: ["log", "misc"] },
  { id: "build", name: "Build", highest: ["requirements", "api"], lowest: ["log", "misc"] },
  { id: "docs", name: "Docs", highest: ["docs", "requirements"], lowest: ["error", "log"] },
];

/** The README's budget options, in tokens. The packer never exceeds the chosen one. */
export const budgets = [2000, 4000, 8000, 16000];

/** The README splits text into chunks of about this many tokens. */
export const chunkSize = 750;

export type Chunk = { id: string; kind: ChunkKind; source: string; tokens: number };

/**
 * ILLUSTRATIVE input for the budget model: invented chunk sizes for a typical mix of a stack trace,
 * logs, config, diffs and docs. Not PromptLock output, and not a measurement of it.
 */
export const illustrativeInput: Chunk[] = [
  { id: "c01", kind: "error", source: "Stack trace", tokens: 520 },
  { id: "c02", kind: "log", source: "Server log", tokens: 750 },
  { id: "c03", kind: "log", source: "Server log", tokens: 750 },
  { id: "c04", kind: "log", source: "Build log", tokens: 640 },
  { id: "c05", kind: "config", source: "Environment and YAML config", tokens: 410 },
  { id: "c06", kind: "diff", source: "Git diff", tokens: 750 },
  { id: "c07", kind: "diff", source: "Git diff", tokens: 560 },
  { id: "c08", kind: "requirements", source: "Package requirements", tokens: 380 },
  { id: "c09", kind: "api", source: "HTTP endpoints", tokens: 750 },
  { id: "c10", kind: "api", source: "Request and response sample", tokens: 470 },
  { id: "c11", kind: "docs", source: "README section", tokens: 750 },
  { id: "c12", kind: "docs", source: "README section", tokens: 750 },
  { id: "c13", kind: "docs", source: "Code comments", tokens: 600 },
  { id: "c14", kind: "log", source: "Test log", tokens: 750 },
  { id: "c15", kind: "docs", source: "Design notes", tokens: 700 },
  { id: "c16", kind: "misc", source: "Other text", tokens: 450 },
];

export const promptlock = {
  slug: "promptlock",
  team: "Team project",
  problem: "Long logs, diffs, documentation and API payloads exceed an LLM’s useful token budget.",
  /** How the README describes the pipeline, step by step. */
  pipeline: ["Split into ~750-token chunks", "Classify each chunk", "Score by mode", "Compress high-priority chunks", "Pack greedily up to the budget"],
  stack: ["FastAPI backend", "Next.js 15 frontend", "MCP server"],
};
