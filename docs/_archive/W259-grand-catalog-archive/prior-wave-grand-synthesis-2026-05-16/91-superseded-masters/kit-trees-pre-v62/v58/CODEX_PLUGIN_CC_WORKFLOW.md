# CODEX_PLUGIN_CC_WORKFLOW.md

Use `openai/codex-plugin-cc` as the default Claude ↔ Codex bridge.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for data loss, auth bugs, race conditions, rollback gaps, hidden coupling --background
/codex:rescue --background investigate CI failure and propose smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Policy

- Codex is a second-model witness.
- Codex is not Claude Code's permission boundary.
- Keep review gate monitored; avoid unattended loops.
- Keep Codex MCP config minimal during plugin-launched reviews.
