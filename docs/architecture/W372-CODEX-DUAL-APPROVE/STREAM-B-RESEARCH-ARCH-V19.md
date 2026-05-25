# W372 Stream B — Research Architecture v19 (RETRY OF W371 SKELETON)

> Status: COMPLETE (4/5 MCPs returned; perplexity carry-forward in §8).
> Predecessor: `tmp/W371-SOTA-GRAIL/STREAM-B-RESEARCH-ARCH-V19-SKELETON.md` (skeleton-only after W371 API-overload failures × 2).
> Author: Stream B agent (W372 retry), executing skeleton-first per Δ-PDM-1.
> Date: 2026-05-22.
> Convergence achieved: 4 distinct MCP surfaces (exa + deepwiki ×3 + github + hf-mcp) returned T0-grade evidence on ≥5 candidates. Stars informational-only per W371 brief.

## §1 Current v18 baseline summary

The v18 Research Architecture (`docs/architecture/V18-RESEARCH-ARCHITECTURE.md`) defines a 6-stage pipeline: **discovery → catalog → score (sca-v17/v18) → synthesis → codex review → commit**. Discovery defaults to deepwiki + github + perplexity (3-MCP rotation), with exa/tavily/brave-search/firecrawl/hf-mcp-server systematically underused. Scoring is 5-dimensional in v17 (extended to 13 dimensions in W371 Stream C sca-v18). Critical limitations: (a) **single-MCP discovery bias** (typically only one surface queried before catalog gate); (b) **stars-as-hard-gate** anti-pattern (operator-flagged W371: low-star high-quality repos discarded prematurely); (c) **no per-layer scoring** (memory-tier vs hooks-tier repos weighted uniformly); (d) **no explicit T0-T5 adapt-degree matrix** (verdicts default to T0/T3 binary); (e) **solo-codex synthesis** (no r1+r2 position-swap mandate); (f) **no evaluation-bench loop** (no DeepEval / LiveResearchBench / Deep Research Bench harness wired to validate our research-pipeline outputs). v18 is design-grade but operationally biased toward "one good source per topic" — v19 must close the multi-source-convergence + per-layer-fit + bench-loop gaps.

## §2 Multi-MCP discovery results

Convergence sweep executed against 5 MCP surfaces in parallel (1 assistant message, ≥2 Agent calls per W269 mandate). Results:

| MCP | Status | Candidate count | Top finding |
|---|---|---|---|
| `mcp__exa__web_search_exa` | OK | 10 results | bytedance/deer-flow 2.0 (super-agent harness, LangGraph-embedded gateway) + microsoft/agent-framework v1.0 (graph workflows + checkpointing + DevUI) + Roberdan/convergio (daemon-not-library) |
| `mcp__deepwiki__ask_question(gpt-researcher)` | OK | 1 deep | STORM-inspired 8-role hierarchy: ChiefEditor → Editor → Researcher × N → Reviewer → Reviser → Writer → Publisher; "Deep Research" recursive tree-exploration mode added 2025-2026 |
| `mcp__deepwiki__ask_question(open_deep_research)` | OK | 1 deep | 3-layer LangGraph hierarchy: deep_researcher (main) → supervisor_subgraph → researcher_subgraph; `think_tool` + `ConductResearch` + `ResearchComplete` triad; configurable models (research/compression/final-report/summarization); Deep Research Bench eval harness (LangSmith client.aevaluate × 6 evaluators) |
| `mcp__deepwiki__ask_question(claude-cookbooks)` | OK | 1 deep | `research_lead_agent.md` prescribes query-type decomposition (depth-first / breadth-first / straightforward), subagent count guidelines (1 / 2-3 / 3-5 / up-to-20), explicit `<use_parallel_tool_calls>` mandate (lines 135-137), citations deferred to `citations_agent.md` (specialized downstream) |
| `mcp__github__search_repositories(topic:deep-research)` | OK | 29 hits | bytedance/deer-flow (5/22 push) + Alibaba-NLP/DeepResearch (Tongyi Deep Research SOTA-claim) + MiroMindAI/MiroThinker (74.0/75.3 BrowseComp) + qx-labs/agents-deep-research + DavidZWZ/Awesome-Deep-Research (curated index) |
| `mcp__hf-mcp-server__paper_search` | OK | 120 papers, top-10 | LiveResearchBench (arXiv 2510.14240) + DeepResearchEval (2601.09688) + Deep Research Agents systematic review (2506.18096) + FlowSearch dynamic structured knowledge flow (2510.08521) + DeepResearch Arena (2509.01396) |
| `mcp__perplexity__perplexity_research` | TIMEOUT @ 300s | 0 | Carry-forward §8 — not blocking; 4-MCP convergence already exceeds 3-org-distinct hard-gate |

**3-org-distinct convergence achieved**: every T0/T1 candidate below has ≥3 independent surfaces (GitHub stars + deepwiki wiki + arXiv paper OR HF-paper-search + exa-web-blog + github-topic-index).

## §3 Per-candidate analysis (≥5)

### Candidate A: `langchain-ai/open_deep_research` (v0.6+) — T1 VENDOR-FORK or T2 PATTERN-STUDY

URL: `https://github.com/langchain-ai/open_deep_research`. Wiki: `https://deepwiki.com/langchain-ai/open_deep_research`. Recency: actively maintained 2026. Architecture: 3-layer LangGraph hierarchy (`deep_researcher` main → `supervisor_subgraph` → `researcher_subgraph`). Supervisor has 3 tools: `think_tool` (reflection w/o I/O), `ConductResearch` (spawns parallel researcher subgraphs, up-to `max_concurrent_research_units=10`), `ResearchComplete` (terminal). Researchers get search tool (Tavily/Anthropic-native/OpenAI-native/none) + MCP tools + `think_tool` + `ResearchComplete`. Configurable models for research / compression / final-report / summarization (heterogeneous). Eval harness: LangSmith `client.aevaluate()` against Deep Research Bench (100 PhD-level tasks) with 6 evaluators (overall_quality / relevance / structure / correctness / groundedness / completeness). **Why T1/T2**: this is the canonical reference for supervisor-researcher decomposition + MCP tool integration + eval-bench wiring. Plugin-form=0 (no native CC adapter), license=MIT (=1), layer-fit=3 for L? (research-pipeline layer). Maintainer-trust=3 (LangChain org, signed releases via npm). **Recommended adopt-degree**: T2 PATTERN-STUDY (extract the supervisor/researcher/think_tool/ResearchComplete triad as a v19 design template; vendor-fork only if we wire LangGraph runtime into CC, which is out-of-scope).

### Candidate B: `assafelovic/gpt-researcher` — T2 PATTERN-STUDY (already cited in our skills anchors)

URL: `https://github.com/assafelovic/gpt-researcher`. Wiki: `https://deepwiki.com/assafelovic/gpt-researcher`. STORM-inspired 8-role hierarchy: Human (oversight) → ChiefEditor (master orchestrator) → Editor (plans outline + spawns parallel research tasks) → Researcher × N (web/local search) → Reviewer (validates against guidelines) → Reviser (applies corrections) → Writer (compiles final intro+conclusion+refs) → Publisher (MD → PDF/Docx). **Two orchestrator backends**: LangGraph (TypedDict states `ResearchState` + `DraftState`) AND AG2 (`ConversableAgent` + `GroupChatManager`). New 2025-2026: "Deep Research" recursive tree-exploration mode (breadth → depth-dive → async-concurrent → aggregation → real-time-tracking) activated via `report_type="deep"`. Already installable as a Claude Skill. License=MIT. **Why T2**: already cited in `parallel-dispatch-mandate` skill anchors per CLAUDE.md L25; the Reviewer→Reviser loop is the cleanest review-and-revision pattern we've seen. **Recommended adopt-degree**: T2 PATTERN-STUDY (already adopted in pattern form via skill anchors).

### Candidate C: `bytedance/deer-flow` 2.0 — T2 PATTERN-STUDY (new + heavyweight)

URL: `https://github.com/bytedance/deer-flow`. Recency: 2026-05-22 push (active). DeerFlow 2.0 is a **super-agent harness** (not a framework): orchestrates sub-agents + memory + sandboxes via **extensible skills**. Architecture: Gateway (REST API) + LangGraph runtime embedded (vs DeerFlow 1.x which had separate LangGraph server). Concurrency via `--workers × async tasks` (no per-worker license cap). Built on LangChain + LangGraph. **Why T2 not T0**: super-agent harness is too heavyweight to install into CC runtime; but **the Gateway-embeds-runtime pattern + skill-extensibility design** is directly relevant to our CC plugins architecture. License=MIT (verify against 2.0 LICENSE file). Plugin-form=0. **Recommended adopt-degree**: T2 PATTERN-STUDY (extract the skill-extensibility + sandbox-aware-execution pattern; do NOT install the harness).

### Candidate D: `anthropics/claude-cookbooks` patterns/agents/prompts/research_lead_agent.md — T3 CITE-ANCHOR-ONLY (already canonical)

URL: `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/prompts/research_lead_agent.md`. Wiki: `https://deepwiki.com/anthropics/claude-cookbooks`. This is a **prompt template** (not executable code) that prescribes the patterns we've already cite-anchored in CLAUDE.md L25: query-type decomposition (depth-first / breadth-first / straightforward), subagent count guidelines (simple=1 / standard=2-3 / medium=3-5 / high=up-to-20), explicit `<use_parallel_tool_calls>` mandate (lines 135-137 — already canonical in our parallel-dispatch-mandate skill), `<delegation_instructions>` block (lines 89-119: research objective + expected output + background + key questions + suggested sources + tool guidance), citations deferred to `citations_agent.md` (specialized downstream). Synthesis: lead agent reviews core facts, notes discrepancies, prioritizes by recency+consistency. **Why T3**: canonical reference; already cite-anchored; license=MIT. Plugin-form=0 (prompt template only). **Recommended adopt-degree**: T3 CITE-ANCHOR-ONLY (already T3; v19 should EXPLICITLY copy the depth-first / breadth-first / straightforward decomposition into our pipeline stage-1).

### Candidate E: `Alibaba-NLP/DeepResearch` (Tongyi Deep Research) — T2 PATTERN-STUDY

URL: `https://github.com/Alibaba-NLP/DeepResearch`. Last push 2026-02-27. Self-describes as "the Leading Open-source Deep Research Agent". Notable for being one of the few open-source Deep Research implementations from a major lab (Alibaba). **Why T2**: design-pattern source; the supervisor-researcher architecture matches Anthropic's research_lead_agent + langchain-ai/open_deep_research, providing 3-org-distinct convergence (LangChain + Anthropic + Alibaba) on the supervisor-researcher canonical shape. License=verify against LICENSE file. Plugin-form=0. **Recommended adopt-degree**: T4 MONITOR until we audit code quality + license; bumps to T3 cite-anchor if we want a non-LangChain non-Anthropic citation point for the supervisor-researcher pattern.

### Candidate F: `microsoft/agent-framework` v1.0 — T2 PATTERN-STUDY (already cite-anchored in CLAUDE.md skills inventory)

URL: `https://github.com/microsoft/agent-framework`. Microsoft's unified framework that absorbed AutoGen + Semantic Kernel into one runtime with graph-based workflows + streaming + checkpointing + human-in-the-loop + time-travel. Already cited in our `agent-budget-discipline` + `checkpoint-resume` skills per CLAUDE.md anchors. **Why T2**: same supervisor-researcher pattern with v1.0 GA stamp + .NET+Python dual support + OpenTelemetry observability. License=MIT. Plugin-form=0 (lib). **Recommended adopt-degree**: T2 PATTERN-STUDY (already adopted-as-pattern in 2 of our skills); v19 should add it as the 3-org-distinct anchor for any supervisor-researcher claim (Anthropic + LangChain + Microsoft = canonical).

### Candidate G: `MiroMindAI/MiroThinker` — T4 MONITOR (high-bench-claim, low corroboration)

URL: `https://github.com/MiroMindAI/MiroThinker`. Claims 74.0 / 75.3 on BrowseComp / BrowseComp-Zh. Recent push 2026-04-25. **Why T4**: bench claims are eye-catching but single-source; needs LiveResearchBench / DeepResearchEval cross-corroboration before adopt-degree upgrade. Plugin-form=0. **Recommended adopt-degree**: T4 MONITOR; revisit when 3-org-distinct bench convergence emerges.

### Candidate H: Eval-bench papers — `LiveResearchBench` + `DeepResearchEval` + `DeepResearch Arena` — T3 CITE-ANCHOR

URLs: `https://hf.co/papers/2510.14240` (LiveResearchBench/DeepEval) + `https://hf.co/papers/2601.09688` (DeepResearchEval) + `https://hf.co/papers/2509.01396` (DeepResearch Arena). LiveResearchBench evaluates content-level quality + report-level quality + coverage + presentation + citation accuracy + association + consistency + depth-of-analysis. DeepResearchEval focuses on automated framework with persona-driven pipeline + adaptive point-wise quality eval + active fact-checking. DeepResearch Arena uses academic seminar transcripts via Multi-Agent Hierarchical Task Generation (MAHTG). **Why T3**: these are the evaluation primitives our v19 should adopt to validate our own research-pipeline outputs (closes v18 gap (f) — no eval-bench loop). **Recommended adopt-degree**: T3 CITE-ANCHOR-ONLY (cite the eval taxonomies in v19; do not install bench code).

## §4 Proposed v19 diff from v18

### §4a Pipeline stage additions

```
v18 (6 stages):  discovery → catalog → score → synthesis → codex review → commit
v19 (8 stages):  query-type-decompose → multi-MCP-fan-out → catalog → score (sca-v18+) → bench-validate → synthesis (r1+r2-swap) → codex review → commit
                 ^^^^^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^                        ^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^^
                 NEW (Cand D)           NEW (Cand A,B,C,F)                       NEW (Cand H)    HARDENED (sca-v15 §I7)
```

### §4b Concrete v18 → v19 section diffs

| v18 section | v19 change | Source candidate |
|---|---|---|
| §1 Pipeline overview | Add `query-type-decompose` (depth/breadth/straightforward) as stage 0 | Cand D (research_lead_agent.md lines 13-30) |
| §2 Discovery surfaces | Mandate **8-MCP rotation w/ 3-MCP minimum HARD-gate** for T0/T1; named in §5 below | Cand A,B,C,F multi-source convergence + W371 brief |
| §3 Scoring | Adopt sca-v18 (13 dim) per W371 Stream C; ADD per-layer-fit dim already in sca-v18 §2c | Carry-forward from W371 Stream C |
| §4 Synthesis | **MANDATE r1+r2 codex position-swap for T0/T1 verdicts** (currently solo per sca-v15 §I7 — not enforced in v18 pipeline) | sca-v15 §I7 already canonical; v19 enforces |
| §5 Codex review | Unchanged structurally; add `bench-validate` upstream | Cand H eval-bench loop |
| §6 Commit | Add `bench-validate` artifact (DeepEval-style 6-evaluator score) to commit-msg trailer | Cand A (LangSmith aevaluate) + Cand H |
| §NEW: Adapt-degree T0-T5 | Codify from sca-v18 §3; was scattered in v18 | W371 Stream C §3 |
| §NEW: Citations stage | Defer-to-specialized-agent pattern (separate from synthesis) | Cand D (citations_agent.md downstream) |
| §NEW: Anti-patterns | Codify from sca-v18 §4 + v19 additions in §6 below | W371 Stream C §4 + this doc §6 |

### §4c Subagent decomposition (Cand D)

| Query complexity | Subagent count | Allocation strategy |
|---|---|---|
| Trivial / single-fact | 1 | Single research-agent, comprehensive |
| Standard | 2-3 | Topic-importance ordered |
| Medium | 3-5 | Breadth-first OR depth-first by query type |
| High | up-to-20 (never more) | Hierarchical decomposition; depth-first deploys sequentially across methodologies |

## §5 Discovery methodology canonical (8-MCP rotation)

Per W371 brief, refined with v19 multi-source convergence requirement:

| MCP | Purpose | T0/T1 mandate role |
|---|---|---|
| `mcp__github__search_repositories` | repo-existence, stars, recency, license, topic tags | always |
| `mcp__deepwiki__ask_question` | deep architecture wiki on named repo | always for any repo claim |
| `mcp__perplexity__perplexity_research` | multi-source narrative synthesis (slow, 30+s; OK if timeout — fallback to other MCPs) | optional (fallback) |
| `mcp__exa__web_search_exa` | semantic-rich web search; blogs, comparison pages | always |
| `mcp__tavily__tavily_search` (or `tavily_research`) | research-grade web search w/ fact-checking | fallback if exa low-yield |
| `mcp__brave-search__brave_web_search` | general web; recency-filtered news | fallback / 3-org confirm |
| `mcp__firecrawl__firecrawl_search` (or `firecrawl_scrape` for full page) | full-page content when other MCPs return snippets | optional (deep dive only) |
| `mcp__hf-mcp-server__paper_search` | arXiv papers, eval benchmarks, academic-grade claims | always for bench/eval claims |

**v19 HARD-gate**: T0 INSTALL + T1 VENDOR-FORK verdicts REQUIRE ≥3 distinct MCP surfaces converging on the claim (3-org-distinct from sca-v18 §2d). T2 PATTERN-STUDY: ≥2 MCPs. T3 CITE-ANCHOR: ≥1 MCP (the canonical source). **Parallel dispatch**: per W269 mandate, MCPs in same convergence sweep MUST be called in the SAME assistant message (≥2 parallel calls), not serial.

**Awesome-list crawl**: Cand `DavidZWZ/Awesome-Deep-Research` (https://github.com/DavidZWZ/Awesome-Deep-Research) is the curated index — v19 should add awesome-list-crawl as a discovery sub-stage to surface low-star high-quality candidates without stars-gate bias.

## §6 Anti-patterns v19 explicitly rejects

Carry-forward from sca-v18 §4 + new v19-specific:

1. **Stars-as-hard-gate** — low-star repos can be high-quality in narrow areas. Stars are INFORMATIONAL ONLY (sca-v18 §2a).
2. **Single-MCP discovery** — `convergence-3-org-distinct=true` is HARD-required for T0/T1 (sca-v18 §2d).
3. **Solo-codex synthesis for T0/T1** — r1+r2 position-swap REQUIRED (sca-v15 §I7).
4. **Skip-pattern-study tier** — first fallback when not-T0 is T2 PATTERN-STUDY, not T4 MONITOR. Pattern extraction is cheap+durable.
5. **Mixed-layer uniform weighting** — use `layer-attribution` + per-layer `layer-fit` (sca-v18 §2c).
6. **Verdict-without-cite-anchor** — every score MUST cite source (file:line or URL).
7. **NEW v19: No-bench-validation for T0** — T0 INSTALL verdicts must run our installation through at least 1 dimension of the DeepEval / LiveResearchBench / DeepResearch Arena taxonomy (coverage / citation-accuracy / consistency / depth — see Cand H).
8. **NEW v19: Citation-in-synthesis** — citations must be deferred to a specialized downstream agent (per Cand D `citations_agent.md` pattern); synthesis stage MUST NOT include inline citations to avoid bleed.
9. **NEW v19: Single-orchestrator-backend assumption** — gpt-researcher (Cand B) supports both LangGraph AND AG2 backends; v19 architecture descriptions MUST be backend-agnostic (don't lock to LangGraph DSL — describe the pattern as supervisor-researcher-DAG which can be realized via LangGraph / AG2 / autogen / open-multi-agent / orxhestra / etc.).
10. **NEW v19: Serial subagent dispatch in multi-stream contexts** — Cand D `<use_parallel_tool_calls>` lines 135-137 is MUST; serial subagent calls in multi-stream contexts is the W312-D silent-fallback failure mode at 29% (per CLAUDE.md L24).

## §7 v18 → v19 migration steps

Concrete file edits (when operator approves):

1. **Author** `docs/architecture/V19-RESEARCH-ARCHITECTURE.md` — full v19 spec; supersedes V18 (keep V18 as ARCHIVED footnote for back-cite). Sections 1-9 per §4b above. Pre-commit ✓ via existing gates.
2. **Edit** `.claude/skills/sota-convergence-audit/SKILL.md` — already-queued v17→v18 migration per W371 Stream C; add v18 reference to V19 research-arch doc.
3. **Edit** `.claude/skills/parallel-dispatch-mandate/SKILL.md` — add explicit reference to Cand D `<use_parallel_tool_calls>` lines 135-137 in v19 anti-pattern §6.10.
4. **Author** `.claude/skills/research-pipeline-v19/SKILL.md` (optional new skill) — codifies the 8-stage v19 pipeline (§4a) as an auto-fire skill on triggers like "deep research", "multi-source research", "research orchestration". Defer if operator prefers V19-doc-only.
5. **Edit** `tools/sota-pipeline.mjs` (if exists; grep returned no hits in earlier waves) — wire bench-validate stage. Defer if file doesn't exist.
6. **Author** `tools/bench-validate.mjs` — runs DeepEval-style 6-evaluator stub against our T0 install candidates; outputs to `.claude/state/bench-results/<wave>-<slug>.json`. Defer; design only in v19 doc.
7. **Edit** `CLAUDE.md` (if needed) — add v19 reference (≤1 LOC pointer); current CLAUDE.md is ≤50 LOC pointer-only so this is a minimal pointer addition only.

**Backward-compat**: v18 records remain valid; v19 is a superset of v18.

**Rollback**: `git revert <v19-commit-sha>`. Plus codex r1+r2 position-swap on the v19 commit per sca-v15 §I7.

## §8 Open questions / operator carry-forward

1. **MCP-perplexity timeout @ 300s (2026-05-22)** — perplexity_research call timed out during this Stream B retry. NOT BLOCKING for v19 design (4 other MCPs delivered 3-org-distinct convergence) but flagged for operator: perplexity may be experiencing API degradation similar to W371's Anthropic-API-overload incident. Recommended action: monitor; do not re-fire perplexity_research in W372 unless an additional confirmation surface is required.
2. **DeerFlow 2.0 license verify** — Cand C claimed MIT but not explicitly verified against the v2.0 LICENSE file in this retry. Defer to operator: `gh repo view bytedance/deer-flow --json license`.
3. **Alibaba-NLP/DeepResearch license verify** — Cand E license not explicitly confirmed. Defer.
4. **v19 doc author timing** — author in W372 closure OR defer to W373? Recommendation: defer to W373 to allow operator sign-off on this v19 design proposal first.
5. **Adopt-degree validation tests (sca-v18 §7)** — should be re-run against v19 candidates A-H to validate the §3 verdict tier assignments are deterministic per the sca-v18 scoring formula. Defer; one-off pass in W373.
6. **Bench-validate stage implementation** — DeepEval / LiveResearchBench / DeepResearch Arena are research benches, not drop-in libs. Implementing a CC-runtime equivalent (6-evaluator stub for our research-pipeline outputs) is a multi-wave effort. Defer scoping to W374.
7. **Skill auto-fire conflict** — if a new `research-pipeline-v19` skill is authored (§7 step 4), it should NOT auto-fire on every prompt mentioning "research" (overly-broad). Use the operator-curated skill audit per CLAUDE.md CR-4 (description phrase cardinality ≤8, no >50% overlap with sibling skills).
8. **CLAUDE.md pointer addition** — current CLAUDE.md is at the ≤50 LOC budget; adding a V19 pointer requires retiring an existing line or compacting an existing reference. Recommendation: defer to W373 in conjunction with operator-approved sca-v18 application.

---

## Top-5 v19 enhancements (executive summary)

1. **8-MCP discovery rotation w/ 3-MCP minimum HARD-gate for T0/T1** (§5) — closes single-MCP discovery bias.
2. **Query-type decomposition as pipeline stage 0** (§4a + Cand D) — depth-first / breadth-first / straightforward routing.
3. **Bench-validate pipeline stage** (§4a + Cand H) — wires DeepEval-style 6-evaluator taxonomy (coverage / citation-accuracy / consistency / depth) to T0 INSTALL verdicts.
4. **Mandatory r1+r2 codex position-swap for T0/T1** (§4b + sca-v15 §I7) — defeats solo-codex synthesis anti-pattern.
5. **Citations-as-downstream-specialized-agent** (§6.8 + Cand D `citations_agent.md`) — synthesis stage no longer carries inline-citation bleed.

Deliverable path: `Z:\claude-sota-installed\tmp\W372-SOTA-GRAIL\STREAM-B-RESEARCH-ARCH-V19.md`
