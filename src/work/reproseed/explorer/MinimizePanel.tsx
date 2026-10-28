import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Evaluation, Example, Outcome } from "../../../content/reproseed";
import { useReducedMotion } from "../../shared/motion";
import { counts, listIds, outcomeText, reductions, sourceText } from "./model";

type Props = {
  example: Example;
  log: Evaluation[];
  smallest: string[][];
  cursor: number;
  onCursor: (index: number) => void;
};

const legendOrder: Outcome[] = ["target", "pass", "other", "invalid", "error"];

/**
 * The recorded search, candidate by candidate. The strip of marks is the scrubber: each mark is one
 * candidate, shaped by its outcome, and a native range input over it moves through them by pointer,
 * touch or keyboard.
 */
export default function MinimizePanel({ example, log, smallest, cursor, onCursor }: Props) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [said, setSaid] = useState("");
  const moments = useMemo(() => reductions(example, log), [example, log]);
  const tally = counts(log);
  const last = log.length - 1;
  const current = log[cursor];
  const reduction = moments.find((m) => m.index === cursor);
  const present = legendOrder.filter((o) => log.some((e) => e.outcome === o));

  const describe = (i: number) => {
    const e = log[i];
    return `Candidate ${i + 1} of ${log.length}: ${outcomeText[e.outcome].label}${e.observed ? `, ${e.observed}` : ""}. ${e.steps.length} steps.`;
  };

  // Playback moves one candidate at a time and stops at the end. It is paused by any other control.
  useEffect(() => {
    if (!playing) return;
    if (cursor >= last) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => onCursor(cursor + 1), reduced ? 650 : 380);
    return () => clearTimeout(timer);
  }, [playing, cursor, last, onCursor, reduced]);

  useEffect(() => setPlaying(false), [log]);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(last, i));
    setPlaying(false);
    onCursor(next);
    setSaid(describe(next));
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      setSaid(`Paused at candidate ${cursor + 1}.`);
      return;
    }
    if (cursor >= last) onCursor(0);
    setPlaying(true);
    setSaid("Playing the recorded search.");
  };

  return (
    <div className="rs-min">
      <p>
        Delta debugging tries chunks of the scenario, then their complements, then smaller chunks. The recorded search made{" "}
        {tally.total} decisions: {tally.replayed} subsets replayed twice each, {tally.cached} answered from the cache and{" "}
        {tally.invalid} rejected without a browser because a step they need was missing.
      </p>

      <div className="rs-scrub">
        <div className="rs-ticks" aria-hidden="true" style={{ "--n": log.length } as CSSProperties}>
          {log.map((e, i) => (
            <span
              key={i}
              className="rs-tick"
              data-outcome={e.outcome}
              data-current={i === cursor || undefined}
              style={{ "--x": last ? i / last : 0 } as CSSProperties}
            />
          ))}
        </div>
        <input
          type="range"
          min={1}
          max={log.length}
          value={cursor + 1}
          aria-label="Candidate in the recorded search"
          aria-valuetext={describe(cursor)}
          onChange={(event) => {
            setPlaying(false);
            onCursor(Number(event.target.value) - 1);
          }}
        />
      </div>

      <ul className="rs-legend" aria-label="Marks on the strip">
        {present.map((o) => (
          <li key={o}><span className="rs-tick" data-outcome={o} aria-hidden="true" />{outcomeText[o].short}</li>
        ))}
      </ul>

      <div className="rs-min-controls">
        <button type="button" onClick={() => go(cursor - 1)} disabled={cursor === 0} aria-label="Previous candidate">
          <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
        </button>
        <button type="button" className="rs-play" onClick={togglePlay} aria-pressed={playing}>
          {playing ? <Pause aria-hidden="true" strokeWidth={1.75} /> : <Play aria-hidden="true" strokeWidth={1.75} />}
          {playing ? "Pause" : cursor >= last ? "Replay search" : "Play search"}
        </button>
        <button type="button" onClick={() => go(cursor + 1)} disabled={cursor === last} aria-label="Next candidate">
          <ChevronRight aria-hidden="true" strokeWidth={1.75} />
        </button>
        <p className="rs-min-count">
          Candidate <b>{cursor + 1}</b> of {log.length}
        </p>
      </div>

      <div className="rs-cand" data-outcome={current.outcome}>
        <p className="rs-cand-outcome">
          <span className="rs-tick" data-outcome={current.outcome} aria-hidden="true" />
          {outcomeText[current.outcome].label}
          {current.observed && <span className="rs-cand-observed">{current.observed}</span>}
        </p>
        <p className="rs-cand-steps">
          Tried {current.steps.length} of {example.steps.length} steps: {current.steps.join(" · ")}
        </p>
        <p className="rs-cand-source">{sourceText[current.source]}</p>
        {reduction && (
          <p className="rs-cand-new">
            New smallest failing subset: {reduction.from} → {reduction.to} steps. Removed {listIds(reduction.removed)}.
          </p>
        )}
        {!reduction && cursor === last && (
          <p className="rs-cand-new">End of the search: {smallest[cursor].length} steps left. The proof pass checks each one next.</p>
        )}
      </div>

      <div className="rs-moments">
        <p className="rs-moments-label">Jump to</p>
        {moments.map((m) => (
          <button key={m.index} type="button" onClick={() => go(m.index)} aria-pressed={cursor === m.index}>
            Candidate {m.index + 1}: {m.from} → {m.to} steps
          </button>
        ))}
        <button type="button" onClick={() => go(last)} aria-pressed={cursor === last}>
          Last candidate
        </button>
      </div>

      <p className="sp-sr" aria-live="polite">{said}</p>
    </div>
  );
}
