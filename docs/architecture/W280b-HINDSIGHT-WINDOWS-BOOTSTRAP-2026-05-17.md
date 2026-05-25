# W280b — Hindsight MCP Windows Bootstrap (2026-05-17)

## Problem

`claude mcp list` shows:

```
plugin:hindsight-memory:hindsight: bash .../scripts/run_mcp.sh - ✗ Failed to connect
```

even though the hindsight plugin is installed and the daemon at `127.0.0.1:9077` is healthy.

## Root cause

Three-layer issue (the third is the critical blocker — without it the first two
are necessary but insufficient):

### Layer 0 — `enableKnowledgeTools` defaults to false → MCP server exits immediately

`cache/hindsight/hindsight-memory/0.6.5/scripts/mcp_server.py:35-37`:

```python
if not _config.get("enableKnowledgeTools"):
    _dbg("Knowledge tools disabled (enableKnowledgeTools=false), MCP server exiting")
    sys.exit(0)
```

`enableKnowledgeTools` is not in `DEFAULTS` (`lib/config.py`) and not in
`ENV_OVERRIDES` (no `HINDSIGHT_*` env var maps to it). The only way to enable
is via user config at `~/.hindsight/claude-code.json` (openclaw convention,
`lib/config.py:load_config` step 2 — stable across plugin updates) or via
plugin's own `${CLAUDE_PLUGIN_ROOT}/settings.json` (step 1, version-specific,
clobbered by `/plugin update`). User config is the right place.

### Layer 1 — Plugin's `run_mcp.sh` assumes POSIX venv layout

Upstream `cache/hindsight/hindsight-memory/0.6.5/scripts/run_mcp.sh`:

```bash
VENV="${CLAUDE_PLUGIN_DATA}/venv"
if [ ! -x "${VENV}/bin/python" ] || ! diff -q "${REQ_SRC}" "${REQ_CACHED}"; then
  python -m venv "${VENV}"
  "${VENV}/bin/pip" install -r "${REQ_SRC}"
fi
exec "${VENV}/bin/python" "${CLAUDE_PLUGIN_ROOT}/scripts/mcp_server.py"
```

On Windows, `python -m venv` creates `Scripts/python.exe` (not `bin/python`).
The `[ ! -x bin/python ]` check is permanently true → bootstrap path triggers every
spawn → `bin/pip install` fails (file doesn't exist) → MCP server never starts.

### Layer 2 — Daemon URL defaults to `uvx hindsight-embed@latest`

`lib/daemon.py:_get_embed_command` falls back to `uvx hindsight-embed@latest` when
`hindsightApiUrl` config is unset. uvx cold-start fetch (~30s) blows past CC's MCP
stdio-init timeout (~5s) → `✗ Failed to connect`.

## Fix

### Z. Enable knowledge tools (THE critical fix)

Create `~/.hindsight/claude-code.json` (= `Z:/claude-sota-installed/.hindsight/claude-code.json`
when HOME is set):

```json
{
  "enableKnowledgeTools": true
}
```

`.hindsight/` is gitignored (`.gitignore:206`) — runtime user config, never committed.

### A. (DEFERRED) Tell the plugin where the daemon already is

> **W280-fix1 NOTE**: An earlier draft of this section recommended setting
> `HINDSIGHT_API_URL=http://127.0.0.1:9077` in `.claude/settings.json` env.
> The codex adversarial-review HIGH-severity finding correctly noted that
> this forces plugin Mode-1 (external API) which returns the URL without
> health-checking — a dead :9077 would leave MCP silently broken on fresh
> checkouts/reboots/new-machine clones. The env var was REVERTED.
>
> Current behavior (no `HINDSIGHT_API_URL` set):
> - Mode-2 fires: plugin health-checks port 9077; if up, uses it (fast)
> - Mode-3 fallback: spawns `uvx hindsight-embed@latest` (slow ~30s cold)
>
> For predictable behavior, ensure the daemon stays up (e.g. start once
> with `uvx hindsight-embed@latest daemon start --port 9077` and let it
> persist; or wrap in an NSSM service for boot-survival).
>
> A future hardening: SessionStart hook that direct-CLI-invokes
> `powershell -c "if (-not health-check) { uvx hindsight-embed daemon start }"`
> — direct-CLI = cardinal-rule-2-compliant. Deferred to a follow-on commit.

### B. Bootstrap the venv `bin/` shims (one-time per data dir)

Even with `HINDSIGHT_API_URL` set, the plugin's `mcp_server.py` import path still
requires the venv to satisfy `[ -x bin/python ]` so `run_mcp.sh` proceeds to the
final `exec` line. Create POSIX shim wrappers in each plugin DATA dir:

```bash
DATA_DIR=Z:/claude-sota-installed/.claude/plugins/data/hindsight-memory-hindsight
# (Also bootstrap the alt path .../data/hindsight if CC ever resolves there)

mkdir -p "${DATA_DIR}/venv/bin"

cat > "${DATA_DIR}/venv/bin/python" <<'EOF'
#!/usr/bin/env bash
exec "$(dirname "$0")/../Scripts/python.exe" "$@"
EOF

cat > "${DATA_DIR}/venv/bin/pip" <<'EOF'
#!/usr/bin/env bash
exec "$(dirname "$0")/../Scripts/pip.exe" "$@"
EOF

chmod +x "${DATA_DIR}/venv/bin/python" "${DATA_DIR}/venv/bin/pip"

# Install the plugin's MCP dependency
"${DATA_DIR}/venv/Scripts/pip.exe" install --quiet "mcp>=1.0.0"

# Cache requirements.txt so the diff check passes on subsequent run_mcp.sh runs
cp Z:/claude-sota-installed/.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/requirements.txt \
   "${DATA_DIR}/requirements.txt"
```

Both shim wrappers and `requirements.txt` cache are in plugin DATA dir,
which is gitignored (`.gitignore:67 venv/`). They survive plugin updates but
not fresh `git clone` (re-run this bootstrap once after clone).

## Cardinal-rule compliance

Shims are POSIX shell wrappers inside `.claude/plugins/data/`, **not** registered
as Claude Code hooks. They are runtime data, identical in spirit to
`.claude/hooks/context-mode-cache-heal.mjs` (a CC-bug-#46915 workaround) — both
exist as documented compatibility fixes for upstream bugs that cannot be fixed
without modifying plugin cache code (which `/plugin update` would clobber).

Cardinal-rule-2 (`Hooks may only be upstream plugin hooks OR direct upstream-CLI
invocations declared in .claude/settings.json`) is preserved: no new hook is
registered, no `.claude/hooks/scripts/*.py` is created.

## Verification

```bash
claude mcp list | grep hindsight
# Expected: plugin:hindsight-memory:hindsight: ... - ✓ Connected
```

## Upstream report (recommended)

File an issue at https://github.com/vectorize-io/hindsight-memory with title
"Windows: run_mcp.sh bin/python check fails (Scripts/ layout) + missing
HINDSIGHT_API_URL fallback". Reference this doc.
