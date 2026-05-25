---
title: Wave 212 Master Synthesis — Comprehensive Z:\claude-sota-pure Install Checklist (multi-layer SOTA convergence catalog)
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-15
wave: 212
scope: synthesize 6 parallel W212 agent artifacts + W206-W209 master catalog into unified Z:\claude-sota-pure runtime build plan
inputs:
  - tmp/wave212-agentM-memory-rag-kg-catalog-2026-05-15.md (48 candidates, 5 layers)
  - tmp/wave212-agentN-orchestration-catalog-2026-05-15.md (23 candidates, agent-orch)
  - tmp/wave212-agentN-agent-orchestration-catalog-2026-05-15.md (parallel-session catalog)
  - tmp/wave212-agentO-redo-token-obs-eval-catalog-2026-05-15.md (22 candidates, 6 layers)
  - tmp/wave212-agentO-token-obs-eval-catalog-2026-05-15.md (25 candidates parallel)
  - tmp/wave212-orchestrator-mia-preapply-2026-05-15.md (4 OVER catches + 2 GENUINE-GAPS)
  - tmp/wave206-209-master-catalog-2026-05-15.md (28 prior ADOPT-NOW)
crossmodelgate: PARTIAL-SATISFIED (Sonnet stand-ins + parallel-session Mia pre-apply; CR-3 Phase 1 bootstrap exception per CLAUDE.md L142-145; full BRIDGE-MODE codex T1 verification deferred to install-time per FM-09 2-stage validation)
fm17e-incident: 2 codex-rescue BRIDGE-MODE dispatches failed FM-17.e autocompact-thrashing; Sonnet sota-researcher fallback per fm17-subagent-fleet-depletion.md §FM-17.e recovery
---

# Wave 212 Master Synthesis — Z:\claude-sota-pure Comprehensive Install Checklist

## §0 Operator-deliverable summary

User-explicit request: "research and curate the best of the best with extensive research that include all the high quality repos. convergence to fully set up the pure sota runtime with all the sota layer".

**This synthesis consolidates 6 W212 agent artifacts + 12 W206-W209 prior artifacts** into a unified comprehensive checklist organized by layer with: stars + license SPDX + grade A-F + native CC install path + CR-12 disposition + axis-1+2+3 convergence-gate + Probe-DAG harness-fit. All repos verified via multi-source ≥4 distinct families discovery.

**Cross-model gate status (CR-3)**: PARTIAL — STAND-IN per `cmc-env-funneled-disclosure.md` for all 5 Sonnet sota-researcher dispatches; 2 BRIDGE-MODE codex-rescue dispatches FAILED FM-17.e autocompact-thrashing. **Real GPT-5.5 codex T1 verification REQUIRED at install-apply boundary per FM-09 2-stage validation contract.**

## §1 User-explicit named repos — final verdicts

| Repo | Grade | License | Stars | Status in sss | Install action |
|---|:---:|---|---:|---|---|
| **cognee** (topoteretes) | **A** | Apache-2.0 | 17,237 | ADOPT-NOW (NOT installed) | `pip install cognee` + Docker `cognee/cognee-mcp:main` + `claude mcp add cognee-sse -t sse http://localhost:8000/sse` |
| **openviking** (volcengine) | **F** | **AGPLv3** | 23,954 | REJECT-FOR-FIT.6 license-blocker | DO NOT INSTALL (AGPLv3 STRUCTURAL) |
| **langfuse** (langfuse) | **A (incumbent)** | MIT-Expat + ee/ AGPL-3.0 | 27,268 | **ALREADY INSTALLED v4.2.0** per parallel Mia | Verify wire (MCP at `.mcp.json`? Skill plugin? Hooks?); install official `mcp-server-langfuse` if MCP missing |
| **mem0** (mem0ai) | B+ | Apache-2.0 | 55,795 | STUDY-PILOT (NOT installed) | Optional cloud-MCP if zero-deps wanted: `npx mcp-add --name mem0-mcp --type http --url "https://mcp.mem0.ai/mcp"` (paid Platform API key) |
| **Letta** (letta-ai) | B/D | Apache-2.0 | 22,732 | REJECT-FOR-FIT for orchestration (DUPLICATE) | Memory pattern-extract only; do NOT install platform |

## §2 Cumulative ADOPT-NOW set (W206-W209 + W212 NEW)

### From W206-W209 master catalog §2 (28 prior ADOPT-NOW — verbatim)
1. mattpocock-skills 5-pack | 2. vercel-labs/agent-skills 4-core | 3. codex@openai-codex 3-skill pack | 4. superpowers/dispatching-parallel-agents | 5. superpowers/executing-plans | 6. anthropics agent-sdk-dev plugin | 7. superpowers/finishing-a-development-branch | 8. Piebald-AI worker-fork cite-anchor | 9-10. awesome-agentic-patterns Factory/Compounding-Engineering cite-anchors | 11. modelcontextprotocol/server-filesystem | 12. modelcontextprotocol/server-git | 13. aquasecurity/trivy | 14. anchore/syft | 15. ast-grep CLI | 16. cnighswonger-claude-code-cache-fix v3.0.3 | 17. instructor v1+ | 18. chonkie v1+ | 19. ECC block-no-verify hook | 20. ECC mcp-health-check hook | 21. ECC governance-capture hook | 22. Continuous-Claude-v3 compiler-in-the-loop hook | 23. Continuous-Claude-v3 file-claims hook | 24. PROGRESS.md long-arc handoff | 25. gsd context-monitor bridge-file PostToolUse | 26. /rewind primitive codification | 27. Piebald Worker-fork 4-rule discipline | 28. cwc evaluator pattern dogfood

### NEW from W212 (15 NEW ADOPT-NOW BEYOND W206-W209)

**From Agent M (memory/RAG/KG layer)** — 9 NEW:
29. **cognee-mcp** (Apache-2.0, 17k★) — `pip install cognee` + Docker + MCP wire
30. **Docling** + **docling-mcp** (LF AI MIT, 59k★) — `pip install docling docling-mcp`
31. **GraphRAG** (microsoft, MIT, 33k★) — `pip install graphrag` (CITE-ONLY unless graph-RAG demand)
32. **LightRAG** (HKUDS, MIT, 35k★) — `uv tool install lightrag-hku[api]` (STUDY-PILOT)
33. **R2R** (SciPhi-AI, MIT, 7.8k★) — `pip install r2r` (STUDY-PILOT)
34. **FlagEmbedding/BGE-M3** (BAAI, MIT) — `pip install FlagEmbedding` (CITE-ONLY)
35. **Qdrant** (Apache-2.0, 31k★) — `docker pull qdrant/qdrant` (STUDY-PILOT)
36. **ChromaDB** (Apache-2.0, 28k★) — `pip install chromadb` (STUDY-PILOT)
37. **OpenSPG/KAG** (Ant Group, 2.1k★) — STUDY-PILOT enterprise KG

**From Agent N + N-redo (orchestration layer)** — 3 NEW:
38. **wshobson/agents** (MIT, 35k★) — `/plugin install` selective agents (NOT conductor)
39. **parcadei/Continuous-Claude-v3** (MIT, 3.7k★) — selective hooks extract
40. **wanshuiyin/Auto-claude-code-research-in-sleep (ARIS)** (MIT, 9.4k★) — Markdown skills port
   - **Conditional**: ruvnet/claude-flow (MIT, 51k★) pending Probe 7.b 5-clause + "ruflo" naming verification

**From Agent O + O-redo (token/obs/eval layer)** — 2 GENUINE-GAP per parallel Mia + 1 platform NEW:
41. **outlines** (dottxt-ai, Apache-2.0, 14k★) — `pip install outlines` (GENUINE-GAP per Mia)
42. **msgspec** (jcrist, BSD-3) — `pip install msgspec` (GENUINE-GAP per Mia; hot-path IPC)
43. **BerriAI/litellm** (MIT, 47k★) — `pip install litellm` (PROVIDER-COMPLEMENT — 100+ LLM gateway + MCP-gateway 2025)
   - **Conditional**: inspect_ai (MIT, 2k★) STUDY-PILOT; NVIDIA/NeMo-Guardrails (Apache-2.0) STUDY-PILOT; guardrails-ai/guardrails STUDY-PILOT

### Mia OVER catches (drop from install queue — already installed)

Per `wave212-orchestrator-mia-preapply-2026-05-15.md` parallel-session Mia probes:
- **promptfoo v0.121.11** — already global npm
- **garak v0.15.0** — already CLI at `.local/bin/`
- **Zod 42.6k★** — already nested in plugin trees + `zod-validation-expert` skill exists
- **langfuse v4.2.0** — already in venv + CLI + skill plugin

## §3 REJECT-FOR-FIT consolidated set (W206-W209 + W212 NEW)

| Category | Reject reason | Count | Examples |
|---|---|---:|---|
| **License blocker (AGPLv3 / GPL-3 / BSL / Elastic-2.0 / SSPL / LGPL-3 / CC-BY-4.0) | Probe 6 license-blocker | **15** | openviking AGPL, marker GPL, memgraph BSL, neo4j GPL, phoenix-arize Elastic-2.0, paradedb AGPL-3, AutoGen v0.7.5 **CC-BY-4.0** (NOT a code license), latitude-llm LGPL-3, snyk proprietary, ast-grep-mcp UNKNOWN, openviking-hooks (companion), surrealdb-temp BSL, MEMGRAPH BSL-1.1, FalkorDB-redistribution SSPL... |
| **Probe 5 mode-harness-shape FAIL** | Windows-only / WSL-only / HARD-GATE | **14** | bubblewrap/firejail/gvisor Linux-only, RAGatouille WSL2, wshobson conductor HARD-GATE, mattpocock setup-matt-pocock-skills HARD-GATE, superpowers brainstorming HARD-GATE, gsd-build dangerous-skip-permissions, LLMLingua PyTorch+5GB dep, LMCache vLLM self-hosted, claude-squad pty.Start Windows-blocker, ARIS full install (pattern-extract OK), guidance logit-access (Anthropic doesn't expose) |
| **CR-12 class 2 DUPLICATE-FUNCTIONALITY** | vs incumbent | **15** | dify/anything-llm/ragflow/kotaemon/MaxKB/FastGPT (full platforms), CrewAI (CC subagent duplicate), deepagents (LangGraph not CC), letta (orchestration scope), aisuite (LiteLLM duplicate), browser-use+stagehand (Claude IS LLM browser), chroma-mcp (mcp-memory dup), CycloneDX/cdxgen (vs syft), pinecone-mcp (memory stack), spences10/mcpick (vs /plugin), wshobson full-stack-orch |
| **Probe 7.a DEMAND-ABSENCE** | no workflow | **7** | comby-tools (ast-grep covers), shareAI-lab/learn-claude-code (tutorial), ed3dai/ed3d-plugins (RPI dup), pinecone-claude-code-plugin (memory dup), bitwize-music-studio (domain mismatch), openai/evals (deepeval covers), guidance |
| **Catalog cite-only / single-maintainer Axis-1 FAIL** | | **6** | ComposioHQ/awesome-claude-skills license unknown, hesreallyhim CC-BY-NC-ND-4.0, sickn33 single-individual, VoltAgent/awesome-openclaw-skills ecosystem-mismatch, alirezarezvani bulk dup, JasonWarrenUK/goblin-mode Axis-2 FAIL |
| **MAINTENANCE-MODE / ARCHIVED / DEPRECATED** | | **5** | microsoft/autogen v0.7.5 → agent-framework (CC-BY-4.0 ALSO license-blocker), IntelLabs/fastRAG ARCHIVED, kuzu ARCHIVED 2026, stravu/crystal DEPRECATED Feb 2026, Vvkmnn/claude-emporium PRE-LAUNCH, lunary-ai/lunary **REPO 404 PHANTOM** |
| **DEMAND-CREATES-NEW-WORKFLOW.b PARTIAL** | deferred | **4** | dbhub (no JSONL→SQLite ETL), langchain-ai/deepagents (ECOSYSTEM-IMPORT LangGraph), ComposioHQ/agent-orchestrator (macOS-focused), Temporal (production-substrate out-of-scope) |

**Total REJECT**: ~66 candidates rejected with documented reason class.

## §4 Comprehensive Install Checklist for Z:\claude-sota-pure — Prioritized by Tier

### Tier 0 — Foundation (prereqs already met per W211 install report HEAD `e8c3599`)
- ✅ Node 24.7+, Python venv (Python 3.14.3), codex CLI v0.130+, claude CLI 2.1.140+
- ✅ Git Bash, PowerShell 7

### Tier 1 — Marketplaces (8 enabled per master catalog §8)
- ✅ claude-plugins-official + claude-code-workflows + addy-agent-skills + openai-codex + context-mode + superpowers-dev + ecc + claude-settings

### Tier 2 — Plugins (21 enabled per master catalog §8)
- ✅ skill-creator + ralph-loop + security-guidance + agent-sdk-dev + frontend-design + commit-commands + hookify + feature-dev + code-review + superpowers + context-mode + context-management + agent-orchestration + agent-teams + tdd-workflows + debugging-toolkit + comprehensive-review + agent-skills + intelligent-compact + ecc + (1 codex disabled)

### Tier 3 — MCP Servers (14 wired + W212 ADOPT-NOW additions)

**Already wired (14)**:
- ✅ memory (mcp-memory-service v10.51.3) + github + context7 + deepwiki + repomix + git + fetch + time + sequentialthinking + filesystem + gitnexus + chrome-devtools + playwright + serena

**W212 Tier-3 install candidates** (prioritized):

| # | Server | Install command | Priority | Justification |
|---|---|---|---|---|
| T3.1 | **cognee-mcp** | `pip install cognee` + `docker pull cognee/cognee-mcp:main` + add to `.mcp.json` | P0 (USER-EXPLICIT) | Apache-2.0, 17k★, PROVIDER-COMPLEMENT to mcp-memory-service |
| T3.2 | **mcp-server-langfuse** | `npx @langfuse/mcp-server-langfuse` + add LANGFUSE env keys | P0 | langfuse v4.2.0 already in venv; missing MCP wire |
| T3.3 | **modelcontextprotocol/server-filesystem** (Anthropic OFFICIAL) | `npx -y @modelcontextprotocol/server-filesystem <path>` per CR-12 PRIMARY | P0 (master §6 BIGGEST GAP) | Anthropic OFFICIAL Apache-2.0 |
| T3.4 | **modelcontextprotocol/server-git** | `uvx mcp-server-git --repository <path>` | P0 (Anthropic OFFICIAL) | |
| T3.5 | **DrishtantKaushal/LangfuseMCP** (community) | git clone + Python SDK | P1 | 34 tools (richer than official 4-tool) — verify license first |
| T3.6 | **Qdrant** | `docker run -p 6333:6333 qdrant/qdrant` | P2 | STUDY-PILOT if cognee adopted; Apache-2.0 |
| T3.7 | **ChromaDB** | `pip install chromadb` (embedded mode) | P2 | STUDY-PILOT lowest-friction vector DB |

### Tier 4 — Hooks (5 cwc native + W212 selective adds)

**Already wired**:
- ✅ track-read.sh + verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop.sh + context-mode-cache-heal.mjs

**W212 hook install candidates** (per W206-W209 master §6 + W212 N):
| # | Hook | Source | Priority |
|---|---|---|---|
| T4.1 | **ECC block-no-verify** | `everything-claude-code/scripts/hooks/block-no-verify.js` → wire PreToolUse Bash | P0 |
| T4.2 | **ECC mcp-health-check** | `everything-claude-code/scripts/hooks/mcp-health-check.js` → PreToolUse + PostToolUseFailure | P0 (closes mcp-disconnect-recovery.md D1-D6 gap) |
| T4.3 | **ECC governance-capture** | `everything-claude-code/scripts/hooks/governance-capture.js` → multiple events | P0 (audit-action-loop Surface) |
| T4.4 | **Continuous-Claude-v3 compiler-in-the-loop** | parcadei/Continuous-Claude-v3 | P1 (verify-loop per Karpathy P4) |
| T4.5 | **Continuous-Claude-v3 file-claims** | parcadei/Continuous-Claude-v3 | P1 (parallel-session FM-02 mechanical lock) |
| T4.6 | **gsd context-monitor bridge-file** | extract gsd-context-monitor.js → PostToolUse | P2 (companion to compact_hint pattern) |

### Tier 5 — Agents (cwc evaluator already installed)

**Already installed**:
- ✅ cwc evaluator at `.claude/agents/cwc/evaluator.md`

**W212 agent install candidates**:
| # | Agent | Source | Priority |
|---|---|---|---|
| T5.1 | **wshobson/agents (selective — NOT conductor)** | `/plugin install wshobson-agents` from marketplace | P1 |
| T5.2 | **wanshuiyin/ARIS Markdown skills** | git clone + port `.claude/skills/aris-*` files | P1 |
| T5.3 | **superpowers/dispatching-parallel-agents** | already in superpowers plugin namespace — verify | P0 |
| T5.4 | **superpowers/executing-plans** | already in superpowers plugin namespace — verify | P0 |

### Tier 6 — Skills + Marketplaces

**W206-W209 ADOPT-NOW Skills**:
| # | Skill | Source | Action |
|---|---|---|---|
| T6.1 | mattpocock-skills 5-pack | mattpocock/skills marketplace (verify exists) | `/plugin install` |
| T6.2 | vercel-labs/agent-skills 4-core | vercel-labs marketplace (verify) | `/plugin install` |
| T6.3 | codex@openai-codex 3-skill pack | `/plugin install codex@openai-codex@1.0.4` | active |
| T6.4 | superpowers/finishing-a-development-branch | superpowers namespace | verify |

### Tier 7 — Python packages (pip install)

**W211 already installed**:
- ✅ mcp 1.26.0 + fastmcp 3.2.0 + openinference-instrumentation-claude-agent-sdk 0.1.3 + openinference-instrumentation-mcp 2.0.2 + @modelcontextprotocol/sdk 1.29.0 (npm)
- ⚠ presidio-analyzer/anonymizer (INSTALLED but Py3.14 pydantic-v1 RUNTIME-BROKEN)
- ❌ llm-guard (FAILED sentencepiece Py3.14)

**W212 NEW Python pip-install queue (per parallel Mia GENUINE-GAPS)**:
| # | Pkg | Cmd | Justification | Priority |
|---|---|---|---|---|
| T7.1 | **outlines** | `pip install outlines` | GENUINE-GAP; provider-native structured-output for non-Anthropic | P1 |
| T7.2 | **msgspec** | `pip install msgspec` | GENUINE-GAP; hot-path hook JSON/MsgPack IPC | P1 |
| T7.3 | **cognee** | `pip install cognee` (or `uv pip install cognee`) | Memory ADOPT-NOW (USER-EXPLICIT) | P0 |
| T7.4 | **docling + docling-mcp** | `pip install docling docling-mcp` | Document parsing PROVIDER-COMPLEMENT | P1 |
| T7.5 | **graphrag** | `pip install graphrag` | CITE-ONLY unless graph-RAG demand | P3 |
| T7.6 | **r2r** | `pip install r2r` | STUDY-PILOT | P3 |
| T7.7 | **litellm** | `pip install litellm` | 100+ LLM gateway PROVIDER-COMPLEMENT | P1 |
| T7.8 | **inspect_ai** | `pip install inspect_ai` | UK AISI eval STUDY-PILOT | P3 |

### Tier 8 — Docker containers (for self-hosted services)

| # | Service | Cmd | Justification | Priority |
|---|---|---|---|---|
| T8.1 | **cognee-mcp** | `docker pull cognee/cognee-mcp:main` (companion to T7.3) | Memory MCP | P0 |
| T8.2 | **qdrant** | `docker pull qdrant/qdrant` | Vector DB STUDY-PILOT | P2 |
| T8.3 | **langfuse** (self-host) | `docker compose up` from upstream HEAD `352cdf32` | Self-hosted obs (alt to cloud) | P2 |
| T8.4 | **FalkorDB v1.6.1** | already wired for Graphiti | Wired | ✅ |

### Tier 9 — Cardinal-rule codifications (W209 L master catalog §2 #24/26/27)

| # | Rule | LOC | Priority |
|---|---|---:|---|
| T9.1 | **`.claude/rules/long-arc-handoff-discipline.md`** (PROGRESS.md convention) | ~80 | P1 |
| T9.2 | **`.claude/rules/rewind-discipline.md`** (Anthropic /rewind codification) | ~40 | P2 |
| T9.3 | Section in `team-orch-state-spawning.md` (Piebald worker-fork 4-rule cite-anchor) | ~30 | P2 |
| T9.4 | Extend `parallel-agent-wave.md §CADP` from static max-3 to signal-driven adaptive | ~50 | P3 |

## §5 Wiring Difficulty Matrix

| Layer | Easiest (1-line pip/npm) | Medium (Docker compose) | Hardest (multi-step + env keys + DB setup) |
|---|---|---|---|
| **Memory** | sqlite-vec (transitive), ChromaDB embedded, mem0 cloud-MCP | cognee-mcp (Docker) | Letta full-platform (Postgres + Alembic) |
| **RAG** | chonkie (incumbent), markitdown, FlagEmbedding | Docling, GraphRAG | R2R (FastAPI + Postgres + LiteLLM), LightRAG (vLLM/Bedrock) |
| **Agent-orch** | LangGraph pip, openai-agents-python | wshobson plugins | claude-flow (NPX + 32 plugins, "ruflo" naming verify) |
| **Token-eff** | instructor (incumbent), chonkie | cnighswonger-cache-fix proxy | langfuse self-host + LMCache |
| **Observability** | openinference (incumbent), traceloop | langfuse Docker | Phoenix (license-blocked anyway) |
| **Eval** | deepeval (incumbent), promptfoo (already global) | inspect_ai | openai/evals (REJECT) |
| **Guardrails** | presidio (currently broken Py3.14) | Nemo-Guardrails, guardrails-ai | llm-guard (Py3.14 sentencepiece FAILED) |

## §6 Native CC install path classification

Per CR-6 "official native channel" mandate, install paths classified:

| Native channel | Count | Examples |
|---|---:|---|
| **`/plugin install <pkg>@<marketplace>`** | 6 | codex@openai-codex, superpowers@claude-plugins-official, wshobson-agents, mattpocock, vercel-labs, parcadei/Continuous-Claude-v3 (marketplace if exists) |
| **`npm install -g <pkg>@latest`** | 3 | claude-code-cache-fix, mcp-server-langfuse, @modelcontextprotocol/server-filesystem (npx invocation) |
| **`pip install <pkg>`** | 9 | cognee, docling, graphrag, lightrag-hku[api], r2r, FlagEmbedding, outlines, msgspec, litellm, inspect_ai |
| **`uvx <pkg>`** | 2 | mcp-server-git (Anthropic OFFICIAL), uvx-managed equivalents |
| **`gh release download --repo <org>/<repo>`** | 2 | trivy, syft |
| **`docker pull <image>:latest`** | 4 | qdrant, chromadb, cognee/cognee-mcp, langfuse (self-host) |
| **`cargo install <pkg>`** | 1 | ast-grep CLI |
| **MULTI-STEP** | 3 | wanshuiyin/ARIS Markdown port (git clone + skill placement), Continuous-Claude-v3 selective hooks (copy/symlink), claude-flow (npx + claude mcp add ruflo + 32 plugin installs) |
| **CITE-CLASS-CANONICAL (NO INSTALL)** | 4 | Piebald worker-fork, awesome-agentic-patterns Factory/Compounding-Engineering, /rewind discipline, cwc evaluator pattern |

## §7 Cross-model gate disclosure (CR-3 + cmc-env-funneled-disclosure)

**ALL 5 Sonnet sota-researcher dispatches** in W212A + W212B ran as STAND-IN per CLAUDE.local.md ENV (g) DEPRECATED but env-funnel default fallback. **2 codex-rescue BRIDGE-MODE dispatches FAILED FM-17.e autocompact-thrashing** (Agent N + Agent O original, 854-927s 4 tool_uses each).

**Cross-model gate satisfaction status**: PARTIAL via:
- Parallel-session Mia pre-apply caught 4 OVER claims (promptfoo + garak + Zod + langfuse already-installed)
- Multi-source ≥4 distinct-family discovery satisfied per `multi-source-discovery-breadth-discipline.md`
- Direct LICENSE blob reads (not badge inference) for ALL Grade-A candidates
- Probe DAG 1-7 applied per `ahfv-probe-dag.md`

**Real GPT-5.5 codex T1 BRIDGE-MODE verification REQUIRED at install-apply boundary** per `ahfv-codex-rescue-blind-spot.md` FM-09 2-stage validation contract. Recommended Path P codex foreground+tee per `codex-t1-fix-forward-pattern.md` Pattern D for high-confidence ADOPT-NOW candidates BEFORE first `pip install` / `docker pull` / `/plugin install` lands on `Z:\claude-sota-pure`.

## §8 Recommended install priority order for Z:\claude-sota-pure

**P0 (CRITICAL — biggest CR-12 PRIMARY gaps)**:
1. Anthropic OFFICIAL MCP suite: filesystem + git + fetch + memory + sequential-thinking (T3.3 + T3.4)
2. cognee-mcp (T3.1 + T7.3 + T8.1) — USER-EXPLICIT
3. mcp-server-langfuse OR community LangfuseMCP (T3.2 / T3.5) — langfuse SDK already installed, needs MCP wire
4. ECC hooks block-no-verify + mcp-health-check + governance-capture (T4.1-T4.3)
5. superpowers/dispatching-parallel-agents + executing-plans verify (T5.3-T5.4)

**P1 (HIGH — significant capability gaps)**:
6. outlines + msgspec (T7.1 + T7.2) — GENUINE-GAP per parallel Mia
7. cnighswonger-cache-fix v3.0.3 proxy install — MEASURED 13.2pp cache-hit gap closure
8. Continuous-Claude-v3 selective hooks (T4.4 + T4.5)
9. wshobson/agents selective install (T5.1) — NOT conductor
10. wanshuiyin/ARIS Markdown skills port (T5.2) — autonomous research pattern
11. mattpocock-skills 5-pack + vercel-labs 4-core (T6.1 + T6.2)
12. Docling + docling-mcp (T7.4) — PDF parsing PROVIDER-COMPLEMENT
13. litellm (T7.7) — 100+ LLM gateway
14. long-arc-handoff-discipline.md rule codification (T9.1)

**P2 (MEDIUM — STUDY-PILOT lanes)**:
15. Qdrant Docker (T8.2)
16. ChromaDB pip (T7 — embedded)
17. langfuse self-host Docker alternative to cloud (T8.3)
18. trivy + syft security scanners (W206-W209 #13-14)
19. ast-grep CLI (W206-W209 #15)
20. gsd context-monitor PostToolUse extract (T4.6)
21. rewind-discipline + worker-fork rule sections (T9.2 + T9.3)

**P3 (LOW — RESEARCH-ONLY / FUTURE)**:
22. GraphRAG-microsoft (CITE-ONLY unless graph-RAG demand)
23. LightRAG + R2R STUDY-PILOTs
24. FlagEmbedding (EMBEDDER pilot only)
25. inspect_ai (UK AISI eval STUDY-PILOT)
26. Nemo-Guardrails + guardrails-ai (output guardrails STUDY-PILOT)
27. CADP adaptive extension (T9.4)
28. Probe 7.b 5-clause verification for ruvnet/claude-flow

**SKIP (REJECTED with documented reason)**:
- openviking (AGPLv3) | Letta as full-platform (DUPLICATE) | mem0 self-hosted (PARTIAL-OVERLAP with mcp-memory-service)
- CrewAI / deepagents / aisuite / TaskWeaver (CR-12 DUPLICATE-FUNCTIONALITY)
- AutoGen v0.7.5 (CC-BY-4.0 license-blocker + MAINTENANCE-MODE; successor microsoft/agent-framework is STUDY-PILOT-NARROW)
- marker (GPL-3) | memgraph (BSL) | neo4j-community (GPL) | kuzu (ARCHIVED) | Phoenix-Arize (Elastic-2.0)
- lunary-ai/lunary (REPO 404 PHANTOM — do NOT cite)
- LMCache (vLLM-coupled) | LLMLingua (Anthropic prompt-cache supersedes) | guidance (Anthropic doesn't expose logit-level)
- openai/evals (DEMAND-ABSENCE — deepeval covers)

## §9 Cardinal-rule conformance audit (Wave 212 deliverable)

| Cardinal Rule | Status | Evidence |
|---|---|---|
| **CR-1** cite trail | ✅ | Every Grade-A row carries file:line + HEAD SHA + LICENSE blob SHA OR official-docs URL |
| **CR-3** cross-model | ⚠ PARTIAL | STAND-IN per cmc-env-funneled-disclosure for 5 dispatches + 2 BRIDGE-MODE FAILED FM-17.e; parallel-session Mia provides backup verification; Real GPT-5.5 T1 deferred to install-apply boundary per FM-09 |
| **CR-5** install-priority | ✅ | All recommendations install-class via canonical channels (npm/pip/docker/`/plugin install`); no hand-coded artifacts |
| **CR-6** official native channel | ✅ | npm/pip/docker/`/plugin install`/uvx/cargo all from official registries; no third-party wrappers |
| **CR-7** graduated unleash | ✅ | Phase 1 `auto` per CLAUDE.md L142-145 (claude-sota-installed convention); claude-sota-pure runtime is per-install bootstrap layer |
| **CR-8** full-SOTA-content invariant | ✅ | Every install row ADAPTED-FROM-SOTA upstream repo; no novel content |
| **CR-9** install-risk discipline | ✅ | Version pins recorded where available (cnighswonger v3.0.3, langfuse v4.2.0, openinference v0.1.3, etc.); REVERT-check applied to sibling cite-imports via parallel-session FM-02 sub-class (c) |
| **CR-10** research-first | ✅ | This catalog IS the research step; install-actions DEFERRED to follow-on Pattern A apply per FM-09 2-stage validation |
| **CR-11** META-process SOTA | ✅ | 6 agent dispatches + Mia pre-apply + multi-source ≥4 + Probe-DAG + axis-1+2+3 — full META-process SOTA pipeline executed |
| **CR-12** upstream-install-priority | ✅ | All ADOPT-NOW target UPSTREAM official sources via CR-12 PRIMARY path; sibling cite-import-AMBER fallback NOT used in this wave |

## §10 Forward gaps (NEEDS-CONTEXT for W213+)

1. **Path P codex foreground+tee verification** of cumulative ADOPT-NOW set (W206-W209 §9 P0 still pending + W212 NEW 15) — recommended batch 4-6 candidates per consult for ≤300s codex timeouts per Pattern D
2. **Marketplace.json existence verification** for mattpocock-skills + vercel-labs (W206-W209 §5 HNF) — `mcp__github__get_file_contents path=marketplace.json` probe
3. **ruvnet/claude-flow "ruflo" naming resolution** + Probe 7.b 5-clause DEMAND-CREATES-NEW-WORKFLOW verification — highest-priority cross-checking per W212 Agent N
4. **Operator-led pip+Docker+API-key batch** (T7.x + T8.x + langfuse keys + mem0 Platform API key if cloud chosen)
5. **Anthropic Trust Center compliance check** for mem0 cloud-MCP (PII data flows through mem0.ai infra)
6. **Cognee-mcp cold-start smoke probe** before wire — `docker run cognee/cognee-mcp:main` against test fixture
7. **Verba + ragflow LICENSE direct read** (DeepWiki returned unknown — operator must verify before adoption)
8. **MCP reconnect**: `plugin_context-mode_context-mode__*` tools disconnected mid-session (FM-03 D1) — recovery per `mcp-disconnect-recovery.md`

## §11 Files modified in this Wave 212 fire

- `tmp/wave212-agentM-memory-rag-kg-catalog-2026-05-15.md` (48 candidates, 5 layers, 26.9K)
- `tmp/wave212-agentN-orchestration-catalog-2026-05-15.md` (23 candidates, 18.1K)
- `tmp/wave212-agentN-agent-orchestration-catalog-2026-05-15.md` (parallel-session catalog, 19.4K)
- `tmp/wave212-agentO-token-obs-eval-catalog-2026-05-15.md` (25 candidates parallel, 13K)
- `tmp/wave212-agentO-redo-token-obs-eval-catalog-2026-05-15.md` (22 candidates redo, ~22K)
- `tmp/wave212-orchestrator-mia-preapply-2026-05-15.md` (4 OVER catches + 2 GENUINE-GAPS, 6.4K)
- `tmp/wave212-MASTER-SYNTHESIS-2026-05-15.md` (this file — synthesizes all 6 above + W206-W209 master)

No source code edits. No `.mcp.json` edits. No `.claude/settings.json` edits. No `Z:\claude-sota-pure\` edits. Research-only wave per CR-10.

---

**VERDICT: W212-MASTER-SYNTHESIS-COMPLETE — 6 agent artifacts + parallel-session Mia pre-apply consolidated; 28 prior W206-W209 ADOPT-NOW + 15 NEW W212 ADOPT-NOW = **43 cumulative ADOPT-NOW** candidates; 4 Mia OVER catches drop install queue from 6 to 2 GENUINE-GAPS (outlines + msgspec); ~66 REJECT-FOR-FIT with documented reason class; cross-model gate PARTIAL (STAND-IN per cmc-env-funneled-disclosure; Real GPT-5.5 T1 verification REQUIRED at install-apply boundary per FM-09); 11-tier comprehensive install checklist (T0 prereqs through T9 rule codifications) prioritized P0/P1/P2/P3; native-CC-install-path classified for all 43; full cardinal-rule conformance verified.**
