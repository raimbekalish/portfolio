import { pipeline, reproseed, safeguards } from "../../../content/reproseed";
import { duplicate, stale } from "../examples";
import { FixDiff, SpecExcerpt, TestResults } from "../explorer/panels";
import { listIds, seconds } from "../explorer/model";
import Fold from "../../shared/Fold";
import Sequence from "../Sequence";
import { Chapter, EvidenceTag, Terminal } from "../ui";

export function Problem() {
  return (
    <Chapter id="problem" n="01" name="Problem" title="Timing bugs arrive as long recordings.">
      <p className="cs-lede">
        Some bugs need a slow response and a click at the wrong moment. They reach a developer as a long list of steps, most
        of them irrelevant, and they fail only some of the time. Cutting the list down by hand means replaying it again and
        again, and a fix shipped without a test that failed first proves little.
      </p>
      <p>ReproSeed takes a browser scenario that fails and a check that defines the failure, and does five things in order:</p>
      <ol className="rs-pipeline">
        {pipeline.map((p, i) => (
          <li key={p.id}>
            <span className="rs-pipeline-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <b>{p.name}</b>
            <span>{p.detail}</span>
          </li>
        ))}
      </ol>
      <p className="rs-boundary">
        <b>Scope.</b> {reproseed.boundary} The app must run on the same machine and answer ReproSeed's identity and reset
        endpoints, as the two demo apps in the repository do.
      </p>
    </Chapter>
  );
}

export function Reproduction() {
  return (
    <Chapter id="reproduction" n="02" name="Reproduction" title="Every replay starts from nothing.">
      <p className="cs-lede">
        A scenario is a JSON file: ordered steps (goto, click, fill, wait and delay), the steps each one depends on, and an
        oracle that defines the failure. The duplicate-submit scenario has nine.
      </p>
      {duplicate.excerpt && (
        <Fold summary="The scenario file, excerpt">
          <figure className="cs-code">
            <figcaption>
              <span>{duplicate.file}, excerpt</span>
              <EvidenceTag kind="verified" />
            </figcaption>
            <div className="cs-scroll" role="region" tabIndex={0} aria-label={`Excerpt of ${duplicate.file}`}>
              <pre><code>{duplicate.excerpt}</code></pre>
            </div>
          </figure>
        </Fold>
      )}
      <h3 className="cs-h3">One replay</h3>
      <ol className="rs-steps">
        <li>Check that the app on the loopback origin answers with the expected app id, then reset it with the credential from the environment. The record list must come back empty.</li>
        <li>Open a fresh browser context. Requests to any other origin are blocked.</li>
        <li>Run the steps. A delay step lets the request reach the server and holds only the response, the way a slow network would: Playwright fetches the response, waits, then delivers it.</li>
        <li>Wait for the page's requests to settle, then run the oracle.</li>
      </ol>
      <p>
        The oracle returns a signature, not a yes or no: <code>{duplicate.failure.code}</code> with the email, the{" "}
        {duplicate.failure.observed} seen and the {duplicate.oracle.intended} expected. Only an exact match counts as the bug.
        A timeout, a runner error or a different failure, such as 0 records, is something else. Before the search starts,
        three baseline replays of the full scenario must agree; otherwise the run stops as flaky or not reproducible.
      </p>
      <Sequence example={duplicate} />
      <h3 className="cs-h3">Kept to local test apps</h3>
      <p>{reproseed.boundary}</p>
      <Fold summary={`The ${safeguards.length} safeguards that enforce it`}>
        <ul className="cs-list">
          {safeguards.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </Fold>
    </Chapter>
  );
}

export function Minimization() {
  const { run } = duplicate;
  const dependent = run.singleDeletion.filter((d) => d.outcome === "invalid").map((d) => d.removed);
  return (
    <Chapter id="minimization" n="03" name="Minimization" title="Delete until every step is needed.">
      <p className="cs-lede">
        The search is delta debugging: split the steps into chunks, try each chunk and each complement, and split finer when
        nothing smaller fails the same way.
      </p>
      <p>
        A subset missing a step that another step depends on is rejected before any browser starts. A new subset is replayed
        twice, and a disagreement counts as inconclusive; a subset tried before is answered from a cache that keeps only
        results whose replays agreed. A budget bounds the whole run:{" "}
        {duplicate.budget.replays} replays and {duplicate.budget.minutes} minutes for this scenario. Delta debugging can stop
        early, so the search ends with a proof pass: each remaining step is deleted on its own, and if a deletion still
        reproduces the failure, the step goes and the pass starts again.
      </p>
      <blockquote className="rs-claim">
        <p>{reproseed.claim}</p>
        <footer>The command's result line, verbatim</footer>
      </blockquote>
      <p>
        In plain terms: no single remaining step can be deleted. That is a narrower claim than shortest. The search never
        reorders steps, never tries a shorter delay and never substitutes a different step, so a shorter reproduction may
        exist. Steps kept only because others depend on them, {listIds(dependent)} here, have not been shown to cause the bug.
      </p>
      <p>
        In the recorded run the search removed {listIds(run.removed)} and kept {run.kept.length} steps, using{" "}
        {run.replays.search} search replays and {run.cacheHits} cache hits. <a className="sp-text-link" href="#explorer">See every candidate in the explorer</a>.
      </p>
    </Chapter>
  );
}

export function RegressionTest() {
  const { run } = duplicate;
  return (
    <Chapter id="regression-test" n="04" name="Regression test" title="A test that fails for the right reason.">
      <p className="cs-lede">
        ReproSeed writes a test only for a verified run: a known baseline failure, kept steps in their original order with
        their dependencies, and five final replays that all reproduced it. An unstable, incomplete or over-budget run writes
        its report and no test.
      </p>
      <p>
        The test asserts the intended behaviour, {duplicate.oracle.intended}, not the {duplicate.failure.observed} the bug
        creates. It embeds the {run.spec.embedded.length} kept steps with their selectors, values and delay, resets the app
        first, refuses a non-loopback origin before sending the credential, runs with retries off and does not import
        ReproSeed.
      </p>
      <Fold summary="The command's terminal output">
        <Terminal command={run.terminal.command} lines={run.terminal.output} label="Minimizing the duplicate-submit scenario" />
      </Fold>
      <Fold summary="The generated test, excerpt">
        <SpecExcerpt spec={run.spec} />
      </Fold>
    </Chapter>
  );
}

export function VerifiedFix() {
  return (
    <Chapter id="verified-fix" n="05" name="Verified fix" title="Red on the bug, green on the fix.">
      <p className="cs-lede">
        The command does not run the test it writes. Run with Playwright, the same file fails against the buggy page and
        passes against the repository's test-only fixed page.
      </p>
      <TestResults example={duplicate} />
      <Fold summary="Playwright's full output, both runs">
        <div className="rs-pair">
          <Terminal command={duplicate.run.test.command} lines={duplicate.run.test.buggy} label="Generated test, buggy page" status="fail" />
          <Terminal command={duplicate.run.test.command} lines={duplicate.run.test.fixed} label={`Generated test, fixed page (${duplicate.fix.name})`} status="pass" />
        </div>
      </Fold>
      <Fold summary="The fix, as a diff">
        <FixDiff example={duplicate} />
      </Fold>

      <h3 className="cs-h3">The same engine, a second bug</h3>
      <p>
        {stale.name}: {stale.bug.charAt(0).toLowerCase() + stale.bug.slice(1)} It uses the same minimizer, runner, exporter and
        command with a different oracle, the text of one element. The minimizer has no search-specific code; it compares
        failure signatures. A run that never searches for beta shows “Results for alpha”, a different failure, so it does not
        count as the bug.
      </p>
      <dl className="cs-facts cs-facts-row">
        <div><dt>Steps</dt><dd>{stale.steps.length} → {stale.run.kept.length}</dd></div>
        <div><dt>Removed</dt><dd>{listIds(stale.run.removed)}</dd></div>
        <div><dt>Browser replays</dt><dd>{stale.run.replays.baseline + stale.run.replays.search + stale.run.replays.verify}</dd></div>
        <div><dt>Cache hits</dt><dd>{stale.run.cacheHits}</dd></div>
        <div><dt>Elapsed</dt><dd>{seconds(stale.run.elapsedMs)}</dd></div>
      </dl>
      <p className="cs-sub">
        One recorded run <EvidenceTag kind="recorded" />
        {stale.documented && (
          <> · The README records a measured run of {stale.documented.replays} replays, {stale.documented.cacheHits} cache hits and {stale.documented.time} <EvidenceTag kind="verified" /></>
        )}
      </p>
      <Fold summary="Why stale search fails, and its test results">
        <Sequence example={stale} />
        <TestResults example={stale} />
      </Fold>
    </Chapter>
  );
}
