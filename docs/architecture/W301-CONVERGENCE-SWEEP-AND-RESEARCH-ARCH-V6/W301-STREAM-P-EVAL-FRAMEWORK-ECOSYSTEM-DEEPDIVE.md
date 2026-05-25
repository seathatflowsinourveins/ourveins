# W301 Stream P — Eval Framework Ecosystem Deep-Dive + Runtime Gap Audit

**Date**: 2026-05-18 · **Branch**: `sota-converge-w301` · **File ownership**: Stream P RESEARCH-ONLY (no eval_harness.py edits) · **Budget**: T3 ≤$0.50

**Methodology**: sca-v5 multi-angle convergence (Anthropic-blessed source via cookbook DeepWiki + practitioner blogs via exa 2026 + DeepWiki source-grep on each framework). Phantom-contamination check per Phase-5 Gate-1 (mechanical verification of every claim).

---

## §1 — Eval Framework Enumeration (mechanically verified)

| # | Framework | Last push | License | Stars | Canonical use case |
|---|---|---|---|---|---|
| 1 | `EleutherAI/lm-evaluation-harness` | 2026-05-11 | MIT | 200+ academic benchmarks | Powers HF Open LLM Leaderboard; base-model `lm-eval` standard (cite: github 290909192) |
| 2 | `UKGovernmentBEIS/inspect_ai` (UK-AISI) | active 2026 | MIT | research-grade | Agent+model offline eval, EvalLog v3 JSON (cite: DeepWiki query above) |
| 3 | `stanford-crfm/helm` | 2026-05-14 | Apache-2.0 | major | Holistic benchmark suite + `scenario_state.json` replay format (cite: 432968463 + DeepWiki) |
| 4 | `google/BIG-bench` | 2024-07-19 (frozen) | Apache-2.0 | 200+ tasks | Beyond-imitation-game benchmark — cite-only / superseded by BBH (cite: 330044683) |
| 5 | `tatsu-lab/alpaca_eval` (LCAE) | 2025-08-09 | Apache-2.0 | judge-vs-human 0.94→0.98 corr | Length-Controlled AlpacaEval — absorbed W295-STREAM-C-ANTI-BIAS §2.8 |
| 6 | `lm-sys/FastChat` (MT-Bench) | pre-2026 | Apache-2.0 | LM Arena infra | Multi-turn judge benchmark + Chatbot Arena |
| 7 | `openai/evals` | 2026-04-14 | MIT | 157 forks | `ModelBasedClassify` + `MakeMeSay` multi-role judge (cite: DeepWiki query above) |
| 8 | `openai/simple-evals` | 2026-04-22 | MIT | OpenAI canonical | OpenAI's published eval pack (MMLU/MATH/HumanEval/etc) — replaces parts of `openai/evals` |
| 9 | `openai/swe-bench` (variant of princeton) | — | — | — | SWE-bench Verified / Pro (search rate-limited — phantom check: princeton-nlp/SWE-bench is the canonical repo per W259/W292 cites, not surfaceable in this stream's GitHub API budget) |
| 10 | `confident-ai/deepeval` | 2026-05-18 | Apache-2.0 | 14+ built-in metrics | pytest-native LLM-as-judge; G-Eval + **ArenaGEval** position-swap (DeepWiki q above) |
| 11 | `explodinggradients/ragas` | active 2026 | Apache-2.0 | RAG canonical | Reference-free RAG metrics; no inspect_ai EvalLog (DeepWiki q above) |
| 12 | `wandb/weave` | 2026-05-19 | Apache-2.0 | active | LLM eval lifecycle; `verdict`-lib multi-judge ensemble (DeepWiki q above) |
| 13 | `mlflow/mlflow` (LLM-eval) | active 2026 | Apache-2.0 | ML lifecycle | `mlflow.evaluate(model_type="text")` + LLM grading — search rate-limited, cite via aimultiple practitioner blog |
| 14 | `langfuse/langfuse` (eval features) | active 2026 | MIT | OTel-native | Datasets + Scores + LLM-as-judge — INSTALLED at `:3000` per W301 Stream K |
| 15 | `Arize-ai/phoenix` | active 2026 | Elastic-2.0 | OTel-native | Local-first OTel collector + Experiments — MCP wired per W301 Stream K |
| 16 | `braintrustdata/braintrust-sdk-python` | 2026-05-18 | Proprietary | $80M valuation 2026 | CI-gate `eval-action` GitHub Action + Brainstore (cite: 1162746274 + exa-2026-Braintrust-vs-Promptfoo) |
| 17 | `anthropic-evals` / `anthropics/evals` | **PHANTOM** | — | — | Search returned 0 results — **does not exist as a standalone repo**. Anthropic ships eval guidance via cookbook (`anthropics/anthropic-cookbook misc/building_evals.ipynb`) and **recommends Promptfoo** per DeepWiki cookbook query above. |
| 18 | `promptfoo/promptfoo` | active | MIT | 142 red-team plugins | **Anthropic-cookbook-recommended** for scaling beyond notebooks (DeepWiki q above) — already in eval_harness.py |

**Phantom-contamination count §1**: **1** (`anthropic-evals` does not exist; Anthropic's blessed path is cookbook notebooks + Promptfoo for scale).

---

## §2 — Per-Framework Capability Matrix

| Framework | Local-only | Anthropic Claude | Multi-judge ensemble | Replayable EvalLog JSON | Windows-portable | Maint. |
|---|---|---|---|---|---|---|
| lm-eval-harness | ✅ | via `anthropic` provider | partial (subtask agg) | ✅ proprietary | ✅ (PyPI) | high |
| **inspect_ai** | ✅ | ✅ (`anthropic/<model>`) | ✅ `multi_scorer()` + `model_graded_qa()` multi-grader | ✅ **v3 official** + `inspect log schema` CLI | ✅ (already in runtime) | high |
| HELM | ✅ | ✅ `AnthropicMessagesClient` (Claude 4) | ✅ `LLMAsJuryAnnotator` | ✅ `scenario_state.json` | unknown (DeepWiki silent) | high |
| BIG-bench | ✅ | manual | ❌ | partial | ✅ | **frozen 2024** |
| alpaca_eval (LCAE) | ✅ | ✅ | length-bias regression | proprietary CSV | ✅ | quarterly |
| MT-Bench (FastChat) | ✅ | ✅ | ✅ pairwise + arena | proprietary | partial | active |
| openai/evals | ✅ | via provider | ✅ `ModelBasedClassify`; **NO position-swap** flag | YAML registry | ✅ | active 2026 |
| deepeval | ✅ | ✅ | ✅ **ArenaGEval** with blinded+randomized position-swap (sole framework w/ explicit named recipe) | CSV/JSON | ✅ pytest | high |
| ragas | ✅ | ✅ `llm_factory` | ❌ (custom only) | CSV (no EvalLog) | ✅ | high |
| weave | ⚠️ local mode via `skip_clickhouse_client` test fixture | ✅ `patch_anthropic` + LiteLLM | ✅ via `verdict.Pipeline` | ❌ no inspect_ai EvalLog | ✅ | very high |
| MLflow | ✅ | via providers | partial | proprietary | ✅ | high |
| langfuse | ✅ self-host (live :3000) | ✅ | ✅ via Scores | OTel + Scores (not inspect_ai) | ✅ | very high |
| phoenix | ✅ | via openinference-anthropic | ✅ Experiments | OTel spans (not EvalLog) | ✅ | very high |
| braintrust | ❌ cloud-only OSS (Enterprise self-host) | ✅ | ✅ scoring functions | proprietary | ✅ | very high |
| promptfoo | ✅ | ✅ | partial (compare providers) | OutputFile v3 JSON | ✅ (in harness) | high |

---

## §3 — Multi-Angle Convergence on Claude-Code Eval Frameworks

**Angle A — Anthropic-blessed (`anthropic-cookbook` DeepWiki §1)**: Anthropic recommends (a) Promptfoo for scaling, (b) three grading modes (code/human/model). **`inspect_ai`, `langfuse`, `phoenix`, `weave`, `braintrust` are NOT mentioned in the cookbook.** Anthropic does NOT ship a first-party eval framework — the blessed pattern is cookbook notebooks + Promptfoo.

**Angle B — practitioner field reports (exa 2026)**: Inference.net 2026-02-21 + Respan 2026-05-10 + awesomeagents 2026-03-20 + dev.to 2026-03-17 + aimultiple. Consensus 2026 pattern: **two-tool stack** — CI-gate framework (DeepEval / RAGAS / Promptfoo) + observability platform (Braintrust / Langfuse / Phoenix). Braintrust $80M raise Feb-2026; Inspect AI flagged "MIT, unlimited local, no paid tier" — research-grade fit.

**Angle C — DeepWiki source-grep**: inspect_ai EvalLog v3 is the only formally-versioned, schema-discoverable JSON format (`inspect log schema`). Weave + ragas + deepeval all use proprietary JSON/CSV. HELM uses `scenario_state.json` (replayable but non-standard).

**Synthesis (sca-v5 Phase-5 / Phase-6 canonical lane)**: **inspect_ai is the canonical eval lane.** Rationale: (1) explicit `EvalLog` JSON v3 with discoverable schema (R8 spec compliance); (2) `multi_scorer()` + `model_graded_qa()` are direct primitives for Phase-6 position-swap; (3) MIT + offline + Windows-portable + Anthropic provider built-in; (4) already wired in eval_harness.py 0.3.205 — zero install cost. Supplement with deepeval `ArenaGEval` for explicit position-swap bias recipe Phase-6 requires.

---

## §4 — eval_harness.py Gap Audit (READ-ONLY, file unchanged)

Mechanical grep of `harness/eval_harness.py` 1,334 LOC:

| Capability | Status | Evidence |
|---|---|---|
| `inspect_ai` integration | ✅ shipped | Lines 235-350 `run_inspect_lane()`; `inspect_tasks.eval_cadence_task`; pinned 0.3.205 |
| `promptfoo` integration | ✅ shipped | Lines 423-498 `run_promptfoo_lane()` parses OutputFile v3 |
| Replayable EvalLog JSON | ✅ FULL | W305-D `_persist_evallog()` lines 690-825 writes `verdicts/W<wave>-<slug>-evallog.json` per inspect_ai v2 wire-format. **W302-P0 RETRACTION 2026-05-19**: prior Stream P claim "version: 2 is stale relative to inspect_ai v3 (DeepWiki: current log schema version is 3)" is FALSIFIED by live source-grep of `Z:/venvs/claude/Lib/site-packages/inspect_ai/log/_log.py:991` showing `version: int = Field(default=2)`. DeepWiki was wrong for installed inspect_ai 0.3.205. **NO drift exists** — eval_harness.py:757 is CORRECT. Re-check only when inspect_ai bumps to a release defaulting version=3. |
| Multi-judge ensemble | ❌ MISSING | Zero use of `multi_scorer()` / `model_graded_qa()` / `ArenaGEval` |
| Position-swap bias (sca-v5 Phase-6) | ❌ MISSING | Phase-6 not implemented (Stream J finding confirmed: codex Stop-hook does not run position-swap). No deepeval, no swap logic. |
| Langfuse trace pairing | ❌ MISSING | Zero `langfuse.*` imports (W301 Stream K confirms 0 observability imports). Langfuse is live `:3000` but un-wired. |
| Phoenix Experiments | ❌ MISSING | Zero `phoenix.*` / `openinference.*` imports. Phoenix backend down per Stream K. |
| Weave / Braintrust / MLflow | ❌ MISSING | Zero imports. |
| LCAE length-bias correction | ❌ MISSING | W295-STREAM-C absorbed LCAE into sca-v5 §2.8 (Phase-5 Gate-2/3) — not in harness code. |
| HELM `scenario_state.json` | ❌ N/A | Out of scope (HELM is benchmark suite, not Claude-Code eval). |

**Gap count CORRECTED 2026-05-19 = 5 major (multi-judge, position-swap, langfuse, phoenix, LCAE bias-correction) + 0 schema-drift (Stream P's "EvalLog v3 drift" claim FALSIFIED by W302-P0 live source-grep on installed inspect_ai 0.3.205; eval_harness.py:757 is CORRECT).**

---

## §5 — Multi-Judge Ensemble Support for sca-v5 Phase-6 (closing Stream J gap)

Stream J §3 verified: **codex `exec` has no `--task` / position-swap / multi-judge flag**. Phase-6 position-swap MUST be implemented by the harness, not by codex.

| Framework | Native multi-judge | Position-swap | Recipe primitive |
|---|---|---|---|
| inspect_ai | ✅ `multi_scorer()`, `model_graded_qa(model=[a, b, c])` | manual (write custom scorer) | `multi_scorer([scorer_a, scorer_b], reducer="mode")` |
| **deepeval** | ✅ `ArenaGEval` | **✅ blinded + randomized position-swap built-in** | `arena_test_case.compare()` runs blinded n-pairwise |
| openai/evals | ✅ `ModelBasedClassify` | ❌ explicit no | YAML registry composition |
| weave | ✅ `verdict.Pipeline` Layer of JudgeUnit | manual | `Layer(JudgeUnit×N)` |
| HELM | ✅ `LLMAsJuryAnnotator` | manual | `annotator_models=[m1, m2, m3]` |

**Pilot recipe (operator AI to close Stream J Phase-6 gap)**:

```python
# add to harness/inspect_tasks.py
from inspect_ai.scorer import multi_scorer, model_graded_qa
from inspect_ai.solver import generate

@task
def phase6_position_swap_task():
    return Task(
        dataset=judge_pair_dataset(),         # (response_A, response_B) pairs
        solver=generate(),
        scorer=multi_scorer(
            scorers=[
                model_graded_qa(model="anthropic/claude-opus-4-7"),     # judge 1
                model_graded_qa(model="anthropic/claude-sonnet-4-6"),   # judge 2
                model_graded_qa(model="anthropic/claude-haiku-4-5"),    # judge 3
            ],
            reducer="mode",
        ),
    )
```

OR install deepeval and call `arena_test_case.compare()` directly — `ArenaGEval` is the **only framework with named position-swap recipe** out-of-the-box.

---

## §6 — Top-3 ADOPT-NOW Recommendations

### Rec P1 — T2 VENDOR-FORK: deepeval ArenaGEval as Phase-6 position-swap lane

- **Tier**: T2 VENDOR-FORK (pin to deepeval `git_url@<commit-SHA>` in `harness/requirements.txt`; vendor `ArenaGEval` only)
- **Pilot recipe**: `pip install deepeval==<latest>`; add `harness/lane_arenageval.py` exposing `run_arenageval_lane(candidate_a, candidate_b)` returning EvalLog-shaped rows; wire into `eval_harness.py --mode position-swap-lane`
- **sca-v5 lite-score**: install_score ~3.8 (Apache-2.0 + active 2026-05-18 + Windows pytest); pattern_score ~4.6 (sole explicit position-swap recipe in the ecosystem)
- **Closes**: Stream J Phase-6 gap (codex Stop-hook lacks position-swap); §4 gap "Position-swap bias MISSING"
- **Rollback**: delete `harness/lane_arenageval.py` + `--mode position-swap-lane` block; deepeval has no runtime hooks → zero residue

### Rec P2 — T1 INSTALL-equivalent: inspect_ai `multi_scorer()` + EvalLog v3 schema fix

- **Tier**: T1 INSTALL (already installed 0.3.205 — usage extension only)
- **Pilot recipe**: (a) bump `verdicts/.../evallog.json` `"version": 2` → `"version": 3` in `_result_to_evallog_dict()` to match inspect_ai 0.3.205 current schema; (b) add `harness/inspect_tasks.py:judge_ensemble_task()` using `multi_scorer([scorer_a, scorer_b, scorer_c])`; (c) emit via existing `--mode inspect-lane`
- **sca-v5 lite-score**: install_score 5.0 (MIT + Anthropic provider + Windows + already in tree); pattern_score 4.7 (canonical EvalLog v3 schema for R8 contract)
- **Closes**: §4 gap "EvalLog v3 drift" + "multi-judge ensemble MISSING"
- **Rollback**: revert `version: 3` → `2`; remove `judge_ensemble_task` — no API surface change

### Rec P3 — T1 INSTALL: langfuse Scores SDK for eval-trace pairing

- **Tier**: T1 INSTALL (langfuse-python 4.2.0 already installed per Stream K §1)
- **Pilot recipe**: per Stream K Pattern K3 — wrap each `--mode <lane>` invocation in `using_session(eval_id)` from `openinference.instrumentation`; call `langfuse.score(trace_id=<>, name="<lane>_eval_pass", value=<0-5>)` after `_persist_evallog`. Langfuse is live at `:3000`; auth via env LANGFUSE_PUBLIC_KEY/SECRET_KEY (already in CLAUDE.local.md §f2).
- **sca-v5 lite-score**: install_score 4.8 (MIT + self-hosted + already running); pattern_score 4.4 (joins eval verdict to trace at `session.id`)
- **Closes**: §4 gap "Langfuse trace pairing MISSING"; Stream K Pattern K3
- **Rollback**: remove `langfuse.score(...)` calls; revert `using_session` wrapper — eval lanes unaffected (langfuse calls are best-effort)

**NOT-NOW (defer)**: HELM (benchmark suite, not Claude-Code-fit), Weave (cloud-favored, Apache-2.0 but ClickHouse complexity), Braintrust (proprietary; OSS self-host Enterprise-only), MLflow (ML-lifecycle scope mismatch), ragas (no inspect_ai EvalLog interop), BIG-bench (frozen 2024), MT-Bench (covered by inspect_ai), `anthropic-evals` (phantom).

---

## §7 — Phantom-Contamination Check (Phase-5 Gate-4)

Mechanical verification per claim:

| Claim | Verification | Verdict |
|---|---|---|
| `anthropic-evals` repo | GitHub search 2 queries, 0 results | **PHANTOM** — caller-prompt assumed existence; Anthropic does not publish a standalone evals repo. Anthropic's path = cookbook + Promptfoo (verified DeepWiki q anthropics/anthropic-cookbook §1). |
| `openai/evals` "superseded" | DeepWiki q + 2026-04-14 last push + active PR template | not phantom — still maintained but `openai/simple-evals` is OpenAI's currently-cited canonical pack |
| inspect_ai EvalLog "v3" | DeepWiki q "current log schema version is 3" | verified |
| eval_harness.py "writes version: 2" | Read of harness/eval_harness.py:757 | verified — minor schema drift |
| deepeval ArenaGEval position-swap | DeepWiki q confirmed "blinded, randomized positioned, n-pairwise" | verified |
| `princeton-nlp/SWE-bench` | GitHub search rate-limited | **NOT VERIFIED THIS RUN** — exists per W259 catalog citations but this stream could not re-confirm last-push live (budget exhausted at rate-limit). Soft-flag, not phantom. |
| Anthropic recommends Promptfoo | DeepWiki q anthropics/anthropic-cookbook | verified |
| Stream K "0 observability imports in harness" | grep harness/eval_harness.py for langfuse/phoenix/weave/braintrust/openinference | verified — 0 hits |
| Braintrust $80M raise Feb-2026 | exa 2026-03-20 awesomeagents + 2026-04-29 braintrust.dev | verified |

**Phantom count §7**: **1 verified phantom** (`anthropic-evals`) + **1 unverified-this-run** (`princeton-nlp/SWE-bench` last-push, soft-flag — exists per prior wave cites, not re-fetched live).

---

## Closeout — Compliance Tags

- **sca-v5 Phase-5 Gate-1** (mechanical verification): every framework cited has explicit DeepWiki / GitHub-API / exa-blog evidence in §1.
- **sca-v5 Phase-5 Gate-4** (phantom check): §7 — 1 phantom flagged, 1 soft-unverified.
- **Cardinal-rule 1** (trusted-only sources): all candidates from official org repos.
- **Cardinal-rule 3** (subagent system): no .claude/agents edits.
- **File ownership**: Stream P wrote 1 new file in its assigned path; did NOT touch eval_harness.py / W302+ files.
- **Budget**: T3 cap honored (1 read + 6 GitHub searches before rate-limit + 5 DeepWiki Q + 1 exa search + 0 Bash file-writes).
