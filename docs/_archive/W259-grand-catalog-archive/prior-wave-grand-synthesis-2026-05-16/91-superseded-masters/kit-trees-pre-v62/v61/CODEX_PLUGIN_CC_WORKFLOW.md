# Codex Plugin CC Workflow V61

Use `openai/codex-plugin-cc` as second-model reviewer, adversarial challenger, and rescue worker.

## Commands
```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, auth bugs, data loss, rollback gaps, race conditions, and test holes --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Boundary
Codex is not Claude Code's permission boundary. Configure Codex separately. Keep Codex MCP surface minimal for plugin-launched reviews.

## Reconciliation
For each finding:
- true positive / false positive / uncertain
- blocking / non-blocking
- minimal fix
- test to prove fix
