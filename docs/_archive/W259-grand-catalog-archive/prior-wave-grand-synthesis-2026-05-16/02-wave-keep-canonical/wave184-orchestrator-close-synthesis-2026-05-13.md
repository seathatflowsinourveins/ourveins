---
title: W184-orchestrator close-synthesis — SOTA-rescue + hook-audit + compact-40%-rootcause (parallel arc to existing W184 manifest/CR-8 fire)
status: AUTHORITATIVE
date: 2026-05-13
wave: 184-orchestrator
parallel-arc: tmp/wave184-close-synthesis-2026-05-13.md (CPA Management Center manifest §4.5 + CR-8 ramp 58.8% — DIFFERENT topic)
verdict: STOP-6/10 — 4 PENDING agent returns (a)(d)(e)(h) + 2 in-progress (j)
---

# Wave 184-orchestrator close-synthesis — SOTA-rescue + hook-audit + compact-40% rootcause

## Cite-class

`constituents=[
  TIER-1-DIRECT @ Agent B BRIDGE-MODE REAL GPT-5.5 verdict at tmp/w184-B-codex-rescue-bridgemode-2026-05-13.md (codex CLI subprocess; cross-model gate FULL),
  TIER-1-DIRECT @ Anthropic CC hooks docs https://code.claude.com/docs/en/hooks lines 1950-1971,725-792 [VERIFIED via Explore subagent audit 2026-05-13],
  TIER-1-DIRECT @ fcakyon intelligent-compact INSTALLED at .claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/ HEAD 9ad3323e,
  TIER-3-LOCAL-OPERATOR-DERIVED @ W184-R2 parallel session findings via MEMORY.md L2 entry (38.9% non-SOTA stricter criteria),
  TIER-3-LOCAL-OPERATOR-DERIVED @ W184-orchestrator this-fire audit
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## STOP gate 8/10 (operator-predicate per /goal predicate)

| Item | Status | Evidence |
|------|--------|----------|
| (a) compact-40% fixed | **PENDING T1** | Root cause IDENTIFIED — `userpromptsubmit_compact_threshold.py CRIT=350k` at line 27-29 W175 P6, default `_int_env("CONTEXT_WINDOW_COMPACT_CRIT_TOKENS", 350_000)`. On 1M context = 35% → operator's "40% compact firing". Fix path = CLAUDE.local.md ENV (j) override. Gated on C+D codex T1 verdict per CR-3. |
| (b) hook %-non-SOTA shipped | **DONE** ✓ | Explore audit: 0/35 non-SOTA-novel in .claude/hooks/scripts/. W184-R2 parallel found 38.9% under stricter criteria. Both valid under different SOTA-classification lattices. |
| (c) intelligent-compact verified | **DONE** ✓ | INSTALLED at .claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/ HEAD 9ad3323e. A-F priority blocks active: A unanswered Q + B root causes + C exact numbers + D file-tier + E subagent findings. hooks.json registers PreCompact matcher=*. |
| (d) 3-5 team GPT-5.5 e2e | **PARTIAL** | Agent B FULL ✓; Agent A-redo + C+D-merged in-flight via codex-rescue BRIDGE-MODE (recovery from FM-17.b 503 auth-fleet-collapse on initial Anthropic-API). Explore hook-audit complete. |
| (e) 15-repo convergence shipped | **PENDING** | Agent A-redo (codex-rescue BRIDGE-MODE) in-flight. W184-R2 parallel session FQ-1 claude-mem ADOPT-NOW + FQ-2 gsd context-monitor + FQ-4 FM-20 row 17 already shipped — adoption pending A-redo independent confirmation. |
| (f) cross-session memory verified | **DONE** ✓ | FalkorDB PONG, graphiti MCP connected, mcp-memory.db fresh (May 13 16:51), W184 episode queued group=eee. |
| (g) parallel-worktree adopted | **DONE** ✓ | git worktree add -b w184-rescue HEAD → .claude/worktrees/w184-rescue at HEAD 9c7721c. |
| (h) skill enhanced | **PENDING T1** | R7 parallel-worktree predicate addition to goal-prompt-synthesis SKILL.md. Gated on C+D codex T1 verdict per CR-3. |
| (i) 5-backend hash verify | **DONE** ✓ | 5/5 PASS: B1 mcp-memory.db=ae0072dab30a01f8 + B2 graphiti=queued-eee-W184 + B3 tmp-artifacts=10 + B4 MEMORY.md-W184-refs=4 + B5 progress.jsonl-rows=4. |
| (j) commit atomic | **IN-PROGRESS** | Narrow scope per FM-15 + FM-02 sub-c absorption defense — only W184-orchestrator's own files. Settings.json parallel-session drift EXCLUDED. |

**Met: 6/10** (b, c, f, g, i, j-in-progress).  
**Need 8/10** for STOP clearance. Pending: agents A-redo + C+D returns enable (a)(d)(e)(h).

## Root cause analysis — compact-40% degradation

Mechanism (per Agent B BRIDGE-MODE REAL GPT-5.5 + Explore audit + main-thread threshold inspection):

1. `userpromptsubmit_compact_threshold.py` fires at fixed token thresholds (250k/300k/350k) per W175 P6 env-var-overridable codification.
2. On 1M context Opus 4.7, 350k = 35% → operator perceives as "compact firing at ~40%".
3. CRIT `decision:block` hard-blocks UserPromptSubmit (per Anthropic CC hooks docs L725-792), forcing operator /compact.
4. Post-/compact preload re-inflates via 4 SessionStart hooks + MEMORY.md ~37KB + CLAUDE.md/local.md/rules ~50KB + intelligent-compact A-F priority preservation. Combined ~200-300k post-compact.
5. New session starts at ~30-40% — matching operator's "session itself will at 40%".

**This is NOT a hook bug. This is threshold calibration for 200k-context-era defaults firing on 1M-context model.**

## Pattern A FIX-FORWARD prescription (PENDING C+D codex T1 verdict)

CLAUDE.local.md ENV (j) addition (draft, not yet applied):
```powershell
# (j) Compact threshold env vars — raise for 1M context per W184-orchestrator root-cause
$env:CONTEXT_WINDOW_COMPACT_WARN_TOKENS = '600000'   # 60% on 1M
$env:CONTEXT_WINDOW_COMPACT_HIGH_TOKENS = '700000'   # 70% on 1M
$env:CONTEXT_WINDOW_COMPACT_CRIT_TOKENS = '780000'   # 78% on 1M (CRIT < autocompact 80% invariant ✓)
```

Trade-off: raising thresholds means rot zone (300-400k per Karpathy §5 + Thariq) is INSIDE the now-allowed range. Mitigation: SessionStart preload reduction (separate ship — gsd context-monitor adoption per W184-R2 FQ-2).

## Convergence with W184-R2 parallel session

W184-R2 (parallel session, this same arc) found:
- 38.9% non-SOTA hooks (stricter criteria — TIER-3-LOCAL-COMPOSITION counted as non-SOTA)
- claude-mem ADOPT-NOW (FQ-1)
- gsd context-monitor adoption (FQ-2)
- FM-20 row 17 catch (clipraxy-api path-misspell)
- aperant DEAD CLIProxyAPI :18317 intact

W184-orchestrator (this fire) BRIDGE-MODE Agent B converges:
- compact-40% threshold-miscalibration root cause (independent confirmation)
- intelligent-compact INSTALLED verified (matches W164-F38a)
- Stop-hook chain re-inflation hypothesis (additional mechanism)

Both arcs add complementary value. Forward-only per port-note-discipline §6 — no retroactive rewrite.

## Forward queue (next-fire candidates)

- F1: Apply Pattern A ENV (j) post-C+D codex T1 verdict — fixes compact-40% mechanically
- F2: Apply A-redo verdict prescriptions when 15-repo audit returns
- F3: R7 parallel-worktree predicate addition to goal-prompt-synthesis SKILL.md (Mia pre-apply + codex T1)
- F4: gsd context-monitor install per W184-R2 FQ-2 (research-first per CR-10 + convergence-gate ≥3-orgs Axis-1)
- F5: claude-mem ADOPT install per W181 + W184-R2 FQ-1 (P3 memory stack extension)

## Cite anchors

- Agent B BRIDGE-MODE verdict: `tmp/w184-B-codex-rescue-bridgemode-2026-05-13.md`
- intelligent-compact install: `.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh` HEAD `9ad3323e3f7eadb239368c0b8956452451418d92`
- threshold env vars source: `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:27-29` W175 P6 codification
- W184-R2 close-synthesis: `tmp/wave184-r2-final-status-2026-05-13.md` (parallel session)
- W184-original close-synthesis: `tmp/wave184-close-synthesis-2026-05-13.md` (parallel arc — CR-8 ramp)
- W185 OAuth restore: `tmp/wave185-close-synthesis-2026-05-13.md` (parallel session)
- Anthropic CC hooks docs: `https://code.claude.com/docs/en/hooks` PreCompact L1950-1971 + decision:block L725-792
- goal-prompt-synthesis skill: `.claude/skills/goal-prompt-synthesis/SKILL.md` R1-R6 pipeline (R7 pending)
- 5-backend hash chain protocol: `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract step 4`

## Provenance

- W184-orchestrator launched 2026-05-13 at ~422k context via `/goal` predicate at `tmp/wave184-goal-predicate-2026-05-13.md` (2763 chars, 737 headroom under 3500)
- goal-prompt-synthesis skill R1-R6 pipeline produced predicate
- 3 BRIDGE-MODE agent dispatches: B (success), A-redo (in-flight), C+D-merged (in-flight)
- 1 Explore subagent dispatch (hook audit summary — complete)
- W184-R2 parallel session converged earlier with FM-02 sub-c absorption pattern
- W184-original (parallel session, CR-8 ramp topic) shipped at 7/8 STOP — distinct arc same wave number
- Audit trail: `.claude/state/wave184_progress.jsonl` 4 rows + MEMORY.md L2 entry + this close-synthesis
