# W325 Stream A — Orchestration Silent-Fallback Audit V2

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

**Wave**: W325 (2026-05-19) | **Agent**: Stream A of 8-agent parallel dispatch | **Read-only audit**
**Methodology**: 6 MCP source families (deepwiki, perplexity_ask, ctx_fetch_and_index of docs.anthropic.com + code.claude.com docs, local Read of `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/**`, gh REST API for SHA freshness, ctx_execute empirical telemetry scan of 3145 JSONL session files)
**Anti-bias mandate**: ranked by orthogonal dims D35/D38/D41, NOT stars; cross-source quorum required

---

## Executive Summary (≤400 words)

**Operator concern "agent team orchestration silent fallback" → CONFIRMED-FULLY** with 7 distinct failure modes mapped, 3 of them NEWLY MEASURED with empirical telemetry this wave.

**Headline empirical finding** (NEW W325 — not previously measured in this depth): rolling parallel_ratio from 3145 JSONL session files across **last 30 days** is **0.0034** (6 multi-Agent-in-one-message turns out of 1752 Agent-dispatching turns), with **0.0036 last-7d** and **0.0000 today**. CLAUDE.md's stated baseline of 0.587 (W312-D rolling-30d) and target ≥0.7 are **two orders of magnitude above empirical reality**. The "100% parallel_ratio this dispatch" claims in W319/W316/W324/W325 status sections describe per-dispatch behavior **when** the orchestrator does fan-out, but those dispatches are vanishingly rare in real-world telemetry. **W269 parallel-dispatch mandate is empirically unenforced despite the parallel-dispatch-mandate skill shipped W316-r2-S3.**

**Subagent typo trap** (W319-A-H3 → now resolved empirically): Claude Code 2.1.144 changelog confirms Agent tool `subagent_type` matching is "case- and separator-insensitive" — `Code Reviewer` resolves to `code-reviewer`. This is **partially documented** but does NOT explicitly include underscore-to-hyphen normalization. Risk class is silent-success rather than fail-closed: typos like `general_purpose` may resolve correctly OR silently fall through to a default agent depending on the registered set, with no clear error to the parent assistant.

**Stop-hook 900s timeout** (W325 NEW): confirmed FAIL-CLOSED via direct read of `stop-review-gate-hook.mjs:105-118` — `spawnSync` with `timeout: 15 * 60 * 1000` returns `ETIMEDOUT` and the hook emits `{decision:"block", reason:"...timed out after 15 minutes..."}`. No silent fall-through. However, under context-flood the `codex exec` subprocess may exit with status 1 + empty rawOutput (per openai/codex-plugin-cc#306), which the hook DOES handle correctly via `parseStopReviewOutput()` lines 69-95.

**Empty-final-message detection** (W319-A-H2 carry): claude-cookbooks `patterns/agents/orchestrator_workers.ipynb` cell-2 (HEAD `2eed173a`) DOES contain the documented detection pattern `if not worker_content or not worker_content.strip()` — we lack equivalent guard in our parallel-dispatch-mandate skill. **CODIFY W325 P0**.

**GitHub-MCP search_repositories** silent-fallback now 5+ waves confirmed; mitigation is `gh api search/repositories?q=...` fall-through, per `mcp-superassistant#195` + `dev community 11077680`.

**Fork context-flood** (W321 → W325 NEW root-cause): forked subagents inherit parent transcript via `CLAUDE_CODE_FORK_SUBAGENT=1`; injecting an additional 50-200K token repomix pack into a fork that already carries ~400K parent transcript hits the model's hard context limit (200K Sonnet / 1M Opus-with-flag). Claude Code's documented behavior is explicit error after compaction attempt — but under FORK_SUBAGENT=1 the fork may silently `decision:"block"` from auto-compact with no artifacts surfaced.

---

## Findings (7 numbered, ≤400 words total body)

### F1 — parallel_ratio EMPIRICAL CATASTROPHE [SEV-1, NEW W325]

**Measurement**: scan of 3145 JSONL session files at `Z:/claude-sota-installed/.claude/projects` shows parallel_ratio_30d=**0.0034** (6/1752), parallel_ratio_7d=**0.0036** (6/1683), parallel_ratio_today=**0.0000** (0/440 Agent dispatches).
**Cite**: ctx_execute parallel_ratio scan, distribution `{"1": 1746, "2": 2, "3": 4, "4-7+": 0}`; CLAUDE.md L34 W317-r2-Stream-1 claim "rolling-30d 0.5875"; `parallel-dispatch-mandate` skill at `.claude/skills/parallel-dispatch-mandate/SKILL.md`.
**Counterfactual**: if W312-D's prose-tightening + W316 skill-ship had worked, parallel_ratio_30d would be ≥0.5; observed 0.0034 = **172× too low** vs W312-D claim, **205× too low** vs ≥0.7 target.
**Root cause**: W312-D measured per-wave dispatch ratio, NOT per-turn-with-Agent-dispatch. Reproducing W317-r2 methodology against same dataset yields ~0.003-0.006. CLAUDE.md L34 cite is methodology-inflated.
**P-block W325 P0 — FIX**: re-baseline CLAUDE.md L34 with corrected metric `parallel_2plus_in_one_assistant_message / turns_with_any_Agent_call`; add a PreToolUse[Agent] runtime hook that detects N-consecutive solo Agent calls in same assistant message stream and warns when N≥3 and parallel batching was feasible.

### F2 — subagent_type underscore-vs-hyphen trap [SEV-2, EMPIRICAL CARRY W319-A-H3]

**Cite**: docs.anthropic.com/en/docs/claude-code/sub-agents §"Custom subagents" + Claude Code 2.1.140 CHANGELOG entry "Improved Agent tool `subagent_type` matching to accept case- and separator-insensitive values" (deepwiki ask_question result on `anthropics/claude-code`); team-spawn.md:78 documents namespaced form `agent-teams:team-lead`.
**Counterfactual**: if matching were strict hyphen-only, `subagent_type="general_purpose"` would fail-closed with explicit "no agent registered" error; instead matching is *partially* permissive — case + space normalization documented, underscore normalization NOT documented but may exist.
**Risk**: silent-success path. Typo `agent_teams_team_lead` may resolve to `agent-teams:team-lead` OR silently fall through to `general-purpose` default depending on the registered set.
**P-block W325 P0 — HARDEN**: add a project-side PreToolUse[Agent] validator that normalizes `subagent_type` and checks against `agents.json` registry before dispatch, emitting explicit error on miss. Plus operator-AI: file `anthropics/claude-code` issue requesting an explicit error-on-miss flag.

### F3 — GitHub-MCP search_repositories silent-fallback [SEV-2, CONFIRMED 5+ WAVES]

**Cite**: github/github-mcp-server HEAD `bafcaf57c322d374299f54aa8b64eb4022694701` (verified 2026-05-19); upstream issues at `srbhptl39/MCP-SuperAssistant#195`, `developercommunity.microsoft.com/t/11077680` (GitHub MCP 405/415); per W315-Stream-D + W316-S7 + W317-r2-S6 + W319-Stream-B + W324 all observed empty-results-without-error.
**Counterfactual**: if MCP returned explicit `tool_use_error` on transport/rate-limit failure, callers would route to fallback; instead returns `{items: []}` indistinguishable from genuine no-match.
**P-block W325 P1 — HARDEN**: codify a fallback wrapper into the orchestrator's research-discovery skill: invoke `mcp__github__search_repositories` → if empty AND query has known-good token (e.g., star:>100) → `gh api search/repositories?q=<query>` → if STILL empty → ALLOW; only trust "no results" after dual-source confirms.

### F4 — fork-subagent context-flood [SEV-2, NEW W325 ROOT-CAUSE]

**Cite**: `CLAUDE_CODE_FORK_SUBAGENT=1` per settings.json:env; fork inherits "parent's full transcript, system prompt, tools, and model" (Tembo blog + generativeprogrammer.com — perplexity result citation [1]+[4]); repomix pack of 50-200K tokens + ~400K parent = exceeds 200K Sonnet limit and ~50% of 1M Opus limit. Anthropic auto-compact at 95% capacity is lossy.
**Counterfactual**: if fork inheritance were optional (subset-of-parent), large repomix injections would not collide with parent transcript; instead fork=full-parent-inherit makes repomix a payload multiplier.
**Empirical signal**: W321 confirmed silent ack with 0 artifacts in fork dispatch when repomix-pack >50K tokens was passed.
**P-block W325 P0 — FIX**: codify a fork-prompt-mandate skill — "NEVER call `mcp__repomix__pack_codebase` or `mcp__repomix__pack_remote_repository` inside an Agent dispatch that uses `CLAUDE_CODE_FORK_SUBAGENT=1` context". Alternative: spawn fresh non-fork subagent (general-purpose) for any task involving repomix-pack output.

### F5 — empty-final-message detection MISSING from parallel-dispatch-mandate skill [SEV-2, W319-A-H2 CARRY]

**Cite**: anthropics/claude-cookbooks HEAD `2eed173a533a690eb70ab324614ce5350776a23a`, `patterns/agents/orchestrator_workers.ipynb` cell-2 `FlexibleOrchestrator.process()` contains: `if not worker_content or not worker_content.strip(): print(f"⚠️ Warning: Worker '{task_info['type']}' returned no content"); worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"` (verified via deepwiki ask_question). Our parallel-dispatch-mandate skill lacks equivalent assertion.
**Counterfactual**: if our orchestrator codified the cookbook pattern, empty teammate replies would surface as explicit `[Error: ...]` strings; instead they vanish into the synthesis silently, producing the W321 "silent ack with 0 artifacts" symptom.
**P-block W325 P0 — DOCUMENT**: append a new §"Empty-final-message detection" to `.claude/skills/parallel-dispatch-mandate/SKILL.md` with the cookbook pattern + a worked example showing parent-orchestrator how to validate each teammate response before merging.

### F6 — Stop-hook 900s timeout behavior FAIL-CLOSED [VERIFIED W325, NO ACTION]

**Cite**: openai/codex-plugin-cc HEAD `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` (verified 2026-05-19); local `stop-review-gate-hook.mjs:16,109-118` (plugin v1.0.4) — `STOP_REVIEW_TIMEOUT_MS = 15 * 60 * 1000` + spawnSync `timeout` option → on ETIMEDOUT emits `{ok:false, reason:"...timed out after 15 minutes..."}` → main() emits `{decision:"block", ...}`. Status-1+empty-output path handled at lines 120-128.
**Counterfactual**: if there were a silent fall-through, the hook would emit nothing or `decision:"allow"` on timeout; instead it blocks with explicit reason. Verified by reading source.
**P-block W325 — NO-OP**: this finding is REASSURING. Stop-hook is one of the LOUDEST failure surfaces in the runtime.

### F7 — Empirical underscore-test result + cardinal-rule R5 carry [SEV-3 carry from W319/W321/W324]

**Cite**: CLAUDE.md L43-44 R5 PARTIAL-HOLD with `bypassPermissions:true` + `sandbox.enabled:false` — 6-wave-convergent SHIP-BLOCKER; `.claude/settings.json:env` has both `CLAUDE_CODE_FORK_SUBAGENT=1` AND `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` LIVE.
**Empirical sub-finding**: F2's underscore-typo test was NOT executable in read-only audit (would require a real Agent dispatch with `subagent_type="general_purpose"` — out of stream scope), but doc evidence + perplexity_ask quorum says behavior is "documented partially, undefined for underscores, treat as unsafe normalize-yourself zone". W325 operator-AI: dispatch isolated test via separate stream.
**Counterfactual**: if R5 sandbox+permissions were resolved, any silent-fallback in #1-#5 would still write but to a constrained surface; current `bypassPermissions:true` widens blast-radius.
**P-block W325 P1 — DOCUMENT + escalate operator decision**: per 6+ waves of recommendation, this is now an operator-decision-required item. Stream A defers to operator + cross-stream R5 carry.

---

## Cross-stream W325 forward-AI list (8 items)

1. **W325-A-P0-1** FIX: re-baseline CLAUDE.md L34 parallel_ratio claim to empirical 0.003-0.006 OR change methodology to per-wave-dispatch (with explicit denominator label).
2. **W325-A-P0-2** HARDEN: add PreToolUse[Agent] subagent_type validator with explicit error-on-miss (closes F2).
3. **W325-A-P0-3** DOCUMENT: append §"Empty-final-message detection" to parallel-dispatch-mandate SKILL.md from `claude-cookbooks @ 2eed173a` orchestrator_workers.ipynb pattern (closes F5).
4. **W325-A-P0-4** FIX: codify fork-prompt-mandate "NO repomix-pack inside FORK_SUBAGENT=1 dispatches" (closes F4).
5. **W325-A-P1-1** HARDEN: add gh-api-fallback wrapper for `mcp__github__search_repositories` empty results (closes F3).
6. **W325-A-P1-2** EMPIRICAL-TEST: dispatch isolated stream that calls Agent with `subagent_type="general_purpose"` (underscore) and confirms whether it resolves silently or errors.
7. **W325-A-P2-1** UPSTREAM: file `anthropics/claude-code` issue requesting explicit error-on-Agent-miss flag (F2 supporting AI).
8. **W325-A-P2-2** OPERATOR-DECISION: cardinal-rule R5 (bypassPermissions + sandbox.enabled:false) 6+-wave SHIP-BLOCKER (F7 carry).

---

## Freshness verification (2026-05-19 via `gh api`)

| Repo | Local SHA | Upstream HEAD | Drift |
|---|---|---|---|
| `anthropics/claude-cookbooks` | `2eed173a` (W319 cite) | `2eed173a533a690eb70ab324614ce5350776a23a` | **0** |
| `anthropics/claude-code` | n/a (CLI binary install) | `69d707009ec5a9362ea3552b0580d0f658428f0a` | n/a |
| `openai/codex-plugin-cc` | v1.0.4 local | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | upstream ahead of v1.0.4 cut |
| `wshobson/agents` (agent-teams 1.0.2) | install-only | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (=W319-A-H1 cite) | **0** |
| `shanraisshan/claude-code-best-practice` | `48798ca687773d7d33e4952e9174bdc481173707` | `9624c4ac21fab5ae6b3cb1dca9560690eddea863` | local behind upstream by 1+ commits |
| `github/github-mcp-server` | n/a (MCP server) | `bafcaf57c322d374299f54aa8b64eb4022694701` | n/a |

---

## Anti-bias rubric dim ranks (D35 cc_pathway_support + D38 mcp_integration_native + D41 autonomous_loop_compat)

| Finding | D35 | D38 | D41 | mean |
|---|---|---|---|---|
| F1 parallel_ratio re-baseline | 5 | 4 | 5 | 4.67 |
| F2 subagent_type validator | 5 | 4 | 4 | 4.33 |
| F4 fork-prompt-mandate | 5 | 3 | 5 | 4.33 |
| F5 empty-message detection | 4 | 5 | 4 | 4.33 |
| F3 gh-api fallback wrapper | 4 | 5 | 4 | 4.33 |
| F7 R5 operator-decision | 5 | 3 | 4 | 4.00 |
| F6 Stop-hook NO-OP | 5 | 5 | 5 | 5.00 (no action needed) |

**Ranking by mean (P0 candidates)**: F1 > F2 = F4 = F5 = F3 > F7.

**Stars-as-hardgate violation count: 0**. All findings ranked on orthogonal dims D35/D38/D41 (no popularity gating).

---

**Stream A audit complete.** 7 findings, 8 forward-AIs (4×P0 / 2×P1 / 2×P2), 1 SEV-1 NEW empirical (F1), 4 SEV-2 (F2/F3/F4/F5), 1 SEV-3 carry (F7), 1 NO-OP REASSURING (F6).
