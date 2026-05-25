---
title: W193 P1 — DEFINITIVE consolidated architecture SOTA-% table (prior-arc consolidation half)
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-14
agent: orchestrator (W193 v4 /goal — P1 consolidation; compact-chain fix half pending Agent A/B/C)
parallel-arc: distinct filename per R7 — parallel session pid 8088 runs W193 v1 (broad PATTERN audit + Top-3 installs); this is the v4 COMPACT-CHAIN slice
---

# W193 P1 — Definitive Architecture SOTA-% Table

Consolidates the fragmented W162/W183/W187/W189/W190/W192 audits into ONE table per the P1 mandate. Source docs: `docs/w187-audit-conformance-2026-05-13.md`, `docs/w190-hook-3tier-audit.md`, `docs/w192-decision-framework-audit.md`, `tmp/wave189-fire-close-synthesis-2026-05-14.md`, `MEMORY.md` L47-126.

## The definitive %-table (consolidation half — orchestrator-side)

| Layer | Count | SOTA-conformance (prior-arc convergence) | non-SOTA / NOVEL-UNCITED | cleanup targets | Source arcs |
|---|---|---|---|---|---|
| **Hooks** `.claude/hooks/scripts/` | 37 (34 .py + 1 .js + 2 .sh) | TIER-1 install-class 0% (0) / TIER-2 cite-adapted **73%** (27) / TIER-3a novel-WITH-rationale **27%** (10) | **0% TIER-3b FLAGGED (0/37)** | **NONE** | W190 (definitive rigorous resolution check, Mia PASS), W189 (61% T1-DIRECT / 39% sibling-AMBER / 0% novel), W187 (34/34 cite-presence) |
| **— Compact hooks** (4 of the 37) | 4 | ALL TIER-2 cite-adapted, resolving (Thariq named-author + code.claude.com + gsd-build + Karpathy §5) | 0 FLAGGED | precompact_guard.py UNWIRED (residual — *not* non-SOTA) | W190 Part 2, W189 P1 |
| **Rules** `.claude/rules/*.md` | 64 | ~97% (W162 baseline); W187 narrow-grep found 23 explicit TIER-1, broader-grep likely higher | TBD (recount queued) | TBD recount | W162 (~97%), W187 (recount queued) |
| **Agents** `.claude/agents/*.md` | 12 | **83.3%** (10/12 cited) | 2 agents need cite refresh | 2 cite-refresh | W187 |
| **Skills** `.claude/skills/**/SKILL.md` | TBD | W162 7.1% → W163 F3 **100%** (speckit UPGRADE-CITE) | 0 (post-W163) | 0 | W162→W163 F3 |
| **Manifest CR-8** §0-§17 | 85 rows | **64.7%** (55/85: 49 ADAPTED-FROM-SOTA + 6 NOVEL-DOCUMENTED) | ~21 PENDING-AUDIT rows | ~21 rows cite-backfill | W187 (64.7%), W183 F1 (62.4%) |
| **Decision-framework** (FM-17.e/Mia/FM-20/FM-21/convergence-gate/FM-catalog) | ~30 primitives | **70% SOTA-cited / 30% genuinely-novel-RETAIN** | 0 needs replacement | 0 (all SOTA-confirmed OR RETAIN-justified) | W192 P0 |

## HEADLINE — answer to operator's "% NOT directly from SOTA"

1. **Hooks: 0% non-SOTA** — definitive. W190's rigorous per-Reference resolution check found 0/37 TIER-3b FLAGGED (novel-without-rationale). 9/9 spot-verified TIER-2 anchors resolve to substantive SOTA content. W189's Mia 3-pass collapsed 19 classifier-flagged "not-SOTA" hooks → 0 genuine problems (16 were classifier false-negatives). **CR-8 cleanup targets at the hook layer: NONE.** The operator's "many may rot / low quality" concern is **REFUTED at the hook layer across 3 independent prior arcs** (W187 + W189 + W190).

2. **Compact hooks: 0% non-SOTA** — all 4 (`userpromptsubmit_compact_threshold.py`, `sessionstart_compact_hint_reader.py`, `precompact_hint_emitter.py`, `context_window_guard.py`/`posttooluse_context_monitor.js`) are TIER-2 cite-adapted with resolving anchors. The operator's "damaging significantly" concern is **NOT a cite-sourcing / SOTA-quality problem** — it traces to a **shell-env-drift symptom**:
   - W187 Finding 1: live eee shell shows `CONTEXT_WINDOW_COMPACT_WARN_TOKENS=350000` (200k-era stale value = **35% on 1M ceiling**) vs CLAUDE.local.md ENV(j) target. Root cause: eee shell not restarted since ENV(j) edit.
   - Operator-reported "compact firing at 35-40%" maps EXACTLY to the stale shell WARN=350k.
   - W187 attempted fix: align script defaults (`userpromptsubmit_compact_threshold.py`) to 600k/650k/700k so the hook is correct regardless of stale shell env. **NOTE — prior-arc claims CONFLICT on whether this landed** (W187 Finding-1 snapshot shows 250/300/350 at lines 73-75; W187 STOP-GATE[1] claims "aligned 600/700/780"; W190 says "600/650/700 dual-mirrored"). This is an FM-20 / FM-18 env-codified-but-not-sourced drift — **P1 COMPACT-CHAIN Agent B's line-by-line read is the ground-truth resolver. DO NOT trust prior-arc claims.**

3. **Decision-framework: 0% needs replacement** — W192 P0 verdict: **Mia → CONFIRMED SOTA-ADAPTED** (gsd-build 3-tier verification + ECC verification-loop + superpowers verification-before-completion Iron Law; Mia is the agent-prescription specialization of the general SOTA primitive). **FM-17.e / FM-20 / FM-21 → genuinely-novel-RETAIN** (real empirical evidence ladders, recovery patterns weaker upstream). **FM-catalog STRUCTURE → CONFIRMED SOTA-cited** (mattpocock "Skills For Real Engineers" named-failure-mode framing). The operator's "replace FM-17.e/Mia with real SOTA" — W192 already answered: nothing needs replacing; the only cosmetic note is optionally renaming "Mia" → "verification-before-apply" for SOTA-naming alignment.

## Agent A (sota-researcher) return — INTEGRATED 2026-05-14, Mia-VERIFIED

Agent A's SOTA auto-compact research (`tmp/w193-agentA-sota-autocompact-research-2026-05-14.md`) **REFUTES the v4 predicate's "WIRE untracked precompact_guard.py" instruction**:
- `precompact_guard.py` emits `{"decision":"block"}` on PreCompact when `trigger=="auto"` + no `custom_instructions` + `used<80%` — **Mia pre-apply VERIFIED against actual file L50-73** (orchestrator Read 2026-05-14, no OVER). Wiring it would BLOCK Anthropic-native autocompact, fighting the native mechanism. SOTA (context-mode/claude-mem/deepagents) all treat PreCompact as advisory/capture-only, NEVER block. **Verdict: DON'T WIRE — DELETE candidate** (deprecation-discipline.md 5-gate: 0 consumers, no unique value, advisory-only replacement exists, 0 migration cost).
- 3 WIRED compact hooks (`userpromptsubmit_compact_threshold` / `sessionstart_compact_hint_reader` / `precompact_hint_emitter`) = **SOTA-CONFIRMED, advisory-only, NOT damaging**. Operator's "damage" perception traces to W184 threshold miscalibration (already fixed W187 round-2).
- `auto-compact-discipline.md` Rank #3 "superpowers" label = HONEST-NON-FINDING mislabel (superpowers @ f2cbfbef has 0 compaction skills) — needs cite-fix + Rank #0 native-knob addition.
- claude-mem (W191 install) = PROVIDER-COMPLEMENT, DEFER — single-org (fails ≥3-org Axis-1), npm-global install is INERT (needs `/plugin install`), wrong layer for compaction. **v4 predicate's "WIRE claude-mem" instruction also deferred.**

## GENUINE open gaps (the real remediation queue — NOT "non-SOTA cleanup")

| Gap | Scope | Status / Owner |
|---|---|---|
| `precompact_guard.py` DAMAGING-LOGIC | back up to .backup/w193/ then DELETE (decision:block fights native autocompact — Agent A verified, Mia PASS) | THIS FIRE — backed up; delete deferred until Agent C return (avoid agent-read race) |
| Compact-hook threshold drift verify | `userpromptsubmit_compact_threshold.py` script defaults — ground-truth 600/650/700 vs prior-arc conflicting claims | P1 COMPACT-CHAIN Agent B (in-flight, BRIDGE-MODE) |
| %-session-left-after-compact unmeasured | design + run the measurement methodology | P1 COMPACT-CHAIN Agent C (in-flight, BRIDGE-MODE) |
| `auto-compact-discipline.md` cite-fix | Rank #3 drop "superpowers" mislabel + add Rank #0 native-knob (CCBP claude-settings.md:826,967) | REMEDIATION QUEUE — design-surface edit, needs codex T1 (next fire Pattern A) |
| `precompact_hint_emitter.py` cite-downgrade | mark stdout-visibility claim [INFERRED] + fix deprecated `datetime.utcnow()` L49 | REMEDIATION QUEUE — design-surface edit, needs codex T1 (next fire Pattern A) |
| Manifest CR-8 64.7% → ≥90% | ~21 PENDING-AUDIT rows need cite-anchor backfill | DEFER — parallel session pid 8088 territory + future fire |
| 2 agents need cite refresh | `.claude/agents/*.md` 2 of 12 | DEFER — future fire |
| Rules/skills recount | broader-grep recount of 64 rules + skills | DEFER — parallel session pid 8088 territory |
| mcp-memory + graphiti EMPTY | populate backends for cross-session persistence | P4 (future fire) |
| claude-mem proper install | `/plugin install claude-mem` (npm-global W191 install is inert) — pending convergence-gate ≥3-org | P4 / DEFER (W192 + Agent A both say single-org, defer) |

## Disposition

**The P1 "DEFINITIVE %-table" is HALF complete** — this consolidation half (orchestrator-side, prior-arc convergence) is AUTHORITATIVE. The COMPACT-CHAIN fix half (verify thresholds + wire precompact_guard.py + measure %-left) is pending the 3-agent team return — that team is the genuine remediation, NOT a "non-SOTA cleanup" (because there is no non-SOTA hook content to clean).

**Key reframe for the operator**: the architecture is overwhelmingly SOTA-conformant. The premise "many hooks/rules are rot / low-quality / not-SOTA, clean them up" is REFUTED by 3 independent prior audits at the hook layer + 1 at the decision-framework layer. The genuine work is (a) the compact-chain shell-env-drift fix + precompact_guard.py wiring, (b) CR-8 manifest cite-backfill (~21 rows), (c) memory-backend population — NOT mass cleanup.

## FM-20 CORRECTION + parallel-arc convergence (appended 2026-05-14 post-commit)

**FM-20 stale-number correction**: the "Manifest CR-8 64.7% (55/85)" row above cites the W187 fire-open baseline. The **parallel session pid 8088 (running W193 v1) corrected this to 67/79 = 84.8%** via an FM-20 CR-8 catch (per `MEMORY.md` W193 line + `tmp/wave193-close-synthesis-2026-05-14.md`). The 64.7% in the table above is STALE — actual CR-8 conformance is **~84.8%**. Forward-only correction per `port-note-discipline.md §6` (row not rewritten; correction appended).

**Parallel-arc convergence (FM-02 / R7)**: parallel session pid 8088 (W193 v1 predicate) **closed W193 8/8 STOP-gates** before this v4 arc completed. Its 3-agent team converged with this v4 arc:
- Their Agent A: SOTA-CITE-UPGRADE + CONFIRMED + RETAIN — **converges** with this arc's Agent A (auto-compact stack ~95% SOTA-confirmed, 2 cite-upgrades needed).
- Their Agent C: 0/5 compact hooks rot-FLAGGED — **converges** with this arc's Agent A GAP TABLE + W190 (0/37 TIER-3b FLAGGED).
- Their Agent B: FM-17.e LOST n=5→n=6 → Path-P substitute. **This v4 arc's Agent B ALSO LOST to FM-17.e** (autocompact-thrashing, 80 tokens) — n=6→n=7 cumulative ladder advance.
- This v4 arc's UNIQUE contribution: orchestrator Mia pre-apply VERIFIED `precompact_guard.py:50-73` `{"decision":"block"}` path against actual file — the v4 predicate's "WIRE precompact_guard.py" instruction is REFUTED. Backed up to `.backup/w193/precompact_guard.py.bak`; DELETE-candidate (deprecation-discipline 5-gate all-pass: 0 consumers, untracked, advisory-only replacement exists).

**Disposition**: W193 is ALREADY 8/8 STOP-CLOSED by the parallel arc. This v4 arc is a **convergent corroboration**, not new ground. Cross-arc cite: `tmp/wave193-close-synthesis-2026-05-14.md` (parallel session's authoritative close — NOT overwritten per FM-02). Next genuine step is W194 (parallel session synthesized Top-3: shareAI-lab CITE-CLASS + karpathy-guidelines PARTIAL-OVERLAP + ComposioHQ PROVIDER-COMPLEMENT).

## Cite class

`constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ W187/W189/W190/W192 audit docs + MEMORY.md L47-126, TIER-3-LOCAL-COMPOSITION @ this fire's ctx_batch_execute consolidation 2026-05-14 + parallel-arc W193 v1 close-synthesis convergence]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota-installed/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
