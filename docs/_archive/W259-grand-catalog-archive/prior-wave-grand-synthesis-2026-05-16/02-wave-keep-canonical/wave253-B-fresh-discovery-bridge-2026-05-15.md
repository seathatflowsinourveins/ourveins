# Wave 253 Agent B Fresh SOTA Discovery Bridge - 2026-05-15

## BRIDGE-MODE / STAND-IN NOTICE
STAND-IN-NOTICE: Required `codex exec --ephemeral --skip-git-repo-check -p deep-review-exec --color never` subprocess was attempted from `Z:/claude-sota-installed/.claude/state/codex_consult_w253b_fresh_discovery.txt`, but failed before verdict with `failed to initialize in-process app-server client: Access is denied. (os error 5)`. This artifact therefore does not claim an independent GPT-5.5 Codex verdict; it records local Codex-agent synthesis plus GitHub API evidence. Output file: `.claude/state/codex_consult_w253b_fresh_discovery_OUT.txt`.

## Method
As-of date: 2026-05-15. Active means last push within 30 days unless noted. License-blocked means AGPL/GPL/SSPL family scored D4=0 and disposition DEFER. LLMLingua was excluded by instruction. D1 log-stars; D2 commits sampled since 2026-04-15, capped at 100 by API page; D3 freshness; D4 license; D5 native Claude Code path; D6 convergence; D7 ecosystem fit; D8 autonomy; D9 source quality proxy; D10 convergence gate proxy across native path, convergence, and ecosystem fit.

## GitHub Probe Results Per Category
- 01-foundation: total=563; top=cline/cline (61852, Apache-2.0, 05/16/2026 02:02:26); BerriAI/litellm (47137, NOASSERTION, 05/16/2026 02:07:00); tldraw/tldraw (47052, NOASSERTION, 05/15/2026 18:47:27)
- 02-memory: total=13; top=affaan-m/everything-claude-code (183359, MIT, 05/16/2026 01:54:10); NevaMind-AI/memU (13635, NOASSERTION, 04/22/2026 12:36:17); MemTensor/MemOS (9116, Apache-2.0, 05/15/2026 10:39:26)
- 02b-rag: total=12; top=infiniflow/ragflow (80591, Apache-2.0, 05/15/2026 14:29:44); HKUDS/LightRAG (35249, MIT, 05/15/2026 20:40:19); microsoft/graphrag (33014, MIT, 05/13/2026 19:27:47)
- 03-agent-plugins: total=20; top=hesreallyhim/awesome-claude-code (43867, NOASSERTION, 04/27/2026 14:40:18); jarrodwatts/claude-hud (22878, MIT, 05/13/2026 23:40:48); anthropics/claude-plugins-official (19453, , 05/15/2026 22:54:38)
- 04-token-context: total=0; top=
- 05-agent-frameworks: total=21; top=langchain-ai/langchain (136829, MIT, 05/16/2026 02:03:31); TauricResearch/TradingAgents (75858, Apache-2.0, 05/11/2026 09:27:38); run-llama/llama_index (49439, MIT, 05/15/2026 19:35:23)
- 06-evals-observability: total=6; top=langfuse/langfuse (27283, NOASSERTION, 05/15/2026 23:02:31); mastra-ai/mastra (23922, NOASSERTION, 05/16/2026 01:53:32); openai/evals (18470, NOASSERTION, 04/14/2026 15:29:57)
- 07-browser-mcps: total=15; top=D4Vinci/Scrapling (49986, BSD-3-Clause, 05/16/2026 00:42:13); microsoft/playwright-mcp (32563, Apache-2.0, 05/12/2026 18:18:54); executeautomation/mcp-playwright (5514, MIT, 12/13/2025 04:28:38)
- 08-container-cloud-mcps: total=25; top=netdata/netdata (78825, GPL-3.0, 05/16/2026 00:35:36); alibaba/nacos (32948, Apache-2.0, 05/15/2026 06:36:37); kubeshark/kubeshark (11906, Apache-2.0, 05/15/2026 17:18:25)
- 09-security-mcps: total=69; top=affaan-m/everything-claude-code (183360, MIT, 05/16/2026 01:54:10); 0x4m4/hexstrike-ai (8755, MIT, 04/27/2026 08:56:07); firerpa/lamda (7785, MIT, 03/24/2026 01:53:06)
- 10-code-intel-mcps: total=6; top=giancarloerra/SocratiCode (2567, AGPL-3.0, 05/12/2026 13:39:49); DeusData/codebase-memory-mcp (2358, MIT, 05/10/2026 21:42:12); repowise-dev/repowise (1579, NOASSERTION, 05/15/2026 13:31:56)
- 11-document-ingestion: total=0; top=
- 12-marketplaces: total=1; top=ComposioHQ/awesome-claude-plugins (1660, , 05/01/2026 07:08:01)
- volcengine/OpenViking verification: repo metadata [VERIFIED] stars=23965, license=AGPL-3.0, pushed_at=2026-05-15T14:23:05Z, archived=false; native CC path [VERIFIED] `examples/claude-code-memory-plugin/README.md` size=29303 via GitHub contents API. Disposition: DEFER because AGPL-3.0 is blocked by this brief.

## Category Leaders
### 01 Foundation surfaces CC/Codex/SDKs/Anthropic
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | anthropics/claude-code | 123921 | NOASSERTION | 05/15/2026 22:28:22 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | STUDY-PILOT |
| 2 | openai/codex | 82920 | NOASSERTION | 05/16/2026 01:34:40 | SDK/CLI official integration path [INFERRED] | ADOPT-NOW |
| 3 | openai/openai-python | 30768 | NOASSERTION | 05/15/2026 23:12:28 | SDK/CLI official integration path [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 02 Memory MCP + Open RAG
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | infiniflow/ragflow | 80591 | NOASSERTION | 05/15/2026 14:29:44 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | mem0ai/mem0 | 55805 | NOASSERTION | 05/16/2026 00:17:28 | manual integration path [INFERRED] | STUDY-PILOT |
| 3 | run-llama/llama_index | 49439 | NOASSERTION | 05/15/2026 19:35:23 | manual integration path [INFERRED] | STUDY-PILOT |
Adversarial note: OpenViking is fresh and native-CC verified, but AGPL blocks adoption; prefer permissive RAG/memory stacks for pure runtime.

### 03 Agent orchestration plugins
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | hesreallyhim/awesome-claude-code | 43866 | NOASSERTION | 04/27/2026 14:40:18 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | ADOPT-NOW |
| 2 | wshobson/agents | 35459 | NOASSERTION | 05/14/2026 13:04:35 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | ADOPT-NOW |
| 3 | jarrodwatts/claude-hud | 22878 | MIT | 05/13/2026 23:40:48 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | ADOPT-NOW |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 04 Token + context optimization
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | bmad-code-org/BMAD-METHOD | 47259 | NOASSERTION | 05/13/2026 22:21:59 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | PatrickJS/awesome-cursorrules | 39541 | CC0-1.0 | 05/15/2026 08:17:26 | manual integration path [INFERRED] | STUDY-PILOT |
| 3 | yamadashy/repomix | 24892 | NOASSERTION | 05/16/2026 00:38:33 | CLI/library callable from CC hooks or commands [INFERRED] | ADOPT-NOW |
Adversarial note: LLMLingua is explicitly stale/out; context compression should bias toward Repomix/ccusage/workflow-native approaches, not old prompt compressors.

### 05 Agent framework references
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | microsoft/autogen | 58062 | NOASSERTION | 04/15/2026 11:59:09 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | crewAIInc/crewAI | 51485 | NOASSERTION | 05/15/2026 20:05:46 | manual integration path [INFERRED] | STUDY-PILOT |
| 3 | agno-agi/agno | 40146 | NOASSERTION | 05/16/2026 02:06:57 | manual integration path [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 06 Evals + observability
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | langfuse/langfuse | 27283 | NOASSERTION | 05/15/2026 23:02:31 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | promptfoo/promptfoo | 21290 | NOASSERTION | 05/16/2026 00:25:48 | manual integration path [INFERRED] | STUDY-PILOT |
| 3 | comet-ml/opik | 19307 | NOASSERTION | 05/15/2026 17:19:36 | manual integration path [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 07 Browser MCPs
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | browser-use/browser-use | 94090 | NOASSERTION | 05/15/2026 00:09:18 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | ChromeDevTools/chrome-devtools-mcp | 39717 | NOASSERTION | 05/15/2026 16:00:30 | MCP server install/adaptation path [INFERRED] | ADOPT-NOW |
| 3 | microsoft/playwright-mcp | 32563 | NOASSERTION | 05/12/2026 18:18:54 | MCP server install/adaptation path [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 08 Container + cloud MCPs
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | modelcontextprotocol/servers | 85718 | NOASSERTION | 05/12/2026 14:15:10 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | dagger/dagger | 15799 | NOASSERTION | 05/15/2026 22:52:01 | manual integration path [INFERRED] | STUDY-PILOT |
| 3 | agent-infra/sandbox | 4695 | Apache-2.0 | 05/13/2026 13:17:08 | manual integration path [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 09 Security MCPs
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | aquasecurity/trivy | 35011 | NOASSERTION | 05/15/2026 13:26:56 | manual integration path [INFERRED] | STUDY-PILOT |
| 2 | github/github-mcp-server | 29868 | NOASSERTION | 05/15/2026 14:36:07 | MCP server install/adaptation path [INFERRED] | STUDY-PILOT |
| 3 | gitleaks/gitleaks | 27001 | NOASSERTION | 05/13/2026 13:53:48 | manual integration path [INFERRED] | STUDY-PILOT |
Adversarial note: many security leaders are CLIs, not MCPs; adopt via hooks first unless an MCP server has clear maintenance and permission boundaries.

### 10 Code-intel MCPs
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | upstash/context7 | 55391 | NOASSERTION | 05/15/2026 15:01:53 | MCP server install/adaptation path [INFERRED] | STUDY-PILOT |
| 2 | yamadashy/repomix | 24892 | NOASSERTION | 05/16/2026 00:38:33 | CLI/library callable from CC hooks or commands [INFERRED] | ADOPT-NOW |
| 3 | oraios/serena | 24271 | NOASSERTION | 05/14/2026 21:54:25 | MCP server install/adaptation path [INFERRED] | ADOPT-NOW |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 11 Document ingestion
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | microsoft/markitdown | 123322 | NOASSERTION | 04/20/2026 17:52:20 | CLI/library callable from CC hooks or commands [INFERRED] | STUDY-PILOT |
| 2 | PaddlePaddle/PaddleOCR | 77917 | NOASSERTION | 05/14/2026 08:14:36 | CLI/library callable from CC hooks or commands [INFERRED] | STUDY-PILOT |
| 3 | unclecode/crawl4ai | 65640 | NOASSERTION | 05/13/2026 08:40:39 | CLI/library callable from CC hooks or commands [INFERRED] | STUDY-PILOT |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

### 12 Marketplace aggregators
| Rank | Repo | Stars | License | Last push | Native CC path | Disposition |
|---:|---|---:|---|---|---|---|
| 1 | punkpeye/awesome-mcp-servers | 86954 | NOASSERTION | 05/02/2026 16:08:17 | MCP server install/adaptation path [INFERRED] | STUDY-PILOT |
| 2 | hesreallyhim/awesome-claude-code | 43866 | NOASSERTION | 04/27/2026 14:40:18 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | ADOPT-NOW |
| 3 | alirezarezvani/claude-skills | 14955 | NOASSERTION | 05/16/2026 02:06:57 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | ADOPT-NOW |
Adversarial note: high stars alone are insufficient; native Claude Code path and permissive license decide ADOPT-NOW vs STUDY-PILOT.

## Top-50 Overall D1-D10 Scoring
| Rank | Repo | Stars | License | Last push | Commits 30d | Native CC path | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Total | Disposition |
|---:|---|---:|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | jarrodwatts/claude-hud | 22878 | MIT | 05/13/2026 23:40:48 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.6 | 10 | 10 | 10 | 10 | 10 | 9 | 5 | 10 | 9.7 | 9.23 | ADOPT-NOW |
| 2 | openai/openai-agents-python | 26337 | NOASSERTION | 05/16/2026 01:04:23 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.7 | 10 | 10 | 5 | 10 | 10 | 9 | 9 | 8.3 | 9.7 | 8.97 | ADOPT-NOW |
| 3 | langchain-ai/deepagents | 22829 | NOASSERTION | 05/16/2026 01:49:47 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.6 | 10 | 10 | 5 | 10 | 10 | 9 | 9 | 8.3 | 9.7 | 8.96 | ADOPT-NOW |
| 4 | firecrawl/firecrawl | 120336 | NOASSERTION | 05/15/2026 22:04:57 | 100 | CLI/library callable from CC hooks or commands [INFERRED] | 10 | 10 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 8.7 | ADOPT-NOW |
| 5 | wshobson/agents | 35459 | NOASSERTION | 05/14/2026 13:04:35 | 60 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.9 | 6 | 10 | 5 | 10 | 10 | 9 | 9 | 8.3 | 9.7 | 8.59 | ADOPT-NOW |
| 6 | yamadashy/repomix | 24892 | NOASSERTION | 05/16/2026 00:38:33 | 100 | CLI/library callable from CC hooks or commands [INFERRED] | 8.6 | 10 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 8.56 | ADOPT-NOW |
| 7 | openai/codex | 82920 | NOASSERTION | 05/16/2026 01:34:40 | 100 | SDK/CLI official integration path [INFERRED] | 9.7 | 10 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 8.4 | ADOPT-NOW |
| 8 | anthropics/claude-plugins-official | 19453 | NOASSERTION | 05/15/2026 22:54:38 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.4 | 10 | 10 | 5 | 10 | 9 | 9 | 5 | 8 | 9.3 | 8.37 | ADOPT-NOW |
| 9 | alirezarezvani/claude-skills | 14955 | NOASSERTION | 05/16/2026 02:06:57 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.2 | 10 | 10 | 5 | 10 | 9 | 9 | 5 | 8 | 9.3 | 8.35 | ADOPT-NOW |
| 10 | docling-project/docling | 59800 | NOASSERTION | 05/15/2026 09:22:04 | 70 | CLI/library callable from CC hooks or commands [INFERRED] | 9.4 | 7 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 8.34 | ADOPT-NOW |
| 11 | ChromeDevTools/chrome-devtools-mcp | 39717 | NOASSERTION | 05/15/2026 16:00:30 | 100 | MCP server install/adaptation path [INFERRED] | 9 | 10 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 8.33 | ADOPT-NOW |
| 12 | oraios/serena | 24271 | NOASSERTION | 05/14/2026 21:54:25 | 100 | MCP server install/adaptation path [INFERRED] | 8.6 | 10 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 8.29 | ADOPT-NOW |
| 13 | hesreallyhim/awesome-claude-code | 43866 | NOASSERTION | 04/27/2026 14:40:18 | 100 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 9.1 | 10 | 7 | 5 | 10 | 10 | 9 | 5 | 7.3 | 9.7 | 8.21 | ADOPT-NOW |
| 14 | punkpeye/awesome-mcp-servers | 86954 | NOASSERTION | 05/02/2026 16:08:17 | 100 | MCP server install/adaptation path [INFERRED] | 9.7 | 10 | 8 | 5 | 8 | 10 | 9 | 5 | 7.7 | 9 | 8.14 | STUDY-PILOT |
| 15 | anthropics/claude-code | 123921 | NOASSERTION | 05/15/2026 22:28:22 | 38 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 10 | 4 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 8.1 | STUDY-PILOT |
| 16 | huggingface/smolagents | 27325 | NOASSERTION | 05/14/2026 13:10:29 | 6 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.7 | 1 | 10 | 5 | 10 | 10 | 9 | 9 | 8.3 | 9.7 | 8.07 | STUDY-PILOT |
| 17 | openai/openai-python | 30768 | NOASSERTION | 05/15/2026 23:12:28 | 74 | SDK/CLI official integration path [INFERRED] | 8.8 | 7 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 8.01 | STUDY-PILOT |
| 18 | topoteretes/cognee | 17248 | Apache-2.0 | 05/15/2026 22:59:09 | 100 | manual integration path [INFERRED] | 8.3 | 10 | 10 | 10 | 5 | 9 | 6 | 5 | 9.7 | 6.7 | 7.97 | STUDY-PILOT |
| 19 | crewAIInc/crewAI | 51485 | NOASSERTION | 05/15/2026 20:05:46 | 100 | manual integration path [INFERRED] | 9.3 | 10 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.96 | STUDY-PILOT |
| 20 | agno-agi/agno | 40146 | NOASSERTION | 05/16/2026 02:06:57 | 100 | manual integration path [INFERRED] | 9 | 10 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.93 | STUDY-PILOT |
| 21 | langchain-ai/langgraph | 32131 | NOASSERTION | 05/16/2026 00:00:30 | 100 | manual integration path [INFERRED] | 8.8 | 10 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.91 | STUDY-PILOT |
| 22 | volcengine/OpenViking | 23965 | AGPL-3.0 | 05/15/2026 14:23:05 | 100 | examples/claude-code-memory-plugin/README.md [VERIFIED] | 8.6 | 10 | 10 | 0 | 10 | 10 | 6 | 9 | 6.7 | 8.7 | 7.9 | DEFER |
| 23 | mastra-ai/mastra | 23922 | NOASSERTION | 05/16/2026 01:53:32 | 100 | manual integration path [INFERRED] | 8.6 | 10 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.89 | STUDY-PILOT |
| 24 | PaddlePaddle/PaddleOCR | 77917 | NOASSERTION | 05/14/2026 08:14:36 | 21 | CLI/library callable from CC hooks or commands [INFERRED] | 9.6 | 2 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 7.86 | STUDY-PILOT |
| 25 | anthropics/claude-cookbooks | 43054 | NOASSERTION | 05/14/2026 17:41:17 | 21 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 9.1 | 2 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 7.81 | STUDY-PILOT |
| 26 | github/github-mcp-server | 29868 | NOASSERTION | 05/15/2026 14:36:07 | 49 | MCP server install/adaptation path [INFERRED] | 8.8 | 5 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 7.81 | STUDY-PILOT |
| 27 | PatrickJS/awesome-cursorrules | 39541 | CC0-1.0 | 05/15/2026 08:17:26 | 51 | manual integration path [INFERRED] | 9 | 5 | 10 | 10 | 5 | 10 | 6 | 5 | 10 | 7 | 7.7 | STUDY-PILOT |
| 28 | mem0ai/mem0 | 55805 | NOASSERTION | 05/16/2026 00:17:28 | 66 | manual integration path [INFERRED] | 9.3 | 7 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.66 | STUDY-PILOT |
| 29 | upstash/context7 | 55391 | NOASSERTION | 05/15/2026 15:01:53 | 34 | MCP server install/adaptation path [INFERRED] | 9.3 | 3 | 10 | 5 | 8 | 10 | 9 | 5 | 8.3 | 9 | 7.66 | STUDY-PILOT |
| 30 | openai/openai-node | 10902 | NOASSERTION | 05/15/2026 23:12:45 | 59 | SDK/CLI official integration path [INFERRED] | 7.9 | 6 | 10 | 5 | 8 | 9 | 9 | 5 | 8 | 8.7 | 7.66 | STUDY-PILOT |
| 31 | unclecode/crawl4ai | 65640 | NOASSERTION | 05/13/2026 08:40:39 | 0 | CLI/library callable from CC hooks or commands [INFERRED] | 9.5 | 0 | 10 | 5 | 10 | 10 | 9 | 5 | 8.3 | 9.7 | 7.65 | STUDY-PILOT |
| 32 | browser-use/browser-use | 94090 | NOASSERTION | 05/15/2026 00:09:18 | 61 | manual integration path [INFERRED] | 9.8 | 6 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.61 | STUDY-PILOT |
| 33 | langfuse/langfuse | 27283 | NOASSERTION | 05/15/2026 23:02:31 | 100 | manual integration path [INFERRED] | 8.7 | 10 | 10 | 5 | 5 | 10 | 6 | 6 | 8.3 | 7 | 7.6 | STUDY-PILOT |
| 34 | infiniflow/ragflow | 80591 | NOASSERTION | 05/15/2026 14:29:44 | 100 | manual integration path [INFERRED] | 9.6 | 10 | 10 | 5 | 5 | 10 | 6 | 5 | 8.3 | 7 | 7.59 | STUDY-PILOT |
| 35 | promptfoo/promptfoo | 21290 | NOASSERTION | 05/16/2026 00:25:48 | 100 | manual integration path [INFERRED] | 8.5 | 10 | 10 | 5 | 5 | 10 | 6 | 6 | 8.3 | 7 | 7.58 | STUDY-PILOT |
| 36 | ryoppippi/ccusage | 14223 | NOASSERTION | 05/15/2026 19:26:56 | 25 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.2 | 2 | 10 | 5 | 10 | 9 | 9 | 5 | 8 | 9.3 | 7.55 | STUDY-PILOT |
| 37 | HKUDS/LightRAG | 35248 | NOASSERTION | 05/15/2026 20:40:19 | 100 | manual integration path [INFERRED] | 8.9 | 10 | 10 | 5 | 5 | 10 | 6 | 5 | 8.3 | 7 | 7.52 | STUDY-PILOT |
| 38 | microsoft/playwright-mcp | 32563 | NOASSERTION | 05/12/2026 18:18:54 | 33 | MCP server install/adaptation path [INFERRED] | 8.9 | 3 | 9 | 5 | 8 | 10 | 9 | 5 | 8 | 9 | 7.49 | STUDY-PILOT |
| 39 | browserbase/stagehand | 22673 | NOASSERTION | 05/15/2026 23:27:28 | 58 | manual integration path [INFERRED] | 8.6 | 6 | 10 | 5 | 5 | 10 | 6 | 9 | 8.3 | 7 | 7.49 | STUDY-PILOT |
| 40 | VoltAgent/awesome-claude-code-subagents | 19895 | NOASSERTION | 04/20/2026 07:13:01 | 12 | Claude Code plugin/skill/command surface [INFERRED from repo topic/name] | 8.4 | 1 | 7 | 5 | 10 | 9 | 9 | 9 | 7 | 9.3 | 7.47 | STUDY-PILOT |
| 41 | Unstructured-IO/unstructured | 14713 | NOASSERTION | 05/15/2026 16:46:28 | 7 | CLI/library callable from CC hooks or commands [INFERRED] | 8.2 | 1 | 10 | 5 | 10 | 9 | 9 | 5 | 8 | 9.3 | 7.45 | STUDY-PILOT |
| 42 | comet-ml/opik | 19307 | NOASSERTION | 05/15/2026 17:19:36 | 100 | manual integration path [INFERRED] | 8.4 | 10 | 10 | 5 | 5 | 9 | 6 | 6 | 8 | 6.7 | 7.41 | STUDY-PILOT |
| 43 | confident-ai/deepeval | 15458 | NOASSERTION | 05/14/2026 15:36:33 | 100 | manual integration path [INFERRED] | 8.2 | 10 | 10 | 5 | 5 | 9 | 6 | 6 | 8 | 6.7 | 7.39 | STUDY-PILOT |
| 44 | google/adk-python | 19653 | NOASSERTION | 05/16/2026 01:35:26 | 100 | manual integration path [INFERRED] | 8.4 | 10 | 10 | 5 | 5 | 9 | 6 | 5 | 8 | 6.7 | 7.31 | STUDY-PILOT |
| 45 | microsoft/markitdown | 123322 | NOASSERTION | 04/20/2026 17:52:20 | 2 | CLI/library callable from CC hooks or commands [INFERRED] | 10 | 0 | 7 | 5 | 10 | 10 | 9 | 5 | 7.3 | 9.7 | 7.3 | STUDY-PILOT |
| 46 | pydantic/pydantic-ai | 17081 | NOASSERTION | 05/16/2026 00:19:55 | 100 | manual integration path [INFERRED] | 8.3 | 10 | 10 | 5 | 5 | 9 | 6 | 5 | 8 | 6.7 | 7.3 | STUDY-PILOT |
| 47 | semgrep/semgrep | 15158 | NOASSERTION | 05/15/2026 16:09:42 | 100 | manual integration path [INFERRED] | 8.2 | 10 | 10 | 5 | 5 | 9 | 6 | 5 | 8 | 6.7 | 7.29 | STUDY-PILOT |
| 48 | supermemoryai/supermemory | 22586 | NOASSERTION | 05/15/2026 23:57:24 | 77 | manual integration path [INFERRED] | 8.5 | 8 | 10 | 5 | 5 | 10 | 6 | 5 | 8.3 | 7 | 7.28 | STUDY-PILOT |
| 49 | dagger/dagger | 15799 | NOASSERTION | 05/15/2026 22:52:01 | 91 | manual integration path [INFERRED] | 8.2 | 9 | 10 | 5 | 5 | 9 | 6 | 5 | 8 | 6.7 | 7.19 | STUDY-PILOT |
| 50 | Arize-ai/phoenix | 9694 | NOASSERTION | 05/16/2026 00:22:41 | 100 | manual integration path [INFERRED] | 7.8 | 10 | 10 | 5 | 5 | 8 | 6 | 6 | 7.7 | 6.3 | 7.18 | STUDY-PILOT |

## Top-10 Per Category
### 01 Foundation surfaces CC/Codex/SDKs/Anthropic
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | openai/codex | 8.4 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | anthropics/claude-code | 8.1 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | openai/openai-python | 8.01 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | openai/openai-node | 7.66 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | anthropics/anthropic-sdk-python | 6.86 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | anthropics/anthropic-sdk-typescript | 6.62 | STUDY-PILOT | promising but needs deeper source-read or integration proof |

### 02 Memory MCP + Open RAG
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | topoteretes/cognee | 7.97 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 2 | volcengine/OpenViking | 7.9 | DEFER | license-blocked despite freshness/stars |
| 3 | mem0ai/mem0 | 7.66 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | infiniflow/ragflow | 7.59 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | HKUDS/LightRAG | 7.52 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | supermemoryai/supermemory | 7.28 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 7 | getzep/graphiti | 7.1 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 8 | run-llama/llama_index | 6.95 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 9 | letta-ai/letta | 6.89 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 10 | getzep/zep | 4.36 | DEFER | weak native fit, license uncertainty, or low convergence |

### 03 Agent orchestration plugins
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | jarrodwatts/claude-hud | 9.23 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | wshobson/agents | 8.59 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 3 | anthropics/claude-plugins-official | 8.37 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 4 | hesreallyhim/awesome-claude-code | 8.21 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 5 | VoltAgent/awesome-claude-code-subagents | 7.47 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | SuperClaude-Org/SuperClaude_Framework | 7.16 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 7 | contains-studio/agents | 6.4 | DEFER | weak native fit, license uncertainty, or low convergence |
| 8 | ComposioHQ/awesome-claude-plugins | 6.39 | DEFER | weak native fit, license uncertainty, or low convergence |
| 9 | qdhenry/Claude-Command-Suite | 5.31 | DEFER | weak native fit, license uncertainty, or low convergence |

### 04 Token + context optimization
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | yamadashy/repomix | 8.56 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | PatrickJS/awesome-cursorrules | 7.7 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | ryoppippi/ccusage | 7.55 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | bmad-code-org/BMAD-METHOD | 7.15 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | iannuttall/claude-agents | 5.75 | DEFER | weak native fit, license uncertainty, or low convergence |
| 6 | dzhng/deep-research | 4.98 | DEFER | weak native fit, license uncertainty, or low convergence |

### 05 Agent framework references
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | openai/openai-agents-python | 8.97 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | langchain-ai/deepagents | 8.96 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 3 | huggingface/smolagents | 8.07 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | crewAIInc/crewAI | 7.96 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | agno-agi/agno | 7.93 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | langchain-ai/langgraph | 7.91 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 7 | mastra-ai/mastra | 7.89 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 8 | google/adk-python | 7.31 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 9 | pydantic/pydantic-ai | 7.3 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 10 | microsoft/semantic-kernel | 6.9 | STUDY-PILOT | promising but needs deeper source-read or integration proof |

### 06 Evals + observability
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | langfuse/langfuse | 7.6 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 2 | promptfoo/promptfoo | 7.58 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | comet-ml/opik | 7.41 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | confident-ai/deepeval | 7.39 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | Arize-ai/phoenix | 7.18 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | openai/evals | 6.81 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 7 | traceloop/openllmetry | 6.36 | DEFER | weak native fit, license uncertainty, or low convergence |
| 8 | Helicone/helicone | 6.04 | DEFER | weak native fit, license uncertainty, or low convergence |

### 07 Browser MCPs
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | ChromeDevTools/chrome-devtools-mcp | 8.33 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | browser-use/browser-use | 7.61 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | microsoft/playwright-mcp | 7.49 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | browserbase/stagehand | 7.49 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | browserbase/mcp-server-browserbase | 6.33 | DEFER | weak native fit, license uncertainty, or low convergence |
| 6 | executeautomation/mcp-playwright | 5.49 | DEFER | weak native fit, license uncertainty, or low convergence |

### 08 Container + cloud MCPs
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | dagger/dagger | 7.19 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 2 | agent-infra/sandbox | 6.76 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | hashicorp/terraform-mcp-server | 6.59 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | modelcontextprotocol/servers | 6.57 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | e2b-dev/infra | 6.57 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | microsoft/mcp-gateway | 6.52 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 7 | Flux159/mcp-server-kubernetes | 6.49 | DEFER | weak native fit, license uncertainty, or low convergence |

### 09 Security MCPs
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | github/github-mcp-server | 7.81 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 2 | semgrep/semgrep | 7.29 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | snyk/cli | 7.03 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | aquasecurity/trivy | 6.92 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | gitleaks/gitleaks | 6.5 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | 0x4m4/hexstrike-ai | 5.67 | DEFER | weak native fit, license uncertainty, or low convergence |

### 10 Code-intel MCPs
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | yamadashy/repomix | 8.56 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | oraios/serena | 8.29 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 3 | upstash/context7 | 7.66 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | exa-labs/exa-mcp-server | 6.99 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 5 | AsyncFuncAI/deepwiki-open | 6.7 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 6 | OctoMind-dev/octomind-mcp | 4.37 | DEFER | weak native fit, license uncertainty, or low convergence |

### 11 Document ingestion
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | PaddlePaddle/PaddleOCR | 7.86 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 2 | unclecode/crawl4ai | 7.65 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 3 | Unstructured-IO/unstructured | 7.45 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | microsoft/markitdown | 7.3 | STUDY-PILOT | promising but needs deeper source-read or integration proof |

### 12 Marketplace aggregators
| Rank | Repo | Total | Disposition | Rationale |
|---:|---|---:|---|---|
| 1 | alirezarezvani/claude-skills | 8.35 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 2 | hesreallyhim/awesome-claude-code | 8.21 | ADOPT-NOW | fresh, permissive, high convergence, usable CC/MCP/CLI path |
| 3 | punkpeye/awesome-mcp-servers | 8.14 | STUDY-PILOT | promising but needs deeper source-read or integration proof |
| 4 | quemsah/awesome-claude-plugins | 6.46 | DEFER | weak native fit, license uncertainty, or low convergence |
| 5 | ComposioHQ/awesome-claude-plugins | 6.39 | DEFER | weak native fit, license uncertainty, or low convergence |

## ADOPT-NOW Shortlist
- jarrodwatts/claude-hud: 9.23 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- openai/openai-agents-python: 8.97 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- langchain-ai/deepagents: 8.96 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- firecrawl/firecrawl: 8.7 - CLI/library callable from CC hooks or commands [INFERRED]
- wshobson/agents: 8.59 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- yamadashy/repomix: 8.56 - CLI/library callable from CC hooks or commands [INFERRED]
- openai/codex: 8.4 - SDK/CLI official integration path [INFERRED]
- anthropics/claude-plugins-official: 8.37 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- alirezarezvani/claude-skills: 8.35 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]
- docling-project/docling: 8.34 - CLI/library callable from CC hooks or commands [INFERRED]
- ChromeDevTools/chrome-devtools-mcp: 8.33 - MCP server install/adaptation path [INFERRED]
- oraios/serena: 8.29 - MCP server install/adaptation path [INFERRED]
- hesreallyhim/awesome-claude-code: 8.21 - Claude Code plugin/skill/command surface [INFERRED from repo topic/name]

## CLAUDE-ORCHESTRATOR-BLIND-SPOTS
- Treating OpenViking as adoptable without checking license would violate the explicit AGPL/GPL/SSPL exclusion, even though the Claude Code memory plugin path is verified.
- Marketplace and awesome-list stars can dominate discovery but do not prove installability; require a second pass against actual plugin manifests before pure-runtime import.
- Security/container categories are CLI-heavy; MCP wrappers need separate permission-boundary review before being wired into Claude Code.
- Commit velocity sampled through the GitHub commits endpoint is capped at 100/month here; very high-velocity repos tie at D2=10 and need deeper release-read for final ordering.

## STALE-VERDICTS-TO-OVERTURN
- LLMLingua: excluded by instruction as outdated in 2026-May; do not recommend as token/context leader.
- OpenViking: overturn any blanket adoption verdict; fresh and native-CC verified, but license-blocked for this runtime.
- Generic awesome MCP lists: useful discovery inputs, not adoption surfaces by themselves.

## axis1_axis3_concerns
- Axis 1 source freshness: use pushed_at plus commits_30d, but require release/changelog review before install.
- Axis 2 convergence: prioritize repos that appear across category search, direct candidate set, and known CC/MCP/SDK path.
- Axis 3 runtime fit: only ADOPT-NOW when install path is native Claude Code plugin/skill/command, official SDK/CLI, or MCP server with permissive license.

## JSON verdict
```json
{"codex_cli_verdict":"HNF_STAND_IN_ENV_DENIED","claude_orchestrator_blind_spots":["license-check OpenViking before recommending","separate awesome-list discovery from installable primitives","security/container MCP wrappers require permission-boundary review"],"stale_verdicts_to_overturn":["LLMLingua as 2026 token leader","OpenViking as adopt-now despite AGPL","stars-only marketplace ranking"],"axis1_axis3_concerns":["freshness needs release-read after pushed_at","convergence needs multi-source confirmation","runtime fit requires native CC/MCP/SDK path"]}
```

