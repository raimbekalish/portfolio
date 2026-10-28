# Phase 5B · Flagship case study: Poly Predictor Kit

Status: approved; attribution revised in [Phase 5C](phase-5c.md) · Date: 2026-10-24

> **Update (Phases 5C–5D).** Raimbek's contribution is the Gemini-powered market summarization and TF-IDF / logistic-regression comment-classification pipelines. Where this report describes Raimbek's part as the market-summary pipeline only, or credits the classifier to the team, Phases 5C and 5D supersede it. The contribution chapter now follows the overview, and the tablet folds are in place.
Review page: private Claude artifact, plus a local copy at `tmp/signal-path-preview/phase-5b/review/index.html` (gitignored)
Pages: `/work/poly-predictor-kit/` (new, static), `/work/reproseed/` (refined) and `/?preview=signal-path` (homepage preview) · Related: [Phase 5A](phase-5a-reproseed.md) · [release steps](release-indexing.md) · [content evidence ledger](content-evidence-ledger.md) (section 4.3)

Poly Predictor Kit is the second flagship case study. Its thesis is "Understanding markets means understanding both the numbers and the conversation."

- **The project.** A team project, Winner, Polymarket Track — QuackHacks 2025: a Chrome extension and three local Python services that read one Polymarket event three ways.
- **Raimbek's part.** As corrected in Phase 5C: the market summarization and comment-classification pipelines. The page credits the rest of the system to the team.
- **The signature interaction.** A system map of the real architecture. It shows two times (when a button is pressed, and before, while the classifier is prepared), and can light up Raimbek's part.

This phase also refines ReproSeed: a phone-friendly overview and navigation, Raimbek's authorship wording, and pre-launch indexing control.

Two pages are untouched: the homepage at `/` and the Code Topology Lab. They are pixel-identical to Phase 4.5.

## View it locally

```sh
npm run build && npm run preview     # then open http://localhost:4173/work/poly-predictor-kit/
                                     # http://localhost:4173/work/reproseed/
                                     # and http://localhost:4173/?preview=signal-path#poly-predictor-kit
```

`npm run dev` serves both case studies, rendered on each request.

## 1. ReproSeed refinements

### A. Phone navigation

- **Project overview** (new, right after the hero). One paragraph with the run's conclusion, then three actions: "Step through the run" (to the explorer), "Read the conclusion" and "Source on GitHub". Below them are the facts (built with, scope, status, authorship) and a table of contents. On desktop it is three columns, about 440 px tall.
- **Contents menu in the bar** (shared by both case studies). It shows the current chapter's name and lists every chapter, with "Back to the portfolio" and the source. Escape or a click outside closes it, and the current chapter is marked for screen readers too.
- **Conclusion** (new chapter, `#conclusion`). Four results in one place, before Limits and Evidence.
- **Progressive disclosure.** Long supporting material sits in folds: the scenario, the safeguards, the terminal output, the spec excerpt, the full Playwright output, the diff and the stale-search example.
  - The served HTML has every fold open, so search engines, assistive technology and readers without JavaScript get all of it.
  - On phones (639 px and below), folds close once the page is interactive, unless the visit opened on a link into the page.
  - Chapter 05 now shows the two test results in view, so a phone reader sees the outcome without opening a fold.

| ReproSeed page height (px) | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 5A | 18,556 | 17,851 | 14,613 | 11,008 | 11,124 |
| Phase 5B | 16,145 | 15,557 | 16,399 | 12,450 | 12,612 |
| Change | −2,411 (−13%) | −2,294 (−13%) | +1,786 (+12%) | +1,442 (+13%) | +1,488 (+13%) |

Phones are 13% shorter. Tablets and desktops are about 13% longer, because folds stay open there and the overview and conclusion are new. See the critical assessment.

### B. Authorship wording

The page uses exactly: "Developed with AI-assisted coding tools, including Cursor. Implementation details and verification evidence are available in the public repository."

The sentence appears in the overview's facts and the Evidence chapter. No design decision is attributed to Raimbek. The earlier wording ("Personal project, built with AI assistance: six of the seven commits…") is gone from the page and its metadata.

### C. Pre-launch indexing

One switch, `launched` in `src/work/release.ts`, now `false`, controls four things:
- **Robots.** Every `/work/` page is `noindex, follow` (written by `src/work/head.ts`; the static robots tag was removed from the page template).
- **Sitemap.** `dist/sitemap.xml` lists only `/`; `public/sitemap.xml` is back to its committed version. When `launched` is true, the build adds each case study.
- **Back links.** "All work" and "Back to the portfolio" go to `/?preview=signal-path#…`.
- **Footer note.** "A case study from the Signal Path design preview."

The homepage at `/` keeps `index, follow`. [release-indexing.md](release-indexing.md) has the exact launch steps, the checks to run before deploying, and how to undo it.

**Tested in a scratch copy** with `launched = true` (the working tree was not touched):
- both case studies became `index, follow`, and the homepage stayed `index, follow`;
- the sitemap listed `/`, `/work/poly-predictor-kit/` and `/work/reproseed/`, once each;
- every back link pointed to `/#…`, and no `preview=signal-path` remained;
- the footer read "A case study by Raimbek Alish."

## 2. Poly evidence audit

Sources:
- the public repository at commit `475fcd9` (2025-11-18): the README, the three Python services, the training script, the extension and the web page;
- the Devpost page, read on 2026-10-24;
- the team's demo video, linked from both.

Nothing in the team repository was changed. The trained classifier was not run, exported or copied.

| Question | Finding | Evidence |
|---|---|---|
| Purpose | Read a Polymarket event three ways: a summary of what its prices imply, whether its comments are emotional or rational, and whether one side carries lopsided risk | README, extension popup |
| Architecture | A Chrome extension popup with three buttons. Each calls a local Flask service: `/ai-insight` on port 5002, `/analyze` on 5000, `/api/steamroller` on 5001 | Code |
| Gamma ingestion | `/events/slug`, `/events/{id}` and `/public-search` find the event; up to three markets, open ones first; `outcomePrices` arrive as JSON strings and are parsed into implied percentages | `poly_event_ai_summarizer.py` |
| Gemini summaries | The prompt asks for 3–6 sentences:<br>• what the prices roughly imply<br>• one or two scenarios that could change the odds<br>• a balanced view<br>Its rules forbid buy or sell instructions and position sizes, and require a reminder that it is not financial advice. Sent to `gemini-2.5-flash` over REST | Same file |
| Classifier: preparation | Comments from Gamma `/comments`. Gemini 2.5 Flash labels them in batches of 20 as EMOTIONAL, RATIONAL or SPAM. Snowpark `write_pandas` stores them in `COMMENT_LABELS_DATA`. scikit-learn `TfidfVectorizer` + `LogisticRegression(max_iter=1000)` on an 80/20 stratified split prints a classification report and is saved as `comment_classifier.pkl` | `Emotional_Damage_Predictor/`: `commentsReceiver.py`, `geminiAutoLabelAssigner.py`, `upload_to_snowflake.py`, `train_model_snowflake.py` |
| Classifier: runtime | The saved model labels each comment; Gemini is not called. The service writes those labels, appends them to the Snowflake table and retrains, then reports the larger of the emotional and rational shares | `Emotional_Damage_Predictor/main_api.py` |
| Snowflake's role | Storage for the labeled comments. Training is local scikit-learn. The README's "Snowpark ML training" is not supported by the code | Code vs README |
| Steamroller detector (team) | One loss erases p ÷ (1 − p) wins; a side is flagged when p ≥ 0.9 and that factor ≥ 10, with time weighting by days to resolution. Devpost's "uses liquidity" is not in the code | `main_steamroller.py` |
| Raimbek's contribution | The market summarization module, `poly_event_ai_summarizer.py` (commit `5f34cdf`), and the comment-classification pipeline (corrected in Phase 5C). The team built the extension, the Flask service around the summarizer, the steamroller detector and the web page | Repository; Raimbek |
| Award | "Winner · Polymarket Track", submitted to QuackHacks 2.0. Published exactly as "Winner, Polymarket Track — QuackHacks 2025" | Devpost |
| Team | Devpost lists six creators; five appear as commit authors | Devpost, commits |
| Screenshots or demo | The Devpost gallery holds only a logo. A YouTube demo exists and is linked, not embedded. The web page `index.html` has placeholder API addresses | Devpost, code |
| Deployment, users, accuracy | Not deployed; it runs locally. No users, accuracy figures or trading results are claimed | — |

**Attribution.** Resolved in Phase 5C: both pipelines are Raimbek's contribution, and the current site, the preview and the case study use the same sentence.

## 3. The Poly page (`/work/poly-predictor-kit/`)

**Story, in eight chapters** after the hero and overview:
1. **Three buttons, three readings.** What the extension does, one reading per button.
2. **System map.** The interaction (section 4).
3. **The numbers** (Raimbek's part). Find the event, keep what matters, read prices as probabilities, ask Gemini with rules. Includes the prompt's rules verbatim (lines 406–416).
4. **The conversation** (team). Before: Gemini labels the training data, Snowflake stores it and scikit-learn trains. When the button is pressed, the small model reads the comments. Includes the three label definitions verbatim and the pipeline (lines 48–51).
5. **The risk shape** (team). The detector's rule on a night stage, with a calculator (section 4).
6. **Who built what.** Moved after the overview in Phase 5C, as "Raimbek's contribution".
7. **What the code shows.** Four README or Devpost claims and what the code shows instead, plus what is not claimed.
8. **Evidence.** Repository at the commit, Devpost, the demo video, and how each kind of evidence is labeled.

**Visual identity: different from ReproSeed, same system.**
- **Shared with ReproSeed:** the shell (bar, Contents, overview, folds, footer), typography, 12-column grid, focus rings, motion tokens and evidence tags.
- **Poly's own:**
  - The two halves of the thesis carry the two signal colours: mint for the numbers, lilac for the conversation. The same colours run through the hero, the map and the chapters.
  - Coral marks loss and flags.
  - Paper chapters alternate with night stages for the map and the risk shape.
  - The illustration language is route lines and stations, where ReproSeed's is a struck test script.
- **No crypto dashboard:** no price charts, tickers, candlesticks, fake terminals or market data. The only chart is the detector's own formula, labeled "Computed in your browser".

**Evidence labels on every figure:**
- "Verified in code";
- "Public record";
- "Conceptual illustration" (the map and the hero's route figure: "Not the extension's interface and not market data");
- "Computed in your browser";
- "Not claimed".

## 4. Signature interaction: the system map

- **What it shows.** Three lines, one per button, each a row of stations:
  - The numbers: extension button, insight service, event and markets, structured prompt, Gemini, the AI Trade Insight.
  - The conversation: button, comments, saved classifier, emotional or rational.
  - The risk: button, outcome prices, risk rules, risk message.
- **Two times.** "When a button is pressed" shows runtime, 14 stations. "Before: preparing the classifier" shows the preparation line, 5 stations: collect comments, Gemini labels, Snowflake table, train, model file. This keeps Gemini's training labels visibly separate from the runtime classifier.
- **Who built what.** A toggle lights Raimbek's pipelines and dims the team's components (revised in Phases 5C and 5D).
- **Stop card.** For the chosen station: its input, what it does, its output, who built it, and a link to the file at the commit.
- **Keyboard.** Arrow keys move along stations (roving tab index), with Home and End. The toggles are buttons with `aria-pressed`.
- **Motion.** A pulse travels the line only after the reader's first choice, never on load, and never with reduced motion.
- **Full text version.** "Read the system map as text" (a fold, open in the HTML) lists every line and station with the same detail.
- **Nothing runs.** No model, no API call and no market data. The map is labeled a conceptual illustration of the code.

**The risk shape**, a second, smaller interaction:
- **The control.** A slider from 50% to 99% (default 93%).
- **The readout.** What a share can win and lose, how many wins one loss erases, and whether the detector would flag it.
- **The plot.** The curve p ÷ (1 − p) with the flagged zone. The point moves with the slider; the curve itself is the formula.
- **Exact thresholds.** The arithmetic uses whole percentages, so 90% is "9 wins, not flagged", 91% is "10 wins, flagged" and 99% is "99 wins".
- **Labels.** The slider's value text reads the full result to screen readers.

## 5. Homepage integration

- **Case study link.** Poly's section (work 01) gains "Case study →" as the first link, before Source and Devpost. Like ReproSeed's link, it marks `#poly-predictor-kit` in the address first, so Back returns to the section.
- **Wording.** Superseded in Phase 5C: "My part" uses Raimbek's sentence, and both pipelines are marked as Raimbek's.
- **Unchanged.** The hero, Poly's interactions and ReproSeed (work 02).
- **Fixed, older than this phase.** At 360 px the "CodeDay showcase" link in the recognition track ran 10 px past the screen edge, and its arrow was cut off. It was already in Phase 4.5. The label may now wrap inside its 44 px target.

| Preview page height (px) | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 5A | 14,019 | 13,690 | 13,948 | 11,982 | 12,394 |
| Phase 5B | 14,075 | 13,742 | 13,948 | 11,982 | 12,418 |

## 6. URLs and routing

- **The page is a file.** `work/poly-predictor-kit/index.html` builds to `dist/work/poly-predictor-kit/index.html`. It uses the same build plugin as ReproSeed, with no router.
- **Verified in Chromium:**
  - direct load; refresh;
  - a deep link to `#risk` (lands below the bar);
  - homepage → case study → Back (returns to `#poly-predictor-kit`, section top at the bar) → Forward;
  - "Back to the portfolio" (lands on the section);
  - "Next case study: ReproSeed" and ReproSeed's own way back.
- **Links.**
  - In-page links reach their sections.
  - Every external link on the page and every file link in the map returned 200 when checked on 2026-10-24: GitHub at the commit, Devpost and YouTube. LinkedIn refuses automated requests.
  - Each line anchor points at the function its station names.
- **Shared infrastructure.** Shared code moved to `src/work/shared/` only where both pages use it: the shell, Contents, Overview, Fold, evidence tags, the motion hook and the shell styles. Stories, palettes and interactions stay per project.

## 7. SEO and metadata

- **Head.** Title "Poly Predictor Kit: the numbers and the conversation — Raimbek Alish". The description includes "(Winner, Polymarket Track — QuackHacks 2025)" and "a team project".
- **URL and robots.** Canonical `https://callmeraim.dev/work/poly-predictor-kit/`; robots `noindex, follow` until launch.
- **Social.** Open Graph `article`, a Twitter large card, and JSON-LD `TechArticle` with the team as contributors.
- **Social card.** `public/og/poly-predictor-kit.png` (1200 × 630) is rendered from the built hero in Chromium.
- **Content in the HTML.** All chapter text, the map as text and the risk shape's default state are present without JavaScript.

## 8. Screenshots and recordings

On the review page:
- full pages at five sizes for both case studies;
- first screens and the Contents menu on desktop and phone;
- the map in four states and as text;
- the risk shape at 50%, 90%, 91% and 99%;
- the hero with and without reduced motion;
- ReproSeed and Poly side by side;
- recordings: homepage → Poly → Back, the system map, the risk shape and the hero.

## 9. Accessibility

| Check | Result |
|---|---|
| Structure | One `h1`, no skipped heading levels, a skip link that moves focus to `main`, landmarks, and a Contents menu with the current chapter marked |
| Keyboard | Poly: 53 stops, each with a visible ring. Map stations by arrows, Home and End; the slider by arrows, Home and End; folds and the menu by Enter or Space |
| Touch | Station taps, toggles, folds, the menu and a horizontal slider drag all work; vertical swipes still scroll |
| Targets | No target under 24 px at any size, including the 12 px mono links, which have a taller hit area |
| Contrast | No failures on paper or night surfaces at any size |
| Text alternatives | The map as text; the slider's value text; the hero figure and the plot are hidden from screen readers because their content is in text |
| Reduced motion | Nothing animates: the hero's route lines are drawn at once, and the map has no pulse |
| Fonts blocked | Lays out without overflow |

## 10. Performance (lab, not field data)

Five cold runs per page and profile, median. Every value here is measured in headless Chromium on this machine; none is estimated, and there is no field data.

| Profile | Viewport | CPU | Network |
|---|---|---|---|
| Mobile | 412 × 823 | 4× slowdown | 1.6 Mbps, 150 ms latency |
| Desktop | 1350 × 940 | none | 10 Mbps |

| Page | LCP mobile | LCP desktop | CLS | Transfer |
|---|---|---|---|---|
| Poly `/work/poly-predictor-kit/` | **0.72 s** (runs 0.72–0.85) | 0.22 s | 0 | 146 KB (fonts 60, script 65, HTML 13, CSS 9) |
| ReproSeed `/work/reproseed/` | **0.74 s** (runs 0.72–0.78) | 0.22 s | 0 | 144 KB |
| Signal Path preview, Phase 5B | 1.60 s (runs 1.60–1.63) | 0.36 s | 0 | 192 KB |
| Signal Path preview, Phase 4.5 (same session) | 1.57 s (runs 1.55–1.60) | 0.35 s | 0 | 186 KB |

**Targets: met.** Mobile LCP is well under 2.5 s and CLS is 0, under 0.05, for every page.

- **LCP elements.** On Poly, the hero thesis on mobile and the title on desktop.
- **Weight.** Poly weighs about the same as ReproSeed: the same shell, fonts and React copy, and 1.6 KB more compressed HTML.
- **Preview vs 5A.** The preview is unchanged from Phase 5A (192 KB, 1.61 s then).
- **Main thread.** No long tasks on either case study.
- **Failed runs.** None in this run. An earlier run overlapped with a stray process, so it was discarded and redone.

## 11. Regression

- **Homepage `/` and Code Topology Lab.** Pixel-identical to the Phase 4.5 build at all five widths (the Lab at two), with identical links, ids, headings, stylesheets and meta.
- **Tracked files.** They differ from the Phase 5A checkpoint only in `public/sitemap.xml`, which is back to its committed version.
- **Homepage preview.** Stills at five sizes pass every check, and keyboard traversal has 65 stops, all with rings.
- **A new check.** A sweep for content cut off at the screen's edge, which `overflow-x: clip` hides from the usual overflow check. It found the old CodeDay issue and a Poly code caption, and both are fixed.
- **Checks.** Typecheck, build and `git diff --check` pass.

## 12. Git status

Nothing is committed, pushed, merged or deployed. Branch `design/proof-signal`. Phase 5B's work is in untracked paths:
- `src/work/`, `src/content/`, `src/signal-path/` and `work/`;
- `public/og/poly-predictor-kit.png`;
- `docs/`.

Tracked changes are the same as at the end of Phase 5A, except `public/sitemap.xml`, which is restored. `src/data.ts`, the current homepage and the résumé are untouched.

## 13. Critical assessment

**What works**
- **The thesis is part of the design.** Mint for the numbers and lilac for the conversation run from the title through the map, the chapters and the risk stage.
- **The map explains the architecture faster than prose.** It keeps training (Gemini labels) apart from runtime (the local model), and shows Raimbek's part without overstating it.
- **It does not read as a crypto dashboard.** There are no prices, tickers, candles or fake terminals. The only chart plots the detector's own formula, labeled as computed in the browser.
- **The unsupported claims make the page more credible.** "What the code shows" turns the README's and Devpost's unsupported claims into evidence of care.
- **Same system, different world.** It shares ReproSeed's shell and type, but has a night stage and route lines where ReproSeed has paper and a blue pencil. The middle of the story is shaped differently, not a copy of ReproSeed's five chapters.

**What is weaker**
- **Length.**
  - Poly measures 11,080 px at 1440 × 900 (about 12 screens) and 15,774 px at 390 × 844 (about 19).
  - The map section alone is about 2,000 px on desktop, because the map as text is open there.
- **Raimbek's part came third.** Phase 5C moved the contribution chapter directly after the overview.
- **The risk panel.** Its large percentage and cents per share make it the one element that leans toward a trading widget. Labels and copy keep it on the formula, but it is the first place to simplify.
- **Phone toggles.** On phones, the map's two toggle groups stack into a heavy block.
- **No product picture.** No real screenshot of the extension is public. The route figure and the reading cards stand in for the product.

**Fixed during the visual review**
- On phones, a long path in a code caption ran past the screen edge. It now breaks after the slash.
- 12 px mono links were under 24 px tall. They now have taller hit areas.
- On phones, the risk verdict grew by a line at 90%, moving the slider away from the finger. Two lines are now reserved.
- At the lowest price, the plot's point covered the axis labels. The labels now sit clear of it.
- At 390 px the award badge's arrow wrapped onto its own line. It now stays with the event name.
- `comment_classifier.pkl` broke mid-word. It now breaks after the underscore.
- The overview's credit line used a pronoun for Raimbek; it was rewritten without one.
- The homepage's CodeDay link was cut off at 360 px, a bug from Phase 4.5.

## 14. Remaining work before the next flagship

1. **Decide the Poly contribution wording** (decision 12 in the ledger), and with it whether scikit-learn and Snowflake stay under "Also".
2. **Decide ReproSeed on tablets** (below).
3. **Optional, with the team's consent:** a real screenshot of the extension, or a short clip from the team's demo, would give the page a picture of the product.
4. **Test beyond Chromium:** Safari on an iPhone, Chrome on Android, and a single Firefox pass run on its own.
5. **Share more code only when a third case study needs it.** Each page still has its own chapter frame and evidence-tag wrapper.
6. **Keep launch separate:** make Signal Path the homepage, set `launched` to true and follow [release-indexing.md](release-indexing.md). Deploying is Raimbek's decision.
7. **Internship Radar** stays private and unimplemented until its scope is approved. Nothing about it was published or copied in this phase.

## Decisions needed

1. ~~**Poly contribution wording.**~~ Resolved in Phase 5C.
2. **ReproSeed on tablets.** The page is now about 13% longer on tablet and desktop. Option: fold the long evidence on tablets too (up to 1023 px), as on phones. At 768 px the page would then measure 12,656 px instead of 16,399: shorter than Phase 5A's 14,613, with every excerpt one tap away. Desktop would stay as it is.

## Files

**New**
- `work/poly-predictor-kit/index.html`
- `src/content/poly.ts`, `src/content/evidence.ts`
- `src/work/poly-predictor-kit/` (page, sections, map, risk, styles)
- `src/work/shared/` (shell, Contents, Overview, Fold, evidence tag, motion, styles)
- `src/work/release.ts`, `src/work/reproseed/structure.ts`
- `public/og/poly-predictor-kit.png`
- `docs/release-indexing.md`, this report

**Changed**
- `scripts/work-pages.ts` (sitemap at launch)
- `src/work/site.ts`, `src/work/head.ts`
- `src/work/reproseed/` (overview, conclusion, folds, shared shell)
- `src/content/reproseed.ts` (authorship, evidence tones)
- `public/sitemap.xml` (restored)
- `src/signal-path/`: `ui.tsx` (`CaseStudyLink`), `sections/FeaturedProject.tsx`, `sections/ReproSeed.tsx`, `content.ts`, `styles/poly.css`, `styles/recognition.css`
- `src/content/systems.ts`, `src/content/profile.ts`
- `docs/content-evidence-ledger.md`, `docs/phase-5a-reproseed.md`

The homepage's own files (`index.html`, `src/App.tsx`, `src/data.ts`, `src/components/`) are not changed in this phase.
