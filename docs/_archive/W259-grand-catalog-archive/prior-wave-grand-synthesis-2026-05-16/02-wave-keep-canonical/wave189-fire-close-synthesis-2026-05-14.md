# W189 ARCH-SOTA-CLEANUP — Fire Close-Synthesis
# Date: 2026-05-14 | Runtime: Z:/claude-sota-installed | Arc: W189 (this session's W189 arc)
# Distinct filename per FM-02 (a parallel W189 session has tmp/wave189-close-synthesis-2026-05-13.md)

## Outcome: 3/3 priorities SHIPPED-WITH-CONVERGENCE

| Priority | Commit(s) | Cross-model T1 | STOP-gate |
|---|---|---|---|
| P0 hook-layer SOTA-tier audit | a5662a2 | APPROVE conf=0.97 | MET |
| P1 compact-remind calibration + PostToolUse monitor | f4d92d6 + ee7cb09 | APPROVE conf=0.93 | MET |
| P2 post-compact preload + STUDY-PILOT eval | (artifact — verify-class, no code commit) | APPROVE conf=0.91 | MET |

All 3 cross-model T1s ran orchestrator-direct `codex exec` foreground+tee (REAL GPT-5.5) — codex-rescue
BRIDGE-MODE subagents FM-17.e-thrashed n=2 in the /goal-synthesis fire, so the goal's authorized
orchestrator-direct fallback was used throughout. CR-3 cross-model gate satisfied per Phase 1 bootstrap exception.

## Key findings (the operator's concerns, tested)

1. **"Many rot / low quality context damaging your runtime" — REFUTED at the hook layer.** 41 hook
   files: 61.0% TIER-1-DIRECT, 39.0% sibling cite-import-AMBER (an acceptable tier per CR-12 TERTIARY +
   Section 14.5), **0% novel/uncited, 0 removals**. Mia pre-apply 3-pass verification collapsed 19
   classifier-flagged "not-SOTA" hooks → 0 genuine problems (16 WEAK-HDR flags were classifier
   false-negatives — would have churned 16 hooks needlessly if the raw classifier were trusted).
   Only actionable item: 1 cite-format upgrade (fm17_class_lint.py).

2. **"Compact-remind hooks damaging the advanced full automative workflow" — REFUTED.** Agent A's
   audit + Mia-verified wire-status: 4 of 6 compact hooks were DORMANT (unwired) — not aggressive.
   Threshold calibration was already fixed at W187 round-2 (600k/650k/700k for 1M; 3 token-scale
   surfaces agree). `userpromptsubmit_compact_threshold.py` is advisory-only (no decision:block at
   CRIT — the 2 "decision:block" Grep hits were comments). The actual compaction pain traces to
   CC-native autocompact + the already-reverted `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` env (W183 F1),
   NOT the hooks. **The real fix was the opposite of "calm the hooks": wire the dormant advisory
   layer + add the genuinely-missing PostToolUse continuous monitor.**

3. **"Your works will not be forgot in different sessions" — GENUINE for 2 of 5 memory backends.**
   P2 5-backend verification: provenance log / tmp/ artifacts / .claude/state/*.jsonl all LIVE;
   **mcp-memory + graphiti both EMPTY** (`memory_search` + `get_episodes group_ids=["eee"]` returned
   no content). The file-based Karpathy 3-layer wiki IS the working persistence layer; the 2 MCP
   memory backends are inert. Repair flagged as a follow-up fire (P2 scope was verify-not-repair).

## What shipped

- **P0**: classification of all 41 hooks + per-hook KEEP/REWRITE/REMOVE table (tmp/wave189-P0-hook-audit-2026-05-14.md)
  + 1 cite-format upgrade (fm17_class_lint.py → canonical `# Reference:`). Backup tag w189-pre-cleanup @ 8de923b.
- **P1**: NEW `.claude/hooks/scripts/posttooluse_context_monitor.js` — cite-adapt of gsd-build/get-shit-done
  `gsd-context-monitor.js @ HEAD 3aaed8f5` (MIT, Lex Christopherson) — the genuinely-missing PostToolUse
  continuous context-monitor (advisory/silent-fail/debounced; bridge-remapped to context_window_sidecar.json;
  thresholds env-derived). Already firing. + settings.json 3 wirings (PostToolUse / UserPromptSubmit /
  PreCompact — activating the dormant advisory layer; all 3 Mia-verified advisory/non-blocking before wiring)
  + context_window_guard.py stale defaults 25/30→60/70 + CLAUDE.local.md ENV(j) CCBP claude-settings.md:826,967
  re-source. P1 RESIDUAL (recommendation, risk-staged per cardinal-rule-9 + launch-discipline D1): WIRE
  precompact_guard.py (decision:block — the auto-compact-discipline Rank #3 anti-blind-autocompact / FM-17.e
  defense) in its own careful cross-model-T1'd fire.
- **P2**: 5-backend verification + HISTORICAL-REFERENCE guard check + 3 STUDY-PILOT SRA verdicts
  (tmp/wave189-P2-preload-studypilot-2026-05-14.md): gsd context-management (STUDY-PILOT/PARTIAL-OVERLAP),
  wshobson context-management (STUDY-PILOT/PARTIAL-OVERLAP), alirezarezvani engineering pod
  (STUDY-PILOT-general/REJECT-for-compact-gap). 0 ADOPT-NOW — cite-adapt only, no wholesale install.

## Agent team / dispatch ledger

- /goal-synthesis fire: 3 agents (sota-researcher A delivered; codex-rescue B+C both FM-17.e autocompact-thrash).
- W189 P1 fire: 2 sota-researcher agents (A compact-chain audit + B gsd-monitor design — both delivered).
- 5 cumulative dispatches. All cross-model T1s + the hook classification went orchestrator-direct
  (codex-rescue BRIDGE-MODE unreliable this arc — FM-17.e n=2).

## Mia pre-apply catches (the discipline paid off repeatedly)
- P0: classifier flagged 19 "not-SOTA" → Mia 3-pass verification → 0 genuine problems.
- P1: classifier flagged userpromptsubmit_compact_threshold.py as block-emitter → Mia Grep showed the
  matches were comments → confirmed advisory-only, safe to wire.
- P1: wire-status Mia probe (errored grep → re-verified via Node) → confirmed 4 hooks genuinely unwired.

## Parallel-arc cite chain (FM-02)
A parallel session ran a concurrent W189 arc — commits `b3a8542` + `a305c95` (manifest §17 column work)
+ artifacts `tmp/wave189-close-synthesis-2026-05-13.md` + `tmp/wave189-final-goal-2026-05-13.md`. This
session's 3 commits (a5662a2 / f4d92d6 / ee7cb09) used narrow `git commit --only` per FM-02 absorption
defense — stayed isolated from the parallel arc's manifest work. No collision; the two arcs touched
disjoint surfaces (this arc: hooks + settings.json hook-arrays; parallel arc: manifest §17).

## Residuals (follow-up fires — NOT W189 STOP-blockers)
1. precompact_guard.py wiring (decision:block hook — risk-staged per cardinal-rule-9; recommend WIRE in own fire).
2. mcp-memory + graphiti empty-backend repair (investigate /mcp status + whether anything calls
   memory_store/add_memory on iter-close; the file-based layer works, the MCP layer is inert).
3. Pre-existing Pyright diagnostic at context_window_guard.py:58 (NOT W189-introduced — discovered, noted).
4. subagent_stop_telemetry.py pre-existing import-sort ruff finding (NOT W189-introduced — discovered, noted).
5. manifest §13 CR-8 status column for hooks (P0 sub-bullet deferred — not a STOP-gate item).
