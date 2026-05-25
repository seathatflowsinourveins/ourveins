# W340 — Full SOTA Unleash (task_plan)

> **Date**: 2026-05-20
> **Trigger**: operator W339 closure + "resolve all + optimize entire system with SOTA ecosystem" mandate
> **Prior wave**: W339 closed P0a/P0b-Gap-1/P0c/P1a/P1b/P1c; carry-forwards documented in W339 SYNTHESIS.md
> **Constraint**: W338-CPA-ROUTER M1 — parallel dispatch ≤3 per assistant turn (529-storm avoidance)
> **Discipline**: empty-final-message-guard (Δ-G49) + worker-failure-termination-guard (Δ-G50) + FQN subagent_type (W333-D-5)

## Streams (11 work-items, 3 parallel dispatch agents)

| # | Stream | Carrier | Status |
|---|---|---|---|
| **S1** | W339.1 4 source families (Perplexity + DeepWiki + Repomix + awesome-list line-by-line) for 10 candidate repos | Agent-1 (general-purpose) | DISPATCHED |
| **S2** | MCP server health probe (all `.mcp.json` servers) | Agent-2 (devops-troubleshooter) | DISPATCHED |
| **S3** | Plugin drift sweep (64 installed plugins vs upstream SHA) | Agent-2 | DISPATCHED |
| **S4** | Pre-commit gate fire test (cr2-2kb-hooks + gitleaks + ruff + shellcheck) | Agent-2 | DISPATCHED |
| **S5** | P0d junction `1.0.141 → 1.0.146` removal safety check | Agent-2 | DISPATCHED |
| **S6** | sca-v14 D13-D17 + D12-mod committable diff | Agent-3 (general-purpose) | DISPATCHED |
| **S7** | W338-CPA-ROUTER-SOTA-PATCHES untracked-dir integration decision | Agent-3 | DISPATCHED |
| **S8** | CLAUDE.md drift survey (W337 block vs current runtime counts) | Agent-3 | DISPATCHED |
| **S9** | Settings.json full SOTA audit (cross-ref Anthropic CC 2026 features) | Agent-3 | DISPATCHED |
| **S10** | Fork anti-finding (Δ-G49) meta-investigation hypothesis | Agent-3 | DISPATCHED |
| **S11** | Wave-close synthesis + final commit | Orchestrator (inline) | PENDING |

## Anti-pattern guards in flight

- Empty-final-message detection per Anthropic claude-cookbooks `orchestrator_workers.ipynb` cell-2 + Microsoft autogen + LangChain langgraph 3-org-distinct convergence
- Fail-CLOSED worker exception per autogen `_signal_termination_with_error` + LangGraph Pregel
- FQN subagent_type (e.g. `incident-response:devops-troubleshooter`, NOT bare `devops-troubleshooter`)
- M1 dispatch cap ≤3 per turn (operator-runtime-mitigation W338-CPA-ROUTER)

## Verification gates (per Cardinal Rule 6)

Each stream MUST cite verifiable evidence in its output: command exit codes, file paths + line numbers, codex round verdict, or HTTP status. Empty findings → explicit `NO-FINDINGS:<rationale>`.
