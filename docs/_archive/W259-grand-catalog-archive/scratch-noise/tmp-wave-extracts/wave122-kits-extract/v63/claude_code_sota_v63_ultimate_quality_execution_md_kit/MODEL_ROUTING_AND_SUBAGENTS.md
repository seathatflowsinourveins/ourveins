# Model routing and subagents

Do not hard-code unavailable model names. Check availability first.

## Routing map

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
  cheap classification / summarization if supported

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

## Subagent roles

```text
planner:
  converts issue/spec into plan, acceptance criteria, test strategy

implementer:
  makes minimal scoped changes

reviewer:
  reviews diff, edge cases, compatibility, test adequacy

security-reviewer:
  focuses auth, data loss, injection, secrets, permissions, rollback

verifier:
  runs focused commands, summarizes output, avoids dumping logs

codex-bridge:
  runs codex-plugin-cc review/adversarial/rescue

token-budget-guardian:
  enforces context admission and output filtering

source-auditor:
  audits third-party plugin/MCP/hook/tool before installation

eval-benchmark-architect:
  compares baseline vs candidate tools with reproducible benchmark tasks
```

## Two-model witness

```text
Claude implements.
Claude reviewer checks.
Codex reviews.
Codex adversarial-review challenges.
Claude reconciles.
CI decides.
Human/policy gate merges.
```
