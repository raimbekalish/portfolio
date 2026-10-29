import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { Example } from "../../../content/reproseed";
import { duplicate, examples } from "../examples";
import StepScript from "../StepScript";
import { EvidenceTag } from "../ui";
import MinimizePanel from "./MinimizePanel";
import { FixPanel, ProvePanel, ReproducePanel, TestPanel, VerifyPanel } from "./panels";
import { outcomeText, searchLog, smallestAfter, stages, type StageId } from "./model";
import "./explorer.css";

const exampleById = (id: Example["id"]) => examples.find((e) => e.id === id) ?? duplicate;

/**
 * The Bug Minimization Explorer: a guided walk through one recorded, verified run. The script on the
 * left shows the scenario as each stage sees it; the panel on the right explains the stage with the
 * run's own data. Nothing here executes anything.
 */
export default function Explorer() {
  const [exampleId, setExampleId] = useState<Example["id"]>(duplicate.id);
  const [stage, setStage] = useState<StageId>("reproduce");
  const [cursor, setCursor] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const example = exampleById(exampleId);
  const log = useMemo(() => searchLog(example), [example]);
  const smallest = useMemo(() => smallestAfter(example, log), [example, log]);
  const ids = example.steps.map((s) => s.id);
  const index = stages.findIndex((s) => s.id === stage);

  const chooseExample = (id: Example["id"]) => {
    setExampleId(id);
    setCursor(0);
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = stages.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    setStage(stages[next].id);
    tabs.current[next]?.focus();
  };

  // What the script shows at this stage.
  const removed =
    stage === "reproduce" ? []
    : stage === "minimize" ? ids.filter((id) => !smallest[cursor].includes(id))
    : example.run.removed;
  const included = stage === "minimize" ? log[cursor].steps : undefined;
  const notes =
    stage === "prove"
      ? Object.fromEntries(example.run.singleDeletion.map((d) => [d.removed, `Delete it: ${outcomeText[d.outcome].short.toLowerCase()}`]))
      : undefined;
  const kept = stage === "reproduce" ? ids.length : stage === "minimize" ? smallest[cursor].length : example.run.kept.length;

  return (
    <section className="rs-ex" id="explorer" aria-labelledby="rs-ex-title">
      <header className="rs-ex-head">
        <p className="sp-kicker">Bug Minimization Explorer</p>
        <h2 className="rs-ex-title" id="rs-ex-title">Step through a verified run</h2>
        <p className="rs-ex-intro">
          A guided demonstration of one recorded run. Every outcome comes from the run's report; nothing executes in your
          browser, and the animation is not the minimizer.
        </p>
        <p className="rs-ex-tags"><EvidenceTag kind="guided" /> <EvidenceTag kind="recorded" /></p>
        <div className="rs-seg" role="group" aria-label="Example">
          {examples.map((e) => (
            <button key={e.id} type="button" aria-pressed={e.id === exampleId} onClick={() => chooseExample(e.id)}>
              {e.name}
            </button>
          ))}
        </div>
      </header>

      <div className="rs-ex-tabs" role="tablist" aria-label="Stages of the run">
        {stages.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`rs-tab-${s.id}`}
            aria-selected={s.id === stage}
            aria-controls="rs-ex-panel"
            tabIndex={s.id === stage ? 0 : -1}
            onClick={() => setStage(s.id)}
            onKeyDown={onTabKey}
          >
            <span className="rs-ex-tab-n" aria-hidden="true">{i + 1}</span>
            {s.name}
          </button>
        ))}
      </div>

      <div className="rs-ex-body">
        <figure className="rs-ex-script">
          <figcaption className="rs-ex-script-head">
            <span>{example.file.split("/")[1]}</span>
            <span>{kept} of {ids.length} steps</span>
          </figcaption>
          <StepScript
            steps={example.steps}
            removed={removed}
            included={included}
            notes={notes}
            label={`${example.name} scenario: ${kept} of ${ids.length} steps${removed.length ? `; removed: ${removed.join(", ")}` : ""}`}
          />
        </figure>

        <div className="rs-ex-panel" id="rs-ex-panel" role="tabpanel" aria-labelledby={`rs-tab-${stage}`}>
          <h3 className="rs-ex-panel-title">{stages[index].title}</h3>
          {stage === "reproduce" && <ReproducePanel example={example} />}
          {stage === "minimize" && <MinimizePanel example={example} log={log} smallest={smallest} cursor={cursor} onCursor={setCursor} />}
          {stage === "prove" && <ProvePanel example={example} />}
          {stage === "verify" && <VerifyPanel example={example} />}
          {stage === "test" && <TestPanel example={example} />}
          {stage === "fix" && <FixPanel example={example} />}
          {index < stages.length - 1 && (
            <button
              type="button"
              className="rs-ex-next"
              onClick={() => {
                setStage(stages[index + 1].id);
                tabs.current[index + 1]?.focus();
              }}
            >
              Next: {stages[index + 1].name} <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
