# Codex Plugin CC Workflow

Use `openai/codex-plugin-cc` as a second-model witness inside Claude Code.

## Role split

```text
Claude Code: plan, edit, test, orchestrate, manage worktrees.
Codex: review, adversarial challenge, rescue investigation.
CI/static analysis: objective gate.
Human: judgment on architecture, risk, and merge.
```

## Commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for auth bugs, race conditions, rollback gaps, data loss, hidden coupling, and reliability risks --background
/codex:rescue --background investigate why CI is failing
/codex:status
/codex:result
/codex:cancel
```

## Reconciliation prompt

```text
Compare Claude reviewer findings, Codex review findings, Codex adversarial findings, and CI/test results.
For each finding: true positive / false positive / uncertain; affected file/symbol; minimal fix; blocks merge? Apply only blocking true positives. Do not broaden scope.
```

## Safety
- Do not treat Codex plugin as Claude's permission boundary.
- Keep Codex config and MCP servers minimal.
- Avoid unattended review-gate loops unless monitored.
- Run in a clean worktree when possible.
