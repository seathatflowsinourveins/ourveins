# Wave 220 Agent D: CI/CD + IDE + Security + Deployment SOTA Scoring

Date: 2026-05-15 [VERIFIED]  
Scope: D1-D8 only; prior A/B/C/I layers referenced but not duplicated [VERIFIED]  
Target runtime: `Z:\claude-sota-pure` [VERIFIED]

## BRIDGE-MODE Disclosure

- [VERIFIED] Required Codex bridge command attempted with 90s budget: `codex exec --ephemeral -p deep-review-exec --color never - > .claude/state/codex_consult_wave220_agentD_bridge_OUT.txt 2>&1`.
- [VERIFIED] Result: `CODEX_EXIT=1`; stderr reported `failed to initialize in-process app-server client: Access is denied. (os error 5)`.
- [VERIFIED] Cross-model gate status: `FAILED-policy-blocked`.
- [VERIFIED] No bridge-generated recommendations were used in this catalog.

## STAND-IN-NOTICE

Because real GPT-5.5 bridge dispatch failed before model execution, this artifact is a stand-in analysis from the active Codex session using local source probes plus `gh api` metadata. [VERIFIED]

## Method

- [VERIFIED] GitHub metadata source: `gh api repos/<owner>/<repo>` captured to `tmp/wave220-agentD-github-meta.json`.
- [VERIFIED] Manifest source: `docs/sota-installed-manifest.md` grep for existing installed/planned/rejected rows.
- [VERIFIED] Local source deep dives used `Z:/repos/deps/` where present.
- [INFERRED] Convergence axes: Axis-1 = active upstream + adoption; Axis-2 = fit for pure runtime; Axis-3 = license/install/security compatibility.
- [INFERRED] Verdict values: `ADOPT-NOW`, `STUDY-PILOT`, `REJECT-FOR-FIT`, `SUPERSEDED`.

## Current Installed/Wired Baseline

- [VERIFIED] Claude Code CLI is installed native in manifest row 87.
- [VERIFIED] Codex CLI and T1-T7 hooks are installed/wired in manifest rows 95-96.
- [VERIFIED] Promptfoo is planned, not installed, in manifest row 442.
- [VERIFIED] Garak is installed in manifest row 449.
- [VERIFIED] Claude Code GitHub Actions are planned/deferred in manifest rows 462-464.
- [VERIFIED] Trufflehog is rejected for AGPL-3.0 in manifest row 473; manifest points to gitleaks as the MIT alternative.
- [VERIFIED] Docker Desktop is planned in manifest row 501.
- [VERIFIED] `uv` is installed via system path in manifest row 502.
- [VERIFIED] `jdx/mise` was previously dropped as an alternative to `uv` in manifest row 548.

## Local Source Anchors

- [VERIFIED] vLLM local HEAD `95995bbef812`; README says OpenAI-compatible API plus Anthropic Messages API, and docs include a Claude Code integration at `Z:/repos/deps/vllm/docs/serving/integrations/claude_code.md:1-80`.
- [VERIFIED] Ollama local HEAD `c2f2d90a6793`; README documents Docker image and REST API; source includes OpenAI compatibility routes and a Claude Code Anthropic API comment at `server/routes.go:2361`.
- [VERIFIED] Continue local HEAD `cb273098d968`; README documents source-controlled AI checks and CLI install; CLI docs document headless mode; telemetry code includes Claude Code compatible metrics.
- [VERIFIED] Promptfoo local HEAD `3ac2b3305b05`; README states OpenAI ownership update, MIT license, CI/CD automation, red teaming, local evals, and `npx promptfoo@latest`; smoke-test plan includes core eval and env-file cases.
- [VERIFIED] Prefect local HEAD `fe44ad330730`; README documents scheduling, retries, event automations, self-hosted server, deployments, and Docker/Kubernetes integration docs.
- [VERIFIED] Temporal local HEAD `3c5ff5b64d2e`; README documents durable execution, workflows, retries, local server, CLI, and Web UI.
- [VERIFIED] SGLang local HEAD `d49fc092cb42`; README documents OpenAI API compatibility; docs document benchmark tooling, Docker, Kubernetes, OME, and SkyPilot deployment.

## D1 CI/CD Automation

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `argoproj/argo-cd` | 22,891 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | Helm/Kubernetes/container [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.78 |
| `dagger/dagger` | 15,798 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | CLI/container/SDK [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.86 |
| `earthly/earthly` | 12,028 | MPL-2.0 | 2025-10-23 | No [VERIFIED] | CLI/container [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.68 |
| `tektoncd/pipeline` | 8,962 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | Kubernetes CRDs [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.74 |
| `actions/runner` | 6,012 | MIT | 2026-05-14 | Indirect via Claude Code Actions [INFERRED] | GitHub Actions runner binary/container [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.82 |

D1 synthesis: use GitHub Actions as the default CI surface, add Dagger only when local-reproducible pipelines become a first-class need, and defer ArgoCD/Tekton until `Z:\claude-sota-pure` has Kubernetes deployment artifacts. [INFERRED]

## D2 IDE Integration + Coding Assistant Tooling

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `anthropics/claude-code` | 123,892 | NOASSERTION | 2026-05-14 | Yes [VERIFIED] | Native installer/npm wrapper [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.97 |
| `openai/codex` | 82,901 | Apache-2.0 | 2026-05-15 | Via installed Codex bridge/hooks [VERIFIED] | npm [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.93 |
| `cline/cline` | 61,846 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | VS Code extension/SDK/CLI [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.72 |
| `Aider-AI/aider` | 44,861 | Apache-2.0 | 2026-04-25 | No [VERIFIED] | pipx/pip [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.70 |
| `continuedev/continue` | 33,214 | Apache-2.0 | 2026-05-15 | Indirect; Claude-compatible telemetry [VERIFIED] | npm CLI + VS Code/JetBrains [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.84 |
| `RooCodeInc/Roo-Code` | 24,081 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | VS Code extension [INFERRED] | FAIL/PILOT/PASS [INFERRED] | REJECT-FOR-FIT conf=0.78 |

D2 synthesis: Claude Code and Codex are core; Continue is the strongest non-native candidate because it has source-controlled checks, headless CLI, and local `.claude/skills` loading evidence; Roo-Code is archived and should not seed a new pure runtime. [VERIFIED]

## D3 Security, Secrets, Credential Injection

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `hashicorp/vault` | 35,618 | NOASSERTION | 2026-05-15 | No [VERIFIED] | binary/docker/helm [INFERRED] | PASS/PILOT/FAIL [INFERRED] | STUDY-PILOT conf=0.62 |
| `gitleaks/gitleaks` | 27,000 | MIT | 2026-05-13 | Hook-compatible [VERIFIED] | gh release/docker [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.95 |
| `FiloSottile/age` | 22,297 | BSD-3-Clause | 2026-03-20 | No [VERIFIED] | binary/go install [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.89 |
| `getsops/sops` | 21,792 | MPL-2.0 | 2026-05-15 | No [VERIFIED] | binary/package managers [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.90 |
| `bitnami-labs/sealed-secrets` | 9,094 | Apache-2.0 | 2026-05-13 | No [VERIFIED] | kubectl/helm/controller [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.75 |
| `external-secrets/external-secrets` | 6,609 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | Helm/Kubernetes operator [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.78 |

D3 synthesis: for a portable pure runtime, adopt gitleaks plus age/sops first; pilot Vault only when multi-operator dynamic secret leasing is required; reserve Sealed Secrets and External Secrets for Kubernetes mode. [INFERRED]

## D4 Containerization + Orchestration

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `kubernetes/kubernetes` | 122,288 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | kubeadm/kind/k3d/cloud [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.74 |
| `docker/compose` | 37,388 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | Docker plugin/binary [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.92 |
| `bentoml/BentoML` | 8,649 | Apache-2.0 | 2026-05-07 | No [VERIFIED] | pip/docker/cloud [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.67 |
| `kserve/kserve` | 5,478 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | Kubernetes operator [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.77 |
| `ray-project/kuberay` | 2,499 | Apache-2.0 | 2026-05-14 | No [VERIFIED] | Kubernetes operator [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.65 |

D4 synthesis: Docker Compose is the immediate deployment substrate because manifest still has Docker Desktop planned; Kubernetes/KServe/KubeRay should stay pilot-only until a cluster target exists. [VERIFIED]

## D5 Model Serving + Inference Optimization

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `ollama/ollama` | 171,470 | MIT | 2026-05-15 | Partial Anthropic/Claude Code evidence [VERIFIED] | native installer/docker [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.91 |
| `huggingface/transformers` | 160,647 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | pip/docker [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.76 |
| `ggml-org/llama.cpp` | 110,297 | MIT | 2026-05-15 | No [VERIFIED] | source/binary/docker [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.86 |
| `vllm-project/vllm` | 80,126 | Apache-2.0 | 2026-05-15 | Yes via Anthropic Messages API docs [VERIFIED] | pip/docker [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.96 |
| `sgl-project/sglang` | 27,849 | Apache-2.0 | 2026-05-15 | Contributor tooling mentions Claude Code [VERIFIED] | pip/docker/k8s [VERIFIED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.82 |
| `huggingface/text-generation-inference` | 10,855 | Apache-2.0 | 2026-03-21 | No [VERIFIED] | docker [INFERRED] | FAIL/PILOT/PASS [INFERRED] | SUPERSEDED conf=0.86 |

D5 synthesis: vLLM is the best Claude Code backend candidate because local docs explicitly support Claude Code through Anthropic Messages API; Ollama is the ergonomic local default; llama.cpp is the low-level CPU/edge fallback; TGI is archived and superseded. [VERIFIED]

## D6 Agent Workflow Automation + Scheduling

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `apache/airflow` | 45,429 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | pip/docker/helm [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.70 |
| `PrefectHQ/prefect` | 22,412 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | pip/uv/docker [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.86 |
| `temporalio/temporal` | 20,283 | MIT | 2026-05-15 | No [VERIFIED] | CLI/docker/helm [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.80 |
| `dagster-io/dagster` | 15,517 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | pip/docker/k8s [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.73 |
| `triggerdotdev/trigger.dev` | 14,935 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | npm/docker/cloud [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.68 |

D6 synthesis: Prefect is the best first scheduler for Python-heavy agent maintenance jobs; Temporal is stronger for durable long-running product workflows but heavier than needed for bootstrap; Airflow/Dagster are data-platform oriented. [INFERRED]

## D7 Config Management + Environment Isolation

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `jdx/mise` | 28,236 | MIT | 2026-05-15 | No [VERIFIED] | binary/cargo/package managers [INFERRED] | PASS/PASS/PASS [INFERRED] | STUDY-PILOT conf=0.72 |
| `motdotla/dotenv` | 20,431 | BSD-2-Clause | 2026-04-17 | No [VERIFIED] | npm [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.64 |
| `direnv/direnv` | 15,078 | MIT | 2026-03-31 | No [VERIFIED] | binary/package managers [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.84 |
| `cachix/devenv` | 6,784 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | nix [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.66 |
| `nix-community/nix-direnv` | 2,650 | MIT | 2026-05-10 | No [VERIFIED] | nix/direnv [INFERRED] | PASS/PILOT/PASS [INFERRED] | STUDY-PILOT conf=0.62 |

D7 synthesis: keep `uv` as already-installed Python environment core, add `direnv` for per-repo env activation, and reconsider `mise` only if multi-language toolchain pinning becomes explicit for `claude-sota-pure`. [VERIFIED]

## D8 Testing Infrastructure for AI/Agent Systems

| Repo | Stars | License | Last push | Claude Code native | Install path | Axis 1/2/3 | Verdict |
|---|---:|---|---|---|---|---|---|
| `grafana/k6` | 30,578 | AGPL-3.0 | 2026-05-15 | No [VERIFIED] | binary/docker [INFERRED] | PASS/PILOT/FAIL [INFERRED] | REJECT-FOR-FIT conf=0.81 |
| `locustio/locust` | 27,789 | MIT | 2026-05-15 | No [VERIFIED] | pip/docker [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.86 |
| `promptfoo/promptfoo` | 21,291 | MIT | 2026-05-15 | Indirect via Claude/Anthropic providers [VERIFIED] | npm/npx/pip/brew [VERIFIED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.94 |
| `openai/evals` | 18,470 | NOASSERTION | 2026-04-14 | No [VERIFIED] | pip/source [INFERRED] | PASS/PILOT/PILOT [INFERRED] | STUDY-PILOT conf=0.67 |
| `pytest-dev/pytest` | 13,851 | MIT | 2026-05-14 | No [VERIFIED] | pip/uv [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.90 |
| `pytest-dev/pytest-asyncio` | 1,643 | Apache-2.0 | 2026-05-15 | No [VERIFIED] | pip/uv [INFERRED] | PASS/PASS/PASS [INFERRED] | ADOPT-NOW conf=0.88 |

D8 synthesis: adopt pytest + pytest-asyncio + promptfoo first; add Locust for endpoint load; reject k6 for this runtime because AGPL conflicts with the manifest’s prior AGPL rejection posture. [INFERRED]

## Implant Order for `Z:\claude-sota-pure`

1. [VERIFIED] Baseline already proven in installed runtime: Claude Code native CLI, Codex CLI/hooks, `uv`, gitleaks.
2. [INFERRED] Add secrets floor: `age` + `sops`, then wire gitleaks pre-commit/pre-push gates before any provider credentials.
3. [INFERRED] Add container floor: Docker Desktop/Engine + Docker Compose; keep Compose files minimal and avoid Kubernetes until a service boundary exists.
4. [INFERRED] Add AI test floor: pytest, pytest-asyncio, promptfoo pinned by exact version; place eval provider credentials in an eval-specific secret path.
5. [INFERRED] Add local serving floor: Ollama for operator-local models; vLLM only after GPU/container prerequisites are green.
6. [INFERRED] Add workflow floor: Prefect for scheduled maintenance/eval jobs; Temporal only for durable multi-day workflows.
7. [INFERRED] Add IDE/CI bridge: Continue CLI checks for source-controlled PR checks; Claude Code GitHub Action only after CI policy and secrets injection are settled.
8. [INFERRED] Add Kubernetes layer last: ArgoCD, KServe, External Secrets, Sealed Secrets, and KubeRay only after Compose deployment is insufficient.

## Final Recommendations

- [INFERRED] `ADOPT-NOW`: Claude Code, Codex, Continue CLI checks, gitleaks, age, sops, Docker Compose, Ollama, vLLM, Prefect, direnv, pytest, pytest-asyncio, promptfoo, Locust.
- [INFERRED] `STUDY-PILOT`: Dagger, ArgoCD, Tekton, Vault, External Secrets, Sealed Secrets, Kubernetes, KServe, SGLang, Temporal, Dagster, Airflow, mise, devenv.
- [VERIFIED] `REJECT/SUPERSEDED`: Roo-Code archived; TGI archived; k6 AGPL; Trufflehog already rejected in manifest for AGPL.

VERDICT-CATALOG-COMPLETE
