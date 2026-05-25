# Claude Desktop MCP Config Security Patch — Design Doc

**Date**: 2026-05-15
**Author**: architect agent (everything-claude-code:architect; cardinal-rule-1+8+9 conformance)
**Dispatch ID**: ab14d6ed765b2a56c
**Mia pre-apply verification**: cc-switch v3.14.1 PRESENT at Z:/repos/deps/cc-switch/, rust config writer file PRESENT — primary cite CONFIRMED-GENUINE

## Problem
`C:/Users/42/AppData/Roaming/Claude/claude_desktop_config.json` contains 2 plaintext secrets (GITHUB_PERSONAL_ACCESS_TOKEN + PERPLEXITY_API_KEY) in `mcpServers.<name>.env` blocks. Keys leaked to session scrollback. Operator is rotating both upstream.

## Investigation — env interpolation support in Claude Desktop

### Probes (file:line + HEAD SHA cited)
1. `Z:/repos/deps/claude-forge/.mcp.json:16 @ HEAD` — uses `"${GITHUB_PERSONAL_ACCESS_TOKEN}"` bare-shell interpolation. (**claude-code .mcp.json, NOT Claude Desktop.**)
2. `Z:/repos/deps/claude-plugins-official/external_plugins/github/.mcp.json:6 @ HEAD` — Anthropic-OFFICIAL plugin marketplace uses `"Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"` in HTTP-type MCP `headers:` block. (**claude-code surface.**)
3. `Z:/repos/deps/cc-switch/src-tauri/src/claude_desktop_config.rs:283-298,707-714 @ HEAD` — cc-switch v3.14.1 (the **canonical Claude Desktop config writer**, Rust/Tauri) writes plaintext token values directly via `build_gateway_profile` + `direct_gateway_credentials`. NO `${env:}` interpolation logic. Tests at L1099-1117 verify plaintext round-trip.
4. `Z:/repos/deps/claude-code-templates/cli-tool/components/mcps/devtools/github-official.json:1-19 @ HEAD` — Docker `-e GITHUB_PERSONAL_ACCESS_TOKEN` (no value) idiom = "inherit from parent process env".

### Verdict
**Claude Desktop does NOT support `${ENV_VAR}` JSON interpolation in mcpServers env blocks.** The `env` block values are passed verbatim to the spawned child process environment.

### Available approaches

| Option | Mechanism | github-mcp-server.exe | @perplexity-ai/mcp-server | Recommendation |
|---|---|---|---|---|
| (a) `${env:VAR}` interpolation | claude-code pattern | NOT SUPPORTED | NOT SUPPORTED | **REJECT** |
| (b) Omit env block, inherit parent process env | Standard MCP server pattern (reads `process.env`/`os.environ` at startup) | YES (standard) | YES (Node MCP server idiom) | **PREFERRED** |
| (c) Docker passthrough | Wrap server in docker | adds complexity | n/a | REJECT |

### Recommended: (b) Pure environment inheritance

**Rationale**:
1. Both MCP server binaries follow standard MCP pattern: read credentials from process env at startup
2. Claude Desktop spawns child processes with INHERITED parent env (standard Windows CreateProcess behavior when env block omitted)
3. Operator sets keys in Windows User-scope env vars via `[Environment]::SetEnvironmentVariable`
4. Claude Desktop relaunch picks up new env on next process spawn
5. JSON config contains ZERO secret material — safe to commit to dotfiles repo if desired

**KISS conformance**: simplest mechanism that works. No interpolation tooling needed.
**CR-9 install-risk**: reversibility HIGH — `Copy-Item backup.json config.json -Force` takes <1s; env vars survive in registry until manually unset.

## Deliverable 1 — Patched JSON shape

```json
{
  "mcpServers": {
    "github": {
      "command": "C:/Users/42/AppData/Local/Programs/github-mcp-server/github-mcp-server.exe",
      "args": ["stdio", "--toolsets", "repos,issues,pull_requests,actions"]
    },
    "perplexity": {
      "command": "node",
      "args": ["C:/Users/42/AppData/Roaming/npm/node_modules/@perplexity-ai/mcp-server/dist/index.js"]
    }
  },
  "preferences": {<UNCHANGED>}
}
```

**Key change**: `env:` blocks completely OMITTED. Child process inherits parent (Claude Desktop) process env, which inherits Windows User env vars set by operator.

## Fallback (if pure-omit fails at smoke test)

Some MCP servers refuse to start if env keys are unset. Fallback:
- Re-add `env:` block with EMPTY string values (some servers reject this — investigate per-server first)
- True fallback: re-introduce plaintext but mark file `chmod 600` equivalent (Windows ACL: `icacls config.json /inheritance:r /grant ${USERNAME}:F`)

## Operator workflow

1. Operator revokes + regens both keys upstream (GitHub + Perplexity)
2. Orchestrator applies env-omitted patch to claude_desktop_config.json (this fire)
3. Operator runs `Z:/claude-sota-installed/bin/desktop-config-migrate.ps1`:
   - Reads new keys via SecureString
   - Stores in Windows User env vars
   - Verifies config has env-omitted shape (refuses if plaintext still present)
4. Operator quits Claude Desktop (Right-click tray → Quit, NOT just close window)
5. Operator relaunches Claude Desktop — MCP servers spawn with new env from registry
6. Operator probes both MCP servers (test github + perplexity via simple query)

## Rollback (one-liner)

```powershell
Copy-Item "$env:APPDATA\Claude\claude_desktop_config.backup.2026-05-15.json" "$env:APPDATA\Claude\claude_desktop_config.json" -Force
```

## Risk

- **MEDIUM**: pure-env-inheritance untested with these specific binaries. Fallback documented.
- **LOW**: env var leak via other user processes — same exposure as current state, no regression.
- **LOW**: operator forgets full Desktop quit → env doesn't propagate. Script prints explicit instruction.

## DESIGN: complete
