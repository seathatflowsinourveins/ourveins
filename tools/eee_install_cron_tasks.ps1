#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# Wave 156 — Daemon-mode conversion (was Wave 94 spawn-per-tick)
#
# Replaces spawn-per-60s `--once` Scheduled Task with single-boot `--start`
# long-running daemon. Eliminates spawn-churn: ~60 python.exe/hour -> 1 per boot
# (poller) + ~12/hour -> 1 (planner). Both Python scripts already ship `--start`
# loop mode (poller L378-426 PID file + stop-sentinel; planner L218,L240 same).
#
# Cite chain (per CR-1 + citation-discipline.md rule #8):
# constituents=[
#   TIER-1-NAMED-AUTHOR-QUOTE @ Adam Wiggins (Heroku) Twelve-Factor App §VIII
#     "Disposability" https://12factor.net/disposability — "Processes are
#     disposable, meaning they can be started or stopped at a moment's notice",
#   TIER-1-DIRECT @ Microsoft Learn New-ScheduledTaskTrigger -AtStartup
#     https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtasktrigger,
#   TIER-1-DIRECT @ Microsoft Learn New-ScheduledTaskSettingsSet
#     -ExecutionTimeLimit (PT0S=disabled, here `New-TimeSpan -Days 0`)
#     https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtasksettingsset,
#   TIER-1-DIRECT @ Aperant rate-limits research
#     Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md @ HEAD cba7a027,
#   TIER-1-DIRECT @ local poller --start impl
#     tools/aperant_rate_limit_poller.py:378-426 (PID file + stop-sentinel),
#   TIER-1-DIRECT @ local planner --start impl
#     tools/eee_account_rotation_planner.py:218,240,
#   TIER-3-LOCAL-COMPOSITION @ claude-sota-installed Wave 156 daemon-mode glue
# ]; effective_tier=TIER-3-LOCAL-COMPOSITION (MIN_PRECEDENCE per citation-discipline.md rule #8)
#
# CR-3 cross-model gate (Phase 1 bootstrap exception): codex T1 NEEDS-REVISION
# conf=0.89 + 4 prescribed_edits applied per codex-t1-fix-forward-pattern.md
# Pattern A. Verdict file: .claude/state/codex_consult_w156_aperant_daemon_mode_OUT.txt
#
# LAUNCH-DISCIPLINE D1 invariants (per .claude/rules/launch-discipline.md):
# - REVERSIBLE: -Uninstall sends cooperative `--stop` sentinel to poller, then
#   Stop-ScheduledTask + Unregister-ScheduledTask. Git revert restores Wave 94.
# - OBSERVABLE: daemons append to .claude/state/{aperant_poller,eee_rotation_planner}.jsonl
#   continuously; -Status shows last-run + next-run + state.
# - INCREMENTAL: -DryRun preview before mutation; PROBE 18 OS-State-Mutation
#   stop-if-running before Register-ScheduledTask -Force.
#
# DEPRECATION-DISCIPLINE (per .claude/rules/deprecation-discipline.md):
# Wave 94 spawn-per-tick `--once` model deprecated -> replaced by daemon `--start`.
# 4-stage migration: parallel-deploy N/A (single instance); telemetry via existing
# JSONL signals; cutover via -Uninstall + -Install; removal complete in this commit.
#
# Wave 91 commit `6ebcf08` Ship 1W: tools/aperant_rate_limit_poller.py (original)
# Wave 93 commit `63cc261` Ship 1X: tools/eee_account_rotation_planner.py (original)
#
# Usage:
#   tools/eee_install_cron_tasks.ps1 -DryRun       # preview
#   tools/eee_install_cron_tasks.ps1 -Install      # register + start both daemons
#   tools/eee_install_cron_tasks.ps1 -Uninstall    # cooperative stop + remove tasks
#   tools/eee_install_cron_tasks.ps1 -Status       # show registered tasks + last-run

param(
    [switch]$DryRun,
    [switch]$Install,
    [switch]$Uninstall,
    [switch]$Status,
    [string]$PythonBin = 'Z:/venvs/claude/Scripts/python.exe',
    [int]$PollIntervalSec = 60,
    [int]$PlanIntervalMin = 5
)

$ErrorActionPreference = 'Stop'

$RepoRoot = 'Z:\claude-sota-installed'
$PollerScript = "$RepoRoot\tools\aperant_rate_limit_poller.py"
$PlannerScript = "$RepoRoot\tools\eee_account_rotation_planner.py"

$PollerTaskName = 'EEE-Aperant-Poller'
$PlannerTaskName = 'EEE-Rotation-Planner'

function Show-Plan {
    Write-Host "Wave 156 daemon-mode cron deployment plan:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Task 1: $PollerTaskName"
    Write-Host "  Script:   $PollerScript"
    Write-Host "  Args:     --start --interval-seconds $PollIntervalSec"
    Write-Host "  Trigger:  AtStartup (single boot-time launch; internal loop polls every ${PollIntervalSec}s)"
    Write-Host "  Recovery: -RestartCount 3, -RestartInterval 1min, -ExecutionTimeLimit unlimited"
    Write-Host "  Stop:     cooperative via PID-file stop-sentinel (--stop)"
    Write-Host ""
    Write-Host "Task 2: $PlannerTaskName"
    Write-Host "  Script:   $PlannerScript"
    $plannerSec = $PlanIntervalMin * 60
    Write-Host "  Args:     --start --interval-seconds $plannerSec --threshold-pct 80"
    Write-Host "  Trigger:  AtStartup (single boot-time launch; internal loop runs every ${PlanIntervalMin}min)"
    Write-Host "  Recovery: -RestartCount 3, -RestartInterval 1min, -ExecutionTimeLimit unlimited"
    Write-Host ""
    Write-Host "Resolves: spawn-per-tick churn (~60 python.exe/hr -> 1 daemon/boot)" -ForegroundColor Yellow
    Write-Host "Cite:     12factor.net/disposability + Microsoft Learn New-ScheduledTaskTrigger -AtStartup"
    Write-Host "Persistence preserved: poller still polls every 60s + planner re-applies disabled flag every 5min."
}

function Test-Prereqs {
    if (-not (Test-Path $PythonBin)) {
        Write-Host "ERROR: Python not found at $PythonBin" -ForegroundColor Red
        return $false
    }
    if (-not (Test-Path $PollerScript)) {
        Write-Host "ERROR: Poller script not found at $PollerScript" -ForegroundColor Red
        return $false
    }
    if (-not (Test-Path $PlannerScript)) {
        Write-Host "ERROR: Planner script not found at $PlannerScript" -ForegroundColor Red
        return $false
    }
    return $true
}

function Install-Tasks {
    if (-not (Test-Prereqs)) { return 1 }

    Write-Host "Registering scheduled tasks..." -ForegroundColor Cyan

    # PROBE 18 OS-State-Mutation safety per launch-discipline.md §7th axis:
    # Stop any currently-running task instance before Register-ScheduledTask -Force,
    # so rerunning -Install outside the Ready/no-live-process probe window doesn't
    # leave a stale daemon competing with the new daemon.
    # (Codex T1 W156 prescribed_edit #1 — operational reversibility)
    foreach ($name in @($PollerTaskName, $PlannerTaskName)) {
        $task = Get-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
        if ($task -and $task.State -eq 'Running') {
            Stop-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
        }
    }

    # Task 1: Aperant Poller — daemon mode (single boot-time launch, internal loop)
    $pollerAction = New-ScheduledTaskAction -Execute $PythonBin -Argument "$PollerScript --start --interval-seconds $PollIntervalSec" -WorkingDirectory $RepoRoot
    $pollerTrigger = New-ScheduledTaskTrigger -AtStartup
    $pollerSettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Days 0) -MultipleInstances IgnoreNew -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)

    Register-ScheduledTask -TaskName $PollerTaskName -Action $pollerAction -Trigger $pollerTrigger -Settings $pollerSettings -Description 'Ship 1W daemon: Aperant rate-limit poller (--start --interval-seconds, cooperative --stop via PID-file)' -Force | Out-Null
    # Codex T1 W156 prescribed_edit #3 — immediate start (AtStartup alone waits for next boot)
    Start-ScheduledTask -TaskName $PollerTaskName
    Write-Host "  Registered/started: $PollerTaskName (daemon interval ${PollIntervalSec}s)" -ForegroundColor Green

    # Task 2: Rotation Planner — daemon mode
    $plannerIntervalSec = $PlanIntervalMin * 60
    $plannerAction = New-ScheduledTaskAction -Execute $PythonBin -Argument "$PlannerScript --start --interval-seconds $plannerIntervalSec --threshold-pct 80" -WorkingDirectory $RepoRoot
    $plannerTrigger = New-ScheduledTaskTrigger -AtStartup
    $plannerSettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Days 0) -MultipleInstances IgnoreNew -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)

    Register-ScheduledTask -TaskName $PlannerTaskName -Action $plannerAction -Trigger $plannerTrigger -Settings $plannerSettings -Description 'Ship 1X daemon: Cycle-aware rotation planner (--start --interval-seconds internal loop)' -Force | Out-Null
    # Codex T1 W156 prescribed_edit #4 — immediate start
    Start-ScheduledTask -TaskName $PlannerTaskName
    Write-Host "  Registered/started: $PlannerTaskName (daemon interval ${PlanIntervalMin}min)" -ForegroundColor Green

    Write-Host ""
    Write-Host "Both daemons registered + started. Auto-restart up to 3x in 1min on crash." -ForegroundColor Cyan
    Write-Host "Verify via: tools/eee_install_cron_tasks.ps1 -Status"
}

function Uninstall-Tasks {
    # Codex T1 W156 prescribed_edit #2 — daemon-mode reversibility:
    # cooperative --stop (PID-file stop-sentinel) for poller first; then Stop-ScheduledTask
    # handles the planner (no --stop contract locally) and any non-cooperative remainder;
    # then Unregister-ScheduledTask removes the registration.
    foreach ($name in @($PollerTaskName, $PlannerTaskName)) {
        $task = Get-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
        if ($task) {
            if ($name -eq $PollerTaskName) {
                # Cooperative stop: writes .stop sentinel; daemon loop polls it max 15s.
                # `*>$null` redirects all streams (stdout+stderr+info) so python.exe's
                # stderr-logging doesn't trigger PowerShell's $ErrorActionPreference='Stop'
                # via NativeCommandError record (per Microsoft Learn about_Redirection).
                & $PythonBin $PollerScript --stop *>$null
                Start-Sleep -Seconds 2
            }
            Stop-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
            Unregister-ScheduledTask -TaskName $name -Confirm:$false
            Write-Host "  Stopped + Unregistered: $name" -ForegroundColor Yellow
        } else {
            Write-Host "  Not present: $name" -ForegroundColor Gray
        }
    }
    Write-Host "Uninstall complete." -ForegroundColor Cyan
}

function Show-Status {
    Write-Host "Scheduled task status:" -ForegroundColor Cyan
    foreach ($name in @($PollerTaskName, $PlannerTaskName)) {
        $task = Get-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
        if ($task) {
            $info = Get-ScheduledTaskInfo -TaskName $name
            Write-Host "  $name :"
            Write-Host "    State:        $($task.State)"
            Write-Host "    LastRun:      $($info.LastRunTime)"
            Write-Host "    LastResult:   $($info.LastTaskResult) ($([System.ComponentModel.Win32Exception]::new($info.LastTaskResult).Message))"
            Write-Host "    NextRun:      $($info.NextRunTime)"
        } else {
            Write-Host "  $name : NOT REGISTERED" -ForegroundColor Yellow
        }
    }
    Write-Host ""
    Write-Host "Latest poller iteration (.claude/state/aperant_poller.jsonl):"
    Get-Content "$RepoRoot\.claude\state\aperant_poller.jsonl" -Tail 1 -ErrorAction SilentlyContinue
    Write-Host ""
    Write-Host "Latest planner iteration (.claude/state/eee_rotation_planner.jsonl):"
    Get-Content "$RepoRoot\.claude\state\eee_rotation_planner.jsonl" -Tail 1 -ErrorAction SilentlyContinue
}

# Main
if ($DryRun) {
    Show-Plan
    if (Test-Prereqs) {
        Write-Host "Pre-reqs OK. Run with -Install to register tasks." -ForegroundColor Green
    }
    exit 0
}

if ($Install) {
    Install-Tasks
    exit 0
}

if ($Uninstall) {
    Uninstall-Tasks
    exit 0
}

if ($Status) {
    Show-Status
    exit 0
}

# No mode flag - show help
Write-Host "Usage:" -ForegroundColor Cyan
Write-Host "  tools/eee_install_cron_tasks.ps1 -DryRun       # preview"
Write-Host "  tools/eee_install_cron_tasks.ps1 -Install      # register Ship 1W (60s) + Ship 1X (5min) Scheduled Tasks"
Write-Host "  tools/eee_install_cron_tasks.ps1 -Uninstall    # remove tasks"
Write-Host "  tools/eee_install_cron_tasks.ps1 -Status       # show registered tasks + last-run"
exit 0
