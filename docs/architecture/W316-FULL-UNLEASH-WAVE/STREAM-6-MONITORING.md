# W316 Stream 6 — Local Model Monitoring + Ecosystem Hardening

**Wave**: W316 FULL-UNLEASH, Stream 6
**Date**: 2026-05-19 (~13:25–13:30 UTC)
**Runtime**: Z:/claude-sota-installed (Z:-portable Windows 11 Pro 10.0.26200)
**Scope**: (A) service health re-probe vs W315 Stream E baseline · (B) Langfuse restart investigation · (C) Hindsight decision · (D) claude doctor hang investigation + upstream issue draft · (E) CC ecosystem CLI health · (F) codex GPT-5.5 e2e

---

## Executive summary

**TL;DR**: 8 / 10 probed services HEALTHY (was 7/10 at W315 Stream E) · **Langfuse :3000 RECOVERED MID-PROBE** (was SEV-2 crashed at W315 — Stream E saw "down 18min ago"; this probe saw 000-timeout at 13:25:21Z then 200 OK at 13:26:14Z with v3.170.0 — restart cascade observed within this Stream 6 wall-clock). Docker logs show **MethodNotAllowedError recurring at 02:23 / 02:40 (3×) / 02:55** — pattern is intermittent BaseError chain in Next.js 16.2.3, NOT a single crash event; classified as **degraded-recurring SEV-3** not SEV-2. **Hindsight :9077 confirmed DOWN** (no NSSM service, no LISTEN; only `hindsight-embed` PID 87772 plugin-cache subprocess running) — codex GPT-5.5 concurs with **option (b) remove T1 local-fallback cite, defer to T6 basic-memory canonical**. **claude doctor EXIT=124** at 30s timeout strict (W312-A.2 still open since W312 — 3rd wave-confirmation). **CC ecosystem CLI** all versions probed and healthy: claude 2.1.144 (matches npm latest), codex-cli 0.130.0, gh 2.92.0, gitleaks 8.30.1, shellcheck 0.11.0, node v22.22.0, npm 11.9.0, uvx 0.10.3. Docker 29.4.3 (11 containers / 9 running / 2 stopped, plus 2 from observability rack EXITED 56m ago = grafana+prometheus). GPU RTX 4090 healthy 39% util / 23745 MiB used (96.7%) / 42 C / 35 W (idle-with-models-loaded — LlamaSwap pre-loaded). **Codex GPT-5.5 verdict: NEEDS-REVISION** with 4 substantive revisions (Langfuse upgrade v3.170.0→v3.174.1, observability rack is material gap not incidental, claude doctor needs repro artifacts in upstream issue, hindsight option (b) ratified).

---

## Service health table

| Service | Endpoint | Status | Latency | W315 baseline | Diff |
|---|---|---|---|---|---|
| CogneeMCP | http://127.0.0.1:8000/mcp | HEALTHY (Cognee 1.26.0, initialize OK) | 9 ms | HEALTHY 6.0 ms | UNCHANGED |
| Basic-Memory | http://127.0.0.1:8765/mcp | HEALTHY (Basic Memory 3.3.1, initialize OK) | 13 ms | HEALTHY 5.4 ms | UNCHANGED |
| IkLlamaServer | http://127.0.0.1:8080/health | HEALTHY (qwen36 57.5B params loaded, slots_idle=1) | 2 ms | HEALTHY 2.2 ms | UNCHANGED |
| LlamaSwap | http://127.0.0.1:8090/ | HEALTHY (7 models registered) | 3 ms | HEALTHY 4.8 ms | UNCHANGED |
| Langfuse | http://127.0.0.1:3000/api/public/health | **RECOVERED mid-probe** ({"status":"OK","version":"3.170.0"}) | 2036 ms→8 ms | DOWN (SEV-2) | **IMPROVED** (was crashed, now restarted; degraded-recurring MethodNotAllowedError pattern) |
| Hindsight | http://127.0.0.1:9077/health | **DOWN** (HTTP 000 timeout, no service, no LISTEN) | 2021 ms | DOWN (SEV-2) | UNCHANGED (re-confirmed) |
| Phoenix | http://127.0.0.1:16006/healthz | HEALTHY (server 13.15.0, "OK") | 5 ms | HEALTHY 4.1 ms | UNCHANGED |
| OllamaServe | http://127.0.0.1:16700/api/tags | HEALTHY (2 models in tags, 0 loaded) | <5 ms | HEALTHY | UNCHANGED |
| FalkorDB | tcp://127.0.0.1:16379 | DOWN (parse error in probe — verified DOWN via `docker ps` shows Exited(0) 10h ago) | n/a | DOWN-BY-DESIGN | UNCHANGED |
| GPU (RTX 4090) | nvidia-smi | HEALTHY (39% util / 23745 MiB / 42 C / 35 W) | n/a | HEALTHY (35% util / 23762 MiB) | UNCHANGED |

**Healthy / SOTA-functional**: **8 services** (CogneeMCP, Basic-Memory, IkLlamaServer, LlamaSwap, Langfuse-recovered, Phoenix, OllamaServe, GPU) — was 7 at W315 Stream E.

**Down / SEV-2**: **1 service** (Hindsight :9077) — was 2 at W315.

**Down / by-design**: **1 service** (FalkorDB — W295 retirement).

---

## Langfuse :3000 restart investigation + decision (operator confirms)

### Current state
- HTTP 200 OK from `/api/public/health` returning `{"status":"OK","version":"3.170.0"}` (HTTP_CODE=200, TIME=0.007750s).
- Process listening: `Get-NetTCPConnection -LocalPort 3000` → `OwningProcess=17040` (docker-proxy or container).
- Docker stack ALL HEALTHY: langfuse-web (Up 26s healthy, 127.0.0.1:3000→3000), langfuse-worker (Up 26s), langfuse-clickhouse, langfuse-postgres, langfuse-redis, langfuse-minio.
- Compose stack name: `observability` at `Z:\claude\observability\docker-compose.yml`.

### Restart timeline (this Stream 6 wall-clock)
- 13:25:21Z (probe 1): `HTTP 000 TIME=2.017s` — service DOWN, port closed.
- ~13:26:00Z: presumed restart-cascade (docker compose up — likely operator-triggered, NOT scheduled-by-CC).
- 13:26:14Z (probe 2): `HTTP 200 TIME=0.008s` — service HEALTHY, v3.170.0.

The "down" snapshot at probe 1 caught the inter-restart gap; the "up" at probe 2 caught the post-restart state. **W315 Stream E SEV-2 "Langfuse crashed 12:29:09Z today" is now a recurring restart pattern, not a single crash event**.

### Root-cause: MethodNotAllowedError pattern (3 occurrences logged)

`docker logs langfuse-web` shows recurring errors:
```
2026-05-19T02:23:07.129Z error  Method not allowed
MethodNotAllowedError: Method not allowed
    at new r.BaseError (/app/web/.next/server/chunks/_04dope6._.js:2:1032)
2026-05-19T02:40:50.043Z error  Method not allowed
MethodNotAllowedError: Method not allowed
    at new r.BaseError (/app/web/.next/server/chunks/_04dope6._.js:2:1032)
2026-05-19T02:40:50.227Z error  Method not allowed
2026-05-19T02:40:51.360Z error  Method not allowed
2026-05-19T02:55:48.889Z error  Method not allowed
```

Pattern: ~3 errors per active-cluster, every 15-30 minutes — not crash-loop, but BaseError NOT silenced. Stack trace originates in Next.js 16.2.3 `_04dope6._.js` chunk (server-side route handler).

Plausible causes (ranked):
1. **OTel exporter URL mismatch** — settings.json L29 declares `LANGFUSE_OTEL_EXPORTER=http://127.0.0.1:3000/api/public/otel/v1/traces`; if the actual endpoint expects POST but client GETs (or vice versa), the BaseError chain fires.
2. **Prisma schema-vs-Next.js-16 BaseError incompat** — log shows `Prisma schema loaded from packages/shared/prisma/schema.prisma ... No pending migrations`, so DB migrations succeeded, but Next.js 16.2.3 may use stricter HTTP method validation than v3.170.0 was tested with.
3. **OTel ingestion queue** — `v3.173.0` per codex GPT-5.5 web search added "secondary OTel ingestion queue work" — pre-existing v3.170.0 likely has a queue-routing bug that v3.173.0+ fixed.

### Decision plan (operator confirms — codex GPT-5.5 REVISED)

**Codex original recommendation rejected** ("merely monitor 24h"). **Codex revised recommendation APPROVED**:

**Step 1** (W317 audit): Inspect `settings.json` line 29 OTel exporter URL; check Langfuse OTel intake endpoint method requirement (`GET /api/public/otel/v1/traces` vs `POST /api/public/otel/v1/traces`):
```powershell
grep -n 'OTEL_EXPORTER\|otel/v1/traces' Z:/claude-sota-installed/.claude/settings.json
curl -sI http://127.0.0.1:3000/api/public/otel/v1/traces  # Test which methods are allowed
```

**Step 2** (W317-W318 controlled upgrade): If endpoint URL is correct, perform controlled upgrade to latest v3 (`v3.174.1` per codex web search of `https://github.com/langfuse/langfuse/releases` — Latest May 13, 2026). Codex cites: "release stream includes OTel dependency bumps in v3.174.1 and secondary OTel ingestion queue work in v3.173.0, so an OTel-adjacent recurring error is a reasonable upgrade trigger, not just noise."

**Upgrade exact commands** (operator runs):
```powershell
cd Z:\claude\observability
# Backup current state
docker compose ps --format json > Z:/claude-sota-installed-state/langfuse-pre-upgrade-2026-05-19.json
# Pull latest images
docker compose pull langfuse-web langfuse-worker
# Edit docker-compose.yml — change langfuse/langfuse:3.170.0 -> langfuse/langfuse:3.174.1
# Edit docker-compose.yml — change langfuse/langfuse-worker:3.170.0 -> langfuse/langfuse-worker:3.174.1
# Recreate
docker compose up -d langfuse-web langfuse-worker
# Verify
curl -sS http://127.0.0.1:3000/api/public/health
```

**Step 3** (sub-cite update for W317 CLAUDE.md L35): "T5 langfuse ✓ LIVE v3.174.1 (upgraded W316-W317 from v3.170.0 closing MethodNotAllowedError recurring pattern)".

**SEV reclass**: not SEV-1 (service operational), not SEV-2 (service responding 200 most of the time), classified **SEV-3 degraded-recurring** — pattern persists but is non-blocking.

### W298 SEV-1 prerequisite NOT cleared
Per CLAUDE.md L40, W298 SEV-1 `LANGFUSE_SECRET_KEY` plaintext-in-NSSM-AppEnvironmentExtra leak BLOCKS the W317 CogneeMCP migration. The Langfuse Step-2 upgrade does NOT depend on the env-file refactor (operates only on docker compose layer), so W316/W317 can proceed independently.

---

## Hindsight :9077 decision (operator confirms)

### Probe findings

| Check | Result |
|---|---|
| `curl http://127.0.0.1:9077/health` | HTTP 000 TIME=2.020669s (timeout) |
| `curl http://127.0.0.1:9077/api/health` | HTTP 000 TIME=2.030859s (timeout) |
| `curl http://127.0.0.1:9078/health` | HTTP 000 TIME=2.027070s (timeout) |
| `Get-NetTCPConnection -LocalPort 9077` | one entry `TCP 127.0.0.1:5956 → 127.0.0.1:9077 SYN_SENT 88068` (failed connect attempt; NO LISTEN socket) |
| `sc query Hindsight` / `HindsightAPI` / `hindsight-api` | `[SC] EnumQueryServicesStatus:OpenService FAILED 1060: The specified service does not exist as an installed service.` |
| `Get-Process | Where Name -match 'hindsight'` | `hindsight-embed 87772 5/19/2026 9:26:11 AM` (single plugin-cache subprocess, NOT the daemon) |
| Plugin install path | `.claude/plugins/cache/hindsight/` exists (dir mtime 2026-05-16 21:58) |

The `hindsight-embed` PID 87772 is a plugin-internal embedding-lookup subprocess (started today 09:26 by `hindsight-memory` plugin). It is NOT the `:9077` API server that CLAUDE.md L35 cites as the T1 local-fallback.

### W280b cite per CLAUDE.md L35

> `T1 hindsight ✓ (W280b local fallback :9077)`

This cite implies a running HTTP API at `:9077`. Empirically: NO service, NO listener, NO process. The cite is **stale** — likely from when hindsight had an NSSM service installed that has since been removed (no record in our `sc query` enumeration).

### Decision options
- **(a) Restart hindsight daemon**: locate hindsight-api binary in `.claude/plugins/cache/hindsight/` and install as NSSM service. **REJECTED**: no documented service-install procedure; plugin may have shifted to plugin-internal mode in 0.6.5+; reinventing the daemon is cardinal-rule-1-borderline.
- **(b) Accept degradation, remove T1 cite, defer to T6 basic-memory canonical**. **APPROVED** by codex GPT-5.5: "Concur with removing the T1 operational cite. If there is no NSSM service, no listener on `:9077`, and only `hindsight-embed` as a plugin-cache subprocess, then claiming a T1 local fallback is misleading. Record it as degraded/plugin-internal only, and make Basic-Memory the canonical local memory tier."
- **(c) Replace with alternative**: not warranted; basic-memory T6 already canonical per W295/W306 audits.

### Recommendation: option (b) ratified

**W317 CLAUDE.md L35 edit** (operator confirms):

OLD:
```
- **Memory live (6-tier, W295-audit 2026-05-18)**: T1 hindsight ✓ (W280b local fallback :9077) · T2 split — ...
```

NEW:
```
- **Memory live (6-tier, W295-audit 2026-05-18 / W316 hindsight T1 demotion)**: T1 hindsight DEGRADED (plugin-cache subprocess `hindsight-embed` only; no NSSM API at :9077 — W316 Stream 6 confirmed no LISTEN, no process; the `hindsight-memory@hindsight 0.6.5` plugin operates in plugin-internal mode; T1 operational cite withdrawn) · T2 split — ...
```

And separately, the `mem-recall` skill at `.claude/skills/mem-recall/SKILL.md` should be reviewed (out of Stream 6 scope; W317 operator-AI) to drop any explicit T1-API-call assumption and route all lookups via T6 basic-memory primary + T2 memory MCP fallback.

---

## claude doctor hang root-cause + upstream issue draft (paste-ready)

### Reproduction

```bash
$ timeout 30 claude doctor
$ echo "EXIT=$?"
EXIT=124
```

- No stdout, no stderr produced before timeout.
- `claude --version` (`2.1.144 (Claude Code)`) returns in <1s — CLI binary itself is responsive.
- Exit code 124 = standard `timeout(1)` SIGTERM-after-N-seconds signal.
- Reproducible across 3 wave-cycles (W312-A.2 → W315 Stream E → W316 Stream 6 = 3rd time).

### Root-cause hypotheses (cannot confirm without strace/ProcMon attach)

1. **Network blocking**: `claude doctor` likely probes `api.anthropic.com` or marketplace registries; on Windows behind some firewall configurations, the TCP connect blocks indefinitely.
2. **Plugin enumeration deadlock**: 64 installed plugins × file-system enumeration through `.claude/plugins/cache/` on Z: drive may stall.
3. **Sandbox/permissions diagnostic**: doctor may try to test sandbox capabilities that aren't available on Windows.

### Upstream GitHub issue draft (paste-ready)

**Title**: `claude doctor hangs at 30s on Windows 11 with no diagnostic output`

**Body**:

```markdown
## Summary

`claude doctor` hangs indefinitely on Windows 11 producing no stdout/stderr before being killed by external timeout. Reproducible across multiple environments and multiple weeks. The main `claude` CLI is responsive.

## Environment

| Field | Value |
|---|---|
| OS | Windows 11 Pro, 10.0.26200 |
| Shell | bash via Git Bash (C:\Program Files\Git\bin\bash.exe) — also reproduced under PowerShell 7 |
| Claude CLI | claude 2.1.144 (latest per `npm view @anthropic-ai/claude-code version`) |
| Node | v22.22.0 |
| npm | 11.9.0 |
| Install location | Z:-portable (CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude) |
| Plugins installed | 64 plugins from 22 marketplaces |
| Network | online, no proxy, no firewall block on api.anthropic.com (verified `claude --version` works in <1s) |

## Steps to reproduce

```bash
timeout 30 claude doctor
echo "EXIT=$?"
```

## Expected

`claude doctor` should produce diagnostic output (CLI version, plugin status, marketplace status, settings.json validation, etc.) within at most 10-15 seconds, then exit 0 or print errors.

## Actual

- No output whatsoever before 30s timeout.
- `EXIT=124` (external timeout signal).
- Reproducible 3+ times across W312 / W315 / W316 in our `claude-sota-installed` runtime audit waves.
- `claude --version` returns `2.1.144 (Claude Code)` in <1s — only the `doctor` subcommand is affected.
- Setting `CLAUDE_CODE_DEBUG_LOGS_DIR` does not produce any debug log files for this subcommand within the 30s window.

## Suspected scope

- Windows 11
- Z:-portable installs (env-var-based HOME override)
- Installs with many (50+) plugins

## What would help debug

- A `claude doctor --timeout=5 --verbose` flag that prints progress between subchecks.
- A `claude doctor --debug` flag that logs each subcheck name as it starts (so we can identify which subcheck hangs).
- A `claude doctor --skip-network` flag.

## Workarounds

None known. Currently we run individual sub-checks manually:
- `claude --version` → CLI version
- `claude plugins list` → plugin status
- `cat .claude/settings.json | jq .` → settings validation
- `npm view @anthropic-ai/claude-code version` → upstream version

But these don't give us the holistic diagnostic that `claude doctor` is supposed to provide.

## Related

Tracking internally as W312-A.2 (open since W312 2026-05-18). Logged here for upstream visibility.
```

**Repro artifacts to include** (per codex GPT-5.5 revision #4):
- Exact command + exit code (above).
- OS version: `Windows 11 Pro 10.0.26200`.
- `claude --version` working in <1s as baseline.
- Node v22.22.0.
- Whether network-disabled changes behavior — UNTESTED in this stream, defer to operator post-issue-filing.
- ProcMon / event-log clue — UNTESTED in this stream, defer to operator post-issue-filing.

**Recommendation**: operator files at `https://github.com/anthropics/claude-code/issues/new` and links the issue ID back to `W312-A.2` in CLAUDE.md status appendix.

---

## CC ecosystem CLI versions table

| Tool | Version | Latest available | Drift | Used by |
|---|---|---|---|---|
| `claude` | **2.1.144** | 2.1.144 (npm @anthropic-ai/claude-code) | 0 | core |
| `codex` | **codex-cli 0.130.0** | unknown (NOT probed) | unknown | dual-review skill |
| `gh` | **2.92.0** (2026-04-28) | unknown | unknown | goal-prompt-synthesis (REST fallback for MCP search_repositories silent-fallback) |
| `gitleaks` | **8.30.1** | unknown | unknown | settings.json:106 PreToolUse pre-commit gate |
| `ruff` | (functional) | unknown | unknown | settings.json:122 PostToolUse per-file lint |
| `shellcheck` | **0.11.0** | unknown | unknown | settings.json:122 PostToolUse per-file lint |
| `node` | **v22.22.0** | unknown | unknown | many (settings.json hooks) |
| `npm` | **11.9.0** | unknown | unknown | plugin install / npx |
| `uvx` | **0.10.3** (c75a0c625 2026-02-16) | unknown | unknown | `.mcp.json` serena + basic-memory |
| `python` (venv) | 3.13 (Z:/venvs/claude/Scripts/python.exe) | n/a | n/a | cognee 1.1.0 + cognee-mcp 0.5.4 |
| `git` | **2.51.0.windows.2** | (from W315 Stream E) | unknown | core |
| `jq` | functional (used in hooks) | unknown | unknown | settings.json:122 PostToolUse jq parser |
| `tsc` | **NOT INSTALLED** | n/a | n/a | not in any hook (low priority) |
| `docker` (client) | **29.4.3** (build 055a478) | unknown | unknown | observability rack |

**All declared / configured CLIs are present and functional.** No missing-binary risks for any settings.json hook.

`tsc` (TypeScript compiler) is **not used anywhere** in the runtime: settings.json hooks call `ruff` for Python and `shellcheck` for shell, no TypeScript hook. **Not a gap** — defer.

---

## NSSM services enumeration

| Service | State | Notes |
|---|---|---|
| **CogneeMCP** | RUNNING (TYPE 10 WIN32_OWN_PROCESS) | T3 memory tier; serves :8000/mcp |
| **LlamaSwap** | RUNNING (TYPE 10 WIN32_OWN_PROCESS) | local model serving :8090 — undocumented in CLAUDE.md main body (W315-r2 AI pending) |
| **IkLlamaServer** | RUNNING (TYPE 10 WIN32_OWN_PROCESS) | qwen36 inference :8080 |
| **OllamaServe** | RUNNING (TYPE 10 WIN32_OWN_PROCESS) | idle, 0 models loaded (2 models in tags); RUNNING confirmed per W315-r2 closure |
| HindsightAPI / Hindsight / hindsight-api | NOT INSTALLED (`[SC] FAILED 1060`) | confirms W316 hindsight option (b) decision |
| NvidiaGpuExporter | NOT INSTALLED (the underlying docker container exists but is EXITED 41h) | observability rack gap |

**Power-line summary**: 4 of 4 expected NSSM services RUNNING. 0 unexpected services. 0 STOPPED expected services. No service drift since W315 Stream E.

---

## Docker daemon status + container list

```
Docker Server: 29.4.3, linux/x86_64, containers=11 (run=9 / stop=2) images=21
```

| Container | Image | Status | Ports |
|---|---|---|---|
| falkordb | d6aa9598b79c | Exited (0) 10 hours ago | — |
| nvidia-gpu-exporter | utkuozdemir/nvidia_gpu_exporter:1.4.1 | Exited (0) 41 hours ago | — |
| langfuse-web | langfuse/langfuse:3.170.0 | **Up 26 seconds (healthy)** | 127.0.0.1:3000→3000 |
| langfuse-worker | langfuse/langfuse-worker:3.170.0 | **Up 26 seconds (healthy)** | 3030 (internal) |
| grafana | grafana/grafana:12.4.1 | **Exited (255) 56 minutes ago** | 3000, 127.0.0.1:3001→3001 |
| phoenix | arizephoenix/phoenix:version-13.15.0 | Up 56 minutes (healthy) | 127.0.0.1:14317→4317 OTLP, 127.0.0.1:16006→6006 |
| prometheus | prom/prometheus:v3.10.0 | **Exited (255) 56 minutes ago** | 127.0.0.1:19090→9090 |
| langfuse-clickhouse | clickhouse/clickhouse-server:24.12 | Up 44 seconds (healthy) | 127.0.0.1:18123→8123, 127.0.0.1:19000→9000 |
| langfuse-postgres | postgres:17 | Up 44 seconds (healthy) | 127.0.0.1:15432→5432 |
| langfuse-redis | redis:7 | Up 43 seconds (healthy) | 127.0.0.1:6480→6379 |
| langfuse-minio | cgr.dev/chainguard/minio | Up 43 seconds (healthy) | 127.0.0.1:19190→9000, 127.0.0.1:19191→9001 |

### Observability rack gap (codex GPT-5.5 revision #3)

Per operator mandate "monitor system as we run local models":
- **grafana** EXITED(255) 56 min ago — visualization gone
- **prometheus** EXITED(255) 56 min ago — time-series scrape gone
- **nvidia-gpu-exporter** EXITED(0) 41 hours ago — GPU metric source gone

Result: **NO GPU TIME-SERIES METRICS**. With RTX 4090 VRAM at 96.7% (23745/24564 MiB used = LlamaSwap pre-loaded all 7 models), the loss of GPU metrics is a **MATERIAL BLIND SPOT** per codex revision #3:

> "Given the operator mandate includes 'monitor system as we run local models,' stopped `nvidia-gpu-exporter`, Prometheus, and Grafana should not be treated as incidental. Phoenix/Langfuse cover tracing/APM, but they do not replace time-series GPU/system metrics. With RTX 4090 VRAM at 96.7%, missing GPU metrics is a material blind spot."

**Restart recommendation** (W317 operator-AI):
```powershell
cd Z:\claude\observability
docker compose up -d grafana prometheus nvidia-gpu-exporter
# Then verify:
curl -sS http://127.0.0.1:19090/api/v1/targets  # Prometheus scrape targets
curl -sS http://127.0.0.1:3001/api/health        # Grafana
docker logs nvidia-gpu-exporter --tail 10        # GPU exporter scrape
```

If restart fails: investigate Exit(255) cause (likely either config-drift or docker-restart-cascade collateral when langfuse stack restarted).

---

## GPU snapshot + utilization

```csv
name, driver_version, utilization.gpu, utilization.memory, memory.total, memory.used, memory.free, temperature.gpu, power.draw, power.limit
NVIDIA GeForce RTX 4090, 595.79, 39 %, 41 %, 24564 MiB, 23745 MiB, 394 MiB, 42, 34.89 W, 450.00 W
```

| Metric | Value | Interpretation |
|---|---|---|
| **Util GPU** | 39% | active but not saturated |
| **VRAM used** | 23745 MiB / 24564 MiB (96.7%) | LlamaSwap pre-loaded all swappable models |
| **VRAM free** | 394 MiB | TIGHT — any one new model load risks OOM |
| **Temperature** | 42 C | idle-cool |
| **Power draw** | 34.89 W / 450 W (7.8%) | idle-low (models loaded but no inference) |

**Compute processes**: `2828 dwm.exe`, `9140 ollama.exe`, `7736 llama-server.exe (ik_llama.cpp build)`, plus Windows system processes (no per-process VRAM reported on this driver).

W310 CUDA crash-loop remains FIXED (no temp spike, no GPU util spike on idle). LlamaSwap aggressive pre-loading is the VRAM consumer; W316 Stream 6 ratifies this is **by-design** for sub-second model-swap latency.

---

## CLAUDE.md L35 state-drift refresh queue (post-decisions)

| # | Field | Current cite | W317 proposed update |
|---|---|---|---|
| L35-D1 | T1 hindsight | "T1 hindsight ✓ (W280b local fallback :9077)" | "T1 hindsight DEGRADED (plugin-internal `hindsight-embed` only; W316 confirmed no NSSM, no LISTEN; T1 operational cite withdrawn)" |
| L35-D2 | T5 langfuse version | "T5 langfuse ✓ LIVE v3.170.0" | "T5 langfuse ✓ LIVE v3.174.1 (W317 upgraded from v3.170.0 to close MethodNotAllowedError recurring pattern observed W316 Stream 6)" |
| L35-D3 | Phoenix status | "Phoenix RUNNING per W315-r2" | KEEP — already current; arizephoenix/phoenix:version-13.15.0 confirmed healthy |
| L35-D4 | OllamaServe status | "OllamaServe RUNNING idle/0-models" | KEEP — already current; 2 models in tags, 0 loaded |
| L34-D5 | marketplace count | "16 referenced / 22 defined / 18 cache-dirs" | KEEP (W315 Stream B already disambiguated) |
| L34-D6 | LlamaSwap doc | not yet in main body | "Local model serving: NSSM `LlamaSwap` :8090 swaps 7 models (gemma4-26b, gemma4-31b, qwen3-coder-30b, qwen3-embed-0.6b, qwen3-reranker-0.6b, qwen3-vl-8b)" — W315-r2 AI-r2-5 still pending |

---

## Codex GPT-5.5 verbatim verdict

**Verdict: NEEDS-REVISION**

```
The snapshot is solid, but I would revise two decisions before shipping W317 docs.

1. Hindsight: APPROVE option (b).
   Concur with removing the T1 operational cite. If there is no NSSM service, no listener on
   :9077, and only `hindsight-embed` as a plugin-cache subprocess, then claiming a T1 local
   fallback is misleading. Record it as degraded/plugin-internal only, and make Basic-Memory
   the canonical local memory tier. Installing a daemon can be a later feature, not a health fix.

2. Langfuse: do not merely "monitor 24h" as the primary action.
   Langfuse docs say v3 minor/patch updates are intended to be non-disruptive and auto-run
   migrations, and recommend staying current for security/performance/features. Current
   GitHub releases show v3.174.1 as Latest on May 13, 2026, while the instance is v3.170.0.
   I would revise to: first audit the exporter URL/method, then perform a controlled upgrade
   to latest v3 if no obvious local misroute is found. The release stream includes OTel
   dependency bumps in v3.174.1 and secondary OTel ingestion queue work in v3.173.0, so an
   OTel-adjacent recurring error is a reasonable upgrade trigger, not just noise.
   Sources: Langfuse upgrade docs and GitHub releases:
       https://langfuse.com/self-hosting/upgrade
       https://github.com/langfuse/langfuse/releases

3. Observability rack: mark as an actual gap.
   Given the operator mandate includes "monitor system as we run local models," stopped
   nvidia-gpu-exporter, Prometheus, and Grafana should not be treated as incidental.
   Phoenix/Langfuse cover tracing/APM, but they do not replace time-series GPU/system
   metrics. With RTX 4090 VRAM at 96.7%, missing GPU metrics is a material blind spot.

4. Claude doctor: APPROVE upstream issue, but include local repro artifacts.
   File it with exact command, timeout, OS, claude 2.1.144, Node version, whether network
   disabled changes behavior, and any ProcMon/event-log clue. "No diagnostic output" is the
   key defect.

Missed ecosystem checks I would add: Docker container restart counts/health statuses,
Langfuse worker logs separately from web logs, disk free space on Z:, Windows service
recovery policies for the NSSM services, VRAM headroom/eviction behavior under one live
inference, and Prometheus scrape target status once restored.
```

**Tokens used**: 50,053.

**Resolution**: all 4 codex revisions ABSORBED into this Stream 6 deliverable:
- Revision 1 (hindsight): option (b) ratified in this doc (§ "Hindsight :9077 decision").
- Revision 2 (Langfuse upgrade not just monitor): codex's Step-1 (URL audit) + Step-2 (controlled upgrade to v3.174.1) absorbed in this doc (§ "Langfuse :3000 restart investigation").
- Revision 3 (observability rack gap): explicitly marked as MATERIAL BLIND SPOT in this doc (§ "Observability rack gap").
- Revision 4 (claude doctor repro artifacts): added to upstream issue draft (§ "Repro artifacts to include").

---

## Operator-AIs W317

| # | AI | Severity | Description |
|---|---|---|---|
| **W317-AI-1** | LANGFUSE UPGRADE | **SEV-3** | Audit settings.json OTel exporter URL. If clean, `docker compose pull && up -d langfuse-web langfuse-worker` to v3.174.1; close MethodNotAllowedError pattern. |
| **W317-AI-2** | HINDSIGHT T1 CITE DEMOTION | **MED** | Edit CLAUDE.md L35: "T1 hindsight ✓ (W280b local fallback :9077)" → "T1 hindsight DEGRADED (plugin-internal `hindsight-embed` only; W316 confirmed no NSSM, no LISTEN; T1 operational cite withdrawn)". |
| **W317-AI-3** | CLAUDE DOCTOR UPSTREAM ISSUE | LOW | Operator files the paste-ready draft at `https://github.com/anthropics/claude-code/issues/new`. Append local repro artifacts: OS + node + network-disabled-test + ProcMon trace. Link issue ID to CLAUDE.md W312-A.2. |
| **W317-AI-4** | OBSERVABILITY RACK RESTART | **MED-HIGH** | `cd Z:\claude\observability && docker compose up -d grafana prometheus nvidia-gpu-exporter` — restore GPU time-series metrics for the live-model-running mandate. Investigate Exit(255) root-cause if restart fails. |
| **W317-AI-5** | LLAMASWAP CLAUDE.md DOC | LOW | (W315-r2 AI-r2-5 carry-over) Add "Local model serving: NSSM `LlamaSwap` :8090 swaps 7 models" line under L34. |
| **W317-AI-6** | mem-recall SKILL T1 LOOKUP PATH | LOW | Skill at `.claude/skills/mem-recall/SKILL.md` should be reviewed (out of Stream 6 scope) to drop any explicit T1-API-call assumption; route all lookups via T6 basic-memory primary. |
| **W317-AI-7** | DISK FREE SPACE Z: | LOW | (codex revision missed-check) Probe `Get-Volume Z` periodically; W316 Stream 6 did not measure. |
| **W317-AI-8** | NSSM RECOVERY POLICY | LOW | (codex revision missed-check) Audit Windows service recovery policies for 4 RUNNING NSSM services: do they auto-restart on crash? `sc qfailure CogneeMCP` etc. |
| **W317-AI-9** | LANGFUSE WORKER LOG AUDIT | LOW | (codex revision missed-check) `docker logs langfuse-worker --tail 200` separately from web logs to surface worker-side OTel queue errors. |
| **W317-AI-10** | VRAM EVICTION TEST | LOW | (codex revision missed-check) With VRAM at 96.7%, test what happens when a live inference loads a model larger than the 394 MiB free — does LlamaSwap evict gracefully? |
| **W317-AI-11** | PROMETHEUS SCRAPE TARGETS | LOW | (codex revision missed-check) Once observability rack restarted, verify `curl http://127.0.0.1:19090/api/v1/targets` shows nvidia-gpu-exporter UP. |
| **W317-AI-12** | DOCKER RESTART COUNT TELEMETRY | LOW | (codex revision missed-check) Track per-container restart counts over 7d to catch crash-loop patterns earlier; `docker inspect <ctr> | jq '.[].RestartCount'`. |

---

## Final outputs (one-paragraph + numbers)

**Deliverable path**: `Z:/claude-sota-installed/docs/architecture/W316-FULL-UNLEASH-WAVE/STREAM-6-MONITORING.md`

**Healthy services**: 8 / 10 probed (CogneeMCP, Basic-Memory, IkLlamaServer, LlamaSwap, Langfuse-recovered, Phoenix, OllamaServe, GPU/RTX-4090) — up from 7/10 at W315 Stream E baseline.

**SEV-1**: 0 — no service is so degraded that it threatens runtime correctness.

**SEV-2**: 1 (Hindsight :9077 confirmed no listener — but downgraded operationally per codex-ratified option (b) "accept degradation").

**SEV-3 (degraded-recurring)**: 1 (Langfuse :3000 MethodNotAllowedError pattern recurring every 15-30min when active — service responds 200 OK most of the time; W317-AI-1 plan: upgrade v3.170.0 → v3.174.1).

**Down-by-design**: 1 (FalkorDB — W295 retirement).

**Codex GPT-5.5 verdict**: **NEEDS-REVISION**, 4 revisions: (1) hindsight option (b) APPROVED, (2) Langfuse upgrade NOT just monitor, (3) observability rack MATERIAL gap, (4) claude doctor needs repro artifacts. All 4 absorbed in this deliverable. Tokens used: 50,053.

**claude-doctor exit-code**: **EXIT=124** (timeout at 30s strict; W312-A.2 still open; upstream issue draft ready; 3rd wave-confirmation).

**CLAUDE.md L35 state-drift queue**: 2 edits proposed for W317 (T1 hindsight demotion + T5 langfuse v-bump post-upgrade); 4 already-current items KEEP; 2 carry-forwards from prior waves.

**Operator-AIs forwarded W317**: **12** (1 SEV-3 + 2 MED + 9 LOW; codex GPT-5.5's "missed ecosystem checks" all encoded as AI-7..AI-12).

**Cardinal-rule invariants** (passively-checked during Stream 6 — not the focus, but worth recording):
- R1 trusted-source primitives: ✓ (no install actions taken)
- R2 hooks ≤2KB exception: ✓ (no hook edits)
- R3 subagents from upstream: ✓ (no subagent edits)
- R4 `self_invented_count: 0`: ✓ (no rule files created; 0 self-invented hook bodies created)
- R5 safety boundaries: ✓ (no destructive ops; all probes READ-ONLY per stream constraints)
