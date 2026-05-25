# 00 — Wave 134 Fire 27-B Tracker (langchain-ai/langgraph Path P Audit)

> **Subject**: `langchain-ai/langgraph` @ HEAD `2e5025ec1ac8d435840ed4a972097de87aaa2eab` (v1.2.0a7; MIT; LangChain TIER-1; 31,678★)
> **Pre-screen**: D2+D8 PASS (pushed 1 day ago; LangChain org + 5 contributors >300 commits). 2nd Fire 27 post-pre-screen-mandate audit.
> **Hypothesis**: STRONG-CANDIDATE — likely STUDY-PILOT-PATTERN-EXTRACT with focus on Pregel + Channel + Checkpoint primitives. Anthropic has NO graph framework parallel — different from Fire 27-A (which had openai-agents-python vs claude-agent-sdk-python parity).
> **Critical CR-12 difference**: No direct Anthropic equivalent — but heavy `langchain-core` ecosystem dependency may force Probe-4 SCOPE-CREEP concern.

## Pre-flight Mia probe (PASSED via D2+D8 pre-screen)

| Probe | Outcome |
|---|---|
| Repo exists @ github | ✅ `langchain-ai/langgraph` |
| LICENSE | ✅ MIT |
| Stars | 31,678 (HIGHEST in pre-screen) |
| Forks | 5,384 |
| Created | 2023-08-09 (~21 months — Axis 3 STABLE-BURN-IN PASS) |
| Pushed | 2026-05-10T01:06Z (~1 day before audit — ACTIVE) |
| HEAD | `2e5025ec1ac8d435840ed4a972097de87aaa2eab` |
| HEAD msg | "feat(checkpoint): force delta channel snapshot after max supersteps (#7746)" |
| Local clone | ✅ Z:/repos/deps/langgraph (depth=50 fresh fetch) |
| Language | Python 3.10-3.13 |
| PyPI | `langgraph` v1.2.0a7 (alpha — but Production-Stable classifier) |
| Owner | LangChain Inc Organization (TIER-1) |
| Top contributors | nfcampos 2,262 / hinthornw 800 / vbarda 783 / dqbd 524 / eyurtsev 380 (5+ heavy contributors) |
| Test surface | **106 test files** (in libs/) + **35 example notebooks** + 1 example.py |
| Repo size | 519 MB (LARGEST in Wave 134 series — large enterprise codebase) |
| Enterprise adopters | Klarna, Replit, Elastic (TIER-1 production users) |
| Academic foundation | Pregel (Google) + Apache Beam + NetworkX |

## Architecture surface (monorepo with 9 packages under libs/)

| Package | Function |
|---|---|
| `langgraph/` | Core graph orchestration framework |
| `prebuilt/` | Pre-built agent patterns (ReAct, etc.) |
| `checkpoint/` | Checkpoint base abstraction |
| `checkpoint-postgres/` | Postgres-backed checkpoint persistence |
| `checkpoint-sqlite/` | SQLite-backed checkpoint persistence |
| `checkpoint-conformance/` | Conformance test suite for checkpoint impls |
| `cli/` | LangGraph CLI |
| `sdk-py/` | Python SDK (separate from core) |
| `sdk-js/` | JavaScript SDK |

Core `libs/langgraph/langgraph/` modules:
- `_internal/` — internal helpers
- `channels/` — channel abstractions (Pregel-style)
- `func/` — functional API
- `graph/` — graph builders
- `managed/` — managed state values
- `pregel/` — **Pregel algorithm core** (Bulk-Synchronous-Parallel)
- `stream/` — streaming primitives
- `utils/` — shared utilities

Plus root-level: `types.py` 31.7K / `runtime.py` 10K / `callbacks.py` 12K / `errors.py` 6.4K / `runtime.py` 10K / `config.py` 5.5K / `constants.py` 1.9K

## Key LangGraph primitives (relevant to eee adoption)

1. **Pregel BSP execution model** — Bulk-Synchronous-Parallel graph computation (Google Pregel foundation)
2. **Channels** — typed message passing between graph nodes
3. **Checkpoint persistence** — durable state across runs (Postgres / SQLite / custom)
4. **Human-in-the-loop interrupts** — pause execution + inspect/modify state + resume
5. **Streaming** — partial results during long-running graph execution
6. **Functional API** — alternative to graph builder (callable-based composition)
7. **LangSmith debugging** — visualization + state tracing + runtime metrics (paid platform)
8. **Memory (short-term + long-term)** — stateful agents with persistent memory across sessions

## Mia OVER potential (preserve for codex T1 catch)

1. **Heavy LangChain ecosystem dependency** — `langchain-core>=1.4.0a2` + langgraph-checkpoint + langgraph-sdk + langgraph-prebuilt — adopting LangGraph imports the entire LangChain ecosystem (potentially conflicts with Anthropic-native primitives)
2. **LangSmith proprietary integration** — debugging/observability requires LangSmith (paid). Free use without LangSmith may be limited.
3. **Alpha version v1.2.0a7** — but Production-Stable classifier. Resolve: is alpha truly stable or pre-release breakage risk?
4. **No Anthropic-direct integration** — LangGraph is Anthropic-via-langchain-core; tool_use handling depends on langchain-core's Anthropic adapter quality
5. **Probe-4 against existing eee primitives**:
   - vs Anthropic `claude-agent-sdk-python` (NO graph parallel — possibly GENUINELY-NEW)
   - vs `cwc-long-running-agents` (different mechanism — graph vs hook-based runtime)
   - vs eee 12 agents (Different LAYER — Python orchestration vs CC subagent defs)
   - vs openai-agents-python (Different APPROACH — graph vs SDK class-based)
6. **CR-12 cross-vendor question** — Anthropic ships NO graph framework. This is closer to GENUINELY-NEW than PROVIDER-COMPLEMENT.
7. **Repo size 519 MB** — LARGEST in Wave 134 series. Probe footprint impact.

## Audit dimensions (10-axis Path P + multi-convergence per SRA)

1. **D1 license** — MIT (PASS; permissive)
2. **D2 freshness** — pushed 1 day ago (PASS — ACTIVE)
3. **D3 fresh-paint detection** — 31K stars / 21 months / 519MB → density check OK
4. **D4 maintainer provenance** — TIER-1 LangChain org — STRONG-PROVENANCE-EXPRESS predicate FIRES (named-T2: Harrison Chase founder + heavy multi-contributor + production user evidence)
5. **D5 active-maintenance signals** — 5,384 forks + 526 open issues + active CI + monorepo with 9 packages → STRONG ACTIVE
6. **D6 mode-harness-shape** — Python SDK + heavy LangChain dependency → COMPATIBLE but with ECOSYSTEM-IMPORT cost
7. **D7 Anthropic CC official policy alignment** — Anthropic does NOT ship graph framework; LangChain is third-party — Anthropic ecosystem-neutral
8. **D8 industry adoption** — TIER-1 enterprise users (Klarna/Replit/Elastic) + 31K stars + 5K forks → STRONG adoption
9. **D9 failure-mode awareness** — verify FM-class candidates (Pregel BSP might trigger FM-17 fleet-depletion at scale? alpha-version pre-release risk?)
10. **D10 replacement viability** — vs Anthropic SDK (no overlap), vs openai-agents-python (different paradigm), vs cwc-long-running-agents (different layer) — GENUINELY-NEW for graph orchestration

## Four integration options

| Option | Description | Verdict expectation |
|---|---|---|
| A: APPROVE-INSTALL | `pip install langgraph` + full LangChain ecosystem import | HIGH-RISK — ecosystem-creep (langchain-core + langsmith); Probe-4 concern on importing parallel LangChain stack |
| B: STUDY-PILOT-PATTERN-EXTRACT | Extract Pregel + Channels + Checkpoint patterns into eee docs WITHOUT installing | MID-PROBABILITY — patterns are GENUINELY-NEW (no Anthropic equivalent) but heavy dependencies suggest cite-first |
| C: STUDY-PILOT-NARROW | Isolated venv pilot of langgraph for specific use case (e.g., one HITL workflow) | POSSIBLE — graph primitive may unlock cwc-long-running-agents patterns |
| D: REJECT-FOR-FIT | If ecosystem-import cost too high OR alpha-version unstable | LOW-PROBABILITY — production-stable classifier + Klarna/Replit/Elastic adoption refutes |
| E: CITE-PATTERN-ONLY | Reference architecture only | LOW — patterns are too rich to leave at cite-only |

## Sub-task tracker

- [x] Mia D2+D8 pre-screen PASS
- [x] Local clone + fresh fetch to HEAD
- [x] Tracker (this file)
- [ ] README + AGENTS.md/CLAUDE.md + pyproject.toml line-by-line
- [ ] libs/langgraph/langgraph/pregel/ + channels/ tour
- [ ] codex T1 Path P consult prompt build
- [ ] codex T1 Path P fire
- [ ] 01-anatomy.md
- [ ] 02-probe-dag-application.md
- [ ] 03-codex-t1-verdict.md
- [ ] 99-close-synthesis.md
- [ ] install-provenance.md append
- [ ] atomic commit (FM-02 sub-class (b) defense)

## Verification queries (for codex T1 prompt)

- `Z:/repos/deps/langgraph/libs/langgraph/pyproject.toml:1-80`
- `Z:/repos/deps/langgraph/README.md` (full)
- `Z:/repos/deps/langgraph/AGENTS.md` + `CLAUDE.md` (1.8K each)
- `Z:/repos/deps/langgraph/libs/langgraph/langgraph/pregel/` (Pregel core)
- `Z:/repos/deps/langgraph/libs/langgraph/langgraph/channels/` (Channels)
- `Z:/repos/deps/langgraph/libs/checkpoint/` (Checkpoint base)
- `Z:/repos/deps/langgraph/libs/checkpoint-postgres/`
- `Z:/repos/deps/langgraph/libs/checkpoint-sqlite/`
- LangSmith documentation references (paid platform dependency check)

## Cite anchors (TIER-1-DIRECT)

- TIER-1-DIRECT: `Z:/repos/deps/langgraph/` HEAD `2e5025ec1ac8d435840ed4a972097de87aaa2eab` MIT v1.2.0a7
- TIER-1-DIRECT: `https://docs.langchain.com/oss/python/langgraph/overview` (canonical docs)
- TIER-1-DIRECT: `https://pypi.org/project/langgraph/` v1.2.0a7 alpha
- TIER-1-ALT: Google Pregel paper `https://research.google/pubs/pub37252/` (academic foundation)

## Discipline conformance gates

- ✅ CR-1: TIER-1-DIRECT cite chain (LangChain org)
- ✅ CR-3: cross-model gate via Path P codex T1 REAL GPT-5.5
- 🟡 CR-9: install-risk PENDING — ecosystem-creep concern + alpha-version pin + 2-round fix-forward budget
- ✅ CR-10: research-first-then-install — audit before install
- ✅ CR-11: META-process — multi-axis Path P prompt + 10-D SRA
- 🟡 CR-12: upstream-install-priority — Anthropic ships NO graph framework, so NO direct conflict; but langchain-core ecosystem-import IS a parallel framework concern
- ✅ FM-02 sub-class (b): atomic git add + commit --only -- pathspec defense
- ✅ User directive 2026-05-10 D2+D8 pre-screen: APPLIED (2nd post-mandate fire)
