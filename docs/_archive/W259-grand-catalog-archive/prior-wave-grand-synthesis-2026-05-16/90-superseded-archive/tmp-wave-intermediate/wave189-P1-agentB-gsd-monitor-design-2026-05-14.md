# W189 P1 Agent B — gsd-context-monitor cite-adapt design + CCBP env-var re-source spec

**Wave**: W189 ARCH-SOTA-CLEANUP / P1 — compact-remind calibration + missing PostToolUse monitor
**Agent**: B (sota-researcher, Sonnet stand-in — STAND-IN-NOTICE: RESEARCH/DESIGN output; codex T1 verification REQUIRED before any Edit lands)
**Date**: 2026-05-14
**Scope**: TIGHT — gsd-context-monitor.js cite-adapt + CCBP claude-settings.md env-var re-source ONLY

## DELIVERABLE 1 — gsd-context-monitor CITE-ADAPT DESIGN

### 1.1 Source read
`Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js` @ HEAD 3aaed8f5 (file-pin SHA 7be9affea289287396cd282f1563e0502deee783) — 193-LOC Node.js PostToolUse/AfterTool hook. MIT, Copyright (c) 2025 Lex Christopherson (VERIFIED via LICENSE:1-3 + package.json:38), author TÂCHES.

Anatomy / KEEP-vs-rewrite:
- L1-19 header doc (WARNING<=35% remaining / CRITICAL<=25%, debounce-5, severity-escalation) — KEEP (rewrite threshold doc)
- L21-24 requires — KEEP
- L26-29 hardcoded threshold consts — PATH-REWRITE (env reads, §1.4)
- L31-40 stdin read + 10s timeout guard (#775/#1162 Windows pipe-hang) — KEEP (load-bearing on Windows)
- L42-54 parse stdin -> session_id; path-traversal reject — KEEP (security)
- L56-70 .planning/config.json sentinel opt-out — PATH-REWRITE (runtime-native env opt-out, §1.3)
- L72-78 read metrics from os.tmpdir()/claude-ctx-{sessionId}.json — PATH-REWRITE — THE KEY CHANGE (§1.3)
- L80-94 parse metrics; stale-check; remaining + usedPct; early-exit if remaining > WARNING — PARTIAL-REWRITE
- L96-127 debounce via warned.json; counter + lastLevel; severity-escalation bypass — KEEP (rewrite path)
- L129-156 GSD-active detect (.planning/STATE.md) + auto-record breadcrumb — DROP (no claude-sota-installed equiv)
- L158-178 build advisory message (gsd vs non-gsd branches); never-imperative discipline (#884) — PARTIAL-KEEP (non-gsd branch only)
- L180-187 output {hookSpecificOutput:{hookEventName, additionalContext}} — KEEP (drop Gemini AfterTool branch)
- L188-191 catch -> exit(0) silent-fail — KEEP (load-bearing — never block tool exec)

### 1.2 Target path
`Z:/claude-sota-installed/.claude/hooks/scripts/posttooluse_context_monitor.js` — matches runtime convention (event-prefix naming like userpromptsubmit_compact_threshold.py / sessionstart_compact_hint_reader.py); Node.js (source is Node).

### 1.3 Bridge-file remap (THE load-bearing change)
- gsd source: reads `os.tmpdir()/claude-ctx-{session_id}.json`, schema `{session_id, remaining_percentage, used_pct, timestamp(unix)}`, single-session file
- runtime: `.claude/state/context_window_sidecar.json` written by `context_window_statusline.sh:11,52-60`, a DICT keyed by session_id, each value `{session_id, used_percentage, remaining_percentage, total_input_tokens, total_output_tokens, context_window_size, updated_at(ISO)}`. VERIFIED live: 19 session keys; remaining_percentage int OR float OR None; context_window_size typically 1000000.
- Rewrites: bridge path -> `.claude/state/context_window_sidecar.json` then `data[sessionId]`; `metrics.remaining_percentage` -> `sidecar[sessionId]?.remaining_percentage` (guard None/missing -> exit 0); `metrics.used_pct` -> COMPUTE `Math.round(100 - remaining_percentage)`; `metrics.timestamp` -> `sidecar[sessionId]?.updated_at` ISO -> Date.parse stale-check; `.planning/config.json` opt-out -> env `POSTTOOLUSE_CONTEXT_MONITOR_DISABLE === '1'`; `.planning/STATE.md` breadcrumb -> DROP; warned.json path -> `.claude/state/posttooluse_context_monitor_warned.json` keyed-dict.
- KEEP verbatim: L31-40 stdin timeout guard, L42-54 path-traversal reject, L96-127 debounce + severity-escalation, L180-191 output shape + silent-fail.

### 1.4 Threshold-source wiring
gsd hardcodes WARNING=35 / CRITICAL=25 (remaining-%). Runtime uses absolute-token thresholds `CONTEXT_WINDOW_COMPACT_WARN_TOKENS=600000`/`HIGH=650000`/`CRIT=700000` on 1M ceiling. Design: (1) read `context_window_size` from sidecar row (fallback 1000000); (2) read token thresholds via Node `_intEnv` helper (port of Python `_int_env`); (3) derive remaining-% thresholds = `100*(1 - WARN_TOKENS/context_window_size)` -> 40% on 1M; CRIT -> 30%; (4) compare sidecar.remaining_percentage against derived thresholds. Single source of truth with userpromptsubmit_compact_threshold.py (same `*_COMPACT_*_TOKENS` env). Do NOT consume `CONTEXT_WINDOW_*_PERCENT` (avoid 2nd drifting source — FM-20 env-codified-not-sourced defense). STALE_SECONDS + DEBOUNCE_CALLS: env-expose for parity (recommend).

### 1.5 Cite-class header
gsd-context-monitor.js lives in `Z:/repos/deps/` = upstream repo clone = TIER-1-DIRECT (cite-of-upstream-repo), NOT cite-import-AMBER (reserved for sibling Z:/claude-sota/), NOT TIER-1-NAMED-AUTHOR-QUOTE (that's for book/paper/talk). Constituents form per citation-discipline rule #8:
constituents=[TIER-1-DIRECT @ Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5 (MIT, Copyright (c) 2025 Lex Christopherson, author TÂCHES), TIER-1-DIRECT @ get-shit-done/hooks/gsd-statusline.js:303-341 @ 3aaed8f5 (bridge-write contract + used_pct formula), TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (PostToolUse contract), TIER-3-LOCAL-COMPOSITION @ claude-sota-installed adaptation (bridge-remap + env-wiring + gsd-specific drops)]; effective_tier=TIER-3-LOCAL-COMPOSITION.

### 1.6 settings.json registration
Add a 4th PostToolUse entry with matcher `*` (fire on every tool use; debounce + early-exit keep it cheap). CAVEAT — node path: SessionStart[1] uses an fnm_multishells node path that is shell-session-specific and WILL drift. Recommend bare `node` (PATH-resolved) OR stable npm-global node. Operator must verify node invocation at install time — mark INSTALLED-AMBER until node-path verified.

### 1.7 SRA 10-dim quick-check
D1 license PASS (MIT — modify/merge explicitly permitted), D2 freshness PASS (file-pin 2026-04-11 stable; repo active), D3 star-velocity clear (~58k stars, organic), D4 maintainer TIER-2/TIER-3 (TÂCHES named author, gsd-build org), D5 active (v1.50.0-canary; node>=22), D6 use-class PASS — CRITICAL gate (standalone PostToolUse hook, advisory-only, silent-fail, runtime-agnostic, NO HARD-GATE/interactive-setup — compatible with autonomous /loop + bypassPermissions), D7 Anthropic-aligned PASS (canonical hookSpecificOutput.additionalContext contract), D8 industry adoption PASS (14-runtime, 58k stars, 7 named-T2 reviews), D9 FM-aware clear (documented Windows/path-traversal/imperative-cmd defenses), D10 N/A (GENUINELY-NEW gap, not a replacement).
SRA convergence score 9/10 + critical D1+D6 PASS -> verdict band INSTALL (cite-adapt class). CR-12 disposition class = GENUINELY-NEW (no incumbent PostToolUse continuous monitor; existing 3 PostToolUse entries are codex-review/healthcheck/trace).

## DELIVERABLE 2 — CCBP ENV-VAR RE-SOURCE SPEC

### 2.1 CCBP claude-settings.md VERBATIM (HEAD 48f2ceb)
claude-settings.md:826: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE | Auto-compact threshold percentage (1-100). Default is ~95%. Set lower (e.g., 50) to trigger compaction earlier. Values above 95% have no effect.`
claude-settings.md:967: `CLAUDE_CODE_AUTO_COMPACT_WINDOW | Set the context capacity in tokens used for auto-compaction calculations. Defaults to the model's context window (200K standard, 1M for extended context models). Use a lower value (e.g., 500000) on a 1M model to treat it as 500K for compaction. ... CLAUDE_AUTOCOMPACT_PCT_OVERRIDE is applied as a percentage of this value.`
claude-settings.md:968: `DISABLE_AUTO_COMPACT | Disable automatic context compaction (1 to disable). Manual /compact still works`

### 2.2 Semantic relationship
Effective autocompact trigger = `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE% × CLAUDE_CODE_AUTO_COMPACT_WINDOW` tokens. Default ~95% × 1M = ~950k.

### 2.3 Re-source for CLAUDE.local.md ENV(j)
IMPORTANT — NOT a 1:1 rename. `CONTEXT_WINDOW_COMPACT_*_TOKENS` are runtime-NOVEL env var names consumed by the runtime's OWN advisory-layer hooks (userpromptsubmit_compact_threshold.py + the proposed posttooluse_context_monitor.js) — they are NOT Anthropic CC native. Anthropic native = `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` + `CLAUDE_CODE_AUTO_COMPACT_WINDOW` + `DISABLE_AUTO_COMPACT`.
The correct re-source = ADD `claude-settings.md:826,967 @ HEAD 48f2ceb` as the TIER-1-DIRECT authority for the token-vs-percentage MODEL + 1M-ceiling semantics that the runtime's threshold values are calibrated against. The buffer invariant "CRIT_tokens < autocompact_pct × context_window_size, >=100k buffer" derives DIRECTLY from claude-settings.md:967 — but ENV(j)'s current cite lattice never names CCBP:967 as that source.
Corrected ENV(j) cite header adds TIER-1-DIRECT constituent: `claude-settings.md:826,967 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — upstream authority for the autocompact MODEL. This ADDS the missing upstream anchor; does not replace existing constituents.

### 2.4 Optional follow-on (NOT W189 P1 scope)
Runtime does not currently set CLAUDE_AUTOCOMPACT_PCT_OVERRIDE or CLAUDE_CODE_AUTO_COMPACT_WINDOW (ENV(i) is commented-out per W183 F1 REVERT). Whether to set native CLAUDE_CODE_AUTO_COMPACT_WINDOW = separate calibration decision, flag for future fire.

## DELIVERABLE 3 — CONVERGENCE CHECK
The REPO (gsd-build/get-shit-done) is single-org -> STUDY-PILOT cap for WHOLESALE repo adoption. But the brief asks about the PATTERN, and we cite-ADAPT ONE FILE.
PATTERN convergence — 3-org evidence: gsd-build (gsd-context-monitor.js PostToolUse additionalContext advisory) + everything-claude-code (ECC suggest-compact.js PreToolUse Edit|Write /compact-suggestion) + Anthropic-native (context_window payload + CLAUDE_AUTOCOMPACT env model + hookSpecificOutput.additionalContext contract). Plus 4th in-runtime: userpromptsubmit_compact_threshold.py (UserPromptSubmit-event peer).
VERDICT: the PostToolUse-context-monitor PATTERN converges >=3 orgs -> Axis-1 PASS -> cite-adapt is INSTALL-class, NOT STUDY-PILOT-capped. SRA 9/10 + critical D1+D6 PASS. CR-12 GENUINELY-NEW. The STUDY-PILOT framing in W189 prior research (Agent A fire 1) was the conservative pre-convergence-check label.
CAVEAT: Sonnet stand-in research output — cross-model T1 verification REQUIRED before posttooluse_context_monitor.js + settings.json registration + ENV(j) re-source Edits land (SRA cross-model T1 mandate + CR-3).

# ARTIFACT-INLINE end — orchestrator-persisted from Agent B return (agentId a27548ed)
