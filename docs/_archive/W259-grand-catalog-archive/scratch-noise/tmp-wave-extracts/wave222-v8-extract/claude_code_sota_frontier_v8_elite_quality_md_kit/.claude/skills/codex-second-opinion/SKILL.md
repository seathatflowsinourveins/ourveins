---
name: codex-second-opinion
description: Run Codex as an independent reviewer or adversarial reviewer before shipping risky code.
disable-model-invocation: true
allowed-tools: Read Grep Glob Bash
---

Steps:
1. Inspect `git status --short` and `git diff --stat`.
2. Run `/codex:review --base main --background`.
3. For risky changes, run `/codex:adversarial-review --base main look for auth bugs, rollback gaps, race conditions, data loss, hidden coupling, reliability risks --background`.
4. Fetch results with `/codex:status` and `/codex:result`.
5. Reconcile true positives only.
6. Run focused tests again.
