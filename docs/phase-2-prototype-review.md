# Phase 2 · hero prototype review

Status: awaiting approval · Branch: `design/proof-signal` · Date: 2026-10-21
Related: [creative plan](creative-portfolio-plan.md) · [content evidence ledger](content-evidence-ledger.md) · [prototypes](../experiments/hero-prototypes/README.md)

## Summary

Two working Signal Path hero prototypes were built in isolation and tested in a real browser at 390, 768, 1366 and 1440 px.

- **A · Editorial Instrument** is the stronger system: clearer for recruiters, more credible to engineers, better for long-form reading, and easier to extend into a whole site.
- **B · Cinematic Signal** has the stronger signature moment: a signal writes the name and lands as the mint period.

**Recommendation:** combine them deliberately, as *A's system with B's signal*. Rebuild B's opening on A's paper, keep A's grid, typography, facts and instrument panels, and reserve darkness for the instruments and project stages. Neither prototype needed an animation library.

## How the prototypes were built

- Both live under `experiments/hero-prototypes/`, with a separate Vite config, their own typecheck, and builds written to the gitignored `tmp/`.
- They use only the existing React 18 and Vite install. Motion runs on CSS keyframes, the Web Animations API, SVG, `requestAnimationFrame`, native View Transitions and `<dialog>`.
- Copy comes from a slug-keyed content module limited to publishable claims in the ledger.
- Nothing in `src/`, the root `index.html`, the production build or the deploy workflow changed in this phase.

## QA method and results

Method:

- **Setup:** production builds served locally, headless Chromium driven over the DevTools Protocol, cold cache.
- **Mobile profile:** 412 × 823 at 1.75×, 4× CPU slowdown, 150 ms RTT, 1.6 Mbps down / 750 kbps up.
- **Desktop profile:** 1350 × 940, 40 ms RTT, 10 Mbps.
- **Runs:** load metrics are the median of three.
- **Opening smoothness:** `requestAnimationFrame` deltas over the first 4 s of the opening, at 1× and 4× CPU.
- **Interaction latency:** the longest Event Timing duration across scripted clicks and key presses at 4× CPU, a lab proxy for INP.
- **Captures:** stills, keyboard walks, reduced-motion renders and opening videos are in `tmp/hero-prototypes/captures/` (gitignored).
- **Units:** sizes are in KB of 1,024 bytes. Vite's build log reports kB of 1,000 bytes, so it prints slightly larger numbers.

| Check | A · Editorial Instrument | B · Cinematic Signal |
|---|---|---|
| First screen at 390 / 768 / 1366 / 1440 shows name, study, graduation, availability, résumé, GitHub, email | Yes, all four widths (inspected) | Yes, all four widths (inspected) |
| Horizontal overflow | None | None |
| WCAG AA contrast failures | 0 | 0 |
| Text under 12 px / targets under 24 px | 0 / 0 | 0 / 0 |
| Keyboard: every stop has a visible focus ring | Yes | Yes; preview dialog traps focus, closes on Escape, returns focus |
| Reduced motion | Final composition immediately, 0 running animations | Final composition immediately, 0 running animations |
| Native scrolling (real wheel input) | Yes | Yes |
| Opening smoothness at 1× and 4× CPU | 60 fps, p95 16.8 ms, 0 frames over 20 ms, 0 long tasks | 60 fps, p95 16.8 ms, 0 frames over 20 ms, 0 long tasks |
| LCP, mobile lab / desktop lab | 0.76 s / 0.19 s | 1.14 s / 0.29 s |
| CLS, worst observed | 0.0008 | 0.016 (fonts arriving after the 1.2 s cap on slow 4G) |
| Worst interaction, 4× CPU | 24 ms | 56 ms (opening the preview with a View Transition) |
| Transfer, first visit | 153 KB (fonts 95, JS 51, CSS 6) | 112 KB (fonts 54, JS 51, CSS 6) |
| Prototype-specific JS + CSS, gzip | 3.3 + 4.0 KB | 3.9 + 3.6 KB |

Defects found and fixed during QA:

1. Layout shift from A's panel growing when its lanes mounted. They now render from the first frame.
2. Layout shift from B's display-font swap. The stage stays invisible until fonts load, capped at 1.2 s.
3. B's waveform collapsed to a single edge. Edges now come from the letter gaps of both lines.
4. B's name was clipped at 390 px.
5. B's branches crossed the buttons on narrow screens. They now use a margin rail.
6. B hid study and graduation on phones.
7. A's name leading broke on wide screens.
8. A's signal elbowed arbitrarily. It now runs straight into a port.
9. Two targets were under 24 px, and one label was 11.5 px.

## Comparison

| Criterion | Edge | A · Editorial Instrument | B · Cinematic Signal |
|---|---|---|---|
| First impression | B | Composed and confident; reads as a designer-engineer within a second. Little drama. | The strongest moment of the two: the name is written by a signal that becomes the period. Memorable in five seconds. |
| Originality | Even | A distinctive fusion of print production marks (crop marks, registration, column ruler) and an instrument panel. But "editorial grid plus serif italic" is a known studio look, and the registration ghost is too subtle for most visitors to notice. | A waveform weaving behind letters, with a blueprint outline offset in depth, is unusual. At a glance, though, dark plus mint plus giant uppercase reads like the familiar dark developer portfolio. |
| Typography | A | Best hierarchy: mixed-case Instrument Sans with tight leading and one serif italic accent. Per-letter spans lose kerning. | Monumental Archivo against small mono labels creates real tension. Uppercase loses some personality, and identity facts are small mono text. |
| Layout sophistication | Even | A strict 12-column grid; the panel is locked to the name's second line with subgrid; the ruler tracks the pointer's column. | An asymmetric two-line monument with the statement tucked beside the second line; terminals read as channel labels, not cards. |
| Animation quality | B | Precise and causal: the period lands, the signal reaches a port, the panel powers on from that side. Restrained to a fault. | The most spectacular, built as one synchronized system: the head, scan front, fills and trace all derive from a single path. The project preview's View Transition is cinematic. |
| Recruiter clarity | A | Strongest: labeled Studying, Graduating and Available fields, clear buttons, and a project index with outcomes, all visible at once. | Good: every fact is visible in the identity bar, but smaller and less scannable, and the name dominates. |
| Engineering credibility | A | Strongest: an always-visible input → system → outcome panel for each project, re-routed on hover or focus. | Good: the waveform is a metaphor; real system detail sits one click away in the preview. |
| Mobile experience | A | Good: the panel stacks and the signal runs in the margin. Long scroll. | Good after fixes, but the name shrinks to about 72 px and the opening loses most of its impact. |
| Accessibility | A | Passes the checks above. The panel has a live text description. | Passes the checks above, with a native modal dialog. The stage stays invisible for up to 1.2 s while fonts load. |
| Performance | A | Heavier fonts (three families). Fastest LCP. | Lighter fonts. Slower LCP, because the largest element fills in late. |
| Expansion to a full portfolio | A | Highest: the panel-and-index pattern scales into case-study figures, experience and skills, and paper suits long reading. | Strong for the hero and project transitions; a dark monumental system tires the reader across long sections. |

B leads on first impression and animation, the two criteria about the opening moment. A leads on the criteria that decide whether the whole site works: typography, recruiter clarity, engineering credibility, mobile, accessibility, performance and expansion. That split is the basis of the recommendation below.

## Where each one is generic

- **A** risks reading as an elegant template plus a dashboard widget.
  - The panel's labeled boxes and arrows are the least bespoke part of either prototype.
  - Rising letters are a common opening.
  - The registration ghost carries the idea but is nearly invisible.
- **B** risks reading as a dark developer portfolio.
  - The graticule reads as a generic tech grid.
  - The full-height scan bar reads as a loading indicator.
  - The waveform and the blueprint offset are what make it bespoke; without them it would be generic.

## Recommendation: A's system, B's signal

Keep from A:

- the paper editorial grid
- Instrument Sans, one Instrument Serif accent, and Martian Mono labels
- labeled recruiter facts
- the project index
- the instrument panel as the figure language for case studies

Keep from B:

1. **The opening mechanism.** A square-wave signal writes the name and lands as the mint period, rebuilt on paper: outline letters in rule color, ink fill, and a signal with an ink core, because mint alone is 1.1:1 on paper. A's straight trunk then carries it into the panel. This replaces A's rising letters.
2. **The shared-element View Transition** from a project entry into its panel and page.
3. **Darkness as contrast**, reserved for instruments and the full-screen project stage, which is where B's depth works best.

Drop:

- B's full-page dark hero, scan bar and graticule
- A's hover registration ghost, whose meaning is unclear

Validate in Phase 3 before committing:

- legibility of the signal and of outline letters on paper at 390 px
- whether the waveform still reads at mobile sizes
- one complete project-page transition, measured against the same budgets

**Alternative:** if you prefer drama over calm, use B's dark hero above A's paper body. It is viable, but it sits closer to the dark-portfolio cliché and splits the site into two visual worlds.

## Technical architecture proposal (not implemented)

| Area | Proposal |
|---|---|
| Project data | A slug-keyed `Record<ProjectSlug, Project>` with an explicit `featured` order, replacing index-based selection. `experiments/hero-prototypes/shared/content.ts` already uses this shape. Every claim carries a ledger status; render props accept only verified or self-reported claims. |
| Routing | Hybrid: `/`, `/work/<slug>/` for flagships, `/lab/code-topology/` (old `/?lab=` links redirect client-side), and a custom 404. |
| Static prerendering | A Vite SSR build of a server entry plus a small `scripts/prerender.mjs` that writes `dist/<route>/index.html` with a per-route title, description, canonical URL, Open Graph tags and JSON-LD. The client hydrates. No new dependency (`react-dom/server`, or `react-dom/static` after the upgrade). |
| React 19.3 migration | Bump `react`, `react-dom` and `@types/react*`. Fix `useRef()` without an initial value (`TypeInterface.tsx:23`). Re-check StrictMode effects. `lucide-react` 0.460's peer range already admits React 19 (verified). Risk: low, gated by typecheck and visual QA. |
| GSAP | **Defer.** The signature effects ran at 60 fps with about 4 KB of motion code each and no library. Add GSAP (44 KB gzip with ScrollTrigger, measured) only if Phase 3 needs scroll-scrubbed sequences that must work in Firefox, which still lacks CSS scroll timelines by default, or complex reversible timelines. If added, load it lazily. |
| View Transitions | Same-document transitions are supported in Chrome 111+, Safari 18+ and Firefox 144+. Use React 19.3 `<ViewTransition>` for route changes. B shows that native `<dialog>` plus a View Transition works. |
| Shared project transitions | One naming scheme, `vt-<slug>-frame` and `vt-<slug>-title`. A name exists on exactly one element at a time: it is set on the source just before navigation and is static on the destination hero. Reduced motion or no support means an instant swap. Focus moves to the H1 and the document title updates. |
| Progressive enhancement | Prerendered HTML is the final state. A tiny inline script sets `html[data-motion]` (full or static) before first paint, so nothing flashes. The motion module loads lazily. An opening plays once per session (`sessionStorage`, wrapped in try/catch), and any interaction ends it. Self-hosted, preloaded fonts with `size-adjust` fallbacks remove the need for any hidden phase. |
| Reduced motion | The CSS media query plus a live `matchMedia` listener render the static final state: View Transitions, parallax and openings are off, and nothing loops. |
| Content verification guards | The ledger is the source of truth. A unit test fails if a rendered claim is pending or restricted. A build step scans `dist/` for a denylist of restricted values and private names and fails CI on any match. |
| Dependencies and risks | Only the React 19.3 upgrade is proposed (with types). Fonts are OFL and self-hosted. GSAP stays optional. The Vite 5 dev-tool advisories are unchanged and never ship to the browser. |

## Performance budgets

Budgets are for the home page's first visit, measured with the method above. Prototype results are shown for comparison.

| Metric | Budget | A | B |
|---|---|---|---|
| Total transfer (excluding lazily loaded project media) | ≤ 300 KB | 153 KB | 112 KB |
| Fonts | ≤ 100 KB, at most two families after subsetting | 95 KB | 54 KB |
| Initial JS (React + app) | ≤ 90 KB | 51 KB | 51 KB |
| Hero component JS, including all motion | ≤ 15 KB | 3.3 KB | 3.9 KB |
| LCP, mobile lab | ≤ 1.5 s | 0.76 s | 1.14 s |
| CLS, mobile lab | ≤ 0.02 | 0.0008 | 0.016 |
| Worst interaction latency at 4× CPU | ≤ 150 ms | 24 ms | 56 ms |
| Opening frames over 33 ms at 4× CPU | 0 | 0 | 0 |
| Long tasks during the opening | 0 | 0 | 0 |

Release gates should rerun these with five runs instead of three, on real mid-range Android and iOS devices as well as in headless Chromium, which cannot measure GPU compositing.

## Security note

A potentially exposed credential was reported in a third-party team repository associated with one project (see ledger 4.4). The credential's owner must rotate or revoke it and inspect recent API usage. This is outside this repository, and nothing was changed in that repository.

## Verification

See the Phase 2 report for the final `git status` and command results. Nothing in this phase was committed, pushed, merged or deployed.

## Decisions needed before Phase 3

1. Approve "A's system, B's signal", or choose A, B, or the dark-hero alternative.
2. Resolve the ledger's open decisions, especially the company display name, the assistant name, Internship Radar's scope and PromptLock's contribution wording.
3. Approve the React 19.3 upgrade and self-hosted fonts. Keep GSAP deferred unless Phase 3 proves a need.
