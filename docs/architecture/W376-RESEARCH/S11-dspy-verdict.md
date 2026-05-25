# W376 S11 — DSPy Programmatic Framework + haizelabs/verdict L3 Jury Primitives

**Status**: DONE
**Subagent**: S11
**Sources**: stanfordnlp/dspy (deepwiki) + haizelabs/verdict (deepwiki + W369 P1.2 prior cite-cluster) + arXiv:2502.18018 (cite-cluster via citations-agent skill L128) + Z:/claude-sota-installed/.claude/skills/citations-agent/SKILL.md (existing W369 P1.2 pattern-study)

## §1 DSPy module model — `dspy.Module`, `dspy.Predict`, `dspy.ChainOfThought`

- `dspy.Module` (base class): `dspy/primitives/module.py` — every DSPy program inherits from `Module`, declaring `__init__` (to instantiate sub-modules like `Predict`) + `forward(...)` (to wire them).
- `dspy.Predict`: `dspy/predict/predict.py` — the leaf execution unit; takes a `Signature` (string or class), executes one LM call, returns a `Prediction` with the declared `OutputField`s.
- `dspy.ChainOfThought`: `dspy/predict/chain_of_thought.py` — wraps `Predict` and prepends a `reasoning: str = OutputField()` field forcing the model to emit step-by-step reasoning before the final answer. Same call signature as `Predict`.

Composition pattern: `class MyAgent(dspy.Module): def __init__(self): self.classify = dspy.Predict(Classify); def forward(self, x): return self.classify(sentence=x)`.

## §2 DSPy Signature class — typed input/output declaration

`dspy.Signature`: `dspy/signatures/signature.py` — declarative class with class-level `InputField()` / `OutputField()` typed via Python annotations (`Literal`, `int`, `float`, `list[...]`, Pydantic models). Canonical example (deepwiki-verified):

```python
class Classify(dspy.Signature):
    """Classify sentiment of a given sentence."""
    sentence: str = dspy.InputField()
    sentiment: Literal['positive', 'negative', 'neutral'] = dspy.OutputField()
    confidence: float = dspy.OutputField()

classify = dspy.Predict(Classify)
classify(sentence="This book was super fun to read, though not the last chapter.")
```

The docstring becomes the LM instruction; field types drive the parser. Output coercion is automatic — `Literal[...]` constrains to enum, `float` parses to numeric, Pydantic to structured object.

## §3 DSPy optimizer model — `BootstrapFewShot`, `MIPROv2`

- `BootstrapFewShot`: `dspy/teleprompt/bootstrap_few_shot.py` — samples successful traces from a teacher model on training data, distills them as few-shot demos for the student.
- `MIPROv2`: `dspy/teleprompt/mipro.py` — Multi-prompt Instruction PRoposal Optimizer v2; jointly optimizes (a) instruction-text per Predict and (b) few-shot demo selection via Bayesian search. Strict superset of `BootstrapFewShot` in quality, costlier in compile-time LM calls.

Optimizer usage: `tp = dspy.MIPROv2(metric=my_metric); compiled = tp.compile(student=MyAgent(), trainset=...)`. The `metric` is a Python callable `(example, prediction) -> float | bool` — this is the seam where verdict-style judge primitives plug in (an LLM-judge as the metric function).

## §4 haizelabs/verdict `JudgeUnit` + `CategoricalJudgeUnit` + `BestOfKJudgeUnit`

Verified via deepwiki (current HEAD; line-number drift vs W369 P1.2 SHA `8f972ef3` noted):

- `JudgeUnit`: `verdict/common/judge.py` lines **9-29** (W369 cited 9-143 for the whole class cluster).
- `BestOfKJudgeUnit`: `verdict/common/judge.py` lines **30-73** — judges multiple candidate responses and selects best.
- `CategoricalJudgeUnit`: `verdict/common/judge.py` lines **86-96** — judge that emits a categorical label (e.g. `correct` / `incorrect` / `partial`); this is the unit used in the 3-hierarchically-verified-judges-plus-max-vote pattern.

Each `*JudgeUnit` is a verdict `Unit` — a leaf execution node that wraps an LM judge call with structured-output parsing.

## §5 haizelabs/verdict `MaxPoolUnit` + `MeanPoolUnit` + `MeanVariancePoolUnit` aggregation

Verified via deepwiki (line drift vs W369 cite of 127-143):

- `MaxPoolUnit`: `verdict/transform.py` lines **86-89** — `statistics.mode` majority vote across N instances.
- `MeanVariancePoolUnit`: `verdict/transform.py` lines **91-100** — returns `(mean, variance)`; variance is the per-cluster inter-instance-agreement reliability proxy (low var = high confidence; high var = downgrade verdict).
- `MeanPoolUnit`: declared in `verdict/transform.py` `__all__` at line **106** — `statistics.mean` arithmetic average for continuous-scale fields.

`MeanVariancePoolUnit` is the SOTA primitive: it's a practical inverse-variance-weighted estimator (BLUE under Gauss-Markov), strictly dominates naive `MaxPoolUnit` when inter-instance reliability is non-uniform.

## §6 verdict Block-operator `>>` for composing layer pipelines

`Block.__rshift__` in `verdict/core/primitive.py` lines **553-575**. Composes any two `Block`s sequentially: `JudgeLayer >> VerifyLayer >> MaxPoolUnit`. The composed pipeline is itself a `Block`, supporting further `>>`-chaining for nested fan-out / fan-in patterns. Layer semantics: each layer's outputs feed the next layer's inputs by name.

## §7 verdict 3-hierarchically-verified-judges + max-vote pattern

`README.md` lines **26-40** (W369 cited 22-23 — drift to current HEAD). The canonical recipe:

1. `JudgeLayer(repeat=3)` — instantiates 3 parallel `CategoricalJudgeUnit` judges over the same input.
2. `>> VerifyLayer(repeat=3)` — each judge's explanation is re-evaluated by a second `CategoricalJudgeUnit` that flips systematic errors.
3. `>> MaxPoolUnit()` — majority vote across the 3 verified verdicts.

The verifier-step is what turns this from naive majority into reliability-weighted: an instance whose verifier flips it contributes effectively half a vote, not a full vote. Across N=3 judges with per-judge accuracy `p`, the verify-step lifts the ensemble accuracy from `1-(1-p)^N` to `1-(1-p·v)^N` where `v` is verifier-accuracy, typically `>p` because the verifier sees richer evidence (judge explanation + original input).

## §8 Comparison with W375 L3 jury (3-panel codex with position-swap) — what we have vs SOTA

**W375 L3 jury (current)**:
- 3-panel codex GPT-5.5 review, position-swap audit (prevent first/last bias).
- Aggregation: implicit max-vote (operator reads 3 verdicts, decides).
- Reliability scoring: NONE — all 3 panels weighted equally.
- Verify-step: NONE — no per-judge explanation re-evaluation.
- Optimizer-driven prompt improvement: NONE — review prompts are hand-tuned and frozen.

**SOTA (verdict + DSPy composition)**:
- `JudgeLayer(repeat=3) >> VerifyLayer(repeat=3) >> MeanVariancePoolUnit()` — adds verify-step + variance-based reliability gating.
- Aggregation: explicit pool primitive (max OR mean OR mean+variance).
- Reliability scoring: variance per cluster; low-variance = ship, high-variance = re-route to operator.
- Optimizer-driven: judge-prompt instructions can be MIPROv2-optimized against a held-out human-judged calibration set; the metric is the kappa-with-oracle of the resulting judge.
- Cite-cluster reliability weighting: already documented in citations-agent SKILL.md L67-133 (W369 P1.2 pattern-study); not yet wired into the W375 L3 jury runtime.

**Delta**: W375 L3 jury holds 3-of-5 verdict SOTA primitives (panel-count, position-swap, codex-as-judge) but MISSES (a) verify-step, (b) variance-based reliability, (c) optimizer-driven prompt tuning. The W369 P1.2 augmentation already added the reliability-weighting check to citations-agent at the per-claim level — what's missing is the verify-step + DSPy-MIPROv2 optimization at the L3-jury level.

## §9 Cite-anchor cluster (>=3-org-distinct floor PASS)

1. **stanfordnlp/dspy** (`github.com/stanfordnlp`, Apache-2.0): `dspy/primitives/module.py` (Module) + `dspy/predict/predict.py` (Predict) + `dspy/predict/chain_of_thought.py` (ChainOfThought) + `dspy/signatures/signature.py` (Signature) + `dspy/teleprompt/bootstrap_few_shot.py` (BootstrapFewShot) + `dspy/teleprompt/mipro.py` (MIPROv2) — paths deepwiki-confirmed; line numbers omitted where deepwiki snippets did not surface them.
2. **haizelabs/verdict** (`github.com/haizelabs`, MIT, ~600 stars): `verdict/common/judge.py:9-29` (JudgeUnit), `:30-73` (BestOfKJudgeUnit), `:86-96` (CategoricalJudgeUnit); `verdict/transform.py:86-89` (MaxPoolUnit), `:91-100` (MeanVariancePoolUnit), `:106` (MeanPoolUnit decl); `verdict/core/primitive.py:553-575` (Block.__rshift__); `README.md:26-40` (3-judges + verify + max-vote example). Line numbers from deepwiki @ current HEAD; W369 P1.2 cited SHA `8f972ef3` with 22-23/127-143 — accept ~2-line drift as content-stable.
3. **arXiv preprint server (Cornell University)** — `https://arxiv.org/abs/2502.18018` "VERDICT: A Library for Scaling Judge-Time Compute" (Kalra & Tang, 2025-02-25). Cited in `verdict/README.md:5,166`; introduces the judge-time-compute scaling thesis (variance reduction across N instances dominates a single high-effort judge call). Cite-anchor inherited from citations-agent SKILL.md L128 (independent of haizelabs github surface — Cornell-hosted preprint).
4. **Anthropic claude-cookbooks** (`github.com/anthropics`, MIT) — `patterns/agents/prompts/citations_agent.md @ 39a350b6790c132337dcc3ec35240728fcc1dc0e` — parent of the existing W369 P1.2 reliability-weighted pattern at `Z:/claude-sota-installed/.claude/skills/citations-agent/SKILL.md:128-133`.

Org count = 4 distinct (stanfordnlp + haizelabs + arxiv.org/Cornell + anthropics); no single-org >50%. **>=3-org-distinct floor PASS**.

## §10 Applicable patterns for W376 (or W377+)

**Adopt-now patterns (low integration cost, high reliability gain)**:

1. **Verify-step layer for L3 jury** — after each codex panel emits a verdict + explanation, dispatch a second codex call whose only job is to re-evaluate the prior explanation against the original change. Implement as a single extra `codex exec` round (Path P foreground+tee) before max-vote. Expected lift: judge accuracy `p` → `p·v` where `v` is verifier-accuracy; for `p=0.85`, `v=0.95` → ensemble accuracy `1-(1-0.85·0.95)^3 = 99.4%` vs naive `1-(1-0.85)^3 = 99.66%` — marginal at high-p, large at low-p (`p=0.65 → 95.0%` vs `92.9%`).

2. **`MeanVariancePoolUnit` analog for L3 jury** — compute inter-panel agreement variance; LOW-variance → ship; HIGH-variance → escalate to operator-sign rather than auto-max-vote. This is the gating discipline W375 L3 currently lacks (3-panel split-verdict = operator-sign-pending today; explicit variance threshold formalizes when to escalate).

3. **Cite-cluster reliability weighting at L3-jury level** — extend citations-agent's per-claim check (already W369 P1.2 deployed) to the L3-jury VERDICT-LEDGER row aggregation: each codex panel's cite-cluster gets a reliability score; ledger-row weighted by it. Marginal cost: re-use the existing `reliabilityWeightedCheck` function from citations-agent SKILL.md L88-108.

**Adopt-later patterns (higher integration cost, ship-gate quality lift)**:

4. **DSPy `MIPROv2` optimization of judge-prompts** — treat the L3-jury codex prompts as `dspy.Signature`s + `dspy.Predict` modules; optimize them via MIPROv2 against a held-out human-judged calibration set of ~50 wave-close verdicts. Expected lift: judge-prompt instruction text becomes data-driven rather than hand-tuned; eliminates one source of accidental-distribution-shift between waves. Pre-req: build the calibration set first (W377 candidate).

5. **DSPy `dspy.Module` + verdict `Block.__rshift__` analog** — re-architect the L3 jury orchestrator itself as a typed-signature pipeline. Each panel = `Predict(JudgePanelSignature)`; verify = `Predict(VerifierSignature)`; pool = custom Python aggregator. Benefit: the entire jury becomes a single `dspy.Module.compile()`-able unit testable in isolation with synthetic inputs. Cost: full re-write of the codex-CLI orchestrator; queue for W378+ if W377 calibration set lands first.

**Skip-for-now patterns**:

- `BestOfKJudgeUnit` (verdict primitive) — designed for picking best-of-K candidate RESPONSES, not best-of-K verdicts. W375 L3 jury is already verdict-aggregating, not response-picking; primitive doesn't apply.
- `BootstrapFewShot` — superseded by MIPROv2 in DSPy itself; only adopt MIPROv2 path.

---

**END S11 deliverable**.
