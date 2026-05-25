# Item-D — slsa-verifier v2.7.1 Install (T1)

**Status**: DESIGN-COMPLETE — operator-side install + acceptance-test required.

**Wave**: W331 Stream-GIT P0-5 item (d)
**Cite-anchor**: sca-v11.1 §1 existence-probe Stage-0 + CLAUDE.md L43 W329-K-4 composite +0.07 ETA.

## T1 install design

slsa-verifier is a single static binary that verifies SLSA build-provenance attestations against released artifacts. It is the canonical verifier maintained by the SLSA framework (Linux Foundation OpenSSF). Source: `https://github.com/slsa-framework/slsa-verifier`.

### Stage-0 — existence probe

```powershell
# Probe: is slsa-verifier already installed?
$probe = Get-Command slsa-verifier -ErrorAction SilentlyContinue
if ($null -ne $probe) {
    Write-Host "slsa-verifier already at: $($probe.Source)"
    & slsa-verifier --version
    exit 0
}
Write-Host "slsa-verifier NOT installed — proceeding to Stage-1 download"
```

### Stage-1 — download v2.7.1 release artifact

Authority: SLSA-framework upstream releases. Download via `gh release download`:

```powershell
# Operator-side install — run from any directory with gh authenticated
gh release download v2.7.1 `
    --repo slsa-framework/slsa-verifier `
    --pattern slsa-verifier-windows-amd64.exe `
    --dir Z:/tools
```

### Stage-2 — sha256 verification

Expected sha256 (provided in task brief): `1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0`.

```powershell
$expected = '1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0'
$actual   = (Get-FileHash Z:/tools/slsa-verifier-windows-amd64.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) {
    Write-Host "SHA256 OK: $actual"
} else {
    Write-Host "SHA256 MISMATCH — expected: $expected, got: $actual"
    Remove-Item Z:/tools/slsa-verifier-windows-amd64.exe
    exit 1
}
```

### Stage-3 — rename + path-wire

```powershell
# Rename to canonical executable name
Move-Item Z:/tools/slsa-verifier-windows-amd64.exe Z:/tools/slsa-verifier.exe

# Verify it runs
& Z:/tools/slsa-verifier.exe version
# Expected output: slsa-verifier version v2.7.1, commit <sha>, build-date <ts>
```

Optionally add `Z:/tools` to PATH (already PATH-resolved per `tools/eee.ps1` convention).

### Stage-4 — SLSA self-provenance verification (recursive)

slsa-verifier v2.x can verify its OWN SLSA provenance attestation. The release ships a `*.intoto.jsonl` attestation file alongside the binary:

```powershell
# Download the attestation
gh release download v2.7.1 `
    --repo slsa-framework/slsa-verifier `
    --pattern "slsa-verifier-windows-amd64.intoto.jsonl" `
    --dir Z:/tools

# Self-verify: verify slsa-verifier's own provenance using slsa-verifier itself
& Z:/tools/slsa-verifier.exe verify-artifact `
    --provenance-path Z:/tools/slsa-verifier-windows-amd64.intoto.jsonl `
    --source-uri github.com/slsa-framework/slsa-verifier `
    --source-tag v2.7.1 `
    Z:/tools/slsa-verifier.exe
# Expected: "PASSED: SLSA verification passed"
```

Note: the in-toto attestation format references the BUILT artifact (`slsa-verifier-windows-amd64.exe`), so verify BEFORE the rename — OR pass the original-name artifact to `verify-artifact`. Operator-side adjustment required.

## Wiring — `tools/slsa-verify-wrap.ps1` helper

Skeleton-only design (not implemented this wave). The helper wraps slsa-verifier with CR-1-trust-tuple-aware defaults for the W331 plugin-install workflow:

```powershell
# tools/slsa-verify-wrap.ps1 — SKELETON
# CR-1 trust-tuple checker for plugin downloads
param(
    [Parameter(Mandatory)][string]$ArtifactPath,
    [Parameter(Mandatory)][string]$SourceUri,      # e.g. github.com/<owner>/<repo>
    [Parameter(Mandatory)][string]$SourceTag,      # e.g. v0.1.0
    [string]$ProvenancePath = ""                    # default: same-name + .intoto.jsonl
)

# Resolve provenance path
if ([string]::IsNullOrWhiteSpace($ProvenancePath)) {
    $ProvenancePath = "$ArtifactPath.intoto.jsonl"
}

# Existence probe
$verifier = Get-Command slsa-verifier -ErrorAction SilentlyContinue
if ($null -eq $verifier) {
    Write-Error "slsa-verifier not on PATH — see docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-D-SLSA-VERIFIER-INSTALL.md"
    exit 2
}

# Verify
& $verifier.Source verify-artifact `
    --provenance-path $ProvenancePath `
    --source-uri $SourceUri `
    --source-tag $SourceTag `
    $ArtifactPath

$rc = $LASTEXITCODE
if ($rc -eq 0) {
    Write-Host "CR-1 trust-tuple (a) signed-release: PASS for $ArtifactPath"
} else {
    Write-Host "CR-1 trust-tuple (a) signed-release: FAIL ($rc) for $ArtifactPath"
}
exit $rc
```

## Acceptance test (2nd-artifact)

Per task brief: download a 2nd SLSA-provenance-attested artifact + verify.

Candidate: `actions/runner-images` or any `slsa-framework/example-package` release. The 2nd-artifact test confirms the verifier handles different source-repo / different attestation-key paths — not just self-verification.

```powershell
# Example 2nd-artifact target (subject to availability)
gh release download v1.0.0 `
    --repo slsa-framework/example-package `
    --pattern "*.tar.gz" `
    --dir Z:/tmp/slsa-accept-test

gh release download v1.0.0 `
    --repo slsa-framework/example-package `
    --pattern "*.intoto.jsonl" `
    --dir Z:/tmp/slsa-accept-test

# Run wrapper
& Z:/claude-sota-installed/tools/slsa-verify-wrap.ps1 `
    -ArtifactPath Z:/tmp/slsa-accept-test/example-package.tar.gz `
    -SourceUri github.com/slsa-framework/example-package `
    -SourceTag v1.0.0
# Expected exit 0
```

## Composite delta

**+0.07** (per CLAUDE.md L43 W329-K-4 ETA). Affects sca-v11 §6 Control-1 (artifact-integrity gate) — adds SLSA-L3 verification path for plugin/binary downloads.

## Risk + reversibility

- **Risk**: LOW — single binary install, no system modifications, no config rewrites.
- **Reversibility**: FULL — `Remove-Item Z:/tools/slsa-verifier.exe` + `Remove-Item Z:/tools/slsa-verify-wrap.ps1` reverses the install entirely.
- **Side-effects**: NONE on existing tooling. The wrapper is opt-in; nothing auto-fires until invoked.

## Cite anchors

- SLSA v1.0 spec: `https://slsa.dev/spec/v1.0/` — Linux Foundation OpenSSF.
- slsa-verifier upstream: `https://github.com/slsa-framework/slsa-verifier` — Linux Foundation OpenSSF.
- in-toto attestation format: `https://in-toto.io/` — Linux Foundation CNCF.
- CLAUDE.md L43 — W329-K-4 +0.07 ETA.
- sca-v11.1 §1 existence-probe Stage-0 pattern.
