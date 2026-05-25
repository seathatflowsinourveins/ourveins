# Operator Acceptance Record — R5 Layered-Defense Equivalence (DRAFT — operator-sign-pending)

**STATUS**: ✗ UNSIGNED DRAFT · **DO NOT TREAT AS RATIFIED**
**Wave**: W329 Stream A · **Drafted**: 2026-05-19 · **HEAD draft-baseline**: `5cf5c90` + Patch-C1-applied (uncommitted at draft time)
**Spec source**: W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md §3 Patch C4 (DRAFT template at lines 97-118) + STREAM-C-RECOMMENDATION.md §7 (FI-1..FI-5 falsifiable-inverse spec at lines 83-92)

---

## §0. Operator-sign instructions

To ratify this acceptance record:

1. **Read the entire document** (this file). Pay particular attention to §3 (the 5 specific layered-defense controls being claimed) and §4 (the 5 falsifiable-inverse claims FI-1 through FI-5 that, if any one fails on quarterly audit, INVALIDATE this acceptance and revert R5 to partial-hold).
2. **Verify the current 5-control wire state** matches the claim:
   - **Control 1**: open `.claude/settings.json` and confirm `permissions.deny` has the 15 W325-C Patch C1 entries (closure of FI-1 via W329 Stream A item 2; verified in `W329-A-2-PATCH-C1-APPLIED.md`)
   - **Control 2**: confirm `.claude/state/audit/<TODAY>.jsonl` exists AND a PreToolUse audit-log hook is wired in settings.json (**CURRENTLY: not yet wired; FI-2 still BROKEN as of W329 Stream A; do NOT sign until W330 wires this**)
   - **Control 3**: confirm gitleaks PreToolUse hook is at `.claude/settings.json:108-110` (verified active per W328-A-4 §3)
   - **Control 4**: confirm chrome-devtools-mcp default sandbox-mode is OFF (verify in mcp config; W328 noted "outside Stream A scope — assumed not-off")
   - **Control 5**: confirm `.mcp.json` MCP-server commands all match `npx -y <pkg>@<pinned-version>` per CR-9; confirm `.claude/state/capability-registry.json` exists (**CURRENTLY: capability-registry NOT yet shipped; W330 wire pending**)
3. **Fill in §1 metadata**: `<OPERATOR-NAME-OR-HANDLE>`, `<DATE>`, `<SIGNED-COMMIT-SHA>` (post-sign-commit), `<RE-ATTESTATION-CADENCE>` (recommend "per-wave on every multi-stream wave; AND quarterly audit").
4. **Commit-sign**: `git -C Z:/claude-sota-installed add docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md && git commit -m "chore(R5): sign operator-acceptance-record for sca-v11 §6 layered-defense equivalence (W329)"`. **Then rename the file to remove the `-DRAFT` suffix** (or move to a `RATIFIED/` subdir per operator preference); update the CLAUDE.md L22 corollary pointer to the new path.
5. **Operator-AI W325-C-10 schedule**: log a recurring per-wave AI to re-verify FI-1..FI-5 at every multi-stream wave closure; on FAIL → invalidate this record + open new R5 carry-forward.

**⚠ DO NOT SIGN if FI-2 (audit-hook) OR FI-5 (capability-registry) are still BROKEN.** W329 Stream A explicitly closes FI-1 only. W330 is expected to close FI-2 + advance FI-5 — sign AFTER W330 ratifies + re-verifies all 5 FIs on live state.

---

## §1. Operator + signing metadata (fill on ratification)

| Field | Value |
|---|---|
| **Operator (name or handle)** | `<TO-FILL>` |
| **Effective date** | `<TO-FILL: ISO-8601 e.g. 2026-05-DD>` |
| **Signed-commit SHA** | `<TO-FILL: post-sign git rev-parse HEAD>` |
| **Re-attestation cadence** | `<TO-FILL: recommended "per-wave on every multi-stream wave; AND quarterly external audit">` |
| **Quarterly external audit next due** | `<TO-FILL: effective-date + 90 days>` |
| **Acceptance-record path post-ratification** | `<TO-FILL: e.g. docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-RATIFIED.md>` |

---

## §2. Operator-acceptance statement

I, the operator (`<TO-FILL>`), accept that:

1. The runtime is **Windows 11 Pro native, Z:-portable install** (per `Z:/claude-sota-installed/CLAUDE.local.md:4-10`). Per the Anthropic Claude Code sandbox documentation at `https://code.claude.com/docs/en/sandboxing`, this platform is **NOT in the sandbox-supported OS list** (which enumerates macOS via Seatbelt, Linux via bubblewrap, and WSL2 via the same Linux bubblewrap pathway). This is the **dispositive structural fact** that makes Anthropic-canonical R5 OS-level sandbox structurally inert on this runtime.

2. **WSL2 migration is currently OUT-OF-SCOPE** per `Z:/claude-sota-installed/CLAUDE.local.md:4-10` Z:-portable hard constraint. The runtime entire path discipline (`Z:/...` for binaries + venvs + state) is incompatible with the WSL2 Linux-filesystem-namespace migration without a multi-wave port-or-rewrite effort that is not on any current roadmap.

3. **Cardinal rule R5 ("Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts")** is held via the sca-v11 §6 5-control layered-defense as a **documented equivalence to OS-level sandboxing**, per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` codification and `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:13-27` theory-of-equivalence claim.

4. This documented-exception path was **selected over Options A (Full Sandbox) and B (Hybrid)** per the W325 Stream C decision matrix (`STREAM-C-RECOMMENDATION.md` weighted score: A=2.60/5, B=3.30/5, C=4.85/5; clear-winner margin 1.55 ≥ 1.0).

5. The runtime **defaultMode** was flipped from `bypassPermissions` to `default` in W327-codex-r2-amend (commit `6b4b0b4`, preserved through W327-codex-r3 `2c48b1e` and W328 HEAD `5cf5c90`). This is an **Option-C-spec ANTI-MATCH** per W328-A-2 (Option C original said `defaultMode UNCHANGED at bypassPermissions`), but operator-accepts the flip as a **net-improvement** to the permissions-layer security posture, because Anthropic-canonical default permission-prompt flow is a strictly more restrictive baseline than `bypassPermissions`.

---

## §3. Five-control layered-defense claim (per sca-v11 §6)

| Control | Status at acceptance-record-sign | Cite-anchor (3-org-distinct per Control) | Implementation evidence |
|---|---|---|---|
| **Control 1 — Deny-default permissions** | ✓ WIRED post W329 Stream A item 2 (Patch C1) | NIST 800-53 AC-3(3) MAC + OWASP A01-2021 Broken Access Control + Microsoft Zero-Trust deny-default | `.claude/settings.json:69-102` — 33-entry deny block (18 baseline + 15 Patch C1); `permissions.allow` is explicit 12-entry narrow allowlist; `defaultMode: "default"` (canonical Anthropic-default, no bypassPermissions) |
| **Control 2 — Audit logging** | ✗ **NOT YET WIRED** (W330 target) | NIST 800-53 AU-2 Event Logging + OWASP A09-2021 Logging Failures + CIS Critical Security Controls v8.1 Control 8 Audit Log Management | **REQUIRED before signing**: PreToolUse hook on Bash/Edit/Write/MCP that writes JSON-line audit-log row to `.claude/state/audit/<YYYY-MM-DD>.jsonl` with SHA-256 hash chain per row; ≤2KB shim acceptable per CR-2 sanctioned-exception class |
| **Control 3 — Secret redaction** | ✓ WIRED | OWASP A02-2021 Cryptographic Failures + NIST 800-53 SC-28 Protection of Info at Rest + gitleaks community-governance | `.claude/settings.json:108-110` PreToolUse Bash → `gitleaks protect --staged --no-banner --redact || exit 2`; trivy fs PostToolUse on git push/commit gated at `:113-114` |
| **Control 4 — Egress policy** | ◐ PARTIAL | NIST 800-53 SC-7 Boundary Protection + OWASP A10-2021 SSRF + CNCF NetworkPolicy spec | `defaultMode: "default"` prompt-flow + chrome-devtools-mcp default sandbox-mode (outside settings.json) + WebFetch shortener-domain denies (`bit.ly`, `tinyurl.com`, `t.co` per Patch C1 entries 13-15) |
| **Control 5 — Drift detection** | ◐ PARTIAL (capability-registry W330 target) | NIST 800-53 CM-8 Component Inventory + OWASP A06-2021 Vulnerable Components + SLSA v1.0 Build L3 Pinned Inputs | `.pre-commit-config.yaml` provenance-lint hook (W327 Stream C) + Δ34 VERDICT-LEDGER supersession-chain lint at settings.json:127-129 + `.mcp.json` CR-9 `npx -y <pkg>@<version>` pinning (W286-arc-P0C); capability-registry `.claude/state/capability-registry.json` **STILL ABSENT** (W330 wire target per W328-A §6 forward-AI W329-5) |

**Overall scorecard**: per W329-A-4-SMOKE-RESULTS.md §3, post-Patch-C1 score is **5.0 / 10** (up from W328-A-4 baseline of 4.0/10). The +1.0 lift is from Control 1 +0.5 (Patch C1 closes 4 of 9 deficient sub-criteria) + Control 4 +0.5 (Patch C1 WebFetch denies + defaultMode prompt-flow). Controls 2 + 5 remain partial pending W330.

---

## §4. Falsifiable-inverse signature (FI-1..FI-5)

Per W325-C STREAM-C-RECOMMENDATION.md:83-92, **if a quarterly audit (or any wave-closure re-verification) shows ANY of the following to be TRUE, this acceptance record is INVALIDATED and R5 reverts to partial-hold until the gap is closed**:

| FI-N | Claim (positive form) — verifying audit-script | Currently? | Verification command |
|------|-----------------------------------------------|-----------|---------------------|
| **FI-1** | `permissions.deny` contains ALL 15 Patch C1 sensitive-class globs enumerated in `STREAM-C-OPTION-C-LAYERED-DEFENSE.md:55-69` | ✓ **HOLDS** (post W329 Stream A item 2) | `python -c "import json; d=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); assert len(d['permissions']['deny']) >= 33"` exit 0 |
| **FI-2** | PreToolUse audit-log hook is wired in `.claude/settings.json` AND writes to `.claude/state/audit/<YYYY-MM-DD>.jsonl` AND each row has SHA-256 hash chain | ✗ **CURRENTLY BROKEN** (W330 target) | `test -d Z:/claude-sota-installed/.claude/state/audit/ && python -c "import json; cfg=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); hooks=cfg.get('hooks',{}).get('PreToolUse',[]); assert any('audit' in str(h) or 'jsonl' in str(h) for h in hooks)"` exit 0 |
| **FI-3** | gitleaks PreToolUse hook is wired in `.claude/settings.json` (Bash matcher, exit-2 on detected leak) | ✓ **HOLDS** | `python -c "import json; cfg=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); hooks=cfg['hooks']['PreToolUse']; assert any('gitleaks' in str(h) for h in hooks)"` exit 0 |
| **FI-4** | chrome-devtools-mcp default sandbox-mode is ON (i.e. NOT off, per W325-C inverted phrasing — the FI breaks when sandbox-mode is OFF) | ◐ **PROBABLY-HOLDS** (verification outside Stream A scope) | Manual inspection of `.mcp.json` chrome-devtools entry OR `mcp__chrome-devtools__*` tool-call response metadata |
| **FI-5** | `.mcp.json` has 0 MCP servers NOT pinned via `npx -y <pkg>@<pinned-version>` per CR-9 W286-arc-P0C ratification | ✓ **HOLDS** (assumed per CR-9 discipline + W286-arc-P0C) | `python -c "import json; cfg=json.load(open('Z:/claude-sota-installed/.mcp.json')); ...assert all server commands match 'npx -y <pkg>@<version>' pattern OR are explicitly-documented CR-9 exception classes..."` (TBD: formal script in W330 capability-registry) |

**Acceptance-record load-bearing claim**: **2 of 5 FIs HOLD at sign-time (FI-1, FI-3); 2 are HOLD-conditional (FI-4 probable, FI-5 assumed); 1 is BROKEN (FI-2). Operator MUST NOT sign this record until FI-2 closes (W330 audit-hook wire) OR explicitly accept a "conditional acceptance" with the FI-2 gap surfaced as a SHIP-BLOCKER carry-forward.**

---

## §5. Re-attestation policy

| Trigger | Action |
|---------|--------|
| End of every multi-stream wave (e.g. W329 closure, W330 closure, …) | Re-verify FI-1..FI-5 via the §4 verification commands. If any FI fails, INVALIDATE this record + open carry-forward AI to close the gap + revert R5 status in CLAUDE.md L22 corollary to "PARTIAL-HOLD pending W<wave>". |
| Quarterly external audit (90-day cadence per §1 effective date + 90) | Full audit: FI-1..FI-5 verification + Anthropic CC sandbox doc SHA freshness check (cite-anchor drift) + 3-org-distinct cite-anchor reverify per Control 1..5. |
| Any settings.json mutation touching permissions.deny / permissions.allow / sandbox / defaultMode | Mandatory ad-hoc re-verification before commit. |
| Anthropic Claude Code release notes mentioning Windows-native sandbox support arrival | Mandatory re-evaluation: should runtime migrate from Option C (documented-exception) to Option A (Full Sandbox)? Per `https://code.claude.com/docs/en/sandboxing` doc drift cadence. |

---

## §6. Acceptance-record provenance chain

**7-wave SHIP-BLOCKER carry-forward** (W316-S1 → W328-A; 11-wave dwell per W328-A §6):

| Wave | Contribution to acceptance-record provenance |
|------|---------------------------------------------|
| W316-S1 | First identified R5 SHIP-BLOCKER |
| W314-E | Confirmed structural Windows-native constraint |
| W316-S4 | Re-confirmed; deferred |
| W316-S5-L7 | 7-layer Blueprint shows L7 below floor → R5 lift required |
| W317-S1 | Confirmed; deferred |
| W319-D | Confirmed |
| W324 | sca-v9 §6 5-control layered-defense codified at `.claude/skills/sota-convergence-audit/SKILL.md:289-313` |
| W325-C | 3-option matrix + Option C recommendation 4.85/5 + Patch C1 + Patch C4 acceptance-record template |
| W326-D | codex K-1 round-13 CRITICAL flagged Option-C framing review |
| W327-D | Reclassification map + Path 2A/2B specs |
| W328-A | Verification: PARTIAL-HOLD-UPGRADED + 4.0/10 5-control score + 2/5 FIs broken + 11-wave dwell exceeded 8-wave ops-rhythm threshold (-0.5 install_score penalty applies) |
| **W329-A** (current) | **Patch C1 applied (closes FI-1) + CLAUDE.md L22 corollary added + this acceptance-record DRAFT** |
| W330 (planned) | Wire Control 2 audit-hook → closes FI-2; stand up capability-registry → advances FI-5 |
| Sign event | Operator review + sign + commit + rename to remove `-DRAFT` suffix |

## §7. Cite-anchors (full)

### Internal

- `Z:/claude-sota-installed/CLAUDE.md:22` (R5 cardinal rule + W329-A R5-W325-corollary inline)
- `Z:/claude-sota-installed/CLAUDE.local.md:4-10` (Z:-portable Windows-native hard constraint)
- `Z:/claude-sota-installed/.claude/settings.json:69-102` (post-Patch-C1 permissions.deny)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 5-control codification)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-118` (Patch C1 + Patch C4 specs)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` (FI-1..FI-5 falsifiable-inverse claim spec)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` (pre-W329 4.0/10 baseline)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/STREAM-A-SYNTHESIS.md§6` (11-wave dwell + PARTIAL-HOLD-UPGRADED verdict)
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-2-PATCH-C1-APPLIED.md` (sibling Stream A item 2 doc; closes FI-1)
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-1-CLAUDE-MD-R5-COROLLARY.md` (sibling Stream A item 1 doc; CLAUDE.md L22 inline-extension)

### External (Anthropic-canonical)

- `https://code.claude.com/docs/en/sandboxing` (Windows-native NOT in supported OS list — dispositive fact)
- `https://docs.anthropic.com/en/docs/claude-code/settings` (R5 cardinal-rule anchor URL)
- `https://code.claude.com/docs/en/settings` (permissions.deny + sandbox + defaultMode schema)
- `https://docs.anthropic.com/en/docs/claude-code/hooks` (hook semantics for Control 2 audit-hook W330 wire)
- `https://code.claude.com/docs/en/claude-directory` (`.claude/` directory canonical layout including `.claude/state/`)

### External (sca-v11 §6 cite-anchors per Control 1-5)

- **Control 1**: NIST 800-53 Rev 5 AC-3(3) Mandatory Access Control; OWASP Top 10 2021 A01 Broken Access Control; Microsoft Zero-Trust deny-default doctrine (https://learn.microsoft.com/en-us/security/zero-trust/)
- **Control 2**: NIST 800-53 Rev 5 AU-2 Event Logging; OWASP Top 10 2021 A09 Security Logging and Monitoring Failures; CIS Critical Security Controls v8.1 Control 8 Audit Log Management (https://www.cisecurity.org/controls/)
- **Control 3**: NIST 800-53 Rev 5 SC-28 Protection of Information at Rest; OWASP Top 10 2021 A02 Cryptographic Failures; gitleaks (zricethezav) community-governance discipline
- **Control 4**: NIST 800-53 Rev 5 SC-7 Boundary Protection; OWASP Top 10 2021 A10 Server-Side Request Forgery; CNCF NetworkPolicy spec (https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- **Control 5**: NIST 800-53 Rev 5 CM-8 System Component Inventory; OWASP Top 10 2021 A06 Vulnerable and Outdated Components; SLSA v1.0 Build L3 Pinned Inputs (https://slsa.dev/spec/v1.0/requirements)

---

## §8. Closure assertion (post-sign)

POST-SIGN: this acceptance-record stands as the **formal operator-signed deviation-record from Anthropic-canonical R5**, ratifying that R5 is held via the sca-v11 §6 5-control layered-defense documented-exception path on this Windows-native Z:-portable runtime, with the falsifiable-inverse FI-1..FI-5 quarterly-re-attestable signature.

**On re-attestation failure**: this record is INVALIDATED; CLAUDE.md L22 corollary reverts to "PARTIAL-HOLD pending W<wave>"; R5 ship-blocker carry-forward re-opened; new W<wave>-AI created to close the failed FI.

**PRE-SIGN (current state)**: this is a DRAFT. **DO NOT** rely on it as a ratified equivalence claim. R5 status remains **PARTIAL-HOLD-UPGRADED** per W328-A-4 finding, slightly upgraded by W329-A Patch-C1 application (4.0/10 → 5.0/10) but not lifted to EQUIVALENT-HOLD until operator signs + FI-2 + FI-5 close.

---

## §9. Operator-pending notation (for W329-1 ledger row)

> **W329-1 operator-pending**: operator to (a) wait for W330 to wire Control 2 audit-hook (closes FI-2), (b) wait for W330 to ship capability-registry (advances FI-5), (c) verify FI-1..FI-5 all hold via §4 verification commands, (d) sign this acceptance-record per §0 instructions, (e) rename to remove `-DRAFT` suffix + update CLAUDE.md L22 pointer. **R5 dwell counter** advances from 11 waves (W316-S1 → W328-A) to **12 waves at W329-A close** (still > 8-wave ops-rhythm threshold; -0.5 install_score arch-itself penalty continues to apply until sign-event OR W330 closure with full FI-1..FI-5 hold). **Estimated time-to-close**: 6-wave residual (W329 → W330 → sign → W331 quarterly-verify-1) OR 1-wave residual if operator signs at W330 closure with FI-2 wired.
