const BASE_URL = import.meta.env.BASE_URL;

export const profile = {
  name: "Raimbek Alish",
  email: "raimbekalish@gmail.com",
  github: "https://github.com/raimbekalish",
  linkedin: "https://www.linkedin.com/in/raimbekalish/",
  resume: `${BASE_URL}Raimbek_Alish_Resume.pdf`,
};

export const navItems = [
  { href: "#selected-work", label: "Selected Work" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const experiences = [
  {
    company: "Canva",
    role: "AI Design & Data Storytelling Extern",
    location: "Remote",
    date: "Nov – Dec 2025",
    logo: `${BASE_URL}logos/canva.jpg`,
    bullets: [
      "Designed AI-assisted workflows for turning user-research notes into clear data stories and recommendations.",
      "Created customer journey maps, interview guides, field-note trackers, and insight boards to structure research and synthesis.",
      "Reworked recommendation decks around clearer information hierarchy, lower visual noise, and stronger narrative flow.",
    ],
  },
  {
    company: "Bellevue College",
    role: "Computer Science Teaching Assistant",
    location: "Bellevue, WA",
    date: "Sep 2025 – May 2026",
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
    name: "Poly Predictor Kit",
    event: "QuackHacks 2025",
    award: "1st Place · Polymarket Track",
    summary: "Prediction-market analysis across event data, market signals, and community comments.",
    problem: "Prediction-market context is split across odds, event data, and noisy user discussion.",
    contribution: "Contributed Gemini-powered market summaries and an emotional-vs.-rational comment-classification workflow using Gemini-generated labels, Snowflake storage, TF-IDF features, and logistic regression.",
    decision: "Separated market insight and comment classification into modular Python pipelines backed by Polymarket data.",
    result: "Won 1st Place in the Polymarket Track at QuackHacks 2025.",
    tech: ["Python", "Gemini", "Snowflake", "scikit-learn", "TF-IDF", "Logistic Regression", "Polymarket API"],
    repo: "https://github.com/raimbekalish/Poly_Predictor_Kit",
    demo: "https://devpost.com/software/poly-predictor-kit",
  },
  {
    name: "AI Visual Novel Creator",
    event: "CodeDay Seattle 2025",
    award: "1st Place AI Award",
    summary: "A pipeline that turns generated story data and visual assets into a playable Ren'Py project.",
    problem: "Creating a visual novel requires coordinating story generation, scene assets, and game scripting.",
    contribution: "Built the Python content pipeline that transformed generated story data into game-ready Ren'Py files and integrated Stability AI scene-image generation.",
    decision: "Used Gemini for structured story data, then mapped the output into Ren'Py scripts and generated scene assets.",
    result: "Received the 1st Place AI Award at CodeDay Seattle 2025.",
    tech: ["Python", "Gemini", "Stability AI", "Ren'Py"],
    repo: "https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator",
    demo: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6",
  },
  {
    name: "PromptLock",
    event: "NexHacks 2026",
    award: "Developer tool",
    summary: "Task-aware context compression for logs, diffs, documentation, and API payloads.",
    problem: "Long technical inputs can exceed an LLM's token budget or bury the details needed for a task.",
    contribution: "Contributed task-aware compression modes for debugging, code review, builds, and documentation with a FastAPI backend and token-based chunking.",
    decision: "Developed a Next.js and TypeScript interface that surfaces included, excluded, and prioritized context with configurable token budgets.",
    result: "Delivered a working NexHacks project with strict prompt-pack budgets and transparent before-and-after token metrics.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Token chunking"],
    repo: "https://github.com/abdirahmanbm01/nexhacks",
    demo: "https://devpost.com/software/promptlock",
  },
  {
    name: "JiraGenie",
    event: "DubHacks 2025",
    award: "Voice + developer workflow",
    summary: "A voice-enabled assistant for querying, analyzing, and summarizing Jira issues.",
    problem: "Finding useful Jira context often requires filters and repeated issue lookup.",
    contribution: "Contributed the ElevenLabs streaming speech-to-text integration and microphone interface for a natural-language Jira assistant.",
    decision: "Used Forge resolvers for Jira data, Gemini for analysis, and ElevenLabs streaming speech-to-text for voice input.",
    result: "Built and demonstrated at DubHacks 2025.",
    tech: ["Atlassian Forge", "React", "JavaScript", "Gemini", "ElevenLabs", "Jira API"],
    repo: "https://github.com/khyeo1011/dubhacks25",
    demo: "https://devpost.com/software/untitled-project-rw9st8nfkbm3",
  },
];

export const schools = [
  {
    name: "Whitman College",
    degree: "Bachelor of Arts in Computer Science",
    date: "Expected May 2028",
    location: "Walla Walla, WA",
    logo: `${BASE_URL}logos/whitman.jpg`,
  },
  {
    name: "Bellevue College",
    degree: "Associate in Arts and Sciences",
    date: "Completed June 2026",
    location: "Bellevue, WA",
    logo: `${BASE_URL}logos/bellevue.jpg`,
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "TypeScript / JavaScript", "Java", "C++", "SQL"] },
  { label: "AI / ML", items: ["YOLO", "scikit-learn", "PyTorch", "Gemini", "Pandas", "NumPy"] },
  { label: "Backend & data", items: ["FastAPI", "Flask", "Node.js", "REST APIs", "Snowflake"] },
  { label: "Infrastructure", items: ["Docker", "Kubernetes", "Helm", "GitLab CI/CD", "Linux"] },
  { label: "Frontend & tools", items: ["React", "Next.js", "Tailwind CSS", "Vite", "Git / GitHub", "Postman", "Atlassian Forge"] },
];

export const honors = [
  { title: "1st Place, Polymarket Track", organization: "QuackHacks 2025" },
  { title: "1st Place AI Award", organization: "CodeDay Seattle 2025" },
  { title: "Phi Theta Kappa Honor Society", organization: "Bellevue College" },
];
