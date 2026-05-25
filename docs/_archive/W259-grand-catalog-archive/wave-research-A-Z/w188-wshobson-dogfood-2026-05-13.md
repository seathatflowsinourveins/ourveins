# W188 wshobson agent-teams DOGFOOD evidence — commit 8de923b review

date: 2026-05-14
gate: STOP-GATE [1] P0 wshobson dogfood — REAL invocation evidence
plugin: agent-teams@claude-code-workflows v1.0.2 (installed W187)
dispatch: 3× `agent-teams:team-reviewer` subagent_type (security + architecture + testing dimensions)
target: commit 8de923b (FM-20 row 18 codification + CCBP pin bump)

## Dogfood disposition

This IS the wshobson agent-teams plugin dogfood — `agent-teams:team-reviewer` is the wshobson plugin's reviewer subagent type (installed W187 from claude-code-workflows marketplace). 3 parallel dispatches on a REAL audit task (W188 commit 8de923b), each returning structured dimension-specific verdict. The plugin's multi-reviewer team-orchestration primitive FIRED and produced consolidated findings. NOT just install-verify — actual invocation with verdicts.

## Consolidated review report — commit 8de923b

| Dimension | Verdict | Conf | Key finding |
|---|---|---|---|
| Security | APPROVE | — | Docs-only commit; no attack surface; cite-class TIER-3-LOCAL-COMPOSITION verified correct; CCBP pin SHA format-valid (live-verify deferred next-fire) |
| Architecture | NEEDS-REVISION | 0.84 | Row 18 mechanism IS distinct from rows 16/17 but boundary with row 16 thin → discriminator clause needed; CR-12 PARTIAL-OVERLAP-with-row-16 disposition; missing audit-action-loop sister-cite |
| Testing | NEEDS-REVISION | 0.78 | precedence-order claim [INFERRED] not [VERIFIED]; audit-hook FORWARD-REF (tools/env_dual_source_parity_audit.py doesn't exist); row-18-specific update triggers underspecified |

### Critical (0)
None.

### High (1)
- **[Architecture P1]** Row 18 sub-class boundary with row 16 thin — RESOLVED via Pattern A round-2: discriminator clause "SIMULTANEOUS-dual-declare distinct from row 16 POST-REVERT-residue" added to row 18.

### Medium (3)
- **[Architecture P2]** Missing audit-action-loop §Stage 1 Wire sister-cite — RESOLVED via Pattern A round-2: added to row 18 cite column.
- **[Testing]** precedence-order claim needs [INFERRED] marker — RESOLVED via Pattern A round-2: row-18-specific update trigger added documenting [INFERRED] status + re-classification path.
- **[Testing]** audit-hook ship FORWARD-REF needs explicit path — RESOLVED via Pattern A round-2: `tools/env_dual_source_parity_audit.py` + schema `env_dual_source_parity_audit.v1` named in row-18-specific update trigger.

### Low (1)
- **[Security]** CCBP pin live-verify deferred next-fire — ACCEPTED (read-only research probe exception per CR-9; cite-anchor not install-class).

### Summary
Total findings: 5 (Critical: 0, High: 1, Medium: 3, Low: 1). 4/5 RESOLVED via Pattern A round-2 fix-forward to fm20-path-drift-cascade.md. 1 Low ACCEPTED-WITH-DOC (CCBP live-verify next-fire).

## STAND-IN-NOTICE

All 3 team-reviewers ran as Sonnet stand-in per CLAUDE.local.md ENV (f) env-funneling. Cross-model gate NOT structurally satisfied for these dispatches per cmc-env-funneled-disclosure.md. The reviewers' verdicts are useful for citation-discipline / architecture-soundness / testing-verifiability findings but model-asymmetry value ABSENT. codex T1 BRIDGE-MODE re-review queued per cross-model-consensus.md §"On codex unavailable" option (a) defer-queue (Path D blocked by codex CLI v0.130.0 config validation this arc).

## Pattern A round-2 applied (4/5 prescriptions to fm20-path-drift-cascade.md)

1. ✓ Row 18 discriminator clause (SIMULTANEOUS-dual-declare vs row 16 POST-REVERT-residue) + CR-12 PARTIAL-OVERLAP disposition
2. ✓ Row 18 cite column: audit-action-loop §Stage 1 Wire sister-cite
3. ✓ Row-18-specific update triggers section: [INFERRED] precedence-order marker + audit-hook FORWARD-REF path + n=2 recurrence promotion gate
4. — (commit-body addendum for CR-12 disposition — folded into #1)
5. ✓ FORWARD-REF target `tools/env_dual_source_parity_audit.py` + schema named
