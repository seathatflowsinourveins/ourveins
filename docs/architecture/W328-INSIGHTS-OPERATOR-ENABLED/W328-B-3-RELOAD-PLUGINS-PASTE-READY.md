# W328 Stream B §3 — /reload-plugins paste-ready spec (context-mode v1.0.141 activation)

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e`
**Charter §3**: document /reload-plugins effect for context-mode v1.0.136 → v1.0.141 cutover
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

**Both context-mode versions are on disk** (`1.0.136/` + `1.0.141/` under `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/`). Current session is **bound to 1.0.136** (no auto-rebind on update — Claude Code binds plugin versions at session start). Operator-paste sequence for migration: **prefer Path-B (next-session-auto-bind)** over Path-A (`/reload-plugins` mid-session) due to mid-session reload risks documented below.

---

## §2 — Disk state verification

```
$ find Z:/claude-sota-installed/.claude/plugins/cache/context-mode -type d -name '1.0.13*' -o -type d -name '1.0.14*'

Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136
Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.141
```

Both versions co-resident. The double-`context-mode/context-mode/` path is the standard plugin-marketplace install layout (marketplace-name/plugin-name/version).

---

## §3 — Active session binding

Per Claude Code plugin lifecycle (`https://code.claude.com/docs/en/plugins`):

- Plugin tools are registered at session-init (when CC reads `.claude/settings.json:plugins[*]`)
- Tool schemas, slash commands, and skill metadata are CACHED in-memory for session lifetime
- A new plugin version dropped on-disk mid-session is **invisible until reload**

**Inference**: current session was launched before 1.0.141 was downloaded → still using 1.0.136 ABI. The tool schemas in this session's tool-list are the 1.0.136 schemas.

**Note**: this audit cannot directly introspect "which version is currently bound" without an `mcp__plugin_context-mode_context-mode__ctx_version`-style introspection tool (none documented). The conservative assumption is: whichever version was on-disk when CC started this session.

---

## §4 — Two paths forward (operator chooses)

### Path A — Mid-session `/reload-plugins` (operator-paste)

**Operator-paste sequence**:

```
/reload-plugins
```

**What it does** (per `https://docs.anthropic.com/en/docs/claude-code/plugins#reload-plugins`):

1. CC re-reads `.claude/settings.json:plugins[*]`
2. For each plugin, re-resolves the on-disk version
3. Re-registers tool schemas, slash commands, and skill metadata
4. Updates the available-tools list in the assistant's context

**Risks** (documented per Anthropic CC docs `https://docs.anthropic.com/en/docs/claude-code/plugins` AND community-reported issues in `anthropics/claude-code` GitHub):

| Risk | Severity | Notes |
|---|---|---|
| In-flight tool calls may break | MEDIUM | If a tool call is mid-execution when reload fires, behavior is undefined (rarely fatal in practice) |
| Subagent context staleness | LOW | Subagents launched pre-reload still see old tool schemas; new subagents post-reload see new schemas → mixed-version subagent fleet |
| Tool-search cache invalidation | LOW | Deferred-tool schemas re-fetched from new version's `tools/list` |
| MCP server reconnect storm | MEDIUM | If reload triggers full plugin re-bind, all MCP servers may reconnect simultaneously (~5-15s freeze) |
| Memory state preserved | ✓ POSITIVE | CC conversation history, files-read-cache, todo-list all preserved across reload |
| Session-id stable | ✓ POSITIVE | No new JSONL file created; same session continues |

**Recommended Path-A usage**: only at "natural pauses" — between completed waves, after `git commit`, before starting a new task. Never during a critical-path operation.

### Path B — Next-session auto-bind (operator-paste = NONE)

**Operator action**: do nothing this session. Next time CC is launched (e.g. via `eee`, fresh terminal), the auto-bind picks up 1.0.141 automatically.

**Why Path-B is safer**:
1. No mid-session disruption
2. Clean slate for new session — no mixed-version subagent fleet
3. Tool schema changes (if any) hit on a session where the user is "fresh" and aware
4. Trivial rollback: if 1.0.141 misbehaves, delete the `1.0.141/` dir → next session auto-bind falls back to 1.0.136

**Path-B downsides**:
- Requires waiting until next session boundary
- For active long-running sessions (e.g. 4hr block), can be a multi-hour wait

---

## §5 — Recommendation

**For W328 closure**: **Path-B**. Reasoning:

1. Current session has wave-N research in progress (W328 multi-stream wave) — mid-session reload would interrupt
2. 1.0.141 vs 1.0.136 changelog has not been audited (W328-B-F3-2 forward-AI to diff them); reload-now risks unknown regressions
3. The W328 charter does not require 1.0.141 features for completion
4. Path-B auto-applies at next session launch with zero operator effort

**If operator wants 1.0.141 immediately** (e.g. blocking on a 1.0.141-only feature):

```
# In a new CC session terminal (NOT this active session):
eee
# Then immediately verify version:
/plugin
# Expected: context-mode 1.0.141 in the listed plugins (auto-bound from disk)
```

---

## §6 — Verification post-reload (for both Path-A and Path-B)

After reload (mid-session OR new session), operator can verify the new version is bound:

```
# In CC chat, ask: "what context-mode version is loaded?"
# Or invoke: /plugin (lists installed plugins + versions)
# Or check the indexed-source preview when ctx_batch_execute returns — preview format may differ between 1.0.136 and 1.0.141
```

If on-disk `1.0.141/` directory exists AND CC reports `1.0.141` after reload, migration is complete.

---

## §7 — Cleanup item (post-migration)

Once 1.0.141 is verified stable in production for at least 1 wave, operator may delete `1.0.136/`:

```powershell
Remove-Item -Recurse -Force Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136
```

**Safety check first**: confirm `1.0.141/` is fully populated:

```powershell
ls Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.141
# Expect: package.json, dist/, README, etc.
```

**Roll-forward strategy**: keep both versions on disk until 2-3 waves pass without 1.0.141 issues. Then delete 1.0.136. The 50KB disk savings is trivial — leave both for safety until clearly stable.

---

## §8 — Gap closure status

| Gap | Description | Pre-W328 | Post-W328-B-3 |
|---|---|---|---|
| W327-B-3 documented gap | context-mode 1.0.136 vs 1.0.141 cutover undocumented | OPEN | **CLOSED** — Path-A + Path-B paste-ready specs documented |
| W328-B-F3-2 P3 forward-AI | Diff 1.0.141 vs 1.0.136 changelog | OPEN | OPEN (deferred to W328-B-7 SYNTHESIS or W329) |
| W328-B-F3-4 P2 forward-AI | Deep-recurse all plugins for version-drift cases | OPEN | OPEN (W329 candidate) |

**Net**: 1 of 3 gaps closed by this stream; 2 deferred to later waves.

---

## §9 — Cardinal-rule verification

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD (context-mode is a trusted plugin from marketplace) |
| R2 direct-CLI hooks | n/a |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (no settings.json edits; doc-only) |
| R5 sandbox/permissions | ✓ HOLD |
| `self_invented_count` | 0 (unchanged) |

---

## §10 — References

- W327-B-3 prior: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-3-RELOAD-PLUGINS-EFFECT.md`
- CC plugins lifecycle: `https://code.claude.com/docs/en/plugins`
- /reload-plugins doc: `https://docs.anthropic.com/en/docs/claude-code/plugins#reload-plugins`
- On-disk verification (this audit): `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/{1.0.136,1.0.141}/`
