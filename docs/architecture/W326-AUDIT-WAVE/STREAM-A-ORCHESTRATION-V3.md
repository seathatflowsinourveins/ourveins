# W326 Stream A — Orchestration Silent-Fallback V3

**Wave**: W326 (2026-05-19) | **Read-only audit + propose-only** | **Predecessor**: W325 V2
**Methodology (≥6 MCP families)**: deepwiki (anthropics/claude-cookbooks orchestrator_workers), perplexity_research (silent-fallback survey), ctx_fetch_and_index (docs.anthropic.com/sub-agents,hooks + code.claude.com/headless + github.com/anthropics/claude-code/issues), gh REST (HEAD SHAs), Read of `tools/parallel-ratio-telemetry.mjs` + `.claude/skills/parallel-dispatch-mandate/SKILL.md` + `codex-companion.mjs`+`app-server-broker.mjs`+`lib/codex.mjs`.

## Headline finding (NEW W326 SEV-1)

**Post-W325 codification of F4+F5 into `parallel-dispatch-mandate/SKILL.md` (lines 38-86) is EMPIRICALLY INERT.** Telemetry comparison:

| Window | W325 V2 | W326 V3 | Δ | Status |
|---|---|---|---|---|
| 30d | 0.0038 | **0.0037** | −0.0001 | BELOW (noise) |
| 7d | 0.0036 | **0.0041** | +0.0005 | BELOW (noise) |
| 24h | n/a | **0.0000** | n/a | BELOW |
| today | 0.0000 | **0.0000** | 0 | BELOW |

Distribution last 30d: `{"1":1599, "2":2, "3":4, "4+":0}` — 6 of 1605 = **0.37%**. **Codification-without-enforcement DOES NOT move the metric.** Counterfactual hypothesis "skill prose alone changes parent-orchestrator behavior" = **FALSIFIED**.

## V2→V3 finding deltas

| ID | V3 update + cite |
|---|---|
| **F1 parallel_ratio** | REGRESSION-CONFIRMED post-codification. **W326 P0-1**: PreToolUse[Agent] runtime guard, not prose. |
| **F2 subagent_type typo H3** | docs.anthropic.com/en/docs/claude-code/sub-agents (fetched 2026-05-19) documents `permissions.deny: ["Agent(name)"]` but NOT case/separator normalization. Issue **#60237** "tools: array silently drops first and last positions" confirms silent-drop class. **W326 P0-2**: PreToolUse strict-match validator. |
| **F3 github-MCP** | UNCHANGED 6-wave SEV-2 carry. **W326 P1**: gh-api fallback wrapper. |
| **F4 fork-flood** | LIVE skill §F4. Issue **#60128** "Subagent dispatches can silently fail when context-budget forcing function is injected" = direct upstream corroboration of W325 root-cause. **NO REGRESSION W326**. |
| **F5 empty-msg** | LIVE skill §F5. Cookbook cite drift: `2eed173a` → upstream HEAD `39a350b6790c132337dcc3ec35240728fcc1dc0e`. **W326 P3 cite refresh**. |
| **F6 Stop-hook 900s** | NO REGRESSION. NO-OP. |
| **F7 R5 carry** | 7-wave SHIP-BLOCKER operator-decision. |
| **NEW F8 codex EPERM** | `lib/codex.mjs:798-802` `binaryAvailable("codex",["app-server","--help"])` viability check; `app-server-broker.mjs:227-245` uses `net.createServer()` + Unix-socket `fs.unlinkSync(listenTarget.path)`. **Windows breaks** on Unix-socket path operations under sandbox+bypassPermissions. `runAppServerReview/Turn` default `sandbox:"read-only"`; failover to `codex exec` Path-P is NOT triggered on EPERM. **W326 P1-codex**: gate `runAppServer*` behind `platform!=="win32" \|\| appServerStatus.available` and unconditional Path-P fallthrough. |
| **Win32 mmap (Git-grep)** | codex sandbox read-only token lacks `FILE_MAP_READ` for `git grep` pack-file mmap; rg/PowerShell use non-mmap IO. **W326 P2**: grant `FILE_MAP_READ` in workspace-write sandbox profile. |

## W326 P-blocks (ranked, falsifiable-inverse counterfactuals)

1. **P0-1 (closes F1)**: ship `tools/preagent-parallel-guard.mjs` PreToolUse[Agent] hook emitting `{decision:"allow", systemMessage:"PARALLEL-DISPATCH-WARN: N solo Agent calls detected"}` when N≥3. **Falsifiable inverse**: re-run telemetry +1 week; if 30d ratio remains ≤0.01, hypothesis "soft nudge changes behavior" is FALSIFIED → escalate to hard gate `exitCode 2`.
2. **P0-2 (closes F2)**: ship `tools/preagent-subagent-validator.mjs` PreToolUse[Agent] reading `subagent_type` from tool_input, normalize lower+hyphen, validate against `agents/*.md` + `plugins/cache/**/agents/*.md` registry; `exitCode 2` on miss with close-matches list. **Falsifiable inverse**: dispatch Agent `subagent_type="general_purpose"` (underscore); assert hook fires.
3. **P1-codex (closes F8)**: companion fail-over: if `appServerStatus.available===false` OR Windows, route entire request through Path-P (`codex exec` foreground+tee), not partial. **Falsifiable inverse**: Windows + bypassPermissions=true + sandbox=read-only — EPERM no longer propagates.
4. **P1-github-mcp (closes F3)**: in `sota-convergence-audit/SKILL.md` Stage-0, codify "if `mcp__github__search_repositories` empty AND query has `star:`/`language:` filter → MUST follow up with `gh api search/repositories?q=...`". **Falsifiable inverse**: rerun `yeshuibo/agentflow`; expect dual-source no-match confirmation.
5. **P2-win32-mmap**: codex sandbox profile grants `FILE_MAP_READ` token rights on workspace-write Windows.
6. **P3-cite-refresh**: bump `parallel-dispatch-mandate/SKILL.md:144` to `39a350b6790c132337dcc3ec35240728fcc1dc0e`.

## Freshness verification (2026-05-19)

| Repo | Local | Upstream HEAD | Drift |
|---|---|---|---|
| `anthropics/claude-cookbooks` | `2eed173a` | `39a350b6790c132337dcc3ec35240728fcc1dc0e` | P3 refresh |
| `anthropics/claude-code` | n/a (CLI) | `69d707009ec5a9362ea3552b0580d0f658428f0a` | n/a |
| `openai/codex-plugin-cc` | v1.0.4 | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | upstream ahead |
| `github/github-mcp-server` | n/a (MCP) | `bafcaf57c322d374299f54aa8b64eb4022694701` | n/a |

**Upstream corroborations**: #60128 (F4 root-cause confirmed), #60237 (silent-drop class), #60442 (Windows platform bug opened 2026-05-19 by RSSRINDIA).

## Anti-bias rubric ranks (D35/D38/D41 means)

F1 PreToolUse parallel guard **4.67** · F8 codex EPERM Path-P route **4.67** · F2 subagent validator **4.33** · F3 gh-api fallback **4.33** · F4 fork-mandate **4.33 (no regression)** · F5 cite-refresh **2.67**.

**Stars-as-hardgate violations: 0** | **CR-1..5 violations: 0** (audit-only).

**Stream A V3 complete**: 8 findings (1 NEW F8 + 6 V2 updates + Win32 mmap) | 6 P-blocks (2 P0, 2 P1, 1 P2, 1 P3) | F1 SEV-1 codification→enforcement gap = empirical SHIP-BLOCKER for W326.
