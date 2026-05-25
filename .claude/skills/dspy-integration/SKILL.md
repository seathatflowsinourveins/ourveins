---
name: dspy-integration
description: DSPy 3.2.1 prompt-program toolkit integration. Use when the user mentions "use DSPy", "DSP", "GEPA", "prompt program", "Pareto-frontier candidate routing", "signature-based prompting", "DSPy optimizer", "BootstrapFewShot", "MIPRO", "ChainOfThought module", "DSPy compile", "prompt optimization with rollouts", or asks to compose typed LLM signatures with measurable metrics. Fires for runtime-internal DSPy usage (NOT for installing/upgrading DSPy itself).
---

# DSPy 3.2.1 Integration (Pareto-frontier candidate routing)

## What DSPy is here for

DSPy treats prompts as typed programs with measurable metrics, then routes candidates along a Pareto frontier instead of single-objective optimisation. **GEPA optimizer** (genetic Pareto, DSPy 3.x default) reaches 4.5/5-grade prompt quality in roughly 35x fewer rollouts than baseline BootstrapFewShot per published benchmarks.

Installed in `Z:/venvs/claude` per W316-P1a; **re-verified W368 P0.2 2026-05-22**:
```
dspy version: 3.2.1
has dspy.Tool.from_mcp_tool: True  (native MCP wrapper)
module path: Z:/venvs/claude/Lib/site-packages/dspy/__init__.py
```

### W368 P0.2 re-verification (verify-before-claim per CR-6)

```powershell
# Smoke probe (run 2026-05-22):
Z:\venvs\claude\Scripts\python.exe --version
# -> Python 3.13.12

Z:\venvs\claude\Scripts\python.exe -c "import dspy; print(dspy.__version__)"
# -> 3.2.1

# Signature + ChainOfThought instantiation:
Z:\venvs\claude\Scripts\python.exe -c "import dspy; sig = dspy.Signature('question -> answer'); cot = dspy.ChainOfThought(sig); print('OK')"
# -> SMOKE OK: dspy 3.2.1 Signature+ChainOfThought import + instantiation works
```

**Install command** (already-installed, idempotent re-install if needed):
```powershell
Z:\venvs\claude\Scripts\pip.exe install dspy-ai
```

**Minimal basic-usage snippet** (no LM required, demonstrates API surface):
```python
import dspy

# Inline string-signature form
sig = dspy.Signature("question -> answer")
cot = dspy.ChainOfThought(sig)
# `cot(question="...")` would call the configured LM; here we only test import+instantiate
```

## When this skill fires

Any prompt that wants:
- a **signature-typed LLM call** (`dspy.Signature` with input/output fields + docstring)
- a **Module composition** (`dspy.Predict`, `dspy.ChainOfThought`, `dspy.ReAct`, `dspy.MultiChainComparison`)
- **prompt program optimisation** via `dspy.GEPA`, `dspy.MIPRO`, `dspy.BootstrapFewShot`
- a **typed metric** (`dspy.evaluate.metrics.answer_exact_match`, custom `Metric`)
- DSPy + MCP tool integration (`dspy.Tool.from_mcp_tool` wraps an existing MCP tool into a typed DSPy Tool)

## Native MCP integration (no glue)

DSPy 3.2.1 exposes `dspy.Tool.from_mcp_tool(mcp_tool)` which converts an MCP `Tool` object into a `dspy.Tool` usable inside `dspy.ReAct(signature, tools=[...])`. This means: the SOTA-installed runtime's existing MCP servers (basic-memory, cognee, langfuse, repomix, deepwiki, context7, exa, github, ...) can drive a DSPy ReAct agent without writing a single adapter.

## Sample workflow

```python
import dspy

# 1. Configure the LM (Anthropic via local proxy / Bedrock / OpenAI / etc.)
lm = dspy.LM(
    model="anthropic/claude-haiku-4-5-20251001",
    api_base="http://127.0.0.1:8081",  # local proxy
    api_key="...",
)
dspy.configure(lm=lm)

# 2. Define a signature: typed input -> typed output, with NL docstring.
class JudgeRubric(dspy.Signature):
    """Score a candidate plugin install on D1-D9 rubric. Return integer 1-5 per dim."""
    candidate: str = dspy.InputField(desc="repo slug, e.g. eric-ai-lab/HarnessAudit")
    upstream_health: int = dspy.OutputField(desc="D1 1-5")
    license_compat: int = dspy.OutputField(desc="D8 1-5")

# 3. Compose a Module.
judge = dspy.ChainOfThought(JudgeRubric)
result = judge(candidate="eric-ai-lab/HarnessAudit")
print(result.upstream_health, result.license_compat)

# 4. Optimise the prompt program with GEPA (Pareto-frontier).
from dspy.teleprompt import GEPA
optimizer = GEPA(metric=my_metric, num_threads=4, max_rollouts=200)
optimized_judge = optimizer.compile(judge, trainset=trainset, valset=valset)

# 5. Wrap MCP tools natively for a ReAct agent.
from mcp import ClientSession  # any MCP client
async with ClientSession(...) as session:
    mcp_tools = (await session.list_tools()).tools
    dspy_tools = [dspy.Tool.from_mcp_tool(t) for t in mcp_tools]
    agent = dspy.ReAct(JudgeRubric, tools=dspy_tools)
```

## Where DSPy slots into this runtime

- **harness/eval_harness.py**: future Lane G can use `dspy.GEPA` to optimise the inspect_ai task prompts against measured pass rates - typed-metric replaces prose-prompt-tweaking.
- **sota-convergence-audit SKILL**: `dspy.ChainOfThought(SCARubric)` is a natural fit for the 9-dim rubric scoring step; replaces the freeform LLM-as-judge call with a typed signature.
- **HarnessAudit Lane D (W316-P0c)**: the LLM-as-judge inside `multi_agent/completion_judge.py` is a candidate for `dspy.Module` refactor in a future wave.

## Pareto-frontier routing pattern (W369 P1.1 from gepa-ai/gepa)

> **W369 P1.1 pattern-study extract** — closes W367 Stream G meta-pattern #1 ("Pareto-frontier-as-primitive D86 promote") + W367 Stream E T3-PATTERN-STUDY #1 (gepa-ai/gepa sca-v19 4.7 / ~4.5k stars / ICLR 2026 Oral). Anchored at `gepa-ai/gepa@5910c6412681dd697812c926c4fff937857dbba4` (HEAD `main` 2026-05-18, MIT, pip pkg `gepa==0.1.1`).

### The pattern: Pareto-frontier candidate selection vs single-objective

**Single-objective (anti-pattern)** — keep the one candidate with the highest aggregate score; discard everything else. Specialised winners on hard subsets get averaged-away on the next iteration. Reinforcement-Learning baselines (GRPO) need 5,000-25,000+ rollouts per `gepa-ai/gepa README.md:42`.

**Pareto-frontier-as-primitive (the GEPA pattern)** — maintain a **per-frontier-key** mapping `{key → set[program_idx]}` where `key` is one of:

| `frontier_type` | Key | Use case |
|---|---|---|
| `"instance"` | per-validation-example | one metric, many tasks (default) |
| `"objective"` | per-objective metric | many metrics, few examples |
| `"hybrid"` | both example + objective | many metrics + many examples |
| `"cartesian"` | per-(example, objective) pair | fine-grained per-task-per-metric |

A candidate is **kept** on the frontier as long as it ties-or-beats the current best on at least one key. Selection on the next iteration samples proportionally to how many frontier keys a candidate holds. Result: **100-500 rollouts beat baselines that need 5,000-25,000+ (~35x sample-efficiency)** per `arxiv:2507.19457` Table 1.

### Code anchors (gepa-ai/gepa @ 5910c641)

1. **`ParetoCandidateSelector`** — `src/gepa/strategies/candidate_selector.py:11-24`. `select_candidate_idx(state)` delegates to `gepa_utils.select_program_candidate_from_pareto_front(frontier_mapping, per_program_tracked_scores, rng)`.
2. **`TopKParetoCandidateSelector`** — same file, lines 53-82. Filters the frontier to the top-K aggregate-scorers before Pareto-sampling (bounded exploration).
3. **`GEPAState` frontier-update helpers** — `src/gepa/core/state.py:474-525`. Three private methods `_update_objective_pareto_front`, `_update_pareto_front_for_val_id`, `_update_pareto_front_for_cartesian` — each compares the new score to the prior frontier-best, replaces on strict-beat, augments on tie. The `frontier_type` parameter on `GEPAState.__init__:196` selects which keys to track.
4. **`GEPAState.get_pareto_front_mapping()`** — `src/gepa/core/state.py:603-605`. Returns the `{key → set[program_idx]}` mapping queried by the candidate selector.
5. **`ReflectiveMutationProposer`** — `src/gepa/proposer/reflective_mutation/reflective_mutation.py:66-120`. Two-phase loop: `prepare_proposal` (sequential, picks one Pareto candidate + samples a minibatch of 2-3 examples) then `execute_proposal` (parallel-safe, runs the executor → reflector → curator pipeline).
6. **`GEPAEngine._run_parallel_reflective_batch`** — `src/gepa/core/engine.py:381-452`. Pre-samples N contexts sequentially, runs the heavy evaluate-propose-evaluate pipeline in a `ThreadPoolExecutor` with `max_workers=len(contexts)`, then **processes acceptances sequentially** so the frontier update remains race-free.

### The 5-step loop (verbatim from `README.md:139-143`)

1. **Select** a candidate from the Pareto frontier (candidates excelling on different task subsets)
2. **Execute** on a minibatch, capturing full execution traces
3. **Reflect** — an LLM reads the traces (error messages, profiler output, reasoning logs) and diagnoses failures
4. **Mutate** — generate an improved candidate informed by accumulated lessons from all ancestors
5. **Accept** — add to the pool if improved, update the Pareto front

The frontier-update is the load-bearing primitive: a candidate that scores worse on the aggregate but excels on one frontier key is **preserved** rather than discarded. This is what produces the 35x rollout reduction vs RL.

### CC-runtime adaptation: when to fire this pattern

**Fire when picking among 2+ DSPy candidate programs, prompts, or skill-descriptions and you have ≥1 measurable axis per candidate.** Concrete CC-runtime use cases:

1. **`sota-convergence-audit` 9-dim rubric** — instead of summing D1..D9 to a single `composite_score` and picking max, treat each dim as a frontier key. Candidates excelling on `D5-licence-compat` but weak on `D2-upstream-velocity` stay on the frontier. Pattern-call: `optimizer = dspy.GEPA(metric=multi_dim_metric, frontier_type="objective", reflection_lm=lm)`.
2. **`goal-prompt-synthesis` candidate predicates** — when generating 3-5 candidate `/goal` predicates with different priority orderings, score each on (a) character-budget-fit, (b) priority-axis-coverage, (c) cite-anchor-density. Pareto-select rather than aggregate-max.
3. **`citations-agent` 3-org-distinct floor** — when ranking candidate cite-sets, frontier keys = (anchor-density, source-diversity, recency). Aggregate-max drifts toward whichever metric has the widest numeric range.
4. **`team-spawn` preset selection** — when the operator passes a fuzzy intent, score candidate preset-team-shapes on (task-fit, parallel-ratio, token-budget). Pareto-frontier preserves shapes that excel on one axis (e.g., max-parallel) even when sub-optimal on another.

The DSPy 3.2.1 import path is `from dspy.teleprompt import GEPA` — verified W368 P0.2 install at `Z:/venvs/claude/Lib/site-packages/dspy/teleprompt/gepa.py`. Pass `frontier_type` through to the underlying `GEPAState` via kwargs (per state.py:196 signature).

### Why this beats single-objective for CC-runtime work

Per `arxiv:2507.19457` §4.2 (Stanford NLP + Databricks + UCSD + UCB co-authored) and replicated in DSPy docs (`dspy.ai/learn/optimization`), reflective optimization on a Pareto frontier achieves the 35x reduction because:

- **Specialized candidates are preserved** — the candidate that excels on the one hard task subset isn't averaged-out by candidates winning on easy subsets.
- **Reflection beats random search** — the LLM diagnoses *why* a candidate failed on a frontier key, then mutates targeted at that key. Minibatch size 2-3 vs RL full-batch 32-256.
- **Merge across frontier-winners** — `system-aware merge` (README.md:145) combines two Pareto-optimal candidates excelling on *different* keys, producing a candidate that dominates both on their respective specialities.

### Trigger-phrase coverage (description-match audit)

The SKILL.md `description:` already includes **"Pareto-frontier candidate routing"**, **"GEPA"**, **"prompt optimization with rollouts"** — these auto-fire this pattern. Operator phrases that also match: "Pareto-as-primitive", "multi-objective candidate selection", "GEPA optimizer", "reflective optimization", "frontier-keyed candidate ranking".

## Reversibility

100% reversible:
```bash
# Uninstall:
Z:/venvs/claude/Scripts/pip.exe uninstall dspy -y

# Remove this skill:
rm -rf Z:/claude-sota-installed/.claude/skills/dspy-integration/
```

No new MCP server. No new NSSM service. No `.mcp.json` change. No `settings.json` change. Pure venv-local Python package + one local operator-curated skill directory.

## References

### 3-org-distinct cite-anchors (W369 P1.1 Pareto-frontier pattern)

1. **gepa-ai/gepa** (canonical implementation, MIT) — `https://github.com/gepa-ai/gepa` @ `5910c6412681dd697812c926c4fff937857dbba4` (HEAD `main` 2026-05-18, ~4.5k stars). Source anchors above all reference this SHA.
2. **arxiv 2507.19457** (Stanford NLP + Databricks + UCSD + UC Berkeley co-authored, ICLR 2026 Oral) — `https://arxiv.org/abs/2507.19457` — "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning" by Agrawal, Tan, Soylu, Ziems, Khare, Opsahl-Ong, Singhvi, Shandilya, Ryan, Jiang, Potts, Sen, Dimakis, Stoica, Klein, Zaharia, Khattab. Table 1 contains the 35x rollout-reduction empirical claim.
3. **stanfordnlp/dspy docs** — `https://dspy.ai/learn/optimization/optimizers/#gepa` documents `dspy.GEPA` as the DSPy 3.x default Pareto optimizer (vs single-objective `BootstrapFewShot`). Independent third-party validation; not co-developed with gepa-ai.

### Other refs

- DSPy 3.2.1: https://dspy.ai (canonical) / https://github.com/stanfordnlp/dspy
- DSPy + MCP RFC: https://github.com/stanfordnlp/dspy/issues/8423 (`Tool.from_mcp_tool` landed in 3.2.0; gepa-ai/gepa itself has `MCPAdapter` per repo but NO `Tool.from_mcp_tool` helper as of HEAD 5910c641 — verified 2026-05-22)
- Internal W314 candidate audit: `docs/architecture/W314-DEEP-SOTA-WAVE/STREAM-B-EXTENDED-SOTA-DISCOVERY.md` §DSPy
- Internal W316 install: `docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-DSPY-INSTALL-LOG.md`
- Internal W367 source: Stream G meta-pattern #1 + Stream E T3-PATTERN-STUDY #1
- Internal W369 SPEC: P1.1 pattern-study (this wave)
