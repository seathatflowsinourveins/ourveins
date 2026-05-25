---
title: W193 P1 — SOTA Auto-Compact / Context-Management Research (Agent A sota-researcher)
status: AUTHORITATIVE
date: 2026-05-14
agent: Agent A (sota-researcher) — W193 P1 COMPACT-CHAIN team
persisted-by: orchestrator per FM-19 ARTIFACT-INLINE
mia-pre-apply: VERIFIED — precompact_guard.py decision:block claim confirmed against actual file L50-73 (orchestrator Read 2026-05-14)
---

# W193 P1 — SOTA Auto-Compact / Context-Management Research

**Probes**: 6 source families (superpowers / gsd / deepagents / context-mode / claude-mem / CCBP+Anthropic docs) — all locally cloned, HEAD-pinned, read at file:line depth.

## 1. SOTA auto-compact reference (definitive method)

No single "definitive SOTA auto-compact algorithm" — SOTA is a **layered composition** of 5 mechanisms:

| # | Mechanism | Definitive SOTA source | Anchor |
|---|---|---|---|
| A | Anthropic-native autocompact threshold control — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (% of base) × `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (token base) | CCBP `claude-settings.md:826,967 @ 48f2ceb` (TIER-1-DIRECT) | token-vs-% MODEL is upstream authority; `pct*window` = buffer-invariant base |
| B | PreCompact resume-snapshot — capture priority-sorted <2KB state before compaction, re-inject post-compact | context-mode `hooks/precompact.mjs:1-76 @ 1.0.111` (TIER-1-DIRECT, Elastic-2.0) | `buildResumeSnapshot()` + `db.upsertResume()` + `incrementCompactCount()` |
| C | Agent-visible context monitor — PostToolUse hook injects threshold warnings AS `additionalContext` | gsd `hooks/gsd-context-monitor.js:25-27 @ 3aaed8f5` (TIER-1-DIRECT, MIT) | WARNING ≤35% remaining / CRITICAL ≤25%; 5-tool debounce; severity-escalation bypasses debounce |
| D | Pre-emptive arg-truncation + summarization middleware — fire at LOWER threshold than full compaction | deepagents `middleware/summarization.py:188-205 @ 95f845d2` (TIER-1-DIRECT, MIT, LangChain-org) | `trigger=("fraction",0.85)` OR `("tokens",170000)`; `keep=("messages",6)`; arg-truncate `("messages",20)` |
| E | Persistent memory-compression across sessions — capture observations → semantic summaries → inject next session | claude-mem `plugin/hooks/hooks.json @ 13d5fa71` (TIER-1-DIRECT, Apache-2.0) | SessionStart`startup\|clear\|compact` / UserPromptSubmit / PostToolUse / Stop → worker-service; 3-layer search ~10x savings |

**Convergence (Axis-1 ≥3 distinct orgs PASS)**: "fire BEFORE the wall, keep recent window, summarize/offload the rest, make the agent aware" — converges across LangChain + gsd-build/TÂCHES + context-mode + claude-mem/thedotmack + Anthropic CC = **5 orgs**.

**superpowers — HONEST-NON-FINDING**: `ls Z:/repos/deps/superpowers/skills/` returned ZERO context/compact/memory/summarization skills. superpowers @ `f2cbfbef` does NOT provide an auto-compact pattern. `auto-compact-discipline.md` Rank #3 "superpowers + Karpathy §5" label is **partially unsupported** — actual SOTA for that rank is Anthropic-native `/compact <hint>` + Karpathy §5.

## 2. GAP TABLE — runtime hooks + auto-compact-discipline.md vs current SOTA

| Surface | Verdict | Evidence |
|---|---|---|
| `userpromptsubmit_compact_threshold.py` (WARN 600k/HIGH 650k/CRIT 700k, advisory-only, env-overridable) | **SOTA-CONFIRMED** | Matches gsd context-monitor (agent-visible `additionalContext`) + deepagents lower-threshold discipline. W187 round-2 calibration SOTA-aligned to CCBP `claude-settings.md:967` `pct*window` invariant. Advisory-only (exit 0, no block) = SAFE. NOT damaging. |
| `sessionstart_compact_hint_reader.py` (matcher=compact, 4-section ≤9500-char rehydrate) | **SOTA-CONFIRMED** | Matches claude-mem SessionStart `compact` matcher + context-mode post-compact resume re-injection. Karpathy §5 3-layer preload = SOTA continuity discipline. NOT damaging. |
| `precompact_hint_emitter.py` (PreCompact, emits hint/MEMORY-tail to stdout) | **SOTA-CITE-UPGRADE-NEEDED** | Mechanism matches context-mode precompact.mjs. BUT script docstring L9-14 admits PreCompact stdout NOT model-visible per Anthropic docs — value is the sidecar write `sessionstart_compact_hint_reader.py` consumes, NOT stdout. Cite-class should downgrade to `[INFERRED]` on stdout-visibility claim. `_now_iso()` L49 uses deprecated `datetime.utcnow()` (sister hook fixed at W187). NOT damaging. |
| `precompact_guard.py` (UNTRACKED + UNWIRED) | **NON-SOTA-REPLACE → DAMAGING-LOGIC if wired** | Emits `{"decision":"block"}` on PreCompact when `trigger=="auto"` + `custom_instructions` empty + `used<80%`. Per Anthropic CC docs (cited in hook L7-8) `decision:block` BLOCKS compaction. If wired → blocks Anthropic's own pre-emptive autocompact, forcing manual `/compact` every time — fights the native mechanism. SOTA (context-mode/claude-mem/deepagents) ALL treat PreCompact as advisory/capture-only, NEVER block. `auto-compact-discipline.md:84` itself says "All 4 layers exit 0 / no block = SAFE" — precompact_guard.py VIOLATES that. **Recommendation: leave UNWIRED permanently OR delete.** It is the one genuinely non-SOTA / harmful artifact. Currently UNWIRED so not damaging RIGHT NOW. |
| `auto-compact-discipline.md` Rank #1 context-mode `ctx_batch_execute` | **SOTA-CONFIRMED** | ~98% context savings. Correct as Rank #1. |
| Rank #2 repomix pack→grep | **SOTA-CONFIRMED** | Tree-sitter ~70% compression. |
| Rank #3 pre-emptive `/compact <hint>` ("superpowers + Karpathy §5") | **SOTA-CITE-UPGRADE-NEEDED** | superpowers has NO compaction skill (HNF). Correct SOTA = Anthropic-native `/compact <hint>` + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` + Karpathy §5. Drop "superpowers" label; add CCBP `claude-settings.md:826,967`. |
| Rank #3.5 PreCompact 4-layer stack | **SOTA-CONFIRMED** | fcakyon intelligent-compact + ECC pre-compact + context-mode precompact.mjs + ECC suggest-compact = all advisory/capture, exit 0. |
| Rank #4-7 rewind / Karpathy 3-layer / deepagents arg-truncation / subagent forks | **SOTA-CONFIRMED** | deepagents arg-truncation `trigger=("messages",20)` matches Rank #6. |
| Rule overall | **SOTA-CONFIRMED with 2 cite-upgrades** | (1) Rank #3 drop "superpowers" mislabel; (2) add Anthropic-native `CLAUDE_CODE_AUTO_COMPACT_WINDOW` + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` as explicit Rank #0 (native-knob). |

## 3. claude-mem verdict (CR-12 6-class disposition)

**Disposition: PROVIDER-COMPLEMENT — do NOT wire as the compact mechanism; DEFER pending convergence-gate.**

- **CR-12 class**: PROVIDER-COMPLEMENT (not DUPLICATE) — claude-mem = persistent cross-session memory-compression; the incumbent 4-hook stack = within-session compact-lifecycle advisory. Different layers.
- **NOT a compact mechanism**: claude-mem does NOT block/throttle/threshold compaction. Wiring it would NOT fix any "damaging compact logic."
- **Overlap risk**: claude-mem SessionStart-compact + Stop + PostToolUse hooks overlap incumbent mcp-memory + graphiti + `sessionstart_compact_hint_reader.py` → FM-20 silent-dual-write risk + Karpathy §5 Layer-ownership ambiguity.
- **Convergence-gate Axis-1**: single-org (thedotmack). NOT ≥3-distinct-org for ADOPT bar. SRA D4 = TIER-4-NAMED-INDIVIDUAL.
- **Install caveat**: README warns `npm install -g claude-mem` (the W191 install) installs SDK/library ONLY — does NOT register plugin hooks or worker service. **W191 npm-global install is INERT** — needs `/plugin install claude-mem` or `npx claude-mem install`.
- **Verdict**: DEFER per convergence-gate (single-org) + harness-fit (3rd memory backend overlap). Does NOT belong in the compact-hook layer at all.

## 4. Recommended SOTA auto-compact pattern (to replace non-SOTA logic)

Runtime is **~95% SOTA-aligned already**. Minimal changes:

1. **DELETE or permanently-leave-UNWIRED `precompact_guard.py`** — its `decision:block` path is the one genuinely non-SOTA artifact.
2. **`auto-compact-discipline.md` Rank #3 cite-fix** — drop "superpowers" (HNF); relabel "Anthropic-native `/compact <hint>` + Karpathy §5".
3. **Add Rank #0 (native-knob)** — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` + `CLAUDE_CODE_AUTO_COMPACT_WINDOW` per CCBP `claude-settings.md:826,967 @ 48f2ceb`.
4. **`precompact_hint_emitter.py` cite-downgrade** — mark "stdout → Additional Instructions seam" as `[INFERRED]`; fix deprecated `datetime.utcnow()` L49.
5. **claude-mem: leave OUT of the compact layer.** DEFER as separate cross-session-memory decision.

**Operator's "compact-remind hooks damaging significantly"**: the 3 WIRED hooks are advisory-only + SOTA-confirmed. Most likely "damage" source = W184-identified threshold miscalibration (CRIT at 35% on 1M) — already fixed at W187 round-2 (700/650/600). UNWIRED `precompact_guard.py` is the only `decision:block` surface — stay unwired or delete. No SOTA-replace needed on the wired stack; only cite-upgrades + the guard removal.

VERDICT: Runtime auto-compact stack **SOTA-CONFIRMED (~95%)**. 3 wired hooks SOTA-CONFIRMED (need 2 cite-upgrades). 1 unwired hook (`precompact_guard.py`) = DAMAGING-LOGIC if wired (recommend DELETE). claude-mem = PROVIDER-COMPLEMENT, DEFER (single-org, npm-global install inert). `auto-compact-discipline.md` Rank #3 "superpowers" label is a HONEST-NON-FINDING mislabel.
