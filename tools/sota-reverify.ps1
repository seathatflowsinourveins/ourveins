#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# sota-reverify.ps1 - W288-P2-C5 decay-cron helper
#
# Implements W286d Section C.5 (proactive decision-decay re-litigation):
# queries the graphiti `group_id="adoption-decisions"` ledger for the OLDEST
# ACTIVE/AGING verdict (by `decided_at` ascending OR `reverification_due`
# passed) and prints exactly which candidate to re-run sota-convergence-audit
# v2 against. Operator pipes the candidate slug into a fresh CC session.
#
# Cardinal-rule compliance:
#   R2: NOT a slash command (no self-invent skill/plugin). Direct-CLI helper
#       under tools/ per the pattern of tools/bootstrap-runtime.ps1.
#   R4: no settings.json mutation; no hook registration; pure read+report.
#
# Usage:
#   .\tools\sota-reverify.ps1                  # print oldest candidate to re-litigate
#   .\tools\sota-reverify.ps1 -Limit 5         # print N oldest candidates
#   .\tools\sota-reverify.ps1 -Json            # emit JSON envelope (for /loop)
#   .\tools\sota-reverify.ps1 -DryRun          # only print the graphiti query
#
# Cron wiring (per W286d C.5 + installed `loop:` skill spec):
#   /loop 7d "/sota-reverify oldest"           # operator-side cron (the loop
#                                              # skill polls weekly; the prompt
#                                              # body just invokes this PS1
#                                              # via Bash and proceeds with
#                                              # sota-convergence-audit on
#                                              # the printed candidate slug)
#
# Cites:
#   - W286d Section C.5 (the proposal):
#     docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md:118-128
#   - W284a v2 SKILL state machine (ACTIVE 0-5 / AGING 6-11 / STALE 12+):
#     .claude/skills/sota-convergence-audit/SKILL.md:136-148
#   - `loop:` installed skill (per the skill-list description: "Run a prompt
#     or slash command on a recurring interval (e.g. /loop 5m /foo)")
#   - Idempotency-and-retry-safety hook rule (affaan-m_everything-claude-code
#     :2926,8665,16638) - re-runs are no-ops when no candidate is due.

[CmdletBinding()]
param(
    # Number of oldest candidates to print. Default 1 = single re-litigation
    # ticket per cron tick (avoids flooding the operator per W286d C.5 risk).
    [int]$Limit = 1,

    # Emit a machine-readable JSON envelope on stdout (for /loop programmatic
    # consumption). Default OFF -> human-readable summary.
    [switch]$Json,

    # Print the graphiti query that WOULD run, then exit 0 without invoking
    # MCP. Used by CI / smoke tests.
    [switch]$DryRun,

    # graphiti MCP namespace. Default matches sota-convergence-audit v2 spec
    # (SKILL.md:107).
    [string]$GroupId = 'adoption-decisions',

    # Wave thresholds for the lazy state machine (SKILL.md:140-142). Override
    # only if the v2 decay constants change.
    [int]$ActiveMaxWave = 5,
    [int]$AgingMaxWave = 11,

    # graphiti search query string. Defaults to the schema field name so the
    # MCP's semantic search returns adoption-verdict episodes.
    [string]$SearchQuery = 'adoption-verdict reverification_due'
)

$ErrorActionPreference = 'Stop'

$RepoRoot = (Resolve-Path "$PSScriptRoot\..").Path
$NowIso = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

# ---------------------------------------------------------------------------
# Dry-run: print the equivalent MCP call shape and exit 0 (idempotent smoke).
# ---------------------------------------------------------------------------
if ($DryRun) {
    $dryEnvelope = @{
        timestamp    = $NowIso
        mode         = 'dry-run'
        group_id     = $GroupId
        search_query = $SearchQuery
        limit        = $Limit
        equivalent   = @(
            'mcp__graphiti__search_memory_nodes',
            "  query=$SearchQuery",
            "  group_ids=[$GroupId]",
            "  max_nodes=$Limit"
        ) -join "`n"
        next_action  = "operator runs sota-convergence-audit v2 on the printed candidate slug"
    }
    if ($Json) {
        $dryEnvelope | ConvertTo-Json -Depth 4
    } else {
        Write-Host "[sota-reverify] DRY-RUN: would query graphiti"
        Write-Host "  group_id     = $GroupId"
        Write-Host "  search_query = $SearchQuery"
        Write-Host "  limit        = $Limit"
        Write-Host "  -- no MCP call made --"
    }
    exit 0
}

# ---------------------------------------------------------------------------
# Live query: we cannot call MCP from PowerShell directly (MCP servers are
# wired into the CC process; PS has no client lib). The contract is: PRINT
# the canonical instruction the operator (or /loop body) follows in a CC
# session. The CC session calls mcp__graphiti__search_memory_nodes for us.
#
# This keeps the script cardinal-rule-2 compliant (no self-invent daemon /
# python wrapper around the MCP socket) and idempotent (re-running just
# re-prints the same instruction; no state mutation).
# ---------------------------------------------------------------------------

$instruction = @"
W288-P2-C5 sota-reverify (decay cron, W286d Section C.5)

In a fresh Claude Code session, run:

  1. Call mcp__graphiti__search_memory_nodes:
       query     = "$SearchQuery"
       group_ids = ["$GroupId"]
       max_nodes = $Limit

  2. Sort the returned episodes by `decided_at` ASCENDING (oldest first).
     Drop any episode where status="RETIRED" or status="RE-LITIGATED" -
     those are already closed. Drop episodes where rule_version="sca-v2"
     AND (current_wave - decided_at_wave) <= $ActiveMaxWave (still ACTIVE).
     Prefer episodes flagged AGING (wave $($ActiveMaxWave + 1)-$AgingMaxWave)
     or STALE (wave $($AgingMaxWave + 1)+).

  3. For the top $Limit episode(s), invoke sota-convergence-audit v2 with the
     candidate slug from episode_body.candidate. The audit emits a NEW
     verdict episode with supersedes=<prior_uuid> (SKILL.md:127).

  4. Summarize: "W<n>-sota-reverify: <N> verdicts re-litigated, <M> RETIRED."
"@

if ($Json) {
    $env = @{
        timestamp     = $NowIso
        mode          = 'live'
        group_id      = $GroupId
        search_query  = $SearchQuery
        limit         = $Limit
        active_max    = $ActiveMaxWave
        aging_max     = $AgingMaxWave
        instruction   = $instruction
    }
    $env | ConvertTo-Json -Depth 4
} else {
    Write-Host $instruction
}

exit 0
