# 01 — Fire 25 Discovery Findings + Codex T1 Pattern B HNF Gap-Correction

> **Method**: orchestrator-direct 9-cohort fan-out via `mcp__github__search_repositories` + `mcp__exa__web_search_exa`
> **Codex T1**: Pattern B HONEST-NON-FINDING (1870-line trace, no terminal JSON verdict)
> **Critical Mia pre-apply finding**: Fire 25 probe was BACKWARDS — should have audited existing `docs/outer research/kits/v40-v61` BEFORE external discovery

## Original Fire 25 candidates (7 NEW, from external discovery)

### Dim 2 Memory (3)

| # | Repo | Stars | Last push | License | Status |
|---|---|---|---|---|---|
| NN-10 | syncable-dev/memtrace-public | private beta | 2026-05-09 v0.3.87 | Proprietary | **HIGH priority** — structurally novel bi-temporal + tree-sitter AST |
| NN-11 | agentralabs/agentic-memory | 13 | 2026-03-08 | MIT | LOW (single contributor) |
| NN-12 | CoreIdentityLabs/open-graph-memory-mcp | 0 | 2026-03-05 | — | REJECT |

### Dim 6 Eval (4)

| # | Repo | Stars | Last push | License | Status |
|---|---|---|---|---|---|
| NN-13 | THUDM/AgentBench | — | 2026-02-08 | MIT | MEDIUM (ICLR'24) |
| NN-14 | ethz-spylab/agentdojo | — | 2026-03-30 | — | MEDIUM (security-eval) |
| NN-15 | trycua/cua | — | 2026-05-10 | — | LOW (computer-use category) |
| NN-16 | SKYLENAGE-AI/SWE-CI | — | 2026-04-23 | — | MEDIUM (codebase-maintenance eval) |

### Dim 7 Token-eff (4)

| # | Repo | Stars | Last push | License | Status |
|---|---|---|---|---|---|
| NN-17 | microsoft/LLMLingua | 6,067 | 2026-04-08 | MIT | **HIGHEST** (Microsoft TIER-1 + EMNLP'23+ACL'24) |
| NN-18 | open-compress/claw-compactor | 2,127 | 2026-04-01 | MIT | **HIGH** (ROUGE-L 0.653 vs LLMLingua-2's 0.346) |
| NN-19 | 3DAgentWorld/PCToolkit | 290 | 2025-02-11 | MIT | LOW (STALE D2 + research-toolkit) |
| NN-20 | npow/kompact | 2 | 2026-03-22 | MIT | LOW (no traction) |

## 🚨 Critical Mia pre-apply finding from codex T1 trace

Codex T1 trace (before Pattern B timeout) revealed **Fire 25 discovery wave was BACKWARDS-DIRECTED**: it ran external GitHub/Exa discovery WITHOUT first auditing what's already in the user's `docs/outer research/kits/v40-v61` baseline. The trace surfaced 7+ HIGH-VALUE repos ALREADY in existing kits that Fire 25's external probe missed:

| # | Repo (from existing kits) | First kit appearance | Why HIGH-VALUE for eee |
|---|---|---|---|
| **NN-21** | `openai/openai-agents-python` | v53/v54/v55/v61 | OpenAI SOTA agent SDK — cross-vendor reference architecture |
| **NN-22** | `mem0ai/mem0` | v61 | Memory layer for AI agents — Dim 2 candidate |
| **NN-23** | `langchain-ai/langgraph` | v61 | Graph-based agentic orchestration — Dim 1 topology candidate |
| **NN-24** | `cisco-ai-defense/mcp-scanner` | v40/v53/v54/v55/v61 | **MCP security scanning** — 917★ Apache-2.0 (per codex live GitHub API probe in trace); LICENSE permissive; directly applicable to eee 23-MCP inventory |
| **NN-25** | `InvariantLabs-ai/mcp-scan` | v40/v53/v54/v55/v61 | Alternative MCP scanner — Dim 5 hooks/safety |
| **NN-26** | `snyk/agent-scan` | v53/v54/v55/v61 | Snyk security scanner — Dim 5 hooks/safety |
| **NN-27** | `MCP-Defender` | v53/v61 | MCP defender — Dim 5 hooks/safety |

**Pattern detected**: NN-24/25/26/27 form a **MCP-SECURITY-SCANNING COHORT** that eee has NOT audited despite eee having 23 active MCP servers. This is a Dim 5 (hooks/safety) gap that Fire 25 missed via external probe but codex T1 surfaced via cross-reference search.

## Codex T1 cisco-ai-defense/mcp-scanner LIVE metadata (verified via trace)

Captured by codex T1 PowerShell `Invoke-RestMethod` mid-trace:

```json
{
  "repo": "cisco-ai-defense/mcp-scanner",
  "stars": 917,
  "forks": 110,
  "pushed": "2026-05-08T22:23:57Z",
  "license": "Apache-2.0",
  "archived": false,
  "description": "Scan MCP servers for potential threats & security findings."
}
```

- **Cisco** TIER-1-OFFICIAL named-org ✅
- 917★ moderate-high
- Active (pushed 2026-05-08; 2 days ago)
- Apache-2.0 permissive ✅
- Direct applicability to eee 23-MCP inventory

This is HIGHEST-PRIORITY candidate from the codex-mined gap-finding.

## Revised Probe-DAG candidate ranking (incorporating codex T1 gap-correction)

| Rank | Candidate | Why |
|---|---|---|
| **🥇 #1** | **NN-24 cisco-ai-defense/mcp-scanner** | Cisco TIER-1 + 917★ Apache-2.0 + active + DIRECTLY applicable to eee 23-MCP inventory (Dim 5 hooks/safety gap); kit-v40+v53+v54+v55+v61 cohort convergence proves user's external research already endorsed |
| **🥈 #2** | NN-17 microsoft/LLMLingua | Microsoft TIER-1 + peer-reviewed + Fire 23 P0 token-budget gap |
| **🥉 #3** | NN-18 open-compress/claw-compactor | Quality lead vs LLMLingua-2 + zero LLM inference cost |
| #4 | NN-22 mem0ai/mem0 | Memory layer — Dim 2 candidate (v61 kit endorsed) |
| #5 | NN-21 openai/openai-agents-python | OpenAI SOTA SDK — cross-vendor reference |
| #6 | NN-23 langchain-ai/langgraph | Agentic orchestration — Dim 1 topology |
| #7 | NN-10 syncable-dev/memtrace-public | Structurally novel memory — but license uncertain (private beta) |
| #8 | NN-13 THUDM/AgentBench | Eval-augment — ICLR'24 established |

## Pattern B HNF disposition (per codex-t1-fix-forward-pattern.md §Pattern B)

Codex T1 hit Pattern B (1870-line trace, no terminal JSON verdict due to budget exhaustion during deep cross-reference investigation). Per Pattern B recovery:

> "Mine trace for line-cited evidence + ship as-designed + T3 verify"

Trace contains:
1. 7+ NEW candidates surfaced via cross-reference (NN-21 through NN-27)
2. Live GitHub API metadata for cisco-ai-defense/mcp-scanner verified
3. Self-finding: Fire 25 probe was BACKWARDS — should audit existing kits before external discovery

**Recovery action**: ship Fire 25 close with this HNF disposition + integrate codex-mined candidates as Fire 26+ Probe-DAG priorities.

## Mia ladder advance

n=1635 → n=1643 (+8: 7 original Fire 25 candidates documented / Pattern B HNF disposition / codex-trace gap-correction surfaced 7+ existing-kit candidates / cisco-ai-defense/mcp-scanner LIVE metadata captured / revised top-8 ranking / Fire 25 backwards-probe self-finding / Mia pre-apply lesson for future fires: AUDIT EXISTING KITS FIRST before external discovery)
