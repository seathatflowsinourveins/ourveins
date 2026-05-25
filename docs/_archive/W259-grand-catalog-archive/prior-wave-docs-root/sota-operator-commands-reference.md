# SOTA Operator Commands Reference

> **Status**: AUTHORITATIVE — Wave 149 Fire 1 codification (2026-05-11)
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> - `constituents=[TIER-1-DIRECT @ Docker official docs (docs.docker.com) + Microsoft Learn (learn.microsoft.com/powershell) + OCI specs (opencontainers.org) + Anthropic CC permission-modes docs (code.claude.com/docs/en/), TIER-2 @ ECC docker-patterns SKILL (`.claude/plugins/marketplaces/everything-claude-code/skills/docker-patterns/SKILL.md`), TIER-3-LOCAL-COMPOSITION @ eee 5-signal detection matrix synthesis + CR-12 candidate disposition table + safety_guard.py interplay rules]`
> - `effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE — local glue + 5-signal matrix synthesis vs external refs)
>
> **Cross-model gate**: 1× REAL GPT-5.5 BRIDGE-MODE Path P codex T1 (`bztxnd2by` 165s NEEDS-REVISION conf=0.91 8-prescribed_edits Pattern A applied) + 1× Sonnet stand-in sota-researcher Agent A (`a8e37394707168e08` STUDY-PILOT-PATTERN-EXTRACT verdict). 2nd Path P adversarial review queued Wave 149 Fire 1.2.
>
> **Discipline conformance**: cardinal-rule-1 file:line cites + CR-3 cross-model gate + CR-8 SOTA-content + IMP-A multi-source breadth + Probe DAG 1-7 + CR-12 5-class lattice + SRA D1-D10 + FM-17.f/FM-21 awareness.

═══════════════════════════════════════════════════════════════════════════════
## §1 Scope, Safety Contract, and Evidence Markers
═══════════════════════════════════════════════════════════════════════════════

**Scope**: operator-grep reference for Docker container lifecycle + essential system commands (Windows PowerShell + POSIX/Git Bash compat) + auto-restart detection signals + JSON output discipline. Intended for autonomous /loop sessions to grep when relevant tasks arise.

**Safety contract**:
- **READ-ONLY DIAGNOSTICS** (docker ps / inspect / logs / events / stats / Test-NetConnection / Get-NetTCPConnection / ss / lsof) — always safe; no restrictions
- **CONTROLLED REMEDIATION** (docker restart / docker compose restart / Restart-Service / systemctl restart) — allowed only after concrete signal identifies named target; bounded timeout; post-restart verify; stop after 1 failed attempt
- **DESTRUCTIVE OPS** — blocked by `safety_guard.py` 12-pattern deny-floor (per `.claude/hooks/scripts/safety_guard.py:18-39`). DO NOT bypass.

**Why this is a reference doc, NOT a SKILL**: existing ECC `docker-patterns` SKILL at `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/skills/docker-patterns/SKILL.md` covers SETUP patterns. Creating a NEW SKILL for system-command + auto-restart would PARTIALLY-DUPLICATE per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 + Probe 7.a DEMAND-ABSENCE per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`. This markdown reference is operator-grep-able when needed; SKILL auto-fire is not required.

**Evidence markers** (per `Z:/claude-sota/.claude/rules/evidence-policy.md`):
- `[VERIFIED]` — confirmed via Read/Grep/tool output
- `[VERIFIED YYYY-MM-DD]` — with freshness date
- `[DOCS]` — from official documentation URL
- `[INFERRED]` — reasonable deduction; not verified

═══════════════════════════════════════════════════════════════════════════════
## §2 Docker Read-Only Detection (cheap probes)
═══════════════════════════════════════════════════════════════════════════════

### §2.1 Container inventory + state

# Reference: TIER-1-DIRECT `https://docs.docker.com/reference/cli/docker/container/ls/` [VERIFIED 2026-05-11]

```bash
# List all containers (running + stopped) with JSON
docker ps --all --format json

# Filter by status
docker ps --filter status=exited --format '{{.Names}}'
docker ps --filter health=unhealthy --format '{{.Names}}'
docker ps --filter status=restarting --format '{{.Names}}'

# Quick health check across all
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

### §2.2 Container inspection (state details + health log + restart count)

# Reference: TIER-1-DIRECT `https://docs.docker.com/reference/cli/docker/inspect/` [VERIFIED 2026-05-11]

```bash
# State details (Status, ExitCode, OOMKilled, RestartCount, Health)
docker inspect --format '{{json .State}}' <container> | jq

# Health-only (Status / FailingStreak / Log)
docker inspect --format '{{json .State.Health}}' <container> | jq

# Restart policy + count
docker inspect --format '{{.HostConfig.RestartPolicy.Name}} {{.RestartCount}}' <container>

# OOM check (exit 137 = SIGKILL from kernel OOM-killer)
docker inspect --format '{{.State.OOMKilled}} {{.State.ExitCode}}' <container>
```

### §2.3 Logs (bounded by --tail / --since for context efficiency)

```bash
# Last 100 lines with timestamps
docker logs --tail 100 --timestamps <container>

# Last 5 minutes
docker logs --since 5m --timestamps <container>

# Follow live (use sparingly; bounded by Bash timeout)
docker logs --follow --tail 50 <container>
```

**FM-21 JSON-validation discipline**: when piping `docker inspect` JSON through `jq`, validate parse success BEFORE branching on values. Use `jq -e` for fail-on-null.

### §2.4 Events + stats (when investigating intermittent issues)

```bash
# Recent events (restarts, exits, health-status changes)
docker events --since 10m --filter type=container --format '{{.Time}} {{.Action}} {{.Actor.Attributes.name}}'

# Resource saturation snapshot
docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemPerc}}\t{{.MemUsage}}'
```

═══════════════════════════════════════════════════════════════════════════════
## §3 Auto-Restart Decision Signals (5-Signal Matrix)
═══════════════════════════════════════════════════════════════════════════════

Cheapest probe first; escalate only when cheaper probes are insufficient.

| # | Signal | Probe command | Latency | When to use |
|---|---|---|---|---|
| 1 | **Container exit** | `docker ps --filter status=exited --format '{{.Names}}'` | <100ms | Cheapest; catches crash-exits |
| 2 | **Container health** | `docker ps --filter health=unhealthy --format '{{.Names}}'` | <100ms | Requires HEALTHCHECK directive; catches degraded state |
| 3 | **Port responsiveness** | `powershell -NoProfile -Command "Test-NetConnection -ComputerName 127.0.0.1 -Port N -InformationLevel Quiet"` OR `curl -sS --max-time 3 http://127.0.0.1:N/ -o /dev/null` | 100ms-3s | Network-layer probe; catches deadlocks |
| 4 | **HTTP health endpoint** | `curl -sS --max-time 5 http://127.0.0.1:N/health -w '%{http_code}'` | 100ms-5s | App-layer probe |
| 5 | **Resource saturation** | `docker stats --no-stream --format '{{.Name}} {{.CPUPerc}} {{.MemPerc}}'` | 1-2s | OOM-imminent detection |

**Combined Tier-1 cheap probe** (signals 1+2 in 1 docker call):

```bash
docker ps --format '{{.Names}}\t{{.State}}\t{{.Status}}' | awk '$2 == "exited" || $3 ~ /unhealthy/'
# → if non-empty, restart with: docker restart <name>
```

**Decision boundary**: prefer **DECLARATIVE `--restart unless-stopped` policy** at container creation (Docker daemon handles natively) OVER **IMPERATIVE auto-restart hook**. Imperative hook needed ONLY for unhealthy-but-running containers (HEALTHCHECK reports unhealthy but exit-code 0 keeps container alive).

═══════════════════════════════════════════════════════════════════════════════
## §4 Bounded Docker Remediation
═══════════════════════════════════════════════════════════════════════════════

### §4.1 Restart policies (declarative)

# Reference: TIER-1-DIRECT `https://docs.docker.com/engine/containers/start-containers-automatically/` [VERIFIED 2026-05-11]

| Flag value | Behavior | When to use |
|---|---|---|
| `no` (default) | Container never restarts when it exits | One-shot jobs, dev sandboxes |
| `on-failure[:N]` | Restart only if exit-code ≠ 0 | Batch jobs with retryable failures |
| `always` | Always restart regardless of exit-code | Production services that MUST stay up; risk of restart-loop |
| `unless-stopped` | Always restart UNLESS operator explicitly `docker stop`'d | **RECOMMENDED for eee** — operator-stop wins over policy |

```bash
# Verify all eee containers have proper restart policy
docker inspect --format '{{.Name}}\t{{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq) | sort

# Update live (no recreate)
docker update --restart=unless-stopped <container>
```

### §4.2 Safe restart pattern (named-target + timeout + post-verify)

```bash
# Step 1: name the specific target (DO NOT use `--all` or wildcards)
TARGET="phoenix"

# Step 2: pre-check current state (read-only)
docker inspect --format '{{.State.Status}}' "$TARGET"

# Step 3: bounded restart with timeout
docker restart --time 30 "$TARGET"

# Step 4: post-restart verify (give 5s grace)
sleep 5 && docker ps --filter name="$TARGET" --format '{{.Status}}'

# Step 5: STOP after 1 failed attempt; escalate to operator if needed
```

### §4.3 Compose service restart (multi-container apps)

```bash
# Restart specific service (NOT all stack)
docker compose --project-name <stack> restart <service>

# Verify health
docker compose --project-name <stack> ps --format json | jq '.[] | {Service, State, Health}'
```

**Anti-pattern**: `docker compose restart` does NOT re-apply compose.yml / .env changes per Docker docs — use `docker compose up -d --force-recreate <service>` if config changed.

═══════════════════════════════════════════════════════════════════════════════
## §5 Windows PowerShell Operator Commands
═══════════════════════════════════════════════════════════════════════════════

# Reference: TIER-1-OFFICIAL `https://learn.microsoft.com/powershell/module/` (Microsoft Learn — PowerShell official docs)

### §5.1 Network probes

```powershell
# TCP port test
Test-NetConnection -ComputerName 127.0.0.1 -Port 14317 -InformationLevel Quiet

# Detailed probe (DNS + route + source)
Test-NetConnection -ComputerName <host> -Port <port> -InformationLevel Detailed

# Listening ports + process mapping
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess

# What process owns a port?
Get-NetTCPConnection -LocalPort 11700 | ForEach-Object { Get-Process -Id $_.OwningProcess }
```

### §5.2 Service management

```powershell
# Service status
Get-Service -Name <service> | Select-Object Name, Status, StartType

# Restart service (bounded)
Restart-Service -Name <service> -Force

# Stop with timeout
Stop-Service -Name <service> -Force
```

### §5.3 Process management

```powershell
# Find by name
Get-Process -Name <name>

# Kill rogue process
Stop-Process -Id <PID> -Force

# Kill by name pattern
Get-Process -Name "<pattern>*" | Stop-Process -Force
```

═══════════════════════════════════════════════════════════════════════════════
## §6 POSIX-Compatible Operator Commands (Git Bash compat)
═══════════════════════════════════════════════════════════════════════════════

# Reference: TIER-1-OFFICIAL `https://man7.org/linux/man-pages/` (Linux man pages) + `https://systemd.io/` (systemd primary docs)

### §6.1 Network probes

```bash
# List listening sockets (Linux ss preferred over netstat)
ss -tlnp

# macOS / BSD alternative
lsof -iTCP -sTCP:LISTEN -P -n

# TCP probe
nc -z -v -w 5 <host> <port>

# HTTP health
curl -sS --max-time 5 http://<host>:<port>/health -w '%{http_code}\n' -o /dev/null
```

### §6.2 Service management (systemd-based Linux)

```bash
# Service status
systemctl status <unit>
systemctl is-active <unit>
systemctl is-failed <unit>

# Controlled restart
systemctl restart <unit>

# Service logs (journalctl)
journalctl -u <unit> --since "5 minutes ago" --no-pager
```

### §6.3 Process management

```bash
# Find by name
pgrep -f <pattern>

# Kill by name pattern
pkill -f <pattern>

# Kill by PID
kill -TERM <PID>          # graceful
kill -KILL <PID>          # force
```

### §6.4 Git Bash on Windows compat caveat

eee runtime uses `C:/Program Files/Git/bin/bash.exe` per `CLAUDE.local.md` `CLAUDE_CODE_GIT_BASH_PATH`. POSIX commands (nc / curl / lsof) may be PRESENT (mingw bundled) or ABSENT depending on Git for Windows version. **SOTA cross-platform approach**: prefer `Test-NetConnection` invoked via `powershell -NoProfile -Command "..."` for guaranteed Windows availability; fall back to `nc -z` only when probe context is known POSIX.

═══════════════════════════════════════════════════════════════════════════════
## §7 JSON and Structured Output Discipline (FM-21 prevention)
═══════════════════════════════════════════════════════════════════════════════

Per `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-21 JSON-validation-skip (codified W146-F6.1): JSON-shaped output MUST be validated before branching on values.

```bash
# CORRECT — validate parse success
JSON=$(docker inspect --format '{{json .State}}' <container>)
if echo "$JSON" | jq -e '.Status' > /dev/null 2>&1; then
    STATUS=$(echo "$JSON" | jq -r '.Status')
    # safe to branch on $STATUS
else
    echo "WARN: docker inspect returned invalid JSON or missing .Status field" >&2
fi
```

```powershell
# PowerShell equivalent
$JsonStr = docker inspect --format '{{json .State}}' $container
try {
    $State = $JsonStr | ConvertFrom-Json -ErrorAction Stop
    # safe to branch on $State.Status
} catch {
    Write-Warning "docker inspect returned invalid JSON"
}
```

**Anti-pattern**: free-text log grep without JSON validation — e.g., `docker logs <container> | grep "ERROR"` can return ANSI-styled / multi-line output that breaks downstream parsers. Use `docker logs --tail N --timestamps` then defensive parse.

═══════════════════════════════════════════════════════════════════════════════
## §8 Safety Guard Interplay (`safety_guard.py` 12-pattern deny-floor)
═══════════════════════════════════════════════════════════════════════════════

# Reference: TIER-3-LOCAL `Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py:18-39,80-90,140-200` [VERIFIED 2026-05-11]

**eee deny-floor (12 catastrophic patterns)**: `rm -rf /` / `sudo rm -rf` / `git push --force` / `git reset --hard` / `git checkout .` / SQL `DROP`+`TRUNCATE` / `docker prune` (system/container/image broad prune) / `kubectl delete` / `chmod 777` / fork bomb `:(){:|:&};:` / `mkfs.*` / `dd if=/dev/zero of=/dev/sd*`.

**Coexistence rules**:
- **READ-ONLY Docker diagnostics** (ps / inspect / logs / events / stats) — OUTSIDE deny-floor; SAFE
- **NAMED-TARGET restarts** (`docker restart <name>` / `docker compose restart <service>`) — OUTSIDE deny-floor; SAFE when target is named (not wildcard)
- **Service restarts** (Restart-Service / systemctl restart) — OUTSIDE deny-floor; SAFE
- **Port probes** (Test-NetConnection / ss / lsof / nc) — OUTSIDE deny-floor; SAFE

**Anti-patterns BLOCKED by safety_guard.py** (do not attempt):
- `docker prune` (any variant: system / container / image / volume / network broad-prune) — be EXPLICIT: `docker container prune` is still denied; `docker rm <name>` named-target IS allowed
- `chmod 777` (world-writable) — use 755/700/600 instead
- `rm -rf /` or `rm -rf *` — use targeted `rm -rf <specific-path>` instead

**Known gap (Wave 149 Fire 2 candidate)** — safety_guard.py current 12 patterns do NOT cover:
- `docker rm -f $(docker ps -aq)` mass-deletion (uses subshell to enumerate ALL containers)
- `docker volume prune -f` (without "system" prefix — current regex catches `docker prune` but not `docker volume prune`)
- `docker network prune -f`
- `docker image prune -af`

**Recovery**: extend `safety_guard.py` `_DESTRUCTIVE_PATTERNS` per `Z:/claude-sota/.claude/rules/port-note-discipline.md §1` symbol-anchor. Queued as Wave 149 Fire 2 follow-up logical-unit.

═══════════════════════════════════════════════════════════════════════════════
## §9 CR-12 Deferred Docker MCP Candidates
═══════════════════════════════════════════════════════════════════════════════

# Reference: `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 5-class disposition lattice

| Candidate | CR-12 Class | Disposition | Cite |
|---|---|---|---|
| `docker/mcp-gateway` @ HEAD `b46ac896` (MIT) | **PROVIDER-COMPLEMENT** | DEFER install to Wave 141B; ALREADY `INSTALLED-VIA-SYSTEM-PATH` as `docker mcp` CLI plugin | `https://github.com/docker/mcp-gateway` |
| `docker/mcp-registry` | **ECOSYSTEM-IMPORT** | CITE/discovery only; avoid broad catalog import | `https://github.com/docker/mcp-registry` |
| `docker/hub-mcp` (MIT) | **PARTIAL-OVERLAP** | DEFER unless Docker Hub image discovery becomes repeated workflow | `https://github.com/docker/hub-mcp` |
| `github/github-mcp-server` Docker mode | **DUPLICATE-FUNCTIONALITY** | REJECT as new install; GitHub MCP already wired in eee `.mcp.json` | `https://github.com/github/github-mcp-server` |
| `ckreiling/mcp-server-docker` | **REJECT-FOR-FIT** | Single-individual maintainer; duplicates docker/mcp-gateway at lesser provenance | n/a |
| `QuantGeekDev/docker-mcp` | **REJECT-FOR-FIT** | Single-individual; pre-dated Docker official | n/a |

═══════════════════════════════════════════════════════════════════════════════
## §10 FM Coverage Catalog (FM-17 / FM-21 / NEW FM-CANDIDATEs)
═══════════════════════════════════════════════════════════════════════════════

| FM | Class | Relevance to Docker/system ops |
|---|---|---|
| FM-17.f | 1M-context BRIDGE-MODE blocker | Large `docker logs --tail 10000` OR `docker inspect` JSON dumps can blow context — use `--tail N` bounded by ~100 |
| FM-21 | JSON-validation-skip (W146-F6.1) | Validate `docker inspect` / `ps --format json` parse BEFORE branching |
| **FM-CANDIDATE stuck-container** (n=0 yet) | Container `restarting` state for >5min indicates restart-loop | Probe: `docker ps --filter status=restarting`; if non-empty: investigate logs, do NOT auto-restart again |
| **FM-CANDIDATE OOMKilled** (n=0) | Container exit-code 137 + `.State.OOMKilled=true` | Increase memory limit OR investigate memory leak; auto-restart will OOM again |
| **FM-CANDIDATE port-collision** (n=0) | Expected port bound by another PID; container can't start | Probe: `Get-NetTCPConnection -LocalPort N`; kill conflicting process OR change container port |
| **FM-CANDIDATE restart-loop** (n=0) | `.RestartCount` >5 within 5min | STOP auto-remediation; escalate to operator |
| **FM-CANDIDATE daemon-down** (n=0) | `docker ps` returns connection error to daemon | Restart Docker Desktop / dockerd service; do NOT spawn parallel restart attempts |

═══════════════════════════════════════════════════════════════════════════════
## §11 Discovery + Auto-Fire Triggers (NOT a SKILL; reference-only)
═══════════════════════════════════════════════════════════════════════════════

**This is NOT a SKILL** — operator-grep markdown reference instead. Rationale per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 7.a DEMAND-ABSENCE:

1. **ECC `docker-patterns` SKILL already exists** at `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/skills/docker-patterns/SKILL.md` covering Docker SETUP patterns (Dockerfile / compose / depends_on:condition / healthcheck). New SKILL would DUPLICATE.
2. **DEMAND-ABSENCE**: current eee /loop has no surfaced workflow that needs a SKILL-class auto-fire for system commands. Reference doc + operator-grep is sufficient.
3. **CITE-EXTEND alternative**: when ECC docker-patterns SKILL needs runtime-restart-detection addendum, propose via Wave-N+1 fork-and-PR upstream OR local-override at `.claude/skills/docker-patterns-extension/SKILL.md` per `origin: local-cite-extend` cite class.

**Operator usage**: when working on Docker / port-listening / service-management / process-management tasks, grep this file (`docs/sota-operator-commands-reference.md`) for the relevant section. Future codification fires may promote sections to SKILLs when DEMAND evidence accumulates (n=2+ same-class workflows).

═══════════════════════════════════════════════════════════════════════════════
## §12 Anti-Patterns
═══════════════════════════════════════════════════════════════════════════════

- **`docker prune` in auto-remediation** — BLOCKED by safety_guard.py; never bypass
- **`docker rm -f $(docker ps -aq)`** — mass-deletion NOT in deny-floor yet (Wave 149 Fire 2 gap); operator MUST NOT use; future safety_guard.py extension queued
- **Wildcards in restart commands** — always name specific target: `docker restart phoenix` NOT `docker restart $(docker ps -q)`
- **Unbounded `docker logs --follow`** — context-blow risk; always pair with `--tail N` + Bash timeout
- **JSON-parse without validation** — FM-21 violation; use `jq -e` or `ConvertFrom-Json -ErrorAction Stop`
- **Auto-restart on stuck/restart-loop containers** — escalate to operator; do NOT spam restart
- **`Stop-Process -Force` without precheck** — verify PID owns expected process first via `Get-Process -Id <PID> | Select-Object Name`

═══════════════════════════════════════════════════════════════════════════════
## §13 Update Triggers / Future Work
═══════════════════════════════════════════════════════════════════════════════

Re-evaluate this reference when:
- Docker Engine ships breaking changes (currently v29.4.1 local / v29.4.3 latest per official release notes 2026-05-06) — re-pin TIER-1 cite anchors
- A 2+ same-class auto-fire workflow surfaces (would promote sections to SKILL per DEMAND-gate evidence per Probe 7.b)
- safety_guard.py extension for `docker rm -f` / `docker volume prune` / `docker network prune` mass-deletion (Wave 149 Fire 2 candidate)
- ECC `docker-patterns` SKILL gets runtime-restart-detection addendum upstream
- Docker MCP Gateway eee-wire ships (Wave 141B candidate per Voice 4 T1 NEEDS-REVISION conf=0.88)
- FM-CANDIDATE classes (stuck-container / OOMKilled / port-collision / restart-loop / daemon-down) advance to n=2+ for codification per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322

═══════════════════════════════════════════════════════════════════════════════
## §14 Provenance Cite Trail
═══════════════════════════════════════════════════════════════════════════════

**Wave 149 Fire 1 — SOTA operator commands reference**:
- **Trigger**: User directive 2026-05-11 "advanced automation = auto-restart Docker + essential system commands with SOTA references"
- **Cross-model gate**: 1× Path P REAL GPT-5.5 BRIDGE-MODE codex T1 (`bztxnd2by` 165s/143K tokens; NEEDS-REVISION conf=0.91; 8 prescribed_edits 7-applied + 1-rejected per Agent A HNF #1) + 1× Sonnet stand-in sota-researcher Agent A (`a8e37394707168e08` STUDY-PILOT-PATTERN-EXTRACT verdict)
- **Path P verdict file**: `.claude/state/codex_consult_w149_f1_operator_commands_sota_OUT.txt` (1709 LOC; JSON EOF L1577-1709)
- **Agent A deliverable**: `tmp/wave149-f1-agent-a-docker-sysCmd-sota-research-2026-05-11.md` (persisted post-completion per FM-19)
- **Multi-source breadth (IMP-A)**: 4 distinct cohort sources (Docker official docs + Microsoft Learn + ECC marketplace + direct git clone of docker/mcp-gateway)
- **TIER-1-DIRECT references**: docs.docker.com (container lifecycle + Dockerfile reference + release notes) + learn.microsoft.com/powershell (NetTCPIP + Management) + man7.org / systemd.io (POSIX/systemd) + opencontainers.org (OCI standards) + Anthropic CC code.claude.com/docs/en/permission-modes + code.claude.com/docs/en/skills
- **CR-12 5-class lattice**: GENUINELY-NEW (docker/mcp-gateway) + ECOSYSTEM-IMPORT (docker/mcp-registry) + PARTIAL-OVERLAP (docker/hub-mcp) + DUPLICATE-FUNCTIONALITY (github-mcp-server Docker mode + new sota-operator-commands SKILL) + REJECT-FOR-FIT (ckreiling/QuantGeekDev variants)
- **Probe DAG 1-7 verdict**: docker/mcp-gateway PASS 6/7 (P6 deep audit PARTIAL pending Wave 141B fire)
- **SRA D1-D10**: docker/mcp-gateway 9-PASS/1-NOTE
- **Discipline conformance**: CR-1 file:line cites / CR-3 cross-model gate / CR-8 SOTA-content / CR-10 research-first / CR-11 META-process / CR-12 5-class lattice / Mia pre-apply / FM-02 (b)+(c) defense / FM-21 JSON-validation / Forward Discipline #2 60-180s budget / Wave 24-D INV-A 1× BRIDGE-MODE (will fire 2nd Path P adversarial review next tick for INV-A #2)

**End of Wave 149 Fire 1 reference doc**.
