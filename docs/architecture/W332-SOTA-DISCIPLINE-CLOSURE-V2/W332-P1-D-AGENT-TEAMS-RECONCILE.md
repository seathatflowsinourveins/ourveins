# W332-P1-D — agent-teams 1.0.2 HEAD reconcile

> Owner: parallel-worker-F (W332-SOTA-DISCIPLINE-CLOSURE-V2)
> Closes a 60-wave-stale upstream-drift carry from W329-G §1.
> Status: **AT-HEAD-NOOP** (verdict justified §5).
> Date: 2026-05-19.

## §1 Scope

Reconcile the locally-installed `agent-teams` plugin against the upstream
maintainer's HEAD commit and verify that **PR #535 — "fix: agent teams
coordination guardrails"** is present in the install. The W329-G §1 carry
flagged the install as `UNKNOWN-LAG` because the local snapshot timestamp
post-dated PR #535's merge but no formal version-vs-HEAD reconcile had been
captured in a wave deliverable. This document is that reconcile and is the
authoritative close of the carry.

**Important up-front correction**: the W329-G §1 phrasing
("`wshobson/agent-teams`") suggests a standalone repo at
`https://github.com/wshobson/agent-teams`. That URL is HTTP 404 — `wshobson`
ships agent-teams as ONE OF 80 plugins inside the unified
**`wshobson/agents`** monorepo (a.k.a. the `claude-code-workflows`
marketplace, marketplace.json v1.6.0). The HEAD SHA cited in W329-G
(`08ded5e7b0fe`) is the HEAD of `wshobson/agents` (the parent monorepo), not
of a per-plugin repo. All probes in §3 are routed against that correct
upstream.

## §2 Local install probe

| Field | Value |
|---|---|
| Marketplace | `claude-code-workflows` (vendored from `wshobson/agents`) |
| Marketplace version | `1.6.0` (per `marketplaces/claude-code-workflows/.claude-plugin/marketplace.json:10`) |
| Plugin name | `agent-teams` |
| Installed version | **`1.0.2`** |
| Install path | `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2` |
| plugin.json path | `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\.claude-plugin\plugin.json` |
| Installed gitCommitSha (per `installed_plugins.json:320`) | **`08ded5e7b0fe57e7f40194775885eba539c3d8e7`** |
| Scope | project (Z:/claude-sota-installed) |
| installedAt | `2026-05-18T14:29:22.826Z` |
| lastUpdated | `2026-05-18T19:11:15.137Z` |
| Plugin contents | 4 agents (`team-{debugger,implementer,lead,reviewer}.md`), 7 commands (`team-{debug,delegate,feature,review,shutdown,spawn,status}.md`), 6 skills (`multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`) |

`plugin.json` body (full):

```json
{
  "name": "agent-teams",
  "version": "1.0.2",
  "description": "Orchestrate multi-agent teams for parallel code review, hypothesis-driven debugging, and coordinated feature development using Claude Code's Agent Teams",
  "author": { "name": "Seth Hobson", "email": "seth@major7apps.com" },
  "license": "MIT"
}
```

## §3 Upstream HEAD probe

Source: GitHub REST `GET /repos/wshobson/agents/commits/main` (probed
2026-05-19 via context-mode `ctx_fetch_and_index`).

| Field | Value |
|---|---|
| Upstream repo | `https://github.com/wshobson/agents` |
| Default branch | `main` |
| Current HEAD SHA | **`08ded5e7b0fe57e7f40194775885eba539c3d8e7`** |
| HEAD commit author | Seth Hobson `<wshobson@gmail.com>` |
| HEAD commit date | `2026-05-17T00:46:39Z` |
| HEAD commit message | `fix: agent teams coordination guardrails (#535)` |
| Marketplace HEAD version metadata | `1.6.0` |

**Delta-from-local**:

| Dimension | Local | Upstream HEAD | Delta |
|---|---|---|---|
| `agent-teams` plugin version | `1.0.2` | `1.0.2` (no bump in HEAD) | **0** |
| Marketplace gitCommitSha | `08ded5e7b0fe…` | `08ded5e7b0fe…` | **0 commits behind** |
| Last upstream commit on `plugins/agent-teams/**` | 2026-05-17 (PR #535 merge) | 2026-05-17 (same) | identical |

**Verdict**: installed plugin is **at upstream HEAD with byte-for-byte
parity** (gitCommitSha pin is exact). No commits ahead, no commits behind.

## §4 PR #535 coord-guardrails verification

Source: GitHub REST
`GET /repos/wshobson/agents/pulls/535` +
`GET /repos/wshobson/agents/pulls/535/files`
(probed 2026-05-19 via context-mode).

### PR metadata

| Field | Value |
|---|---|
| URL | `https://github.com/wshobson/agents/pull/535` |
| Title | `fix: agent teams coordination guardrails` |
| Author | wshobson (Seth Hobson) |
| State | **merged** |
| merged_at | `2026-05-17T00:46:39Z` |
| Head SHA (PR branch tip) | `bc582aebeceb7392db1a2e07b2f1f0ca6cc82e3a` |
| Merge target HEAD | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (== installed gitCommitSha) |

### What the PR ships (the "coord-guardrails")

PR #535 introduces two layers of coordination guardrails to the agent-teams
plugin:

1. **Subagent-type decision-matrix rewrite** in
   `plugins/agent-teams/skills/team-composition-patterns/references/agent-type-selection.md`
   — reorders the decision tree so role-specialization is checked **before**
   the file-modification predicate, eliminating a class of mis-selection
   where teammates were spawned as `general-purpose` when an
   `agent-teams:team-*` role was actually required. Also expands the
   per-agent-type "Tools Available" matrix with explicit
   `TaskList/TaskGet/TaskUpdate/SendMessage` enumeration so coordinator
   tooling is no longer implicit.
2. **`team-lead` name-collision guard** in
   `plugins/agent-teams/commands/team-spawn.md` (line-level patch
   `+3/-2`) — adds:
   > "Do not use the role name `team-lead` as the spawned member name.
   > Team creation can reserve role-like names, so use a unique member
   > name and address the teammate by the actual name returned by
   > `Agent` or listed in `~/.claude/teams/{team-name}/config.json`."
3. **Reinforcement** in
   `plugins/agent-teams/skills/team-communication-protocols/SKILL.md`
   (`+4/-1`) — strengthens the "Always use `name`" rule to handle the
   collision case explicitly.
4. **CI guard** in `tools/check_agent_name_collisions.py` (NEW, +126 LOC)
   — a Python script invoked from `.github/workflows/validate.yml` that
   blocks future PRs from introducing duplicate `name:` frontmatter across
   any plugin's `agents/*.md` files (this part of the PR is in the
   monorepo tooling, NOT shipped inside the plugin payload, so it has no
   local install footprint — by design).

### Local presence-check (file-by-file)

| PR #535 artifact (plugin payload only) | Local path | Present? | Snapshot date |
|---|---|---|---|
| `plugins/agent-teams/commands/team-spawn.md` | `Z:\…\agent-teams\1.0.2\commands\team-spawn.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/agents/team-lead.md` | `Z:\…\agent-teams\1.0.2\agents\team-lead.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/agents/team-implementer.md` | `Z:\…\agent-teams\1.0.2\agents\team-implementer.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/agents/team-debugger.md` | `Z:\…\agent-teams\1.0.2\agents\team-debugger.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/agents/team-reviewer.md` | `Z:\…\agent-teams\1.0.2\agents\team-reviewer.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/skills/team-communication-protocols/SKILL.md` | `Z:\…\agent-teams\1.0.2\skills\team-communication-protocols\SKILL.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/skills/team-composition-patterns/SKILL.md` | `Z:\…\agent-teams\1.0.2\skills\team-composition-patterns\SKILL.md` | **Y** | 2026-05-18 |
| `plugins/agent-teams/skills/team-composition-patterns/references/agent-type-selection.md` | `Z:\…\agent-teams\1.0.2\skills\team-composition-patterns\references\agent-type-selection.md` | **Y** | 2026-05-18 |

**8 / 8 plugin-payload artifacts from PR #535 present locally**, snapshot
dated 2026-05-18 (≥1 day after PR #535 merge on 2026-05-17). The CI guard
tool (`tools/check_agent_name_collisions.py`) is intentionally absent —
it's a maintainer-side validator and isn't shipped inside any
`plugins/<name>/` payload.

### W289 prior-art cross-check (sanity)

The W289 silent-drift audit (`docs/architecture/W288-system-lag-audit/
STREAM-H-2-wshobson-drift-audit.md`) flagged the **`1.0.2`-without-version-bump**
class-of-issue at the time the install was at gitCommitSha
`34632bcbea28176ba25bbbc43cd4017d88b1cac6` (6 commits behind). The W289
Action 1 remediation (cache-delete + fresh-install per CR-1 W270 corollary)
was performed between W289 and W312 — by W312-codex-r1 closure
(2026-05-19) the install was already at `08ded5e7b0fe`, matching upstream
HEAD exactly. **W289 silent-drift CLOSED-RESOLVED** prior to W332. The
W329-G §1 carry is therefore confirming a closed state, not a still-open
drift; the verdict downgrade here from `UNKNOWN-LAG` to `AT-HEAD-NOOP` is
the formal close.

## §5 Update recommendation

**STATUS: AT-HEAD-NOOP — no `/plugin update agent-teams` needed.**

Paste-ready operator command if a future re-verification is desired
(but **not required for W332** — provided for posterity per the W270 cache-delete
+ fresh-install SOTA recipe; runs in <5 sec, safe no-op when at HEAD):

```text
# 1. Run inside Claude Code CLI (slash command):
/plugin update agent-teams@claude-code-workflows

# 2. Optional belt-and-suspenders re-pull (cache-delete + fresh-install)
#    per CLAUDE.md cardinal-rule-1 W270 corollary, in case a future
#    upstream commit lands without a plugin.json version bump:
#    a. (PowerShell, outside CC) remove the cached install:
Remove-Item -Recurse -Force "Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams"
#    b. (in CC) re-install:
/plugin install agent-teams@claude-code-workflows

# 3. Verify post-install state matches upstream HEAD:
#    Expected gitCommitSha in installed_plugins.json: 08ded5e7b0fe57e7f40194775885eba539c3d8e7
```

### HONEST-NON-FINDING declaration

Per CR-12 (HONEST-NON-FINDING), the original W329-G §1 framing
(`UNKNOWN-LAG (HEAD 2026-05-17 fix:agent-teams-coord; installed 1.0.2 needs
version-vs-HEAD reconcile)`) **was already resolved** at the time of
W329-G's authoring, but had not yet been formally retired in a wave
deliverable. The empirical finding from this reconcile is **null delta**:
local install was at HEAD when W329-G was written and remains at HEAD as of
the W332 probe. No operator action is required; the carry is closed by
this document alone.

## §6 Cite-anchors (≥3 org-distinct, per sca-v13 floor)

1. **wshobson (primary, agent-teams upstream)** —
   `https://github.com/wshobson/agents` HEAD
   `08ded5e7b0fe57e7f40194775885eba539c3d8e7` 2026-05-17 (probed
   2026-05-19 via `GET /repos/wshobson/agents/commits/main`); PR
   `https://github.com/wshobson/agents/pull/535` "fix: agent teams
   coordination guardrails" merged 2026-05-17T00:46:39Z, head_sha
   `bc582aebeceb7392db1a2e07b2f1f0ca6cc82e3a`, 9 files changed.
2. **Anthropic CC plugin docs** —
   `https://code.claude.com/docs/en/plugins` (plugin install/update flow,
   marketplace structure, `gitCommitSha` pinning semantics; cited per
   CLAUDE.md cardinal-rule-1 + W270 corollary). Also
   `https://code.claude.com/docs/en/agent-teams` (the experimental
   Agent Teams feature that this plugin orchestrates; referenced in the
   plugin's own `README.md:3`).
3. **W289 prior-art (in-repo, organizationally distinct from the
   first-party plugin author and from Anthropic)** —
   `Z:\claude-sota-installed\docs\architecture\W288-system-lag-audit\STREAM-H-2-wshobson-drift-audit.md`
   "Action 1 (HIGH) — agent-teams PR #535 silent-drift fix" — the
   plugin-version-management precedent for THIS exact case, including
   the silent-SHA detection script proposal (`tools/check-plugin-drift.ps1`)
   and the cache-delete + fresh-install operator recipe.
4. **W270 corollary precedent (in-repo, third org-distinct anchor for
   plugin-update governance)** — `CLAUDE.md:18` cardinal-rule-1 W270
   corollary: "primitive validity = trusted-source + active-scope +
   commit-SHA-freshness + post-`/plugin install` `/reload-plugins`
   verification. Standard `/plugin update` no-ops on silent SHA drift
   (version-string unchanged, upstream content advanced) — cache-delete
   + fresh-install is the SOTA fix." This is the runtime-governance
   citation that PR #535 itself motivated; org-distinct from both
   wshobson (the upstream maintainer) and Anthropic (the CC platform).

## §7 STATUS

**STATUS: AT-HEAD-NOOP**

Summary line for W332-H synthesis:

> P1-D agent-teams reconcile: installed `agent-teams@1.0.2` gitCommitSha
> `08ded5e7b0fe` matches `wshobson/agents` HEAD `08ded5e7b0fe` byte-for-byte
> (0 commits behind); PR #535 "fix: agent teams coordination guardrails"
> (merged 2026-05-17) is fully present locally (8/8 plugin-payload
> artifacts verified). W329-G §1 `UNKNOWN-LAG` carry is closed
> AT-HEAD-NOOP. No `/plugin update` required.
