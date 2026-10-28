# Signal Path hero prototypes (Phase 2)

Two isolated, working hero prototypes for the redesign. They are **not** part of the production site: nothing here is imported by `src/`, the root `index.html`, the root `vite.config.ts` or the GitHub Pages build.

| | Prototype | Idea |
|---|---|---|
| A | `editorial-instrument/` | Warm editorial grid, monumental mixed-case name, print crop marks and column ruler, a near-black instrument panel. The mint period emits a signal into the panel; choosing a project re-routes it. |
| B | `cinematic-signal/` | A dark stage. A square-wave signal weaves behind a monumental two-line name and fills each letter as it passes, lands as the mint period, then branches to project terminals. Selecting a terminal opens a preview through a native View Transition. |

## Run

From the repository root, using only the existing dependencies:

```sh
npx vite --config experiments/hero-prototypes/vite.config.ts
# → http://127.0.0.1:5199/            index
# → http://127.0.0.1:5199/editorial-instrument/
# → http://127.0.0.1:5199/cinematic-signal/
```

Production-mode build (written to the gitignored `tmp/hero-prototypes-dist/`) and preview:

```sh
npx vite build --config experiments/hero-prototypes/vite.config.ts
npx vite preview --config experiments/hero-prototypes/vite.config.ts   # → http://127.0.0.1:5198/
```

Typecheck (separate from the production `npm run typecheck`, which covers `src/` only):

```sh
npx tsc -p experiments/hero-prototypes/tsconfig.json
```

## What they use

- React 18 and Vite from the existing install; no new packages, no GSAP, no WebGL.
- Motion through CSS keyframes, the Web Animations API, SVG and `requestAnimationFrame`; native View Transitions and `<dialog>` in B.
- Fonts from Google Fonts **for prototyping only**: Instrument Sans, Instrument Serif and Martian Mono (A); Archivo, Instrument Sans and Martian Mono (B). Production would self-host trimmed Latin subsets with metric-matched fallbacks.
- Content from `shared/content.ts`, keyed by slug and limited to claims marked publishable in `docs/content-evidence-ledger.md`.

## Behavior guarantees

- Name, study, graduation, availability, résumé, GitHub and email are on the first screen at 390, 768, 1366 and 1440 px, and readable without interacting.
- `prefers-reduced-motion` renders the final composition immediately, with no running animations.
- Scrolling is native; nothing pins or captures the wheel.
- All controls are real links and buttons with visible focus. A's panel has a live text description; B's preview is a native modal dialog that returns focus on close.
- Interacting during an opening ends it immediately.

## Known prototype limits

- Client-rendered: nothing shows before JavaScript runs. Production would prerender this HTML.
- B keeps its stage invisible until fonts load (at most 1.2 s) to avoid a font-swap layout shift. A keeps its letters hidden for the same window before they rise in.
- Per-letter spans in A disable kerning between letters of the name.
- Links to case studies are placeholders.

QA captures (screenshots, opening videos, metrics) are written to the gitignored `tmp/hero-prototypes/captures/`. The review is in `docs/phase-2-prototype-review.md`.
