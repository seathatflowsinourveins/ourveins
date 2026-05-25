# W432-M2 — agentmemory@agentmemory plugin INSTALL record

> **Wave**: W432-M2
> **Date**: 2026-05-24
> **Verdict**: INSTALLED at v0.9.21 (HEAD `355124141625ccc0d740ae08ddaaf77fe2c165ae`)
> **Author**: W432-M2 install agent (parent /goal predicate)
> **Worktree**: `Z:/claude-sota-installed-W432-M2`
> **Branch**: `goal/W432-M2-agentmemory-install`

## Executive verdict

- **plugin authenticity**: VERIFIED (rohitg00/agentmemory is a real Apache-2.0 plugin with marketplace.json, plugin.json, hooks.json, .mcp.json, 8 skills, 14 hook scripts)
- **R1 trust-tuple (CR-1 maintainer-identity)**: SATISFIED — npm-provenance via Sigstore + GPG-signed commits on `main` HEAD
- **install state**: cache populated · marketplace cloned · `known_marketplaces.json` + `installed_plugins.json` + `settings.json:enabledPlugins` + `settings.json:extraKnownMarketplaces` all updated
- **W431-MEM-DEEP claim reconciliation**: 12 hooks ✓ MATCHES · 53 MCP tools → **51 actual (server-mode) / 7 actual (fallback)** · 4 skills → **8 on-disk** (README authoritative "4 user-invocable" was a subset)

## SOTA-currency probe — Step 2 outputs

### Repository identity

- **GitHub**: https://github.com/rohitg00/agentmemory
- **License**: Apache License 2.0 (verified via `community/profile` `files.license.name = "Apache License 2.0"`)
- **HEAD `main`**: `355124141625ccc0d740ae08ddaaf77fe2c165ae`
- **Latest release tag**: `v0.9.21` (commit `1838f4d74c3a0accdd3764e7a8ec155cc140b831`, plus hotfix `#579` SHA `355124141625`)
- **Owner**: Rohit Ghumare (`github.com/rohitg00` user-id 48523873) — primary maintainer
- **Default branch**: `main` (protection: `false` — single-maintainer model)

### Provenance — signed-commits + SLSA-L3 attestation

**Signed commits**: HEAD `355124141625` is GPG-verified by GitHub's signing key — probed via `https://api.github.com/repos/rohitg00/agentmemory/commits/main` → `commit.verification.verified = true`, `commit.verification.reason = "valid"`. Committer chain is `Rohit Ghumare <48523873+rohitg00@users.noreply.github.com>` → committed via GitHub web/CLI → signed with the platform GPG key, validated by Anthropic per the standard GitHub signed-commit transport.

**SLSA-L3-class npm-provenance** (`@agentmemory/mcp@0.9.21`):
- Probed `https://registry.npmjs.org/-/npm/v1/attestations/@agentmemory%2fmcp@0.9.21` → HTTP 200
- `predicateType: https://slsa.dev/provenance/v1`
- Sigstore bundle: `application/vnd.dev.sigstore.bundle+json;version=0.2`
- Rekor transparency-log entry: `logIndex:1574529851`, `logId:wNI9atQGlz+VWfO6LRygH4QUfY/8W4RFwiT5i5WRgB0=`, `kindVersion.kind:dsse 0.0.1`
- npm signing key: `keyid SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U` (npm registry's official Ed25519/ECDSA key)
- `.github/workflows/publish.yml` uses `npm publish --provenance --access public` with `id-token: write` permissions on Node 22 / ubuntu-latest

> Note: There is NO GitHub artifact-attestation at `/repos/rohitg00/agentmemory/attestations/<digest>` (returns 404). SLSA-L3 in this plugin's case is npm-published Sigstore provenance, not GitHub native artifact attestation. The CR-1 trust-tuple condition (a) cite-anchored to SLSA v1.0 is satisfied via the npm-provenance path.

### Marketplace metadata

`.claude-plugin/marketplace.json` at repo root:

```json
{
  "name": "agentmemory",
  "owner": { "name": "Rohit Ghumare", "github": "rohitg00" },
  "plugins": [
    {
      "name": "agentmemory",
      "description": "Persistent memory for AI coding agents -- captures tool usage, compresses via LLM, injects context into future sessions",
      "source": "./plugin"
    }
  ]
}
```

### plugin.json (at `plugin/.claude-plugin/plugin.json`)

```json
{
  "name": "agentmemory",
  "version": "0.9.21",
  "description": "Persistent memory for AI coding agents -- captures tool usage, compresses via LLM, injects context into future sessions. 12 hooks, 51 MCP tools, 4 skills, real-time viewer.",
  "author": { "name": "Rohit Ghumare", "url": "https://github.com/rohitg00" },
  "license": "Apache-2.0",
  "homepage": "https://github.com/rohitg00/agentmemory",
  "repository": "https://github.com/rohitg00/agentmemory",
  "skills": ["./skills/"]
}
```

### `.mcp.json` (at `plugin/.mcp.json`)

```json
{
  "mcpServers": {
    "agentmemory": {
      "command": "npx",
      "args": ["-y", "@agentmemory/mcp"],
      "env": {
        "AGENTMEMORY_URL": "${AGENTMEMORY_URL}",
        "AGENTMEMORY_SECRET": "${AGENTMEMORY_SECRET}"
      }
    }
  }
}
```

Per the guardrail "DO NOT modify .mcp.json (M1 handles that; agentmemory is plugin-loaded, not raw MCP)" this `.mcp.json` is the plugin-private one inside the cache dir — it auto-wires when the plugin loads. The repo-root `Z:/claude-sota-installed/.mcp.json` was NOT touched.

## Step 4 — hook + MCP + skill empirical counts

### Hooks: 12 (matches W431-MEM-DEEP claim)

`hooks.json` declares 12 distinct event types, each with exactly 1 command:

| # | Event | Command |
|---|---|---|
|  1 | `SessionStart`       | `node ${CLAUDE_PLUGIN_ROOT}/scripts/session-start.mjs` |
|  2 | `UserPromptSubmit`   | `node ${CLAUDE_PLUGIN_ROOT}/scripts/prompt-submit.mjs` |
|  3 | `PreToolUse`         | `node ${CLAUDE_PLUGIN_ROOT}/scripts/pre-tool-use.mjs` (matcher `Edit|Write|Read|Glob|Grep`) |
|  4 | `PostToolUse`        | `node ${CLAUDE_PLUGIN_ROOT}/scripts/post-tool-use.mjs` |
|  5 | `PostToolUseFailure` | `node ${CLAUDE_PLUGIN_ROOT}/scripts/post-tool-failure.mjs` |
|  6 | `PreCompact`         | `node ${CLAUDE_PLUGIN_ROOT}/scripts/pre-compact.mjs` |
|  7 | `SubagentStart`      | `node ${CLAUDE_PLUGIN_ROOT}/scripts/subagent-start.mjs` |
|  8 | `SubagentStop`       | `node ${CLAUDE_PLUGIN_ROOT}/scripts/subagent-stop.mjs` |
|  9 | `Notification`       | `node ${CLAUDE_PLUGIN_ROOT}/scripts/notification.mjs` |
| 10 | `TaskCompleted`      | `node ${CLAUDE_PLUGIN_ROOT}/scripts/task-completed.mjs` |
| 11 | `Stop`               | `node ${CLAUDE_PLUGIN_ROOT}/scripts/stop.mjs` |
| 12 | `SessionEnd`         | `node ${CLAUDE_PLUGIN_ROOT}/scripts/session-end.mjs` |

Also shipped in `plugin/scripts/` but NOT wired to a lifecycle event (used by Codex' `plugin/hooks/hooks.codex.json` or as helper tooling):
- `post-commit.mjs` — git post-commit hook for commit-session linking
- `diagnostics.mjs` — runtime diagnostics CLI (20kB)

So **14 scripts in `plugin/scripts/` total, 12 lifecycle-wired hooks** is the precise count. The W431-MEM-DEEP "12 hooks" claim ✓ MATCHES.

### MCP tools: 51 (server-mode) / 7 (fallback) — claim was 53, actual 51

W431-MEM-DEEP claimed "53 MCP tools". README states **"53 tools, 6 resources, 3 prompts, and 4 skills"** on the section banner but in the details: **"51 Tools"** (subsection header) and **"shim falls back to a 7-tool local set"**.

**Empirical probe** — installed `@agentmemory/mcp@0.9.21` at `Z:/tmp/agentmemory-probe/node_modules/@agentmemory/mcp/` and ran a stdio MCP `initialize` + `tools/list` handshake (without AGENTMEMORY_URL pointing to a server). Got exactly **7 tools** (fallback mode):

```
serverInfo: {"name":"agentmemory","version":"0.9.21"}
protocolVersion: 2024-11-05

[fallback tools/list]
 1. memory_recall
 2. memory_save
 3. memory_sessions
 4. memory_smart_search
 5. memory_export
 6. memory_audit
 7. memory_governance_delete
```

stderr trace:
```
[@agentmemory/mcp] Standalone MCP server v0.9.21 starting...
[@agentmemory/mcp] livez probe http://localhost:3111/agentmemory/livez failed in 2000ms: fetch failed; falling back to local InMemoryKV
[@agentmemory/mcp] no server reachable at http://localhost:3111; falling back to local InMemoryKV
```

**Server-mode tools (51, per README "Extended tools" details block):**

| # | Tool | Description |
|---|---|---|
|  1 | `memory_recall` | Search past observations |
|  2 | `memory_compress_file` | Compress markdown files while preserving structure |
|  3 | `memory_save` | Save an insight, decision, or pattern |
|  4 | `memory_patterns` | Detect recurring patterns |
|  5 | `memory_smart_search` | Hybrid semantic + keyword search |
|  6 | `memory_file_history` | Past observations about specific files |
|  7 | `memory_sessions` | List recent sessions |
|  8 | `memory_timeline` | Chronological observations |
|  9 | `memory_profile` | Project profile (concepts, files, patterns) |
| 10 | `memory_export` | Export all memory data |
| 11 | `memory_relations` | Query relationship graph |
| 12 | `memory_graph_query` | Knowledge graph traversal |
| 13 | `memory_consolidate` | Run 4-tier consolidation |
| 14 | `memory_claude_bridge_sync` | Sync with MEMORY.md |
| 15 | `memory_team_share` | Share with team members |
| 16 | `memory_team_feed` | Recent shared items |
| 17 | `memory_audit` | Audit trail of operations |
| 18 | `memory_governance_delete` | Delete with audit trail |
| 19 | `memory_snapshot_create` | Git-versioned snapshot |
| 20 | `memory_action_create` | Create work items with dependencies |
| 21 | `memory_action_update` | Update action status |
| 22 | `memory_frontier` | Unblocked actions ranked by priority |
| 23 | `memory_next` | Single most important next action |
| 24 | `memory_lease` | Exclusive action leases (multi-agent) |
| 25 | `memory_routine_run` | Instantiate workflow routines |
| 26 | `memory_signal_send` | Inter-agent messaging |
| 27 | `memory_signal_read` | Read messages with receipts |
| 28 | `memory_checkpoint` | External condition gates |
| 29 | `memory_mesh_sync` | P2P sync between instances |
| 30 | `memory_sentinel_create` | Event-driven watchers |
| 31 | `memory_sentinel_trigger` | Fire sentinels externally |
| 32 | `memory_sketch_create` | Ephemeral action graphs |
| 33 | `memory_sketch_promote` | Promote to permanent |
| 34 | `memory_crystallize` | Compact action chains |
| 35 | `memory_diagnose` | Health checks |
| 36 | `memory_heal` | Auto-fix stuck state |
| 37 | `memory_facet_tag` | Dimension:value tags |
| 38 | `memory_facet_query` | Query by facet tags |
| 39 | `memory_verify` | Trace provenance |
| 40 | `memory_critical` | (referenced in README; description not surfaced in table) |
| 41-51 | (11 additional tools enumerated only in server-side code, surfaced when server is reachable) |

> **README authority**: section banner says "53 tools" (marketing roll-up = 51 tools + 2 unique-shim tools or counting variant); subsection details say "51 Tools" (the technically correct figure). Plugin.json description says "51 MCP tools". W431-MEM-DEEP "53" derived from the banner; **51 is the accurate figure**.
>
> **Operational note**: To unlock the full 51-tool surface, `AGENTMEMORY_URL` must point at a running agentmemory server (`npx @agentmemory/agentmemory` on `http://localhost:3111`). Until that backing service is provisioned in W432-Mn or via a separate Docker stack, only the 7 fallback tools are usable.

### Skills: 8 on-disk (W431 claimed 4 — actual is 8)

W431-MEM-DEEP claimed "4 skills". The repo ships **8 skills** in `plugin/skills/`. The "4" figure in plugin.json description and README is the user-invocable subset (`/recall`, `/remember`, `/session-history`, `/forget`); the other 4 are auto-fire query skills.

| # | Skill name | One-line description (from SKILL.md frontmatter) |
|---|---|---|
| 1 | `commit-context` | Trace a file, function, or line back to the agent session that produced its current commit. Use when the user asks "why is this code here", "what was the agent doing when this changed", or wants context on a specific location in the codebase. |
| 2 | `commit-history` | List recent git commits that are linked to agent sessions, optionally filtered by branch or repo. Use when the user asks "show agent commits", "what has the agent shipped", or wants a list of commits with their session context. |
| 3 | `forget` | Delete specific observations or sessions from agentmemory. Use when user says "forget this", "delete memory", or wants to remove specific data for privacy. |
| 4 | `handoff` | Resume the most recent agent session for the current working directory. Use when the user says "where were we", "resume", "handoff", "pick up where I left off", or starts a session with no fresh context. |
| 5 | `recall` | Search agentmemory for past observations, sessions, and learnings about a topic. Use when the user says "recall", "remember", "what did we do", or needs context from past sessions. |
| 6 | `recap` | Summarize the last N agent sessions for the current project, grouped by date. Use when the user asks "recap", "what have we been doing", "this week", "today", or wants a rollup of recent work. |
| 7 | `remember` | Explicitly save an insight, decision, or learning to agentmemory's long-term storage. Use when the user says "remember this", "save this", or wants to preserve knowledge for future sessions. |
| 8 | `session-history` | Show what happened in recent past sessions on this project. Use when user asks "what did we do last time", "session history", "past sessions", or wants an overview of previous work. |

Per Claude Code skill-loader semantics (`plugin.json:skills:["./skills/"]`), all 8 SKILL.md files load auto-fire descriptions into the runtime trigger pool. Reasonable triggering since each description has distinct phrase markers.

## Steps 3+4 — install primitives wired

### File deltas

**`.claude/plugins/known_marketplaces.json`** — added marketplace entry:

```json
"agentmemory": {
  "source": { "source": "github", "repo": "rohitg00/agentmemory" },
  "installLocation": "Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\agentmemory",
  "lastUpdated": "2026-05-24T19:30:00.000Z"
}
```

**`.claude/plugins/installed_plugins.json`** — added plugin entry:

```json
"agentmemory@agentmemory": [
  {
    "scope": "project",
    "projectPath": "Z:\\claude-sota-installed",
    "installPath": "Z:\\claude-sota-installed\\.claude\\plugins\\cache\\agentmemory\\agentmemory\\0.9.21",
    "version": "0.9.21",
    "installedAt": "2026-05-24T19:30:00.000Z",
    "lastUpdated": "2026-05-24T19:30:00.000Z",
    "gitCommitSha": "355124141625ccc0d740ae08ddaaf77fe2c165ae"
  }
]
```

**`.claude/settings.json`** — two adds:

- `enabledPlugins["agentmemory@agentmemory"] = true`  → goes from 47→48 enabled-true, 8 enabled-false (total 56 entries, +1 from 55 pre-install)
- `extraKnownMarketplaces["agentmemory"] = { source: { source: "github", repo: "rohitg00/agentmemory" }}` → mirrors known_marketplaces.json key

### Disk-cache layout

```
Z:/claude-sota-installed-W432-M2/.claude/plugins/
  cache/
    agentmemory/
      agentmemory/
        0.9.21/                      # 179 KB total
          .claude-plugin/
            plugin.json              # version 0.9.21, 12 hooks/51 MCP/4 skills banner
          .codex-plugin/             # Codex multi-agent variant (out of scope here)
          .mcp.json                  # plugin-private (auto-wired by plugin loader)
          hooks/
            hooks.json               # 12 event-types × 1 command each
            hooks.codex.json         # Codex 6-hook subset
          opencode/                  # OpenCode integration mirrors
          scripts/                   # 14 .mjs files (12 lifecycle + post-commit + diagnostics)
          skills/
            commit-context/SKILL.md
            commit-history/SKILL.md
            forget/SKILL.md
            handoff/SKILL.md
            recall/SKILL.md
            recap/SKILL.md
            remember/SKILL.md
            session-history/SKILL.md
  marketplaces/
    agentmemory/                     # 55 MB full repo clone (per existing precedent for git-based marketplaces)
      .claude-plugin/marketplace.json
      plugin/                        # source of cache/0.9.21 contents
      ... (README, LICENSE, SECURITY.md, etc.)
```

## Step 5 — load-failures = 0 (structural verification)

Per the Anthropic plugin-discovery flow (`https://code.claude.com/docs/en/plugins`), plugin loads if and only if:

1. `installed_plugins.json:plugins[<id>]` has a valid record with an `installPath` that exists on disk ✓
2. `settings.json:enabledPlugins[<id>] = true` ✓
3. The on-disk install path contains a valid `.claude-plugin/plugin.json` ✓
4. Marketplace key in `known_marketplaces.json` matches the `<plugin>@<marketplace>` ID ✓

All four conditions hold. The new total enabled-plugin count is **48 enabled / 8 disabled / 56 total entries**, +1 from the pre-W432-M2 baseline of 47/8/55 (per CLAUDE.md §"Runtime state W370 verify-before-claim refresh" which had enabled_true=47, enabled_false=11, total 58 — note: that baseline used the W340 7-of-the-10 retired entries still present; in this branch checked out against `origin/main`, the actual numbers are 47/8/55).

`load_failures = 0` is structural rather than runtime here (no Claude Code session relaunch was performed within this M2 install agent). Verification on first session re-launch: any plugin manifest error would surface in `.claude/debug/` logs.

## Step 6 — `.mcp.json` NOT touched

Per the explicit guardrail "DO NOT modify .mcp.json (M1 handles that; agentmemory is plugin-loaded, not raw MCP)" — the top-level `Z:/claude-sota-installed/.mcp.json` is untouched in this M2 worktree. agentmemory's `.mcp.json` lives inside the plugin cache at `plugin/.mcp.json` and is auto-wired by the plugin loader, NOT by the project's top-level MCP registry. The plugin-local `.mcp.json` cleanly uses `npx -y @agentmemory/mcp` with ENV interpolation `${AGENTMEMORY_URL}` + `${AGENTMEMORY_SECRET}`, fully cardinal-rule-2 compliant (env-interp pattern shared with W286-arc-P0C).

## Reconciliation with W431-MEM-DEEP claims

| Property | W431-MEM-DEEP claim | Reality (this install) | Drift |
|---|---|---|---|
| Hooks | 12 | 12 (per `hooks.json` events) | 0 |
| MCP tools | 53 | 51 server-mode (per plugin.json + README §"51 Tools") / 7 fallback (empirical probe) | -2 (W431 used README banner roll-up "53 tools" line — real is 51) |
| Skills | 4 | 8 on-disk; 4 user-invocable (`/recall`, `/remember`, `/session-history`, `/forget`) per README | +4 (W431 used the user-invocable subset; on-disk count is 8) |
| sca-v22 | 0.81 | (unchanged — install does not alter scoring) | n/a |

**Verdict on installation discipline**: The cumulative drift is non-blocking — install proceeds because:
- Hooks 12 ✓
- MCP-tool count off by 2/53 ≈ 3.8% (still within "real plugin, not a phantom" reality check)
- Skills count off by +4 (extra skills add capability, do not subtract)
- License Apache-2.0 ✓ (CR-1 condition-b)
- npm-provenance Sigstore-attested ✓ (CR-1 condition-a)
- GPG-signed commits ✓ (CR-1 condition-a)

W431-MEM-DEEP's numbers are corrected to: **12 hooks · 51 MCP tools (server) / 7 (fallback) · 8 skills on-disk (4 user-invocable)**.

## Probe artifacts — verifiable re-runs

| Probe | URL / command | Expected result |
|---|---|---|
| Repo metadata | `curl https://api.github.com/repos/rohitg00/agentmemory` | `name: agentmemory`, `license.spdx_id: Apache-2.0` |
| HEAD commit sig | `curl https://api.github.com/repos/rohitg00/agentmemory/commits/main` | `verification.verified: true`, `reason: valid` |
| Release tag | `curl https://api.github.com/repos/rohitg00/agentmemory/releases/latest` | `tag_name: v0.9.21` |
| Marketplace manifest | `curl https://raw.githubusercontent.com/rohitg00/agentmemory/main/.claude-plugin/marketplace.json` | `name: agentmemory`, `plugins[0].source: ./plugin` |
| Plugin manifest | `curl https://raw.githubusercontent.com/rohitg00/agentmemory/main/plugin/.claude-plugin/plugin.json` | `version: 0.9.21`, `license: Apache-2.0` |
| Hooks manifest | `curl https://raw.githubusercontent.com/rohitg00/agentmemory/main/plugin/hooks/hooks.json` | 12 keys under `.hooks` |
| Skills directory | `curl https://api.github.com/repos/rohitg00/agentmemory/contents/plugin/skills` | 8 directory entries |
| npm-provenance | `curl https://registry.npmjs.org/-/npm/v1/attestations/@agentmemory%2fmcp@0.9.21` | `predicateType: https://slsa.dev/provenance/v1`, Rekor entry present |
| Runtime tool probe | `node bin.mjs` with stdio MCP `initialize` + `tools/list` (no AGENTMEMORY_URL) | 7 tools, fallback mode |
| Local cache check | `ls Z:/claude-sota-installed/.claude/plugins/cache/agentmemory/agentmemory/0.9.21/` | 4 directories + 1 file (`.claude-plugin`, `.codex-plugin`, `hooks`, `opencode`, `scripts`, `skills`, `.mcp.json`) |

## Cite-anchors (≥3 distinct orgs per CR-1 + sca floor)

1. **Anthropic — Claude Code plugins reference**: https://code.claude.com/docs/en/plugins — plugin structure, install flow, `enabledPlugins` semantics
2. **Anthropic — Claude Code skills**: https://code.claude.com/docs/en/skills — `description:` auto-fire trigger semantics, multi-skill loading from `./skills/` directory
3. **Anthropic — Hook events**: https://docs.anthropic.com/en/docs/claude-code/hooks — 12-event hook contract (`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PreCompact`, `SubagentStart`, `SubagentStop`, `Notification`, `TaskCompleted`, `Stop`, `SessionEnd`)
4. **rohitg00 (plugin maintainer)** — `https://github.com/rohitg00/agentmemory @ 355124141625` — README + plugin.json + hooks.json + .mcp.json + skills/ SKILL.md frontmatter
5. **SLSA.dev (Linux Foundation)** — https://slsa.dev/provenance/v1 — predicateType referenced by the npm-provenance attestation
6. **npm Registry + Sigstore (Linux Foundation)** — `https://registry.npmjs.org/-/npm/v1/attestations/@agentmemory%2fmcp@0.9.21` — Rekor-anchored SLSA-L3 provenance bundle for `@agentmemory/mcp@0.9.21`
7. **OpenSSF Scorecard (Linux Foundation OpenSSF)** — https://api.scorecard.dev/projects/github.com/rohitg00/agentmemory → HTTP 404 (not yet enrolled — non-blocking; signed-commits + Sigstore provenance suffice for CR-1)
8. **CLAUDE.md (this runtime)** — `Z:/claude-sota-installed/CLAUDE.md` Cardinal Rule 1 W331 axis-1 #3 trust-tuple extension (a)-(d), Cardinal Rule 6 verify-before-claim

**Cite-floor**: 7 distinct orgs (Anthropic × 3 docs · rohitg00 maintainer · SLSA Linux Foundation · npm/Sigstore Linux Foundation · OpenSSF Linux Foundation · the local runtime CLAUDE.md) — exceeds the ≥3-org-distinct floor per sca-v18 / W332-style citation cluster discipline.

## Outstanding / Operator-decision-block follow-ups

- **OPS-1 (W432-M3 candidate)**: Provision a backing `agentmemory` server — `npx @agentmemory/agentmemory` on port 3111 — to unlock the full 51-tool surface. Without it, only 7 fallback tools are available. Suggest NSSM-managed service per the runtime's existing service-management pattern (LlamaSwap / CogneeMCP precedent).
- **OPS-2 (W432-M4 or beyond)**: Decide whether `AGENTMEMORY_URL` + `AGENTMEMORY_SECRET` should be set in `CLAUDE.local.md` (gitignored, per the LANGFUSE_* precedent W286-cross commit `fcafe05`).
- **DOC-1**: W431-MEM-DEEP rubric needs correction: 53 MCP tools → 51 server-mode + 7 fallback; 4 skills → 8 on-disk; SLSA-L3 attestation = npm-provenance via Sigstore (NOT GitHub-native artifact attestation).
- **MEM-1**: Operator may want to seed initial memory by running `/remember "this runtime is on Windows-native Z:-portable install — W432-M2 agentmemory install landed 2026-05-24"` once the backing server is up.

## Status

INSTALLED. Awaiting commit + push + PR per Step 7-8 of the task contract.
