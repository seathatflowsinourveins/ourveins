# W373-F012 — Jury Request Brief

**Finding ID**: W373-F012
**Source stream(s)**: A (A-F018)
**Risk-class**: HIGH
**sca-v18**: 2.4 (decomposed: D101=2.5 · D102=2.0 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: plugin_retire

## Subject
`vectorize-io/hindsight@0.6.5` SHA drift (installed `9784f65...` vs HEAD `f2596e1f...`). CLAUDE.md L66 declares hindsight ✗ RETIRED W316-S6 but the plugin record is STILL ENABLED in `installed_plugins.json:397-407` — install-state vs operational-state divergence.

## Evidence (cite-anchored)
- `gh api repos/vectorize-io/hindsight/commits/HEAD` → `f2596e1f...`.
- jq probe of `installed_plugins.json:397-407` → installed SHA `9784f65...`, status ENABLED.
- CLAUDE.md L66: `T1 hindsight ✗ RETIRED (W316-S6 codex-ratified — daemon down + no NSSM service + no LISTEN :9077)`.
- Stream A-F018 evidence.

## Proposed remediation
1. Excise `hindsight-memory@hindsight` entry from `installed_plugins.json:397-407` (align install-state with W316-S6 operational RETIRED state).
2. `/plugin uninstall hindsight-memory@hindsight` (clean uninstall path).
3. Remove from `.claude/settings.json:enabledPlugins` map.
4. Verify CLAUDE.local.md and other config files don't reference hindsight.
5. Document retirement in T6 basic-memory wave-note.

## Risks of the proposed remediation
- Excising the plugin record may delete cached files (`Z:\claude-sota-installed\.claude\plugins\data\hindsight-memory-hindsight\`) — verify backup before deletion.
- If any skill auto-references hindsight (via plugin discovery), removal may surface trigger-resolution errors.
- W295 audit established hindsight as RETIRED-by-design; this is a cleanup commitment, not a re-decision.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json .claude/settings.json` to restore plugin record.
2. `/plugin install hindsight-memory@hindsight@<old-SHA>` to re-install if needed.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — install-state must match operational decisions.
- Cardinal-rule 6 (verify-before-claim): YES — CLAUDE.md L66 says RETIRED but plugin record says ENABLED.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — jq probe of installed_plugins.json + read of CLAUDE.md L66.
2. Is the proposed remediation proportional? — YES; cleanup of dormant install entry.
3. False-positive paths? — The plugin may be "dormant-but-installable" — i.e., kept ENABLED so re-instantiation is fast. If true, retire decision may be premature.
4. Does rollback actually restore prior state? — YES via git checkout.
5. What changes after this fix that wasn't anticipated? — Downstream waves citing hindsight as a memory tier may need explicit handling (e.g., T1 placeholder).
