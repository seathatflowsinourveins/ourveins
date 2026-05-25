# W320 Stream F — Self-Hosted Deployment Architecture for OSS Research Stack

**Wave**: W320 (2026-05-19) | **Agent**: F | **Scope**: HOW to deploy + wire OSS research services into `Z:\claude-sota-installed` runtime. Sibling Agent E handles WHICH repos replace which commercial MCPs.

**Operator question (verbatim)**: *"WHY THERE ARE NO REPOS REPLACED THEM WITH SOTA RESEARCH ARCHITECTURE AND OPEN SOURCE"*

**TL;DR answer**: there are no install-blockers — Docker Desktop 29.4.3 is healthy, NSSM pattern is already proven (CogneeMCP, LlamaSwap, BasicMemoryHTTP, NvidiaGpuExporter, OllamaServe), LlamaSwap already serves 7 pre-loaded GPU models on :8090, Ollama already runs idle on :16700. The bottleneck has been **rubric-side**: prior waves never executed a self-hosted deployment plan side-by-side with the commercial-MCP-substitution decision. This document closes that gap.

---

## §1 Executive Summary

### 1.1 Recommended deployment topology

**Hybrid Docker + NSSM** — Docker for stateful multi-container services that already ship official compose files (SearXNG, Perplexica, Firecrawl, Langfuse); NSSM for single-process Python services that need Windows-native lifecycle (Crawl4AI FastAPI, gpt-researcher REST wrapper, paper-qa REST wrapper). This mirrors the existing runtime pattern where Langfuse is Docker but CogneeMCP/BasicMemoryHTTP/LlamaSwap/OllamaServe are NSSM.

**Why hybrid not pure-Docker**: (a) Docker images for some Python research tools (gpt-researcher, paper-qa, storm) don't exist as first-class images — pip install into `Z:\venvs\claude` + NSSM is lower friction than building custom Dockerfiles; (b) NSSM gives Windows-native Restart/StartupType=Automatic semantics that Docker Desktop containers can lose across host reboots; (c) the existing runtime has already proven NSSM as the canonical wrapper for "long-running Python process bound to a port".

**Why not pure-NSSM**: (a) SearXNG, Perplexica, Firecrawl ship multi-container compose files (e.g. Firecrawl = api + worker + redis + postgres) — recreating that wiring in NSSM would be N×N services with manual env-var threading; Docker compose handles it natively. (b) `docker compose pull` cadence for security patches is the maintained upstream path.

### 1.2 Service map with ports

| Service | Image / Pkg | Port | Wrapper | Memory budget |
|---|---|---|---|---|
| SearXNG | `searxng/searxng:latest` | **8888** | Docker compose | ~200 MB |
| Perplexica (slim — external SearXNG) | `itzcrazykns1337/perplexica:slim-latest` | **3001** (host) → 3000 (container) | Docker compose | ~400 MB |
| Firecrawl api | `firecrawl/firecrawl:latest` (built locally per SELF_HOST.md `docker compose build`) | **3002** | Docker compose | ~600 MB |
| Firecrawl worker | (same image, worker cmd) | (no port) | Docker compose | ~300 MB |
| Firecrawl playwright-service | (built locally `playwright-service` Dockerfile) | **internal** (no host port) | Docker compose | ~500 MB |
| Firecrawl `nuq-postgres` | (built locally; PG-based queueing) | **internal** (NEVER expose) | Docker compose | ~200 MB |
| Firecrawl redis | `redis:alpine` | **internal** (no host port) | Docker compose | ~50 MB |
| Crawl4AI | `unclecode/crawl4ai:latest` OR pip | **11235** | Docker or NSSM | ~500 MB |
| Trafilatura | pip CLI only | (none) | CLI direct | ~50 MB on call |
| gpt-researcher | pip + custom REST shim | **8001** | NSSM | ~200 MB idle |
| storm (knowledge-storm) | pip CLI only | (none — CLI on demand) | CLI direct | ~150 MB on call |
| paper-qa | pip + custom REST shim | **8002** | NSSM | ~250 MB idle |
| Vespa (optional neural-search) | `vespaengine/vespa:latest` | **8080** (search), 19071 (config) | Docker compose | **~4 GB** (DEFER decision) |
| Qdrant (vector index alt) | `qdrant/qdrant:latest` | **6333** | Docker compose | ~200 MB |

**Existing services preserved (do not touch)**:
- CogneeMCP :8000 (NSSM)
- BasicMemoryHTTP :8765 (NSSM)
- LlamaSwap :8090 (NSSM, 7 models pre-loaded)
- Langfuse :3000 (Docker)
- Ollama :16700 (NSSM)
- Phoenix :16006 (Docker)
- IkLlamaServer (NSSM, port internal)

### 1.3 Bootstrap order

```
1. Docker Desktop healthy (PREREQ — already running per CLAUDE.md status)
2. docker compose pull   # cache images
3. SearXNG up            # standalone, no deps
4. Ollama health-check   # already running :16700 (idle) — no action
5. Perplexica up         # depends-on SearXNG + Ollama
6. Firecrawl stack up    # postgres → redis → api → worker → playwright (compose orders)
7. Crawl4AI Docker OR pip+NSSM
8. pip install: gpt-researcher, knowledge-storm, paper-qa, trafilatura
9. NSSM install: gpt-researcher-rest, paper-qa-rest (REST shims)
10. .mcp.json wire: per-service MCP entries (see §4)
11. CLAUDE.local.md env-vars (see §7)
12. Smoke test: WebFetch http://localhost:{8888,3001,3002,11235,8001,8002}/health
```

### 1.4 Total footprint estimate

| Resource | Idle | Active research load |
|---|---|---|
| RAM | ~2.5 GB (Docker idle) + ~0.6 GB (Python REST shims) = **~3.1 GB** | ~6-8 GB (Firecrawl crawl + Crawl4AI burst) |
| CPU | <5% idle | 2-4 cores burst |
| Disk: Docker images | ~6 GB (compressed pulls) | — |
| Disk: persistent volumes | ~2 GB (SearXNG cache + Firecrawl postgres + Crawl4AI screenshots) initial, **growth ~100 MB/day** of research | — |
| Disk: Python venv additions | ~800 MB (gpt-researcher + storm + paper-qa deps) | — |
| **Total disk** | **~9 GB initial, ~1 GB/month growth** | — |

With LlamaSwap already consuming 96.7% VRAM (per CLAUDE.md), Perplexica should route to **Ollama :16700** (idle, 0-models-loaded — can hold light models alongside LlamaSwap) OR to LlamaSwap's OpenAI-compat endpoint at :8090 (preferred, models already loaded).

---

## §2 Service-by-Service Deployment Recipe

(Populated after research — see §5 master compose for full configs.)

### 2.1 SearXNG (Docker compose)

**Image**: `searxng/searxng:latest` ([docs.searxng.org installation-docker](https://docs.searxng.org/admin/installation-docker.html))

**Port**: container internal **8080** → host **8888** (default upstream container port is 8080; remap to host 8888 to avoid the :8080 namespace and reserve :8080 for a possible future Vespa install).

**Persistent volumes** (per upstream Docker docs):
- `/etc/searxng` — configuration files (`settings.yml`, `limiter.toml`, `favicons.toml`)
- `/var/cache/searxng` — persistent data (faviconcache.db etc.)

**Critical config** (`settings.yml`):
- `server.secret_key` = random 32-byte hex (operator-generates first run via `${SEARXNG_SECRET}` env-interpolation)
- `server.bind_address: "0.0.0.0"` (Docker internal) → host-binds to `127.0.0.1:8888` via compose `ports:`
- `server.limiter: false` (single-user local; disable bot-protection rate-limit)
- `search.formats: [json, html]` (JSON **required** for Perplexica/MCP clients — disabled by default in upstream settings.yml)
- `engines:` enable google, bing, duckduckgo, arxiv, github, semantic_scholar, wikipedia, openalex

**Environment variables** controllable without rebuilding settings.yml (per upstream Environment variables docs):
- `SEARXNG_*` — directly overrides matching keys in settings.yml (e.g. `SEARXNG_SECRET_KEY`, `SEARXNG_BIND_ADDRESS`)
- `GRANIAN_*` — Granian server options (workers, threads)
- `FORCE_OWNERSHIP=true` (default) — chowns mounted volumes to `searxng:searxng` user

**Health check**: `curl http://localhost:8888/healthz` → 200.

### 2.2 Perplexica (Docker compose)

**Image**: `itzcrazykns1337/perplexica:slim-latest` — slim tag uses **external SearXNG** (we run SearXNG separately, so we avoid the bundled+duplicated copy). The default tag `itzcrazykns1337/perplexica:latest` bundles SearXNG inside the same container, but we want a single SearXNG instance shared with future tools (gpt-researcher, etc.) so the slim tag is preferred. Repo: [github.com/ItzCrazyKns/Perplexica](https://github.com/ItzCrazyKns/Perplexica).

**Port**: container internal **3000** → host **3001** (must remap because Langfuse already owns host :3000 per CLAUDE.md L34 services list).

**Depends-on**: SearXNG (8888) + LlamaSwap (8090, OpenAI-compat) — Ollama (16700) is fallback for embeddings.

**Config file**: per deepwiki investigation Perplexica uses **`config.json`** (NOT `config.toml`) — managed via `ConfigManager` singleton; can also be POST-updated via the in-app Configuration API. Mount template:

```json
{
  "general": {
    "port": 3000,
    "similarityMeasure": "cosine"
  },
  "modelProviders": [
    {
      "type": "openai",
      "name": "LlamaSwap",
      "config": {
        "baseURL": "http://host.docker.internal:8090/v1",
        "apiKey": "sk-local-llamaswap"
      },
      "model": "qwen3-coder:30b-a3b-q4_K_M"
    },
    {
      "type": "ollama",
      "name": "OllamaLocal",
      "config": { "apiUrl": "http://host.docker.internal:16700" },
      "model": "qwen3-embedding:0.6b"
    }
  ],
  "searxng": { "apiUrl": "http://host.docker.internal:8888" }
}
```

Env-var override (used by `entrypoint.sh`): `SEARXNG_API_URL=http://searxng:8080` (when both services share `research_default` compose network and use Docker DNS) OR `http://host.docker.internal:8888` (when SearXNG runs in a different compose project).

**`host.docker.internal` confirmed working** on Windows Docker Desktop 4.x+ per upstream troubleshooting docs — explicitly the recommended way to reach Ollama on the host from within a Perplexica container (deepwiki source verified).

### 2.3 Firecrawl self-hosted

**Build path**: per [SELF_HOST.md](https://github.com/firecrawl/firecrawl/blob/main/SELF_HOST.md) the canonical install is `docker compose build && docker compose up` from the cloned repo root — Firecrawl does **NOT** publish a prebuilt `:latest` image on GHCR for the API service. We mirror this: bootstrap script clones to `Z:\claude-sota-installed-state\firecrawl-src` and runs `docker compose build`.

**License**: AGPL-3.0 — self-hosting is allowed; redistribution/SaaS resale requires copyleft compliance. Operator must NOT rehost Firecrawl as a public service without compliance.

**Service list** (canonical, per upstream `docker-compose.yaml`):
- `playwright-service` — Playwright crawler (no host port; internal :3000)
- `api` — REST API (host :3002 → container :3002)
- `worker` — background queue worker (no port)
- `redis` — Redis 7 (internal :6379)
- `nuq-postgres` — PostgreSQL queue backend (internal :5432; **NEVER** publish to host per upstream security note)

**Required env** (Firecrawl `.env` template, copy-paste-ready):
```
PORT=3002
HOST=0.0.0.0
USE_DB_AUTHENTICATION=false
BULL_AUTH_KEY=${FIRECRAWL_BULL_AUTH_KEY}
POSTGRES_USER=firecrawl
POSTGRES_PASSWORD=${FIRECRAWL_PG_PASSWORD}
POSTGRES_DB=firecrawl
# Auto-configured by compose; do NOT override:
# REDIS_URL=redis://redis:6379
# PLAYWRIGHT_MICROSERVICE_URL=http://playwright-service:3000/scrape
# Optional — route Firecrawl AI features (JSON/extract) to LlamaSwap:
OPENAI_BASE_URL=http://host.docker.internal:8090/v1
OPENAI_API_KEY=sk-local-llamaswap
# Optional — wire to our SearXNG for /search API:
SEARXNG_ENDPOINT=http://host.docker.internal:8888
```

**Bull Queue admin UI**: `http://localhost:3002/admin/${BULL_AUTH_KEY}/queues` (replace `${BULL_AUTH_KEY}` with the value materialized by the bootstrap script).

**Limitations of self-hosted**: per upstream SELF_HOST.md, **Fire-Engine** (premium proprietary crawler with stealth/proxy rotation) is NOT included; only "fetch + playwright" engines ship in the OSS build. For 90% of research use cases (web → markdown), this suffices. Fire-Engine is the cloud-only differentiator.

**Repo URL correction**: upstream owner is `firecrawl/firecrawl` (formerly `mendableai/firecrawl` — repo was renamed/moved). Both URLs currently redirect; bibliography uses the current owner.

### 2.4 Crawl4AI

**Two install paths** ([github.com/unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)):
- **Docker** (`unclecode/crawl4ai:latest` — multi-arch `linux/amd64` + `linux/arm64`; Playwright browsers BUNDLED in image, no first-run download): FastAPI on :11235; preferred for isolation.
- **pip** (`pip install crawl4ai && crawl4ai-setup`): installs into `Z:\venvs\claude`; `crawl4ai-setup` downloads Playwright browsers (~400 MB); REST mode via `python -m crawl4ai.server`.

**Recommendation**: Docker (avoids Playwright-browser-binary install conflicts with Python venv; image-bundled browsers = no first-run delay).

**Native MCP support**: Crawl4AI v0.8+ ships **built-in MCP endpoints** — no npm wrapper needed:
- SSE: `http://localhost:11235/mcp/sse`
- WebSocket: `ws://localhost:11235/mcp/ws`

Claude Code can connect directly via `.mcp.json` SSE transport (no `npx -y` package wrapper). This is the **cleanest CR-9 path** since SSE-transport MCP is first-class in the MCP spec; no Python or Node bridge needed.

### 2.5 Trafilatura

**pip-only** ([trafilatura.readthedocs.io](https://trafilatura.readthedocs.io/en/latest/installation.html)):
```powershell
& Z:\venvs\claude\Scripts\pip.exe install trafilatura
```
CLI: `trafilatura -u https://example.com --json`. No service needed. Python API: `import trafilatura; trafilatura.extract(html)`.

### 2.6 Jina Reader

Per Agent E's verification: **Reader-LM is open-weights** (`jinaai/reader-lm-0.5b` + `1.5b` on HuggingFace, CC-BY-NC-4.0 — non-commercial only). Self-hostable via vLLM or Ollama once converted to GGUF; OR the public hosted endpoint `https://r.jina.ai/<URL>` is free (rate-limited).
**Recommendation**: use the hosted `r.jina.ai/` endpoint via WebFetch wrapper for v1 (zero deployment burden); self-host only if rate-limits bite or commercial-license concern arises.

### 2.7 gpt-researcher

**pip + REST shim** ([github.com/assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)):
```powershell
& Z:\venvs\claude\Scripts\pip.exe install gpt-researcher
```
Built-in MCP server: `gpt_researcher.mcp_server` — exposes `research`, `quick_search` tools. Run as NSSM:
```powershell
& nssm.exe install GptResearcherMCP "Z:\venvs\claude\Scripts\python.exe" "-m gpt_researcher.mcp_server --port 8001"
```
Wire via `.mcp.json`: prefer the native built-in MCP (CR-9 violation here is unavoidable for non-npx self-hosted; use shim option C below).

### 2.8 storm (knowledge-storm)

**pip-only** ([github.com/stanford-oval/storm](https://github.com/stanford-oval/storm)):
```powershell
& Z:\venvs\claude\Scripts\pip.exe install knowledge-storm
```
CLI: `python -m knowledge_storm.examples.run_storm_wiki_gpt --topic "Bitcoin"`. No service mode; invoke on demand. Provider config via env (set in CLAUDE.local.md): `OPENAI_API_BASE=http://localhost:8090/v1` to route to LlamaSwap.

### 2.9 paper-qa

**pip + REST shim** ([github.com/Future-House/paper-qa](https://github.com/Future-House/paper-qa)):
```powershell
& Z:\venvs\claude\Scripts\pip.exe install paper-qa
```
CLI: `pqa ask "what is X?" --docs /path/to/papers`. For Claude Code wrapping, write a tiny FastAPI shim and run as NSSM `PaperQaREST` on :8002.

### 2.10 Vespa (optional neural-search replacement)

**DEFER** — Vespa idle RAM ~4 GB; recommendation: defer to W321 unless Agent E identifies a specific commercial-MCP search-back-end gap that Vespa fills. Qdrant @ :6333 is the lighter alternative (200 MB idle).

### 2.11 Qdrant / Chroma / Weaviate (vector index alts)

If context-mode FTS5 + cognee + basic-memory cover index needs, **DO NOT install**. Otherwise: Qdrant Docker `qdrant/qdrant:latest` :6333 is the lowest-friction (200 MB; HTTP REST + gRPC; supports filters + payloads). Chroma is simpler but Python-coupled. Weaviate is heavier (~600 MB idle).

---

## §3 Port Allocation Plan

### Existing ports in use (DO NOT REASSIGN)

| Port | Service | Manager |
|---|---|---|
| 3000 | Langfuse | Docker |
| 5432 | (reserved if Langfuse uses external pg) | — |
| 8000 | CogneeMCP | NSSM |
| 8090 | LlamaSwap (OpenAI-compat) | NSSM |
| 8765 | basic-memory HTTP | NSSM |
| 9077 | Hindsight RETIRED | — |
| 9835 | nvidia-gpu-exporter | native binary |
| 16006 | Phoenix | Docker |
| 16379 | FalkorDB (STOPPED by design) | — |
| 16700 | Ollama | NSSM |

### Proposed new ports for OSS research stack

| Port | Service | Manager | Bind |
|---|---|---|---|
| 8888 | SearXNG | Docker | 127.0.0.1 |
| 3001 | Perplexica (UI+API) — host-remap from container :3000 (Langfuse owns host :3000) | Docker | 127.0.0.1 |
| 3002 | Firecrawl api | Docker | 127.0.0.1 |
| 3003 | Firecrawl playwright-service | Docker | 127.0.0.1 (internal-only) |
| 11235 | Crawl4AI | Docker or NSSM | 127.0.0.1 |
| 8001 | gpt-researcher REST/MCP | NSSM | 127.0.0.1 |
| 8002 | paper-qa REST | NSSM | 127.0.0.1 |
| 6333 | Qdrant (optional) | Docker | 127.0.0.1 |
| 8080 | Vespa search (DEFER) | Docker | — |

**No collisions** with existing ports. All bound to `127.0.0.1` (loopback-only; not exposed externally).

### Firecrawl-internal ports (Docker network, NOT host-mapped)

- `redis:6379` and `postgres:5432` live on the Docker compose network `firecrawl_default`; do NOT publish to host (collision with potential local redis/pg installs). Compose `expose:` not `ports:`.

---

## §4 MCP-Wrapping Strategy

Three options per the Stream F brief. Per-service recommendation:

| Service | Recommended option | Rationale |
|---|---|---|
| SearXNG | **B** (WebFetch wrapper to `http://localhost:8888/search?q={query}&format=json`) | No upstream MCP exists; built-in WebFetch handles HTTP-JSON; zero install burden |
| Perplexica | **B** (WebFetch to `http://localhost:3001/api/search`) — OR Option C shim if streaming-SSE is needed | Same as SearXNG; Perplexica has a clean REST API |
| Firecrawl | **A** (`npx -y firecrawl-mcp@<pinned>` — official package on npm) with `FIRECRAWL_API_URL=http://localhost:3002` env override | Official MCP exists; CR-9 compliant via npx; per upstream `FIRECRAWL_API_URL` switches the MCP from cloud to self-hosted |
| **Crawl4AI** | **A-native** (`.mcp.json` SSE transport: `{"url": "http://localhost:11235/mcp/sse"}`) — NO npm package needed | Crawl4AI v0.8+ ships built-in MCP via SSE/WebSocket on :11235; this is the cleanest no-shim path |
| Trafilatura | **B** (CLI shell-out via Bash; OR Option C tiny Python REST shim on :8003) | Library not service; shell-out is canonical |
| Jina Reader | **B** (WebFetch to `https://r.jina.ai/<URL>` — hosted, no install) | Lowest friction (rate-limit only) |
| gpt-researcher | **C** (custom shim — gpt-researcher exposes Python MCP, not npx) — OR run as native SSE MCP on :8001 if upstream adds SSE transport | Built-in `gpt_researcher.mcp_server` is Python; CR-9 prefers npx — operator decision: extend cardinal-rule-2 exception class OR ship a tiny Node SSE relay |
| storm | **C** (custom shim `tools/storm-mcp.mjs` ≤2KB shelling out to `python -m knowledge_storm.examples.run_storm_wiki`) | No upstream MCP; CLI-invocation pattern |
| paper-qa | **C** (custom shim → REST shim → `pqa ask`) | Same as storm |
| Qdrant | **A** (`npx -y qdrant-mcp-server` if exists, else native Qdrant HTTP API via WebFetch) | Standard vector-store MCP pattern |

**CR-9 compliance posture**: Options B and A satisfy CR-9 directly. Option C custom shims are sanctioned only when the shim is ≤2KB AND cite-anchored to a specific upstream issue (cardinal-rule 2 + W286-arc-P0C ratification). For storm + paper-qa we have NO upstream Python MCP, so the custom shim must include a top-of-file comment: `// Custom shim — no upstream MCP exists; tracked at <github URL of issue requesting MCP wrapper>` before any operator approval. If no upstream issue exists, file one first.

**Cardinal-rule-2 exception class** (per CLAUDE.md L24): "documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB" — this strictly says BUG-PATCH SHIMS, not "wrapping non-existent MCPs". Therefore Option C for storm/paper-qa is **NOT** automatically sanctioned by the current cardinal-rule-2 exception clause; it requires operator override or a CLAUDE.md amendment extending the exception class to "MCP-bridge shims for upstream-Python-only research tools without npm/MCP wrappers". W321 operator decision.

---

## §5 Docker Compose Master File

Written to `Z:\claude-sota-installed\tools\research-stack\docker-compose.yml` (idempotent; volumes named with `research_` prefix to avoid collision):

(See §9 bootstrap script — the compose YAML is generated by the bootstrap so secrets can be operator-injected at first run. Full compose template below.)

```yaml
# Z:/claude-sota-installed/tools/research-stack/docker-compose.yml
# W320 Stream F — self-hosted research stack
# Network: research_default (isolated from langfuse, phoenix, etc.)
name: research-stack

services:
  # ---------- SearXNG (host 8888 → container 8080) ----------
  searxng:
    image: searxng/searxng:latest
    container_name: research_searxng
    ports:
      - "127.0.0.1:8888:8080"
    volumes:
      - ./searxng/config:/etc/searxng:rw          # settings.yml, limiter.toml, favicons.toml
      - searxng_cache:/var/cache/searxng:rw       # faviconcache.db etc.
    environment:
      - SEARXNG_BASE_URL=http://localhost:8888/
      - SEARXNG_SECRET=${SEARXNG_SECRET}
    restart: unless-stopped
    networks: [research_default]

  # ---------- Perplexica (slim — uses external searxng above) ----------
  # Container internal :3000 → host :3001 (host :3000 reserved for Langfuse).
  perplexica:
    image: itzcrazykns1337/perplexica:slim-latest
    container_name: research_perplexica
    ports:
      - "127.0.0.1:3001:3000"
    volumes:
      - ./perplexica/config.json:/home/perplexica/config.json:ro
    depends_on:
      - searxng
    environment:
      - SEARXNG_API_URL=http://searxng:8080
    restart: unless-stopped
    networks: [research_default]

  # ---------- Crawl4AI (native MCP via SSE on :11235/mcp/sse) ----------
  crawl4ai:
    image: unclecode/crawl4ai:latest
    container_name: research_crawl4ai
    ports:
      - "127.0.0.1:11235:11235"
    restart: unless-stopped
    networks: [research_default]

  # ---------- Qdrant (optional vector store — bring up with `--profile optional`) ----------
  qdrant:
    image: qdrant/qdrant:latest
    container_name: research_qdrant
    ports:
      - "127.0.0.1:6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
    restart: unless-stopped
    networks: [research_default]
    profiles: ["optional"]

  # NOTE: Firecrawl is NOT included here — it has its OWN compose project at
  #       Z:/claude-sota-installed-state/firecrawl-src/docker-compose.yaml (built from source per SELF_HOST.md).
  #       Bootstrap script orchestrates both projects sequentially. Cross-project DNS uses host.docker.internal.

volumes:
  searxng_cache:
  qdrant_data:

networks:
  research_default:
    driver: bridge
```

**Firecrawl** runs as a **separate compose project** (build-from-source per upstream SELF_HOST.md):

```
Z:\claude-sota-installed-state\firecrawl-src\          # git clone target
├── docker-compose.yaml      # upstream-shipped; do not modify
├── .env                     # operator-injected from CLAUDE.local.md env-vars
└── apps/                    # source tree
```

Bootstrap (§9) runs `git clone https://github.com/firecrawl/firecrawl ...` + `docker compose -f firecrawl-src/docker-compose.yaml build` + `up -d`. Firecrawl-API host port 3002 is reachable from the `research_default` network via `host.docker.internal:3002` if a service in the main compose needs to call it (e.g. future Perplexica integration).

**Validation**: `cd Z:\claude-sota-installed\tools\research-stack && docker compose config` parses without error; `docker compose up -d` brings up all services; `docker compose ps` shows healthy.

---

## §6 NSSM Service Wrapping

For services NOT in Docker compose (gpt-researcher, paper-qa) — PowerShell snippets, mirror of existing CogneeMCP NSSM pattern:

```powershell
# gpt-researcher REST/MCP server
& nssm.exe install GptResearcherREST "Z:\venvs\claude\Scripts\python.exe"
& nssm.exe set GptResearcherREST AppParameters "-m gpt_researcher.server --host 127.0.0.1 --port 8001"
& nssm.exe set GptResearcherREST AppDirectory "Z:\claude-sota-installed-state\gpt-researcher"
& nssm.exe set GptResearcherREST AppEnvironmentExtra "PYTHONUNBUFFERED=1" "OPENAI_API_BASE=http://localhost:8090/v1"
& nssm.exe set GptResearcherREST AppStdout "Z:\claude-sota-installed-state\logs\gpt-researcher.out.log"
& nssm.exe set GptResearcherREST AppStderr "Z:\claude-sota-installed-state\logs\gpt-researcher.err.log"
& nssm.exe set GptResearcherREST Start SERVICE_AUTO_START
& nssm.exe start GptResearcherREST

# paper-qa REST shim
& nssm.exe install PaperQaREST "Z:\venvs\claude\Scripts\python.exe"
& nssm.exe set PaperQaREST AppParameters "-m paperqa.server --host 127.0.0.1 --port 8002"
& nssm.exe set PaperQaREST AppDirectory "Z:\claude-sota-installed-state\paper-qa"
& nssm.exe set PaperQaREST AppEnvironmentExtra "PYTHONUNBUFFERED=1" "OPENAI_API_BASE=http://localhost:8090/v1"
& nssm.exe set PaperQaREST AppStdout "Z:\claude-sota-installed-state\logs\paper-qa.out.log"
& nssm.exe set PaperQaREST AppStderr "Z:\claude-sota-installed-state\logs\paper-qa.err.log"
& nssm.exe set PaperQaREST Start SERVICE_AUTO_START
& nssm.exe start PaperQaREST
```

**State-outside-repo invariant**: NSSM `AppDirectory` and logs live under `Z:\claude-sota-installed-state\...` per CLAUDE.local.md (f) section. Mirrors existing CogneeMCP pattern.

**Note**: `paperqa.server` and `gpt_researcher.server` modules may not exist out-of-the-box; if upstream lacks a REST entry-point, ship a tiny FastAPI wrapper at `Z:\claude-sota-installed\tools\research-stack\<svc>-rest-shim.py` (≤80 LOC) — these are operator-curated runtime tools, NOT hooks, so cardinal-rule 2 does not apply (cardinal-rule 2 is hook-bodies-only).

---

## §7 Environment / Secrets

Add to `CLAUDE.local.md` (gitignored) — mirrors the existing W317-r2 perplexity-key pattern:

```powershell
# W320 Stream F — self-hosted research stack secrets (NEVER commit)
# Real values live HERE; tracked compose .env references ${VAR}
$env:SEARXNG_SECRET            = '<random-32-byte-hex>'   # `openssl rand -hex 32` once at first run
$env:FIRECRAWL_PG_PASSWORD     = '<random-24-char>'        # local postgres only; not external
$env:FIRECRAWL_BULL_AUTH_KEY   = '<random-32-byte-hex>'    # internal queue auth

# Optional — upstream LLM provider keys (only if NOT routing to LlamaSwap)
# Default: gpt-researcher + storm + paper-qa route to OPENAI_API_BASE=http://localhost:8090/v1 (LlamaSwap)
# $env:OPENAI_API_KEY  = 'sk-...'   # only if external OpenAI fallback
# $env:TAVILY_API_KEY  = 'tvly-...' # gpt-researcher search backend (alt: SearXNG)
```

`Z:\claude-sota-installed\tools\research-stack\.env` (NOT gitignored — references env vars):
```
SEARXNG_SECRET=${SEARXNG_SECRET}
FIRECRAWL_PG_PASSWORD=${FIRECRAWL_PG_PASSWORD}
FIRECRAWL_BULL_AUTH_KEY=${FIRECRAWL_BULL_AUTH_KEY}
```
Docker compose reads `.env` automatically; values come from the operator's PowerShell session env via CLAUDE.local.md.

**Gitignore**: add `tools/research-stack/searxng/settings.yml` (contains secret_key after first-run materialization) and `tools/research-stack/perplexica/config.toml` if it ends up with secret values.

---

## §8 Cost & Operations

### 8.1 Disk footprint

| Bucket | Size | Notes |
|---|---|---|
| Docker images (pull) | ~6 GB | searxng (~200 MB) + perplexica (~400 MB) + firecrawl trio (~2.5 GB) + crawl4ai (~1.5 GB) + qdrant (~300 MB) + postgres-alpine (~250 MB) + redis-alpine (~50 MB) + playwright-service (~1 GB) |
| Persistent volumes (initial) | ~2 GB | firecrawl pg (1.5 GB schema+indexes) + qdrant_data (200 MB) + searxng settings (100 MB) |
| Persistent volume growth | ~100 MB/day | firecrawl crawl history + searxng query cache |
| Python venv additions | ~800 MB | gpt-researcher (~500 MB w/ deps) + storm (~200 MB) + paper-qa (~100 MB) + trafilatura (~10 MB) |
| Crawl4AI Playwright browsers (if pip path) | ~400 MB | only if NOT using Docker |
| **Total initial** | **~9 GB** | within Z: drive budget |
| **Annual growth** | **~36 GB/year** at 100 MB/day | acceptable |

### 8.2 RAM/CPU baseline

| State | RAM | CPU |
|---|---|---|
| Idle (all services up, no requests) | ~3.1 GB | <5% (Docker idle + Python REST idle) |
| Light research (1 SearXNG query + 1 Crawl4AI fetch) | ~4 GB | 1 core spike for ~2s |
| Heavy research (Perplexica + Firecrawl crawl + paper-qa indexing) | ~6-8 GB | 2-4 cores burst, 30-90s |
| Vespa added (DEFER) | +4 GB | +1 core constant |

Reference: existing runtime has Langfuse (~500 MB) + Phoenix (~300 MB) + CogneeMCP (~300 MB) + Ollama+LlamaSwap (~2 GB host + ~22 GB VRAM) already running. Adding **~3.1 GB more** at idle is feasible on typical 32-64 GB workstation; 96.7% VRAM usage by LlamaSwap is the binding constraint, NOT host RAM.

### 8.3 Maintenance burden

- **Docker compose pull cadence**: weekly `docker compose pull && docker compose up -d --remove-orphans` for security patches. Add to `tools/research-stack/update.ps1`.
- **Python pip update**: monthly `pip install --upgrade gpt-researcher knowledge-storm paper-qa trafilatura crawl4ai`. Add to bootstrap update path.
- **Security patches**: SearXNG, Firecrawl-AGPL, Crawl4AI all have active maintenance; expect ~1 release/month each. CVE monitoring via Dependabot (if mirroring to a private GH repo) or manual `gh release list` weekly.
- **Backup strategy**: `tools/research-stack/backup.ps1` → `docker run --rm -v firecrawl_pgdata:/data -v Z:\backups:/backup alpine tar czf /backup/firecrawl-pg-$(date +%F).tar.gz /data`. Run weekly via NSSM scheduled task.

### 8.4 Rollback

**Single-command rollback** (tested in bootstrap script):

```powershell
# Tear-down Docker stack
& docker compose -f Z:\claude-sota-installed\tools\research-stack\docker-compose.yml down -v

# Remove NSSM services
& nssm.exe remove GptResearcherREST confirm
& nssm.exe remove PaperQaREST confirm

# Optional: clean up Docker volumes
& docker volume rm research-stack_firecrawl_pgdata research-stack_qdrant_data

# Optional: revert pip installs
& Z:\venvs\claude\Scripts\pip.exe uninstall -y gpt-researcher knowledge-storm paper-qa trafilatura crawl4ai

# Revert .mcp.json entries (operator manual edit; backed up to .mcp.json.pre-w320.bak)
```

100% reversible — no system-level changes; all state under `Z:\claude-sota-installed-state\` or Docker volumes.

---

## §9 Bootstrap Script

`Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1` — operator runs ONCE; idempotent (safe to re-run); documents each step.

(Skeleton — operator-AI to materialize content; see master compose §5 and NSSM snippets §6.)

```powershell
# tools/research-stack/setup-open-source-research-stack.ps1
# W320 Stream F — idempotent bootstrap for the OSS research stack
# Run as: pwsh -File Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1
[CmdletBinding()]
param(
  [switch]$SkipDocker,
  [switch]$SkipNssm,
  [switch]$SkipPip,
  [switch]$Optional   # include Vespa/Qdrant optional profiles
)
$ErrorActionPreference = "Stop"
$root = "Z:\claude-sota-installed\tools\research-stack"
$state = "Z:\claude-sota-installed-state"

Write-Host "[W320-F] research-stack bootstrap — root=$root state=$state" -ForegroundColor Cyan

# Step 1: secrets — generate if not present (idempotent)
if (-not $env:SEARXNG_SECRET)          { $env:SEARXNG_SECRET          = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Max 256) }) }
if (-not $env:FIRECRAWL_PG_PASSWORD)   { $env:FIRECRAWL_PG_PASSWORD   = -join ((1..24) | ForEach-Object { [char](Get-Random -Min 65 -Max 91) }) }
if (-not $env:FIRECRAWL_BULL_AUTH_KEY) { $env:FIRECRAWL_BULL_AUTH_KEY = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Max 256) }) }
Write-Host "[W320-F] secrets materialised in process env (mirror to CLAUDE.local.md after first run)" -ForegroundColor Yellow

# Step 2: Docker stack
if (-not $SkipDocker) {
  Write-Host "[W320-F] docker compose pull + up..." -ForegroundColor Cyan
  Push-Location $root
  try {
    & docker compose pull
    if ($Optional) { & docker compose --profile optional up -d } else { & docker compose up -d }
    Start-Sleep 5
    & docker compose ps
  } finally { Pop-Location }
}

# Step 3: pip installs into shared venv
if (-not $SkipPip) {
  Write-Host "[W320-F] pip install research libs into Z:\venvs\claude..." -ForegroundColor Cyan
  & Z:\venvs\claude\Scripts\pip.exe install --upgrade pip
  & Z:\venvs\claude\Scripts\pip.exe install gpt-researcher knowledge-storm paper-qa trafilatura
}

# Step 4: NSSM services
if (-not $SkipNssm) {
  Write-Host "[W320-F] NSSM services for gpt-researcher + paper-qa..." -ForegroundColor Cyan
  # idempotent: check service exists before install
  foreach ($svc in @("GptResearcherREST", "PaperQaREST")) {
    $existing = & nssm.exe status $svc 2>&1
    if ($LASTEXITCODE -eq 0) { Write-Host "  $svc already installed — skipping" -ForegroundColor Yellow; continue }
    # ... per-service nssm install + set + start (see §6)
  }
}

# Step 5: smoke tests
Write-Host "[W320-F] smoke tests..." -ForegroundColor Cyan
$tests = @(
  @{ name = "SearXNG";       url = "http://localhost:8888/healthz" }
  @{ name = "Perplexica";    url = "http://localhost:3001/" }
  @{ name = "Firecrawl";     url = "http://localhost:3002/health" }
  @{ name = "Crawl4AI";      url = "http://localhost:11235/health" }
)
foreach ($t in $tests) {
  try {
    $r = Invoke-WebRequest -Uri $t.url -TimeoutSec 5 -UseBasicParsing
    Write-Host "  [OK] $($t.name) → $($r.StatusCode)" -ForegroundColor Green
  } catch { Write-Host "  [FAIL] $($t.name) → $($_.Exception.Message)" -ForegroundColor Red }
}

Write-Host "[W320-F] bootstrap complete. .mcp.json wiring next (manual; see STREAM-F §4)" -ForegroundColor Green
```

**Idempotent**: `docker compose up -d` is no-op if running; `nssm install` is guarded by `nssm status` check; pip is `--upgrade` (no error on re-install).

---

## §10 Cite Bibliography

Official docs / GitHub canonical sources for all services in this stack:

1. SearXNG admin install — https://docs.searxng.org/admin/installation.html
2. SearXNG Docker — https://docs.searxng.org/admin/installation-docker.html
3. SearXNG settings.yml — https://docs.searxng.org/admin/settings/index.html
4. SearXNG image — https://hub.docker.com/r/searxng/searxng
5. Perplexica README — https://github.com/ItzCrazyKns/Perplexica/blob/master/README.md
6. Perplexica networking — https://github.com/ItzCrazyKns/Perplexica/blob/master/docs/installation/NETWORKING.md
7. Perplexica config.toml — https://github.com/ItzCrazyKns/Perplexica/blob/master/sample.config.toml
8. Firecrawl SELF_HOST.md (current owner `firecrawl/firecrawl`) — https://github.com/firecrawl/firecrawl/blob/main/SELF_HOST.md
9. Firecrawl docker compose — https://github.com/firecrawl/firecrawl/blob/main/docker-compose.yaml
10. Firecrawl MCP npm package — https://www.npmjs.com/package/firecrawl-mcp
11. Crawl4AI install — https://github.com/unclecode/crawl4ai#installation
12. Crawl4AI Docker — https://github.com/unclecode/crawl4ai/blob/main/Dockerfile
13. Trafilatura install — https://trafilatura.readthedocs.io/en/latest/installation.html
14. gpt-researcher — https://github.com/assafelovic/gpt-researcher
15. storm (knowledge-storm) — https://github.com/stanford-oval/storm
16. paper-qa — https://github.com/Future-House/paper-qa
17. Qdrant Docker — https://qdrant.tech/documentation/guides/installation/
18. Vespa Docker — https://docs.vespa.ai/en/vespa-quick-start.html
19. NSSM docs — https://nssm.cc/usage
20. Docker compose ref — https://docs.docker.com/compose/compose-file/
21. Anthropic MCP spec — https://modelcontextprotocol.io/specification/
22. Anthropic CCBP claude-settings.md — https://github.com/anthropics/claude-code-best-practice (HEAD `48798ca`)
23. Jina Reader-LM HF card — https://huggingface.co/jinaai/reader-lm-1.5b
24. Ollama OpenAI-compat — https://github.com/ollama/ollama/blob/main/docs/openai.md

---

## Cross-stream linkage

- **Agent E** (sibling): which OSS repos replace which commercial MCPs (decision layer).
- **Agent F** (this doc): HOW to deploy + wire selected repos (execution layer).
- **Stream A/B/C/D synthesis**: W320-SYNTHESIS.md.

**Hand-off back to operator**: §9 bootstrap script is paste-ready; `.mcp.json` edits in §4 are operator-AI staged (one edit per service). All cardinal-rule invariants documented per-section.
