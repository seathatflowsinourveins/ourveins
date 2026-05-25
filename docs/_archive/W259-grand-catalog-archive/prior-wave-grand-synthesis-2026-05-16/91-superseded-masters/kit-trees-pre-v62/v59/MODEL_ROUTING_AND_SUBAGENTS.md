# MODEL_ROUTING_AND_SUBAGENTS.md

## Model roles
```text
Claude Opus 4.7-class:
  deep architecture, hard debugging, security review, long-horizon research, harness design

Claude Sonnet-class:
  normal implementation, routine refactor, test writing

Claude Haiku-class:
  cheap classification/summarization if supported

Codex / GPT-5.5-class:
  independent review, adversarial review, CI rescue, alternative implementation hypothesis, research-heavy second opinion

Codex mini-class:
  lightweight review, summarization, subagent triage
```

## Rules
- Check actual model availability before routing.
- Never hard-code unavailable model names into repo config.
- Use second-model review for risky diffs.
- Use subagents to isolate noisy exploration from the main context.
