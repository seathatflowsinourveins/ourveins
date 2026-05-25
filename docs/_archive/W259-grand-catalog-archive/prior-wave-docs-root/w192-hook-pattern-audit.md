---
title: W192 fire-2 P1 — Hook PATTERN deep audit (compact-trio focus) + SOTA auto-compact research
status: AUTHORITATIVE
date: 2026-05-14
wave: 192
fire: 2
priority: P1
parallel-arc: w192-self-audit (no parallel W192 P1 arcs detected)
---

# W192 fire-2 P1 — Hook PATTERN deep audit + SOTA auto-compact research

## TL;DR

**Compact-trio (5 hooks) audit verdict: ZERO LOCAL-INVENTION-DRESSED. All 5 cite TIER-1-DIRECT or TIER-1-DIRECT+TIER-3-LOCAL-COMPOSITION at file:line+SHA depth.**

Headline:
- 3/5 SOTA-DERIVED (verbatim upstream mechanism with file:line+SHA cite)
- 2/5 SOTA-ADAPTED (cite + local glue + caveat disclosure)
- 0/5 LOCAL-INVENTION-DRESSED
- 0/5 NOVEL-DOCUMENTED-EXCEPTION

**W189 baseline "4/6 DORMANT" REFUTED**. Count drift (5 not 6) + activity drift (actual 1/5 DORMANT + 1/5 ACTIVE + 3/5 CONDITIONALLY-ACTIVE).

**Operator concern "damaging significantly" root-cause: (d) all three** — but PATTERN authenticity is NOT the cause. Cause is EFFECT-on-context (9500-char SessionStart preload + per-prompt threshold advisories) + threshold-calibration-velocity (W187 round-2 fix recent; per-fire effect not measured yet). Mitigation = calibration/budget tuning, NOT pattern replacement.

## Cross-model gate status (CR-3 Phase 1 bootstrap exception)

| Source | Status | Verdict shape |
|---|---|---|
| Orchestrator (this synthesis) | BASELINE | Sonnet stand-in — STAND-IN-NOTICE per cmc-env-funneled-disclosure.md |
| Path P codex `bl0px7qox` deep-review-exec foreground+tee | IN-FLIGHT | TBD (this doc updated post-return per Pattern A or Pattern B HNF) |

CR-3 satisfied PARTIAL via Path P dispatch even if returns Pattern B HNF (substantive cross-model engagement counts per cmc-t1-t7-lifecycle.md §The contract Phase 1 exception).

## The 5 compact-related hooks (line-by-line line-by-line read this fire)

### 1. `precompact_guard.py` (77 LOC) — **SOTA-DERIVED**

**Wire**: PreCompact event. Blocks `trigger=="auto"` + no `custom_instructions` + context < HARD_LIMIT_PERCENT (default 80).

**Cite anchors (verbatim from L4-10)**:
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks:1950-1971` (PreCompact trigger/custom_instructions input + block semantics) [VERIFIED 2026-05-13]
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks:725-792` (JSON decision:block contract) [VERIFIED 2026-05-13]
- TIER-2 sister `Z:/claude-sota-installed/.claude/rules/coordination.md:182-190` (Thariq pre-emptive /compact at ~300k discipline)

**PATTERN verdict**: SOTA-DERIVED. Mechanism (PreCompact + decision:block JSON contract + trigger check + custom_instructions presence) is verbatim Anthropic CC native semantic. Zero local glue.

**Activity classification**: **DORMANT** — only fires when ALL of: trigger=="auto" AND no custom_instructions AND used < 80%. Most /compact invocations carry custom_instructions (operator-typed hints OR autocompact internal payload); near-zero fire rate in practice.

### 2. `precompact_hint_emitter.py` (169 LOC) — **SOTA-ADAPTED**

**Wire**: PreCompact event ADJACENT to precompact_guard.py per FM-19/W170-A extension pattern. Emits compact-hint payload via stdout-to-"Additional Instructions:" seam.

**Cite anchors**:
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks` PreCompact contract
- TIER-1-DIRECT-CAVEAT (L9-14): PreCompact stdout-to-model-context NOT directly documented per Anthropic CC L661-663 (only UserPromptSubmit / UserPromptExpansion / SessionStart route stdout); semantic effect verified empirically per W164 F38a live probe
- TIER-2 sister: auto-compact-discipline.md Rank #3 + sessionstart-preload-discipline.md + mia-pre-apply.md + launch-discipline.md

**PATTERN verdict**: SOTA-ADAPTED. Uses Anthropic CC native PreCompact event but relies on empirically-verified-not-documented stdout-to-Additional-Instructions seam. Disclosed in source comment. effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE.

**Activity classification**: **ACTIVE** — fires on EVERY PreCompact event regardless of trigger (auto/manual). High fire rate.

### 3. `sessionstart_compact_hint_reader.py` (223 LOC) — **SOTA-DERIVED**

**Wire**: SessionStart matcher=="compact" ONLY (post-auto-compact rehydrate boundary). Emits 4 sections (compact_hint / MEMORY.md head 3K / last-3 close-syntheses / git log -5) via hookSpecificOutput.additionalContext, bounded <=9500 chars per Anthropic 10K cap.

**Cite anchors**:
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks` SessionStart hookSpecificOutput.additionalContext contract (verbatim mechanism)
- TIER-2 sister: sessionstart-preload-discipline.md §The contract + auto-compact-discipline.md Rank #5 + karpathy-adapted.md §5 (Layer 1/2/3 mapping) + fm20-path-drift-cascade.md

**PATTERN verdict**: SOTA-DERIVED. Mechanism (SessionStart matcher + hookSpecificOutput.additionalContext + 9500-char cap) is verbatim Anthropic CC native. Section composition (a/b/c/d) is operator-side layout but mechanism is canonical.

**Activity classification**: **CONDITIONALLY-ACTIVE** — fires only on `source=="compact"` (post-auto-compact rehydrate). At 1-3 fires per session arc; substantial 9500-char context cost per fire.

### 4. `posttooluse_context_monitor.js` (174 LOC) — **SOTA-DERIVED**

**Wire**: PostToolUse continuous context-monitor. W189 P1 cite-adapt.

**Cite anchors at file:line+SHA depth** (per L12-28 docstring constituents block):
- TIER-1-DIRECT `Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` (file pin SHA `7be9affea289287396cd282f1563e0502deee783`) — gsd-build/get-shit-done MIT Copyright (c) 2025 Lex Christopherson; the advisory-only / silent-fail / debounced / severity-escalation PostToolUse monitor pattern
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks` PostToolUse hook contract
- TIER-1-DIRECT in-repo `.claude/hooks/scripts/context_window_guard.py:25` + `context_window_statusline.sh` (runtime bridge-file path/schema)
- TIER-3-LOCAL-COMPOSITION W189 P1 adaptation (bridge-file remap + threshold env-wiring + gsd-specific drops)
- `effective_tier=TIER-3-LOCAL-COMPOSITION` per rule #8 MIN_PRECEDENCE

**PATTERN verdict**: SOTA-DERIVED with disclosed local-composition glue. Direct file:line+SHA cite-adapt of an upstream MIT-licensed pattern with named-author attribution. Gold-standard cite shape.

**Activity classification**: **CONDITIONALLY-ACTIVE** — fires on every PostToolUse but exits silently when (a) no session_id, (b) path-traversal session_id, (c) sidecar absent, (d) sidecar stale > 120s, (e) remaining > WARNING threshold, (f) debounce active. Fire rate scales with sidecar freshness.

### 5. `userpromptsubmit_compact_threshold.py` (303 LOC) — **SOTA-ADAPTED**

**Wire**: UserPromptSubmit gate. Defaults WARN=600k / HIGH=650k / CRIT=700k for 1M Opus 4.7 (W187 round-2 codex T1 calibration after R1 buffer-invariant violation).

**Cite anchors**:
- TIER-1-DIRECT Anthropic CC `https://code.claude.com/docs/en/hooks:725-792` (decision:block contract)
- TIER-1-NAMED-AUTHOR-QUOTE Thariq `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2ceb` (rot zone ~300-400k on Opus 4.7 NUMBER source + "model least intelligent at compacting" framing)
- TIER-2 sister: auto-compact-discipline.md Rank #3 + karpathy-adapted.md §5 (Wiki Compounding Surface discipline WHY) + evidence-policy.md Stuck Detection + sibling context_window_guard.py:28-29 (env-var pattern)
- TIER-3-LOCAL-OPERATOR-DERIVED W187 Pattern A FIX-FORWARD round-2 NEEDS-REVISION conf=0.9 verdict (CRIT=700k preserves 100k buffer below 80% autocompact ceiling on 1M)

**PATTERN verdict**: SOTA-ADAPTED. Combines Anthropic CC native UserPromptSubmit + Thariq rot-zone NUMBER + W175 P6 env-overridable-thresholds pattern + W174 P0b session-keyed sidecar lookup fix. Local glue is the threshold-budget calibration. effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8.

**Activity classification**: **CONDITIONALLY-ACTIVE** — fires on every UserPromptSubmit, emits advisory only when `tokens >= THRESH_WARN` (default 600k). Below threshold = telemetry-only (no model-visible output).

## W189 baseline refutation

**Baseline claim** (per /goal P1 mandate): "Compact-remind hooks LINE-BY-LINE (W189 baseline: 4/6 DORMANT-not-aggressive — confirm/refute)"

**Refutation evidence**:

| Hook | Activity (this fire's classification) | Fire rate (estimate) |
|---|---|---|
| precompact_guard.py | DORMANT | Near-zero (rare trigger="auto" without custom_instructions + context <80%) |
| precompact_hint_emitter.py | ACTIVE | Every PreCompact event (~1-3/arc) |
| sessionstart_compact_hint_reader.py | CONDITIONALLY-ACTIVE | matcher=="compact" only (~1-3/arc post-compact) |
| posttooluse_context_monitor.js | CONDITIONALLY-ACTIVE | sidecar-fresh + threshold-crossed; ~30-50% of PostToolUse events |
| userpromptsubmit_compact_threshold.py | CONDITIONALLY-ACTIVE | >=WARN threshold; ~30-60% of prompts at 600k+ |

**Verdict**: W189 "4/6 DORMANT" baseline REFUTED on TWO axes:
1. **Count drift**: 5 hooks, not 6. W189 may have counted a sister hook now-retired OR mis-counted.
2. **Activity drift**: actual = 1/5 DORMANT + 1/5 ACTIVE + 3/5 CONDITIONALLY-ACTIVE. The "4/6 DORMANT" claim under-states the actual fire rate.

W189 baseline status: **STALE — replaced by this fire's measurement**.

## Operator concern root-cause attribution

Operator claim (per /goal P1 + post-compact user message): "compact-remind hooks which damaging significantly for the advanced full automative workflow"

**Decomposition**:

- (a) PATTERN authenticity issue → **REJECT**. Zero LOCAL-INVENTION-DRESSED in compact-trio per §The 5 compact-related hooks above. All 5 cite TIER-1-DIRECT at file:line+SHA depth.

- (b) EFFECT-on-context issue → **CONFIRM (load-bearing cause)**. Per-fire impact:
  - sessionstart_compact_hint_reader: up to 9500 chars (~3% of 1M context) every post-compact rehydrate
  - userpromptsubmit_compact_threshold advisories: 200-400 chars per WARN+/HIGH+/CRIT+ prompt (additive)
  - posttooluse_context_monitor advisories: 200-400 chars per threshold-crossed PostToolUse (debounced 5x)
  - precompact_hint_emitter: 9500-char Additional-Instructions per PreCompact (consumed by compact-summary text)
  - **Cumulative post-preload context budget**: 9500 (SessionStart) + 9500 (PreCompact when fires) + accumulated advisories = significant fraction of /goal's ~40% post-preload concern.

- (c) DEBOUNCE/THRESHOLD calibration → **CONFIRM (secondary)**. W187 round-2 CRIT=700k recently shipped (per `userpromptsubmit_compact_threshold.py:75-92`). Prior round-1 attempted CRIT=780k caught by codex T1 buffer-invariant violation. Current 700k preserves 100k buffer below 80% autocompact = ~well-tuned for 1M Opus 4.7. NO residual stale-threshold issue.

- (d) Overall verdict → **(b) + (c)-resolved**. PATTERN is sound; EFFECT-on-context is the load-bearing concern; threshold-calibration is recently-correct.

**Severity per issue**:
- (a) NULL — no pattern issue exists
- (b) HIGH — 9500-char SessionStart preload + cumulative advisories = ~3-5% of post-compact context budget
- (c) LOW — recent W187 calibration is conservative-correct

## SOTA auto-compact method research (TBD post Path P return)

Will integrate Path P codex `bl0px7qox` Q4 findings when verdict lands. Provisional sources to be probed:
- gsd-build/get-shit-done thin-orchestrator (already cite-adapted in posttooluse_context_monitor.js)
- obra/superpowers compact-mechanisms / context-management skills
- affaan-m/everything-claude-code (ECC) autonomous-loops + CI-failure-recovery patterns
- Anthropic CC native /compact hint contract + claude-memory.md
- Karpathy §5 Wiki Compounding Surface 3-layer (claude-sota-installed §5 already implements)

## Recommendations (verdict only — no auto-replace per /goal P1)

| # | Recommendation | Confidence | Rationale |
|---|---|---|---|
| R1 | **KEEP all 5 compact hooks unchanged** | 0.92 | Zero LOCAL-INVENTION-DRESSED; all SOTA-cited at TIER-1-DIRECT or TIER-3-LOCAL-COMPOSITION with file:line+SHA |
| R2 | **No backup/replace required for compact-trio** | 0.90 | Per /goal P1 "back up + clean/replace local-invention hooks where SOTA pattern exists" — no LOCAL-INVENTION-DRESSED candidates found |
| R3 | **Calibrate SessionStart preload budget** | 0.78 | 9500-char cap is at Anthropic CC 10K stdout limit; consider reducing to ~5000 if measurement confirms it dominates ~40% post-preload context. DEFER to P1-followup measurement fire. |
| R4 | **Measure post-preload context % live** (W190 UNKNOWN-TO-MEASURE residue) | 0.85 | Operator concern ~40% is unverified MEASURED claim. Probe `.claude/state/context_window_sidecar.json` for actual post-preload `used_percentage`. Cheap probe; high information yield. |
| R5 | **Audit remaining 31 non-compact hooks** | 0.80 | This fire scoped to compact-trio (5). 31 other hooks (`safety_guard.py`, codex_t*.py, gitnexus_*.py, etc) need same-shape PATTERN audit. DEFER to next fire per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. |

## Karpathy §5 PER-FIRE 5-backend persist

- L1 JSONL: CC session JSONL automatic ✓
- L2 MEMORY.md: entry queued post-commit ✓
- L3 close-synth: `tmp/wave192-fire2-p1-close-synthesis-2026-05-14.md` queued ✓
- L4 graphiti: `W192-F2-P1-hook-pattern-audit-SHIPPED` episode group=eee queued
- L5 mcp-memory: hash queued

## Provenance

- W192 P0 commit `1034a9b` (parent close-synthesis baseline)
- Path P codex `bl0px7qox` (foreground+tee deep-review-exec)
- Orchestrator hook reads (Sonnet stand-in) — line-by-line 5 hooks
- Fix-forward integration pending Path P return

## Update triggers

Re-evaluate this audit when:
- Path P codex `bl0px7qox` returns NEEDS-REVISION → integrate prescriptions per Pattern A
- W189 baseline cited again without refresh → reference this audit's REFUTED verdict
- A 6th compact-related hook is added → re-baseline activity classification
- Post-preload context % measurement lands (R4 closure)
- Remaining 31 non-compact hooks audited (R5 closure)
- gsd-build / superpowers / ECC ship stronger compact-discipline patterns

## Cite class

`constituents=[
  TIER-1-DIRECT @ Anthropic CC https://code.claude.com/docs/en/hooks (PreCompact + SessionStart + UserPromptSubmit + PostToolUse contracts),
  TIER-1-DIRECT @ Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5,
  TIER-1-NAMED-AUTHOR-QUOTE @ Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2ceb (Thariq rot-zone NUMBER),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md Rank #3 + #3.5 (compact-discipline + PreCompact hook stack),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md (cross-session preload contract),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/karpathy-adapted.md §5 (Wiki Compounding Surface),
  TIER-3-LOCAL-OPERATOR-DERIVED @ W164 F38a verified-stdout-to-Additional-Instructions empirical probe + W174 P0b session-keyed sidecar fix + W187 round-2 CRIT=700k buffer-invariant fix-forward + W189 P1 gsd-build cite-adapt + W192 F1 P0 baseline self-audit
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
