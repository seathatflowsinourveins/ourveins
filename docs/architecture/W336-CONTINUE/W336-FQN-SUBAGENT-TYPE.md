# W336 — FQN Subagent-Type Discipline

> **Status**: stub created by W373-F005 to repair broken CLAUDE.md cite.
> **Operator-sign**: pending.

Per W333 Stream D Finding #5: bare `subagent_type` values are collision-prone (14 colliding bare names per W340 F4 surface — re-verified 2026-05-22 via W373-F006/F008 live allowlist header `_colliding_bare_count:14`). MUST use FQN form `<plugin>:<agent-name>`.

## The one sanctioned bare-name

`general-purpose` is the **ONE** sanctioned bare-name (always valid). All other bare dispatches MUST use FQN.

## Live allowlist counts (W370 Stream C re-probe 2026-05-22, ratified by W373-F006/F008/F009)

| Bucket | Count | Source |
|--------|-------|--------|
| FQN entries (`allow[]`) | 174 | `.claude/state/subagent-type-allowlist.json:_count` |
| Legacy bare entries (`legacy_bare_aliases[]`) | 138 | `_legacy_bare_count` |
| Colliding bare names | 14 | `_colliding_bare_count` (was 13 per W340 F4) |
| Orphaned FQN preserved | 43 | `_orphaned_fqn_count` (was 38) |
| Total known | 312 | 174 FQN + 138 legacy bare |

## Why FQN is required

`code-reviewer` collides across **6 plugins**: `agent-skills`, `comprehensive-review`, `feature-dev`, `incident-response`, `pr-review-toolkit`, `tdd-workflows`. Bare-name dispatch produces non-deterministic plugin resolution.

FQN form examples:
- `pr-review-toolkit:code-reviewer` — explicit
- `agent-teams:team-debugger` — explicit
- `general-purpose` — sanctioned bare (always valid)

## Enforcement

- Pre-flight validation at `tools/preagent-subagent-validator.mjs` (W340-patched per W333-D5 migration)
- Unknown `subagent_type` → HARD-BLOCK exit 2 with fuzzy top-5 suggestions
- Soft-fail exit 0 fires ONLY if allowlist file deleted/corrupted (operator-broken-state fallback)
- Regenerate via `node tools/build-subagent-allowlist.mjs --regenerate`

## Cites

- This runtime `CLAUDE.md` cardinal-rule-3 corollary
- W340 F3/SB-3 regenerated allowlist (2026-05-20)
- W333 Stream D Finding #5 (P2-2 W335 codify 2026-05-20)
- W370 Stream C F2/F4 live re-probe (2026-05-22)
- W373-F005 cite-repair (2026-05-22 — creating this file)
- W373-F006/F008/F009 live count sync (14 colliding / 43 orphaned)
