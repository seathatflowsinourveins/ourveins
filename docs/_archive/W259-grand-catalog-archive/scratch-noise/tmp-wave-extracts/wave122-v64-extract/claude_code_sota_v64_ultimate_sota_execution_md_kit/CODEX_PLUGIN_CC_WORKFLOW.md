# CODEX_PLUGIN_CC_WORKFLOW.md

Use `openai/codex-plugin-cc` as a second-model witness inside Claude Code.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Core commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, race conditions, hidden coupling --background
/codex:rescue --background investigate CI failure
/codex:status
/codex:result
/codex:cancel
```

## Policy

Codex is:

```text
independent reviewer
adversarial challenger
CI rescue worker
alternative hypothesis generator
```

Codex is not:

```text
Claude Code permission boundary
secret access boundary
blind auto-merge authority
```

## Review reconciliation

For every finding:

```text
true positive / false positive / uncertain
blocking / non-blocking
minimal fix
test needed
risk if ignored
```
