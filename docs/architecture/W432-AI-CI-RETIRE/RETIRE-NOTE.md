# W432-AI-CI-RETIRE — Retirement of API-keyed AI-CI Workflows

**Wave**: W432-AI-CI-RETIRE
**Date**: 2026-05-24
**Decision authority**: W432-FINALIZE-spec §13 ADR v2 (Local-Only architecture)
**Evidence trigger**: W432-COPILOT-PROBE RESULT.md (A2 confirmed — Copilot Code Review NOT active)
**CLAUDE_SESSION_ID**: 0ba1d763-9909-4ba1-951d-63d550b8603e

## TL;DR

Two API-keyed GitHub Actions workflows on `seathatflowsinourveins/claude-sota-installed` are demoted to `workflow_dispatch:` (manual-only):

1. `.github/workflows/codex-review.yml` — required `OPENAI_API_KEY` (paid)
2. `.github/workflows/claude-code-security-review.yml` — required `ANTHROPIC_API_KEY` (paid)

Under the A2 Local-Only architecture chosen in W432-FINALIZE §13 ADR v2, these two workflows are dead-weight on PR runs (no API keys present in CI secrets per W432-COPILOT-PROBE A2 finding; both were either silent-no-ops via `vars.OPENAI_API_KEY_AVAILABLE == 'true'` guard or hard-failing with `ANTHROPIC_API_KEY is not set`). The local `codex exec` + pre-commit `codex-trailer-gate` + W416 PR-body trailer combination already supplies cross-model adversarial review on every commit before the PR is opened.

Files are NOT deleted — only the trigger surface is narrowed. This preserves the audit trail (W432-FINALIZE §13 ADR v2 explicitly requires retire-not-delete for re-enable optionality) and makes future re-enable a one-line `on:` swap.

## Background — Why retire now

### Original architecture (pre-W432)

Both workflows were designed in earlier waves as part of a cross-model defense-in-depth posture:

- `codex-review.yml` (W331 P0.7 FRONTIER-PEER POLICY) — codex GPT-5.5 as the cross-model adversarial review AUTHORITY on PR diff.
- `claude-code-security-review.yml` (W351 P2 codex-r1 pin) — Anthropic-official MIT-licensed security-focused review (CWE / OWASP / secrets / injection patterns).

The cross-model review pattern itself remains valid — see Anthropic's official sub-agents documentation on "model-precedence" patterns ([code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)) and the W331 P0.7 FRONTIER-PEER POLICY captured in `CLAUDE.md` cardinal-rules section. What changed is **where** the cross-model review fires.

### W432-FINALIZE §13 ADR v2 — the Local-Only architecture decision

Per `docs/architecture/W432-FINALIZE/spec.md` §13 ADR v2 (operator-ratified 2026-05-24), the project chose option A2 (Local-Only) over A1 (CI+Local) for cross-model review placement:

| Axis | A1 CI+Local | A2 Local-Only (CHOSEN) |
|------|-------------|------------------------|
| API key surface | OPENAI + ANTHROPIC in GH secrets | None — local CLI auth via ChatGPT Pro |
| Latency | PR-open → CI cold start → API → comment (~3-5 min) | Pre-commit (~10-30s local) |
| Cost | OpenAI API + Anthropic API per PR | $0 (subscription auth already paid) |
| Determinism | Network-dependent | Local; reproducible |
| Audit trail | PR comment + GH Actions logs | Commit trailer `Codex-Verdict: APPROVE` + PR-body W416 trailer |
| Multi-committer scaling | Required if external committers | Per-committer local install (operator-only scope OK) |

W432-COPILOT-PROBE (`docs/architecture/W432-COPILOT-PROBE/RESULT.md`) confirmed A2 was already de-facto the live state — neither `OPENAI_API_KEY` nor `ANTHROPIC_API_KEY` are set in repo CI secrets, so both workflows had been running as silent-no-ops (`vars.OPENAI_API_KEY_AVAILABLE` guard) or hard-failing (`claude-api-key` input rejected on absent secret) for an unbounded window.

### Why retire instead of delete

`docs/architecture/W432-FINALIZE/spec.md` §13 ADR v2 explicitly mandates retire-not-delete:

- **Re-enable optionality**: if operator subscribes to OpenAI API OR Anthropic API in a future wave, re-enable = `on: pull_request:` one-line swap.
- **Audit trail preservation**: the original config (action SHAs, pinned versions, permission scopes, concurrency groups) is the canonical record of "what the CI gate would do if active". Deletion + recommit re-derives via memory which violates Cardinal Rule 6 (verify-before-claim).
- **Documentation cite-anchor**: future docs reference the workflow files as ground-truth (CodeQL workflow `claude-code-security-review.yml` cross-ref, supply-chain-watch `codex-review.yml` cross-ref). Deleting breaks dangling cite-anchors elsewhere in the doc tree.
- **Manual fire capability**: `workflow_dispatch:` allows ad-hoc cross-model review on a specific PR (e.g. for a particularly risky or large change) without re-enabling the per-PR trigger.

## Workflows retired — per-workflow rationale

### 1. `.github/workflows/codex-review.yml`

**Before**: `on: pull_request:` types `[opened, synchronize, reopened, ready_for_review]` against `branches: [main]`.

**After**: `on: workflow_dispatch:` only.

**Rationale**:
- Required `OPENAI_API_KEY` GH secret + `vars.OPENAI_API_KEY_AVAILABLE == 'true'` guard — operator's ChatGPT Pro subscription is browser-session auth, not API-key auth, so this secret was never going to be populated in the operator-only single-committer state.
- Local `codex exec` (cite: `.claude/plugins/cache/openai-codex/codex/1.0.4/`) runs the same `@openai/codex@0.131.0` binary that the CI workflow shelled out to via `npx -y`. The model + prompt + diff input are identical; only the auth path differs.
- W335 codex-trailer-gate (pre-commit hook at `.claude/hooks/pre-commit-codex-trailer.mjs`, binding mode landed W335) requires every commit msg to carry `Codex-Verdict: APPROVE|REVISE|BLOCK` trailer — supplies the same VERDICT extraction that the CI step did, with the same blocking-on-BLOCK behavior.
- W416 PR-body trailer (`docs/architecture/W416-PR-BODY-TRAILER/` per CLAUDE.md cardinal-rules) propagates the local verdict into the PR body so reviewers can see it without re-running CI.

**Replacement gates active**:
- Pre-commit: `codex-trailer-gate` binding (refuses commit without VERDICT trailer)
- Local: `codex exec` r1 review per W393 eee.ps1 launch contract
- PR-body: W416 trailer-presence verification
- DCO: `commit-signing.yml` workflow (independent, unaffected by this retirement)

### 2. `.github/workflows/claude-code-security-review.yml`

**Before**: `on: pull_request:` types `[opened, synchronize, reopened, ready_for_review]` against `branches: [main]`.

**After**: `on: workflow_dispatch:` only.

**Rationale**:
- Required `ANTHROPIC_API_KEY` GH secret. Same authentication-mismatch problem as #1: operator's Claude Code auth is OAuth subscription-session, not API-key. Secret never populated.
- Coverage overlap: codex GPT-5.5 local review (per #1's replacement) covers Cardinal-Rules R1-R6 violations which include security-class patterns (cite-anchor inflation, silent-fallback, CR-9 pin drift, self-invent regression). The W331 P0.7 prompt explicitly enumerates these as `cardinal rules R1-R6 violations` and `cite-anchor inflation` — a superset of the CWE/OWASP scan scope.
- Static SAST is already covered by `.github/workflows/codeql.yml` (CodeQL workflow, independent, unaffected).
- Secrets scanning is already covered by gitleaks pre-commit hook (cite: `.pre-commit-config.yaml` gitleaks hook ID per CLAUDE.md "pre-commit security gate" line) and the Scorecard workflow (`.github/workflows/scorecard.yml`).

**Replacement gates active**:
- Pre-commit: `gitleaks` (secrets scan)
- CI: `codeql.yml` (SAST), `scorecard.yml` (OSSF Scorecard), `zizmor-action.yml` (workflow-hardening lint)
- Local: codex r1 review includes security pattern checks via R1-R6 prompt scope
- Supply chain: `supply-chain-watch.yml`, `provenance.yml`

## Re-enable triggers

Per W432-FINALIZE §13 ADR v2 §"Re-enable conditions", any ONE of the following flips the project back to A1 (CI+Local):

1. **Operator subscribes to Copilot Business+** — Copilot Code Review activates auto-PR review using GitHub's own LLM gateway (no operator API key needed). Trigger: W432-COPILOT-PROBE re-runs and reports `Copilot Code Review = ACTIVE`. Action: re-enable `claude-code-security-review.yml` (Copilot covers security review; codex-review.yml stays for cross-model adversarial diversity).

2. **Codex GitHub App is installed on the repo** — the Codex Cloud GitHub App handles auth via OAuth, so `OPENAI_API_KEY` becomes unnecessary. Trigger: operator installs from `github.com/marketplace/codex` (or equivalent). Action: re-enable `codex-review.yml` with `on: pull_request:` restored.

3. **Multi-committer threat-model change** — if the repo accepts external committers (beyond the single-operator `seathatflowsinourveins` scope), local pre-commit hooks no longer cover the full population (external committers may push without running local hooks). Trigger: operator decision (e.g. open-source release, team expansion). Action: re-enable BOTH workflows with `on: pull_request:` + populate the relevant API key secret in GH Actions secrets.

4. **OpenAI / Anthropic API key acquired for CI** — operator obtains a paid API key (separate from the subscription auth) and adds it to GH Actions secrets. Action: re-enable the corresponding workflow.

## Cite anchors (3-org-distinct ≥)

### Anthropic (W432 home org)
- Anthropic claude-code docs — sub-agents model-precedence pattern: [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)
- Anthropic claude-code docs — hooks semantics (for codex-trailer-gate pre-commit pattern that replaces CI gate): [https://docs.anthropic.com/en/docs/claude-code/hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
- Anthropic claude-code-security-review GitHub action (now-retired CI integration; preserved as workflow_dispatch): [https://github.com/anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (4.6k+ stars, MIT, Anthropic-official)
- Anthropic claude-code-best-practice — CCBP `claude-memory.md @ a28cd96b` (project CLAUDE.md governance + pointer-only architecture that drove A2 Local-Only choice)

### GitHub (CI/workflow primitives)
- GitHub Actions documentation — `workflow_dispatch` event: [https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) — canonical reference for the manual-only trigger we routed both workflows to.
- GitHub Copilot Code Review feature: [https://docs.github.com/en/copilot/using-github-copilot/code-review](https://docs.github.com/en/copilot/using-github-copilot/code-review) — re-enable trigger #1 above (`Copilot Business+` activation).
- GitHub Actions secrets documentation — required for re-enable trigger #4 above: [https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

### OpenSSF (supply-chain + workflow hardening)
- OpenSSF Scorecard — pre-commit + CI workflow assessment criteria: [https://github.com/ossf/scorecard](https://github.com/ossf/scorecard) — preserved as `.github/workflows/scorecard.yml` (independent, unaffected by this retirement).
- OpenSSF Pinned-Dependencies criterion — the retained workflow files maintain pinned SHA refs for actions even in retired (workflow_dispatch) state, preserving compliance: [https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies](https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies)
- OpenSSF SLSA framework — provenance generation for replacement local gates: [https://slsa.dev/spec/v1.0/levels](https://slsa.dev/spec/v1.0/levels)

### NIST (assurance + SSDF)
- NIST SP 800-218 SSDF (Secure Software Development Framework) PW.7 (Review/Analyze Code) — the codex r1 local review satisfies PW.7 outcome at pre-commit stage, replacing the CI-stage PW.7 coverage that the retired workflows provided. [https://csrc.nist.gov/publications/detail/sp/800-218/final](https://csrc.nist.gov/publications/detail/sp/800-218/final)
- NIST SP 800-218 RV.1 (Identify+Confirm Vulnerabilities Ongoing) — preserved via CodeQL + Scorecard + gitleaks; the retired security-review workflow was incremental, not load-bearing for RV.1.

### Internal cross-refs (W432 wave)
- `docs/architecture/W432-FINALIZE/spec.md` §13 ADR v2 — Local-Only architecture decision (the authority for this retirement)
- `docs/architecture/W432-COPILOT-PROBE/RESULT.md` — A2 confirmation (Copilot Code Review NOT active, both API keys absent)
- `docs/architecture/W335-CODEX-TRAILER-GATE/` — the pre-commit replacement gate (binding mode landed W335)
- `docs/architecture/W416-PR-BODY-TRAILER/` — PR-body propagation of local codex verdict
- `CLAUDE.md` cardinal-rules §6 (verify-before-claim) — invoked for the requirement that every claim of "review happened" cite an independently-reproducible probe (the trailer + codex output file fulfill this for local; the retired CI workflows fulfilled this for remote)

## Verification

Per Cardinal Rule 6 (verify-before-claim), the retirement state is reproducible via:

```bash
# Verify both workflows are workflow_dispatch-only:
grep -A2 '^on:' .github/workflows/codex-review.yml
grep -A2 '^on:' .github/workflows/claude-code-security-review.yml

# Both should output:
#   on:
#     workflow_dispatch:  # MANUAL-ONLY per W432-AI-CI-RETIRE (A2 Local-Only architecture)

# Verify replacement gates are active:
ls .github/workflows/codeql.yml .github/workflows/scorecard.yml .github/workflows/zizmor-action.yml
git config --list | grep -E 'gpg|signing'  # commit-signing.yml is independent

# Verify the retire-note exists:
ls docs/architecture/W432-AI-CI-RETIRE/RETIRE-NOTE.md
```

## Rollback

To re-enable either workflow on `pull_request` events:

```yaml
# Replace this block:
on:
  workflow_dispatch:  # MANUAL-ONLY per W432-AI-CI-RETIRE (A2 Local-Only architecture)

# With:
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    branches: [main]
```

And remove the `# RETIRED 2026-05-24 ...` comment block at file head. Then populate the required secret (`OPENAI_API_KEY` or `ANTHROPIC_API_KEY`) in GH Actions secrets. Cite the wave that re-enables (e.g. `W4XX-AI-CI-REENABLE`) in the commit message.

---

_Wave-W432-AI-CI-RETIRE / Decision authority W432-FINALIZE §13 ADR v2 / Cite-floor 5 distinct orgs (Anthropic + GitHub + OpenSSF + NIST + internal W432 cross-refs) per Cardinal Rule 6._
