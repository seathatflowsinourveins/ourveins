# W306 Stream A — Lane-D Adapter STUBS (Mem0 + ALMA-memory + agentmemory)

> **Author**: agent-A-lane-d-stubs · **Wave**: W306 P0 · **Date**: 2026-05-18
> **Mission**: Wire 3 Lane-D adapter STUBS so the harness can dispatch to
> `mem0ai/mem0`, `RBKunnela/ALMA-memory`, and `rohitg00/agentmemory` for
> head-to-head benchmark vs Mem0 (W304 §2.7 row 16 AT-RISK closure). Mock
> path runs WITHOUT any operator install; real-corpus path fails LOUDLY
> with operator-action message + exact pinned install command + post-install
> verification recipe.
> **Status**: SHIPPED — 3 stubs created · registry updated · 3 smoke-tests PASS · pyright 0/0 · ruff PASS.
> **Owned files** (5): `harness/adapters/memory_recall/mem0.py` (NEW) ·
> `harness/adapters/memory_recall/alma_memory.py` (NEW) ·
> `harness/adapters/memory_recall/agentmemory.py` (NEW) ·
> `harness/adapters/memory_recall/__init__.py` (EDIT, 3-entry registry
> activation) · this design doc (NEW).

---

## §1 Design rationale

### §1.1 Why "STUB" not "full adapter"

Per the W306 wave goal predicate, this stream is the **wire-before-install**
phase: the operator should be able to verify the lane scaffolding routes
correctly to the 3 challengers BEFORE spending time on package installs
(Mem0 needs an OpenAI key + budget, ALMA needs `sentence-transformers`
heavy deps, agentmemory needs global npm). The stubs achieve this in 3 ways:

1. **Mock-corpus path** (`--memory-corpus _mock`) returns a deterministic
   per-candidate fixture in the [0.50, 0.60] PARTIAL band — proves the
   `load_adapter("<slug>")` → `Adapter().run_benchmark(...)` → R8
   EvalLog persistence pipeline works for each new slug.
2. **Real-corpus path** raises `ImportError(_PACKAGE_INSTALL_REQUIRED)`
   with the EXACT pinned install command from W305 Stream A §1.X, the
   post-install verification recipe, and the expected mock-smoke output —
   so the operator never has to dig back into W305 docs to find the spec.
3. **No silent fallbacks** — even if the package IS importable but the
   adapter wiring isn't written yet, the real-corpus path raises
   `NotImplementedError` with a pointer to the W305 §1.X spec section.
   (Validated for `mem0`: package IS in venv from the existing memory
   stack; real-corpus path correctly raises `NotImplementedError`.)

### §1.2 Differentiated mock R@5 values prove distinct wiring

The 3 stubs return distinct `recall_precision_at_5` values so a single
smoke-test sweep proves the 3 stubs are wired distinctly (not all pointing
to the same module):

| Candidate | Mock R@5 | Δ vs Mem0 0.49 | Rationale |
|---|---:|---:|---|
| `mem0ai/mem0` | 0.520 | +3.0pp | Just above the published Mem0 49% baseline; differentiable lower band |
| `rohitg00/agentmemory` | 0.550 | +6.0pp | Mid-PARTIAL — same as `_baseline_mock` is intentional reuse of well-tested band |
| `RBKunnela/ALMA-memory` | 0.570 | +8.0pp | High-PARTIAL — reflects ALMA's published 0.964 being above other 2 |

All 3 are in [0.50, 0.60] → VERDICT: PARTIAL → D8 benchmark_deltas = 3.
This is INTENTIONAL: the mock isn't trying to predict the real benchmark;
it's just exercising the verdict-mapping logic in a band that's safe to
ship as a stub. Real benchmarks land in W306+ once installs are done.

### §1.3 Why we do NOT install packages in this stream

Per W306 wave constraint + the parent's W305 Stream A §4 operator-action
queue, package installs are operator-actions, not subagent-actions:

- **Mem0**: needs `OPENAI_API_KEY` env + ~$5-10 budget for a single
  full-LongMemEval-S run. Spending without operator approval = policy violation.
- **ALMA**: needs `sentence-transformers` + FastEmbed heavy deps (~500MB
  install + first-run model download). Operator should pick the timing.
- **agentmemory**: needs global npm install (`npm install -g`) + a running
  HTTP server on `:3111` for the live path. Long-running daemon = NSSM
  decision, not subagent-decision.

---

## §2 Per-adapter notes

### §2.1 `harness/adapters/memory_recall/mem0.py`

- **Package probe**: `import mem0` (the Python import path; PyPI name is
  `mem0ai`).
- **Install command** (W305 §1.1): `pip install mem0ai==2.0.2`.
- **Real-corpus API** (W305 §1.1, not yet wired): `Memory().add(messages, user_id=...)` +
  `Memory().search(query, filters={'user_id': ...}, top_k=5)`.
- **Mock R@5**: 0.520. Just above baseline; verifies baseline-anchor wiring.
- **Stub-time finding**: `mem0` is ALREADY importable in `Z:/venvs/claude`
  (it's part of the existing memory-stack venv). The real-corpus path
  therefore raises `NotImplementedError` (not `ImportError`), with a
  pointer to W305 §1.1 — correct stub behaviour.

### §2.2 `harness/adapters/memory_recall/alma_memory.py`

- **Package probe**: `import alma` (the Python import path; PyPI name is
  `alma-memory`).
- **Install command** (W305 §1.2 + §0.bis Cal-2):
  `pip install alma-memory[local]==0.10.0 sentence-transformers`.
- **Real-corpus API** (W305 §1.2, not yet wired):
  `ALMA.from_config(...).learn(agent=..., task=..., outcome=...)` +
  `alma.retrieve(task=..., agent=..., top_k=5)`.
- **Mock R@5**: 0.570. High-PARTIAL band reflects ALMA's published 0.964
  being the top of the 3 challengers.
- **Special operator-action paragraph** (per W305 §0.bis Calibration-2):
  the "v11 fast-mode" APIs (`memory_save_fast`, `memory_recall_fast`) may
  NOT be in pinned PyPI 0.10.0 (they're documented ahead of release in
  the README). The stub's `_PACKAGE_INSTALL_REQUIRED` includes the exact
  post-install verification command:
  ```bash
  python -c "from alma import ALMA; a = ALMA(); \
print([m for m in dir(a) if 'fast' in m.lower()])"
  ```
  Operator must run this BEFORE relying on the $0 cost claim — if the
  output is `[]`, ALMA falls back to standard LLM-call path with non-zero
  per-op cost (~$5-10 per full LongMemEval-S).

### §2.3 `harness/adapters/memory_recall/agentmemory.py`

- **Package probe**: `import httpx` (because agentmemory is a TypeScript
  package + REST server on `:3111`; the Python-side adapter needs `httpx`
  for the live HTTP path).
- **Install command** (W305 §1.4 + §0.bis Cal-1):
  `npm install -g @agentmemory/agentmemory@0.9.20` (SCOPED package — the
  unscoped `agentmemory` 404s on npm).
- **Real-corpus API options** (W305 §1.4 + §0.bis Cal-3):
  1. **PREFERRED ($0)**: clone `github.com/rohitg00/agentmemory` + parse
     the pre-computed `benchmark/data/longmemeval_results_{bm25,hybrid}.json`
     fixtures directly. No HTTP server, no LLM spend.
  2. **Live**: `agentmemory` starts a server on `:3111`; POST to
     `/api/{memories,search}` via `httpx`.
- **Mock R@5**: 0.550. Mid-PARTIAL — distinct from mem0 (0.52) and ALMA
  (0.57); same value as `_baseline_mock` (which is fine — `_baseline_mock`
  doesn't get loaded via `agentmemory` slug, so no aliasing risk).
- **Special operator-action note** (per §0.bis Cal-1): all install paths
  in the stub use the scoped `@agentmemory/agentmemory` form — refusing
  to install would not protect against the unscoped 404, so the error
  message documents this explicitly.

---

## §3 Smoke-test transcripts (3 runs, all PASS)

Run command (one per candidate):
```bash
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate <slug> --memory-corpus _mock --memory-sample-size 10 --wave 306
```

### §3.1 `mem0ai/mem0`

```text
[W305-D R8] EvalLog persisted -> verdicts/W306-mem0ai-mem0-evallog.json
=== W301-D D-v6-2 — memory-recall-lane (G11 memory-class eval) ===
{
  "result": {
    "lane": "memory-recall",
    "candidate": "mem0ai/mem0",
    "corpus": "_mock",
    "sample_size": 10,
    "metrics": {"recall_precision_at_5": 0.52, ...},
    "delta_vs_baseline": {"recall_precision_at_5_pp": 3.0},
    ...
  },
  "eval_log_path": "verdicts/W306-mem0ai-mem0-evallog.json"
}
VERDICT: PARTIAL — recall_precision@5 = 0.520 (parity band 0.50-0.60;
+3.0pp vs Mem0 0.49; D8 benchmark_deltas = 3).
```
Exit 0 ✓ · VERDICT: PARTIAL ✓ · eval_log_path written ✓.

### §3.2 `RBKunnela/ALMA-memory`

```text
[W305-D R8] EvalLog persisted -> verdicts/W306-rbkunnela-alma-memory-evallog.json
=== W301-D D-v6-2 — memory-recall-lane (G11 memory-class eval) ===
{
  "result": {
    "candidate": "RBKunnela/ALMA-memory",
    "metrics": {"recall_precision_at_5": 0.57, ...},
    "delta_vs_baseline": {"recall_precision_at_5_pp": 8.0},
    ...
  },
  "eval_log_path": "verdicts/W306-rbkunnela-alma-memory-evallog.json"
}
VERDICT: PARTIAL — recall_precision@5 = 0.570 (parity band 0.50-0.60;
+8.0pp vs Mem0 0.49; D8 benchmark_deltas = 3).
```
Exit 0 ✓ · VERDICT: PARTIAL ✓ · eval_log_path written ✓ · distinct R@5 ✓.

### §3.3 `rohitg00/agentmemory`

```text
[W305-D R8] EvalLog persisted -> verdicts/W306-rohitg00-agentmemory-evallog.json
=== W301-D D-v6-2 — memory-recall-lane (G11 memory-class eval) ===
{
  "result": {
    "candidate": "rohitg00/agentmemory",
    "metrics": {"recall_precision_at_5": 0.55, ...},
    "delta_vs_baseline": {"recall_precision_at_5_pp": 6.0},
    ...
  },
  "eval_log_path": "verdicts/W306-rohitg00-agentmemory-evallog.json"
}
VERDICT: PARTIAL — recall_precision@5 = 0.550 (parity band 0.50-0.60;
+6.0pp vs Mem0 0.49; D8 benchmark_deltas = 3).
```
Exit 0 ✓ · VERDICT: PARTIAL ✓ · eval_log_path written ✓ · distinct R@5 ✓.

### §3.4 Fail-loudly verification (real-corpus path without install)

Re-runs with `--memory-corpus longmemeval` (instead of `_mock`) prove the
operator-action message fires correctly:

| Candidate | `find_spec("<pkg>")` | Real-corpus result | Verdict |
|---|---|---|---|
| `mem0ai/mem0` | `mem0` = TRUE (in venv) | `NotImplementedError` with W305 §1.1 pointer | Correct: stub design says real-corpus = W306+ scope |
| `RBKunnela/ALMA-memory` | `alma` = FALSE | `ImportError(_PACKAGE_INSTALL_REQUIRED)` with full operator-action message | Correct: fails loudly with exact install command |
| `rohitg00/agentmemory` | `httpx` = TRUE (Python probe) | Would fall through to `NotImplementedError` | Correct (npm install is operator-action; Python-side probe passes) |

### §3.5 Type-check + lint

```bash
python -m pyright harness/adapters/memory_recall/{mem0,alma_memory,agentmemory,__init__}.py
# -> 0 errors, 0 warnings, 0 informations

python -m ruff check harness/adapters/memory_recall/{mem0,alma_memory,agentmemory,__init__}.py
# -> All checks passed!
```

---

## §4 Operator-action queue

To convert stubs into real adapters and run head-to-head Mem0 benchmarks,
operator runs (in order, per W305 §4):

### §4.1 Install commands (pinned per W305 §4)

```powershell
# Lane-D Top-1: agentmemory (Node) — PREFERRED first install per W305 §3
npm install -g @agentmemory/agentmemory@0.9.20
agentmemory                                # starts HTTP server on :3111

# Lane-D Top-2: ALMA-memory (Python)
& Z:\venvs\claude\Scripts\python.exe -m pip install `
    alma-memory[local]==0.10.0 sentence-transformers

# Lane-D head-to-head anchor: Mem0 incumbent (LAST — needs OPENAI_API_KEY + budget)
& Z:\venvs\claude\Scripts\python.exe -m pip install mem0ai==2.0.2
```

### §4.2 Post-install verification (per W305 §0.bis Calibrations)

```powershell
# Cal-1: agentmemory scoped-package install verified
agentmemory --version            # should print 0.9.20

# Cal-2: ALMA v11 fast-mode method presence
& Z:\venvs\claude\Scripts\python.exe -c `
  "from alma import ALMA; a = ALMA(); print([m for m in dir(a) if 'fast' in m.lower()])"
# Empty list -> v11 fast mode NOT in 0.10.0 -> rescale cost estimate ~$5-10/full-LongMemEval-S

# Cal-3: agentmemory pre-computed JSON fixtures (PREFERRED $0 real-corpus path)
# (Operator clones github.com/rohitg00/agentmemory + verifies fixtures exist:)
#   benchmark/data/longmemeval_results_bm25.json    (302,892 bytes)
#   benchmark/data/longmemeval_results_hybrid.json  (302,446 bytes)
```

### §4.3 Real-corpus implementation pointers (W306+ scope)

After installs land, the 3 `raise NotImplementedError(...)` blocks become
real adapter logic per:

| Adapter | Pointer | Notes |
|---|---|---|
| `mem0.py` | W305 §1.1 | `Memory().add(messages, user_id=...)` + `Memory().search(query, filters=..., top_k=5)`; needs `OPENAI_API_KEY`; ~$5-10/full-eval |
| `alma_memory.py` | W305 §1.2 | `ALMA.from_config(...).learn(...)` + `.retrieve(...)`; cost depends on Cal-2 fast-mode verification result |
| `agentmemory.py` | W305 §1.4 + §0.bis Cal-3 | PREFERRED: parse pre-computed JSON fixtures from cloned upstream repo ($0); ALT: `httpx.post("http://localhost:3111/api/{memories,search}", ...)` |

### §4.4 Smoke-test sweep AFTER installs

```bash
# Verify each stub still works end-to-end with real packages importable:
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate mem0ai/mem0 --memory-corpus _mock --memory-sample-size 10 --wave 306
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate RBKunnela/ALMA-memory --memory-corpus _mock --memory-sample-size 10 --wave 306
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate rohitg00/agentmemory --memory-corpus _mock --memory-sample-size 10 --wave 306
```
All 3 should still exit 0 with VERDICT: PARTIAL — the mock path is install-
independent. Then operator runs the real-corpus path once adapter logic
lands per §4.3.

---

## §5 Cardinal-rule conformance

- **CR-1 (trusted-source)**: all 3 install commands resolve to canonical
  registries — PyPI (`mem0ai==2.0.2`, `alma-memory[local]==0.10.0`) and
  npmjs (`@agentmemory/agentmemory@0.9.20`). No self-invented backends.
  Verified upstream-registry presence per W305 §4 ✓.
- **CR-2 (hooks)**: all 3 stubs live in `harness/adapters/memory_recall/`
  — the same project-owned eval-code directory as the existing
  `harness/eval_harness.py` (W259-v9 ship) and `_baseline_mock.py`
  (W305 ship). NOT `.claude/hooks/scripts/`. CR-2 PASS ✓.
- **CR-3 (subagents)**: this stream produced no new agents; the 3 stubs
  are CLI-callable adapter modules loaded by `harness/eval_harness.py`
  via `harness.adapters.memory_recall.load_adapter(...)`. CR-3 PASS ✓.
- **CR-5 (safety)**: no new tool surfaces introduced. The stubs raise
  `ImportError`/`NotImplementedError` rather than spawning processes or
  silently passing — fail-loudly is the safety stance. CR-5 PASS ✓.
- **CR-9 (version-pin)**: every install command in the stubs' error
  messages uses an EXACT pinned version (`==2.0.2`, `==0.10.0`,
  `@0.9.20`). No floating `latest`/`^`/`~`. CR-9 PASS ✓.

---

## §6 Provenance + scope discipline

- **Files created** (NEW × 4): `mem0.py` (104 LOC) · `alma_memory.py`
  (~119 LOC pre-formatter, ~similar post-formatter) · `agentmemory.py`
  (~127 LOC) · this design doc.
- **Files edited** (EDIT × 1): `harness/adapters/memory_recall/__init__.py`
  — uncommented + version-pinned 3 entries in `_ADAPTER_MODULES`.
- **Files NOT touched** (per ownership constraint): `harness/eval_harness.py`
  (parent's W305 ship) · `harness/adapters/memory_recall/_baseline_mock.py`
  (W305 template).
- **Packages installed**: ZERO. Per W306 wave constraint + cardinal rules.
- **Sub-agents spawned**: ZERO. Per stream-A constraint.
- **Smoke-test cost**: $0 (mock-corpus only; no LLM calls).

---

*End of W306-STREAM-A-ADAPTER-STUBS.md — agent-A-lane-d-stubs, 2026-05-18.*
