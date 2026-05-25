# W373-F042 — Jury Request Brief

**Finding ID**: W373-F042
**Source stream(s)**: A (A-F007)
**Risk-class**: HIGH
**sca-v18**: 2.8 (decomposed: D101=3.0 · D102=2.5 · D103=3.0 · D104=2.5 · D105=3.0)
**Remediation type**: hidden_error_fix

## Subject
`docling-mcp==1.3.4` is pinned at `.mcp.json:163` — `uvx --from docling-mcp==1.3.4` is uvx-pinned per CR-9, but `pip show docling-mcp` in the current venv returns NOT INSTALLED. Install-state drift candidate per W270 cardinal-rule-1 corollary.

## Evidence (cite-anchored)
- `pip show docling-mcp` → not found (Stream A-F007).
- `.mcp.json:163` pin: `docling-mcp==1.3.4`.
- uvx pins per CR-9 in `.mcp.json:docling.args` field.

## Proposed remediation
Probe-first decision:
1. Verify uvx cache: `uvx --from docling-mcp==1.3.4 docling-mcp --help` → if functional, this is expected uvx behavior (uvx maintains its own cache, NOT the system venv).
2. Verify docling-MCP tool calls work via Claude Code: probe `mcp__docling__create_new_docling_document`.
3. If both probes succeed, install-state is HEALTHY (uvx-only is by-design). Document this nuance in CLAUDE.md memory section.
4. If probes fail, fresh install via `uvx --reinstall --from docling-mcp==1.3.4 docling-mcp --help`.

## Risks of the proposed remediation
- Forcing pip install (Path A confusion) would conflict with uvx-isolated discipline.
- uvx cache may be machine-specific; CI runs may have different state.
- If uvx-only is by-design, the W270 corollary may need refinement (uvx-installed != pip-installed).

## Rollback steps
1. No-op if probes succeed (just document).
2. If reinstall path: `uvx cache remove docling-mcp` to clear.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — install-state must be verifiable.
- W270 cardinal-rule-1 corollary: install-state drift governance.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `pip show docling-mcp` + `uvx --from docling-mcp==1.3.4 docling-mcp --help`.
2. Is the proposed remediation proportional? — Probe-first is minimal; commit to action only after probe confirms.
3. False-positive paths? — uvx-isolated install is canonical for uvx-based MCPs; pip-show absence is expected. The W270 corollary may need clarification.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Updating W270 corollary to clarify uvx-vs-pip install scope may be needed.
