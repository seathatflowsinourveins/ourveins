# W329-D BYPASS-APPLY -- Comparison to W320-DEEPER Portfolio

Wave: W329-D-RETRY 2026-05-19
Source baseline: docs/architecture/W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/W320-DEEPER-SYNTHESIS.md (T1 candidate table)
Comparison rule: a candidate is "W320-baseline" if it appears in W320 T1 rows 35-49; otherwise "NEW-VIA-BYPASS".

ASCII-only. No surrogate-pair chars.

---

## W320 T1 baseline portfolio (rows 35-49 reference, captured 2026-05-19)

The 15 W320-DEEPER T1 candidates (no domain-stratification in W320):
1.  bclavie/RAGatouille
2.  microsoft/markitdown
3.  pydantic/pydantic-ai
4.  BerriAI/litellm
5.  stanford-oval/storm
6.  mem0ai/mem0
7.  mlc-ai/mlc-llm
8.  docling-project/docling
9.  Future-House/paper-qa
10. agno-agi/agno
11. traceloop/openllmetry
12. assafelovic/gpt-researcher
13. langchain-ai/open_deep_research
14. getzep/zep
15. langroid/local-deep-research

---

## Per-domain comparison

### D1 -- MCP servers for research / agentic-search / eval

| W329-D D1 candidate                           | Already in W320 T1? | Why bypass surfaced it (and W320 missed it) |
|-----------------------------------------------|---------------------|---------------------------------------------|
| upstash/context7                              | No                  | MCP-centric category not stratified by W320; GH-REST topic:mcp+stars:>50000 surfaced top-1 |
| ruvnet/ruflo                                  | No                  | Same -- new high-velocity MCP-meta-orchestration tool not in W320's general-research lens |
| ChromeDevTools/chrome-devtools-mcp            | No                  | DevTools-domain MCP not surfaced by W320's research-focused queries |
| bytedance/UI-TARS-desktop                     | No                  | UI-automation agent MCP; W320 queries did not stratify desktop-agent class |
| github/github-mcp-server                      | No                  | Canonical GH-MCP server; W320 captured upstream LangChain/LlamaIndex but not MCP-protocol servers as a class |
| oraios/serena                                 | No                  | Code-symbol-navigation MCP; W329 GH-REST stars:>10000 top-tier discovery |
| microsoft/playwright-mcp                      | No                  | Browser-automation MCP; W320 did not enumerate playwright-class servers |
| czlonkowski/n8n-mcp                           | No                  | Workflow-orchestration MCP not on W320's research radar |
| microsoft/mcp-for-beginners                   | No                  | Educational MCP corpus; not directly a server but high-signal capability survey |
| triggerdotdev/trigger.dev                     | No                  | Job orchestration; surfaced via Exa expanding MCP integration ecosystem |
| awslabs/mcp                                   | No                  | AWS-org MCP server collection; W320 missed AWS-stack agent integrations |
| mcp-use/mcp-use                               | No                  | Generic MCP client library; W329 GH-MCP topic query surfaced it |
| assafelovic/gptr-mcp                          | No                  | MCP wrapper around gpt-researcher (which IS in W320 #12); W320 missed the MCP companion |
| SalesforceAIResearch/MCP-Universe             | No                  | MCP eval benchmark; sub-1000-star research repo missed by W320 query thresholds |
| mcp-tool-bench/MCPToolBenchPP                 | No                  | MCP tool benchmark; sub-100-star eval candidate found by GH-REST single-repo direct lookup |

D1 overlap with W320: 0 of 15.

### D2 -- Open-source agent / LLM-app frameworks

| W329-D D2 candidate                           | Already in W320 T1? | Why bypass surfaced it (and W320 missed it) |
|-----------------------------------------------|---------------------|---------------------------------------------|
| bytedance/deer-flow                           | No                  | 68k-star deep-research framework -- a major gap in W320; ecosyste.ms anti-bias channel surfaced it |
| CopilotKit/CopilotKit                         | No                  | UI-embedded agent framework; W320 missed UI-integration class |
| ComposioHQ/composio                           | No                  | Agent-tool integration framework; W320's general queries did not stratify integration platforms |
| charmbracelet/crush                           | No                  | TUI-based agent shell; W320 missed terminal-class agents |
| NirDiamant/agents-towards-production          | No                  | Production-agent corpus + framework; W320 missed it |
| google/adk-python                             | No                  | Google's Agent Dev Kit; major-org SDK; W320 missed |
| microsoft/agent-lightning                     | No                  | Microsoft agent training framework; W320 missed |
| pydantic/pydantic-ai                          | YES (#3 in W320)    | Confirms W320; same canonical position |
| microsoft/agent-framework                     | No                  | Microsoft's broader agent framework; new entrant; W320 missed |
| ag2ai/ag2                                     | No                  | AutoGen v2 fork; perplexity surfaced; W320 missed |
| evalstate/fast-agent                          | No                  | HF Space-discovered fast-agent project |
| i-am-bee/beeai-framework                      | No                  | IBM Research's beeai framework; Exa surfaced |

D2 overlap with W320: 1 of 12 (only pydantic-ai).

### D3 -- SOTA eval harnesses

| W329-D D3 candidate                           | Already in W320 T1? | Why bypass surfaced it (and W320 missed it) |
|-----------------------------------------------|---------------------|---------------------------------------------|
| langfuse/langfuse                             | No                  | Production-grade observability + eval -- W320 missed despite traceloop/openllmetry being included |
| mlflow/mlflow                                 | No                  | Classical ML eval + new LLM eval surface; W320 missed |
| promptfoo/promptfoo                           | No                  | Prompt eval harness; W320 missed |
| comet-ml/opik                                 | No                  | Opik tracing + eval; W320 missed |
| confident-ai/deepeval                         | No                  | LLM eval framework; W320 missed |
| Arize-ai/phoenix                              | No                  | Arize observability + eval; W320 missed |
| NVIDIA/garak                                  | No                  | LLM red-team / vulnerability scanner; W320 missed |
| Giskard-AI/giskard-oss                        | No                  | Giskard LLM/ML test suite; W320 missed |
| coze-dev/coze-loop                            | No                  | Coze platform eval loop; W320 missed |
| Marker-Inc-Korea/AutoRAG                      | No                  | RAG-pipeline auto-eval; W320 missed |

D3 overlap with W320: 0 of 10.

---

## W320-baseline candidates NOT re-surfaced this wave (carry-over status)

These W320 T1 candidates were not in W329-D top-K for any of the 3 domains:

| W320 row | Repo                              | Reason not in W329-D top-K |
|----------|-----------------------------------|----------------------------|
| 1        | bclavie/RAGatouille               | Retrieval; out of D1/D2/D3 scope (RAG-tool, not server/framework/harness) |
| 2        | microsoft/markitdown              | Doc-conversion utility; out of all 3 domains |
| 4        | BerriAI/litellm                   | LLM proxy library; not D1 MCP-server nor D2 agent-framework class |
| 5        | stanford-oval/storm               | Single-purpose research tool; not a framework |
| 6        | mem0ai/mem0                       | Memory layer; not D1/D2/D3 |
| 7        | mlc-ai/mlc-llm                    | Model compilation; out of scope |
| 8        | docling-project/docling           | Doc parser; out of scope |
| 9        | Future-House/paper-qa             | Single-purpose QA app; not D2 framework class |
| 10       | agno-agi/agno                     | Borderline D2; would rank below top-12 (~4k stars in W320 era) -- candidate for D2 extended list |
| 11       | traceloop/openllmetry             | Observability; could be D3 borderline -- below top-10 in stars vs langfuse/mlflow/promptfoo |
| 12       | assafelovic/gpt-researcher        | Single-app research; D1 has its MCP companion (gptr-mcp) |
| 13       | langchain-ai/open_deep_research   | LangChain template; not D2 framework class |
| 14       | getzep/zep                        | Memory; out of scope |
| 15       | langroid/local-deep-research      | Single-app; out of D2 framework class |

W320 carry-over: 14 of 15 W320 candidates fall outside the 3 W329-D enumeration domains (D1 MCP-server, D2 agent-framework, D3 eval-harness) by scope/category, not by quality.

---

## Net diff summary

| Metric                                                          | Count |
|-----------------------------------------------------------------|-------|
| W329-D total top-K rows (15+12+10)                              | 37    |
| W329-D rows flagged NEW-VIA-BYPASS (not in W320 T1)             | 36    |
| W329-D rows that are also in W320 T1                            | 1     |
| W320 T1 candidates carried into W329-D top-K                    | 1 (pydantic-ai) |
| W320 T1 candidates outside W329-D scope (different categories)  | 14    |
| Domain coverage extension by W329-D vs W320                     | 36 net-new candidates across 3 enumeration domains |

Interpretation: W320's T1 portfolio was domain-agnostic general SOTA; W329-D's domain-stratified bypass cascade surfaces 36 net-new candidates in 3 specific enumeration categories that were not represented in W320. Only pydantic-ai overlaps. The bypass cascade demonstrated value by recovering high-star repos (deer-flow 68k, context7 55k, ruflo 53k) that W320's general-research queries did not surface.

---

## Method-attribution of net-new discoveries

Of the 36 NEW-VIA-BYPASS rows:
- 21 first-surfaced by GH-REST-ctx (ctx_fetch_and_index direct GitHub REST hit) -- the non-MCP bypass channel
- 6 first-surfaced by mcp__github__search_repositories (Pattern: valid qualifiers per W328-GHMCP-USAGE-CORRECTION)
- 3 first-surfaced by mcp__exa__web_search_exa
- 3 first-surfaced by mcp__perplexity__perplexity_search
- 1 first-surfaced by ecosyste.ms /api/v1/repositories/lookup (deer-flow anti-bias top-1)
- 1 first-surfaced by HF M3 Pattern B tag-filter
- 1 first-surfaced by GH-REST-direct single-repo lookup (MCPToolBenchPP -- sub-100-star research surface)

This distribution confirms the bypass cascade's intended behavior: non-MCP channels surfaced 28 of 36 (77.8 percent) net-new candidates. MCP-only channels (GH-MCP + HF M3) surfaced 7 of 36 (19.4 percent), with the remaining 1 from MCP-specific direct lookup. The high non-MCP percentage reflects (a) GH-MCP's 1000-cap saturation at top-tier stars and (b) HF M3's substring-on-id semantics that filter out new-class entrants.

---

## Followups (operator-decidable)

1. Schedule HF M5 (DuckDB parquet) for a future batch wave once DuckDB runtime is wired.
2. Schedule GH #7 (BigQuery) once operator GCP creds are provisioned.
3. Consider promoting deer-flow, context7, ruflo, langfuse, mlflow, promptfoo into a W330 SOTA-installed evaluation flight given their star-mass and category-fit.
4. Consider extending W320 T1 portfolio with a domain-stratified sub-list (D1/D2/D3) to prevent the 36-net-new gap from re-occurring in future research waves.
