# Model Routing and Subagents

Do not hard-code unavailable model names. Check availability in Claude Code/Codex first.

```text
Claude Opus-class:
  architecture, security review, deep debugging, harness design, long-horizon research

Claude Sonnet-class:
  implementation, test writing, refactors, normal feature work

Claude Haiku-class:
  cheap summarization/classification when available

Codex / GPT-5.5-class:
  independent review, adversarial review, CI rescue, alternative implementation hypotheses

Codex mini-class:
  lightweight review, summarization, subagent triage
```

Subagent policy:

```text
Use subagents to isolate noisy exploration.
Use worktrees to isolate files.
Use Codex to challenge, not to replace permission gates.
```
