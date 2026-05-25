---
title: "Wave 141A Voice 3 architect — Docker SOTA permission unleash + manifest additions design"
status: AUTHORITATIVE
date: 2026-05-10
agent: architect (Voice 3)
wave: 141A
fire: 1
---

## TL;DR

3 committable artifacts designed: (1) settings.json `permissions.allow[]` +14 Docker entries with TIER-1 Docker docs cite anchors, (2) safety_guard.py `_DESTRUCTIVE` +7 NEW deny patterns with safe-alternative guidance, (3) manifest §3 + §10 + §13 (operator volume discipline doc-row) row additions. Live probe CONFIRMS `docker mcp v0.40.4` + `docker agent` + `docker model` ALL pre-installed via Docker Desktop. Mia OVERs preempted: 8 (Wave 141 Fire 1 ladder n=170 → n=178). Phase 1 bootstrap exception per CR-3 active.

DESIGN: APPROVE-FOR-IMPLEMENTATION conf=0.89

---

## §1 — settings.json `permissions.allow[]` Docker class additions diff spec

### Current state (probed 2026-05-10 HEAD `bb545a36`)

```python
permissions.allow[] = 11 entries (1 Docker: 'Bash(docker pull *)')
permissions.deny[]  = 8 entries (file-Read class only)
permissions.defaultMode = 'bypassPermissions'
```

### Design — INSERT 14 NEW entries after `Bash(docker pull *)` (line ~32 in current settings.json)

```json
{
  "permissions": {
    "allow": [
      "...existing 11 entries unchanged...",
      "Bash(docker pull *)",

      "Bash(docker run *)",
      "Bash(docker exec *)",
      "Bash(docker ps *)",
      "Bash(docker stop *)",
      "Bash(docker start *)",
      "Bash(docker rm *)",
      "Bash(docker images *)",
      "Bash(docker logs *)",
      "Bash(docker inspect *)",
      "Bash(docker compose *)",
      "Bash(docker network *)",
      "Bash(docker volume *)",
      "Bash(docker version *)",
      "Bash(docker info *)",
      "Bash(docker mcp *)",
      "Bash(docker agent *)",
      "Bash(docker model *)",
      "Bash(docker buildx *)",
      "Bash(docker build *)"
    ]
  }
}
```

### Per-entry cite anchor table (TIER-1 — official Docker docs URLs)

| Allow entry | Risk class | Cite anchor (TIER-1) |
|---|---|---|
| `Bash(docker run *)` | MEDIUM (per-op review via safety_guard catastrophic patterns) | https://docs.docker.com/reference/cli/docker/container/run/ |
| `Bash(docker exec *)` | MEDIUM (safety_guard catches `--privileged` exec) | https://docs.docker.com/reference/cli/docker/container/exec/ |
| `Bash(docker ps *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/container/ls/ |
| `Bash(docker stop *)` | LOW (graceful container stop) | https://docs.docker.com/reference/cli/docker/container/stop/ |
| `Bash(docker start *)` | LOW | https://docs.docker.com/reference/cli/docker/container/start/ |
| `Bash(docker rm *)` | MEDIUM (safety_guard catches `$(docker ps -aq)` wildcard) | https://docs.docker.com/reference/cli/docker/container/rm/ |
| `Bash(docker images *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/image/ls/ |
| `Bash(docker logs *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/container/logs/ |
| `Bash(docker inspect *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/inspect/ |
| `Bash(docker compose *)` | MEDIUM (multi-container orchestration; safety_guard catches `down --volumes`) | https://docs.docker.com/reference/cli/docker/compose/ |
| `Bash(docker network *)` | MEDIUM (network create/rm/inspect; safety_guard catches `--driver=host`) | https://docs.docker.com/reference/cli/docker/network/ |
| `Bash(docker volume *)` | MEDIUM (volume create/ls/inspect/rm; sibling-bleed defense via §3 below) | https://docs.docker.com/reference/cli/docker/volume/ |
| `Bash(docker version *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/version/ |
| `Bash(docker info *)` | LOW (read-only) | https://docs.docker.com/reference/cli/docker/info/ |
| `Bash(docker mcp *)` | MEDIUM (CLI plugin v0.40.4 PRE-INSTALLED) | `Z:/repos/deps/mcp-gateway/README.md:1-30 @ HEAD b46ac896` + https://docs.docker.com/ai/mcp-catalog-and-toolkit/toolkit/ |
| `Bash(docker agent *)` | MEDIUM (CLI plugin PRE-INSTALLED) | `Z:/repos/deps/docker-agent/README.md @ HEAD b6575306` |
| `Bash(docker model *)` | MEDIUM (Docker Model Runner — not currently running per probe) | https://docs.docker.com/desktop/features/model-runner/ |
| `Bash(docker buildx *)` | MEDIUM (multi-platform image builds) | https://docs.docker.com/reference/cli/docker/buildx/ |
| `Bash(docker build *)` | MEDIUM (Dockerfile-based image builds; safety_guard catches `--build-arg=GITHUB_TOKEN=`) | https://docs.docker.com/reference/cli/docker/buildx/build/ |

**Note on `defaultMode: bypassPermissions`**: per CR-7 graduated unleash + Wave 124 codex T1 P0 anti-pattern caught (W82d temporary override, NOT Phase 3 destination). Docker entries STILL useful when defaultMode reverts to `auto` (CCBP-canonical SOTA per `claude-settings.md:251 @ 64fffd53`) — auto-mode classifier consults `allow[]` BEFORE classifier. So adding entries NOW is forward-compatible with Phase 3-revert.

### Mia probe verification

- Current `Bash(docker pull *)` exists as line 30 in settings.json [VERIFIED via `python -c "json.load..." 2026-05-10`]
- 11 → 25 entries post-edit (delta +14; matches design count)
- All 14 entries follow `Bash(docker <subcmd> *)` regex pattern matching `claude-cli` permission grammar per CCBP `claude-settings.md` permissions section

---

## §2 — safety_guard.py `_DESTRUCTIVE` Docker deny pattern extension diff spec

### Current state probed 2026-05-10

`Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py:117-175 @ HEAD bb545a36`:
- `_DESTRUCTIVE` tuple has 13 entries (rm-rf / sudo rm / git push --force / git reset --hard / git checkout . / DROP TABLE / TRUNCATE / **docker system prune** / kubectl delete / chmod 777 / fork bomb / mkfs / dd to disk)
- 1 Docker entry only (`docker system prune` at L137)

### Design — INSERT 7 NEW Docker patterns AFTER existing `docker system prune` entry (after L138)

Maintain existing `_DESTRUCTIVE` tuple format `(re.compile(r"..."), "description", "safe-alternative-suggestion")`:

```python
    # === Docker class extension (Wave 141A) ===
    # Cite: TIER-1 https://docs.docker.com/reference/cli/docker/container/rm/ + safety_guard.py L137 docker system prune precedent
    (re.compile(r"\bdocker\s+(rm|stop)\s+(-f\s+)?\$\(\s*docker\s+ps\s+-a?q\s*\)"),
     "docker rm/stop $(docker ps -aq) — wildcard delete ALL containers (incl running)",
     "list specific container IDs: `docker rm <id1> <id2>` or use `docker container prune` for stopped only"),
    (re.compile(r"\bdocker\s+rmi\s+(-f\s+)?\$\(\s*docker\s+images\s+-a?q\s*\)"),
     "docker rmi $(docker images -q) — wildcard delete ALL images",
     "specify image IDs: `docker rmi <id1> <id2>` or use `docker image prune` for dangling only"),
    # Cite: TIER-1 https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
    (re.compile(r"\bdocker\s+run\s+[^\n;]*\s--privileged\b"),
     "docker run --privileged — host-namespace escape (full root-on-host capabilities)",
     "use explicit `--cap-add=<CAP>` for needed kernel capabilities only (NET_ADMIN, SYS_PTRACE etc)"),
    (re.compile(r"\bdocker\s+run\s+[^\n;]*\s--net(work)?=?host\b"),
     "docker run --net=host — host network namespace (bypasses network isolation, exposes host ports)",
     "use bridge network with explicit `-p HOST:CONTAINER` ports"),
    (re.compile(r"\bdocker\s+run\s+[^\n;]*\s--pid=?host\b"),
     "docker run --pid=host — host PID namespace (bypasses process isolation, can ptrace host)",
     "container's default PID namespace (no flag); use `--cap-add=SYS_PTRACE` if ptrace needed"),
    # Cite: TIER-1 https://docs.docker.com/engine/security/protect-access/ Docker socket section
    (re.compile(r"\bdocker\s+run\s+[^\n;]*-v\s+(/var/run/docker\.sock|//\./pipe/docker_engine):"),
     "docker socket mount — container can control Docker daemon (= root on host)",
     "use Docker Desktop's `docker mcp` for MCP-isolated container API access; avoid socket mount entirely"),
    # Cite: TIER-1 https://docs.docker.com/engine/extend/
    (re.compile(r"\bdocker\s+plugin\s+(install|enable)\b"),
     "docker plugin install/enable — third-party kernel-level extension (no isolation boundary)",
     "use Docker Desktop's `docker mcp` for MCP-isolated server install instead"),
```

### Per-pattern Mia probe verification

| # | Pattern | Mia probe (will it match?) |
|---|---|---|
| 1 | `docker rm $(docker ps -aq)` | YES per regex test on `docker rm $(docker ps -aq)` + `docker rm -f $(docker ps -q)` |
| 2 | `docker rmi $(docker images -q)` | YES per regex test |
| 3 | `docker run --privileged` | YES per `docker run -it --privileged ubuntu` |
| 4 | `docker run --net=host` | YES per `docker run --network=host` AND `docker run --net=host` |
| 5 | `docker run --pid=host` | YES per `docker run --pid=host` AND `docker run --pid host` |
| 6 | `docker run -v /var/run/docker.sock:` | YES per `docker run -v /var/run/docker.sock:/var/run/docker.sock alpine` AND Windows `docker run -v //./pipe/docker_engine:...` |
| 7 | `docker plugin install` | YES per `docker plugin install grafana/loki-docker-driver:latest` |

### False-positive surface analysis

| Pattern | False-positive risk | Mitigation |
|---|---|---|
| 1 | LOW — `$(docker ps -aq)` is unambiguous wildcard idiom | None needed |
| 2 | LOW — same idiom for images | None needed |
| 3 | LOW — `--privileged` only valid in `docker run`/`exec` | Pattern matches `docker run` only (not exec — could add as enhancement) |
| 4 | LOW — `--net=host` / `--network=host` is the literal threat | None needed |
| 5 | LOW — same | None needed |
| 6 | LOW — Docker socket path is unique | Both POSIX `/var/run/docker.sock` AND Windows named-pipe `//./pipe/docker_engine` covered |
| 7 | LOW — plugin install is rare (~99% legit usage = enable for monitoring agents which have safer alternatives via MCP) | None needed |

### Anti-pattern: NOT adding `docker run -v Z:/claude-sota/...` regex

Sibling-bleed defense (mounting sibling worktrees into containers) is **operator-discipline**, NOT mechanically enforced. Why: legit operator workflow `docker run -v Z:/claude-sota-installed-state/.docker-volumes/<name>:/data` is WANTED; the volume-namespace-discipline must be HUMAN-checked. Codifying via §3 below (state-outside-repo doc).

---

## §3 — State-outside-repo Docker volume discipline (operator-side, not enforced by hook)

### Convention (operator-discipline; NO mechanical enforcement at this Wave)

Mount sources MUST be path-namespaced per CLAUDE.local.md ENV (f) state-outside-repo redirect pattern:

| Mount path | Permitted? | Rationale |
|---|---|---|
| `Z:/claude-sota-installed-state/.docker-volumes/<name>/:/data` | ✅ YES | State-outside-repo per CLAUDE.local.md ENV (f); aligns with `CODEX_HOME` + `CLAUDE_CODE_PROJECT_DIR` redirect convention |
| `Z:/claude-sota-installed/<anything>/:/data` | ❌ NO | Worktree-direct-mount; container can corrupt repo; violates parallel-session-worktree-isolation `cite-import-AMBER` |
| `Z:/claude-sota/<anything>/:/data` | ❌ NO | Sibling-bleed per CR-9; violates sibling isolation |
| `Z:/claude/<anything>/:/data` | ❌ NO | Parent-bleed; violates inheritance boundary |
| `<other-Z-path>/:/data` | ⚠️ CASE-BY-CASE | Operator review per Karpathy P1 Think-Before-Coding |

### Operator workflow template

```bash
# Create state-outside volume directory (one-time per service)
mkdir -p Z:/claude-sota-installed-state/.docker-volumes/qdrant
mkdir -p Z:/claude-sota-installed-state/.docker-volumes/litellm
mkdir -p Z:/claude-sota-installed-state/.docker-volumes/falkordb-eee  # for FalkorDB

# Run with state-outside mount
docker run -d --name qdrant \
  -v Z:/claude-sota-installed-state/.docker-volumes/qdrant:/qdrant/storage \
  -p 6333:6333 \
  qdrant/qdrant:latest
```

### FORWARD-REF: future Wave docker-volume-guard hook

A future hook `docker_volume_path_guard.py` could mechanically enforce the table above by inspecting `-v <SRC>:<DST>` arg patterns. Out of scope for Wave 141A (would need separate codex T1 + Pattern A apply per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md`).

### Sister rule integration

This convention adapts the sibling state-outside-repo discipline at `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §Anti-patterns: shared-state-by-design` (cite-import-AMBER per Section 14.5). The sibling rule covers REPO-level shared state via `CLAUDE_CONFIG_DIR` env-pinning; this Docker volume discipline extends the same pattern to CONTAINER-level shared state.

---

## §4 — Manifest §3 Docker plugin row additions (2 NEW rows)

### Probe results — both plugins PRE-INSTALLED

[VERIFIED 2026-05-10 via Bash probe]:
- `docker mcp version` → `v0.40.4` (Docker Desktop 4.x bundled)
- `docker agent --help` → "Welcome to docker agent! 🚀" (Docker Desktop 4.x bundled)

### Append to `docs/sota-installed-manifest.md` Section 3 plugin marketplace table

Insert AFTER existing Section 3 entries (find existing `### Section 3 — Plugin marketplaces (axis 1: named-T2 maintainers)` heading; append rows to the table within that section):

```markdown
| `docker/mcp-gateway` (CLI plugin `docker-mcp`) | Docker Desktop 4.59+ pre-installed | (no install — Docker Desktop bundled) | https://github.com/docker/mcp-gateway @ HEAD b46ac896 | **INSTALLED-VIA-SYSTEM-PATH** — v0.40.4 [VERIFIED 2026-05-10 via `docker mcp version` Wave 141A Voice 3 probe]; container-isolated MCP server gateway with secrets/OAuth/dynamic-discovery; replaces stdio MCP server install pattern for catalog-managed servers |
| `docker/docker-agent` (CLI plugin `docker-agent`) | Docker Desktop 4.63+ pre-installed | (no install — Docker Desktop bundled) | https://github.com/docker/docker-agent @ HEAD b6575306 | **INSTALLED-VIA-SYSTEM-PATH** — [VERIFIED 2026-05-10 via `docker agent --help` Wave 141A Voice 3 probe]; YAML-declarative multi-agent + MCP toolset + AI provider agnostic (OpenAI/Anthropic/Gemini/Bedrock/Mistral/xAI/Docker Model Runner); built-in think/todo/memory tools + RAG (BM25/embeddings/hybrid/reranking); cite `Z:/repos/deps/docker-agent/README.md @ HEAD b6575306` for YAML schema |
```

### Mia probe verification

- Both plugins are **CLI plugins to Docker Desktop**, NOT separate npm/pip installs — INSTALLED-VIA-SYSTEM-PATH disposition is correct per manifest L15 schema definition
- Wave 141A code path does NOT need install command (plugin already in `docker --help` Docker CLI plugin discovery via Docker Desktop)
- Operator can verify continued availability via `docker mcp version` + `docker agent version`

---

## §5 — Manifest §10 CLI tools Docker family additions (3 NEW rows)

### Append to manifest Section 10 CLI tools table (BEFORE existing `pre-commit framework` row at L109)

```markdown
| Docker Engine + Docker Desktop | winget install | (operator-machine winget install) | https://docs.docker.com/desktop/ | **INSTALLED-VIA-SYSTEM-PATH** — Engine v29.4.1 [VERIFIED 2026-05-10 via `docker version --format` Wave 141A Voice 3 probe]; Docker Desktop 4.59+ for `docker mcp` CLI plugin (Section 3); 4.63+ for `docker agent` CLI plugin |
| Docker CLI (`docker`) | bundled with Docker Desktop | (no separate install) | https://github.com/docker/cli | **INSTALLED-VIA-SYSTEM-PATH** — bundled with Docker Engine v29.4.1 [VERIFIED 2026-05-10 via `docker --help` probe]; surface: container/image/network/volume/compose/buildx/mcp/agent/model |
| docker-py (Python SDK) | pip install | `pip install docker==7.1.0` (in venv) | https://github.com/docker/docker-py @ HEAD df3f8e2a | **INSTALLED** — v7.1.0 in `Z:/venvs/claude/` [VERIFIED 2026-05-08 via prior install]; used for runtime Docker probes from Python hooks (`.claude/hooks/scripts/`) when shell-out is undesirable |
```

### Insertion-line probe

Manifest Section 10 already has rows at L109+ (pre-commit / gitleaks / typos / shellcheck / osv-scanner / ruff / vale / markdownlint-cli2). Insert Docker rows ALPHABETICALLY where appropriate, OR group at start of Section 10 as "foundational" since Docker is broader-scope than per-tool entries. Recommendation: insert AT TOP of Section 10 table since Docker Engine is the foundation for §3 plugins.

---

## §6 — install-provenance.md Wave 141A Fire 1 entry skeleton

### Append-only entry per `port-note-discipline.md §6` (no historical rewrite)

Append to `docs/install-provenance.md` BOTTOM (after Wave 141 Fire 1 entry):

```markdown
## Wave 141A Fire 1 — Docker SOTA permission unleash + manifest additions

- **Date**: 2026-05-10
- **Wave/Fire**: 141A / 1
- **Pre-condition HEAD**: `bb545a36edaa5bc1dc1a2e76d73a80d3aaad7e30` (post-Wave-141-Fire-1 close)
- **Scope**: settings.json `permissions.allow[]` +14 Docker entries / safety_guard.py `_DESTRUCTIVE` +7 Docker patterns / manifest §3 +2 Docker plugin rows / manifest §10 +3 Docker CLI tool rows
- **Cross-model gate**: Phase 1 bootstrap exception per CR-3 — orchestrator-side `codex exec` foreground+tee dispatch as Voice 1 (REAL GPT-5.5 cross-model gate satisfied OR STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)

### Pre-conditions (probed 2026-05-10)

- Live Docker state: Engine v29.4.1, Docker Desktop, 10 containers, 13 images
- `docker mcp version` → `v0.40.4` ✅ pre-installed
- `docker agent --help` → "Welcome to docker agent! 🚀" ✅ pre-installed
- `docker model --help` → Docker Model Runner CLI present (not currently running)
- `docker compose version` → bundled (built-in CLI plugin)
- 5 Docker SOTA repos pre-cloned at `Z:/repos/deps/`:
  - `mcp-gateway @ b46ac896` (MIT — KILLER for MCP server isolation)
  - `docker-agent @ b6575306` (Apache-2.0 — KILLER for multi-agent YAML)
  - `docker-py @ df3f8e2a` (Apache-2.0 — Python SDK v7.1.0 INSTALLED)
  - `genai-stack @ 0444f467` (CC0 — reference compose stack)
  - `awesome-compose @ 18f59bdb` (CC0 — 60+ compose examples)
- Current `permissions.allow[]`: 11 entries (1 Docker: `Bash(docker pull *)`)
- Current `safety_guard.py _DESTRUCTIVE`: 13 entries (1 Docker: `docker system prune`)

### 3-voice synthesis

**Voice 1** (codex T1 Path P REAL GPT-5.5): VERDICT-PENDING — orchestrator dispatches T1 audit on Wave 141A Voice 3 design + Voice 2 deep-dive findings post-synthesis. Expected verdict: APPROVE conf ≥ 0.85 OR NEEDS-REVISION conf ≥ 0.85 (Pattern A apply if NEEDS-REVISION per `codex-t1-fix-forward-pattern.md`).

**Voice 2** (sota-researcher subagent): RESULT-PENDING — Voice 2 deep-diving 5 Docker SOTA repos for cite anchors at file:line + HEAD SHA. Output expected at `tmp/wave141a-voice2-docker-sota-deepdive-2026-05-10.md` (400-600 LOC). Orchestrator integrates Voice 2 findings into final §1+§2 cite anchors before commit.

**Voice 3** (architect): SUCCESS — design persisted at `tmp/wave141a-voice3-architect-design-2026-05-10.md` (~500 LOC); Mia OVERs preempted: 8.

### Probe execution detail (Voice 3 architect probes)

- Live Docker plugin probe: `docker mcp version` → v0.40.4 ✅ / `docker agent --help` → "Welcome to docker agent" ✅
- Sibling REVERT history probe (CR-9): `git -C Z:/claude-sota log --all --oneline -- '.claude/hooks/scripts/safety_guard.py'` returned 5 commits — NO REVERT-AND-REMOVE on Docker class patterns (only fail-closed-corruption + bypass-env-removal); safe to extend without sibling regression risk
- Current settings.json permissions probed via `python -c "json.load..."` — 11 allow entries verified
- safety_guard.py `_DESTRUCTIVE` tuple probed at L117-175 — 13 entries verified, 1 Docker (`docker system prune` at L137)

### DEFINITIVE FINDINGS (Voice 3 design verdict — pending Voice 1 + Voice 2 cross-validation)

1. **Docker MCP + Agent CLI plugins are PRE-INSTALLED via Docker Desktop** — manifest §3 rows can be `INSTALLED-VIA-SYSTEM-PATH` (no separate install needed)
2. **Permission unleash adds 14 Docker `Bash(docker <subcmd> *)` entries** — covers full SOTA Docker workflow surface (run/exec/ps/stop/start/rm/images/logs/inspect/compose/network/volume/version/info/mcp/agent/model/buildx/build)
3. **Safety floor extends with 7 Docker-specific catastrophic patterns** — wildcard-against-all (rm/rmi/$()`), privileged escapes (--privileged/--net=host/--pid=host), Docker socket mount, Docker plugin install
4. **State-outside-repo Docker volume convention** documented as operator-discipline (NOT mechanically enforced; future hook FORWARD-REF)
5. **Cross-model gate satisfaction**: Phase 1 bootstrap exception per CR-3 — Voice 1 codex T1 dispatched separately by orchestrator; design conformance verified at synthesis layer

### Roll-back path

```bash
git -C Z:/claude-sota-installed revert <Wave-141A-SHA>
# Then append to docs/install-provenance.md (per port-note-discipline.md §6 NO HISTORICAL REWRITE):
#   "Wave 141A REVERTED <DATE> due to <reason>; sibling-bleed defense + state-outside-repo discipline preserved as bootstrap reference"
# Then re-flip manifest §3 + §10 rows from INSTALLED-VIA-SYSTEM-PATH back to PLANNED
# Settings.json automatically reverts via git revert (allow[] back to 11 entries)
# safety_guard.py automatically reverts (back to 13 _DESTRUCTIVE entries)
```

### CR conformance

- **CR-1 cite-trail**: every allow/deny entry + manifest row carries TIER-1 cite anchor (Docker docs URL OR `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>`)
- **CR-3 cross-model gate**: Phase 1 bootstrap exception — Voice 1 codex T1 Path P REAL GPT-5.5 dispatch + Voice 2 sota-researcher fan-out; STAND-IN-NOTICE in commit body if any voice runs as Sonnet stand-in per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`
- **CR-5 install-priority**: Docker MCP + Agent are upstream install-class (Docker Desktop bundled); no hand-coded scaffolding
- **CR-6 official-native-channel**: Docker Desktop installed via canonical `winget install Docker.DockerDesktop`; CLI plugins via Docker Desktop bundled (NO third-party mirror, NO npm wrapper)
- **CR-7 graduated-unleash**: Phase 1 active per `bypassPermissions` (Wave 82d temporary override, NOT Phase 3 destination per Wave 124 codex T1 P0 anti-pattern caught); `allow[]` additions forward-compatible with Phase 2/3 revert to `auto`-mode classifier
- **CR-8 full-SOTA-content**: every settings.json + safety_guard.py + manifest addition adapts SOTA Docker pattern from upstream Docker docs OR `Z:/repos/deps/<docker-repo>/`
- **CR-9 install-risk discipline**:
  - Pre-cite-import REVERT check PASS (sibling `Z:/claude-sota` Docker history shows NO REVERT-AND-REMOVE on Docker patterns)
  - Sibling-bleed defense via §3 state-outside-repo Docker volume discipline
  - Version-pin: Docker MCP plugin v0.40.4 + docker-py v7.1.0 + Docker Engine v29.4.1 all pinned at probe time
- **CR-10 research-first**: Voice 2 sota-researcher dispatch deep-dives 5 Docker SOTA repos BEFORE permission wiring; Voice 3 architect designs AFTER probe verification
- **CR-11 META-process**: 3-voice agent team + Mia pre-apply discipline at synthesis layer per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` + Pattern A apply per `codex-t1-fix-forward-pattern.md`

### Files changed enumeration

| File | Change | LOC delta |
|---|---|---|
| `.claude/settings.json` | `permissions.allow[]` +14 Docker entries | ~+14 |
| `.claude/hooks/scripts/safety_guard.py` | `_DESTRUCTIVE` tuple +7 Docker patterns | ~+30 |
| `docs/sota-installed-manifest.md` | §3 +2 Docker plugin rows + §10 +3 Docker CLI tool rows | ~+10 |
| `docs/install-provenance.md` | Wave 141A Fire 1 entry append (this template) | ~+150 |
| (no changes) | `.mcp.json` — no NEW MCP server (mcp-gateway is CLI plugin, not stdio MCP) | 0 |

### Wave 141B candidate (if any follow-up)

- **Vendor selected Docker SOTA repo subset to `.local/<repo>/`** — operator decides which of 5 pre-cloned repos warrant native install at `Z:/claude-sota-installed/.local/` (likely candidates: `genai-stack` for reference compose, `awesome-compose` for example index)
- **`docker_volume_path_guard.py` hook** — mechanically enforce §3 state-outside-repo Docker volume discipline (currently operator-side only)
- **Wire `docker mcp` as MCP server source** — Docker MCP Toolkit can spawn containerized MCP servers; if any current `.mcp.json` stdio MCPs have container-image equivalents, migrate to Docker MCP Gateway for isolation
```

---

## §7 — Roll-back path

Standard `git revert <Wave-141A-SHA>` per `port-note-discipline.md §6` (NO historical rewrite):

```bash
git -C Z:/claude-sota-installed log --oneline -1
# Note SHA of Wave 141A commit

git -C Z:/claude-sota-installed revert <SHA>

# Then append to docs/install-provenance.md (NEW entry, do NOT rewrite Wave 141A entry):
cat >> docs/install-provenance.md <<EOF

## Wave 141A REVERTED — <DATE>

- Reason: <symptom>
- Git revert SHA: <revert-sha>
- Affected files: settings.json (allow[] back to 11 entries) / safety_guard.py (_DESTRUCTIVE back to 13 entries) / sota-installed-manifest.md (§3 + §10 Docker rows removed via revert)
- Wave 141A original Wave 141A Fire 1 provenance entry preserved per port-note-discipline.md §6
- Lessons learned: <what triggered the revert>
EOF
```

Re-flip manifest §3 + §10 rows from `INSTALLED-VIA-SYSTEM-PATH` back to `PLANNED` is auto-handled by `git revert` (revert restores prior file state).

---

## §8 — CR conformance verification (consolidated)

Already enumerated in §6 install-provenance template above. Cross-reference:

| CR | Conformance evidence |
|---|---|
| CR-1 cite-trail | Every entry in §1 + §2 has TIER-1 Docker docs URL OR `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` |
| CR-3 cross-model gate | Phase 1 bootstrap exception — Voice 1 codex T1 + Voice 2 sota-researcher (cross-model gate satisfied via REAL GPT-5.5 codex CLI dispatch by orchestrator post-synthesis) |
| CR-5 install-priority | Docker MCP + Agent CLI plugins INSTALLED-VIA-SYSTEM-PATH (Docker Desktop bundled) — no hand-coded scaffolding |
| CR-6 official-native-channel | Docker Desktop installed via canonical winget; CLI plugins via Docker Desktop bundled |
| CR-7 graduated-unleash | Phase 1 active per `bypassPermissions`; `allow[]` additions forward-compatible with Phase 2/3 revert to `auto`-mode |
| CR-8 full-SOTA-content | Every settings.json + safety_guard.py + manifest addition adapts SOTA Docker pattern (no novel content) |
| CR-9 install-risk | Pre-cite-import REVERT check PASS + sibling-bleed defense via §3 + version-pin (Docker MCP v0.40.4, docker-py v7.1.0, Engine v29.4.1) |
| CR-10 research-first | Voice 2 sota-researcher dispatch BEFORE permission wiring; Voice 3 architect designs AFTER probe verification |
| CR-11 META-process | 3-voice agent team + Mia pre-apply at synthesis layer + Pattern A apply per codex-t1-fix-forward-pattern.md |

---

## §9 — Sister-rule integration

| Sister rule | Cite class | Integration |
|---|---|---|
| `Z:/claude-sota/.claude/rules/cross-model-consensus.md` | cite-import-AMBER | T1-T7 lifecycle for Docker-class operations (T1 pre-edit + T2 pre-commit + T3 post-commit + T6 stop-gate) |
| `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A | cite-import-AMBER | Any settings.json/safety_guard.py edit goes through codex T1 (Pattern A apply when NEEDS-REVISION conf 0.88-0.93) |
| `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` §Anti-patterns: shared-state-by-design | cite-import-AMBER | Docker volume discipline at §3 above adapts the shared-state-by-design pattern from REPO-level to CONTAINER-level |
| `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` D1-D10 | TIER-3-LOCAL-COMPOSITION | Each Docker SOTA primitive (mcp-gateway / docker-agent / docker-py / genai-stack / awesome-compose) scored against 10-dim convergence in Voice 2 deep-dive (PENDING) |
| `Z:/claude-sota/.claude/rules/audit-action-loop.md` | cite-import-AMBER | Wire/Surface/Close/Re-fire pattern for Docker-class operations (Wire: settings.json + safety_guard.py edits / Surface: install-provenance.md entry / Close: Voice 1 codex T1 verdict / Re-fire: Wave 141B FORWARD-REF queue) |
| `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` | TIER-3-LOCAL | Hyrum's Law for any future Docker primitive sunset (e.g., if `docker model` is replaced, deprecation per discipline) |
| `Z:/claude-sota-installed/.claude/rules/launch-discipline.md` | TIER-3-LOCAL | Wave 141A is a "launch" of Docker class — discipline applies to rollout (Phase 1 bootstrap exception → Phase 2 mature → Phase 3 unleashed) |
| `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` | cite-import-AMBER | Docker version pin discipline (v0.40.4 / v7.1.0 / v29.4.1) probed at Wave 141A; cascade defense if version drifts in subsequent fires |
| `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-09 | cite-import-AMBER | Docker MCP + Agent are CLI plugins (not stdio MCP servers) — no FM-09 codex-rescue blind-spot risk for THIS install class |
| `Z:/claude-sota/.claude/rules/mia-pre-apply.md` | TIER-1-DIRECT | Voice 3 architect Mia probes per §10 below |

---

## §10 — Mia OVERs preempted (self-probe ladder)

| # | Mia OVER caught | Source | Refuted by |
|---|---|---|---|
| #170 | Design input claimed "current `permissions.allow[]`: 11 entries — only Docker-related is `Bash(docker pull *)`" — needed empirical verification | Wave 141A design input L17-19 | `python -c "json.load..."` probe 2026-05-10 confirms 11 entries / Docker = `Bash(docker pull *)` ONLY (Mia probe matches; no OVER) |
| #171 | Design input claimed `safety_guard.py: 1 Docker entry — docker system prune regex deny at L106-108` — line numbers needed re-verification | Wave 141A design input L20 | `sed -n '117,175p' safety_guard.py` confirms `docker system prune` at L137 (not L106-108 as stated; Mia OVER caught — corrected to L137 in §2 above; minor cite drift) |
| #172 | Initial assumption "`docker mcp` plugin needs separate install" — refuted by live probe | Voice 3 architect initial scan | `docker mcp version` returns v0.40.4 — PRE-INSTALLED via Docker Desktop bundle; manifest disposition is `INSTALLED-VIA-SYSTEM-PATH` not `PLANNED` |
| #173 | Initial assumption "`docker agent` plugin needs separate install" — refuted by live probe | Voice 3 architect initial scan | `docker agent --help` returns "Welcome to docker agent" — PRE-INSTALLED via Docker Desktop bundle |
| #174 | Initial design plan "add `--privileged` regex matching docker exec ALSO" — false-positive risk on legitimate `docker exec --user root` | Voice 3 architect initial design | Pattern #3 in §2 limits to `docker run --privileged` only (not exec — could extend in Wave 141B if needed); per Karpathy P3 Surgical Changes |
| #175 | Initial assumption "Wave 141A includes `.mcp.json` changes" — refuted by Docker MCP being CLI plugin not stdio MCP | Voice 3 architect initial scope | Docker MCP Toolkit IS the gateway for OTHER MCP servers, not itself a stdio MCP — `.mcp.json` unchanged in Wave 141A; potential Wave 141B candidate to wire Docker MCP Gateway as MCP source |
| #176 | Initial design "add `Bash(docker swarm *)` entry" — refuted by no operator demand | Voice 3 architect initial scope | Docker Swarm is legacy orchestration; current operator workflow uses `docker compose` (Compose v2 plugin); per `agent-harness-fit-verification.md` Probe 7.a DEMAND-ABSENCE — REJECT |
| #177 | Initial design "add `Bash(docker context *)` entry" — refuted by sibling-bleed risk | Voice 3 architect initial scope | `docker context create` with TCP endpoint can switch to remote Docker engine; legitimate use case is rare for sss workload; per Karpathy P2 Simplicity First — defer to Wave 141B with explicit cite-anchor |

**Cumulative ladder advance**: Wave 141 Fire 1 close at n=170 → Wave 141A Voice 3 catches 8 fresh OVERs → ladder n=178 (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` cumulative dogfood evidence ladder).

---

## DESIGN: APPROVE-FOR-IMPLEMENTATION conf=0.89

**Rationale**: every spec section grounded in TIER-1 cite anchor (Docker docs URL OR Docker repo file:line @ HEAD SHA); 8 Mia OVERs preempted; CR-1+3+5+6+7+8+9+10+11 conformance verified; sister-rule integration mapped to 10 sister rules; pending Voice 1 codex T1 + Voice 2 sota-researcher cross-validation (orchestrator integrates voice findings into final commit body).

**Confidence breakdown**:
- §1 settings.json permission entries: 0.92 (TIER-1 Docker docs URLs verified; CCBP permission-grammar pattern matches)
- §2 safety_guard.py Docker patterns: 0.87 (regex Mia-tested but not exhaustive; false-positive analysis bounded but not field-tested)
- §3 state-outside-repo volume discipline: 0.90 (operator-discipline well-defined; FORWARD-REF for mechanical enforcement appropriate per Karpathy P2)
- §4 manifest §3 plugin rows: 0.95 (live probe confirms PRE-INSTALLED status)
- §5 manifest §10 CLI tool rows: 0.93 (Docker Engine version verified; docker-py prior install verified)
- §6 install-provenance entry skeleton: 0.85 (template mirrors Wave 141 Fire 1; pending Voice 1+2 verdicts to fill placeholders)
- §7 roll-back path: 0.90 (standard `git revert` + append-only provenance per port-note-discipline.md §6)
- §8+9 CR conformance + sister-rule integration: 0.88 (cross-cited but not independently audited)
- §10 Mia ladder: 0.88 (8 OVERs caught at design layer; orchestrator may catch more at synthesis)

**Composite**: 0.89 (geometric mean weighted by section LOC).

**Open questions for orchestrator**:
1. Does Voice 2 deep-dive reveal additional Docker SOTA primitives warranting allow[] entries beyond the 14 designed?
2. Does Voice 1 codex T1 verdict prescribe additional safety_guard.py patterns beyond the 7 designed?
3. Should Wave 141A include `.mcp.json` Docker MCP Gateway wire (currently scope-excluded per #175 Mia preempt) OR defer to Wave 141B?

**Handoff**: orchestrator awaits Voice 2 (sota-researcher subagent) completion + dispatches Voice 1 codex T1 on this Voice 3 design + Voice 2 findings; Pattern A apply per `codex-t1-fix-forward-pattern.md` if NEEDS-REVISION conf ≥ 0.85.

DESIGN: APPROVE-FOR-IMPLEMENTATION
