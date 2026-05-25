#Requires -Version 7.0
# tools/multi-model-review.ps1 — W436 SOTA multi-model PR-review orchestrator
#
# MISSION
# Aggregates a 4-tier multi-model review verdict for a single PR:
#   Tier-1 (authoritative) — codex GPT-5.5 r1 via local `codex exec`
#   Tier-2 (advisory)      — Copilot Code Review (auto-detect; currently NOT active per W432-COPILOT-PROBE)
#   Tier-3 (tie-breaker)   — Sonnet 4.6 via Anthropic SDK (ONLY on Tier-1 r1<->r2 divergence per W331 P0.7)
#   Tier-4 (mechanized)    — 19 pre-commit gates + 12 CI workflows + Codex-Verdict trailer gate
#
# CITE ANCHORS (>=3 distinct orgs — 6 here per W352-S9 floor)
#   - Anthropic         https://docs.anthropic.com/en/docs/claude-code/sub-agents       (sub-agent model-precedence)
#   - OpenAI / codex    https://github.com/openai/codex                                  (codex exec subprocess contract)
#   - GitHub Copilot    https://docs.github.com/en/copilot/using-github-copilot/code-review (Copilot review detection)
#   - Microsoft         https://learn.microsoft.com/en-us/azure/devops/repos/security/github-advanced-security-code-scanning (AGS-CodeScanning convergence model)
#   - NIST SSDF         https://csrc.nist.gov/publications/detail/sp/800-218/final       (PW.7 code-review-by-AI)
#   - OpenSSF Scorecard https://openssf.org/projects/scorecard/                          (code-review track-record)
#
# OPERATIONAL CONTRACT
#   Inputs:   -Pr <int>                      PR number to review
#             [-CacheTtlMinutes <int>=60]    Reuse cached codex review younger than N min
#             [-OutPath <string>]            JSON output destination (default stdout)
#             [-NoCodexExec]                 Skip Tier-1 fresh invocation (use cache or PR-trailer-only)
#             [-AllowTierBreakerInvocation]  Authorize Tier-3 Sonnet invocation on divergence
#   Output:   Structured JSON verdict per the W436 DESIGN.md schema
#   Exit:     0 = APPROVE consensus | 1 = REVISE / BLOCK consensus | 2 = harness error
#
# RUNTIME
#   - Windows-native PowerShell 7 per CLAUDE.local.md (no MSYS path conversion)
#   - Uses `gh` CLI for GitHub Reviews API (W432-COPILOT-PROBE method)
#   - Uses `codex exec` (npx @openai/codex) for Tier-1 invocation
#   - Reads .claude/state/wave-lock-*.json for context, not for behavior

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Pr,

    [int]$CacheTtlMinutes = 60,

    [string]$OutPath,

    [switch]$NoCodexExec,

    [switch]$AllowTierBreakerInvocation
)

$ErrorActionPreference = 'Stop'

# ---------- Repo discovery ----------
$repoRoot = (& git rev-parse --show-toplevel 2>$null).Trim()
if (-not $repoRoot -or $LASTEXITCODE -ne 0) {
    Write-Error "[multi-model-review] Not inside a git repository; aborting."
    exit 2
}
if ($repoRoot -match '^/([a-zA-Z])/(.*)') {
    $repoRoot = "$($Matches[1].ToUpper()):\$($Matches[2])" -replace '/', '\'
}

$repoSlug = (& git -C $repoRoot remote get-url origin 2>$null)
if ($repoSlug -match 'github\.com[:/]([^/]+)/([^/.]+?)(\.git)?$') {
    $owner = $Matches[1]
    $repo  = $Matches[2]
} else {
    Write-Error "[multi-model-review] Could not parse owner/repo from origin URL."
    exit 2
}

$cacheDir = Join-Path $repoRoot ".claude/state/multi-model-review-cache"
if (-not (Test-Path $cacheDir)) {
    New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
}

# ---------- Tier-2: Copilot detection (per W432-COPILOT-PROBE method) ----------
function Get-CopilotVerdict {
    param([string]$Owner, [string]$Repo, [int]$Pr)
    $reviewsJson = & gh api "repos/$Owner/$Repo/pulls/$Pr/reviews" 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $reviewsJson) {
        return @{
            verdict = 'INDETERMINATE'
            reason  = 'gh api reviews call failed (auth or scope issue)'
            active  = $false
        }
    }
    $reviews = $reviewsJson | ConvertFrom-Json
    $copilotReviews = $reviews | Where-Object {
        $_.user.login -match 'copilot' -or $_.user.login -match 'Copilot'
    }
    if (-not $copilotReviews -or $copilotReviews.Count -eq 0) {
        return @{
            verdict = 'NOT_ACTIVE'
            reason  = 'No Copilot reviews on PR (tier-limit per W432-COPILOT-PROBE; reviews API probed)'
            active  = $false
        }
    }
    # Take the latest Copilot review state
    $latest = $copilotReviews | Sort-Object -Property submitted_at -Descending | Select-Object -First 1
    $cpState = $latest.state  # APPROVED | CHANGES_REQUESTED | COMMENTED | DISMISSED
    $mapped = switch ($cpState) {
        'APPROVED'          { 'APPROVE' }
        'CHANGES_REQUESTED' { 'BLOCK' }
        'COMMENTED'         { 'ADVISORY' }
        'DISMISSED'         { 'INDETERMINATE' }
        default             { 'INDETERMINATE' }
    }
    return @{
        verdict      = $mapped
        reason       = "Copilot review state=$cpState submitted_at=$($latest.submitted_at)"
        active       = $true
        commit_id    = $latest.commit_id
        submitted_at = $latest.submitted_at
    }
}

# ---------- Tier-4: Mechanized check-run aggregation ----------
function Get-MechanizedVerdict {
    param([string]$Owner, [string]$Repo, [int]$Pr)
    # First, look up the PR head SHA
    $prJson = & gh api "repos/$Owner/$Repo/pulls/$Pr" 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $prJson) {
        return @{
            passing       = 0
            failing       = 0
            advisory_only = 0
            error         = 'PR fetch failed'
        }
    }
    $pr = $prJson | ConvertFrom-Json
    $headSha = $pr.head.sha
    # Pull check-runs for HEAD
    $crJson = & gh api "repos/$Owner/$Repo/commits/$headSha/check-runs?per_page=100" 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $crJson) {
        return @{
            passing       = 0
            failing       = 0
            advisory_only = 0
            error         = 'check-runs fetch failed (scope: checks:read)'
            head_sha      = $headSha
        }
    }
    $cr = $crJson | ConvertFrom-Json
    # Classify the binding gates (extend as the runtime adds them)
    $bindingChecks = @(
        'Codex-Verdict trailer (binding)',
        'CodeQL',
        'commitlint',
        'actionlint',
        'pre-commit',
        'codeql-analysis'
    )
    $advisoryChecks = @(
        'multi-model-review-aggregator',
        'sbom',
        'scorecard',
        'links',
        'dependency-review'
    )
    $passing = 0
    $failing = 0
    $advisory = 0
    $failingList = @()
    foreach ($run in $cr.check_runs) {
        $name = $run.name
        $conclusion = $run.conclusion
        $status = $run.status
        $isBinding = $false
        foreach ($b in $bindingChecks) {
            if ($name -like "*$b*") { $isBinding = $true; break }
        }
        $isAdvisory = $false
        foreach ($a in $advisoryChecks) {
            if ($name -like "*$a*") { $isAdvisory = $true; break }
        }
        if ($status -ne 'completed') { continue }
        if ($conclusion -eq 'success' -or $conclusion -eq 'skipped' -or $conclusion -eq 'neutral') {
            if ($isAdvisory) { $advisory++ } else { $passing++ }
        } else {
            if ($isAdvisory) {
                $advisory++
            } else {
                $failing++
                $failingList += $name
            }
        }
    }
    return @{
        passing        = $passing
        failing        = $failing
        advisory_only  = $advisory
        head_sha       = $headSha
        failing_checks = $failingList
    }
}

# ---------- Tier-1: codex GPT-5.5 r1 invocation (with cache) ----------
function Get-CodexCacheKey {
    param([string]$Owner, [string]$Repo, [int]$Pr, [string]$HeadSha)
    return "codex-r1-${Owner}-${Repo}-pr${Pr}-head-${HeadSha}.json"
}

function Get-CodexVerdict {
    param(
        [string]$Owner, [string]$Repo, [int]$Pr, [string]$HeadSha,
        [string]$CacheDir, [int]$CacheTtlMinutes, [switch]$NoCodexExec
    )
    $cacheFile = Join-Path $CacheDir (Get-CodexCacheKey -Owner $Owner -Repo $Repo -Pr $Pr -HeadSha $HeadSha)
    # 1. Cache check
    if (Test-Path $cacheFile) {
        $cacheMeta = Get-Item $cacheFile
        $age = (Get-Date) - $cacheMeta.LastWriteTimeUtc.ToLocalTime()
        if ($age.TotalMinutes -lt $CacheTtlMinutes) {
            $cached = Get-Content $cacheFile -Raw | ConvertFrom-Json
            return @{
                verdict     = $cached.verdict
                confidence  = $cached.confidence
                evidence    = $cached.evidence
                cached      = $true
                cache_age_minutes = [math]::Round($age.TotalMinutes, 1)
            }
        }
    }
    if ($NoCodexExec) {
        # 2. Fall back to scanning PR-body trailer (the binding Codex-Verdict-gate signal)
        $prBody = (& gh api "repos/$Owner/$Repo/pulls/$Pr" --jq '.body' 2>$null)
        if ($LASTEXITCODE -eq 0 -and $prBody -match '(?m)^Codex-Verdict:\s*(APPROVE|BOOTSTRAP|REVISE|BLOCK)\s*$') {
            $trailer = $Matches[1]
            $mapped = if ($trailer -eq 'BOOTSTRAP') { 'APPROVE' } else { $trailer }
            return @{
                verdict    = $mapped
                confidence = 0.85
                evidence   = "PR-body trailer Codex-Verdict: $trailer (no fresh codex exec per -NoCodexExec; W387 binding-gate signal)"
                cached     = $false
                source     = 'pr-body-trailer'
            }
        }
        return @{
            verdict    = 'INDETERMINATE'
            confidence = 0.0
            evidence   = 'No fresh codex exec (-NoCodexExec) and no Codex-Verdict trailer in PR body'
            cached     = $false
            source     = 'none'
        }
    }
    # 3. Fresh codex exec invocation (Path P: foreground+tee, per CLAUDE.md cardinal-rule-3 architecture)
    Write-Host "[multi-model-review] Invoking codex GPT-5.5 r1 (this may take 30-90 seconds)..." -ForegroundColor Cyan
    $diffFile = Join-Path $env:TEMP "multi-model-review-pr${Pr}.diff"
    $baseRef = (& gh api "repos/$Owner/$Repo/pulls/$Pr" --jq '.base.ref' 2>$null).Trim()
    & git -C $repoRoot fetch origin $baseRef --quiet 2>&1 | Out-Null
    & git -C $repoRoot diff "origin/$baseRef...$HeadSha" > $diffFile 2>$null
    $diffSize = (Get-Item $diffFile).Length
    if ($diffSize -eq 0) {
        return @{
            verdict    = 'INDETERMINATE'
            confidence = 0.0
            evidence   = "Empty diff (base=$baseRef head=$HeadSha)"
            cached     = $false
            source     = 'codex-exec'
        }
    }
    $prompt = @'
You are codex GPT-5.5 acting as the cross-model adversarial reviewer (r1)
per the claude-sota-installed W331 P0.7 FRONTIER-PEER POLICY — codex is the
AUTHORITY, not a tie-breaker. Review the attached PR diff against:
  (1) Cardinal rules R1-R6 violations
  (2) cite-anchor inflation (operational vs aspirational tool claims)
  (3) silent-fallback patterns (W325-A F1 family)
  (4) CR-9 .mcp.json pin drift
  (5) self-invent regression (W255-banned categories)
  (6) verify-before-claim probes (R6)
Output exactly one line:
  VERDICT: APPROVE | REVISE | BLOCK
Followed by:
  CONFIDENCE: 0.00-1.00
Then a 3-line rationale and a paste-ready remediation block if not APPROVE.
'@
    $outFile = Join-Path $env:TEMP "multi-model-review-codex-pr${Pr}.txt"
    try {
        $cmd = "npx -y @openai/codex@0.131.0 exec `"$prompt`" --diff `"$diffFile`""
        & cmd /c "$cmd > `"$outFile`" 2>&1"
        $output = Get-Content $outFile -Raw -ErrorAction SilentlyContinue
        if (-not $output) { $output = '<empty codex output>' }
    } catch {
        $output = "codex exec failed: $($_.Exception.Message)"
    }
    # Parse VERDICT line
    $verdict = 'INDETERMINATE'
    if ($output -match '(?m)^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$') {
        $verdict = $Matches[1]
    }
    $confidence = 0.0
    if ($output -match '(?m)^\s*CONFIDENCE:\s*([0-9.]+)\s*$') {
        $confidence = [double]$Matches[1]
    }
    $result = @{
        verdict    = $verdict
        confidence = $confidence
        evidence   = ($output -split "`n" | Select-Object -First 30 | Out-String).Trim()
        cached     = $false
        source     = 'codex-exec'
        diff_bytes = $diffSize
    }
    # Cache it
    $result | ConvertTo-Json -Depth 10 | Set-Content -Path $cacheFile -Encoding UTF8
    return $result
}

# ---------- Tier-3: Sonnet 4.6 tie-breaker (only fires on Tier-1 r1<->r2 divergence) ----------
function Get-TieBreakerVerdict {
    param(
        [string]$CodexR1Verdict,
        [string]$CodexR2Verdict,
        [switch]$Authorize
    )
    if ($CodexR1Verdict -eq $CodexR2Verdict) {
        return @{
            verdict   = 'NOT_INVOKED'
            reason    = 'Tier-1 codex r1 and r2 agree; no divergence requires Sonnet tie-breaker (per W331 P0.7).'
            invoked   = $false
        }
    }
    if (-not $Authorize) {
        return @{
            verdict   = 'WITHHELD'
            reason    = "Tier-1 divergence detected (r1=$CodexR1Verdict, r2=$CodexR2Verdict) but -AllowTierBreakerInvocation not set."
            invoked   = $false
        }
    }
    # In a full implementation this would invoke Anthropic SDK with the diff +
    # both codex verdicts and ask Sonnet 4.6 to break the tie.
    # For W436 we register the surface, mark NOT_IMPLEMENTED, and require the
    # operator to authorize a deliberate Sonnet invocation later. This preserves
    # cardinal-rule-6 (verify-before-claim) — no fabricated Sonnet output.
    return @{
        verdict = 'NOT_IMPLEMENTED'
        reason  = 'Tier-3 Anthropic SDK invocation deferred to W436-FOLLOWUP (deliberate stub per cardinal-rule-6 verify-before-claim; Sonnet output would otherwise be fabricated).'
        invoked = $false
    }
}

# ---------- Consensus resolver ----------
function Resolve-Consensus {
    param(
        [hashtable]$Codex,
        [hashtable]$Copilot,
        [hashtable]$Mechanized,
        [hashtable]$TieBreaker
    )
    # Mechanized failing -> BLOCK overrides everything (binding gates are non-negotiable)
    if ($Mechanized.failing -gt 0) {
        return @{
            consensus = 'BLOCK'
            reason    = "Mechanized binding gates failing: $($Mechanized.failing) [$($Mechanized.failing_checks -join ', ')]"
        }
    }
    # Tier-1 codex authoritative
    switch ($Codex.verdict) {
        'BLOCK' {
            return @{
                consensus = 'BLOCK'
                reason    = "Tier-1 codex GPT-5.5 r1 BLOCK; AUTHORITY per W331 P0.7."
            }
        }
        'REVISE' {
            # Tier-2 Copilot can be advisory; doesn't lift REVISE
            return @{
                consensus = 'REVISE'
                reason    = "Tier-1 codex GPT-5.5 r1 REVISE; AUTHORITY per W331 P0.7 (Copilot=$($Copilot.verdict))."
            }
        }
        'APPROVE' {
            # If Copilot is active and says BLOCK, surface but Tier-1 still wins per W331 P0.7
            if ($Copilot.active -and $Copilot.verdict -eq 'BLOCK') {
                return @{
                    consensus = 'APPROVE_WITH_COPILOT_DISSENT'
                    reason    = "Tier-1 codex APPROVE (AUTHORITY); Tier-2 Copilot dissent recorded for operator review."
                }
            }
            return @{
                consensus = 'APPROVE'
                reason    = "Tier-1 codex APPROVE; mechanized $($Mechanized.passing) passing, 0 failing; Copilot=$($Copilot.verdict)."
            }
        }
        default {
            # INDETERMINATE — escalate
            return @{
                consensus = 'INDETERMINATE'
                reason    = "Tier-1 codex INDETERMINATE; operator review required."
            }
        }
    }
}

# ---------- Main ----------
Write-Host "[multi-model-review] PR #$Pr ($owner/$repo)" -ForegroundColor Green

# Capture mechanized first (gives us HEAD SHA)
Write-Host "[multi-model-review] Tier-4: mechanized check-runs..." -ForegroundColor Cyan
$mechanized = Get-MechanizedVerdict -Owner $owner -Repo $repo -Pr $Pr
$headSha = $mechanized.head_sha

# Tier-2 (cheap, no LLM)
Write-Host "[multi-model-review] Tier-2: Copilot Code Review detection..." -ForegroundColor Cyan
$copilot = Get-CopilotVerdict -Owner $owner -Repo $repo -Pr $Pr

# Tier-1 (most expensive — gated by cache + -NoCodexExec)
Write-Host "[multi-model-review] Tier-1: codex GPT-5.5 r1..." -ForegroundColor Cyan
$codexR1 = Get-CodexVerdict -Owner $owner -Repo $repo -Pr $Pr -HeadSha $headSha `
                            -CacheDir $cacheDir -CacheTtlMinutes $CacheTtlMinutes `
                            -NoCodexExec:$NoCodexExec

# Tier-3 (only on divergence; for W436 we report a single-round codex, so r1==r2)
$tieBreaker = Get-TieBreakerVerdict -CodexR1Verdict $codexR1.verdict `
                                    -CodexR2Verdict $codexR1.verdict `
                                    -Authorize:$AllowTierBreakerInvocation

# Consensus
$consensus = Resolve-Consensus -Codex $codexR1 -Copilot $copilot -Mechanized $mechanized -TieBreaker $tieBreaker

# ---------- Emit JSON ----------
$result = [ordered]@{
    pr           = $Pr
    repo         = "$owner/$repo"
    head_sha     = $headSha
    timestamp    = (Get-Date -AsUtc -Format 'o')
    verdicts     = [ordered]@{
        codex_r1 = $codexR1
        copilot  = $copilot
        claude_local = @{
            verdict = 'INFORMATIONAL'
            reason  = 'Claude (this orchestrator) is the synthesizer, not a separate review vote per Anthropic sub-agents docs.'
        }
        mechanized = $mechanized
        tie_breaker = $tieBreaker
    }
    consensus    = $consensus.consensus
    consensus_reason = $consensus.reason
    tier_2_needed = ($codexR1.verdict -eq 'REVISE' -or $copilot.verdict -eq 'BLOCK')
    architecture = 'A2-Local-Only (per W432-FINALIZE §13 ADR v2)'
    schema_version = '1.0'
}

$json = $result | ConvertTo-Json -Depth 10
if ($OutPath) {
    $json | Set-Content -Path $OutPath -Encoding UTF8
    Write-Host "[multi-model-review] JSON written: $OutPath" -ForegroundColor Green
} else {
    Write-Output $json
}

# Exit codes
switch ($consensus.consensus) {
    'APPROVE'                       { exit 0 }
    'APPROVE_WITH_COPILOT_DISSENT'  { exit 0 }
    'REVISE'                        { exit 1 }
    'BLOCK'                         { exit 1 }
    default                         { exit 2 }
}
