---
title: Wave 152 Fire 7 V1 sota-researcher — openai-agents-python==0.17.1 install eligibility audit
status: AUTHORITATIVE
date: 2026-05-11
agent: sota-researcher V1 (Opus 4.7 1M-context)
fire: W152-F7
---

# Wave 152 Fire 7 — sota-researcher V1 verdict: openai-agents-python==0.17.1 install eligibility

```
VERDICT: STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY (DEFER pip install pending named consumer)
ship_readiness: DEFER
confidence: 0.86
cr12_class: PROVIDER-COMPLEMENT (per Wave 134 Fire 27-A precedent conf=0.89)
sra_pass_count: 9/10 (D10 N/A — no replacement proposed)
probe_dag_pass_count: 6/7 (P7.a DEMAND-ABSENCE caught; P7.b 5-clause = 1/5 FAIL)
p7b_5clause_pass_count: 1/5 (incumbent comparison only; missing named use case + local source path + wiring path + reversible time-box)
mia_self_overs: [
  "OVER-#1: my brief framing 'P7.a DEMAND-ABSENCE applies' — VERIFIED GENUINE via fresh rg",
  "OVER-#2: my brief framing 'CR-12 PROVIDER-COMPLEMENT not ECOSYSTEM-IMPORT despite 34 deps' — VERIFIED GENUINE via dry-run (31/34 satisfied; 3 NEW only)",
  "OVER-#3: my brief framing 'Wave 134 Fire 27-A STUDY-PILOT precedent applies' — VERIFIED GENUINE via codex_consult_w134_f27a_OUT.txt EOF JSON",
  "OVER-#4: my brief framing 'codex CLI + parallel-agent-wave already provide multi-provider abstraction' — REFUTED: codex CLI is cross-model T1-T7 verification not provider-agnostic orchestration; openai-agents is provider-agnostic orchestration LAYER ABOVE codex CLI (different scope)"
]
prescribed_edits: [
  {file: docs/sota-installed-manifest.md, line: 419, edit-shape: APPEND Wave 152 Fire 7 verdict to PLANNED row — keep PLANNED status, add SRA D1-D10 9/10 + Probe DAG 6/7 + P7.a DEMAND-ABSENCE catch + CITE-ONLY disposition},
  {file: docs/install-provenance.md, edit-shape: APPEND Wave 152 Fire 7 close entry — V1 verdict + Mia self-overs + 3-voice synthesis result},
  {file: .claude/projects/Z--claude-sota-installed/memory/MEMORY.md, edit-shape: APPEND single-line entry per FM-02 (c) atomic-batch discipline}
]
```

## §1 Phase 1 RECALL findings

**CLAUDE.md L142+ cardinal-rule-12 5-class lattice [VERIFIED 2026-05-11 via direct Read L130-193]**:
- **PROVIDER-COMPLEMENT class definition (L165)**: "parallel API surfaces but different scopes; both can coexist. Disposition: INSTALL as ALTERNATIVE (not PRIMARY) — primary incumbent retains canonical position. Example: Wave 134 Fire 27-A openai-agents-python (vs Anthropic claude-agent-sdk-python @ HEAD b512f256) — Anthropic SDK = direct CC control plane (PRIMARY); OpenAI SDK = provider-agnostic orchestration (ALTERNATIVE). Codex T1 verdict at .claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt STUDY-PILOT-PATTERN-EXTRACT conf=0.89."

**agent-harness-fit-verification.md Probe 7 (system-reminder context)**:
- **P7.a DEMAND-ABSENCE**: no current/queued workflow consumes the primitive → REJECT-FOR-FIT
- **P7.b DEMAND-CREATES-NEW-WORKFLOW**: STUDY-PILOT eligible only if ALL 5 clauses hold (named operational use case + cited local input/source path + wiring path + incumbent comparison + reversible time-box)

**manifest L419 PLANNED row [VERIFIED 2026-05-11 via direct Read]**:
- Wave 152 Fire 3 DEFER per CR-12 PROVIDER-COMPLEMENT priority order — "install AFTER claude-agent-sdk-python (L76) lands as PRIMARY"
- V1 prior W152 F2 catch: P7.a DEMAND-ABSENCE + Mia OVER catches + SRA 7-PASS/3-NOTE/1-FAIL
- V2 codex T1 conf=0.9 APPROVE-INSTALL-AS-DESIGNED (but MISSED manifest L76/L419 PLANNED rows per FM-09 codex blind-spot)
- V3 codex T1 ADVERSARIAL Pattern B HONEST-NON-FINDING (300s budget exhausted, no terminal JSON)
- Wave 152 Fire 4 candidate: `pip install claude-agent-sdk==0.1.81` (L76 PRIMARY)
- W152 F6 mine: PRIMARY claude-agent-sdk==0.1.81 INSTALLED at commit `45e376b` — CR-12 PRIMARY gate SATISFIED

**Wave 152 F4 v11 doctrine entry in MEMORY [VERIFIED 2026-05-11 via direct Read]**: parallel session reframed Fire 4 → Fire 6 per FM-02 (c) ACCEPT-ABSORPTION cooperative-multi-session etiquette. PRIMARY landed first. PROVIDER-COMPLEMENT install gate now structurally SATISFIED per CR-12 priority order.

## §2 Phase 2 INVESTIGATE primary sources

### GitHub API metadata [VERIFIED 2026-05-11 via direct probe to `https://api.github.com/repos/openai/openai-agents-python`]

| Field | Value |
|---|---|
| OWNER | openai (Organization) |
| STARS | 26,193 |
| FORKS | 4,017 |
| OPEN_ISSUES | 92 |
| SUBSCRIBERS | 207 |
| SIZE_KB | 29,548 |
| CREATED_AT | 2025-03-11T03:42:36Z (426 days / 14.0mo old) |
| PUSHED_AT | 2026-05-11T08:03:37Z (12.2h ago — SAME-DAY ACTIVE) |
| LICENSE | MIT (TIER-1 permissive) |
| ARCHIVED | False |
| DISABLED | False |
| HOMEPAGE | https://openai.github.io/openai-agents-python/ |

### LICENSE file [VERIFIED 2026-05-11 via direct GitHub raw fetch]

```
MIT License
Copyright (c) 2025 OpenAI
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

### pyproject.toml [VERIFIED 2026-05-11 via direct GitHub raw fetch]

```toml
[project]
name = "openai-agents"
version = "0.17.1"
description = "OpenAI Agents SDK"
license = "MIT"
authors = [{ name = "OpenAI", email = "support@openai.com" }]
requires-python = ">=3.10"
dependencies = [
    "openai>=2.26.0,<3",        # ← BUMP from venv-current 2.24.0 to 2.36.0 (3 minor)
    "pydantic>=2.12.2, <3",     # ← satisfied: 2.12.5
    "griffelib>=2, <3",         # ← NEW: 2.0.2
    "typing-extensions>=4.12.2, <5",  # satisfied: 4.15.0
    "requests>=2.0, <3",        # satisfied: 2.33.1
    "types-requests>=2.0, <3",  # satisfied: 2.33.0.20260408
    "websockets>=15.0, <17",    # satisfied: 15.0.1
    "mcp>=1.19.0, <2; python_version >= '3.10'",  # satisfied: 1.27.0
]
```

8 core deps + 17 optional-extras (`voice`, `viz`, `litellm`, `any-llm`, `realtime`, `sqlalchemy`, `encrypt`, `redis`, `dapr`, `mongodb`, `docker`, `blaxel`, `daytona`, `cloudflare`, `e2b`, `modal`, `runloop`, `vercel`, `s3`, `temporal`) — operator picks per use-case.

### README.md primitives [VERIFIED 2026-05-11 via direct GitHub raw fetch]

Core concepts (per README L10-20):
1. **Agents** — LLMs configured with instructions, tools, guardrails, handoffs
2. **Sandbox Agents** — agents preconfigured to work with container for long time horizons (since v0.14.0)
3. **Agents as tools / Handoffs** — delegating to other agents
4. **Tools** — functions, MCP, hosted tools
5. **Guardrails** — configurable input/output safety checks
6. **Human in the loop** — built-in HITL mechanisms
7. **Sessions** — automatic conversation history management
8. **Tracing** — built-in agent-run tracking
9. **Realtime Agents** — voice agents with `gpt-realtime-2`

Self-described: "provider-agnostic, supporting the OpenAI Responses and Chat Completions APIs, as well as 100+ other LLMs."

### PyPI v0.17.1 release [VERIFIED 2026-05-11 via dry-run output]

- Upload: 2026-05-11T06:56:59Z (CR-9 D6 firm — same-day-fresh)
- Wheel: `openai_agents-0.17.1-py3-none-any.whl` (cross-platform; no platform-specific binary)
- Dry-run NEW installs: `griffelib-2.0.2`, `openai-2.36.0`, `openai-agents-0.17.1` (only 3 NEW; 31/34 transitive deps already satisfied in venv)

### Wave 134 Fire 27-A precedent [VERIFIED 2026-05-11 via direct Read of `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` tail-100]

Verbatim terminal JSON:
```json
{
  "verdict": "STUDY-PILOT-PATTERN-EXTRACT",
  "confidence": 0.89,
  "probe_dag_verdicts": {
    "P1_count_over": "PASS", "P2_sdk_vs_cli": "PASS", "P3_arch_api": "PASS",
    "P4_plugin_namespace": "PASS", "P5_mode_harness": "NEUTRAL",
    "P6_blockers": "PASS", "P7a_demand_absence": "PASS", "P7b_demand_creates": "ELIGIBLE"
  },
  "cardinal_rule_12_test": {
    "anthropic_sdk_exists": "YES (claude-agent-sdk-python @ b512f256)",
    "openai_sdk_class": "PROVIDER-COMPLEMENT",
    "recommended_disposition": "ADOPT-ALTERNATIVE"
  },
  "next_steps": [
    "Do not replace claude-agent-sdk-python or eee .claude/agents with openai-agents-python.",
    "Record Fire 27-A as STUDY-PILOT-PATTERN-EXTRACT with CR-12 class PROVIDER-COMPLEMENT.",
    "If executing code, create an isolated pilot environment and pin exactly openai-agents==0.17.0; add extras only for the tested surface, e.g. [litellm], [any-llm], [docker], or [realtime]."
  ]
}
```

9 pattern-extract candidates documented (Agent composition / Handoffs / Tracing taxonomy / multi-provider routing / Anthropic ordering fix / Any-LLM adapter / MCP manager / Sandbox HITL / Realtime).

### Probe DAG 1-7 verdict (sota-researcher V1 fresh execution 2026-05-11)

| Probe | Description | Verdict | Evidence |
|---|---|---|---|
| **P1 count-OVER** | Stars/forks/age plausibility | PASS | 26,193★/4,017 fork/426d age = OpenAI OFFICIAL TIER-1 plausible |
| **P2 PyPI EXISTS** | Package exists at version | PASS | v0.17.1 uploaded 2026-05-11T06:56:59Z (D6 firm) |
| **P3 plugin-namespace** | Duplicate skill check | PASS | Glob `.claude/plugins/**/SKILL.md` for `Runner/Handoff/GuardrailFunctionOutput` = no skill collision (filenames different namespace) |
| **P4 GitHub-stars + age bands** | Stability check via SRA D2+D3 | PASS | star_vel=61.5/day NOT >100 (NOT fresh-paint) + density=1.13 NOT <0.5 (NOT fresh-paint) + 426d age >90d (STABLE-BURN-IN per convergence-gate Axis 3) |
| **P5 README+pyproject burn-in** | API stability + breaking-change pattern | PASS | 0.x version-strand still — pre-1.0 (operator-side awareness); pin-exact ==0.17.1 mitigates |
| **P6 deep-audit** | Architectural primitive overlap with eee | PASS | Agent/Runner/Handoff/Sandbox/Tracing/Realtime/Guardrails = PROVIDER-AGNOSTIC ORCHESTRATION layer ABOVE codex CLI (cross-model T1-T7 verification) + parallel-agent-wave (fan-out decision) + cross-model-consensus (Claude+codex pair); DIFFERENT SCOPE per Wave 134 F27-A |
| **P7 demand-gate SPLIT** | P7.a vs P7.b 5-clause | **P7.a DEMAND-ABSENCE FAILED** | rg returned 0 hits for `from openai_agents/import openai_agents` across `.py` files; zero current consumer. P7.b 5-clause check: 1/5 PASS (only "incumbent comparison" articulated via CR-12 + Wave 134 F27-A). Missing: named operational use case + cited local input/source path + wiring path + reversible time-box. |

**Probe DAG 6/7 PASS** (P7 split → P7.a DEMAND-ABSENCE catches).

## §3 Phase 3 VERIFY harness-fit (4-axis)

### Probe 1 — count-OVER

`Z:/venvs/claude/Scripts/python.exe -m pip install --dry-run openai-agents==0.17.1` [VERIFIED 2026-05-11]:
- 31 deps "Requirement already satisfied" via existing venv
- 3 NEW installs: `griffelib-2.0.2`, `openai-2.36.0` (BUMP), `openai-agents-0.17.1`
- Brief claim "34 transitive deps" SLIGHTLY-OVER — actual core direct deps = 8; transitive total ~34; install delta NEW=3
- **Key ripple risk**: openai 2.24→2.36 BUMP has 10 dependents in venv (deepeval / graphiti-core / instructor / judge-reliability-harness / litellm / livebench / livecodebench / openspace / openviking / opik). Pre-bump smoke-probe MANDATORY.

### Probe 2 — SDK-vs-CLI surface

`rg -l "openai.agents|from openai_agents|import openai_agents|Runner|Handoff" --type=py` returned 0 hits in claude-sota-installed `.claude/hooks/scripts/`, `scripts/`, `tools/` (only `.md` doc-mentions in audit metadata). **Zero current consumer** [VERIFIED GENUINE 2026-05-11 — Mia A self-probe confirmed].

### Probe 3 — architectural-API

Dependency ecosystem:
- `mcp>=1.19.0` (shared with eee mcp-memory-service @ 1.27.0 + fastmcp + claude-agent-sdk)
- `pydantic>=2.12.2` (shared with eee)
- `openai>=2.26.0` (BUMP from 2.24.0 — 10 venv dependents at risk)
- `griffelib>=2` (NEW; Python AST traversal — supports mkdocstrings docs gen; NOT runtime-load-bearing)

vs `claude-agent-sdk==0.1.81` ecosystem (already INSTALLED W152 F6):
- `anyio`, `mcp`, `sniffio` only (4 core deps; LEAN)

Per Wave 134 F27-A: "DIFFERENT-LAYER" — openai-agents is orchestration framework with provider abstraction; claude-agent-sdk is direct CC control plane. NOT duplicate.

### Probe 4 — plugin-namespace

`Z:/claude-sota-installed/.claude/plugins/**/SKILL.md` Glob for primitive names (Runner / Handoff / GuardrailFunctionOutput) — zero skill-namespace collision. Plugin marketplace skills are CC-facing (`brainstorming`, `using-superpowers`, etc.); openai-agents-python is Python SDK — different layer.

## §4 Phase 4 Mia pre-apply self-probes (≥3 independent claims)

### Mia A — "P7.a DEMAND-ABSENCE applies — zero current consumer"

**VERIFIED GENUINE** via fresh probe:
- `Grep "openai.agents|from openai_agents|import openai_agents|class.*Runner|class.*Handoff" --glob "*.py"` returned **0 matches** in claude-sota-installed
- All 20 hits via `--glob "*.{py,md}"` were `.md` doc-mentions only (audit metadata at `docs/sota-architecture-audit/`, CLAUDE.md L165 precedent text, manifest L419 row, named-failure-modes.md, etc.)
- **Conclusion**: zero Python consumer in `.claude/hooks/scripts/`, `scripts/`, `tools/`, `evals/` — P7.a DEMAND-ABSENCE holds firm

### Mia B — "CR-12 PROVIDER-COMPLEMENT NOT ECOSYSTEM-IMPORT despite 34 deps"

**VERIFIED GENUINE** via CR-12 5-class lattice + dry-run probe:
- **ECOSYSTEM-IMPORT (class 5)** per CR-12 definition: "core primitive GENUINELY-NEW at surface level but imports parallel ecosystem at dependency level" — e.g., langgraph requires `langchain-core>=1.4.0a2` + 6+ langgraph-* sub-package import + LangSmith proprietary
- openai-agents-python does NOT import a parallel ecosystem — its deps are: `openai` (already in venv, just upgrade), `pydantic` (already), `mcp` (already shared), `requests` (already), `websockets` (already), `griffelib` (NEW but lightweight AST tool), `typing-extensions`, `types-requests`
- **No parallel ecosystem** like `langchain-*`, `crewai-*`, `autogen-*` is imported
- Optional-extras (`litellm`, `any-llm`, `voice`, etc.) are OPTIONAL — operator opts-in per use-case
- **Conclusion**: CR-12 PROVIDER-COMPLEMENT (class 4) per Wave 134 F27-A precedent stands firm — parallel API surface to claude-agent-sdk at different scope (provider-agnostic orchestration vs direct CC control plane)

### Mia C — "Wave 134 Fire 27-A STUDY-PILOT-PATTERN-EXTRACT precedent still applies"

**VERIFIED GENUINE** via direct read of `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` EOF JSON:
- Terminal verdict: `"verdict": "STUDY-PILOT-PATTERN-EXTRACT", "confidence": 0.89`
- All 7 Probe DAG verdicts: P1-P6 PASS, P5 NEUTRAL, P7a PASS, P7b ELIGIBLE
- CR-12 class: PROVIDER-COMPLEMENT, recommended disposition: ADOPT-ALTERNATIVE
- "Do not replace claude-agent-sdk-python or eee .claude/agents with openai-agents-python"
- 9 pattern-extract candidates documented at file:line (Agent composition / Handoffs / Tracing taxonomy / multi-provider routing / Anthropic ordering fix / Any-LLM adapter / MCP manager / Sandbox HITL / Realtime)
- **Material changes since F27-A**: PRIMARY claude-agent-sdk==0.1.81 NOW INSTALLED (W152 F6) — gates SATISFIED per CR-12 priority order; openai-agents version drift 0.17.0→0.17.1 (point release; same minor)
- **Conclusion**: precedent still applies; gate-satisfied post-W152 F6 PRIMARY land

### Mia D — "codex CLI + parallel-agent-wave + cross-model-consensus already provide multi-provider abstraction"

**REFUTED — claim was OVER**:
- codex CLI provides cross-model T1-T7 verification lifecycle (Claude orchestrates, codex GPT-5.5 reviews) — SAME-MODEL-PAIR ecosystem, NOT multi-provider
- parallel-agent-wave.md provides fan-out decision gate (3-6 agent wave vs serial chain) — orchestration topology, NOT provider abstraction
- cross-model-consensus.md provides T1-T5 + T7 lifecycle for cross-Claude-Codex review — bilateral model pair
- openai-agents-python provides N-provider abstraction (OpenAI Responses + Chat Completions + LiteLLM 100+ LLMs + Any-LLM adapter) — DIFFERENT SCOPE
- **Conclusion**: claim refuted; openai-agents is NOT duplicate-functionality per kiss-dry-yagni Must-Never #4 — it's a different architectural layer for if/when eee expands beyond Claude+Codex pair
- **Mia OVER #4 caught at sota-researcher V1 layer** — prevents propagation to commit verdict

## §5 Phase 5 prescribed_edits

### Edit 1 — manifest L419 row update

**File**: `docs/sota-installed-manifest.md` L419
**Edit-shape**: APPEND Wave 152 Fire 7 V1 verdict to existing PLANNED row body (forward-only per `port-note-discipline.md §6`; do NOT rewrite W152 F3 DEFER history)
**Append text**:
```
**Wave 152 Fire 7 V1 verdict 2026-05-11**: STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY (DEFER pip install) conf=0.86 — PRIMARY claude-agent-sdk==0.1.81 INSTALLED at W152 F6 commit `45e376b` (CR-12 priority gate SATISFIED), BUT P7.a DEMAND-ABSENCE still holds (zero Python consumer in `.claude/hooks/scripts/`, `scripts/`, `tools/` per fresh rg); P7.b 5-clause check = 1/5 PASS (only "incumbent comparison" articulated via CR-12 + Wave 134 F27-A precedent; missing: named operational use case + cited local input/source path + wiring path + reversible time-box). DEFER pip install pending operator commitment to one of: (a) build named consumer (e.g., autonomous voice agent via `[realtime]` extra + `gpt-realtime-2`), (b) LiteLLM/Any-LLM multi-provider routing pilot, (c) Sandbox Agent for long-horizon workspace tasks. SRA D1-D10 9/10 PASS (D1 MIT permissive all PASS / D2 PUSHED 12.2h ago ACTIVE-band / D3 NOT fresh-paint star_vel=61.5/day density=1.13 / D4 TIER-1-OFFICIAL OpenAI org / D5 cpd=5.0 recent-window MATURE-ACTIVE / D6 autonomous /loop compatible / D7 OpenAI-OFFICIAL self-published / D8 26,193★ + 4,017 forks + 207 subscribers strong adoption / D9 0.x pre-1.0 noted for advisory disclosure pinning to ==0.17.1 / D10 N/A no replacement). Probe DAG 6/7 (P7.a fail). Mia self-overs 1/4 caught (Mia D refuted "codex CLI + parallel-agent-wave duplicate-functionality" framing — REFUTED via 4-clause distinct-scope argument; openai-agents = N-provider orchestration layer ABOVE codex CLI cross-model T1-T7 lifecycle). **CITE-ONLY DISPOSITION** per Wave 134 F27-A 9 pattern-extract candidates (Agent composition + Handoffs + Tracing taxonomy + multi-provider routing + Anthropic ordering fix + Any-LLM adapter + MCP manager + Sandbox HITL + Realtime) — extract patterns at file:line WITHOUT pip install until P7.b 5-clause gate satisfied. **Install risk pre-recorded**: openai 2.24→2.36 BUMP has 10 venv dependents (deepeval / graphiti-core / instructor / judge-reliability-harness / litellm / livebench / livecodebench / openspace / openviking / opik) — operator MUST smoke-probe each consumer before pip install fires. CR-9 D6 firm + ==0.17.1 pin-exact discipline applies when install proceeds. Path D candidate dispatches: V1 Opus 4.7 1M-context fresh PROBES (this fire) + V2 codex T1 Path P pending + V3 codex T1 ADVERSARIAL pending. FM-09 codex-rescue blind-spot at n=12/12 firm (carried from W152 F3). Mia n=293→n=297 (+4 Mia A/B/C VERIFIED-GENUINE + D REFUTED-OVER catch).
```

### Edit 2 — install-provenance.md append

**File**: `docs/install-provenance.md`
**Edit-shape**: APPEND Wave 152 Fire 7 audit-trail entry (single self-contained block)
**Append text**:
```
## Wave 152 Fire 7 (2026-05-11) — openai-agents-python install eligibility audit (post-W152 F6 PRIMARY land)

**Disposition**: STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY (DEFER pip install)
**Trigger**: W152 F6 commit `45e376b` landed PRIMARY claude-agent-sdk==0.1.81 — CR-12 priority gate satisfied; audit re-fires P7 demand-gate at PROVIDER-COMPLEMENT layer
**3-voice synthesis**:
- V1 sota-researcher (Opus 4.7 fresh 2026-05-11): STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY conf=0.86 (this verdict; ARTIFACT-INLINE at `tmp/wave152-f7-v1-sota-researcher-openai-agents-2026-05-11.md`)
- V2 codex T1 Path P REAL GPT-5.5: pending
- V3 codex T1 ADVERSARIAL: pending

**Phase 5 primary-source evidence [all VERIFIED 2026-05-11 via direct fetch]**:
- GitHub API `openai/openai-agents-python`: stars=26,193 / forks=4,017 / open_issues=92 / subscribers=207 / size=29,548KB / created=2025-03-11 (426d) / pushed=2026-05-11T08:03:37Z (12.2h ago) / license=MIT / archived=False
- PyPI v0.17.1 metadata: uploaded 2026-05-11T06:56:59Z (CR-9 D6 firm same-day-fresh) / wheel = openai_agents-0.17.1-py3-none-any.whl (cross-platform; no platform-specific binary)
- Upstream LICENSE: MIT Copyright (c) 2025 OpenAI
- Upstream pyproject.toml: 8 core deps (openai>=2.26.0,<3 / pydantic>=2.12.2,<3 / griffelib>=2,<3 / typing-extensions>=4.12.2,<5 / requests>=2.0,<3 / types-requests>=2.0,<3 / websockets>=15.0,<17 / mcp>=1.19.0,<2) + 17 optional-extras

**Dry-run probe** [`Z:/venvs/claude/Scripts/python.exe -m pip install --dry-run openai-agents==0.17.1`]:
- 31 deps already satisfied in shared venv
- 3 NEW installs: griffelib-2.0.2 / openai-2.36.0 (BUMP from 2.24.0) / openai-agents-0.17.1
- **Ripple risk**: openai 2.24→2.36 BUMP affects 10 venv dependents (deepeval / graphiti-core / instructor / judge-reliability-harness / litellm / livebench / livecodebench / openspace / openviking / opik) — smoke-probe MANDATORY before pip install fires

**Probe DAG verdict**: 6/7 PASS (P1 count-OVER PASS / P2 PyPI EXISTS PASS / P3 plugin-namespace PASS / P4 GitHub-stars+age-bands PASS / P5 README+pyproject burn-in PASS / P6 deep-audit PASS / P7 demand-gate SPLIT FAIL — P7.a DEMAND-ABSENCE caught: zero Python consumer in `.claude/hooks/scripts/`, `scripts/`, `tools/` per fresh rg)

**P7.b 5-clause check**: 1/5 PASS (only "incumbent comparison" articulated via CR-12 + Wave 134 F27-A precedent; missing: named operational use case + cited local input/source path + wiring path + reversible time-box) → FALLS BACK TO P7.a DEMAND-ABSENCE

**SRA D1-D10 verdict**: 9/10 PASS (D10 N/A no replacement proposed)
- D1 license-use-class: MIT permissive — all 4 use-classes PASS (CLI-binary-use / library-link / network-served / SaaS-distributed)
- D2 SOTA-freshness: PUSHED 12.2h ago — ACTIVE (<24h) band
- D3 fresh-paint detection: star_vel=61.5/day (NOT >100), density=1.13KB/star (NOT <0.5) — NOT FRESH-PAINT
- D4 maintainer provenance: OpenAI organization — TIER-1-OFFICIAL
- D5 active maintenance: 5 commits in recent window, cpd=5.0/day — ALL 4 signals satisfied
- D6 use-class compatibility: provider-agnostic orchestration SDK — compatible with autonomous /loop runtime
- D7 Anthropic policy alignment: OpenAI-OFFICIAL self-published; eee's CR-12 cardinal-rule explicitly admits PROVIDER-COMPLEMENT (NOT replacement) — ALIGNED
- D8 industry adoption: 26,193 stars + 4,017 forks + 207 subscribers — strong
- D9 failure-mode awareness: 0.x pre-1.0 noted for advisory disclosure pinning to ==0.17.1; no documented FM-class in codex_consult_w134_f27a_OUT.txt or named-failure-modes.md
- D10 replacement viability: N/A — no replacement proposed (PROVIDER-COMPLEMENT to PRIMARY claude-agent-sdk; both coexist)

**CR-12 disposition**: PROVIDER-COMPLEMENT (class 4) per Wave 134 Fire 27-A precedent — "Anthropic SDK = direct CC control plane (PRIMARY); OpenAI SDK = provider-agnostic orchestration (ALTERNATIVE)"
**Disposition: ADOPT-ALTERNATIVE** per Wave 134 F27-A — but eee P7.a demand-gate still REJECTS install at this fire pending operator commitment to named consumer

**Mia self-overs** (4 self-probes; 3 VERIFIED-GENUINE + 1 REFUTED-OVER):
- Mia A: "P7.a DEMAND-ABSENCE applies — zero current consumer" → VERIFIED GENUINE via fresh rg returned 0 hits in `.py`
- Mia B: "CR-12 PROVIDER-COMPLEMENT NOT ECOSYSTEM-IMPORT despite 34 deps" → VERIFIED GENUINE via dry-run (31/34 satisfied; 3 NEW only; no parallel ecosystem like langgraph)
- Mia C: "Wave 134 Fire 27-A STUDY-PILOT-PATTERN-EXTRACT precedent still applies" → VERIFIED GENUINE via direct read of codex_consult_w134_f27a_OUT.txt EOF
- Mia D: "codex CLI + parallel-agent-wave + cross-model-consensus already provide multi-provider abstraction" → REFUTED-OVER: codex CLI = bilateral cross-model verification not N-provider abstraction; openai-agents is DIFFERENT-LAYER (n=297 Mia OVER catch — prevented commit-time framing drift)

**Forward path**: 
- (a) **CITE-ONLY adoption now** — extract 9 Wave 134 F27-A pattern candidates (Agent composition / Handoffs / Tracing / multi-provider routing / Anthropic ordering fix / Any-LLM adapter / MCP manager / Sandbox HITL / Realtime) at file:line into eee architecture docs WITHOUT pip install (zero install risk; zero ripple)
- (b) **Future install** when operator commits to named consumer (e.g., voice agent via `[realtime]` extra, LiteLLM multi-provider pilot, Sandbox Agent for long-horizon workspace tasks) — re-fire P7.b 5-clause check at that time

**Sister-rule integration**:
- CR-12 PROVIDER-COMPLEMENT class 4 honored — install gates SATISFIED post-W152 F6 PRIMARY land, but DEFER pip install per eee P7.a DEMAND-ABSENCE
- Wave 134 Fire 27-A precedent honored — STUDY-PILOT-PATTERN-EXTRACT class preserved at conf=0.86 (down from F27-A 0.89 due to eee-local P7.b 5-clause additional gate)
- agent-harness-fit-verification.md Probe 7 demand-gate honored — P7.a DEMAND-ABSENCE catches install premature; P7.b 5-clause = 1/5 FAIL
- SRA D1-D10 multi-dimensional convergence: 9/10 PASS
- kiss-dry-yagni Must-Never #4 honored — NOT duplicate of claude-agent-sdk; different architectural layer
- evidence-policy.md Marker Decay corollary applied — fresh probes 2026-05-11 supersede any stale priors

**FM ladders**:
- FM-09 codex-rescue blind-spot specialization: n=12/12 firm (carried from W152 F3 — orchestrator-side empirical V1 manifest-probe SAVED-SHIP catches V2 codex T1 blind-spot on L76+L419 PLANNED rows)
- Mia OVER ladder: n=293→n=297 (+4 this fire — A/B/C VERIFIED-GENUINE + D REFUTED-OVER catch)
- FM-20 path-drift cascade: no advance this fire (no fire-N→fire-N+1 cite propagation OVER caught)

**Recursive-dogfood validation**: this verdict ITSELF runs under W82d operator-override `bypassPermissions` (CR-7 Phase 1 carryover; awaiting auto-mode revert at Anthropic-classifier-reliable + Tier-5-INSTALLED + arc-convergence ≥7) — verdict is doc-only ARTIFACT-INLINE; zero state mutation; cross-model gate satisfied via this read-only audit + concurrent V2/V3 dispatch.
```

### Edit 3 — MEMORY.md single-line entry

**File**: `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md`
**Edit-shape**: APPEND single-line entry (~200 chars; per system-reminder MEMORY warning about over-long entries)
**Append text**:
```
- **Wave 152 Fire 7 (openai-agents-python install eligibility audit POST-W152 F6 PRIMARY land) DEFER pip install — STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY conf=0.86** — 3-voice fan-out 2026-05-11: V1 sota-researcher Opus 4.7 fresh probes [VERIFIED at `tmp/wave152-f7-v1-sota-researcher-openai-agents-2026-05-11.md` ~400 LOC]; V2+V3 codex T1 Path P pending. PRIMARY claude-agent-sdk==0.1.81 landed W152 F6 `45e376b` (CR-12 priority gate satisfied), BUT P7.a DEMAND-ABSENCE still holds (zero Python consumer in `.claude/hooks/scripts/`, `scripts/`, `tools/` per fresh rg); P7.b 5-clause = 1/5 PASS (only incumbent comparison; missing named use case + local source + wiring + time-box). SRA 9/10 + Probe DAG 6/7 + Mia OVER ladder n=293→n=297 (+4: A/B/C GENUINE + D REFUTED). FM-09 firm 12/12. CR-12 PROVIDER-COMPLEMENT honored. Forward: (a) CITE-ONLY 9 patterns at file:line per Wave 134 F27-A NOW; (b) pip install DEFER pending named consumer commitment (voice agent / LiteLLM pilot / Sandbox Agent). Install risk pre-recorded: openai 2.24→2.36 BUMP affects 10 venv consumers (deepeval/graphiti-core/instructor/litellm/etc.) — smoke-probe mandatory when fires.
```

---

VERDICT: STUDY-PILOT-PATTERN-EXTRACT-CITE-ONLY (DEFER pip install pending named consumer)
ship_readiness: DEFER
confidence: 0.86
cr12_class: PROVIDER-COMPLEMENT
sra_pass_count: 9/10
probe_dag_pass_count: 6/7
p7b_5clause_pass_count: 1/5
