# W308 Codex r4 — sca-v5 SKILL.md §5 Het-Ensemble Diff (2026-05-19)

> **Model**: gpt-5.5 via codex CLI v0.130.0 · **Web access**: enabled · **Live search**: arxiv + Anthropic engineering blogs
> **Status**: DEFERRED-TO-OPERATOR-AUTHORIZATION — SKILL.md is operator-curated; NOT auto-applied
> **Closes**: W308 operator-decision queue item #5 (sca-v5 SKILL.md §5 het-ensemble update — codex r1 APPROVED direction; r4 provides the concrete SOTA-cited diff)

## §0 TL;DR

Codex r4 drafted a ready-to-apply diff for `.claude/skills/sota-convergence-audit/SKILL.md §5`:
- Preserves existing 3-persona fan-out as DEFAULT for T3/T4/T5 audits
- UPGRADES T1 INSTALL + T2 VENDOR-FORK to REQUIRE heterogeneous evidence ensemble
- Defines variance semantics: σ²>0.5 OR verdict_disagreement → ROI-positive
- Specifies 3 required evidence classes (Claude Opus + codex GPT-5.5 + perturbation)
- Cites W306-codex-r1 HIGH + W308-Stream-A σ²=0.222 + 5 external SOTA refs
- Adds `adversarial_review.het_ensemble` YAML ledger fields

## §1 The proposed diff (unified format, ready to apply)

Apply to `.claude/skills/sota-convergence-audit/SKILL.md` §5 immediately after the existing 3-persona definition block (preserved as default) and immediately before §5.5 Phase-5:

```diff
+For **T1 INSTALL** and **T2 VENDOR-FORK** decisions, upgrade the default fan-out into a **heterogeneous evidence ensemble**. This is REQUIRED by specification, not by operator intuition: W306-codex-r1 flagged same-model-degeneracy as HIGH, and W308-Stream-A measured cross-model+persona disagreement signal at `σ²=0.222`, enough to surface non-zero review variance that same-model convergence hides. The ensemble MUST include all three evidence classes below:
+
+1. **Claude Opus evidence** — either the orchestrator's in-context evaluation OR a separate Agent Tool call. Assign this to the **architect persona** OR use it as the full-convergence synthesizer.
+2. **codex GPT-5.5 evidence** — a codex CLI subprocess review. Assign this to the **security persona** OR the **code-reviewer persona**.
+3. **Perturbation evidence** — either a varied-prompt Claude Opus cross-persona perturbation OR one different-model-family judge if available.
+
+The ensemble MAY still emit the same three persona labels (`security`, `architect`, `code-reviewer`), but at least two distinct model families/runtimes MUST contribute evidence to the final persona set. A T1/T2 verdict that uses three same-model persona prompts is INVALID unless explicitly downgraded to T3 PATTERN-STUDY or lower.
+
+**Variance semantics**:
+
+```text
+verdict_score(APPROVE)=0
+verdict_score(REVISE)=1
+verdict_score(BLOCK)=2
+σ² = population variance across the three persona verdict scores
+verdict_disagreement = count(distinct persona verdicts) > 1
+
+if σ² > 0.5 OR verdict_disagreement:
+  ensemble is ROI-positive; publish the heterogeneous evidence and route by the stricter verdict
+else if σ² <= 0.5 AND all three verdicts are unanimous:
+  defensible-negative; record that a single-judge path would have been sufficient for this case
+```
+
+`σ²=0.222` from W308-Stream-A is below the high-variance threshold but still counts as ROI-positive when it corresponds to at least one verdict disagreement. The `σ²>0.5` threshold catches large ordinal spread; `verdict_disagreement` catches low-amplitude but operationally meaningful APPROVE/REVISE or REVISE/BLOCK splits.
+
+Log the ensemble under `adversarial_review.het_ensemble`:
+
+```yaml
+required_for_tier: T1_INSTALL_OR_T2_VENDOR_FORK
+model_evidence:
+  claude_opus: architect_or_convergence
+  codex_gpt_5_5: security_or_code_reviewer
+  perturbation: varied_prompt_claude_opus_or_different_model_family
+variance:
+  sigma_squared: <numeric>
+  verdict_disagreement: <bool>
+  roi_positive: <bool>
+same_model_degeneracy_closed_by: W306-codex-r1_HIGH + W308-Stream-A_sigma2_0.222
+```
+
+Rationale anchors: Zheng+ 2023 MT-Bench/Chatbot Arena established LLM-as-judge as scalable but documented position, verbosity, and self-enhancement biases (`https://arxiv.org/abs/2306.05685`); PoLL showed diverse judge panels reduce intra-model bias and can outperform a single large judge (`https://arxiv.org/abs/2404.18796`); Anthropic's multi-agent research/eval methodology supports parallel specialized agents, separate contexts, repeated trials, and calibrated grading for agentic evaluations (`https://www.anthropic.com/engineering/multi-agent-research-system`, `https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents`). Therefore T1/T2 install/vendor-fork decisions require cross-model or cross-perturbation evidence; low-cost T3/T4/T5 audits preserve the original 3-persona default.
+
+After the three personas converge to APPROVE / REVISE / BLOCK under the applicable default or heterogeneous protocol, THEN run the **Phase-5 5-gate codified review** (v5 — replaces v3's informal inverse-test paragraph) followed by the **codex Stop-hook cross-model pass** with **Phase-6 position-swap MVP** as the final gate. ANY persona BLOCK or codex BLOCK = REJECT (or STUDY if revisable).
```

## §2 Applicability matrix (codex r4 §4)

| Decision surface | Same-model 3-persona OK? | Het-ensemble REQUIRED? | Notes |
|---|:---:|:---:|---|
| T1 INSTALL | **NO** | **YES** | Must include Claude Opus + codex GPT-5.5 subprocess + perturbation/different-family evidence |
| T2 VENDOR-FORK | **NO** | **YES** | Same requirement as T1 |
| T3 PATTERN-STUDY | YES | NO | Existing low-cost fan-out remains default |
| T4 CITE-ONLY | YES | NO | Het-ensemble optional if operator wants stronger evidence |
| T5 REJECT / descriptive doc edit | YES | NO | No new review burden |
| Any tier with persona BLOCK | No-ship | N/A | Existing BLOCK semantics preserved |
| Any tier with σ²>0.5 OR verdict disagreement | N/A | Publish ensemble evidence | Route by stricter verdict |
| Any tier with unanimous σ²≤0.5 | YES | Not necessary after proof | Record defensible-negative/single-judge-sufficient |

## §3 Citation list (codex r4 §3) — 5 SOTA refs

1. **Zheng et al., 2023** — "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" — https://arxiv.org/abs/2306.05685
   - Foundational LLM-as-judge baseline; documents position, verbosity, and self-enhancement biases
2. **Verga et al., 2024 (PoLL)** — "Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models" — https://arxiv.org/abs/2404.18796
   - Direct support for diverse judge panels reducing intra-model bias; can outperform single large judge
3. **Anthropic Engineering** — "How we built our multi-agent research system" — https://www.anthropic.com/engineering/multi-agent-research-system
   - Parallel specialized subagents + separate contexts + exploration trajectories
4. **Anthropic Engineering** — "Demystifying evals for AI agents" — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
   - Repeated trials + calibrated grading for subjective LLM rubrics
5. **2026 bias-mitigation study** — "Judging the Judges: A Systematic Evaluation of Bias Mitigation Strategies in LLM-as-a-Judge Pipelines" — https://arxiv.org/abs/2604.23178
   - Tests judge models from 4 provider families; supports the risk model that judge behavior is model-dependent

**Live-search caveat (codex-recorded)**: no public 2025-2026 benchmark establishes a universal heterogeneous-judge `σ²>0.5` threshold. The threshold is treated as **local operational policy** anchored to W308-Stream-A σ²=0.222 empirical finding, supported by Zheng+/PoLL/Anthropic for the ensemble direction.

## §4 Rollback semantics (codex r4 §5)

Rollback options (ordered most-to-least conservative):

| Rollback level | Action | Preserves |
|---|---|---|
| **Full** | Remove the inserted §5 block entirely | Prior 3-persona + Phase-5 + Phase-6 flow |
| **Softer-1** | Change T1/T2 `REQUIRED` to `SHOULD` | Ledger fields + advisory ROI tracking |
| **Softer-2** | Restrict requirement to T1 only (T2 reverts to default) | Most ledger structure |
| **Threshold-relax** | Raise σ²>0.5 threshold OR drop verdict_disagreement clause | Het-ensemble mandate but lower escalation rate |
| **Strict-future** | Require 3 distinct model families once a third judge is consistently available | Forward-only tightening |

## §5 Rationale highlights (codex r4 §2 — 160 numbered points)

Key arguments (full list in codex raw output at `tmp/codex-output/w309-skill-md-section5-het-ensemble-diff.md`):
- Preserves existing 3-persona structure as DEFAULT (backward-compat)
- Tier-based trigger (not operator preference) → mechanically auditable
- Cites both DEFECT CLASS (W306) and LOCAL EMPIRICAL EVIDENCE (W308-Stream-A σ²=0.222)
- 3 required evidence classes prevent cosmetic persona diversity from passing as evidence diversity
- Variance semantics separate MAGNITUDE (σ²>0.5) from DISAGREEMENT (verdict split); both matter
- Routes by STRICTER verdict on disagreement (keeps safety posture conservative)
- YAML ledger fields are concrete + operator-applicable + future-validator-checkable
- 5 SOTA-cited rationale anchors (Zheng+ + PoLL + 2× Anthropic + 2026 bias study)
- Variance threshold treated as local W308 operational policy, NOT global statistical optimality
- Does NOT weaken existing Phase-5 / Phase-6 / BLOCK semantics — only strengthens upstream evidence

## §6 Operator-action queue update

**OPERATOR-AUTHORIZATION-PENDING** — apply this diff to `.claude/skills/sota-convergence-audit/SKILL.md §5` after confirming the heterogeneous-evidence specification matches operator intent.

If APPLIED:
- Closes W308 operator-decision queue item #5
- Closes W306-codex-r1 same-model-degeneracy HIGH (formalizes the closure into the spec)
- Sets precedent for sca-v6 evolution (Q1 governance flag in row 31 + this het-ensemble pattern)

If DEFERRED:
- Codex r1 + r4 verdicts remain advisory
- Het-ensemble continues as best-practice but not codified

## §7 Cardinal-rule self-check (this artifact)

- R1 ✓ no install proposed
- R2 ✓ no `.claude/hooks/scripts/*.py` introduced; no project-owned hook bodies
- R3 ✓ codex CLI per W280a Path P
- R4 REVERSED ✓; the proposed SKILL.md edit is operator-curated path-gated
- R5 ✓
- W286 P0C ✓
- `self_invented_count: 0` preserved ✓

## §8 Cite-anchors

- Codex r4 raw output: `tmp/codex-output/w309-skill-md-section5-het-ensemble-diff.md` (674 LOC raw)
- W308-CODEX-R1-GPT5-5-REVIEW.md §3 (codex r1 APPROVED direction)
- W306-AUDIT-2026-05-18.md (W306-codex-r1 same-model-degeneracy HIGH finding)
- W308-STREAM-A-HET-ENSEMBLE-SMOKE.md §0 (σ²=0.222 empirical evidence)
- `.claude/skills/sota-convergence-audit/SKILL.md §5` (existing 3-persona spec to be amended)
- 5 SOTA refs cited in §3 above

## §9 VERDICT-LEDGER reference

Row 34 (if applied) OR mention in W309+ wave-state notes (if deferred).

Status: **OPERATOR-AUTHORIZATION-PENDING**

## §10 Tags

#W308 #codex-r4 #verdict #sca-v5 #SKILL-md #het-ensemble #W306-codex-r1-closure #operator-auth-pending #Zheng-MT-Bench #PoLL #Anthropic-multi-agent
