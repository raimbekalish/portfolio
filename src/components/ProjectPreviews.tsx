import {
  ArrowDown,
  ArrowRight,
  FileText,
  Layers,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

export function AssistantPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`assistant-preview${compact ? " preview-compact" : ""}`}>
      <div className="assistant-top">
        <span className="assistant-symbol" aria-hidden="true">
          a
        </span>
        <strong>
          Arfi <span>Knowledge assistant</span>
        </strong>
        <span className="internal-note">Internal work</span>
      </div>
      <div className="assistant-conversation">
        <p className="preview-question">
          Where can I find the onboarding checklist?
        </p>
        <div className="retrieved-excerpt">
          <span className="tiny-label">
            <FileText aria-hidden="true" /> Retrieved document · Example guide
          </span>
          <p>
            “The onboarding checklist is in the team handbook, under Getting
            started.”
          </p>
        </div>
        <div className="preview-answer">
          <span className="answer-mark" aria-hidden="true">
            a
          </span>
          <p>
            You’ll find it in the team handbook’s{" "}
            <strong>Getting started</strong> section.
            <span className="source-reference">Source: Example guide</span>
          </p>
        </div>
      </div>
      <p className="preview-disclaimer">
        Illustrative preview · Synthetic data
      </p>
    </div>
  );
}

export function VisionPreview() {
  const stages = [
    { icon: Layers, title: "Photos", subtitle: "Mobile submission" },
    {
      icon: ShieldCheck,
      title: "Authenticated API",
      subtitle: "FastAPI · API key",
    },
    {
      icon: ScanLine,
      title: "Vision + validation",
      subtitle: "Local YOLO · heuristics",
    },
    {
      icon: FileText,
      title: "Structured response",
      subtitle: "Eligibility + consistency",
    },
  ];
  return (
    <ol
      className="vision-flow"
      aria-label="Vehicle-photo validation architecture"
    >
      {stages.map(({ icon: Icon, title, subtitle }, i) => (
        <li key={title}>
          <span className="flow-icon">
            <Icon aria-hidden="true" />
          </span>
          <div>
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
          {i < 3 && <ArrowDown className="flow-arrow" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export function PolyPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`poly-preview${compact ? " preview-compact" : ""}`}>
      <div className="analysis-heading">
        <span className="tiny-label">Poly Predictor Kit</span>
        <span className="analysis-mark" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="analysis-route">
        <span className="tiny-label">01 / Market context</span>
        <div className="pipeline-nodes">
          <span>Market data</span>
          <ArrowRight aria-hidden="true" />
          <span className="node-highlight">Gemini</span>
          <ArrowRight aria-hidden="true" />
          <span>Market summary</span>
        </div>
      </div>
      <div className="analysis-route">
        <span className="tiny-label">02 / Community discussion</span>
        <div className="pipeline-nodes">
          <span>Comments</span>
          <ArrowRight aria-hidden="true" />
          <span className="node-highlight">TF-IDF + classifier</span>
          <ArrowRight aria-hidden="true" />
          <span>Comment categories</span>
        </div>
        <div className="category-key">
          <span>Emotional</span>
          <span>Rational</span>
        </div>
      </div>
      <p className="analysis-footnote">
        Separate pipelines. Two ways to understand a market.
      </p>
    </div>
  );
}

export function NovelPreview({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`novel-preview${compact ? " preview-compact" : ""}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/visual-novel.jpg`}
        width="1723"
        height="1080"
        alt="AI Visual Novel Creator project scene: Anya overlooking a city at sunset, with a Ren’Py dialogue panel."
        loading={compact ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>Project screenshot · CodeDay showcase</figcaption>
    </figure>
  );
}
