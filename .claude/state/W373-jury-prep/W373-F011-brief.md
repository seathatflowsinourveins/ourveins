# W373-F011 — Jury Request Brief

**Finding ID**: W373-F011
**Source stream(s)**: E (E-F006)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=3.0 · D104=2.0 · D105=2.5)
**Remediation type**: hidden_error_fix (probe-first)

## Subject
T2 sqlite_vec target dir is NOT FOUND. CLAUDE.md declares `everything-claude-code:memory` as the canonical T2 KG fallback; `ls .claude/plugins/data/everything-claude-code/` is absent on both the W373 worktree and the canonical root. Zero `*.db` files under depth-3 scan.

## Evidence (cite-anchored)
- Stream E §Memory-tier matrix T2 row.
- `ls Z:/claude-sota-installed-W373/.claude/plugins/data/` → does not exist on W373.
- `ls Z:/claude-sota-installed/.claude/plugins/data/` → has `hindsight-memory-hindsight/` (venv only, no .db) + `mcp-memory-service-mcp-memory-service/` (empty); no `everything-claude-code/` subdir.
- Depth-3 scan: zero `*.db` files.
- `CLAUDE_MEM_DATA_DIR` env per CLAUDE.local.md L57 not yet re-probed at expected target.

## Proposed remediation
1. Probe under `CLAUDE_MEM_DATA_DIR` env target: `ls $env:CLAUDE_MEM_DATA_DIR` (expected: `Z:\claude-sota-installed\.claude\plugins\data\claude-mem`).
2. If `.db` files present at that target, T2 IS instantiated (just under a different dir). Update CLAUDE.md L36 to reflect actual storage path.
3. If absent at that target too, T2 has never instantiated on this machine. Decide:
   - **Path A**: Force instantiation by invoking a memory-store tool (e.g., `mcp__plugin_everything-claude-code_memory__search_nodes`) and verify `.db` creation.
   - **Path B**: Retire T2 from CLAUDE.md memory-stack — T2 is not actually operational.

## Risks of the proposed remediation
- Path A: forcing instantiation may surface schema migration errors if ECC plugin version drifted.
- Path B: retiring T2 affects W295-audit canonical-memory architecture; downstream waves may rely on T2 fallback semantics.
- Path-A failure would cascade into F005 (ECC plugin refresh decision).

## Rollback steps
1. Path A rollback: `rm -rf .claude/plugins/data/everything-claude-code/` to clear partial instantiation.
2. Path B rollback: `git checkout HEAD -- CLAUDE.md` to restore T2 row.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — CLAUDE.md T2 row must reflect actual state.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `ls` on all three candidate paths.
2. Is the proposed remediation proportional? — Probe-first is minimal; commit to action only after probe confirms.
3. False-positive paths? — T2 may store .db under a fully different path (e.g., `~/.claude-mem`); operator may have customized.
4. Does rollback actually restore prior state? — YES for both paths.
5. What changes after this fix that wasn't anticipated? — Path A: T2 instantiation may consume disk space; Path B: KG fallback architecture changes downstream.
