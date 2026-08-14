import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";

const evidence = [
  { label: "Built", value: "Internal computer-vision API", detail: "FastAPI · YOLO · Kubernetes" },
  { label: "Won", value: "1st Place — Polymarket Track", detail: "CodeDay AI Award" },
  { label: "Taught", value: "50+ CS students", detail: "Bellevue College CS TA" },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.name} · Computer Science at Whitman College · Expected May 2028</p>
          <h1 id="hero-title">
            <span className="hero-phrase">I build AI systems,</span>{" "}
            <span className="hero-phrase">backend services, and</span>{" "}
            <span className="hero-phrase"><span className="no-break">full-stack</span> products.</span>
          </h1>
          <p className="hero-intro">
            Built a privacy-focused computer-vision API, won the Polymarket track at QuackHacks, earned a CodeDay AI Award, and taught 50+ CS students.
          </p>
          <p className="role-target">Seeking 2027 software engineering, AI/ML, backend, and full-stack internships.</p>

          <div className="hero-actions" role="group" aria-label="Primary links">
            <a className="button button-primary" href={profile.resume} target="_blank" rel="noreferrer">
              <Download aria-hidden="true" /> View résumé
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> GitHub
            </a>
            <a className="button button-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a className="button button-secondary" href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" /> Email
            </a>
          </div>
        </div>

        <aside className="proof-panel" aria-label="Recruiter snapshot">
          <div className="proof-panel-header">
            <span className="status-dot" aria-hidden="true" />
            <span>Open to 2027 internships</span>
          </div>
          <dl className="proof-list">
            {evidence.map((item) => (
              <div className="proof-item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <strong>{item.value}</strong>
                  <span>{item.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <a className="proof-link" href="#selected-work">
            See selected engineering work <ArrowDown aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
}
