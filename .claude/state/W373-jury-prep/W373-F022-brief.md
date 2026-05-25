# W373-F022 — Jury Request Brief

**Finding ID**: W373-F022
**Source stream(s)**: A + E (A-F003 + E-F001 merged)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: mcp_swap

## Subject
`@colbymchenry/codegraph@0.7.10` pinned at `.mcp.json:152` — npm latest `0.9.3` (2 minor versions behind, ~25 commits drift). Newly-installed MCP per W343 P1.A.

## Evidence (cite-anchored)
- `npm view @colbymchenry/codegraph dist-tags` → `{ latest: '0.9.3' }` 2026-05-22 (Stream A-F003 + E-F001).
- `.mcp.json:152` pin record.
- 2 minor versions delta = ~25 commits.
- CLAUDE.md W343-A14 install record notes pinned 0.7.10.

## Proposed remediation
1. Review codegraph 0.7.10 → 0.9.3 CHANGELOG for tool API stability.
2. Test 0.9.3 in isolated worktree: install via `npx -y @colbymchenry/codegraph@0.9.3` and probe core tools (`codegraph_status`, `codegraph_search`, `codegraph_context`).
3. If tools API stable, bump `.mcp.json:152` pin to `0.9.3`.
4. Verify downstream skills using `mcp__codegraph__*` tools still function.

## Risks of the proposed remediation
- 2-minor-version bump may surface new tool names or schema changes.
- W343 install record may need cite-refresh post-bump.
- Cardinal-rule 9 strict-pin discipline — bump under controlled-CR-9 path.

## Rollback steps
1. Restore `.mcp.json:152` to `@colbymchenry/codegraph@0.7.10`.
2. `npm cache clean --force` to clear new npm cache.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES.
- Cardinal-rule 9 (pinned-version invariant): YES — controlled bump.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `npm view`.
2. Is the proposed remediation proportional? — YES; 2-minor-version bump is reasonable.
3. False-positive paths? — 0.9.3 may include breaking changes hidden in minor version. Verify by tool-call signatures.
4. Does rollback actually restore prior state? — YES via .mcp.json revert.
5. What changes after this fix that wasn't anticipated? — CR-4 trigger audit for codegraph-using skills may need re-running.
