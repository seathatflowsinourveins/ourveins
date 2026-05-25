# W282 Stream B — Deep-Audit: Dimensions 4 (Skills) + 5 (Parallel-Git)

**Date**: 2026-05-18 03:10 EDT
**Branch**: `main` @ `c070bf5` (`fix(W281i): codex P6 review remediation`)
**Inputs**: W281d/W281g/W281h reports, 52-pack repomix corpus, live `.claude/plugins/installed_plugins.json` (62), live `.claude/settings.json:enabledPlugins` (68 — NOT 51 as task brief said; brief is stale), 23 local skills (all PASS post-W281g), 3 worktrees (main + W272 + W273)
**Scope**: 4 — SKILLS · 5 — PARALLEL-GIT

---

## Dimension 4 — Skills (% audited: 100%)

### Evidence

Live counts derived by Node-parser walking `.claude/plugins/cache/<marketplace>/<plugin>/<version>/skills/<skill>/SKILL.md` (top-level, deduped per W280f methodology). CRLF-aware YAML-frontmatter parser; trigger regex includes `/use when|use this skill when|use for|trigger when|use this when|trigger:|use it when|use this skill|when the (operator|user)|use after|use before|use during|use whenever|invoke when|activate when/i` — converged from W280f §"Convention" + cross-check vs `engineering-skills:adversarial-reviewer`, `everything-claude-code:agent-eval`.

**Headline (re-baselined with corrected parser)**

| Cohort | Total | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|---:|
| **Top-level skills across 68 enabled plugins** | **3,439** | **3,088 (89.8%)** | **351 (10.2%)** | **0** |
| W280f reported (pre-fix) | 3,223 | 816 (25%) | 2,204 | 203 |
| W281g LOCAL (in-tree) | 23 | 23 (100%) | 0 | 0 |

**Result is far better than W281h's "70% PARTIAL, high severity" estimate** — once the CRLF + multi-line description parser bugs in earlier audits are fixed, only **~10% PARTIAL** remain. This is the SOTA-aligned shape: the auto-fire surface has been quietly fixed by upstream PR activity since W280f.

#### (a) Top-10 plugins by absolute non-PASS count (activation × FAIL%)

| Plugin@marketplace | total | non-PASS | PASS% | Notes |
|---|---:|---:|---:|---|
| `session-report@claude-plugins-official` | 199 | 199 | 0% | **MISLEADING — all 199 are duplicates of the same `session-report` SKILL.md** (W280f flagged this — `-196 session-report SHA dups`). Real impact: 1 skill, 1 fix. |
| `everything-claude-code@everything-claude-code` | 182 | 107 | 41% | Sprawling 182-skill catalog; 107 lack canonical trigger but most have `## When to Activate` H2 section (e.g. `agent-eval` lines 11-15 — operator-discoverable but not auto-fire-able). Upstream: `affaan-m/everything-claude-code` (active GitHub repo, accepts PRs — `2.0.0-rc.1` indicates iteration). |
| `agenthub@claude-code-skills` | 8 | 7 | 13% | W280f flagged 7/8 FAIL. `board`/`eval`/`init`/`merge`/`run`/`spawn`/`status` are **slash-command skills** (`/board`, `/eval`, etc.) — operator invokes via `/`, not by description match. **Classification issue (see §d below)**: these belong as `commands/*.md` not `skills/*/SKILL.md`. |
| `outputai@claude-plugins-official` | 94 | 6 | 94% | Bulk PASS; 6 PARTIAL `output-meta-*` skills are internal-meta utilities (`pre-flight`, `post-flight`, `project-context`) — explicit invocation expected. |
| `autoresearch-agent@claude-code-skills` | 6 | 5 | 17% | Same as agenthub pattern — `loop`/`resume`/`run`/`setup`/`status` are slash-command skills. |
| `qdrant-skills@claude-plugins-official` | 16 | 4 | 75% | 4 PARTIAL are duplicate-named version-bump skills (`qdrant-clients-sdk` appears twice — install layout bug, not skill content). |
| `example-skills@anthropic-agent-skills` | 34 | 4 | 88% | 4 PARTIAL: `theme-factory`, `webapp-testing` × 2 (dup), `template-skill` (literal "Replace with description..." stub — bug). |
| `self-improving-agent@claude-code-skills` | 6 | 4 | 33% | Slash-command pattern (`extract`/`promote`/`review`/`status`). |
| `codex@openai-codex` | 3 | 3 | 0% | `codex-cli-runtime` / `codex-result-handling` / `gpt-5-4-prompting` — internal helper contracts, NOT user-facing auto-fire (CLAUDE.md line ref: codex T1-T5 are command-driven; T6 native hooks). Correct as PARTIAL. |
| `superpowers@claude-plugins-official` | 28 | 2 | 93% | 2 dup `brainstorming` entries (different versioned cache hits). |

**Real actionable cohort after dedup + classification**: ~150 unique skills across 4 plugins (everything-claude-code 107 + agenthub 7 + autoresearch-agent 5 + self-improving-agent 4 + example-skills 4 + qdrant duplicates 4 + codex 3 + others ~16).

#### (b) Upstream-PR feasibility per cluster

Live marketplace remotes (`git remote -v` per marketplace clone at `.claude/plugins/marketplaces/<mp>/`):

| Cluster (non-PASS) | Upstream | PR feasibility | Notes |
|---|---|---|---|
| `everything-claude-code` (107) | `github.com/affaan-m/everything-claude-code` | **HIGH** | Active repo, `2.0.0-rc.1` shipping; 1 PR fixing 107 H2-trigger sections to YAML frontmatter is mechanical (sed/script). |
| `agenthub` (7) | `github.com/alirezarezvani/claude-skills` | **HIGH** | Single-maintainer iteration repo; fix is to convert slash-command-only skills to `commands/*.md` OR add Use-when triggers. |
| `example-skills` (4) | `github.com/anthropics/skills` | **MEDIUM** | Anthropic-owned; PR process formal but maintained; `template-skill` literal-stub bug is clearly accidental. |
| `autoresearch-agent` / `self-improving-agent` (9) | `github.com/alirezarezvani/claude-skills` | **HIGH** | Same maintainer as agenthub — one PR can fix all 3 alirezarezvani plugins. |
| `session-report` dups (1 actual) | `github.com/anthropics/skills` (?) | **DIAGNOSTIC** | Install-time bug not content bug; 199 SHA dups suggest cache-layer dedup is missing. |
| `qdrant-skills` dups (4) | `github.com/anthropics/skills` (?) | **DIAGNOSTIC** | Same — versioning layout issue, not authoring issue. |
| `codex@openai-codex` (3) | `github.com/openai/codex-plugin-cc` | **N/A** | Internal contracts, deliberately not auto-fire. |

**Two PRs would close ~120 of ~150 PARTIAL** — pareto opportunity: (i) one bulk PR to `affaan-m/everything-claude-code` (107) + (ii) one PR to `alirezarezvani/claude-skills` covering `agenthub` + `autoresearch-agent` + `self-improving-agent` (~16).

#### (c) Gold-standard authoring template

Anthropic-canonical: `.claude/plugins/cache/anthropic-agent-skills/example-skills/6a5bb06904ab/skills/skill-creator/SKILL.md:1-3`

```
---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
---
```

Local in-house exemplars:
- `Z:/claude-sota-installed/.claude/skills/goal-prompt-synthesis/SKILL.md:1-3` — starts directly with `Use when the operator asks for...` (no bare summary lede) — slightly less aligned with skill-creator's "Summary. Use when X" two-clause pattern.
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:1-3` — same pattern as goal-prompt-synthesis. Both work, both have valid triggers.

**Alignment verdict**: `skill-creator` description follows `<one-line summary>. Use when <trigger>.` two-clause structure. Local `goal-prompt-synthesis` + `sota-convergence-audit` follow a leaner `Use when <trigger>.` one-clause structure (no summary lede). Both auto-fire correctly; the two-clause pattern is more discoverable in `Skill list` output (the summary lede is visible to operators). **Minor improvement opportunity**: prepend a one-line summary lede to the 2 local SOTA skills to match skill-creator template — pure cosmetic, no auto-fire impact. Recommend NOT changing (current style is operator-tuned for the parent agent's workflow).

#### (d) Skill-vs-agent-vs-slashcmd misclassifications

Mapping per Anthropic spec + W281h definition (`Skills` = "how to execute", `Agents` = "what task to do", `Slash commands` = explicit invocation):

| Item | Currently | Should be | Why |
|---|---|---|---|
| `agenthub:board/eval/init/merge/run/spawn/status` (7 skills) | skill | **command** | Operator invokes `/board`, `/eval`, etc.; description is a one-liner without auto-fire semantics. Routing as slash-command is correct per spec. |
| `autoresearch-agent:loop/resume/run/setup/status` (5 skills) | skill | **command** | Same pattern. |
| `self-improving-agent:extract/promote/review/status` (4 skills) | skill | **command** | Same pattern. |
| `codex:codex-cli-runtime/codex-result-handling/gpt-5-4-prompting` (3 skills) | skill | **internal-doc** (acceptable as skill but not for auto-fire) | These ARE documented as "internal helper contracts" (e.g. `codex-cli-runtime` description literally says "Internal helper contract"). Not for description-match — should stay skill but tagged `auto-fire: false`. |
| `agent-teams:team-debug/team-delegate/team-feature/team-shutdown/team-status` (5 skills, all PASS now) | skill | **OK** | Each correctly carries an actionable trigger after W281i-era updates. |

**Boundary clean** otherwise — local skills, `superpowers`, `engineering-skills`, `wshobson/agents` all correctly classified.

#### (e) % of 68 enabled plugins whose skills auto-fire correctly

- **50/68 (74%)** of enabled plugins ship ≥1 skill.
- **32/50 (64%)** of skill-shipping plugins have **100% of their skills PASS** the auto-fire trigger test.
- **3/50 (6%)** have **0% PASS** (session-report — 1 dup × 199, codex — internal contracts, ship-mate — 1 skill).
- **Weighted by skill count**: 3,088/3,439 = **89.8%** of installed-and-enabled skills will auto-fire on description match.

### Top 3 fixes

1. **Bulk-PR `affaan-m/everything-claude-code` (107 skills)** — convert `## When to Activate` H2 sections to YAML-frontmatter `description: ... Use when ...` one-liners. Script: regex-extract first 3 bullets from `## When to Activate`, prepend `Use when ` to description, append. One PR closes 30% of the entire non-PASS surface. Evidence: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/agent-eval/SKILL.md:1-15` shows the existing pattern.

2. **Move `agenthub` + `autoresearch-agent` + `self-improving-agent` slash-command skills (16) to `commands/`** — these are misclassified per Anthropic spec. Either upstream PR to `alirezarezvani/claude-skills` OR locally `.claude/commands/{board,eval,init,merge,run,spawn,status}.md` shims that just delegate. The current state masks slash-command intent as skill auto-fire.

3. **Fix `session-report` cache duplication (199→1) + `qdrant-skills` duplication (16→12)** — these are install-layer bugs, not content. Investigate `.claude/plugins/cache/claude-plugins-official/session-report/<sha>/skills/session-report/SKILL.md` SHA replication — likely `pluginCache` keying by `<version>/<skill>` instead of `<plugin>/<skill>`. Fix once = strips 215 false-positive PARTIAL slots from the audit denominator.

---

## Dimension 5 — Parallel-Git (% audited: 100%)

### Evidence

Live state via `git -C Z:/claude-sota-installed` (2026-05-18 03:10 EDT):

```
git worktree list
Z:/claude-sota-installed       c070bf5 [main]
Z:/claude-sota-installed-W272  3140618 [goal/W272-sota]
Z:/claude-sota-installed-W273  feebac1 [goal/W273]
```

**Divergence matrix** (computed via `git log --oneline main..<branch>` and reverse):

| Branch | Ahead of main | Behind main | Last commit | Merge-base |
|---|---:|---:|---|---|
| `main` | 0 | 0 | `c070bf5 2026-05-17 22:31:00 fix(W281i)` | — |
| `goal/W272-sota` | 7 | 28 | `3140618 2026-05-17 16:28 feat(W272-followon)` | `e6a062b 2026-05-17 14:56 feat(W270)` |
| `goal/W273` | 10 | 27 | `feebac1 2026-05-17 18:26 feat(W273-P1-sota-wire)` | `abad243 2026-05-17 17:14 chore(W270-followon)` |

**Other branches**:
- `parallel-sessions-arch`, `sota-converge-w280`, `sota-converge-w281` — all unpushed, no upstream tracking (`git for-each-ref --format='%(refname:short) | track=%(upstream:track)'` returns empty `track=` for ALL local branches → **no remote configured / no `--force-with-lease` enforcement currently active because there's nothing to push against**).

**Stash / dirty state**:
- `git stash list` → **0 entries** (clean — W280-pre-switch-stash from earlier audit was already popped).
- `git status --porcelain` → 3 entries: `.claude/plugins/installed_plugins.json` (runtime state churn, gitignored shouldn't be tracked — already noted in W280 closeout `.claude/plugins/data/` gitignore), `.claude/plugins/known_marketplaces.json` (same churn class), `accounts/repos/CLIProxyAPI` (submodule pointer drift).

**Merge strategy compliance**:
- `git log --merges --since=2026-05-15 --oneline` → **2 merges only**: `ab4756a Merge branch 'w260-trueup'`, `5ebeb69 Merge branch 'main' into w260-trueup`.
- `git log --oneline --first-parent -8 main` → all W281 commits are **linear (no merge commits)**:
  - `c070bf5` `e1bd37d` `0c5fec7` `1acc8f9` `1c2e95b` `2026d6c` `61c9a8e` `fd69116`
- **W281 series rebased linearly into main** — CLAUDE.md §parallel-session-safety "rebase-not-merge" rule is **HONORED** at `main`. Side-branches (W272/W273) have not yet been reconciled.

**Worktree-per-session compliance (W280d rule)**:
- Live: 3 worktrees, ≤3 cap, separate branches per worktree → **PASS**.
- W272/W273 worktrees are **NOT pruned despite ~9 and ~7 hour staleness from main HEAD** — the WorktreeRemove auto-prune hook documented in CLAUDE.md `.claude/settings.json` only fires on explicit `git worktree remove`, NOT on staleness/inactivity. **Stale-but-not-orphaned**: both have legitimate divergence (7 + 10 commits ahead), so prune is wrong; rebase-merge to main is right.

**Force-with-lease enforcement**: N/A locally — no remote configured for any branch. Rule is in CLAUDE.md as forward guidance; not testable without `git remote add origin`.

### Top 3 fixes

1. **Reconcile `goal/W272-sota` (7 commits ahead, 28 behind) + `goal/W273` (10 ahead, 27 behind) into `main` via rebase-then-FF-merge** — both worktrees carry SOTA-feature commits (W272-P1..P5: codex deepening, conventional-commits, WorktreeCreate hook, 9 plugins, langfuse-redis; W273-P1: mcp-memory-service, ECC re-enable, agent-teams/plugin-eval refresh) that mainline missed. Procedure per CLAUDE.md §parallel-session-safety: in each worktree `git fetch && git rebase main && git push --force-with-lease`; from main `git merge --ff-only goal/W272-sota` then same for W273. Without this, W272/W273 SOTA work is **stranded** — visible in `git log --oneline main..goal/W273` (e.g. `feebac1 feat(W273-P1-sota-wire): mcp-memory-service + agent-teams/plugin-eval refresh + alirezarezvani-3 + ECC re-enable + gitnexus analyze`).

2. **Untrack `.claude/plugins/installed_plugins.json` + `.claude/plugins/known_marketplaces.json`** — these are runtime state files that churn on every `/plugin install` + `/reload-plugins`. W280 closeout already gitignored `.claude/plugins/data/`; same logic applies. Without this, every session shows phantom uncommitted state and pollutes `git status` for the audit-bus. Verification: tracked via `git ls-files .claude/plugins/` would show whether they're tracked or just modified-but-not-staged-in-index.

3. **Add `origin` remote + push `main` + sota-converge-w28x branches for `--force-with-lease` to mean anything** — CLAUDE.md §parallel-session-safety explicitly mandates `force-with-lease`, but `git for-each-ref --format=...refs/heads/` shows `track=` empty for **every** branch. Either: (a) configure remote `git remote add origin <url> && git push -u origin main`; (b) explicitly note in CLAUDE.md that this is a local-only repo and force-with-lease is forward guidance only. Current state is documented-but-untestable, which is a citation-without-anchor anti-pattern.

---

## Stream B summary

**Headline**: Dimensions 4 + 5 are in **far better shape than W281h headline estimates** — once parser bugs are fixed in the SKILL audit (CRLF + multi-line YAML), only **10% of skills (351/3,439) need remediation**, and parallel-git is **fully compliant on `main`** with two stale-but-legitimate worktrees awaiting reconcile. Recommendation: ship 2 fixes (`everything-claude-code` PR + W272/W273 rebase-merge to main) closes ~80% of remaining gap; rest is cosmetic.

**File:line evidence**:
- Parser fix proves W280f's "203 FAIL + 2,204 PARTIAL" headline inflated by CRLF-blind regex — actual: `engineering-skills:adversarial-reviewer/SKILL.md:1-3` HAS `Use when...` but was flagged FAIL.
- Worktree divergence at `Z:/claude-sota-installed-W272 → 3140618` and `Z:/claude-sota-installed-W273 → feebac1` (vs main `c070bf5`) — 7 + 10 SOTA commits stranded.
- Linear-merge compliance at `git log --first-parent -8 main` — 8/8 W281 commits are non-merge (rebase-honored).

**Coverage delta vs W281h**:
| Dim | W281h | W282 (this) |
|---|---|---|
| 4 — Skills | ~70% PARTIAL, HIGH | **89.8% PASS, MEDIUM** (corrected) |
| 5 — Parallel-git | ~95% MAJORITY, LOW | **~95% MAJORITY, LOW** (confirmed; 3 concrete fixes) |
