# W325 Stream E — CLAUDE.md Compaction + Progress-Tracking-Out Plan

**Stream**: E of 8 (W325 deep-audit, parallel)
**Date**: 2026-05-19
**Scope**: Read-only audit + paste-ready compaction plan. Orchestrator executes Edit.

---

## 1. Acute issue confirmed

`Z:\claude-sota-installed\CLAUDE.md` = **46,800 bytes / 49 lines** — exceeds the **40 KB community-documented performance-warning threshold** (claudelint `claude-md-size` rule; `anthropics/claude-code` issue #2766: warning fires at ~40k aggregate memory; cite — perplexity research above). Single-paragraph dumps (W319-ship L43 = 16,806 chars on one line; W316-ship L45 = 7,802 chars on one line) are the structural fault.

**Sibling reference**: `Z:\claude-sota-pure\CLAUDE.md` = 5,825 B / 78 LOC; **0 Status sections inline** — uses gitnexus block + pointer-only discipline. **CCBP `claude-memory.md @ HEAD ac0d87d`** (5,496 B, 121 LOC) **says nothing about a size cap**; only documents ancestor/descendant lazy-load (lines 30-105). The 50-LOC body cap in current CLAUDE.md L3 is operator-self-imposed, but **lines 41-49 are 5 single-line Status sections totaling ~39.5 KB** — the cap was met for body LOC but the file as a whole blew through 40k.

## 2. Pre / Post byte+LOC table

| Region | Lines | Bytes | Status |
|---|---:|---:|---|
| Body (L1-L39, Architecture + Cardinal rules + Pointers + Runtime state + Git) | 39 | ~7,330 | KEEP verbatim |
| L41 W320-ship Status | 1 | ~7,623 | MIGRATE to archive |
| L43 W319-ship Status | 1 | ~16,806 | MIGRATE to archive |
| L45 W316-ship Status | 1 | ~7,802 | MIGRATE to archive |
| L47 W317-Stream-A Status | 1 | ~2,017 | MIGRATE to archive |
| L49 Status archive pointer | 1 | ~467 | REPLACE with 5-line pointer block |
| **TOTAL PRE** | **49** | **~46,800** | over 40k threshold |
| **TOTAL POST** | **~50** | **~10,000** | safe; ~79% reduction |

Post-compaction targets: ≤15 KB / ≤350 LOC per operator brief; this plan lands ~10 KB / ~50 LOC.

## 3. Migration plan (paste-ready)

### Step 1 — Write current 4 inline Statuses to single archive
Create `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md` with verbatim copies of L41 / L43 / L45 / L47 (each as its own `## Status (...)` section + the L49 archive pointer paragraph as a final `## Pre-W315 archive chain` section). Operator runs:
```bash
sed -n '41,49p' CLAUDE.md > docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md
```
Then prepend a heading: `# Status appendix — W320 + W319 + W316 + W317-Stream-A inline snapshots (archived 2026-05-19 W325)`.

### Step 2 — Replace L41-L49 with pointer block via single `Edit`
Replace from `## Status (2026-05-19, W320-ship)` through end-of-file with:
```md
## Status — pointer-only (W325 compaction)

Wave-by-wave progress lives **OUT** of CLAUDE.md per `https://docs.anthropic.com/en/docs/claude-code/memory` `@import` discipline + Anthropic `claude-code` deepwiki Q (2026-05-19): "use @import directives... separate dynamic or transient content... into subfiles". Current wave Status + recent rolling-3 history archived to:

- **Current wave (W324)**: `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md` (W320 + W319 + W316 + W317-Stream-A inline snapshots)
- **Prior rolling-3**: `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W{314,315,316,317,318}.md`
- **Cumulative verdict ledger**: `VERDICT-LEDGER.md` (per-row append; 96 rows post-W320 per W320-C)
- **Live cross-session memory**: T6 `basic-memory` MCP (canonical primary per W295) — query `mcp__basic-memory__search_notes "Wave-N"` before new wave
- **Pre-W255 history**: `git log --before=2026-05-15`

Pre-W255 historical record via `git log --before=2026-05-15`.
```

### Step 3 — Verify
```bash
wc -lc CLAUDE.md  # expect ~50 LOC, ~10 KB
```

## 4. Progress-tracking-OUT SOTA pattern (operator-mandated)

**Recommendation: 3-layer hybrid, all already-live in this runtime**:

1. **Per-wave write-on-ship → T6 basic-memory** via `mcp__basic-memory__write_note` (canonical primary per CLAUDE.md L35 + W295). Each wave's ship-summary becomes a single addressable note (`Wave-N-ship-summary`) queryable via FTS5 across sessions. **Already live**; just add a step to ship-checklist.
2. **Cumulative verdict-row → `VERDICT-LEDGER.md`** (file in repo; append-only single-row-per-decision). Already at 96 rows; this is the SOTA off-CLAUDE.md cumulative pattern (cite: SystemPrompt.io guide §"≤50 lines... use it as an index, not a knowledge dump").
3. **Archive immutable snapshots → `docs/architecture/CLAUDE-MD-ARCHIVE/`** (already 5 PRE-W*.md files; extend with CURRENT-W*.md per wave). Rolling-3 retention preserved by **moving** not duplicating.

CLAUDE.md keeps only the pointer block above. **No `@import` directive needed** (would still count against the 40k aggregate); pointer URLs are non-loading prose so the cumulative payload stays small.

## 5. Three cited SOTA precedents for ≤15 KB CLAUDE.md

1. **`Z:\claude-sota-pure\CLAUDE.md` = 5,825 B / 78 LOC** (sibling clean baseline; 0 inline status; cite `CLAUDE.local.md` L18 "model for this runtime's target shape").
2. **`ruvnet/ruflo` issue #585** "Optimize CLAUDE.md to reduce size below 40k characters" — operator-target precedent matching this exact failure mode (perplexity citation [8]; current was 45,948 chars, similar to our 46,800).
3. **SystemPrompt.io cost-optimisation guide** "The most effective teams keep CLAUDE.md under **50 lines** and use it as an index, not a knowledge dump. Some teams run under 30 lines" (perplexity citation [11]). Plus **claudelint `claude-md-size` rule** confirming 40 KB warning threshold (perplexity citation [2]) and **`anthropics/claude-code` issue #2766** "warning is about total aggregate size of memory files" (perplexity citation [5]).

## 6. Risks + rollback

- **Risk**: rolling-3 retention semantics break if archive file is treated as ephemeral. **Mitigation**: name `CURRENT-W324.md` immutable (next wave renames it to `PRE-W325.md`, creates new CURRENT).
- **Rollback**: `git revert <compaction-commit>` restores full inline status (single commit boundary).

---

**Word count**: ~395 words body. Output file: `docs/architecture/W325-AUDIT-WAVE/STREAM-E-CLAUDE-MD-COMPACTION.md`.
