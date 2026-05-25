---
name: codex-second-opinion
description: Run Codex as independent reviewer/adversarial reviewer/rescue worker.
allowed-tools: Read Grep Glob Bash
---

Use:
- /codex:review --base main --background
- /codex:adversarial-review --base main <risk focus> --background
- /codex:rescue --background <failure>

Reconcile findings before changing code.
