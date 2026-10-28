const BASE_URL = import.meta.env.BASE_URL;

export const profile = {
  name: "Raimbek Alish",
  email: "raimbekalish@gmail.com",
  github: "https://github.com/raimbekalish",
  linkedin: "https://www.linkedin.com/in/raimbekalish/",
  resume: `${BASE_URL}Raimbek_Alish_Resume.pdf`,
  statement: "Building software systems, applied AI, and useful products.",
  availability: "Summer 2027 software engineering internships",
};

export const navItems = [
  { href: "#selected-work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const experiences = [
  {
    id: "r-finance",
    company: "R-Finance",
    role: "AI/ML Engineering Intern",
    location: "Remote",
    date: "Jun 2026 – Present",
    // Structured dates (YYYY-MM) for timelines; null means the role is current.
    start: "2026-06",
    end: null,
    logo: "",
    bullets: [
      "Built an internal vehicle-photo validation API and a separate document-based AI knowledge assistant.",
    ],
  },
  {
    id: "canva",
    company: "Canva",
    role: "AI Design & Data Storytelling Extern",
    location: "Remote",
    date: "Nov – Dec 2025",
    start: "2025-11",
    end: "2025-12",
    logo: `${BASE_URL}logos/canva.jpg`,
    bullets: [
      "Designed AI-assisted workflows for turning user-research notes into clear data stories and recommendations.",
      "Created customer journey maps, interview guides, field-note trackers, and insight boards to structure research and synthesis.",
      "Reworked recommendation decks around clearer information hierarchy, lower visual noise, and stronger narrative flow.",
    ],
  },
  {
    id: "bellevue-ta",
    company: "Bellevue College",
    role: "Computer Science Teaching Assistant",
    location: "Bellevue, WA",
    date: "Sep 2025 – May 2026",
    start: "2025-09",
    end: "2026-05",
    logo: `${BASE_URL}logos/bellevue.jpg`,
    bullets: [
      "Tutored 50+ students in CS 210 and CS 211 across Java, object-oriented design, arrays and ArrayLists, recursion, and data structures.",
      "Guided debugging, assignment review, and exam preparation by breaking programming problems into testable steps.",
      "Coached students on isolating logic errors, writing targeted tests, and structuring clearer code.",
    ],
  },
];

export const projects = [
  {
    slug: "poly-predictor-kit",
    name: "Poly Predictor Kit",
    event: "QuackHacks 2025",
    // Devpost lists six creators and the repository five commit authors, so no head count is claimed.
    team: "Team project",
    // Verified on Devpost: https://devpost.com/software/poly-predictor-kit
    recognition: {
      title: "Winner, Polymarket Track",
      event: "QuackHacks 2025",
      evidence: "https://devpost.com/software/poly-predictor-kit",
    },
    award: "Winner, Polymarket Track — QuackHacks 2025",
    summary:
      "Prediction-market analysis across event data, market signals, and community comments.",
    problem:
      "Prediction-market context is split across odds, event data, and noisy user discussion.",
    contribution:
      "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025.",
    decision:
      "Market data feeds Gemini-powered summaries. A separate comment pipeline uses TF-IDF and logistic regression to distinguish emotional and rational comments. Gemini-generated labels support data preparation, with Snowflake used for storage.",
    result: "Winner, Polymarket Track — QuackHacks 2025.",
    tech: [
      "Python",
      "Gemini",
      "Snowflake",
      "scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "Polymarket API",
    ],
    repo: "https://github.com/raimbekalish/Poly_Predictor_Kit",
    demo: "https://devpost.com/software/poly-predictor-kit",
  },
  {
    slug: "ai-visual-novel-creator",
    name: "AI Visual Novel Creator",
    event: "CodeDay Seattle 2025",
    // No award: the public CodeDay showcase lists the project without one (ledger section 3).
    award: "Showcase project · CodeDay Seattle 2025",
    summary:
      "A pipeline that turns generated story data and visual assets into a playable Ren’Py project.",
    problem:
      "Creating a visual novel requires coordinating story generation, scene assets, and game scripting.",
    contribution:
      "Built the Python content pipeline that transformed generated story data into game-ready Ren’Py files and integrated Stability AI scene-image generation.",
    decision:
      "Used Gemini for structured story data, then mapped the output into Ren’Py scripts and generated scene assets.",
    result:
      "Created as a team project at CodeDay Seattle 2025 and listed on the CodeDay showcase.",
    tech: ["Python", "Gemini", "Stability AI", "Ren’Py"],
    repo: "https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator",
    /** Not linked anywhere until the key owner confirms a potentially exposed credential was rotated or revoked (evidence ledger, 4.4). */
    sourceWithheld: true,
    demo: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6",
  },
  {
    slug: "promptlock",
    name: "PromptLock",
    event: "NexHacks 2026",
    award: "Developer tool",
    summary:
      "Task-aware context compression for logs, diffs, documentation, and API payloads.",
    problem:
      "Long technical inputs can exceed an LLM's token budget or bury the details needed for a task.",
    contribution:
      "Contributed task-aware compression modes for debugging, code review, builds, and documentation with a FastAPI backend and token-based chunking.",
    decision:
      "Developed a Next.js and TypeScript interface that surfaces included, excluded, and prioritized context with configurable token budgets.",
    result:
      "Delivered a working NexHacks project with strict prompt-pack budgets and transparent before-and-after token metrics.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Token chunking"],
    repo: "https://github.com/abdirahmanbm01/nexhacks",
    demo: "https://devpost.com/software/promptlock",
  },
  {
    slug: "faultline",
    name: "Faultline",
    event: "Personal project",
    award: "Reliability tooling",
    summary:
      "Local-first reliability experiments: slow one dependency of a sample service on purpose, record what each request saw, and keep portable evidence.",
    problem:
      "A timeout is hard to reason about until the fault can be reproduced, the failed requests seen and the recovery confirmed.",
    contribution:
      "Developed with AI-assisted coding tools: a Go engine that adds owned Toxiproxy latency, measures baseline, fault and recovery, keeps SQLite history, and exports evidence bundles that can be verified offline.",
    decision:
      "Faults target only the project's own isolated sample services; every injected fault has an ownership identifier, a bounded duration and cleanup.",
    result:
      "Released v0.1.0 of the offline evidence tool; experiments run locally from source with Docker.",
    tech: ["Go", "Docker Compose", "Toxiproxy", "OpenTelemetry", "SQLite", "React"],
    repo: "https://github.com/raimbekalish/faultline",
    demo: "https://github.com/raimbekalish/faultline#watch-the-demo",
  },
];

export const schools = [
  {
    id: "whitman",
    name: "Whitman College",
    degree: "Computer Science–Mathematics",
    date: "Expected May 2028",
    location: "Walla Walla, WA",
    logo: `${BASE_URL}logos/whitman.jpg`,
  },
  {
    id: "bellevue-college",
    name: "Bellevue College",
    degree: "Associate in Arts and Sciences",
    date: "Completed June 2026",
    location: "Bellevue, WA",
    logo: `${BASE_URL}logos/bellevue.jpg`,
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
  },
  {
    label: "AI & data",
    items: ["YOLO", "scikit-learn", "Gemini", "Pandas", "Snowflake"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Flask", "Node.js", "REST / OpenAPI"],
  },
  { label: "Interfaces", items: ["React", "Next.js", "Vite"] },
  {
    label: "Infrastructure",
    items: ["Docker", "Kubernetes", "Helm", "Git", "Linux"],
  },
];

export const honors = [
  { title: "Winner, Polymarket Track", organization: "QuackHacks 2025" },
  { title: "Phi Theta Kappa Honor Society", organization: "Bellevue College" },
];
