# Agent C: verified-avoid.md + ARIS effort-knob design

> **Agent ID**: `a02947af29ada0eef`
> **Type**: everything-claude-code:architect (Sonnet stand-in)
> **Duration**: 107s
> **Tool uses**: 7
> **Total tokens**: 376,416
> **Verdict**: APPROVE-DESIGN conf=0.90
> **Mia ladder**: 8 probes, 8 VERIFIED, 0 OVER caught

## Persistence note

This file is the orchestrator-side persistence of Agent C's ARTIFACT-INLINE return per
`Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md`. Agent C is read-only
architect agent; cannot Write directly; embedded ARTIFACT in final return for
orchestrator persistence.

## Design 1 — `docs/verified-avoid.md` (target ~165 LOC, ≤200 ceiling)

**Target path**: `Z:/claude-sota-installed/docs/verified-avoid.md`

```markdown
# Verified-Avoid Registry — Cohort-classified REJECT decisions

# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes` (Probe 4-7 patterns) — basis for Cohort 1 META-HARNESS class
# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 6 supplementary direct-file/registry blockers` — basis for Cohort 2 license/registry class
# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL` (L118-127) + §"Cycle-132 T3 REJECTED aden-hive/hive for fresh-paint" (canonical.md L60) — basis for Cohort 3 fresh-paint class
# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — every install candidate Mia-probed against this registry pre-Edit
# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction — n=2+ same-class instances promote registry row from PROVISIONAL → FIRM
# Reference: TIER-2 sister-rule `Z:/claude-sota/.claude/rules/canonical.md` Must-Never #8 (fresh-paint repos as SOTA) — cardinal-rule body that Cohort 3 enforces

## Purpose

Persistent registry of REJECT-FOR-FIT verdicts on adoption candidates that surfaced from sota-researcher / architect / codex-rescue fan-out waves. Every install/cite-import candidate MUST be cross-checked against this registry BEFORE adoption per Mia pre-apply discipline.

## Jurisdiction

Registry rows are **catalog/router only** — they do NOT duplicate mechanics already owned by sister rules. Each row points at the cohort-defining authority for the REJECT class:

- **Cohort 1** mechanics → `agent-harness-fit-verification.md §The 7 sub-classes`
- **Cohort 2** mechanics → `agent-harness-fit-verification.md §Probe 6`
- **Cohort 3** mechanics → `convergence-gate.md §Axis 3` + `canonical.md` Must-Never #8

Per `kiss-dry-yagni.md` Must-Never #4: no mechanics restatement.

## Cohort taxonomy

### Cohort 1 — META-HARNESS competing-framework REJECTs

Candidates that pass convergence-gate Axis 1+2+3 BUT fail harness-fit Probe 4/5/7.a.

### Cohort 2 — Probe-6 direct-file/registry blockers

Permissive-license-only mandate (MIT/Apache-2.0/BSD acceptable; AGPLv3/GPLv3/SSPL/proprietary REJECT). Phantom-package npm/PyPI/cargo registry hits.

### Cohort 3 — Fresh-paint REJECTs (canonical.md Must-Never #8)

Density anomaly + vendor-spam topics + vanity-domain signals.

## Active registry

### Cohort 1 — META-HARNESS competing-framework

| Entry | Date | Class | Cite anchor | Re-evaluate trigger |
|---|---|---|---|---|
| `nextlevelbuilder/brainstorming-skill` | 2026-05-02 | Probe 5 HARD-GATE blocks autonomous /loop | `agent-harness-fit-verification.md` iter-84 | If upstream removes interactive gate |
| `obra/superpowers writing-skills` | 2026-05-02 | Probe 5 size-sprawl + meta-skill harness mismatch | `agent-harness-fit-verification.md` iter-85 | Stays REJECT |
| `mattpocock/setup-matt-pocock-skills` | 2026-05-10 | Probe 5 HARD-GATE interactive prompts | Wave 137 Fire 1 Voice 2 | If `disable-model-invocation: true` removed |
| `wshobson/agents conductor` | 2026-05-10 | Probe 5 HARD-GATE Q&A setup | Wave 138 Fire 1 Voice 2 | If upstream removes interactive gate |

### Cohort 2 — Probe-6 direct-file/registry blockers

| Entry | Date | Class | Cite anchor | Re-evaluate trigger |
|---|---|---|---|---|
| `openviking/<repo>` | 2026-05-02 | AGPLv3 LICENSE | `reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md:52-64` | If upstream relicenses |
| `@anthropic/mcp-ast-grep` (npm) | 2026-05-02 | Phantom package | `reference_ship_d_ast_grep_phantom_npm_HNF_2026_05_02.md` | If published |

### Cohort 3 — Fresh-paint REJECTs

| Entry | Date | Class | Cite anchor | Re-evaluate trigger |
|---|---|---|---|---|
| `nextlevelbuilder/ui-ux-pro-max-skill` | 2026-05-10 | 76,425★ MIT, density 0.0517 KB/★ (10× below 0.5), vendor-spam topics, vanity uupm.cc, 37d push gap | Wave 134 Fire 13 file 05 | After +90d, re-probe |

## Mia pre-apply integration

Per `mia-pre-apply.md`: every install/cite-import prescription MUST `grep -n "<owner>/<repo>" docs/verified-avoid.md` BEFORE Edit. Match = DROP per Pattern A admissibility filter.

## Update triggers

- 4th REJECT class emerges → add Cohort 4
- Entry re-evaluate trigger fires → flip to STUDY-PILOT-PENDING
- Cohort reaches n=10+ → split into sub-cohorts
- `agent-harness-fit-verification.md` ships Probe 8 → extend Cohort 1

## Related rules

- `agent-harness-fit-verification.md` (Cohort 1+2 authority)
- `convergence-gate.md` (Cohort 3 authority)
- `canonical.md` Must-Never #8 (Cohort 3 cardinal-rule body)
- `mia-pre-apply.md` (pre-Edit cross-check)
- `codification-threshold.md` (n=2+ promotion)
- `named-failure-modes.md` FM-09 (codex-rescue blind-spot frequent source)
```

## Design 2 — ARIS effort-knob amendment

**Target file**: `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`
**Insertion point**: BEFORE existing `### Spawn template` section
**Delta**: ~32 LOC (post-amend ~156 LOC, stays under 200 ceiling)

```markdown
### Effort-knob parameter (ARIS-derived, Wave 134 Fire 14 codification)

# Reference: TIER-2 `Z:/repos/deps/aris-auto-claude/AGENT_GUIDE.md:24,126-135 @ HEAD 5725459ef5847263e9982f3390a6aa12f2320eaa` [VERIFIED 2026-05-10]

Every agent in the spawn template MUST accept an optional `effort:` parameter scaling
expected token-budget + wall-clock + tool-call ceiling. Default = `balanced`. Codex
per-call time-budget invariant per FM-17.d (90s/120s/180s) is **preserved across all levels**.

| Level | Tokens | Wall-clock | Tool-call ceiling | When to use |
|---|---:|---:|---:|---|
| `lite` | ~5k | ~3min | 8 | Cheap probe / triage / read-only spot-check |
| `balanced` (default) | ~15k | ~10min | 20 | Standard fan-out; sota-researcher Probe DAG 1-7 |
| `max` | ~50k | ~30min | 35 | Deep cross-arc archaeology; multi-axis audit |
| `beast` | ~150k | ~90min | 50 | Whole-arc audit; v62-style 21-axis convergence sweep |

**CADP integration** (per `parallel-agent-wave.md §CADP rule 2-5`):
- `lite`/`balanced` = 1 dispatch each toward max-5-cumulative
- `max` = 2 dispatches (cache pressure ~2×)
- `beast` = 3 dispatches + REQUIRES pre-dispatch fleet probe per §CADP rule 5

**OUTPUT_BUDGET scaling**: 0.4× for lite / 2.5× for max / 5-8× for beast (matches ARIS multiplier).

**FM-17.d preserved**: codex per-call budget invariant (90s/120s/180s) regardless of effort level.
ARIS L135 "Codex reasoning is always xhigh regardless of effort" maps to FM-17.d invariant.

**Spawn template syntax extension**:

```
Agent A — sota-researcher (Sonnet stand-in)
  effort: balanced                                                    # NEW: lite | balanced | max | beast
  task: ...
  OUTPUT_BUDGET: <scaled by effort — see table above>
  TERMINATION: ... | terminationCondition: on_token_budget_exceeded:<scaled>
```
```

## Forward-fire actions

- **W134-F15-verified-avoid-introduction**: ship `Z:/claude-sota-installed/docs/verified-avoid.md`
  (~165 LOC). Codex T1 mandatory per cardinal-rule-3 (new design-surface artifact).

- **W134-F15-effort-knob**: amend `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`
  with `### Effort-knob parameter` subsection (~32 LOC delta). Codex T1 mandatory per
  cardinal-rule-3 (rule-layer edit).

Per Agent C recommendation: **ship verified-avoid.md FIRST** (new artifact, no existing-state risk)
then **effort-knob SECOND** (benefits from verified-avoid registry for Mia probes during ship).

## Cross-model gate state

⚠️ Cross-model gate NOT SATISFIED for Fire 14 due to FM-17.f n=4 + Path P Pattern B HNF.
W134-F15 ships should await codex T1 recovery OR proceed under Outcome A ACCEPT-WITH-DOC
disposition with explicit cross-model-gate-NOT-satisfied disclosure in commit body.

## Mia ladder advance (Agent C close)

8 probes, all VERIFIED, 0 OVER caught.

n=1206 → n=1214 (+8: Agent C ARTIFACT-INLINE persisted + 8 Mia probes verified +
2 designs ready for W134-F15 ship)
