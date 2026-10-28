# Phase 5C · Attribution corrections and case-study refinement

Status: approved; Poly's public wording finalized in Phase 5D · Date: 2026-10-25
Related: [Phase 5B](phase-5b-poly.md) · [Phase 5A](phase-5a-reproseed.md) · [release steps](release-indexing.md) · [content evidence ledger](content-evidence-ledger.md) (section 4.3, decision 12)

This phase does three things:
- corrects Poly Predictor Kit's attribution;
- puts Raimbek's contribution at the front of the Poly case study;
- folds ReproSeed's long evidence on tablets.

A separate, private investigation prepared the next flagship candidate. Its findings stay in an ignored private directory, and no public-facing content about it was added.

## 1. Poly attribution

**Raimbek's contribution:** the Gemini-powered market summarization pipeline and the TF-IDF / logistic-regression comment-classification pipeline. Phase 5D finalized the public sentence: "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025."

**Team components:** the Chrome extension and popup, the Flask service that wraps the summarizer, the steamroller detector and the web front page. These stay credited to the team, and the full Devpost team is listed.

**Where it changed:**
- **The current site** (`src/data.ts`): Poly's "My contribution" now uses the sentence above. This is the only visible change on that page.
- **The Signal Path preview:** "My part" uses the same sentence, and the comment-classifier lane is marked "My part" again. In the skills index, scikit-learn and Snowflake return to the Poly card (Phase 5B had moved them under "Also").
- **The Poly case study:**
  - the hero's "Raimbek's role" line;
  - the overview;
  - the new contribution chapter;
  - the reading tags (Raimbek's pipelines and the team component);
  - the conversation chapter;
  - the map's labels, stop cards and text version;
  - the meta description.
- **The ledger:** section 4.3 is rewritten, decision 12 is resolved and the change log is updated.

## 2. Poly case-study refinements

**Order:** hero → overview → **Raimbek's contribution** (new, replacing "Who built what" at the end) → three readings → system map → the numbers → the conversation → the risk shape → what the code shows → evidence.

**What changed:**
- **First screen:** a labelled "Raimbek's role" line sits in the hero on every size.
- **Contribution chapter:** two cards, one per pipeline, each with its evidence basis and a link to its detailed chapter. Then the team's architecture and the Devpost team.
- **The risk shape is plainly the team's.** Its kicker reads "team component". A callout says it is "An explanation, not a trading tool": it uses no market data and recommends nothing. The verdict reads "The detector would flag this", and the footnote says the calculator explains the rule and is not advice. "Not claimed" now lists "trading results, recommendations or advice".
- **Navigation:** on phones and tablets the Contents button shows the reader's position ("4/8") where the chapter name does not fit.
- **Progressive disclosure:** the prompt's verbatim rules and the evidence-label key now fold, like the training pipeline and the map's text version. Nothing was removed.
- **Unchanged:** the verified architecture and the interactive system map.

| Poly page height (px) | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 5B | 16,273 | 15,774 | 13,676 | 10,724 | 11,080 |
| Phase 5C | 16,587 | 16,006 | 12,530 | 11,581 | 11,917 |

The contribution chapter adds about 1,100–1,700 px depending on width. Folding absorbs most of that on phones (+232 px at 390) and more than all of it on tablets (−1,146 px at 768). Desktop shows folds open and grew by about 840 px.

## 3. ReproSeed on tablets

The shared `Fold` now closes long evidence on screens up to 1023 px wide, not 639 px. The tablet page went from 16,399 px to **12,656 px**, now shorter than in Phase 5A (14,613).

Checked in Chromium at 768 × 1024, using the accessibility tree:

| Check | Result |
|---|---|
| Disclosure semantics | Each summary is exposed as a disclosure control named by its text (for example "The scenario file, excerpt"), with `expanded` false or true |
| Collapsed content | **Not** available to assistive technology while closed: Chromium marks it "not rendered". It becomes available when opened. The summaries name exactly what is inside, so nothing is hidden without a label |
| Keyboard and focus | Enter opens and Space closes; focus stays on the summary. Tab never lands inside a closed fold (46 stops with folds closed, 55 open) |
| Links into folds | No in-page link targets content inside a fold, and a deep link to a chapter keeps every fold open |
| Search and prerendering | The served HTML has all 7 folds open |
| Essential information | Results, sequence diagrams, test outcomes, the claim and the conclusion stay visible; only code and terminal output fold |
| Explorer | Tabs and scrubber work at 768 |
| Not checked | Browser find-in-page inside closed folds |

The same breakpoint applies to Poly, which is why its tablet page is 1,146 px shorter.

## 4. Verification (headless Chromium, production build)

| Check | Result |
|---|---|
| Typecheck, build, strict check of the build scripts, whitespace (tracked and new files) | Pass |
| Static HTML | Both case studies: 200, one `h1`, canonical, `noindex, follow`, social card. Every expected attribution phrase is present: Raimbek's sentence, "Team component", "credited to the team", "An explanation, not a trading tool". None of the retired or forbidden phrases appears ("market-summary pipeline", "Built by teammates", "teammates built", accuracy, users, deployment, "1st Place"). Sitemap lists only `/`; homepage `index, follow` |
| Stills, three pages × five sizes | No sideways scroll, contrast failures, text under 12 px, targets under 24 px, clipped or skipped headings, broken links or console errors. One contrast failure, the new callout on the dark risk stage, was found and fixed |
| Content cut off at the edge | None at 360, 390 or 768 |
| Map, risk, Contents, routing and history | Pass, including the deep link to `#risk`, Back to the homepage section, and touch drag |
| Keyboard | Poly: 57 stops, all with visible focus. Homepage preview: 65 |
| Reduced motion | Nothing animates; fonts blocked still lay out without overflow |
| Current homepage `/` | Links, ids, headings, stylesheets and meta are identical to Phase 4.5. Pixels match down to Poly's block; the only content change is its contribution sentence, and the rest of the page moved down 23–172 px. Page heights at 360 / 390 / 768 / 1366 / 1440: 20,218 / 19,776 / 8,974 / 8,204 / 8,326 px at the capture scale (+114 / +172 / +57 / +23 / +23) |
| Code Topology Lab | Pixel-identical |
| Not run | Safari or WebKit, Firefox, real devices |

**Performance (lab, measured).** Five cold runs per profile, median; mobile 412 × 823 with 4× CPU and 1.6 Mbps, desktop 1350 × 940.

| Page | LCP mobile | LCP desktop | CLS | Transfer |
|---|---|---|---|---|
| Poly | 0.78 s (Phase 5B: 0.72 s) | 0.21 s | 0 | 147 KB |
| ReproSeed | 0.73 s | 0.22 s | 0 | 145 KB |

## 5. Decisions and approvals outstanding

1. ~~**How the classifier is credited on the map.**~~ Resolved in Phase 5D: credit is given per pipeline, not per stage.
2. ~~**Public evidence-basis label.**~~ Resolved in Phase 5D: no evidence-basis label is shown publicly.
3. **Internship Radar.** Publication scope, authorship wording and naming, as listed in the private notes. No public work has started.
4. **Launch remains separate.** Follow `release-indexing.md`; deploying is Raimbek's call.

## Files

**New:** `docs/phase-5c.md`.

**Changed:**
- `src/data.ts` (Poly's contribution sentence only)
- `src/content/poly.ts`, `src/content/evidence.ts`, `src/content/systems.ts`, `src/content/profile.ts`
- `src/signal-path/content.ts`
- `src/work/poly-predictor-kit/`:
  - `CaseStudy.tsx`, `structure.ts`
  - `sections/Hero.tsx`, `sections/Chapters.tsx`, `sections/Closing.tsx`
  - `map/SystemMap.tsx`, `map/map.css`
  - `risk/RiskShape.tsx`
  - `styles/page.css`
- `src/work/shared/Fold.tsx`, `src/work/shared/Contents.tsx`, `src/work/shared/styles/shell.css`
- `docs/content-evidence-ledger.md`, `docs/phase-5b-poly.md`

**Private and ignored (not in Git):** `tmp/private/internship-radar-phase-5c-investigation.md`.
