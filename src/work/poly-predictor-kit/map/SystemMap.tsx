import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { pipelines, type Pipeline, type Stage } from "../../../content/poly";
import Fold from "../../shared/Fold";
import { useReducedMotion } from "../../shared/motion";
import { EvidenceTag, channelName } from "../ui";
import "./map.css";

type Time = Pipeline["time"];

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const firstStage = (time: Time) => pipelines.find((p) => p.time === time)!.stages[0].id;

/** The selected station's card: what it takes, what it does, what it gives, and whose code it is. */
function Stop({ line, stage }: { line: Pipeline; stage: Stage }) {
  const index = line.stages.indexOf(stage);
  return (
    <div className="pp-stop" id="pp-stop" data-by={stage.by} aria-labelledby="pp-stop-title">
      <p className="pp-stop-kicker">
        {line.name} · stage {index + 1} of {line.stages.length}
      </p>
      <h4 className="pp-stop-title" id="pp-stop-title">{stage.name}</h4>
      <dl className="pp-stop-facts">
        <div><dt>Takes</dt><dd>{stage.input}</dd></div>
        <div><dt>Does</dt><dd>{stage.does}</dd></div>
        <div><dt>Gives</dt><dd>{stage.output}</dd></div>
      </dl>
      <p className="pp-stop-meta">
        <span className="pp-stop-by">{stage.by === "raimbek" ? "Raimbek's pipeline" : "Team"}</span>
        <span>{stage.byNote}</span>
        <span className="pp-stop-files">
          Code:{" "}
          {stage.files.map((f, i) => (
            <span key={f.label}>
              {i > 0 && ", "}
              <a href={f.href} target="_blank" rel="noreferrer">{f.label}</a>
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}

/** Every pipeline in words: the map's text version, for reading straight through. */
function MapText() {
  return (
    <div className="pp-map-text">
      {pipelines.map((line) => (
        <section key={line.id} aria-labelledby={`pp-text-${line.id}`}>
          <h4 id={`pp-text-${line.id}`}>
            {line.name} <span>({channelName[line.channel].toLowerCase()}, {line.time === "runtime" ? `“${line.button}” button` : "before runtime"}; {line.owner === "raimbek" ? "Raimbek's pipeline" : "a team component"})</span>
          </h4>
          <ol>
            {line.stages.map((s) => (
              <li key={s.id}>
                <b>{s.name}.</b> {s.does} {line.owner === "raimbek" && s.by === "team" && <i>Team component.</i>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

/**
 * The system map: each pipeline in the repository as a line, each stage as a station. Switch between
 * what runs when a button is pressed and what prepares the classifier beforehand; show the whole team
 * or Raimbek's part. Choosing a station sends a pulse down its line and opens its card.
 */
export default function SystemMap() {
  const [time, setTime] = useState<Time>("runtime");
  const [mine, setMine] = useState(false);
  const [selected, setSelected] = useState("insight-prompt");
  const reduced = useReducedMotion();
  // The pulse answers a choice, so it waits for the first one.
  const chosen = useRef(false);
  const stations = useRef(new Map<string, HTMLButtonElement>());
  const pulses = useRef(new Map<string, HTMLSpanElement>());
  const lines = pipelines.filter((p) => p.time === time);
  const current = lines.find((l) => l.stages.some((s) => s.id === selected)) ?? lines[0];
  const stage = current.stages.find((s) => s.id === selected) ?? current.stages[0];

  const choose = (id: string) => {
    chosen.current = true;
    setSelected(id);
  };

  const chooseTime = (t: Time) => {
    setTime(t);
    if (!pipelines.some((p) => p.time === t && p.stages.some((s) => s.id === selected))) setSelected(firstStage(t));
  };

  // The pulse: a dot that runs from the line's first station to the chosen one.
  useIsoLayoutEffect(() => {
    if (reduced || !chosen.current) return;
    const pulse = pulses.current.get(current.id);
    const from = stations.current.get(current.stages[0].id)?.querySelector(".pp-station-dot");
    const to = stations.current.get(stage.id)?.querySelector(".pp-station-dot");
    if (!pulse || !from || !to) return;
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const dx = b.left - a.left, dy = b.top - a.top;
    const animation = pulse.animate(
      [
        { transform: "translate(0, 0) scale(.6)", opacity: 0 },
        { transform: "translate(0, 0) scale(1)", opacity: 1, offset: 0.12 },
        { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.88 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.8)`, opacity: 0 },
      ],
      { duration: 320 + Math.hypot(dx, dy) * 0.9, easing: "cubic-bezier(.65, 0, .35, 1)" },
    );
    return () => animation.cancel();
  }, [stage.id, current.id, reduced]);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, line: Pipeline, index: number) => {
    const last = line.stages.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? Math.min(last, index + 1)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? Math.max(0, index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    const id = line.stages[next].id;
    choose(id);
    stations.current.get(id)?.focus();
  };

  return (
    <section className="pp-map" id="system-map" aria-labelledby="pp-map-title">
      <header className="pp-map-head">
        <p className="pp-kicker">System map</p>
        <h2 className="pp-map-title" id="pp-map-title">Follow an event through the code</h2>
        <p className="pp-map-intro">
          Each line is a pipeline in the repository and each station one of its stages. Choose a station to see what it takes,
          what it does and what it gives, with a link to its code.
        </p>
        <p className="pp-map-tags"><EvidenceTag kind="illustration" /> <EvidenceTag kind="verified" /></p>
      </header>

      <div className="pp-map-controls">
        <div className="pp-seg" role="group" aria-label="When it runs">
          <button type="button" aria-pressed={time === "runtime"} onClick={() => chooseTime("runtime")}>When a button is pressed</button>
          <button type="button" aria-pressed={time === "preparation"} onClick={() => chooseTime("preparation")}>Before: preparing the classifier</button>
        </div>
        <div className="pp-seg" role="group" aria-label="Whose part">
          <button type="button" aria-pressed={!mine} onClick={() => setMine(false)}>Whole system</button>
          <button type="button" aria-pressed={mine} onClick={() => setMine(true)}>Raimbek's pipelines</button>
        </div>
        <ul className="pp-map-legend" aria-label="Key">
          <li data-channel="numbers"><span aria-hidden="true" />The numbers: prices and volumes</li>
          <li data-channel="conversation"><span aria-hidden="true" />The conversation: comments</li>
          <li data-by="raimbek"><span aria-hidden="true" />Stage of Raimbek's pipelines</li>
        </ul>
      </div>

      <div className="pp-lines" data-mine={mine} data-time={time}>
        {lines.map((line) => {
          const focusIndex = Math.max(0, line.stages.findIndex((s) => s.id === selected));
          return (
            <div key={line.id} className="pp-line" data-channel={line.channel} data-time={line.time}>
              <div className="pp-line-head">
                <h3 className="pp-line-name">{line.name}</h3>
                <span className="pp-line-owner" data-owner={line.owner ?? "team"}>{line.owner === "raimbek" ? "Raimbek's pipeline" : "Team component"}</span>
                <p className="pp-line-meta">
                  {channelName[line.channel]} · {line.button ? <>the “{line.button}” button</> : "run beforehand, by hand"}
                </p>
              </div>
              <div className="pp-line-track">
                <span className="pp-pulse" aria-hidden="true" ref={(el) => { if (el) pulses.current.set(line.id, el); }} />
                <ol className="pp-stations" aria-label={`${line.name}, ${line.owner === "raimbek" ? "Raimbek's pipeline" : "team component"}, ${line.stages.length} stages`}>
                  {line.stages.map((s, i) => (
                    <li key={s.id} className="pp-station" data-by={s.by} data-role={s.role}>
                      <button
                        type="button"
                        ref={(el) => { if (el) stations.current.set(s.id, el); }}
                        aria-pressed={s.id === stage.id}
                        aria-controls="pp-stop"
                        tabIndex={i === focusIndex ? 0 : -1}
                        onClick={() => choose(s.id)}
                        onKeyDown={(e) => onKey(e, line, i)}
                      >
                        <span className="pp-station-dot" aria-hidden="true" />
                        <span className="pp-station-name">{s.name}</span>
                        <span className="pp-station-short">{s.short}</span>
                        {line.owner === "raimbek" && s.by === "team" && <span className="sp-sr">, team component</span>}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              {line === current && <Stop line={line} stage={stage} />}
            </div>
          );
        })}
        {time === "preparation" && (
          <p className="pp-lines-note">
            The model file at the end of this line is what the comment classifier loads when its button is pressed.
          </p>
        )}
      </div>

      <Fold summary="Read the system map as text">
        <MapText />
      </Fold>
    </section>
  );
}
