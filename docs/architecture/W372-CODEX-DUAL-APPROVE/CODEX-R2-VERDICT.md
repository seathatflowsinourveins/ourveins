+      violations.push({ path: dir, size: 0, kind: 'unreadable-dir' });
+    }
+    return;
+  }
   // W371 Mitigation C: empty-dir shell at depth>0 is a violation (phantom-mkdir evidence)
   if (entries.length === 0 && depth > 0) {
     violations.push({ path: dir, size: 0, kind: 'empty-dir-shell' });
@@ -73,13 +97,17 @@ if (depthCapHits > 0) {
 }
 
 if (violations.length === 0) {
-  process.stderr.write('[z-phantom-guard] PASS — Z:\\z\\ contains 0 files\n');
+  // Codex r1 W372 fix-4: "0 entries" not "0 files" — empty-dir-shells / symlinks / unreadable
+  // dirs are also violations now, not just regular files.
+  process.stderr.write('[z-phantom-guard] PASS — Z:\\z\\ contains 0 entries\n');
   process.exit(0);
 }
 
-process.stderr.write(`[z-phantom-guard] BLOCK — ${violations.length} file(s) under Z:\\z\\:\n`);
+// Codex r1 W372 fix-4: pluralize "entry/entries" + surface `kind` so operator sees WHY
+// (empty-dir-shell vs file vs symlink vs unreadable-dir) and knows the right remediation.
+process.stderr.write(`[z-phantom-guard] BLOCK — ${violations.length} unexpected entr${violations.length === 1 ? 'y' : 'ies'} under Z:\\z\\:\n`);
 for (const v of violations.slice(0, 10)) {
-  process.stderr.write(`  ${v.path} (${v.size}B)\n`);
+  process.stderr.write(`  ${v.path} (${v.kind}, ${v.size}B)\n`);
 }
 process.stderr.write(`
 Root: codex-openai-codex (and possibly other) plugins write to /z/<project>/.claude/plugins/data/...

codex
VERDICT: APPROVE

DEFENSE PER FLAW:
1. r1-flaw-1: HOLD-BUT-DOWNRATE — r1 was proven against W371, but W372 now has `tools/codex-patch-present-probe.mjs` and it passes today. Not wiring it means drift is not automatically caught, so residual risk remains, but the finding is no longer a HIGH blocker if plugin updates are operator-triggered and the probe is run post-update.
2. r1-flaw-2: HOLD-BUT-OVERSTATED — cross-plugin audit gap is real, but r1 did not prove other consumers write phantom paths. `session-lifecycle-hook.mjs` propagates raw `CLAUDE_PLUGIN_DATA`; ECC root resolvers mostly read/resolve `CLAUDE_PLUGIN_ROOT`. This is a MED audit gap, not a proven HIGH recurrence.
3. r1-flaw-3: DISMISSED — fixed. Current `state.mjs` handles `/z/foo`, `/z/`, `/Z/path`, and `/z\path` with mixed-separator normalization.
4. r1-flaw-4: DISMISSED in today’s worktree — current guard says `0 entries`, reports `entry/entries`, and includes violation `kind`. Note: this contradicts the prompt’s “reverted” claim.
5. r1-flaw-5: DISMISSED in today’s worktree — unreadable subdirs below root are now recorded as `unreadable-dir` violations.
6. r1-flaw-6: DISMISSED in today’s worktree — bypass now writes `.claude/state/z-phantom-guard-bypass.jsonl` best-effort before exiting.
7. r1-flaw-7: HOLD — I found replayable proof for the new probe (`node tools/codex-patch-present-probe.mjs`), but not a W372 closure artifact containing reproducible transcripts for the older W371 §6 claims. This remains documentation debt, not mitigation failure.
8. r1-flaw-8: OVERSTATED — CR-5 concern is legitimate, but the guard is a pre-commit detection gate with explicit escape hatch comments, not a runtime permission-boundary replacement. Needs clearer exception record, but not a blocker.
9. r1-flaw-9: HOLD-AS-LOW — commit body audit-trail typo remains historical. Code behavior is correct; recovery docs should not rely on that line.

RESIDUAL RISK:
- `codex-patch-present-probe.mjs` is sufficient as a drift detector when wired, but it is marker-based. It can miss semantic partial clobbers where markers remain but behavior changes, and it can race a mid-update if run concurrently with plugin replacement.
- Add a behavior probe later: import/call equivalent normalization cases, or execute `resolveStateDir()` under `CLAUDE_PLUGIN_DATA=/z/w372-canary/...` and assert no `Z:\z\...` result.
- Cross-plugin confirmation should use a concrete canary: run the three suspect hooks with `CLAUDE_PLUGIN_DATA=/z/w372-canary/data`, `CLAUDE_PLUGIN_ROOT=/z/w372-canary/root`, and an fs-write tap via `NODE_OPTIONS=--require tmp/phantom-fs-tap.cjs` that logs `mkdirSync/writeFileSync/appendFileSync/renameSync/cpSync/rmSync/createWriteStream` targets. PASS only if no writes resolve under `Z:\z\w372-canary`.
- The prompt and worktree disagree on the z-phantom-guard revert. Today’s artifacts include the r1 fixes, but they appear modified/uncommitted in `git status`.

CONFIDENCE: MED-HIGH
