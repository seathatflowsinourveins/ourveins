---
title: W165 P2 — Audit-coverage % per top-level dir (CR-8 conformance ETL)
status: AUTHORITATIVE
date: 2026-05-13
agent: orchestrator-direct (P2 STOP gate ship)
wave: 165
fire: P2
ship_class: audit (CR-8 ETL; EXECUTE-class per CR-9 §item iii read-only research probe exception)
cite_class: TIER-3-LOCAL-OPERATOR-DERIVED (runtime probe authoritative)
---

# Audit-coverage % per top-level dir (W165 P2)

## Method

Per CR-8 conformance verification mechanism (CLAUDE.md §"NEW Cardinal Rule for this runtime (cardinal-rule-8 full-SOTA-content invariant)"): each file should carry one of `ADAPTED-FROM-SOTA` / `NOVEL-DOCUMENTED-EXCEPTION` / `PENDING-AUDIT` (default). Default-PENDING applies when no explicit marker.

Probe: `rg -l "<marker>" <dir>` + `find <dir> -type f` for total count.

## Per-dir status (2026-05-13 W165 baseline)

| Dir | Total | Explicit ADAPTED | Explicit NOVEL | Explicit PENDING | Cite-anchored (TIER-1/2/AMBER) | Default-PENDING (no marker) | % ADAPTED | % NOVEL | % PENDING |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `.claude/agents/` | 13 | 0 | 0 | 0 | 7 | 13 | 0.0% | 0.0% | 100.0% |
| `.claude/rules/` | 63 | 1 | 1 | 1 | 48 | 60 | 1.6% | 1.6% | 95.2% |
| `.claude/skills/` | 21 | 0 | 0 | 0 | 3 | 21 | 0.0% | 0.0% | 100.0% |
| `.claude/hooks/` | 34 | 0 | 0 | 0 | 13 | 34 | 0.0% | 0.0% | 100.0% |
| `.claude/commands/` | 4 | 0 | 0 | 0 | 4 | 4 | 0.0% | 0.0% | 100.0% |
| `tools/` | 13 | 0 | 0 | 0 | 8 | 13 | 0.0% | 0.0% | 100.0% |
| `scripts/` | 4 | 0 | 0 | 0 | 4 | 4 | 0.0% | 0.0% | 100.0% |
| **TOTAL** | **152** | **1** | **1** | **1** | **87** | **149** | **0.66%** | **0.66%** | **98.0%** |
| `docs/` root | 73 | — | — | — | — | — | (out of CR-8 scope) | | |

## Key findings

1. **CR-8 explicit conformance: 0.66% ADAPTED** — only `.claude/rules/cardinal-rule-8-full-sota-content.md` carries explicit `ADAPTED-FROM-SOTA` marker (it's the rule definition file itself).
2. **Cite-anchored coverage: 57%** — 87 of 152 primary files have TIER-1-DIRECT / TIER-1-NAMED-AUTHOR-QUOTE / TIER-2 / cite-import-AMBER references in their content. These are SOTA-cited but lack explicit CR-8 status markers.
3. **Weakest dir: `.claude/skills/` 14% cite-anchored** — 3/21 skills have explicit cite anchors. This matches Wave 162 audit synthesis finding: skills cite trail was 7.1% at start, advanced to 100% via W163 F3 speckit UPGRADE-CITE Pattern A on 9 ports.
4. **Strongest dir: `.claude/rules/` 76% cite-anchored** — 48/63 rules carry TIER-1/2/AMBER references (the rule layer is most disciplined per cardinal-rule-1 lattice).
5. **Forward gap**: 86 files are de-facto SOTA-cited but missing explicit CR-8 marker (cite-anchored=87 minus explicit-status=1) — candidate for FORWARD-fix campaign in subsequent fires per CR-8 conformance verification mechanism.

## Per-dir CR-8 advance candidates (Forward W166+)

| Dir | Files unmarked-but-cited | Forward action |
|---|---:|---|
| `.claude/rules/` | 47 | Highest leverage; rules are load-bearing; suggest batched CR-8 status retrofits per rule body §"Promotion threshold" cite trails |
| `.claude/hooks/` | 13 | Hook scripts have cite-anchors in header comments; retrofit `# CR-8 status: ADAPTED-FROM-SOTA per ...` line |
| `tools/` | 8 | Operator scripts; retrofit per-script CR-8 marker |
| `.claude/agents/` | 7 | Agent frontmatter has cite fields; extend with `cr8_status:` per CCBP claude-subagents 16-field spec |
| `.claude/commands/` | 4 | Already 100% cite-anchored; just need explicit marker addition |
| `scripts/` | 4 | Same as commands |
| `.claude/skills/` | 3 | Already 14% baseline; needs both cite-anchor expansion AND CR-8 marker addition |

Total queued forward-fix candidates: 86 file marker retrofits.

## SessionStart additionalContext surface (FORWARD-REF P3-class)

Per /goal predicate: "SessionStart per audit-action-loop". The audit-coverage JSONL row IS the surface; a SessionStart hook reading the JSONL and injecting top-3 weakest-dir % into additionalContext is FORWARD-REF (queued for F40-class P3 sub-ship E or separate wave). Current SessionStart sources are operator-direct probes; this audit ETL provides the data layer.

## JSONL row (appended to `.claude/state/audit_coverage.jsonl`)

```json
{"ts":"2026-05-13","wave":"W165","fire":"P2","claude_agents":{"total":13,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":7,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"claude_rules":{"total":63,"explicit_ADAPTED":1,"explicit_NOVEL":1,"explicit_PENDING":1,"cite_anchored":48,"pct_ADAPTED":1.6,"pct_NOVEL":1.6,"pct_PENDING":95.2},"claude_skills":{"total":21,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":3,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"claude_hooks":{"total":34,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":13,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"claude_commands":{"total":4,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":4,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"tools":{"total":13,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":8,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"scripts":{"total":4,"explicit_ADAPTED":0,"explicit_NOVEL":0,"explicit_PENDING":0,"cite_anchored":4,"pct_ADAPTED":0.0,"pct_NOVEL":0.0,"pct_PENDING":100.0},"TOTAL":{"total":152,"explicit_ADAPTED":1,"explicit_NOVEL":1,"explicit_PENDING":1,"cite_anchored":87,"pct_ADAPTED":0.66,"pct_NOVEL":0.66,"pct_PENDING":98.0},"forward_fix_candidates_unmarked_but_cited":86}
```

## Cite anchors

- TIER-3-LOCAL-OPERATOR-DERIVED: this fire's `rg + find` runtime probe 2026-05-13
- TIER-2 sister: CLAUDE.md §"NEW Cardinal Rule for this runtime (cardinal-rule-8 full-SOTA-content invariant)" — CR-8 status column mechanism
- TIER-2 sister: `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire — this audit IS the Wire+Surface stage for CR-8 conformance drift
- TIER-2 sister: `.claude/rules/cardinal-rule-8-full-sota-content.md` (the only file passing explicit ADAPTED-FROM-SOTA marker — the rule definition itself)
