---
name: codex-second-opinion
description: Run Codex as independent reviewer/adversarial reviewer/rescue worker
disable-model-invocation: true
---


# Codex plugin workflow

Default bridge:

```text
openai/codex-plugin-cc
```

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on data loss, auth bypass, rollback gaps, concurrency, hidden coupling --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

Policy:

```text
Codex is second-model witness.
Codex is adversarial reviewer.
Codex is rescue worker.
Codex is not Claude Code's permission boundary.
```

Reconciliation table:

```text
finding
source: Claude reviewer | Codex review | Codex adversarial | CI
true/false/uncertain
blocking/non-blocking
file/symbol
minimal fix
test evidence
```

