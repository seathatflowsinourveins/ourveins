# `claude doctor` hang — local workaround pattern (W325 Stream-D D-H1)

**Status**: ACTIVE local workaround. Use this pattern until the upstream issue filed via `docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md` resolves on `anthropics/claude-code`.

**Last-verified**: 2026-05-19 (W325 ship).

**Context**: `claude doctor` reproducibly hangs ~30s and exits 124 silent on the Z:-portable + state-redirected runtime (7+ wave convergent). Until the upstream fix lands, run the individual checks `doctor` is presumed to perform, by hand. This doc enumerates each check, the manual equivalent command, and pass criteria.

---

## Pattern: run individual checks, not the monolithic doctor

`claude doctor` is conceptually a wrapper around N independent diagnostic checks. When the wrapper hangs, the checks themselves are still individually runnable from the shell. The W325 Stream-D investigation identified 6 manually-runnable layers that together cover the observable surface area.

Run all 6 in order; if any fails or warns, fix that layer before continuing.

---

## Layer 1 — Settings file JSON validity

**What `doctor` presumably checks**: `.claude/settings.json` parses as valid JSON; required keys present; values within bounds.

**Manual equivalent (PowerShell)**:

```powershell
# Parse + roundtrip — fails loud if invalid JSON
$settings = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\settings.json" | ConvertFrom-Json
$settings | ConvertTo-Json -Depth 50 | Out-Null
Write-Host "settings.json: VALID"
$settings.PSObject.Properties.Name | Sort-Object
```

**Manual equivalent (bash)**:

```bash
jq . "$CLAUDE_CONFIG_DIR/settings.json" > /dev/null && echo "settings.json: VALID"
jq -r 'keys[]' "$CLAUDE_CONFIG_DIR/settings.json" | sort
```

**Pass criteria**:
- Exit-0 from `ConvertFrom-Json` / `jq .`.
- Top-level keys include at least: `permissions`, `hooks`, `env` (depending on configured features).

**Common failures**:
- Trailing comma after last key → `ConvertFrom-Json: Invalid JSON primitive`.
- Hook command with unescaped backslash → `Bad escape sequence`.

**Fix**: open `settings.json` in any JSON-aware editor; the editor will surface the parse error inline.

**Cite**: https://docs.anthropic.com/en/docs/claude-code/settings

---

## Layer 2 — Installed plugins manifest

**What `doctor` presumably checks**: `.claude/plugins/installed_plugins.json` exists, parses, and each entry resolves to a present cache dir.

**Manual equivalent (PowerShell)**:

```powershell
$ip = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\plugins\installed_plugins.json" | ConvertFrom-Json
$declared = $ip.PSObject.Properties.Name.Count
$cacheDirs = (Get-ChildItem "$env:CLAUDE_CONFIG_DIR\plugins\cache" -Directory -ErrorAction SilentlyContinue).Count
Write-Host "Plugins declared: $declared"
Write-Host "Cache dirs present: $cacheDirs"
# Drift signal
if ($declared -ne $cacheDirs) { Write-Warning "DRIFT: declared $declared but $cacheDirs cache dirs present" }
```

**Manual equivalent (bash)**:

```bash
jq 'length' "$CLAUDE_CONFIG_DIR/plugins/installed_plugins.json"
ls -1 "$CLAUDE_CONFIG_DIR/plugins/cache" 2>/dev/null | wc -l
```

**Pass criteria**:
- `installed_plugins.json` parses.
- Declared count ≈ cache-dir count (small drift OK; large drift indicates `claude-code#46915` cache-purge issue).

**Fix on drift**: `/plugin install <name>@<marketplace>` for missing; or `/plugin remove` for orphaned cache dirs.

**Cite**: https://code.claude.com/docs/en/plugins

---

## Layer 3 — Known marketplaces manifest

**What `doctor` presumably checks**: `.claude/plugins/known_marketplaces.json` exists, parses, marketplace SHAs not too stale.

**Manual equivalent (PowerShell)**:

```powershell
$km = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\plugins\known_marketplaces.json" | ConvertFrom-Json
$km.PSObject.Properties | ForEach-Object {
    $name = $_.Name
    $sha = $_.Value.sha
    $last = $_.Value.lastUpdated
    Write-Host "$name @ $sha (last: $last)"
}
```

**Manual equivalent (bash)**:

```bash
jq -r 'to_entries[] | "\(.key) @ \(.value.sha) (last: \(.value.lastUpdated))"' \
    "$CLAUDE_CONFIG_DIR/plugins/known_marketplaces.json"
```

**Pass criteria**:
- All entries parse.
- `lastUpdated` timestamps within ~30d for active marketplaces (older = `/plugin update <marketplace>` candidate).

**Fix**: `/plugin update <marketplace-name>` per stale entry.

**Cite**: https://code.claude.com/docs/en/plugins

---

## Layer 4 — `.mcp.json` validity + server reachability

**What `doctor` presumably checks**: `.mcp.json` parses; declared MCP servers either spawn successfully (stdio) or respond to HTTP probe (http).

**Manual equivalent (PowerShell)**:

```powershell
# Parse
$mcp = Get-Content -Raw "$env:USERPROFILE\.mcp.json" | ConvertFrom-Json
$servers = $mcp.mcpServers.PSObject.Properties.Name
Write-Host "MCP servers declared: $($servers.Count)"
$servers | ForEach-Object { Write-Host "  - $_" }

# Reachability — HTTP servers only (stdio not testable without spawning)
$httpServers = $mcp.mcpServers.PSObject.Properties | Where-Object { $_.Value.url }
foreach ($s in $httpServers) {
    try {
        $resp = Invoke-WebRequest -Uri $s.Value.url -Method POST -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' -ContentType application/json -TimeoutSec 3 -ErrorAction Stop
        Write-Host "  $($s.Name) -> HTTP $($resp.StatusCode)"
    } catch {
        Write-Warning "  $($s.Name) -> UNREACHABLE: $($_.Exception.Message)"
    }
}
```

**Manual equivalent (bash)**:

```bash
jq '.mcpServers | keys' "$USERPROFILE/.mcp.json"
# stdio probe — best-effort
for srv in $(jq -r '.mcpServers | to_entries[] | select(.value.command) | .key' "$USERPROFILE/.mcp.json"); do
    echo "stdio: $srv (cannot HTTP-probe; check stdio MCP smoke separately)"
done
```

**Pass criteria**:
- `.mcp.json` parses.
- Each declared HTTP server (e.g. Cognee :8000, Langfuse :3000) returns HTTP 2xx or 4xx (4xx is fine — means server is listening, just rejecting the probe payload).

**Fix**:
- Parse error → JSON validity fix (see Layer 1 pattern).
- Unreachable HTTP server → restart corresponding service (e.g. `Restart-Service CogneeMCP` for Cognee NSSM-managed services).

**Cite**: https://code.claude.com/docs/en/mcp

---

## Layer 5 — CC version drift vs upstream

**What `doctor` presumably checks**: locally-installed CC version is not too far behind GitHub HEAD.

**Manual equivalent (PowerShell or bash)**:

```bash
# Local version
claude --version
# Upstream HEAD commit
gh api /repos/anthropics/claude-code/commits/HEAD --jq '.sha + " " + .commit.author.date'
# npm latest version
npm view @anthropic-ai/claude-code version
```

**Pass criteria**:
- `claude --version` returns < 7 days behind `npm view @anthropic-ai/claude-code version`.
- If lagging: `npm install -g @anthropic-ai/claude-code@latest`.

**Cite**: https://docs.anthropic.com/en/docs/claude-code/installation#updating

---

## Layer 6 — Permission + hook surface sanity

**What `doctor` presumably checks**: `permissions.defaultMode` is set; hook commands are direct-CLI (not user-authored shell scripts, per cardinal rule R2).

**Manual equivalent (PowerShell)**:

```powershell
$settings = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\settings.json" | ConvertFrom-Json
Write-Host "defaultMode: $($settings.permissions.defaultMode)"
Write-Host "sandbox.enabled: $($settings.sandbox.enabled)"
Write-Host "Hook event types: $($settings.hooks.PSObject.Properties.Name -join ', ')"
```

**Pass criteria**:
- `permissions.defaultMode` set explicitly (default vs. `bypassPermissions` is a R5 governance call — see CLAUDE.md cardinal-rule status).
- Hook commands all start with `npx` / `cmd` / `bash` / `pwsh` (direct-CLI invocations), not arbitrary script paths.

**Cite**: https://docs.anthropic.com/en/docs/claude-code/settings + https://docs.anthropic.com/en/docs/claude-code/hooks

---

## All-in-one PowerShell wrapper (paste-ready)

```powershell
function Invoke-ClaudeDoctorManual {
    Write-Host "=== Layer 1: settings.json validity ==="
    $null = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\settings.json" | ConvertFrom-Json
    Write-Host "  settings.json: VALID"

    Write-Host "=== Layer 2: installed_plugins.json + cache ==="
    $ip = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\plugins\installed_plugins.json" | ConvertFrom-Json
    $cacheDirs = (Get-ChildItem "$env:CLAUDE_CONFIG_DIR\plugins\cache" -Directory).Count
    Write-Host "  Declared: $($ip.PSObject.Properties.Name.Count) / Cache: $cacheDirs"

    Write-Host "=== Layer 3: known_marketplaces.json ==="
    $km = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\plugins\known_marketplaces.json" | ConvertFrom-Json
    Write-Host "  Marketplaces: $($km.PSObject.Properties.Name.Count)"

    Write-Host "=== Layer 4: .mcp.json ==="
    $mcp = Get-Content -Raw "$env:USERPROFILE\.mcp.json" | ConvertFrom-Json
    Write-Host "  MCP servers: $($mcp.mcpServers.PSObject.Properties.Name.Count)"

    Write-Host "=== Layer 5: CC version drift ==="
    $local = (claude --version)
    Write-Host "  Local: $local"
    $latest = (npm view @anthropic-ai/claude-code version 2>&1)
    Write-Host "  npm latest: $latest"

    Write-Host "=== Layer 6: permissions + hook sanity ==="
    $settings = Get-Content -Raw "$env:CLAUDE_CONFIG_DIR\settings.json" | ConvertFrom-Json
    Write-Host "  defaultMode: $($settings.permissions.defaultMode)"
    Write-Host "  hook events: $($settings.hooks.PSObject.Properties.Name -join ', ')"

    Write-Host "=== ALL LAYERS COMPLETE ==="
}

Invoke-ClaudeDoctorManual
```

**Wall-clock**: ~3-5 seconds total (vs. `claude doctor` 30s hang + EXIT=124).

---

## When to re-test `claude doctor` itself

After each `claude` upgrade (`npm install -g @anthropic-ai/claude-code@latest`), re-run a bare `claude doctor` once with a 60s timeout wrapper to detect when the upstream fix lands:

```powershell
$proc = Start-Process -FilePath claude -ArgumentList 'doctor' -PassThru -NoNewWindow
if (-not $proc.WaitForExit(60000)) {
    $proc.Kill()
    Write-Host "STILL BROKEN — killed after 60s"
} else {
    Write-Host "FIXED? ExitCode=$($proc.ExitCode)"
}
```

If `ExitCode=0` with diagnostic output: the upstream issue resolved — close the GitHub issue and retire this workaround.

---

## References

- CLI reference: https://code.claude.com/docs/en/cli-reference
- Troubleshooting: https://docs.anthropic.com/en/docs/claude-code/troubleshooting
- Upstream issue draft: `docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md`
- Related: `anthropics/claude-code#46915` (plugin auto-update cache deletion)
- W325 Stream-D source notes: `docs/architecture/W325-WAVE/` (this wave)
