# W373-F004 — Jury Request Brief

**Finding ID**: W373-F004
**Source stream(s)**: A (A-F001)
**Risk-class**: HIGH (CRITICAL subset)
**sca-v18**: 1.5 (decomposed: D101=1.5 · D102=1.5 · D103=2.0 · D104=1.0 · D105=1.5)
**Remediation type**: worktree_prune (structural fix; cache mirror)

## Subject
`.claude/plugins/cache/` is ABSENT in the W373 worktree — all 47 `installed_plugins` records point to the PARENT runtime `Z:/claude-sota-installed/.claude/plugins/cache/`. W373 worktree has only 2 files in `.claude/plugins/`.

## Evidence (cite-anchored)
- `ls Z:/claude-sota-installed-W373/.claude/plugins/` → returns only `installed_plugins.json` + `known_marketplaces.json`.
- No `cache/` or `marketplaces/` subdirs in the worktree.
- All 47 `installed_plugins.json` records reference `Z:/claude-sota-installed/.claude/plugins/cache/...`.
- Stream A §A-F001 evidence.

## Proposed remediation
Two paths — jury must choose:
1. **By-design path** (preferred): Confirm that worktrees share the parent runtime's plugin cache (intentional, per Claude Code worktree semantics). Annotate CLAUDE.md to clarify worktree plugin-cache inheritance. Verify by running an installed-plugin tool from the W373 worktree (e.g., `mcp__codegraph__codegraph_status`) — if it works, sharing is confirmed.
2. **Mirror path**: Re-clone/sync plugin cache from parent runtime to W373 worktree (one-shot `robocopy` operation). Risk: doubles disk footprint per worktree; CLAUDE.md L14 `~5 parallel cap` may need re-tuning.

## Risks of the proposed remediation
- By-design path: if assumption wrong, plugin tools may silently fail in this worktree.
- Mirror path: disk-footprint explosion (5 worktrees × full cache); cache-staleness if parent runtime updates plugins.
- Cardinal-rule 1 corollary (trust-tuple): per-worktree caches may drift independently.

## Rollback steps
1. By-design confirmation: no rollback needed (annotation only).
2. Mirror rollback: `rm -rf .claude/plugins/cache/ .claude/plugins/marketplaces/` (revert to original 2-file state).

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — install-state must be verifiable per worktree.
- W373 spec §Top-jury-priority sca<2.0: aligns with #4 jury candidate.
- CLAUDE.md L14 worktree-cap=5 discipline: YES — worktree cache strategy affects cap.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `ls Z:/claude-sota-installed-W373/.claude/plugins/` to confirm.
2. Is the proposed remediation proportional? — By-design path is minimal; mirror path is heavy.
3. False-positive paths? — Plugin tools may actually work via CLAUDE_PLUGIN_DATA env redirect (per CLAUDE.local.md). Test: invoke a plugin tool from W373.
4. Does rollback actually restore prior state? — YES for both paths.
5. What changes after this fix that wasn't anticipated? — If by-design, future worktrees inherit; if mirror, future worktrees need same setup → eee.ps1 needs update.
