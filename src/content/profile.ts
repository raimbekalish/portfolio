// Experience highlights, skills evidence, recognition and the about copy for the redesign. Roles,
// dates, schools and honors stay in src/data.ts; this module adds only already-public wording:
// the current site, the public résumé PDF, and public project pages.

import type { experiences } from "../data";

type ExperienceId = (typeof experiences)[number]["id"];

/**
 * What each role involved. R-Finance and the first teaching line are the current site's wording;
 * the Canva lines and the second teaching line are the résumé's (the ledger prefers the résumé's
 * two Canva lines to the site's longer list).
 */
export const roleHighlights: Record<ExperienceId, string[]> = {
  "r-finance": ["Built an internal vehicle-photo validation API and a separate document-based AI knowledge assistant."],
  canva: [
    "Synthesized user research into customer journey maps, insight boards, and recommendation decks to communicate product and design findings.",
    "Used AI-assisted storytelling workflows to restructure information, reduce visual noise, and improve narrative flow in final presentations.",
  ],
  "bellevue-ta": [
    "Tutored 50+ students in CS 210 and CS 211 across Java, object-oriented design, arrays and ArrayLists, recursion, and data structures.",
    "Worked one-on-one with students to diagnose logic and runtime errors and improve their approach to implementing and testing code.",
  ],
};

/** Where a skill was used in my own part of the work. */
export type EvidenceContext = { id: string; label: string; note: string; href: string };

export const evidenceContexts: EvidenceContext[] = [
  { id: "poly-predictor-kit", label: "Poly Predictor Kit", note: "Summarizer and classifier pipelines", href: "#poly-predictor-kit" },
  { id: "reproseed", label: "ReproSeed", note: "Personal project, AI-assisted", href: "#reproseed" },
  { id: "r-finance", label: "R-Finance", note: "Vehicle-photo API", href: "#r-finance" },
  { id: "ai-visual-novel-creator", label: "Visual Novel Creator", note: "Script and image pipeline", href: "#ai-visual-novel-creator" },
  { id: "promptlock", label: "PromptLock", note: "Modes, backend, interface", href: "#promptlock" },
  { id: "jiragenie", label: "JiraGenie", note: "Voice input server", href: "#jiragenie" },
  { id: "teaching", label: "Teaching", note: "CS 210 and 211", href: "#experience" },
  { id: "this-site", label: "This site", note: "Public repository", href: "https://github.com/raimbekalish/portfolio" },
];

type ContextId = "r-finance" | "poly-predictor-kit" | "reproseed" | "ai-visual-novel-creator" | "promptlock" | "jiragenie" | "teaching" | "this-site";

/**
 * Each skill with the contexts where my described contribution used it. Sources: the current site's
 * project and R-Finance text, the Poly Predictor Kit repository (my market summarization and comment-classification pipelines), my commits in the
 * JiraGenie repository (a Node/Express server and browser speech-to-text in JavaScript), the
 * ReproSeed repository (TypeScript on Node.js with Playwright; AI-assisted, as its commits credit),
 * and this repository.
 */
export const skillEvidence: { group: string; skills: { name: string; used: ContextId[] }[] }[] = [
  {
    group: "Languages",
    skills: [
      { name: "Python", used: ["r-finance", "poly-predictor-kit", "ai-visual-novel-creator", "promptlock"] },
      { name: "TypeScript", used: ["reproseed", "promptlock", "this-site"] },
      { name: "JavaScript", used: ["jiragenie"] },
      { name: "Java", used: ["teaching"] },
    ],
  },
  {
    group: "AI & data",
    skills: [
      { name: "YOLO", used: ["r-finance"] },
      { name: "scikit-learn", used: ["poly-predictor-kit"] },
      { name: "Gemini", used: ["poly-predictor-kit"] },
      { name: "Snowflake", used: ["poly-predictor-kit"] },
      { name: "Stability AI", used: ["ai-visual-novel-creator"] },
    ],
  },
  {
    group: "Backend",
    skills: [
      { name: "FastAPI", used: ["r-finance", "promptlock"] },
      { name: "REST / OpenAPI", used: ["r-finance"] },
      { name: "Node.js", used: ["reproseed", "jiragenie"] },
    ],
  },
  {
    group: "Testing",
    skills: [{ name: "Playwright", used: ["reproseed"] }],
  },
  {
    group: "Interfaces",
    skills: [
      { name: "React", used: ["this-site"] },
      { name: "Next.js", used: ["promptlock"] },
      { name: "Vite", used: ["this-site"] },
    ],
  },
  {
    group: "Infrastructure",
    skills: [
      { name: "Docker", used: ["r-finance"] },
      { name: "Kubernetes", used: ["r-finance"] },
      { name: "Helm", used: ["r-finance"] },
    ],
  },
];

/** Listed on the current site, without a project shown here to point to. */
export const alsoUsed = ["C++", "SQL", "Pandas", "Flask", "Git", "Linux"];

/**
 * Hackathon entries and their outcomes, each with its public evidence, in chronological order (from
 * the public repositories' commit dates: Oct 2025, Nov 2025, Nov 2025, Jan 2026). Only the
 * QuackHacks result is an award; the CodeDay showcase lists the project without one.
 */
export const hackathons = [
  { event: "DubHacks 2025", project: "jiragenie", outcome: "Hackathon entry", award: false, evidence: "https://devpost.com/software/untitled-project-rw9st8nfkbm3", evidenceLabel: "Devpost" },
  { event: "CodeDay Seattle 2025", project: "ai-visual-novel-creator", outcome: "Showcase project", award: false, evidence: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6", evidenceLabel: "CodeDay showcase" },
  { event: "QuackHacks 2025", project: "poly-predictor-kit", outcome: "Winner, Polymarket Track", award: true, evidence: "https://devpost.com/software/poly-predictor-kit", evidenceLabel: "Devpost" },
  { event: "NexHacks 2026", project: "promptlock", outcome: "Hackathon entry", award: false, evidence: "https://devpost.com/software/promptlock", evidenceLabel: "Devpost" },
];

/** The current site's about copy. */
export const about = {
  heading: { lead: "Curious about", accent: "the whole thing." },
  paragraphs: [
    "I study computer science and mathematics at Whitman College. I like working across the model, the API, and the interface—and carrying an idea beyond the demo.",
    "Teaching computer science has also made me care about how I explain a system, not just how I build it.",
  ],
};
