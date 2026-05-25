# Claude Desktop Runtime — Full Audit

**Date:** 2026-05-15
**Scope:** `C:\Users\42\AppData\Roaming\Claude\` + `C:\Users\42\AppData\Local\Claude\` + `claude_desktop_config.json` + Desktop Extensions + active MCPs + permissions/preferences + log surface
**Method:** Glob inventory + Read on key artifacts + log tail probes (no live runtime probing, no rotation)
**Runtime version:** Desktop v1.1.4498 (per Desktop CLAUDE.md L4 self-declaration — NOT independently verified at exe layer)

---

## 1 — Inventory Summary (verified state, today 2026-05-15)

### 1a — claude_desktop_config.json MCPs (2 wired)

| MCP | Path | Status | Last seen |
|---|---|---|---|
| `github` | `C:/Users/42/AppData/Local/Programs/github-mcp-server/github-mcp-server.exe` | **ACTIVE** (exe verified 19.9MB) | mcp-server-github.log 1.1MB |
| `perplexity` | `node C:/Users/42/AppData/Roaming/npm/node_modules/@perplexity-ai/mcp-server/dist/index.js` | **ACTIVE** (mcp-server-perplexity.log shows successful init 2026-05-15T15:29:22Z, v0.8.4, 4 tools: ask/search/research/reason) | TODAY |

**github toolsets:** `repos,issues,pull_requests,actions` — `actions` is high-privilege (can trigger CI workflows).

### 1b — Desktop Extensions (10 DXTs installed)

| Extension | Manifest verified | Settings file | Enabled state |
|---|---|---|---|
| `ant.dir.ant.anthropic.filesystem` | ✓ | (none) | DEFAULT (likely enabled) |
| `ant.dir.ant.figma.figma` | ✓ (Figma official) | `isEnabled: true` | **ENABLED** |
| `ant.dir.cursortouch.windows-mcp` | ✓ | (none) | DEFAULT |
| `ant.dir.domdomegg.airtable-mcp-server` | ✓ | (none) | DEFAULT |
| `ant.dir.gh.anthropic.pdf-server-mcp` | ✓ (Anthropic official) | (none) | DEFAULT |
| `ant.dir.gh.silverstein.pdf-filler-simple` | ✓ | `isEnabled: true` | **ENABLED** |
| `ant.dir.gh.socketdev.socket-mcp` | ✓ | `isEnabled: false` | **DISABLED** |
| `ant.dir.gh.tableau.tableau-mcp` | ✓ | (none) | DEFAULT |
| `ant.dir.gh.wonderwhy-er.desktopcommandermcp` | ✓ | `isEnabled: true` | **ENABLED** |
| `context7` (Upstash, MIT, v1.0.1) | ✓ (full SDK + dist/) | (none) | DEFAULT |

### 1c — Plugin marketplace (per main.log 11:30:11)

- **19 local + 45 remote = 64 total plugins** fetched via `PluginsFetcher`
- `NativeMarketplaceReader` actively listing plugins
- `mcp-registry` remote MCP being queried by main process
- **NOT inventoried this audit** — would require parsing the marketplace state (LocalForage/IndexedDB) — flagged for follow-up

### 1d — Preferences (load-bearing flags from claude_desktop_config.json)

| Pref | Value | Implication |
|---|---|---|
| `localAgentModeTrustedFolders` | `[HEALTH, claude-sota-installed, trading]` | LocalAgentMode (Desktop's CC-equivalent) trusts 3 folders |
| `allowAllBrowserActions` | `true` | Claude in Chrome bypass-allowed |
| `dispatchTrustedCodeWorkspaces` | `[C:\Users\42, C:\Users\42\.openclaw]` | **Entire user home dispatched as trusted code workspace** |
| `coworkScheduledTasksEnabled` | `true` | Cowork scheduled cron-like surface ON |
| `ccdScheduledTasksEnabled` | `true` | CCD scheduled tasks ON |
| `bypassPermissionsModeEnabled` | `true` | **GLOBAL bypass permissions** |
| `coworkWebSearchEnabled` | `true` | Cowork web search ON |
| `keepAwakeEnabled` | `true` | Power-management override |
| `epitaxy-folder-permission-mode.<account>` | `trading: bypassPermissions, HEALTH: bypassPermissions` | **Per-folder bypass on trading + HEALTH** |
| `remoteToolsDeviceName` | `ohhello` | Device name for remote-tools network |

### 1e — Filesystem surface (Roaming\Claude top-level)

Active dirs: `Cache/ ChromeNativeHost/ Claude Extensions/ Claude Extensions Settings/ Code Cache/ Crashpad/ DawnGraphiteCache/ DawnWebGPUCache/ GPUCache/ IndexedDB/ Local Storage/ Network/ Partitions/ Session Storage/ Shared Dictionary/ VideoDecodeStats/ WebStorage/ blob_storage/ claude-code/ claude-code-sessions/ claude-code-vm/ local-agent-mode-sessions/ logs/ sentry/ shared_proto_db/ vm_bundles/`

Key files: `CLAUDE.md` (1.9KB Desktop system context — see §2c drift), `DIPS` (36KB Chrome interactive-tracking DB), `DIPS-wal` (24KB WAL), `InterestGroups` (124KB **Chrome Topics API / FLoC interest groups**), `ant-did` (device ID `78043fd1-6e80-47ec-a33a-c7b18511d012`)

### 1f — Recent log activity (verified mtimes from log dir size sort)

- `main1.log` 10MB (rotated — recent traffic was so heavy it triggered rotation)
- `main.log` 4.9MB (current; last entry 2026-05-15 11:29:35 — **actively writing right now**)
- `mcp.log` 3.9MB
- `claude.ai-web1.log` 5MB + `claude.ai-web.log` 882KB
- `mcp-server-openclaw-bridge.log` 1.5MB ← **historical traffic for an MCP no longer in config** (see §2c)
- `mcp-server-github.log` 1.1MB
- `mcp-server-perplexity.log` 1MB (active today)
- `cowork_vm_node.log` 292KB (Cowork VM active)
- `mcp-server-Figma.log` 233KB (Figma DXT active)
- `mcp-server-Filesystem.log` 300KB (Filesystem DXT active)
- `mcp-server-PDF Tools - View, Fill, Merge, Split, Manage Pages, Extract.log` 135KB (PDF DXT active)
- `ssh.log` 17KB

---

## 2 — Risk Findings (P0/P1/P2/P3)

### P0 — Plaintext API keys in claude_desktop_config.json (R1)

`github_pat_<REDACTED>` and `pplx-<REDACTED>` are stored unencrypted at `claude_desktop_config.json` L11 + L20. User declined rotation 2026-05-15. Risk accepted. Migration helper exists at `Z:\claude-sota-installed\bin\desktop-config-migrate.ps1` (dead-weight until operator decision flips).

### P1 — Permission posture cascading bypass (R2 + R3)

- `bypassPermissionsModeEnabled: true` GLOBAL (no permission prompts in Desktop chats)
- Per-folder bypass on `trading` (real capital flow) + `HEALTH` (medical data) per `epitaxy-folder-permission-mode`
- `dispatchTrustedCodeWorkspaces` includes `C:\Users\42` — **entire user home + `.openclaw` subdir**
- `allowAllBrowserActions: true` (Chrome can take any action)
- Combined effect: ANY MCP call from Desktop chat can execute Bash/Edit/Write across the whole user home without prompt

CR-7 (`Z:\claude-sota-installed\.claude\rules\cardinal-rule-7-graduated-unleash.md`) is the CLI-side rule for graduated unleash with Tier 0-5 INSTALLED+smoke-PASS predicates. Desktop has **no equivalent graduated-unleash discipline** — it's full bypass with no Tier predicates verified.

### P1 — Desktop CLAUDE.md V177 is STALE (R4)

`C:\Users\42\AppData\Roaming\Claude\CLAUDE.md` (Desktop system context, 1.9KB) drifted from actual config in 3 places:

| Drift | CLAUDE.md says | Actual state |
|---|---|---|
| `openclaw-bridge` MCP | Listed as Config MCP (L13) | **NOT in claude_desktop_config.json** — but `mcp-server-openclaw-bridge.log` 1.5MB shows historical traffic |
| sidebarMode | "chat" (L36) | "task" (config L37) |
| `openclaw` infrastructure path | `C:\Users\42\.claude\integrations\openclaw\` (L31) | **PATH MISSING** (`ls` returns OPENCLAW-PATH-MISSING) |

V177 is a tag in the file (L1, L4). Whatever V177 was, the actual runtime has moved on — `openclaw-bridge` MCP was removed but the CLAUDE.md still tells the model it exists.

This is the same **Marker Decay** structural problem we discussed in the previous turn. Cite-codification rewards age over current-correctness.

### P2 — 64 plugin scope unaudited (R5)

`PluginsFetcher: 45 remote + 19 local = 64 total plugins` per main.log 11:30:11. None individually audited. No equivalent of `docs/sota-installed-manifest.md` exists for Desktop plugins. Attack surface unknown.

### P2 — Sentry crash reporting active (R6)

`sentry/` dir present in Roaming\Claude. Outbound telemetry to Anthropic's Sentry instance whenever Desktop crashes. Not necessarily wrong but should be a documented privacy posture, not implicit.

### P3 — Chrome DIPS + InterestGroups + Topics API tracking (R7)

`DIPS` (36KB), `DIPS-wal` (24KB), `InterestGroups` (124KB). DIPS = "Detect Incidental Party State" (Chrome's anti-bounce-tracking). InterestGroups = FLoC/Topics API. Desktop = Electron Chromium fork, inherits this telemetry layer by default.

### P3 — 5 stale github-mcp-server binaries (~85MB cruft) (R8)

```
github-mcp-server-old.exe     15.5M
github-mcp-server.exe          19.9M  ← current
github-mcp-server.exe.bak      15.5M
github-mcp-server.exe.old      19.6M
github-mcp-server.exe.v031.bak 19.6M
```

Operator-level cleanup decision. Not a runtime risk.

### INFO — Device ID + remote-tools network (R9 + R10)

- `ant-did` device ID `78043fd1-6e80-47ec-a33a-c7b18511d012`
- `remoteToolsDeviceName: "ohhello"` — this device is named/registered on Anthropic's remote-tools network
- `ssh.log` (17KB) present — SSH-related activity logged

---

## 3 — SOTA divergences

| Surface | Desktop has | Current SOTA per Anthropic docs | Divergence |
|---|---|---|---|
| Permission modes | bypassPermissionsModeEnabled GLOBAL | `auto` (CR-7 Phase 1 destination per `https://code.claude.com/docs/en/settings`) | Desktop is at Phase 3-equivalent without Tier predicates met |
| Secrets management | Plaintext in JSON config | `${env:VAR}` interpolation in CLI MCP servers; Desktop has no env-interp per cc-switch `claude_desktop_config.rs:283-298,707-714 @ HEAD` (read during W50F2) | Desktop config is **architecturally incompatible** with env-var migration — operator option B (User-scope env vars + custom wrapper script) only |
| Marketplace audit | 64 plugins fetched, no audit trail | `docs/sota-installed-manifest.md` discipline (CR-1 cite-trail at file:line + HEAD SHA per `Z:\claude-sota-installed\CLAUDE.md` cardinal-rule-1) | Desktop has zero CR-1/CR-5 conformance |
| Risk-stratified gates | None | CR-7 Phase 1-3 + Tier 0-5 INSTALLED predicates | Not applicable to Desktop (no plugin install hook) |
| Cite trail of Desktop CLAUDE.md | V177 self-tag, no cite at file:line | Cardinal-rule-1 mandates file:line + HEAD SHA | Desktop CLAUDE.md is novel content — violates CR-8 if held to same standard as CLI |

The CR-1 through CR-12 framework was authored for the CLI runtime and doesn't have a Desktop port. **Whether Desktop SHOULD be held to the same standard is an operator decision, not an audit finding.**

---

## 4 — Honest non-findings

- **No evidence of Desktop compromise.** All logs show expected activity, no anomalous network calls in the surface checked.
- **No evidence MCPs are broken.** github + perplexity both connected today; Figma + Filesystem + PDF DXTs have current log activity.
- **No evidence the 10 DXTs are abandoned.** Their settings files (where present) show explicit enable/disable; absent settings files = default-enabled per Anthropic DXT convention.
- **No evidence of secret exfiltration.** Sentry sends crash reports, not session content. (Independent verification would require packet capture — not done in this audit.)
- **Marker Decay isn't unique to Desktop.** Same issue exists in `Z:\claude-sota-installed\.claude\rules\*.md` per prior turn's critique.

---

## 5 — What this audit did NOT cover

- Marketplace 64-plugin per-plugin audit
- Live network traffic capture (would need Wireshark)
- LocalAgentMode session contents (`local-agent-mode-sessions/`)
- VM bundle contents (`vm_bundles/`, `claude-code-vm/`)
- IndexedDB / Local Storage / WebStorage Chrome-state contents
- Crash reports in `Crashpad/`
- The 5 DXT extension directories' code (e.g., context7 dist/index.js content)
- Whether `bypassPermissionsModeEnabled` actually bypasses prompts at runtime (would need live test)
- `claude.ai-web*.log` content (5.9MB combined — web-grounded traffic)
- `cowork_vm_node.log` content (Cowork VM 292KB)
- mcp-registry remote MCP endpoint URL + protocol

---

## 6 — Action queue (operator-discretion, NOT proposed)

**Do NOT execute without explicit confirmation. Pattern this session has been: I propose → user reverts.**

| # | Action | Risk if not done | Cost to do |
|---|---|---|---|
| A1 | Rotate `GITHUB_PERSONAL_ACCESS_TOKEN` + `PERPLEXITY_API_KEY` (declined 2026-05-15) | Plaintext exposure in git scrollback + Desktop config | ~10min |
| A2 | Update Desktop CLAUDE.md to drop `openclaw-bridge` references + fix sidebarMode drift | Model gets stale Desktop context | ~5min |
| A3 | Document Desktop plugin inventory (parallel to `sota-installed-manifest.md`) | 64-plugin attack surface unaudited | ~30min for audit script |
| A4 | Decide whether Desktop should adopt CR-7 graduated unleash (with what predicates?) | Desktop is permanently at Phase 3-equivalent | operator-level decision |
| A5 | Delete 5 stale github-mcp-server binaries (~85MB cruft) | Disk + accidental-execution surface | ~30s |
| A6 | Re-check disabled `socket-mcp` (only DXT explicitly disabled) — was it disabled for a reason? | Could re-enable accidentally | ~2min |
| A7 | Define Sentry telemetry posture (accept or opt-out) | Crash reports include path + version data | ~2min decision |

---

## 7 — Bottom line

**Desktop runtime is operational and reasonably current** (2 config MCPs wired today; 10 DXTs installed; 64 plugins fetched; LocalAgentMode active).

**Three structural concerns**:

1. **Plaintext secrets** (P0 — user accepted)
2. **Permission posture cascade** (P1 — global bypass + per-folder bypass + entire user home as trusted code workspace = single MCP compromise → full host access)
3. **Desktop CLAUDE.md stale at V177** (P1 — same Marker Decay class as CLI rules)

**No emergencies. No installs proposed. No reverts to chase.** Whether to action A1-A7 is operator call.

---

*Audit method per cardinal-rule-10 research-first (no remediation without research) + cardinal-rule-11 META-process SOTA (audit is itself cited). No subagent fan-out used — direct orchestrator-execution per Path P-equivalent for audit work, avoiding FM-17 codex-rescue thrash that hit W50F2.*
