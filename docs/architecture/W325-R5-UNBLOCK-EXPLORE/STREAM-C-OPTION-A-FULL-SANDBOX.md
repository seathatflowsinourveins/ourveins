# Option A — FULL SANDBOX (sandbox.enabled=true + bypassPermissions=false)

**Risk-class**: **HIGH** · **Cardinal rule R5**: ✓ FULLY HOLDS · **Workflow disruption**: HIGH

---

## 1. Intent

Fully enable both layers of the Anthropic CC security model:
- **Permissions layer**: drop `defaultMode: "bypassPermissions"` → standard permission flow (`"default"`)
- **OS-sandbox layer**: flip `sandbox.enabled: false → true` + close the `allowUnsandboxedCommands` escape hatch + add `failIfUnavailable: true` to hard-gate

This is the canonical Anthropic-doc-aligned posture per `https://code.claude.com/docs/en/sandboxing` ("Effective sandboxing requires **both** filesystem and network isolation").

## 2. Paste-ready settings.json patch

**Pre-edit Read** required (Edit tool contract): `Read("Z:/claude-sota-installed/.claude/settings.json")` first.

### Patch A1 — permissions block (replace L57-93)

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
    "Bash(codex *)",
    "Bash(git *)",
    "Bash(grep *)",
    "Bash(rg *)",
    "Bash(ls *)",
    "Bash(cat *)",
    "Bash(head *)",
    "Bash(tail *)",
    "Bash(find *)",
    "Bash(wc *)",
    "Bash(jq *)",
    "Bash(curl https://api.anthropic.com/*)",
    "Bash(curl https://api.github.com/*)",
    "Bash(mkdir *)",
    "Bash(echo *)",
    "Bash(printf *)",
    "Bash(test *)",
    "Bash(diff *)",
    "WebFetch(domain:code.claude.com)",
    "WebFetch(domain:docs.anthropic.com)",
    "WebFetch(domain:github.com)",
    "WebFetch(domain:raw.githubusercontent.com)",
    "WebSearch"
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
    "Bash(rm -rf /*)",
    "Bash(curl http://*)",
    "Bash(wget http://*)",
    "Bash(sudo *)",
    "Bash(su *)",
    "Bash(chmod 777 *)",
    "Bash(eval *)",
    "Bash(:(){ :|:& };:)"
  ],
  "defaultMode": "default"
}
```

**Notes on the allow list expansion**: under `defaultMode: "default"`, every Bash tool call goes through the permission flow. To preserve current productivity, ~20 common-operator Bash predicates (git/grep/rg/ls/cat/find/mkdir/jq + a curl whitelist for api.anthropic.com + api.github.com) must be pre-allowed. This is the **largest source of operator friction** in Option A.

### Patch A2 — sandbox block (replace L414-420)

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
  "allowUnsandboxedCommands": false,
  "filesystem": {
    "allowWrite": [
      "./",
      "~/.claude/",
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

**`failIfUnavailable: false`** is the **critical Windows-native concession**: per the Anthropic sandbox doc, Windows native (this runtime's platform) is **not** in the sandbox-supported platforms (macOS Seatbelt + Linux bubblewrap + WSL2 only). With `failIfUnavailable: false`, CC shows a startup warning and falls back to unsandboxed bash — so on Windows native, **the OS-sandbox layer of Option A is effectively a no-op until the runtime migrates to WSL2** (or to a Linux/macOS dev box).

**If `failIfUnavailable: true`** is preferred for hard-gate semantics, then CC will refuse to start on Windows native — which BLOCKS the runtime entirely on this platform. Operator-decision: accept-degraded vs accept-blocked.

## 3. Smoke-test sequence (post-apply verification)

```powershell
# (a) CC restart — verify it starts without errors
claude --version
claude doctor

# (b) sandbox status report
# Per anthropic-sandbox-doc, /sandbox command opens an interactive menu — run from inside CC:
/sandbox       # operator runs interactively; expect "Sandboxing requires WSL2" on Windows native

# (c) permission-flow probe — Bash should prompt for non-allowlisted commands
# Inside CC, attempt: Bash("ipconfig")  → expect permission-prompt (NOT silent-execute)
# Inside CC, attempt: Bash("git status") → expect auto-allow (in allowlist)

# (d) deny-rule probe
# Inside CC, attempt: Read("./CLAUDE.local.md") → expect "blocked by permissions.deny"

# (e) sandbox.filesystem probe (only on WSL2/Linux/macOS; SKIP on Windows native)
# Inside sandboxed bash, attempt: touch /etc/test  → expect blocked
# Inside sandboxed bash, attempt: touch ./build/test → expect allowed (allowWrite "./")

# (f) network proxy probe (only on WSL2/Linux/macOS)
# Inside sandboxed bash, attempt: curl https://github.com  → expect allowed
# Inside sandboxed bash, attempt: curl https://example.com → expect blocked (not in allowedDomains)
```

**Expected on Windows native** (this runtime today):
- (b) `/sandbox` shows "Sandboxing requires WSL2" warning
- (c) permission-prompts return — operator MUST approve dozens of new prompts per session (this is the friction)
- (d) deny rules work the same as before
- (e)/(f) skipped — sandbox is a no-op on Windows native

**Expected on WSL2 migration**:
- (b) `/sandbox` opens menu cleanly
- (e)/(f) sandbox actively blocks
- Session-end report shows sandboxed commands count

## 4. Rollback (how to revert if breakage)

```powershell
# Option A1 — git revert if applied via a commit
git -C Z:/claude-sota-installed log -1 --format=%H -- .claude/settings.json    # find commit
git -C Z:/claude-sota-installed revert <commit-sha>

# Option A2 — manual restore from CLAUDE-MD-STATUS-CURRENT-W324.md archive snapshot
# pre-state: defaultMode "bypassPermissions" + sandbox.enabled false + allowUnsandboxedCommands true

# Option A3 — diff-restore single keys (paste-ready):
# Inside CC restored permissions block: "defaultMode": "bypassPermissions"
# Inside CC restored sandbox block:     "enabled": false, "allowUnsandboxedCommands": true
# Restart CC
```

**Rollback time**: <2 min (single commit revert). **Data-loss risk**: NONE (settings.json is a config file; no derived state).

## 5. Risk-class breakdown

| Risk | Level | Mitigation |
|------|-------|-----------|
| **Workflow disruption** | HIGH | Operator MUST approve dozens of new permission-prompts per session unless ~20 common Bash predicates are pre-allowed (Patch A1 already includes them). |
| **Windows-native no-op** | HIGH | OS-sandbox layer is structurally inert on Windows native. The runtime sees R5 fully-hold on paper but only the permissions-layer half is enforced. |
| **CC startup failure** | LOW (with `failIfUnavailable: false`) → HIGH (with `failIfUnavailable: true` on Windows native) | Keep `failIfUnavailable: false` on Windows; flip to `true` only after WSL2 migration. |
| **MCP tool friction** | MEDIUM | MCP server tools (basic-memory, chrome-devtools, etc.) are evaluated by the permissions layer too. Some may need explicit allowlist entries. |
| **Hook side-effects** | MEDIUM | Hooks declared in settings.json `hooks.*` run with their own permission context; some hooks may break if they expect `bypassPermissions` (e.g., the silent-prompt-skipping behavior). |
| **codex cross-model gate** | LOW | codex Stop-hook is a direct-CLI invocation; not affected by CC permissions/sandbox. |

## 6. Cite-anchors

- **Anthropic CC sandbox doc**: `https://code.claude.com/docs/en/sandboxing` (canonical schema + platform support + sandbox modes)
- **Anthropic CC settings doc**: `https://code.claude.com/docs/en/settings` (full settings.json schema reference; sandbox-settings section)
- **CCBP**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:262` (bypassPermissions semantics + v2.1.121/v2.1.126 carve-outs)
- **CCBP**: `claude-settings.md:249` (`permissions.skipDangerousModePermissionPrompt` semantics)
- **Anthropic permission-modes doc**: `https://code.claude.com/docs/en/permission-modes`
- **NIST 800-53 AC-3(3)**: Mandatory Access Control — `https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-3`
- **OWASP A01-2021**: Broken Access Control — `https://owasp.org/Top10/A01_2021-Broken_Access_Control/`
- **Microsoft Zero-Trust deny-default**: `https://learn.microsoft.com/en-us/security/zero-trust/`

## 7. Operator-decision criteria (when to choose Option A)

Choose Option A if:
- Runtime can migrate to WSL2/Linux/macOS within a single wave (W326-W328)
- Operator accepts dozens of new permission-prompts per session as the productivity cost
- Compliance regime (e.g., FedRAMP, ISO 27001) requires OS-level sandboxing
- All current Bash workflows can be enumerated into the permissions.allow array

Decline Option A if:
- Runtime MUST stay on Windows native (Z:-portable install is a hard constraint)
- Operator productivity-cost of permission-prompts is unacceptable
- Many ad-hoc Bash commands are issued (impractical to pre-enumerate)

## 8. Estimated effort

- **Apply**: ~15 min (Edit settings.json + restart CC + smoke-test)
- **Operator-onboarding**: ~1 wave (W326) to find + add missing permissions.allow entries through trial-and-error
- **WSL2 migration prereq**: ~3-5 waves (not in W325 scope)
