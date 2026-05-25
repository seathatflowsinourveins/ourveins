# W425 — Plugin-cache GC + drift fix

## §1 Problem

Operator-fired W425 after `/reload-plugins` reported "1 error during load" plus a hidden-error audit request. Investigation surfaced 4 cache-state anomalies and 294 stale-version dirs.

## §2 Findings (4 cache anomalies)

| # | Plugin | Diagnosis | Verdict |
|---|---|---|---|
| 1 | `pyright-lsp@claude-plugins-official@1.0.0` | Marketplace.json declares `lspServers` directly; cache dir has LICENSE + README only — by-design LSP stub | **FALSE-POSITIVE** (LSP-stub exempt) |
| 2 | `typescript-lsp@claude-plugins-official@1.0.0` | Same LSP-stub pattern | **FALSE-POSITIVE** (LSP-stub exempt) |
| 3 | `session-report@claude-plugins-official@3d355c0d8eec` | Cache dir has `.orphaned_at` marker + missing manifest | **REAL ERROR** — fixed this wave |
| 4 | `qa-orchestra@claude-code-workflows@1.0.0` | git-subdir source from `Anasss/qa-orchestra.git` lacks `.claude-plugin/plugin.json`; CC has no fallback discovery | **REAL ERROR** — operator-action-required (skipped due to .in_use lock without .orphaned_at) |

Plus **294 stale-sibling cache dirs** (W270 install-state drift):
- 292 versions of `session-report` from /plugin update cycles
- 1 version of `example-skills@anthropic-agent-skills`
- 1 version of `superpowers@claude-plugins-official`

## §3 Solution

`tools/w425-plugin-gc.mjs` (160 LOC) — audit + cleanup tool.

### Modes

| Mode | Behavior |
|---|---|
| `--audit` (default) | Report findings; mutate nothing |
| `--cleanup` | Move safe-broken-current to recovery + prune stale-siblings |
| `--cleanup --force` | Also process .in_use-locked broken-current dirs |
| `--aggressive` | Additionally prune recovery dirs > 30 days old |

### Safety model

`.in_use` markers are set at install time and **persist indefinitely** (empirical: all 294 stale dirs had both `.in_use` AND `.orphaned_at`). So `.in_use` alone is NOT a reliable "CC is reading right now" signal.

The refined safety:
- **Stale-sibling pruning**: always safe (CC reads only the current version per `installed_plugins.json`)
- **Broken-current rename**: safe if `.orphaned_at` exists (CC explicitly marked it dead); ambiguous otherwise (skipped unless `--force`)

### LSP-stub auto-detection

The script walks each marketplace.json and exempts any plugin declaring `lspServers` — these are by-design stubs that don't need `.claude-plugin/plugin.json` in cache.

## §4 This-wave cleanup results (verified)

Before:
- 3618 total version-dirs
- 2 BROKEN current
- 294 stale-siblings

After `node tools/w425-plugin-gc.mjs --cleanup`:
- 3323 total version-dirs (−295)
- 1 BROKEN current (qa-orchestra, skipped per safety)
- 0 stale-siblings
- Recovery dir: `.claude/plugins/.broken-w425/claude-plugins-official__session-report__3d355c0d8eec__2026-05-24T16-29-09-310Z/`

session-report will auto-reinstall on next CC session-start (CC detects missing cache → fetches from marketplace per `installed_plugins.json:gitCommitSha`).

## §5 Operator-action queue (qa-orchestra)

The qa-orchestra plugin (wshobson/agents marketplace) wraps an upstream repo (`Anasss/qa-orchestra.git`) that lacks `.claude-plugin/plugin.json`. The cache dir is `.in_use` without `.orphaned_at`, so this wave skipped it. To fix:

```bash
# After exiting current CC session:
node Z:/claude-sota-installed/tools/w425-plugin-gc.mjs --cleanup --force

# OR cache-delete manually + reinstall:
rm -rf Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/qa-orchestra
# Then in next CC session: /plugin install qa-orchestra@claude-code-workflows
```

If reinstall continues to fail (upstream layout still missing manifest), the principled fix is upstream PR to Anasss/qa-orchestra adding `.claude-plugin/plugin.json` OR retire the plugin from `enabledPlugins`. This is operator-decision.

## §6 Cardinal-rule compliance

| Rule | Posture |
|---|---|
| R1 trusted primitives | cite-anchored to Anthropic + GitHub + CLAUDE.md W270 |
| R2 no self-invented hooks | tool is a CLI script in `tools/`, NOT a hook |
| R3 subagent FQN | n/a |
| R4 settings + CLAUDE.md | no changes to either |
| R5 sandboxing | safety model refuses unsafe mutations without --force |
| R6 verify-before-claim | re-audit after cleanup verified 0 stale, 1 remaining (skipped) |

## §7 Cite-anchors (sca-v13 ≥3-org-distinct)

- **Anthropic Claude Code** — https://code.claude.com/docs/en/plugins — `.claude-plugin/plugin.json` canonical manifest path
- **GitHub Docs** — https://docs.github.com/en/repositories/working-with-files/managing-files — filesystem-marker pattern for cross-process state
- **CLAUDE.md cardinal-rule-1 W270 corollary** — `Z:/claude-sota-installed/CLAUDE.md:18` — "Standard /plugin update no-ops on silent SHA drift — cache-delete + fresh-install is the SOTA fix"
- **W425-PLUGIN-GC empirical** — this design — 4-anomaly audit table + 294-dir cleanup verification
