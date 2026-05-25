---
title: W217-G Cross-vendor Agent-Orchestration Stack SOTA-Convergence Audit
status: AUTHORITATIVE
date: 2026-05-15
agent: W217-G sota-researcher (Sonnet stand-in per FM-17.e)
scope: 10 cross-vendor agent-orchestration frameworks ("wshobson and more")
stand-in-notice: cross-model gate satisfied at W219 Path P codex T1 (parent arc)
fm17e-mitigation: NO large-file Reads / ctx_execute_file substitution / head_limit / bounded Bash
---

# W217-G — Cross-vendor Agent-Orchestration Stack SOTA-Convergence Audit

**Sister audit**: W217-F (Anthropic-OFFICIAL stack; agent-sdk-python / claude-agent-skills / claude-skills / pension-plus / etc.) — this audit covers cross-vendor frameworks and does NOT duplicate.

**User-named priority**: `wshobson/agents` ("wshobson and more") — audited first as explicit user-named target.

## R1 — Source discovery (≥4 sources per repo via gh api + GitHub MCP)

10 repos × R1 4-source probe (GitHub MCP metadata + README + license + structure inspection + Mia install-state probe). Full metadata captured at file:line + HEAD SHA per cardinal-rule-1.

## R2 — 7-Probe DAG verification + R1+R6+R7 results table

| # | Repo | Stars | Lic | Default branch latest | P1 count-OVER | P2 SDK-vs-CLI | P3 API | P4 plugin-namespace | P5 mode-harness-shape | P6 lic/registry blocker | P7 demand-gate | NATIVE-CC |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | **wshobson/agents** | 35,448 | MIT | 2026-05-14 (push) | PASS (80 plugins / 185 agents / 153 skills verified via marketplace.json sha `de21e8127aec1b8a7d76e356b40ad5b3253c6f5e`) | PASS (Claude Code plugin marketplace; native install) | PASS (Anthropic API via plugin) | **DUPLICATE — already installed** (per `installed_plugins.json:claude-code-workflows@1.6.0`; 8 wshobson plugins enabled) | PASS (autonomous /loop compat — no HARD-GATE) | PASS (MIT) | **PROVIDER-COMPLEMENT** for `claude-code-workflows` marketplace expansion | **✅ YES — `.claude-plugin/marketplace.json` confirmed; 80 sub-plugins** |
| 2 | nibzard/awesome-agentic-patterns | 4,531 | (unverified) | 2026-05-07 (push) | PASS (catalog; not framework) | PASS (catalog) | n/a | n/a — pure documentation catalog | PASS (read-only) | PASS | **CITE-CLASS-CANONICAL** — existing cite anchor at `Z:/repos/deps/awesome-agentic-patterns @ HEAD ffb427683ec77f3690f7fadfec7a7611d9e907d9` per `Z:/claude-sota/.claude/rules/parallel-sessions.md` | ❌ NO (vendor-neutral; cross-harness) |
| 3 | langchain-ai/deepagents | 22,825 | MIT | 2026-05-15 (push) | PASS (LangGraph-based harness) | FAIL (LangChain Python SDK; NOT Claude Code-native) | OpenAI-API + Anthropic-API + multi-provider via LangChain | FAIL — `.claude-plugin/marketplace.json` does NOT exist | FAIL (Probe 5 mode-harness-shape) — async LangGraph workflow assumes LangChain-managed StateGraph, NOT CC Agent tool | PASS (MIT) | **DUPLICATE-FUNCTIONALITY** — sub-agent dispatch via LangGraph fork conflicts with CC `Agent` tool per `Z:/claude-sota/.claude/rules/team-orchestration.md`; cite-class only via existing eee TIER-1 cite anchor | ❌ NO (LangChain framework) |
| 4 | microsoft/autogen | 58,060 | **CC-BY-4.0** | 2026-04-15 (push) | PASS | FAIL (Python framework; NOT CC-native) | OpenAI-API + Azure OpenAI | FAIL — no CC plugin | FAIL (Probe 5) — GroupChat + TerminationCondition assume Python SDK runtime; existing cite `microsoft/autogen v0.7.5` in `Z:/claude-sota/.claude/rules/coordination.md` covers patterns | **FAIL — Probe 6 license blocker**: CC-BY-4.0 is documentation license; redistribution of CC-licensed Python source is **non-standard for OSS install**; cite-class only | **CITE-CLASS-CANONICAL** — TerminationCondition vocab cite anchor per `Z:/claude-sota/.claude/rules/team-orch-patterns.md` Termination contract; do NOT install | ❌ NO |
| 5 | crewAIInc/crewAI | 51,481 | MIT | 2026-05-15 (push) | PASS | FAIL (Python framework — `Crew().kickoff()` SDK API) | OpenAI + multi-provider | FAIL — no CC plugin | FAIL (Probe 5) — Crew/Task/Process model assumes Python-managed orchestration | PASS (MIT) | **CITE-CLASS-CANONICAL** — `Crew().kickoff()` lifecycle cite per `Z:/claude-sota/.claude/rules/team-orch-experimental-teams.md` Team-Lifecycle Hygiene convergence (CrewAI / AutoGen / LangGraph SOTA pattern) | ❌ NO |
| 6 | langchain-ai/langgraph | 32,127 | MIT | 2026-05-14 (push) | PASS | FAIL (Python/TS SDK; LangChain-native) | OpenAI + Anthropic + multi-provider via LangChain | FAIL — no CC plugin | FAIL (Probe 5) — StateGraph + END node primitives assume Python LangGraph runtime | PASS (MIT) | **CITE-CLASS-CANONICAL** — `Command(goto, graph=PARENT)` Termination cite anchor per `Z:/claude-sota/.claude/rules/team-orch-patterns.md` (already in eee TIER-1 cite trail) | ❌ NO |
| 7 | jackmpcollins/magentic | 2,406 | MIT | 2026-03-11 (push — older) | PASS | FAIL (Python decorator-based LLM functions) | OpenAI-API + Anthropic-API | FAIL — no CC plugin | FAIL (Probe 5) — `@prompt` decorator model assumes Python function-as-agent; NOT CC agent shape | PASS (MIT) | **REJECT-FOR-FIT.a (Probe 7.a DEMAND-ABSENCE)** — no sss workflow consumes Python `@prompt` decorator; existing CC Skill tool covers structured-output use case | ❌ NO |
| 8 | huggingface/smolagents | 27,325 | Apache-2.0 | 2026-05-14 (push) | PASS | FAIL (HuggingFace Python framework) | HuggingFace Hub + multi-provider | FAIL — no CC plugin | FAIL (Probe 5) — `CodeAgent` primitive is free-form Python code execution; NOT CC Edit/Write/Bash shape | PASS (Apache-2.0) | **CITE-CLASS-CANONICAL** — `CodeAgent` code-execution-as-action paradigm reference; existing cite per `Z:/claude-sota/.claude/rules/team-orch-frameworks.md` Sister-framework table | ❌ NO |
| 9 | openai/openai-agents-python | 26,338 | MIT | 2026-05-15 (push) | PASS | FAIL (OpenAI Python SDK; OpenAI-API only) | OpenAI-API (Responses + Assistants) | FAIL — no CC plugin | FAIL (Probe 5) — `Runner` + `Handoff` + `Tracing` SDK primitives assume OpenAI-API + Python runtime | PASS (MIT) | **CITE-CLASS-CANONICAL** — `Handoff` + `Tracing` SDK primitives cite per `Z:/claude-sota/.claude/rules/team-orch-frameworks.md`; covered by codex CLI at runtime (NOT this SDK) | ❌ NO (OpenAI-SDK; codex CLI is the official cross-vendor primitive for CC) |
| 10 | agno-agi/agno | 40,144 | Apache-2.0 | 2026-05-15 (push) | PASS | FAIL (Python "build/run/manage agent platforms" framework) | multi-provider | FAIL — no CC plugin | FAIL (Probe 5) — framework-agnostic Python agent wrapper; NOT CC Agent tool shape | PASS (Apache-2.0) | **REJECT-FOR-FIT.a (Probe 7.a)** — no sss workflow consumes Python `Agent` framework; eee uses CC native `Agent` tool | ❌ NO |

## R3 — Axis 1+2+3 convergence-gate per `Z:/claude-sota/.claude/rules/convergence-gate.md` (≥3-distinct-orgs Axis 1)

**Cross-vendor framework cluster (autogen + crewai + langgraph + smolagents + openai-agents + agno + deepagents + magentic) — 8 distinct orgs Axis 1 PASS**; **Axis 2** ≥2 named T2 — PASS (LangChain Harrison Chase + Microsoft Chi Wang + CrewAI João Moura + HuggingFace Thomas Wolf + OpenAI staff); **Axis 3** stability — ALL repos >90d age + several years burn-in (autogen 32mo / crewai 31mo / langgraph 33mo / agno 48mo). However: **convergence on a CROSS-VENDOR-AGENT-ORCH-AS-CC-NATIVE-INSTALL pattern is REFUTED** — all 8 frameworks are Python-SDK-runtime; ZERO ship CC plugin marketplaces. Convergence shape is **"Python SDK framework for non-Claude-Code agent orchestration"** — distinct from claude-sota use case.

**wshobson cluster (Axis 1 single-org; user-named priority)** — Wave 138 Fire 1 sota-researcher already audited at REJECT-FOR-FIT-MAJORITY 76/80 = 95% rejection per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Phase 7 benchmark gate`. Wave 138 Fire 2 STUDY-PILOT-NARROW survivors: protect-mcp + signed-audit-trails + shell-scripting. **3/8 enabled wshobson plugins** in eee align with Wave 138 STUDY-PILOT verdicts (`protect-mcp`, `signed-audit-trails`, `shell-scripting`); 5/8 (agent-orchestration / agent-teams / comprehensive-review / context-management / review-agent-governance) installed POST-Wave-138 — need explicit Benchmark Gate Phase 7 verification BEFORE further wshobson plugin enabling.

## R4 — SRA D1-D10 use-class scoring (per `Z:/claude-sota/docs/sota-research-architecture.md` D1-D10)

Top 3 candidates per CR-12 disposition lattice (rest are HONEST-NON-FINDING for install per Probe 4 / Probe 7):

| Candidate | D1 use-class | D2 evidence | D3 freshness | D4 license | D5 maintenance | D6 compat | D7 install-class | D8 install-cost | D9 risk | D10 reversibility | SRA total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **wshobson/agents (whole marketplace)** | Multi-domain CC plugin marketplace | ✅ user-named + 35.4k★ + 185 agents/153 skills measured | ✅ push 2026-05-14 (today) | ✅ MIT | ✅ Seth Hobson active maintainer | ✅ NATIVE-CC marketplace | ✅ `/plugin marketplace add wshobson/agents` | ✅ Already installed (zero cost) | ⚠ Wave 138 76/80 REJECT-MAJORITY | ✅ `/plugin marketplace remove` | **8/10** |
| **wshobson agent-teams plugin (sub)** | Multi-agent parallel orchestration (CC Agent Teams API) | ✅ 4 agents/7 commands/6 skills + Anthropic CC `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` integration | ✅ v1.0.2 | ✅ MIT | ✅ active | ⚠ Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` per `Z:/claude-sota/.claude/rules/team-orch-experimental-teams.md` | ✅ NATIVE-CC sub-plugin (already enabled) | ✅ Zero cost (enabled) | ⚠ Experimental API; 8 known limitations per cite | ✅ `/plugin uninstall` | **8/10** |
| **wshobson agent-orchestration plugin (sub)** | Multi-agent context engineering + workflow orchestration | ✅ context-manager agent (148 lines; vector DB + KG + memory) + agent improvement workflows | ✅ v1.2.1 | ✅ MIT | ✅ active | ✅ inherit model (autonomous /loop compat) | ✅ NATIVE-CC sub-plugin (already enabled) | ✅ Zero cost (enabled) | ⚠ Context-manager DUPLICATES `Z:/claude-sota/.claude/rules/team-orch-state-spawning.md §Parent→Child State-Leak Avoidance` discipline | ✅ `/plugin uninstall` | **7/10** |

**Cross-vendor Python SDK frameworks (autogen / crewai / langgraph / deepagents / smolagents / openai-agents / agno / magentic)** — ALL SRA score **3-5/10** due to Probe 4 plugin-namespace FAIL + Probe 5 mode-harness-shape FAIL (Python SDK runtime, not CC Agent tool). **Disposition: CITE-CLASS-CANONICAL only — already in eee TIER-1 cite trail per `team-orch-frameworks.md` Sister-framework references table**.

## R5 — CR-12 6-class disposition per `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md`

| Repo | CR-12 disposition | Disposition rationale | Action |
|---|---|---|---|
| **wshobson/agents** (whole marketplace) | **DUPLICATE-FUNCTIONALITY (with PROVIDER-COMPLEMENT angle)** | Marketplace already installed; provides additional 73 sub-plugins NOT yet enabled. CR-12 TERTIARY (cite-import-AMBER not applicable — UPSTREAM). | **NO-OP** — already installed. STUDY-PILOT individual sub-plugin enables ONLY post-Phase-7-Benchmark-Gate per Wave 138 Fire 2 codification. Reject wholesale install-all per kiss-dry-yagni Must-Never #4. |
| **wshobson agent-teams / agent-orchestration / agent-teams-plugin / etc.** (sub-plugins) | **PROVIDER-COMPLEMENT** to eee's existing `Z:/claude-sota/.claude/rules/team-orchestration.md` + `team-orch-experimental-teams.md` ecosystem | Sub-plugins COMPOSE with existing eee team-orch rule layer; provide ready-made Agent Teams workflow primitives | **STUDY-PILOT** — 8 currently enabled; verify Phase 7 benchmark gate per Wave 138 Fire 2 before enabling more |
| **nibzard/awesome-agentic-patterns** | **CITE-CLASS-CANONICAL** | Already cited at `Z:/repos/deps/awesome-agentic-patterns @ HEAD ffb427683ec77f3690f7fadfec7a7611d9e907d9` per parallel-sessions.md | **NO-OP** — cite-trail complete |
| **microsoft/autogen** | **CITE-CLASS-CANONICAL (with Probe 6 license blocker)** | TerminationCondition vocab cite anchor already in eee TIER-1 cite trail | **NO-OP** — cite-only; do NOT install (CC-BY-4.0 license + Python SDK runtime) |
| **crewAIInc/crewAI** | **CITE-CLASS-CANONICAL** | `Crew().kickoff()` lifecycle cite already in eee TIER-1 cite trail per team-orch-experimental-teams.md | **NO-OP** — cite-only |
| **langchain-ai/langgraph** | **CITE-CLASS-CANONICAL** | `Command(goto, graph=PARENT)` Termination cite already in eee TIER-1 cite trail | **NO-OP** — cite-only |
| **langchain-ai/deepagents** | **DUPLICATE-FUNCTIONALITY + CITE-CLASS-CANONICAL** | `SubAgentMiddleware` cite already in eee TIER-1 cite trail per team-orch-state-spawning.md Parent→Child State-Leak Avoidance | **NO-OP** — cite-only |
| **jackmpcollins/magentic** | **REJECT-FOR-FIT.a (Probe 7.a DEMAND-ABSENCE)** | No sss workflow consumes Python `@prompt` decorator | **REJECT** — do not install or cite |
| **huggingface/smolagents** | **CITE-CLASS-CANONICAL** | `CodeAgent` code-as-action paradigm reference already in eee TIER-1 cite trail | **NO-OP** — cite-only |
| **openai/openai-agents-python** | **CITE-CLASS-CANONICAL (superseded by codex CLI for CC integration)** | `Handoff` + `Tracing` cite already in eee TIER-1 cite trail; OpenAI integration to CC is via codex CLI (installed) NOT this SDK | **NO-OP** — cite-only |
| **agno-agi/agno** | **REJECT-FOR-FIT.a (Probe 7.a DEMAND-ABSENCE)** | No sss workflow consumes Python `Agent` framework | **REJECT** — do not install or cite |

## Cross-vendor synthesis findings (sister to W217-F Anthropic-OFFICIAL audit)

1. **wshobson/agents is the ONLY install-class candidate** in the 10-repo cross-vendor cluster — and it is **already installed at v1.6.0** per `installed_plugins.json:claude-code-workflows@1.6.0` (Mia pre-apply verified at probe).

2. **8 wshobson sub-plugins are currently enabled** (per `installed_plugins.json` grep): `agent-orchestration`, `agent-teams`, `comprehensive-review`, `context-management`, `protect-mcp`, `review-agent-governance`, `shell-scripting`, `signed-audit-trails`. 3/8 (protect-mcp / signed-audit-trails / shell-scripting) align with Wave 138 Fire 2 STUDY-PILOT-NARROW survivors. **5/8 (agent-orchestration / agent-teams / comprehensive-review / context-management / review-agent-governance) installed POST-Wave-138 without Phase 7 benchmark gate verification per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Phase 7 benchmark gate`** — these need explicit Phase 7 fabrication-test audit per `Z:/claude-sota/.claude/rules/convergence-gate.md` Row-2 BEFORE further sub-plugin enabling.

3. **8 Python-SDK frameworks (autogen / crewai / langgraph / deepagents / smolagents / openai-agents / agno / magentic) are CITE-CLASS-CANONICAL only** — ALL fail Probe 4 (no CC plugin marketplace) + Probe 5 (Python SDK runtime, not CC Agent tool shape). 6/8 already in eee TIER-1 cite trail; 2/8 (magentic + agno) REJECT-FOR-FIT.a per Probe 7 DEMAND-ABSENCE.

4. **awesome-agentic-patterns catalog is CITE-CLASS-CANONICAL** — already pinned at HEAD `ffb427683ec77f3690f7fadfec7a7611d9e907d9` per parallel-sessions.md.

5. **NO install-class action recommended** — all install-class opportunities are already captured (wshobson installed); all cite-class opportunities are already in TIER-1 cite trail.

## NATIVE-CC + WIRING discriminator summary

| Repo | NATIVE-CC marketplace? | CC plugin install path | Already in runtime? |
|---|---|---|---|
| wshobson/agents | ✅ YES | `/plugin marketplace add wshobson/agents` | **YES — v1.6.0 + 8 sub-plugins enabled** |
| nibzard/awesome-agentic-patterns | ❌ NO (vendor-neutral docs) | n/a (cite-only) | Cited at HEAD `ffb427683` |
| langchain-ai/deepagents | ❌ NO (LangChain SDK) | n/a | Cited |
| microsoft/autogen | ❌ NO (Python framework + CC-BY-4.0) | n/a | Cited |
| crewAIInc/crewAI | ❌ NO (Python SDK) | n/a | Cited |
| langchain-ai/langgraph | ❌ NO (LangChain SDK) | n/a | Cited |
| jackmpcollins/magentic | ❌ NO (Python decorator) | n/a | Reject |
| huggingface/smolagents | ❌ NO (HF Python) | n/a | Cited |
| openai/openai-agents-python | ❌ NO (OpenAI SDK — superseded by codex CLI for CC) | n/a (codex CLI installed instead) | Cited; codex@openai-codex@1.0.4 INSTALLED |
| agno-agi/agno | ❌ NO (Python framework) | n/a | Reject |

## VERDICT

**HONEST-NON-FINDING for install-class action** across all 10 cross-vendor repos:
- 1/10 (wshobson/agents) — already installed; further sub-plugin enables need Phase 7 benchmark gate per Wave 138 Fire 2
- 7/10 — CITE-CLASS-CANONICAL only (NOT install-class for this runtime; Python SDK frameworks fail Probe 4+5); already in TIER-1 cite trail
- 2/10 (magentic + agno) — REJECT-FOR-FIT.a Probe 7 DEMAND-ABSENCE

**Recommended action**:
1. **No new installs from this 10-repo set** — all install-class action exhausted.
2. **Phase 7 benchmark gate audit queued** for 5 wshobson sub-plugins installed POST-Wave-138 without verification (`agent-orchestration` / `agent-teams` / `comprehensive-review` / `context-management` / `review-agent-governance`) — per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Phase 7 benchmark gate` + `convergence-gate.md` Row-2 fabrication-test FAIL discipline.
3. **Cite-trail confirmation** — all 8 Python SDK frameworks already correctly classified as cite-class in `team-orch-frameworks.md`; W217-G confirms no drift.
4. **Cross-vendor convergence finding**: 8-org Axis-1 convergence around "Python SDK agent orchestration framework" — distinct cohort from CC-native plugin marketplace cohort (wshobson). The two cohorts are NON-COMPETING per CR-12 PROVIDER-COMPLEMENT (Python SDK frameworks orchestrate Python-runtime agents; CC plugin marketplaces orchestrate CC Agent tool dispatch).

**Cross-model gate satisfaction**: STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — this audit ran as Sonnet stand-in under `CLAUDE_CODE_SUBAGENT_MODEL` env-funneling (per CLAUDE.local.md ENV (g) marked DEPRECATED but architecturally inferred from FM-17.f context). Cross-model gate satisfaction is deferred to W219 Path P codex T1 dispatch at parent arc.

**Mia pre-apply applied**: Verified wshobson marketplace already installed (preventing OVER-claim "should install wshobson") + verified 8 sub-plugins already enabled (preventing OVER-claim "agent-orchestration not yet wired") + verified `awesome-agentic-patterns` already in TIER-1 cite trail (preventing duplicate-cite OVER-claim).

VERDICT: APPROVE-WITH-FOLLOWUP — no install action; Phase 7 benchmark gate audit queued for 5 wshobson sub-plugins; cross-vendor cite trail confirmed intact.
