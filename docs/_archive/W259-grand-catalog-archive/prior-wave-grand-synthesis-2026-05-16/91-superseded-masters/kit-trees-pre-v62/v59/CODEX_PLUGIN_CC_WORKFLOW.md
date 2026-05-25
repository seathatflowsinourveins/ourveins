# CODEX_PLUGIN_CC_WORKFLOW.md

## Role
`openai/codex-plugin-cc` is the default Claude ↔ Codex bridge.

Use Codex as:
```text
independent reviewer
adversarial challenger
CI rescue worker
alternative implementation hypothesis
```

Do not use Codex as Claude Code's permission boundary.

## Commands
```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
/codex:review --base main --background
/codex:adversarial-review --base main look for data loss, rollback gaps, race conditions, hidden coupling, auth bugs --background
/codex:rescue --background investigate CI failure and propose smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Review reconciliation
For every Codex finding:
```text
true positive / false positive / uncertain
blocking / non-blocking
minimal fix
focused test
```
