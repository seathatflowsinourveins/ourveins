# W324 P4 — wshobson/agents@08ded5e7 git-pr-workflows install

## Status: STAGED (operator interactive `/plugin install` required)

CC `/plugin install` is interactive — the auto-confirm path is not exposed via
the JSON-RPC surface this runtime uses. Operator paste-ready:

```
/plugin install git-pr-workflows@claude-code-workflows
```

After install completes, the plugin will appear in `.claude/settings.json`
`enabledPlugins` as `git-pr-workflows@claude-code-workflows: true`. The
marketplace entry already exists under `extraKnownMarketplaces`.

## Cite anchor (codex r11 SHA-pinned)

- https://github.com/wshobson/agents/tree/08ded5e7
- Subdirectory: `plugins/git-pr-workflows/` (verified at SHA via repo-tree probe)
- Falsifiable-inverse: OpenJS conventionalcommits.org spec — convention is
  vendor-neutral; wshobson plugin is a layered consumer, not the source of
  truth.

## P4 sub-conditions

| Sub-condition | Current state |
|---|---|
| `commitlint` ≥17 numeric floor | ✓ `@commitlint/cli@21.0.1` (verified `npm view`) |
| `commitlint.config.js` | ✓ PRESENT (2081 bytes; extends `@commitlint/config-conventional`; 13 types incl `ship` + `wip`; header-max 240) |
| Wired in commit-msg stage | ✓ Per `commitlint.config.js:9` "Wired via .pre-commit-config.yaml commit-msg stage" |
| PreToolUse Bash matcher includes `git commit` | ✓ trivy fs + gitleaks already cover the commit path |
| SessionStart bare-resume detection via POSIX flock(2) | ⏳ DEFERRED W325 (Windows POSIX flock requires WSL2 or msys64 dependency tree; operator-decision) |

## Falsifiable counterfactual (codex r11 ratified)

`IF wshobson/agents abandoned THEN commitlint PreToolUse hook STILL works
because @commitlint/cli is OpenJS-stewarded (https://github.com/conventional-changelog/commitlint)
and the conventionalcommits.org spec is vendor-neutral standard.`

## Ship verdict

P4 commitlint half: ✓ COMPLETE (config + numeric-floor verified).
P4 plugin install: STAGED for operator `/plugin install`.
P4 flock(2) bare-resume: DEFERRED W325 (Windows portability constraint).

W324 ship-gate: P4 partial-complete (commitlint half ✓; plugin install
queued for operator). Does NOT block P0/P1/P2/P3/P5/P6/P7/P8 ship.
