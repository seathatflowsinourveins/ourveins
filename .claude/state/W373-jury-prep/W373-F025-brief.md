# W373-F025 — Jury Request Brief

**Finding ID**: W373-F025
**Source stream(s)**: A (A-F021)
**Risk-class**: HIGH
**sca-v18**: 2.6 (decomposed: D101=2.5 · D102=2.5 · D103=3.0 · D104=2.0 · D105=3.0)
**Remediation type**: settings_surgery

## Subject
`typescript-lsp@claude-plugins-official` has TWO records in `installed_plugins.json:334-352` — one `scope: project`, one `scope: user`, SAME version 1.0.0 but DIFFERENT `gitCommitSha` (`f8059ee4...` vs `68d89cacfe652773cc6b7f4a998a43b0ecc3b07b`). Dual-scope shadowing risk.

## Evidence (cite-anchored)
- Direct read of `installed_plugins.json:334-352` (Stream A-F021).
- Two entries for `typescript-lsp` with different `gitCommitSha` AND different `scope` (project vs user).
- Same `version: 1.0.0`.

## Proposed remediation
1. Probe Claude Code plugin-resolution order: which scope wins (project or user)?
2. Decide on canonical scope:
   - **Path A**: Project-scope wins → remove user-scope record. Risk: user-scope may be operator-curated.
   - **Path B**: User-scope wins → remove project-scope record. Risk: project-state churns on per-worktree basis.
3. Align `gitCommitSha` to the chosen scope's value.
4. Document scope-decision in CLAUDE.md (which-scope-wins rule).

## Risks of the proposed remediation
- Wrong-scope removal may surface plugin not-found errors.
- typescript-lsp is an LSP server; behavior changes affect language-server protocol clients (IDE/editor integration).
- F014 (claude-plugins-official outliers) may already plan to bump `f8059ee4` → `3449c10c`; check if typescript-lsp is on the outlier list and coalesce.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json` to restore both records.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — dual-scope shadowing is install-state ambiguity.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-read installed_plugins.json:334-352.
2. Is the proposed remediation proportional? — YES; scope-decision is required.
3. False-positive paths? — Dual-scope may be intentional (e.g., per-user override of project default). Check Claude Code docs for canonical resolution.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — IDE/editor clients may surface LSP re-init events.
