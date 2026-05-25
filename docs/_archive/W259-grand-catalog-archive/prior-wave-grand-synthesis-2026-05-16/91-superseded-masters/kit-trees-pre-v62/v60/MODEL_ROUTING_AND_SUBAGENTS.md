# MODEL_ROUTING_AND_SUBAGENTS

Do not hard-code model names into repo config. Check availability first.

## Routing

```text
Claude Opus-class:
  complex architecture
  hard debugging
  security review
  deep research
  harness design
  multi-file reasoning

Claude Sonnet-class:
  normal implementation
  routine refactor
  test writing

Claude Haiku-class:
  cheap classification/summarization if supported

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion when available

Codex mini-class:
  cheaper/faster lightweight review
  summarization
  subagent triage
```

## Subagent contracts

Every subagent must return:

```text
task summary
files inspected
files changed
commands run
tests run
findings
risks
next action
```

Subagents must not return raw logs unless explicitly requested.
