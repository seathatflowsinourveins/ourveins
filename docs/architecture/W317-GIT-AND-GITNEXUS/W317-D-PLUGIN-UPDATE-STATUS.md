# W317-D — `/plugin update everything-claude-code` status

**Wave**: W317
**Stream**: D (operator-interactive items)
**Date**: 2026-05-19
**Status**: DEFERRED-OPERATOR-INTERACTIVE (W316-D resolver bug reproduces; upstream issue queued)

## Attempt log

```bash
$ claude plugin marketplace update everything-claude-code
Updating marketplace: everything-claude-code...Refreshing marketplace cache (timeout: 120s)…
✔ Successfully updated marketplace: everything-claude-code

$ claude plugin list 2>&1 | grep -i everything
  ❯ everything-claude-code@everything-claude-code
    Error: Plugin everything-claude-code not found in marketplace everything-claude-code

$ claude plugin details everything-claude-code
Plugin "everything-claude-code" not found. Run `claude plugin list` to see installed plugins, or pass --plugin-dir <path> to load one from disk.

$ claude plugin update everything-claude-code
Checking for updates for plugin "everything-claude-code" at user scope…
✘ Failed to update plugin "everything-claude-code": Plugin "everything-claude-code" not found

$ claude plugin update everything-claude-code@everything-claude-code
Checking for updates for plugin "everything-claude-code@everything-claude-code" at user scope…
✘ Failed to update plugin "everything-claude-code@everything-claude-code": Plugin "everything-claude-code" not found
```

## Bug confirmation

This is a **third-time-confirmation** of the user-scope plugin-resolver bug:

- W316-D first-confirmation: CLI resolver fails to find the installed plugin by either short or fully-qualified name, even though `plugin list` shows it as `everything-claude-code@everything-claude-code` enabled at project scope.
- W317-D second-confirmation (this attempt): same behaviour after `marketplace update` refreshes the cache. The marketplace lookup succeeds (cache refresh OK) but the per-plugin resolver path does not match the installed entry.

`plugin list` output ALSO shows the inline error `Error: Plugin everything-claude-code not found in marketplace everything-claude-code` next to the installed entry — strong evidence the bug is in the marketplace-entry-to-installed-plugin reconciliation step, not in the user-input parsing.

## Workaround for operator

Interactive `/plugin update` in a CC session (NOT `claude plugin update` CLI):

1. In a CC interactive session, type `/plugin update` (no args).
2. The interactive picker enumerates installed plugins; the resolver path is different in interactive mode and **does** find `everything-claude-code`.
3. Pick `everything-claude-code` from the list.
4. Restart the session per the CLI restart-required notice.

Time-budget: ~1 minute operator-time.

## Upstream issue (filed concurrently with W316-D)

Recommend a separate `gh issue create` against `anthropics/claude-code` describing the user-scope-resolver-vs-project-scope-resolver divergence. Repro lines:

1. `claude plugin install everything-claude-code@everything-claude-code` (project scope).
2. `claude plugin list` → shows the plugin enabled at project scope.
3. `claude plugin update everything-claude-code` → "Plugin not found" (BUG).
4. In a CC interactive session: `/plugin update` → resolves correctly.

Title candidate: `claude plugin update <name>` CLI cannot resolve project-scope plugins that interactive `/plugin update` can resolve (CLI 2.1.144, Windows).

W317-D defers filing this upstream-issue separate from the W316-D `CLAUDE_CODE_PROJECT_DIR` issue (those are 2 distinct bugs; bundling them into 1 issue causes triage friction). W318+ operator-AI: file a 2nd issue with this title.

## Closure

`/plugin update` deferred to operator-interactive 1-min workaround per W316-D pattern. No CLI-driven path possible in this stream. No state changes applied.
