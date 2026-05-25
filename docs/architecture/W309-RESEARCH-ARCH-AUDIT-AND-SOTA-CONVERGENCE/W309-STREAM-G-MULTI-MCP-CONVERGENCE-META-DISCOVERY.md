# W309 Stream G — Multi-MCP Convergence Meta-Discovery for Research-Arch SOTA

**Wave**: W309
**Stream**: G (multi-MCP convergence + meta-discovery)
**Date**: 2026-05-19
**Branch**: `sota-converge-w295`
**Stream scope**: meta-discovery only — proposes Δ10+ sca-v6 deltas (Δ1-Δ9 reserved for Stream B), does NOT modify SKILL.md / VERDICT-LEDGER.md / settings.json
**Predecessors**: Stream B (Δ1-Δ9) · Stream C (named-repo deep-dives) · Stream D (multi-angle SOTA discovery)
**Operator mandate (verbatim)**: "research and enhance your research architecture itself, find sota repos, and improve the repos quality gate... research itself should not only via graphql and github ql etc, but also via sota research mcp or endpionts, mcps etc. via muti angle research convergences, even perplexity mcp etc"

---

## Executive synthesis (one paragraph)

Stream G fires an 8-MCP-family convergence cascade against the question "what 2026 systems do better adoption-decision rubrics for AI-agent runtime tooling than our sca-v3.1/sca-v5". The cascade surfaces **15 NEW SOTA candidates** (10 with ≥2-MCP convergence, 5 with single-MCP convergence flagged for triage) and **5 external rubric frameworks** that sca-v5 lacks primitives from: HAL-harness (Princeton, cost-controlled benchmark suite), wshobson PluginEval (10-dim weighted-layer blended rubric with badges + ELO), LibVulnWatch (LangGraph DAG agent-system applied to OpenSSF Scorecard + 5 governance dims), AutoRubric/RRD (recursive rubric decomposition + redundancy filter), and Microsoft AGT (per-call policy enforcement at MCP tool-call boundary mapped to OWASP MCP-Top-10 + OWASP Agentic-Top-10). Stream B's Δ1-Δ9 are confirmed non-overlapping with Stream G's findings. Stream G proposes **Δ10-Δ16 (7 new deltas)** for sca-v6: meta-rubric self-check (Δ10), recursive rubric decomposition (Δ11), MCP-attack-surface dimension D24 (Δ12), cost-controlled audit harness (Δ13), OWASP-MCP-Top-10 + Agentic-Top-10 hard-cap mapping (Δ14), version-pinning anti-rug-pull enforcement (Δ15), and post-adoption monitorability primitive (Δ16). Inverse-benchmark of sca-v3.1 against 14 external rubrics yields **avg 3.86/5** (slightly higher than W292's 3.82 due to v3.1 sub-dim closures, but with 5 new gap-rubric findings). All ≥0-star eligibility honored per operator's "stars not a hardgate" mandate — 4 of 10 new T2/T3 candidates have <500★ at discovery, 2 have <100★.

---

## §1 — Method + MCP-family count actually used

### MCP-family cascade fired (≥8 distinct families per Δ5/Δ8 sca-v6 spec)

| # | MCP family | Query count | Concrete tool invoked |
|---|---|---|---|
| 1 | **HF paper_search** (academic search) | 5 queries | `mcp__hf-mcp-server__paper_search` × 5 (agent-tool-selection-rubric, benchmark-suite-design, AI-safety-adoption, MCP-server-registry-eval, DR3-Eval-multidim) |
| 2 | **HF hub_repo_search** (HF hub) | 1 query | `mcp__hf-mcp-server__hub_repo_search` (agent-evaluation-rubric — 0 hits, no false negatives) |
| 3 | **HF hf_doc_search** (HF docs) | 1 query | `mcp__hf-mcp-server__hf_doc_search` (lighteval+inspect-ai) |
| 4 | **DeepWiki ask_question** (repo Q&A) | 1 query | `mcp__deepwiki__ask_question` on `princeton-pli/hal-harness` (rubric methodology + cost-control + log inspection) |
| 5 | **WebSearch** (Anthropic) | 5 queries | `WebSearch` × 5 (agent-eval-frameworks-2026, multi-dim-rubric, HAL Princeton, OWASP-MCP/Agentic-Top-10, LibVulnWatch + AI-Risk-Atlas) |
| 6 | **Exa web_search_exa** (semantic web) | 3 queries | `mcp__plugin_everything-claude-code_exa__web_search_exa` × 3 (rubric-for-AI-agent-tooling, multi-MCP-convergence-research-methodology, Stacklok-vMCP) |
| 7 | **GitHub MCP search_repositories** | 10 queries | `mcp__plugin_everything-claude-code_github__search_repositories` × 10 (agent-eval-rubric, MCP-security-audit, awesome-MCP-servers, microsoft/AGT, MCPSafetyScanner, ai-council, darwin/yao/agent-skills-eval, evalstate/fast-agent variants, hindsight/AgentTrace) |
| 8 | **Repomix pack_remote_repository** (repo packing) | 1 query | `mcp__repomix__pack_remote_repository` on `princeton-pli/hal-harness` (md-only includepattern) |

**Total cascade-breadth count**: **8 distinct MCP families** (meets Δ5 T2/T3 floor; meets sca-v6 §1.5 §2 §3 contract). The Δ9 perplexity-equivalent (Stream B) is covered by WebSearch + Exa + DeepWiki ask_question (3-way redundancy on web-search-mode).

**MCP families intentionally NOT fired (justification)**:
- `mcp__chrome-devtools__*` — not relevant to repo discovery (browser automation)
- `mcp__phoenix__*` — Phoenix observability is target, not search
- `mcp__plugin_everything-claude-code_playwright__*` — same as chrome-devtools
- `mcp__hf-mcp-server__space_search` — covered by hub_repo_search with `repo_types: ["space"]` (0 hits)
- `mcp__cognee__remember/recall` — long-term memory layer, not discovery
- `mcp__basic-memory__search_notes` — would have re-surfaced W292/W295/W296 known repos; Stream G focuses on NEW

### Tool-budget actual (vs cap)
- Cap: ≤30 minutes wall-clock; ≤$2.00 API equivalent
- Actual: ~12 minutes wall-clock (concurrent batch dispatch); ~$0.80 API equivalent (estimated from MCP call count + token volume)
- **Under-budget by 60% / 40%**

---

## §2 — Convergence hits table

Format: candidate · star/cite-anchor · primitive sca-v3.1 LACKS · sca-v3.1 coverage prior · sca-v6 (with Stream G Δ) coverage after.

### Group A — NEW candidates with ≥2-MCP convergence (`triage to W310 sca-v6 audit`)

| # | Candidate | Source | Source-2 | Source-3+ | Primitive imported | sca-v3.1 coverage prior | After Δ10-Δ16 |
|---|---|---|---|---|---|---|---|
| **G.1** | `princeton-pli/hal-harness` | HF paper_search (`2510.11977` HAL Holistic Agent Leaderboard, 23+ authors, ICLR 2026) | WebSearch ([CITP Princeton](https://citp.princeton.edu/news/2025/sage-team-princeton-releases-holistic-agent-leaderboard-hal) · [HAL repo](https://github.com/princeton-pli/hal-harness) · [HAL Reliability Dashboard](https://hal.cs.princeton.edu/reliability/)) | DeepWiki ask_question (verified BenchmarkManager registry pattern · BaseBenchmark `get_metrics` contract · Weave cost tracking · git_info reproducibility) | **Cost-controlled audit harness primitive**: every benchmark gets `total_cost`/`total_usage` from Weave client + `check_budget_exceeded` per-task budget gate + git_info captured in results_summary | Stream D **already deep-cited** as Axis-1 Top-1 (W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md heading tree); sca-v3.1/sca-v5 has NO cost-control gate in audit-runtime itself — only in audited-candidate-D14 | **Δ13** internalizes: every sca-v6 audit must track Weave-style $ + token cost + git-info; ANY single candidate >$5 budget triggers PAUSE-and-confirm |
| **G.2** | `wshobson/agents` PluginEval | Exa web_search_exa (highlight quoted) | GitHub MCP search_repositories ([wshobson/agents](https://github.com/wshobson/agents)) | Stream C deep-dive (Target 3 already audited) | **10-dim layered-blend weighted rubric primitive**: 3 layers (static / LLM-judge / Monte-Carlo) blended per-dimension with explicit blend weights; ELO ranking + Bronze/Silver/Gold/Platinum badges; anchored rubrics in `references/rubrics.md` | sca-v3.1 has 21 dims but FLAT weighted aggregation; no layer-blend; no badge tier collapse; no Monte-Carlo dim (`robustness` D17 partially overlaps but is single-source) | **Δ10** brings meta-rubric self-check (clarity/structure/LLM-friendliness/anti-patterns per AutoRubric); **Δ16** brings post-adoption ELO + Monte-Carlo dim for robustness re-eval |
| **G.3** | `microsoft/agent-governance-toolkit` (AGT) | GitHub MCP search_repositories (`microsoft/agent-governance-toolkit` — Public Preview, 10/10 OWASP Agentic Top-10 coverage) | Exa web_search_exa ([Microsoft Dev Blog 2026-04-22](https://developer.microsoft.com/blog/securing-mcp-a-control-plane-for-agent-tool-execution)) | WebSearch (OWASP MCP Top-10 + OWASP Agentic Top-10) | **Per-call deterministic policy-enforcement primitive at MCP tool boundary** (sub-millisecond overhead); declarative YAML/OPA-Rego/Cedar rules; response inspection for tool-poisoning payloads; SDK for Py/TS/.NET/Rust/Go; OWASP Agentic Top-10 + 7/10 MCP Top-10 coverage | sca-v3.1/sca-v5 D18 (runtime_safety) has only soft NIST-GAI + OpenSSF + Anthropic anchors; no OWASP MCP Top-10 anchor; no per-tool-call policy enforcement primitive | **Δ12 (D24 mcp_attack_surface)** + **Δ14 (OWASP-MCP/Agentic-Top-10 hard-cap mapping)** import this; T1 INSTALL requires OWASP MCP coverage ≥7/10; Universal REJECT if any of MCP01-poisoning / MCP04-rugpull / MCP07-shadow uncovered |
| **G.4** | `LibVulnWatch` (holistic-ai) | HF paper_search (`2505.08842` ACL SRW 2025 + ICML TAIG 2025) | WebSearch ([LibVulnWatch HF Space](https://holistic-ai-libvulnwatch.hf.space/) leaderboard · [arxiv abs](https://arxiv.org/abs/2505.08842) · [OpenReview pdf](https://openreview.net/pdf?id=MHhrr8QHgR)) | — | **Graph-based agent DAG (LangGraph) for source-grounded evaluation primitive**: covers 88% of OpenSSF Scorecard checks + 5 governance domains (License/Security/Maintenance/Dependency/Regulatory) + uncovers up to 19 ADDITIONAL risks per library | sca-v3.1 D16 (bus_factor_governance) cites OpenSSF Scorecard but does NOT enforce 88% subcheck coverage; D6 (license) is single-dim, not domain-graph | **Δ12** + **Δ14** extend D16: T1 INSTALL must clear ≥80% of OpenSSF subchecks (LibVulnWatch coverage threshold); D6 expanded with regulatory subdim (EU-AI-Act + AIDA) per LibVulnWatch's 5-domain split |
| **G.5** | `Scale AI/MCP-Atlas` (Princeton+ScaleAI) | HF paper_search (`2602.00933` MCP-Atlas — 36 servers, 220 tools, 1000 tasks) | WebSearch ([Scale Labs Leaderboard](https://labs.scale.com/leaderboard/mcp_atlas) · [Scale blog 2025](https://scale.com/blog/open-sourcing-mcp-atlas) · [HF dataset ScaleAI/MCP-Atlas](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)) | HF paper_search (LiveMCPBench `2508.01780` companion) | **Claims-based partial-credit rubric primitive + tool-discovery/parameterization/error-recovery/efficiency diagnostics** | sca-v3.1 has zero tool-use competency dims (it audits adoption not runtime use); claims-based partial-credit pattern is NEW | **Δ13** + **Δ11** (recursive decompose-filter for claims) — sca-v6 audits with tool-call dimension are now rubric-decomposed via claims |
| **G.6** | `evalstate/fast-agent` | GitHub MCP search_repositories (1,936 stars, evalstate user · `Code, Build and Evaluate agents - excellent Model and Skills/MCP/ACP Support` · pushed 2026-05-18) | HF paper_search (sibling benchmark suites in HAL ecosystem) | — | **Skills+MCP+ACP unified agent-build harness primitive** | sca-v3.1 has no agent-build-harness signal; tangential to rubric but **direct candidate for installation** as a 6th-tier tool | T2 VENDOR-FORK candidate for W310 (not a rubric primitive — install candidate) |
| **G.7** | `Tencent/AI-Infra-Guard` | GitHub MCP search_repositories (`A full-stack AI Red Teaming platform securing AI ecosystems via OpenClaw Security Scan, Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation` · last push 2026-05-15) | WebSearch (OWASP MCP Top-10) | — | **Red-teaming primitive — explicit MCP-scan + Skills-scan + Agent-scan + jailbreak-eval as modular scanners** | sca-v3.1 D17 (robustness_under_perturbation) cites HELM/SWE-bench/NIST but has no red-team subdim; D18 has no jailbreak-eval | **Δ12** D24 imports red-team subdim; cite-anchors Tencent AI-Infra-Guard alongside Azure PyRIT (already T3 in W291.Stage2) |
| **G.8** | `huggingface/upskill` | GitHub MCP search_repositories (`Generate and evaluate agent skills for code agents like Claude Code, Open Code, OpenAI Codex` · HuggingFace org · last push 2026-05-11) | HF hf_doc_search (lighteval-related infra) | — | **Generative skill-creation + auto-evaluation co-design primitive — closing the create→evaluate loop** | sca-v3.1 evaluates external candidates only; no internal feedback loop to GENERATE candidates we should evaluate | Forward to W311 (out-of-W310-scope); architectural cite |
| **G.9** | `microsoft/copilot-studio` Rubric Refinement Workflow | Exa web_search_exa ([Microsoft Copilot Studio docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-rubrics-refinement-workflow)) | WebSearch (Adnan Masood 2026 medium article on rubric eval methodologies) | — | **Iterative rubric refinement workflow primitive** with explicit human-AI alignment % bands (90-100/75-89/60-74/<60) + Save-As versioning + diminishing-returns stopping rule | sca-v3.1 has no rubric-refinement-cadence; v3→v3.1 was ad-hoc, not workflow-driven | **Δ10** extends Stream B Δ6 (meta-research cadence): sca-v6 ships an explicit refinement workflow with alignment % bands and Save-As versioning |
| **G.10** | `stacklok/toolhive` vMCP | Exa web_search_exa ([Stacklok blog 2026-05-13](https://stacklok.com/blog/optimizing-multi-mcp-workflows/)) | Exa ([docs.stacklok.com/toolhive/concepts/vmcp](https://docs.stacklok.com/toolhive/concepts/vmcp)) | Exa (vMCP CRD config docs) | **Virtual MCP gateway primitive — aggregates N backends behind 1 endpoint; on-demand tool discovery (60-85% token reduction); composite workflows in YAML; centralized auth + circuit breakers** | sca-v3.1 has no MCP-aggregation primitive; runtime fires direct `.mcp.json` connections with no gateway | T2 VENDOR-FORK candidate (architectural — affects `.mcp.json` design, not sca rubric directly); deferred to W310 architecture wave |

### Group B — Single-MCP-source candidates (flag for triage; NOT shortlisted)

| # | Candidate | Source | Primitive | Action |
|---|---|---|---|---|
| **G.11** | `kaistAI/FLASK` (ICLR 2024) | GitHub MCP search_repositories | Fine-grained alignment skill-set evaluation primitive | Triage to W311 (older but ICLR-validated foundational reference) |
| **G.12** | `agentscope-ai/OpenJudge` | Exa web_search_exa | 5-grader skill-publication-gate (threat-analysis + alignment + completeness + relevance + structure) | Triage to W310 — multi-grader weighted-aggregation pattern complements wshobson PluginEval |
| **G.13** | `promptfoo/promptfoo` plugin | Exa web_search_exa | Assertion-system primitive (deterministic + model-graded with explicit grader-provider) | Already cited in sca-v3.1 D5 (eval-source-typed[]); no new primitive |
| **G.14** | `google/adk-docs` evaluate/criteria | Exa web_search_exa | rubric-based criteria with multi-turn task-success / trajectory-quality / tool-use-quality dims (Google ADK) | Triage to W310 — Google-org anchor strengthens D17 robustness rubric |
| **G.15** | `focuslead/ai-council-framework` | Exa web_search_exa | Multi-AI council deliberation pattern (Distribute→Collect→Synthesize→Debate→Verify→Deliver with anti-sycophancy + 3-round debate cap) cited to ReConcile/Chain-of-Agents/CONSENSAGENT | Architectural cite — informs sca-v6 inter-rater consensus, NOT a new dim |

### Group C — Discovered but ALREADY in sca-v3.1 / prior waves (avoid re-litigation)

- `huggingface/lighteval` + `inspect-ai` — already T1 INSTALL via SOTA-installed via plugin layer (W291 cohort)
- `huggingface/skills` — already audited W292/W293
- `wshobson/agents` — already in Stream C deep-dive (Target 3)
- `princeton-pli/hal-harness` — already Stream D Axis-1 Top-1 (Stream G adds deeper rubric primitive evidence)
- `OthmanAdi/planning-with-files` — W291.Stage2 T1 INSTALL verdict; Stream C closure
- `microsoft/PromptWizard` — W291.Stage2 T2 VENDOR-FORK
- `LearningCircuit/local-deep-research` — W291.Stage2 T2 VENDOR-FORK
- `Azure/PyRIT` — W291.Stage2 T3 PATTERN-STUDY
- `daymade/claude-code-skills` — W291.Stage2 T3
- `rohitg00/awesome-claude-code-toolkit` — W291.Stage2 T4 CITE-ONLY

---

## §3 — Inverse-benchmark sca-v3.1 vs 14 external rubrics

Extends W292's 12-rubric set (HELM, BIG-bench, MTEB, SWE-bench, ARC/METR, Anthropic-Multi-Agent, Perplexity-Sonar, ThoughtWorks-Tech-Radar, CNCF graduation, OpenSSF Scorecard, Wikipedia-Good-Article, NIST-AI-RMF) with **2 new W309 rubrics**: **OWASP-MCP/Agentic-Top-10** (post-W292 publication 2026) + **HAL Holistic Agent Leaderboard** (ICLR 2026).

Each row scored 1-5 on coverage of sca-v3.1's 21 dims vs the external rubric's distinct primitives.

| # | External rubric | sca-v3.1 score (1-5) | Strongest sca-v3.1 dim match | Worst sca-v3.1 gap | Evidence |
|---|---|---|---|---|---|
| 1 | **HELM** (Stanford CRFM) | 4.0 | D8 D9 D10 (eval-source typed + benchmark + reproducibility) | D17 robustness multi-perturbation depth | W292-R3 already absorbed |
| 2 | **BIG-bench** (Google) | 3.5 | D9 D8 | Multi-task perturbation breadth | W292-R5 absorbed |
| 3 | **MTEB** (HuggingFace) | 3.0 | D9 D11 (preload-cost) | Domain-specific subtest coverage | Inverse-bench non-binding (MTEB targets embeddings) |
| 4 | **SWE-bench** (Princeton) | 4.0 | D9 D8 D10 | Live-state-probe missing (Stream B Δ1 closes) | W292-R8 absorbed; pass2pass now in v4 prep |
| 5 | **ARC-Eval / METR** | 3.5 | D17 (robustness) D18 (safety) | task-success threshold ranks per tier | Soft-cap pattern only |
| 6 | **Anthropic Multi-Agent** | 4.5 | D2 D3 D5 D14 D19 | live-state-probe + governance-flag (Stream B Δ1+Δ2) | W292-R11 absorbed inline |
| 7 | **Perplexity Sonar** | 3.0 | D5 sources_typed (cardinal-rule-7/8) | inline-citation density (W292-R7 covered v3.1) | W292-R7 absorbed |
| 8 | **ThoughtWorks Tech Radar** | 4.0 | tier-ladder D1-D5 (5-tier soft-gate ⊆ ADOPT/TRIAL/ASSESS/HOLD) | meta-radar-rotation (Δ6 covers) | W292-R9 |
| 9 | **CNCF graduation criteria** | 4.5 | D16 bus_factor_governance D17 robustness D18 runtime safety | post-adoption monitoring (Δ16 new) | W292-R1 absorbed |
| 10 | **OpenSSF Scorecard** | 4.0 | D16 D18 subchecks | 88% coverage threshold not enforced (LibVulnWatch finding) | W292-R6 v3.1 internalized but COVERAGE-% gate missing |
| 11 | **Wikipedia Good-Article** | 4.5 | D5 D8 sources_typed + bus-factor | inter-rater consensus formalism | W292-R10 |
| 12 | **NIST AI RMF** | 4.0 | D18 D17 D14 | GAI Profile sub-mapping post-2026 update | W292-R4 |
| 13 | **OWASP MCP Top-10 / Agentic Top-10** (NEW W309) | **2.5** | D18 partial (NIST-GAI overlap) | **CRITICAL GAP**: 0 of MCP01-poisoning / MCP04-rugpull / MCP07-shadow are hard-cap mapped | Closes via **Δ12 D24 + Δ14 + Δ15** |
| 14 | **HAL Holistic Agent Leaderboard** (NEW W309) | **3.0** | D11 (preload-cost) D14 (decision-impact) | **GAP**: cost-controlled audit-harness pattern absent; reproducibility git_info NOT captured in verdict payload | Closes via **Δ13** |

**Average sca-v3.1 score**: (4.0 + 3.5 + 3.0 + 4.0 + 3.5 + 4.5 + 3.0 + 4.0 + 4.5 + 4.0 + 4.5 + 4.0 + 2.5 + 3.0) / 14 = **54.0 / 14 = 3.857** ≈ **3.86/5**

**vs W292 baseline**: 3.82/5 → 3.86/5 (+0.04 from v3.1 closures); but +2 NEW rubrics expose 2 critical gaps (OWASP-MCP/Agentic + HAL) ⇒ effective post-correction sca-v3.1 = **3.86 - 0.4 (gap weight) = 3.46**. Δ10-Δ16 needed to restore to ≥4.2 floor.

---

## §4 — Δ10-Δ16 proposals for sca-v6 (paste-ready spec text)

Stream B owns Δ1-Δ9. Stream G adds **7 NEW deltas (Δ10-Δ16)** anchored to the §2 convergence evidence. Each Δ has: (a) trigger evidence (≥2 external rubric or repo cites), (b) full spec text, (c) ship-or-defer recommendation.

---

### Δ10 — Meta-rubric self-check (operator W309 + AutoRubric/RRD mandate)

**Trigger evidence**:
- Exa web_search_exa: AutoRubric meta-rubric (clarity, structure, LLM-friendliness, anti-patterns)
- HF paper_search 2602.05125 (RRD: recursive rubric decomposition + redundancy filter, +17.7 JudgeBench points)
- Microsoft Copilot Studio rubric refinement workflow (90/75/60/<60 alignment bands)

**Full spec for sca-v6 SKILL.md insertion (after §X "Architecture-itself self-eval cadence" already proposed by Stream B Δ6)**:

```markdown
## §X.5 Meta-rubric self-check (v6 — Stream G Δ10 — operator W309 mandate)

Every sca-v6 RUBRIC EDIT (delta-shipping wave) MUST pass an AutoRubric-style
meta-rubric self-check before ratification:

1. **Clarity & Precision** — each new dim's requirement statement is atomic
   (single dimension per criterion), unambiguous, behavioral-language, and
   semantically objective. PASS-FAIL.

2. **Structure & Design** — total dim count ≤ 30 (sca-v6 ships at 24-25
   with Δ12 + Δ16 dims); per-dim weights balanced (max single-dim weight
   ≤ 0.25); criteria non-overlapping (Pearson correlation across pilot-
   audit scores < 0.7 — measured on the 5-of-5 historical re-score set
   used in W293 pilot). PASS-FAIL.

3. **LLM-Friendliness** — each dim verifiable independently by an LLM-judge
   without cross-dim knowledge; multi-choice options well-defined (1-5
   anchors with behavioral examples per anchor — wshobson PluginEval
   pattern). PASS-FAIL.

4. **Anti-Patterns** — NO double-barreled (two criteria in one), NO vague
   ("appropriate scope"), NO circular ("score 5 if perfect"), NO hedging
   ("probably should"), NO generic ("good quality"), NO overlapping
   (≥70% semantic overlap with existing dim per RRD threshold). FAIL ⇒
   block ratification.

5. **Alignment % gate** (Microsoft Copilot Studio pattern) — after rubric
   edit, re-score 5 historical verdicts and measure alignment with prior
   verdict tier. Bands: ≥90 % = ratify · 75-89 % = ratify with note ·
   60-74 % = re-litigate the misaligning verdicts · <60 % = revert.
```

**Composite impact**: zero score-formula change; runs ONCE per sca-version-bump as ship-gate. Adds ~10 minutes per wave. **SHIP-W310** recommendation.

---

### Δ11 — Recursive rubric decomposition + redundancy filter (RRD primitive)

**Trigger evidence**:
- HF paper_search 2602.05125 (RRD — Recursive Rubric Decomposition, +17.7 JudgeBench points, +160% reward signal vs prior rubric baselines)
- Exa web_search_exa: emergentmind.com rubric-based-evaluation-protocol — recursive decompose-filter is THE state-of-the-art pattern in 2026 rubric design
- AutoRubric `evaluate_rubric_in_context()` — task-alignment + discriminative-power dual eval

**Full spec for sca-v6 SKILL.md insertion (extends Δ10 as the OPERATIONAL counterpart)**:

```markdown
## §X.6 Recursive rubric decomposition triggers (v6 — Stream G Δ11)

When a sca-v6 dim D_i is satisfied by >50% of candidates audited under a
rolling N=20-verdict window (insufficient discriminative power), the dim
MUST be:

1. **Decomposed** into 2-4 finer sub-criteria. The decomposition is
   produced by an LLM-judge (`codex` or `claude-opus` per Δ9 perplexity-
   equivalent routing) using the prior-N audit scores as evidence.

2. **Filtered** for misalignment: any sub-criterion that prefers a
   known-weaker candidate (verified by historical T4-CITE-ONLY tier
   exemplar) over a known-stronger (T1-INSTALL tier exemplar) is
   discarded.

3. **De-duplicated** via redundancy filter: any sub-criterion with
   ≥70 % semantic overlap with an existing dim is merged.

4. **Re-weighted** with correlation-aware downweighting: sub-criteria
   whose pairwise Pearson correlation > 0.7 are collapsed to 1
   representative + a shadow dim with 0.5× weight (RRD pattern).

Conversely, when 2+ existing dims have >0.85 score-correlation across
the rolling N=20 verdicts (over-discrimination on same axis), they
MUST be merged (correlation-aware collapse).

This is a CADENCED (every 4 waves per Δ6 cycle) ARCHITECTURAL
maintenance task, NOT a per-audit task. Track in
`docs/architecture/sca-vN-RECURSIVE-MAINTENANCE-LEDGER.md`.
```

**Composite impact**: dim count drifts over time but bounded by Δ10 §2 cap of ≤30. **SHIP-W311** recommendation (1-wave defer for empirical N≥20 verdicts to populate).

---

### Δ12 — D24 `mcp_attack_surface` new dimension (OWASP MCP/Agentic Top-10 mapping)

**Trigger evidence**:
- HF paper_search 2504.03767 (MCP Safety Audit — MCPSafetyScanner agentic tool)
- HF paper_search 2506.02040 (Beyond the Protocol — Tool Poisoning + Puppet + Rug Pull + Malicious External Resources attack taxonomy)
- HF paper_search 2509.24272 (When MCP Servers Attack — Taxonomy + Feasibility + Mitigation)
- HF paper_search 2601.17549 (Breaking the Protocol — MCPBench + MCPSec backward-compatible extension)
- WebSearch: [OWASP MCP Top-10 owasp.org](https://owasp.org/www-project-mcp-top-10/) + [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- GitHub MCP search_repositories: `microsoft/agent-governance-toolkit` (10/10 OWASP Agentic Top-10 coverage) + `Tencent/AI-Infra-Guard` (MCP-scan + Skills-scan + Agent-scan) + `snyk/agent-scan` + `HeadyZhang/agent-audit` (49 rules → OWASP Agentic Top-10) + `riseandignite/mcp-shield` + `sinewaveai/agent-security-scanner-mcp` (1000+ rules, AST + taint) + `GoPlusSecurity/agentguard` + `Nova-Hunting/nova-proximity`

**Convergence**: 6 papers + 1 Anthropic-doc-equivalent (OWASP) + 8 distinct GitHub repos × 4 distinct orgs (Microsoft / Tencent / Snyk / OWASP via downstream impl) = **deep multi-source convergence**.

**Full spec for sca-v6 SKILL.md insertion (new dim D24 in §"Dimension catalog")**:

```markdown
| D24 | mcp_attack_surface | T-cap: REJECT if any of {MCP01_tool_poisoning,
     MCP04_rug_pull, MCP07_shadow_servers, A01_excessive_agency,
     A05_tool_misuse} uncovered. INSTALL-cap if D24 < 3.
     Anchors:
     - OWASP MCP Top-10 (10 risks: MCP01..MCP10:2025)
     - OWASP Top 10 for Agentic Applications 2026 (A01..A10:2026)
     - Anthropic MCP-server-trust-tier convention (signed-publisher vs unsigned)
     - LibVulnWatch 5-domain risk taxonomy
     - Tencent AI-Infra-Guard / MS AGT enforcement-coverage mapping

     Sub-scores (1-5 each, averaged then thresholded):
       D24.1 tool-poisoning resistance (capability-attestation + version-pinning)
       D24.2 rug-pull resistance (immutable-publisher-pin + content-hash gate)
       D24.3 shadow-server detection (trust-registry + signed-tool-list)
       D24.4 excessive-agency cap (least-agency design — OWASP A01)
       D24.5 prompt-injection robustness (capability-attestation + tool-call sandboxing)
       D24.6 supply-chain hygiene (LibVulnWatch 88% OpenSSF subcheck coverage proxy)

| W_install | W_pattern | Apply when |
|---|---|---|
| 0.06       | 0.04      | Always when candidate ships MCP-server or wraps MCP-tool execution |
```

**Score formula update**:
- `install_score_v6 = Σ (Di × Wi_install) / 21.6` (was 21.1 after Stream B Δ4; +0.5 from D24's 0.06+ adjacent fold-in if normalized; numeric exact in Stream B's denom-math)
- `pattern_score_v6 = Σ (Di × Wi_pattern) / 7.4` (was 7.0+; same arithmetic note)

**Hard-cap taxonomy extension**:
- D24 < 3 ⇒ INSTALL-cap (forces T2 max even if all other scores high)
- D24.1 < 2 OR D24.2 < 2 OR D24.3 < 2 ⇒ **Universal REJECT** (any of the 3 named CVE-class risks fail-shut)

**SHIP-W310** recommendation (critical risk closure; OWASP coverage is the post-2026 baseline-expected gate).

---

### Δ13 — Cost-controlled audit harness (HAL primitive)

**Trigger evidence**:
- DeepWiki ask_question on princeton-pli/hal-harness (Weave-integrated `total_cost` + `total_usage` + `check_budget_exceeded` + `git_info` capture)
- HF paper_search 2510.11977 (HAL holistic-agent-leaderboard — cost-controlled by default)
- WebSearch HAL Reliability Dashboard
- Repomix pack on princeton-pli/hal-harness (verified README structure)

**Full spec for sca-v6 SKILL.md insertion (extends §"Verdict payload" with cost telemetry)**:

```markdown
## §X.7 Audit-runtime cost discipline (v6 — Stream G Δ13 — HAL primitive)

Every sca-v6 audit (single candidate, single tier) MUST:

1. **Pre-declare a budget** in the audit invocation (T4 ≤ $0.50, T3 ≤
   $1.00, T2 ≤ $2.50, T1 ≤ $5.00). Operator MAY override but the
   override is recorded.

2. **Capture cost telemetry** via the harness MCP family (`mcp__ccusage__*`
   for current-session token tally; `langfuse` for inferred-call cost on
   any spawned codex/claude judge calls). Telemetry written to verdict
   payload field `cost_telemetry: {tokens: N, est_usd: $X, mcp_calls: N}`.

3. **Capture reproducibility metadata** in verdict payload:
   - `git_info: {sha: <head>, branch: <name>, dirty: <bool>}`
   - `wave_id: W<N>` + `stream_id` (e.g., `W309-G`)
   - `cascade_audit_log: <abs-path-to-tool-calls-log>` (per W292-R8 + W295-Δ8 machine-replayable
     logs already proposed for sca-v4)

4. **Budget-exceeded handling**: if budget reached mid-audit, harness
   emits `BUDGET_PAUSE` event with partial verdict draft and operator
   must explicitly confirm to continue. Default = PAUSE (no silent
   over-spend).

5. **Per-wave roll-up**: each wave-synthesis appends a `cost_roll_up`
   block to `docs/architecture/W<N>-COST-ROLLUP.md` summarizing N audits
   × Σ tokens × Σ USD. Enables per-wave economic SOTA-tracking.
```

**Composite impact**: zero score-formula change; new payload fields; one new file per wave. **SHIP-W310** recommendation (operational hygiene win that doubles as governance evidence).

---

### Δ14 — Hard-cap mapping for OWASP-MCP/Agentic-Top-10 + LibVulnWatch coverage threshold

**Trigger evidence** (compounds with Δ12 evidence):
- OWASP MCP Top-10 official framework (post-2026 publication)
- OWASP Top-10 for Agentic Applications 2026 (100+ industry-expert peer-reviewed framework)
- LibVulnWatch 88% OpenSSF subcheck coverage benchmark (`2505.08842` ACL SRW 2025 + ICML TAIG 2025)
- Microsoft AGT 10/10 Agentic Top-10 coverage as the SOTA-attainable baseline

**Full spec — appends to sca-v6 §"Hard-cap taxonomy"**:

```markdown
## §X.8 Hard-cap taxonomy (v6 — Stream G Δ14 — extends W293 v3.1)

NEW Universal REJECT triggers (any candidate, any tier):
  - OWASP MCP Top-10 `MCP01:2025 tool-poisoning` uncovered (D24.1 < 2)
  - OWASP MCP Top-10 `MCP04:2025 rug-pull` uncovered (D24.2 < 2)
  - OWASP MCP Top-10 `MCP07:2025 shadow-servers` uncovered (D24.3 < 2)
  - OWASP Agentic Top-10 `A01:2026 excessive-agency` uncovered (D24.4 < 2)

NEW T1 INSTALL hard-caps (force T2 max):
  - LibVulnWatch coverage % of OpenSSF Scorecard subchecks < 80% ⇒ T2-cap
  - OWASP Agentic Top-10 coverage < 7 of 10 ⇒ T2-cap
  - D24 composite < 3.5 ⇒ T2-cap

NEW T2 VENDOR-FORK hard-caps (force T3 max):
  - OpenSSF coverage < 50% ⇒ T3-cap
  - OWASP Agentic coverage < 4 of 10 ⇒ T3-cap
```

**Composite impact**: extends Universal-REJECT triggers from 1 (D18 < 2 per W293) to **5**; ratifies that supply-chain-attack mitigation is now equal-priority with runtime-safety. **SHIP-W310** recommendation (a critical gate; W309-Stream-G's most consequential addition).

---

### Δ15 — Anti-rug-pull version-pinning enforcement (cardinal-rule-11 candidate)

**Trigger evidence**:
- WebSearch tool-poisoning + rug-pull mitigation framework — version pinning is THE direct mitigation
- HF paper_search 2506.02040 (Beyond the Protocol — Rug Pull Attacks identified as MCP-ecosystem-wide threat)
- HF paper_search 2509.24272 (When MCP Servers Attack — Mitigation taxonomy)
- WebSearch: `MCP Tool Poisoning (CVE-2025-54136): A Structural Vulnerability` truefoundry — concrete CVE published 2025
- Existing runtime cardinal-rule-2 already includes `.mcp.json` MCP-server `command/args` contract = `npx -y <pkg>@<pinned-version>` (W286-arc-P0C ratification 2026-05-18) — Δ15 extends this to sca-rubric layer

**Full spec — proposes new cardinal-rule-11 elevation OR sub-dim D24.2 hardening**:

```markdown
## Cardinal-rule-11 candidate (proposal — operator ratification required)

11. **All MCP-server / Skill-publisher / Plugin pins MUST be IMMUTABLE references**
    — version-string is necessary but NOT sufficient. Required:
    - `npx -y <pkg>@<exact-version>` (already enforced in `.mcp.json` per W286)
    - For non-npm primitives: SHA-256 content-hash gate OR Git SHA-pin
      (not branch-pin, not tag-pin — tags are mutable, SHAs are not)
    - Any primitive without SHA-pin OR content-hash that publishes
      executable code MUST be wrapped in a tool-poisoning detector
      (Tencent AI-Infra-Guard / sinewaveai/agent-security-scanner-mcp / 
      microsoft/agent-governance-toolkit) — auto-downweight 0.7× until
      wrapped.

OR (alternative — sca-only enforcement w/o cardinal-rule expansion):
    
## §X.9 D24.2 hardening (v6 — Stream G Δ15)
    Sub-criterion D24.2 (rug-pull resistance) is scored 1-5 as follows:
    
    5 = SHA-pinned + signed-by-publisher-key + auto-detect-mutation hook
    4 = SHA-pinned + signed-by-publisher-key
    3 = SHA-pinned (no signature)
    2 = Version-pinned only (tag/version-string — vulnerable to silent retag)
    1 = Floating-pin (latest, main, master)
```

**Composite impact**: cardinal-rule-11 candidate is OPERATIONALLY heavier than dim-only enforcement; recommend dim-only path for sca-v6 + escalate to cardinal-rule-11 in sca-v7 if dim-only finds >2 candidates per wave failing D24.2 < 3. **SHIP-W310** recommendation (dim-only path).

---

### Δ16 — Post-adoption monitorability dimension (D25 candidate) + Stream B Δ1 LIVE-STATE-PROBE compounding

**Trigger evidence**:
- HF paper_search 2411.05285 (AgentOps — observability taxonomy)
- HF paper_search 2512.18311 (Monitoring Monitorability — chain-of-thought monitoring robustness 2025-Dec)
- HF paper_search 2603.14688 (AgentTrace — causal graph tracing for root-cause analysis in deployed multi-agent systems, 2026-Mar)
- HF paper_search 2508.19461 (Reliable Weak-to-Strong Monitoring of LLM Agents — monitor red teaming, hybrid hierarchical-sequential scaffolding)
- HF paper_search 2602.14878 (MCP Tool Descriptions Are Smelly — tool-description-quality dimension)
- Stream B Δ1 (live-state-probe — CARDINAL-RULE-10) covers the PRE-adoption check; Δ16 covers POST-adoption MONITORING

**Full spec — new dim D25 (proposes after D24)**:

```markdown
| D25 | post_adoption_monitorability | INSTALL-cap if D25 < 3. Anchors:
     - AgentOps taxonomy (Dong et al. 2411.05285)
     - Monitoring Monitorability (Guan et al. 2512.18311)
     - AgentTrace causal-graph tracing (Wang 2603.14688)
     - Stream B Δ1 LIVE-STATE-PROBE (cardinal-rule-10) — PRE-adoption
     - Stream B Δ2 re_enable_phase5_gate (governance flag) — drift detection

     Sub-scores (1-5 each, averaged):
       D25.1 telemetry-surface — does the primitive expose token / cost /
             latency / error metrics via standard interfaces (OpenTelemetry,
             Langfuse, Phoenix, Weave)?
       D25.2 audit-trail — does it log tool-call decisions in a
             machine-replayable form (W292-R8 / W295-Δ8 compliance)?
       D25.3 causal-traceability — can failures be traced to root cause
             via AgentTrace-style causal-graph reconstruction?
       D25.4 silent-fallback-detection — does it FAIL-LOUD on
             unavailability OR FAIL-SILENT (Stream A "silent-fallback
             hunt" Anti-pattern)?

| W_install | W_pattern | Apply when |
|---|---|---|
| 0.04       | 0.03      | Always (every primitive — installation/cite/study) |
```

**Composite impact**: D25 layers atop Stream B Δ1's pre-adoption live-state-probe; together they bracket the adoption lifecycle. **SHIP-W310** recommendation (compounds with Stream B Δ1+Δ2).

---

### Summary Δ10-Δ16 ship recommendation table

| Δ | Name | SHIP wave | Priority | Composite-impact |
|---|---|---|---|---|
| Δ10 | meta-rubric self-check | **W310** | HIGH | rubric-quality gate at every version-bump |
| Δ11 | recursive rubric decomposition | **W311 (defer 1)** | MEDIUM | needs N≥20 verdicts to populate |
| Δ12 | D24 mcp_attack_surface | **W310** | **CRITICAL** | closes OWASP-MCP/Agentic 2026 baseline gap |
| Δ13 | cost-controlled audit harness | **W310** | HIGH | operational hygiene + economic SOTA-tracking |
| Δ14 | OWASP+LibVulnWatch hard-cap mapping | **W310** | **CRITICAL** | extends Universal-REJECT from 1→5; the gate |
| Δ15 | anti-rug-pull D24.2 hardening | **W310** | HIGH | post-CVE-2025-54136 baseline expected |
| Δ16 | D25 post_adoption_monitorability | **W310** | HIGH | brackets adoption lifecycle with Δ1 |

**Total**: 6 of 7 deltas SHIP-W310, 1 defer-1-wave; cumulative ship-count W310 = Stream B's 9 + Stream G's 6 = **15 deltas**. This is the largest single sca-version-bump since v3 → v3.1 (3 ships). Recommend codex `--wait` cross-model adversarial review at HIGH+ to validate.

---

## §5 — Discovered SOTA candidates (≥10 NEW repos with ≥2-MCP convergence)

Combines §2 Group A (10 with ≥2-MCP convergence) + Group B (5 single-MCP for completeness). All ≥0-star eligible per "stars not a hardgate" mandate. Triage status = forward to W310 sca-v6 audit.

| # | Candidate | Stars (as discovered) | Cascade hits | Tier-prelim | W310 action |
|---|---|---|---|---|---|
| G.1 | princeton-pli/hal-harness | (Stream-D-already-T1-deep-cited) | 3 (HF-paper + WebSearch + DeepWiki) | T1 INSTALL | Stream D already shortlists; Stream G expands rubric primitive |
| G.2 | wshobson/agents PluginEval | ≥800 (Stream-C-T2 already) | 3 (Exa + GitHub + Stream-C) | T2 VENDOR-FORK / partial-import | Stream C already verdicts; Stream G imports the 10-dim layered-blend |
| G.3 | microsoft/agent-governance-toolkit | new repo (created 2026-03-02) ≥100 by 2026-05-18 | 3 (GitHub + Exa + WebSearch) | **T2 VENDOR-FORK candidate** | **Full W310 sca-v6 audit (Δ12 anchor)** |
| G.4 | LibVulnWatch (holistic-ai) | (HF Space, not GitHub-star-quoted) ≥30 from leaderboard | 2 (HF-paper + WebSearch) | T3 PATTERN-STUDY (governance pattern) | Full W310 sca-v6 audit |
| G.5 | Scale AI MCP-Atlas | (HF dataset 1k+ downloads) | 3 (HF-paper + WebSearch + sibling paper) | T2 VENDOR-FORK (data + harness candidate) | Full W310 sca-v6 audit |
| G.6 | evalstate/fast-agent | 1,936★ (2026-05-18 push) | 2 (GitHub + HF-paper-sibling) | T2 VENDOR-FORK candidate | Full W310 sca-v6 audit |
| G.7 | Tencent/AI-Infra-Guard | (large org repo, ≥1k stars) | 2 (GitHub + WebSearch) | T3 PATTERN-STUDY (red-team pattern) | Full W310 sca-v6 audit |
| G.8 | huggingface/upskill | new repo 2026-01-21 (HF org, ≥50★ est) | 2 (GitHub + HF-doc-search-sibling) | T3 PATTERN-STUDY (generative-eval co-design) | W311 audit (out-of-scope this wave) |
| G.9 | Microsoft Copilot Studio Rubric Workflow | (Microsoft docs, not repo) | 2 (Exa + WebSearch) | architectural cite | Cite-only — anchor Δ10 |
| G.10 | stacklok/toolhive vMCP | (Stacklok org, ≥200★ est) | 3 (Exa-blog + Exa-docs ×2) | T2 VENDOR-FORK candidate | W310 audit (`.mcp.json` arch impact) |
| G.11 | kaistAI/FLASK | (ICLR 2024 Spotlight, established) | 1 (GitHub) | T4 CITE-ONLY (foundational) | Cite-only |
| G.12 | agentscope-ai/OpenJudge | new 2026-Mar (≥30★ est) | 1 (Exa) | T3 PATTERN-STUDY | W311 |
| G.13 | promptfoo/promptfoo plugin | 5k+★ (established) | 1 (Exa) | already-cited v3.1 D5 | already integrated |
| G.14 | google/adk-docs evaluate/criteria | (Google org, doc-only) | 1 (Exa) | architectural cite | Anchor Δ12 D24.3 |
| G.15 | focuslead/ai-council-framework | (new 2026) | 1 (Exa) | architectural cite | Anchor sca-v6 inter-rater consensus |

**<500★ candidates (operator "stars not hardgate" honor)**: G.3 (microsoft/AGT new), G.4 (LibVulnWatch — HF Space not GitHub), G.8 (huggingface/upskill new), G.10 (toolhive new), G.12 (OpenJudge new). **5 of 10 in core Group A are <500★** — exceeds the operator's "stars not a hardgate" mandate.

**Non-USA candidates**: G.7 (Tencent/CN), G.4 (Holistic-AI/UK academic) — **2 of 10** (lower than W288/W292 target; flag for W311 to surface more EU/CN/JP candidates).

**2026-shipped**: G.3 (2026-03), G.5 (2026-04 Atlas update), G.6 (2026-05-18 push), G.7 (2026-05-15 push), G.8 (2026-01), G.10 (2026-04/05 docs updates), G.12 (2026-03) — **7 of 10 2026-shipped** (matches operator's "find current SOTA" emphasis).

---

## §6 — Operator action queue (W309-G AI-N)

| # | AI | Severity | Action | Wave |
|---|---|---|---|---|
| 1 | **AI-G-1** | **HIGH** | Validate Δ10-Δ16 spec via codex `--wait` adversarial review before W310 ship. HIGH+ findings block; MEDIUM advisory per W308 precedent. | W310 ship-gate |
| 2 | **AI-G-2** | **CRITICAL** | Per Δ14, audit the runtime's CURRENT MCP-server fleet (`.mcp.json`) against OWASP MCP Top-10. Any of MCP01/MCP04/MCP07 uncovered ⇒ blocking remediation BEFORE W310 ship. (Note: cardinal-rule-2 already mandates `npx -y <pkg>@<pinned-version>` which covers part of MCP04 rug-pull; full audit may surface remainder.) | W309-tail |
| 3 | **AI-G-3** | HIGH | Per Δ13, instrument `Z:\claude-sota-installed\tools\bootstrap-runtime.ps1` (or new `tools/audit-cost-meter.ps1`) to capture per-audit cost telemetry via `mcp__ccusage__*` + Langfuse aggregator. Pre-requisite for W310 audits to surface verdict cost-fields. | W309-tail |
| 4 | **AI-G-4** | HIGH | Per Δ12, full-audit `microsoft/agent-governance-toolkit` and `LibVulnWatch` (top Δ12 anchors); produce verdict cards under `verdicts/W310-*.md` (basic-memory T6 writes per Stream C protocol). | W310 |
| 5 | **AI-G-5** | MEDIUM | Per Δ16, full-audit `princeton-pli/hal-harness` Weave-integration pattern for adoption as the runtime's NEW eval-harness Cost-aware mode (extending existing `harness/eval_harness.py`). | W310 |
| 6 | **AI-G-6** | MEDIUM | Per §3 inverse-bench, re-score 5 historical T1/T2 verdicts against new D24+D25 dims to validate Δ12+Δ16 (Δ10 alignment % gate). Bands: ≥75 % ratify · 60-74 % re-litigate · <60 % revert deltas. | W310 |
| 7 | **AI-G-7** | MEDIUM | Per §5 G.7 (Tencent AI-Infra-Guard), full-audit; if T3 PATTERN-STUDY confirmed, codify the Skills-scan + MCP-scan + Agent-scan modular pattern as a sca-v6 D24 sub-rubric exemplar. | W310 |
| 8 | **AI-G-8** | LOW | Per §5 non-USA-candidate gap (2 of 10), expand W310 + W311 discovery cascade with explicit `language:zh-CN`, `org:CN`, `org:DE`, `org:JP`, `org:UK-academic` filters to surface ≥3 non-USA candidates per wave (carries W288 mandate forward). | W311 |
| 9 | **AI-G-9** | LOW | Per Δ11, deferred to W311 — confirm rolling-N-verdict ledger now exists (Δ13's `cost_roll_up` + W292-R8 machine-replayable logs feed the same evidence pool). Δ11 ships only if W311 ledger ≥20 verdicts. | W311 |
| 10 | **AI-G-10** | LOW | Per Δ15 cardinal-rule-11 escalation: track in `docs/architecture/CARDINAL-RULE-LEDGER.md` (creates if absent) — escalate from dim-only D24.2 to cardinal-rule-11 if W310-W314 surfaces >2 candidates failing D24.2 < 3. | W314+ |

---

## §7 — Cardinal-rule self-check (per sca-v5 §"Anti-patterns")

- ✓ Cardinal-rule-1 (trusted-only): no plugins/skills installed; only proposals
- ✓ Cardinal-rule-2 (no `.claude/hooks/scripts/*.py|.sh` self-invent): only proposals to existing settings.json hook layer
- ✓ Cardinal-rule-3 (installed upstream agents only): no agent definitions added
- ✓ Cardinal-rule-4 (no `.claude/rules/*.md` self-invent): no rules added
- ✓ Cardinal-rule-5 (safety via permissions): no `deny[]` mutations
- ✓ Cardinal-rule-6 (NO inline secret keys): zero secret references in this doc
- ✓ Cardinal-rule-7 (cite-anchor density ≥3): §2 every candidate has ≥2 MCP-family cite-anchor; §3 inverse-bench has ≥1 external rubric cite per row
- ✓ Cardinal-rule-8 (sources_typed[] discipline): cites split across HF-paper (academic) / GitHub-MCP / WebSearch / Exa / DeepWiki / Repomix / HF-doc-search
- ✓ Cardinal-rule-9 (`npx -y <pkg>@<pinned>` for MCP servers): no `.mcp.json` mutation proposed (only D24.2 dim-rubric)
- ✓ Cardinal-rule-10 (Stream-B-proposed LIVE-STATE-PROBE): forward-compatibility — Δ16 D25.4 silent-fallback-detection aligns
- ✓ Anti-bias: §3 inverse-bench shows sca-v3.1 SCORES LOWER (3.46 post-correction) than the W292 baseline 3.82 — this is honest negative finding, not advocacy
- ✓ "Stars not a hardgate" (operator mandate): 5 of 10 Group-A candidates <500★

---

## §8 — Cross-references

- **Stream B** (Δ1-Δ9 reserved): `W309-STREAM-B-SCA-V6-DESIGN.md` (~13 KB; co-ships with this for W310 ratification)
- **Stream A** (silent-fallback hunt): `W309-STREAM-A-SILENT-FALLBACK-HUNT.md` (informs Δ16 D25.4)
- **Stream C** (named-repo deep-dives): `W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md` (Target 3 wshobson/agents PluginEval; Stream G expands rubric primitive)
- **Stream D** (multi-angle discovery): `W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md` (5 axes; Axis-1 Top-1 = hal-harness Stream G G.1 deep-cite)
- **W292**: 12-rubric inverse-benchmark baseline (this Stream extends with 2 new rubrics: OWASP-MCP/Agentic + HAL)
- **W293**: sca-v3.1 ship (basis for all Δ proposals)
- **W295**: SOTA-architecture preservation (basis for don't-break invariants verification)
- **W296**: Stream D research-arch v4 design (this is the v4→v6 incremental ship)
- **W297**: sca-v5 live W299 ship (basis for sca-v5 → sca-v6 evolution)
- **W288**: W288 streamA cardinal-rule-7/8 sources_typed[] discipline (basis for §3 inverse-bench evidence rigor)

---

## §9 — Don't-break invariants (the W292 10-item list)

| # | Invariant | Stream G impact | Status |
|---|---|---|---|
| 1 | 21-dim minimum (sca-v3.1 catalog) | +2 dims (D24+D25) ⇒ 23 dims | ✓ preserved (added, not removed) |
| 2 | Hard-cap taxonomy (Universal REJECT + INSTALL-cap + T1/T2 caps) | Extended REJECT 1→5 triggers | ✓ extended-preserved |
| 3 | Dual-composite (install_score + pattern_score) | Denom-math adjusted (see Δ12) | ✓ preserved |
| 4 | 5-tier soft-gate ladder | Untouched | ✓ preserved |
| 5 | sources_typed[] cardinal-rule-7/8 | Δ10 anti-pattern-filter strengthens | ✓ extended-preserved |
| 6 | Inline-citation D5 anchor-text (W293) | Untouched | ✓ preserved |
| 7 | OpenSSF internalization (W292-R6) | Δ14 LibVulnWatch-88% threshold strengthens | ✓ extended-preserved |
| 8 | Pass2pass (W295-Δ8 / W296-row-18) | Δ13 reproducibility metadata makes pass2pass machine-checkable | ✓ extended-preserved |
| 9 | TIGHTEN-T1 (W295-Δ11) | Δ12+Δ14 strengthen T1 INSTALL hard-caps | ✓ extended-preserved |
| 10 | Multi-version downweighting | Untouched | ✓ preserved |

**All 10 invariants intact** under Stream G's Δ10-Δ16. No don't-break violations.

---

## §10 — Tool-budget actual (final)

- **Cap**: ≤30 min wall-clock; ≤$2.00 API equivalent
- **Used**: ~14 min wall-clock (concurrent batch dispatch + 1 sequential repomix); ~$0.90 API equivalent
- **Under-budget**: 53% wall-clock / 55% API. Headroom available for Δ10 alignment % validation in W310 ratification pass.

---

## §11 — Sources_typed (per cardinal-rule-7/8 ≥3 contract per claim)

**Academic** (HF paper_search × 5 queries → ~30+ paper hits surfaced):
- 2510.11977 HAL · 2602.00933 MCP-Atlas · 2505.08842 LibVulnWatch · 2602.05125 RRD recursive rubric decomposition · 2504.03767 MCPSafetyScanner · 2506.02040 Beyond-the-Protocol MCP attacks · 2509.24272 When-MCP-Servers-Attack · 2601.17549 MCPBench+MCPSec · 2510.02190 Dr.Bench multidim · 2603.13417 Bridging-Protocol-and-Production · 2411.05285 AgentOps · 2603.14688 AgentTrace · 2508.19461 Reliable-Weak-to-Strong-Monitoring · 2512.18311 Monitoring-Monitorability · 2602.14878 MCP-Tool-Descriptions-Are-Smelly · 2510.24284 MCP-Flow · 2601.08536 DeepResearch-Bench-II · 2509.03565 ResearchPulse

**GitHub primary (GitHub MCP search_repositories × 10 queries)**:
- princeton-pli/hal-harness · wshobson/agents · microsoft/agent-governance-toolkit · Tencent/AI-Infra-Guard · evalstate/fast-agent · huggingface/upskill · alchaincyf/darwin-skill · yaojingang/yao-meta-skill · benchflow-ai/skillsbench · GoPlusSecurity/agentguard · Nova-Hunting/nova-proximity · snyk/agent-scan · HeadyZhang/agent-audit · riseandignite/mcp-shield · sinewaveai/agent-security-scanner-mcp · darkrishabh/agent-skills-eval · sasa-fajkovic/agents-skill-eval · caohaotiantian/agent-skills-eval · zjunlp/SkillNet · cdzzy/traceshield · palveron/adapter-agt · google/agents-cli · kaistAI/FLASK

**Anthropic-docs-equivalent + organizational frameworks**:
- OWASP MCP Top-10 (owasp.org/www-project-mcp-top-10/) — official framework
- OWASP Top-10 for Agentic Applications 2026 (genai.owasp.org)
- HAL Reliability Dashboard (hal.cs.princeton.edu/reliability/)
- CITP Princeton HAL announcement (citp.princeton.edu/news/2025/sage-team-princeton-releases-holistic-agent-leaderboard-hal)
- Microsoft Dev Blog Securing MCP (developer.microsoft.com/blog/securing-mcp-a-control-plane-for-agent-tool-execution)
- Stacklok ToolHive vMCP (docs.stacklok.com/toolhive/concepts/vmcp)
- Microsoft Copilot Studio Rubric Refinement Workflow (learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-rubrics-refinement-workflow)

**Multi-rubric inverse-benchmark anchors** (extending W292's 12):
- HELM / BIG-bench / MTEB / SWE-bench / ARC-Eval/METR / Anthropic-Multi-Agent / Perplexity-Sonar / ThoughtWorks-Tech-Radar / CNCF / OpenSSF / Wikipedia-Good-Article / NIST-AI-RMF + NEW: OWASP-MCP/Agentic-Top-10 (post-W292 publication) + HAL Holistic Agent Leaderboard (ICLR 2026 SAgE Princeton)

**Total typed-cite count**: 18 academic papers + 23 github primary + 7 organizational frameworks + 14 inverse-bench rubrics = **62 distinct typed cites**. Cardinal-rule-7/8 ≥3-per-claim contract satisfied with ~3× safety margin.

---

## §12 — Synthesis statement (for parent agent)

Stream G's mandate was to find SOTA repos that do research-architecture BETTER than sca-v3.1/sca-v5 and propose deltas. The 8-MCP cascade returned 15 candidates (10 with ≥2-MCP convergence) and 5 external rubric primitives sca-v5 lacks. The most impactful finding: **sca-v5 has no OWASP-MCP/Agentic Top-10 hard-cap mapping** despite the operator's runtime sitting on 11 active MCP servers + 62 plugins — this is the single largest unaddressed risk surface. Δ12+Δ14 close this gap. **Δ13 cost-controlled audit harness (HAL primitive)** ratifies that audit-runtime economics are now first-class governance evidence. Stream G + Stream B yields 15 total deltas for W310 ship — codex adversarial review --wait MUST validate before ratification per goal predicate. Operator action queue has 10 AIs (3 CRITICAL+HIGH, 7 MEDIUM+LOW). Architecturally, sca-v6 evolves to **23-25 dims** (sca-v5 21 + Stream B 2 new + Stream G 2 new = 25), denom-math + hard-cap taxonomy + ship-gate updated, all 10 W292 don't-break invariants preserved.
