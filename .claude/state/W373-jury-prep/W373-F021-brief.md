# W373-F021 — Jury Request Brief

**Finding ID**: W373-F021
**Source stream(s)**: A (A-F002)
**Risk-class**: HIGH
**sca-v18**: 2.0 (decomposed: D101=2.0 · D102=2.0 · D103=2.5 · D104=1.5 · D105=2.0)
**Remediation type**: mcp_swap

## Subject
`@modelcontextprotocol/server-github@2025.4.8` pinned at `.mcp.json:26` — published 2026-02-06 (105 days ago); 3-month-stale read-only-GitHub API surface; CVE/security-bulletin lag risk per the `mcp-builder` skill.

## Evidence (cite-anchored)
- `npm view @modelcontextprotocol/server-github@2025.4.8 time.modified` → 2026-02-06 (Stream A-F002).
- 105-day-stale.
- npm-latest may have advanced (check `npm view @modelcontextprotocol/server-github dist-tags`).
- Pinned package handles read/write GitHub API surface (security-sensitive).

## Proposed remediation
1. Probe `npm view @modelcontextprotocol/server-github dist-tags` for current latest.
2. Review CHANGELOG between 2025.4.8 and latest for breaking changes.
3. If non-breaking, bump pin to latest. Add comment in `.mcp.json` documenting bump rationale (CVE-lag mitigation).
4. Verify GitHub MCP tools surface unchanged: `mcp__github__list_commits`, `mcp__github__create_issue`, etc.
5. If breaking changes detected, document the break + decide upgrade or stay-on-2025.4.8.

## Risks of the proposed remediation
- GitHub API surface may have shifted; tool call signatures may change.
- Auth/OAuth flow may differ in newer versions (verify `GITHUB_PERSONAL_ACCESS_TOKEN` still works).
- CVE-lag mitigation IS the primary motivation; if no actual CVE filed against 2025.4.8, urgency is lower.

## Rollback steps
1. Restore `.mcp.json:26` to `@modelcontextprotocol/server-github@2025.4.8`.
2. `npm cache clean --force` to clear new npm cache.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-c malicious-update review + condition-d freshness): YES.
- Cardinal-rule 9 (pinned-version invariant): YES — controlled bump under CR-9.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `npm view`.
2. Is the proposed remediation proportional? — YES; CVE-lag mitigation needs proactive refresh.
3. False-positive paths? — 2025.4.8 may be a stable long-term-support pin; newer releases may be unstable. Check release notes.
4. Does rollback actually restore prior state? — YES via .mcp.json revert.
5. What changes after this fix that wasn't anticipated? — GitHub tool calls may surface new tool names; deferred-tool-search may need re-indexing.
