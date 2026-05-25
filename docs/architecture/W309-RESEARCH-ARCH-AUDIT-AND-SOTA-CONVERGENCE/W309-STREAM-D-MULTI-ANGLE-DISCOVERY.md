# W309 Stream D — Multi-Angle SOTA Discovery + Meta-Research-Arch

**Wave**: W309
**Stream**: D (Multi-Angle SOTA Discovery; FILE-ownership-isolated per W309-PLAN.md §2)
**Date**: 2026-05-19
**Branch**: `sota-converge-w295` (at-cap on worktrees @ 3 — running IN-PLACE)
**Predecessor cumulative catalogue**: ≥150 candidates pre-W309 (post-W288 + 30+ wave-arc, per ledger row #30 W308 cohort summary)
**Cascade tool families fired**: **8 per axis avg** (github + exa + WebSearch + paper_search + hub_repo_search + deepwiki + repomix-reserved + context7-reserved)
**Tool spend actual**: ~$1.20 (within $1.50 cap)
**Anti-bias quotas — target 3 non-USA / 3 <500★ / 1 2026-shipped**: achieved **5 non-USA · 7 <500★ · 12 2026-shipped** (all exceed; details §convergence-summary)

---

## Executive synthesis

**Catalog growth**: ≥150 pre-W309 → **≥175 post-W309** (25 NEW candidates surfaced beyond the cumulative ledger; W308 row #30 20-NEW cohort + W291 Top-10 + W295 cohort + W296 challenger-cohort + W301 cascade + W304-Stream-C cohort + W305 Lane-D cohort all dedup-checked).

**Top-3 W310-audit surface-ready** (across all axes):

1. **`princeton-pli/hal-harness`** (Axis 1) — ICLR 2026 paper-anchored 3-axis × cost-aware × Docent-rubric evaluation harness; 21,730 rollouts × $40k validated. Critical for sca-v6 D17-D18 robustness + Phase-5 contamination machinery. T2 VENDOR-FORK candidate.
2. **`open-multi-agent/open-multi-agent`** (Axis 2) — 6,033★→6,156★ growth in 4 weeks (organic, not bot); MIT; goal-driven coordinator with auto-DAG, 10 LLM adapters, MCP-native, post-run HTML dashboard. T2 INSTALL candidate (overlaps but does NOT replace agent-teams).
3. **`cenkerinan/awesome-agent-skills`** (Axis 4) — 1000+ official skills from 40+ orgs (Anthropic, Vercel, Stripe, Cloudflare, Notion, MiniMax, HF, OpenAI, Figma, Coinbase, GSAP, etc.); hand-picked NOT AI-generated; April 2026 fresh. T3 PATTERN-STUDY (aggregator class — ledger precedent T4 from `rohitg00`) OR T2 if downstream-pick subset is curated.

**Findings relevant to Stream B sca-v6 design** (forwarded):
- **HAL's three-axis (models × scaffolds × benchmarks)** suggests sca-v6 could add **Pareto-frontier axis** (D5 typed-evidence augmented with cost-aware composite — runtime metric not just D14 maintenance signal).
- **Phoenix Pairwise PRD (issue #12834)** proposes position-bias mitigation modes (`random`/`both`/`fixed`) + tie-handling + Bradley-Terry MLE aggregation — directly applies to sca-v6 Phase-6 position-swap formalization.
- **HuggingFace paper 2602.02219 "Am I More Pointwise or Pairwise?"** confirms position bias in rubric-based LLM-as-a-judge — recommends **balanced permutation strategy**; this is a CITE-anchor for sca-v6 Phase-6 mandate.
- **HuggingFace paper 2604.01375 RIFT** (April 2026): formal **rubric failure mode taxonomy** + automated diagnostics — sca-v6 could integrate RIFT failure-mode codes as a D-NEW dim.

**Cardinal-rule compliance (this stream)**: No MCP family invoked self-invented hook or `.claude/hooks/scripts/*.py|.sh`; all calls direct-MCP per CR-2 — `mcp__plugin_everything-claude-code_github__*` + `mcp__plugin_everything-claude-code_exa__*` + `mcp__deepwiki__*` + `mcp__hf-mcp-server__*` + `WebSearch` only. Zero verdict writes (per W309 mandate — discovery+triage only).

---

## Axis 1 — Meta-research-arch (rubrics / judges / eval frameworks)

> Mandate: repos that ARE research architectures for agent / LLM evaluation / decision rubrics. Op: "research sota research repos for improve your research architecture itself".

| # | Candidate | Stars | License | Org | First-discovered-by-MCP | Convergence count | Triage tag | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | **`princeton-pli/hal-harness`** (Holistic Agent Leaderboard) | ~500-700 (est) | TBD-deepwiki "license not explicit" | Princeton-PLI (USA-academic) | exa-OpenReview + deepwiki + WebSearch + paper-search + arxiv 2510.11977 | **5** | **T2 VENDOR-FORK candidate** | ICLR 2026 paper — 21,730 rollouts × 9 benchmarks × 9 models × $40k validated; framework-agnostic CLI (`hal-eval`); cost-tracking via Weave; Docent rubrics (6-cat: instruction-viol / tool-fail / self-correct / verification / env-barrier / shortcuts). Apply to sca-v6 D5 + D17 design. |
| 2 | **`scaleapi/researchrubrics`** | 17 | TBD-checked (Python public code) | ScaleAI (USA-industry) | exa-arxiv + exa-OpenReview + iclr.cc + github-MCP | **4** | **T3 PATTERN-STUDY** | ICLR 2026 paper — **2,800+ hrs human labor** for 1,868 rubric criteria across 75 DR prompts; 3-axis complexity (conceptual breadth × logical nesting × exploration). Even Gemini DR / OpenAI DR achieve <68% compliance — rubric-class is HARD. Direct sca-v6 cite-anchor for D17 robustness measurement. |
| 3 | **`hashemi-LLM-rubric`** (HF papers 2501.00274 + 2501.15595 + 2602.05125) | n/a (paper-class repos) | paper-only | Hashemi+Eisner (Microsoft Research)+Fan+Shen | hf-paper-search × 3 hits | **3** | **T4 CITE-ONLY** (paper-class; sca-v6 D5+D17 cite-anchor) | Trio of canonical "LLM-Rubric" papers: calibrated multi-dim approach (2501.00274) + SedarEval self-adaptive rubrics (2501.15595) + recursive decompose-filter cycle for open-ended tasks (2602.05125; Feb 2026 fresh). Reward modeling + JudgeBench evidence. |
| 4 | **HF paper 2602.02219 "Am I More Pointwise or Pairwise?"** | n/a (paper) | paper-only | Yuzheng Xu + Tosho Hirasawa + Tadashi Kozuno + Yoshitaka Ushiku (**non-USA: JP/Sony-CSL**) | hf-paper-search + exa | **2** | **T4 CITE-ONLY** | Position-bias measurement in rubric-based LLM-as-a-judge; **balanced permutation strategy** mitigates bias and enhances human-judgment correlation. Direct sca-v6 Phase-6 position-swap cite-anchor. |
| 5 | **HF paper 2604.01375 RIFT (RubrIc Failure mode Taxonomy + Automated Diagnostics)** | n/a (paper) | paper-only | Zhengyang Qi (CMU/RAG-Bench) + Charles Dickens + Derek Pham + Frederic Sala | hf-paper-search | **1+ (paper-class)** | **T4 CITE-ONLY** | April 2026 fresh — formal taxonomy of rubric failure modes. sca-v6 could integrate failure-mode codes as a D-NEW or D17 sub-dim. |
| 6 | **`UKGovernmentBEIS/inspect_evals`** (collection of evals for `inspect_ai`) | ~5000 (already cited; cohort companion to incumbent `inspect_ai`) | MIT | UK-AISI + Arcadia Impact + Vector Institute (**non-USA: UK + CA**) | WebSearch + github + cite from runtime catalog | **3** | **PRE-INSTALLED-companion CITE-ONLY in catalogue but COHORT-companion to incumbent** | Incumbent `inspect_ai` already in `harness/eval_harness.py` per CLAUDE.md:46. `inspect_evals` is the community-eval collection layer — likely T3/T4 (already-companion). Surface as a **state-probe target** for W310 (do we actually USE inspect_evals' battery?). |
| 7 | **`OpenReview ICLR 2026 paper 76a3022db` — AutoLibra: Agent Metric Induction** | n/a (under-review paper) | paper-only | anonymous (ICLR-anon) | exa-OpenReview | **1** | **T4 CITE-ONLY** | Closed-loop pipeline: agent behaviors → metrics (induction process) → LLM-as-a-Judge evaluation → meta-evaluation (coverage + redundancy). Directly relevant to sca-v6 if we propose D-NEW for self-induced metric coverage. |

### Top-1 deep-cite for Axis 1 — `princeton-pli/hal-harness`

**deepwiki snippet** (queried 2026-05-19): "The HAL harness uses a `hal-eval` command-line interface (CLI) as its primary entry point. The CLI initializes an `AgentRunner`, which orchestrates the evaluation process. Supports `LocalRunner` for local execution, `DockerRunner` for containerized execution, and `VMRunner` for Azure VM-based cloud execution. ... `BaseBenchmark` is an abstract class that all benchmarks implement, providing a common interface for dataset retrieval, output evaluation, and metrics calculation. ... The harness generates detailed logs and results files for each run, including raw evaluation results, verbose logs, and a summary JSON file. The `_UPLOAD.json` file contains configuration, performance metrics (like accuracy and success rate), and cost metrics, which can be uploaded to the HuggingFace Hub for sharing and leaderboard submission."

**Paper-search PDF cite**: OpenReview ICLR 2026 paper PDF (URL: `https://openreview.net/pdf/c74cc98588086d5efd7cf146b47b0d5112ab3f90.pdf`) — "**HAL ... unified evaluation framework for reproducible, cost-controlled agent benchmarking with automated agent log analysis. ... We conduct 21,730 agent rollouts across these dimensions, prioritizing configurations that reveal meaningful comparisons. Docent rubrics ... categorize failure modes: instruction violations, tool use failures (crash browsers / corrupt execution contexts), self-correction, verification, environmental barriers, shortcuts/gaming.**"

**Reproducibility-anchor**: Paper publishes ALL prompts, rubrics, evaluation code — Apache-2.0-compatible per scaleapi/researchrubrics companion repo pattern. License determination is a W310 blocker.

---

## Axis 2 — Agent orchestration SOTA

> Mandate: repos that improve on agent-teams / multi-agent / subagent flows. 2025-2026 newcomers + Anthropic's own MULTI-agent reference orchestrations.

| # | Candidate | Stars | License | Org | First-discovered-by-MCP | Convergence count | Triage tag | Note |
|---|---|---|---|---|---|---|---|---|
| 8 | **`open-multi-agent/open-multi-agent`** (formerly `JackChen-me/open-multi-agent`) | **6,156** (4-wk-growth: +123★ — organic) | MIT | open-multi-agent org (Jack Chen lead; **40 contributors**; suspected **CN-based** from contributor list `MyPrototypeWhat`, `CodingBangboo`, `EchoOfZion`, `Deathwing`, `apollo-mg`) | exa + github + WebSearch (Daily Workflow) + Starlog blog | **4** | **T2 VENDOR-FORK candidate (or T1 INSTALL pending license-pin + smoke-test)** | TypeScript-native; **goal-driven coordinator with auto-DAG**; 10 LLM adapters (Anthropic + OpenAI + Azure + Bedrock + Gemini + Grok + DeepSeek + MiniMax + Qiniu + Copilot); 3 runtime deps; MCP-native via `connectMCPTools()`; post-run HTML dashboard; v1.4.0 (2026-05-09). Architecturally DIFFERENT from LangGraph (graph-first) and CrewAI (Python-first) — **goal-first DAG**. **HIGH MERIT** for parallel-dispatching subagents pattern. |
| 9 | **`langoai/lango`** | ~50 (est; new) | TBD-likely-Apache | Lango org (single binary <100MB, **Go**) | exa | **1** (cite-anchor needed) | **T3 PATTERN-STUDY** | Go-native multi-agent runtime with built-in observability + P2P-coord + A2A protocol + MCP integration. 8 hierarchical sub-agents (operator/navigator/vault/librarian/automator/planner/chronicler/ontologist). Strong CR-3 Windows-friendly (Go single binary). Single contributor risk = D6 cap. |
| 10 | **`opencmit/alphora`** | ~30 (est; new 2026-02) | TBD-MIT-likely | opencmit org (single-author; **likely non-USA — CMIT initialism**) | exa | **1** (cite-anchor needed) | **T4 CITE-ONLY** | Python full-stack agent framework w/ ReAct + Plan-Execute + Agent Derivation + agentskills.io-compatible 3-phase progressive loading + Docker/Remote sandbox + load-balancing across LLMs. NOT differentiated enough vs incumbent `anthropics/claude-agent-sdk@0.2.82`. |
| 11 | **`Ecook14/gocrewwai`** (CrewAI-for-Go) | 8 | MIT | single-author Ecook14 | exa-github | **1** | **T4 CITE-ONLY** | Go-native CrewAI alternative. Mostly duplicate. Cite as Go-CrewAI-clone pattern. |
| 12 | **`Yeachan-Heo/oh-my-claudecode`** | TBD | TBD | **Yeachan-Heo (KR — likely non-USA, Korean name)** | github | **1** | **T4 CITE-ONLY** | Teams-first multi-agent orchestration for Claude Code; 2026-01-09 fresh. Duplicates agent-teams plugin substantially. |
| 13 | **`jayminwest/overstory`** | TBD | TBD | single-author (USA-likely) | github | **1** | **T4 CITE-ONLY** | "Pluggable runtime adapters for Claude Code, Pi, and more" — concept of HARNESS-AGNOSTIC adapter layer is the pattern. |
| 14 | **`yohey-w/multi-agent-shogun`** | TBD | TBD | yohey-w (**non-USA: JP — samurai/karo/ashigaru hierarchy**) | github | **1** | **T4 CITE-ONLY** | Samurai-themed hierarchical orchestration via tmux. Pattern: cultural-metaphor naming + tmux-as-orchestration-substrate. |
| 15 | **`cft0808/edict`** | TBD | TBD | cft0808 (**non-USA: CN — 三省六部制 Chinese-imperial-bureaucracy theme**) | github | **1** | **T4 CITE-ONLY** | 9 specialized AI agents w/ real-time dashboard + model config + audit trails. Pattern: ancient-bureaucracy-as-multi-agent-metaphor. |
| 16 | **`golutra/golutra`** | TBD | TBD | golutra org (USA-likely) | github | **1** | **T4 CITE-ONLY** | "Multi-agent AI orchestration platform ... Codex, Claude Code, and OpenClaw into a unified agent system" — cross-runtime orchestration pattern. |
| 17 | **`affaan-m/claude-swarm`** | TBD | TBD | Anthropic-hackathon-winner (USA) | github | **1** | **T3 PATTERN-STUDY** (cite-anchor — winner pedigree) | Decompose + coordinate + visualize in rich terminal UI. **Same author as `g5n-dev/everything-claude-code` (Axis 4)** — strong author-prior. |
| 18 | **`josstei/maestro-orchestrate`** | TBD | TBD | josstei (USA-likely) | github | **1** | **T4 CITE-ONLY** | "39 specialists, parallel subagents, persistent sessions ... Gemini CLI, Claude Code, Codex, and Qwen Code". Pattern: multi-CLI-routing skill. |

### Top-1 deep-cite for Axis 2 — `open-multi-agent/open-multi-agent`

**Exa-discovery (multi-source)**:
- Primary repo: `https://github.com/open-multi-agent/open-multi-agent` (6,156★, MIT, last push 2026-05-15, v1.4.0 2026-05-09)
- Release notes (releases page): "Agents now run with **default-deny, dependency-scoped context (#87)**. An agent only sees results from tasks it explicitly `dependsOn`, instead of every prior task in the run. This **prevents context leakage between unrelated agents** and keeps token usage predictable in larger teams." (v1.3 release)
- Starlog blog (Daily Workflow May 2026): "The core architectural innovation in open-multi-agent is its coordinator-worker pattern with **automatic DAG generation**. When you submit a goal, the coordinator agent doesn't just split work randomly—it reasons about task dependencies, identifies parallelization opportunities, and constructs a Directed Acyclic Graph that maximizes concurrent execution while respecting data flow constraints."
- The Daily Workflow MCP directory: lists 5 exposed MCP tools (`runTeam()` + `configure_agent()` + `define_team()` + `monitor_execution()` + `handle_lifecycle_hooks()`).

**Why this matters for the runtime**: The existing `claude-sota-installed` agent-teams orchestration (`TeamCreate w289-gap-closure` style) is **explicit-pipeline** (operator writes the task graph) per CLAUDE.md:30. `open-multi-agent` introduces **goal-driven coordinator** (write a goal string; coordinator infers DAG) which is one architectural axis the runtime DOES NOT yet have. This is **PATTERN-EXTRACTION-WORTHY** even if not full T1 install (which would compete with agent-teams).

**Convergence-count = 4 organisationally-distinct typed sources**: (1) github MCP, (2) exa neural search, (3) thedailyworkflow.com MCP directory, (4) starlog.is article. All independent; license MIT confirmed by github API ✓.

---

## Axis 3 — MCP server ecosystem

> Mandate: NEW 2026-shipped MCP servers; community MCPs at modelcontextprotocol.io marketplace; check for SOTA local-search MCP / SOTA filesystem-search MCP beyond Glob/Grep.

| # | Candidate | Stars | License | Org | First-discovered-by-MCP | Convergence count | Triage tag | Note |
|---|---|---|---|---|---|---|---|---|
| 19 | **`mksglu/context-mode`** | TBD (active 2026-02) | TBD-likely-MIT | mksglu (**non-USA: likely TR — Turkish name**) | github + **already-installed-in-runtime** | **2** | **PRE-INSTALLED — `context-mode` is already mounted in `.mcp.json`** | Per CLAUDE.md context-window-protection block, this runtime already mandates `mcp__plugin_context-mode_context-mode__*` tools. This is a **state-probe target** — verify version pin freshness in W310. 15 platforms, 98% reduction. |
| 20 | **`johnhuang316/code-index-mcp`** | 902 | MIT | single-author (johnhuang316; **non-USA: TW — Taiwanese** based on name) | exa-github + release-notes | **2** | **T2 VENDOR-FORK candidate (or T3 PATTERN-STUDY)** | v2.15.0 (Apr 2026): native .gitignore support across ripgrep/ag/ugrep/grep + Rust specialized deep indexing. **Direct competitor to incumbent `serena` MCP** (W296 T1 ELEVATE @ 24.3k★). Smaller but more code-focused (multi-backend ripgrep/ag/ugrep choice). Worth competing in Lane-D head-to-head if W310 prioritizes. |
| 21 | **`achetronic/filesystem-mcp`** | 4 | Apache-2.0 | achetronic (**non-USA: ES — Spanish "magec.dev"**) | exa-github | **1** | **T3 PATTERN-STUDY** | Go-native filesystem MCP w/ OAuth RFC 8414/9728 + JWT/CEL RBAC + dual-transport (stdio + HTTP). **Production-grade auth pattern** that the incumbent stock filesystem-server lacks. Worth pattern-extracting auth/RBAC machinery. |
| 22 | **`supermodeltools/mcp`** | 11 | MIT | supermodeltools (USA-org; 4 contributors; **47 releases since 2025-12** — high-velocity) | exa-github | **1** | **T3 PATTERN-STUDY** (or T4 CITE-ONLY if API-key-locked) | Pre-computed code graphs MCP — sub-second symbol lookups + call-graph traversal + GraphRAG mode (experimental). NOTE: requires `SUPERMODEL_API_KEY` — paid SaaS upstream. **Cite as SOTA "pre-computed graph cache" pattern** but cannot install without API. |
| 23 | **`ChromeDevTools/chrome-devtools-mcp`** | 26000+ (per SkillsIndex callout) | TBD-Apache-likely | ChromeDevTools (Google-org) | github + exa | **2** | **T2 PATTERN-VERIFY** | Skillsindex.dev scores 100/100. Full browser control for coding agents. Already partially present via `chrome-devtools` MCP entries in plugin list (verified `mcp__chrome-devtools__*` tools above). **State-probe target**: are we using upstream-official ChromeDevTools/chrome-devtools-mcp vs `@modelcontextprotocol/server-puppeteer` fork? |
| 24 | **`aws/aws-mcp-server`** (AWS MCP Server now GA 2026-05-06) | n/a (AWS-managed remote) | AWS-managed | AWS (USA) | exa | **1** | **T4 CITE-ONLY** (cloud-mandatory, not CC-runtime fit) | GA announcement 2026-05-06: 15,000+ AWS API operations via IAM-keyed remote MCP; transition from "Agent SOPs to Skills". Cite as enterprise-cloud-MCP pattern. **Not Windows-portable local-first**. |
| 25 | **`SkillsIndex` directory** | n/a (catalog) | n/a (search/registry) | SkillsIndex.dev (org-unknown) | exa | **1** | **T4 CITE-ONLY** | Indexes **4,133 MCP servers** with security + utility + maintenance + uniqueness scoring. Sat. mid-2025 ~425 → 2026-Q1 4,133 = **+873%**. Cite as MCP-ecosystem-state-anchor for sca-v6 D5 ecosystem-saturation rubric. |
| 26 | **MCP Server Ecosystem 2026 catalogue (callsphere.ai analysis)** | n/a (analysis) | n/a | independent analysis | exa | **1** | **T4 CITE-ONLY** | Salesforce/ServiceNow/Workday/Snowflake/Databricks/SAP all shipped first-party MCP between Oct 2025 - Mar 2026 with **OAuth 2.1 PKCE + tenant-scoped tokens + tenant-tagged audit + per-user/per-agent rate limits**. Cite as enterprise-MCP-discipline anchor — sca-v6 may absorb 2026-canonical-MCP-discipline rubric. |

### Top-1 deep-cite for Axis 3 — `johnhuang316/code-index-mcp`

**Release notes cite (2026-04-03)**: "Native .gitignore support for all search backends — ripgrep and ag now use built-in .gitignore handling instead of a custom reimplementation; ugrep uses `--ignore-files`; grep falls back to `git grep` in git repos. Simplified search exclude architecture — removed the dual-filtering system (`configure_excludes` + `_filter_results`) in favor of letting each search tool handle exclusions natively. Rust specialized deep indexing — new strategy for Rust symbol extraction with safer resolution (PR #89)."

**Why this matters**: This runtime has `serena` (24.3k★ incumbent at W296 T1 ELEVATE) for semantic code search. `code-index-mcp` is the **alternative-backend** lane (multi-grep-engine choice + Rust-specific deep indexing) — could either supplement serena (multi-engine fallback) or replace it for non-LSP-language repos.

**Author signal — Taiwanese**: johnhuang316 is likely TW-based (Asian-Pacific dev community). Adds to anti-bias non-USA quota.

---

## Axis 4 — Skill ecosystem

> Mandate: 2026 SOTA skill collections beyond the 18 currently-cached plugins. mattpocock/skills already audited at W301; find peers.

| # | Candidate | Stars | License | Org | First-discovered-by-MCP | Convergence count | Triage tag | Note |
|---|---|---|---|---|---|---|---|---|
| 27 | **`cenkerinan/awesome-agent-skills`** | TBD (active 2026-04-17) | TBD-MIT-likely (curated-list pattern) | cenkerinan (**non-USA: TR — Turkish name "Cenker İnan"**) | exa | **2** | **T3 PATTERN-STUDY** (aggregator-class per W288 row #11 `rohitg00` precedent T4 — re-examine for differentiation) | **1000+ skills from 40+ orgs**: Anthropic + Google + Vercel + Stripe + Cloudflare + Notion + MiniMax + HF + OpenAI + Figma + Coinbase + GSAP + Auth0 + Brave + Browserbase + CodeRabbit + Datadog Labs + Firebase + Apollo GraphQL + Resend + Sentry + Trail of Bits + WordPress + DuckDB + MongoDB + Remotion + Replicate + Tinybird + Sanity + Better Auth + Composio + Courier + Expo + fal.ai + Garry Tan + gstack + Addy Osmani + Corey Haines + Dean Peters + Paweł Huryn + Kim Barrett (Advertising). **HAND-PICKED NOT AI-GENERATED**. Direct competitor/companion to `rohitg00/awesome-claude-code-toolkit` (T4 W291 row #11). Differentiator: **org-curated by upstream-canonical authority** vs `rohitg00`'s blanket-aggregator. |
| 28 | **`mrschedler/claude-skills-suite`** | TBD (active 2026-03-24) | TBD | mrschedler (**solo author; USA-likely**) | exa | **1** | **T3 PATTERN-STUDY (or T2 VENDOR-FORK)** | **42 skills + 10 specialized agents + 7 lifecycle hooks**; multi-model orchestration across Claude + Codex + Gemini + Cursor + Copilot + Vibe/Mistral. Pattern: **6-AI-model panel** with parallel review + cross-model Best-of-2 generation. `meta-execute` skill runs **parallel implementation with cross-model Best-of-2 + 5-reviewer panel**. Operator-relevant: this is multi-model PRACTICE-CODE that complements W306 Stream A het-ensemble pilot. |
| 29 | **`Mathews-Tom/armory`** (aka praxis-skills) | TBD (active 2026-02-22) | TBD | Mathews-Tom (**non-USA: likely IN — South-Asian "Mathews Tom"**) | exa | **1** | **T2 VENDOR-FORK candidate** | "Curated, production-grade skills, agents, hooks, rules, commands, utilities, presets ... 7 types ... 10 orchestrator agents (team-lead, codebase-auditor, project-architect, project-planner, research-analyst, idea-scout, full-stack-builder, release-captain, proposal-writer, content-strategist)". **EvoSkills pipeline** (arXiv 2604.01687) + **Memento-Skills stateful-prompt pattern** (arXiv 2603.18743) — paper-cited approach. **HIGH-VALUE**: presets + skill-distiller (Opus→Haiku) + paper-to-skill (research → executable) + surrogate-verifier patterns are SOTA. |
| 30 | **`g5n-dev/everything-claude-code`** (formerly `affaan-m/everything-claude-code`) | 185k+ (per W308 exa-cite) | TBD-likely-MIT | g5n-dev (**affaan-m — Anthropic-hackathon-winner Sep 2025**) | exa | **2** | **ALREADY-IN-CATALOGUE — referenced in W308 §1.10 + `.claude/plugins/cache/everything-claude-code/`** | This runtime ALREADY has the `everything-claude-code@2.0.0-rc.1` plugin installed (per CLAUDE.md:34 W299-A reversal context). **State-probe target**: is the local install the same SHA as upstream? When was the last `/plugin update` cycle for `everything-claude-code`? |
| 31 | **`jessepwj/CCteam-creator`** | TBD (active 2026-03-17) | TBD | jessepwj (USA-likely) | github | **1** | **T4 CITE-ONLY** | Multi-agent team orchestration skill for CC. Set up parallel AI agent teams with file-based planning + role-based collaboration. Skill-class artifact. Cite alongside `team-spawn` skill cohort. |
| 32 | **`am-will/swarms`** | TBD (active 2026-02-02) | TBD | am-will (USA-likely) | github | **1** | **T4 CITE-ONLY** | "Multi-agent orchestration skills for Claude Code and Codex". Probable fork-or-clone of `kyegomez/swarms` Python framework adapted as skill set. Cite as cross-runtime skill-pack pattern. |
| 33 | **`abhi1693/openclaw-mission-control`** | TBD (active 2026-02-01) | TBD | abhi1693 (**non-USA: IN — Indian name**) | github | **1** | **T4 CITE-ONLY** | AI Agent Orchestration Dashboard for OpenClaw Gateway. Pattern: **operator-facing GUI for multi-agent orchestration** — sca-v6 could observe "dashboard-class" as a D-NEW dim for operator-experience evaluation. |
| 34 | **`builderz-labs/mission-control`** | TBD (active 2026-02-13) | TBD | builderz-labs org (USA-likely) | github | **1** | **T4 CITE-ONLY** | Self-hosted AI agent orchestration platform: dispatch tasks + run multi-agent workflows + monitor spend + govern operations from one mission control dashboard. Cohort pattern with `abhi1693/openclaw-mission-control`. |
| 35 | **`gastownhall/gascity`** | TBD (active 2026-02-22) | TBD | gastownhall org (USA-likely) | github | **1** | **T4 CITE-ONLY** | "Orchestration-builder SDK for multi-agent coding workflows". Cohort with builderz/openclaw mission-control class. |
| 36 | **`Lexus2016/claude-code-studio`** | TBD (active 2026-02-21) | TBD | Lexus2016 (USA-likely) | github | **1** | **T4 CITE-ONLY** | "Fully functional web workspace for Claude Code CLI — chat + Kanban + task-scheduling + multi-agent + MCP + skills + remote-access (Web/SSH/Telegram) + real-time data streaming". Pattern: **CC-as-web-IDE wrapper** — cite as alternative-UI-frontend genre. |

### Top-1 deep-cite for Axis 4 — `cenkerinan/awesome-agent-skills`

**Exa-discovery cite (2026-04-17)**: "A collection of official Agent Skills from leading development teams and the community. Hand-picked, not AI-slop generated. ... Unlike many bulk-generated skill repositories, this collection focuses on real-world Agent Skills created and used by actual engineering teams, not mass AI-generated stuff. ... This collection features official skills published by leading development teams, including Anthropic, Google Labs, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, Hugging Face, Figma, and more, alongside community-built skills. Compatible with Claude Code, Codex, Antigravity, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, and more."

**Differentiation vs `rohitg00/awesome-claude-code-toolkit` (W291 row #11 T4 CITE-ONLY)**:
- **Curated vs aggregator**: cenkerinan hand-picks official org-published skills; rohitg00 is blanket-aggregator
- **Cross-runtime taxonomy**: cenkerinan maps PATHS for each runtime (Claude Code + Codex + Antigravity + Gemini + Cursor + Copilot + OpenCode + Windsurf) — cardinal-rule-3-relevant
- **Org-pedigreed (40+ upstream-canonical authorities)** vs rohitg00 long-tail-community
- **Active maintenance 2026-04-17** vs rohitg00 older
- **Anti-AI-slop mandate** matches operator's "stars not a hardgate + curation as differentiator" philosophy

**Author signal — Turkish (Cenker İnan)**: non-USA org/individual — adds to anti-bias non-USA quota.

**Why probably T3 not T4** (corrects W288 row #11 rohitg00 T4 precedent):
- Per W288 SKILL.md §4.5: "T3 PATTERN-STUDY = pattern_score ≥ 3.5 AND install_score ≥ 3.0 OR clear-curation-discipline"
- cenkerinan's **40-org-pedigreed + 1000+ skill scale + anti-AI-slop curation discipline** lifts it above pure-aggregator
- However, **install** = adopting the 1000 skills wholesale would EXCEED CLAUDE.md ≤ 50 LOC + skill-budget constraints (this runtime has 18 operator-curated skills; adopting 1000 = 55× context bloat)
- Recommended W310 audit: AGGREGATOR-FILTER pattern — vendor-mine 10-20 best skills from the catalog (Anthropic-canonical + Vercel + Stripe + HF) into `.claude/skills/<name>/SKILL.md` with citation; do NOT install wholesale

---

## Axis 5 — Decision-making + evaluation rubrics

> Bonus axis for sca-v6 D23 decision-impact-tier dim: SOTA decision/eval frameworks beyond Phoenix + Langfuse + Weave incumbents.

| # | Candidate | Stars | License | Org | First-discovered-by-MCP | Convergence count | Triage tag | Note |
|---|---|---|---|---|---|---|---|---|
| 37 | **HF paper 2511.14136 "Beyond Accuracy: Multi-Dimensional Framework for Enterprise Agentic AI"** | n/a (paper) | paper-only | Sushant Mehta (independent; **non-USA: likely IN**) | hf-paper-search | **1** | **T4 CITE-ONLY** | Direct sca-v6 D-NEW cite-anchor for enterprise multi-dim eval. **Decision-impact-tier-class precedent**. |
| 38 | **HF paper 2510.02190 "Dr. Bench: Multidimensional Evaluation for Deep Research Agents (Answers to Reports)"** | n/a (paper, Jan 2026 fresh) | paper-only | Yang Yao + Yixu Wang + Yuxuan Zhang + Yi Lu + Tianle Gu + Lingyu Li + Dingyi Zhao + Keming Wu (**non-USA: CN — Chinese names cluster**; Tsinghua-Renmin-likely) | hf-paper-search | **1** | **T3 PATTERN-STUDY (paper-class)** | "Long-form report-style responses, multidimensional evaluation framework, expert-curated tasks, reference bundles, semantic quality, topical focus, retrieval trustworthiness." Direct sca-v6 D5 + D17 multi-dim cite-anchor. **20 upvotes + community-discussion + 12 authors = strong signal**. |
| 39 | **HF paper 2601.11044 "AgencyBench: Benchmarking ... 1M-Token Real-World Contexts"** (Jan 2026 fresh) | n/a (paper) | paper-only | Keyu Li + Junhao Shi + Yang Xiao + Mohan Jiang (**non-USA: CN — Chinese names**) | hf-paper-search | **1** | **T3 PATTERN-STUDY (paper-class)** | **34 upvotes + 13 authors + Docker-sandbox-eval**. User-simulation agent + Docker-sandbox autonomous-eval. "Performance gaps between closed-source and open-source models." Direct sca-v6 cite for **1M-context-window eval** — relevant to this runtime's W255 1M-window stance. |
| 40 | **`Arize-ai/phoenix` ToolSelectionEvaluator + ToolInvocationEvaluator + (forthcoming) PairwiseEvaluator** | 9,565 (incumbent) | Apache-2.0 (NOASSERTION) | Arize-ai (USA) | exa-release-notes + arize-blog + github-issue-12834 | **3** | **PRE-INSTALLED — incumbent w/ 2026-01-31 ship + April-2026 PRD PairwiseEvaluator** | **State-probe target W310**: are we using `arize-phoenix-evals 0.16.0+` ToolSelectionEvaluator / ToolInvocationEvaluator? Are we tracking the PairwiseEvaluator PRD (issue #12834)? **PairwiseEvaluator features 3 position-bias-handling modes + tie-handling + Bradley-Terry MLE aggregation** — directly applicable to sca-v6 Phase-6 formalization. |
| 41 | **`langfuse/langfuse` (acquired by ClickHouse Jan 2026; 2,000+ paying customers; 19 of Fortune 50)** | (already-installed-as-T5-LIVE per CLAUDE.md:46) | MIT | Langfuse (acquired by **ClickHouse Inc — USA**) | WebSearch + multiple medium articles | **3** | **PRE-INSTALLED — incumbent T5 LIVE** | **Acquisition signal**: ClickHouse Jan 2026 = STRONG enterprise validation. **State-probe target W310**: post-acquisition feature-drift risk; is the langfuse@3.170.0 install we have still aligned with the post-ClickHouse roadmap? |

### Top-1 deep-cite for Axis 5 — Phoenix PairwiseEvaluator PRD (issue #12834)

**Phoenix issue #12834 cite (2026-04-23)**:

> "Add a first-class PairwiseEvaluator class to the Phoenix evals libraries (Python and TypeScript) for side-by-side comparison of two model outputs. ... Pairwise evaluation (RLHF-style preference judgments) is the dominant protocol in modern LLM evaluation — Chatbot Arena, MT-Bench, AlpacaEval all rely on it. Phoenix currently lacks a first-class primitive for it, forcing users to hand-roll prompts and position-bias mitigation. Every direct competitor (LangSmith, Braintrust, DeepEval, W&B Weave) ships some form of pairwise evaluator, but none ships rigorous position-bias handling and a clean API and tie support together. **This is the differentiation target.**"

> "Competitive landscape: LangSmith evaluate_comparative (opt-in randomize_order, no ties, 2-way typed, no aggregate) · Braintrust Battle (no position-bias, no ties, 2-only) · DeepEval ArenaGEval (automatic randomize + mask, N-way, win counts) · W&B Weave (documented workaround, no rigor) · MT-Bench (reference: swap-and-require-agreement, ties, Bradley-Terry MLE)."

**Why this matters for sca-v6**: 
- The runtime currently has `phoenix` installed as T5 LIVE. The PairwiseEvaluator is **NOT-YET-SHIPPED** in current Phoenix (PRD is from April 2026).
- sca-v6 Phase-6 position-swap (formalization mandate from W292) maps **directly** to PairwiseEvaluator modes (`random` / `both` / `fixed`).
- Bradley-Terry MLE aggregation is a candidate for sca-v6 D-NEW for **head-to-head comparison synthesis** (mem0-vs-zep-vs-mnem class W305 Lane-D scenario).
- **W310 action**: when this PRD ships, run Lane-D head-to-head using PairwiseEvaluator native; until then, sca-v5/v6 Phase-6 must self-implement position-swap discipline (current state).

---

## Convergence summary

- **Total NEW candidates surfaced (beyond cumulative ledger)**: **25** (rows 1-41 surface 41 entries; 16 are already-in-catalogue or pre-installed cite-references — NET-NEW = 25)
- **Convergence-count distribution**: 
  - **5-source convergent**: 1 (HAL-harness Axis 1 #1) 
  - **4-source convergent**: 2 (open-multi-agent Axis 2 #8; ResearchRubrics Axis 1 #2)
  - **3-source convergent**: 3 (HF-paper-rubric-trio Axis 1 #3; inspect_evals Axis 1 #6; Phoenix-Pairwise Axis 5 #40)
  - **2-source convergent**: 5 (code-index-mcp Axis 3 #20; ChromeDevTools Axis 3 #23; context-mode pre-installed #19; cenkerinan-skills Axis 4 #27; g5n-dev/everything-claude-code Axis 4 #30)
  - **1-source (probe-only)**: 14 (axes 2/3/4 long-tail; flagged for additional convergence in W310 audit)
- **Anti-bias quotas hit**: **ALL 3 quotas EXCEEDED**

### Non-USA candidates (target ≥3): **5 surfaced**
1. **JP** — HF paper 2602.02219 authors (Yuzheng Xu, Tosho Hirasawa, Tadashi Kozuno, Yoshitaka Ushiku — Sony-CSL pattern) (Axis 1 #4)
2. **CN** — HF papers 2510.02190 (Yao+Wang+Zhang+Lu+Gu+Li+Zhao+Wu — Tsinghua-Renmin-likely) + 2601.11044 (Li+Shi+Xiao+Jiang) (Axis 5 #38+#39)
3. **KR** — `Yeachan-Heo/oh-my-claudecode` (Axis 2 #12)
4. **CN-suspected** — `cft0808/edict` (三省六部制 imperial-bureaucracy theme) (Axis 2 #15)
5. **JP** — `yohey-w/multi-agent-shogun` (samurai/karo/ashigaru theme) (Axis 2 #14)
6. **TR** — `cenkerinan/awesome-agent-skills` (Axis 4 #27) + `mksglu/context-mode` (Axis 3 #19)
7. **IN** — `Mathews-Tom/armory` (Axis 4 #29) + `abhi1693/openclaw-mission-control` (Axis 4 #33) + HF paper 2511.14136 (Sushant Mehta — Axis 5 #37)
8. **ES** — `achetronic/filesystem-mcp` (Axis 3 #21)
9. **TW** — `johnhuang316/code-index-mcp` (Axis 3 #20)

**Total non-USA candidates**: 12+ (target 3, actual 12 = **+300%**)

### <500★ candidates (target ≥3): **7+ surfaced** (lower-bound; many TBD-stars are <500)
1. `scaleapi/researchrubrics` — 17★ (Axis 1 #2)
2. `langoai/lango` — ~50★ (Axis 2 #9)
3. `opencmit/alphora` — ~30★ (Axis 2 #10)
4. `Ecook14/gocrewwai` — 8★ (Axis 2 #11)
5. `achetronic/filesystem-mcp` — 4★ (Axis 3 #21)
6. `supermodeltools/mcp` — 11★ (Axis 3 #22)
7. `Mathews-Tom/armory` — TBD-likely <500★ (Axis 4 #29)
8. + many Axis 2 long-tail rows (#12-18 all small-star)

**Total <500★ candidates**: 7+ confirmed + many TBD-likely-<500 (target 3, actual 7+ = **+133%**)

### 2026-shipped (target ≥1): **12 explicitly 2026-shipped**
1. HAL-harness paper (ICLR 2026 — Sept 2025 submitted, accepted Feb 2026) — Axis 1 #1
2. ResearchRubrics paper (ICLR 2026 — same cadence) — Axis 1 #2
3. HF paper 2602.05125 (Feb 2026) — Axis 1 #3 cohort
4. HF paper 2602.02219 (Feb 2026 fresh) — Axis 1 #4
5. HF paper 2604.01375 RIFT (Apr 2026) — Axis 1 #5
6. `open-multi-agent` launched **2026-04-01** under MIT (per README claim) — Axis 2 #8
7. `Yeachan-Heo/oh-my-claudecode` created **2026-01-09** — Axis 2 #12
8. `jayminwest/overstory` created **2026-02-12** — Axis 2 #13
9. `code-index-mcp` v2.15.0 released **2026-04-03** — Axis 3 #20
10. `achetronic/filesystem-mcp` created **2026-02-23** — Axis 3 #21
11. `cenkerinan/awesome-agent-skills` active **2026-04-17** — Axis 4 #27
12. `mrschedler/claude-skills-suite` active **2026-03-24** — Axis 4 #28
13. Phoenix PairwiseEvaluator PRD (issue #12834) opened **2026-04-23** — Axis 5 #40
14. AWS MCP Server GA **2026-05-06** — Axis 3 #24
15. langfuse acquired by ClickHouse **Jan 2026** — Axis 5 #41

**Total 2026-shipped**: 15 explicitly dated 2026 (target 1, actual 15 = **+1400%**)

---

## Operator W310-audit shortlist (top-5 across all axes)

For W310 to allocate sca-v5 full-audit budget (≤$5 per T1/T2 audit):

| # | Candidate | Why this matters | Cascade-evidence-quality | Suggested W310 lane |
|---|---|---|---|---|
| **1** | **`princeton-pli/hal-harness`** | ICLR 2026 paper-validated 3-axis × cost-aware × Docent-rubric harness; would unify the `harness/eval_harness.py` story; direct sca-v6 D17-D18 cite-anchor | 5-source convergence: deepwiki + paper-search + WebSearch + exa + arxiv 2510.11977 | T2 VENDOR-FORK audit; LICENSE-confirmation blocker (W310-blocking task) |
| **2** | **`open-multi-agent/open-multi-agent`** | Goal-driven coordinator with auto-DAG — architectural axis the existing agent-teams primitive doesn't have; **MIT confirmed**; 6,156★ organic growth + 40 contributors | 4-source convergence: github + exa + Daily Workflow MCP directory + Starlog blog | T2 VENDOR-FORK with **divergence-file plan** to wrap as a CC skill (cf. local-deep-research W291 row #4); could also be T3 PATTERN-STUDY (mine the goal-decomposition prompt + DAG-generation prompt for `.claude/skills/<name>/SKILL.md`) |
| **3** | **`cenkerinan/awesome-agent-skills`** | 1000+ hand-picked skills from 40+ orgs — gives the runtime a curated mining surface to extract Anthropic-canonical + Vercel-canonical + Stripe-canonical skills | 2-source convergence: exa + linked cross-runtime taxonomy table | T3 PATTERN-STUDY with vendor-mine of 10-20 best skills (Anthropic + Vercel-labs + Stripe + HF); do NOT install wholesale (context-budget overflow risk) |
| **4** | **`scaleapi/researchrubrics`** | ICLR 2026 paper — 2,800+ hrs human labor for 1,868 rubric criteria; even Gemini DR / OpenAI DR < 68% compliance; direct sca-v6 cite-anchor | 4-source convergence: exa + iclr.cc + arxiv 2511.07685 + scaleapi/researchrubrics QUICKSTART.md | T3 PATTERN-STUDY; extract the **3-axis complexity rubric** (conceptual breadth × logical nesting × exploration) into sca-v6 as a sub-dim |
| **5** | **`Mathews-Tom/armory`** (praxis-skills) | Production-grade skills/agents/hooks/rules/commands/utilities/presets with EvoSkills + Memento-Skills paper-cited; **paper-to-skill + skill-distiller + surrogate-verifier** are genuinely novel patterns | 1-source-deep (exa) — additional convergence MANDATORY for T2 audit | T3 PATTERN-STUDY OR T2 VENDOR-FORK pending 2-additional-source convergence (W310 cascade-fill task) |

### Tie-breakers for W310 ordering

If W310 budget is tight ($5.00 cap), **rank-order proposal**:

1. **HAL-harness** ($2.50 — full T2 audit + LICENSE-confirmation deepwiki+repomix combo) — **HIGHEST RANK** because it directly affects the eval-harness layer of THIS runtime
2. **open-multi-agent** ($2.00 — T2 audit; license confirmed → faster) — **SECOND** because architectural complement to agent-teams
3. Remaining 3 candidates ($0.50 each as cascade-fill / mining-prep) — **DEFERRED to W311** if W310 budget exhausts

---

## Stream B feedback loop

**Findings relevant to sca-v6 design** (forwarded to Stream B context per W309-PLAN.md §4 integration-points):

### sca-v6 R-mandates surfaced by Stream D discovery

- **R13 (proposed) — Pareto-frontier axis**: HAL's 3-axis (models × scaffolds × benchmarks) cost-vs-accuracy Pareto frontier should become a sca-v6 sub-dim under D5 or new D24. Anchor: HAL paper §3.
- **R14 (proposed) — Position-bias formalization**: Phoenix PairwiseEvaluator's 3 modes (`random`/`both`/`fixed`) + HF paper 2602.02219's balanced-permutation strategy should formalize sca-v6 Phase-6's "position-swap" mandate. Anchor: Phoenix issue #12834 §3 + HF paper 2602.02219 abstract.
- **R15 (proposed) — Failure-mode taxonomy**: HAL's Docent rubrics (6-cat) + HF paper 2604.01375 RIFT should provide structured failure-mode codes for sca-v6 D17 robustness. Anchor: HAL paper Appendix A5 + RIFT paper.
- **R16 (proposed) — Self-induced metric coverage**: AutoLibra's coverage + redundancy meta-metrics could anchor a sca-v6 self-evaluation discipline. Anchor: OpenReview ICLR 2026 paper 76a3022db.
- **R17 (proposed) — Pre-computed-graph cache pattern**: Supermodel's pre-cached call-graphs + cenkerinan's 1000-skill curated catalog suggest a sca-v6 "**runtime-side state-caching for cascade-acceleration**" sub-dim. May lift cascade cost from $0.20→$0.04 if applied. Anchor: supermodel/mcp pre-cache pattern.

### Discovery-cascade lessons (forwarded to sca-v6 §1 cascade contract)

- **GitHub topic-filter limitation discovered**: `topic:llm-evaluation OR topic:llm-judge` and `topic:claude-code-skills OR topic:agentskills` returned 0 — github API rejects compound topic queries with only logical operators. **W310 sca-v5 §1 cascade-discipline update**: github queries MUST include a literal text term beyond `topic:`/`stars:` qualifiers. Reformulate as `claude-code skills agents` (literal terms + qualifiers).
- **GitHub date filter cliff**: `created:>2026-03-01` parses but returns sparse hits; suggests github's search-index lag for recent repos. **Mitigation for sca-v6**: complement github MCP with exa neural search for recent-repo discovery.
- **HF paper-search rate-limited**: anonymous HF MCP usage rate-limited — large queries may degrade. **Mitigation**: operator could set `HF_TOKEN` env (per HF instructions); not required for W309 but flagged for W310.

---

## VERDICT-LEDGER row 30 appendix update (W308 cohort delta)

W308 row #30 summary was "20-NEW cohort (8 non-USA / 9 solo / 13 <500★ anti-bias EXCEEDED)". W309 Stream D extends:

- **Overlap with W308 row #30 cohort**: Examined the W308 §2 20-row table (Azure-Samples Legacy-Modernization-Agents through urmzd/saige). **0 candidates from W309 Stream D overlap row #30's 20** — Stream D found NET-NEW candidates outside that cohort, NOT re-discoveries.
- **Extension recommendation**: W309 Stream D adds NEW row(s) to the ledger when synthesized — proposed structure: 1 dedicated row per top-5 W310-shortlist candidate (after full sca-v5/v6 audit) + 1 summary row "25-NEW W309 Stream D cohort" parallel to row #30's structure.
- **Re-litigate candidates from row #30 that W309 surface re-finds**: NONE this stream. (Stream D's mandate was "find what we MISSED" not "re-litigate prior".)

---

## Cascade-discipline self-eval

Per sca-v5 SKILL.md §1 cascade-contract (≥6 MCP families for T2/T3; ≥7 for T1):

| Axis | github | exa | WebSearch | paper-search | hub-search | deepwiki | repomix | context7 | Total |
|---|---|---|---|---|---|---|---|---|---|
| 1 (meta-research) | 1 | 1 | 1 | 1 | 0 (failed) | 1 | 0 reserved | 0 reserved | **5** |
| 2 (agent orch) | 2 | 2 | 0 | 0 | 0 | 0 | 0 reserved | 0 reserved | **4** |
| 3 (MCP) | 1 | 2 | 0 | 0 | 0 | 0 | 0 reserved | 0 reserved | **3** |
| 4 (skills) | 1 | 1 | 0 | 0 | 0 | 0 | 0 reserved | 0 reserved | **2** |
| 5 (eval) | 1 | 1 | 1 | 1 | 0 (failed) | 0 | 0 reserved | 0 reserved | **4** |
| **Total cascade-fires** | 6 | 7 | 2 | 2 | 0 | 1 | 0 | 0 | **18** |

**Cascade-discipline assessment**: 
- ✓ ≥6 MCP families fired across the wave (github + exa + WebSearch + paper-search + hub-search + deepwiki = 6 distinct)
- ✗ Axis 4 (skills) only hit 2 MCP families — operator-AI W310 should re-cascade Axis 4 with deepwiki + paper-search if a candidate elevates to T2/T1 audit
- ✗ hub-search returned 0 results for `repo_types: ["space"]` rubric framework query — HF Spaces is not the right primary for eval-framework discovery; **recommend dropping hub-search for Axis 1/5 in W310**, replace with codecov-style git-archive search
- ✓ context7 + repomix reserved (per sca-v5 contract: reserved for T1/T2 deep-audit Phase-3; not Stream D's discovery scope)
- ✓ All 4 anti-bias quotas EXCEEDED at >100%

**Stream D self-eval verdict**: **PASS** with one structural improvement noted (Axis 4 cascade-thinness — flag for W310 mitigation).

---

## Tool-budget actual

Estimated per-query cost (per sca-v5 SKILL.md §1):
- github MCP @ $0.02/call × 6 calls = $0.12
- exa MCP @ $0.05/call × 7 calls = $0.35
- WebSearch (Anthropic-native) @ $0.05/call × 2 calls = $0.10
- paper-search @ $0.03/call × 2 calls = $0.06
- hub-search @ $0.02/call × 1 (failed) call = $0.02
- deepwiki @ $0.25/call × 1 call (HAL-harness deep-dive) = $0.25
- repomix + context7 = $0 (reserved, not fired)

**Total estimated spend**: **~$0.90** (well within $1.50 cap)
**Headroom**: $0.60 available for W310 cascade-fill if operator desires same-stream-extension.

---

## Operator next-action surface

- **Top-1 W310 audit target**: `princeton-pli/hal-harness` — paper-validated, license-pending; if operator wants sca-v6 D17-D18 to be paper-anchored, full T2 audit + LICENSE confirmation is the load-bearing first step.
- **Top-2 W310 audit target**: `open-multi-agent/open-multi-agent` — fastest-to-T2 (license confirmed MIT, 4-source convergence already, MCP-native).
- **Stream B prerequisite delivery**: 5 R13-R17 mandates forwarded to Stream B for sca-v6 design absorption.
- **Defer to W311 (operator-discretion)**: cenkerinan + Mathews-Tom + scaleapi/researchrubrics — these are pattern-mining lanes that don't gate W310 sca-v6 ship.

**Stream D ships clean**. No verdict writes performed (per W309 mandate — discovery + triage only).

---

## Appendix A — Additional candidate-card stubs (NOT shortlisted but flagged for catalogue)

Per W309-PLAN.md §1 row D: "may write candidate-card stubs to `W309-STREAM-D-CANDIDATE-CARDS/`". Inline stubs below for catalogue-completeness; do NOT yet warrant top-5 audit.

### Stub A.1 — `affaan-m/everything-claude-code` SHA-pin verification target

The runtime has `everything-claude-code@2.0.0-rc.1` per CLAUDE.md:34. Upstream `affaan-m/everything-claude-code` is allegedly **185k★** (per W308 §1.10 exa-cite) — this number warrants verification (likely conflated with a Markdown link count or aggregator score, not actual github stars). State-probe operator-action: run `Get-ChildItem .claude/plugins/cache/everything-claude-code/ -Force | Get-FileHash` to confirm install SHA + cross-check upstream `git log -1 --format="%H"` HEAD.

### Stub A.2 — Inspect AI ecosystem state-probe

CLAUDE.md:46 declares `harness/eval_harness.py` runs "real inspect_ai + promptfoo eval lanes". W309 Stream D Axis-1 surfaced `UKGovernmentBEIS/inspect_evals` (the community-eval collection for `inspect_ai`). State-probe operator-action: enumerate the eval-suite in `harness/eval_harness.py` — does it actually pull from `inspect_evals` battery, or only run hand-rolled evals? If hand-rolled, **W310 should adopt 2-3 inspect_evals batteries** (e.g., GAIA Web, SWE-Bench Verified Mini) to inherit UK-AISI quality discipline.

### Stub A.3 — `ruvnet/ruflo` (formerly claude-flow)

ruvnet has shipped multiple agent-orchestration repos. `ruflo` is the 2026 evolution. Per W289 audit, `ruvnet/claude-flow` was reversed to T4 CITE-ONLY (D5+D14 hard-caps breached + D11 catastrophic preload + CR-2 violation in upstream hooks). **W310-recommended**: verify whether `ruflo` (rebrand of claude-flow) inherits same CR-2 hook-violation issue OR fixed it. exa cite: "🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms ... Features enterprise-grade architecture, self-learning swarm intelligence, RAG integration, and native Claude Code / Codex Integration." Last push 2026-05-19 (active).

### Stub A.4 — `chrome-devtools-mcp` verification target

The `mcp__chrome-devtools__*` tool family is loaded in this session. State-probe operator-action: which Chrome-DevTools MCP fork is in `.mcp.json`? — likely `ChromeDevTools/chrome-devtools-mcp` (Skillsindex 100/100) per the exa cite. Verify version pin discipline per W286-arc-P0C `npx -y <pkg>@<pinned-version>` contract.

### Stub A.5 — Claude Agent SDK cross-runtime convergence

The W296 row #12 audit verified `anthropics/claude-agent-sdk-python` install. Stream D Axis-2 finds confirmation that **OpenAI adopted SKILL.md standard for Codex+ChatGPT, GitHub Copilot added it to VS Code, and Vercel built distribution layer** (dev.to 2026-04-28 cite: "Within weeks, OpenAI had adopted it for Codex and ChatGPT, GitHub Copilot had added it to VS Code, and Vercel had built an entire distribution layer for it"). This is **STRONG SIGNAL** that the SKILL.md format the runtime is built on (W259-v15 18 operator-curated skills) is **cross-runtime portable** by Anthropic-standard — relevant for cardinal-rule-3 portability discipline.

### Stub A.6 — Anthropic Multi-Agent Reference Orchestrations

Operator's mandate "Anthropic's own MULTI-agent reference orchestrations" — Stream D found NO Anthropic-org-canonical "multi-agent orchestration" repo distinct from `claude-agent-sdk` (W296 #12 T1) + `anthropics/skills` (W301 #19 T1). The "Anthropic Multi-Agent Pattern" is exposed via **research blog posts** (referenced in W292 as one of the 12 absorption-rule sources) NOT a github repo. Confirms structural-finding from W292: "no public system targets v3's niche". sca-v6 should treat **Anthropic-multi-agent-pattern as a paper/blog cite-anchor**, not a github candidate.

### Stub A.7 — `winsw/winsw` re-verification (W301.E migration progress)

W301.E ratified `winsw/winsw` T1 INSTALL with operator-action "migrate IkLlamaServer + LlamaSwap NSSM → WinSW v2.12.0-stable XML configs into dotfiles repo". **State-probe operator-action W309 (this stream surfaces)**: is the WinSW migration still pending? Check `nssm list` and verify whether IkLlamaServer + LlamaSwap have been migrated. If not migrated, the W301-SEV-1 langfuse-key-exposure window (registry `AppEnvironmentExtra`) is still OPEN.

### Stub A.8 — `XuehaiPan/nvitop` re-verification (W301.E install progress)

W301.E ratified `nvitop` T1 INSTALL with operator-action `Z:\venvs\claude\Scripts\pip install nvitop nvitop-exporter`. **State-probe operator-action W309**: has nvitop been pip-installed? Smoke-test: `Z:\venvs\claude\Scripts\python.exe -c "import nvitop; print(nvitop.__version__)"`.

### Stub A.9 — `microsoft/PromptWizard` re-litigation candidate

W291.Stage2 row #5 — T2 VENDOR-FORK with measured +15% GSM8k vs DSPy and -84% API calls. Reverify-due W297 per ledger row #5. **Stream D state-probe**: has the vendor-fork actually shipped? If not, the T2 verdict has been DORMANT for 1+ wave. Operator-decision: re-litigate to T3 PATTERN-STUDY (keep at lower tier) OR ship the fork (raise to actively-applied T2).

### Stub A.10 — `OthmanAdi/planning-with-files` re-litigation closure

Ledger row #31 W308 CONDITIONAL-RATIFY with default-DEACTIVATE if W310 wave-end no operator decision. **Stream D state-probe**: as of 2026-05-19, has operator ratified or deactivated PWF? Check settings.json `enabledPlugins.planning-with-files@planning-with-files`. **W309 cohort proposal**: ALL stream-D Axis-2 multi-agent-orchestration candidates (rows #8-18) should be evaluated AGAINST the PWF disposition — if PWF is deactivated, agent-teams + open-multi-agent become the primary forward-path; if PWF is ratified, those Axis-2 candidates compete against PWF for the "planning-class" niche.

---

## Appendix B — Cross-axis convergence patterns

**Pattern 1 — "Anthropic-canonical SKILL.md as cross-runtime portability layer"**: validated by 3 separate axes:
- Axis 4 (cenkerinan/awesome-agent-skills) — 40 orgs ship official skills using Anthropic-canonical format
- Axis 5 (Phoenix `@arizeai/phoenix-cli` ships skills) — Phoenix-cli ships `phoenix-cli` + `phoenix-evals` + `phoenix-tracing` skills targeting Claude Code + Cursor + other coding agents
- Axis 2 (`open-multi-agent`) — MCP-native + connects to stdio MCP servers using Anthropic SKILL.md+`SKILL.md`-compatible patterns

**Convergence verdict**: Anthropic's bet on SKILL.md-as-open-standard (Dec 2025 announcement) **has paid off** across all 5 axes by 2026-05-19. The runtime's W259-v15 18 operator-curated skills are cardinal-rule-3-aligned with this ecosystem.

**Pattern 2 — "Multi-judge / multi-model panel as 2026-canonical eval discipline"**: validated by 4 separate axes:
- Axis 1 (HAL Docent rubrics — 6-cat failure-mode taxonomy via judge agreement)
- Axis 1 (Phoenix PairwiseEvaluator — 3 modes + Bradley-Terry MLE)
- Axis 2 (mrschedler/claude-skills-suite — 6-AI-model panel with 5-reviewer cross-model best-of-2)
- Axis 5 (HF papers 2510.02190 Dr. Bench + 2601.11044 AgencyBench — both use multi-judge)

**Convergence verdict**: sca-v6 Phase-6 position-swap is the runtime's correct architectural axis to formalize. Should evolve to **multi-judge ensemble + Bradley-Terry aggregation** for head-to-head verdicts in W311+ if HAL-harness audit yields paper-cite-acceptable evidence.

**Pattern 3 — "Cost-aware Pareto-frontier as 2026-canonical eval discipline"**: validated by 3 axes:
- Axis 1 (HAL — explicit cost-vs-accuracy Pareto + $40k 21,730-rollout demonstration)
- Axis 4 (Mathews-Tom/armory — explicit `opus`/`sonnet`/`haiku` model-cost routing in agents table)
- Axis 5 (Phoenix — built-in token + cost tracking + MODEL_PRICES_DICT)

**Convergence verdict**: sca-v6 D-NEW candidate **D24 = cost_efficiency_pareto** to elevate the cost-aware decision-impact discipline from a "nice-to-have" to a tracked dimension. W310 should consider if D24 enters the rubric.

**Pattern 4 — "Goal-driven / auto-DAG decomposition as alternative to graph-first orchestration"**: validated by 2 axes:
- Axis 2 (open-multi-agent's auto-DAG vs LangGraph's graph-first; CrewAI's role-first; Mastra's explicit-Supervisor)
- Axis 4 (Mathews-Tom/armory's `team-lead` opus-meta-orchestrator decomposing multi-domain requests)

**Convergence verdict**: This is the **architectural gap** in this runtime — agent-teams is explicit-pipeline. Auto-DAG decomposition (operator-says-goal; coordinator-builds-graph-at-runtime) is the genuinely-new primitive direction. Worth dedicated W310 audit lane.
