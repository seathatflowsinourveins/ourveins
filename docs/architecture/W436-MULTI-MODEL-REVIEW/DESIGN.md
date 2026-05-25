# W436 — SOTA Multi-Model PR-Review Architecture

**Wave**: W436
**Slug**: MULTI-MODEL-REVIEW
**Date**: 2026-05-24
**Status**: Implementation landed — Tier-1 binding, Tier-2 auto-detect, Tier-3 stub, Tier-4 aggregating
**Operator mandate**: "review by sota layers, copilot, gpt5.5, rules and Actions, workflow, all automative sota"

## 1. Mission

Build the SOTA cross-model PR-review pipeline that orchestrates **4 tiers** of review signal into one coherent ship verdict — without manufacturing fabricated reviewer output (cardinal-rule-6) and without giving any single tier the power to silently override the others.

## 2. Decision context

Two prior waves shape the architecture:

- **W432-FINALIZE §13 ADR v2** decided the runtime architecture is **A2 Local-Only**: Tier-1 codex GPT-5.5 runs LOCALLY (operator's ChatGPT Pro subscription via `codex exec`), NOT in CI (no `OPENAI_API_KEY` secret). The CI codex-review workflow was retired to `workflow_dispatch` only.
- **W432-COPILOT-PROBE** empirically determined (across 6 open PRs spanning 4 days) that **Copilot Code Review is NOT active** on this repository under the operator's current subscription tier. The toggle visible in Settings → Copilot cloud agent → Validation tools governs only Copilot's own validation tooling, not repo-level PR-review activation.

These two facts mean: a pure-CI multi-model review (Anthropic + OpenAI both via CI) is NOT viable in this runtime. The pipeline must be **hybrid**: local invocation for Tier-1 (operator's local codex), CI for Tier-4 (mechanized gates), and a CI **aggregator** that surfaces Tier-1's local verdict (via the `Codex-Verdict:` PR-body trailer) PLUS Tier-2's actual review activity (via GitHub Reviews API).

## 3. The 4-tier hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│  TIER-1 — codex GPT-5.5 r1 (LOCAL via `codex exec` subprocess)      │
│  Role: AUTHORITATIVE cross-model reviewer (W331 P0.7)                │
│  Signal: `Codex-Verdict: APPROVE` trailer in PR body + commit msgs   │
│  Enforcement: codex-verdict-gate.yml (BINDING; cannot merge w/o it)  │
│  Cite: https://github.com/openai/codex                               │
└─────────────────────────────────────────────────────────────────────┘
                                  │ AUTHORITY
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TIER-2 — GitHub Copilot Code Review (advisory; auto-detect)         │
│  Role: ADVISORY (recorded but does NOT override Tier-1)              │
│  Signal: review.user.login matches /copilot/ in /pulls/N/reviews     │
│  Status: NOT active on this repo currently (W432-COPILOT-PROBE)      │
│  Cite: https://docs.github.com/en/copilot/using-github-copilot/code-review │
└─────────────────────────────────────────────────────────────────────┘
                                  │ ADVISORY
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TIER-3 — Sonnet 4.6 tie-breaker (STUB; deliberately not invoked)    │
│  Role: TIE-BREAKER on Tier-1 r1↔r2 divergence ONLY (W331 P0.7)       │
│  Status: STUB — invocation gated by -AllowTierBreakerInvocation      │
│  Rationale: cardinal-rule-6 — would otherwise fabricate Sonnet vote  │
│  Cite: https://docs.anthropic.com/en/docs/claude-code/sub-agents     │
└─────────────────────────────────────────────────────────────────────┘
                                  │ TIE-BREAKER
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TIER-4 — Mechanized gates (BINDING; non-negotiable)                 │
│  Components: 19 pre-commit gates + 12 CI workflows + Codex-Verdict   │
│  Examples: gitleaks · ruff · shellcheck · cr2-2kb-hooks · CodeQL ·   │
│            commitlint · actionlint · pre-commit · codex-verdict-gate │
│  Cite: NIST SSDF SP 800-218 PW.7 + OpenSSF Scorecard Code-Review     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4. Verdict resolution algorithm

Pseudocode (PowerShell + GitHub Actions bash are both faithful to this):

```
function ResolveConsensus(codex_r1, copilot, mechanized, tie_breaker):
    # Tier-4 mechanized gates are non-negotiable
    if mechanized.failing > 0:
        return BLOCK, "Tier-4 mechanized failing"

    # Tier-1 codex is dominant
    switch codex_r1.verdict:
        case BLOCK:
            return BLOCK, "Tier-1 codex BLOCK"
        case REVISE:
            return REVISE, "Tier-1 codex REVISE"
        case APPROVE:
            # Tier-2 Copilot dissent is RECORDED but does not override Tier-1
            if copilot.active and copilot.verdict == BLOCK:
                return APPROVE_WITH_COPILOT_DISSENT, "Tier-1 wins per W331 P0.7"
            return APPROVE, "all tiers aligned"
        case INDETERMINATE:
            return INDETERMINATE, "operator escalation"

    # Tier-3 only fires on r1↔r2 divergence — currently not invoked (we run single-round)
    # Future expansion: run codex twice with position-swap, compare verdicts, escalate
    # to Sonnet 4.6 on divergence.
```

**Why Tier-1 dominates Tier-2**: W331 P0.7 FRONTIER-PEER POLICY anchors the cross-model gate AUTHORITY to codex GPT-5.5 — Copilot is a per-line suggestion engine optimized for repository conventions and security-pattern matching, whereas codex GPT-5.5 is a frontier-peer model running with full diff + context. The two are not equivalent voters; mixing them as equal voters would invite "two cheap reviewers beat one expensive one" failure modes.

**Why mechanized failing dominates everything**: pre-commit + CI gates encode invariants the runtime cannot violate (security, lint, type, schema). Even if all 3 model tiers say APPROVE, a failing CodeQL or commitlint check is still BLOCK. This matches NIST SSDF PW.7 "use AI-assisted code review BUT preserve deterministic gates".

## 5. Deliverables (this wave)

### 5.1 `tools/multi-model-review.ps1` — PowerShell orchestrator

- One-shot 4-tier aggregator for a single PR
- Caches codex r1 results for 60 min (default) keyed on `head_sha` to avoid quota burn
- Supports `-NoCodexExec` for trailer-only mode (uses PR-body `Codex-Verdict:` line as signal)
- Supports `-AllowTierBreakerInvocation` to authorize Tier-3 Sonnet invocation (currently a stub per cardinal-rule-6)
- Emits structured JSON per the schema in §6
- Exit codes: 0=APPROVE | 1=REVISE/BLOCK | 2=harness error

### 5.2 `.claude/skills/multi-model-review/SKILL.md` — Local skill

- Fires on operator phrases: "review this PR", "multi-model review", "convergence review", "4-tier review", "codex+copilot+claude review", "cross-model PR review"
- Implements the workflow above + dispatches teammates via Agent tool when needed
- Triggers ≤8 distinct (per cardinal-rule-4 trigger-audit budget)
- Anti-fabrication discipline: Tier-3 stub explicitly documented

### 5.3 `.github/workflows/multi-model-review-aggregator.yml` — Advisory CI workflow

- Runs on `pull_request: [opened, synchronize, reopened, ready_for_review]` and `workflow_dispatch`
- Does NOT block merge (advisory-only per A2 architecture)
- Aggregates check-run states + Copilot reviews API + PR-body `Codex-Verdict:` trailer
- Posts/updates a single consolidated PR comment (marker-based de-dup)
- `step-security/harden-runner@v2.19.3` SHA-pinned (`ab7a9404c0f3da075243ca237b5fac12c98deaa5`)
- `actions/checkout@v6.0.2` SHA-pinned (`de0fac2e4500dabe0009e67214ff5f5447ce83dd`)
- `actions/github-script@v9.0.0` SHA-pinned (`3a2844b7e9c422d3c10d287c895573f7108da1b3`)

### 5.4 `docs/architecture/W436-MULTI-MODEL-REVIEW/DESIGN.md` (this file)

## 6. JSON schema (verdict output)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed/W436/multi-model-review-verdict.json",
  "title": "W436 Multi-Model Review Verdict",
  "type": "object",
  "required": ["pr", "repo", "head_sha", "timestamp", "verdicts", "consensus", "schema_version"],
  "properties": {
    "pr":       { "type": "integer" },
    "repo":     { "type": "string", "pattern": "^[^/]+/[^/]+$" },
    "head_sha": { "type": "string", "pattern": "^[0-9a-f]{7,40}$" },
    "timestamp":{ "type": "string", "format": "date-time" },
    "verdicts": {
      "type": "object",
      "required": ["codex_r1", "copilot", "claude_local", "mechanized", "tie_breaker"],
      "properties": {
        "codex_r1":  { "$ref": "#/$defs/CodexVerdict" },
        "copilot":   { "$ref": "#/$defs/CopilotVerdict" },
        "claude_local": { "$ref": "#/$defs/ClaudeLocalVerdict" },
        "mechanized":{ "$ref": "#/$defs/MechanizedVerdict" },
        "tie_breaker": { "$ref": "#/$defs/TieBreakerVerdict" }
      }
    },
    "consensus": {
      "type": "string",
      "enum": ["APPROVE", "APPROVE_WITH_COPILOT_DISSENT", "REVISE", "BLOCK", "INDETERMINATE"]
    },
    "consensus_reason": { "type": "string" },
    "tier_2_needed": { "type": "boolean" },
    "architecture": { "type": "string", "const": "A2-Local-Only (per W432-FINALIZE §13 ADR v2)" },
    "schema_version": { "type": "string", "const": "1.0" }
  },
  "$defs": {
    "CodexVerdict": {
      "type": "object",
      "required": ["verdict"],
      "properties": {
        "verdict":    { "enum": ["APPROVE", "REVISE", "BLOCK", "INDETERMINATE"] },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "evidence":   { "type": "string" },
        "cached":     { "type": "boolean" },
        "source":     { "enum": ["codex-exec", "pr-body-trailer", "cache", "none"] },
        "cache_age_minutes": { "type": "number" }
      }
    },
    "CopilotVerdict": {
      "type": "object",
      "required": ["verdict", "active"],
      "properties": {
        "verdict": { "enum": ["APPROVE", "BLOCK", "ADVISORY", "NOT_ACTIVE", "INDETERMINATE"] },
        "reason":  { "type": "string" },
        "active":  { "type": "boolean" }
      }
    },
    "ClaudeLocalVerdict": {
      "type": "object",
      "properties": {
        "verdict": { "type": "string", "const": "INFORMATIONAL" },
        "reason":  { "type": "string" }
      }
    },
    "MechanizedVerdict": {
      "type": "object",
      "required": ["passing", "failing"],
      "properties": {
        "passing":       { "type": "integer", "minimum": 0 },
        "failing":       { "type": "integer", "minimum": 0 },
        "advisory_only": { "type": "integer", "minimum": 0 },
        "head_sha":      { "type": "string" },
        "failing_checks":{ "type": "array", "items": { "type": "string" } }
      }
    },
    "TieBreakerVerdict": {
      "type": "object",
      "required": ["verdict", "invoked"],
      "properties": {
        "verdict": { "enum": ["NOT_INVOKED", "WITHHELD", "NOT_IMPLEMENTED", "APPROVE", "REVISE", "BLOCK"] },
        "reason":  { "type": "string" },
        "invoked": { "type": "boolean" }
      }
    }
  }
}
```

## 7. Cardinal-rule alignment

| Rule | How this design complies |
|------|--------------------------|
| **R1** trusted primitives | Tier-1 = `npx -y @openai/codex@0.131.0` (CR-9 pinned). Tier-2 = GitHub-hosted action. Tier-3 = STUB (no untrusted invocation). Tier-4 = pre-existing pre-commit + CI. |
| **R2** no project-owned hook bodies | The orchestrator is a `tools/` script, not a hook. No `.claude/hooks/**` bodies added. |
| **R3** subagents = installed upstream | Tier-3 SDK invocation surface is a STUB; not invoked silently. Tier-1 `codex exec` is the canonical sub-agent subprocess. |
| **R4** project behavior in CLAUDE.md/settings | This skill is operator-curated, path-gated under `.claude/skills/multi-model-review/SKILL.md` per R4(b). |
| **R5** safety via permissions | Pre-commit + CI binding gates ARE the safety boundary; this skill aggregates them, doesn't bypass. |
| **R6** verify-before-claim | Every verdict carries `evidence` field. Tier-3 stub refuses to silently fabricate a Sonnet output. Cache TTL forces fresh invocations on stale heads. |

## 8. Re-evaluation triggers

This architecture should be re-evaluated when ANY of:
1. **Copilot becomes active** on this repo (operator tier upgrade, org migration, or GitHub releases Copilot Code Review for personal Pro+ GA) → upgrade Tier-2 from advisory to gating; re-run W432-COPILOT-PROBE.
2. **OPENAI_API_KEY** is set as repo secret → re-enable `codex-review.yml` CI workflow; Tier-1 becomes dual (local + CI) for divergence detection → activate Tier-3 Sonnet tie-breaker.
3. **W331 P0.7 FRONTIER-PEER POLICY** is amended (e.g. Gemini 3 or GPT-6 becomes available as alt-AUTHORITY) → re-order tiers.
4. **New cross-model reviewer becomes available**: Cursor agent review, Gemini Code Review, Aider review, etc. → add as Tier-2.5 (between advisory and tie-breaker).
5. **A2 architecture is reversed** (W432-FINALIZE §13 ADR v3 supersedes v2) → re-spec entire pipeline.

## 9. Honest limits (cardinal-rule-6 verify-before-claim)

The W387 §8 single-identity residual applies here unchanged: the operator runs this orchestrator, edits the codex output, writes the verdict trailer, and merges the PR — all under one GitHub identity. This design adds **observability and convergence-view**, not anti-fabrication separation. Real invoker≠approver separation would require:

- A separate GitHub App that owns the `Codex-Verdict:` trailer (operator cannot edit on its behalf)
- A separate review-bot identity for Tier-1 that cannot be edited by the PR author
- Two-app split per W387 DESIGN §5 / §8 TIER-2 (deferred to a future wave)

W436 ship-claim: the 4-tier convergence-view is operational, the schema is locked, the workflow is advisory-only and SHA-pinned, the skill is documented and trigger-audited. The Tier-3 Sonnet invocation is a deliberate STUB per cardinal-rule-6 — operator-authorized invocation is a follow-up wave.

## 10. Cite anchors (≥3 distinct orgs — 8 here per W352-S9 floor)

1. **Anthropic** — https://docs.anthropic.com/en/docs/claude-code/sub-agents (sub-agent precedence; basis for tier ordering)
2. **OpenAI / codex** — https://github.com/openai/codex (codex CLI; `codex exec` subprocess contract)
3. **GitHub** — https://docs.github.com/en/rest/pulls/reviews + https://docs.github.com/en/rest/checks/runs (Reviews + Checks APIs)
4. **GitHub Copilot** — https://docs.github.com/en/copilot/using-github-copilot/code-review (Copilot Code Review feature spec + tier requirements)
5. **Microsoft** — https://learn.microsoft.com/en-us/azure/devops/repos/security/github-advanced-security-code-scanning (Azure GAS convergence model for multi-source review aggregation)
6. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 code-review-by-AI guidance)
7. **OpenSSF** — https://openssf.org/projects/scorecard/ (Scorecard Code-Review track maintainer score)
8. **arXiv** — https://arxiv.org/abs/2410.13718 ("Evaluating Code Review" cross-model literature; threat-model basis for A2)

### W436-internal cross-references

- `docs/architecture/W432-COPILOT-PROBE/RESULT.md` — empirical Copilot inactivity probe
- `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` §13 ADR v2 — A2 architecture decision
- `docs/architecture/W387-SOTA-GOVERNANCE/DESIGN.md` — Codex-Verdict trailer gate origin
- `docs/architecture/W416-MERGE-COMMIT-FILTER/DESIGN.md` — noise-merge filter (preserved by this design)
- `CLAUDE.md` — W331 P0.7 FRONTIER-PEER POLICY anchor

## 11. Operational runbook

### 11.1 First-fire on a PR

```powershell
# Local-only mode (no codex burn, uses PR-body trailer):
pwsh -File tools/multi-model-review.ps1 -Pr 138 -NoCodexExec

# Full local mode (invokes codex GPT-5.5 r1; ~30-90s):
pwsh -File tools/multi-model-review.ps1 -Pr 138 -OutPath review-138.json

# Re-fire to refresh cache (CacheTtlMinutes 60 default):
pwsh -File tools/multi-model-review.ps1 -Pr 138 -CacheTtlMinutes 0
```

### 11.2 CI aggregator manual re-fire

```bash
gh workflow run multi-model-review-aggregator.yml -f pr_number=138
```

### 11.3 Skill invocation in-session

Operator says any of the trigger phrases (see SKILL.md §1). Claude dispatches the orchestrator + reports.

## 12. Verdict

**W436-MULTI-MODEL-REVIEW VERDICT: 4-tier review pipeline ready** — Tier-1 binding via local codex + W387 trailer gate; Tier-2 auto-detect via reviews API (currently NOT_ACTIVE); Tier-3 STUB per cardinal-rule-6 verify-before-claim; Tier-4 aggregation of 19 pre-commit + 12 CI workflows. Re-evaluation triggers documented in §8. Honest limits documented in §9.
