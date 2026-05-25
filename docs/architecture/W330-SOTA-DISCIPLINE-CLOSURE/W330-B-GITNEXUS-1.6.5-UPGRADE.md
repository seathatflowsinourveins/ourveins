# W330-B — GitNexus 1.3.6 → 1.6.5+ Upgrade

> Wave: W330 P0-B | Date: 2026-05-19 | Status: STAGE-1-PROBE-COMPLETE / STAGE-2-OPERATOR-ACTION-REQUIRED
> Foundation: `abhigyanpatwari/GitNexus @ 803f0bed5f7d` (W329-G §6 cite-verified)

## §1 Current State (installed 1.3.6 cache)

- **Plugin metadata cache**: `.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json` → `version: 1.3.6` (published 2026-02-28T12:42:21.225Z).
- **Cached components**: `skills/` × 7 (gitnexus-cli, gitnexus-debugging, gitnexus-exploring, gitnexus-guide, gitnexus-impact-analysis, gitnexus-pr-review, gitnexus-refactoring) + `hooks/`. No `commands/` directory.
- **Live MCP runtime**: `.mcp.json` references `npx -y gitnexus@latest mcp` — so the actual MCP server binary IS pulling `gitnexus@1.6.5` fresh on each spawn. The npm registry's `gitnexus@latest` = **1.6.5** stable (published 2026-05-16T16:32:36.218Z); 19× `1.6.6-rc.*` pre-release flow exists (newest rc.19 = 2026-05-19T11:31Z) but is NOT on the `latest` dist-tag.
- **Live MCP tool surface (probed via system tool list)**: includes `mcp__gitnexus__api_impact`, `route_map`, `tool_map`, `shape_check` — the **NEW 1.6.5 tools ARE already callable** because the runtime binary auto-advances via `@latest`. `mcp__gitnexus__list_repos` returned 2 indexed repos cleanly (claude-sota-installed: 6008 nodes / 6396 edges; claude-sota-pure: 110/105).
- **Drift class**: this is a **plugin metadata drift** (skills + hooks + version-string stuck at 1.3.6) NOT a runtime drift (MCP server already at 1.6.5). Per W270 governance: `/plugin update` no-ops on silent SHA drift because the upstream marketplace.json still pins `version: 1.3.3` while `gitnexus-claude-plugin/.claude-plugin/plugin.json` says `1.3.6` — both stale relative to the npm runtime.

## §2 Upstream HEAD (1.6.5+ / 803f0bed5f7d)

- **Repo HEAD SHA**: `803f0bed5f7d` (short-form per gitleaks `sourcegraph-access-token` 40-char entropy guard; re-verified via `gh api /repos/abhigyanpatwari/GitNexus/commits/HEAD --jq .sha`).
- **HEAD plugin.json**: at `gitnexus-claude-plugin/.claude-plugin/plugin.json` — **still `version: 1.3.6`**. The plugin author has NOT bumped the plugin-metadata version since 2026-02-28; release flow happens on the npm-package side instead.
- **HEAD `.mcp.json`**: `npx -y gitnexus@latest mcp` — identical pattern to the installed copy, so upgrade does NOT change MCP wiring.
- **HEAD skills**: same 7 skills as 1.3.6 cache, but **content has evolved** (CHANGELOG indicates resolver/MRO/heritage refactors at 1.4.0 that the cached `gitnexus-impact-analysis` + `gitnexus-refactoring` skills predate).
- **HEAD hooks**: `gitnexus-hook.js`, `hook-db-lock-probe.cjs`, `hook-lock.js`, `hooks.json`, `win-rm-list-json.ps1` — the `win-rm-list-json.ps1` is a Windows-specific addition.

## §3 1.3.6 vs HEAD Capability Diff

| Axis | 1.3.6 (cached) | 1.6.5+ (HEAD + npm) | Delta |
|---|---|---|---|
| MCP tool count | 9 baseline | 13 (+ 4 new) | +api_impact, +route_map, +tool_map, +shape_check |
| Language extractors | core 5 | core 5 + first-class C#, C/C++ fixes, Rust pub-detect, Swift heritage | 1.4.0 resolver overhaul |
| Symbol resolution | basic | 3-tier (FQN → scope-walk → guarded fuzzy) + MRO (C++ leftmost / C# class-over-iface / Python C3 / Rust qualified / default BFS) | new at 1.4.0 |
| Constructor/struct-literal resolution | partial | cross-language (`new Foo()`, `User{...}`, C# primary ctors, target-typed new) | new at 1.4.0 |
| Heritage edges | none | HAS_METHOD, OVERRIDES, Go struct embed, Swift extension heritage | new at 1.4.0 |
| MCP transport | newline-delimited only | dual-framing auto-detect (Content-Length + ND-JSON) | new at 1.3.10 |
| MCP security | basic | 10 MB MAX_BUFFER_SIZE, Content-Length validation, recursive→iterative readNewlineMessage, closed-transport guard | new at 1.3.10 |
| FTS injection | vulnerable | backslash-escape in search queries | fixed at 1.3.11 |
| KuzuDB cleanup | hang on Linux/macOS | force-exit + isolated vitest fork pool | fixed at 1.3.8/1.3.11 |
| Auto-reindex | manual | post-commit/merge hook with embedding preservation | new at 1.3.11 |
| Azure OpenAI | broken (`max_tokens` rejected) | `max_completion_tokens`; skip-temperature | fixed at 1.5.3 |
| Wiki HTML viewer | XSS-bait via `</script>` | escaped | fixed at 1.5.3 |
| Storage backend | KuzuDB | LadybugDB v0.15 (`@ladybugdb/core`, `@ladybugdb/wasm-core`), VECTOR extension for semantic search | migrated [Unreleased] (post-1.5.3, before 1.6.5) |
| Storage path | `.gitnexus/kuzu` | `.gitnexus/lbug` | rename |
| Windows hook ergonomics | missing | `win-rm-list-json.ps1` | new |

**Note**: CHANGELOG.md at HEAD stops at 1.5.3. The 1.6.0 → 1.6.5 range is undocumented in the file, but npm publish timeline shows substantive iteration: 1.6.0 (2026-04-12), 1.6.1, 1.6.2 (after 26× rcs), 1.6.3 (after 52× rcs), 1.6.4 (after 113× rcs), 1.6.5 (after 50× rcs). The W329-G §6 cite of a "Windows FTS BM25 silent-degradation fix" is most plausibly in this undocumented 1.6.x window. The 4 new MCP tools (api_impact, route_map, tool_map, shape_check) confirm-via-live-probe were added in the same window.

## §4 Why Upgrade (Win11-specific drivers)

1. **Plugin metadata refresh** — caches `gitnexus-impact-analysis` + `gitnexus-refactoring` skills against the 1.4.0+ resolver semantics; current 1.3.6 skills give advice that doesn't match current behavior.
2. **`win-rm-list-json.ps1`** — Windows-specific hook addition that the 1.3.6 cache lacks. Relevant to this Z:-portable Win11 runtime.
3. **MCP transport hardening** — 10 MB buffer cap + recursion→iteration prevents OOM/stack-overflow on long-running indexing sessions. Even though the npm-spawned 1.6.5 binary already has this, the plugin-metadata refresh aligns operator-visible documentation with the runtime.
4. **W329-G §6 commitment** — the wave's recorded SOTA-discipline closure depends on this upgrade landing.

**Non-driver**: The 4 new MCP tools are ALREADY callable today (verified live). Upgrade is for metadata/skill alignment + Windows-specific hook coverage, not for tool-surface unlock.

## §5 Stage-2 Operator Action — Paste-Ready Commands

`/plugin install` is interactive and cannot be invoked by the agent. The operator must paste the following sequence into an interactive Claude Code session. Order matters: cache-delete BEFORE re-install, because W270 governance documents that vanilla `/plugin update` no-ops on silent SHA drift when the upstream version-string is unchanged.

```powershell
# (1) — Confirm no other CC session is mid-task on this runtime (parallel-session safety, W280d).
#       Check terminal multiplexer / `claude agents` for active forks before proceeding.

# (2) — Snapshot the current cache so we have a fast rollback (Stage 7).
Copy-Item -Recurse `
  'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\1.3.6' `
  'Z:\claude-sota-installed-state\.claude\backup\gitnexus-cache-1.3.6-prew330b'

# (3) — Cache-delete the stale plugin metadata. Per W270: vanilla /plugin update
#       no-ops when version-string is unchanged; cache-delete + fresh-install
#       is the SOTA fix for silent SHA drift.
Remove-Item -Recurse -Force `
  'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\1.3.6'

# (4) — In Claude Code, refresh the marketplace and reinstall the plugin.
#       /plugin install IS interactive (slash command, not a callable tool).
#       Paste these slash commands one at a time at the CC prompt:
/plugin marketplace update gitnexus-marketplace
/plugin install gitnexus@gitnexus-marketplace
/reload-plugins
```

## §6 Post-Install Verification

```powershell
# (a) — New cache directory exists at the bumped version (or still 1.3.6 if upstream
#       plugin.json hasn't bumped — content-diff is the real signal).
Get-ChildItem 'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\'
Get-Content   'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\*\.claude-plugin\plugin.json'

# (b) — Win-specific hook now present (was missing in 1.3.6 cache).
Test-Path 'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\*\hooks\win-rm-list-json.ps1'

# (c) — Live MCP smoke (no restart required — npx resolves @latest per spawn).
#       In CC, run these MCP calls:
#         mcp__gitnexus__list_repos                  # baseline
#         mcp__gitnexus__shape_check { ... }         # NEW at 1.6.x
#         mcp__gitnexus__tool_map     { ... }        # NEW at 1.6.x
#         mcp__gitnexus__api_impact   { ... }        # NEW at 1.6.x
#         mcp__gitnexus__route_map    { ... }        # NEW at 1.6.x

# (d) — Verify the npm-spawned runtime version explicitly.
npx -y gitnexus@latest --version    # expect 1.6.5
```

## §7 Rollback Path

```powershell
# (1) — Restore the snapshotted cache.
Remove-Item -Recurse -Force `
  'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\*'
Copy-Item -Recurse `
  'Z:\claude-sota-installed-state\.claude\backup\gitnexus-cache-1.3.6-prew330b' `
  'Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace\gitnexus\1.3.6'

# (2) — Pin the npm-side runtime if drift is suspect (rare — but cardinal-rule-2
#       CR-9 W286-arc-P0C `npx -y <pkg>@<pinned>` discipline applies).
#       Edit .mcp.json: change "gitnexus@latest" → "gitnexus@1.3.6", then /reload-plugins.

# (3) — In CC, /reload-plugins to flush in-memory plugin state.
```

## §8 INDEPENDENCE-PROOF

- **FOUNDATION-ANCHOR**: `abhigyanpatwari/GitNexus @ 803f0bed5f7d` (HEAD SHA verified 2026-05-19 via `gh api`; matches W329-G §6 cite).
- **COUNTERFACTUAL**: IF GitNexus is deprecated/archived, code-knowledge-graph capability is preserved BECAUSE Sourcegraph `cody` indexing (`sourcegraph/cody` on GitHub) ALSO provides cross-repo symbol traversal at production scale via the LSIF/SCIP indexing protocol.
  - **(a) ORG-DISTINCT** ✓ — `abhigyanpatwari` (independent solo maintainer) ≠ Sourcegraph Inc. (San Francisco corp, ~150 staff). No shared funding, governance, or coupled release cycles.
  - **(b) CAUSAL-DISTINCT** ✓ — Sourcegraph LSIF (Language Server Index Format) shipped 2019 as Microsoft's protocol for pre-computed semantic indices; SCIP (Source Code Intelligence Protocol) is Sourcegraph's 2022 successor. Neither shares architecture lineage with GitNexus (which uses tree-sitter + KuzuDB/LadybugDB graph queries via Cypher). Two genuinely different approaches to the same problem.
  - **(c) TEMPORAL-DISTINCT** ✓ — Sourcegraph LSIF (2019) and SCIP (2022) both predate GitNexus's first npm publish (2026-02-06T20:04Z, version 1.0.0). No way GitNexus could have caused or constrained the existence of the alternative.

## §9 Cite Provenance

- HEAD SHA: `abhigyanpatwari/GitNexus` commit `803f0bed5f7d` (short-form per gitleaks 40-char entropy guard) — verified via `gh api /repos/abhigyanpatwari/GitNexus/commits/HEAD --jq .sha` at 2026-05-19.
- npm registry: `gitnexus@1.6.5` published 2026-05-16T16:32:36.218Z; `gitnexus@1.3.6` published 2026-02-28T12:42:21.225Z — via `npm view gitnexus time --json`.
- Live MCP tool surface: probed via in-session system tool list (top of prompt) — `mcp__gitnexus__{api_impact,route_map,tool_map,shape_check}` all present.
- Live `mcp__gitnexus__list_repos`: 2 repos indexed (claude-sota-installed 6008n/6396e/27proc; claude-sota-pure 110n/105e/0proc); both staleness-flagged (593 + 22 commits behind HEAD) — orthogonal to this upgrade, but flagged for follow-up.
- CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ 48798ca` (cited in CLAUDE.md): pointer-only root-memory discipline.
- W270 silent-SHA-drift governance: cited in CLAUDE.md cardinal-rule-1 corollary.
- W280d parallel-session-safety: cited in CLAUDE.md architecture block.
- W286-arc-P0C-CR-9 npm pin discipline: cited in CLAUDE.md cardinal-rule-2.
