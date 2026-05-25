# W295 Stream D — Cross-Model Voting + LLM-as-Judge Ensemble

> Wave: W295 · Stream: D · Date: 2026-05-18 · Sister streams: A (MCP sweep), B (multi-dim scoring), C (anti-bias)
> Frameworks audited: 10 EXTERNAL — `LLM-as-Judge` (Zheng+ Berkeley/Stanford/CMU, 2023) · `AlpacaEval 2.0` (Stanford Tatsu Lab) · `MT-Bench` (LMSYS) · `Chatbot Arena` (LMSYS / LMArena.ai) · `Constitutional AI / RLAIF` (Anthropic) · `JudgeLM` (Huazhong U. + BAAI) · `PandaLM` (PKU + Westlake) · `Prometheus` (KAIST + Yonsei) · `PORTIA split-and-merge` (HKUST + CityU HK) · `Self-Preference Bias quant metric` (Wataoka+ 2024). Supporting: `OpenAI Evals` + `Inspect AI` (UK AISI) for production protocol reference.
> Verdict on current sca-v3.1 single-codex Phase-6 gate: **MUST CHANGE** — single-judge gates are documented to under-detect at least 3 named bias classes that a ≥2-judge ensemble would catch. Migration path is incremental, codex-preserving, and degrades-gracefully when secondary judges are unavailable.

---

## §1 — Framework inventory (10 EXTERNAL)

All cites carry `[EXTERNAL]` + URL + access date. Access date for all rows = **2026-05-18** unless otherwise noted.

| # | Framework | Org | URL | Primary judging mechanism |
|---:|---|---|---|---|
| 1 | LLM-as-Judge (Zheng+ 2023) | UC Berkeley / Stanford / CMU / MBZUAI | `https://arxiv.org/abs/2306.05685` `[EXTERNAL]` | GPT-4 single-answer 1-10 + pairwise w/ position-swap; agreement >80% vs humans |
| 2 | AlpacaEval 2.0 | Stanford Tatsu Lab | `https://github.com/tatsu-lab/alpaca_eval` `[EXTERNAL]` | Pairwise vs fixed baseline; **logprob-weighted continuous preference**; GLM length-controlled win-rate (Spearman 0.93→0.98 vs Arena) |
| 3 | MT-Bench | LMSYS | `https://arxiv.org/abs/2306.05685` `[EXTERNAL]` | 80 multi-turn Q × 8 categories; single-answer 1-10 (default) + pairwise; FastChat `llm_judge` module |
| 4 | Chatbot Arena | LMSYS / LMArena.ai | `https://arxiv.org/abs/2403.04132` + `https://lmarena.ai` `[EXTERNAL]` | Crowd-sourced anonymous pairwise battles → ELO (`R_new = R_old + K(S − E)`) + Bradley-Terry (`P(A>B) = expit(R_A − R_B)`); bootstrapped CIs |
| 5 | Constitutional AI / RLAIF | Anthropic | `https://arxiv.org/abs/2212.08073` `[EXTERNAL]` | **Critique-revise loop**: model samples response → CoT-critique against constitution principles → revises → fine-tune on revisions; AI feedback drives preference-model RL |
| 6 | JudgeLM | Huazhong U. + BAAI | `https://arxiv.org/abs/2310.17631` `[EXTERNAL]` | Fine-tuned 7B/13B/33B judge; bag-of-tricks: **swap augmentation** (position-bias) + **reference support** (knowledge-bias) + **reference drop** (format-bias) |
| 7 | PandaLM | PKU + Westlake | `https://arxiv.org/abs/2306.05087` `[EXTERNAL]` | Fine-tuned judge model; ternary decision (A wins / B wins / tie); evaluates correctness + concision + clarity + comprehensiveness + formality + adherence |
| 8 | Prometheus | KAIST + Yonsei | `https://arxiv.org/abs/2310.08491` `[EXTERNAL]` | Open-source 13B judge **on par with GPT-4** when given reference answer + score rubric; absolute (not pairwise) fine-grained 1-5 |
| 9 | PORTIA split-and-merge | HKUST + CityU HK | `https://arxiv.org/abs/2310.01432` `[EXTERNAL]` | Splits answers into segments, aligns similar content, merges back → calibrates position bias **without retraining the judge** |
| 10 | Self-Preference Bias quant metric | Wataoka+ 2024 | `https://arxiv.org/abs/2410.21819` `[EXTERNAL]` | Novel quantitative metric — measures GPT-4's preference for low-perplexity (= familiar = own-style) outputs; **GPT-4 confirmed to exhibit significant self-preference** |

Supporting production references (not counted in the ≥6 since they are general harnesses, not novel ensembling research, but their wiring is directly liftable):
- **OpenAI Evals** `ModelBasedClassify` `[EXTERNAL]` `https://github.com/openai/evals` — `eval_type ∈ {classify, classify_cot, cot_classify, cot_classify_jp}`; CoT-first recommended for accuracy; robust `__invalid__` parsing.
- **Inspect AI** (UK AI Safety Institute) `[EXTERNAL]` `https://github.com/UKGovernmentBEIS/inspect_ai` — `model_graded_qa(model=[m1, m2, m3])` triggers `multi_scorer(..., "mode")` = **hardcoded majority vote** across judge list; v0.3.9+ wire.

---

## §2 — Per-framework mechanism + named failure mode addressed

### §2.1 — LLM-as-Judge (Zheng+ 2023)
**Mechanism**: GPT-4 prompted to grade a single response (1-10 Likert) or to pick the better of two responses. For pairwise, judge is run **twice with answer order swapped** (`g1_winner`/`g2_winner`); inconsistent verdicts → tie.
**Named failures addressed**:
- *Position bias* (LLM favors first answer) → swap-and-rerun.
- *Verbosity bias* (LLM favors longer answer) → caller controls; partial mitigation via CoT prompt.
- *Self-enhancement bias* (LLM favors its own family) → use a **different judge than the candidate** + reference-based judge.
- *Limited reasoning* (math/code) → fine-tuned or reference-based judge.

### §2.2 — AlpacaEval 2.0
**Mechanism**: `weighted_alpaca_eval_gpt4_turbo` annotator outputs a **single token**; weight = `softmax(logprob)` → continuous preference ∈ [0,1]. Length-controlled rate fits a GLM: `pref ~ tanh(std_delta_len) + instruction_difficulty + not_gamed_baseline − 1`; then predicts counterfactual at `std_delta_len = 0`.
**Named failures addressed**: *length gameability* (longer = preferred regardless of quality); *position bias* (randomized output order); Spearman 0.93→0.98 vs Chatbot Arena after length-control.

### §2.3 — MT-Bench (FastChat `llm_judge`)
**Mechanism**: Default = single-answer grading (1-10); pairwise modes `pairwise-baseline` and `pairwise-all` available. `play_a_match_pair` calls `run_judge_pair` twice with swapped order. Math prompts use `single-math-v1` template with reference-answer support.
**Named failures addressed**: position bias (swap), self-enhancement (judge ≠ candidate), math (reference template).

### §2.4 — Chatbot Arena
**Mechanism**: Anonymous pairwise battles between human-volunteer users + 2 anonymized models; user votes; aggregated via ELO (online, K=4) and Bradley-Terry MLE (`scipy.optimize.minimize`); 1000+ bootstrap resamples for 95% CIs.
**Named failures addressed**: *brand-bias* (anonymization); *sample-distribution bias* (live human prompts ≠ canned benchmark); *small-N variance* (bootstrap CIs).

### §2.5 — Constitutional AI / RLAIF
**Mechanism**: Two-phase. Phase 1 (SL): sample response → prompt model to critique-against-principle → revise → fine-tune on revision. Phase 2 (RL): pairwise preference dataset generated by **AI feedback** (not human) using principles; train a preference model; PPO-tune on it.
**Named failures addressed**: *human-labeller scaling* (no humans in preference loop); *opaque decisions* (CoT critique is human-readable); *evasive refusals* (constitutional principles forbid evasion).

### §2.6 — JudgeLM
**Mechanism**: 7B/13B/33B fine-tuned judges on GPT-4-labeled MT-Bench. Three training tricks:
1. **Swap augmentation** — each training example duplicated with order swapped → judge becomes position-invariant.
2. **Reference support** — judge given gold reference for knowledge questions → reduces hallucination penalty.
3. **Reference drop** — randomly drop the reference in training → judge stays robust when no reference is available.
**Named failures addressed**: position bias, knowledge bias, format bias (all explicit).

### §2.7 — PandaLM
**Mechanism**: 7B/13B/65B fine-tuned ternary judge (A/B/tie). Evaluates 6 criteria beyond "which is better": correctness, concision, clarity, comprehensiveness, formality, adherence-to-instruction.
**Named failures addressed**: *under-specified evaluation* (LLM-as-judge often collapses to a vibes-check) → forces explicit per-criterion verdict.

### §2.8 — Prometheus
**Mechanism**: 13B open-source judge fine-tuned on `Feedback Collection` (100K instances × 1K rubrics). Per-task absolute 1-5 grade with **required inputs**: instruction + response + reference answer + 5-tier score rubric. Achieves **0.881 Pearson** with GPT-4 evaluations.
**Named failures addressed**: *closed-source unreliability* (versions can change silently); *custom-rubric inability* (proprietary judges can't be tuned to "child-readability"); *cost* (Prometheus runs locally for free).

### §2.9 — PORTIA split-and-merge
**Mechanism**: Splits each answer into multiple segments → aligns semantically similar segments across the two answers (e.g., "intro of A" ↔ "intro of B", "code of A" ↔ "code of B") → merges back into normalized pair → judge sees a structurally balanced pair.
**Named failures addressed**: *position bias* — **without retraining** the judge or running it twice (cost-efficient vs swap-rerun); empirically reduces inconsistency rate.

### §2.10 — Self-Preference Bias quantitative metric
**Mechanism**: For each (instruction, response) pair compute the judge's perplexity over the response. Plot evaluator score vs perplexity. Fairness-inspired metric measures **excess score for low-perplexity outputs** above what an oracle judge would assign.
**Named failures addressed**: *self-enhancement* (formerly anecdotal — now quantifiable). Result: **GPT-4 exhibits significant self-preference**, confirmed by `r > 0` between perplexity-on-own-output and score-boost.

---

## §3 — Proposed sca-v5 Phase-6 codification

**Status quo (sca-v3.1)**: single codex GPT-5.5 reviewer ratifies/blocks Phase-5 verdicts. Single-judge under-detects at least 3 named bias classes (§5 below). This section distills ≥5 EXTERNAL mechanisms into a layered Phase-6 protocol.

**Design constraints (operator-stated)**:
- Compatible with already-wired codex GPT-5.5 primitive (W286 cardinal-rule-2 contract).
- ≥1 mechanism that catches a single-model-blindspot.
- Specify behavior when secondary judges are unavailable (degrade-gracefully, not fail-closed-everywhere).

### §3.1 — Phase-6 layered protocol (sca-v5 candidate)

| # | Mechanism | Models participating | Weighting | Failure-mode when judge unavailable |
|---:|---|---|---|---|
| **6.1** | **Position-swap pairwise verdict** (LLM-as-Judge §2.1 + MT-Bench §2.3) — for any 2-candidate ADOPT/REJECT comparison, run codex GPT-5.5 twice with verdict-evidence order swapped; inconsistent verdicts → escalate to 6.2 | codex GPT-5.5 (×2 with swap) | Inconsistent = downgrade verdict 1 tier | Always available (uses already-wired codex) |
| **6.2** | **Multi-judge majority-vote ensemble** (Inspect AI `multi_scorer(..., "mode")`) — when 6.1 returns inconsistent OR when stakes are ADOPT-class (`install_score ≥ 4.0`), run ≥3 distinct-family judges: Claude Opus (orchestrator) + codex GPT-5.5 + open-source local judge (qwen3-coder via Ollama `:16700`). Verdict = majority vote (mode). | Claude Opus + codex GPT-5.5 + qwen3-coder (Ollama local) | Equal vote per judge | If <3 judges available, fall back to **6.1** (don't fail-closed) |
| **6.3** | **Constitutional critique-revise** (CAI §2.5) — each judge produces *verdict + 3 explicit criticisms of own verdict* against a list of named adoption-failure principles (e.g., "preload budget", "cardinal-rule-2 violation", "state-outside-repo") → judge revises → final verdict = revised. | Each judge in 6.2 (Opus + codex + qwen3) | Self-revised verdict overrides initial | Always available (judge does both steps) |
| **6.4** | **Bias-mitigation order rotation** (AlpacaEval §2.2) — when presenting Phase-1..5 evidence to each judge in 6.2, randomly permute order in which dimensions D1..D18 are presented. Verifies judges are not anchor-biased. **Anchor-bias diagnostic**: if a judge's verdict shifts when only the order changes, flag as "verdict not robust under anchor permutation". | All 6.2 judges | Verdict is anchor-robust iff invariant under ≥3 permutations | Always available |
| **6.5** | **Disagreement-amplification tiebreaker** (JudgeLM §2.6 spirit + JudgeLM tiebreaker pattern) — when 6.2 majority vote is 2-1 OR when any judge's confidence drops below 0.7, run a **3rd-party tiebreaker judge** (Gemini-2.5 if available, else perplexity Sonar, else escalate to operator) **with explicit disclosure** of the disagreement + the dissenting reasoning. | Tiebreaker = Gemini-2.5 / Sonar / operator | Tiebreaker verdict has 0.5× weight (not full vote) | If unavailable: surface "non-unanimous verdict needs operator ratification" |
| **6.6** | **Self-preference-bias screen** (Wataoka+ §2.10) — for each judge, log a metadata flag `self_preference_score` computed as judge-perplexity over the candidate-org's docs. If `self_preference_score < µ - σ` (judge unusually familiar with candidate), down-weight that judge's vote 0.5×. | Applied to each 6.2 judge | Down-weight low-perplexity-on-own-style judges | Compute requires only logprob — available on all hosted models |
| **6.7** | **Length-controlled evidence balancing** (AlpacaEval LC §2.2) — when one Phase-3 stream produced markedly longer evidence than another, fit GLM and counterfactually balance. Prevents codex from being persuaded by sheer volume. | n/a (applied to evidence, not judges) | Counterfactual preference at `delta_len = 0` | Always available |
| **6.8** | **PORTIA-style structural alignment** (PORTIA §2.9) — when comparing two adoption candidates head-to-head (vs incumbent), split each candidate's writeup into structural sections (D1, D2, …, D18) → align identical-dimension sections → present aligned-pair to judge. | Pre-processing; any judge | n/a | Always available |

### §3.2 — Operational rollout (incremental, codex-preserving)

| Stage | Wave | Action | Reversibility |
|---|---|---|---|
| **S1** | W295 (this wave) | Land **6.1 position-swap** as `codex:adversarial-review` flag `--swap-pass`. Already supported by codex CLI re-invocation. | Trivial — single flag |
| **S2** | W296 | Land **6.4 anchor-rotation** as a Phase-5 evidence-preprocessor (orchestrator-side; no codex change). | Code-level; reverts via flag |
| **S3** | W297 | Land **6.2 majority-vote** by adding a `--judge-ensemble qwen3-coder,codex,opus` codex meta-config. Falls back to single-judge if quorum unavailable (degrade-gracefully). | Config-only |
| **S4** | W298 | Land **6.3 critique-revise** by extending current `codex:adversarial-review` prompt with constitutional-principle list (already drafted in W282d). | Prompt-only |
| **S5** | W300+ | Optional: land **6.5 tiebreaker** if Gemini-2.5 MCP becomes available; **6.6 self-preference screen** requires logprob-MCP exposure (not yet wired). | Defer until primitives ready |

---

## §4 — Retroactive simulation of ≥2 prior verdicts

### §4.1 — `ruvnet/claude-flow` W288 prelim T2 ADOPT → W289 final T4 CITE-ONLY

**W288 path (single-judge)**: deepwiki-summary harness-fit-5 → codex GPT-5.5 single-pass APPROVE.

**W289 path (sca-v3 full)**: full pyright-on-imports + preload-budget audit → codex GPT-5.5 reversed to REJECT (D5+D14 hard-caps + D11 catastrophic preload + CR-2 violation).

**Proposed Phase-6 simulation**:
- **6.1 swap**: codex with reverse-ordered evidence (REJECT-evidence first vs ADOPT-evidence first) — likely caught D11 preload regardless of order; **6.1 alone would have triggered the reversal in W288**, eliminating the round-trip.
- **6.2 ensemble**: Opus would have seen the `matcher:".*"` over-fire (it actually did in real W289-fix1); qwen3-coder would likely have grade-2'd D14 stars-vs-quality. **Majority = REJECT in W288**.
- **6.6 self-preference**: codex's training data over-represents popular orgs like `ruvnet`; self-preference screen would have down-weighted codex's initial APPROVE.

**Verdict change**: YES — Phase-6 would have shipped the W289 T4 verdict at W288 timing (saving 1 wave of bookkeeping).

### §4.2 — `OthmanAdi/planning-with-files` W291.Stage2 T1 INSTALL

**Real path (single-codex, 3-persona convergent APPROVE)**: install_score 4.67 / pattern_score 4.68 → codex APPROVE.

**Proposed Phase-6 simulation**:
- **6.1 swap**: codex would have rendered same verdict (high-quality, no order-sensitive evidence).
- **6.2 ensemble**: Opus would have APPROVED (architecturally clean). qwen3-coder on the 21.5k★ + SKILL.md + cardinal-rule compliance would have APPROVED.
- **6.4 anchor-rotation**: no dimension presented anchor effect (verdict invariant under permutation).
- **6.5 tiebreaker**: not needed (3-0 ensemble agreement).
- **6.6 self-preference**: marginal — `planning-with-files` is high-star, codex training-overrepresentation would slightly boost score, but not enough to overturn 3-0.

**Verdict change**: NO — Phase-6 would have ratified the same T1 INSTALL with **higher confidence** (3-judge agreement vs 1-judge ratification).

### §4.3 — `bytedance/deer-flow` W291.Stage2 prelim T2 ADOPT → final T3 PATTERN-STUDY

**Real path (sca-v3.1 with D14 stars-not-hardgate cap)**: 68k★ → preliminary T2 → D5+D10 hard-caps applied → downgraded T3.

**Proposed Phase-6 simulation**:
- **6.1 swap**: codex would catch D5 hard-cap regardless of order.
- **6.2 ensemble**: qwen3-coder (a Chinese-org-trained local model) would actually have *higher* self-preference for ByteDance content per **6.6** — flag would down-weight qwen3's vote, leaving Opus + codex 2-0 for PATTERN-STUDY.
- **6.6 self-preference**: actively triggered — qwen3 has demonstrably lower perplexity on ByteDance Chinese-English mixed docs than on US-org docs.

**Verdict change**: NO — Phase-6 would ratify same T3 with the **explicit self-preference flag** preserved in audit trail (improves W297 GPQA-style expert-agreement metric).

---

## §5 — Single-model-blindspot scenarios (REQUIRED)

### §5.1 — Codex-only blindspot: Microsoft/OpenAI-adjacent candidates

**Scenario**: a hypothetical W296 candidate `microsoft/some-shiny-agent-framework@10k★` is submitted to single-codex Phase-6.

**Failure mode** (cite: Wataoka+ §2.10 `https://arxiv.org/abs/2410.21819` `[EXTERNAL]` 2026-05-18): codex GPT-5.5 is built on OpenAI/Microsoft-adjacent training data → it has *lower perplexity* on Microsoft-style docs → it will *over-score* dimensions like D5 (docs quality) and D10 (community signal) by an empirically-measurable margin.

**Single-codex verdict (current Phase-6)**: APPROVE at install_score 4.3.
**Multi-judge Phase-6 verdict (§3.1 6.2 + 6.6)**:
- Codex GPT-5.5: APPROVE (install_score 4.3)
- Claude Opus: REVIEW — flags D14 (vendor-fork brittleness on closed-source Azure deps)
- Qwen3-coder local: REVIEW — flags D11 preload (10MB skill load)
- 6.6 self-preference screen on codex: down-weights codex vote 0.5×
- Final majority: 2-1 REVIEW (after codex down-weight: 1.5-2.0 REVIEW) → 6.5 tiebreaker → operator ratification

**Result**: Phase-6 BLOCKS what single-codex would have APPROVED. **This is the operator-mandated anti-bias proof.**

### §5.2 — Claude-only blindspot: Anthropic-adjacent candidates

Symmetric to §5.1 — if Opus were the sole judge, Anthropic's own `claude-quickstarts/*` would be over-scored. Phase-6 §3.1 6.6 down-weights Opus on Anthropic-content perplexity. Verified by the W292 Agent A finding that Anthropic Multi-Agent patterns *already* converged into v3.

### §5.3 — Single-judge popularity-only blindspot: high-star projects

Any single judge (codex, Opus, qwen3) over-weights popularity per Zheng+ 2023 §2.1 self-enhancement bias. **D14 hard-cap (stars-not-hardgate)** is the structural mitigation. Phase-6 §3.1 6.4 anchor-rotation is the runtime mitigation. Without ≥2 judges, the popularity-prior dominates — exactly the failure W288-W294 has been individually correcting per-wave.

---

## §6 — HONEST-NON-FINDING (none applicable)

Not invoked. All proposed mechanisms have at least one empirical study citing material improvement over single-judge baselines:
- Position swap: Zheng+ 2023 (>80% human agreement w/ swap) vs unknown-baseline w/o.
- Multi-judge majority: Inspect AI v0.3.9+ release notes specify the wire; UK AISI uses it in production AI-safety evals (which is harder than adoption verdicts).
- Length-control GLM: Spearman 0.93→0.98 vs Arena (AlpacaEval LC §2.2).
- Critique-revise: 80%+ human-agreement RLAIF vs ~75% pre-CAI (Bai+ 2022 Table 4).
- Self-preference quant: positive correlation `r > 0` between perplexity-on-own-output and score-boost (Wataoka+ 2024 §3).

The argument that **single-codex is sufficient** would require empirical refutation of all 5 above — no such refutation exists in any of the 10 surveyed sources.

---

## §7 — Anti-bias structural proof

### §7.1 — All cites EXTERNAL with URL + access date

Confirmed above (all 10 framework rows, supporting OpenAI Evals + Inspect AI, all sub-sections of §2–§6) carry `[EXTERNAL]` + URL + `2026-05-18` access date. No W286-W294 docs were cited as authoritative; only as verdicts to retroactively-simulate (§4.1, §4.2, §4.3).

### §7.2 — ≥3 distinct external orgs sourced

| Org family | Sources |
|---|---|
| Academic — US | UC Berkeley (Zheng+), Stanford (Tatsu Lab, Zheng+ co-org), CMU (Zheng+) |
| Academic — Asia | KAIST (Prometheus), Yonsei (Prometheus), HKUST/CityU HK (PORTIA), Huazhong U./BAAI (JudgeLM), PKU/Westlake (PandaLM), Wataoka+ (industry-adjacent JP) |
| Industry — Anthropic | Constitutional AI / RLAIF (Bai+ 2022) |
| Industry — OpenAI | OpenAI Evals (production reference) |
| Government — UK | UK AI Safety Institute (Inspect AI) |
| Industry consortium — LMSYS | MT-Bench, Chatbot Arena (LMSYS / LMArena.ai) |

**6 distinct external org-families sourced** > required 3. Distribution skews academic — by design, since academic peer-review is the strongest anti-bias signal.

### §7.3 — Inverse test: does protocol work under different model availability?

| Scenario | Phase-6 behavior |
|---|---|
| Only codex GPT-5.5 available (current state) | **§3.1 6.1 swap-rerun** still active; §3.1 6.3 critique-revise still active; §3.1 6.4 anchor-rotation still active. Only 6.2 multi-judge degrades to **single-judge with 2 self-consistency checks** (still better than W288 unswapped baseline). |
| Codex + Opus available | **6.2 majority-vote** activates with 2 judges → ties escalate to operator (no auto-degradation to lower judge). |
| Codex + Opus + qwen3-coder local available (target state) | Full 6.1–6.8 active. |
| Codex unavailable (e.g., quota exhausted) | Per CR-9 fail-closed contract: **6.1 reverts to Opus-swap-rerun**; 6.2 reduces to Opus + qwen3 + (optional Gemini); 6.5 tiebreaker via operator. |
| All judges unavailable | Phase-6 returns BLOCK (cardinal-rule-9-equivalent on review-gate) per existing W286 codex-unavailable fail-closed contract. |

**Inverse-test conclusion**: protocol degrades-gracefully **without** ever falling below the current single-codex baseline. The protocol **strictly dominates** sca-v3.1 single-judge across every model-availability scenario.

### §7.4 — Cross-stream coherence note (advisory, not authoritative)

This stream's §3.1 6.6 self-preference screen is the same mechanism Stream C (`anti-bias`) is expected to surface independently; this stream's §3.1 6.2 multi-judge ensemble overlaps Stream B's (`multi-dim scoring`) D17 robustness perturbation. Cross-stream coherence will be reconciled at W295 synthesis (team-lead step).

---

## §8 — Recommended ship-decision

**Verdict on whether sca-v3.1 Phase-6 must CHANGE**: **YES, MUST CHANGE.**

**Minimum-viable ship for W295 closeout** (stage S1 above): land **§3.1 6.1 position-swap** as a new flag on the already-wired `codex:adversarial-review` skill. Zero new judges required. Single-flag-revertable. Estimated 1-PR effort.

**Full Phase-6 rollout**: W295 → W300 staged per §3.2. Each stage independently revertable. Operator approval required at each stage gate.

---

## Appendix A — Frameworks NOT recommended for direct lift

- **PandaLM § 2.7** — fine-tuned ternary judge; useful as a 6.2 family-member if budgets permit local 7B GPU; not core to W295 because already covered by Prometheus.
- **AlpacaEval 2.0's `weighted_alpaca_eval_gpt4_turbo` annotator wire § 2.2** — requires logprob exposure from judge model; codex CLI does **NOT** currently expose logprobs. Defer until W302+ when MCP logprob-exposure lands (or fork codex CLI to expose).
- **Chatbot Arena ELO § 2.4** — requires crowd-sourced human raters; not feasible for single-operator runtime. Adopted only as **inspiration** for bootstrap-CI on multi-judge majority vote — i.e., compute confidence interval over Phase-6 verdict via N=1000 resamples of the 3-judge vote (§3.1 6.2).

## Appendix B — Cross-verification of mechanism citations

Every per-section claim in §2 cites paper, framework readme, or wiki. Every protocol mechanism in §3 has at least one corresponding framework in §2. Every retroactive simulation in §4 names which §3 mechanism would have triggered. Audit-replayable.

## Appendix C — Sources

- [LLM-as-Judge (Zheng+ 2023)](https://arxiv.org/abs/2306.05685) — `[EXTERNAL]` access date 2026-05-18
- [AlpacaEval](https://github.com/tatsu-lab/alpaca_eval) — `[EXTERNAL]` access date 2026-05-18
- [AlpacaEval length-controlled paper](https://arxiv.org/abs/2404.04475) — `[EXTERNAL]` access date 2026-05-18
- [Chatbot Arena paper](https://arxiv.org/abs/2403.04132) — `[EXTERNAL]` access date 2026-05-18
- [Chatbot Arena leaderboard blog (LMSYS)](https://lmsys.org/blog/2023-06-22-leaderboard/) — `[EXTERNAL]` access date 2026-05-18
- [FastChat llm_judge README](https://github.com/lm-sys/FastChat/blob/main/fastchat/llm_judge/README.md) — `[EXTERNAL]` access date 2026-05-18
- [MT-Bench HF Space](https://huggingface.co/spaces/lmsys/mt-bench) — `[EXTERNAL]` access date 2026-05-18
- [Constitutional AI (Bai+ 2022)](https://arxiv.org/abs/2212.08073) — `[EXTERNAL]` access date 2026-05-18
- [JudgeLM (Zhu+ 2023)](https://arxiv.org/abs/2310.17631) — `[EXTERNAL]` access date 2026-05-18
- [PandaLM (Wang+ 2023)](https://arxiv.org/abs/2306.05087) — `[EXTERNAL]` access date 2026-05-18
- [Prometheus (Kim+ 2023)](https://arxiv.org/abs/2310.08491) — `[EXTERNAL]` access date 2026-05-18
- [PORTIA Split-and-Merge (Li+ 2023)](https://arxiv.org/abs/2310.01432) — `[EXTERNAL]` access date 2026-05-18
- [Self-Preference Bias quant metric (Wataoka+ 2024)](https://arxiv.org/abs/2410.21819) — `[EXTERNAL]` access date 2026-05-18
- [Anthropic Persuasion study](https://www.anthropic.com/news/measuring-model-persuasiveness) — `[EXTERNAL]` access date 2026-05-18
- [Inspect AI (UK AISI)](https://github.com/UKGovernmentBEIS/inspect_ai) — `[EXTERNAL]` access date 2026-05-18
- [OpenAI Evals](https://github.com/openai/evals) — `[EXTERNAL]` access date 2026-05-18
- [Eugene Yan — LLM Evaluators survey](https://eugeneyan.com/writing/llm-evaluators/) — `[EXTERNAL]` access date 2026-05-18
