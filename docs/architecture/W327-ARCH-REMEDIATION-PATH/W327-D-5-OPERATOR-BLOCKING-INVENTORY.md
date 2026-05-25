# W327-D-5 — Operator-Blocking Items Inventory (W328+ Carry)

**Date**: 2026-05-19 **Wave**: W327 Stream D **Scope**: Items NOT addressable by Claude or codex; require operator decision/action before remediation path can proceed.
**Methodology**: Items here are EXCLUDED from W327-D-1 remediation map composite-lift projection (cannot be acted on autonomously); inventoried as W328+ blocking-class carry-overs with paste-ready specifications for each.
**Security**: All credential literals redacted as `<redacted-W327-D>`.

---

## §1 R5 Sandbox Decision (K-1 Path 2A vs 2B)

**Wave-dwell**: 8 waves (W316-S1 → W325-C → W326-D → W327-D)
**Blocking-class**: OPERATOR-AUTHORITY ONLY (Claude cannot decide deviation from Anthropic-canonical R5)
**Severity**: CRITICAL (codex K-1)

### Paste-ready operator spec

**Decision options**:

**Option 2A — RECLASSIFY** (recommended per W325-C decision matrix 4.85/5)
- Z:-portable Windows-native PRESERVED (hard constraint per CLAUDE.local.md L4)
- Workflow disruption: ZERO
- Effort: S (1-wave) reclassify + sign acceptance-record; M (3-wave) wire Controls 2+5
- Net composite-lift: +0.350 (4.036 → 4.386)
- **Operator action**:
  1. Sign `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` (draft in W325-C Option C §3 Patch C4)
  2. Rename W325-C "EQUIVALENT-HOLD" → "R5-WINDOWS-NATIVE-ACCEPTED-RISK" across 3 docs + sca-v10 SKILL.md §6
  3. CLAUDE.md L1 R5 corollary line (CLAUDE.md body-LOC budget: at-cap; corollary goes in `CLAUDE.local.md` env-block comments instead)

**Option 2B — TIGHTEN** (Anthropic-canonical R5 hard hold)
- Requires WSL2/devcontainer/VM migration (3-5 wave prereq; Z:-portable constraint RELAXED)
- Workflow disruption: HIGH (dozens of new permission-prompts per session)
- Effort: L (7-wave) including migration
- Net composite-lift: +0.700 (4.036 → 4.736)
- **Operator action**:
  1. Approve WSL2 install + relax Z:-portable constraint
  2. settings.json deltas:
     - `permissions.defaultMode` → `"default"`
     - `permissions.disableBypassPermissionsMode` → `"disable"`
     - `sandbox.failIfUnavailable` → `true`
     - `sandbox.allowUnsandboxedCommands` → `false`
     - `sandbox.excludedCommands` → drop `npx`, `uvx`

**Decision deadline**: W328 entry (blocking K-6 hooks wiring)
**Operator confirms**: ___________  **Date**: ___________ **Choice**: ☐ 2A  ☐ 2B  ☐ STAY-PARTIAL-HOLD (re-decide W329)

---

## §2 Langfuse SEV-1 Key Rotation (precondition for K-2 OTel)

**Wave-dwell**: NEW (K-2 fix surfaces requirement)
**Blocking-class**: OPERATOR-AUTHORITY (key generation + secret hygiene)
**Severity**: HIGH (precondition for K-2 +0.500 composite-lift)

### Paste-ready operator spec

**Pre-condition for K-2 OTel headers fix**:
- CLAUDE.local.md already has `$env:LANGFUSE_PUBLIC_KEY = 'pk-lf-<redacted-W327-D>'` + `$env:LANGFUSE_SECRET_KEY = 'sk-lf-<redacted-W327-D>'`
- BUT: keys are project-specific (5.17.2026 / id `cmpa0h6ux0003o6067jlf4jgd`); verify they have permission to ingest from `service.name=claude-code` traces

**Operator verification steps**:
1. Visit `http://127.0.0.1:3000/project/cmpa0h6ux0003o6067jlf4jgd/settings/api-keys`
2. Confirm keys are ACTIVE + not expired
3. (Optional) Rotate keys if untrusted:
   ```powershell
   # New keys from Langfuse UI
   $env:LANGFUSE_PUBLIC_KEY = 'pk-lf-<NEW>'
   $env:LANGFUSE_SECRET_KEY = 'sk-lf-<NEW>'
   ```
4. Re-save to CLAUDE.local.md (gitignored) and reload CC session

**Verification**:
- After K-2 OTel headers fix lands, `mcp__langfuse__get-trace` (or `curl http://127.0.0.1:3000/api/public/traces`) should return ≥1 span with `service.name=claude-code` within 24h

**Operator confirms**: ___________  **Date**: ___________

---

## §3 Perplexity SEV-1 Key Rotation

**Wave-dwell**: 7 waves (W319-SEV1-INCIDENT)
**Blocking-class**: OPERATOR-AUTHORITY
**Severity**: HIGH (P0 carry; impacts D43 perplexity_research_signal scoring)

### Paste-ready operator spec

**Current state**: API key `pplx-<redacted-W327-D>` was leaked in W319 outer-research session; rotation pending

**Operator action**:
1. Visit `https://www.perplexity.ai/settings/api`
2. Revoke leaked key
3. Generate new key
4. Update CLAUDE.local.md (gitignored):
   ```powershell
   $env:PERPLEXITY_API_KEY = 'pplx-<NEW-redacted-W327-D>'
   ```
5. Verify via `mcp__perplexity__perplexity_ask` returns 200

**Verification**: D43 perplexity_research_signal scoring can resume (currently advisory-only per sca-v10 SKILL.md:326)

**Operator confirms**: ___________  **Date**: ___________

---

## §4 W323-4 Dims-Absorb Decision (Option A/B/C per W326-B-2)

**Wave-dwell**: 2 waves (W323-4 design → W325-B carry → W326-D round-13 re-surface as K-4)
**Blocking-class**: CLAUDE-AUTHORITY (codex round-N ratify); paste-ready spec; NO operator-decision needed but per discipline operator may co-ratify

### Paste-ready spec

**3 W323-4 designed dims need ship decision**:

**Option A — SHIP ALL 3 in sca-v11**:
- D39 supply_chain_attestation (W_install=0.5 / W_pattern=0.3)
- D40 layered_defense_depth (W_install=0.4 / W_pattern=0.2)
- D41 degraded_mode_explicit (W_install=0.4 / W_pattern=0.3)
- Composite denom: install 36.8 → 37.7; pattern 16.0 → 16.8

**Option B — SHIP D39 only**:
- Keeps D40+D41 PROSE-only in sca-v11 §6
- Lower denom delta + less methodology change

**Option C — DEFER all 3 to W331+**:
- Status quo PROSE-only continues
- Loss: K-4 composite-lift +0.500 not realized

**Claude recommendation**: Option A (bundle in W329 sca-v11 design pass with K-3 skip-N/A split)

**Operator confirms** (optional co-ratify): ___________  **Date**: ___________

---

## §5 Commit-Signing Decision

**Wave-dwell**: NEW (K-1 Path 2A + K-6 signed-audit-trails wire depend on commit-signing for trust-chain)
**Blocking-class**: OPERATOR-AUTHORITY (GPG/SSH key generation + Git config)
**Severity**: MED (precondition for full K-6 signed-audit-trails attestation)

### Paste-ready operator spec

**Current state**: Git commits NOT signed (`git log --show-signature` returns NO signatures)
**Required for**: K-1 Path 2A acceptance-record commit + K-6 signed-audit-trails plugin trust-chain

**Operator action**:
1. Generate GPG or SSH signing key (per `https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification`):
   ```powershell
   # GPG (recommended)
   gpg --full-generate-key
   git config --global user.signingkey <KEY-ID>
   git config --global commit.gpgsign true

   # SSH (alternative)
   ssh-keygen -t ed25519 -C "operator@<host>"
   git config --global gpg.format ssh
   git config --global user.signingkey "C:/Users/<user>/.ssh/id_ed25519.pub"
   git config --global commit.gpgsign true
   ```
2. Add key to GitHub (Settings → SSH and GPG keys)
3. Verify next commit: `git log --show-signature -1`
4. Optional: pre-commit hook can ALSO enforce `gpg --verify` per W326-D-3 §K-6 §4 egress policy

**Operator confirms**: ___________  **Date**: ___________

---

## §6 WSL2 Scorecard Install (K-1 Path 2B Prereq)

**Wave-dwell**: NEW (K-1 Path 2B contingency)
**Blocking-class**: OPERATOR-AUTHORITY (Windows feature install + reboot + Z:-portable constraint relax)
**Severity**: ONLY-IF Path 2B chosen

### Paste-ready operator spec

**Operator action (if Path 2B selected)**:
1. Enable WSL2 Windows feature:
   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -All
   Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All
   # Reboot required
   wsl --set-default-version 2
   wsl --install -d Ubuntu-24.04
   ```
2. Migrate runtime:
   - Re-clone `claude-sota-installed` inside WSL2 (e.g. `~/claude-sota-installed`)
   - Update CLAUDE.local.md HOME isolation: `$env:USERPROFILE = '/home/<user>/claude-sota-installed'`
   - Verify sandbox enables: `claude doctor` → expect "Sandboxing: bubblewrap available"
3. Apply Path 2B settings.json deltas (see §1 Option 2B)

**Effort**: 3-5 wave prereq before Path 2B can land
**Operator confirms**: ___________  **Date**: ___________

---

## §7 EXA API Key Register

**Wave-dwell**: 1 wave (W324 P5 carry-over)
**Blocking-class**: OPERATOR-AUTHORITY (account creation + key generation)
**Severity**: LOW (EXA MCP shipped pinned but key absent → MCP fails on first invoke)

### Paste-ready operator spec

**Current state**: `.mcp.json` declares exa MCP server `npx -y exa-mcp-server@3.2.1` with `${EXA_API_KEY}` interpolation; CLAUDE.local.md has commented placeholder

**Operator action**:
1. Register account at `https://exa.ai/`
2. Generate API key (Settings → API Keys → Create)
3. Update CLAUDE.local.md (gitignored):
   ```powershell
   $env:EXA_API_KEY = 'exa-<redacted-W327-D>'
   ```
4. Optional: also register `$env:TAVILY_API_KEY` from `https://tavily.com/` (per W324 P5)
5. Reload CC session; verify `mcp__exa__web_search_exa` returns 200

**Verification**: D42 multi_mcp_convergence_signal can include exa/tavily as additional families (currently bounded by perplexity outage)

**Operator confirms**: ___________  **Date**: ___________

---

## §8 Inventory Summary

| # | Item | Wave-dwell | Class | Composite-lift IF resolved | Block-source K-N |
|---|---|---|---|---|---|
| 1 | R5 sandbox decision | 8 | OPERATOR | +0.350 (2A) or +0.700 (2B) | K-1 |
| 2 | Langfuse key verify | 0 | OPERATOR | (precondition for K-2 +0.500) | K-2 |
| 3 | Perplexity rotation | 7 | OPERATOR | restore D43 scoring | (none direct) |
| 4 | W323-4 dims-absorb | 2 | CLAUDE+codex-ratify | (precondition for K-4 +0.500) | K-4 |
| 5 | Commit-signing | 0 | OPERATOR | (precondition for K-6 full attest) | K-6 |
| 6 | WSL2 install | 0 | OPERATOR | (precondition for K-1 Path 2B) | K-1 |
| 7 | EXA key | 1 | OPERATOR | minor D42 boost | (none direct) |

**Total operator-blocking items**: 7 (3 SEV-HIGH carry-overs; 4 precondition-for-K-N)
**W328+ carry recommendation**: items #1 + #2 + #4 are CRITICAL-PATH for W328-W330 composite-lift projection.

---

## §9 Cite-anchor master

- W327-D-1 §10 (carry-items table)
- W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md (10 P0 carry items)
- W325-R5-UNBLOCK-EXPLORE STREAM-C-OPTION-C-LAYERED-DEFENSE.md §3 Patch C4 (acceptance-record draft)
- W319-SEV1-INCIDENT (Perplexity key leak)
- W323-COMPREHENSIVE-AUDIT-WAVE STREAM-4 (D39+D40+D41 design)
- W326-D-2 §Concern 1 + §Concern 6 (codex K-1 + K-6)
- W324 P5 carry (EXA + TAVILY keys)
- External SOTA: GitHub commit-signing docs + WSL2 install docs + Langfuse self-hosting docs
