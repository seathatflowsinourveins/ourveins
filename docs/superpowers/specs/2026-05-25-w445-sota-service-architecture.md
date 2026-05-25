# W445: SOTA Service Architecture — 3-Tier Hybrid Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Replace NSSM with a modern 3-tier service architecture: Docker Compose (GPU + non-GPU) + Shawl (native) + retire legacy.

**Architecture:** Docker Compose manages containerizable services (GPU via `--gpus all`, non-GPU standard). Shawl (Rust, single binary, `sc.exe`-native) manages native Windows services that need host-level access. 3 legacy services retired.

**Tech Stack:** Docker Desktop 29.4.3 + Compose v5.1.3, Shawl v1.9.0, NVIDIA Container Toolkit (WSL2), RTX 4090 24GB CUDA 13.2.

---

## Research Evidence (3-agent convergence)

### Docker GPU Findings
- `docker run --gpus all nvidia/cuda:12.8.0-base-ubuntu24.04 nvidia-smi` — **verified working** on this machine
- RTX 4090 visible inside containers: 24GB VRAM, CUDA 13.2, driver 595.79
- Performance overhead: **1-2% throughput loss** for LLM inference (negligible)
- VRAM shared between containers and native processes (no per-container limits)
- Official Docker images exist: `ollama/ollama`, `ghcr.io/mostlygeek/llama-swap:unified-cuda`, `cognee/cognee`

### Shawl vs WinSW vs Servy Findings
- **Servy 8.4**: DPAPI `DataProtectionScope` mismatch — GUI-generated keys unreadable by CLI. Known architecture limitation, not a bug fix candidate. **REJECTED for CLI-based management.**
- **Shawl v1.9.0** (MIT, Rust, 843★): Single binary, works WITH `sc.exe`, `--env KEY=value`, `--kill-process-tree`, built-in log rotation. **SELECTED as NSSM successor.**
- **WinSW v2.12.0** (MIT, .NET, 12.9k★): Proven but XML-heavy, v3 stuck in alpha since 2021.
- **PM2**: Abandoned on Windows (`pm2-windows-service` unmaintained). **ELIMINATED.**
- **Podman**: GPU on Windows **not available** (issue #19005 open). **ELIMINATED.**

### NSSM Assessment
- Last release: 2017 (unmaintained for 9 years)
- Currently works for all 12 services
- No health-check endpoints, no log rotation, no env var management
- **Verdict**: functional but technical debt; migrate to Shawl for native services

## 3-Tier Architecture

### Tier 1: Docker Compose (GPU services)

| Service | Current | Container | Port | Image |
|---|---|---|---|---|
| OllamaServe | NSSM (:16700) | `ollama` | 16700:11434 | `ollama/ollama:latest` |
| LlamaSwap + IkLlamaServer | 2× NSSM (:8090 + :8080) | `llama-swap` | 8090:8080 | `ghcr.io/mostlygeek/llama-swap:unified-cuda` |

**Key insight**: LlamaSwap `unified-cuda` image **replaces 2 NSSM services with 1 container** — it bundles the Go proxy + llama-server + CUDA runtime. Model swapping manages VRAM contention.

GPU device config (Docker Compose v2 syntax):
```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

### Tier 2: Docker Compose (non-GPU services)

| Service | Current | Container | Port |
|---|---|---|---|
| CogneeMCP | NSSM (:8000) | `cognee` | 8000:8000 |
| BasicMemoryHTTP | NSSM (:8765) | `basic-memory` | 8765:8765 |
| EEE-CacheFixProxy | NSSM (:19801) | `eee-proxy` | 19801:19801 |
| ALW Daemon | New | `alw-daemon` | 9090:9090 |
| Langfuse stack | Already Docker | Keep as-is | 3000 |

### Tier 3: Shawl (native Windows services)

| Service | Reason for native | Port |
|---|---|---|
| NvidiaGpuExporter | Needs direct host GPU metrics (`nvidia-smi`) | 9835 |
| EEE-CLIProxyAPI | Native .exe, host filesystem | — |
| CLIProxyAccountExporter | Python with host-level integrations | 9321 |

Shawl service creation pattern:
```powershell
sc.exe create <Name> binPath= "shawl.exe run --name <Name> --env KEY=VAL --kill-process-tree --log-dir C:\logs\<name> --log-rotate size --log-retain 5 -- <exe> <args>"
sc.exe failure <Name> reset= 86400 actions= restart/5000/restart/10000/restart/30000
sc.exe start <Name>
```

### Retire (Phase 0)

| Service | Status | Action |
|---|---|---|
| CCC-Exporter | Paused (legacy) | `nssm remove CCC-Exporter confirm` |
| CCC-Proxy | Paused (legacy) | `nssm remove CCC-Proxy confirm` |
| IkEmbedServer | Stopped (unused) | `nssm remove IkEmbedServer confirm` |

## Migration Sequence

1. **Phase 0 — Retire**: Remove 3 legacy NSSM services (safe — already stopped/paused)
2. **Phase 1 — Docker GPU**: Containerize OllamaServe + LlamaSwap (biggest win: 3 NSSM → 2 containers)
3. **Phase 2 — Docker non-GPU**: Containerize CogneeMCP + BasicMemoryHTTP + EEE-CacheFixProxy
4. **Phase 3 — Shawl native**: Migrate NvidiaGpuExporter + EEE-CLIProxyAPI + CLIProxyAccountExporter from NSSM → Shawl
5. **Phase 4 — Verify**: Port checks, health endpoints, VRAM utilization, log rotation

## docker-compose.services.yml (Tier 1 + Tier 2)

```yaml
services:
  # ── GPU services (Tier 1) ─────────────────────────
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "16700:11434"
    volumes:
      - ollama-models:/root/.ollama
    environment:
      OLLAMA_HOST: "0.0.0.0:11434"
      OLLAMA_KEEP_ALIVE: "30m"
      OLLAMA_MAX_LOADED_MODELS: "2"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "curl -sf http://localhost:11434/api/tags || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3

  llama-swap:
    image: ghcr.io/mostlygeek/llama-swap:unified-cuda
    container_name: llama-swap
    ports:
      - "8090:8080"
    volumes:
      - Z:/tools/llama-swap/config.yaml:/config.yaml:ro
      - Z:/ollama/models:/models:ro
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    restart: unless-stopped

  # ── Non-GPU services (Tier 2) ─────────────────────
  cognee:
    image: cognee/cognee:latest
    container_name: cognee-mcp
    ports:
      - "8000:8000"
    environment:
      OPENAI_API_KEY: "${OPENAI_API_KEY:-local}"
      OPENAI_BASE_URL: "http://host.docker.internal:16700/v1"
      LLM_MODEL: "qwen3-coder:30b-a3b-q4_K_M"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "curl -sf http://localhost:8000/mcp || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3

  alw-daemon:
    build:
      context: .
      dockerfile: tools/alw/Dockerfile
    container_name: alw-daemon
    ports:
      - "9090:9090"
    environment:
      ALW_TICK_INTERVAL_MS: "21600000"
      ALW_HEALTH_PORT: "9090"
      PERPLEXITY_API_KEY: "${PERPLEXITY_API_KEY}"
      EXA_API_KEY: "${EXA_API_KEY}"
      FIRECRAWL_API_KEY: "${FIRECRAWL_API_KEY}"
      TAVILY_API_KEY: "${TAVILY_API_KEY}"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "node -e \"fetch('http://localhost:9090/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\""]
      interval: 30s
      timeout: 5s
      retries: 3

volumes:
  ollama-models:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: Z:/ollama/models
```

## Monitoring

- **Docker healthchecks**: built-in per service (curl/node health endpoints)
- **NvidiaGpuExporter** (Shawl-managed): Prometheus metrics at :9835
- **`docker compose ps`**: service status at a glance
- **`sc.exe query <Name>`**: Shawl service status
- **ALW health**: `curl http://localhost:9090/health`

## Cite Anchors (≥3 distinct orgs)

1. **Docker Inc**: https://docs.docker.com/compose/how-tos/gpu-support/ (Compose GPU syntax)
2. **NVIDIA**: https://docs.nvidia.com/cuda/wsl-user-guide/ (WSL2 CUDA) + https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
3. **mtkennerly (Shawl)**: https://github.com/mtkennerly/shawl (MIT, Rust service wrapper)
4. **Ollama**: https://docs.ollama.com/docker (official Docker deployment)
5. **mostlygeek (LlamaSwap)**: https://github.com/mostlygeek/llama-swap (unified-cuda image)

Wave: W445
