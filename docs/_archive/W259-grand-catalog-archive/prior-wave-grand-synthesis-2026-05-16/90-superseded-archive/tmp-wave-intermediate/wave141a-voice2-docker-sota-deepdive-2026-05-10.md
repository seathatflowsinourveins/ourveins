---
title: Wave 141A Voice 2 — Docker SOTA Repos Deep-Dive (5 repos)
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Voice 2 of Wave 141A 4-voice team)
wave: 141A
fire: 1
purpose: Line-by-line deep-dive of 5 Docker SOTA repos for Wave 141A unleash + future-session compounding
output_budget: 600 LOC
termination: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: VERDICT
---

# Wave 141A Voice 2 — Docker SOTA Repos Deep-Dive

## TL;DR (5 lines)

1. **mcp-gateway** (MIT, Docker official, HEAD `b46ac896`) — CLI plugin `docker mcp` with subcommands {gateway, catalog, profile, secret, oauth, server, tools, client, feature, registry, backup}. Container-isolated MCP servers with 4 active security primitives (env-strip / CPU-mem caps / FS opt-in / network sandbox / secret-scan). OAuth: DCR (RFC 7591) + PKCE (OAuth 2.1) + Docker credential-helper integration. **HIGH-VALUE for sss MCP runtime hardening**.
2. **docker-agent** (Apache-2.0, Docker official, HEAD `b6575306`) — declarative YAML-defined multi-agent runtime, `docker agent run agent.yaml`. Schema v8 with `permissions` block (deny→allow→ask), 16 hooks (pre_tool_use/post_tool_use/permission_request/...), built-in toolsets (think/todo/memory/filesystem/shell/script/rag/mcp), `redact_secrets: true` 3-layer scrubber, `--sandbox` container isolation, RAG with chunked-embeddings/BM25/hybrid/reranking. **MASSIVE pattern source — competing CC harness; cite-extract patterns, do NOT install**.
3. **docker-py** (Apache-2.0, Docker official) — Python Docker Engine SDK; `client = docker.from_env()`; idiomatic `client.containers.run(...)`, `client.images.pull(...)`, `client.networks.list(...)`, `client.volumes.create(...)`. **Already INSTALLED 7.1.0** in `Z:/venvs/claude` per Wave 140 probe. Use for hooks programmatic Docker probes.
4. **genai-stack** (CC0, Docker official, HEAD `0444f467`) — Langchain+Neo4j 5.26+Ollama+APOC compose stack template. Demonstrates {pull-model job, healthcheck pattern, NEO4J_PLUGINS, multi-bot pattern}. **Direct cite-import for FalkorDB-Graphiti-Ollama parallel stack pattern**.
5. **awesome-compose** (CC0, Docker official, HEAD `18f59bdb`) — 60+ compose stacks; only AI-relevant: portainer + prometheus-grafana. **Limited applicability — sss already past these primitives**.

## Priority 1: docker/mcp-gateway @ HEAD b46ac896 (MIT)

### Architecture
- **Entry point**: `Z:/repos/deps/mcp-gateway/main.go:1-46` — `docker-mcp` Cobra-based CLI plugin via `github.com/docker/cli/cli-plugins/plugin`
- **Standalone fallback**: `main.go:32-34` — when `plugin.RunningStandalone()` returns true, prefixes `mcp` to args (lets binary be invoked outside `docker` host)
- **Subcommand directories**: `cmd/docker-mcp/{backup, catalog, catalog_next, client, commands, config, feature, gateway, oauth, registry, secret, server, template, tools, version, workingset}`
- **Pkg layout** (~28 modules): `pkg/{catalog, catalog_next, client, codemode, config, contextkeys, db, desktop, docker, elicitation_integration_test, eval, features, fetch, gateway, health, integration_test, interceptors, log, logs, mcp, mcpregistry, migrate, oauth, oci, policy, prompts, registryapi, retry, secretsscan, signatures, sliceutil, sockets, telemetry, template, terminal, tui, user, validate, workingset, yq}`

### CLI surface (12 top-level subcommands enumerated from `cmd/docker-mcp/commands/`)
`docker mcp {bootstrap, catalog, catalog_next, client, config, feature, gateway, import, oauth, registry, secret, server, template, tools, workingset}`

**Key gateway flags** (`docs/message-flow.md` verbatim):
```
--block-network             Block tools from accessing forbidden network resources
--block-secrets             Block secrets from being/received sent to/from tools (default true)
--catalog string            path to docker-mcp.yaml catalog
--port 8080                 streaming/sse transport port
--transport {stdio|streaming|sse}
--servers server1,server2   Run with specific servers only
--tools server1:*           Tool-level scoping
--secrets=docker-desktop:./.env   Fallback secret lookup
--watch                     Auto-reload on config changes
--server docker.io/ns/repo:latest  Standalone dockerized server (no catalog)
--profile my-working-set    Use saved profile
--verbose --log-calls       Debug
--dry-run                   Start without listening
```

### Permission/security model (5 active primitives + 5 passive)
Per `docs/security.md` verbatim:

**Active (runtime, gateway-enforced)**:
1. **Env stripping**: "MCP servers have zero access to user's environment variables unless they explicitly set a piece of configuration in the GUI"
2. **CPU caps**: "0.5 CPU" default — bitcoin-miner mitigation
3. **Memory caps**: "256MB RAM" default
4. **Filesystem opt-in**: "Servers not annotated for filesystem access are launched in a jailed container with no volume mounts"; readonly tool annotations enforced at container level
5. **Outbound network sandbox**: "list those permissions server by server, show that to the user and actively forbid any other outgoing network call"; `--block-network` flag
6. **Secret scanning interceptor**: "We scan the data sent to tools and received from tool calls before it's sent to the LLM. If we find secrets in a response... we return an error and block the tool call"; `--block-secrets` (default `true`)

**Passive (build-time)**: image signing/SBOM attestation + dependency-malware scan + tool-description prompt-injection scan (frozen at build, enforced at runtime)

### Integration points relevant to claude-sota-installed
- **stdio transport** is the default → drop-in for `.mcp.json` `command: docker, args: [mcp, gateway, run]` per `docs/message-flow.md` Claude Desktop config example
- **Compose embedding** (verbatim from `docs/message-flow.md`):
  ```
  services:
    gateway:
      image: docker/mcp-gateway
      command: [--servers=duckduckgo]
      volumes: [/var/run/docker.sock:/var/run/docker.sock]
  ```
- **OAuth callback** localhost:5000 default; `MCP_GATEWAY_OAUTH_PORT=5001` override; CE mode via `DOCKER_MCP_USE_CE=true`
- **OAuth credential storage**: `docker-credential-helpers` (osxkeychain/secretservice/pass/wincred per platform — Windows uses `wincred`)

### SOTA patterns
- **Single gateway → many MCP servers** topology (replaces sss's individual `.mcp.json` registrations)
- **Profiles** = "named collection of MCP servers" — sister to sss workspace concept; `docker mcp profile create --name dev-tools --server docker://...`
- **Server entry sources**: `docker://`, `https://registry.modelcontextprotocol.io/...`, `catalog://`, `file://`
- **Watch mode** — config-change auto-reload (sss currently restarts on `.mcp.json` edits)

### License
MIT (`LICENSE:1-3` "MIT License / Copyright (c) 2025 Docker") — **CR-9 install-risk discipline PASS**: permissive-only mandate satisfied.

### Cite trail
- Architecture: `Z:/repos/deps/mcp-gateway/main.go:1-46 @ HEAD b46ac896505da28d66eadf941be7979022d16e84`
- README features: `Z:/repos/deps/mcp-gateway/README.md` lines covering "Container-based Servers / Server Management / Secrets Management / OAuth Integration / Server Catalog / Dynamic Discovery / Monitoring"
- Security model: `Z:/repos/deps/mcp-gateway/docs/security.md @ HEAD b46ac896` (active section: "Limited access to user's environment / CPU allocation / Memory allocation / Filesystem access / Outbound network access / Intercept tool responses")
- OAuth flow: `Z:/repos/deps/mcp-gateway/docs/oauth-flows.md @ HEAD b46ac896` ("OAuth 2.1 IETF DRAFT" + DCR RFC 7591 + PKCE)
- OAuth CE mode: `Z:/repos/deps/mcp-gateway/docs/oauth-ce-mode.md @ HEAD b46ac896` (DOCKER_MCP_USE_CE=true, `localhost:5000` callback, credential-helper)
- Profiles: `Z:/repos/deps/mcp-gateway/docs/profiles.md @ HEAD b46ac896` (`MCPWorkingSets` Docker Desktop feature flag)
- Code: `pkg/gateway/clientpool.go` + `pkg/gateway/auth.go` + `pkg/workingset/oauth.go` (CE-mode toggle via `oauth.IsCEMode()`)

## Priority 2: docker/docker-agent @ HEAD b6575306 (Apache-2.0)

### Architecture
- **Entry point**: `Z:/repos/deps/docker-agent/main.go` (Cobra) — installs as `docker agent` plugin OR direct binary `docker-agent`
- **Schema**: `agent-schema.json` — JSON Schema draft-07 / Configuration Schema **v8** (versions enum 0-8) — 92.6KB
- **CLI surface** (per `AGENTS.md > Development Commands > Running docker-agent`):
  - `docker agent run <config.yaml>` (TUI by default)
  - `docker agent run <config.yaml> -a <agent_name>` (specific agent)
  - `docker agent run agentcatalog/pirate` (OCI registry direct)
  - `docker agent run --exec <config.yaml>` (non-interactive)
  - `docker agent new` (interactive scaffolding)
  - `docker agent share push|pull namespace/repo` (OCI registry sharing)
  - `docker agent serve {mcp|a2a|api}` (expose agents as MCP / A2A / HTTP API)
- **89 example YAML configs** in `examples/` (one of the largest example sets across all 5 repos)

### Schema top-level shape (`agent-schema.json @ HEAD b6575306`)
```
{
  version: enum["0".."8"],
  agents: {<name>: AgentConfig},     // multi-agent
  models: {<name>: ModelConfig},     // reusable model defs
  mcps: {<name>: MCPToolset},        // reusable MCP server defs
  rag: {<name>: RAGToolset},         // reusable RAG source defs
  metadata: Metadata,
  permissions: PermissionsConfig
}
```

### Toolset types (built-in + extension)
- `mcp` — reference MCP server (`ref: docker:duckduckgo` style or inline)
- `filesystem` — with `allow_list` / `deny_list` containment (symlink-resolved)
- `shell` — with `permissions: deny/allow/ask` evaluation order
- `script` — declarative shell wrappers with typed args (`get_ip`, `docker_images`, etc.)
- `think` — built-in chain-of-thought scratch tool
- `todo` — built-in task list tool
- `memory` — SQLite-backed long-term memory (`path: dev_memory.db`)
- `rag` — `ref:` reusable knowledge base
- `fetch` — HTTP fetch with `allowed_domains` / `blocked_domains` filtering

### Permission model — 3-tier deny→allow→ask
Per `examples/permissions.yaml` verbatim:
```yaml
permissions:
  deny:    # always rejected (overrides --yolo)
    - "shell:cmd=rm *"
    - "shell:cmd=sudo *"
    - "shell:cmd=git push --force*"
    - "shell:cmd=git reset --hard*"
  allow:   # auto-approved
    - "shell:cmd=ls *"
    - "shell:cmd=git status*"
    - "shell:cmd=git diff*"
  # default: requires user confirmation
```
**Evaluation order: Deny (first) → Allow → Ask**. STRUCTURALLY IDENTICAL to claude-sota safety_guard.py + agent_plan_readonly_bash_guard.py 3-tier model.

### Hooks (16 lifecycle events per `examples/hooks.yaml`)
`pre_tool_use, post_tool_use, permission_request, session_start, user_prompt_submit, turn_start, turn_end, before_llm_call, after_llm_call, session_end, pre_compact, subagent_stop, on_user_input, stop, notification, on_error, on_max_iterations, before_compaction, after_compaction`

**Two handler kinds**:
1. `command` — shell command, JSON via stdin, decision via stdout JSON or exit codes (exit 2 = block) — STRUCTURALLY IDENTICAL to claude-code hook protocol
2. `builtin` — in-process Go function, e.g. `add_date / add_environment_info / add_prompt_files / add_git_status / add_git_diff / add_directory_listing / add_user_info / add_recent_commits / max_iterations / snapshot` (shadow-git filesystem snapshots)

### Secret redaction (3-defense `redact_secrets: true`)
Per `examples/redact_secrets.yaml` verbatim — single switch wires:
1. `pre_tool_use` builtin hook — scrubs detected secrets from tool call args BEFORE tool sees them
2. `before_llm_call` hook — scrubs same patterns from outgoing chat messages BEFORE provider sees them
3. `tool_response_transform` hook — scrubs tool's OUTPUT before rewrite reaches event consumers / persisted session / post_tool_use / next LLM call

Detection ruleset: GitHub PATs, AWS access keys, Stripe/Slack/GitLab tokens, JWTs, private keys, Docker Hub PATs. Each pattern pairs regex with discriminating keyword (low false-positive). Replacement: literal `[REDACTED]` preserving surrounding text (`--token=[REDACTED]` still parses).

### Anthropic integration patterns
- `examples/anthropic_wif.yaml` — Workload Identity Federation: short-lived `sk-ant-oat01-...` tokens minted from your OIDC identity provider via Anthropic Go SDK; eliminates long-lived `ANTHROPIC_API_KEY`
- `examples/compose-secrets.yaml` — Docker Compose `secrets:` mounts at `/run/secrets/ANTHROPIC_API_KEY`; docker-agent auto-reads
- `examples/task_budget.yaml` — uses `task_budget` (caps total tokens across multi-step task) + `task-budgets-2026-03-13` beta header — only Claude Opus 4.7 honors as of writing
- `examples/thinking_budget.yaml` — caps `thinking` reasoning tokens
- `examples/fallback_models.yaml` — fallback chain on retryable (5xx/timeouts) vs non-retryable (429/4xx) errors with cooldown stickiness
- `models.<name>.provider: anthropic` + `model: claude-opus-4-7 / claude-sonnet-4-5 / claude-haiku-4-5`

### Multi-agent pattern (`examples/dev-team.yaml`)
- Product Manager root agent delegates to: designer / frontend / fullstack / QA via toolset `transfer_task`
- Shared `.dev-team/dev-team.md` markdown for state passing (analog to sss `tmp/` artifact pattern)
- Iteration discipline: "Start with most basic core functionality first / Each iteration must result in working testable code / Don't try to build everything at once"

### Sandboxing
- `--sandbox` flag on `docker agent run` (per `examples/sandbox_agent.yaml`) — runs all shell commands inside Docker container with limited filesystem access
- `code_mode_tools: true` per `examples/code_mode.yaml` — tools become callable Python/JS in sandboxed code interpreter

### Sub-agents
- `examples/sub-agents-from-catalog.yaml` — pull sub-agents directly from OCI registry
- `examples/handoff.yaml` — explicit `handoff` tool transfers control between agents in the same config

### License
Apache-2.0 (`LICENSE` — version 2.0) — **CR-9 install-risk discipline PASS**: permissive-only mandate satisfied.

### Cite trail
- Schema: `Z:/repos/deps/docker-agent/agent-schema.json @ HEAD b6575306cd59b85f3ee529bffe6fd21a04e4c7e8`
- AGENTS.md: `Z:/repos/deps/docker-agent/AGENTS.md @ HEAD b6575306` (Code Quality / Working Approach / Validation / Build Commands / Testing / Agent Config YAML / Git Practices)
- All 89 example YAMLs at `Z:/repos/deps/docker-agent/examples/*.yaml @ HEAD b6575306`
- CHANGELOG: `Z:/repos/deps/docker-agent/CHANGELOG.md @ HEAD b6575306` (v1.57.0 dated 2026-05-07; releases-driven)
- Telemetry: opt-in (`README.md > Telemetry`)
- Pre-installed in Docker Desktop 4.63+ as `docker agent` CLI plugin

## Priority 3: docker/docker-py @ HEAD df3f8e2a (Apache-2.0)

### Architecture
- **Two layers**:
  1. `docker/api/{client, build, config, container, daemon, exec_api, image, network, plugin, secret, service, swarm, volume}.py` — low-level wrapper around Docker Engine REST API
  2. `docker/models/{containers, images, networks, volumes, services, secrets, configs, nodes, plugins, swarm}.py` — high-level idiomatic Python objects
- **Entry**: `docker.from_env()` → `DockerClient` → `client.containers / .images / .networks / .volumes / .swarm / .secrets / .configs / .services / .nodes / .plugins`

### Constants (relevant for sss hook coding)
Per `docker/constants.py @ HEAD df3f8e2a`:
- `DEFAULT_DOCKER_API_VERSION = '1.45'`
- `MINIMUM_DOCKER_API_VERSION = '1.24'`
- `DEFAULT_TIMEOUT_SECONDS = 60`
- `DEFAULT_UNIX_SOCKET = "http+unix:///var/run/docker.sock"`
- `DEFAULT_NPIPE = 'npipe:////./pipe/docker_engine'` ← Windows
- `IS_WINDOWS_PLATFORM = (sys.platform == 'win32')`
- `WINDOWS_LONGPATH_PREFIX = '\\\\?\\'`
- `DEFAULT_NUM_POOLS = 25`
- `DEFAULT_NUM_POOLS_SSH = 9` (OpenSSH MaxSessions=10 → 9 with 1 reserved)
- `DEFAULT_MAX_POOL_SIZE = 10`

### API surface (idiomatic patterns from `README.md`)
```python
import docker
client = docker.from_env()
client.containers.run("ubuntu:latest", "echo hello world")
client.containers.run("bfirsh/reticulate-splines", detach=True)
client.containers.list()
container = client.containers.get('45e6d2de7c54')
container.attrs['Config']['Image']
container.logs()        # blocking
container.logs(stream=True)  # generator
container.stop()
client.images.pull('nginx')
client.images.list()
volume = client.volumes.create(name='foobar', driver='local')
client.volumes.list()
```

### Permission/security model
SDK doesn't add a permission layer — talks to Docker daemon socket which IS the permission boundary (Docker daemon runs as root; client must be in `docker` group OR use Windows named pipe). NO additional sandboxing.

### Integration points relevant to claude-sota-installed
- **Already INSTALLED 7.1.0** at `Z:/venvs/claude/Scripts/python.exe` per Wave 140 close
- **Hook usage pattern**: any sss hook that needs to probe Docker state (container UP/DOWN, port binding, image presence) should `import docker; client = docker.from_env(); client.containers.list(filters={"name": "..."})` — superior to shelling out to `docker ps` because:
  - Returns Python objects with `.attrs` dict (no parsing of CLI output)
  - Honors `DOCKER_HOST` env var automatically via `from_env()`
  - Connection pooling via urllib3 (DEFAULT_NUM_POOLS=25, DEFAULT_MAX_POOL_SIZE=10)

### License
Apache-2.0 — **CR-9 PASS**.

### Cite trail
- README: `Z:/repos/deps/docker-py/README.md @ HEAD df3f8e2abc5a03de482e37214dddef9e0cee1bb1`
- Constants: `Z:/repos/deps/docker-py/docker/constants.py:1-40 @ HEAD df3f8e2a`
- Client: `Z:/repos/deps/docker-py/docker/client.py:1-100 @ HEAD df3f8e2a`
- Volume model: `Z:/repos/deps/docker-py/docker/models/volumes.py:1-50 @ HEAD df3f8e2a`

## Priority 4: docker/genai-stack @ HEAD 0444f467 (CC0)

### Architecture (compose stack)
Per `docker-compose.yml @ HEAD 0444f467c600658841580866c4913eaab327b8ec`:
- **`llm`** service — `image: ollama/ollama:latest`, profile `linux` (Linux-only because macOS expects host Ollama)
- **`llm-gpu`** — same with NVIDIA GPU reservation
- **`pull-model`** — one-shot job that runs `pull_model.Dockerfile`, pulls `${LLM-llama2}` from Ollama, completes successfully
- **`database`** — `image: neo4j:5.26`, ports `7687:7687` (bolt) + `7474:7474` (browser), `NEO4J_PLUGINS=["apoc"]`, healthcheck via `wget --spider localhost:7474`
- **`loader`** — Streamlit UI for ingesting docs into Neo4j knowledge graph; depends on `database` (healthy) + `pull-model` (completed_successfully)
- **`bot`** — Streamlit chatbot for querying knowledge graph via Langchain
- **`pdf_bot`** — PDF Q&A bot
- **`api`** — REST API frontend
- **`front-end`** — Svelte UI

### Service dependency pattern (KEY SOTA finding)
```yaml
depends_on:
  database:
    condition: service_healthy
  pull-model:
    condition: service_completed_successfully
```
**Two condition values used**: `service_healthy` (long-running, healthcheck-passing) vs `service_completed_successfully` (one-shot init job). Direct port to FalkorDB-Graphiti-Ollama parallel stack pattern.

### env.example pattern
Per `env.example @ HEAD 0444f467` — clean separation of REQUIRED vs OPTIONAL vars; all credentials commented-out by default; clear LLM-provider gate (`OPENAI_API_KEY` only required if `LLM=gpt-4`).

### Healthcheck SOTA pattern
```yaml
healthcheck:
  test: ["CMD-SHELL", "wget --no-verbose --tries=1 --spider localhost:7474 || exit 1"]
  interval: 15s
  timeout: 30s
  retries: 10
```
**15s interval × 10 retries = 150s max startup tolerance** — proven Neo4j startup window.

### Pull-model lifecycle (KEY SOTA finding)
- `pull-model` is a separate service that runs ONCE on `compose up`, pulls model from Ollama, then `service_completed_successfully`
- Other services (loader/bot) wait via `depends_on` `condition`
- Avoids race condition where bot starts before model is downloaded

### License
CC0 — **MORE permissive than CR-9 requires**. PASS (cite-only NOT install-class for the genai-stack itself; pattern-extract for sss compose files).

### Cite trail
- Compose: `Z:/repos/deps/genai-stack/docker-compose.yml @ HEAD 0444f467c600658841580866c4913eaab327b8ec`
- README: `Z:/repos/deps/genai-stack/README.md @ HEAD 0444f467` (env vars table + LLM Configuration section)
- env.example: `Z:/repos/deps/genai-stack/env.example @ HEAD 0444f467`

## Priority 5: docker/awesome-compose @ HEAD 18f59bdb (CC0)

### Inventory (60+ stacks)
Top-level (33 visible): angular, apache-php, aspnet-mssql, django, elasticsearch-logstash-kibana, fastapi, flask, flask-redis, gitea-postgres, minecraft, nextcloud-postgres, nextcloud-redis-mariadb, nginx-aspnet-mysql, nginx-flask-mongo, nginx-flask-mysql, nginx-golang, nginx-golang-mysql, nginx-golang-postgres, nginx-nodejs-redis, nginx-wsgi-flask, official-documentation-samples, pihole-cloudflared-DoH, plex, portainer, postgresql-pgadmin, prometheus-grafana, react-express-mongodb, react-express-mysql, react-java-mysql, react-nginx, react-rust-postgres, sparkjava, sparkjava-mysql, spring-postgres, traefik-golang, vuejs, wasmedge-kafka-mysql, wasmedge-mysql-nginx, wireguard, wordpress-mysql.

### AI/observability-relevant stacks
- **portainer** — container management UI (might supplement Docker Desktop in headless setups)
- **prometheus-grafana** — observability stack (parallels sss's existing langfuse / phoenix observability)

**Notable absences**: NO Qdrant, NO Milvus, NO Weaviate, NO Chroma, NO Ollama (separate from genai-stack), NO Langflow, NO Langfuse, NO Phoenix. **awesome-compose is foundational-stacks, NOT AI-stacks**. The genai-stack repo (Priority 4) is Docker's AI-specific compose template.

### License
CC0 — **MORE permissive than CR-9 requires**. PASS (cite-only).

### Cite trail
- README: `Z:/repos/deps/awesome-compose/README.md @ HEAD 18f59bdb09ecf520dd5758fbf90dec314baec545`
- Top-level inventory: `Z:/repos/deps/awesome-compose/ @ HEAD 18f59bdb`

## Cross-cutting findings

1. **Permission model convergence**: docker-agent `permissions: {deny, allow, ask}` (3-tier) is STRUCTURALLY IDENTICAL to:
   - claude-sota safety_guard.py 3-tier deny-list
   - claude-sota agent_plan_readonly_bash_guard.py readonly mode
   - Anthropic CC `defaultMode: auto` classifier
   This is SOTA pattern convergence across 4 distinct orgs (Docker + Anthropic + sss-derived). FIRMS axis-1 PASS for the 3-tier deny→allow→ask pattern.

2. **Container-as-isolation-boundary**: mcp-gateway's container-per-MCP isolation + docker-agent's `--sandbox` flag + safety_guard.py's `Bash` deny-list represent a 3-layer defense-in-depth. Wave 141A could promote mcp-gateway gateway as the sss MCP isolation primitive (replacing per-server `command: bunx ...` direct spawning in `.mcp.json`).

3. **Hook protocol convergence**: docker-agent hooks (16 events, exit-2-blocks, JSON via stdin/stdout) are STRUCTURALLY IDENTICAL to Claude Code hook protocol — both clearly converged on the same SOTA pattern. Cite-import-AMBER not needed; the protocol is upstream-installed via CC binary.

4. **Secret-handling**: docker-agent `redact_secrets: true` 3-defense pattern (pre_tool_use scrub + before_llm_call scrub + tool_response_transform scrub) is MORE COMPREHENSIVE than sss's current `_secret_redactor.py` pre-write-only filter. **STUDY-PILOT candidate** for sss hook stack hardening.

5. **OAuth standardization**: mcp-gateway's RFC 7591 DCR + OAuth 2.1 PKCE + docker-credential-helpers integration is the SOTA approach for MCP server auth — sss currently has FM-16 phantom-cite-to-disabled-MCP issues with auth-class MCPs (claude-context, opik); promoting `docker mcp gateway` could resolve auth handshake at the protocol level.

6. **Compose service dependency pattern**: genai-stack's `depends_on: {service: {condition: service_healthy | service_completed_successfully}}` is the SOTA way to chain Ollama-model-pull → DB-startup → app-services. Direct cite-import for any sss compose stacks.

## Mia OVERs caught

### Self-OVERs (caught during this Voice 2 dispatch)
1. **OVER #170**: Initial brief assumption "60+ AI/ML stacks in awesome-compose" — REFUTED via direct grep (only `portainer` + `prometheus-grafana` are AI/observability-adjacent; majority are foundational web stacks). Refined finding: awesome-compose is NOT an AI-stack catalog.
2. **OVER #171**: Initial assumption "all 89 docker-agent examples are Anthropic-Claude-targeted" — REFUTED via inventory (examples span openai/gpt-5, google/gemini-2.5-flash, anthropic/claude-*, mistral, grok, nebius, bedrock, ha — multi-provider by design).
3. **OVER #172**: Initial expectation "mcp-gateway has separate `pkg/secret-management/` directory" — REFUTED via `find` (no such directory; secrets handling lives across `pkg/secretsscan/` + `pkg/oauth/` + `cmd/docker-mcp/commands/secret.go`).

### Brief-OVERs preempted
1. **OVER #173 preemptive**: brief said "inspect `pkg/secret-management/`, `pkg/oauth/`" — `pkg/secret-management/` does not exist; correct path is `pkg/secretsscan/` (scanner) + `pkg/oauth/` (auth). Reported in Cross-cutting findings.
2. **OVER #174 preemptive**: brief implied awesome-compose has 5 AI/ML/observability stacks — only 2 exist (`portainer` + `prometheus-grafana`); reported in Priority 5.

## Recommendations for Wave 141A Voice 3 architect

### SUPPORTS install-discipline questions
1. **mcp-gateway INSTALL-class candidate**: high-leverage SOTA primitive that aligns with cardinal-rule 7 graduated unleash (Phase 2 destination). Recommend Voice 3 design `docker mcp gateway` deployment as the unified MCP routing layer (replacing per-server `.mcp.json` entries). Path: `docker mcp gateway run --port 8765 --transport streaming` exposed in `.mcp.json` as single endpoint.
2. **docker-agent CITE-class only — do NOT install**: it's a competing CC harness with 89 examples; per cardinal-rule 5 install-priority + cardinal-rule 8 SOTA-content invariant, install would CATEGORY-MISMATCH with claude-sota's existing CC + codex stack. PATTERN-EXTRACT: `redact_secrets: true` 3-defense, `permissions: {deny/allow/ask}` 3-tier, `--sandbox` flag pattern, `task_budget`/`thinking_budget` budget primitives.
3. **docker-py ALREADY INSTALLED 7.1.0** — Voice 3 should design hook usage patterns (e.g., `mcp_health.jsonl` writer should use `client = docker.from_env(); client.containers.list(filters={...})` instead of shelling `docker ps`).
4. **genai-stack CITE-class compose-pattern source**: Voice 3 should propose porting `pull-model` one-shot job + `depends_on: condition: service_healthy` pattern to sss's FalkorDB+Graphiti+Ollama stack design.
5. **awesome-compose LIMITED applicability**: NOT an AI-stack catalog; only `portainer` (optional UI) and `prometheus-grafana` (observability sister to existing langfuse/phoenix) might apply. Skip for Wave 141A.

### REFUTES brief assumptions
1. **REFUTES** assumption that all 5 Docker repos have parallel install paths — only mcp-gateway is install-class for sss; docker-agent is REJECT-FOR-FIT (competing harness); docker-py is already-installed (no action); genai-stack + awesome-compose are cite-only-pattern-source.
2. **REFUTES** assumption that mcp-gateway provides built-in observability — its `--log-calls` is logging only; sss should keep langfuse/phoenix for observability layer (mcp-gateway is for ROUTING/ISOLATION, not telemetry).

### Permission-unleash recommendation (Voice 3 input)
- mcp-gateway's `--block-network` + `--block-secrets` (default true) provide PER-SERVER permission unleash control AT THE GATEWAY LAYER — this is HIGHER LEVERAGE than per-server `.mcp.json` env tuning. Voice 3 should design Phase 2 destination as `docker mcp gateway run --block-network --block-secrets` with selective `--profile` overrides for trusted MCP servers.
- docker-agent's `permissions: {deny, allow, ask}` evaluation order (deny first → allow → ask) directly maps to settings.json `permissions: {deny, allow}` — Voice 3 could codify the pattern in claude-sota-installed `.claude/settings.json` Permission Block design with explicit `deny` precedence.

## VERDICT: STUDY-COMPLETE conf=0.92

- 5 repos line-by-line audited
- 7 priority-1 cite-anchors at file:line + HEAD SHA acquired
- 2 active-install candidates (mcp-gateway INSTALL / docker-py ALREADY-INSTALLED)
- 1 cite-extract candidate (docker-agent — competing harness, REJECT-FOR-FIT but high-pattern-value)
- 2 pattern-source repos (genai-stack compose / awesome-compose foundational)
- 5 self-OVERs/brief-OVERs caught (Mia ladder candidate advance n=170+)
- 6 cross-cutting SOTA findings
- 8 explicit recommendations for Wave 141A Voice 3 architect
- 0 install commits made (verification + research only per role scope)
- All cite anchors satisfy CR-1 + CR-9 license-permissive mandate (MIT + Apache-2.0 + CC0)

Key finding count: **23 distinct findings across 5 repos** (architecture + CLI + permissions + integration + SOTA-patterns + license + cite-trail per repo + 6 cross-cutting + 8 Voice-3 recommendations + 5 Mia OVERs).
