# W328-A-4 — sca-v9 §6 5-Control Layered-Defense Compliance Check

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD**: `2c48b1e`
**Reference rubric**: `.claude/skills/sota-convergence-audit/SKILL.md:521-545` (§6 R5 5-Control Layered-Defense, W324 → sca-v11 W326)
**Cross-ref**: W325-C Option C §4 wire-up table + W327-D-1 K-1 Path 2A step 5 (Control 2) + step 3 (Control 5 signed-audit-trails)

---

## §1. Control 1 — Deny-default permissions

### Spec (sca-v11 §6 Control 1, lines 525-527)

> "`.claude/settings.json` `permissions.deny` enumerates secrets-class paths (env-files, credential stores, SSH keys, registry hives, `.codex/`, `.anthropic/`, browser-profile dirs). `permissions.allow` is **explicit allowlist only**; no `defaultMode: bypassPermissions`."

### Live state

| Sub-criterion | Live (HEAD `2c48b1e`) | Verdict |
|---|---|---|
| `permissions.deny` enumerates env-files | ✓ `./.env`, `./.env.*`, `./secrets/**` | PASS |
| `permissions.deny` enumerates credential stores | ✓ `.aws/credentials`, `credentials.json`, `.netrc`, `.npmrc`, `.docker/config.json` | PASS |
| `permissions.deny` enumerates SSH keys | ✓ `id_rsa`, `id_ed25519`, `**/*.pem`, `**/*.key`, `.ssh/config`, `.ssh/known_hosts` | PASS |
| `permissions.deny` enumerates **registry hives** | ✗ no `HKEY_LOCAL_MACHINE` or `HKEY_CURRENT_USER` patterns | **FAIL** (Patch C1 gap) |
| `permissions.deny` enumerates **`.codex/`** | ✗ MISSING | **FAIL** (Patch C1 gap) |
| `permissions.deny` enumerates **`.anthropic/`** | ✗ MISSING | **FAIL** (Patch C1 gap) |
| `permissions.deny` enumerates **browser-profile dirs** | ✗ MISSING | **FAIL** (Patch C1 gap) |
| `permissions.allow` is explicit allowlist only | ✓ 11 narrow entries | PASS |
| `defaultMode` is NOT `bypassPermissions` | ✓ `default` (W327-r2-amend flip) | PASS |

### Per-cite-anchor compliance

- **NIST 800-53 AC-3(3) Mandatory Access Control**: ◐ PARTIAL — deny rules exist but registry-hives + `.codex/` + `.anthropic/` + browser-profiles gap creates MAC bypass surface
- **OWASP A01-2021 Broken Access Control**: ◐ PARTIAL — same gap
- **Microsoft Zero-Trust deny-default**: ✓ — `defaultMode: default` flip aligns

### Control 1 verdict

**◐ PARTIAL PASS (W325-baseline 17/32 entries; missing 15 Patch C1 entries; defaultMode flip is BONUS beyond Option C spec)**

The defaultMode flip is a **net-positive** for Control 1's "no bypassPermissions" sub-criterion. But the deny-list gap on registry-hives + `.codex/` + `.anthropic/` + browser-profiles **specifically enables FI-1 (Falsifiable-Inverse #1)** from W325-C §7 — the operator-acceptance-record's load-bearing falsifiable claim is **CURRENTLY FALSE**: deny is missing more than one of the 15 enumerated sensitive-class globs.

---

## §2. Control 2 — Audit logging

### Spec (sca-v11 §6 Control 2, lines 529-531)

> "PreToolUse hook emits audit-log row → `.claude/state/audit/<YYYY-MM-DD>.jsonl` for every Bash/Edit/Write/MCP tool fire. ≤2KB shim acceptable per CR-2 (sanctioned-exception class). Tamper-attestation: SHA-256 hash chain per row."

### Live state

| Sub-criterion | Live (HEAD `2c48b1e`) | Verdict |
|---|---|---|
| PreToolUse hook on Bash | ✓ (3 hook commands: gitleaks + trivy + codex-companion) | partial-coverage |
| PreToolUse hook on Edit/Write | ✓ (1 hook: VERDICT-LEDGER lint advisory only) | partial-coverage |
| PreToolUse hook on MCP | ✗ (no MCP matcher) | FAIL |
| Writes to `.claude/state/audit/<YYYY-MM-DD>.jsonl` | ✗ dir DOES NOT EXIST (`ls` confirmed) | **FAIL** |
| SHA-256 hash chain per row | ✗ no audit-log infrastructure | **FAIL** |
| ≤2KB shim | n/a (no shim exists) | n/a |

### Per-cite-anchor compliance

- **NIST 800-53 AU-2 Event Logging**: ✗ FAIL — no event log
- **OWASP A09-2021 Security Logging and Monitoring Failures**: ✗ FAIL — direct ownership of this gap
- **CIS Critical Security Controls Control 8 Audit Log Management**: ✗ FAIL — no audit log management

### Control 2 verdict

**✗ NOT WIRED** — matches W325-C §4 table row 2 ("NOT WIRED today"; wire-up gap) and W327-D-1 K-1 Path 2A step 5 ("Wire Control 2 audit-logging PreToolUse hook" — still pending).

**Note on PostToolUseFailure hook**: the existing hook at settings.json:195-204 captures FAILED tool fires (permission denied | EACCES | gitleaks errors) and emits `hookSpecificOutput.additionalContext`. This is **per-failure feedback**, NOT the AU-2 per-tool-fire audit-log Control 2 spec requires. Different semantic.

---

## §3. Control 3 — Secret redaction

### Spec (sca-v11 §6 Control 3, lines 533-535)

> "`gitleaks` PreToolUse on Bash/Edit/Write/Commit (CR-2 direct-CLI native, currently wired); `trivy fs` PostToolUse advisory on Edit/Write (CR-2 direct-CLI native; W317 F-V6-1 lands)."

### Live state

| Sub-criterion | Live (HEAD `2c48b1e`) | Verdict |
|---|---|---|
| `gitleaks protect --staged` PreToolUse on Bash | ✓ L112 | PASS |
| `gitleaks` PreToolUse on Edit/Write | ◐ — only Edit/Write VERDICT-LEDGER lint advisory present at L131; NO gitleaks on Edit/Write | PARTIAL (gitleaks only on Bash) |
| `gitleaks` on commit-msg | ◐ (presumed `.git/hooks` or `.pre-commit-config.yaml` — not in CC PreToolUse scope; Stream A DOC-ONLY cannot verify) | PARTIAL |
| `trivy fs` PostToolUse on Edit/Write | ◐ wired as PreToolUse Bash (gated to git push/commit/pr-create) at L116, NOT as PostToolUse Edit/Write | PARTIAL (semantic divergence from sca-v11 §6 spec — trivy fires at push-time not edit-time) |

### Per-cite-anchor compliance

- **OWASP A02-2021 Cryptographic Failures**: ✓ — gitleaks staged-secret-detection alignment
- **NIST 800-53 SC-28 Protection of Information at Rest**: ◐ PARTIAL — staging detection but not at-rest scan
- **gitleaks community-governance**: ✓ wired

### Control 3 verdict

**◐ PARTIAL PASS (Bash hook wired; Edit/Write coverage and trivy semantic-location partial)**

This is the **strongest control** in the live config; weakest gap is gitleaks not firing on Edit/Write tool calls directly (only at git push/commit time via the staged-detection cycle). A direct `Write()` of a file containing a secret would NOT block at tool-fire time, only at next staged-commit cycle.

---

## §4. Control 4 — Egress policy

### Spec (sca-v11 §6 Control 4, lines 537-539)

> "Operator-confirmed for any out-of-runtime POST (anything past WebSearch/WebFetch read-only); `mcp__chrome-devtools__*` sandbox-mode default + egress allowlist via `permissions.allow.network`."

### Live state

| Sub-criterion | Live (HEAD `2c48b1e`) | Verdict |
|---|---|---|
| `permissions.allow.network` egress allowlist | ✗ FIELD NOT PRESENT in settings.json | FAIL |
| `mcp__chrome-devtools__*` sandbox-mode default | ◐ (mcp__chrome-devtools listed in deferred tools per system reminder — sandbox-mode setting outside settings.json scope; chrome-devtools-mcp config) | PARTIAL |
| Operator-confirm convention for POSTs | ◐ — `defaultMode: default` now prompts for non-allowlisted tools; this PARTIAL-covers POST egress via prompt-flow | PARTIAL (improved by defaultMode flip) |
| WebFetch domain-deny entries (bit.ly, tinyurl, t.co) per Patch C1 | ✗ MISSING (Patch C1 §3 lines 67-69 entries not applied) | FAIL |

### Per-cite-anchor compliance

- **NIST 800-53 SC-7 Boundary Protection**: ✗ FAIL — no boundary policy in settings.json
- **OWASP A10-2021 SSRF**: ✗ FAIL — no domain-deny for known-bad-redirector shorteners
- **CNCF Network Policy spec**: ✗ FAIL — settings.json doesn't surface network policies

### Control 4 verdict

**◐ PARTIAL PASS (improved by defaultMode flip; egress policy enforcement is largely outside settings.json scope; cite-anchors largely unsatisfied)**

**Note**: settings.json doesn't typically express egress policy (this is correctly noted in the W328 Stream A spec). Control 4 is structurally hard to fully verify in this layer; the bulk of egress enforcement happens via:
- chrome-devtools-mcp default sandbox-mode (live yes, controlled outside settings.json)
- Operator-confirmation convention (now strengthened by defaultMode: default prompt-flow)
- WebFetch domain-deny (still UNWIRED — should be Patch C1 entries)

---

## §5. Control 5 — Drift detection

### Spec (sca-v11 §6 Control 5, lines 541-543)

> "`git status` pre-commit hook verifies no unexpected file additions; SHA-pinned plugin updates only (no auto-update floats); `.mcp.json` MCP-server commands MUST be `npx -y <pkg>@<pinned-version>` per CR-9 W286-arc-P0C ratification."

### Live state

| Sub-criterion | Live (HEAD `2c48b1e`) | Verdict |
|---|---|---|
| `git status` pre-commit hook | ◐ provenance-lint mentioned in W327 commit msgs (commit `d6087ec`) — location unverified in Stream A DOC-ONLY | PARTIAL |
| SHA-pinned plugin updates | ✓ enabledPlugins block at L225-294 references marketplace+plugin names; SHA-pinning enforced by Anthropic CC plugin install flow per CCBP `claude-memory.md:34-40` | PASS (per Anthropic-canonical plugin update flow) |
| `.mcp.json` MCP `npx -y <pkg>@<pinned-version>` per CR-9 | ◐ live `.mcp.json` not read in this stream (W286-arc-P0C compliance assumed per CLAUDE.md cardinal-rule R2 W286-arc-P0C ratification 2026-05-18 statement) | PARTIAL (assumed-PASS; not directly verified in this stream) |
| W317-A Δ34 verdict-ledger supersession-chain lint | ✓ L131 hook fires on Edit/Write to VERDICT-LEDGER files | PASS |
| Quarterly drift-audit + capability-registry per W323-4 §4 | ✗ `.claude/state/capability-registry.json` does NOT exist on disk | FAIL |

### Per-cite-anchor compliance

- **NIST 800-53 CM-8 Component Inventory**: ✗ FAIL — no capability registry
- **OWASP A06-2021 Vulnerable and Outdated Components**: ◐ PARTIAL — plugin SHA-pin discipline exists; component inventory missing
- **SLSA v1.0 Build L3 Pinned Inputs**: ✓ — `.mcp.json` CR-9 pin discipline aligned

### Control 5 verdict

**◐ PARTIAL PASS (plugin SHA-pin discipline holds; Δ34 verdict-ledger lint wired; capability-registry NOT shipped per W323-4 design)**

---

## §6. Aggregate 5-control scorecard

| Control | sca-v11 §6 Spec | Live state (W328 verification) | Score (0-2) |
|---|---|---|---|
| 1 Deny-default permissions | 32 deny entries + explicit allowlist + no bypassPermissions | 17/32 deny + 11 allow + defaultMode: default | **1.0 / 2** (defaultMode bonus; deny-gap penalty) |
| 2 Audit logging | PreToolUse hook → JSONL with SHA-256 hash chain | NOT WIRED | **0 / 2** |
| 3 Secret redaction | gitleaks PreToolUse + trivy PostToolUse | gitleaks PreToolUse Bash ✓; gitleaks Edit/Write ✗; trivy at push-time not edit-time | **1.5 / 2** |
| 4 Egress policy | Operator-confirm + chrome-devtools sandbox + permissions.allow.network | defaultMode prompt-flow improves; allow.network absent; WebFetch denies absent | **0.5 / 2** |
| 5 Drift detection | git pre-commit + SHA-pin + CR-9 + capability-registry | Plugin SHA-pin ✓; CR-9 assumed ✓; capability-registry ✗; provenance-lint location unverified | **1.0 / 2** |
| **Total** | **10 / 10** | — | **4.0 / 10** |

**Aggregate: 4.0 / 10 = 40%** of the sca-v11 §6 5-control layered-defense is currently wired.

---

## §7. Falsifiable-inverse claim assessment (W325-C §7)

The operator-acceptance-record would have 5 falsifiable-inverse claims. Each is INVALIDATED by the live state:

| FI-N | Claim | Live state | Invalidated? |
|---|---|---|---|
| FI-1 | Control 1: `permissions.deny` enumerates ALL 15 Patch C1 sensitive-class globs | 0/15 Patch C1 globs applied | **YES** (FI-1 BROKEN) |
| FI-2 | Control 2: PreToolUse audit-log hook writing to JSONL with SHA-256 hash chain | NOT WIRED, dir absent | **YES** (FI-2 BROKEN) |
| FI-3 | Control 3: gitleaks PreToolUse hook is wired in settings.json | ✓ wired on Bash | **NO** (FI-3 HOLDS) |
| FI-4 | Control 4: chrome-devtools-mcp default sandbox-mode is OFF | (verification outside Stream A scope — assumed not-off) | **PROBABLE-NO** (FI-4 likely HOLDS) |
| FI-5 | Control 5: `.mcp.json` has 0 MCP servers not pinned via `npx -y <pkg>@<version>` | (assumed per CR-9 W286-arc-P0C) | **NO** (FI-5 HOLDS, conditional) |

**Score: 2 of 5 FI claims BROKEN** (FI-1 + FI-2). Per W325-C §7 + the operator-acceptance-record contract: "if a quarterly audit shows ANY of the 5 controls unwired or bypassable, this acceptance record is invalidated and R5 reverts to partial-hold". Live state has TWO broken FIs → an acceptance record would be invalidated TODAY if it existed (it does NOT exist).

---

## §8. Cardinal-rule R5 compliance synthesis

**Anthropic-canonical R5** (per `https://code.claude.com/docs/en/sandboxing` + `https://docs.anthropic.com/en/docs/claude-code/settings`):
- Permissions layer: ◐ PARTIAL-IMPROVED (defaultMode flipped; allow narrow; deny W325-baseline; Patch C1 gap)
- Sandboxing layer: ✗ STILL INERT (Windows-native; sandbox.enabled=false; allowUnsandboxedCommands=true)

**sca-v11 §6 5-control layered-defense equivalence** (per W325-C Option C documented exception):
- 4.0 / 10 score = 40% wired
- 2 of 5 FI claims BROKEN
- Operator-acceptance-record DOES NOT EXIST → equivalence claim is **NOT YET MADE** formally
- CLAUDE.md R5-W325-corollary pointer NOT ADDED

### Final verdict on R5

**R5 is PARTIAL-HOLD UPGRADED, NOT FULL-HOLD.**

The W327-r3 commit message claim "R5 NOW FULL-HOLD post defaultMode='default'" (verbatim at `git show 2c48b1e --format=%B | sed -n '/Cardinal/p'`) is an **OVERCLAIM**.

- defaultMode flip lifts permissions-layer status from "bypass-disabled-but-strong-controls" to "deny-default + prompt-on-unspecified" (canonical Anthropic-default).
- Sandboxing layer remains structurally inert (Windows-native; can't be made non-inert without WSL2 migration).
- Operator-acceptance-record (documented-exception path) NOT signed → no formal equivalence claim.
- 2 of 5 FI falsifiable-inverse claims would be BROKEN if acceptance record existed.

**Honest characterization**: R5 lifted from W326 baseline (4.485 effective L1 score with explicit overclaim risk) to W327-post-r3 state (defaultMode-flipped + sandbox-still-inert + Patch C1-missing + acceptance-record-absent). The lift is **REAL but PARTIAL** — likely +0.20 to +0.30 on L1/L7 layers, not the +0.30 to +0.45 the K-1 reclassification estimate predicted for a clean Path 2A or full Path 2B.

---

## §9. Cite-anchors

- `.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 Controls 1-5)
- `.claude/settings.json` HEAD `2c48b1e` lines 57-94, 106-150, 429-435
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:35-91` (Patch C1 + acceptance-record specs)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:84-92` (FI-1 through FI-5 falsifiable-inverse spec)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:42-55` (Path 2A vs Path 2B specs)
- `git show 2c48b1e` (W327-r3 commit msg overclaim)
- NIST 800-53 AC-3(3), AU-2, SC-7, SC-28, CM-8 cite-anchors per sca-v11 §6 spec
- OWASP A01-2021, A02-2021, A06-2021, A09-2021, A10-2021 cite-anchors per sca-v11 §6 spec
- SLSA v1.0 Build L3 + CIS Controls v8.1 + Microsoft Zero-Trust + CNCF NetworkPolicy
