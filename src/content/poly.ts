// Poly Predictor Kit, from its public repository (github.com/raimbekalish/Poly_Predictor_Kit) read at
// commit 475fcd9 (2025-11-18) and its public Devpost page, read on 2026-10-24. Every architecture
// claim below was checked against the Python services and the extension, not only the README.
//
// Attribution: Raimbek developed two of the project's pipelines, market summarization and comment
// classification, within the team project. The extension, the insight service around the
// summarizer, the steamroller detector and the web page are credited to the team.
//
// Not claimed anywhere: model accuracy, users, trading results, a deployment.

import type { Evidence } from "./evidence";

const REPO = "https://github.com/raimbekalish/Poly_Predictor_Kit";
const COMMIT = "475fcd9473bd71f7016448fdd60d12f6a842e294";
/** A file in the repository at the commit this page describes. */
const file = (path: string, line?: number) => `${REPO}/blob/${COMMIT}/${path}${line ? `#L${line}` : ""}`;

export const evidence = {
  verified: {
    label: "Verified in code",
    detail: "Read in the public repository at commit 475fcd9: its Python services, extension and README.",
    tone: "plain",
  },
  record: {
    label: "Public record",
    detail: "From the project's Devpost page and the repository's commit history, read on 2026-10-24.",
    tone: "accent",
  },
  illustration: {
    label: "Conceptual illustration",
    detail: "Drawn to explain the architecture in the code. Not the extension's interface and not market data.",
    tone: "muted-dashed",
  },
  computed: {
    label: "Computed in your browser",
    detail: "The steamroller detector's own formula, evaluated here for a probability you choose. No market data and no model.",
    tone: "accent-dashed",
  },
  notClaimed: {
    label: "Not claimed",
    detail: "Stated in the README or on Devpost but not supported by the code, or simply not measured.",
    tone: "muted",
  },
} as const satisfies Record<string, Evidence>;

export type PolyEvidence = keyof typeof evidence;

export const poly = {
  slug: "poly-predictor-kit",
  name: "Poly Predictor Kit",
  thesis: "Understanding markets means understanding both the numbers and the conversation.",
  /** The two halves of the thesis that the page sets in its two signal colours. */
  numbers: "the numbers",
  conversation: "the conversation",
  summary:
    "A Chrome extension and three local Python services that read a Polymarket event: a Gemini summary of what its prices imply, a classifier's read of whether its comments are emotional or rational, and a check for lopsided risk.",
  award: { title: "Winner, Polymarket Track", event: "QuackHacks 2025", evidence: "https://devpost.com/software/poly-predictor-kit" },
  /** Devpost lists these six creators; five of them appear as commit authors. */
  team: ["Umar Turdumambetov", "Bekzat Uraimov", "Shamil Khamrayev", "Akan Abdireshov", "Zhanbolot Eraliev", "Raimbek Alish"],
  /** Raimbek's contribution, in Raimbek's own wording. */
  contribution:
    "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025.",
  /** The same, short enough for a facts row or the hero. */
  myPart: "The Gemini-powered market summarization and TF-IDF / logistic-regression comment-classification pipelines.",
  /** Where each of Raimbek's pipelines lives in the repository. */
  myPartEvidence: { commit: "5f34cdf", date: "2025-11-15", url: `${REPO}/commit/5f34cdf`, file: file("poly_event_ai_summarizer.py") },
  classifierCode: [
    { label: "geminiAutoLabelAssigner.py", href: file("Emotional_Damage_Predictor/geminiAutoLabelAssigner.py") },
    { label: "train_model_snowflake.py", href: file("Emotional_Damage_Predictor/train_model_snowflake.py") },
    { label: "main_api.py", href: file("Emotional_Damage_Predictor/main_api.py") },
  ],
  stack: ["Python", "Flask", "Gemini API", "Polymarket Gamma API", "scikit-learn", "Snowflake (Snowpark)", "Chrome extension"],
  status: "Built in November 2025 at QuackHacks. Runs locally: the extension calls three Flask services on ports 5000–5002. Not deployed.",
  source: REPO,
  commit: { sha: "475fcd9", date: "2025-11-18", url: `${REPO}/commit/${COMMIT}` },
  devpost: "https://devpost.com/software/poly-predictor-kit",
  /** The team's demo video, linked from the README and Devpost. Linked, not embedded. */
  video: "https://www.youtube.com/watch?v=D5dor810nkQ",
};

// --- The system ----------------------------------------------------------------------------------

/** "numbers" are the market's prices and volumes; "conversation" is its comments. */
export type Channel = "numbers" | "conversation";

export type Stage = {
  id: string;
  /** Where it sits in the flow. */
  role: "trigger" | "service" | "data" | "processing" | "model" | "store" | "output";
  name: string;
  /** One line under the name. */
  short: string;
  input: string;
  does: string;
  output: string;
  /** "raimbek": a stage of one of Raimbek's pipelines; "team": a team component, such as the extension. */
  by: "raimbek" | "team";
  byNote: string;
  files: { label: string; href: string }[];
};

export type Pipeline = {
  id: "insight" | "classifier" | "steamroller" | "training";
  name: string;
  channel: Channel;
  /** When it runs: when a visitor presses an extension button, or beforehand, to prepare the classifier. */
  time: "runtime" | "preparation";
  /** Set on the pipelines Raimbek contributed; the others are team components. */
  owner?: "raimbek";
  /** The extension button that starts it, for runtime pipelines. */
  button?: string;
  /** What the visitor reads afterwards: the code's own message format, or a description of free text. */
  answer?: { text: string; format: "template" | "description" };
  summary: string;
  stages: Stage[];
};

const popup = { label: "popup.js", href: file("popup.js") };

export const pipelines: Pipeline[] = [
  {
    id: "insight",
    name: "Market insight",
    channel: "numbers",
    time: "runtime",
    owner: "raimbek",
    button: "Poly AI Summarizer",
    answer: { text: "3–6 sentences of plain text: what current prices imply, one or two risks that could change the odds, both sides of the view, and a reminder that it is not financial advice.", format: "description" },
    summary: "The event's markets and prices become a structured prompt; Gemini writes a short, hedged summary of what they imply.",
    stages: [
      {
        id: "insight-trigger",
        role: "trigger",
        name: "Extension button",
        short: "“Poly AI Summarizer”",
        input: "The Polymarket event open in the active tab.",
        does: "Reads the event's slug from the tab's address and posts it to the local insight service.",
        output: "A request to POST /ai-insight on port 5002.",
        by: "team",
        byNote: "The team's extension.",
        files: [popup],
      },
      {
        id: "insight-service",
        role: "service",
        name: "Insight service",
        short: "Flask · POST /ai-insight",
        input: "The event slug.",
        does: "Passes the slug to the summarizer module and returns its text, or an error.",
        output: "JSON with the insight text.",
        by: "team",
        byNote: "A team component: the Flask service that wraps the summarizer for the extension.",
        files: [{ label: "ai_insight_api.py", href: file("ai_insight_api.py") }],
      },
      {
        id: "insight-data",
        role: "data",
        name: "Event and markets",
        short: "Gamma API",
        input: "A Polymarket URL, slug, numeric id or search phrase.",
        does: "Resolves the event through GET /events/slug/{slug}, /events/{id} or /public-search, then keeps up to three of its markets, open ones first.",
        output: "The event's title, status, end date and volume, and each market's question, status, volume, outcomes and outcome prices.",
        by: "raimbek",
        byNote: "Part of Raimbek's market summarization pipeline.",
        files: [{ label: "poly_event_ai_summarizer.py", href: file("poly_event_ai_summarizer.py", 112) }],
      },
      {
        id: "insight-prompt",
        role: "processing",
        name: "Structured prompt",
        short: "Prices read as probabilities",
        input: "The event and its markets.",
        does: "Parses outcome prices, which the Gamma API stores as JSON strings, and writes each as a price and an implied percentage beside its question, status and volume.",
        output: "A plain-text prompt with the market data and the writing rules.",
        by: "raimbek",
        byNote: "Part of Raimbek's market summarization pipeline.",
        files: [{ label: "poly_event_ai_summarizer.py", href: file("poly_event_ai_summarizer.py", 356) }],
      },
      {
        id: "insight-model",
        role: "model",
        name: "Gemini",
        short: "gemini-2.5-flash · REST",
        input: "The prompt.",
        does: "Generates 3–6 sentences on what current prices imply, one or two risks that could move the odds, and both sides of the view. The prompt forbids buy or sell instructions and position sizes, and asks for a not-financial-advice reminder.",
        output: "Plain text.",
        by: "raimbek",
        byNote: "Part of Raimbek's market summarization pipeline.",
        files: [{ label: "poly_event_ai_summarizer.py", href: file("poly_event_ai_summarizer.py", 423) }],
      },
      {
        id: "insight-output",
        role: "output",
        name: "AI Trade Insight",
        short: "Shown in the popup",
        input: "Gemini's text.",
        does: "The popup shows it as returned.",
        output: "A short, hedged summary of the market's expectations and risks.",
        by: "team",
        byNote: "Displayed by the team's extension.",
        files: [popup],
      },
    ],
  },
  {
    id: "classifier",
    name: "Comment classifier",
    channel: "conversation",
    time: "runtime",
    owner: "raimbek",
    button: "Emotional Damage Predictor",
    answer: { text: "From comments provided it seems like the event might be based on Emotions: N%", format: "template" },
    summary: "Every comment on the event is labeled by a saved scikit-learn model; the result is the share of emotional against rational comments.",
    stages: [
      {
        id: "classifier-trigger",
        role: "trigger",
        name: "Extension button",
        short: "“Emotional Damage Predictor”",
        input: "The event open in the active tab.",
        does: "Posts the event's address to the local classifier service.",
        output: "A request to POST /analyze on port 5000.",
        by: "team",
        byNote: "The team's extension.",
        files: [popup],
      },
      {
        id: "classifier-data",
        role: "data",
        name: "Comments",
        short: "Gamma API · /comments",
        input: "The event's slug, resolved to its id.",
        does: "Pages through GET /comments for the event, 100 at a time, and keeps each comment's text.",
        output: "A list of comment bodies.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "commentsReceiver.py", href: file("Emotional_Damage_Predictor/commentsReceiver.py") }],
      },
      {
        id: "classifier-model",
        role: "model",
        name: "Saved classifier",
        short: "TF-IDF + logistic regression",
        input: "Each comment's text.",
        does: "Loads the trained scikit-learn pipeline from comment_classifier.pkl and predicts one label per comment. No Gemini call happens here.",
        output: "EMOTIONAL, RATIONAL or SPAM for each comment.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "main_api.py", href: file("Emotional_Damage_Predictor/main_api.py") }],
      },
      {
        id: "classifier-output",
        role: "output",
        name: "Emotional or rational",
        short: "A share, spam left out",
        input: "The labels.",
        does: "Counts emotional and rational comments, ignores spam, and reports the larger share.",
        output: "“From comments provided it seems like the event might be based on Emotions: N%”, or Rationalism, or an even split.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "main_api.py", href: file("Emotional_Damage_Predictor/main_api.py") }],
      },
    ],
  },
  {
    id: "steamroller",
    name: "Steamroller check",
    channel: "numbers",
    time: "runtime",
    button: "Steamroller Check",
    answer: { text: "SIDE looks like a steamroller trade. Current implied probability is about P%. At this price, one loss wipes roughly N average wins. There are about D days left until resolution.", format: "template" },
    summary: "A rule, not a model: flags an outcome whose price leaves a tiny upside and a huge downside.",
    stages: [
      {
        id: "steamroller-trigger",
        role: "trigger",
        name: "Extension button",
        short: "“Steamroller Check”",
        input: "The event open in the active tab.",
        does: "Calls the local steamroller service with the event's slug.",
        output: "A request to GET /api/steamroller on port 5001.",
        by: "team",
        byNote: "The team's extension.",
        files: [popup],
      },
      {
        id: "steamroller-data",
        role: "data",
        name: "Outcome prices",
        short: "Gamma API · first active market",
        input: "The event slug.",
        does: "Fetches the event and takes its first active market's outcomes and prices.",
        output: "Each outcome's implied probability and the days left to resolution.",
        by: "team",
        byNote: "A team component.",
        files: [{ label: "main_steamroller.py", href: file("main_steamroller.py", 184) }],
      },
      {
        id: "steamroller-rules",
        role: "processing",
        name: "Risk rules",
        short: "Wipeout factor p ÷ (1 − p)",
        input: "Each outcome's probability p.",
        does: "Per $1: the gain is 1 − p and the loss is p, so one loss erases p ÷ (1 − p) wins. A side is flagged when p is at least 0.9 and that factor at least 10; its score is weighted up when resolution is more than three days away.",
        output: "The flagged side, if any, and a risk level.",
        by: "team",
        byNote: "A team component.",
        files: [{ label: "main_steamroller.py", href: file("main_steamroller.py", 58) }],
      },
      {
        id: "steamroller-output",
        role: "output",
        name: "Risk message",
        short: "Plain language",
        input: "The flagged side.",
        does: "Writes the side, its implied probability, how many wins one loss erases, and the days left.",
        output: "For example: “YES looks like a steamroller trade …”, or “No clear steamroller pattern”.",
        by: "team",
        byNote: "A team component.",
        files: [{ label: "main_steamroller.py", href: file("main_steamroller.py", 112) }],
      },
    ],
  },
  {
    id: "training",
    name: "Preparing the classifier",
    channel: "conversation",
    time: "preparation",
    owner: "raimbek",
    summary: "Before the classifier can label anything, comments are collected, labeled by Gemini, stored in Snowflake and used to train it.",
    stages: [
      {
        id: "training-collect",
        role: "data",
        name: "Collect comments",
        short: "Gamma API · one event",
        input: "A Polymarket event link.",
        does: "Downloads every comment on the event.",
        output: "data.json: the comment bodies.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "commentsReceiver.py", href: file("Emotional_Damage_Predictor/commentsReceiver.py") }],
      },
      {
        id: "training-label",
        role: "model",
        name: "Gemini labels",
        short: "Training labels only",
        input: "Unlabeled comments, 20 at a time.",
        does: "Asks Gemini 2.5 Flash to label each comment EMOTIONAL, RATIONAL or SPAM from three short definitions, answering in JSON. These labels are training data; Gemini is not used when the extension runs.",
        output: "data_labeled.json: each comment with a label.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "geminiAutoLabelAssigner.py", href: file("Emotional_Damage_Predictor/geminiAutoLabelAssigner.py") }],
      },
      {
        id: "training-store",
        role: "store",
        name: "Snowflake table",
        short: "COMMENT_LABELS_DATA",
        input: "The labeled comments.",
        does: "Appends BODY and LABEL rows to a Snowflake table through Snowpark. Snowflake stores the training data; it does not train the model.",
        output: "A growing table of labeled comments.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "upload_to_snowflake.py", href: file("Emotional_Damage_Predictor/upload_to_snowflake.py") }],
      },
      {
        id: "training-fit",
        role: "processing",
        name: "Train",
        short: "scikit-learn, locally",
        input: "The table, read back through Snowpark into pandas.",
        does: "Splits 80/20 with the labels' proportions kept, fits TfidfVectorizer followed by LogisticRegression, and prints a classification report. No scores are published.",
        output: "A fitted pipeline.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "train_model_snowflake.py", href: file("Emotional_Damage_Predictor/train_model_snowflake.py") }],
      },
      {
        id: "training-save",
        role: "output",
        name: "Model file",
        short: "comment_classifier.pkl",
        input: "The fitted pipeline.",
        does: "Saves it with joblib. The runtime service loads this file. After each analysis that service also appends its own labels to the table and retrains, so later training data includes the model's own labels.",
        output: "The file the comment classifier uses.",
        by: "raimbek",
        byNote: "Part of Raimbek's comment-classification pipeline.",
        files: [{ label: "comment_classifier.pkl", href: file("comment_classifier.pkl") }],
      },
    ],
  },
];

/** The three label definitions, verbatim from the Gemini labeling prompt. */
export const labelDefinitions = [
  { label: "EMOTIONAL", text: "emotion-heavy, opinions, little/no reasoning." },
  { label: "RATIONAL", text: "uses reasoning, facts, or structure to support claims." },
  { label: "SPAM", text: "off-topic, self-promo, nonsense, low-effort, \"gm\", etc." },
];

/** Short excerpts of the public code, verbatim with their line numbers, for the chapters. */
export const excerpts = {
  rules: {
    file: "poly_event_ai_summarizer.py",
    href: file("poly_event_ai_summarizer.py", 406),
    lines: [
      { n: 406, text: "Using this information, write a short AI Trade Insight section in 3–6 sentences." },
      { n: 407, text: "" },
      { n: 408, text: "Focus on:" },
      { n: 409, text: "- What current prices roughly imply about market expectations." },
      { n: 410, text: "- 1–2 key scenarios or risk factors that could change the odds." },
      { n: 411, text: "- A balanced view that mentions both upside and downside perspectives." },
      { n: 412, text: "" },
      { n: 413, text: "Rules:" },
      { n: 414, text: "- Do NOT give explicit instructions like \"you should buy\" or \"sell now\"." },
      { n: 415, text: "- Do NOT mention specific position sizes." },
      { n: 416, text: "- Explicitly remind the reader that this is NOT financial advice." },
    ],
  },
  pipeline: {
    file: "Emotional_Damage_Predictor/train_model_snowflake.py",
    href: file("Emotional_Damage_Predictor/train_model_snowflake.py", 48),
    lines: [
      { n: 48, text: "    model = Pipeline([" },
      { n: 49, text: "        (\"tfidf\", TfidfVectorizer())," },
      { n: 50, text: "        (\"clf\", LogisticRegression(max_iter=1000))," },
      { n: 51, text: "    ])" },
    ],
  },
};

/** The steamroller detector's thresholds (main_steamroller.py), for the calculator. */
export const steamroller = { minProbability: 0.9, minWipeout: 10, file: file("main_steamroller.py", 112) };

/** What the README or Devpost says that the code does not support, and what is simply not measured. */
export const checks = [
  {
    claim: "README: “Snowflake (Snowpark ML training)” and “continuous retraining through Snowflake”.",
    finding: "Snowpark writes and reads the table of labeled comments; the model is trained locally with scikit-learn. The retraining runs inside each analysis request, on the classifier's own labels.",
  },
  {
    claim: "Devpost: the steamroller check “uses liquidity”.",
    finding: "The code uses implied probability, the wipeout factor and days to resolution. Liquidity is not read.",
  },
  {
    claim: "README: an example verdict, “The event looks 67% Emotional.”",
    finding: "An example of the message format. No classifier results or accuracy figures are published, and none are shown here.",
  },
  {
    claim: "A web front page (index.html) with three feature cards.",
    finding: "Its API addresses are placeholders, so it is not wired to the services. The working interface is the extension's popup.",
  },
];

/** Stated plainly on the page: not part of what the project claims or what this page shows. */
export const notClaimed = [
  "Model accuracy. The training script prints a report, but no scores are published.",
  "Trading results, recommendations or advice. Nothing on this page trades or recommends; the summary's own prompt rules out buy or sell instructions.",
  "A deployment. The services run locally on ports 5000–5002.",
  "Running or sharing the trained classifier. This page explains it; it does not run it.",
];

export const caseStudy = {
  path: "/work/poly-predictor-kit/",
  title: "Poly Predictor Kit: the numbers and the conversation — Raimbek Alish",
  description:
    "Case study of Poly Predictor Kit (Winner, Polymarket Track — QuackHacks 2025), a team project in which Raimbek developed the Gemini-powered market summarization and TF-IDF / logistic-regression comment-classification pipelines. How each pipeline works, from the code.",
  image: {
    path: "/og/poly-predictor-kit.png",
    alt: "Poly Predictor Kit case study: a Polymarket event splitting into its numbers and its conversation, each with its own pipeline.",
    width: 1200,
    height: 630,
  },
};
