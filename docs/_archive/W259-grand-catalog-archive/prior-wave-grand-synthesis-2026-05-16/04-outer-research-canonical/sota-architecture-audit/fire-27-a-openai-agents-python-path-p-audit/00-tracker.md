# 00 — Wave 134 Fire 27-A Tracker (openai/openai-agents-python Path P Audit)

> **Subject**: `openai/openai-agents-python` v0.17.0 @ HEAD `cf151f91ff9f73723720c3f5e84a873268317ff7` (MIT; OpenAI TIER-1-OFFICIAL; 26,150★)
> **Pre-screen**: D2+D8 PASS (pushed today; OpenAI org + 5+ contributors). Wave 134 series first post-pre-screen-mandate fire.
> **Hypothesis**: STRONG-CANDIDATE-PENDING-AUDIT — likely STUDY-PILOT-PATTERN-EXTRACT (Handoff + Tracing primitives) given parallel Anthropic SDK at `anthropics/claude-agent-sdk-python`
> **Pre-Path-P verdict shape**: high baseline confidence due to TIER-1-OFFICIAL provenance + active maintenance

## Pre-flight Mia probe (PASSED via D2+D8 pre-screen)

| Probe | Outcome |
|---|---|
| Repo exists @ github | ✅ `openai/openai-agents-python` |
| LICENSE | ✅ MIT |
| Stars | 26,150 (TIER-1 popularity) |
| Forks | 4,012 |
| Created | 2025-03-11 (~14 months — convergence-gate Axis 3 STABLE-BURN-IN PASS) |
| Pushed | 2026-05-10T23:21Z (HOURS before audit — peak active) |
| HEAD | `cf151f91ff9f73723720c3f5e84a873268317ff7` |
| HEAD msg | "fix: #781 replace assertion in handoff() with UserError (#3339)" |
| Local clone | ✅ Z:/repos/deps/openai-agents-python (depth=50, fresh fetch) |
| Language | Python 3.10-3.14 |
| PyPI | `openai-agents` v0.17.0 ACTIVE |
| Owner | OpenAI Organization (TIER-1-OFFICIAL) |
| Top contributors | seratch (383), rm-openai (291), github-actions (184), adityasingh2400 (36), MartinEBravo (33) |
| Test surface | **275 test files** (largest in Wave 134 series) |
| Example surface | 212 examples |
| Anthropic-friendly | ✅ CLAUDE.md → AGENTS.md symlink (explicitly Claude-Code-compatible) |

## Architecture surface (12 subsystems under src/agents/)

| Subsystem | Function |
|---|---|
| `agents/` (root) | Agent / Runner / RunConfig / Tool / Handoff core classes |
| `handoffs/` | Inter-agent handoff primitive (cited in `team-orchestration.md` as TIER-1 ALT-IMPL) |
| `tracing/` | Tracing primitives — 4 trace types (AgentSpanData / HandoffSpanData / GenerationSpanData / MCPListToolsSpanData) |
| `mcp/` | Native MCP client integration |
| `memory/` | Session memory module |
| `models/` | Provider abstraction (OpenAI + 100+ via LiteLLM + any-llm) |
| `realtime/` | gpt-realtime-2 voice agent support |
| `run_internal/` | Runner internals |
| `sandbox/` | Long-horizon sandbox agents (containerized) |
| `tracing/` | Trace export to Tracing UI |
| `util/` | Shared utilities |
| `voice/` | Voice-mode agents |

Plus root-level files: `agent.py` (42K), `tool.py` (71K), `run.py` (90K — LARGE), `run_state.py` (126K — LARGEST), `result.py` (38K), `items.py` (32K), `apply_diff.py` (10K), `function_schema.py` (15K), `guardrail.py` (9K), `lifecycle.py` (6K).

## Key OpenAI Agents SDK primitives (relevant to eee adoption)

1. **Handoff primitive** — already TIER-1 ALT-IMPL cite in `team-orchestration.md` (sister cite-import-AMBER cohort)
2. **Tracing primitive** — 4 span types + AgentSpanData / HandoffSpanData / GenerationSpanData / MCPListToolsSpanData
3. **Guardrails** — input/output validation framework
4. **Sandbox-Agents** — long-horizon containerized agents (cwc-long-running-agents companion concept)
5. **Sessions** — automatic conversation history management
6. **MCP integration** — native MCP client
7. **Provider-agnostic** — LiteLLM + any-llm-sdk → covers Anthropic Claude
8. **Realtime voice** — gpt-realtime-2

## Mia OVER potential (preserve for codex T1 catch)

1. **Provider-agnostic claim** — does the SDK actually work with Anthropic Claude as primary? Or is it OpenAI-Responses-API-first with bolt-on Claude support?
2. **Anthropic SDK parallel** — Cardinal-Rule-12 upstream-install-priority — Anthropic ships `claude-agent-sdk-python` (TIER-1-DIRECT pinned at `cross-model-consensus.md` HEAD `b512f256`). Is openai-agents-python redundant for eee?
3. **eee already has 12 agents** in `.claude/agents/` — does openai-agents-python overlap with that registry?
4. **MCP integration** — eee has 21+ plugins + MCPs; does openai-agents-python's MCP client duplicate Claude Code's MCP frontend?
5. **Sandbox-Agents** — cwc-long-running-agents (Wave 50 ship) covers similar territory; is sandbox-agents better OR duplicate?
6. **Tracing duplicates** — eee has openlit (Wave 109) + Phoenix (Wave 119) for tracing; does openai-agents-python tracing add OR duplicate?
7. **Realtime voice** — eee has no current voice surface; if interesting, is it Anthropic-compatible?

## Audit dimensions (10-axis Path P + multi-convergence per SRA)

1. **D1 license** — MIT (PASS; permissive)
2. **D2 freshness** — pushed hours ago (PASS — peak ACTIVE)
3. **D3 fresh-paint detection** — 26K stars / 14 months / 28MB → density check OK, NOT fresh-paint
4. **D4 maintainer provenance** — TIER-1-OFFICIAL OpenAI org — STRONG-PROVENANCE-EXPRESS predicate FIRES
5. **D5 active-maintenance signals** — 4,012 forks + 77 open issues + active CI (github-actions 184 commits) → ACTIVE
6. **D6 mode-harness-shape** — Python SDK + provider-agnostic → COMPATIBLE with eee runtime IF Anthropic provider works as primary
7. **D7 Anthropic CC official policy alignment** — Anthropic ships own SDK; openai-agents-python is OpenAI-parallel — verify how Anthropic positions cross-vendor SDKs
8. **D8 industry adoption** — 26K stars + 4K forks + active CI bot + 5+ multi-org contributors → STRONG adoption
9. **D9 failure-mode awareness** — verify FM-class candidates (FM-17 fleet-depletion w/ 5+ agent fan-out? FM-20 path-drift cross-fire?)
10. **D10 replacement viability** — vs Anthropic `claude-agent-sdk-python` — is openai-agents-python BETTER OR DUPLICATE for eee specifically?

## Three integration options

| Option | Description | Verdict expectation |
|---|---|---|
| A: APPROVE-INSTALL | `pip install openai-agents` into eee venv + wire as primary agent SDK | HIGH-RISK — DUPLICATE Anthropic claude-agent-sdk (kiss-dry-yagni Must-Never #4) |
| B: STUDY-PILOT-PATTERN-EXTRACT | Extract Handoff + Tracing + Guardrails patterns WITHOUT installing SDK | MID-PROBABILITY — patterns already cited in team-orchestration.md as TIER-1 ALT-IMPL; expand cite-trail |
| C: CITE-PATTERN-ONLY | Reference architecture only; do not install OR extract | LOW-PROBABILITY — patterns are HIGH-VALUE; extraction is justified |
| D: REJECT-FOR-FIT | DUPLICATE Anthropic SDK; INADMISSIBLE | possible if D10 replacement viability FAIL |

## Sub-task tracker

- [x] Mia D2+D8 pre-screen PASS
- [x] Local clone + fresh fetch to HEAD
- [x] Pre-screen tracker (5-candidate matrix)
- [x] Tracker (this file)
- [ ] README + AGENTS.md + pyproject.toml line-by-line
- [ ] src/agents/ tour (root + key subsystems)
- [ ] codex T1 Path P consult prompt build
- [ ] codex T1 Path P fire
- [ ] 01-anatomy.md
- [ ] 02-probe-dag-application.md
- [ ] 03-codex-t1-verdict.md
- [ ] 99-close-synthesis.md
- [ ] install-provenance.md append
- [ ] atomic commit (FM-02 sub-class (b) defense)

## Verification queries (for codex T1 prompt)

- `Z:/repos/deps/openai-agents-python/pyproject.toml:1-80` (license + deps + entry points)
- `Z:/repos/deps/openai-agents-python/README.md` (full)
- `Z:/repos/deps/openai-agents-python/AGENTS.md` (12.6K — contributor guide w/ skill mandates)
- `Z:/repos/deps/openai-agents-python/src/agents/handoffs/` (Handoff primitive)
- `Z:/repos/deps/openai-agents-python/src/agents/tracing/` (Tracing primitive)
- `Z:/repos/deps/openai-agents-python/src/agents/mcp/` (MCP integration)
- `Z:/repos/deps/openai-agents-python/src/agents/sandbox/` (Sandbox-Agents)
- `Z:/repos/deps/anthropics/claude-agent-sdk-python/` (TIER-1-DIRECT comparison — verify upstream Anthropic parallel)

## Cite anchors (TIER-1-DIRECT)

- TIER-1-DIRECT: `Z:/repos/deps/openai-agents-python/` HEAD `cf151f91` MIT [VERIFIED 2026-05-10 via direct git clone]
- TIER-1-DIRECT: `https://openai.github.io/openai-agents-python/` (canonical docs)
- TIER-1-DIRECT (for Anthropic-parallel comparison): `Z:/repos/deps/claude-agent-sdk-python/` HEAD `b512f256` per `cross-model-consensus.md`
- TIER-1-DIRECT: `https://pypi.org/project/openai-agents/` v0.17.0

## Discipline conformance gates

- ✅ CR-1: TIER-1-DIRECT cite chain (OpenAI org)
- ✅ CR-3: cross-model gate via Path P codex T1 REAL GPT-5.5
- ✅ CR-9: install-risk PENDING — version pin `openai-agents==0.17.0` + 2-round fix-forward budget
- ✅ CR-10: research-first-then-install — audit before install decision
- ✅ CR-11: META-process — multi-axis Path P prompt + 10-D SRA
- ✅ CR-12: upstream-install-priority — Anthropic ships parallel `claude-agent-sdk-python`; compare BEFORE adoption
- ✅ FM-02 sub-class (b): atomic git add + commit --only -- pathspec defense
- ✅ User directive 2026-05-10: D2+D8 pre-screen APPLIED (this is the 1st post-mandate fire)
