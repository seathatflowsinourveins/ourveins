# Token Optimization Architecture

## Principle

The best token is the one that never enters context.

## Stack

```text
Measure → filter → retrieve semantically → load instructions on demand → isolate noisy tasks → compact deliberately
```

## Layer 1: measurement

- `ryoppippi/ccusage`
- `/usage`
- statusline tools
- `claude-devtools`

## Layer 2: command-output filtering

- `rtk-ai/rtk`
- `claudioemmanuel/squeez`
- `AgusRdz/chop`
- custom `PreToolUse` hooks

## Layer 3: large-output sandboxing

- `mksglu/context-mode`
- `chopratejas/headroom`
- `buildoak/wet`

## Layer 4: semantic retrieval

- `oraios/serena`
- `zilliztech/claude-context`
- `yamadashy/repomix`
- `ripgrep`, `fd`, `ast-grep`, `tree-sitter`

## Layer 5: progressive disclosure

- Short `CLAUDE.md`
- Scoped rules
- On-demand Skills
- Subagents for noisy research

## Bad defaults

```bash
tree .
cat huge.log
git diff
npm test
docker compose logs
find . -type f
```

## Better defaults

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
