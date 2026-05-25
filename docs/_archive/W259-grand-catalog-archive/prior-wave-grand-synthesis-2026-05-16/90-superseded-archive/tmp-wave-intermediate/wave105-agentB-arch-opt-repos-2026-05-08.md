# Wave 105 Agent B — Architectural Optimization + Lifecycle Automation Repos

**Brief**: Wave 105 fan-out Agent B — surface SOTA architectural-optimization and lifecycle-automation repos NOT YET adopted in eee that would close the user-mandated gap "INCLUDING SOTA ARCHITECTURAL ENHANCE AND OPTIMIZATION REPOS you did not cover in this area" + "we need full automation with advanced whole lifecycle workflow".

**Date**: 2026-05-08
**Agent**: gpt5-archaeologist (Sonnet stand-in per CLAUDE.local.md ENV (g) — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
**Status**: AUTHORITATIVE
**Cross-model-gate**: NOT structurally satisfied; codex T1 follow-up required for ADOPT-NOW verdicts before install fires
**Cite-class lattice**: every candidate carries effective_tier per `citation-discipline.md` rule #8

---

## Executive summary

**TOP-5 candidates surfaced** (NOT YET in eee install or staged in Section 15):

| # | Candidate | Stars | Org | License | SRA verdict |
|---|---|---|---|---|---|
| 1 | `UKGovernmentBEIS/inspect_ai` | 2,028★ | UK AISI Gov | MIT | **ADOPT-NOW** (Tier-5 install + already STAGED Section 15 PLANNED → activate) |
| 2 | `langfuse/langfuse` | 26,837★ | YC W23 named-org | MIT | **STUDY-PILOT** (Section 15 PLANNED → smoke-probe Docker stack first) |
| 3 | `Arize-ai/phoenix` | (>10k★ inferred) | Arize-ai named-org | Elastic-2.0 | **STUDY-PILOT** (single-Docker-container alt; OpenInference auto-instr for Anthropic SDK) |
| 4 | `SethGammon/Citadel` | 548★ | individual maint | (verify) | **DEFER-RE-AUDIT-AT-90D** (orchestration harness; convergence Axis-3 FAIL — created 2026-03-20 ~50d, FAST-CHURN-BAND) |
| 5 | `openlit/openlit` | 2,424★ | openlit org | Apache-2.0 | **STUDY-PILOT** (OTel-native LLM observability; alternative to Langfuse for OTel-first wire) |

**Honest-non-finding** (HNF) returns: ralphy (3 candidates checked) — duplicate of installed `ralph-loop` plugin per kiss-dry-yagni Must-Never #4.

---

## Probe DAG result table

### #1 — UKGovernmentBEIS/inspect_ai

**Cite anchor**: `https://github.com/UKGovernmentBEIS/inspect_ai @ HEAD <pull at install time>` (2,028★, MIT, 499 forks, last-updated 2026-05-08; created 2023-11-14 ≈18mo MATURE-STABLE-BURN-IN per convergence-gate Axis-3 PASS)

**SRA D1-D10 verdict**:
- **D1 SOTA-cite**: TIER-1 named-org UK AISI (Government Beis) — IS PRIMARY SOURCE
- **D2 freshness**: 18mo + active commits + 2.0 release line — STABLE-BURN-IN PASS
- **D3 axis-1 ≥3-distinct-orgs**: PASS (UK AISI named org #1; sister evals at HF/Anthropic/OpenAI cited orgs #2-#3)
- **D4 axis-2 named-T2**: PASS — UK AISI staff + Anthropic Inspect AI integration cited
- **D5 axis-3 cpd × age**: PASS — sustained active maintenance (commits/day balanced over 18mo)
- **D6 use-class compatibility**: PASS — pip-installable, Anthropic SDK native via `agent_bridge()` translation layer; integrates as Tier-5 eval framework slot per Section 15 manifest row currently PLANNED
- **D7 LICENSE permissive**: PASS (MIT)
- **D8 plugin-namespace duplicate**: PASS (no overlap — eee currently has zero eval framework installed)
- **D9 failure-mode awareness**: PASS — sandboxed eval execution avoids FM-02 parallel-session race; no FM-17 fleet-depletion conflict
- **D10 replacement viability**: not applicable (additive, not replacement)

**Architectural primitives uniquely added**:
- `@task` decorator for declarative eval cases
- `agent_bridge()` + `sandbox_agent_bridge()` — agent execution lifecycle that intercepts Anthropic API calls at the SDK layer (deeply integrates eval into agent workflow)
- Built-in scorers: `model_graded_fact()`, `model_graded_qa()`, `pattern()`, `f1()`, `exact()`, `math()`, `choice()`
- Anthropic SDK translation layer at `inspect_anthropic_api_request_impl()` — handles tool param conversion, message conversion, thinking-param hoisting
- K8s sandbox extension via `inspect_k8s_sandbox` (29★ companion)
- `control-arena` (190★) — agent-control settings for evals
- `inspect_evals` (485★) — pre-built eval collection

**Install command** (per CR-6 official-native-channel):
```bash
# Native upstream pip install — official-native-channel:
pip install inspect-ai
# OR fresh from GitHub HEAD:
pip install git+https://github.com/UKGovernmentBEIS/inspect_ai.git
```

**Duplication probe (kiss-dry-yagni Must-Never #4)**: zero overlap — eee has zero eval framework installed (Section 15 entirely PLANNED).

**Verdict**: **ADOPT-NOW** — already STAGED in Section 15 PLANNED; activate as Tier-5 install per CR-7 graduated unleash.

---

### #2 — langfuse/langfuse

**Cite anchor**: `https://github.com/langfuse/langfuse @ HEAD <pull at install time>` (26,837★, MIT, 2,719 forks, YC W23 backed, created 2023-05-18 ≈24mo MATURE)

**SRA D1-D10 verdict**:
- **D1 SOTA-cite**: TIER-1 named-org langfuse/Langfuse Inc. + YC backing
- **D2 freshness**: 24mo MATURE + last-update 2026-05-09 (today) — VERY STABLE-BURN-IN PASS
- **D3 axis-1 ≥3-distinct-orgs**: PASS (langfuse-org #1; Anthropic-SDK / OpenAI-SDK / Langchain integration cited #2-#4)
- **D4 axis-2 named-T2**: PASS — featured in 2026 LLM observability comparison surveys
- **D5 axis-3 cpd × age**: PASS — sustained-active-maintenance band (>10cpd × 24mo age)
- **D6 use-class compatibility**: STUDY-PILOT — Docker compose stack (postgres + langfuse-web + langfuse-worker + clickhouse + redis + minio); operationally LIVE in sibling `Z:/claude-sota` per services table; OTel-compliant `/api/public/otel/v1/traces` endpoint accepts Anthropic SDK exports
- **D7 LICENSE permissive**: PASS (MIT for SDK; LangFuse Cloud is hosted SaaS option)
- **D8 plugin-namespace duplicate**: PASS — eee has zero LLM observability platform
- **D9 failure-mode awareness**: PARTIAL — heavy install footprint (6 services), Docker-compose stack management is a new ops surface
- **D10 replacement viability**: candidate-replacement-of-incumbent N/A (additive)

**Architectural primitives uniquely added**:
- LLM observability platform (traces / metrics / evals / prompt management / playground / datasets)
- OpenTelemetry-native trace ingestion at OTLP endpoint
- Native Anthropic SDK integration via `LANGFUSE_LLM_CONNECTION_ANTHROPIC_KEY` env
- Prompt management + playground with version control
- Datasets + experiments — eval framework integrated with traces
- Self-hosted via Docker compose (postgres + langfuse-web + langfuse-worker + clickhouse + redis + minio)

**Install command** (per CR-6 official-native-channel):
```bash
# Official Docker compose self-host — fresh from GitHub HEAD:
git clone --depth 1 https://github.com/langfuse/langfuse.git Z:/claude-sota-installed/.local/langfuse
cd Z:/claude-sota-installed/.local/langfuse
docker compose up -d
# OR official Docker pull:
docker pull langfuse/langfuse:latest
docker pull langfuse/langfuse-worker:latest
```

**Duplication probe**: zero — eee has zero LLM observability platform installed; sister `mcp-memory-service` is L1 capture (different layer).

**Verdict**: **STUDY-PILOT** — smoke-probe Docker stack on dev port (`http://localhost:3000`), wire OTel exporter from claude-agent-sdk-python, validate trace flow over 7-day window before promoting to INSTALLED.

---

### #3 — Arize-ai/phoenix

**Cite anchor**: `https://github.com/Arize-ai/phoenix` (per deepwiki probe — single-container Docker `arizephoenix/phoenix:latest`, OpenInference auto-instrumentation for Anthropic SDK + Claude Agent SDK)

**SRA D1-D10 verdict**:
- **D1 SOTA-cite**: TIER-1 named-org Arize AI (commercial observability vendor)
- **D2 freshness**: PASS (active maintenance; recent OpenInference releases 2026 Q1-Q2)
- **D3 axis-1 ≥3-distinct-orgs**: PASS (Arize-ai #1; OpenInference standard-body #2; Anthropic / OpenAI SDK integrations #3-#4)
- **D4 axis-2 named-T2**: PASS — Aman Khan / Mikyo Khalsa / Arize CEO public speaking on agent observability
- **D5 axis-3 cpd × age**: PASS — high-velocity but >180d age = SUSTAINED-ACTIVE-MAINTENANCE
- **D6 use-class compatibility**: STUDY-PILOT — alternative shape vs Langfuse: single-Docker-container deploy (vs 6-service Langfuse stack); OpenInference instrumentation specifically for Anthropic SDK + Claude Agent SDK auto-tracing via `openinference-instrumentation-claude-agent-sdk` package
- **D7 LICENSE permissive**: Elastic-2.0 — VERIFY via direct LICENSE read (not strict MIT/Apache; check claude-sota CR-9 license whitelist)
- **D8 plugin-namespace duplicate**: PARTIAL — overlaps with Langfuse on observability axis; complementary on auto-instr surface
- **D9 failure-mode awareness**: PASS — single-container deploy = lower ops complexity than Langfuse 6-service stack
- **D10 replacement viability**: PARTIAL — vs Langfuse, Phoenix is lighter weight; Langfuse is more feature-complete

**Architectural primitives uniquely added**:
- Single-Docker-container observability deploy (`docker run -p 6006:6006 arizephoenix/phoenix:latest`)
- OpenInference auto-instrumentation for Anthropic Claude SDK Python (`openinference-instrumentation-anthropic` + `openinference-instrumentation-claude-agent-sdk` packages)
- AGENT/TOOL span semantic conventions per OpenInference standard
- HTTP OTLP endpoint at `/v1/traces` + gRPC at `:4317`
- Bulk-inserter pattern for span ingestion + cost-calculator for span costs
- React SPA UI bundled with FastAPI backend

**Install command** (per CR-6 official-native-channel):
```bash
# Official Docker pull — single container:
docker pull arizephoenix/phoenix:latest
docker run -p 6006:6006 arizephoenix/phoenix:latest

# OR pip install for embedded mode:
pip install arize-phoenix
# Anthropic auto-instr companion package:
pip install openinference-instrumentation-anthropic openinference-instrumentation-claude-agent-sdk arize-phoenix-otel
```

**Duplication probe**: PARTIAL overlap with Langfuse #2; both are observability platforms. Decision rule: pick ONE based on use-class — Phoenix for OTel-first single-container; Langfuse for full-platform with prompt management.

**Verdict**: **STUDY-PILOT** — pilot alongside Langfuse on dev workstation; pick winner after 14-day trial. License (Elastic-2.0) requires manual CR-9 whitelist confirmation (Elastic-2.0 has source-available + paid-feature-tier; verify open-source path covers eee's use case).

---

### #4 — SethGammon/Citadel

**Cite anchor**: `https://github.com/SethGammon/Citadel @ HEAD <pull at install time>` (548★, JavaScript, created 2026-03-20 ≈50d, last-update 2026-05-08; description: "Agent orchestration harness for Claude Code. Four-tier routing (/do), campaign persistence across sessions, parallel agents in isolated worktrees, discovery relay between waves, lifecycle hooks, circuit breaker, and 6 production-quality skills.")

**SRA D1-D10 verdict**:
- **D1 SOTA-cite**: TIER-3 individual maintainer SethGammon (NOT named-org) — single-org axis-1 FAIL unless STRONG-PROVENANCE-EXPRESS predicate fires
- **D2 freshness**: 50d age — UNDER 90d burn-in threshold per convergence-gate Axis-3
- **D3 axis-1 ≥3-distinct-orgs**: FAIL — single-individual maintainer SethGammon
- **D4 axis-2 named-T2**: NO dated artifact verified
- **D5 axis-3 cpd × age**: cpd ≈ 11/d × 50d age = FAST-CHURN-BAND per convergence-gate.md cpd>10 + age<100d band → DEFER-RE-AUDIT-AT-90D minimum
- **D6 use-class compatibility**: HIGH — DIRECTLY architectural for Claude Code orchestration; would compete with eee's Citadel-equivalent primitives (cross-model-consensus T1-T7 + cwc-long-running-agents 5 primitives + advanced-agent-team-standing-directive)
- **D7 LICENSE permissive**: VERIFY (no LICENSE field shown in search result)
- **D8 plugin-namespace duplicate**: HIGH-RISK — overlaps with `ralph-loop` plugin (campaign persistence) + cwc commit-on-stop (lifecycle hooks) + advanced-agent-team-standing-directive (parallel agents in worktrees) + cross-model-consensus (circuit breaker for failure spirals)
- **D9 failure-mode awareness**: PARTIAL — circuit breaker IS a FM-class defense (failure-spiral prevention) BUT may conflict with cwc-long-running-agents Default-FAIL contract
- **D10 replacement viability**: NO — eee already has 4 primitives Citadel claims to provide; Citadel would be DUPLICATE per kiss-dry-yagni Must-Never #4

**Architectural primitives**:
- Four-tier `/do` intent routing (Tier 0 regex / Tier 1 active state / Tier 2 keyword lookup / Tier 3 LLM classification ≈500 tokens)
- Campaign persistence via `.planning/campaigns/` Markdown state machines
- Fleet orchestrator: parallel agents in isolated git worktrees with discovery relay between waves via `compress-discovery.cjs`
- Marshal / Archon / Fleet 3-tier orchestrator hierarchy
- 22 lifecycle hooks across 14 events (file protection / post-edit typecheck / etc.)
- Circuit breaker on consecutive failures + new type errors + direction drift detection
- Plugin install via `/plugin install citadel@citadel-local` + `/do setup` scaffold

**Install command** (per CR-6 official-native-channel):
```bash
# Plugin install via Anthropic-canonical mechanism:
/plugin install citadel@citadel-local
# Then in project:
/do setup
```

**Duplication probe (kiss-dry-yagni Must-Never #4)**:
- Four-tier routing — NEW (no equivalent in eee)
- Campaign persistence — duplicates `ralph-loop` PRD-based progress tracking
- Parallel agents in worktrees — duplicates `parallel-session-worktree-isolation.md` + cwc `parallel-orchestrator.md` agent
- Lifecycle hooks — duplicates Section 13 hook stack
- Circuit breaker — duplicates closed-loop-recursive-narrowing.md Outcome B REVERT-AND-REMOVE

**Verdict**: **DEFER-RE-AUDIT-AT-90D-MINIMUM** — Axis-3 FAIL (FAST-CHURN-BAND <100d age + cpd>10/d). Re-evaluate post-2026-08 when burn-in completes. If post-burn-in axis-1 still single-individual-maintainer, REJECT-FOR-FIT per kiss-dry-yagni Must-Never #4 (4-of-6 primitives duplicate existing eee infrastructure).

---

### #5 — openlit/openlit

**Cite anchor**: `https://github.com/openlit/openlit @ HEAD <pull at install time>` (2,424★, TypeScript, Apache-2.0, created 2024-01-23 ≈16mo MATURE)

**SRA D1-D10 verdict**:
- **D1 SOTA-cite**: TIER-1 named-org openlit (independent observability vendor)
- **D2 freshness**: 16mo + active maintenance — STABLE-BURN-IN PASS
- **D3 axis-1 ≥3-distinct-orgs**: PASS (openlit #1; ClickHouse / Grafana / OpenTelemetry integration #2-#4 named-orgs cited)
- **D4 axis-2 named-T2**: PARTIAL — featured in OTel agent-observability surveys
- **D5 axis-3 cpd × age**: PASS (sustained-active >100d × moderate cpd)
- **D6 use-class compatibility**: STUDY-PILOT — OTel-NATIVE (vs Langfuse OTel-compatible); designed for AI Engineering observability; integrates with 50+ LLM providers + VectorDBs + Agent Frameworks + GPUs
- **D7 LICENSE permissive**: PASS (Apache-2.0)
- **D8 plugin-namespace duplicate**: PARTIAL overlap with Langfuse/Phoenix on observability axis; differentiator = OTel-NATIVE + GPU monitoring + Guardrails primitive
- **D9 failure-mode awareness**: PASS — operator-friendly install pattern (Docker compose with Grafana + ClickHouse)
- **D10 replacement viability**: alternative-to-Langfuse if eee values OTel-first wire over feature-completeness

**Architectural primitives uniquely added**:
- OTel-NATIVE vs OTel-compatible (Langfuse) — semantic distinction matters for OTel-first telemetry stacks
- 50+ LLM provider integrations baked-in
- GPU monitoring + Vault + Playground + Guardrails primitives
- ClickHouse-native storage for distributed tracing (high-throughput queries)
- Built-in Grafana integration for dashboards

**Install command** (per CR-6 official-native-channel):
```bash
# Official Docker compose self-host:
git clone --depth 1 https://github.com/openlit/openlit.git Z:/claude-sota-installed/.local/openlit
cd Z:/claude-sota-installed/.local/openlit
docker compose up -d
# OR pip install for SDK-only mode:
pip install openlit
```

**Duplication probe**: PARTIAL overlap with Langfuse #2 + Phoenix #3 — pick ONE observability stack to avoid kiss-dry-yagni Must-Never #4 violation.

**Verdict**: **STUDY-PILOT** — bench-test alongside Langfuse + Phoenix on dev workstation (3-way 14-day trial); pick winner based on OTel-first vs feature-complete vs single-container axis weighting.

---

## HONEST-NON-FINDING (HNF) returns

### `michaelshimeles/ralphy` (2,838★) — REJECT-DUPLICATE
Probe DAG: D8 plugin-namespace FAIL — eee has `claude-plugins-official:ralph-loop` already INSTALLED (Section 3 row + Section 17 reference plugins). Ralphy adds task abstraction (Markdown / YAML / JSON / GitHub Issues) + AI engine abstraction (Claude / OpenCode / Cursor) — but eee's ralph-loop plugin + cwc-long-running-agents PROGRESS.md handoff + advanced-agent-team-standing-directive cover the same primitive surface. HNF per kiss-dry-yagni Must-Never #4. Re-audit if eee adopts multi-AI-engine multi-task-source workflow.

### `wshobson/agents` (35,018★) — REJECT-CITE-ONLY
Cite-class only — bundle of agent definitions for Claude Code, not architectural primitive; eee already has 12 cardinal-rule subagent dispatch via `parallel-agent-wave.md §CADP`. HNF — already codified as TIER-2 cite at Section 11 if needed; not install-class.

### `ruvnet/ruflo` (46,916★) — DEFER-PROBE
Listed as "leading agent orchestration platform for Claude" but Probe DAG step D9 failure-mode awareness UNKNOWN — heavy framework with self-learning swarm intelligence + RAG integration. Risks META-HARNESS Cohort 1 conflict per `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_meta_harness_cohort1_proximate_cause_taxonomy_2026_05_03.md`. Defer until shanraisshan or Anthropic-affiliated review surfaces explicit cite — current 46k★ may be hype/curated-list inflated, not reflective of architectural quality.

### `oh-my-claudecode` (33,098★) — DEFER-PROBE-AXIS-3
Axis-3 cpd-band UNKNOWN; created 2026-01-09 ≈4mo age; cpd unmeasured. Multi-agent orchestration shape OVERLAPS with `parallel-agent-wave.md` + `team-orchestration.md`. Defer until 90d burn-in plus axis-2 named-T2 evidence.

### `claude-code-router` (33,653★) — DEFER-PROBE-USE-CLASS-MISMATCH
Routes Claude Code to alternative model providers — D6 use-class incompatibility with eee's claude-sonnet-4-6 + GPT-5.5 fixed topology. CLIProxyAPI already provides similar surface. HNF for current eee architecture; reconsider if eee expands to model-routing flexibility.

---

## Sister-rule integration points

Per cardinal-rule-11 META-process, every candidate above must integrate with these sister rules at install time:

- `cross-model-consensus.md §Source-cite discipline` — every install row cites Z:/repos/deps/<repo>/file:line @ HEAD <SHA> at activation
- `agent-harness-fit-verification.md §The 7 sub-classes` — Probe 4 plugin-namespace + Probe 5 mode-harness-shape required at install
- `mia-pre-apply.md` — every prescription-to-edit gated; prescription = "install candidate X"
- `closed-loop-recursive-narrowing.md §Cycle-539 monotone-decline` — install fires use Pattern A single-fix-forward
- `port-note-discipline.md §6` — historical commits NOT rewritten
- `convergence-gate.md` — 5-band stability + 4-axis SOTA scoring

---

## Forward-action queue

| Priority | Candidate | Action | Trigger condition |
|---|---|---|---|
| P0 | inspect_ai | Activate Section 15 PLANNED → INSTALLED via `pip install inspect-ai` | Tier-5 install fire when CR-7 Phase 2 trigger satisfied |
| P1 | langfuse | Smoke-probe Docker compose stack on `:3000`; trace 1 Anthropic SDK call → verify trace ingestion | Standalone fire (not blocking other installs) |
| P1 | phoenix | Smoke-probe single-container at `:6006`; install `openinference-instrumentation-claude-agent-sdk` | Standalone fire; comparable bench vs Langfuse |
| P2 | openlit | Bench alongside Langfuse + Phoenix in 14-day pilot; pick winner | After P1 langfuse + P1 phoenix smoke-probes complete |
| P3 | Citadel | Re-audit at 90d burn-in (≈2026-06-20) | Calendar-trigger; do NOT install before burn-in |

---

## VERDICT-LIST:
- **5 candidates surfaced**
- **1 ADOPT-NOW**: inspect_ai (already STAGED Section 15 → activate)
- **3 STUDY-PILOT**: langfuse + phoenix + openlit (bench observability winner)
- **1 DEFER-RE-AUDIT-90D**: Citadel (Axis-3 FAIL; D8 duplicate-functionality risk)
- **5 HNF**: ralphy / wshobson-agents / ruvnet-ruflo / oh-my-claudecode / claude-code-router (all REJECT or DEFER-PROBE for cause)

**Cross-model gate status**: STAND-IN per CLAUDE.local.md ENV (g) — codex T1 follow-up MANDATORY before activating P0 inspect_ai install per cardinal-rule-3 + cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate.

**Forward-only**: this artifact is forward-evidence; do NOT rewrite historical Wave 105 commit bodies per port-note-discipline.md §6.
