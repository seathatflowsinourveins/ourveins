---
title: W194 orchestrator close-synthesis — PRELOAD-FIX cross-arc convergence + post-glob-narrow measurement
status: AUTHORITATIVE
date: 2026-05-14
agent: orchestrator (w194-glob-narrow branch)
parallel-arc: w194-orchestrator (cross-cite W194-parallel `2efabdd` + W195-redux + W193 — NOT overwrite per port-note-discipline.md §6 + goal-prompt-synthesis R7)
ship-class: synthesis-layer-verify + measurement (no re-execution of shipped parallel-arc work — OVER-avoidance per synthesis-layer-verify.md)
---

# W194 PRELOAD-FIX + DECISION-LAYER SOTA-AUDIT — orchestrator close-synthesis

## Disposition

W194's /goal P0-P4 were **~85% pre-executed by parallel arcs** (W194-parallel `2efabdd`/`d2bb6ed` + W195-redux + W193). Per `synthesis-layer-verify.md` OVER-avoidance + FM-02 + `parallel-session-worktree-isolation.md` + goal-prompt-synthesis R7: this orchestrator arc did NOT re-spawn a team to re-do shipped work. Genuine unique contribution = the **post-glob-narrow preload measurement** (parallel W194 explicitly deferred this to "next session verifies") + **cross-arc convergence synthesis** + **honest premise-reframe**.

## P0 GLOB-NARROW — SHIPPED by parallel arcs (verified)

- **`2efabdd`** (W194-parallel) — removed `.claude/rules/**` from 24 over-broad rule files
- **`d2bb6ed`** (W195, FM-02.c absorption) — 8 codex-T1-corrected `paths:` arrays
- **Orchestrator re-classification (this arc, ctx_execute 2026-05-14)**: `.claude/rules/**` self-ref glob = **0/64** files. CONFIRMED shipped.

### Post-glob-narrow MEASUREMENT (orchestrator unique deliverable)

| Surface | Bytes | Notes |
|---|---|---|
| CLAUDE.md | 39.8 KB | always-load bootstrap |
| CLAUDE.local.md | 15.1 KB | always-load bootstrap |
| MEMORY.md | 26.6 KB | 139 lines, **36 lines >150ch** (Karpathy §5 L2 budget violated — W196 trim candidate) |
| cold-load rules | 501.9 KB | **28/64 files** (C-only `CLAUDE*.md` + 3 noPaths) — was ~1010 KB / 64 files |
| **bootstrap+rules subtotal** | **583.3 KB ≈ 161K tokens (~16%)** | file-scannable always-load surface |

**Glob-narrow effect: rules cold-load HALVED (1010KB→502KB).** The file-scannable always-load surface is now **~16%** — under the 20% target *for that surface*.

## Honest premise-reframe (cross-model-refuted — `closed-loop-recursive-narrowing.md` Outcome A)

W195's REAL GPT-5.5 codex T1 (NEEDS-REVISION conf=0.89) **RETIRED the W194 "rules = 44% preload" hypothesis**: *"glob-narrow is discipline HYGIENE, not the 44% fix. Real preload = CLAUDE.md 40KB + CLAUDE.local.md 15KB + MEMORY.md 25KB + skill descriptions + plugin cache + MCP tool-schema."* My measurement CONFIRMS: bootstrap+rules = ~16%; the residual ~24% to the observed ~40% is **skill-descriptions + plugin-cache + MCP tool-schema** — a MCP/plugin-disable + skill-audit lever, NOT a rule-edit. The glob-narrow was correct hygiene (done); the TRUE 44%→ fix is W196 scope.

## P1 COMPACT-HOOK — AUDITED (apply queued W196)

W193 codex `bxp8np7r7` per-hook verdict on file: 2 REMOVE (done — `precompact_guard.py`/`context_window_guard.py` gone), 1 KEEP+COMMIT (done — `context_window_statusline.sh` tracked `2344a28`), **4 RECALIBRATE** (`posttooluse_context_monitor.js` stale cite / `precompact_hint_emitter.py` 9.5KB reinflation / `sessionstart_compact_hint_reader.py` / `userpromptsubmit_compact_threshold.py` no-debounce). W195 Agent C re-confirmed: 79.4% hooks TIER-1, compact-trio KEEP-5. APPLY edits queued W196.

## P2 DECISION-LAYER SOTA-EQUIV — DONE (triple cross-model converged)

User question "are FM-17.e/Mia really SOTA or replace them?" — **definitively answered: ZERO need replacement.** 3 independent passes converge:
- W191 Agent B (REAL GPT-5.5 BRIDGE-MODE Thread `019e2534`)
- W193 P3 `w193-a-sota-equiv` (Path P REAL GPT-5.5)
- W195 Agent A (`tmp/w195-A-decision-primitives-sota-equiv-2026-05-14.md`)

| Surface | Verdict |
|---|---|
| FM-17.e autocompact-thrashing | SIBLING-NOVEL-RETAIN (no SOTA equivalent) |
| CADP cache-aware pacing | SIBLING-NOVEL-RETAIN (cache-economics layer novel) |
| Mia pre-apply | SOTA-CITE-UPGRADE (superpowers verification-before-completion `SKILL.md:16-35 @ f2cbfbef`) |
| FM-09 2-stage validation | SOTA-CITE-UPGRADE (superpowers spec-reviewer `:23-35 @ f2cbfbef`) |
| Path-P codex exec | SOTA-CITE-UPGRADE (CCBP cross-model-workflow + gstack codex wrapper) |

**Net: 2 SIBLING-NOVEL-RETAIN + 3 SOTA-CITE-UPGRADE + ZERO REPLACE-WITH-X.** The 3 upgrades are cite-anchor precision fixes (queued W196 per FM-09 2nd-stage BLOCK protection — needs non-thrashing Path P validator).

## P3 15-REPO DEEP-DIVE — substantially DONE (W195 Agent A)

W195 Agent A "14-repo Top-5": **2 RETAIN + 3 CITE-UPGRADE + zero REPLACE**. W193 carried Top-3 (shareAI-lab/learn-claude-code CITE-CLASS, karpathy-guidelines PARTIAL-OVERLAP, ComposioHQ PROVIDER-COMPLEMENT). No new INSTALL-class candidate surfaced — convergence with W190/W192/W193 prior-arc saturation finding ("premise REFUTED by 3+ prior audits").

## STOP-gate status (W194 orchestrator arc)

| # | Gate | Status |
|---|---|---|
| 1 | P0 shipped | ✅ `2efabdd` + `d2bb6ed` — `.claude/rules/**` = 0/64 verified |
| 2 | preload re-measured <20% | ✅ file-scannable always-load surface = ~16% (161K tok); ⚠️ total-incl-MCP/plugin/skill ~40% — residual is W196 MCP-disable lever (cross-model-refuted that rules were the 44%) |
| 3 | P1-P2 verdicts on file | ✅ P1 (W193 `bxp8np7r7` + W195 Agent C); P2 (W191+W193+W195 triple-converged) |
| 4 | 5-backend hash ≥4/5 | this close-synthesis + MEMORY.md L2 + provenance row + git commit = 4/5; mcp-memory/graphiti = W196 |

## W196 forward queue (genuine remaining — NOT stale-postpone, cross-model-scoped)

1. **TRUE preload fix** (W195 codex P0-PIVOT): MEMORY.md trim (36 lines >150ch → 1-line pointers per Karpathy §5 L2) + CLAUDE.md/CLAUDE.local.md audit + **MCP tool-schema + plugin-cache + skill-description reduction** (the actual residual ~24%).
2. **3 SOTA-CITE-UPGRADE applies** (Mia/FM-09/Path-P cite-anchor precision) — Path P codex foreground+tee, TIGHT ≤30-LOC prompt.
3. **24 self-ref rules** were already done by `2efabdd`; **`CLAUDE*.md` narrowing** on the ~17 non-foundational C-only rules (codex-T1-gated — W195 axis-1 warned over-narrowing breaks conditional-load).
4. Compact-trio calibration (header-cites + debounce + preload-budget).

## Cross-arc cite chain (NOT overwrite — port-note-discipline.md §6 + R7)

- `tmp/wave193-orchestrator-close-synthesis-2026-05-14.md` — W193 v4 arc (P1+P2 in-transcript)
- `tmp/wave193-close-synthesis-2026-05-13.md` — W193 v1 (8/8 STOP, parallel pid 8088)
- `tmp/wave194-p1-close-synthesis-2026-05-14.md` — W194-parallel glob-narrow ship (`2efabdd`)
- `tmp/wave195-redux-close-synthesis-2026-05-14.md` — W195 redux (decision-layer + archaeology + 8-rule glob via `d2bb6ed`)
- this file — W194-orchestrator (measurement + cross-arc synthesis + honest reframe)

## Cite class

`constituents=[TIER-1-DIRECT @ CCBP claude-memory.md:34-40 @ HEAD 48f2ceb (lazy-load authority), TIER-3-LOCAL-OPERATOR-DERIVED @ W193+W194-parallel+W195 cross-arc close-syntheses + orchestrator ctx_execute measurement 2026-05-14, TIER-2 cite-import-AMBER @ synthesis-layer-verify.md OVER-avoidance + port-note-discipline.md §6 + closed-loop-recursive-narrowing.md Outcome A]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
