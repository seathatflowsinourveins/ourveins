# W189 ARCH-SOTA-CLEANUP — RESUME CHECKPOINT (2026-05-14, updated post-P1-completion, ~7% context)

Stop hook ACTIVE: W189 — STOP requires P0+P1+P2 all shipped-with-convergence + Mia-clean + parallel-arc cite chain. Arc continues post-compact.

## DONE

### P0 — HOOK-LAYER SOTA-TIER AUDIT — SHIPPED (commit a5662a2)
- Backup tag w189-pre-cleanup @ 8de923b. 41 hooks classified: **61.0% TIER-1-DIRECT / 39.0% sibling cite-import-AMBER (acceptable per CR-12) / 0% novel-uncited / 0 removals.** Operator "rot" concern REFUTED at hook layer.
- 1 cite-format upgrade (fm17_class_lint.py). Cross-model T1 APPROVE 0.97. T2 passed. T3 needs-attention(E501) REFUTED via concrete ruff check. Mia collapsed 19 classifier-flagged → 0 genuine.
- Artifact: tmp/wave189-P0-hook-audit-2026-05-14.md. Tasks #237 #238 COMPLETED.

### P1 — COMPACT-REMIND CALIBRATION — SHIPPED, STOP-GATE MET (commits f4d92d6 + ee7cb09)
- **Key finding (Mia-verified): operator's "compact-remind hooks damaging workflow" REFUTED.** 4 of 6 compact hooks were DORMANT (unwired); calibration already fixed W187 round-2. Real fix = wire the dormant advisory layer.
- SHIPPED: NEW posttooluse_context_monitor.js (gsd-context-monitor.js cite-adapt @ HEAD 3aaed8f5, MIT — fills missing-PostToolUse-monitor gap; advisory/silent-fail/debounced; ALREADY FIRING) + settings.json 3 wirings (PostToolUse +posttooluse_context_monitor / UserPromptSubmit +userpromptsubmit_compact_threshold / PreCompact +precompact_hint_emitter — all Mia-verified advisory) + context_window_guard.py defaults 25/30→60/70 + CLAUDE.local.md ENV(j) CCBP claude-settings.md:826,967 re-source.
- **Cross-model T1 APPROVE conf=0.93, 0 findings, 0 prescribed_edits** (orchestrator-direct codex exec — verdict at .claude/state/codex_consult_w189_p1_compact_wiring_OUT.txt). T2 gates passed on both commits.
- P1 STOP-GATE MET: calibration fixed ✅ + gsd-monitor cite-adapted ✅ + codex T1 APPROVE ✅.
- Artifacts: tmp/wave189-P1-agentA-compact-chain-audit-2026-05-14.md + tmp/wave189-P1-agentB-gsd-monitor-design-2026-05-14.md. Task #239 COMPLETED.
- P1 RESIDUAL (recommendation, NOT STOP-blocker — risk-staged per cardinal-rule-9 + launch-discipline D1): WIRE precompact_guard.py into PreCompact (it emits decision:block — the auto-compact-discipline.md Rank #3 anti-blind-autocompact / FM-17.e defense). Its own careful cross-model-T1'd settings edit.

### P2 — POST-COMPACT PRELOAD + STUDY-PILOT — ARTIFACT WRITTEN (tmp/wave189-P2-preload-studypilot-2026-05-14.md), task #240 IN_PROGRESS
- 5-backend verification DONE: backends 3/4/5 (provenance/tmp/JSONL) LIVE; **backends 1/2 (mcp-memory + graphiti) EMPTY** — `memory_search` + `get_episodes group_ids=["eee"]` both returned no content. P2 FINDING: cross-session MCP memory persistence is NOT happening (operator's "works forgot in different sessions" concern REAL for those 2 backends). Repair = follow-up fire (out of P2 verification scope).
- HISTORICAL-REFERENCE guard: sessionstart_compact_hint_reader.py has STALE age-cap (L72) + fm20 cite (L24); KEEP-AS-IS per Agent A. Verbatim-string wrapper = enhancement candidate not gap.
- 3 STUDY-PILOT verdicts SHIPPED in artifact: gsd context-management (STUDY-PILOT/PARTIAL-OVERLAP) + wshobson context-management (STUDY-PILOT/PARTIAL-OVERLAP) + alirezarezvani engineering pod (STUDY-PILOT-general/REJECT-for-compact-gap). **0 ADOPT-NOW — cite-adapt only, no wholesale install** (matches goal P2 framing).

## REMAINING (resume here post-compact)
1. **P2 cross-model T1** — orchestrator-direct codex exec on the 3 STUDY-PILOT verdicts in tmp/wave189-P2-preload-studypilot-2026-05-14.md (deferred this fire — context budget ~7%). Write tight consult prompt → `codex exec --ephemeral --skip-git-repo-check --color never -p deep-review-exec < .claude/state/codex_consult_w189_p2_*.txt > ..._OUT.txt 2>&1` → mine verdict via ctx_execute (NOT bash tail — exploded twice; use `tail -c 3200`). Then mark task #240 COMPLETE.
2. **Arc close (task #241)** — close-synthesis at `tmp/wave189-fire-close-synthesis-2026-05-14.md` (DISTINCT filename — FM-02; a parallel session has wave189-close-synthesis-2026-05-13.md) + MEMORY.md L2 one-line pointer + docs/install-provenance.md append row + parallel-arc cite chain (acknowledge parallel W189 session: commits b3a8542 + a305c95 manifest §17 + their close-synthesis/final-goal artifacts).
3. (optional) P1 RESIDUAL — precompact_guard.py wiring (risk-staged; can be its own fire — NOT a W189 STOP-blocker).

## STOP-GATE STATUS: P0 ✅ | P1 ✅ (STOP-gate met) | P2 ~90% (artifact + verification + verdicts done; cross-model T1 pending) | arc-close pending.

## DISPATCH BUDGET: 5 cumulative agent dispatches this arc. Remaining work is orchestrator-direct (codex-rescue BRIDGE-MODE thrashed FM-17.e n=2; orchestrator-direct codex exec works — P0 T1 + P1 T1 both APPROVE'd cleanly that way).
## git log: a5662a2 (P0) / f4d92d6 + ee7cb09 (P1) — all narrow `--only` commits, FM-02-isolated from parallel W189 session.
