# MODEL_ROUTING_AND_SUBAGENTS.md

Do not hard-code model names. Check availability first.

## Routing

```text
Claude Opus 4.7-class:
  complex architecture
  hard debugging
  security review
  deep research
  harness design
  multi-file reasoning

Sonnet-class:
  implementation
  refactor
  tests
  routine review

Haiku-class:
  cheap classification
  summarization
  log triage

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

## Two-model witness

```text
Claude writes
Claude reviewer subagent reviews
Codex normal review checks
Codex adversarial review challenges
Claude reconciles only true positives
CI decides
```
