// R-Finance internship work. Every sentence here is already public on the current site
// (src/components/WorkChapters.tsx); nothing else about the employer is published. No internal
// code, data, names, logos, screenshots or results. The two services are separate projects.
//
// Without the employer's approval (rfinanceDetail in ./permissions) the page shows only `work`: the
// company, the role and each project in one sentence. The service drawings in `services` add the
// internal detail on top, and are shown only once that approval is given.

export type Station = {
  id: string;
  name: string;
  /** Short technical label, as on the current site. */
  meta: string;
  detail: string;
  /** Checks the station runs, listed after the detail. */
  checks?: string[];
  /** What the station draws on, marked on the compact drawing. */
  source?: string;
  /** A caveat that belongs to this station. */
  note?: string;
};

/** A project as the page names it without the employer's approval. */
export type Work = {
  id: "vehicle-photo-api" | "knowledge-assistant";
  key: "A" | "B";
  discipline: string;
  name: string;
  /** What I built, in the first person. */
  statement: string;
};

export type Service = Work & {
  /** What travels through the service: "request" or "question". */
  subject: string;
  /** The request's path through the service, in order. */
  stations: Station[];
  notes: string[];
  /** How the service is tested and shipped, where that is public. */
  delivery?: string[];
};

const vehicle: Work = {
  id: "vehicle-photo-api",
  key: "A",
  discipline: "Computer vision",
  name: "Vehicle-photo validation API",
  statement: "I built an internal API that checks vehicle photos.",
};

const assistant: Work = {
  id: "knowledge-assistant",
  key: "B",
  discipline: "Knowledge & retrieval",
  name: "AI knowledge assistant",
  statement: "I built the dedicated chat interface and document-retrieval backend to answer questions from a document knowledge base.",
};

/** The service drawings: shown only with the employer's approval (rfinanceDetail in ./permissions). */
export const services: Service[] = [
  {
    ...vehicle,
    statement: "I built an internal API that checks vehicle photos submitted through a mobile lending workflow.",
    subject: "request",
    stations: [
      { id: "photos", name: "Vehicle photos", meta: "Mobile submission", detail: "Submitted through a mobile lending workflow." },
      { id: "api", name: "Authenticated API", meta: "FastAPI · API key", detail: "A FastAPI service with API-key authentication." },
      {
        id: "vision",
        name: "Local vision + validation",
        meta: "YOLO · eligibility · consistency",
        detail: "Local YOLO inference supports vehicle detection. These help assess submitted photos:",
        checks: ["Eligibility rules", "Metadata/edit heuristics", "Cross-photo consistency checks", "Batch analysis"],
        note: "Heuristics indicate potential issues; they do not guarantee manipulation detection.",
      },
      { id: "response", name: "Structured response", meta: "REST / OpenAPI", detail: "A structured REST response, with OpenAPI documentation." },
    ],
    notes: [],
    delivery: ["Automated API tests", "Docker", "Helm", "Kubernetes development environment"],
  },
  {
    ...assistant,
    subject: "question",
    stations: [
      { id: "question", name: "Question", meta: "Chat interface", detail: "Asked in a dedicated chat interface." },
      { id: "evidence", name: "Evidence", meta: "Document retrieval", detail: "The retrieval backend finds relevant excerpts in the document knowledge base.", source: "Documents" },
      { id: "answer", name: "Grounded answer", meta: "Answer with context", detail: "Those excerpts provide the context for the answer." },
    ],
    notes: ["My work covered both the interface and the retrieval backend.", "A separate project from the vehicle-photo service."],
  },
];

export const rfinance = {
  slug: "r-finance",
  company: "R-Finance",
  role: "AI/ML Engineering Intern",
  experienceId: "r-finance",
  summary: "Two separate tools for working with photos and document knowledge.",
  confidentiality: "Both projects are internal work. Public source code and demos are unavailable.",
  work: [vehicle, assistant],
};
