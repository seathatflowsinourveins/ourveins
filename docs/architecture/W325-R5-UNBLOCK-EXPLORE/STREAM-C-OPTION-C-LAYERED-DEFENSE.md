# Option C — DOCUMENTED EXCEPTION (sca-v9 §6 5-control layered-defense as EQUIVALENT to OS-sandbox)

**Risk-class**: **LOW** · **Cardinal rule R5**: ◐ EQUIVALENT-HOLD (via documented-exception + 5-control wire-up) · **Workflow disruption**: ZERO

---

## 1. Intent

Accept the **structural Windows-native constraint** (per Anthropic CC sandbox doc, sandboxing is supported on macOS / Linux / WSL2 only — not Windows native), and codify the sca-v9 §6 5-control layered-defense as an **operator-acceptance-record equivalent** to OS-sandboxing, with full cite-anchor + wave-trail + operator-signed acceptance.

This option preserves the runtime's Z:-portable Windows-native posture (a hard constraint per CLAUDE.local.md L4 + the entire `Z:/...` path discipline), and lifts R5 from "partial-hold" to "equivalent-hold via documented exception" — provided all 5 layered-defense controls are demonstrably wired.

## 2. Theory-of-equivalence

Per `https://code.claude.com/docs/en/sandboxing` "How sandboxing relates to permissions":

> "Effective sandboxing requires **both** filesystem and network isolation. Without network isolation, a compromised agent could exfiltrate sensitive files like SSH keys. Without filesystem isolation, a compromised agent could backdoor system resources to gain network access."

The Anthropic threat model for sandboxing is **compromise-agent-exfiltration** (SSH keys) + **compromise-agent-backdoor** (system resources). The sca-v9 §6 5-control layered-defense addresses these threats via independent compensating controls:

| Anthropic-sandbox threat | OS-sandbox primitive | sca-v9 §6 5-control equivalent |
|---|---|---|
| **Exfiltration of secrets** | `sandbox.filesystem.denyRead` + `network.allowedDomains` | Control 1 (`permissions.deny` enumerates secrets-class paths) + Control 3 (gitleaks PreToolUse) + Control 4 (egress policy) |
| **Backdoor system resources** | `sandbox.filesystem.denyWrite` (system paths) + Seatbelt/bubblewrap process-level isolation | Control 1 (`permissions.deny` enumerates `~/.ssh/`, `~/.config/codex/`, registry-hives) + Control 5 (drift detection on git pre-commit + SHA-pinned plugins) |
| **Audit-trail gap (post-incident forensics)** | OS-level syscall log (Seatbelt/bubblewrap can emit audit lines) | Control 2 (PreToolUse hook → `.claude/state/audit/<YYYY-MM-DD>.jsonl` SHA-256 hash chain) |

**Falsifiable-inverse**: if any one of the 5 controls is shown to be unwired or bypassable, the equivalence claim BREAKS. This is the operator-acceptance-record's load-bearing falsifiable claim.

## 3. Paste-ready settings.json patches (minimal — preserve current bypassPermissions + sandbox.enabled=false)

The settings.json patch under Option C is **minimal** — only the `permissions.deny` array is expanded with the secrets-class paths that sca-v9 §6 Control 1 enumerates. The `defaultMode: "bypassPermissions"` and `sandbox.enabled: false` stay UNCHANGED.

### Patch C1 — expand permissions.deny (replace L72-91)

```json
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
  "Read(**/.codex/**)",
  "Read(**/.anthropic/**)",
  "Read(**/AppData/Roaming/Mozilla/Firefox/Profiles/**)",
  "Read(**/AppData/Local/Google/Chrome/User Data/**)",
  "Read(**/AppData/Roaming/Microsoft/Edge/User Data/**)",
  "Read(**/Library/Application Support/Firefox/Profiles/**)",
  "Read(**/HKEY_LOCAL_MACHINE/**)",
  "Read(**/HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run/**)",
  "Bash(curl http://*)",
  "Bash(wget http://*)",
  "Bash(sudo *)",
  "Bash(chmod 777 *)",
  "WebFetch(domain:bit.ly)",
  "WebFetch(domain:tinyurl.com)",
  "WebFetch(domain:t.co)"
]
```

**New entries (15)**: `.codex/`, `.anthropic/`, browser-profile dirs (Firefox/Chrome/Edge — Windows + macOS paths), registry-hive read patterns, dangerous Bash predicates (curl http://, wget http://, sudo, chmod 777), shortener-domain WebFetch denies.

### Patch C2 — sandbox block UNCHANGED (no edit)

```json
"sandbox": {
  "enabled": false,                  ← UNCHANGED (Windows-native structural-constraint accepted)
  "failIfUnavailable": false,        ← UNCHANGED
  "autoAllowBashIfSandboxed": true,  ← UNCHANGED
  "excludedCommands": ["git", "docker", "npx", "uvx"],   ← UNCHANGED
  "allowUnsandboxedCommands": true   ← UNCHANGED
}
```

### Patch C3 — defaultMode UNCHANGED

```json
"defaultMode": "bypassPermissions"   ← UNCHANGED (preserved per Z:-portable + autonomous-loop velocity)
```

### Patch C4 — operator-acceptance-record (NEW FILE; OUT OF Stream C SCOPE)

`docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` (DRAFT BELOW — operator signs and commits separately; this stream does NOT create the acceptance record).

```markdown
# Operator Acceptance Record — R5 Layered-Defense Equivalence

**Effective**: <DATE>
**Operator**: <OPERATOR-NAME-OR-HANDLE>
**Signed-commit**: <SHA>
**Re-attestation cadence**: per-wave (every multi-stream wave revalidates)

I, the operator, accept that:
1. The runtime is Windows 11 Pro native, Z:-portable install. Per Anthropic CC sandbox doc, this platform is NOT in the sandbox-supported list.
2. WSL2 migration is currently OUT-OF-SCOPE per Z:-portable hard constraint.
3. Cardinal rule R5 ("Safety boundaries via Claude Code permissions + sandboxing") is held via the sca-v9 §6 5-control layered-defense as documented equivalence:
   - Control 1: deny-default permissions (`permissions.deny` enumeration; `permissions.allow` explicit narrow allowlist; `defaultMode: "bypassPermissions"` PRESERVED with the explicit acceptance that the load-bearing security boundary is the layered-defense, not the in-CC permission-prompt)
   - Control 2: audit logging (PreToolUse hook → audit JSONL; SHA-256 hash chain)
   - Control 3: secret redaction (gitleaks PreToolUse; trivy fs PostToolUse)
   - Control 4: egress policy (operator-confirmed POSTs; chrome-devtools-mcp sandbox-mode)
   - Control 5: drift detection (git pre-commit; SHA-pinned plugins; CR-9 .mcp.json compliance)

**Falsifiable-inverse signature**: if a quarterly audit shows ANY of the 5 controls unwired or bypassable, this acceptance record is invalidated and R5 reverts to "partial-hold" until the gap is closed.

**Cite-anchors**: per sca-v9 §6 (3-org-distinct per control: NIST 800-53 + OWASP + Microsoft/Google/CIS/CNCF/SLSA/freedesktop.org).
```

This acceptance record is the **operator-signed deviation-record** from Anthropic-canonical R5; it must be referenced in CLAUDE.md cardinal-rule R5 corollary ("R5-W325-corollary: documented exception per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md`").

## 4. Required follow-up wiring (sca-v9 §6 Controls 2 + 5 are NOT wired today)

Option C is the lowest-friction settings.json patch but ONLY justifies R5 equivalence IF Controls 2 + 5 are wired. Status today:

| Control | Wired today? | Wire-up gap |
|---|---|---|
| 1 (deny-default permissions) | ◐ PARTIAL — `permissions.deny` exists with 17 entries; Patch C1 adds 15 more | Apply Patch C1 |
| 2 (audit logging) | ✗ NOT WIRED | New PreToolUse hook (CR-2 sanctioned-exception class; ≤2KB) writing to `.claude/state/audit/<YYYY-MM-DD>.jsonl` with SHA-256 hash chain |
| 3 (secret redaction) | ✓ WIRED — gitleaks PreToolUse already in settings.json | (W317 F-V6-1 trivy fs PostToolUse adds advisory layer) |
| 4 (egress policy) | ◐ PARTIAL — chrome-devtools-mcp default sandbox-mode; operator-confirm convention | Codify operator-confirm prompt in CLAUDE.md or as a skill |
| 5 (drift detection) | ◐ PARTIAL — pre-commit gitleaks; SHA-pinned `.mcp.json` per CR-9 | Add quarterly drift-audit + capability-registry probe from W323 STREAM-4-RESEARCH-ARCH-V9.md §4 |

**Wire-up effort**: ~2 waves (W326 audit-hook + W327 drift-audit + acceptance-record commit).

## 5. Smoke-test sequence

```powershell
# (a) CC restart — verify no change
claude --version
claude doctor

# (b) deny-rule probe — new denies fire
# Inside CC: Read("Z:/users/<u>/AppData/Local/Google/Chrome/User Data/Default/Cookies") → expect blocked
# Inside CC: Bash("sudo whoami") → expect blocked
# Inside CC: Read("**/.codex/auth.json") → expect blocked

# (c) gitleaks PreToolUse probe (Control 3 wired today)
# Inside CC: Write a file with `AKIA[A-Z0-9]{16}` → expect PreToolUse hook fires (gitleaks rule)

# (d) drift-detect probe (Control 5 partial)
# Edit .mcp.json to add an MCP server without @version pin → expect pre-commit lint fires
# (Δ34 supersession-chain lint hook from W317 Stream-A wired today)

# (e) bypassPermissions preserved
# Inside CC: Bash("ipconfig") → expect silent-execute (no prompt)
# Inside CC: Bash("git status") → expect silent-execute

# (f) audit-log probe (Control 2 NOT WIRED yet)
# After applying Patch C1 + Patch C-audit (W326): every Bash/Edit/Write should append a row to .claude/state/audit/<TODAY>.jsonl
```

## 6. Rollback

```powershell
# Patch C1 is additive to permissions.deny; revert by dropping the 15 new entries:
git -C Z:/claude-sota-installed log -1 --format=%H -- .claude/settings.json
git -C Z:/claude-sota-installed revert <commit-sha>

# No sandbox or defaultMode flips to undo → trivial revert.
```

**Rollback time**: <1 min · **Data-loss risk**: NONE

## 7. Risk-class breakdown

| Risk | Level | Mitigation |
|------|-------|-----------|
| **Deviation from Anthropic-canonical R5** | LOW | Documented-exception record + cite-anchored 3-org-distinct per control + quarterly re-attestation + falsifiable-inverse signature. NIST 800-53 + OWASP + Microsoft Zero-Trust explicitly endorse compensating-control approaches. |
| **R5 still partial-hold on paper** | MED | CLAUDE.md cardinal-rule text technically requires "permissions + sandboxing"; Option C explicitly accepts that "+sandboxing" is via OS-sandbox-equivalent layered-defense, not OS-sandbox itself. Operator-acceptance-record makes this explicit-not-silent. |
| **Workflow disruption** | ZERO | bypassPermissions preserved → no new permission-prompts. The 15 new deny entries cover paths that no current workflow needs to read. |
| **Configuration complexity** | LOW | No new schema knobs; only permissions.deny expansion. Operator mental-model unchanged. |
| **MCP friction** | LOW | MCP tools unaffected. |
| **Hook side-effects** | LOW (Patch C1) → MED (when Control 2 audit-hook lands W326) | Audit-hook is ≤2KB CR-2 sanctioned-exception; non-blocking by design. |
| **codex cross-model gate** | LOW | Unaffected. |
| **Wave-trail credibility** | LOW | 7-wave convergent finding + sca-v9 §6 codification + operator-acceptance-record = full provenance chain. |

## 8. Cite-anchors

- **Anthropic CC sandbox doc**: `https://code.claude.com/docs/en/sandboxing` — confirms macOS/Linux/WSL2 platform support (Windows native NOT in list) → structural-constraint basis for Option C
- **Anthropic CC settings doc**: `https://code.claude.com/docs/en/settings` — permissions.deny + sandbox-settings schema
- **CCBP**: `claude-settings.md:262` — bypassPermissions semantics + carve-outs (protected paths still prompt; catastrophic-removal still prompt; deny rules always respected)
- **CCBP**: `claude-settings.md:249` — skipDangerousModePermissionPrompt semantics
- **sca-v9 §6**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:289-313` — 5-control layered-defense codification with 3-org-distinct anchors per control (NIST 800-53 + OWASP + Microsoft/Google/CIS/CNCF/SLSA/freedesktop.org/gitleaks)
- **NIST 800-53 AC-3(3)** Mandatory Access Control — Control 1 anchor
- **NIST 800-53 AU-2** Event Logging — Control 2 anchor
- **NIST 800-53 SC-28** Protection of Info at Rest — Control 3 anchor
- **NIST 800-53 SC-7** Boundary Protection — Control 4 anchor
- **NIST 800-53 CM-8** Component Inventory — Control 5 anchor
- **OWASP A01-2021 / A02-2021 / A06-2021 / A09-2021 / A10-2021** — sca-v9 §6 OWASP-tier anchors
- **Microsoft Zero-Trust** — `https://learn.microsoft.com/en-us/security/zero-trust/` — deny-default + layered-defense doctrine
- **CIS Critical Security Controls v8.1** — `https://www.cisecurity.org/controls/` — Control 3 + Control 8 alignment
- **CNCF NetworkPolicy** — `https://kubernetes.io/docs/concepts/services-networking/network-policies/` — Control 4 egress-policy spec
- **SLSA v1.0 L3 Pinned Inputs** — `https://slsa.dev/spec/v1.0/requirements` — Control 5 anchor (already wired via CR-9 W286-arc-P0C)
- **W324 wave**: `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md:41-141` — sca-v9 SHIP + R5 carry-forward
- **W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D**: 7-wave SHIP-BLOCKER provenance chain

## 9. Operator-decision criteria (when to choose Option C)

Choose Option C if:
- Runtime MUST stay on Windows native (Z:-portable is a hard constraint)
- Operator wants zero workflow disruption + full audit-trail compliance
- Comfortable with documented-exception + cite-anchored + falsifiable-inverse equivalence record
- Wants R5 to lift from "partial-hold" to "equivalent-hold" without OS migration
- Plans to wire Controls 2 + 5 fully in W326-W327 (audit-hook + drift-audit)

Decline Option C if:
- Compliance regime requires actual OS-level sandboxing (e.g., FedRAMP High, HIPAA, ISO 27001 strict-audit) → choose Option A + WSL2 migration
- Operator does not accept the documented-exception posture as cardinal-rule-compliant
- Cannot commit to wiring Controls 2 + 5 within 2 waves

## 10. Estimated effort

- **Apply Patch C1**: ~5 min (Edit settings.json + commit + smoke-test)
- **Sign operator-acceptance-record + CLAUDE.md R5 corollary edit**: ~10 min
- **Wire Control 2 (audit-hook)**: ~1 wave (W326)
- **Wire Control 5 (quarterly drift-audit)**: ~0.5 wave (W327)
- **Total to "R5 equivalent-hold"**: ~1.5 waves
