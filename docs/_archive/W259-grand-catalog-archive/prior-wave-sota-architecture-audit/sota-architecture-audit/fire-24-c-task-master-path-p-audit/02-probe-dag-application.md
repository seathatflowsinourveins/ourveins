# 02 — Probe DAG 1-7 Application to Task Master (eyaltoledano/claude-task-master)

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict CITE-PATTERN-ONLY conf=0.92 @
> `.claude/state/codex_consult_w134_f24c_task_master_OUT.txt`

## Probe DAG verdicts

### Probe 1 — count-OVER

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| Trendshift trending badge claim | NEUTRAL pre-codex | FAIL on documentation/MCP coverage claims |
| AI-driven decomposition novelty (vs sota-researcher) | NEUTRAL | FAIL (overlaps with sota-researcher) |

**Convergence**: FAIL ✅ — codex caught novelty overstatement.

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| Plugin + MCP server + CLI bin/ + slash commands — multi-surface install | PASS |

**Convergence**: PASS ✅

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| Anthropic CC plugin + MCP server (CC-native + cross-tool: .cursor/ + .kiro/) | PASS |

**Convergence**: PASS ✅

### Probe 4 — plugin-namespace DUPLICATE-FUNCTIONALITY (DECISIVE FAIL)

| Evidence | Verdict |
|---|---|
| `taskmaster` plugin name + `mcp__taskmaster__*` MCP namespace — no name collision | partial PASS |
| Execute phase parallel-agent overlaps `parallel-agent-wave.md` + T1-T7 | **FAIL DUPLICATE** |
| Task tracking overlaps TaskCreate/TaskUpdate + per-fire MD folder | **FAIL DUPLICATE** |
| Research expansion (Perplexity) overlaps Exa + Perplexity + DeepWiki MCPs | **FAIL DUPLICATE** |
| AI decomposition overlaps sota-researcher subagent | **FAIL DUPLICATE** |

**Convergence**: FAIL ✅ — codex T1 verbatim "workflow semantics that materially duplicate"
(4 distinct surfaces overlap).

### Probe 5 — mode-harness-shape (DECISIVE FAIL — same as CCPM)

| Evidence | Verdict |
|---|---|
| PRD → tasks → start <id> workflow assumes PM-loop | **FAIL** |
| `task-master start <id>` auto-launches with full context — assumes feature-shipping | **FAIL** |
| Complexity-report expansion assumes named-feature scope | **FAIL** |

**Convergence**: FAIL ✅ — same root pattern as CCPM Fire 24-B P5 FAIL.

### Probe 6 — direct-file/registry blockers (NEW FAIL — distinct from BMAD+CCPM)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| LICENSE = Commons Clause | "MIT with Commons Clause" — NON-PERMISSIVE | DOC-CAVEAT-ONLY (not decisive for local-CLI use-class per SRA D1) |
| Commercial Hamster product (tryhamster.com) | MEDIUM-RISK commercial supply-chain | MEDIUM |
| Cloud/telemetry/product prompts in Task Master | (didn't probe — codex caught) | **FAIL** |
| npm package + GitHub repo + Trendshift badge | PASS Row-2 | PASS Row-2 |

**Convergence**: codex T1 verdict P6=FAIL ✅ — caused by Commons Clause + commercial commercial
product + cloud/telemetry/product prompts. This is DISTINCT from BMAD+CCPM P6=PASS.

**Fire 24-A BMAD**: P6 PASS (pure MIT + community OSS)
**Fire 24-B CCPM**: P6 PASS (pure MIT + named-author community)
**Fire 24-C Task Master**: P6 FAIL (Commons Clause + commercial product + cloud/telemetry)

### Probe 7.a — demand-absence (DECISIVE FAIL — same as CCPM)

| Evidence | Verdict |
|---|---|
| eee has NO current PRD-driven feature backlog | FAIL |
| eee uses /loop autonomous mode + per-fire MD folder | FAIL |
| sota-researcher subagent covers research expansion demand | FAIL |

**Convergence**: FAIL ✅

### Probe 7.b — demand-creates-new-workflow eligibility

| Clause | Verdict |
|---|---|
| (1) Named operational use case | NOT-MET (same as CCPM) |
| (2) Cited local input source path | NOT-MET (.taskmaster/ not present in eee) |
| (3) Wiring path | THEORETICALLY-PRESENT (plugin + MCP install) |
| (4) Incumbent comparison | NOT-MET (TaskCreate/Update + per-fire folder + sota-researcher incumbent) |
| (5) Reversible time-box | NOT-MET (medium supply-chain risk creates rollback friction) |

**Convergence**: NOT-ELIGIBLE ✅

## Aggregate Probe DAG verdict

| Probe | Verdict | Decisive |
|---|---|---|
| P1 count-OVER | FAIL | sub-finding |
| P2 SDK-vs-CLI | PASS | — |
| P3 arch-API | PASS | — |
| P4 plugin-namespace DUPLICATE | **FAIL** | ✅ DECISIVE-1 |
| P5 mode-harness PM-loop | **FAIL** | ✅ DECISIVE-2 |
| P6 blockers (Commons Clause + commercial + telemetry) | **FAIL** | ✅ DECISIVE-3 (NEW vs Fire 24-A+B) |
| P7a demand-absence | **FAIL** | ✅ DECISIVE-4 |
| P7b demand-creates | NOT-ELIGIBLE | — |

**FOUR independent decisive Probe-DAG failures** — most blockers of any Fire 24 audit so far.

## Verdict shape: CITE-PATTERN-ONLY (same as CCPM, with stricter blockers)

Despite 4 decisive failures, codex T1 returned **CITE-PATTERN-ONLY** rather than pure
REJECT-FOR-FIT because:

1. 5 EXTRACTABLE patterns identified (with explicit file:line cites)
2. Commons Clause is DOC-CAVEAT-ONLY for local use-class (not decisive blocker)
3. AI-driven decomposition pattern is genuinely interesting (even though overlaps sota-researcher)

This is the **second CITE-PATTERN-ONLY verdict** in Wave 134 arc (Fire 24-B CCPM was first).
Pattern emerging: PRD/PM-tooling plugins systematically REJECTed for install but contain
extractable subset patterns.

## Cohort tracking

**P4 DUPLICATE-FUNCTIONALITY cohort**: BMAD (Fire 24-A P4=PASS — namespace clean), CCPM (Fire 24-B P4=FAIL),
Task Master (Fire 24-C P4=FAIL) → n=2 P4 DUPLICATE cohort (Fire 24-B + Fire 24-C)

**P5 PM-loop mode-harness cohort**: BMAD (Fire 24-A P5=FAIL — HARD-GATE interactive), CCPM (Fire 24-B P5=FAIL —
abstract triggers + PM-loop), Task Master (Fire 24-C P5=FAIL — PRD/start workflow) → n=3 P5 FAIL cohort
in current Wave 134 arc

**P6 commercial/license cohort** (NEW): Task Master (Fire 24-C P6=FAIL — Commons Clause + commercial)
→ n=1 (no prior Wave 134 commercial-license REJECT)

**P7a demand-absence cohort**: BMAD (Fire 24-A P7a=FAIL), CCPM (Fire 24-B P7a=FAIL), Task Master
(Fire 24-C P7a=FAIL) → n=3 P7a FAIL cohort in Wave 134 arc (all 3 PM-driven PRD-workflow plugins)

## Orchestrator-codex probe convergence

| Probe | Orchestrator | Codex T1 | Convergence |
|---|---|---|---|
| P1 | NEUTRAL | FAIL | codex stricter |
| P2 | (didn't probe specifically) | PASS | codex correct |
| P3 | (didn't probe) | PASS | codex correct |
| P4 | FAIL | FAIL | CONVERGENT |
| P5 | FAIL (carryover from CCPM) | FAIL | CONVERGENT |
| P6 | Commons Clause CAVEAT | FAIL (Commons + commercial + telemetry) | codex stricter on commercial+telemetry |
| P7a | FAIL | FAIL | CONVERGENT |
| P7b | NOT-ELIGIBLE | NOT-ELIGIBLE | CONVERGENT |

**5/8 perfect convergence + 3 codex-stricter-corrections** — codex caught:
- P1 novelty overstatement
- P2 + P3 PASS verdicts (orchestrator was NEUTRAL)
- P6 FAIL with cloud/telemetry/product-prompts addition

Cross-model verification working as designed across 3 fires.

## Mia ladder advance

n=1563 → n=1569 (+6: Probe DAG 1-7 applied / 4 decisive failures / P4 cohort n=2 + P5 cohort n=3 + P7a cohort n=3 in Wave 134 + P6 NEW commercial-license FAIL / 5/8 convergence + 3 codex-stricter corrections / cohort-tracking discipline introduced)
