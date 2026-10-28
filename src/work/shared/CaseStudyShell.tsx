import type { ReactNode } from "react";
import { ArrowLeft, ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "../../data";
import { OutLink } from "../../signal-path/ui";
import { launched } from "../release";
import { homeSection, site } from "../site";
import Contents, { type Chapter } from "./Contents";

type Props = {
  /** The project's class on the page root, for its own palette and styles. */
  className: string;
  /** The project's section id on the portfolio page, where "Back to the portfolio" lands. */
  project: string;
  chapters: readonly Chapter[];
  source: { href: string; label: string };
  children: ReactNode;
};

/**
 * The frame every case study shares: the skip link, the site bar with its Contents menu, the main
 * region and the footer. Each project fills the main region with its own story and visuals.
 */
export default function CaseStudyShell({ className, project, chapters, source, children }: Props) {
  const back = homeSection(project);
  return (
    <div className={`sp cs ${className}`} id="top">
      <a className="sp-skip" href="#main">Skip to content</a>
      <header className="sp-bar">
        <a className="sp-brand" href={site.home}>
          {site.name}
          <span>Software engineering</span>
        </a>
        <nav className="cs-bar-nav" aria-label="Site">
          <a className="cs-bar-back" href={homeSection("work")}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} /> All work
          </a>
          <Contents chapters={chapters} back={back} source={source} />
          <a className="sp-nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="sp-foot">
        <p className="sp-foot-name">{site.name}</p>
        <p className="sp-foot-links">
          <OutLink href={profile.linkedin}>LinkedIn</OutLink>
          <OutLink href={profile.github}>GitHub</OutLink>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p className="sp-foot-note">
          {launched ? "A case study by Raimbek Alish." : "A case study from the Signal Path design preview."} <a href={back}>Back to the portfolio</a>
          <a className="sp-foot-top" href="#top">Back to top <ArrowUp aria-hidden="true" strokeWidth={1.75} /></a>
        </p>
      </footer>
    </div>
  );
}
