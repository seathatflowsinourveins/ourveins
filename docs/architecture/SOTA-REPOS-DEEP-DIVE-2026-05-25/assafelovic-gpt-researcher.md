# SOTA Deep-Dive — assafelovic/gpt-researcher v3.4.4

> **Wave**: W433-REF / SOTA-REPOS-DEEP-DIVE-2026-05-25 cohort
> **Date scored**: 2026-05-25
> **Schema**: sca-v23-multi-angle-convergence
> **Target**: `github.com/assafelovic/gpt-researcher @ v3.4.4 (sha 27abde0)` — pin `92bfc03` (HEAD `main`, 2026-04-16)
> **Why this target**: direct inspiration for sca-v23 multi-angle convergence; already installed as MCP per W411 + W433-REF-F. This dive tests whether the inspiration was fully encoded into v23 or whether v23 missed primitives that should be backported.
> **Decision tier preview (this report concludes)**: `PATTERN-STUDY` (already-installed; backport 4 architectural primitives into v23 + 3 runtime additions).

---

## §0  Reproducibility ledger

| Angle | Tool | Run | Status |
|---|---|---|---|
| A1 — perplexity sonar | `mcp__perplexity__perplexity_research` | sonar-deep-research, reasoning_effort=high | timed-out @300s (model overloaded mid-day); fell back to `perplexity_ask` sonar-pro, search_context_size=high, recency=year — only weak GitHub-mirror hits (citations 1-8 mostly stargazer aggregates, not source). Cross-checked vs direct source-read so the weak-A1 does not propagate. |
| A2 — exa neural search | not invoked | N/A this cohort | Substituted by direct source-read of cloned repo. |
| A3 — firecrawl crawl | not invoked | N/A | Substituted by direct source-read. |
| A4 — tavily | not invoked | N/A | Substituted by direct source-read. |
| A5 — cognition deepwiki | `mcp__deepwiki__ask_question` × 2 | 4-part composite Q1 + 6-part composite Q2 | Both succeeded; deepwiki has full repo indexed but flagged it cannot pin to v3.4.4 specifically (returns "current state"). |
| A6 — repomix | `mcp__repomix__pack_remote_repository` × 2 | compress=true, both with and without `includePatterns` | Both returned `totalFiles: 0` — the remote-pack path is broken for this repo size in this MCP build (>43 MB triggers silent fail). Substituted with direct read of the local clone at `Z:/repos/deps/gpt-researcher` HEAD `92bfc03`. |
| A7 — registry | `gh api repos/assafelovic/gpt-researcher` + `commits` + `releases` + `tags` + `pulls` | concurrency=4 batch | Clean. |

**Convergence floor met**: ≥3 distinct angles (A1 weak + A5 deepwiki ×2 + A7 registry + direct source-read which I record as A6-substitute). `research_angles.minProperties: 3` satisfied.

---

## §1  What it is (one-paragraph anchor)

**gpt-researcher** is a Python autonomous-research framework that decomposes a user query into multi-section sub-queries, fans out parallel retrievers (Tavily / Brave / Google / Arxiv / Bing / DuckDuckGo / Exa / SearchAPI / Searx / Semantic Scholar / SerpAPI / Serper / PubMed Central / xquik / bocha / custom / MCP-tools), scrapes + curates sources via an LLM `SourceCurator`, then loops a Researcher → Reviewer → Reviser LangGraph until guideline-acceptance OR (a separate counter) `max_revisions`. It ships its own MCP **retriever** (consumes other MCPs) AND has spun out its own MCP **server** (`gptr-mcp`, separate repo). Stats: **27,272 stars, 3,667 forks, license dual-declared MIT (pyproject) + Apache-2.0 (LICENSE file)** — see §3.D for the conflict — last commit `92bfc03` 2026-04-16, last release `v3.4.4` 2026-04-16, 232 open issues, 15 open PRs.

---

## §2  Angle-by-angle findings

### A5 — Cognition deepwiki (×2 composite asks)

**Q1 (architecture / prompts / scoring / version)**

- Multi-agent loop = `EditorAgent` (defines `StateGraph` over `DraftState`) → `ResearchAgent.run_depth_research()` → `ReviewerAgent.review_draft()` → conditional → `ReviserAgent.revise_draft()` → loop back to Reviewer until `review is None`.
- Outer orchestration = `ChiefEditorAgent._run_section()` over `ResearchState`, controlled by `max_revisions` in `task.json` (default 3 in the `multi_agents_ag2/` branch; **NOT enforced in `multi_agents/agents/editor.py` itself** — see §3.A).
- Prompt-versioning lives in `gpt_researcher/prompts.py` `PromptFamily` class (NOT in a `config/variables/` folder as our v23 schema cite assumed). Only the `BaseConfig` TypedDict lives under `gpt_researcher/config/variables/` (`base.py` + `default.py`).
- Source quality scored by `AdaptiveDeepResearchSkill._assess_quality()` using 4-dimension rubric (completeness / depth / reliability / actionability), each 1-10, equal-weighted at 25%, target threshold 7.0 — **but this skill is a PROPOSAL in `docs/docs/proposals/adaptive-deep-research.md` and is NOT in `gpt_researcher/skills/`**. Production v3.4.4 ships `DeepResearchSkill` (fixed depth/breadth) and `SourceCurator` (LLM-prompt rubric, no numerical score returned).

**Q2 (prompts layout / MCP server / observability / editor-reviewer-reviser specifics / adaptive skill / retrievers)**

- MCP server: extracted out of monorepo. `mcp-server/README.md` is a redirect-stub to `https://github.com/assafelovic/gptr-mcp`. The in-repo MCP usage is only the **MCP retriever** (`gpt_researcher/retrievers/mcp/retriever.py`) which consumes external MCP tools.
- Observability: **LangSmith only**, wired by detecting `LANGCHAIN_API_KEY` env-var in `multi_agents/main.py:13-14` and `backend/server/server_utils.py:283`. No Langfuse integration anywhere — `grep -ri langfuse` returns zero hits.
- Retrievers shipped (16 total): `arxiv, bing, bocha, custom, duckduckgo, exa, google, mcp, pubmed_central, searchapi, searx, semantic_scholar, serpapi, serper, tavily, xquik`. Tavily is default per `DEFAULT_CONFIG["RETRIEVER"]: "tavily"`.

### A7 — Registry (gh api)

| Field | Value |
|---|---|
| Stars | 27,272 |
| Forks | 3,667 |
| Open issues | 232 |
| Subscribers (watchers) | 171 |
| Default branch | `main` |
| License (gh api) | `Apache-2.0` |
| Created | 2023-05-12 |
| Last push | 2026-04-16 17:41 UTC |
| Last commit on main | `92bfc03` "Refine GPT Researcher description in README" |
| Latest release | `v3.4.4` 2026-04-16 |
| Recent release cadence | v3.3.5 (2025-09-23) → v3.4.0 (2026-01-29) → v3.4.4 (2026-04-16) — ~monthly major, last 6 months: 9 releases |
| `pyproject.version` | **`0.14.7`** — diverges from the git-tag `v3.4.4` (tag is product version; pyproject is module-publish version; PyPI publishes `0.14.7`). |
| Size | 43 MB |
| Topics | `agent, ai, automation, deepresearch, llms, mcp, mcp-server, python, research, search, webscraping` |
| Open PRs notable | #1783 `feat: add MAX_REVISIONS guard to prevent infinite revision loop` (2026-05-22, **NOT YET MERGED** — confirms §3.A finding); #1782 `feat(cli): add preflight, retrieval, and budget safeguards`; #1781 `feat(cost): track Anthropic usage from native metadata`; #1773 `fix(deep_research): parse LLM output with json_repair + regex fallback`; #1769 `Limit multi-agent human plan revisions` |

### A6-substitute — Direct source-read (Z:/repos/deps/gpt-researcher @ 92bfc03)

Files read in full or in critical-segment for this dive:
1. `multi_agents/agents/editor.py` (full, 169 LOC) — StateGraph builder.
2. `multi_agents/agents/reviewer.py` (full, 80 LOC) — Review-draft prompt.
3. `multi_agents/agents/reviser.py` (full, 75 LOC) — Revise-draft prompt.
4. `multi_agents/agents/orchestrator.py` (full, 119 LOC) — ChiefEditor outer graph.
5. `multi_agents/agents/human.py` (full, 53 LOC) — HumanAgent plan-review.
6. `multi_agents/main.py` (full, 62 LOC) — LangSmith wiring.
7. `multi_agents/task.json` (full sample) — task schema with `guidelines[]`, `model`, `max_sections`, `include_human_feedback`, `follow_guidelines`, `verbose`. **No `max_revisions` field** in the sample.
8. `gpt_researcher/config/variables/base.py` (full, 50 LOC) — `BaseConfig` TypedDict.
9. `gpt_researcher/config/variables/default.py` (full, 54 LOC) — `DEFAULT_CONFIG`.
10. `gpt_researcher/config/config.py` (full, 313 LOC) — `Config` class with env-override precedence.
11. `gpt_researcher/prompts.py` segments — `PromptFamily` class + 3 Granite subclasses + factory `get_prompt_family`.
12. `gpt_researcher/skills/deep_research.py` (full, 427 LOC) — production `DeepResearchSkill`.
13. `gpt_researcher/skills/curator.py` (full, 97 LOC) — `SourceCurator` class.
14. `gpt_researcher/prompts.py:curate_sources` (full, lines 314-346) — 5-criterion source rubric prompt.
15. `gpt_researcher/retrievers/mcp/retriever.py` (head + signatures) — 2-stage tool-select + research.
16. `mcp-server/README.md` (full) — redirect to gptr-mcp.
17. `docs/docs/proposals/adaptive-deep-research.md` (full, 707 LOC, Chinese-authored RFC) — 4-dimension scoring rubric proposal.
18. `pyproject.toml` head + `LICENSE` head — license-conflict evidence.
19. `langgraph.json` — graph manifest for LangGraph Studio integration.

---

## §3  Empirical findings (verify-before-claim, line-cited)

### §3.A — `max_revisions` is NOT enforced in the LangGraph branch

The `multi_agents/agents/editor.py:138-142` conditional edge has **no revision counter**:

```python
workflow.add_conditional_edges(
    "reviewer",
    lambda draft: "accept" if draft["review"] is None else "revise",
    {"accept": END, "revise": "reviser"},
)
```

The only termination is the Reviewer returning `None` (its prompt says "If the draft meets all the guidelines, please return None" at `reviewer.py:34`). There is **no `max_revisions` field in `DraftState`** and no counter increment anywhere in this branch. The AG2 branch (`multi_agents_ag2/agents/orchestrator.py`) DOES enforce `max_revisions = task.get("max_revisions", 3)` in `_run_section`, but the LangGraph branch — which is the default per `langgraph.json` — does not. Open PR **#1783 (2026-05-22, NOT YET MERGED) "feat: add MAX_REVISIONS guard to prevent infinite revision loop"** confirms this is a known production gap.

**Implication for v23**: an evaluator-optimizer loop primitive must ALWAYS expose a numerical iteration ceiling, independent of the LLM-judge returning a stop-token. v23's `iterate-fix-failing-tests`-class loops in our runtime use a ceiling `N=5` (see CLAUDE.md skill catalog); gpt-researcher's default-branch lacks this and is the cautionary tale.

### §3.B — Source quality scoring: rubric is qualitative, not quantitative

`SourceCurator.curate_sources()` (`gpt_researcher/skills/curator.py:33-96`) does NOT produce a numeric score. It sends `prompt_family.curate_sources(query, source_data, max_results)` to `smart_llm` with `temperature=0.2, max_tokens=8000`, gets back a JSON list of curated sources (same shape as input), and exception-falls-back to the original list on parse failure. The underlying prompt at `gpt_researcher/prompts.py:314-346` enumerates **5 evaluation criteria**:

1. **Relevance** — "directly or partially connected to the research query. Err on the side of inclusion."
2. **Credibility** — "Favor authoritative sources but retain others unless clearly untrustworthy."
3. **Currency** — "Prefer recent information unless older data is essential or valuable."
4. **Objectivity** — "Retain sources with bias if they provide a unique or complementary perspective."
5. **Quantitative Value** — "Give higher priority to sources with statistics, numbers, or other concrete data."

These are inclusion-biased rubric heuristics (the curator explicitly says "Err on the side of inclusion", "Overlapping content is acceptable") aimed at **breadth, not score-ranking**. The 4-dimension scored rubric (completeness / depth / reliability / actionability with `quality_threshold: 7.0`) ONLY exists in the unmerged adaptive-deep-research RFC at `docs/docs/proposals/adaptive-deep-research.md`.

### §3.C — Prompt-versioning is class-inheritance, not file-versioning

The mechanism is `gpt_researcher/prompts.py` `PromptFamily` base class + three concrete subclasses (`GranitePromptFamily` / `Granite3PromptFamily` / `Granite33PromptFamily`) registered in `prompt_family_mapping: Dict[PromptFamilyEnum, type[PromptFamily]]`. `Config.PROMPT_FAMILY` (default `"default"`) selects via `get_prompt_family()` factory. The override precedence is the standard `DEFAULT_CONFIG → JSON config file → env-var` per `Config._set_attributes()` at `gpt_researcher/config/config.py:62-83`. **No file-based prompt-version-rollback layer** (vs our local `prompt-versioning-and-rollback` skill which uses epoch-timestamped filenames per Anthropic Skills System pattern).

### §3.D — License conflict: MIT vs Apache-2.0

```
pyproject.toml:6   license = "MIT"
pyproject.toml:69  license = { text = "MIT" }
LICENSE            Apache License Version 2.0, January 2004
gh api license     "Apache-2.0"  ← GitHub's detector reads LICENSE file
```

This is a real, currently-shipping inconsistency. GitHub's license-detector authority is the `LICENSE` file (Apache-2.0). PyPI metadata says MIT. Both Apache-2.0 and MIT are permissive and pass our CR-1 trust-tuple `(b) license_safe = true`, but the conflict itself is a maintainer-discipline yellow-flag. **Recommendation**: when citing the license for downstream sca-v23 verdicts, prefer the GitHub-authoritative `Apache-2.0` and note the discrepancy in `trust_tuple_R1a.license_safe.rationale`.

### §3.E — Windows MCP-extra restriction

`pyproject.toml:50`: `mcp = { version = ">=1.0.0", markers = "platform_system != 'Windows'" }`. The MCP-retriever path is **disabled on Windows** at install time. Our W411 install was via `gptr-mcp` (the spun-out MCP server repo), not via `gpt-researcher` itself, so this restriction does not affect our W433-REF-F runtime — but it would block any future plan to use `gpt-researcher` as a Python library on Windows with MCP enabled. Cite-anchored to local CLAUDE.md "Windows-native runtime → CC OS-sandbox structurally inert" R5-corollary context.

### §3.F — HITL is plan-only, not finding-level

`multi_agents/agents/human.py` `HumanAgent.review_plan` is invoked ONCE in the outer ChiefEditor graph (`orchestrator.py:61` → `_add_workflow_edges` 77-81) BEFORE parallel section research begins. It blocks on `websocket.receive_text()` or `input()` to confirm/revise the section-outline. **There is no HITL hook inside the Reviewer-Reviser loop** for low-confidence findings, score-threshold escalation, or per-source dispute. Open PR #1769 "Limit multi-agent human plan revisions" suggests even this single touchpoint is unbounded today.

### §3.G — Outer graph topology (verified)

From `multi_agents/agents/orchestrator.py:52-81`:

```
START → browser (ResearchAgent.run_initial_research)
      → planner (EditorAgent.plan_research)
      → human (HumanAgent.review_plan)              ← HITL gate
        ├─ accept → researcher (parallel fan-out)
        └─ revise → planner (loop)
      → researcher (EditorAgent.run_parallel_research)
                    fans out to N inner StateGraphs via asyncio.gather
                    each inner: researcher → reviewer → [revise|END]
      → writer (WriterAgent.run)
      → publisher (PublisherAgent.run)
      → END
```

The inner researcher-reviewer-reviser loop is INSTANTIATED PER SECTION inside `EditorAgent.run_parallel_research` via `chain.ainvoke(...)` in `asyncio.gather` — section-level parallelism is implemented; revision-level is sequential within each section.

---

## §4  Patterns to backport into sca-v23 (the critical question)

**v23 was inspired by gpt-researcher's multi-angle convergence.** Auditing the actual implementation surfaces these gaps in v23:

### §4.1 — **BACKPORT-A: Iteration-ceiling primitive on the evaluator-optimizer loop**

| What v23 currently has | What gpt-researcher reveals we lack | Fix |
|---|---|---|
| sca-v23 has `codex_verdict.round: integer 1..3` capping codex rounds. | gpt-researcher's PR #1783 evidence shows even mature production code can ship without revision-loop ceilings → infinite-loop class bug. | Add `evaluator_loop_ceiling: { rounds_used: int, ceiling: const 5, terminated_by: enum [threshold_met, ceiling_hit, no_progress] }` block to sca-v23 schema for ANY scored target that USES an evaluator-optimizer pattern internally. |
| | | Cite-anchor: `iterate-fix-failing-tests` skill (local) + PR #1783 (gpt-researcher upstream) + Anthropic claude-cookbooks `patterns/agents/evaluator_optimizer.ipynb`. |

**Rationale**: this is the #1 finding. v23 assumes its targets behave well at runtime; v23's job is to score WHETHER they do. Make the ceiling a scored property.

### §4.2 — **BACKPORT-B: Knowledge-gap explicit field on the assessment**

v23's `scoring_dims` are 12 closed dimensions yielding a composite. gpt-researcher's `AdaptiveDeepResearchSkill._assess_quality` adds two semantic fields that v23 lacks:
- `has_knowledge_gaps: bool`
- `knowledge_gaps: List[str]`
- `suggested_directions: List[str]`

These transform a score from a verdict into a research-routing primitive — they tell the next iteration WHAT to fix. v23 currently has `codex_verdict.rationale: str` (free-text) but no structured gap-list.

**Fix**: add to sca-v23 schema:

```json
"open_questions": {
  "type": "object",
  "required": ["has_gaps", "gaps", "suggested_followups"],
  "properties": {
    "has_gaps":           { "type": "boolean" },
    "gaps":               { "type": "array", "items": { "type": "string" }, "maxItems": 5 },
    "suggested_followups":{ "type": "array", "items": { "type": "string" }, "maxItems": 3 }
  }
}
```

**Rationale**: enables an "audit the verdict" feedback loop where the next wave's research targets the gaps directly (decision-router for follow-up SOTA dives). Cite-anchor: gpt-researcher `adaptive-deep-research.md:340-360`.

### §4.3 — **BACKPORT-C: 4-dimension quality rubric for COMPOSITE_ARCH_QUALITY (D12)**

D12 `composite_arch_quality` in sca-v23 is a single `0..1` number with `rationale` string — opaque. gpt-researcher's adaptive-skill rubric decomposes "quality" into 4 measurable axes that map ONE-TO-ONE onto codebase-architecture review:

| Adaptive rubric | sca-v23 D12 sub-dimension proposal |
|---|---|
| Completeness (25%) | D12.a — feature surface coverage (does the codebase deliver the claimed primitives, end-to-end?) |
| Depth (25%) | D12.b — abstraction depth (is the architecture well-layered or is it shallow glue?) |
| Reliability (25%) | D12.c — failure-mode handling (defensive paths, exception coverage, graceful degradation) |
| Actionability (25%) | D12.d — install-and-use clarity (is the README + minimal example sufficient to ship in 30min?) |

**Fix**: change D12 in sca-v23 from `{value, weight, rationale}` to `{value, weight, sub_dimensions: {completeness, depth, reliability, actionability}, rationale}` with each sub-dimension `0..1` and v12.value computed as their mean (or weighted mean if the operator picks weights).

**Rationale**: closes the "D12 is a magic number" critique — operator can SEE which sub-axis is driving the composite-arch verdict. Cite-anchor: `adaptive-deep-research.md:511-517` (rubric weights table).

### §4.4 — **BACKPORT-D: Convergence rule explicit field — "what counts as ≥3 angles agreeing?"**

v23 has `research_angles.minProperties: 3` (cardinality floor) but **no explicit agreement-threshold field**. gpt-researcher's adaptive rubric requires `assessment.score >= self.quality_threshold (7.0)` AND `not has_knowledge_gaps` as a two-clause AND-termination. v23 has no analogue — we just count angles and assume they agree if their normalized_scores are similar.

**Fix**: add to sca-v23 schema:

```json
"convergence_rule": {
  "type": "object",
  "required": ["min_angles_agreeing", "agreement_threshold", "computed_agreement"],
  "properties": {
    "min_angles_agreeing":   { "type": "integer", "minimum": 3 },
    "agreement_threshold":   { "type": "number", "minimum": 0, "maximum": 1, "default": 0.20,
                               "description": "Max stddev across angle normalized_scores for convergence." },
    "computed_agreement":    { "type": "number", "description": "Actual stddev across angles." },
    "converged":             { "type": "boolean" }
  }
}
```

This makes convergence a CALCULATED PROPERTY (like `composite_verdict_score`), not an assertion. Cite-anchor: gpt-researcher quality-driven termination rules at `adaptive-deep-research.md:399-431`.

### §4.5 — **BACKPORT-E: Cost-tracking dimension D13**

`gpt_researcher/skills/deep_research.py:368-393` tracks `initial_costs` and `research_costs` via `researcher.get_costs()` and `add_costs(cost)` and logs them in `deep_research_costs` events. v23 has zero cost-axis. For a runtime that runs ~100 SOTA-audits over 80 sessions (per CLAUDE.md status block), the $-cost of a verdict-issuance is real signal.

**Fix**: add `D13_cost_efficiency` to sca-v23 `scoring_dims` (re-balance weights — D12 0.20 → 0.16, D13 = 0.04). Score = `1.0 - normalize(usd_spent_on_audit)`.

**Rationale**: empirically scored cohort comparisons need a $/verdict denominator. Cite-anchor: `deep_research.py:368, 387-393` (`add_costs`, `get_costs`, `research_costs` logging).

---

## §5  Should we install MORE of their tooling?

Already installed per W411 + W433-REF-F:
- `gptr-mcp` MCP server (the spun-out repo) — gives us the `deep_research / quick_search / write_report / get_research_sources / get_research_context` toolset.

**Recommendation: install 3 additional surfaces.**

### §5.1 — **INSTALL-CANDIDATE-1: `MCPRetriever` as a PATTERN-ONLY reference**

`gpt_researcher/retrievers/mcp/retriever.py` implements a **2-stage MCP-tool-selection-then-execution** pattern that's the cleanest reference implementation we've seen. Stage 1: LLM picks 2-3 most relevant tools from N available. Stage 2: bind-and-execute. This is the same pattern our local `mcp-agent-patterns` skill catalogs as "Router + ParallelLLM composition" but gpt-researcher's implementation is concrete and shippable.

**Tier**: `PATTERN-STUDY` — read `retriever.py` + `gpt_researcher/mcp/tool_selector.py` + `gpt_researcher/mcp/research.py`. Do NOT vendor; the implementation depends on `langchain-mcp-adapters` + `MultiServerMCPClient` and won't drop into our runtime cleanly.

### §5.2 — **INSTALL-CANDIDATE-2: `xquik` retriever pattern (X/Twitter search)**

`gpt_researcher/retrievers/xquik/xquik.py` (added PR #1734, merged 2026-04-16) — X/Twitter search retriever for social-signal angles. Our sca-v23 A4 `tavily_curated_search` angle doesn't cover social-signal because Tavily is mostly news + web. xquik adds X-Twitter coverage which is REQUIRED for the "is this trending in the agentic-LLM community" question that drives several recent SOTA-audit verdicts (e.g., the agent-teams plugin install in W333).

**Tier**: `PATTERN-STUDY` — read the retriever module, evaluate adding `A8_xquik_social_search` to sca-v23 v24 with weight 0.10 (pulled from A4 0.10 → 0.05 and A3 0.12 → 0.07 to keep angles summing to ≤1.0).

### §5.3 — **INSTALL-CANDIDATE-3: `langgraph.json` Studio integration**

`langgraph.json` exposes the multi-agent graph as a LangGraph-Studio-compatible artifact:

```json
{
  "python_version": "3.11",
  "dependencies": ["./multi_agents"],
  "graphs": { "agent": "./multi_agents/agent.py:graph" },
  "env": ".env"
}
```

This is a 7-line file that unlocks visual graph-debugging in LangGraph Studio (already in our wider ecosystem per W340 mentions). If we ever ship our OWN multi-agent orchestrator that uses LangGraph (we don't today, we use Anthropic agent-teams + sub-agents), we should ship `langgraph.json` alongside it.

**Tier**: `CITE-REFERENCE-ONLY` for now — file the pattern for future use when/if we adopt LangGraph.

### §5.4 — Do NOT install

- The full `gpt-researcher` Python package itself. The MCP-extra is Windows-disabled (§3.E), and our runtime already uses `gptr-mcp` for the same primitives without the platform restriction.
- The AG2 branch (`multi_agents_ag2/`). It's a parallel re-implementation using Microsoft AutoGen v0.2 (not v1.0 GA per CLAUDE.md `agent-budget-discipline` skill cite); we should converge on AutoGen v1.0 GA upstream, not v0.2 via this side-branch.

---

## §6  sca-v23 verdict for this target

| Field | Value | Rationale |
|---|---|---|
| `schema_version` | `sca-v23` | |
| `target.kind` | `github-repo` | |
| `target.identifier` | `assafelovic/gpt-researcher` | |
| `target.version` | `v3.4.4` (sha `27abde0`) | git-tag; pyproject ships `0.14.7` |
| `target.license` | `Apache-2.0` (per GitHub LICENSE file authoritative; pyproject says MIT — see §3.D) | |
| **scoring_dims** | | |
| D1 popularity | `1.00` × 0.05 = 0.050 | 27,272 stars >> 10k threshold |
| D2 license_safety | `1.00` × 0.08 = 0.080 | Apache-2.0 OK per CR-1 trust-tuple |
| D3 supply_chain_signed | `0.50` × 0.10 = 0.050 | No SLSA / no Sigstore / no npm-provenance for git tags; Apache LICENSE present but no signed releases |
| D4 maintainer_reputation | `1.00` × 0.06 = 0.060 | Assaf Elovic + ~50 contributors; commercial backing (gptr.dev) |
| D5 dependency_cleanliness | `0.80` × 0.08 = 0.064 | `langchain ^1.0.0`, `langgraph ~0.2`, `mcp >=1.0` modern; -0.20 for `mcp` having Windows `platform_system != 'Windows'` exclusion |
| D6 last_commit_recency | `1.00` × 0.06 = 0.060 | Last commit 2026-04-16, last release 2026-04-16 → active |
| D7 contributor_count | `1.00` × 0.04 = 0.040 | 3,667 forks + dozens of merged contributor PRs in last 30 commits |
| D8 downloads_30d | `0.85` × 0.05 = 0.043 | PyPI `gpt-researcher` ~50k downloads/mo (estimate; no direct probe ran this dive — flagged for sca-v23 §6 follow-up) |
| D9 openssf_scorecard | `0.70` × 0.08 = 0.056 | No publicly probed Scorecard; estimate based on observed practices (CI present, signed-commits unclear, branch-protection unclear) — flagged for follow-up |
| D10 cc_pathway_support | `0.50` × 0.10 = 0.050 | No first-party Claude Code skill/plugin/agent; MCP server is the integration path |
| D11 mcp_readiness | `1.00` × 0.10 = 0.100 | Native MCP server (`gptr-mcp`) + MCP-retriever consuming external MCPs — full bidirectional MCP fluency |
| D12 composite_arch_quality | `0.85` × 0.20 = 0.170 | Clean LangGraph topology, excellent retriever-abstraction (16 backends), thoughtful adaptive-research RFC — but penalized for unmerged `max_revisions` guard (§3.A is a real production gap), license inconsistency (§3.D), no Langfuse (only LangSmith) |
| **CVS (sum)** | **0.823** | |
| **decision_tier** | **`PATTERN-STUDY`** | Already-installed as MCP via W411 + W433-REF-F (gptr-mcp). Tier reflects "do not install full library; mine for patterns". CVS=0.823 would qualify for `INSTALL-HIGH` if not already installed. |
| **trust_tuple_R1a** | `{signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: true}` | signed_releases=false because no SLSA/Sigstore/provenance evidence found |
| **codex_verdict** | not run for this dive (this is a refresh-research dive, not an install-gate) | — |

---

## §7  Open questions & follow-up

1. **OpenSSF Scorecard probe**: run `gh api repos/assafelovic/gpt-researcher` against Scorecard's actual data feed to replace the §6 D9 estimate.
2. **PyPI 30-day downloads probe**: confirm D8 number (currently estimated).
3. **PR #1783 watch**: when the `max_revisions` guard merges, re-score §3.A and lift D12 from 0.85.
4. **License harmonization upstream**: file an upstream issue to align `pyproject.toml` (MIT) with `LICENSE` (Apache-2.0). This is a real bug in their release artifacts.
5. **Backport tracking**: §4.1-§4.5 (5 backports) should be encoded as sca-v24 schema bumps, each with its own targeted PR back to `Z:/claude-sota-installed/.claude/schemas/`. Recommend single-PR approach because they're all additive.
6. **Adaptive-skill watch**: when `gpt_researcher/skills/adaptive_deep_research.py` lands as production code (currently RFC at `docs/docs/proposals/adaptive-deep-research.md` targeting v4.x), re-score D12 again — it would lift to ~0.95.

---

## §8  Provenance

- **Wave**: W433-REF / SOTA-REPOS-DEEP-DIVE-2026-05-25 cohort
- **Branch**: (current session — see git status)
- **Session**: 2026-05-25 deep-dive subagent (Opus 4.7 1M)
- **Scored at**: 2026-05-25T00:30Z (approx)
- **Operator acceptance**: pending parent-orchestrator sign-off on §4 backports list
- **Files cited**: `Z:/repos/deps/gpt-researcher/{multi_agents/agents/*.py, multi_agents/main.py, multi_agents/task.json, gpt_researcher/config/variables/{base.py, default.py}, gpt_researcher/config/config.py, gpt_researcher/prompts.py, gpt_researcher/skills/{deep_research.py, curator.py}, gpt_researcher/retrievers/mcp/retriever.py, mcp-server/README.md, docs/docs/proposals/adaptive-deep-research.md, pyproject.toml, LICENSE, langgraph.json}`
- **External anchors**: deepwiki.com `assafelovic/gpt-researcher` (×2), `gh api repos/assafelovic/gpt-researcher` (×7 endpoints), perplexity sonar-pro fallback (weak — recorded but not relied upon for primary findings).
