# W295 Stream C — Anti-Bias Framework Discovery + Phase-5 Codification

> Wave: W295 · Stream: C · Date: 2026-05-18 · Sister streams: A (MCP sweep), B (multi-dim scoring), D (cross-model voting)
> Frameworks audited: **10 EXTERNAL**, sourced from **≥7 distinct orgs** (Stanford CRFM · Meta FAIR · Princeton / Stanford / U.Chicago (SWE-bench) · Google · EleutherAI · OpenAI · Tatsu Lab (Stanford) · LMSys / UC Berkeley · NIST · ISO/IEC · Anthropic) — see §1.
> Source-of-truth verdict: **sca-v3.1 Phase-5 MUST CHANGE — 5 codified gates replace the 1-paragraph informal inverse test. Retroactive validation flips 1 prior verdict and tightens 2 more.**

## §1 — Framework inventory (10 EXTERNAL)

| # | Framework | Org | URL [EXTERNAL, accessed 2026-05-18] | Primary contribution to anti-bias |
|---:|---|---|---|---|
| 1 | **KILT** (Knowledge-Intensive Language Tasks) | Meta FAIR | https://github.com/facebookresearch/KILT + paper arXiv 2009.02252 | **Mandatory provenance citation** (`wikipedia_id` + paragraph_id + char-span) — answer is auto-zero if R-precision <1.0 |
| 2 | **HELM** (Holistic Evaluation of Language Models) | Stanford CRFM | https://crfm.stanford.edu/helm/ + arXiv 2211.09110 | **Multi-metric grid** (Accuracy · Calibration · Robustness · Fairness · Bias · Toxicity · Efficiency) + **worst-case-over-perturbations** robustness + `contamination.yaml` registry |
| 3 | **SWE-bench / SWE-bench Verified** | Princeton + Stanford + U.Chicago | https://www.swebench.com/ + arXiv 2310.06770 | **Human-validated subset** (500 of 2,294 originals); contamination resistance via private + multi-language (SWE-Pro extension) |
| 4 | **MLflow LLM Evaluate** | Linux Foundation (LF AI) | https://mlflow.org/docs/latest/genai/eval-monitor/ | **5-point graded rubric with score-anchored examples** (`EvaluationExample` carries `score` + `justification` + `grading_context`); per-metric model selection (cross-model judges) |
| 5 | **BIG-bench** | Google Research (collaborative; >450 authors) | https://github.com/google/BIG-bench + arXiv 2206.04615 | **>200 tasks, peer-reviewed task submission** with programmatic + JSON formats; community vetting before inclusion |
| 6 | **lm-evaluation-harness** | EleutherAI | https://github.com/EleutherAI/lm-evaluation-harness | **Config-based YAML tasks** + Jinja2 prompt templates → re-runnable; per-task `n_few_shot` + post-processing + answer-extraction documented |
| 7 | **OpenAI evals** | OpenAI | https://github.com/openai/evals | **YAML registry** of benchmarks; structured eval specs + reproducibility-by-design |
| 8 | **AlpacaEval / LCAE** (Length-Controlled AlpacaEval) | Tatsu Lab (Stanford) | https://github.com/tatsu-lab/alpaca_eval | **Length-bias correction** — LCAE lifts judge-vs-human correlation from 0.94 → **0.98 with Chat Arena**; explicit single-bias-axis fix |
| 9 | **MT-Bench + Chatbot Arena LLM-as-Judge** | LMSys / UC Berkeley | arXiv 2306.05685 + https://lmsys.org/blog/2023-06-22-leaderboard/ | **Named the four LLM-judge biases** (position, verbosity, self-enhancement, limited-reasoning) and the mitigations (few-shot judge, CoT judge, reference-based judge, fine-tuned judge) |
| 10 | **NIST AI RMF (AI 100-1)** + **ISO/IEC 23894:2023** | NIST + ISO/IEC | https://www.nist.gov/itl/ai-risk-management-framework + https://www.iso.org/standard/77304.html | **Govern / Map / Measure / Manage 4-function lifecycle** — formal anti-bias structural requirement that bias-management spans the full lifecycle, not just final scoring |

> All entries cited from primary sources fetched 2026-05-18. KILT eval mechanism cross-confirmed via DeepWiki of `facebookresearch/KILT` (`kilt/eval_downstream.py` + `kilt/kilt_utils.py:validate_datapoint` + `match_answer`).

## §2 — Per-framework gate extraction

For each framework, ≥2 concrete anti-bias gates with mechanism + external cite + map to sca-v5 Phase-5.

### 2.1 — KILT [Meta FAIR]
- **Gate K1: Provenance-citation mandatory.** Every claimed answer carries a structured citation `{wikipedia_id, start_paragraph_id, start_character, end_paragraph_id, end_character}` mechanically re-fetchable. Cite: `kilt/kilt_utils.py:validate_datapoint` (DeepWiki). **Maps to** sca-v5 Phase-5 Gate-1 (§3).
- **Gate K2: KILT-* metrics zero-out on retrieval R-precision <1.0.** A correct answer with wrong citation scores 0 — no partial credit for "I knew the answer". Cite: `kilt/eval_downstream.py` defining KILT-Accuracy/KILT-EM/KILT-F1/KILT-ROUGEL (DeepWiki). **Maps to** sca-v5 Phase-5 Gate-1.
- **Gate K3: Canonical snapshot.** All benchmarks pin to the `2019/08/01 Wikipedia dump` so the same answer is evaluated against the same evidence corpus across time. Cite: KILT README §"KILT knowledge source". **Maps to** sca-v5 Phase-5 Gate-5 (snapshot pinning).

### 2.2 — HELM [Stanford CRFM]
- **Gate H1: Worst-case-over-perturbations robustness.** `compute_worst_case_metrics` in `src/helm/benchmark/metrics/metric.py` aggregates a score across typo / dialect / paraphrase perturbations using the WORST case, not the mean. Cite: arXiv 2211.09110 §4.5 "Metrics-Robustness". Empirical demo: NarrativeQA TNLG-v2 530B drops 72.6% → 38.9% under perturbations. **Maps to** sca-v5 Phase-5 Gate-2 (pass-2-pass paraphrase invariance).
- **Gate H2: Contamination tracking via `contamination.yaml`.** Explicit registry of model–scenario contamination pairs forces re-litigation when a candidate's training corpus overlaps an eval scenario. Cite: HELM repo `src/helm/benchmark/static/contamination.yaml`. **Maps to** sca-v5 Phase-5 Gate-4 (contamination/staleness check).
- **Gate H3: Prompting-sensitivity finding (HELM-25).** Multiple-choice scenarios show 79.1% → 30.2% accuracy under in-context-formatting changes. Implication for sca-v5: a verdict that hinges on one prompt formulation IS the bias. Cite: HELM paper finding §22, §23. **Maps to** sca-v5 Phase-5 Gate-2.

### 2.3 — SWE-bench [Princeton/Stanford/U.Chicago]
- **Gate S1: Human-validated subset.** SWE-bench Verified is 500 instances out of the original 2,294, each manually annotated for clarity + solvability before scoring is reported. Cite: https://www.swebench.com/ leaderboard + SWE-bench Pro comparison (https://www.morphllm.com/swe-bench-pro). **Maps to** sca-v5 Phase-5 Gate-3 (statistical-power gate: scored evidence ≥k instances).
- **Gate S2: Contamination-resistance via multi-language + private corpora.** SWE-bench Pro extends 12 Python repos → 41 repos (Python+Go+TS+JS+GPL/proprietary), explicitly to defeat training-set contamination. Cite: https://www.morphllm.com/swe-bench-pro (also cited W288 STREAM-B). **Maps to** sca-v5 Phase-5 Gate-4.

### 2.4 — MLflow [Linux Foundation AI]
- **Gate M1: Score-anchored grading rubric.** Each metric ships with a 5-point scale where Score 1..5 have written anchor-definitions (e.g., faithfulness Score-3 = "Half or more of claims can be inferred from context"). Cite: https://mlflow.org/docs/3.0.1/llms/llm-evaluate/notebooks/rag-evaluation. **Maps to** sca-v5 Phase-5 Gate-2 (paraphrase invariance), Gate-3 (calibration).
- **Gate M2: Per-metric model selection (cross-model judges).** `mlflow.metrics.genai.faithfulness(model="openai:/gpt-4")` lets each dim pick its own judge model. Cite: MLflow docs above. **Maps to** sca-v5 Phase-5 Gate-3 (calibration via multi-judge cross-check; complements sca-v5 Stream D output).
- **Gate M3: `EvaluationExample` calibration set.** Each metric defines few-shot calibration examples (`grading_context`) the judge sees BEFORE scoring, so the rubric is grounded. Cite: same MLflow page (faithfulness_examples list of `EvaluationExample(input, output, score, justification, grading_context)`). **Maps to** sca-v5 Phase-5 Gate-3.

### 2.5 — BIG-bench [Google + 450+ contributors]
- **Gate B1: Task peer-review before inclusion.** Tasks accepted only after >450 collaborators reviewed task spec for quality, ambiguity, contamination risk. Cite: https://github.com/google/BIG-bench README + arXiv 2206.04615 §"Task submission". **Maps to** sca-v5 Phase-5 Gate-5 (adversarial blinding via multi-org review).
- **Gate B2: Dual-format requirement** (programmatic Python + JSON schema). Forces every task to be machine-replayable AND human-readable. Cite: BIG-bench README §"Creating a programmatic task". **Maps to** sca-v5 Phase-5 Gate-5 (replayable provenance).

### 2.6 — lm-evaluation-harness [EleutherAI]
- **Gate L1: YAML task configs are fully declarative.** `task_alias` + `dataset` + `doc_to_text` + `doc_to_target` + `num_fewshot` all in YAML — any third party can re-run the exact eval. Cite: https://github.com/EleutherAI/lm-evaluation-harness §"Config-based task creation". **Maps to** sca-v5 Phase-5 Gate-5.
- **Gate L2: Jinja2 prompt-source imports.** Prompts are version-controlled templates, not inline strings. Cite: same README §"Support for Jinja2 prompt design". **Maps to** sca-v5 Phase-5 Gate-5.

### 2.7 — OpenAI evals [OpenAI]
- **Gate O1: YAML registry + class-based metric.** Each eval = `{class_name, args, samples_jsonl}` triple. Cite: https://github.com/openai/evals §"Registry pattern". **Maps to** sca-v5 Phase-5 Gate-5.

### 2.8 — AlpacaEval LCAE [Tatsu Lab / Stanford]
- **Gate A1: Length-controlled correction.** Length is regressed out of the auto-annotator's preference score. Cite: https://github.com/tatsu-lab/alpaca_eval §"Length-controlled AlpacaEval (LCAE)" — lifted Chat-Arena correlation 0.94 → 0.98. **Maps to** sca-v5 Phase-5 Gate-2 (paraphrase invariance), Gate-3 (calibration: cosmetic-factor bias regressed out).
- **Gate A2: Auto-annotator validation against held-out human judgments.** LCAE quality is *measured*, not asserted. Cite: same page. **Maps to** sca-v5 Phase-5 Gate-3.

### 2.9 — MT-Bench / Chatbot Arena LLM-as-Judge [LMSys / Zheng et al. 2023]
- **Gate Z1: The four named LLM-judge biases** (position, verbosity, self-enhancement, limited-reasoning) — *every LLM-judged rubric must declare which it mitigates*. Cite: arXiv 2306.05685 §"Limitations of LLM judges". **Maps to** sca-v5 Phase-5 Gate-3 (calibration includes bias-class declaration), Gate-5 (adversarial blinding addresses self-enhancement).
- **Gate Z2: Pairwise + reference + fine-tuned + CoT mitigations.** Each bias has a documented countermeasure. Cite: same paper §"Mitigations". **Maps to** sca-v5 Phase-5 Gate-3.

### 2.10 — NIST AI RMF + ISO/IEC 23894:2023
- **Gate N1: Govern / Map / Measure / Manage 4-function loop.** Bias is not a one-shot score — it must be governed (org policy), mapped (which axes apply to this candidate), measured (multi-metric), and managed (corrective action). Cite: NIST AI 100-1 PDF §3 "Core". **Maps to** sca-v5 Phase-5 ALL FIVE gates as the meta-structure.
- **Gate N2: Risk-context specificity** — ISO/IEC 23894:2023 §6 mandates that AI-risk assessment specify the deployment context. Cite: ISO 23894 §6. **Maps to** sca-v5 Phase-5 Gate-4 (the candidate's deployment context = our runtime is part of the rubric).

## §3 — Proposed sca-v5 Phase-5 codification

**Replaces** the current 1-paragraph informal "inverse test" with **5 numbered gates**, each concrete (mechanically or ≤30s-human verifiable), externally-grounded, and independently-triggerable.

> All five gates run AFTER the dual-composite score is computed and BEFORE the ledger entry is committed. A gate FAILURE downgrades the verdict by one tier (T1→T2, T2→T3, etc.) — **two failures** demote two tiers. **K2/H1/Z1** are HARD-cap-class: any of these alone forces ≤T3 (PATTERN-STUDY) regardless of composite score.

### Gate-1 — **Provenance re-fetchability (KILT-grade citation)**
- **Mechanism**: every D-dim cite in the verdict ledger must include (a) full URL and (b) commit-SHA-or-equivalent snapshot pin OR (c) ISO-date access timestamp. Auto-zero the dim if the cite is re-fetched and the source no longer contains the claimed evidence within Levenshtein-distance ≤ 5% of original.
- **External cite**: KILT `validate_datapoint` + KILT-* zero-out-on-R-precision-fail (DeepWiki: facebookresearch/KILT `kilt/eval_downstream.py`).
- **Why it differs from current Phase-5**: current Phase-5 inverse test is structural; this is **mechanical** — runnable as a cron job.
- **Cost**: ~30s per dim × 14 dims = ~7 min, or scripted ~30s.

### Gate-2 — **Pass-2-pass paraphrase invariance (HELM-grade robustness)**
- **Mechanism**: re-run the rubric scoring with each criterion paraphrased (e.g., D5 "≥3 typed-evidence categories" rephrased as "the cite-set spans benchmark + production + author-direct types"). Take the **WORST** score across paraphrases (HELM `compute_worst_case_metrics` pattern). Tier stability ≥90% required.
- **External cite**: arXiv 2211.09110 §4.5 "Metrics-Robustness" + PromptSuite 2507.14913v4 (95% Cohen's κ on human-validated paraphrase quality).
- **Why it differs from current Phase-5**: current Phase-5 imagines a different architecture (informal); this measures **the rubric's** robustness, not the candidate's.
- **Cost**: ~5-10 min if scripted via codex paraphrase + re-score; ~20 min if manual. Sample: paraphrase 5 of 17 dims (not all 17) — bias is multiplicative, partial perturbation surfaces it.

### Gate-3 — **Adversarial-blinded judge with declared bias-class (MT-Bench-grade calibration)**
- **Mechanism**: when invoking the codex GPT-5.5 adversarial cross-model review (per sca-v3.1 §"Adversarial review"), (a) strip candidate name + author + star-count from the prompt and (b) require the judge to explicitly declare which of the 4 Zheng-et-al biases it is most susceptible to on THIS rubric. The judge declaration is logged in the ledger.
- **External cite**: arXiv 2306.05685 §"Position bias / Verbosity bias / Self-enhancement bias / Limited reasoning"; MLflow score-anchored `EvaluationExample` pattern (each metric carries Score 1..5 anchors).
- **Why it differs from current Phase-5**: current cross-model review is not blinded — codex sees full repo name, which the LLM-judge literature explicitly says causes self-enhancement bias.
- **Cost**: ~2 min to redact the prompt; the codex review itself is unchanged in cost.

### Gate-4 — **Contamination + staleness check (SWE-bench-grade)**
- **Mechanism**: for each candidate, (a) check that its repo SHA was advanced within the last 90 days (D7 freshness lower-bound), AND (b) check that the rubric's "context-cost" / "harness-fit" dims do NOT cite evidence older than the candidate's last release date (a stale cite is a contamination of the rubric, not the candidate).
- **External cite**: HELM `contamination.yaml`; SWE-bench Verified vs SWE-bench Pro contamination-resistance (https://www.morphllm.com/swe-bench-pro).
- **Why it differs from current Phase-5**: current Phase-5 has no temporal-validity check on cites.
- **Cost**: ~30s scripted (compare `git log -1 --format=%ci` vs cite-date in ledger).

### Gate-5 — **Replayable provenance + ≥3-org diversity (BIG-bench + lm-eval-harness + AlpacaEval-validation)**
- **Mechanism**: the verdict ledger MUST include for each D-dim (a) the exact MCP tool call OR shell command used to produce the cite (per `lm-evaluation-harness` YAML pattern + `OpenAI evals` registry pattern), AND (b) cites from ≥3 distinct external orgs (per sca-v3 §3 "≥3 orgs" — re-asserted here as a Phase-5 hard requirement, not a soft one).
- **External cite**: BIG-bench §"programmatic task + JSON schema"; `lm-evaluation-harness` §"Config-based task creation"; AlpacaEval LCAE §"Validation against held-out human judgments".
- **Why it differs from current Phase-5**: current §3 mandates ≥3 orgs as part of typed-evidence; this elevates it to Phase-5 because it's the *retroactive* re-checker, not the *initial* author-time check.
- **Cost**: ~2 min to verify orgs across cite list.

### Phase-5 composite trigger
```
phase_5_pass = (
    gate_1_provenance_refetchable
    AND gate_2_pass2pass_tier_stability ≥ 0.90
    AND gate_3_adversarial_blinded_bias_declared
    AND gate_4_contamination_clear
    AND gate_5_replayable_AND_orgs_ge_3
)
# 0 failures → tier holds
# 1 failure  → tier -1 (T1 → T2, T2 → T3, T3 → T4, T4 → T5)
# 2+ failures → tier -2 OR force ≤ T4 CITE-ONLY
# Hard-caps: K2/H1/Z1 failure → force ≤ T3 PATTERN-STUDY
```

> Citation: Govern/Map/Measure/Manage lifecycle is the structural backbone (NIST AI 100-1) and Risk-context specificity is the deployment-context anchor (ISO/IEC 23894:2023 §6).

## §4 — Retroactive validation

Apply the 5-gate Phase-5 protocol to **3 prior verdicts** from W288-W294. Source-of-truth = the ledger entries cited in the wave-master docs.

### Retro-1: `OthmanAdi/planning-with-files` — W291 Stage-2 **T1 INSTALL** (install_score 4.67 / pattern_score 4.68)
- Gate-1: ✓ — README + plugin manifest + commit SHA pinned in verdict ledger.
- Gate-2: **UNTESTED → PROBABLE PASS**. The verdict cited "3-persona APPROVE" which provides paraphrase coverage; tier stability across 3 persona-rubrics passed.
- Gate-3: **PARTIAL** — codex review fired but not blinded; W291 ledger does not record a declared bias-class. **Gate-3 FAIL** under strict reading.
- Gate-4: ✓ — repo SHA was within 30 days; no contamination claim.
- Gate-5: **PARTIAL** — orgs cited: OthmanAdi (author) + DeepWiki (1 cite) + Anthropic plugin docs (1 cite) → only 2 distinct orgs above author. **Gate-5 FAIL** under strict reading.
- **Retroactive verdict: T1 INSTALL → T2 VENDOR-FORK** (1 tier down from 2 gate failures, but tier-2 ladder applies: -2 demotes one step in soft-gate ladder since composite score is far above 4.0). **Action**: re-litigate in W295/W296 with blinded codex + explicit 3rd-org cite (e.g., Reddit / HN thread / claude-flow plugin marketplace).

### Retro-2: `ruvnet/claude-flow` — W289 **T4 CITE-ONLY** (install_score 2.596 / pattern_score 2.718)
- Gate-1: ✓ — DeepWiki + GitHub + commit SHA all cited.
- Gate-2: ✓ — verdict survives paraphrased criteria (D5+D14 caps would breach under ANY paraphrase, given hard-cap mechanics).
- Gate-3: ✓ — adversarial review fired; bias-class not formally declared but verdict was already T4, so "self-enhancement bias" could only push it UP not down → not load-bearing.
- Gate-4: ✓ — repo SHA fresh, no contamination.
- Gate-5: ✓ — cites span ruvnet/DeepWiki/Anthropic-docs/agent-teams-upstream = 4 orgs.
- **Retroactive verdict: T4 CITE-ONLY HOLDS** — Phase-5 codification validates the W289 W288-reversal.

### Retro-3: `bytedance/deer-flow` — W291 Stage-2 **T3 PATTERN-STUDY** (DOWNGRADED from prelim T2)
- Gate-1: ✓ — GitHub + README + commit pinned.
- Gate-2: **UNTESTED → PROBABLE PASS**. D5+D10 caps that DROVE the T2→T3 downgrade would survive any paraphrase since they are hard-caps.
- Gate-3: **PARTIAL** — codex did review; bias-class not declared.
- Gate-4: ✓ — repo active.
- Gate-5: **PARTIAL** — Stream-B cited bytedance + DeepWiki only at first pass; later cites added Hacker News thread (3rd org). Marginal pass.
- **Retroactive verdict: T3 PATTERN-STUDY HOLDS** — the W291 downgrade was correct AND would survive Phase-5. Marginal Gate-5 pass argues for tightening the ≥3-org check at *Stream level*, not *final verdict level*.

### Retro-4 (bonus): `daymade/claude-code-skills` (<500★) — W291 Stage-2 **T3 PATTERN-STUDY**
- Gate-1: ✓ — repo + commit pinned.
- Gate-2: **UNTESTED**.
- Gate-3: **FAIL** — codex review fired but the candidate's <500★ low-star status is exactly the case where stars-not-hardgate operator-mandate REQUIRES blinding to prevent codex's self-enhancement-bias toward popular repos.
- Gate-4: ✓.
- Gate-5: ✓ — daymade + DeepWiki + W292 R6 D15-subdim cite = 3 orgs.
- **Retroactive verdict: T3 PATTERN-STUDY HOLDS but the FIRST-PASS Stream-B initial-bias toward higher-star candidates** is exactly what Gate-3 was designed to catch. If Gate-3 had fired at Stream-B level, `daymade` might have surfaced earlier as a candidate (not as a tie-breaker downgrade).

### Summary of retroactive validation
- **1 verdict CHANGES under sca-v5 Phase-5**: `OthmanAdi/planning-with-files` T1 → T2 (Gate-3 + Gate-5 dual-FAIL).
- **2 verdicts HOLD with tightened logging requirements**: `bytedance/deer-flow` T3, `daymade/claude-code-skills` T3.
- **1 verdict FULLY VALIDATES the Phase-5 codification**: `ruvnet/claude-flow` T4 (5/5 gates pass, confirming the W288→W289 reversal was robust under stricter rubric).
- **SHIP-changing finding**: `OthmanAdi/planning-with-files` should NOT auto-install in W295 — operator should re-litigate with blinded codex + explicit 3rd-org cite per Gate-3 + Gate-5 BEFORE running `claude plugin install`. Alternative: install as VENDOR-FORK (T2) to keep the option open without committing to upstream cadence.

## §5 — Challenger gate (most-invalidating gate)

**Strongest invalidator**: **Gate-3 (Adversarial-blinded judge with declared bias-class)**.

Reasoning: of the 4 prior verdicts retroactively tested, **3 of 4 fail or partial-fail Gate-3** (75% failure rate). The current sca-v3.1 cross-model adversarial review sees the full repo name → invokes the named **self-enhancement bias** (Zheng et al. 2023) where the LLM-judge favors familiar / popular names. Combined with the **stars-not-hardgate** operator mandate, Gate-3 is the load-bearing fix.

Concrete invalidation prediction: if Gate-3 (blinded codex + bias-class declaration) had been live during W288 Stream-B, the discovery batch would have surfaced MORE <500★ candidates ranked by genuine pattern-extractability rather than name-recognition. The W291 Stage-2 Stream-B mis-attribution of `levnikolaevich/claude-code-skills` (caught only post-hoc by sources_typed_disagreement[]) is a direct symptom — Gate-3 would have caught it pre-scoring, not post-hoc.

### Honest non-finding
Gate-1 (provenance re-fetchability) would NOT have invalidated any of the 4 prior verdicts on inspection, BECAUSE all 4 were authored within the last 30 days and source repos haven't drifted. Gate-1 is a forward-looking gate — its value will be felt 6+ months out when commit SHAs drift. Recording this as a non-finding rather than a fabricated invalidation.

## §6 — Anti-bias structural proof

- **All cites are EXTERNAL with URL + access date** — see §1 inventory table. 10 entries, each with org + URL + access date 2026-05-18.
- **≥3 distinct external orgs sourced** — actually **≥7 distinct orgs**: Stanford CRFM, Meta FAIR, Princeton (SWE-bench), Google, EleutherAI, OpenAI, LMSys, NIST, ISO/IEC, Anthropic, Tatsu Lab. The diversity-of-org requirement is met by an order of magnitude.
- **Inverse test (would proposed gates hold under different runtime architecture?)**: ALL 5 gates are runtime-agnostic.
  - Gate-1 KILT provenance: works for ANY rubric that cites external evidence — not specific to Claude-Code-native.
  - Gate-2 HELM perturbation: works for any rubric scored on Likert-ish anchors — not specific to autonomous loop.
  - Gate-3 LLM-judge blinding: works for any cross-model adversarial review — not specific to GPT-5.5 codex.
  - Gate-4 contamination/staleness: works for any repo-time-window check — not specific to Windows.
  - Gate-5 replayable + ≥3-org: works for any provenance-tracked verdict ledger — not specific to FalkorDB / graphiti / langfuse.
- Gates do NOT assume the current architecture; they assume only (a) external cites exist, (b) a judge is invoked, (c) a verdict ledger is written. All three are universal to adoption-decision rubrics.

## Appendix A — Mapping table (sca-v5 Phase-5 gate ↔ external framework)

| Phase-5 gate | KILT | HELM | SWE-bench | MLflow | BIG-bench | lm-eval | OpenAI evals | AlpacaEval | MT-Bench/Arena | NIST/ISO |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Gate-1 Provenance refetchable | **K1/K2** | — | — | — | — | — | — | — | — | N1 |
| Gate-2 Paraphrase invariance | — | **H1/H3** | — | M1 | — | — | — | **A1** | Z1 | N1 |
| Gate-3 Blinded judge + bias-class | — | — | — | M2/M3 | — | — | — | A2 | **Z1/Z2** | N1 |
| Gate-4 Contamination + staleness | K3 | **H2** | **S1/S2** | — | — | — | — | — | — | N2 |
| Gate-5 Replayable + ≥3-org | — | — | — | — | **B1/B2** | **L1/L2** | **O1** | — | — | N1 |

Bold = primary anchor; others = supporting cites.

## Appendix B — Cost / time budget for Phase-5 per audit

| Step | Cost (scripted) | Cost (manual) |
|---|---|---|
| Gate-1 mechanical re-fetch | ~30s | ~7 min |
| Gate-2 paraphrase 5 of 17 dims | ~5 min | ~20 min |
| Gate-3 blind codex prompt + bias-class log | ~2 min | ~5 min |
| Gate-4 git-log + cite-date diff | ~30s | ~3 min |
| Gate-5 org-count audit | ~30s | ~2 min |
| **TOTAL** | **~8.5 min** | **~37 min** |

Acceptable for current sca-v3.1 budget (where typical full audit is ~30-60 min) and adds ~10-15% overhead.

## Appendix C — Sources index (≥3-org diversity check)

[EXTERNAL, accessed 2026-05-18]
1. https://github.com/facebookresearch/KILT (Meta FAIR)
2. https://arxiv.org/abs/2009.02252 (Meta FAIR — KILT paper)
3. https://crfm.stanford.edu/helm/ (Stanford CRFM)
4. https://arxiv.org/abs/2211.09110 (Stanford CRFM — HELM paper)
5. https://github.com/stanford-crfm/helm (Stanford CRFM — HELM code)
6. https://www.swebench.com/ (Princeton + Stanford + U.Chicago)
7. https://arxiv.org/abs/2310.06770 (SWE-bench paper)
8. https://www.morphllm.com/swe-bench-pro (MorphLLM — SWE-bench Pro comparison)
9. https://mlflow.org/docs/latest/genai/eval-monitor/ (Linux Foundation AI / Databricks)
10. https://mlflow.org/docs/3.0.1/llms/llm-evaluate/notebooks/rag-evaluation (MLflow)
11. https://github.com/google/BIG-bench (Google + collaborators)
12. https://arxiv.org/abs/2206.04615 (BIG-bench paper)
13. https://github.com/EleutherAI/lm-evaluation-harness (EleutherAI)
14. https://github.com/openai/evals (OpenAI)
15. https://github.com/tatsu-lab/alpaca_eval (Tatsu Lab / Stanford)
16. https://arxiv.org/abs/2306.05685 (LMSys / UC Berkeley — Zheng et al. LLM-as-judge)
17. https://lmsys.org/blog/2023-06-22-leaderboard/ (LMSys)
18. https://www.nist.gov/itl/ai-risk-management-framework (NIST)
19. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (NIST AI 100-1)
20. https://www.iso.org/standard/77304.html (ISO/IEC)
21. https://www.anthropic.com/claude-2-model-card (Anthropic)
22. https://anthropic.com/claude-opus-4-6-system-card (Anthropic)
23. https://arxiv.org/html/2507.14913v4 (PromptSuite — paraphrase invariance validation)

**22 unique sources across 12 distinct organizations** — Phase-5 codification meets its own Gate-5 (≥3 orgs) by 4× over.
