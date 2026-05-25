# W373-F058 — Jury Request Brief

**Finding ID**: W373-F058
**Source stream(s)**: B (B-F009)
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=3.0 · D103=3.0 · D104=2.5 · D105=3.5)
**Remediation type**: mcp_swap (cost-probe first)

## Subject
`JayCheng113/skill-retrieval-mcp` — MCP server giving on-demand access to 89K+ skills from HuggingFace (LangSkills). HF dependency introduces a token-cost surface that is unknown.

## Evidence (cite-anchored)
- EXA search hits (Stream B-F009 evidence).
- 89K+ skills available via HF dep.
- Cost surface NOT yet measured.

## Proposed remediation
Cost-probe FIRST before install gate:
1. Read `JayCheng113/skill-retrieval-mcp` README for tool surface + auth requirements.
2. Estimate cost: 89K skill embeddings × probe-frequency × HF token cost. If costs are not transparent, defer.
3. Run smoke test in isolated worktree: install MCP, invoke a single skill-retrieval call, measure tokens used.
4. If costs acceptable, queue install per `mcp-builder` skill guidance.
5. If costs unbounded, document risk and defer install.

## Risks of the proposed remediation
- Install without cost-probe may surface runaway token costs.
- HF dep is third-party; trust-tuple condition-c (malicious-update review) needs SLSA-L3 or equivalent audit.
- Adding a new MCP grows the deferred-tool surface (CLAUDE.md L94 mentions 314+ deferred tools).

## Rollback steps
1. `/plugin uninstall skill-retrieval-mcp` if installed.
2. Remove from `.mcp.json`.
3. Restore CLAUDE.local.md env block to pre-install state.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-a maintainer-identity, condition-c malicious-update review): YES — must verify before install.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run EXA search for current upstream activity.
2. Is the proposed remediation proportional? — Cost-probe IS the canonical action; install-without-probe is non-compliant.
3. False-positive paths? — Skill-retrieval-MCP may be experimental / pre-release; verify version stability.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — New MCP may introduce dependency cascade (HF auth, embeddings, vector store); plan needed before install.
