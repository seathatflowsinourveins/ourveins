# CODEX_PLUGIN_CC_WORKFLOW

## Role

Claude Code is the primary orchestrator and editor.
Codex is an independent reviewer, adversarial reviewer, and rescue worker.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Standard review

```text
/codex:review --base main --background
/codex:status
/codex:result
```

## Adversarial review

```text
/codex:adversarial-review --base main look for:
- data loss
- auth bugs
- rollback gaps
- hidden coupling
- race conditions
- missing tests
- unsafe migrations
--background
```

## Rescue

```text
/codex:rescue --background investigate why CI is failing and propose the smallest safe fix
```

## Boundary

Codex plugin is not Claude Code's permission boundary. Configure Codex sandbox/permissions separately. Avoid unattended loops.
