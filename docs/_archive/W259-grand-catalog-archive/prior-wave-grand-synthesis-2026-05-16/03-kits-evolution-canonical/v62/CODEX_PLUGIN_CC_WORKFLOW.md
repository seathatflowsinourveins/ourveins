# Codex Plugin CC Workflow — V62

`openai/codex-plugin-cc` is the only default Claude ↔ Codex bridge.

## Install pattern

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, auth bugs, race conditions, rollback gaps, data loss, brittle tests --background
/codex:rescue --background investigate CI failure and propose smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Reconciliation

```text
For each Codex finding:
- true positive / false positive / uncertain
- blocking / non-blocking
- file/symbol affected
- minimal fix
- tests to rerun
```

Codex is a second-model witness, not a permission boundary.
