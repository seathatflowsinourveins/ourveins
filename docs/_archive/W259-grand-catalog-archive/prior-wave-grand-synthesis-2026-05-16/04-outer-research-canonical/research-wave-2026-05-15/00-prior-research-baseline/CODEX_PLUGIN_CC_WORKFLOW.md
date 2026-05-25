# Codex Plugin CC Workflow

Default bridge:

```text
openai/codex-plugin-cc
```

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on correctness, security, data loss, race conditions, rollback, hidden coupling --background
/codex:rescue --background investigate the CI failure and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

Policy:

```text
Claude Code writes and orchestrates.
Codex reviews, challenges, rescues, and proposes alternatives.
CI and deterministic gates decide.
Codex is not the permission boundary.
```
