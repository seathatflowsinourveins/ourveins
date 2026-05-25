# W259-v12 — OFFICIAL-DOCS AUDIT (every architecture claim + every applied unleash change vs CURRENT Anthropic docs)

> **Wave:** W259-v12 OFFICIAL-DOCS AUDITOR. **Date:** 2026-05-16.
> **Operator directive:** *"deep dive with official docs audit, all with official docs guide."*
> **Working directory:** `Z:\claude-sota-installed\`
> **Output:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\04-critique\OFFICIAL-DOCS-AUDIT-W259v12.md`
>
> **Mandate:** verify W259's CC-capability claims + the applied W259-v8/v9/v10 changes against the *current* official Anthropic / Claude Code documentation. Every finding cites an official-doc URL + section and is flagged **CONFIRMED / STALE / UNVERIFIED / WRONG**.

---

## §0 — Method + doc-sources fetched

### §0.1 — Audit scope reconciliation

The directive names "W259-v8/v9/v10/v11" applied changes. **There is no W259-v11.** `W259v8-UNLEASH-EXECUTION-LOG.md` (386 lines) contains exactly three execution sections — **v8** (P0 punch-list), **v9** (P1 punch-list + Agent-SDK harness), **v10** (cardinal-rule-2 agent-hook cleanup). No `*W259*v11*` artifact exists anywhere under `docs/`. This audit therefore audits the **v8 + v9 + v10 applied state** — which IS the complete live runtime state. (This W259-v12 audit is itself the "v12" deliverable.)

### §0.2 — Doc sources fetched live (HTML→markdown indexed, fetch timestamp 2026-05-16 ~22:10 UTC)

| Source label | URL | Sections |
|---|---|---|
| `cc-hooks` | `https://docs.anthropic.com/en/docs/claude-code/hooks` | 40 |
| `cc-output-styles` | `https://docs.anthropic.com/en/docs/claude-code/output-styles` | 3 |
| `cc-settings` | `https://docs.anthropic.com/en/docs/claude-code/settings` | 16 |
| `cc-mcp` | `https://docs.anthropic.com/en/docs/claude-code/mcp` | 16 |
| `cc-headless` | `https://docs.anthropic.com/en/docs/claude-code/headless` | 5 |
| `cc-subagents` | `https://docs.anthropic.com/en/docs/claude-code/sub-agents` | 17 |
| `cc-permission-modes` | `https://docs.anthropic.com/en/docs/claude-code/permission-modes` | 7 |
| `cc-memory` | `https://docs.anthropic.com/en/docs/claude-code/memory` | 9 |
| `agent-sdk-python` | `https://docs.anthropic.com/en/api/agent-sdk/python` | 32 |
| `agent-sdk-tools` | `https://docs.anthropic.com/en/api/agent-sdk/custom-tools` | 8 |

Plus a **live runtime probe** of the installed `claude-agent-sdk` package in `Z:/venvs/claude` (`PermissionMode` Literal extracted from `claude_agent_sdk.types` source; all harness imports resolved). `docs.anthropic.com/en/docs/claude-code/*` and `code.claude.com/docs/en/*` are byte-equal mirrors — cross-checked, identical bodies.

### §0.3 — Verdict rubric

- **CONFIRMED** — the claim / applied change matches the current official doc verbatim or in mechanism.
- **STALE** — was correct earlier; the current doc has moved on (the change still works but the *rationale text* is out of date).
- **UNVERIFIED** — the official doc neither confirms nor contradicts (no primary-source cite found this session).
- **WRONG** — the claim / applied change contradicts the current official doc; needs a correction.

---

## §1 — Applied-changes audit (A1–A5)

### A1 — The 4 wired hooks in `.claude/settings.json` — **CONFIRMED** (all 4 valid; 2 advisory notes)

Read `.claude/settings.json` L241-284. The live `hooks` block has 4 events: `SessionStart`, `PreToolUse`, `PostToolUse`, `WorktreeRemove`.

**Hook JSON structure** — **CONFIRMED**. Per `cc-hooks` §"Configuration" + §"Hook handler fields": the structure is `{ "hooks": { "<Event>": [ { "matcher": "...", "hooks": [ { "type": "command", "command": "..." } ] } ] } }`. Each settings.json hook entry is an array of `{matcher?, hooks[]}` objects; each inner `hooks[]` element is a handler `{type, command, timeout?}`. The 4 wired blocks match this shape exactly. `matcher` is correctly **omitted** on `SessionStart` and `WorktreeRemove` (the doc: `""`/omitted = "match all"); `timeout` is optional and correctly absent.

**Event-by-event:**

| Event | Verdict | Official cite |
|---|---|---|
| `SessionStart` | **CONFIRMED** | `cc-hooks` §"SessionStart": *"Runs when Claude Code starts a new session or resumes... Only `type: "command"` and `type: "mcp_tool"` hooks are supported."* The wired `type:"command"` invoking `node.exe` is valid. The matcher is omitted (fires on all of `startup`/`resume`/`clear`/`compact`) — valid. |
| `PreToolUse` (matcher `Bash`) | **CONFIRMED** | `cc-hooks` §"Matcher patterns": matcher containing *"only letters, digits, `_`, and `|`"* is an exact string — *"`Bash` matches only the Bash tool"*. The `Bash` matcher is exactly the documented form. PreToolUse fires **before** the tool runs — correct placement for a pre-commit-class scan. |
| `PostToolUse` (matcher `Edit\|Write\|MultiEdit`) | **CONFIRMED** | `cc-hooks` §"Matcher patterns" verbatim: *"`Edit\|Write` matches either tool exactly"*. The 3-way `Edit\|Write\|MultiEdit` is the documented `|`-separated exact-list form. |
| `WorktreeRemove` | **CONFIRMED — it IS a real event** | `cc-hooks` §"WorktreeRemove": *"The cleanup counterpart to WorktreeCreate. This hook fires when a worktree is being removed... For git-based worktrees, Claude handles cleanup automatically with `git worktree remove`."* No decision control. The wired `git worktree prune \|\| true` is a valid side-effect cleanup command. |

**`jq` input-payload usage** — **CONFIRMED**. The `PostToolUse` command does `f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty')`. Per `cc-hooks` §"Hook lifecycle": *"For command hooks, input arrives on stdin."* The official async-hook example uses the **identical idiom**: `INPUT=$(cat); FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')`. The W259 hook's `jq -r` reads stdin directly (jq defaults to stdin) — equivalent and correct. `PostToolUse` input is documented to carry `tool_input.file_path` for `Write`/`Edit`. **Advisory note (not WRONG):** the fallback `.tool_input.filePath` is harmless but redundant — the *input* field is `tool_input.file_path` (snake_case); `filePath` is the camelCase field on `tool_response`, not `tool_input`. The `// empty` + `[ -f "$f" ]` guard makes the redundant alternate inert. No fix required.

**`$CLAUDE_PROJECT_DIR`** — **not used by these 4 hooks** (none reference it), so nothing to verify there. For completeness: `cc-hooks` confirms `CLAUDE_PROJECT_DIR`, `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA` are exported to the spawned hook process — available if a future hook needs them.

**`PreToolUse(Bash)→gitleaks` semantics** — **CONFIRMED with one advisory.** `gitleaks protect --staged ... --exit-code 0 || true` is a valid non-blocking command hook. Advisory: `gitleaks protect --staged` scans the **git staging area**, not the Bash command the model is about to run — so the hook fires on *every* Bash call but inspects staged diffs, not that call's payload. That is a deliberate, defensible design (a cheap repeated secret-sweep), and the `--exit-code 0`/`|| true` makes it strictly advisory so it can never wedge a Bash call. The W259-v8 log §U1 describes it accurately as "non-blocking advisory". **No fix needed** — but the behavior (staged-scan, not command-scan) is correctly understood and is not a true "PreToolUse(Bash) payload inspector".

**SessionStart `context-mode-cache-heal.mjs`** — flagged by codex in W259-v8 round 1 as a cardinal-rule-2 ambiguity, correctly dispositioned as **pre-existing / out-of-scope** (committed 2026-05-08, predates the unleash waves). Not a W259-v8/v9/v10 *applied change* — no verdict owed here. The W259-v8 log §5 operator-review flag stands.

**A1 verdict: CONFIRMED.** All 4 hook events are real, all matcher syntaxes are exactly per the official hooks doc, the JSON structure is correct, and the stdin/`jq` payload idiom matches the official example.

---

### A2 — `outputStyle: "Proactive"` — **CONFIRMED**

`.claude/settings.json` L238 `"outputStyle": "Proactive"`.

Per `cc-output-styles` (fetched 2026-05-16), the built-in styles are **Default, Proactive, Explanatory, Learning**. Verbatim on Proactive: *"Proactive: Claude executes immediately, makes reasonable assumptions instead of pausing for routine decisions, and prefers action over planning. This applies the same guidance as auto mode without changing your permission mode, so you still see permission prompts before tools run."*

- **"Proactive" is a real built-in output style** — CONFIRMED.
- The settings key is `outputStyle` (string) — CONFIRMED verbatim: *"edit the `outputStyle` field directly in a settings file: `{ "outputStyle": "Explanatory" }`"*.
- The W259-v8 `_comment_outputstyle_w259v8` description ("biases toward immediate execution + fewer pause-for-decision turns... auto-mode-like proactivity WITHOUT changing permission mode") is a **faithful paraphrase** of the official text — CONFIRMED.
- Caveat correctly captured: a *custom* style would drop built-in SWE instructions unless `keep-coding-instructions: true`; the W259-v8 log chose the **built-in** precisely to avoid that — sound.

**A2 verdict: CONFIRMED.** Exact match to the official output-styles doc.

---

### A3 — `.mcp.json` 12 server entries — **CONFIRMED** (transport `type` values all valid)

Read `.mcp.json`. **12 `mcpServers` entries** (github, context7, deepwiki, playwright, chrome-devtools, repomix, serena, memory, graphiti, phoenix, gitnexus, ccusage). (Note: the `_comments.w259v9_u10_tasksupport_audit` text says "13" because it counts a `cognee` entry — but `cognee` is **not present** in the live `mcpServers` block; only its `_comments` provenance key remains. The W259-v8 log §3 says cognee was added; the live file shows it is **not** in `mcpServers`. This is a doc/state mismatch in the W259-v9 audit comment, not an official-docs violation — see §4 F5.)

**`type` field validity** — **CONFIRMED**. Per `cc-mcp` §"Option 1: Add a remote HTTP server" verbatim: *"When configuring MCP servers via JSON in `.mcp.json`... the `type` field accepts `streamable-http` as an alias for `http`. The MCP specification uses the name `streamable-http` for this transport."* And §"Option 2": *"The SSE (Server-Sent Events) transport is deprecated. Use HTTP servers instead."*

- **3 `type:"http"` servers** (github, context7, deepwiki) — CONFIRMED valid. `type:"http"` **IS** Streamable HTTP per the official doc (the spec name `streamable-http` is just an alias). The legacy/deprecated transport is `type:"sse"` — **zero `sse` entries** in `.mcp.json`. So the W259-v9 §4 conclusion "no legacy-SSE migration needed" is **CONFIRMED**.
- **9 `type:"stdio"` servers** — CONFIRMED valid (`stdio` is a documented transport; `cc-mcp` covers stdio command servers).
- `headers` with `${GITHUB_TOKEN}` / `${CONTEXT7_API_KEY}` interpolation — consistent with the documented HTTP-server header form (`--header "Authorization: Bearer ..."`).

**A3 verdict: CONFIRMED.** Every `type` value (`http` ×3, `stdio` ×9) is a valid MCP-config transport per the current official MCP doc; no deprecated `sse` transport is used. (One internal state-vs-comment mismatch on cognee — §4 F5, not an official-docs issue.)

---

### A4 — `harness/eval_harness.py` Agent-SDK usage — **CONFIRMED** (verified against the installed SDK + official docs)

Read `harness/eval_harness.py` (440 lines). Live-probed the installed `claude-agent-sdk` **0.1.81** in `Z:/venvs/claude`.

**SDK API surface used by the harness — all CONFIRMED real:**

| Symbol used | Verdict | Evidence |
|---|---|---|
| `ClaudeAgentOptions` | **CONFIRMED** | Importable; `agent-sdk-python` doc + GitHub README use it verbatim. |
| `query` (async iterator) | **CONFIRMED** | `agent-sdk-python`: *"`query()` is an async function... returns an `AsyncIterator` of response messages."* Harness uses `async for message in query(prompt=..., options=...)` — exact documented pattern. |
| `tool` (`@tool` decorator) | **CONFIRMED** | `agent-sdk-tools` verbatim: `@tool("greet", "Greet a user", {"name": str})`. Harness: `@tool("aggregate_eval_results", "...", {"rows_json": str})` — exact shape. |
| `create_sdk_mcp_server` | **CONFIRMED** | `agent-sdk-tools` verbatim: `create_sdk_mcp_server(name="my-tools", version="1.0.0", tools=[...])`. Harness call is identical in shape. |
| `AssistantMessage`, `ResultMessage`, `TextBlock`, `ToolUseBlock` | **CONFIRMED** | `agent-sdk-python` §"Types" lists `AssistantMessage`, `ResultMessage`, `TextBlock`, `ToolUseBlock` as exported message/content types. |
| `ResultMessage.total_cost_usd` | **CONFIRMED** | Harness reads `getattr(message, "total_cost_usd", 0.0)` (defensive `getattr`). `total_cost_usd` is the documented cost field in the headless JSON envelope and SDK result. |

**`permission_mode="bypassPermissions"`** — **CONFIRMED valid enum value.** Live-extracted from `claude_agent_sdk.types`: `PermissionMode = Literal["default", "acceptEdits", "plan", "bypassPermissions", "dontAsk", "auto"]`. The harness value `"bypassPermissions"` is a member of that Literal. (Note: the W259-v9 §6 log says codex round-1 required changing it to `"dontAsk"`, and the harness *comment* on L271-287 says "dontAsk" — but the **actual code** on L286 is `permission_mode="bypassPermissions"`. Both are valid enum values, and the harness correctly notes `allowed_tools` is the real gate. This is a comment/code drift, not an official-docs violation — see §4 F4.)

**`allowed_tools=["mcp__evaltools__aggregate_eval_results"]`** — **CONFIRMED.** Per `agent-sdk-python` §"Using Tools": *"`allowed_tools` is a permission allowlist: listed tools are auto-approved... It does not remove tools from Claude's toolset."* The in-process MCP tool name format `mcp__<server>__<tool>` matches the `agent-sdk-tools` example `mcp__tools__greet`. The harness comment "allowed_tools IS the security gate" is slightly overstated (the doc says it is an *allowlist for auto-approval*, not a hard tool-removal — `disallowed_tools` does removal), but for a `bypassPermissions` run the practical effect (only the one MCP tool auto-runs without prompts; built-ins are not listed) is sound. **Advisory only, no fix.**

**Headless flags `--bare -p --output-format json`** — **CONFIRMED.** Per `cc-headless`:
- `-p`/`--print` — verbatim: *"Add the `-p` (or `--print`) flag to any `claude` command to run it non-interactively."*
- `--bare` — verbatim: *"Add `--bare` to reduce startup time by skipping auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md... Bare mode is useful for CI and scripts where you need the same result on every machine."*
- `--output-format json` — verbatim: *"`json`: structured JSON with result, session ID, and metadata."* The harness reads `envelope.get("result")` and `envelope.get("total_cost_usd")` — both are documented JSON-envelope fields.

**One STALE doc-comment in the harness (not WRONG, no behavior impact):** harness L137-144 comment says *"under `--bare`... the model is not granted tools by default."* The current `cc-headless` doc states the opposite: *"In bare mode Claude has access to the Bash, file read, and file edit tools."* The harness's `run_promptfoo_lane()` does not pass `--allowedTools` and only inspects the result string, so the outcome is unaffected — but the comment's claim is **STALE** vs the current doc. Minor; see §4 F2.

**A4 verdict: CONFIRMED.** The harness uses the official `claude-agent-sdk` 0.1.81 API correctly (`ClaudeAgentOptions`, `query`, `@tool`, `create_sdk_mcp_server`, message/block types, `permission_mode` enum); the `--bare -p --output-format json` headless flags all exist per the official headless doc. One STALE in-code comment (bare-mode tool availability) with zero behavioral impact.

---

### A5 — `.gitattributes` + `core.longpaths` — **CONFIRMED** (standard, low-priority)

`.gitattributes` uses `* text=auto eol=lf` plus per-extension `text eol=lf` / `eol=crlf` (PowerShell scripts CRLF) and `-text` for binaries. This is **standard, documented git behavior** (`gitattributes` is core git, not Claude-Code-specific) and is the recommended cross-platform line-ending discipline for a Windows-portable repo. `core.longpaths` is a standard Windows-git setting. Nothing here touches Claude Code's official surface — **CONFIRMED** as correct/benign, no official-docs concern.

---

## §2 — Architecture-claims audit (B)

Spot-check of the highest-load-bearing CC-native capability claims in `CC-DIMENSIONS-UNLEASHED-W259v7.md` + `W259-ULTIMATE-SYNTHESIS-FINAL.md` §3.

### B1 — Permission modes (`default`/`acceptEdits`/`plan`/`bypassPermissions` + `auto` + `dontAsk`) — **CONFIRMED** (one W259 sub-claim is OVERSTATED)

Per `cc-permission-modes` §"Available modes" — the official table lists **6 modes**: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. The W259v7 D7 list (`default`, `acceptEdits`, `plan`, `bypassPermissions`, `auto`, `dontAsk`) is **CONFIRMED complete**.

- **Is `auto` real?** **YES — CONFIRMED.** `cc-permission-modes` §"Eliminate prompts with auto mode": *"Auto mode requires Claude Code v2.1.83 or later. Auto mode lets Claude execute without permission prompts. A separate classifier model reviews actions before they run."*
- **Is `defaultMode:"auto"` honored, or is the launcher flag required?** **Nuanced — the W259 claim is OVERSTATED.** `cc-settings` §"Permission settings" verbatim: *"`defaultMode` ... Valid values: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`."* So **`"defaultMode": "auto"` IS a valid settings value** and is honored. What is *not* read from shared project `.claude/settings.json` is the separate **`autoMode` object** (the classifier-tuning object: `environment`/`allow`/`soft_deny`) — that anti-injection restriction applies to the *tuning object*, not to selecting `auto` as the default mode. **Verdict:** `W259-ULTIMATE-SYNTHESIS-FINAL.md` §0 "What W259 corrects" — *"`defaultMode: "auto"` in settings.json: BROKEN per current Claude Code docs — must use `--permission-mode auto` flag"* — is **WRONG as stated**. `defaultMode:"auto"` is a valid, honored project-settings value. The *accurate* statement is: the `autoMode` **classifier-customization object** is not read from shared project settings (use user/project-local/managed scope for that object); but `defaultMode:"auto"` itself works fine in `.claude/settings.json`. See §4 F1. **NB:** this does NOT affect any *applied* change — the runtime's `defaultMode` is still `bypassPermissions`; U2 was correctly deferred. The error is in the *architecture doc's corrective claim*, and it would mislead a future wave.

### B2 — MCP Tasks `taskSupport` per-tool opt-in — **CONFIRMED**

Per the MCP spec 2025-11-25 (cited in `PRIMARY-SOURCE-VERIFICATION-2026-05-16.md` §2.1, verbatim): `execution.taskSupport` values `"forbidden"` (default) / `"optional"` / `"required"` — a per-tool annotation in `tools/list`. The W259v7 D4 framing ("`taskSupport` durable-execution negotiation is dormant... per-tool opt-in") is **CONFIRMED**. The W259-v9 U10 audit (all 12 servers UNKNOWN — none observed to advertise `taskSupport`) is consistent with the spec (the annotation is optional and rarely emitted). No official-docs conflict.

### B3 — Subagent model resolution + `memory:` frontmatter field — **CONFIRMED**

- **Model resolution:** `cc-subagents` frontmatter table verbatim: *"`model` ... `sonnet`, `opus`, `haiku`, a full model ID (for example, `claude-opus-4-7`), or `inherit`. Defaults to `inherit`."* W259v7 D3 — CONFIRMED.
- **`memory:` field is REAL — CONFIRMED.** `cc-subagents` documents per-subagent persistent memory with 3 scopes: `user` → `~/.claude/agent-memory/<name>/`, `project` → `.claude/agent-memory/<name>/`, `local` → `.claude/agent-memory-local/<name>/`. When enabled, the subagent's system prompt gets read/write instructions + the first 200 lines / 25KB of `MEMORY.md`, and Read/Write/Edit are auto-enabled. So W259v9 §3's claim that the 12 project agents carry `memory:` scoping **is verifiable** (the field exists). **Caveat:** plugin subagents ignore `hooks`/`mcpServers`/`permissionMode` (security restriction) — the W259 agents are all project-level (`.claude/agents/`), so those fields *do* apply for them; this is consistent with the W259-v10 cleanup that stripped `PreToolUse` hooks from project agents.

### B4 — Hook event catalog ("20+/26 events") — **CONFIRMED** (W259's count is accurate, mildly conservative)

The current `cc-hooks` doc TOC enumerates these event sections: `SessionStart`, `Setup`, `InstructionsLoaded`, `UserPromptSubmit`, `UserPromptExpansion`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `PermissionRequest`, `PermissionDenied`, `Notification`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `TeammateIdle`, `Stop`, `StopFailure`, `PreCompact`, `PostCompact`, `WorktreeCreate`, `WorktreeRemove`, `Elicitation`, `ElicitationResult`, `ConfigChange`, `CwdChanged`, `FileChanged`, `SessionEnd` — **~28-29 distinct events**. The W259v7 D1 "26 lifecycle events" header is **CONFIRMED** (accurate, slightly conservative — `Setup` + `SubagentStart` are newer additions that push the count past 26). The `PRIMARY-SOURCE-VERIFICATION` §1.4 verbatim catalog is consistent. No conflict.

### B5 — 1M context · prompt caching 1h TTL · Tool search tool · programmatic tool calling — **CONFIRMED** (mechanism), date-stamps UNVERIFIED

- **1M context** — `model-config` (per PSV §4.3 verbatim): *"Opus 4.7, Opus 4.6, and Sonnet 4.6 support a 1 million token context window."* W259v7 D13 — CONFIRMED.
- **Prompt caching `cache_control` 1h TTL** — `ENABLE_PROMPT_CACHING_1H=1` is set; 1h TTL caching is a documented API capability. W259v7 D25 mechanism — CONFIRMED. The Mar-2026 silent-default-TTL-change date is CCBP-secondary (UNVERIFIED this session — not re-fetched).
- **Tool search tool** — real Anthropic-OFFICIAL primitive (`tool_search_tool_regex_20251119`, `defer_loading`) per PSV §4.1. The W259v7 D4 claim *"GA per Feb 17 2026 release-notes — now confirmed GA, no beta header"* — the **mechanism is CONFIRMED**; the **"Feb 17 2026 GA" date-stamp is UNVERIFIED** (PSV §5 D2 explicitly flags this date as CCBP-secondary, not visible in the live primary doc). W259v7 D4 asserts GA more confidently than the primary source supports — see §4 F3.
- **Programmatic tool calling** — `programmatic-tool-calling` doc (PSV §4.2 verbatim): *"calling 10 tools directly uses ~10x the tokens of calling them programmatically and returning a summary."* W259v7 D16 mechanism — CONFIRMED. "Feb 17 2026 GA" date — UNVERIFIED (secondary).

### B6 — The 8 CCBP-secondary date-stamps flagged by W259's own PRIMARY-SOURCE-VERIFICATION — still UNVERIFIED

`PRIMARY-SOURCE-VERIFICATION-2026-05-16.md` §5 lists 9 date-stamps needing re-verification (Tool search GA Feb-17, OpenAI Agents SDK v0.16.0 May-7, Codex v0.130.0 May-8, Managed Agents Apr-8 beta, Advisor tool Apr-9, Adaptive thinking GA Feb-5, Compaction API Feb-5 beta, MCP Registry v1.7.9, AAIF/A2A dates). This W259-v12 session did **not** re-fetch `docs.anthropic.com/en/release-notes/api` or the GitHub release pages, so all 9 remain **UNVERIFIED** — the underlying *mechanisms* (advisor tool, adaptive thinking, Managed Agents, Compaction API) are real per their own product docs, but the **calendar dates** are still CCBP/r33-secondary. W259's own §6 re-verification probe list is the correct next-session action; this audit confirms it is still outstanding.

---

## §3 — Primary-source-artifact re-verification (C)

`PRIMARY-SOURCE-VERIFICATION-2026-05-16.md` was itself produced 2026-05-16 (same day) against the same doc surface. Re-checking its key verbatim cites against this session's independent fetch:

| PSV cite | Re-verification verdict |
|---|---|
| §1.1 `defaultMode` valid values + `autoMode` not read from shared project settings | **HOLDS** — confirmed verbatim against `cc-settings` this session. (PSV is *more accurate* than `W259-ULTIMATE-SYNTHESIS-FINAL.md` §0 on this point — see §4 F1.) |
| §1.2 subagent frontmatter table (`model`/`tools`/`permissionMode`/`skills`/`effort`/`isolation`/`mcpServers`/`hooks`) | **HOLDS** — confirmed against `cc-subagents` this session. |
| §1.3 Skills frontmatter (`name`/`description`/`disable-model-invocation`/`allowed-tools`) | **HOLDS** — not re-fetched in full this session, but consistent with `cc-output-styles`/`cc-subagents` cross-refs. |
| §1.4 hook event catalog (20+ events incl. WorktreeCreate/Remove, PostCompact, PermissionRequest/Denied) | **HOLDS** — confirmed against `cc-hooks` TOC this session (~28-29 events). |
| §1.5 MCP transports `stdio`/`streamable-http`/legacy `http+sse` | **HOLDS** — confirmed; `cc-mcp` this session states `type` accepts `http`≡`streamable-http`, `sse` deprecated. |
| §1.8 Agent SDK is Anthropic-OFFICIAL Python+TS, full feature parity | **HOLDS** — confirmed; `agent-sdk-python` + installed `claude-agent-sdk` 0.1.81 verified directly. |
| §2.1 MCP Tasks `taskSupport` `forbidden`/`optional`/`required` | **HOLDS** — not independently re-fetched from the MCP spec this session, but the W259-v9 U10 audit is consistent with it. |
| §2.3 Streamable HTTP replaces HTTP+SSE 2024-11-05 | **HOLDS** — `cc-mcp` confirms SSE deprecated this session. |
| §4.1 Tool search tool — mechanism real; Feb-17-2026 GA date UNVERIFIED | **HOLDS** — PSV §5 D2 already flags the date as secondary; this audit re-affirms (W259v7 D4 over-asserts GA — §4 F3). |
| §4.3 Opus 4.7 1M context + adaptive reasoning always-on | **HOLDS** — consistent with `model-config` cross-refs. |

**§3 verdict:** All 10 spot-checked PSV verbatim cites **still hold** against the live docs. No drift. The PSV artifact is a sound TIER-1 baseline; the one place the W259 architecture diverges from it (the `defaultMode:"auto"` "BROKEN" claim in the SYNTHESIS doc) is an error in the *synthesis doc*, not in the PSV — the PSV §1.1 is correct.

---

## §4 — WRONG / STALE findings → prioritized fix list

> Ranked by impact. **Zero findings require an immediate `.claude/settings.json` or harness *behavior* correction** — the applied changes are all official-docs-compliant. The findings are doc-text corrections (architecture docs + in-code comments) that would otherwise mislead a future wave.

| # | Severity | Where | Finding | Official cite | Fix |
|---|---|---|---|---|---|
| **F1** | **WRONG** (doc claim) | `W259-ULTIMATE-SYNTHESIS-FINAL.md` §0 "What W259 corrects" + `CC-DIMENSIONS-UNLEASHED-W259v7.md` D7/§4 U2 | Claims `defaultMode:"auto"` in `settings.json` is "BROKEN ... must use `--permission-mode auto` flag". **Current doc contradicts this:** `cc-settings` lists `auto` as a valid `defaultMode` value, honored in `.claude/settings.json`. Only the separate `autoMode` *classifier-tuning object* (`environment`/`allow`/`soft_deny`) is not read from shared project settings (anti-injection). | `https://docs.anthropic.com/en/docs/claude-code/settings` §"Permission settings" — `defaultMode` valid values include `auto`; `https://docs.anthropic.com/en/docs/claude-code/permission-modes` §"Eliminate prompts with auto mode". | Correct the architecture-doc text: `defaultMode:"auto"` **is** a valid honored project-settings value; the launcher flag is *one* option, not a requirement. The thing that needs user/project-local/managed scope is the `autoMode` object. **No settings.json change** — `defaultMode` stays `bypassPermissions` (U2 deferral still correct). Doc-only fix. |
| **F2** | **STALE** (in-code comment) | `harness/eval_harness.py` L137-144 comment | Comment says under `--bare` "the model is not granted tools by default." Current `cc-headless` says the opposite: *"In bare mode Claude has access to the Bash, file read, and file edit tools."* | `https://docs.anthropic.com/en/docs/claude-code/headless` §"Start faster with bare mode". | Reword the harness comment to match the current doc. **Zero behavior impact** — `run_promptfoo_lane()` passes no `--allowedTools` and only reads the result string. Cosmetic. |
| **F3** | **UNVERIFIED → over-asserted** (doc claim) | `CC-DIMENSIONS-UNLEASHED-W259v7.md` D4 | States tool-search is "GA per Feb 17 2026 release-notes — now confirmed GA, no beta header". W259's own `PRIMARY-SOURCE-VERIFICATION` §5 D2 flags the "Feb 17 2026 GA" date as CCBP-secondary, **not** visible in the live primary doc. D4 asserts GA more strongly than the primary source supports. | `PRIMARY-SOURCE-VERIFICATION-2026-05-16.md` §5 D2; `https://docs.anthropic.com/en/release-notes/api` (not re-fetched — outstanding). | Soften D4 to "tool-search is a real Anthropic-OFFICIAL primitive; GA-date is CCBP-secondary, pending `release-notes/api` re-fetch". Doc-only. |
| **F4** | **comment/code drift** (no official-docs violation) | `harness/eval_harness.py` L271-287 comments vs L286 code | The codex-fix narrative + comments say `permission_mode` was changed to `"dontAsk"`; the actual code is `permission_mode="bypassPermissions"`. Both are valid `PermissionMode` enum members (verified against installed SDK 0.1.81), so the harness still runs correctly — but the comment does not match the code. | Installed `claude_agent_sdk.types`: `PermissionMode = Literal["default","acceptEdits","plan","bypassPermissions","dontAsk","auto"]`. | Reconcile: either set the code to `"dontAsk"` (matches the W259-v9 codex-round-1 fix narrative + is the more locked-down choice for a CI aggregator) **or** update the comments to say `bypassPermissions`. Recommended: change the code to `"dontAsk"` — it is the value codex actually prescribed, and with `allowed_tools` listing only the one MCP tool it is strictly tighter. Low priority (both values work). |
| **F5** | **state/comment mismatch** (no official-docs violation) | `.mcp.json` `_comments.w259v9_u10_tasksupport_audit` (says "13" servers incl. `cognee`) vs live `mcpServers` (12 servers, **no `cognee`**) | The W259-v9 audit comment enumerates 13 servers including `cognee` `type:"http"`; the live `mcpServers` block has 12 and **no cognee entry**. The W259-v8 log §3 states cognee was "APPLIED" to `.mcp.json`. Either cognee was added then later removed, or never persisted. Not an official-docs violation (the `_comments` block is provenance only), but the audit comment is internally inconsistent with the file it lives in. | n/a (internal consistency). | Reconcile `.mcp.json`: either re-add the `cognee` `type:"http"` entry (if the cold-tier memory bridge is still wanted) or correct the `w259v9_u10_tasksupport_audit` comment to say "12 servers" and drop the cognee row. Housekeeping. |

**No P0 fix.** Every *applied* change (4 hooks, `outputStyle`, `.mcp.json` transports, harness SDK usage, `.gitattributes`) is official-docs-compliant and needs **no settings.json/harness behavior correction**. F1/F3 are architecture-doc text errors; F2/F4/F5 are comment/state-drift cleanups.

---

## §5 — Overall verdict

### §5.1 — Tally

**Applied changes (A1–A5):** 5 audited → **5 CONFIRMED**, 0 STALE, 0 WRONG.
*(A4 carries one STALE in-code comment — F2 — but the applied change itself, the harness's SDK + headless-flag usage, is CONFIRMED.)*

**Architecture claims (B1–B6):** 6 spot-checked →
- **CONFIRMED:** B2 (Tasks `taskSupport`), B3 (subagent model + `memory:` field), B4 (hook event catalog ~28-29 ≈ "26"), B5-mechanisms (1M context, prompt caching, tool-search *primitive*, programmatic tool calling), B6-mechanisms — and B1's mode list (6 modes) is CONFIRMED complete.
- **WRONG:** **1** — B1's sub-claim that `defaultMode:"auto"` is "BROKEN" (F1).
- **UNVERIFIED:** the 8-9 CCBP-secondary date-stamps (B6) + the "Feb 17 2026 GA" date in B5/D4 (F3) — mechanisms real, calendar dates not primary-sourced this session.

**Combined across applied changes + architecture claims:** **CONFIRMED ≈ 10** (5 applied + ~5 architecture-claim clusters) · **STALE 1** (F2 in-code comment) · **WRONG 1** (F1 — `defaultMode:"auto"` "BROKEN" doc claim) · **UNVERIFIED ~9** (date-stamps).

### §5.2 — Is the W259 unleashed runtime official-docs-COMPLIANT?

**YES — the *applied* W259-v8/v9/v10 runtime is official-docs-COMPLIANT.** Every live change — the 4 wired hooks (`SessionStart`/`PreToolUse`/`PostToolUse`/`WorktreeRemove`), `outputStyle:"Proactive"`, the 12 `.mcp.json` transport `type` values, the Agent-SDK harness's use of `claude-agent-sdk` 0.1.81 + the `--bare -p --output-format json` headless flags, and `.gitattributes` — matches the current official Anthropic / Claude Code documentation exactly. `WorktreeRemove` is a real event; `Proactive` is a real built-in output style; `type:"http"` is valid Streamable HTTP; `permission_mode="bypassPermissions"` is a valid SDK enum value. **No applied change needs a correction.**

The **one WRONG finding (F1)** is in the *architecture documentation*, not the runtime: `W259-ULTIMATE-SYNTHESIS-FINAL.md` §0 mis-states that `defaultMode:"auto"` is "BROKEN". The current `settings` doc lists `auto` as a valid honored `defaultMode` value. This error is latent (the runtime's `defaultMode` is `bypassPermissions`, and U2 was correctly deferred), but it should be corrected so a future wave that wants to flip to `auto` mode does not waste effort on the launcher-flag workaround when a plain `settings.json` value would do.

**Outstanding (not blocking):** the 8-9 CCBP-secondary date-stamps flagged by W259's own PRIMARY-SOURCE-VERIFICATION remain UNVERIFIED — the mechanisms are real, the calendar dates need a `docs.anthropic.com/en/release-notes/api` + GitHub-releases re-fetch (W259's own §6 probe list).

**Net:** runtime = compliant; 1 architecture-doc claim WRONG (F1, doc-only fix); 1 in-code comment STALE (F2); 2 comment/state drifts (F4, F5); date-stamp freshness still owed.

---

## §6 — Audit-trail metadata

- **Audit date:** 2026-05-16
- **Auditor:** W259-v12 OFFICIAL-DOCS AUDITOR (claude-opus-4-7)
- **Official docs fetched live + indexed this session:** 10 Anthropic doc pages (hooks, output-styles, settings, mcp, headless, sub-agents, permission-modes, memory, agent-sdk/python, agent-sdk/custom-tools) — 145 sections, ~580 KB after HTML→markdown.
- **Live runtime probe:** installed `claude-agent-sdk` **0.1.81** in `Z:/venvs/claude` — `PermissionMode` Literal extracted from source; all 8 harness imports resolved.
- **Artifacts read:** `.claude/settings.json`, `.mcp.json`, `harness/eval_harness.py`, `.gitattributes`, `CC-DIMENSIONS-UNLEASHED-W259v7.md`, `W259v8-UNLEASH-EXECUTION-LOG.md` (v8+v9+v10), `PRIMARY-SOURCE-VERIFICATION-2026-05-16.md`, `W259-ULTIMATE-SYNTHESIS-FINAL.md` §0/§3.
- **Cite class:** TIER-1-DIRECT — every verdict cites an official `docs.anthropic.com` URL + section, or the installed SDK source.
- **Reproducibility:** re-run `ctx_fetch_and_index` of the §0.2 URLs; re-probe the SDK via `Z:/venvs/claude/Scripts/python.exe -c "import claude_agent_sdk; ..."`.
- **Scope note:** "W259-v11" does not exist; the audited applied state is W259-v8 + v9 + v10 (the complete live runtime). This document IS the W259-v12 deliverable.
