# W329-D BYPASS-APPLY -- Candidate Tables (3 Domains)

Wave: W329-D-RETRY 2026-05-19
Brief: Apply Stage-0.5 ENUMERATION-BYPASS cascade (HF M1-M6 + GH 14-method) to live discovery in 3 enumeration domains.
ASCII-only. Star counts and last-commit dates captured at harvest time (2026-05-19); license per repo metadata when surfaced via REST.

Legend:
- discovery-method column codes:
  - GH-MCP        = mcp__github__search_repositories (Pattern: in:topic / in:name with stars+pushed qualifiers)
  - HF-M3-tag     = mcp__hf-mcp-server__hub_repo_search with filters=[tag], no free-text query (Pattern B)
  - GH-REST-ctx   = GitHub REST /search/repositories via mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (non-MCP bypass)
  - GH-REST-direct= GitHub REST /repos/{owner}/{name} via ctx_fetch_and_index (single-repo lookup)
  - Exa           = mcp__exa__web_search_exa (non-MCP bypass)
  - Perplexity    = mcp__perplexity__perplexity_search (non-MCP bypass)
  - ecosyste.ms   = ecosyste.ms /api/v1/repositories/lookup via ctx_fetch_and_index (non-MCP bypass)
- NEW-VIA-BYPASS: Y = first surfaced by a non-W320-DEEPER channel during this wave; N = already present in W320 T1 portfolio.

NOTE on anti-bias mandate: each domain has >= 1 top-10 row marked discovery-method = GH-REST-ctx OR Exa OR ecosyste.ms (non-MCP bypass channel).

---

## D1 -- MCP servers for research / agentic-search / eval (top-15)

| rank | repo                                       | stars  | last-commit  | license     | discovery-method | NEW-VIA-BYPASS |
|------|--------------------------------------------|--------|--------------|-------------|------------------|----------------|
| 1    | upstash/context7                           | 55648  | 2026-05-18   | MIT         | GH-REST-ctx      | Y              |
| 2    | ruvnet/ruflo                               | 53157  | 2026-05-17   | MIT         | GH-REST-ctx      | Y              |
| 3    | ChromeDevTools/chrome-devtools-mcp         | 40044  | 2026-05-18   | Apache-2.0  | GH-MCP           | Y              |
| 4    | bytedance/UI-TARS-desktop                  | 34756  | 2026-05-19   | Apache-2.0  | GH-REST-ctx      | Y              |
| 5    | github/github-mcp-server                   | 29977  | 2026-05-18   | MIT         | GH-MCP           | Y              |
| 6    | oraios/serena                              | 24385  | 2026-05-19   | MIT         | GH-REST-ctx      | Y              |
| 7    | microsoft/playwright-mcp                   | 22000  | 2026-05-18   | Apache-2.0  | GH-REST-ctx      | Y              |
| 8    | czlonkowski/n8n-mcp                        | 21115  | 2026-05-18   | MIT         | GH-MCP           | Y              |
| 9    | microsoft/mcp-for-beginners                | 16142  | 2026-05-15   | MIT         | GH-REST-ctx      | Y              |
| 10   | triggerdotdev/trigger.dev                  | 14971  | 2026-05-18   | Apache-2.0  | Exa              | Y              |
| 11   | awslabs/mcp                                | 9090   | 2026-05-18   | Apache-2.0  | GH-MCP           | Y              |
| 12   | mcp-use/mcp-use                            | 9967   | 2026-05-17   | MIT         | GH-MCP           | Y              |
| 13   | assafelovic/gptr-mcp                       | ~1200  | 2026-05-13   | MIT         | Perplexity       | Y              |
| 14   | SalesforceAIResearch/MCP-Universe          | 586    | 2026-05-16   | Apache-2.0  | GH-REST-direct   | Y              |
| 15   | mcp-tool-bench/MCPToolBenchPP              | 44     | 2026-05-12   | Apache-2.0  | GH-REST-direct   | Y              |

Anti-bias rows in top-10 via non-MCP bypass channel: rank 1 (GH-REST-ctx), rank 2 (GH-REST-ctx), rank 4 (GH-REST-ctx), rank 6 (GH-REST-ctx), rank 7 (GH-REST-ctx), rank 9 (GH-REST-ctx), rank 10 (Exa). Mandate satisfied: 7 of top-10.

---

## D2 -- Open-source agent / LLM-app frameworks (top-12)

| rank | repo                                          | stars  | last-commit  | license     | discovery-method | NEW-VIA-BYPASS |
|------|-----------------------------------------------|--------|--------------|-------------|------------------|----------------|
| 1    | bytedance/deer-flow                           | 68698  | 2026-05-19   | MIT         | ecosyste.ms      | Y              |
| 2    | CopilotKit/CopilotKit                         | 31526  | 2026-05-18   | MIT         | GH-REST-ctx      | Y              |
| 3    | ComposioHQ/composio                           | 28346  | 2026-05-18   | Apache-2.0  | GH-REST-ctx      | Y              |
| 4    | charmbracelet/crush                           | 24430  | 2026-05-18   | MIT         | GH-REST-ctx      | Y              |
| 5    | NirDiamant/agents-towards-production          | 20269  | 2026-05-17   | MIT         | GH-REST-ctx      | Y              |
| 6    | google/adk-python                             | 19729  | 2026-05-18   | Apache-2.0  | GH-MCP           | Y              |
| 7    | microsoft/agent-lightning                     | 17198  | 2026-05-17   | MIT         | GH-REST-ctx      | Y              |
| 8    | pydantic/pydantic-ai                          | 17148  | 2026-05-19   | MIT         | GH-MCP           | N              |
| 9    | microsoft/agent-framework                     | 10565  | 2026-05-19   | MIT         | GH-REST-ctx      | Y              |
| 10   | ag2ai/ag2                                     | 4576   | 2026-05-18   | Apache-2.0  | Perplexity       | Y              |
| 11   | evalstate/fast-agent                          | 3783   | 2026-05-17   | Apache-2.0  | HF-M3-tag        | Y              |
| 12   | i-am-bee/beeai-framework                      | ~1500  | 2026-05-16   | Apache-2.0  | Exa              | Y              |

Anti-bias rows in top-10 via non-MCP bypass channel: rank 1 (ecosyste.ms), rank 2 (GH-REST-ctx), rank 3 (GH-REST-ctx), rank 4 (GH-REST-ctx), rank 5 (GH-REST-ctx), rank 7 (GH-REST-ctx), rank 9 (GH-REST-ctx), rank 10 (Perplexity). Mandate satisfied: 8 of top-10.

---

## D3 -- SOTA eval harnesses (top-10)

| rank | repo                                       | stars  | last-commit  | license     | discovery-method | NEW-VIA-BYPASS |
|------|--------------------------------------------|--------|--------------|-------------|------------------|----------------|
| 1    | langfuse/langfuse                          | 27503  | 2026-05-18   | MIT         | GH-MCP           | Y              |
| 2    | mlflow/mlflow                              | 26011  | 2026-05-18   | Apache-2.0  | GH-MCP           | Y              |
| 3    | promptfoo/promptfoo                        | 21401  | 2026-05-19   | MIT         | GH-MCP           | Y              |
| 4    | comet-ml/opik                              | 19340  | 2026-05-19   | Apache-2.0  | GH-REST-ctx      | Y              |
| 5    | confident-ai/deepeval                      | 15557  | 2026-05-18   | Apache-2.0  | GH-REST-ctx      | Y              |
| 6    | Arize-ai/phoenix                           | 9746   | 2026-05-19   | Elastic-2.0 | GH-REST-ctx      | Y              |
| 7    | NVIDIA/garak                               | 7854   | 2026-05-17   | Apache-2.0  | Exa              | Y              |
| 8    | Giskard-AI/giskard-oss                     | 5360   | 2026-05-17   | Apache-2.0  | GH-REST-ctx      | Y              |
| 9    | coze-dev/coze-loop                         | 5463   | 2026-05-18   | Apache-2.0  | Perplexity       | Y              |
| 10   | Marker-Inc-Korea/AutoRAG                   | 4774   | 2026-05-15   | Apache-2.0  | Exa              | Y              |

Anti-bias rows in top-10 via non-MCP bypass channel: rank 4 (GH-REST-ctx), rank 5 (GH-REST-ctx), rank 6 (GH-REST-ctx), rank 7 (Exa), rank 8 (GH-REST-ctx), rank 9 (Perplexity), rank 10 (Exa). Mandate satisfied: 7 of top-10.

---

## Aggregate counts

| Domain | Top-K | NEW-VIA-BYPASS rows | Already-in-W320 rows | non-MCP-bypass-in-top-10 |
|--------|-------|---------------------|----------------------|--------------------------|
| D1     | 15    | 15                  | 0                    | 7                        |
| D2     | 12    | 11                  | 1                    | 8                        |
| D3     | 10    | 10                  | 0                    | 7                        |
| TOTAL  | 37    | 36                  | 1                    | 22                       |

## Cite anchors (per top-K row: 3-org-distinct minimum)

Each row above is cite-anchored by:
1. github.com REST API (api.github.com /repos/{owner}/{name}) -- canonical stars + license + push_at
2. The repo's own README.md / docs site (project-self) -- discovery context
3. One independent third-party surface among: huggingface.co tag listing, ecosyste.ms repository record, Awesome-MCP lists (oraios/awesome-mcp-clients, modelcontextprotocol/servers), Perplexity / Exa retrieved snippets

Per-row cite-anchor URLs are inlined in METHODS-USED.md invocation log.
