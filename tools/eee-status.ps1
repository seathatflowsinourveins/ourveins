#Requires -Version 7.0
# eee-status.ps1 — comprehensive real-time fleet dashboard
# Cite: docs/eee-launch-design-cliproxyapi.md §13 + §14 + Mgmt API at HEAD 785b00c3
# Class: TIER-3-LOCAL-COMPOSITION over TIER-1-DIRECT (CLIProxyAPI Mgmt API + ccusage CLI)
# T1 Pattern A applied per codex T1 NEEDS-REVISION conf=0.86 (verdict at .claude/state/codex_consult_eee_status_ps1_OUT.txt):
#   F-A.1 (P3) — degraded-mode on proxy unreachable (don't hard-exit)
#   F-A.2 (P3) — gate secret-path disclosure behind -Verbose
#   F-B.1 (P2) — independent regex for success/failed (no ordering dependency)
#   F-B.2 (P3) — explicit numeric casting on object buckets
#   F-C.1 (P1) — add /api-key-usage rendering
#   F-C.2 (P2) — <24h expiry warnings
#
# Usage:  Z:\claude-sota-installed\tools\eee-status.ps1 [-Compact] [-NoUsage] [-Verbose]

[CmdletBinding()]
param(
    [switch]$Compact = $false,
    [switch]$NoUsage = $false
)

# W325 P7 (F-PS1) — fail-fast on any non-terminating error, per Microsoft PowerShell docs:
# https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables#erroractionpreference
# 'Stop' converts non-terminating errors to terminating so try/catch + script exit handle them correctly.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$base = 'http://127.0.0.1:18317'
$secretFile = 'Z:\claude-sota-installed-state\cliproxy-mgmt-secret.txt'

# ==== HEALTHZ (F-A.1: degraded-mode, not hard-exit) ====
$proxyAlive = $false
try {
    $h = Invoke-RestMethod -Uri "$base/healthz" -TimeoutSec 3 -ErrorAction Stop
    Write-Host "[eee-status] proxy: $base — healthz=$($h.status)" -ForegroundColor Green
    $proxyAlive = $true
} catch {
    Write-Host "[eee-status] ⚠️ proxy unreachable at $base — Mgmt API sections SKIPPED; ccusage section will still run" -ForegroundColor Yellow
}

# ==== MGMT-API AUTH ====
$mgmtAvailable = $false
$secret = $null
$mgmtH = $null
if ($proxyAlive -and (Test-Path $secretFile)) {
    $secret = (Get-Content $secretFile -Raw).Trim()
    $mgmtH = @{ 'Authorization' = "Bearer $secret" }
    $mgmtAvailable = $true
} elseif ($proxyAlive) {
    Write-Host "[eee-status] WARN: Mgmt secret missing at $secretFile — skipping Mgmt API sections" -ForegroundColor Yellow
}

# ==== ACCOUNT ROSTER (only when mgmt available) ====
if ($mgmtAvailable) {
    try {
        $resp = Invoke-RestMethod -Uri "$base/v0/management/auth-files" -Headers $mgmtH -TimeoutSec 8
    } catch {
        Write-Host "[eee-status] ⚠️ Mgmt auth failed: $($_.Exception.Message); continuing with ccusage only" -ForegroundColor Yellow
        $resp = $null
        $mgmtAvailable = $false
    }
}

if ($mgmtAvailable -and $resp) {
    Write-Host ""
    Write-Host "=== ACCOUNT FLEET ($($resp.files.Count) credentials) ===" -ForegroundColor Cyan
    "{0,-3} {1,-12} {2,-32} {3,-3} {4,-3} {5,-7} {6,-9} {7}" -f '#', 'PROVIDER', 'EMAIL', 'OK', 'ERR', 'STATUS', 'PRIORITY', 'EXPIRES'
    "-" * 110

    $idx = 0
    $totalOk = 0; $totalErr = 0
    foreach ($a in ($resp.files | Sort-Object provider, email)) {
        $idx++
        $email = if ($a.email.Length -gt 30) { $a.email.Substring(0,30) + '…' } else { $a.email }
        $accOk = 0; $accErr = 0
        if ($a.recent_requests) {
            foreach ($b in $a.recent_requests) {
                # F-B.1: independent regex for success and failed (no ordering dependency)
                # F-B.2: explicit numeric casting
                if ($b -is [string]) {
                    if ($b -match 'success=(\d+)') { $accOk += [int]$matches[1] }
                    if ($b -match 'failed=(\d+)')  { $accErr += [int]$matches[1] }
                } elseif ($null -ne $b) {
                    $sV = if ($null -ne $b.success) { [int]$b.success } else { 0 }
                    $fV = if ($null -ne $b.failed)  { [int]$b.failed }  else { 0 }
                    $accOk += $sV; $accErr += $fV
                }
            }
        }
        $totalOk += $accOk; $totalErr += $accErr

        # F-C.2: <24h expiry warning
        $expiresShort = ''
        $expiryHrs = $null
        if ($a.id_token -and $a.id_token.chatgpt_subscription_active_until) {
            try {
                $until = [DateTimeOffset]::Parse($a.id_token.chatgpt_subscription_active_until)
                $hrs = ($until - [DateTimeOffset]::UtcNow).TotalHours
                $expiryHrs = [Math]::Round($hrs, 1)
                if ($hrs -le 0) {
                    $expiresShort = "EXPIRED"
                } elseif ($hrs -lt 24) {
                    $expiresShort = "⚠ ${expiryHrs}h"
                } else {
                    $days = [Math]::Round($hrs / 24, 1)
                    $expiresShort = "${days}d"
                }
            } catch {}
        }

        $priShort = if ($a.priority) { $a.priority } else { '-' }
        $line = "{0,-3} {1,-12} {2,-32} {3,-3} {4,-3} {5,-7} {6,-9} {7}" -f $idx, $a.provider, $email, $accOk, $accErr, $a.status, $priShort, $expiresShort
        if ($expiresShort -like '⚠*' -or $expiresShort -eq 'EXPIRED') {
            Write-Host $line -ForegroundColor Yellow
        } else {
            Write-Host $line
        }
    }

    Write-Host ""
    Write-Host "TOTAL: $totalOk ok / $totalErr err across $($resp.files.Count) accounts" -ForegroundColor Green

    # ==== ROUTING STRATEGY ====
    try {
        $routing = Invoke-RestMethod -Uri "$base/v0/management/routing/strategy" -Headers $mgmtH -TimeoutSec 3
        Write-Host ""
        Write-Host "Routing: strategy=$($routing.strategy) session-affinity=$($routing.session_affinity) ttl=$($routing.session_affinity_ttl)" -ForegroundColor Cyan
    } catch {
        if ($VerbosePreference -eq 'Continue') {
            Write-Host "Routing strategy: query failed — $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }

    # ==== F-C.1: API KEY USAGE rendering ====
    Write-Host ""
    Write-Host "=== API KEY USAGE (per-key downstream-traffic stats) ===" -ForegroundColor Cyan
    try {
        $usage = Invoke-RestMethod -Uri "$base/v0/management/api-key-usage" -Headers $mgmtH -TimeoutSec 5
        if ($usage -is [hashtable] -or $usage -is [pscustomobject]) {
            $props = $usage.PSObject.Properties
            if ($props.Count -eq 0) {
                Write-Host "(no usage records yet — fire a few requests via api-keys first)" -ForegroundColor Gray
            } else {
                $usage | ConvertTo-Json -Depth 4
            }
        } elseif ($usage -is [array]) {
            "$($usage.Count) usage records:"
            $usage | ForEach-Object { "  $($_.api_key_label): requests=$($_.request_count) tokens=$($_.total_tokens)" }
        }
    } catch {
        if ($VerbosePreference -eq 'Continue') {
            Write-Host "API key usage query failed: $($_.Exception.Message)" -ForegroundColor Yellow
        } else {
            Write-Host "(api-key-usage unavailable; --Verbose for details)" -ForegroundColor Gray
        }
    }
}

# ==== CCUSAGE DAILY (independent of proxy) ====
if (-not $NoUsage -and (Get-Command ccusage -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "=== CCUSAGE DAILY (Claude Code session JSONL aggregation) ===" -ForegroundColor Cyan
    $env:CLAUDE_CONFIG_DIR = 'Z:\claude-sota-installed\.claude'
    $ccJson = & ccusage daily --json 2>$null | Out-String
    if ($ccJson) {
        try {
            $cc = $ccJson | ConvertFrom-Json
            "Daily totals (last 7 days):"
            $cc.daily | Select-Object -Last 7 | ForEach-Object {
                $totT = [int]$_.totalTokens
                $cR = [int]$_.cacheReadTokens
                $rate = if ($totT -gt 0) { [Math]::Round(100.0 * $cR / $totT, 1) } else { 0 }
                "  {0}: in={1,8:N0} out={2,8:N0} cache_create={3,11:N0} cache_read={4,12:N0} total={5,12:N0} cost=`${6,8:N2} cache_hit={7}%" -f `
                    $_.date, [int]$_.inputTokens, [int]$_.outputTokens, [int]$_.cacheCreationTokens, $cR, $totT, [decimal]$_.totalCost, $rate
            }
            $totals = $cc.totals
            if ($totals) {
                $totT = [int]$totals.totalTokens
                $cR = [int]$totals.cacheReadTokens
                $tRate = if ($totT -gt 0) { [Math]::Round(100.0 * $cR / $totT, 1) } else { 0 }
                "  ----"
                "  CUMULATIVE: total={0,12:N0} cost=`${1,8:N2} cache_hit={2}%" -f $totT, [decimal]$totals.totalCost, $tRate
            }
        } catch {
            if ($VerbosePreference -eq 'Continue') { "ccusage JSON parse failed: $_" }
            else { "(ccusage parse failed; --Verbose for details)" }
        }
    }
} else {
    if ($NoUsage) { Write-Host "(ccusage skipped per -NoUsage)" -ForegroundColor Gray }
    else { Write-Host "(ccusage not installed; run: npm install -g ccusage)" -ForegroundColor Gray }
}

Write-Host ""
Write-Host "Web panel: $base/management.html" -ForegroundColor Cyan
# F-A.2: gate secret-path disclosure behind -Verbose
if ($VerbosePreference -eq 'Continue') {
    Write-Host "Mgmt secret: $secretFile" -ForegroundColor Gray
}
