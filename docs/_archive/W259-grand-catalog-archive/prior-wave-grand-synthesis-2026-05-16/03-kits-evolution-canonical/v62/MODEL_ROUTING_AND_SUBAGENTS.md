# Model Routing and Subagents — V62

Do not hard-code model names unless the environment confirms availability.

## Routing table

```text
Opus-class Claude:
  complex architecture
  hard debugging
  security review
  deep research
  harness design
  multi-file reasoning

Sonnet-class Claude:
  normal implementation
  routine refactor
  test writing

Haiku-class Claude:
  cheap classification / summarization if supported

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion

Codex mini-class:
  lightweight review
  summarization
  subagent triage
```

## Subagent design

- Planner: no edits; decomposes task and context requirements.
- Implementer: edits only scoped files.
- Verifier: runs tests and summarizes failures.
- Reviewer: inspects diff and hidden coupling.
- Security reviewer: threat model and static checks.
- Codex bridge: invokes `/codex:*` commands and reconciles findings.

## Rule

Subagents isolate context. Worktrees isolate files. Use both for parallel work.
