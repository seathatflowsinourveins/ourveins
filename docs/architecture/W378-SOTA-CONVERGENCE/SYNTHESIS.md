# W378 SOTA-Convergence — Synthesis (sca-v20 Adoption-Decision)

> **Status**: SYNTHESIS landed — RECOMMENDATION-ONLY, operator-sign-pending · **Date**: 2026-05-23
> **Wave**: W378 SOTA-CONVERGENCE · **Agent**: Synthesis (claude-opus-4-7[1m], general-purpose) · **Worktree**: `Z:/claude-sota-installed-W375/`
> **Convergence sources**: R1 (`R1-OPENHANDS-GPTRESEARCHER.md`) + R2 (`R2-COMPOSIO-DIFY.md`) + R3 (`R3-INSTALLED-REAUDIT-AWESOME.md`)
> **Framework**: sca-v20 multi-dim (`.claude/schemas/sca-v20-multi-dim.schema.json`) + W377 META-C (scoring) / META-D (4-class decision-tree) / SYNTHESIS-V20 (canonical v20 architecture)
>
> **CR-1 / CR-5 operator-sign caveat (binding)**: this document RECOMMENDS an adoption-degree per repo via the sca-v20 7-stage decision-tree. It does **NOT** authorize any install. Per CLAUDE.md cardinal-rule-1 (install primitives only from trusted plugins/skills/agents + 30-day version-pin window) + cardinal-rule-5 (safety boundaries via CC permissions, not custom guards), **the operator decides actual install**. Every INSTALL-class recommendation below is queued, not executed. Per cardinal-rule-6, every score + verdict traces to an evidence anchor in R1/R2/R3 or the cited framework docs; dimensions not assessed by the R-docs are marked `not-assessed` rather than guessed.
>
> **gpt5.5-gate**: this synthesis is queued for a codex GPT-5.5 convergence review fired by the orchestrator (§7). Adoption-class promotions await that APPROVE + operator-sign.

---

## §1 Scope + method

Six candidate repos were named across the three research streams (OpenHands/OpenHands, assafelovic/gpt-researcher, ComposioHQ/composio, langgenius/dify, wshobson/agents, mattpocock/skills). R3's awesome-list sweep surfaced **9 NEW candidates** (N1-N9) plus **4 sub-candidate plugins** inside the wshobson/agents marketplace (plugin-eval, block-no-verify, protect-mcp, review-agent-governance — itself part of the wshobson INSTALL/EXPAND verdict). This synthesis carries all forward into one sca-v20-scored decision table (§2), a normalized convergence ranking (§3), an architecture-feed split (§4), an installed-drift cross-check (§5), numbered carry-forwards (§6), and the gpt5.5-gate note (§7).

Scores are reproduced verbatim from R1/R2/R3 — this synthesis does **not** re-score; it routes the R-doc per-class scores through the META-D 7-stage decision-tree and surfaces convergence. Where an R-doc supplied only a per-class triple (e.g. R3's N1-N9), the MONITOR score is marked `n/a` (R-docs did not compute it — CR-6 no-guess).

---

## §2 Per-repo sca-v20 decision table

> Per-class scores are the R-doc-computed values (META-C §2 weight profiles). **Adoption-Degree** = the winning class via the META-D §2 7-stage decision-tree. **CC-pathway** = D13 `cc_install_path` (the v20 Cluster-V "claude code your runtime pathway support" dim — a real plugin/skill/MCP/SDK integration path; **NOT** stars). Hard-block preamble (Stage 1: CVE / malicious / fake-star / typosquat / archived / signed-fail / license-proprietary-or-noassertion-for-INSTALL) applied first — the "Hard-block" column records any trip.

| Repo | INSTALL | PATTERN-STUDY | CITE-ONLY | MONITOR | **Adoption-Degree** | Key rationale (1 line) | CC-pathway (D13) | Hard-block trip |
|---|---:|---:|---:|---:|---|---|---|---|
| **OpenHands/OpenHands** | 0.46 | 0.88 | 0.86 | 0.82 | **PATTERN-STUDY** | Platform is app-shell; the composable `openhands-sdk` is already W376-INSTALL'd → Pareto-dominated on install axis | cli-only / full-app | none for PS (license MIT-outside-`enterprise/` after LICENSE-file read; gh SPDX `NOASSERTION` is split-license artifact, soft-gate admits) |
| **assafelovic/gpt-researcher** | 0.55 | 0.90 | 0.88 | 0.80 | **PATTERN-STUDY** | Full research runtime (own LLM-router + LangGraph) → embedding a 2nd orchestrator = dispatch-fit<2 | library-only | none (Apache-2.0, active 37d) |
| **ComposioHQ/composio** | 0.74 | 0.80 | 0.80 | not-assessed | **INSTALL** (capability-add; staged-pilot) | MIT + MCP-native + `pip install composio` + `claude_agent_sdk` provider; novel managed-auth-broker niche | sdk-python (+ sdk-typescript + mcp-server) | none (MIT; D08=1 signed-not-SLSA-L2 → soft-dock, op-attestation) |
| **langgenius/dify** | 0.52 | 0.90 | 0.91 | not-assessed | **PATTERN-STUDY** | Double INSTALL hard-fail: source-available license + Docker-platform-not-library | library-only / none | INSTALL-class only: D07 source-available ("Dify Open Source License") + D13 library-only. PS/CITE admit (source-readable) |
| **wshobson/agents** | 0.80 | 0.85 | 0.82 | not-assessed | **INSTALL** (already installed → EXPAND 3→+plugin-eval) | Healthy + expanded to ~80 plugins; PluginEval mechanizes our sca-v20/META-F quality-gate | plugin (`.claude-plugin/marketplace.json`) | none (per-plugin permissive; D08≈2 PGP-verified commits). Caution: bus-factor=1 |
| **mattpocock/skills** | not-assessed | 0.84 | 0.86 | not-assessed | **CITE-ONLY / already-adopted** (vendored, stable) | Vendored SHA `b8be62ffacb0` == live HEAD → zero drift, no action | plugin/skills (vendored-fork) | none (MIT per repo convention; HEAD unsigned `verified=false` — vendored-fork model, not a fresh INSTALL) |
| **N1 — VoltAgent/awesome-claude-code-subagents** | 0.80 | 0.86 | 0.83 | not-assessed | **INSTALL** (FQN-discipline required) | 130+ subagents / 10-cat marketplace; security category alone justifies | plugin (`.claude-plugin/marketplace.json`) | none (MIT, ~28 contrib, active). Bare-name collision risk → MUST install via FQN per CR-3 |
| **N2 — lastmile-ai/mcp-agent** | 0.66 | 0.88 | 0.84 | not-assessed | **PATTERN-STUDY** (already partially adopted) | 5 named workflow primitives = highest cc_pattern_density 0.88; but `pip install` = full re-architecting runtime, dispatch-fit<2 | sdk-python | none (Apache-2.0). INSTALL-fail: pushed ~4mo (>90d INSTALL window); already cited by local `mcp-agent-patterns` skill |
| **N3 — Yeachan-Heo/oh-my-claudecode** | 0.78 | 0.85 | 0.80 | not-assessed | **INSTALL-eval** (MONITOR→INSTALL) | Teams-first multi-agent CC orchestration; ~104 contrib (healthy bus-factor), open_issues=3 | plugin | none probed. Needs CR-1 full trust-tuple + Pareto-check vs installed agent-teams before binding |
| **N4 — hesreallyhim/awesome-claude-code** | n/a | 0.55 | 0.80 | not-assessed | **CITE-ONLY** | Flagship community index (largest, 3-source converged); cite entries, do NOT mirror | none (curated list) | **INSTALL + PATTERN-mirror blocked**: D07 `NOASSERTION`. CITE-ONLY admits (cite entries via their own primary links) |
| **N5 — VoltAgent/awesome-agent-skills** | 0.70 | 0.85 | 0.82 | not-assessed | **PATTERN-STUDY** (selective skill INSTALL only) | 1,000+ skills cross-platform; bulk = CR-1 blast-radius (alirezarezvani 313-skill lesson) | plugin/skills | none (MIT sibling). Bulk-install caution flagged |
| **N6 — daymade/claude-code-skills** | 0.62 | 0.78 | 0.78 | not-assessed | **PATTERN-STUDY** (selective skill INSTALL) | Production-ready skills marketplace, active | plugin/skills | none (MIT) |
| **N7 — boshu2/agentops** | 0.40 | 0.55 | 0.60 | not-assessed | **MONITOR** | Memory/validation/feedback layer maps to our 6-tier memory; too immature | library | INSTALL-class: D07 `NOASSERTION` + <6mo maturity (META-D Stage-4 recidivism gate) |
| **N8 — GanyuanRan/Aegis** | 0.55 | 0.72 | 0.70 | not-assessed | **PATTERN-STUDY** | Drift-check / evidence-verify methodology overlaps our CR-6; created today (open_issues=0) | skill/methodology | none (MIT). Maturity caution (created 2026-05-23) |
| **N9 — davepoon/buildwithclaude** | n/a | 0.60 | 0.78 | not-assessed | **CITE-ONLY** | Discovery hub (MIT alternative to N4) | none (discovery hub) | none (MIT) — but `none` install-path → CITE-ONLY discovery feed only |

### §2.1 Sub-candidate plugins inside wshobson/agents (R3 §1.2)

These are components of the wshobson/agents marketplace EXPAND verdict, not standalone repos. Scored at plugin-granularity by R3:

| Plugin | Adoption-Degree (R3) | Rationale | Hard-block |
|---|---|---|---|
| **plugin-eval** (PluginEval) | **INSTALL** | 3-layer quality framework (static + LLM-judge + Monte-Carlo) — DIRECT fit for sca-v20 / verdict-jury L3; `plugin-eval:certify` skill already in runtime | none (MIT, plugin-path) |
| **block-no-verify** | **INSTALL or PATTERN-STUDY** | PreToolUse hook blocking `--no-verify` — matches CR-2; we already enforce via `.pre-commit-config.yaml` | none (upstream-plugin hook = CR-2-compliant) |
| **protect-mcp** | **PATTERN-STUDY** | Cedar policy + Ed25519 signed receipts — Cedar dep blast-radius needs CR-1(d) audit before INSTALL | none for PS (already mirrored as local `signed-audit-trails` skill) |
| **review-agent-governance** | **PATTERN-STUDY** | HITL approval before agent posts PR reviews — matches Δ-G50 worker-failure-termination-guard | none for PS |
| **qa-orchestra** | **MONITOR** | 10-agent QA toolkit — Pareto-overlap with installed agent-teams `team-*` presets | none; demoted on Pareto-overlap |

---

## §3 Convergence ranking (META-C normalized C-score ordering)

Per META-C §2.1 / SYNTHESIS-V20 §2.1 the convergence formula is `C-score(j) = (Σ_i w_i · I(claim surfaced in MCP i)) / (Σ_i w_i · 1[MCP i queried])` with: **denominator gating** against missing-MCP inflation, **cite-anchor cap = 5** per claim, **3-org-distinct hard-gate**, and **memory-MCP returns discounted ×0.5** (echo-chamber guard). The R-docs each report a multi-class source convergence (CLASS-A raw / CLASS-B web-judge / CLASS-C AI-on-repo). Below: ordered by **breadth of independent-angle convergence** (how many genuinely independent surfacing angles, not raw star count — stars are 0.00-weight for all action classes).

### §3.1 Genuinely multi-angle converged (named repo + awesome-list + MCP cross-check)

| Rank | Repo | Convergence angles | Distinct-org floor | Tier |
|---|---|---|---|---|
| 1 | **wshobson/agents** | gh-API (PGP-verified HEAD) + deepwiki (80/81 plugins) + exa README + already-installed-prior + R3 §4 convergence-note #4 | ≥4 angles, 2-source per claim | INSTALL/EXPAND |
| 2 | **lastmile-ai/mcp-agent** (N2) | perplexity §4.2 + already-internal `mcp-agent-patterns` skill + R3 §4 note #3 (Anthropic effective-agents anchor) + 5-primitive deepwiki | 3-source converged | PATTERN-STUDY |
| 3 | **VoltAgent/awesome-claude-code-subagents** (N1) | gh-API + deepwiki (130+ subagents) + exa/stackingjones + perplexity §2.2 + R3 §4 note #2 | 2-source, ≥4 angles | INSTALL |
| 4 | **hesreallyhim/awesome-claude-code** (N4) | perplexity §2.1 "flagship" + exa/stackingjones "main curated list" + gh `topic:` rank-1 (R3 §4 note #1) | 3-source converged | CITE-ONLY |
| 5 | **OpenHands/OpenHands** | gh-API + pypi (sdk separate) + 2 arxiv (2511.03690 + 2407.16741) + deepwiki + perplexity + W376-prior (R1 §3 4-source on SDK-repo-separation) | 4-source on key claim; 8 distinct orgs | PATTERN-STUDY |
| 6 | **assafelovic/gpt-researcher** | gh-API + raw-source (literal `asyncio.gather`) + deepwiki + perplexity + STORM/Plan-and-Solve arxiv lineage (R1 §3 notes 3-5) | 2× CLASS-A + CLASS-B | PATTERN-STUDY |
| 7 | **langgenius/dify** | gh-API + LICENSE-raw-read + perplexity + deepwiki (R2 §3 notes 4-6, 3-source on license + D13) | 3-source on the decisive hard-fails | PATTERN-STUDY |
| 8 | **ComposioHQ/composio** | gh-API + pyproject/providers + pypi + deepwiki + perplexity (R2 §3 notes 1-3, 3-source on D13 + MCP-native) | 3-source converged | INSTALL (staged) |

### §3.2 Single-source / lower-convergence (kept per "low-stars can be high quality", but NOT convergence-confirmed)

Per SYNTHESIS-V20 §5 honesty-caveat (single-source candidates are surfaced but NOT counted toward convergence-confirmed adoption):

| Repo | Convergence | Tier | Note |
|---|---|---|---|
| **mattpocock/skills** | self-consistent 2-source (gh HEAD == vendored SHA) | CITE-ONLY/adopted | Zero-drift confirmation, not a new-adoption convergence |
| **N3 oh-my-claudecode** | gh-API + velocity signal; single deepwiki/exa angle | INSTALL-eval | High velocity but needs more independent angles before INSTALL — hence eval, not INSTALL |
| **N5 VoltAgent/awesome-agent-skills** | sibling-of-N1 + claudefa.st | PATTERN-STUDY | 1.5 angles |
| **N6 daymade/claude-code-skills** | gh-API single primary | PATTERN-STUDY | Single-source |
| **N7 boshu2/agentops** | gh-API single | MONITOR | Single-source + immature |
| **N8 GanyuanRan/Aegis** | gh-API single (created today) | PATTERN-STUDY | Single-source + maturity caution |
| **N9 davepoon/buildwithclaude** | gh-API single | CITE-ONLY | Single-source discovery feed |

**Convergence headline**: the two **strongest multi-angle converged adoption signals** are (1) **wshobson/agents EXPAND → +plugin-eval** (a 4-angle converged INSTALL that mechanizes the very sca-v20/META-F quality-gate this wave is building) and (2) **lastmile-ai/mcp-agent** as the strongest PATTERN-STUDY (highest cc_pattern_density 0.88, already partially adopted). The named-repo deep-dives (OpenHands, gpt-researcher, Dify) all converge to PATTERN-STUDY — high-signal architecture, wrong runtime-shape for direct install. Composio is the lone named-repo INSTALL (and that one is staged-pilot, not immediate).

---

## §4 What feeds architecture

### §4.1 INSTALL-class → operator-sign queue (CR-1 30-day version-pin window)

Each entry awaits operator-sign before any install. Per CR-1 condition-(c): head commit ≥30 days old OR explicit operator-pin (defeats merge-day supply-chain attack window).

| Repo | Layer it slots into | Specific value-add | 30-day-pin rationale |
|---|---|---|---|
| **wshobson/agents → +plugin-eval** (EXPAND) | Behavioral-discipline / quality-gate layer (sca-v20 + verdict-jury L3) | PluginEval 3-layer (static + LLM-judge + Monte-Carlo) mechanizes the META-F soft-gate quality goal; `plugin-eval:certify` skill already present in runtime skill-list → install closes the loop | Marketplace install pins SHA (D17 git-commit-sha). Bus-factor=1 (single maintainer wshobson) → **keep SHA-pinned per CR-9**; re-verify HEAD `cbcde3f1…` PGP-verified before pin |
| **ComposioHQ/composio** (staged-pilot) | MCP-server ecosystem (`.mcp.json`) + W376 agent tool-use surface | Managed multi-toolkit OAuth broker + runtime tool-search (`COMPOSIO_SEARCH_TOOLS`) — novel niche not covered by any incumbent `.mcp.json` server | `composio==0.13.1` + `composio-client==1.39.0` exact-pin (D17). **Staged not immediate**: introduces hosted-service + per-user-OAuth blast-radius; D08=signed-not-SLSA-L2 needs operator-attestation for CR-1(a); pilot one toolkit + audit OAuth credential storage vs `Z:\claude-sota-installed-state\` discipline first |
| **N1 — VoltAgent/awesome-claude-code-subagents** | Subagent layer (CC Agent-tool / agent-teams) | 130+ subagents / 10-cat; security category (pen-tester + code-reviewer) | Marketplace SHA-pin (D17). **MUST install via FQN per CR-3** (bare subagent-name collision risk → regenerate `subagent-type-allowlist.json` if adopted via `tools/build-subagent-allowlist.mjs --regenerate`) |
| **N3 — Yeachan-Heo/oh-my-claudecode** (INSTALL-eval) | Parallel-execution layer (CC experimental Agent Teams, mode-2 of 4-mode-parallel) | Teams-first multi-agent orchestration; ~104 contrib = healthy bus-factor (vs wshobson=1) | **Eval-first, not direct-INSTALL**: needs CR-1 full trust-tuple (transitive blast-radius + signed-release audit) + Pareto-check vs installed agent-teams before binding. Highest-velocity NEW target; 30-day window applies once eval clears |
| **plugin-eval** (standalone, = wshobson sub-plugin) | Quality-gate layer | (same as wshobson EXPAND above — listed for completeness; install via `wshobson/agents` marketplace) | git-commit-sha via marketplace |
| **block-no-verify** (= wshobson sub-plugin) | Pre-commit-gate layer (CR-2) | PreToolUse hook blocking `--no-verify` | We ALREADY enforce via `.pre-commit-config.yaml` → INSTALL is redundant-but-aligned; **may prefer PATTERN-STUDY** (no new dep). Operator decides |

**Queue note**: the strongest single recommendation is the **wshobson/agents EXPAND (3→+plugin-eval)** — it is the highest-converged INSTALL and directly advances this wave's own framework. Composio + N1 + N3 are capability-adds the operator may stage. None are auto-installed.

### §4.2 PATTERN-STUDY-class → extract patterns

For each, the SPECIFIC pattern(s) worth lifting into our architecture (own-authored, cite-anchored to upstream `file:line@SHA` — no dep, no upstream code in tree beyond fair-use cite-anchors):

| Repo | Specific pattern(s) to lift | Where it applies |
|---|---|---|
| **OpenHands/OpenHands** | **OH-1**: Sandbox health-poll lifecycle constants (`/alive` poll timeout 120s, interval 2s, per-GET 5.0s, `STARTUP_GRACE_SECONDS=15`, pause-oldest at `max_num_sandboxes`) — `docker_sandbox_service.py`. **OH-2**: `skill_loader` single-call merge contract (`/api/skills` one call, server-side merge). **OH-3**: stateless-core / single-mutable-conversation-state split (arxiv 2511.03690). | OH-1 → W376 docker-py-spawn + Temporal heartbeat cadence (heartbeat << 120s). OH-2 → `.claude/skills` + plugin skill-preload optimization. OH-3 → orchestrator-architecture ADR (cite as upstream validation of the docker-py + Temporal + SDK split) |
| **assafelovic/gpt-researcher** | **GR-1**: Review→Revise refinement loop (`ReviewerAgent`→`ReviserAgent` max-revisions, LangGraph `editor.py:126`). **GR-2**: Embedding-similarity context-gating (`ContextCompressor` chunk-1000/overlap-100 + `EmbeddingsFilter(threshold=0.35)`, `compression.py:85`). **GR-3**: LLM-as-source-curator credibility ranking (`curator.py:33`). **GR-4** (bonus, CITE-ONLY): semaphore-bounded `asyncio.gather`. | GR-1 → v20 Consenser stage gains optional revise-on-fail edge (analogue of `iterate-fix-failing-tests`/evaluator-optimizer skills). GR-2 → v20 Fan-out/ingest token-budget primitive (serves context-budget discipline). GR-3 → v20 Scorer stage + `citations-agent` (credibility-rank orgs, don't just count to 3-org floor). GR-4 → validates `parallel-dispatch-mandate` bounded-fanout |
| **langgenius/dify** | Workflow-DAG GraphEngine + sub-graph child-engines (`workflow_entry.py`, `node_factory.py`); Langfuse-native tracing layer (`LangFuseDataTrace`); Knowledge-Pipeline / Agentic-RAG (reranking + weighted multi-config); Agent-Strategies plugin protocol (`strategy_protocols.py`); parallel-branch queue-based engine. | GraphEngine → Temporal orchestration node-typing + `GraphRuntimeState`/`VariablePool` state-isolation (maps to 4-mode-parallel + checkpoint-resume skill). LangFuseDataTrace → **our T5 Langfuse v3.174.1** wave-orchestration span instrumentation (reference impl). Knowledge-Pipeline → memory-tier T3-cognee/T6-basic-memory retrieval shape. Agent-Strategies → agent-teams strategy selection |
| **N2 — lastmile-ai/mcp-agent** | 5 named workflow primitives: Router, ParallelLLM (fan-out/fan-in), Orchestrator (planner-workers-synthesizer), Evaluator-Optimizer, MCPAggregator (namespaced multi-MCP). | Already partially adopted via local `mcp-agent-patterns` skill — **action**: confirm that skill cites current HEAD. Directly = our orchestrator-workers + parallel-fanout + evaluator-optimizer + MCP-tool-bridging slots |
| **N5 — VoltAgent/awesome-agent-skills** | Skill-curation methodology (1,000+ skills sourced from official dev teams + community, cross-platform). | Skill-authoring discipline reference; INSTALL only selectively per-skill (CR-1 blast-radius — same alirezarezvani 313-skill lesson) |
| **N6 — daymade/claude-code-skills** | Production-ready skills-marketplace structure. | Selective skill INSTALL; marketplace-structure reference |
| **N8 — GanyuanRan/Aegis** | Drift-check / baseline-first / evidence-verified methodology. | Overlaps CR-6 verify-before-claim + drift-governance — lift the drift-check methodology |
| **protect-mcp** (wshobson sub-plugin) | Cedar policy + Ed25519 signed-receipt tool-call governance. | Maps to CR-1 trust-tuple SLSA/Sigstore axis; already mirrored as local `signed-audit-trails` skill. Cedar dep blast-radius blocks INSTALL → study only |
| **review-agent-governance** (wshobson sub-plugin) | HITL approval before agent posts PR reviews/comments/merges. | Maps to Δ-G50 `worker-failure-termination-guard` HITL discipline |
| **mattpocock/skills** | `.out-of-scope` + `CONTEXT.md` skill-scoping convention (what NOT to make a skill). | `skill-creator` guidance — PATTERN-STUDY the `.out-of-scope` convention if not yet captured. Monitor `skills/in-progress/` for next-wave vendor-sync |

**Composio bonus PATTERN-STUDY (even though it's INSTALL-routed)**: the `COMPOSIO_SEARCH_TOOLS` tool-router/search-to-avoid-context-bloat pattern is liftable into our context-budget discipline (runtime tool-discovery mirrors our deferred-tools ToolSearch mechanism) — independent of the install decision.

### §4.3 CITE-ONLY / MONITOR — brief

| Repo | Class | Why not now | What would change the verdict |
|---|---|---|---|
| **N4 — hesreallyhim/awesome-claude-code** | CITE-ONLY | `NOASSERTION` license blocks INSTALL + PATTERN-mirror; it's a curated index, not an artifact | License clarification to permissive → could PATTERN-STUDY the curation methodology. Until then: cite individual entries via their own primary-source links, do NOT vendor the list |
| **N9 — davepoon/buildwithclaude** | CITE-ONLY | `none` install-path (discovery hub); MIT but no artifact to install | Same — use as discovery feed; cite, don't vendor |
| **N7 — boshu2/agentops** | MONITOR | `NOASSERTION` license + <6mo maturity (META-D Stage-4 recidivism gate) | License → permissive AND ≥6mo project age with sustained activity → re-eval as PATTERN-STUDY (memory/validation/feedback maps to our 6-tier memory) |
| **qa-orchestra** (wshobson sub-plugin) | MONITOR | Pareto-overlap with installed agent-teams `team-*` presets | Demonstrated novel-niche not covered by agent-teams → re-eval |

---

## §5 Cross-check vs already-installed (drift)

From R3's installed-re-audit (§1 wshobson/agents, §2 mattpocock/skills):

| Installed primitive | Drift status | Detail | Carry-forward |
|---|---|---|---|
| **wshobson/agents** (3 plugins: comprehensive-review · context-management · agent-teams) | **NO regression — EXPAND opportunity** | HEAD `cbcde3f1…` PGP-verified, pushed ~1d; marketplace expanded 3-plugin-slice → ~80 plugins. NOT stale, NOT archived, healthier than at last sync | C-W378-1 (EXPAND 3→+plugin-eval) |
| **mattpocock/skills** (`mattpocock-vendor-fork-10` @ `b8be62ffacb0`) | **ZERO drift** | Vendored SHA `b8be62ffacb0` == live HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` exactly. W349 P1.3 cite-refresh note confirmed accurate. No re-vendor needed | C-W378-2 (monitor `skills/in-progress/` only) |
| **openhands-sdk** (`==1.22.1`, W376-INSTALL) | **No drift flagged for install; minor version-lag note** | R1 confirms SDK is the already-INSTALL'd composable primitive (W376 S1/S2). PyPI HEAD is `v1.23.0` (released 2026-05-20) vs pinned `1.22.1` — a 1-minor lag, NOT a drift-regression; W376 pin is intentional. The *platform* (this wave's candidate) correctly routes PATTERN-STUDY | C-W378-3 (optional W379 SDK pin-bump eval 1.22.1→1.23.0) |
| **mcp-agent-patterns** (local skill citing lastmile-ai/mcp-agent) | **Possible cite-staleness** | R3 N2 flags "confirm `mcp-agent-patterns` skill cites current HEAD" — lastmile-ai/mcp-agent pushed 2026-01-25 (~4mo); skill cite-anchor may lag | C-W378-4 (verify skill cite-anchor vs current HEAD) |

**Drift headline**: NO installed repo has DRIFTED to stale/archived or been superseded by a newer SOTA alternative. The only actionable signals are (a) wshobson/agents has EXPANDED (opportunity, not drift) and (b) two minor cite/pin-currency checks (openhands-sdk 1.22.1→1.23.0; mcp-agent-patterns cite-anchor). No carry-forward is a regression.

---

## §6 Carry-forwards (C-W378-N)

| ID | Description | Acceptance criterion | Operator-sign-gated? |
|---|---|---|---|
| **C-W378-1** | EXPAND wshobson/agents install-set 3 → +plugin-eval (highest-converged INSTALL; mechanizes sca-v20/META-F quality-gate) | `/plugin marketplace update` + `/plugin install plugin-eval@<marketplace>` lands; `/reload-plugins` verified; SHA-pinned per CR-9 (bus-factor=1); VERDICT-LEDGER row records install + PGP-verified HEAD | **YES** (CR-1 install) |
| **C-W378-2** | Monitor mattpocock/skills `skills/in-progress/` for promotion to `engineering/`; PATTERN-STUDY the `.out-of-scope` scoping convention | Next-wave re-probe: if `in-progress/` skills promote, queue re-vendor; `.out-of-scope` convention captured in `skill-creator` guidance if not present | No (PATTERN-STUDY + monitor) |
| **C-W378-3** | Optional openhands-sdk pin-bump eval `1.22.1` → `1.23.0` (PyPI HEAD) | W379 eval: changelog review + W376 lifecycle-anchor re-verify (S1/S2 file:line still resolve); operator-sign on bump | **YES** (CR-1 version-pin change) |
| **C-W378-4** | Verify local `mcp-agent-patterns` skill cite-anchor vs lastmile-ai/mcp-agent current HEAD | Skill SKILL.md cite-anchor SHA == current gh HEAD, or refreshed | No (cite-refresh) |
| **C-W378-5** | PATTERN-STUDY landing for OpenHands platform (OH-1/OH-2/OH-3) + gpt-researcher (GR-1/GR-2/GR-3) into v20 framework + W376 spec | `docs/architecture/W379-*/` PATTERN-STUDY doc citing upstream `file:line@SHA`; v20 Consenser revise-on-fail edge + Fan-out embedding-gate designed | No (own-authored pattern-lift) |
| **C-W378-6** | Dify pattern-lift (GraphEngine / LangFuseDataTrace / Knowledge-Pipeline / Agent-Strategies) — cite-anchored, no dep | PATTERN-STUDY doc citing `api/core/workflow/*` @ SHA; T5-Langfuse span-instrumentation reference captured | No (own-authored) |
| **C-W378-7** | Composio staged-pilot eval (capability-add INSTALL deferred) | Pilot one toolkit end-to-end via `.mcp.json` Tool Router URL; audit OAuth credential storage vs state-outside-repo discipline; operator go/no-go recorded | **YES** (CR-1 install + hosted-service blast-radius) |
| **C-W378-8** | N1 VoltAgent-subagents INSTALL eval (FQN-discipline) + N3 oh-my-claudecode INSTALL-eval (Pareto vs agent-teams) | CR-1 full trust-tuple pass per repo; `subagent-type-allowlist.json` regen plan for N1; Pareto-check for N3; operator go/no-go | **YES** (CR-1 install) |
| **C-W378-9** | Codex GPT-5.5 convergence review of THIS synthesis (gpt5.5-gate) | codex round verdict = APPROVE (or findings addressed); recorded with SHA | Gate (precedes any §4.1 promotion) |

---

## §7 gpt5.5-gate note

Per CLAUDE.md architecture (Reviewer = codex GPT-5.5 via codex CLI; cross-model consensus is the W331 P0.7 frontier-peer authority) + sca-v20 jury-on-demand contract, **this synthesis is queued for a codex GPT-5.5 convergence review fired by the orchestrator** (not by this agent). The codex round will adversarially check: (a) every per-class score traces to an R1/R2/R3 anchor (CR-6); (b) the META-D 7-stage routing is applied correctly (especially the Dify double-hard-fail + the OpenHands Pareto-domination demotion); (c) no star-count drove an action-class verdict (v20 popularity-weight=0.00); (d) the convergence ranking honestly separates multi-angle-converged from single-source.

**No adoption-class promotion is authorized until that codex round returns APPROVE AND the operator signs** the §4.1 INSTALL queue + §6 operator-sign-gated carry-forwards (C-W378-1, -3, -7, -8). Per CR-1/CR-5, this document is a RECOMMENDATION; the operator decides the actual install.

---

## §8 Contradictions / concerns surfaced (CR-6)

Surfaced explicitly rather than papered over:

1. **OpenHands license SPDX vs LICENSE-file** (R1 §1.1): gh-API SPDX = `NOASSERTION` (would naively hard-BLOCK INSTALL) but LICENSE-file read resolves to MIT-outside-`enterprise/`. This is consistent with the v20 framework's META-F §5.2 soft-gate-after-file-read design — NOT a contradiction; the soft-gate correctly admits PATTERN-STUDY. Recorded as the textbook split-license case.
2. **MONITOR scores absent for R2 + R3 repos**: R1 computed MONITOR (0.82 / 0.80); R2 and R3 reported only INSTALL/PATTERN-STUDY/CITE-ONLY triples. Marked `not-assessed` in §2 per CR-6 no-guess. Does not affect routing (MONITOR is the fallthrough default, never a gating threshold).
3. **N3 oh-my-claudecode "Hard-block trip: none probed"**: R3 routed it INSTALL-eval explicitly because the full CR-1 trust-tuple (transitive blast-radius + signed-release) was NOT probed — correctly demoted to eval-first, not INSTALL. The "none" reflects "no hard-block found in what was probed", not "fully cleared".
4. **block-no-verify INSTALL-vs-PATTERN-STUDY ambiguity**: R3 routed it "INSTALL or PATTERN-STUDY" because we already enforce `--no-verify`-blocking via `.pre-commit-config.yaml`. Recorded as operator-choice (redundant-but-aligned INSTALL vs no-new-dep PATTERN-STUDY); not forced.
5. **D08 signed-release gap for Composio**: D08=1 (npm dist.signatures present, no SLSA-L2 attestation). Per v20 INSTALL hard-filter, signed_release_level≥2 OR operator-attestation is required. Composio's INSTALL therefore CARRIES an operator-attestation requirement (CR-1(a)) — surfaced in §4.1 + C-W378-7, not assumed-passed.

---

## §9 Cite cluster (≥3-org-distinct floor, sca-v13 / W332)

Sources feeding this synthesis (each traceable to R1/R2/R3 anchors or framework docs):

1. **R1 cite-cluster** — 8 distinct orgs (OpenHands/All-Hands · Assaf-Elovic · Stanford-OVAL · Lei-Wang-et-al · Docker · GitHub-API · deepwiki/Devin · Perplexity); arxiv 2511.03690 + 2407.16741 + 2402.14207 + 2305.04091.
2. **R2 cite-cluster** — 8 distinct orgs (Composio · LangGenius · DeepWiki/Cognition · Perplexity · PyPI+npm · OSSF · internal framework + CLAUDE.md).
3. **R3 cite-cluster** — 9 external orgs + internal (wshobson · Matt-Pocock · VoltAgent · lastmile-ai · Yeachan-Heo · hesreallyhim · Anthropic · independent-eval-blogs · Perplexity).
4. **sca-v20 framework** — `.claude/schemas/sca-v20-multi-dim.schema.json` + W377 META-C (19-dim, 14-org cite-cluster) / META-D (10+ org, 7-stage tree) / SYNTHESIS-V20 (6-stream synthesis).
5. **CLAUDE.md cardinal-rules** — CR-1 trust-tuple (W331 axis-1 #3), CR-2 `.mcp.json` pin, CR-3 FQN-subagent-discipline, CR-5 permissions-not-guards, CR-6 verify-before-claim, CR-9 pinning; T5-Langfuse v3.174.1 runtime-state.

**Distinct-org count across the convergence: ≥12** (OpenHands, Assaf-Elovic, Composio, LangGenius, wshobson, Matt-Pocock, VoltAgent, lastmile-ai, Yeachan-Heo, hesreallyhim, deepwiki/Cognition, Perplexity, + OSSF/Stanford/Docker/Anthropic via the R-doc clusters). Exceeds the 3-org-distinct floor by ≥4×.

---

**STATUS: DONE_WITH_CONCERNS** — synthesis landed at `docs/architecture/W378-SOTA-CONVERGENCE/SYNTHESIS.md`. 5 contradictions/concerns surfaced (§8), all non-blocking. 16 candidates scored (6 named + 9 awesome-sweep N1-N9 + 5 wshobson sub-plugins, deduped to repo-granularity). Recommendation-only per CR-1/CR-5; codex GPT-5.5 gate + operator-sign pending (§7).
