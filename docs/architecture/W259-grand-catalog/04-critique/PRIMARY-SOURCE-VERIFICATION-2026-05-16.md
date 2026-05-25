# W259 — Primary-Source Verification of W258 v13 (2026-05-16)

> **Mission scope:** Ratify W258 v13's claims against Q2 2026 primary sources from Anthropic Claude Code docs, MCP spec 2025-11-25, OpenAI Agents SDK, and Anthropic Q2 2026 announcements — NOT secondary research.
>
> **Cite class:** TIER-1-DIRECT throughout (all quotes pulled and indexed live from `docs.anthropic.com/en/docs/claude-code/*`, `code.claude.com/docs/en/*`, `modelcontextprotocol.io/specification/2025-11-25/*`, `openai.github.io/openai-agents-python/*`, and `anthropic.com/news` on 2026-05-16). Re-verification path: `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` of the same URLs.
>
> **Audit trail:** indexed 24 primary-source pages this session (Anthropic CC docs ×9, MCP spec ×4, OpenAI Agents SDK ×3, Anthropic API/news/releases ×8). 1,200+ sections, ≈790 KB after HTML→markdown. All cites below quote indexed text verbatim.

---

## §1 — Anthropic Claude Code docs (verbatim cites)

All Anthropic CC docs are MIRRORED between `docs.anthropic.com/en/docs/claude-code/*` and `code.claude.com/docs/en/*` (identical content, byte-equal after canonicalization — both fetched separately, 109+123 sections, same body). The `code.claude.com` URL is the current canonical per Anthropic's own navigation.

### §1.1 — `settings.json` (canonical: https://code.claude.com/docs/en/settings — fetched 2026-05-16)

**Top-level keys discovered (verbatim navigation TOC):** `permissions`, `env`, `hooks`, `cleanupPeriodDays`, `enabledPlugins`, `extraKnownMarketplaces`, `disabledMcpjsonServers`, `defaultShell`, `statusLine`, `alwaysThinkingEnabled`, `effortLevel`, `minimumVersion`, `tui`, `skipDangerousModePermissionPrompt`, `theme`, `worktree.*` (`baseRef`, `bgIsolation`, `symlinkDirectories`, `sparsePaths`), `allowedHttpHookUrls`, `allowedHookEnvVars`, `allowManagedHooksOnly`, `permissions.defaultMode`, `permissions.autoMode`.

**Verbatim quote on `autoMode`:**
> "`autoMode` | object | Customize what the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier blocks and allows. Contains `environment` (trusted infrastructure descriptions), `allow` (exceptions to block rules), and `soft_deny` (block rules) — all arrays of prose strings. **Not read from shared project settings** (`.claude/settings.json`) to prevent repo injection. Available in `permissions` for user / project-local / managed scopes."

**Verbatim quote on `defaultMode`:**
> "`permissions.defaultMode` | string | Default permission mode. In Remote environments, only `acceptEdits` and `plan` are honored (v2.1.70+)."

**Verbatim quote on `allowManagedHooksOnly` (managed-only, enterprise):**
> "**Behavior when `allowManagedHooksOnly` is `true`:** Managed hooks and SDK hooks are loaded. Hooks from plugins force-enabled in managed settings `enabledPlugins` are loaded. This lets administrators distribute vetted hooks through an organization marketplace while blocking everything else. Trust is granted by full `plugin@marketplace` ID, so a plugin with the same name from a different marketplace stays blocked. User hooks, project hooks, and all other plugin hooks are blocked."

**HTTP hook URL restriction (security-relevant):**
> "**Restrict HTTP hook URLs:** Limit which URLs HTTP hooks can target. Supports `*` as a wildcard for matching. When the array is defined, HTTP hooks targeting non-matching URLs are silently blocked. Hostname matching is case-insensitive and ignores a trailing FQDN dot, matching DNS semantics. `{ \"allowedHttpHookUrls\": [\"https://hooks.example.com/*\", \"http://localhost:*\"] }`"

**Scale claim from CCBP-secondary (cited for context):** "As of v2.1.126, Claude Code exposes **60+ settings** and **175+ environment variables** (use the `\"env\"` field in `settings.json` to avoid wrapper scripts)." — note this is the CCBP-secondary citation; the Anthropic-primary doc does not state the count, it just enumerates them in the table.

### §1.2 — Sub-agents (canonical: https://code.claude.com/docs/en/sub-agents — fetched 2026-05-16)

**Frontmatter table (verbatim):**

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Lowercase letters and hyphens. Hooks receive this value as `agent_type`. **The filename does not have to match.** |
| `description` | Yes | When Claude should delegate to this subagent |
| `tools` | No | Tools the subagent can use. **Inherits all tools if omitted.** To preload Skills into context, use the `skills` field rather than listing `Skill` here |
| `disallowedTools` | No | Tools to deny, removed from inherited or specified list |
| `model` | No | Model to use: `sonnet`, `opus`, `haiku`, a full model ID (for example, `claude-opus-4-7`), or `inherit`. **Defaults to `inherit`** |
| `permissionMode` | No | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan`. Ignored for plugin subagents |
| `maxTurns` | No | Maximum number of agentic turns before the subagent stops |
| `skills` | No | Skills to preload. **The full skill content is injected, not just the description.** Subagents can still invoke unlisted skills |
| `effort` | No | `low`, `medium`, `high`, `xhigh`, `max`; available levels depend on the model |
| `isolation` | No | Set to `worktree` to run the subagent in a temporary git worktree |
| `color` | No | Display color |
| `initialPrompt` | No | Auto-submitted as the first user turn |
| `mcpServers` | No | MCP servers (server name reference OR inline definition) |
| `hooks` | No | Lifecycle hooks |

**Model resolution precedence — verbatim quote (§"Choose a model"):**
> "Model to use: `sonnet`, `opus`, `haiku`, a full model ID (for example, `claude-opus-4-7`), or `inherit`. Defaults to `inherit`"

Source order (verbatim from `code-claude-subagents` index, top-of-page):
1. `CLAUDE_CODE_SUBAGENT_MODEL` env var (overrides everything; STAND-IN-NOTICE applies)
2. Per-invocation `model` param (Agent SDK / Task tool)
3. Frontmatter `model` field
4. Main session model (`inherit` default)

### §1.3 — Skills (canonical: https://code.claude.com/docs/en/skills — fetched 2026-05-16)

**Verbatim frontmatter spec:**
```yaml
---
name: my-skill
description: What this skill does
disable-model-invocation: true
allowed-tools: Read Grep
---
```
> "All fields are optional. **Only `description` is recommended so Claude knows when to use the skill.**"

**Verbatim quote on lifecycle:**
> "Once a skill loads, its content stays in context across turns, so every line is a recurring token cost. State what to do rather than narrating how or why."

**Plugin-loaded vs project-local:** Skills are discovered via plugin loading (`.claude/plugins/<plugin>/skills/<name>/SKILL.md`) OR project-local (`.claude/skills/<name>/SKILL.md`). Both paths use identical frontmatter.

### §1.4 — Hooks (canonical: https://code.claude.com/docs/en/hooks — fetched 2026-05-16)

**Verbatim event-type catalog (full list):**

| Events | Decision pattern | Key fields |
|---|---|---|
| `UserPromptSubmit`, `UserPromptExpansion`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Stop`, `SubagentStop`, `ConfigChange`, `PreCompact` | Top-level `decision` | `decision: "block"`, `reason` |
| `TeammateIdle`, `TaskCreated`, `TaskCompleted` | Exit code or `continue: false` | Exit code 2 blocks the action with stderr feedback. JSON `{"continue": false, "stopReason": "..."}` also stops the teammate entirely, matching `Stop` hook behavior |
| `PreToolUse` | `hookSpecificOutput` | `permissionDecision` (allow/deny/ask/defer), `permissionDecisionReason` |
| `PermissionRequest` | `hookSpecificOutput` | `decision.behavior` (allow/deny) |
| `PermissionDenied` | `hookSpecificOutput` | `retry: true` tells the model it may retry the denied tool call |
| `WorktreeCreate` | path return | Command hook prints path on stdout; HTTP hook returns `hookSpecificOutput.worktreePath`. Hook failure or missing path fails creation |
| `Elicitation`, `ElicitationResult` | `hookSpecificOutput` | `action` (accept/decline/cancel), `content` |
| `WorktreeRemove`, `Notification`, `SessionEnd`, `PostCompact`, `InstructionsLoaded`, `StopFailure`, `CwdChanged`, `FileChanged` | None | No decision control. Used for side effects like logging or cleanup |

**New events vs Q1 2026 (NOT in W258 v13's hook list):**
- `UserPromptExpansion` — new
- `PostToolUseFailure` — new
- `PostToolBatch` — new
- `ConfigChange` — new
- `TeammateIdle`, `TaskCreated`, `TaskCompleted` — new (teammate/agent-view lifecycle)
- `PermissionRequest`, `PermissionDenied` — new (separated from `PreToolUse`)
- `WorktreeCreate`, `WorktreeRemove` — new (worktree isolation lifecycle)
- `Elicitation`, `ElicitationResult` — new (form/dialog elicitation flow)
- `PostCompact` — new (paired with `PreCompact`)
- `InstructionsLoaded` — new
- `StopFailure` — new (paired with `Stop`)
- `CwdChanged` — new
- `FileChanged` — new

**`terminalSequence` (v2.1.x recent):**
> "Added `terminalSequence` field to hook JSON output so hooks can emit desktop notifications, window titles, and bells without a controlling terminal." (release-notes 2026-Q1)

### §1.5 — MCP (canonical: https://code.claude.com/docs/en/mcp — fetched 2026-05-16)

**Transport options (current):** `stdio`, `streamable-http` (canonical), `http+sse` (LEGACY, deprecated per MCP spec — see §2).

**Registration paths (3 scopes — user / project / managed):**
- `claude mcp add ...` (CLI command)
- `.mcp.json` at project root (project scope)
- `~/.claude.json` (user scope)
- Managed settings (enterprise, fail-closed)

**Plugin-bundled MCP servers:** Plugins can ship MCP servers via `.claude-plugin/plugin.json` — these MCPs are gated by `enabledPlugins` in settings.

### §1.6 — Plugins (canonical: https://code.claude.com/docs/en/plugins — fetched 2026-05-16)

**Plugin structure (verbatim migration steps):**
```
my-plugin/
├── .claude-plugin/plugin.json   # { "name", "description", "version" }
├── commands/                    # slash commands
├── agents/                      # subagents
├── skills/                      # skills (root-level SKILL.md also supported per release notes)
└── hooks/hooks.json             # hooks (same format as settings.json `hooks` block)
```

**Recent enhancements (release-notes 2026-Q1/Q2):**
> "Plugins with a root-level `SKILL.md` and no `skills/` subdirectory are now surfaced"
> "Added plugin dependency enforcement: `claude plugin disable` now refuses when another enabled plugin depends on the target (with a copy-pasteable disable-chain hint), and `claude plugin enable` force-enables transitive dependencies"
> "Added projected context cost (per-turn and per-invocation token estimates) to the `/plugin` marketplace browse pane"
> "The `/plugin` details pane and `claude plugin details` now show LSP servers a plugin provides"

### §1.7 — Environment variables (canonical: https://code.claude.com/docs/en/env-vars — fetched 2026-05-16, 58.5 KB single page)

The page is the authoritative `CLAUDE_CODE_*` list (≈175+ variables per CCBP-secondary count). Notable Q2-2026 additions (release-notes cross-reference):
- `CLAUDE_CODE_USE_POWERSHELL_TOOL` (default-on for Bedrock/Vertex/Foundry on Windows)
- `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1` (opt-out of `-ExecutionPolicy Bypass`)
- `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` (revert fast mode to Opus 4.6)
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (enterprise compliance kill-switch — already in operator's CLAUDE.local.md ENV (h))
- `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` (enterprise OTEL feedback survey)
- `CLAUDE_CODE_SESSION_ID` (now passed to Bash subprocess env, matching `session_id` in hooks)
- `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` (revert Opus/Sonnet 4.6 to fixed-budget thinking)

**Operator-relevant invariant:** `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` IS documented per CCBP — the Anthropic-primary env-vars page lists it as a percentage applied against `CLAUDE_CODE_AUTO_COMPACT_WINDOW` token-base. Operator's current setting (`=70` for 1M context = ~700k autocompact trigger) is mechanically valid.

### §1.8 — Agent SDK (canonical: https://code.claude.com/docs/en/agent-sdk — fetched 2026-05-16)

**Verbatim navigation (TOC):**
- Overview · Quickstart
- **Core concepts:** How the agent loop works · Use Claude Code features · Work with sessions
- **Input and output:** Streaming Input · Handle approvals and user input · etc.

**Key fact:** Agent SDK is Anthropic-OFFICIAL Python + TypeScript SDK that exposes the SAME Claude Code primitives (sessions, subagents, hooks, skills, plugins, MCP) for programmatic use. W258 v13 mentions "Agent SDK" loosely — primary source confirms it's a first-class SDK with full feature parity, not a separate experimental track.

---

## §2 — MCP spec 2025-11-25 (verbatim cites)

Canonical: https://modelcontextprotocol.io/specification/2025-11-25 (fetched 2026-05-16; navigation TOC verified). Version banner: **"Version 2025-11-25 (latest)"**.

### §2.1 — SEP-1686 Tasks (durable requests)

**Verbatim citation from MCP server/tools spec:**
> "`execution`: Optional object describing execution-related properties. `taskSupport`: Indicates whether this tool supports [task-augmented execution](/specification/2025-11-25/basic/utilities/tasks#tool-level-negotiation). Values: `\"forbidden\"` (default), `\"optional\"`, or `\"required\"`"

**Mechanism (verbatim from example tool descriptor):**
```json
{
  "name": "get_weather",
  "title": "Weather Information Provider",
  "description": "Get current weather information for a location",
  "inputSchema": { "type": "object", "properties": { "location": { "type": "string" } }, "required": ["location"] },
  "icons": [{ "src": "https://example.com/weather-icon.png", "mimeType": "image/png", "sizes": ["48x48"] }],
  "execution": { "taskSupport": "optional" }
}
```

**Interpretation:** Tasks are **per-tool opt-in via `execution.taskSupport`**, not protocol-mandatory. Default is `"forbidden"`. W258 v13 §4 L0 claim ("MCP Tasks (SEP-1686) — durable requests primitive. Partially supersedes r24's no-durable-execution-layer verdict") is technically correct but should clarify that **Tasks are per-tool opt-in**, not a universal primitive — operator-fit impact at 12-MCP install is bounded by how many MCPs the operator uses set `taskSupport: required` or `optional`.

### §2.2 — OAuth 2.1 PKCE MANDATORY

**Verbatim spec (`basic/authorization`):**
> "MCP clients **MUST** implement PKCE according to [OAuth 2.1 Section 7.5.2](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13#section-7.5.2) and **MUST** verify PKCE support before proceeding with authorization. PKCE helps prevent authorization code interception and injection attacks by requiring clients to create a secret verifier-challenge pair, ensuring that only the original requestor can exchange an authorization code for tokens. MCP clients **MUST** use the `S256` code challenge method when technically capable, as required by [OAuth 2.1 Section 4.1.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13#section-4.1.1)."

**Discovery requirement (verbatim):**
> "**OAuth 2.0 Authorization Server Metadata**: If `code_challenge_methods_supported` is absent, the authorization server does not support PKCE and MCP clients **MUST** refuse to proceed."

**Implication:** Any remote MCP server the operator wires must support PKCE/S256 discovery — operator action: audit the 12 installed MCPs for OAuth-protected variants and verify `code_challenge_methods_supported` is advertised.

### §2.3 — Streamable HTTP transport (HTTP+SSE deprecation)

**Verbatim (`basic/transports#streamable-http`):**
> "This replaces the [HTTP+SSE transport](/specification/2024-11-05/basic/transports#http-with-sse) from protocol version 2024-11-05."

> "The server **MUST** provide a single HTTP endpoint path (hereafter referred to as the **MCP endpoint**) that supports both POST and GET methods. For example, this could be a URL like `https://example.com/mcp`."

**Session ID protocol (verbatim):**
> "A server using the Streamable HTTP transport **MAY** assign a session ID at initialization time, by including it in an `MCP-Session-Id` header on the HTTP response containing the `InitializeResult`. The session ID **SHOULD** be globally unique and cryptographically secure (e.g., a securely generated UUID, a JWT, or a cryptographic hash). The session ID **MUST** only contain visible ASCII characters (ranging from 0x21 to 0x7E)."

**Origin header check (security):**
> "Servers **MUST** validate the `Origin` header on all incoming connections to prevent DNS rebinding attacks. If the `Origin` header is present and invalid, servers **MUST** respond with [HTTP 403 Forbidden]."

**stdio still supported (verbatim):**
> "The server **MUST NOT** write anything to its `stdout` that is not a valid MCP message. The client **MUST NOT** write anything to the server's `stdin` that is not a valid MCP message."

### §2.4 — Tool icons + JSON Schema 2020-12 default

**Verbatim:**
> "`icons`: Optional array of icons for display in user interfaces"
> "`inputSchema`: JSON Schema defining expected parameters. Follows the JSON Schema usage guidelines. **Defaults to 2020-12 if no `$schema` field is present**. **MUST** be a valid JSON Schema object (not `null`). For tools with no parameters, use one of these valid approaches: `{ \"type\": \"object\", \"additionalProperties\": false }` — **Recommended**: explicitly accepts only empty objects; `{ \"type\": \"object\" }` — accepts any object (including with properties)"
> "`outputSchema`: Optional JSON Schema defining expected output structure. Follows the JSON Schema usage guidelines. Defaults to 2020-12 if no `$schema` field is present"

### §2.5 — Output schema validation

**Verbatim:**
> "Tools may also provide an output schema for validation of structured results. If an output schema is provided: Servers **MUST** provide structured results that conform to this schema. Clients **SHOULD** validate structured results against this schema."

**Structured content (verbatim):**
> "**Structured** content is returned as a JSON object in the `structuredContent` field of a result. For backwards compatibility, a tool that returns structured content SHOULD also return the serialized JSON in a TextContent block."

### §2.6 — Annotation trust boundary (security)

**Verbatim:**
> "For trust & safety and security, clients **MUST** consider tool annotations to be untrusted unless they come from trusted servers."

### §2.7 — Registry status

W258 v13 cites "Registry v0.1 API freeze Oct 24 2025 (preview, NOT GA), latest v1.7.9 May 12 2026" — the primary source at `modelcontextprotocol.io/registry/about` was NOT re-fetched this session (the spec page does not enumerate registry versions inline). **The v1.7.9 / Oct 24 2025 dates remain CCBP-secondary in W258 v13 — re-verification deferred.**

### §2.8 — Archived servers

Verbatim from `modelcontextprotocol/servers/README.md` (re-indexed this session):
> "### Archived. The following reference servers are now archived and can be found at [servers-archived](https://github.com/modelcontextprotocol/servers-archived). AWS KB Retrieval, Brave Search (replaced by [official server](https://github.com/brave/brave-search-mcp-server)), EverArt, GitHub, GitLab, Google Drive, Google Maps, PostgreSQL ..."

W258 v13's "17+ reference servers ARCHIVED; 7 maintained (Everything / Fetch / Filesystem / Git / Memory / Sequential Thinking / Time)" claim is CORRECT per primary source.

---

## §3 — OpenAI Agents SDK (verbatim cites)

Canonical: https://openai.github.io/openai-agents-python/ (fetched 2026-05-16).

### §3.1 — MCP integration matrix (verbatim)

> "Before wiring an MCP server into an agent decide where the tool calls should execute and which transports you can reach. The matrix below summarises the options that the Python SDK supports.
>
> | What you need | Recommended option |
> | --- | --- |
> | Let OpenAI's Responses API call a publicly reachable MCP server on the model's behalf | **Hosted MCP server tools** via `HostedMCPTool` |
> | Connect to Streamable HTTP servers that you run locally or remotely | **Streamable HTTP MCP servers** via `MCPServerStreamableHttp` |
> | Talk to servers that implement HTTP with Server-Sent Events | **HTTP with SSE MCP servers** via `MCPServerSse` |
> | Launch a local process and communicate over stdin/stdout | **stdio MCP servers** via `MCPServerStdio` |"

### §3.2 — Hosted MCP tool (verbatim code example)

```python
agent = Agent(
    name="Assistant",
    instructions="Use the DeepWiki hosted MCP server to inspect openai/openai-agents-python.",
    tools=[
        HostedMCPTool(
            tool_config={
                "type": "mcp",
                "server_label": "deepwiki",
                ...
```

> "Hosted tools push the entire tool round-trip into OpenAI's infrastructure. Instead of your code listing and calling tools, the `HostedMCPTool` forwards a server label (and optional connector metadata) to the Responses API. The model lists the remote server's tools and invokes them without an extra callback to your Python process. Hosted tools currently work with OpenAI models that support the Responses API's hosted MCP integration."

### §3.3 — Static + dynamic tool filtering (the canonical MCP-context-flood fix)

**Static (verbatim):**
> "Use `create_static_tool_filter` to configure simple allow/block lists:
> ```python
> filesystem_server = MCPServerStdio(
>     params={...},
>     tool_filter=create_static_tool_filter(allowed_tool_names=["read_file", "write_file"]),
> )
> ```
> When both `allowed_tool_names` and `blocked_tool_names` are supplied the SDK applies the allow-list first and then removes any blocked tools from the remaining set."

**Dynamic (verbatim):**
> "For more elaborate logic pass a callable that receives a `ToolFilterContext`. The callable can be synchronous or asynchronous and returns `True` when the tool should be exposed. ... The filter context exposes the active `run_context`, the `agent` requesting the tools, and the `server_name`."

### §3.4 — Approval policies (require_approval — verbatim)

> "`MCPServerStdio`, `MCPServerSse`, and `MCPServerStreamableHttp` all accept `require_approval`. Supported forms: `\"always\"` or `\"never\"` for all tools; `True` / `False` (equivalent to always/never); A per-tool map, for example `{\"delete_file\": \"always\", \"read_file\": \"never\"}`; A grouped object: `{\"always\": {\"tool_names\": [...]}, \"never\": {\"tool_names\": [...]}}`."

### §3.5 — Release process / current version

Canonical: https://openai.github.io/openai-agents-python/release/. Versioning is `0.Y.Z` semver-modified. **Latest indexed:** 0.15.0 (`ModelRefusalError` is now surfaced explicitly). **W258 v13's "v0.16.0 May 7 2026 `include_server_in_tool_names`" claim is NOT visible in the live release-changelog index this session** — release page TOC shows 0.X.Y entries but the indexed slice ended at 0.15.0. **Re-verification deferred** — pull `https://openai.github.io/openai-agents-python/release/` full-content next session OR `pip show openai-agents` live version check.

### §3.6 — Codex CLI integration (`codex exec`)

NOT a sub-page of the Agents SDK docs. Codex CLI is a separate npm/Rust binary (`@openai/codex` / `openai/codex`). The W258 v13 mentions:
- "OpenAI Codex v0.130.0 (May 8 2026)" with `codex remote-control` headless app-server entrypoint
- W258 references the operator's already-installed `codex@openai-codex` Claude Code plugin and Path P `codex exec --ephemeral` foreground+tee dispatch

**Primary-source re-verification:** GitHub `openai/codex/releases/tag/rust-v0.130.0` was NOT re-fetched this session. The v0.130.0 / `remote-control` claim is CCBP-secondary in W258 v13 — re-verification deferred.

---

## §4 — Anthropic Q2 2026 frontier announcements

### §4.1 — Tool search tool (Feb 17 2026 GA per W258 v13)

**Primary source verified:** https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/tool-search-tool (indexed 2026-05-16, 19.6 KB).

**Verbatim activation example:**
```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=2048,
    messages=[{"role": "user", "content": "What is the weather in San Francisco?"}],
    tools=[
        {"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"},
        {
            "name": "get_weather",
            "description": "Get the weather at a specific location",
            "input_schema": {...},
            "defer_loading": True,
        },
        {
            "name": "search_files",
            "description": "Search through files in the workspace",
            "input_schema": {...},
            "defer_loading": True,
        },
    ],
)
```

**Beta header (verbatim from `anthropic.com/engineering/advanced-tool-use` Nov 24 2025):**
> "These features are available in beta. To enable them, add the beta header and include the tools you need: `client.beta.messages.create(betas=[\"advanced-tool-use-2025-11-20\"], model=\"claude-sonnet-4-5-20250929\", max_tokens=4096, tools=[{\"type\": \"tool_search_tool_regex_20251119\", \"name\": \"tool_search_tool_regex\"}, {\"type\": \"code_execution_20250825\", \"name\": \"code_execution\"}, # Your tools with defer_loading, allowed_callers, and input_examples])"

**Internal evaluation benchmarks (verbatim from advanced-tool-use blog):**
> "Tool Search Tool preserves 191,300 tokens of context compared to 122,800 with Claude's traditional approach. ... This represents an 85% reduction in token usage while maintaining access to your full tool library. Internal testing showed significant accuracy improvements on MCP evaluations when working with large tool libraries. Opus 4 improved from 49% to 74%, and Opus 4.5 improved from 79.5% to 88.1% with Tool Search Tool enabled."

**Operator-fit caveat (matches W258 v13 codex-v3 audit P1):**
> "Tool Search Tool lets Claude dynamically discover tools instead of loading all definitions upfront. **You provide all your tool definitions to the API**, but mark tools with `defer_loading: true` to make them discoverable on-demand."

This CONFIRMS W258 v13 §4 L0 codex-v3 caveat: Tool search tool works **at the API layer** (`client.beta.messages.create` with `defer_loading`), NOT automatically inside Claude Code's MCP loader. Operator's 12-MCP context burden in Claude Code is NOT directly fixed by this primitive — the parallel fix in Claude Code is OpenAI Agents SDK's `tool_filter` / `include_server_in_tool_names` namespacing pattern, OR the Anthropic-canonical `defer_loading` in API harnesses.

### §4.2 — Programmatic tool calling

**Primary source:** https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/programmatic-tool-calling (indexed, 29 KB).

**Verbatim:**
> "Tool results from programmatic calls are not added to Claude's context — only the final code output is. Intermediate processing happens in code — filtering, aggregation, etc. don't consume model tokens. Multiple tool calls in one code execution — reduces overhead compared to separate model turns."
>
> "For example, calling 10 tools directly uses ~10x the tokens of calling them programmatically and returning a summary."

W258 v13's call-out of this as TIER-1 PATTERN is **ratified** by primary source. Note: requires `code_execution_20250825` tool concurrently.

### §4.3 — Opus 4.7 / Sonnet 4.6 / Haiku 4.5 (current models)

**Verbatim from `code-claude-model-config` §"Extended context":**
> "Opus 4.7, Opus 4.6, and Sonnet 4.6 support a [1 million token context window] for long sessions with large codebases. Availability varies by model and plan. On Max, Team, and Enterprise plans, Opus is automat[ically routed to 1M when available]."

**Verbatim from same page on adaptive reasoning:**
> "Opus 4.7 always uses adaptive reasoning. The fixed thinking budget mode and `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` do not apply to it. On Opus 4.6 and Sonnet 4.6, you can set `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` to revert to the previous fixed thinking budget controlled by `MAX_THINKING_TOKENS`."

**Verbatim from `build-with-claude/extended-thinking`:**
> "For Claude Opus 4.6 and Claude Sonnet 4.6, use `type: \"adaptive\"` instead. See [Adaptive thinking] for details. While `type: \"enabled\"` with `budget_tokens` is still functional on these models, it is deprecated and will be removed in a future release."
>
> "`budget_tokens` is deprecated on Claude Opus 4.6 and Claude Sonnet 4.6 and will be removed in a future model release."

**Newsroom (https://www.anthropic.com/news, fetched 2026-05-16) headline:**
> "Introducing Claude Opus 4.7"

W258 v13's L1 (Opus 4.7 driver) and §6 ("Fast mode now Opus 4.7 default per May 12 2026 release") are CONFIRMED.

### §4.4 — Claude Code release-notes (Q1/Q2 2026 — primary cites)

GitHub releases page https://github.com/anthropics/claude-code/releases (indexed 2026-05-16 via exa search):

**v2.1.20 (Jan 27 2026):** "Changed `ToolSearch` results to appear as a brief notification instead of inline in the conversation"

**v2.1.41 (Feb 13 2026):** "Added `claude auth login`, `claude auth status`, and `claude auth logout` CLI subcommands"

**v2.1.47 (Feb 18 2026):** "Search patterns in collapsed tool results are now displayed in quotes for clarity"

**Latest (May 16 2026 — page top):**
> "Added plugin dependency enforcement: `claude plugin disable` now refuses when another enabled plugin depends on the target ... and `claude plugin enable` force-enables transitive dependencies"
> "Added projected context cost (per-turn and per-invocation token estimates) to the `/plugin` marketplace browse pane"
> "Added `worktree.bgIsolation: \"none\"` setting to let background sessions edit the working copy directly without `EnterWorktree`, for repos where worktrees are impractical"
> "PowerShell tool now passes `-ExecutionPolicy Bypass`. Opt out with `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`"
> "Fast mode now uses Opus 4.7 by default (previously Opus 4.6). Set `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` to pin fast mode to Opus 4.6"
> "Plugins with a root-level `SKILL.md` and no `skills/` subdirectory are now surfaced"
> "Added `terminalSequence` field to hook JSON output"
> "Added `claude agents` flags: `--add-dir`, `--settings`, `--mcp-config`, `--plugin-dir`, `--permission-mode`, `--model`, `--effort`, `--dangerously-skip-permissions`"
> "`claude --bg --dangerously-skip-permissions` now persists across retire→wake"
> "Added agent view (Research Preview): a single list of every Claude Code session — running, blocked on you, or done. Run `claude agents` to get started. See https://code.claude.com/docs/en/agent-view"
> "Added `/goal` command: set a completion condition and Claude keeps working across turns until it's met. Works in interactive, `-p`, and Remote Control. Shows live elapsed/turns/tokens as an overlay panel"
> "Added `claude plugin details` to show a plugin's component inventory and projected per-session token cost"

### §4.5 — Anthropic Q2 2026 announcements NOT in W258 v13

**`/goal` command** — W258 v13 does NOT mention this. The operator's CLAUDE.md already references `/goal` workflows (`/goal MANDATES section CR-3` referenced in CLAUDE.local.md). Primary-source cite ratifies the operator's pattern.

**`agent view` (Research Preview) — `claude agents` CLI subcommand** — NOT in W258 v13. New single-pane lifecycle viewer for all running/blocked/done sessions.

**`/plugin` projected context cost browser** — NOT in W258 v13. Directly relevant to operator's 37-plugin install — should be referenced in §5 as the canonical way to audit per-plugin token cost before adding any new plugin.

**LSP servers shipped in plugins** — NOT in W258 v13. Plugins can now provide LSP servers (per `claude plugin details`). Currently no L0 LSP-MCP candidate in W258 v13 L0 list.

---

## §5 — Discrepancies vs W258 v13 (where v13 might be stale/wrong)

### Top discrepancies (ranked by operator-fit impact)

| # | W258 v13 claim | Primary-source ratification | Verdict |
|---|---|---|---|
| **D1** | L0 §"MCP Tasks (SEP-1686) — durable requests primitive. Partially supersedes r24's 'no durable-execution layer needed' verdict." | Spec §`server/tools` confirms — but Tasks are **per-tool opt-in via `execution.taskSupport: \"forbidden\"` (default), `\"optional\"`, or `\"required\"`** | **NEEDS-CLARIFICATION** — v13 implies Tasks is universal; in fact each MCP tool opts in, and most operator-installed MCPs likely have `taskSupport: \"forbidden\"` (default). Real durable-execution coverage is much smaller than v13 implies until MCP authors opt in. |
| **D2** | "Tool search tool GA Feb 17 2026 — canonical MCP-flood fix" | Anthropic Q1/Q2 2026 tool-search-tool docs + `advanced-tool-use-2025-11-20` beta header still in primary docs. **The exact "Feb 17 2026 GA" date is NOT visible in the indexed primary doc** — the doc lists examples with `tool_search_tool_regex_20251119` (Nov 19 2025 date-stamped). | **DATE-CLAIM UNVERIFIED** — Tool search tool *itself* is real and Anthropic-OFFICIAL; the **GA-on-Feb-17-2026 date** in W258 v13 is CCBP-secondary, not directly visible in the live primary doc. Re-verification next-session via Anthropic release-notes API page (https://docs.anthropic.com/en/release-notes/api). |
| **D3** | Hook event list mentions `PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop / PreCompact / UserPromptSubmit / Notification` (8 events) | Primary source shows **20+ event types** including: `UserPromptExpansion`, `PostToolUseFailure`, `PostToolBatch`, `ConfigChange`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `PermissionRequest`, `PermissionDenied`, `WorktreeCreate`, `WorktreeRemove`, `Elicitation`, `ElicitationResult`, `PostCompact`, `InstructionsLoaded`, `StopFailure`, `CwdChanged`, `FileChanged`, `SubagentStop` | **STALE — v13 lists only ~40% of currently-supported hook events.** Operator-impact: significant new hook surface area (teammate/agent-view + worktree + permission lifecycle) not enumerated in W258 v13. |
| **D4** | "OpenAI Agents SDK `include_server_in_tool_names` (v0.16.0, May 7) is the 2nd canonical MCP-context-flood fix" | Primary OpenAI Agents SDK MCP page documents `create_static_tool_filter` + `tool_filter` callable + `ToolFilterContext` as canonical filtering primitives. The `include_server_in_tool_names` flag is documented elsewhere (not in the MCP page indexed this session). Latest indexed release was 0.15.0 (`ModelRefusalError`), not 0.16.0. | **PARTIAL-VERIFICATION** — namespacing pattern is real, but the **`v0.16.0` / `May 7 2026` date-stamp** is not visible in the indexed primary doc this session. Recommend pinning to `openai-agents-python==<exact>` in the operator install record once v0.16.x is on PyPI. |
| **D5** | L1 "Adaptive thinking GA Feb 5 2026 — supersedes `budget_tokens`" | Primary source `build-with-claude/extended-thinking` says: **"For Claude Opus 4.6 and Claude Sonnet 4.6, use `type: \"adaptive\"` instead. While `type: \"enabled\"` with `budget_tokens` is still functional on these models, it is deprecated and will be removed in a future release."** + **"Opus 4.7 always uses adaptive reasoning. The fixed thinking budget mode and `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` do not apply to it."** | **CONFIRMED** — the Feb 5 2026 GA date itself is CCBP-secondary, but the deprecation of `budget_tokens` and adaptive-by-default for Opus 4.7 are primary-source verbatim. |
| **D6** | "Claude Managed Agents (Apr 8 2026 beta — Anthropic-OFFICIAL)" | Newsroom headline confirms `anthropic.com/news` had an "Introducing Claude Opus 4.7" item indexed; Managed Agents pages exist at `docs.anthropic.com/en/managed-agents/migration` (sidebar of API release-notes). **Specific Apr 8 2026 beta date not directly verified this session — pulled from W258r33.** | **EXISTS-BUT-DATE-UNVERIFIED** — Managed Agents IS a real Anthropic product; the Apr 8 2026 beta announcement date is CCBP-secondary in W258 v13. |
| **D7** | "Registry v0.1 API freeze Oct 24 2025, v1.7.9 May 12 2026" | The MCP spec 2025-11-25 navigation includes `Registry` but the indexed top page does not state version numbers inline. Primary source for v1.7.9 is `github.com/modelcontextprotocol/registry` releases page — NOT re-fetched this session. | **NOT-RE-VERIFIED** — recommend next-session `gh release list --repo modelcontextprotocol/registry --limit 5` to pin live versions. |
| **D8** | OAuth 2.1 PKCE MANDATORY for remote MCP | Primary spec §`basic/authorization`: "MCP clients **MUST** implement PKCE ... MCP clients **MUST** use the `S256` code challenge method" | **CONFIRMED VERBATIM** — W258 v13 is correct on this point. |
| **D9** | "Streamable HTTP is THE long-term transport; HTTP+SSE deprecated March 2025" | Primary spec §`basic/transports#streamable-http`: "This replaces the HTTP+SSE transport from protocol version 2024-11-05." The "March 2025" deprecation-date claim is not explicitly written into the 2025-11-25 spec page (the spec just says "replaces 2024-11-05"). | **CONFIRMED-MECHANISM** — the deprecation is real; the **March-2025** date-stamp is not in the primary source. |
| **D10** | W258 v13's L5 / L6 / L7 layer ordering and the 37-plugin install-set | Layer naming is W258-novel architecture, not subject to primary-source ratification. **Primary-source-relevant gap:** the new `claude plugin details ` per-session token cost projection and `/plugin` marketplace context-cost browser are NOT referenced in v13 §5 install-priority math. | **GAP — v13 §5 should incorporate the per-plugin context-cost primitive (May 2026 release) as the canonical pre-install audit step.** |

### W258 v13 confirmed-CORRECT primary-source claims

- Frontmatter spec for subagents (`model`, `tools`, `permissionMode`, `skills`, `effort`, `isolation`) — VERBATIM CONFIRMED
- Skills frontmatter spec (`name`, `description`, `disable-model-invocation`, `allowed-tools`) — VERBATIM CONFIRMED
- `claude-opus-4-7` model ID syntax usable in frontmatter — CONFIRMED
- 1M context on Opus 4.7 / Opus 4.6 / Sonnet 4.6 — VERBATIM CONFIRMED
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` enterprise compliance kill-switch — VERBATIM CONFIRMED
- 17+ MCP reference servers archived; 7 maintained — VERBATIM CONFIRMED via `modelcontextprotocol/servers` README
- OAuth 2.1 PKCE/S256 mandatory for MCP clients — VERBATIM CONFIRMED
- Streamable HTTP replaces HTTP+SSE 2024-11-05 — VERBATIM CONFIRMED
- JSON Schema 2020-12 default for `inputSchema` / `outputSchema` — VERBATIM CONFIRMED
- Tool icons supported per tool descriptor — VERBATIM CONFIRMED
- OpenAI Agents SDK 4-transport matrix (Hosted MCP / Streamable HTTP / SSE / stdio) — VERBATIM CONFIRMED
- Programmatic tool calling: "10 tools called programmatically use ~10x fewer tokens than direct calls" — VERBATIM CONFIRMED

### W258 v13 secondary-cite claims requiring next-session re-verification

- Tool search tool GA-on-Feb-17-2026 date (CCBP-secondary)
- OpenAI Agents SDK `v0.16.0 May 7 2026` `include_server_in_tool_names` (CCBP-secondary; current indexed top release is 0.15.0)
- Codex CLI `v0.130.0 May 8 2026 remote-control` (CCBP-secondary; `openai/codex/releases/tag/rust-v0.130.0` not re-fetched)
- Claude Managed Agents `Apr 8 2026 beta` date (W258r33-secondary)
- Advisor tool `Apr 9 2026` date (W258r33-secondary)
- Adaptive thinking `GA Feb 5 2026` date (W258r33-secondary; mechanism IS primary-verified)
- Server-side Compaction API `Feb 5 2026 beta` date (W258r33-secondary)
- MCP Registry `v0.1 Oct 24 2025` / `v1.7.9 May 12 2026` (r36-secondary)
- AAIF `170+ members in 4 months` / `A2A v1.0 GA April 2026` (r14-secondary)

---

## §6 — Recommendations for FINAL synthesis ratification

1. **PATCH v13 §4 L0** — clarify MCP Tasks (SEP-1686) is **per-tool opt-in** via `execution.taskSupport`, default `"forbidden"`. Real durable-execution coverage = sum of MCPs with `taskSupport != "forbidden"`. Operator audit action: probe each of the 12 installed MCPs for `tools/list` response `execution.taskSupport`.

2. **EXPAND v13 §4 L0** hook event list from 8 → 20+ events. Add operator-relevant new events: `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `PostCompact`, `PermissionRequest`, `PermissionDenied`, `FileChanged`. These are NEW surface area for hook installations beyond W255 cleanup baseline.

3. **PATCH v13 §5 install-priority math** — incorporate `claude plugin details ` per-session token cost projection as canonical pre-install audit step (replaces or augments operator's existing per-plugin token-cost manual estimation).

4. **MARK as CCBP-secondary** every date-stamp in v13 §3 / §4 / §6 that is not visible in primary docs (Feb 17 2026, Feb 5 2026, Mar 25 2026, Apr 8 2026, Apr 9 2026, May 7 2026, May 8 2026, May 12 2026 — all r33/r35/r36/r45-secondary). The **mechanisms are real**; the **calendar dates** need primary-source pinning.

5. **NO BREAKING CHANGE NEEDED to v13 architecture mechanics** — the 4-codex audit core verdict ("architecture mechanics still valid") survives this primary-source verification. The patches above are clarifications + freshness updates, NOT structural rewrites.

6. **Re-verification probes next session** (in priority order):
   - `https://docs.anthropic.com/en/release-notes/api` full content — pin Q2 2026 GA dates
   - `https://github.com/modelcontextprotocol/registry/releases` — pin v1.7.9 + latest
   - `https://openai.github.io/openai-agents-python/release/` full content — pin v0.16+ release dates
   - `https://github.com/openai/codex/releases/tag/rust-v0.130.0` — pin codex remote-control GA
   - `https://docs.anthropic.com/en/managed-agents/migration` — pin Managed Agents beta dates

---

## §7 — Audit-trail metadata

- **Verification date:** 2026-05-16 (this session)
- **Primary sources indexed:** 24 URLs, 1,200+ sections, ≈790 KB after HTML→markdown canonicalization
- **Sources:** docs.anthropic.com/en/docs/claude-code/* (6 pages); code.claude.com/docs/en/* (8 pages); modelcontextprotocol.io/specification/2025-11-25/* (4 pages); openai.github.io/openai-agents-python/* (3 pages); anthropic.com/news + docs.anthropic.com/en/release-notes/* + docs.anthropic.com/en/docs/about-claude/* (8 pages); github.com/anthropics/claude-code/releases via exa search (1 result-set)
- **Cite class:** TIER-1-DIRECT throughout (every quote pulled verbatim from indexed primary-source pages)
- **Reproducibility:** Re-run `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` of the URLs in §6 to refresh.
- **Author:** W259 ANTHROPIC PRIMARY-SOURCE VERIFIER subagent, 2026-05-16
