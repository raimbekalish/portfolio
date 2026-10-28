# Faultline case study · design specification

Status: specification written in Phase 5E; built in Phase 5F at `/work/faultline/` · Date: 2026-10-28
Related: [content evidence ledger](content-evidence-ledger.md) (section 4.6c, decision 13) · [Phase 5E report](phase-5e.md) · [Phase 5F report](phase-5f.md) · [release steps](release-indexing.md)

The homepage already shows Faultline as a recorder strip with four stages. A standalone case study would explain the project in more depth, with one signature interaction. This document specifies it. Every fact must come from the public repository at main `a7d48f0` or the v0.1.0 release, as audited in the ledger.

> **As built (Phase 5F).** The eleven chapters below were merged into six, as the Phase 5F brief asked: a controlled experiment; where the deadline cuts; recovery, cleanup and traces; history, dashboard and evidence; what ships; what the record shows. The hero shows both recorded runs on one millisecond ruler. The signature interaction became a four-lane timing diagram of one request (runner, frontend, Toxiproxy, dependency) for either recorded run, with the two-run radio group, a quarter-speed replay, the three phases and a permanent comparison table. The dashboard screenshot is shown inline. The rest of this document is kept as the design record.

## 1. Reader and promise

**Reader.** An engineer or recruiter who has seen the homepage strip and wants to know whether Raimbek understands failure behaviour, measurement and evidence, not just tooling.

**Promise.** After reading, they can say:
- what Faultline does;
- why the recorded fault mean is about 250 ms and not 400 ms;
- how a run becomes a file anyone can check offline;
- what the project does not do.

**Thesis.** "Understand how a system behaves when a dependency fails."

**Length budget.** 8 to 10 desktop screens, shorter than the Poly and ReproSeed case studies (about 13 and 14). Each chapter fits on one screen at 1440 × 900.

## 2. Chapters

| # | Chapter | Content | Evidence |
|---|---|---|---|
| 1 | Hero | The thesis; the status line (early developer tooling, not production chaos infrastructure; v0.1.0 publishes only the offline evidence tool; experiments run from source on Faultline's own sample services); Source, Release and Demo links; the authorship line from decision 13 | README; release page |
| 2 | The question | Why a timeout is hard to reason about until the fault can be reproduced, the failed requests seen, recovery confirmed and the record handed on | README, opening paragraph |
| 3 | The lab | The request path (runner → frontend → Toxiproxy → dependency) and the separate control lane to Toxiproxy's API. The isolation: an isolated Compose project, no Docker socket in containers, resource limits, image digests pinned | `docs/architecture.md` ("First vertical slice", "Implemented lifecycle"); `AGENTS.md` ("Boundaries and safety") |
| 4 | **Where the deadline cuts** (signature) | Two recorded runs on one strip; see section 3 | `docs/validation.md`, "Actual portable files" |
| 5 | Recovery and cleanup | Ownership identifier; proxy deletion registered before creation; cleanup under a fresh five-second context. What cannot be guaranteed: SIGKILL, host crashes, Docker daemon failure | `docs/architecture.md` |
| 6 | Traces | What tracing adds (W3C propagation; the trace and span IDs of the runner's request in each sample) and what it does not: Toxiproxy emits no spans, Jaeger is temporary, and span IDs are correlation handles, not proof that a trace was stored | `docs/reports.md` ("Optional trace correlation"); `docs/tracing.md`; README |
| 7 | Portable evidence | The `.flb` format: exactly four entries, stored uncompressed, fixed timestamps, so repeat exports are identical. Offline verify, inspect and compare. The CGO-disabled verifier checked in a read-only, network-disabled container. What a checksum does not prove | `docs/evidence.md`; `docs/validation.md` (Milestones 5A, 5B) |
| 8 | The tool's own interface | The README's dashboard screenshot, shown as the project's actual interface with actual persisted runs, at its native size or linked | README; `docs/images/dashboard.png` |
| 9 | Status | One compact table: implemented, released, unreleased, experimental, planned, unsupported | Ledger 4.6c |
| 10 | Limits | Small samples, nearest-rank percentiles, descriptive comparison only, no significance. Docker's VM and host scheduling affect timings. Repeated trials and concurrent load need a separate methodology | `docs/reports.md` ("Reproducibility and limits"); `docs/roadmap.md` |
| 11 | Close | Links, and the relation to ReproSeed (working back from a failure) and Poly Predictor Kit (a system of services) | — |

## 3. Signature interaction: "Where the deadline cuts"

**Recommendation.** Put the two recorded runs from the same validation record on one strip, and let the reader switch between them. Below the deadline, injected latency passes through to the request. Above it, the deadline converts latency into failure and hides the dependency's real delay. This is the one systems idea the project demonstrates best, and it can be shown with recorded values only.

**Exact evidence.** Both runs come from `docs/validation.md`, section "Actual portable files" (Milestone 5A), at main `a7d48f0`. Both were generated from clean commit `27b3775`, exported twice with identical bytes, and inspected offline.

| Run | Latency / tracing | Samples per phase | Baseline mean | Fault mean | Recovery mean | Fault failures | Bundle | SHA-256 |
|---|---|---:|---:|---:|---:|---:|---|---|
| `clean-80.flb` | 80 ms / off | 10 | 2.17 ms | 83.16 ms | 0.25 ms | 0 of 10 | 4,170 bytes | `bb6c3d4ca25d3db32b83f5cdd189027085fb61cab86d796e5dc0dde435ea8572` |
| `clean-400.flb` | 400 ms / on | 5 | 0.58 ms | 253.20 ms | 0.36 ms | 5 of 5 (HTTP 504) | 5,162 bytes | `e265b73a29f2deaa079045996aafc9cf064b05949193389c10319ceff07caea5` |

**Mechanism sources.**
- The frontend calls the dependency with a 250 ms timeout. Latency below it increases request duration; latency above it causes a real HTTP 504 (`docs/architecture.md`).
- "Timeouts censor the underlying dependency's latency; a 400 ms toxic produces roughly a 250 ms frontend response" (`docs/reports.md`).
- The README's dashboard screenshot shows both runs' means.

**Behaviour**
- **Control.** A two-option radio group, "80 ms injected" and "400 ms injected", above the homepage's strip. The four stage tabs stay as they are. There is no free slider: a slider would show latencies that were never measured.
- **80 ms.** The injected line sits at 80 ms, below the 250 ms deadline. The fault plateau is at 83.16 ms and the outcome row shows ten passing requests. There is no hatched band.
- **400 ms.** The injected line moves to 400 ms. The plateau stops at the deadline (253.20 ms), five requests show HTTP 504, and the hatched band between 250 and 400 ms is labelled "Censored by the deadline".
- **Readout.** Each run's conditions are stated beside the strip: latency, tracing, samples per phase, commit, bundle size and hash. A permanent note reads: "Two separate recorded runs with different sample counts and tracing settings. Compare their shape, not overhead." Faultline's own comparison is descriptive only.
- **Motion.** The injected line and the plateau move to their new values in about 440 ms, and the outcome marks change in sequence. With reduced motion the swap is instant. The strip is complete at rest in both states.
- **Accessibility.** The radio group uses arrow keys, and the stage tabs keep the homepage's pattern. A table of both runs is the text alternative. The selected run's summary is announced politely.
- **Phones.** The same control sits above the strip, which keeps the homepage's phone layout. The 80 ms run's ten marks fit as narrow ticks.

**Never shown or implied:**
- an interpolated or simulated latency;
- a significance or overhead claim;
- a claim that the 80 ms run is "healthy" in any sense beyond 0 of 10 failures;
- any run that is not in the repository's record.

## 4. Assets

- **Use:**
  - the README's dashboard screenshot (`docs/images/dashboard.png`, 1440 × 1082: actual persisted 80 ms and 400 ms runs);
  - the link to the 80-second README demo;
  - optionally the demo poster (`docs/images/demo-preview.jpg`) as the demo link's thumbnail.

  All three are Raimbek's own public repository material.
- **Do not:**
  - redraw the dashboard as an imitation interface;
  - add terminal windows, logs or alerts that the repository does not contain;
  - copy the demo video into this repository.
- **New captures:** none needed. If they ever are, run Faultline's own sample stack locally as its README describes, never against external systems or production services. Label the result as a new recorded run with its date and conditions.

## 5. Claims never to make

- That Faultline works on arbitrary, user-owned or production services. The custom-service lab is design and plan-only work.
- That unreleased features are in the published binaries. The offline reliability gates and the lab planner are on main after v0.1.0.
- Users, adoption, deployment, uptime, reliability or performance figures.
- Statistical significance, causality beyond the recorded runs, or a benchmark.
- That a checksum proves authenticity or who ran an experiment.
- That traces are part of the evidence bundle.
- Test counts, on public pages.

## 6. Build notes, for when it is approved

- **Route.** `/work/faultline/`, following the existing static-page pattern: `work/faultline/index.html` and `src/work/faultline/server.tsx`, discovered by `scripts/work-pages.ts`. It stays `noindex` and out of the sitemap until launch (`src/work/release.ts`).
- **Content.** Extend `src/content/faultline.ts` with the 80 ms run. Reuse the homepage strip's geometry rather than drawing a second chart.
- **No new dependencies.**

## 7. Open before building

1. The authorship wording (decision 13).
2. Whether the dashboard screenshot is shown inline or linked.
3. Whether the case study is wanted before launch, or after Poly and ReproSeed ship.
