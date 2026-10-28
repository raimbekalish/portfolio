import { useState, type CSSProperties } from "react";
import { steamroller } from "../../../content/poly";
import { EvidenceTag } from "../ui";
import "./risk.css";

// The detector's arithmetic (main_steamroller.py): buying an outcome at price p wins 1 − p per $1 and
// loses p, so one loss erases p ÷ (1 − p) wins. A side is flagged when p ≥ 0.9 and that factor ≥ 10.
const MIN = 50;
const MAX = 99;
const wipeout = (p: number) => p / (1 - p);
// The page works in whole percents, so the factor is exact here (99% gives 99, not 98.999…).
const wipeoutAt = (percent: number) => percent / (100 - percent);
const flaggedAt = (percent: number) => percent / 100 >= steamroller.minProbability && wipeoutAt(percent) >= steamroller.minWipeout;

// Plot coordinates, 0–100 on both axes: probability on x, the wipeout factor on a log scale (1–100) on y.
const px = (p: number) => ((p * 100 - MIN) / (MAX - MIN)) * 100;
const py = (w: number) => (1 - Math.log10(Math.min(100, Math.max(1, w))) / 2) * 100;
const curve = Array.from({ length: (MAX - MIN) * 4 + 1 }, (_, i) => {
  const p = (MIN + i / 4) / 100;
  return `${i ? "L" : "M"}${px(p).toFixed(2)} ${py(wipeout(p)).toFixed(2)}`;
}).join(" ");
const xTicks = [50, 60, 70, 80, 90, 99];
const yTicks = [1, 3, 10, 30, 100];
const cents = (v: number) => `${Math.round(v * 100)}¢`;

/**
 * The risk shape: choose a price and see what the steamroller detector sees, computed here from its
 * own formula. No market data and no model are involved.
 */
export default function RiskShape() {
  const [percent, setPercent] = useState(93);
  const p = percent / 100;
  const w = wipeoutAt(percent);
  const isFlagged = flaggedAt(percent);
  const erased = Math.floor(w);
  const describe = `${percent} percent: win ${cents(1 - p)} or lose ${cents(p)} per share; one loss erases ${erased} ${erased === 1 ? "win" : "wins"}; ${isFlagged ? "flagged" : "not flagged"} by the detector`;
  const point = { "--x": `${px(p)}%`, "--y": `${py(w)}%` } as CSSProperties;

  return (
    <div className="pp-risk" data-flagged={isFlagged}>
      <div className="pp-risk-read">
        <p className="pp-risk-price">
          <span className="pp-risk-label">Price, read as probability</span>
          <b>{percent}%</b>
        </p>
        <dl className="pp-risk-facts">
          <div><dt>Win per share</dt><dd>{cents(1 - p)}</dd></div>
          <div><dt>Lose per share</dt><dd>{cents(p)}</dd></div>
          <div><dt>One loss erases</dt><dd>{erased} {erased === 1 ? "win" : "wins"}</dd></div>
        </dl>
        <div className="pp-risk-bars" aria-hidden="true">
          <span className="pp-risk-bar" data-kind="win" style={{ "--v": 1 - p } as CSSProperties} />
          <span className="pp-risk-bar" data-kind="lose" style={{ "--v": p } as CSSProperties} />
        </div>
        <p className="pp-risk-verdict">
          {isFlagged
            ? "The detector would flag this: at least 90%, and at least 10 wins erased by one loss."
            : percent >= 90
              ? "Not flagged yet: one loss erases fewer than 10 wins."
              : "Not flagged: below 90%."}
        </p>
      </div>

      <figure className="pp-risk-chart">
        <figcaption className="pp-risk-chart-head">
          <span>Wins erased by one loss, against price</span>
          <EvidenceTag kind="computed" />
        </figcaption>
        <div className="pp-plot" aria-hidden="true">
          <div className="pp-plot-area">
            <span className="pp-plot-zone" style={{ "--x": `${px(steamroller.minProbability)}%`, "--y": `${py(steamroller.minWipeout)}%` } as CSSProperties} />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              {yTicks.map((t) => <line key={t} className="pp-plot-grid" x1="0" x2="100" y1={py(t)} y2={py(t)} vectorEffect="non-scaling-stroke" />)}
              <path className="pp-plot-curve" d={curve} vectorEffect="non-scaling-stroke" />
              <line className="pp-plot-guide" x1={px(p)} x2={px(p)} y1="100" y2={py(w)} vectorEffect="non-scaling-stroke" />
              <line className="pp-plot-guide" x1="0" x2={px(p)} y1={py(w)} y2={py(w)} vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="pp-plot-point" style={point} />
            <span className="pp-plot-zone-label" style={{ "--x": `${px(steamroller.minProbability)}%` } as CSSProperties}>Flagged zone</span>
            {xTicks.map((t) => <span key={t} className="pp-plot-x" style={{ "--x": `${px(t / 100)}%` } as CSSProperties}>{t}%</span>)}
            {yTicks.map((t) => <span key={t} className="pp-plot-y" style={{ "--y": `${py(t)}%` } as CSSProperties}>{t}</span>)}
          </div>
          <span className="pp-plot-axis" data-axis="x">Price, read as probability</span>
        </div>
        <label className="pp-risk-slider" htmlFor="pp-risk-price">
          <span>Choose a price</span>
          <input
            id="pp-risk-price"
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={percent}
            style={{ "--fill": `${((percent - MIN) / (MAX - MIN)) * 100}%` } as CSSProperties}
            aria-valuetext={describe}
            onChange={(e) => setPercent(Number(e.target.value))}
          />
        </label>
      </figure>
      <p className="pp-risk-note">
        Computed in your browser from the team's detector formula, with no market data. It explains the rule; it is not advice. The
        detector also uses the days left to resolution to grade the risk; that part is not shown here.
      </p>
    </div>
  );
}
