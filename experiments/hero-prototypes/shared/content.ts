// Hero copy and project previews for the Phase 2 prototypes.
// Every claim here is marked publishable in docs/content-evidence-ledger.md.
// Restricted items (the holdout metric, the assistant's name, private-repo detail) never appear.

export const identity = {
  name: "Raimbek Alish",
  study: "Computer Science–Mathematics",
  school: "Whitman College",
  graduation: "Expected May 2028",
  statement: "Building software systems, applied AI, and useful products.",
  seeking: "Seeking Summer 2027 software engineering internships",
  links: {
    resume: "https://callmeraim.dev/Raimbek_Alish_Resume.pdf",
    github: "https://github.com/raimbekalish",
    linkedin: "https://www.linkedin.com/in/raimbekalish/",
    email: "raimbekalish@gmail.com",
  },
} as const;

export type ProjectSlug = "r-finance" | "poly-predictor-kit" | "ai-visual-novel-creator" | "promptlock";

/** One input → system → outcome path through a project. */
export type Lane = { input: string; system: string; outcome: string };

export type ProjectPreview = {
  slug: ProjectSlug;
  title: string;
  kind: string;
  context: string;
  /** A verified award when `award` is true; otherwise a neutral descriptor. */
  note: string;
  award: boolean;
  summary: string;
  role: string;
  lanes: Lane[];
};

export const projects: Record<ProjectSlug, ProjectPreview> = {
  "r-finance": {
    slug: "r-finance",
    title: "R-Finance",
    kind: "Internship",
    context: "AI/ML Engineering Intern · 2026",
    note: "Two internal AI services",
    award: false,
    summary: "Vehicle-photo validation and document question answering, built as separate internal services.",
    role: "Built the validation API, and the assistant's chat interface and retrieval backend.",
    lanes: [
      { input: "Vehicle photos", system: "Local vision + validation rules", outcome: "Structured response" },
      { input: "Questions", system: "Retrieval over internal documents", outcome: "Answers with sources" },
    ],
  },
  "poly-predictor-kit": {
    slug: "poly-predictor-kit",
    title: "Poly Predictor Kit",
    kind: "Hackathon · team of five",
    context: "QuackHacks 2.0 · 2025",
    note: "Winner, Polymarket Track",
    award: true,
    summary: "Prediction-market context from event data and community comments.",
    role: "Built the market-summary and comment-classification pipelines.",
    lanes: [
      { input: "Polymarket event data", system: "Gemini summarization", outcome: "Market summary" },
      { input: "Community comments", system: "TF-IDF + logistic regression", outcome: "Comment categories" },
    ],
  },
  "ai-visual-novel-creator": {
    slug: "ai-visual-novel-creator",
    title: "AI Visual Novel Creator",
    kind: "Hackathon · team of six",
    context: "CodeDay Seattle · Fall 2025",
    note: "Generative content pipeline",
    award: false,
    summary: "Turns story prompts into a playable Ren’Py visual novel.",
    role: "Built the content pipeline and integrated scene-image generation.",
    lanes: [
      { input: "Story prompts", system: "Gemini story JSON → Ren’Py script", outcome: "Playable scenes" },
      { input: "Scene descriptions", system: "Stability AI generation", outcome: "Scene art" },
    ],
  },
  promptlock: {
    slug: "promptlock",
    title: "PromptLock",
    kind: "Hackathon · team project",
    context: "NexHacks · 2026",
    note: "Developer tool",
    award: false,
    summary: "Fits long logs, diffs and docs into a fixed token budget.",
    // Contribution wording is pending in the ledger (4.5); this follows the current public site.
    role: "Contributed task-aware compression modes and token-based chunking.",
    lanes: [{ input: "Logs, diffs, docs", system: "Task-aware compression, 2K–16K budget", outcome: "Prompt pack" }],
  },
};

/** Explicit order by slug, never by array position. */
export const featured: ProjectSlug[] = ["r-finance", "poly-predictor-kit", "ai-visual-novel-creator", "promptlock"];

export const describe = (p: ProjectPreview) =>
  `${p.title}: ` + p.lanes.map((lane) => `${lane.input} to ${lane.system} to ${lane.outcome}`).join("; ") + ".";
