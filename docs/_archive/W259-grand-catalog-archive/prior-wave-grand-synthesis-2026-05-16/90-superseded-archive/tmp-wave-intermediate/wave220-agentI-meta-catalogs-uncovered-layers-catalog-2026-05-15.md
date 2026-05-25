---
title: Wave 220 Agent I - Meta Catalog + Uncovered Layers Cross-Layer Synthesis
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
artifact-class: meta-catalog-cross-layer-convergence
target: Z:/claude-sota-pure
output-budget: 600 LOC
---

# Wave 220 Agent I - Cross-Layer Catalog

## Scope And Evidence Status

Inputs read:

- `tmp/wave220-agentB-orchestration-plugins-comprehensive-scoring-2026-05-15.md` [VERIFIED]
- `tmp/claude/Z--claude-sota-installed/85ffc4b1-ef94-4e92-b3bd-f0ca89fdb147/tasks/a302533488650dbbe.output` first 200 requested lines: file exists but is 0 bytes [VERIFIED]
- `tmp/claude/Z--claude-sota-installed/85ffc4b1-ef94-4e92-b3bd-f0ca89fdb147/tasks/a4e0beee591c992ca.output` first 100 requested lines: file exists but is 0 bytes [VERIFIED]
- Additional available Wave 220 artifacts found in `tmp/`: Agent A uncovered layers, Agent C token-opt/routing, Agent C outer-research/proxy/wshobson, prior Agent I draft [VERIFIED]

Network caveat: direct GitHub REST metadata probes from this environment failed with TLS `SSL connection could not be established` for all queried repos [VERIFIED]. Star/license fields below are therefore either from local Wave 220 artifacts, local runtime facts, prior artifact live-GitHub claims, or web-search snippets; each row marks `[VERIFIED]`, `[INFERRED]`, or `[UNKNOWN]`.

## 1. Agent B Summary - Agent Orchestration + Plugins

Agent B found the Claude Code-native plugin/agent/skill ecosystem is already converging on marketplace JSON + `SKILL.md` + agent markdown as the install substrate [VERIFIED].

Top ADOPT-NOW items:

| rank | repo / primitive | score | Agent B verdict | why it matters |
|---:|---|---:|---|---|
| 1 | `wshobson/agents` / `claude-code-workflows` | 0.94 | ADOPT-NOW | 80 plugin dirs, 185 agents, 153 skills, 100 commands locally counted; MIT; best CC-native orchestration marketplace [VERIFIED] |
| 2 | `anthropics/claude-plugins-official` | 0.92 | ADOPT-NOW | first-party plugin substrate: skill-creator, plugin-dev, hookify, agent-sdk-dev, frontend-design, code-review, feature-dev, ralph-loop [VERIFIED] |
| 3 | `addyosmani/agent-skills` | 0.91 | ADOPT-NOW | curated engineering skill layer: planning, review, security, testing, source-driven development, context engineering [VERIFIED] |
| 4 | `openai/codex-plugin-cc` | 0.90 | ADOPT-NOW | cross-model review/rescue/status command surface; installed as `codex@openai-codex` v1.0.4 [VERIFIED] |
| 5 | `gsd-build/get-shit-done` | 0.89 | ADOPT-STAGED | high-activity workflow harness; install after official/wshobson to avoid planning-system collision [INFERRED] |
| 6 | `anthropics/cwc-long-running-agents` + `ralph-loop` | 0.88 / 0.86 | ADOPT-NOW CITE+LOCAL | long-running agent harness patterns and official loop plugin; use after safety hooks exist [VERIFIED/INFERRED] |

Non-adoption calls:

- `microsoft/autogen`: DEFER because upstream is maintenance-mode and directs new users to Microsoft Agent Framework [VERIFIED by Agent B web snippet].
- `LangGraph`, `deepagents`, `CrewAI`, `smolagents`, `openai-agents-python`, `agno`: provider-complement libraries, not Claude Code-native marketplace substrate [INFERRED].
- `awesome-*` repos: cite/discovery class unless they ship installable marketplace artifacts with clear license [INFERRED].

## 2. Memory + RAG Summary

The requested Memory+RAG task output file is empty, so no completed Memory+RAG agent rows were available to summarize [VERIFIED].

Available local Wave/prior signals still indicate this practical stack for `Z:/claude-sota-pure` [INFERRED]:

| rank | repo / primitive | score | verdict | evidence / rationale |
|---:|---|---:|---|---|
| 1 | `getzep/graphiti` + FalkorDB | 0.90 | ADOPT-NOW when graph memory needed | incumbent graph-memory direction in prior runtime logs; requires Docker/service health gating [INFERRED] |
| 2 | `doobidoo/mcp-memory-service` + `sqlite_vec` | 0.88 | ADOPT-NOW low-infra memory | current runtime key primitive listed in AGENTS.md as `mcp-memory-service v10.51.3 sqlite_vec`; low infra vs graph DB [VERIFIED] |
| 3 | `qdrant/qdrant` | 0.86 | ADOPT when vector tier needed | prior Wave/runtime signals show Qdrant container/skills surface; vector DB backend for RAG, not always Day-1 [INFERRED] |
| 4 | `microsoft/markitdown` | 0.84 | ADOPT-CANDIDATE | prior Agent I found MIT, file-to-markdown preprocessing gap for memory/RAG ingestion [VERIFIED from prior Agent I draft] |
| 5 | `duckdb/duckdb` | 0.82 | ADOPT-CANDIDATE | MIT analytical DB for JSONL/audit-log analytics and RAG ETL sidecars [VERIFIED from prior Agent I draft] |
| 6 | `mem0ai/mem0` / `letta-ai/letta` | 0.74 / 0.73 | STUDY-PILOT | mature memory platforms, but likely overlap with Graphiti + mcp-memory-service for pure runtime [INFERRED] |

HONEST-NON-FINDING: because `a302533488650dbbe.output` is zero bytes, these Memory+RAG rankings are a reconstruction from available local artifacts, not the missing agent's own output [VERIFIED/INFERRED].

## 3. Uncovered Layer Scoring

Scoring fields: `age_d` and `cpd` use artifact-derived or inferred bands where live GitHub API metadata was unavailable. `native_cc_path` means a direct Claude Code plugin/MCP/CLI path, not a generic library-only install.

### 3.1 Observability

| repo | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `langfuse/langfuse` | high [INFERRED] | MIT/EE mix [INFERRED] | 1000+ [INFERRED] | HIGH [INFERRED] | ACTIVE | SDK/API + self-host Docker; no CC plugin [INFERRED] | PROVIDER-COMPLEMENT | PASS: LLM traces/prompts/evals; FAIL: service + DB infra [INFERRED] | ADOPT-STAGED | 0.84 |
| `Arize-ai/phoenix` | high [INFERRED] | Elastic/Apache-adjacent unknown [UNKNOWN] | 1000+ [INFERRED] | HIGH [INFERRED] | ACTIVE | local service + SDK; current runtime lists Phoenix MCP active [VERIFIED] | INCUMBENT/PROVIDER-COMPLEMENT | PASS: tracing/evals/RAG observability; FAIL: license reverify needed [VERIFIED/UNKNOWN] | ADOPT-NOW if already wired; otherwise STAGED | 0.86 |
| `traceloop/openllmetry` | medium [INFERRED] | Apache-2.0 [INFERRED] | 700+ [INFERRED] | MED [INFERRED] | ACTIVE | OpenTelemetry SDK, not CC-native [INFERRED] | PROVIDER-COMPLEMENT | PASS: OTel semantic conventions for LLM apps; FAIL: instrumentation overhead [INFERRED] | STUDY-PILOT | 0.76 |
| `getsentry/sentry` | 43,868 [VERIFIED from prior Agent I] | NOASSERTION/BSL caveat [VERIFIED] | 3000+ [INFERRED] | HIGH [INFERRED] | MATURE | external service | LICENSE-RISK | PASS: production error tracking; FAIL: license/infra weight [VERIFIED/INFERRED] | CITE/STUDY | 0.70 |

Observability recommendation: retain Phoenix if already active, add Langfuse only when prompt/eval observability becomes a named workflow, and keep OpenLLMetry as instrumentation substrate for Python/Node agent apps [INFERRED].

### 3.2 Security + Prompt Guard

| repo | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `aquasecurity/trivy` | active [VERIFIED Agent A] | Apache-2.0 [VERIFIED] | 1810 [VERIFIED Agent A] | ~5 [VERIFIED Agent A] | SUSTAINED-MATURE | CLI/hook | GENUINELY-NEW | PASS: CVE/SBOM/IaC/secrets scanner; FAIL: none material [VERIFIED] | ADOPT-NOW | 0.93 |
| `PyCQA/bandit` | 8,029 [VERIFIED Agent A] | Apache-2.0 [VERIFIED] | 2941 [VERIFIED Agent A] | ~2.5 [VERIFIED Agent A] | SUSTAINED-MATURE | CLI/hook | PROVIDER-COMPLEMENT | PASS: Python SAST; FAIL: Python-only [VERIFIED] | ADOPT-NOW | 0.89 |
| `semgrep/semgrep` | 15,156 [VERIFIED Agent A] | LGPL-2.1 [VERIFIED] | 1978 [VERIFIED Agent A] | ~2.2 [VERIFIED Agent A] | SUSTAINED-MATURE | CLI/hook | PROVIDER-COMPLEMENT | PASS: structural SAST; FAIL: rules license must be separated [VERIFIED] | STUDY-PILOT.b | 0.82 |
| `gitleaks/gitleaks` | high [INFERRED] | MIT [INFERRED] | 2500+ [INFERRED] | MED [INFERRED] | SUSTAINED-MATURE | CLI/pre-commit | INCUMBENT | PASS: current repo has gitleaks pre-commit gate per AGENTS.md [VERIFIED] | RETAIN/ADOPT | 0.88 |
| `promptfoo/promptfoo` | 21,288 [VERIFIED prior Agent I] | MIT [VERIFIED prior Agent I] | 1000+ [INFERRED] | HIGH [INFERRED] | ACTIVE | CLI | GENUINELY-NEW | PASS: prompt red-team/eval/vuln tests; FAIL: config workload required [VERIFIED/INFERRED] | ADOPT-CANDIDATE | 0.86 |
| `protectai/rebuff` | medium [INFERRED] | MIT/Apache unknown [UNKNOWN] | 1000+ [INFERRED] | LOW-MED [INFERRED] | STABLE/LOW | library/API | PROVIDER-COMPLEMENT | PASS: prompt injection defense concept; FAIL: likely stale vs promptfoo/LLM guardrails [INFERRED] | CITE/STUDY | 0.62 |
| `wshobson/agents:protect-mcp` | repo-level [VERIFIED] | MIT [VERIFIED] | repo-level | cpd30=1.63 [VERIFIED] | ACTIVE | CC plugin | GENUINELY-NEW | PASS: native MCP protection plugin installed [VERIFIED] | ADOPT-NOW | 0.90 |

Security recommendation: Day-1 Trivy + Bandit + existing gitleaks gates; Day-2 promptfoo for prompt-injection/red-team suites; retain protect-mcp and block-no-verify plugins from wshobson [INFERRED].

### 3.3 Evals + Testing

| repo | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `promptfoo/promptfoo` | 21,288 [VERIFIED prior Agent I] | MIT [VERIFIED] | 1000+ [INFERRED] | HIGH [INFERRED] | ACTIVE | CLI | GENUINELY-NEW | PASS: prompt/agent/RAG eval + red-team; FAIL: needs test corpus [VERIFIED/INFERRED] | ADOPT-CANDIDATE | 0.88 |
| `confident-ai/deepeval` | high [INFERRED] | Apache/MIT unknown [UNKNOWN] | 700+ [INFERRED] | HIGH [INFERRED] | ACTIVE | Python CLI/lib | PROVIDER-COMPLEMENT | PASS: LLM unit/e2e metrics; FAIL: Python dependency + license reverify [INFERRED/UNKNOWN] | STUDY-PILOT | 0.76 |
| `BerriAI/litellm` evals | 47,091 [VERIFIED Agent C outer] | Other/MIT-mixed caveat [VERIFIED Agent C] | 1000+ [INFERRED] | HIGH [INFERRED] | ACTIVE | proxy + eval/cost hooks | PROVIDER-COMPLEMENT | PASS: provider routing/cost/eval harness potential; FAIL: license/service complexity [VERIFIED/INFERRED] | STUDY-PILOT-WHEN-NEEDED | 0.84 |
| `brainlid/langchain` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | none verified | HONEST-NON-FINDING | FAIL: canonical repo not verified from available artifacts [VERIFIED] | HNF / do not install | 0.40 |
| `langchain-ai/langgraph` eval patterns | ~31.4k [VERIFIED Agent B] | MIT [VERIFIED Agent B] | [UNKNOWN] | HIGH [INFERRED] | ACTIVE | library only | PROVIDER-COMPLEMENT | PASS: agent testing/trimming primitives; FAIL: not CC-native [VERIFIED/INFERRED] | STUDY-PILOT | 0.80 |
| `wshobson/agents:plugin-eval` / review plugins | repo-level [VERIFIED] | MIT [VERIFIED] | repo-level | cpd30=1.63 [VERIFIED] | ACTIVE | CC plugin | GENUINELY-NEW | PASS: native plugin-eval/comprehensive-review; FAIL: duplicate routing risk [INFERRED] | ADOPT-SUBSET | 0.84 |

Evals recommendation: install promptfoo first for prompt/security/regression tests; use deepeval only for Python LLM-app test suites; use LiteLLM eval/cost features only when LiteLLM is already justified for routing [INFERRED].

### 3.4 Deployment + Infra

| repo / primitive | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `docker/compose` / Docker Compose | massive [INFERRED] | Apache-2.0 [INFERRED] | 3000+ [INFERRED] | HIGH [INFERRED] | MATURE | service substrate | CITE-CLASS-CANONICAL | PASS: full-stack MCP/DB/proxy orchestration; FAIL: Docker daemon availability [INFERRED] | ADOPT-NOW | 0.90 |
| health checks + restart policies | n/a | local config | n/a | n/a | PRACTICE | compose/service config | GENUINELY-NEW local discipline | PASS: required for Phoenix/Langfuse/Qdrant/FalkorDB/CLIProxyAPI; FAIL: must avoid secret leaks [INFERRED] | ADOPT-NOW | 0.92 |
| `router-for-me/CLIProxyAPI` | 32,820 [VERIFIED Agent C outer] | MIT [VERIFIED Agent C outer] | ~10.4 mo [VERIFIED Agent C outer] | very high [VERIFIED] | STABLE-BURN-IN-EDGE | local HTTP service | INCUMBENT | PASS: OAuth fleet and OAI-compatible backend; FAIL: provenance/pinning required [VERIFIED] | RETAIN/ADOPT | 0.91 |
| `BerriAI/litellm` Docker | 47,091 [VERIFIED Agent C outer] | Other caveat [VERIFIED] | mature [INFERRED] | HIGH [INFERRED] | ACTIVE | service/proxy | PROVIDER-COMPLEMENT | PASS: provider router; FAIL: DB/auth/license complexity [VERIFIED] | STUDY-PILOT | 0.84 |
| `binwiederhier/ntfy` | 22,000+ [VERIFIED Agent A] | Apache-2.0 [VERIFIED] | 1460 [VERIFIED Agent A] | ~5 [VERIFIED] | SUSTAINED-MATURE | Docker/webhook | GENUINELY-NEW | PASS: low-friction alerts; FAIL: MCP wrapper low-star [VERIFIED] | ADOPT-NOW | 0.88 |

Deployment recommendation: create a pinned `docker-compose.yml` for optional services only after base runtime files exist: Qdrant/FalkorDB/Phoenix/Langfuse/ntfy/LiteLLM must have health checks, named volumes under state, restart policies, and no secrets in repo [INFERRED].

### 3.5 Context Engineering

| repo | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `mksglu/context-mode` | ~14.8k prior [VERIFIED Agent C] | Elastic-2.0 [VERIFIED Agent C] | 90+ [VERIFIED] | HIGH [VERIFIED] | ACTIVE | CC plugin/MCP | ECOSYSTEM-IMPORT / LICENSE-RISK | PASS: ~98% savings workflow precedent; FAIL: ELv2 waiver needed [VERIFIED] | ADOPT with license waiver | 0.88 |
| `yamadashy/repomix` | ~24.8k prior [VERIFIED Agent C] | MIT [VERIFIED] | 500+ [VERIFIED] | HIGH [VERIFIED] | ACTIVE | MCP + CLI | ECOSYSTEM-IMPORT | PASS: codebase compression/pack-grep; FAIL: none material [VERIFIED] | ADOPT-NOW | 0.93 |
| `upstash/context7` | installed MCP [VERIFIED AGENTS.md] | [UNKNOWN] | [UNKNOWN] | HIGH [INFERRED] | ACTIVE | MCP | INCUMBENT | PASS: live docs ingestion; FAIL: external dependency [VERIFIED/INFERRED] | RETAIN/ADOPT | 0.90 |
| Anthropic `/compact` discipline | n/a | bundled | n/a | HIGH | OFFICIAL | CC-native | CITE-CANONICAL | PASS: built-in; FAIL: lossy if blind [VERIFIED Agent C] | ADOPT with save/restore discipline | 0.92 |
| `cnighswonger/claude-code-cache-fix` | local prior [VERIFIED Agent C] | MIT [VERIFIED Agent C] | 90+ [VERIFIED] | MED [VERIFIED] | ACTIVE | `ANTHROPIC_BASE_URL` proxy | GENUINELY-NEW | PASS: measured 95.5% vs 82.3% cache hit; FAIL: CC-version drift [VERIFIED] | ADOPT-NOW PILOT | 0.90 |

Context recommendation: install ccusage -> repomix -> context7 -> context-mode (with license waiver) -> cache-fix pilot -> compact discipline [INFERRED].

### 3.6 Code Intelligence

| repo | stars | license | age_d | cpd | axis_3_band | native_cc_path | cr12_disposition | probe_pass/fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---:|
| `GitNexusLabs/gitnexus` / GitNexus | installed index [VERIFIED AGENTS.md] | PolyForm-Noncommercial in prior runtime [INFERRED] | [UNKNOWN] | [UNKNOWN] | ACTIVE | MCP/CLI | INCUMBENT / LICENSE-AMBER | PASS: 6008 symbols, 6396 relationships, 27 flows indexed; FAIL: license and stale-index discipline [VERIFIED/INFERRED] | RETAIN with license caveat | 0.86 |
| `ast-grep/ast-grep` | 13,808 [VERIFIED Agent A] | MIT [VERIFIED] | 1049 [VERIFIED Agent A] | ~3.5 [VERIFIED] | SUSTAINED-MATURE | CLI | GENUINELY-NEW | PASS: structural code search/rewrite; FAIL: CLI-only [VERIFIED] | ADOPT-NOW | 0.92 |
| `tree-sitter/tree-sitter` | 25,380 [VERIFIED Agent A] | MIT [VERIFIED] | 4210 [VERIFIED Agent A] | ~3.0 [VERIFIED] | SUSTAINED-MATURE | substrate | CITE-CLASS-CANONICAL | PASS: parser substrate; FAIL: do not install separately unless needed [VERIFIED] | CITE/SUBSTRATE | 0.88 |
| `yamadashy/repomix` | ~24.8k prior [VERIFIED Agent C] | MIT [VERIFIED] | 500+ [VERIFIED] | HIGH [VERIFIED] | ACTIVE | MCP + CLI | ECOSYSTEM-IMPORT | PASS: codebase packing/compression; FAIL: complements not replaces semantic graph [VERIFIED] | ADOPT-NOW | 0.93 |
| `Wilfred/difftastic` | 25,308 [VERIFIED Agent A] | MIT [VERIFIED] | 2704 [VERIFIED Agent A] | ~1.5 [VERIFIED] | SUSTAINED-MATURE | CLI/git diff | GENUINELY-NEW | PASS: syntax-aware diffs; FAIL: extra Rust binary [VERIFIED] | ADOPT-NOW | 0.87 |
| `modelcontextprotocol/servers` | 85,711 [VERIFIED prior Agent I] | NOASSERTION [VERIFIED prior Agent I] | [UNKNOWN] | HIGH [INFERRED] | ACTIVE | MCP refs | CITE-CLASS-CANONICAL | PASS: official MCP reference servers/frameworks; FAIL: catalog not single install [VERIFIED] | CITE/SELECTIVE | 0.86 |

Code-intel recommendation: GitNexus for graph impact, Serena/repomix for semantic/context retrieval, ast-grep for structural rewrite, tree-sitter as substrate, difftastic for review-quality diffs [INFERRED].

## 4. Additional Agent A/C Convergence Highlights

Agent A uncovered-layer winners:

| layer | top ADOPT-NOW / candidate | score | disposition |
|---|---|---:|---|
| DOC-AI | `PaddlePaddle/PaddleOCR` | 0.92 | ADOPT-NOW; Apache-2.0; 77.9k stars; avoid Marker GPL/RAIL-M [VERIFIED Agent A] |
| SECURITY | `aquasecurity/trivy` + `PyCQA/bandit` | 0.93 / 0.89 | ADOPT-NOW; Trivy replaces SBOM/CVE/IaC/secrets scanner sprawl [VERIFIED Agent A] |
| LOCAL MODEL SERVING | `ollama/ollama`; `vllm-project/vllm` later | 0.91 / 0.84 | Ollama incumbent/fresh install; vLLM for high-concurrency GPU demand [VERIFIED/INFERRED] |
| DATABASE MCP | `crystaldba/postgres-mcp` | 0.84 | ADOPT when Postgres tier exists; otherwise defer [VERIFIED Agent A] |
| WEB SCRAPING | `tavily-ai/tavily-mcp` | 0.84 | ADOPT-NOW after API key; Firecrawl incumbent [VERIFIED Agent A] |
| NOTIFICATIONS | `binwiederhier/ntfy` + `cyanheads/ntfy-mcp-server` | 0.88 / 0.72 | ntfy ADOPT-NOW, MCP wrapper pilot [VERIFIED Agent A] |
| META GAPS | `promptfoo`, `outlines`, `markitdown`, `duckdb` | 0.82-0.88 | ADOPT-CANDIDATES for eval, structured generation, preprocessing, analytics [VERIFIED prior Agent I] |

Agent C token/routing winners:

| primitive | score | verdict | note |
|---|---:|---|---|
| Provider-native prompt caching + prefix discipline | 0.94 | ADOPT-NOW | replaces LLMLingua-style lossy compression as Day-1 runtime default [VERIFIED Agent C] |
| `ccusage` / `@ccusage/mcp` | 0.94 | ADOPT-NOW | accounting foundation before optimization claims [VERIFIED Agent C] |
| `repomix` | 0.93 | ADOPT-NOW | low-coupling context/codebase pack primitive [VERIFIED Agent C] |
| `CLIProxyAPI` | 0.91 | RETAIN/ADOPT | incumbent OAuth/API fleet router; pin and document provenance [VERIFIED Agent C] |
| `cnighswonger/claude-code-cache-fix` | 0.90 | ADOPT-NOW PILOT | reversible cache-normalization proxy [VERIFIED Agent C] |
| `LiteLLM` | 0.84 | STUDY-PILOT | only when provider diversification/fallback/routing governance is explicit [VERIFIED/INFERRED] |

## 5. Final Convergence Consensus Table For `Z:/claude-sota-pure`

Dependency order is install/enable order, not importance order.

| order | layer | recommended stack | disposition | dependency / gate |
|---:|---|---|---|---|
| 1 | Native baseline | `rg`, `fd`, `jq`, `yq`, `gh`, `uv`, `mise`, `just`, `pre-commit` | ADOPT-NOW | bootstrap before plugins/hooks [INFERRED] |
| 2 | Official CC substrate | `anthropics/claude-plugins-official`: skill-creator, plugin-dev, agent-sdk-dev, hookify, ralph-loop, code-review, feature-dev | ADOPT-NOW | first-party marketplace first [VERIFIED Agent B] |
| 3 | Cross-model review | `openai/codex-plugin-cc` | ADOPT-NOW | after official plugins; before architectural commits [VERIFIED Agent B] |
| 4 | Accounting | `ccusage` + `@ccusage/mcp` | ADOPT-NOW | required before cache/token claims [VERIFIED Agent C] |
| 5 | Context/codebase ingestion | `repomix`, `context7`, Serena, `/compact` discipline | ADOPT-NOW / RETAIN | low-coupling context control [VERIFIED] |
| 6 | Cache/routing | native prompt caching discipline, `CLIProxyAPI`, `claude-code-cache-fix` pilot | ADOPT-NOW/PILOT | route/account affinity + rollback plan [VERIFIED Agent C] |
| 7 | Code intelligence | GitNexus, `ast-grep`, tree-sitter substrate, `difftastic` | ADOPT-NOW/RETAIN | GitNexus index freshness gate before edits; ast-grep for structural rewrite [VERIFIED/INFERRED] |
| 8 | Orchestration marketplace | `wshobson/agents`: agent-teams, agent-orchestration, context-management, comprehensive-review | ADOPT-NOW | install subset, not full catalog blast [VERIFIED Agent B] |
| 9 | Safety/security plugins | wshobson protect-mcp, signed-audit-trails, review-agent-governance, block-no-verify | ADOPT-NOW | after hooks substrate; avoid bypass paths [VERIFIED Agent B] |
| 10 | Engineering skills | `addyosmani/agent-skills`; selective `alirezarezvani/claude-skills` | ADOPT-NOW / ADOPT-SUBSET | avoid broad duplicate skill imports [VERIFIED Agent B] |
| 11 | Security scanners | Trivy, Bandit, gitleaks, Semgrep pilot | ADOPT-NOW/STUDY | pre-commit/CI wiring; rules license audit for Semgrep [VERIFIED Agent A] |
| 12 | Evals/red-team | promptfoo; deepeval pilot; LiteLLM evals only if LiteLLM is already installed | ADOPT-CANDIDATE/STUDY | needs eval corpus and `.promptfoo/` ignored/managed [INFERRED] |
| 13 | Memory/RAG low infra | mcp-memory-service + sqlite_vec; markitdown; duckdb | ADOPT-NOW/CANDIDATE | reconstructed due empty Memory+RAG output [VERIFIED/INFERRED] |
| 14 | Memory/RAG infra | Qdrant; Graphiti + FalkorDB | ADOPT-STAGED | Docker health checks, volumes, ports, restart policies [INFERRED] |
| 15 | Observability | Phoenix retained; Langfuse staged; OpenLLMetry pilot | ADOPT-STAGED | service infra + SDK instrumentation; license reverify [INFERRED] |
| 16 | DOC-AI / ingestion | PaddleOCR; unstructured pilot; tesseract fallback | ADOPT-NOW/STUDY | license rejects: Marker, pymupdf4llm [VERIFIED Agent A] |
| 17 | Web/search | Firecrawl incumbent; Tavily MCP after key; Jina reader pilot | ADOPT/STUDY | key management + AGPL caution for Firecrawl direct vendoring [VERIFIED Agent A/prior I] |
| 18 | Notifications | ntfy backend; ntfy MCP pilot; Slack/Discord via webhooks | ADOPT-NOW/STUDY | simple alerts before heavy dashboarding [VERIFIED Agent A] |
| 19 | Deployment infra | Docker Compose, health checks, restart policies, named volumes under state | ADOPT-NOW | required before Langfuse/Phoenix/Qdrant/FalkorDB/LiteLLM [INFERRED] |
| 20 | Workflow harness | CWC + ralph-loop + staged GSD verifier pieces | ADOPT-STAGED | after core safety/routing is stable [VERIFIED Agent B] |
| 21 | Provider libraries | LiteLLM, openai-agents-python, LangGraph, deepagents, CrewAI, smolagents, agno | STUDY/PROJECT-LOCAL | do not preload into CC runtime [VERIFIED Agent B/C] |

## 6. Reject / Defer List

| repo | disposition | reason |
|---|---|---|
| `VikParuchuri/marker` | REJECT-FOR-FIT | GPL-3.0 code + Open RAIL-M model license [VERIFIED Agent A] |
| `pymupdf/pymupdf4llm` | REJECT-FOR-FIT | AGPL-3.0 [VERIFIED Agent A] |
| `trufflesecurity/trufflehog` | REJECT-FOR-FIT for vendored install | AGPL-3.0; use gitleaks/Trivy unless separately approved [VERIFIED Agent A] |
| `Skyvern-AI/skyvern` | REJECT-FOR-FIT | AGPL-3.0 and Playwright/Chrome MCP already covers core layer [VERIFIED prior Agent I] |
| `mendableai/firecrawl` direct vendoring | REJECT/INCUMBENT MCP | AGPL-3.0 direct repo; MCP already loaded/incumbent [VERIFIED prior Agent I] |
| `github/spec-kit` | DUPLICATE-FUNCTIONALITY | speckit skills already available in runtime [VERIFIED prior Agent I / AGENTS.md] |
| `microsoft/autogen` | DEFER | maintenance-mode/new-user redirect; not CC-native [VERIFIED Agent B] |
| `brainlid/langchain` | HNF | canonical repo not verified in available artifacts [VERIFIED] |

## 7. Actionable Install Shape

Day-1 pure runtime:

1. Official Anthropic plugins.
2. OpenAI Codex plugin.
3. ccusage, repomix, context7, Serena, native prompt-cache discipline.
4. CLIProxyAPI provenance/pin + cache-fix pilot.
5. GitNexus + ast-grep + difftastic.
6. wshobson subset: agent-teams, agent-orchestration, context-management, comprehensive-review, protect-mcp, signed-audit-trails, review-agent-governance.
7. addyosmani agent-skills.
8. Trivy, Bandit, gitleaks.

Day-2 staged layers:

1. promptfoo + initial eval corpus.
2. mcp-memory-service/sqlite_vec + markitdown + duckdb.
3. Docker Compose service layer with health checks for optional Phoenix/Langfuse/Qdrant/FalkorDB/ntfy/LiteLLM.
4. PaddleOCR and Tavily MCP when ingestion/search workflows are active.
5. CWC/GSD harness pieces after safety hooks and routing are stable.

## 8. Source Trail

- Agent B orchestration/plugins artifact: `tmp/wave220-agentB-orchestration-plugins-comprehensive-scoring-2026-05-15.md` [VERIFIED]
- Agent A uncovered layers artifact: `tmp/wave220-agentA-uncovered-layers-deep-2026-05-15.md` [VERIFIED]
- Agent C token/routing artifact: `tmp/wave220-agentC-token-opt-llm-routing-comprehensive-scoring-2026-05-15.md` [VERIFIED]
- Agent C outer research/proxy/wshobson artifact: `tmp/wave220-agentC-outer-research-llm-proxy-wshobson-deep-2026-05-15.md` [VERIFIED]
- Prior Agent I draft: `tmp/wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md` pre-rewrite [VERIFIED]
- Requested Memory+RAG task output: `tmp/claude/Z--claude-sota-installed/85ffc4b1-ef94-4e92-b3bd-f0ca89fdb147/tasks/a302533488650dbbe.output`, length 0 [VERIFIED]
- Requested Token-Opt partial task output: `tmp/claude/Z--claude-sota-installed/85ffc4b1-ef94-4e92-b3bd-f0ca89fdb147/tasks/a4e0beee591c992ca.output`, length 0 [VERIFIED]

WAVE220-META-SYNTHESIS-COMPLETE
