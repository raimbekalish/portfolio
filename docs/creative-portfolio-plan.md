# Creative portfolio plan

Status: proposal awaiting approval
Branch: `design/proof-signal` (from `main` at `2cdb64b`)
Date: 2026-10-21

This phase is planning only. Two verified mobile copy fixes landed (see [Phase 1](#phase-1-completed)); nothing else in the application changed. No dependencies were installed, nothing was committed, pushed or deployed.

> **Phase 2 update (2026-10-21).** Signal Path was approved with higher ambition. Two hero prototypes and a content ledger now exist: see [phase-2-prototype-review.md](phase-2-prototype-review.md) and [content-evidence-ledger.md](content-evidence-ledger.md). Changes from this plan: InterviewMirror is excluded; the Poly Predictor Kit award is worded as the source states it; the CodeDay award is unverified; GSAP is deferred because the prototypes needed no animation library; and the recommended hero combines prototype A's system with prototype B's signal.

> **Publication rule for this file.** This repository is public. This plan uses only information that is already public (the live site, the public résumé, public repositories and Devpost pages) or that describes intent. Details from private repositories and from R-Finance stay out of this file until Raimbek approves them for publication.

## Contents

1. [Creative brief](#1-creative-brief)
2. [Three art directions](#2-three-art-directions)
3. [Recommendation](#3-recommendation)
4. [Signature experiences](#4-signature-experiences)
5. [Information architecture](#5-information-architecture)
6. [Projects, evidence and content concerns](#6-projects-evidence-and-content-concerns)
7. [Technology and motion architecture](#7-technology-and-motion-architecture)
8. [Performance and accessibility strategy](#8-performance-and-accessibility-strategy)
9. [Components to preserve, reuse, simplify or rebuild](#9-components-to-preserve-reuse-simplify-or-rebuild)
10. [Implementation phases](#10-implementation-phases)
11. [Acceptance criteria](#11-acceptance-criteria)
12. [Unresolved publication questions](#12-unresolved-publication-questions)
13. [Appendix: measurements and sources](#appendix-measurements-and-sources)

---

## 1. Creative brief

### Goal

Build an exceptional, memorable engineering portfolio that can stand next to strong creative-developer and studio sites, and that a hiring manager still understands in ten seconds. It must show that Raimbek builds serious software systems. The site itself should be evidence of engineering judgment.

### Audiences, in priority order

1. **Recruiters and hiring managers** for Summer 2027 software engineering internships. They need role, target, résumé, contact and the strongest proof within seconds.
2. **Engineers** reviewing depth: architecture, decisions, trade-offs, and code where it is public.
3. **Design-literate visitors** who notice typography, motion and craft.

### Positioning

Software engineer focused on AI systems and the backends behind them. Keep the line "AI, backend, and everything in between."

Public facts the site can rely on today: AI/ML Engineering Intern at R-Finance (June 2026 to present); Computer Science–Mathematics at Whitman College, expected May 2028; Computer Science Teaching Assistant at Bellevue College; Canva extern; winner of the Polymarket Track at QuackHacks 2.0 (2025, verified on Devpost). The CodeDay Seattle Fall 2025 award claimed on the résumé is not shown on the public showcase and stays unpublished until a source is provided (see the [content evidence ledger](content-evidence-ledger.md)).

### Principles

1. **Content first.** Every page is complete as prerendered HTML. Motion is a layer on top and never a gate.
2. **One visual language, a few signature moments.** Everything else stays quiet.
3. **Motion explains.** Each animation shows a real relationship: data flow, cause and effect, hierarchy, or navigation continuity. No fade-in-on-scroll as the main idea.
4. **Evidence on the surface.** Claims link to their sources. Limits live in one footnote per project instead of a caveat in every block.
5. **Fewer, deeper projects.** Not every project gets a case study.
6. **The site is a work sample.** Performance, accessibility and progressive enhancement are part of the design.

### Non-negotiables

- Core content and navigation never wait for visual effects.
- No major layout shifts.
- `prefers-reduced-motion` is respected everywhere.
- Keyboard and screen-reader access is preserved.
- Smooth on capable devices, graceful on low-power phones.
- Heavy effects load progressively.
- No scroll hijacking and nothing that obstructs navigation.
- Usability wins over spectacle when they conflict.

### Content policy

- No fabricated measurements, awards, screenshots, product interfaces, deployment claims or contributions.
- Private company and private repository details stay confidential.
- The vehicle-photo validation results stay unpublished until explicitly authorized.
- The knowledge assistant's public name stays unresolved until confirmed.
- InterviewMirror is out of scope for this portfolio.

### Success criteria

- A recruiter finds name, role, internship target, résumé and email on the first screen at every width from 360 to 1920 px, without interacting.
- An engineer reaches an architecture explanation in at most two clicks from the first screen.
- A design-literate visitor can describe one signature moment afterward.

---

## 2. Three art directions

The three concepts differ in material, structure, motion and signature. Each one fully replaces the current hero.

### Concept 1 · Live Proof

*Proof, evolved into a cinematic, interactive editorial experience.*

| | |
|---|---|
| **Creative thesis** | A technical publication that runs. The portfolio reads like a beautifully typeset paper, but its figures execute, its claims carry receipts, and each chapter opens like a scene in a film. |
| **Visual identity** | Paper and ink, punctuated by full-bleed dark "plates" for immersive figures. Numbered figures, margin notes and § section marks. The mint square becomes a tombstone (∎) that closes each result. |
| **Typography** | Newsreader for display and text, using its optical-size axis (display cut near opsz 72, text cut near opsz 16), cut down to static instances to control weight. Manrope for interface text and labels. JetBrains Mono for figure labels and code. Scale contrast drives the drama: 120–160 px chapter titles against 18–19 px body text. |
| **Color system** | Paper `#F5F5F0`, ink `#121614` (16.7:1), muted ink `#4A5550` (7.1:1), deep green links `#1D6A4D` (6.0:1), highlight `#CDEFDF` behind ink, plate `#0E1311` with plate text `#ECEDE6` and mint `#A8E6CF` as light. |
| **Homepage composition** | A title page: name, a three-line abstract, status, résumé and email, and a contents list of the flagship projects with context tags. Chapters follow; each opens on a dark plate with the project's signature figure and continues on a paper spread for the claim, approach, decision and result. |
| **Hero interaction** | Kinetic typesetting. The name sets itself onto a baseline grid, the ∎ lands, and the contents leaders draw. Hovering or focusing a contents entry previews its figure in the margin. |
| **Project showcase** | Flagships get a plate, an executable figure and an editorial spread. Secondary projects get an index entry with one figure. |
| **Section transitions** | Scroll-linked plate reveals: as a chapter approaches, its figure frame expands to full bleed over roughly 60% of a viewport. On the way out, the plate collapses into a numbered thumbnail in the margin. No pinning. |
| **Motion language** | Typographic and inky: strokes draw, leaders extend, a highlighter sweeps under key phrases, and figures step through states in crisp cuts. Easing `cubic-bezier(.2,.7,.2,1)`, 200–700 ms. |
| **Signature interaction** | **Receipts.** Every evidenced claim has a small marker. Hover, focus or tap opens a margin card with the source (commit, Devpost page, award page, file), and a thin ink thread draws from claim to card. "Show all receipts" reveals every thread at once. |
| **Mobile adaptation** | Margin notes become inline disclosures. Plates become full-width figures with step buttons. Typesetting is shortened, and plate reveals become a simple crossfade on low-power devices. |
| **Accessibility** | Receipts are native disclosure buttons with `aria-expanded`. Threads are decorative. Each figure has a text equivalent (an ordered list of steps). Reduced motion removes typesetting, threads and reveals. |
| **Required technology** | CSS and SVG for most of it. GSAP core and ScrollTrigger for scrubbed plate reveals and figure stepping. SplitText for typesetting. View Transitions for chapter-to-page navigation. |
| **Performance trade-offs** | Fonts are the main cost: Newsreader's full variable Latin files are 272 KB and must be cut to the instances used (target about 100 KB of fonts in total). Enhancement JavaScript is about 45–62 KB gzip, loaded after first paint. |
| **Implementation complexity** | Medium. Roughly 2.5–3.5 focused weeks. Main risk: it can still read as academic if pacing and scale contrast are timid. |

```text
Desktop first screen
┌───────────────────────────────────────────────────────────────┐
│ callmeraim.dev                        Contents  Résumé  Email │
│                                                               │
│ Updated     Raimbek Alish∎                    STATUS          │
│ Oct 2026    AI, backend, and everything in…   Seeking SWE     │
│             Abstract. I build AI systems …    internships     │
│             §1 R-Finance ............ Internship  [Résumé ↗]  │
│             §2 Internship Radar ..... (pending approval)      │
│             §3 Poly Predictor Kit ... Winner                  │
└───────────────────────────────────────────────────────────────┘
```

### Concept 2 · Aperture

*Monument + Escape, reinterpreted with recruiter clarity and higher refinement.*

| | |
|---|---|
| **Creative thesis** | The name is the monument; the period is the way in. The mint square becomes a lens that opens onto each project, and every project entrance is a cinematic aperture transition. The name is never cut up, and recruiter information is never hidden behind the effect. |
| **Visual identity** | A night gallery: deep ink, cream monumental type, and mint as the single light source. Projects appear as full-bleed scenes framed by a rounded-square aperture. Generous negative space and film-like letterboxing. |
| **Typography** | Archivo Variable at its widest (`wdth 125`, weights 800–900) for the name and chapter titles, cut to the range used. Manrope for interface and body text. Width-axis animation provides the kinetic type: the name settles from narrow to expanded on load. |
| **Color system** | Ink `#0A0C0E`, cream `#F2F0E9` (17.2:1), muted `#A9B2AC` (9.0:1), surface `#14181B`, mint `#A8E6CF` (13.9:1). Each project contributes one desaturated tint taken from its real imagery. |
| **Homepage composition** | Left seven columns: name, role and target line, résumé, email, GitHub and LinkedIn. Right five columns: an index of four featured projects with number, title, one-line outcome and context tag. The mint period ends "Alish" and doubles as the aperture. |
| **Hero interaction** | Focus pull. Hovering or focusing an index entry grows the aperture from the period into a framed preview (a still or a silent loop of real material) while the rest of the hero dims slightly. The name stays fully legible. |
| **Project showcase** | Flagships get a full-bleed project page that opens on the aperture-framed hero and continues as vertical "scenes" (problem, build, decision, outcome), like a storyboard. Secondary projects sit in a contact-sheet grid. |
| **Section transitions** | An iris: a mint square at each section boundary expands into the next section's background. Brief, scroll-linked, and a hard cut under reduced motion. |
| **Motion language** | Cinematic and weighty: expo easing, scale and clip-path reveals, focus pulls, 600–1100 ms. Monumental type breathes on its width axis and never clips content. |
| **Signature interaction** | **The aperture.** The period opens into any project, and entering it expands the period to full screen as a shared element that carries the preview into the project page. |
| **Mobile adaptation** | The index becomes a list under the name. Tapping shows the preview inline above the item, and a second tap enters. Same View Transition, with lighter effects on low-power devices. |
| **Accessibility** | Index entries are real links. Previews are decorative and appear on keyboard focus as well as hover. Loops stop after five seconds or can be paused. Reduced motion swaps instantly. |
| **Required technology** | CSS `clip-path`, the View Transitions API and a little JavaScript state. GSAP Flip only as a fallback for the index-to-page morph. Short H.264/AV1 loops with posters for real interface captures. |
| **Performance trade-offs** | Media dominates: about 250 KB of posters per preview set, with loops loaded only on intent and never autoplayed under Save-Data. Fonts are about 60–110 KB (Archivo cut to the used range plus Manrope). |
| **Implementation complexity** | Medium. Roughly 2–3 weeks. Main risk: it depends on strong imagery for every project, and two of the four flagships have no publishable visuals yet. Without them it drifts back toward today's hero. |

```text
Desktop first screen
┌───────────────────────────────────────────────────────────────┐
│ Raimbek Alish                    Work  Experience  About  CV ↗│
│                                                               │
│ RAIMBEK                          01  R-Finance      Internship│
│ ALISH■ ← aperture                02  Internship Radar  pending│
│                                  03  Poly Predictor     Winner│
│ Software engineer · AI + backend 04  Visual Novel      CodeDay│
│ [Résumé] [Email]  GitHub  LinkedIn                            │
└───────────────────────────────────────────────────────────────┘
```

### Concept 3 · Signal Path

*The most ambitious original proposal.*

| | |
|---|---|
| **Creative thesis** | Everything Raimbek builds sits between an input and an outcome. The site makes that "in between" visible: one continuous signal path runs through the whole portfolio, and the mint square from Raimbek's name is the signal. As it passes through each system, it changes form according to what that system actually does. |
| **Visual identity** | An engineered instrument on a quiet workbench. A warm-gray bench page, graphite type, and black "modules" for projects, in which the signal glows mint. Measurement amber appears only on verified figures and awards. A hairline grid of ports and patch points, with labels in a technical mono. The references are test equipment, modular synthesizers and signal-flow diagrams, not a hacker terminal. |
| **Typography** | Instrument Sans Variable: condensed (`wdth 75`, weights 600–700) for the name and headlines, normal width for body text. Martian Mono Variable for port names, labels and data. Tabular figures throughout. |
| **Color system** | Bench `#E4E3DD`, bench-2 `#D6D4CC`, graphite text `#16181A` (13.8:1), graphite-2 `#4B4F52` (6.4:1), module `#111315` with module text `#E9EBE6` (15.5:1) and module muted `#A3ABA6` (7.9:1), signal mint `#A8E6CF` (13.2:1 on modules), measurement amber `#E7C66B` (11.3:1 on modules). Mint on the bench is decorative only (1.1:1), so it never carries text there; on the bench the token gets a graphite outline. |
| **Homepage composition** | First screen on the bench: status line, the name with its mint square, the tagline, facts, résumé, email, GitHub and LinkedIn. To the right sits a "patch bay": four featured systems as small black blocks with labeled ports and one-line outcomes. The signal path starts at the period and runs down the left gutter into each project module below. |
| **Hero interaction** | The period emits the signal and the path lights up the patch bay ([storyboard A](#a-the-first-five-seconds)). Hovering or focusing a patch-bay entry lights its port and shows a one-line readout of input and output. |
| **Project showcase** | Flagships are full-width black modules with a live signal-flow diagram built from real components, plus a project page with a deeper schematic, Run and Trace back controls, decisions with receipts, and verified outcomes. Secondary projects are smaller modules in a rack. The archive is a plain list. |
| **Section transitions** | The signal is the transition. Past a module's output port, the token travels the short gutter segment to the next module's input, tied to scroll position and only within the gaps between modules. Between non-project sections, the path continues as a quiet rail with labeled ports that double as a section index. |
| **Motion language** | Signal semantics only: travel along paths at constant speed, transform at processors (morphs of 400 ms or less), split and join at forks, and settle with one LED blink. Nothing floats, tilts or parallaxes. Durations are short, with linear easing for travel and snappy easing for morphs. |
| **Signature interaction** | **Trace back.** Click or tap any output in a system ("Market summary", "Comment category", "Structured response", "Playable scene") and the path lights backward to its input, annotating each stage it passed through. Lineage, made visible. On fine pointers, a small **probe** readout shows what flows on a wire when you hover it, for example "story JSON" or "TF-IDF vector". |
| **Mobile adaptation** | At 600 px and below there is no continuous rail. Each module shows its own vertical diagram, and the token animates inside a module once when it enters view, or on Run. Trace back and Run stay, operated by tap. |
| **Accessibility** | The path and token are decorative (`aria-hidden`). Every diagram has an ordered list of stages. Run and Trace back are buttons that announce results in a live region. Reduced motion means the token never travels: ports show final states and Trace back highlights instantly. |
| **Required technology** | Inline SVG for diagrams and the path, with path geometry computed from measured layout (ResizeObserver). CSS Motion Path for the first-screen token. GSAP core, ScrollTrigger, MotionPathPlugin, MorphSVGPlugin and DrawSVGPlugin, loaded lazily, for scroll travel, morphs and timelines. View Transitions for entering project pages. No WebGL. |
| **Performance trade-offs** | About 62 KB gzip of lazy enhancement JavaScript (measured) and about 93 KB of fonts before subsetting (Instrument Sans 56 KB plus Martian Mono 38 KB). Diagrams are small inline SVG. Path recalculation runs debounced on resize. |
| **Implementation complexity** | High. Roughly 4–5 focused weeks in full, but it phases cleanly: static path and modules first (a complete, shippable site), then token travel, then morphs, then Trace back. Main risk: turning into a gimmick if the token moves constantly or the path fights the layout. |

```text
Desktop first screen
┌───────────────────────────────────────────────────────────────┐
│ RAIMBEK ALISH                    WORK  EXPERIENCE  ABOUT  CV ↗│
│ ● Seeking Summer 2027 SWE internships    PATCH BAY            │
│                                          ┌─────────────────┐  │
│ Raimbek Alish■                           │01 R-Finance  ○→ │  │
│ │ AI, backend, and everything in between.│02 Radar      ○→ │  │
│ │ AI/ML Eng. Intern · CS–Math ’28        │03 Poly       ○→ │  │
│ │ [Résumé] [Email]  GitHub  LinkedIn     │04 Novel      ○→ │  │
│ ■ ← signal travels down the gutter       └─────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

---

## 3. Recommendation

**Build Signal Path.** Take Live Proof's reading discipline (typographic rigor, receipts, one footnote per project, numbered figures) and Aperture's shared-element entry into project pages.

Why it has the highest potential:

1. **It is made from the material Raimbek actually has.** The strongest evidence is architecture and decisions, not imagery. R-Finance is internal and Internship Radar is not yet public, so an image-led concept starves exactly where the portfolio most needs depth.
2. **Everything reinforces one idea.** The tagline ("everything in between"), the brand mark (the mint square), the motion (signal travel) and the content (systems and decisions) all say the same thing.
3. **The site demonstrates engineering judgment.** Layout-aware path geometry, progressive enhancement, accessible interactive diagrams and strict budgets make the site a systems project in its own right.
4. **It scales.** Each new project becomes a new module with its own transformation. Internship Radar fits naturally.
5. **Recruiter clarity survives.** The first screen is plain, prerendered text. The spectacle happens alongside and below it.

Why not the others:

- **Live Proof** has the best reading experience but the weakest memorable moment. Its motion supports reading rather than creating one.
- **Aperture** is the most "studio" of the three but needs strong imagery for every project, and the current evidence cannot supply it honestly.

Risks and mitigations:

| Risk | Mitigation |
|---|---|
| The token becomes a gimmick | It moves only between modules and on explicit Run or Trace, never while text is being read. |
| Path geometry fights the responsive layout | Compute the path from measured anchors with ResizeObserver; the static rail is designed first; on phones the rail is removed. |
| Effort overruns during recruiting season | Phase 4 ships a complete static Signal Path before any animation library is added. |

---

## 4. Signature experiences

All three storyboards are written for Signal Path.

### A. The first five seconds

| Beat | What happens |
|---|---|
| **Initial state** (0 ms, prerendered HTML) | The first screen is already complete: status, name with mint square, tagline, facts, résumé and email buttons, GitHub and LinkedIn, and the patch bay of four systems. The path is drawn statically in graphite. Fonts swap against metric-matched fallbacks, so nothing shifts. |
| **Trigger** | The enhancement module loads after first paint (idle callback or first interaction, whichever is first) and `document.fonts.ready` resolves. |
| **0.0–0.4 s** | The mint square powers on: one LED-style blink and a 120 ms scale pulse. |
| **0.4–1.4 s** | A copy of the square separates (the period stays in the name) and travels along the first path segment. As it passes each patch-bay port, the port lights, staggered 80 ms. Behind it the path turns from graphite to mint. |
| **1.4–2.0 s** | The token settles at the first module's input port, blinks once, and a mono caption reads "Signal enters: R-Finance". |
| **Final state** | A static hero with the path lit to the first module and the token at rest. Everything was readable from 0 ms. The sequence plays once per session. |
| **Reduced motion** | No blink, pulse or travel. The path is rendered lit to the first port and the token rests there. |
| **Feasibility** | CSS and SVG only: CSS Motion Path (`offset-path`, `offset-distance`), keyframes and `stroke-dashoffset`. No library on the critical path. |
| **What it demonstrates** | Design: the brand mark becomes the protagonist in under two seconds. Engineering: content-first rendering, no layout shift, compositor-friendly properties, and an animation that never blocks reading or input. |

### B. Entering a featured project

| Beat | What happens |
|---|---|
| **Initial state** | Home, scrolled to the Poly Predictor Kit module: a black module with two independent routes and the token at its input port. |
| **Trigger** | Click or Enter on "Open case study", a real link to `/work/poly-predictor-kit/`. |
| **Transformation** (about 700 ms) | A same-document View Transition. The module expands to fill the viewport and becomes the page's hero module, the title morphs into the page's H1, the bench recedes, and the token rides along to the expanded schematic's input port. |
| **Final state** | The project page: H1, context line (QuackHacks 2.0 · Winner, Polymarket Track · team project · Raimbek's part), source and project links, and the schematic ready to run. Focus moves to the H1, the document title updates and the URL changes. Back reverses the transition and restores scroll. |
| **Reduced motion** | Navigation is instant, with no transition animation. |
| **Fallback** | Without View Transitions support: normal navigation with a 150 ms fade-in. Every route is also prerendered, so direct loads and crawlers get full HTML. |
| **Feasibility** | Native View Transitions plus a small router, or React 19.3's `<ViewTransition>`. No animation library required. |
| **What it demonstrates** | Design: continuity between overview and depth. Engineering: real URLs, correct history and scroll restoration, focus management, and prerendered pages, with the transition as progressive enhancement. |

### C. Inside the classifier (Poly Predictor Kit)

A two-level interactive visualization of the comment pipeline. Level 1 needs no model and always ships. Level 2 is optional and needs approval.

| Beat | What happens |
|---|---|
| **Initial state** | The comment route on the Poly page: Comments → TF-IDF → logistic regression → Emotional, Rational or Spam. A text field holds a clearly labeled example comment, with a Run button and two more examples. |
| **Trigger** | The visitor presses Run, optionally after editing the text or choosing another example. |
| **Transformation** | The comment splits into word chips that slide into the TF-IDF stage, where each chip gets a weight bar (300 ms). Chips with non-zero weight move into the logistic-regression stage, where each class score grows term by term (30 ms stagger, at most 12 terms shown). The winning class lights and the token leaves through that output port. |
| **Final state** | A result card with the predicted label, its probability, and the three terms that contributed most. It states that this is the team's hackathon model and can be wrong. Trace back is available. |
| **Reduced motion** | No chip movement. Bars appear at their final values and the result is immediate. |
| **Level 1 (always ships)** | Trace back and Run with three fixed, pre-computed examples, rendered from static data. |
| **Level 2 (optional, needs approval)** | Live inference in the browser from the exported vocabulary, IDF values and coefficients (a dot product and softmax; no server, no API key, and the text never leaves the page). Requires a one-time offline export of the public model, a parity test against the Python model on fixed inputs, and the team's consent. |
| **Feasibility** | SVG and CSS, plus about 80 lines of TypeScript for inference. GSAP timelines optional for choreography. No machine-learning library in the browser. |
| **What it demonstrates** | Design: an abstract model made legible. Engineering: client-side inference sized to the problem, privacy by construction, reproducibility through parity tests, and honest labeling. |

### Feasibility summary

| Experience | CSS/SVG only | Needs a library |
|---|---|---|
| A. First five seconds | Yes (CSS Motion Path) | No |
| B. Entering a project | Yes (View Transitions) | No (React 19.3 optional) |
| C. Inside the classifier | Yes for bars and states | GSAP optional for choreography |
| Token travel between modules | Partly: CSS scroll timelines are not enabled by default in Firefox | GSAP ScrollTrigger + MotionPathPlugin |
| Token transformations | No: CSS cannot morph paths with different point counts | GSAP MorphSVGPlugin |
| Trace back | Yes for highlighting | GSAP timeline for reversible sequencing |

---

## 5. Information architecture

### Recommendation: a hybrid

A long-form home page for scanning and story, plus dedicated pages for flagship case studies.

| | Single page | **Hybrid (recommended)** | Multi-page |
|---|---|---|---|
| Navigation | One scroll; anchor jumps | One scroll for overview, one click for depth | More clicks to see the whole picture |
| Searchability and sharing | One URL, one preview card | A URL, title and preview card per flagship | Same as hybrid |
| Storytelling | Continuous, but depth makes the page very long | Continuous overview, focused depth | Fragmented |
| Maintainability | One huge component tree | Shared templates, small pages | Most boilerplate |
| Performance | Everything competes on one page | Heavy figures load only on their pages | Same as hybrid |

### Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/work/r-finance/` | R-Finance case study (content gated) |
| `/work/internship-radar/` | Only if publication is approved |
| `/work/poly-predictor-kit/` | Poly Predictor Kit case study |
| `/work/ai-visual-novel-creator/` | Compact case study |
| `/lab/code-topology/` | Optional Lab (replaces `/?lab=code-topology`, which keeps working through a client-side redirect) |
| `/404.html` | Custom not-found page |
| `/Raimbek_Alish_Resume.pdf` | Unchanged |

### Home, in order

1. **First screen:** status, name, tagline, facts, résumé, email, GitHub, LinkedIn, and the patch bay of featured systems.
2. **Featured systems:** flagship modules, each with summary, compact diagram, outcome line and "Open case study".
3. **More projects:** a rack of secondary modules (PromptLock) and an archive list (JiraGenie).
4. **Experience:** R-Finance (linking to the case study), Bellevue College, Canva. Bullets are curated, never silently truncated.
5. **Hackathons and recognition:** results with sources (Devpost and showcase pages).
6. **Skills:** grouped, each linking to where it was used.
7. **About and education.**
8. **Contact.**
9. **Footer:** Lab link, source repository, last updated date.

Keep the existing anchor IDs (`#selected-work`, `#projects`, `#experience`, `#education`, `#skills`, `#contact`, `#about`, and the project anchors) so old links still land.

### How to build it without changing the foundation

Keep React, TypeScript, Vite and plain CSS. Add build-time prerendering with no new dependency: a server entry rendered with `react-dom/server` (or the `react-dom/static` prerender APIs after the React 19 upgrade). A small script writes `dist/<route>/index.html` for each route with its own title, description, canonical URL, Open Graph tags and JSON-LD. The client hydrates, and a small typed router handles in-app navigation, scroll restoration, focus management and View Transitions.

Astro was considered: static HTML by default, islands, built-in transitions and typed content. It is the better fit if the prerender script grows past about 150 lines or a content pipeline becomes painful. Today that would be a migration without enough payoff.

### Content model and the fragile index-based selection

The current code selects featured content by array position:

| Location | Problem |
|---|---|
| `src/components/WorkChapters.tsx:6` | `const [poly, novel, ...additional] = projects;` Reordering `projects` in `data.ts` silently puts one project's data into another project's hand-written chapter. |
| `src/type-interface/TypeInterface.tsx:11-12` | `projects[0]` and `projects[1]` feed the hero, while the matching `href`s are hard-coded strings. Two sources of truth. |
| `src/components/About.tsx:33-34` | `honors[2]` by index. |
| `src/components/Experience.tsx:45` | Compares `experience.company === "R-Finance"` to decide whether to show a link. |
| `src/components/WorkChapters.tsx:49-67` | The R-Finance chapter's content is hard-coded in the component, not in data. |
| Chapter numbers | Literal strings ("01", "02") and `0{i + 4}`. |

The replacement is a typed registry keyed by slug, with explicit tiers, explicit order, and a status on every claim.

```ts
type ProjectSlug =
  | "r-finance" | "internship-radar" | "poly-predictor-kit"
  | "ai-visual-novel-creator" | "promptlock" | "jiragenie";

type Claim = {
  text: string;
  status: "verified" | "pending";        // pending claims never render
  source?: { label: string; url: string };
};

type Project = {
  slug: ProjectSlug;
  title: string;
  tier: "flagship" | "secondary" | "archive";
  order: number;
  publication: "published" | "draft";    // draft projects never render
  context: { event?: string; employer?: string; period: string };
  team: { size?: number; myPart: string };
  outcomes: Claim[];
  decisions: { title: string; why: string; tradeoff: string; receipt?: Claim }[];
  links: { kind: "source" | "project" | "live"; url: string }[];
};

// Record<ProjectSlug, Project> makes TypeScript fail the build if a slug is missing.
export const projects = { /* ... */ } satisfies Record<ProjectSlug, Project>;

export const featured = Object.values(projects)
  .filter((p) => p.tier === "flagship" && p.publication === "published")
  .sort((a, b) => a.order - b.order);
```

Experience entries link to projects by `projectSlug`, and awards become named records with sources. A small build check scans `dist/` for a denylist of restricted strings (for example unauthorized metrics) and fails the build if any appear. This keeps the publication policy enforceable instead of relying on memory.

---

## 6. Projects, evidence and content concerns

### Tiers

| Project | Tier | Presentation | Why |
|---|---|---|---|
| R-Finance | Flagship, content gated | One module with two clearly separate lanes, plus a case study | Real-world AI and backend work, and the strongest professional signal |
| Internship Radar | Flagship, publication gated | Module and case study only after approval; otherwise omitted, not teased | Named in the brief as the most ambitious project; the strongest systems story if approved |
| Poly Predictor Kit | Flagship | Module, case study and storyboard C | Award winner, public repository, Raimbek's parts clearly scoped |
| AI Visual Novel Creator | Secondary, rich | Module whose token becomes a scene frame revealing the one real screenshot, plus a compact page | The only real project imagery and a generative pipeline (award unverified) |
| PromptLock | Secondary | Module with a small budget-compression visualization on synthetic input | Strong developer-tools story; contribution wording needs reconciling |
| JiraGenie | Archive | List entry with links | Team project; Raimbek's part was speech-to-text input |

### What each project's signal does (Signal Path)

| Project | Transformation |
|---|---|
| R-Finance, vision lane | The token becomes an image frame, a box locks onto an illustrated vehicle silhouette, and a structured response leaves. Labeled as an illustration. |
| R-Finance, knowledge lane | A question line splits into highlighted evidence snippets, which recombine into an answer with a source chip. |
| Internship Radar | Only what is approved, shown with synthetic data. |
| Poly Predictor Kit | The token splits into two routes that never merge: market context to a summary, and comments to a category. |
| AI Visual Novel Creator | Story JSON brackets close into a scene frame that reveals the real screenshot. |
| PromptLock | A long row of chunks compresses into a token-budget bracket, showing which chunks are included and excluded. |

### Evidence available today (public)

- **Poly Predictor Kit:** public repository (five commit authors; Devpost lists six creators) describing a Chrome extension with three features: AI market insight from Polymarket's Gamma API via Gemini; a comment classifier (TF-IDF and logistic regression, labels Emotional, Rational and Spam) with Snowflake training; and a "steamroller" risk detector. The award is confirmed on the public Devpost page. Raimbek's part per the current site: market-summary and comment-classification pipelines.
- **AI Visual Novel Creator:** public repository (six contributors). Gemini story JSON is turned into Ren'Py scripts, with Stability AI scene images. Real screenshot from the public CodeDay showcase.
- **PromptLock:** public repository (two contributors). 2K/4K/8K/16K token budgets; Debug, Review, Build and Docs modes; transparency about what was included and excluded. The README links a live MCP endpoint, which responded on 2026-10-21.
- **JiraGenie:** public repository; Forge, Gemini and ElevenLabs speech-to-text.
- **R-Finance:** what is already public on the current site and résumé only: local YOLO inference, in-memory processing, API-key authentication, REST/OpenAPI documentation, Docker, a Kubernetes development environment via Helm, and a retrieval-based knowledge assistant with a chat interface and source-grounded answers.

### Content concerns

1. **No new visuals may be invented.** Diagrams are labeled as illustrations of real architecture. Any interface capture uses synthetic data and is labeled.
2. **Team projects need exact "my part" statements.** The site should state Raimbek's components and credit the team.
3. **Contribution wording differs between site and résumé** (notably PromptLock). Reconcile before publishing.
4. **Marketing claims in team READMEs are not evidence.** Do not repeat performance or savings claims that have not been measured.
5. **Internship Radar must be described exactly as built.** Its current status is stated plainly, with no deployment or feature claims beyond what is approved.
6. **R-Finance content needs company approval** for architecture detail, tool names, logo use and any demo capture.
7. **The Code Topology Lab maps a pre-redesign snapshot of this repository** and excludes private work by design. Refresh it or retire it.

---

## 7. Technology and motion architecture

### Decision

| Layer | Choice |
|---|---|
| Keep | React, TypeScript, Vite, plain CSS with design tokens |
| Upgrade (needs approval) | React 18.3 to 19.3 |
| Add, lazily (needs approval) | GSAP 3.15 |
| Native platform | View Transitions (same-document), CSS Motion Path, CSS transitions and `@property`, IntersectionObserver, ResizeObserver, `content-visibility` with `contain-intrinsic-size` |
| Build-time only | Prerender script (no dependency); font instancing and subsetting with fontTools (a one-time Python asset step) |
| Not now | Motion for React, three.js, React Three Fiber, OGL, Lenis, Lottie, Rive |

### GSAP 3.15 (recommended, lazy-loaded)

| | |
|---|---|
| **Why it is needed** | Signal Path needs a token that follows responsive SVG paths tied to scroll position, morphs between shapes with different point counts, and runs reversible multi-step timelines for Run and Trace back, consistently in Chrome, Safari and Firefox. |
| **Experiences it enables** | Token travel between modules (ScrollTrigger and MotionPathPlugin), token transformations (MorphSVGPlugin), path drawing (DrawSVGPlugin), Run and Trace back (timelines with labels and reversal), optional headline reveals (SplitText). |
| **Why CSS or existing code is not enough** | CSS scroll-driven animations are still not enabled by default in Firefox, so a JavaScript path is needed anyway. CSS cannot morph SVG paths with different point counts. CSS animations lack the labels, reversal and progress control that interactive step-through needs. WAAPI could do part of it, but only by rebuilding a small GSAP. |
| **Bundle size** (measured gzip) | Core 27.0 KB; with ScrollTrigger 44.0 KB; with ScrollTrigger, SplitText, MotionPath, MorphSVG and DrawSVG 62.4 KB. Never on the critical path. |
| **Runtime performance** | One `requestAnimationFrame` ticker animating transforms, opacity and SVG attributes. ScrollTrigger batches measurements and recalculates on resize. No pinning. `gsap.context()` handles React cleanup, including StrictMode double effects. |
| **Accessibility** | Scenes are registered inside `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`. SplitText's default `aria: "auto"` labels split text for screen readers. Animated SVGs are `aria-hidden`. Nothing traps scrolling. |
| **Mobile fallback** | At 600 px and below, or on low-power devices: a discrete mode with no scrubbing, token jumps between sections, and morphs of 300 ms or less. Reduced motion: fully static. |
| **Long-term maintenance** | Stable v3 API since 2019 and widely documented. Now free, including all plugins, under GSAP's standard no-charge license, which is not an OSI open-source license. One dependency, pinned to an exact version. |

### React 19.3 (recommended upgrade, not a new dependency)

| | |
|---|---|
| **Why it is needed** | `<ViewTransition>` became stable in React 19.3 (September 2026). It ties View Transitions to React rendering and Suspense, and the `react-dom/static` prerender APIs simplify static generation. |
| **Experience it enables** | Storyboard B: a module expanding into its project page, and reverse transitions on Back. |
| **Why the platform alone is not enough** | Calling `document.startViewTransition` directly works and is the fallback plan. React's integration avoids snapshot-timing bugs when state updates and rendering race. |
| **Bundle size** | Roughly the same as React 18. To be measured in Phase 3. |
| **Runtime performance** | No change expected; React handles the transition timing. |
| **Accessibility** | View Transitions do not change the accessibility tree. The router manages focus and route announcements. |
| **Mobile fallback** | Same-document View Transitions work in Safari 18+ and Firefox 144+. Elsewhere navigation is instant. |
| **Maintenance** | A one-time upgrade. Known fix: `useRef()` without an initial value (`TypeInterface.tsx:23`) needs an explicit argument under React 19 types. |

### Evaluated and not recommended

| Library | Measured gzip | Reason |
|---|---|---|
| Motion for React 14.5 | 30.5 KB (lazy core), 49.5 KB (full) | Excellent for declarative React and layout animation, but it overlaps with GSAP and View Transitions. Two animation engines mean double the mental model and the bytes. |
| three.js 0.186 | 129.1 KB for a minimal scene | No part of Signal Path needs 3D. GPU and battery cost plus accessibility overhead, with little meaning gained. |
| React Three Fiber 9 | Not measured (adds to three.js) | Requires React 19, and inherits the three.js reasoning. |
| OGL 1.0.11 | 12.4 KB | The right tool if one WebGL moment is ever justified. Not in v1. |
| Lenis 1.3 | 5.3 KB | Smooth scrolling replaces native scroll behavior, conflicting with the no-scroll-hijacking rule, find-in-page, anchors and OS settings. |
| Lottie and Rive | Not measured | Designer-authored animation pipelines. Here the motion is generated from real diagrams, so they add runtime and asset cost without benefit. |

### Motion system

- **Layers.** L0: static HTML and CSS (always present). L1: CSS micro-interactions (hover, focus, press, port LEDs). L2: lazy GSAP scenes. L3: none in v1.
- **Modes.** Full, discrete and static. Discrete applies at 600 px and below, with Save-Data, with `deviceMemory` of 4 or less plus a coarse pointer, or when a frame-time probe during the first travel exceeds 20 ms median. Static applies under reduced motion, without JavaScript, or after any scene error.
- **Tokens.** Durations of 120, 240, 400 and 700 ms. Easing: linear for travel, `cubic-bezier(.2,.8,.2,1)` to settle, `cubic-bezier(.16,1,.3,1)` for scenes. Scripted travel at about 900 px/s.
- **Orchestration.** One controller lazy-loads GSAP on idle or first intersection. Components export a scene setup that receives the element and mode and returns a cleanup. A failure falls back to static.
- **Rules:**
  - Animate only transform, opacity, `stroke-dashoffset` and `offset-distance`. No animated blur, shadows or layout.
  - One moving element at a time outside Run.
  - Never animate text being read.
  - Scroll-linked motion only in the gaps between modules.
  - Unprompted sequences last two seconds or less.
  - Nothing loops.

---

## 8. Performance and accessibility strategy

### Budgets for the home page's first visit (compressed transfer)

| Item | Budget | Today |
|---|---|---|
| HTML (prerendered) | ≤ 35 KB | 1.5 KB (empty client-rendered shell) |
| CSS | ≤ 30 KB | 8.4 KB |
| JavaScript, initial | ≤ 90 KB | 56.6 KB |
| Fonts | ≤ 110 KB, two families, cut to used axes and Latin | 24.0 KB |
| Images above the fold | ≤ 60 KB (ideally none) | 0 KB |
| Enhancement JavaScript (after first paint) | ≤ 75 KB | 3.3 KB (lazy hero) |
| **Total, excluding lazy project media** | **≤ 400 KB** | 94 KB |
| Project page, including media | ≤ 600 KB; video only on intent, never autoplayed under Save-Data | — |

### Core Web Vitals targets

Lab conditions: throttled mobile (4× CPU, 150 ms RTT, 1.6 Mbps), median of five runs.

| Metric | Lab target | Field target (p75) |
|---|---|---|
| LCP | ≤ 2.0 s | ≤ 2.5 s |
| CLS | ≤ 0.02 | ≤ 0.05 |
| INP | ≤ 150 ms on scripted interactions (menu, Run, Trace back, navigation) | ≤ 200 ms |
| TBT | ≤ 200 ms | — |
| Hydration long tasks | none over 100 ms | — |
| Animation smoothness | ≥ 55 fps during token travel on a mid-tier laptop and an iPhone 12-class phone; scrubbing switches off automatically on throttled Android | — |

### Measurement protocol

- Lighthouse mobile and desktop presets against the production preview build.
- The Chrome DevTools Protocol harness used for the audit, for cold loads, transfer sizes, LCP and CLS.
- Performance-panel traces for frame rate during token travel.
- Event Timing (`PerformanceObserver` on `event` entries) for INP on scripted interactions.
- A dependency-free script that checks gzip sizes of `dist/` assets against a `budgets.json` and fails the build when one is exceeded.
- There is no field data today (no analytics). Privacy-preserving field metrics are an open question.

### Accessibility (WCAG 2.2 AA)

- **Contrast and text:** AA contrast on every text pair; labels at least 13 px, body 16–18 px.
- **Structure:** one H1 per page, semantic landmarks, and a text alternative for every diagram (an ordered list or table).
- **Keyboard:** Run, Trace back, receipts and menus are operable by keyboard, with visible focus and no traps. The skip link stays.
- **Announcements:** results are announced in polite live regions. On navigation, focus moves to the H1 and the route change is announced.
- **Motion:**
  - `prefers-reduced-motion` gives a fully static, fully designed mode.
  - No unprompted animation runs longer than five seconds, so WCAG 2.2.2 is met by construction.
  - Nothing flashes more than three times per second.
- **Pointer and hover:** targets of at least 24×24 px (2.5.8). Probe and receipt popovers are dismissible and stay open on hover (1.4.13).
- **Reflow:** at 400% zoom, modules stack and diagrams scroll inside their own containers (1.4.10).
- **Testing:**
  - The audit harness: contrast, text sizes, target sizes, headings, anchors and a keyboard walk.
  - Manual VoiceOver passes on macOS and iOS for the key flows, and an NVDA pass if available.
  - Reduced-motion snapshots compared against static mode.

---

## 9. Components to preserve, reuse, simplify or rebuild

| Area | Decision | Notes |
|---|---|---|
| `.github/workflows/deploy.yml`, `public/CNAME`, custom domain | Preserve | Add the prerender step to the build. |
| Résumé PDF and its URL | Preserve | Re-sync once content is locked. |
| Skip link, native `<details>`, reduced-motion handling | Preserve | Patterns carry over. |
| Code-splitting for the Lab | Preserve | The same approach serves heavy figures. |
| `scripts/generate-topology.py` and `data/topology-cache` | Preserve | Refresh the pinned portfolio snapshot if the Lab stays. |
| JSON-LD, `robots.txt`, `sitemap.xml` | Reuse | Add routes and per-project structured data. |
| `src/data.ts` | Rebuild | Becomes the typed, slug-keyed registry (section 5). |
| `CodeTopologyLab` | Reuse | Restyle to the new identity, move to `/lab/code-topology/`. |
| `useOnceInView` | Simplify | One shared observer utility. |
| `index.css`, `TypeInterface.css`, `WorkChapters.css` (1,501 lines) | Simplify | Replace with tokens (about 10 colors, a 7-step type scale, a spacing scale), three or four breakpoints, no `!important`. |
| `TypeInterface`, `TypeCanvas`, `TypeLettering`, `ProjectWorld` | Rebuild | The new first screen, path and modules. The diagram content in `ProjectWorld` informs the new schematics. |
| `WorkChapters` | Rebuild | Becomes `ProjectModule` and a `CaseStudy` template. |
| `Experience` | Rebuild | Curated bullets instead of `bullets[0]`; links by slug. |
| `SiteHeader`, `Footer`, `Contact`, `Education`, `About`, `SkillStack` | Rebuild light | Same content, new system. Skills link to evidence. |
| Favicon, apple-touch-icon, Open Graph image | Rebuild | SVG and PNG icons in the new identity, plus per-page OG images. |
| `Honors.tsx`, `public/resume.html`, `output/pdf/`, `gh-pages` dependency and the `deploy` scripts, stale remote branches (`gh-pages`, `portfolio-v9-plus-lab`) | Retire later | Only with explicit approval; none removed in this phase. |
| `README.md` | Rewrite later | It currently describes an older, uncommitted state. |

---

## 10. Implementation phases

### Phase 1 (completed)

- Created branch `design/proof-signal` after verifying a clean tree and `main` = `origin/main` = remote (`2cdb64b`).
- Fixed the two mobile run-together sentences:
  - `src/type-interface/TypeInterface.tsx:39`: "and<br />" became "and <br />".
  - `src/components/WorkChapters.tsx:133`: "tools,<br />" became "tools, <br />".
- Added this plan.
- Verification: `npm run typecheck` passed, `npm run build` passed, `git diff --check` was clean. In headless Chromium, 390 and 360 px now read "AI, backend, and everything in between." and "Applied AI, analytical tools, and a little imagination." At 1440 px the intended line breaks are unchanged.

### Phase 2 · Content and evidence lock (2–3 days, needs answers to section 12)

- Resolve the open questions.
- Write final copy for flagships and secondaries.
- Collect approved assets (synthetic-data captures only).
- Build the typed registry with claim statuses and the publication denylist check.
- **Exit:** every rendered claim is verified with a source or is an explicit self-description, and Raimbek signs off on the copy.

### Phase 3 · Foundation (3–4 days)

- React 19.3 upgrade, if approved.
- Router and prerendering, routes, 404 page, `?lab=` redirect.
- Design tokens; font pipeline (instanced, subset, preloaded, metric fallbacks); base layout, header and navigation; focus management and route announcer.
- **Exit:** all routes prerendered, CLS 0, budgets met, the site readable without JavaScript.

### Phase 4 · Static Signal Path (4–5 days)

- First screen and patch bay, modules, static path, case-study template, and the remaining home sections.
- **Exit:** a complete site with no animation library. **This is a launchable checkpoint.**

### Phase 5 · Motion layer (5–7 days)

- Lazy GSAP chunk; storyboard A; token travel; per-project transformations; storyboard B; probe; full, discrete and static modes.
- **Exit:**
  - Matches the storyboards.
  - INP ≤ 150 ms in the lab.
  - The reduced-motion snapshot equals the static mode.
  - No scroll hijacking.
  - 55 fps on target devices.

### Phase 6 · Interactive visualization (3–5 days)

- Trace back for all flagships, and storyboard C level 1.
- Level 2 (live classifier) only if approved, with parity tests.
- **Exit:** keyboard and screen-reader operable, results announced, parity tests green (if level 2).

### Phase 7 · Lab and polish (2–3 days)

- Restyle the Lab and refresh its snapshot.
- Per-page OG images, favicon set, README rewrite, approved dead-code removal.
- Full QA matrix.
- **Exit:** section 11 passes.

### Phase 8 · Launch (needs explicit approval)

- Review the branch as a pull request, check a preview, then merge and deploy.
- Nothing is committed, pushed or deployed without approval.

Focused effort for phases 2–7 is about 19–27 working days. Phase 4 can ship on its own if recruiting timing calls for it.

---

## 11. Acceptance criteria

1. **Recruiter test:** name, role, internship target, résumé link and email are visible on the first screen at 360, 390, 768, 1024, 1440 and 1920 px without interaction.
2. **Content integrity:** no pending claim renders; the publication denylist check passes; no private-repository or company-confidential detail appears in `dist/` or the repository.
3. **Static completeness:** with JavaScript disabled, all content and navigation work. With reduced motion, the site is static and fully designed.
4. **Performance:** the budgets and Core Web Vitals lab targets in section 8 are met on the production build.
5. **Accessibility:** WCAG 2.2 AA checks pass, the keyboard walk covers every interactive element, and the VoiceOver pass completes the key flows.
6. **Motion quality:** the storyboards are implemented as written, with no scroll hijacking, no animation blocking input, and 55 fps or better on target devices.
7. **Engineering hygiene:** typecheck, build, `git diff --check`, unit tests for content selectors (and classifier parity if level 2), and the size-budget check all pass.
8. **Compatibility:** Chrome, Safari and Firefox current versions; iOS Safari and Android Chrome; old anchors and `/?lab=code-topology` still land.

---

## 12. Unresolved publication questions

1. Which concept is approved: Signal Path, or a different choice?
2. The knowledge assistant's public name. The current site says "Arfi"; the public résumé and GitHub profile say "rAIm". Which is correct, and may it be named publicly?
3. The company's public name: "R-Finance" or another spelling? May its name and logo appear?
4. The vehicle-photo validation results stay unpublished. Will they be authorized later?
5. May the quarter-turn inference fallback, already described on the public résumé, be shown in a diagram?
6. What level of R-Finance architecture detail is approved, and may a synthetic-data demo of the knowledge assistant be recorded?
7. Internship Radar:
   - Should it be published at all, and at what scope?
   - Are synthetic-data screenshots allowed?
   - Does the repository stay private?
   - Which status wording is accurate?
   - Do the data sources' terms permit describing them?
8. Poly Predictor Kit:
   - Which components exactly were Raimbek's?
   - May the team's public classifier be exported for in-browser inference, with the team's consent?
   - Should the examples be synthetic or real public comments?
9. AI Visual Novel Creator:
   - What is the award's exact title?
   - What was Raimbek's exact part?
   - Does the team consent to featuring the screenshot?
10. PromptLock: which contribution wording is accurate, and may the live MCP endpoint be described as deployed?
11. JiraGenie: keep it as an archive entry?
12. Skills: which résumé-only skills should the site list? Only those Raimbek would defend in an interview.
13. Code Topology Lab: refresh, fold into project pages, or retire?
14. The public résumé PDF includes a phone number. Keep it?
15. Privacy-preserving field metrics: wanted, or none?
16. Approve a React 19.3 upgrade and GSAP 3.15 as the only new runtime dependency?

---

## Appendix: measurements and sources

### Library sizes

Measured 2026-10-21 by bundling each package with esbuild (minified ESM, tree-shaken, React external) and compressing with gzip -9. Packages were downloaded into a scratch directory; nothing was installed in this project.

| Bundle | Minified | gzip |
|---|---|---|
| gsap 3.15.0 core | 69.0 KB | 27.0 KB |
| + ScrollTrigger | 112.5 KB | 44.0 KB |
| + SplitText | 76.3 KB | 29.9 KB |
| + DrawSVGPlugin | 73.1 KB | 28.6 KB |
| + MorphSVGPlugin | 89.4 KB | 35.6 KB |
| + MotionPathPlugin | 89.9 KB | 35.5 KB |
| + Flip | 93.6 KB | 35.5 KB |
| Core + ScrollTrigger + SplitText + MotionPath + MorphSVG + DrawSVG | 157.6 KB | 62.4 KB |
| motion 14.5.0 (`motion/react` LazyMotion + domAnimation + m) | 84.5 KB | 30.5 KB |
| motion 14.5.0 (`motion/react` motion, AnimatePresence, useScroll, useTransform) | 145.0 KB | 49.5 KB |
| motion 14.5.0 (`motion/mini` animate) | 8.2 KB | 3.3 KB |
| three 0.186.1 (renderer, scene, camera, mesh, plane, shader material) | 517.4 KB | 129.1 KB |
| ogl 1.0.11 (renderer, program, mesh, triangle) | 43.3 KB | 12.4 KB |
| lenis 1.3.27 | 18.3 KB | 5.3 KB |

### Font sizes

Latin-subset woff2 files from Google Fonts as served on 2026-10-21, with full variable axes, before instancing.

| Family (axes) | Size |
|---|---|
| Newsreader (ital, opsz, wght) | 272.4 KB (roman 128.8, italic 143.6) |
| Archivo (wdth, wght) | 88.0 KB |
| Instrument Sans (wdth, wght) | 55.8 KB |
| JetBrains Mono (wght) | 39.5 KB |
| Martian Mono (wdth, wght) | 37.5 KB |
| Manrope (wght), current | 24.0 KB |

### Platform support, as found on 2026-10-21

| Feature | Support |
|---|---|
| CSS scroll-driven animations | Chrome and Edge since July 2023 and Safari since September 2025. Firefox is still behind a flag and is an Interop 2026 target. Sources: [drweb.de](https://www.drweb.de/css-scroll-animationen-ohne-javascript/), [Mozilla Connect](https://connect.mozilla.org/t5/ideas/implement-css-scroll-driven-animations-animation-timeline/idc-p/119840) |
| Same-document View Transitions | Chrome, Edge, Safari 18+ and Firefox 144+ (Level 1). Sources: [caniuse](https://caniuse.com/cross-document-view-transitions) (Level 1 notes), [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions) |
| Cross-document View Transitions | Chrome and Edge 126+ and Safari 18.2+. Firefox has no default support yet. Sources: [caniuse](https://caniuse.com/cross-document-view-transitions), [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions) |
| GSAP licensing | GSAP, including SplitText, MorphSVG and the other plugins, is free for commercial use under GSAP's standard license. Source: [gsap 3.15.0 README](https://cdn.jsdelivr.net/npm/gsap@3.15.0/README.md) |
| React `<ViewTransition>` | Stable in React 19.3. Source: [React 19.3 release post](https://react.dev/blog/2026/09/09/react-19-3) |

### Current site baseline (from the October 2026 audit)

- 94 KB transferred over six requests.
- LCP about 1.05 s on throttled mobile and 0.30 s on desktop.
- CLS 0.
- No WCAG AA contrast failures.
- 56–63 text elements below 12 px.
- 101 unique hex colors and 56 font-size values in source.
