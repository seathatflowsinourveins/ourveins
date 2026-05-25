# W350-SOTA-GIT-TREE-FOUNDATION — Synthesis

> **Cite-anchors** (sca-v13 ≥3-org floor; W380-merge backfill): obra/superpowers `https://github.com/obra/superpowers` · wshobson `https://github.com/wshobson/agents` · GitHub worktree docs `https://git-scm.com/docs/git-worktree` · Anthropic `https://docs.claude.com`

> **Wave**: W350 · **Date**: 2026-05-20 · **Branch**: `goal/W350-sota-git-tree-foundation` · **Worktree**: `Z:/claude-sota-installed-W350`
> **Naming convention**: HYBRID per W349 Stream-C verdict (KEEP `W<N>` ledger backbone + Conventional Branch surface `<type>/w<NNN>-<kebab-summary>`)
> **Predecessors**: W349-FULL-SOTA-UNLEASH (6 streams + 4 meta-audit + codex r1→r6 = APPROVE on `W349-PREDICATE.md` SHA `4eaacf0`)

## §1 Operator's L0 ask (2026-05-20)

> "we need sota full automative git tree practice set up, make sure you set up all with sota practice ... are you sure the naming of waves are sota? ... parallel session ... sota github workflow ... how is cognee and hindsight repo score? ... should we install directly via sota offical pathway for claude code? ... any hidden errors? low quality staled references?"

## §2 Answers — final

### §2.1 Wave-naming = HYBRID (NOT pure-numeric, NOT pure-semantic)

Pure `W341` loses semantic discoverability. Pure semantic (e.g. `feat/sota-git-tree`) loses cite-stability across 100+ cross-references in 311 wave docs. The SOTA path is:

- **Keep `W<N>`** as ledger backbone — cite-stable, T6 KG permalink anchor, sca-v17 row IDs
- **Add Conventional Branch surface** — `<type>/w<NNN>-<kebab-summary>` with closed-set vocab `{execute, continue, carry-cleanup, sota-unleash, sota-convergence, mainsession-ship, wave-closure, foundation}`
- **This branch demonstrates**: `goal/W350-sota-git-tree-foundation`

**3-org-distinct anchors** (per Fork B 2026-05-20 cited research):
- conventionalcommits.org/en/v1.0.0/ (Conventional Commits 1.0.0 — community standard, frozen 2019-02-18)
- docs.kernel.org/process/maintainer-tip.html (Linux Kernel maintainer-tip)
- microsoft.github.io/code-with-engineering-playbook/source-control/naming-branches/ (Microsoft Engineering Playbook)
- 4th overlay: docs.aws.amazon.com/prescriptive-guidance/.../branches-in-a-trunk-strategy.html (AWS, 2024-08-20)

**DO NOT** retroactively rename 311 wave docs — sunk-cost-recovery is worse than the inconsistency.

### §2.2 SOTA git-tree model = Branch-per-task + merge-queue + stacked-diffs ad-hoc

| Model | Parallel-safety | Win-tool | GH-fit | Recovery | Cite |
|---|---:|---:|---:|---:|---|
| Trunk-based | 5 | 9 | 9 | 6 | docs.aws.amazon.com/wellarchitected (2023) |
| **Branch-per-task + merge-queue** | **7** | **9** | **10** | **7** | circleci.com/blog/trunk-vs-feature-based-dev (2025) |
| Stacked diffs (Graphite) | 9 | 7 | 8 | 9 | graphite.com/guides/stacked-diffs (2025) |
| jj 0.39+ / Sapling | 8 | 6 | 5 | 10 | jj-vcs.github.io (2026) — **defer to Phase 3** |

**Verdict**: branch-per-task + GitHub merge-queue as baseline; add stacked-diff discipline ad-hoc via `git rebase --update-refs` (git 2.38+) — no 3rd-party CLI dependency.

### §2.3 SOTA parallel-session practice (Windows)

Already documented at `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (5-layer: L1 atomic-rename SHIPPED `bd25142` · L2 worktree-topology · L3 cross-session state T6+Langfuse · L4 pre-commit race-immunity · L5 operator surface).

Operational rules:
1. One worktree per concurrent CC session, ≤3 parallel cap
2. Conventional Branch shape per §2.1
3. Rebase-not-merge to keep linear history
4. `git push --force-with-lease` (NOT `--force`)
5. `WorktreeRemove` hook auto-prunes on merge
6. `extensions.worktreeConfig=true` — Google Antigravity has known break (discuss.ai.google.dev/t/.../137246 2026); keep IF all tools tolerate
7. Atomic-rename via Windows `ReplaceFileW` (NOT bare `MoveFileExW`) per learn.microsoft.com (2024); libuv `uv_fs_rename` is portability wrapper only, NOT POSIX-atomic on Win
8. Multi-worktree git-path resolution: `git rev-parse --git-path` (NOT `--git-dir`)
9. Session-handoff: cherry-pick recovery per `.claude/skills/session-handoff/SKILL.md`
10. Empirical collision demonstrated this session: W348-sota-fix and W350 concurrent → CLAUDE.md edits collided → W350 worktree resolved

### §2.4 Repo scores (cognee / hindsight / etc.)

Per Fork B + W349 streams (2026-05-20 access):

| Repo | Source | Score | Action | Official-CC-path? |
|---|---|---:|---|---|
| cognee (v1.26.0) | topoteretes/cognee | 8/10 | KEEP — NSSM `CogneeMCP` :8000/mcp LIVE | No Anthropic plugin; MCP server is canonical |
| hindsight | vectorize-io/hindsight | 3/10 | REPLACE → `mem0ai/mem0` (56k★ Apache-2.0) | No |
| **gitnexus** | abhigyanpatwari/GitNexus | **8/10 AI-runtime, 9/10 CC integration** | **REINSTALL** via `npm i -g gitnexus@1.6.5` (DONE — already at latest) + `gitnexus setup` | No (PolyForm Noncommercial OK for non-commercial) |
| graphiti | getzep/graphiti | 4/10 | KEEP-retired; cognee covers | N/A |
| langfuse (v3.160.0) | langfuse/langfuse | 9/10 | KEEP; check breaking changes | MCP server |
| basic-memory (v0.21.1) | basicmachines-co/basic-memory | 8/10 | KEEP (T6 canonical) | MCP server via uvx |
| obra/superpowers | github.com/obra/superpowers | 8/10 | KEEP | First-party-adjacent (anthropics-staff maintained) |
| wshobson/agents | github.com/wshobson/agents | 8/10 | KEEP; `/plugin update agent-teams` for PR#535 | Third-party marketplace |

**"SOTA official Claude Code pathway"**: For first-party plugins use `anthropics/claude-plugins-official` + `anthropics/skills` marketplaces (already wired). For cognee/hindsight: no first-party plugin exists — MCP server via stdio/HTTP is the canonical path. The current `.mcp.json` setup IS the SOTA pathway.

### §2.5 Hidden errors / stale references (W349 + Fork A audit)

| Severity | Finding | Status |
|---|---|---|
| 🔴 HIGH | CLAUDE.md L14 cited worktrees `-W272, -W273, -state/wt/w280` that don't exist on disk | **FIXED this commit** (live worktrees: -W348, -W348-carry, -W350) |
| 🔴 HIGH | 311 W-dirs / 3625 wave-`.md` files — semantic opacity | Mitigated by HYBRID naming for NEW waves (§2.1) |
| 🟡 MED | 24+ branches sprawl | **Script ready** (`docs/architecture/W350-sota-git-tree-foundation/BRANCH-CONSOLIDATION-SCRIPT.sh`); awaits operator OK to push tag-deletes |
| 🟡 MED | CCBP `@ HEAD a28cd96b` SHA — 7-cite-refresh chain documents drift | Pattern noted; needs auto-refresh CI (W351+) |
| 🟡 MED | No `branch-protection.json` policy-as-code | GitHub Rulesets API recommended (Fork B Q3) |
| 🟡 MED | `.gitignore` parent-dir block prevents `!file` exceptions | **FIXED this commit** (`.claude/state/*` + exception) |
| 🟢 LOW | CodeQL action version (`@v3` floating, deprecating per github.blog 2025-10-28) | Triggers verified OK (push + PR + weekly Tuesday cron `21 5 * * 2` at `codeql.yml:6-8`); only the `@v3`→`@v4` upgrade is pending v4 release-availability verification (W351 P1) |
| 🟢 LOW | No `mdformat`/`prettier` for 3625 wave-docs | Operator decision (high noise vs. low value) |

### §2.6 SOTA CI/CD enhancements

Real gaps (per `.github/workflows/` audit 2026-05-20):

| Action | Current | SOTA Target | Severity |
|---|---|---|---|
| `github/codeql-action/*` | v3 | v4 (post 2025-10-28 deprecation) | MED — needs verification of v4 availability |
| `aquasecurity/trivy-action` | `@master` | SHA-pin (CWE-829) | HIGH |
| `step-security/harden-runner@v2` (some) | floating v2 | SHA-pin | MED |
| `sigstore/cosign-installer@v3` | floating v3 | SHA-pin v3.5.0 | MED |
| `ossf/scorecard-action@v2.4.3` | SHA-pinned (W349 RC-1) | ✓ DONE | — |
| `pin-github-action` tooling | none | install + run periodically | LOW |
| GitHub Rulesets (replaces classic branch-protection) | classic UI rules | Rulesets API | MED |
| Auto-delete head branches on merge | manual UI toggle | ON per Settings → General | LOW |

**Already wired (verified 2026-05-20)**:
- `actions/dependency-review-action@v4` ✓
- `wagoid/commitlint-github-action@v6` ✓
- `actions/labeler@v6` SHA-pinned ✓
- `actions/upload-artifact@v4` ✓
- `actions/checkout@v4` ✓
- Most workflows have `step-security/harden-runner` (some SHA-pinned, some floating)

**Defer to W351**: per-workflow SHA-pin sweep + CodeQL v3→v4 upgrade after verifying v4 release availability.

## §3 Pareto ranking + this-commit scope

This W350 commit ships:
1. ✅ CLAUDE.md L14 worktree-example refresh (drift fix)
2. ✅ .gitignore `.claude/state/*` + allowlist exception (RC-2 enabler)
3. ✅ W350 synthesis doc (this file)
4. ✅ Branch consolidation script (separate file, NOT executed in this commit — operator-OK gate)

Deferred to W351:
- Per-workflow SHA-pin sweep
- CodeQL v3→v4 upgrade (post v4-availability verification)
- GitHub Rulesets API migration
- mem0ai/mem0 evaluation as hindsight replacement
- /plugin update agent-teams@claude-code-workflows (PR#535)

## §4 Provenance + verdict-ledger

- **Audit sources**: Fork A (current-state audit) + Fork B (SOTA git practice research, 8-section cited report at FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md) + W349 SYNTHESIS-MASTER (6 streams + 4 meta-audit) + this W350 orchestrator turn
- **Cross-model gate**: codex GPT-5.5 r1→r6 = APPROVE on W349-PREDICATE.md (commit `d0e5f2a`); this W350 commit will trigger its own codex r1 review per W335 trailer gate
- **3-org-distinct floor**: held per §2.1 + §2.2 + §2.3 (per Δ-G51 sca-v17 §5.1)

```yaml
slug: w350-sota-git-tree-foundation
verdict: T1-INSTALL
install_score: 4.7   # 2 drift fixes shipped + concrete branch-consol script ready + Fork B research integrated
d_emp: 3   # multi-tool empirical probes (gh api, npm, git, grep)
d_ccrt_d35: 5
rule_version: sca-v17
ship_blocker_count: 0
wave: W350
date: 2026-05-20
rollback_plan: git revert <SHA-of-this-commit>
permalink: main/verdicts/w350-sota-git-tree-foundation
```

## §5 Operator next actions

1. Review + sign-off on this W350 synthesis
2. Decide on branch consolidation script execution (P0)
3. Decide on `/plugin update agent-teams@claude-code-workflows`
4. Decide on OTLP_HEADERS secret addition to CLAUDE.local.md (closes Langfuse silent 401)
5. Decide on `/insights` invocation timing (CC v2.1.144+ native; never invoked per W349 Stream D)
6. Defer per-workflow SHA-pin sweep + CodeQL v4 upgrade to W351

---

End-of-synthesis.
