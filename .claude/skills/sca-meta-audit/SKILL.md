---
name: sca-meta-audit
description: Audits the sota-convergence-audit rubric itself for self-grading recursion bypass, cite-anchor freshness, and inter-rater calibration drift. Use when the operator says "audit the rubric", "score the scorer", "sca-meta", "rubric drift", or wants to verify the SOTA-defining framework hasn't silently degraded. Distinct from `sota-convergence-audit` (which scores candidate repos) — this skill scores the scorer itself.
---

# sca-meta-audit

## When to use

- Operator phrase: "audit the rubric", "score the scorer", "sca-meta", "rubric drift", "is the SCA framework SOTA"
- After a rubric version bump (sca-v17 → sca-v18) — verify regression-free
- Before relying on `sota-convergence-audit` for a high-stakes install decision

## What it does

Computes 3 metrics on `sota-convergence-audit/SKILL.md`:

1. **Recursion-risk metric** = (count T-skip-arch-itself dims) ÷ (total classified dims). [W353-S3 reframe 2026-05-21] Two distinct thresholds by rubric purpose: (a) Self-applicable rubric (meta-grading own structure) target ≤20% — exceeds → silent self-degradation risk. (b) External-eval-primary rubric (sca-v17 use case) target ≤50% — exceeds → rubric over-fits external candidates and loses meta-applicability. Current 46.7% per W353 self-audit 2026-05-21 (7 T-skip dims of 15 classified: D34, D42, D47, D48, D66, D69, D74; D45 reclassified E-skip per codex-r14 §5.2 sota-convergence-audit/SKILL.md:241). For sca-v17 (external-eval-primary), 46.7% < 50% PASS-threshold-(b). Self-grade recursion explicitly BLOCKED via I11 invariant (added W353-S3 to sota-convergence-audit/SKILL.md) — arch-itself self-eval CANNOT route to T1/T1-PROV/T2 without external-auditor sign.

2. **Cite-anchor freshness** = for each `Cite:` reference in the rubric, HTTP-probe the URL (200 OK), verify commit-SHA still exists via `git ls-remote` if applicable. Report stale citations.

3. **Inter-rater calibration** = on a held-out 5-candidate sample (no access to prior verdicts), dispatch `codex:codex-rescue` to score independently; compute Cohen's kappa against current rubric output. Calibration drift surfaces when human-coded + cross-model verdicts diverge.

## How to run

1. Read `.claude/skills/sota-convergence-audit/SKILL.md` + `references/dimensions.md`
2. Compute recursion-risk: parse dimension table, count T-skip-arch-itself entries, divide by total
3. Compute cite-freshness: extract all `Cite:` URLs + SHAs, probe each (`curl -I -s -o /dev/null -w '%{http_code}' <url>`); flag stale
4. Compute inter-rater: pick 5 catalog rows oldest-`last_scored_wave` first, dispatch codex via Agent tool with `subagent_type=codex:codex-rescue`, ask for independent scores; compare via Cohen's kappa on the 5 verdicts
5. Emit `docs/architecture/sca-meta-audit/<YYYY-MM-DD>-verdict.md` with PASS / FAIL / CALIBRATION-DRIFT verdict + per-metric scores

## Output schema

```yaml
slug: sca-meta-audit-<date>
verdict: PASS | FAIL | CALIBRATION-DRIFT
metrics:
  recursion_risk: <decimal>
  cite_freshness_pct: <decimal>
  cohen_kappa: <decimal>
cite_anchors_stale: [<url-1>, <url-2>, ...]
held_out_sample: [<slug-1>, ..., <slug-5>]
codex_verdict_divergence_count: <int>
date: <YYYY-MM-DD>
```

## Cite-anchors (3-org-distinct)

- **Anthropic**: https://github.com/anthropics/claude-cookbooks Skills System custom-skill versioning + `sota-convergence-audit/SKILL.md` precedent
- **Microsoft**: https://github.com/microsoft/autogen `_signal_termination_with_error` recursion-guard
- **community/standards**: https://openreview.net meta-review process + https://crfm.stanford.edu/helm Stanford HELM held-out-task framework + https://ieeexplore.ieee.org IEEE Software peer-review-of-review-process literature

## Sister skills

- `sota-convergence-audit` — scores candidate repos via 23-dim rubric
- `citations-agent` — enforces per-claim 3-org-distinct floor (sca-v13)
- `parallel-dispatch-mandate` — W269 fan-out enforcer
