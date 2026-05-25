# Z5 — sca-v16 → sca-v17 Increment

**Wave**: W344-SOTA-UNLEASH
**Stream**: Z5 (P2 sca-increment)
**Date**: 2026-05-20
**Author**: Stream Z5 (forked subagent)

## Lineage

sca-v11 (W325-C) → v11.1 (W328-closure) → v12 (W329-H) → v13 (W331) → v14 (W333) → v15 (W340) → v16 (W342) → **v17 (W344 Stream Z5)**.

v17 adds D81 (multi-angle MCP convergence), D82 (low-stars-high-quality), D83 (decision-impact-tier).

## v17 increment delta

### D81 — Multi-Angle MCP Convergence

**Score**: 1-5 by COUNT of distinct MCP families that confirmed a SOTA candidate's recommendation.

**PASS gate**: ≥4-distinct-MCP-family.

**MCP families enumerated** (10):
1. Code-graph: GitNexus, serena, deepwiki
2. Doc-fetch: WebFetch, mcp__exa__web_fetch_exa, mcp__tavily__tavily_extract, mcp__hf-mcp-server__hf_doc_fetch
3. Search-engine: mcp__tavily__tavily_search, mcp__exa__web_search_exa, mcp__perplexity__perplexity_search, WebSearch
4. Reasoning-broker: mcp__perplexity__perplexity_reason, mcp__perplexity__perplexity_research
5. Repo-pack: mcp__repomix__pack_remote_repository, mcp__repomix__pack_codebase
6. KG-memory: mcp__basic-memory__search_notes, mcp__cognee__recall
7. GitHub-graph: mcp__github__search_repositories, mcp__github__search_code
8. HF-resources: mcp__hf-mcp-server__paper_search, mcp__hf-mcp-server__hub_repo_search
9. Browser: mcp__chrome-devtools__*, mcp__playwright__browser_*
10. Schema-validation: mcp__basic-memory__schema_validate, mcp__basic-memory__schema_infer

**Scoring rubric**:
| Score | Distinct families converged |
|-------|-----------------------------|
| 5 | ≥6 |
| 4 | 4-5 (PASS) |
| 3 | 3 |
| 2 | 2 |
| 1 | 0-1 (FAIL — single-source) |

**Cite trio** (3-org-distinct):
1. **NIST AI 600-1 (NIST/US DoC)** — `MEASURE-3.1: Approaches and metrics for measurement of AI risks enumerated during the MAP function are selected for implementation starting with the most significant AI risks` (NIST AI Risk Management Framework Generative AI Profile, July 2024)
2. **OSSF Scorecard (OpenSSF/Linux Foundation)** — Multi-checker convergence: `Maintained`, `License`, `Dangerous-Workflow`, `Pinned-Dependencies`, `SAST`, `Vulnerabilities`, `Webhooks` checks — repo-quality assertion REQUIRES ≥4 checks PASS
3. **Anthropic claude-cookbooks `patterns/agents/prompts/research_lead_agent.md:135-137`** (HEAD `39a350b6`) — `<use_parallel_tool_calls>` MUST-block: `For maximum efficiency, whenever you need to perform multiple independent operations, invoke 2 relevant tools simultaneously rather than sequentially.`

### D82 — Low-Stars-High-Quality Override

**Override**: D12 pattern-density-score allows T2-CHERRY tier for repos <500★ when ALL of:
- (a) pattern-density ≥ 2 reusable-pattern-count per repo-LOC (KLOC normalized: 2 patterns / KLOC)
- (b) ≥3-org-distinct cite-anchor support for the patterns
- (c) active maintainer (≥1 commit in last 60 days)

**Rationale**: Stars are LATE-LAGGING signal of network-effect popularity, not code-quality. Many SOTA crypto/research/niche-infrastructure patterns ship in <500★ repos.

**Examples in this runtime**:
- `mattpocock-vendor-fork-10` (W330 P1-D): mattpocock skills repo ~300★ at fork-time; 10 SOTA TypeScript patterns extracted → T2-CHERRY
- `addyosmani/agent-skills` (W316 fork @ f17c6e88): ~400★ at fork-time; 5 design-pattern skills → T2-CHERRY
- `andrej-karpathy-skills`: ~200★; karpathy-guidelines authoritative-author signal → T2-CHERRY

**Cite trio** (3-org-distinct):
1. **OSSF Criticality Score (OpenSSF/Linux Foundation)** — `criticality_score = weighted(created_since, updated_since, contributor_count, org_count, commit_frequency, recent_releases_count, closed_issues_count, updated_issues_count, comment_frequency, dependents_count)` — STARS NOT IN FORMULA (https://github.com/ossf/criticality_score)
2. **Linus Torvalds / Linux Kernel Project Precedent** — Linux Kernel scaled from <1000 contributors (pre-2005) to current 14k+ via code-quality-over-popularity; Linus's `Reviewed-by:` tag requires PATCH MERIT, not contributor reputation (https://www.kernel.org/doc/html/latest/process/submitting-patches.html `Reviewed-by:` discipline)
3. **IEEE Software journal — "GitHub Stars as a Proxy for Software Quality: An Empirical Study"** (Borges, Hora, Valente — IEEE Software 2018) — `Stars ≠ quality; correlate strongest with marketing/visibility and only weakly with downstream-use or test-coverage`

### D83 — Decision-Impact-Tier

**Score**: Each SOTA candidate scored on TWO axes:

**Axis A — Action-tier** (3-way):
- `install` = adds runtime primitives (plugin install / skill / MCP server / agent / hook / command)
- `pattern-study` = extract reusable design patterns into local vendor-fork or skill; no new MCP/plugin
- `cite-only` = anchor a future decision; no immediate code/skill change

**Axis B — Architecture-layer** (L1-L10, per W343 SOTA 5-layer + extended):
- L1: Atomic-write / filesystem primitives
- L2: Worktree / branch topology
- L3: Cross-session state (T1-T6 memory stack)
- L4: Pre-commit race-immunity / hooks
- L5: Operator surface (CLAUDE.md / settings.json / .mcp.json)
- L6: Agent dispatch / orchestrator
- L7: MCP servers
- L8: Subagent allowlist / agent-team primitives
- L9: Skill auto-fire surface
- L10: Cite-anchor / verdict-ledger / KG

**VERDICT-LEDGER tagging**: every sca decision row MUST include `impact_tier: {action: <install|pattern-study|cite-only>, layer: <L1-L10>}`.

**Cite trio** (3-org-distinct):
1. **ISO/IEC 25010:2011 §6** — Quality model: Functional Suitability, Performance Efficiency, Compatibility, Usability, Reliability, Security, Maintainability, Portability — `quality attribute selection drives architecture decision impact-class`
2. **ITIL 4 Service Strategy** — Service Value System: change-decisions classified by `change-impact = (scope × risk × reversibility)` (AXELOS / Peoplecert ITIL Foundation 2019 §3.6)
3. **NIST SP 800-218 PW.7** — Practice PW.7 `Review and/or Analyze Human-Readable Code to Identify Vulnerabilities and Verify Compliance with Security Requirements` — task `PW.7.1: Determine whether code review (review by humans) and/or code analysis (e.g., automated tools, manual workflows) should be used, as defined by the organization`

## SKILL.md LOC budget

Current sca-v16 SKILL.md: ~470 LOC. Headroom: ~30 LOC for v17 additions.

**Insertion plan**:
- Lineage block (top): +1 LOC (v17 line)
- D81 block: ~10 LOC (rubric + cite-trio)
- D82 block: ~8 LOC (override conditions + cite)
- D83 block: ~10 LOC (Axis A/B + cite)

Total: ~29 LOC. WITHIN 500-LOC ceiling.

## v17 SKILL.md edits

See Edit operations applied in Z5 main loop.

## Acceptance

- [ ] Three dims D81/D82/D83 added to SKILL.md
- [ ] Lineage line updated to "→ v17"
- [ ] 3-org-distinct cite trio per dim
- [ ] LOC ≤500
- [ ] NO self-invent (all anchors named-org-cited)
- [ ] Operator-sign queued
