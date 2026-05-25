# HIGH_STAR_RESEARCH_METHODS.md

## Research pipeline
1. Query high-star GitHub topic pages: `claude-code`, `claude-code-skills`, `claude-skills`, `token-optimization`, `mcp-security`, `awesome-cli-coding-agents`, `agent-orchestration`.
2. Cross-check official docs from Anthropic, OpenAI, MCP, GitHub, and framework providers.
3. Categorize each repo by architecture role, not marketing claim.
4. Demote high-star repos if they are domain-specific, memory-risky, system-prompt mutators, provider switchers, unbounded dashboards, or duplicate stronger tools.
5. Keep only repos with repeat convergence across multiple sources.

## Scoring dimensions
- Architecture leverage
- Stars/community signal
- Maintenance/source clarity
- Installation blast radius
- Token/context impact
- Worktree isolation support
- Quality/security gate support
- Benchmark/eval support
- Uninstall path
- License and telemetry clarity

## Output classes
```text
DEFAULT_INSTALL
SELECTIVE_INSTALL
REFERENCE_ONLY
AUDIT_REQUIRED
DISCOVERY_ONLY
CUT_OR_DEMOTE
```
