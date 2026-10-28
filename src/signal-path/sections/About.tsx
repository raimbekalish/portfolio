import { ArrowRight } from "lucide-react";
import { about, education } from "../content";
import { sectionIds } from "../structure";

/** About and education, set as an editorial spread, with the way into the Code Topology Lab. */
export default function About() {
  return (
    <section className="sp-about" id={sectionIds.about} aria-labelledby="sp-about-title">
      <div className="sp-about-grid">
        <p className="sp-kicker sp-about-kicker" aria-hidden="true">About</p>
        <h2 className="sp-about-title" id="sp-about-title">
          <span className="sp-sr">About: </span>{about.heading.lead} <em>{about.heading.accent}</em>
        </h2>
        <div className="sp-about-copy">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>

        <div className="sp-edu">
          <h3 className="sp-edu-title">Education</h3>
          <ol className="sp-edu-list">
            {education.map((school) => (
              <li key={school.id} className="sp-school" data-current={school.id === "whitman"}>
                <p className="sp-school-date">{school.date}</p>
                <h4 className="sp-school-name">{school.name}</h4>
                <p className="sp-school-degree">{school.degree}</p>
                <p className="sp-school-place">{school.location}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="sp-lab" id="code-topology" aria-labelledby="sp-lab-title">
          <p className="sp-st-label">Code Topology Lab</p>
          <h3 className="sp-lab-title" id="sp-lab-title">Want to inspect the code behind the work?</h3>
          <p>Explore the file and import structure of my public projects.</p>
          <a className="sp-lab-link" href={`${import.meta.env.BASE_URL}?lab=code-topology`}>
            Open the lab <ArrowRight aria-hidden="true" strokeWidth={1.75} />
          </a>
        </aside>
      </div>
    </section>
  );
}
