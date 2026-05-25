---
title: Wave 220 R9 — Research-class plugin stack RECOMMENDATION for Z:\claude-sota-pure
status: AUTHORITATIVE
date: 2026-05-15
wave: 220
fire: round-9-research-plugin-stack-synthesis
audit-input: R2 master catalog + R3-R8 deltas (29+ artifacts; 8 rounds; 2 codex T1 Pattern A SUCCESS)
purpose: META-recommendation — which plugins/skills/MCPs enable advanced agent orchestration research waves at the destination runtime
---

# Wave 220 R9 — Research-class plugin stack for `Z:\claude-sota-pure`

## Section 0 — Executive answer

User question: "what are the best research plugins to install, or files organize, find convergence" for advanced agent orchestration research workflow.

**Answer**: 8 research-WORKFLOW layers × 1-3 plugins per layer = **17 plugins/MCPs ranked by install priority** below. All 17 are convergence-gate AXIS-1+2+3 PASS per R8 sota-researcher audit (`tmp/wave220-r8-convergence-audit-top15-2026-05-15.md`) + R8 security audit P0-clean post-remediation (`tmp/wave220-r8-security-audit-install-plan-2026-05-15.md`) + R8 architect review (`tmp/wave220-r8-architect-review-implant-playbook-2026-05-15.md`).

**Install order = research workflow order**: A (orchestration) → B (discovery) → C (code intelligence) → D (token-opt) → E (cross-model consensus) → F (observability) → G (skill catalogs) → H (workflow harness).

## Section 1 — Layer A: Multi-agent orchestration (FOUNDATION; install FIRST)

| Rank | Plugin | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| A1 | **`anthropics/claude-plugins-official`** | Anthropic-org marketplace | per-plugin | `/plugin marketplace add` | 1 | All Anthropic-canonical plugin discovery |
| A2 | **`anthropics/cwc-long-running-agents`** | Anthropic | Apache-2.0 | git clone + bash scripts | 2 | 5 primitives: Default-FAIL contract + Fresh-context evaluator + PROGRESS.md handoff + Kill-switch + Steer mid-run + 3 reference plugins (ralph-loop / agent-sdk-dev / frontend-design) |
| A3 | **`wshobson/agents`** marketplace | Seth Hobson (TIER-2 named-author) | MIT | `/plugin marketplace add` | 1 (then per-sub-plugin install) | **81 sub-plugins** including `agent-orchestration` + `agent-teams` + `comprehensive-review` + `conductor` + `context-management` + `debugging-toolkit` + `code-refactoring` |

**Install commands**:
```powershell
# A1
claude /plugin marketplace add https://github.com/anthropics/claude-plugins-official
# A2
gh repo clone anthropics/cwc-long-running-agents Z:/claude-sota-pure/.local/cwc
# A3 (then selective sub-plugin install per research task)
claude /plugin marketplace add https://github.com/wshobson/agents
claude /plugin install agent-orchestration@wshobson
claude /plugin install agent-teams@wshobson
claude /plugin install comprehensive-review@wshobson
claude /plugin install context-management@wshobson
claude /plugin install debugging-toolkit@wshobson
```

## Section 2 — Layer B: Multi-source SOTA discovery (research INPUT)

Per `Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md` ≥4 distinct source families mandate:

| Rank | Plugin / MCP | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| B1 | **`github` MCP** | `@modelcontextprotocol/server-github` | MIT | `.mcp.json` npx | 1 | GitHub QL + GraphQL repo metadata + stars/license/age cpd computation |
| B2 | **`deepwiki` MCP** | mcp.deepwiki.com | TIER-1 service | `.mcp.json` URL | 1 | Repo-level AI Q&A (50K+ public repos auto-generated wikis) |
| B3 | **`context7` MCP** | upstash/context7 (55K★ MIT) | MIT | `.mcp.json` npx | 1 | Live version-pinned library docs (alternative to training-knowledge) |
| B4 | **`exa` MCP** | @exa-labs/exa-mcp-server | MIT | `.mcp.json` npx | 1 | Semantic web search + neural ranking (replaces stale topic-keyword GitHub-only search) |
| B5 | **`firecrawl` MCP** | mendable/firecrawl-mcp (3.11.0) | Apache-2.0 (MCP server; AGPL-3.0 parent acceptable at CLI-binary boundary per SRA D1) | `.mcp.json` npx | 1 | Autonomous web research agent (deep multi-step crawls; ~95% extraction accuracy) |
| B6 | **`perplexity` MCP** | @perplexity-ai/mcp-server | per-Perplexity-API | `.mcp.json` npx + `${env:PERPLEXITY_API_KEY}` | 2 | Recency-filtered search + named-T2 endorsement discovery (Karpathy/Cherny/Osmani dated artifacts) |

**Install commands** (`.mcp.json` entries):
```json
{
  "mcpServers": {
    "github": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]},
    "deepwiki": {"url": "https://mcp.deepwiki.com/mcp"},
    "context7": {"command": "npx", "args": ["-y", "@upstash/context7-mcp"]},
    "exa": {"command": "npx", "args": ["-y", "@exa-labs/exa-mcp-server"], "env": {"EXA_API_KEY": "${env:EXA_API_KEY}"}},
    "firecrawl": {"command": "npx", "args": ["-y", "firecrawl-mcp"], "env": {"FIRECRAWL_API_KEY": "${env:FIRECRAWL_API_KEY}"}},
    "perplexity": {"command": "npx", "args": ["-y", "@perplexity-ai/mcp-server"], "env": {"PERPLEXITY_API_KEY": "${env:PERPLEXITY_API_KEY}"}}
  }
}
```

## Section 3 — Layer C: Code intelligence (deep-dive source-code)

For Probe-DAG harness-fit verification + repo source audit:

| Rank | Plugin / MCP | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| C1 | **`serena` MCP** | oraios/serena | MIT | `.mcp.json` uvx | 2 | LSP-grounded symbol intelligence (find_symbol / find_references / get_symbols_overview) — replaces Polyform-Noncommercial-blocked GitNexus per R4 LICENSE verdict |
| C2 | **`repomix` MCP** | yamadashy/repomix | MIT | `.mcp.json` npx | 1 | Tree-sitter compression ~70% token savings for repo-scope audits (`pack_remote_repository` + `grep_repomix_output`) |
| C3 | **`zilliztech/claude-context` MCP** | Zilliz/Milvus org (11K★ MIT) | MIT | `.mcp.json` npx | 1 | "Code search MCP for Claude Code. Make entire codebase the context" — code-search across LARGE codebases |

**Install commands**:
```json
{
  "mcpServers": {
    "serena": {"command": "uvx", "args": ["--from", "git+https://github.com/oraios/serena.git", "serena-mcp-server"]},
    "repomix": {"command": "npx", "args": ["-y", "repomix"]},
    "claude-context": {"command": "npx", "args": ["-y", "@zilliz/claude-context-mcp"]}
  }
}
```

## Section 4 — Layer D: Token optimization (long-research-wave survival)

Per Wave 220 R5 codex 6-layer disaggregation (Anthropic prompt-cache + /compact + intelligent-compact + SPR architectural verdict):

| Rank | Plugin | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| D1 | **Anthropic prompt-cache** (cache_control) | Anthropic API native | TIER-1 native | Always available | 0 | 90% cost savings on stable prefixes; 10% read / 25% write premium; 5min/1h TTL |
| D2 | **`/compact <hint>` + auto-compact** | Anthropic CC native | TIER-1 native | Always available | 0 | Operator-steered summarization |
| D3 | **`intelligent-compact@claude-settings` plugin** | fcakyon | MIT | `/plugin install` | 1 | PreCompact priority preservation 4-layer hook stack per `auto-compact-discipline.md Rank #3.5` |
| D4 | **`context-management@wshobson`** | Seth Hobson | MIT | `/plugin install` | 1 | /context-save + /context-restore commands for cross-fire continuation |

**LLMLingua REPLACEMENT verdict** (per Wave 220 R5 codex T1 + user explicit directive): all 4 above OBSOLETE LLMLingua-class per-Edit compression for Claude Code workflow. LLMLingua → CITE-CLASS-CANONICAL research baseline only.

## Section 5 — Layer E: Cross-model consensus (research ratification)

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md` T1-T7 lifecycle:

| Rank | Plugin | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| E1 | **`codex` plugin** (OpenAI Codex CLI) | OpenAI | Apache-2.0 | `/plugin install codex@openai-codex` | 2 (codex CLI install + plugin) | T1 pre-edit + T2 commit-time + T3 postcommit + T4 postpush + T5 plan-stage + T6 stop-gate + T7 ask-without-act hooks — full cross-model gate satisfaction with GPT-5.5 |

**Install**:
```powershell
# OpenAI Codex CLI (TIER-1 native channel per CR-6)
npm install -g @openai/codex@latest
claude /plugin install codex@openai-codex

# Verify T1-T7 hooks wire
ls Z:/claude-sota-pure/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/codex_*.py
```

## Section 6 — Layer F: Observability + eval (research-wave metrics)

| Rank | Plugin / Service | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| F1 | **`langfuse`** self-hosted | langfuse | open-core MIT + EE (use MIT modules only) | Docker compose | 3 | LLM observability + tracing + eval — track research-wave costs/latency/quality |
| F2 | **`promptfoo`** | promptfoo | MIT | npm install -g | 2 | Prompt eval + red-team + regression — verify research-wave verdicts |
| F3 | **`comet-ml/opik`** | comet-ml | Apache-2.0 | Docker | 3 | PROVIDER-COMPLEMENT to Langfuse (mature 24mo+) |

## Section 7 — Layer G: Skill catalogs (named-T2 SOTA skill discovery)

Per Wave 220 R7 Pattern A codex Axis-2 verified:

| Rank | Plugin | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| G1 | **`anthropics/skills`** | Anthropic-org (TIER-1 OFFICIAL) | NO-LICENSE (ADOPT-CONDITIONAL; Engineering blog Zhang/Lazuka/Murag 2025-10-16 endorsement) | `/plugin marketplace add` | 1 | TIER-1 OFFICIAL Anthropic skill catalog (135K★ + 15.9K forks) |
| G2 | **`addyosmani/agent-skills`** | Addy Osmani / Google Chrome DevRel | MIT | `/plugin marketplace add` | 1 | TIER-1-NAMED-AUTHOR 21 engineering-phase skills (multi-runtime CC/Gemini/OpenCode) |
| G3 | **`obra/superpowers`** (selective) | obra (Jesse Vincent) | MIT | `/plugin marketplace add` | 1 | TIER-1-NAMED-AUTHOR 14 skills (plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review/etc.) |
| G4 | **`alirezarezvani/claude-skills`** | alirezarezvani | MIT | `/plugin marketplace add` | 1 | 540+ skills multi-runtime (Claude Code / Codex / Gemini CLI / Cursor / Aider / 8+ more) |

## Section 8 — Layer H: Workflow harness + memory (research-loop continuity)

| Rank | Plugin | Source | License | Native CC path | Wired diff | Enables |
|--:|---|---|---|---|---:|---|
| H1 | **`thedotmack/claude-mem`** | thedotmack | Apache-2.0 | npm/plugin install | 2 | Triple-runtime memory persistence (CC + Codex + Windsurf); compresses session + injects relevant context back into future sessions |
| H2 | **`getzep/graphiti`** MCP | getzep | Apache-2.0 | `.mcp.json` uv + FalkorDB Docker | 3 | Temporal-KG memory layer (graph-based agent memory with time semantics) |
| H3 | **`doobidoo/mcp-memory-service`** MCP | Heinrich Krupp | Apache-2.0 | `.mcp.json` uvx | 1 | L1 capture (sqlite_vec backend; persistent across sessions) |
| H4 | **`ruvnet/ruflo`** | ruvnet | MIT | plugin install | 2 | Multi-agent AI orchestration for Claude Code (Codex + RuVector DB + 51K★ community-volume) |

## Section 9 — Synthesized minimum-viable research stack

For **immediate research-orchestration capability** at `Z:\claude-sota-pure`, install in this order:

### MVP (Phase 1 — minimum to enable advanced research orchestration)

1. **A1** `anthropics/claude-plugins-official` (marketplace foundation)
2. **E1** `codex@openai-codex` plugin (cross-model gate — REQUIRED for SOTA convergence per CR-3)
3. **B1** `github` MCP (cite-trail at file:line — required for cardinal-rule-1)
4. **B2** `deepwiki` MCP (repo-level Q&A)
5. **B3** `context7` MCP (live docs)
6. **C2** `repomix` MCP (~70% token savings on repo audits)
7. **C1** `serena` MCP (LSP code intelligence)
8. **D3** `intelligent-compact@claude-settings` (PreCompact stack)
9. **A2** `anthropics/cwc-long-running-agents` (long-running loop discipline)

After MVP, fire research waves immediately using the orchestrated stack.

### Enhancement (Phase 2 — multi-source convergence)

10. **B4** `exa` MCP (semantic search)
11. **B5** `firecrawl` MCP (autonomous web agent)
12. **B6** `perplexity` MCP (recency + named-T2 discovery)
13. **C3** `claude-context` MCP (entire-codebase context)
14. **A3** `wshobson/agents` marketplace + selective sub-plugins
15. **G2** `addyosmani/agent-skills`
16. **G3** `obra/superpowers` selective
17. **H1** `thedotmack/claude-mem` (memory persistence)

### Power-up (Phase 3 — observability + memory + workflow)

18. **F2** `promptfoo` (eval)
19. **F1** `langfuse` (observability)
20. **H2** `graphiti` MCP + FalkorDB Docker
21. **H3** `doobidoo/mcp-memory-service`
22. **G1** `anthropics/skills` marketplace
23. **G4** `alirezarezvani/claude-skills`
24. **H4** `ruvnet/ruflo`

## Section 10 — File organization convergence for research artifacts

Per Karpathy 3-layer Wiki Compounding Surface (per `auto-compact-discipline.md Rank #5` + `karpathy-adapted.md §5`):

```
Z:\claude-sota-pure\
├── .claude\
│   ├── plugins\                          ← Phase 2 plugin marketplaces (cached)
│   ├── state\                            ← Layer 1 chronological log (JSONL)
│   │   ├── codex_consult_*.txt           ← codex T1 consult prompts
│   │   ├── codex_consult_*_OUT.txt       ← codex T1 verdicts
│   │   └── *.jsonl                       ← audit trails (mcp_health / subagent_transcripts / etc.)
│   ├── projects\<id>\memory\
│   │   └── MEMORY.md                     ← Layer 2 index (one-line topic pointers ≤150 chars)
│   ├── rules\                            ← discipline rules (cite-imported from sibling claude-sota)
│   ├── skills\                            ← installed skills (per-plugin)
│   ├── agents\                            ← agent definitions
│   └── hooks\scripts\                     ← codex T1-T7 hook scripts (from codex plugin)
├── docs\
│   ├── outer research\                    ← SOTA-kit deep-dive baselines (v60-v65)
│   ├── install-provenance.md              ← cardinal-rule-9 install discipline log
│   ├── sota-installed-manifest.md         ← single source of truth for installs
│   └── karpathy-llm-wiki-practice.md      ← Layer 3 compiled wiki
├── tmp\
│   └── wave<N>-<topic>-<date>.md          ← per-wave research deliverables (forward-only per port-note-discipline.md §6)
├── tools\eee.ps1                          ← bootstrap launcher
├── bin\eee.cmd                            ← cmd shim
├── PINS.json                              ← cardinal-rule-6 version pins (re-verified at 30d cadence)
├── .mcp.json                              ← MCP server registry (Phase 3 + B/C MCPs above)
├── .claude\settings.json                  ← minimum baseline + plugin-loaded settings
├── CLAUDE.md                              ← cardinal rules (8+)
├── CLAUDE.local.md                        ← gitignored env block
└── .gitignore
```

## Section 11 — Convergence-finding workflow (using installed stack)

Once Phase 1+2 MVP+Enhancement plugins installed, advanced research orchestration runs:

```
1. Research-task issued by operator
   ↓
2. Spawn 3-5 parallel agents via Agent tool (CADP cap; per `parallel-agent-wave.md`)
   - sota-researcher (Probe DAG + 5-row LOAD-BEARING bar + convergence-gate axis-1+2+3)
   - codex-rescue BRIDGE-MODE → real GPT-5.5 via E1 codex CLI subprocess
   - architect (≥2-option trade-off + cite SOTA primary at file:line)
   - gpt5-reviewer (adversarial review of architect verdict)
   - code-reviewer (5-lens review — uses A3 wshobson `comprehensive-review`)
   ↓
3. Each agent uses B/C MCPs for multi-source discovery
   ↓
4. Orchestrator-side Mia pre-apply per `mia-pre-apply.md` on returned prescriptions
   ↓
5. Codex T1-T7 hooks (E1) enforce cross-model gate at edit/commit boundaries
   ↓
6. Wave-close synthesis ARTIFACT-INLINE persistence per FM-19
   ↓
7. Forward-only per port-note-discipline.md §6 — `tmp/wave<N>-<topic>-<date>.md`
   ↓
8. PreCompact priority preservation (D3) protects state across compact boundaries
   ↓
9. Memory persistence (H1/H2/H3) carries findings cross-session
```

## Section 12 — Final verdict & priorities

**Top-9 IMMEDIATELY install for advanced research orchestration**:

```powershell
# Phase 1 MVP (minimum to enable advanced research at Z:\claude-sota-pure)
claude /plugin marketplace add https://github.com/anthropics/claude-plugins-official
npm install -g @openai/codex@latest
claude /plugin install codex@openai-codex
gh repo clone anthropics/cwc-long-running-agents Z:/claude-sota-pure/.local/cwc
claude /plugin install intelligent-compact@claude-settings

# .mcp.json (Phase 1 MCPs)
# - github (B1 — gh API)
# - deepwiki (B2 — repo Q&A)
# - context7 (B3 — live docs)
# - serena (C1 — LSP code intelligence)
# - repomix (C2 — tree-sitter compression)
```

This MVP enables ALL Wave 220-class research-orchestration patterns: parallel multi-agent fan-out + multi-source convergence + cross-model gate + token-opt + cite-trail + repo deep-dive. Subsequent installs (Phase 2 + Phase 3) extend capability.

**Next-fire (R10) recommendation**: install MVP at `Z:\claude-sota-pure` per Section 12 → execute first research wave using new stack → verify cross-model gate fires (T1 on first edit) → confirm multi-source convergence (≥4 source families per `multi-source-discovery-breadth-discipline.md`).

VERDICT-RESEARCH-PLUGIN-STACK-COMPLETE.
