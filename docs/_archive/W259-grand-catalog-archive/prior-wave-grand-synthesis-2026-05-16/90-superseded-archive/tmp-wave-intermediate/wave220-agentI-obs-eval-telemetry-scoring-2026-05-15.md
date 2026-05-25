# Wave 220 Agent I - Observability + Evaluation + Telemetry Scoring

Date: 2026-05-15  
Scope: O1-O8 observability, evaluation, telemetry, cost, dashboards, structured audit trails, and automated agent-behavior testing for `Z:/claude-sota-pure`.

## 1. BRIDGE-MODE Disclosure

| Field | Result |
|---|---|
| BRIDGE-MODE codex CLI dispatch status | FAILED [VERIFIED] |
| Dispatch command | `codex exec --ephemeral -p deep-review-exec --color never <prompt>` [VERIFIED] |
| Per-call codex budget requested | 90s default [VERIFIED] |
| Actual codex calls | count=1, mean=0.163s, max=0.163s [MEASURED] |
| Failure class | local app-server init failure before model execution: `Access is denied. (os error 5)` [VERIFIED] |
| Cross-model gate satisfaction | FAILED-policy-blocked [VERIFIED] |
| Captured evidence | `tmp/wave220-agentI-codex-bridge-result.json` [VERIFIED] |

### STAND-IN-NOTICE

Real GPT-5.5 via codex CLI was requested, but the codex CLI failed before reaching model execution. This artifact is therefore an orchestrator-local research synthesis with live/local source probes and prior corpus cross-checks, not a satisfied cross-model verdict. No GPT-5.5 approval is claimed. [VERIFIED]

## 2. Executive Summary - Top 5 ADOPT-NOW

1. **OpenLLMetry / OpenTelemetry Python as primary instrumentation layer** - ADOPT-NOW. It is OTel-native, Apache-2.0, supports Anthropic/OpenAI/MCP instrumentation, and fits the existing Claude Code OTLP export path better than app-specific SDK-only tracing. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:54-59,118-162 @ HEAD 3735204aa063f4ef12b44395bff8351ac61c6136`; `.claude/settings.json:31-38 @ local`]

2. **Langfuse as self-hosted LLM trace/eval/dataset dashboard** - ADOPT-NOW, but only after a local hook-to-trace adapter is specified. Langfuse is strong for observability, eval scores, datasets, prompt management, experiments, and self-hosting, but no native Claude Code CLI/hook integration was found. [VERIFIED: `Z:/repos/deps/langfuse/README.md:80-99,115-149 @ HEAD 2466d4ce9bc33b24d6ae5c63cc32293555eec0c0`]

3. **promptfoo as deterministic regression/red-team harness** - ADOPT-NOW. It is local-first, MIT, CLI-native, supports Anthropic/custom providers, includes agent evaluation docs, and can test hook/agent behavior deterministically if Claude Code is wrapped behind a custom provider script with fixed fixtures. [VERIFIED: `Z:/repos/deps/promptfoo/README.md:1,7,12,23,54-56,76-80 @ HEAD 3ac2b3305b05e9e1afca8b140939314028b4d3f7`; `Z:/repos/deps/promptfoo/site/docs/getting-started.md:141-149,519-535 @ same HEAD`]

4. **LiteLLM proxy observability/cost bridge** - ADOPT-NOW only if Agent C's routing layer wants a proxy substrate. It brings Anthropic support, virtual keys, spend tracking, guardrails, load balancing, admin dashboard, Langfuse callbacks, and OTel dependencies; it is too broad to install solely for observability. [VERIFIED: `Z:/repos/deps/litellm/README.md:46,61,397-398 @ HEAD 934ecdca78daf7ec9514efd47df77bf7495c822d`; `Z:/repos/deps/litellm/pyproject.toml:3,7,96-102,144,186,198 @ same HEAD`]

5. **DeepEval for pytest-like metric tests, with live-token guard inverted to skip by default** - ADOPT-NOW as a second eval runner behind promptfoo. It has Apache-2.0 licensing and local repo version evidence, but should not become the primary dashboard or mandatory gate until token-safe defaults and pass-rate gating are in place. [VERIFIED: `Z:/repos/deps/deepeval/pyproject.toml:3,6 @ HEAD 99878bdefd93632dc1cd80319b163fca8acee6e6`; prior gap: `docs/sota-architecture-audit/fire-19-dim6-eval-gpt55/01-dim6-eval-gpt55-verdict.md:101-113`]

## 3. Scoring Method

Each candidate is scored 0-10 on: GitHub stars, source quality, native Claude Code/hook integration, self-hostability, license, active maintenance, install simplicity, and cross-model/multi-LLM support. Overall is a pragmatic weighted reading, not a mathematical average. Star counts use GitHub web snippets/local prior Wave 212 where PowerShell GitHub API failed with SSL errors and `curl.exe` failed with Schannel credential errors. [VERIFIED failure; INFERRED counts where noted]

## 4. O1 - LLM Observability Platforms

| Candidate | Stars | Source | CC/hook native | Self-host | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| langfuse/langfuse | 9.0 | 8.5 | 3.0 | 9.0 | 8.0 | 9.0 | 5.0 | 8.0 | ADOPT-NOW dashboard |
| traceloop/openllmetry | 7.0 | 8.5 | 4.0 | 10.0 | 10.0 | 8.0 | 7.0 | 9.0 | ADOPT-NOW instrumentation |
| BerriAI/litellm | 10.0 | 8.0 | 5.0 | 8.5 | 9.0 | 8.0 | 4.5 | 10.0 | ADOPT-NOW if proxy axis agrees |
| Brainlid/langchain_agent_ui | 1.0 | 2.0 | 0.0 | 4.0 | 5.0 | 1.0 | 5.0 | 3.0 | SKIP outdated/low-fit |

Notes:
- Langfuse source: `package.json` version 3.173.0 and MIT; README documents LLM observability, evals, datasets, API, Docker/local/VM/Kubernetes self-host, and LiteLLM integration. [VERIFIED: `Z:/repos/deps/langfuse/package.json:2-5`; `README.md:80-99,115-149 @ 2466d4c`]
- Native Claude Code CLI/hook path: no `Claude Code`/hook-specific integration found in Langfuse source search; integrations are SDK/OpenAI/LangChain/LlamaIndex/Haystack/LiteLLM/Vercel/etc. [VERIFIED: `Z:/repos/deps/langfuse/README.md:144-175 @ 2466d4c`; HNF]
- OpenLLMetry source: built on OTel, exports to existing observability tools, instruments Anthropic/OpenAI/MCP, Apache-2.0. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:54-59,118-162 @ 3735204`]
- LiteLLM source: gateway for 100+ providers with spend tracking/guardrails/admin dashboard and Langfuse/MLflow observability callbacks. [VERIFIED: `Z:/repos/deps/litellm/README.md:46,61,397-398 @ 934ecdc`]

## 5. O2 - Agent Evaluation Frameworks

| Candidate | Stars | Source | CC/hook native | Self-host/local | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| promptfoo/promptfoo | 9.0 | 8.5 | 6.0 | 9.0 | 10.0 | 9.0 | 9.0 | 9.0 | ADOPT-NOW primary regression/red-team |
| confident-ai/deepeval | 8.0 | 8.0 | 3.0 | 8.0 | 10.0 | 9.0 | 7.0 | 8.0 | ADOPT-NOW secondary pytest metrics |
| openai/evals | 8.0 | 7.0 | 1.0 | 8.0 | 10.0 | 6.0 | 5.0 | 6.0 | CITE/DEFER for reference patterns |
| microsoft/promptflow eval | 8.0 | 7.0 | 1.0 | 6.0 | 10.0 | 7.0 | 4.0 | 7.0 | DEFER, Azure/heavy |
| Anthropic cookbook patterns | 5.0 | 7.5 | 5.0 | 9.0 | 9.0 | 7.0 | 10.0 | 6.0 | CITE-CANONICAL patterns |
| ragas | 7.0 | 7.0 | 1.0 | 8.0 | 10.0 | 6.0 | 7.0 | 7.0 | DEFER until RAG eval demand |
| LiteLLM eval features | 10.0 | 7.0 | 3.0 | 8.0 | 9.0 | 8.0 | 4.5 | 10.0 | Proxy-side metrics, not eval harness |

Notes:
- promptfoo supports CLI evals/red teaming, local privacy, Anthropic/custom providers, and agent evaluation/trajectory docs. [VERIFIED: `Z:/repos/deps/promptfoo/README.md:12,54-56,76-80`; `site/docs/getting-started.md:141-149,519-535 @ 3ac2b33`]
- promptfoo depends on `@anthropic-ai/claude-agent-sdk`, Langfuse, and OpenTelemetry packages, making it unusually relevant to Claude Code-adjacent agent testing even though it is not a native Claude Code hook. [VERIFIED: `Z:/repos/deps/promptfoo/package.json:125-164,203,273-279 @ 3ac2b33`]
- Anthropic cookbook includes promptfoo evaluation directories for classification/contextual embeddings/text-to-SQL and usage/cost API patterns. [VERIFIED: `Z:/repos/deps/anthropic-cookbook/capabilities/classification/README.md:9-11`; `capabilities/contextual-embeddings/README.md:9-11`; `observability/usage_cost_api.ipynb:24-44 @ HEAD 33424c3`]
- No candidate has true "Claude Code native eval integration" in the sense of directly invoking Claude Code hooks/agents as first-class objects. Deterministic testing is achievable through wrappers around hook stdin JSON, transcript fixtures, and custom promptfoo providers. [INFERRED]

## 6. O3 - Distributed Tracing / OTel

| Candidate | Stars | Source | CC/hook native | Self-host | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| OpenLLMetry | 7.0 | 8.5 | 4.0 | 10.0 | 10.0 | 8.0 | 7.0 | 9.0 | ADOPT-NOW LLM instrumentation |
| opentelemetry-python | 8.0 | 9.0 | 3.0 | 10.0 | 10.0 | 9.0 | 8.0 | 10.0 | ADOPT-NOW base SDK/API |
| Claude Code OTEL env -> Phoenix | 6.0 | 7.0 | 9.0 | 10.0 | 10.0 | 8.0 | 9.0 | 5.0 | Keep as native transport |
| Existing JSONL hooks | 5.0 | 8.0 | 10.0 | 10.0 | 10.0 | 8.0 | 10.0 | 5.0 | Canonical audit substrate |

Runtime evidence:
- `.claude/settings.json` enables Claude Code telemetry and OTLP traces to `http://127.0.0.1:14317` with `openinference.project.name=eee`. [VERIFIED: `.claude/settings.json:31-38`]
- `.mcp.json` has Phoenix MCP at `http://127.0.0.1:16006`. [VERIFIED: `.mcp.json:95-98`]
- Prior audit found containers healthy for Langfuse, Grafana, Phoenix, ClickHouse, Postgres, Redis, and MinIO, but also found Langfuse/Grafana partially unwired. [VERIFIED: `docs/observability-stack-audit-w164-f39-2026-05-13.md:25-33,44-58,73-76`]
- Existing hook scripts already write JSONL rows and propagate `agent_id`/`agent_type` in several places. [VERIFIED: `.claude/hooks/scripts/_observation_writer.py:92-114,223-248`; `.claude/hooks/scripts/subagent_stop_telemetry.py:11,123-147`; `.claude/hooks/scripts/codex_failure_audit.py:32,72-80`]

## 7. O4 - Cost / Usage Tracking

| Candidate | Stars | Source | CC/hook native | Self-host/local | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| ccusage | 8.0 | 8.0 | 9.0 | 10.0 | 10.0 | 8.0 | 10.0 | 4.0 | BASELINE keep |
| LiteLLM cost tracking | 10.0 | 8.0 | 4.0 | 8.0 | 9.0 | 8.0 | 4.5 | 10.0 | Adopt if proxy adopted |
| Anthropic Admin Usage/Cost API patterns | 5.0 | 7.0 | 3.0 | 8.0 | 9.0 | 7.0 | 8.0 | 2.0 | CITE-CANONICAL for Claude API |
| Anthropic token counting endpoint patterns | 5.0 | 7.0 | 3.0 | 9.0 | 9.0 | 7.0 | 9.0 | 2.0 | CITE-CANONICAL |

Notes:
- ccusage is already installed baseline according to the manifest and AGENTS context. [VERIFIED: `docs/sota-installed-manifest.md:692`; AGENTS prompt]
- LiteLLM has spend tracking in README and cost/usage code paths in source. [VERIFIED: `Z:/repos/deps/litellm/README.md:61,397-398`; `litellm/batches/batch_utils.py:11-43,105-131 @ 934ecdc`]
- Anthropic cookbook usage/cost API tracks token consumption, cache creation/reads, cost breakdown, workspace/API-key/model grouping. [VERIFIED: `Z:/repos/deps/anthropic-cookbook/observability/usage_cost_api.ipynb:24-44,75-85,210-299,352-418 @ 33424c3`]

## 8. O5 - Experiment Tracking / MLflow-Adjacent

| Candidate | Stars | Source | CC/hook native | Self-host | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Langfuse experiments/datasets | 9.0 | 8.5 | 3.0 | 9.0 | 8.0 | 9.0 | 5.0 | 8.0 | Use through Langfuse |
| MLflow | 9.0 | 8.0 | 1.0 | 8.0 | 10.0 | 8.0 | 4.0 | 8.0 | DEFER overkill for pure CC runtime |
| W&B | 7.0 | 8.0 | 1.0 | 4.0 | 10.0 | 8.0 | 5.0 | 7.0 | DEFER cloud/platform-heavy |

Assessment:
- MLflow/W&B are credible general experiment platforms, but for a Claude Code runtime they are overkill until there is a real lifecycle of model/app versions, datasets, score trends, and release comparisons. [INFERRED]
- Langfuse already covers the LLM-specific subset: datasets, evals, prompt versions, trace-linked scores, and experiments. Prefer it before MLflow/W&B. [VERIFIED: `Z:/repos/deps/langfuse/README.md:91-99,168 @ 2466d4c`]

## 9. O6 - Structured Logging / Audit Trails

| Candidate | Stars | Source | CC/hook native | Self-host/local | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Existing `.claude/state/*.jsonl` hooks | 5.0 | 8.0 | 10.0 | 10.0 | 10.0 | 8.0 | 10.0 | 5.0 | Keep primary truth |
| structlog | 7.0 | 8.0 | 3.0 | 10.0 | 10.0 | 8.0 | 9.0 | 10.0 | ADOPT when Python hook schemas stabilize |
| opentelemetry-sdk logging bridge | 8.0 | 8.5 | 3.0 | 10.0 | 10.0 | 9.0 | 7.0 | 10.0 | ADOPT for fan-out, not primary truth |
| Claude Agent SDK event schema | 6.0 | 8.0 | 9.0 | 10.0 | 10.0 | 8.0 | 8.0 | 4.0 | CITE for payload fields |

Critical runtime pattern:
- Current local hooks already treat JSONL as fail-open append-only telemetry, redacting/propagating `agent_id` and `agent_type`. This is the correct substrate for `claude-sota-pure`. [VERIFIED: `.claude/hooks/scripts/_observation_writer.py:92-114,223-248`; `.claude/hooks/scripts/auto_proceed_gate.py:519-545,606-619`; `.claude/hooks/scripts/codex_failure_audit.py:72-80`]
- Recommendation: do not replace local JSONL with Langfuse or OTel. Emit one normalized event schema locally first, then ship adapters: JSONL -> OTLP spans/logs; JSONL -> Langfuse traces/scores; JSONL -> promptfoo result ingestion. [INFERRED]

## 10. O7 - Dashboard / Visualization

| Candidate | Stars | Source | CC/hook native | Self-host | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Langfuse UI | 9.0 | 8.5 | 3.0 | 9.0 | 8.0 | 9.0 | 5.0 | 8.0 | ADOPT primary LLM dashboard |
| Phoenix UI | 7.0 | 8.0 | 8.0 | 9.0 | 6.0 | 8.0 | 6.0 | 8.0 | Keep existing OTel trace UI |
| Grafana | 10.0 | 9.0 | 1.0 | 10.0 | 10.0 | 9.0 | 4.0 | 10.0 | DEFER dashboards until metrics normalized |

Grafana evidence:
- Prompt asked for evidence that Grafana is in `disabledMcpjsonServers`; current `.claude/settings.json` has `disabledMcpjsonServers: []`, so that claim is not true in this checkout. [VERIFIED: `.claude/settings.json:73`; HONEST-NON-FINDING]
- W164 audit found Grafana container healthy, but wire status partial: no scrape configs/dashboards/OTLP instrumentation wired to runtime. [VERIFIED: `docs/observability-stack-audit-w164-f39-2026-05-13.md:25-33,51-58,76`]
- Verdict: Grafana is useful for normalized FM-* counters, token/cost trends, and hook-latency SLOs, but it should not be in the Day-1 pure runtime before event schemas and metric exporters exist. [INFERRED]

## 11. O8 - Automated Testing Of Agent Behavior

| Candidate | Stars | Source | CC/hook native | Local deterministic | License | Active | Install | Multi-LLM | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| promptfoo | 9.0 | 8.5 | 6.0 | 9.0 | 10.0 | 9.0 | 9.0 | 9.0 | ADOPT-NOW |
| Existing codex miss-case JSONL pattern | 4.0 | 7.0 | 10.0 | 10.0 | 10.0 | 7.0 | 10.0 | 4.0 | KEEP/GENERALIZE |
| Anthropic cookbook agent/eval notebooks | 5.0 | 7.0 | 5.0 | 8.0 | 9.0 | 7.0 | 10.0 | 5.0 | CITE patterns |
| DeepEval | 8.0 | 8.0 | 3.0 | 7.0 | 10.0 | 9.0 | 7.0 | 8.0 | ADOPT-NOW secondary |
| openai/evals | 8.0 | 7.0 | 1.0 | 7.0 | 10.0 | 6.0 | 5.0 | 6.0 | CITE/DEFER |

Determinism answer:
- Claude Code hooks can be tested deterministically by feeding fixed hook stdin JSON payloads to hook scripts and checking JSON/exit-code/JSONL side effects. [VERIFIED from hook script stdin parsers and JSONL writers: `.claude/hooks/scripts/codex_failure_audit.py:37-80`; `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py:896-924`]
- Claude Code agents are only partially deterministic because model output varies; deterministic tests should assert guardrails, routing, transcript parsing, schema validation, and fixture replay, not exact generated text. [INFERRED]
- promptfoo can wrap agent behavior through custom providers/scripts and compare model/tool traces under fixed fixtures. [VERIFIED: `Z:/repos/deps/promptfoo/site/docs/getting-started.md:149,519-535 @ 3ac2b33`]

## 12. Source Code Grade Rationale - Top 3

### 12.1 Langfuse - Grade A- as Dashboard/Eval Store

Strengths:
- Mature monorepo with versioned release machinery and MIT package metadata. [VERIFIED: `Z:/repos/deps/langfuse/package.json:2-5,55-96 @ 2466d4c`]
- Explicit LLM observability/evals/datasets/prompt-management/API product surface. [VERIFIED: `Z:/repos/deps/langfuse/README.md:80-99 @ 2466d4c`]
- Self-hosting paths cover local Docker Compose, VM, Kubernetes/Helm, and Terraform templates. [VERIFIED: `Z:/repos/deps/langfuse/README.md:115-134 @ 2466d4c`]
- Docker compose includes worker/web/ClickHouse/Redis/Postgres/MinIO stack, which matches trace-scale storage needs. [VERIFIED: `Z:/repos/deps/langfuse/docker-compose.yml:8,72,91,133,150 @ 2466d4c`]

Weaknesses:
- No native Claude Code hook/CLI path was found; it must ingest via SDK, LiteLLM, OpenAI-compatible proxy, OTel collector/fan-out, or custom adapter. [VERIFIED/HNF]
- Install complexity is high relative to pure runtime bootstrapping because it pulls multiple services. [INFERRED]
- Self-hosted telemetry opt-out/privacy must be explicitly configured; README documents self-host telemetry. [VERIFIED: `Z:/repos/deps/langfuse/README.md:390-397 @ 2466d4c`]

### 12.2 OpenLLMetry - Grade A- as Instrumentation Layer

Strengths:
- Correct abstraction: OpenTelemetry extensions, not a proprietary trace silo. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:54-59 @ 3735204`]
- Instruments Anthropic, OpenAI/Azure OpenAI, MCP, LiteLLM, and many vector/agent frameworks. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:118-162 @ 3735204`]
- Apache-2.0 and recent local HEAD. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:28-29,56`; local git log `3735204... 2026-05-07`]

Weaknesses:
- Does not solve evaluation or dashboards by itself; it needs Phoenix/Langfuse/Grafana/collector sink. [INFERRED]
- Native Claude Code hook integration still requires wrapping hook lifecycle in spans. [INFERRED]

### 12.3 promptfoo - Grade A- as Agent Regression Harness

Strengths:
- CLI and library for evals/red teaming, MIT, local-first/private execution. [VERIFIED: `Z:/repos/deps/promptfoo/README.md:1,7,12,76-80 @ 3ac2b33`]
- Supports OpenAI, Anthropic, Azure, Bedrock, Ollama, and custom providers. [VERIFIED: `Z:/repos/deps/promptfoo/README.md:54-56`; `site/docs/getting-started.md:141-149 @ 3ac2b33`]
- Has specific agent evaluation docs and multi-turn/tool quality references. [VERIFIED: `Z:/repos/deps/promptfoo/site/docs/getting-started.md:519-535 @ 3ac2b33`]
- Includes dependencies on Anthropic Claude Agent SDK, Langfuse, and OTel, making it aligned with this axis. [VERIFIED: `Z:/repos/deps/promptfoo/package.json:125-164,203,273-279 @ 3ac2b33`]

Weaknesses:
- It does not natively execute Claude Code hook chains; pure runtime needs custom providers/scripts and fixture conventions. [INFERRED]
- Red-team generation can burn tokens and may use remote generation unless configured carefully; use explicit provider controls and offline fixture tests for default CI. [INFERRED from promptfoo red-team config docs]

## 13. Implant Order For `Z:/claude-sota-pure`

1. **Schema first**: create `observability/events.schema.json` for normalized events: `ts`, `run_id`, `session_id`, `agent_id`, `agent_type`, `hook_event`, `tool_name`, `decision`, `status`, `duration_ms`, `model`, `input_tokens`, `output_tokens`, `cache_creation_tokens`, `cache_read_tokens`, `cost_usd`, `trace_id`, `span_id`, `git_sha`, `prompt_hash`, `eval_id`. [INFERRED]

2. **Local JSONL sinks**: port minimal fail-open append-only writers from installed runtime before any dashboard. Target files: `hook_events.jsonl`, `agent_runs.jsonl`, `eval_results.jsonl`, `cost_usage.jsonl`, `swallow_log.jsonl`. [VERIFIED pattern: `.claude/hooks/scripts/_observation_writer.py:223-248`; `.claude/hooks/scripts/utils.py:52-134`]

3. **OTel SDK + OpenLLMetry**: add `opentelemetry-api`, `opentelemetry-sdk`, OTLP exporter, then `traceloop-sdk`/instrumentations only for processes that actually make LLM/MCP calls. [VERIFIED: `Z:/repos/deps/openllmetry/README.md:69-82,118-162 @ 3735204`]

4. **Phoenix or collector endpoint**: keep simple local OTLP endpoint first. Avoid Grafana dashboards until metrics exist. [VERIFIED: `.claude/settings.json:35-38`; `docs/observability-stack-audit-w164-f39-2026-05-13.md:51-58`]

5. **promptfoo harness**: add fixture-driven tests for hooks and agent wrappers. First tests should not call live models. [INFERRED]

6. **DeepEval secondary**: add metric tests only after live-token skip default is enforced. [VERIFIED risk from prior verdict: `docs/sota-architecture-audit/fire-19-dim6-eval-gpt55/01-dim6-eval-gpt55-verdict.md:101-113`]

7. **Langfuse**: deploy Docker stack or connect to existing self-host only after JSONL -> Langfuse adapter or LiteLLM callback path is defined. [VERIFIED: `Z:/repos/deps/langfuse/README.md:115-149 @ 2466d4c`]

8. **LiteLLM**: implant only if Agent C routing/proxy design elects it as the gateway; otherwise consume its patterns but avoid proxy sprawl. [INFERRED]

9. **Grafana**: add only after exporter produces normalized counters and histograms for hook failure modes, cost, eval pass-rate, latency, and queue depth. [INFERRED]

## 14. Convergence Summary

Axis-1 >= 3 distinct orgs strict PASS:
- Langfuse org: `langfuse/langfuse` for LLM trace/eval/dataset dashboard. [VERIFIED]
- Traceloop/OpenTelemetry orgs: `traceloop/openllmetry` plus `open-telemetry/opentelemetry-python` for OTel-native instrumentation. [VERIFIED]
- Promptfoo/OpenAI org: `promptfoo/promptfoo` now OpenAI-owned but still MIT/open-source per README, for eval/regression/red-team harness. [VERIFIED: `Z:/repos/deps/promptfoo/README.md:23 @ 3ac2b33`]
- BerriAI org: `BerriAI/litellm` for proxy/cost/observability bridge. [VERIFIED]
- Anthropic org: `anthropics/anthropic-cookbook` for Claude usage/cost and eval pattern references. [VERIFIED]

Strict convergence result: PASS. At least five distinct upstream organizations independently reinforce the same architecture: local structured events -> OTel instrumentation -> LLM-specific dashboard/eval store -> executable eval harness -> cost attribution. [INFERRED]

## 15. HONEST-NON-FINDING Entries

1. **No native Claude Code CLI/hook integration found in Langfuse**. Found Langfuse SDK/OpenAI/LangChain/LlamaIndex/Haystack/LiteLLM/Vercel/Mastra/API integrations, but not Claude Code hooks/agents as first-class integration. [VERIFIED/HNF: `Z:/repos/deps/langfuse/README.md:144-175 @ 2466d4c`]

2. **No first-class Claude Code eval integration found in promptfoo/DeepEval/openai-evals/ragas/promptflow**. Found custom providers/scripts and agent eval docs in promptfoo; deterministic hook testing still needs local wrappers. [VERIFIED/HNF]

3. **Prompt claim "Grafana is in disabledMcpjsonServers" not found in this checkout**. Current value is empty list. [VERIFIED: `.claude/settings.json:73`]

4. **Sister rule path `Z:/claude-sota/.claude/rules/audit-action-loop.md` not found**. `rg` and directory listing returned no such path in the sibling checkout available to this session. Local hook comments still cite an audit-action-loop contract, but the referenced sister file was absent. [VERIFIED/HNF]

5. **GitHub API via PowerShell failed** for live star counts due SSL connection failure; `curl.exe` also failed via Schannel `SEC_E_NO_CREDENTIALS`. Star scoring therefore uses GitHub web snippets and prior local Wave 212 catalog values rather than fresh API JSON. [VERIFIED]

6. **Brainlid/langchain_agent_ui skipped** because no strong current-maintenance/adoption evidence surfaced in the local deps or targeted web pass, and it is redundant with covered agent UI/orchestration axes. [INFERRED/HNF]

## 16. Cite Trail

Local source HEADs:
- `langfuse/langfuse @ HEAD 2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` [VERIFIED]
- `traceloop/openllmetry @ HEAD 3735204aa063f4ef12b44395bff8351ac61c6136` [VERIFIED]
- `BerriAI/litellm @ HEAD 934ecdca78daf7ec9514efd47df77bf7495c822d` [VERIFIED]
- `promptfoo/promptfoo @ HEAD 3ac2b3305b05e9e1afca8b140939314028b4d3f7` [VERIFIED]
- `confident-ai/deepeval @ HEAD 99878bdefd93632dc1cd80319b163fca8acee6e6` [VERIFIED]
- `explodinggradients/ragas @ HEAD 298b68274234c060deacab3cf5fb52aa3a20e885` [VERIFIED]
- `microsoft/promptflow @ HEAD 6e76ef49beda52187d8ae38d710632cfeabedde4` [VERIFIED]
- `mlflow/mlflow @ HEAD 3ea71079c25001a935915505a9c84cb765222e76` [VERIFIED]
- `anthropics/anthropic-cookbook @ HEAD 33424c3eb476cd56379435be086ccc228af1050d` [VERIFIED]

Key local files:
- `Z:/repos/deps/langfuse/package.json:2-5 @ 2466d4c` - name/version/license. [VERIFIED]
- `Z:/repos/deps/langfuse/README.md:80-99,115-149,390-397 @ 2466d4c` - observability/evals/datasets/self-host/integrations/telemetry. [VERIFIED]
- `Z:/repos/deps/openllmetry/README.md:54-59,118-162 @ 3735204` - OTel-native + Anthropic/OpenAI/MCP/LiteLLM instrumentation. [VERIFIED]
- `Z:/repos/deps/litellm/README.md:46,61,397-398 @ 934ecdc` - gateway, spend, guardrails, cost, callbacks. [VERIFIED]
- `Z:/repos/deps/litellm/pyproject.toml:3,7,96-102,144,186,198 @ 934ecdc` - version/license/Anthropic/Langfuse/OTel/Claude SDK deps. [VERIFIED]
- `Z:/repos/deps/promptfoo/README.md:1,7,12,23,54-56,76-80 @ 3ac2b33` - eval/red-team/local/MIT/OpenAI-owned. [VERIFIED]
- `Z:/repos/deps/promptfoo/package.json:5-6,125-164,203,273-279 @ 3ac2b33` - version/license/Claude Agent SDK/Langfuse/OTel deps. [VERIFIED]
- `Z:/repos/deps/promptfoo/site/docs/getting-started.md:141-149,519-535 @ 3ac2b33` - Anthropic/custom providers and agent eval docs. [VERIFIED]
- `.claude/settings.json:31-38,73 @ local` - Claude Code telemetry + OTLP endpoint and empty disabled MCP list. [VERIFIED]
- `.mcp.json:95-98 @ local` - Phoenix MCP base URL. [VERIFIED]
- `.claude/hooks/scripts/_observation_writer.py:92-114,223-248 @ local` - agent attribution + JSONL append. [VERIFIED]
- `.claude/hooks/scripts/codex_failure_audit.py:32,37-80 @ local` - failure telemetry JSONL. [VERIFIED]
- `.claude/hooks/scripts/subagent_stop_telemetry.py:11,123-147 @ local` - subagent metrics JSONL. [VERIFIED]
- `docs/observability-stack-audit-w164-f39-2026-05-13.md:25-33,44-58,73-76 @ local` - container stack and partial wiring. [VERIFIED]
- `docs/sota-architecture-audit/fire-19-dim6-eval-gpt55/01-dim6-eval-gpt55-verdict.md:101-113 @ local` - prior eval/obs gaps. [VERIFIED]
- `tmp/wave220-agentI-codex-bridge-result.json @ local` - failed codex bridge dispatch. [VERIFIED]

VERDICT-CATALOG-COMPLETE
