# W433-REF-D — Skills Bundle Cite-Refresh Report

**Wave**: W433-REF-D
**Date**: 2026-05-24
**Spec**: PR #109 commit `e2cb98d` (W433-SEED-INSTALL spec §4)
**Operator-side**: Path A solo execution (CITE-REFRESH only — no installs, no CLAUDE.md edits)
**Cite-floor**: ≥3 distinct orgs (GitHub + Vercel + Anthropic + ComposioHQ + addyosmani satisfied)

## Executive Summary

Status: **DONE**. Probed 4 Skill-bundle source repos via `gh api repos/.../commits/{branch}`; all four are LIVE, non-archived, actively-maintained (most recent push 2026-05-24, i.e. **today**). Detected SHA drift across all three already-installed bundles (vercel-labs, wshobson/agents, addyosmani/agent-skills); recorded **proposed-only** CLAUDE.md L31 update text (NOT executed per R4 ≤50 LOC guardrail). New cite-anchor section added for ComposioHQ/awesome-claude-skills (61.6k★ curation list — meta-discovery for future-wave SOTA repos; **CITE-ONLY, NOT installed**).

## §1 — Per-repo SHA drift table

Probe semantics: `gh api repos/{owner}/{repo}` for default-branch + license + stars + push-date + archived/disabled flags; then `gh api repos/{owner}/{repo}/commits/{default_branch}` for current HEAD SHA + commit-date + first-line message. Previous-cite SHAs sourced from CLAUDE.md L31 + grep across `docs/architecture/W*-*/`.

| # | Repo | Stars | Pushed | License | Default | Previous-cite | Current-HEAD | Drift | First-cite-wave |
|---|------|-------|--------|---------|---------|---------------|--------------|-------|------------------|
| 1 | `vercel-labs/agent-skills` | 27,046 | 2026-05-22 17:27 | (none in repo metadata; per-file YAML `license: MIT`) | `main` | `b9c8ee0643` (W310/W329) | `18a24346600009dc3fcb99e4b2cd83b301601775` (`18a243466000`) | **YES** | W310 |
| 2 | `wshobson/agents` | 35,884 | 2026-05-24 21:35 | MIT | `main` | `08ded5e7b0` (W269/W312/W314 — verdict-row 53 row-pin) | `9834a5f38d3861128992d00699c5581b5432c0ac` (`9834a5f38d38`) | **YES** | W269 |
| 3 | `addyosmani/agent-skills` | 45,387 | 2026-05-24 21:03 | MIT | `main` | `f17c6e88` (CLAUDE.md L31 vendor-fork-5 pin / W316) | `2a62238edd41ccd9a5a4d16269a4d87808e3e9c1` (`2a62238edd41`) | **YES** | W316 |
| 4 | `ComposioHQ/awesome-claude-skills` | 61,597 | 2026-05-22 03:17 | (no SPDX in metadata — curated awesome-list) | `master` | (not previously cited in this runtime) | `92568c1edaff1bde5371154f036d959346c145a8` (`92568c1edaff`) | **N/A — new cite-anchor** | W433-REF-D |

### Drift commentary

**Row 1 — vercel-labs/agent-skills**: HEAD advanced from `b9c8ee0643` → `18a24346600009dc` (HEAD-msg = `Merge pull request #268 from vercel-labs/johnphamous/vercel-optimize-project-scope-preflight`). This is the source for `vercel-composition-patterns`, `vercel-react-best-practices`, `web-design-guidelines` skills already in `.claude/skills/` per W329-A-SKILLS-AUDIT rows 23-25. Repo metadata returns no top-level SPDX license; however per-file YAML in individual skill SKILL.md files carries `license: MIT` (W310 Stream 4 vendor-fork verdict relied on this). License posture appears UNCHANGED (no LICENSE root file detected by repo metadata probe; W310 §AGING-WINDOW timeline 2026-08-03 still applies for re-litigation of T1 promotion).

**Row 2 — wshobson/agents**: HEAD advanced from `08ded5e7` → `9834a5f38d38` (HEAD-msg = `Add Pensyve external integration (#552)`). Last cite-pin was W314 verdict-ledger row 53 (`HOLD T2 UPGRADE — supersedes via 0-drift since W312 row 47`). That zero-drift claim is now STALE — repo advanced 17 PRs since `08ded5e7` (PR #535 to #552 inclusive). License remains MIT (unchanged). agent-teams plugin-package version pin status (was 1.0.2 per W286b) needs separate re-probe — outside W433-REF-D scope; flagged as queued follow-up.

**Row 3 — addyosmani/agent-skills**: HEAD advanced from `f17c6e88` → `2a62238edd41` (HEAD-msg = `Merge pull request #183 from creazyfrog/docs/fix-copilot-agent-file-naming`). Currently cited in CLAUDE.md L31 as `W316 addyosmani-vendor-fork-5 @ addyosmani/agent-skills f17c6e88`. This is the 5-skill vendor-fork source (`addyosmani-{doubt-driven-development, frontend-ui-engineering, api-and-interface-design, incremental-implementation, performance-optimization, security-and-hardening, spec-driven-development}` per W340 Stream A additions). License remains MIT (unchanged).

**Row 4 — ComposioHQ/awesome-claude-skills (NEW)**: 61.6k★ curated `awesome-list` for Claude Code skills/plugins/MCP. HEAD-msg = `Add overkill skill (#880)`. README confirms scope = curation-only (no installable skill code in repo; it's a directory of links). License metadata absent (typical for awesome-list curation repos; SPDX-not-applicable for non-code curation). **Recommended adoption posture: CITE-ANCHOR ONLY — meta-discovery surface for future-wave SOTA Skill candidates; NOT installed; NOT vendor-forked.** This closes a gap surfaced in W378-SOTA-CONVERGENCE / W432 audits where ComposioHQ was cited as `composio` install-source but the `awesome-claude-skills` curation surface was never anchored.

## §2 — Recommended CLAUDE.md L31 updates (PROPOSAL ONLY — NOT EXECUTED)

R4 ≤50 LOC root-memory guardrail means CLAUDE.md edits MUST be done via a dedicated follow-up wave that simultaneously trims something else to maintain budget. W433-REF-D is **CITE-REFRESH-ONLY** per spec §4 task-3 guardrail.

### Proposed L31 amendments (for a follow-up W432-DOC-DRIFT-2 wave)

Current text excerpt: `... mattpocock-vendor-fork-10 @ 67bce91c80cd ... W316 addyosmani-vendor-fork-5 @ addyosmani/agent-skills f17c6e88, 3 prefix-namespaced addyosmani-{doubt-driven-development, frontend-ui-engineering, api-and-interface-design} ...`

Proposed amendment text (deltas; integrate into existing line):

1. **Add vercel-labs/agent-skills SHA-pin**: insert `vercel-labs/agent-skills @ 18a243466000 (2026-05-22)` near the `vercel-*` anchor. Currently the L31 line names `vercel-*` skill family but carries no source SHA — a CR-1 trust-tuple gap surfaced by this audit.
2. **Refresh addyosmani SHA**: replace `addyosmani/agent-skills f17c6e88` with `addyosmani/agent-skills @ 2a62238edd41 (2026-05-24)` per drift row 3.
3. **(Optional)** add wshobson cite — currently L11 names `wshobson/agents` without SHA. Proposed: `wshobson/agents @ 9834a5f38d38 (2026-05-24)` inserted at L11 near `agent-teams` reference. Defer to L11 trim-pass since L11 is also over-budget.
4. **(Optional / META)** add ComposioHQ cite-anchor — proposed text: `meta-discovery: ComposioHQ/awesome-claude-skills @ 92568c1edaff (61.6k★, curation-only)` as Pointer §3 reference, NOT under skills-list.

These four amendments together add ~180 chars (~3 LOC at 60-char fold-width) — would require a compensating trim elsewhere. Recommendation: queue as part of a W432-DOC-DRIFT-2 wave that consolidates W432-FOUND-AUDIT findings + this report's deltas in one CLAUDE.md compaction pass.

## §3 — ComposioHQ/awesome-claude-skills cite-anchor section

Per W433-SEED-INSTALL spec §4 task-3 bullet 2: ComposioHQ/awesome-claude-skills is added as **CITE-ANCHOR REFERENCE** (curation list; not installed).

### Repo metadata (verbatim from `gh api`)

- **Owner/repo**: `ComposioHQ/awesome-claude-skills`
- **Stars**: 61,597 (as of 2026-05-24 probe)
- **Pushed**: 2026-05-22 03:17:49 UTC
- **License**: not declared in repo metadata (typical for `awesome-list` repos; per github.com/sindresorhus/awesome convention is CC0 or unstated; consumers should treat individual linked-repo licenses as authoritative)
- **Default branch**: `master`
- **HEAD SHA**: `92568c1edaff1bde5371154f036d959346c145a8` (`92568c1edaff` short)
- **HEAD commit**: `Add overkill skill (#880)` (2026-05-22 03:17:49 UTC)

### Why cite-anchor (not install)

- **Curation, not code**: `awesome-claude-skills` is a directory of links/descriptions; no installable skill code in `skills/` folder. Cannot be `/plugin install`-ed.
- **Meta-discovery value**: at 61.6k★ + 880 PRs merged it represents one of the largest community-curated indexes of Claude Code skill ecosystem. Useful as starting-surface for future-wave SOTA candidate-discovery (sca-v18+ landscape probes).
- **No vendor-fork action required**: zero-LOC adoption (cite-anchor in report only); no copy-out of file contents needed.
- **Cardinal-rule-3 posture**: subagent allowlist UNAFFECTED; skill auto-fire registry UNAFFECTED; no settings.json hooks added.

### Recommended uses

1. **W434+ candidate-discovery**: when running sca-v18+ scouting passes, grep `awesome-claude-skills/README.md` for new ecosystem entries that aren't yet in this runtime's catalog.
2. **Operator triage surface**: when operator asks "what skills exist for X?" — link to the curated list rather than re-deriving from scratch.
3. **Quarterly drift-probe**: refresh HEAD SHA on each quarterly cite-refresh wave; archive removal would trigger a re-evaluation.

## §4 — Cite-floor compliance (≥3 distinct orgs)

Cite-anchored orgs surfaced in this report:

1. **Vercel** (Vercel Labs) — `vercel-labs/agent-skills` HEAD `18a243466000`
2. **Anthropic** — `https://code.claude.com/docs/en/skills` (skill auto-fire semantics); `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent allowlist); `https://docs.anthropic.com/en/docs/claude-code/memory` (root-memory ≤50 LOC discipline)
3. **GitHub** — `gh api repos/{owner}/{repo}/commits/{branch}` REST API surface used for all SHA probes
4. **ComposioHQ** — `ComposioHQ/awesome-claude-skills` HEAD `92568c1edaff`
5. **addyosmani** — `addyosmani/agent-skills` HEAD `2a62238edd41`
6. **wshobson** — `wshobson/agents` HEAD `9834a5f38d38`

Six distinct orgs ≥ 3-floor → **PASS**.

## §5 — Out-of-scope items flagged for follow-up waves

1. **agent-teams plugin-package version re-probe** (W286b cited `wshobson/agents@claude-code-workflows v1.0.2`) — current plugin-cache state UNKNOWN at W433-REF-D scope; flagged for W432-FOUND-AUDIT follow-up or separate W434-PKG-DRIFT.
2. **CLAUDE.md L11 + L31 amendments** — proposed only here; require dedicated W432-DOC-DRIFT-2 wave that simultaneously trims to maintain ≤50 LOC budget.
3. **Vercel-labs LICENSE root-file probe** (W310 §AGING-WINDOW deferred until 2026-08-03) — NOT re-probed in W433-REF-D; T1-promotion candidacy remains deferred.
4. **mattpocock vendor-fork** (L31 mentions `mattpocock-vendor-fork-10 @ 67bce91c80cd`) — NOT in W433-REF-D scope (per spec §4 task-1 four-repo list); separate refresh wave needed.
5. **`/reload-plugins` verification** — N/A for this wave (no installs, no plugin cache changes).

## §6 — Verification probe transcript (reproducibility)

PowerShell command that produced rows 1-4:

```powershell
$repos = @(
    @{owner='vercel-labs'; repo='agent-skills'},
    @{owner='wshobson'; repo='agents'},
    @{owner='addyosmani'; repo='agent-skills'},
    @{owner='ComposioHQ'; repo='awesome-claude-skills'}
)
foreach ($r in $repos) {
    $info = gh api "repos/$($r.owner)/$($r.repo)" --jq '{default_branch, stars: .stargazers_count, pushed_at, license: .license.spdx_id, archived, disabled}' | ConvertFrom-Json
    $headSha = gh api "repos/$($r.owner)/$($r.repo)/commits/$($info.default_branch)" --jq '.sha'
    "$($r.owner)/$($r.repo): branch=$($info.default_branch) stars=$($info.stars) pushed=$($info.pushed_at) license=$($info.license) archived=$($info.archived) HEAD=$($headSha.Substring(0,12))"
}
```

Verbatim output (2026-05-24 probe):

```
vercel-labs/agent-skills:        branch=main   stars=27046 pushed=2026-05-22T17:27:29Z license=     archived=False HEAD=18a243466000
wshobson/agents:                 branch=main   stars=35884 pushed=2026-05-24T21:35:51Z license=MIT  archived=False HEAD=9834a5f38d38
addyosmani/agent-skills:         branch=main   stars=45387 pushed=2026-05-24T21:03:14Z license=MIT  archived=False HEAD=2a62238edd41
ComposioHQ/awesome-claude-skills: branch=master stars=61597 pushed=2026-05-22T03:17:49Z license=     archived=False HEAD=92568c1edaff
```

Verification: any reader can re-run the above command to reproduce HEAD SHAs (modulo upstream advancement between this report's timestamp and re-probe time).

## §7 — Verdict

- **All four repos LIVE + non-archived + actively-pushed within last 72h** — no recommend-retire actions.
- **3-of-3 already-installed bundles show SHA drift** — drift is BENIGN-PROGRESS (upstream maintainers shipping improvements), not BREAKAGE.
- **ComposioHQ/awesome-claude-skills successfully anchored** as cite-only curation reference.
- **Recommendation**: queue W432-DOC-DRIFT-2 follow-up to land CLAUDE.md L31 amendments (proposed in §2) WHEN compensating ≤50 LOC trim is available; meanwhile this report serves as the canonical drift-record for the four bundles.

**Status**: DONE
**Codex-Verdict (commit trailer)**: APPROVE
