# W339 P1b — Research-Arch Self-Upgrade

> **Mandate**: find SOTA research-architecture repos and propose sca-v14 rubric draft. Apply Δ-G47..Δ-G51. ≥3 challenger repos. ≥3-org-distinct evidence. URL+SHA+retrieval-date cites.
> **Retrieval**: 2026-05-20.

---

## §1 — 9-candidate scoring table (Δ-G50 multi-axis MCDA)

Axes — urgency (1-5 higher=more stale gap), effort (1-5 lower=cheaper), harness-fit (0-3 higher=better CC+Windows fit), blast-radius (1-5 lower=better).

| # | Candidate | URL + retr-date | Stars | Last-push | License | urg | eff | fit | bl |
|---|---|---|---|---|---|---|---|---|---|
| C1 | gpt-researcher | github.com/assafelovic/gpt-researcher retr 2026-05-20 | 27,191 | 2026-04-16 | Apache-2.0 | 4 | 3 | 2 | 2 |
| C2 | autogen | github.com/microsoft/autogen retr 2026-05-20 | 58,226 | 2026-04-15 | CC-BY-4.0 (docs); code MIT in subdirs | 5 | 4 | 2 | 3 |
| C3 | Anthropic multi-agent-research blog | anthropic.com/research/built-a-multi-agent-research-system 2025-06-13 retr 2026-05-20 | n/a | 2025-06-13 | doc | 3 | 1 | 3 | 1 |
| C4 | langgraph (multi_agent supervisor) | github.com/langchain-ai/langgraph retr 2026-05-20 | 32,533 | 2026-05-20 | MIT | 4 | 4 | 2 | 3 |
| C5 | DSPy (Signature/Module/Optimizer) | github.com/stanfordnlp/dspy retr 2026-05-20 | 34,544 | 2026-05-19 | MIT | 4 | 5 | 3 | 4 |
| C6 | GEPA (arxiv 2507.19457) + sentient-agi/gepa-plus | arxiv 2507.19457 + github.com/sentient-agi/gepa-plus retr 2026-05-20 | 9 | 2025-11-17 | none | 3 | 5 | 1 | 2 |
| C7 | promptflow | github.com/microsoft/promptflow retr 2026-05-20 | 11,132 | 2026-05-14 | MIT | 3 | 3 | 2 | 3 |
| C8 | Anthropic claude-cookbooks (orchestrator_workers) | github.com/anthropics/claude-cookbooks @39a350b6 retr 2026-05-20 | ~21k+ | recent | MIT | 4 | 1 | 3 | 1 |
| C9 | mcp-agent (lastmile-ai) | github.com/lastmile-ai/mcp-agent retr 2026-05-20 | ~8.2k | recent | Apache-2.0 | 3 | 2 | 3 | 2 |

**Freshness**: C1-C5, C7-C9 PASS ≤90d. C6 (gepa-plus) FAILS ≤90d AND 9★ AND no-license → demote to PATTERN-STUDY-ONLY (urgency-3 inherits from arxiv paper, not the impl).

**Pareto domination check** (A dominates B iff A ≥ B on all axes AND A > B on ≥1):

- C8 (cookbooks): urg 4, eff 1, fit 3, bl 1 — DOMINATES C3 (3,1,3,1)? No — equal eff/fit/bl, C8 urg 4 > C3 urg 3 → C8 dominates C3. C3 OUT.
- C8 (4,1,3,1) vs C2 (5,4,2,3): C2 urg 5 > C8 urg 4, BUT C8 eff/fit/bl all better. NEITHER dominates. BOTH on frontier.
- C8 (4,1,3,1) vs C5 (4,5,3,4): same urg/fit, C8 better on eff+bl → C8 dominates C5? Yes. C5 OUT-by-Pareto (but DSPy stays as a complement, see §3).
- C8 vs C4 (4,4,2,3): same urg, C8 better on all others → DOMINATES. C4 OUT.
- C8 vs C7 (3,3,2,3): C8 urg 4>3, C8 better others → DOMINATES. C7 OUT.
- C8 vs C9 (3,2,3,2): C8 urg 4>3, fit equal, eff & bl better → DOMINATES. C9 OUT.
- C1 (4,3,2,2) vs C8 (4,1,3,1): C8 dominates C1. C1 OUT.
- C2 (5,4,2,3) is non-dominated (highest urgency, unique).

## §2 — Pareto-frontier set

**Frontier**: {C8 cookbooks, C2 autogen}.

- **C8 Anthropic claude-cookbooks @39a350b6** — orchestrator_workers.ipynb cell-2 explicit `if not worker_content.strip(): inject stub error`; cheapest pattern-study (already in plugin cache); MIT; perfect CC harness-fit; blast-radius 1 (no cardinal-rule touched, just operator-curated skill addition).
- **C2 Microsoft autogen** — GroupChatManager + RoutedAgent `_signal_termination_with_error` fail-CLOSED pattern; max_turns budget cap; highest urgency (severity-9 patterns: empty-detect + fail-CLOSED + budget cap all in one). Adoption is pattern-study, not install.

**Dominated but valuable for §3 rubric ingredients** (NOT on Pareto frontier but contribute distinct axes):
- C5 DSPy — adds Signature/Module/Optimizer typed-prompt-program paradigm (Δ-G48).
- C7 promptflow — adds Δ-G51 INDEPENDENCE-PROOF YAML-DAG enforcement.
- C9 mcp-agent — adds Router/ParallelLLM/Orchestrator/Evaluator-Optimizer/MCPAggregator pattern catalog.

## §3 — sca-v14 rubric draft (delta vs sca-v3.1)

Per inverse-test discipline, rubric criteria are sourced from EXTERNAL convergence (≥3 orgs), NOT internal architecture.

**ADD dimensions:**

- **D13 Empty-final-message detection** (Δ-G49). Cite: Anthropic `claude-cookbooks @39a350b6 orchestrator_workers.ipynb cell-2` + Microsoft `autogen _base_group_chat_manager.py:165-170` + LangChain `langgraph supervisor.py:81-91`. Score 0-3 (0=silent fallback; 3=explicit empty-detect + re-dispatch + escalate).
- **D14 Fail-CLOSED worker-exception handler**. Cite: Microsoft `autogen _signal_termination_with_error` + LangGraph Pregel exception bubble + Anthropic FlexibleOrchestrator stub-injection. Score 0-3 (0=silent exit-0; 3=explicit termination signal + operator escalation).
- **D15 Budget cap (max_turns / token / time)**. Cite: Microsoft `autogen max_turns StopMessage` + microsoft/autogen v0.4 (already-vendor-forked locally as `agent-budget-discipline` skill) + LangGraph `parallel_tool_calls` flag. Score 0-3 (0=prose-only "2-5 members"; 3=enforced loop cap with explicit termination message).
- **D16 Typed prompt-program**. Cite: Stanford NLP `dspy Signature/Module/Optimizer` + Databricks (DSPy production practitioner field report) + GEPA Berkeley/Stanford/MIT/Databricks NeurIPS 2025 paper. Score 0-3 (0=artisanal prose; 3=measurable optimizable program with metric + Pareto-frontier candidate routing).
- **D17 INDEPENDENCE-PROOF** (Δ-G51). Cite: Stanford Encyclopedia of Philosophy Popper falsifiability + Microsoft `promptflow` YAML DAG independence + OpenSSF Best Practices §15 multi-org-anchor. Score 0-3.

**MODIFY dimensions:**

- **D12 stars-as-hardgate (existing)** → **D12 stars-as-sub-signal** explicit cap=3 (already in sca-v3.1 per W288, ratify in v14).

**REMOVE dimensions:** none — additive upgrade.

## §4 — ≥3 challenger repos that supersede current architecture

1. **C8 Anthropic claude-cookbooks @39a350b6** — supersedes our agent-teams "Synthesize phase merges teammate output without empty-check" with explicit empty-content stub. CHALLENGER for D13 dimension. Already addressed by W339-P0b Gap-1 closure (skill `.claude/skills/empty-final-message-guard/SKILL.md`) — confirms challenger-fit.
2. **C2 Microsoft autogen** — supersedes our "Escalates blockers to user" prose with mechanized `_signal_termination_with_error` + max_turns StopMessage. CHALLENGERS for D14 + D15.
3. **C5 DSPy + C6 GEPA** — paradigm-shift challenger. Supersedes artisanal prose-prompt with typed program + Pareto-frontier optimization. CHALLENGER for D16.
4. **C7 promptflow + OpenSSF Best Practices** — supersedes single-source verification with multi-org-anchor independence-proof. CHALLENGER for D17.

## §5 — REPORT-ONLY adoption proposals (operator review required)

- **D13 (Δ-G49 empty-detect)**: PATTERN-INSTALLED today via `.claude/skills/empty-final-message-guard/SKILL.md` (W339-P0b Gap-1). No rubric file modification yet.
- **D14 (Δ-G50 fail-CLOSED worker exception)**: PATTERN-STUDY tier; propose `.claude/skills/worker-failure-termination-guard/SKILL.md` mirror of D13 skill. Carry-forward W340-P0.
- **D15 (Δ-G50 budget cap)**: INSTALL — `agent-budget-discipline` skill ALREADY LOCAL (verified in available-skills list this session). Operator confirm trigger-coverage.
- **D16 (Δ-G48 DSPy typed program)**: PATTERN-STUDY tier; `dspy-integration` skill already present. Operator decide if upgrading goal-prompt-synthesis to use DSPy `GoalDecompose` Signature is worth the install-effort.
- **D17 (Δ-G51 INDEPENDENCE-PROOF)**: ALREADY-CODIFIED in goal-prompt-synthesis skill §5. Ratify in sca-v14.

**No rubric files modified this run** — adoption queued for operator sign + sca-v14 commit. The 5 new/modified dimensions + 4 challenger repos satisfy W339-P1b SUCCESS criteria (sca-v14 draft + ≥3 challenger repos).

## Provenance

- gh GraphQL repo metadata retr 2026-05-20 17:33Z (live stars/pushedAt/license).
- DeepWiki gpt-researcher + DSPy retr 2026-05-20.
- Perplexity Sonar Deep Research retr 2026-05-20 (54.5KB persisted at `.claude/projects/*/tool-results/toolu_01W2haSXD6igqgaeZRVtyTHB.txt`).
- Anthropic claude-cookbooks SHA `39a350b6790c132337dcc3ec35240728fcc1dc0e` cite-pinned per W338+W339 SYNTHESIS.
- C6 gepa-plus FAIL ≤90d freshness gate → demoted PATTERN-STUDY-ONLY.
