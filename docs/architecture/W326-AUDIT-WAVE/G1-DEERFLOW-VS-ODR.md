# G1 — deer-flow vs open_deep_research (cohort MCDA, sca-v10 §5.7 operationalized)

**Wave**: W326 Stream G | **Date**: 2026-05-19 | **Tool**: `tools/sca-mcda-rank.py` (W326-G)

## Cohort

| Candidate | Stars | License | Pushed | MCP | Key delta |
|---|---|---|---|---|---|
| `bytedance/deer-flow` | 68,692 | MIT | 2026-05-19 | native (langchain-mcp-adapters + `extensions_config.json`) | super-agent harness, podcast/PPT gen, private knowledgebase |
| `langchain-ai/open_deep_research` | 11,432 | MIT | 2026-05-19 | native (`MCPConfig` + `load_mcp_tools()`) | Deep Research Bench #6 (GPT-5 0.4344), supervisor-subgraph, hierarchical parallel |

Sources: deepwiki 2026-05 ask_question (both repos) + `gh api repos/...` 2026-05-19.

## Scores (D2/D5/D9/D18/D35/D38/D39/D-EMP, 1-5 scale)

deer-flow: `[5,4,5,5,4,5,5,4]` weighted-equal (W=1.0 except D9=0.8)
ODR:       `[5,5,5,4,4,4,5,5]`

Both pass D-EMP HARD GATE (>=2). Both have 3-org-distinct anchors (bytedance corp + langchain + deepwiki|github|paper-rank).

## MCDA result (consensus across 4 methods)

| # | Candidate | SAW | TOPSIS | Borda | Consensus | ELECTRE kernel |
|---|---|---|---|---|---|---|
| 1 | **deer-flow** | 7.4 / r1 | 0.500 / r1 | 10 / r1 | 1.0 | yes (a1) |
| 2 | ODR | 7.4 / r2 | 0.500 / r2 | 14 / r2 | 2.0 | yes (a2) |

**Max rank spread**: 0 (no disagreement → no codex mediation fires). **ELECTRE I**: both candidates in kernel; concordance 0.74/0.74, discordance 1.0/1.0 → mutually-incomparable on min/max axes despite Borda agreement. **Tier**: BOTH T1-INSTALL-CANDIDATE per sca-v10 §7 (install_score `>=4.5` floor; conservative weighted-mean 7.4/8.8 = **0.84** normalized = **4.20/5** raw — needs full 36.8-denom run with remaining 38 dims for actual ratification).

## Verdict (cohort-level, W326-G)

1. **deer-flow MARGINAL-LEAD** by Borda count only (10 vs 14 points, lower=better); SAW + TOPSIS report **statistical tie**. Borda lead driven by D5 evaluation evidence (ODR 5 vs deer-flow 4: Deep Research Bench rank lifts ODR), counter-balanced by D18+D38 MCP-native depth (deer-flow 5/5 vs ODR 4/4: deer-flow has `extensions_config.json` plus subagent-delegation primitive ODR lacks).
2. **ELECTRE I incomparability** confirms **complementary-specialty hypothesis** — not redundancy. deer-flow = super-agent harness (content gen + private KB + Nginx/Next.js full stack); ODR = research-pipeline library (supervisor+researcher+compress subgraphs, embeddable).
3. **W326 P0 recommendation**: **DUAL-PATTERN-STUDY** (T3 both) for sca-v10 Phase-1 research-arch. Use ODR's `supervisor_subgraph`/`researcher_subgraph`/`compress_research` triad as Phase-2 cross-source triangulation reference; use deer-flow's middleware chain (thread isolation + sandbox + memory extraction) as Phase-6 codex-mediation reference.
4. **NOT T1 INSTALL** for either yet — both require full sca-v10 38-dim scoring + Phase 5 5-gate + Phase 6 codex GPT-5.5 review. Carry to W327.

## Replay

```bash
Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/tools/sca-mcda-rank.py \
  --cohort Z:/claude-sota-installed/docs/architecture/W326-AUDIT-WAVE/g1-cohort-deerflow-vs-odr.json \
  --out    Z:/claude-sota-installed/docs/architecture/W326-AUDIT-WAVE/g1-mcda-output.json
```

Raw output at `g1-mcda-output.json` (W326-G replayable trace, sca-v10 invariant I8 compliant).
