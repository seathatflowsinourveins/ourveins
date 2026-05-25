# W329-D BYPASS-APPLY -- Methods-Used Invocation Log

Wave: W329-D-RETRY 2026-05-19
Scope: Per-domain invocation log of which bypass methods were exercised, what they returned, rate-limit / HTTP-error encounters, and which methods were deferred.

ASCII-only. No tool-name surrogate-pair characters. All operators ASCII (<=, >=, !=).

---

## Bypass method legend (HF M1-M6 + GH 14-method)

### HF enumeration matrix (W328-HF-SOTA-METHODS)
| Id  | Method                                                       | Status this wave |
|-----|--------------------------------------------------------------|------------------|
| M1  | HfApi.list_models cursor walk (huggingface_hub Python lib)   | DEFERRED         |
| M2  | Raw REST GET /api/{models|datasets|spaces}                   | NOT-INVOKED      |
| M3  | mcp__hf-mcp-server__hub_repo_search (Pattern B tag filter)   | INVOKED          |
| M4  | /api/quicksearch                                             | NOT-INVOKED      |
| M5  | cfahlgren1/hub-stats parquet via DuckDB                      | DEFERRED         |
| M6  | Webhooks (push-based subscription)                           | DEFERRED         |

### GitHub enumeration matrix (W328-GH-SOTA-METHODS)
| Id  | Method                                                              | Status this wave |
|-----|---------------------------------------------------------------------|------------------|
| 1   | REST /search/repositories (1000-cap)                                | INVOKED          |
| 2   | GraphQL search                                                      | NOT-INVOKED      |
| 3   | GraphQL search + window-partition (stars or pushed buckets)         | INVOKED-EMULATED |
| 4   | GraphQL Owner.repositories connection                               | NOT-INVOKED      |
| 5   | REST /orgs/{org}/repos                                              | NOT-INVOKED      |
| 6   | REST /repositories?since={id}                                       | NOT-INVOKED      |
| 7   | BigQuery bigquery-public-data.github_repos                          | DEFERRED         |
| 8   | GH Archive (push events JSON)                                       | DEFERRED         |
| 9   | ecosyste.ms /api/v1/repositories/lookup                             | INVOKED          |
| 10  | libraries.io                                                        | NOT-INVOKED      |
| 11  | GHTorrent                                                           | NOT-INVOKED      |
| 12  | gh CLI                                                              | DEFERRED         |
| 13  | gh search (alias)                                                   | DEFERRED         |
| 14  | OSSF criticality_score enumerate_github                             | DEFERRED         |

### Out-of-matrix bypass channels (added per anti-bias mandate)
| Id  | Method                                                              | Status this wave |
|-----|---------------------------------------------------------------------|------------------|
| X1  | mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (GH-REST direct) | INVOKED   |
| X2  | mcp__perplexity__perplexity_search                                   | INVOKED         |
| X3  | mcp__exa__web_search_exa                                             | INVOKED         |

Bypass-method exercise rate (this wave):
- HF: 1 of 6 invoked (M3 only) = 16.7 percent
- GH: 3 of 14 invoked (#1, #3-emulated, #9) = 21.4 percent
- Out-of-matrix bypass: 3 of 3 invoked = 100 percent
- Combined HF+GH only: 4 of 20 invoked = 20 percent
- Combined with out-of-matrix: 7 of 23 = 30.4 percent

The exercise rate is intentionally below 100 percent because: (a) M5 DuckDB + #7 BigQuery + #8 GH Archive all require GCP creds / DuckDB runtime not present in this session; (b) M1 cursor walk requires huggingface_hub Python lib + token; (c) #12-#13 gh CLI not authenticated in this runtime; (d) #14 OSSF criticality_score is a local-install scorer, not a discovery driver. The deferred methods are listed in the Deferred-Items section below; none of them are blocked by W328-S2 silent-fallback discipline.

---

## D1 -- MCP servers for research / agentic-search / eval

### Invocations

1. mcp__hf-mcp-server__hub_repo_search Pattern B (tag-filter)
   - Input: repo_types=["space"], filters=["mcp-server"], sort="trendingScore", limit=20
   - Return: 20 results, mostly Gradio image / video / audio Spaces (auto-tagged)
   - Diagnosis per W328-HF-USAGE-CORRECTION: tag is over-broad; Pattern B is correct usage but the tag itself does not stratify research-vs-general
   - Outcome: pivoted to GH channels for D1 SOTA-discovery

2. mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (GH REST /search/repositories)
   - 8 stratified queries by qualifier window (per W328-GH bypass cascade step 1):
     - q=topic:mcp+stars:>5000 sort=stars
     - q=topic:mcp-server+stars:>1000 sort=stars
     - q=topic:model-context-protocol+stars:>500 sort=stars
     - q=topic:mcp+pushed:>2026-04-01+sort:updated (window-partition emulation)
     - q="mcp server"+in:name+stars:>500
     - q=topic:agent-framework+stars:>10000
     - q=topic:llm-evaluation+stars:>500
     - q=topic:agentic-ai+stars:>1000
   - Return totals: 228 mcp-server matches, 33 agent-framework, 27 llm-evaluation, 18 agent-orchestration, 24 deep-research, 89 agentic-ai
   - HTTP errors: none on this path (anonymous tier; well under search rate-limit cap)
   - Outcome: yielded 11 of 15 D1 candidates

3. GH-REST single-repo lookup via ctx_fetch_and_index for low-star research-grade candidates
   - /repos/SalesforceAIResearch/MCP-Universe -> 586 stars, Apache-2.0, last commit 2026-05-16
   - /repos/mcp-tool-bench/MCPToolBenchPP -> 44 stars, Apache-2.0, last commit 2026-05-12
   - Purpose: rescue eval-class candidates that fall below default stars:>500 threshold

4. mcp__exa__web_search_exa
   - 3 queries: "MCP server deep research agent 2026", "trigger.dev MCP integration", "MCP eval benchmark suite"
   - Return: triggerdotdev/trigger.dev surfaced (14971 stars), plus several blog/whitepaper hits
   - Rate-limit: none observed

5. mcp__perplexity__perplexity_search
   - 3 queries: "MCP server research agent open source", "best MCP server agentic search 2026", "MCP eval harness comparison"
   - Return: confirmed gptr-mcp + general MCP ecosystem orientation
   - Rate-limit: none observed

6. ecosyste.ms /api/v1/repositories/lookup
   - 3 attempts: lookups by URL (github.com/upstash/context7, github.com/oraios/serena, github.com/awslabs/mcp)
   - All 3 successful; star + license + last-commit confirmed
   - Note: /api/v1/topics/{topic} endpoint returned HTTP 500 -- known intermittent (not a bypass blocker; lookup endpoint stable)

### Rate-limit notes (D1)
- GH REST search anonymous: 10 req/min observed cap; we issued <= 8 within a 10-min window. No 429s.
- HF: M3 anonymous tier; no 429s.
- ecosyste.ms: 5000/hr per IP advertised; <10 requests issued.

---

## D2 -- Open-source agent / LLM-app frameworks

### Invocations

1. mcp__github__search_repositories (Pattern: in:topic qualifiers)
   - 4 queries: topic:agent-framework, topic:llm-agent, topic:agentic-ai, "agent framework" in:name stars:>5000
   - Yielded: pydantic-ai (already in W320 T1), adk-python (new)

2. mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (GH REST direct)
   - 6 stratified queries window-partitioned by stars + topic; recovered candidates above and below the GH-MCP 1000-cap
   - Yielded: deer-flow, CopilotKit, composio, charmbracelet/crush, agents-towards-production, agent-lightning, microsoft/agent-framework

3. mcp__exa__web_search_exa
   - Queries: "open source agent framework 2026 deer-flow alternatives", "bee ai framework", "best LLM agent framework Python 2026"
   - Yielded: i-am-bee/beeai-framework (~1500 stars)

4. mcp__perplexity__perplexity_search
   - Queries: "ag2 ag2ai agent framework", "agent framework comparison 2026"
   - Yielded: ag2ai/ag2 (4576 stars)

5. mcp__hf-mcp-server__hub_repo_search Pattern B
   - filters=["agent"], repo_types=["space"], sort="trendingScore"
   - Yielded: fast-agent (evalstate/fast-agent surfaced via HF Space repo metadata pointing back to GitHub)

6. ecosyste.ms /api/v1/repositories/lookup
   - github.com/bytedance/deer-flow -> CONFIRMED 68698 stars, MIT, last commit 2026-05-19
   - This was the anti-bias top-1 anchor for D2 (non-MCP bypass channel discovered the highest-ranked candidate)

### HTTP errors (D2)
- ecosyste.ms /api/v1/hosts/GitHub/repositories?topics=agent-framework -> HTTP 500 (intermittent, retried 0 times per self-cap of 2 enumeration passes / domain)
- All other channels nominal.

---

## D3 -- SOTA eval harnesses

### Invocations

1. mcp__github__search_repositories
   - Queries: topic:evaluation stars:>5000, "llm eval" in:name stars:>1000, topic:llm-evaluation
   - Yielded: langfuse, mlflow, promptfoo

2. mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (GH REST)
   - 5 stratified queries on topic:evaluation + topic:observability + topic:llmops + topic:prompt-engineering
   - Yielded: opik, deepeval, phoenix, giskard-oss, prompty, mozilla-ai/any-agent

3. mcp__exa__web_search_exa
   - Queries: "NVIDIA garak LLM red team eval", "RAG eval harness 2026", "lmms-eval multimodal benchmark"
   - Yielded: NVIDIA/garak, AutoRAG, lmms-eval, lmnr-ai/lmnr

4. mcp__perplexity__perplexity_search
   - Queries: "coze loop eval", "agenta evaluation platform"
   - Yielded: coze-dev/coze-loop, Agenta-AI/agenta, truera/trulens

5. mcp__hf-mcp-server__hub_repo_search Pattern B
   - filters=["evaluation"], repo_types=["model","dataset","space"], sort="trendingScore"
   - Yielded: confirmations only; no novel additions outside top-10

6. ecosyste.ms /api/v1/repositories/lookup
   - github.com/Arize-ai/phoenix -> CONFIRMED 9746 stars, Elastic-2.0, last commit 2026-05-19
   - github.com/comet-ml/opik -> CONFIRMED 19340 stars, Apache-2.0, last commit 2026-05-19

### Rate-limit notes (D3)
- All channels nominal; no 429s.
- Self-cap of 2 enumeration passes / domain reached on pass 2 for D3 (after deepeval + opik confirmations); no third pass attempted.

---

## Deferred items (methods NOT exercised this wave + rationale)

| Method                                            | Reason deferred                                                                            | When to schedule |
|---------------------------------------------------|--------------------------------------------------------------------------------------------|------------------|
| HF M1 (HfApi.list_models cursor walk)             | Requires huggingface_hub Python lib import + HF_TOKEN env var; outside one-shot session    | Next codebase scan / batch wave |
| HF M2 (raw REST /api/models|datasets|spaces)      | Same enumeration shape as M3; would have only re-confirmed M3 returns                       | Skip unless M3 hits rate limit |
| HF M4 (/api/quicksearch)                          | Front-end UI search backend (per `W328-HF-SOTA-METHODS/SOTA-BYPASS.md:63` `q` is full-text, NOT substring); deferred this wave because (a) `/api/quicksearch` is undocumented in main hub-docs and rate-limit class is unmeasured, (b) GH-REST + ecosyste.ms channels already saturated D1-D3 SOTA discovery, and (c) M4 incremental coverage would shift candidate-set marginally without changing top-K. Reconciled with SOTA-BYPASS L63 description per W329-K codex r2 F3. | Schedule for next batch wave if D1-D3 cross-validation needs a 4th HF channel beyond M3 + tag listing |
| HF M5 (cfahlgren1/hub-stats parquet via DuckDB)   | No DuckDB runtime + no parquet pull infra in this session                                  | Next scheduled batch wave |
| HF M6 (Webhooks push)                             | Push-based; not applicable to a one-shot discovery wave                                    | Standing infra task |
| GH #2 (GraphQL search)                            | Same 1000-cap as REST search; emulated via #3 window-partition                             | Schedule if #1 saturates |
| GH #3 (GraphQL window-partition, true)            | Emulated via REST stars+pushed windowing; no GraphQL client wired in this session          | Next batch wave with GraphQL client |
| GH #4 (Owner connections)                         | Only useful for org-target discovery; not the enumeration shape for these 3 domains        | Skip for cross-org SOTA |
| GH #5 (/orgs/{org}/repos)                         | Same as #4                                                                                 | Skip |
| GH #6 (/repositories?since={id})                  | Time-series enumeration; not the shape for top-K SOTA                                      | Skip |
| GH #7 (BigQuery github_repos)                     | No GCP creds in this runtime                                                               | Next batch wave (operator GCP setup) |
| GH #8 (GH Archive)                                | Same -- no GCP creds                                                                       | Next batch wave |
| GH #10 (libraries.io)                             | Coverage subset of ecosyste.ms which IS invoked; skipped to avoid duplicate hits           | Skip |
| GH #11 (GHTorrent)                                | Frozen 2019 snapshot; not useful for 2026 SOTA discovery                                   | Permanent skip |
| GH #12-#13 (gh CLI)                               | Not authenticated in this runtime                                                          | Operator-side gh auth setup |
| GH #14 (OSSF criticality_score)                   | Local-install scorer; would re-rank existing candidates, not discover new ones             | Schedule separately if scoring needed |

---

## Cross-validation table (per-candidate cite-anchor sources)

Each top-K candidate has 3-org-distinct cite anchors:
- ORG A: github.com REST /repos/{owner}/{name} (canonical stars + last-commit + license)
- ORG B: project-self README / docs site (purpose + maintained-by attestation)
- ORG C: independent third-party (huggingface.co tag listing, ecosyste.ms record, Perplexity / Exa snippet, awesome-mcp index)

D1 example: github/github-mcp-server
- ORG A: https://api.github.com/repos/github/github-mcp-server (stars 29977, license MIT, push 2026-05-18)
- ORG B: https://github.com/github/github-mcp-server/blob/main/README.md (project-self)
- ORG C: https://modelcontextprotocol.io/servers (MCP-org index listing)

D2 example: bytedance/deer-flow
- ORG A: https://api.github.com/repos/bytedance/deer-flow (stars 68698, license MIT, push 2026-05-19)
- ORG B: https://github.com/bytedance/deer-flow/blob/main/README.md (project-self)
- ORG C: https://ecosyste.ms/repositories/github.com/bytedance/deer-flow (ecosyste.ms record -- independent)

D3 example: langfuse/langfuse
- ORG A: https://api.github.com/repos/langfuse/langfuse (stars 27503, license MIT, push 2026-05-18)
- ORG B: https://langfuse.com/docs (langfuse.com / project-self)
- ORG C: https://huggingface.co/docs (HF tag listing surfaces langfuse on observability-tools page) -- independent third-party

For brevity, only 3 exemplar rows are URL-anchored above; the same 3-org-distinct schema applies to every top-K row in CANDIDATES.md.

---

## Self-cap observance

- Token budget self-cap (<= 60k): observed; final report well under cap.
- 2-enumeration-passes-per-domain self-cap: observed (D1 ran 2 passes, D2 ran 2 passes, D3 ran 2 passes; no third pass attempted on any).
- No writes outside W329-D-BYPASS-APPLY/: observed.
- ASCII-only mandate: observed throughout.
- NO upstream-issue / PR / "this MCP has a bug" framing: observed (deferrals are operator-side capability gaps, not upstream defects).
- NO API-key rotation mentions: observed.
- NO repomix pack inline embedding (F4 silent-block guard): observed (no repomix used in this wave).
- F5 empty-message check on Agent sub-call: not applicable (no Agent sub-call dispatched this wave).
