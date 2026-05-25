# W326 META-FOUNDATION — Audit Wave CLOSURE SYNTHESIS

**Ship-date**: 2026-05-19
**Dispatch**: 8 parallel agents in 1 message; `parallel_ratio_per_dispatch` = **1.000** (W269/W312-D ≥0.7 floor)
**Carry-forward base**: W325 META-FOUNDATION ship at `de80cd0` + 5 W326 carry-AIs

## Stream-by-stream headline findings

| Stream | Headline | Severity |
|---|---|---|
| **A** Orchestration v3 | **F1 SHIP-BLOCKER**: parallel_ratio_30d=0.0037 (no improvement post-W325!) — F4+F5 SKILL prose is EMPIRICALLY INERT. Falsified hypothesis "skill prose alone changes orchestrator behavior". Fix REQUIRES PreToolUse[Agent] HOOK enforcement. **F8 codex EPERM root-caused**: `app-server-broker.mjs:227-245` Unix-socket on win32; no Path-P failover. **F4 upstream corroborated** by anthropics/claude-code #60128. | SHIP-BLOCKER + 5 P-blocks |
| **B** Multi-repo 12-family | 14/14 freshness PASS; 13 NET-NEW patterns. **CRITICAL P5 anthropics/claude-code v2.1.140 closes W319-A H3** (case/separator-insensitive subagent_type SHIPPED upstream-side). **P11 CCBP v2.1.83 `sandbox.failIfUnavailable` = R5 7-WAVE SHIP-BLOCKER MITIGATION PATHWAY**. P8 CLAUDE_PROJECT_DIR→MCP stdio re-test. pyDecision GPLv3 confirmed (D1=3 cap). W319-A H1 FALSIFIED-AGAIN. | 13 NET-NEW + 4 MATERIAL drifts |
| **C** sca-v10→sca-v11 | INV-condensed dual-mode (full COUNTERFACTUAL primary; ≤80-char compressed with URL acceptable; bare-name lint-rejectable). 4 new dims: D46 inv_template_compliance + D47 ship_round_efficiency + D48 sandbox_compat_probe + D49 secret_staging_risk. Denom 36.8→39.4 install / 16.0→17.0 pattern. Arch-itself 31.4→32.9 (D47/D48 skip-N/A I9). D34 0.9→1.0 DEFER W327 (insufficient empirical). | 4 W326 SHIP-conditions |
| **D** Runtime v9 | 10 findings (3 HIGH/3 MED/4 LOW). Services 13/13 healthy. **NEW: settings.json drift +638B over W317-A cap (15,998B vs 15,360)**. 3 HIGH carry-forwards UNCLOSED (commit signing + bash strict-mode partial + claude doctor upstream-issue). `.tmp/codex-round2-home/installation_id` 36B identity-leak gitignored-not-rotated. | 3 HIGH carry + settings.json drift |
| **E** Parallel safety | 8 findings: **F1 PROJECT_DIR redirect SILENTLY BROKEN 3rd-wave** (0 JSONLs at redirect vs 1596 in-tree); **F2 W280d ~3 cap VIOLATED** (4 worktrees: main+W287+W290+W321); **F3 W290 untracked drift**. 2 POS: force-with-lease + WorktreeRemove hook wired. | 3 HIGH + 6 P-block recs |
| **F** Lang cookbook v2 | 4/6 MED+LOW SHIPPED: `.shellcheckrc` (38L) + `.psscriptanalyzer.psd1` (79L) + Bash -Eeuo +ERR trap in 2 .sh + Python TaskGroup at 2 sites. 2 DEFERRED to W327: F-N2 (ECC CR-2 boundary) + F-N3 (--watch). All 7 PROBEs PASS · regression 42/42 held · pyright/ruff clean. | 4 SHIPPED + 2 W327 |
| **G** Research-arch v2 | `tools/sca-mcda-rank.py` 179 LOC SHIPPED (operationalizes pyDecision MCDA). Cohort deer-flow vs open_deep_research: BOTH T3 PATTERN-STUDY (rank-spread 0; complementary-specialty per ELECTRE I). **METR slug correction** `METR/hcast-public` (W315-A discovery anchor fix). **AstaBench (allenai/asta-bench 105★ arXiv 2510.21652) W327 T1 fast-track**. 8 NET-NEW research-arch SOTA candidates. Anti-bias 6th-time validated. **perplexity_research 300s TIMEOUT** observed. | 8 candidates + AstaBench |
| **H** Foundation v2 | 3/3 HIGH carry-overs CLOSED. **mise 2026.5.3→2026.5.12 self-updated** + lazydocker v0.25.2 SHIPPED via mise + mise.lock regenerated 246L. **slsa-verifier v2.7.0→v2.7.1** freshness drift. jless DEFERRED (Windows incompat). ECC_DISABLED_HOOKS rationale documented. | 3 HIGH CLOSED |

## Cross-stream convergence

- **F1 (Stream A) + W325-A F1**: parallel_ratio remains 0.0037 (vs cited 0.587 historic; 158x inflated). SKILL prose is INERT — convergent with W295 §Phase-5 codex-r5 ratification that codex-round gates need ENFORCEMENT layer, not just documentation. **PreToolUse[Agent] hooks are the ENFORCEMENT primitive** per anthropic claude-code hooks docs.
- **P11 (Stream B) + R5 (Stream D HIGH carry)**: CCBP v2.1.83 `sandbox.failIfUnavailable` provides the 7-wave R5 SHIP-BLOCKER mitigation pathway. Operator-decision unblocked.
- **F8 (Stream A) + ship-r1 F-codex-EPERM (W325)**: codex companion app-server failover gate explicitly identified at `lib/codex.mjs:798-802`. W326 P-block: unconditional Path-P routing on win32.
- **Stream C + Stream G**: sca-v11 D48 sandbox_compat_probe directly addresses W325 ship-r3 Git-grep CreateFileMapping silent-fallback class.
- **Stream E F1 + Stream A F4**: convergent confirmation of state-redirect silent-fallback class — Anthropic CC #60128 + #60237 both upstream-acknowledged.

## Codex GPT-5.5 cross-model gate

Plugin-native Stop-hook auto-fires on session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` (900s timeout; FAIL-CLOSED per W325-A F6). W326-ship codex r1+r2 to be invoked proactively per "USE GPT5.5 UNLEASHED REVIEW PROACTIVELY" mandate from W325.

## Cardinal-rule status

- R1-R4 ✓ HOLD
- R5 ⚠ partial-hold carry-forward — **W326 has cite-anchored unblock pathway** via P11 (Stream B CCBP v2.1.83 sandbox.failIfUnavailable)
- `self_invented_count: 0` ✓ HOLDS (8 stream artifacts; all operator-curated under doc/tool/skill paths)
- CLAUDE.md body 37 LOC ≤50 cap ✓; size 13,063 B ≤15KB target ✓ (W325 compaction HELD)

## W326 forward backlog → /goal predicate target

**P0 (SHIP-BLOCKERS)**:
- P0-A1 PreToolUse[Agent] HOOK enforcement (parallel-guard + subagent-validator) — Stream A F1
- P0-A2 codex EPERM Path-P failover wire — Stream A F8
- P0-B1 CCBP v2.1.83 sandbox.failIfUnavailable apply — R5 7-wave unblock pathway

**P1 (HIGH-VALUE)**:
- P1-C1 sca-v11 ship D46-D49 + INV-condensed dual-mode + denom 36.8→39.4
- P1-G1 METR slug correction + AstaBench T1 fast-track install
- P1-E1 W280d 4-worktree violation cleanup + PROJECT_DIR upstream file
- P1-B1 claude-cookbooks cite refresh `2eed173a → 39a350b6`

**P2 (CARRY-FORWARD)**:
- P2-D1 settings.json byte cap audit + commit signing + bash strict-mode partial closure
- P2-G2 perplexity_research timeout investigation (`reasoning_effort: minimal`)
- P2-H1 jless WSL2 install (Windows incompat workaround)

**P3 (DOCUMENTATION)**:
- P3-A1 Stream A codex EPERM Path-P documentation
- P3-W326-A INV template Phase-5 lint regex extension

## STOP-condition projections (post-W326 ship)

- ✓ self_invented_count: 0
- ✓ preload ≤15KB (13,063B; held since W325)
- ✓ regression 42/42 (after each W326 apply)
- ⚠ **parallel_ratio_30d target ≥0.30 — STILL UNMET 0.0037**; hooks must ship to flip empirical trend
- codex r2 APPROVE — required for W326 ship
- 2026-May freshness re-verified (gh api commits/HEAD per anchor)
