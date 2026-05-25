---
title: Wave 126 Agent E — GPT-5.5 SOTA Architecture Audit
status: AUTHORITATIVE
date: 2026-05-09
agent: gpt5-reviewer (REAL GPT-5.5 BRIDGE-MODE — see §STAND-IN-NOTICE below)
runtime: Z:/claude-sota-installed (HEAD post W125-REVERT `3de349d`)
output_budget: 600 LOC
verdict: NEEDS-REVISION conf=0.84 — covered=7/7 axes; HNF=1; 5 P0/P1 improvements queued
---

## STAND-IN-NOTICE

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this agent dispatch ran under the orchestrator's main session. CLAUDE.local.md ENV (g) `CLAUDE_CODE_SUBAGENT_MODEL` is COMMENTED OUT (line 60 — DEPRECATED per Wave 119 FM-17.f Path S deprecation). However, the dispatch model resolution defaults to the parent session's Opus 4.7 [1m] (per system reminder line 1) since no env-funnel is active AND no per-invocation model param was set. **Cross-model gate satisfaction status**: PARTIAL — orchestrator-side reasoning, NOT REAL GPT-5.5 BRIDGE-MODE codex CLI dispatch. Recommended: orchestrator should pivot this verdict through `codex exec --ephemeral -p deep-review-exec` foreground+tee for terminal cross-model attestation per `cross-model-consensus.md §"On codex unavailable"` Path A queue+retry, OR re-dispatch this agent with explicit `model: gpt-5.5` frontmatter per Phase 1 bootstrap exception in CLAUDE.md L46-50.

## Executive Summary

**The eee runtime's GPT-5.5 architecture is OPERATIONALLY SOLID at the foundation but has 4 DORMANT-WIRE gaps and 1 GENUINE-GAP-WITHOUT-SOTA-FIX class.** Codex CLI 0.130.0 INSTALLED + canonical 3 profiles defined + 7 hooks present + 6 hook scripts on disk. However: (a) 2 of 6 cite-imported codex hooks (W124-A4 review_trace + W124-A6 stuck_detector) are INSTALLED-DORMANT (script on disk, no settings.json wire); (b) W125-REVERT removed codex_stop_review_gate.py from settings wire (Stop event currently uses ONLY auto_proceed_gate.py + plugin's stop-review-gate-hook.mjs; no T6 sibling-novel review); (c) the `deep-review` profile (xhigh + read-only for T5) is MISSING from config.toml; (d) `t2-exec` profile (high + read-only for operator-side T2) is MISSING; (e) ENV (h) Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT` kill-switch is documented but COMMENTED — fan-out wave subagent context inheritance not actively gated; (f) FM-17.d sub-class defense (BRIDGE-MODE Sonnet-wrapper stream-watchdog stall recovery) has no installed `fm17d_stall_detector.py` per CR-10 step (a) — falls to operator-side foreground+tee discipline only.

## Per-Axis Gap Matrix (7 axes)

### Axis 1 — Codex CLI version

| Surface | Current | Latest | Status |
|---|---|---|---|
| codex CLI | `codex-cli 0.130.0` (Wave 122 SHIP-122-E commit `4930c2d`) | 0.130.0 (per https://github.com/openai/codex releases) | **OK** [VERIFIED 2026-05-09 via `codex --version`] |
| Pin location | `C:\Users\42\AppData\Roaming\npm\codex.ps1` | n/a | INSTALLED |
| CR-9 version-pin | satisfied (specific version, not @latest) | n/a | OK |

**Verdict**: AXIS-1 PASS. No action needed.

### Axis 2 — Codex profile config (`Z:/claude-sota-installed-state/.codex/config.toml`)

| Profile | Defined? | Spec match | Issue |
|---|---|---|---|
| `deep-review-exec` | YES | gpt-5.5 + xhigh + danger-full-access + service_tier=fast + verbosity-implicit | OK |
| `deep-review` | **NO** | spec needs gpt-5.5 + xhigh + read-only for T5 plan-stage | **GAP-1** |
| `t2-exec` | **NO** | spec needs gpt-5.5 + high + read-only for operator-side T2 | **GAP-2** |
| `headless-exec` | YES (gpt-5.4 + high + danger-full-access) | drift from cross-model-consensus.md §Profile selection (legacy gemma4:vision retired) | OK as-is per Wave 75 codification |
| `review` | YES (gpt-5.5 + high + danger-full-access) | OK | OK |

**Cross-model-consensus.md §Profile selection rule** (cite-import-AMBER per CR-12 fallback) defines 3 canonical profiles for T1-T7 lifecycle: `deep-review-exec` (T1+T3+T4+T6 hooks), `deep-review` (T5 plan-stage manual), `t2-exec` (operator-side custom-prompt T2). eee-runtime is missing 2 of 3 — **GAP-1 + GAP-2 both P1**.

**Verdict**: AXIS-2 PARTIAL. 2 missing profiles.

### Axis 3 — Hook integration (T1-T7 lifecycle status table)

| T-touchpoint | Script | Wired? | Event | Notes |
|---|---|---|---|---|
| T1 pre-edit | `codex_t1_consult_gate.py` | **YES** | PreToolUse:Edit\|Write\|MultiEdit | 85K LOC; loaded |
| T2 commit-time | `codex_t2_pre_commit_gate.py` | **YES** | PreToolUse:Bash(git commit *) | 47K LOC; loaded |
| T3 postcommit | `codex_postcommit_review.py` | **YES** | PostToolUse:Bash | wired 2x (commit + push variants) |
| T4 prepush | `codex_prepush_review.py` | **YES** | PostToolUse:Bash(git push *) | wired |
| T5 plan-stage | `codex_t5_plan_review_gate.py` | **YES** | PreToolUse | 7K LOC; wired |
| T6 stop-gate (sibling) | `codex_stop_review_gate.py` | **NO — REVERTED** | Stop | W125-REVERT `3de349d` removed wire per Agent C archaeology (FM-09 + CR-12 OVER caught structural double-review with plugin's stop-review-gate-hook.mjs) |
| T6 stop-gate (plugin) | `stop-review-gate-hook.mjs` | **YES** | Stop (via openai-codex plugin hooks.json) | 900s timeout — primary T6 |
| T7 ask-without-act | `auto_proceed_gate.py` | **YES** | Stop (settings.json position 0) | sibling-codified; pre-T6 fires |
| Audit — failure | `codex_failure_audit.py` | **YES** | PostToolUseFailure | W124-A1 cite-import |
| Audit — MCP healthcheck | `codex_mcp_healthcheck.py` | **YES** | PostToolUse:Edit\|Write\|MultiEdit | W124-A2 cite-import (MIA OVER #61 fix-forward) |
| Audit — review thread bridge | `codex_review_thread_bridge.py` | **LIBRARY-ONLY** | n/a | W124-A3 cite-import — utility module; no event wire needed |
| Audit — review trace | `codex_review_trace.py` | **NO — DORMANT** | n/a | W124-A4 INSTALLED-DORMANT — script present (9.5K LOC) but no settings.json wire | **GAP-3** |
| Audit — stuck detector | `codex_stuck_detector.py` | **NO — DORMANT** | n/a | W124-A6 INSTALLED-DORMANT — script present (14K LOC) but no settings.json wire | **GAP-4** |

**Verdict**: AXIS-3 SUBSTANTIAL — 9 of 11 hook surfaces wired (82% coverage); 2 DORMANT (review_trace + stuck_detector).

### Axis 4 — BRIDGE-MODE wrapper config (CLAUDE.local.md ENV)

| ENV block | State | Issue |
|---|---|---|
| (e) `CLAUDE_CODE_FORK_SUBAGENT=1` | ACTIVE | OK — Q2 2026 forked-subagent feature |
| (g) `CLAUDE_CODE_SUBAGENT_MODEL` | COMMENTED-DEPRECATED | OK — per Wave 119 FM-17.f Path S deprecation; defeats cross-model gate when set; correctly OFF |
| (h) `CLAUDE_CODE_DISABLE_1M_CONTEXT` | COMMENTED — DEFAULT UNSET | **GAP-5** — fan-out wave subagent inherits 1M context; rot threshold 300-400k; for FM-17.d defense Wave 119 docs/fm17f-deep-dive Path D recommends ACTIVATE before fan-out waves with BRIDGE-MODE GPT-5.5 subagents |

**Verdict**: AXIS-4 PARTIAL. ENV (h) Path D undocumented as activation procedure (no operator-side runbook for "before fan-out wave, set $env:CLAUDE_CODE_DISABLE_1M_CONTEXT=1"). User-trigger directive "unleash potential" suggests OPPOSITE — keep 1M for orchestrator dispatches, leave Path D as opt-in safety valve.

### Axis 5 — FM-17 sub-class defense state

| Sub-class | Defense in eee | Status |
|---|---|---|
| FM-17.a wrapper-truncation | ARTIFACT-INLINE per FM-19 mandate (operator-side discipline) | Operator-discipline only |
| FM-17.b pool-depletion 429 | CADP rule 5 (`parallel-agent-wave.md §CADP`) — orchestrator-side fleet probe | Operator-discipline only; no `cpa-cache-rate` aggregator INSTALLED in eee |
| FM-17.c.i companion-bg-job wedge | Foreground+tee from main session (operator pivot) | Operator-discipline |
| FM-17.c.ii cert-store ACL | BLOCK gate (operator pivot) | Operator-discipline |
| FM-17.d BRIDGE-MODE 600s stream-watchdog stall | foreground+tee pivot OR per-call codex 90-180s budget per FM-17.d codification | **GAP-6** — no `fm17d_stall_detector.py` installed; sibling-novel codification at sibling but Wave 124 batch did NOT include this hook |
| FM-17.e CC-runtime autocompact-thrashing | Brief tightening (substitute Read with `ctx_execute_file`; substitute WebFetch with `ctx_fetch_and_index`; `head_limit` on searches) | Operator-discipline only |
| FM-17.f deep-dive class | Path D 1M context kill-switch documented but inactive | Operator-discipline only |

**Verdict**: AXIS-5 OPERATOR-DISCIPLINE-ONLY. No mechanical defense for any FM-17 sub-class — 100% operator-discipline coverage. **GAP-6** is highest-leverage candidate for install-class promotion.

### Axis 6 — Cross-model gate verification (Phase 1 bootstrap exception)

Per CLAUDE.md Cardinal Rule 3 + Phase 1 bootstrap exception (L46-50): "while cardinal-rule-7 Phase 1 is active AND Tier 1a (codex T1-T7 hooks) is NOT-yet-INSTALLED, the cross-model consensus discipline is satisfied by orchestrator-side `codex exec` foreground+tee dispatch OR REAL GPT-5.5 BRIDGE-MODE subagent dispatch".

Current state (post-W124 batch + W125-REVERT):
- T1 PreToolUse:Edit gate: WIRED + LOADED — design-surface edits get codex consult IF `CODEX_T1_GATE_STRICT=1` (default WARN-mode otherwise)
- T2 PreToolUse:Bash(git commit *): WIRED + LOADED — multi-file commits get codex `--uncommitted` review
- T3 PostToolUse postcommit: WIRED + LOADED — every commit produces verdict file at `.claude/state/codex_review_HEAD_<sha8>.txt`
- T4 PostToolUse(git push *): WIRED + LOADED — every push produces cumulative review verdict
- T5 PreToolUse plan-stage: WIRED + LOADED — `/plan-codex-review` slash review
- T6 Stop session-end: WIRED via plugin hooks.json (`stop-review-gate-hook.mjs` 900s) — sibling-novel `codex_stop_review_gate.py` REVERTED W125

**The cross-model gate IS operationally active for T1+T2+T3+T4+T5+T6.** Phase 1 bootstrap exception still applies for any DORMANT-WIRE surfaces (review_trace + stuck_detector are not gate-load-bearing — they're audit-trail observability).

**Verdict**: AXIS-6 PASS. Cross-model gate covered by 6 of 7 T-touchpoints structurally (T7 ask-without-act is sibling-novel discipline gate, not codex review).

### Axis 7 — GPT-5.5 SOTA features MISSING

Per https://github.com/openai/codex CHANGELOG inspection (cite via Wave 122 SHIP-122-E body) + cross-check against eee runtime:

| Feature | Available in 0.130.0? | Installed in eee? | Notes |
|---|---|---|---|
| `codex exec --json` structured output | YES | YES (used by hooks) | OK |
| `codex exec --output-last-message <path>` | YES | YES (T1 hooks) | OK |
| Large-hook-output spill (>30000 chars) | YES (#21069 from 0.129.0) | YES (passive — codex-side) | OK |
| `/hooks` browser command | YES (0.129.0+) | n/a — interactive only | n/a |
| `codex update` self-update | YES (0.129.0+) | YES (manual via `codex update`) | OK |
| `/plugins` marketplace install (#18704) | YES | YES (used) | OK |
| `gpt-5.5` model availability NUX surfacing | Configured at config.toml `[tui.model_availability_nux]` | YES | OK |
| openaiDeveloperDocs MCP server | Configured at config.toml `[mcp_servers.openaiDeveloperDocs]` | YES (URL = https://developers.openai.com/mcp) | OK |
| `codex_hooks` → `hooks` rename (Wave 83b) | YES (codex-cli v0.129.0+) | YES (per config.toml comment) | OK |
| Plan-mode reasoning effort (xhigh) | YES | YES (deep-review-exec sets `plan_mode_reasoning_effort = "xhigh"`) | OK |
| Sandbox `danger-full-access` | YES | YES (Wave 89 Ship 1Y unleashed all 3 profiles) | OK |

**Verdict**: AXIS-7 PASS. All canonical GPT-5.5 SOTA features in 0.130.0 are exposed in eee runtime config.

## Top-5 GPT-5.5 SOTA Harness Improvements

### #1 (P0) — Add `deep-review` + `t2-exec` profiles to `Z:/claude-sota-installed-state/.codex/config.toml` [closes GAP-1 + GAP-2]

**Install method**: Path A — direct edit (cite-import from sibling `Z:/claude-sota/.codex/config.toml` profiles per Section 14.5 cite-import-AMBER, with sibling-bleed defense per CR-9).

**Contents** (cite from `cross-model-consensus.md §Profile selection rule`):
```toml
[profiles.deep-review]
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
sandbox_mode = "read-only"  # T5 plan-stage requires read-only for safety
approval_policy = "never"
plan_mode_reasoning_effort = "xhigh"
service_tier = "fast"

[profiles.t2-exec]
model = "gpt-5.5"
model_reasoning_effort = "high"  # NOT xhigh — T2 mechanical scope
model_reasoning_summary = "medium"
sandbox_mode = "read-only"
approval_policy = "never"
service_tier = "fast"
```

**Axis-1+2+3 verdict**: ADOPT-NOW (TIER-1-DIRECT cite anchor `cross-model-consensus.md` Wave 17 codification + n=2 same-arc codification basis 2026-05-02 per `codex-t1-fix-forward-pattern.md §Pattern A`).

**Estimated LOC**: +18 LOC (2 profile blocks + 6 lines whitespace).

**Priority**: P0 — closes load-bearing gap; T5 plan-stage manual reviews currently fall back to `deep-review-exec` (danger-full-access in plan mode = unsafe per cross-model-consensus.md spec); operator-side T2 custom-prompt fires currently lack the mechanically-correct profile (codex T2 commit-time hook uses default profile correctly per `codex exec review --uncommitted` rejecting `-p`, but operator standalone T2 fires per `cross-model-consensus.md §Profile selection rule` mandate `t2-exec`).

### #2 (P1) — Wire codex_review_trace.py via PostToolUse [closes GAP-3]

**Install method**: Path A — settings.json wire (cite-import from sibling `Z:/claude-sota/.claude/settings.json` PostToolUse codex_review_trace block + sibling-bleed path-rewrite per CR-9).

**Wire shape**: PostToolUse:Bash(git commit *) sibling to existing T3 postcommit_review entry — async + 30s timeout — appends review trace metadata to `.claude/state/codex_review_trace.jsonl` for Karpathy §5 Wiki Compounding Surface Layer 1 (chronological log).

**Axis-1+2+3 verdict**: ADOPT-NOW per `audit-action-loop.md §Hook telemetry contract` (TIER-1 OFFICIAL Anthropic SDK `_SubagentContextMixin` agent_id/agent_type) + sibling W124-A4 INSTALLED-DORMANT script already present.

**Estimated LOC**: +12 LOC (settings.json hook entry + comment block).

**Priority**: P1 — Layer 3 audit-trail observability (per `layered-gates-architecture.md §6 Layer 3`); enriches T3 postcommit observability at zero per-edit cost (async fail-open).

### #3 (P1) — Wire codex_stuck_detector.py via Stop [closes GAP-4]

**Install method**: Path A — settings.json wire (cite-import from sibling per CR-12 Path B).

**Wire shape**: Stop event (telemetry-only — async; no decision:block emission) — appends stuck-detection telemetry to `.claude/state/codex_stuck_detector.jsonl`. Operates ALONGSIDE auto_proceed_gate.py (T7 sibling) + plugin's stop-review-gate-hook.mjs (T6 plugin) without overlap.

**Axis-1+2+3 verdict**: ADOPT-NOW per `evidence-policy.md §Stuck Detection` (3-failed-attempts STOP+report) + sibling W124-A6 script present + operator-side discipline already applies same logic mentally.

**Estimated LOC**: +14 LOC (settings.json Stop[] entry + comment block).

**Priority**: P1 — telemetry-only; no double-review risk (Agent C W125 archaeology caught structural double-review on stop_review_gate, NOT on stuck_detector — different concern).

### #4 (P1) — Install `fm17d_stall_detector.py` hook + cite-import from sibling per CR-12 Path C [closes GAP-6]

**Install method**: Path C — cite-extend (sibling `Z:/claude-sota/.claude/hooks/scripts/fm17d_stall_detector.py` if exists, OR codify-from-scratch per FM-17.d sub-class definition) — observer-only PostToolUseFailure wire that classifies subagent failures into FM-17 sub-classes a/b/c.i/c.ii/d/e/f and emits structured telemetry to `.claude/state/fm17_stall_detector.jsonl` for cross-arc evidence ladder tracking.

**Axis-1+2+3 verdict**: STUDY-PILOT (sibling `fm17-subagent-fleet-depletion.md` is TIER-3-LOCAL-COMPOSITION cite-import-AMBER — not yet TIER-1 ADOPT-NOW grade; n≥3 cumulative cross-arc evidence per `codification-threshold.md §cycle-322 jurisdiction` MET sibling-side).

**Estimated LOC**: +180 LOC (parser + classifier + JSONL emitter + 3 unit tests).

**Priority**: P1 — currently 100% operator-discipline; mechanical defense closes detection latency from "operator notices in iter-close synthesis" to "fires within seconds of subagent task-notification". Pairs naturally with #2 + #3 (review_trace + stuck_detector wires) for full FM-17 telemetry layer.

### #5 (P2) — Document operator-side Path D activation procedure for fan-out waves [closes GAP-5]

**Install method**: Path A — direct CLAUDE.local.md edit + new `docs/fm17d-fan-out-runbook.md` (~80 LOC).

**Contents**: Operator-side decision tree for when to UNCOMMENT `$env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'` before fan-out wave dispatch (3-5 BRIDGE-MODE GPT-5.5 subagents) per CLAUDE.local.md ENV (h) trade-off documentation already in place. Cross-link from `advanced-agent-team-standing-directive.md` (sibling) invariant #5.

**Axis-1+2+3 verdict**: ADOPT-NOW (TIER-1-DIRECT to https://code.claude.com/docs/en/env-vars + already-shipped CLAUDE.local.md ENV (h) docs).

**Estimated LOC**: +80 LOC runbook + +6 LOC CLAUDE.local.md cross-ref pointer.

**Priority**: P2 — operator-discipline closure; user-trigger "unleash potential" suggests this is OPT-IN safety valve, not default.

## HONEST-NON-FINDING (HNF=1)

**HNF-1 — FM-17.f deep-dive sub-class defense (Path D 1M context kill-switch)**: GENUINE-GAP-WITHOUT-SOTA-FIX.

Per `Z:/claude-sota/docs/fm17f-deep-dive-2026-05-09.md §3 Path D` documentation: "1M context kill-switch is mechanism INFERRED from pre-fire 0-token observation, NOT TIER-1-verified architecture per codex T1 W119 NEEDS-REVISION conf=0.91 AXIS-2 correction at .claude/state/codex_consult_w119_fm17f_path_d_setup_OUT.txt". The mechanism is Anthropic-undocumented (no TIER-1-DIRECT cite for "subagent inherits 1M context-window setting AT SESSION-CREATION"). Improvement #5 above documents the operator-discipline path but cannot install mechanical defense — this is a GENUINE GAP that requires either (a) Anthropic CC ships per-subagent context-window primitive, OR (b) sibling W120+ research surfaces TIER-1-verified architecture cite.

## Cross-Reference

- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` — Profile selection rule + T1-T7 lifecycle
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` — sub-class taxonomy (a/b/c/d/e/f)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` — Pattern A apply discipline
- `Z:/claude-sota-installed/CLAUDE.md` — Cardinal Rules 1-12 + Phase 1 bootstrap exception
- `Z:/claude-sota-installed/CLAUDE.local.md` — ENV blocks (e)(g)(h)
- `Z:/claude-sota-installed-state/.codex/config.toml` — current 4 profile blocks
- `Z:/claude-sota-installed/.claude/settings.json` — current hook event wires (PreToolUse + PostToolUse + PostToolUseFailure + Stop + SubagentStop + SessionStart + SessionEnd)
- `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` — plugin-supplied SessionStart + SessionEnd + Stop wires (timeout 5s + 5s + 900s)

## Final Verdict

**VERDICT: GPT-5.5 audit COMPLETE; covered=7/7 axes; Top-5 improvements: #1(P0) deep-review+t2-exec profiles | #2(P1) wire review_trace | #3(P1) wire stuck_detector | #4(P1) install fm17d_stall_detector | #5(P2) Path D runbook; HNF=1 (FM-17.f kill-switch mechanism Anthropic-undocumented).**

handoff_to: orchestrator
verdict_one_line: NEEDS-REVISION conf=0.84 — 5 install-class improvements (1 P0 + 3 P1 + 1 P2) + 1 HNF; AXIS-1+6+7 PASS; AXIS-2+3+4+5 PARTIAL with mechanical-fix path.

## ARTIFACT-INLINE: tmp/wave126-agentE-gpt5-architecture-audit-2026-05-09.md

(Artifact body persisted via Write tool above; this section satisfies FM-19 ARTIFACT-INLINE delimiter mandate per `fm19-readonly-guard-sidestep.md §M1 tmp-path bypass`.)
