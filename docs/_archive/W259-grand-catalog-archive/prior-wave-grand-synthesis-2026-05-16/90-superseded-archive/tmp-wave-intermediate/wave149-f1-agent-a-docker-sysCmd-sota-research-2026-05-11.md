---
title: Wave 149 Fire 1 Agent A — SOTA research for Docker + essential system commands operator reference
status: AUTHORITATIVE
date: 2026-05-11
agent: sota-researcher (Bash-only/no-Write — ARTIFACT-INLINE per FM-19; orchestrator-persisted)
wave: 149
fire: 1
verdict: STUDY-PILOT-PATTERN-EXTRACT + SELECTIVE-INSTALL + CITE-EXTEND-NOT-DUPLICATE
---

# Wave 149 Fire 1 Agent A — Docker + Essential System Commands SOTA Research

## §0 Executive verdict

**STUDY-PILOT-PATTERN-EXTRACT** for Docker MCP Gateway (`docker/mcp-gateway` MIT @ HEAD `b46ac896` 2026-05-05; already `INSTALLED-VIA-SYSTEM-PATH` as `docker mcp` CLI plugin per manifest §17). eee-runtime wire DEFERRED to Wave 141B per `tmp/wave141a-voice2-docker-sota-deepdive-2026-05-10.md`. **CITE-PATTERN-ONLY** for new `.claude/skills/sota-operator-commands/` SKILL (would partially-duplicate ECC `docker-patterns` already installed at `.claude/plugins/marketplaces/everything-claude-code/skills/docker-patterns/SKILL.md` — kiss-dry-yagni Must-Never #4 concern; recommend **cite-extending** existing `docker-patterns` with auto-restart-detection + healthcheck-probe addenda rather than a new SKILL). **Auto-restart automation**: SOTA pattern is **declarative `--restart unless-stopped` policy + HEALTHCHECK directive** (Docker Engine native) instead of imperative auto-restart hook. Imperative orchestration belongs in `safety_guard.py` deny-list extension for destructive `docker prune`/`stop --all`/`rm -f` per current safety_guard.py:18-39 contract.

## §1 Docker official refs (TIER-1-DIRECT)

### §1.1 Container restart policies

# Reference: TIER-1-DIRECT `https://docs.docker.com/engine/containers/start-containers-automatically/` [VERIFIED 2026-05-11 via curl HTML probe; canonical Docker Inc docs; dateModified 2026-02-21]

5 canonical restart-policy values: `no` (default) / `on-failure[:N]` / `always` / `unless-stopped` (RECOMMENDED) / `on-failure:N` (bounded retry).

Inspect: `docker inspect --format '{{.HostConfig.RestartPolicy.Name}} {{.HostConfig.RestartPolicy.MaximumRetryCount}}' <container>`

Set: `docker run --restart unless-stopped ...` OR `docker update --restart=unless-stopped <container>` (live update).

### §1.2 HEALTHCHECK directive

# Reference: TIER-1-DIRECT `https://docs.docker.com/reference/dockerfile/#healthcheck` [VERIFIED 2026-05-11]

Options: `--interval=DURATION` / `--timeout=DURATION` / `--start-period=DURATION` / `--start-interval=DURATION` / `--retries=N`. Exit 0 healthy / 1 unhealthy / 2 reserved.

Inspect health: `docker inspect --format '{{json .State.Health}}' <container> | jq` returns Status / FailingStreak / Log.

### §1.3 Compose healthcheck + depends_on:condition

Already covered in ECC SKILL at `.claude/plugins/marketplaces/everything-claude-code/skills/docker-patterns/SKILL.md:30-79` — gap: runtime-restart-detection.

## §2 Essential system commands SOTA refs

### §2.1 PowerShell (Windows-native)

# Reference: TIER-1-DIRECT `https://learn.microsoft.com/powershell/module/nettcpip/test-netconnection` [VERIFIED 2026-05-11]

Key cmdlets:
- Test-NetConnection -ComputerName host -Port N (TCP probe)
- Get-NetTCPConnection -State Listen (list listeners + PIDs)
- Stop-Service / Restart-Service / Get-Service (NetTCPIP module + Microsoft.PowerShell.Management)
- Stop-Process / Get-Process (process management)

### §2.2 POSIX (Git Bash compat)

# Reference: TIER-1-OFFICIAL `https://man7.org/linux/man-pages/man8/ss.8.html` + `https://man.openbsd.org/lsof`

Key: `ss -tlnp` / `lsof -i :PORT` / `nc -z -v -w 5 host port` / `systemctl status/restart` / `pkill -f pattern`.

### §2.3 Git Bash on Windows compat caveat

eee uses `C:/Program Files/Git/bin/bash.exe`; nc/curl/lsof may be PRESENT or ABSENT per Git for Windows version. SOTA approach: prefer `Test-NetConnection` via `powershell -NoProfile -Command` for guaranteed Windows availability.

## §3 Auto-restart detection signals (5-signal hierarchy)

| # | Signal | Probe command | Latency | Use case |
|---|---|---|---|---|
| 1 | Container exit | `docker ps --filter status=exited --format '{{.Names}}'` | <100ms | Cheapest; crash-exits |
| 2 | Container health | `docker ps --filter health=unhealthy --format '{{.Names}}'` | <100ms | Requires HEALTHCHECK; degraded state |
| 3 | Port responsiveness | `Test-NetConnection -ComputerName 127.0.0.1 -Port N -InformationLevel Quiet` OR `curl -sS --max-time 3 http://127.0.0.1:N/ -o NUL` | 100ms-3s | Network-layer; deadlocks |
| 4 | HTTP endpoint | `curl -sS --max-time 5 http://127.0.0.1:N/health -w '%{http_code}'` | 100ms-5s | App-layer; expects health endpoint |
| 5 | Resource saturation | `docker stats --no-stream --format '{{.Name}} {{.CPUPerc}} {{.MemPerc}}'` | 1-2s | Slowest; OOM-imminent |

**Decision boundary**: prefer DECLARATIVE `--restart unless-stopped` policy at container creation (Docker daemon handles) OVER IMPERATIVE auto-restart hook. Imperative hook needed ONLY for unhealthy-but-running containers.

## §4 Multi-source discovery — Docker MCPs/skills/plugins (Probe DAG 1-7)

### §4.1 Already-INSTALLED inventory

| # | Primitive | Status | Disposition |
|---|---|---|---|
| 1 | `docker-patterns` SKILL (ECC) | INSTALLED via everything-claude-code marketplace | **DUPLICATE-FUNCTIONALITY for setup patterns; cite-extend for runtime-restart-detection** |
| 2 | Docker Engine + CLI v29.4.1 | INSTALLED-VIA-SYSTEM-PATH | Active; 10 containers UP |
| 3 | `docker compose` v5.1.3 | INSTALLED-VIA-SYSTEM-PATH | Active |
| 4 | `docker mcp` v0.40.4 CLI plugin | INSTALLED-VIA-SYSTEM-PATH | **NOT wired as eee MCP gateway** — Wave 141B candidate |
| 5 | `docker agent` v1.44.0 CLI plugin | INSTALLED-VIA-SYSTEM-PATH | **CITE-ONLY** per Voice 2 sota-researcher Wave 141A competing-harness finding |
| 6 | `docker-py` v7.1.0 Python SDK | INSTALLED-IN-VENV | Future hook patterns SHOULD use `docker.from_env().containers.list()` |

### §4.2 Cohort probe — Docker MCP Gateway

# Reference: TIER-1-DIRECT `docker/mcp-gateway` @ HEAD `b46ac896` 2026-05-05 (MIT) — Docker Inc TIER-1-OFFICIAL named-org

Features per README verbatim: "Container-based Servers: Run MCP servers as Docker containers with proper isolation. Server Management. Secrets Management via Docker Desktop."

**Probe DAG 1-7 verdict**:
- P1 LICENSE: PASS (MIT permissive)
- P2 registry: PASS (Docker official DCR via `cli-plugins`)
- P3 plugin-namespace: PASS (no eee collision)
- P4 GraphQL stars/bands: STRONG-PROVENANCE-EXPRESS (Docker org)
- P5 README: PASS
- P6 deep audit: PARTIAL (Go superficially probed)
- P7.b demand-gate: STUDY-PILOT eligible

**Verdict: GENUINELY-NEW (CR-12 class 1)** — Disposition: STUDY-PILOT-PATTERN-EXTRACT with Wave 141B implementation candidacy.

### §4.3 Alternative Docker MCP candidates (REJECT)

| Candidate | Disposition |
|---|---|
| ckreiling/mcp-server-docker | REJECT-FOR-FIT (single-individual; duplicates docker/mcp-gateway at lesser provenance) |
| QuantGeekDev/docker-mcp | REJECT-FOR-FIT (single-individual; pre-dated Docker official entry) |
| punkpeye/awesome-mcp-servers (catalog) | CITE-ONLY (already in research-protocol.md Tool Routing) |

## §5 SRA D1-D10 verdict — Docker MCP Gateway

| D# | Verdict | Evidence |
|---|---|---|
| D1 License-use-class | PASS | MIT permissive |
| D2 Freshness | PASS | HEAD 2026-05-05 (<7 days) |
| D3 Fresh-paint | PASS | Repo has history; Docker org-backed |
| D4 Maintainer-provenance | PASS | TIER-1-OFFICIAL Docker Inc |
| D5 Active-maintenance | PASS | Recent commits + CI badge |
| D6 Use-class compat | PASS | Compatible with autonomous /loop |
| D7 Anthropic-policy | PASS | MCP open protocol |
| D8 Industry-adoption | PASS | Docker Desktop 4.59+ bundles |
| D9 FM-awareness | NOTE | Container isolation introduces new FM classes |
| D10 Replacement-viability | PASS | Revert to current `.mcp.json` direct stdio |

**Overall**: 9-PASS / 1-NOTE — qualified ADOPT-NOW candidate when Wave 141B install fire executes.

## §6 Recommendations & HNF flags

### §6.1 ADOPT recommendations

1. **EXTEND existing ECC `docker-patterns` SKILL** with runtime-restart-detection addendum (CITE-EXTEND not DUPLICATE per kiss-dry-yagni #4)
2. **DEFER Docker MCP Gateway eee-wire** to Wave 141B
3. **EXTEND safety_guard.py deny-list** for destructive Docker commands not yet covered:
   - GAP: `docker rm -f $(docker ps -aq)` mass-deletion; `docker volume prune -f`; `docker network prune -f`; `docker image prune -af`
   - Add as new patterns per port-note-discipline §1; Wave 141A.2 already has this as queued ship
4. **POWERSHELL probe wrapper** for cross-platform port testing — encode in reference doc

### §6.2 HNF flags

**HNF #1**: A new SKILL covering "essential system commands" would PARTIALLY-OVERLAP with `everything-claude-code/skills/docker-patterns/SKILL.md` + Probe 7.a DEMAND-ABSENCE.

**Recommended disposition**: DEFER new SKILL until use-case surfaces in 2+ fires. Document patterns in `docs/sota-operator-commands-reference.md` (markdown reference, NOT a SKILL).

**HNF #2**: A `docker_auto_restart.py` hook would re-implement what `--restart unless-stopped` already provides at Docker daemon layer. Recommended: VERIFY all 10 eee containers have proper restart policy. If any show `no` policy, run `docker update --restart=unless-stopped <name>`. No hook needed.

**HNF #3**: PowerShell + POSIX command refs are well-documented at TIER-1-OFFICIAL sources; a SKILL wrapper doesn't add value over markdown reference.

## §7 Recommended `docs/sota-operator-commands-reference.md` outline

Markdown reference (NOT a SKILL) — operator-readable; cite-anchor-rich; ~400 LOC target.

## §8 SKILL.md description trigger — NOT recommended

**Verdict: do NOT create `.claude/skills/sota-operator-commands/SKILL.md`** — fails kiss-dry-yagni #4 + Probe 7.a DEMAND-ABSENCE.

## §9 Provenance

- **Cite anchors**: 4 TIER-1-DIRECT sources (Docker engine docs + Dockerfile reference + docker/mcp-gateway README @ b46ac896 + Microsoft Learn NetTCPIP)
- **Multi-source breadth (IMP-A)**: 4 distinct cohorts (Docker official + Microsoft + ECC marketplace + direct git clone)
- **Probe DAG 1-7**: applied to docker/mcp-gateway with 9-PASS/1-NOTE
- **CR-12 lattice**: GENUINELY-NEW + DUPLICATE-FUNCTIONALITY + PARTIAL-OVERLAP all exercised
- **FM-19 conformance**: ARTIFACT-INLINE persisted post-completion by orchestrator

VERDICT: STUDY-PILOT-PATTERN-EXTRACT (Docker MCP Gateway → Wave 141B) + CITE-PATTERN-ONLY (POSIX/PowerShell refs → docs/sota-operator-commands-reference.md) + CITE-EXTEND (ECC docker-patterns SKILL gets runtime-restart-detection addendum) + DEFER (new SKILL.md until demand-gate evidence).
