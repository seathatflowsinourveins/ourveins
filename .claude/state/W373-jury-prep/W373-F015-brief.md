# W373-F015 — Jury Request Brief

**Finding ID**: W373-F015
**Source stream(s)**: A (A-F012)
**Risk-class**: HIGH
**sca-v18**: 2.8 (decomposed: D101=3.0 · D102=2.5 · D103=3.0 · D104=2.5 · D105=3.0)
**Remediation type**: plugin_retire (marketplace refresh)

## Subject
`wshobson/agents` (claude-code-workflows marketplace) HEAD is `b2b62b2b...` with 34 commits per 30 days. Installed plugins show 3 SHAs: `34632bcb...` × 14, `08ded5e7...` × 3, `5df9ad40...` × 1 (`qa-orchestra`) — at least 3 marketplace pulls have drifted.

## Evidence (cite-anchored)
- `gh api repos/wshobson/agents/commits/HEAD` → `b2b62b2b...`.
- jq probe of `installed_plugins.json`: 3 distinct SHA clusters across 18 wshobson plugins.
- Cadence: 34 commits per 30 days (medium-hot upstream).
- Stream A-F012 evidence.

## Proposed remediation
1. For each wshobson plugin, `/plugin update <name>@claude-code-workflows` to bulk-bump to `b2b62b2b`.
2. `/reload-plugins` post-update.
3. Verify all 18 wshobson records show unified SHA `b2b62b2b`.
4. If standard `/plugin update` no-ops (W270 silent drift), fall back to cache-delete + fresh-install.

## Risks of the proposed remediation
- Bulk-refresh of 18 plugins is wide-surface; skill-trigger changes likely.
- wshobson agents are primary subagent_type sources (comprehensive-review, agent-teams family); behavior changes can affect downstream dispatches.
- The 3 SHA clusters may reflect intentional staggered-pin (operator-curated); verify with CLAUDE.md and operator notes before bulk-bump.

## Rollback steps
1. `git checkout HEAD -- .claude/plugins/installed_plugins.json .claude/settings.json` to restore prior SHAs.
2. Per-plugin `/plugin uninstall` + `/plugin install` at prior SHA.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (trust-tuple condition-d freshness): YES.
- Cardinal-rule 3 (subagents = installed upstream agents): YES — wshobson is a primary agent source; refresh affects allowlist (F027).
- W270 cardinal-rule-1 corollary: install-state drift governance.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — jq probe + gh api.
2. Is the proposed remediation proportional? — YES; bulk-refresh is canonical, but high-impact.
3. False-positive paths? — 3 SHA clusters may be staggered-by-design (operator policy). Check T6 basic-memory for prior decisions.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — F027 (allowlist regen) may need re-running post-refresh; subagent_type allowlist will likely grow/shrink.
