---
title: Wave 220 Synthesis Status
date: 2026-05-15
status: PARTIAL-SYNTHESIS
artifact-class: wave220-status-report
budget: 400 LOC
---

# WAVE220-STATUS-REPORT

## Inputs Read

- `tmp/claude/Z--claude-sota-installed/85ffc4b1-ef94-4e92-b3bd-f0ca89fdb147/tasks/a4e0beee591c992ca.output` first 150 lines: file read returned no text in this session. Treat the running Token-Opt+LLM-Routing agent as still incomplete; use its saved scoring artifact below as the latest completed snapshot.
- `tmp/wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md` first 50 lines: EXISTS. Meta-catalog/uncovered-layer survey; Sonnet stand-in; catalog probes and uncovered-layer picks present.
- `tmp/wave220-agentB-orchestration-plugins-comprehensive-scoring-2026-05-15.md` first 80 lines: EXISTS. Top ADOPT-NOW orchestration/plugin items identified.
- `tmp/wave220*` artifact listing: 8 files found.

## Completed Artifacts Found

| Artifact | Size | Last write | Status |
|---|---:|---|---|
| `wave220-agentA-uncovered-layers-deep-2026-05-15.md` | 17,381 | 2026-05-15 17:36:55 | completed |
| `wave220-agentB-gpt55-adversarial-audit-2026-05-15.md` | 21,359 | 2026-05-15 17:31:30 | completed |
| `wave220-agentB-orchestration-plugins-comprehensive-scoring-2026-05-15.md` | 33,239 | 2026-05-15 17:40:35 | completed |
| `wave220-agentC-outer-research-llm-proxy-wshobson-deep-2026-05-15.md` | 31,567 | 2026-05-15 17:32:16 | completed |
| `wave220-agentC-token-opt-llm-routing-comprehensive-scoring-2026-05-15.md` | 32,441 | 2026-05-15 17:41:05 | completed |
| `wave220-agentI-codex-bridge-prompt.txt` | 1,493 | 2026-05-15 17:47:08 | prompt artifact |
| `wave220-agentI-codex-bridge-result.json` | 447 | 2026-05-15 17:47:08 | bridge result artifact |
| `wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md` | 13,937 | 2026-05-15 17:46:31 | completed |

## Top 10 ADOPT-NOW Repos Across Layers So Far

Selection basis: ADOPT-NOW or strongest install-class/pilot ADOPT rows from completed Wave 220 artifacts only. Fields remain `[UNKNOWN]` where the artifact did not pin a value.

| Rank | Repo / primitive | Stars | License | Layer | native_cc_path | cr12_disposition | Current call |
|---:|---|---:|---|---|---|---|---|
| 1 | `wshobson/agents` | 35,450 verified in adversarial audit; Agent B top row had `[UNKNOWN]` | MIT | orchestration, agents, skills, commands | Marketplace+Plugin+Agent+Skill+Command+Hook | GENUINELY-NEW | ADOPT-NOW core orchestration marketplace |
| 2 | `anthropics/claude-plugins-official` | 19,446 | NOASSERTION repo-wide; per-plugin licenses | official plugin marketplace | Marketplace+Plugin+Skill+Agent+Hook+Command | GENUINELY-NEW | ADOPT-NOW first-party marketplace; per-plugin license review required |
| 3 | `addyosmani/agent-skills` | 42,020 adversarial audit; Agent B cited ~31k earlier | MIT | skill catalog / engineering workflows | Marketplace+Skill+Agent+Command+Hook+Multi-runtime | GENUINELY-NEW | ADOPT-NOW / per-skill install review due launch-spike |
| 4 | `openai/codex-plugin-cc` | ~18.4k | [UNKNOWN] | cross-model review/rescue | Marketplace+Plugin+Command+Agent+Hook | PROVIDER-COMPLEMENT | ADOPT-NOW for `/codex:*`, review, rescue |
| 5 | `gsd-build/get-shit-done` | ~60.7k | [UNKNOWN] | workflow harness | Workflow/command harness | [UNKNOWN] | ADOPT-NOW after official/wshobson to avoid planning-system collision |
| 6 | `cnighswonger/claude-code-cache-fix` | local prior; [UNKNOWN] current | MIT | token optimization / cache normalization | `ANTHROPIC_BASE_URL` proxy | GENUINELY-NEW | ADOPT-NOW PILOT; reversible cache proxy |
| 7 | `yamadashy/repomix` | ~24.8k prior | MIT | context management / codebase packing | MCP+CLI | ECOSYSTEM-IMPORT | ADOPT-NOW Day-1 context-ingestion primitive |
| 8 | `ryoppippi/ccusage` / `@ccusage/mcp` | 13,889 prior | MIT | token accounting | MCP+CLI | ECOSYSTEM-IMPORT | ADOPT-NOW usage dashboards and token accounting |
| 9 | `ast-grep/ast-grep` | 13,808 | MIT | code intelligence / structural rewrite | CLI (`npm i -g @ast-grep/cli`) | GENUINELY-NEW | ADOPT-NOW structural code search/rewrite |
| 10 | `PaddlePaddle/PaddleOCR` | 77,913 | Apache-2.0 | DocAI / OCR | CLI/Python package (`pip install paddleocr`) | GENUINELY-NEW | ADOPT-NOW DocAI winner |

## Additional Strong ADOPT-NOW / Install-Class Items Not In Top 10

| Repo / primitive | Stars | License | Layer | native_cc_path | cr12_disposition | Current call |
|---|---:|---|---|---|---|---|
| `aquasecurity/trivy` | [UNKNOWN in read slice; artifact says active] | Apache-2.0 | security scanning | CLI release binary | GENUINELY-NEW | ADOPT-NOW canonical SBOM/CVE/IaC/secrets scanner |
| `PyCQA/bandit` | 8,029 | Apache-2.0 | Python SAST | `pipx install bandit` | PROVIDER-COMPLEMENT | ADOPT-NOW Python-specific SAST |
| `Wilfred/difftastic` | 25,308 | MIT | syntax-aware diff | `cargo install difftastic` / git diff external | GENUINELY-NEW | ADOPT-NOW |
| `microsoft/markitdown` | 123,303 | MIT | multimodal preprocessing | CLI/Python package | GENUINELY-NEW | INSTALL-NOW in meta-catalog survey |
| `dottxt-ai/outlines` | 13,843 | Apache-2.0 | structured generation | library | GENUINELY-NEW | INSTALL-NOW in meta-catalog survey |
| Anthropic prompt caching / cache-control | n/a | SaaS/API | token optimization | native API/config discipline | CITE-CLASS-CANONICAL | ADOPT-NOW provider-native cache discipline |
| OpenAI prompt caching | n/a | SaaS/API | token optimization | API primitive | CITE-CLASS-CANONICAL | ADOPT for OpenAI paths |
| Claude Code 1M context discipline | n/a | bundled/API | context management | native Claude Code/env discipline | CITE-CLASS-CANONICAL | ADOPT-NOW |

## Notable Defer / Reject Signals

- `microsoft/LLMLingua`: moved to CITE-CLASS-CANONICAL / historical baseline, not 2026 Claude Code token-opt install.
- `temporalio/temporal`: mature and high-quality but DEFER-UNTIL-DISTRIBUTED-AGENT-RUNNER; too large for casual local runtime install.
- `Skyvern-AI/skyvern`: AGPL-3.0, REJECT despite strong browser-automation signal.
- `n8n-io/n8n`: fair-code restricted, REJECT for default runtime.
- `trufflesecurity/trufflehog`: AGPL-3.0 blocker; Trivy/Bandit cover safer default path.
- `VikParuchuri/marker`: GPL-3.0 + model license constraints; REJECT-FOR-FIT.
- `AutoGen`: maintenance-mode / framework-overlap concerns; DEFER or REJECT for CC-native substrate.
- `ComposioHQ/awesome-claude-skills`: high-star catalog but license ambiguous; CITE-ONLY until license cleared.

## Gap Layers Not Yet Covered Or Not Yet Fully Closed

- Operator dashboards / UI control planes: Vibe Kanban, Claude Squad, CCUI, Tutti, cmux, and dashboard-specific risk review remain pilot/gap territory.
- Install-time source-auditing: v10 surfaced `source-auditor` + `source-repo-audit` as a real gap; current SOTA researcher probes occur after selection, not as a dedicated pre-install source audit gate.
- Context capsule construction: input/task-bundling capsule skill is not yet a first-class primitive.
- MCP framework/construction layer: `modelcontextprotocol/servers`, FastMCP, EasyMCP, mxcp, PayMCP need deeper scoring as server-building substrate, not just MCP server catalogs.
- Eval/red-team/prompt testing: `promptfoo` is identified but still DEFER/STUDY rather than an installed eval baseline.
- Observability/error tracking: Langfuse/Phoenix/Sentry boundaries and license surfaces need clean final scoring for pure runtime.
- Browser-agent automation beyond Playwright: Stagehand/browserbase, Skyvern alternatives, and AI-native browser control still require license/fit filtering.
- Database/sync/streaming layer: postgres MCP, DuckDB, ElectricSQL, Redpanda Connect, and stream-processing for agent events are only partially synthesized.
- Durable workflow execution: Temporal/LangGraph/Prefect/Dagster/Airflow boundaries need target-runtime criteria before adoption.
- RAG/memory competitors from adversarial audit: mem0, Graphiti, cognee, Onyx, RAGFlow, Haystack, LlamaIndex, llmware require final cross-layer de-duplication against completed Memory+RAG output.
- Domain/regulatory catalogs: regulatory/RA-QM, finance, healthcare, life-sciences, C-level advisory, education, embedded, aerospace, sports, multimedia, translation, and TTS were surfaced by meta-catalogs but not comprehensively scored.
- License normalization: repo-wide NOASSERTION/open-core/per-plugin license cases need a single license ledger before install commits.
- Cross-model gate status: several Wave 220 artifacts disclose Sonnet stand-in or failed local `codex exec`; adoption decisions still need T1/T2 verification before commits.

## Current Synthesis Verdict

Wave 220 has enough completed evidence to proceed with an install-planning short list for plugin/orchestration, token/context/accounting, code-intel, DocAI, and security-scanning layers. It is not yet a final adoption ledger: the running Token-Opt+LLM-Routing background task has no readable partial output at the requested path, Memory+RAG de-duplication is not directly present in the `wave220*` file listing, and multiple reports explicitly require second-stage validation before install commits.

WAVE220-STATUS-COMPLETE
