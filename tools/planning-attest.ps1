#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# W324 P7 — planning-with-files SHA-256 sidecar attest
# Cite: https://github.com/OthmanAdi/planning-with-files/tree/d27008f369a5c58f315ce74194ff1c21b9a0eedc
# Inverse-anchor: https://github.com/in-toto/attestation (vendor-neutral attestation framework)
# Usage:
#   .\tools\planning-attest.ps1 -Sign   task_plan.md
#   .\tools\planning-attest.ps1 -Verify task_plan.md
#   .\tools\planning-attest.ps1         (defaults to -Verify on task_plan.md if present)
[CmdletBinding(DefaultParameterSetName='Verify')]
param(
  [Parameter(Position=0)][string]$Path = 'task_plan.md',
  [Parameter(ParameterSetName='Sign')][switch]$Sign,
  [Parameter(ParameterSetName='Verify')][switch]$Verify
)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path $Path)) { Write-Error "missing: $Path"; exit 2 }
$sidecar = "$Path.sha256"
$hash = (Get-FileHash -Algorithm SHA256 -Path $Path).Hash.ToLower()
$leaf = Split-Path $Path -Leaf
if ($Sign) {
  "$hash  $leaf" | Set-Content -Path $sidecar -Encoding ascii -NoNewline
  Write-Host "signed: $sidecar = $hash"
  exit 0
}
if (-not (Test-Path $sidecar)) {
  Write-Host "no sidecar: run -Sign first"
  exit 1
}
$expected = (Get-Content -Path $sidecar -Raw).Trim() -split '\s+' | Select-Object -First 1
if ($expected -ne $hash) {
  Write-Host "DRIFT: $Path expected=$expected actual=$hash"
  exit 3
}
Write-Host "OK: $Path matches sidecar SHA-256"
exit 0
