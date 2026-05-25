# W373-F009 — Jury Request Brief

**Finding ID**: W373-F009
**Source stream(s)**: A (A-F004), connects to F002
**Risk-class**: HIGH (CRITICAL subset)
**sca-v18**: 1.8 (decomposed: D101=2.0 · D102=1.5 · D103=2.0 · D104=1.5 · D105=2.0)
**Remediation type**: mcp_swap

## Subject
`langfuse-mcp-server@0.0.2-rc.0` pinned at `.mcp.json:79` — pinned version + npm-latest are BOTH `0.0.2-rc.0` (published 2025-02-16), making the package 460+ days unmaintained. It is effectively abandoned-RC. The W265 Langfuse install assumed live wrapper, but the MCP wrapper has not received maintenance in >15 months.

## Evidence (cite-anchored)
- `npm view langfuse-mcp-server@latest` → version `0.0.2-rc.0`, `time.modified` 2025-02-16 (Stream A-F004).
- `.mcp.json:74-79` pin record.
- Cadence: zero releases in 460+ days → trust-tuple condition-c (malicious-update review) FAIL trajectory.
- CONNECTS to F002 (Langfuse :3000 backend crash loop).

## Proposed remediation
Two paths — jury must choose (preferably after F002 langfuse recovery confirms backend alive):
1. **Vendor-fork path**: Fork `langfuse-mcp-server` repo into vendor-fork pattern (Z:/repos/deps/<fork>/), pin to local SHA, document under cardinal-rule-1 trust-tuple condition-c.
2. **Replace path**: Replace `langfuse-mcp-server` with direct-OTEL bridge (`mcp-otel-bridge` style); point trace emitters straight at Langfuse :3000/api/public/otel/v1/traces. Update CLAUDE.md L36 + Stream E memory tier matrix accordingly.
3. **Retire path**: If F002 (Langfuse backend) recovery fails, retire `langfuse-mcp-server` entirely; mark T5 RETIRED.

## Risks of the proposed remediation
- Vendor-fork increases maintenance surface (operator must track upstream-fork sync).
- Replace path requires re-architecting trace emitter wiring (graphiti/cognee/hindsight env LANGFUSE_*).
- Retire path loses the MCP tool surface for direct Langfuse interaction.
- All paths depend on F002 outcome — jury MUST sequence F002 before F009 decision.

## Rollback steps
1. Restore `.mcp.json` pin to `langfuse-mcp-server@0.0.2-rc.0` (or matching cite).
2. Restore CLAUDE.md L36 to prior state.
3. For replace path: revert trace emitter env vars to LANGFUSE_*.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-c malicious-update review): YES — direct fix of CR-1 condition-c failure.
- Cardinal-rule 9 (pinned-version invariant): YES — even abandoned packages must be pinned correctly.
- W373 spec §Top-jury sca<2.0: aligns with #5 priority.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `npm view langfuse-mcp-server@latest`.
2. Is the proposed remediation proportional? — YES; abandoned packages need explicit decision.
3. False-positive paths? — The package may be intentionally stable-by-design (some MCP servers don't need frequent updates). Check GitHub issues for activity.
4. Does rollback actually restore prior state? — YES via .mcp.json revert.
5. What changes after this fix that wasn't anticipated? — Replace path may surface OTEL endpoint version mismatches; vendor-fork path may introduce CR-9 SHA-pin freshness drift over time.
