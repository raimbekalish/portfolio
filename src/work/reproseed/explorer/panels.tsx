import type { Example } from "../../../content/reproseed";
import { reproseed } from "../../../content/reproseed";
import { EvidenceTag } from "../ui";
import { listIds, outcomeText, seconds } from "./model";

/** Replay results as a row of chips, each saying what the oracle saw. */
function Runs({ observed, label }: { observed: string[]; label: string }) {
  return (
    <ol className="rs-runs" aria-label={label}>
      {observed.map((o, i) => (
        <li key={i}>
          <span className="rs-runs-n" aria-hidden="true">{i + 1}</span>
          {o}
        </li>
      ))}
    </ol>
  );
}

export function ReproducePanel({ example }: { example: Example }) {
  const { run } = example;
  return (
    <>
      <p>{example.bug}</p>
      <dl className="cs-facts">
        <div>
          <dt>Check</dt>
          <dd>{example.oracle.label}: <b>{example.oracle.intended}</b> intended</dd>
        </div>
        <div>
          <dt>Failure</dt>
          <dd><code>{example.failure.code}</code> · {example.failure.summary}</dd>
        </div>
      </dl>
      <p className="cs-sub">
        Baseline: the full scenario, replayed {run.baseline.length} times, each from a clean state <EvidenceTag kind="recorded" />
      </p>
      <Runs observed={run.baseline} label="Baseline replays" />
      <p>
        All {run.baseline.length} saw the same signature, so the search could start. Had they disagreed, the run would have
        stopped as flaky.
      </p>
    </>
  );
}

export function ProvePanel({ example }: { example: Example }) {
  const { run } = example;
  const step = (id: string) => example.steps.find((s) => s.id === id);
  const fromCache = run.singleDeletion.every((d) => d.source !== "executed");
  return (
    <>
      <p>
        Delta debugging can stop early, so each kept step is deleted once more on its own. If any deletion still
        reproduced the failure, that step would go and the check would repeat.
        {fromCache && " In this run every answer came from the cache or the dependency check: the search had already tried these subsets."}
      </p>
      <table className="rs-proof">
        <caption className="sp-sr">Deleting each kept step on its own</caption>
        <thead>
          <tr><th scope="col">Kept step</th><th scope="col">Deleting it alone</th><th scope="col">Why it matters</th></tr>
        </thead>
        <tbody>
          {run.singleDeletion.map((d) => (
            <tr key={d.removed} data-outcome={d.outcome}>
              <th scope="row"><code>{d.removed}</code><span className="rs-proof-action">{step(d.removed)?.action}</span></th>
              <td>{outcomeText[d.outcome].short}{d.observed && <> ({d.observed})</>}</td>
              <td>{example.keptBecause[d.removed]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="cs-sub">
        Outcomes recorded; reasons read from the demo page's source <EvidenceTag kind="recorded" /> <EvidenceTag kind="verified" />
      </p>
      <p>Removed: {listIds(run.removed)}. {example.removedBecause}</p>
    </>
  );
}

export function VerifyPanel({ example }: { example: Example }) {
  const { run } = example;
  const total = run.replays.baseline + run.replays.search + run.replays.verify;
  return (
    <>
      <p>
        The {run.kept.length} kept steps were replayed {run.verify.length} more times, each from a clean state, without
        reading the cache. All {run.verify.length} reproduced the same signature.
      </p>
      <Runs observed={run.verify} label="Final verification replays" />
      <p className="rs-status"><code>{run.status}</code></p>
      <blockquote className="rs-claim">
        <p>{reproseed.claim}</p>
        <footer>The command's result line, verbatim</footer>
      </blockquote>
      <dl className="cs-facts cs-facts-row">
        <div><dt>Browser replays</dt><dd>{total} ({run.replays.baseline} baseline, {run.replays.search} search, {run.replays.verify} verify)</dd></div>
        <div><dt>Candidate decisions</dt><dd>{run.candidateEvaluations}</dd></div>
        <div><dt>Cache hits</dt><dd>{run.cacheHits}</dd></div>
        <div><dt>Elapsed</dt><dd>{seconds(run.elapsedMs)}</dd></div>
      </dl>
      <p className="cs-sub">One local run; counts and times vary between runs <EvidenceTag kind="recorded" /></p>
    </>
  );
}

export function TestPanel({ example }: { example: Example }) {
  const { spec } = example.run;
  return (
    <>
      <p>
        A test is written only because the run verified. It resets the app, replays the {spec.embedded.length} kept steps
        in a fresh browser and asserts the intended result, not the bug's.
      </p>
      <p className="rs-embedded">
        <span className="cs-sub">Steps embedded in the file</span>
        <span>{spec.embedded.join(" → ")}</span>
      </p>
      <SpecExcerpt spec={spec} />
      <ul className="cs-list">
        <li>Retries are off, so a flaky pass cannot hide the bug.</li>
        <li>It refuses a non-loopback origin before it sends the reset credential.</li>
        <li>It does not import ReproSeed; the steps are embedded in the file.</li>
      </ul>
    </>
  );
}

/** Lines of the generated test, verbatim, numbered as in the file, with a gap mark where lines are left out. */
export function SpecExcerpt({ spec }: { spec: Example["run"]["spec"] }) {
  return (
    <figure className="cs-code">
      <figcaption>
        <span>{spec.file}, excerpt</span>
        <EvidenceTag kind="recorded" />
      </figcaption>
      <div className="cs-scroll" role="region" tabIndex={0} aria-label={`Excerpt of ${spec.file}`}>
        <pre><code>{spec.excerpt.map((line, i) => {
          const gap = i > 0 && line.n > spec.excerpt[i - 1].n + 1;
          return (
            <span key={line.n} className="cs-code-line" data-gap={gap || undefined}>
              <span className="cs-code-n" aria-hidden="true">{line.n}</span>
              {line.text}{"\n"}
            </span>
          );
        })}</code></pre>
      </div>
    </figure>
  );
}

/** The lines of Playwright's output that carry the result: the assertion's values and the tally. */
const resultLines = (lines: string[]) => lines.filter((l) => /^(Expected|Received):|^\d+ (failed|passed)/.test(l));

export function FixPanel({ example }: { example: Example }) {
  return (
    <>
      <p>The same generated test, run twice: against the buggy page, then against the repository's test-only fixed page.</p>
      <TestResults example={example} />
      <FixDiff example={example} />
    </>
  );
}

/** The generated test's result on the buggy page and on the fixed page: Playwright's own last lines. */
export function TestResults({ example }: { example: Example }) {
  const { test } = example.run;
  return (
    <>
      <div className="rs-ab">
        <figure className="rs-ab-side" data-status="fail">
          <figcaption>Buggy page</figcaption>
          <pre><code>{resultLines(test.buggy).join("\n")}</code></pre>
        </figure>
        <figure className="rs-ab-side" data-status="pass">
          <figcaption>Fixed page <span>({example.fix.name})</span></figcaption>
          <pre><code>{resultLines(test.fixed).join("\n")}</code></pre>
        </figure>
      </div>
      <p className="cs-sub">Playwright output, result lines <EvidenceTag kind="recorded" /></p>
    </>
  );
}

/** The repository's test-only fix, as a diff against the buggy page. */
export function FixDiff({ example }: { example: Example }) {
  return (
    <figure className="rs-diff">
      <figcaption>
        <span>The fix: {example.fix.summary}</span>
        <EvidenceTag kind="verified" />
      </figcaption>
      <pre><code>{example.fix.diff.map((l, i) => (
        <span key={i} className="rs-diff-line" data-op={l.op === "+" ? "add" : l.op === "-" ? "del" : "same"}>
          <span className="rs-diff-op" aria-hidden="true">{l.op}</span>
          <span className="sp-sr">{l.op === "+" ? "Added: " : l.op === "-" ? "Removed: " : ""}</span>
          {l.text}{"\n"}
        </span>
      ))}</code></pre>
      <p className="cs-note">ReproSeed does not write fixes. The repository ships this page as a test-only variant, so the exported test can be checked both ways.</p>
    </figure>
  );
}
