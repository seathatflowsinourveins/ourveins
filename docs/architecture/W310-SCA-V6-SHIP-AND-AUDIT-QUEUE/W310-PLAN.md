# W310 — sca-v6 SHIP + ship-blocker-AI batch + audit-queue execution

**Status**: ACTIVE  
**Started**: 2026-05-19  
**Branch**: `sota-converge-w310` (W280d-isolation; predecessor `sota-converge-w295` @ HEAD `be1987c`)  
**Wave-start commit**: TBD this commit  
**Goal predicate**: W309-SYNTHESIS §10 paste-ready /goal (operator-set 2026-05-19)

## Stream decomposition

| Stream | Owner | Output | Method | Operator-touch |
|---|---|---|---|---|
| **P0a** sca-v6 SKILL.md SHIP | this session (solo) | `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v6 applied) + `W310-STREAM-A-SCA-V6-SHIP-LOG.md` | 9 deltas Δ1-Δ9 per `W309-STREAM-B-SCA-V6-DESIGN.md` | No |
| **P0b** ship-blocker AI batch | operator-confirm-required | `W310-STREAM-B-SHIP-BLOCKER-AI-CHECKLIST.md` | AI-1/2/3 paste-ready snippets + smoke-verify cmds | Yes (gitignored CLAUDE.local.md edits + service-state decisions) |
| **P1a** governance AI batch | this session (solo, low-risk reversible) | `W310-STREAM-C-GOVERNANCE-AI-LOG.md` | AI-4..AI-8 + M7; each edit reversible | Mixed (some operator-defer) |
| **P1b** W310 audit-queue | 4 parallel general-purpose Agents | `W310-STREAM-D-AUDIT-QUEUE.md` + 8 verdict files | sca-v6 audits via ≥7 MCP cascade families | No (but synthesis-step appends ledger) |

## Sequencing

1. Branch isolation (DONE — `sota-converge-w310` cut from `be1987c`)
2. W310-PLAN.md commit (wave-start)
3. **Parallel dispatch P1b Stream D** (4 Agent forks; runs in background)
4. **Serial P0a Stream A** while D runs: 9-delta SKILL.md ship
5. **Serial P1a Stream C** after P0a completes: governance AI batch (low-risk)
6. P0b Stream B: operator-action checklist authored; no auto-edits
7. Synthesize W310 + ledger row appends 37-44 + codex review per stream commit
8. Final codex E2E + ship

## Operator-AI delegation matrix

- **P0b ship-blockers** are CLAUDE.local.md (gitignored) edits + service-state decisions (phoenix restart/retire, cognee LLM-key). Authoring the AI-batch checklist this session; operator applies via single PowerShell session restart.
- **P1a governance** edits are all reversible 1-line changes: pip uninstall/install + `/ctx-upgrade` + 1-line settings.json edit (context-mode fnm pin). Applying inline since reversible + low-blast-radius.
- **P1b audits** are pure read-only research with verdict appends to ledger. Synthesis appends rows 37-44.
