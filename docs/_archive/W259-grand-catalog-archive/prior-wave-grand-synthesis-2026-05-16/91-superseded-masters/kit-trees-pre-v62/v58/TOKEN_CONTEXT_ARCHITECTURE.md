# TOKEN_CONTEXT_ARCHITECTURE.md

## Layers

```text
measurement: ccusage, devtools, statusline, cross-code-organizer
shell-output compression: RTK
large-output sandbox: Context Mode
semantic retrieval: Serena, Claude Context
repo capsules: Repomix
read-path profiling/compression: Wet, Distill, Skinny Jeans, code-review-graph
cross-agent memory/compression: Headroom
```

## Rule

Do not dump files or logs. Use:

```text
symbols before files
summaries before raw logs
diff stat before full diff
focused tests before full suites
skills before giant prompts
worktrees before parallel edits
```

## Default

```text
RTK + Serena + Repomix
```

## Selective

```text
Context Mode if logs/API/browser/MCP outputs dominate
Headroom if cross-agent memory/compression is required
Claude Context if semantic search/RAG is better than Serena for the repo
Wet/Distill/Skinny Jeans if read-path profiling is a measured bottleneck
```
