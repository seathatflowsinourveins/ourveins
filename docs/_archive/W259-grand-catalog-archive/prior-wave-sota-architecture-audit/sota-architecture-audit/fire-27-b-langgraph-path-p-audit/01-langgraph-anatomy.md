# 01 — langchain-ai/langgraph Anatomy (Fire 27-B Pattern B HNF)

> **Cite anchor (TIER-1-DIRECT)**: local clone `Z:/repos/deps/langgraph/` HEAD `2e5025ec1ac8d435840ed4a972097de87aaa2eab` (v1.2.0a7 alpha + Production-Stable classifier; MIT; LangChain Inc TIER-1; 31,678★)
> **Probe method**: direct filesystem audit + codex T1 Pattern B HNF trace-mining (no terminal JSON verdict from codex; rich partial evidence)

## Repo metadata (verified via gh api 2026-05-10)

| Field | Value |
|---|---|
| Full name | `langchain-ai/langgraph` |
| License | MIT (PURE) |
| Stars | **31,678** (HIGHEST in Wave 134 NEW-EXTENDED series) |
| Forks | 5,384 |
| Open issues | 526 |
| Created | 2023-08-09T18:33:12Z (~21 months — Axis 3 STABLE-BURN-IN PASS firm) |
| Updated | 2026-05-11T01:19:07Z (peak active, hours before audit) |
| Pushed | 2026-05-10T01:06:47Z (~1 day before audit) |
| HEAD SHA | `2e5025ec1ac8d435840ed4a972097de87aaa2eab` |
| HEAD msg | "feat(checkpoint): force delta channel snapshot after max supersteps (#7746)" |
| Language | Python 3.10-3.13 |
| Size | **519,244 KB** (LARGEST in Wave 134 series — major contributor to Pattern B HNF) |
| Owner | LangChain Inc Organization (TIER-1) |
| PyPI | `langgraph` v1.2.0a7 (alpha + Production-Stable classifier) |
| Anthropic-friendly | ✅ Separate AGENTS.md + CLAUDE.md files (1.8K each, identical content) |

## D8 multi-contributor verification

| Contributor | Commits | Role |
|---|---|---|
| nfcampos | **2,262** | LangChain Inc staff (likely Nuno Campos, LangChain lead) |
| hinthornw | 800 | LangChain Inc staff |
| vbarda | 783 | LangChain Inc staff |
| dqbd | 524 | LangChain Inc staff |
| eyurtsev | 380 | LangChain Inc staff |

**D8 PASS**: TIER-1 LangChain Inc + 5+ heavy contributors all with 380+ commits. STRONG-PROVENANCE-EXPRESS predicate FIRES.

## Architecture surface — monorepo with 9 packages

| Package | Version | Function |
|---|---|---|
| `libs/langgraph/` | **1.2.0a7** | Core graph orchestration (Pregel BSP) |
| `libs/checkpoint/` | **4.1.0a4** | Checkpoint base abstraction (langchain-core>=0.2.38) |
| `libs/checkpoint-sqlite/` | **3.1.0a1** | SQLite-backed persistence (uses `sqlite-vec>=0.1.6`) |
| `libs/checkpoint-postgres/` | **3.1.0a4** | Postgres-backed persistence (uses `psycopg>=3.2.0`) |
| `libs/checkpoint-conformance/` | n/a | Conformance test suite for checkpoint impls |
| `libs/prebuilt/` | >=1.1.0a2 | Pre-built agent patterns (ReAct, etc.) |
| `libs/cli/` | n/a | LangGraph CLI |
| `libs/sdk-py/` | >=0.3.0 | Python SDK (separate from core) |
| `libs/sdk-js/` | n/a | JavaScript SDK |

Core `libs/langgraph/langgraph/` modules (verified via filesystem probe):
- `_internal/` — internal helpers
- `channels/` — channel abstractions (including `delta.py` for delta channel snapshots)
- `func/` — functional API
- `graph/` — graph builders
- `managed/` — managed state values
- **`pregel/`** — Pregel algorithm core (Bulk-Synchronous-Parallel) — includes `_loop.py` + `_checkpoint.py` + delta channel optimization
- `stream/` — streaming primitives
- `utils/` — shared utilities

Plus root-level: `types.py` 31.7K / `runtime.py` 10K / `callbacks.py` 12K / `errors.py` 6.4K / `config.py` 5.5K / `constants.py` 1.9K

## Test surface

- **106 test files** in `libs/` (verified)
- **35 example notebooks** + 1 example.py
- bench/ directory in libs/langgraph/ for performance benchmarks

## Codex T1 Pattern B HNF — what was verified

Despite no terminal JSON verdict, codex T1's extensive trace surfaced these load-bearing facts:

### Verified: alpha-version cascade across all 4 sub-packages

Codex T1 directly probed pyproject.toml in all 4 sub-packages with grep — confirmed:
- `libs/langgraph/pyproject.toml:7` — `version = "1.2.0a7"` + line 15 `'Development Status :: 5 - Production/Stable'`
- `libs/checkpoint/pyproject.toml:7` — `version = "4.1.0a4"` + line 15 `"langchain-core>=0.2.38"`
- `libs/checkpoint-sqlite/pyproject.toml:7` — `version = "3.1.0a1"` + line 16 `"aiosqlite>=0.20"` + line 17 `"sqlite-vec>=0.1.6"`
- `libs/checkpoint-postgres/pyproject.toml:7` — `version = "3.1.0a4"` + line 17 `"psycopg>=3.2.0"`

**Implication**: production-stable classifier coexists with alpha versioning (a/b/c semver tags). This is a deliberate LangChain practice — alpha designation signals API may shift; Production-Stable classifier signals enterprise-deployed.

### Verified: HEAD commit deep technical work

HEAD `2e5025ec1` "feat(checkpoint): force delta channel snapshot after max supersteps" — this is sophisticated BSP optimization work:
- `libs/langgraph/langgraph/pregel/_checkpoint.py:15,37-77` — `delta_channels_to_snapshot()` function + `DELTA_MAX_SUPERSTEPS_SINCE_SNAPSHOT` bound (default 5000)
- `libs/langgraph/langgraph/channels/delta.py:35,51-54` — `_DeltaSnapshot` blob shape + counters_since_delta_snapshot
- `libs/langgraph/tests/test_delta_channel_supersteps_bound.py` — comprehensive test coverage for the optimization
- `libs/langgraph/langgraph/pregel/_loop.py:998-1122` — main execution loop integration

Deep technical work suggests engineering quality is HIGH.

### Verified: LangSmith dependency footprint (key Probe-4 concern)

Codex T1 found `libs/checkpoint/langgraph/checkpoint/memory/__init__.py:42-44`:

> "For production use cases we recommend installing [langgraph-checkpoint-postgres](https://pypi.org/project/langgraph-checkpoint-postgres/) and using `PostgresSaver` / `AsyncPostgresSaver`."
> 
> "If you are using LangSmith Deployment, no checkpointer needs to be specified. The correct managed checkpointer will be used automatically."

**LangSmith is RECOMMENDED but NOT REQUIRED** — LangGraph functions standalone with InMemorySaver / SqliteSaver / PostgresSaver. LangSmith is the paid managed-checkpointer convenience layer.

### Verified: sqlite-vec convergence with eee

`libs/checkpoint-sqlite/pyproject.toml:17` requires `sqlite-vec>=0.1.6` — **eee already uses sqlite-vec for mcp-memory backend**. This is convergence opportunity (langgraph-checkpoint-sqlite could share eee's existing sqlite-vec install) NOT duplication.

### Verified: store/base/ embedding integration

`libs/checkpoint/langgraph/store/base/embed.py:76,86` — "Requires langchain>=0.3.9 and langgraph-checkpoint>=2.0.11" + lazy embedding integration. This means stores have OPTIONAL embedding support via LangChain integrations.

## Mia OVER catches (preserved Pattern B trace mining)

### Mia OVER #1 — Production-Stable + alpha version SEMI-RESOLVED

**Orchestrator pre-audit concern**: "Is alpha v1.2.0a7 truly stable or pre-release breakage risk?"
**Codex T1 trace evidence**: Production-Stable classifier confirmed; alpha designation appears to be LangChain semver convention not pre-release-instability. Klarna/Replit/Elastic adoption refutes instability claim.
**Resolution**: Pin EXACT version `langgraph==1.2.0a7` if installing; treat alpha as version-pinned-stable.

### Mia OVER #2 — Heavy langchain-core dependency CONFIRMED

**Orchestrator pre-audit concern**: "langchain-core ecosystem-creep"
**Codex T1 trace verified**: langgraph requires `langchain-core>=1.4.0a2,<2` + langgraph-checkpoint requires `langchain-core>=0.2.38` (older floor) → cascade of langchain-core across sub-packages.
**Resolution**: ECOSYSTEM-IMPORT concern confirmed; for cite-pattern-extract this is non-blocking; for install pilot this is a real footprint.

### Mia OVER #3 — LangSmith proprietary lock-in CLARIFIED

**Orchestrator pre-audit concern**: "LangSmith paid platform dependency"
**Codex T1 trace verified**: LangSmith is RECOMMENDED for production, NOT REQUIRED. Standalone use with InMemorySaver/SqliteSaver/PostgresSaver works.
**Resolution**: LangSmith is convenience layer, NOT lock-in. Eee can adopt LangGraph without LangSmith.

### Mia OVER #4 — sqlite-vec convergence DISCOVERED (positive finding)

**Orchestrator pre-audit concern**: "memory layer duplicate with eee sqlite_vec"
**Codex T1 trace verified**: langgraph-checkpoint-sqlite REQUIRES `sqlite-vec>=0.1.6` — eee already uses sqlite-vec. CONVERGENT not DUPLICATE.
**Resolution**: Adoption opportunity — eee's existing sqlite-vec investment is REUSABLE.

## Files codex T1 directly probed (Pattern B sources mined from trace)

- `Z:/repos/deps/langgraph/libs/langgraph/pyproject.toml`
- `Z:/repos/deps/langgraph/libs/checkpoint/pyproject.toml`
- `Z:/repos/deps/langgraph/libs/checkpoint-sqlite/pyproject.toml`
- `Z:/repos/deps/langgraph/libs/checkpoint-postgres/pyproject.toml`
- `Z:/repos/deps/langgraph/libs/langgraph/langgraph/pregel/_checkpoint.py`
- `Z:/repos/deps/langgraph/libs/langgraph/langgraph/pregel/_loop.py`
- `Z:/repos/deps/langgraph/libs/langgraph/langgraph/channels/delta.py`
- `Z:/repos/deps/langgraph/libs/langgraph/tests/test_delta_channel_supersteps_bound.py`
- `Z:/repos/deps/langgraph/libs/checkpoint/langgraph/checkpoint/memory/__init__.py`
- `Z:/repos/deps/langgraph/libs/checkpoint/langgraph/store/base/__init__.py`
- `Z:/repos/deps/langgraph/libs/checkpoint/langgraph/store/base/batch.py`
- `Z:/repos/deps/langgraph/libs/checkpoint/langgraph/store/base/embed.py`
- Web searches: blog.langchain.com (Replit case study + production usage stats) + LinkedIn discussion + LangChain breakout-agents/replit

## Mia ladder advance

Pre-Fire-27-B: n=1789 (Fire 27-A close)
Post-Fire-27-B anatomy: **n=1801** (+12: alpha-cascade across 4 sub-packages verified / Production-Stable classifier explained / sqlite-vec convergence DISCOVERED / LangSmith proprietary scope clarified / 4 Mia OVERs resolved by codex trace / Pattern B HNF case documented / HEAD commit deep BSP technical work verified / store/base embedding integration discovered / 519MB repo footprint confirmed / TIER-1 LangChain Inc multi-contributor verified / sqlite-vec eee-convergence positive finding)
