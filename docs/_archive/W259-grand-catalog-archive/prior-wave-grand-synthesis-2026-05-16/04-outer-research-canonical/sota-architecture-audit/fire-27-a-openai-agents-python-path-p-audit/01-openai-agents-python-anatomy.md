# 01 — openai/openai-agents-python Anatomy (Fire 27-A)

> **Cite anchor (TIER-1-DIRECT)**: local clone `Z:/repos/deps/openai-agents-python/` HEAD `cf151f91ff9f73723720c3f5e84a873268317ff7` (v0.17.0; MIT; OpenAI TIER-1-OFFICIAL; HEAD commit "fix: #781 replace assertion in handoff() with UserError #3339")
> **Probe method**: direct filesystem audit + codex T1 verification of 9 cite-pattern source files including Anthropic-parallel SDK comparison

## Repo metadata (verified via gh api 2026-05-10)

| Field | Value |
|---|---|
| Full name | `openai/openai-agents-python` |
| License | MIT (PURE) |
| Stars | **26,150** |
| Forks | 4,012 |
| Open issues | 77 |
| Created | 2025-03-11T03:42:36Z (~14 months — Axis-3 STABLE-BURN-IN PASS) |
| Updated | 2026-05-11T01:21:41Z (peak active, hours before audit) |
| **Pushed** | **2026-05-10T23:21:38Z** (HOURS before audit — D2 PEAK ACTIVE) |
| HEAD SHA | `cf151f91ff9f73723720c3f5e84a873268317ff7` |
| Language | Python 3.10-3.14 |
| Size | 28,563 KB |
| **Owner** | **OpenAI Organization (TIER-1-OFFICIAL)** |
| PyPI | `openai-agents` v0.17.0 production-stable |
| Anthropic-friendly | ✅ `CLAUDE.md → AGENTS.md` symlink at root |

## D8 multi-contributor verification

| Contributor | Commits | Role |
|---|---|---|
| seratch | 383 | OpenAI staff lead |
| rm-openai | 291 | OpenAI staff (`rm-openai` = OpenAI Real-time team) |
| github-actions[bot] | 184 | CI bot (active CI) |
| adityasingh2400 | 36 | external contributor |
| MartinEBravo | 33 | external contributor |

**D8 PASS**: TIER-1-OFFICIAL org + 5+ contributors with 33+ commits each + active CI bot. STRONG-PROVENANCE-EXPRESS predicate FIRES.

## Architecture — 12 subsystem dirs under `src/agents/`

| Subsystem | Purpose | LOC scale |
|---|---|---|
| `extensions/` | Provider extensions (LiteLLM + AnyLLM) | medium |
| `handoffs/` | **Inter-agent handoff primitive** (HandoffInputData + filters + predicates) | medium-large |
| `mcp/` | **Native MCP client** (server.py 1,300+ LOC + manager.py) | large |
| `memory/` | Session memory module | medium |
| `models/` | Provider abstraction (OpenAI Responses + Chat + LiteLLM + any-llm) | large |
| `realtime/` | gpt-realtime-2 voice agents (`openai_realtime.py` 500+ LOC) | large |
| `run_internal/` | Runner internals | medium |
| `sandbox/` | **Long-horizon containerized sandbox agents** | medium |
| `tracing/` | **Tracing primitives** (`span_data.py` with 6 span types) | medium |
| `util/` | Shared utilities | small |
| `voice/` | Voice-mode agents | medium |

Plus large root-level files: `agent.py` (42K) / `tool.py` (71K) / `run.py` (90K) / `run_state.py` (126K LARGEST) / `result.py` (38K) / `items.py` (32K).

## Test surface (largest in Wave 134 series)

- **275 test files** (vs claw-compactor 57, LLMLingua N/A, Task Master N/A) — LARGEST in Wave 134 series
- **212 examples** — comprehensive learning surface

## Mia OVER catches by codex T1 (in Fire 27-A — verdict-level)

### Mia OVER preempted #1 — eee 12 agents Probe 4 overlap concern RESOLVED

**Orchestrator pre-audit concern**: "does openai-agents-python's Agent class duplicate eee 12 agents?"
**Codex T1 verdict**: `vs_eee_12_agents: DIFFERENT-LAYER`
**Explanation**: eee's `.claude/agents/` are CC subagent definition files (markdown frontmatter); openai-agents-python's `Agent` class is a Python SDK class. Different abstraction layers.

### Mia OVER preempted #2 — CR-12 ADOPT-PRIMARY question RESOLVED

**Orchestrator pre-audit concern**: "is openai-agents-python a duplicate of `claude-agent-sdk-python`?"
**Codex T1 verdict**: `openai_sdk_class: PROVIDER-COMPLEMENT` + `recommended_disposition: ADOPT-ALTERNATIVE`
**Explanation**: Anthropic SDK directly controls Claude Code; OpenAI SDK adds provider-agnostic orchestration. Both can coexist — Anthropic SDK = primary; OpenAI SDK = ALTERNATIVE for provider-agnostic patterns.

### Mia OVER preempted #3 — Sandbox-Agents vs cwc-long-running-agents

**Orchestrator pre-audit concern**: "does Sandbox-Agents duplicate cwc-long-running-agents (Wave 50)?"
**Codex T1 verdict**: `vs_cwc_long_running_agents: PARTIAL`
**Explanation**: cwc-long-running-agents is a CC-runtime framework for long-running agents; openai-agents-python Sandbox-Agents is a CONTAINERIZED long-horizon execution primitive. Related but different mechanisms (CC-runtime vs Python-SDK).

### Mia OVER preempted #4 — Tracing duplicates openlit/Phoenix

**Orchestrator pre-audit concern**: "does openai-agents-python tracing duplicate openlit + Phoenix?"
**Codex T1 verdict**: `vs_openlit_phoenix_tracing: PARTIAL`
**Explanation**: openai-agents-python tracing has SPECIFIC span taxonomy (AgentSpanData / HandoffSpanData / GenerationSpanData / MCPListToolsSpanData / TaskSpanData / TurnSpanData) — Phoenix/openlit handle generic OTel traces. The OpenAI-specific spans are cite-worthy mapping references.

## Codex T1 found 9 cite-pattern candidates with HIGH-precision file:line refs

This is the most pattern-rich Wave 134 audit (vs Cisco 8, LLMLingua 5, claw-compactor 9):

### Pattern #1: Agent composition + handoffs + guardrails + typed output (5 lines)

- Source: `src/agents/agent.py:270,305,322,332,530`
- Pattern: clean Agent dataclass with composable handoffs, guardrails, typed output schema, agents-as-tools
- **Application to eee**: reference for `.claude/agents/` frontmatter pattern + Agent SDK class shape

### Pattern #2: Handoff primitive — 7 distinct lines

- Source: `src/agents/handoffs/__init__.py:42,86,94,126,142,153,222`
- Pattern: HandoffInputData / input filters / nested history / enable predicates / handoff() helper
- **Application to eee**: already cited as TIER-1 ALT-IMPL in `team-orchestration.md`; expand cite-trail with these specific lines

### Pattern #3: Tracing span taxonomy — 6 span types

- Source: `src/agents/tracing/span_data.py:28,64,98,169,244,426`
- Pattern: agent/task/turn/generation/handoff/MCP span data classes
- **Application to eee**: Phoenix/openlit mapping reference (graphs.openai.com style)
- **Convergence**: matches Ship 14 G-3 cite class for SubagentContextMixin agent_id/agent_type contract

### Pattern #4: Prefix-routed multi-provider map

- Source: `src/agents/models/multi_provider.py:61,158,163,205`
- Pattern: prefix-routed OpenAI/LiteLLM/Any-LLM provider map (e.g., `openai:gpt-4` vs `litellm:claude-3-opus`)
- **Application to eee**: cross-vendor routing pattern for future multi-model orchestration

### Pattern #5: Anthropic tool_use/tool_result ordering fix (CRITICAL for eee)

- Source: `src/agents/extensions/models/litellm_model.py:435,636,640,642`
- Pattern: explicit Anthropic/Gemini tool_use → tool_result message ordering fix (LiteLLM compatibility)
- **Application to eee**: CRITICAL operator reference if eee ever bridges Anthropic Claude through LiteLLM (e.g., for cross-vendor pilot)

### Pattern #6: any-llm adapter normalization

- Source: `src/agents/extensions/models/any_llm_model.py:122,204,686,921,1116,1186`
- Pattern: adapter normalization + Claude/Gemini ordering + Responses-API fallback + replay sanitization
- **Application to eee**: provider-portability pattern reference (future multi-model session replay)

### Pattern #7: MCP client lifecycle + manager pattern

- Source: `src/agents/mcp/server.py:223,528,1091,1212,1347` + `src/agents/mcp/manager.py:108`
- Pattern: MCP client/server lifecycle + transports + filters + retries + manager pattern
- **Application to eee**: reference for `.claude/mcp/` patterns + MCP server orchestration

### Pattern #8: Durable HITL run-state snapshot patterns

- Source: `docs/sandbox_agents.md:3,7,9,99,105` + `src/agents/run_state.py:184,656,1062`
- Pattern: sandbox-agent beta boundary + durable HITL/run-state snapshots (126K LOC of state mgmt)
- **Application to eee**: cwc-long-running-agents companion reference; HITL pause/resume patterns

### Pattern #9: Realtime voice (OpenAI/Azure-bound — cite-only for eee)

- Source: `docs/realtime/quickstart.md:3,11,48,55` + `src/agents/realtime/openai_realtime.py:155,442,507,520`
- Pattern: gpt-realtime-2 voice agent integration
- **Application to eee**: CITE-ONLY — eee has no current voice surface; OpenAI/Azure-bound primitive

## Files codex T1 directly probed (sources_used)

- https://api.github.com/repos/openai/openai-agents-python
- https://pypi.org/pypi/openai-agents/json
- https://docs.litellm.ai/docs/providers
- https://github.com/mozilla-ai/any-llm
- `Z:/repos/deps/openai-agents-python @ cf151f91`
- **`Z:/repos/deps/claude-agent-sdk-python @ b512f256`** (sister-comparison for CR-12)
- `Z:/claude-sota-installed/.mcp.json`
- `Z:/claude-sota-installed/docs/architecture-audit-2026-05-10.md`

## Mia ladder advance

Pre-Fire-27-A: n=1748 (post-pre-screen)
Post-Fire-27-A anatomy: **n=1758** (+10: D2+D8 pre-screen PASS confirmed by codex / 12 subsystem dirs catalogued / 275 test surface largest in series / 9 cite-pattern candidates resolved / 4 Mia OVER concerns preempted by codex / CR-12 ADOPT-ALTERNATIVE class established / DIFFERENT-LAYER vs eee 12 agents / PARTIAL convergence with 4 existing eee stacks / OpenAI staff multi-contributor verified / TIER-1-OFFICIAL STRONG-PROVENANCE-EXPRESS firing confirmed)
