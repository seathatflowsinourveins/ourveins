# W316-D — ECC plugin update probe

**Wave**: W316
**Stream**: D
**Date**: 2026-05-19
**Status**: DEFERRED-TO-OPERATOR (claude plugin update CLI sub-command not recognized for this plugin in CLI 2.1.144)

## Target

Update `everything-claude-code@everything-claude-code` plugin from cached `gitCommitSha: 841beea45cb25ba51f29fa45b7e272938d19b80a` (lastUpdated 2026-05-18T05:29:15Z) to upstream HEAD `f3cd00625222` (target identified by W315-r2 Stream A as the latest commit on upstream main as of W316 wave-start).

## Probe results

Attempted these forms via Claude Code CLI 2.1.144:

```
$ claude plugin update everything-claude-code
Checking for updates for plugin "everything-claude-code" at user scope…
✘ Failed to update plugin "everything-claude-code": Plugin "everything-claude-code" not found

$ claude plugin update everything-claude-code@everything-claude-code
Checking for updates for plugin "everything-claude-code@everything-claude-code" at user scope…
✘ Failed to update plugin "everything-claude-code@everything-claude-code": Plugin "everything-claude-code" not found
```

Both forms fail with "Plugin ... not found" even though `claude plugin list` clearly shows `❯ everything-claude-code@everything-claude-code` as installed at project scope (`Z:\claude-sota-installed`).

The cache directory at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` exists but has no `.git/` — the cache layer is a content-extracted snapshot, not a git working copy, so `git pull` is not the right primitive either.

## Why the operator path matters

Per CCBP `https://code.claude.com/docs/en/plugins` and Anthropic plugin-install primitives discipline (CLAUDE.md CR-1), plugin updates SHOULD flow through:

1. `claude plugin update <name>` — currently failing
2. `claude plugin remove <name>` + `claude plugin install <name>` — operator can verify via `/plugin remove` and `/plugin install` slash commands
3. Cache deletion + fresh `/plugin install` — the W270 "install-state drift governance" fix when (1) and (2) no-op

The `gitCommitSha` field in `installed_plugins.json` confirms the cache layer has authoritative provenance; the CLI presumably resolves the marketplace and pulls deltas, but the resolver appears confused about whether the plugin is at user or project scope.

## Recommended operator action

Open an interactive Claude Code session and run the slash command:

```
/plugin update everything-claude-code
```

If that fails the same way, escalate to:

```
/plugin remove everything-claude-code@everything-claude-code
/plugin install everything-claude-code@everything-claude-code
/reload-plugins
```

After the update, verify:

```bash
jq '.plugins["everything-claude-code@everything-claude-code"][0].gitCommitSha' \
  Z:/claude-sota-installed/.claude/plugins/installed_plugins.json
```

Expected post-update: a SHA newer than `841beea45cb25ba51f29fa45b7e272938d19b80a` — ideally `f3cd00625222` or the latest upstream HEAD at update time.

## W316-D verdict

ECC plugin update NOT SHIPPED this stream — CLI surface for `plugin update` does not accept the full namespaced form, and W316 Stream D as a non-interactive agent cannot drive the interactive `/plugin` slash command. **Forwarded as operator-AI W316-D-ECC-OPERATOR** (single command, ~1-minute operator action).

## Cite

- CLAUDE.md CR-1 — trusted-plugin install primitives + `https://code.claude.com/docs/en/plugins`
- CLAUDE.md L34 Run-time state — ECC `841beea` 8+ commits behind upstream `f3cd00625222`
- CLAUDE.md (W314 AI-r2-1 + W315-r2 carry-forward) — original ECC update target was `33ed494a`, now superseded by `f3cd00625222`
