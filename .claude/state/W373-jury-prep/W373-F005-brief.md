# W373-F005 — Jury Request Brief

**Finding ID**: W373-F005
**Source stream(s)**: A (A-F013)
**Risk-class**: HIGH
**sca-v18**: 2.0 (decomposed: D101=2.0 · D102=2.0 · D103=2.5 · D104=1.5 · D105=2.0)
**Remediation type**: plugin_retire (refresh upstream pull)

## Subject
`everything-claude-code@everything-claude-code` plugin pinned at SHA `8148340ad14eb32c971346f0cb4cb9431ec0f5de` — upstream HEAD is `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed`; 100+ commits per 30 days (very hot upstream); 2.0.0-rc.1 version-string but content has drifted significantly.

## Evidence (cite-anchored)
- `gh api repos/affaan-m/everything-claude-code/commits/HEAD` → `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed`.
- Installed SHA in `.claude/plugins/installed_plugins.json` (Stream A §A-F013 record).
- Cadence: 100+ commits in trailing 30 days.
- W270 cardinal-rule-1 corollary: cache-delete + fresh-install required when version-string is unchanged but content drifted (standard `/plugin update` silent no-op).

## Proposed remediation
1. `rm -rf .claude/plugins/cache/everything-claude-code` (CR-2 sanctioned: cache-only deletion).
2. `/plugin uninstall everything-claude-code@everything-claude-code` then `/plugin install everything-claude-code@everything-claude-code` (W270 fresh-install pattern).
3. `/reload-plugins` to surface fresh install.
4. Verify new SHA written to installed_plugins.json matches upstream HEAD.

## Risks of the proposed remediation
- ECC plugin is wide-surface (skills + hooks + commands + memory MCP shim); fresh install may surface unexpected new triggers or removed features.
- Risk of skill-trigger over-fire: 100+ commits worth of skill `description:` changes may trigger different auto-fire patterns.
- Hooks under `.claude/plugins/cache/everything-claude-code/hooks/hooks.json` may have changed contract — verify no settings.json hook references break.
- W341 phantom-enabled history shows ECC has been disabled/re-enabled before; verify enablement state post-install.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json .claude/settings.json` to restore prior plugin pin and enablement.
2. `rm -rf .claude/plugins/cache/everything-claude-code` to clear new install.
3. Re-install from old SHA: `/plugin install everything-claude-code@everything-claude-code@8148340ad14eb32c971346f0cb4cb9431ec0f5de` (if installer supports SHA pinning).

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — trust-tuple condition-d (freshness).
- W270 cardinal-rule-1 corollary: install-state drift governance.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `gh api`.
2. Is the proposed remediation proportional? — ECC is hot; refresh discipline is required, but blast-radius is wide.
3. False-positive paths? — The `2.0.0-rc.1` version-string match may mean upstream maintainer intentionally kept it RC during evolution; fresh install may be premature.
4. Does rollback actually restore prior state? — YES, given the pre-W373 plugin record.
5. What changes after this fix that wasn't anticipated? — Skill bundle may grow/shrink; some skills' `description:` triggers may have shifted, surfacing CR-4 corollary violations.
