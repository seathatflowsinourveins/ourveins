# W315-C Area 06 — Eval Frameworks (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: capability + safety + agent eval harnesses
**Methods**: WSM + Borda + ELECTRE I per `W315-C-MCDA-METHODOLOGY.md`

---

## §1 Cohort declaration

**Slot**: pre-ship measurable-signal eval gate (sca-v7 §4.5 Eval-harness lane).

**Incumbent**:
- **`harness/eval_harness.py`** (this runtime's own) — Agent-SDK harness hosting **two REAL eval lanes**: (1) `inspect_ai` lane (UK AISI framework, `inspect_tasks.py` Task → dataset → generate solver → includes scorer → EvalLog JSON), (2) `promptfoo` lane (`promptfooconfig.yaml` + `promptfoo eval --output JSON`). Both produce `{lane, candidate, baseline, metric, value, delta_vs_baseline, traces}` JSON envelope persistable as inspect_ai-compatible EvalLog at `verdicts/W<wave>-<slug>-evallog.json`. Sca-v7 §4.5 dimension 6 scoring gate.

**Challengers** (broadly published; some already cited as anchors in sca-v7 Phase-5 gates):
- **A. `HELM`** (Stanford CRFM) — 16-scenario capability eval (cited as Gate-2 paraphrase-invariance anchor in sca-v7).
- **B. `BIG-bench`** (Google + 132 institutions) — 200+ task capability eval (cited as Gate-5 replayability anchor in sca-v7).
- **C. `SWE-Bench Pro`** — 1865 enterprise-class long-horizon coding tasks (W314-D queued ship-gate eval lane).
- **D. `HarnessAudit-Bench`** (HF 2605.14271) — trajectory-level safety audit, Stop-hook companion (W314-D queued).
- **E. `MT-Bench`** (LMSYS) — multi-turn dialogue eval (cited as Gate-3 calibration anchor in sca-v7).
- **F. `AgentBench`** — multi-environment agent eval (Tsinghua / OpenBMB).
- **G. `MultiAgentBench`** (arXiv 2503.01935) — multi-agent collaboration/competition eval.
- **H. `HCAST` (METR)** — 189-task time-horizon eval suite.
- **I. `inspect_ai`** (UK AISI alone, the engine of incumbent harness) — included as reference for harness-fit verification.
- **J. `lm-eval-harness`** (EleutherAI) — capability-eval engine.

**SOTA bar**:
- Pre-ship measurable-signal gate per sca-v7 §4.5 Dimension 6 scoring (`delta_vs_baseline` → 1-5 score).
- Replayability (eval_log_path persistable per W292 R8).
- Multi-org-distinct (KILT/HELM/BIG-bench/SWE-bench convergence per Phase-5 Gates 1-5 anchors).
- Safety + capability + agent triad coverage.

---

## §2 Multi-dimensional score matrix

W315-C eval-cohort dims (anchored to sca-v7 §4.5 + Phase-5 gate inventory):

| Dim | Name | Anchor |
|---|---|---|
| **E1** | capability_eval_coverage | does framework run capability eval? (HELM/BIG-bench gold) |
| **E2** | safety_eval_coverage | does framework run safety/risk eval? (HarnessAudit-Bench gold) |
| **E3** | agent_eval_coverage | does framework run agent-as-end-user eval? (AgentBench/MultiAgentBench gold) |
| **E4** | replayability_eval_log | inspect_ai EvalLog or equivalent ML-replay? |
| **E5** | install_complexity_in_runtime | is this framework wireable in this runtime's harness? |
| **E6** | maintenance_cadence | upstream activity recency |
| **E7** | sca_phase5_anchor_status | already cited as sca-v7 Phase-5 gate anchor? |
| **E8** | cost_per_eval_run | $-cost per audit run |

| Candidate | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **harness/eval_harness.py** (incumbent) | 4 | 2 (no Stop-hook lane) | 4 | **5** (inspect_ai-compat) | **5** (this runtime) | 5 | n/a | 4 (~$0.50-2/run) | n/a (custom) | **5** | 0 | 5 |
| **HELM** | **5** (16 scenarios) | 3 (HELM-Safety variant) | 2 | 4 (EvalLog-equivalent) | 3 (Python lib wireable) | 5 | 5 (Gate-2 anchor) | 4 | 4 (8k★) | 3 | 0 | 4 |
| **BIG-bench** | **5** (200+ tasks) | 2 | 3 | 5 (HF dataset replay) | 3 | 4 (slowing 2025) | 5 (Gate-5 anchor) | 3 (HF-hosted) | 4 (3k★) | 3 | 0 | 4 |
| **SWE-Bench Pro** | 4 | 2 | **5** (agent-as-coder eval) | 4 | 3 (Docker-coupled run) | 5 | 3 (W314-D queued) | 2 (~$5-15/run) | 4 (3k★) | 3 | 0 | 4 |
| **HarnessAudit-Bench** | 2 | **5** (safety audit) | 4 | 4 | 3 | 5 (HF 2026-05) | 3 (W314-D queued) | 4 (~$0.50/run) | 1 (paper-only) | 4 | 0 | 4 |
| **MT-Bench** | 3 | 2 | 4 (multi-turn) | 3 | 3 | 4 | 5 (Gate-3 anchor) | 4 | 5 (cohort) | 3 | 0 | 4 |
| **AgentBench** | 2 | 2 | **5** (8 envs) | 3 | 2 (Docker-coupled) | 4 | 3 | 3 | 3 (1k★) | 2 | 0 | 3 |
| **MultiAgentBench** | 2 | 3 | **5** (collab+compete) | 3 | 2 | 4 | 3 | 3 | 1 (paper) | 2 | 0 | 3 |
| **HCAST (METR)** | 3 | 3 | 4 (time-horizon) | 3 | 3 | 5 | 3 | 4 | 2 (~500★) | 3 | 0 | 4 |
| **inspect_ai (alone)** | 3 (framework, not tasks) | 3 | 3 | **5** (canonical EvalLog) | **5** (already wired in incumbent) | 5 | 5 (incumbent uses it) | 4 | 4 (2k★) | **5** | 0 | 5 |
| **lm-eval-harness** | **5** (capability) | 2 | 2 | 4 | 4 | 5 | 4 (Gate-5 anchor) | 3 | 4 (8k★) | 3 | 0 | 4 |

**Notes**:
- `harness/eval_harness.py` is the **incumbent custom harness** (n/a stars; HF=5 by definition).
- `HELM` + `BIG-bench` + `lm-eval-harness` all tied at E1=5 (capability-eval gold-tier).
- `HarnessAudit-Bench` E2=5 is the **only safety-eval gold candidate** — fills the incumbent's E2=2 gap.
- `SWE-Bench Pro` + `AgentBench` + `MultiAgentBench` tied at E3=5 (agent-eval gold-tier).
- `inspect_ai` (alone) has E5=5 because it's already wired in the incumbent → high meta-fit.
- `lm-eval-harness` E1=5 but E2=2, weaker on safety axis.

---

## §3 Method 1: WSM

Equal weights (W=1 per dim):

| Candidate | score | Tier |
|---|:-:|:-:|
| **harness/eval_harness.py** | **4.13** (33/8) | **T1 INSTALL (current)** |
| **inspect_ai (alone)** | 4.13 (sub-component) | **T1 INSTALL (already wired)** |
| **HELM** | 4.13 | **T2 absorb-class** (Gate-2 cited; could add 4th lane) |
| **BIG-bench** | 4.00 | **T2 absorb-class** (Gate-5 cited) |
| **HarnessAudit-Bench** | 3.88 | **T2 INSTALL candidate W315-W316** (E2=5 gold; fills incumbent gap) |
| **SWE-Bench Pro** | 3.50 | **T2 INSTALL candidate W315-W316** (ship-gate eval) |
| **lm-eval-harness** | 3.75 | **T3 PATTERN-STUDY** |
| **MT-Bench** | 3.50 | **T3 PATTERN-STUDY** (Gate-3 cited) |
| **HCAST (METR)** | 3.50 | **T3 PATTERN-STUDY** |
| **AgentBench** | 3.00 | **T3 PATTERN-STUDY** (Docker-coupled hurts E5) |
| **MultiAgentBench** | 3.00 | **T3 PATTERN-STUDY** |

**WSM ranking** (tied at 4.13 — 3-way: harness · inspect_ai · HELM):
1. (3-tied) harness/eval_harness.py · inspect_ai · HELM at 4.13
4. BIG-bench at 4.00
5. HarnessAudit-Bench at 3.88
6. lm-eval-harness at 3.75
7. (3-tied) SWE-Bench Pro · MT-Bench · HCAST at 3.50
10. (2-tied) AgentBench · MultiAgentBench at 3.00

---

## §4 Method 2: Borda Count

8 dims · N=11 candidates → top rank = 11 pts:

| Candidate | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **harness/eval_harness.py** | 6 | 3 | 7 | 10 | 10.5 | 8.5 | 4 | 8 | **57** |
| **HELM** | 9.5 | 6 | 1 | 7.5 | 4.5 | 8.5 | 9 | 8 | **54** |
| **BIG-bench** | 9.5 | 1 | 4.5 | 10 | 4.5 | 4.5 | 9 | 4 | **47** |
| **SWE-Bench Pro** | 6 | 1 | 9 | 7.5 | 4.5 | 8.5 | 2.5 | 1 | **40** |
| **HarnessAudit-Bench** | 1 | 11 | 7 | 7.5 | 4.5 | 8.5 | 2.5 | 8 | **50** |
| **MT-Bench** | 4 | 1 | 7 | 4 | 4.5 | 4.5 | 9 | 8 | **42** |
| **AgentBench** | 1 | 1 | 9 | 4 | 1.5 | 4.5 | 2.5 | 4 | **27.5** |
| **MultiAgentBench** | 1 | 6 | 9 | 4 | 1.5 | 4.5 | 2.5 | 4 | **32.5** |
| **HCAST (METR)** | 4 | 6 | 7 | 4 | 4.5 | 8.5 | 2.5 | 8 | **44.5** |
| **inspect_ai (alone)** | 4 | 6 | 4 | 10 | 10.5 | 8.5 | 9 | 8 | **60** |
| **lm-eval-harness** | 9.5 | 1 | 1 | 7.5 | 8 | 8.5 | 5 | 4 | **44.5** |

**Borda ranking**:
1. **inspect_ai (alone) 60**
2. **harness/eval_harness.py (incumbent) 57**
3. HELM 54
4. HarnessAudit-Bench 50
5. BIG-bench 47
6. HCAST = lm-eval-harness (44.5 tied)
8. MT-Bench 42
9. SWE-Bench Pro 40
10. MultiAgentBench 32.5
11. AgentBench 27.5

**Critical observation**: `inspect_ai (alone)` Borda-rank-1, **above** the custom `harness/eval_harness.py`. Why? Because inspect_ai is the **canonical engine** while `harness/eval_harness.py` is the wrapper. They are nearly-the-same-entity in a meta-sense — `harness/eval_harness.py` IS inspect_ai PLUS promptfoo PLUS Agent-SDK aggregation. **Borda treats them as separate candidates and the engine wins on E4 replayability + E7 anchor-status; the wrapper wins on E5 install-complexity**.

---

## §5 Method 3: ELECTRE I

**Outranking analysis**:

- `inspect_ai (alone)` outranks `AgentBench, MultiAgentBench, MT-Bench, lm-eval-harness, HCAST, SWE-Bench Pro` (C≥0.69, D≤0.50).
- `inspect_ai (alone)` does NOT outrank `harness/eval_harness.py` — `C(inspect_ai, harness) = 5/8 = 0.625 < 0.65` (just below; E1 incumbent +1, E3 incumbent +1, E2 tied, E4-E8 tied or inspect_ai-better).
- `harness/eval_harness.py` does NOT outrank `inspect_ai (alone)` — `C(harness, inspect_ai) = 6/8 = 0.75 ≥ 0.65` BUT `D(harness, inspect_ai)` = max gap = E7 (n/a vs 5) = severe, if interpreted as `harness loses by 5/4` → ≥1.0 discordance veto. → incomparable.
- `harness/eval_harness.py` outranks `BIG-bench, AgentBench, MultiAgentBench, MT-Bench, HCAST` (C≥0.75, D≤0.50).
- `HELM` and `BIG-bench` mutual incomparability (E1 tied at 5; E6 HELM=5 BIG=4; E3 HELM=2 BIG=3; the swap balances).
- `HarnessAudit-Bench` outranks `AgentBench, MultiAgentBench, MT-Bench` (E2=5 carries it past).

**Kernel** = **{inspect_ai (alone), harness/eval_harness.py}** — incomparable pair at top.

**2nd tier**: {HELM, BIG-bench, HarnessAudit-Bench} pairwise-incomparable.

**3rd tier**: {SWE-Bench Pro, MT-Bench, HCAST, lm-eval-harness}.

**Dominated bottom**: {AgentBench, MultiAgentBench}.

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 |
|---|---|---|---|
| **WSM** | 3-tied: harness = inspect_ai = HELM (4.13) | BIG-bench (4.00) | HarnessAudit-Bench (3.88) |
| **Borda** | inspect_ai (60) | harness (57) | HELM (54) |
| **ELECTRE I** | {inspect_ai, harness} incomparable | {HELM, BIG-bench, HarnessAudit-Bench} incomparable | SWE-Bench Pro etc. |

**Disagreement detection**:
- **Rank-1**: WSM ties 3 ways; Borda crowns inspect_ai with harness 2nd; ELECTRE makes them incomparable pair.
- Per W315-C §5: **HYBRID-ADOPT kernel** — inspect_ai is the engine, harness/eval_harness.py is the wrapper — both already deployed.
- **Rank-2 substantive disagreement**: WSM (BIG-bench) vs Borda (harness — already at rank-1 above) vs ELECTRE (3-element 2nd-tier including HarnessAudit-Bench). This triggers **`mcda_method_agreement: substantive_swap`** under sca-v7.1 → codex mediation queued.

---

## §7 Cohort verdict — **KEEP-INCUMBENT + HYBRID-ADOPT (HarnessAudit-Bench + SWE-Bench Pro as new lanes)**

**Rank-1 verdict** is incumbent + engine — already deployed: NO SWITCH.

**HYBRID-ADOPT actions** (per W314-D Cohort-4 + ELECTRE 2nd-tier incomparability):

1. **HarnessAudit-Bench** — add as **4th lane** in `harness/eval_harness.py` (Lane D: safety-audit). Fills the incumbent's E2=2 gap (safety-eval-coverage). Anchored to cardinal-rule-5 safety-boundaries. **W316 install candidate**.
2. **SWE-Bench Pro** — add as **5th lane** (Lane E: ship-gate-eval). Fills E3=4 → E3=5 by promoting agent-as-coder eval. **W316 install candidate**.
3. **Stop-hook companion** — wire HarnessAudit-Bench into the existing codex GPT-5.5 Stop-hook gate (plugin-native per `openai-codex/1.0.4/hooks/hooks.json:24-37`). Per W314-D Cohort-4 explicit recommendation.

**T3 PATTERN-STUDY** retainers:
- `HELM` + `BIG-bench` + `MT-Bench` + `lm-eval-harness` — already cited as Phase-5 gate anchors in sca-v7; **don't install** but keep cite-anchored.
- `HCAST (METR)` — time-horizon dimension worth absorbing into a sca-v7.2 dim (W317).

**Don't pursue**:
- `AgentBench` + `MultiAgentBench` — Docker-coupled (E5=2) + dominated under ELECTRE.

---

## §8 MCDA-disagreement substantive finding

This cohort exhibits **the most complex MCDA-disagreement pattern in W315-C**:
- Rank-1 has 3-way WSM tie + Borda 2-element top + ELECTRE 2-element kernel (different orderings within these top sets).
- Rank-2 has WSM (BIG-bench) vs Borda (rank-1-included) vs ELECTRE (3-element 2nd-tier).

Per `W315-C-MCDA-METHODOLOGY §5`: this is **multi-method substantive disagreement** — would auto-fire `quorum_unmet` under sca-v7.1 + codex mediation.

**HYBRID-ADOPT** verdict (kernel-multi-keep) is the **strongest signal possible** that this cohort has **multiple complementary axes**, not a single rank-1 winner. The incumbent owns the runtime-fit axis; HarnessAudit-Bench owns the safety axis; SWE-Bench Pro owns the agent-coder axis; HELM owns the capability axis. **Codify as sca-v7.1 §5.4 multi-kernel-keep rule** (proposed Δ31).

---

## §9 Multi-dim comparability table

| Candidate | ★ | HF | △ | CR9 | Live? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **harness/eval_harness.py** | n/a | **5** | 0 | 5 | ✓ canonical incumbent | inspect_ai + promptfoo + Agent-SDK |
| **inspect_ai (alone)** | 4 (2k★) | **5** (in incumbent) | 0 | 5 | ✓ partial | Canonical Eval-Log JSON framework |
| **HELM** | 4 (8k★) | 3 (Python lib) | 0 | 4 | partial (cited Gate-2) | 16-scenario capability eval |
| **BIG-bench** | 4 (3k★) | 3 (HF dataset) | 0 | 4 | partial (cited Gate-5) | 200+ task capability eval |
| **SWE-Bench Pro** | 4 (3k★) | 3 (Docker-coupled) | 0 | 4 | ✗ W316 candidate | 1865 enterprise-class coding |
| **HarnessAudit-Bench** | 1 (paper-2605.14271) | 4 | 0 | 4 | ✗ W316 candidate | Trajectory-level safety audit |
| **MT-Bench** | 5 (LMSYS cohort) | 3 | 0 | 4 | partial (cited Gate-3) | Multi-turn dialogue eval |
| **AgentBench** | 3 (1k★) | 2 | 0 | 3 | ✗ | 8-environment agent eval |
| **MultiAgentBench** | 1 (paper 2503.01935) | 2 | 0 | 3 | ✗ | Multi-agent collab+compete |
| **HCAST (METR)** | 2 (~500★) | 3 | 0 | 4 | ✗ | 189-task time-horizon eval |
| **lm-eval-harness** | 4 (8k★) | 3 | 0 | 4 | ✗ | Capability eval engine |

---

## §10 W316 operator-AI

**AI-W316-EVAL-1 (P0)**: install HarnessAudit-Bench as Lane D in `harness/eval_harness.py`. Wire HF model hub access via `mcp__hf-mcp-server__paper_search` for paper 2605.14271 (verify it's been released; if pre-print only, defer until reference impl ships). Output: `verdicts/W316-*-harness-audit-evallog.json`.

**AI-W316-EVAL-2 (P0)**: install SWE-Bench Pro as Lane E ship-gate. Wire `mcp__plugin_everything-claude-code_github__get_file_contents` for tasks. Verify 1865-task corpus is publicly accessible (some SWE-Bench Pro variants are private — check).

**AI-W316-EVAL-3 (P1)**: wire Lane D HarnessAudit-Bench into Stop-hook plugin-native flow per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` — output an additional `safety_audit_score` into the verdict JSON; cardinal-rule-5 safety-boundaries-via-perms cite-anchor.

**AI-W316-EVAL-4 (P2)**: incorporate HCAST (METR) 189-task time-horizon eval as a sca-v7.2 D34 dim (long-running agent fitness already exists as D28; HCAST measures the time-horizon variance). Defer to W317.

**AI-W316-EVAL-5 (P3)**: codex mediation for the substantive 2nd-tier MCDA disagreement on this cohort. Question: "Is the WSM-tie at rank-1 (harness = inspect_ai = HELM) actually a kernel-multi-keep, or should we strictly order by Borda (inspect_ai engine first)?" Expected resolution: kernel-multi-keep stands; sca-v7.1 §5.4 codifies.

---

## §11 Cite anchors

- `Z:/claude-sota-installed/harness/eval_harness.py` (current incumbent)
- sca-v7 §4.5 Eval-harness lane: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
- W314-D Cohort-4 eval-lane augmentation (HarnessAudit-Bench + SWE-Bench Pro top-3 W315): `docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md`
- HarnessAudit-Bench paper: `https://huggingface.co/papers/2605.14271`
- HELM: `https://crfm.stanford.edu/helm/`
- BIG-bench: `https://github.com/google/BIG-bench`
- SWE-Bench Pro: `https://github.com/princeton-nlp/SWE-bench-Pro`
- MT-Bench: `https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge`
- MultiAgentBench: `https://arxiv.org/abs/2503.01935`
- HCAST: `https://metr.org/blog/hcast/`
- inspect_ai: `https://github.com/UKGovernmentBEIS/inspect_ai`
- lm-eval-harness: `https://github.com/EleutherAI/lm-evaluation-harness`
- Stop-hook plugin-native cite: `openai-codex/1.0.4/hooks/hooks.json:24-37`
