# fleet-status.ps1 — comprehensive fleet + system probe for /loop iterations
#
# Invoke: pwsh Z:\claude-sota-installed\tools\fleet-status.ps1
# Output: single-pass catalog covering accounts / routing / cache / cost / spawn / proxy / errors
#
# Cite class per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8:
#   constituents=[
#     TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:371-375 @ HEAD 785b00c3 (selector filters disabled auths at routing time),
#     TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/internal/watcher/clients.go:302-328 @ HEAD 785b00c3 (auth-dir file enumeration is source of truth),
#     TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz contract),
#     TIER-1-DIRECT @ https://docs.anthropic.com/en/api/rate-limits (Anthropic rate-limit semantics),
#     TIER-1-DIRECT @ https://github.com/ryoppippi/ccusage README (ccusage daily JSON telemetry),
#     TIER-3-LOCAL-COMPOSITION @ claude-sota-installed operator composite probe
#   ]; effective_tier=TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE
#
# CRITICAL CORRECTION (Iter 14 2026-05-12): CPA auth-dir is AUTHORITATIVE source for
# routing eligibility. Poller JSONL `/api/oauth/usage` observations include both
# real-subscription-quota state AND `/usage` endpoint own throttling — cannot be
# used as routing truth. This script reports BOTH but separates them.

[CmdletBinding()]
param(
    [string]$AuthDir = 'Z:\claude-sota-installed\.cli-proxy-api',
    [string]$PollerJsonl = 'Z:\claude-sota-installed\.claude\state\aperant_poller.jsonl',
    [string]$PollerPid = 'Z:\claude-sota-installed\.claude\state\aperant_poller.pid',
    [int]$PollerTailLines = 250
)

$ErrorActionPreference = 'Continue'
$now = Get-Date

function Write-Header { param([string]$Text) Write-Output ""; Write-Output ("=== " + $Text + " ===") }

# ────────────────────────────────────────────────────────────────────────
# §0 CPA MGMT API LIVE STATE (PRIMARY — bypasses dead poller)
# Cite: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:648 (mgmt.PATCH/GET routes)
# Discovered Wave-current: /v0/management/auth-files Bearer auth = LIVE per-auth state
# ────────────────────────────────────────────────────────────────────────
Write-Header "CPA MGMT API LIVE STATE (10 auth-files, real-time)"

$mgmtSecretPath = 'Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt'
$mgmtData = $null
if (Test-Path $mgmtSecretPath) {
    $secret = (Get-Content $mgmtSecretPath -Raw).Trim()
    try {
        $resp = Invoke-WebRequest -UseBasicParsing -TimeoutSec 8 -Headers @{Authorization="Bearer $secret"} -Uri 'http://127.0.0.1:18317/v0/management/auth-files'
        $mgmtData = $resp.Content | ConvertFrom-Json
    } catch {
        Write-Output ("  CPA mgmt API ERR: {0}" -f $_.Exception.Message)
    }
}
if ($mgmtData -and $mgmtData.files) {
    Write-Output ("Probe time: {0} EDT · Total auth-files: {1}" -f (Get-Date -Format "HH:mm:ss"), $mgmtData.files.Count)
    Write-Output ""
    $hdr = "{0,-44} {1,-12} {2,-8} {3,-4} {4,7} {5,5} {6,-19}" -f 'AUTH-FILE','PROVIDER','STATUS','PRI','SUCC','FAIL','LAST-ACTIVITY'
    Write-Output $hdr
    Write-Output ("-" * 110)
    $mgmtData.files | Sort-Object @{Expression={$_.disabled}}, @{Expression={if($_.priority){[int]$_.priority}else{99}}}, name | ForEach-Object {
        $f = $_
        $statMark = if ($f.disabled) { "OFF" } else { "ACTIVE" }
        $emoji = if ($f.disabled) { "X" } else { "+" }
        $name = $f.name -replace '\.json$', ''
        if ($name.Length -gt 42) { $name = $name.Substring(0,42) }
        $provider = if ($f.provider) { $f.provider } else { "?" }
        $pri = if ($null -ne $f.priority) { $f.priority } else { "-" }
        $succ = if ($null -ne $f.success) { $f.success } else { "-" }
        $fail = if ($null -ne $f.failed) { $f.failed } elseif ($null -ne $f.failed_count) { $f.failed_count } else { "-" }
        $upd = if ($f.updated_at) { ($f.updated_at -as [datetime]).ToString("MM-dd HH:mm:ss") } else { "-" }
        Write-Output ("{0} {1,-43} {2,-12} {3,-8} {4,-4} {5,7} {6,5} {7,-19}" -f $emoji, $name, $provider, $statMark, $pri, $succ, $fail, $upd)
    }
    Write-Output ""
    $enCount = ($mgmtData.files | Where-Object { -not $_.disabled }).Count
    $disCount = ($mgmtData.files | Where-Object { $_.disabled }).Count
    Write-Output ("Routable: {0} active · {1} disabled · {2} total" -f $enCount, $disCount, $mgmtData.files.Count)
    # Cross-provider breakdown
    $byProvider = $mgmtData.files | Group-Object provider
    $providerBreakdown = ($byProvider | ForEach-Object {
        $en = ($_.Group | Where-Object { -not $_.disabled }).Count
        $tot = $_.Count
        "{0}:{1}/{2}" -f $_.Name, $en, $tot
    }) -join "  "
    Write-Output ("Providers (enabled/total): " + $providerBreakdown)
} else {
    Write-Output "  (CPA mgmt API unreachable OR secret missing — falling back to auth-dir + poller only)"
}

# ────────────────────────────────────────────────────────────────────────
# §1 FLEET ROSTER (CPA auth-dir — AUTHORITATIVE routing eligibility)
# ────────────────────────────────────────────────────────────────────────
Write-Header "FLEET ROSTER (CPA auth-dir = source of truth)"
Write-Output ("Time: {0} EDT" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"))

$enabledClaude = @()
$disabledClaude = @()
$codexAuths = @()

if (Test-Path $AuthDir) {
    Get-ChildItem $AuthDir -Filter "claude-*.json" -ErrorAction SilentlyContinue | ForEach-Object {
        try {
            $j = Get-Content $_.FullName -Raw | ConvertFrom-Json
            $email = $_.Name -replace '^claude-', '' -replace '\.json$', ''
            $obj = [PSCustomObject]@{
                Email = $email
                Disabled = [bool]$j.disabled
                Status = if ($j.status) { $j.status } else { "active" }
            }
            if ($obj.Disabled) { $disabledClaude += $obj } else { $enabledClaude += $obj }
        } catch {}
    }
    Get-ChildItem $AuthDir -Filter "codex-*.json" -ErrorAction SilentlyContinue | ForEach-Object {
        $codexAuths += $_.Name
    }

    Write-Output ""
    Write-Output ("ENABLED Claude accounts (ROUTABLE via CPA :18317): {0}" -f $enabledClaude.Count)
    $enabledClaude | ForEach-Object { "  ✅ {0}" -f $_.Email }
    Write-Output ""
    Write-Output ("DISABLED Claude accounts (NOT routed — held in reserve): {0}" -f $disabledClaude.Count)
    $disabledClaude | ForEach-Object { "  ❌ {0}" -f $_.Email }
    Write-Output ""
    Write-Output ("Codex auths: {0}" -f $codexAuths.Count)
    $codexAuths | ForEach-Object { "  ⚙ {0}" -f $_ }
} else {
    Write-Output "  AUTH-DIR NOT FOUND at $AuthDir"
}

# ────────────────────────────────────────────────────────────────────────
# §2 POLLER OBSERVED STATE (DASHBOARD VIEW — not routing truth)
# ────────────────────────────────────────────────────────────────────────
Write-Header "POLLER OBSERVED STATE (Anthropic /api/oauth/usage view; ⚠ not routing-decisive)"

if (Test-Path $PollerJsonl) {
    $lines = Get-Content $PollerJsonl -Tail $PollerTailLines
    $latest = @{}
    foreach ($l in $lines) {
        try {
            $j = $l | ConvertFrom-Json
            $k = "$($j.account)|$($j.provider)"
            if (-not $latest.ContainsKey($k) -or [DateTime]::Parse($latest[$k].ts) -lt [DateTime]::Parse($j.ts)) {
                $latest[$k] = $j
            }
        } catch {}
    }

    $okCnt = 0; $eCnt = 0
    foreach ($v in $latest.Values) { if ($v.status -eq "ok") { $okCnt++ } else { $eCnt++ } }
    Write-Output ("Poller-OK: {0} · Poller-429: {1} (of {2} polled)" -f $okCnt, $eCnt, $latest.Count)
    Write-Output ""
    Write-Output ("{0,-44} {1,-9} {2,-5} {3,-5} {4,-5} {5,-5} {6,-25}" -f "Account", "Provider", "Stat", "P%", "S%", "Plan", "Reset-At")
    Write-Output ("{0,-44} {1,-9} {2,-5} {3,-5} {4,-5} {5,-5} {6,-25}" -f ("-" * 40), "--------", "----", "----", "----", "----", ("-" * 22))
    $latest.GetEnumerator() | Sort-Object Name | ForEach-Object {
        $v = $_.Value
        $email = ($v.account -split '\|')[0]
        $provider = $v.provider
        $reset = if ($v.primary_reset_at) { $v.primary_reset_at } elseif ($v.reset_at) { $v.reset_at } else { "-" }
        $plan = if ($v.plan_type) { $v.plan_type } else { "free?" }
        $p = if ($v.primary_used_percent -ne $null) { $v.primary_used_percent } else { "-" }
        $s = if ($v.secondary_used_percent -ne $null) { $v.secondary_used_percent } else { "-" }
        "{0,-44} {1,-9} {2,-5} {3,-5} {4,-5} {5,-5} {6,-25}" -f $email, $provider, $v.status, $p, $s, $plan, $reset
    }
    Write-Output ""
    Write-Output "Note: 'plan=free' here often reflects /usage response parse, NOT actual subscription tier."
    Write-Output "      User-dashboard at claude.ai/account/usage is authoritative for subscription state."
} else {
    Write-Output "  POLLER JSONL NOT FOUND at $PollerJsonl"
}

# ────────────────────────────────────────────────────────────────────────
# §3 ROUTING PRIORITY (capacity-aware sort, ENABLED accounts only)
# ────────────────────────────────────────────────────────────────────────
Write-Header "ROUTING PRIORITY (ENABLED accounts only, sorted by remaining capacity)"

if ($latest -and $enabledClaude.Count -gt 0) {
    $priority = @()
    foreach ($acct in $enabledClaude) {
        $key = "$($acct.Email)|claude"
        if ($latest.ContainsKey($key)) {
            $v = $latest[$key]
            $p = if ($v.primary_used_percent -ne $null) { [int]$v.primary_used_percent } else { 0 }
            $s = if ($v.secondary_used_percent -ne $null) { [int]$v.secondary_used_percent } else { 0 }
            $combined = $p + $s
            $priority += [PSCustomObject]@{
                Email = $acct.Email
                Status = $v.status
                P = $p; S = $s; Combined = $combined
            }
        } else {
            $priority += [PSCustomObject]@{ Email = $acct.Email; Status = "no-data"; P = 0; S = 0; Combined = 0 }
        }
    }
    $priority | Sort-Object @{Expression="Status";Descending=$false}, Combined | ForEach-Object {
        $marker = if ($_.Status -eq "ok") { "🥇" } elseif ($_.Status -eq "429") { "⏳" } else { "❓" }
        "  {0} {1,-40} status={2,-4} P={3,3}% S={4,3}% combined={5,3}" -f $marker, $_.Email, $_.Status, $_.P, $_.S, $_.Combined
    }
}

# ────────────────────────────────────────────────────────────────────────
# §4 TOKEN / CACHE / COST (ccusage)
# ────────────────────────────────────────────────────────────────────────
Write-Header "TOKEN · CACHE · COST (ccusage daily JSON)"

try {
    $today = (Get-Date -Format "yyyy-MM-dd")
    $out = & ccusage daily --json 2>&1 | Out-String
    $j = $out | ConvertFrom-Json
    Write-Output ("{0,-12} {1,-14} {2,-12} {3,-12} {4,-6} {5,-12}" -f "DATE", "TOTAL TOK", "CACHE-CR", "CACHE-RD", "HIT%", "COST")
    Write-Output ("{0,-12} {1,-14} {2,-12} {3,-12} {4,-6} {5,-12}" -f ("-"*12), ("-"*14), ("-"*12), ("-"*12), ("-"*6), ("-"*12))
    $j.daily | Sort-Object date -Descending | Select-Object -First 3 | ForEach-Object {
        $tc = $_.cacheCreationTokens + $_.cacheReadTokens
        $hit = if ($tc -gt 0) { [Math]::Round(100 * $_.cacheReadTokens / $tc, 1) } else { 0 }
        $mark = if ($_.date -eq $today) { "●" } else { " " }
        "{0} {1,-10} {2,-14:N0} {3,-12:N0} {4,-12:N0} {5,-6} `${6:N2}" -f $mark, $_.date, $_.totalTokens, $_.cacheCreationTokens, $_.cacheReadTokens, $hit, $_.totalCost
    }
} catch {
    Write-Output "  ccusage error: $($_.Exception.Message)"
}

# ────────────────────────────────────────────────────────────────────────
# §5 PROXY CHAIN HEALTH (3 layers)
# ────────────────────────────────────────────────────────────────────────
Write-Header "PROXY CHAIN HEALTH"

$endpoints = @(
    @{ Name = "cnighswonger cache-fix"; Url = "http://127.0.0.1:19801/health" }
    @{ Name = "CLIProxyAPI fleet"; Url = "http://127.0.0.1:18317/healthz" }
    @{ Name = "cpa-usage-keeper UI"; Url = "http://127.0.0.1:8079/healthz" }
)
foreach ($ep in $endpoints) {
    try {
        $r = Invoke-WebRequest -Uri $ep.Url -TimeoutSec 2 -ErrorAction Stop
        "  ✅ {0,-25} {1,-40} {2}" -f $ep.Name, $ep.Url, $r.Content.Trim()
    } catch {
        "  ❌ {0,-25} {1,-40} DOWN ({2})" -f $ep.Name, $ep.Url, $_.Exception.Message.Substring(0, [Math]::Min(40, $_.Exception.Message.Length))
    }
}

# ────────────────────────────────────────────────────────────────────────
# §6 SPAWN-AGE DISTRIBUTION
# ────────────────────────────────────────────────────────────────────────
Write-Header "SPAWN-AGE DISTRIBUTION (terminal churn monitor — post-W155 F14)"

$procs = Get-Process -Name conhost,cmd,node -ErrorAction SilentlyContinue
$bins = [ordered]@{ "0-1m" = 0; "1-5m" = 0; "5-30m" = 0; "30m-2h" = 0; "2h+" = 0 }
foreach ($p in $procs) {
    try {
        $age = ($now - $p.StartTime).TotalMinutes
        if ($age -le 1) { $bins["0-1m"]++ }
        elseif ($age -le 5) { $bins["1-5m"]++ }
        elseif ($age -le 30) { $bins["5-30m"]++ }
        elseif ($age -le 120) { $bins["30m-2h"]++ }
        else { $bins["2h+"]++ }
    } catch {}
}
$bins.GetEnumerator() | ForEach-Object { "  {0,-7} {1,4}" -f $_.Key, $_.Value }
$claudeCnt = (Get-Process -Name claude -ErrorAction SilentlyContinue | Measure-Object).Count
$codexCnt = (Get-Process -Name codex -ErrorAction SilentlyContinue | Measure-Object).Count
$pythonCnt = (Get-Process -Name python -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Output ("  ─────────"); Write-Output ("  claude:{0}  codex:{1}  python:{2}" -f $claudeCnt, $codexCnt, $pythonCnt)

# ────────────────────────────────────────────────────────────────────────
# §7 POLLER DAEMON LIVENESS
# ────────────────────────────────────────────────────────────────────────
Write-Header "POLLER DAEMON STATE"

if (Test-Path $PollerPid) {
    $pid_val = (Get-Content $PollerPid -ErrorAction SilentlyContinue).Trim()
    if ($pid_val) {
        try {
            $p = Get-Process -Id $pid_val -ErrorAction Stop
            $uptime = ($now - $p.StartTime).TotalHours
            "  ✅ PID={0} ALIVE uptime={1:N1}h CPU={2:N0}s" -f $pid_val, $uptime, $p.CPU
        } catch {
            "  X PID={0} DEAD (in .pid file but process gone) -- OPERATOR RESTART REQUIRED" -f $pid_val
            '     python tools/aperant_rate_limit_poller.py --interval-seconds 60'
        }
    }
}
if (Test-Path $PollerJsonl) {
    $f = Get-Item $PollerJsonl
    $sizeMB = [Math]::Round($f.Length / 1MB, 1)
    $staleness = ($now - $f.LastWriteTime).TotalMinutes
    "  JSONL: {0} MB  last-write: {1:N1} min ago" -f $sizeMB, $staleness
    if ($staleness -gt 5) {
        "  ⚠ JSONL stale >5min — poller likely dead or stuck"
    }
}

# ────────────────────────────────────────────────────────────────────────
# §8 ERROR QUEUE SUMMARY
# ────────────────────────────────────────────────────────────────────────
Write-Header "ERROR QUEUE STATUS"

@(
    "E1 P0   status.py KeyError      — parent CCC scope (not actionable here)"
    "E3 P2   orphan processes        — Windows reaps naturally (no operator action needed)"
    "E4 P2   T1 gate-misses          — auto-cleared by session-checkpoint commits"
    "E7      poller daemon liveness  — see §7 above (operator restart if DEAD)"
    "E8      4 disabled accts        — operator decision; re-enable by editing claude-*.json"
) | ForEach-Object { "  $_" }

# ────────────────────────────────────────────────────────────────────────
# §9 SOTA REMINDERS (key citations)
# ────────────────────────────────────────────────────────────────────────
Write-Header "SOTA CITATIONS (TIER-1 anchors)"

@(
    "Selector logic:    Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:371-375 @ 785b00c3"
    "Auth-dir watcher:  Z:/repos/deps/CLIProxyAPI/internal/watcher/clients.go:302-328 @ 785b00c3"
    "/healthz contract: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ 785b00c3"
    "Rate limits:       https://docs.anthropic.com/en/api/rate-limits"
    "Cache pricing:     https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
    "ccusage CLI:       https://github.com/ryoppippi/ccusage"
) | ForEach-Object { "  $_" }

Write-Output ""
Write-Output ("Probe complete at {0}" -f (Get-Date -Format "HH:mm:ss"))
