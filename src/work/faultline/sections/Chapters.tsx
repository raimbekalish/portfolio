import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  capabilities,
  capabilityStatus,
  cleanup,
  closing,
  deadlineMs,
  deadlineReading,
  faultline,
  intro,
  lifecycle,
  lifecycleSource,
  records,
  run400,
  run80,
  runLimits,
  topology,
  traceChain,
  traceRun,
  validation,
  type CapabilityStatus,
  type RecordedRun,
} from "../../../content/faultline";
import { caseStudy as reproseedCase } from "../../../content/reproseed";
import { OutLink } from "../../../signal-path/ui";
import { homeSection } from "../../site";
import Fold from "../../shared/Fold";
import DeadlineCut from "../deadline/DeadlineCut";
import { ms } from "../scale";
import { Chapter, Cite, EvidenceTag } from "../ui";

const phase = (run: RecordedRun, id: "baseline" | "fault" | "recovery") => run.phases.find((p) => p.id === id)!;
const shortHash = (hash: string) => `${hash.slice(0, 8)}…${hash.slice(-6)}`;
const bytes = new Intl.NumberFormat("en-US");

/** 01: the topology, the lifecycle of one experiment, its bounds and its boundary. */
export function Experiment() {
  return (
    <Chapter
      id="experiment"
      n="01"
      kicker="A controlled experiment"
      title="One request path, one owned fault, three measured phases."
      lede="Every experiment runs against the same four containers in an isolated Docker Compose project. The runner creates the fault, measures what the requests see, removes it and cleans up after itself."
    >
      <div className="fl-exp">
        <figure className="fl-topo" aria-labelledby="fl-topo-cap">
          <figcaption className="fl-fig-head" id="fl-topo-cap">
            <span>The sample topology</span>
            <EvidenceTag kind="verified" />
          </figcaption>
          <ol className="fl-topo-path">
            {topology.services.map((s) => (
              <li key={s.name} className="fl-topo-node" data-node={s.name.toLowerCase()}>
                <i aria-hidden="true" />
                <b>{s.name}</b>
                <span className="fl-topo-role">{s.role}</span>
                <span className="fl-topo-note">{s.note}</span>
              </li>
            ))}
          </ol>
          <p className="fl-topo-control">
            <span className="sp-st-label">Control lane</span>
            {topology.control}
          </p>
          <ul className="fl-topo-isolation" aria-label="Isolation">
            {topology.isolation.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Cite href={topology.source}>docs/architecture.md</Cite>
        </figure>

        <div className="fl-life">
          <h3 className="fl-h3">The lifecycle of one run</h3>
          <ol className="fl-life-steps">
            {lifecycle.map((step) => (
              <li key={step.name} data-phase={step.phase}>
                <b>{step.name}</b>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
          <Cite href={lifecycleSource}>“Implemented lifecycle”, docs/architecture.md</Cite>
        </div>
      </div>

      <dl className="fl-limits">
        {runLimits.map((l) => (
          <div key={l.label}>
            <dt>{l.label}</dt>
            <dd>{l.value}</dd>
          </div>
        ))}
      </dl>

      <p className="fl-boundary">
        <span className="sp-st-label">The boundary</span>
        <span className="fl-boundary-text">
          Faultline runs experiments only on its own isolated sample topology. <em>It is not production chaos engineering infrastructure:</em>{" "}
          it has no arbitrary targets, no browser fault control and no hosted service.
        </span>
      </p>
    </Chapter>
  );
}

/** One row of the comparison table, the same measure for both runs. */
function Row({ label, values }: { label: string; values: [ReactNode, ReactNode] }) {
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{values[0]}</td>
      <td>{values[1]}</td>
    </tr>
  );
}

/** 02: the signature figure, what it shows in words, and both runs side by side. */
export function Deadline() {
  const pair = [run80, run400] as const;
  const both = <T,>(f: (run: RecordedRun) => T) => [f(pair[0]), f(pair[1])] as [T, T];
  return (
    <Chapter
      id="deadline"
      n="02"
      kicker="Where the deadline cuts"
      title={<>Below the deadline, latency slows a request. <em>Above it, the deadline answers first.</em></>}
      lede={`The frontend gives its dependency ${deadlineMs} ms. Two runs from the same validation record sit on either side of that line.`}
    >
      <DeadlineCut />

      <div className="fl-dl-after">
        <div className="fl-dl-reading">
          <h3 className="fl-h3">What the two runs show</h3>
          <p>{deadlineReading.below}</p>
          <p>{deadlineReading.above}</p>
          <p>{deadlineReading.recovery}</p>
          <p className="fl-caveat">{deadlineReading.caveat}</p>
        </div>

        <div className="fl-table-wrap" role="region" tabIndex={0} aria-labelledby="fl-compare-cap">
          <table className="fl-table fl-compare">
            <caption id="fl-compare-cap">The two recorded runs</caption>
            <thead>
              <tr>
                <td />
                <th scope="col">80 ms run</th>
                <th scope="col">400 ms run</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Injected latency" values={both((r) => `${r.injectedMs} ms, ${r.injectedMs > deadlineMs ? "above" : "below"} the deadline`)} />
              <Row label="Tracing" values={both((r) => (r.tracing ? "On" : "Off"))} />
              <Row label="Requests per phase" values={both((r) => String(r.requests))} />
              <Row label="Baseline mean" values={both((r) => ms(phase(r, "baseline").meanMs))} />
              <Row label="Fault mean" values={both((r) => <b>{ms(phase(r, "fault").meanMs)}</b>)} />
              <Row
                label="Failed under the fault"
                values={both((r) => {
                  const f = phase(r, "fault");
                  return f.failed ? <span data-tone="fault">{f.failed} of {r.requests}, HTTP {f.status}</span> : `0 of ${r.requests}`;
                })}
              />
              <Row label="Recovery mean" values={both((r) => ms(phase(r, "recovery").meanMs))} />
              <Row label="Evidence file" values={both((r) => `${r.bundle.file}, ${bytes.format(r.bundle.bytes)} bytes`)} />
              <Row label="SHA-256" values={both((r) => <code title={r.bundle.sha256}>{shortHash(r.bundle.sha256)}</code>)} />
            </tbody>
          </table>
          <p className="fl-table-foot">
            Both from clean commit {validation.revision}; each completed, confirmed cleanup and was exported twice with identical bytes.{" "}
            <Cite href={validation.source}>docs/validation.md</Cite>
          </p>
        </div>
      </div>
    </Chapter>
  );
}

/** 03: recovery and cleanup as guarantees, then what a trace shows from inside one failed request. */
export function Recovery() {
  const timeout = traceRun.rows.find((r) => r.scenario.startsWith("400"))!;
  // The runner's figure is its recorded observation; the others are span durations.
  const durations = [`${timeout.observation} observed`, "", `${timeout.client} span`, `${timeout.server} span`];
  const statuses = ["HTTP 504, error", "HTTP 504, error", "Timeout, no HTTP status", "Completed"];
  return (
    <Chapter
      id="recovery"
      n="03"
      kicker="Recovery, cleanup and traces"
      title="Every fault it adds, the run owns and removes."
      lede="Recovery is part of the measurement, cleanup is part of the run, and with tracing on, each failed request can be followed from the runner to the dependency."
    >
      <div className="fl-rec">
        <div className="fl-rec-guarantees">
          <h3 className="fl-h3">Recovery and cleanup <EvidenceTag kind="verified" /></h3>
          <ol className="fl-rec-list">
            {cleanup.points.map((p) => <li key={p}>{p}</li>)}
          </ol>
        </div>
        <div className="fl-rec-side">
          <p className="fl-rec-limit">
            <span className="sp-st-label">Where the guarantee ends</span>
            {cleanup.limit}
          </p>
          <Cite href={cleanup.source}>docs/architecture.md</Cite>
        </div>
      </div>

      <figure className="fl-trace" aria-labelledby="fl-trace-cap">
        <figcaption className="fl-fig-head" id="fl-trace-cap">
          <span>One traced request with {run400.injectedMs} ms injected</span>
          <EvidenceTag kind="recorded" />
        </figcaption>
        <div className="fl-trace-body">
          <ol className="fl-trace-tree">
            {traceChain.map((s, i) => (
              <Fragment key={s.span + s.service}>
                {s.service === "faultline-dependency" && (
                  <li className="fl-trace-gap" style={{ "--depth": 3 } as CSSProperties}>
                    Toxiproxy · no span · holds the reply for {run400.injectedMs} ms
                  </li>
                )}
                <li className="fl-trace-span" style={{ "--depth": s.depth } as CSSProperties} data-error={i < 3}>
                  <span className="fl-trace-name">
                    <b>{s.service}</b> <span>{s.span}</span>
                  </span>
                  <span className="fl-trace-ms">{durations[i] || "—"}</span>
                  <span className="fl-trace-status">{statuses[i]}</span>
                </li>
              </Fragment>
            ))}
          </ol>
          <div className="fl-trace-side">
            <p className="fl-trace-reading">{traceRun.reading}</p>
            <Fold summary="All four scenarios in that run">
              <div className="fl-table-wrap" role="region" tabIndex={0} aria-label="Traced observations, one per scenario">
                <table className="fl-table">
                  <thead>
                    <tr>
                      <th scope="col">Scenario</th>
                      <th scope="col">Runner</th>
                      <th scope="col">Frontend’s call</th>
                      <th scope="col">Dependency</th>
                      <th scope="col">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traceRun.rows.map((r) => (
                      <tr key={r.scenario}>
                        <th scope="row">{r.scenario}</th>
                        <td>{r.observation}</td>
                        <td>{r.client}</td>
                        <td>{r.server}</td>
                        <td>{r.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Fold>
          </div>
        </div>
        <p className="fl-note">
          The initial successful milestone-2 integration run, one observation per scenario: a different run from chapter 02.{" "}
          {traceRun.limits} <Cite href={traceRun.source}>“Reading a trace”, docs/tracing.md</Cite>
        </p>
      </figure>
    </Chapter>
  );
}

/** 04: history, the project's own dashboard, and the evidence file and what checks it. */
export function Records() {
  const shot = records.screenshot;
  return (
    <Chapter
      id="records"
      n="04"
      kicker="History, dashboard and evidence"
      title="The run outlives the lab."
      lede="Each run is kept in local SQLite history, browsed in a read-only dashboard, and exported as a .flb file that can be checked without the database, Docker or the network."
    >
      <div className="fl-shot-row">
        <figure className="fl-shot">
          <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
          <figcaption>
            <span className="fl-fig-head">
              <span>The project’s dashboard</span>
              <EvidenceTag kind="screenshot" />
            </span>
            <span>{shot.caption}</span>
            <span className="fl-shot-links">
              <a className="fl-original" href={shot.src} target="_blank" rel="noreferrer">
                View at full size ({shot.width} × {shot.height}) <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
              </a>
              <a className="fl-original" href={shot.original} target="_blank" rel="noreferrer">
                The original in the repository (PNG) <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
              </a>
            </span>
          </figcaption>
        </figure>
        <dl className="fl-records-facts">
          <div>
            <dt>History</dt>
            <dd>{records.history} <Cite href={records.sources.history}>docs/history.md</Cite></dd>
          </div>
          <div>
            <dt>Dashboard</dt>
            <dd>{records.dashboard} <Cite href={records.sources.dashboard}>docs/dashboard.md</Cite></dd>
          </div>
        </dl>
      </div>

      <div className="fl-bundle">
        <figure className="fl-zip" aria-labelledby="fl-zip-cap">
          <figcaption className="fl-fig-head" id="fl-zip-cap">
            <span>Inside a .flb file</span>
            <EvidenceTag kind="verified" />
          </figcaption>
          <ol className="fl-zip-entries">
            {records.bundle.map((e) => (
              <li key={e.entry}>
                <code>{e.entry}</code>
                <span>{e.holds}</span>
                <span className="fl-zip-max">max {e.max}</span>
              </li>
            ))}
          </ol>
          <p className="fl-note">{records.format}</p>
        </figure>
        <div className="fl-verify">
          <h3 className="fl-h3">Checked offline</h3>
          <p>{records.verifier}</p>
          <ul className="fl-hashes">
            {[run80, run400].map((r) => (
              <li key={r.bundle.file}>
                <span className="sp-st-label">{r.bundle.file} · {bytes.format(r.bundle.bytes)} bytes</span>
                <code>{r.bundle.sha256}</code>
              </li>
            ))}
          </ul>
          <p className="fl-note">{records.checksum}</p>
          <Cite href={records.sources.evidence}>docs/evidence.md</Cite>
        </div>
      </div>
    </Chapter>
  );
}

/** 05: what exists, what ships and what does not, by status. */
export function Status() {
  return (
    <Chapter
      id="status"
      n="05"
      kicker="What ships, what does not"
      title="The repository holds more than the release."
      lede={intro.release}
    >
      <dl className="fl-chip-key">
        {(Object.keys(capabilityStatus) as CapabilityStatus[]).map((key) => (
          <div key={key}>
            <dt>
              <span className="fl-chip" data-status={key}>{capabilityStatus[key].label}</span>
              <span className="fl-chip-count">{capabilities.filter((c) => c.status === key).length}</span>
            </dt>
            <dd>{capabilityStatus[key].detail}</dd>
          </div>
        ))}
      </dl>
      <Fold summary={`All ${capabilities.length} capabilities, with their sources`}>
        <p className="fl-caps-cap" id="fl-status-cap">Capabilities by status, at main {faultline.commit.sha}</p>
        <div className="fl-caps-head" aria-hidden="true">
          <span>Capability</span>
          <span>Status</span>
          <span>Detail</span>
        </div>
        <ul className="fl-caps" aria-labelledby="fl-status-cap">
          {capabilities.map((c) => (
            <li key={c.name} className="fl-cap" data-status={c.status}>
              <b className="fl-cap-name">{c.name}</b>
              <span className="fl-cap-status">
                <span className="fl-chip" data-status={c.status}>{capabilityStatus[c.status].label}</span>
              </span>
              <span className="fl-cap-note">
                {c.note} <Cite href={c.source}>Source</Cite>
              </span>
            </li>
          ))}
        </ul>
      </Fold>
    </Chapter>
  );
}

/** 06: what the record shows, its limits, the sources and the way on. */
export function Limits() {
  return (
    <Chapter id="limits" n="06" kicker="What the record shows" title="Conclusions the evidence supports, and the ones it does not.">
      <div className="fl-close">
        <div>
          <h3 className="fl-h3">What it shows</h3>
          <ol className="fl-close-list">
            {closing.shows.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>
        <div>
          <h3 className="fl-h3">Limits</h3>
          <ul className="cs-list">
            {closing.limits.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <Cite href={closing.limitsSource}>“Reproducibility and limits”, docs/reports.md</Cite>
        </div>
        <div>
          <h3 className="fl-h3">Sources</h3>
          <ul className="fl-sources">
            {closing.sources.map((s) => (
              <li key={s.label}><OutLink href={s.href}>{s.label}</OutLink></li>
            ))}
          </ul>
          <h3 className="fl-h3">Authorship</h3>
          <p>{intro.authorship}. Implementation details and validation evidence are in the public repository.</p>
        </div>
      </div>
      <nav className="fl-next" aria-label="Continue">
        <a className="cs-button" href={homeSection(faultline.slug)}>
          <ArrowLeft aria-hidden="true" strokeWidth={1.75} /> Back to the portfolio
        </a>
        <a className="sp-text-link" href={reproseedCase.path}>
          Related case study: ReproSeed <ArrowRight aria-hidden="true" strokeWidth={1.75} />
        </a>
      </nav>
    </Chapter>
  );
}
