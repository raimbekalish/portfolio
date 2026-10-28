import { ArrowUpRight, RotateCcw } from "lucide-react";
import { identity } from "../content";
import { useObstacle, type NameGeometry, type SignalRefs } from "../useSignalPath";

const pad = (n: number) => String(n).padStart(2, "0");

function Statement() {
  const { statement, accent } = identity;
  const at = statement.endsWith(accent) ? statement.length - accent.length : -1;
  return at > 0 ? <>{statement.slice(0, at)}<em>{accent}</em></> : <>{statement}</>;
}

type Props = {
  refs: SignalRefs;
  geometry: NameGeometry | null;
  /** Plays the opening again; absent when motion is reduced. */
  onReplay?: () => void;
};

export default function Hero({ refs, geometry, onReplay }: Props) {
  const obstacle = useObstacle(refs, "hero");
  return (
    <section className="sp-hero" aria-labelledby="sp-name">
      <div className="sp-hero-grid" ref={refs.grid}>
        <div className="sp-ruler" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} ref={(el) => { refs.ticks.current[i] = el; }}>{pad(i + 1)}</span>
          ))}
        </div>
        <span className="sp-crop sp-crop--tl" aria-hidden="true" />
        <span className="sp-crop sp-crop--tr" aria-hidden="true" />
        <span className="sp-crop sp-crop--bl" aria-hidden="true" />
        <span className="sp-crop sp-crop--br" aria-hidden="true" />

        {/* The name is one line of real text per word, readable from the first frame. During the
            opening its ink is a gradient clipped to the letters, so the heading holds the name once. */}
        <h1 className="sp-name" id="sp-name" ref={refs.name}>
          <span className="sp-line sp-line--1" ref={refs.line1}>{identity.first}<i className="sp-baseline" ref={refs.baseline1} /></span>{" "}
          <span className="sp-line sp-line--2" ref={refs.line2}>{identity.last}<span className="sp-dot" ref={refs.dot} aria-hidden="true" /></span>
          {geometry && (
            <svg className="sp-trace" width={geometry.w} height={geometry.h} viewBox={`0 0 ${geometry.w} ${geometry.h}`} aria-hidden="true" focusable="false">
              <path ref={refs.trace} d={geometry.trace} />
            </svg>
          )}
          <span className="sp-head" ref={refs.head} aria-hidden="true">
            <span className="sp-head-core" ref={refs.headCore} />
          </span>
        </h1>

        <p className="sp-statement" ref={obstacle}><Statement /></p>

        <dl className="sp-facts" ref={obstacle}>
          <div>
            <dt>Studying</dt>
            <dd>{identity.study}</dd>
          </div>
          <div>
            <dt>Graduating</dt>
            <dd>{identity.graduation}</dd>
          </div>
          <div className="sp-facts-open">
            <dt>Available</dt>
            <dd>{identity.availability}</dd>
          </div>
        </dl>

        <div className="sp-actions" ref={obstacle}>
          <a className="sp-btn sp-btn--ink" href={identity.resume} target="_blank" rel="noreferrer">
            Résumé (PDF) <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </a>
          <a className="sp-btn" href={identity.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </a>
          <a className="sp-mail" href={`mailto:${identity.email}`}>{identity.email}</a>
        </div>

        {onReplay && (
          <button type="button" className="sp-replay" ref={obstacle} onClick={onReplay} aria-label="Replay the opening animation">
            <RotateCcw aria-hidden="true" strokeWidth={1.75} />
            Replay
          </button>
        )}
      </div>
    </section>
  );
}
