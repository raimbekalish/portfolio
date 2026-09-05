import { ArrowUpRight } from "lucide-react";
import { profile } from "../data";
export default function Contact() {
  return (
    <section
      className="contact-section section-space"
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="section-index">07 / What’s next</p>
        <div className="contact-main">
          <h2 id="contact-title">
            Let’s build <br />
            something <em>useful.</em>
          </h2>
          <ArrowUpRight className="contact-arrow" aria-hidden="true" />
        </div>
        <div className="contact-bottom">
          <div>
            <p>
              Seeking Summer 2027 software engineering{" "}
              <br className="desktop-break" /> and AI/ML internships.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="contact-links">
            <a href={profile.resume} target="_blank" rel="noreferrer">
              View résumé <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
