# W331 Task Plan (planning-with-files §2)

> Wave **W331** · 2026-05-19 · Per OthmanAdi/planning-with-files convention. Task decomposition feeds 8-cluster parallel deep-dive + downstream synthesis.

## §1 Master task

**Goal**: Achieve W331 SOTA convergence by line-by-line ingest of 21 SOTA repos across 8 thematic clusters; absorb findings into W330-MEGA-AUDIT REMEDIATION-PLAN-V2; codex GPT-5.5 round-2 APPROVE before merge.

## §2 Task graph

### Stage 0: Foundation lock (BLOCKING)

| Task ID | Title | Owner | Status | Blocks |
|---|---|---|---|---|
| W331-T0.1 | W330-MEGA-AUDIT delivered (foundation) | main | ✅ COMPLETE | All |
| W331-T0.2 | GOAL-W331 paste-ready predicate | main | ✅ COMPLETE | T1.1 |
| W331-T0.3 | W331-DEEP-DIVE-LINE-BY-LINE directory | main | ✅ COMPLETE | T1.* |
| W331-T0.4 | SYNTHESIS.md skeleton | main | ✅ COMPLETE | T2.* |

### Stage 1: 8-cluster parallel deep-dive (IN FLIGHT)

| Task ID | Title | Owner agent | Status | Output file |
|---|---|---|---|---|
| W331-T1.A | Cluster A: Anthropic-official deep-dive | a7d1fcc7c6e19805c | ⏳ IN PROGRESS | `cluster-A-anthropic-official.md` |
| W331-T1.B | Cluster B: OpenAI/Codex SDK deep-dive | afe0bf901d1816ff9 | ⏳ IN PROGRESS | `cluster-B-openai-codex.md` |
| W331-T1.C | Cluster C: MCP foundation deep-dive | a89ae30895f800d99 | ⏳ IN PROGRESS | `cluster-C-mcp-foundation.md` |
| W331-T1.D | Cluster D: Agent frameworks deep-dive | a676bdaf89ac3474d | ⏳ IN PROGRESS | `cluster-D-agent-frameworks.md` |
| W331-T1.E | Cluster E: Memory/RAG deep-dive | ab144141ba821573c | ⏳ IN PROGRESS | `cluster-E-memory-rag.md` |
| W331-T1.F | Cluster F: LLM proxies + DSL deep-dive | aaadfa8a47b445ad5 | ⏳ IN PROGRESS | `cluster-F-llm-proxies-dsl.md` |
| W331-T1.G | Cluster G: Evals + observability deep-dive | a33b53e817469ffe2 | ⏳ IN PROGRESS | `cluster-G-evals-observability.md` |
| W331-T1.H | Cluster H: Plugin ecosystem deep-dive | a5061e582d80313ab | ⏳ IN PROGRESS | `cluster-H-plugin-ecosystem.md` |

### Stage 2: Synthesis (BLOCKED on T1.*)

| Task ID | Title | Owner | Status | Output file |
|---|---|---|---|---|
| W331-T2.1 | Populate SYNTHESIS §2 cluster summary table | main | 🔒 BLOCKED on T1.A-H | `SYNTHESIS.md` |
| W331-T2.2 | Populate SYNTHESIS §3 cross-cluster themes | main | 🔒 BLOCKED on T1.A-H | `SYNTHESIS.md` |
| W331-T2.3 | Populate SYNTHESIS §4 per-cluster verdicts | main | 🔒 BLOCKED on T1.A-H | `SYNTHESIS.md` |
| W331-T2.4 | Populate SYNTHESIS §5 W330 P0 cross-mapping | main | 🔒 BLOCKED on T1.A-H | `SYNTHESIS.md` |
| W331-T2.5 | Populate SYNTHESIS §7 cite-anchors | main | 🔒 BLOCKED on T1.A-H | `SYNTHESIS.md` |

### Stage 3: Codex round-1 dual-axis adversarial review (BLOCKED on T2.*)

| Task ID | Title | Owner | Status | Output file |
|---|---|---|---|---|
| W331-T3.1 | Codex round-1 axis-1 (PROCESS) | codex GPT-5.5 | 🔒 BLOCKED on T2.* | `CODEX-ROUND-1.md` |
| W331-T3.2 | Codex round-1 axis-2 (CONTENT) | codex GPT-5.5 | 🔒 BLOCKED on T2.* | `CODEX-ROUND-1.md` |
| W331-T3.3 | Codex position-swap round-1 | codex GPT-5.5 | 🔒 BLOCKED on T3.1+T3.2 | `CODEX-ROUND-1-SWAP.md` |
| W331-T3.4 | Codex convergence-vs-divergence verdict | main | 🔒 BLOCKED on T3.3 | `CODEX-VERDICT-LEDGER.md` |

### Stage 4: Absorb + REMEDIATION-PLAN-V3 (BLOCKED on T3.*)

| Task ID | Title | Owner | Status | Output file |
|---|---|---|---|---|
| W331-T4.1 | Absorb codex findings inline | main | 🔒 BLOCKED on T3.4 | `SYNTHESIS.md` |
| W331-T4.2 | Re-dispatch codex round-2 | codex GPT-5.5 | 🔒 BLOCKED on T4.1 | `CODEX-ROUND-2.md` |
| W331-T4.3 | REMEDIATION-PLAN-V3 author | main | 🔒 BLOCKED on T4.2 APPROVE | `../W331-REMEDIATION-PLAN-V3/REMEDIATION-PLAN-V3.md` |

### Stage 5: Operator-confirmation + merge (BLOCKED on T4.* + operator)

| Task ID | Title | Owner | Status |
|---|---|---|---|
| W331-T5.1 | Operator review of REMEDIATION-PLAN-V3 | operator | 🔒 BLOCKED on T4.3 |
| W331-T5.2 | Apply CLAUDE-MD-EDIT-PROPOSAL CR-1..5 | main | 🔒 BLOCKED on T5.1 |
| W331-T5.3 | Branch rebase + force-with-lease | main | 🔒 BLOCKED on T5.2 |
| W331-T5.4 | Tag W331-CONVERGED + archive Status | main | 🔒 BLOCKED on T5.3 |

## §3 Budget tracking

Per GOAL-W331 MANDATES Δ-PDM-2:
- **Calls budget**: ≤15 Agent calls per cluster (≤120 total across 8 clusters)
- **Token budget**: ≤140k tokens per cluster (≤1.12M total)
- **F4 mandate**: NO inline repomix-pack in worker prompts (file-path passing only)
- **F5 mandate**: Empty final_message → retry once + escalate
- **Skeleton-first Δ-DPA-1**: Each cluster MUST emit a skeleton FIRST then populate

## §4 Risk register

| Risk | Mitigation | Owner |
|---|---|---|
| Agent timeout / silent-block | F4 file-path passing; F5 detect-and-retry | main |
| Cluster overlap (same repo cited in 2 clusters) | Cluster ownership table §1 of SYNTHESIS | main |
| ≥3-org-distinct cite gap | Stage-0 multi-family probe MUST fire ≥3 families per cluster | each subagent |
| Codex round-1 NEEDS-REVISION | Absorb-and-redispatch pattern (W330 precedent) | main |
| Operator-decision lag at T5.1 | Pre-author REMEDIATION-PLAN-V3 with G-matrix operator-options | main |
| Worktree rebase conflict on push | --force-with-lease (NOT --force) per W280d | main |

## §5 Next actions

1. ⏳ Wait for cluster-A-H completion notifications.
2. As each cluster completes: populate §2 cluster summary row in SYNTHESIS.md.
3. When all 8 complete: §3 cross-cluster themes synthesis + §4 per-cluster verdicts.
4. Dispatch codex round-1 axis-1 + axis-2 (single-message parallel per W269 mandate).
5. Position-swap re-dispatch.
6. Author REMEDIATION-PLAN-V3 with operator-decision-matrix.
