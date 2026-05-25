## ARTIFACT-INLINE: tmp/wave212-agentO-token-obs-eval-catalog-2026-05-15.md

**Scope / Sources.** Live GitHub direct repo/blob reads, DeepWiki pages, official docs/pricing/license pages, and named T2 web endorsements were queried. GitHub API path failed in local PowerShell due TLS credentials, so star/license fields below use live GitHub repo pages or direct raw blobs, satisfying the fallback direct-repo-fetch rule. Key source anchors: Langfuse raw [LICENSE](https://raw.githubusercontent.com/langfuse/langfuse/main/LICENSE) + [ee/LICENSE](https://raw.githubusercontent.com/langfuse/langfuse/main/ee/LICENSE), Langfuse repo [stars](https://github.com/langfuse/langfuse), OpenLLMetry [repo](https://github.com/traceloop/openllmetry), Helicone [repo](https://github.com/Helicone/helicone), Promptfoo [repo](https://github.com/promptfoo/promptfoo), DeepWiki [Outlines](https://deepwiki.com/dottxt-ai/outlines/1-overview), DeepWiki [MLflow tracing](https://deepwiki.com/mlflow/mlflow/7.1-cicd-pipeline), MLflow [tracing docs](https://mlflow.org/docs/latest/genai/tracing), LangSmith [pricing](https://www.langchain.com/pricing), AWS Promptfoo T2 endorsement [PDF](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/solutions/approved/documents/architecture-diagrams/evaluating-generative-ai-applications-using-oss-on-aws.pdf), NVIDIA NeMo docs [overview](https://docs.nvidia.com/nemo/guardrails/latest/about/overview.html).

### 1. Executive Summary

| candidate | layer | stars | license | grade | CR-12 disposition |
|---|---:|---:|---|---|---|
| langfuse | 1 | 26.8k | MIT core + commercial EE dirs | A- | PROVIDER-COMPLEMENT |
| traceloop/openllmetry | 1 | 7.1k | Apache-2.0 | B+ | PARTIAL-OVERLAP |
| helicone | 1/4 | 5.7k | Apache-2.0 | B | PROVIDER-COMPLEMENT |
| lunary | 1 | 1.4k | Apache-2.0 | C+ | PARTIAL-OVERLAP |
| latitude-llm | 1 | 3.6k | LGPL-3.0 | D | REJECT-FOR-FIT |
| mlflow tracing | 1 | 25.8k | Apache-2.0 | B | ECOSYSTEM-IMPORT |
| langsmith | 1 | n/a | proprietary SaaS | F | REJECT-FOR-FIT |
| inspect_ai | 2 | 1.5k | MIT | B+ | GENUINELY-NEW |
| promptfoo | 2/6 | 21.3k | MIT | A | GENUINELY-NEW |
| openai-evals | 2 | 18.4k | MIT | C | DEMAND-ABSENCE |
| TruLens | 2 | 3.3k | MIT | B- | PARTIAL-OVERLAP |
| garak | 2/6 | 7.8k | Apache-2.0 | A- | GENUINELY-NEW |
| LLMLingua / LLMLingua-2 | 3 | 6.2k | MIT | B | GENUINELY-NEW |
| GPTCache | 3 | 7.9k | MIT | C | DUPLICATE-FUNCTIONALITY |
| semantic-cache pattern | 3 | n/a | pattern | C | DUPLICATE-FUNCTIONALITY |
| AgentOps | 4 | 5.5k | MIT | C+ | PARTIAL-OVERLAP |
| Helicone Cost API | 4 | 5.7k | Apache-2.0 | B- | PROVIDER-COMPLEMENT |
| Langfuse usage analytics | 4 | 26.8k | MIT core + commercial EE dirs | B+ | PROVIDER-COMPLEMENT |
| outlines | 5 | 13.8k | Apache-2.0 | A- | GENUINELY-NEW |
| guidance | 5 | 21.4k | MIT | B | PARTIAL-OVERLAP |
| Zod | 5 | 42.6k | MIT | A | GENUINELY-NEW |
| msgspec | 5 | n/a live page partial | BSD-3-Clause | A- | GENUINELY-NEW |
| NeMo Guardrails | 6 | 5.2k | permissive/view-license | B- | PARTIAL-OVERLAP |
| Guardrails-AI | 6 | 6.8k | Apache-2.0 | B | PARTIAL-OVERLAP |
| presidio / llm-guard incumbency check | 6 | n/a | blocked previously | F | REJECT-FOR-FIT incumbent failures |

### 2. Per-Layer Detailed Scoring

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 registry/license | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| langfuse | PASS: strong adoption, OTel, SDKs | PASS: Claude/Codex hook traces + eval datasets | PASS-CONDITIONAL: MIT core, avoid EE dirs | no plugin ns dup; overlaps openinference only | SDK + Docker/service + CLI | PASS-CONDITIONAL | `pip install langfuse`; `npx langfuse-cli`; docker self-host core | A- |
| openllmetry | PASS: OTel-native | PASS: Python hooks can emit spans | PASS Apache-2.0 | overlaps openinference incumbent | library instrumentation | PASS | `pip install traceloop-sdk` / OTel exporter | B+ |
| helicone | PASS | PARTIAL: proxy/gateway competes with CLIProxyAPI/LiteLLM | PASS Apache-2.0 | gateway namespace overlap | gateway + Docker | PASS | Docker self-host or OpenAI-compatible baseURL | B |
| lunary | PASS-lite | PARTIAL: similar to Langfuse | PASS Apache-2.0 | duplicate obs/evals | JS/Python SDK + self-host | PASS | SDK + self-host | C+ |
| latitude-llm | PASS | LOW: prompt platform, not runtime primitive | FAIL LGPL-3.0 not allowlisted | overlaps prompt mgmt/evals | web app | BLOCK | docker compose | D |
| mlflow tracing | PASS: LF/Databricks, OTel | PARTIAL: larger ML platform than needed | PASS Apache-2.0 | overlaps openinference/langfuse | Python/TS SDK + tracking server | PASS | `pip install mlflow` or `mlflow-tracing` | B |
| langsmith | PASS product | LOW: SaaS/proprietary | FAIL proprietary/pricing | duplicates Langfuse | SaaS SDK | BLOCK | SaaS env vars | F |

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| inspect_ai | PASS: government eval framework | PASS: agent/eval harnesses | PASS MIT | not duplicate; complements deepeval/ragas | Python CLI/library | PASS | `pip install inspect-ai` | B+ |
| promptfoo | PASS: 21.3k, used by OpenAI/Anthropic, AWS OSS eval doc | PASS: CLI CI gate, red-team configs | PASS MIT | not duplicate; stronger red-team than deepeval/ragas | Node CLI + optional Python | PASS | `npx promptfoo@latest eval`; `npm i -g promptfoo`; `brew install promptfoo` | A |
| openai-evals | PASS historical canonical | FAIL Probe-7: runtime no OpenAI eval registry workflow | PASS MIT | duplicates deepeval/ragas + demand absence | Python repo + LFS registry | PASS but no demand | clone + `pip install -e .` | C |
| TruLens | PASS | PARTIAL: eval+tracking overlap | PASS MIT | overlaps Langfuse/deepeval | Python SDK/UI | PASS | `pip install trulens` | B- |
| garak | PASS: NVIDIA project, 7.8k | PASS: safety red-team CLI | PASS Apache-2.0 | not duplicate; distinct vuln probes | CLI scanner | PASS | `pip install garak` | A- |

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| LLMLingua / LLMLingua-2 | PASS Microsoft Research | PASS for prompt compression experiments | PASS MIT | complements chonkie/context-mode/cache | Python lib/model deps | PASS | `pip install llmlingua` | B |
| GPTCache | STALE-ish latest 2024 | LOW: semantic cache duplicates cache-fix/native prompt cache | PASS MIT | duplicate cache layer | Python lib/server | PASS | `pip install gptcache` | C |
| semantic-cache patterns | generic | LOW: already covered by prompt cache + provider cache | n/a | duplicate | design pattern | n/a | no install | C |

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| AgentOps | PASS | PARTIAL: agent tracing/cost overlaps Langfuse | PASS MIT | duplicate observability | SDK + dashboard | PASS | `pip install agentops` | C+ |
| Helicone Cost API | PASS: pricing DB called out in repo | PARTIAL: useful pricing DB, gateway overlap | PASS Apache-2.0 | overlaps ccusage/LiteLLM catalogs | API/service | PASS | self-host Helicone or query Cost API | B- |
| Langfuse usage analytics | PASS | PASS: per-run/session cost attribution | PASS-CONDITIONAL | complements ccusage daily billing | SDK/service | PASS-CONDITIONAL | Langfuse SDK/core service | B+ |

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| outlines | PASS: 13.8k, DeepWiki confirms JSON/schema/regex/CFG constrained generation | PASS: local constrained decoding beyond instructor | PASS Apache-2.0 | not duplicate; instructor validates, outlines constrains | Python lib | PASS | `pip install outlines` | A- |
| guidance | PASS: 21.4k | PARTIAL: constrained gen but notebook-heavy repo | PASS MIT | overlaps outlines/instructor | Python DSL | PASS | `pip install guidance` | B |
| Zod | PASS: TS schema standard | PASS: hook schemas, command contracts | PASS MIT | not duplicate in Python runtime; complements Pydantic | npm lib | PASS | `npm install zod` | A |
| msgspec | PASS: fast Python serialization/validation | PASS: hook JSON/msgpack fast schemas | PASS BSD-3-Clause | not duplicate; performance complement | Python lib | PASS | `pip install msgspec` | A- |

| candidate | axis-1 SOTA | axis-2 runtime fit | axis-3 legal/supply | Probe 4 duplicate | Probe 5 harness shape | Probe 6 | native install path | grade |
|---|---|---|---|---|---|---|---|---|
| NeMo Guardrails | PASS NVIDIA docs | PARTIAL: heavy conversational guardrail stack | VERIFY license before install | overlaps Guardrails-AI/promptfoo | Python config/runtime | PASS if Apache/permissive blob verified | `pip install nemoguardrails` | B- |
| Guardrails-AI | PASS: 6.8k | PASS-PARTIAL: validators + RAIL schemas | PASS Apache-2.0 | overlaps instructor/outlines safety validators | Python/JS SDK | PASS | `pip install guardrails-ai` | B |

### 3. LANGFUSE EXPLICIT SECTION

Direct blob read result on 2026-05-15:

| item | finding |
|---|---|
| repo | `https://github.com/langfuse/langfuse` |
| stars | 26.8k live GitHub repo page |
| top-level LICENSE | Direct raw blob says content outside `ee/`, `web/src/ee/`, `worker/src/ee/` is “MIT Expat” |
| EE LICENSE | Direct raw blob says EE portions require valid Langfuse Enterprise License |
| SPDX verdict | `MIT` for core; `LicenseRef-Langfuse-Enterprise` for EE directories |
| Probe 6 | PASS-CONDITIONAL: adopt SDK/core only; do not import or vendor EE directories |
| convergence axis 1 | PASS: strong adoption, OTel integrations, prompt/eval/dataset surface |
| convergence axis 2 | PASS: Claude Code/Codex hooks can emit traces; complements ccusage with per-run/session costs |
| convergence axis 3 | PASS-CONDITIONAL: permissive core, commercial EE excluded |
| Probe 4 | no plugin namespace collision; functional overlap with openinference but not duplicate platform |
| Probe 5 | SDK decorators, OpenAI/Anthropic integrations, CLI/API, self-host service |
| CR-12 | PROVIDER-COMPLEMENT |
| install | `pip install langfuse`, optional `npx langfuse-cli`, self-host only if core/permissive deployment path is pinned |
| final grade | A- |

### 4. New ADOPT-NOW Recommendations

| recommendation | why | guardrail |
|---|---|---|
| promptfoo | Local eval/red-team CLI, MIT, strong external validation, distinct from deepeval/ragas | install as CLI only first: `npx promptfoo@latest`; add one smoke config |
| garak | Security/vulnerability scanner, Apache-2.0, distinct safety probe suite | keep as on-demand red-team command, not always-on hook |
| outlines | True constrained decoding beyond instructor/Pydantic validation | Python optional dependency; use only where provider-native structured output is absent |
| Zod | Best TS schema layer for hook/plugin JSON contracts | npm dev/runtime dependency only where TS hooks exist |
| msgspec | Fast Python schema/serialization for hook IPC/log events | add only for hot-path hook JSON/msgpack parsing |
| langfuse core/SDK | Full LLM observability/evals/cost attribution complementing openinference + ccusage | adopt core MIT SDK only; no EE vendoring |

### 5. REJECT List

| candidate | reason |
|---|---|
| langsmith | proprietary SaaS/pricing; Probe 6 reject for permissive-only runtime |
| latitude-llm | LGPL-3.0; Probe 6 reject for current allowlist |
| openai-evals | MIT but Probe-7 demand absence; runtime has no workflow that routes through OpenAI eval registry |
| GPTCache | duplicates incumbent cnighswonger cache fix + Anthropic native prompt cache + context-mode |
| semantic-cache patterns | useful architecture pattern but duplicate functionality, no native install candidate |
| presidio | W211 runtime-broken on Python 3.14 incumbent reject |
| llm-guard | W211 failed sentencepiece incumbent reject |
| Phoenix-Arize | prior ELv2 reject remains binding |

### 6. HONEST-NON-FINDING

Layer 4 has no clean new ADOPT-NOW beyond Langfuse cost attribution because ccusage already covers CLI/API spend and LiteLLM is already cataloged as provider complement. Helicone Cost API is useful as cite-class/provider-pricing reference, but adopting its gateway would overlap CLIProxyAPI/LiteLLM.

Layer 3 has only one conditional new candidate, LLMLingua, and no unconditional ADOPT-NOW: cache/semantic-cache surfaces are already covered by incumbents.

VERDICT: O-WAVE212-COMPLETE — BRIDGE-MODE: codex-rescue Sonnet wrapper invoking real GPT-5.5 via codex CLI subprocess; verdict origin = codex CLI; cross-model gate satisfied — langfuse explicitly graded (LICENSE_VERIFIED_AS_MIT_CORE_WITH_LICENSE_REF_LANGFUSE_ENTERPRISE_EE_DIRS, stars_26800, grade_A-); 25 candidates scored across 6 layers; new ADOPT-NOW: promptfoo, garak, outlines, Zod, msgspec, langfuse-core-SDK; HNF: no new unconditional ADOPT-NOW for layer 3 cache or layer 4 standalone cost tracking beyond Langfuse attribution.
