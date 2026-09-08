import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { projects } from "../data";
import "./WorkChapters.css";

const [poly, novel, ...additional] = projects;
const vehicleSteps = [
  ["Vehicle photos", "Mobile submission"],
  ["Authenticated API", "FastAPI · API key"],
  ["Local vision + validation", "YOLO · eligibility · consistency"],
  ["Structured response", "REST / OpenAPI"],
];

function WorkLinks({ project }: { project: (typeof projects)[number] }) {
  return <div className="wc-links">
    <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.name} source on GitHub`}>Source <ArrowUpRight aria-hidden="true" /></a>
    <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} project page`}>Project page <ArrowUpRight aria-hidden="true" /></a>
  </div>;
}

function CaseDisclosure({ context, children }: { context: string; children: ReactNode }) {
  return <details className="wc-disclosure">
    <summary>
      <span className="wc-disclosure-label"><span className="wc-closed">View case study</span><span className="wc-open">Close case study</span></span>
      <span className="wc-disclosure-context">{context}</span>
      <ArrowUpRight aria-hidden="true" />
    </summary>
    <div className="wc-expanded">{children}</div>
  </details>;
}

function ChapterIndex({ number, category, note }: { number: string; category: string; note: string }) {
  return <div className="wc-chapter-index"><span className="wc-number">{number}</span><p>{category}</p><span className="wc-chapter-note">{note}</span></div>;
}

function ArfiSurface() {
  return <figure className="wc-arfi-surface" aria-label="Illustrative Arfi question, evidence, and grounded answer">
    <div className="wc-arfi-bar"><span className="wc-arfi-mark" aria-hidden="true">a</span><strong>Arfi</strong><span>Knowledge assistant</span></div>
    <div className="wc-arfi-question"><span className="wc-label">Question</span><p>Where can I find the onboarding checklist?</p></div>
    <div className="wc-arfi-evidence">
      <div><FileText aria-hidden="true" /><span className="wc-label">Retrieved document</span><strong>Example guide</strong></div>
      <blockquote>“The onboarding checklist is in the team handbook, under Getting started.”</blockquote>
    </div>
    <div className="wc-arfi-answer"><span className="wc-label">Grounded answer</span><p>You’ll find it in the team handbook’s <strong>Getting started</strong> section.</p><small>Source: Example guide</small></div>
    <figcaption>Illustrative preview · Synthetic data</figcaption>
  </figure>;
}

function RFinanceChapter() {
  return <article className="wc-chapter wc-rfinance" id="r-finance" aria-labelledby="wc-rfinance-title">
    <ChapterIndex number="01" category="Applied AI / Internal engineering" note="R-Finance" />
    <div className="wc-chapter-heading"><h3 id="wc-rfinance-title">R-Finance <span>— Applied AI</span></h3><p>Two separate tools for working with photos and document knowledge.</p></div>
    <div className="wc-arfi-layout">
      <div className="wc-system-copy"><p className="wc-label">A / Knowledge & retrieval · Internal work</p><h4>Arfi, AI knowledge assistant</h4><p>I built the dedicated chat interface and document-retrieval backend to answer questions from a document knowledge base.</p><div className="wc-arfi-relation" role="group" aria-label="Question to evidence to grounded answer"><span>Question</span><ArrowDown aria-hidden="true" /><span>Evidence</span><ArrowDown aria-hidden="true" /><span>Grounded answer</span></div></div>
      <ArfiSurface />
    </div>
    <div className="wc-vehicle">
      <div className="wc-vehicle-heading"><div><p className="wc-label">B / Computer vision · Internal work</p><h4>Vehicle-photo validation API</h4></div><p>I built an internal API that checks vehicle photos submitted through a mobile lending workflow.</p></div>
      <ol className="wc-vehicle-flow" aria-label="Vehicle-photo validation architecture">{vehicleSteps.map(([title, subtitle], i) => <li key={title}><span className="wc-node-number" aria-hidden="true">0{i + 1}</span><strong>{title}</strong><span>{subtitle}</span>{i < vehicleSteps.length - 1 && <ArrowRight className="wc-flow-arrow" aria-hidden="true" />}</li>)}</ol>
    </div>
    <CaseDisclosure context="Architecture & decisions">
      <div><p className="wc-label">Knowledge assistant</p><h4>Retrieve first. Answer with context.</h4><p>The assistant connects a dedicated chat interface to a document-retrieval backend. Relevant document excerpts provide the context for an answer. My work covered both the interface and the retrieval backend.</p><p>The example above is a static illustration using synthetic content. The assistant is a separate project from the vehicle-photo service.</p></div>
      <div><p className="wc-label">Vehicle-photo API</p><h4>Validation beyond a single detection.</h4><p>Local YOLO inference supports vehicle detection. Eligibility rules, metadata/edit heuristics, cross-photo consistency checks, and batch analysis help assess submitted photos. Heuristics indicate potential issues; they do not guarantee manipulation detection.</p><p>I built API-key authentication, REST/OpenAPI documentation, and automated API testing. I containerized the service with Docker and deployed it to a Kubernetes development environment using Helm.</p></div>
      <p className="wc-internal-note">Both projects are internal work. Public source code and demos are unavailable.</p>
    </CaseDisclosure>
  </article>;
}

function useOnceInView(className: string) {
  const visual = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = visual.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.add(className);
      observer.disconnect();
    }, { threshold: .16 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [className]);
  return visual;
}

function PolyCanvas() {
  const visual = useOnceInView("wc-routes-arrived");
  const routes = [
    { title: "Market context", nodes: ["Market data", "Gemini", "Market summary"] },
    { title: "Community discussion", nodes: ["Comments", "TF-IDF + logistic regression", "Comment categories"] },
  ];
  return <figure className="wc-poly-canvas" ref={visual}>
    <div className="wc-poly-canvas-header"><span className="wc-label">Poly Predictor Kit</span><span className="wc-label">Two separate pipelines</span></div>
    {routes.map((route, i) => <div className="wc-poly-route" key={route.title}>
      <div className="wc-route-heading"><span className="wc-label">0{i + 1}</span><h4>{route.title}</h4></div>
      <ol aria-label={`${route.title} pipeline`}>{route.nodes.map((node, j) => <li key={node}><span className={j === 1 ? "wc-route-core" : undefined}>{node}{i === 1 && j === 2 && <small>Emotional / Rational</small>}</span>{j < 2 && <ArrowRight aria-hidden="true" />}</li>)}</ol>
    </div>)}
    <figcaption>Separate pipelines. Two ways to understand a market.</figcaption>
  </figure>;
}

function PolyChapter() {
  return <article className="wc-chapter wc-poly" id="poly-predictor" aria-labelledby="wc-poly-title">
    <ChapterIndex number="02" category="Machine learning / Market context" note={poly.award} />
    <div className="wc-poly-heading"><div><p className="wc-label">{poly.event}</p><h3 id="wc-poly-title">{poly.name}</h3><p className="wc-lead">Making sense of the market.<br />And the conversation around it.</p></div><div className="wc-contribution"><p>{poly.problem}</p><span className="wc-label">My contribution</span><p>{poly.contribution}</p></div></div>
    <PolyCanvas />
    <div className="wc-poly-footer"><p className="wc-tech">Python · Gemini · Snowflake · scikit-learn</p><WorkLinks project={poly} /></div>
    <CaseDisclosure context="Pipelines & data preparation">
      <div><p className="wc-label">Market summaries</p><h4>Context from market data.</h4><p>Market data feeds a Gemini-powered summary pipeline. This provides a readable view of prediction-market context within the team’s broader analysis project.</p></div>
      <div><p className="wc-label">Comment classification</p><h4>A separate path for discussion.</h4><p>Comments are represented with TF-IDF features and classified using logistic regression. Gemini-generated labels are part of data preparation, not a required step in each inference request. Snowflake supports data storage.</p><p>The categories distinguish emotional and rational comments. The diagram shows architecture, not measured model performance.</p></div>
    </CaseDisclosure>
  </article>;
}

function NovelChapter() {
  const visual = useOnceInView("wc-arrived");
  return <article className="wc-chapter wc-novel" id="visual-novel" aria-labelledby="wc-novel-title">
    <ChapterIndex number="03" category="Generative AI / Creative tools" note={novel.award} />
    <div className="wc-novel-heading"><p className="wc-label">{novel.name}</p><h3 id="wc-novel-title">From a story idea<br /><span>to a playable <em>visual novel.</em></span></h3></div>
    <figure className="wc-novel-image" ref={visual}><img src={`${import.meta.env.BASE_URL}images/visual-novel.jpg`} width="1723" height="1080" alt="AI Visual Novel Creator project scene: Anya overlooking a city at sunset, with a Ren’Py dialogue panel." loading="lazy" decoding="async" /><figcaption>Project screenshot · CodeDay showcase</figcaption></figure>
    <div className="wc-novel-below">
      <div className="wc-novel-context"><p>Bringing story generation, scene imagery, and game scripting into one creative workflow.</p><div className="wc-novel-process" role="group" aria-label="Visual novel creation process"><div><span>Story data</span><small>Gemini</small></div><span aria-hidden="true">+</span><div><span>Scene images</span><small>Stability AI</small></div><ArrowRight aria-hidden="true" /><div><span>Playable novel</span><small>Ren’Py</small></div></div></div>
      <div className="wc-contribution"><span className="wc-label">My contribution</span><p>{novel.contribution}</p><p className="wc-tech">{novel.tech.join(" · ")}</p><WorkLinks project={novel} /></div>
    </div>
    <CaseDisclosure context="From structured data to Ren’Py">
      <div><p className="wc-label">The problem</p><h4>A story needs a playable structure.</h4><p>{novel.problem} Gemini produces structured story data that can be mapped to dialogue and scenes in a Ren’Py project.</p></div>
      <div><p className="wc-label">My part in the team project</p><h4>Connecting content to the game.</h4><p>I built the Python content pipeline to turn generated story data into game-ready Ren’Py files and integrated Stability AI scene-image generation. The screenshot above comes from the team’s public CodeDay showcase.</p></div>
    </CaseDisclosure>
  </article>;
}

export function WorkChapters() {
  return <>
    <section className="wc-work" id="selected-work" tabIndex={-1} aria-labelledby="wc-work-title"><div className="wc-container"><header className="wc-section-heading"><div><p className="wc-label">01 / Selected work</p><h2 id="wc-work-title">Ideas, built<br />into systems.</h2></div><p>Applied AI, analytical tools,<br />and a little imagination.</p></header><RFinanceChapter /><PolyChapter /><NovelChapter /></div></section>
    <section className="wc-additional" id="projects" tabIndex={-1} aria-labelledby="wc-additional-title"><div className="wc-container"><header className="wc-additional-heading"><p className="wc-label">02 / More things I’ve built</p><h2 id="wc-additional-title">Tools for the work itself.</h2></header><div className="wc-additional-grid">{additional.map((project, i) => <article key={project.name}><div className="wc-build-heading"><h3>{project.name}</h3><span className="wc-label">0{i + 4} / {project.event}</span></div><p>{project.summary}</p><div className="wc-contribution"><span className="wc-label">My contribution</span><p>{project.contribution}</p></div><p className="wc-tech">{project.tech.join(" · ")}</p><WorkLinks project={project} /></article>)}</div></div></section>
  </>;
}
export default WorkChapters;
