# W193 P1 — Preload-Bloat Audit (sota-researcher Agent A `aad1b0e323d3f12c0`)

**Date**: 2026-05-14 | **Scope**: P1 ONLY (preload bloat). P2/P3/P4 owned by parallel arc.
**Persisted by orchestrator per FM-19** (agent returned ARTIFACT-INLINE; full 64-row table + reasoning in agent transcript `tmp/claude/Z--claude-sota-installed/fc8b2130.../tasks/aad1b0e323d3f12c0.output`).

## VERDICT
Cold-start preloads **~100% of `.claude/rules/`** (~1.01MB of 1.03MB) + CLAUDE.md 40.7KB + CLAUDE.local.md 15.5KB + MEMORY.md 23.3KB ≈ **~1.08MB / ~278K tokens preloaded before any work** = the operator-perceived ~44% of effective working window.

## ROOT CAUSE (the structural bug)
**62 of 64 rule files carry `.claude/rules/**` (self-referential) or near-universal globs (`CLAUDE*.md`, `.claude/agents/**`, `.claude/hooks/**`, `scripts/**`, etc.) in their `paths:` frontmatter.** CC progressive disclosure loads a `paths:`-scoped rule when a matching file enters context; the rules directory is indexed at cold-start so `.claude/rules/**` matches → the rule cold-loads. The 3 remaining files (`named-failure-modes`, `fm21-queue-time-prompt-freeze`, `cardinal-rule-8`) have NO `paths:` → ALWAYS-load by design. Net: **0 files genuinely conditional at cold-start — the `paths:` lazy-load mechanism is fully defeated.**

Tally: ALWAYS=3 (61.7KB) | OVER-BROAD=51 (~900KB) | CONDITIONAL-classified-but-still-cold-load=10 (~130KB).

## SOTA verdict (CCBP cite)
CCBP `claude-memory.md:30-40,89-105 @ HEAD f8468e871ed372f2807aa9d3ca7ca91eca7db422` (TIER-1-DIRECT): Descendant Loading is LAZY by design — L93 "prevents irrelevant context from bloating your session"; L105 "avoids loading potentially hundreds of kilobytes of irrelevant instructions at startup". `paths:` frontmatter IS the lazy-load layer. claude-sota-installed has DEFEATED it with self-referential globs → ~1MB cold-loads, the exact failure CCBP says the design avoids. **SOTA-VIOLATION.**

## Worst self-referential offenders (full 64-row table in agent transcript)
fm20-path-drift-cascade 40.9KB · fm17-subagent-fleet-depletion 33.7KB · karpathy-adapted 33.5KB · research-protocol 29.5KB · parallel-agent-wave 28.2KB · mia-pre-apply 27.6KB · parallel-sessions 24.9KB · team-orch-patterns 24.2KB · synthesis-layer-verify 22.5KB · audit-action-loop 20KB · layered-gates-architecture 19.4KB · cmc-verdict-shapes 19.1KB · advanced-agent-team-standing-directive 19KB — plus ~38 more carrying `.claude/rules/**`.

## OPTION A — Narrow OVER-BROAD `paths:` globs (PRIMARY recommendation)
Remove `.claude/rules/**` + universal globs from rules that don't actually govern cold-start surfaces. A workflow/process rule governs `.claude/agents/**`, `.claude/state/**`, `.claude/hooks/**`, `tmp/wave**` — surfaces NOT touched at cold-start; it must NOT also claim `.claude/rules/**`.
- **KEEP cold-loading** (genuinely cardinal — govern CLAUDE.md / cold-start): karpathy-adapted, research-protocol, parallel-session-worktree-isolation, cardinal-rule-7/8/11/12, sota-pin-discipline + the 3 ALWAYS files. ≈ ~150KB justified.
- **Estimated reduction**: rules/ cold-load ~1.01MB → ~150-300KB. **Net preload ~28% → ~14-17% of context (~10-14pp absolute, ~50% cut of rules bloat).**
- **MOVE-not-DELETE: ✅ PASS** — pure `paths:` frontmatter narrowing; zero content touched; every cite trail intact; rule still loads, just lazily when its genuine target surface is edited. Cardinal-rule-1+8 satisfied.
- **Risk**: a rule needed at cold-start narrowed too aggressively → mitigate via KEEP-list; codex T1 verifies KEEP-list before ship.

## OPTION B — CLAUDE.md size reduction via MOVE-to-conditional-rule (follow-up)
CLAUDE.md 40.7KB / 275 lines. CR-7/8/11/12 already correctly extracted (summary in CLAUDE.md, mechanics in rule files). Trim targets: CR-5/6/9/10 still carry FULL mechanics inline → MOVE to new `cardinal-rule-{6,9,10}-*.md` files; Architecture cite block (L120-164 ~7KB) → new `architecture-topology.md`; divergences table → `runtime-divergences.md`.
- **CRITICAL TRAP**: new rule files MUST EXCLUDE `CLAUDE*.md` from their `paths:` glob or they cold-load anyway and the move achieves nothing.
- **Estimated reduction**: CLAUDE.md 40.7KB → ~24-28KB. ~1.5pp more.
- **MOVE-not-DELETE: ✅ PASS** — mirrors the proven CR-7/8/11/12 extraction pattern; cite trails travel with content; CLAUDE.md retains summary + pointer.

## Combined recommendation
Ship Option A first (highest leverage, lowest risk, pure glob-narrowing). Then Option B. Combined: preload ~44% → ~28-30% of working window. MEMORY.md needs NO change (134 lines, ≤200-compliant).
