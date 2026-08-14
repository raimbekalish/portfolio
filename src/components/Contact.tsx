import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";

export default function Contact() {
  return (
    <section className="site-section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card">
          <div>
            <p className="section-index">07 / Contact</p>
            <h2 id="contact-title">Open to 2027 engineering internships.</h2>
            <p>I’m interested in software engineering, AI/ML, backend, and full-stack roles. Reach me by email or connect on LinkedIn.</p>
          </div>
          <div className="contact-actions">
            <a className="email-cta" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
              <Mail aria-hidden="true" /> <span>{profile.email}</span> <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-link" href={profile.resume} target="_blank" rel="noreferrer">
              Résumé <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
