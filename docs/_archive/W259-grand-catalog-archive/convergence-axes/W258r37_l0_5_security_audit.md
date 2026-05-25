# W258r37 — L0.5 Security Layer Audit (DevSecOps role, security-paranoid)

**Auditor**: senior-security agent (security-paranoid mandate)
**Document under audit**: `Z:/claude-sota-installed/docs/architecture/W258-final-synthesis-2026-05-16-v3.md` §L0.5 (L160-225)
**Live config audited**: `Z:/claude-sota-installed/.claude/settings.json`, `Z:/claude-sota-installed/.mcp.json`
**Date**: 2026-05-16
**Budget**: ~12 min

---

## §1 L0.5 layer design soundness verdict

**NEEDS-HARDENING.** The L0.5 layer is **directionally correct** (existence of dedicated security/provenance layer addresses codex P0 gap; 6 sub-disciplines cover the right axes), but **5 concrete gaps prevent APPROVE-AS-WRITTEN**:

1. **Denylist-only approach is structurally weak** — `bypassPermissions:true` + denylist is "allow-everything-except"; one missed pattern = full exposure. Industry SOTA is **allowlist + minimal-trust default**.
2. **Secrets denylist is incomplete** — operator's current 7 patterns miss ~12 high-value classes (see §2.2).
3. **MCP provenance workflow is described but NOT codified as a pre-install gate** — no operator hook/script enforces it.
4. **Sandbox requirements for code-execution MCPs are mentioned but not specified** — no concrete CPU/mem/network policy.
5. **Cross-machine threat model for Z:-portable is entirely absent** from L0.5.

The layer should ship in v3, but with the §3 patches applied. Without patches: residual P1 risk.

---

## §2 Per-dimension findings (10 dimensions)

### §2.1 Path allowlist vs denylist policy

**FINDING: denylist insufficient.** Current `bypassPermissions:true` + 7-pattern deny is brittle:
- A new MCP server (e.g., filesystem MCP) introduces unbounded read surface; the 7-pattern denylist won't auto-extend.
- Glob patterns `**/*.pem` etc. miss extensionless secrets (`.aws/credentials`, `.npmrc` with `_authToken=`, `kubeconfig`).
- L0.5 §1 says "Filesystem MCP must be restricted to `Z:/<project>/` only" — but provides **no enforcement mechanism**. CC's `permissions.allow` array would need explicit `Read(Z:/claude-sota-installed/**)` + a default-deny stance, not the current allow-list-of-Bash-commands shape.

**RECOMMENDATION**: Add explicit `permissions.allow` with `Read(Z:/claude-sota-installed/**)` + `Read(Z:/repos/**)` + `Read(C:/Users/42/AppData/Roaming/npm/**)` and switch `defaultMode` to `auto` (Mar 25 2026 mode) which fails-closed on unmatched reads.

### §2.2 Secrets boundary completeness

**FINDING: ~12 classes missed.** Current denies `.env*`, `id_rsa`, `id_ed25519`, `*.pem`, `*.pfx`, `*.key`, `secrets/**`. Missed:

| Class | Pattern to add |
|---|---|
| AWS credentials | `**/.aws/credentials`, `**/.aws/config` |
| GCP service-account JSON | `**/gcloud/**`, `**/*-service-account*.json`, `**/*-sa.json` |
| Azure managed-identity | `**/.azure/**`, `**/azureProfile.json`, `**/TokenCache.dat` |
| Kubeconfig | `**/.kube/config`, `**/kubeconfig*` |
| SSH known_hosts + config | `**/.ssh/**` (broader than just id_rsa) |
| Docker auth | `**/.docker/config.json` |
| npm auth | `**/.npmrc` (contains `_authToken=`), `**/.yarnrc` |
| pip / PyPI | `**/.pypirc` |
| Git credentials | `**/.git-credentials`, `**/.netrc` |
| Browser cookie jars / token caches | `**/Cookies`, `**/Login Data`, `**/*.sqlite` (chrome) |
| Anthropic / OpenAI keys | `**/.anthropic/**`, `**/.config/openai/**`, `**/anthropic.json` |
| Codex auth state | `Z:/claude-sota-installed-state/.codex/**` (operator's own CODEX_HOME) |
| Password managers | `**/*.kdbx`, `**/*.1password`, `**/*.opvault` |
| GitHub CLI | `**/.config/gh/**`, `**/hosts.yml` |
| Terraform state | `**/*.tfstate`, `**/*.tfvars`, `**/.terraform/**` |
| Generic | `**/credentials*`, `**/auth.json`, `**/token*.json`, `**/*_token`, `**/*_secret` |

Operator's CC session state (`Z:/claude-sota-installed-state/.claude/projects/`) and `.mcp-memory/memory.db` (graphiti FalkorDB writes user data) also need consideration — they contain prior session content that may include past pasted secrets.

### §2.3 MCP server source verification workflow

**FINDING: described but not enforced.** L0.5 §3 says "Probe official MCP Registry first, then Smithery". Specific verification order with examples:

1. **modelcontextprotocol/registry** (https://github.com/modelcontextprotocol/registry) — official Anthropic-governed registry. PRIMARY source.
2. **Anthropic-published servers** — search `org:anthropics topic:mcp` on GitHub.
3. **Vendor-OFFICIAL servers** — verified by org badge (e.g., `microsoft/playwright-mcp`, `ChromeDevTools/chrome-devtools-mcp`, `getsentry/sentry-mcp`). Operator's serena/playwright/chrome-devtools/repomix are all vendor-or-named-org sources — CORRECT.
4. **Smithery.ai** — community marketplace; secondary source.
5. **GitHub direct** — only with: maintainership verified, last-commit <90d, LICENSE OSI-approved, security policy present, ≥3 distinct contributors.

**REJECT**: archived repos (unless function moved per r30 semgrep-mcp lesson), single-maintainer single-commit repos, repos with `package.json` containing post-install scripts that fetch remote code.

**Operator-specific risk**: `gitnexus@1.6.4-rc.112` is RC-channel from single npm publisher abhigyanpatwari with PolyForm Noncommercial license. License-compliance risk (if operator does any commercial work) + RC-channel D6 stability risk. Already acknowledged in operator's `.mcp.json` comments — provenance discipline working there.

### §2.4 bypassPermissions vs Claude Code auto mode

**FINDING: auto mode is meaningfully safer; threat model favors migration.**

**bypassPermissions threat model**:
- Single binary state: ALL or NOTHING per tool family.
- Any prompt injection (e.g., from a malicious doc fetched via WebFetch/repomix pack of attacker-controlled repo) can chain into any Read/Write/Bash call without further user confirmation.
- Operator's `skipDangerousModePermissionPrompt: true` removes even the initial confirmation banner.

**auto mode threat model** (Anthropic Mar 25 2026):
- Scoped per-invocation evaluation; risky operations (Write to system paths, Bash with destructive flags) prompt; routine reads bypass.
- Reduces blast radius of prompt-injection chains: attacker would need to escalate to a category that auto-mode flags.
- Pairs cleanly with `permissions.deny` glob list for defense-in-depth.

**Verdict**: MIGRATE. Operator should set `defaultMode: "auto"` and validate on a throwaway branch. Combined with `skipDangerousModePermissionPrompt: false` for additional belt-and-suspenders.

### §2.5 Plugin/MCP update policy

**FINDING: cadence missing from L0.5.** Operator has 37 enabled plugins + 12 MCPs. Recommended:

| Component | Cadence | Verification |
|---|---|---|
| MCP servers (pinned) | review changelog monthly; bump on security-relevant tag | `npm view <pkg> dist-tags`, GitHub release notes |
| Plugins (marketplace) | `/plugin update` weekly in throwaway eee session | `/doctor` post-update |
| codex CLI | bump on Anthropic-published advisory | `codex --version` |
| Claude Code itself | per Anthropic release cadence | `minimumVersion` in settings.json enforces floor |

**Rollback strategy** (missing from v3): every MCP update must record the prior-pinned version in `_comments` of `.mcp.json` (operator already does this pattern well). Plugin rollback via `/plugin disable @marketplace` + reinstall prior version, OR via git revert of settings.json `enabledPlugins` block.

**Specific risk**: operator has `superpowers` enabled from TWO marketplaces (`claude-plugins-official` AND `superpowers-marketplace`). Marketplace overlap audit is flagged pending in §4 L2; this is a real risk — version drift between two sources of the same plugin creates non-determinism.

### §2.6 Sandbox requirements for code-execution-with-MCP

**FINDING: L0.5 mentions sandboxing but doesn't specify.** Concrete sandbox requirements:

- **serena LSP MCP**: runs `uvx` which downloads + executes Python; pin via SHA-commit (operator does this at `@249f6b07`). Restrict LSP to project root via Serena's `--context claude-code` flag (operator does this). **Risk**: serena writes `.serena/` in worktree; ensure that path is gitignored to prevent committing tool state.
- **repomix MCP**: packs codebase; reads everything in cwd. **Risk**: packing a directory containing `.env` files into Repomix output → context leak. L0.5 should mandate `.repomixignore` co-located with `.gitignore` for every project.
- **graphiti MCP**: writes to FalkorDB at `redis://127.0.0.1:16379`. **Risk**: FalkorDB has no auth (`FALKORDB_PASSWORD=""`). Localhost-bind is acceptable for solo operator; for any future remote/multi-user setup, add auth.
- **PowerShell tool** (`CLAUDE_CODE_USE_POWERSHELL_TOOL=1`): can execute any PS cmdlet on the host. See §2.8.
- **Bash tool**: with `bypassPermissions` + `Bash(npm install -g *)` / `Bash(docker pull *)` / `Bash(git clone --depth 1 https://github.com/* *)` allowed — these patterns allow installing arbitrary packages/cloning arbitrary repos. Adversary with prompt injection can install backdoored npm packages. **Recommend**: narrow these to specific orgs (e.g., `Bash(git clone --depth 1 https://github.com/anthropics/* *)`, `Bash(git clone --depth 1 https://github.com/microsoft/playwright-mcp *)` allowlist of orgs).

**Resource limits**: CC doesn't expose CPU/mem limits per tool; rely on Windows job objects or container sandbox for true isolation. Code-execution-with-MCP pattern should run inside a Windows Sandbox / WSL2 container, NOT host-direct.

### §2.7 Network / data exfiltration risk

**FINDING: credential exposure surface is meaningful.**

Per `.mcp.json`:
- **github MCP**: HTTPS to `api.githubcopilot.com/mcp/readonly` with `Bearer ${GITHUB_TOKEN}`. Token is read-only — good. **Verify** scope: `gh auth status` should show `repo:read` only, not `repo` (write).
- **context7 MCP**: HTTPS to `mcp.context7.com/mcp` with `CONTEXT7_API_KEY`. **Risk**: every doc query goes to third party. If operator queries proprietary code via context7's `query-docs`, code snippets are sent to context7 servers. **L0.5 should mandate**: never paste private code into context7 query strings.
- **deepwiki MCP**: HTTPS to `mcp.deepwiki.com/mcp` — no auth header visible. **Verify**: deepwiki ToS; queries about private repos may leak repo names/structure.
- **graphiti MCP**: localhost only — safe.
- **phoenix MCP**: localhost `127.0.0.1:16006` — safe.

**Egress controls**: operator has no outbound firewall policy for CC. Adding Windows Firewall rules to allow only `api.anthropic.com`, `api.githubcopilot.com`, `mcp.context7.com`, `mcp.deepwiki.com`, `registry.npmjs.org`, `github.com`, `objects.githubusercontent.com` would be strong defense against exfil through unexpected channels (e.g., a compromised npm post-install script).

**Phoenix telemetry**: `OTEL_LOG_USER_PROMPTS=1` + `OTEL_LOG_TOOL_DETAILS=1` writes full prompts to `http://127.0.0.1:14317`. Verify Phoenix DB is not network-exposed (`127.0.0.1` bind only). If Phoenix is later exposed on LAN, **all prompts including any secrets pasted by operator become network-readable**.

### §2.8 PowerShell tool risk (Windows-specific)

**FINDING: L0.5 missing entirely; significant Windows surface.**

- **AMSI bypass**: an attacker-controlled prompt could craft PS one-liners that disable AMSI via reflection (`[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils')...`). With `bypassPermissions:true`, CC will execute. Mitigation: **enable PowerShell Constrained Language Mode** for the CC user, OR run CC in a separate user account with restricted ExecutionPolicy.
- **PSReadLine history exfil**: `$env:USERPROFILE\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt` accumulates every PS command typed by operator across all sessions — may include pasted secrets/tokens. With `USERPROFILE = Z:\claude-sota-installed`, this file lives in the project tree. **Add to deny list**: `**/PSReadLine/**`.
- **Token theft via PSGet**: PS can read DPAPI-encrypted credentials from `HKCU:\SOFTWARE\Microsoft\IdentityCRL\*`, Git Credential Manager stores, Windows Credential Vault. **Add to deny list**: registry paths via `Bash(reg query *)` and `PowerShell(Get-ItemProperty HKCU:* *)`.
- **PowerShell transcripts**: if Group Policy enables transcription, every PS command CC runs is logged in plaintext to a configured share. Verify `Get-ItemProperty 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription' -EA 0` is unset OR transcript dir is on private storage.
- **DLL planting**: PS auto-loads modules from `$env:PSModulePath`; with operator's `Z:`-portable, anyone with write access to `Z:\` can plant a malicious `Microsoft.PowerShell.Utility.psd1` that hijacks `Format-Table`.

### §2.9 Z:-portable install threat model (cross-machine)

**FINDING: ENTIRELY MISSING from L0.5.**

Operator runs Z:-portable, intended to mount across machines. Threats:

1. **USB-mount on untrusted machine** → `Z:` contains plaintext API keys in `CLAUDE.local.md` ENV block (referenced in claude-sota-installed/CLAUDE.local.md). If a kiosk/borrowed-machine reads `Z:`, all keys leak.
2. **Network-share mount** → SMB/NFS protocol weaknesses; man-in-the-middle on auth state in `Z:/claude-sota-installed-state/`.
3. **Cross-machine session-state contamination** — if Z: is mounted simultaneously on two machines (rare but possible), CC sessions could corrupt each other's `.claude/projects/` JSONL.
4. **Bring-your-own-malware** — Z: drive carried between hostile networks; trojanized binaries in `Z:\repos\deps\` get auto-executed when CC dispatches an installed plugin.

**Mitigations to add to L0.5**:
- **Encrypt Z: at rest** (BitLocker To Go for USB; LUKS/VeraCrypt for portable volumes). Decryption key NOT stored on the drive.
- **Per-machine ENV files** (operator's CLAUDE.local.md is already gitignored — good). Keep API keys in OS-keychain (Windows Credential Manager via `cmdkey` / DPAPI) NOT in plaintext env blocks.
- **Integrity verification**: maintain a `Z:\claude-sota-installed\.integrity\manifest.sha256` of plugin/MCP binaries; check on each `eee` launch.
- **Single-machine lock**: write a host-uuid file on first launch; refuse to launch if drive sees a different host-uuid without explicit `--portable-transfer` flag.

### §2.10 Hooks discipline

**FINDING: low risk in current state; mandate is sound.**

Operator's current `settings.json` has exactly ONE hook: SessionStart running `node Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`. Per CLAUDE.md cardinal-rule-2, **no self-invent `.claude/hooks/scripts/*.py` should exist**, and the W255 cleanup landed 2026-05-15 confirms 33 self-invent scripts were removed.

**Residual risk**: the single hook script is local; verify it's not modified by any subagent that has Write access to `.claude/hooks/`. Add `Write(Z:/claude-sota-installed/.claude/hooks/**)` to permissions.deny unless explicit operator unlock.

**Plugin-supplied hooks** (intelligent-compact, context-mode plugin, codex@openai-codex if installed) — these run upstream-plugin code. Mitigation: pin plugin versions via marketplace lockfile if Anthropic provides one (currently semi-pinned via `enabledPlugins` map + marketplace HEAD).

---

## §3 Top-5 operator-actionable security improvements (concrete edits)

### Edit 1 — Switch defaultMode + add allowlist `permissions.allow` block

In `Z:/claude-sota-installed/.claude/settings.json`:

```jsonc
"permissions": {
  "allow": [
    // ... existing entries ...
    "Read(Z:/claude-sota-installed/**)",
    "Read(Z:/claude-sota/**)",
    "Read(Z:/repos/deps/**)",
    "Read(C:/Users/42/AppData/Roaming/npm/**)",
    "Read(Z:/venvs/claude/**)"
  ],
  "deny": [
    // existing 7 entries PLUS:
    "Read(**/.aws/**)", "Read(**/.azure/**)", "Read(**/.gcloud/**)",
    "Read(**/.kube/**)", "Read(**/.ssh/**)", "Read(**/.docker/config.json)",
    "Read(**/.npmrc)", "Read(**/.yarnrc)", "Read(**/.pypirc)",
    "Read(**/.netrc)", "Read(**/.git-credentials)",
    "Read(**/Cookies)", "Read(**/Login Data)",
    "Read(**/.anthropic/**)", "Read(**/.config/openai/**)", "Read(**/anthropic.json)",
    "Read(Z:/claude-sota-installed-state/.codex/**)",
    "Read(**/*.kdbx)", "Read(**/*.tfstate)", "Read(**/*.tfvars)",
    "Read(**/PSReadLine/**)",
    "Read(**/credentials*)", "Read(**/auth.json)", "Read(**/token*.json)",
    "Write(Z:/claude-sota-installed/.claude/hooks/**)"
  ],
  "defaultMode": "auto"
},
"skipDangerousModePermissionPrompt": false
```

### Edit 2 — Narrow Bash allowlist to specific orgs/registries

Replace `"Bash(git clone --depth 1 https://github.com/* *)"` with a specific allowlist of orgs operator actually installs from (anthropics/openai/microsoft/ChromeDevTools/getsentry/oraios/yamadashy/iannuttall/abhigyanpatwari etc. per current install set in `docs/sota-installed-manifest.md`).

### Edit 3 — Add Z:-portable cross-machine security to L0.5

In `W258-final-synthesis-2026-05-16-v3.md` §L0.5, add discipline #7:

> **Z:-portable threat model (Windows-specific)**: encrypt Z: at rest (BitLocker To Go); store API keys in Windows Credential Manager not plaintext env block; maintain `.integrity/manifest.sha256` on plugin/MCP binaries; check on each `eee` launch.

### Edit 4 — Codify MCP pre-install provenance gate

Add a CLAUDE.md cardinal-rule line:

> **Cardinal-rule-13 (proposed)**: Before any `/plugin install` or `.mcp.json` entry add: verify (a) modelcontextprotocol/registry listing OR vendor-OFFICIAL org, (b) LICENSE OSI-approved or explicitly noncommercial-acknowledged, (c) last-commit <90d, (d) ≥3 distinct committers OR single named-org maintainership, (e) `package.json` reviewed for malicious post-install scripts. Record provenance in `.mcp.json` `_comments` block.

### Edit 5 — Lock Phoenix to localhost + redact PII in OTel

Verify Phoenix bind is `127.0.0.1` not `0.0.0.0`. If `OTEL_LOG_USER_PROMPTS=1` stays enabled (currently is), add a Phoenix-side scrubber that hashes/redacts `sk-ant-*` / `sk-*` / `ghp_*` / `gho_*` / `xoxb-*` token formats before they hit the trace DB.

---

## §4 Out-of-scope security followups (future security wave; don't block v3)

1. **Threat model document**: dedicated `docs/security/threat-model.md` with STRIDE analysis of the full 9-layer stack.
2. **NIST CSF mapping**: map current controls to NIST Cybersecurity Framework 2.0 functions (Identify/Protect/Detect/Respond/Recover/Govern) for solo-dev tier.
3. **Penetration testing**: red-team the CC harness via NVIDIA garak (already on watchlist per L0 Tier-2) + manual prompt-injection attempts against operator's plugin set.
4. **Supply-chain SBOM**: generate SBOM of all 37 plugins + 12 MCPs + their transitive npm/PyPI deps; track CVEs via `npm audit` / `pip-audit` / GitHub Dependabot on a private repo mirror.
5. **Secrets rotation playbook**: scheduled rotation cadence for ANTHROPIC_API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, GITHUB_TOKEN, CONTEXT7_API_KEY (90-day rotation; documented revocation steps).
6. **Incident response runbook**: 4-phase NIST IR (preparation, detection, containment+eradication, recovery) tailored to "API key leak via session JSONL" / "compromised MCP package" / "prompt injection chain" scenarios.
7. **Compliance overlay**: if operator ever does client work, layer GDPR data-processing controls + SOC2 audit-log requirements on top of L0.5.
8. **Long-term**: post-quantum readiness for any TLS-pinned channels CC opens.

---

## §5 Verdict

**v3's L0.5 design is NEEDS-PATCH.** The layer's existence and shape (6 disciplines + provenance workflow + secrets boundary + sandbox + auto-mode migration) is correct and addresses the codex P0 missing-component finding. However, ship-blocking gaps remain:

- **(a)** Secrets denylist is incomplete (12+ missed classes — §2.2).
- **(b)** Path policy is denylist-only when it should be allowlist-primary (§2.1).
- **(c)** Z:-portable cross-machine threat model is entirely absent (§2.9).
- **(d)** PowerShell-tool risks (AMSI/PSReadLine/DPAPI/transcripts/PSModulePath) are unaddressed (§2.8).
- **(e)** MCP pre-install provenance is described as a procedure but not codified as a CLAUDE.md cardinal-rule gate (§3 Edit 4).

**Patch via §3 Edits 1–5 (estimated 30 minutes operator-time, all reversible <2 min via comment-out)** then ship v3. Without patches, the layer is directionally correct but leaves operator at residual P1 risk classes for solo-Windows-Z:-portable threat model.

The L0.5 layer is the RIGHT abstraction; the gaps are content-completeness gaps, not architecture gaps. Re-audit after §3 patches → expected verdict **SOUND**.

**Recommend**: ship v3 with L0.5-as-written + §3 §4 followups tracked, OR pause v3 ship and integrate §3 patches into L0.5 §3 directly (preferred — patches are concrete, short, and reversible).
