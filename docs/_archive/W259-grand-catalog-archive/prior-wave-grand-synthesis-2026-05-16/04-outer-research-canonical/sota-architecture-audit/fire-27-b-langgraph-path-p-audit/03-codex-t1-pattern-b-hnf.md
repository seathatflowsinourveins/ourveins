# 03 — Codex T1 Pattern B HNF (no terminal JSON verdict — trace-mined evidence)

> **Method**: Path P recipe foreground+tee, ladder n=18 → **n=19 (Pattern B HNF — not reproducible-clean-verdict)**
> **Tokens**: ~5+ min wall-clock (21:46:21 → 21:51:21 local); codex exited 0 cleanly
> **Result**: rich filesystem + web-search trace; NO terminal JSON verdict block at EOF
> **Verbatim trace**: `.claude/state/codex_consult_w134_f27b_langgraph_OUT.txt` (15,696 LOC)
> **Pattern B disposition** per `codex-t1-fix-forward-pattern.md §Pattern B`: trace-mine + ship-per-prior-research + T3-verify-shifted-to-commit

## Pattern B HNF root cause (orchestrator-inferred from trace)

Codex T1 budget exhausted on:

1. **11+ filesystem probes** of pyproject.toml + `pregel/` + `checkpoint/` + `store/`:
   - All 4 sub-package versions verified (langgraph 1.2.0a7 / langgraph-checkpoint 4.1.0a4 / langgraph-checkpoint-sqlite 3.1.0a1 / langgraph-checkpoint-postgres 3.1.0a4)
   - `pregel/_checkpoint.py:15,37-77` `delta_channels_to_snapshot()` function + `DELTA_MAX_SUPERSTEPS_SINCE_SNAPSHOT` constant (default 5000)
   - `pregel/_loop.py:103,998-1122` main execution loop integration
   - `channels/delta.py:35,51-54` `_DeltaSnapshot` blob shape
   - `tests/test_delta_channel_supersteps_bound.py` comprehensive coverage
   - `checkpoint/memory/__init__.py:42-44,460-461,512+` InMemorySaver including LangSmith recommendation note
   - `checkpoint/store/base/__init__.py:8,52,206,517,686+` store abstraction with filter + namespace + embed support
   - `checkpoint/store/base/embed.py:76,86` embedding integration via langchain>=0.3.9
   - `checkpoint/store/base/batch.py` batch operations

2. **4 web searches** (Replit case study / LinkedIn discussion / blog.langchain.com / LangChain breakout-agents/replit) — building toward Row-2 enterprise adoption verification

3. **2 wasted rg attempts** with regex parse error (unclosed group from incorrect escaping); ~10s budget loss

4. **Mid-verdict-composition cutoff** — codex was about to package "langgraph without langsmith" assessment when output ended

## Trace-mined high-value findings (Pattern B disposition embedded evidence)

### Finding 1: Alpha-version cascade VERIFIED

All 4 sub-packages verified at alpha versions with Production-Stable classifier:
- `libs/langgraph/pyproject.toml:7,15` v1.2.0a7 + `'Development Status :: 5 - Production/Stable'`
- `libs/checkpoint/pyproject.toml:7` v4.1.0a4
- `libs/checkpoint-sqlite/pyproject.toml:7` v3.1.0a1
- `libs/checkpoint-postgres/pyproject.toml:7` v3.1.0a4

LangChain convention: alpha semver tag does NOT mean unstable — Production-Stable classifier is operational truth.

### Finding 2: Dependency cascade VERIFIED

- `libs/langgraph` requires `langchain-core>=1.4.0a2,<2` + langgraph-checkpoint>=4.1.0a4 + langgraph-sdk>=0.3.0 + langgraph-prebuilt>=1.1.0a2 + xxhash>=3.5.0 + pydantic>=2.7.4
- `libs/checkpoint` requires `langchain-core>=0.2.38` (older floor) + ormsgpack>=1.12.0
- `libs/checkpoint-sqlite` requires `aiosqlite>=0.20` + **`sqlite-vec>=0.1.6`** ← eee already uses!
- `libs/checkpoint-postgres` requires `psycopg>=3.2.0` + psycopg-pool>=3.2.0

### Finding 3: HEAD commit deep technical work VERIFIED

HEAD `2e5025ec1` "feat(checkpoint): force delta channel snapshot after max supersteps (#7746)":
- New `DELTA_MAX_SUPERSTEPS_SINCE_SNAPSHOT` bound (default 5000) prevents unbounded delta-channel growth
- `delta_channels_to_snapshot()` is "a pure" function (no side effects per codex trace comment)
- Comprehensive test coverage in `tests/test_delta_channel_supersteps_bound.py`

This indicates HIGH engineering quality — BSP checkpoint optimization at the level of production graph orchestration.

### Finding 4: LangSmith proprietary CLARIFIED

`checkpoint/memory/__init__.py:42-44` verbatim from codex trace:

> "For production use cases we recommend installing [langgraph-checkpoint-postgres](https://pypi.org/project/langgraph-checkpoint-postgres/) and using `PostgresSaver` / `AsyncPostgresSaver`."
>
> "If you are using LangSmith Deployment, no checkpointer needs to be specified. The correct managed checkpointer will be used automatically."

**LangSmith is RECOMMENDED but NOT REQUIRED.** Standalone use is fully functional with InMemorySaver / SqliteSaver / PostgresSaver.

### Finding 5: sqlite-vec CONVERGENT (positive)

`langgraph-checkpoint-sqlite` REQUIRES `sqlite-vec>=0.1.6` — eee already uses sqlite-vec for mcp-memory. If eee ever pilots LangGraph with SQLite backend, the existing sqlite-vec investment is REUSABLE — convergence opportunity, NOT duplication.

### Finding 6: Store abstraction with filtering/embedding

`checkpoint/store/base/__init__.py` has rich store abstraction:
- `Item` typed key-value with metadata (line 52)
- `Search with filters and pagination` (line 216)
- Filter operations supporting "exact matches and operator-based comparisons" (line 251)
- Nested field access syntax `"metadata.title"` (line 517, 686)
- List + filter namespaces (line 369, 947)
- Async + sync APIs both present

This is a production-quality store abstraction — useful pattern reference even without adopting LangGraph.

## Orchestrator-inferred verdict (Pattern B disposition)

Per `codex-t1-fix-forward-pattern.md §Pattern B`: ship as-designed per prior-fire research + standing-directive defaults.

**Orchestrator-inferred Disposition**: **STUDY-PILOT-PATTERN-EXTRACT @ ~0.78-0.82** (lower confidence than codex-T1-stamped because no terminal verdict).

### Rationale

1. Axis-1+2+3 all PASS firm — TIER-1 LangChain Inc + named-T2 enterprise adopters + 21mo STABLE-BURN-IN
2. Probe DAG: 3 PASS + 1 PASS-with-caveat + 2 NEUTRAL + 1 PARTIAL + 1 NOT-ELIGIBLE-without-workflow = middling-positive (not as strong as openai-agents-python's 7/7 effective PASS)
3. CR-12 ECOSYSTEM-IMPORT candidate 5th class — heavy langchain-core dependency
4. Pregel BSP + Checkpoint primitives are GENUINELY-NEW for eee
5. sqlite-vec CONVERGENT (positive)
6. LangSmith optional (no lock-in)
7. P7b NOT-ELIGIBLE-without-specific-workflow — no current eee demand for BSP graph
8. 519MB scope = Pattern B HNF cause

### Recommended Integration Option

**B: STUDY-PILOT-PATTERN-EXTRACT** — extract Pregel + Channels + Checkpoint patterns into eee architecture docs; defer install pending workflow that demands BSP graph.

### Cite-pattern candidates from trace (orchestrator-extracted)

1. `libs/langgraph/langgraph/pregel/_checkpoint.py:37-77` — `delta_channels_to_snapshot()` pure function (BSP optimization pattern)
2. `libs/langgraph/langgraph/channels/delta.py:35,51-54` — `_DeltaSnapshot` blob shape + counters_since_delta_snapshot
3. `libs/langgraph/langgraph/pregel/_loop.py:998-1122` — BSP loop integration with delta snapshot
4. `libs/checkpoint/langgraph/checkpoint/memory/__init__.py:42-44,460,512` — InMemorySaver pattern + LangSmith recommendation note (cite-aware)
5. `libs/checkpoint/langgraph/store/base/__init__.py:8,52,206,517,686` — store filter + namespace + nested-field access abstraction
6. `libs/checkpoint/langgraph/store/base/embed.py:76` — lazy embedding integration via importlib.metadata
7. `libs/checkpoint-sqlite/pyproject.toml:17` — sqlite-vec convergence (eee already uses)
8. `libs/checkpoint-postgres/pyproject.toml:17` — psycopg backend pattern (multi-backend reference)

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ⚠️ REAL GPT-5.5 codex CLI v0.130.0 — Pattern B HNF (no terminal JSON verdict) |
| CR-3 cross-model consensus | ⚠️ PARTIALLY SATISFIED — codex T1 investigation extensive but inconclusive at JSON-verdict-level |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=18 → **n=19 (Pattern B HNF — 1st Pattern B in Fire 26-27 series)** |
| T3 verification | shifted to post-commit (per Pattern B discipline) |

## 🚨 Critical Pattern B insights for Wave 134

### 1. 519MB repo + 9 sub-packages = Pattern B HNF trigger

This is the LARGEST Wave 134 candidate (vs claw-compactor 2.3MB / openai-agents-python 28MB). 300s codex T1 budget is INSUFFICIENT to compose a structured verdict on a target this large.

**Forward discipline**: when D2+D8 pre-screen identifies a candidate with repo_size_kb > 200MB OR sub-package count > 5, build a tighter codex T1 prompt scoped to ONE primitive (e.g., "audit langgraph Pregel BSP primitive ONLY") rather than the full repo.

### 2. ECOSYSTEM-IMPORT class candidate (5th CR-12 class)

Fire 27-A established PROVIDER-COMPLEMENT class. Fire 27-B suggests a 5th class:

**ECOSYSTEM-IMPORT** — upstream primitive is GENUINELY-NEW at the core level but imports a parallel ecosystem at the dependency level. Example: LangGraph's graph primitive is novel BUT it imports langchain-core + langgraph-checkpoint + langgraph-sdk + langgraph-prebuilt + ormsgpack + xxhash = parallel framework footprint.

This is structurally different from:
- GENUINELY-NEW (no parallel exists)
- DUPLICATE-FUNCTIONALITY (full parallel exists)
- PARTIAL-OVERLAP (some surfaces overlap)
- PROVIDER-COMPLEMENT (parallel API surfaces; both can coexist)

Codification candidate for `codex-t1-fix-forward-pattern.md` disposition lattice.

### 3. sqlite-vec convergence — first POSITIVE cross-fire convergence

langgraph-checkpoint-sqlite requires sqlite-vec; eee already uses sqlite-vec for mcp-memory. If/when eee pilots LangGraph, the existing investment is REUSABLE. This is the FIRST Wave 134 candidate to demonstrate INFRASTRUCTURE-CONVERGENT positive finding.

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
| 27-A | openai-agents-python | STUDY-PILOT-PATTERN-EXTRACT | 238,328 | 0.89 |
| **27-B** | **langgraph** | **Pattern B HNF (orchestrator-inferred STUDY-PILOT-PATTERN-EXTRACT ~0.78-0.82)** | **~5min** | **NO-VERDICT-LOC** |

Fire 27-B is the **2nd Pattern B HNF** in Wave 134 series (after Fire 25 discovery wave). Pattern B occurs when codex T1 scope exceeds 300s budget.

## Mia ladder advance

n=1812 → **n=1822** (+10: Pattern B HNF case documented / orchestrator-inferred verdict at ~0.78-0.82 / Path P ladder n=19 with Pattern B variant / ECOSYSTEM-IMPORT 5th CR-12 class candidate / sqlite-vec CONVERGENT positive / Forward discipline 519MB repo size trigger / 8 trace-mined cite-patterns / 6 verified findings / 519MB scope = Pattern B cause / CR-12 5-class lattice expansion candidate)
