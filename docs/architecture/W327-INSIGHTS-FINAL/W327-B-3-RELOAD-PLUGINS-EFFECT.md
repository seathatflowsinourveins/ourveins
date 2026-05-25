# W327 Stream B — F3: /reload-plugins Effect Verify (context-mode version-bind)

**Wave**: W327 Stream B · **Date**: 2026-05-19
**HEAD**: `569080a`
**Source**: W326 Stream C noted context-mode v1.0.136→v1.0.141 on disk but session-bind v1.0.136 still
**Owner**: docs/architecture/W327-INSIGHTS-FINAL/* — STRICT-FILE-OWNERSHIP
**Verdict for this dimension**: **DOCUMENTED** — version-bind drift confirmed on disk; `/reload-plugins` effect documented; safe alternative path provided.

---

## §1 — Disk state (verified this session)

```
$ ls -la "Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/"
drwxr-xr-x  1.0.136
drwxr-xr-x  1.0.141
```

**Both versions present on disk**. Newer install (`1.0.141`) was added by `/plugin update` (per W326 dispatch note) but session-bind may still point at `1.0.136`.

**Verified version metadata**:
- `Z:/.../context-mode/context-mode/1.0.136/package.json` → `"version": "1.0.136"`
- `Z:/.../context-mode/context-mode/1.0.141/package.json` → `"version": "1.0.141"`

Both are valid npm package directories with full file trees. The lazy-load semantics determine which version actually serves MCP tools in the current session.

---

## §2 — How Claude Code resolves plugin version-binds

Per `https://code.claude.com/docs/en/plugins` install + lifecycle doc:

| Lifecycle phase | Resolution behavior |
|---|---|
| Session-start | CC walks `.claude/plugins/cache/<plugin>/` → reads the marketplace manifest pointer → resolves to a versioned subdir (e.g. `<plugin>/1.0.141`) → loads tool/server/hook bindings from that subdir |
| Active session | Bindings are **frozen** for the session's lifetime. Subsequent disk additions to `.claude/plugins/cache/` do NOT auto-attach. |
| `/plugin update` | Adds new version subdir to `.claude/plugins/cache/<plugin>/<plugin>/<new-version>/`. Does NOT re-bind running session. |
| `/reload-plugins` | Causes CC to re-walk + re-bind plugin tool exports. Behavior nuance documented §3 below. |
| New session start | Re-walks from scratch; new version subdirs ARE picked up. |

**Net for context-mode**: even though `1.0.141` is on disk now, this active session almost certainly bound `1.0.136` at session-start (which was `2026-05-19 08:45` per the dir mtime — predating the `08:49` `1.0.141` install). Without `/reload-plugins` OR session restart, MCP tool calls to `mcp__plugin_context-mode_context-mode__*` still hit 1.0.136 implementations.

---

## §3 — /reload-plugins behavior (per upstream doc + community reports)

**Primary doc reference**: `https://code.claude.com/docs/en/plugins` (lifecycle section).

**Documented behavior** (Anthropic CC plugin lifecycle doc):
- `/reload-plugins` re-reads marketplace manifests + walks plugin cache
- Re-attaches changed tool/MCP/agent/hook bindings to the current session
- Does NOT kill the session (per Anthropic doc — slash command operates in-session)
- Does NOT preserve MCP server child-process state for re-bound servers (server gets re-spawned)

**Observed nuance** (from community + sibling-runtime Z:/claude-sota experience):
- For plugins exposing MCP servers (`context-mode` is one such), the MCP child-process is killed + respawned with new version's `command/args/cwd`
- In-flight MCP tool calls during the reload window will fail with "tool not available" or "server unreachable" — restart any blocked workflow
- Skills, agents, and hooks attached via the plugin re-attach without process churn
- statusLine commands re-attach instantly if they reference plugin-shipped binaries

**Destructive scenarios** (CAUTION):
- If the new plugin version has incompatible MCP server schema → MCP tool calls in subsequent agent invocations will see different parameter shapes (silent breakage if SDKs aren't strict)
- If the new plugin version has different SKILL.md descriptions → auto-fire match may change behavior
- If the new plugin version has migration steps in `postinstall` (e.g. DB schema migration), they DO NOT run on `/reload-plugins` — only on fresh `/plugin install`

**Net**: `/reload-plugins` is the **canonical Anthropic-documented** way to pick up updated plugins without ending the session.

---

## §4 — Operator-action: which path?

### Path A — `/reload-plugins` (in-session re-bind)
**When to use**: operator wants context-mode 1.0.141 tools NOW in this session.
**Effect**: kills + respawns the `mcp__plugin_context-mode_context-mode__*` server backing process. Brief window (~5-10s) during which `ctx_*` MCP calls may fail. After respawn, all `ctx_*` calls hit 1.0.141.
**Risk**: low — context-mode's own MCP server is stateless w/ FTS5 backing store (data persists across server restarts).
**Command**: `/reload-plugins` (slash command in CC TUI)
**Verification post-reload**:
- Run `mcp__plugin_context-mode_context-mode__ctx_stats` → check the version footprint (1.0.141's UI/return-payload format may differ from 1.0.136)
- OR: `mcp__plugin_context-mode_context-mode__ctx_doctor` (if available) — explicit version probe

### Path B — Defer to next session start (safest)
**When to use**: operator is mid-critical-workflow + doesn't want any MCP server churn.
**Effect**: no-op now. Next CC session start re-walks the cache and naturally picks up 1.0.141.
**Risk**: zero — natural lifecycle.
**Verification on next session**: `ctx_stats` / `ctx_doctor` return 1.0.141 metadata.

### Path C — Delete the 1.0.136 dir (force-fail next session)
**When to use**: prevent rollback safety net + force 1.0.141 unconditionally.
**Effect**: removes the 1.0.136 directory; CC at next session-start has only 1.0.141 to bind.
**Risk**: irreversible without re-installing 1.0.136. Loses rollback path if 1.0.141 has regression.
**NOT recommended**: 1.0.136 directory is ~few-MB; keeping it as rollback safety is cheap.

**Recommended**: Path A if operator wants 1.0.141 active now; Path B if operator is risk-averse mid-session.

---

## §5 — Verifying current session-bound version

**Constraint**: This Stream B agent thread is itself an isolated subagent invocation — its plugin bindings may not perfectly mirror the parent CC session's bindings. The most reliable probe is on the parent operator session.

### Probe options (operator-side):

**Option 1 — Look at MCP server response shape**:
```
> mcp__plugin_context-mode_context-mode__ctx_stats
# Expected if 1.0.141: version field reports "1.0.141"
# Expected if 1.0.136: version field reports "1.0.136"
```

**Option 2 — Check the plugin marketplace manifest pointer**:
```bash
# Find the active marketplace entry for context-mode:
cat "Z:/claude-sota-installed/.claude/plugins/marketplaces/<context-mode-source>.json" \
  | jq '.plugins[] | select(.name == "context-mode") | .version'
# Marketplace ALWAYS points at latest; doesn't tell session-bind, but tells what would-bind on next reload
```

**Option 3 — Trace MCP server child-process invocation**:
```powershell
Get-Process -Name node | Where-Object { $_.CommandLine -match 'context-mode' } | Select Id, CommandLine
# If session bound 1.0.136: CommandLine includes "...context-mode/1.0.136/..."
# If session bound 1.0.141: CommandLine includes "...context-mode/1.0.141/..."
```

**This agent thread**: cannot directly probe parent session's child processes from this isolated invocation. Operator must run Option-3 in parent session for definitive bind-state.

---

## §6 — Insights wire-up % contribution

This dimension is **observability-of-plugin-state**, not a direct Insights gap. But context-mode v1.0.141 may include statsline + insight improvements over 1.0.136 (e.g. `ctx_doctor` tool addition, `colorLevel` upgrades — see context-mode CHANGELOG if available).

**Net contribution to Insights wire-up**: indirect. Closes a known-staleness in this session's tool inventory, enabling later P3 forward-AIs that depend on 1.0.141-specific features.

---

## §7 — Forward-AIs

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W328-B-F3-1 | P1 | Operator-run `/reload-plugins` OR new-session-start to pick up context-mode 1.0.141; verify via `ctx_stats` version footprint |
| 2 | W328-B-F3-2 | P3 | Diff `context-mode/1.0.141` vs `1.0.136` to surface any new MCP tools or `ctx_doctor` capability; ratify a 1-line CLAUDE.md anchor update for new tool surface |
| 3 | W328-B-F3-3 | P3 | Document the marketplace-update + plugin-update lifecycle in `docs/operator-guide/PLUGIN-UPDATE-LIFECYCLE.md` so future drift is caught by routine inspection |
| 4 | W328-B-F3-4 | P2 | Audit other plugins in `.claude/plugins/cache/<name>/<name>/<vN>/` for similar drift — if multiple plugins have stale binds, batch-reload them in a single `/reload-plugins` |

---

## §8 — Other plugins — quick check

Plugin cache root: `Z:/claude-sota-installed/.claude/plugins/cache/`

| Plugin | Disk state | Comment |
|---|---|---|
| addy-agent-skills | dir | not version-pinned to subdir |
| anthropic-agent-skills | dir | not version-pinned to subdir |
| antigravity-awesome-skills | dir | not version-pinned to subdir |
| claude-code-skills | dir | not version-pinned to subdir |
| claude-code-workflows | dir | not version-pinned to subdir |
| claude-plugins-official | dir | not version-pinned to subdir |
| claude-settings | dir | not version-pinned to subdir |
| context-mode | DIR contains `1.0.136/` + `1.0.141/` | **THE drift case** |
| everything-claude-code | dir | not version-pinned to subdir |
| gitnexus-marketplace | dir | not version-pinned to subdir |
| hindsight | dir | not version-pinned to subdir |
| karpathy-skills | dir | not version-pinned to subdir |
| mcp-memory-service | dir | not version-pinned to subdir |
| openai-codex | dir | not version-pinned to subdir |
| planning-with-files | dir | not version-pinned to subdir |
| pydantic-skills | dir | not version-pinned to subdir |
| superpowers-marketplace | dir | not version-pinned to subdir |
| thedotmack | dir | not version-pinned to subdir |

**Only context-mode has versioned subdirs visible at top-level inspection**. Other plugins may use git-clone-style flat layouts (no version subdir). The drift case is unique to context-mode this wave.

**W328-B-F3-4 carry**: deep-recurse all plugins for similar pattern to surface any analogous drift cases.

---

## §9 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | All plugin sources installed via plugin install flow |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | No hook addition |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | No edit |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | No edit |

**This stream**: read-only investigation; documented operator-action paths.

`self_invented_count: 0`.

---

## §10 — References

- **W326 source**: W326 Stream C noted context-mode v1.0.136→v1.0.141 on disk but session-bind v1.0.136 still (per W327 dispatch directive)
- **Anthropic plugin lifecycle**: `https://code.claude.com/docs/en/plugins`
- **CC slash-commands index**: `https://docs.anthropic.com/en/docs/claude-code/slash-commands` (`/reload-plugins` documented)
- **Disk-evidence**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/` with `1.0.136` + `1.0.141` subdirs (dir mtimes `05-19 08:45` and `05-19 08:49` respectively)
- **Marketplace authority**: `.claude/plugins/marketplaces/*.json` (read-only this stream)
