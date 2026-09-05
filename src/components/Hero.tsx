import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../data";
import { AssistantPreview, NovelPreview, PolyPreview } from "./ProjectPreviews";

const previews = [
  {
    id: "assistant",
    label: "Applied AI",
    number: "01",
    component: <AssistantPreview compact />,
  },
  {
    id: "poly",
    label: "Market context",
    number: "02",
    component: <PolyPreview compact />,
  },
  {
    id: "novel",
    label: "Story → screen",
    number: "03",
    component: <NovelPreview compact />,
  },
];

export default function Hero() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-cross" aria-hidden="true">
              ✳
            </span>{" "}
            Engineering, made visible.
          </p>
          <h1 id="hero-title">
            Raimbek{" "}
            <span>
              Alish<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-statement">
            AI, backend, and <br className="desktop-break" /> everything in
            between.
          </p>
          <p className="hero-intro">
            I’m a Computer Science–Mathematics student at Whitman College. I
            build AI assistants, computer-vision systems, and developer tools.
          </p>
          <p className="availability">
            Seeking Summer 2027 internships{" "}
            <span>Graduating May 2028</span>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#selected-work">
              Explore my work <ArrowDown aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              View résumé <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`mailto:${profile.email}`}>
              Email <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-showcase">
          <div className="showcase-heading">
            <span className="tiny-label">A look inside the work</span>
            <span aria-hidden="true">↓</span>
          </div>
          <div className="hero-stage">
            <div className="stage-backing" aria-hidden="true">
              <span>MODEL / API / INTERFACE</span>
            </div>
            <div
              className="hero-main-preview"
              id="hero-preview"
              role="region"
              aria-label={`${previews[selected].label} preview`}
              aria-live="polite"
            >
              {previews[selected].component}
            </div>
            <div className="supporting-previews">
              <button
                className="novel-peek"
                onClick={() => setSelected(2)}
                aria-label="Show AI Visual Novel Creator preview"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/visual-novel.jpg`}
                  width="1723"
                  height="1080"
                  alt=""
                />
                <span>
                  From a story to a world <ArrowUpRight aria-hidden="true" />
                </span>
              </button>
              <button
                className="poly-peek"
                onClick={() => setSelected(1)}
                aria-label="Show Poly Predictor Kit preview"
              >
                <span className="tiny-label">Poly Predictor Kit</span>
                <span className="peek-diagram" aria-hidden="true">
                  <span className="context-line">[ context ]</span> <br />
                  <span>↳</span> insight
                </span>
                <span className="peek-award">1st Place · Polymarket Track</span>
              </button>
            </div>
          </div>
          <div
            className="preview-selector"
            role="group"
            aria-label="Choose a project preview"
          >
            {previews.map((preview, i) => (
              <button
                key={preview.id}
                aria-pressed={selected === i}
                aria-controls="hero-preview"
                onClick={() => setSelected(i)}
              >
                <span>{preview.number}</span>
                {preview.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container hero-footnote">
        <span>Curiosity across the stack.</span>
        <a href="#selected-work">
          Selected work <span aria-hidden="true">↓</span>
        </a>
        <span>01—03</span>
      </div>
    </section>
  );
}
