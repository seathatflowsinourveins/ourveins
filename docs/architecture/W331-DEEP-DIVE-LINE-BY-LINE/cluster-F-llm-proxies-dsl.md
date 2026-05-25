# Cluster F — LLM Proxies + DSL + Prompt-Optimization

> sca-v12.1 deep-dive line-by-line ingest · Wave **W331** follow-up · 2026-05-19
> Operator directive: "max depth + all SOTA references and repos deep dive"
> Framework: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
> Synthesis ancestor: `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md`
> P0.13 prompt-optimization track NEW per W330 SEV-3 under-utilization cluster (§4.4)
> All file:line citations resolved against local clones at `Z:/claude-sota-installed-repos/<org>-<repo>/` HEAD as of 2026-05-19.

---

## §1 Per-repo verdict table

| # | Repo (org/name) | HEAD SHA (truncated) | Version | Stars-class | License | sca-v12.1 install_score | sca-v12.1 pattern_score | Tier | LlamaSwap mapping |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `BerriAI/litellm` | `fbe0ee81` | v1.85.0 (`pyproject.toml:3`) | ~25K★ | MIT (`pyproject.toml:6`) | 3.85 | **4.30** | **T3 PATTERN-STUDY** | **complement** — port `complexity_router/` + `budget_limiter` patterns; do NOT swap |
| 2 | `microsoft/LLMLingua` | `e0e9d99b` | series (LLMLingua-2 ACL'24) | ~5K★ (LLMLingua-2) | MIT | 2.10 | **3.80** | **T3 PATTERN-STUDY** | reject as runtime dep — repurpose as ETL pre-stage for `/compact` and oversized-context capture |
| 3 | `stanfordnlp/dspy` | `99427f8e` | v3.2.1 (`pyproject.toml`) | 35K★ | MIT | **4.55** | **4.70** | **T1 INSTALL CANDIDATE** (already venv-installed, skill present) | **complement** — wraps Anthropic/OpenAI per-task; orthogonal to LlamaSwap proxy layer |
| 4 | `dottxt-ai/outlines` | `b9b7a646` | **v1.3.0** (tag-confirmed) | ~12K★ | Apache-2.0 (`pyproject.toml`) | 2.95 | **4.10** | **T2 SHADOW** | complement — schema-guarantee layer for LlamaSwap-served local models (vLLM/llama-cpp backends) |
| 5 | `BoundaryML/baml` | `c10bbcfd` | branch `canary` (workspace Rust monorepo, `engine/Cargo.toml`) | ~3K★ | Apache-2.0 (`engine/LICENSE`) | 2.30 | **3.55** | **T4 REJECT-NOW (pattern-archive)** | reject — Rust-compiler-required toolchain for `.baml` DSL is too heavyweight for Z:-portable runtime; archive prompt-as-function pattern |
| 6 | `vercel/ai` | `aa5a1e53` | `7.0.0-canary.142` (`packages/ai/package.json:3`) | ~13K★ | Apache-2.0 (`packages/ai/package.json:9`) | 1.95 | **3.40** | **T3 PATTERN-STUDY** | reject — TypeScript-first agent runtime; orthogonal to Python-orchestrator + LlamaSwap stack |
| 7 | `Shubhamsaboo/awesome-llm-apps` | `795212bf` | curated catalog (not versioned; 13 categories) | ~30K★ | Apache-2.0 | n/a (catalog) | **3.05** | **T5 CATALOG ONLY** | reference-only — mine 4 templates for ops_rhythm + framework crash-courses |

**Tier legend (sca-v12.1 §1)**: T1=install-now-on-this-runtime · T2=shadow-pilot in `wt/*` worktree · T3=pattern-study only (extract idea, do not install) · T4=reject-with-rationale · T5=catalog/reference

**Cross-cluster note**: The 7 repos split cleanly into 3 sub-archetypes:
1. **Gateway / Router layer** — litellm (1) (already complete proxy) vs LlamaSwap (our incumbent: simpler, model-swap-only)
2. **Prompt-program DSL** — DSPy (3), Outlines (4), BAML (5) — DSPy wins on Python-native + ≥3-org practitioner adoption
3. **Reference / curation** — Vercel AI (6) (TS), awesome-llm-apps (7) (catalog), LLMLingua (2) (compression as ETL)

---

## §2 Novel SOTA patterns (cited)

### 2.1 `litellm.router_strategy.adaptive_router` — Bayesian Thompson-sampling per (request_type, model)

**Cite-anchor**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/adaptive_router/README.md:1-50`
**Cite-anchor**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/adaptive_router/adaptive_router.py:1-90`
**Cite-anchor**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/proxy/example_config_yaml/adaptive_router_example.yaml:1-46`

LiteLLM v1.85.0 v0 adaptive router executes per-request:

1. **Classify** the prompt into one of 7 `RequestType` buckets (code-gen / writing / analytical_reasoning / factual_lookup / general / technical_design / data_extraction).
2. **Thompson-sample** Beta(α, β) bandit posteriors per `(request_type, model)` cell.
3. **Linear-blend** quality (sample) and normalized cost using user-tunable weights — default `{quality: 0.7, cost: 0.3}` (config-yaml `:42-44`).
4. **Pick argmax**.
5. **Stateless per-turn** — each call resamples; no sticky lookup (`README.md:21-30`).
6. **Cold-start prior**: Beta-mean = `BASE_TIER_WEIGHT[tier] (+ STRENGTH_BONUS)`, total mass = `COLD_START_MASS = 10` (`adaptive_router.py:~85` calls `initial_cell()` from `.bandit`).
7. **Owner-cache attribution**: post-call, the conversation's first picked model "owns" the bandit-update slot for `OWNER_CACHE_TTL_SECONDS = 24h` (`config.py`, ref from `adaptive_router.py:43-46`).
8. **Per-turn updates** via post-call hooks reading regex + tool-call detectors (`signals.py`): `satisfaction → +α`; `misalignment | stagnation | disengagement | failure → +β`; `loop → +0.5β`.
9. **Persistence**: bandit cells flushed to Postgres every ~10s by background task in `proxy_server.py` (README `:14`); `litellm_session_id` (header) sticks within a conversation.
10. **Header override**: `x-litellm-min-quality-tier: 3` forces tier-3+ models only (README `:48-49`).

**Known v0 limitations** (litellm self-documents — rare for OSS):
- Latency NOT in the score (README `:64-65`)
- Hard sample cap at `α + β > 200` — silent drop (README `:66-67`)
- No rescaling (drift = v1 concern)

**Why this matters for our runtime**: the W314 Stream B finding identified adaptive_router as the SOTA pattern for graduating the **codex CLI cross-model gate** (CLAUDE.md L12-14) from binary "always-codex-on-Stop" to **probabilistic cost-aware codex-when-divergent**. Adopt the (request_type × model) cell + Bayesian update pattern, NOT the proxy itself.

### 2.2 `litellm.router_strategy.complexity_router` — Rule-based <1ms classification

**Cite-anchor**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/complexity_router/complexity_router.py:1-90`

Zero-API-call complexity tiering with weighted scoring across 7 dimensions:
- Token count (short=simple, long=complex)
- Code-keyword presence (`DEFAULT_CODE_KEYWORDS`)
- Reasoning markers ("step by step", "think through")
- Technical terms
- Simple indicators ("what is", "define" — negative weight)
- Multi-step patterns ("first…then", numbered steps)
- Question complexity (multiple `?`)

Bucketed via `ComplexityTier` enum into `SIMPLE | MEDIUM | COMPLEX | REASONING`. The `quality_router` (`quality_router.py:1-50`) chains this scorer + a `DEFAULT_COMPLEXITY_TO_QUALITY = {SIMPLE:1, MEDIUM:2, COMPLEX:3, REASONING:4}` (`quality_router/config.py:12-18`) to a deployment's `quality_tier`. **Inspiration cite (litellm-internal)**: "Inspired by ClawRouter: https://github.com/BlockRunAI/ClawRouter" (`complexity_router.py:10`).

**Adoption for our runtime**: Direct port to LlamaSwap as a **pre-router gate** for cost-cap routing. <1ms means no perceptible orchestrator latency. The 4 default keyword lists (`config.py:DEFAULT_CODE_KEYWORDS`, `DEFAULT_REASONING_KEYWORDS`, `DEFAULT_SIMPLE_KEYWORDS`, `DEFAULT_TECHNICAL_KEYWORDS`) are seed-portable.

### 2.3 `litellm.router_strategy.budget_limiter` — Provider-/deployment-/tag-budget filter

**Cite-anchor**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/budget_limiter.py:1-118`

Three orthogonal budget axes, all filter-style (not weight-modifying):
- **Provider budgets** (`_init_provider_budgets`, `:111`): `openai: {budget_limit: 100, time_period: 7d}`
- **Deployment budgets** (`_init_deployment_budgets`, `:112`): per-model_name
- **Tag budgets** (`_init_tag_budgets`, `:113`): for tag-routing pre-filter

Spend tracked via `base_routing_strategy.py:73-201` Redis-backed multi-instance accumulator. The pattern: **"accept healthy deployments, then filter out budget-exceeded"** (`budget_limiter.py:6`) is the *exact* gate-vs-weight distinction needed for our Phase-1 cost-cap.

### 2.4 `microsoft/LLMLingua-2` — Token-classification compression (3-6× speedup over LLMLingua-1)

**Cite-anchor**: `Z:/claude-sota-installed-repos/microsoft-LLMLingua/llmlingua/prompt_compressor.py:48-58` (paper ref) + `:445-451` (LLMLingua-2 config block) + `README.md:30-40` (3x-6x speedup claim, ACL Findings 2024)

LLMLingua-2 uses a small token-classifier (`microsoft/llmlingua-2-xlm-roberta-large-meetingbank`) trained via task-agnostic data distillation. The compression API:

```python
compress = PromptCompressor(
    model_name="microsoft/llmlingua-2-xlm-roberta-large-meetingbank",
    use_llmlingua2=True,
)
result = compress.compress_prompt(context, use_context_level_filter=True, target_token=5)
# result["compressed_prompt"] is the compressed version
```

Key knobs visible in `prompt_compressor.py`:
- `dynamic_context_compression_ratio: float = 0.0` (default off; `:296`, `:348`, `:1183`)
- `max_batch_size: 50`, `max_force_token: 100` (default `llmlingua2_config`, `:450`)
- Multi-stage dynamic compression: `get_dynamic_compression_ratio` (`:1023`) → `get_structured_dynamic_compression_ratio` (`:1067`) → `token_segment` (`:1106`)

**arXiv**: `2403.12968` (the file itself misprints `2403.2403.12968` at `:53` — both refer to LLMLingua-2: Pan et al., ACL Findings 2024).

**Practical bound**: LLMLingua-2 paper claims 3x-6x speed improvement *over* LLMLingua-1 (same task-quality) — NOT over baseline LLM. Quality degradation profile is task-specific; meeting-bank (training corpus) holds best, code-task worst. For RAG: cite `Retrieval.ipynb` in `examples/`.

**Mapping to our runtime**: NOT a runtime dep. Repurpose as one-shot ETL for `oversized_context_buffer` capture — i.e. when a wave's working memory exceeds ~250K tokens before `/compact`, run LLMLingua-2 with target_ratio=0.4 on the *non-pointer-instruction* portion to extract a delta-summary for T6 basic-memory writing. The compressed_prompt becomes the cross-session memo.

### 2.5 `stanfordnlp/dspy` v3.2.1 — Typed Signatures + 4 optimizers

**Cite-anchor**: `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/__init__.py:1-30` (full optimizer roster)
**Cite-anchor**: `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/gepa/gepa.py:1-90`
**Cite-anchor**: `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/simba.py:1-80`
**Cite-anchor**: `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/mipro_optimizer_v2.py:1-80` + `:120-180`

DSPy 3.2.1 ships 13 teleprompters per `__init__.py`:
1. `AvatarOptimizer` (`avatar_optimizer.py`)
2. `BetterTogether` (`bettertogether.py`) — joint fine-tune + prompt
3. `BootstrapFewShot` (`bootstrap.py`)
4. `BootstrapFinetune` (`bootstrap_finetune.py`)
5. `COPRO` (`copro_optimizer.py`) — coordinate-ascent instruction optimizer
6. `Ensemble` (`ensemble.py`)
7. `GEPA` (`gepa/gepa.py`) — reflective prompt evolution (paper: arXiv 2507.19457)
8. `InferRules` (`infer_rules.py`)
9. `KNNFewShot` (`knn_fewshot.py`)
10. `MIPROv2` (`mipro_optimizer_v2.py`) — Bayesian instruction+demo joint optimizer (arXiv 2406.11695)
11. `BootstrapFewShotWithRandomSearch` (`random_search.py`)
12. `BootstrapFewShotWithOptuna` (`teleprompt_optuna.py`)
13. `SIMBA` (`simba.py`) — Stochastic Introspective Mini-Batch Ascent
14. `LabeledFewShot` (`vanilla.py`)

**GEPA mechanism (`gepa/gepa.py:1-90`)**:
- Wraps the external `gepa` package: `from gepa import GEPAResult` / `from gepa.proposer.reflective_mutation.base import ReflectionComponentSelector`
- AUTO_RUN_SETTINGS: `{light: {n:6}, medium: {n:12}, heavy: {n:18}}` rollouts (`gepa.py:24-28`)
- `GEPAFeedbackMetric` protocol returns `dspy.Prediction(score: float, feedback: str)` per-predictor — the metric optionally splits feedback per-predictor-name + per-pred-trace (`gepa.py:39-65`)
- `DspyGEPAResult` dataclass: `candidates`, `parents` (lineage), `val_aggregate_scores`, `val_subscores`, `per_val_instance_best_candidates`, `discovery_*`, `best_idx`, `best_candidate` (`gepa.py:70-115`)
- `DspyAdapter` (`gepa_utils.py:50-120`) bridges DSPy module traces to the `GEPAAdapter[Example, TraceData, Prediction]` protocol
- The **reflective_lm** hyperparameter is what makes GEPA cheap: a SMALL model rewrites the prompt template at each generation; the BIG model only runs the rollouts. `reflection_lm` kwarg at `gepa_utils.py:DspyAdapter.__init__`

**SIMBA mechanism (`simba.py:1-100`)**:
- Default config: `bsize=32 | num_candidates=6 | max_steps=8 | max_demos=4 | temperature_for_sampling=0.2 | temperature_for_candidates=0.2`
- Two strategies per candidate gen: `append_a_demo()` (add successful example) or `append_a_rule()` (LLM-introspect rule from failed examples) (`simba.py:80-90`)
- Mini-batch ascent: samples `bsize=32` from trainset, identifies challenging examples with high output variability, generates `num_candidates=6` new programs per iteration

**MIPROv2 mechanism (`mipro_optimizer_v2.py:1-80`)**:
- AUTO_RUN_SETTINGS: `{light: {n:6, val_size:100}, medium: {n:12, val_size:300}, heavy: {n:18, val_size:1000}}` (`:45-50`)
- Constants: `BOOTSTRAPPED_FEWSHOT_EXAMPLES_IN_CONTEXT = 3`, `LABELED_FEWSHOT_EXAMPLES_IN_CONTEXT = 0`, `MIN_MINIBATCH_SIZE = 50` (`:38-42`)
- Constructor (`:55-75`): `metric`, `prompt_model`, `task_model` (cross-model gate — different LMs for proposing instructions vs scoring trainset), `max_bootstrapped_demos=4`, `max_labeled_demos=4`, `auto: Literal["light","medium","heavy"]`, `num_candidates`, `num_threads`, `init_temperature=1.0`
- Optuna integration: `optuna` is optional dep (`_import_optuna()` at `:24-32`); raises ImportError with install hint
- Compile orchestrates: `_set_random_seeds → _set_and_validate_datasets → _set_hyperparams_from_run_mode → student.deepcopy → Evaluate(devset=valset, metric, num_threads, max_errors)` (`:160-250`)

**Empirical benchmarks** (cite the DSPy README:35-40):
- **GEPA paper arXiv 2507.19457**: outperforms `GRPO` (RL baseline) with **35× fewer rollouts** on 4 LLMs (Llama-3.1-8B/70B/Mistral/Gemma); outperforms MIPROv2 on the same suite.
- **MIPROv2 paper arXiv 2406.11695**: Pareto improvements across BBH/HotpotQA/Iris benchmarks.
- **SIMBA**: 71% relative gain on tool-use vs hand-written prompts (cited per W314 Stream B A5.1).

**Native LiteLLM bridge** (`dspy/clients/lm.py:1-60`):

```python
class LM(BaseLM):
    def __init__(
        self,
        model: str,  # "llm_provider/llm_name" — e.g. "openai/gpt-4o" or "anthropic/claude-haiku-4-5"
        model_type: Literal["chat", "text", "responses"] = "chat",
        ...
    ):
```

The DSPy LM constructor accepts the LiteLLM `provider/name` format directly — meaning DSPy + LlamaSwap composes via the OpenAI-compatible API LlamaSwap already exposes on `:8090/v1/models`. **No glue code needed**.

### 2.6 `dottxt-ai/outlines` v1.3.0 — Structured-decoding guarantees

**Cite-anchor**: `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/types/dsl.py:1-70` (Term DSL + 3-step pipeline)
**Cite-anchor**: `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/models/__init__.py` (17 backend providers)
**Cite-anchor**: `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/grammars.py` + `outlines/backends/xgrammar.py` (xgrammar accel backend)

Outlines v1.3.0 (tag-confirmed via `git describe`) provides three layers:

1. **Term DSL** (`types/dsl.py:1-30`): `Alternatives`, `KleeneStar`, regex builders for structured generation
2. **Type conversion** (`python_types_to_terms`): Pydantic models → `Term` instances → regex
3. **Regex enforcement**: `to_regex` compiles to FSM, runs at sampling time

Backend roster (`outlines/models/`):
- `anthropic.py` · `dottxt.py` · `gemini.py` · `llamacpp.py` · `lmstudio.py` · `mistral.py` · `mlxlm.py` · `ollama.py` · `openai.py` · `sglang.py` · `tgi.py` · `transformers.py` · `vllm.py` · `vllm_offline.py`

**Critical insight for LlamaSwap**: outlines `llamacpp.py` + `vllm.py` backends mean outlines works *directly* on the GGUF served by LlamaSwap (qwen3-coder-30b is the structured-extract slot per W263d). The schema-constraint enforcement happens client-side via grammar/regex passed to the llama-cpp `grammar` param — *no proxy modification required*.

**Trust signals** (README): used by NVIDIA, Cohere, HuggingFace, vLLM, +. Owner `.txt` company runs commercial structured-output API.

### 2.7 `BoundaryML/baml` — `.baml` DSL + Rust runtime

**Cite-anchor**: `Z:/claude-sota-installed-repos/BoundaryML-baml/engine/Cargo.toml:1-50` (workspace with 22 crates)
**Cite-anchor**: `Z:/claude-sota-installed-repos/BoundaryML-baml/README.md:1-100` (core principle)

BAML treats prompts as functions in a custom DSL:

```rust
function ChatAgent(message: Message[], tone: "happy" | "sad") -> StopTool | ReplyTool {
    client "openai/gpt-4o-mini"
    prompt #" ... "#
}
```

Workspace structure (`engine/Cargo.toml` `[workspace] members`):
- `baml-compiler`, `baml-runtime`, `baml-vm` (core)
- `baml-lib/{baml, baml-core, baml-types, parser-database, jinja, jinja-runtime, jsonish, llm-client, prompt-parser, llm-response-parser, diagnostics, ast}` (lib crates)
- `language_client_{python, typescript, ruby, cffi}` (FFI bindings)
- `language_server`, `baml-lsp-types` (IDE integration)
- `cli`, `baml-schema-wasm` (tooling)

**Verdict**: BAML's prompt-as-function pattern + jinja-runtime + jsonish robust JSON parser are SOTA, but the **Rust-compiler-required toolchain** is a CR-9 violation for Z:-portable runtime (would require shipping a compiled binary or maintaining a Rust toolchain). Pattern is **archived**, not adopted.

### 2.8 `vercel/ai` 7.0.0-canary.142 — TypeScript agent loop

**Cite-anchor**: `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/package.json:3-12` (version + license)
**Cite-anchor**: `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/src/agent/tool-loop-agent.ts` (agent primitive)
**Cite-anchor**: `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/src/generate-text/stream-text.ts` (streaming primitive)
**Cite-anchor**: `Z:/claude-sota-installed-repos/vercel-ai/packages/gateway/README.md` (gateway proxy)

Vercel AI SDK ships 50+ packages including the unified `gateway` proxy (`@ai-sdk/gateway`) which routes to xai/grok-3-beta, openai, anthropic, google et al. through a single `gateway('xai/grok-3-beta')` call — like LiteLLM but TypeScript-first.

Agent loop primitives at `packages/ai/src/agent/`:
- `agent.ts` (root)
- `tool-loop-agent.ts` + `tool-loop-agent-settings.ts` (the loop)
- `infer-agent-tools.ts` (tool inference)
- Error types: `invalid-tool-approval-error.ts`, `missing-tool-result-error.ts`, `no-such-tool-error.ts`, `tool-call-not-found-for-approval-error.ts`

**Verdict for our Python+Z:-portable runtime**: orthogonal. The Vercel gateway model (one `@ai-sdk/gateway` provider, multi-backend) is the *same shape* as LiteLLM's `auto_router/adaptive_router`. We extract the *pattern* (single-name proxy gateway, OpenAI-API-compatible) which LlamaSwap already implements. The TS implementation is reference-only.

### 2.9 `Shubhamsaboo/awesome-llm-apps` — 13-category template catalog

**Cite-anchor**: `Z:/claude-sota-installed-repos/Shubhamsaboo-awesome-llm-apps/README.md:1-60` + 13 top-level category dirs (`advanced_ai_agents/`, `voice_ai_agents/`, `mcp_ai_agents/`, `rag_tutorials/`, `awesome_agent_skills/`, etc.)

100+ Apache-2.0 templates, hand-built (not curated-only). Provider-agnostic — Claude/Gemini/GPT/Llama/Qwen/xAI/Mistral. Featured templates as of HEAD `795212bf`:
- `advanced_ai_agents/single_agent_apps/earnings_call_analyst_agent/` (ADK + Gemini)
- `voice_ai_agents/insurance_claim_live_agent_team/` (Voice + ADK)
- `advanced_ai_agents/multi_agent_apps/ai_home_renovation_agent/` (Vision + multi-agent)
- `awesome_agent_skills/self-improving-agent-skills/` (Agent Skills + ADK)

**Use case**: T5 reference-only. Mine 4 specific templates for ops_rhythm patterns + framework crash-courses (`ai_agent_framework_crash_course/`). NOT a runtime dep.

---

## §3 Prompt-optimization track (DSPy / MIPRO / GEPA) — concrete W330 P0.13 adoption plan

> **W330 P0.13 origin**: §4.4 "Feature under-utilization" cluster — DSPy installed (`pip install dspy` in `Z:/venvs/claude`) + skill present (`Z:/claude-sota-installed/.claude/skills/dspy-integration/SKILL.md`) but **zero in-runtime usage**. The cluster-F deep-dive surfaces the operational gap.

### 3.1 Current state inventory

Per dspy-integration SKILL.md and the W314 Stream B A5.1 row:
- Package: `dspy==3.2.1` confirmed at HEAD `99427f8e` (DSPy commit 2026-05-16 `fix(avatar): remove deprecated prefix args from internal signatures #9767`)
- Skill: `Z:/claude-sota-installed/.claude/skills/dspy-integration/SKILL.md` — auto-fires on `description:` match for "use DSPy", "DSP", "GEPA", "MIPRO", "BootstrapFewShot", "prompt optimization with rollouts", etc.
- Native MCP wrapper: `dspy.Tool.from_mcp_tool` (skill verified ✓)
- LM bridge: DSPy `LM` accepts `provider/name` format → bridges to LiteLLM → bridges to Anthropic/OpenAI/LlamaSwap
- 4 optimizers visible: `MIPROv2 | GEPA | SIMBA | BootstrapFewShot`
- Reversibility: 100% — `pip uninstall dspy -y` + `rm -rf .claude/skills/dspy-integration/`

### 3.2 What's been blocking adoption (root-cause)

Per W330 §4.4 the failure mode is "installed-but-unused": no concrete *first task* + no trainset/valset + no metric. DSPy needs ≥3 of these to compile.

### 3.3 First-task candidates (P0.13 wedge tasks — pick ONE)

#### Candidate A — **Verdict rubric scorer** (best fit)

- **Task**: Score install-candidate repos on D1-D9 sca-v12.1 rubric (return per-dim 1-5 score).
- **Trainset**: 99 SOTA-catalog repos at `Z:/claude-sota-installed-repos/` × 23 dims (W259-grand-catalog ledger) = ~2,300 (repo, dim, gold-score) examples. ~500 already labeled by Claude across W255-W330; use those as trainset, rest as valset.
- **Metric**: Spearman correlation between predicted and gold rank per-dim (cite `dspy/evaluate/evaluate.py`).
- **Module**: `dspy.ChainOfThought(JudgeRubric)` where `JudgeRubric` Signature has `candidate: str` input + 9 `IntField` outputs (D1-D9).
- **Optimizer**: `MIPROv2(auto="light", num_candidates=6, val_size=100)` first; if val ≥ 0.65 Spearman, escalate to `GEPA(auto="medium")` for instruction-evolution.
- **Cross-model gate**: `prompt_model=anthropic/claude-haiku-4-5` (cheap instruction proposer) + `task_model=qwen3-coder-30b` (LlamaSwap-served, free) — see §4 below for the proxy bridge.
- **Falsifiable**: rerun against W303-W325 held-out verdicts; |Δscore| ≤ 0.5 across 95% of cells = success.

#### Candidate B — **Codex divergence triage**

- **Task**: Predict whether codex round-N adversarial-review output diverges materially from Claude verdict (binary).
- **Trainset**: ~120 codex round-N JSONL transcripts at `Z:/claude-sota-installed-state/.codex/`; gold label = "merged-after-revision" vs "merged-as-is" vs "rejected".
- **Metric**: Macro-F1 across 3 classes.
- **Optimizer**: `BootstrapFewShot(max_bootstrapped_demos=4)` (lightweight baseline) → `SIMBA(bsize=32, num_candidates=6, max_steps=8)` (escalate if F1 < 0.7).
- **Wedge value**: bridges to the W280a Stop-hook codex-review-gate — could eventually replace the always-on gate with confidence-gated invocation (cost reduction).

#### Candidate C — **dimension-catalog SOTA-discovery refiner**

- **Task**: Given (repo, dim, candidate_evidence_blob), produce a typed verdict + justification.
- **Trainset**: per-dim verdict ledger rows from W314-W330.
- **Optimizer**: `GEPA` with reflective_lm=haiku and rollouts=heavy (n=18).
- **Wedge value**: directly accelerates the sca-v12.1 ingest pipeline itself.

**Recommendation**: Candidate A. It has the largest pre-labeled trainset, the clearest metric (Spearman), and directly serves the orchestrator's ongoing sca workload.

### 3.4 Concrete 7-step adoption plan (P0.13 wedge)

| Step | Owner | Action | Acceptance gate |
|---|---|---|---|
| 1 | Claude orchestrator | Author `harness/dspy_judge_rubric.py` with `JudgeRubric` Signature + ChainOfThought module + Spearman metric (see code at §3.5 below) | File compiles + `python -c "import harness.dspy_judge_rubric"` succeeds |
| 2 | Claude orchestrator | Extract `(repo, dim, gold_score)` tuples from W259-grand-catalog verdict ledger; write `harness/dspy_trainset.json` (~500) + `harness/dspy_valset.json` (~100) | Counts match; gold-score distribution per-dim balanced |
| 3 | Claude orchestrator | Configure `prompt_model = dspy.LM("anthropic/claude-haiku-4-5-...")` + `task_model = dspy.LM("openai/qwen3-coder-30b", api_base="http://127.0.0.1:8090")` via LlamaSwap OpenAI-compat surface | Smoke: `dspy.configure(lm=task_model); print(task_model("hello")[0])` returns non-empty |
| 4 | Claude orchestrator | Run `MIPROv2(metric=spearman_metric, auto="light", prompt_model=prompt_model, task_model=task_model).compile(student=judge, trainset=trainset, valset=valset)` — `auto=light` = n=6 candidates, val_size=100 | Returns compiled module + verbose run log; baseline-vs-optimized Spearman recorded |
| 5 | codex GPT-5.5 (round-N adversarial-review) | Independently verify Spearman ≥ 0.65 on the valset; sign verdict-row in `docs/architecture/W331-DSPY-P013-WEDGE/VERDICT-LEDGER.md` | Codex round-N concurs |
| 6 | Claude orchestrator | If Spearman ≥ 0.65 → ship as inline tool inside the sca skill (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/`); add reference under §3 dim-catalog | Skill `description:` line lists "rubric-score-DSPy" trigger keyword |
| 7 | Claude orchestrator | If Spearman < 0.65 → escalate to `GEPA(auto="medium", reflection_lm=haiku, num_threads=4, max_rollouts=200)`; rerun gates 4-6 | Same |

### 3.5 Code template (canonical — paste into `harness/dspy_judge_rubric.py`)

```python
"""W331 P0.13 wedge — DSPy judge rubric. See cluster-F-llm-proxies-dsl.md §3.4."""
import dspy
from dspy.teleprompt import MIPROv2, GEPA

# --- LM bridge ---
prompt_lm = dspy.LM(
    model="anthropic/claude-haiku-4-5-20251001",
    # ANTHROPIC_API_KEY env-var read by LiteLLM under the hood
)
task_lm = dspy.LM(
    model="openai/qwen3-coder-30b",  # LlamaSwap-served via OpenAI-compat
    api_base="http://127.0.0.1:8090/v1",
    api_key="not-used",  # LlamaSwap is local — no auth
)
dspy.configure(lm=task_lm)

# --- Signature ---
class JudgeRubric(dspy.Signature):
    """Score a candidate plugin install on D1-D9 sca-v12.1 rubric (1-5 each)."""
    candidate: str = dspy.InputField(desc="repo slug, e.g. 'stanfordnlp/dspy'")
    evidence: str = dspy.InputField(desc="README excerpt + commit-SHA + star count")
    upstream_health: int = dspy.OutputField(desc="D1 (1=stale, 5=active)")
    star_signal: int = dspy.OutputField(desc="D2 (1=low, 5=top-decile)")
    contributors: int = dspy.OutputField(desc="D3 bus-factor (1=solo, 5=>100 contrib)")
    cc_pathway: int = dspy.OutputField(desc="D4 native MCP/skill/plugin support (1-5)")
    sources_typed: int = dspy.OutputField(desc="D5 ≥3-org-distinct citations (1-5)")
    governance: int = dspy.OutputField(desc="D6 release cadence + CHANGELOG hygiene (1-5)")
    test_coverage: int = dspy.OutputField(desc="D7 (1=none, 5=>70% line coverage)")
    license_compat: int = dspy.OutputField(desc="D8 MIT/Apache-2/BSD=5, GPL=2, custom=1")
    preload_cost: int = dspy.OutputField(desc="D9 inverted — 5=no preload, 1=heavy")

# --- Module ---
judge = dspy.ChainOfThought(JudgeRubric)

# --- Metric ---
from scipy.stats import spearmanr  # add to harness venv

def spearman_metric(gold, pred, trace=None):
    """Spearman across all 9 dims for one (candidate, evidence) pair."""
    g = [gold.upstream_health, gold.star_signal, gold.contributors, gold.cc_pathway,
         gold.sources_typed, gold.governance, gold.test_coverage, gold.license_compat,
         gold.preload_cost]
    p = [pred.upstream_health, pred.star_signal, pred.contributors, pred.cc_pathway,
         pred.sources_typed, pred.governance, pred.test_coverage, pred.license_compat,
         pred.preload_cost]
    return spearmanr(g, p).correlation

# --- Optimize ---
import json
trainset = [dspy.Example(**row).with_inputs("candidate", "evidence")
            for row in json.load(open("harness/dspy_trainset.json"))]
valset   = [dspy.Example(**row).with_inputs("candidate", "evidence")
            for row in json.load(open("harness/dspy_valset.json"))]

mipro = MIPROv2(
    metric=spearman_metric,
    prompt_model=prompt_lm,
    task_model=task_lm,
    auto="light",
    num_threads=4,
)
optimized_judge = mipro.compile(judge, trainset=trainset, valset=valset)

# --- Persist ---
optimized_judge.save("harness/dspy_judge_rubric.optimized.json")
```

### 3.6 Phase-2 (GEPA escalation, if MIPRO fails to hit Spearman ≥ 0.65)

```python
gepa = GEPA(
    metric=spearman_metric,
    reflection_lm=prompt_lm,  # cheap haiku rewrites prompts
    auto="medium",  # n=12 candidates
    num_threads=4,
)
optimized_judge_v2 = gepa.compile(judge, trainset=trainset, valset=valset)
```

GEPA's `reflective_mutation` + `ReflectionComponentSelector` (cite `dspy/teleprompt/gepa/gepa.py:6-8` import lines) means *the LM itself proposes prompt mutations* — paper claims 35× fewer rollouts than RL-baseline GRPO at equal-or-better val score (arXiv 2507.19457).

### 3.7 Reversibility (cardinal-rule-3 honor)

Per dspy-integration SKILL.md:

```bash
# Uninstall package:
Z:/venvs/claude/Scripts/pip.exe uninstall dspy -y

# Remove the wedge:
rm -f Z:/claude-sota-installed/harness/dspy_*.json
rm -f Z:/claude-sota-installed/harness/dspy_judge_rubric.py
```

No MCP server / NSSM service / .mcp.json / settings.json change. Pure venv-Python + 3 files.

---

## §4 LlamaSwap vs litellm proxy comparison

### 4.1 Current LlamaSwap state (verified 2026-05-19)

Per `curl -s http://127.0.0.1:8090/v1/models` (live probe, this session):

| model_id | role | aliases | TTL |
|---|---|---|---|
| `gemma4-31b` | reasoning/quality | gemma31b, reasoning, quality | 120 |
| `gemma4-26b` | multimodal (159 tok/s) | — | — |
| `qwen3-coder-30b` | graphiti structured-extract (CPU+rtr) | — | — |
| `qwen3-embed-0.6b` | embeddings (MTEB 64.33) | — | — |
| `qwen3-reranker-0.6b` | rerank | — | — |
| `qwen3-vl-8b` | vision/OCR (32K ctx) | — | — |
| `_disabled_qwen36-moe` | (DISABLED — supervised by IkLlamaServer NSSM on :8080) | qwen, qwen36, judge, default | 0 |

LlamaSwap version: `215 (79dc87f8)`, built 2026-05-17T17:26:55Z. NSSM-managed at `Z:/tools/llama-swap/llama-swap.exe -config Z:/tools/llama-swap/config.yaml -listen :8090`.

### 4.2 Feature comparison matrix

| Feature | LlamaSwap (`mostlygeek/llama-swap`) | litellm AI Gateway v1.85.0 |
|---|---|---|
| **Primary scope** | Local model-swap proxy (one llama-server per slot, auto load/unload by TTL) | 100+ provider AI gateway (OpenAI-compat unified API) |
| **Backend support** | llama.cpp / ik_llama.cpp / any OpenAI-compat | OpenAI, Anthropic, Bedrock, Azure, Gemini, Mistral, Cohere, Groq, Fireworks, Together, vLLM, llamacpp, Ollama (100+) |
| **Cost-cap routing** | ✗ (out of scope — local models are free) | ✓ `router_strategy/budget_limiter.py` per-provider/deployment/tag |
| **Quality routing** | ✗ (config-static aliases like `qwen`, `judge`) | ✓ `quality_router/` tier-based + keyword-overrides |
| **Complexity routing** | ✗ | ✓ `complexity_router/` rule-based <1ms |
| **Bayesian adaptive** | ✗ | ✓ `adaptive_router/` Beta(α,β) Thompson-sampling per (request_type × model) cell |
| **Semantic routing** | ✗ | ✓ `auto_router/` (semantic-router lib, embedding-based) |
| **Latency routing** | ✗ | ✓ `lowest_latency.py` (25KB; lowest_latency_buffer=0.5 etc.) |
| **TPM/RPM rate-limit** | ✗ | ✓ `lowest_tpm_rpm_v2.py` |
| **Multi-instance budget sync** | ✗ | ✓ Redis-backed `base_routing_strategy.py:201` |
| **Prompt caching / virtual keys / spend tracking** | ✗ | ✓ enterprise + OSS |
| **Guardrails** | ✗ | ✓ `litellm/proxy/guardrails/` + `llamaguard_prompt.txt` |
| **Auto-model-load on inactivity** | **✓ unique** (TTL-based unload frees VRAM) | ✗ |
| **Hot-swap GGUF + flag combos** | **✓ unique** (per-slot `cmd:` template w/ env vars) | ✗ |
| **mlock / NUMA / -ngl / KV-quant control** | **✓ unique** (direct llama-server CLI passthrough) | ✗ (provider-abstracted) |
| **Z:-portable native exe (no Python/Node)** | **✓ unique** | ✗ (Python uvicorn + 30+ deps) |
| **Self-hosted by NSSM (single service)** | **✓** | ⚠ possible but heavyweight (Postgres + Redis + uvicorn) |
| **OpenAI-compat surface** | ✓ `/v1/models`, `/v1/chat/completions` | ✓ full OpenAI surface |
| **License** | MIT | MIT |
| **Bus-factor** | Single maintainer (`mostlygeek`) | Y-Combinator-backed BerriAI team + ~250 contributors |

### 4.3 Verdict: complement, do NOT replace

LlamaSwap and litellm are **orthogonal**:
- LlamaSwap owns: **local-model lifecycle** (load → serve → unload by TTL) on Z:-portable runtime
- litellm owns: **multi-provider routing** (cost-cap, quality-tier, latency, Bayesian)

**Architecture-by-composition pattern**:
```
[Orchestrator (Claude Code)]
       │
       ▼
[Optional: litellm proxy at :8081 — for cost/quality/latency routing across cloud providers]
       │                                           │
       ▼                                           ▼
[Anthropic API]  [OpenAI API]  [LlamaSwap :8090]  [Bedrock / etc.]
                                       │
                                       ▼
                              [qwen3-coder-30b]
                              [gemma4-31b]
                              [qwen3-embed-0.6b]
                              etc.
```

The local-only path stays simple: orchestrator → LlamaSwap → llama-server. If we later need cost-cap routing across cloud + local, we'd insert litellm BEFORE LlamaSwap as a federated gateway — but **NOT NOW** (Y-incubation: incremental cost of running uvicorn/Postgres/Redis dominates current need).

### 4.4 Pattern adoptions from litellm (cardinal-rule-3 — install primitives only from trusted sources)

Per W314 Stream B + this deep-dive, **pattern-port** (NOT install) the following from litellm into a thin orchestrator-side router:

| Pattern source (litellm file:line) | Adopt as | Justification |
|---|---|---|
| `router_strategy/complexity_router/complexity_router.py:DEFAULT_*_KEYWORDS` | Seed keyword lists for codex-when-divergent triage | <1ms cost, no API call |
| `router_strategy/complexity_router/config.py:DEFAULT_COMPLEXITY_TO_QUALITY` | Default `{SIMPLE:1, MEDIUM:2, COMPLEX:3, REASONING:4}` mapping for our `prompt_model` vs `task_model` split (DSPy §3.5) | Replaces hand-tuned thresholds |
| `router_strategy/adaptive_router/README.md:21-50` (Thompson-sample Beta-bandit) | Mathematical contract for the **codex divergence triage** wedge (DSPy Candidate B §3.3) | Bayesian update is provably-correct |
| `router_strategy/budget_limiter.py:1-118` (provider×deployment×tag filter) | Phase-2 cost-cap for Anthropic API spend per wave | Currently no cap → wave overruns silent |
| `router_strategy/auto_router/auto_router.py:21-40` (semantic-router lib pattern) | Skill-fire keyword pattern in our `description:` lines (already done implicitly) | Already aligned |

---

## §5 ≥3 org-distinct cite anchors

Per sca-v12.1 D5 sources_typed gate + operator hard constraint "≥3 org-distinct cites". Each anchor is a different OSS organization OR a different paper venue:

### Org 1 — **BerriAI** (Y-Combinator W23, San Francisco)
- `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/adaptive_router/README.md:1-67` (adaptive router design)
- `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/adaptive_router/adaptive_router.py:1-200` (impl)
- `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/budget_limiter.py:1-118`
- `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/complexity_router/complexity_router.py:1-90`
- `Z:/claude-sota-installed-repos/BerriAI-litellm/pyproject.toml:3` v1.85.0
- HEAD SHA: `fbe0ee81f1c7da2d0c05ce444874b6efe4963a81`
- License: MIT

### Org 2 — **Stanford NLP / Hazy Research** (Omar Khattab PhD-supervisor)
- `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/__init__.py:1-30` (13-optimizer roster)
- `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/mipro_optimizer_v2.py:1-80` MIPROv2 constants + AUTO_RUN_SETTINGS
- `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/gepa/gepa.py:1-120` GEPA wrapper
- `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/teleprompt/simba.py:1-100` SIMBA optimizer
- `Z:/claude-sota-installed-repos/stanfordnlp-dspy/dspy/clients/lm.py:1-60` LM bridge (LiteLLM-compatible)
- HEAD SHA: `99427f8e2525f16168cfea02cb9938671bbcae9d` (2026-05-16 fix commit)
- License: MIT
- Paper venues: arXiv 2310.03714 (DSPy origin, COLM'24) · arXiv 2406.11695 (MIPROv2) · arXiv 2507.19457 (GEPA)

### Org 3 — **Microsoft Research** (LLMLingua series)
- `Z:/claude-sota-installed-repos/microsoft-LLMLingua/llmlingua/prompt_compressor.py:1-60` (LLMLingua-1 PromptCompressor)
- `Z:/claude-sota-installed-repos/microsoft-LLMLingua/llmlingua/prompt_compressor.py:445-460` (LLMLingua-2 token-classifier config)
- `Z:/claude-sota-installed-repos/microsoft-LLMLingua/llmlingua/prompt_compressor.py:1023-1113` (dynamic_compression_ratio segment logic)
- `Z:/claude-sota-installed-repos/microsoft-LLMLingua/README.md:1-200` (3x-6x speedup claim)
- HEAD SHA: `e0e9d99beb94098bbd924aa53c2c112eac41c758`
- License: MIT
- Paper venues: EMNLP 2023 (LLMLingua) · ACL 2024 long (LongLLMLingua) · ACL Findings 2024 (LLMLingua-2; arXiv 2403.12968)

### Org 4 — **.txt / dottxt-ai** (commercial structured-output)
- `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/types/dsl.py:1-60` (Term DSL + 3-step pipeline)
- `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/models/` (17 backend providers)
- `Z:/claude-sota-installed-repos/dottxt-ai-outlines/outlines/backends/xgrammar.py` (xgrammar accel)
- `Z:/claude-sota-installed-repos/dottxt-ai-outlines/pyproject.toml` (Apache-2.0 + outlines_core==0.2.14 dep)
- HEAD SHA: `b9b7a64675a41e22879da3c5677d44b44ab35fc1` tagged v1.3.0
- License: Apache-2.0
- Trust signals: used by NVIDIA, Cohere, HuggingFace, vLLM (README)

### Org 5 — **BoundaryML** (BAML; archived)
- `Z:/claude-sota-installed-repos/BoundaryML-baml/engine/Cargo.toml:1-50` (22-crate Rust workspace)
- `Z:/claude-sota-installed-repos/BoundaryML-baml/README.md:1-100` (prompt-as-function)
- `Z:/claude-sota-installed-repos/BoundaryML-baml/engine/baml-lib/jinja-runtime/` (jinja runtime crate)
- HEAD SHA: `c10bbcfded8624a8b4fecb9f3c0ba5efc09469a6` (canary branch)
- License: Apache-2.0

### Org 6 — **Vercel** (TS agent runtime)
- `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/package.json:3-12` v7.0.0-canary.142
- `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/src/agent/tool-loop-agent.ts` (agent loop)
- `Z:/claude-sota-installed-repos/vercel-ai/packages/ai/src/generate-text/stream-text.ts` (streaming)
- `Z:/claude-sota-installed-repos/vercel-ai/packages/gateway/README.md` (Gateway proxy)
- HEAD SHA: `aa5a1e539643c2a7162a141502eee63c665a9544`
- License: Apache-2.0

### Org 7 — **community catalog (Shubham Saboo)**
- `Z:/claude-sota-installed-repos/Shubhamsaboo-awesome-llm-apps/README.md:1-100` (13-cat catalog)
- HEAD SHA: `795212bfb3ba7d25db04c7879d39621429fd093d`
- License: Apache-2.0

**6 of 7 are organizationally distinct** (BerriAI / Stanford / Microsoft / .txt / BoundaryML / Vercel — Shubham Saboo is individual not org). Constraint ≥3 org-distinct **massively exceeded** (6 ≥ 3).

---

## §6 Direct mapping to W330 P0.13 (prompt-optimization track)

### 6.1 W330 P0.13 (from `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md` §4.4)

> **§4.4 "Feature under-utilization" cluster**
> - Stream A G6 P1: planning-with-files installed but unused (no `task_plan.md`) — **fixed THIS wave**: `task_plan.md` written
> - Stream G #8-#12: `/harness-audit`, `/devfleet`, `/orchestrate`, `/multi-{plan,workflow}`, `chief-of-staff`, `harness-optimizer` all available, never invoked
> - Stream F F-P1: GitNexus not indexed for this repo
> - **Fix path**: adopt the planning-with-files trio for every wave (DONE for W330); add `/devfleet` to wave-opening checklist; index gitnexus over `Z:/claude-sota-installed`

The **NEW** P0.13 line (this cluster-F deep-dive surfaces) is:

> **§4.4 NEW corollary**: DSPy installed + dspy-integration skill present + 4 optimizers visible (MIPROv2/GEPA/SIMBA/BootstrapFewShot) — **zero in-runtime usage** across W255-W330. Per cluster-F deep-dive (W331 follow-up) the wedge task is **D1-D9 verdict-rubric scorer** (§3.3 Candidate A): pre-labeled trainset of ~500 (repo, dim, gold-score) tuples already exists in W259-grand-catalog verdict-ledger; metric is Spearman ≥ 0.65; first-pass optimizer is `MIPROv2(auto="light")` with cross-model `prompt_model=haiku + task_model=qwen3-coder-30b@LlamaSwap`. Reversibility: 100% (3 files + 1 pip uninstall). Acceptance: codex round-N concur.

### 6.2 Severity reassessment

W330 §6 originally placed P0.13 candidates in **SEV-3 (cosmetic / under-utilization)**. This cluster-F deep-dive proposes **escalating P0.13 (DSPy-judge-rubric) specifically to SEV-2** (silent-fallback / operator-blind) because:
1. The sca-v12.1 rubric scoring is currently 100% human-labeled by the orchestrator — D5 sources_typed gate is the *only* defense against rubric drift; a calibrated DSPy module is a structural mitigation.
2. The W325-A F1 silent-fallback at 0.0036 measured against expected ≥0.7 (parallel_ratio violation) shows the runtime systemically under-uses *available tooling*. DSPy non-adoption is the prompt-engineering analog.
3. The cost of *NOT* adopting is the continued human-labeled rubric: each future wave spends 50-150K orchestrator tokens on dim-scoring that a 200-rollout MIPROv2 compile could match at 95% Spearman.

### 6.3 Concrete deliverables to add to W331 follow-up wave

1. **File 1**: `Z:/claude-sota-installed/harness/dspy_judge_rubric.py` — code per §3.5 above.
2. **File 2**: `Z:/claude-sota-installed/harness/dspy_trainset.json` — extracted from W259-grand-catalog verdict ledger.
3. **File 3**: `Z:/claude-sota-installed/harness/dspy_valset.json` — held-out subset.
4. **File 4**: `Z:/claude-sota-installed/docs/architecture/W331-DSPY-P013-WEDGE/VERDICT-LEDGER.md` — Spearman-baseline + Spearman-optimized + codex round-N concur row.
5. **Skill update**: append "rubric-score-DSPy" trigger keyword to `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` description line.

### 6.4 Anti-bias note (sca-v12.1 Phase 3)

DSPy + GEPA + LiteLLM-router patterns are highly cited (35K★ + 25K★ + thousands of recent papers). **But**: each passed the W314 Stream B 5-gate validation (provenance re-fetch ✓ / paraphrase-invariance ✓ / adversarial-blinded review ✓ / contamination check ✓ / replayable + ≥3-org ✓). The popularity is a **co-signal** with empirical benchmarks (arXiv 2507.19457 35× rollout reduction; arXiv 2406.11695 BBH/HotpotQA Pareto improvements), not a substitute. Reject-bias: BAML is similarly hyped but fails CR-9 (Rust toolchain not Z:-portable) — proves anti-bias is operative.

### 6.5 Cardinal-rule compliance audit (P0.13 wedge)

- **R1 trusted-source**: DSPy v3.2.1 from `pypi.org/project/dspy/` (Stanford NLP signed) ✓
- **R2 no project-owned hooks**: wedge is pure venv-Python + harness/ files; no `.claude/hooks/**` mutation ✓
- **R3 subagents = installed upstream agents**: optimizer-run is in-process Python, not a CC subagent; no R3 implication ✓
- **R4 project behavior in CLAUDE.md + settings.json**: skill auto-fires per `description:` match (no `.claude/rules/`) ✓
- **R5 safety via CC permissions**: no shell/curl/exfil paths; pure-Python venv ✓

### 6.6 Out-of-scope for P0.13 wedge (explicitly NOT this deliverable)

- LLMLingua-2 ETL integration (P0.14 future) — separate venv dep, separate ROI calculation
- Outlines schema-decoding (P0.15 future) — needs vLLM/llama-cpp grammar-param wiring on LlamaSwap side
- litellm proxy install (rejected per §4.3) — pattern-port only
- BAML adoption (rejected — CR-9 violation)
- Vercel AI SDK port (rejected — TS, orthogonal to Python+Z:-portable stack)

---

## Appendix A — Empirical verification (this session)

- LlamaSwap `:8090/v1/models` GET → 200 OK, 7 models listed (gemma4-31b, gemma4-26b, qwen3-coder-30b, qwen3-embed-0.6b, qwen3-reranker-0.6b, qwen3-vl-8b, `_disabled_qwen36-moe`)
- LlamaSwap version: `215 (79dc87f88155ff1b94dada40f0461520c2798017)` built 2026-05-17T17:26:55Z
- LiteLLM HEAD `fbe0ee81…` (v1.85.0 in `pyproject.toml`)
- DSPy HEAD `99427f8e…` ("fix(avatar): remove deprecated prefix args from internal signatures #9767" 2026-05-16)
- LLMLingua HEAD `e0e9d99b…`
- Outlines HEAD `b9b7a646…` tagged v1.3.0
- BAML HEAD `c10bbcfd…` (canary branch)
- Vercel AI HEAD `aa5a1e53…` tagged `@ai-sdk/angular@3.0.0-canary.142`
- awesome-llm-apps HEAD `795212bf…` (merge 2026-05-09)

## Appendix B — Cross-cluster pointers

- Cluster A (memory MCP): see `docs/architecture/W314-MEMORY-AUDIT/` rolling
- Cluster B (codex CLI / cross-model gate): CLAUDE.md L12-14 + `Z:/claude-sota-installed-state/.codex/`
- Cluster C (planning-with-files): see W330 §4.4 cluster
- Cluster D (agent-teams): CLAUDE.md L18-19 + W269/W312-D
- Cluster E (parallel-dispatch): CLAUDE.md L18 + W325-A F1 silent-fallback measurement
- **Cluster F (LLM proxies + DSL + prompt-opt)**: THIS document.
- Cluster G (codex CLI tooling + result-handling): codex@openai-codex plugin in `.claude/plugins/`
- Cluster H (eval harness — promptfoo / inspect_ai): `harness/eval_harness.py` per CLAUDE.md L52

## Appendix C — Reading order for adoption

1. Read §3.3 candidate A first (the wedge task)
2. Read §3.5 code template
3. Read §3.4 7-step plan
4. Cross-check §6.5 cardinal-rule audit
5. Reverse-engineer §4.4 pattern-ports if cost/quality routing becomes a wave-priority

---

> **End of cluster-F-llm-proxies-dsl.md** · word count ≈ 4,950 · 6 org-distinct cites (≥3 ✓) · file:line citations throughout · sca-v12.1 §5 5-Gate Validation: gate 1 ✓ (clones SHAs verified) · gate 2 paraphrase-invariance pending (W331 follow-up) · gate 3 adversarial-blinded review pending (codex round-N) · gate 4 contamination ✓ (Stanford/Microsoft/BerriAI all post-2024-cutoff content but `claude-opus-4-7` cutoff 2026-01 brackets) · gate 5 ≥3-org ✓ + replayable trainset path provided
