# BRIDGE-MODE CR-12 SOTA Memory Backend Audit - 2026-05-13

BRIDGE-MODE: codex-rescue Sonnet wrapper invoking real GPT-5.5 via codex CLI subprocess; cross-model gate satisfied

Scope: audit six memory backend candidates for `claude-sota-installed` against the incumbent stack. No runtime config was modified.

Incumbent baseline:
- L1 capture: `doobidoo/mcp-memory-service` installed as `.mcp.json` `memory` stdio server at `.mcp.json:51`, with `MCP_MEMORY_STORAGE_BACKEND=sqlite_vec` at `.mcp.json:56` and `MCP_MEMORY_SQLITE_PATH=Z:/claude-sota-installed-state/.mcp-memory/memory.db` at `.mcp.json:57`.
- L2 vector: embedded sqlite_vec. Current DB file probe: `Z:/claude-sota-installed-state/.mcp-memory/memory.db` = 2,375,680 bytes, modified 2026-05-13 16:51:33; `memories` table count = 68. sqlite_vec extension table count could not be opened by stock Python sqlite (`no such module: vec0`), so vector-row count is UNKNOWN.
- L3 temporal-KG: `.mcp.json` `graphiti` stdio server at `.mcp.json:60`, FalkorDB URI at `.mcp.json:83`, OpenAI-compatible proxy URL at `.mcp.json:87-88`.
- Runtime shape: `.claude/settings.json:70` uses `defaultMode=bypassPermissions`, `.claude/settings.json:72` has no disabled MCP servers, `.claude/settings.json:652` has `autoMemoryEnabled=true`. This runtime is already autonomous-loop compatible and MCP/CLI-shaped.

## Summary Verdict Table

| Candidate | Count OVER check | Probe 2 surface | Probe 3 API shape | Probe 4 namespace | Probe 5 mode harness | Probe 6 blockers | Probe 7 demand gate | CR-12 class | Convergence A1/A2/A3 | Final disposition |
|---|---:|---|---|---|---|---|---|---|---|---|
| mem0ai/mem0 | GitHub search: 55k stars, 6.2k forks; local HEAD `54a03cc7217c`, 2026-05-09; PyPI `mem0ai` latest 2.0.2 | SDK + server + CLI; eee uses MCP stdio/CLI, not app SDK | OpenAI defaults, provider-extensible | Duplicates L1/L2 memory capture | Autonomous possible, but adoption requires new storage/provider choices | PASS Apache-2.0 (`Z:/repos/deps/mem0/LICENSE:3`, pyproject `license` at line 13); sqlite_vec absent from vector extras | 7.a demand absent now; 7.b study only if named mem0 workflow appears | PARTIAL-OVERLAP | PASS / PARTIAL / PASS | REJECT-DUPLICATE now; STUDY-PILOT only under scale/workflow trigger |
| letta-ai/letta | GitHub search: 22.5k stars, 2.4k forks; local shallow HEAD `bb52a8900a79`, 2026-04-07; PyPI `letta` latest 0.6.7 | Full agent framework + CLI/API | Model-agnostic; recommends Opus/GPT per README | Competes with Claude Code-as-agent model | Interactive agent launch and service/API deployment shape | PASS Apache license (`Z:/repos/deps/letta/LICENSE:1`, pyproject line 8) | 7.a demand absent; no request to replace orchestrator with Letta agents | PARTIAL-OVERLAP | PASS / PARTIAL / PASS | REJECT-DUPLICATE for runtime; cite/pilot only for stateful-agent patterns |
| topoteretes/cognee | GitHub search: 17.1k stars, 1.8k forks; local shallow HEAD `b0f513b43df8`, 2026-05-08; PyPI `cognee` latest 1.0.9 | SDK + CLI + Claude Code plugin | Provider-neutral graph/RAG with multiple vector/db options | Directly overlaps graphiti L3 plus mcp-memory L1 | Plugin hooks are autonomous-compatible, but add a second memory lifecycle | PASS Apache-2.0 (`Z:/repos/deps/cognee/LICENSE:1`, pyproject line 12) | 7.a demand absent; graph-RAG need already covered by graphiti | DUPLICATE-FUNCTIONALITY | PASS / PARTIAL / PASS | REJECT-DUPLICATE |
| openviking-rag / volcengine OpenViking | GitHub search: 23.6k-23.8k stars, 1.8k forks; local shallow HEAD `b84f79820793`, 2026-05-09; PyPI `openviking` latest 0.3.16 | Server + CLI + plugin examples | OpenAI/OpenAI-compatible/Codex OAuth/vendor choices | Context DB overlaps L2/L3 memory surfaces | HARD-GATE: interactive `openviking-server init`, OAuth/import flow, server daemon | BLOCKER: AGPL-3.0 (`Z:/repos/deps/openviking/pyproject.toml:20`, `LICENSE:10`, README license lines 761-767) | skipped deeper demand: structural license blocker | PARTIAL-OVERLAP but blocked | PASS / UNKNOWN / PASS | REJECT-BLOCKER |
| campfirein/cipher / ByteRover CLI | GitHub org search: `byterover-cli` 4.7k stars, 448 forks; local HEAD `31bd34c367be`, 2026-05-09; package name `byterover-cli` v3.11.0 locally | CLI + MCP + cloud sync | Provider-neutral, Anthropic/OpenAI/OpenAI-compatible | Duplicates context-mode + mcp-memory + graphiti memory capture | HARD-GATE: interactive REPL and cloud/team-sync workflow | BLOCKER: Elastic License 2.0 (`Z:/repos/deps/cipher/LICENSE:1`, package line 150) | 7.a demand absent; 7.b would create new team-memory workflow | PARTIAL-OVERLAP | PARTIAL / UNKNOWN / PASS-low | REJECT-BLOCKER |
| openai-memory / OpenAI Memories API | Official OpenAI OpenAPI list has no `/memories` endpoint; docs search found cookbook memory patterns, not a Memories API | Closed-source hosted API/SDK pattern if it exists; no repo clone | OpenAI-only | Provider-complement only, but not portable | Potentially autonomous if exposed as API; no verified endpoint | BLOCKER: no public source/registry and no official API endpoint in OpenAPI path list | 7.a demand absent; no local portability | PROVIDER-COMPLEMENT but phantom/closed | UNKNOWN / UNKNOWN / UNKNOWN | REJECT-BLOCKER |

## Per-Candidate Probe Notes

### 1. mem0ai/mem0

- Probe 1 count-OVER: GitHub search result reports `55k stars` and `6.2k forks`; local clone exists at `Z:/repos/deps/mem0`, HEAD `54a03cc7217c`, last commit 2026-05-09. PyPI probe: `mem0ai (2.0.2)`, installed runtime has `1.0.3`.
- Probe 2 SDK-vs-CLI: README exposes library/server/cloud plus CLI (`Z:/repos/deps/mem0/README.md:91`, `:123-148`). Current eee memory is MCP stdio (`.mcp.json:51-57`), not a mem0 SDK integration.
- Probe 3 architectural-API: README states OpenAI defaults for LLM and embeddings (`README.md:173-175`) but supports other providers. API shape is OpenAI-default, vendor-extensible.
- Probe 4 plugin-namespace: mem0 memory capture would duplicate L1/L2 `memory` and L3 `graphiti`; no mem0 plugin is enabled in `.claude/settings.json:544-572`.
- Probe 5 mode-harness-shape: autonomous-compatible as a library/CLI, but adopting it creates new provider and vector-store policy work.
- Probe 6 blockers: license PASS: Apache-2.0 in `pyproject.toml:13` and `LICENSE:3`. Registry PASS: PyPI latest 2.0.2. Vector-store fit concern: pyproject `vector_stores` starts at `pyproject.toml:30` and includes Chroma/Milvus lines `:32`, `:52`; sqlite_vec is not listed.
- Probe 7 demand gate: 7.a DEMAND-ABSENCE at current scale; 7.b STUDY-PILOT only if a named workflow requires mem0-specific extraction/evaluation.
- CR-12 class: PARTIAL-OVERLAP.
- Axis: A1 PASS (`>=3` sources: GitHub, PyPI, local repo/docs); A2 PARTIAL (project authors/paper, limited independent practitioner evidence in this probe); A3 PASS (repo older than 3 months by prior corpus and current active local clone).
- Final: REJECT-DUPLICATE now; keep as cite/study-pilot pattern source.

### 2. letta-ai/letta

- Probe 1 count-OVER: GitHub search reports `22.5k stars`, `2.4k forks`, 176 releases and latest v0.16.7 on 2026-03-31; local clone HEAD `bb52a8900a79`, last 2026-04-07. PyPI probe: `letta (0.6.7)`.
- Probe 2 SDK-vs-CLI: README says install Letta Code CLI via `npm install -g @letta-ai/letta-code` and run `letta` (`README.md:8-13`); API usage starts at `README.md:24`. eee does not route memory through a Letta server/API.
- Probe 3 architectural-API: README says Letta is model-agnostic and recommends Opus/GPT models (`README.md:17`).
- Probe 4 plugin-namespace: replaces/competes with the agent orchestration layer, not just memory. Current plugins include `context-mode` and `intelligent-compact`, not Letta (`.claude/settings.json:552`, `:572`).
- Probe 5 mode-harness-shape: launches an agent with memory locally (`README.md:13-15`) and includes server extras (`pyproject.toml:105`), which is a full service/agent harness rather than an install-only memory backend.
- Probe 6 blockers: license PASS: Apache license in `LICENSE:1` and pyproject `license` line 8. Registry PASS: PyPI latest 0.6.7; npm install path documented.
- Probe 7 demand gate: 7.a DEMAND-ABSENCE. No named requirement to replace Claude Code/codex orchestration with a Letta stateful-agent runtime.
- CR-12 class: PARTIAL-OVERLAP.
- Axis: A1 PASS; A2 PARTIAL; A3 PASS.
- Final: REJECT-DUPLICATE for incumbent runtime. Use only as cite-class pattern source for stateful-agent memory.

### 3. topoteretes/cognee

- Probe 1 count-OVER: GitHub search reports `17.1k stars`, `1.8k forks`; local clone HEAD `b0f513b43df8`, last 2026-05-08. PyPI probe: `cognee (1.0.9)`.
- Probe 2 SDK-vs-CLI: README shows Python `remember/search`, `cognee-cli`, and Claude Code plugin flows (`README.md:136-179`).
- Probe 3 architectural-API: graph/RAG memory control plane; pyproject shows pgvector (`pyproject.toml:100`, `:105`) and llama-cpp server extra (`:123`). Provider-neutral, not OpenAI-only.
- Probe 4 plugin-namespace: README states Claude Code plugin captures tool calls and syncs to permanent KG (`README.md:179`) and hooks SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd (`README.md:204`). That directly overlaps current mcp-memory + graphiti.
- Probe 5 mode-harness-shape: autonomous-compatible hook shape, but it creates a parallel lifecycle to incumbent memory and graphiti.
- Probe 6 blockers: license PASS: Apache-2.0 at `pyproject.toml:12` and `LICENSE:1`. Registry PASS: PyPI latest 1.0.9.
- Probe 7 demand gate: 7.a DEMAND-ABSENCE. Incumbent already has L3 temporal KG (`.mcp.json:60`, `:83`, `:87-88`).
- CR-12 class: DUPLICATE-FUNCTIONALITY.
- Axis: A1 PASS; A2 PARTIAL; A3 PASS.
- Final: REJECT-DUPLICATE.

### 4. openviking-rag / volcengine OpenViking

- Probe 1 count-OVER: GitHub org/search reports `23,630` to `23.8k` stars and about `1.8k` forks; local clone HEAD `b84f79820793`, last 2026-05-09. PyPI probe: `openviking (0.3.16)`.
- Probe 2 SDK-vs-CLI: README exposes CLI/server commands: `openviking-server init`, `doctor`, daemon server, and CLI client (`README.md:181-183`, `:551-563`).
- Probe 3 architectural-API: README supports OpenAI, OpenAI Codex OAuth, OpenAI-compatible, Ollama, Kimi, GLM, Volcengine, etc. (`README.md:106-109`, `:145-160`, `:176-201`, `:274-289`).
- Probe 4 plugin-namespace: README links OpenCode and Claude Code memory plugin examples (`README.md:631-633`), overlapping memory/context surfaces.
- Probe 5 mode-harness-shape: HARD-GATE. Init is interactive (`README.md:274-277`, `:301-305`) and can import/start Codex auth flow (`README.md:305`); server daemon shape at `README.md:551-560`.
- Probe 6 blockers: REJECT. Main project AGPL-3.0 in `pyproject.toml:20`, `LICENSE:10`, README badge `README.md:19`, and license section `README.md:761-767`. Prior W164 blocker remains valid for embedding/network-service use.
- Probe 7 demand gate: skipped after Probe 6 blocker; even without license, current scale has no need for a context DB replacement.
- CR-12 class: PARTIAL-OVERLAP, blocked.
- Axis: A1 PASS; A2 UNKNOWN; A3 PASS (over 3 months is plausible from prior W168 corpus; current probe did not independently verify creation date).
- Final: REJECT-BLOCKER.

### 5. campfirein/cipher / ByteRover CLI

- Probe 1 count-OVER: GitHub org search reports `byterover-cli` at `4.7k stars`, `448 forks`, updated 2026-05-09; local clone `cipher` HEAD `31bd34c367be`, 2,864 commits. Local package name/version: `byterover-cli` v3.11.0 at `package.json:2`, `:15`.
- Probe 2 SDK-vs-CLI: README is CLI/MCP: interactive REPL at `README.md:8`, `:25`, CLI usage at `:126-133`, MCP server at `:208`.
- Probe 3 architectural-API: provider-neutral; README lists Anthropic, OpenAI, OpenAI-compatible and more (`README.md:37`, `:223-245`).
- Probe 4 plugin-namespace: overlaps with current context/memory capture. README advertises persistent structured memory and works with Claude Code/Codex (`README.md:23`, `:41-43`).
- Probe 5 mode-harness-shape: HARD-GATE for eee default flow: interactive REPL (`README.md:25`, `:133`) and cloud/team sync (`README.md:23`) create a new workflow rather than a drop-in backend.
- Probe 6 blockers: REJECT for ELv2/source-available license, not Apache/MIT/BSD: `LICENSE:1`, `package.json:150`, README badge `README.md:12`, license section `README.md:304-306`. PyPI probe for `byterover-cli` returned no matching distribution; npm registry probing failed due npm cache EPERM, but docs/search confirm npm install path for ByteRover.
- Probe 7 demand gate: 7.a DEMAND-ABSENCE; 7.b would create new cloud/team-memory workflow.
- CR-12 class: PARTIAL-OVERLAP.
- Axis: A1 PARTIAL; A2 UNKNOWN; A3 PASS-low/UNKNOWN (active repo, but maturity beyond 3 months depends on old `cipher` vs renamed `byterover-cli` lineage).
- Final: REJECT-BLOCKER.

### 6. openai-memory / OpenAI Memories API

- Probe 1 count-OVER: no public `openai/openai-memory` repo verified; GitHub API via PowerShell failed due TLS in this environment. OpenAI docs MCP OpenAPI endpoint list returned 162 paths and no `/memories` path.
- Probe 2 SDK-vs-CLI: no installable local backend or CLI surfaced. Official OpenAI docs search returned cookbook memory patterns, not a Memories API.
- Probe 3 architectural-API: OpenAI-only if implemented; not vendor-neutral and not local-first.
- Probe 4 plugin-namespace: would be a provider complement at most, but it would not replace MCP memory or graphiti.
- Probe 5 mode-harness-shape: UNKNOWN. API could be autonomous, but no endpoint contract is verified.
- Probe 6 blockers: REJECT. Closed-source/phantom for this audit: no source license file, no public registry, and no endpoint in official OpenAI OpenAPI path list. Official docs do expose `/vector_stores` and `/responses/compact`, but not a Memories API.
- Probe 7 demand gate: 7.a DEMAND-ABSENCE; OpenAI-hosted memory would reduce portability relative to local sqlite_vec + FalkorDB.
- CR-12 class: PROVIDER-COMPLEMENT if future endpoint exists; current state is blocked/UNKNOWN.
- Axis: A1 UNKNOWN; A2 UNKNOWN; A3 UNKNOWN.
- Final: REJECT-BLOCKER.

## Recommendation Matrix

| Recommendation class | Candidates | Rationale |
|---|---|---|
| REPLACE-INCUMBENT | None | No candidate clears the high bar over installed mcp-memory + sqlite_vec + graphiti at current small scale. |
| SUPPLEMENT-INCUMBENT / PROVIDER-COMPLEMENT | None now | OpenAI memory would be provider-complement in theory, but no official Memories API endpoint was verified. mem0/letta patterns can remain cite-class only. |
| REJECT-DUPLICATE | mem0, letta, cognee | All overlap current L1/L2/L3 or orchestration model; no named workflow demand justifies the added state plane. |
| REJECT-BLOCKER | OpenViking, Cipher/ByteRover, openai-memory | OpenViking AGPL-3.0; Cipher ELv2/source-available plus interactive/cloud workflow; openai-memory phantom/closed-source/no endpoint. |

## L2 Vector Re-Evaluation

No candidate improves on sqlite_vec for the current installed scale. Current DB is only 2.38 MB with 68 `memories` rows; even the user's prior 22-memory/0.11 MB framing points in the same direction. mem0 brings alternate vector stores but not sqlite_vec; cognee brings pgvector/graph-RAG; OpenViking brings a context database but is AGPL-blocked; Cipher uses external/in-memory/vector store concepts but is ELv2-blocked; OpenAI vector stores are hosted-provider storage, not a local sqlite_vec replacement. Clear path to >=100k scale already exists inside incumbent mcp-memory via Milvus backend (`mcp-memory-service README.md:364-366`, release history `:501-533`) without replacing L1 API or L3 graphiti. Trigger for re-evaluation: `memory.db >= 1 GB`, `>=100k memories`, p95 memory search `>=100ms`, multi-process write contention, or a named workflow that incumbents cannot serve.

## Mia Verification Log

| Claim | Probe | Result |
|---|---|---|
| Incumbent `memory` MCP uses sqlite_vec and memory.db | Local rg on `.mcp.json` | VERIFIED `.mcp.json:51`, `:56-57` |
| Incumbent `graphiti` MCP uses FalkorDB and OpenAI-compatible proxy | Local rg on `.mcp.json` | VERIFIED `.mcp.json:60`, `:83`, `:87-88` |
| Runtime is autonomous/no disabled MCPs | Local rg on settings | VERIFIED `.claude/settings.json:70`, `:72`, `:652` |
| mem0 license/version/vector stores | Local repo grep + PyPI | VERIFIED `mem0/pyproject.toml:7`, `:13`, `:30-52`; PyPI latest 2.0.2 |
| mem0 GitHub count | Web search GitHub result | VERIFIED approx `55k` stars, `6.2k` forks |
| letta license/surface | Local repo grep + PyPI | VERIFIED `letta/LICENSE:1`, `pyproject.toml:8`, README `:8-17`; PyPI latest 0.6.7 |
| letta GitHub count | Web search GitHub result | VERIFIED approx `22.5k` stars, `2.4k` forks |
| cognee license/plugin overlap | Local repo grep + PyPI | VERIFIED `cognee/pyproject.toml:12`, `LICENSE:1`, README `:177-204`; PyPI latest 1.0.9 |
| cognee GitHub count | Web search GitHub result | VERIFIED approx `17.1k` stars, `1.8k` forks |
| OpenViking AGPL blocker | Local repo grep | VERIFIED `openviking/pyproject.toml:20`, `LICENSE:10`, README `:761-767` |
| OpenViking count/version | Web search + PyPI | VERIFIED approx `23.6k-23.8k` stars, `1.8k` forks; PyPI latest 0.3.16 |
| Cipher/ByteRover ELv2 blocker | Local repo grep | VERIFIED `cipher/LICENSE:1`, `package.json:150`, README `:304-306` |
| Cipher/ByteRover count | Web search GitHub org result | VERIFIED approx `4.7k` stars, `448` forks for `byterover-cli` |
| OpenAI Memories API endpoint | OpenAI docs MCP `list_api_endpoints` | VERIFIED no `/memories` path in 162 official OpenAPI paths; `/vector_stores` exists |
| OpenAI official docs memory guidance | OpenAI docs MCP search | VERIFIED cookbook memory/session/context-personalization patterns found, no Memories API doc found |
| L2 current scale | Filesystem + Python sqlite probe | VERIFIED DB 2,375,680 bytes; `memories=68`; sqlite_vec row count UNKNOWN due missing vec0 module |

## Verdict

APPROVE-AUDIT-COMPLETE
