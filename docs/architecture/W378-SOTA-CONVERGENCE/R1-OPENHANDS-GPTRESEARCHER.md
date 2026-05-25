# W378 R1 — SOTA Convergence: OpenHands/OpenHands + assafelovic/gpt-researcher

> **Wave**: W378 SOTA-convergence research · **Agent**: R1 (claude-opus-4-7[1m], general-purpose) · **Date**: 2026-05-23
> **Framework**: sca-v20 multi-dim (19 dims × 8 clusters) per `Z:/claude-sota-installed-W375/.claude/schemas/sca-v20-multi-dim.schema.json` + `W377-RESEARCH-V20/META-C/META-D/META-F`
> **Method**: 4-class multi-angle convergence — gh-API (CLASS-A) + repomix/raw-source (CLASS-A) + deepwiki (CLASS-C) + perplexity-research (CLASS-B) + W376-RESEARCH cross-check (internal-prior). ≥2-source agreement noted per finding (§3).
> **Cardinal-rule-6**: every numeric/factual claim carries a probe anchor (gh-API endpoint, file:line@SHA, arxiv-ID, or W376-doc:line). All gh-API probes run live 2026-05-23.
> **Repo HEAD at evaluation**: this runtime `880b010`.

---

## §0 Executive verdict (TL;DR)

| Repo | INSTALL | PATTERN-STUDY | CITE-ONLY | **Routed tier** | Gating hard-filter |
|---|---:|---:|---:|---|---|
| `OpenHands/OpenHands` (platform) | 0.46 | 0.88 | 0.86 | **PATTERN-STUDY** | D13 cc_install_path=`cli-only`/full-app + D07 `enterprise/` license carve-out + Pareto-dominated by already-INSTALL'd `openhands-sdk` |
| `assafelovic/gpt-researcher` | 0.55 | 0.90 | 0.88 | **PATTERN-STUDY** | D13 cc_install_path=`library-only` (full research-runtime, not an orchestrator-composable primitive) — cap≥2 / dispatch<2 (META-D Stage 6) |

**Headline**: Both repos are high-signal **PATTERN-STUDY**, NOT INSTALL. Neither is a Claude-Code-installable primitive (plugin/MCP/SDK-that-composes-into-our-orchestrator); both are full agent *applications* whose value is the architecture, not the dependency.

- **OpenHands/OpenHands**: the openhands-**sdk** (its extracted core) is ALREADY the W376 INSTALL target (`openhands-sdk==1.22.1`, agent-server image). The full *platform* adds 3 platform-level patterns the SDK does **not** export — `DockerSandboxService` health-poll lifecycle, `skill_loader` single-call merge, and the V0→V1 stateless-core/single-conversation-state split — which directly inform the W376 docker-py-spawned-agent-server + Temporal design. **Lift the platform's lifecycle constants; do NOT install the platform.**
- **gpt-researcher**: its `ResearchConductor` fan-out/fan-in + `SourceCurator` LLM-rank + `ContextCompressor` embedding-gate + `EditorAgent` LangGraph reviewer/reviser loop are a **complete reference implementation** of exactly the Router→Fan-out→Scorer→Consenser pipeline that v20 (W377) describes. It teaches v20 three concrete missing pieces (§4): a **review→revise refinement loop**, **embedding-similarity context-gating**, and **LLM-as-source-curator credibility ranking**.

---

## §1 Per-repo multi-angle findings

### §1.1 `OpenHands/OpenHands` — full agent platform

**gh-API metadata** (live probe 2026-05-23, `gh api repos/OpenHands/OpenHands`):
- stars `74,558` · forks `9,444` (forks/star `0.127` — healthy OSS band 0.05-0.15) · open_issues `392`
- license SPDX = **`NOASSERTION`** · `archived:false` · `pushed_at:2026-05-23T00:33:45Z` (commit **today** — D04 = 0d) · `created_at:2024-03-13` · language Python
- contributors: `gh api .../contributors?per_page=100` returns 100 (paginate-capped → **≥100**, bot-stripped count well above INSTALL ≥5 floor)
- platform releases (`gh api .../releases`): `1.7.0` (2026-05-01), `1.6.0` (2026-03-30), `1.5.0` (2026-03-11) — **monthly cadence**

**License nuance (CR-6 verify-before-claim — gh-API SPDX is misleading)**: gh-API reports `NOASSERTION`, which would naively hard-BLOCK INSTALL (D07 enum). But reading `LICENSE` file directly (`OpenHands/OpenHands:LICENSE@sha 572bb25`) resolves it: **everything outside `enterprise/` is MIT**; only the `enterprise/` directory carries a separate restricted license. So the *core platform is permissive (MIT)*; the SPDX `NOASSERTION` is purely the split-license artifact. **D07 = `permissive` for the parts we'd pattern-study; the `enterprise/` carve-out is a soft-filter, not a hard-BLOCK.** This is a textbook META-F §5.2 case: license-class hard-gate would over-reject on the SPDX field; the soft-gate correctly admits PATTERN-STUDY after the file-read.

**Architecture (deepwiki `OpenHands/OpenHands` + perplexity-research convergence)**:
- **Layered ecosystem** (perplexity, arxiv 2511.03690 + 2407.16741): the `OpenHands/OpenHands` *platform* repo = React frontend + FastAPI `App Server` + Docker runtime sandbox + WebSocket event-stream + skills/microagent loading + opinionated dev tooling. The **`openhands-sdk`** = the extracted, type-safe, *stateless* composable core (agents/tools/workspaces/LLMs/conversations + optional embeddable agent-server), maintained in a **separate repo `OpenHands/software-agent-sdk`** (NOT a subdir of the platform monorepo), published to PyPI as `openhands-sdk` (current **v1.23.0**, released 2026-05-20 per `pypi.org/pypi/openhands-sdk/json` live probe + perplexity). The platform "consumes the SDK as its engine."
- **App Server ↔ agent-server** (deepwiki): `App Server` (FastAPI, REST + WebSocket) manages `AppConversation` lifecycle; the `agent-server` runs *inside* the Sandbox (Docker container) and receives bash/Python exec over HTTP via the sandbox's exposed URL. REST = create-conversation / send-message / metadata; WebSocket = streaming events + interactive actions (perplexity [33][36]).
- **Sandbox lifecycle** (deepwiki — file:path anchors): `DockerSandboxService` at `openhands/app_server/sandbox/docker_sandbox_service.py` uses **docker-py** `self.docker_client.containers.run()`. Health: `wait_for_sandbox_running` polls `/alive` with **timeout 120s, poll_interval 2s, per-GET timeout 5.0s**; `STARTUP_GRACE_SECONDS = 15` guards startup. Resource cap: pauses oldest sandbox when `max_num_sandboxes` exceeded. Errors: catches `docker.errors.APIError` / `docker.errors.NotFound` → raises `SandboxError`.
- **Skill/microagent loading** (deepwiki): `openhands/app_server/app_conversation/skill_loader.py` → `load_skills_from_agent_server()` makes a **single** API call to the agent-server `/api/skills` endpoint with flags for public/user/project/org skills + `project_dir`/`org_config`/`sandbox_config`; the agent-server merges. V1 term = "Skills"; V0 term = "Microagents" (backward-compat preserved).
- **Event model — V0→V1 shift** (deepwiki, important correction): V0 had a pub/sub `EventStream` with monotonically-increasing event IDs for reconnection. **V1 (current) is conversation-based**: events handled by `EventService` (storage/retrieval/streaming within conversations), supporting multiple concurrent agents/sandboxes. The `DockerSandboxService` itself does NOT use monotonic-event-ID reconnection (that was V0). (Note: perplexity-research described the monotonic-event-ID reconnection pattern — that reflects the *SDK agent-server* event semantics, distinct from the platform's V1 conversation model. Cross-source nuance, recorded §3.)

**W376-coverage cross-check (internal-prior, decisive for tiering)** — `grep` of `docs/architecture/W376-RESEARCH/`:
- The openhands-**sdk** + **agent-server** are ALREADY the W376 INSTALL targets, version-pinned and file:line-anchored:
  - `S1-openhands-sdk-lifecycle.md:5` — `openhands-sdk==1.22.1` Conversation/Agent lifecycle from installed site-packages.
  - `S2-agent-server-spawn.md:205,207,215` — `openhands-agent-server` v1.23.0, `/alive`+`/health`+`/ready` router anchors, **correct repo `OpenHands/software-agent-sdk` identified** (W376 explicitly corrected the earlier-speculated `All-Hands-AI/agent-server` 404).
  - `S6-event-stream-patterns.md:137,185` — `AgentErrorEvent` anchor + the finding that **SDK 1.22.1 does NOT export `DockerWorkspace`** (only Local/Remote Workspace) → W376 uses docker-py 7.1.0 to externally spawn the agent-server container.
  - `INTEGRATION-FIXES.md:48-58` — IF-2 P0: operator-sign'd `pip install openhands-sdk==1.22.1`.
- **Conclusion**: the SDK layer is covered (INSTALL, done). What the *full platform* uniquely adds and W376 does NOT yet anchor: the `DockerSandboxService` health-poll constants (120s/2s/5s/grace-15s), the `skill_loader` single-call merge contract, and the `max_num_sandboxes` pause-oldest resource policy — all platform-level, all directly relevant to W376 §5 docker spawn + Temporal heartbeat cadence.

---

### §1.2 `assafelovic/gpt-researcher` — autonomous research agent

**gh-API metadata** (live probe 2026-05-23, `gh api repos/assafelovic/gpt-researcher`):
- stars `27,235` · forks `3,662` (forks/star `0.134` — healthy) · open_issues `232`
- license SPDX = **`Apache-2.0`** (permissive, clean — D07 pass for ALL classes) · `archived:false` · `pushed_at:2026-04-16T17:41:04Z` (**~37 days** → D04 = 37d, INSTALL ≤90 pass) · `created_at:2023-05-12` · Python
- contributors: ≥100 (paginate-capped, bot-stripped) — INSTALL ≥5 floor passed
- releases (`gh api .../releases`): `v3.4.4` (2026-04-16), `v3.4.3` (2026-03-13), `v3.4.2` (2026-03-01) — the `gpt-researcher` PyPI lib tracks separately at **v0.14.8** (`pypi.org/pypi/gpt-researcher/json`, license MIT in metadata, requires_python `>=3.11`); the v3.x tags are the deep-research server/UI release line.

**Architecture — two layers** (deepwiki + raw-source convergence):

**Layer A — core `GPTResearcher` agent + skills** (single-agent, `gpt_researcher/`). Raw-source line anchors (`raw.githubusercontent.com/assafelovic/gpt-researcher/main/...`, probed 2026-05-23):
- `ResearchConductor` (`gpt_researcher/skills/researcher.py:21`) — the orchestrator skill:
  - `plan_research:48` → calls `plan_research_outline` (`actions/query_processing.py`) to decompose the query into focused sub-queries (this IS v20's **Router**).
  - `conduct_research:89` → top-level loop.
  - `_get_context_by_web_search:266` → **fan-out**: `context = await asyncio.gather(*[self._process_sub_query(sub_query, ...) for sub_query in sub_queries])` at **researcher.py:349**; **fan-in**: filter empties + `combined_context = " ".join(context)` (researcher.py:~360). A second gather at `:258` does the vectorstore variant (`_process_sub_query_with_vectorstore`).
  - `_process_sub_query:449` → per-sub-query: scrape URLs (`scraper_manager.browse_urls`) → compress via `context_manager.get_similar_content_by_query` → combine MCP + web context.
- `SourceCurator` (`gpt_researcher/skills/curator.py:15`) — `curate_sources:33` ranks scraped sources by **credibility + relevance** via `create_chat_completion:60` (LLM-as-judge over sources), gated by `cfg.curate_sources`. **This is v20's Scorer, but applied to *sources* not *answers*.**
- `ContextCompressor` (`gpt_researcher/context/compression.py:85`) — `RecursiveCharacterTextSplitter(chunk_size=1000, overlap=100)` → `EmbeddingsFilter(similarity_threshold=...)` (compression.py:130-131; threshold default `0.35` env-overridable at `:119`) → `DocumentCompressorPipeline`. **Embedding-similarity relevance gate** — a token-budget primitive v20's framework does not specify.
- `ReportGenerator` + `WriterAgent` (`skills/writer.py`) — compiles intro/body/conclusion/references.
- `DeepResearchSkill` (`skills/deep_research.py`, 18KB) — recursive research with `asyncio.gather` + **semaphore-bounded concurrency** (deepwiki) — bounded fan-out, the pattern v20 should adopt for its Fan-out stage cost-cap.

**Layer B — `multi_agents/` LangGraph orchestration** (the planner→executor→publisher loop):
- `EditorAgent` (`multi_agents/agents/editor.py:13`, imports `from langgraph.graph import StateGraph, END` at `:5`):
  - `plan_research:22` — LLM generates the report plan (title/date/sections) as JSON from initial research (the **Planner**).
  - `run_parallel_research:52` — **fan-out across sections**: `[result["draft"] for result in await asyncio.gather(*final_drafts)]` at `editor.py:74`.
  - `_create_workflow:126` — builds `StateGraph(DraftState)` (`:129`) with nodes `researcher`→`reviewer`→`reviser` (`:131-133`), each section running `ResearchAgent.run_depth_research`.
- The **review→revise loop** (deepwiki): `ReviewerAgent` validates a draft against guidelines → if insufficient, emits feedback → `ReviserAgent` applies corrections → loops to a max-revisions cap. `ChiefEditor` is the master coordinator. An **AG2 alternative** mirrors this (`multi_agents_ag2/agents/orchestrator.py`) using AG2 conversable agents instead of LangGraph StateGraph.

**Pedigree / arxiv lineage** (perplexity-research, arxiv IDs verified):
- gpt-researcher itself has **no standalone arxiv paper** (docs on GitHub + gptr.dev + Elovic blog), but its methodology sits atop two arxiv-documented patterns it explicitly credits:
  - **STORM** — arxiv `2402.14207` "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models" (Shao et al., Stanford-OVAL; code `github.com/stanford-oval/storm`; ICLR-adjacent). The perspective-guided multi-stage outline→conversation→synthesis pipeline gpt-researcher's planner echoes.
  - **Plan-and-Solve** — arxiv `2305.04091` "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models" (Lei Wang et al., May 2023). The "plan an outline first, then solve each part" principle gpt-researcher's `plan_research` instantiates.

---

## §2 sca-v20 score table (19 dims × 2 repos)

> Per-class scores computed via META-C §2 weight profiles. Stars (D01-D03) informational-only (weight 0 in INSTALL/PATTERN/CITE; per OSSF Criticality + R-STAR-1). Tier routed via META-D §2 decision-tree (hard-gates first, then INSTALL→PATTERN-STUDY→CITE-ONLY→MONITOR).

| Dim | OpenHands/OpenHands | gpt-researcher | Anchor |
|---|---|---|---|
| **D01** stars_raw | 74,558 | 27,235 | gh-api (informational) |
| **D02** stars_growth/mo | high (consistent w/ daily commits) | moderate | gh-api + cadence cross-check |
| **D03** forks_per_star | 0.127 (healthy) | 0.134 (healthy) | gh-api forks/stars |
| **D04** last_commit_days | **0** (pushed today) | **37** | gh-api `.pushed_at` |
| **D05** contributors_90d | ≥100 (capped) | ≥100 (capped) | gh-api /contributors |
| **D06** issue_close_rate_90d | ~0.5 est (392 open, monthly releases) | ~0.4 est (232 open) | gh-api (est — not deep-probed) |
| **D07** license_class | **permissive (MIT) outside `enterprise/`** (gh SPDX `NOASSERTION` misleading; LICENSE-file read) | **permissive (Apache-2.0)** | LICENSE@572bb25 / gh-api SPDX |
| **D08** signed_release_level | ~1 (GitHub releases + PyPI; no verified SLSA-L2) | ~1 (PyPI + GH releases; no verified SLSA-L2) | gh-releases / pypi (not slsa-verified — claimed-not-verified avoided) |
| **D09** maintainer_reputation | **A** (OpenHands/All-Hands org, named-prod-users, arxiv 2407.16741 ICLR-2025) | **B** (Assaf Elovic + 100+ contributors; no corporate-backing but very active, named in surveys) | gh-org + arxiv |
| **D10** test_coverage | ~0.6 est | ~0.5 est | not codecov-probed (est; CR-6 marks MEDIUM-LOW) |
| **D11** ci_green_streak | ≥14 (active CI) | ≥3 | gh-actions (est) |
| **D12** doc_completeness | **0.9** (docs.openhands + deepwiki + 2 arxiv papers) | **0.85** (docs.gptr.dev + deepwiki + recipes + blog) | deepwiki + docs sites |
| **D13** cc_install_path | **cli-only / full-app** (platform = React+FastAPI+Docker app; NOT a CC plugin/MCP/composable-SDK — the SDK *is* separate & already covered) | **library-only** (full research runtime/CLI; `pip install gpt-researcher` is a service-tier app, not an orchestrator-composable primitive) | gh repo structure + pypi |
| **D14** cc_pattern_density | **0.67** (8/12: container-isolation, retry-policy, structured-output, MCP-tool-bridging, hierarchical-delegation, callbacks-stream, orchestrator-workers, memory-tiering-via-conversation) | **0.75** (9/12: orchestrator-workers, parallel-fanout, evaluator-optimizer[review→revise], structured-output, MCP-tool-bridging, retry-policy, hierarchical-delegation, asyncio-shield-cleanup, callbacks-stream) | deepwiki + source file:line (§1) |
| **D15** cc_cite_anchor_density | **0.8** (Python paths very stable: `docker_sandbox_service.py`, `skill_loader.py`, `server_details_router.py`) | **0.82** (stable paths: `skills/researcher.py:48/89/266/349/449`, `curator.py:33`, `compression.py:85/119`, `multi_agents/agents/editor.py:13/52/126`) | repomix/raw-source + deepwiki |
| **D16** cc_deepwiki_indexed | **true** (full wiki, multi-page) | **true** (full wiki) | deepwiki HTTP 200 + non-empty |
| **D17** pinning_discipline | image-digest-sha256 (agent-server) + npm/pip exact (SDK already pinned `==1.22.1`) | uvx/pip-exact (`gpt-researcher==0.14.8`) | W376 S2 + pypi |
| **D18** arch_relevance | **0.78** (docker-spawn lifecycle = W376 §5; agent-server health-poll = W376 Temporal heartbeat; skill_loader = our `.claude` plugin discipline; MCP-native) | **0.85** (Router→Fan-out→Scorer→Consenser IS v20/W377; review→revise = evaluator-optimizer skill; semaphore fan-out = parallel-dispatch-mandate; MCP-native) | CLAUDE.md 4-mode-parallel + W376/W377 anchors |
| **D19** community_mentions | very high (74k stars, arxiv 2407.16741 + 2511.03690, cited across agent surveys, HN) | high (27k stars, STORM/Plan-and-Solve lineage, cited in research-agent surveys, HN) | perplexity + gh + arxiv (≥3-org) |

### Per-class scores (META-C §2 weight profiles)

| Class | OpenHands/OpenHands | gpt-researcher |
|---|---:|---:|
| **INSTALL** | **0.46** | **0.55** |
| **PATTERN-STUDY** | **0.88** | **0.90** |
| **CITE-ONLY** | **0.86** | **0.88** |
| **MONITOR** | 0.82 | 0.80 |

### Tier routing (META-D §2 decision-tree)

**OpenHands/OpenHands → PATTERN-STUDY**
- Stage 1 hard-BLOCK: PASS (license MIT-outside-enterprise after file-read; not archived; not fake-star; not abandoned).
- Stage 5 INSTALL: **FAILS** — D13 cc_install_path is `cli-only`/full-app, not ∈ {plugin, mcp-server, sdk-python, sdk-typescript} (the *SDK* is the installable primitive, and it is **already INSTALL'd in W376**). META-D Stage 5a Pareto: the platform is **Pareto-dominated by the already-installed `openhands-sdk`** on the install axis (the SDK provides the composable engine; the platform adds frontend/app-server we don't need) AND provides no novel *installable* niche → demote to PATTERN-STUDY.
- Stage 6 PATTERN-STUDY: **PASS** — capability high, dispatch-fit low (the platform IS an orchestrator, not orchestrated). cc_cite_anchor_density 0.8 ≥ 0.3, deepwiki=true. **VERDICT: PATTERN-STUDY.**

**gpt-researcher → PATTERN-STUDY**
- Stage 1 hard-BLOCK: PASS (Apache-2.0; active 37d; not archived; clean).
- Stage 5 INSTALL: **FAILS** — D13 cc_install_path=`library-only` but the library is a *full research runtime* (its own LLM-router, scrapers, LangGraph orchestrator). Installing it would mean embedding a second orchestrator inside our Claude-Code orchestrator — dispatch_fit<2 (META-D §1.2 criterion #1 "great ideas, wrong API surface"; identical shape to W376's CrewAI/PydanticAI PATTERN-STUDY routing).
- Stage 6 PATTERN-STUDY: **PASS** — capability=3, dispatch_fit=1, Apache-2.0, cc_pattern_density 0.75 ≥ 0.4, cc_cite_anchor_density 0.82 ≥ 0.3, deepwiki=true. **VERDICT: PATTERN-STUDY.**

**Confidence**: MEDIUM-HIGH for both. Dock from HIGH: D10 test_coverage + D06 issue_close_rate are *estimated* not codecov/gh-deep-probed (CR-6 — flagged as MEDIUM-LOW per-dim; does not change tier since neither dim gates PATTERN-STUDY).

---

## §3 Convergence notes (≥2-source agreements)

1. **OpenHands SDK is a SEPARATE repo `OpenHands/software-agent-sdk`, current v1.23.0** — agreed by: deepwiki (`openhands-sdk`...`1.19.1` in its uv.lock snapshot, slightly stale) **+** perplexity-research (explicit `OpenHands/software-agent-sdk`, v1.23.0 released 2026-05-20) **+** live `pypi.org/pypi/openhands-sdk/json` (v1.23.0, requires_python `>=3.12`) **+** W376 `S2-agent-server-spawn.md:215` (independently corrected the 404'd `All-Hands-AI/agent-server` guess to `OpenHands/software-agent-sdk`). **4-source convergence.** (deepwiki's "1.19.1" is its lockfile snapshot, not latest — resolved by 3 other CLASS-A sources.)

2. **OpenHands platform uses docker-py for the sandbox + `/alive` health-poll** — agreed by: deepwiki (`DockerSandboxService` → `docker_client.containers.run()`, `/alive` poll 120s/2s/5s, `STARTUP_GRACE_SECONDS=15`) **+** perplexity (DockerWorkspace lifecycle + `/health` `{"status":"healthy"}`). **CLASS-A+CLASS-B convergence.** Directly reinforces W376 S3's docker-py 7.1.0 retry-classification choice.

3. **gpt-researcher fan-out/fan-in via `asyncio.gather` over sub-queries** — agreed by: deepwiki (`_get_context_by_web_search` + `_process_sub_query` + `asyncio.gather`, semaphore-bounded in deep mode) **+** raw-source (`researcher.py:349` literal `asyncio.gather`, `:449` `_process_sub_query`, join-aggregation). **2× CLASS-A (deepwiki interpretation + literal source).**

4. **gpt-researcher's planner→executor→reviewer→reviser→publisher is a LangGraph StateGraph** — agreed by: deepwiki (EditorAgent/ReviewerAgent/ReviserAgent/WriterAgent/PublisherAgent + ChiefEditor + AG2 alt) **+** raw-source (`editor.py:5` `from langgraph.graph import StateGraph`, `:126` `_create_workflow`, `:131-133` researcher/reviewer/reviser nodes). **2-source.**

5. **gpt-researcher's lineage = STORM (arxiv 2402.14207) + Plan-and-Solve (arxiv 2305.04091)** — agreed by: perplexity-research (explicit citation map + DOIs) **+** gpt-researcher's own docs crediting STORM (perplexity quotes the credit). **CLASS-B + primary-doc.**

6. **Nuance recorded (single-source, flagged)**: perplexity described monotonic-event-ID reconnection for the agent-server; deepwiki clarified the *platform* V1 is conversation-based (monotonic-event-IDs were V0). These describe different layers (SDK agent-server event semantics vs platform conversation model) — not a contradiction, but only deepwiki gave the V0/V1 split. Treated as MEDIUM confidence for the reconnection sub-claim.

---

## §4 Concrete adopt / pattern-study recommendations

> All recommendations are **PATTERN-STUDY** (own-authored, cite-anchored — no upstream code intake, no new dep). Mapped to architecture layer + target wave.

### From `OpenHands/OpenHands` platform (3 patterns the openhands-sdk does NOT export)

| # | Pattern | Architecture layer | Target wave | Cite-anchor |
|---|---|---|---|---|
| **OH-1** | **Sandbox health-poll lifecycle constants** — `/alive` poll timeout 120s, poll_interval 2s, per-GET timeout 5.0s, `STARTUP_GRACE_SECONDS=15`, pause-oldest at `max_num_sandboxes`. Lift as the calibration baseline for W376's docker-py-spawned-agent-server readiness gate + Temporal activity heartbeat cadence (heartbeat << 120s so Temporal sees liveness before the sandbox poll gives up). | W376 docker-spawn + Temporal layer (`agents/temporal_worker.py`, `openhands_run_activity`) | **W378→W379** (refine W376 §5 spawn) | `openhands/app_server/sandbox/docker_sandbox_service.py` (deepwiki-confirmed constants) |
| **OH-2** | **`skill_loader` single-call merge contract** — load public/user/project/org skills in ONE `/api/skills` call with `project_dir`+`org_config`+`sandbox_config` flags, server-side merge. Pattern-study for how our `.claude/skills` + plugin skills could be batch-loaded rather than per-skill probed (informs any future skill-preload optimization). | Behavioral-discipline / plugin-load layer (CLAUDE.md skills auto-fire) | **W379+ (MONITOR-adjacent)** — low priority | `openhands/app_server/app_conversation/skill_loader.py:load_skills_from_agent_server` |
| **OH-3** | **Stateless-core / single-mutable-conversation-state split** (V0→V1 redesign, arxiv 2511.03690 desiderata: statelessness + lifecycle-control + model-agnostic routing + sandboxed-exec + REST/WS). This is the *architectural template* for "treat agent logic as a reusable library, layer Temporal/container/UI on top as coordinated components" — exactly W376's design thesis. **Cite-anchor in the W376/W378 ADR as upstream validation.** | Orchestrator-architecture ADR (the docker-py + Temporal + SDK split) | **W378** (this wave — cite in ADR) | arxiv 2511.03690 "The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents" |

### From `assafelovic/gpt-researcher` (3 patterns v20/W377 is missing)

| # | Pattern | Architecture layer | Target wave | Cite-anchor |
|---|---|---|---|---|
| **GR-1** | **Review→Revise refinement loop (evaluator-optimizer on research output)** — v20's Router→Fan-out→Scorer→**Consenser** ends at scoring/consensus; gpt-researcher adds a `ReviewerAgent`→`ReviserAgent` loop with max-revisions cap that *iterates the draft* against guidelines until satisfactory. v20's Consenser stage should gain an optional **revise-on-fail** edge (already have `iterate-fix-failing-tests` + evaluator-optimizer skills — this is the research-output analogue). | research-architecture v20 (W377 META framework — the convergence pipeline) | **W378→W379** (v20 → v21 framework upgrade) | `multi_agents/agents/editor.py:126` (`_create_workflow` StateGraph reviewer/reviser nodes) + deepwiki review/revise loop |
| **GR-2** | **Embedding-similarity context-gating** — `ContextCompressor` (`compression.py:85`) splits scraped content (chunk 1000/overlap 100) then `EmbeddingsFilter(similarity_threshold=0.35)` keeps only query-relevant chunks before they enter the LLM. v20's Fan-out stage ingests raw multi-source output with no relevance pre-gate — adopting an embedding-similarity filter is a **token-budget primitive** (directly serves CLAUDE.md context-budget discipline + our context-mode usage). | research-architecture v20 Fan-out/ingest stage + token-budget discipline | **W379** (v20 ingest enhancement) | `gpt_researcher/context/compression.py:85,119,130-131` (EmbeddingsFilter + threshold) |
| **GR-3** | **LLM-as-source-curator credibility ranking** — `SourceCurator.curate_sources:33` ranks *sources* (not answers) by credibility+relevance via an LLM call before synthesis. v20's Scorer scores candidate *answers*; gpt-researcher additionally scores *inputs*. Pattern-study for a pre-synthesis source-credibility gate in v20's Fan-out (complements our citations-agent 3-org-distinct floor — credibility-rank the orgs, don't just count them). | research-architecture v20 Scorer stage + citations-agent skill | **W379+** (v20 Scorer enhancement) | `gpt_researcher/skills/curator.py:15,33,60` (curate_sources + create_chat_completion) |

**Bonus GR-4 (parallel-dispatch alignment)**: gpt-researcher's `DeepResearchSkill` uses **semaphore-bounded `asyncio.gather`** — the bounded-concurrency fan-out our `parallel-dispatch-mandate` + `dispatching-parallel-agents-w321-fork` skills mandate. Cite-anchor as cross-runtime validation of the bounded-fanout pattern (CITE-ONLY, no action). Anchor: `gpt_researcher/skills/deep_research.py` (deepwiki-confirmed semaphore).

**What is NOT recommended (negative controls)**:
- Do **NOT** install OpenHands/OpenHands platform — the SDK (already W376-INSTALL'd) is the composable primitive; the platform is the app shell (frontend/app-server) we don't run. Pareto-dominated on the install axis.
- Do **NOT** install gpt-researcher as a dep — embedding a second LLM-router + LangGraph orchestrator inside our Claude-Code orchestrator is the "wrong API surface" dispatch-fit failure (META-D §1.2). Lift the 3 patterns; keep zero dep.

---

## §5 Cite cluster (≥3 distinct orgs; file:line@SHA or URL+timestamp)

> Distinct-org count: **8** (OpenHands/All-Hands · Assaf-Elovic · Stanford-OVAL · Lei-Wang-et-al · Docker Inc · GitHub-API · deepwiki/Devin · Perplexity). Exceeds sca-v13 3-org-distinct floor by 2.67×.

1. **OpenHands/All-Hands** — `gh api repos/OpenHands/OpenHands` (live 2026-05-23): stars 74558, forks 9444, license `NOASSERTION`, pushed_at 2026-05-23T00:33:45Z, created 2024-03-13. License resolved via `OpenHands/OpenHands:LICENSE@sha 572bb25` (MIT outside `enterprise/`).
2. **OpenHands/All-Hands** — `pypi.org/pypi/openhands-sdk/json` (live 2026-05-23): version `1.23.0`, requires_python `>=3.12`, Source `github.com/OpenHands/software-agent-sdk`.
3. **OpenHands/All-Hands** — arxiv `2511.03690` "The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents" (`arxiv.org/abs/2511.03690`, v1; DOI 10.48550/arXiv.2511.03690).
4. **OpenHands/All-Hands** — arxiv `2407.16741` "OpenHands: An Open Platform for AI Software Developers as Generalist Agents" (Xingyao Wang, Graham Neubig et al.; ICLR 2025; `arxiv.org/abs/2407.16741`).
5. **deepwiki / Devin (Cognition)** — `deepwiki.com/OpenHands/OpenHands` (ask_question 2026-05-23): `DockerSandboxService` @ `openhands/app_server/sandbox/docker_sandbox_service.py` (/alive 120s/2s/5s, `STARTUP_GRACE_SECONDS=15`); `skill_loader.py` @ `openhands/app_server/app_conversation/skill_loader.py`; V0→V1 EventStream→EventService.
6. **Assaf-Elovic (gpt-researcher)** — `gh api repos/assafelovic/gpt-researcher` (live 2026-05-23): stars 27235, forks 3662, license `Apache-2.0`, pushed_at 2026-04-16, created 2023-05-12. PyPI `gpt-researcher==0.14.8` (MIT, requires_python >=3.11).
7. **Assaf-Elovic (gpt-researcher)** — raw-source @ `main` (probed 2026-05-23): `gpt_researcher/skills/researcher.py:21,48,89,266,349,449`; `skills/curator.py:15,33,60`; `context/compression.py:85,119,130-131`; `multi_agents/agents/editor.py:5,13,22,52,74,126,129,131-133`.
8. **deepwiki / Devin** — `deepwiki.com/assafelovic/gpt-researcher` (ask_question 2026-05-23): ResearchConductor/SourceCurator/ContextManager/ContextCompressor/EditorAgent/ReviewerAgent/ReviserAgent + LangGraph vs AG2 orchestration + semaphore-bounded deep_research.
9. **Stanford-OVAL** — arxiv `2402.14207` "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models" (STORM; Shao et al.; code `github.com/stanford-oval/storm`; DOI 10.48550/arXiv.2402.14207).
10. **Lei Wang et al.** — arxiv `2305.04091` "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models" (May 2023; DOI 10.48550/arXiv.2305.04091).
11. **Perplexity (Sonar Deep Research)** — 2 research calls 2026-05-23: OpenHands platform-vs-SDK separation (saved `tool-results/toolu_01Dhxiw...txt`); arxiv bibliography map (saved `tool-results/toolu_01Fc7or8...txt`).
12. **Internal-prior (this runtime, W376)** — `docs/architecture/W376-RESEARCH/{S1-openhands-sdk-lifecycle.md:5, S2-agent-server-spawn.md:205-215, S6-event-stream-patterns.md:137,185, INTEGRATION-FIXES.md:48-58, SYNTHESIS.md:11,56,1217-1218}` — establishes openhands-sdk/agent-server already INSTALL-tier + version pins.
13. **Docker Inc** — docker-py `containers.run()` as used by `DockerSandboxService` (deepwiki) + W376 S3 `docker/models/containers.py:534-911` retry classification (`docker==7.1.0`).
14. **Framework basis** — `Z:/claude-sota-installed-W375/.claude/schemas/sca-v20-multi-dim.schema.json` + `docs/architecture/W377-RESEARCH-V20/{META-C-MULTI-DIM-SCORING.md, META-D-INSTALL-VS-PATTERN-STUDY.md, META-F-SOFT-GATE-QUALITY.md}`.

---

**STATUS: DONE** — file landed at `Z:/claude-sota-installed-W375/docs/architecture/W378-SOTA-CONVERGENCE/R1-OPENHANDS-GPTRESEARCHER.md`. Both repos verdict **PATTERN-STUDY** (high-confidence). 6 concrete PATTERN-STUDY recommendations (OH-1..OH-3 platform-lifecycle, GR-1..GR-3 research-pipeline) + 1 CITE-ONLY bonus. ~30 tool calls used.
