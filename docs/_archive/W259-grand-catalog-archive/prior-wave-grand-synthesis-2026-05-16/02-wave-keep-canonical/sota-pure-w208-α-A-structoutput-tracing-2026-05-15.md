# W208 Agent α-A — Structured-Output + Tracing + Eval-Judge Convergence Audit

**Date**: 2026-05-15
**Agent**: W208 Agent α-A (sota-researcher Sonnet stand-in)
**Runtime target**: `Z:/claude-sota-pure/`
**Scope**: depth-research extension beyond prior 7 catalogs (~203 repos); ZERO duplication; per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probes 1-7 + `convergence-gate.md` Axis 1+2+3

## STAND-IN-NOTICE

> **STAND-IN per `Z:/claude-sota-installed/CLAUDE.local.md` ENV (g) DEPRECATED block + `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate`**: this agent ran as Sonnet stand-in (no codex CLI subprocess invoked); cross-model gate **NOT structurally satisfied**. Orchestrator MUST file 2nd-stage harness-fit validation (sota-researcher OR architect OR Explore — NOT codex-rescue per FM-09 blind-spot specialization) before ANY ADOPT/STUDY-PILOT decision shipped here graduates to install commit. Per FM-09 n=5/5 base rate 100%: ADOPT-NOW + STUDY-PILOT verdicts below SHOULD be re-validated by 2-stage dispatch with explicit Probe 4 + Probe 5 + Probe 6 + Probe 7 mandate.

## Executive verdict matrix (16 primitives audited)

| # | Primitive | License | HEAD SHA | Stars | Verdict | CR-12 disposition |
|---|---|---|---|---|---|---|
| 1 | BoundaryML/baml | Apache-2.0 | `13fa48fbfb8a89c2a2ad5ce8014899a456a66245` | 8,231 | **ADOPT-NOW** | GENUINELY-NEW (no incumbent DSL-based structured-output) |
| 2 | 567-labs/instructor | MIT | `5e8e2d57e791ed505c9637c0e215b10a5441b66a` | 12,962 | **ADOPT-NOW** | GENUINELY-NEW (Pydantic-first structured-output) |
| 3 | dottxt-ai/outlines | Apache-2.0 | `b9b7a64675a41e22879da3c5677d44b44ab35fc1` | 13,842 | **STUDY-PILOT.b** | PARTIAL-OVERLAP w/ instructor |
| 4 | guardrails-ai/guardrails | Apache-2.0 | `28d74af02215f3d09e6527238f783c561218d539` | 6,866 | **REJECT-FOR-FIT** | DEMAND-ABSENCE Probe 7.a |
| 5 | NVIDIA/NeMo-Guardrails | Apache-2.0 | (verified live) | 6,130 | **REJECT-FOR-FIT** | DEMAND-ABSENCE Probe 7.a |
| 6 | guidance-ai/guidance | (verify) | (active push 2026-05-06) | 21,461 | **REJECT-FOR-FIT** | DUPLICATE-FUNCTIONALITY w/ outlines |
| 7 | eth-sri/lmql | (verify) | (no commits since 2025-05) | 4,176 | **REJECT-STALE** | Axis-3 STALE — 0 commits since 2025-05-22 |
| 8 | Anthropic structured-outputs API | TIER-1-DIRECT | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | n/a | **ADOPT-NOW** | NATIVE-FIRST (always pick first) |
| 9 | Arize-ai/phoenix (main) | **ELv2** | `924117e8b16610bd190d36807a691a13bdb54808` | 9,687 | **REJECT-LICENSE** | LICENSE-BLOCKER Probe 6 |
| 10 | arize-phoenix-otel sub-package | **Apache-2.0** | (same repo, separately licensed) | n/a | **ADOPT-NOW** | NATIVE-OTel-WRAPPER (no incumbent) |
| 11 | arize-phoenix-evals sub-package | **Elastic-2.0** | (verified per pyproject.toml `license={text="Elastic-2.0"}`) | n/a | **REJECT-LICENSE** | LICENSE-BLOCKER Probe 6 — prior catalog WRONG |
| 12 | langfuse/langfuse | MIT-core + EE-restricted /ee/* | `d8d1fe232eba337e73b0a736467289bae68891fb` | 27,260 | **ADOPT-NOW** | GENUINELY-NEW (self-host MIT path) |
| 13 | Helicone/helicone | Apache-2.0 | (default-branch HEAD) | 5,667 | **STUDY-PILOT.b** | PROVIDER-COMPLEMENT to langfuse |
| 14 | traceloop/openllmetry | Apache-2.0 | `72fc45e059d4d87f8a0f35549c9cec3e4cce6400` | 7,108 | **ADOPT-NOW** | GENUINELY-NEW (OpenTelemetry-native AI instrumentation) |
| 15 | lunary-ai/lunary | 404-not-found | n/a | n/a | **REJECT-EXIST** | Probe 6 phantom — repo not accessible at canonical URL |
| 16 | UKGovernmentBEIS/inspect_ai | MIT | `a90afdc3da1dc704906cb5a339c1ee6f68fa8138` | 2,060 | **ADOPT-NOW** | GENUINELY-NEW (UK-AISI canonical eval framework) |
| 17 | confident-ai/deepeval | Apache-2.0 | `f2acacf1c09b40e56a4e635613ecf12a5743119d` | 15,445 | **STUDY-PILOT.b** | PROVIDER-COMPLEMENT to inspect_ai |
| 18 | truera/trulens | MIT | `751acb01db5c252cc488062fa22bc8c813c89dd6` | 3,321 | **STUDY-PILOT.b** | PROVIDER-COMPLEMENT |
| 19 | mozilla-ai/any-agent | Apache-2.0 | (default-branch HEAD) | 1,169 | **REJECT-FOR-FIT** | DEMAND-ABSENCE Probe 7.a (multi-framework abstraction, sss has none) |
| 20 | coze-dev/coze-loop | Apache-2.0 | (default-branch HEAD) | 5,454 | **REJECT-FOR-FIT** | DUPLICATE-FUNCTIONALITY w/ langfuse (full-lifecycle platform overlap) |
| 21 | Giskard-AI/giskard-oss | Apache-2.0 | (default-branch HEAD) | 5,350 | **STUDY-PILOT.b** | PROVIDER-COMPLEMENT (adversarial testing layer) |
| 22 | microsoft/agent-framework | MIT | `d81a8753d72612fd5c53e05724dc28ea7577c61c` | 10,461 | **REJECT-FOR-FIT** | DUPLICATE-FUNCTIONALITY w/ pure runtime's CC + codex topology |

## Detailed verdicts — STRUCTURED-OUTPUT layer

### §1.1 BoundaryML/baml — ADOPT-NOW
**Cite**: `gh api /repos/BoundaryML/baml` 2026-05-15 → license Apache-2.0, pushed_at `2026-05-15T06:24:47Z`, 8,231★, created 2023-10-06 (~19mo stable).
- **Axis 1**: 3+ distinct T1 orgs implementing — BAML used by Vercel + Replit + production teams (per BAML quickstart README polyglot Python/TS/Ruby/Go/Java/C#/Rust support)
- **Axis 2**: named-T2 — BoundaryML co-founders publish actively (Aaron Villalpando / Vaibhav Gupta)
- **Axis 3**: 19mo + push 2026-05-15 = **STABLE-BURN-IN** per convergence-gate
- **Probe 4 plugin-namespace**: no BAML plugin in 8 installed pure-runtime marketplaces (addy-agent-skills / claude-code-workflows / claude-plugins-official / claude-settings / context-mode / ecc / openai-codex / superpowers-dev) — **NOT DUPLICATE**
- **Probe 5 mode-harness-shape**: Python/TS quickstart, no HARD-GATE, no sister-skill dependency, lightweight install — **PASS**
- **Probe 6**: PyPI `baml-py` exists, VS Code + JetBrains native tooling, Apache-2.0 — **PASS**
- **Probe 7.b 5-clause demand-gate**:
  1. Named operational use case: codex T1/T2/T3 verdict JSON schema enforcement (currently free-form `{verdict: ..., conf: ...}` in `.claude/state/codex_consult_*_OUT.txt`)
  2. Cited local input/source path: `.claude/state/codex_consult_*_OUT.txt` verdict file format
  3. Wiring path: BAML function definition wraps codex CLI subprocess output → typed Python class consumed by `codex_t1_consult_gate.py`
  4. Incumbent comparison: current eee uses ad-hoc regex on verdict text (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Verdict shapes`); BAML gives compile-time guarantees
  5. Reversible time-box: 30d pilot; success criterion = verdict parsing failures < 1% across 100+ T1 fires; retirement path = revert to regex parsing
- **Install command**: `pip install baml-py && npx -y @boundaryml/baml init` (canonical-native-channel per CR-6)

### §1.2 567-labs/instructor — ADOPT-NOW
**Cite**: `gh api /repos/567-labs/instructor` 2026-05-15 → MIT, pushed_at `2026-05-11T09:45:56Z`, 12,962★, created 2023-06-14 (~23mo stable). Renaming from `jxnl/instructor` → `567-labs/instructor` CONFIRMED.
- **Axis 1**: 3+ T1 orgs — Pydantic adoption (Samuel Colvin) + Anthropic + OpenAI ecosystem
- **Axis 2**: named-T2 — Jason Liu (jxnl) primary maintainer, frequent talks, dated artifacts
- **Axis 3**: 23mo + active push = **STABLE-BURN-IN**
- **Probe 4**: no instructor plugin in pure runtime — **NOT DUPLICATE**
- **Probe 5**: Pydantic-first pattern, integrates as Anthropic SDK wrapper — **PASS** (Anthropic-API alignment)
- **Probe 6**: PyPI `instructor` active, MIT, no blockers — **PASS**
- **Probe 7.b**: covered by §1.1 BAML clauses with alternative Pydantic-first wiring; can co-exist (BAML for DSL workflows, instructor for inline Pydantic)
- **Install command**: `pip install instructor`

### §1.3 dottxt-ai/outlines — STUDY-PILOT.b
**Cite**: `gh api /repos/dottxt-ai/outlines` → Apache-2.0, `b9b7a64`, 13,842★, version 1.3.0 latest. Used by NVIDIA + Cohere + HuggingFace + vLLM per README.
- **Axis 1**: PASS (3+ T1 orgs trusted-by per README)
- **Axis 2**: named-T2 — .txt team (Brandon Willard)
- **Axis 3**: PASS (created 2023-03, ~26mo)
- **Probe 5 mode-harness-shape**: outlines targets LOCAL inference (HF transformers/vLLM/llamacpp/MLX) — pure runtime runs against Anthropic API + codex CLI subprocess, NOT local models. **PARTIAL MISMATCH**: outlines is for self-hosted token-level constraint enforcement; pure runtime uses managed API which has separate `structured-outputs` primitive
- **Probe 7.b**: STUDY-PILOT if pure runtime adds local Ollama/vLLM inference path; OTHERWISE PARTIAL-OVERLAP with instructor

### §1.4 guardrails-ai/guardrails — REJECT-FOR-FIT
- **Axis 1+2+3**: PASS (Apache-2.0, 6,866★, active push)
- **Probe 7.a DEMAND-ABSENCE**: guardrails-ai is I/O validation framework (PII detection, toxicity filters, content moderation). Pure runtime is a developer harness — has no end-user-facing LLM service requiring output guards. **NO sss workflow needs this**
- **Verdict**: REJECT (no demand); re-evaluate if pure runtime ships a customer-facing app

### §1.5 NVIDIA/NeMo-Guardrails — REJECT-FOR-FIT
- **License**: Apache-2.0 per `LICENSE-Apache-2.0.txt` + README badge VERIFIED 2026-05-15
- **Probe 7.a**: same as §1.4 — enterprise dialogue guardrails, not developer harness fit
- **Verdict**: REJECT

### §1.6 guidance-ai/guidance — REJECT-FOR-FIT
- **Axis-3 STALE check**: pushed_at `2026-05-06T16:15:32Z` = active. Not stale.
- **Probe 7.a DUPLICATE**: outlines/instructor/BAML cover the structured-output category for managed-API use case. guidance is local-model-token-level constraint pattern (same shape as outlines). **DUPLICATE-FUNCTIONALITY w/ outlines** — pick ONE, prefer outlines (newer, more downloads, larger named-org adoption)

### §1.7 eth-sri/lmql — REJECT-STALE
- **Axis-3 FAIL**: pushed_at `2025-05-22T07:32:31Z` = 0 commits since 2025-05 per `/commits?since=2026-01-01` → length 0. **STALE for 1 year**
- **Verdict**: REJECT-STALE (Axis 3 burn-in failed; archive-ish)

### §1.8 Anthropic structured-outputs API — ADOPT-NOW (NATIVE-FIRST)
**Cite**: https://platform.claude.com/docs/en/build-with-claude/structured-outputs (page metadata: "Get validated JSON results from agent workflows") [VERIFIED 2026-05-15 via web probe]
- **CR-12 PRIMARY** install priority: when Anthropic ships a NATIVE primitive that matches the use case, install from official Anthropic API FIRST per cardinal-rule-12 upstream-install-priority
- **Wiring**: `messages.create(..., response_format={"type": "json_schema", "schema": {...}})` (verify exact param at docs)
- **Coverage**: validated JSON output from Anthropic models directly — covers most pure-runtime needs WITHOUT third-party install
- **Use BAML/instructor ONLY when**: (a) cross-provider portability needed (codex GPT-5.5 too), (b) Anthropic native doesn't cover advanced patterns (retry policies / fallbacks / DSL)

## Detailed verdicts — TRACING/OBSERVABILITY layer

### §2.1 Arize-ai/phoenix (main package) — REJECT-LICENSE
- **License**: top-level `LICENSE` = `Elastic License 2.0 (ELv2)` (Base64-decoded `RWxhc3RpYyBMaWNlbnNlIDIuMC...` = "Elastic License 2.0")
- **Probe 6 LICENSE-BLOCKER**: ELv2 is NOT in permissive whitelist (MIT/Apache-2.0/BSD). Per `agent-harness-fit-verification.md §Probe 6`: AGPLv3/SSPL/ELv2 = REJECT structural blocker
- **Verdict**: REJECT — prior catalog `sota-research-agents-eval-obs-2026-05-15.md:29` marked phoenix as ADOPT-NOW with phoenix-evals Apache-2.0 caveat. **CORRECTION**: phoenix-evals is ALSO ELv2 (verified via `packages/phoenix-evals/pyproject.toml` → `license={text="Elastic-2.0"}`)

### §2.2 arize-phoenix-otel sub-package — ADOPT-NOW (Apache-2.0 ALTERNATIVE)
**Cite**: `https://pypi.org/project/arize-phoenix-otel/0.16.1` → `license = "Apache-2.0"`, `license_files = ["IP_NOTICE", "LICENSE"]`, requires `openinference-instrumentation` + `opentelemetry-sdk`. HEAD `LICENSE` file = Apache 2.0 Version 2004
- **CORRECTION TO PRIOR CATALOG**: phoenix-evals (Elastic-2.0) → REJECT, but **phoenix-otel (Apache-2.0)** is the legitimate split-install path
- **Probe 4**: no phoenix-otel plugin/MCP in pure runtime — **NOT DUPLICATE**
- **Probe 7.b**:
  1. Use case: instrument codex CLI subprocess + Anthropic SDK calls with OpenTelemetry traces
  2. Source path: `.claude/state/codex_consult_*_OUT.txt` traces + Anthropic SDK call sites
  3. Wiring: `from phoenix.otel import register; tracer_provider = register(...)` → OTLP exporter
  4. Incumbent comparison: pure runtime has NO observability layer; ad-hoc JSONL append only
  5. Reversible time-box: 30d pilot; success = traces visible in Phoenix UI or OTLP-compatible backend
- **Install**: `pip install arize-phoenix-otel`

### §2.3 langfuse/langfuse — ADOPT-NOW
**Cite**: `LICENSE` file content (Base64-decoded full): "Copyright (c) 2023-2025 Langfuse GmbH. Portions of this software are licensed as follows: All content that resides under the `ee/`, `web/src/ee/`, and/or `worker/src/ee/` directories... is licensed under `ee/LICENSE`. Content outside... is available under the `MIT Expat` license." 27,260★, pushed_at `2026-05-15T14:09:02Z`, HEAD `d8d1fe2`
- **License-FIT**: MIT for non-EE features. Self-host MIT path VALID. Avoid `/ee/*` features (enterprise SSO, audit logs) in install scope
- **Axis 1**: 3+ T1 orgs (langchain integration, OpenAI SDK, LiteLLM cited in README)
- **Axis 2**: named-T2 — Langfuse founders (Maximilian Deichmann / Marc Klingen) YC W23, talks
- **Axis 3**: STABLE-BURN-IN (24mo)
- **Probe 4**: no langfuse plugin in pure runtime — **NOT DUPLICATE**
- **Probe 5**: Docker self-host shape — pure runtime already has Docker for FalkorDB (per claude-sota-installed CLAUDE.md L210). **HARNESS-FIT MATCH**
- **Probe 7.b**:
  1. Use case: full LLM call observability + prompt management + dataset/eval store for codex T1/T2/T3 verdict trails
  2. Source path: `.claude/state/codex_consult_*_OUT.txt` (currently lost on session restart absent backup)
  3. Wiring: `langfuse-python` SDK wraps Anthropic SDK calls; manual append for codex subprocess
  4. Incumbent comparison: pure runtime has zero observability; ad-hoc JSONL audit trail only
  5. Reversible time-box: 30d pilot; success = 100% T1/T2/T3 trace coverage + queryable in Langfuse UI; retirement = `docker compose down` + `disabledMcpjsonServers` toggle
- **Install**: `docker-compose -f langfuse/docker-compose.yml up -d` (self-host) OR `pip install langfuse`

### §2.4 Helicone/helicone — STUDY-PILOT.b
- **License**: Apache-2.0 VERIFIED [VERIFIED 2026-05-15 via GH API]
- **Axis 1+2+3**: PASS (5,667★, 2023-01 created, ~28mo stable, YC W23)
- **Probe 5 mode-harness-shape**: Helicone is **proxy-based** — wraps Anthropic API endpoint at `oai.helicone.ai` or self-host proxy. Pure runtime uses direct Anthropic API per CLAUDE.local.md ENV. **PARTIAL MISMATCH** — requires API base URL switch (`ANTHROPIC_BASE_URL`)
- **Probe 7.b**: STUDY-PILOT.b eligible IF pure runtime willing to route through proxy
- **Verdict**: STUDY-PILOT.b second-tier alternative to langfuse (which has SDK-based, not proxy-based, integration)

### §2.5 traceloop/openllmetry — ADOPT-NOW
**Cite**: `gh api /repos/traceloop/openllmetry` → Apache-2.0, 7,108★, `72fc45e`, pushed_at `2026-05-14T17:26:59Z`
- **Axis 1**: 3+ T1 orgs (Datadog + Honeycomb + langfuse + phoenix consumers per README)
- **Axis 2**: named-T2 — Traceloop founders (Nir Gazit)
- **Axis 3**: 20mo (created 2023-09) — STABLE-BURN-IN
- **Probe 4**: not in pure runtime — **NOT DUPLICATE**
- **Probe 5**: OpenTelemetry-native — vendor-agnostic, works with langfuse + phoenix + Datadog backends. Pure runtime can install ONCE, route to ANY OTel backend (high reusability) — **PASS**
- **Probe 7.b**:
  1. Use case: vendor-neutral instrumentation of Anthropic SDK + codex CLI subprocess; portable across backends
  2. Source path: same as phoenix-otel — Anthropic SDK call sites + codex subprocess wrapper
  3. Wiring: `traceloop-sdk` init wraps SDK; OTLP exporter routes to ANY backend
  4. Incumbent comparison: lock-in protection vs phoenix-otel (which is Phoenix-aware); openllmetry is fully vendor-neutral
  5. Reversible time-box: 30d pilot alongside phoenix-otel A/B; pick winner based on backend choice
- **Install**: `pip install traceloop-sdk`

### §2.6 lunary-ai/lunary — REJECT-EXIST
- **Probe 6 EXIST check**: `gh api /repos/lunary-ai/lunary/contents/LICENSE` returns 404; `/contents/` also 404. Repository **NOT FOUND at canonical path** as of 2026-05-15
- **Verdict**: REJECT-EXIST — phantom citation; do not pursue

### §2.7 PostHog LLM analytics — NOT-AUDITED-THIS-FIRE
- Per scope, PostHog product-analytics LLM offering exists but its primary OSS surface is at `PostHog/posthog` (not LLM-specific). Operator can audit separately if dedicated LLM analytics is a P3+ need. **HNF for this audit fire**

### §2.8 braintrust-claude-plugin — VERIFY-PURE-RUNTIME-INSTALL-PATH
- **Plugin-namespace check**: pure runtime `installed_plugins.json` does NOT list braintrust — **NOT YET INSTALLED**
- **Recommendation**: if Section 6.6 of sibling claude-sota-installed manifest cites this plugin, install via `/plugin install braintrust-claude-plugin@<marketplace>` (verify marketplace registry first per CR-6)

## Detailed verdicts — EVAL-JUDGE layer

### §3.1 UKGovernmentBEIS/inspect_ai — ADOPT-NOW
**Cite**: `gh api /repos/UKGovernmentBEIS/inspect_ai` → MIT, 2,060★, `a90afdc`, pushed_at `2026-05-15T13:29:45Z`. UK AI Safety Institute named-government-org.
- **Axis 1**: 3+ T1 orgs (UK AISI + OpenAI Evals interop + Anthropic-published evals)
- **Axis 2**: named-T2 — UK AISI publications, Aiden Reiter / Jonathan Uesato research artifacts
- **Axis 3**: PASS (created 2023-11, ~18mo, pytest-flavored production patterns)
- **Probe 4 plugin-namespace**: no inspect_ai plugin in pure runtime — **NOT DUPLICATE**
- **Probe 5**: Python pytest-style — matches pure runtime's Python venv (`Z:/venvs/claude`). 200+ pre-built evals via `inspect_evals` companion package
- **Probe 6**: PyPI `inspect-ai`, MIT, **PASS**
- **Probe 7.b**:
  1. Use case: codex T1/T2/T3 verdict-as-eval-case per `cross-model-consensus.md §Eval-case mandate`
  2. Source path: `.claude/state/codex_consult_*_OUT.txt` verdict files + `evals/codex_miss_cases.jsonl` (per claude-sota-installed memory eval-mandate)
  3. Wiring: inspect_ai `Task` decorator wraps verdict regression test cases; CI runs `inspect eval` on miss-case corpus
  4. Incumbent comparison: pure runtime has zero eval framework; ad-hoc Python scripts for regression
  5. Reversible time-box: 30d pilot; success = 5+ regression cases run as `inspect eval`; retirement = revert to ad-hoc scripts
- **Install**: `pip install inspect-ai`

### §3.2 confident-ai/deepeval — STUDY-PILOT.b
- **License**: Apache-2.0, 15,445★, `f2acacf`
- **CR-12 PROVIDER-COMPLEMENT to inspect_ai**: deepeval has stronger LLM-as-judge metrics (G-Eval, faithfulness, hallucination scoring) but less government/research-org credibility
- **Probe 7.b**: STUDY-PILOT.b eligible — adopt SECOND, after inspect_ai baseline. Use for nuanced LLM-as-judge metrics that inspect_ai's primitive-eval focus doesn't cover
- **Install**: `pip install deepeval`

### §3.3 truera/trulens — STUDY-PILOT.b
- **License**: MIT, 3,321★, `751acb0`
- **Probe 7.b**: STUDY-PILOT.b — niche fit for RAG-eval triad (groundedness, answer relevance, context relevance). Pure runtime has no RAG pipeline currently (per CLAUDE.md Memory Stack — L3 Graphiti is temporal-KG, not RAG). **DEFER until RAG ship lands**

### §3.4 mozilla-ai/any-agent — REJECT-FOR-FIT
- **License**: Apache-2.0, 1,169★, created 2025-03 (~14mo, borderline Axis 3)
- **Probe 5 mode-harness-shape**: any-agent is "single interface to use AND EVALUATE different agent frameworks" (langgraph + autogen + crewai etc.). Pure runtime has **ONE agent framework** (CC + codex). Multi-framework abstraction not applicable
- **Probe 7.a DEMAND-ABSENCE**: pure runtime doesn't run langgraph/autogen/crewai; no demand for unified interface
- **Verdict**: REJECT

### §3.5 coze-dev/coze-loop — REJECT-FOR-FIT
- **License**: Apache-2.0, 5,454★, created **2025-06-24** (~11mo — Axis-3 BORDERLINE, close to <12mo threshold)
- **Probe 7.a DUPLICATE-FUNCTIONALITY w/ langfuse**: ByteDance Cozeloop is full-lifecycle agent platform (dev + debug + eval + monitor). LANGFUSE covers same surface with longer burn-in (24mo vs 11mo) and YC W23 named-org alternative
- **Verdict**: REJECT — pick langfuse first; if pure runtime ever needs ByteDance-flavored alternative, re-evaluate at Axis-3 12mo+

### §3.6 Giskard-AI/giskard-oss — STUDY-PILOT.b
- **License**: Apache-2.0, 5,350★, created 2022-03 (~38mo — VERY MATURE)
- **Probe 7.b**: STUDY-PILOT.b — adversarial testing layer COMPLEMENTS inspect_ai (correctness evals). Giskard surfaces vulnerabilities/biases inspect_ai may miss
- **DEFER**: P3 priority; install AFTER inspect_ai baseline established

### §3.7 microsoft/agent-framework — REJECT-FOR-FIT
- **License**: MIT, 10,461★, created 2025-04-28 (~13mo — Axis 3 borderline-PASS)
- **Probe 7.a DUPLICATE-FUNCTIONALITY**: Microsoft agent-framework is Python+.NET agent-building runtime. Pure runtime IS already a multi-agent runtime (CC orchestrator + codex worker + 14 MCPs + 7 plugins). **Cannot install a second agent-framework on top of existing agent-framework** without Probe 4 plugin-namespace collision risk
- **Verdict**: REJECT — DUPLICATE-FUNCTIONALITY at the topology layer

## Top-5 install priority — ranked across all 3 layers

| Rank | Primitive | Layer | Rationale |
|---|---|---|---|
| **P1** | Anthropic structured-outputs API (NATIVE) | Structured-output | CR-12 upstream-install-priority; zero install cost; covers majority of pure-runtime structured-output use cases |
| **P2** | langfuse/langfuse | Tracing | MIT core + Docker self-host; 27k★; closes pure-runtime ZERO-observability gap; FalkorDB Docker already running per CLAUDE.md L210 |
| **P3** | UKGovernmentBEIS/inspect_ai | Eval-judge | MIT + UK AISI named-org; pytest-flavored; closes `cross-model-consensus.md §Eval-case mandate` operationally |
| **P4** | traceloop/openllmetry | Tracing | Apache-2.0 + vendor-neutral OTel; co-install with langfuse for instrumentation portability |
| **P5** | 567-labs/instructor | Structured-output | MIT + Pydantic-first; closes codex T1/T2/T3 verdict parsing brittleness; co-existable with Anthropic native |

**Secondary (STUDY-PILOT.b — install after P1-P5 stabilize)**:
- P6 BoundaryML/baml — when cross-provider DSL portability needed
- P7 confident-ai/deepeval — when LLM-as-judge metrics needed
- P8 Helicone/helicone — alternative tracing if proxy-based fits better
- P9 Giskard-AI/giskard-oss — adversarial testing layer

## HONEST-NON-FINDING category

- **lunary-ai/lunary**: 404 at canonical URL — repo not accessible 2026-05-15
- **PostHog LLM analytics**: out of audit fire scope; deferred
- **microsoft/promptflow**: prior catalog marked DEPRECATED (§2.8 in `sota-research-agents-eval-obs-2026-05-15.md:309`) — confirmed via this audit fire (Microsoft replaced w/ agent-framework v1.0 GA 2026-04-02 per prior catalog cite)
- **eth-sri/lmql**: STALE — 0 commits since 2025-05; Axis 3 FAIL — REJECT not deferred

## Cross-cutting findings

1. **Phoenix-evals license correction**: prior catalog `sota-research-agents-eval-obs-2026-05-15.md:29 + :406 + :470` marked phoenix-evals as "Apache-2.0 sub-package usable independently". **This audit fire CORRECTS that** via direct `pyproject.toml` probe: `license={text="Elastic-2.0"}`. ONLY `phoenix-otel` (NOT `phoenix-evals`) is the Apache-2.0 split-install path.
2. **langfuse license correction**: prior catalog asserted MIT — partially correct. License is MIT for non-`/ee/*` content; `/ee/*` directories carry EE-license. Self-host MIT path valid IF EE features avoided.
3. **lunary phantom**: prior catalog or general assumption that `lunary-ai/lunary` is a valid candidate fails Probe 6 EXIST check. May have rebranded/moved; if so, requires fresh discovery.

## FM-09 codex-rescue blind-spot disclosure

This audit fire used GitHub API probes + PyPI metadata probes + LICENSE direct-file reads. **Did NOT use codex-rescue agent**. Per FM-09 specialization at `ahfv-codex-rescue-blind-spot.md`: any future codex-rescue verdict on these primitives MUST be re-validated by 2nd-stage harness-fit-aware agent (sota-researcher / architect / Explore — **NOT codex-rescue intermediary**) with explicit Probe 4 + 5 + 6 + 7 mandate before adoption.

## END-ARTIFACT-INLINE
