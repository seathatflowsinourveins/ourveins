---
name: multi-model-review
description: Use when the operator says "review this PR", "multi-model review", "convergence review", "4-tier review", "codex+copilot+claude review", "cross-model PR review", or asks to aggregate codex GPT-5.5 + Copilot + Claude + mechanized-gates verdicts into a coherent ship decision. Implements the A2 Local-Only architecture (per W432-FINALIZE §13 ADR v2 + W432-COPILOT-PROBE RESULT) — Tier-1 codex GPT-5.5 r1 authoritative, Tier-2 Copilot advisory (auto-detect), Tier-3 Sonnet 4.6 tie-breaker (only on Tier-1 r1<->r2 divergence per W331 P0.7), Tier-4 19 pre-commit + 12 CI gates + Codex-Verdict trailer (binding). Sister skill to `review` (single-axis review) and `dual-review` (cross-model only) — this skill is the FULL 4-tier convergence.
---

# multi-model-review — SOTA 4-Tier Cross-Model PR Review

## When this fires

Operator says any of:
- "review this PR" + a number
- "multi-model review"
- "convergence review"
- "4-tier review"
- "codex+copilot+claude review"
- "cross-model PR review"
- "aggregate verdicts on PR N"

Do NOT fire for:
- Bare "review N" without a model-tier intent (use `review` skill; single-axis)
- Bare "/codex:review N" (use `codex` plugin directly; single-model)
- Local-diff review WITHOUT a PR number (use `dual-review` skill; pre-commit only)

## Architecture (4 tiers)

| Tier | Model | Role | Authority | Cite |
|---|---|---|---|---|
| 1 | codex GPT-5.5 r1 (local `codex exec` subprocess) | Authoritative cross-model reviewer | DOMINANT per W331 P0.7 FRONTIER-PEER POLICY | https://github.com/openai/codex |
| 2 | GitHub Copilot Code Review (if active on repo) | Advisory; auto-detected via reviews API | ADVISORY only (W432-COPILOT-PROBE: NOT active on this repo currently) | https://docs.github.com/en/copilot/using-github-copilot/code-review |
| 3 | Claude Sonnet 4.6 via Anthropic SDK | Tie-breaker ONLY on Tier-1 r1<->r2 divergence | TIE-BREAKER per W331 P0.7 | https://docs.anthropic.com/en/docs/claude-code/sub-agents |
| 4 | Mechanized: 19 pre-commit gates + 12 CI workflows + Codex-Verdict trailer | Binding gate (PR cannot merge if failing) | BLOCKING per W387 Codex-Verdict gate | https://csrc.nist.gov/publications/detail/sp/800-218/final (NIST SSDF PW.7) |

## Workflow (the 5-step convergence)

1. **Probe** mechanized check-runs via `gh api repos/{owner}/{repo}/commits/{sha}/check-runs`. If ANY binding gate is failing → consensus is BLOCK; emit verdict and stop. (Cardinal rule: mechanized gates are non-negotiable.)
2. **Probe** Copilot review via `gh api repos/{owner}/{repo}/pulls/{n}/reviews` filtered to `copilot` user. If active and state=CHANGES_REQUESTED → record Tier-2 dissent (but does not override Tier-1).
3. **Invoke** Tier-1 codex GPT-5.5 r1 via local `codex exec` subprocess (Path P: foreground+tee, per CLAUDE.md sub-agent architecture). Cache result for 60 min keyed on `head_sha` to avoid quota burn.
4. **Resolve** consensus:
   - Mechanized failing → BLOCK (terminal)
   - Tier-1 BLOCK → BLOCK
   - Tier-1 REVISE → REVISE
   - Tier-1 APPROVE + Copilot active + Copilot BLOCK → APPROVE_WITH_COPILOT_DISSENT (Tier-1 wins per W331 P0.7)
   - Tier-1 APPROVE + everything else OK → APPROVE
   - Tier-1 INDETERMINATE → INDETERMINATE (operator escalation)
5. **Emit** structured JSON per the W436 DESIGN.md schema; exit code reflects consensus.

## Implementation (one command)

```powershell
pwsh -File tools/multi-model-review.ps1 -Pr 138 -OutPath review.json
```

For agent-driven invocation inside this runtime, dispatch a teammate with `subagent_type=general-purpose` and the prompt:

```
Run multi-model-review.ps1 against PR #<N>. Aggregate the 4-tier verdict.
If consensus is APPROVE → trail with "Codex-Verdict: APPROVE" suggestion.
If consensus is BLOCK or REVISE → emit paste-ready remediation.
Save JSON to .claude/state/multi-model-review-cache/pr-<N>-<timestamp>.json
Report verdict + cite anchors.
```

## Cardinal-rule alignment

- **R1 (trusted-source primitives)**: Tier-1 is `npx -y @openai/codex@0.131.0` (CR-9 pinned); Tier-2 is GitHub-hosted; Tier-3 is Anthropic SDK; Tier-4 are already-installed pre-commit + CI workflows.
- **R2 (no project-owned hook bodies)**: The orchestrator is a `tools/` script, not a hook. No `.claude/hooks/**` bodies added.
- **R3 (subagents = installed upstream or documented system)**: The Tier-3 SDK invocation surface is a STUB in W436 (not invoked without `-AllowTierBreakerInvocation`) — cardinal-rule-6 verify-before-claim: do not fabricate Sonnet output.
- **R4 (project behavior in CLAUDE.md + settings.json)**: This skill is operator-curated path-gated per `.claude/skills/multi-model-review/SKILL.md` — sanctioned by R4(b).
- **R5 (safety via Claude Code permissions)**: Pre-commit + CI gates are the safety boundary; this skill aggregates them, doesn't bypass them.
- **R6 (verify-before-claim)**: Every Tier verdict in the JSON output carries `evidence` field. Cache TTL forces fresh codex invocation on stale results.

## Cite anchors (≥3 distinct orgs — 7 here per W352-S9 floor)

1. **Anthropic** — https://docs.anthropic.com/en/docs/claude-code/sub-agents (sub-agent model-precedence; basis for tier ordering)
2. **OpenAI** — https://github.com/openai/codex (codex CLI; `codex exec` subprocess contract)
3. **GitHub** — https://docs.github.com/en/rest/pulls/reviews (Reviews API used for Copilot detection per W432-COPILOT-PROBE)
4. **GitHub Copilot** — https://docs.github.com/en/copilot/using-github-copilot/code-review (Copilot Code Review feature spec)
5. **Microsoft** — https://learn.microsoft.com/en-us/azure/devops/repos/security/github-advanced-security-code-scanning (Azure GAS convergence model for multi-source review aggregation)
6. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 — code-review-by-AI is acceptable)
7. **OpenSSF** — https://openssf.org/projects/scorecard/ (Scorecard "Code-Review" track maintainer-score basis)

## Verdict schema (JSON output)

```json
{
  "pr": 138,
  "repo": "owner/repo",
  "head_sha": "abc123...",
  "timestamp": "2026-05-24T12:34:56Z",
  "verdicts": {
    "codex_r1":  { "verdict": "APPROVE", "confidence": 0.94, "evidence": "...", "cached": false, "source": "codex-exec" },
    "copilot":   { "verdict": "NOT_ACTIVE", "reason": "tier-limit per W432-COPILOT-PROBE", "active": false },
    "claude_local": { "verdict": "INFORMATIONAL", "reason": "synthesizer, not vote" },
    "mechanized": { "passing": 31, "failing": 0, "advisory_only": 4, "head_sha": "...", "failing_checks": [] },
    "tie_breaker": { "verdict": "NOT_INVOKED", "reason": "no divergence", "invoked": false }
  },
  "consensus": "APPROVE",
  "consensus_reason": "...",
  "tier_2_needed": false,
  "architecture": "A2-Local-Only (per W432-FINALIZE §13 ADR v2)",
  "schema_version": "1.0"
}
```

## Re-evaluation triggers

This skill's tier hierarchy should be re-evaluated when:
- W432-COPILOT-PROBE is re-run and Copilot becomes ACTIVE (then upgrade Tier-2 from advisory to gating)
- A new cross-model reviewer becomes available (e.g. Gemini PR-review, Cursor agent review)
- W331 P0.7 FRONTIER-PEER POLICY is amended

## Distinct from sister skills

- `review` (single-axis) — picks ONE dimension (correctness or spec); this skill picks ALL tiers.
- `dual-review` (cross-model only) — runs Tier-1 ONLY against local diff; this skill targets a specific PR + all 4 tiers.
- `code-review` plugin command — single-model review by Claude; this skill is the cross-model convergence.
- `sota-convergence-audit` — scores REPOS for SOTA fit; this skill scores PRs for ship-readiness.

## Anti-fabrication discipline (W436 ratification)

Per cardinal-rule-6 (verify-before-claim): the Tier-3 Sonnet 4.6 invocation is a deliberate STUB. Without `-AllowTierBreakerInvocation`, the skill returns `NOT_INVOKED` rather than fabricating a Sonnet verdict. If the operator authorizes a real Sonnet invocation, the implementation MUST shell out to a real Anthropic SDK call and emit verifiable evidence. The skill REFUSES to silently fall back to "Claude (this orchestrator) said APPROVE" — that would be cardinal-rule-6 violation (no independently-reproducible probe).
