# W347-EXECUTE — Task plan (codex r1 MEDIUM-5 closure refresh 2026-05-21)

## Problem
Execute W347 /goal (P0-P6 + DEFER) from W346 audit closure: CR-6 closure + sca-v17 §4 telemetry + SOTA-install batch + cite-refresh + CR-2 SPIRIT gate.

## P0 verify-before-claim
1. [DONE] P0(b) Re-enable tavily MCP — `a881fb3` settings.json:118 `disabledMcpjsonServers: []`
2. [DEFERRED-OPERATOR] P0(c) HF_TOKEN in CLAUDE.local.md — only operator can set
3. [DONE] P0(a) sca-v17 §4 telemetry tools — `a881fb3` 4 .mjs + lib + state schema
4. [DONE] P0(d) Env-flags CCBP cite-or-retire — `a881fb3` CLAUDE_CODE_ENHANCED_TELEMETRY_BETA retired

## P2 stale-cite refresh
5. [DONE] P2(a) Langfuse v3.170 → v3.160.0 — `a881fb3` 6 docs
6. [DONE] P2(b) W344 ledger §7 W347 deltas — `faf018f` (concurrent session subsequently reverted; left as-is)
7. [DONE] P2(c) Remove bypass markers — `767de5e` `.claude/state/bare-subagent-grep-bypass.marker` rm
8. [DONE] P2(d) CLAUDE.md L36 T2 memory text — `767de5e` corrected to match L19 W333-P0 drift-excise

## P3 CR-2 SPIRIT
9. [DONE-RATIFY-PATH] P3 — `a881fb3` `P3-cr2-spirit-ratification.md` (gate-expansion DEFERRED per doc §"Pre-commit gate decision")

## P4 tooling SOTA
10. [DONE] P4(a) package.json `type:module` + `engines.node>=22.22.0` — `a881fb3`
11. [DONE] P4(b) SHA-pin 5 workflows — `8f419ea` + codex r1 HIGH-1 corrections (4 SHA fixes + trivy pin + comment refreshes)
12. [DONE] P4(c) actionlint v1.7.12 → SHA `914e7df21a07ef503a81201c76d2b11c789d3fca` — `767de5e` `.pre-commit-config.yaml`
13. [DONE-AUDIT-ONLY] P4(d) Node v22 + PS7 audit — `faf018f` `P4d-node-v22-audit.md`; adoption deferred to W348+

## P5 sca-v17 calibration + parallel_ratio
14. [DEFERRED-W348] P5 — operator-sign required on rubric weight changes; parallel_ratio needs ≥7d wall-clock

## P6 operator-sign W345 carry batch
15. [DEFERRED-OPERATOR] P6 — Q9/Q10b/SHA-pin pt1/alirezarezvani Stage-2/SigNoz/AGPL-3.0/disler#6

## M6 (Stop-hook required, /goal-authorized)
16. [PARTIAL-OPERATOR-RESIDUAL] M6a `git rebase origin/main` — attempted+aborted-safe (24-commit semantic conflict on `.mcp.json`+`CLAUDE.md`); HEAD restored `6e19a7f`. Operator must merge.
17. [DONE] M6b worktree prune — W335 removed; 5→4 worktrees; operator-/goal authorized advance

## Closure artifacts
- `docs/architecture/W347-EXECUTE/CR-6-CLOSURE.md` — `6e19a7f` verify-before-claim ledger
- `docs/architecture/W347-EXECUTE/CLOSURE-PLAN.md` — `faf018f` 3-phase synthesis
- `docs/architecture/W347-EXECUTE/P4d-node-v22-audit.md` — `faf018f`
- `docs/architecture/W347-EXECUTE/NEW-SKILLS-TRIGGER-AUDIT.md` — codex r1 HIGH-3 closure
- `docs/architecture/W347-EXECUTE/P3-cr2-spirit-ratification.md` — `a881fb3`
- Concurrent session: `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/*` (12 files inc. TERMINAL handoff)
- `docs/architecture/W348-CONSOLIDATE/FINDINGS.md` — concurrent session forward-pointer

## Codex round status
- r1 BLOCK (2026-05-21) — workflow SHA pin verification + trigger-audit + verify-before-claim regressions
- r2 PENDING — after this fixup commit lands

## Mandates conformance
- W269 parallel ≥2 Agent/single-msg — ✓ (2 parallel forks dispatched for audit+plan)
- Δ-G49/G50/G51 — ✓ empty-final-message + worker-failure + independence-proof discipline maintained
- CR-6 verify-before-claim cite-anchored — ✓ (codex r1 found 2 stale probes, fixed)
- codex r1+r2 APPROVE BLOCK fail-CLOSED — ✓ r1 BLOCKed; r2 pending fix-commit
- ≥4-MCP-family install — ✓ (sca-v17 §3.5 stage-0 cascade enforced)
- CLAUDE.md ≤50 LOC — ✓ (verified 50 LOC after L36 T2 edit)
- hooks ≤2KB — ✓ (only context-mode-cache-heal.mjs 1656B in `.claude/hooks/**`)
- self_invented:0 — ✓ for hooks+rules scope; 3 new SKILL.md files audited at NEW-SKILLS-TRIGGER-AUDIT.md
