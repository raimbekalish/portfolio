# Phase 3 · Signal Path preview

Status: Phases 3 and 3.5 approved; Phase 4 continues in [phase-4-full-portfolio.md](phase-4-full-portfolio.md) · Branch: `design/proof-signal` · Date: 2026-10-22
Related: [creative plan](creative-portfolio-plan.md) · [content evidence ledger](content-evidence-ledger.md) · [Phase 2 review](phase-2-prototype-review.md)

## Summary

The approved direction, Editorial Instrument's system with Cinematic Signal's opening, is now a working preview inside the real app at `/?preview=signal-path`. It has a header, a hero, one featured project (Poly Predictor Kit) and a footer. The homepage at `/` and the Code Topology Lab at `/?lab=code-topology` are unchanged; their renders are pixel-identical to the baseline.

## View it locally

```sh
npm run build && npm run preview     # then open http://localhost:4173/?preview=signal-path
# or, during development:
npm run dev                          # then open http://localhost:5173/?preview=signal-path
```

## What was built

| File | Role |
|---|---|
| `src/App.tsx` | Adds the `?preview=signal-path` route as a lazy chunk, beside the existing `?lab=` route |
| `index.html` | A small inline script that runs only on the preview URL. It paints paper from the first frame (no dark flash) and preloads the preview fonts. It does nothing on any other URL |
| `src/data.ts` | Additive fields only: `profile.statement`, `profile.availability`, project `slug`s, and Poly Predictor Kit's `team` and verified `recognition` |
| `src/systems.ts` | Poly Predictor Kit's architecture as input → system → outcome lanes, from the public README, with each lane marked as my part or the team's. It is a separate module so only the preview loads it |
| `src/signal-path/SignalPathPreview.tsx` | Page shell: preview-only document state (paper, title, `noindex`, theme colour), the rail overlay and the footer |
| `src/signal-path/Hero.tsx` | Ruler, crop marks, the name, statement, recruiter facts and actions |
| `src/signal-path/useSignalPath.ts` | Measures the layout and runs the opening with the Web Animations API |
| `src/signal-path/geometry.ts` | Glyph measurement, the square wave, rail routing and path helpers |
| `src/signal-path/motion.ts` | Motion tokens and helpers |
| `src/signal-path/FeaturedProject.tsx`, `SystemDiagram.tsx` | The featured project and its dark system diagram |
| `src/signal-path/SiteBar.tsx`, `content.ts` | Header; selectors that read every fact from the content model |
| `src/signal-path/signal-path.css` | All styles, scoped to `.sp`, in the preview's own lazily loaded stylesheet |
| `public/fonts/` | Instrument Sans (variable, Latin), Instrument Serif Italic and Martian Mono subsets, with their OFL licenses |

No dependency was added or upgraded.

## Design

- **Hero.** A 12-column paper grid with a ruler and crop marks. The name is fitted by a CSS formula so "Raimbek" spans exactly columns 1–8 (measured within 0.1 px at 1366 and 1440). "Alish." is right-aligned beneath it, and the statement locks into the space to its left with baselines aligned. The recruiter facts (studying, graduating, availability) sit in columns 10–12, and résumé, GitHub and email sit below. On phones everything stacks and all of it stays on the first screen.
- **Opening (3.35 s, once per load).**
  - 0–0.22 s: the name is drafted in pencil (3.2:1, already readable) and every fact and link is usable.
  - 0.22–1.67 s: a signal enters from the margin, runs a square wave through the letter gaps of both lines, and the ink bleeds in behind it through a soft edge. Each ruler number darkens as the signal passes.
  - 1.67–1.93 s: the signal lands and becomes the mint period.
  - 2.07–3.33 s: the period sends a pulse down a rail, between the project title and its award, into the system diagram's port.

  Any pointer, key, wheel or touch input ends the opening at once. Reduced motion, deep links and back/forward returns skip it.
- **Featured project.** The project's title, verified award ("Winner, Polymarket Track — QuackHacks 2025", linked to Devpost), "Team project", source and Devpost links, problem and contribution. Below them is a dark instrument panel: the signal enters at the port, a bus fans out into three lanes (input → system → outcome), and a "Whole system / My part" toggle highlights my two pipelines and dims the team's. The diagram draws itself once when scrolled into view.
- **Kerning is preserved.** The name is one real text node per line. During the opening its ink is a gradient clipped to the letters, so the heading contains "Raimbek Alish" exactly once and there are no per-letter spans.

### Motion tokens

| Token | Value |
|---|---|
| Durations | feedback 160 ms · short 260 · medium 440 · write 1450 · rail 820 · lane 620 · pulse 540 |
| Easing | standard `cubic-bezier(.2,0,0,1)` · out `(.16,1,.3,1)` · draw `(.65,0,.35,1)` · land `(.34,1.4,.64,1)` |
| Delays | start 220 ms · rail 140 ms after landing |
| Stagger | lanes 140 ms · stations 120 ms |
| Reduced motion | the final composition is rendered directly; no animation is created |

## QA (headless Chromium on the production build, plus headless Firefox 155)

| Check | Result |
|---|---|
| First screen at 360, 390, 768, 1366 and 1440 shows the name, positioning, study, graduation, availability, résumé, GitHub and email | Pass at all five |
| Horizontal overflow, clipped headings | None |
| WCAG AA text contrast, text under 12 px, targets under 24 px | 0, 0, 0 |
| Rail clearance (sampled against every text block) | 0 intersections; straight on desktop, margin route on tablet and phone |
| Opening smoothness at 1× and 4× CPU (rAF deltas) | 60 fps, p95 16.8 ms, 0 frames over 20 ms, 0 long tasks |
| Layout shift during load and opening | 0 |
| Keyboard | 18 stops, each with a visible focus ring; skip link lands on the project |
| Interrupting the opening (Tab, wheel) | Final state immediately; native scroll works |
| Toggle by mouse and by touch | Works; announced through a live region; worst interaction 16 ms at 4× CPU |
| Back/forward | An in-page anchor and back keep state; returning from another page skips the opening |
| Fonts blocked | The opening is skipped; metric-matched fallbacks render with no overflow |
| Firefox 155 (headless) | Same type size, fit, routes and opening; heading text clean |

Not tested: Safari or WebKit (`safaridriver` needs a one-time permission from the owner), and real phones.

## Performance (lab, not real-user data)

Production builds served locally; cold cache; five runs, median. Mobile lab: 412 × 823 at 1.75×, 4× CPU, 150 ms RTT, 1.6 Mbps down. Desktop lab: 1350 × 940, 40 ms RTT, 10 Mbps. Sizes are KB of 1,024 bytes. The prototypes load their fonts from Google Fonts over the same throttled connection.

| Target | LCP mobile | LCP desktop | CLS | Transfer | Fonts | Scripts |
|---|---|---|---|---|---|---|
| Original homepage | 1.00 s | 0.27 s | 0 | 94.0 KB | 24.3 | 59.3 |
| Current homepage | 1.00 s | 0.26 s | 0 | 94.6 KB | 24.3 | 59.5 |
| Signal Path preview | 1.35 s | 0.30 s | 0 | 163.3 KB | 84.2 | 64.4 |
| Prototype A | 0.74 s | 0.20 s | 0.0008 | 152.5 KB | 94.8 | 50.5 |
| Prototype B | 1.14 s | 0.31 s | 0.0005 | 112.4 KB | 54.3 | 51.2 |

- Targets met: LCP under 2.5 s, CLS under 0.05, interaction under 200 ms (16 ms worst, a lab proxy for INP).
- The preview is slower than the prototypes because its chunk is requested only after the homepage bundle (56 KB) loads, and it also downloads the homepage's Manrope preload (24.3 KB), which it does not use. Both disappear once the redesign becomes the homepage.
- Preview-only code: 8.3 KB JS and 4.2 KB CSS (gzip). The homepage bundle grows by 0.24 KB gzip for the route and content fields; its stylesheet is byte-identical.
- One earlier comparison run failed: a mobile load timed out after 60 s. The macOS power log shows the machine sleeping during a later stalled run, and the same load in isolation fires its load event at 1.1 s. The script now records failed runs instead of aborting; the final pass completed all 60 runs with no failures.

## Regression

The homepage (full page at all five widths) and the Code Topology Lab (two widths) are pixel-identical to a clean baseline build, with identical links, anchors, ids, headings, stylesheets and backgrounds. `npm run typecheck`, `npm run build` and `git diff --check` pass. The project has no automated test suite.

## Phase 3.5 · visual review and hero polish

Review page: private Claude artifact, plus a local copy at `tmp/signal-path-preview/phase-3-5/review/index.html` (gitignored). Captures and reports: `tmp/signal-path-preview/phase-3-5/`.

| Change | Why |
|---|---|
| The featured project opens as a full-bleed dark stage directly under the hero | Its edge, the port, the title and the award now sit in the first screen at 1366 × 768 and 1440 × 900 without shrinking the name |
| The rail ends at a port on the stage's top edge; the signal continues into the diagram as part of its draw-on | The opening's final beat happens inside the viewport |
| Phones use a 1.15 s write (desktop 1.45 s), and the rail is timed by its length | Phone opening 2.68 s, desktop 2.85 s (was 3.35 s); the port is visible when the opening ends at every tested size |
| The opening plays once per browsing session (`sessionStorage`, per tab) | Reloads, return visits and back/forward show the finished hero; the diagram's draw-on follows the same rule |
| Replay control beside the actions | Keyboard reachable with a visible ring; not rendered with reduced motion; any input still ends a replay |
| "Winner, Polymarket Track — QuackHacks 2025" on the homepage too; "Team of five" removed | Devpost states "Winner"; it lists six creators while the repository shows five commit authors, so no head count is claimed |
| The port and pulse render only once placed | The port now sits in the first screen; this keeps layout shift at 0 |
| Trailing whitespace stripped from the copied OFL texts | Clean whitespace checks; license wording unchanged |

Results on the production build:
- **Lab LCP:** 1.38 s on the mobile profile and 0.30 s on desktop.
- **Stability:** CLS 0, and 0 frames over 20 ms at 1× and 4× CPU.
- **First screens:** every fact and link, plus the stage port, are visible at 360, 390, 768, 1366 and 1440.
- **Text and keyboard:** no contrast failures; every keyboard stop shows a visible ring.
- **Session behaviour:** session, reload, back/forward and replay checks pass.
- **Reduced motion:** renders the finished composition with no Replay control.
- **Firefox 155 (headless):** matches.
- **Regression:** the Code Topology Lab is pixel-identical. The homepage differs only in the one award line, with identical page heights, links and ids.

## Known limitations

- Untested in Safari and on real devices; all performance numbers are lab measurements.
- "Once per session" is per tab, as `sessionStorage` is; a new tab plays the opening again.
- The preview still downloads the homepage's Manrope preload and loads its chunk after the homepage bundle; both go away when the redesign becomes the homepage.
