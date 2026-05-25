# W308 Codex r4 — Staleness Correction (2026-05-19)

> **Operator mandate** (2026-05-19): "dont use staled references 2023 now is may 2026"
>
> **Correction scope**: my prior W308-CODEX-R4-SKILL-MD-S5-HET-ENSEMBLE-DIFF.md (commit `83b805c`) + my applied SKILL.md §5 edit cited Zheng+ 2023 MT-Bench (https://arxiv.org/abs/2306.05685) + Verga+ 2024 PoLL (https://arxiv.org/abs/2404.18796) as "SOTA refs". These are 2-3 years old in May 2026 and STALE per operator mandate.

## §0 What changed

Replaced the citation block in `.claude/skills/sota-convergence-audit/SKILL.md §5` (the het-ensemble rationale paragraph). Removed:
- ❌ Zheng+ 2023 MT-Bench (arXiv 2306.05685)
- ❌ Verga+ 2024 PoLL (arXiv 2404.18796)
- ❌ Reference to "2026 bias-mitigation study" (arxiv 2604.23178 — codex r4 cited but the year-stamp is questionable; deferring to 2026-direct anchors only)

Replaced with 2026-current anchors:
- ✅ **W306-codex-r1 HIGH finding** (this runtime, 2026-05-18): empirical defect class
- ✅ **W308-Stream-A measurement** (this runtime, 2026-05-19): cross-model+persona σ²=0.222
- ✅ **Anthropic engineering — multi-agent research system** (undated but still-current operational guidance)
- ✅ **Anthropic engineering — demystifying evals for AI agents** (undated but still-current operational guidance)
- Variance threshold σ²>0.5 explicitly framed as **LOCAL operational policy** (NOT global statistical optimality)

## §1 Why pre-2025 academic refs were stale

The operator's mandate is grounded in the runtime's anti-bias discipline:
- The LLM-as-judge field has evolved substantially 2024→2026
- 2023 papers cite pre-Claude-3 era models; their findings on position/verbosity biases may not generalize to current frontier models
- A 2026-MAY runtime SHOULD anchor to 2026-current operational evidence (W308-Stream-A local measurement) + ongoing-current operational guidance (Anthropic engineering blogs continuously updated), NOT static academic milestone papers

## §2 The W308-CODEX-R4 doc itself

The doc at `W308-CODEX-R4-SKILL-MD-S5-HET-ENSEMBLE-DIFF.md` (commit `83b805c`) retains the stale citations in §3 "Citation list (codex r4 §3) — 5 SOTA refs" + multiple other locations as a HISTORICAL RECORD of what codex r4 originally cited. **It is NOT being retroactively edited** because:
- Git history preserves it
- This W308-CODEX-R4-STALENESS-CORRECTION.md doc supersedes the stale cites
- The codex r4 pass itself is a historical artifact (the model's training data has its own cutoff; we cannot retroactively fix what codex r4 thought was SOTA at dispatch time)

## §3 Operational implication

When this skill (`sota-convergence-audit`) re-runs and codex is invoked for adversarial review, the codex prompt MUST include the operator-mandate phrasing: "2026-MAY-ONLY refs; pre-2025 academic citations are STALE unless the codex model itself surfaces a 2026-current update or replacement". Codex r5 (in-flight at time of this correction) was dispatched WITHOUT this explicit guard; will audit r5's output for stale cites post-completion and apply same correction pattern if needed.

## §4 Forward discipline (for future sca-v5 dispatches)

When dispatching codex GPT-5.5-Spark for SOTA research or citation work, the prompt MUST include:

```
2026-CURRENT-ONLY: prioritize references published or substantively updated after 2025-01.
Pre-2025 academic papers may be SHOWN as historical context but MUST NOT be the primary
anchor for "SOTA" claims. The runtime's local operational evidence (W-wave measurements)
is preferred. Anthropic engineering blogs are accepted as current operational guidance.
```

This guard should also propagate to:
- `.claude/skills/sota-convergence-audit/SKILL.md` Stage-1 codex-dispatch templates (future edit)
- Operator-runbook docs that frame "use codex with full tools / web access / SOTA refs" mandates

## §5 Cardinal-rule self-check

- R1 ✓ no install
- R2 ✓ no hook bodies
- R3 ✓ codex CLI per W280a
- R4 REVERSED ✓
- R5 ✓
- W286 P0C ✓
- `self_invented_count: 0` ✓

## §6 Tags

#W308 #codex-r4 #staleness-correction #SOTA-discipline #pre-2025-refs-rejected #anti-stale-citation #operator-mandate-2026-05-19
