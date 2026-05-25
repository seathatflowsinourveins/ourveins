# 99 — Fire 24-C Close Synthesis (Task Master Path P Audit)

> **Verdict**: **CITE-PATTERN-ONLY** at codex T1 conf=0.92 (REAL GPT-5.5)
> **Closed-loop disposition**: terminal CITE-PATTERN — no install, 5 file:line-precision extracts queued
> **Fire 24-C deliverable**: 4-file folder + atomic commit per FM-02 sub-class (b) defense

## Fire 24-C summary

Third of 5 Tier 1 NEW PROBE-DAG-CANDIDATE audits. Task Master
(`eyaltoledano/claude-task-master` HEAD `c0c98d36` MIT-with-Commons-Clause) was user's
Tier 2 🥈 "AI-driven task generation" pick. Path P codex T1 returned **CITE-PATTERN-ONLY @
conf=0.92** with **5 file:line-precision cite-pattern candidates** identified.

This is the **second CITE-PATTERN-ONLY verdict** in Wave 134 arc, but with stricter blockers
than CCPM (4 decisive P-DAG failures vs CCPM's 3, plus P6 FAIL distinct from BMAD+CCPM).

## 5 deliverables (~600 LOC)

1. `00-tracker.md` (~95 LOC) — framing + Commons Clause P0 flag + 4 pre-codex blockers
2. `01-task-master-anatomy.md` (~165 LOC) — Node.js monorepo anatomy + LICENSE full text + 5 cite-pattern reasoning
3. `02-probe-dag-application.md` (~150 LOC) — Probe DAG 1-7 + cohort-tracking discipline
4. `03-codex-t1-verdict.md` (~100 LOC) — verbatim REAL GPT-5.5 verdict + token-usage trend
5. `99-close-synthesis.md` (this file) — adoption verdict + roadmap

## Decision matrix (final)

| Decision axis | Outcome |
|---|---|
| Install verdict | **CITE-PATTERN-ONLY** (no install) |
| Install taskmaster plugin | ❌ NO |
| Install task-master-ai MCP | ❌ NO |
| Vendor Task Master code/assets | ❌ NO (per codex T1 next_steps) |
| Commons Clause license risk | DOC-CAVEAT-ONLY (acceptable for local-CLI use-class per SRA D1) |
| Commercial supply-chain risk | MEDIUM (Hamster commercial product, cloud/telemetry detected) |
| Row-2 fabrication-test | PASS (Trendshift + GitHub + npm 0.43.1 verified live by codex) |
| Cite-pattern extracts queued | **5 candidates** (with explicit file:line cites) |
| Reclassify Fire 23 file 03 NN-3 | PROBE-DAG-CANDIDATE → CITE-PATTERN-ONLY-VERIFIED (forward-only) |

## Four decisive Probe-DAG blockers

1. **Probe 4 DUPLICATE FAIL**: 4 surfaces overlap (parallel-agent / task-tracking / research /
   AI decomposition) — most DUPLICATE failures of any Fire 24 audit so far
2. **Probe 5 PM-loop FAIL**: PRD → tasks → start <id> workflow (same root as CCPM)
3. **Probe 6 FAIL** (NEW vs Fire 24-A+B): Commons Clause + commercial Hamster product +
   cloud/telemetry/product prompts — first P6 FAIL in Wave 134 Fire 24 series
4. **Probe 7.a demand-absence FAIL**: no PRD-driven feature backlog

## 5 cite-pattern-extract candidates (codex T1 file:line precision)

These can be extracted to eee WITHOUT installing Task Master plugin/MCP/CLI:

### Candidate 1: PRD-to-task prompt contract

- Source: `Z:/repos/deps/claude-task-master/src/prompts/parse-prd.json:59-60`
- Pattern: strict JSON tasks schema + dependency-aware ordering + current-best-practices research block
- **Application to eee**: enrich per-fire MD folder schema with similar JSON task-schema discipline
  (sister to CCPM Candidate 1 frontmatter schema — combine into single extract ship)
- **Effort**: 1 ship (~45min) combined with CCPM Candidate 1

### Candidate 2: Generated-task runtime guards

- Source: `Z:/repos/deps/claude-task-master/scripts/modules/task-manager/parse-prd/parse-prd-helpers.js:136-173`
- Pattern: sequential IDs + dependency remapping before write
- **Application to eee**: if eee per-fire MD folder grows dependency tracking, this is reference impl
- **Effort**: DEFER (eee per-fire folders don't yet track dependencies)

### Candidate 3: Selective MCP tool-loading (HIGH-VALUE for eee)

- Source: `Z:/repos/deps/claude-task-master/mcp-server/src/tools/index.js:20-62` + `tool-registry.js:107-132`
- Pattern: `TASK_MASTER_TOOLS` env var with `core/standard/all/custom` tiers to reduce tool context footprint
- **Application to eee**: eee has 23 MCP servers with ~1878 tokens session-start overhead
  (`mcp_overhead_audit.py` Wave 16 evidence). A selective MCP tool-tier-loading pattern could
  enable `MCP_TIER=core/standard/all` discipline to cut session-start cost
- **Effort**: 1 ship (~2hr) to design + implement MCP tier-loading env var discipline
- **HIGH-VALUE — directly addresses Fire 23 file 04 "21-plugin token-budget" honest caveat**

### Candidate 4: Complexity-report-driven expansion

- Source: `Z:/repos/deps/claude-task-master/apps/docs/capabilities/task-structure.mdx:197-248` +
  `src/prompts/expand-task.json:69-83`
- Pattern: analyze complexity → recommend subtask counts/prompts → expand tasks
- **Application to eee**: could enrich sota-researcher Mia probe with complexity-aware
  subtask recommendation (analyze a Probe DAG candidate → recommend probe depth/breadth)
- **Effort**: 1 ship (~1hr) to enrich sota-researcher initialPrompt with complexity-recommendation

### Candidate 5: Tagged storage schema

- Source: `Z:/repos/deps/claude-task-master/apps/docs/capabilities/task-structure.mdx:7-24`
- Pattern: `.taskmaster/tasks/tasks.json` with optional metadata + generated task files
- **Application to eee**: DEFER (eee per-fire folders are markdown-native; JSON storage adds friction)
- **Effort**: DEFER

## High-priority candidate: Candidate 3 (Selective MCP tool-loading)

This is the **most impactful extract** from Wave 134 Fire 24 series so far. It directly
addresses the user's "2-3 plugins, never more" 2026 consensus concern (Fire 23 file 04 §Critical
Question) and eee's 23-MCP inventory token-overhead question.

**Pre-codex hypothesis**: codex's "$MCP_TIER" pattern could allow:
- `MCP_TIER=core` (~5-7 essential MCPs: github / context-mode / playwright / memory) — minimal startup
- `MCP_TIER=standard` (~12-15 MCPs: above + exa + perplexity + deepwiki + serena) — research-arc
- `MCP_TIER=all` (current 23 MCPs) — full audit-arc

Queue this as Tier 1.5 NEW: **W134-F24-C3** Selective MCP Tier-Loading.

## Forward fire roadmap (post-Fire-24-C)

### Tier 1 NEW (2 remaining of 5)

| Fire | Subject | Pre-codex hypothesis |
|---|---|---|
| W134-F24-D | Agent OS v3 (buildermethods/agent-os) | LIKELY-CITE-PATTERN — /inject-standards |
| W134-F24-E | Claude Memory Bank (russbeye/claude-memory-bank) | LIKELY-REJECT P4 DUPLICATE — L1+L3+MEMORY.md overlap |

### Tier 1.5 NEW — Fire 24-B + 24-C cite-pattern extracts (combined ~9 candidates)

From Fire 24-B (CCPM, 4 candidates):
- W134-F24-B1: CCPM frontmatter schema
- W134-F24-B2: script-first cli (sota-audit-cli)
- W134-F24-B3: PRD/Epic taxonomy doc
- W134-F24-B4: per-agent progress files

From Fire 24-C (Task Master, 5 candidates):
- W134-F24-C1: PRD-to-task prompt contract (combine with B1)
- W134-F24-C2: Generated-task runtime guards (DEFER)
- **W134-F24-C3: Selective MCP tool-loading (HIGH-VALUE — addresses Fire 23 P0)**
- W134-F24-C4: Complexity-report-driven expansion (sota-researcher enrichment)
- W134-F24-C5: Tagged storage schema (DEFER)

**Combined consolidation candidates** (eliminate redundancy):
- B1+C1 → frontmatter+PRD schema combined ship
- C3 → MCP tier-loading (HIGH-VALUE standalone ship)
- B2 → script-first cli
- C4 → sota-researcher complexity enrichment

### Promotion candidates

- **W134-F24-A1**: HARD-GATE cohort n=5 promotion (Fire 24-A queued)
- **W134-F24-C-COHORT**: P5 PM-loop cohort now at n=3 (BMAD HARD-GATE + CCPM PM-loop + Task Master PM-loop) — codification candidate for distinct PM-loop sub-class at `agent-harness-fit-verification.md`

## Coverage % update

| Metric | Pre-Fire-24-C | Post-Fire-24-C |
|---|---|---|
| Tier 1 NEW PROBE-DAG-CANDIDATEs verified | 2 / 5 (40%) | **3 / 5 (60%)** |
| Cross-model verified claims | 25 | **26** |
| Path P recipe ladder | n=10/10 | **n=11/11** |
| CITE-PATTERN-ONLY verdicts in arc | 1 (CCPM) | **2** (CCPM + Task Master) |
| HARD-GATE cohort instances | 5 | 5 (Task Master is PM-loop not HARD-GATE) |
| PM-loop cohort instances (NEW) | n=2 (BMAD + CCPM) | **n=3** (+ Task Master) |
| P4 DUPLICATE-class FAIL cohort | n=1 (CCPM) | **n=2** (+ Task Master) |
| P6 commercial-license FAIL cohort | n=0 | **n=1** (Task Master) |
| Cite-pattern-extract candidates queued | 4 (CCPM) | **9 total** (+ 5 Task Master) |
| HIGH-VALUE extract candidate identified | none | **C3 Selective MCP tool-loading** |
| 100% architecture dim coverage | 8/8 | 8/8 ✅ (unchanged) |

## Cumulative arc Fire 5-24-C (26-fire arc)

20 folders, ~125 files, ~17700 LOC across 26-fire arc.

Mia ladder n=130 (pre-arc) → **n=1573** (Fire 24-C close) = **+1443 verifications across 26-fire arc**.

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md`:
- Fire 24-C is **CITE-PATTERN-ONLY @ conf=0.92** with 0 prescribed_edits + 5 cite-pattern candidates
- No Pattern A apply for INSTALL decision
- 5 cite-pattern candidates → SEPARATE Pattern A apply ships per cycle-300
- Outcome A ACCEPT-WITH-DOC for AUDIT deliverables

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT @ file:line @ HEAD SHA |
| CR-3 cross-model | ✅ REAL GPT-5.5 codex CLI |
| CR-9 install-risk | ✅ REJECT decisive + Commons Clause DOC-CAVEAT noted |
| CR-11 META-process | ✅ Fire follows META-process |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| SRA D1 license-use-class precision | ✅ Applied (Commons Clause local-CLI ACCEPTABLE) |
| Row-2 fabrication-test | ✅ codex verified live (Trendshift + GitHub + npm) |
| Cohort-tracking discipline | ✅ NEW: P4/P5/P6/P7a cohort instances tracked |

## Mia ladder advance (Fire 24-C close)

n=1573 → n=1580 (+7: Fire 24-C close synthesis / 5 cite-pattern candidates with effort
estimates / HIGH-VALUE C3 identified / forward roadmap with consolidation candidates /
P5 PM-loop cohort n=3 promotion candidate / P4 DUPLICATE cohort n=2 / 26-fire arc
cumulative metrics)
