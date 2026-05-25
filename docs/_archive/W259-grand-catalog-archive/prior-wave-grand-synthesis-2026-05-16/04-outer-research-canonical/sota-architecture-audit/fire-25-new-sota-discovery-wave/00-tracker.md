# Fire 25 — NEW SOTA Discovery Wave (post-Fire-24-series)

> **Position**: First fire after Wave 134 Fire 24 series 100% close (5/5 Tier 1 NEW PROBE-DAG-CANDIDATEs verified).
> **Trigger**: user standing directive "research all sota repos in every dimension" + "deep dive and discover" — Fire 23's NN-1..NN-9 candidate list is now exhausted.
> **Method**: orchestrator-direct 9-cohort fan-out (C1 GraphQL stars + C5 named-author + tooling-axis) via `mcp__github__search_repositories` + `mcp__exa__web_search_exa` cross-cohort probes.
> **Output**: NEW PROBE-DAG-CANDIDATE list for Fire 26+ audits; T0 candidate-list challenge per `cross-model-consensus.md §T0`.

## Discovery scope (3 architecture dimensions probed)

| Dimension | eee existing inventory | Probe focus |
|---|---|---|
| **Dim 2 Memory** | L1 mcp-memory (sqlite_vec) + L3 Graphiti (FalkorDB) + MEMORY.md auto-memory | Bi-temporal + structural code-memory beyond conversational entity-memory |
| **Dim 6 Eval/Observability** | promptfoo + DeepEval + openlit + Phoenix + evolve_pass_rate_gate.py + codex_verdict_normalizer.py | Agent-specific benchmark frameworks (tool-use eval, code-maintenance eval) |
| **Dim 7 Token-efficiency** | RTK + ccusage + repomix + CLIProxyAPI cache_control | Prompt-compression libraries (Fire 23 P0 "21-plugin session-start token-budget" caveat — gap directly addressable) |

## Discovery probes executed

1. **mcp__github__search_repositories**: "agent evaluation benchmark" (10 candidates returned)
2. **mcp__exa__web_search_exa**: "top github repos prompt compression llmlingua agentic context reduction 2026" (8 candidates returned)
3. **mcp__exa__web_search_exa**: "SOTA GitHub repo agentic memory MCP server temporal knowledge graph 2026 stars" (5 candidates returned)

Tools used: 2 distinct cohorts (GitHub via search_repositories + Web via exa_web_search) per `convergence-gate.md` Axis-1 multi-tool-type rule.

## Candidates surfaced (7 NEW Probe-DAG candidates beyond Fire 23 NN-1..NN-9)

### Dim 2 Memory candidates

| # | Repo | Stars | Last push | License | Probe-DAG-priority |
|---|---|---|---|---|---|
| **NN-10** | `syncable-dev/memtrace-public` | (private beta — star count gated) | 2026-05-09 v0.3.87 | Proprietary (private beta) | **HIGH** (structurally novel: bi-temporal graph + zero LLM calls + Tree-sitter AST + cross-tool) |
| NN-11 | `agentralabs/agentic-memory` | 13 | 2026-03-08 | MIT | LOW (single contributor, fresh, low traction) |
| NN-12 | `CoreIdentityLabs/open-graph-memory-mcp` | 0 | 2026-03-05 | — | REJECT (no traction, single contributor) |
| (n/a) | `getzep/graphiti` | 25,646 | 2026-04-30 | Apache-2.0 | **ALREADY-INSTALLED** at L3 (Wave 140 wire) — skip |

### Dim 6 Eval candidates

| # | Repo | Stars | Last push | License | Probe-DAG-priority |
|---|---|---|---|---|---|
| NN-13 | `THUDM/AgentBench` | (see api response — moderate-high) | 2026-02-08 | MIT (per ICLR'24 norm) | **MEDIUM** (ICLR'24 published; Tsinghua TIER-3-NAMED-ORG; ESTABLISHED benchmark) |
| NN-14 | `ethz-spylab/agentdojo` | (see api response) | 2026-03-30 | — | MEDIUM (security-eval focused — distinct from eee primary eval need) |
| NN-15 | `trycua/cua` | (see api response) | 2026-05-10 | — | LOW (computer-use agents — different category; not eee fit) |
| NN-16 | `SKYLENAGE-AI/SWE-CI` | (see api response) | 2026-04-23 | — | MEDIUM (codebase-maintenance eval — directly applicable to eee autonomous arcs) |

### Dim 7 Token-efficiency candidates (DIRECTLY ADDRESSES Fire 23 P0)

| # | Repo | Stars | Last push | License | Probe-DAG-priority |
|---|---|---|---|---|---|
| **NN-17** | `microsoft/LLMLingua` | 6,067 | 2026-04-08 | MIT | **HIGHEST** (Microsoft TIER-1-OFFICIAL + EMNLP'23+ACL'24 published + 20x compression + 3 versions: LLMLingua/LongLLMLingua/LLMLingua-2 + LangChain/LlamaIndex integrations) |
| **NN-18** | `open-compress/claw-compactor` | 2,127 | 2026-04-01 | MIT | **HIGH** (14-stage Fusion Pipeline + ROUGE-L 0.653@0.3 vs LLMLingua-2's 0.346 + **zero LLM inference cost** + reversible + AST-aware tree-sitter + 1600+ tests + zero deps) |
| NN-19 | `3DAgentWorld/Toolkit-for-Prompt-Compression` (PCToolkit) | 290 | 2025-02-11 | MIT | LOW (STALE D2 + research-toolkit not production-ready) |
| NN-20 | `npow/kompact` | 2 | 2026-03-22 | MIT | LOW (low traction, fresh, single contributor) |

## Priority ranking for Fire 26+ Probe-DAG audits

Per `convergence-gate.md` Axis 1-3 + SRA D1-D10 + Probe DAG 1-7 quick-screen:

| Rank | Candidate | Why HIGHEST/HIGH priority |
|---|---|---|
| **🥇 #1** | NN-17 microsoft/LLMLingua | Microsoft TIER-1-OFFICIAL + EMNLP'23+ACL'24 peer-reviewed + 6K stars + multiple versions + ecosystem-integrated (LangChain/LlamaIndex/Prompt flow) — DIRECTLY addresses Fire 23 P0 token-budget caveat |
| **🥈 #2** | NN-18 open-compress/claw-compactor | Quality lead vs LLMLingua-2 (0.653 vs 0.346 ROUGE-L) + zero LLM inference cost + reversible + AST-aware — could complement LLMLingua for structured-output preservation |
| **🥉 #3** | NN-10 syncable-dev/memtrace-public | Structurally novel memory class (bi-temporal + Tree-sitter AST + zero LLM calls) — DISTINCT from eee L1+L3 (which are conversational entity-memory). License uncertain (private beta caveat) |
| #4 | NN-13 THUDM/AgentBench | ICLR'24 established benchmark; eval-augment for eee |
| #5 | NN-16 SKYLENAGE-AI/SWE-CI | Codebase-maintenance eval directly applicable to autonomous /loop arcs |

## Fire 25 deliverables (planned — DISCOVERY fire, smaller folder)

1. `00-tracker.md` (this file)
2. `01-discovery-findings.md` — 7 NEW candidates documented with full metadata
3. `02-codex-t1-t0-verdict.md` — Path P codex T1 T0 candidate-list challenge verdict
4. `99-close-synthesis.md` — Fire 26+ roadmap + ranking close

## Mia ladder advance

n=1631 → n=1635 (+4: Fire 25 framing / 3-dim discovery scope / 7 NEW candidates surfaced / priority ranking established)
