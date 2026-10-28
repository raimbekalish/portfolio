# Content evidence ledger

Status: working ledger for the redesign, last updated 2026-10-24 (Phase 5A)
Branch: `design/proof-signal`
Owner of publication decisions: Raimbek Alish

Every claim the redesigned portfolio might make is listed here with its evidence, status and publication decision. Nothing reaches public copy unless its status allows it.

> **This repository is public.** This file contains only information that is already public, or a description of what is withheld without the withheld value. Restricted values, employer details and private-repository details are kept out of version control. A private companion note for Raimbek lives under the gitignored `tmp/` directory.

## Status legend

| Status | Meaning | May appear publicly? |
|---|---|---|
| **Verified** | Confirmed by a cited public source | Yes |
| **Self-reported** | Raimbek's own statement (résumé, current site); no independent public source | Yes, worded as a self-description |
| **Pending** | Needs a source, a decision or a permission | No, until resolved |
| **Restricted** | Confidential or explicitly withheld | No |

## Standing rules

1. InterviewMirror is not featured.
2. The vehicle-photo holdout acceptance result from the résumé is **restricted** until explicitly authorized. Its figures are not written in this file.
3. The knowledge assistant's name is **pending**. Public copy says "knowledge assistant" with no product name. The current site, résumé and GitHub profile disagree.
4. Employer information beyond what is listed as approved below stays out of public copy.
5. Internship Radar is described only to the extent Raimbek approves and the implementation demonstrates. Implemented, tested, prototype and planned features stay clearly separated.
6. No fabricated measurements, awards, screenshots, interfaces, deployment claims or contributions.

---

## 1. Identity and hero claims

| Claim | Status | Evidence | Decision |
|---|---|---|---|
| Name: Raimbek Alish | Verified | Résumé, GitHub profile | Publish |
| Computer Science–Mathematics at Whitman College | Self-reported | Résumé: "Bachelor of Arts in Computer Science-Mathematics" | Publish. Use "Computer Science–Mathematics" (the combined major on the résumé) unless Raimbek prefers "Computer Science & Mathematics" |
| Expected graduation May 2028 | Self-reported | Résumé | Publish |
| Seeking Summer 2027 software engineering internships | Self-reported | Current site; Raimbek's brief | Publish |
| "Building software systems, applied AI, and useful products" | Self-description | Raimbek's brief | Publish |
| "AI, backend, and everything in between" | Self-description | Current site tagline | Optional |
| Email, GitHub, LinkedIn, résumé PDF | Verified | Current site links (resolve as of 2026-10-21) | Publish |
| Phone number in the public résumé PDF | Pending | Résumé header | Decide whether the public PDF keeps it |

## 2. Education and experience

| Claim | Status | Evidence | Decision |
|---|---|---|---|
| Whitman College, Computer Science–Mathematics, expected May 2028 | Self-reported | Résumé | Publish |
| Bellevue College, Associate in Arts and Sciences, completed June 2026 | Self-reported | Current site | Publish |
| AI/ML Engineering Intern, R-Finance, remote, June 2026 to present | Self-reported | Résumé, current site | Publish the title and dates. Company display name is pending (section 4) |
| Computer Science Teaching Assistant, Bellevue College, Sep 2025 – May 2026; tutored 50+ students in CS 210 and CS 211 | Self-reported | Résumé, current site | Publish |
| AI Design & Data Storytelling Extern, Canva, Nov – Dec 2025 | Self-reported | Résumé, current site | Publish. Use the résumé's two bullets, not the site's longer list (done in the Phase 4 preview) |
| Teaching assistant duties: the current site's first line plus the résumé's "worked one-on-one… diagnose logic and runtime errors…" line | Self-reported | Current site, public résumé PDF | Used in the Phase 4 preview |
| Phi Theta Kappa Honor Society, Bellevue College | Self-reported | Current site | Publish |

## 3. Recognition

| Claim | Status | Evidence | Decision |
|---|---|---|---|
| Poly Predictor Kit: winner, Polymarket Track, QuackHacks 2.0 | **Verified** | [Devpost](https://devpost.com/software/poly-predictor-kit) shows "Submitted to Quackhacks 2.0 · Winner · Polymarket Track" | Publish exactly as **"Winner, Polymarket Track — QuackHacks 2025"** (Raimbek's wording, confirmed in the Phase 5B brief) |
| Poly Predictor Kit: "1st Place" | Retired | Devpost says "Winner" of the track, not "1st Place" | Replaced on the site with "Winner, Polymarket Track — QuackHacks 2025" (2026-10-22) |
| AI Visual Novel Creator: an AI award at CodeDay Seattle 2025 | **Pending** | The public [CodeDay showcase](https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6), rendered 2026-10-21, lists "CodeDay Fall 2025, Seattle" and a "Participation Certificate" and shows no award. The résumé says "1st Place AI Award" | Do not publish any award wording until a source is provided (certificate, organizer announcement or judge email) |
| "2x hackathon winner" (résumé summary) | Pending | Only one win is publicly verified | Do not use on the site until the second is verified |
| PromptLock: award | None | [Devpost](https://devpost.com/software/promptlock) shows "Submitted to NexHacks" with no prize | Present without an award. The Phase 4 recognition list says "Hackathon entry" |
| JiraGenie: award | None | [Devpost](https://devpost.com/software/untitled-project-rw9st8nfkbm3) shows "Submitted to DubHacks '25" with no prize | Present without an award. The Phase 4 recognition list says "Hackathon entry" |
| AI Visual Novel Creator in the Phase 4 recognition list | Verified listing, no award | The public CodeDay showcase lists the project | "Showcase project", linked to the showcase. No award wording |

---

## 4. Projects

Tier summary: **Flagship**: ReproSeed (case study, Phase 5A), Poly Predictor Kit (case study, Phase 5B), R-Finance, Internship Radar (if approved). **Secondary**: AI Visual Novel Creator, PromptLock. **Archive**: JiraGenie.

### 4.1 R-Finance (internship work)

| Field | Content | Status |
|---|---|---|
| Company display name | "R-Finance" on the current site and résumé; another spelling is noted privately | Pending: confirm the correct public name and whether it may be shown, with or without logo |
| Problem | Two internal needs: checking vehicle photos submitted through a mobile lending workflow, and answering questions from internal documents | Self-reported, already public on the current site |
| Personal contribution | Built an internal vehicle-photo validation API, and built a separate knowledge assistant's chat interface and document-retrieval backend | Self-reported, already public |
| Architecture (public level only) | Vision service: authenticated FastAPI endpoint, local YOLO inference, eligibility and consistency checks, structured REST/OpenAPI response, Docker, Kubernetes development environment via Helm. Assistant: chat interface over a retrieval backend that answers with source-grounded evidence | Self-reported, already public. Reuse in the redesign is **pending employer approval** |
| Engineering decisions | Local inference instead of external AI APIs; in-memory image processing; API-key authentication; separate services instead of one system | Pending: confirm each may be stated publicly |
| Outcome | The holdout acceptance result is **restricted**. No other outcome is public | Restricted |
| Quarter-turn inference fallback (named in the same résumé bullet) | Public on the résumé | Pending: confirm before showing it in a diagram |
| Assistant product name | Unresolved (see standing rule 3) | Pending |
| Public evidence | Résumé, current site, GitHub profile README | — |
| Screenshots or demos | None public. Any capture would need synthetic data and employer permission | Pending |
| Permission required | **Yes**, from the employer, for architecture detail, names, logo and any capture | Pending |
| Tier | Flagship, content-gated | — |
| Publication decision | Until approval: one conservative module, "Two internal AI services: vehicle-photo validation and document question answering", with no metrics, no product name and no internal detail | — |
| Phase 4 authorization (2026-10-22) | Raimbek's Phase 4 brief allows presenting the two publicly described projects separately, using the existing approved high-level technology and architecture only, the name R-Finance, no logo, and "AI knowledge assistant" for the assistant | Approved for the preview |
| What the Phase 4 preview uses | Only sentences already public on the current site: the two statements, the vehicle-photo stations (mobile submission → FastAPI with API key → local YOLO inference with eligibility, metadata/edit, cross-photo consistency and batch checks → REST/OpenAPI response), the heuristics caveat, Docker/Helm/Kubernetes development deployment and automated API tests; the assistant's chat interface → document retrieval → grounded answer. Drawings are labeled "Conceptual drawing, not the product interface" | Published in the preview |
| Not used in Phase 4 | The assistant's name, in-memory processing, the quarter-turn fallback, "local inference instead of external AI APIs" as a stated decision, the holdout result, and the current site's synthetic chat mock (a conceptual diagram must not look like a product screen) | Withheld |

### 4.2 Internship Radar

| Field | Content | Status |
|---|---|---|
| Problem (public level) | An internship automation and tracking platform, as Raimbek described it | Self-description |
| Repository | Private | Restricted |
| Personal contribution | To be confirmed by Raimbek, including how any AI-assisted development is credited | Pending |
| Implemented and tested features | Inventory kept in the private note, not here | Restricted until Raimbek approves specific items |
| Deployment | Not established by any public source | Pending. **Never claim it is deployed or production-ready** without confirmation |
| Outcome | None claimed | — |
| Screenshots or demos | Possible only with synthetic data and Raimbek's approval | Pending |
| Permission required | Raimbek's own approval. Data-source terms must allow describing the integrations | Pending |
| Tier | Flagship if approved; otherwise omitted (not teased) | — |
| Publication decision | **Hold.** Required wording when approved: "in active development" plus only the approved, demonstrably implemented features, each labeled implemented, tested, prototype or planned | — |

### 4.3 Poly Predictor Kit (Phase 5B case study)

Public repository [raimbekalish/Poly_Predictor_Kit](https://github.com/raimbekalish/Poly_Predictor_Kit), read at commit `475fcd9` (2025-11-18): the README, the three Python services, the training script, the extension and the web page. [Devpost](https://devpost.com/software/poly-predictor-kit) read on 2026-10-24.

| Field | Content | Status |
|---|---|---|
| Problem | Prediction-market context is spread across odds, event data and noisy community discussion | Verified (README) |
| Personal contribution | Raimbek's wording: "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025." The summarization module is `poly_event_ai_summarizer.py` (commit `5f34cdf`); the classification pipeline's code is in `Emotional_Damage_Predictor/` | Confirmed by Raimbek; code in the public repository. Evidence notes are kept privately. Decision 12 resolved |
| Team | Devpost lists six creators; five appear as commit authors. Team size is not claimed beyond "Devpost lists six creators" | Verified |
| Architecture | A Chrome extension popup with three buttons, each calling a local Flask service: `/ai-insight` (port 5002), `/analyze` (5000), `/api/steamroller` (5001) | Verified in code |
| Market summary | Gamma endpoints `/events/slug`, `/events/{id}` and `/public-search`; open markets first, at most three; `outcomePrices` (JSON strings) parsed into implied percentages; a prompt with fixed rules; `gemini-2.5-flash` over REST | Verified in code |
| Comment classifier | Preparation: comments from Gamma `/comments`; Gemini 2.5 Flash labels them in batches of 20 as EMOTIONAL, RATIONAL or SPAM (training labels only); Snowpark `write_pandas` stores them in `COMMENT_LABELS_DATA`; scikit-learn `TfidfVectorizer` + `LogisticRegression(max_iter=1000)`, 80/20 stratified split, a printed classification report, saved as `comment_classifier.pkl`. Runtime: the saved model labels each comment (Gemini is not called), the service reports the emotional and rational shares, then appends its own labels and retrains | Verified in code. No scores are published, so none are shown |
| Steamroller detector | One loss erases p ÷ (1 − p) wins; a side is flagged when p ≥ 0.9 and that factor ≥ 10, with time weighting by days to resolution | Verified in code. Credited to the team |
| Claims not supported by the code | README: "Snowpark ML training" and "continuous retraining through Snowflake" (Snowflake stores the table; training is local scikit-learn). Devpost: the steamroller check "uses liquidity" (not read). README: "The event looks 67% Emotional" (a message-format example, not a result). `index.html`: placeholder API addresses, not wired to the services | Shown on the case study as "Not claimed", with the finding |
| Engineering decisions | Separate pipelines for the numbers and the conversation; Gemini labels used only to prepare training data, with a local model at runtime | Verified in code. Who made each decision is not recorded, so none is attributed to Raimbek |
| Outcome | Winner, Polymarket Track — QuackHacks 2025 | Verified (section 3) |
| Public evidence | Repository at `475fcd9`, Devpost, the team's demo video on YouTube (linked from the README and Devpost; linked, not embedded) | Verified |
| Screenshots or demos | The Devpost gallery holds only a logo; no product screenshots exist publicly or are used. The case study's visuals are conceptual illustrations of the code, or the detector's formula computed in the browser. The team's trained classifier is not run, exported or redistributed | — |
| Permission required | Team consent before any in-browser run of the team's model or any extension screenshots | Pending; nothing of the kind is published |
| Status | Built in November 2025 at QuackHacks; runs locally; not deployed | Verified |
| Users, accuracy, trading results | None claimed | — |
| Tier | Flagship | — |
| Publication decision | Case study at `/work/poly-predictor-kit/` (noindex until launch). It presents the two pipelines as Raimbek's contribution, with links to their code, and credits the extension, the insight-service wrapper, the steamroller detector and the web page to the team | — |

### 4.4 AI Visual Novel Creator

| Field | Content | Status |
|---|---|---|
| Problem | Making a visual novel requires coordinating story writing, scene art and game scripting | Verified (repository README and showcase) |
| Personal contribution | Python content pipeline that turned generated story data into Ren'Py files, plus Stability AI scene-image integration, within a team of six | Self-reported (current site). Team size verified (showcase lists six members) |
| Architecture | Gemini 2.5 Flash story JSON → Ren'Py script; scene descriptions → Stability AI images → playable Ren'Py project | Verified ([repository README](https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator)) |
| Engineering decisions | Asynchronous image generation so scenes are ready before the player reaches them (described by the team on the showcase) | Verified as a team statement; Raimbek's role in it is pending |
| Outcome | Award unverified (section 3) | Pending |
| Public evidence | Repository, CodeDay showcase | Verified |
| Screenshots or demos | One real project screenshot from the public showcase (already used on the current site) | Verified source. Team consent recommended |
| Permission required | Team consent for continued screenshot use | Pending |
| Security hold | A potential credential exposure was reported in the team's public repository. The credential's owner needs to rotate or revoke it and inspect recent API usage. This must be resolved by the authorized repository or key owner, outside this project. Do not reproduce or test the credential | Open |
| Tier | Secondary | — |
| Publication decision | Publish without award wording. Hold any new prominence for the source link until the key owner confirms the credential was rotated or revoked | — |
| Phase 4 preview | Links only the CodeDay showcase; the repository link is not placed in the new page (the current homepage keeps its existing link, unchanged). Pipeline stages and the story-format JSON come from the README; the script conversion and Stability AI image stages are marked "My part" (current-site wording); the other stages are marked "Team". The screenshot is cropped by CSS to the game window, never edited, and credited to the team's showcase entry | Published in the preview |

### 4.5 PromptLock

| Field | Content | Status |
|---|---|---|
| Problem | Long logs, diffs, documentation and API payloads exceed an LLM's useful token budget | Verified ([repository README](https://github.com/abdirahmanbm01/nexhacks)) |
| Personal contribution | Current site: "Contributed task-aware compression modes… with a FastAPI backend and token-based chunking." Résumé: "Built a FastAPI and Next.js platform… Implemented four task-aware compression modes with 2K–16K token budgets" | **Pending: the two descriptions disagree.** Confirm one |
| Architecture | FastAPI backend, Next.js frontend, MCP server; Debug, Review, Build and Docs modes; 2K/4K/8K/16K budgets; reports what was included and excluded | Verified (README) |
| Outcome | Submitted to NexHacks; no prize. The README links a live MCP endpoint that responded on 2026-10-21 | Verified submission. Describing it as "deployed" is pending |
| Claims not to repeat | README marketing claims about cost savings and semantic loss are unmeasured | Do not publish |
| Public evidence | Repository, Devpost | Verified |
| Screenshots or demos | None in the repository beyond logos and a sample input file | Synthetic budget visualization only |
| Permission required | Teammate consent for screenshots | Pending |
| Tier | Secondary | — |
| Publication decision | Publish after the contribution wording is confirmed | — |
| Phase 4 preview | Uses the current site's narrower wording ("Contributed task-aware compression modes… FastAPI backend and token-based chunking", plus its interface sentence), not the résumé's "Built a FastAPI and Next.js platform". The repository history cannot settle it: almost every code commit is by an automated "NexHacks Agent" identity | Interim; decision 7 stays open |
| Budget model | Mode priorities, ~750-token chunks, the 2K–16K budgets and skip-and-continue packing follow the README and the public `backend/pipeline/packer.py`. All sixteen chunks and their sizes are invented and labeled "Illustrative input · not PromptLock output"; the note says the real packer would first try to compress or shorten a chunk and reserves room for its prompt template | Published as illustration only |

### 4.6 JiraGenie

| Field | Content | Status |
|---|---|---|
| Problem | Finding Jira context requires filters and repeated lookups | Verified ([repository README](https://github.com/khyeo1011/dubhacks25)) |
| Personal contribution | ElevenLabs streaming speech-to-text integration and microphone interface | Self-reported (current site). Supported by Raimbek's public commits: `elevenlabs/server.js` (a Node/Express server) and `elevenlabs/voice/stt.js` (browser speech-to-text). A teammate later removed text-to-speech, which is not claimed |
| Architecture | Atlassian Forge app; Gemini analysis; ElevenLabs speech-to-text | Verified (README) |
| Outcome | Submitted to DubHacks '25; no prize | Verified |
| Tier | Archive | — |
| Publication decision | List entry with links | — |

### 4.6a Skills evidence (Phase 4)

The preview's skills matrix marks a skill only where Raimbek's own described contribution used it: ReproSeed (TypeScript, Node.js, Playwright; AI-assisted, as its commits credit, added in Phase 5A); R-Finance vehicle-photo API (Python, YOLO, FastAPI, REST/OpenAPI, Docker, Kubernetes, Helm); Poly Predictor Kit, the market summarization pipeline and the comment classifier (Python, Gemini, scikit-learn, Snowflake); AI Visual Novel Creator (Python, Stability AI); PromptLock (Python, TypeScript, FastAPI, Next.js); JiraGenie (JavaScript, Node.js, from the commits above); teaching (Java); this site (TypeScript, React, Vite). C++, SQL, Pandas, Flask, Git and Linux are listed as "Also", without a project. Phase 5B had moved scikit-learn and Snowflake to "Also"; Phase 5C returned them to Poly (decision 12).

### 4.6b ReproSeed (Phase 5A case study)

Public repository [raimbekalish/reproseed](https://github.com/raimbekalish/reproseed), read at commit `dd1c61c` (2026-10-22): README, `docs/future-phase-corrections.md`, the source and the tests.

| Field | Content | Status |
|---|---|---|
| Problem and tool | A command-line tool that replays a failing browser scenario, removes the steps the failure does not need, and writes a Playwright regression test | Verified (README, `src/`) |
| Scope | "It targets authorized loopback test applications only. It does not support arbitrary production websites." Enforced in code: loopback `http` origins only, an identity check before an authorized reset, the credential from the environment only, a fresh browser context per replay, other origins blocked | Verified (`src/runner/safety.ts`, `reset.ts`, `faults.ts`, `src/cli`) |
| Result claim | Exactly the tool's own wording: "1-minimal under single deletion of this ordered scenario, given the recorded probes. This is not a proof of the globally shortest reproduction." The case study never says "shortest" or "minimal" without that qualification | Verified (`VERIFIED_ONE_MINIMAL_CLAIM`) |
| Examples | Duplicate submit (9 → 6 steps; removed preview, note, decoy-wait) and stale search (10 → 6 steps; removed preview, note, decoy-wait, gap). Both bundled demo apps run on loopback | Verified (tests) and recorded (one run) |
| Recorded output | One local run on 2026-10-24 (Apple M4, macOS 26.6, Node 24.11, Playwright 1.64.1): the command's summaries, both sanitized reports, the generated tests' excerpts, and Playwright's result lines against the buggy and the test-only fixed pages. Replay counts and times vary between runs; they are shown as one run, never as a benchmark | Recorded; labeled "Recorded output" |
| Repository tests | Run locally on the same day. Counts are kept in the phase report only, not on public pages | Not published |
| Fixes | The fixed pages (`fixed-pending`, `fixed-generation`) are the repository's test-only variants. The case study says plainly that ReproSeed does not write fixes | Verified |
| Authorship | Raimbek's personal project. Six of the seven commits carry `Co-authored-by: Cursor`. The case study uses exactly Raimbek's wording: "Developed with AI-assisted coding tools, including Cursor. Implementation details and verification evidence are available in the public repository." No specific design decision is attributed to Raimbek, because the history does not show who made it | Verified (git history). Wording resolved in the Phase 5B brief (decision 10) |
| Not built | No graphical interface or dashboard, no AI model calls, no cloud backend or database, no npm publication, no support for arbitrary production websites | Verified (phase notes) |
| Visuals | The struck script, the explorer and the sequence diagrams are explanations built from the data above. Each is labeled: verified in source, recorded output, conceptual illustration, guided demonstration or not built | Published in the preview |
| Users, adoption, benchmarks | None claimed | — |

### 4.7 Not featured

| Item | Decision |
|---|---|
| InterviewMirror | Not featured (Raimbek's decision) |
| Earlier public repositories (2021 games) | Not featured |
| Code Topology Lab | Optional. Its portfolio snapshot predates the redesign; refresh or retire |

---

## 5. Restricted items (values intentionally omitted)

| Item | Reason | Release condition |
|---|---|---|
| Vehicle-photo holdout acceptance result (résumé, R-Finance bullet 2) | Withheld by Raimbek | Explicit written authorization |
| Employer architecture or operations detail beyond section 4.1 | Confidential | Employer approval |
| Private repository contents (employer repositories, Internship Radar) | Confidential | Raimbek's approval, item by item |
| Location of the potentially exposed third-party credential | Security | Never published |

## 6. Open decisions

1. Company display name and logo use (4.1).
2. Assistant product name (rule 3).
3. Employer approval scope for R-Finance content (4.1).
4. Internship Radar publication scope and contribution wording (4.2).
5. ~~"1st Place" wording for Poly Predictor Kit (section 3).~~ Resolved 2026-10-22: "Winner, Polymarket Track — QuackHacks 2025".
6. Evidence for the CodeDay award (section 3).
7. PromptLock contribution wording (4.5).
8. Team consents for screenshots and the in-browser classifier (4.3–4.5).
9. Phone number in the public résumé (section 1).
10. ~~ReproSeed authorship and AI-assistance wording (4.6b).~~ Resolved 2026-10-24 (Phase 5B brief): "Developed with AI-assisted coding tools, including Cursor. Implementation details and verification evidence are available in the public repository."
11. ~~Whether `/work/reproseed/` is listed in the sitemap and indexable before the redesign replaces the homepage.~~ Resolved 2026-10-24 (Phase 5B brief): every case study is `noindex` and left out of the sitemap until launch. One switch controls both (`launched` in `src/work/release.ts`); the launch steps are in [release-indexing.md](release-indexing.md).
12. ~~Poly Predictor Kit contribution wording (4.3).~~ Resolved 2026-10-26: "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025." Applied to the current site (`src/data.ts`), the preview and the case study.

### Interim decisions for Phase 3 (2026-10-22)

Raimbek set these so design work can continue without inventing or prematurely publishing anything. They hold until the open decisions above are resolved.

| Topic | Interim decision |
|---|---|
| InterviewMirror | Not featured |
| R-Finance | Use the existing public name only. No new employer details, no logo |
| Knowledge assistant | Refer to it only as an AI knowledge assistant |
| Internship Radar | Kept out of new public-facing copy |
| Internal validation metrics, confidential screenshots | Not published |
| PromptLock | Only verified contribution language, if it appears |
| QuackHacks | "Winner, Polymarket Track" |
| CodeDay | Exact award title pending verification |
| Résumé | PDF unchanged; phone number not shown in the site UI |
| Private source code, security findings | Not disclosed |

The Signal Path preview (`/?preview=signal-path`) follows these. On 2026-10-22 Raimbek approved replacing "1st Place" on the current homepage too; `src/data.ts` (`award`, `result` and the first `honors` entry) now reads "Winner, Polymarket Track — QuackHacks 2025".

## Change log

- 2026-10-26 (Phase 5D): Poly's public wording finalized; the case study credits the two pipelines as Raimbek's contribution, without per-stage authorship labels, and the team for the overall system. Contribution evidence notes moved to private review notes. Internship Radar remains unpublished.
- 2026-10-25 (Phase 5C): Poly attribution updated: both pipelines are Raimbek's contribution (4.3, decision 12). scikit-learn and Snowflake return to Poly in the skills index. ReproSeed's long evidence folds on tablets.
- 2026-10-24 (Phase 5B): Rebuilt the Poly Predictor Kit entry (4.3) from the code at `475fcd9`, not only the README, and from the Devpost page. Recorded four README or Devpost claims the code does not support. The award wording is exactly "Winner, Polymarket Track — QuackHacks 2025". ReproSeed's authorship wording (decision 10) and pre-launch indexing (decision 11) were resolved. Internship Radar is unchanged and nothing about it is published.
- 2026-10-24 (Phase 5A): Added ReproSeed (4.6b) from its public repository at `dd1c61c`, with every claim checked against source and tests, plus one recorded local run of its own command and generated tests on its loopback demos. Added the evidence labels used by the case study. Internship Radar's assessment was refreshed in the private note only; nothing about it is published.

- 2026-10-21: Ledger created. Verified Devpost submissions for all three hackathon projects; rendered the CodeDay showcase; separated already-public content from employer-gated content.
- 2026-10-22 (Phase 3.5): Replaced "1st Place" with the Devpost wording site-wide. Removed the "team of five" claim: Devpost lists six creators, including Raimbek, and the repository five commit authors.
- 2026-10-24 (Phase 4.5): Hackathons in the recognition track are ordered by the public repositories' commit dates (DubHacks Oct 2025, CodeDay Nov 2025, QuackHacks Nov 2025, NexHacks Jan 2026); only years are shown. The vehicle-photo heuristics caveat moved from the sheet's notes into the validation station it qualifies, unchanged in wording. Skills moved from a matrix to an index and cards with the same evidence rule.
- 2026-10-22 (Phase 4): Recorded the R-Finance Phase 4 authorization and exactly which public sentences the preview uses; the Visual Novel source-link hold in the new page; CodeDay as "Showcase project"; "Hackathon entry" for DubHacks and NexHacks; the interim PromptLock wording and the budget model's sources (README and public `packer.py`); JiraGenie commit evidence; the skills-evidence rule.
- 2026-10-22: Recorded the Phase 3 interim decisions. Re-read the Poly Predictor Kit README for the preview's system diagram (three pipelines; the steamroller detector credited to the team) and confirmed five repository contributors.
