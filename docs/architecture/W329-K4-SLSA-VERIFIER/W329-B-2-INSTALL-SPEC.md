# W329-B-2 — `slsa-verifier` install spec (operator-interactive paste-ready)

> **Wave**: W329 Stream B. **Date**: 2026-05-19. **HEAD**: `5cf5c90`.
> **Candidate**: `slsa-framework/slsa-verifier` @ `v2.7.1`. **Verdict**: T1 INSTALL (per W329-B-1 §5; install_score 4.627; D-EMP 4 HARD GATE PASS).
> **Risk class**: LOW (verifier is read-only; exits 1 on failure; pure-binary install).
> **Cardinal-rule compliance**: R1 trusted-source (Linux Foundation / OpenSSF / slsa-framework canonical); R5 safety via permissions (operator-interactive install, NO automated `gh release download` action).

## §1 Pin reference (audit-stable)

| Field | Value | Anchor |
|---|---|---|
| Release tag | `v2.7.1` | https://github.com/slsa-framework/slsa-verifier/releases/tag/v2.7.1 |
| Release published | 2025-06-27T15:41:51Z | gh-release-latest |
| Source commit SHA | `ea584f4502babc6f60d9bc799dbbb13c1caa9ee6` | `gh-tag-v2.7.1-shasum` |
| Windows asset | `slsa-verifier-windows-amd64.exe` | gh-windows-asset |
| Windows asset size | 33,884,672 bytes (33.88 MB) | gh-windows-asset |
| **Windows asset sha256** | **`1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0`** | SHA256SUM.md v2.7.1 + gh-windows-asset digest |
| Provenance asset | `slsa-verifier-windows-amd64.exe.intoto.jsonl` | gh-windows-asset |
| Provenance asset sha256 | `a2f03a246790787f0f2a2ce793fda17077f0e51b4ff06ed37964fe18a89a346f` | gh-windows-asset |
| Asset URL | https://github.com/slsa-framework/slsa-verifier/releases/download/v2.7.1/slsa-verifier-windows-amd64.exe | gh-windows-asset |
| Provenance URL | https://github.com/slsa-framework/slsa-verifier/releases/download/v2.7.1/slsa-verifier-windows-amd64.exe.intoto.jsonl | gh-windows-asset |
| Builder ID (from intoto provenance) | `https://github.com/slsa-framework/slsa-github-generator/.github/workflows/builder_go_slsa3.yml` | DeepWiki §Verification > Artifacts |
| Source URI (for self-verify) | `github.com/slsa-framework/slsa-verifier` | DeepWiki + README §Artifacts |

## §2 Install path (Z:-portable convention)

| Path | Purpose |
|---|---|
| `Z:/tools/slsa-verifier.exe` | Binary install (matches existing convention — `gitleaks` is at `Z:/tools/`; `github-mcp-server.exe` is at `Z:/tools/github-mcp-server.exe`) |
| `Z:/tools/slsa-verifier.exe.intoto.jsonl` | Provenance archive (for self-verify smoke-test + audit-trail) |
| `Z:/tools/` on PATH | Already present (`tools-dir-listing-detail` confirms current binaries are PATH-accessible) — operator verifies in §6 |

## §3 PRIMARY install (paste-ready, operator-interactive — Windows)

> **Operator runs interactively at PowerShell prompt.** Stream B does NOT execute this (cardinal-rule-5 + R1 trusted-source operator-confirm gate).

```powershell
# §3.1 — Download the Windows binary + provenance attestation from GitHub Releases
# Requires: gh CLI authenticated (already present in this runtime)
cd Z:/claude-sota-installed
gh release download v2.7.1 `
  --repo slsa-framework/slsa-verifier `
  --pattern "slsa-verifier-windows-amd64.exe" `
  --pattern "slsa-verifier-windows-amd64.exe.intoto.jsonl" `
  --dir Z:/tools/

# §3.2 — Rename for portability + audit-trail
Move-Item Z:/tools/slsa-verifier-windows-amd64.exe Z:/tools/slsa-verifier.exe -Force
# Keep .intoto.jsonl named alongside for the smoke-test in §5

# §3.3 — Verify SHA256 against pinned expected hash (DEFENSE-IN-DEPTH layer 1)
$expected = "1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0"
$actual = (Get-FileHash Z:/tools/slsa-verifier.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -ne $expected) {
  Write-Error "SHA256 MISMATCH — expected $expected, got $actual. ABORT — DO NOT use this binary."
  Remove-Item Z:/tools/slsa-verifier.exe -Force
  exit 1
} else {
  Write-Host "SHA256 verified: $actual"
}
```

## §4 ALTERNATIVE install (operator-discretion — go install)

> Per W324-P8 Decision-B precedent. Equivalent outcome; differs in trust-anchor (Go module proxy vs GitHub Releases binary).

```powershell
# Requires: go 1.23+ (this runtime has go 1.26.1 verified W324)
go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.1
# Binary lands in $env:GOPATH/bin or $env:USERPROFILE/go/bin
# Operator must ensure that dir is on $PATH OR copy/symlink to Z:/tools/slsa-verifier.exe
```

**Trade-off**: `go install` re-builds from source (cardinal-rule reproducibility weaker — Go-module-proxy chain) vs GitHub-release binary (signed by slsa-framework/slsa-github-generator builder — SLSA L3 self-attested). PRIMARY path (§3) preferred for R1 + D33 attestation-chain-completeness=5.

## §5 Smoke-test (paste-ready — DEFENSE-IN-DEPTH layer 2 — self-verify provenance)

```powershell
# §5.1 — Verify binary is on PATH (idempotency check)
$cmd = Get-Command slsa-verifier -ErrorAction SilentlyContinue
if (-not $cmd) {
  $env:PATH = "Z:/tools;" + $env:PATH
  $cmd = Get-Command slsa-verifier -ErrorAction SilentlyContinue
}
if (-not $cmd) {
  Write-Error "slsa-verifier NOT on PATH — fix PATH OR copy binary to a PATH-accessible dir"
  exit 1
}

# §5.2 — Version smoke
slsa-verifier version
# Expected: prints version 2.7.1 + commit + tree-state

# §5.3 — CANONICAL SELF-VERIFY smoke-test (the perfect dogfood:
# verifier verifies its OWN release artifact's provenance)
slsa-verifier verify-artifact `
  Z:/tools/slsa-verifier.exe `
  --provenance-path Z:/tools/slsa-verifier-windows-amd64.exe.intoto.jsonl `
  --source-uri github.com/slsa-framework/slsa-verifier `
  --source-tag v2.7.1
# Expected output (success):
#   Verified signature against tlog entry index <N> at URL: https://rekor.sigstore.dev/api/v1/log/entries/...
#   Verified build using builder https://github.com/slsa-framework/slsa-github-generator/.github/workflows/builder_go_slsa3.yml@refs/tags/v1.x.x at commit <SHA>
#   PASSED: Verified SLSA provenance
# Exit code: 0
```

**On smoke-test PASS**: D-EMP lifts 4→5 (W329-B-1 §2 D-EMP note) — would clear T0 IMMEDIATE-UPGRADE floor IF a re-litigation in W330+ wanted to upgrade tier.

**On smoke-test FAIL**: investigate (most likely cause: PATH issue with intoto.jsonl filename match; verify file rename in §3.2 preserved the `.intoto.jsonl` suffix on the un-renamed provenance file).

## §6 PATH check (idempotency post-install)

```powershell
# Confirm Z:/tools is on PATH (already true in this runtime per gitleaks/gh wiring)
if ($env:PATH -notmatch "Z:[\\/]tools") {
  Write-Warning "Z:/tools NOT on PATH — adding for this session only"
  $env:PATH = "Z:/tools;" + $env:PATH
}
# Persistent fix (if needed; usually already done per claude-sota-installed runtime):
# [Environment]::SetEnvironmentVariable("PATH", "Z:\tools;" + $env:PATH, "User")
```

Note: `Z:/tools` is already PATH-resident in this runtime (`Get-Command gitleaks` resolves; `Get-Command github-mcp-server` resolves). Operator confirms `Get-Command slsa-verifier` resolves post-§3.

## §7 Operator action checklist

- [ ] §3.1 — `gh release download v2.7.1 ...` runs cleanly (binary + intoto.jsonl land in Z:/tools/)
- [ ] §3.2 — `Move-Item slsa-verifier-windows-amd64.exe → slsa-verifier.exe` completes
- [ ] §3.3 — SHA256 matches expected `1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0`
- [ ] §5.2 — `slsa-verifier version` prints `2.7.1`
- [ ] §5.3 — Self-verify smoke-test exits 0 with "PASSED: Verified SLSA provenance"
- [ ] §6 — `Get-Command slsa-verifier` resolves to `Z:/tools/slsa-verifier.exe`

Once §7 checklist complete, runtime is ready for K-4 supply-chain wire-up (W329-B-3 wire spec).

## §8 Rollback (D11 cost_of_revert=5/5)

```powershell
# Single-command revert
Remove-Item Z:/tools/slsa-verifier.exe -Force
Remove-Item Z:/tools/slsa-verifier-windows-amd64.exe.intoto.jsonl -Force -ErrorAction SilentlyContinue
# <1 sec; no state mutation; no plugin-cache cleanup; no settings.json edit
```

## §9 Re-verification cadence (sca-v11 §6 decay state machine)

- **Re-verify due**: W333 (4 waves out) OR upon `slsa-verifier` minor/major bump (currently v2.7.1; next likely v2.7.2 or v2.8.0 per cadence)
- **Status**: NEW-ACTIVE pending operator §7 checklist completion
- **Decay watchlist**: pushedAt drift > 6 months OR OpenSSF Scorecard score drop ≥1.0 OR SECURITY.md disclosure event → re-litigate immediately

## §10 References (cite-anchored)

- **GitHub repo**: https://github.com/slsa-framework/slsa-verifier (327★ / 64 forks / Apache-2.0 / Go)
- **v2.7.1 release**: https://github.com/slsa-framework/slsa-verifier/releases/tag/v2.7.1
- **SHA256SUM.md**: https://github.com/slsa-framework/slsa-verifier/blob/main/SHA256SUM.md
- **README §Installation > Download the binary**: gh-readme indexed section
- **DeepWiki**: https://deepwiki.com/slsa-framework/slsa-verifier
- **SLSA spec v1.0**: https://slsa.dev/spec/v1.0/ (referenced by README badge)
- **SLSA spec v1.2 (current)**: https://slsa.dev/spec/v1.2/
- **OpenSSF Scorecard**: https://api.securityscorecards.dev/projects/github.com/slsa-framework/slsa-verifier (score 7.4 @ 2026-05-15)
- **OpenSSF Best Practices badge**: https://bestpractices.coreinfrastructure.org/projects/6729 (InProgress badge)
- **Sigstore Rekor TLog** (used by verifier): https://rekor.sigstore.dev
- **W324-P8 prior decision**: `Z:/claude-sota-installed/docs/architecture/W324-WAVE/P8-SLSA-VERIFIER-AND-SIGNED-AUDIT-DECISION.md`
- **W327-D-1 §5 remediation foundation**: indexed sections from W327 Stream D
