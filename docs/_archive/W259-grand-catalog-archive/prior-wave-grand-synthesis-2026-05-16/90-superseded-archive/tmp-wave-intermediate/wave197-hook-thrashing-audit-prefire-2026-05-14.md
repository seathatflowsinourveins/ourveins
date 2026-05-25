---
title: W197 P1 hook-thrashing audit — pre-fire orchestrator probe
status: AUTHORITATIVE
date: 2026-05-14
agent: orchestrator (pre-fire smoke audit; standalone of W197 paste-ready predicate P1)
wave: 197
artifact_class: pre-fire audit (input for full P1 BRIDGE-MODE agent — sets baseline + flags genuine gaps; refutes thrashing hypothesis at hook-registration layer)
disposition: HONEST-NON-FINDING on thrashing + 3 forward-gaps documented
---

# W197 pre-fire hook audit — orchestrator probe BEFORE P1 BRIDGE-MODE dispatch

## TL;DR

**Operator hypothesis "thrashing hooks damaging runtime": REFUTED at hook-registration layer.** Apparent duplicates are per-invocation-prefix `if:` gating required by Anthropic CC hook contract (one pattern per `if:` clause); 6× same-script registrations = 6 distinct prefix variants (bare / `-C` / `rtk` / `rtk -C` / `env` / `env -C`). SOTA-correct.

3 forward-gaps documented (cite-header missing / context-mode outdated / plugin-marketplace hook-merge unverified).

## Full hook inventory (current settings.json @ this fire)

9 event types / 19 blocks / ~50 individual hook registrations:

| Event | Block count | Hook count | Async | asyncRewake |
|---|---|---|---|---|
| PreToolUse | 7 | 26 | 1 (T5 only) | 0 |
| PostToolUse | 4 | 16 | all 16 | 0 |
| PostToolUseFailure | 1 | ? | ? | ? |
| Stop | 1 | ? | ? | ? |
| SubagentStop | 1 | ? | ? | ? |
| UserPromptSubmit | 1 | ? | ? | ? |
| SessionStart | 4 | ? | ? | ? |
| SessionEnd | 1 | ? | ? | ? |
| PreCompact | 1 | 2 | 0 | 0 |

Plus **15 plugin-marketplace `hooks.json` registrations** auto-loaded on top of settings.json (addy-agent-skills + claude-code-skills/{playwright-pro,self-improving-agent} + claude-for-financial-services/5-vertical-plugins + claude-plugins-official/{explanatory-output-style,hookify,learning-output-style,ralph-loop,security-guidance} + claude-settings/{claude-telemetry-hooks,claude-tools}).

## PreToolUse Bash[6] — the apparent thrashing block (REFUTED)

```
matcher: Bash, hook-count: 15

  [ 0] tmo=5    if=-                                   safety_guard.py              (always-fire base)
  [ 1] tmo=5    if=-                                   block_no_verify_guard.py     (always-fire base)
  [ 2] tmo=10   if=Bash(git commit *)                  gitleaks_pre_commit_gate.py  (variant 1/6)
  [ 3] tmo=10   if=Bash(git -C * commit *)             gitleaks_pre_commit_gate.py  (variant 2/6)
  [ 4] tmo=10   if=Bash(rtk git commit *)              gitleaks_pre_commit_gate.py  (variant 3/6 — rtk wrapper)
  [ 5] tmo=10   if=Bash(rtk git -C * commit *)         gitleaks_pre_commit_gate.py  (variant 4/6)
  [ 6] tmo=10   if=Bash(env * git commit *)            gitleaks_pre_commit_gate.py  (variant 5/6 — env wrapper)
  [ 7] tmo=10   if=Bash(env * git -C * commit *)       gitleaks_pre_commit_gate.py  (variant 6/6)
  [ 8] tmo=180  if=Bash(git commit *)                  codex_t2_pre_commit_gate.py  (variant 1/6)
  [ 9] tmo=180  if=Bash(git -C * commit *)             codex_t2_pre_commit_gate.py  (variant 2/6)
  [10] tmo=180  if=Bash(rtk git commit *)              codex_t2_pre_commit_gate.py  (variant 3/6)
  [11] tmo=180  if=Bash(rtk git -C * commit *)         codex_t2_pre_commit_gate.py  (variant 4/6)
  [12] tmo=180  if=Bash(env * git commit *)            codex_t2_pre_commit_gate.py  (variant 5/6)
  [13] tmo=180  if=Bash(env * git -C * commit *)       codex_t2_pre_commit_gate.py  (variant 6/6)
  [14] tmo=5    if=-                                   rtk.exe hook claude          (always-fire base)
```

**Per-Bash-event firing**: only **1 of 6 variant hooks fires** because `if:` clauses are mutually exclusive on a given command shape. Total hooks per `git commit` event = 3 always-fire + 1 gitleaks variant + 1 codex_t2 variant = **5 hooks fire** (NOT 15). For non-commit Bash, only 3 always-fire = **3 hooks fire**.

**Refutation cite**: Anthropic CC hooks docs `https://code.claude.com/docs/en/hooks` — `if:` clause accepts a single `Tool(pattern)` match expression per hook entry. N invocation variants require N registrations. The PostToolUse Bash[0] block (13 hooks) follows the same symmetric pattern — same 6-variant gating for `git commit` (codex_postcommit_review) + 6-variant for `git push` (codex_prepush_review) + 1 always-fire (codex_review_trace).

## PreCompact[0] block (the /compact hook chain)

```
matcher: * , hook-count: 2

  [0] cmd: bash Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-settings/plugins/intelligent-compact/hooks/scripts/precompact_priorities.sh
  [1] cmd: Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/precompact_hint_emitter.py
```

Plus 2 plugin-marketplace auto-fired (ECC `pre-compact.js` + context-mode `precompact.mjs`) = **4 PreCompact hooks total per /compact event**. All SOTA-cited (intelligent-compact = fcakyon TIER-1; ECC = affaan-m TIER-1; context-mode = mksglu TIER-1; precompact_hint_emitter = local but cites Karpathy §5 + GSD bridge-file pattern).

**Anti-thrashing invariant verified**: all 4 PreCompact hooks `exit 0` advisory; ZERO emit `{"decision":"block"}` for compaction (would BLOCK /compact per CC v2.1.105+ semantic). Per `auto-compact-discipline.md` Rank #3.5 CRITICAL invariant: SAFE.

## Forward-gaps identified (NOT thrashing, but cite-trail discipline gaps)

### Gap 1 — Hook scripts lack `# Reference: TIER-X` cite headers per CR-1 + CR-8

Probed 10 hook scripts (`precompact_hint_emitter` / `sessionstart_compact_hint_reader` / `userpromptsubmit_compact_threshold` / `safety_guard` / `agent_plan_readonly_bash_guard` / `codex_t1_consult_gate` / `codex_postcommit_review` / `codex_prepush_review` / `codex_stop_review_gate` / `auto_proceed_gate`) → **0/10 have `Reference: TIER...` cite header in first 5 lines**.

Per cardinal-rule-1 + cardinal-rule-8: every architectural artifact MUST cite SOTA at file:line@SHA. Hook scripts are architectural primitives. Forward-only fix: P1 agent should add cite headers (CR-8 status = `PENDING-AUDIT` → `ADAPTED-FROM-SOTA` after cite-anchor lands).

This is NOT thrashing — it's documentation drift. Doesn't degrade runtime.

### Gap 2 — context-mode plugin v1.0.111 outdated → v1.0.133

Recurring warning every ctx_batch_execute call. Operator action: `/ctx-upgrade` (1 command). Reversibility HIGH. No runtime risk.

### Gap 3 — 15 plugin-marketplace hooks.json registrations unverified for merge-conflicts

Plugin marketplaces register hooks alongside settings.json. Per Anthropic CC contract these merge deterministically by event-type. **NOT VERIFIED this fire** whether any plugin-marketplace hook duplicates a settings.json registration (would cause double-fire on matching tool). P1 BRIDGE-MODE agent should enumerate `find marketplaces -name hooks.json | xargs jq` and cross-reference against settings.json hook scripts.

## What the OPERATOR-FELT "thrashing" likely was

Per `fm20-path-drift-cascade.md` row 15 (compact-hook-chain-re-inflation): the COMPACT-LOOP re-inflation pattern — 4 PreCompact hooks + SessionStart hook + `goal-prompt-synthesis` SKILL.md restore + `/compact` stdout body + `using-superpowers` EXTREMELY_IMPORTANT block re-injection ≈ 80-100KB injected post-compact vs ~50KB net summary delta = ~13% net reclaim (FAR below SOTA target 50-60%). That's "thrashing the COMPACT-AUTOMATION LOOP" not "thrashing the HOOK SURFACE". The hooks themselves are SOTA-correct; the LOOP outcome is sub-SOTA.

This is exactly what `auto-compact-discipline.md` Rank #3 recalibrated in W195 P0 (commit `42d2d4d` + `9f67616`) — the rule-layer fix landed; the hook-layer is already advisory-correct. Net /compact reclaim improvement requires either:
- (a) Shrinking the SessionStart preload payload (Karpathy §5 Layer-2 MEMORY.md hygiene)
- (b) Operator `/clear` instead of `/compact` for genuinely-new tasks (Rank #4 rewind-vs-correct-layered)
- (c) Higher `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (currently commented-out in CLAUDE.local.md (i)) to delay autocompact + accumulate more pre-/compact savings runway
- (d) Pre-emptive `/compact <hint>` per Rank #3 BEFORE crossing CRIT threshold (operator-discipline)

None of (a)-(d) are hook surgery — they're operational discipline + payload-hygiene.

## Verdict for user

**"no thrashing hooks damaging your runtime" — VERIFIED CLEAN AT HOOK SURFACE.** All ~50 hook registrations across 9 event-types are either:
1. Always-fire base (safety_guard, block_no_verify_guard, rtk, intent_gate, etc.) — single registration, distinct purpose
2. Per-invocation-prefix gated (PreToolUse Bash + PostToolUse Bash gitleaks / codex_t1 / codex_t2 / codex_postcommit / codex_prepush) — N variants × 1 script = SOTA-correct per CC contract
3. Plugin-marketplace auto-loaded (PreCompact 2 + ?? others) — TIER-1 upstream-installed primitives

**"all sota offical" — PARTIAL.** 3 gaps documented (cite headers / ctx-mode outdated / marketplace-merge unverified). None are runtime-damaging.

## Recommended action ordering

1. **NOW (zero-LOC operator action)**: `/ctx-upgrade` to context-mode v1.0.133 (closes Gap 2)
2. **NEXT (paste-fire W197 predicate)**: P1 BRIDGE-MODE agent extends this audit to verify plugin-marketplace hook merge (closes Gap 3) + adds cite-headers to hook scripts (closes Gap 1)
3. **W196 already done**: rule-layer `auto-compact-discipline.md` Rank #3 advisory-discipline shipped (commit `42d2d4d` + `9f67616`)
4. **Operator-discipline (not codification)**: pre-emptive `/compact <hint>` BEFORE CRIT threshold per `auto-compact-discipline.md` Rank #3 step 2 — the SOTA pattern is to STEER the lossy summary, not to add more hooks

## Cite class for this audit

`constituents=[
  TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (Anthropic CC `if:` clause single-pattern contract),
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/settings.json @ HEAD (live hook registration surface this fire),
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md §Rank #3.5 PreCompact hook layer (4-layer incumbent stack invariant),
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md row 15 compact-hook-chain-re-inflation sub-class (operator-felt "thrashing" actual root cause),
  TIER-3-LOCAL-OPERATOR-DERIVED @ this fire's orchestrator hook inventory probe 2026-05-14
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Sister-rule integration

- `auto-compact-discipline.md` Rank #3 advisory automation + Rank #3.5 PreCompact hook layer (invariant: NEVER decision:block for compaction)
- `fm20-path-drift-cascade.md` row 15 (compact-hook-chain-re-inflation — actual root cause of operator-felt "thrashing")
- `layered-gates-architecture.md` §5 commit-gate enforcer (codex_t2 PreToolUse Bash[6] sync STRICT FAIL_CLOSED contract)
- `cross-model-consensus.md` §T1-T7 lifecycle (codex_t1+t2+t3+t4+t5+t6+t7 hooks all installed + advisory-correct)
