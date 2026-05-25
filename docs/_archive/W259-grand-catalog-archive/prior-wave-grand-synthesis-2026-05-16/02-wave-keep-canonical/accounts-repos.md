# accounts/ — SOTA repo paths (in-place install references)

Per CR-5 install-priority + CR-6 fresh-from-github + CR-8 full-SOTA-content invariant: SOTA repos for accounts/credentials/quota tracking are installed at canonical locations (NOT symlinked into accounts/ to avoid double-management). This doc maps logical names → install paths.

## Installed SOTA primitives

| Primitive | Install location | Install method | Version | Status |
|---|---|---|---|---|
| **CLIProxyAPI** | `Z:/claude-sota-installed/.local/downloads/cliproxyapi-v7.0.2/` (zip) + runtime binary `Z:/claude-sota-installed/.local/cliproxyapi/CLIProxyAPI.exe` (verify path) | `gh release download` per CR-6 official-native-channel | v7.0.2 (latest poll: v7.0.6) | RUNTIME ACTIVE — PID 97820 port 18317 |
| **CLIProxyAPI source mirror** | `Z:/repos/deps/CLIProxyAPI/` | git clone — cite-class for file:line cites | HEAD `785b00c3127eea6aa207f1207ead8a2aa93690a3` | CITE-REFERENCE-ONLY per CR-9 |
| **cpa-usage-keeper** | `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/cpa-usage-keeper.exe` | `gh release download` per CR-6 | v1.5.3 | INSTALLED-NOT-AUTOSTARTED (long-running daemon at port 8080 when started) |
| **ccusage MCP server** | `Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js` | `npm install -g @ccusage/mcp@latest` per CR-6 | v18.0.11 | WIRED in `.mcp.json` |
| **ccusage CLI** | (npm via `npx`) | `npx @ccusage/ccusage <cmd>` | latest | ON-DEMAND (npm fetches at invoke time) |
| **ccusage source mirror** | `Z:/repos/deps/ccusage/` | git clone — cite-class | HEAD `1a4bd69b9214ff55f3745d4d864108d662e4dea0` | CITE-REFERENCE-ONLY |
| **codex CLI** | (via `codex` binary; install path per `codex@openai-codex` plugin) | `/plugin install codex@openai-codex` | v0.130.0 | INSTALLED |
| **codex source mirror** | `Z:/repos/deps/codex/` | git clone — cite-class | HEAD `1a894c18...` | CITE-REFERENCE-ONLY |
| **Aperant source mirror** | `Z:/repos/deps/Aperant/` | git clone — **CITE-CLASS ONLY per W183 F1 retirement** + CR-9 read-only research probe exemption | (read-only) | NOT install-class — code patterns referenced only |
| **Mgmt Center SPA** | served at runtime by CPA from `https://github.com/router-for-me/Cli-Proxy-API-Management-Center` | auto-fetched by CPA at startup per `internal/config/config.go:23` | (auto) | RUNTIME ACTIVE at `http://127.0.0.1:18317/management.html` |

## Why no symlinks into accounts/repos/

1. **CR-5 + CR-9 sibling-bleed defense**: symlinking SOTA installs into a top-level folder creates dual-maintenance burden (path drift on upstream update)
2. **Windows symlink discipline**: requires admin OR Developer Mode; not cross-machine portable
3. **`Z:/repos/deps/` is canonical cite location** per CLAUDE.md cite-class lattice — duplicate in `accounts/repos/` would violate kiss-dry-yagni Must-Never #4

## Operator invocation patterns

```bash
# Probe live CLIProxyAPI
curl -H "Authorization: Bearer $(cat Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt)" \
  http://127.0.0.1:18317/v0/management/auth-files | jq

# Start cpa-usage-keeper daemon (when needed)
cd Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/
./cpa-usage-keeper.exe   # reads .env adjacent; listens on port 8080

# ccusage local token tracking
npx @ccusage/ccusage daily         # daily aggregation
npx @ccusage/ccusage blocks        # 5h billing-window analysis
npx @ccusage/ccusage statusline    # shell-prompt single-line summary

# codex account status
codex login status                  # logged-in identity + key fingerprint

# Custom poll_all.py (THIS folder)
python accounts/scripts/poll_all.py --tick           # cron-mode single iteration
python accounts/scripts/poll_all.py --daemon         # long-running
python accounts/scripts/poll_all.py --probe-only     # Mia dry-run

# Weekly-reset guard (NEW W190)
python accounts/scripts/weekly_reset_guard.py --status         # display
python accounts/scripts/weekly_reset_guard.py --hint           # routing rebalance
python accounts/scripts/weekly_reset_guard.py --burst-check    # use-it-or-lose-it
```

## Cite-class for this doc

`constituents=[TIER-1-DIRECT @ each installed primitive's source @ HEAD SHA, TIER-3-LOCAL-OPERATOR-DERIVED @ install-path enumeration this fire]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.
