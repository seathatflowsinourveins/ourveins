# Model Routing and Subagents V61

Do not hard-code model names in repo config. Check availability first.

## Routing policy
- **Claude Opus-class**: complex architecture, hard debugging, security review, deep research, harness design, multi-file reasoning.
- **Claude Sonnet-class**: ordinary implementation, refactoring, test writing, documentation.
- **Claude Haiku-class**: cheap classification or summarization when available.
- **Codex / GPT-5.5-class**: independent review, adversarial review, CI rescue, alternative implementation hypothesis, research-heavy second opinion.
- **Codex mini-class**: lightweight triage, summary, quick review.

## Subagent roles
- planner
- implementer
- reviewer
- verifier
- security-reviewer
- codex-bridge
- source-auditor
- token-budget-guardian
- worktree-operator
- eval-benchmark-architect
- cli-quality-architect

## Required output contract for subagents
Return only:
- finding
- evidence
- files/symbols touched
- commands run
- risks
- recommended next action

No raw logs unless explicitly requested.
