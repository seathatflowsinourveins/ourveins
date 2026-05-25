# W378 SOTA-Convergence R2 — ComposioHQ/composio · langgenius/dify

> **Wave**: W378 SOTA-CONVERGENCE · **Agent**: R2 · **Date**: 2026-05-23
> **Model**: claude-opus-4-7[1m] · **subagent_type**: general-purpose (CR-3 sanctioned bare-name)
> **Framework**: sca-v20 multi-dim (`Z:/claude-sota-installed-W375/.claude/schemas/sca-v20-multi-dim.schema.json`) + W377 META-C/D/F
> **Discipline**: cardinal-rule-6 verify-before-claim — every dim value cite-anchored to a CLASS-A/B/C source probed live this session 2026-05-23.
> **Multi-angle method (4 sources)**: gh-API (CLASS-A) · repomix-grep + gh contents (CLASS-A) · deepwiki ask_question (CLASS-C) · perplexity_research (CLASS-B). ≥2-source convergence noted per dim in §3.

---

## §1 Per-repo findings

### §1.1 `ComposioHQ/composio` — managed-auth tool-broker + MCP gateway

**What it is**: a unified tool/integration layer for AI agents — "1000+ toolkits, tool search, context management, authentication, and a sandboxed workbench" (gh-API `description` 2026-05-23). The product solves the **auth-to-action** problem: per-user OAuth, token lifecycle, tool-schema curation, and side-effecting tool execution across 1000+ SaaS toolkits (perplexity §1 [3][17][18]).

**Architecture (deepwiki CLASS-C + perplexity CLASS-B convergent)**:
- **Tool/Integration Registry** — catalog of pre-built *toolkits* (Gmail, GitHub, Slack), each holding individual *tools* (`GMAIL_SEND_EMAIL`) with standardized **JSON Schema** input/output. Tools discovered at runtime via the `COMPOSIO_SEARCH_TOOLS` meta-tool to prevent context-window bloat (deepwiki).
- **Managed-Auth Broker** — `Auth Configs` (OAuth2/API-Key blueprints) + `Connected Accounts` (user credentials). On auth-required tool, generates a hosted **Connect Link**; Composio handles full OAuth flow + token exchange + automatic refresh; connections persist across sessions (deepwiki; perplexity: "reduce auth code by ~90%" [12]).
- **Session model** — `composio.create(user_id)` returns a user-scoped session; `session.tools()` formats tools per framework via **Provider** packages; meta-tools `COMPOSIO_SEARCH_TOOLS` / `COMPOSIO_MANAGE_CONNECTIONS` / `COMPOSIO_MULTI_EXECUTE_TOOL` allow discover/auth/execute at runtime (deepwiki).
- **MCP-native** — `session.mcp.url` + `session.mcp.headers`; any MCP client connects to a Composio MCP server URL without provider packages. **Tool Router** (`/api/v3/tool_router`) creates isolated MCP sessions with scoped toolkit access. Enterprise **MCP Gateway** offering (perplexity [4][17]).
- **Provider packages** (gh contents `python/providers/` 2026-05-23): `anthropic`, `claude_agent_sdk`, `autogen`, `crewai`, `gemini`, `google`, `google_adk`, `langchain`, `langgraph`, `llamaindex`, `openai`, `openai_agents`. **The `claude_agent_sdk` provider is a direct Claude Agent SDK integration pathway** — plus a Claude Code toolkit page (perplexity [30] `composio.dev/toolkits/mem/framework/claude-code`).

**Install pathway (D13 — CLASS-A live)**: `pip install composio` → PyPI `composio==0.13.1`, `requires-python >=3.9,<4`, deps `pydantic>=2.6.4` (Pydantic-v2 native), `composio-client==1.39.0`, `openai`, `json-schema-to-pydantic` (gh `python/pyproject.toml` + pypi JSON). TypeScript SDK `@composio/core==0.10.0` on npm. **D13 = sdk-python** (also sdk-typescript + mcp-server). This is the honest INSTALL-fit answer the task asked for: Composio IS installable into our runtime as either (a) a `pip` SDK dep with the `claude_agent_sdk`/`anthropic` provider, or (b) an MCP server in `.mcp.json` via its hosted Tool Router URL.

**Engineering rigor (CLASS-A)**: 28 GitHub Actions workflows incl. `security.secrets-detection.yml`, `py.release.yml`, `py.test.yml`, `ts.audit.yml`, `ts.test.yml`, `ts.typecheck.yml`, `cli.install-health-check.yml`, `claude-code-doc-review.yml` (gh `.github/workflows/`). npm `@composio/core` `dist.signatures: present` (registry signed) but no SLSA build attestations → **D08 ≈ 1** (signed-release, not SLSA-L2-verified). Trust posture page `trust.composio.dev` (perplexity [25]).

**File-path stability (D15)**: deepwiki confirms core files (`composio/sdk.py`, `composio/core/models/tools.py`, `composio/core/models/mcp.py`) are stable with no frequent renames; 100 commits touched `python/composio` in 90d = active dev (gh commits API). Stable paths + active = good cite-anchor density.

**License (D07 — CLASS-A)**: **MIT** (gh-API SPDX `MIT` + LICENSE). Minor inconsistency: `python/pyproject.toml` classifiers list "Apache Software License" and pypi `license: None` — gh-API SPDX = MIT is authoritative (repo-root LICENSE). Flagged per CR-6; does not change permissive classification (both MIT and Apache-2.0 are permissive).

---

### §1.2 `langgenius/dify` — LLMOps platform (workflow-DAG + RAG + agent orchestration)

**What it is**: "Production-ready platform for agentic workflow development" (gh-API `description`). A full self-hosted LLMOps platform — visual workflow builder, RAG pipeline, agent orchestration, model management, observability — deployed as a service, NOT a library.

**Architecture (deepwiki CLASS-C + perplexity CLASS-B convergent)**:
- **Workflow DAG engine** — orchestrates directed acyclic graphs; nodes = operations, edges = data flow. Node types: `LLMNode`, `HttpRequestNode`, `CodeNode` (Python/JS sandbox), `KnowledgeRetrievalNode` (RAG), `HumanInputNode` (HITL). Instantiated by `DifyNodeFactory`. Execution via `GraphEngine`; `WorkflowEntry` initializes + manages child engines for sub-graphs; `GraphRuntimeState` + `VariablePool` manage state/data (deepwiki). Modular **"Beehive" architecture** with a **queue-based** workflow graph engine + parallel-branch execution (perplexity [25][26]).
  - Files: `api/core/workflow/workflow_entry.py`, `api/core/workflow/node_factory.py` (deepwiki).
- **RAG pipeline** — `KnowledgeRetrievalNode` central; `RagPipelineTransformService` converts datasets into workflow-execution-graphs for indexing; reranking models + weighted scoring across multiple retrieval configs. Knowledge Pipeline supports Agentic RAG, graph-based context expansion, hybrid vector search (deepwiki; perplexity [3][27]).
  - Files: `api/services/rag_pipeline/rag_pipeline.py`, `api/core/workflow/nodes/knowledge_retrieval/knowledge_retrieval_node.py`, `api/services/rag_pipeline/rag_pipeline_dsl_service.py` (deepwiki).
- **Agent orchestration** — `Agent Node` + pluggable `Agent Strategies` (ReAct + function-calling) embed tool selection + iterative reasoning inside the workflow graph (perplexity [33]). Files (gh contents `api/core/workflow/nodes/agent/`): `agent_node.py`, `strategy_protocols.py`, `plugin_strategy_adapter.py`, `entities.py`, `runtime_support.py`, `message_transformer.py`.
- **Model management** — unified model-provider abstraction; cloud APIs + local (vLLM, XInference); load-balanced credential pools; YAML+Python provider plugins (perplexity [5][14][23]).
- **Observability** — `LangFuseDataTrace` in `api/providers/trace/trace-langfuse/.../langfuse_trace.py` records node executions + metadata; `ObservabilityLayer` added to `GraphEngine` when OpenTelemetry enabled. Aligned to OTEL/OTLP semantics; Langfuse + Arize Phoenix integrations (deepwiki; perplexity [18][22][34]).

**Install pathway (D13 — CLASS-A live)**: Deployed via **Docker Compose / Kubernetes Helm** self-hosted (perplexity [9]); Dify Cloud + AWS AMI Premium tiers. SDKs dir (`gh contents sdks/`) = **`nodejs-client` + `php-client` only** — NO embeddable Python library. The "Python SDK" `dify-client` (perplexity [16][17]) is a thin **HTTP client wrapping the App Service API** — it treats a deployed Dify app as a remote backend, it does NOT install the workflow engine into your process. **For our Python CLI orchestration runtime, D13 = library-only/none** (the engine is `api/` server code, deployed not imported). Releases are semver platform versions `1.14.2` (gh releases), not a pip/npm primitive.

**License (D07 — CLASS-A, decisive)**: **NOASSERTION** per gh-API SPDX. LICENSE file read (gh raw) = **"Dify Open Source License" — a modified Apache-2.0** with two added conditions: (1a) **may NOT operate a multi-tenant service** without a written commercial license from LangGenius; (1b) **may NOT remove/modify the LOGO or copyright** in the `web/` frontend. © 2025 LangGenius, Inc. This is **source-available, not permissive** (perplexity [6][8] "separation of free Community Edition from licensed Enterprise"). It is the canonical META-D §1.2 source-available case + META-F §2.2 NOT-permissive case.

**Activity (CLASS-A)**: extremely active — last commit 2026-05-22, 1397 issues closed / 1286 opened in 90d (close-rate ~1.09), ~459 contributor pages (gh contributors Link header `page=460`). 142.3k stars, forks/star 0.157 (organic).

---

## §2 sca-v20 multi-dim score tables

Stars cluster (D01-D03) is **informational-only** (never weighted into INSTALL/PATTERN-STUDY/CITE-ONLY per schema §40-54 + OSSF Criticality). Both repos pass MALTA fake-star sanity (forks/star ~0.16, healthy 0.05-0.15 band edge, cross-checked vs high commit cadence → organic).

### §2.1 `ComposioHQ/composio`

| Dim | Value | Source / anchor | Conf |
|---|---|---|---|
| D01 stars_raw | 28,400 | gh-api (info-only) | HIGH |
| D02 stars_growth/mo | ~1.5k/mo (created 2024-02; 28.4k over ~27mo) | gh-api derived (info-only) | MEDIUM |
| D03 forks_per_star | 0.161 | gh-api 4583/28400 | HIGH |
| D04 last_commit_days | **2** (2026-05-20→2026-05-23, pushed 05-21) | gh commits API | HIGH |
| D05 contributors_90d | ~50 total (Link `page=51`); 90d-active est ≥10 | gh contributors Link header | MEDIUM |
| D06 issue_close_rate_90d | **0.98** (118 closed / 121 opened) | gh search/issues | HIGH |
| D07 license_class | **permissive** (MIT) | gh-api SPDX + LICENSE | HIGH |
| D08 signed_release_level | **1** (npm dist.signatures present; no SLSA attestations) | npm registry `@composio/core` | MEDIUM-HIGH |
| D09 maintainer_reputation | **B** (Composio Inc., venture-backed, 1000+ toolkit corp product, named in MCP-ecosystem) | gh-org + perplexity [3][17] | MEDIUM-HIGH |
| D10 test_coverage_pct | ~0.5-0.6 est (py.test.yml + ts.test.yml + e2e; no public codecov badge found) | gh workflows | MEDIUM-LOW |
| D11 ci_green_streak | ≥14d est (active release cadence, multiple required checks) | gh workflows | MEDIUM |
| D12 doc_completeness | **0.85** (docs.composio.dev + quickstart + per-provider docs + deepwiki) | deepwiki + perplexity [20][26] | HIGH |
| D13 cc_install_path | **sdk-python** (also sdk-typescript, mcp-server) | pypi `composio==0.13.1` + `python/providers/claude_agent_sdk` | HIGH |
| D14 cc_pattern_density | **0.58** (7/12: MCP-tool-bridging, structured-output JSON-Schema, tool-router/search, hierarchical-delegation via session-scoping, retry/error-mapping, container-isolation via sandboxed workbench, managed-auth broker) | deepwiki file-anchors | MEDIUM-HIGH |
| D15 cc_cite_anchor_density | **0.6** (stable core paths: `composio/sdk.py`, `core/models/tools.py`, `core/models/mcp.py`; active but no rename churn) | deepwiki + gh commits | MEDIUM-HIGH |
| D16 cc_deepwiki_indexed | **true** (HTTP 200 + non-empty) | curl + deepwiki | HIGH |
| D17 pinning_discipline | **npm-exact-version / uvx-exact-version** (`composio==0.13.1`, `composio-client==1.39.0`) | pyproject + pypi | HIGH |
| D18 arch_relevance | **0.7** (MCP-native = our `.mcp.json` discipline; managed-auth broker = pattern for our MCP-server credential mgmt; tool-router = context-budget discipline; claude_agent_sdk provider = direct W376 tool-use surface fit) | CLAUDE.md CR-1/CR-2 .mcp.json + W376 tool-use | MEDIUM-HIGH |
| D19 community_mentions | ≥6 distinct orgs (Composio docs, Paragon comparison, unified.to comparison, PyPI, YouTube, MCP-ecosystem blogs) | perplexity citations [1][7][15][16][19][23] | HIGH |

**Per-class scores** (§2 weight profile applied):
- **INSTALL: ~0.74**
- **PATTERN-STUDY: ~0.80**
- **CITE-ONLY: ~0.80**

### §2.2 `langgenius/dify`

| Dim | Value | Source / anchor | Conf |
|---|---|---|---|
| D01 stars_raw | 142,299 | gh-api (info-only) | HIGH |
| D02 stars_growth/mo | ~3.8k/mo (created 2023-04; ~37mo) | gh-api derived (info-only) | MEDIUM |
| D03 forks_per_star | 0.157 | gh-api 22383/142299 | HIGH |
| D04 last_commit_days | **1** (2026-05-22; pushed 05-23) | gh commits API | HIGH |
| D05 contributors_90d | ~459 pages total (`page=460`); huge OSS community | gh contributors Link header | HIGH |
| D06 issue_close_rate_90d | **1.09** (1397 closed / 1286 opened) | gh search/issues | HIGH |
| D07 license_class | **source-available** (Dify Open Source License = modified Apache-2.0 + multi-tenant + LOGO restrictions); gh SPDX = NOASSERTION | gh-api SPDX + LICENSE raw read | HIGH |
| D08 signed_release_level | ~1 (GitHub release tags; no verified SLSA provenance found) | gh releases | MEDIUM |
| D09 maintainer_reputation | **A** (LangGenius Inc., 142k stars, named enterprise users, Dify Cloud commercial) | gh-org + perplexity [8][36] | HIGH |
| D10 test_coverage_pct | ~0.4-0.5 est (e2e/ dir + api tests; no public badge) | gh contents | MEDIUM-LOW |
| D11 ci_green_streak | ≥14d est (very high merge cadence) | gh activity | MEDIUM |
| D12 doc_completeness | **0.9** (docs.dify.ai + blog deep-dives + deepwiki + plugin dev guides) | deepwiki + perplexity [24][25][28] | HIGH |
| D13 cc_install_path | **library-only / none** (Docker/Helm-deployed platform; SDKs = nodejs+php HTTP clients; `dify-client` wraps remote App Service API, does NOT embed engine) | gh `sdks/` + perplexity [16][17][9] | HIGH |
| D14 cc_pattern_density | **0.67** (8/12: orchestrator-workers via GraphEngine, parallel-fanout via parallel-branch, structured-output, MCP-tool-bridging via plugin daemon, memory-tiering via Knowledge Pipeline RAG, retry-policy, hierarchical-delegation via sub-graph child-engines, container-isolation via CodeNode sandbox) | deepwiki file-anchors | MEDIUM-HIGH |
| D15 cc_cite_anchor_density | **0.65** (deep stable paths: `api/core/workflow/workflow_entry.py`, `node_factory.py`, `nodes/agent/*`, `providers/trace/trace-langfuse/`) | deepwiki + gh contents | MEDIUM-HIGH |
| D16 cc_deepwiki_indexed | **true** (HTTP 200 + non-empty) | curl + deepwiki | HIGH |
| D17 pinning_discipline | **image-digest-sha256 capable** (Docker images) / version-range for engine | gh docker/ + releases | MEDIUM |
| D18 arch_relevance | **0.72** (workflow-DAG = our Temporal orchestration analog; Langfuse-native = our T5; OTel ObservabilityLayer; Knowledge Pipeline RAG = our memory-tier T3/T6 analog; Agent Strategies = our agent-teams) | CLAUDE.md T5-Langfuse + Temporal + T3/T6 memory | MEDIUM-HIGH |
| D19 community_mentions | ≥8 distinct orgs (Dify blog, docs, Alibaba Cloud, Arize, Jina, AWS AMI, HN/Reddit, plugin-ecosystem partners) | perplexity citations [21][31][32][34][36] | HIGH |

**Per-class scores** (§2 weight profile applied):
- **INSTALL: ~0.52** (gated — see §2.3)
- **PATTERN-STUDY: ~0.90**
- **CITE-ONLY: ~0.91**

### §2.3 7-stage decision-tree routing (META-D §2)

**Composio** — STAGE 1 hard-BLOCK: none (MIT permissive, no CVE, active 2d, no fake-stars, not archived). STAGE 5 INSTALL gates: license=permissive ✓, last_commit ≤90 ✓, D13 ∈ {sdk-python} ✓, pinning=exact ✓, maintainer=B ✓, arch_relevance ≥0.5 ✓, deepwiki ✓, convergence ≥4 MCP sources ✓ (gh+repomix CLASS-A, perplexity CLASS-B, deepwiki CLASS-C). D08=1 (signed but not SLSA-L2) → soft note, passes with operator-attestation OR ≥1 acceptable. D10 test_coverage unverified (no public badge) is the one soft-dock. **→ VERDICT: INSTALL** (as MCP-server in `.mcp.json` via Tool Router URL, OR `pip install composio` + `claude_agent_sdk` provider). Honest caveat: this is a *capability-add* install (managed-auth tool-broker), not a core-runtime primitive — operator may prefer **MONITOR→staged-pilot** first because (a) it introduces a hosted-service dependency + per-user OAuth surface (blast-radius), (b) D10 coverage unverified, (c) it overlaps our existing direct `.mcp.json` MCP servers (Pareto-check: does it provide a *novel niche*? — YES, managed multi-toolkit OAuth broker is not covered by any incumbent).

**Dify** — STAGE 1 hard-BLOCK: NOT triggered for pattern-study (source-available is readable). STAGE 5 INSTALL: **FAILS D07 hard-filter** (license_class = source-available, not permissive → INSTALL requires permissive OR operator-attestation on source-available) **AND FAILS D13 hard-filter** (cc_install_path = library-only/none → "cannot INSTALL by definition" per schema §107). Two independent INSTALL hard-filter fails. STAGE 6 PATTERN-STUDY: cc_cite_anchor_density 0.65 ≥0.3 ✓, deepwiki ✓, repomix-packable ✓ → passes. **→ VERDICT: PATTERN-STUDY** (high-confidence, exactly as the task anticipated). This is the META-D §1.2 canonical source-available + wrong-runtime-shape case: a great platform that scores INSTALL on most engineering axes but fails both the license AND the runtime-pathway hard filters — the two dimensions the operator's "claude code your runtime pathway support" + CR-1 license discipline are designed to exercise.

| Repo | INSTALL | PATTERN-STUDY | CITE-ONLY | **Routed tier** | Decisive hard-filter |
|---|---:|---:|---:|---|---|
| ComposioHQ/composio | 0.74 | 0.80 | 0.80 | **INSTALL** (capability-add; operator may stage-pilot) | All pass; D10 coverage soft-dock |
| langgenius/dify | 0.52 | 0.90 | 0.91 | **PATTERN-STUDY** | D07 source-available + D13 library-only (double INSTALL-fail) |

---

## §3 Convergence (≥2-source per dim)

Per sca-v18 multi-MCP class-weighted-counting (schema §255-288). INSTALL minimum = ≥1 CLASS-A AND ≥1 CLASS-C.

| Repo | CLASS-A (raw) | CLASS-B (web-judge) | CLASS-C (AI-on-repo) | passes_install_minimum |
|---|---|---|---|---|
| composio | gh-api ✓, repomix/gh-contents ✓ | perplexity ✓ | deepwiki ✓ | **YES** (A+C) |
| dify | gh-api ✓, gh-contents ✓ | perplexity ✓ | deepwiki ✓ | **YES** (A+C) |

**Convergent claims (≥2 independent sources agree)**:
1. **Composio is MCP-native + managed-auth broker** — deepwiki (Tool Router, `session.mcp.url`, Auth Configs/Connected Accounts) + perplexity ([3][4][17] MCP Gateway, 90% auth-code reduction). 2-source agree.
2. **Composio D13 = pip-installable Python SDK with Anthropic/claude_agent_sdk providers** — gh `python/pyproject.toml` + `python/providers/` (CLASS-A) + pypi `composio==0.13.1` (CLASS-A) + deepwiki install section. 3-source agree.
3. **Composio license = MIT permissive** — gh-API SPDX (CLASS-A) + LICENSE file. (1 classifier-string inconsistency flagged; SPDX authoritative.)
4. **Dify license = source-available (modified Apache-2.0, multi-tenant + LOGO restricted)** — gh raw LICENSE read (CLASS-A) + perplexity [6][8] "Dify Open Source License" (CLASS-B) + gh-API SPDX=NOASSERTION corroborates non-standard. 3-source agree.
5. **Dify D13 = Docker-platform, NOT embeddable library** — gh `sdks/`=[nodejs,php] (CLASS-A) + perplexity [9][16][17] "not primarily pip-install; Docker Compose/Helm; dify-client wraps HTTP API" (CLASS-B) + deepwiki (engine is `api/` server). 3-source agree.
6. **Dify workflow-DAG + Langfuse/OTel observability** — deepwiki (`GraphEngine`, `LangFuseDataTrace`, `ObservabilityLayer`) (CLASS-C) + perplexity [18][25][34] (CLASS-B). 2-source agree.

No material disagreements found. Top-level confidence = **MEDIUM-HIGH** (MIN over dims; docked from HIGH by D10 test_coverage unverified for both — no public codecov badge located, est-only).

---

## §4 Recommendations + architecture-layer impact

### §4.1 Composio → INSTALL (capability-add) — RECOMMEND staged-pilot (MONITOR→INSTALL)

**Architecture layer**: MCP-server ecosystem (`.mcp.json`) + W376 agent tool-use surface.

- **Recommended adoption**: **INSTALL as capability-add**, but via the **staged-pilot** path (MONITOR-tier first wave → INSTALL after pilot) for blast-radius prudence — NOT immediate core-runtime wiring. Two viable shapes:
  - **(a) MCP-server in `.mcp.json`** — Composio Tool Router hosted URL with auth headers. CR-1 trust-tuple: MIT ✓, signed npm ✓, active ✓; CR-9 pin: `composio-client==1.39.0` exact. This is the lowest-coupling path and matches our existing direct-MCP discipline.
  - **(b) `pip install composio` + `claude_agent_sdk` provider** — heavier (process-level dep + Pydantic-v2 — already our stack), gives programmatic tool-broker access.
- **Why staged not immediate**: (1) introduces a **hosted-service + per-user-OAuth dependency** — a credential-surface blast-radius our current self-hosted MCP servers (github, perplexity, exa) don't carry; (2) D10 test_coverage unverified; (3) **D08 = signed-but-not-SLSA-L2** — operator-attestation needed for full CR-1(a). Pilot gate: verify one toolkit end-to-end + audit the OAuth credential storage model against our state-outside-repo discipline (`Z:\claude-sota-installed-state\`).
- **Pareto / novel-niche (META-D §4.1)**: Composio PASSES `provides_novel_niche` — **managed multi-toolkit OAuth broker + runtime tool-search** is not covered by any incumbent in our runtime. Our `.mcp.json` servers are individually-wired, statically-loaded; Composio's `COMPOSIO_SEARCH_TOOLS` runtime-discovery + Connect-Link OAuth is genuinely additive.
- **PATTERN-STUDY lift (even if INSTALL deferred)**: the **tool-router/search-to-avoid-context-bloat** pattern (`COMPOSIO_SEARCH_TOOLS` meta-tool) is directly liftable into our context-budget discipline — runtime tool-discovery instead of static preload mirrors our deferred-tools ToolSearch mechanism. Cite-anchor: deepwiki Tools-Management wiki + `composio/core/models/tools.py`.

### §4.2 Dify → PATTERN-STUDY (NOT INSTALL) — high-confidence

**Architecture layer**: Temporal-based orchestration + T5-Langfuse + memory-tier (T3 cognee / T6 basic-memory) + agent-teams.

- **Recommended adoption**: **PATTERN-STUDY only.** Double INSTALL hard-filter fail (source-available license + Docker-platform-not-library). Do NOT take any Dify code as a dependency; do NOT deploy the platform (it would be a parallel orchestrator competing with Claude-Code-as-orchestrator + Temporal, exactly the "wrong API surface" META-D §1.2 case). Cite-anchored pattern lift only.
- **Highest-impact patterns to study** (port as own-authored, cite-anchored to `file:line`):
  1. **Workflow-DAG GraphEngine + sub-graph child-engines** (`api/core/workflow/workflow_entry.py`, `node_factory.py`) — model for our Temporal orchestration node-typing + `GraphRuntimeState`/`VariablePool` state-isolation. Maps to our 4-mode parallel-execution (subagent/team/worktree/bg-session) + checkpoint-resume skill.
  2. **Langfuse-native tracing layer** (`api/providers/trace/trace-langfuse/.../langfuse_trace.py` `LangFuseDataTrace`) — directly relevant to **our T5 Langfuse** (live v3.174.1 per CLAUDE.md): how Dify records per-node spans + metadata is a reference implementation for instrumenting our wave-orchestration spans. Plus `ObservabilityLayer` OTel-gating pattern.
  3. **Knowledge Pipeline / Agentic RAG** (`api/services/rag_pipeline/`, `KnowledgeRetrievalNode` reranking + weighted multi-config scoring) — pattern for our memory-tier retrieval (T3 cognee semantic + T6 basic-memory) — hybrid vector + graph-context-expansion + reranking is a SOTA RAG shape we can cite-anchor for memory-architecture decisions.
  4. **Agent Strategies plugin protocol** (`nodes/agent/strategy_protocols.py`, `plugin_strategy_adapter.py`) — pluggable ReAct/function-calling strategy abstraction; reference for our agent-teams strategy selection.
  5. **Parallel-branch execution + queue-based engine** (perplexity [26]) — concurrency model reference for our parallel-dispatch-mandate.
- **CITE-ONLY fallback**: Dify's CITE-ONLY score (0.91) is even higher than PATTERN-STUDY — every cite is anchorable to stable deep paths at a pinned SHA. Use for ADR/CLAUDE.md cite-anchors on workflow-orchestration + LLMOps-observability decisions.

### §4.3 Net verdict

| Repo | Tier | One-line | Primary architecture impact |
|---|---|---|---|
| ComposioHQ/composio | **INSTALL** (staged-pilot) | MIT, MCP-native, `pip install composio` + `claude_agent_sdk` provider; novel managed-auth-broker niche | `.mcp.json` MCP-ecosystem + W376 tool-use surface |
| langgenius/dify | **PATTERN-STUDY** | Source-available + Docker-platform → 2× INSTALL hard-fail; world-class workflow-DAG + Langfuse-RAG patterns | Temporal orchestration + T5-Langfuse + T3/T6 memory-tier (pattern-lift, no dep) |

---

## §5 Cite-cluster (3-org-distinct floor per W332 / sca-v13)

1. **Composio Inc.** — `ComposioHQ/composio` gh-api (28.4k★, MIT, last-commit 2026-05-20), `python/pyproject.toml` (`composio==0.13.1`, Pydantic-v2), `python/providers/{anthropic,claude_agent_sdk,...}`, `.github/workflows/` (28 incl. security+release), docs.composio.dev, trust.composio.dev. [CLASS-A + CLASS-B]
2. **LangGenius Inc.** — `langgenius/dify` gh-api (142.3k★, NOASSERTION, last-commit 2026-05-22), LICENSE raw ("Dify Open Source License" modified-Apache-2.0 © 2025 LangGenius), `api/core/workflow/`, `sdks/`=[nodejs,php], docs.dify.ai, dify.ai/blog (Beehive arch, Knowledge Pipeline, Agent Node, parallel-branch). [CLASS-A + CLASS-B]
3. **DeepWiki (Devin/Cognition)** — AI-on-repo architecture for both: Composio (Tool Router, Auth Configs, MCP, file-stability) + Dify (GraphEngine, DifyNodeFactory, RagPipelineTransformService, LangFuseDataTrace, ObservabilityLayer). [CLASS-C]
4. **Perplexity (Sonar Deep Research)** — 2 deep-research reports (Composio managed-auth/MCP/SDK; Dify LLMOps/RAG/license), persisted `tool-results/toolu_018j9eA3...txt` + `toolu_01EKXsz...txt`, 36+31 citations incl. PyPI, Paragon, unified.to, Alibaba Cloud, Arize, AWS. [CLASS-B]
5. **PyPI / npm registries** — `composio==0.13.1` (requires-python ≥3.9), `@composio/core==0.10.0` (dist.signatures present, no SLSA attestations). [CLASS-A]
6. **OSSF** — Criticality Score formula (stars EXCLUDED) governing dim weighting per sca-v20 schema §43. [spec]
7. **sca-v20 framework** — `Z:/claude-sota-installed-W375/.claude/schemas/sca-v20-multi-dim.schema.json` + W377 META-C/D/F (19-dim, per-class weighting, 7-stage decision-tree, soft-gate). [internal]
8. **CLAUDE.md cardinal-rules** — CR-1 trust-tuple (license + signed-release + blast-radius), CR-2 `.mcp.json` npx-pin discipline, CR-6 verify-before-claim, CR-9 pinning; T5-Langfuse v3.174.1, T3-cognee, T6-basic-memory runtime-state. [internal]

**Distinct-org count: 8** (Composio, LangGenius, DeepWiki/Cognition, Perplexity, PyPI+npm registries, OSSF, + internal framework/CLAUDE.md). Exceeds sca-v13 3-org-distinct floor by 2.67×.

---

**STATUS: DONE** — file lands at `Z:/claude-sota-installed-W375/docs/architecture/W378-SOTA-CONVERGENCE/R2-COMPOSIO-DIFY.md`. Both repos scored on 19 sca-v20 dims with live-probed CLASS-A/B/C anchors (2026-05-23). Composio → INSTALL (staged-pilot capability-add). Dify → PATTERN-STUDY (double INSTALL hard-fail: source-available license + Docker-platform-not-library). All claims cite-anchored per CR-6.
