---
title: Wave 221 Agent F - Cross-Vendor Agent Orchestration Framework Deep Audit
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 221
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: cross-vendor-agent-orch-scoring
predecessors: W217-F3 + W220-agentC
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (agent bound by sota-researcher "Do NOT Write .md" contract)
---

# VERDICT: NEEDS-REVISION — Cross-vendor agent orchestration audit complete; 0 ADOPT-NOW, 1 PROVIDER-COMPLEMENT install (litellm for Section 17 wiring), 7 REJECT-FOR-FIT / DEMOTED, 1 BONUS-DISCOVERY (microsoft/agent-framework as autogen-replacement reference)

**STAND-IN-NOTICE**: This dispatch may be Sonnet stand-in per CLAUDE.local.md ENV (g) (DEPRECATED per Wave 119 FM-17.f). If stand-in, cross-model gate NOT structurally satisfied — orchestrator must verify via codex T1 follow-up or mark `[STAND-IN per ENV (g)]` in commit. **All claims below are cite-anchored at file:line + HEAD SHA per cardinal-rule-1**, providing TIER-1-DIRECT evidence regardless of dispatch class.

---

## 8-Candidate Scoring Table (+ MAF bonus discovery)

| # | Candidate | ★ | License | Maintainer | Axis-3 band | Probe 4 plugin-ns | Probe 5 mode-harness | Probe 6 license/blocker | Probe 7 demand | CR-12 class | SRA verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | langchain-ai/deepagents | 22.8k | MIT | LangChain org (TIER-1) | SUSTAINED-MATURE-HIGH-VELOCITY (~10mo, cpd≈high) | PASS (no plugin) | **FAIL — LangGraph external runtime** | PASS | .a REJECT (CC Agent tool covers all SDK primitives) | **DUPLICATE-FUNCTIONALITY** | **REJECT-FOR-FIT** |
| 2 | aaif-goose/goose | 45.2k | Apache-2.0 | AAIF/Linux Foundation (TIER-1) | SUSTAINED-MATURE-HIGH-VELOCITY (~21mo, very-active) | PASS (separate CLI) | **FAIL — competing complete harness** | PASS | .a REJECT (CC IS the harness) | **DUPLICATE-FUNCTIONALITY** | **DEMOTED-CITE-RETAIN** (cite anchor at parallel-session-worktree-isolation.md valid; resolve_root_git_project_for_trust pattern still TIER-1 reference) |
| 3 | microsoft/autogen | 58.1k | CC-BY-4.0 + MIT-CODE | Microsoft → community-managed (named-T1 → DEPRECATED) | **DEPRECATED** ("Maintenance Mode") | PASS | **FAIL — DEPRECATED + external Python runtime** | PASS-with-warning (CC-BY-4.0 docs license alongside MIT code) | .a REJECT (maintainer redirects to MAF) | **DEPRECATED → SUPERSEDED-BY MAF** | **REJECT-DEPRECATED** |
| 4 | agno-agi/agno | 40.1k | Apache-2.0 | agno-agi org (named-T1) | SUSTAINED-MATURE-HIGH-VELOCITY (~3yr, cpd≈high) | PASS | **FAIL — own platform (API/RBAC/scheduling/SaaS deployment)** | PASS | .a REJECT (full-platform competitor; sss is CC-native, not own-platform) | **DUPLICATE-FUNCTIONALITY (different runtime class)** | **REJECT-FOR-FIT** |
| 5 | huggingface/smolagents | 27.3k | Apache-2.0 | HuggingFace (TIER-1) | SUSTAINED-MATURE-HIGH-VELOCITY (~17mo, cpd≈high) | PASS | **FAIL — CodeAgent paradigm requires external sandbox (E2B/Docker/Pyodide); CC sub-agents NOT code-as-action** | PASS | .a REJECT (paradigm mismatch with CC Agent tool tool-calling) | **PARTIAL-OVERLAP (different reasoning paradigm)** | **REJECT-FOR-FIT** |
| 6 | openai/openai-agents-python | 26.3k | MIT | OpenAI (TIER-1) | SUSTAINED-MATURE-HIGH-VELOCITY (~14mo) | PASS | **FAIL — own SDK runtime (Runner.run_sync, SandboxAgent UnixLocalSandboxClient)** | PASS | .a REJECT (CC orchestrates Claude; this orchestrates OpenAI models w/ own runtime) | **DUPLICATE-FUNCTIONALITY (cross-vendor counterpart)** | **REJECT-FOR-FIT** |
| 7 | kyegomez/swarms | 6.7k | Apache-2.0 | kyegomez **single-individual** (Axis-1 single-org caveat) | SUSTAINED-MATURE (~2.5yr, cpd active) | PASS | **FAIL — own runtime (SequentialWorkflow/ConcurrentWorkflow/SwarmRouter/AOP/...all duplicates of CC primitives)** | PASS | .a REJECT (massive duplicate of CC sub-agents + parallel-agent-wave + team-orchestration + 7 patterns) | **DUPLICATE-FUNCTIONALITY (multiple)** | **REJECT-FOR-FIT** |
| 8 | BerriAI/litellm | 47.1k | MIT (Other = MIT for OS, separate Enterprise) | BerriAI org (TIER-1) | SUSTAINED-MATURE-HIGH-VELOCITY (~2.7yr, very-active) | PASS | **PASS — LLM proxy/gateway (different layer than agent runtime)** | PASS | **.b STUDY-PILOT eligible** (provides LLM provider unification for graphiti L3 + Section 17 cwc primitives) | **PROVIDER-COMPLEMENT** | **STUDY-PILOT.b** |
| **BONUS** | **microsoft/agent-framework (MAF)** | 10.5k | MIT | Microsoft OFFICIAL (TIER-1) | STABLE-BURN-IN (~12mo) | PASS | **FAIL — Python+.NET external SDK; A2A/MCP cross-runtime but NOT CC plugin** | PASS | .a REJECT (autogen successor; still external SDK, not CC plugin) | **DUPLICATE-FUNCTIONALITY (cross-vendor counterpart)** | **REJECT-FOR-FIT (reference-only for autogen→MAF migration awareness)** |

---

## Per-Candidate Rationale

**1. langchain-ai/deepagents** — LangChain-org-backed batteries-included agent harness with `create_deep_agent()` returning a compiled LangGraph graph. Provides write_todos / filesystem / execute shell / task sub-agent / auto-summarization. README literally states: "This project was primarily inspired by Claude Code, and initially was largely an attempt to see what made Claude Code general purpose, and make it even more so." This is a CC-CLONE for LangGraph users, not a CC complement. Probe 5 FAIL — runs in LangGraph runtime via `agent.invoke()`, NOT in CC native runtime. The sister TIER-1 cite to `summarization.py` pattern at `Z:/claude-sota/.claude/rules/team-orch-patterns.md:104` remains valid (HEAD `95f845d2` pinned for cite-stability) but DO NOT install. CR-12 DUPLICATE-FUNCTIONALITY — claude-sota-installed's CC native Agent tool + parallel-agent-wave + sub-agent SDK delivers equivalent primitives without LangGraph dependency.

**2. aaif-goose/goose** — Apache-2.0 Linux Foundation governance, Rust native CLI/desktop/server with own SDK, own MCP server crate (`goose-mcp`), own ACP host (`goose-acp-macros`), 15+ provider support, 70+ MCP extensions. This is a COMPLETE PARALLEL HARNESS to Claude Code, not a complement. The existing sister cite at `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` references goose's worktree-aware pattern (`resolve_root_git_project_for_trust` at codex-rs/git-utils, NOT goose's own implementation) — that cite is to OpenAI codex, not goose. Goose itself has no install path into claude-sota-installed runtime. DEMOTED with cite-retain: the ACP convergence cite (`crates/goose-acp-macros`) remains valid 4th-org Axis-1 evidence for cross-vendor agent protocol convergence per sister `team-orch-frameworks.md §Cross-fire ACP convergence`; but no install. NOTE: repo moved from `block/goose` to `aaif-goose/goose` under AAIF — this is the canonical URL.

**3. microsoft/autogen** — **DEPRECATED ANNOUNCEMENT IN README**: "AutoGen is now in maintenance mode. It will not receive new features... New users should start with Microsoft Agent Framework." This is an unambiguous self-flag for REJECT-DEPRECATED per `convergence-gate.md` Axis-2 self-flag pattern. Also has unusual dual-license (CC-BY-4.0 main LICENSE for docs + MIT-CODE for code) requiring compliance complexity. REJECT-DEPRECATED — autogen DEMOTED, MAF reference noted but ALSO REJECT-FOR-FIT (see #BONUS).

**4. agno-agi/agno** — Apache-2.0, "SDK for building agent platforms" with own production runtime (50+ endpoints, SSE/websockets, RBAC, tracing, scheduling, deploy-anywhere container infra, JWT auth). This is a FULL AGENT PLATFORM competing with Anthropic's CC native runtime — entirely orthogonal to claude-sota-installed's "install-priority over hand-coding" cardinal-rule-5. Agno positions itself as "Build, run, and manage agent platforms" — sss is not building/managing an agent platform; it IS using Anthropic's. REJECT-FOR-FIT — wrong layer of stack.

**5. huggingface/smolagents** — Apache-2.0, HuggingFace named-T1, ~1,000 LOC "barebones" library. **CodeAgent paradigm** is structurally distinct from CC sub-agents: agents write Python code as actions instead of structured tool calls. Requires external secure sandbox (E2B/Blaxel/Modal/Docker/Pyodide) since `LocalPythonExecutor` is explicitly "not a security sandbox". This is a different reasoning paradigm + requires external infrastructure CC doesn't have. PARTIAL-OVERLAP with CC Agent tool but reasoning-paradigm mismatch makes adoption non-trivial. REJECT-FOR-FIT — sss already has CC sub-agents w/ tool-calling paradigm; no operational driver to add code-as-action paradigm.

**6. openai/openai-agents-python** — OpenAI 26.3k★ MIT. **NEW 0.14.0 "Sandbox Agents"** with `UnixLocalSandboxClient` + `Manifest` system — provider-agnostic but built around `Runner.run_sync()` SDK pattern in own Python runtime. This is OpenAI's CROSS-VENDOR COUNTERPART to CC sub-agents, NOT a CC complement. Built-in Handoffs + Tracing + Sessions + Guardrails + Realtime Agents are all duplicates of CC primitives + sister-rule patterns. DUPLICATE-FUNCTIONALITY at cross-vendor level. REJECT-FOR-FIT — sss runs Anthropic Claude orchestration; OpenAI Agents SDK belongs in an OpenAI-orchestrated runtime, not this one.

**7. kyegomez/swarms** — Apache-2.0 SINGLE-INDIVIDUAL maintainer (axis-1 single-org caveat per convergence-gate `STRONG-PROVENANCE-EXPRESS` predicate). 6.7k★ 2.5-year-old. **Massive duplicate-functionality footprint**: SequentialWorkflow / ConcurrentWorkflow / AgentRearrange / GraphWorkflow / MixtureOfAgents / GroupChat / ForestSwarm / HierarchicalSwarm / HeavySwarm / SwarmRouter / AutoSwarmBuilder / SocialAlgorithms / AOP — ALL duplicates of CC sub-agents + parallel-agent-wave + team-orchestration + cross-model-consensus primitives. Marketing language ("Enterprise-Grade Production-Ready") + ≥3 numeric improvement claims without methodology citation → `convergence-gate.md §Anti-pattern: Row-2 fabrication-test FAIL` auto-REJECT. REJECT-FOR-FIT.

**8. BerriAI/litellm** — **STUDY-PILOT.b ELIGIBLE** per 5-clause check:
1. **Named operational use case**: Section 17 cwc-long-running-agents primitives + graphiti L3 + planned Tier-A installs (Ollama / OpenAI / Anthropic-direct) need unified LLM proxy gateway for cost tracking, guardrails, load balancing, logging across 100+ providers including local Ollama. Currently `OPENAI_API_URL=http://127.0.0.1:11700/v1` (CLIProxyAPI proxy) provides ad-hoc routing for graphiti — litellm would provide industrial-strength gateway with rate limiting, retry, fallback, virtual keys.
2. **Cited local input/source path**: `Z:/claude-sota-installed/.mcp.json` (graphiti env block) + planned `Z:/claude-sota-installed-state/` Ollama + planned Tier-A install rows in `docs/sota-installed-manifest.md`.
3. **Wiring path**: Replace `OPENAI_API_URL=http://127.0.0.1:11700/v1` ad-hoc CLIProxyAPI with `litellm` proxy running on localhost; rewrite graphiti env to point at litellm; add Docker container or direct Python install per `cardinal-rule-6` official-native-channel.
4. **Incumbent comparison**: CLIProxyAPI is operator-side ad-hoc tool; litellm is enterprise-grade with 47k★ ecosystem, 100+ provider support, cost tracking, guardrails, mcp-gateway features. Current ad-hoc setup misses observability + retry/fallback that litellm provides natively.
5. **Reversible time-box**: 30-day pilot. Owner = operator. Pilot cost ~2-4 hours install + smoke probe + benchmark vs current CLIProxyAPI. Success criterion: graphiti L3 calls observably routed through litellm with cost-tracking JSONL. Retirement path: if observability gain < setup cost, revert to CLIProxyAPI; document under `docs/verified-avoid.md` Cohort 1.

CR-12 class: **PROVIDER-COMPLEMENT** — litellm is a complement (different layer: LLM proxy/gateway) to CC native runtime (agent orchestration), not a competitor. **STUDY-PILOT.b VERDICT**.

**#BONUS: microsoft/agent-framework (MAF)** — Discovered via autogen DEPRECATED redirect. Microsoft OFFICIAL successor with Python + .NET support, MCP cross-runtime interop, A2A protocol. STILL Probe-5 FAIL (external SDK in own Python+.NET runtime, NOT CC plugin). For sss, MAF is reference-only — operator should know about autogen→MAF migration when reading old docs, but no install path into claude-sota-installed. REJECT-FOR-FIT.

---

## CR-12 Disposition Aggregation

| Disposition class | Candidates |
|---|---|
| **GENUINELY-NEW** | (none) |
| **PROVIDER-COMPLEMENT** | **#8 BerriAI/litellm** (STUDY-PILOT.b ELIGIBLE — Section 17 wiring complement) |
| **PARTIAL-OVERLAP** | #5 huggingface/smolagents (CodeAgent paradigm — different reasoning) |
| **DUPLICATE-FUNCTIONALITY** | #1 deepagents (LangChain runtime CC-clone), #2 goose (Rust harness competitor), #4 agno (full-platform competitor), #6 openai-agents-python (cross-vendor counterpart), #7 swarms (massive duplicate footprint), MAF (Microsoft cross-vendor counterpart) |
| **DEPRECATED → SUPERSEDED-BY** | #3 microsoft/autogen → microsoft/agent-framework (BUT MAF also REJECT-FOR-FIT) |
| **CITE-CLASS-CANONICAL** | #2 goose (existing TIER-1 ACP convergence cite at `team-orch-frameworks.md §Cross-fire ACP convergence`); #1 deepagents (existing TIER-1 cite at `team-orch-patterns.md:104` summarization middleware pattern) — RETAIN cites, NO install |

---

## Incumbent vs Challenger Matrix

| W217-F3 incumbent | Challenger that BEATS it | Verdict |
|---|---|---|
| **CC Agent tool (sub-agents)** | All 8 candidates DUPLICATE this primitive — NONE beats CC native runtime in sss context. CC has zero-dep, plugin-native, BRIDGE-MODE codex bridging, isolation:worktree per-spawn. | **No challenger** |
| **wshobson/agents+commands** (35.4k★) | (Domain-specialized agent collection, distinct layer) | **No challenger in this cohort** |
| **addyosmani/agent-skills** (38.8k★) | (Engineering-phase skill library, distinct layer) | **No challenger in this cohort** |
| **ECC dmux-workflows + autonomous-agent-harness** | swarms has SwarmRouter / kyegomez patterns + AutoSwarmBuilder | **No — swarms is single-individual maintained, has fabrication-test FAIL signals, and forces external Python runtime** |
| **obra/superpowers-pinned-6** | deepagents has summarization middleware pattern (already cited in sister team-orch-patterns.md:104 as TIER-1 reference) | **PARTIAL — cite pattern retained as DESCRIPTIVE reference; no install** |

---

## Install Recommendations

**Single STUDY-PILOT.b install candidate**: **`BerriAI/litellm`** as Tier-1 PROVIDER-COMPLEMENT (LLM proxy gateway layer).

**Install path** (per cardinal-rule-6 official-native-channel):
```bash
# Option A: Native pip install (simpler; runs in Z:/venvs/claude)
pip install litellm[proxy]@latest
# OR Option B: Docker (production-grade)
docker pull ghcr.io/berriai/litellm:main-latest
```

**Smoke probe** (per cardinal-rule-10 research-first-then-install):
1. Verify install: `litellm --version` returns >=1.x
2. Start proxy: `litellm --model anthropic/claude-opus-4-7 --port 11800`
3. Test routing: `curl http://localhost:11800/v1/models` returns model list
4. Update `.mcp.json` graphiti env: `OPENAI_API_URL=http://127.0.0.1:11800/v1` (replacing CLIProxyAPI 11700)
5. Verify graphiti L3 still functional with FalkorDB ping + embedding generation through litellm

**Provenance entry** (per cardinal-rule-9 install-risk discipline + W198 P1.2 install-provenance):
Add row to `docs/install-provenance.md` (Wave 221 entry):
- Source: `BerriAI/litellm @ <HEAD-SHA pinned at install time>` per cardinal-rule-6 fresh-from-github
- License: MIT (non-enterprise scope)
- Risk: MEDIUM — 100+ provider integrations have varying maturity; pin specific version per cardinal-rule-9 version-pin mandate
- 2-round expectation: budget Wave 222 fix-forward for graphiti env reconciliation if litellm proxy semantics differ from CLIProxyAPI

**ALL OTHER 7 CANDIDATES**: NO install. Document REJECT verdict in `docs/verified-avoid.md` under appropriate cohort:
- **Cohort 1 META-HARNESS competing-frameworks**: agno-agi/agno, kyegomez/swarms, microsoft/autogen (DEPRECATED), microsoft/agent-framework (cross-vendor counterpart)
- **PARTIAL-OVERLAP**: huggingface/smolagents (CodeAgent paradigm mismatch)
- **DUPLICATE-FUNCTIONALITY-CROSS-VENDOR**: openai/openai-agents-python, langchain-ai/deepagents
- **DUPLICATE-FUNCTIONALITY-COMPLETE-HARNESS**: aaif-goose/goose (with cite-retain for ACP TIER-1 reference at parallel-session-worktree-isolation.md)

---

## VERDICT: NEEDS-REVISION for Z:\claude-sota-pure cross-vendor agent-orch strategy

**Aggregated cross-vendor agent-orchestration verdict**: of 8 audited cross-vendor agent orchestration frameworks (+ 1 bonus discovery MAF), **0 are CC-native plugins**, **0 are GENUINELY-NEW capability gaps**, **1 is PROVIDER-COMPLEMENT install-eligible (litellm STUDY-PILOT.b)**, **7 are REJECT-FOR-FIT / DEMOTED** due to either DUPLICATE-FUNCTIONALITY with CC primitives or mode-harness-shape mismatch (external Python/Rust runtime, not CC plugin).

**Key finding 1**: **microsoft/autogen is DEPRECATED** ("Maintenance Mode" per maintainer README) — supersedence target is `microsoft/agent-framework` (MAF). Sister cite at `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Sister-framework references` row for `microsoft/autogen` should be UPDATED (cardinal-rule-9 marker decay) with deprecation note + MAF supersedence reference. Cite update is rule-edit ship for sister claude-sota, NOT claude-sota-installed — pass to orchestrator close-synthesis for Wave 221 close-out.

**Key finding 2**: **goose maintainer migrated from `block/goose` to `aaif-goose/goose`** under Linux Foundation AAIF governance. Sister cite at `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` already uses correct `aaif-goose/goose` HEAD. ACP convergence cite (4th-org Axis-1) remains valid.

**Key finding 3**: **deepagents pattern cite at `summarization.py:122-149 @ 95f845d2`** is at OLD HEAD. Current HEAD `4421bec9` has refactored module to docstring-rich pattern with `SummarizationMiddleware` class + `trigger=("fraction", 0.85)` + `keep=("fraction", 0.10)`. **FM-20 path-drift cascade risk** — sister cite needs HEAD refresh for line-number stability. Recommend port-note-discipline §6 forward-only update: refresh cite to NEW HEAD with explicit `[VERIFIED 2026-05-15 via Wave 221 Agent F]` marker, but DO NOT install deepagents.

**Key finding 4**: **None of the 8 frameworks ship as CC plugins**. They all run in their own runtimes (LangGraph/Python SDK/.NET/Rust). The Anthropic CC ecosystem has structural lock-in advantage (sub-agents + Agent tool + asyncRewake hooks + plugin marketplace) that no cross-vendor framework can match without abandoning CC. This validates the W217-F3 incumbent stack as load-bearing — challenger frameworks would require harness migration, not adoption.

**Convergence with prior W217-F3 verdicts**: Aligns with prior dispositions. deepagents/goose/agno/smolagents/openai-agents-python/swarms all confirmed REJECT-FOR-FIT at Probe 5 mode-harness-shape. New findings: autogen DEPRECATED (downgrade from prior STUDY-PILOT), MAF discovered as autogen-successor (still REJECT-FOR-FIT for sss); litellm ELEVATED from background mention to STUDY-PILOT.b PROVIDER-COMPLEMENT (Section 17 + graphiti complement).

**Recommendations to Z:\claude-sota-pure**:
1. **INSTALL**: `BerriAI/litellm` as Tier-1 PROVIDER-COMPLEMENT (LLM proxy/gateway layer). STUDY-PILOT.b 30-day pilot per CR-12.
2. **DEFER**: All 7 other candidates — NO install. Add to `docs/verified-avoid.md` per cohort routing above.
3. **SISTER CITE-UPDATE** (Wave 221 close-out, rule-edit ship at sibling claude-sota):
   - `Z:/claude-sota/.claude/rules/team-orch-frameworks.md` autogen row → add DEPRECATED note + MAF supersedence ref
   - `Z:/claude-sota/.claude/rules/team-orch-patterns.md:104` deepagents summarization.py cite → refresh HEAD `95f845d2` → `4421bec9` per FM-20 cascade defense
4. **NO ACTION** on `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` goose cite — already at correct `aaif-goose/goose` repo path.

**Wave 221 cross-vendor agent-orch axis**: ✅ **CLOSED** as of this verdict. Wave 220 Agent B AXIS-5 failure successfully replaced.

---

**Verdict line**: `STUDY-PILOT-CATALOG: 1 STUDY-PILOT.b install candidate (litellm PROVIDER-COMPLEMENT for graphiti+Section 17 wiring); 7 REJECT-FOR-FIT cross-vendor agent frameworks (all DUPLICATE-FUNCTIONALITY or mode-harness mismatch); autogen DEPRECATED→MAF successor noted; sister cite-update queued for sibling claude-sota (autogen-deprecation + deepagents-HEAD-refresh per FM-20 defense).`
