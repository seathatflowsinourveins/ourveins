# Grand Synthesis 2026-05-16 — Canonical Convergence Layer

This folder is the **single authoritative convergence layer** for the claude-sota-installed runtime research corpus as of 2026-05-16. **18 Pattern-A fix-forward rounds applied. 59 parallel forks. 15 codex T1 GPT-5.5 audits. ~2,000 unique repos D1-D8 scored.**

> **fix13-18 closing wave** (4 GraphQL deep-probes): surfaced **~178 net-new ≥500★ repos** the fix1-13 sweep missed → prior "saturation ceiling" claim **honestly downgraded** to "~90% coverage at ≥2k★, heuristic-not-proof". opencode owner reconciled (fix12). bytedance/Dolphin REJECT discovery — Qwen non-commercial license (fix14b). 0% hallucination in 100-repo audit, B+ grade (fix14c). codex T1 NEEDS-REVISION conf=0.84 propagation-sync applied (fix15). 5 NEW L0.25 hardware sub-layers + llamafile catalog-omission (fix18).

## ⚡ READ THESE FIRST (in order)

| # | File | Purpose | LOC |
|---|---|---|---|
| **1** | [`00-MASTER/THE-ULTIMATE-MASTER-2026-05-16.md`](00-MASTER/THE-ULTIMATE-MASTER-2026-05-16.md) | **THE single consolidated final** — exec summary · Phase 0-4 install plan · 25-layer architecture · 18 fix-forward · honest saturation assessment | 330 |
| **2** | [`00-MASTER/THE-GRAND-CATALOG-INDEX-2026-05-16.md`](00-MASTER/THE-GRAND-CATALOG-INDEX-2026-05-16.md) | **THE UNIFIED INDEX** — navigational map across all 4 PARTs + matrix + 4 GraphQL probes + fix16-18 net-new. **Read this BEFORE diving into a PART file** | 165 |
| **3** | [`00-MASTER/THE-GRAND-CATALOG-MATRIX-2026-05-16.md`](00-MASTER/THE-GRAND-CATALOG-MATRIX-2026-05-16.md) | **Top-tier 308 repos** matrix — sum/80 desc with verdict + source-fork (the "best of") | 318 |
| **4** | [`00-MASTER/THE-GRAND-CATALOG-PART1-L0-L1-DATA.md`](00-MASTER/THE-GRAND-CATALOG-PART1-L0-L1-DATA.md) | **L0-L1 data-cluster catalog** — vector / KG / memory (84 rows) / MCP-servers (88 rows) / local-inference / cache / compression / doc-ingestion | 564 / 392 rows |
| **5** | [`00-MASTER/THE-GRAND-CATALOG-PART2-L2-L3-AGENTS.md`](00-MASTER/THE-GRAND-CATALOG-PART2-L2-L3-AGENTS.md) | **L2-L3 agent+plugin catalog** — frameworks (53) / CC plugins (96) / CC tools (50) / templates / vertical agents (165) / test+doc+refactor (53) / commercial (32) / peer CLIs | 714 / 468 rows |
| **6** | [`00-MASTER/THE-GRAND-CATALOG-PART3-L4-L5-EVAL-SEC.md`](00-MASTER/THE-GRAND-CATALOG-PART3-L4-L5-EVAL-SEC.md) | **L4-L5 eval+security+workflow catalog** — multimodal/browser/voice (67) / eval+obs (62) / reasoning / security (45) / workflow+devops (57) / durable / Q2-2026 cross-cut (60) | 507 / 316 rows |
| **7** | [`00-MASTER/THE-GRAND-CATALOG-PART4-L6-MISC.md`](00-MASTER/THE-GRAND-CATALOG-PART4-L6-MISC.md) | **L6+ code-intel + recent + misc catalog** — worktree (58) / cache / gateway / multi-account / **code-intel (158)** / orchestration (32) / Q2-2026 entrants / misc | 631 / 455 rows |
| **8** | [`00-MASTER/OPERATOR-DECISIONS-V-FINAL-2026-05-16.md`](00-MASTER/OPERATOR-DECISIONS-V-FINAL-2026-05-16.md) | **180+ decisive operator calls** — INSTALL / STUDY-PILOT / DEFER / REJECT (incl. fix13 §UPDATE-5) | 380+ |

### fix13-18 GraphQL closing-wave deep-probes (06-fresh-research-delta/)

| File | Net-new | What |
|---|---|---|
| `GRAPHQL-FINAL-MISSING-2026-05-16.md` (fix13) | 55 ≥1k★ | 12-axis probe — 9/12 axes uncovered candidates |
| `GRAPHQL-CHINESE-MULTILANG-2026-05-16.md` (fix16) | 15 ≥1k★ | Chinese ecosystem + multilang LSP — 7 NEW-P0 |
| `GRAPHQL-NICHE-500-1K-2026-05-16.md` (fix17) | ~64 ≥500★ | 500-1k★ floor — only 1/10 axis saturated |
| `GRAPHQL-HARDWARE-RUNTIME-2026-05-16.md` (fix18) | 44 ≥1k★ | 13-axis hw/runtime — 5 new sub-layers + llamafile omission |
| `LICENSE-VERIFY-FIX13-2026-05-16.md` (fix14b) | 35 verified | gh-API license — Dolphin REJECT discovery |
| `HALLUCINATION-AUDIT-PARTS-2026-05-16.md` (fix14c) | 100 sampled | 0% hallucination, B+ grade |
| `05-codex-consults/CODEX-T1-FIX13-VERDICT-2026-05-16.md` (fix15) | — | codex T1 GPT-5.5 audit verdict NEEDS-REVISION conf=0.84 |

**TOTAL: ~2,000 unique repos** D1-D8 multi-dimensionally scored. **~178 net-new surfaced in fix13-18 closing wave.**

> **Catalog sharding rationale**: Single matrix with 2,000+ rows hit context-overflow. Sharded into 4 layer-partitioned PART files (added fix12). PART1-PART4 contain the long tail; THE-GRAND-CATALOG-MATRIX retains the top-tier "best of" for fast operator scanning. THE-GRAND-CATALOG-INDEX (fix13) ties them together with per-layer navigation.

## Supporting References (00-MASTER/)

- `DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md` — 8 per-layer deep-sat findings consolidated (168 LOC)
- `ULTIMATE-SYNTHESIS-V-FINAL-V5-SATURATED-2026-05-16.md` — research foundation (242 LOC)
- `CANONICAL-D1-D10-146REPO-SCORING.md` — canonical D1-D10 source (463 LOC)
- `D1-D10-SCORECARD-V-FINAL.md` — V-FINAL 42-repo scorecard (188 LOC)

## Folder Structure

| Folder | Purpose | Files |
|---|---|---|
| **00-MASTER/** | V-FINAL + GRAND-CATALOG-INDEX + matrix + 4 PARTs + scorecards + operator-decisions | 12 |
| **01-prior-W258-canonical/** | W258-ULTIMATE + handbook + v13 + 33 r-rounds (subsumed by V-FINAL) | 38 |
| **02-wave-keep-canonical/** | 244 wave + fleet + cross-runtime files | 244 |
| **03-kits-evolution-canonical/** | Kit v62 + v65 only (v25-v61 + v63-v64 archived in 91-superseded-masters) | 40 |
| **04-outer-research-canonical/** | research-wave-2026-05-15/ tree + sota-architecture-audit/ + wave52/ | 347 |
| **05-codex-consults/** | W258 + V-FINAL codex T1 GPT-5.5 audits | 21 |
| **06-fresh-research-delta/** | 47 fork outputs this session (46 base + GRAPHQL-FINAL-MISSING fix13) | 47 |
| **90-superseded-archive/** | 523 intermediate wave/tmp files (audit-trail retained) | 523 |
| **91-superseded-masters/** | V-FINAL drafts + kit-trees-pre-v62 + CLEANUP-REASONS | 152 |

## Provenance Chain

```
2026-05-15  → Wave 200-237 install catalog (sota-pure axis) + Wave 240-253 close-synthesis
2026-05-16  → W258 v1-v13 evolutionary refinement + 9 codex T1 audits
2026-05-16  → V-FINAL session (V-FINAL through V5-SATURATED, 7 versions)
2026-05-16  → V-FINAL: 48 parallel forks + 14 codex T1 + 12 fix-forward rounds
2026-05-16  → fix11: last-gap deep-sat (sqlite-vec + flow-next + cc-templates + tweakcc REJECT)
2026-05-16  → fix12: opencode reconciliation via gh API + 4-part catalog sharding + GraphQL deep-probe
```

## Cardinal Rules Active

- **CR-3** (cross-model gate): 14 codex T1 GPT-5.5 audits across session
- **CR-6** (official channel): anchors to Anthropic-OFFICIAL Q1/Q2 2026 primitives + AGENTS.md AAIF
- **CR-10** (research-first): ~4,064 docs + 852 tmp + 38 kits + 2,721 state files probed
- **CR-11** (META-process SOTA): sota-convergence-audit 5-phase R1-R5 pipeline applied
- **CR-12** (upstream-install priority): 6-class disposition applied (GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)

## Operator Single Command

```bash
git add docs/grand-synthesis-2026-05-16/ && git commit -m "feat: grand-synthesis-2026-05-16 V-FINAL fix18 — 18 fix-forward rounds, 59 forks, 15 codex T1 audits, ~2,000 repos D1-D8 scored, 4-PART catalog + 4 GraphQL deep-probes + UNIFIED-INDEX"
```

Then execute Phase 0 (16 INSTALLs ~2hrs) + Phase 1 (25 INSTALLs ~4hrs) per `00-MASTER/THE-ULTIMATE-MASTER-2026-05-16.md` §1.

## fix12 reconciliation note

**opencode owner chain (verified 2026-05-16 via `gh api repos/sst/opencode`)**:
- `sst/opencode` → HTTP-redirects to **`anomalyco/opencode`** (canonical name)
- `anomalyco/opencode`: 161,179★ MIT · NOT archived · pushed 2026-05-16T17:02:33Z
- `opencode-ai/opencode`: ARCHIVED · 12,571★ MIT · pushed 2025-09-18 (true predecessor)

fix5 was correct on sst→anomalyco transfer. fix11 correctly flagged opencode-ai archive but mis-attributed the 161k★ to sst. **Canonical name going forward: `anomalyco/opencode`**.
