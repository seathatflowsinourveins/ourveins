# Cross-agent contract

Applies to Claude Code, Codex, GitHub agents, and external CLI agents.

## Roles

- Claude Code: primary orchestrator, editor, tester, worktree operator.
- Codex: independent reviewer, adversarial challenger, CI rescue, alternative hypothesis generator.
- Opus-class subagents: architecture, security, deep debugging, research synthesis.
- Sonnet-class workers: implementation, tests, routine refactors.
- Mini/lightweight agents: summarization, triage, classification.

## Done criteria

- Diff is minimal and scoped.
- Quality gates pass or failures are documented.
- Codex review findings are triaged.
- No new secrets, unsafe permissions, unbounded MCPs, or hidden memory writes.
- Handoff includes goal, files touched, commands run, test results, unresolved risks, and next actions.
