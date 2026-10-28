import { featured } from "../content";
import { sectionIds } from "../structure";
import { ArrowRight } from "lucide-react";
import { CaseStudyLink, OutLink, WorkIndex } from "../ui";
import { useObstacle, type FlowGeometry, type SignalRefs } from "../useSignalPath";
import SystemDiagram from "./SystemDiagram";

type Props = { refs: SignalRefs; flow: FlowGeometry | null; armed: boolean; animate: boolean };

/** Poly Predictor Kit: the dark stage under the hero, where the opening's signal arrives. */
export default function FeaturedProject({ refs, flow, armed, animate }: Props) {
  const obstacle = useObstacle(refs, "stage");
  const { recognition } = featured;
  return (
    <section className="sp-work" id={sectionIds.poly} ref={refs.stage} aria-labelledby="sp-work-title">
      <div className="sp-work-grid">
        <p className="sp-kicker" ref={obstacle}><WorkIndex id={sectionIds.poly} /> — Selected work</p>
        <h2 className="sp-work-title" id="sp-work-title" ref={obstacle}>{featured.name}</h2>

        <div className="sp-work-meta" ref={obstacle}>
          <a className="sp-award" href={recognition.evidence} target="_blank" rel="noreferrer">
            <span className="sp-award-mark" aria-hidden="true" />
            <span className="sp-award-title">{recognition.title}<span className="sp-sr"> — </span></span>
            <span className="sp-award-event">{recognition.event}</span>
          </a>
          <p className="sp-work-team">{featured.team} · public repository</p>
          <p className="sp-work-links">
            <CaseStudyLink className="sp-work-case" href={featured.caseStudy} section={sectionIds.poly}>
              Case study <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </CaseStudyLink>
            <OutLink href={featured.source}>Source</OutLink>
            <OutLink href={featured.devpost}>Devpost</OutLink>
          </p>
        </div>

        <dl className="sp-work-facts" ref={obstacle}>
          <div>
            <dt>Problem</dt>
            <dd>{featured.problem}</dd>
          </div>
          <div>
            <dt>My part</dt>
            <dd>{featured.contribution}</dd>
          </div>
        </dl>

        <SystemDiagram
          system={featured.system}
          panelRef={refs.panel}
          approach={flow ? flow.approach : null}
          armed={armed}
          animate={animate}
        />

        <p className="sp-work-tech"><span className="sp-st-label">Built with</span>{featured.tech.join(" · ")}</p>
      </div>
    </section>
  );
}
