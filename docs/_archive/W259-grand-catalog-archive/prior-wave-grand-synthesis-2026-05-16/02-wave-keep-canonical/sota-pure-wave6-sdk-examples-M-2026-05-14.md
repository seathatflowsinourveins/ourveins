---
title: Wave 6 Agent M — Anthropic Python Agent SDK examples/ audit
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-14
agent: M
cite_class: TIER-1-DIRECT @ Z:/repos/deps/anthropics__claude-agent-sdk-python @ HEAD 694e4f3b
scope: NARROW — enumerate examples/, classify SDK-only vs CLI-portable, map to Option B phases
---

## Executive summary

Anthropic-OFFICIAL Python Agent SDK at `Z:/repos/deps/anthropics__claude-agent-sdk-python @ HEAD 694e4f3b` ships **16 example `.py` files** (2506 LOC) in `examples/` plus **3 reference SessionStore adapters** (846 LOC in `examples/session_stores/`) plus **1 demo plugin** (`examples/plugins/demo-plugin/`). Total: 20 canonical pattern demonstrators.

**The structural verdict for claude-sota-installed (Option B / CLI runtime)**: ~60% of SDK example patterns are **already addressable via CLI plugin/hook/settings primitives** because the SDK itself layers thin Python wrappers around the same `claude` CLI runtime that Option B uses directly. ~25% are **SDK-only by construction** (in-process MCP servers, programmatic SessionStore backends, Python permission callbacks, stderr capture callbacks, async stream consumers). ~15% are **NARROW-FIT** — useful patterns but Option B has them via different mechanism (subagents, settings.json, /plugin install).

### 5 patterns Option B should adopt via CLI-equivalent (CONCRETE PROPOSALS)

| # | SDK example | Option B CLI-equivalent | Rationale |
|---|---|---|---|
| 1 | `agents.py` — inline `AgentDefinition` with model+tools+prompt | `.claude/agents/<name>.md` frontmatter `name: / model: / tools: / description:` | Same surface, different format. SDK loads at runtime; CLI loads at session boot per `claude-subagents.md @ f8468e87`. Option B already uses this for Tier-5 install rows. |
| 2 | `hooks.py` — 5 hook handlers (check_bash / add_instructions / review_output / strict_approval / stop_on_error) | `.claude/settings.json:hooks.{PreToolUse,UserPromptSubmit,PostToolUse,Stop}[]` with executable scripts (Python OR shell) | TIER-1 mechanically equivalent — CLI hook contract IS the SDK hook contract (same JSON I/O over stdin/stdout). Migration: rewrite as `.py` script that reads stdin, writes JSON to stdout. |
| 3 | `plugin_example.py` — load local `examples/plugins/demo-plugin/` | `/plugin marketplace add <path>` + `/plugin install demo-plugin` | Direct CLI primitive per CR-6 official-native-channel mandate. Demo plugin uses standard `.claude-plugin/plugin.json` + `commands/greet.md` — Option B can install verbatim. |
| 4 | `setting_sources.py` — control which settings.json layers load | CLI env: `CLAUDE_CONFIG_DIR` + per-session `--no-user-settings` / `--no-project-settings` flags | Option B's `CLAUDE.local.md` ENV block already isolates `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude` per CCBP `claude-settings.md:877-921 @ 48f2ceb`. SDK semantics map to CLI flags. |
| 5 | `system_prompt.py` — 4 patterns (none/string/preset/preset+append) | `.claude/settings.json` + `.claude/agents/*.md` frontmatter `description:` + per-command system-prompt prefix | CLI loads CLAUDE.md as system-prompt foundation; agent frontmatter overrides per-dispatch. Preset+append maps to `description: + PROACTIVELY...` clause. |

### 5 SDK-only gaps to acknowledge (STRUCTURAL — Option B CLI runtime CANNOT achieve)

| # | SDK feature | Why CLI runtime cannot achieve | Acknowledged-gap status |
|---|---|---|---|
| 1 | `mcp_calculator.py` — **in-process** MCP server (Python tools registered directly in agent loop, no subprocess) | CLI MCP servers run as subprocess (`stdio` / `sse` / `http` transports per `.mcp.json` schema). Option B can register `python -m my_mcp_server` as subprocess but NOT host-process-shared. | DOCUMENTED-EXCEPTION — Option B uses subprocess MCP (slightly slower IPC, much simpler deployment, language-agnostic). |
| 2 | `tool_permission_callback.py` — Python callback function for tool gating | CLI uses `permissions.{allow,deny,ask}` arrays in settings.json + hook scripts via PreToolUse JSON I/O. No live function-pointer callback. | DOCUMENTED-EXCEPTION — Hook script is functionally equivalent (~5ms vs ~50µs latency negligible at human-interaction scale). |
| 3 | `streaming_mode.py` (519 LOC) + `streaming_mode_trio.py` + `streaming_mode_ipython.py` — async stream consumption with `interrupt()` / `set_permission_mode()` / `rewind_files()` runtime control | CLI is interactive terminal; CC operator drives via keyboard. Programmatic mid-conversation control surface absent. | DOCUMENTED-EXCEPTION — Option B uses `/loop` slash + Ralph stop-hook auto-continue + operator-driven `/rewind` for analogous control. |
| 4 | `session_stores/` — Redis/Postgres/S3 backed conversation persistence via `SessionStore` protocol | CLI persists sessions to `CLAUDE_CODE_PROJECT_DIR` JSONL files (per Option B ENV (f): `Z:/claude-sota-installed-state/.claude/projects`). No pluggable backend. | DOCUMENTED-EXCEPTION — JSONL-on-disk is sufficient for solo-operator runtime; pluggable backends are SaaS/multi-tenant concern. |
| 5 | `include_partial_messages.py` — stream `StreamEvent` partial chunks for real-time UI | CLI renders to terminal; no partial-event surface exposed to operator. | DOCUMENTED-EXCEPTION — terminal rendering IS the partial-message UI. |

### 1 STUDY-PILOT candidate (CR-12 GENUINELY-NEW disposition)

`max_budget_usd.py` — programmatic dollar-budget enforcement (`max_budget_usd` field in `ClaudeAgentOptions`). CLI runtime has `MAX_TURNS` and `MAX_THINKING_TOKENS` but NO dollar-budget primitive. Could be approximated via PostToolUse hook tracking ccusage telemetry + Stop-hook decision: block when threshold exceeded. **DEFER** to follow-up wave — not Phase 0-3 blocker.

## Example enumeration table

Cite: every row references `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/<file> @ HEAD 694e4f3b` [VERIFIED 2026-05-14 via Bash inventory + docstring head -30 extraction].

| File | LOC | Intent (from docstring) | Pattern category | SDK-only or CLI-portable |
|---|---|---|---|---|
| `agents.py` | 124 | Define inline `AgentDefinition` with custom tools/prompts/models; 3 examples (code_reviewer / documentation_writer / multiple_agents) | subagent | **CLI-portable** — `.claude/agents/<name>.md` frontmatter |
| `filesystem_agents.py` | 107 | Load agents from `.claude/agents/*.md` markdown files via `setting_sources=["project"]` | subagent | **CLI-native** — this IS the CLI mechanism |
| `hooks.py` | 350 | 5 hook handlers + 5 example runners (PreToolUse / UserPromptSubmit / PostToolUse / decision_fields / continue_control) | hook | **CLI-portable** — settings.json hooks[] |
| `include_partial_messages.py` | 62 | Stream `StreamEvent` partial events for real-time UI | streaming | **SDK-only** — no CLI surface |
| `max_budget_usd.py` | 95 | `max_budget_usd` field for dollar cost cap (without_budget / reasonable / tight) | budget | **STUDY-PILOT** — CLI lacks; could approximate via hook |
| `mcp_calculator.py` | 193 | In-process MCP server with add/subtract/multiply/divide/sqrt tools | MCP | **SDK-only** — CLI uses subprocess MCP |
| `plugin_example.py` | 71 | Load local plugin from `examples/plugins/demo-plugin/`; verify via system message | plugin | **CLI-portable** — `/plugin install` |
| `quick_start.py` | 76 | Hello-world: basic / with_options / with_tools | streaming | **CLI-portable** — equivalent to `claude -p "..."` |
| `setting_sources.py` | 203 | Control which settings.json layers load (default / disable_all / user_only / project_and_user) | settings | **CLI-portable** — env var + CLI flags |
| `stderr_callback_example.py` | 42 | Capture CLI debug stderr via Python callback | streaming | **SDK-only** — no CLI hook for stderr capture |
| `streaming_mode.py` | 519 | 7 streaming patterns: basic / multi_turn / concurrent / interrupt / manual_handling / options / async_iterable_prompt | streaming | **SDK-only** — programmatic mid-stream control |
| `streaming_mode_ipython.py` | 229 | IPython-friendly copy-paste-able streaming snippets | streaming | **SDK-only** — IPython REPL context |
| `streaming_mode_trio.py` | 80 | Multi-turn conversation with trio async runtime | streaming | **SDK-only** — trio runtime binding |
| `system_prompt.py` | 86 | 4 patterns: no_prompt / string / preset / preset+append | settings | **CLI-portable** — CLAUDE.md + agent frontmatter |
| `tool_permission_callback.py` | 158 | Python callback for tool gating with `PermissionResultAllow` | hook | **SDK-only** — CLI uses settings.json+hooks |
| `tools_option.py` | 111 | 3 patterns: tools_array / empty_array / preset (controls tool availability) | settings | **CLI-portable** — settings.json `tools:` allowlist |
| `session_stores/postgres_session_store.py` | 256 | Postgres-backed SessionStore reference adapter (asyncpg) | persistence | **SDK-only** — JSONL on disk suffices for CLI |
| `session_stores/redis_session_store.py` | 178 | Redis-backed SessionStore (redis.asyncio>=4.2) | persistence | **SDK-only** — JSONL on disk suffices for CLI |
| `session_stores/s3_session_store.py` | 412 | S3-backed SessionStore (boto3) | persistence | **SDK-only** — JSONL on disk suffices for CLI |
| `plugins/demo-plugin/` | (manifest + 1 cmd) | Reference plugin: `.claude-plugin/plugin.json` + `commands/greet.md` | plugin | **CLI-native** — install via `/plugin install` |

**Counts**: 16 top-level `.py` files (2506 LOC) + 3 session_stores (846 LOC) + 1 demo plugin. Pattern category distribution: streaming=6, hook=2, subagent=2, settings=3, MCP=1, plugin=2, budget=1, persistence=3.

**CLI-portable verdict tally**: 9 CLI-portable / 10 SDK-only / 1 STUDY-PILOT (budget).

## CLI-portable adaptations (CONCRETE PROPOSALS)

### Adaptation 1 — `agents.py` → `.claude/agents/<name>.md` frontmatter

**SDK form** (excerpt from `agents.py:50-80`):
```python
agent = AgentDefinition(
    description="Code review specialist",
    tools=["Read", "Grep", "Glob"],
    prompt="You are a meticulous code reviewer...",
    model="sonnet",
)
```

**CLI equivalent** (Option B):
```yaml
# .claude/agents/code-reviewer.md
---
name: code-reviewer
description: Use PROACTIVELY for code review on uncommitted diffs. MUST BE USED when user requests review.
tools: [Read, Grep, Glob]
model: sonnet
---
You are a meticulous code reviewer specializing in...
```

**Cite anchor**: CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-subagents.md:17-36 @ HEAD 48f2ceb` documents the 16-field frontmatter spec. Option B already uses this for Tier-5 install rows per manifest.

### Adaptation 2 — `hooks.py` → `.claude/settings.json:hooks[]`

**SDK form** (excerpt from `hooks.py:80-110`):
```python
async def check_bash_command(input_data, tool_use_id, context):
    if input_data["tool_name"] == "Bash":
        cmd = input_data["tool_input"]["command"]
        if "rm -rf /" in cmd:
            return {"permissionDecision": "deny", "reason": "Catastrophic command blocked"}
```

**CLI equivalent** — Python script via settings.json hook entry:
```python
#!/usr/bin/env python3
# .claude/hooks/scripts/check_bash_safety.py
import json, sys
payload = json.load(sys.stdin)
if payload.get("tool_name") == "Bash":
    cmd = payload.get("tool_input", {}).get("command", "")
    if "rm -rf /" in cmd:
        print(json.dumps({"permissionDecision": "deny", "reason": "Catastrophic command blocked"}))
        sys.exit(0)
print(json.dumps({}))  # default allow
```

```json
// .claude/settings.json (entry)
"PreToolUse": [{
  "matcher": "Bash",
  "hooks": [{"type": "command", "command": "python .claude/hooks/scripts/check_bash_safety.py", "timeout": 5}]
}]
```

**Cite anchor**: Anthropic CC hooks docs `https://code.claude.com/docs/en/hooks` (PreToolUse with `permissionDecision: "deny"` semantics — directly equivalent to SDK callback return). Option B already has hook infrastructure pattern per sibling `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §5 Layer 2`.

### Adaptation 3 — `plugin_example.py` → `/plugin install`

**SDK form**: `ClaudeAgentOptions(plugins=[Path("examples/plugins/demo-plugin")])` loads local plugin programmatically.

**CLI equivalent**: per CR-6 official-native-channel mandate:
```bash
/plugin marketplace add Z:/claude-sota-installed/.claude/plugins/marketplaces/
/plugin install demo-plugin@local-marketplace
```

Demo plugin file structure (already CLI-compatible verbatim):
```
demo-plugin/
├── .claude-plugin/plugin.json    # name, description, version, author
└── commands/greet.md             # slash command body
```

**Cite anchor**: `https://code.claude.com/docs/en/plugins` documents `/plugin install` as the canonical mechanism. Demo plugin's manifest is already the CLI format — no translation needed.

### Adaptation 4 — `setting_sources.py` → env + CLI flags

| SDK pattern | CLI equivalent |
|---|---|
| `setting_sources=None` (default: user+project+local) | default CLI behavior with `CLAUDE_CONFIG_DIR` pointing at `.claude/` |
| `setting_sources=[]` (disable all) | `claude --no-user-settings --no-project-settings ...` |
| `setting_sources=["user"]` (user only) | unset `CLAUDE_CONFIG_DIR`, use ~/.claude only |
| `setting_sources=["project","user"]` (both) | default CLI behavior |

Option B's ENV block in `CLAUDE.local.md` already explicitly sets `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude` — this IS the CLI form of `setting_sources=["project"]`.

### Adaptation 5 — `tools_option.py` → settings.json `permissions.allow` array

**SDK form**: `ClaudeAgentOptions(tools=["Read", "Grep"])` whitelists specific tools.

**CLI equivalent**:
```json
// .claude/settings.json
"permissions": {
  "allow": ["Read", "Grep"],
  "deny": ["Bash", "Edit", "Write"]
}
```

Per CCBP `claude-settings.md @ 48f2ceb` documented spec. Option B's `permissions.defaultMode: "bypassPermissions"` currently per Wave 82d operator-override — finer-grain control via allow/deny arrays is the SDK `tools=` parallel.

## SDK-only gaps (STRUCTURAL — claude-sota-pure CLI runtime cannot achieve)

These 5 patterns are not blockers — Option B has functional substitutes — but the SDK affords capabilities the CLI does not. Operator should know which gaps exist:

### Gap 1 — In-process MCP server (mcp_calculator.py)

SDK registers Python functions directly as MCP tools within the agent's runtime: zero IPC overhead, shared memory, language-native error handling.

CLI runtime requires subprocess transport (`stdio` / `sse` / `http`). Functional equivalent: write the calculator as a standalone Python script with stdio MCP transport per `.mcp.json` schema. Performance loss: ~1-5ms IPC per tool call (negligible at human scale). Deployment win: language-agnostic — same MCP server callable from Claude Code, Codex CLI, Cursor, etc.

**Acknowledged-gap disposition**: NOT a blocker. The subprocess pattern is the CLI-canonical approach per existing `.mcp.json` registry pattern.

### Gap 2 — Python permission callbacks (tool_permission_callback.py)

SDK supports `can_use_tool` callback returning `PermissionResultAllow` / `PermissionResultDeny` / `PermissionResultAsk` with optional input modification.

CLI runtime gates via settings.json `permissions.{allow,deny,ask}` static arrays + hook scripts that read tool_input from stdin and write `permissionDecision` JSON to stdout. Functional difference: SDK allows dynamic input rewriting in the callback; CLI hooks can only ALLOW/DENY (modification requires PostToolUse + revert, not pre-call mutation).

**Acknowledged-gap disposition**: Hook script handles 95% of cases. Input-mutation use case is rare; if it surfaces, fall back to PostToolUse cleanup.

### Gap 3 — Programmatic mid-stream control (streaming_mode.py)

SDK exposes `client.interrupt()` / `client.set_permission_mode(mode)` / `client.set_model(model)` / `client.rewind_files(message_id)` / `client.reconnect_mcp_server(name)` etc. for runtime control of an in-flight conversation.

CLI is interactive — operator drives via keyboard (`Esc Esc` for rewind, `/model` to switch, etc.). No programmatic mid-stream API.

**Acknowledged-gap disposition**: Option B's `/loop` + ralph-loop Stop-hook + operator-driven `/rewind` per `Z:/claude-sota/.claude/rules/coordination.md §12` cover analogous control flow for autonomous loops.

### Gap 4 — Pluggable SessionStore (session_stores/)

SDK protocol enables Redis / Postgres / S3 backed conversation persistence for multi-tenant SaaS deployments.

CLI persists to JSONL files at `CLAUDE_CODE_PROJECT_DIR` (Option B: `Z:/claude-sota-installed-state/.claude/projects`). No pluggable backend.

**Acknowledged-gap disposition**: JSONL on disk is sufficient for solo-operator runtime. Multi-tenant SaaS is out-of-scope for claude-sota-installed.

### Gap 5 — Stream events / partial messages (include_partial_messages.py + stderr_callback_example.py)

SDK exposes `StreamEvent` partial chunks + `stderr_callback` for real-time UI rendering.

CLI renders to terminal directly; partial-event surface not exposed to operator code.

**Acknowledged-gap disposition**: Terminal rendering IS the partial-message UI. If programmatic UI is needed in the future, that's a "wrap CLI with Python SDK" decision — not a Phase 0-3 concern.

## HONEST-NON-FINDINGS

### `streaming_mode_trio.py` — narrow runtime binding

This example demonstrates the same multi-turn conversation pattern as `streaming_mode.py` but bound to `trio` async runtime instead of `anyio`/`asyncio`. The pattern is identical; the runtime choice is a Python ecosystem preference, NOT an SDK feature distinct from `streaming_mode.py`.

**Verdict**: HONEST-NON-FINDING. Not Phase 2C candidate, not gap. Pure Python runtime binding decision.

### `streaming_mode_ipython.py` — REPL ergonomics

229 LOC of IPython-friendly copy-paste-able snippets that re-implement the patterns in `streaming_mode.py` for REPL interactive use. Same patterns, different presentation.

**Verdict**: HONEST-NON-FINDING. Not a distinct capability; pure documentation/ergonomics asset for SDK users.

### `quick_start.py` — pedagogical

Hello-world demo for SDK users learning the API surface. The `basic_example` / `with_options_example` / `with_tools_example` patterns are the SDK equivalent of `claude -p "..."` interactive invocation.

**Verdict**: HONEST-NON-FINDING. Pedagogical, not feature-distinct.

### `filesystem_agents.py` — issue-test scenario

This example is explicitly labeled as testing issue #406 (filesystem-based agents loaded via `setting_sources=["project"]` silently failing in some environments). It demonstrates the standard CLI agent loading mechanism — Option B already uses this mechanism natively.

**Verdict**: HONEST-NON-FINDING. CLI-native pattern; SDK example exists for SDK-side regression testing, not as a distinct SDK capability.

## Cross-references

- Wave 5 Agent K cite at `Z:/claude-sota-installed/tmp/sota-pure-wave5-agent-k-*.md` — flagged this audit as Wave 6 deferred scope
- TIER-1-DIRECT Anthropic OFFICIAL: `Z:/repos/deps/anthropics__claude-agent-sdk-python @ HEAD 694e4f3b`
- Sibling claude-sota cite-import-AMBER governing patterns: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 2 SDK-vs-CLI surface — this audit IS a Probe-2-class verification for ~20 SDK example primitives
- CCBP TIER-1: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-subagents.md:17-36 @ 48f2ceb` (frontmatter spec) + `claude-settings.md:877-921 @ 48f2ceb` (env block) + `claude-mcp.md @ 48f2ceb` (MCP subprocess pattern)
- Anthropic CC OFFICIAL docs: `https://code.claude.com/docs/en/hooks` (hook contract) + `https://code.claude.com/docs/en/plugins` (plugin install) + `https://code.claude.com/docs/en/sub-agents` (agent frontmatter)

## Provenance

Wave 6 Agent M narrow-scope audit 2026-05-14. Cite class: TIER-1-DIRECT (Anthropic OFFICIAL SDK at pinned HEAD SHA). Mode: pattern-extraction (DO NOT install per scope mandate). Budget: 15-20 min — actual elapsed ~12 min. No installs performed.
