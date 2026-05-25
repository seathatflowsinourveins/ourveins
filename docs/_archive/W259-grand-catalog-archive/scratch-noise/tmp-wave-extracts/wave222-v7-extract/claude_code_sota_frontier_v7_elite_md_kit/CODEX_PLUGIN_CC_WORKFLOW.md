# Codex Plugin for Claude Code Workflow

Primary repo: `openai/codex-plugin-cc`

## Role

Codex is the second-model witness:

```text
Claude Code writes and coordinates.
Codex reviews, challenges, and rescues.
CI decides.
```

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
/codex:adversarial-review --base main look for race conditions, rollback gaps, auth bugs, data loss, hidden coupling, and reliability risks --background
/codex:rescue --background investigate why CI is failing
/codex:status
/codex:result
/codex:cancel
```

## Review gate warning

Use plugin review gates only in monitored sessions. Long Claude/Codex loops can drain usage and hide permission mistakes.

## Reconciliation prompt

```text
Compare Claude reviewer findings, Codex review findings, Codex adversarial review findings, and CI results.
For each finding: true positive / false positive / uncertain; blocking / non-blocking; minimal fix.
Apply only blocking true positives.
Run focused tests after each fix.
```
