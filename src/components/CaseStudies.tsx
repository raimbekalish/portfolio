import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import EngineeringSpotlight from "./EngineeringSpotlight";
import ProjectLinks from "./ProjectLinks";
import { NovelPreview, PolyPreview } from "./ProjectPreviews";

export default function CaseStudies() {
  const [poly, novel, ...additional] = projects;
  return (
    <>
      <section
        className="selected-work section-space"
        id="selected-work"
        tabIndex={-1}
        aria-labelledby="work-title"
      >
        <div className="container">
          <header className="section-header">
            <div>
              <p className="section-index">01 / Selected work</p>
              <h2 id="work-title">Ideas, built into systems.</h2>
            </div>
            <p>
              Applied AI, analytical tools, <br />
              and a little imagination.
            </p>
          </header>
          <EngineeringSpotlight />
          <article
            className="case-study poly-case"
            id="poly-predictor"
            aria-labelledby="poly-title"
          >
            <header className="case-topline">
              <span className="case-number">02</span>
              <p className="tiny-label">Machine learning / Market context</p>
              <span className="award-label">{poly.award}</span>
            </header>
            <div className="poly-case-grid">
              <div className="case-copy">
                <p className="project-event">{poly.event}</p>
                <h3 id="poly-title">{poly.name}</h3>
                <p className="case-lead">
                  Making sense of the market. <br />
                  And the conversation around it.
                </p>
                <p>{poly.problem}</p>
                <div className="my-work">
                  <span className="tiny-label">My contribution</span>
                  <p>{poly.contribution}</p>
                </div>
                <p className="tech-line">
                  Python · Gemini · Snowflake · scikit-learn
                </p>
                <ProjectLinks {...poly} />
              </div>
              <PolyPreview />
            </div>
            <details className="case-disclosure">
              <summary>
                <span className="disclosure-label">
                  <span className="when-closed">View case study</span>
                  <span className="when-open">Close case study</span>
                </span>
                <span className="disclosure-context">
                  Pipelines & data preparation
                </span>
                <ArrowUpRight aria-hidden="true" />
              </summary>
              <div className="case-expanded">
                <div>
                  <p className="tiny-label">Market summaries</p>
                  <h4>Context from market data.</h4>
                  <p>
                    Market data feeds a Gemini-powered summary pipeline. This
                    provides a readable view of prediction-market context within
                    the team’s broader analysis project.
                  </p>
                </div>
                <div>
                  <p className="tiny-label">Comment classification</p>
                  <h4>A separate path for discussion.</h4>
                  <p>
                    Comments are represented with TF-IDF features and classified
                    using logistic regression. Gemini-generated labels are part
                    of data preparation, not a required step in each inference
                    request. Snowflake supports data storage.
                  </p>
                  <p>
                    The categories distinguish emotional and rational comments.
                    The diagram shows architecture, not measured model
                    performance.
                  </p>
                </div>
              </div>
            </details>
          </article>
          <article
            className="case-study novel-case"
            id="visual-novel"
            aria-labelledby="novel-title"
          >
            <header className="case-topline">
              <span className="case-number">03</span>
              <p className="tiny-label">Generative AI / Creative tools</p>
              <span className="award-label">{novel.award}</span>
            </header>
            <div className="novel-case-grid">
              <div className="novel-visual">
                <NovelPreview />
                <div
                  className="novel-process"
                  role="group"
                  aria-label="Visual novel creation process"
                >
                  <div>
                    <span>Story data</span>
                    <small>Gemini</small>
                  </div>
                  <span aria-hidden="true">+</span>
                  <div>
                    <span>Scene images</span>
                    <small>Stability AI</small>
                  </div>
                  <ArrowRight aria-hidden="true" />
                  <div>
                    <span>Playable novel</span>
                    <small>Ren’Py</small>
                  </div>
                </div>
              </div>
              <div className="case-copy">
                <p className="project-event">{novel.name}</p>
                <h3 id="novel-title">
                  From a story idea <br />
                  to a playable <br />
                  <em>visual novel.</em>
                </h3>
                <p>
                  Bringing story generation, scene imagery, and game scripting
                  into one creative workflow.
                </p>
                <div className="my-work">
                  <span className="tiny-label">My contribution</span>
                  <p>{novel.contribution}</p>
                </div>
                <p className="tech-line">{novel.tech.join(" · ")}</p>
                <ProjectLinks {...novel} />
              </div>
            </div>
            <details className="case-disclosure">
              <summary>
                <span className="disclosure-label">
                  <span className="when-closed">View case study</span>
                  <span className="when-open">Close case study</span>
                </span>
                <span className="disclosure-context">
                  From structured data to Ren’Py
                </span>
                <ArrowUpRight aria-hidden="true" />
              </summary>
              <div className="case-expanded">
                <div>
                  <p className="tiny-label">The problem</p>
                  <h4>A story needs a playable structure.</h4>
                  <p>
                    {novel.problem} Gemini produces structured story data that
                    can be mapped to dialogue and scenes in a Ren’Py project.
                  </p>
                </div>
                <div>
                  <p className="tiny-label">My part in the team project</p>
                  <h4>Connecting content to the game.</h4>
                  <p>
                    I built the Python content pipeline to turn generated story
                    data into game-ready Ren’Py files and integrated Stability
                    AI scene-image generation. The screenshot above comes from
                    the team’s public CodeDay showcase.
                  </p>
                </div>
              </div>
            </details>
          </article>
        </div>
      </section>
      <section
        className="additional-builds section-space"
        id="projects"
        tabIndex={-1}
        aria-labelledby="additional-title"
      >
        <div className="container">
          <header className="section-header">
            <div>
              <p className="section-index">02 / More things I’ve built</p>
              <h2 id="additional-title">Tools for the work itself.</h2>
            </div>
          </header>
          <div className="additional-grid">
            {additional.map((project, i) => (
              <article className="additional-project" key={project.name}>
                <div className="additional-title">
                  <h3>{project.name}</h3>
                  <span className="tiny-label">
                    0{i + 4} / {project.event}
                  </span>
                </div>
                <p>{project.summary}</p>
                <div className="my-work">
                  <span className="tiny-label">My contribution</span>
                  <p>{project.contribution}</p>
                </div>
                <p className="tech-line">{project.tech.join(" · ")}</p>
                <ProjectLinks {...project} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
