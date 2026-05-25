# W325 Stream C — R5 SHIP-BLOCKER Context

**Wave**: W325 · **Stream**: C · **Scope**: DOC-ONLY exploration of R5 unblock options · **Date**: 2026-05-19 · **Owner**: Stream C
**Strict file ownership**: `docs/architecture/W325-R5-UNBLOCK-EXPLORE/*` only — NO settings.json or other file changes.

---

## 1. R5 cardinal-rule text (Z:/claude-sota-installed/CLAUDE.md:22, paraphrased)

> **R5**: "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts" — per Anthropic CC `https://docs.anthropic.com/en/docs/claude-code/settings` and `https://code.claude.com/docs/en/sandboxing`.

## 2. Current settings.json state (the R5 violation surface)

**File**: `Z:/claude-sota-installed/.claude/settings.json` HEAD `1360aeb`

### permissions block (L57-93)
```json
"permissions": {
  "allow":  [ … 11 narrow Bash/Edit allows for install/clone/codex … ],
  "deny":   [ … 17 secret-class Read denies (.env, *.pem, *.key, .ssh/*, .aws/credentials …) … ],
  "defaultMode": "bypassPermissions"            ← R5 VIOLATION #1
}
```

### sandbox block (L414-420)
```json
"sandbox": {
  "enabled":                  false,            ← R5 VIOLATION #2
  "failIfUnavailable":        false,
  "autoAllowBashIfSandboxed": true,
  "excludedCommands":         ["git", "docker", "npx", "uvx"],
  "allowUnsandboxedCommands": true              ← R5 VIOLATION #3 (escape hatch wide open)
}
```

## 3. 7-wave SHIP-BLOCKER trail (convergent finding history)

| Wave | Stream/Finding | Cite anchor | Severity |
|---|---|---|---|
| **W316-S1** | codex GPT-5.5 dual-source `R5_safety_via_permissions_and_sandbox: FAIL — defaultMode bypassPermissions and no sandbox block` | `STREAM-1-REPO-CLONE-INGEST.md:118` | **HIGH** — codex flag |
| **W314-E** | Stream E adversarial 7.5/10 verdict; "sandbox half-implemented" (CCBP `claude-settings.md:446-461` documents `sandbox.*`; settings.json ZERO live `sandbox.enabled:true`) | W314 Stream E → operator-AI queued | **HIGH** — gap discovery |
| **W316-S4** | runtime-clean audit flagged convergent with W316-S1 + W314-E (3rd-time-confirmed) | `STREAM-4-RUNTIME-CLEAN.md` | **HIGH** |
| **W316-S5** | Layer-7 (Safety/Governance) composite **3.857** ✗ T2 (-0.643) **below 4.5 ship-gate** due to `sandbox.enabled:false` + `allowUnsandboxedCommands:true` | `STREAM-5-ULTIMATE-ARCHITECTURE.md` (Ultimate Arch 7-layer blueprint) | **SHIP-GATE FAIL** |
| **W317-S1** | re-confirmed convergent finding (5th-time); operator-decision queued | W317-r2 SYNTHESIS | **HIGH** carry-forward |
| **W319-D** | runtime cleanness v7 6th-time-confirmed | `W319-RUNTIME-CLEANNESS-V7/STREAM-D-*.md` | **HIGH** |
| **W324** | sca-v9 §6 R5 5-control layered-defense codified as proposed-resolution; rubric-only, NOT applied to settings.json | `W324-WAVE/CLOSURE-SYNTHESIS.md:141` + `sota-convergence-audit/SKILL.md:289-313` | **CODIFIED, OPERATOR-DECISION PENDING** |

**Convergence count**: **7 waves** (W316-S1, W314-E, W316-S4, W316-S5-L7, W317-S1, W319-D, W324) all flagging the same R5 SHIP-BLOCKER. Anti-bias gate cleared 7× (this is not a freshman-finding — it is the most repeatedly-confirmed open issue in the runtime).

## 4. sca-v9 §6 5-control layered-defense codification (W324 P1)

Per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:289-313`:

| # | Control | Cite-anchors (3-org-distinct) |
|---|---------|-------------------------------|
| **1** | **Deny-default permissions** — `permissions.deny` enumerates secrets-class paths; `permissions.allow` explicit-allowlist; **no `defaultMode: bypassPermissions`** | NIST 800-53 AC-3(3) Mandatory Access Control · OWASP A01-2021 Broken Access Control · Microsoft Zero-Trust deny-default |
| **2** | **Audit logging** — PreToolUse hook → `.claude/state/audit/<YYYY-MM-DD>.jsonl` for Bash/Edit/Write/MCP; SHA-256 hash chain tamper-attestation | NIST 800-53 AU-2 Event Logging · OWASP A09-2021 Logging Failures · CIS CSC-8 Audit Log Management |
| **3** | **Secret redaction** — `gitleaks` PreToolUse on Bash/Edit/Write/Commit (CR-2 direct-CLI, wired today); `trivy fs` PostToolUse advisory on Edit/Write (W317 F-V6-1) | OWASP A02-2021 Cryptographic Failures · NIST 800-53 SC-28 Protection of Info at Rest · gitleaks (zricethezav) |
| **4** | **Egress policy** — operator-confirmed for any out-of-runtime POST; `mcp__chrome-devtools__*` sandbox-mode default + egress allowlist via `permissions.allow.network` | NIST 800-53 SC-7 Boundary Protection · OWASP A10-2021 SSRF · CNCF NetworkPolicy spec |
| **5** | **Drift detection** — `git status` pre-commit verifies no unexpected adds; SHA-pinned plugin updates (no auto-update floats); `.mcp.json` MUST be `npx -y <pkg>@<pinned>` per CR-9 W286-arc-P0C | NIST 800-53 CM-8 Component Inventory · OWASP A06-2021 Vulnerable Components · SLSA v1.0 L3 Pinned Inputs |

**Key claim** in sca-v9 §6: "NO single control is sufficient; the layered set provides defense-in-depth per NIST 800-53 + CISA Zero-Trust + OWASP-A07." — but this is **codification, not implementation**. The 5 controls are partially wired (Control 3 gitleaks today; Controls 4-5 partial); Controls 1-2 are NOT wired today (defaultMode still bypassPermissions; no audit-logging PreToolUse hook).

## 5. Anthropic CC canonical doc inventory (fetched 2026-05-19 via ctx_fetch_and_index)

### `https://code.claude.com/docs/en/sandboxing` (anthropic-sandbox-doc, 7 sections, 25.0KB)

**Key facts**:
- Sandboxing and permissions are **complementary security layers** ("Permissions… apply to all tools: Bash, Read, Edit, WebFetch, MCP, and others. Sandboxing… restricts file system and network at OS level for Bash and subprocesses").
- **Effective sandboxing requires BOTH filesystem AND network isolation**. Without network isolation, a compromised agent could exfiltrate SSH keys. Without filesystem isolation, a compromised agent could backdoor system resources.
- **Platform support**: macOS (Seatbelt), Linux (bubblewrap + socat for network proxy), **WSL2** (Linux subsystem). **WSL1 not supported** — "lacks required Linux namespace primitives".
- **Windows native (the runtime here)**: NOT in the sandbox doc's listed platforms — Anthropic doc says "Enable bash sandboxing (macOS, Linux, and WSL2). Default: false". **Windows native (Z:-portable Git-Bash) is not a sandbox-supported platform per upstream**.
- **Enable command**: `/sandbox` (interactive menu).
- **Auto-allow vs Regular**: Auto-allow auto-approves bash commands inside the sandbox boundaries (works independently of permission mode). Regular still routes through permission flow.
- **`sandbox.failIfUnavailable: true`** is intended for "managed deployments that require sandboxing as a hard gate"; default `false` means "warning + run unsandboxed" when sandbox cannot start.

### `https://code.claude.com/docs/en/settings` (anthropic-settings-doc, 16 sections, 77.7KB)

**Sandbox settings schema** (full):
| Key | Description | Example |
|---|---|---|
| `enabled` | Enable bash sandboxing (macOS, Linux, WSL2). Default: false | `true` |
| `failIfUnavailable` | Hard-fail at startup if sandbox cannot start (missing deps or unsupported platform). Default: false | `true` |
| `autoAllowBashIfSandboxed` | Auto-approve bash commands when sandboxed. Default: true | `true` |
| `excludedCommands` | Commands that run outside the sandbox | `["docker *"]` |
| `allowUnsandboxedCommands` | Allow `dangerouslyDisableSandbox` escape hatch. **`false` = strict-sandbox-only**. Default: true | `false` |
| `filesystem.allowWrite` | Extra paths for sandboxed writes (merged across scopes) | `["/tmp/build", "~/.kube"]` |
| `filesystem.denyWrite` | Paths sandboxed writes blocked (merged) | `["~/.aws/credentials"]` |
| `filesystem.allowRead` | Extra paths for sandboxed reads (managed-tier only) | n/a |
| `filesystem.denyRead` | Paths sandboxed reads blocked (merged) | `["~/.aws/credentials"]` |
| `network.allowedDomains` | Domain allowlist (proxy-enforced) | `["github.com", "*.npmjs.org"]` |
| `network.deniedDomains` | Domain denylist | `["uploads.github.com"]` |
| `network.allowUnixSockets` | Unix sockets allowed (Linux/macOS) | `["/var/run/docker.sock"]` |
| `network.allowLocalBinding` | Allow localhost bind | `true` |

**Permissions `defaultMode` valid values** (per anthropic-settings-doc §7):
- `default` — standard permission flow
- `acceptEdits` — auto-accept Edit/Write
- `plan` — plan mode (read-only investigation)
- `auto` — auto-allow (ignored when set in project/local settings since v2.1.142; must be set in `~/.claude/settings.json`)
- `dontAsk` — skip prompts (semi-strict)
- **`bypassPermissions`** — skip all permission checks (DANGEROUS). Per CCBP `claude-settings.md:249` + `:262`:
  - "Writes to protected paths (`.git`, `.claude`, `.vscode`, `.idea`, `.husky`) still prompt"
  - v2.1.121: `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, `.claude/worktrees/` exempt from protected-paths prompt
  - v2.1.126: `.claude/`, `.git/`, `.vscode/`, shell config files (`.bashrc`, `.zshrc`) no longer prompt under `--dangerously-skip-permissions`
  - "Catastrophic removal commands still prompt as a safety net"

**Settings precedence** (highest-wins, top-overrides-bottom):
1. Managed (enterprise policy)
2. Command-line args
3. Local project (`.claude/settings.local.json`)
4. Shared project (`.claude/settings.json`) ← **this runtime**
5. User (`~/.claude/settings.json`)

**Array settings merge across scopes** for `sandbox.filesystem.allowWrite`, `permissions.deny`, etc.

## 6. Platform-specific constraint (Windows native, Z:-portable)

This runtime is **Windows 11 Pro native** with Git-Bash at `C:\Program Files\Git\bin\bash.exe`, Z:-portable install pattern. Per the Anthropic sandbox doc:

- macOS: Seatbelt — N/A
- Linux: bubblewrap + socat — N/A
- **WSL2**: supported — but this runtime runs CC directly on Windows native, not in WSL2
- **WSL1**: NOT supported — N/A
- **Windows native**: **NOT in the supported list**. The sandbox doc does NOT say sandboxing works on Windows native. CCBP `claude-settings.md` `sandbox.bwrapPath` / `sandbox.socatPath` fields are Linux/WSL2-specific.

**Implication**: Option A (full sandbox) requires either WSL2 migration or accepting that `sandbox.enabled: true` with `failIfUnavailable: false` will degrade to "warning + run unsandboxed" on Windows native — which is exactly the current state minus a warning. This is the **structural Windows-native constraint** that makes Option C (layered-defense in lieu of OS-sandbox) **the only viable path** without OS migration.

## 7. Output files for W325 Stream C

Files written this wave (under `docs/architecture/W325-R5-UNBLOCK-EXPLORE/`):
1. `STREAM-C-R5-CONTEXT.md` (this file) — 7-wave SHIP-BLOCKER + sca-v9 §6 5-control context
2. `STREAM-C-OPTION-A-FULL-SANDBOX.md` — fully enable sandbox + disable bypassPermissions
3. `STREAM-C-OPTION-B-HYBRID.md` — partial sandbox + per-permission allowlist preserved
4. `STREAM-C-OPTION-C-LAYERED-DEFENSE.md` — sca-v9 §6 5-control as EQUIVALENT to OS-sandbox; cite-anchor + operator-acceptance-record
5. `STREAM-C-RECOMMENDATION.md` — best option + rationale (operator-decision pending)
6. `STREAM-C-SYNTHESIS.md` — wave-closure summary

**Cardinal rule status**: R1-R5 ✓ HOLD with R5 STILL PARTIAL-HOLD post-W325 (this stream is exploration only, NOT implementation).
