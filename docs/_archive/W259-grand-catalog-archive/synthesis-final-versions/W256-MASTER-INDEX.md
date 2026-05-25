---
title: "Wave 256 — Grand Synthesis Master Index"
date: 2026-05-16
status: IN-PROGRESS
wave: W256
target-runtime: "Z:\\claude-sota-installed (this runtime) + Z:\\claude-sota-pure (sibling)"
predecessors:
  - "W253 grand-synthesis-w253-2026-05-15/ — 95 repos × 10-dim scoring, 27 INSTALL-NOW"
  - "W253-16 research-wave-2026-05-15/GRAND-SYNTHESIS-W253-2026-05-16.md — codex Path P STAND-IN-NOTICE (cross-model gate FAILED — OS error 5)"
  - "W252 02-wave252-fresh-2026-05-16/ — W252 fresh discovery + scoring"
  - "W251 01-fresh-research-wave-2026-05-16/ — W251 NEEDS-REVISION baseline"
  - "v2-deep-synthesis/ — 9-file deep dive: FINAL_v4_GRAND_CATALOG / MASTER_GRAND_CATALOG_v3 / ULTIMATE_SOTA_RUNTIME_DESIGN / etc."
  - "Wave 52 kits/ (v5-v65 — 57 versions, ~230 repos baseline)"
prior-coverage:
  total-unique-repos-across-14-catalogs: 613
  convergence-clusters:
    high-14-of-14: ["wshobson/agents", "obra/superpowers"]
    high-13-of-14: ["openai/codex", "yamadashy/repomix", "getzep/graphiti", "doobidoo/mcp-memory-service", "oraios/serena"]
    mid-12-of-14: ["addyosmani/agent-skills", "mem0ai/mem0", "mksglu/context-mode", "topoteretes/cognee", "promptfoo/promptfoo", "ryoppippi/ccusage"]
  emerging-2-to-3-catalogs: 157
  niche-1-catalog: 273
---

# Wave 256 — Grand Synthesis Master Index

## §0 — Purpose

This is the ULTIMATE convergence-synthesis for the Claude Code SOTA ecosystem. Builds on 14+ prior catalogs (W251-W255 + v2-deep + Wave-52 kits). Re-validates freshness, fills coverage gaps in under-covered layers (RAG/sandbox/observability/agentic-cli/Q2-2026 features), runs cross-model gate via codex Path P (FRESH this wave — prior W253-16 had OS error 5 STAND-IN-NOTICE), and produces a single canonical install-architecture for the pure SOTA Claude Code runtime.

## §1 — Folder map

```
grand-synthesis-w256-2026-05-16/
├── 00-master/
│   ├── W256-MASTER-INDEX.md            (this file — top-level navigation)
│   ├── 99-FINAL-SYNTHESIS.md           (the ultimate output — produced last)
│   ├── 99-EXECUTIVE-BRIEF.md           (1-page TL;DR for operator)
│   └── 99-ARCHITECTURE-DESIGN.md       (the 17-layer ultimate architecture)
├── 01-discovery/
│   ├── prior-repos-cumulative.md       (613 unique from 14 catalogs)
│   ├── multi-source-discovery-trail.md (R1 source-family ≥4)
│   ├── gap-research-new-repos.md       (NEW repos found this wave)
│   ├── github-graphql-probes.md        (GraphQL queries used)
│   └── awesome-list-extracts.md        (discovery-only refs)
├── 02-layers/
│   ├── 01-memory/                      (mem0, graphiti, claude-mem, mcp-memory, cognee, letta, LightRAG, supermemory, mem-bank-mcp, ...)
│   ├── 02-search-vector/               (qdrant, chroma, weaviate, milvus, lancedb, faiss, pgvector, sqlite-vec, valkey)
│   ├── 03-code-intel/                  (serena, repomix, context7, ast-grep, gitnexus, exa-mcp, mcp-language-server, code2prompt, mgrep)
│   ├── 04-agents/                      (wshobson, comprehensive-review, agent-orchestration, agent-teams, sota-researcher, codex-rescue)
│   ├── 05-skills/                      (superpowers, addy-skills, karpathy-skills, vercel-labs, ECC, claude-plugins-official, oh-my-claudecode)
│   ├── 06-hooks/                       (intelligent-compact, pre-commit, lefthook, husky, disler/hooks-mastery, hookify)
│   ├── 07-plugins/                     (claude-plugins-official, marketplaces × 21, GAS marketplace, plugin-validator)
│   ├── 08-runtime/                     (claude-code, codex, gemini-cli, opencode, cursor-cli, ralph-loop, cmux, ccswarm)
│   ├── 09-observability/               (langfuse, phoenix-arize, helicone, openllmetry, opik, openobserve, logfire, braintrust, mlflow)
│   ├── 10-governance/                  (review-agent-governance, signed-audit-trails, gitleaks, trivy, scorecard, presidio, llm-guard, garak, AI-Infra-Guard)
│   ├── 11-web-browser/                 (playwright-mcp, chrome-devtools-mcp, browser-use, stagehand, browserbase, computer-use, UI-TARS)
│   ├── 12-knowledge-graph/             (graphiti, neo4j-mcp, kuzu, falkordb, mcp-graphrag, graphify, microsoft/graphrag, mcp-knowledge-graph)
│   ├── 13-llm-routing/                 (litellm, openrouter, helicone, portkey, tensorzero, claude-code-router, anthropic-proxy, CLIProxyAPI)
│   ├── 14-sandbox/                     (e2b, modal, daytona, agent-infra/sandbox, kubernetes-mcp-server, github-mcp-server)
│   ├── 15-evals-learning/              (promptfoo, deepeval, ragas, simple-evals, openai/evals, lm-evaluation-harness, RagaAI-Catalyst, ART)
│   ├── 16-context-token/               (rtk, caveman, context-mode, repomix-compress, ccusage, LLMLingua=REJECT, headroom, lean-ctx, token-savior)
│   └── 17-document-ingestion/          (docling, markitdown, crawl4ai, firecrawl, unstructured, PaddleOCR, scrapling)
├── 03-scoring/
│   ├── W253-scoring-matrix-95repos.md  (prior — re-validated)
│   ├── W256-scoring-matrix.md          (NEW scoring with D1-D10 per repo this wave)
│   ├── W256-composite-rank-top100.md   (composite-ranked top-100)
│   └── W256-per-layer-rank.md          (per-layer rank within each of 17 layers)
├── 04-convergence/
│   ├── axis-1-distinct-orgs.md         (R3 Axis-1 ≥3 orgs per candidate)
│   ├── axis-2-named-T2-practitioners.md
│   ├── axis-3-stability-90-day.md
│   └── convergence-master-table.md
├── 05-architecture/
│   ├── ULTIMATE-17-LAYER-ARCHITECTURE.md  (the design)
│   ├── install-tier-roadmap.md            (14-tier roadmap)
│   ├── namespace-collision-gates.md       (6+ pairs + new)
│   ├── license-class-policy.md
│   └── codex-T1-bridge-spec.md            (cross-model gate wiring)
├── 06-archive/                            (low-quality / superseded / kept-for-cite)
│   ├── pre-W250-research-snapshots.md
│   ├── superseded-verdicts.md
│   └── moved-files-manifest.md
├── 07-trail/                              (cross-model gate logs)
│   ├── codex-path-P-adversarial-W256.md   (this wave's codex T1)
│   ├── codex-path-P-scoring-W256.md
│   └── mia-pre-apply-spotchecks.md
└── README.md
```

## §2 — Method (R0-R8 pipeline)

Per `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md`:

| Phase | Goal | Status |
|---|---|---|
| **R0** Local inventory | Catalog all .md research artifacts (10,231 .md files in docs/; 209 wave MDs in tmp/) | IN-PROGRESS (agent a18733 running) |
| **R1** Multi-source≥4 discovery | ≥4 source families per layer × 17 layers — fill gaps NOT in W253 | IN-PROGRESS (agents running) |
| **R2** 7-Probe-DAG | Per-candidate harness-fit (count-OVER, SDK-vs-CLI, API, namespace, mode, blockers, demand) | PENDING |
| **R3** Axis 1+2+3 convergence | ≥3 distinct orgs, ≥2 named T2, ≥3mo stability | PENDING |
| **R4** SRA D1-D10 scoring | 10-dim score per candidate; INSTALL/DEFER/REJECT gates | PARTIAL (W253 already scored 95 repos; W256 adds new candidates + freshness refresh) |
| **R5** CR-12 6-class disposition | GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL | PENDING |
| **R6** Architecture synthesis | 17-layer ultimate architecture, install roadmap, gap-analysis | PENDING |
| **R7** Artifact organization | Move 500+ research MDs into folder taxonomy | PENDING |
| **R8** Final synthesis doc | 99-FINAL-SYNTHESIS.md + 99-EXECUTIVE-BRIEF.md + 99-ARCHITECTURE-DESIGN.md | PENDING |

## §3 — Cross-model gate (CR-3)

**Prior wave gate status**:
- W253 (2026-05-15): SATISFIED via codex Path P 2-job (adversarial + scoring) — `01-codex-bridge-verdicts/`
- W253-16 (2026-05-16): FAILED — STAND-IN-NOTICE — codex subprocess OS error 5
- W195 (2026-05-14): PARTIAL — Agent B FM-17.d autocompact-thrash

**W256 plan**:
- Use codex Path P orchestrator-direct dispatch (proven works W253) when network healthy
- T1 pre-edit consult on each new layer-rank doc
- T3 commit-time net for any final synthesis ship
- HONEST-NON-FINDING + STAND-IN-NOTICE if codex unavailable

## §4 — Prior catalog convergence — top tier (verified ≥10/14 catalogs)

| Repo | Catalogs | Mentions | Stars (2026-05-15) | License | W253 verdict |
|---|---:|---:|---:|---|---|
| wshobson/agents | 14/14 | 43 | 35,459 | MIT | INSTALL-NOW (selected granular) |
| obra/superpowers | 14/14 | 30 | 192,910 | MIT | **WIN** orchestration · INSTALL-NOW |
| openai/codex | 13/14 | 47 | 82,924 | Apache-2.0 | INSTALL-NOW (cross-model sidecar) |
| yamadashy/repomix | 13/14 | 33 | 24,893 | MIT | **WIN** ADR/snapshot · INSTALL-NOW |
| getzep/graphiti | 13/14 | 32 | 26,107 | Apache-2.0 | STUDY-PILOT (backend decision) |
| doobidoo/mcp-memory-service | 13/14 | 27 | 1,844 | Apache-2.0 | INSTALL-NOW |
| oraios/serena | 13/14 | 23 | 24,273 | MIT | INSTALL-NOW (code-intel complement) |
| addyosmani/agent-skills | 12/14 | 26 | 42,114 | MIT | INSTALL-NOW (namespace-gated) |
| mem0ai/mem0 | 12/14 | 23 | 55,805 | Apache-2.0 | STUDY-PILOT |
| mksglu/context-mode | 12/14 | 23 | 14,828 | ELv2 | STUDY-PILOT (Tier-B) |
| topoteretes/cognee | 12/14 | 21 | 17,248 | Apache-2.0 | STUDY-PILOT |
| promptfoo/promptfoo | 12/14 | 18 | 21,290 | MIT | STUDY-PILOT (eval Tier-A core) |
| ryoppippi/ccusage | 12/14 | 18 | 14,224 | NOASSERTION | **WIN** eval/obs · INSTALL-NOW |
| thedotmack/claude-mem | 11/14 | 29 | 76,009 | Apache-2.0 | **WIN** memory · INSTALL-NOW |
| microsoft/playwright-mcp | 11/14 | 24 | 32,564 | Apache-2.0 | **WIN** browser · INSTALL-NOW |
| anthropics/claude-plugins-official | 11/14 | 22 | 19,453 | per-plugin | INSTALL-NOW (narrow) |
| modelcontextprotocol/servers | 11/14 | 20 | 85,719 | NOASSERTION* | INSTALL-NOW (per-pkg pin) |
| langfuse/langfuse | 11/14 | 16 | 27,283 | NOASSERTION | STUDY-PILOT (Tier-B) |
| volcengine/OpenViking | 11/14 | 15 | 23,967 | AGPL-3.0 | DEFER (examples Apache, selective probe) |
| semgrep/semgrep | 11/14 | 14 | 15,158 | LGPL-2.1 | DEFER (operator-override possible) |

→ Full list at `01-discovery/prior-repos-cumulative.md` (613 entries).

## §5 — Cross-cutting prior decisions to preserve

1. **LLMLingua REJECTED** — outdated 2026-05 per operator + W220 codex T1; replaced by stack: prompt-cache + rtk + repomix-compression + caveman + context-mode (Tier-B)
2. **Awesome-lists = discovery-only**, never install-class (CR-12 ECOSYSTEM-IMPORT lattice)
3. **Plugin namespace collision** required before install (6 known pairs in W253 §5)
4. **OpenViking AGPL root + examples/Apache** — selective subtree import is W254 P0 probe
5. **Graphiti backend** policy decision required (FalkorDB SSPL vs Neo4j GPL vs Kuzu archived)
6. **W255 ZERO self-invent cleanup landed** — 64 rules + 33 hooks + 110 hook-cmds removed (-22,060 LOC)
7. **1M context** = SOTA primitive (Path D = REVERTED per W50F2 codification)
8. **Auto-compact at 70%** preserves re-inflate budget (W201 P0)
9. **Codex Path P** = canonical cross-model recovery path when nested subagent BRIDGE fails
10. **Tier-A (default mutation)** vs **Tier-B (broad coverage)** separation MANDATORY

## §6 — W256-unique research focus (gaps to fill)

Prior research undercovers these layers — W256 fills them:

| Layer | Why under-covered | W256 strategy |
|---|---|---|
| RAG/retrieval architectures | W252 flagged as critical gap | Score microsoft/graphrag, infiniflow/ragflow, HKUDS/LightRAG, raga-ai-hub, llama_index, haystack |
| Sandbox/code-exec | Only e2b + k8s-mcp scored | Add modal, daytona, agent-infra/sandbox, jupyter-mcp |
| Observability + tracing | Phoenix/Langfuse only — license AMBER | Add openobserve, logfire, braintrust, mlflow, openllmetry; resolve ELv2 boundaries |
| Knowledge-graph beyond Graphiti | Only Graphiti scored | Add microsoft/graphrag, kuzu, falkordb-py, mcp-knowledge-graph, graphify, neo4j-mcp |
| Q2 2026 CC features | Under-enumerated | Map sandboxing, MCPB, async-fork-worktree, hook semantics, claude-agent-sdk SHIPS |
| Agentic CLI runtimes | Only opencode/codex | Add aider, gpt-engineer, ralph-loop, cmux, ccswarm, manaflow-ai/cmux |
| LLM routing | Only Helicone + LiteLLM mentioned | Add tensorzero, portkey-ai, openrouter |
| Hooks frameworks | Only pre-commit + lefthook | Add disler/claude-code-hooks-mastery, disler/claude-code-hooks-multi-agent |
| MCP server enumeration | Only 5-6 from W253 | Probe top-50 from punkpeye/awesome-mcp-servers |
| Skills marketplace deep | 21 marketplaces but only 5 active | Audit cache; identify high-value un-leveraged |

## §7 — Parallel agent dispatch log

| Agent | Task | Output target |
|---|---|---|
| `a18733183f0169970` | R0 local artifact inventory (10K+ .md files) | tmp/w256-inventory-2026-05-16.md |
| `a09d8bcf1e0fb1f44` | R1 SOTA gap research (12+ GitHub probes) | tmp/w256-gap-research-2026-05-16.md |
| `aa9d96f7ba33d6cf4` | R1 plugin marketplace audit (21 marketplaces × 3574 skills) | tmp/w256-marketplace-audit-2026-05-16.md |

(Future: codex Path P adversarial review · per-layer deep-dive agents · cross-model scoring re-run)

## §8 — Next steps

1. Await 3 parallel agents (R0 + R1.gap + R1.marketplace)
2. Compose 17-layer rank docs from prior catalogs + new findings
3. Run R2 7-probe-DAG on adoption candidates
4. Codex Path P adversarial review (this wave's cross-model gate)
5. R3 axis-1+2+3 convergence on top candidates
6. R4 D1-D10 scoring refresh
7. R5 CR-12 disposition
8. Compose 99-FINAL-SYNTHESIS + 99-EXECUTIVE-BRIEF + 99-ARCHITECTURE-DESIGN
9. Move 500+ research artifacts into folder taxonomy
10. R7 artifact organization (low-quality → 06-archive/)

---

**Cite class** per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`:

```
constituents=[
  TIER-1-DIRECT @ Z:/claude-sota-installed/docs/outer research/grand-synthesis-w253-2026-05-15/ (W253 95-repo catalog),
  TIER-1-DIRECT @ Z:/claude-sota-installed/docs/outer research/research-wave-2026-05-15/ (W251-W254 ~10-folder structure),
  TIER-1-DIRECT @ Z:/claude-sota-installed/CLAUDE.md (cardinal rules + W255 cleanup state),
  TIER-1-DIRECT @ https://code.claude.com/docs/en/ (Anthropic CC official docs)
]
effective_tier=TIER-3-LOCAL-COMPOSITION (per citation-discipline.md rule #8 MIN_PRECEDENCE)
```
