# W301 Stream C — Docker-Compose for CogneeMCP + basic-memory (Endgame-A steps 4-5)

**Status**: SHIP-CANDIDATE (operator-ratified compose file pending smoke-test)
**Date**: 2026-05-19
**Branch**: ship-context (Stream C)
**Cite-anchor**: every primary URL re-fetched 2026-05-19 in this session via `ctx_fetch_and_index`.

---

## §1. Docker Desktop ≥ 4.54 Windows verification (re-fetch)

| Claim | Verdict | Primary source (re-fetched 2026-05-19) |
| --- | --- | --- |
| **Docker Desktop 4.54.0 release date** | **2025-12-04** | `https://docs.docker.com/desktop/release-notes/` — "## [4.54.0](#4540) _2025-12-04_" (verbatim from this session's ctx-indexed fetch). |
| **Docker Desktop 4.54 ships vLLM on Windows** | **TRUE** | Same page: "Added support for vLLM in Docker Model Runner on Windows with WSL2 and NVIDIA GPUs." Cross-confirmed by Docker blog `https://www.docker.com/blog/docker-model-runner-vllm-windows/` (posted Dec 11, 2025) which shows: `llama.cpp: running llama.cpp version: c22473b / vllm: running vllm version: 0.12.0`. |
| **Windows NVIDIA GPU passthrough officially supported** | **TRUE, but WSL2-only** | `https://docs.docker.com/desktop/features/gpu/` — verbatim: ">  Note > GPU support in Docker Desktop is only available on Windows with the WSL2 backend." Method: "NVIDIA GPU Paravirtualization (GPU-PV)". Prereqs: Windows 10/11, NVIDIA driver supporting WSL2-GPU-PV, `wsl --update`, WSL2 backend enabled. **Hyper-V backend has NO GPU support.** |
| **`host.docker.internal` resolves to host from container on Windows** | **TRUE, automatic** | `https://docs.docker.com/desktop/features/networking/` (`docker-networking::` ctx-indexed). Cross-confirmed: Docker Forums 142175 + 137472 — "Docker Desktop creates the `host.docker.internal` special DNS entry automatically on Windows and macOS… version 18.03 (March 2018) onwards natively supports host.docker.internal. Works out of the box, no extra configuration needed." For portability (Linux + safety net) we still set `extra_hosts: - "host.docker.internal:host-gateway"` per cnighswonger and Docker Compose `extra_hosts` spec (`https://docs.docker.com/compose/compose-file/05-services/#extra_hosts`). |

**Operator implication**: this runtime's Docker Desktop must be ≥ 4.54.0 AND WSL2 backend on. Hyper-V backend cannot host GPU containers. CogneeMCP and basic-memory don't need GPU — so the WSL2-backend requirement is operator-policy, not technical, for these two services (but the rest of the runtime's GPU-using Model-Runner work requires it anyway).

---

## §2. Host-bridge networking — CogneeMCP → host services

CogneeMCP must reach **three host services**:
1. **IkLlamaServer** (`http://127.0.0.1:8080/v1`) — host's OpenAI-compatible LLM
2. **Ollama** (`http://127.0.0.1:16700`) — host's embedding model
3. **Langfuse** (`http://127.0.0.1:3000`) — host's observability

On Docker Desktop for Windows (WSL2 backend) **with bridge network mode** (the default), `host.docker.internal` automatically resolves to the host gateway — no `extra_hosts` strictly required (cite §1 row 4). We still declare `extra_hosts: - "host.docker.internal:host-gateway"` per Docker Compose spec to (a) keep the compose file Linux-portable and (b) document intent.

**Inside the container, rewrite all three URLs**:
- `LLM_API_BASE=http://host.docker.internal:8080/v1`
- `EMBEDDING_API_BASE=http://host.docker.internal:16700`
- `LANGFUSE_HOST=http://host.docker.internal:3000`

**Firewall implications**: Docker Desktop networking on Windows-WSL2 is described in `https://docs.docker.com/desktop/features/networking/`:
> "Windows (WSL 2) | … `com.docker.backend.exe` (networking) | WSL 2 kernel (file sharing, no visibility from host) | Recommended only when WSL 2 integration is needed."
The `com.docker.backend.exe` process needs Windows-firewall allow on the loopback for the bridge gateway IP. Windows Defender Firewall by default permits loopback — this runtime's W301-Stream-A scan turned up zero blockers.

**Do NOT use `network_mode: host`** — it works on native Linux only. Docker Desktop on Mac/Windows runs the engine inside a Linux VM, so `--network host` attaches to the VM's network, not the Windows host (cited by `https://www.docker.com/blog/…/host-networking/` and Local-Deep-Research's own README which warns: "Mac / Windows / WSL2 users: `--network host` only works on native Linux. On Docker Desktop it silently fails…").

---

## §3. SQLite WAL across the Docker filesystem boundary (CRITICAL)

basic-memory uses SQLite + WAL on `memory.db` (DeepWiki on `basicmachines-co/basic-memory`: "WAL (Write-Ahead Logging) mode is enabled by default for filesystem SQLite databases…  `PRAGMA journal_mode=WAL` command executed on each new database connection").

**The two storage options for memory.db**:

| Option | Storage | Performance | Persistence | Verdict |
| --- | --- | --- | --- | --- |
| (a) **Bind-mount** to `Z:\claude-sota-installed-state\basic-memory\` | Windows NTFS via WSL 9p / virtiofs translation | **PENALTY** (10-50× on small-file random) | Survives container restart | **REJECT** |
| (b) **Named Docker volume** `basic_memory_data` | Stored inside Docker Desktop's Linux VM (ext4) | **Near-native** (no NTFS translation) | Survives container restart, survives `docker compose down`, *can* be lost if Docker Desktop is reset-to-factory | **RECOMMEND** |

**Primary-source justification**:
- `https://docs.docker.com/engine/storage/volumes/`: "Volumes are often a better choice than writing data directly to a container, because a volume doesn't increase the size of the containers using it. Using a volume is also faster…  When your application requires high-performance I/O" (verbatim).
- `https://docs.docker.com/desktop/settings/`: "for non-code items such as cache directories or databases, the performance will be much better if they are stored in the Linux VM, using a data volume" (verbatim).
- Codegenes 2026-Jan benchmark `https://www.codegenes.net/blog/docker-bind-mount-directory-vs-named-volume-performance-comparison/`: "Named volumes consistently outperformed bind mounts across databases with approximately 19% higher throughput and 17-24% lower latency."
- Simon Willison's 2026-Apr WAL-across-volume research `https://simonwillison.net/2026/Apr/7/sqlite-wal-docker-containers/`: "SQLite's WAL mode reliably supports concurrent access when two Docker containers share a volume on the same host… Docker containers on the same host and filesystem share the same shared memory in a way that allows WAL to collaborate as it should." (Experiment was on a **named volume**, not a bind mount.)

**Decision**: use **named volumes** for both `memory.db` (basic-memory) and Cognee's relational/vector/graph stores. Operator can `docker volume inspect basic_memory_data` to find the underlying path inside Docker's VM and use `docker run --rm -v basic_memory_data:/data busybox tar czf - /data > backup.tgz` for backups.

Bind-mount is **only** used for the **read-only `.env` template** mount (no perf risk on a tiny one-shot read).

---

## §4. docker-compose.yml structure (operator-ready)

Full file at `OPERATOR-READY-ARTIFACTS/docker-compose.cognee-basicmemory.yml`. Highlights:

```yaml
services:
  cognee:                                         # Cognee backend (graph+vector+relational)
    image: cognee/cognee:main                     # upstream image (Dockerfile at repo root)
    env_file: [./cognee.env]                      # SEV-1 secrets gitignored
    ports: ["127.0.0.1:8765:8000"]                # bind to loopback only
    volumes: [cognee_data:/app/data]              # named volume → fast ext4
    extra_hosts: ["host.docker.internal:host-gateway"]
    restart: unless-stopped
    healthcheck: { test: ["CMD","wget","-q","-O-","http://localhost:8000/health"], interval: 30s, retries: 5, start_period: 60s }

  cognee-mcp:                                     # MCP HTTP transport, points to backend
    image: cognee/cognee-mcp:main
    env_file: [./cognee.env]
    environment: [TRANSPORT_MODE=http, API_URL=http://cognee:8000]   # in-network DNS
    ports: ["127.0.0.1:8766:8000"]
    depends_on: { cognee: { condition: service_healthy } }

  basic-memory:
    image: ghcr.io/basicmachines-co/basic-memory:latest   # upstream prebuilt
    env_file: [./basic-memory.env]
    ports: ["127.0.0.1:8767:8000"]                # SSE transport
    volumes: [basic_memory_data:/app/data, basic_memory_config:/app/.basic-memory]
    restart: unless-stopped

volumes:
  cognee_data:
  basic_memory_data:
  basic_memory_config:

networks:
  default:
    name: cognee_memory_net
```

**Why we don't reuse the upstream `cognee/docker-compose.yml` verbatim**:
- Upstream binds `./cognee:/app/cognee` (source-mount for dev) — we don't need that
- Upstream binds `.env:/app/.env` (bind-mount) — we use `env_file:` instead (cleaner)
- Upstream doesn't expose Langfuse env-vars — we add them explicitly

**Why we don't reuse the upstream `basic-memory/docker-compose.yml` verbatim**:
- Upstream uses prebuilt `ghcr.io/basicmachines-co/basic-memory:latest` (we keep this — it works)
- Upstream uses bind-mount for `BASIC_MEMORY_HOME` — we swap to named volume (§3 verdict)

---

## §5. SEV-1 closure via `.env` (mirrors Stream-A WinSW `<envFromFile>` pattern)

**The problem**: the operator's W301 Stream-A audit flagged `LANGFUSE_SECRET_KEY` leak in CogneeMCP NSSM/registry. Stream-A's fix is `WinSW <envFromFile>`. Our docker-compose fix is structurally identical.

**Files**:
- **`cognee.env`** (gitignored, real secrets) — created by operator copying `cognee.env.template`
- **`cognee.env.template`** (tracked, no secrets) — created in this stream
- **`basic-memory.env`** (gitignored) + **`basic-memory.env.template`** (tracked)

**Compose `env_file` semantics** (verbatim `https://docs.docker.com/compose/compose-file/05-services/`):
> "The `env_file` attribute is used to specify one or more files that contain environment variables to be passed to the containers… **Environment variables declared in the `environment` section override these values.** This holds true even if those values are empty or undefined."

So `environment:` wins over `env_file:` — useful for compose-time overrides without editing the secret file.

**`.gitignore` entries** (operator action):
```
docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/OPERATOR-READY-ARTIFACTS/cognee.env
docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/OPERATOR-READY-ARTIFACTS/basic-memory.env
```

**Secret-rotation runbook**:
1. Rotate `LANGFUSE_SECRET_KEY` in Langfuse UI (`http://127.0.0.1:3000` → Project → API Keys).
2. Update value in `cognee.env`.
3. `docker compose -f docker-compose.cognee-basicmemory.yml restart cognee cognee-mcp`.
4. Verify cognee container can post a test event to Langfuse: `docker compose exec cognee curl -sS -X POST $LANGFUSE_HOST/api/public/ingestion -H "Authorization: Bearer $LANGFUSE_PUBLIC_KEY:$LANGFUSE_SECRET_KEY" -d '{}' | head -c 200`.

---

## §6. Per-service migration runbook (executable, operator-driven)

### 6.1 CogneeMCP migration (NSSM → docker compose)

```powershell
# Pre-flight: confirm Docker Desktop ≥ 4.54 + WSL2 backend on
docker version | Select-String -Pattern "Version:"
wsl -l -v

# Step 1 — stop NSSM CogneeMCP service (Stream-A may have already done this)
nssm stop CogneeMCP        # idempotent; ok if already stopped
nssm status CogneeMCP

# Step 2 — copy + populate cognee.env (FILL IN REAL VALUES)
$artifactDir = "Z:\claude-sota-installed\docs\architecture\W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6\OPERATOR-READY-ARTIFACTS"
Copy-Item "$artifactDir\cognee.env.template" "$artifactDir\cognee.env"
notepad "$artifactDir\cognee.env"   # paste real LANGFUSE_SECRET_KEY + LLM_API_KEY + EMBEDDING_API_BASE

# Step 3 — bring service up
cd $artifactDir
docker compose -f docker-compose.cognee-basicmemory.yml up cognee cognee-mcp -d

# Step 4 — smoke-test (60s timeout)
$deadline = (Get-Date).AddSeconds(60)
do {
  $health = (docker inspect --format='{{.State.Health.Status}}' cognee 2>$null)
  if ($health -eq "healthy") { break }
  Start-Sleep 5
} while ((Get-Date) -lt $deadline)
if ($health -ne "healthy") { Write-Host "ABORT: cognee never reached healthy in 60s. Run rollback." -ForegroundColor Red; exit 1 }

# POST a tiny cognify request to verify end-to-end + Langfuse trace lands
curl.exe -sS -X POST http://127.0.0.1:8766/cognify -H "Content-Type: application/json" -d '{"text":"smoke test 2026-05-19"}'

# Step 5 — verify chunk lands in volume
docker compose -f docker-compose.cognee-basicmemory.yml exec cognee ls -la /app/data
```

### 6.2 CogneeMCP rollback (if step 4 fails)

```powershell
docker compose -f docker-compose.cognee-basicmemory.yml stop cognee cognee-mcp
nssm start CogneeMCP
# Forensics: dump logs
docker compose -f docker-compose.cognee-basicmemory.yml logs cognee --tail 200 > "$artifactDir\cognee-rollback-$(Get-Date -Format yyyyMMdd-HHmm).log"
```

### 6.3 basic-memory migration

Mirrors 6.1, swap `cognee` → `basic-memory`, target port `8767`, env-file `basic-memory.env`.

Key smoke command: `curl.exe -sS http://127.0.0.1:8767/sse -H "Accept: text/event-stream" --max-time 3` → expect `event: endpoint` line (SSE handshake).

---

## §7. Rollback gates (per-service ABORT triggers)

| Trigger | Window | Action |
| --- | --- | --- |
| Container fails to reach `healthy` | 60s | ABORT + `docker compose stop`, restart original NSSM |
| Container reaches `healthy` but smoke-curl 5xx | 30s | ABORT + log dump |
| Container OOM-kill in first 10 min | continuous monitor | ABORT, file Docker Desktop memory-limit bug |
| Langfuse trace not arriving in `/api/public/ingestion` GET | 120s post-smoke | non-fatal warning; check `LANGFUSE_HOST` rewrite |
| memory.db corruption (PRAGMA `integrity_check` fails) | post-restart | ABORT, `docker volume cp basic_memory_data:/app/data/.basic-memory/memory.db` → forensic copy |

---

## §8. Performance budget probe (Docker Desktop Windows CPU overhead)

CogneeMCP and basic-memory are CPU + small-file-I/O bound (NOT GPU). The relevant question is **Docker Desktop Windows CPU + filesystem overhead**.

**Primary-source data points**:

| Source | Measurement | Cite |
| --- | --- | --- |
| InsiderLLM "WSL2 local AI Windows guide" | "Ollama/llama.cpp run at 90-100% of native Linux speed" — meaning **0-10% overhead** | `https://insiderllm.com/guides/wsl2-local-ai-windows-guide/` (re-fetched 2026-05-19 session) |
| InsiderLLM WSL2 vs alternatives table | "5-15% overhead" for general Windows-vs-WSL2 dev workloads | same URL |
| Markaicode AWS T4 vLLM benchmark | "Container overhead | <3%" (GPU-bound vLLM, T4) | `https://markaicode.com/integrate/docker-with-vllm/` |
| MDPI Docker Performance Evaluation | Windows tests show **~8% average performance overhead** across containerized workloads | `https://www.mdpi.com/2076-3417/14/15/6672` (academic study) |
| pythonspeed.com Docker overhead | Confirms Docker virtualization is non-zero on Mac/Windows (Linux VM layer); Linux native = 0% | `https://pythonspeed.com/articles/docker-performance-overhead/` |

**Verdict**: budget **5-10% CPU + filesystem overhead** for CogneeMCP and basic-memory on Docker Desktop WSL2 backend. Likely closer to 3-5% in practice because these services are I/O-bound on the **named volume** (which lives in the Linux VM's ext4, NOT bind-mounted to Windows NTFS — see §3). If we'd bind-mounted memory.db to NTFS via `/mnt/c`, the penalty could spike 10-50× per WSL Issue #6985 `https://github.com/microsoft/WSL/issues/6985`. We're not doing that.

**Re-baseline plan post-migration**: measure CogneeMCP end-to-end `/cognify` latency before (NSSM) and after (docker), expect ≤ 1.10× of baseline. If > 1.25×, investigate (most likely cause: env-var rewrite-miss causing fallback to slower path).

---

## Summary deltagrep — what changed vs upstream

| Upstream | This stream | Reason |
| --- | --- | --- |
| cognee compose binds `.env:/app/.env` | `env_file: ./cognee.env` | Cleaner secret handling; env-file pattern is canonical Compose ≥ v2 |
| cognee compose binds `./cognee:/app/cognee` (source dev mount) | omitted | We're not editing cognee source |
| basic-memory compose uses bind-mount default for `BASIC_MEMORY_HOME` | swapped to named volume `basic_memory_data` | §3 SQLite-on-NTFS penalty avoidance |
| neither upstream wires Langfuse | both wire `LANGFUSE_HOST=http://host.docker.internal:3000` | Endgame-A integration target |
| neither upstream wires IkLlamaServer | cognee wires `LLM_API_BASE=http://host.docker.internal:8080/v1` | Host-resident llama-server is THIS runtime's LLM |

---

## References (every URL re-fetched via ctx_fetch_and_index 2026-05-19)

1. Docker Desktop release notes — `https://docs.docker.com/desktop/release-notes/` (4.54.0 = 2025-12-04, ships vLLM-on-Windows)
2. Docker GPU on Windows — `https://docs.docker.com/desktop/features/gpu/` (WSL2-only, GPU-PV)
3. Docker networking — `https://docs.docker.com/desktop/features/networking/` (Windows backend table)
4. Docker Windows install — `https://docs.docker.com/desktop/setup/install/windows-install/` (Hyper-V vs WSL2)
5. Docker inference engines — `https://docs.docker.com/ai/model-runner/inference-engines/` (vLLM Windows 4.54+)
6. Docker volumes — `https://docs.docker.com/engine/storage/volumes/` (named-volume perf)
7. Docker bind-mounts — `https://docs.docker.com/engine/storage/bind-mounts/`
8. Docker Compose services spec — `https://docs.docker.com/compose/compose-file/05-services/` (`env_file`, `extra_hosts`, `volumes`)
9. Docker Desktop settings — `https://docs.docker.com/desktop/settings/` (file-sharing perf warning)
10. Docker blog vLLM Windows — `https://www.docker.com/blog/docker-model-runner-vllm-windows/` (Dec 11 2025, c22473b + 0.12.0)
11. Cognee upstream Dockerfile — `https://raw.githubusercontent.com/topoteretes/cognee/main/Dockerfile`
12. Cognee upstream compose — `https://raw.githubusercontent.com/topoteretes/cognee/main/docker-compose.yml`
13. Cognee-MCP upstream Dockerfile — `https://raw.githubusercontent.com/topoteretes/cognee/main/cognee-mcp/Dockerfile`
14. Cognee MCP quickstart — `https://docs.cognee.ai/cognee-mcp/mcp-quickstart` (host.docker.internal auto-rewrite)
15. basic-memory upstream Dockerfile — `https://raw.githubusercontent.com/basicmachines-co/basic-memory/main/Dockerfile`
16. basic-memory upstream compose — `https://raw.githubusercontent.com/basicmachines-co/basic-memory/main/docker-compose.yml`
17. Simonw SQLite-WAL-Docker research — `https://simonwillison.net/2026/Apr/7/sqlite-wal-docker-containers/`
18. Codegenes bind-vs-volume benchmark — `https://www.codegenes.net/blog/docker-bind-mount-directory-vs-named-volume-performance-comparison/`
19. WSL NTFS perf issue — `https://github.com/microsoft/WSL/issues/6985`
20. InsiderLLM WSL2 AI guide — `https://insiderllm.com/guides/wsl2-local-ai-windows-guide/`
21. Pythonspeed Docker overhead — `https://pythonspeed.com/articles/docker-performance-overhead/`
22. MDPI Docker Performance Evaluation — `https://www.mdpi.com/2076-3417/14/15/6672`
