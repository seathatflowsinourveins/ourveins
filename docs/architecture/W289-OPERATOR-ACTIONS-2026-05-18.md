# W289 — Operator-Action Runbook (2026-05-18)

The 6/9 W288 gaps that W289 closed required only research + docs. The remaining 2/9 gaps require operator-typed CC built-in commands that are NOT Agent-tool-callable per W269 precedent. This runbook is the copy-paste-ready closure for those, plus the 2 optional Stream D improvements.

> **Pre-flight**: confirm current branch + clean tree before any of these. Run `git -C Z:/claude-sota-installed status --short` — expect 0 owned-files dirty (only pipeline-untracked `W272-operator-decisions`, `W288-*-stream-H-*`, `W288-RESEARCH-ARCH-v2/` allowed).

---

## Action 1 (HIGH) — agent-teams PR #535 silent-drift fix

**Why**: installed `agent-teams@1.0.2 @ gitCommitSha 34632bcbea28176ba25bbbc43cd4017d88b1cac6` vs upstream HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (6 commits ahead). PR #535 rewrote 7/9 plugin files (4 agents + team-spawn.md + 2 SKILLs) without bumping `plugin.json:version` → standard `/plugin update` no-ops per W270 CR-9. SOTA fix per `CLAUDE.md:18` cardinal-rule-1 W270 corollary: **cache-delete + fresh-install**.

### Steps

```powershell
# Step 1 — verify current pin (should show 34632bc)
$j = Get-Content 'Z:/claude-sota-installed/.claude/plugins/installed_plugins.json' -Raw | ConvertFrom-Json
$at = $j.PSObject.Properties | Where-Object { $_.Name -match 'agent-teams' }
$at.Value.gitCommitSha

# Step 2 — delete cache dir (frees CC to re-fetch on /plugin install)
Remove-Item -Recurse -Force 'Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/'
```

```text
# Step 3 — at the CC REPL (NOT Bash; this is a CC built-in):
/plugin install agent-teams@claude-code-workflows
/reload-plugins
```

### Verification

```powershell
# Should now show 08ded5e7 (or newer)
$j = Get-Content 'Z:/claude-sota-installed/.claude/plugins/installed_plugins.json' -Raw | ConvertFrom-Json
$at = $j.PSObject.Properties | Where-Object { $_.Name -match 'agent-teams' }
$at.Value.gitCommitSha

# Verify the 4 team agents + commands + skills are present in cache
Get-ChildItem 'Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/' -Recurse -Filter '*.md' | Select-Object -ExpandProperty FullName
```

Expected: `gitCommitSha` advances to `08ded5e7…`; 4 agent .md files present (`team-lead/implementer/reviewer/debugger`); `commands/team-spawn.md` present; 2 SKILLs present (`team-composition-patterns`, `team-communication-protocols`).

### Rollback (if needed)

```text
/plugin uninstall agent-teams@claude-code-workflows
# Then restore the cache from git or re-clone the marketplace
```

Recovery time: ~2 minutes. Smoke test post-rollback: `TeamCreate test-team` should still work (uses already-loaded primitives until next session restart).

---

## Action 2 (MEDIUM) — plugin-eval registry install

**Why**: `plugin-eval@0.1.0` is already config-enabled at `.claude/settings.json:224` (`"plugin-eval@claude-code-workflows": true`) but NOT in `installed_plugins.json` registry → can't be invoked via `/eval` or skill-fire until registry install. Closes W280f 203-FAIL SKILL backlog when run.

### Steps

```text
# At the CC REPL:
/plugin install plugin-eval@claude-code-workflows
/reload-plugins
```

### Verification

```powershell
# Should show plugin-eval entry
$j = Get-Content 'Z:/claude-sota-installed/.claude/plugins/installed_plugins.json' -Raw | ConvertFrom-Json
$pe = $j.PSObject.Properties | Where-Object { $_.Name -match 'plugin-eval' }
$pe.Value | Select-Object Name, gitCommitSha, installPath
```

Then exercise:

```text
# At the CC REPL:
/eval .claude/skills/sota-convergence-audit/SKILL.md
# Should return an Elo-ranked score block per the v0.1.0 framework
```

To process the W280f 203-FAIL list:

```powershell
# Get the FAIL list from W280f
Select-String -Path 'Z:/claude-sota-installed/docs/architecture/W280f-SKILL-AUDIT-2026-05-17.md' -Pattern '^FAIL' | Select-Object -ExpandProperty Line
# Then loop through and /eval each path one at a time at the REPL
```

### Rollback

```text
/plugin uninstall plugin-eval@claude-code-workflows
```

Recovery time: <1 minute. Smoke test: `/eval` slash command should be absent post-uninstall.

---

## Action 3 (OPTIONAL, Stream D-recommended) — CLAUDE.md L13 parenthetical

**Why**: Disambiguate "trivial tasks" in the W269 mandate so future auditors don't re-litigate the carve-out (Stream D §3 sample showed 0/10 fix-commits annotate preset; loose-reading-stands but the +24-word concretization prevents re-litigation).

### Steps

Edit `Z:/claude-sota-installed/CLAUDE.md:13`. Find this string:

```text
Solo is reserved for trivial tasks, explicitly solo requests, or user-forbidden delegation;
```

Replace with:

```text
Solo is reserved for trivial tasks (single-axis fix: one file or one logical change touching ≤3 files with one root-cause), explicitly solo requests, or user-forbidden delegation;
```

### Verification

```powershell
# CLAUDE.md still ≤50 LOC (the pointer-only budget)
(Get-Content 'Z:/claude-sota-installed/CLAUDE.md' | Measure-Object -Line).Lines
# Expect: ≤50
```

The parenthetical adds ~24 words ON ONE LINE so line-count is unchanged. If it pushes the file over 50 lines (unlikely), prune another bullet.

### Rollback

```bash
git -C Z:/claude-sota-installed checkout HEAD -- CLAUDE.md
```

---

## Action 4 (OPTIONAL, Stream D-recommended) — settings.json provenance comment

**Why**: Document `.claude/hooks/context-mode-cache-heal.mjs` as plugin-emitted (auto-deployed by `context-mode/start.mjs:253-294`) so future auditors don't re-flag it as potential CR-2 violation.

### Steps

Edit `Z:/claude-sota-installed/.claude/settings.json:367` (or adjacent — find an appropriate location near the hooks block). Add an underscore-prefixed comment field (CC settings.json convention permits `_comment_*` keys; they're ignored at runtime):

```json
{
  "_comment_w289_d1_provenance": ".claude/hooks/context-mode-cache-heal.mjs is plugin-emitted by context-mode/start.mjs:253-294 → wired into settings.json:88-97 automatically; CR-2 compliant per W289 Stream D audit 2026-05-18"
}
```

### Verification

```powershell
# JSON still parses
Get-Content 'Z:/claude-sota-installed/.claude/settings.json' -Raw | ConvertFrom-Json | Out-Null
$LASTEXITCODE
# Expect: 0 (or no exception)
```

### Rollback

```bash
git -C Z:/claude-sota-installed checkout HEAD -- .claude/settings.json
```

---

## Sequencing recommendation

Run in this order:

1. **Action 1** (HIGH) — `agent-teams` drift fix. Critical: lands PR #535 fix.
2. **Restart CC session** — ensures the new agent-teams version is loaded for subsequent actions.
3. **Action 2** (MEDIUM) — `plugin-eval` install. Run `/eval` on a smoke-test skill to confirm.
4. **Actions 3 + 4** (OPTIONAL) — documentation improvements. Can be batched in one commit.
5. **Verification sweep**:
   ```powershell
   git -C Z:/claude-sota-installed status --short  # expect: clean
   $j = Get-Content 'Z:/claude-sota-installed/.claude/plugins/installed_plugins.json' -Raw | ConvertFrom-Json
   ($j.PSObject.Properties | Where-Object { $_.Name -match 'agent-teams' }).Value.gitCommitSha  # expect: 08ded5e... (advanced)
   ($j.PSObject.Properties | Where-Object { $_.Name -match 'plugin-eval' }).Value | Select-Object Name  # expect: present
   (Get-Content 'Z:/claude-sota-installed/CLAUDE.md' | Measure-Object -Line).Lines  # expect: ≤50
   ```
6. **Commit** — single commit covering Actions 3+4 if applied; agent-teams + plugin-eval registry installs auto-update `installed_plugins.json` (commit that diff with a `chore(W289-closeout)` message).
7. **Codex Stop-pipeline** — auto-runs adversarial review on the commit; expect APPROVE.

---

## Post-closure state

After all 4 actions:
- Runtime is **~99% SOTA** (up from W289's 95%, W288's 80%)
- `agent-teams` at HEAD with PR #535's coordination guardrails active
- `plugin-eval` ready to grind through W280f's 203-FAIL SKILL backlog
- W269 mandate disambiguated for future auditors
- `.mjs` hook provenance documented

Remaining residuals (intentional, not gaps):
- `ruvnet/claude-flow` deliberately CITE-ONLY (don't install per W289 Stream A's full sca-v3 verdict)
- governance trio deliberately PATTERN-STUDY (don't install per W289 Stream B's `npx -y` CR-9 structural-blocker)
- `agent-teams:team-reviewer` non-response pattern: monitor (W289 4-of-4 verdict-completion rate is reassuring; further data needed)

---

## Failure modes (if any step errors)

| Failure | Likely cause | Fix |
|---|---|---|
| `Remove-Item` fails on cache dir | Files locked by CC process | Quit CC fully → retry → relaunch |
| `/plugin install` says "already installed" | Cache dir not removed | Re-run Action 1 Step 2 first |
| `gitCommitSha` does not advance after Step 3 | Marketplace cache stale | `/plugin marketplace update` then re-run install |
| `/eval` not found after Action 2 | Reload didn't pick up new plugin | `/reload-plugins` again; if still absent, restart CC |
| JSON parse fails after Action 4 | Misplaced comma | Restore from backup; re-apply carefully |

---

## Why these are operator-typed (not Agent-callable)

Per W269 audit at `docs/architecture/W269-orchestration-staleness-audit-2026-05-17.md`:

> "These require typing into an active CC REPL session — the `/plugin install` and `/plugin update` commands are CC built-ins, not Agent-tool-callable. Per CCBP install discipline + cardinal-rule-1."

This is a fundamental scope boundary of the Agent tool. The Agent can prepare the filesystem (Action 1 Step 2 cache-delete IS Agent-callable via `Remove-Item`), but the registry-mutating `/plugin install` slash command is not exposed to the Agent. So this runbook is the operator's hand-off.
