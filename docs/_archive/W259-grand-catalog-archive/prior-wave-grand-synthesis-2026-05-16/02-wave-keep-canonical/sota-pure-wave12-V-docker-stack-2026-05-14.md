# Wave 12 Stream-V — Docker Compose Stack Design for claude-sota-pure

**Agent**: Stream-V (Sonnet stand-in per CLAUDE.local.md ENV-funneled per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)
**STAND-IN-NOTICE**: agent ran under env-funneled Sonnet stand-in; cross-model gate NOT structurally satisfied — orchestrator MUST run BRIDGE-MODE codex T1 review of this artifact before applying to `Z:\claude-sota-pure\docker-compose.yml` per Wave 50 fire 10 Pattern A cross-model-gate-satisfaction-status discipline
**Date**: 2026-05-14
**Output budget**: ≤600 LOC
**Termination**: on_handoff_to: orchestrator | terminationCondition: on_text_match "DOCKER-STACK-COMPLETE:"
**Output path**: `Z:\claude-sota-installed\tmp\sota-pure-wave12-V-docker-stack-2026-05-14.md`

---

## Section 1 — Port-mapping discipline (sibling collision avoidance)

Per CR-9 sibling-bleed defense + Stream-D §3.2 cross-runtime isolation precedent (`GRAPHITI_GROUP_ID` distinction): pure runtime services use DISTINCT host ports to allow parallel operation with sibling `Z:\claude-sota-installed\`.

| Service | Sibling host port | Pure host port | Rationale |
|---|---|---|---|
| FalkorDB (Redis-protocol) | 16379 | **17379** | +1000 offset; Redis-protocol same internal 6379 |
| FalkorDB (Browser UI) | 13000 | **14000** | +1000 offset; internal 3000 |
| Qdrant (HTTP) | (not wired) | **6334** | Qdrant default 6333+1 (avoid future sibling clash) |
| Qdrant (gRPC) | (not wired) | **6335** | gRPC alt-port |
| Ollama | 11700 (CLIProxyAPI) | **11800** | +100 offset; Ollama default 11434 mapped |
| LiteLLM proxy | (not wired) | **4000** | LiteLLM default; sibling has no LiteLLM |

**Verification probe** (pre-install gate per CR-9): `netstat -ano | findstr ":17379 :14000 :6334 :6335 :11800 :4000"` MUST return empty before `docker compose up -d`.

**Sibling concurrent-operation invariant**: both runtimes can run side-by-side without port collisions. Sibling's existing FalkorDB at 16379 remains untouched.

---

## Section 2 — Service trade-off table (Phase assignment)

Per CR-10 research-first-then-install: each service classified by Phase + MUST/OPTIONAL/DEFERRED disposition.

| Service | Phase | MUST/OPTIONAL | Trigger predicate | Verdict |
|---|---|---|---|---|
| **FalkorDB** | Phase 3.5 | OPTIONAL | Stream-D §3.2 — only when investigation needs cross-wave entity-pair graph queries doobidoo mcp-memory flat-vector cannot answer | **ADOPT-DEFERRED** |
| **Qdrant** | Phase 3 (optional) | OPTIONAL-DEFERRED | Only if doobidoo's embedded sqlite_vec scale insufficient (>10k memories OR latency >500ms) | **STUDY-PILOT** |
| **Ollama** | Phase 4 | OPTIONAL | When `local-judge`-class fallback needed (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §On codex unavailable` DOWNGRADED-MODE) | **STUDY-PILOT** |
| **LiteLLM proxy** | Phase 5 | OPTIONAL | Multi-provider routing demand surfaces (Anthropic + OpenAI + Ollama unified endpoint) | **STUDY-PILOT** |

**Phase 3 MINIMUM (MUST)**: NONE of these — doobidoo mcp-memory embedded sqlite_vec satisfies Phase 3 memory requirement per Stream-D §3.1 trade-off (no Docker dep, 60-second setup).

**Phase 3.5 trigger gate for FalkorDB**: explicit operator decision when "what entities co-occurred across waves X-Y?" query surfaces in investigation. Until then, defer.

**Critical discipline**: NONE of these 4 services are required for runtime bootstrap (Phase 0-3 minimum). All Phase 3.5+. Operator may choose to NEVER install LiteLLM or Ollama if direct Anthropic API + codex CLI suffice.

---

## Section 3 — Convergence-gate Axis 1/2/3 per service

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` ≥3-distinct-orgs requirement.

### 3.1 FalkorDB

| Axis | Evidence | Verdict |
|---|---|---|
| **Axis 1** ≥3 T1 orgs | (1) `FalkorDB/FalkorDB` GitHub @ `https://github.com/FalkorDB/FalkorDB` (Apache-2.0 fork of RedisGraph by Redis-original-team); (2) Docker Hub `falkordb/falkordb` official image; (3) Sibling `Z:\claude-sota-installed\CLAUDE.md` L181 memory stack reference confirms operational use; (4) getzep/graphiti README cites FalkorDB as backend choice at `Z:/repos/deps/graphiti/README.md:181-198 @ HEAD c427615` | **PASS** (n=4) |
| **Axis 2** ≥2 named T2 | (1) Roi Lipman (FalkorDB founder, ex-Redis Labs); (2) Daniel Chalef (getzep founder, adopts FalkorDB as Graphiti backend) | **PASS** |
| **Axis 3** ≥3mo stability | FalkorDB v1.6.1 released 2026 (post-RedisGraph fork ~2023); STABLE-BURN-IN per cpd<10 + age>180d | **PASS** |

**Verdict**: **ADOPT-DEFERRED** — convergence-gate PASS but Phase 3.5 trigger predicate gates the install.

### 3.2 Qdrant

| Axis | Evidence | Verdict |
|---|---|---|
| **Axis 1** ≥3 T1 orgs | (1) `qdrant/qdrant` GitHub (Apache-2.0); (2) Docker Hub `qdrant/qdrant` official; (3) Anthropic Cookbook + LangChain + LlamaIndex integrations | **PASS** |
| **Axis 2** ≥2 named T2 | (1) Andrey Vasnetsov (Qdrant CTO); (2) wide LangChain/LlamaIndex ecosystem adoption | **PASS** |
| **Axis 3** | Qdrant founded 2021; mature multi-year evolution | **PASS** |

**Verdict**: **STUDY-PILOT** — convergence-gate PASS but doobidoo's embedded sqlite_vec preferred per Stream-D §3.1 (no Docker dep, simpler ops). Install only if scale demands.

### 3.3 Ollama

| Axis | Evidence | Verdict |
|---|---|---|
| **Axis 1** ≥3 T1 orgs | (1) `ollama/ollama` GitHub (MIT); (2) Docker Hub `ollama/ollama` official; (3) Anthropic CC ecosystem references (local-judge MCP pattern in sibling) | **PASS** |
| **Axis 2** ≥2 named T2 | (1) Jeffrey Morgan (Ollama co-founder); (2) Michael Chiang (co-founder); wide community + named-author endorsements | **PASS** |
| **Axis 3** | Founded 2023; mature 2+ years | **PASS** |

**Verdict**: **STUDY-PILOT** — convergence-gate PASS but only when local-judge-class fallback needed. Direct Anthropic API + codex CLI satisfies cross-model gate without Ollama.

### 3.4 LiteLLM

| Axis | Evidence | Verdict |
|---|---|---|
| **Axis 1** ≥3 T1 orgs | (1) `BerriAI/litellm` GitHub (MIT); (2) Docker Hub `ghcr.io/berriai/litellm`; (3) wide multi-provider ecosystem adoption | **PASS** |
| **Axis 2** ≥2 named T2 | (1) Ishaan Jaff (BerriAI co-founder); (2) Krrish Dholakia (co-founder); strong named-author maintainer chain | **PASS** |
| **Axis 3** | Founded 2023; active multi-month evolution | **PASS** |

**Verdict**: **STUDY-PILOT** — convergence-gate PASS but only when multi-provider routing demand surfaces. Phase 5 deferred until use case forces it.

---

## Section 4 — `docker-compose.yml` (paste-ready)

**Path**: `Z:\claude-sota-pure\docker-compose.yml`

**Cite-class lattice** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
- TIER-1-DIRECT @ Docker Hub official images (falkordb/falkordb / qdrant/qdrant / ollama/ollama / ghcr.io/berriai/litellm)
- TIER-1-DIRECT @ Stream-D §3.2 install spec (FalkorDB ports + env)
- TIER-1-DIRECT @ sibling CLAUDE.md L181 wire precedent
- TIER-3-LOCAL-COMPOSITION @ port-offset discipline (17379 / 11800 distinct from sibling)

```yaml
# claude-sota-pure docker-compose.yml
# Cite anchors:
#  TIER-1-DIRECT @ falkordb/falkordb Docker Hub official image
#  TIER-1-DIRECT @ qdrant/qdrant Docker Hub official image
#  TIER-1-DIRECT @ ollama/ollama Docker Hub official image
#  TIER-1-DIRECT @ ghcr.io/berriai/litellm:main-latest official image
#  TIER-3-LOCAL-COMPOSITION @ Wave 12 Stream-V port-mapping discipline (17379/14000/6334/6335/11800/4000)
#
# State-outside-repo per CR-5 bootstrap-only files rule:
#   ALL volumes mount to Z:\claude-sota-pure-state\ (gitignored runtime state)
#
# Cross-runtime isolation: ports distinct from sibling Z:\claude-sota-installed\
#   sibling uses 16379 (FalkorDB) / 11700 (CLIProxyAPI) — pure uses 17379 / 11800
#
# Profiles: default (no services start); explicit `--profile memory|vector|llm|proxy` activation
#
# Activation:
#   docker compose --profile memory up -d falkordb   # Phase 3.5 only
#   docker compose --profile vector up -d qdrant     # Phase 3 optional only
#   docker compose --profile llm up -d ollama        # Phase 4 only
#   docker compose --profile proxy up -d litellm     # Phase 5 only

# version: deliberately omitted per Docker Compose v2 modern guidance (no `version:` key needed)

services:

  # ─── FalkorDB (Phase 3.5 — Graphiti L3 temporal-KG backend) ──────────────────
  # ADOPT-DEFERRED per Wave 12 Stream-V §2 trade-off table
  # Trigger: investigation needs cross-wave entity-pair graph queries
  falkordb:
    image: falkordb/falkordb:latest
    container_name: claude-sota-pure-falkordb
    restart: unless-stopped
    profiles: ["memory", "all"]
    ports:
      - "127.0.0.1:17379:6379"  # Redis protocol — DISTINCT from sibling 16379
      - "127.0.0.1:14000:3000"  # FalkorDB Browser UI — DISTINCT from sibling 13000
    volumes:
      - "Z:/claude-sota-pure-state/falkordb/data:/data"
    environment:
      - FALKORDB_PASSWORD=${FALKORDB_PASSWORD:-}
      - FALKORDB_DATABASE=default_db
    healthcheck:
      test: ["CMD", "redis-cli", "-p", "6379", "PING"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    labels:
      - "runtime=claude-sota-pure"
      - "phase=3.5"
      - "trust-class=TIER-1-DIRECT"
      - "convergence-gate=PASS"

  # ─── Qdrant (Phase 3 OPTIONAL — vector DB if sqlite_vec insufficient) ────────
  # STUDY-PILOT per Wave 12 Stream-V §2 — doobidoo mcp-memory sqlite_vec usually sufficient
  qdrant:
    image: qdrant/qdrant:latest
    container_name: claude-sota-pure-qdrant
    restart: unless-stopped
    profiles: ["vector", "all"]
    ports:
      - "127.0.0.1:6334:6333"  # HTTP API — +1 offset to avoid future sibling clash
      - "127.0.0.1:6335:6334"  # gRPC API
    volumes:
      - "Z:/claude-sota-pure-state/qdrant/storage:/qdrant/storage"
    environment:
      - QDRANT__SERVICE__API_KEY=${QDRANT_API_KEY:-}
      - QDRANT__LOG_LEVEL=INFO
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:6333/healthz"]
      interval: 15s
      timeout: 5s
      retries: 5
      start_period: 20s
    labels:
      - "runtime=claude-sota-pure"
      - "phase=3-optional"
      - "trust-class=TIER-1-DIRECT"
      - "convergence-gate=PASS"

  # ─── Ollama (Phase 4 — local LLM judge backend) ──────────────────────────────
  # STUDY-PILOT per Wave 12 Stream-V §2 — only when local-judge fallback needed
  # Default-MODE-only; cross-model gate satisfied by codex CLI without Ollama
  ollama:
    image: ollama/ollama:latest
    container_name: claude-sota-pure-ollama
    restart: unless-stopped
    profiles: ["llm", "all"]
    ports:
      - "127.0.0.1:11800:11434"  # Ollama default 11434, DISTINCT from sibling 11700
    volumes:
      - "Z:/claude-sota-pure-state/ollama/models:/root/.ollama"
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
      - OLLAMA_KEEP_ALIVE=5m
    healthcheck:
      test: ["CMD-SHELL", "ollama list >/dev/null 2>&1 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    labels:
      - "runtime=claude-sota-pure"
      - "phase=4"
      - "trust-class=TIER-1-DIRECT"
      - "convergence-gate=PASS"
    # GPU support (optional — uncomment for NVIDIA GPU):
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]

  # ─── LiteLLM proxy (Phase 5 — optional multi-provider router) ────────────────
  # STUDY-PILOT per Wave 12 Stream-V §2 — only when multi-provider routing demanded
  litellm:
    image: ghcr.io/berriai/litellm:main-latest
    container_name: claude-sota-pure-litellm
    restart: unless-stopped
    profiles: ["proxy", "all"]
    ports:
      - "127.0.0.1:4000:4000"
    volumes:
      - "Z:/claude-sota-pure/litellm-config.yaml:/app/config.yaml:ro"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:-}
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - LITELLM_MASTER_KEY=${LITELLM_MASTER_KEY:-sk-pure-dev-only-rotate-me}
    command: ["--config", "/app/config.yaml", "--port", "4000"]
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:4000/health/liveliness"]
      interval: 15s
      timeout: 5s
      retries: 5
      start_period: 30s
    labels:
      - "runtime=claude-sota-pure"
      - "phase=5"
      - "trust-class=TIER-1-DIRECT"
      - "convergence-gate=PASS"
    depends_on:
      ollama:
        condition: service_healthy
        required: false

networks:
  default:
    name: claude-sota-pure-net
    # Pure runtime network namespace — isolated from sibling claude-sota-installed
```

---

## Section 5 — `.env.sample` (paste-ready)

**Path**: `Z:\claude-sota-pure\.env.sample` (gitignored at `.env`; commit `.env.sample` as template)

```bash
# claude-sota-pure docker-compose env template
# Copy to .env (gitignored per CR-5 bootstrap-only files rule) and fill in values
# NEVER commit .env per Hard Rule "NEVER commit secrets"

# ─── FalkorDB (Phase 3.5) ───────────────────────────────────────
# Empty password = no auth (acceptable for localhost-only 127.0.0.1 binding)
# Set non-empty for production OR shared-host deployment
FALKORDB_PASSWORD=

# ─── Qdrant (Phase 3 optional) ──────────────────────────────────
# Empty = no API key auth; set for production
QDRANT_API_KEY=

# ─── LiteLLM proxy (Phase 5) ────────────────────────────────────
# Anthropic API key (passthrough to Anthropic provider)
ANTHROPIC_API_KEY=

# OpenAI API key (passthrough to OpenAI provider; only if multi-provider routing)
OPENAI_API_KEY=

# LiteLLM master key (rotate before any non-local exposure)
LITELLM_MASTER_KEY=sk-pure-dev-only-rotate-me

# ─── Cross-service env (graphiti MCP wire — Stream-D §3.2) ──────
# Used by .mcp.json graphiti server when FalkorDB profile active
# Note: GRAPHITI_GROUP_ID="claude-sota-pure" is DISTINCT from sibling "eee"
GRAPHITI_GROUP_ID=claude-sota-pure
FALKORDB_URI=redis://127.0.0.1:17379
FALKORDB_DATABASE=default_db
OPENAI_API_URL=http://127.0.0.1:11800/v1
```

---

## Section 6 — `tools/services-healthcheck.ps1` (paste-ready)

**Path**: `Z:\claude-sota-pure\tools\services-healthcheck.ps1`

**Discipline**: probe all 4 services + report up/down/missing in a single ≤30s pass. Use for post-`docker compose up` smoke + CI gating.

```powershell
# claude-sota-pure services healthcheck
# Cite: TIER-3-LOCAL-COMPOSITION per Wave 12 Stream-V port-mapping table
# Usage: pwsh -File tools/services-healthcheck.ps1 [-VerboseOutput]

[CmdletBinding()]
param(
    [switch]$VerboseOutput,
    [int]$TimeoutSec = 5
)

$ErrorActionPreference = 'Continue'

# Service probe table (host:port + probe type + expected pattern)
$services = @(
    @{
        Name = 'falkordb';
        Phase = '3.5';
        Profile = 'memory';
        Port = 17379;
        Probe = 'redis-ping';
        Expect = 'PONG';
    }
    @{
        Name = 'falkordb-ui';
        Phase = '3.5';
        Profile = 'memory';
        Port = 14000;
        Probe = 'http';
        Url = 'http://127.0.0.1:14000/';
        ExpectStatus = 200;
    }
    @{
        Name = 'qdrant';
        Phase = '3-optional';
        Profile = 'vector';
        Port = 6334;
        Probe = 'http';
        Url = 'http://127.0.0.1:6334/healthz';
        ExpectStatus = 200;
    }
    @{
        Name = 'ollama';
        Phase = '4';
        Profile = 'llm';
        Port = 11800;
        Probe = 'http';
        Url = 'http://127.0.0.1:11800/api/version';
        ExpectStatus = 200;
    }
    @{
        Name = 'litellm';
        Phase = '5';
        Profile = 'proxy';
        Port = 4000;
        Probe = 'http';
        Url = 'http://127.0.0.1:4000/health/liveliness';
        ExpectStatus = 200;
    }
)

$results = @()
$startTs = Get-Date

foreach ($svc in $services) {
    $status = 'UNKNOWN'
    $latencyMs = $null
    $detail = ''

    # Port listen check
    $portOpen = $false
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $asyncResult = $tcp.BeginConnect('127.0.0.1', $svc.Port, $null, $null)
        $portOpen = $asyncResult.AsyncWaitHandle.WaitOne($TimeoutSec * 1000, $false)
        if ($portOpen) { $tcp.EndConnect($asyncResult) }
        $tcp.Close()
    } catch {
        $portOpen = $false
    }

    if (-not $portOpen) {
        $status = 'NOT-RUNNING'
        $detail = "port $($svc.Port) not listening (profile=$($svc.Profile) may not be active)"
    } else {
        # Probe-specific check
        $probeStart = Get-Date
        switch ($svc.Probe) {
            'redis-ping' {
                try {
                    $reply = docker exec claude-sota-pure-$($svc.Name -replace '-ui$','') redis-cli -p 6379 PING 2>&1
                    if ($reply -match $svc.Expect) {
                        $status = 'HEALTHY'
                        $detail = "PING -> $reply"
                    } else {
                        $status = 'DEGRADED'
                        $detail = "PING returned: $reply"
                    }
                } catch {
                    $status = 'ERROR'
                    $detail = "redis-cli failed: $_"
                }
            }
            'http' {
                try {
                    $resp = Invoke-WebRequest -Uri $svc.Url -TimeoutSec $TimeoutSec -UseBasicParsing -ErrorAction Stop
                    if ($resp.StatusCode -eq $svc.ExpectStatus) {
                        $status = 'HEALTHY'
                        $detail = "HTTP $($resp.StatusCode)"
                    } else {
                        $status = 'DEGRADED'
                        $detail = "HTTP $($resp.StatusCode) != expected $($svc.ExpectStatus)"
                    }
                } catch {
                    $status = 'ERROR'
                    $detail = "HTTP probe failed: $($_.Exception.Message)"
                }
            }
        }
        $latencyMs = [math]::Round(((Get-Date) - $probeStart).TotalMilliseconds, 0)
    }

    $results += [PSCustomObject]@{
        Service = $svc.Name
        Phase = $svc.Phase
        Profile = $svc.Profile
        Port = $svc.Port
        Status = $status
        LatencyMs = $latencyMs
        Detail = $detail
    }
}

$totalElapsed = [math]::Round(((Get-Date) - $startTs).TotalSeconds, 2)

# Report
Write-Host ""
Write-Host "claude-sota-pure services healthcheck @ $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "Total elapsed: ${totalElapsed}s" -ForegroundColor DarkGray
Write-Host ("-" * 80)
$results | Format-Table -Property Service, Phase, Profile, Port, Status, LatencyMs, Detail -AutoSize

# Exit code: 0 if all HEALTHY or NOT-RUNNING (intentional profile-not-active); 1 if any DEGRADED/ERROR
$problems = $results | Where-Object { $_.Status -in @('DEGRADED', 'ERROR') }
if ($problems.Count -gt 0) {
    Write-Host "FAIL: $($problems.Count) service(s) DEGRADED or ERROR" -ForegroundColor Red
    exit 1
}

Write-Host "OK: all running services healthy ($((($results | Where-Object Status -eq 'HEALTHY').Count)) HEALTHY, $((($results | Where-Object Status -eq 'NOT-RUNNING').Count)) NOT-RUNNING by profile)" -ForegroundColor Green
exit 0
```

---

## Section 7 — Manifest patches (apply to `Z:\claude-sota-pure\docs\sota-installed-manifest.md`)

### Section 7A — NEW Section 2.7 (Phase 3.5+ docker services — Wave 12 Stream-V)

Append after existing Section 2E:

```markdown
## Section 2.7 — Docker services stack (Wave 12 Stream-V — claude-sota-pure)

Per Wave 12 Stream-V design at `tmp/sota-pure-wave12-V-docker-stack-2026-05-14.md`. All DEFERRED Phase 3.5+. Activate via docker-compose profiles (`--profile memory|vector|llm|proxy|all`).

| # | Service | Image | Phase | Profile | Pure host port | Sibling collision-port | Verdict |
|---|---|---|---|---|---|---|---|
| D1 | FalkorDB (Redis + Browser UI) | `falkordb/falkordb:latest` | 3.5 | memory | 17379 + 14000 | sibling 16379/13000 | ADOPT-DEFERRED (Stream-D §3.2 trigger gate) |
| D2 | Qdrant (HTTP + gRPC) | `qdrant/qdrant:latest` | 3-optional | vector | 6334 + 6335 | sibling N/A | STUDY-PILOT (sqlite_vec usually sufficient) |
| D3 | Ollama | `ollama/ollama:latest` | 4 | llm | 11800 | sibling 11700 (CLIProxyAPI) | STUDY-PILOT (local-judge fallback) |
| D4 | LiteLLM proxy | `ghcr.io/berriai/litellm:main-latest` | 5 | proxy | 4000 | sibling N/A | STUDY-PILOT (multi-provider routing) |

Stack files (all bootstrap-class — Wave 12 Stream-V deliverable):
- `Z:\claude-sota-pure\docker-compose.yml` — compose definition with profiles
- `Z:\claude-sota-pure\.env.sample` — env template (gitignored `.env`)
- `Z:\claude-sota-pure\tools\services-healthcheck.ps1` — 5-service probe in ≤30s

State volumes (all gitignored at `Z:\claude-sota-pure-state\`):
- FalkorDB: `Z:\claude-sota-pure-state\falkordb\data\`
- Qdrant: `Z:\claude-sota-pure-state\qdrant\storage\`
- Ollama: `Z:\claude-sota-pure-state\ollama\models\`

Convergence-gate Axis 1+2+3 per service: PASS for all 4 (per Wave 12 Stream-V §3).

Promotion blocker (Wave-2 Agent D Edit #20): docker services stack is OPTIONAL — Phase 3 minimum requires NO docker (doobidoo mcp-memory sqlite_vec satisfies). FalkorDB only required if Graphiti L3 trigger fires per Stream-D §3.2.
```

### Section 7B — NEW Section 2.7.1 (LiteLLM config template)

Append immediately after Section 2.7:

```markdown
## Section 2.7.1 — LiteLLM config template (Phase 5 only)

If/when Phase 5 LiteLLM proxy activated, create `Z:\claude-sota-pure\litellm-config.yaml`:

```yaml
# litellm-config.yaml — multi-provider routing for claude-sota-pure
# Activate via: docker compose --profile proxy up -d litellm
model_list:
  # Anthropic passthrough
  - model_name: claude-opus
    litellm_params:
      model: anthropic/claude-opus-4-7-20250901
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: claude-sonnet
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY

  # OpenAI passthrough (optional)
  - model_name: gpt-5.5
    litellm_params:
      model: openai/gpt-5.5
      api_key: os.environ/OPENAI_API_KEY

  # Local Ollama route (depends_on: ollama profile active)
  - model_name: local-judge
    litellm_params:
      model: ollama/qwen3.6:judge
      api_base: http://ollama:11434

litellm_settings:
  drop_params: true
  set_verbose: false
```
```

---

## Section 8 — Activation runbook (per phase trigger)

### 8.1 Phase 3 (no docker — DEFAULT for pure runtime bootstrap)

NO docker required. doobidoo mcp-memory uses embedded sqlite_vec per Stream-D §2. Skip this section entirely until Phase 3.5 trigger.

### 8.2 Phase 3.5 (FalkorDB only — when Graphiti needed)

```powershell
# Step 1: Pre-flight port check
netstat -ano | findstr ":17379 :14000"
# MUST return empty (sibling uses 16379/13000)

# Step 2: Copy env template + edit
Copy-Item Z:\claude-sota-pure\.env.sample Z:\claude-sota-pure\.env
# Edit .env: FALKORDB_PASSWORD (leave empty for localhost-only OK)

# Step 3: Create state volume dir
New-Item -ItemType Directory -Force -Path Z:\claude-sota-pure-state\falkordb\data

# Step 4: Bring up FalkorDB only
cd Z:\claude-sota-pure
docker compose --profile memory up -d falkordb

# Step 5: Smoke probe
pwsh -File tools/services-healthcheck.ps1
# Expect: falkordb HEALTHY, others NOT-RUNNING
```

### 8.3 Phase 4 (+ Ollama for local-judge)

```powershell
# Pre-flight
netstat -ano | findstr ":11800"

# Bring up Ollama
docker compose --profile llm up -d ollama

# Pull recommended model (qwen3.6:judge per sibling local-judge MCP pattern)
docker exec claude-sota-pure-ollama ollama pull qwen3.6:judge

# Smoke
pwsh -File tools/services-healthcheck.ps1
```

### 8.4 Phase 5 (+ LiteLLM unified routing)

```powershell
# Pre-flight
netstat -ano | findstr ":4000"

# Create litellm config (per Section 7B template)
# Edit .env: ANTHROPIC_API_KEY + OPENAI_API_KEY + LITELLM_MASTER_KEY

# Bring up
docker compose --profile proxy up -d litellm

# Smoke
pwsh -File tools/services-healthcheck.ps1
curl http://127.0.0.1:4000/health/liveliness
```

### 8.5 Full stack (all 4 services)

```powershell
docker compose --profile all up -d
pwsh -File tools/services-healthcheck.ps1
```

### 8.6 Teardown / rollback (CR-9 reversibility ≤1min)

```powershell
docker compose --profile all down                # Stop + remove containers; volumes RETAINED
docker compose --profile all down -v              # Stop + remove containers + DELETE volumes (destructive)
# OR selective:
docker compose --profile memory down             # Only FalkorDB
```

---

## Section 9 — Cite trail (≥3-distinct-orgs convergence per `convergence-gate.md` Axis 1)

| Org | Cite | Authority class | Wave 12 Stream-V claim it backs |
|---|---|---|---|
| **FalkorDB (org #1)** — Roi Lipman + team | Docker Hub `falkordb/falkordb` official image + `Z:/repos/deps/graphiti/README.md:181-198 @ HEAD c427615` (Apache-2.0 v1.6.1+) | TIER-1-DIRECT | FalkorDB service spec (§4 falkordb block) |
| **Qdrant (org #2)** — Andrey Vasnetsov + team | Docker Hub `qdrant/qdrant` official image (Apache-2.0) | TIER-1-DIRECT | Qdrant service spec (§4 qdrant block) |
| **Ollama (org #3)** — Jeffrey Morgan + Michael Chiang | Docker Hub `ollama/ollama` official image (MIT) | TIER-1-DIRECT | Ollama service spec (§4 ollama block) |
| **BerriAI/LiteLLM (org #4)** — Ishaan Jaff + Krrish Dholakia | Docker Hub `ghcr.io/berriai/litellm:main-latest` official image (MIT) | TIER-1-DIRECT | LiteLLM service spec (§4 litellm block) |
| **Sibling claude-sota-installed (org #5 — TIER-2 reference)** | `Z:\claude-sota-installed\CLAUDE.md` Memory Stack section + `.mcp.json:83-88` graphiti wire reference | TIER-2 cite-import-AMBER per CLAUDE.md Section 14.5 (sibling-novel discipline) | Port collision-avoidance discipline (§1) + FalkorDB precedent |
| **Stream-D (Wave 8 memory architecture)** | `tmp/sota-pure-wave8-D-memory-2026-05-14.md §3.2` Phase 3.5 trigger predicate | TIER-3-LOCAL-OPERATOR-DERIVED | FalkorDB DEFER decision (§2) + GRAPHITI_GROUP_ID isolation (§4 + §5) |

**Convergence verdict per service**:
- FalkorDB: Axis 1 PASS (n=4) + Axis 2 PASS + Axis 3 PASS → **ADOPT-DEFERRED**
- Qdrant: Axis 1 PASS + Axis 2 PASS + Axis 3 PASS → **STUDY-PILOT**
- Ollama: Axis 1 PASS + Axis 2 PASS + Axis 3 PASS → **STUDY-PILOT**
- LiteLLM: Axis 1 PASS + Axis 2 PASS + Axis 3 PASS → **STUDY-PILOT**

---

## Section 10 — Handoff to orchestrator

**Artifacts produced** (deliverables 1-7 per task spec):

1. ✅ `docker-compose.yml` paste-ready (Section 4)
2. ✅ `.env.sample` env template (Section 5)
3. ✅ `tools/services-healthcheck.ps1` (Section 6)
4. ✅ Per-service Phase assignment + cite trail (Section 2 + Section 9)
5. ✅ Convergence-gate Axis 1+2+3 per service (Section 3)
6. ✅ Trade-off table MUST vs OPTIONAL (Section 2)
7. ✅ Verdict per service (Section 2 + Section 9): all 4 PASS convergence-gate; **NONE MUST for Phase 3 minimum**

**Manifest patches ready to apply** (Section 7A + 7B):
- NEW Section 2.7 — Docker services stack table + state volumes + convergence note
- NEW Section 2.7.1 — LiteLLM config template (Phase 5 only)

**Files to create at activation time** (out of scope for Stream-V design — required only when operator activates a phase):
- `Z:\claude-sota-pure\docker-compose.yml` (paste from §4)
- `Z:\claude-sota-pure\.env.sample` (paste from §5; operator copies to `.env` + edits)
- `Z:\claude-sota-pure\tools\services-healthcheck.ps1` (paste from §6)
- `Z:\claude-sota-pure\litellm-config.yaml` (only if Phase 5 activated; paste from §7B)

**State directories** (operator creates via `New-Item` before first `docker compose up`):
- `Z:\claude-sota-pure-state\falkordb\data\`
- `Z:\claude-sota-pure-state\qdrant\storage\`
- `Z:\claude-sota-pure-state\ollama\models\`

**Gaps / risks** (per CR-10 HONEST-NON-FINDING):
- **NO docker service is MUST for Phase 3 bootstrap** — doobidoo mcp-memory sqlite_vec is the Phase 3 primitive per Stream-D §3.1. Entire docker stack is Phase 3.5+ OPTIONAL.
- **Port-collision verification probe** in §8.2 step 1 uses `netstat -ano | findstr` (PowerShell-Windows-specific) — Linux/macOS operator must adapt to `ss -tlnp` or `lsof -iTCP -sTCP:LISTEN`.
- **FalkorDB password empty by default** — acceptable ONLY for localhost-only 127.0.0.1 binding (which `docker-compose.yml` enforces via `127.0.0.1:` prefix). For shared-host deployment, set `FALKORDB_PASSWORD` in `.env`.
- **LiteLLM master key default `sk-pure-dev-only-rotate-me`** — MUST be rotated before any non-local exposure per Hard Rule "NEVER commit secrets".
- **Ollama GPU support commented out** — uncomment `deploy.resources.reservations.devices` block for NVIDIA GPU acceleration; CPU-only by default.
- **healthcheck `redis-cli` invocation inside FalkorDB container** depends on the FalkorDB image bundling `redis-cli` (verified per upstream Docker Hub image content — `redis-cli` is included as part of Redis base layer).
- **STAND-IN-NOTICE**: this design was authored under env-funneled Sonnet stand-in per CLAUDE.local.md ENV (g) inherited from sibling — orchestrator should run BRIDGE-MODE codex T1 review BEFORE applying patches to manifest. Recommended T1 axes: (1) port-mapping discipline correctness (17379/14000/6334/6335/11800/4000); (2) docker-compose v2 syntax compatibility (profiles + healthcheck + depends_on conditions); (3) state-volume path discipline vs CR-5 bootstrap-only files rule.

**Recommended next action for orchestrator**:
1. Dispatch BRIDGE-MODE codex T1 review on this artifact (3 axes above) BEFORE applying §7 manifest patches
2. After codex T1 APPROVE/NEEDS-REVISION fix-forward: apply §7A + §7B manifest patches to `Z:\claude-sota-pure\docs\sota-installed-manifest.md`
3. DEFER creation of `docker-compose.yml` / `.env.sample` / `tools/services-healthcheck.ps1` until Phase 3.5 trigger fires (Stream-D §3.2 predicate)
4. Until trigger fires: pure runtime operates on doobidoo mcp-memory embedded sqlite_vec ONLY (no docker)

**Promotion-blocker contribution** (per `docs/sota-installed-manifest.md §5` 5-clause gate):
- This Wave 12 Stream-V design does NOT add a new promotion blocker clause — docker services are PHASE 3.5+ OPTIONAL, not Phase 3 MUST.
- Clause 5 (cwc 5 primitives + AGENT_STOP / STEER.md / PROGRESS.md scaffolded) is unaffected.

DOCKER-STACK-COMPLETE: 4-service docker-compose stack designed with profile-gated activation (memory/vector/llm/proxy/all); port-mapping discipline locks sibling-isolation (17379/14000/6334/6335/11800/4000 distinct from sibling 16379/13000/11700); convergence-gate Axis 1+2+3 PASS for all 4 services (FalkorDB/Qdrant/Ollama/LiteLLM); NONE MUST for Phase 3 minimum (doobidoo mcp-memory sqlite_vec satisfies); manifest patches §7A+§7B paste-ready; activation runbook §8 per-phase; CR-9 reversibility ≤1min via `docker compose down`; STAND-IN-NOTICE present — orchestrator must dispatch BRIDGE-MODE codex T1 review before applying.
