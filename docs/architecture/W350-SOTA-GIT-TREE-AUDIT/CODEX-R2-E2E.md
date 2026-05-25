# CODEX-R2-E2E — W351 Closure Adversarial Review

## §1 Verdict

**REVISE-AND-SHIP**. This is **self-review (codex exec GPT-5.5 unavailable/not invoked in this environment)**, so every finding below is labeled accordingly.

W350 is directionally SOTA-compliant: it ships branch-per-task discipline, force-with-lease posture, state allowlist repair, and a reversible branch-consolidation script. Evidence: W350 HEAD `afe0c0f` adds six files/change-sets, including `.gitignore`, `CLAUDE.md`, subagent allowlist, W350 synthesis, Fork-B research, and branch-consolidation script (`git -C Z:/claude-sota-installed-W350 show --name-status --oneline HEAD`).

Regressions/gaps remain before final W351 ship: W350 `CLAUDE.md` still says `~3 parallel cap` at `Z:/claude-sota-installed-W350/CLAUDE.md:14`, local skills are still `50` at `Z:/claude-sota-installed-W350/CLAUDE.md:31`, and enabled plugin count is `58` at `Z:/claude-sota-installed-W350/CLAUDE.md:35`. The requested 53→58 / 173→174 / ~3→~5 drift-fix is therefore not yet evidenced in W350 HEAD.

## §2 W351-queue execution-order analysis

**Self-review finding:** correct order is:

1. Land non-destructive local fixes first: CLAUDE.md drift-fix, git-config dedup, SHA-pin sweep.
2. Run trailing Codex-Verdict gate after the SHA-pin sweep, because the sweep is a security-sensitive workflow edit and should be reviewed in its final form. W350 itself lists SHA pinning as deferred W351 work at `Z:/claude-sota-installed-W350/docs/architecture/W350-sota-git-tree-foundation/W350-SYNTHESIS.md:119-122` and identifies floating action refs as HIGH/MED at lines 90-98.
3. Push with `--force-with-lease` only after all local commits and gates pass. The project’s own parallel-session rule requires `git push --force-with-lease` at `Z:/claude-sota-installed-W350/CLAUDE.md:48`.
4. Branch-consolidation LIVE should run **after** the final branch push/merge checkpoint, not before. Its script mutates remote refs through tag creation and branch deletion (`BRANCH-CONSOLIDATION-SCRIPT.sh:97-115`). A failed final push after deleting stale branches would leave cleanup state advanced while W351 ship state is not.

DRY-RUN can run before push; LIVE should run after the final W351 commit is present on origin and the operator has reviewed DRY-RUN output. The script already encodes dry-run and tag-first safety at `BRANCH-CONSOLIDATION-SCRIPT.sh:9-17,88-90`.

Blocking relation: git-config dedup is independent but should happen before any rebase/push. Probe shows duplicates now: `git config --get-all pull.rebase` returned `false` and `true`; `git config --get-all push.useforceifincludes` returned `true` twice.

## §3 Cite-anchor spot-checks

1. **Self-review verified:** META-AUDIT claims `.pre-commit-config.yaml:55` invokes commitlint. Current lines show id at `Z:/claude-sota-installed/.pre-commit-config.yaml:55` and entry at `:62`: `commitlint --strict --edit "$(git rev-parse --git-path COMMIT_EDITMSG)"`.
2. **Self-review verified with correction:** META-AUDIT says `commitlint.config.cjs` exists and lacks `Wave:` trailer enforcement (`META-AUDIT.md:48,62`). Current config exists at `Z:/claude-sota-installed/commitlint.config.cjs:15-61`; rules include max-length/type allowances but no trailer-exists rule.
3. **Self-review verified:** META-AUDIT B-SEC fixes are reflected in settings: codex allowlist is narrowed at `Z:/claude-sota-installed/.claude/settings.json:70-76`; trivy skips `.local` at `:172`; force-push bypass patterns include `git push origin +`, `+refs/`, and `git -c push.default=force` at `:177`.

## §4 Hidden-risk surface in audit+implementation track convergence

**Self-review finding:** highest hidden risk is stale-fact propagation between the audit track and W350 implementation track. META-AUDIT says skill drift should be 53→59 at `META-AUDIT.md:140`, the W351 queue says 53→58, but W350 HEAD still says 50 local skills at `CLAUDE.md:31`. That mismatch is a silent-overwrite/stale-count risk, not just prose.

**Self-review finding:** branch-consolidation LIVE has low data-loss risk because it uses remote SHA probes and `--force-with-lease` (`BRANCH-CONSOLIDATION-SCRIPT.sh:63-84,103-115`), but it has high operational sequencing risk if run before final W351 push.

**Self-review finding:** workflow SHA-pin edits can conflict with recent CI repair commits (`1c6f4dd`, `ae7823f`, `0c562e4`, plus newer W349 fixes on current branch). Use a fresh branch tip and review workflow diffs as one unit.

## §5 Missing P0 items

**Self-review P0:** add a final drift probe before ship: compare `CLAUDE.md` counts against filesystem/plugin JSON, not hand-maintained audit numbers. Current evidence is inconsistent (`CLAUDE.md:31,35`; `META-AUDIT.md:140`; W351 queue).

**Self-review P0:** after SHA-pin sweep, run `actionlint`/workflow lint equivalent and grep for remaining non-SHA `uses:` in the six targeted workflows. Probe found version tags still present, e.g. `actionlint.yml:51,57`, `codex-review.yml:30,34,72`, `supply-chain-watch.yml:26,30,38,43,76`.

## §6 Final Codex-Verdict trailer recommendation

Use **Codex-Verdict: REVISE-AND-SHIP (self-review; codex exec GPT-5.5 unavailable/not invoked)** until the drift-fix and SHA-pin probes are attached. Upgrade to **APPROVE** only after reproducible probes show: no duplicate git config values, CLAUDE.md counts match generated/runtime sources, six workflows have no floating action refs, and branch-consolidation DRY-RUN output is captured before LIVE.
