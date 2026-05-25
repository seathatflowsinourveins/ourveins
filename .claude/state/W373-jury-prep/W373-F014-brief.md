# W373-F014 — Jury Request Brief

**Finding ID**: W373-F014
**Source stream(s)**: A (A-F011)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: plugin_retire (marketplace refresh)

## Subject
`claude-plugins-official` marketplace HEAD is `3449c10c...`. 18 of 19 official plugins are on that SHA, BUT 6 outliers (pyright-lsp, ralph-loop, cwc-makers, code-simplifier, claude-code-setup, claude-md-management) are still on the prior `f8059ee4...` SHA — in-marketplace SHA drift.

## Evidence (cite-anchored)
- `gh api repos/anthropics/claude-plugins-official/commits/HEAD` → `3449c10c...`.
- jq probe of `installed_plugins.json`: 18 plugins with `gitCommitSha=3449c10c`, 6 outliers with `gitCommitSha=f8059ee4`.
- Stream A-F011 evidence.
- Affected plugins enumerated: pyright-lsp, ralph-loop, cwc-makers, code-simplifier, claude-code-setup, claude-md-management.

## Proposed remediation
1. For each of the 6 outlier plugins: `/plugin update <name>@claude-plugins-official` to bump to `3449c10c`.
2. `/reload-plugins` to surface fresh installs.
3. Verify `installed_plugins.json` reflects unified SHA `3449c10c` for all 19.
4. If `/plugin update` no-ops, fall back to W270 cache-delete + fresh-install pattern per plugin.

## Risks of the proposed remediation
- Bulk-refresh may trigger 6 plugins to surface skill-trigger changes (CR-4 corollary audit may need re-running).
- One outlier `claude-md-management` is a CLAUDE.md-touching plugin; behavior change risk is highest there.
- W341/W342 audit history shows official-marketplace plugins occasionally flip enabled state on refresh; verify post-refresh.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json .claude/settings.json` to restore prior SHAs.
2. `/plugin uninstall` + `/plugin install` at prior `f8059ee4` SHA per plugin (if installer supports).

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES — in-marketplace drift IS a freshness violation.
- W270 cardinal-rule-1 corollary: install-state drift governance.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — jq probe + gh api.
2. Is the proposed remediation proportional? — YES; per-plugin refresh is canonical.
3. False-positive paths? — The 6 outliers may be intentionally pinned to prior SHA (e.g., known-good baseline). Verify CLAUDE.md and operator notes.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Skill-bundle changes may surface; bulk-refresh may need CR-4 trigger audit per plugin.
