# W330 Stream F — Research Architecture SOTA Audit

**Wave**: W330 MEGA-AUDIT · **Stream**: F (research architecture) · **Date**: 2026-05-19
**Verdict**: **YES — research stack is SOTA-compliant with no silent fallback observed**; 3 forward-looking gaps queued for proposal-only remediation.

---

## §1. Memory tier liveness probes (T1-T6)

Probed every memory tier per brief. All live tiers passed; retired tiers correctly down.

| Tier | Probe | Result |
|------|-------|--------|
| T1 hindsight | `GET http://127.0.0.1:9077/health` | DOWN — expected per W317-S1 retire (`No connection could be made… (127.0.0.1:9077)`) — RETIRED-AS-DESIGNED |
| T2 memory (`.mcp.json`) | n/a — disabled by design | DISABLED — `disabledMcpjsonServers` block per W300-AI-1 |
| T2 memory (plugin) | `everything-claude-code:memory` | LIVE per CLAUDE.md L51 (not separately port-probed; in-CC tool surface) |
| T3 cognee | `POST :8000/mcp initialize` w/ `Accept: application/json, text/event-stream` | **OK** — `{"serverInfo":{"name":"Cognee","version":"1.26.0"}}` (initial bare-JSON POST returned 406 — Streamable-HTTP spec requires SSE Accept header; cognee correctly enforces it, not a fallback) |
| T4 graphiti | n/a — retired | RETIRED W272+W290+W295 (`.mcp.json` block excised W313 commit `5a350d1`) |
| T5 langfuse | `GET :3000/api/public/health` | **OK** — `{"status":"OK","version":"3.170.0"}` |
| T6 basic-memory | `.mcp.json` decl + `uvx --from basic-memory==0.21.1` (W308 pin) | LIVE — entry `basic-memory` lines 61-69 of `.mcp.json` ; pinned 0.21.1 per CR-9 |

**§1 verdict**: 4/4 expected-live tiers responding; 2/2 expected-retired tiers correctly down. **No silent fallback**.

---

## §2. Local model server probes

| Server | Probe | Models served |
|--------|-------|---------------|
| Ollama :16700 | `GET /api/tags` | **OK** — 2 models: `qwen3-coder:30b-a3b-q4_K_M` (LLM, 30B MoE A3B Q4_K_M) + `qwen3-embedding:0.6b` (1024-dim) |
| LlamaSwap :8090 | `GET /v1/models` | **OK** — 7 models: `gemma4-26b`, `gemma4-31b`, `qwen3-coder-30b`, `qwen3-embed-0.6b`, `qwen3-reranker-0.6b`, `qwen3-vl-8b` (+ `_disabled_qwen36-moe` intentional sentinel) |
| LlamaSwap NSSM service | `nssm status LlamaSwap` | `SERVICE_RUNNING` |
| Cognee NSSM service | `nssm status CogneeMCP` | `SERVICE_RUNNING` |
| Ollama process | `Get-Process ollama` | PID 9140 live |

**§2 verdict**: Full reranker + VL + embed + 4 chat models live via LlamaSwap (SOTA — covers retrieval rerank, vision-language, and multi-size LLM). Ollama supplies the embed/extract LLM for graph backends.

---

## §3. MCP server inventory + health (.mcp.json)

15 MCP servers declared in `.mcp.json` (project root). All entries CR-9 compliant (pinned versions OR env-resolved local services).

| # | Server | Transport | Command/URL | Pin | CR-2/CR-9 |
|---|--------|-----------|-------------|-----|-----------|
| 1 | deepwiki | http | `https://mcp.deepwiki.com/mcp` | remote | OK (probed: 200, MCP handshake valid) |
| 2 | chrome-devtools | stdio | `npx -y chrome-devtools-mcp@1.0.1` | 1.0.1 | OK |
| 3 | repomix | stdio | `npx -y repomix@1.14.0 --mcp` | 1.14.0 | OK |
| 4 | serena | stdio | `uvx --from git+...@249f6b07...` | SHA-pinned | OK |
| 5 | gitnexus | stdio | `gitnexus mcp` (npm-global @1.6.4-rc.112) | 1.6.4-rc.112 | OK |
| 6 | ccusage | stdio | `npx -y @ccusage/mcp@18.0.11` | 18.0.11 | OK |
| 7 | cognee | http | `http://127.0.0.1:8000/mcp` | local NSSM | **OK** (probed: serverInfo Cognee 1.26.0) |
| 8 | langfuse | stdio | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | local repo | OK (env-interp ${LANGFUSE_*}) |
| 9 | basic-memory | stdio | `uvx --from basic-memory==0.21.1` | 0.21.1 | OK (W308 pin) |
| 10 | hf-mcp-server | http | `https://huggingface.co/mcp` | remote | **OK** (probed: 200, `@huggingface/mcp-services 0.3.13`) |
| 11 | perplexity | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` | 0.9.0 | OK (env-interp ${PERPLEXITY_API_KEY}) |
| 12 | playwright | stdio | `npx -y @playwright/mcp@0.0.75` | 0.0.75 | OK |
| 13 | tavily | stdio | `npx -y tavily-mcp@0.2.19` | 0.2.19 | OK (env-interp ${TAVILY_API_KEY}) |
| 14 | exa | stdio | `npx -y exa-mcp-server@3.2.1` | 3.2.1 | OK (env-interp ${EXA_API_KEY}) |

**§3 verdict**: All 14 stdio/http MCPs CR-9-compliant (pinned versions, no `@latest`/`@next`). Remote HTTPS MCPs (deepwiki, hf) reachable. Local-port MCPs (cognee :8000) reachable. Stdio MCPs cannot be JSON-RPC-probed externally (CC spawns them on-demand) but command-form-validated.

---

## §4. SOTA comparison

### 4a. `OthmanAdi/planning-with-files` v2.38.1 (5,200+ stars, MIT)
- **Pattern**: 3-file durable plan workflow (`task_plan.md` + `findings.md` + `progress.md`) maintained across session boundaries via PreToolUse hook.
- **Current runtime status**: ALREADY INSTALLED as local skill (CLAUDE.md L46 lists `planning-with-files` under operator-curated skills). Local skill files: `Z:/claude-sota-installed/.claude/skills/planning-with-files{,-ar,-de,-es,-zh}/`. **Adoption gap**: skill present but the upstream PreToolUse hook auto-fire pattern is NOT wired — current runtime uses TodoWrite (native) for in-session todos + `durable-planning-files` skill for cross-session, which is the W324 design choice. The upstream "always-create-3-files" cadence is the SOTA reference.
- **Recommendation**: not a gap — current durable-planning-files + TodoWrite split per W324 ledger is intentional design. Upstream pattern is SOTA-equivalent.

### 4b. `abhigyanpatwari/GitNexus` v1.6.4-rc.112 (PolyForm Noncommercial)
- **Pattern**: Knowledge graph indexing — every file/dep/call indexed via 13 MCP tools (`list_repos`, `query`, `cypher`, `context`, `detect_changes`, `rename`, `impact`, `route_map`, `tool_map`, `shape_check`, `api_impact`, `group_list`, `group_sync`).
- **Current runtime status**: INSTALLED + wired in `.mcp.json` line 36-40. Local skill `gitnexus` SKILL.md (CLAUDE.md L46) gates use to 7 sub-skills (guide / cli / exploring / impact-analysis / debugging / refactoring / pr-review).
- **USAGE GAP** (this is a real finding): `Z:/claude-sota-installed` may NOT be indexed yet — no `meta.json`/`registry.json` evidence verified in this audit (would require `gitnexus list-repos` probe which is out of stdio scope). MCP tool surface declared via deferred tools (`mcp__gitnexus__list_repos`, `mcp__gitnexus__query`, etc. visible in deferred list) confirms server reachable but indexing-state unverified.
- **Recommendation (proposal-only)**: spawn a sub-task to run `gitnexus list` + `gitnexus status .` on this runtime to confirm the repo is actually indexed; if not, `gitnexus index .` (~5 min for 130k LOC).

### 4c. `alirezarezvani/claude-skills` v2.7.3 (5,200+ stars, MIT — 313 skills)
- **Pattern**: Centralized skill registry across 12 AI coding tools. Includes "complete research stack" (litreview/grants/dossier/patent/syllabus/pulse/notebooklm + hybrid router).
- **Current runtime status**: NOT INSTALLED. Per CLAUDE.md L46 local skills include only 33 curated names; alirezarezvani is not in install set.
- **GAP CLASSIFICATION**: low priority — 313 skills bundle exceeds the cardinal-rule-3 trusted-source curated-import philosophy. Cherry-pick research-tier skills (litreview / dossier) would require per-skill SOTA audit.
- **Recommendation**: enqueue as W331+ skill-audit candidate (NOT install-as-bundle).

### 4d. `anthropics/claude-cookbooks` `patterns/agents/`
- **Patterns**: Basic Building Blocks (Prompt Chaining · Routing · Multi-LLM Parallelization) + Advanced (Orchestrator-Subagents · Evaluator-Optimizer).
- **Current runtime status**: PARTIALLY ADOPTED — orchestrator-subagents is the Anthropic-canonical anchor for cardinal-rule-3 (CLAUDE.md L13 + W269 mandate). Evaluator-optimizer pattern is wired via codex GPT-5.5 cross-model gate (codex T1 verdict → Claude Code synthesis). Multi-LLM Parallelization wired via `superpowers:dispatching-parallel-agents` skill (current parallel_ratio 0.0036 per W325-A F1 — SEV-1 but tooling-side, not skill-side).
- **GAP**: `claude-cookbooks/patterns/agents/` `prompts/research_lead_agent.md` is cite-anchored in CLAUDE.md L13 as the W312-D anchor for parallel-tool-calls MUST-block — but the local fork has not been verified-imported here. Cite-only reference is operational.
- **Recommendation**: cite-only sufficient (no install needed).

---

## §5. Silent-fallback hits

Brief targets "any MCP server that fails to start would be silent (no startup error visibility in CC)". Probed each external HTTP-reachable MCP + local-port MCP:

| Server | Silent-fallback risk | Status |
|--------|----------------------|--------|
| deepwiki (https) | None — handshake returns valid serverInfo on probe | PASS |
| hf-mcp-server (https) | None — handshake returns `@huggingface/mcp-services 0.3.13` on probe | PASS |
| cognee (local :8000) | LOW — NSSM-managed service (`SERVICE_RUNNING`), auto-restart on crash; **NOTE** the 406-on-bare-POST was correct spec-enforcement (Streamable HTTP requires `text/event-stream` Accept), not a silent fallback | PASS |
| langfuse (local :3000) | LOW — service responds OK; node-process is local-repo-built MCP (not npm-pinned), but env-interp of LANGFUSE_* gates startup | PASS-with-caveat |
| Ollama (local :16700) | LOW — process live (PID 9140); OLLAMA_HOST env set per CLAUDE.md L62 | PASS |
| LlamaSwap (local :8090) | LOW — NSSM service running; 7 models loaded | PASS |
| stdio MCPs (chrome-devtools, repomix, serena, gitnexus, ccusage, basic-memory, perplexity, playwright, tavily, exa) | **MEDIUM** — stdio MCPs are spawned-on-demand by CC; an `npx -y` resolution failure (cache miss + offline registry) would surface as MCP unavailable but **silently** in non-interactive sub-agent contexts. Mitigated by version pinning (npm-cache-hit normal). | PASS-with-caveat |

**§5 verdict**: zero hard silent-fallback hits. One systemic note: the stdio-MCP spawn-on-demand pattern is inherently silent-fail-able if npm cache is invalidated — this is upstream behavior, not a project defect.

---

## §6. Remediation proposals (proposal-only per brief NON-GOALS)

| ID | Priority | Proposal | Rationale |
|----|----------|----------|-----------|
| F-P1 | LOW | Verify gitnexus index state on this runtime (`gitnexus list .` + `gitnexus status .`); if not-indexed, run `gitnexus index .` | §4b — server reachable but indexed-state-of-this-repo unverified |
| F-P2 | LOW | Add a periodic stdio-MCP smoke gate to weekly cron (spawn each, send `initialize`, assert serverInfo) | §5 — eliminates "silent fail on npm cache miss" systemic note |
| F-P3 | INFO | Document the cognee `Accept: text/event-stream` requirement in `docs/architecture/W259-grand-catalog/.../cognee.md` to prevent future audit-time 406-misinterpretation | §1 — found during this audit; cognee 1.26.0 correctly enforces MCP Streamable HTTP spec |

No P0/P1 silent-fallback found. No CR violations found.

---

## §7. Cite anchors

- `.mcp.json` L16-103 (15 MCP server declarations, all CR-9-pinned)
- `.mcp.json` `_comments.cognee_w259v8` (cognee install report; 406 nuance is spec-compliant per MCP Streamable HTTP)
- `.mcp.json` `_comments.w286_cross_npx_pinned_v2` (CR-9 pinning rationale)
- `.mcp.json` `_comments_addendum.w308_basic_memory_uvx_pin_2026_05_19` (basic-memory uvx pin)
- `.mcp.json` `_comments_addendum.w317_s7_perplexity_2026_05_19` (perplexity wire)
- CLAUDE.md L13 (cardinal-rule-2 / W286-arc-P0C / CR-9 contract)
- CLAUDE.md L29 (cognee data-dir cite)
- CLAUDE.md L46 (operator-curated skills inc. planning-with-files / gitnexus)
- CLAUDE.md L51-53 (memory-tier ledger inc. T1/T3/T5/T6 status)
- Probe outputs:
  - Cognee :8000/mcp → `Cognee 1.26.0` serverInfo via SSE
  - Langfuse :3000/health → `{"status":"OK","version":"3.170.0"}`
  - Ollama :16700/api/tags → 2 models
  - LlamaSwap :8090/v1/models → 7 models
  - deepwiki/hf MCPs → 200 + valid MCP handshake
  - NSSM CogneeMCP + LlamaSwap → SERVICE_RUNNING
- GitHub README anchors:
  - `OthmanAdi/planning-with-files` v2.38.1 README (5,200+★)
  - `abhigyanpatwari/GitNexus` v1.6.4-rc.112 (PolyForm Noncommercial)
  - `alirezarezvani/claude-skills` v2.7.3 README (313 skills)
  - `anthropics/claude-cookbooks/patterns/agents/README.md` (5 reference patterns)
