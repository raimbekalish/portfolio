import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../data";

export default function CaseStudies() {
  const featuredProjects = projects.slice(0, 2);
  const additionalProjects = projects.slice(2);

  return (
    <section className="site-section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <header className="section-header">
          <p className="section-index">03 / Projects</p>
          <div>
            <h2 id="projects-title">Selected builds, explained as engineering work.</h2>
            <p>Applied AI, data pipelines, and developer tools—with the problem, implementation, and result kept visible.</p>
          </div>
        </header>

        <div className="project-list featured-projects">
          {featuredProjects.map((project) => (
            <article className="project-row featured-project" key={project.name}>
              <div className="project-summary">
                <p className="project-event">{project.event}</p>
                <span className="award-label">{project.award}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-links">
                  <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`View ${project.name} project page`}>
                    Project <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source code on GitHub`}>
                    <Github aria-hidden="true" /> Source
                  </a>
                </div>
              </div>

              <div className="project-body">
                <dl className="project-details">
                  <div>
                    <dt>My work</dt>
                    <dd>{project.contribution}</dd>
                  </div>
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div>
                    <dt>Technical approach</dt>
                    <dd>{project.decision}</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>{project.result}</dd>
                  </div>
                </dl>
                <div className="tag-list project-tags" role="list" aria-label={`${project.name} technologies`}>
                  {project.tech.map((item) => <span role="listitem" key={item}>{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="additional-builds" aria-labelledby="additional-builds-title">
          <div className="additional-builds-header">
            <p className="detail-label">Additional builds</p>
            <h3 id="additional-builds-title">Developer tools and workflow projects.</h3>
          </div>
          <div className="additional-grid">
            {additionalProjects.map((project) => (
              <article className="additional-card" key={project.name}>
                <div>
                  <p className="project-event">{project.event}</p>
                  <h4>{project.name}</h4>
                  <p className="additional-summary">{project.summary}</p>
                </div>
                <div className="additional-contribution">
                  <span>My contribution</span>
                  <p>{project.contribution}</p>
                </div>
                <div className="tag-list" role="list" aria-label={`${project.name} technologies`}>
                  {project.tech.map((item) => <span role="listitem" key={item}>{item}</span>)}
                </div>
                <div className="project-links">
                  <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`View ${project.name} project page`}>
                    Project <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source code on GitHub`}>
                    <Github aria-hidden="true" /> Source
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
