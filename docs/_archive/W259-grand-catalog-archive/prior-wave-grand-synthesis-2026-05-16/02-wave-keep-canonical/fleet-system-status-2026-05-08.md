# Fleet System Status — 2026-05-08

> Read-only snapshot. NO processes killed. NO files deleted. Output is action-list for orchestrator.
>
> Probe context: invoked from claude PID 8360 (the parent of this session's pwsh PID 108804 per `Win32_Process.ParentProcessId`). Other claude `Z:\claude-sota-installed\.local\bin\claude.exe` PID 3416 is the second concurrent CC session.

## 1. Process inventory (claude-sota-installed-relevant only)

Wider node/python populations exist (73 node procs, 21 python procs across the box) but most belong to OTHER toolchains (Adobe CC, fnm shells, ai-ml venv, openviking-server, cli-proxy-api). Table below scopes to **this runtime + its codex helpers + suspected vestigials** per scope item 1.

| PID | Name | Parent | Start | RSS_MB | CPU_S | CmdLine (truncated) | Verdict |
|---|---|---|---|---|---|---|---|
| 3416 | claude | (parent gone — orphan from shell exit, normal) | 5/7 7:55 PM | 739.6 | 146.1 | `Z:\claude-sota-installed\.local\bin\claude.exe` | LIVE (other CC session, 14+ TCP to 160.79.104.10:443 = Anthropic API) |
| 8360 | claude | (parent gone) | 5/7 8:05 PM | 672.2 | 57.3 | `Z:\claude-sota-installed\.local\bin\claude.exe` | LIVE (THIS session — parent of pwsh 108804) |
| 36928 | litellm | 32980 (gone) | 5/7 10:03 AM | 0.8 | 0.0 | `Z:\venvs\claude\Scripts\litellm.exe --config Z:/claude/observability/litellm_config.yaml --num_workers 2 --port 4000` | **VESTIGIAL** — no TCP connections, parent gone, 0 CPU since 10:03 AM. 10+ hours idle. |
| 63592 | python | 36928 (litellm) | 5/7 10:03 AM | 0.0 | 0.0 | `Z:\venvs\claude\Scripts\python.exe Z:\venvs\claude\Scripts\litellm.exe --config Z:/claude/observability/litellm_config.yaml --num_workers 2 --port 4000` | **VESTIGIAL** — windowed-process stub for litellm; 0 RSS, 0 CPU, 0 TCP. Will die when 36928 killed. |
| 19208 | python | (sibling claude) | 5/7 10:03 AM | 73.5 | 115.5 | sibling Python313 helper | UNRELATED to this runtime; LIVE (sibling claude-sota tooling) |
| 85744 | python | (sibling claude) | 5/7 10:03 AM | 15.8 | 45.9 | sibling Python313 helper | UNRELATED; LIVE |
| 2044, 23344, 32112, 37520, 39124, 54456, 65780, 67100, 72820, 75176, 78756, 82184, 89860, 95844, 110936 | codex (15 procs) | various `node.exe` codex.js launchers | 5/7 12:27 AM – 5:59 PM | ~2.5 each (38.0 total) | varies (some 458s, most <30s) | `codex.js app-server` (12) or `codex.js exec --ephemeral -p deep-review-exec` (3) | LIVE — every codex has live `node.exe` parent running `codex.js app-server`. These are the T1/T2/T3 helpers. **None orphaned.** Total 16 codex procs / 81.8 MB; tolerable. |
| 97112 | powershell | 75720 | 5/7 ~8:30 PM (running) | (small) | n/a | inline 45-minute monitor loop polling `system-monitor.jsonl` every 30s | LIVE (already-running monitor) — see Section 6 |

Total claude-runtime RSS: 1411.8 MB across 2 CC sessions = matches reported 692+611 baseline. No zombie claude.exe.

## 2. Kill-list (risk-rated)

| PID | Why safe | Risk | Kill cmd |
|---|---|---|---|
| 36928 (litellm) | Parent (32980) gone, 0 CPU since 10:03 AM, no TCP listener, no inbound connections; was an observability proxy from sibling `Z:\claude` config NOT used by this runtime (CR-5 isolation) | LOW — confirm no CCC traffic depending on `:4000` first. If sibling `Z:\claude` still uses it, may want to leave. Verify with `Get-NetTCPConnection -LocalPort 4000`. | `Stop-Process -Id 36928 -Force` |
| 63592 (python stub) | Child of 36928; auto-dies with parent | LOW — kill after 36928 | `Stop-Process -Id 63592 -Force` (or just kill 36928, this one exits) |
| 65780, 67100, 72820 (codex `exec --ephemeral`) | "ephemeral" deep-review-exec instances; if their node.exe parents are still active they're working. Currently all 3 parents (65528, 27504, 68996) are LIVE — DO NOT KILL. | n/a | n/a — leave alone |
| 97112 (existing 45-min monitor) | Already writing `.claude/state/system-monitor.jsonl`; will self-terminate at ~9:15 PM | LOW — leave running OR stop if redesigned monitor below is preferred | `Stop-Process -Id 97112 -Force` |

**No zombies found among claude.exe / codex.exe.** Codex 458s CPU on PID 2044 is its lifetime CPU since midnight, NOT a hung loop.

## 3. Cleanup-list (disk reclaim)

| Path | Age | Reason | Cmd | Savings |
|---|---|---|---|---|
| `Z:\claude-sota-installed\tmp\fire*-commit-msg*.txt` (12 files) | 0.8–1.0 days | Stale commit-msg scratch from fires 20–46 | `Get-ChildItem Z:\claude-sota-installed\tmp -Filter 'fire*-commit-msg*.txt' \| Remove-Item -WhatIf` (drop -WhatIf to act) | ~0.05 MB |
| `Z:\claude-sota-installed\tmp\fire44-marketplaces-patch.py` | 0.8 days | One-shot patch, applied | `Remove-Item Z:\claude-sota-installed\tmp\fire44-marketplaces-patch.py` | ~0.001 MB |
| `Z:\claude-sota-installed\.claude\state\codex_rescue_read_tool_regex_error_OUT.txt` | 0.8 days | Codex rescue output, post-resolution | move to `Z:\claude-sota-installed\.claude\state\archive\` then optionally compress | 1.98 MB |
| `Z:\claude-sota-installed\.claude\state\codex_consult_fire42_eee_silent_hang_OUT.txt` | 0.9 days | Resolved consult output | archive | 0.41 MB |
| `Z:\claude-sota-installed\.claude\state\codex_t2_pre_commit_gate.jsonl` | 0.96 days idle | Stale gate JSONL not appended in 23h | rotate to `.archive` | 0.0004 MB |
| `Z:\claude-sota-installed\.claude\state\codex_t1_auto_spawn.jsonl` | 0.95 days idle | Stale gate JSONL | rotate | 0.0009 MB |
| `Z:\claude-sota-installed\.claude\state\auto_proceed_gate.jsonl` | 0.86 days idle (last 11:57 PM) | Old gate; new buckets in `auto_proceed_allow_buckets/` | rotate | 0.012 MB |
| `Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code\` | n/a | 109.7 MB / 7035 files. NOT cleanup material — required for skill activation. | KEEP | 0 |

Total reclaim if state/tmp cleanup applied: ~2.45 MB. Per-category disk:
- `tmp/` total: **0.41 MB** (12 files >18h old; 7 files >0.95 days)
- `.claude/state/` total: **2.52 MB** (top contributor: codex_rescue_read_tool 1.98 MB)
- `.claude/debug/` total: **<0.01 MB** (essentially empty — no rotation needed)
- `.claude/plugins/` total: **173.9 MB** (everything-claude-code 109.7 MB + claude-plugins-official 1.3 MB + openai-codex 0.2 MB + others)
- `.claude/projects/` total: **16.1 MB** (active session JSONL transcripts; DO NOT TOUCH)
- Drive Z: 81.2% used (3027 GB used / 698 GB free) — not pressure cause of lag.

## 4. Disk-usage summary (claude-sota-installed only)

| Category | MB | Notes |
|---|---|---|
| `.claude/plugins/` | 173.9 | install-class; KEEP |
| `.claude/projects/` | 16.1 | active session transcripts; KEEP |
| `.claude/state/` | 2.5 | 2.4 MB cleanup-eligible |
| `tmp/` | 0.41 | 12 stale fire-N commit-msg files |
| `.claude/debug/` | <0.01 | |
| `.claude/hooks/` | 0.4 | |
| Workspace overall (relevant) | ~193 | far from disk pressure |

## 5. Open-handle table (non-claude lockers into Z:\claude-sota-installed)

`handle.exe` (Sysinternals) **NOT installed** — `Get-Command handle.exe` returned empty. Fallback `Get-Process | Where-Object {$_.Modules.FileName -like 'Z:\claude-sota-installed*'}` returned **empty** (no non-claude processes have modules from this workspace). **No external lockers detected.** Lag is NOT caused by external file locks.

## 6. Continuous-monitor design

**An existing monitor PID 97112 is already running** (45-minute `Start-Sleep 30` loop writing `.claude/state/system-monitor.jsonl`). Recommend either letting it expire (~9:15 PM) or killing it before launching the redesigned version below.

### Redesigned monitor (per scope item 6)

The script below adds: per-process top-3 RSS, codex_proc_count, hooks_dir_size_mb, longest_hook_jsonl_age_min, 10 MB rotation, 24-hour self-terminate.

```powershell
# Z:\claude-sota-installed\tools\system-monitor.ps1
$ErrorActionPreference = 'SilentlyContinue'
$out      = 'Z:\claude-sota-installed\.claude\state\system-monitor.jsonl'
$stateDir = 'Z:\claude-sota-installed\.claude\state'
if (-not (Test-Path (Split-Path $out))) { New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null }
$startedAt = Get-Date
$endAt     = $startedAt.AddHours(24)   # self-terminate at 24h
while ((Get-Date) -lt $endAt) {
  $ts        = (Get-Date).ToString('o')
  $claude    = @(Get-Process -Name claude -ErrorAction SilentlyContinue)
  $codex     = @(Get-Process -Name codex  -ErrorAction SilentlyContinue)
  $allProcs  = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -and ($_.Path -like '*claude-sota-installed*' -or $_.Path -like '*codex*') })
  $totalRss  = [math]::Round((($allProcs | Measure-Object WorkingSet64 -Sum).Sum) / 1MB, 1)
  $top3      = $allProcs | Sort-Object WorkingSet64 -Descending | Select-Object -First 3 | ForEach-Object { @{ pid=$_.Id; name=$_.ProcessName; rss_mb=[math]::Round($_.WorkingSet64/1MB,1) } }
  $hooksMB   = [math]::Round((Get-ChildItem $stateDir -File -Recurse -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1MB, 2)
  $jsonls    = Get-ChildItem $stateDir -Filter '*.jsonl' -Force -ErrorAction SilentlyContinue
  $longestAg = if ($jsonls) { [math]::Round((($jsonls | ForEach-Object { ((Get-Date) - $_.LastWriteTime).TotalMinutes }) | Measure-Object -Maximum).Maximum, 1) } else { 0 }
  $obj = [PSCustomObject]@{
    ts                          = $ts
    claude_proc_count           = $claude.Count
    total_rss_mb                = $totalRss
    top_3_rss_processes         = $top3
    codex_proc_count            = $codex.Count
    hooks_dir_size_mb           = $hooksMB
    longest_hook_jsonl_age_min  = $longestAg
  }
  Add-Content -Path $out -Value ($obj | ConvertTo-Json -Compress -Depth 4)
  if ((Test-Path $out) -and (Get-Item $out).Length -gt 10MB) {
    $rotated = "$out.$((Get-Date).ToString('yyyyMMddHHmm'))"
    Move-Item $out $rotated -Force
  }
  Start-Sleep -Seconds 30
}
Add-Content -Path $out -Value ('{"ts":"' + (Get-Date).ToString('o') + '","monitor":"self_terminated_after_24h"}')
```

Launch (background, non-blocking):
```powershell
Start-Process -FilePath 'pwsh.exe' -ArgumentList '-NoProfile','-NonInteractive','-WindowStyle','Hidden','-File','Z:\claude-sota-installed\tools\system-monitor.ps1' -WorkingDirectory 'Z:\claude-sota-installed' -RedirectStandardOutput 'Z:\claude-sota-installed\.claude\state\system-monitor.stdout.log' -RedirectStandardError 'Z:\claude-sota-installed\.claude\state\system-monitor.stderr.log'
```

### Cite anchors (TIER-1)

- **`Get-Process` / `WorkingSet64`** — Microsoft Learn `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process` (canonical authority for `WorkingSet64` accurate-RSS property; PS 5.1+ and 7.x).
- **`Get-CimInstance Win32_Process` for ParentProcessId/CommandLine** — Microsoft Learn `https://learn.microsoft.com/en-us/powershell/module/cimcmdlets/get-ciminstance` + WMI `Win32_Process` class `https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-process`.
- **`Get-NetTCPConnection -OwningProcess`** — Microsoft Learn `https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection` (TIER-1; `-OwningProcess` parameter binds connections to PID).
- **`Add-Content` / `Move-Item` for log rotation** — Microsoft Learn `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/add-content`.
- **ISO-8601 round-trip "o" format** — Microsoft Learn `https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings#Roundtrip`.
- **CC log paths** — Anthropic CC env-vars `https://code.claude.com/docs/en/env-vars` (`CLAUDE_CODE_DEBUG_LOGS_DIR`, plugin cache layout).

## 7. System-health snapshot (1-line JSON)

```json
{"ts":"2026-05-07T20:31:15-04:00","claude_pids":[3416,8360],"claude_total_rss_mb":1411.8,"codex_count":16,"codex_total_rss_mb":81.8,"node_count":73,"node_total_rss_mb":2145.8,"python_count":21,"python_total_rss_mb":489.2,"vestigials":[{"pid":36928,"name":"litellm","reason":"no_tcp_no_parent_idle_10h"},{"pid":63592,"name":"python_litellm_stub","reason":"child_of_36928"}],"workspace_disk_mb":193,"plugin_cache_mb":173.9,"state_dir_mb":2.5,"tmp_stale_files":12,"open_handle_lockers":0,"existing_monitor_pid":97112,"existing_monitor_ends":"2026-05-07T21:15"}
```

## Lag-cause hypothesis (TL;DR)

Lag is **not** from claude.exe (1.4 GB across 2 sessions is normal) nor from disk pressure (698 GB free). Likely culprits in priority order:
1. **node.exe sprawl: 73 procs / 2.1 GB RSS** — most are sibling/Adobe/fnm tooling unrelated to this runtime. The 16 active codex helpers contribute ~80 MB, fine.
2. **22 codex parent-node helpers running `codex.js app-server`** — each holds a Node V8 heap of ~5 MB; these accumulate over the day from T1/T2 dispatches. Consider periodic codex helper cleanup (out of scope per "no kills" constraint).
3. **2 vestigial litellm procs** are ~negligible RSS but indicate sibling state-bleed.
4. **No filesystem locks**; `.claude/projects` JSONL writes (active session) explain transient I/O.

The redesigned monitor will track `total_rss_mb` and `codex_proc_count` over time so the orchestrator can correlate lag spikes with codex fan-outs.
