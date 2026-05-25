# Token and Context Architecture V61

## Layers
1. **Measure**: ccusage, claude-devtools, statusline, cross-code-organizer.
2. **Shell-output compression**: RTK.
3. **Read-path optimization**: Serena, Claude Context, AST-grep, Tree-sitter, mgrep, code-review-graph.
4. **Repo capsules**: Repomix, code2prompt.
5. **Large-output sandboxing**: Context Mode.
6. **Cross-agent compression/memory**: Headroom.
7. **Context profiling and cleanup**: Wet, Whetstone, Distill, token-optimizer, Entroly.

## Rules
- Use semantic retrieval before file dumping.
- Use diff stats before full diffs.
- Use focused tests before full suites.
- Use Skills instead of long always-loaded instructions.
- Use subagents for noisy exploration and return structured summaries only.
- Use memory plugins only after proving repeated reconstruction cost.
