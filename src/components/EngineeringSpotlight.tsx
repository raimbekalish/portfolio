import { ArrowUpRight } from "lucide-react";
import { AssistantPreview, VisionPreview } from "./ProjectPreviews";

export default function EngineeringSpotlight() {
  return (
    <article
      className="case-study rf-case"
      id="r-finance"
      aria-labelledby="rf-title"
    >
      <header className="case-topline">
        <span className="case-number">01</span>
        <p className="tiny-label">Applied AI / Internal engineering</p>
        <span className="case-status">R-Finance</span>
      </header>
      <div className="case-heading">
        <h3 id="rf-title">
          R-Finance <span>— Applied AI</span>
        </h3>
        <p>
          Two separate tools for working with
          <br /> photos and document knowledge.
        </p>
      </div>
      <div className="rf-grid">
        <div className="rf-assistant">
          <div className="subproject-heading">
            <span className="tiny-label">
              A / Knowledge & retrieval · Internal work
            </span>
            <h4>Arfi, AI knowledge assistant</h4>
            <p>
              I built the dedicated chat interface and document-retrieval
              backend to answer questions from a document knowledge base.
            </p>
          </div>
          <AssistantPreview />
        </div>
        <div className="rf-vision">
          <div className="subproject-heading">
            <span className="tiny-label">
              B / Computer vision · Internal work
            </span>
            <h4>Vehicle-photo validation API</h4>
            <p>
              I built an internal API that checks vehicle photos submitted
              through a mobile lending workflow.
            </p>
          </div>
          <VisionPreview />
        </div>
      </div>
      <details className="case-disclosure">
        <summary>
          <span className="disclosure-label">
            <span className="when-closed">View case study</span>
            <span className="when-open">Close case study</span>
          </span>
          <span className="disclosure-context">Architecture & decisions</span>
          <ArrowUpRight aria-hidden="true" />
        </summary>
        <div className="case-expanded">
          <div>
            <p className="tiny-label">Knowledge assistant</p>
            <h4>Retrieve first. Answer with context.</h4>
            <p>
              The assistant connects a dedicated chat interface to a
              document-retrieval backend. Relevant document excerpts provide the
              context for an answer. My work covered both the interface and the
              retrieval backend.
            </p>
            <p>
              The example above is a static illustration using synthetic
              content. The assistant is a separate project from the
              vehicle-photo service.
            </p>
          </div>
          <div>
            <p className="tiny-label">Vehicle-photo API</p>
            <h4>Validation beyond a single detection.</h4>
            <p>
              Local YOLO inference supports vehicle detection. Eligibility
              rules, metadata/edit heuristics, cross-photo consistency checks,
              and batch analysis help assess submitted photos. Heuristics
              indicate potential issues; they do not guarantee manipulation
              detection.
            </p>
            <p>
              I built API-key authentication, REST/OpenAPI documentation, and
              automated API testing. I containerized the service with Docker and
              deployed it to a Kubernetes development environment using Helm.
            </p>
          </div>
          <p className="internal-disclosure">
            Both projects are internal work. Public source code and demos are
            unavailable.
          </p>
        </div>
      </details>
    </article>
  );
}
