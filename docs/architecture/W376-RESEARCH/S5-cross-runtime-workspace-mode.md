# S5 — Cross-Runtime Workspace-Mode Prior Art

**Wave**: W376
**Stream**: S5 (research-only)
**Source**: 3 SOTA agent runtimes for cross-repo consensus:
- `paul-gauthier/aider` (Python repo agent)
- `cline/cline` (VSCode extension agent)
- `princeton-nlp/SWE-agent` → moved to `SWE-agent/SWE-agent` (research agent runtime)
**Status**: DONE (2026-05-22)

## §1 Aider workspace mode

**Verdict: Aider has NO in-process feature-flag for local-vs-container; container mode is an *external* runtime choice via Docker, not a CLI switch.**

- The Aider CLI (`aider/main.py`) does NOT expose `--docker` / `--local` / `--workspace-mode` selectors. The same `aider` Python binary runs identically inside or outside a container — Aider is unaware of its execution environment.
- Container mode is achieved by running the official Docker images per `https://aider.chat/docs/install/docker.html`:
  - `paulgauthier/aider` (core, small)
  - `paulgauthier/aider-full` (with optional extras: interactive help, browser GUI, Playwright)
- The only Aider-internal "I'm in Docker" signal is the env-var `AIDER_DOCKER_IMAGE`, set in the official Dockerfile (`docker/Dockerfile:ENV AIDER_DOCKER_IMAGE=paulgauthier/aider` and `=paulgauthier/aider-full`) — Aider's `/run` slash-command checks it to warn users that shell commands execute inside the container, not on the host (per docs `Limitations` section).
- **Pattern**: Aider treats container vs local as a *deployment decision*, not a *runtime config*. The agent is environment-agnostic; the user picks the wrapper.

## §2 Cline workspace mode

**Verdict: Cline has explicit multi-mode workspace selection via `CLINE_SESSION_BACKEND_MODE` env var with 4 modes — the closest cross-runtime precedent to W376's `local`/`remote` Literal.**

Per DeepWiki query (cline/cline indexed):
- **Default execution**: Local hub daemon — `cline hub ensure` pre-warms a local daemon; the CLI submits tasks, daemon executes via VSCode extension API (in-process file edits, linter monitoring, diff views) and subprocesses on host (terminal commands via VSCode shell integration, browser actions via Puppeteer).
- **Backend mode selector**: `CLINE_SESSION_BACKEND_MODE ∈ {local, hub, remote, auto}`:
  - `local` — in-process execution (no daemon hop)
  - `hub` — spawn/reuse local hub daemon (default)
  - `remote` — containerized/remote execution
  - `auto` — runtime selection
- **Sandbox knob**: `CLINE_SANDBOX=1` forces sandbox mode; `CLINE_SANDBOX_DATA_DIR` redirects sandbox state.
- **Safety knob**: `CLINE_COMMAND_PERMISSIONS` JSON allow/deny policy; `YOLO Mode` (settings UI) auto-approves all actions.

**File:line citations**: Cline source is TypeScript under `src/`; specific files not surfaced by DeepWiki query, but env-var contract is documented in user-facing settings docs (`docs/features/auto-approve.mdx`, `README.marketplace.md`).

## §3 SWE-agent workspace mode

**Verdict: SWE-agent is containerized by design via SWE-ReX deployment abstraction; container is the DEFAULT, per-task lifecycle, with pluggable deployment-type (docker, modal, etc.).**

- Source: `sweagent/environment/swe_env.py` — `SWEEnv` class wraps `swerex.deployment.abstract.AbstractDeployment`.
- **Default deployment**:
  ```python
  deployment: DeploymentConfig = Field(
      default_factory=lambda: DockerDeploymentConfig(
          image="python:3.11", python_standalone_dir="/root"),
      description="Deployment options.",
  )
  ```
  (cite: `sweagent/environment/swe_env.py` Field block — surfaced via context-mode FTS5).
- **Image override**: `--env.deployment.image=python:3.12` CLI flag (per `docs/usage/cl_tutorial.md`); arbitrary Docker Hub image accepted.
- **Deployment-type switch**: `--env.deployment.type=modal` swaps from local Docker to Modal cloud sandbox; requires `pip install 'swe-rex[modal]'`. Other SWE-ReX backends include Kubernetes, Daytona, etc.
- **Per-task lifecycle**: each `sweagent run` invocation spawns a fresh deployment; lifecycle is task-scoped, not persistent.
- **No `--no-docker` / `--local` flag**: SWE-agent does NOT expose a "skip Docker, run on host" mode. Local execution is achieved only by setting deployment to a custom local-shell type (rare; not a documented pattern).

## §4 Common patterns across 3 runtimes

| Aspect | Aider | Cline | SWE-agent | Consensus |
|---|---|---|---|---|
| Container mode | External wrapper | `BACKEND_MODE=remote` | Default | All 3 support container |
| Local mode | Default | `BACKEND_MODE=local` | NOT supported (by design) | 2/3 default local |
| Mode-selector shape | None (env-agnostic) | Env var | CLI flag | Divergent |
| Default | Local Python install | Local hub daemon | Docker container | Diverges by use-case |
| Image pin | Tag-only (`paulgauthier/aider:latest`) | N/A (no canonical image) | Tag-only (`python:3.11` default) | All tag-based, none digest-pinned by default |
| Cleanup | Docker `--rm` flag (user-side) | Daemon lifecycle | SWE-ReX deployment.close() | Per-runtime |

**Key divergence**: Aider treats container as transparent (no CLI awareness); SWE-agent treats container as native (no local mode); Cline straddles both with explicit env-var selector.

## §5 Implications for W376 TaskSpec.workspace_mode

**Verdict: `Literal['local','remote']` is correct for v1; matches Cline's `local`/`remote` semantics (closest prior art). YAGNI cuts hold.**

- Aider's "no-flag" pattern is appealing for simplicity but unworkable for W376 where the orchestrator (Temporal worker) MUST know whether to spawn a Docker container vs invoke locally.
- SWE-agent's "container-always" pattern is too restrictive for a runtime that wants degraded-mode local fallback when Docker is unavailable (per W376 brainstorm §3 "Docker-down survivability").
- Cline's 4-mode (`local`/`hub`/`remote`/`auto`) is over-engineered for v1 — `hub` is a Cline-specific daemon pattern (irrelevant to W376), and `auto` introduces non-determinism we don't want before profiling real workloads.
- **Recommendation**: Keep `Literal['local','remote']`. If Modal/cloud sandbox demand emerges later (W377+), extend to `Literal['local','remote','cloud']` with explicit operator-sign.

## §6 Container-image-pinning conventions

**Verdict: All 3 runtimes pin by TAG, not digest. Industry SOTA (OSSF Scorecard, pinned-dependencies check) recommends digest-pinning, but no surveyed agent runtime follows it.**

- **Aider**: `paulgauthier/aider` / `paulgauthier/aider-full` — no version tag in docs; users implicitly pull `:latest`. Dockerfile base: `FROM python:3.12-slim-bookworm AS base` — tag-pinned to Debian Bookworm + Python 3.12, NOT digest.
- **SWE-agent**: Default `python:3.11` (no minor/patch); user-override `--env.deployment.image=python:3.12` (still tag). SWE-bench Pro adopts per-instance digest tags (`jefzda/sweap-images:{dockerhub_tag}`) for reproducibility, but core SWE-agent does NOT.
- **Cline**: No canonical container image (in-process VSCode extension).
- **W376 precedent**: Local `Z:/claude-sota-installed` already does digest-pinning for CR-9 critical containers (cli-proxy-api, cache-fix-proxy — pinned by `@sha256:...`). W376 SHOULD follow CR-9 pattern, NOT prior-art SOTA pattern.

## §7 Cleanup-on-error pattern

**Verdict: All 3 runtimes use library-internal lifecycle close; W376 already has equivalent via P1.7 `_async_cleanup` + P4.6 test coverage (5/5 passing).**

- **Aider**: Relies on user-passed `docker run --rm` flag; if container created without `--rm`, orphans persist. No agent-side reaper.
- **SWE-agent**: SWE-ReX `AbstractDeployment.stop()` (async, called by `SWEEnv.close()`). On crash, deployment teardown is best-effort — orphan containers possible if SIGKILL.
- **Cline**: Hub daemon manages session lifecycle; on crash, daemon survives and reaps stale sessions on next request.
- **W376 pattern** (per W375 P1.7 + P4.6, verified via `pytest tests/test_async_cleanup.py` 5/5 PASSED 2026-05-23 00:53): `_async_cleanup(conv, workspace, container_id, net_name)` with `asyncio.shield` + task-await-then-reraise + best-effort exception-swallow + explicit `docker kill` + network removal. **W376 cleanup is MORE robust than all 3 prior-art runtimes** because it uses `asyncio.shield` to defer cancellation until cleanup completes (Temporal activity contract requirement).

## §8 Default-mode decision rationale

**Verdict: W376 default `'remote'` (container) aligns with SWE-agent's design choice; Aider+Cline default `local` but for different reasons.**

- **Aider**: Defaults local because Aider is a CLI tool, not a sandbox harness; container is opt-in for users who want isolation. Pip-install path is the primary distribution channel.
- **Cline**: Defaults local-hub because the VSCode extension IS the local execution surface; remote mode is for enterprise/cloud deploys.
- **SWE-agent**: Defaults Docker because the agent is a research benchmark harness — REPRODUCIBILITY requires container isolation; local mode defeats the purpose.
- **W376 decision**: `'remote'` (container) default matches SWE-agent's reproducibility argument. The orchestrator (Temporal worker) executes untrusted LLM-generated code; container isolation is a security primitive, not a perf knob. `'local'` is escape-hatch for Docker-down / no-Docker-available degraded mode.

## §9 Cite-anchor cluster (≥3-org-distinct)

1. **paul-gauthier / Aider** (org 1, individual maintainer): `docker/Dockerfile:ENV AIDER_DOCKER_IMAGE=paulgauthier/aider` + `https://aider.chat/docs/install/docker.html` (Limitations section: `/run` runs inside container).
2. **cline-bot / Cline** (org 2, cline-bot/Anthropic-adjacent): `CLINE_SESSION_BACKEND_MODE ∈ {local,hub,remote,auto}` env var + `YOLO Mode` + `CLINE_SANDBOX=1` (DeepWiki indexed query 2026-05-22).
3. **SWE-agent / SWE-agent** (org 3, formerly princeton-nlp, now community-maintained at `SWE-agent/SWE-agent`): `sweagent/environment/swe_env.py:deployment: DeploymentConfig = Field(default_factory=lambda: DockerDeploymentConfig(image="python:3.11", ...))` + `docs/usage/cl_tutorial.md:--env.deployment.type=modal` + `--env.deployment.image=python:3.12`.
4. **Bonus 4th org**: OSSF Scorecard pinned-dependencies check (`https://github.com/ossf/scorecard/blob/main/docs/checks.md` — "For Dockerfiles used in building and releasing your project, pin dependencies by hash") — industry-SOTA standard NOT followed by any of the 3 surveyed agent runtimes.

**3-org-distinct floor MET**.

## §10 Recommendations for W376 feature-flag design

1. **Keep `Literal['local','remote']`** — matches Cline's `local`/`remote` semantics; simplest model that covers both observed default-mode patterns. Defer cloud/`'modal'` until operator-sign.
2. **Default `'remote'`** — matches SWE-agent's container-by-default reproducibility argument + W376's "untrusted LLM-generated code → container isolation is a security primitive" stance.
3. **Provide explicit local-mode escape hatch** — Aider's "no flag" approach is too implicit; require `workspace_mode='local'` to be set explicitly (no `auto` detection) to keep behavior deterministic.
4. **Digest-pin container images** — go beyond all 3 surveyed runtimes (none digest-pin) by following local CR-9 D6 pattern (`image: ghcr.io/openhands/agent-server@sha256:<digest>`). Add a digest-refresh ADR per minor bump.
5. **Cleanup-on-error**: Keep current `_async_cleanup` with `asyncio.shield` — more robust than any of the 3 prior-art runtimes. Already test-covered (5/5 passing).
6. **Mode-detection logic**: Read `workspace_mode` from `TaskSpec` (per-task field), NOT env var. Per-task override > global env var because the orchestrator may run mixed-mode workflows (some tasks local, some remote). This DIVERGES from Cline's global env var pattern by design.
7. **Document the YAGNI cut**: Add inline comment in `workspace_factory.py` noting the 3-runtime survey + reason for 2-mode choice. Cite this S5 document.
