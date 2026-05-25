# SOTA-REPO-ABSORPTION (W332 fork stream-sota-absorb)

> Mine installed SOTA plugin repos for git patterns we could adopt without new installs.
> Source: cached plugin SKILL.md + hooks.json reads (cite-anchored file:line).

## §1 obra/superpowers patterns NOT yet adopted

Cache: `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/`

**A1. Submodule-guard on `GIT_DIR != GIT_COMMON` env-detect**
Cite: `using-git-worktrees/SKILL.md` "Step 0: Detect Existing Isolation":
```bash
git rev-parse --show-superproject-working-tree 2>/dev/null  # if non-empty, you're in submodule, not worktree
```
W332 §7 CLAUDE.md annotation + finishing-a-development-branch env-detect both used the `GIT_DIR != GIT_COMMON` heuristic WITHOUT the submodule guard. Not currently a bug (no submodules in this runtime) but a latent false-positive when any plugin or vendor-fork adds submodules. **GAP — adopt verbatim**.

**A2. Native-worktree-tool preference (`EnterWorktree`/`WorktreeCreate`/`/worktree`/`--worktree`) over raw `git worktree add`**
Cite: `using-git-worktrees/SKILL.md` "1a. Native Worktree Tools (preferred)": "Using `git worktree add` when you have a native tool creates phantom state your harness can't see or manage."
W332 worktree prune used raw `git worktree remove`; W280d worktree-create flow (CLAUDE.md L14) lists `EnterWorktree`/`isolation:worktree` as primitive but operator does manual `git worktree add`. **GAP — wire CC's native EnterWorktree tool into W333 worktree-create paths**.

**A3. Sandbox-fallback when worktree creation fails**
Cite: same SKILL `Create the Worktree`: "If `git worktree add` fails with a permission error (sandbox denial), tell the user the sandbox blocked worktree creation and you're working in the current directory." We never document this fallback. **GAP — add to /goal mandate block**.

**A4. requesting-code-review at task boundaries (not just wave-end)**
Cite: `requesting-code-review/SKILL.md` `Integration with Workflows` "**Subagent-Driven Development**: Review after EACH task. Catch issues before they compound. Fix before moving to next task." We currently invoke only at wave-end (Stop-hook codex). **GAP — per-task review reduces compound-error blast radius**.

**A5. verification-before-completion Iron Law (table-formatted gate)**
Cite: `verification-before-completion/SKILL.md` `Common Failures` table:
| Claim | Requires | Not Sufficient |
| Tests pass | Test command output: 0 failures | "Should pass" / previous run |
| Bug fixed | Test original symptom: passes | Code changed, assumed fixed |
| Agent completed | VCS diff shows changes | Agent reports "success" |
We invoked the skill conceptually but never used the table-formatted gate per-claim. **GAP — formalize as wave-ship checklist**.

## §2 commit-commands plugin (claude-plugins-official) — adoption gap

Cache: 4 cached versions at `.claude/plugins/cache/claude-plugins-official/commit-commands/{019a87b0b7b2,01ffc11b4398,0346ebf423ce,03dc5d77f067}/commands/{commit,commit-push-pr,clean_gone}.md`. Multi-version cache present (active version unclear; needs `installed_plugins.json` cross-check).

Plugin is ENABLED in `settings.json:enabledPlugins`. Slash-commands `/commit`, `/commit-push-pr`, `/clean_gone` are operator-invocable.

**We hand-write `git commit -F -` with conventional-commit + provenance-lint compliance.** The `/commit` slash-command likely handles this discipline automatically.

**GAP — pilot `/commit` for next 5 commits; benchmark vs hand-written**. Effort ≈ 0 (just invoke).

`/clean_gone` — removes branches whose remotes are gone. **N/A for this runtime** (no remote per CLAUDE.local.md). Document as "enable when remote added".

## §3 ship-mate plugin (claude-code-workflows/ship-mate/1.0.0)

Cache: `.claude/plugins/cache/claude-code-workflows/ship-mate/1.0.0/`. Plugin EXISTS; ~40+ `.in_use/<pid>` markers indicating heavy parallel-session usage from other terminals on this runtime.

Workflow per CLAUDE.md ALT-WORKFLOWS comment: `scan → setup → orchestrate → architect → implement → qa → review → ship`. Agents available per skill list: `ship-mate:{architect, implement, orchestrate, playwright, qa, review}` (per available-skills tree shown in session preamble).

**We have NEVER piloted ship-mate end-to-end.** All W332 work used solo orchestrator + W321-fork dispatch. Ship-mate adds:
- Spec confirmation phase (`orchestrate` agent — clarifying questions one-at-a-time)
- Architect agent for plan approval before implementation
- QA agent with auto-loop-back on bug detection (max 2 iterations)
- Reviewer agent with 3-tier taxonomy (Critical / Should Fix / Consider)

**GAP — pilot ship-mate for a non-critical W333 feature (e.g., the §6 gitnexus impact pre-commit hook design from W332 STREAM-GAP-EXEC.md is a clean 1-feature pilot target).** Effort = MED (one wave).

## §4 everything-claude-code (ECC) hook audit

Cache: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` (head-150 inspected; ~30 scripts/hooks/*.js available).

**Currently disabled** (per `settings.json.env.ECC_DISABLED_HOOKS`):
- `pre:edit-write:gateguard-fact-force` — over-aggressive; W295 disable rationale
- `post:edit:design-quality-check` — false-positive prone
- `pre:observe:continuous-learning` + `post:observe:continuous-learning` — observability churn
- `post:session-activity-tracker` — duplicates codex_postcommit_reviews
- `stop:evaluate-session` + `stop:cost-tracker` + `stop:desktop-notify` — operator-distraction

**Currently enabled + git-relevant**:
- `pre:bash:dispatcher` (pre-bash-dispatcher.js) — wraps gitleaks + trivy + codex-on-destructive (verified W332)
- `pre:edit-write:suggest-compact` — orthogonal to git
- `pre:governance-capture` (Bash|Write|Edit|MultiEdit) — captures secrets/policy events

**Git-related scripts NOT in current hooks.json (potentially unwired):**
- `post-bash-pr-created.js` — fires after `gh pr create`; **N/A no remote**, enable when remote added
- `post-bash-build-complete.js` — post-build audit trail
- `post-bash-command-log.js` — bash audit trail (would create a complete bash audit history)

**GAP — `post-bash-command-log.js` would give us a permanent bash audit (currently we rely on transcript JSONL which is per-session)**. Effort = LOW (settings.json hook entry). ROI = MED for forensic auditability.

## §5 Top-5 ranked adopt-recommendations for W333

| # | Pattern | install_score | effort | ROI | Complements |
|---|---|---|---|---|---|
| **1** | `/commit` slash-command pilot (replace hand-written `git commit -F -`) | 5 (installed + enabled) | LOW (just invoke) | HIGH — saves ~30 LOC of bash + commitlint-compliance auto-handled | All future commits incl. O1-O6 ship-commits |
| **2** | Submodule guard in env-detect (A1) — patch CLAUDE.md L14 + W332 STREAM-PARALLEL-SESSION § parallel-session-safety | 5 (just adopt verbatim) | LOW (1-line bash + 1-line doc) | MED — latent false-positive closure | O2-O4 worktree work |
| **3** | requesting-code-review at task boundaries (A4) — invoke per-task not just per-wave | 5 (installed + auto-fires on description-match) | LOW (skill discipline change) | HIGH — reduces compound-error blast radius across tasks | All wave work; pairs with codex-strict Stop |
| **4** | ship-mate pilot for one non-critical W333 feature (e.g., gitnexus impact pre-commit hook from CF3) | 5 (installed + enabled, heavy parallel-session usage) | MED (one wave) | HIGH — proves full SOTA workflow vs solo-orchestrator | CF3 + parallel-session SOTA codification |
| **5** | Native worktree tool preference (A2) — wire `EnterWorktree`/`isolation:worktree` into W333 worktree-create paths | 5 (CC primitive) | LOW (operator+orchestrator habit change) | MED — eliminates phantom worktree state per superpowers SKILL warning | O2-O4 worktree work |

**Honorable mention** (effort-MED but valuable later):
- ECC `post-bash-command-log.js` enable for permanent bash audit trail
- verification-before-completion table-gate as wave-ship checklist
- commit-commands `/clean_gone` enable when first remote is added

Out-of-scope spotted: gitnexus integration (other stream).

STATUS: COMPLETE
