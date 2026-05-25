# 02 — Probe DAG 1-7 Application to Claude Memory Bank

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict REJECT-FOR-FIT conf=0.94 @
> `.claude/state/codex_consult_w134_f24e_memory_bank_OUT.txt`

## Probe DAG verdicts (HIGHEST confidence REJECT in Fire 24 series)

### Probe 1 — count-OVER

| Evidence | Verdict |
|---|---|
| README claims modest (4 agents, 4 commands, 4 memory categories) | NEUTRAL |
| No fabricated numeric claims (no badges, no evals) | NEUTRAL |

**Codex T1**: P1 = NEUTRAL

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| Slash commands + agent definitions + workflows — pure CC slash-command pattern | PASS |
| No SDK / no MCP / no CLI binary | PASS |

**Codex T1**: P2 = PASS ✅

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| CC-native slash commands only; no Anthropic-API or OpenAI-API specifics | NEUTRAL |

**Codex T1**: P3 = NEUTRAL

### Probe 4 — plugin-namespace DUPLICATE-FUNCTIONALITY (DECISIVE FAIL — worst of Fire 24)

| Evidence | Verdict |
|---|---|
| 12 distinct surfaces overlap with eee primitives | **FAIL — 12 duplicate surfaces** |
| decisions/patterns/architecture/troubleshooting all have eee equivalents | FAIL |
| 4 agents all have eee equivalent agents | FAIL |
| 4 slash commands all have eee equivalent primitives | FAIL |

**Codex T1**: P4 = FAIL ✅ — verbatim `duplicate_surface_count_vs_eee: 12`

### Probe 5 — mode-harness-shape

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| Workflow could fire autonomously OR interactively | likely PASS | **PASS** |
| No HARD-GATE (unlike BMAD) | PASS | PASS |
| No PM-loop assumption (unlike CCPM/Task Master) | PASS | PASS |

**Codex T1**: P5 = PASS ✅

### Probe 6 — direct-file/registry blockers

| Evidence | Verdict |
|---|---|
| LICENSE = PURE MIT | PASS |
| No archived/deprecated markers | PASS |
| Single-author TIER-4 (Russ Beye) | PASS-with-caveat |
| **No MCP/npm/registry presence** (manual git clone only) | NEUTRAL |
| **Last push 2025-09-28 → STALE per D2 (~7.5 months)** | DOC-CAVEAT-ONLY per codex T1 (not decisive) |

**Codex T1**: P6 = PASS ✅ (with D2 STALE doc-caveat noted separately)

### Probe 7.a — demand-absence (DECISIVE FAIL)

| Evidence | Verdict |
|---|---|
| eee has MEMORY.md + feedback_*/reference_*/project_* memory taxonomy already | FAIL |
| eee has cardinal rules (Z:/claude-sota/.claude/rules/*.md) for patterns | FAIL |
| eee has per-fire MD folders for architecture audit | FAIL |
| eee has FM-* catalog for troubleshooting | FAIL |

**Codex T1**: P7a = FAIL ✅ — codex verbatim: "no materially new eee capability"

### Probe 7.b — demand-creates-new-workflow eligibility

| Clause | Status |
|---|---|
| (1) Named operational use case | NOT-MET (eee primitives cover all 4 memory categories) |
| (2) Cited local input source path | NOT-MET (would CONFLICT with existing memory locations) |
| (3) Wiring path | NOT-MET (install path overwrites existing files) |
| (4) Incumbent comparison | NOT-MET — 12 surfaces have incumbents |
| (5) Reversible time-box | NOT-MET (CR-9 stock-install CR-9 install-risk creates rollback friction) |

**Codex T1**: P7b = NOT-ELIGIBLE ✅

## Aggregate Probe DAG verdict

| Probe | Verdict |
|---|---|
| P1 count-OVER | NEUTRAL |
| P2 SDK-vs-CLI | PASS |
| P3 arch-API | NEUTRAL |
| P4 plugin-namespace DUPLICATE | **FAIL** (12 surfaces) |
| P5 mode-harness | PASS |
| P6 blockers | PASS (STALE doc-caveat only) |
| P7a demand-absence | **FAIL** |
| P7b demand-creates | NOT-ELIGIBLE |

**2 decisive blockers** (P4 DUPLICATE + P7a demand-absence) + CR-9 install-risk HIGH = clean REJECT-FOR-FIT.

## CR-9 install-risk decisive blocker

Per codex T1: `cr9_install_risk_decisive_blocker: "YES"` ✅

The stock README install (`cp -r {agents,commands,workflows} ~/.claude/` + `cp CLAUDE.md ~/.claude/`)
OVERWRITES eee's:
- Cardinal-rule CLAUDE.md (rules 1-12)
- 12+ existing agents directory
- Existing slash commands

Codex verbatim: "stock README install path is a decisive CR-9 blocker because it copies over
CLAUDE.md and bulk-copies agents/commands/workflows into the active Claude configuration".

Codex also notes: "an adapted namespaced install could reduce overwrite risk but would not
fix the larger duplicate-functionality failure" — meaning even MITIGATING CR-9 wouldn't
save adoption because P4 DUPLICATE is independently decisive.

## SRA D2 STALE classification

Per codex T1: `sra_d2_stale_decisive_blocker: "DOC-CAVEAT-ONLY"` — STALE band is a DOWNGRADE
flag (per SRA D2 lattice), NOT primary reject reason. The DUPLICATE-functionality (P4) is the
primary reject reason; STALE is supporting evidence.

## Cohort tracking final state (Wave 134 Fire 24 series)

| Cohort | Wave 134 Fire 24 instances |
|---|---|
| HARD-GATE cohort | n=5 (Fire 24-A BMAD added to existing 4) |
| P5 PM-loop cohort | n=3 (BMAD HARD-GATE + CCPM PM-loop + Task Master PM-loop; Agent OS PASS, Claude Memory Bank PASS) |
| P4 DUPLICATE-class FAIL cohort | **n=4** (CCPM + Task Master + Agent OS hard-coded path + **Claude Memory Bank** = strongest cohort) |
| P6 commercial-license FAIL cohort | n=1 (Task Master) |
| P7a PASS cohort | n=1 (Agent OS v3 only) |
| P7b ELIGIBLE cohort | n=1 (Agent OS v3 only) |
| **D2 STALE band** (NEW) | **n=1** (Claude Memory Bank only — first STALE candidate) |
| **CR-9 install-risk HIGH cohort** (NEW) | **n=1** (Claude Memory Bank decisive blocker) |

## Empty cite-pattern-extract-candidates (cleanest REJECT)

`cite_pattern_extract_candidates: []` per codex T1 — codex found NO subset patterns worth extracting.

Comparison across Fire 24 series:
- Fire 24-A BMAD: 3 candidates (all CITE-ONLY or DO-NOT-EXTRACT — net 0 extracted)
- Fire 24-B CCPM: 4 candidates (frontmatter / script-first / PRD-Epic taxonomy / per-agent files)
- Fire 24-C Task Master: 5 candidates (PRD prompt / runtime guards / **selective MCP tool-loading HIGH-VALUE** / complexity expansion / storage schema)
- Fire 24-D Agent OS v3: 5 candidates (index.yml PILOT-LEAD / inject-standards / scenario formatting / discover-loop / shape-spec)
- **Fire 24-E Claude Memory Bank: 0 candidates** (cleanest pure REJECT)

## Orchestrator-codex probe convergence

| Probe | Orchestrator | Codex T1 | Convergence |
|---|---|---|---|
| P1 | NEUTRAL | NEUTRAL | CONVERGENT |
| P2 | NEUTRAL | PASS | codex correct |
| P3 | NEUTRAL | NEUTRAL | CONVERGENT |
| P4 | FAIL (12 surfaces) | FAIL (12 surfaces) | CONVERGENT |
| P5 | PASS | PASS | CONVERGENT |
| P6 | PASS (with D2 caveat) | PASS (D2 doc-caveat) | CONVERGENT |
| P7a | FAIL | FAIL | CONVERGENT |
| P7b | NOT-ELIGIBLE | NOT-ELIGIBLE | CONVERGENT |

**7/8 PERFECT CONVERGENCE + 1 codex-correct refinement (P2)** — highest convergence in Fire 24 series.

This is a textbook REJECT-FOR-FIT with strong cross-model alignment.

## Mia ladder advance

n=1613 → n=1619 (+6: Probe DAG 7/8 convergent / P4 12-surface DUPLICATE / P7a demand-absence / CR-9 decisive YES / 0 cite-patterns extracted / cohort tracking final state)
