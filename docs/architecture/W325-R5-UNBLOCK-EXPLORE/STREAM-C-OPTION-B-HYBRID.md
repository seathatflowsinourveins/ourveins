# Option B — HYBRID (sandbox.enabled=true + per-permission-allowlist preserved)

**Risk-class**: **MED** · **Cardinal rule R5**: ◐ MOSTLY HOLDS (incremental adoption) · **Workflow disruption**: MEDIUM

---

## 1. Intent

Incremental-adoption posture: turn the OS-sandbox layer ON (`sandbox.enabled: true`) but **preserve `defaultMode: "bypassPermissions"`** so the permissions-prompt friction is avoided. The sandbox provides the OS-level boundary; `bypassPermissions` keeps the in-CC operator-velocity high; the layered-defense controls 2-5 (audit + redaction + egress + drift) complement.

This is a **defense-in-depth-with-velocity** trade-off: the sandbox isolates bash subprocesses at the OS level (where it can actually run — Linux/macOS/WSL2), while CC's permission-prompts stay off because the OS-level sandbox is the harder line. On Windows native (this runtime), this degrades to Option C semantics until WSL2 migration.

## 2. Paste-ready settings.json patch

**Pre-edit Read** required: `Read("Z:/claude-sota-installed/.claude/settings.json")` first.

### Patch B1 — permissions block (replace L57-93) — KEEP bypassPermissions, expand deny

```json
"permissions": {
  "allow": [
    "Edit(Z:/claude-sota-installed/.claude/settings.json)",
    "Edit(Z:/claude-sota-installed/CLAUDE.md)",
    "Edit(Z:/claude-sota-installed/docs/sota-installed-manifest.md)",
    "Edit(Z:/claude-sota-installed/docs/install-provenance.md)",
    "Bash(npm install -g *)",
    "Bash(uv tool install *)",
    "Bash(uvx *)",
    "Bash(gh release download *)",
    "Bash(git clone --depth 1 https://github.com/* *)",
    "Bash(docker pull *)",
    "Bash(cargo install *)",
    "Bash(codex *)"
  ],
  "deny": [
    "Read(./.env)",
    "Read(./.env.*)",
    "Read(./secrets/**)",
    "Read(**/id_rsa)",
    "Read(**/id_ed25519)",
    "Read(**/*.pem)",
    "Read(**/*.pfx)",
    "Read(**/*.key)",
    "Read(./CLAUDE.local.md)",
    "Read(./tools/eee.local.ps1)",
    "Read(**/.aws/credentials)",
    "Read(**/.ssh/config)",
    "Read(**/.ssh/known_hosts)",
    "Read(**/.netrc)",
    "Read(**/.npmrc)",
    "Read(**/.docker/config.json)",
    "Read(**/credentials.json)",
    "Read(**/*.crt)",
    "Bash(curl http://*)",
    "Bash(wget http://*)",
    "Bash(rm -rf /)",
    "Bash(sudo *)",
    "Bash(chmod 777 *)",
    "WebFetch(domain:bit.ly)",
    "WebFetch(domain:tinyurl.com)",
    "WebFetch(domain:t.co)"
  ],
  "defaultMode": "bypassPermissions"
}
```

**Key change vs current**: `permissions.deny` expanded with **8 new entries** that supply the "deny-by-default network/secret reads" half of sca-v9 §6 Control 1 even under `bypassPermissions` — because per CCBP `claude-settings.md:262`, **`permissions.deny` is still enforced under bypassPermissions** ("Catastrophic removal commands still prompt as a safety net" + explicit deny rules always respected). This is the **load-bearing fact** for Option B's claim that it has meaningful security improvement.

### Patch B2 — sandbox block (replace L414-420) — turn sandbox ON

```json
"sandbox": {
  "enabled": true,
  "failIfUnavailable": false,
  "autoAllowBashIfSandboxed": true,
  "excludedCommands": [
    "git",
    "docker",
    "npx",
    "uvx",
    "cmd.exe",
    "powershell.exe",
    "pwsh.exe"
  ],
  "allowUnsandboxedCommands": true,
  "filesystem": {
    "allowWrite": [
      "./",
      "Z:/claude-sota-installed-state/",
      "Z:/venvs/claude/",
      "/tmp/"
    ],
    "denyWrite": [
      "~/.aws/credentials",
      "~/.ssh/",
      "~/.config/codex/",
      "~/.config/anthropic/"
    ],
    "denyRead": [
      "~/.aws/credentials",
      "~/.ssh/id_rsa",
      "~/.ssh/id_ed25519",
      "~/.netrc"
    ]
  },
  "network": {
    "allowedDomains": [
      "github.com",
      "raw.githubusercontent.com",
      "api.github.com",
      "*.anthropic.com",
      "*.npmjs.org",
      "registry.npmjs.org",
      "pypi.org",
      "files.pythonhosted.org",
      "huggingface.co",
      "*.huggingface.co",
      "127.0.0.1"
    ],
    "deniedDomains": [
      "uploads.github.com"
    ],
    "allowLocalBinding": true
  }
}
```

**Differences from Option A patch A2**:
- `allowUnsandboxedCommands: true` (preserved as escape-hatch — operator can still bypass sandbox per-command when needed; this is the "hybrid" trade-off)
- Otherwise identical sandbox shape

## 3. Smoke-test sequence

```powershell
# (a) CC restart — verify it starts (with warning on Windows native)
claude --version
claude doctor

# (b) sandbox status report
/sandbox       # operator runs interactively — expect "Sandboxing requires WSL2" on Windows native

# (c) bypassPermissions preserved — Bash should NOT prompt for non-allowlisted commands
# Inside CC, attempt: Bash("ipconfig")  → expect silent-execute (bypassPermissions)
# Inside CC, attempt: Bash("git status") → expect silent-execute (also allowlisted)

# (d) deny-rule probe — denies STILL active under bypassPermissions
# Inside CC, attempt: Read("./CLAUDE.local.md") → expect "blocked by permissions.deny"
# Inside CC, attempt: Bash("curl http://example.com") → expect "blocked by permissions.deny"
# Inside CC, attempt: Bash("sudo whoami") → expect "blocked by permissions.deny"

# (e) sandbox.filesystem probe (on WSL2/Linux/macOS only)
# Inside sandboxed bash, attempt: touch /etc/test → expect blocked
# Inside sandboxed bash, attempt: cat ~/.ssh/id_rsa → expect blocked (denyRead)

# (f) network proxy probe (on WSL2/Linux/macOS only)
# Inside sandboxed bash, attempt: curl https://example.com → expect blocked

# (g) escape-hatch probe — dangerouslyDisableSandbox still works
# Run codex CLI command (in excludedCommands) → expect runs outside sandbox
```

**Expected on Windows native** (today): (b)+(e)+(f)+(g) sandbox is no-op; (c) bypassPermissions preserves velocity; (d) deny rules work the same.

**Expected on WSL2 migration**: (e)+(f) sandbox actively blocks; (c) still no prompts; (g) escape-hatch still works.

## 4. Rollback

```powershell
# Single-commit revert if applied via a commit:
git -C Z:/claude-sota-installed log -1 --format=%H -- .claude/settings.json
git -C Z:/claude-sota-installed revert <commit-sha>

# Manual restore (paste-ready):
# permissions.deny: drop the 8 new entries (Bash(curl http://*), Bash(wget http://*), Bash(rm -rf /), Bash(sudo *), Bash(chmod 777 *), WebFetch(domain:bit.ly), WebFetch(domain:tinyurl.com), WebFetch(domain:t.co))
# sandbox.enabled: true → false
```

**Rollback time**: <2 min · **Data-loss risk**: NONE

## 5. Risk-class breakdown

| Risk | Level | Mitigation |
|------|-------|-----------|
| **R5 partial-hold** | MED | R5 only partially holds: cardinal rule says "permissions + sandboxing"; under bypassPermissions, in-CC tool calls still have no permission boundary. Sandbox at OS level closes the bash-subprocess boundary but not the WebFetch/Edit/Read boundary. |
| **Windows-native no-op** | HIGH (initially) | Same as Option A: OS-sandbox is structurally inert on Windows native. Sandbox config is paper-only until WSL2 migration. |
| **Workflow disruption** | LOW-MED | Most current workflows survive untouched (bypassPermissions preserved). The 8 new deny entries may block edge-case workflows (HTTP curl, sudo); operator must replace with HTTPS or codex. |
| **Configuration complexity** | MED | Two systems active (permissions + sandbox); operator must mentally model which boundary fires when. Per anthropic-sandbox-doc, permissions evaluate BEFORE sandbox. |
| **MCP friction** | LOW | MCP tools route through permissions (still bypassed); sandbox only affects bash subprocesses. |
| **Hook side-effects** | LOW | Hooks unaffected by `sandbox.enabled: true` flip (hooks run in CC's process, not inside sandbox). |
| **codex cross-model gate** | LOW | codex CLI is in `excludedCommands` — runs outside sandbox. |
| **Drift from Anthropic-canonical** | LOW-MED | Anthropic doc treats `defaultMode: bypassPermissions` + `sandbox.enabled: true` as a valid configuration combination (no warning in upstream docs); but `bypassPermissions` is repeatedly flagged as DANGEROUS in CCBP `claude-settings.md:262`. |

## 6. Why this is "hybrid" not "full"

| sca-v9 §6 Control | Option A status | Option B status |
|---|---|---|
| **1. Deny-default permissions** | ✓ FULL (`defaultMode: "default"`) | ◐ PARTIAL (`bypassPermissions` preserved; only `permissions.deny` enforces, not `allow`-only) |
| **2. Audit logging** | NOT DELIVERED by patch (orthogonal) | NOT DELIVERED by patch (orthogonal) |
| **3. Secret redaction** | gitleaks PreToolUse already wired (orthogonal) | gitleaks PreToolUse already wired (orthogonal) |
| **4. Egress policy** | ✓ FULL (sandbox.network.allowedDomains + permissions.deny WebFetch) | ◐ PARTIAL (sandbox.network on Linux only; permissions.deny on WebFetch covers the rest) |
| **5. Drift detection** | NOT DELIVERED by patch (orthogonal) | NOT DELIVERED by patch (orthogonal) |

Controls 2 + 5 require additional wiring beyond the settings.json patch (PreToolUse hook for audit logging; pre-commit hook for drift detection). These are independent of Options A/B/C.

## 7. Cite-anchors

- **Anthropic CC sandbox doc**: `https://code.claude.com/docs/en/sandboxing` ("How sandboxing relates to permissions" — they are complementary layers)
- **Anthropic CC settings doc**: `https://code.claude.com/docs/en/settings` (sandbox-settings + permissions blocks)
- **CCBP**: `claude-settings.md:262` (bypassPermissions still blocks `permissions.deny` rules + protected paths + catastrophic-removal prompts — load-bearing for B's claim that explicit denies still work)
- **CCBP**: `claude-settings.md:249` (skipDangerousModePermissionPrompt ignored in project settings)
- **NIST 800-53 AC-3(3) + OWASP A01-2021 + Microsoft Zero-Trust** (sca-v9 §6 Control 1 anchors — partially applied here)
- **CNCF NetworkPolicy** (sca-v9 §6 Control 4 — egress-policy anchor)

## 8. Operator-decision criteria (when to choose Option B)

Choose Option B if:
- Runtime can migrate to WSL2/Linux/macOS in 2-5 waves (not immediately, but planned)
- Operator wants incremental security improvement without permission-prompt friction
- Comfortable with the partial-hold of R5 + sca-v9 §6 Control 1 as "in-progress"
- Wants the option to fully tighten (drop bypassPermissions later) once Bash workflows are characterized

Decline Option B if:
- WSL2 migration is firmly off the roadmap (Windows native is the long-term posture) → choose Option C
- Operator wants R5 to fully hold per the CLAUDE.md cardinal-rule text → choose Option A
- The configuration complexity (two security layers with different behaviors) is unwanted

## 9. Estimated effort

- **Apply**: ~10 min (Edit settings.json + restart CC + smoke-test)
- **Operator-onboarding**: ~1 wave to characterize which workflows hit the 8 new deny rules
- **WSL2 migration prereq**: optional W326-W330 path (not required to apply Option B)
