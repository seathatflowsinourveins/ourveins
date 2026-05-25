# W327 COOKBOOK-WAVE — CLOSURE SYNTHESIS

**Ship-date**: 2026-05-19
**Dispatch**: 8 parallel agents (2 batches: A/B/C/D then E/F/G/H); parallel_ratio_per_dispatch = 1.000
**Theme**: Comprehensive cookbook (git + bash + CLI + gitnexus + future-pickup + local-patch + operator-action) for future-session seamless SOTA pickup

## Stream-by-stream headlines

| Stream | Headline | W327 P-block recs |
|---|---|---|
| **A** Git cookbook | 12-item matrix: 4 HAVE / 2 PARTIAL-TRAP (dup `pull.rebase`, delta-installed-not-wired) / 5 GAP (SSH sign, 0 aliases, reflogExpire default, git-recent/extras, delta config) | 5 P-blocks |
| **B** Gitnexus integration | License Gate-A PASS (PolyForm-NC §Personal); UNIQUE PreToolUse auto-graph-enrichment; 13 MCP tools incl 2 multi-repo (group_list/sync); Neo4j MCP NOT a substitute. **RECOMMEND ENABLE-CONDITIONAL** | smoke + augment-sample-review |
| **C** Bash + CLI cookbook | **16/16 essentials INSTALLED** (gap was stale); 10-item Bash defensive checklist; mise + direnv auto-trust; shell-init for ~/.bash_profile + $PROFILE with 6 alias rebinds | 3 P0 AIs |
| **D** Future-session pickup | CLAUDE.md pointer-sufficient; **CRITICAL: L46 VERDICT-LEDGER.md path STALE** (actually at docs/architecture/W288-RESEARCH-ARCH-v2/) → W327 P0 fix; Auto Memory KEEP DISABLED; SessionStart hooks CR-2-bounded | 3 P0 AIs |
| **E** Codex EPERM local-patch | Root-cause CONFIRMED `codex.mjs:798` hard-gate; **In-tree precedent**: `broker-lifecycle.mjs.pre-wave80-245` = operator-canonical local-patch path; 8-LOC env-gated patch (`CODEX_SKIP_APPSERVER_PROBE=1`) ready | P0 local-patch + reapply-shim |
| **F** P2/P6/PROJECT_DIR action | **P2 APPLIED** (sandbox.failIfUnavailable: false → true; dormant-safe per Anthropic doc); **W321 IS LIVE SHIP LINEAGE** (NOT stale; 183 commits ahead); P6 target: W287+W290 cleanup; PROJECT_DIR mklink /J mitigation | 4 P-blocks |
| **G** sca-v11 → sca-v13 | sca-v12 already shipped by parallel session; G evolves to v13 (D34 0.9→1.0 + D50 probe_executability + D51 future_session_pickup). **Denom math: 40.5 install (not 40.4 per operator)** / 17.8 pattern / 32.9 arch-itself | G1-G6 (2 P0 / 2 P1 / 1 P2 / 1 P3) |
| **H** CLAUDE.md cookbook pointer | 13,095 B / 50 LOC; margin 2,265 B; 7-of-8 W327 areas need pointers; Option (b) inline-merge L30 (+340 B; preserves 50-LOC cap; final ~13,435 B); 0 new skills needed | Apply Edit AFTER A/B/E/F/G land |

## Cross-stream convergence

- **Stream E + W326-A F8**: codex EPERM root-cause → local-patch (8-LOC) is operator-preferred (vs upstream-PR-only) per in-tree precedent at `broker-lifecycle.mjs.pre-wave80-245`. Pivot away from upstream-only.
- **Stream F + R5 7-wave carry**: `sandbox.failIfUnavailable: true` APPLIED dormant-safe; the actual R5 SHIP-BLOCKER = `permissions.defaultMode` flip (`bypassPermissions` → `default`); operator-decision territory clarified per sandbox-level scope.
- **Stream A + Stream C + Stream H**: cookbook coverage complete; CLAUDE.md pointer block inline-merge captures all.
- **Stream D F1 + Stream A worktree**: 4-worktree breach + STALE VERDICT-LEDGER.md path both same root-cause = doc-pointer staleness over time. Need W327 P0 path-fixes.
- **Stream G + sca-v12 parallel-ship**: sca-v13 evolution captures D34+D50+D51 advances; reconcile parallel-session ship with my Stream G spec.

## Cardinal-rule status

- R1-R4 ✓ HOLD
- R5 7+ wave SHIP-BLOCKER carry-forward: **sandbox-level scope NOW CLARIFIED** (4-layer model: defaultMode + sandbox.enabled + failIfUnavailable + subagent isolation). Stream F P2 dormant-safe APPLIED. Operator-decision: flip `defaultMode "bypassPermissions" → "default"` for production sessions (keep bypassPermissions for autonomous /loop ticks)
- `self_invented_count: 0` ✓ HOLDS
- CLAUDE.md ≤15KB MET (13,095 B / 50 LOC; margin 2,265 B for cookbook pointer)

## W327 forward backlog → /goal predicate target

**P0 SHIP NOW**:
- P0-E1 codex EPERM local-patch (8 LOC + reapply-shim)
- P0-A1 git aliases bundle + delta wiring (Stream A P1)
- P0-A2 SSH commit signing (closes W325/W326 carry-forward 8+ wave)
- P0-D1 VERDICT-LEDGER.md L46 path fix (stale-pointer)
- P0-F1 W287 worktree cleanup (CLEAN-safe; W321 KEEP per LIVE-lineage)
- P0-H1 CLAUDE.md cookbook pointer inline-merge L30 (+340 B)

**P1 HIGH-VALUE**:
- P1-B1 gitnexus ENABLE-CONDITIONAL smoke + augment-sample review
- P1-C1 Bash defensive 10-item application to 2 .sh
- P1-C2 shell-init ~/.bash_profile + $PROFILE
- P1-G1 sca-v13 D34+D50+D51 ship
- P1-F2 PROJECT_DIR mklink /J mitigation
- P1-A3 history-hygiene config block (merge.ff=only + rebase.autoStash=true + rerere)
- P1-A4 lazygit config.yml + delta integration

**P2 OPERATOR-DECISION**:
- P2-R5 permissions.defaultMode flip (`bypassPermissions` → `default`)
- P2-W290 worktree reconcile-then-remove (DIRTY untracked W295-AUDIT docs)
- P2-B2 W321 worktree retention rationale (LIVE ship lineage; document why not removed)

**P3 W328+ DEFER**:
- P3-A1 lefthook pilot (pre-commit healthy; 5-10× faster but no acute need)
- P3-G2 sca-probe-runner.mjs implementation (Stream G spec only)
- P3-C2 4-tool gap (fx + dog + git-recent + diff-so-fancy)

## STOP-condition projections (post-W327 ship)

- ✓ self_invented_count: 0
- ✓ preload ≤15KB MET
- ✓ regression 42/42 PASS (after each apply)
- ⚠ parallel_ratio_30d: HOOK ENFORCEMENT NOW LIVE (W326 P0); empirical trend re-baseline W328+
- codex r1+r2 APPROVE — required for W327 ship
- 2026-May freshness re-verified
