import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p>{profile.name}</p>
          <span>Computer Science at Whitman College · Expected May 2028</span>
          <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <nav className="footer-links" aria-label="Social and contact links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github aria-hidden="true" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin aria-hidden="true" /></a>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}><Mail aria-hidden="true" /></a>
          <a href="#top" aria-label="Back to top"><ArrowUp aria-hidden="true" /></a>
        </nav>
      </div>
    </footer>
  );
}
