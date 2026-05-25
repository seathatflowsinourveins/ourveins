# Token / Context Architecture

## Layers

```text
Measure: ccusage, devtools, statusline
Shell output: RTK
Semantic retrieval: Serena, Claude Context, Aider repo map, ast-grep, tree-sitter, mgrep
Repo capsule: Repomix, code2prompt
Large-output sandbox: Context Mode
Cross-agent compression/memory: Headroom
Read-path compression: Wet, Skinny Jeans, Distill, code-review-graph
Cross-harness visibility: Cross-Code Organizer
Docs/browser MCPs: Context7, Playwright MCP, Firecrawl/Crawl4AI/Docling/MarkItDown as selective ingestion tools
```

## Default

```text
ccusage + RTK + Serena + Repomix
```

Do not install every context tool. Add one layer only when the measured bottleneck matches it.
