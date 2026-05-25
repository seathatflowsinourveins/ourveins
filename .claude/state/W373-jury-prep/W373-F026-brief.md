# W373-F026 — Jury Request Brief

**Finding ID**: W373-F026
**Source stream(s)**: A (A-F020)
**Risk-class**: HIGH
**sca-v18**: 2.7 (decomposed: D101=2.5 · D102=2.5 · D103=3.0 · D104=2.5 · D105=3.0)
**Remediation type**: plugin_retire

## Subject
`obra/superpowers-marketplace` HEAD is `89e817bac...` vs installed `f2cbfbef...` superpowers@5.1.0 — drift; 14 commits per 30 days.

## Evidence (cite-anchored)
- `gh api repos/obra/superpowers-marketplace/commits/HEAD` → `89e817bac...` (Stream A-F020).
- Installed `superpowers@5.1.0` at SHA `f2cbfbef...`.
- Cadence: 14 commits per 30 days.
- Superpowers is a primary skill source (CLAUDE.md L10 lists 9 superpowers skills).

## Proposed remediation
1. `/plugin update superpowers@superpowers-marketplace` (W270 fresh-install pattern).
2. If standard `/plugin update` no-ops (silent SHA drift), W270 cache-delete + fresh-install.
3. `/reload-plugins` post-update.
4. Verify all 9+ superpowers skills surface unchanged (CR-4 corollary trigger audit).

## Risks of the proposed remediation
- Superpowers is a primary skill source; refresh affects auto-fire patterns.
- Skill descriptions may have changed; trigger audit needed.
- F015 (wshobson) and F026 (superpowers) bulk-refreshes together may surface unexpected cross-source interactions.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json .claude/settings.json`.
2. `/plugin uninstall superpowers@superpowers-marketplace` + `/plugin install` at prior SHA.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES.
- Cardinal-rule 3 (subagents = installed upstream agents): YES — superpowers is a primary agent source.
- W270 cardinal-rule-1 corollary: install-state drift governance.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `gh api` + installed_plugins.json read.
2. Is the proposed remediation proportional? — YES; canonical refresh.
3. False-positive paths? — Superpowers may have intentional pin per operator (e.g., known-good baseline for primary skill source). Check T6 memory.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — CR-4 trigger audit may surface new skill triggers; allowlist (F027) may need regen post-update.
