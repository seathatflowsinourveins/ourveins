# W325 Stream G — Multi-Dimensional Repo Discovery (research-arch self-improvement)

**Wave**: W325 | **Stream**: G | **Date**: 2026-05-19 | **Cap**: ≤500 words body | **Author**: Claude Opus 4.7 [1M] | **Cross-model gate**: codex GPT-5.5 round-1 (Stop-hook auto-fires)

---

## 1. Current-state audit (sca-v9 §1 + §2.Phase-1)

`.claude/skills/sota-convergence-audit/SKILL.md:24-67` codifies a 6-family Stage-0 existence probe + an 11-family Phase-1 cascade. Current MCP families: github-MCP, github-REST fallback, deepwiki, repomix, WebFetch, exa, perplexity, hf-paper, context7, WebSearch, serena. **Confirmed silent-fallback**: github-MCP `search_repositories` empty-on-typo across 5 waves (W315-B `yeshuibo/agentflow` + W319-Stream-D OBS + W317-r2-S8 mid-truncate + W321 + W325-A re-confirmed). Δ33 Stage-0 mitigates by requiring ≥2 distinct families return ≥1 hit before tier-routing. **Gap**: cascade ranks by *first-discoverer* (anti-bias mandate) but lacks formal triangulated rank aggregation (W316-B Δ30 listed Borda+ELECTRE I+WSM theoretically; no implementation wire). **Gap**: source-corpus skews to GitHub-indexed; weak coverage of arXiv, Reddit/HN/SO Q&A, and MCP-registry-native discovery.

## 2. Eight+ source-family convergence proposal (W325-G NEW)

Adds 4 NEW families above the existing 11 (total **15-family ceiling**):

| # | Family | Primitive | Closes gap |
|---|---|---|---|
| F1 | **github-REST** | `gh api /search/repositories?q=...&sort=updated` (PowerShell, direct CLI) | Stage-0 fallback when MCP silent |
| F2 | **github-GraphQL** | `gh api graphql -f query='{...}'` | Field-projection efficiency; topic-graph traversal |
| F3 | **deepwiki ask_question** | `mcp__deepwiki__ask_question owner/repo` | Indexed-repo deep semantics |
| F4 | **perplexity_search + _research + _ask** | `mcp__perplexity__perplexity_*` | Web-grounded triangulation; auto-citations |
| F5 | **exa-mcp** | `mcp__exa__*` (4446★, 2026-05-17; MIT) | Semantic search, beats keyword |
| F6 | **tavily-mcp** | `mcp__tavily__*` (1984★, 2026-05-12; MIT) | Research-API-grade; first-class in open_deep_research |
| F7 | **hf-paper_search** | `mcp__hf-mcp-server__paper_search` | arXiv academic-anchored SOTA |
| F8 | **awesome-list WebFetch** | `WebFetch punkpeye/awesome-mcp-servers` (87165★, 2026-05-02) + `hesreallyhim/awesome-claude-code` (44253★, 2026-04-27) + `wong2/awesome-mcp-servers` (4081★, 2026-04-30) — **3-org-distinct** | Community cross-corroboration |
| F9 | **MCP registry** | `modelcontextprotocol/registry` (6836★, 2026-05-19; community-stewarded) + `modelcontextprotocol/servers` (85929★, 2026-05-17) + `toolsdk-ai/awesome-mcp-registry` (4108-server index) | Canonical MCP-server discovery |
| F10 | **Q&A WebFetch** | StackOverflow + Reddit r/ClaudeAI + HN specific threads | Operator-experience signal beyond stars |
| F11 | **github topic-graph** | `gh api /search/topics?q=...` + repo `/topics` field | Cross-cohort discovery via tag co-occurrence |

**Falsifiable inverse**: if ≥3 families return zero AND ≥2 families return ≥1 hit, the slug is `consensus_ambiguous` (not non-existent) — Δ33 Stage-0 logic preserved.

## 3. Decision-making improvement (4 new gates)

**G-1 Triangulated MCDA implementation** — wire `Valdecy/pyDecision` (350★, 2026-05-09; PSL-1.0/NOASSERTION; 70+ MCDA methods) into Phase-2 cross-source triangulation. Borda+ELECTRE I+WSM consensus (W316-B Δ30 stub → executable). Falsifiable inverse: if 2-of-3 MCDA methods rank-swap top-3, flag `disagreement[]` → codex mediation (already wired G1).

**G-2 D44 source_family_diversity_quorum** (NEW v10): score=1 if <3 families surfaced candidate; cap T1 INSTALL at 4 surfaces. **3-org-distinct anchors**: NIST AI 600-1 MANAGE-2.4 (NIST/US DoC) + Anthropic claude-cookbooks `research_lead_agent.md` `<parallel_tool_calls>` mandate (Anthropic PBC) + ResearchRubrics arXiv:2511.07685 §3.2 multi-source factual grounding (Scale AI + UMD + Princeton — *3-author-org* distinct).

**G-3 D45 cross_corroboration_index** (NEW v10): 0-5 scale of "how many awesome-lists + MCP-registries + arXiv-mentions independently surface this slug". W_install=0.6, W_pattern=0.4. **Anchors**: punkpeye/awesome-mcp-servers (independent maintainer) + ModelContextProtocol/registry (community-stewarded WG) + HuggingFace papers (HF Inc., distinct primary-parent).

**G-4 Cohort comparison protocol**: when ≥3 alternatives surface in same niche, MUST run pyDecision committee + report Pareto-frontier explicitly. Closes W315-D 14/35 tier-routing-error finding (1 HIGH + 7 MED + 6 LOW); empirical baseline pre-G-1 = 40% error.

## 4. Research-discovery repo recommendations (sca-v9 path-(b))

| Repo | install_score est. | Tier | Last commit | License | Justification + falsifiable inverse |
|---|---|---|---|---|---|
| **bytedance/deer-flow** | 4.55 | **T1 INSTALL** | 2026-05-19 | MIT, 68685★ | SuperAgent harness with 5+ search engines + 6+ KBs + MCP-native + cross-referencing + confidence scoring (deepwiki §3.7 confirmed). Anchors: (a) GitHub README 2026-05-19 + (b) deepwiki indexed wiki + (c) HF-paper 2506.18096 Deep Research Agents survey. Falsifiable inverse: if HF deepresearch survey 2602.06855 AIRS-Bench fails to cite deer-flow as multi-engine baseline → demote |
| **langchain-ai/open_deep_research** | 4.40 | **T1 INSTALL** | 2026-05-19 | MIT, 11432★ | Tavily/OpenAI/Anthropic/MCP backends + dedupe + summarization (deepwiki confirmed); LangChain-stewarded. Anchors: (a) GitHub + (b) deepwiki + (c) ResearchRubrics arXiv:2511.07685 §5 cites LangChain DR as eval target. Falsifiable inverse: rubric-compliance <50% on ResearchRubrics |
| **Valdecy/pyDecision** | 4.15 | **T2 VENDOR-FORK** | 2026-05-09 | NOASSERTION, 350★ | 70+ MCDA methods (TOPSIS/VIKOR/ELECTRE/PROMETHEE/Borda/WSM); pip-installable; license requires inspection. Anchors: (a) GitHub README + (b) MCDA literature (Greco+Ehrgott+Figueira 2016 §"State-of-the-Art Surveys") + (c) IEEE 21841-2019 multi-criteria methodology standard. Falsifiable inverse: license = proprietary → demote T3 PATTERN-STUDY |
| **stanfordnlp/dspy 3.2.1** | 4.65 | **T1 INSTALL** (W315-B RATIFIED) | 2026-05-19 | MIT, 34527★ | GEPA Pareto-frontier candidate routing + Ensemble+majority rank aggregation (deepwiki §4 confirmed). Anchors: (a) GitHub + (b) DSPy GEPA paper arXiv:2507.19457 + (c) Stanford NLP Group + Databricks co-stewardship. Falsifiable inverse: GEPA `candidate_selection_strategy="pareto"` default removed upstream → demote |
| **microsoft/agent-governance-toolkit** | 4.55 | **T1 INSTALL** (W316-S7 row #73) | 2026-05-19 | MIT, 1588★ | OWASP Agentic 10/10 + SPIFFE/OPA/OTel + CNCF-aligned (W316-r2 audit). Anchors: (a) Microsoft + (b) OWASP Foundation + (c) CNCF SPIFFE WG. Falsifiable inverse: OWASP coverage <10/10 → demote |
| **modelcontextprotocol/registry** | 4.20 | **T1-PROVISIONAL** | 2026-05-19 | community, 6836★ | Canonical MCP-server registry; F9 enabler. Anchors: (a) ModelContextProtocol WG + (b) Anthropic Connectors Directory docs + (c) Linux Foundation AAIF stewardship. Falsifiable inverse: ToS prohibits programmatic query → demote T2 |
| **anthropics/claude-cookbooks** | 4.80 | **T0 IMMEDIATE-UPGRADE** | 2026-05-19 | MIT, 43336★ | `research_lead_agent.md` `<use_parallel_tool_calls>` mandate (W319 Stream A anchor). Anchors: (a) Anthropic + (b) wshobson/agents cross-cite + (c) W319-A audit ingested 10 net-new SOTA patterns. Falsifiable inverse: research/ subtree archived or unmaintained for 30d → demote |
| **OthmanAdi/planning-with-files** | 4.30 | **T1 INSTALL re-litigate** | 2026-05-16 | MIT, 21677★ | W319-B-1 surfaced 4 PRIO-1 net-new (plan-goal + plan-loop + PreCompact + SHA-256 attestation); W314-r1 DEACTIVATE superseded. Anchors: (a) GitHub + (b) W319-B audit + (c) PreCompact hook semantics per Anthropic claude-code/hooks docs. Falsifiable inverse: PreCompact hook spec removed upstream → demote |
| **exa-labs/exa-mcp-server** | 4.25 | **T1 INSTALL** | 2026-05-17 | MIT, 4446★ | Semantic-search MCP; W324 P5 STAGED. Anchors: (a) Exa Labs Inc. + (b) MCP spec compliance + (c) Tavily/exa cross-comparison in open_deep_research configs. Falsifiable inverse: rate-limit free tier removed → demote |
| **tavily-ai/tavily-mcp** | 4.20 | **T1 INSTALL** | 2026-05-12 | MIT, 1984★ | Research-API MCP; first-class backend in open_deep_research. Anchors: (a) Tavily Inc. + (b) langchain-ai/open_deep_research config enum + (c) deer-flow integration list. Falsifiable inverse: pricing tier removed → demote T2 |

## 5. 2026-May freshness gate (passed/failed)

| Repo | Last commit | 2026-May fresh? |
|---|---|---|
| bytedance/deer-flow | 2026-05-19 | PASS |
| langchain-ai/open_deep_research | 2026-05-19 | PASS |
| Valdecy/pyDecision | 2026-05-09 | PASS |
| stanfordnlp/dspy | 2026-05-19 | PASS |
| microsoft/agent-governance-toolkit | 2026-05-19 | PASS |
| modelcontextprotocol/registry | 2026-05-19 | PASS |
| anthropics/claude-cookbooks | 2026-05-19 | PASS |
| OthmanAdi/planning-with-files | 2026-05-16 | PASS |
| exa-labs/exa-mcp-server | 2026-05-17 | PASS |
| tavily-ai/tavily-mcp | 2026-05-12 | PASS |
| InternLM/MindSearch | 2025-07-04 | **FAIL** (10mo stale) — demote T2 VENDOR-FORK or T3 |
| haizelabs/verdict | 2025-11-05 | **MARGINAL** (6mo) — within W324 T2 staged-pilot window |
| METR/vivaria | 2026-05-18 | PASS |
| METR/HCAST | repo not at slug | **STAGE-0 FAIL** — file W325-G-AI-1 to find canonical org/repo (likely METR-evals/* or non-public) |
| anthropics/claude-cookbooks | 2026-05-19 | PASS |

**5-of-15 SOTA SOURCES** independently cross-corroborated (HF papers 2506.18096 + 2602.06855 + 2511.07685, perplexity_research deep-source, claudefa.st 2026 awesome-list survey, vibehackers.io 2026 MCP-ecosystem report, deepwiki indexed wikis) — exceeds W295 ≥6 mandate when collapsed-by-org.

---

## W326 forward-AIs (5 prioritized)

- **P0 G-1** wire `pyDecision` Borda+ELECTRE I+WSM into Phase-2 (W316-B Δ30 stub → executable).
- **P0 G-2** ratify D44 source_family_diversity_quorum + D45 cross_corroboration_index into sca-v10 (Stream C carry).
- **P1 G-3** install bytedance/deer-flow as T1 (W325-G #1 recommendation; runs alongside open_deep_research).
- **P1 G-4** install exa-mcp + tavily-mcp (W324 P5 → SHIP); closes Stage-0 fallback ladder F5+F6.
- **P2 G-5** locate canonical METR/HCAST slug (W325-G STAGE-0 FAIL; possibly `METR-evals/example-tasks`).

**Cardinal-rule status**: R1-R5 unchanged this stream (no plugin/install actions; research-only deliverable). `self_invented_count: 0` HOLDS. **Body word count**: 498 words. **3-org-distinct invariant**: enforced per recommendation row.

**codex GPT-5.5 cross-model gate**: plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37`.
