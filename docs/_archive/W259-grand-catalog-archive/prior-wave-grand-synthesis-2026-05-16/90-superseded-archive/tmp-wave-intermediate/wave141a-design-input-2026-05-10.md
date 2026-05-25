# Wave 141A — Docker SOTA permission unleash + deep-dive design input

**Status**: PREPARED — fires AFTER Wave 141 closes (smoke probe + status flip)
**Scope**: per user directive 2026-05-10 — Docker permission wiring with SOTA harness + Docker org repo deep-dive + compounding learning surface (Karpathy §5)

## Pre-cloned Docker SOTA reference repos (CR-6 fresh, --depth 1)

| Repo | HEAD SHA | License | Role |
|---|---|---|---|
| `docker/mcp-gateway` | `b46ac896505da28d66eadf941be7979022d16e84` | MIT | **KILLER** — Docker MCP CLI plugin + Gateway; container-based MCP isolation + secrets mgmt + OAuth + dynamic discovery; Docker Desktop 4.59+ pre-installed |
| `docker/docker-agent` | `b6575306cd59b85f3ee529bffe6fd21a04e4c7e8` | Apache-2.0 | **KILLER** — Docker Agent Builder CLI plugin; multi-agent + MCP tool ecosystem + AI provider agnostic (OpenAI/Anthropic/Gemini/Bedrock/Mistral/xAI/Docker Model Runner); YAML declarative; built-in think/todo/memory tools; RAG (BM25/embeddings/hybrid/reranking); Docker Desktop 4.63+ pre-installed |
| `docker/docker-py` | `df3f8e2abc5a03de482e37214dddef9e0cee1bb1` | Apache-2.0 | Python SDK (v7.1.0 INSTALLED in `Z:/venvs/claude/`); used for runtime Docker probes |
| `docker/genai-stack` | `0444f467c600658841580866c4913eaab327b8ec` | CC0 | Reference Langchain + Docker + Neo4j + Ollama compose stack |
| `docker/awesome-compose` | `18f59bdb09ecf520dd5758fbf90dec314baec545` | CC0 | 60+ Compose example stacks (django/fastapi/flask/nextcloud/gitea-postgres/etc) |

## Live Docker state (probed Wave 141 Fire 1 prep)

- Docker Desktop 4.x — Engine 29.4.1 (linux/amd64, kernel 6.6.87.2-microsoft-standard-WSL2)
- 10 containers running, 13 images
- `docker info`: OS=Docker Desktop, Engine=29.4.1
- docker-py 7.1.0 in `Z:/venvs/claude/Scripts/python.exe`

## Current permission state (probed Wave 141 Fire 1 prep)

- `permissions.defaultMode`: `bypassPermissions` (Wave 82d temporary override; CCBP-canonical SOTA = `auto` per `claude-settings.md:251 @ 64fffd53`)
- `permissions.allow[]`: 11 entries — only Docker-related is `Bash(docker pull *)`
- `permissions.deny[]`: 8 entries — secret-class file Read patterns only (.env / *.pem / id_rsa / id_ed25519 / *.pfx / *.key)
- `safety_guard.py`: 1 Docker entry — `docker system prune` regex deny at L106-108

## Proposed design (skeleton — Voice 3 architect refines)

### A. settings.json `permissions.allow[]` Docker class additions (~12 entries)

Cite-anchor each addition at upstream Docker docs URL OR docker/docker-cli source:

```json
{
  "Bash(docker pull *)": "ALREADY ALLOWED",
  "Bash(docker run *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/run/",
  "Bash(docker exec *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/exec/",
  "Bash(docker ps *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/ls/",
  "Bash(docker stop *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/stop/",
  "Bash(docker rm *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/rm/ — narrow form ALLOWED; --force matched separately",
  "Bash(docker images *)": "TIER-1 https://docs.docker.com/reference/cli/docker/image/ls/",
  "Bash(docker logs *)": "TIER-1 https://docs.docker.com/reference/cli/docker/container/logs/",
  "Bash(docker inspect *)": "TIER-1 https://docs.docker.com/reference/cli/docker/inspect/",
  "Bash(docker compose *)": "TIER-1 https://docs.docker.com/reference/cli/docker/compose/",
  "Bash(docker network *)": "TIER-1 https://docs.docker.com/reference/cli/docker/network/",
  "Bash(docker volume ls)": "TIER-1 https://docs.docker.com/reference/cli/docker/volume/ls/ — read-only volume listing",
  "Bash(docker volume inspect *)": "TIER-1 https://docs.docker.com/reference/cli/docker/volume/inspect/",
  "Bash(docker version *)": "TIER-1 https://docs.docker.com/reference/cli/docker/version/",
  "Bash(docker info *)": "TIER-1 https://docs.docker.com/reference/cli/docker/info/",
  "Bash(docker mcp *)": "TIER-1 docker/mcp-gateway @ HEAD b46ac896 — when CLI plugin installed",
  "Bash(docker agent *)": "TIER-1 docker/docker-agent @ HEAD b6575306 — when CLI plugin installed"
}
```

### B. safety_guard.py Docker policy extension (~5-7 NEW deny patterns)

Per CR-7 graduated-unleash: keep catastrophic-pattern denylist + add:

```python
# Add to safety_guard.py deny patterns (preserve existing docker system prune + 11 others)
DOCKER_DENY = [
    # Existing
    (re.compile(r"\bdocker\s+system\s+prune\b"), "removes all unused containers/images/volumes", "use `docker container prune` or `docker image prune`"),
    # NEW — wildcard-against-all
    (re.compile(r"\bdocker\s+rm\s+(-f\s+)?\$\(docker\s+ps\s+-aq\)"), "remove ALL containers (incl running)", "be explicit: list specific container IDs"),
    (re.compile(r"\bdocker\s+rmi\s+\$\(docker\s+images\s+-q\)"), "remove ALL images", "be explicit: list specific image IDs"),
    # NEW — privileged escape
    (re.compile(r"\bdocker\s+run\s+.*\s+--privileged\b"), "privileged container (host-namespace escape)", "explicit cap-add list instead"),
    (re.compile(r"\bdocker\s+run\s+.*\s+--net=?host\b"), "host network namespace (bypass network isolation)", "use bridge network with explicit -p ports"),
    (re.compile(r"\bdocker\s+run\s+.*\s+--pid=?host\b"), "host PID namespace (bypass process isolation)", "container-internal PID namespace default"),
    (re.compile(r"\bdocker\s+exec\s+.*\s+--privileged\b"), "privileged exec into running container", "container's existing capabilities"),
    # NEW — cli-plugin attack surface
    (re.compile(r"\bdocker\s+plugin\s+install\b"), "Docker plugin install (third-party kernel-level)", "use Docker MCP toolkit instead"),
]
```

### C. State-outside-repo Docker volume discipline

Per CLAUDE.local.md ENV (f) state-outside-repo redirects:

- Docker volume mounts MUST source from `Z:/claude-sota-installed-state/` NOT from `Z:/claude-sota-installed/`
- New Docker volume convention: `Z:/claude-sota-installed-state/.docker-volumes/<container-name>/`
- Existing FalkorDB container at port 16379 — verify volume mount per Wave 141 Voice 2 smoke probe
- CR-9 sibling-bleed: NEVER mount sibling claude-sota state (`Z:/claude-sota-state/`) into eee containers

### D. Manifest §3 additions (Docker plugins)

Two NEW INSTALLED rows per Wave 141A close:

| Plugin | Install method | URL | Status | Cite anchor |
|---|---|---|---|---|
| `docker/mcp-gateway` (CLI plugin `docker-mcp`) | Docker Desktop 4.59+ pre-installed | https://github.com/docker/mcp-gateway | TBD post-probe | `Z:/repos/deps/mcp-gateway/README.md:1-50 @ HEAD b46ac896` |
| `docker/docker-agent` (CLI plugin `docker-agent`) | Docker Desktop 4.63+ pre-installed OR `brew install docker-agent` | https://github.com/docker/docker-agent | TBD post-probe | `Z:/repos/deps/docker-agent/README.md @ HEAD b6575306` |

### E. Manifest §10 additions (CLI tools — Docker family)

Three NEW rows:

| Tool | Install | URL | Status |
|---|---|---|---|
| Docker Engine (Docker Desktop) | Docker Desktop installer (system-level) | https://docs.docker.com/desktop/ | INSTALLED-VIA-SYSTEM-PATH (29.4.1) |
| Docker CLI (`docker` command) | Bundled with Docker Desktop | https://github.com/docker/cli | INSTALLED-VIA-SYSTEM-PATH (29.4.1) |
| docker-py (Python SDK) | `pip install docker==7.1.0` | https://github.com/docker/docker-py | INSTALLED in `Z:/venvs/claude/` (v7.1.0) |

### F. Sister-rule integration

- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` cite-import-AMBER: T1-T7 lifecycle for Docker-class operations
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` cite-import-AMBER: Docker volumes per worktree
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A: any Docker permission edit goes through codex T1 review

### G. CR conformance verification

- CR-1 cite-trail: every allow/deny entry has TIER-1 Docker docs URL OR docker repo file:line @ HEAD SHA
- CR-3 cross-model gate: Wave 141A Voice 1 codex T1 + final synthesis T1 review (2× REAL GPT-5.5)
- CR-5 install-priority: docker/mcp-gateway + docker/docker-agent are upstream install-class (Docker Desktop pre-installed)
- CR-7 graduated-unleash: Phase 1 active; Docker class additions move toward Phase 2 with classifier (when defaultMode reverts to `auto`)
- CR-8 full-SOTA-content: every settings.json + safety_guard.py addition adapts SOTA Docker patterns
- CR-9 install-risk: pre-install REVERT check (sibling `Z:/claude-sota` Docker history) + sibling-bleed defense (state-outside-repo discipline + namespace separation)
- CR-10 research-first: Docker SOTA repos cloned + audited BEFORE permission wiring
- CR-11 META-process: 3-voice agent team + Mia pre-apply discipline at synthesis layer

## Voice 1 Path P codex T1 prompt focus (≤50 LOC single-claim audit)

CLAIM to audit: "The proposed Docker permission unleash design (Sections A+B+C+D+E above) is necessary AND sufficient to enable seamless SOTA Docker workflow (compose, mcp-gateway, docker-agent, build, exec, multi-network) WITHOUT violating CR-1 cite-trail OR CR-7 graduated-unleash OR CR-9 install-risk discipline OR introducing security regression beyond Wave 82d bypassPermissions baseline."

Voice 1 axes:
- Are Section A allow entries OVER-permissive (gaps where wildcard `*` opens unintended attack surface)?
- Are Section B deny patterns sufficient (any catastrophic Docker pattern missed)?
- Section C state-outside-repo volume discipline — does it actually enforce sibling-bleed defense or just document it?
- Section D plugin manifest rows — verify CLI plugins ARE present in Docker Desktop 4.x (not just pre-bundled in newer versions)?
- Hidden Docker security failure modes: Docker socket mount via `-v /var/run/docker.sock`? Docker context switching to remote engines?

JSON-at-EOF schema: `{"verdict":"...", "confidence":0.00, "missing_allows":[...], "missing_denies":[...], "wildcard_overreach":[...], "hidden_security_modes":[...], "concerns":[...], "prescribed_edits":[...]}`

## Voice 2 sota-researcher brief skeleton

ROLE: Deep-dive Docker SOTA repos for cite anchors at file:line + HEAD SHA
- `docker/mcp-gateway @ b46ac896` — `cmd/`, `pkg/`, `examples/` directories; CLAUDE.md file
- `docker/docker-agent @ b6575306` — `agent-schema.json`, `examples/`, `pkg/`, AGENTS.md, golang_developer.yaml
- `docker/docker-py @ df3f8e2a` — `docker/client.py`, `docker/api/`, `docker/models/`
- `docker/genai-stack @ 0444f467` — `docker-compose.yml`, `chains.py`, `loader.py`
- Output: `tmp/wave141a-voice2-docker-sota-deepdive-2026-05-10.md` (400-600 LOC)

## Voice 3 architect brief skeleton

ROLE: Refine the design above into committable spec
- settings.json edit diff (allow/deny additions with cite anchors)
- safety_guard.py edit diff (deny pattern additions with cite anchors)
- manifest §3 + §10 row additions
- install-provenance.md Wave 141A entry skeleton
- Roll-back path
- CR conformance verification
- Output: `tmp/wave141a-voice3-architect-design-2026-05-10.md` (300-500 LOC)
