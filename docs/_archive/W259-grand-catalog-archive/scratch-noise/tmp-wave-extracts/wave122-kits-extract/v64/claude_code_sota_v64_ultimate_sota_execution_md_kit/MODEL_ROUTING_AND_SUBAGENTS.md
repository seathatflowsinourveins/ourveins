# MODEL_ROUTING_AND_SUBAGENTS.md

Do not hard-code model names without checking availability.

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
  classification
  summarization
  cheap triage if supported

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion when available

Codex mini-class:
  lightweight review
  summarization
  subagent triage
```

## Subagent split

```text
planner:
  requirements, decomposition, risks

researcher:
  docs, prior art, external references

implementer:
  scoped patch

verifier:
  tests, lint, typecheck, repro

security-reviewer:
  threat model, secret leakage, auth, injection, rollback

codex-bridge:
  second-model review/adversarial review/rescue
```

## Two-model witness

```text
Claude writes.
Claude reviewer checks.
Codex reviews.
Codex adversarially challenges.
Claude reconciles.
CI decides.
Git records.
```
