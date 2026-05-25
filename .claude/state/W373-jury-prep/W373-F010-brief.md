# W373-F010 — Jury Request Brief

**Finding ID**: W373-F010
**Source stream(s)**: E (E-F002)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=3.0 · D104=2.0 · D105=2.5)
**Remediation type**: mcp_swap (major-bump review)

## Subject
`docling-mcp` version drift 1.3.4 → 2.0.1 (pypi latest) — major-version bump implies non-backward-compat. Runtime currently OK but a blocker for upstream-feature pull-in and possible silent ABI/API break window.

## Evidence (cite-anchored)
- `.mcp.json:docling.args` pins `docling-mcp==1.3.4` (Stream E-F002).
- `pip index versions docling-mcp` → `(2.0.1)` latest.
- Major-version delta: `1.x → 2.x` (semver-MAJOR per pypa conventions).

## Proposed remediation
1. Read docling-mcp 2.0.1 CHANGELOG and migration guide (docling-project/docling repo).
2. Test new version in isolated worktree: `uvx --from docling-mcp==2.0.1 docling-mcp --help` and probe a single docling tool call.
3. If API surface stable, update `.mcp.json:docling.args` to `docling-mcp==2.0.1`.
4. If API surface breaks (tool names/schema changed), document the break + decide whether to upgrade callers or stay on 1.3.4.

## Risks of the proposed remediation
- Major-version bump may break docling-MCP tool callers (e.g., document-processing skills).
- Tool name/schema changes may invalidate skill-side calls (e.g., `mcp__docling__convert_document_into_docling_document`).
- CR-9 strict-pin discipline must be re-affirmed (no auto-track to `latest`).

## Rollback steps
1. Restore `.mcp.json:docling.args` to `docling-mcp==1.3.4`.
2. `uvx --reinstall --from docling-mcp==1.3.4` to clear new uvx cache.

## Cardinal-rule + spec alignment
- Cardinal-rule 9 (pinned-version invariant): YES — major-bump must be controlled.
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES — major-version stale = trust-tuple degradation.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `pip index versions docling-mcp`.
2. Is the proposed remediation proportional? — YES; major-bump review IS the canonical action.
3. False-positive paths? — docling-mcp 2.x may be a release-candidate not yet stable. Check pypi metadata for `dev`/`rc`/`beta` markers.
4. Does rollback actually restore prior state? — YES via uvx reinstall.
5. What changes after this fix that wasn't anticipated? — Skill-side `mcp__docling__*` calls may need migration; CR-4 trigger audit needed for docling-using skills.
