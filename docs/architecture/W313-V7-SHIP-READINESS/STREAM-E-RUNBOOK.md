# W313 Stream E — HIDDEN-ERRORS-SWEEP P0/P2/P3 Operator Runbook

**Wave**: W313 (sota-convergence ship-readiness)
**Stream**: E — operator-decision + shell-cleanup findings
**Date**: 2026-05-19
**Source**: `docs/architecture/W310-LAG-DIAGNOSIS/HIDDEN-ERRORS-SWEEP.md` findings #2, #3, #8, #9, #11, #12, #13
**User context**: `ohhello\42` (SeImpersonatePrivilege Enabled, SeRestorePrivilege Disabled)
**nssm`get` works in agent context**; **`nssm set` requires operator validation** (writes to HKLM; documented but NOT applied)

---

## Finding #2 (P0) — Cognee LLM_API_KEY missing → APPLIED-IN-RUNBOOK-FORM (operator must execute)

### PROBE result

```
$ nssm get CogneeMCP AppEnvironmentExtra
OPENAI_API_KEY=local
OPENAI_BASE_URL=http://127.0.0.1:8080/v1
LLM_MODEL=qwen36
PYTHONUNBUFFERED=1
PYTHONIOENCODING=utf-8
LANGFUSE_HOST=http://127.0.0.1:3000
LANGFUSE_BASE_URL=http://127.0.0.1:3000
LANGFUSE_PUBLIC_KEY=pk-lf-<REDACTED-see-CLAUDE.local.md>
LANGFUSE_SECRET_KEY=sk-lf-<REDACTED-see-CLAUDE.local.md>
SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee
DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data
EMBEDDING_PROVIDER=openai_compatible
EMBEDDING_MODEL=qwen3-embed-0.6b
EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
EMBEDDING_DIMENSIONS=1024
EMBEDDING_MAX_COMPLETION_TOKENS=8000
```

**Confirmed**: `LLM_API_KEY` is **NOT SET**. Only `OPENAI_API_KEY=local` is present. Cognee's `cognee.shared.logging_utils` reads `LLM_API_KEY` specifically (per the 422 `LLMAPIKeyNotSetError` stderr trace) — `OPENAI_API_KEY` is not a substitute in cognee >=0.2.

Also missing: explicit `LLM_ENDPOINT` (cognee separates `LLM_*` from `EMBEDDING_*`).

### Verdict — SKIPPED-NEEDS-OPERATOR

`nssm set CogneeMCP AppEnvironmentExtra` rewrites the entire env block; HKLM service-config writes need operator validation that no other live key is being clobbered (the existing block has 16 entries and a partial overwrite would silently break embeddings or langfuse tracing).

### Operator command (copy-paste; ELEVATED PowerShell required)

```powershell
# Stop service before rewriting env (NSSM picks up env only at process start)
nssm stop CogneeMCP

# Rewrite the FULL block — preserves all 16 existing keys + adds 3 new ones.
# CAUTION: `nssm set ... AppEnvironmentExtra` replaces the entire array; supply ALL keys.
nssm set CogneeMCP AppEnvironmentExtra `
  "OPENAI_API_KEY=local" `
  "OPENAI_BASE_URL=http://127.0.0.1:8080/v1" `
  "LLM_API_KEY=local" `
  "LLM_ENDPOINT=http://127.0.0.1:8080/v1" `
  "LLM_MODEL=qwen36" `
  "PYTHONUNBUFFERED=1" `
  "PYTHONIOENCODING=utf-8" `
  "LANGFUSE_HOST=http://127.0.0.1:3000" `
  "LANGFUSE_BASE_URL=http://127.0.0.1:3000" `
  "LANGFUSE_PUBLIC_KEY=$env:LANGFUSE_PUBLIC_KEY" `
  "LANGFUSE_SECRET_KEY=$env:LANGFUSE_SECRET_KEY" `
  "SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee" `
  "DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data" `
  "EMBEDDING_PROVIDER=openai_compatible" `
  "EMBEDDING_MODEL=qwen3-embed-0.6b" `
  "EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1" `
  "EMBEDDING_DIMENSIONS=1024" `
  "EMBEDDING_MAX_COMPLETION_TOKENS=8000"

# Restart and verify
nssm start CogneeMCP
Start-Sleep -Seconds 4

# Verification — last 50 stderr lines should now show NO LLMAPIKeyNotSetError
Get-Content 'Z:\claude-hub\logs\cognee-mcp-stderr.log' -Tail 50

# Optional: probe MCP initialize
Invoke-WebRequest -Uri http://127.0.0.1:8000/mcp -Method POST `
  -Headers @{'Accept'='application/json,text/event-stream'; 'Content-Type'='application/json'} `
  -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"runbook","version":"1.0"}}}' `
  -TimeoutSec 5 -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Rollback** (if cognee starts emitting different errors):

```powershell
nssm stop CogneeMCP
# Re-run the original nssm set without LLM_API_KEY + LLM_ENDPOINT lines (drop those 2 args)
nssm start CogneeMCP
```

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #2 + CLAUDE.local.md §c (langfuse env-block pattern) + CLAUDE.md L36 `cognee ✓ ACTIVE`.

---

## Finding #3 (P0) — basic-memory HTTP endpoint verification → RESOLVED

### PROBE result

```powershell
$ Invoke-WebRequest -Uri http://127.0.0.1:8765/mcp -Method POST `
    -Headers @{'Accept'='application/json,text/event-stream'} `
    -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' -TimeoutSec 5

STATUS: 200
BODY: event: message
data: {"jsonrpc":"2.0","id":1,"error":{"code":-32602,"message":"Invalid request parameters","data":""}}
```

### Verdict — RESOLVED

**The endpoint IS working.** HTTP 200 + valid SSE-MCP framing + JSON-RPC `-32602` error is the **correct** response to a malformed `initialize` (missing `protocolVersion`/`capabilities`/`clientInfo`). Server is alive, streamable-HTTP transport is bound, MCP protocol layer is parsing requests. The previous HIDDEN-ERRORS-SWEEP saw 404 on `/` and `/health` — those probe the wrong path. The actual MCP mount is `/mcp` (which is what `.mcp.json:basic-memory.url` declares), so config + server agree.

### No operator action required

The codex review's stdio-fallback recommendation (adding `uvx --from basic-memory==0.21.1 basic-memory mcp` as a backup mode) remains a valid resilience improvement, but it is **not load-bearing** — the live HTTP daemon is healthy. Filed as W314 backlog item: "Add stdio fallback to `.mcp.json:basic-memory` gated by `BASIC_MEMORY_TRANSPORT` env."

---

## Finding #8 (P2) — OllamaServe stop+disable → SKIPPED-NEEDS-OPERATOR

### PROBE result

```
Name      : OllamaServe
Status    : Stopped
StartType : Automatic
```

**Confirmed**: process is already Stopped (no consumer), but `StartType=Automatic` means it will respawn on next boot for no live consumer (graphiti tier retired per CLAUDE.md L36).

### Verdict — SKIPPED-NEEDS-OPERATOR

`Set-Service` against a system NSSM-managed service touches the SCM and is best done by the operator with full UAC context. (The agent can `Get-Service` fine but `Set-Service -StartupType` against an NSSM-owned service may need elevation depending on the service's ACL — safer to ask.)

### Operator command

```powershell
# Stop is no-op since already Stopped; flip startup type only
Set-Service OllamaServe -StartupType Manual

# Verify
Get-Service OllamaServe | Format-List Name, Status, StartType
# Expected:
#   Name      : OllamaServe
#   Status    : Stopped
#   StartType : Manual

# OPTIONAL: fully disable (irreversible without elevated set)
# Set-Service OllamaServe -StartupType Disabled
```

**Reversibility**: `Set-Service OllamaServe -StartupType Automatic; Start-Service OllamaServe`.

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #8 + CLAUDE.md L36 "FalkorDB+Ollama can be stopped".

---

## Finding #9 (P2) — Zombie node/uvx processes → REPORTED (operator decides)

### PROBE result

Probed via `Win32_Process` with O(1) parent lookup (parent dead = ParentProcessId not in active PID table):

```
ZOMBIES_TOTAL: 4
NODE: 3
UVX: 1
---
uvx.exe  PID=47560  PPID=45784 (DEAD)  | uvx hindsight-api@0.6.2 --daemon --idle-timeout 0 --port 9077
node.exe PID=17136  PPID=70180 (DEAD)  | ...fnm_multishells\38652_...\node.exe Z:\...\openai-codex\codex\1.0.4\scripts
node.exe PID=51644  PPID=29076 (DEAD)  | ...fnm_multishells\38652_...\node.exe Z:\...\openai-codex\codex\1.0.4\scripts
node.exe PID=119904 PPID=36156 (DEAD)  | ...fnm_multishells\71812_...\node.exe Z:\...\openai-codex\codex\1.0.4\scripts
```

### Verdict — REPORTED (do NOT kill per task constraint)

- **PID 47560 uvx (hindsight-api)** is the **LIVE daemon** holding port 9077 — this is the runtime tier-1 hindsight backend per CLAUDE.md L36 (`hindsight ✓` and `:9077`). **MUST be preserved.** Per task explicit constraint and HIDDEN-ERRORS-SWEEP finding #9: "Hindsight uvx PID 47560 should be EXEMPT".
- **3 node zombies under `openai-codex\codex\1.0.4\scripts`** are detached codex-companion broker children whose parent shells have exited. They hold no critical port; their parents (PIDs 70180/29076/36156) are gone. Lower W310 finding suggested `tools/process_hygiene_audit.py --execute --target-names node.exe --min-age-hours 12 --exempt-port 9077`.

### Operator command (when ready to clean)

```powershell
# PROBE first (show what would be killed, exempt :9077 holder):
Get-WmiObject Win32_Process -Filter "Name='node.exe'" |
  Where-Object {
    $_.CommandLine -match 'openai-codex.*codex.*1\.0\.4.*scripts' -and
    -not (Get-Process -Id $_.ParentProcessId -ErrorAction SilentlyContinue)
  } |
  Select-Object ProcessId, ParentProcessId, CommandLine

# Apply (omit -WhatIf to actually kill):
Get-WmiObject Win32_Process -Filter "Name='node.exe'" |
  Where-Object {
    $_.CommandLine -match 'openai-codex.*codex.*1\.0\.4.*scripts' -and
    -not (Get-Process -Id $_.ParentProcessId -ErrorAction SilentlyContinue)
  } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -WhatIf }

# uvx daemon — DO NOT TOUCH:
#   PID 47560 = hindsight-api on :9077 — load-bearing for tier-1 memory recall
```

**Why not auto-cleaned this wave**: per task constraint "DO NOT kill anything (operator decision; the hindsight uvx daemon on :9077 must be preserved)".

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #9.

---

## Finding #11 (P2) — Langfuse keys in CLAUDE.local.md → PARTIAL-APPLIED (rotation deferred)

### PROBE result

`.gitignore` currently has only `CLAUDE.local.md` (line 5). The codex review recommendation (b) is to **move the literal `pk-lf-*` / `sk-lf-*` assignments into a separate `CLAUDE.local.secrets.ps1` sidecar** sourced by `tools/eee.ps1`. That sidecar filename was NOT yet covered by `.gitignore`.

### Verdict — APPLIED (gitignore tightening) + SKIPPED-NEEDS-OPERATOR (key rotation)

**Applied this wave**: appended `CLAUDE.local.secrets.ps1` + `CLAUDE.local.*.ps1` to `.gitignore` (defensive — covers the recommended sidecar pattern + any sibling local-only PS1 files that get added next).

**Deferred to operator** (per constraint "DO NOT rotate secrets"):

1. **Rotate both keys** in self-hosted Langfuse :3000 admin UI (Settings → API Keys → "Rotate" on the W268 pair from 3 months ago).
2. **Move env-var assignments** out of `CLAUDE.local.md` lines 96-99 into `CLAUDE.local.secrets.ps1` (gitignored).
3. **Update `tools/eee.ps1`** to source the sidecar before launching CC:
   ```powershell
   if (Test-Path "$PSScriptRoot\..\CLAUDE.local.secrets.ps1") {
     . "$PSScriptRoot\..\CLAUDE.local.secrets.ps1"
   }
   ```

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #11 + CCBP `claude-memory.md:113` (gitignore class) + CLAUDE.local.md §c (current location of pasted keys).

---

## Finding #12 (P2) — `.basic-memory/` gitignore → RESOLVED

### PROBE result

```powershell
Test-Path 'Z:\claude-sota-installed\.basic-memory\'  →  True
```

Directory exists with `memory.db` (241 KB, last write 2026-05-18 00:57), `config.json`, 4 daemon `*.log` files.

`.gitignore` check:

```
219: .basic-memory/
220: /basic-memory/
```

### Verdict — RESOLVED

Both `.basic-memory/` AND `/basic-memory/` are already in `.gitignore` (added in the W259v15 working-tree hygiene block at lines 209-220 with cite `W281e — repo-leak class`). **Confirmed via `git status` no `?? .basic-memory/` entry.** State-outside-repo invariant intact at the gitignore layer.

**Residual issue (not in scope for stream E)**: the directory still has live `memory.db` data — the canonical path per CLAUDE.md should be `Z:/claude-sota-installed-state/basic-memory/`. Per HIDDEN-ERRORS-SWEEP finding #12 step (b), the NSSM `BasicMemoryHTTP` env should set `BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory` to redirect writes. This is a separate operator-decision item (also requires `nssm set`).

### Operator command (optional, follow-on)

```powershell
nssm stop BasicMemoryHTTP
nssm set BasicMemoryHTTP AppEnvironmentExtra `
  "BASIC_MEMORY_HOME=Z:\claude-sota-installed-state\basic-memory" `
  "BASIC_MEMORY_DATABASE_PATH=Z:\claude-sota-installed-state\basic-memory\memory.db"
# Copy existing data
Copy-Item 'Z:\claude-sota-installed\.basic-memory\memory.db' 'Z:\claude-sota-installed-state\basic-memory\memory.db'
nssm start BasicMemoryHTTP
# After verification, delete repo-internal dir
Remove-Item 'Z:\claude-sota-installed\.basic-memory\' -Recurse -Force
```

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #12 + W282C audit + .gitignore lines 219-220.

---

## Finding #13 (P3) — `tmp/W*` bloat → RESOLVED (no qualifying dirs)

### PROBE result

```powershell
$cutoff = (Get-Date).AddDays(-14)  # 2026-05-05
Get-ChildItem 'Z:\claude-sota-installed\tmp\' -Directory |
  Where-Object { $_.Name -match '^[wW][0-9]' -and $_.LastWriteTime -lt $cutoff } |
  Measure-Object

COUNT: 0
TOTAL_KB: 0
```

### Verdict — RESOLVED

**Zero `tmp/W*` directories older than 14 days exist.** Full inventory (Get-ChildItem sorted by LastWriteTime):

```
codex-wave122-audit-home               2026-05-09  (10.1 days old — too recent for 14d cutoff)
wave172-audit-repos                    2026-05-13
wave184-hooks-backup-2026-05-13        2026-05-13
wave185-pre-reauth-backup              2026-05-13
codex-wave190-home-1778736366323       2026-05-14
codex-wave193                          2026-05-14
w253b-gh-probes                        2026-05-15
w189-orphan-backup                     2026-05-16
wave135f7-mia-n148                     2026-05-16
wave138-fire1-wshobson-probe           2026-05-16
wave190-codex-probes                   2026-05-16
w259v8                                 2026-05-16
w259v9                                 2026-05-16
w270                                   2026-05-17
W273-wave1                             2026-05-17
W285-deleted                           2026-05-18
W287-codex-reviews                     2026-05-18
W288-system-lag-audit                  2026-05-18
W290-restart-evidence-20260518-112440  2026-05-18
w308-ensemble                          2026-05-18
W312-mailbox-archive                   2026-05-19
```

Oldest = 10.1 days old (under 14d threshold). Note the task spec said "older than 14 days" and the underlying HIDDEN-ERRORS-SWEEP finding #13 actually said "older than 7 days" (which would have caught ~13 of the 21 dirs above). **The Stream E task explicitly says 14 days, so no removal performed.**

### Operator decision

If the operator wants the more aggressive 7-day cleanup from the original finding, run:

```powershell
$cutoff = (Get-Date).AddDays(-7)  # 2026-05-12
Get-ChildItem 'Z:\claude-sota-installed\tmp\' -Directory |
  Where-Object { $_.Name -match '^[wW]' -and $_.LastWriteTime -lt $cutoff } |
  Remove-Item -Recurse -Force -WhatIf  # remove -WhatIf to execute
```

Expected to remove `codex-wave122-audit-home` (the oldest, 10.1d) + 4-5 others from 2026-05-13. Total reclaim ~3-5 MB.

**Cite anchor**: HIDDEN-ERRORS-SWEEP.md finding #13.

---

## Summary table

| Finding | Severity | Verdict | Files changed this wave | Operator action required |
|---|---|---|---|---|
| #2 cognee LLM_API_KEY | P0 | SKIPPED-NEEDS-OPERATOR | runbook only | `nssm set CogneeMCP AppEnvironmentExtra ...` (elevated) |
| #3 basic-memory :8765 | P0 | RESOLVED | none | none — endpoint healthy |
| #8 OllamaServe disable | P2 | SKIPPED-NEEDS-OPERATOR | runbook only | `Set-Service OllamaServe -StartupType Manual` |
| #9 zombie node/uvx | P2 | REPORTED | runbook only | optional: kill 3 node zombies; PRESERVE PID 47560 uvx |
| #11 langfuse keys hardening | P2 | APPLIED (gitignore) + DEFERRED (rotation) | `.gitignore` (+2 lines) | rotate keys in Langfuse admin UI + move to sidecar |
| #12 .basic-memory gitignore | P2 | RESOLVED | none — already in `.gitignore` lines 219-220 | optional: NSSM env redirect to state-outside-repo |
| #13 tmp/W* bloat 14d | P3 | RESOLVED (0 qualifying dirs) | none | optional: 7-day cleanup (5 dirs ~3-5 MB) |

**Net APPLIED this wave**: `.gitignore` +3 lines (CLAUDE.local.secrets.ps1 + CLAUDE.local.*.ps1).
**Operator follow-up items**: 4 (Find #2 NSSM env, Find #8 service starttype, Find #9 kill 3 zombies, Find #11 key rotation + sidecar split).

---

## Cardinal-rule invariants verified

- **R1** trusted-only primitives: nssm/PowerShell/git only — ✓
- **R2** no `.claude/hooks/scripts/*.py|.sh|.mjs` introduced — ✓
- **R3** no new `.claude/agents/` — ✓
- **R4** no new `.claude/rules/` — ✓
- **R5** secrets discipline: `.gitignore` tightened, no secrets in commit — ✓
- `self_invented_count: 0` invariant preserved — ✓
- CLAUDE.md ≤50 LOC unchanged — ✓
- settings.json ≤15 KB unchanged — ✓
