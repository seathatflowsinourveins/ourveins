# W373-F031 — Jury Request Brief

**Finding ID**: W373-F031
**Source stream(s)**: C-3
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: mcp_swap (manual major-bump review)

## Subject
`@commitlint/cli@20.5.3` lags upstream `21.0.1` (1 major) — manual review required (breaking-change semver bump).

## Evidence (cite-anchored)
- `npm view @commitlint/cli version` → `21.0.1` (Stream C-3).
- Installed pin `20.5.3` (in `.pre-commit-config.yaml` or pre-commit-related config).
- Major-version delta: `20.x → 21.x`.

## Proposed remediation
1. Read commitlint 21.0.1 CHANGELOG for breaking changes (config schema, plugin API, rule names).
2. Test 21.0.1 in isolated branch: install via `npm install -D @commitlint/cli@21.0.1` and run `commitlint --from HEAD~5` to validate config compatibility.
3. If config-schema unchanged, bump pin.
4. If config-schema changed, update `.commitlintrc.*` to match new schema, then bump pin.
5. Verify commit-msg gate (`tools/codex-trailer-gate.mjs` per CLAUDE.md L92) still functions.

## Risks of the proposed remediation
- Major bump may invalidate existing `.commitlintrc.*` config.
- Pre-commit gate may fail to load 21.0.1 with old config.
- Custom commitlint plugins (if any) may need separate updates.

## Rollback steps
1. Restore pin to `@commitlint/cli@20.5.3` in config file.
2. `npm install` to re-install old version.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES.
- Cardinal-rule 9 (pinned-version invariant): YES — controlled major bump.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `npm view`.
2. Is the proposed remediation proportional? — YES; major-bump warrants review.
3. False-positive paths? — commitlint 21.0.1 may have config-compat back-shim; check release notes.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Commit-msg trailers may need format changes; codex-trailer-gate may need patching.
