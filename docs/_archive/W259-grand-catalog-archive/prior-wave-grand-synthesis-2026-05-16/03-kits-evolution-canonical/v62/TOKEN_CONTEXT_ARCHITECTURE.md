# Token / Context Architecture — V62

## Layers

```text
1. Measurement: ccusage, devtools, statusline, cross-code-organizer
2. Shell-output compression: RTK, snip, squeez
3. Semantic retrieval: Serena, Claude Context, AST-grep, Tree-sitter, mgrep
4. Repo capsules: Repomix, code2prompt
5. Large-output sandboxing: Context Mode
6. Cross-agent compression/memory: Headroom
7. Read-path profiling/rewriting: Wet, Whetstone, Skinny Jeans, Distill
8. Documentation/browser selective MCP: Context7, Playwright MCP
```

## Default policy

Use RTK + Serena + Repomix first. Add Context Mode only if logs, browser snapshots, API responses, docs, CSV/JSON, or MCP payloads are the main token waste. Add Headroom only if cross-agent memory/compression is clearly needed.

## Anti-patterns

```text
cat huge files
dump full git diff
dump full test logs
install all MCPs globally
put workflows into giant CLAUDE.md
let every subagent reread the repo
```

## Better defaults

```bash
rg "symbol_or_error" src tests -n
fd -e ts -e py -e go src
git diff --stat
git diff --name-only
git diff --check
just test 2>&1 | tail -n 120
```
