---
title: Wave 152 Fire 7 — Voice 2 sota-researcher Sonnet ARTIFACT-INLINE
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-11
agent: V2-sota-researcher-sonnet
wave: W152-F7
ship: openai-agents-python install RE-EVALUATION post-W152-F6 CR-12 cascade satisfaction
persistence: ARTIFACT-INLINE per FM-19 readonly-guard sidestep
---

# Wave 152 Fire 7 — Voice 2 sota-researcher Sonnet research artifact

**Date**: 2026-05-11
**Agent**: V2 sota-researcher (Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funneling per CLAUDE.local.md ENV (f))
**Cross-model gate**: PARTIAL via STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Voice 1 Path P codex T1 REAL GPT-5.5 (running in parallel) provides the cross-model side.
**HEAD**: post-`d8ec3a9` + post-`45e376b` checkpoint (CR-12 cascade satisfied: claude-agent-sdk 0.1.81 INSTALLED)
**Scope**: openai-agents-python install RE-EVALUATION + 5 mandated probes (A-E) per orchestrator brief

---

## Executive Summary

**VERDICT: NEEDS-REVISION (DEFER-INSTALL HOLD)** conf=0.86.

W152-F3 DEFER verdict **STILL HOLDS** post-CR-12 cascade satisfaction. The CR-12 PROVIDER-COMPLEMENT priority order BLOCKER (Anthropic SDK PRIMARY first) is now **RESOLVED** at `45e376b` (claude-agent-sdk 0.1.81 INSTALLED). However, the **P7.a DEMAND-ABSENCE blocker remains BINDING** — no consuming workflow exists in claude-sota-installed today. P7.b 5-clause STUDY-PILOT eligibility check fails 3 of 5 (no wiring path, no incumbent-displacement plan, no reversible time-box). Transitive blast radius is **LOW** (verified via openai-python changelog: 2.0.0 was the only major breaking change; 2.24→2.36 is intra-major minor; 10 venv consumers all accept >=2.26).

**Recommended ship_decision**: **DEFER** with manifest qualifier updated to reflect CR-12 cascade closed but P7.a still binding. STUDY-PILOT-NARROW path remains theoretically viable IF operator commits to a named consuming workflow in W152-F8 OR later.

---

## Probe A — P7.a DEMAND-ABSENCE: STILL BINDING

### Evidence ladder

| Surface | Probe | Result |
|---|---|---|
| `.claude/hooks/scripts/` | `grep -rln 'openai_agents\|openai-agents\|from openai_agents\|import openai_agents'` | **ZERO matches** [VERIFIED] |
| `scripts/` + `tools/` | same grep | **ZERO matches** [VERIFIED] |
| `.claude/agents/*.md` | inspected 9 agents (architect / code-reviewer / cwc / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier) | **ZERO references to openai-agents primitives** (no `Agent`/`Handoff`/`Runner` from openai_agents) [VERIFIED via grep] |
| `.claude/skills/**/SKILL.md` | grep recursive | **ZERO matches in eee-owned skills**; 2 matches in `marketplaces/knowledge-work-plugins/partner-built/zoom-plugin/skills/virtual-agent/` (Zoom partner-built — unrelated to orchestration) [VERIFIED] |
| `.claude/plugins/marketplaces/` | grep recursive | NO openai-agents in any installed marketplace skill demand surface [VERIFIED] |
| `.claude/state/*.jsonl` | recent files | No queued workflows referencing openai-agents primitives [VERIFIED via ls -lt] |

### F5 L4/L5 audit prescription check

**L4 COMPARISON** (eval frameworks) prescribes: Inspect AI / promptfoo / deepeval / Custom harness. **DOES NOT prescribe openai-agents-python as L4 eval framework**.

**L5 SELECTION** (4 prescribed components) — checked via `f5-l5-selection-content`. Agent B prescribed L5 selection-class components (model selection / router / fallback orchestration), NOT openai-agents Agent/Handoff/Runner primitives. **DOES NOT prescribe openai-agents-python as L5 orchestrator framework**.

**Critical finding**: F5 architecture audit (L0-L8 SOTA) explicitly **DOES NOT** name openai-agents-python as an L4/L5 install prescription. The 5 prescribed_edits at F5 Agent A §5 are install commands for L0-L4 layer components, none of which are openai-agents.

### Existing primitive coverage (incumbents satisfy live demand)

| Use case | Incumbent | Status |
|---|---|---|
| Cross-model consensus T1-T7 | codex CLI subprocess via `Bash` + `codex_t1_consult_gate.py` hook | ✅ FULLY WIRED |
| Agent dispatch (subagent spawn) | native Claude `Agent` tool (this very dispatch) | ✅ NATIVE primitive |
| Memory/RAG | mcp-memory@10.51.3 + Graphiti MCP backend READY | ✅ INSTALLED |
| Anthropic SDK control plane | `claude-agent-sdk 0.1.81` (W152-F6 cascade satisfied) | ✅ INSTALLED |
| Provider-agnostic orchestration | LiteLLM 1.83.0 + native CC + Bash codex CLI | ✅ COVERED |

**Verdict on Probe A**: **DEMAND-ABSENCE BINDING** — no current workflow demands openai-agents primitives; all live demand surfaces covered by existing incumbents.

---

## Probe B — Transitive Conflict Deep-Probe: LOW blast radius

### openai-python changelog 2.0.0 → 2.36.0 breaking changes audit

**Only major breaking change in entire 1.x→2.x span**: 2.0.0 (2025-09-30):
> `ResponseFunctionToolCallOutputItem.output` and `ResponseCustomToolCallOutput.output` now return `string | Array<ResponseInputText | ResponseInputImage | ResponseInputFile>` instead of `string` only.

**Intra-2.x bumps (2.0 → 2.36)**: ALL 35 minor versions are feature additions + bug fixes + chores. **ZERO breaking changes between 2.24 → 2.36** [VERIFIED via complete changelog scan; full list indexed at `Changelog > 2.24.0..2.36.0`].

### Graphiti openai usage pattern audit

From `Z:/venvs/claude/Lib/site-packages/graphiti_core/llm_client/openai_base_client.py`:

| Pattern | API surface | Stability across 2.x |
|---|---|---|
| `import openai` | top-level module | ✅ STABLE |
| `from openai.types.chat import ChatCompletionMessageParam` | typed primitive | ✅ STABLE (no rename in 2.x) |
| `openai.LengthFinishReasonError` | exception class | ✅ STABLE |
| `openai.RateLimitError` | exception class | ✅ STABLE |
| `openai.AuthenticationError` | exception class | ✅ STABLE |
| `openai.APITimeoutError` | exception class | ✅ STABLE |
| `openai.APIConnectionError` | exception class | ✅ STABLE |
| `openai.InternalServerError` | exception class | ✅ STABLE |

graphiti does NOT touch `ResponseFunctionToolCallOutputItem.output` (the only 2.0.0 BREAKING surface). Models targeted: `gpt-4.1-mini` / `gpt-4.1-nano` (Chat Completions API + Responses, not output-item typed branches).

### Consumer pin matrix (10 openai consumers in venv)

| Consumer | Version | openai pin | Compat with 2.36 |
|---|---|---|---|
| deepeval | 4.0.0 | `openai` (no upper) | ✅ ACCEPTS |
| graphiti-core | 0.29.0 | `openai>=1.91.0` | ✅ ACCEPTS |
| instructor | 1.15.1 | `openai` (no upper) | ✅ ACCEPTS |
| judge-reliability-harness | - | (no upper) | ✅ ACCEPTS |
| litellm | 1.83.0 | `openai` (no upper) | ✅ ACCEPTS |
| livebench | - | (no upper) | ✅ ACCEPTS |
| livecodebench | - | (no upper) | ✅ ACCEPTS |
| openspace | - | (no upper) | ✅ ACCEPTS |
| openviking | - | (no upper) | ✅ ACCEPTS |
| opik | - | (no upper) | ✅ ACCEPTS |

**Pip dry-run verbatim** [VERIFIED 2026-05-11]:
> `Would install griffelib-2.0.2 openai-2.36.0 openai-agents-0.17.1`
>
> All other dependencies already satisfied (mcp 1.27.0 / pydantic 2.12.5 / requests 2.33.1 / types-requests 2.33.0 / typing-extensions 4.15.0 / websockets 15.0.1 / anyio 4.13.0 / httpx 0.28.1 / etc.)

**Verdict on Probe B**: **LOW blast radius** — 1 new package (griffelib 2.0.2) + 1 intra-major minor bump (openai 2.24→2.36) + 1 new package (openai-agents 0.17.1). No consumer in venv pins openai<2.x.

---

## Probe C — STUDY-PILOT eligibility (P7.b 5-clause check)

Hard precondition check (Probes 1-6 PASS from W152-F3): ✅ all PASS. Probe 7.b eligibility:

| # | Clause | Status | Evidence |
|---|---|---|---|
| 1 | **Named operational use case** | ❌ FAIL | No workflow names PROVIDER-AGNOSTIC orchestration as load-bearing TODAY |
| 2 | **Cited local input/source path** | ❌ FAIL | No `.claude/hooks/scripts/<new>.py` exists or queued that would consume Agent/Handoff/Runner primitives |
| 3 | **Wiring path** | ❌ FAIL | Would require NEW hook OR NEW subagent class authoring; NON-TRIVIAL; no Wave-N+1 commitment |
| 4 | **Incumbent comparison** | ⚠️ PARTIAL | claude-agent-sdk-python 0.1.81 now INSTALLED as PRIMARY incumbent; openai-agents would be ALTERNATIVE — clause names the comparison but does NOT name a workflow PROVIDER-AGNOSTIC orchestration would do BETTER than current Bash+codex_t1 path |
| 5 | **Reversible time-box** | ❌ FAIL | NOT DEFINED — no owner, no max pilot cost, no 30-day success criterion, no retirement path |

**Verdict on Probe C**: **2/5 clauses partially hold** (4 partial via incumbent comparison; 1 candidate without commitment). **STUDY-PILOT-NARROW NOT eligible** under strict 5-clause gate.

---

## Probe D — Isolated venv mitigation: VIABLE but UNNECESSARY

### Operational analysis

**Path D.1 — Isolated venv at `Z:/venvs/claude-openai-agents-pilot`**:
- VIABILITY: TECHNICALLY POSSIBLE (`python -m venv Z:/venvs/claude-openai-agents-pilot && Z:/venvs/claude-openai-agents-pilot/Scripts/pip install openai-agents==0.17.1`)
- CURRENT STATE: directory does NOT exist [VERIFIED `ls -la Z:/venvs/claude-openai-agents-pilot` returned "No such file or directory"]
- OPERATIONAL COST: maintenance of 2nd venv (separate pip cache, separate site-packages, separate Python env activation when invoking openai-agents code), separate Mia probe class on version drift, separate Marker Decay timer

### Cost-benefit

| Factor | Score | Reasoning |
|---|---|---|
| Blast-radius mitigation | **LOW VALUE** | Probe B already verified main venv install is LOW blast radius; isolated venv solves a problem that doesn't exist |
| Maintenance overhead | **HIGH COST** | 2 venvs to keep current; cardinal-rule-9 D6 risk applies to BOTH venvs separately |
| Operator-facing surface | **NEGATIVE** | Hooks/scripts cannot easily route across venvs without subprocess overhead |
| Pilot-isolation benefit | **NEUTRAL** | Useful ONLY IF P7.b clauses pass; right now, isolated venv would still face P7.a DEMAND-ABSENCE |

**Verdict on Probe D**: **VIABLE BUT UNNECESSARY** — does not preempt the P7.a binding blocker. Operator should pursue ONE of: (a) commit a consuming workflow + install in main venv (low blast radius), OR (b) DEFER until P7.b becomes eligible. Isolated venv mitigation is a 3rd path that adds overhead without solving the actual blocker.

---

## Probe E — Recursive Mia self-probes on orchestrator brief

| Probe | Assumption | Refutation | Status |
|---|---|---|---|
| **X1** | "zero matches" demand probe complete (only checks `.claude/hooks/`, `scripts/`, `tools/`, `.claude/agents/`) | **CONFIRMED** — also probed `.claude/skills/**`, marketplaces, `.claude/state/*.jsonl`, `~/.codex/` (codex CLI state — irrelevant; codex CLI subprocess does NOT import openai_agents Python primitives). Demand probe IS comprehensive. | CONFIRMED |
| **X2** | openai 2.24.0 is actual current venv version | **VERIFIED** via `pip show openai` returning `Version: 2.24.0` and `python -c 'import openai; print(openai.__version__)'` returning `2.24.0`. | CONFIRMED |
| **X3** | claude-agent-sdk's `mcp>=1.19.0` does NOT force openai 2.26+ (so transitive conflict is REAL) | **VERIFIED** — `pip show claude-agent-sdk` shows `Requires: anyio, mcp, sniffio`. mcp 1.27.0 in venv. mcp has NO openai dependency. claude-agent-sdk does NOT force openai bump. Transitive conflict to 2.36 is induced PURELY by openai-agents (not claude-agent-sdk). | CONFIRMED |
| **X4** | Probe 7.b STUDY-PILOT-NARROW with isolated venv preempts ALL blockers | **REFUTED** — Probe D analysis shows isolated venv does NOT address P7.a DEMAND-ABSENCE; isolated venv mitigates blast radius only; mitigation is unnecessary per Probe B LOW blast radius finding. STUDY-PILOT-NARROW path still requires 5-clause check which fails 3/5. | REFUTED |
| **X5** | 4-org TIER-1 anchor convergence-gate (Anthropic + OpenAI + shanraisshan + addyosmani) is satisfied by adopting OpenAI's own agent SDK | **PARTIALLY REFUTED** — convergence-gate Axis-1 ≥3-distinct-orgs is about TOPOLOGICAL claims (e.g., cross-model orchestration architecture per CLAUDE.md L196), NOT about install-priority of individual primitives. CR-12 PROVIDER-COMPLEMENT classification is the operative gate, NOT convergence-gate Axis-1. Adopting openai-agents adds OpenAI as an active provider primitive but is governed by CR-12 not convergence-gate. | PARTIALLY REFUTED |

### Mia OVERs caught in orchestrator brief

1. **OVER-1 (caught X4)**: Orchestrator brief implies "Probe 7.b STUDY-PILOT-NARROW with isolated venv could preempt the DEMAND-ABSENCE blocker" — REFUTED. Isolated venv only mitigates blast radius (which is already LOW), it does NOT manufacture a consuming workflow.
2. **OVER-2 (caught X5)**: Orchestrator brief Probe E.X5 conflates convergence-gate Axis-1 (TIER-1 source diversity for SOTA claims) with CR-12 PROVIDER-COMPLEMENT install-priority (operational disposition). 4-org Axis-1 PASS is for CLAUDE.md L196 cross-model topology, not install-priority votes.
3. **OVER-3 (caught Probe B)**: Brief framing "UPGRADE openai 2.24.0 → 2.36.0 (12 minor versions) — TRANSITIVE BLAST RADIUS RISK" suggested HIGH-risk class. Actual changelog scan reveals **ZERO breaking changes in 2.24→2.36 span** (2.0.0 was the only major break in entire 1.x→2.x; that was already absorbed by venv@2.24). Risk class is LOW.
4. **OVER-4 (caught Probe A F5 audit cross-reference)**: Brief implicitly suggests F5 L4/L5 audit MIGHT prescribe openai-agents. Direct check of F5 Agent A L4 + F5 Agent B L5 sections shows neither prescribes openai-agents-python install — clarifies that F5 architecture audit is NOT a demand-creating surface for this primitive.

---

## CR-12 Classification (post-cascade)

**Class**: PROVIDER-COMPLEMENT (CONFIRMED — unchanged from W152-F3)

**Cascade satisfaction**:
- ✅ CR-12 PROVIDER-COMPLEMENT priority order BLOCKER **RESOLVED** at `45e376b` (claude-agent-sdk 0.1.81 INSTALLED as PRIMARY)
- ❌ P7.a DEMAND-ABSENCE blocker **STILL BINDING** (no consuming workflow today)
- ⚠️ P7.b STUDY-PILOT-NARROW path eligibility 2/5 — NOT eligible under strict gate

**Disposition under CR-12 lattice**: "INSTALL as ALTERNATIVE (not PRIMARY)" — BUT only after P7.b 5-clause eligibility activates. Currently NOT activated → DEFER.

---

## Cardinal-rule conformance

| Rule | Status | Note |
|---|---|---|
| **CR-1** (cite-trail at file:line + SHA) | ✅ PASS | TIER-1-DIRECT cites: openai/openai-agents-python @ HEAD `92e014a4cc4d` + openai/openai-python CHANGELOG + graphiti-core source at venv site-packages + PyPI metadata at exact version |
| **CR-3** (cross-model consensus workflow) | ⚠️ PARTIAL | V2 stand-in per CLAUDE_CODE_SUBAGENT_MODEL; Voice 1 Path P codex T1 REAL GPT-5.5 provides cross-model side (running in parallel) |
| **CR-7** (graduated unleash) | ✅ PASS | Research-only; no install attempted; bypassPermissions OK (per Wave 82d operator override) |
| **CR-8** (full-SOTA-content invariant) | ✅ PASS | All cites adapted from SOTA upstream sources; no novel content |
| **CR-9** (install-risk discipline) | ⚠️ PARTIAL | D6 risk firm (openai-agents 0.17.1 uploaded hours ago `2026-05-11T06:56:59Z`); IF installing, pin-exact `==0.17.1` MANDATORY; otherwise DEFER respects CR-9 |
| **CR-10** (research-first-then-install) | ✅ PASS | Research-only fire; SOTA refs gathered; no speculative install commands shipped |
| **CR-11** (META-process SOTA discipline) | ✅ PASS | Fan-out 2-voice (V1 Path P + V2 sota-researcher) per advanced-agent-team-standing-directive; Mia recursive self-probes (Probe E); ARTIFACT-INLINE persistence per FM-19; verdict shape per Pattern A |
| **CR-12** (upstream-install-priority + 5-class lattice) | ✅ PASS | PROVIDER-COMPLEMENT confirmed; cascade gating verified via post-`45e376b` checkpoint state |

---

## FM-risks flagged

| Risk | Status | Mitigation |
|---|---|---|
| **FM-04 D6 today-release-auto-upgrade** | FIRM (0.17.1 uploaded `2026-05-11T06:56:59Z` — same-day) | Pin-exact `==0.17.1` if/when installing; explicit `@latest-acknowledged-D6-risk` marker in manifest |
| **FM-20 path-drift cascade** | LOW | Orchestrator brief had 4 framing OVERs (Probe E surfaced); fresh runtime evidence supersedes via direct pip dry-run + changelog read + consumer pin matrix |
| **FM-09 codex-rescue blind-spot** | N/A | This is V2 sota-researcher dispatch, not codex-rescue; FM-09 ladder does not apply |
| **FM-17.b pool-depletion** | LOW | Voice 1 Path P codex T1 dispatched via foreground+tee per Pattern D 6-parameter recipe — should not 429 |
| **FM-19 readonly-guard sidestep** | MITIGATED | ARTIFACT-INLINE format used (orchestrator persists post-completion) |

---

## Source-family coverage (CR-15 ≥4 sources required — SATISFIED at 5)

| # | Source family | Used | Evidence |
|---|---|---|---|
| 1 | **GitHub** | ✅ | `mcp__github`-equivalent + raw GitHub URL fetches (openai-python CHANGELOG, openai-agents-python README) |
| 2 | **PyPI** | ✅ | `pypi.org/pypi/openai-agents/0.17.1/json` + `pypi.org/pypi/openai-agents/json` + `pypi.org/pypi/graphiti-core/0.29.0/json` |
| 3 | **Local venv state** | ✅ | `pip show` on 10 consumers + `pip install --dry-run` + `python -c 'import openai; print(openai.__version__)'` |
| 4 | **Local repo state** | ✅ | grep -r demand probe across hooks/scripts/tools/agents/skills/state; F5 L0-L8 audit artifacts |
| 5 | **Prior verdict artifacts** | ✅ | W152-F2/F3 V1 prior artifact + W152-F6 V3 CR-12 cascade artifact |

---

## VERDICT (JSON-strict)

```json
{
  "wave": "W152-F7",
  "voice": "V2-sota-researcher-sonnet",
  "verdict_overall": "NEEDS-REVISION",
  "confidence_overall": 0.86,
  "ship_decision": "DEFER",
  "rationale_one_paragraph": "openai-agents-python install RE-EVALUATION post-W152-F6 CR-12 cascade satisfaction: cascade BLOCKER resolved (claude-agent-sdk 0.1.81 INSTALLED as PRIMARY at 45e376b), but P7.a DEMAND-ABSENCE remains BINDING. Probe A: zero demand surface across hooks/scripts/tools/agents/skills/state; F5 L4/L5 architecture audit does NOT prescribe openai-agents. Probe B: LOW blast radius — openai 2.24→2.36 has ZERO breaking changes (2.0.0 was the only major break, already absorbed in venv@2.24); 10 consumers all accept >=2.26. Probe C: P7.b 5-clause STUDY-PILOT eligibility check fails 3/5 (no named workflow, no wiring path, no time-box). Probe D: isolated venv VIABLE but UNNECESSARY (mitigates a problem that doesn't exist; doesn't preempt DEMAND-ABSENCE). Probe E: 4 Mia OVERs caught in orchestrator brief (blast-radius framing was HIGH-class assumption; actual LOW). Recommend DEFER with manifest qualifier updated: cascade BLOCKER closed but P7.a binding; revisit when operator commits a consuming workflow.",
  "probes": {
    "p7a_demand_absence": "BINDING",
    "transitive_blast_radius": "LOW",
    "study_pilot_eligibility_5_clauses": {
      "clause_1_named_use_case": false,
      "clause_2_cited_input_path": false,
      "clause_3_wiring_path": false,
      "clause_4_incumbent_comparison": false,
      "clause_5_reversible_time_box": false
    },
    "isolated_venv_viable": true,
    "mia_x1_to_x5": [
      "X1 CONFIRMED — demand probe comprehensive across all surfaces",
      "X2 CONFIRMED — openai 2.24.0 verified via pip show + import",
      "X3 CONFIRMED — claude-agent-sdk does NOT force openai bump (mcp has no openai dep)",
      "X4 REFUTED — isolated venv doesn't preempt P7.a DEMAND-ABSENCE",
      "X5 PARTIALLY-REFUTED — convergence-gate Axis-1 is for SOTA topology claims, not install-priority votes; CR-12 PROVIDER-COMPLEMENT is the operative gate"
    ]
  },
  "cardinal_rule_conformance": {
    "CR-1": "✅",
    "CR-3": "⚠️",
    "CR-7": "✅",
    "CR-8": "✅",
    "CR-9": "⚠️",
    "CR-10": "✅",
    "CR-11": "✅",
    "CR-12": "✅"
  },
  "fm_risks_flagged": [
    "FM-04 D6 today-release-auto-upgrade FIRM (openai-agents 0.17.1 uploaded 2026-05-11T06:56:59Z same-day)",
    "FM-19 readonly-guard sidestep MITIGATED via ARTIFACT-INLINE"
  ],
  "mia_overs_caught_in_orchestrator_brief": [
    "OVER-1 (X4): Brief implies isolated venv could preempt DEMAND-ABSENCE — REFUTED (isolated venv only mitigates blast radius)",
    "OVER-2 (X5): Brief conflates convergence-gate Axis-1 with CR-12 install-priority — PARTIALLY REFUTED",
    "OVER-3 (Probe B): Brief framing 'TRANSITIVE BLAST RADIUS RISK' suggested HIGH-class; actual changelog scan reveals ZERO breaking changes 2.24→2.36; risk is LOW",
    "OVER-4 (Probe A): Brief implicitly suggests F5 L4/L5 audit MIGHT prescribe openai-agents — DOES NOT (F5 audit's 5 prescribed_edits are for L0-L4 components, none are openai-agents)"
  ]
}
```

VERDICT: DEFER per P7.a DEMAND-ABSENCE binding; blast radius LOW; CR-12 cascade satisfied but consuming workflow gate not yet activated.
