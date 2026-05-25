# W189 P1 — Compact-Chain Calibration Audit (Agent A research return)

**Arc**: W189 ARCH-SOTA-CLEANUP P1 "compact-remind calibration"
**Runtime**: Z:/claude-sota-installed (Opus 4.7, 1M context)
**Date**: 2026-05-14
**Scope**: 6 compact-class hooks + 3 threshold surfaces + ECC suggest-compact question. TIGHT.
**Method**: direct Read of 5 hook scripts + auto-compact-discipline.md + settings.json + git log.

## EXECUTIVE FINDING (the operator's "damages workflow" claim)

The compact-remind chain is NOT mis-calibrated as the operator suspects. The W184-orchestrator
"CRIT 350k = 35% on 1M" mismatch has ALREADY BEEN FIXED — W187 round-2 codex T1 (commit `c11db54`,
conf=0.9) re-calibrated all surfaces to 600k/650k/700k for 1M context. All 3 threshold surfaces AGREE.

The actual residual workflow-damage risk is `precompact_guard.py` — it emits a real `decision:block`
HARD block on PreCompact. BUT it is UNWIRED in settings.json. `userpromptsubmit_compact_threshold.py`
does NOT emit decision:block at CRIT — advisory-only at all 3 tiers. The "premature hard-block"
W184-orchestrator worried about is NOT in the wired path.

Net: 5 KEEP-AS-IS, 1 FIX-WIRING-DECISION (precompact_guard.py — Schrodinger hook).

## Q1 — THRESHOLD ALIGNMENT (3 surfaces)

ANSWER: All 3 token-scale surfaces AGREE at 600k/650k/700k. W184-orchestrator's "CRIT 350k = 35%"
finding is STALE — fixed at W187 round-2.

| Surface | WARN | HIGH | CRIT | cite |
|---|---|---|---|---|
| settings.json env block | 600000 | 650000 | 700000 | settings.json:25-27 |
| CLAUDE.local.md ENV(j) | 600000 | 650000 | 700000 | ENV(j) "W187 round-2 codex T1 conf=0.9" |
| script default userpromptsubmit_compact_threshold.py | 600000 | 650000 | 700000 | userpromptsubmit_compact_threshold.py:90-92 |

SUBTLE RESIDUAL — context_window_guard.py uses a percent scale; script DEFAULTS are STALE (25/30 —
200k-era) but env override (settings.json:28-29 = 60/70) wins. WIRED behavior = 60%/70% on 1M.
Recommend FIX-CALIBRATION on context_window_guard.py:28-29 defaults -> 60/70 (defense-in-depth;
harmless today, latent footgun if env block trimmed).

## Q2 — decision:block CRIT SEMANTICS

ANSWER: userpromptsubmit_compact_threshold.py does NOT emit decision:block at CRIT (or any tier) —
ADVISORY-ONLY. Runtime does NOT hard-block at CRIT.

- userpromptsubmit_compact_threshold.py:269-271 — CRIT path = `_emit_crit_advisory(tokens)`
- :216-236 — `_emit_crit_advisory()` emits ONLY hookSpecificOutput.additionalContext + systemMessage.
  No `decision` key. No exit 2.
- :298 — always exit 0.

precompact_guard.py:50-51 IS the decision:block emitter — blocks hintless proactive auto-compaction
below 80%. BUT settings.json:501-512 PreCompact has exactly ONE hook (intelligent-compact);
precompact_guard.py is NOT in the PreCompact array. UNWIRED = dormant.

The W184-orchestrator concern conflated (a) the stale 350k threshold (now 700k) + (b) an assumed
decision:block at CRIT (does not exist). Both halves RESOLVED in current tree.

auto_proceed_gate.py:626 also emits decision:block — but that is the ask-without-act Stop gate,
unrelated to compaction.

## Q3 — ECC suggest-compact DISABLED — is userpromptsubmit_compact_threshold.py the replacement?

ANSWER: YES — circumstantially confirmed (HIGH-INFERRED, not VERIFIED-explicit). No verbatim
"replaces ECC suggest-compact" comment exists. Evidence: (a) ECC suggest-compact disabled at
settings.json:8; (b) ECC version = tool-call count heuristic (N=50/+25) on PreToolUse Edit|Write;
(c) runtime version = direct context-window token estimate on UserPromptSubmit (model-visible event,
better signal); (d) auto-compact-discipline.md:81,83 explicitly classes ECC suggest-compact as
"threshold-adjacent, not part of PreCompact stack"; (e) git log W173 P1(a) authorship. SOTA UPGRADE,
not regression.

## Q4 — PER-HOOK DISPOSITION TABLE

| # | Hook | WIRED? | Event | Emits block? | Disposition |
|---|---|---|---|---|---|
| 1 | userpromptsubmit_compact_threshold.py | UNCERTAIN (NOT in root settings.json UserPromptSubmit array :435-446 — likely plugin-registered) | UserPromptSubmit | NO (advisory, exit 0) | KEEP-AS-IS (pending wire confirm) |
| 2 | precompact_guard.py | NO (absent settings.json:501-512 PreCompact array) | PreCompact (intended) | YES (decision:block :51) | FIX — WIRING DECISION |
| 3 | precompact_hint_emitter.py | NO (absent PreCompact array) | PreCompact (intended) | NO (exit 0) | FIX — WIRING DECISION (half-breaks hint-emitter->hint-reader pair) |
| 4 | sessionstart_compact_hint_reader.py | YES (settings.json:478-487 SessionStart matcher:"compact") | SessionStart(source=compact) | NO (exit 0) | KEEP-AS-IS |
| 5 | context_window_guard.py | NO (absent PostToolUse arrays) | PostToolUse (intended) | YES (`return 2` :95) | FIX — CALIBRATION + WIRING DECISION |
| 6 | auto_proceed_gate.py | YES (settings.json:379-384 Stop matcher:"*") | Stop | YES (decision:block :626) | KEEP-AS-IS — but MISCLASSIFIED (ask-without-act gate, NOT a compact hook) |

### WIRING NOTE (HONEST-NON-FINDING — load-bearing uncertainty)
userpromptsubmit_compact_threshold.py is NOT in root settings.json UserPromptSubmit array (:435-446
has only codex_stuck_detector.py). Either (a) plugin-registered via a plugin hooks.json, OR (b)
genuinely unwired. Orchestrator must `grep -rl "userpromptsubmit_compact_threshold" .claude/plugins/`.
If genuinely unwired: hook #1 disposition flips KEEP-AS-IS -> FIX-WIRING, and Q3's "replacement"
conclusion weakens (disabled ECC + unwired replacement = NO active compact-threshold nudge).

### Disposition summary
| Disposition | Count | Hooks |
|---|---|---|
| KEEP-AS-IS | 3 (or 2 if #1 unwired) | #1 (pending), #4, #6 (not actually a compact hook) |
| FIX — WIRING DECISION | 2 | #2 precompact_guard, #3 precompact_hint_emitter |
| FIX — CALIBRATION + WIRING | 1 | #5 context_window_guard |

## SYNTHESIS — "compact-remind hooks damage the workflow" — is it true?

Mostly NO, with one real residual:
1. Threshold mis-calibration: ALREADY FIXED (W187 round-2 c11db54). Only context_window_guard.py:28-29
   stale 25/30 defaults remain — env override neutralizes; recommend ~2-line fix anyway.
2. decision:block premature hard-block: DOES NOT EXIST in the wired path. The 2 block-emitters
   (precompact_guard.py, context_window_guard.py) are both UNWIRED.
3. The genuine residual: 3 of 6 hooks UNWIRED (precompact_guard, precompact_hint_emitter,
   context_window_guard) — exist + version-tracked but absent from settings.json. WIRING-DECISION
   question, not THRESHOLD question. precompact_hint_emitter unwired HALF-BREAKS the
   hint-emitter->hint-reader handoff pair.
4. Scoping correction: auto_proceed_gate.py is NOT a compact hook. The "6 compact hooks" set is 5.

### Recommended W189 P1 ship (minimal, calibration-focused)
- FIX-CALIBRATION: context_window_guard.py:28-29 defaults 25->60 / 30->70 (~2 lines).
- WIRING-DECISION (operator call): wire OR retire precompact_guard.py + precompact_hint_emitter.py +
  context_window_guard.py per deprecation-discipline 5-question gate + launch-discipline D1.
- CONFIRM-FIRST: grep .claude/plugins/ for userpromptsubmit_compact_threshold wire path.
- OPTIONAL cosmetic: userpromptsubmit_compact_threshold.py:8 docstring stale 780k -> 700k.

### What NOT to do
Do NOT lower the 600k/650k/700k thresholds — they were RAISED to fix 1M-context premature firing.
Do NOT add new decision:block semantics — SOTA shape per auto-compact-discipline.md Rank #3 is
advisory-operator-discipline, which userpromptsubmit_compact_threshold.py already implements.

## HONEST-NON-FINDINGS (explicit)
1. Hook #1 wire path UNCONFIRMED — not in root settings.json; likely plugin-registered.
2. Q3 "replacement" is INFERRED not VERIFIED — no verbatim comment.
3. precompact_guard.py + precompact_hint_emitter.py have thin git provenance.

# ARTIFACT-INLINE end — orchestrator-persisted from Agent A return (agentId a39448c2)
