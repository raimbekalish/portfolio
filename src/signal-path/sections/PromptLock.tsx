import { promptlockProject as lock } from "../content";
import { sectionIds } from "../structure";
import { OutLink, WorkIndex } from "../ui";
import BudgetPacker from "./BudgetPacker";

/** PromptLock: a printout-white ledger of tokens, with the budget model as its instrument. */
export default function PromptLock() {
  return (
    <section className="sp-pl" id={sectionIds.promptlock} aria-labelledby="sp-pl-title">
      <div className="sp-pl-grid">
        <header className="sp-pl-head">
          <p className="sp-kicker"><WorkIndex id={sectionIds.promptlock} /> — {lock.event}</p>
          <h2 className="sp-pl-title" id="sp-pl-title">{lock.name}</h2>
          <p className="sp-pl-problem">{lock.problem}</p>
        </header>
        <dl className="sp-pl-facts">
          <div>
            <dt>My part</dt>
            <dd>{lock.contribution}</dd>
            <dd>{lock.interface}</dd>
          </div>
          <div>
            <dt>How it works</dt>
            <dd>
              <ol className="sp-pl-steps">
                {lock.pipeline.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </dd>
          </div>
        </dl>
        <p className="sp-pl-links">
          <span>{lock.team} · {lock.stack.join(" · ")}</span>
          <OutLink href={lock.source}>Source</OutLink>
          <OutLink href={lock.devpost}>Devpost</OutLink>
        </p>
        <BudgetPacker />
      </div>
    </section>
  );
}
