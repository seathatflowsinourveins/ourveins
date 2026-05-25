# W264 — Research File Inventory & Organization Plan (2026-05-17)

> **Lane**: META — file inventory + reorganization recommendations only. Parallel agents own memory/RAG, inference, parallel-sessions, observability, git-practice, plugins.
> **Hard rule**: NO files moved or deleted in this pass. Main thread executes the move.
> **Scope**: every `*.md` under `Z:\claude-sota-installed\docs\`.

---

## §1 — Headline numbers

- **Total `.md` files under `docs/`**: **10,855** (86.0 MB on-disk, all mtime in 2026-05).
- **Top-2 paths dominate**: `current images\.claude\` (6,307 files — installed-plugin snapshot) + `outer research\kits\` (2,021 files — v5-v65 SOTA frontier kits) account for 76% of the file count.
- **Genuinely architectural docs**: **~95 files** (CANONICAL + PER-LAYER + CONVERGENCE-WAVE combined). Everything else is artifact (installed-image snapshot, plugin marketplace dumps) or superseded research streams already filed under `_archive\W259-grand-catalog-archive\`.

---

## §2 — Category summary table

| Category | Count | Total KB | Avg KB | Oldest mtime | Newest mtime |
|---|---:|---:|---:|---|---|
| **ARTIFACT** | 6,363 | 47,888 | 7.5 | 2026-05-15 | 2026-05-16 |
| **SUPERSEDED** | 4,397 | 35,516 | 8.1 | 2026-05-04 | 2026-05-16 |
| **PER-LAYER** | 64 | 1,868 | 29.2 | 2026-05-16 | 2026-05-17 |
| **CANONICAL** | 28 | 664 | 23.7 | 2026-05-16 | 2026-05-17 |
| **CONVERGENCE-WAVE** | 2 | 30 | 15.2 | 2026-05-06 | 2026-05-16 |
| **MISC** | 1 | 14 | 14.1 | 2026-05-13 | 2026-05-13 |
| **TOTAL** | **10,855** | **85,980** | | 2026-05-04 | 2026-05-17 |

Notes:
- ARTIFACT includes `current images\.claude\plugins\marketplaces\` (3,767), `current images\.claude\plugins\cache\` (2,220), `current images\.claude\get-shit-done\` (212 — installed package), `install-provenance.md` (2.3 MB log), `fleet-manifest-*` (2 files), and the `current images\docs\` install snapshot (~22 files).
- SUPERSEDED is dominated by `_archive\W259-grand-catalog-archive\` (2,376 files: codex-verdicts 1,079 + commit-messages 479 + wave-research-A-Z 200 + others) and the 62 versioned `outer research\kits\v5–v65\…` SOTA frontier kits (2,021 files).
- CONVERGENCE-WAVE retained at root: `outer research\README.md` and `outer research\grand-synthesis-w256-2026-05-16\README.md` — both pointer files into archived material.

---

## §3 — Top-10 must-read references for a context-less session

Selected by recency + load-bearing role in describing the current runtime state. Read these first to onboard.

| # | File | Why |
|---|---|---|
| 1 | `architecture\W263-grand-plan-tracker.md` | Live task ledger (#356–368): 6 autonomous tasks DONE this turn, 7 blocked on operator. Names the binding 24 GiB VRAM constraint and decision flowchart. |
| 2 | `architecture\W262-final-synthesis-2026-05-17.md` | W262 sweep convergence — the configuration shape the runtime ships in. |
| 3 | `architecture\W263-final-stack-2026-05-17.md` | Per-job model + optimization stack with TIER-1 evidence (current SOTA decisions). |
| 4 | `architecture\W259-grand-catalog\W259-ULTIMATE-DECISIONS.md` | 29 KB master decision record — what landed and why from the 99-repo × 23-dim audit. |
| 5 | `architecture\W259-grand-catalog\W259-SHIP-DECISIONS.md` | Ship gates and approval state for W259 outputs. |
| 6 | `architecture\W261-system-deepdive-2026-05-17.md` | 19 KB system architecture deep-dive — current shape pre-W262/W263 refinements. |
| 7 | `architecture\W259-grand-catalog\03-deepdive\MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` | 5 KB authoritative memory-stack architecture cited from `CLAUDE.md`. |
| 8 | `architecture\parallel-sessions\PARALLEL-SESSION-ARCHITECTURE.md` | Layer authority for the four-modes parallel-execution doctrine in `CLAUDE.md`. |
| 9 | `architecture\LOCAL-COMPUTE-AUDIT-2026-05-17.md` | 12 KB hardware-side current state (RTX 4090 + ik_llama.cpp + llama-swap). |
| 10 | `architecture\README.md` | Pointer file (1.2 KB) — note: it cites W258 v3 as "active deliverable" but W258 has been **superseded** by W262/W263 dated 2026-05-17. README needs a small update. |

Also worth keeping near at hand: `sota-installed-manifest.md` (425 KB at root — comprehensive install manifest, but treat as reference rather than read-cover-to-cover) and `architecture\W259-grand-catalog\07-final-synthesis\W259-ULTIMATE-SYNTHESIS-FINAL.md` (98.8 KB — the long-form W259 synthesis the W262/W263 dated docs distill).

---

## §4 — Superseded-by mapping (for the SUPERSEDED archive)

The W259 archive INDEX (`architecture\_archive\W259-grand-catalog-archive\INDEX.md`) already documents the prior-wave provenance in 12 buckets (wave-research-A-Z, scoring-matrices, synthesis-final-versions, codex-verdicts, commit-messages, install-reports, audit-findings, goal-prompts, fleet-reports, convergence-axes, ship-decisions, low-quality-archive). High-level supersession map:

| Predecessor wave/folder | Superseded by |
|---|---|
| `00-archive\convergence-axes\W258r2–r39_*.md` (33 streams) | `W259-grand-catalog\07-final-synthesis\W259-ULTIMATE-SYNTHESIS-FINAL.md`, then by W262/W263 dated docs. |
| `00-archive\prior-wave-grand-synthesis-2026-05-16\` (1,371 files — W256 grand-synthesis) | `architecture\W259-grand-catalog\` non-archive sub-folders + W262/W263. |
| `00-archive\synthesis-final-versions\` (47 files) | `W259-ULTIMATE-DECISIONS.md` + `W262-final-synthesis-2026-05-17.md`. |
| `00-archive\codex-verdicts\` (1,079 codex-bridge transcripts) | `architecture\W262-codex-cross-review-2026-05-17.md` (current consolidated codex cross-model verdict). |
| `00-archive\ship-decisions\` (11 files) | `W259-grand-catalog\W259-SHIP-DECISIONS.md`. |
| `00-archive\scoring-matrices\` + `05-scoring\…W259v6.md` | `05-scoring\MASTER-SCORING-MATRIX-W259.md` (single authoritative scorecard). |
| `outer research\kits\v5–v65\*` (62 versioned kits) | Inputs were synthesized into the W259 grand catalog; kit folders themselves are historical and have **no individual successor** — they're a chronological audit trail. |
| `outer research\README.md` + `grand-synthesis-w256-2026-05-16\README.md` | Pointers to material that's now inside W259-grand-catalog. Historical-only. |
| `W259-grand-catalog\03-deepdive\MEMORY-LAYER-FORENSIC-W259v2.md` + `MEMORY-LAYER-RECONCILED-W259v4.md` + `MEMORY-RAG-COVERAGE-AUDIT-W259v16.md` + `MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` | `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` (5 KB authoritative output) + `W262-memory-stack-audit-2026-05-17.md`. |
| `W259-grand-catalog\02-layer-deepdive\LAYER-{A..H}-*.md` (8 layer dives) | Distilled into `W259-grand-catalog\07-final-synthesis\W259-ULTIMATE-SYNTHESIS-FINAL.md`. |
| `W259-grand-catalog\05-scoring\BENCHMARK-SCORECARD-{A..D}-*-W259v6.md` (4 scorecards) | Roll-up: `05-scoring\MASTER-SCORING-MATRIX-W259.md`. |
| `current images\docs\sota-research-CATALOG-FINAL-{v2..v6}-*.md` (5 versioned catalogs) | Final: subsumed by `W259-grand-catalog\07-final-synthesis\W259-ULTIMATE-SYNTHESIS-FINAL.md`. **No-individual-successor — purely historical drafts** kept inside the "current images" snapshot. |
| `architecture\W259-grand-catalog\01-graphql-discovery\MISSED-SOTA-REPOS-{2026-05-16, ROUND2-W259v2}.md` | Findings folded into W259-ULTIMATE-DECISIONS. |
| `00-archive\low-quality-archive\` (118 files, 500K outlier `readme-punkpeye-awesome-mcp-servers.md`) | **No successor — purely historical noise** flagged by the W259 organizer pass. Safe to leave archived. |

---

## §5 — Folder reorganization plan

The runtime already has a good archive convention (`_archive\W259-grand-catalog-archive\`), so the proposal extends rather than reinvents it. **Goal: make `docs/` browsable in 30 seconds — only CANONICAL files at top, PER-LAYER under `architecture/<layer>/`, everything historical under `_archive/`.**

### Recommended moves (main thread executes)

```
docs/
├── README.md                                  (NEW — index pointer)
├── sota-installed-manifest.md                 (stay at root — install manifest)
├── architecture/
│   ├── README.md                              (UPDATE — re-point to W262/W263 not W258)
│   ├── current-state/                         (NEW — promote dated CANONICAL docs here)
│   │   ├── W262-final-synthesis-2026-05-17.md
│   │   ├── W263-final-stack-2026-05-17.md
│   │   ├── W263-grand-plan-tracker.md
│   │   ├── W261-system-deepdive-2026-05-17.md
│   │   └── W259-CATALOG-GAP-SURVEY-2026-05-17.md
│   ├── memory/                                (NEW — move from W259-grand-catalog/03-deepdive)
│   │   ├── MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md  (authoritative)
│   │   ├── W262-memory-stack-audit-2026-05-17.md
│   │   ├── COGNEE-MCP-INSTALL-2026-05-17.md
│   │   ├── GRAPHITI-STRUCTURED-EXTRACT-2026-05-17.md
│   │   └── HINDSIGHT-RECOVERY-2026-05-17.md
│   ├── inference/                             (NEW — bundle local-compute + W263 stack research)
│   │   ├── LOCAL-COMPUTE-AUDIT-2026-05-17.md
│   │   ├── local-compute-research-inference-2026-05-17.md
│   │   ├── local-compute-research-finetune-2026-05-17.md
│   │   ├── IK-LLAMA-FMOE-BUILD-2026-05-17.md
│   │   ├── W263-inference-backend-2026-05-17.md
│   │   ├── W263-quantization-deepdive-2026-05-17.md
│   │   ├── W263-speculative-decoding-2026-05-17.md
│   │   └── W263-newest-models-2026-05-17.md
│   ├── observability/                         (NEW)
│   │   └── W262-observability-audit-2026-05-17.md
│   ├── plugins/                               (NEW)
│   │   └── W262-plugin-gaps-2026-05-17.md
│   ├── models/                                (NEW)
│   │   ├── W262-sota-models-2026-05-17.md
│   │   └── SOTA-OPTIMIZATION-2026-05-17.md
│   ├── parallel-sessions/                     (already exists — keep PARALLEL-SESSION-ARCHITECTURE.md + research/)
│   │   └── W262-parallel-sessions-audit-2026-05-17.md  (MOVE INTO)
│   ├── codex-review/                          (NEW)
│   │   └── W262-codex-cross-review-2026-05-17.md
│   └── W259-grand-catalog/                    (stay — but move dated W259-* files to current-state/)
│       └── 00-archive-from-prior-waves/       (stay — already-archived corpus, do NOT touch)
└── _archive/                                  (NEW — top-level historical archive)
    ├── outer-research-kits/                   (MOVE — all 2,021 files from outer research/kits/)
    ├── outer-research-readmes/                (MOVE — outer research/README.md + grand-synthesis-w256 README)
    ├── current-images/                        (MOVE — all 6,363 ARTIFACT files from current images/)
    ├── fleet-manifests/                       (MOVE — fleet-manifest-2026-05-16T*.md)
    └── install-provenance/                    (MOVE — install-provenance.md 2.3 MB)
```

### Stay-in-place

- `architecture\_archive\W259-grand-catalog-archive\` — already correctly archived; INDEX.md is the canonical pointer.
- `architecture\W259-grand-catalog\01-graphql-discovery\`, `02-layer-deepdive\`, `04-critique\`, `05-scoring\`, `06-codex-adversarial\`, `07-final-synthesis\`, `08-coverage-audit-W259v16\` — these are the W259 deep-dive evidence chain, intact.
- `accounts\README.md` — out of inventory scope (account configs).

### Net impact

- After the move, `docs/architecture/` would contain **~95 files** in **~9 layer folders + W259-grand-catalog/**, all browsable.
- `docs/_archive/` would absorb **~10,750 files** (everything currently classified ARTIFACT + SUPERSEDED kits) — `_archive/` is a deliberate one-stop pen for material that's load-bearing as audit trail but never read directly.
- The `00-archive-from-prior-waves\` corpus (~2,376 files) stays where it is — it's already organized and its INDEX.md is well-formed.

### Pre-move hygiene fixes

- `architecture\README.md` cites `W258-final-synthesis-2026-05-16-v3.md` as "active deliverable" but that file no longer exists in inventory — it was superseded by `W262-final-synthesis-2026-05-17.md` + `W263-final-stack-2026-05-17.md`. Update before the move so the post-move README is correct on day-one.
- `install-provenance.md` at root (2.3 MB) is the single largest file in `docs/` — move into `_archive/install-provenance/` or rotate-and-compress.
- `current images\docs\sota-research-CATALOG-FINAL-{v2..v6}-*.md` (5 versioned drafts, 60–80 KB each) are pre-W259 catalogs and have **no individual successor** — they're a paper trail. Safe under `_archive/current-images/`.

---

## §6 — Confidence + caveats

- File-count math validated against `Z:\claude-sota-installed\tmp\docs-inventory.json` (full inventory dump, all 10,855 entries with size+mtime).
- Per-category classification used a deterministic path-prefix rule (see `Z:\claude-sota-installed\tmp\docs-by-cat.json` for the per-file assignment).
- The supersession map is best-effort from filename + folder semantics; verified against `architecture\_archive\W259-grand-catalog-archive\INDEX.md` (which itself documents 2,237 of the 2,376 archived files by bucket). The remaining ~140 archive files are inside subfolders the INDEX summarizes at bucket level rather than per-file.
- No file was moved, renamed, or deleted in this pass. Two JSON support artifacts were written to `tmp/`: `docs-inventory.json` (full file list w/ size+mtime) and `docs-by-cat.json` (per-category breakdown). Both are safe to delete after the main thread executes the move.

Word count: ~1,460.
