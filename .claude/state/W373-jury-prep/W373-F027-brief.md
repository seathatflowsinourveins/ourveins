# W373-F027 — Jury Request Brief

**Finding ID**: W373-F027
**Source stream(s)**: A (A-F025)
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=3.0 · D103=3.0 · D104=2.5 · D105=3.5)
**Remediation type**: settings_surgery (regenerate allowlist)

## Subject
`subagent-type-allowlist.json` declares 174 FQN + 138 legacy + 14 colliding + 43 orphan. CLAUDE.md L23-26 reports earlier counts (38, 33) — silent drift; orphan-source root is unaudited.

## Evidence (cite-anchored)
- Direct read of `subagent-type-allowlist.json` header (Stream A-F025).
- Header `_count: 174` matches Stream C F1 (verified).
- CLAUDE.md L23-26 reports older counts; L35 already corrected (W370 footnote).

## Proposed remediation
1. `node tools/build-subagent-allowlist.mjs --regenerate` (P0-A path per CLAUDE.md L26).
2. Audit the 43 orphan-FQN entries: which plugins do they belong to? Are they leftovers from uninstalled plugins?
3. If orphan-source plugins are confirmed uninstalled, document them as "preserved for forward-compat" OR remove from allowlist.
4. Verify CLAUDE.md L23-26 reflects the new counts post-regen.
5. Coalesce with F013 (which fixes L20↔L35 sync).

## Risks of the proposed remediation
- Regen may surface unexpected drops (subagent_types that prior allowlist had but new generation doesn't).
- F015 (wshobson refresh) and F026 (superpowers refresh) MUST land before F027 regen — otherwise the allowlist will reflect stale plugin SHAs.
- Orphan-FQN audit may surface unexplained entries (could be artifacts of multi-wave installs).

## Rollback steps
1. `git checkout HEAD -- .claude/state/subagent-type-allowlist.json` to restore prior allowlist.
2. Re-run `tools/build-subagent-allowlist.mjs --regenerate` if needed (idempotent).

## Cardinal-rule + spec alignment
- Cardinal-rule 3 (subagents = installed upstream agents): YES — allowlist IS the canonical mechanism.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — jq probe.
2. Is the proposed remediation proportional? — YES; regen is the canonical action.
3. False-positive paths? — Orphan-FQN entries may be intentional (preserved for back-compat). Check T6 memory + L329-1 FM-class learnings.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Future Agent dispatches with previously-orphaned subagent_types may HARD-BLOCK; downstream waves may need fuzzy-suggestion fallback.
