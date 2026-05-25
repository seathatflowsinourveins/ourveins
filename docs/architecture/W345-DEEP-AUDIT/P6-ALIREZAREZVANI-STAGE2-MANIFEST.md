# W345 P6 — alirezarezvani Stage-2 RETIRE Manifest

> Generated: 2026-05-20T22:50:37.816Z
> Mode: DRY-RUN (no destructive action)
> Cache dir: `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills`

## Stage-1 verification

- alirezarezvani plugins disabled in settings.json: **0** (Stream A audit cited 10-11; 0 confirmed live)
- Operator-sign requirement: FAIL — Stage-1 incomplete; abort

## Stage-2 manifest

- Cache directory exists: false
- File count: 0
- Total bytes: 0 (0.00 MB)

### Files that would be deleted

_(cache directory empty or missing)_

## 7-day rollback gate

1. **T+0 (now)**: Operator runs this script with `--execute` to delete the cache.
2. **T+0..T+7d**: Monitor for regression — any user-facing skill that was unknowingly using alirezarezvani primitives fails fast (sca-v15 D34 existence-probe Stage-0 catches missing namespaces).
3. **T+7d (or sooner if regression)**: Confirm no regression OR git-revert the W316+W342 commits that disabled the plugins.
4. **Rollback command (if needed)**: `git revert <COMMIT-OF-W345-P6-EXECUTE>` AND re-enable plugins in `.claude/settings.json:enabledPlugins`.

## Post-retire verification probe

```bash
# Re-run after Stage-2 execute to confirm no broken references
grep -rl "claude-code-skills" .claude/ docs/ tools/ CLAUDE.md 2>&1 | grep -v node_modules
# Expected: zero hits OR only historical-ledger references (W316/W330/W342/W343 ledgers cite the retire-verdict)
```

## CR-6 verification

- Cite-anchored to CLAUDE.md L62 (W316 retire-verdict)
- Cite-anchored to W343-FULL-EXECUTE/VERDICT-LEDGER.md row Y3 (`MARKETPLACE-DELETE Option A`)
- Cite-anchored to W345-DEEP-AUDIT/VERDICT-LEDGER.md Stream C row 2 (dwell 8+w → -0.5 composite-arch penalty per ops-rhythm)
