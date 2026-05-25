# Token Optimization Architecture

## Core principle
The best token is the one never admitted into context.

## Layers

1. **Measurement**: `/usage`, `/context`, ccusage, statusline, devtools.
2. **Admission control**: RTK for Bash/git/test/log output; Context Mode for giant external outputs; Headroom/Wet for advanced cross-agent context control.
3. **Semantic retrieval**: Serena, Claude Context, ast-grep, tree-sitter, mgrep, Aider repo-map patterns.
4. **Repo capsules**: Repomix only for deliberate snapshots with include/exclude rules.
5. **Instruction loading**: concise `CLAUDE.md`; deeper docs in Skills; use `context: fork` for noisy tasks.
6. **Parallel isolation**: subagents for context isolation; worktrees for filesystem isolation.
7. **Compaction discipline**: compact only after saving goal, decisions, touched files, tests, risks, and next actions.

## Recommended policy

```text
Search before read.
Outline before implementation.
Diff stat before full diff.
Tail/filter before full logs.
Skill before giant prompt.
Worktree before parallel edit.
Codex review before risky merge.
```

## Canonical command preferences

Bad defaults:
```bash
tree .
cat huge.log
git diff
npm test
docker compose logs
find . -type f
```

Better defaults:
```bash
fd -e ts -e tsx src
rg "PaymentClient|createInvoice|refund" src -n
git status --short
git diff --stat
git diff --name-only
git diff --check
npm test 2>&1 | tail -n 120
docker compose logs --tail=120 api
jq '.errors[] | {message, path, code}' result.json
```

Best when RTK is installed:
```bash
rtk git diff
rtk git show
rtk tree
rtk npm test
```
