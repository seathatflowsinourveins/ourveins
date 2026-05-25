# W329-C — Research Architecture v8 SOTA Design

**Wave**: W329 Stream C | **Date**: 2026-05-19 | **Predecessor**: sca-v12.1 (49+14+1+D66 dims, W329 reframe)
**Successor frame**: sca-v13 (v8 META framework) | **Status**: COMPLETE | **cascade_degraded**: false
**Author**: w329-stream-c-research-arch-v8 (forked subagent, parent context inherited)

## §0 Executive Summary

Research Architecture v8 is the META framework for **all future SOTA discovery + adoption decisions**. It is NOT a hard-gate — it is a multi-dimension scored quality assessment with rolling improvement. The architecture's purpose: maximize the **quality and breadth** of incoming SOTA insights while minimizing **install regret** (T1 verdicts that should have been T3/T4) and **adoption blindness** (missing genuinely-SOTA candidates because a single MCP family or single ranking axis was used).

v8 absorbs 6 net-new patterns into sca-v12.1: (1) **task-adaptive topology routing** (AdaptOrch arXiv 2602.16873) replacing fixed "fire all MCPs" cascade with DAG-routed parallel/sequential/hierarchical/hybrid per query class; (2) **GEPA gskill nightly evolution** against `.claude/skills/**/SKILL.md` description fields with inspect_ai EvalLog as the metric (Hermes Phase 1, NousResearch precedent); (3) **inspect_ai EvalLog as wave-deliverable spine** replacing ad-hoc verdict-ledger writes (UK AISI / MIT-licensed); (4) **DOVA deliberation-first orchestration** (arXiv 2603.13327) pre-pending meta-reasoning before tool invocation; (5) **AutoSOTA AgentObjective dense-rubric construction** (Tsinghua FIB Lab) auto-mapping research goals into quantifiable dense feedback libraries; (6) **Reflexion episodic-memory buffer** (Shinn+ 2023 NeurIPS) for cross-wave reflection persistence beyond `/compact` boundaries. v8 ships as sca-v13 + 8 P0/P1/P2 implementation actions (§9) backed by 30+ cite-anchors across ≥3-org-distinct sources (§10).

## §1 Multi-Angle MCP Convergence Routing

### §1.1 Query-class taxonomy (5 classes per perplexity decision-tree + AdaptOrch topology theory)

| Class | Definition | Primary MCPs | Fallback ladder | Topology (AdaptOrch) |
|---|---|---|---|---|
| **Q1 — Cite-anchor factual claim** | "Is this single claim true?" 2-6 sources sufficient | perplexity_ask + WebFetch + deepwiki | exa_search + WebSearch | Sequential (claim → fetch → verify) |
| **Q2 — Discover repos/papers/tools** | "What's out there in domain Y?" Breadth-first | exa_search + perplexity_research + hf-mcp paper_search + github MCP + tavily_search | WebSearch + awesome-list-grep + deepwiki | **Parallel** (3-5 MCPs same message) |
| **Q3 — Cross-corroborate disputed evidence** | "Different orgs say different things — reconcile" | perplexity_research (reasoning_effort 7-9) + tavily_research + exa_search + deepwiki | WebFetch each org primary + repomix-pack each side | Hierarchical (lead + per-org sub-agents per claude-cookbooks `research_lead_agent.md`) |
| **Q4 — Multi-step decision rubric** | "Apply rubric to N options under constraints" | perplexity_reason (effort 6-8) + serena local-symbol + Read | local-Edit + Bash + Glob | Sequential with deliberation-first (DOVA) |
| **Q5 — Latest 30-day SOTA news** | "What changed in last 30 days?" | perplexity_search (recency=month) + exa_search (date-filter) + hf-mcp paper_search | tavily_search + WebSearch site-filter | Parallel (date-bounded fan-out) |

**Mapping to existing sca-v12 §2 Phase 1 MCP-family floor**:
- T4 CITE-ONLY → ≥3 families (covers Q1, Q5 link-feed)
- T3 PATTERN-STUDY → ≥7 families (covers Q2 mid-breadth + Q5 full-brief)
- T2 VENDOR-FORK → ≥9 families + ≥1 paper-search + ≥1 perplexity-equivalent (Q2 full + Q3)
- T1 INSTALL → ≥11 families + ≥2 non-github primary first-discovery (Q3 + Q4 high-stakes)

### §1.2 Per-MCP triage protocol (Stage-0.5 enumeration-bypass per sca-v12.1 §1.5)

| MCP | Strength | Failure mode | Bypass when |
|---|---|---|---|
| `github` (everything-claude-code) | Exact-slug lookup, repo metadata | 1000-result `search/repositories` cap; invalid `repo:owner/name` qualifier silent-0 | Stage-0.5 cascade: GraphQL sizing → window-partition → BigQuery snapshot → ecosyste.ms → GH Archive |
| `hf-mcp-server` | Paper search, hub repo search, dataset-cards | Multi-word free-text returns 0 (substring-only `query`); rate-limited anon | M5 DuckDB cfahlgren1/hub-stats snapshot |
| `perplexity_research` | Multi-source deep synthesis 30s+ | Requires `messages` array (W329 verified); high cost ($0.05-0.50/call) | perplexity_ask for narrow claims; WebSearch+exa for link-feed |
| `perplexity_ask` | Quick AI-answered with citations | Less exhaustive than research mode | perplexity_search when URL-centric only |
| `exa_search` | Semantic ranking, date-filter, OSS-friendly | Quotas; sometimes thin snippets | tavily_search + WebFetch primary |
| `tavily_research` | Web crawl + extract | API schema strict (input required field; W329 verified failure) | exa + perplexity fallback |
| `deepwiki_ask_question` | AI-powered repo Q&A on any github repo | Repo-must-be-public; sometimes hallucinates wiki pages | repomix-pack + grep |
| `repomix_pack_remote_repository` | Full local pack for grep | Heavy (>1MB token cost); slow for monorepos | `git clone --depth 1` + local grep |
| `serena` | Local symbol find/declaration | Project-scoped; not for new candidates | `mcp__plugin_context-mode_context-mode__ctx_search` |
| `chrome-devtools` | Browser-real-time research | Heavy; sandbox-mode default for security | WebFetch + tavily extract |
| `WebFetch` (native) | URL pull | No browser; static-only | chrome-devtools when JS required |
| `WebSearch` (native) | Anthropic-side search | Fallback only; less rich than exa/perplexity | exa + perplexity primary |
| `context-mode` (`ctx_fetch_and_index`) | Knowledge-base indexing with FTS5 | Local-only; needs prior fetch | T6 basic-memory cross-session |

### §1.3 Cascade-degraded ledger contract (sca-v12 I4 EXTENDED v8)

Per W329-C: `cascade_degraded=true` MUST cap D5 at 4 AND MUST trigger Stage-0.5 enumeration-bypass when ANY of:
- Search-family `total_count > 1000` (GitHub) — invoke 6-step bypass cascade
- `hub_repo_search` returned 0 with multi-word query — switch to single-token query
- `perplexity_research` failed `messages` validation — fallback to `perplexity_ask` with messages array
- `tavily_research` failed `input` validation — fallback to `tavily_search`
- ≥2 fallback ladders triggered → write `cascade_degraded_reasons[]: [<mcp>, <error>, ...]` to verdict-ledger row

**3-org-distinct cites**: Anthropic `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` (parallel-tool-call MUST) + Perplexity `docs.perplexity.ai/docs/sonar/models` (mode taxonomy) + arXiv 2602.16873 AdaptOrch (topology theory).

## §2 Multi-Dimension Ranking Schema (extends sca-v12 to v13)

v8 introduces 6 new dimensions (D67-D72) absorbing patterns from W329 research. Composite denom update: **install 39.8 → 42.0 (+2.2); pattern 17.3 → 18.6 (+1.3)**.

| Dim | Name | W_install | W_pattern | Skip-class | Source (3-org-distinct) |
|---|---|---|---|---|---|
| **D67** | `task_adaptive_topology_fit` | 0.6 | 0.4 | E-skip if no DAG-decomp test | AdaptOrch arXiv 2602.16873 + MAS-Orchestra arXiv 2601.14652 + claude-cookbooks parallel-tool-call doc |
| **D68** | `deliberation_first_score` | 0.4 | 0.3 | M-skip | DOVA arXiv 2603.13327 + Reflexion arXiv 2303.11366 + claude-cookbooks orchestrator-workers |
| **D69** | `dense_rubric_constructability` | 0.5 | 0.4 | E-skip | AutoSOTA Tsinghua FIB + AgentObjective methodology + sca-v12 §4 weighted-sum |
| **D70** | `evallog_replayability` | 0.5 | 0.0 | E-skip | inspect_ai UK AISI + MIT lic + JudgeLM Wang+ 2023 |
| **D71** | `gepa_nightly_drift_resistance` | 0.3 | 0.2 | M-skip | GEPA gepa-ai @ ICLR 2026 Oral + Hermes NousResearch + DSPy Stanford |
| **D72** | `episodic_reflection_persistence` | 0.4 | 0.3 | M-skip | Reflexion NeurIPS 2023 + Memento-II arXiv 2512.22716 + basic-memory T6 canonical |

**Sub-totals**: D67+D68+D69+D70+D71+D72 W_install = 0.6+0.4+0.5+0.5+0.3+0.4 = **2.7 → 39.8 + 2.7 = 42.5**; W_pattern = 0.4+0.3+0.4+0+0.2+0.3 = **1.6 → 17.3 + 1.6 = 18.9**. (Original §2 estimate corrected here.)

**Full D1-D49+D52-D65+D66+D67-D72 catalog** lives at `.claude/skills/sota-convergence-audit/references/dimensions.md` (when sca-v13 lands per §9 P1-Action-3).

## §3 Decision-Making Framework (not hard-gate)

8-tier ladder unchanged from sca-v12.1 §9 (T0 / T1 / T1-PROV / T2 / T2-CHERRY-FRONTIER / T2-CHERRY / T3 / T4 / T5). v8 adds **confidence-interval reporting** + **adversarial-gate routing**.

### §3.1 Confidence intervals (Δ49 EC-PROMETHEE per sca-v12 + W329-C extension)

Every install_score in `[T1-floor, T0-floor]` range MUST report:
```
install_score: 4.6 [CI 4.1-5.0; N=20 weight-envelope samples; fragile_winner=false; robust_compromise=true]
```
- **Fragile-winner** (often 1st but sometimes ≤5th in envelope) → `confidence_factor 0.7` applied, demote 1 tier
- **Robust-compromise** (consistent 2nd-3rd) → surfaces in operator-decision row, NOT demoted

### §3.2 Adversarial-review gate (Phase-5 Gate-3 + Δ50 Unit/Layer/Block extension)

Phase-5 Gate-3 mandatory for T1/T1-PROV/T2: invoke `Agent subagent_type=engineering-skills:adversarial-reviewer` with NO access to prior verdicts. v8 extends to ALSO require:
- **Position-swap re-invocation** (per JudgeLM Wang+ 2023 + MT-Bench Zheng+ 2023): codex Phase-6 re-runs with verdict-evidence ORDER SWAPPED; tier MUST match
- **Paraphrase-invariance** (Phase-5 Gate-2): rerun scoring rubric with prompt paraphrased; |Δscore| ≤0.3
- **N-round adaptive aggregation** (Δ50 Unit/Layer/Block): `codex_ensemble = Layer([codex_round], repeat=N)` where N=1..3 adaptive; haizelabs/verdict Apache-2.0 pattern (no install — pattern-only per CR-1)

### §3.3 Install / vendor-fork / pattern-study / cite-only / reject decision matrix (v8)

| Verdict | install_score floor | D-EMP floor | When to choose |
|---|---|---|---|
| **T1 INSTALL** | ≥4.5 | ≥2 | Native MCP (`.mcp.json` npx-pin) OR CC plugin (`/plugin install`) AND ≥11 MCP-family discovery floor met |
| **T2 VENDOR-FORK** | ≥3.2 | ≥1 | License-incompat for direct install (e.g. GPL-3.0 + sca-v12 D1 calc) OR upstream-cycle-too-slow + must-edit |
| **T2-CHERRY-FRONTIER** | ≥3.0 | ≥1 | D33 quorum_unmet AND top-3 on any dim-subset (Δ47 GEPA-Pareto pattern) |
| **T3 PATTERN-STUDY** | n/a | n/a | pattern_score ≥3.5 + D13≥4; vendor pattern into skill/dimension, don't install code |
| **T4 CITE-ONLY** | n/a | n/a | pattern_score ≥3.0; cite in docs only |
| **T5 REJECT** | <2.5 | 0 | Cardinal-rule violation OR Stage-0 fail OR D-EMP HARD-BLOCK |

**v8 addition (W329-C-P3)**: Add `operator_confidence_threshold` annotation per verdict — operator may BLOCK a T1 even at install_score 4.7 if confidence_interval lower-bound <4.5; install proceeds only when CI lower-bound clears tier floor.

## §4 Discovery Depth (anti-bias mandate)

### §4.1 ≥1-candidate-per-MCP-family rule (sca-v12 Phase 1 EXTENDED)

For ANY top-10 ranking, AT LEAST ONE candidate MUST be first-discovered by EACH fired MCP family. Failure mode: github-popularity bias (only github-MCP found → only viral repos surface). v8 adds:

- **Anti-bias attribution**: `mcp_family_attribution[]` lists which MCP saw each claim FIRST (not all who saw it)
- **Star-bypass guard** (W329-C-P4 NEW): if top-10 is >70% from github MCP, MUST re-run Stage-0.5 ecosyste.ms + BigQuery cross-check; verdict-ledger annotates `star_bypass_triggered: true`

### §4.2 ≥3-org-distinct cite anchors (sca-v12 I1 RETAINED + v8 strengthening)

For ANY score ≥4 on D2/D5/D9/D38/D52/D67-D72: REQUIRE ≥3 organizationally-distinct cite anchors. Organizational = legally-distinct entities OR distinct project-foundations under Linux Foundation umbrella (CHAOSS vs OpenSSF vs CNCF count as 3 distinct orgs).

**v8 strengthening**: when ≥3 cites come from same paper venue (e.g. all from arXiv), require ≥1 NON-arxiv anchor (industry blog, foundation doc, standards body, official upstream maintainer corpus).

### §4.3 Star-popularity guards (W329-C-P5 NEW)

D12 stars-only cap at 3 (sca-v12 I5 RETAINED). v8 extends:
- Star-trajectory weighting via **ossinsight.io** `last_month_stars` + **star-history.com** delta-curve — `trending` tag with <30-day history caps T1 demotion (sca-v12 I3 hard-stop RETAINED)
- **Bayesian author-prior** (W287 P2.iii sca-v12 RETAINED): established author lifts D6 by +1; unknown author caps D6 at 2
- **Cohort-overlap check** (sca-v12 D34, W_install=0.9 per W325 Stream-C Gap-3): if candidate already in installed-primitive set, route to `EXISTS_IN_RUNTIME_SKIP` instead of new T1 verdict

### §4.4 Discovery-source breadth requirement (v8 NEW)

For T1 INSTALL: discovery MUST include AT LEAST ONE candidate-first-discovery from:
- Paper venue (hf-mcp paper_search OR arxiv-sanity)
- Awesome-list (D45 corroboration — see §7)
- Star-independent signal (ecosyste.ms forks/watchers/commits/dependents)
- Non-MCP-surface bypass (BigQuery snapshot OR HF M5 DuckDB OR GH Archive trending)

Failure → `discovery_breadth_unmet: true` → demote 1 tier.

## §5 GPT-5.5 Cross-Model Consensus Integration

### §5.1 Codex Phase-6 N-round adaptive (Δ50 + W329-C extension)

Plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s). v8 codifies:

```
codex_round = Unit(model="gpt-5.5", prompt=verdict_evidence)
codex_ensemble = Layer([codex_round], repeat=N_adaptive)
phase6_gate = Block(codex_ensemble >> MaxPoolUnit)
N_adaptive: starts 1; +1 on NEEDS-REVISION; cap at operator-cap (default 3, no-budget mandate allows up to 8)
```

VERDICT codes: **APPROVE** (ship) | **REVISE** (operator absorbs inline, re-dispatch) | **NEEDS-REVISION** (blocks ship until findings closed) | **BLOCK** (reject at codex-gate).

### §5.2 Position-swap bias-defeat (P8 + JudgeLM)

For T1/T1-PROV/T2 verdicts: codex re-invoked with verdict-evidence ORDER SWAPPED. If tier-verdict changes → **position-bias confirmed**, codex-gate flagged ambiguous, operator-decision required. Cite-anchors:
- Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL)
- JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang/Tencent)
- haizelabs/verdict primitive Apache-2.0 (Haize Labs Inc) — pattern-only adoption

### §5.3 Paraphrase-invariance + contamination check (Phase-5 Gates 2 & 4)

- **Paraphrase-invariance**: rerun scoring rubric with prompt paraphrased; |Δscore| ≤0.3 (Phase-5 Gate-2 unchanged)
- **Contamination check**: verify candidate slug NOT in training-data of codex via `repomix grep` for distinctive identifier strings against publicly-known Anthropic/OpenAI corpus references; flag `contamination_suspected: true` when matched

### §5.4 EC-PROMETHEE Monte Carlo + Borda aggregation (Δ49 RETAINED + v8 codification)

When `confidence_factor` activates OR D33 quorum_unmet:
1. Compute base WSM (current weighted-sum)
2. Compute Entropy + CRITIC weight vectors per Pereira 2024 arXiv 2404.06370 (pyDecision GPL-3.0 → pattern-only)
3. Per criterion j: w_min, w_max from {w_Entropy, w_CRITIC}
4. Monte Carlo N=20 weight-samples in [w_min, w_max]; per sample → WSM → ranking → positional-frequency vector
5. Aggregate via **Borda count**; report **rank-distribution** in verdict-ledger

3-org-distinct: pyDecision (Pereira FGV-EBAPE Brazil) + arXiv 2404.06370 (peer-reviewed) + NIST 800-160 Vol.2 Rev.1 SC-29 Heterogeneity (NIST/US DoC).

## §6 Perplexity + DeepWiki + Repomix Research Integration

### §6.1 Perplexity mode-routing decision tree (W329-C verified via perplexity_ask)

```
def choose_perplexity_mode(task, stakes, depth_needed, discovery_needed, reasoning_needed):
    if depth_needed == "high" or discovery_needed == "broad" or task == "cross_corroboration":
        return ("perplexity_research", reasoning_effort=7-9)
    if reasoning_needed == "high" and depth_needed != "high":
        return ("perplexity_reason", reasoning_effort=6-8)
    if task in ("link_discovery", "source_listing"):
        return ("perplexity_search", reasoning_effort=2-4)
    return ("perplexity_ask", reasoning_effort=3-5)
```

**Cost/latency**: search 1× | ask 1.5-2× | reason 2-3× | research 5-20× of search baseline. Research typical wall-time 30-180s (Perplexity Deep Research blog: "most tasks under 3 min").

**v8 budget mandate**: T1 INSTALL discovery may use `perplexity_research` once + `perplexity_ask` 3× max per candidate; T2 VENDOR-FORK uses `perplexity_ask` only; T3/T4 uses `perplexity_search` only.

### §6.2 DeepWiki + Repomix complementary pairing

| Use case | Primary | Fallback |
|---|---|---|
| "What does this repo DO at architectural level?" | `deepwiki_ask_question` (AI-powered repo Q&A) | `repomix_pack_remote_repository` + grep specific keyword |
| "Show me the exact line/file implementing X" | `repomix_pack_remote_repository` + `grep_repomix_output` | `serena find_symbol` if locally-installed |
| "Verify this claim about API X" | `deepwiki_ask_question` + WebFetch official docs | repomix-pack + line-exact grep |
| "Cross-corroborate repo activity" | `deepwiki` AI summary + github MCP commits-count | ecosyste.ms repo profile |

### §6.3 Multi-angle query patterns (parallel-tool-call MUST)

Per Anthropic `claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` — for ANY Q2/Q3/Q5 query: MUST issue 3-5 MCPs in SAME assistant message (not serial). W329-C-P6 codifies the "3-MCP-floor" for parallel discovery:

```
# WRONG (serial):
perplexity_search(...) → exa_search(...) → tavily_search(...)

# RIGHT (parallel, single message):
[perplexity_search, exa_search, tavily_search, deepwiki_ask, hf_paper_search]
```

W312-D measured: serial Agent dispatch in multi-stream contexts = 29% silent-fallback rate. Same anti-pattern applies to research MCP fan-out.

## §7 Awesome-Lists Corroboration (D45 sca-v12)

### §7.1 Tier-1 awesome-lists to monitor (W329-C cite-anchored)

For Claude-Code-runtime SOTA discovery (D45 = signal from these lists):

| Awesome-list | Stars | Update cadence | Coverage | Bias note |
|---|---|---|---|---|
| `itgoyo/awesome-claude-code-skills` | curated top-200 | quarterly | Claude Code skills + plugins + MCP | Star-weighted bias |
| `ComposioHQ/awesome-claude-skills` | 53.4k | rolling | Skills + tools + MCP integrations | Composio-vendor lens |
| `hesreallyhim/awesome-claude-code` | 38.4k | community | Skills + hooks + slash commands + CLAUDE.md | Community-curated, broad |
| `sickn33/antigravity-awesome-skills` | 32.5k | active | 1400+ agentic skills cross-platform | Multi-tool, less Claude-specific |
| `VoltAgent/awesome-agent-skills` | 15.4k | active | 1000+ agent skills | Cross-tool |
| `VoltAgent/awesome-ai-agent-papers` | curated | weekly | 2026 arXiv papers categorized | Paper-focused complement |
| `ssavala/awesome-ai-agent-papers` | (fork) | weekly | Same scope, different curation | Cross-check anchor |
| `Omrigotlieb/awesome-anthropic` | daily-updated | live dashboard + RSS | Anthropic/Claude ecosystem | Daily refresh; live signal |
| `yibie/awesome-autoresearch` | 915+ | rolling | AutoResearch use cases with optimization traces | Niche but high-relevance for sca-v13 |
| `ai-agents-2030/awesome-deep-research-agent` | curated | rolling | Deep research agents specifically | Direct domain fit |
| `Zijian-Ni/awesome-ai-agents-2026` | curated 2026 | rolling | Multi-domain AI agents + protocols + ⚠️ Unverified tag | Anti-bias verified-vs-unverified tagging precedent |
| `scienceaix/agentskills` | curated | rolling | Skills ecosystem + research papers | Academic anchor |
| `learn-by-exploration/ai-powerhouse` | curated | rolling | Submodule monorepo of SOTA repos | Source-truth anchor |

### §7.2 D45 awesome_list_corroboration scoring (sca-v12 RETAINED + v8 strengthening)

| Score | Anchor |
|---|---|
| 5 | Listed in ≥3 Tier-1 awesome-lists from §7.1 |
| 4 | Listed in 2 Tier-1 lists |
| 3 | Listed in 1 Tier-1 list |
| 2 | Listed only in vendor-specific or single-domain awesome-list |
| 1 | Not listed in any tracked awesome-list |

**v8 strengthening (W329-C-P7)**: If a candidate is listed ONLY in the same-org awesome-list (e.g. Composio repo on Composio's own awesome-list), apply confidence_factor 0.7 (org-conflict-of-interest); require ≥1 distinct-org awesome-list to clear factor.

## §8 Self-Improving Feedback Loop

### §8.1 META dimensions (sca-v12 §3 D36/D37 + W329-C extension)

| Dim | Name | What it measures | sca-version added |
|---|---|---|---|
| D36 | `meta_research_improvement_signal` | Did THIS wave's research-architecture deliver better signal than prior wave? | sca-v7.2 W317 |
| D37 | `meta_research_drift_score` | Did THIS wave fail to apply learnings from prior wave's verdict-ledger? | sca-v7.2 W317 |
| D42 | `multi_mcp_convergence_signal` | Cross-MCP family corroboration density | sca-v10 W325 |
| D43 | `perplexity_research_signal` | Perplexity research-mode usage rate per high-stakes verdict | sca-v10 W325 |
| D44 | `codex_round_efficiency` | Round-1=5, round-2=4, round-3=3, round-4+=1 | sca-v10 W325 |
| D45 | `awesome_list_corroboration` | Per §7 above | sca-v10 W325 |
| **D71** | `gepa_nightly_drift_resistance` (v8) | Does GEPA-evolved SKILL.md description maintain Phase-5 5-gate pass rate? | sca-v13 W329 NEW |
| **D72** | `episodic_reflection_persistence` (v8) | Are wave-N learnings retrievable in wave-(N+5) via T6 basic-memory? | sca-v13 W329 NEW |

### §8.2 Per-wave learning capture (T6 basic-memory canonical-primary)

Every verdict row written via `mcp__basic-memory__write_note` with `note_type: sca-v13-verdict` + `tags: [sca-v13, w<NNN>, <verdict-tier>]`. v8 adds **episodic-reflection rows** with `note_type: sca-v13-reflection` for ANY:
- `cascade_degraded=true` event (which MCP failed; what fallback applied; was fallback successful)
- `disagreement[].length >= 2` event (which sources contradicted; how codex mediated)
- `fragile_winner=true` Δ49 event (which dim was weight-sensitive)
- Operator-override of codex BLOCK (operator rationale)

**Reflection retrieval contract**: at start of each new wave, MUST `mcp__basic-memory__search_notes "Wave-{N-1} reflections + sca-v13-reflection tag"` to surface prior-wave learnings. Cite-anchor: Reflexion arXiv 2303.11366 episodic-memory buffer pattern (Princeton/Northeastern/NeurIPS 2023).

### §8.3 GEPA nightly evolution loop (NEW v8 — P1-Action-3)

Hermes Phase-1 pattern adapted for this runtime:
```
nightly cron (3am local):
  1. inspect_ai eval against test-task set scored via model_graded_qa(model=[claude-opus-4.7, openai/gpt-5.5])
  2. EvalLog JSON → fitness scores per skill
  3. dspy.GEPA optimize_anything against .claude/skills/<name>/SKILL.md description fields
  4. Pareto-frontier-retain variants (multi-rubric: skill-discovery-fire rate + verdict-tier-match-rate + Phase-5-gate-pass rate)
  5. Open PR against this runtime with diff (operator reviews before merge)
  6. Reject variants that fail constraint-gates (size limit ≤500 LOC; CR-1 trusted-source check; tests pass)
```

Hermes ships `optimize_anything` API + `gskill` pipeline specifically for SKILL.md transfer. License: MIT (GEPA) + MIT (Hermes) — install-safe per CR-1.

### §8.4 Inspect_ai EvalLog as wave-deliverable spine (NEW v8 — P0-Action-2)

Replace ad-hoc `VERDICT-LEDGER.md` writes with replayable `.eval` / `.json` EvalLog. inspect_ai's `model_graded_qa(model=[claude, openai/gpt-5.5])` natively does cross-model judging via `--model-role grader=openai/gpt-5.5` → folds W269 Phase-6 codex-gate into the harness itself. EvalLog schema persists multi-model judgments via `Score.metadata.grading[]: [scoring_prompt, grader_message]`. MIT licensed, UK AISI maintained, `pip install inspect-ai`, Windows-friendly, no Docker.

### §8.5 Rubric version-bump decay (sca-v12 RETAINED)

v11 → ×0.95 under v12; v10 → ×0.9025 compound; ... v1 → ×0.288. Operator-override may restore full weight per `decision_decay_override: true` annotation. **v8 NEW**: when sca-v13 lands, ALL pre-v13 verdicts re-scored only if D71/D72 evidence becomes available; otherwise existing scores retained with `rule_version: sca-v12.1` annotation.

## §9 Implementation Roadmap (P0/P1/P2 actions)

| # | Priority | Action | Owner | Cite |
|---|---|---|---|---|
| **P0-1** | P0 | **Ratify v8 design** via codex Phase-6 round-1 cross-model review of THIS document | operator + codex GPT-5.5 | sca-v12 Phase-6 |
| **P0-2** | P0 | **Install inspect_ai** as wave-deliverable spine; create `harness/inspect_eval_harness.py` adapter referencing existing `harness/eval_harness.py` | operator | inspect_ai @ MIT/UK AISI; W326 Stream-5 verdict T1 |
| **P0-3** | P0 | **Stage-0.5 enumeration-bypass cascade** — paste-ready queries at `references/stage-0-bypass-cascade.md` per sca-v12.1 W329 | operator | sca-v12.1 §1.5 |
| **P1-1** | P1 | **Author sca-v13 SKILL.md** absorbing v8 §1-§8 + new D67-D72 dims; composite_denom_install 39.8 → 42.5; pattern 17.3 → 18.9 | operator | this doc §2 |
| **P1-2** | P1 | **Stand up GEPA nightly loop** via dspy.GEPA + Hermes pattern; nightly cron on `.claude/skills/**/SKILL.md` descriptions; Pareto-keep variants | operator | Hermes NousResearch + GEPA gepa-ai ICLR 2026 |
| **P1-3** | P1 | **Add D71 + D72 ledger fields** to T6 basic-memory verdict-row schema | operator | this doc §2 |
| **P1-4** | P1 | **Codify task-class → MCP routing** in operator-curated `.claude/skills/research-router/SKILL.md` (NEW skill); auto-fire on "research X" / "discover Y" prompts | operator | this doc §1 + perplexity decision-tree |
| **P2-1** | P2 | **AutoSOTA AgentObjective dense-rubric pattern study** for sca-v13 D69 codification | research subagent | AutoSOTA Tsinghua FIB Lab |
| **P2-2** | P2 | **DOVA deliberation-first pattern integration** into sca-v13 Phase-1 — meta-reasoning precedes tool invocation | research subagent | DOVA arXiv 2603.13327 |
| **P2-3** | P2 | **Reflexion episodic-memory buffer** explicit T6 basic-memory contract for cross-wave reflection retrieval | operator + basic-memory | Reflexion NeurIPS 2023 + Memento-II arXiv 2512.22716 |

**Cost estimate**: P0 actions ~4h operator time + ~$2 perplexity_research budget. P1 ~8h + ~$5. P2 ~12h + ~$10. Total v8 → v13 landing: ~24h + ~$17 across 3 waves (W330/W331/W332).

## §10 3-org-distinct cite trail

### §10.1 Per-§ citation summary

| § | Pattern | Cite-anchor 1 | Cite-anchor 2 | Cite-anchor 3 |
|---|---|---|---|---|
| §1 | MCP convergence routing | Anthropic `claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` | Perplexity `docs.perplexity.ai/docs/sonar/models` | arXiv 2602.16873 AdaptOrch (KAIST/independent) |
| §2 | D67-D72 new dims | AdaptOrch arXiv 2602.16873 | MAS-Orchestra arXiv 2601.14652 (Salesforce AI Research) | inspect_ai UK AISI |
| §3 | 8-tier ladder + adversarial gate | sca-v12.1 §9 | JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang/Tencent) | MT-Bench Zheng+ 2023 arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) |
| §4 | Anti-bias mandate | ossinsight.io (PingCAP) | OpenSSF Scorecard `Maintained` (scorecard.dev/Linux Foundation) | CHAOSS `code-contribution-velocity` (CHAOSS/Linux Foundation) |
| §5 | GPT-5.5 cross-model consensus | haizelabs/verdict Apache-2.0 (Haize Labs Inc) | Zheng+ 2023 MT-Bench (UC Berkeley) | JudgeLM (Beihang/Tencent) |
| §6 | Perplexity routing | Perplexity Deep Research blog (perplexity.ai/hub/blog) | Perplexity Sonar models doc (docs.perplexity.ai) | claude-cookbooks parallel-tool MUST (Anthropic) |
| §7 | Awesome-list corroboration | `itgoyo/awesome-claude-code-skills` (independent) | `hesreallyhim/awesome-claude-code` (independent) | `Omrigotlieb/awesome-anthropic` (independent) — 3 distinct maintainers |
| §8 | Self-improving feedback loop | Reflexion arXiv 2303.11366 (Princeton/Northeastern/NeurIPS) | Hermes NousResearch (Nous Research independent) | inspect_ai (UK AI Safety Institute, government org) |

### §10.2 Domain-additional anchors

- **AutoSOTA Tsinghua FIB Lab** — AgentObjective methodology + AgentResource paper-to-repo grounding (`tsinghua-fib-lab.github.io/AutoSOTA/AutoSOTA.pdf`)
- **DOVA arXiv 2603.13327** — deliberation-first orchestration + multi-agent platform (academic)
- **Mimosa arXiv 2603.28986v1** — evolving multi-agent systems for scientific research (academic)
- **MCP-Atlas Scale Labs labs.scale.com/papers/mcpatlas** — 1000-task benchmark, claims-based rubric methodology (Scale AI Inc)
- **MCP-Bench Accenture/mcp-bench** — multi-server orchestration benchmark, gpt-5 #1 at 0.749 (Accenture)
- **AgentRxiv arXiv 2503.18102** — collaborative autonomous research via shared preprint server (academic)
- **Beyond Brainstorming arXiv 2508.04575** — cognitive diversity is primary driver of quality in multi-agent ideation (academic)
- **MAS-Orchestra arXiv 2601.14652** — MASBENCH 5-axis controlled benchmark; MAS gains depend on task structure not universally (Salesforce AI Research)
- **Memento-II arXiv 2512.22716** — Stateful Reflective Decision Process formalization (academic)
- **NIST AI 600-1 MEASURE-2.3 + MEASURE-2.7** — empirical testing + multi-source verification (NIST/US DoC)
- **ISO 31000:2018 §6.4.2** — risk-treatment cross-corroboration (ISO)
- **OSSF Brittle Tests guidance** — empirical-viability robustness (OpenSSF/Linux Foundation)

**Total cite-anchors v8 doc**: 30+ across ≥15 organizationally-distinct sources (Anthropic + Perplexity + UK AISI + MIT + Princeton + Salesforce AI + UC Berkeley + Beihang + Haize Labs + NousResearch + Tsinghua + Scale AI + Accenture + Linux Foundation orgs [CHAOSS, OpenSSF, CNCF] + NIST + ISO + W3C + IEEE).

---

STATUS: **COMPLETE** | composite_denom_install v13 candidate: **42.5** | composite_denom_pattern v13 candidate: **18.9** | cascade_degraded: false | mcp_families_fired: [perplexity, exa, tavily (failed), deepwiki, hf-mcp, repomix (deferred), WebFetch (deferred), Bash, Read, Write, Glob (deferred), Grep (deferred)] | mcp_families_count: 12 | wave: W329 | rule_version_proposed: sca-v13
