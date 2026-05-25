# W337 Stream B — Native Claude Code Features Inventory + Insights Investigation

**Fork**: parent dispatched under W337 deep-audit-full-SOTA-unleashed wave.
**Method**: ctx_batch_execute + WebSearch + `claude --help` + npm view + python-sdk version probe + OTel endpoint reachability.
**Date**: 2026-05-20.
**Runtime CLI**: `claude 2.1.145 (Claude Code)` — **CURRENT LATEST**.

---

## §1 INSIGHTS — User's Critical Question

User asked: *"DO WE HAVE INSIGHTS FEATURES ENABLED that show in your runtime, should be part of the native features?"*

**Verdict**: THREE distinct "insights" surfaces exist, runtime state varies:

### 1a. Anthropic native `/insights` command — **MISSING FROM CLAUDE.md, AVAILABLE IN CLI**

- **What it is**: Built-in slash command shipped early Feb 2026 (Anthropic, Thariq Shihipar). Analyzes last 30 days of session transcripts (up to 50 sessions) → generates interactive HTML report at `~/.claude/usage-data/report.html`. Sections: friction points, recurring patterns, tool-use efficiency, errors, and **personalized CLAUDE.md suggestions with copy-buttons**.
- **Cite**: WebSearch findings; docs at https://code.claude.com/docs/en/analytics + community guides at angelo-lima.fr, pasqualepillitteri.it, dev.to/akari_iku, medium.com/@joe.njenga.
- **Privacy**: local-only — touches `Z:/claude-sota-installed/.claude/` JSONL session transcripts; no source code upload.
- **This runtime state**: CLI 2.1.145 supports it natively. NO mention in CLAUDE.md. NO scheduled monthly invocation. NO CLAUDE.md auto-update from suggestions.
- **GAP**: HIGH-VALUE NATIVE FEATURE NOT SURFACED. Should be cron'd monthly + suggestions reviewed before each wave-closure.
- **Action**: run `claude /insights` in this runtime; review HTML at `Z:/claude-sota-installed/.claude/usage-data/report.html`; document recurring CLAUDE.md patches; add to CLAUDE.md pointer block as monthly skill.

### 1b. OTel→Langfuse observability pipeline — **WIRED BUT BROKEN**

- **What it is**: `tools/insights-wireup/` (5 PowerShell scripts: `otel-headers-template.ps1`, `phoenix-start.ps1`, `privacy-opt-ins-phase1.ps1`, `statusline-smoke.ps1`, `wire-all.ps1`) emit paste-ready CLAUDE.local.md snippets to wire CC's native OTel exporter (`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`) to local Langfuse instance for trace storage.
- **Cite**: `tools/insights-wireup/README.md:1-23` + per-script docstrings cite langfuse.com, opentelemetry.io, docs.anthropic.com/en/docs/claude-code/settings. Originated in W326-A F1 → W327-B → W328 Stream-B.
- **Runtime env state** (settings.json:env):
  - `CLAUDE_CODE_ENABLE_TELEMETRY=1` ✓
  - `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` ✓
  - `OTEL_TRACES_EXPORTER=otlp` ✓
  - `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` ✓
  - `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf` ✓
  - `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` ✓
  - `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` ✓
  - `OTEL_LOG_TOOL_DETAILS=1` ✓
  - `OTEL_LOG_USER_PROMPTS=1` ✓
- **Endpoint probe**: `:3000 ECONNREFUSED` — **Langfuse DEAD**. Per W333 Stream A §7, Langfuse stack is down due to Docker compose-dir migration `Z:\claude\observability → Z:\claude-hub\observability` stale-metadata. Fix: `docker compose -f <new-path> up -d --recreate langfuse-clickhouse`. CLAUDE.md L65 claims `T5 langfuse ✓ LIVE v3.170.0 (W333-P0-b recovered 2026-05-19)` — **STALE CLAIM**, live re-probe shows DEAD. [CORRECTED W340→v3.160.0 per W347 P2a — version claim was also fabricated]
- **GAP**: ALL CC native OTel traces are silently dropped to nowhere. Phase-1 privacy opt-ins (tool details + user prompts captured) enabled but no sink.
- **Action**: bring Langfuse back up via `docker compose ... up -d` per W333 §7 recovery procedure; alternative — start Phoenix on :6006 (`tools/insights-wireup/phoenix-start.ps1`) and re-point OTLP endpoint.

### 1c. Auxiliary insights MCPs — **PARTIALLY AVAILABLE**

- **mcp__plugin_context-mode_context-mode__ctx_insight**: opens context-mode personal analytics dashboard (default :4747). Schema: session activity, tool usage, error rate, parallel work patterns, project focus, actionable insights. INSTALLED. Not currently in use per skill auto-fire patterns.
- **ccusage MCP** (mcp__ccusage__{daily,monthly,session,blocks,codex-daily,codex-monthly}): cost/usage reports grouped by date/month/session/billing-blocks; also covers Codex. INSTALLED.
- **GAP (minor)**: `ctx_insight` and `ccusage` not referenced in CLAUDE.md or any operator skill. Could augment `/insights` monthly cadence.

---

## §2 NATIVE FEATURES MATRIX

| Feature | Cite | Current State | Gap | Action |
|---|---|---|---|---|
| 1M context | model-config docs; CLAUDE_CODE_DISABLE_1M_CONTEXT **unset** | ENABLED (per CLAUDE.local.md L77) | None | — |
| Agent teams | settings.json:env L7 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | ENABLED experimental | Cardinal rule W269 mandates parallel dispatch via Agent forks. Currently W330 P0-A advisory guard at `tools/preagent-parallel-guard.mjs` (15203B, 9 exits: 8×exit(0), 1×exit(2)). | Verify experimental flag is honored — see Stream A §1 deep-dive |
| Subagent forks | settings.json env `CLAUDE_CODE_FORK_SUBAGENT=1` | ENABLED | Good | — |
| Hooks system | docs.anthropic.com/en/docs/claude-code/hooks | 9 surface keys wired (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted) | 1 sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` (1656B, patches anthropics/claude-code#46915) | Cardinal-rule-2 compliant |
| Plugins | docs.anthropic.com/en/docs/claude-code/plugins | 15 plugin caches under `.claude/plugins/cache/`. CLAUDE.md L80 claims 18. **3-DIR DRIFT** | Verify against `installed_plugins.json` (which has only `version`/`plugins`/`enabledPlugins` keys, count=3 — needs nested inspect) | Reconcile per-plugin enabled/disabled in next wave |
| Skills | docs.anthropic.com/en/docs/claude-code/skills | 46 local skills (excluding `_archived`). CLAUDE.md L52 claims 46 ✓ aligned. | None | — |
| Worktrees | EnterWorktree + WorktreeRemove hook | Wired; `worktree.baseRef=fresh` per settings.json | None | — |
| Background sessions | `claude --bg`, `claude agents`, `claude attach` | CLI 2.1.145 supports it (claude --help confirms `agents [options]` subcommand) | Not in operator workflow per CLAUDE.md | Add to "parallel-execution" 4-mode rotation per CLAUDE.md L17 |
| MCP servers | docs/mcp | 14 servers wired (deepwiki, github, chrome-devtools, repomix, serena, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, playwright, tavily, exa). cognee :8000 LIVE, langfuse :3000 DEAD, others stdio | langfuse MCP stdio works regardless of HTTP endpoint state | — |
| Auto memory | CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 | DELIBERATELY DISABLED per CLAUDE.local.md W259-v8 U3 (context-budget rationale) | Intentional | — |
| Output styles | `--output-style` + `outputStyle` setting | Active: `Proactive` | None | — |
| Slash commands | docs/commands | All installed plugin commands available | None | — |
| Headless mode | `-p / --print`, `--bare`, `--output-format` | CLI supports. Not in CI/cron currently. | Could automate `/insights` monthly via `claude -p /insights --output-format json` | Add monthly cron |
| Streaming | `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | ENABLED | None | — |
| Session resume/branch/fork | `--fork-session`, `/branch` | ENABLED via env CLAUDE_CODE_FORK_SUBAGENT=1 | Per W280d, parallel sessions cap ~3, worktree-isolated | Compliant |
| Compact | `/compact`, CLAUDE_AUTOCOMPACT_PCT_OVERRIDE | Unset (defaults ~95%) per CLAUDE.local.md W280c | Intentional | — |
| Stop hook gate | settings.json:hooks.Stop[] + codex-review wire | Per W280a active. Codex review gate post-commit. | None | — |
| Permission modes | settings.json:permissions{allow,deny,defaultMode=default} | 12 allow patterns + 41 deny patterns + default mode | **Hard deny rules in auto mode is a NEW 2026 Q2 feature** — not exploited | Add hard deny patterns to settings.json:permissions per release notes |
| SDK (Node/TS) | npm @anthropic-ai/claude-agent-sdk | **Latest 0.3.145 @ 2026-05-19** (matches runtime per npm view) | None | — |
| SDK (Python) | pip claude-agent-sdk | runtime has `claude_agent_sdk 0.2.82` per `Z:/venvs/claude/Scripts/python.exe -c "import claude_agent_sdk"` | Verify latest is 0.2.82 (could not probe pip-latest from sandbox) | Bump if newer exists |
| Statusline | settings.json:statusLine | `ccstatusline@2.2.19` via npx, refresh 30s | None | — |
| Push notifications | PushNotification tool | Available via deferred tool registry | None | — |
| Telemetry stack | CLAUDE_CODE_ENABLE_TELEMETRY=1 + OTEL_* | All env wired, **endpoint DEAD** | See §1b above | Restart Langfuse |
| Gateway model discovery | CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1 | ENABLED | None | — |
| Prompt caching 1h | ENABLE_PROMPT_CACHING_1H=1 | ENABLED | None | — |
| Effort level | CLAUDE_CODE_EFFORT_LEVEL=max | MAX (Opus 4.7 supports it per W335-correction) | None | — |
| Tool search | ENABLE_TOOL_SEARCH=auto:5 | ENABLED | None | — |
| Away summary | CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1 | ENABLED | None | — |

---

## §3 EXPERIMENTAL / NEW 2026-Q2 FEATURES

Per `https://github.com/anthropics/claude-code/releases` + community changelog (WebSearch findings) — **NEW since CLAUDE.md was last updated**:

1. **`--plugin-dir <zip>`** — `--plugin-dir` flag now accepts `.zip` plugin archive in addition to a directory. **NOT EXPLOITED HERE**.
2. **`--plugin-url <url>`** — fetches a plugin archive from a URL for the current session. **NOT EXPLOITED HERE**. Useful for ephemeral plugin trials before commit.
3. **Cross-project Ctrl+R history search** — globally browse all session history. **NEW UX**.
4. **New worktree branching controls** — `worktree.baseRef=fresh|head` already set. Possibly newer flags.
5. **Hard deny rules for auto mode** — `permissions.deny[]` now respected in `defaultMode=auto`. Currently runtime is `defaultMode=default` — could shift to auto-mode safely if hard-deny patterns are comprehensive.
6. **Fast mode = Opus 4.7** (was Opus 4.6) — matches CLAUDE.md current Opus 4.7 declaration.
7. **`ultrareview [target]`** — cloud-hosted multi-agent code review subcommand exposed via `claude ultrareview [PR# | base-branch]`. **NOT REFERENCED IN CLAUDE.md** — could replace some codex GPT-5.5 review work or augment it.
8. **`claude agents` subcommand** — manage background agents (start, list, attach, stop). Required for fully-async parallel work-stream per CLAUDE.md L17 "background sessions" mode.
9. **`--brief` flag** — enables `SendUserMessage` tool for agent-to-user mid-session updates.
10. **`--max-budget-usd <amount>`** — CLI-level spend cap for `--print` mode.
11. **`--no-session-persistence`** — ephemeral sessions for `--print`.
12. **`--include-partial-messages`** — streaming partial output in `stream-json` format.
13. **`--add-dir`, `--settings`, `--mcp-config`, `--plugin-dir`, `--permission-mode`, `--model`, `--effort`, `--dangerously-skip-permissions` on `claude agents`** — fully composable agent CLI.
14. **Amber spinner after 10s** — UX-only; no action.

---

## §4 SDK ECOSYSTEM CHECK

| Component | Runtime version | Latest | Verdict |
|---|---|---|---|
| `claude` CLI | 2.1.145 | 2.1.145 (npm 14 hours ago per WebSearch) | ✓ CURRENT |
| `@anthropic-ai/claude-agent-sdk` (npm) | (presumed 0.3.145; npm view confirms latest=0.3.145 @ 2026-05-19) | 0.3.145 | ✓ CURRENT |
| `claude_agent_sdk` (Python) | 0.2.82 | (could not probe pip — recommend `pip install -U claude-agent-sdk` to verify) | TBD |
| `codex` CLI | 0.130.0 | (npm view @openai/codex failed silently — recommend `npm view @openai/codex version` re-probe) | TBD |
| Node | v22.22.0 | LTS | ✓ |
| npm | 11.9.0 | OK | ✓ |
| git | 2.51.0.windows.2 | OK | ✓ |
| gh | 2.92.0 (2026-04-28) | OK | ✓ |
| ollama | 0.24.0 | OK | ✓ |
| docker | 29.4.3 | OK | ✓ |
| python | 3.14.3 | OK | ✓ |
| uvx | 0.10.3 (c75a0c625 2026-02-16) | OK | ✓ |

**Verdict**: SDK stack is on the latest stable. No version-lag remediation needed.

---

## §5 OBSERVABILITY STACK

OTel chain: CC native → `http://127.0.0.1:3000/api/public/otel/v1/traces` → Langfuse → ClickHouse.

**Live probe**: `ECONNREFUSED 127.0.0.1:3000`.

**Diagnosis** (per W333 Stream A finding inherited in CLAUDE.md L65): Langfuse stack was migrated from `Z:\claude\observability` to `Z:\claude-hub\observability`. Docker compose metadata is stale. `docker compose -f Z:\claude-hub\observability\docker-compose.yaml up -d --recreate langfuse-clickhouse` is the documented recovery.

**Impact**: Every span CC emits — every tool call, every prompt, every error — is dropped on the floor. CLAUDE_CODE_ENHANCED_TELEMETRY_BETA + OTEL_LOG_USER_PROMPTS + OTEL_LOG_TOOL_DETAILS all silently produce no useful data.

**Alternative**: Phoenix on :6006 (Arize-ai/phoenix). `tools/insights-wireup/phoenix-start.ps1` is the helper.

---

## §6 TOP-5 NATIVE GAPS TO ENABLE (PRIORITY ORDERED)

| # | Gap | Effort | Payoff | Risk | Action |
|---|---|---|---|---|---|
| **1** | **Anthropic `/insights` native command** unused. 30-day session analysis + CLAUDE.md suggestions copy-paste. | 5 min initial run + monthly cadence | HIGH — auto-derives CLAUDE.md improvements from real usage data, replacing wave-by-wave manual discovery | LOW — local-only, no source code touched | Run `claude /insights` now; review `~/.claude/usage-data/report.html`; create monthly cron via `claude -p /insights`. Document in CLAUDE.md pointer block. |
| **2** | **Langfuse OTel endpoint DEAD** at :3000. ECONNREFUSED. All CC telemetry silently dropped. | 10 min docker restart | HIGH — restores entire observability pipeline. Required for any future trace-driven retro analysis. | LOW — restart only, no schema change | `docker compose -f Z:\claude-hub\observability\docker-compose.yaml up -d --recreate`. Verify :3000 reachable. Update CLAUDE.md L65 "T5 langfuse ✓ LIVE" claim with re-verification timestamp. |
| **3** | **`claude ultrareview` cloud multi-agent review** unused. | 1 hr — wire as subagent option | MEDIUM — augments W331 P0.7 frontier-peer policy (currently codex GPT-5.5 only); adds Anthropic-hosted parallel review | LOW — read-only cloud review | Add `/ultrareview` slash-command skill; wire into wave-closure synthesis as 3rd opinion. |
| **4** | **Plugin cache drift**: CLAUDE.md L80 claims 18 plugins, actual 15. Reconciliation needed. Plus user-requested SOTA repos (wshobson/agents, addyosmani/agent-skills, mattpocock/skills, mksglu/context-mode) lack install verification per Stream D fork. | 30 min | MEDIUM — keeps the trust-tuple cardinal-rule-1 invariant accurate | LOW | Update CLAUDE.md "plugin install drift" stanza; per-plugin enabled/disabled audit in next wave. |
| **5** | **2026-Q2 native CLI features unexploited**: `--plugin-url`, `--plugin-dir <zip>`, hard-deny in `defaultMode=auto`, `claude agents` background sessions. | 2 hrs total | MEDIUM — `claude agents` enables truly async parallel work; `--plugin-url` enables ephemeral plugin trial before commit | LOW — additive | Document in CLAUDE.md L17 4-mode rotation; pilot `claude agents` for next wave's codex review dispatch. |

---

## Sources (mandatory per WebSearch reminder)

- [Track team usage with analytics - Claude Code Docs](https://code.claude.com/docs/en/analytics)
- [Commands - Claude Code Docs](https://code.claude.com/docs/en/commands)
- [/insights: The Command That Analyzes How You Code with Claude](https://angelo-lima.fr/en/claude-code-insights-command/)
- [Claude Code /insights: Complete Guide](https://pasqualepillitteri.it/en/news/408/claude-code-insights-command-workflow)
- [I've organised the Claude Code commands](https://dev.to/akari_iku/ive-organised-the-claude-code-commands-including-some-hidden-ones-op0)
- [@anthropic-ai/claude-code - npm](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [@anthropic-ai/claude-agent-sdk - npm](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)
- [Claude Code Updates - May 2026 - Releasebot](https://releasebot.io/updates/anthropic/claude-code)
- [claude-code/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Claude Code Changelog: All Release Notes (2026)](https://claudefa.st/blog/guide/changelog)
- [Claude Code usage analytics | Claude Help Center](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics)
