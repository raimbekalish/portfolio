import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { budgets, chunkKinds, illustrativeInput, modes, type Chunk, type PackMode } from "../../content/promptlock";
import { useCompact } from "../hooks";
import { duration, easing, useMotion } from "../motion";
import { pack, priority } from "./pack";

const SCALE = budgets[budgets.length - 1];
const note =
  "A model of PromptLock’s packing step, following its README and public code: about 750-token chunks, typed, ranked by the mode, then packed in that order; a chunk that does not fit is skipped, and the budget is never exceeded. The sixteen chunks and their sizes are invented for illustration. Where this model leaves a chunk out, PromptLock first tries to compress or shorten it to fit, and it also reserves room for its prompt template. No measured results are shown.";
const number = new Intl.NumberFormat("en-US");
const short = (tokens: number) => `${tokens / 1000}K`;
const pct = (tokens: number) => `${((tokens / SCALE) * 100).toFixed(3)}%`;
const total = illustrativeInput.reduce((sum, c) => sum + c.tokens, 0);

function level(mode: PackMode, chunk: Chunk) {
  const p = priority(mode, chunk.kind);
  return p >= 3 - 0.2 ? "high" : p <= 1 ? "low" : "mid";
}

/**
 * The budget model: pick a mode and a budget, and the illustrative input is re-packed the way the
 * README describes: ranked by the mode, packed greedily, never over the budget. Tiles move to their
 * new places (FLIP), and nothing moves with reduced motion.
 */
export default function BudgetPacker() {
  const { reduced } = useMotion();
  const compact = useCompact();
  const [modeId, setModeId] = useState<PackMode["id"]>("debug");
  const [budget, setBudget] = useState(4000);
  const mode = modes.find((m) => m.id === modeId) ?? modes[0];
  const result = useMemo(() => pack(illustrativeInput, mode, budget), [mode, budget]);
  const nodes = useRef(new Map<string, HTMLElement>());
  const before = useRef<Map<string, DOMRect> | null>(null);

  const register = (key: string) => (el: HTMLElement | null) => {
    if (el) nodes.current.set(key, el);
    else nodes.current.delete(key);
  };
  // Remember where everything is just before a change, so it can move from there.
  const snapshot = () => {
    if (reduced) return;
    before.current = new Map([...nodes.current].map(([key, el]) => [key, el.getBoundingClientRect()]));
  };

  useLayoutEffect(() => {
    const previous = before.current;
    before.current = null;
    if (!previous || reduced) return;
    const anims: Animation[] = [];
    let i = 0;
    for (const [key, el] of nodes.current) {
      const from = previous.get(key);
      const to = el.getBoundingClientRect();
      const timing = { duration: duration.medium, easing: easing.out, delay: Math.min(i++ * 14, 200) };
      if (!from) {
        anims.push(el.animate([{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, transform: "none" }], timing));
        continue;
      }
      const dx = from.left - to.left, dy = from.top - to.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
      anims.push(el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], timing));
    }
    return () => anims.forEach((a) => a.cancel());
  }, [result, reduced]);

  const tile = (chunk: Chunk, reason?: string) => (
    <li key={chunk.id} className="sp-chunk" data-level={level(mode, chunk)} ref={register(`t-${chunk.id}`)}>
      <span className="sp-chunk-kind" aria-hidden="true">{chunkKinds[chunk.kind].short}</span>
      <span className="sp-chunk-tokens" aria-hidden="true">{number.format(chunk.tokens)}</span>
      <span className="sp-chunk-source" aria-hidden="true">{chunk.source}</span>
      <span className="sp-sr">{chunkKinds[chunk.kind].label} chunk, {chunk.source}, {number.format(chunk.tokens)} tokens{reason ? `. ${reason}.` : "."}</span>
    </li>
  );

  const highest = mode.highest.map((k) => chunkKinds[k].label.toLowerCase()).join(" and ");
  const lowest = mode.lowest.map((k) => chunkKinds[k].label.toLowerCase()).join(" and ");

  return (
    <div className="sp-pack" role="group" aria-labelledby="sp-pack-title">
      <div className="sp-pack-head">
        <h3 className="sp-pack-title" id="sp-pack-title">Budget model</h3>
        <p className="sp-pack-flag">Illustrative input · not PromptLock output</p>
      </div>

      <div className="sp-pack-controls">
        <fieldset className="sp-seg">
          <legend className="sp-st-label">Mode</legend>
          <div className="sp-seg-options">
            {modes.map((m) => (
              <label key={m.id}>
                <input type="radio" name="sp-pack-mode" value={m.id} checked={m.id === modeId} onChange={() => { snapshot(); setModeId(m.id); }} />
                <span>{m.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="sp-seg sp-seg--budget">
          <legend className="sp-st-label">Budget</legend>
          <div className="sp-seg-options">
            {budgets.map((b) => (
              <label key={b}>
                <input type="radio" name="sp-pack-budget" value={b} checked={b === budget} onChange={() => { snapshot(); setBudget(b); }} />
                <span><span className="sp-sr">{number.format(b)} tokens</span><span aria-hidden="true">{short(b)}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="sp-pack-rule">{mode.name} ranks {highest} chunks highest and {lowest} chunks lowest.</p>
      <p className="sp-pack-legend" aria-hidden="true">
        <span><i data-level="high" /> Highest priority in this mode</span>
        <span><i data-level="low" /> Lowest priority</span>
      </p>

      <figure className="sp-meter" aria-labelledby="sp-meter-caption">
        <div className="sp-meter-scale" aria-hidden="true">
          <span style={{ left: "0%" }}>0</span>
          {budgets.map((b) => <span key={b} style={{ left: pct(b) }} data-on={b === budget}>{short(b)}</span>)}
        </div>
        <div className="sp-meter-track" aria-hidden="true">
          <div className="sp-meter-fill">
            {result.included.map((chunk) => (
              <span key={chunk.id} className="sp-meter-seg" data-level={level(mode, chunk)} style={{ width: pct(chunk.tokens) }} ref={register(`m-${chunk.id}`)} />
            ))}
          </div>
          <span className="sp-meter-input" style={{ left: pct(total) }}><span>Input {number.format(total)}</span></span>
          <span className="sp-meter-lock" style={{ left: pct(budget) }} />
        </div>
        <figcaption className="sp-meter-caption" id="sp-meter-caption">
          <strong>{number.format(result.used)}</strong> of {number.format(budget)} tokens used · {result.included.length} of {illustrativeInput.length} chunks packed
        </figcaption>
      </figure>
      <p className="sp-sr" aria-live="polite">
        {mode.name} mode, {number.format(budget)}-token budget: {result.included.length} chunks packed, {number.format(result.used)} tokens; {result.excluded.length} left out.
      </p>

      <div className="sp-pack-lists">
        <div>
          <h4 className="sp-pack-list-title">In the pack <span>highest priority first</span></h4>
          <ol className="sp-chunks">{result.included.map((c) => tile(c))}</ol>
        </div>
        <div>
          <h4 className="sp-pack-list-title">Left out <span>{result.excluded.length === 0 ? "nothing: the whole input fits" : `${number.format(total - result.used)} tokens`}</span></h4>
          <ol className="sp-chunks sp-chunks--out">{result.excluded.map(({ chunk, reason }) => tile(chunk, reason))}</ol>
        </div>
      </div>

      {/* On phones the method note folds away; the "illustrative input" flag above stays in view. */}
      {compact ? (
        <details className="sp-pack-about">
          <summary>How this model works</summary>
          <p className="sp-pack-note">{note}</p>
        </details>
      ) : (
        <p className="sp-pack-note">{note}</p>
      )}
    </div>
  );
}
