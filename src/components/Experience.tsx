import { ArrowUpRight } from "lucide-react";
import { experiences } from "../data";
export default function Experience() {
  return (
    <section
      className="experience-section section-space"
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-title"
    >
      <div className="container resume-section-grid">
        <header>
          <p className="section-index">03 / Experience</p>
          <h2 id="experience-title">
            Built. Designed. <br />
            Taught.
          </h2>
        </header>
        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-row" key={experience.company}>
              <div className="experience-meta">
                <div className="experience-name">
                  {experience.logo && (
                    <img
                      src={experience.logo}
                      alt=""
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div>
                    <h3>{experience.company}</h3>
                    <p>{experience.role}</p>
                  </div>
                </div>
                <p className="experience-date">
                  {experience.date}
                  <span>{experience.location}</span>
                </p>
              </div>
              <p className="experience-summary">{experience.bullets[0]}</p>
              {experience.company === "R-Finance" && (
                <a className="text-link" href="#r-finance">
                  Explore the two projects <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
