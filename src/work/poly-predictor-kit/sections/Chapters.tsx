import { checks, excerpts, labelDefinitions, notClaimed, pipelines, poly } from "../../../content/poly";
import { OutLink } from "../../../signal-path/ui";
import Fold from "../../shared/Fold";
import RiskShape from "../risk/RiskShape";
import { Chapter, EvidenceTag, Excerpt, channelName } from "../ui";

const runtime = pipelines.filter((p) => p.time === "runtime");
const byId = (id: string) => pipelines.find((p) => p.id === id)!;
/** Whose pipeline a reading is: one of Raimbek's, or a team component. */
const byLine = (line: (typeof pipelines)[number]) => (line.owner === "raimbek" ? "Raimbek's pipeline" : "Team component");

/** The three extension buttons and what each one gives back, in the code's own words. */
export function Readings() {
  return (
    <Chapter id="readings" kicker="What it does" title="Three buttons, three readings of one event.">
      <p className="cs-lede">
        Open any Polymarket event, open the extension, and choose one of three buttons. Each calls its own Python service on the same
        machine and shows the answer as text.
      </p>
      <ol className="pp-readings">
        {runtime.map((line) => (
          <li key={line.id} className="pp-reading" data-channel={line.channel}>
            <p className="pp-reading-channel">{channelName[line.channel]}</p>
            <h3 className="pp-reading-button">“{line.button}”</h3>
            <p className="pp-reading-summary">{line.summary}</p>
            {line.answer && (
              <p className="pp-reading-answer" data-format={line.answer.format}>
                <span className="pp-reading-answer-label">{line.answer.format === "template" ? "Its message, as the code writes it" : "What comes back"}</span>
                {line.answer.text}
              </p>
            )}
            <p className="pp-reading-by" data-by={line.owner ?? "team"}>
              {byLine(line)}
            </p>
          </li>
        ))}
      </ol>
      <p className="cs-sub">
        Button names and message formats from <a href={`${poly.source}/blob/${poly.commit.sha}/popup.html`}>popup.html</a> and the
        services <EvidenceTag kind="verified" />
      </p>
    </Chapter>
  );
}

/** Raimbek's summarization pipeline: how the market's numbers become a prompt, and the rules Gemini is given. */
export function Numbers() {
  return (
    <Chapter id="numbers" kicker="The numbers · Raimbek's part" title="Prices are read as probabilities before Gemini sees them." channel="numbers">
      <p className="cs-lede">
        The market summarization pipeline: the module that finds a Polymarket event through the Gamma API, turns its markets into a
        structured prompt and asks Gemini for a short insight.
      </p>
      <ol className="pp-steps">
        <li>
          <h3>Find the event</h3>
          <p>
            It accepts what a person would paste: an event's address, its slug, a numeric id or a search phrase. Each goes to the
            Gamma API through <code>/events/slug/…</code>, <code>/events/…</code> or <code>/public-search</code>.
          </p>
        </li>
        <li>
          <h3>Keep what matters</h3>
          <p>Up to three of the event's markets, open ones first, with their questions, status, volume and outcome prices.</p>
        </li>
        <li>
          <h3>Read prices as probabilities</h3>
          <p>
            The Gamma API returns outcomes and prices as JSON strings. The module parses them and writes each price beside its
            implied percentage.
          </p>
          <figure className="pp-transform">
            <div>
              <p className="pp-transform-label">In the API response</p>
              <code>outcomes: '["Yes","No"]'</code>
              <code>outcomePrices: '["0.54","0.46"]'</code>
            </div>
            <span className="pp-transform-arrow" aria-hidden="true">→</span>
            <div>
              <p className="pp-transform-label">In the prompt</p>
              <code>Outcomes: Yes: 0.54 (~54.0%); No: 0.46 (~46.0%)</code>
            </div>
            <figcaption>
              Example values from the module's own docstring; the format is the code's <EvidenceTag kind="verified" />
            </figcaption>
          </figure>
        </li>
        <li>
          <h3>Ask with rules</h3>
          <p>
            The prompt carries the event's title, status, end date and volume, then each market. It asks Gemini (
            <code>gemini-2.5-flash</code>, through the public REST API, with the key read from the environment) for 3–6 sentences under
            explicit rules:
          </p>
          <Fold summary="The prompt's instructions and rules, verbatim">
            <Excerpt excerpt={excerpts.rules} label="The prompt's instructions and rules, verbatim" />
          </Fold>
        </li>
      </ol>
      <p className="cs-note">
        The module began as a command-line tool (commit <a href={poly.myPartEvidence.url}>{poly.myPartEvidence.commit}</a>); the team
        then wrapped it in the Flask service that the extension calls, with the key loaded from a .env file.
      </p>
    </Chapter>
  );
}

/** Raimbek's classification pipeline: Gemini labels the training data; TF-IDF and logistic regression do the work at runtime. */
export function Conversation() {
  const training = byId("training");
  const classifier = byId("classifier");
  return (
    <Chapter id="conversation" kicker="The conversation · Raimbek's part" title="Gemini labels the training data. A small model reads the comments." channel="conversation">
      <p className="cs-lede">
        Raimbek developed the comment-classification pipeline. Its two halves run at different times, and only the first uses Gemini.
      </p>
      <div className="pp-times">
        <section className="pp-time" data-time="preparation" aria-labelledby="pp-time-before">
          <h3 id="pp-time-before"><span>Before</span> Teaching the classifier</h3>
          <ol>
            {training.stages.map((s) => (
              <li key={s.id}><b>{s.name}</b> {s.short}</li>
            ))}
          </ol>
        </section>
        <p className="pp-times-bridge"><span>comment_<wbr />classifier.pkl</span> is the bridge: the runtime service loads it</p>
        <section className="pp-time" data-time="runtime" aria-labelledby="pp-time-during">
          <h3 id="pp-time-during"><span>When the button is pressed</span> Reading the comments</h3>
          <ol>
            {classifier.stages.filter((s) => s.role !== "trigger").map((s) => (
              <li key={s.id}><b>{s.name}</b> {s.short}</li>
            ))}
          </ol>
        </section>
      </div>
      <h3 className="cs-h3">The three labels <EvidenceTag kind="verified" /></h3>
      <p>Gemini labels comments with these definitions, verbatim from its prompt. The trained model learns the same three classes.</p>
      <dl className="pp-labels">
        {labelDefinitions.map((d) => (
          <div key={d.label}>
            <dt>{d.label}</dt>
            <dd>{d.text}</dd>
          </div>
        ))}
      </dl>
      <h3 className="cs-h3">The model</h3>
      <p>
        A scikit-learn pipeline: TF-IDF features from the comment text, then logistic regression. It trains on an 80/20 split that
        keeps the labels' proportions and prints a classification report. No scores are published, so none are claimed here.
      </p>
      <Fold summary="The training pipeline, verbatim">
        <Excerpt excerpt={excerpts.pipeline} label="The scikit-learn pipeline, verbatim" />
      </Fold>
      <p className="pp-callout">
        <b>Snowflake stores; scikit-learn trains.</b> The labeled comments are appended to a Snowflake table through Snowpark and read
        back into pandas, and the model is fitted locally. The README's “Snowpark ML training” is not what the code does.
      </p>
      <p className="cs-note">
        After each analysis, the runtime service appends its own labels to that table and retrains, so later training data includes
        the model's own labels, not only Gemini's.
      </p>
    </Chapter>
  );
}

/** The steamroller detector's arithmetic, made explorable. */
export function Risk() {
  return (
    <Chapter id="risk" kicker="The numbers · team component" title="A rule, not a model: how much one loss can erase." channel="numbers" surface="night">
      <p className="cs-lede">
        The third button flags a “steamroller”: an outcome priced so high that winning pays little and losing costs nearly
        everything. It is arithmetic on the price, and part of the team's architecture.
      </p>
      <p className="pp-callout">
        <b>An explanation, not a trading tool.</b> The calculator below evaluates the team's rule for a price you choose. It uses no
        market data and recommends nothing.
      </p>
      <RiskShape />
    </Chapter>
  );
}

/** Raimbek's contribution, right after the overview: the two pipelines with their code, and the team's parts. */
export function Contribution() {
  return (
    <Chapter id="contribution" kicker="Raimbek's contribution" title="The summarizer and the classifier.">
      <p className="cs-lede">{poly.contribution}</p>
      <div className="pp-credits">
        <section className="pp-credit" data-by="raimbek" data-channel="numbers" aria-labelledby="pp-credit-summary">
          <p className="pp-credit-channel">The numbers</p>
          <h3 id="pp-credit-summary">Market summarization pipeline</h3>
          <p>
            Finds a Polymarket event through the Gamma API, keeps up to three of its markets, reads their prices as probabilities and
            asks Gemini for a short insight under fixed rules.
          </p>
          <p className="pp-credit-basis">
            Code: <a href={poly.myPartEvidence.file}>poly_event_<wbr />ai_summarizer.py</a> · commit{" "}
            <a href={poly.myPartEvidence.url}>{poly.myPartEvidence.commit}</a>
          </p>
          <a className="sp-text-link" href="#numbers">How the summarizer works</a>
        </section>
        <section className="pp-credit" data-by="raimbek" data-channel="conversation" aria-labelledby="pp-credit-classifier">
          <p className="pp-credit-channel">The conversation</p>
          <h3 id="pp-credit-classifier">Comment-classification pipeline</h3>
          <p>
            Gemini labels training comments as emotional, rational or spam; TF-IDF features and logistic regression learn those labels;
            at runtime the saved model reads an event's comments without calling Gemini.
          </p>
          <p className="pp-credit-basis">
            Code:{" "}
            {poly.classifierCode.map((f, i) => (
              <span key={f.label}>
                {i > 0 && " · "}
                <a href={f.href}>{f.label}</a>
              </span>
            ))}
          </p>
          <a className="sp-text-link" href="#conversation">How the classifier works</a>
        </section>
      </div>
      <h3 className="cs-h3">The team's architecture</h3>
      <p>Poly Predictor Kit is a team project. These parts are credited to the team:</p>
      <ul className="cs-list">
        <li>The Chrome extension and its popup, which call all three services.</li>
        <li>The Flask service that wraps the summarizer for the extension.</li>
        <li>The steamroller detector, the risk rule explained under The risk shape.</li>
        <li>A web front page, not connected to the services.</li>
      </ul>
      <p className="pp-team">
        <span className="pp-kicker">Devpost lists</span>
        {poly.team.join(" · ")}
      </p>
      <p className="cs-sub">
        Team from Devpost, read on 2026-10-24 <EvidenceTag kind="record" />
      </p>
    </Chapter>
  );
}

/** What the README and Devpost say that the code does not, and what is simply not measured. */
export function Checks() {
  return (
    <Chapter id="checks" kicker="Checked against the code" title="What the code shows, and what it does not.">
      <div className="pp-checks">
        {checks.map((c) => (
          <div key={c.claim} className="pp-check">
            <p className="pp-check-claim">{c.claim}</p>
            <p className="pp-check-finding">{c.finding}</p>
          </div>
        ))}
      </div>
      <h3 className="cs-h3">Not claimed <EvidenceTag kind="notClaimed" /></h3>
      <ul className="cs-list cs-list-x">
        {notClaimed.map((n) => <li key={n}>{n}</li>)}
      </ul>
      <p className="pp-video">
        The team recorded a demo of the working extension: <OutLink className="sp-text-link" href={poly.video}>watch it on YouTube</OutLink>
      </p>
    </Chapter>
  );
}
