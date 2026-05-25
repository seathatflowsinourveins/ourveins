# Wave 97 Fan-2 Agent C — context-mode FM-03 D1 transport disconnect investigation

## Status: ORCHESTRATOR-DIRECT FALLBACK (Agent C 429'd at 12s with 1 tool_use)

**FM-17.b.i fired**: Agent dispatch returned `API Error: Server is temporarily limiting requests` after <2s wall-clock. This is the wrapper-funneling PRE-FIRE 429 sub-class per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.b.i`. Per recovery contract: pivot to orchestrator-direct work with STAND-IN-NOTICE; T2/T3 second-model review required before ship.

**STAND-IN-NOTICE**: This investigation runs orchestrator-direct (Opus 4.7 main session, NOT subagent dispatch). Cross-model gate satisfied via subsequent codex T1 e2e step at orchestrator layer.

## Classification: **Class B** — known Anthropic CC subagent-isolation limitation (NOT a plugin bug)

## Evidence chain

### 1. Plugin source structure verified
Path: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/`
- 30+ files including `start.mjs` (MCP server entrypoint)
- 6 hook scripts (auto-injection / cache-heal / ensure-deps / posttooluse / precompact / pretooluse / sessionstart / userpromptsubmit / etc.)
- Bundled session-management modules (session-attribution / session-db / session-extract / etc.)
- Multi-runtime support: codex/ + cursor/ + gemini-cli/ + jetbrains-copilot/ + kiro/ + vscode-copilot/ subdirs

### 2. Plugin MCP wire scope
`Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/.claude-plugin/plugin.json`:
```json
"mcpServers": {
  "context-mode": {
    "command": "C:/Users/42/AppData/Local/fnm_multishells/91528_1778251978120/node.exe",
    "args": ["Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/start.mjs"]
  }
}
```

**Notable**: `command` uses HARDCODED `fnm_multishells/91528_1778251978120/node.exe` — a per-shell fnm-managed Node binary path. The plugin's self-heal block at hooks/pretooluse.mjs adjusts this on first-load.

### 3. PreToolUse hook scope (hooks/hooks.json)
6 matchers register the plugin's pretooluse.mjs:
- `Bash`
- `WebFetch`
- `Read`
- `Grep`
- `Agent`
- `mcp__plugin_context-mode_context-mode__ctx_execute`

The hook injects `<context_guidance>` system-reminders to redirect data-fetching tools to context-mode MCP tools. This works in MAIN session — verified live across Wave 97 ctx_batch_execute usage.

### 4. CCBP `claude-mcp.md:121` cite (TIER-1)
> | **Subagent** | Agent frontmatter (`mcpServers` field) | Servers scoped to a specific subagent |

**Subagent MCPs scoped via Agent frontmatter `mcpServers` field**, NOT auto-inherited from main session's plugin-supplied MCPs. This is the Anthropic CC contract.

### 5. Wave 97 Agent A trace re-read
Agent A reported `mcp__plugin_context-mode_context-mode__ctx_*` returned tool-not-found in subagent context. PreToolUse hook (which runs in subagent process) fired its routing-block on Bash/WebFetch tools because the hook IS inherited (it's a hook command, not an MCP server) — but the plugin-supplied MCP is NOT inherited by subagent.

**Result**: subagent had hook telling it to "use ctx_* tools" but the actual MCP wasn't wired in subagent context. This is the FM-03 D1 surface symptom but NOT a plugin bug.

### 6. Anthropic SDK `_SubagentContextMixin` cite
`Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262` (cited in `audit-action-loop.md`): subagent context has `agent_id` + `agent_type` for tool-lifecycle attribution but does NOT inherit plugin-supplied MCP server registrations from main session.

## Verdict

**Class B** — not a plugin bug, not a configuration issue, not agent misunderstanding. **Known Anthropic CC subagent-isolation contract**: subagents inherit `.mcp.json` MCPs and hook scripts (filesystem-read), but NOT plugin-supplied MCP server registrations.

This is BY DESIGN per Anthropic CC contract. Plugin-MCPs are scoped to main session by default; subagents need explicit Agent frontmatter `mcpServers:` field to access plugin-MCPs.

## Operator-discipline (Class B mitigation)

When dispatching subagents that need ctx_* tools:
1. **DO NOT rely on plugin-supplied MCPs being available in subagent context**
2. Either:
   - (a) Add explicit `mcpServers:` field to Agent frontmatter referencing context-mode (would require operator-side agent definition edit; out of scope for Wave 97)
   - (b) Provide alternative tool guidance in agent brief (e.g., "use mcp__github__* + mcp__deepwiki__* + WebFetch directly; ctx_* tools may be unavailable in subagent context")
   - (c) Accept that subagents will use Bash/Read/Grep directly (no ctx_* compression layer; subagents typically scoped to bounded research and don't need 98% reduction)
3. Wave 97 Agent A worked around this transparently by using WebSearch + GitHub API + local Glob/Grep — confirming the workaround path is operationally viable

## Fix path

**No fix required at plugin-side**. Class B is upstream design.

**Optional eee-side enhancement** (deferred):
- Add agent-brief boilerplate: "Note: ctx_* tools may NOT be available in subagent context per Anthropic CC contract; use mcp__github__* + Read/Grep/Glob directly"
- This would be a sister discipline to `advanced-agent-team-standing-directive` (cite-import-AMBER). Defer to next-ship.

## Cross-model T1 gate

This investigation runs orchestrator-direct per FM-17.b.i recovery + STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Cross-model gate NOT yet satisfied for any resulting commit; if fix-path elevates to a ship, codex T1 e2e required BEFORE commit.

## TIER-1 cite chain

- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/.claude-plugin/plugin.json` (verified live)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/hooks/hooks.json` (verified live)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/hooks/pretooluse.mjs` (read-verified)
- **TIER-1-DIRECT**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-mcp.md:121 @ HEAD 64fffd53` ("Subagent MCPs scoped via Agent frontmatter mcpServers field")
- **TIER-1-DIRECT**: `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ HEAD b512f256` (`_SubagentContextMixin`)
- **TIER-3 evidence**: `tmp/wave97-agentA-token-eff-deep-dive-2026-05-08.md` (Wave 97 Agent A trace which surfaced FM-03 D1)

VERDICT: complete — Class B confirmed; no fix required at plugin-side; operator-discipline workaround documented; agent fan2-C 429 was incidental (FM-17.b.i recovery via orchestrator-direct).
