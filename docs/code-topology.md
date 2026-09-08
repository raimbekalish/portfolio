# Code topology — public dataset

This dataset describes filtered, public source snapshots. It is an import-and-directory map, **not a runtime architecture, call graph, dependency-install audit, authorship analysis, or engineering accomplishment metric**. It introduces no R-Finance internals.

## Scope and verified provenance

All five repositories were verified anonymously through `https://api.github.com/repos/{owner}/{repo}` before source access. Each returned `private: false` and `visibility: public`. Their complete recursive Git trees were read at pinned commits; no tree response was truncated. The portfolio snapshot equals stable main `177192adcbd493e1c6a5285a8ed0909d57cf8a39`.

Source fetches used only `raw.githubusercontent.com/{owner}/{repo}/{commit}/{allowlisted-path}`. The Git blob SHA-1 was recomputed from every fetched file and compared with the pinned tree. Only hashes, file URLs, import references, dependency names, and parser status are cached. Source bodies are discarded after parsing.

No GitHub authentication, tokens, credential helpers, local environment files, private repository access, or repository code execution was used. README content was not fetched or mined for claims. Titles, summaries, and contribution wording come from the approved stable `src/data.ts`, except the minimal identification of this portfolio's own public repository. Team repositories remain explicitly `ownership: "team"`, including the owner-hosted Poly repository. Their full public source tree is not attributed to Raimbek individually.

All five requested public candidates were accepted; the exported `rejected` list is empty. R-Finance was deliberately outside candidate scope, and no private repository was queried. Files excluded by the source policy are not counted as rejected repositories.

Pinned snapshot time: `2026-09-08T04:01:48Z`.

| Repository | Pinned commit | Included source files | Directory groups | Resolved imports | Declared dependency entries |
| --- | --- | ---: | ---: | ---: | ---: |
| [Poly Predictor Kit](https://github.com/raimbekalish/Poly_Predictor_Kit/tree/475fcd9473bd71f7016448fdd60d12f6a842e294) | `475fcd9473bd71f7016448fdd60d12f6a842e294` | 14 | 2 | 11 | 3 |
| [PromptLock](https://github.com/abdirahmanbm01/nexhacks/tree/4a94856fff7e3d2217e08640ac2a98480a4ffce5) | `4a94856fff7e3d2217e08640ac2a98480a4ffce5` | 36 | 16 | 23 | 27 |
| [JiraGenie](https://github.com/khyeo1011/dubhacks25/tree/d31ee447507c25b333bc98786478375c48f110c2) | `d31ee447507c25b333bc98786478375c48f110c2` | 7 | 5 | 4 | 13 |
| [AI Visual Novel Creator](https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator/tree/564bb6e63341feec0608b8e343114a35683732cf) | `564bb6e63341feec0608b8e343114a35683732cf` | 6 | 1 | 6 | 0 |
| [Portfolio](https://github.com/raimbekalish/portfolio/tree/177192adcbd493e1c6a5285a8ed0909d57cf8a39) | `177192adcbd493e1c6a5285a8ed0909d57cf8a39` | 19 | 3 | 26 | 9 |

Totals: **82 included source files, 27 directory groups, 70 resolved local imports**. These numbers describe the filtered snapshot only. Groups include ancestors with no directly contained files. Dependency entries are per-manifest declarations, so a package may appear in multiple manifests.

## What the actual structure supports

- **Poly:** seven files at the root and seven in `Emotional_Damage_Predictor`. The source set includes ten Python files, two HTML files, one CSS file, and one JavaScript file. The main summary module and comment-processing directory are independently visible; no cross-pipeline runtime relationship is invented.
- **PromptLock:** 36 source files spread across backend, frontend, and an MCP-server source folder. `frontend/components` has ten direct files, while `backend/pipeline` has six. Only two included frontend relationships use explicit relative imports; many frontend references use aliases that this conservative parser deliberately does not resolve. Sparse lines do not mean the frontend lacks relationships.
- **JiraGenie:** seven JavaScript/JSX files, concentrated in `src/frontend`, `src/resolvers`, and `elevenlabs`. Four explicit relative-import relationships resolve.
- **Visual Novel:** six root-level Python modules and six local imports. `main.py` imports `process_story.py`, `script_generator.py`, `story_collector.py`, and `story_generator.py`; `process_story.py` imports `ImageGeneration.py`; `story_generator.py` imports `story_collector.py`. Ren’Py output/template code is outside this source set. There is no allowlisted manifest in this snapshot; the empty dependency list does **not** assert that the project uses no dependencies.
- **Portfolio:** nineteen source files, including thirteen components in `src/components`. Public résumé HTML is excluded. The graph does not read, represent, or change the résumé PDF.

The largest object has 36 files. The visual must not imply thousands of nodes, fabricated activity, or a dense runtime graph unsupported by these snapshots.

## Reproduce

Run commands from the repository root. The [generator](../scripts/generate-topology.py) reads the durable [offline cache](../data/topology-cache) and writes the [derived browser dataset](../src/topology/data.json). This port retained the validated V17 snapshot byte-for-byte; no network refresh was performed during integration.

Python 3 is sufficient for these snapshots; Python 3.11+ additionally supports native TOML manifest parsing if future allowlisted snapshots include `pyproject.toml`. No additional Python package is required.

```sh
# Deterministic local replay, with no network access or source bodies required:
python3 scripts/generate-topology.py --offline

# Verify current public visibility, retaining the existing pinned commits:
python3 scripts/generate-topology.py

# Explicitly choose new public default-branch heads and regenerate metadata:
python3 scripts/generate-topology.py --refresh

# Optional metadata-only inventory; does not fetch source bodies:
python3 scripts/generate-topology.py --trees-only
```

The ordinary online command repeats the public-visibility check, then reuses a matching pinned tree/parser cache. `--refresh` is the only way to replace the stored commit selection. Offline replay never falls back to the network. It retains the snapshot timestamp, which makes the derived JSON byte-identical.

## Output and cache

Only [`src/topology/data.json`](../src/topology/data.json) is intended for the browser bundle. [`data/topology-cache`](../data/topology-cache) is an evidence/reproduction cache outside `public` and must not be imported into UI code or copied into `dist`.

- `snapshot.json`: the stable generated-at timestamp and schema version.
- `{id}/provenance.json`: verified public URL/visibility, commit, commit date, tree SHA, metadata URLs, and aggregate inclusion/exclusion counts. It omits commit messages and author email data.
- `{id}/tree.json`: permitted source/manifest paths, blob SHA, bytes, and recognized file kind. Denied paths are not retained.
- `{id}/derived-imports.json`: safe parsed metadata keyed by commit/parser version. No source body, executable payload, credentials, `.env` content, document content, or source excerpt is stored.

## Public JSON schema

`schemaVersion`, `generatedAt`, `repositories`, `rejected`, and `method` form the root object. Each repository has:

- Identity/provenance: `id`, `title`, `owner`, `repo`, `url`, `commit`, `public`, `publicVerifiedAt`, `ownership`, `summary`, `contribution`.
- `files`: exact public paths with `language`, Git-tree byte size, and `group` (the immediate directory path).
- `groups`: `id` equals the exact directory path; `.` is the root; `parent` names the immediate ancestor or is null for root. `fileCount` includes descendants, while `ownFileCount` counts only direct files. `languages` is a file-count distribution within that group.
- `languageCounts`: file counts by recognized extension, not GitHub language bytes, lines of code, or runtime technologies. Missing keys mean zero included files of that language.
- `edges`: source and target are exact included paths from the same repository. `kind` is `relative-import` or `local-import`.
- `dependencies`: allowed package names from supported manifests, with the manifest path and declaration kind. Versions, scripts, environment values, URLs, and lockfile metadata are not exported.
- `structuralHighlights`: literal directory/import observations, not new product or authorship claims.
- `treeStats`: total Git-tree blob count, included source/manifest counts, excluded aggregate count, parsed/read status, size skips, and parser warnings.

A hierarchy edge can be constructed directly from a file's `group` and each directory's `parent`. Those relationships are different from import edges. There are **no cross-repository edges** and no claim that all five projects share one system.

## Parsing rules and limits

Python uses `ast.parse` and examines `Import` / `ImportFrom` statements without executing code. Relative modules, root-local modules, and sibling-local modules are matched to included `.py` or `__init__.py` files. No runtime `sys.path` behavior, installed package probing, function calls, or import side effects are evaluated.

JavaScript/TypeScript uses conservative static regular expressions after comments are masked. Matches inside quoted example strings are rejected. Multiline import/re-export declarations, relative side-effect imports, `require('./literal')`, and `import('./literal')` are supported. Only targets resolving to an included file are emitted. Type-only imports are included as source relationships, not runtime traffic. Extension and directory `index` lookup are supported. Computed imports, aliases such as `@/`, bundler resolution, runtime calls, and cross-repository references are omitted.

Resolution is a static approximation. It does not prove a module executes, that every build configuration resolves identically, or that an import corresponds to a network/request pipeline. A line is an observed local source dependency, never a fabricated request trace.

Dependencies are names declared in `package.json`, allowlisted `requirements*.txt`, or `pyproject.toml`. They are not inferred from all import names, not verified installed versions, and not a transitive inventory. For example, Poly's small requirements file is not presented as a complete list of every technology in the project.

All final source/manifest reads succeeded. No final allowlisted source exceeded the content-size limit, and no Python parse warning was recorded. Unsupported file languages and output formats are omitted rather than shown with guessed relationships.

## Safety exclusions and scope audit

The generator permits a small explicit source-extension list and named dependency manifests. Before extension checks it rejects dependency/vendor folders, virtual environments, generated/build/output folders, caches, uploads, private/secret/credential-like paths, data/dataset/database locations, lockfiles, minified code, declaration output, résumé-named files, and all other formats. No PDFs, images, notebooks, databases, environment files (including examples), or corporate documents are fetched. Files over 250 KB may remain tree nodes but their bodies are not fetched; none occur in the final set.

The first broad source filter included public résumé HTML and Ren’Py generated/template files. That filter was narrowed during the scope audit; those paths and their derived records were removed from the final tree, cache, and dataset, and are blocked from future fetches. No PDF or résumé file was modified. Raw bodies were never written to disk. The final dataset contains only the permitted source set listed above.

## Validation

- Anonymous visibility verification: all five repositories public.
- Recursive source trees: nontruncated, commits pinned.
- Fetched-source integrity: Git blob SHA-1 matches before parsing.
- Graph integrity: every import endpoint exists in that repository's included file set; no self edges or cross-repository edges.
- Hierarchy integrity: every non-root parent exists; direct/recursive/language counts match included files.
- Parser checks: multiline imports included; commented/example-string imports, computed imports, property-method `require`, and denied paths excluded.
- Offline reproducibility: exact byte-for-byte match.

Derived JSON: **46,437 bytes; 5,448 bytes gzip** (standalone JSON, not the final browser chunk).

SHA-256: `7c126c423d6ef36721a0f8c02860cd3c3f13bd2bbffafd70ac4487d73df7cbe8`.
