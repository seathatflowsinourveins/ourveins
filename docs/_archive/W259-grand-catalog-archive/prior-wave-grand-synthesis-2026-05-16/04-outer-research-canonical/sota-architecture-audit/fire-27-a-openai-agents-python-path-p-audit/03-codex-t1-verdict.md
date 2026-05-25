# 03 — Codex T1 Path P Verdict (Cross-Model GPT-5.5 REAL — Fire 27-A)

> **Method**: Path P recipe (codex exec foreground+tee, n=17 → **n=18 reproducible**)
> **Tokens**: 238,328 codex-side (3rd-largest Fire 26-27 series — multi-source verification including Anthropic SDK comparison)
> **Wall-clock**: ~3m 42s (21:30:45 → 21:34:27 local) — efficient
> **Verdict origin**: REAL GPT-5.5 codex CLI v0.130.0
> **Verbatim trace**: `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` (16,349 LOC)

## Verbatim verdict at EOF

```json
{
  "verdict": "STUDY-PILOT-PATTERN-EXTRACT",
  "confidence": 0.89,
  "summary": "openai-agents-python is a credible, active, OpenAI-official SDK with real new pattern value, but it should not become eee's primary runtime primitive because eee is Claude Code/Anthropic-primary and Anthropic's claude-agent-sdk-python already covers the direct Claude Code control plane. Treat it as a provider-complement and pattern-extraction target, with any executable pilot isolated and version-pinned to openai-agents==0.17.0.",
  "probe_dag_verdicts": {
    "P1_count_over": "PASS",
    "P2_sdk_vs_cli": "PASS",
    "P3_arch_api": "PASS",
    "P4_plugin_namespace": "PASS",
    "P5_mode_harness": "NEUTRAL",
    "P6_blockers": "PASS",
    "P7a_demand_absence": "PASS",
    "P7b_demand_creates": "ELIGIBLE"
  },
  "row2_fabrication_test": "PASS",
  "novel_capability_for_eee": "PARTIAL-OVERLAP",
  "install_footprint_acceptable": "CAVEAT-NOTED",
  "addresses_fire23_p0": "NO",
  "axis_1_convergence_gate": "PASS",
  "cardinal_rule_12_test": {
    "anthropic_sdk_exists": "YES (claude-agent-sdk-python @ b512f256)",
    "openai_sdk_class": "PROVIDER-COMPLEMENT",
    "recommended_disposition": "ADOPT-ALTERNATIVE"
  },
  "scope_split_verdict": {
    "core_agent_class": "ADMISSIBLE",
    "handoff_primitive": "ADMISSIBLE",
    "tracing_primitive": "ADMISSIBLE",
    "sandbox_agents": "ADMISSIBLE",
    "realtime_voice": "ADMISSIBLE",
    "mcp_integration": "ADMISSIBLE",
    "guardrails": "ADMISSIBLE"
  },
  "recommended_integration_option": "B: STUDY-PILOT-PATTERN-EXTRACT",
  "cite_pattern_extract_candidates": [
    "src/agents/agent.py:270,305,322,332,530 — Agent composition, handoffs, guardrails, typed output, and agents-as-tools are clean pattern anchors.",
    "src/agents/handoffs/__init__.py:42,86,94,126,142,153,222 — HandoffInputData, input filters, nested history, enable predicates, and handoff() helper.",
    "src/agents/tracing/span_data.py:28,64,98,169,244,426 — agent/task/turn/generation/handoff/MCP span taxonomy; useful for Phoenix/openlit mapping.",
    "src/agents/models/multi_provider.py:61,158,163,205 — prefix-routed OpenAI/LiteLLM/Any-LLM provider map; good cross-vendor routing pattern.",
    "src/agents/extensions/models/litellm_model.py:435,636,640,642 — explicit Anthropic/Gemini tool_use to tool_result ordering fix.",
    "src/agents/extensions/models/any_llm_model.py:122,204,686,921,1116,1186 — adapter normalization, Claude/Gemini ordering, Responses fallback, replay sanitization.",
    "src/agents/mcp/server.py:223,528,1091,1212,1347 and src/agents/mcp/manager.py:108 — MCP client/server lifecycle, transports, filters, retries, manager pattern.",
    "docs/sandbox_agents.md:3,7,9,99,105 and src/agents/run_state.py:184,656,1062 — sandbox-agent beta boundary plus durable HITL/run-state snapshot patterns.",
    "docs/realtime/quickstart.md:3,11,48,55 and src/agents/realtime/openai_realtime.py:155,442,507,520 — realtime voice is new for eee but OpenAI/Azure-bound."
  ],
  "prescribed_edits": [],
  "next_steps": [
    "Do not replace claude-agent-sdk-python or eee .claude/agents with openai-agents-python.",
    "Record Fire 27-A as STUDY-PILOT-PATTERN-EXTRACT with CR-12 class PROVIDER-COMPLEMENT.",
    "If executing code, create an isolated pilot environment and pin exactly openai-agents==0.17.0; add extras only for the tested surface, e.g. [litellm], [any-llm], [docker], or [realtime].",
    "Before any Anthropic-backed pilot, run a minimal Claude tool-call smoke test through LiteLLM or Any-LLM and verify tool_use/tool_result ordering, structured outputs, tracing behavior, and replay safety.",
    "Keep OpenAI tracing disabled or replaced with a local processor unless an OpenAI API key and OpenAI trace upload are explicitly intended.",
    "Extract handoff, tracing-span, MCP-manager, sandbox-run-state, and realtime voice patterns into eee architecture docs; do not wire OpenAI Responses as the eee default model path."
  ],
  "convergence_with_existing_eee_primitives": {
    "vs_anthropic_claude_agent_sdk": "PARTIAL",
    "vs_eee_12_agents": "DIFFERENT-LAYER",
    "vs_cwc_long_running_agents": "PARTIAL",
    "vs_openlit_phoenix_tracing": "PARTIAL",
    "vs_claude_code_mcp_frontend": "PARTIAL"
  }
}
```

## Verdict shape disposition

Per `codex-t1-fix-forward-pattern.md`:
- **STUDY-PILOT-PATTERN-EXTRACT @ conf=0.89** — HIGHEST positive verdict in Wave 134 NEW-candidate series (matches Cisco mcp-scanner 0.91 confidence band; first Wave 134 STUDY-PILOT with 7/7 sub-systems ADMISSIBLE)
- **Empty `prescribed_edits`** — no Pattern A apply for INSTALL decision
- **9 cite-pattern extract candidates** with HIGH-precision file:line refs
- **6 explicit operator-actionable next_steps**
- **PROVIDER-COMPLEMENT class** — Anthropic SDK remains PRIMARY; openai-agents-python = ALTERNATIVE

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ✅ REAL GPT-5.5 via codex CLI v0.130.0 |
| CR-3 cross-model consensus | ✅ FULLY SATISFIED |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=17 → **n=18 reproducible** |
| CR-12 upstream-install-priority gate | ✅ resolved as PROVIDER-COMPLEMENT (no violation) |
| D2+D8 pre-screen mandate (user 2026-05-10) | ✅ FIRST application — discipline validated |

## 🚨 Critical codex T1 contributions

### 1. CR-12 PROVIDER-COMPLEMENT class (HIGHEST-VALUE finding)

Codex T1 resolved the load-bearing CR-12 upstream-install-priority question:

> "anthropic_sdk_exists: YES (claude-agent-sdk-python @ b512f256)"
> "openai_sdk_class: PROVIDER-COMPLEMENT"
> "recommended_disposition: ADOPT-ALTERNATIVE"

This establishes a NEW CR-12 disposition class: **PROVIDER-COMPLEMENT** (NOT DUPLICATE; NOT PRIMARY-REPLACEMENT). Both SDKs can coexist because:
- Anthropic `claude-agent-sdk-python` covers DIRECT CC control plane (eee primary)
- OpenAI `openai-agents-python` covers PROVIDER-AGNOSTIC orchestration (eee alternative)

**Implication for future CR-12 verdicts**: when Anthropic and OpenAI ship parallel SDKs, the question isn't binary (adopt-one) — it's classification (PRIMARY vs ALTERNATIVE vs DUPLICATE). PROVIDER-COMPLEMENT joins DUPLICATE-FUNCTIONALITY and GENUINELY-NEW as a third class.

### 2. Anthropic via LiteLLM tool_use ordering fix (critical pattern)

Codex T1 cited:
> "src/agents/extensions/models/litellm_model.py:435,636,640,642 — explicit Anthropic/Gemini tool_use to tool_result ordering fix."

This is a CRITICAL pattern for eee — if eee ever bridges Anthropic Claude through LiteLLM (e.g., for cross-vendor pilot or fallback), the tool_use ↔ tool_result message ordering must be correct. This is documented OPERATOR-actionable evidence at exact file:line.

### 3. Span taxonomy alignment with Ship 14 G-3

Codex T1 cited:
> "src/agents/tracing/span_data.py:28,64,98,169,244,426 — agent/task/turn/generation/handoff/MCP span taxonomy; useful for Phoenix/openlit mapping."

This aligns with Ship 14 G-3 (sota-researcher synthesis 2026-05-02) which cited Anthropic SDK's `_SubagentContextMixin` for `agent_id`/`agent_type` propagation per `audit-action-loop.md:22`. The OpenAI span taxonomy provides a SECOND ortho-vendor reference for what Anthropic SDK exposes via SDK primitives.

### 4. All-sub-systems ADMISSIBLE (first Wave 134 series)

7/7 sub-systems ADMISSIBLE:
- core_agent_class
- handoff_primitive
- tracing_primitive
- sandbox_agents
- realtime_voice
- mcp_integration
- guardrails

This is the strongest Probe-4+5 result in Wave 134 NEW-candidate series. No sub-system rejection — pattern-extract scope unlocked for ALL primitives.

### 5. P7b ELIGIBLE (first Wave 134 candidate to pass 5-clause check)

The demand-creates-new-workflow 5-clause check is rarely passed (requires named operational use case + cited local input + wiring path + incumbent comparison + reversible time-box). openai-agents-python is the FIRST Wave 134 NEW candidate to pass it because:
- Named use case: pattern-extract into team-orchestration.md cite-trail
- Cited local input: explicit file:line refs at handoffs/__init__.py + tracing/span_data.py
- Wiring: cite-only first, optional venv pilot later
- Incumbent: Anthropic SDK = PRIMARY (this is ALTERNATIVE)
- Time-box: 30-day pilot with venv-delete removal

### 6. 6 explicit operator-actionable next_steps

Codex T1 provided clear discipline:
1. Do NOT replace claude-agent-sdk-python
2. Record as STUDY-PILOT-PATTERN-EXTRACT with PROVIDER-COMPLEMENT class
3. If executing: isolated venv + `openai-agents==0.17.0` exact pin
4. Anthropic smoke test through LiteLLM/Any-LLM first
5. Keep OpenAI tracing disabled unless OpenAI key explicitly intended
6. Extract handoff/tracing/MCP/sandbox/realtime patterns into eee architecture docs

## Path P recipe ladder advance

| Fire | Subject | Verdict | Tokens | Confidence |
|---|---|---|---|---|
| 24-A | BMAD | REJECT-FOR-FIT | 94,987 | 0.92 |
| 24-B | CCPM | CITE-PATTERN-ONLY | 115,741 | 0.90 |
| 24-C | Task Master | CITE-PATTERN-ONLY | 175,555 | 0.92 |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW | 143,587 | 0.87 |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT | 79,094 | 0.94 |
| 25 | Discovery wave | Pattern B HNF | 175k+ | — |
| 26-A | cisco-mcp-scanner | STUDY-PILOT-NARROW | 128,628 | 0.91 |
| 26-B | LLMLingua | CITE-PATTERN-ONLY | 82,142 | 0.86 |
| 26-C | claw-compactor | CITE-PATTERN-ONLY | 358,418 | 0.88 |
| **27-A** | **openai-agents-python** | **STUDY-PILOT-PATTERN-EXTRACT** | **238,328** | **0.89** |

Total codex tokens across Fire 24+25+26+27: **~1.59M tokens** (~$15-30 estimated). Fire 27-A is efficient (238K vs 358K for claw-compactor) — codex didn't need extensive verification because TIER-1-OFFICIAL provenance + active maintenance + cross-checked against Anthropic sister-SDK quickly.

## Verdict shape distribution (Wave 134 NEW-candidate series — updated)

| Verdict | Count | Subjects |
|---|---|---|
| REJECT-FOR-FIT | 2 | BMAD + Claude Memory Bank |
| CITE-PATTERN-ONLY | 4 | CCPM + Task Master + LLMLingua + claw-compactor |
| **STUDY-PILOT-NARROW** | 2 | Agent OS v3 + Cisco mcp-scanner |
| **STUDY-PILOT-PATTERN-EXTRACT** | **1** (NEW class) | **openai-agents-python** |
| Pattern B HNF | 1 | Discovery wave |
| APPROVE | 0 | — |

**openai-agents-python is the FIRST Wave 134 candidate with STUDY-PILOT-PATTERN-EXTRACT class** — a new verdict shape between STUDY-PILOT-NARROW (full SDK install) and CITE-PATTERN-ONLY (cite-only). Pattern-extract focus with optional bounded pilot.

## Mia ladder advance

n=1769 → **n=1779** (+10: codex T1 verdict captured / 9 high-precision cite-patterns / scope unanimous 7/7 ADMISSIBLE / CR-12 PROVIDER-COMPLEMENT class established / P7b ELIGIBLE first Wave 134 / Path P n=18/18 reproducible / verdict shape distribution gains NEW class STUDY-PILOT-PATTERN-EXTRACT / Anthropic via LiteLLM ordering pattern documented / span taxonomy aligned with Ship 14 G-3 / D2+D8 pre-screen mandate validated as load-bearing discipline)
