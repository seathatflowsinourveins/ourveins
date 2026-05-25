#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# W326-H — Operator-staged CLI installs that mise cannot bootstrap on Windows.
#
# Run AS OPERATOR (not from Claude Code). These tools either:
#   (a) lack a mise registry entry (dog/ogham), OR
#   (b) are operator-only per W324 P8 staging policy (slsa-verifier).
#
# Source-of-truth cite anchors:
#   - dog              v0.1.0+ — https://github.com/ogham/dog/releases (6.7k stars, 2026-05 activity, Rust)
#   - slsa-verifier    v2.7.1   — https://github.com/slsa-framework/slsa-verifier/releases (2026-06-27 latest;
#                                  W324 P8 STAGED at v2.7.0 — UPGRADE to v2.7.1 verified W326-H)
#
# Prerequisites:
#   - rustup-init (for dog cargo build) OR download dog binary release
#   - mise-installed go 1.26.3 (for slsa-verifier `go install`)
#
# Falsifiable-inverse:
#   `dog --version` returns 0  AND
#   `slsa-verifier version` returns 0

$ErrorActionPreference = 'Stop'

Write-Host "=== W326-H operator-staged CLI installs ==="

# (1) dog — DNS CLI (ogham/dog)
Write-Host "`n--- dog (DNS CLI) ---"
$dogBin = (Get-Command dog -ErrorAction SilentlyContinue).Source
if ($dogBin) {
    Write-Host "dog already installed at $dogBin"
    & dog --version
} else {
    Write-Host "Installing dog via cargo (requires rustup-init)..."
    # Option A: cargo install (preferred, builds latest from master)
    cargo install dog
    # Option B (fallback if cargo fails): download Windows binary release
    #   Invoke-WebRequest -Uri 'https://github.com/ogham/dog/releases/download/v0.1.0/dog-v0.1.0-x86_64-pc-windows-msvc.zip' -OutFile $env:TEMP\dog.zip
    #   Expand-Archive $env:TEMP\dog.zip -DestinationPath "$env:USERPROFILE\.local\bin"
    Write-Host "dog installed; verifying..."
    dog --version
}

# (2) slsa-verifier — SLSA provenance verifier (W324 P8 STAGED → W326-H APPLY)
Write-Host "`n--- slsa-verifier v2.7.1 ---"
$slsaBin = (Get-Command slsa-verifier -ErrorAction SilentlyContinue).Source
if ($slsaBin) {
    Write-Host "slsa-verifier already installed at $slsaBin"
    & slsa-verifier version
} else {
    Write-Host "Installing slsa-verifier@v2.7.1 via go install..."
    # cite: https://github.com/slsa-framework/slsa-verifier#installation
    go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.1
    Write-Host "slsa-verifier installed to $env:GOPATH\bin (or $HOME\go\bin); verifying..."
    & "$HOME\go\bin\slsa-verifier.exe" version
}

# (3) jless — DEFERRED (Windows-incompatible)
Write-Host "`n--- jless (DEFERRED) ---"
Write-Host "jless not installable on Windows native:"
Write-Host "  - aqua backend: NO Windows binary"
Write-Host "  - cargo backend: termion crate Unix-only (build fails)"
Write-Host "Operator must install via WSL2: 'wsl cargo install jless'"
Write-Host "or wait for upstream Windows port: https://github.com/PaulJuliusMartinez/jless/issues"

Write-Host "`n=== install-cli-extras.ps1 COMPLETE ==="
