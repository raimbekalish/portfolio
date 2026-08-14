import { Check, LockKeyhole } from "lucide-react";

const contributions = [
  {
    label: "Vision validation",
    detail: "Implemented YOLO-based vehicle detection, passenger-car eligibility checks, image metadata/edit heuristics, cross-photo consistency checks, and batch analysis endpoints.",
  },
  {
    label: "API & security",
    detail: "Designed the FastAPI service with X-API-Key authentication, REST/OpenAPI documentation, and 31 automated tests.",
  },
  {
    label: "Delivery",
    detail: "Containerized the service with Docker and deployed it to a Kubernetes development environment using Helm and GitLab CI/CD.",
  },
];

const architecture = [
  { step: "01", title: "Mobile submission", detail: "Vehicle photo batch" },
  { step: "02", title: "Authenticated API", detail: "FastAPI · X-API-Key" },
  { step: "03", title: "Validation pipeline", detail: "YOLO · rules · heuristics" },
  { step: "04", title: "Structured result", detail: "Eligibility + consistency" },
];

const stack = ["FastAPI", "YOLO", "REST / OpenAPI", "Docker", "Kubernetes", "Helm", "GitLab CI/CD", "Testing"];

export default function EngineeringSpotlight() {
  return (
    <section className="site-section selected-work" id="selected-work" aria-labelledby="selected-work-title">
      <div className="container">
        <header className="section-header">
          <p className="section-index">01 / Selected work</p>
          <div>
            <h2 id="selected-work-title">Engineering around real product constraints.</h2>
            <p>Backend, computer-vision, and deployment work for an internal mobile workflow.</p>
          </div>
        </header>

        <article className="featured-work">
          <div className="featured-work-heading">
            <div>
              <p className="work-org">R-Finance · AI/ML Engineering Intern</p>
              <h3>Vehicle-photo validation API</h3>
              <p className="work-period">Jun 2026 – Present · Remote</p>
            </div>
            <span className="internal-label">Internal engineering project</span>
          </div>

          <p className="work-lead">
            Built an internal computer-vision API to validate vehicle photos submitted through a mobile auto-loan application.
          </p>

          <ol className="architecture" aria-label="System architecture">
            {architecture.map((item) => (
              <li key={item.step} className="architecture-step">
                <span>{item.step}</span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </li>
            ))}
          </ol>

          <div className="work-detail-grid">
            <div>
              <p className="detail-label">What I built</p>
              <ul className="contribution-list">
                {contributions.map((item) => (
                  <li key={item.label}>
                    <Check aria-hidden="true" />
                    <span><strong>{item.label}</strong>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="work-aside">
              <div className="privacy-note">
                <LockKeyhole aria-hidden="true" />
                <div>
                  <p>Privacy-focused processing</p>
                  <span>No external image APIs and no persistent image storage.</span>
                </div>
              </div>
              <div>
                <p className="detail-label">Technology</p>
                <div className="tag-list">
                  {stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <p className="disclosure">Details are intentionally limited to protect confidential company information.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
